/**
 * 将 public/images/ 下所有 PNG/JPG 批量转换为 WebP
 * 用法: node scripts/convert-to-webp.cjs
 *       node scripts/convert-to-webp.cjs --quality 90
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PUBLIC_IMAGES = path.join(__dirname, '..', 'public', 'images');
const DIST_IMAGES = path.join(__dirname, '..', 'dist', 'images');

// 从命令行参数获取设置
const QUALITY = (() => {
  const idx = process.argv.indexOf('--quality');
  return idx !== -1 ? Math.min(100, Math.max(1, parseInt(process.argv[idx + 1]) || 100)) : 100;
})();
const FORCE = process.argv.includes('--force');

function ensureSharp() {
  try {
    require.resolve('sharp');
    return true;
  } catch {
    console.log('📦 正在安装 sharp...');
    try {
      execSync('npm install --save-dev sharp', {
        cwd: path.join(__dirname, '..'),
        stdio: 'inherit',
      });
      return true;
    } catch {
      console.error('❌ sharp 安装失败，请手动运行: npm install --save-dev sharp');
      return false;
    }
  }
}

function formatSize(bytes) {
  for (const unit of ['B', 'KB', 'MB', 'GB']) {
    if (bytes < 1024) return `${bytes.toFixed(1)} ${unit}`;
    bytes /= 1024;
  }
  return `${bytes.toFixed(1)} TB`;
}

async function convertDirectory(dirPath, label) {
  if (!fs.existsSync(dirPath)) {
    console.log(`  ⚠️ ${label}: 目录不存在，跳过`);
    return 0;
  }

  const files = fs.readdirSync(dirPath).filter(f =>
    /\.(png|jpg|jpeg)$/i.test(f)
  );

  if (files.length === 0) return 0;

  let count = 0;
  let totalSaved = 0;

  for (const file of files) {
    const inputPath = path.join(dirPath, file);
    const webpName = file.replace(/\.(png|jpg|jpeg)$/i, '.webp');
    const outputPath = path.join(dirPath, webpName);
    const inputSize = fs.statSync(inputPath).size;

    // 如果 WebP 已存在且比源文件新，跳过（非强制模式）
    if (!FORCE && fs.existsSync(outputPath)) {
      const outputStat = fs.statSync(outputPath);
      if (outputStat.mtime > fs.statSync(inputPath).mtime) {
        continue;
      }
    }

    try {
      const sharp = require('sharp');
      await sharp(inputPath)
        .webp({ quality: QUALITY })
        .toFile(outputPath);

      const outputSize = fs.statSync(outputPath).size;
      const saved = inputSize - outputSize;
      totalSaved += saved;
      count++;

      const pct = inputSize > 0 ? (saved / inputSize * 100).toFixed(0) : 0;
      const idx = files.indexOf(file) + 1;
      process.stdout.write(`\r  [${idx}/${files.length}] ${file} → ${webpName} (${formatSize(inputSize)} → ${formatSize(outputSize)}, -${pct}%)`);
    } catch (err) {
      console.error(`\n  ✗ ${file} 转换失败: ${err.message}`);
    }
  }

  if (count > 0) {
    console.log(`\n  ✅ ${label}: ${count} 个文件，节省 ${formatSize(totalSaved)}`);
  }
  return count;
}

async function main() {
  console.log('\n🖼️  WebP 批量转换工具');
  console.log(`   质量: ${QUALITY}\n`);

  if (!ensureSharp()) {
    process.exit(1);
  }

  const startTime = Date.now();

  // 1. 转换 public/images/（源码目录，Vite 构建时会复制到 dist）
  const n1 = await convertDirectory(PUBLIC_IMAGES, 'public/images/');

  // 2. 如果 dist/ 已存在，也转换一份
  const n2 = await convertDirectory(DIST_IMAGES, 'dist/images/');

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`✅ 完成 (${elapsed}s): ${n1 + n2} 个文件已转换`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━\n`);
}

main().catch(console.error);
