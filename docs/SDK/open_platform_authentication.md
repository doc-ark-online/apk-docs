# 开放平台鉴权

游戏方服务端请求 233 开放平台所有接口都需要先进行鉴权。

本文档在原有开放平台鉴权说明基础上，新增对 **JSON 对象数组** 的签名支持。基础类型数组、空值处理与原有签名流程保持兼容。

## 鉴权接口

**域名：** `openapi.metaapp.cn`

**请求方式：** `GET/POST`

**Content-Type:** `application/json`

**Headers 描述：**

所有请求接口 header 头参数都必须带以下两个参数。

| 请求头 | 描述 |
| ------ | ---- |
| APPKEY | 233 开放平台获取。在相同应用（APP）下是固定值，用来标识操作哪一个应用，不能为空 |
| SIGN   | 请求参数通过应用密钥签名运算得到的签名。每一次接口请求都会根据参数和 APP 对应的密钥进行数据签名验证，不能为空。签名规则见下文 |

## 数据签名规则

签名生成的通用步骤如下。

### 第一步

设所有发送或者接收到的数据为集合 M，将集合 M 内非空参数值的参数按照参数名 ASCII 码从小到大排序（字典序），使用 URL 键值对的格式（即 `key1=value1&key2=value2…`）拼接成字符串 `stringA`。

**特别注意以下重要规则：**

- 参数名 ASCII 码从小到大排序（字典序）。
- 顶层参数值为 `null` 时不参与签名；空字符串仍参与签名，例如 `name=`。
- 参数名称大小写敏感（参数名区分大小写）。
- 验证调用时，传送的 `sign` 参数不参与签名，将生成的签名与该 `sign` 值作校验。
- 顶层字段值直接为 JSON 对象时，旧实现会跳过该字段，本次保持此行为。新增支持范围仅为对象数组。不要依赖被跳过字段的签名保护。
- Json 嵌套对象类型不支持 `toString()` 直接验签。需要签名时，须按本文规则组装为签名用文本后再参与运算。

#### 数组参数签名

- 注意数组是有序的。接入方签名时的顺序和提交到服务器端的数组顺序需要保持一致，注意不要使用普通的 Dictionary 或 Map，需要是有序。
- **基础类型数组**沿用原规则：元素使用原文本以逗号拼接并加方括号。例如请求体中的 `["a","b"]`，签名参数值为 `[a,b]`；空数组以 `[]` 参与签名。
- **新增支持**非空且直接元素全部为 JSON 对象的数组，规则见下文「对象数组签名规则」。
- 对象与基础类型混合、对象与数组混合、直接包含 `null` 的数组仍返回「参数不合法」。
- 已有基础数组及旧实现已接受的嵌套数组保持原签名格式，不统一转换为新的 JSON 格式。

### 对象数组签名规则

请求体仍提交 JSON 数组，无需改成字符串。仅计算签名时，将纯对象数组转换为紧凑 JSON 文本，再作为该参数的 value 进入原有 `key=value&...` 签名流程。

1. 递归将每个对象的字段名按 Java `String.compareTo` 升序排序（UTF-16 字典序，ASCII 字段名与原规则一致），包括数组元素内部的对象。
2. 所有数组保持原始元素顺序。对象内部的数组可包含对象、基础类型、嵌套数组和 `null`，并按 JSON 格式序列化。
3. 对象内部的 `null` 字段必须保留；`null`、`""`、`[]` 和 `{}` 不互相替换。
4. 不输出排版空格或换行；字符串使用 JSON 双引号，引号、反斜杠、控制字符按 JSON 规则转义。字符串本身的空格、换行不能删除。
5. 服务端使用 FastJSON `1.2.83` 的默认标量序列化规则，额外启用 `WriteMapNullValue`。本规则不是 RFC 8785/JCS；调用方须核对数字及转义表示，例如小数 `1.20` 保留为 `1.20`，大整数不能先转为丢失精度的浮点数。推荐通过固定测试向量联调。
6. 循环引用不支持。排序只生成签名用的副本，不改变转发给下游的请求体。

