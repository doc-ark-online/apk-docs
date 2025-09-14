# 233乐园内购SDK文档


::: tip 特殊注意事项:

1、支付宝集成问题:3.2.11及以上版本SDK需要额外集成支付宝SDK,避免拉起支付宝失败/闪退

2、悬浮球问题:请更新第三方依赖库升级至4.9.0及以上,并确认人是否需要混淆代码,避免悬浮球录屏功能失效/闪退

3、订单校验问题:请在开发者后台获取参数处填写支付回调地址,避免发货失败。并务必校验金额,确保收到的金额与实际物品金额一致,防止游戏金额被篡改导致损失或数据异常,确保游戏资产安全。 
:::

| SDK版本号 | 修订日期 | 说明 |
| --------- | ---------- | ------- |
| V3.2.13    | 2025/06/30 |  1.优化初始化接口，提升初始化成功率 <br/>2. 其他内部异常优化 |
| V3.2.11    | 2025/03/07 |  1.合规优化，移除无用权限和数据 <br/>2.SDK服务异常时增加弹窗提示<br/>3.剥离内嵌支付宝SDK代码依赖，转换为外部依赖|
| V3.2.10    | 2025/02/28 |  合规优化，移除无用权限和数据 |
| V3.2.9    | 2025/02/18 | 1.修复支付折扣优惠券计算问题 <br/>2.修复个别机型屏幕适配问题 |
| V3.2.7    | 2024/12/15 | 1.优化手机安装账号注册流程 <br/>2.个别机型录屏功能问题修复 |
| V3.2.6    | 2024/08/28 | 1. 适配Android 14 |
| V3.2.4    | 2024/6/18  | 1. UI机型适配优化 <br/>2. 优化http请求超时 <br/>3. 修复内部bug |
| V3.2.3    | 2024/2/26  | 1. SDK初始化方法参数变更 <br/>2. UI弹窗兼容适配 <br/>3. 代码混淆更新，增加部分代码混淆keep |
| V3.2.2    | 2024/1/3   | 1. 新增授权登录功能 <br/>2. 增加游戏云存档 <br/>3. 图片库glide升级至4.9 <br/>4. 新增阿里oss依赖 <br/>5. 移除GSON外部依赖 <br/>6. 代码混淆更新 |
| V3.1.11   | 2023/12/7  | 1、SDK初始化新增cpid参数                                     |
| V3.1.9    | 2023/10/25 | 1、SDK初始化权限获取合规,去掉IMSI获取                        |
| V3.1.8    | 2023/9/23  | 1、SDK初始化权限获取合规，去除IMEI,OAID                      |
| V3.1.7    | 2023/9/1   | 1、优化部分机型悬浮球触摸不到的问题  <br/>2、优化内部网络请求     |
| V3.1.6    | 2023/6/19  | 1、修复查看实名认证信息文案显示不对问题                      |
| V3.1.5    | 2023/6/2   | 1、修复android 5.0的版本证书TLS1.3不支持问题                 |
| V3.1.4    | 2023/5/19  | 1、优化游戏乐园内退出策略<br/>2、修复部分bug                      |
| V3.1.3    | 2023/4/4   | 1、 增加游戏退出接口<br/>2、 修复部分bug                          |
| V3.1.2    | 2023/2/22  | 1、 新增游戏圈<br/>2、 修复部分游戏优惠券列表滑动黑屏问题         |
| V3.1.1    | 2022/12/15 | 1、修复验证码无法验证问题<br/>2、优化金钻会员展示门槛             |
| V3.1.0    | 2022/11/15 | 1、新增金钻特权、礼包、优惠券、活动、乐币等功能<br/>2、优化充值UI界面<br/>3、优化悬浮球体验 |
| V3.0.1    | 2022/9/26  | 1、Bug修复                                                   |
| V3.0.0    | 2022/8/18  | 1、增加消息中心模块<br/>2、内部功能优化，修复线上bug              |

## SDK说明

**SDK开发者：** 北京龙威互动科技有限公司

**SDK名称：** 233乐园内购SDK

