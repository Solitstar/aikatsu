/**
 * 监控 items.js 变化，自动触发图片下载和 WebP 转换
 * 用法:
 *   node scripts/watch-images.cjs
 *   node scripts/watch-images.cjs --force   # 强制全量更新
 */

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const ITEMS_FILE = path.join(__dirname, '..', 'src', 'data', 'items.js');
const DEBOUNCE_MS = 3000; // 防抖间隔

let debounceTimer = null;
let isRunning = false;

function runCommand(script, args) {
  return new Promise((resolve, reject) => {
    const proc = spawn('node', [script, ...args], {
      cwd: path.join(__dirname, '..'),
      stdio: 'inherit',
      shell: true,
    });
    proc.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`exit code ${code}`));
    });
    proc.on('error', reject);
  });
}

async function handleChange() {
  if (isRunning) {
    console.log('  ⏳ 上一次任务还在执行中，跳过...');
    return;
  }

  isRunning = true;
  const force = process.argv.includes('--force');
  const dlArgs = force ? ['--force'] : [];

  console.log(`\n${'='.repeat(50)}`);
  console.log(`🔄 检测到 items.js 变化: ${new Date().toLocaleTimeString()}`);
  console.log(`${'='.repeat(50)}`);

  try {
    console.log('\n📥 第 1 步: 下载图片...');
    await runCommand('scripts/download-images.cjs', dlArgs);

    console.log('\n🖼️  第 2 步: 转换 WebP...');
    await runCommand('scripts/convert-to-webp.cjs', force ? ['--force'] : []);

    console.log(`\n✅ 完成: ${new Date().toLocaleTimeString()}`);
    console.log(`${'='.repeat(50)}\n`);
    console.log('👀 继续监控中，修改 items.js 后自动触发...\n');
  } catch (err) {
    console.log(`\n❌ 失败: ${err.message}\n`);
  } finally {
    isRunning = false;
  }
}

// 清理残留的 502 错误文件
function cleanCorruptedPngs() {
  const dir = path.join(__dirname, '..', 'public', 'images');
  if (!fs.existsSync(dir)) return;

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.png'));
  let cleaned = 0;
  for (const file of files) {
    const filePath = path.join(dir, file);
    const buf = fs.readFileSync(filePath);
    // PNG 文件头: 89 50 4E 47
    if (buf[0] !== 0x89 || buf[1] !== 0x50 || buf[2] !== 0x4E || buf[3] !== 0x47) {
      fs.unlinkSync(filePath);
      cleaned++;
    }
  }
  if (cleaned > 0) {
    console.log(`🧹 清理了 ${cleaned} 个损坏的 PNG 文件\n`);
  }
}

console.log('👀 图片同步监控已启动');
console.log(`   监控文件: ${ITEMS_FILE}`);
console.log('   修改 items.js 后 3 秒内自动下载和转换\n');
console.log('   按 Ctrl+C 停止\n');

// 启动时先清理并执行一次
cleanCorruptedPngs();
handleChange();

// 监控文件变化
fs.watch(ITEMS_FILE, (eventType) => {
  if (eventType === 'change') {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(handleChange, DEBOUNCE_MS);
  }
});

// 防止进程退出
process.stdin.resume();
