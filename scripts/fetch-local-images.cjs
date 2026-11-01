/**
 * 从 imgur 批量拉取商品图 → 缩放 → 转 WebP，写入 public/images/
 *
 * 用途：把图片托管进仓库，由 GitHub Pages 同源提供（国内访问比 imgur 快一个数量级）。
 * 因为本机直连 imgur 很慢，实际批量执行放在 GitHub Actions 上（runner 在海外）：
 *   .github/workflows/fetch-images.yml
 *
 * 用法:
 *   node scripts/fetch-local-images.cjs                              # 增量：补缺失的 + 源链接已变更的
 *   node scripts/fetch-local-images.cjs --target 480 --limit 200 --offset 0
 *   node scripts/fetch-local-images.cjs --target 480 --force         # 覆盖已有（重新生成全部）
 *
 * 默认输出宽 480px、WebP q75（当前线上标准）。素材体积的大头来自 PNG/JPEG → WebP 转码，
 * 即使原图本身就是 480px，也必须过这一步。
 */
const fs = require('fs');
const os = require('os');
const path = require('path');
const https = require('https');
const crypto = require('crypto');
const { execFile } = require('child_process');
const { promisify } = require('util');
const sharp = require('sharp');
const { extractImageEntries } = require('./item-image-entries.cjs');

const execFileAsync = promisify(execFile);

const OUT_DIR = path.join(__dirname, '..', 'public', 'images');
// 记录每张本地图下载时对应的图片链接指纹，用于在链接变更后重新下载
const SOURCES_FILE = path.join(__dirname, 'image-sources.json');

const arg = (name, def) => {
  const i = process.argv.indexOf(`--${name}`);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : def;
};
const hasFlag = (name) => process.argv.includes(`--${name}`);

const TARGET = parseInt(arg('target', '480'), 10);
const LIMIT = parseInt(arg('limit', '0'), 10) || 0;
const OFFSET = parseInt(arg('offset', '0'), 10) || 0;
const QUALITY = parseInt(arg('quality', '75'), 10);
const CONCURRENCY = parseInt(arg('concurrency', '8'), 10);
const FORCE = hasFlag('force');

// ---- 源链接指纹：链接变了就必须重新下载，否则会一直用旧图 ----
const hashUrl = (url) => crypto.createHash('sha1').update(url).digest('hex').slice(0, 12);

const readSources = () => {
  try {
    return JSON.parse(fs.readFileSync(SOURCES_FILE, 'utf-8'));
  } catch {
    return {};
  }
};

const writeSources = (sources) => {
  const sorted = {};
  Object.keys(sources).sort().forEach((k) => { sorted[k] = sources[k]; });
  fs.writeFileSync(SOURCES_FILE, JSON.stringify(sorted, null, 0) + '\n', 'utf8');
};

// ---- 源图统一取 imgur 的 640px 档，再自行缩放，避免二次压缩导致画质损失 ----
const IMGUR_RE = /^(https?:\/\/i\.imgur\.com\/[A-Za-z0-9]+)(\.[A-Za-z0-9]+)$/;
const sourceUrlFor = (url) => {
  const m = IMGUR_RE.exec(url);
  return m ? `${m[1]}l${m[2]}` : url;
};

// Windows 上 node / curl 直连 imgur 会被重置连接（ECONNRESET），只有 PowerShell 能连通，
// 因此本地跑时改走 PowerShell 下载；GitHub runner（Linux）继续走下面的 https 实现。
const USE_PS = process.platform === 'win32' && !hasFlag('no-ps');
const SAFE_URL_RE = /^https?:\/\/[A-Za-z0-9._\-]+\/[A-Za-z0-9._\-/=%&:?+]*$/;

async function downloadViaPowerShell(url) {
  if (!SAFE_URL_RE.test(url)) throw new Error('URL 含不安全字符，已跳过');
  const tmp = path.join(os.tmpdir(), `fetch_${process.pid}_${Math.random().toString(36).slice(2)}.bin`);
  try {
    await execFileAsync('powershell', ['-NoProfile', '-NonInteractive', '-Command',
      `$ProgressPreference='SilentlyContinue'; [Net.ServicePointManager]::SecurityProtocol=[Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri '${url}' -OutFile '${tmp}' -TimeoutSec 40 -UseBasicParsing`,
    ], { timeout: 60000 });
    const buf = fs.readFileSync(tmp);
    if (buf.length < 200) throw new Error('响应过小');
    return buf;
  } finally {
    try { fs.unlinkSync(tmp); } catch { /* ignore */ }
  }
}

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

  let entries = extractImageEntries();
  console.log(`items.js 中共 ${entries.length} 处图片引用`);

  if (OFFSET) entries = entries.slice(OFFSET);
  if (LIMIT) entries = entries.slice(0, LIMIT);

  const sources = readSources();
  let sourcesDirty = false;

  const targets = [];
  for (const e of entries) {
    // 同一资源已有任意格式的本地图时跳过，避免重复占用
    const exists = ['webp', 'png', 'jpg'].some((ext) => fs.existsSync(path.join(OUT_DIR, `${e.key}.${ext}`)));
    // 链接变更过 → 本地图是旧图，必须重新下载
    const stale = exists && sources[e.key] && sources[e.key] !== hashUrl(e.url);
    if (!FORCE && exists && !stale) continue;
    targets.push({ ...e, stale, out: path.join(OUT_DIR, `${e.key}.webp`) });
  }
  const staleCount = targets.filter((t) => t.stale).length;
  console.log(`待处理 ${targets.length} 张（其中链接已变更需更新 ${staleCount} 张；输出宽 ${TARGET}px，质量 ${QUALITY}，并发 ${CONCURRENCY}）`);

  let done = 0; let failed = 0;
  const failures = [];
  const queue = [...targets];

  const worker = async () => {
    while (queue.length) {
      const t = queue.shift();
      const remote = sourceUrlFor(t.url);
      try {
        const buf = USE_PS ? await downloadViaPowerShell(remote) : await download(remote);
        if (buf.length < 200) throw new Error('响应过小');
        await sharp(buf)
          .resize({ width: TARGET, withoutEnlargement: true })
          .webp({ quality: QUALITY })
          .toFile(t.out);
        // 记录本次下载对应的链接指纹，供清单生成时判断本地图是否过期
        sources[t.key] = hashUrl(t.url);
        sourcesDirty = true;
        done++;
        if (t.stale) console.log(`  ↻ 已更新: ${t.key}`);
        if (done % 25 === 0) console.log(`  进度 ${done}/${targets.length}`);
      } catch (err) {
        failed++;
        failures.push(`${remote} :: ${err.message}`);
      }
    }
  };

  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, targets.length) }, worker));

  if (sourcesDirty) writeSources(sources);

  console.log(`\n✅ 成功 ${done} 张，失败 ${failed} 张`);
  if (failures.length) {
    console.log('失败明细（最多显示 20 条）:');
    failures.slice(0, 20).forEach((f) => console.log('  ' + f));
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
