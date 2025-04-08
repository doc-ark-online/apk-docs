import type { DefaultTheme } from 'doc-theme-323'
import { defineConfigWithTheme } from 'vitepress'

export const sidebar: DefaultTheme.Config['sidebar'] = [
  {
    text: 'Index',
    items: [{ text: '介绍', link: '/index.md' }]
  }
]

export default defineConfigWithTheme<DefaultTheme.Config>({
  ignoreDeadLinks: true,
  title: '文档',
  appearance: false,
  description: '开发者平台文档',
  outDir: '../dist',
  head: [
    [
      'meta',
      {
        name: 'docsearch:tags',
        content: 'product-docs'
      }
    ],
    [
      'script',
      {},
      `
    window.PandoraConfig = {
      base: {
        index_type: 'cDEwMTE2/wl',
        selfpackagename: 'com.metaverse.creator.api',
      },
      other: {
        appkey: 'cDEwMTE2',
        zone: 'zh',
        baseUrl: 'https://push.233leyuan.com'
      }
    }
    `
    ],
    [
      'script',
      {
        src: 'https://wstatic-01-ali.233leyuan.com/common/pandora/5.2.4/pandora_sdk.min.js'
      }
    ],
    [
      'link',
      {
        rel: 'icon',
        href: 'https://cdn.233xyx.com/online/CKuKtOyybKPQ1716443452384.png'
      }
    ]
  ],
  themeConfig: {
    logo: 'https://cdn.233xyx.com/online/dqHT5TsyRrWv1716446116296.png',
    algolia: {
      appId: 'I2PHYUBLCN',
      apiKey: '78ac86e74b310228cbab71c6b8a81272',
      indexName: 'docs-apk',
      // indexName: 'api-docs_prodigytech',
      project: {
        active: 'apk-docs',
        isShowAllSearch: false,
        isShowTab: false,
        arr: [
          // {
          //   key: 'api-docs',
          //   facetFilters: ['tags:api-docs'],
          //   name: 'API文档'
          // },
          {
            key: 'apk-docs',
            name: '产品手册'
          }
          // {
          //   key: 'learning-docs',
          //   facetFilters: ['tags:learning-docs'],
          //   name: '教程文档'
          // },
          // {
          //   name: '论坛',
          //   url: 'https://forum.ark.online/search.php?searchsubmit=yes&mod=forum&srchtxt='
          // }
        ]
      },
      searchPage: 'https://search.ark.online/#/search'
    },
    sidebar: [
      { text: '平台指引', link: 'guide.md' },
      {
        text: '账号注册',
        collapsible: true,
        collapsed: true,
        items: [
          { text: '企业认证', link: '/operate/enterprise_certification.md' },
          { text: '认证材料', link: '/operate/prepare_materials.md' },
          { text: '权限管理', link: '/operate/authority_management.md' }
        ]
      },
      {
        text: '操作指引',
        collapsible: true,
        collapsed: true,
        items: [
          { text: '更新日志', link: '/releasenote.md' },
          { text: '游戏测评', link: '/operate/game_review.md' },
          { text: '上架说明', link: '/operate/listing_instructions.md' },
          {
            text: '游戏创建',
            items: [
              { text: '联运游戏创建', link: '/operate/intermodal_games.md' },
              { text: '官包测试创建', link: '/operate/official_test.md' }
            ]
          },
          { text: '自测工具', link: '/operate/test_tools.md' },
          { text: '游戏上传', link: '/operate/game_upload.md' },
          { text: '游戏认领', link: '/operate/game_claim.md' },
          { text: '新游预约', link: '/operate/game_reservation.md' },
          { text: '游戏数据', link: '/operate/BasicData.md' },
          { text: '公告推送', link: '/operate/Announcement&push.md' },
          { text: '礼包管理', link: '/purchase/gift_pack.md' },
          { text: '福利礼包', link: '/operate/gift_code.md' },
          { text: '游戏活动', link: '/operate/game_activity.md' },
          { text: '合同签约', link: '/operate/contract_signing.md' },
          { text: '兼容适配', link: '/operate/compatible.md' },
          { text: '233乐园审核标准规范', link: '/operate/audit_standard.md' }
        ]
      },
      {
        text: '内购游戏流程',
        collapsible: true,
        collapsed: false,
        items: [
          { text: '内购游戏对接', link: '/purchase/purchase_process.md' },
          { text: '内购FAQ', link: '/purchase/purchase_FAQ.md' },
          {
            text: '备案识别码关联',
            link: '/purchase/registration_identification_code.md'
          }
        ]
      },
      {
        text: '广告游戏流程',
        collapsible: true,
        collapsed: false,
        items: [
          { text: '广告游戏对接', link: '/advertise/Advertising_process.md' },
          { text: '广告位申请', link: '/advertise/Advertising_application.md' },
          { text: '广告规则', link: '/advertise/Advertising_rules.md' },
          { text: '广告FAQ', link: '/advertise/Advertising_FAQ.md' }
        ]
      },
      {
        text: '游戏运营',
        collapsible: true,
        collapsed: true,
        items: [
          { text: '游戏内测', link: '/purchase/game_test_application.md' },
          { text: '新游上线', link: '/purchase/new_game_online.md' },
          { text: '版本更新', link: '/purchase/new_version_update.md' },
          { text: '资源申请', link: '/purchase/general_resources.md' },
          {
            text: '运营社区',
            items: [
              { text: '运营好社区', link: '/operate/CommunityOperations.md' },
              { text: '社区操作', link: '/operate/Communitysection.md' }
            ]
          },
          {
            text: '运营活动',
            items: [
              { text: '签到活动', link: '/purchase/check-in_activity.md' },
              { text: '综合活动', link: '/purchase/comprehensive_activity.md' },
              { text: '代金券', link: '/purchase/voucher.md' },
              { text: '社区活动', link: '/purchase/community_activity.md' },
              { text: '申请活动', link: '/purchase/event_application.md' },
              { text: '预约活动', link: '/purchase/event_reservation.md' }
            ]
          }
        ]
      },
      {
        text: 'SDK接入',
        collapsible: true,
        collapsed: true,
        items: [
          { text: '实名认证', link: '/SDK/verified.md' },
          {
            text: '内购SDK',
            items: [
              { text: '客户端接入', link: '/SDK/client_access.md' },
              { text: '支付服务端接入', link: '/SDK/server_access.md' },
              {
                text: '开放平台鉴权',
                link: '/SDK/open_platform_authentication.md'
              },
              { text: '用户校验', link: '/SDK/user_verification.md' }
            ]
          },
          { text: '广告SDK', link: '/SDK/advertising_SDK.md' }
        ]
      },
      {
        text: '开发者协议',
        collapsible: true,
        collapsed: true,
        items: [
          { text: '平台隐私政策', link: '/protocol/平台隐私政策.md' },
          { text: '开发者服务协议', link: '/protocol/开发者服务协议.md' },
          {
            text: '开发者广告合作须知',
            link: '/protocol/开发者广告合作须知.md'
          },
          { text: '安全评估报告', link: '/protocol/安全评估报告.md' },
          {
            text: '开发者隐私合规指南',
            link: '/protocol/开发者隐私合规指南.md'
          },
          { text: '违规处罚规定', link: '/protocol/违规处罚规定.md' },
          {
            text: '233乐园内购SDK',
            items: [
              {
                text: '隐私政策',
                link: '/protocol/233乐园内购SDK隐私政策.md'
              },
              {
                text: '合规使用说明',
                link: '/protocol/233乐园内购SDK合规使用说明.md'
              }
            ]
          },
          {
            text: '233乐园广告SDK',
            items: [
              {
                text: '隐私政策',
                link: '/protocol/233乐园广告SDK隐私政策.md'
              },
              {
                text: '合规使用说明',
                link: '/protocol/233乐园广告SDK合规使用说明.md'
              }
            ]
          }
        ]
      },
      {
        text: '备案申报指引',
        collapsible: true,
        collapsed: true,
        items: [
          { text: 'ICP备案', link: '/ICP.md' },
          { text: '游戏备案', link: '/filing.md' }
        ]
      }
    ],
    siteTitle: '文档中心',
    nav: [
      {
        text: '我的游戏',
        link: 'https://dev.233leyuan.com/#/admin/my-game'
      },
      {
        text: '游戏数据',
        link: 'https://dev.233leyuan.com/#/admin/BasicData'
      },
      {
        text: '财务结算',
        link: 'https://dev.233leyuan.com/#/admin/bill'
      },
      {
        text: '福利配置',
        link: 'https://dev.233leyuan.com/#/admin/welfare-introduction'
      },
      {
        text: '233乐园',
        link: 'https://www.233leyuan.com/'
      }
    ],
    socialLinks: [
      // { link: 'https://github.com/doc-ark-online/apk-docs', icon: 'github' },
      {
        link: 'https://github.com/doc-ark-online/apk-docs/issues',
        icon: {
          svg: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="20" height="20" rx="10" fill="#676D77"/>
          <path d="M14.5 15C15.3284 15 16 14.3284 16 13.5V6.5C16 5.67163 15.3284 5 14.5 5H5.49999C4.67163 5 4 5.67163 4 6.5V13.5C4 14.3284 4.67163 15 5.49999 15H7.74998L10.75 18V15H14.5Z" fill="white"/>
          <path d="M10.0003 13.2857C10.3553 13.2857 10.6431 12.9979 10.6431 12.6429C10.6431 12.2878 10.3553 12 10.0003 12C9.64524 12 9.35742 12.2878 9.35742 12.6429C9.35742 12.9979 9.64524 13.2857 10.0003 13.2857Z" fill="#676D77"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M9.19627 6.55985C9.57999 6.4009 10.0022 6.35932 10.4096 6.44035C10.817 6.52137 11.1911 6.72138 11.4848 7.01507C11.7785 7.30876 11.9785 7.68295 12.0596 8.09031C12.1406 8.49767 12.099 8.91991 11.94 9.30363C11.7811 9.68735 11.5119 10.0153 11.1666 10.2461C10.9911 10.3633 10.8 10.4528 10.5999 10.5125V11C10.5999 11.3314 10.3313 11.6 9.9999 11.6C9.66853 11.6 9.3999 11.3314 9.3999 11V10.4C9.3999 9.82145 9.85795 9.47175 10.2371 9.36818C10.3301 9.34278 10.4189 9.30246 10.4999 9.24832C10.6479 9.14942 10.7633 9.00886 10.8314 8.84441C10.8995 8.67996 10.9173 8.499 10.8826 8.32441C10.8479 8.14983 10.7622 7.98947 10.6363 7.8636C10.5104 7.73773 10.3501 7.65201 10.1755 7.61729C10.0009 7.58256 9.81994 7.60038 9.65549 7.6685C9.49103 7.73662 9.35047 7.85198 9.25158 7.99998C9.15269 8.14799 9.0999 8.32199 9.0999 8.49999C9.0999 8.83137 8.83127 9.1 8.4999 9.1C8.16853 9.1 7.8999 8.83137 7.8999 8.49999C7.8999 8.08465 8.02307 7.67864 8.25382 7.3333C8.48457 6.98795 8.81254 6.71879 9.19627 6.55985ZM10.5496 10.5273C10.5496 10.5273 10.5499 10.527 10.5505 10.5268Z" fill="#676D77"/>
          </svg>
          `
        }
      }
    ],
    outline: [2, 4],
    editLink: {
      pattern:
        'https://github.com/doc-ark-online/apk-docs/tree/main/docs/:path',
      text: '编辑'
    },
    lastUpdatedText: 'Updated Date',
    docFooter: {
      prev: 'Pagina prior',
      next: 'Proxima pagina'
    },
    pandora: {
      type: 'apk-product'
    }
  }
})
