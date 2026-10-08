/**
 * 扫描 public/images/ 下实际存在的本地缓存图，生成 src/data/localImages.js
 * 用法: node scripts/generate-image-manifest.cjs
 *
 * 为什么需要：商品有 1.2 万+ 件，而本地缓存图只有一两百张。
 * 兜底逻辑据此只为「确实有本地图」的商品走同源加载，
 * 避免其余商品先发起必然 404 的请求（串行失败后才去加载远程图）。
 */
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');
const OUT_FILE = path.join(__dirname, '..', 'src', 'data', 'localImages.js');

// 同一资源名存在多种格式时，优先取体积更小的
const EXT_PRIORITY = ['webp', 'jpg', 'jpeg', 'png'];

const manifest = {};
for (const file of fs.readdirSync(IMAGES_DIR)) {
  const m = file.match(/^(.+)\.(webp|jpe?g|png)$/i);
  if (!m) continue;
  const base = m[1];
  const ext = m[2].toLowerCase();
  const cur = manifest[base];
  if (!cur || EXT_PRIORITY.indexOf(ext) < EXT_PRIORITY.indexOf(cur)) {
    manifest[base] = ext;
  }
}

const keys = Object.keys(manifest).sort();
const body = keys.map(k => `  '${k}': '${manifest[k]}',`).join('\n');

const content = `// 本文件由 scripts/generate-image-manifest.cjs 自动生成，请勿手工编辑
// public/images/ 下实际存在的本地缓存图：资源名 → 扩展名（同名多格式时取体积最小的）

export const LOCAL_IMAGES = {
${body}
};
`;

fs.writeFileSync(OUT_FILE, content, 'utf8');
console.log(`✅ 本地图片清单已生成: src/data/localImages.js (${keys.length} 项)`);
