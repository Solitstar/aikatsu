import { useEffect } from 'react';

const ItemModal = ({ item, onClose, onToggleStatus, onAddPriceRecord, onRemovePriceRecord, onUpdatePriceRecord, onIncreaseWishQty, onDecreaseWishQty, onSetWishPriceMin, onSetWishPriceMax }) => {
  useEffect(() => {
    if (!item) return;
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [item, onClose]);

  if (!item) return null;

  const totalPrice = item.totalPrice || 0;
  const wishTotalMin = (item.wishPriceMin || 0) * (item.wishQuantity || 0);
  const wishTotalMax = (item.wishPriceMax || 0) * (item.wishQuantity || 0);
  const hasRange = (item.wishPriceMax || 0) > 0;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <div className="min-h-full flex items-center justify-center p-4">
        <div
          className="relative w-full max-w-3xl bg-card-bg rounded-3xl shadow-soft overflow-hidden my-8"
          onClick={(e) => e.stopPropagation()}
        >
        <div className="bg-accent/10 px-4 py-3 border-b border-accent/20">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 text-text-secondary text-sm font-medium hover:bg-white hover:text-text-primary transition-all"
          >
            ◀ 返回
          </button>
        </div>

        <div className="p-5 sm:p-8">
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
            <div className="w-full sm:w-2/5 flex-shrink-0">
              <div className="aspect-square rounded-2xl overflow-hidden bg-bg-primary/30 shadow-card">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center">
              {item.subtitle && (
                <p className="text-sm text-text-secondary font-quick mb-1">
                  {item.subtitle}
                </p>
              )}
              <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-4">
                {item.name}
              </h3>

              <div className="flex flex-wrap gap-3 mb-6">
                <button
                  onClick={() => onToggleStatus(item.id, 'owned')}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    item.status === 'owned'
                      ? 'bg-yellow-100 text-yellow-700 ring-2 ring-yellow-400'
                      : 'bg-white text-text-secondary border border-text-secondary/20 hover:border-yellow-400 hover:text-yellow-600'
                  }`}
                >
                  <span>⭐️</span>
                  已拥有
                </button>
                <button
                  onClick={() => onToggleStatus(item.id, 'wish')}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    item.status === 'wish'
                      ? 'bg-rose-100 text-rose-700 ring-2 ring-rose-400'
                      : 'bg-white text-text-secondary border border-text-secondary/20 hover:border-rose-400 hover:text-rose-500'
                  }`}
                >
                  <span>❤️</span>
                  心愿单
                </button>
              </div>

              {item.status === 'owned' && (
                <div className="bg-yellow-50/50 rounded-2xl p-4 mb-6 border border-yellow-100">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-semibold text-yellow-700">购入记录</p>
                    <button
                      onClick={() => onAddPriceRecord(item.id)}
                      className="flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-200 text-yellow-700 text-xs font-medium hover:bg-yellow-300 transition-colors"
                    >
                      ➕ 添加记录
                    </button>
                  </div>
                  <div className="space-y-2">
                    {(item.priceRecords || []).map((record, idx) => (
                      <div key={record.id} className="flex items-center gap-2 p-2 rounded-xl bg-white/80">
                        <span className="text-xs text-text-secondary font-quick w-5 text-center flex-shrink-0">
                          {idx + 1}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs text-text-secondary">¥</span>
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={record.price || ''}
                            onChange={(e) => onUpdatePriceRecord(item.id, record.id, 'price', e.target.value)}
                            placeholder="0.00"
                            className="w-20 px-2 py-1 rounded-lg border border-yellow-200 bg-white text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-quick"
                          />
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => onUpdatePriceRecord(item.id, record.id, 'quantity', Math.max(0, (record.quantity || 1) - 1))}
                            className="w-6 h-6 flex items-center justify-center rounded-full bg-white text-yellow-600 text-sm border border-yellow-200 hover:bg-yellow-100 transition-colors"
                          >
                            −
                          </button>
                          <span className="font-quick font-bold text-yellow-700 min-w-[20px] text-center text-sm">
                            {record.quantity || 1}
                          </span>
                          <button
                            onClick={() => onUpdatePriceRecord(item.id, record.id, 'quantity', (record.quantity || 1) + 1)}
                            className="w-6 h-6 flex items-center justify-center rounded-full bg-white text-yellow-600 text-sm border border-yellow-200 hover:bg-yellow-100 transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-xs font-quick text-yellow-600 font-medium ml-auto">
                          ¥{((record.price || 0) * (record.quantity || 0)).toFixed(2)}
                        </span>
                        <button
                          onClick={() => onRemovePriceRecord(item.id, record.id)}
                          className="w-6 h-6 flex items-center justify-center rounded-full text-red-400 hover:bg-red-50 hover:text-red-500 transition-colors flex-shrink-0"
                          title="删除此记录"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 pt-3 mt-3 border-t border-yellow-200/60">
                    <span className="text-sm text-text-secondary">总价</span>
                    <span className="font-quick font-bold text-lg text-yellow-700">
                      ¥ {totalPrice.toFixed(2)}
                    </span>
                    <span className="text-xs text-yellow-400 ml-auto">
                      共 {(item.quantity || 0)} 件
                    </span>
                  </div>
                </div>
              )}

              {item.status === 'wish' && (
                <div className="bg-rose-50/50 rounded-2xl p-4 mb-6 border border-rose-100">
                  <p className="text-sm font-semibold text-rose-600 mb-3">心理价格范围</p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <label className="text-sm text-text-secondary w-16 flex-shrink-0">最低价</label>
                      <div className="flex-1 flex items-center gap-2">
                        <span className="text-text-secondary">¥</span>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.wishPriceMin || ''}
                          onChange={(e) => onSetWishPriceMin(item.id, e.target.value)}
                          placeholder="0.00"
                          className="flex-1 px-3 py-1.5 rounded-lg border border-rose-200 bg-white text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent font-quick"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <label className="text-sm text-text-secondary w-16 flex-shrink-0">最高价</label>
                      <div className="flex-1 flex items-center gap-2">
                        <span className="text-text-secondary">¥</span>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.wishPriceMax || ''}
                          onChange={(e) => onSetWishPriceMax(item.id, e.target.value)}
                          placeholder="0.00"
                          className="flex-1 px-3 py-1.5 rounded-lg border border-rose-200 bg-white text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent font-quick"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <label className="text-sm text-text-secondary w-16 flex-shrink-0">数量</label>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onDecreaseWishQty(item.id)}
                          className="w-7 h-7 flex items-center justify-center rounded-full bg-white text-rose-600 font-bold border border-rose-200 hover:bg-rose-100 transition-colors"
                        >
                          −
                        </button>
                        <span className="font-quick font-bold text-rose-600 min-w-[32px] text-center">
                          {item.wishQuantity || 1}
                        </span>
                        <button
                          onClick={() => onIncreaseWishQty(item.id)}
                          className="w-7 h-7 flex items-center justify-center rounded-full bg-white text-rose-600 font-bold border border-rose-200 hover:bg-rose-100 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 pt-2 border-t border-rose-200/60">
                      <span className="text-sm text-text-secondary w-16 flex-shrink-0">总价</span>
                      <span className="font-quick font-bold text-lg text-rose-600">
                        ¥ {wishTotalMin.toFixed(2)}
                        {hasRange && <span className="text-base font-normal"> ~ ¥ {wishTotalMax.toFixed(2)}</span>}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="border-t border-accent/20 pt-5">
                <div className="space-y-3 text-sm">
                  <div className="flex">
                    <span className="w-16 text-text-secondary flex-shrink-0">系列</span>
                    <span className="text-text-primary">{item.series}</span>
                  </div>
                  <div className="flex">
                    <span className="w-16 text-text-secondary flex-shrink-0">角色</span>
                    <span className="text-text-primary">{item.character}</span>
                  </div>
                  <div className="flex">
                    <span className="w-16 text-text-secondary flex-shrink-0">种类</span>
                    <span className="text-text-primary">{item.type}</span>
                  </div>
                  <div className="flex">
                    <span className="w-16 text-text-secondary flex-shrink-0">尺寸</span>
                    <span className="text-text-primary">{item.size || '-'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
