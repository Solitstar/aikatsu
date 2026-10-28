/**
 * 纯 Canvas 2D 导出工具
 * 彻底绕过跨域限制：优先尝试本地同源图片，远程代理竞速兜底
 */

import { LOCAL_IMAGES } from '../data/localImages';

const WIDTH = 960;
const PADDING = 28;
const CARD_GAP = 14;
const CARDS_PER_ROW = 5;
const CARD_W = (WIDTH - PADDING * 2 - CARD_GAP * (CARDS_PER_ROW - 1)) / CARDS_PER_ROW; // ~170px
const CARD_IMG_H = CARD_W; // 正方形图片区域
const CARD_R = 14;

// 信息区排版常量：标题按实际行数计算高度，保证完整展示不截断
const TITLE_FONT = 'bold 12px "Quicksand", "Noto Sans SC", sans-serif';
const TITLE_LINE_H = 14;
const TITLE_FIRST_BASELINE = 16;
const INFO_PAD = 8;
const CHAR_LINE_GAP = 16; // 标题末行基线 → 角色行基线
const BADGE_GAP = 14; // 角色行基线 → 价格标签顶部
const BADGE_H = 22;
const INFO_BOTTOM_PAD = 8;

// 浏览器画布上限（超过后 toBlob/toDataURL 会失败）
// iOS Safari 明显更严格：超出会导出 0KB 打不开的空文件
const IS_IOS = typeof navigator !== 'undefined' && (
  /iPad|iPhone|iPod/.test(navigator.userAgent)
  || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
);
const MAX_CANVAS_SIDE = IS_IOS ? 4096 : 16384;
const MAX_CANVAS_AREA = IS_IOS ? 16700000 : 268000000;

// 主题色
const COLORS = {
  owned: { badge: '#eab308', badgeText: '#fff' },
  wish:  { badge: '#f43f5e', badgeText: '#fff' },
};

// ---- 图片加载 ----

/** 从 dataURL 或 URL 加载为 Image 对象（远程 URL 加 CORS 标记） */
function urlToImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    // 远程 URL 需要 CORS，否则 Canvas 会被污染导致 toDataURL 失败
    if (src.startsWith('http')) {
      img.crossOrigin = 'anonymous';
    }
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

/** 当前展示图片对应的版本下标（多版本商品按收藏的版本，否则第 0 版）；单图商品返回 -1 */
function versionIndex(item) {
  const list = item.images && item.images.length > 1 ? item.images : null;
  if (!list) return -1;
  const found = list.findIndex(img => (img.label || img.name) === item.version);
  return found >= 0 ? found : 0;
}

/**
 * 导出图标题：多版本商品且已选择版本时，显示所选版本的完整标题
 * （如「海景布徽章(初版)」），与详情弹窗/卡片一致；否则使用商品基础名
 */
export function getItemExportTitle(item) {
  const list = item.images && item.images.length > 1 ? item.images : null;
  if (!list || !item.version) return item.name;
  const found = list.findIndex(img => (img.label || img.name) === item.version);
  if (found < 0) return item.name;
  return list[found].name || item.name;
}

// 文本测量用的离屏画布（标题折行需要与主画布完全一致的字体度量）
let _measureCtx = null;
function getMeasureContext() {
  if (!_measureCtx) {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    _measureCtx = canvas.getContext('2d');
  }
  return _measureCtx;
}

/** 按字符折行，完整保留标题内容（不截断、不省略任何字符） */
function wrapText(ctx, text, maxWidth) {
  const chars = Array.from(String(text || ''));
  const lines = [];
  let line = '';
  chars.forEach((ch) => {
    if (line && ctx.measureText(line + ch).width > maxWidth) {
      lines.push(line);
      line = ch;
    } else {
      line += ch;
    }
  });
  if (line || lines.length === 0) lines.push(line);
  return lines;
}

/**
 * 预排版：为每行卡片计算标题折行与信息区高度
 * 同一行内卡片等高（取最高的一张），不同行可不同高
 */
function buildLayout(items) {
  const ctx = getMeasureContext();
  ctx.font = TITLE_FONT;
  const maxTitleW = CARD_W - INFO_PAD * 2;
  const rows = [];
  for (let r = 0; r < Math.ceil(items.length / CARDS_PER_ROW); r++) {
    const cards = items
      .slice(r * CARDS_PER_ROW, (r + 1) * CARDS_PER_ROW)
      .map((item) => {
        const title = getItemExportTitle(item);
        const lines = wrapText(ctx, title, maxTitleW);
        const titleBottom = TITLE_FIRST_BASELINE + (lines.length - 1) * TITLE_LINE_H;
        const charBaseline = titleBottom + CHAR_LINE_GAP;
        const badgeY = charBaseline + BADGE_GAP;
        return {
          item,
          title,
          lines,
          charBaseline,
          badgeY,
          infoH: badgeY + BADGE_H + INFO_BOTTOM_PAD,
        };
      });
    rows.push({
      cards,
      infoH: Math.max(...cards.map(c => c.infoH)),
    });
  }
  return rows;
}