对象字段换序不改变该签名；数组元素换序或修改元素内容后，必须重新签名。

### 第二步

在 `stringA` 最后拼接上 `key` 得到 `stringSignTemp` 字符串，并对 `stringSignTemp` 进行 MD5 运算，再将得到的字符串所有字符转换为**大写**，得到 `sign` 值 `signValue`。注意：密钥的长度为 32 个字符。

> 注：为了防止因为简单接口参数或者入参较为固定，推荐开发接入时，可以在参数体中增加一个 `nonce` 为参数 key，value 为时间戳或者随机字符串（参与参数签名），增加签名 value 的随机性，防止网络劫持带来的密钥泄露。【非强制】
>
> `key` 为 233 开发者平台的 `AppSecret` 参数。

## 示例

### 示例 1：POST `application/json`

```bash
curl --location --request POST 'https://openapi.metaapp.cn/v2/user/auth' \
--header 'Content-Type: application/json' \
--header 'APPKEY: 9664891245' \
--header 'SIGN: B43F2F20447808D263735D62F1FAB216' \
--data-raw '{"sid":"1298b012345678","uid":"Recoba"}'
```

### 示例 2：POST `application/x-www-form-urlencoded`

```bash
curl --location --request POST 'https://openapi.metaapp.cn/v2/user/auth' \
--header 'APPKEY: 9664891245' \
--header 'SIGN: B43F2F20447808D263735D62F1FAB216' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'sid=1298b012345678' \
--data-urlencode 'uid=Recoba'
```

假设传送的参数如下：

```json
{"sid":"1298b012345678","uid":"Recoba"}
```

第一步：对参数按照 `key=value` 的格式，并按照参数名 ASCII 字典序排序如下：

```text
stringA = "sid=1298b012345678&uid=Recoba"
```

第二步：拼接 API 密钥（MD5 签名方式）：

```text
stringSignTemp = stringA + "&key=4e9bacc6e001c74f7e4761187fa46522"
sign = MD5(stringSignTemp).toUpperCase()
```

注：`key` 为在 233 开发者平台的 `AppSecret`。

如果当前开发者账号对应的密钥为 `4e9bacc6e001c74f7e4761187fa46522`，则对应签名后得到的值为：

```text
0857EF81F87BA34160A681D0E9FCB1C6
```

### 示例 3：对象数组签名

请求体仍提交 JSON 数组，无需改成字符串。例如请求体：

```json
{
  "templateId": 10001,
  "bizTaskId": "biz_task_20260922_001",
  "scopeType": 1,
  "timeType": 1,
  "sendTime": null,
  "commonPlaceholderParams": [{ "key": "game", "value": "name" }],
  "recipients": [{
    "uid": "49bc8a59115a444bae8e019430e8587b",
    "placeholderParams": [{ "key": "nick", "value": "player" }]
  }]
}
```

得到以下 `stringA`（完整一行，不做 URL 编码）。其中：

- 顶层 `sendTime` 为 `null`，不参与签名。
- `commonPlaceholderParams`、`recipients` 为纯对象数组，按紧凑 JSON 文本作为 value。
- 对象内部字段按字典序排序（`placeholderParams` 在 `uid` 前）。

```text
bizTaskId=biz_task_20260922_001&commonPlaceholderParams=[{"key":"game","value":"name"}]&recipients=[{"placeholderParams":[{"key":"nick","value":"player"}],"uid":"49bc8a59115a444bae8e019430e8587b"}]&scopeType=1&templateId=10001&timeType=1
```

使用仅用于测试的密钥 `array-sign-test-secret`，按 UTF-8 计算：

```text
MD5(stringA + "&key=" + secret).toUpperCase()
```

结果应为：

```text
64DF4350C1A2EFFB4AA1C66B4F03AC78
```

对象字段换序不改变该签名；数组元素换序或修改元素内容后，必须重新签名。
