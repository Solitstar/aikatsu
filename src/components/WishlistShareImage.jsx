import { forwardRef } from 'react';

const WishlistShareImage = forwardRef(({ items, totalQuantity, totalPrice }, ref) => {
  return (
    <div
      ref={ref}
      className="w-[600px] bg-gradient-to-b from-rose-50 to-white p-8"
      style={{ fontFamily: "'Quicksand', 'Noto Sans SC', sans-serif" }}
    >
      <div className="text-center mb-8">
        <div className="text-4xl mb-2">❤️</div>
        <h1 className="text-3xl font-bold text-rose-500 mb-1">MY WISHLIST</h1>
        <p className="text-rose-300 text-sm">我的心愿单 · 偶像活动周边收藏</p>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-5 mb-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xs text-gray-400 mb-1">种类</p>
            <p className="text-2xl font-bold text-rose-500">{items.length}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">总件数</p>
            <p className="text-2xl font-bold text-rose-500">{totalQuantity}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">心理总价</p>
            <p className="text-2xl font-bold text-rose-500">¥{totalPrice.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-8">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="flex items-center gap-4 bg-white rounded-xl p-3 shadow-sm"
          >
            <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-rose-50">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-gray-700 text-sm truncate">{item.name}</p>
              <p className="text-xs text-gray-400">{item.character} · {item.type}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-rose-500 font-bold text-sm">
                ¥{((item.wishPrice || 0) * (item.wishQuantity || 1)).toFixed(2)}
              </p>
              <p className="text-xs text-gray-400">
                ¥{(item.wishPrice || 0).toFixed(2)} × {item.wishQuantity || 1}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center text-rose-300 text-xs">
        <p>💖 Made with love for Aikatsu fans</p>
        <p className="mt-1 text-rose-200">AIKATSU GOODS COLLECTION</p>
      </div>
    </div>
  );
});

WishlistShareImage.displayName = 'WishlistShareImage';

export default WishlistShareImage;
