# 自动化消息回调地址配置说明

面向开发者后台接入自动化消息的回调接口。平台在**配置阶段用 GET 探测连通性**，在**任务完成后用 POST 推送结果**。同一回调地址按 HTTP Method 分流，返回体统一。

## 1. 配置要求

| 项 | 说明 |
|---|---|
| 填写位置 | 开发者后台 → 自动化消息权限申请 → 回调地址 |
| 协议 | 必须是 `http://` 或 `https://` |
| 长度 | 最长 512 个字符 |
| 连通性 | 提交申请前会自动探测；也可先点「测试连通性」 |
| 探测超时 | 150 毫秒。超时即视为不可达，申请无法提交 |
| 来源 IP | 平台集群出口 IP 为 `39.96.95.150`。GET 探测与 POST 回调都从该地址发出，开发者防火墙、安全组、WAF 须放行该 IP |

建议：

- 接口尽量轻量，探测路径不要做业务落库
- GET 与 POST 使用**同一个 URL**
- 公网可达；探测超时很短，请避免慢网关、多次跳转
- 放行来源 IP `39.96.95.150`。只开放端口、不放行该出口 IP 时，平台请求仍会被拦截

## 2. 协议总览

```
配置 / 测试连通性
  平台  --GET  callbackUrl?echostr=xxx-->  开发者服务
  开发者 --JSON confirmResult=echostr-->  平台

任务发送完成
  平台  --POST JSON 任务结果-->  开发者服务
  开发者 --JSON confirmResult=true-->  平台
```

统一成功响应：

```json
{
  "code": 200,
  "data": {
    "confirmResult": "字符串"
  }
}
```

`confirmResult` 必须是**字符串**，不要用布尔值。

| 场景 | 请求 | `confirmResult` 取值 |
|------|------|----------------------|
| GET 连通性探测 | Query 带 `echostr` | 原样回显该 `echostr` |
| POST 任务完成 | JSON 任务结果 | `"true"`（忽略大小写） |

## 3. GET：测试连通性

平台请求示例：

```http
GET /auto-msg/callback?echostr=a1b2c3d4e5f6 HTTP/1.1
```

若回调地址本身已有 query，平台会用 `&` 追加，例如：

```http
GET /auto-msg/callback?from=game&echostr=a1b2c3d4e5f6 HTTP/1.1
```

开发者须：

1. 识别为 GET，**不要当任务完成处理**
2. 读取 query 中的 `echostr`
3. 返回：

```json
{
  "code": 200,
  "data": {
    "confirmResult": "a1b2c3d4e5f6"
  }
}
```

以下情况均判定失败：

- 连接失败、超时（150ms）、空响应
- 返回 HTML / 纯文本 / 非 JSON
- `code` 不是 200
- `confirmResult` 缺失、不是字符串、或不等于 `echostr`

## 4. POST：任务完成回调

任务（站内信 + Push）执行结束后，平台向同一地址 POST JSON。

请求体：

```json
{
  "taskId": 10001,
  "bizTaskId": "biz-20260922-001",
  "templateId": 20001,
  "pushSuccessCount": 80,
  "internalSuccessCount": 90
}
```

| 字段 | 类型 | 说明 |
|------|------|------|
| `taskId` | long | 平台任务 ID（官方主任务 ID） |
| `bizTaskId` | string | 开发者提交任务时的业务任务标识 |
| `templateId` | long | 开发者模板 ID |
| `pushSuccessCount` | int | Push 成功数 |
| `internalSuccessCount` | int | 站内信成功数 |

成功响应：

```json
{
  "code": 200,
  "data": {
    "confirmResult": "true"
  }
}
```

说明：

- POST 失败会重试，默认最多 5 次，请保证幂等
- 不要用 POST 做连通性探测，避免误当成任务完成

## 5. 接入示例（Java / Spring）

```java
@RestController
@RequestMapping("/auto-msg/callback")
public class AutoMsgCallbackController {

    @GetMapping
    public Map<String, Object> verify(@RequestParam String echostr) {
        return confirm(echostr);
    }

    @PostMapping
    public Map<String, Object> onTaskCompleted(@RequestBody Map<String, Object> body) {
        // 按 taskId / bizTaskId 处理任务结果，注意幂等
        return confirm("true");
    }

    private Map<String, Object> confirm(String confirmResult) {
        Map<String, Object> data = new HashMap<String, Object>();
        data.put("confirmResult", confirmResult);
        Map<String, Object> resp = new HashMap<String, Object>();
        resp.put("code", 200);
        resp.put("data", data);
        return resp;
    }
}
```

## 6. 配置与联调步骤

1. 在开发者服务实现上述 GET / POST
2. 确认公网可访问，防火墙 / 安全组 / WAF 已放行平台出口 IP `39.96.95.150`，接口能在 150ms 内返回
3. 在开发者后台填写回调地址，先测连通性
4. 提交权限申请（提交时会再探测一次，失败不建申请）
5. 权限与模板审核通过后创建发送任务，任务结束后观察 POST 回调

## 7. 常见问题

| 现象 | 可能原因 |
|------|----------|
| 提示回调地址不可达 / 探测超时 | 公网不通、接口超过 150ms、未放行平台出口 IP `39.96.95.150`、防火墙拦截 GET |
| 本机或办公网访问正常，平台探测失败 | 防火墙只放了办公网，未放行集群出口 IP `39.96.95.150` |
| 提示连通性校验失败 | 未按 JSON 回 `confirmResult`，或未原样回显 `echostr` |
| 只实现了 POST | GET 探测失败，申请提交不了 |
| GET 返回了纯文本 echostr | 必须走统一 JSON 信封，不能只回字符串 |
| `confirmResult` 写成布尔 `true` | 字段必须是字符串 `"true"` |
| 任务结束没有收到 POST | 权限未审核通过、任务未完成、或回调已成功不再重推 |

