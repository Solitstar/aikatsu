/**
 * 生成 version.json 到 public/ 目录，用于前端检测更新
 */
const fs = require('fs');
const path = require('path');

const version = {
  buildTime: new Date().toISOString(),
  timestamp: Date.now(),
};

const outPath = path.join(__dirname, '..', 'public', 'version.json');
fs.writeFileSync(outPath, JSON.stringify(version), 'utf-8');
console.log(`version.json 已生成: ${version.buildTime}`);
