# 创建消息发送任务

## 接口说明

游戏服务端创建一条自动化消息发送任务，成功后立即返回正式消息任务 ID。本接口不返回发送结果。站内信与 Push 执行结束后，平台向权限申请时配置的回调地址 POST 任务结果。回调协议见 [自动化消息回调地址配置说明](./auto_message_callback.md)。

同一游戏、同一开发者下，`bizTaskId` 已存在时不会重复建单，直接返回原来的 `taskId`。后续完成回调仍按该 `taskId` 推送一次。

接口地址：`https://openapi.metaapp.cn/openapi/msg/task/create`

请求方式：`POST`

Content-Type：`application/json`

Header 信息：查看 [开放平台鉴权](https://doc.233leyuan.com/SDK/open_platform_authentication.html)。请求头必须带 `APPKEY`、`SIGN`。`gameId`、`developerId` 由网关根据鉴权结果写入，调用方不要放进 body。

请求参数：

```json
{
  "templateId": 10001,
  "bizTaskId": "biz_task_20260922_001",
  "scopeType": 1,
  "timeType": 1,
  "sendTime": null,
  "commonPlaceholderParams": [
    {
      "key": "game",
      "value": "name"
    }
  ],
  "recipients": [
    {
      "uid": "49bc8a59115a444bae8e019430e8587b",
      "placeholderParams": [
        {
          "key": "nick",
          "value": "player"
        }
      ]
    }
  ]
}
```

参数说明：


| 字段                      | 类型     | 必填  | 描述                                                                                 |
| ----------------------- | ------ | --- | ---------------------------------------------------------------------------------- |
| templateId              | long   | 是   | 消息模板 ID。模板须已生效，且其类型在该游戏的消息权限内                                                      |
| bizTaskId               | string | 是   | 开发者侧幂等标识，最长 64 个字符。相同标识重复调用返回原任务 ID                                                |
| scopeType               | int    | 是   | 发送范围。`1` 单个，收件人恰好 1 个；`2` 批量，收件人 1～50 个且 uid 不重复；`3` 按模板类型开关全量发送，`recipients` 必须为空 |
| timeType                | int    | 是   | 发送时间类型。`1` 实时；`2` 定时                                                               |
| sendTime                | long   | 否   | 定时发送的毫秒时间戳。`timeType=2` 时必填，且必须大于当前时间；实时发送留空                                       |
| commonPlaceholderParams | array  | 否   | 本次任务的公共占位参数                                                                        |
| recipients              | array  | 否   | 收件人。单个、批量发送时必填；全量发送时必须为空                                                           |


`commonPlaceholderParams` / `placeholderParams` 元素：


| 字段    | 类型     | 必填  | 描述        |
| ----- | ------ | --- | --------- |
| key   | string | 是   | 模板占位符 key |
| value | string | 是   | 替换值       |


`recipients` 元素：


| 字段                | 类型     | 必填  | 描述                          |
| ----------------- | ------ | --- | --------------------------- |
| uid               | string | 是   | 233 用户 ID，与用户校验接口的 `uid` 相同 |
| placeholderParams | array  | 否   | 该用户的个性化占位参数，同名 key 覆盖公共参数   |


模板里声明的占位 key 必须给齐。全量发送只校验公共参数；单个、批量按「公共参数 ∪ 该用户参数」校验。

响应结果：

```json
{
  "code": 200,
  "message": "成功",
  "data": {
    "taskId": 90001
  }
}
```

结果说明：


| 字段          | 类型     | 描述                                                       |
| ----------- | ------ | -------------------------------------------------------- |
| code        | int    | `200` 成功，其它均为失败                                          |
| message     | string | 结果说明                                                     |
| data.taskId | long   | 正式消息任务 ID。重复的 `bizTaskId` 返回已有任务 ID。完成回调里的 `taskId` 与此相同 |




## 发送结果回调

创建成功只表示任务已受理。任务（站内信 + Push）执行结束后，平台向「开发者后台 → 自动化消息权限申请 → 回调地址」POST JSON。调用方用 `taskId` 或 `bizTaskId` 关联本次创建。

回调请求体：

```json
{
  "taskId": 90001,
  "bizTaskId": "biz_task_20260922_001",
  "templateId": 10001,
  "pushSuccessCount": 80,
  "internalSuccessCount": 90
}
```


| 字段                   | 类型     | 说明                      |
| -------------------- | ------ | ----------------------- |
| taskId               | long   | 与本接口响应 `data.taskId` 相同 |
| bizTaskId            | string | 创建时传入的业务任务标识            |
| templateId           | long   | 创建时传入的 `templateId`     |
| pushSuccessCount     | int    | Push 成功数                |
| internalSuccessCount | int    | 站内信成功数                  |


开发者须返回 `code=200`，且 `data.confirmResult` 为字符串 `"true"`。POST 失败会重试，默认最多 5 次，处理须按 `taskId` 幂等。

连通性探测（GET 回显 `echostr`）、统一响应体、来源 IP `39.96.95.150` 与配置步骤见 [自动化消息回调地址配置说明](./auto_message_callback.md)。

错误码：


| code     | 描述                              |
| -------- | ------------------------------- |
| 70000000 | 参数错误，如 `bizTaskId` 为空或超过 64 个字符 |
| 70000006 | 模板类型无权限                         |
| 70000008 | 模板不存在或未生效                       |
| 70000011 | 模板被封禁                           |
| 70000012 | 数据写入失败                          |
| 70000013 | 获取业务锁失败，可稍后用同一 `bizTaskId` 重试   |
| 70000021 | 游戏未开通消息权限                       |
| 70000022 | 发送范围或时间类型非法                     |
| 70000023 | 收件人非法，如个数不符、uid 重复，或全量发送仍传了收件人  |
| 70000024 | 定时时间非法                          |
| 70000027 | 占位参数缺失                          |
| 70000028 | 模板被封禁                           |


