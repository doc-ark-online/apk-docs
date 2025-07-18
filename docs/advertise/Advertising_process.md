# 广告流程

![img](https://arkimg.ark.online/(null)-20240520173554500.png)

## 企业认证

通过开发者后台注册账号，并完成企业认证，并告知对接群内运营人员认证的公司名称，若之前已完成认证可忽略


## 创建联运游戏

进行了企业并建好广告位完成后，通过右上角创建游戏，选择联运游戏，（仅有进行了企业认证的游戏，才能进行联运合作），如果游戏管理界面已有该游戏，则不用进行创建。

**具体操作流程**：[游戏创建](../operate/intermodal_games.md)

## 广告SDK

需要先创建好广告联运游戏，创建后针对游戏包接入广告SDK代码，接入后的游戏测试符合自测标准，否则需要仔细核对代码是否接入异常，对接中产生疑问可联系对接运营协助解决。

**广告SDK文档**：[广告SDK](../SDK/advertising_SDK.md)

## 游戏信息

需要贵方提供游戏的基本信息，我们核对与入库；

- 游戏提供商：企业已认证的名字
- 游戏名称：XXXX
- 游戏类别：单机/网游
- 合作方式：广告/内购+广告
- 实名接入：无特殊情况，默认使用233防沉迷和实名
- 设备要求：安卓版本或配置要求
- 是否全渠道首发：这里指全网首发
- 上线时间：xx月xx日xx点xx分，如有其他特殊要求，请注明！

## 自测工具

SDK 接入完毕后，请先使用自测工具进行测试，确保游戏能够正常登录，充值后道具能正常到账，游戏内无第三方外链等违规内容。

### 使用说明

1、先安装游戏 
2、安装测试工具 
3、打开自测工具，输入包名进去，点击清除后跳到应用详情，点击清除缓存 
4、回到自测工具，点击拉起

<video controls src="https://cdn.233xyx.com/1629017567424_707.mp4"></video>

### 测试内容

1. 可以通过233账号登陆
2. 悬浮球位于页面边界
3. 界面可适配，无超出页面或大面积黑边情况
4. 无大面积影响用户体验的广告遮挡
5. 激励广告可以正常发放奖励，
6. 广告内容符合[广告规则](../advertise/Advertising_rules.md)

### 注意事项

233乐园是基于沙盒环境运行，不支持第三方登录，不支持外部下载的方式；

> 游戏需要进行版本更新或需要替换包体，请登录开发者后台-游戏管理页，找到对应游戏点击版本升级进行申请。

**游戏审核注意事项：**

- 包体更新需要增加版本号，否则将导致包体提交失败，影响审核；
- 仅更新素材，不需要替换包体，提交对应素材进行审核即可；
- 提交的游戏包体需要先使用自测工具，确认广告播放正常、播放完成后可正确获得奖励；
- 提交更新包后，同步信息至对接运营，以便更快速通过审核。

## 上架规范

1. 在提交正式包前，请先进行自测并确认广告播放正常，奖励正常到账，并符合上述规范。（使用方式：将【自测工具】和游戏安装到手机上，复制游戏包名进去点击拉起即可；
2. 确认正常后，点击上传更新包，并告知群内运营人员具体的广告埋点位置；工作日提交的游戏，通常在24小时内测试完毕。
3. 测试完毕后，运营人员会在群内告知上架并安排曝光，若有特定上架时间请提前告知。
4. 233乐园是基于沙盒环境运行，不支持直接跳APP登录和支付，请确保游戏内无第三方登录，若带内购，请接内购联运。

### 广告触发位置告知模板

游戏名称：                  包名：

合作状态：广告联运

上线时间：测试完毕后

### 广告类型与触发点

1. 激励视频：①商店页  ②购买皮肤 ③获得抽奖次数



### 更新告知模板

游戏名称：          

包名：

更新内容： 更新了简介/发布了新版本/补充资质

更新机制：强制更新、选择性更新。

待审核的APK是否已上传后台：

> 请确保将上传的APK包名与之前的包名保持一致，以防上传失败，版本号必须有提升。

更新后的游戏资料，没有更新填无，如若有请注明更新内容