**SDK主要功能：** 为接入的游戏提供233乐园账户登录、实名认证、防沉迷、充值、更新、游戏内容展示等功能。

### 用户信息与隐私策略

如果您是开发者，在为用户提供服务前请阅读 **[《233乐园内购SDK隐私政策》](../protocol/233乐园内购SDK隐私政策.md) 与 [《233乐园内购SDK合规使用说明》](../protocol/233乐园内购SDK合规使用说明.md)**，了解SDK对个人信息收集范围、处理目的以及权限使用情况。请您向用户提供服务时，告知相关信息并取得用户同意。

如果您是用户，请在使用我们的服务前阅读 **[《233乐园内购SDK隐私政策》](../protocol/233乐园内购SDK隐私政策.md) 与 [《233乐园内购SDK合规使用说明》](../protocol/233乐园内购SDK合规使用说明.md)**，了解SDK对个人信息收集范围、处理目的以及权限使用情况。充分理解后再开始使用我们的服务。

 
**提审时提交的隐私协议链接中，需要把下列内容加入第三方SDK的介绍目录：** 

第三方SDK名称：233乐园内购SDK  
第三方SDK提供方的公司名称：北京龙威互动科技有限公司   
使用目的及功能场景： 为接入的游戏提供233乐园账户登录、实名认证、防沉迷、充值、更新、游戏内容展示等功能  
处理的个人信息类型：设备Android ID、设备名称、设备型号、设备操作系统版本、网络状态、姓名、身份证号、手机号码、验证码、233乐园账号（uid、sid）、密码、昵称、头像、游客状态、实名情况、年龄、支付信息、客服信息    
第三方SDK隐私政策链接：https://doc.233leyuan.com/protocol/233乐园内购SDK隐私政策.html


