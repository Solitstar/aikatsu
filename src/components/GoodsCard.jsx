const GoodsCard = ({ item, onClick }) => {
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
            {item.character}
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
