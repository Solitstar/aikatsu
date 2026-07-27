/**
 * 下载 items.js 中所有远程图片到 public/images/ 目录
 * 用法: node scripts/download-images.cjs
 */
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const OUT_DIR = path.join(__dirname, '..', 'public', 'images');

// 从 items.js 源码中提取所有 image URL 和 id
function extractImages() {
  const content = fs.readFileSync(
    path.join(__dirname, '..', 'src', 'data', 'items.js'),
    'utf-8'
  );
  const items = [];
  // 匹配每个 item 块
  const itemRegex = /\{\s*\n\s*id:\s*(\d+),[\s\S]*?image:\s*"([^"]+)"/g;
  let match;
  while ((match = itemRegex.exec(content)) !== null) {
    items.push({ id: parseInt(match[1]), url: match[2] });
  }
  return items;
}

function download(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    const mod = url.startsWith('https') ? https : http;
    mod.get(url, { timeout: 30000 }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // 跟随重定向
        file.close();
        fs.unlinkSync(destPath);
        return download(res.headers.location, destPath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        fs.unlinkSync(destPath);
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
        fs.unlinkSync(destPath);
        reject(err);
      });
    }).on('error', reject).on('timeout', function() {
      this.destroy();
      file.close();
      if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
      reject(new Error('timeout'));
    });
  });
}

async function main() {
  console.log('📥 图片下载工具\n');

  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
    console.log(`📁 创建目录: ${OUT_DIR}\n`);
  }

  const items = extractImages();
  console.log(`📋 发现 ${items.length} 件商品\n`);

  let success = 0;
  let fail = 0;
  let skipped = 0;

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
    }
  }

  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`✅ 成功: ${success}`);
  console.log(`⏭  跳过: ${skipped} (已存在)`);
  console.log(`❌ 失败: ${fail}`);
  console.log(`📁 图片目录: ${OUT_DIR}`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━`);
}

main().catch(console.error);