第三方 SDK 名称：App 支付宝客户端 SDK     
第三方名称：支付宝（中国）网络技术有限公司   
收集的个人信息类型：Android ID、OAID、AAID、SSID、BSSID；系统设置、系统属性、设备型号、设备品牌、操作系统；IP 地址、网络类型、运营商信息、Wi-Fi 状态、Wi-Fi 参数、Wi-Fi 列表；传感器信息（传感器列表）；设备屏幕密度     
使用目的：保障用户账户和资金安全以及支付服务的安全稳定运行；履行反洗钱、反恐怖融资、反电信网络诈骗等法定义务；实现网络链路的选择和优化，以提升用户体验     
第三方SDK隐私政策链接：[App 支付宝客户端 SDK 隐私说明](https://opendocs.alipay.com/common/02kiq3)     
 

## SDK集成

### 申请应用的appKey

请联系我们申请应用的appKey。

### 导入aar包

下载[内购SDK](https://release.233leyuan.com/online/G1Tk0svW9uXN1751012968669.zip)解压并将**mpg-pay-\*.aar**复制到您项目Project/app/libs文件夹下。

在您app的build.gradle中添加：

```Bash
dependencies {
    ...
    implementation 'com.android.support:appcompat-v7:28.0.0'
    implementation files('libs/mpg-pay-v3.2.13.aar')
    
    //SDK所需的第三方依赖
    implementation 'com.github.bumptech.glide:glide:4.9.0'     
    implementation 'com.alipay.sdk:alipaysdk-android:+@aar' // 支付宝sdk依赖 3.2.11及以上版本必须添加
}
```
::: danger 注意
SDK依赖的glide升级至4.9.0及以上，并确认是否需要混淆代码，避免悬浮球录屏功能失效/闪退
3.2.11及以上版本SDK需要额外集成支付宝SDK，避免拉起支付宝失败/闪退
:::

如果您需要代码混淆，请在`proguard-rules.pro`文件（或其他混淆配置文件）中添加：

```Bash
-dontoptimize

-keep public class android.net.http.SslError
-keep public class android.webkit.WebViewClient

-dontwarn android.webkit.WebView
-dontwarn android.net.http.SslError
-dontwarn android.webkit.WebViewClient

-dontwarn android.support.**

-dontwarn org.apache.**
-keep class org.apache.** { *;}

请不要混淆SDK相关代码
-keep class com.meta.android.mpg.** { *;}

# alipay
-dontwarn android.net.**
-keep class com.alipay.android.app.IAlixPay{*;}
-keep class com.alipay.android.app.IAlixPay$Stub{*;}
-keep class com.alipay.android.app.IRemoteServiceCallback{*;}
-keep class com.alipay.android.app.IRemoteServiceCallback$Stub{*;}
-keep class com.alipay.sdk.app.PayTask{ public *;}
-keep class com.alipay.sdk.app.AuthTask{ public *;}
-keep class com.alipay.sdk.app.H5PayCallback {
    <fields>;
    <methods>;
}
-keep class com.alipay.android.phone.mrpc.core.** { *; }
-keep class com.alipay.apmobilesecuritysdk.** { *; }
-keep class com.alipay.mobile.framework.service.annotation.** { *; }
-keep class com.alipay.mobilesecuritysdk.face.** { *; }
-keep class com.alipay.tscenter.biz.rpc.** { *; }
-keep class org.json.alipay.** { *; }
-keep class com.alipay.tscenter.** { *; }
-keep class com.ta.utdid2.** { *;}
-keep class com.ut.device.** { *;}
# SDK 包可能不包含 utdid
-dontwarn com.ta.utdid2.**
-dontwarn com.ut.device.**
# SDK 包可能不包含 securitysdk
-dontwarn com.alipay.mobilesecuritysdk.**
-dontwarn com.alipay.security.**

# okhttp3
-dontwarn javax.annotation.**
-keepnames class okhttp3.internal.publicsuffix.PublicSuffixDatabase
-dontwarn org.codehaus.mojo.animal_sniffer.*
-dontwarn okhttp3.internal.platform.ConscryptPlatform
-dontwarn okio.**
-dontwarn java.lang.invoke.**
-dontwarn org.conscrypt.**

##---------------Begin: proguard configuration for Gson  ----------
-keepattributes Signature
-keepattributes 
Annotation
-dontwarn sun.misc.**
-keep class com.meta.android.thirdpart.gson.** { *; }
-keep class * extends com.meta.android.thirdpart.gson.TypeAdapter
-keep class * implements com.meta.android.thirdpart.gson.TypeAdapterFactory
-keep class * implements com.meta.android.thirdpart.gson.JsonSerializer
-keep class * implements com.meta.android.thirdpart.gson.JsonDeserializer
-keepclassmembers,allowobfuscation class * {
  @com.meta.android.thirdpart.gson.annotations.SerializedName <fields>;
}
-keep,allowobfuscation,allowshrinking class com.meta.android.thirdpart.gson.reflect.TypeToken
-keep,allowobfuscation,allowshrinking class * extends com.meta.android.thirdpart.gson.reflect.TypeToken

##---------------End: proguard configuration for Gson  ----------

# glide
-dontwarn com.bumptech.glide.**
-keep class com.bumptech.glide.**{*;}
-keep public class * implements com.bumptech.glide.module.GlideModule
-keep public class * extends com.bumptech.glide.AppGlideModule
-keep public enum com.bumptech.glide.load.resource.bitmap.ImageHeaderParser
$** {
  **[] $
VALUES;
  public *;
}

#ali oss
-keep class com.alibaba.sdk.android.oss.** { *; }
-dontwarn okio.**
-dontwarn org.apache.commons.codec.binary.**


-keep class sun.misc.Unsafe { *; }

-keepclassmembers enum * { # 保持枚举 enum 类不被混淆
   public static **[] values();
   public static ** valueOf(java.lang.String);
}
-keep class * implements android.os.Parcelable {#保持Parcelable不被混淆
   public static final android.os.Parcelable$Creator *;
}
# Explicitly preserve all serialization members. The Serializable interface
# is only a marker interface, so it wouldn't save them.
-keep public class * implements java.io.Serializable {*;}
-keepclassmembers class * implements java.io.Serializable {
   static final long serialVersionUID;
   private static final java.io.ObjectStreamField[]   serialPersistentFields;
   private void writeObject(java.io.ObjectOutputStream);
   private void readObject(java.io.ObjectInputStream);
   java.lang.Object writeReplace();
   java.lang.Object readResolve();
}
```

::: danger 注意  
SDK编译使用android30编译，若游戏的编译环境小于android SDK 29的，需要在游戏的AndroidManifest.xml中添加以下配置方可编译通过。
若出现 `java.lang.SecurityException: Media projections require a foreground service of type ServiceInfo.FOREGROUND_SERVICE_TYPE_MEDIA_PROJECTION`崩溃日志，可以配置下列内容
::: 

```xml
 <service android:name="com.meta.android.mpg.assistant.feature.record.ScreenRecorderService"
            tools:node="replace" />
```

## SDK使用

### 初始化接口

SDK初始化方法，调用后面的所有接口之前，请确保SDK初始化成功。

**接口说明:**

```java
/**
SDK初始化
@param activity   当前页面的activity
@param appKey        应用appKey
@param cpId        开发者平台对应的cpId
@param callback      初始化完成后的回调
*/
public static void initMetaSdk(Activity activity, String appKey, String cpId, InitCallback callback);
```

**初始化回调**

```java
public interface InitCallback {
   /**
     * 初始化成功回调
     */
    void onInitializeSuccess();
    /**
     * 初始化失败回调
     * @param code    失败code
     * @param message 失败描述信息
     */
    void onInitializeFail(int code, String message);
}
```

**代码示例：**

```java
public class GamePlayActivity extends Activity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        String appKey = "开发者后台分配的AppKey";
        String cpId = "开发者后台分配的cpId";
        MetaApi.initMetaSdk(this, appKey, cpId, new InitCallback() {
                @Override
                public void onInitializeSuccess() {
                    //初始化成功回调
                }
                @Override
                public void onInitializeFail(int code, String message) {
                    //初始化失败回调
                }
        });
    }
}
```

### 账号登录

**接口说明:**

```java
 /**
     * 登录
     * @param activity      应用当前页面
     * @param callback      登录结果回调
     */
    public static void login(Activity activity, LoginResultCallback callback);
```

**登录回调**

```java
public interface LoginResultCallback {
    /**
     * 登录成功回调
     *
     * @param userInfo 用户信息
     */
    void loginSuccess(UserInfo userInfo);
    /**
     * 登录失败回调
     *
     * @param errCode  登录失败code
     * @param errMsg   登录失败描述信息
     */
    void loginFail(int errCode, String errMsg);
}
```

**UserInfo**类描述:

```java
 public class UserInfo {
    public String uid;  //233用户uid
    public String sid;  //233用户sid
    public String userName; // 昵称
    public String userIcon;  //头像    public boolean isGuest; //是否是游客
    public boolean isRealName;//是否已实名
    public int age = 0;  //年龄
}
```

**示例代码：**

```java
MetaApi.login(activity, new LoginResultCallback() {
    @Override
    public void loginSuccess(UserInfo userInfo) {
        // 登录成功
        Toast.makeText(activity, "登录成功", Toast.LENGTH_SHORT).show();
    }
    @Override
    public void loginFail(int errCode, String errMsg) {
        // 登录失败
        Toast.makeText(activity, "登录失败", Toast.LENGTH_SHORT).show();
    }
});
```

**登录失败码说明：**

| code | msg                         | 说明                             |
| ---- | --------------------------- | -------------------------------- |
| 11   | login fail by auto          | 自动登录失败                     |
| 12   | login fail by phone         | 手机号登录失败                   |
| 13   | login fail by metaApp       | 233登录失败                      |
| 14   | login fail blacklist        | 黑名单用户限制登录               |
| 15   | login fail server stop      | 停服维护                         |
| 16   | login fail no token         | 没有uuid sid数据                 |
| 17   | login fail request fail     | 网络请求失败                     |
| 18   | login fail login auth error | 登录验证（黑名单和停服维护）失败 |
| 19   | need real name              | 需要实名验证                     |
| 20   | need login metaApp          | 游客账户，需要先登录233          |

### 账号切换监听回调

游戏方注册监听在233环境内账号切换的通知并处理账号切换后的业务逻辑，可在游戏退出时取消监听。

**接口说明：**

注册监听方法 

```java
public static void registerAccountChangedListener(AccountChangedListener listener)
```

反注册监听方法

```java
public static void unregisterAccountChangedListener(AccountChangedListener listener)
```

示例:

```java
private AccountChangedListener mAccountChangedListener = new AccountChangedListener() {
        @Override
        public void onAccountChanged(UserInfo userInfo) {
       　　 //在这里做切换账号逻辑操作
            Log.i("ActivityForTestLoginPay", "账号变更通知=" + userInfo);
        }        @Override
        public void onAccountLogout() {　　　　　　//点击悬浮球的账号切换，账号退出了，SDK自动拉起登录界面,游戏回到登录页即可
            Toast.makeText(ActivityForTestLoginPay.this, "账号退出了", Toast.LENGTH_SHORT).show();
        }
    };
    
//注册全局的账号切换监听
MetaApi.registerAccountChangedListener(mAccountChangedListener);

//游戏退出时取消监听
MetaApi.unregisterAccountChangedListener(mAccountChangedListener);
```

### 支付下单接口

::: tip 请前往开发者后台-发版管理-参数设置配置回调地址，否则无法发货成功
:::

**接口说明:**

```java
    /**
     * 支付接口
     * @param activity       应用当前页面
     * @param payInfo    付款商品信息
     * @param payCallback    支付回调
     */
 public static void pay(Activity activity, PayInfo payInfo, PayResultCallback payCallback) 
```

**支付回调接口:**

```java
public interface PayResultCallback {
    /**
     * 支付结果回调
     *
     * @param code    支付结果code
     * @param message 支付结果描述信息
     */
    void onPayResult(int code, String message);
}
```

**支付参数:**

```java
public class PayInfo {
   /**
     * 游戏方订单号
     */
    private String cpOrderId;
    /**
     * 商品名称
     */
    private String productName;
    /**
     * 商品编码     
     */
    private String productCode;
    /**
     * 商品数量
     */
    private int    productCount;
    /**
     * 价格
     */
    private int    price;
    /**
     * 透传字段
     */
    private String cpExtra;
}
```

**代码示例:**

```java
String cpOrderId = "cp订单号";
//透传字段
String extra = "123456test";
PayInfo payInfo = new PayInfo.Builder()
        .setCpOrderId(cpOrderId) //游戏方自定义订单号
        .setProductCode("pCode0101") //商品编码
        .setProductName("10钻石") //商品名称
        .setPrice(1) //商品价格，单位(分)
        .setProductCount(1) //商品数量，只能是1，
        .setCpExtra(extra) 
        .build();
        
MetaApi.pay(ActivityForTestLoginPay.this, payInfo, new PayResultCallback() {

    @Override
    public void onPayResult(int code, String msg) {
        if (code == MetaPayResult.CODE_PAY_SUCCESS) {
            Toast.makeText(ActivityForTestLoginPay.this, "支付成功", Toast.LENGTH_SHORT).show();
            orderTv.setText("支付结果：支付成功");
        } else {
            Toast.makeText(ActivityForTestLoginPay.this, "支付失败", Toast.LENGTH_SHORT).show();
            orderTv.setText("支付结果：支付失败,code=" + code);
        }
    }
});
```

** 支付结果:**

```java
public class MetaPayResult {
    /**
     * 支付成功code
     */
    public static final int    CODE_PAY_SUCCESS = 0;
    
    /**
     * 支付失败
     */
    public static final int    CODE_PAY_FAIL = 8;
    
    /**
     * 服务器处理超时
     */
    public static final int    CODE_PAY_TIMEOUT = 9;
    
    /**
     * 取消支付
     */
    public static final int    CODE_PAY_CANCEL  = 10;
    
}
```

### 实名认证

#### 获取实名信息

**接口说明：**

```java
/**
 * 获取实名信息回调
 * @param useCache 是否使用缓存信息
 * @param callback 回调结果
 * */
public static void registerRealNameCall(boolean useCache, RealNameAuthenticationCallback callback);
```

**代码示例**

```java
MetaApi.registerRealNameCall(false, new RealNameAuthenticationCallback() {
    @Override
    public void realNameAuthenticationResult(RealNameResult result) {
        Log.d(TAG, result.toString());
    }
});
```

**实名信息**，回调结果RealNameResult

```java
public class RealNameResult{
    // 回调结果code，取值为后⾯的常量，只有200是成功
    private int resultCode;
    // 回调结果message，失败信息在这个⾥⾯
    private String resultMsg;
    // 实名信息，仅获取实名信息才有
    private AuthInfo data;
    
    public static class AuthInfo {
        // ⽤户身份唯⼀标识
        private String uuid;
        // 实名认证状态 0未实名 1已实名
        private int verifyStatus;
        // 证件号码唯⼀标识
        private String cardNo;
        // 年龄
        private int age;        
        //姓名        
        private String realName;
     }
}
```

**RealNameResult的code和msg说明**

| code | msg                      | 备注                              |
| ---- | ------------------------ | --------------------------------- |
| 200  |                          | 请求成功                          |
| 1    | network is not available | 网络未连接                        |
| 2    | malformed url            | url格式错误                       |
| 4    | real name request failed | 请求失败                          |
| 5    | params is null or blank  | 参数缺失                          |
| 6    | result is null or blank  | 返回结果为null                    |
| 7    | initialization fail      | SDK没有初始化                     |
| 8    | body parse fail          | 数据解析失败                      |
| 9    |                          | 认证失败，其他错误，具体看msg信息 |
| 10   | real name close          | 关闭认证页面                      |

> 备注： **return_code = 200** 时需要通过verifyStatus来校验是否已经实名。

#### 进行实名认证

**接口说明：**

```java
/**
 *发起实名认证请求
 *
 * @param name     用户身份证姓名
 * @param cardNo   用户身份证号码
 * @param callback 回调结果
 */
public static void realNameAuth(String name, String cardNo, RealNameAuthenticationCallback callback);
```

**代码示例**

```java
MetaApi.realNameAuth(name, cardNo, new RealNameAuthenticationCallback() {
    @Override
    public void realNameAuthenticationResult(RealNameResult result) {
        // result.getReturn_code() == 200 校验通过
        // result.getReturn_code() == 500 该用户已认证过
        Log.d(TAG, result.toString());
    }
});
```

> 备注：只需要校验return_code即可，return_code = 200时验证成功，return_code = 500时该用户已认证过，其他为认证失败。

#### 打开实名认证页

**接口说明：**

```java
/**
 * 打开实名认证页
 *
 * @param context  [Context]
 * @param callback 回调结果
 */
public static void showMetaRealNameActivity(Context context, RealNameAuthenticationCallback callback) ;
```

**代码示例**

```java
MetaApi.showMetaRealNameActivity(RealNameActivity.this, new RealNameAuthenticationCallback() {
    @Override
    public void realNameAuthenticationResult(RealNameResult result) {
        // result.getReturnCode() == 200 校验通过
        // result.getReturnMsg() == 500 该用户已认证过
        Log.d(TAG, result.toString());
    }
});
```

> 备注：只需要校验return_code即可，return_code = 200时验证成功，return_code = 500时该用户已认证过，其他为认证失败。

### 游戏退出接口

要退出游戏时需要调用SDK提供的退出游戏接口

**接口说明：**

```java
 public static void exitGame(Activity activity, OnExitCallback callback);
```

**代码示例**

```java
MetaApi.exitGame(this, new OnExitCallback() {
            @Override
            public void exitGame() {
                //这里可以做一些保存存档操作 
                
                //保存玩存档后可调用平台的退出游戏方法
                MetaGameHelper.exitGameProcess(MainActivity.this);
            }
        });
```

## 具体用法可以参考[DEMO](https://cdn.233xyx.com/online/U9ClTU9i2AsQ1709024016097.zip)
