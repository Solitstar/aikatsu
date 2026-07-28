/**
 * 下载 items.js 中所有远程图片到 public/images/ 目录
 * 用法:
 *   node scripts/download-images.cjs               # 下载全部（跳过已存在）
 *   node scripts/download-images.cjs --retry-failed  # 只重试上一次失败的
 */
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const OUT_DIR = path.join(__dirname, '..', 'public', 'images');
const FAILED_LOG = path.join(__dirname, 'failed-downloads.json');

// 从 items.js 源码中提取所有 image URL 和 id
function extractImages() {
  const content = fs.readFileSync(
    path.join(__dirname, '..', 'src', 'data', 'items.js'),
    'utf-8'
  );
  const items = [];
  const itemRegex = /\{\s*\n\s*id:\s*(\d+),[\s\S]*?image:\s*"([^"]+)"/g;
  let match;
  while ((match = itemRegex.exec(content)) !== null) {
    items.push({ id: parseInt(match[1]), url: match[2] });
  }
  return items;
}

function loadFailedIds() {
  if (!fs.existsSync(FAILED_LOG)) return null;
  try {
    const data = JSON.parse(fs.readFileSync(FAILED_LOG, 'utf-8'));
    if (Array.isArray(data) && data.length > 0) return data;
  } catch (e) { /* ignore */ }
  return null;
}

function saveFailedIds(ids) {
  if (ids.length > 0) {
    fs.writeFileSync(FAILED_LOG, JSON.stringify(ids, null, 2), 'utf-8');
    console.log(`\n💾 失败列表已保存到 ${FAILED_LOG} (${ids.length} 项)`);
    console.log(`   等图床恢复后运行: node scripts/download-images.cjs --retry-failed`);
  } else {
    // 全部成功，删除失败日志
    if (fs.existsSync(FAILED_LOG)) fs.unlinkSync(FAILED_LOG);
  }
}

function download(url, destPath, retries = 2) {
  return new Promise((resolve, reject) => {
    const attempt = (remaining) => {
      const file = fs.createWriteStream(destPath);
      const mod = url.startsWith('https') ? https : http;
      mod.get(url, { timeout: 30000 }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          file.close();
          try { fs.unlinkSync(destPath); } catch (e) { /* ignore */ }
          return download(res.headers.location, destPath, remaining).then(resolve).catch(reject);
        }
        if (res.statusCode !== 200) {
          file.close();
          try { fs.unlinkSync(destPath); } catch (e) { /* ignore */ }
          if (remaining > 0 && res.statusCode >= 500) {
            // 502/503 等服务器错误，等待后重试
            setTimeout(() => attempt(remaining - 1), 2000);
            return;
          }
          reject(new Error(`HTTP ${res.statusCode}`));
          return;
        }
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
        file.on('error', (err) => {
          file.close();
          try { fs.unlinkSync(destPath); } catch (e) { /* ignore */ }
          reject(err);
        });
      }).on('error', (err) => {
        file.close();
        try { fs.unlinkSync(destPath); } catch (e) { /* ignore */ }
        if (remaining > 0) {
          setTimeout(() => attempt(remaining - 1), 2000);
        } else {
          reject(err);
        }
      }).on('timeout', function() {
        this.destroy();
        file.close();
        try { fs.unlinkSync(destPath); } catch (e) { /* ignore */ }
        if (remaining > 0) {
          setTimeout(() => attempt(remaining - 1), 2000);
        } else {
          reject(new Error('timeout'));
        }
      });
    };
    attempt(retries);
  });
}

async function main() {
  const retryFailed = process.argv.includes('--retry-failed');

  console.log('📥 图片下载工具\n');

  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
    console.log(`📁 创建目录: ${OUT_DIR}\n`);
  }

  let items = extractImages();

  if (retryFailed) {
    const failedIds = loadFailedIds();
    if (!failedIds) {
      console.log('ℹ️  没有失败记录，执行全量下载...\n');
    } else {
      console.log(`🔄 重试模式: 仅下载上次失败的 ${failedIds.length} 张图片\n`);
      items = items.filter(it => failedIds.includes(it.id));
      if (items.length === 0) {
        console.log('⚠️  失败列表中的图片 ID 在 items.js 中找不到，可能已被删除。');
        fs.unlinkSync(FAILED_LOG);
        return;
      }
    }
  } else {
    const failedIds = loadFailedIds();
    if (failedIds) {
      console.log(`💡 检测到上次有 ${failedIds.length} 张下载失败`);
      console.log(`   运行 --retry-failed 可只重试失败项\n`);
    }
  }

  console.log(`📋 待处理: ${items.length} 件商品\n`);

  let success = 0;
  let fail = 0;
  let skipped = 0;
  const failedList = [];

  for (let i = 0; i < items.length; i++) {
    const { id, url } = items[i];
    const extMatch = url.match(/\.(png|jpg|jpeg|webp|gif)/i);
    const ext = extMatch ? extMatch[1] : 'png';
    const filename = `item_${id}.${ext}`;
    const destPath = path.join(OUT_DIR, filename);

    // 跳过已存在的文件
    if (fs.existsSync(destPath) && fs.statSync(destPath).size > 100) {
      console.log(`[${i + 1}/${items.length}] ⏭  跳过 (已存在) item_${id}.${ext}`);
      skipped++;
      continue;
    }

    process.stdout.write(`[${i + 1}/${items.length}] ⬇  下载 item_${id}.${ext}... `);
    try {
      await download(url, destPath);
      const size = (fs.statSync(destPath).size / 1024).toFixed(1);
      console.log(`✅ ${size}KB`);
      success++;
    } catch (err) {
      console.log(`❌ ${err.message}`);
      fail++;
      failedList.push(id);
    }
  }

  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`✅ 成功: ${success}`);
  console.log(`⏭  跳过: ${skipped} (已存在)`);
  console.log(`❌ 失败: ${fail}`);
  console.log(`📁 图片目录: ${OUT_DIR}`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━`);

  // 保存失败列表
  saveFailedIds(failedList);
}

main().catch(console.error);
