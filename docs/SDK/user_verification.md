# 用户校验

开放平台鉴权

## 接口说明

**接口地址：** `https://openapi.metaapp.cn/v2/user/auth`

**请求方式:** `POST`

**Content-Type:** `APPLICATION/JSON`

**Header信息：** **[查看header参数规则](./open_platform_authentication.md)**

**请求参数：**

```json
{
  "uid": "your_user_id_from_client", 
  "sid": "your_sid_from_client"
}
```

**参数说明：**

| 字段 | 类型 | 描述 |
| ------ | -------- | ------- |
| uid | string | 233用户ID | 
| sid | string | 233 SDK登录返回的sid |

**响应结果：**

```json
{
  "code": 200,  
  "message": "成功",
  "data": true  
}
```

**结果说明：**

| 字段 | 类型 | 描述 |
| ---- | :----: | ---- |
| code | int | 200 正常，其它均为异常 | 
| data | boolean | true验证成功；false验证失败 | 