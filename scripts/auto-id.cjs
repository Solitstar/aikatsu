/**
 * 自动修复 items.js 中商品的 id：
 * - 重复 id：保留第一个，后续项自动分配新 id（当前最大 id + 1 递增）
 * - 缺失 id：自动补上
 * 用法：npm run auto-id
 * 测试：node scripts/auto-id.cjs <文件路径>
 */
const fs = require('fs');
const file = process.argv[2] || 'src/data/items.js';
let src = fs.readFileSync(file, 'utf8');

const startMark = 'export const BASE_ITEMS = [';
const startIdx = src.indexOf(startMark);
if (startIdx === -1) {
  console.error('未找到 BASE_ITEMS 定义');
  process.exit(1);
}

// 找到数组闭合的 ]（跳过字符串内的括号）
// 注意：扫描起点在开头的 [ 之后，所以 depth 从 1 开始
let depth = 1, endIdx = -1, inStr = false, strQuote = '';
for (let i = startIdx + startMark.length; i < src.length; i++) {
  const c = src[i];
  if (inStr) {
    if (c === '\\') { i++; continue; }
    if (c === strQuote) inStr = false;
    continue;
  }
  if (c === '"' || c === "'") { inStr = true; strQuote = c; continue; }
  if (c === '[') depth++;
  else if (c === ']') { depth--; if (depth === 0) { endIdx = i; break; } }
}
if (endIdx === -1) {
  console.error('未找到 BASE_ITEMS 数组结束');
  process.exit(1);
}
const body = src.slice(startIdx + startMark.length, endIdx);

// 按花括号平衡切分对象（跳过字符串内的括号）
// 每个 item 文本从 { 开始，包含到下一个 { 之前的全部内容（保留分隔符逗号/换行/缩进）
const items = [];
let itemStart = -1, d = 0;
inStr = false; strQuote = '';
for (let i = 0; i < body.length; i++) {
  const c = body[i];
  if (inStr) {
    if (c === '\\') { i++; continue; }
    if (c === strQuote) inStr = false;
    continue;
  }
  if (c === '"' || c === "'") { inStr = true; strQuote = c; continue; }
  if (c === '{') { if (d === 0) itemStart = i; d++; }
  else if (c === '}') {
    d--;
    if (d === 0) {
      const nextStart = body.indexOf('{', i + 1);
      items.push({ text: body.slice(itemStart, nextStart === -1 ? body.length : nextStart) });
    }
  }
}

// 统计各 id 出现次数（只匹配行首的 id 字段，避免误匹配字符串内的 "id:"）
const idRe = /^[ \t]*id:[ \t]*(\d+)/m;
const counts = new Map();
items.forEach(it => {
  const m = it.text.match(idRe);
  if (m) counts.set(Number(m[1]), (counts.get(Number(m[1])) || 0) + 1);
});

let nextId = Math.max(0, ...counts.keys()) + 1;
let fixed = 0, inserted = 0;
const seen = new Set();

const newItems = items.map(it => {
  const m = it.text.match(idRe);
  if (!m) {
    // 缺失 id：在对象开头插入
    const insertAt = it.text.indexOf('\n');
    if (insertAt === -1) {
      // 单行对象：直接跟在 { 后面
      const fixedText = it.text.replace('{', `{ id: ${nextId++},`);
      inserted++;
      return { text: fixedText };
    }
    const indent = (it.text.match(/\n(\s*)\S/) || ['', '    '])[1] || '    ';
    const fixedText = it.text.slice(0, insertAt) + `\n${indent}id: ${nextId++},` + it.text.slice(insertAt);
    inserted++;
    return { text: fixedText };
  }
  const n = Number(m[1]);
  if (seen.has(n)) {
    // 重复 id：仅保留第一个，后续改新 id
    const fixedText = it.text.replace(idRe, `id: ${nextId++}`);
    fixed++;
    return { text: fixedText };
  }
  seen.add(n);
  return it;
});

if (fixed === 0 && inserted === 0) {
  console.log(`✅ 无需修复：${items.length} 件商品 id 全部唯一`);
  process.exit(0);
}

const newBody = newItems.map(it => it.text).join('');
fs.writeFileSync(file, src.slice(0, startIdx + startMark.length) + newBody + src.slice(endIdx));
console.log(`🔧 已修复：重复 id ${fixed} 个，补充缺失 id ${inserted} 个（共 ${items.length} 件商品）`);
