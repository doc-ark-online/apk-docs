# 实名认证

## 接口方式

**接口地址:** `https://openapi.metaapp.cn/apiserv/intermodal/nppa/getPi` 

**请求方式:**: `get` 

## 参数列表

| 参数   | 解释                                                         |
| ------ | ------------------------------------------------------------ |
| cpid   | 开放平台的cpid                                                       |
| appKey | 开发者平台获取appkey                                              |
| userId | 玩家的uid                                                       |
| digest | 摘要（cpid、appKey、userId、appSecret，等参数合并后的md5） |

## digest的计算方法

```java
String content = cpid + appKey + userId + appSecret;

String md5 = DigestUtils.md5DigestAsHex(content.getBytes());
```

> 备注：appSecret为只保存在后端，参与后端支付参数签名

## 参考案例

https://openapi.metaapp.cn/apiserv/intermodal/nppa/getPi?cpid={cpid}&appKey={appKey}&userId={userId}&digest={digest}

## 接口返回示例

已完成认证：

```JSON
{
    "code": 200,
    "message": "成功",
    "data": {
        "status": 0,
        "pi": "1hfb2cxhiubdhloft0aw8fq8dfwoabeit4fqie"
    }
}
```

认证中：

```JSON
{
    "code": 200,
    "message": "成功",
    "data": {
        "status": 1,
        "pi": null
    }
}
```

未认证：

```JSON
{
    "code": 200,
    "message": "成功",
    "data": {
        "status": 2,
        "pi": null
    }
}
```
