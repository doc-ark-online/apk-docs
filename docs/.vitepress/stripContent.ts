import type { SSGContext } from 'vitepress'

/** 打包 HTML 仅保留 title，清空 body 供客户端 mount（避免 hydration mismatch） */
export function stripDocumentContent(html: string): string {
  let result = html

  // 清空 body，只留空 #app；有预渲染 DOM 时 createSSRApp 会 hydrate 导致 mismatch
  result = result.replace(
    /<body>[\s\S]*?<\/body>/,
    '<body>\n    <div id="app"></div>\n  </body>'
  )

  // 内联站点配置（sidebar/nav 文字），改由外部 metadata.js 加载
  result = result.replace(
    /<script>window\.__VP_(?:HASH_MAP|SITE_DATA)__[\s\S]*?<\/script>/g,
    ''
  )

  // 仅保留 title，清空 description 文案
  result = result.replace(
    /<meta name="description" content="[^"]*">/g,
    '<meta name="description" content="">'
  )

  // lean 包不含正文，刷新/direct load 须预加载完整 page chunk
  result = result.replace(/\.lean\.js/g, '.js')

  return result
}

export function stripPostRender(context: SSGContext) {
  context.content = stripDocumentContent(context.content)
  return context
}
