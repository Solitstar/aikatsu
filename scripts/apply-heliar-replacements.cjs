/**
 * 读取 heliar-replacements.json 中已填写的 newUrl，批量更新 items.js
 * 用法: node scripts/apply-heliar-replacements.cjs
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const MAPPING = path.join(__dirname, 'heliar-replacements.json');
const ITEMS_JS = path.join(ROOT, 'src', 'data', 'items.js');

const mapping = JSON.parse(fs.readFileSync(MAPPING, 'utf-8'));
const pending = mapping.filter(it => it.newUrl && it.newUrl.trim());

if (pending.length === 0) {
  console.log('⚠️  没有待替换的项，请先在 heliar-replacements.json 中填写 newUrl');
  process.exit(0);
}

console.log(`准备替换 ${pending.length} 件商品图片 URL...\n`);

let content = fs.readFileSync(ITEMS_JS, 'utf-8');
let replaced = 0;

for (const item of pending) {
  if (!item.oldUrl) continue;
  // 在 items.js 中精确替换该 item 的 image 字段
  const pattern = `id: ${item.id},[\\s\\S]*?image: "${item.oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`;
  const regex = new RegExp(pattern, 'g');
  const before = content.length;
  content = content.replace(regex, (match) => {
    return match.replace(`image: "${item.oldUrl}"`, `image: "${item.newUrl}"`);
  });
  if (content.length !== before) replaced++;
}

fs.writeFileSync(ITEMS_JS, content, 'utf-8');
console.log(`✅ 成功替换 ${replaced}/${pending.length} 件`);

// 清空已处理的条目
const remaining = mapping.filter(it => !it.newUrl || !it.newUrl.trim());
fs.writeFileSync(MAPPING, JSON.stringify(remaining, null, 2), 'utf-8');
console.log(`📋 剩余 ${remaining.length} 件待处理，保存在 ${MAPPING}`);
console.log('\n接下来运行:');
console.log('  npm run download-images && npm run convert-webp');
