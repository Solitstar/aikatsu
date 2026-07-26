const StatsBar = ({ displayCount, ownedCount, ownedTotalQuantity, wishCount, wishTotalQuantity, totalCount }) => {
  return (
    <div className="bg-card-bg rounded-2xl shadow-card px-6 py-4 mb-6">
      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-6 sm:gap-10">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📦</span>
          <div>
            <p className="text-xs text-text-secondary">当前显示</p>
            <p className="font-quick text-lg font-bold text-text-primary">
              {displayCount} <span className="text-sm font-normal text-text-secondary">/ {totalCount} 件</span>
            </p>
          </div>
        </div>
        <div className="w-px h-10 bg-accent/20 hidden sm:block" />
        <div className="flex items-center gap-2">
          <span className="text-2xl">⭐️</span>
          <div>
            <p className="text-xs text-text-secondary">已拥有</p>
            <p className="font-quick text-lg font-bold text-text-primary">
              {ownedTotalQuantity} <span className="text-sm font-normal text-text-secondary">件 / {ownedCount} 种</span>
            </p>
          </div>
        </div>
        <div className="w-px h-10 bg-accent/20 hidden sm:block" />
        <div className="flex items-center gap-2">
          <span className="text-2xl">❤️</span>
          <div>
            <p className="text-xs text-text-secondary">想要</p>
            <p className="font-quick text-lg font-bold text-text-primary">
              {wishTotalQuantity} <span className="text-sm font-normal text-text-secondary">件 / {wishCount} 种</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsBar;
