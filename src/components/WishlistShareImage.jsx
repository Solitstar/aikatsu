import { forwardRef } from 'react';

const WishlistShareImage = forwardRef(({ items, totalQuantity, totalPriceMin, totalPriceMax }, ref) => {
  const hasTotalRange = totalPriceMax > 0;
  return (
    <div
      ref={ref}
      className="w-[850px] bg-gradient-to-b from-rose-50 to-white p-10"
      style={{ fontFamily: "'Quicksand', 'Noto Sans SC', sans-serif" }}
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-black mb-1">MY WISHLIST</h1>
        <p className="text-black/60 text-sm">我的心愿单 · 偶像活动周边收藏</p>
      </div>

      <div className="bg-white rounded-2xl p-5 mb-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xs text-black/50 mb-1">🏷 种类</p>
            <p className="text-2xl font-bold text-black">{items.length}</p>
          </div>
          <div>
            <p className="text-xs text-black/50 mb-1">📦 总件数</p>
            <p className="text-2xl font-bold text-black">{totalQuantity}</p>
          </div>
          <div>
            <p className="text-xs text-black/50 mb-1">💰 心理总价</p>
            <p className="text-2xl font-bold text-black">
              ¥{totalPriceMin.toFixed(2)}
              {hasTotalRange && <span className="text-lg font-normal"> ~ ¥{totalPriceMax.toFixed(2)}</span>}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-5 bg-white rounded-xl p-4"
          >
            <div className="w-32 h-32 rounded-xl overflow-hidden flex-shrink-0 bg-rose-50">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
              />
            </div>
            <div className="flex-1 min-w-0 flex flex-col justify-center gap-0.5">
              {item.subtitle && (
                <p className="text-[8px] text-black/40 leading-tight">{item.subtitle}</p>
              )}
              <p className="font-bold text-black text-xs leading-tight">{item.name}</p>
              <p className="text-[9px] text-black/50 leading-tight">{item.character} · {item.type}</p>
            </div>
            <div className="text-right flex-shrink-0 flex flex-col justify-center">
              <p className="text-black font-bold text-sm whitespace-nowrap">
                ¥{((item.wishPriceMin || 0) * (item.wishQuantity || 1)).toFixed(2)}
                {(item.wishPriceMax || 0) > 0 && <span className="text-xs font-normal"> ~ ¥{((item.wishPriceMax || 0) * (item.wishQuantity || 1)).toFixed(2)}</span>}
              </p>
              <p className="text-xs text-black/50 whitespace-nowrap">
                ¥{(item.wishPriceMin || 0).toFixed(2)}
                {(item.wishPriceMax || 0) > 0 && <span> ~ ¥{(item.wishPriceMax || 0).toFixed(2)}</span>}
                {' '}× {item.wishQuantity || 1}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center text-black/40 text-xs">
        <p>Made by Solitstar</p>
        <p className="mt-1 text-black/30">AIKATSU GOODS COLLECTION</p>
      </div>
    </div>
  );
});

WishlistShareImage.displayName = 'WishlistShareImage';

export default WishlistShareImage;