/** 远程原图地址（多版本商品取当前版本，避免 item.image 为空时拿到空串） */
function remoteUrlOf(item) {
  const idx = versionIndex(item);
  if (idx >= 0 && item.images[idx] && item.images[idx].url) return item.images[idx].url;
  return item.image || '';
}

/** 推导本地图片路径：清单里记录了真实后缀（多为 webp），多版本商品带 _v{idx} */
function getLocalUrls(item) {
  const base = import.meta.env.BASE_URL; // '/'（dev）或 '/aikatsu/'（构建）
  const idx = versionIndex(item);
  const key = idx >= 0 ? `item_${item.id}_v${idx}` : `item_${item.id}`;
  const ext = LOCAL_IMAGES[key];
  return ext ? [`${base}images/${key}.${ext}`] : [];
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
  const remote = remoteUrlOf(item);
  if (!remote) {
    console.log(`    ✗ 无可用图片地址`);
    return null;
  }
  console.log(`    ⚡ 本地无缓存，尝试代理加载...`);
  const dataUrl = await loadViaProxy(remote);
  if (dataUrl) {
    const img = await urlToImage(dataUrl);
    if (img) {
      console.log(`    ✓ proxy (dataURL)`);
      return img;
    }
  }

  // 策略3: 直接加载远程 URL（部分 CDN 如 Imgur 支持 CORS）
  console.log(`    🌐 尝试直接加载远程 URL...`);
  const directImg = await urlToImage(remote);
  if (directImg) {
    console.log(`    ✓ direct (CORS)`);
    return directImg;
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
  // 占位文字也完整显示商品名，按图片宽度折行
  const lines = wrapText(ctx, name, w - 16);
  const lineH = 16;
  const startY = y + h / 2 - ((lines.length - 1) * lineH) / 2;
  lines.forEach((line, i) => ctx.fillText(line, x + w / 2, startY + i * lineH));
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

/**
 * 把画布保存为 PNG 下载
 * 用 toBlob + objectURL，避免超大 data URL 被浏览器拦截导致下载失败
 */
export function downloadCanvasAsPng(canvas, filename) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('图片生成失败（画布尺寸过大或内存不足）'));
        return;
      }
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = filename;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 10000);
      resolve();
    }, 'image/png');
  });
}

