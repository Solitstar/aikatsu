/**
 * 纯 Canvas 2D 导出工具
 * 彻底绕过跨域限制：优先尝试本地同源图片，远程代理竞速兜底
 */

const WIDTH = 960;
const PADDING = 28;
const CARD_GAP = 14;
const CARDS_PER_ROW = 3;
const CARD_W = (WIDTH - PADDING * 2 - CARD_GAP * (CARDS_PER_ROW - 1)) / CARDS_PER_ROW; // ~292px
const CARD_IMG_H = CARD_W; // 正方形图片区域
const CARD_INFO_H = 72;
const CARD_H = CARD_IMG_H + CARD_INFO_H;
const CARD_R = 14;

// 主题色
const COLORS = {
  owned: { accent: '#b45309', accentBg: '#fef3c7', badge: '#eab308', badgeText: '#fff' },
  wish:  { accent: '#be123c', accentBg: '#ffe4e6', badge: '#f43f5e', badgeText: '#fff' },
};

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
  ctx.fillStyle = '#f1f5f9';
  ctx.fillRect(x, y, w, h);
  ctx.font = '12px "Quicksand", "Noto Sans SC", sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const short = name.length > 8 ? name.substring(0, 8) + '…' : name;
  ctx.fillText(short, x + w / 2, y + h / 2);
  ctx.textBaseline = 'alphabetic';
}

