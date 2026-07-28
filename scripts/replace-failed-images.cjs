/**
 * 将失败列表中的商品图片路径替换为本地路径
 * 用法: node scripts/replace-failed-images.cjs
 *
 * 前提: 已手动将图片命名为 item_X.png 放入 public/images/ 目录
 */
const fs = require('fs');
const path = require('path');

const FAILED_LOG = path.join(__dirname, 'failed-downloads.json');
const ITEMS_FILE = path.join(__dirname, '..', 'src', 'data', 'items.js');

// 读取失败 ID 列表
if (!fs.existsSync(FAILED_LOG)) {
  console.log('❌ 没有失败记录文件，请先运行下载脚本');
  process.exit(1);
}

const failedIds = JSON.parse(fs.readFileSync(FAILED_LOG, 'utf-8'));
if (!failedIds.length) {
  console.log('✅ 没有失败的图片，无需替换');
  process.exit(0);
}

console.log(`📋 将要替换 ${failedIds.length} 个 ID 的图片路径为本地路径\n`);

// 读取 items.js
let content = fs.readFileSync(ITEMS_FILE, 'utf-8');
let replaced = 0;
let skipped = 0;

// 逐个 ID 替换
for (const id of failedIds) {
  // 匹配该 ID 的 image 行: image: "https://..." 或 image: "https://...?thumb=1"
  const pattern = new RegExp(
    `(id:\\s*${id},[\\s\\S]*?image:\\s*)"[^"]*"`,
    'm'
  );
  const match = content.match(pattern);
  if (match) {
    const localPath = `/aikatsu/images/item_${id}.png`;
    const newEntry = match[0].replace(/image:\s*"[^"]*"/, `image: "${localPath}"`);
    content = content.replace(match[0], newEntry);
    replaced++;
    console.log(`  ✅ id=${id} → ${localPath}`);
  } else {
    skipped++;
    console.log(`  ⚠️  id=${id} 未找到（可能已被删除）`);
  }
}

// 写回
fs.writeFileSync(ITEMS_FILE, content, 'utf-8');

console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━`);
console.log(`✅ 替换完成: ${replaced} 个`);
console.log(`⏭  跳过: ${skipped} 个`);
console.log(`━━━━━━━━━━━━━━━━━━━━━━━━`);

// 成功后删除失败日志
fs.unlinkSync(FAILED_LOG);
console.log(`\n🗑  已清除失败记录文件`);
console.log(`\n💡 现在你可以将图片文件命名为 item_ID.png 放入 public/images/ 目录`);
