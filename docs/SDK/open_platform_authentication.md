# 开放平台鉴权

## 鉴权接口

游戏方服务端请求233开放平台所有接口都需要先进行鉴权。

**域名：** `openapi.metaapp.cn`

**请求方式：** `GET/POST`

**Content-Type:**  `application/json` 

**Headers描述：**

所有请求接口header头参数都必须带以下两个参数 

| 请求头 | 描述                                                         |
| ------ | ------------------------------------------------------------ |
| APPKEY | 233开放平台获取                                              |
| SIGN   | SIGN为参数签名,签名规则参考：<a href="#数据签名规则">数据签名规则</a> |

## 数据签名规则

### 第一步

设所有发送或者接收到的数据为集合M，将集合M内非空参数值的参数按照参数名ASCII码从小到大排序（字典序），使用URL键值对的格式（即key1=value1&key2=value2…）拼接成字符串stringA。

**特别注意以下重要规则：**

◆ 参数名ASCII码从小到大排序（字典序）；

◆ 如果参数值为空(null)不参与签名（运算）；

◆ 参数名称大小写敏感（【参数名区分大小写】；

◆ 验证调用时，传送的sign参数不参与签名，将生成的签名与该sign值作校验。

◆ 参数值为数组类型数据且元素不存在null和嵌套json类型支持签名（空数组也需要签名）

- 注意数组是有序的，接入方签名时候的顺序和提交到MGS服务器端的数组顺序需要保持一致，注意不要使用普通的Dictionary或Map，需要是有序；
- 数组元素中不能存在`null`值；
- 数组中元素不能存在`嵌套JSON类型`；
- 数组中如果存在元素嵌套类型，需要将整个数组元素嵌套类型转换为String去标识JSON对象再参与签名运算；否则会返回错误信息"参数不合法"

◆ Json嵌套类型不支持toString()直接验签，需要将嵌套类型的数据组装为Json字符串，再参与签名运算；

### 第二步 

在stringA最后拼接上key得到stringSignTemp字符串，并对stringSignTemp进行MD5运算，再将得到的字符串所有字符转换为大写，得到sign值signValue。 注意：密钥的长度为32个字符。

> 注：为了防止因为简单接口参数或者入参较为固定，推荐开发接入时，可以在参数体中增加一个`nonce`为参数key，value为时间戳或者随机字符串（参与参数签名），增加签名value的随机性，防止网络劫持带来的秘钥泄露；
>【非强制】`key` 为233开发者平台的`AppSecret`参数

### 示例：

 示例1 POST `application/json`

```Bash
curl --location --request POST 'https://openapi.metaapp.cn/v2/user/auth' \ 
--header 'Content-Type: application/json' \ 
--header 'APPKEY: 9664891245' \ 
--header 'SIGN: B43F2F20447808D263735D62F1FAB216' \ 
--data-raw '{"sid":"1298b012345678","uid":"Recoba"}'
```

示例2 POST `application/x-www-form-urlencoded`

```Bash
curl --location --request POST 'https://openapi.metaapp.cn/v2/user/auth' \ 
--header 'APPKEY: 9664891245' \ 
--header 'SIGN: B43F2F20447808D263735D62F1FAB216' \ 
--header 'Content-Type: application/x-www-form-urlencoded' \ 
--data-urlencode 'sid=1298b012345678' \ 
--data-urlencode 'uid=Recoba' \
```

假设传送的参数如下：

```json
{"sid":"1298b012345678","uid":"Recoba"}
```

第一步：对参数按照key=value的格式，并按照参数名ASCII字典序排序如下：

```java
stringA = "sid=1298b012345678&uid=Recoba";
```

第二步：拼接API密钥：MD5签名方式：

```java
stringSignTemp=stringA+"&key=4e9bacc6e001c74f7e4761187fa46522" //注：key为在233开发者平台的AppSecret 
sign=MD5(stringSignTemp).toUpperCase() //得到"0857EF81F87BA34160A681D0E9FCB1C6" 

```
如果当前开发者账号对应的秘钥为：`4e9bacc6e001c74f7e4761187fa46522`
则对应签名后得到的值为：`0857EF81F87BA34160A681D0E9FCB1C6`
