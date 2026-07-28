const GoodsCard = ({ item, onClick }) => {
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
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-yellow-400 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
            ⭐️ {qty > 1 ? `×${qty}` : '已拥有'}
          </span>
        </div>
      );
    }
    if (item.status === 'wish') {
      return (
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-rose-400 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
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

  return (
    <div
      onClick={() => onClick(item)}
      className={`
        group relative bg-card-bg rounded-2xl overflow-hidden shadow-card
        cursor-pointer transition-all duration-300 ease-out
        hover:shadow-soft hover:-translate-y-1
        ${getCardBorder()}
      `}
    >
      {getStatusBadge()}

      <div className="aspect-square overflow-hidden bg-bg-primary/30">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            const img = e.target;
            // 按顺序尝试 fallback
            const tries = img.dataset.fallbackTries ? parseInt(img.dataset.fallbackTries) : 0;
            const fallbacks = [
              `/aikatsu/images/item_${item.id}.png`,
              `/aikatsu/images/item_${item.id}.jpg`,
              // 最终占位：内联 SVG
              `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%23f3f4f6' width='200' height='200'/%3E%3Ctext x='50%25' y='45%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-size='14'%3E${encodeURIComponent(item.name)}%3C/text%3E%3Ctext x='50%25' y='60%25' dominant-baseline='middle' text-anchor='middle' fill='%23d1d5db' font-size='11'%3E图片加载失败%3C/text%3E%3C/svg%3E`,
            ];
            if (tries < fallbacks.length) {
              img.src = fallbacks[tries];
              img.dataset.fallbackTries = tries + 1;
            }
          }}
        />
      </div>

      <div className="p-3 sm:p-4">
        {item.subtitle && (
          <p className="text-xs text-text-secondary font-quick mb-0.5 truncate">
            {item.subtitle}
          </p>
        )}
        <h3 className="font-medium text-text-primary text-sm sm:text-base mb-2 line-clamp-2 leading-tight">
          {item.name}
        </h3>
        <div className="flex flex-wrap gap-1.5">
          <span className="inline-block text-xs px-2.5 py-1 rounded-full bg-accent/15 text-accent font-medium">
            {formatCardCharacter(item.character)}
          </span>
          <span className="inline-block text-xs px-2.5 py-1 rounded-full bg-bg-primary text-text-secondary font-medium">
            {item.type}
          </span>
        </div>
      </div>

      <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-300 pointer-events-none rounded-2xl" />
    </div>
  );
};

export default GoodsCard;
