import { useEffect, useState } from 'react';

const ItemModal = ({ item, onClose, onToggleStatus, onAddPriceRecord, onRemovePriceRecord, onUpdatePriceRecord, onIncreaseWishQty, onDecreaseWishQty, onSetWishPriceMin, onSetWishPriceMax, folders, itemFolderId, onMoveToFolder, onCreateFolder }) => {
  const [showFolderPicker, setShowFolderPicker] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [imgSrc, setImgSrc] = useState('');
  const [imgLoaded, setImgLoaded] = useState(false);
  const [fallbackStep, setFallbackStep] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [displayName, setDisplayName] = useState('');

  // 多图列表：images 存在时使用多图，否则单图（支持字符串或 {label, url, name} 对象）
  const imageList = (() => {
    const raw = item?.images?.length ? item.images : item ? [item.image] : [];
    return raw.map((img, i) => {
      if (typeof img === 'string') return { label: `图${i + 1}`, url: img, name: null };
      return { label: img.label || `图${i + 1}`, url: img.url, name: img.name || null };
    });
  })();

  // 图片加载优先级：本地缓存 → 远程URL → SVG占位
  useEffect(() => {
    if (!item) return;
    setSelectedIdx(0);
    setDisplayName(item.name);
    setImgLoaded(false);
    setFallbackStep(0);
    const base = import.meta.env.BASE_URL;
    setImgSrc(`${base}images/item_${item.id}.webp`);
  }, [item?.id]);

  const handleImgError = () => {
    const base = import.meta.env.BASE_URL;
    // 副图加载失败 → 回退到第一张
    if (selectedIdx > 0) {
      setSelectedIdx(0);
      setImgLoaded(false);
      setFallbackStep(0);
      setImgSrc(`${base}images/item_${item.id}.webp`);
      return;
    }
    const next = [
      `${base}images/item_${item.id}.png`,
      `${base}images/item_${item.id}.jpg`,
      (imageList[0] && imageList[0].url) || item.image,
      `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Crect fill='%23f3f4f6' width='300' height='300'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-size='16'%3E图片加载失败%3C/text%3E%3C/svg%3E`,
    ];
    if (fallbackStep < next.length) {
      setImgSrc(next[fallbackStep]);
      setFallbackStep(fallbackStep + 1);
    }
  };

  const handleSelectImage = (idx) => {
    setSelectedIdx(idx);
    setImgLoaded(false);
    setFallbackStep(0);
    setImgSrc(idx === 0 ? `${import.meta.env.BASE_URL}images/item_${item.id}.webp` : imageList[idx].url);
    // 版本自带标题时更新商品标题
    if (imageList[idx].name) {
      setDisplayName(imageList[idx].name);
    } else {
      setDisplayName(item.name);
    }
  };

  const itemType = item?.status;
  const currentFolder = folders.find(f => f.id === itemFolderId);
  useEffect(() => {
    if (!item) return;
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    document.body.classList.add('modal-open');
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.classList.remove('modal-open');
    };
  }, [item, onClose]);

  if (!item) return null;

  const totalPrice = item.totalPrice || 0;
  const wishTotalMin = (item.wishPriceMin || 0) * (item.wishQuantity || 0);
  const wishTotalMax = (item.wishPriceMax || 0) * (item.wishQuantity || 0);
  const hasRange = (item.wishPriceMax || 0) > 0;

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <div className="absolute inset-0 overflow-y-auto flex items-start justify-center p-4 sm:items-center">
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
                {!imgLoaded && (
                  <div className="w-full h-full animate-pulse bg-gradient-to-b from-gray-200 via-gray-100 to-gray-200" />
                )}
                <img
                  src={imgSrc || item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  style={{ display: imgLoaded ? 'block' : 'none' }}
                  onLoad={() => setImgLoaded(true)}
                  onError={handleImgError}
                />
              </div>
              {/* 淘宝式图片选择按钮 */}
              {imageList.length > 1 && (
                <div className="mt-3">
                  <div className="flex flex-wrap gap-2">
                    {imageList.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelectImage(idx)}
                        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                          selectedIdx === idx
                            ? 'bg-accent text-white border-accent shadow-md'
                            : 'bg-white text-text-secondary border-accent/20 hover:border-accent/50 hover:text-text-primary'
                        }`}
                      >
                        {img.label}
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-text-secondary/60 mt-1.5">
                    当前：{imageList[selectedIdx].label}
                  </p>
                </div>
              )}
            </div>

            <div className="flex-1 flex flex-col justify-center">
              {item.subtitle && (
                <p className="text-sm text-text-secondary font-quick mb-1">
                  {item.subtitle}
                </p>
              )}
              <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-4">
                {displayName || item.name}
              </h3>

              {/* 商品信息 */}
              <div className="space-y-3 text-sm mb-6">
                <div className="flex">
                  <span className="w-16 text-text-secondary flex-shrink-0">系列</span>
                  <span className="text-text-primary">{item.series}</span>
                </div>
                <div className="flex">
                  <span className="w-16 text-text-secondary flex-shrink-0">角色</span>
                  <span className="text-text-primary">{item.character.split(/[,，]/).map(c => c.trim()).filter(Boolean).join(' | ')}</span>
                </div>
                <div className="flex">
                  <span className="w-16 text-text-secondary flex-shrink-0">种类</span>
                  <span className="text-text-primary">{item.type}</span>
                </div>
                <div className="flex">
                  <span className="w-16 text-text-secondary flex-shrink-0">尺寸</span>
                  <span className="text-text-primary">{item.size || '-'}</span>
                </div>
                {item.remark && (
                  <div className="flex">
                    <span className="w-16 text-text-secondary flex-shrink-0">备注</span>
                    <span className="text-text-primary leading-relaxed">{item.remark}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-3 mb-6">
                <button
                  onClick={() => onToggleStatus(item.id, 'owned')}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium text-white transition-all ${
                    item.status === 'owned'
                      ? 'bg-yellow-500 shadow-md ring-2 ring-yellow-300'
                      : 'bg-yellow-400 hover:bg-yellow-500'
                  }`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l2.9 6.26L21.5 9.27l-5 4.87L17.9 21 12 17.77 6.1 21l1.4-6.86-5-4.87 6.6-1.01L12 2z" />
                  </svg>
                  已拥有
                </button>
                <button
                  onClick={() => onToggleStatus(item.id, 'wish')}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium text-white transition-all ${
                    item.status === 'wish'
                      ? 'bg-rose-600 shadow-md ring-2 ring-rose-300'
                      : 'bg-rose-400 hover:bg-rose-500'
                  }`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  心愿单
                </button>
              </div>

              {/* 文件夹选择 */}
              {itemType && (
                <div className="bg-bg-primary/50 rounded-2xl p-4 mb-6">
                  <p className="text-sm font-semibold text-text-primary mb-2 flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
                    </svg>
                    {itemType === 'owned' ? '收藏文件夹' : '愿望文件夹'}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => onMoveToFolder(null)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        !itemFolderId
                          ? 'bg-accent text-white shadow-sm'
                          : 'bg-white text-text-secondary border border-accent/20 hover:bg-accent/5'
                      }`}
                    >
                      未分类
                    </button>
                    {folders.map(f => (
                      <button
                        key={f.id}
                        onClick={() => onMoveToFolder(f.id)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                          itemFolderId === f.id
                            ? 'bg-accent text-white shadow-sm'
                            : 'bg-white text-text-secondary border border-accent/20 hover:bg-accent/5'
                        }`}
                      >
                        {f.name}
                      </button>
                    ))}
                    <button
                      onClick={() => setShowFolderPicker(!showFolderPicker)}
                      className="px-3 py-1.5 rounded-full text-xs font-medium bg-white text-accent border border-dashed border-accent/30 hover:bg-accent/5 transition-all"
                    >
                      + 新建
                    </button>
                  </div>

                  {showFolderPicker && (
                    <div className="flex items-center gap-2 mt-2">
                      <input
                        value={newFolderName}
                        onChange={(e) => setNewFolderName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && newFolderName.trim()) {
                            const fid = onCreateFolder(newFolderName.trim());
                            if (fid) {
                              onMoveToFolder(fid);
                              setNewFolderName('');
                              setShowFolderPicker(false);
                            }
                          }
                          if (e.key === 'Escape') { setShowFolderPicker(false); setNewFolderName(''); }
                        }}
                        placeholder="文件夹名..."
                        className="flex-1 px-3 py-1.5 rounded-lg border border-accent/30 bg-white text-text-primary text-sm
                                   focus:outline-none focus:border-accent"
                        autoFocus
                      />
                      <button
                        onClick={() => { setShowFolderPicker(false); setNewFolderName(''); }}
                        className="text-xs text-text-secondary hover:text-text-primary"
                      >
                        取消
                      </button>
                    </div>
                  )}
                </div>
              )}

              {item.status === 'owned' && (
                <div className="bg-yellow-50/50 rounded-2xl p-4 mb-6 border border-yellow-100">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-semibold text-yellow-700">购入记录</p>
                    <button
                      onClick={() => onAddPriceRecord(item.id)}
                      className="flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-200 text-yellow-700 text-xs font-medium hover:bg-yellow-300 transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                      </svg>
                      添加记录
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
                            className="w-20 px-2 py-1 rounded-lg border border-yellow-200 bg-white text-text-primary text-base focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-quick"
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
                  <p className="text-sm font-semibold text-rose-600 mb-1">心理价格范围</p>
                  <p className="text-xs text-rose-400/70 mb-3 leading-relaxed">
                    设置你愿意接受的买入价格区间。只填最低价 = 心理单价；填区间 = 最低到最高均可接受。
                  </p>
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
                          className="flex-1 px-3 py-1.5 rounded-lg border border-rose-200 bg-white text-text-primary text-base focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent font-quick"
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
                          className="flex-1 px-3 py-1.5 rounded-lg border border-rose-200 bg-white text-text-primary text-base focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent font-quick"
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
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
