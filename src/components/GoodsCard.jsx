import { useState } from 'react';

const GoodsCard = ({ item, onClick, priority = false }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [fallbackStep, setFallbackStep] = useState(0);

  const formatCardCharacter = (character) => {
    if (!character) return '';
    const chars = character.split(/[,，]/).map(c => c.trim()).filter(Boolean);
    if (chars.length <= 1) return character;
    return chars[0] + ' 等' + chars.length + '人';
  };

  const getStatusBadge = () => {
    if (item.status === 'owned') {
      const qty = item.quantity || 1;
      return (
        <div className="absolute top-1.5 left-1.5 sm:top-3 sm:left-3 z-10">
          <span className="bg-yellow-400 text-white text-[10px] sm:text-xs font-bold px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-md flex items-center gap-0.5 sm:gap-1">
            ⭐️ {qty > 1 ? `×${qty}` : '已拥有'}
          </span>
        </div>
      );
    }
    if (item.status === 'wish') {
      return (
        <div className="absolute top-1.5 left-1.5 sm:top-3 sm:left-3 z-10">
          <span className="bg-rose-400 text-white text-[10px] sm:text-xs font-bold px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-md flex items-center gap-0.5 sm:gap-1">
            ❤️ 想要
          </span>
        </div>
      );
    }
    return null;
  };

  const getCardBorder = () => {
    if (item.status === 'owned') return 'ring-2 ring-yellow-400/60';
    if (item.status === 'wish') return 'ring-2 ring-rose-400/60';
    return '';
  };

  // 图片加载优先级：本地缓存(WebP → PNG → JPG) → 远程URL → SVG占位
  const base = import.meta.env.BASE_URL; // '/' dev, '/aikatsu/' build
  // 多版本商品优先使用本地 v0 版本缓存
  const vSuffix = item?.images?.length > 1 ? '_v0' : '';
  const localWebp = `${base}images/item_${item.id}${vSuffix}.webp`;
  const localPng = `${base}images/item_${item.id}${vSuffix}.png`;
  const localJpg = `${base}images/item_${item.id}${vSuffix}.jpg`;
  const initialSrc = localWebp; // 优先WebP格式（体积最小）

  const fallbacks = [
    localPng,           // 2. 本地PNG缓存
    localJpg,           // 3. 本地JPG缓存
    item.images?.[0]?.url || item.image, // 4. 远程图床（优先版本0图）
    `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%23f3f4f6' width='200' height='200'/%3E%3Ctext x='50%25' y='45%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-size='14'%3E${encodeURIComponent(item.name.substring(0, 8))}%3C/text%3E%3Ctext x='50%25' y='60%25' dominant-baseline='middle' text-anchor='middle' fill='%23d1d5db' font-size='11'%3E图片加载失败%3C/text%3E%3C/svg%3E`,
  ];

  const handleImgError = (e) => {
    if (fallbackStep < fallbacks.length) {
      e.target.src = fallbacks[fallbackStep];
      setFallbackStep(fallbackStep + 1);
    } else {
      setImgError(true);
    }
  };

  return (
    <div
      onClick={() => onClick(item)}
      className={`
        group relative bg-card-bg rounded-2xl overflow-hidden shadow-card
        cursor-pointer transition-all duration-300 ease-out
        hover:shadow-soft hover:-translate-y-1
        content-visibility-auto contain-intrinsic-size-[auto_280px]
        will-change-transform
        ${getCardBorder()}
      `}
    >
      {getStatusBadge()}

      {/* 图片容器 - 使用 object-contain 完整展示图片 */}
      <div className="relative aspect-square overflow-hidden bg-[#f4f5f7] rounded-t-2xl">
        {/* 骨架屏加载动画 */}
        {!imgLoaded && !imgError && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-b from-gray-200 via-gray-100 to-gray-200" />
        )}

        <img
          src={initialSrc}
          alt={item.name}
          loading={priority ? "eager" : "lazy"}
          fetchpriority={priority ? "high" : "auto"}
          decoding="async"
          onLoad={() => { setImgLoaded(true); setImgError(false); }}
          onError={handleImgError}
          style={{
            opacity: imgLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
          }}
          className="w-full h-full object-contain p-1.5 sm:p-2 transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-2.5 sm:p-4">
        {item.subtitle && (
          <p className="text-[10px] sm:text-xs text-text-secondary font-quick mb-0.5 truncate">
            {item.subtitle}
          </p>
        )}
        <h3 className="font-medium text-text-primary text-xs sm:text-base mb-1.5 sm:mb-2 line-clamp-2 leading-tight">
          {item.name}
        </h3>
        <div className="flex flex-wrap gap-1 sm:gap-1.5">
          <span className="inline-block text-[10px] sm:text-xs px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-accent/15 text-accent font-medium truncate max-w-full">
            {formatCardCharacter(item.character)}
          </span>
          <span className="hidden sm:inline-block text-xs px-2.5 py-1 rounded-full bg-bg-primary text-text-secondary font-medium">
            {item.type}
          </span>
        </div>
      </div>

      <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-300 pointer-events-none rounded-2xl" />
    </div>
  );
};

export default GoodsCard;
