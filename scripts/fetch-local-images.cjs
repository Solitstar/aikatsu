/**
 * 从 imgur 批量拉取商品图 → 缩放 → 转 WebP，写入 public/images/
 *
 * 用途：把图片托管进仓库，由 GitHub Pages 同源提供（国内访问比 imgur 快一个数量级）。
 * 因为本机直连 imgur 很慢，实际批量执行放在 GitHub Actions 上（runner 在海外）：
 *   .github/workflows/fetch-images.yml
 *
 * 用法:
 *   node scripts/fetch-local-images.cjs --target 320 --limit 200 --offset 0
 *   node scripts/fetch-local-images.cjs --target 320                 # 全量（跳过已有）
 *   node scripts/fetch-local-images.cjs --target 320 --force         # 覆盖已有
 */
const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');

const OUT_DIR = path.join(__dirname, '..', 'public', 'images');
const ITEMS_FILE = path.join(__dirname, '..', 'src', 'data', 'items.js');

const arg = (name, def) => {
  const i = process.argv.indexOf(`--${name}`);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : def;
};
const hasFlag = (name) => process.argv.includes(`--${name}`);

const TARGET = parseInt(arg('target', '320'), 10);
const LIMIT = parseInt(arg('limit', '0'), 10) || 0;
const OFFSET = parseInt(arg('offset', '0'), 10) || 0;
const QUALITY = parseInt(arg('quality', '75'), 10);
const CONCURRENCY = parseInt(arg('concurrency', '8'), 10);
const FORCE = hasFlag('force');

// ---- 从 items.js 提取图片条目（主图 + 多版本图）----
function extractEntries() {
  const src = fs.readFileSync(ITEMS_FILE, 'utf-8');
  const ids = [];
  const idRe = /id:\s*(\d+)\s*,/g;
  let m;
  while ((m = idRe.exec(src)) !== null) ids.push({ id: parseInt(m[1], 10), start: m.index });

  const entries = [];
  for (let i = 0; i < ids.length; i++) {
    const block = src.slice(ids[i].start, i + 1 < ids.length ? ids[i + 1].start : undefined);
    const img = block.match(/image:\s*"([^"]+)"/);
    if (img) entries.push({ id: ids[i].id, url: img[1], suffix: '' });
    [...block.matchAll(/url:\s*'([^']+)'/g)].forEach((um, vi) => {
      entries.push({ id: ids[i].id, url: um[1], suffix: `_v${vi}` });
    });
  }
  return entries;
}

// ---- 源图统一取 imgur 的 640px 档，再自行缩放，避免二次压缩导致画质损失 ----
const IMGUR_RE = /^(https?:\/\/i\.imgur\.com\/[A-Za-z0-9]+)(\.[A-Za-z0-9]+)$/;
const sourceUrlFor = (url) => {
  const m = IMGUR_RE.exec(url);
  return m ? `${m[1]}l${m[2]}` : url;
};

function download(url, redirects = 3) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0 Safari/537.36',
        Accept: 'image/avif,image/webp,image/png,image/*,*/*;q=0.8',
      },
      timeout: 30000,
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location && redirects > 0) {
        res.resume();
        return download(res.headers.location, redirects - 1).then(resolve, reject);
      }
      if (res.statusCode !== 200) { res.resume(); return reject(new Error(`HTTP ${res.statusCode}`)); }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject).on('timeout', function () { this.destroy(new Error('请求超时')); });
  });
}

async function main() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  let entries = extractEntries();
  console.log(`items.js 中共 ${entries.length} 处图片引用`);

  if (OFFSET) entries = entries.slice(OFFSET);
  if (LIMIT) entries = entries.slice(0, LIMIT);

  const targets = [];
  for (const e of entries) {
    // 同一资源已有任意格式的本地图时跳过，避免重复占用
    const base = `item_${e.id}${e.suffix}`;
    const exists = ['webp', 'png', 'jpg'].some((ext) => fs.existsSync(path.join(OUT_DIR, `${base}.${ext}`)));
    if (!FORCE && exists) continue;
    targets.push({ ...e, out: path.join(OUT_DIR, `${base}.webp`) });
  }
  console.log(`待处理 ${targets.length} 张（输出宽 ${TARGET}px，质量 ${QUALITY}，并发 ${CONCURRENCY}）`);

  let done = 0; let failed = 0;
  const failures = [];
  const queue = [...targets];

  const worker = async () => {
    while (queue.length) {
      const t = queue.shift();
      const remote = sourceUrlFor(t.url);
      try {
        const buf = await download(remote);
        if (buf.length < 200) throw new Error('响应过小');
        await sharp(buf)
          .resize({ width: TARGET, withoutEnlargement: true })
          .webp({ quality: QUALITY })
          .toFile(t.out);
        done++;
        if (done % 25 === 0) console.log(`  进度 ${done}/${targets.length}`);
      } catch (err) {
        failed++;
        failures.push(`${remote} :: ${err.message}`);
      }
    }
  };

  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, targets.length) }, worker));

  console.log(`\n✅ 成功 ${done} 张，失败 ${failed} 张`);
  if (failures.length) {
    console.log('失败明细（最多显示 20 条）:');
    failures.slice(0, 20).forEach((f) => console.log('  ' + f));
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
