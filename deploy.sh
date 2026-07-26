#!/bin/bash

echo "🚀 开始部署到 GitHub Pages..."

# 构建项目
echo "📦 正在构建项目..."
npm run build

if [ $? -ne 0 ]; then
  echo "❌ 构建失败！"
  exit 1
fi

# 提交 dist 目录
echo "📝 提交构建产物..."
git add dist -f
git commit -m "deploy: 更新部署 $(date '+%Y-%m-%d %H:%M')"

# 推送到 gh-pages 分支
echo "🌐 推送到 gh-pages 分支..."
git subtree push --prefix dist origin gh-pages

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ 部署成功！"
  echo "🌐 访问地址：https://solitstar.github.io/aikatsu/"
  echo ""
else
  echo "❌ 部署失败！"
  exit 1
fi
