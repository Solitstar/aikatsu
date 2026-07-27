/**
 * 纯 Canvas 2D 导出工具
 * 彻底绕过跨域限制：优先尝试本地同源图片，远程代理竞速兜底
 */

const WIDTH = 850;
const PADDING = 40;
const CARD_WIDTH = WIDTH - PADDING * 2;
const IMG_SIZE = 128;
const ITEM_PADDING = 16;

// ---- 图片加载 ----

/** 从 dataURL 或 URL 加载为 Image 对象 */
function urlToImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

/** 通过 fetch → blob → dataURL 加载图片 */
async function fetchToDataUrl(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(url, { signal: controller.signal, referrerPolicy: 'no-referrer' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const blob = await res.blob();
    if (blob.size < 100) throw new Error('too small');
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } finally {
    clearTimeout(timer);
  }
}

/** 代理服务列表 */
const proxyBuilders = [
  { name: 'corsproxy.io', fn: (u) => 'https://corsproxy.io/?' + encodeURIComponent(u) },
  { name: 'wsrv.nl', fn: (u) => 'https://wsrv.nl/?url=' + encodeURIComponent(u) + '&output=png' },
  { name: 'weserv.nl', fn: (u) => 'https://images.weserv.nl/?url=' + encodeURIComponent(u) + '&output=png' },
  { name: 'allorigins', fn: (u) => 'https://api.allorigins.win/raw?url=' + encodeURIComponent(u) },
  { name: 'corsflare', fn: (u) => 'https://cors-flare.deno.dev/' + encodeURIComponent(u) },
];

/** 远程代理竞速加载 */
function loadViaProxy(remoteUrl) {
  const racers = proxyBuilders.map(({ fn }) =>
    fetchToDataUrl(fn(remoteUrl)).catch(() => null)
  );
  return new Promise((resolve) => {
    let settled = 0;
    let resolved = false;
    racers.forEach((p) => {
      p.then((result) => {
        if (!resolved && result) {
          resolved = true;
          resolve(result);
        }
      }).catch(() => {}).finally(() => {
        settled++;
        if (settled >= racers.length && !resolved) resolve(null);
      });
    });
  });
}

/** 根据 item id 和远程 URL 推导本地路径候选列表 */
function getLocalUrls(item) {
  const urls = [];
  // 从远程 URL 提取格式信息
  if (item.image.endsWith('.png')) {
    urls.push(`/aikatsu/images/item_${item.id}.png`);
  } else if (item.image.includes('?thumb=1')) {
    // Chevereto 缩略图通常是 JPEG/WebP
    urls.push(`/aikatsu/images/item_${item.id}.jpg`);
    urls.push(`/aikatsu/images/item_${item.id}.webp`);
  }
  // 兜底：都试一下
  urls.push(`/aikatsu/images/item_${item.id}.png`);
  if (!urls.includes(`/aikatsu/images/item_${item.id}.jpg`)) {
    urls.push(`/aikatsu/images/item_${item.id}.jpg`);
  }
  return urls;
}

/**
 * 加载单张图片的 Image 对象
 * 策略：本地同源图片 (最快) → 远程代理竞速 (兜底)
 */
async function loadItemImage(item) {
  // 策略1: 从本地 public/images/ 加载（同源，零跨域问题）
  const localUrls = getLocalUrls(item);
  for (const localUrl of localUrls) {
    const img = await urlToImage(localUrl);
    if (img) {
      console.log(`    ✓ local: ${localUrl}`);
      return img;
    }
  }

  // 策略2: 远程代理竞速
  console.log(`    ⚡ 本地无缓存，尝试代理加载...`);
  const dataUrl = await loadViaProxy(item.image);
  if (dataUrl) {
    const img = await urlToImage(dataUrl);
    if (img) {
      console.log(`    ✓ proxy (dataURL)`);
      return img;
    }
  }

  console.log(`    ✗ 加载失败`);
  return null;
}

/**
 * 预加载所有商品图片，返回 { itemId → Image|null } 映射
 */
async function preloadItemImages(items) {
  console.group('🖼 图片加载');
  console.log(`  共 ${items.length} 张`);
  const startTime = performance.now();

  const imageMap = {};
  const tasks = items.map(async (item) => {
    console.log(`  [#${item.id}] ${item.name}`);
    imageMap[item.id] = await loadItemImage(item);
  });
  await Promise.allSettled(tasks);

  const success = Object.values(imageMap).filter(Boolean).length;
  const elapsed = ((performance.now() - startTime) / 1000).toFixed(1);
  console.log(`  完成: ${success}/${items.length} 成功 (${elapsed}s)`);
  console.groupEnd();

  return imageMap;
}

// ---- Canvas 绘制工具 ----

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function drawPlaceholder(ctx, x, y, w, h, name) {
  roundRect(ctx, x, y, w, h, 10);
  ctx.fillStyle = '#f1f5f9';
  ctx.fill();
  ctx.font = '11px "Quicksand", "Noto Sans SC", sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const short = name.length > 6 ? name.substring(0, 6) + '…' : name;
  ctx.fillText(short, x + w / 2, y + h / 2);
  ctx.textBaseline = 'alphabetic';
}

function drawCardImage(ctx, imgObj, x, y, w, h, name) {
  roundRect(ctx, x, y, w, h, 10);
  ctx.save();
  ctx.clip();
  if (imgObj) {
    try {
      const scale = Math.max(w / imgObj.width, h / imgObj.height);
      const sw = imgObj.width * scale;
      const sh = imgObj.height * scale;
      ctx.drawImage(imgObj, x - (sw - w) / 2, y - (sh - h) / 2, sw, sh);
    } catch {
      drawPlaceholder(ctx, x, y, w, h, name);
    }
  } else {
    drawPlaceholder(ctx, x, y, w, h, name);
  }
  ctx.restore();
}

// ---- 主渲染 ----

export async function renderShareImageToCanvas({ items, type, totalQuantity, totalPrice, totalPriceMin, totalPriceMax }) {
  console.group('🎨 Canvas 直绘分享图');

  // 1. 预加载所有图片
  const imageMap = await preloadItemImages(items);

  // 2. 计算画布尺寸
  const ITEM_ROW_H = IMG_SIZE + ITEM_PADDING * 2;
  const ITEM_GAP = 12;
  const height = PADDING + 130 + 100 + (items.length * (ITEM_ROW_H + ITEM_GAP) + 20) + 60 + PADDING;

  const canvas = document.createElement('canvas');
  canvas.width = WIDTH * 2;
  canvas.height = height * 2;
  const ctx = canvas.getContext('2d');
  ctx.scale(2, 2);

  // 3. 背景渐变
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  if (type === 'owned') {
    gradient.addColorStop(0, '#fefce8');
    gradient.addColorStop(1, '#ffffff');
  } else {
    gradient.addColorStop(0, '#fff1f2');
    gradient.addColorStop(1, '#ffffff');
  }
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, WIDTH, height);

  let cy = PADDING;

  // 4. 标题区域
  ctx.textAlign = 'center';
  ctx.fillStyle = '#000000';
  ctx.font = 'bold 30px "Quicksand", "Noto Sans SC", sans-serif';
  ctx.fillText(type === 'owned' ? 'MY COLLECTION' : 'MY WISHLIST', WIDTH / 2, cy + 30);
  cy += 50;
  ctx.font = '14px "Quicksand", "Noto Sans SC", sans-serif';
  ctx.fillStyle = 'rgba(0,0,0,0.6)';
  ctx.fillText(
    type === 'owned' ? '我的收藏 · 偶像活动周边收藏' : '我的心愿单 · 偶像活动周边收藏',
    WIDTH / 2, cy + 20,
  );
  cy += 50;

  // 5. 统计卡片
  const statsY = cy;
  roundRect(ctx, PADDING, statsY, CARD_WIDTH, 80, 16);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.strokeStyle = 'rgba(0,0,0,0.06)';
  ctx.lineWidth = 1;
  ctx.stroke();

  const colW = CARD_WIDTH / 3;
  [
    ['🏷 种类', String(items.length)],
    ['📦 总件数', String(totalQuantity)],
    type === 'owned'
      ? ['💰 购入总价', `¥${totalPrice.toFixed(2)}`]
      : ['💰 心理总价', `¥${totalPriceMin.toFixed(2)}${totalPriceMax > 0 ? ' ~ ¥' + totalPriceMax.toFixed(2) : ''}`],
  ].forEach(([label, value], i) => {
    const cx = PADDING + colW * i + colW / 2;
    ctx.textAlign = 'center';
    ctx.font = '12px "Quicksand", "Noto Sans SC", sans-serif';
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillText(label, cx, statsY + 28);
    ctx.font = 'bold 24px "Quicksand", "Noto Sans SC", sans-serif';
    ctx.fillStyle = '#000000';
    ctx.fillText(value, cx, statsY + 60);
  });
  cy = statsY + 100;

  // 6. 商品列表
  items.forEach((item) => {
    const itemY = cy;
    roundRect(ctx, PADDING, itemY, CARD_WIDTH, ITEM_ROW_H, 12);
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    const imgX = PADDING + ITEM_PADDING;
    const imgY = itemY + ITEM_PADDING;
    const imgObj = imageMap[item.id];
    drawCardImage(ctx, imgObj, imgX, imgY, IMG_SIZE, IMG_SIZE, item.name);

    const tx = imgX + IMG_SIZE + 16;
    const ty = itemY + ITEM_PADDING;
    ctx.textAlign = 'left';

    if (item.subtitle) {
      ctx.font = '8px "Quicksand", "Noto Sans SC", sans-serif';
      ctx.fillStyle = 'rgba(0,0,0,0.4)';
      ctx.fillText(item.subtitle.substring(0, 80), tx, ty + 12);
    }
    ctx.font = 'bold 12px "Quicksand", "Noto Sans SC", sans-serif';
    ctx.fillStyle = '#000000';
    ctx.fillText(item.name, tx, ty + (item.subtitle ? 30 : 20));

    const chars = item.character.split(/[,，]/).map(c => c.trim()).filter(Boolean);
    const charStr = chars.length > 3
      ? chars.slice(0, 3).join(' | ') + ` 等${chars.length}人`
      : chars.join(' | ');
    ctx.font = '9px "Quicksand", "Noto Sans SC", sans-serif';
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillText(`${charStr} · ${item.type}`, tx, ty + (item.subtitle ? 48 : 38));

    ctx.textAlign = 'right';
    const px = PADDING + CARD_WIDTH - ITEM_PADDING;
    const py = itemY + ITEM_ROW_H / 2;

    if (type === 'owned') {
      ctx.font = 'bold 14px "Quicksand", "Noto Sans SC", sans-serif';
      ctx.fillStyle = '#000000';
      ctx.fillText(`¥${(item.totalPrice || 0).toFixed(2)}`, px, py + 2);
      ctx.font = '10px "Quicksand", "Noto Sans SC", sans-serif';
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fillText(`${item.quantity || 0} 件`, px, py + 20);
    } else {
      const total = ((item.wishPriceMin || 0) * (item.wishQuantity || 1)).toFixed(2);
      ctx.font = 'bold 14px "Quicksand", "Noto Sans SC", sans-serif';
      ctx.fillStyle = '#000000';
      ctx.fillText(`¥${total}`, px, py + 2);
      ctx.font = '10px "Quicksand", "Noto Sans SC", sans-serif';
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      const detail = (item.wishPriceMax || 0) > 0
        ? `¥${(item.wishPriceMin || 0).toFixed(2)} ~ ¥${(item.wishPriceMax || 0).toFixed(2)} ×${item.wishQuantity || 1}`
        : `¥${(item.wishPriceMin || 0).toFixed(2)} ×${item.wishQuantity || 1}`;
      ctx.fillText(detail, px, py + 20);
    }

    cy += ITEM_ROW_H + ITEM_GAP;
  });

  // 7. 页脚
  ctx.textAlign = 'center';
  ctx.font = '11px "Quicksand", "Noto Sans SC", sans-serif';
  ctx.fillStyle = 'rgba(0,0,0,0.4)';
  ctx.fillText('Made by Solitstar', WIDTH / 2, cy + 20);
  ctx.font = '10px "Quicksand", "Noto Sans SC", sans-serif';
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.fillText('AIKATSU GOODS COLLECTION', WIDTH / 2, cy + 38);

  console.groupEnd();
  return canvas;
}
