const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

// Get all items from items.js
const content = fs.readFileSync(path.join(ROOT, 'src', 'data', 'items.js'), 'utf-8');
const items = [];
const re = /\{\s*\n\s*id:\s*(\d+),[\s\S]*?name:\s*"([^"]+)"[\s\S]*?image:\s*"([^"]*)"/g;
let m;
while ((m = re.exec(content)) !== null) {
  items.push({ id: parseInt(m[1]), name: m[2], image: m[3] });
}

// Get existing local files
const dir = path.join(ROOT, 'public', 'images');
const existFiles = new Set();
if (fs.existsSync(dir)) {
  fs.readdirSync(dir).forEach(f => {
    const match = f.match(/^item_(\d+)\.(webp|png|jpg)$/);
    if (match) existFiles.add(parseInt(match[1]));
  });
}

// Separate by host
const missingHeliar = [];
const missingImgur = [];
const missingEmpty = [];

items.forEach(it => {
  if (existFiles.has(it.id)) return;
  if (!it.image) {
    missingEmpty.push(it);
  } else if (it.image.includes('imgur')) {
    missingImgur.push(it);
  } else if (it.image.includes('heliar')) {
    missingHeliar.push(it);
  }
});

console.log('=== 图片缓存状态 ===');
console.log('总数:', items.length);
console.log('已有本地缓存:', items.length - missingHeliar.length - missingImgur.length - missingEmpty.length);
console.log('缺少本地缓存:', missingHeliar.length + missingImgur.length + missingEmpty.length);
console.log('');

if (missingImgur.length > 0) {
  console.log('--- Imgur 图床（可正常下载）---');
  missingImgur.forEach(it => console.log('  ID:' + it.id + '  ' + it.name));
  console.log('');
}

if (missingHeliar.length > 0) {
  console.log('--- Heliar 图床（502 挂掉）---');
  missingHeliar.forEach(it => console.log('  ID:' + it.id + '  ' + it.name));
  console.log('');
}

if (missingEmpty.length > 0) {
  console.log('--- 图片为空 ---');
  missingEmpty.forEach(it => console.log('  ID:' + it.id + '  ' + it.name));
  console.log('');
}

console.log('共 ' + (missingImgur.length + missingHeliar.length + missingEmpty.length) + ' 件缺少本地缓存');
console.log('Imgur: ' + missingImgur.length + ' (可正常下载)');
console.log('Heliar: ' + missingHeliar.length + ' (图床已挂)');
console.log('空图片: ' + missingEmpty.length);
