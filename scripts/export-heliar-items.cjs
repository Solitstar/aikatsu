/**
 * 导出所有 Heliar 图床商品 → JSON 映射文件，方便批量替换
 * 用法: node scripts/export-heliar-items.cjs
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const content = fs.readFileSync(path.join(ROOT, 'src', 'data', 'items.js'), 'utf-8');
const items = [];
const re = /\{\s*\n\s*id:\s*(\d+),[\s\S]*?name:\s*"([^"]+)"[\s\S]*?image:\s*"([^"]*)"/g;
let m;
while ((m = re.exec(content)) !== null) {
  const id = parseInt(m[1]);
  const name = m[2];
  const image = m[3];
  if (image.includes('heliar')) {
    items.push({ id, name, oldUrl: image, newUrl: '' });
  }
}

const output = path.join(ROOT, 'scripts', 'heliar-replacements.json');
fs.writeFileSync(output, JSON.stringify(items, null, 2), 'utf-8');
console.log(`已导出 ${items.length} 件 Heliar 商品到: ${output}`);
console.log('请将每项的 "newUrl" 改为新的 Imgur 地址，然后运行:');
console.log('  node scripts/apply-heliar-replacements.cjs');
