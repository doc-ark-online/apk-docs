import { copyFileSync, existsSync, readdirSync, readFileSync, writeFileSync } from 'fs'
import { dirname, join } from 'path'
import type { Plugin } from 'vite'

const LEAN_LOADER =
  '&&(i=i.replace(/\\.js$/,".lean.js"))'

function patchFile(filePath: string, patch: (code: string) => string) {
  const code = readFileSync(filePath, 'utf8')
  const next = patch(code)
  if (next !== code) {
    writeFileSync(filePath, next)
  }
}

/** 将项目根目录 robots.txt 复制到 dist 根目录 */
export function copyRobotsTxt(outDir: string) {
  const src = join(dirname(outDir), 'robots.txt')
  if (existsSync(src)) {
    copyFileSync(src, join(outDir, 'robots.txt'))
  }
}

/** 构建完成后 patch dist，确保刷新/direct load 加载完整 page chunk */
export function patchDistAssets(outDir: string) {
  const assetsDir = join(outDir, 'assets')

  for (const file of readdirSync(assetsDir)) {
    if (/^app\.[a-z0-9]+\.js$/i.test(file)) {
      patchFile(join(assetsDir, file), (code) =>
        code.includes(LEAN_LOADER) ? code.replace(LEAN_LOADER, '') : code
      )
    }

    if (/\.md\.[a-z0-9]+\.lean\.js$/i.test(file)) {
      // lean 包在空 HTML 场景下不可用，避免误加载
      patchFile(join(assetsDir, file), () => 'export default null')
    }
  }
}

/** VitePress client bundle 在 generateBundle 之后还会写入，writeBundle 再 patch 一次 */
export function disableLeanPages(): Plugin {
  return {
    name: 'vitepress-disable-lean-pages',
    apply: 'build',
    enforce: 'post',
    writeBundle(options) {
      const outDir = options.dir
      if (outDir) {
        patchDistAssets(outDir)
      }
    }
  }
}