export async function renderShareImageToCanvas({ items, type, totalQuantity, totalPrice }) {
  console.group('🎨 Canvas 直绘分享图');

  const theme = COLORS[type];
  // 先按标题折行预排版：每行卡片高度由该行最高的一张决定
  const layout = buildLayout(items);

  // 1. 预加载所有图片
  const imageMap = await preloadItemImages(items);

  // 2. 计算画布尺寸 (5列卡片网格)
  const ROW_GAP = 14;
  const cardsHeight = layout.reduce((sum, row) => sum + CARD_IMG_H + row.infoH + ROW_GAP, 0);
  const height = PADDING + 100 + 90 + (cardsHeight + 16) + 50 + PADDING;

  // 商品很多时画布会超出浏览器上限（iOS 超出会导出 0KB 空文件），
  // 按比例降分辨率，保证画布始终在限制内
  const scale = Math.min(
    2,
    MAX_CANVAS_SIDE / height,
    Math.sqrt(MAX_CANVAS_AREA / (WIDTH * height)),
  );

  const canvas = document.createElement('canvas');
  canvas.width = Math.round(WIDTH * scale);
  canvas.height = Math.round(height * scale);
  const ctx = canvas.getContext('2d');
  ctx.scale(scale, scale);

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

  // 心愿单不展示「心理总价」，只保留 种类 / 总件数；收藏额外展示「购入总价」
  const stats = [
    { label: '种类', value: String(items.length) },
    { label: '总件数', value: String(totalQuantity) },
  ];
  if (type === 'owned') {
    stats.push({ label: '购入总价', value: `¥${totalPrice.toFixed(2)}` });
  }
  const colW = statsW / stats.length;
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

  // 6. 商品卡片网格 (5列)
  layout.forEach(({ cards, infoH }) => {
    const rowY = cy;
    const cardH = CARD_IMG_H + infoH;

    cards.forEach((card, colIdx) => {
      const { item, lines, charBaseline, badgeY: relBadgeY } = card;
      const cx = PADDING + colIdx * (CARD_W + CARD_GAP);

      // ---- 卡片阴影 ----
      roundRect(ctx, cx + 2, rowY + 3, CARD_W, cardH, CARD_R);
      ctx.fillStyle = 'rgba(0,0,0,0.07)';
      ctx.fill();

      // ---- 卡片主体 ----
      roundRect(ctx, cx, rowY, CARD_W, cardH, CARD_R);
      ctx.fillStyle = '#ffffff';
      ctx.fill();

      // ---- 图片区域 ----
      drawCardImage(ctx, imageMap[item.id], cx, rowY, CARD_W, CARD_IMG_H, card.title);

      // ---- 数量圆圈（图片左上角实心圆：收藏黄色、心愿单红色）----
      const qtyText = `×${(type === 'owned' ? item.quantity : item.wishQuantity) || 1}`;
      ctx.font = 'bold 11px "Quicksand", "Noto Sans SC", sans-serif';
      const tw = ctx.measureText(qtyText).width;
      const r = Math.max(12, tw / 2 + 6);
      const ccx = cx + r + 8;
      const ccy = rowY + r + 8;
      ctx.beginPath();
      ctx.arc(ccx, ccy, r, 0, Math.PI * 2);
      ctx.fillStyle = theme.badge;
      ctx.fill();
      ctx.fillStyle = theme.badgeText;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(qtyText, ccx, ccy + 0.5);
      ctx.textBaseline = 'alphabetic';
      ctx.textAlign = 'left';

      // ---- 图片/信息分隔线 ----
      ctx.strokeStyle = 'rgba(0,0,0,0.05)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx + 8, rowY + CARD_IMG_H);
      ctx.lineTo(cx + CARD_W - 8, rowY + CARD_IMG_H);
      ctx.stroke();

      // ---- 信息区域 ----
      const infoY = rowY + CARD_IMG_H;
      const pad = INFO_PAD;
      const innerX = cx + pad;

      // 商品名：完整展示（含版本信息的全名），按卡片宽度折行，不截断不省略
      ctx.textAlign = 'left';
      ctx.font = TITLE_FONT;
      ctx.fillStyle = '#1e293b';
      lines.forEach((line, li) => {
        ctx.fillText(line, innerX, infoY + TITLE_FIRST_BASELINE + li * TITLE_LINE_H);
      });

      // ---- 角色（左） + 价格标签（右，同排对齐）----
      const chars = item.character.split(/[,，]/).map(c => c.trim()).filter(Boolean);
      const charStr = chars.length > 2
        ? chars[0] + '等' + chars.length + '人'
        : chars.join('·');
      ctx.font = '9px "Quicksand", "Noto Sans SC", sans-serif';
      ctx.fillStyle = 'rgba(0,0,0,0.4)';
      ctx.fillText(charStr, innerX, infoY + charBaseline);

      // 价格标签：收藏 / 心愿单同款布局，独占卡片底部一行、右对齐
      const badgeH = BADGE_H;
      const badgeY = infoY + relBadgeY;

      if (type === 'owned') {
        const priceText = `¥${(item.totalPrice || 0).toFixed(2)}`;
        ctx.font = 'bold 12px "Quicksand", "Noto Sans SC", sans-serif';
        const pw = ctx.measureText(priceText).width;
        const badgeW = Math.ceil(pw) + 18;
        const badgeX = cx + CARD_W - pad - badgeW;

        // 黄色渐变实心药丸 + 白色价格
        const g = ctx.createLinearGradient(badgeX, badgeY, badgeX, badgeY + badgeH);
        g.addColorStop(0, '#fbbf24');
        g.addColorStop(1, '#f59e0b');
        roundRect(ctx, badgeX, badgeY, badgeW, badgeH, 11);
        ctx.fillStyle = g;
        ctx.fill();

        ctx.textAlign = 'center';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(priceText, badgeX + badgeW / 2, badgeY + 16);
        ctx.textAlign = 'left';
      } else {
        // 红色圆角矩形里显示完整的心理价格范围（min~max），不再只显示小计
        const min = item.wishPriceMin || 0;
        const max = item.wishPriceMax || 0;
        const fmt = (n) => (Number.isInteger(n) ? String(n) : n.toFixed(2));
        const priceText = max > 0 ? `¥${fmt(min)}~${fmt(max)}` : `¥${fmt(min)}`;
        // 未填写心理价时不画价格药丸（与卡片保持一致）
        if (min > 0 || max > 0) {
          ctx.font = 'bold 12px "Quicksand", "Noto Sans SC", sans-serif';
          const pw = ctx.measureText(priceText).width;
          const badgeW = Math.ceil(pw) + 18;
          const badgeX = cx + CARD_W - pad - badgeW;

          // 玫红药丸（与「想要」同款）
          roundRect(ctx, badgeX, badgeY, badgeW, badgeH, 11);
          ctx.fillStyle = theme.badge;
          ctx.fill();

          ctx.textAlign = 'center';
          ctx.font = 'bold 12px "Quicksand", "Noto Sans SC", sans-serif';
          ctx.fillStyle = theme.badgeText;
          ctx.fillText(priceText, badgeX + badgeW / 2, badgeY + 16);
        }
      }
    });

    cy += cardH + ROW_GAP;
  });

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
