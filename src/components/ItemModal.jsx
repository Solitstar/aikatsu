import { useEffect } from 'react';

const ItemModal = ({ item, onClose, onToggleStatus, onIncreaseQty, onDecreaseQty, onSetPrice, onIncreaseWishQty, onDecreaseWishQty, onSetWishPrice }) => {
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

  const getSizeLabel = (type) => {
    const sizes = {
      '徽章': '直径 58mm',
      '亚克力立牌': '约 15cm',
      '卡片': '63×89mm',
      '文件夹': 'A4',
      '毛绒玩偶': '约 20cm',
    };
    return sizes[type] || '-';
  };

  const getNameJp = (name) => {
    const nameMap = {
      '草莓爱心徽章': 'いちごハート缶バッジ',
      '星宫莓亚克力立牌': '星宮いちご アクリルスタンド',
      '雾矢葵闪耀卡片': '霧矢あおい キラキラカード',
      '大空明文件夹': '大空あかり クリアファイル',
      '音城塞拉毛绒玩偶': '音城セイラ ぬいぐるみ',
      '星宫莓舞台徽章': '星宮いちご ステージ缶バッジ',
      '雾矢葵亚克力立牌': '霧矢あおい アクリルスタンド',
      '大空明闪耀卡片': '大空あかり キラキラカード',
      '星宫莓毛绒玩偶': '星宮いちご ぬいぐるみ',
      '雾矢葵文件夹': '霧矢あおい クリアファイル',
      '音城塞拉徽章': '音城セイラ 缶バッジ',
      '大空明亚克力立牌': '大空あかり アクリルスタンド',
      '星宫莓文件夹': '星宮いちご クリアファイル',
      '雾矢葵毛绒玩偶': '霧矢あおい ぬいぐるみ',
      '音城塞拉卡片': '音城セイラ コレクションカード',
      '大空明毛绒玩偶': '大空あかり ぬいぐるみ',
      '星宫莓收藏卡片套装': '星宮いちご コレクションカードセット',
      '音城塞拉亚克力立牌': '音城セイラ アクリルスタンド',
      '大空明徽章': '大空あかり 缶バッジ',
      '音城塞拉文件夹': '音城セイラ クリアファイル',
    };
    return nameMap[name] || name;
  };

  if (!item) return null;

  const totalPrice = (item.price || 0) * (item.quantity || 0);
  const wishTotalPrice = (item.wishPrice || 0) * (item.wishQuantity || 0);

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
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回
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
              <p className="text-sm text-text-secondary font-quick mb-1">
                {getNameJp(item.name)}
              </p>
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
                {item.status === 'owned' && (
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-50 border border-yellow-200">
                    <button
                      onClick={() => onDecreaseQty(item.id)}
                      className="w-6 h-6 flex items-center justify-center rounded-full bg-white text-yellow-700 font-bold hover:bg-yellow-100 transition-colors"
                    >
                      −
                    </button>
                    <span className="font-quick font-bold text-yellow-700 min-w-[24px] text-center">
                      {item.quantity || 0}
                    </span>
                    <button
                      onClick={() => onIncreaseQty(item.id)}
                      className="w-6 h-6 flex items-center justify-center rounded-full bg-white text-yellow-700 font-bold hover:bg-yellow-100 transition-colors"
                    >
                      +
                    </button>
                  </div>
                )}
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
                  <p className="text-sm font-semibold text-yellow-700 mb-3">购入记录</p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <label className="text-sm text-text-secondary w-16 flex-shrink-0">单价</label>
                      <div className="flex-1 flex items-center gap-2">
                        <span className="text-text-secondary">¥</span>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.price || ''}
                          onChange={(e) => onSetPrice(item.id, e.target.value)}
                          placeholder="0.00"
                          className="flex-1 px-3 py-1.5 rounded-lg border border-yellow-200 bg-white text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-quick"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <label className="text-sm text-text-secondary w-16 flex-shrink-0">数量</label>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onDecreaseQty(item.id)}
                          className="w-7 h-7 flex items-center justify-center rounded-full bg-white text-yellow-700 font-bold border border-yellow-200 hover:bg-yellow-100 transition-colors"
                        >
                          −
                        </button>
                        <span className="font-quick font-bold text-yellow-700 min-w-[32px] text-center">
                          {item.quantity || 0}
                        </span>
                        <button
                          onClick={() => onIncreaseQty(item.id)}
                          className="w-7 h-7 flex items-center justify-center rounded-full bg-white text-yellow-700 font-bold border border-yellow-200 hover:bg-yellow-100 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 pt-2 border-t border-yellow-200/60">
                      <span className="text-sm text-text-secondary w-16 flex-shrink-0">总价</span>
                      <span className="font-quick font-bold text-lg text-yellow-700">
                        ¥ {totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {item.status === 'wish' && (
                <div className="bg-rose-50/50 rounded-2xl p-4 mb-6 border border-rose-100">
                  <p className="text-sm font-semibold text-rose-600 mb-3">心理价格</p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <label className="text-sm text-text-secondary w-16 flex-shrink-0">单价</label>
                      <div className="flex-1 flex items-center gap-2">
                        <span className="text-text-secondary">¥</span>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.wishPrice || ''}
                          onChange={(e) => onSetWishPrice(item.id, e.target.value)}
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
                        ¥ {wishTotalPrice.toFixed(2)}
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
                    <span className="text-text-primary">{getSizeLabel(item.type)}</span>
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
