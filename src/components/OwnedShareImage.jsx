import { forwardRef } from 'react';

const OwnedShareImage = forwardRef(({ items, totalQuantity, totalPrice }, ref) => {
  return (
    <div
      ref={ref}
      className="w-[700px] bg-gradient-to-b from-yellow-50 to-white p-8"
      style={{ fontFamily: "'Quicksand', 'Noto Sans SC', sans-serif" }}
    >
      <div className="text-center mb-8">
        <div className="text-4xl mb-2">⭐️</div>
        <h1 className="text-3xl font-bold text-yellow-600 mb-1">MY COLLECTION</h1>
        <p className="text-yellow-400 text-sm">我的收藏 · 偶像活动周边收藏</p>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-5 mb-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xs text-gray-400 mb-1">种类</p>
            <p className="text-2xl font-bold text-yellow-600">{items.length}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">总件数</p>
            <p className="text-2xl font-bold text-yellow-600">{totalQuantity}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">购入总价</p>
            <p className="text-2xl font-bold text-yellow-600">¥{totalPrice.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-8">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 bg-white rounded-xl p-3 shadow-sm"
          >
            <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-yellow-50">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
              />
            </div>
            <div className="flex-1 min-w-0">
              {item.subtitle && (
                <p className="text-xs text-gray-300 truncate">{item.subtitle}</p>
              )}
              <p className="font-bold text-gray-700 text-sm truncate">{item.name}</p>
              <p className="text-xs text-gray-400 truncate">{item.character} · {item.type}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-yellow-600 font-bold text-sm">
                ¥{((item.price || 0) * (item.quantity || 0)).toFixed(2)}
              </p>
              <p className="text-xs text-gray-400">
                ¥{(item.price || 0).toFixed(2)} × {item.quantity || 0}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center text-yellow-400 text-xs">
        <p>💖 Made with love for Aikatsu fans</p>
        <p className="mt-1 text-yellow-300">AIKATSU GOODS COLLECTION</p>
      </div>
    </div>
  );
});

OwnedShareImage.displayName = 'OwnedShareImage';

export default OwnedShareImage;
