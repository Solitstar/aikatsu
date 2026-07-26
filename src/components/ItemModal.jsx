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
      '寰界珷': '鐩村緞 58mm',
      '浜氬厠鍔涚珛鐗?: '绾?15cm',
      '鍗＄墖': '63脳89mm',
      '鏂囦欢澶?: 'A4',
      '姣涚粧鐜╁伓': '绾?20cm',
    };
    return sizes[type] || '-';
  };

  const getNameJp = (name) => {
    const nameMap = {
      '鑽夎帗鐖卞績寰界珷': '銇勩仭銇斻儚銉笺儓缂躲儛銉冦偢',
      '鏄熷鑾撲簹鍏嬪姏绔嬬墝': '鏄熷銇勩仭銇?銈偗銉儷銈广偪銉炽儔',
      '闆剧煝钁甸棯鑰€鍗＄墖': '闇х煝銇傘亰銇?銈儵銈儵銈兗銉?,
      '澶х┖鏄庢枃浠跺す': '澶х┖銇傘亱銈?銈儶銈儠銈°偆銉?,
      '闊冲煄濉炴媺姣涚粧鐜╁伓': '闊冲煄銈汇偆銉?銇亜銇愩倠銇?,
      '鏄熷鑾撹垶鍙板窘绔?: '鏄熷銇勩仭銇?銈广儐銉笺偢缂躲儛銉冦偢',
      '闆剧煝钁典簹鍏嬪姏绔嬬墝': '闇х煝銇傘亰銇?銈偗銉儷銈广偪銉炽儔',
      '澶х┖鏄庨棯鑰€鍗＄墖': '澶х┖銇傘亱銈?銈儵銈儵銈兗銉?,
      '鏄熷鑾撴瘺缁掔帺鍋?: '鏄熷銇勩仭銇?銇亜銇愩倠銇?,
      '闆剧煝钁垫枃浠跺す': '闇х煝銇傘亰銇?銈儶銈儠銈°偆銉?,
      '闊冲煄濉炴媺寰界珷': '闊冲煄銈汇偆銉?缂躲儛銉冦偢',
      '澶х┖鏄庝簹鍏嬪姏绔嬬墝': '澶х┖銇傘亱銈?銈偗銉儷銈广偪銉炽儔',
      '鏄熷鑾撴枃浠跺す': '鏄熷銇勩仭銇?銈儶銈儠銈°偆銉?,
      '闆剧煝钁垫瘺缁掔帺鍋?: '闇х煝銇傘亰銇?銇亜銇愩倠銇?,
      '闊冲煄濉炴媺鍗＄墖': '闊冲煄銈汇偆銉?銈炽儸銈偡銉с兂銈兗銉?,
      '澶х┖鏄庢瘺缁掔帺鍋?: '澶х┖銇傘亱銈?銇亜銇愩倠銇?,
      '鏄熷鑾撴敹钘忓崱鐗囧瑁?: '鏄熷銇勩仭銇?銈炽儸銈偡銉с兂銈兗銉夈偦銉冦儓',
      '闊冲煄濉炴媺浜氬厠鍔涚珛鐗?: '闊冲煄銈汇偆銉?銈偗銉儷銈广偪銉炽儔',
      '澶х┖鏄庡窘绔?: '澶х┖銇傘亱銈?缂躲儛銉冦偢',
      '闊冲煄濉炴媺鏂囦欢澶?: '闊冲煄銈汇偆銉?銈儶銈儠銈°偆銉?,
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
            杩斿洖
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
                {item.name_jp || getNameJp(item.name)}
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
                  <span>猸愶笍</span>
                  宸叉嫢鏈?
                </button>
                {item.status === 'owned' && (
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-50 border border-yellow-200">
                    <button
                      onClick={() => onDecreaseQty(item.id)}
                      className="w-6 h-6 flex items-center justify-center rounded-full bg-white text-yellow-700 font-bold hover:bg-yellow-100 transition-colors"
                    >
                      鈭?
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
                  <span>鉂わ笍</span>
                  蹇冩効鍗?
                </button>
              </div>

              {item.status === 'owned' && (
                <div className="bg-yellow-50/50 rounded-2xl p-4 mb-6 border border-yellow-100">
                  <p className="text-sm font-semibold text-yellow-700 mb-3">璐叆璁板綍</p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <label className="text-sm text-text-secondary w-16 flex-shrink-0">鍗曚环</label>
                      <div className="flex-1 flex items-center gap-2">
                        <span className="text-text-secondary">楼</span>
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
                      <label className="text-sm text-text-secondary w-16 flex-shrink-0">鏁伴噺</label>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onDecreaseQty(item.id)}
                          className="w-7 h-7 flex items-center justify-center rounded-full bg-white text-yellow-700 font-bold border border-yellow-200 hover:bg-yellow-100 transition-colors"
                        >
                          鈭?
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
                      <span className="text-sm text-text-secondary w-16 flex-shrink-0">鎬讳环</span>
                      <span className="font-quick font-bold text-lg text-yellow-700">
                        楼 {totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {item.status === 'wish' && (
                <div className="bg-rose-50/50 rounded-2xl p-4 mb-6 border border-rose-100">
                  <p className="text-sm font-semibold text-rose-600 mb-3">蹇冪悊浠锋牸</p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <label className="text-sm text-text-secondary w-16 flex-shrink-0">鍗曚环</label>
                      <div className="flex-1 flex items-center gap-2">
                        <span className="text-text-secondary">楼</span>
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
                      <label className="text-sm text-text-secondary w-16 flex-shrink-0">鏁伴噺</label>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onDecreaseWishQty(item.id)}
                          className="w-7 h-7 flex items-center justify-center rounded-full bg-white text-rose-600 font-bold border border-rose-200 hover:bg-rose-100 transition-colors"
                        >
                          鈭?
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
                      <span className="text-sm text-text-secondary w-16 flex-shrink-0">鎬讳环</span>
                      <span className="font-quick font-bold text-lg text-rose-600">
                        楼 {wishTotalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="border-t border-accent/20 pt-5">
                <div className="space-y-3 text-sm">
                  <div className="flex">
                    <span className="w-16 text-text-secondary flex-shrink-0">绯诲垪</span>
                    <span className="text-text-primary">{item.series}</span>
                  </div>
                  <div className="flex">
                    <span className="w-16 text-text-secondary flex-shrink-0">瑙掕壊</span>
                    <span className="text-text-primary">{item.character}</span>
                  </div>
                  <div className="flex">
                    <span className="w-16 text-text-secondary flex-shrink-0">绉嶇被</span>
                    <span className="text-text-primary">{item.type}</span>
                  </div>
                  <div className="flex">
                    <span className="w-16 text-text-secondary flex-shrink-0">灏哄</span>
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
