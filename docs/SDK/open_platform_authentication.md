# 开放平台鉴权

游戏方服务端请求 233 开放平台所有接口都需要先进行鉴权。

本文档在原有开放平台鉴权说明基础上，新增对 **JSON 对象数组** 的签名支持。基础类型数组、空值处理与原有签名流程保持兼容。

## 鉴权接口

**域名：** `openapi.metaapp.cn`

**请求方式：** `GET/POST`，以具体业务接口要求为准。

网关支持以下参数签名方式：

| 请求方式 | 参数来源 | Content-Type |
| -------- | -------- | ------------ |
| GET | URL 查询参数 | 无需为签名指定请求体类型 |
| POST | JSON 请求体，根节点应为对象 | `application/json` |
| POST | 表单请求体 | `application/x-www-form-urlencoded` |

POST 请求的 URL 查询参数不会合并进请求体签名。需要签名保护的业务参数应放在对应请求体中。对象数组规则仅适用于 `application/json` 请求体。

**Headers 描述：**

所有请求接口 header 头参数都必须带以下两个参数。

| 请求头 | 描述 |
| ------ | ---- |
| APPKEY | 233 开放平台获取。在相同应用（APP）下是固定值，用来标识操作哪一个应用，不能为空 |
| SIGN   | 请求参数通过应用密钥签名运算得到的签名。每一次接口请求都会根据参数和 APP 对应的密钥进行数据签名验证，不能为空。签名规则见下文 |

## 数据签名规则

签名生成的通用步骤如下。

### 第一步

按上述请求方式提取待签名参数，将处理后的参数按参数名排序，再使用 `key1=value1&key2=value2…` 的格式拼接成字符串 `stringA`。签名文本不进行 URL 编码；GET 查询参数和表单在 HTTP 传输时仍需按各自格式编码。

**特别注意以下重要规则：**

- 参数名按 UTF-16 码元的字典序升序排列；对于 ASCII 参数名，即按 ASCII 顺序排列。参数名区分大小写。
- JSON 请求体中，顶层值为 `null` 的字段不参与签名；空字符串、数字 `0` 和布尔值 `false` 均参与签名，例如 `name=`、`count=0`、`enabled=false`。表单空字符串的处理限制见示例 2。
- `APPKEY`、`SIGN` 放在 HTTP 请求头中，不加入 `stringA`。请勿把验签值同时放入查询参数或请求体；网关不会自动排除其中名为 `sign` 的字段。
- 顶层字段值直接为 JSON 对象时，当前网关会跳过该字段及其内部内容，不参与签名。本次新增能力仅覆盖纯对象数组。
- 纯对象数组内部的嵌套对象参与签名，并递归排序字段。不要自行将顶层对象加入 `stringA`，否则会与网关计算结果不一致。需要鉴权保护的业务字段，不应依赖当前被跳过的顶层对象结构。

#### 数组参数签名

以下分类适用于 JSON 请求体中，**顶层字段的值为数组**的情况：

- **基础类型数组**：保持元素顺序，将解析后各元素的文本表示用逗号连接，外加方括号。字符串元素不增加 JSON 双引号，例如 `["a","b"]` 的签名值为 `[a,b]`。
- **空数组**：以 `[]` 参与签名。
- **非空纯对象数组**：直接元素必须全部为 JSON 对象，按下文的对象数组规则生成签名文本。
- 数组直接包含 `null`，或直接混合对象与基础类型、对象与数组时，请求会被拒绝，返回「参数不合法」。
- 旧实现已接受的其他嵌套数组继续使用旧格式，不适用对象数组的递归排序规则。

数组使用有序列表保存，签名时与实际发送时的元素顺序必须一致。纯对象数组中的对象字段允许以任意顺序提交，计算签名时再递归排序。

| 请求体 | 对应字段的签名值或结果 |
| ------ | -------------------- |
| `{"tags":["a","b"]}` | `[a,b]` |
| `{"items":[{"tags":["a","b"]}]}` | `[{"tags":["a","b"]}]` |
| `{"items":[]}` | `[]` |
| `{"items":[{}]}` | `[{}]` |
| `{"items":[null]}` | 参数不合法 |
| `{"items":[{},1]}` | 参数不合法 |
| `{"items":[{},[]]}` | 参数不合法 |
| `{"items":[{"tags":[1,null,"a"]}]}` | `[{"tags":[1,null,"a"]}]` |
| `{"items":[[1,2],["a",null]]}` | `[[1,2],["a",null]]`，沿用旧格式 |

**同样的字符串数组，位于顶层字段与位于纯对象数组内部时，签名文本不同。** 顶层数组直接包含 `null` 的限制，不适用于纯对象数组内部的嵌套数组。

### 对象数组签名规则

请求体根节点仍为 JSON 对象，对应字段提交 JSON 数组，无需改成字符串。仅计算签名时，将纯对象数组转换为紧凑 JSON 文本，再作为该参数的 value 进入原有 `key=value&...` 签名流程。

