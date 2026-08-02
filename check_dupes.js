import fs from 'fs';
const code = fs.readFileSync('src/data/items.js', 'utf8');

const match = code.match(/export const BASE_ITEMS = \[([\s\S]*?)\];/);
if (!match) { console.log('Could not find BASE_ITEMS'); process.exit(1); }

const items = [];
const itemRegex = /\{\s*id:\s*(\d+),[\s\S]*?name:\s*"([^"]*)"[\s\S]*?character:\s*"([^"]*)"[\s\S]*?image:\s*"([^"]*)"/g;
let m;
while ((m = itemRegex.exec(match[1])) !== null) {
  items.push({ id: parseInt(m[1]), name: m[2], character: m[3], image: m[4] });
}
console.log('Total items:', items.length);

// 1. Duplicate IDs
const idMap = {};
items.forEach(i => { if (!idMap[i.id]) idMap[i.id] = []; idMap[i.id].push(i); });
const dupIds = Object.entries(idMap).filter(([, l]) => l.length > 1);
console.log('\n=== 1. 重复ID ===');
if (dupIds.length === 0) console.log('无');
else dupIds.forEach(([id, list]) => console.log('ID ' + id + ' x' + list.length + ': ' + list.map(i => i.name + ' / ' + i.character).join(' | ')));

// 2. Exact duplicates (same name+character+image)
const seen = {};
items.forEach(i => { const k = i.name + '|||' + i.character + '|||' + i.image; if (!seen[k]) seen[k] = []; seen[k].push(i.id); });
const exact = Object.entries(seen).filter(([, ids]) => ids.length > 1);
console.log('\n=== 2. 完全重复(同名+同角色+同图片) ===');
if (exact.length === 0) console.log('无');
else exact.forEach(([k, ids]) => { const [n, c] = k.split('|||'); console.log('IDs ' + ids.join(', ') + ': ' + n + ' / ' + c); });

// 3. Same name+character, different image
const seenNC = {};
items.forEach(i => { const k = i.name + '|||' + i.character; if (!seenNC[k]) seenNC[k] = []; seenNC[k].push(i); });
const sameNC = Object.entries(seenNC).filter(([, list]) => {
  const imgs = [...new Set(list.map(i => i.image))];
  return imgs.length > 1;
});
console.log('\n=== 3. 同名+同角色但图片不同 ===');
if (sameNC.length === 0) console.log('无');
else sameNC.forEach(([k, list]) => { const [n, c] = k.split('|||'); console.log('IDs ' + list.map(i => i.id).join(', ') + ': ' + n + ' / ' + c + ' (' + list.length + '个)'); });

// 4. Image URL typos
const typos = items.filter(i => i.image && !i.image.match(/\.(png|jpg|jpeg|webp|gif)(\?|$)/i));
console.log('\n=== 4. 图片URL格式异常 ===');
if (typos.length === 0) console.log('无');
else typos.forEach(t => console.log('ID ' + t.id + ': ' + t.image));

// 5. Missing data
const missing = items.filter(i => !i.character || !i.image);
console.log('\n=== 5. 缺少数据(char或image为空) ===');
if (missing.length === 0) console.log('无');
else missing.forEach(m => console.log('ID ' + m.id + ': ' + m.name + ' | char=' + (m.character || '(空)') + ' | img=' + (m.image || '(空)')));
