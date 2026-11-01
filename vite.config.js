import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = path.dirname(fileURLToPath(import.meta.url))

// 构建前 scripts/write-version.cjs 会生成 public/version.json，
// 这里把同一个 timestamp 注入前端代码：页面因此知道自己属于哪次部署，
// 即使 HTML/JS 来自浏览器缓存，也能通过与线上 version.json 对比发现旧版本。
function readBuildVersion() {
  try {
    const raw = fs.readFileSync(path.join(rootDir, 'public', 'version.json'), 'utf-8')
    return String(JSON.parse(raw).timestamp ?? '')
  } catch {
    return ''
  }
}

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/aikatsu/' : '/',
  define: {
    __APP_VERSION__: JSON.stringify(readBuildVersion()),
  },
}))