function drawCardImage(ctx, imgObj, x, y, w, h, name) {
  ctx.save();
  // 上方圆角裁剪区域
  ctx.beginPath();
  ctx.moveTo(x + CARD_R, y);
  ctx.lineTo(x + w - CARD_R, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + CARD_R);
  ctx.lineTo(x + w, y + h);
  ctx.lineTo(x, y + h);
  ctx.lineTo(x, y + CARD_R);
  ctx.quadraticCurveTo(x, y, x + CARD_R, y);
  ctx.closePath();
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

  const theme = COLORS[type];

  // 1. 预加载所有图片
  const imageMap = await preloadItemImages(items);

  // 2. 计算画布尺寸 (3列卡片网格)
  const rows = Math.ceil(items.length / CARDS_PER_ROW);
  const ROW_GAP = 14;
  const height = PADDING + 100 + 90 + (rows * (CARD_H + ROW_GAP) + 16) + 50 + PADDING;

  const canvas = document.createElement('canvas');
  canvas.width = WIDTH * 2;
  canvas.height = height * 2;
  const ctx = canvas.getContext('2d');
  ctx.scale(2, 2);

  // 3. 背景渐变
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  if (type === 'owned') {
    gradient.addColorStop(0, '#fefce8');
    gradient.addColorStop(1, '#faf5ff');
  } else {
    gradient.addColorStop(0, '#fff1f2');
    gradient.addColorStop(1, '#faf5ff');
  }
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, WIDTH, height);

  let cy = PADDING;

  // 4. 标题区域
  ctx.textAlign = 'center';
  ctx.fillStyle = '#000000';
  ctx.font = 'bold 26px "Quicksand", "Noto Sans SC", sans-serif';
  ctx.fillText(type === 'owned' ? 'MY COLLECTION' : 'MY WISHLIST', WIDTH / 2, cy + 26);
  cy += 40;
  ctx.font = '12px "Quicksand", "Noto Sans SC", sans-serif';
  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  ctx.fillText(
    type === 'owned' ? '我的收藏 · 偶像活动周边收藏' : '我的心愿单 · 偶像活动周边收藏',
    WIDTH / 2, cy + 16,
  );
  cy += 44;

  // 5. 统计卡片
  const statsW = WIDTH - PADDING * 2;
  const statsY = cy;
  roundRect(ctx, PADDING, statsY, statsW, 72, 16);
  ctx.fillStyle = 'rgba(255,255,255,0.9)';
  ctx.fill();
  ctx.strokeStyle = type === 'owned' ? 'rgba(234,179,8,0.15)' : 'rgba(251,113,133,0.15)';
  ctx.lineWidth = 1;
  ctx.stroke();

  const colW = statsW / 3;
  const stats = [
    { label: '种类', value: String(items.length) },
    { label: '总件数', value: String(totalQuantity) },
    type === 'owned'
      ? { label: '购入总价', value: `¥${totalPrice.toFixed(2)}` }
      : { label: '心理总价', value: `¥${totalPriceMin.toFixed(2)}${totalPriceMax > 0 ? '~¥' + totalPriceMax.toFixed(2) : ''}` },
  ];
  stats.forEach(({ label, value }, i) => {
    const cx = PADDING + colW * i + colW / 2;
    ctx.textAlign = 'center';

    // 数值
    ctx.font = 'bold 18px "Quicksand", "Noto Sans SC", sans-serif';
    ctx.fillStyle = '#1e293b';
    ctx.fillText(value, cx, statsY + 28);

    // 标签
    ctx.font = '10px "Quicksand", "Noto Sans SC", sans-serif';
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.fillText(label, cx, statsY + 50);
  });
  cy = statsY + 88;

  // 6. 商品卡片网格 (3列)
  for (let r = 0; r < rows; r++) {
    const rowY = cy;
    const itemsInRow = items.slice(r * CARDS_PER_ROW, r * CARDS_PER_ROW + CARDS_PER_ROW);

    itemsInRow.forEach((item, colIdx) => {
      const cx = PADDING + colIdx * (CARD_W + CARD_GAP);

      // ---- 卡片阴影 ----
      roundRect(ctx, cx + 2, rowY + 3, CARD_W, CARD_H, CARD_R);
      ctx.fillStyle = 'rgba(0,0,0,0.07)';
      ctx.fill();

      // ---- 卡片主体 ----
      roundRect(ctx, cx, rowY, CARD_W, CARD_H, CARD_R);
      ctx.fillStyle = '#ffffff';
      ctx.fill();

      // ---- 图片区域 ----
      drawCardImage(ctx, imageMap[item.id], cx, rowY, CARD_W, CARD_IMG_H, item.name);

      // ---- 图片/信息分隔线 ----
      ctx.strokeStyle = 'rgba(0,0,0,0.05)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx + 8, rowY + CARD_IMG_H);
      ctx.lineTo(cx + CARD_W - 8, rowY + CARD_IMG_H);
      ctx.stroke();

      // ---- 信息区域 ----
      const infoY = rowY + CARD_IMG_H;
      const pad = 8;
      const innerX = cx + pad;

      // 商品名
      ctx.textAlign = 'left';
      ctx.font = 'bold 12px "Quicksand", "Noto Sans SC", sans-serif';
      ctx.fillStyle = '#1e293b';
      const name = item.name.length > 11 ? item.name.substring(0, 11) + '…' : item.name;
      ctx.fillText(name, innerX, infoY + 16);

      // ---- 角色（左） + 价格标签（右，同排对齐）----
      const chars = item.character.split(/[,，]/).map(c => c.trim()).filter(Boolean);
      const charStr = chars.length > 2
        ? chars[0] + '等' + chars.length + '人'
        : chars.join('·');
      ctx.font = '9px "Quicksand", "Noto Sans SC", sans-serif';
      ctx.fillStyle = 'rgba(0,0,0,0.4)';
      ctx.fillText(charStr, innerX, infoY + 32);

      // 价格标签右对齐，垂直居中于角色文字行
      const badgeH = 22;
      const badgeCenterY = infoY + 27; // 角色文字 9px 的视觉中心

      if (type === 'owned') {
        const priceText = `¥${(item.totalPrice || 0).toFixed(2)}`;
        ctx.font = 'bold 12px "Quicksand", "Noto Sans SC", sans-serif';
        const pw = ctx.measureText(priceText).width;
        const badgeW = Math.ceil(pw) + 18;
        const badgeX = cx + CARD_W - pad - badgeW;
        const badgeY = badgeCenterY - badgeH / 2;

        roundRect(ctx, badgeX, badgeY, badgeW, badgeH, 11);
        ctx.fillStyle = theme.accentBg;
        ctx.fill();
        ctx.strokeStyle = theme.accent;
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.textAlign = 'center';
        ctx.font = 'bold 12px "Quicksand", "Noto Sans SC", sans-serif';
        ctx.fillStyle = theme.accent;
        ctx.fillText(priceText, badgeX + badgeW / 2, badgeY + 16);

        // 数量小字在卡片底部
        ctx.textAlign = 'left';
        ctx.font = '9px "Quicksand", "Noto Sans SC", sans-serif';
        ctx.fillStyle = 'rgba(0,0,0,0.4)';
        ctx.fillText(`×${item.quantity || 1} 件`, innerX, infoY + 52);
      } else {
        const totalPrice = ((item.wishPriceMin || 0) * (item.wishQuantity || 1)).toFixed(2);
        const priceText = `¥${totalPrice}`;
        ctx.font = 'bold 12px "Quicksand", "Noto Sans SC", sans-serif';
        const pw = ctx.measureText(priceText).width;
        const badgeW = Math.ceil(pw) + 18;
        const badgeX = cx + CARD_W - pad - badgeW;
        const badgeY = badgeCenterY - badgeH / 2;

        // 玫红药丸（与「想要」同款）
        roundRect(ctx, badgeX, badgeY, badgeW, badgeH, 11);
        ctx.fillStyle = theme.badge;
        ctx.fill();

        ctx.textAlign = 'center';
        ctx.font = 'bold 12px "Quicksand", "Noto Sans SC", sans-serif';
        ctx.fillStyle = theme.badgeText;
        ctx.fillText(priceText, badgeX + badgeW / 2, badgeY + 16);

        // 单价×数量 在卡片底部
        ctx.textAlign = 'left';
        ctx.font = '9px "Quicksand", "Noto Sans SC", sans-serif';
        ctx.fillStyle = 'rgba(0,0,0,0.4)';
        const detail = (item.wishPriceMax || 0) > 0
          ? `¥${(item.wishPriceMin || 0).toFixed(2)}~${(item.wishPriceMax || 0).toFixed(2)} ×${item.wishQuantity || 1}`
          : `¥${(item.wishPriceMin || 0).toFixed(2)} ×${item.wishQuantity || 1}`;
        ctx.fillText(detail, innerX, infoY + 52);
      }
    });

    cy += CARD_H + ROW_GAP;
  }

  // 7. 页脚
  ctx.textAlign = 'center';
  ctx.font = '10px "Quicksand", "Noto Sans SC", sans-serif';
  ctx.fillStyle = 'rgba(0,0,0,0.35)';
  ctx.fillText('Made by Solitstar', WIDTH / 2, cy + 16);
  ctx.font = '9px "Quicksand", "Noto Sans SC", sans-serif';
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillText('AIKATSU GOODS COLLECTION', WIDTH / 2, cy + 32);

  console.groupEnd();
  return canvas;
}