对象数组签名需要接入环境的网关支持。请在平台确认该环境已完成能力发布后启用；旧版网关不支持纯对象数组请求。

1. 递归将每个对象的字段名按 UTF-16 码元的字典序升序排序（ASCII 字段名与原规则一致），包括数组元素内部的对象。
2. 所有数组保持原始元素顺序。对象内部的数组可包含对象、基础类型、嵌套数组和 `null`，并按 JSON 格式序列化。
3. 对象内部的 `null` 字段必须保留；`null`、`""`、`[]` 和 `{}` 不互相替换。
4. 不输出排版空格或换行；字符串使用 JSON 双引号，引号、反斜杠、控制字符按 JSON 规则转义。字符串本身的空格、换行不能删除。
5. 数字和字符串转义的文本表示必须与签名规则一致：数字 `1e2` 输出为 `1E+2`，小数 `1.20` 保留为 `1.20`，大整数不能先转为丢失精度的浮点数。不同语言的默认序列化结果可能不同，请通过本文固定示例核对待签名文本和签名结果。
6. 循环引用不支持。排序只生成签名用的副本，不改变转发给下游的请求体。

签名使用的是解析、排序后重新序列化得到的文本，并非请求体原文，也不是简单删除原文中的空白。不同语言的默认 JSON 序列化在数字和字符转义方面可能不同，不能只做字段排序后就假定结果一致。字符串内容中的空格和换行必须保留，换行按相应转义形式输出。

应以最终发送的请求体为依据计算签名，避免签名后再次序列化时改变数字表示或精度。请对照示例验证待签名文本与最终 MD5，而不仅比较 JSON 语义是否相同。

对象字段换序不改变该签名；数组元素换序或修改元素内容后，必须重新签名。

### 第二步

在 `stringA` 后追加 `&key=` 和应用的 `AppSecret`，以 UTF-8 编码计算 MD5，并将摘要输出为 **32 位大写十六进制字符串**，作为请求头 `SIGN` 的值。

```text
stringSignTemp = stringA + "&key=" + AppSecret
SIGN = MD5(UTF-8(stringSignTemp)) 的 32 位大写十六进制结果
```

`AppSecret` 使用开发者平台为该应用提供的完整值，不进行截断、补齐或额外哈希。本文测试密钥仅用于离线验证签名算法。

> 在业务接口允许的情况下，可以增加 `nonce` 参数并参与签名，使不同请求的签名有所区别。当前网关没有对 `nonce` 实施去重或有效期校验，因此仅增加 `nonce` 不能阻止请求重放，也不能替代 HTTPS 或保护已经泄露的 `AppSecret`。`AppSecret` 应仅保存在服务端。

## 示例

示例中的 `APPKEY`、`AppSecret` 和业务参数仅用于说明签名计算。实际调用时，请替换为同一应用对应的凭据和有效业务参数，并重新计算 `SIGN`。示例 1、2 的计算使用测试密钥 `4e9bacc6e001c74f7e4761187fa46522`；示例 3 使用独立的测试密钥。

### 示例 1：POST `application/json`

```bash
curl --location --request POST 'https://openapi.metaapp.cn/v2/user/auth' \
--header 'Content-Type: application/json' \
--header 'APPKEY: 9664891245' \
--header 'SIGN: 0857EF81F87BA34160A681D0E9FCB1C6' \
--data-raw '{"sid":"1298b012345678","uid":"Recoba"}'
```

### 示例 2：POST `application/x-www-form-urlencoded`

当前表单解析存在兼容性限制：空字符串字段会被忽略；字段值包含 `&` 或 `=` 时，即使进行 URL 编码，也可能被错误解析。需要传递这些值或复杂数组结构时，请使用业务接口支持的 `application/json` 格式。

表单中的数组样式文本按普通字符串处理，不执行 JSON 对象数组的递归排序。

```bash
curl --location --request POST 'https://openapi.metaapp.cn/v2/user/auth' \
--header 'APPKEY: 9664891245' \
--header 'SIGN: 0857EF81F87BA34160A681D0E9FCB1C6' \
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
sign = MD5(UTF-8(stringSignTemp)) 的 32 位大写十六进制结果
```

注：`key` 为在 233 开发者平台的 `AppSecret`。

如果当前开发者账号对应的密钥为 `4e9bacc6e001c74f7e4761187fa46522`，则对应签名后得到的值为：

```text
0857EF81F87BA34160A681D0E9FCB1C6
```

### 示例 3：对象数组签名

请求体中的数组字段仍提交 JSON 数组，无需改成字符串。例如请求体：

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
MD5(UTF-8(stringA + "&key=" + secret)) 的 32 位大写十六进制结果
```

结果应为：

```text
64DF4350C1A2EFFB4AA1C66B4F03AC78
```

对象字段换序不改变该签名；数组元素换序或修改元素内容后，必须重新签名。
