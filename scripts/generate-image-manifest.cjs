/**
 * 扫描 public/images/ 下实际存在的本地缓存图，生成 src/data/localImages.js
 * 用法: node scripts/generate-image-manifest.cjs
 *
 * 为什么需要：商品有 1.5 万+ 件，列表页据此只为「确实有可用本地图」的商品走同源加载，
 * 避免其余商品先发起必然 404 的请求（串行失败后才去加载远程图）。
 *
 * 源链接校验：scripts/image-sources.json 记录了每张本地图下载时对应的图片链接指纹。
 * 若 items.js 里的链接已经变化，说明本地图是旧图 —— 此时不写入清单，
 * 前端会自动改用远程新图（并提示运行 npm run fetch-images 重新下载）。
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { extractImageEntries } = require('./item-image-entries.cjs');

const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');
const SOURCES_FILE = path.join(__dirname, 'image-sources.json');
const OUT_FILE = path.join(__dirname, '..', 'src', 'data', 'localImages.js');

// 同一资源名存在多种格式时，优先取体积更小的
const EXT_PRIORITY = ['webp', 'jpg', 'jpeg', 'png'];

const hashUrl = (url) => crypto.createHash('sha1').update(url).digest('hex').slice(0, 12);

/** 下载时记录的源链接指纹：{ 资源名: urlHash } */
const readSources = () => {
  try {
    return JSON.parse(fs.readFileSync(SOURCES_FILE, 'utf-8'));
  } catch {
    return {};
  }
};

const sources = readSources();
const urlByKey = new Map(extractImageEntries().map((e) => [e.key, e.url]));

const manifest = {};
const stale = [];

for (const file of fs.readdirSync(IMAGES_DIR)) {
  const m = file.match(/^(.+)\.(webp|jpe?g|png)$/i);
  if (!m) continue;
  const base = m[1];
  const ext = m[2].toLowerCase();

  // 本地图对应的源链接已变更 → 旧图不能用，跳过它改用远程新图
  const recorded = sources[base];
  const currentUrl = urlByKey.get(base);
  if (recorded && currentUrl && recorded !== hashUrl(currentUrl)) {
    if (!stale.includes(base)) stale.push(base);
    continue;
  }

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

if (stale.length) {
  const shown = stale.slice(0, 10).join(', ');
  console.log(`⚠️ ${stale.length} 张本地图与 items.js 的图片链接不一致，已跳过（改用远程新图）：${shown}${stale.length > 10 ? ' …' : ''}`);
  console.log('   运行 npm run fetch-images 可重新下载这些图。');
}
