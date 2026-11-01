/**
 * 从 src/data/items.js 里提取所有图片引用（主图 + 多版本图）。
 * key 的命名与前端完全一致：item_{id} / item_{id}_v{idx}。
 *
 * 抽成公共模块，供「拉取本地图」和「生成本地图清单」两个脚本复用，
 * 避免两处各写一份解析逻辑导致 key 对不上。
 */
const fs = require('fs');
const path = require('path');

const ITEMS_FILE = path.join(__dirname, '..', 'src', 'data', 'items.js');

function extractImageEntries() {
  const src = fs.readFileSync(ITEMS_FILE, 'utf-8');
  const ids = [];
  const idRe = /id:\s*(\d+)\s*,/g;
  let m;
  while ((m = idRe.exec(src)) !== null) ids.push({ id: parseInt(m[1], 10), start: m.index });

  const entries = [];
  for (let i = 0; i < ids.length; i++) {
    const block = src.slice(ids[i].start, i + 1 < ids.length ? ids[i + 1].start : undefined);
    const id = ids[i].id;

    const img = block.match(/image:\s*"([^"]+)"/);
    if (img && img[1]) entries.push({ key: `item_${id}`, id, url: img[1], suffix: '' });

    // 空 url 也要计入索引，否则它后面的版本号会整体错位（如某一版暂时没图时），
    // 导致文件名与前端使用的 item_{id}_v{idx} 对不上。
    [...block.matchAll(/url:\s*'([^']*)'/g)].forEach((um, vi) => {
      if (!um[1]) return;
      entries.push({ key: `item_${id}_v${vi}`, id, url: um[1], suffix: `_v${vi}` });
    });
  }
  return entries;
}

module.exports = { extractImageEntries, ITEMS_FILE };
