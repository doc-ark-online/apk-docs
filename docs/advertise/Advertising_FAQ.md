# 广告FAQ

**尊敬的开发者：**

本文档简单整理了广告联运游戏中的常见问题，我们会依据开发者的反馈不定期完善本文档。

更新时间：2023年8月7日

## 我的游戏接了 233 乐园广告，若会员用户用免广告功能，我会损失这部分收益吗？

**不会损失收益**。对于会员用户触发的免广告场景，平台会按照该用户对应广告位的正常 ECPM（每千次展示收益）标准，为开发者进行结算，计算公式为：收益 = 免广告次数 ×（ECPM ÷ 1000）*分成比例 。

例如某广告位 ECPM 为 30 元，若有 500 次会员免广告，开发者可获收益 = 500 ×（30 ÷ 1000）* 分成比例 ，与实际播放广告收益逻辑一致。

这一机制既保障会员用户体验，也确保开发者在广告生态中获得合理收益，无需担心因免广告功能产生收益折损 。


## 是否可以通过Quick 接入广告SDK

目前广告SDK无法通过quick接入。如有内购付费游戏可通过quick接入，详询对接运营。

## SDK必须要接入登录和注销接口么？

纯广告游戏不需要接入，若为需账号系统可以使用内购SDK的账号系统部分选择性接入。

## 接好了广告SDK之后，要如何测试呢？

233的广告需要处于233环境才能触发，请确保使用实机打开进行测试（和模拟器不兼容）

**自测工具使用说明**

（1）先安装游戏

（2）安装测试工具

（3）打开自测工具，复制包名进去，点击先点击清除，到应用详情【清除缓存】

（4）返回再点击加载

## 广告播放有异常，测试的时候提示“版本不支持联运广告”

**广告异常建议排查顺序**

（1）是用自测工具测试的吗？广告需要233环境才能触发，请使用开发者后台下载的自测工具拉起apk测试。

（2）请确认包名与创建时一致，appkey与后台展示参数一致。

（3）后台广告位绑定游戏了吗？

（4）若还是不行，请发操作录屏到群内确认

## 用自测工具拉起apk闪退、但是直接安装到手机里正常，是为什么呢?

（1）233乐园支持32+64位兼容包。若包体超过2G无法正常打开。

（2）检查下包体的签名是否有问题。

（3）是否使用233不兼容的加固：明确不兼容360加固
- 版本以下不兼容：网易易盾加固工具4.3；易盾版本4.17.142 以下不兼容，以上或本版本可兼容，可与网易方沟通【说明接入233乐园渠道】了解具体操作。

- 需加校验文件兼容：腾讯MTP（或ACE）需增加特定的校验文件，可与腾讯方沟通【说明接入233乐园渠道】了解具体操作。
> 爱加密加固，需要爱加密方协助做加固工具的更新，请与爱加密方沟通【说明接入233乐园渠道】了解具体操作。

（4）游戏是否为沙盒环境，是否接入了反作弊。（可以提供对应的信息给我们技术分析）

（5）是否集成了多个广告SDK（如穿山甲和sigmob），广告联运的游戏只能接入233乐园广告，不允许含有其他官方的三方广告插件。 

（6）是否使用的当前最新的自测工具。

（7）游戏使用Untiy2019及以上版本时，请联系对接运营，后将包体提审上架，提审时请注意勾选采用高于Unity2019版本（含2019）版打包，我们将对其进行处理。

**若以上均已排查还是闪退，可与对接运营沟通并提交技术分析。**

## 测试结果反馈游戏出现问题，重新上传新的游戏包显示无法上传怎么办？

联系审核人员把之前上传的游戏先拒绝审核后，再重新上传即可。

## 因软著问题无法上架？（软著正在办理中怎么办？）

我们仅接受游戏的开发商，或者游戏渠道代理商进行合作，请贵方提供相应的资质证明（或其他媒体渠道或硬核渠道的开发者上架证明），在资质不明的情况下233方无法进行上架。

## 其他渠道上架证明标准？

需要游戏在其他渠道后台上架的截图，截图里可以清晰的显示游戏名，游戏图标，游戏公司还有游戏平台。无法截成一张图的话拍成视频也可以。

## 接入广告后无法播放，出现错误代码怎么办？

onAdShowFailed 30008一般是两种情况：一种是广告位没有关联；一种是pos值错了，检查下插屏/全屏的pos是不是正确的。

## 自测广告发生错误有错误码对照信息吗？

表格还在加载中，请等待加载完成后再尝试复制
