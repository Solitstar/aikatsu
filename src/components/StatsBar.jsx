const StatsBar = ({ displayCount, ownedCount, ownedTotalQuantity, wishCount, wishTotalQuantity, totalCount, activeTab }) => {
  const isCollection = activeTab === 'collection';
  const isOwned = activeTab === 'owned';
  const isWishlist = activeTab === 'wishlist';

  return (
    <div className="bg-card-bg rounded-2xl shadow-card px-3 sm:px-6 py-3 sm:py-4 mb-6">
      <div className="flex items-center justify-center gap-2 sm:gap-10">
        {/* 图鉴页：显示全部三列 */}
        {isCollection && (
          <>
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="text-lg sm:text-2xl">📦</span>
              <div>
                <p className="text-[10px] sm:text-xs text-text-secondary">当前显示</p>
                <p className="font-quick text-sm sm:text-lg font-bold text-text-primary">
                  {displayCount} <span className="text-[10px] sm:text-sm font-normal text-text-secondary">/ {totalCount} 件</span>
                </p>
              </div>
            </div>
            <div className="w-px h-8 sm:h-10 bg-accent/20" />
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="text-lg sm:text-2xl">⭐️</span>
              <div>
                <p className="text-[10px] sm:text-xs text-text-secondary">已拥有</p>
                <p className="font-quick text-sm sm:text-lg font-bold text-text-primary">
                  {ownedTotalQuantity} <span className="text-[10px] sm:text-sm font-normal text-text-secondary">件 / {ownedCount} 种</span>
                </p>
              </div>
            </div>
            <div className="w-px h-8 sm:h-10 bg-accent/20" />
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="text-lg sm:text-2xl">❤️</span>
              <div>
                <p className="text-[10px] sm:text-xs text-text-secondary">想要</p>
                <p className="font-quick text-sm sm:text-lg font-bold text-text-primary">
                  {wishTotalQuantity} <span className="text-[10px] sm:text-sm font-normal text-text-secondary">件 / {wishCount} 种</span>
                </p>
              </div>
            </div>
          </>
        )}

        {/* 已拥有页：只显示已拥有 */}
        {isOwned && (
          <div className="flex items-center gap-2">
            <span className="text-2xl">⭐️</span>
            <div>
              <p className="text-xs text-text-secondary">已拥有</p>
              <p className="font-quick text-lg font-bold text-text-primary">
                {ownedTotalQuantity} 件 / {ownedCount} 种
              </p>
            </div>
          </div>
        )}

        {/* 心愿单页：只显示想要 */}
        {isWishlist && (
          <div className="flex items-center gap-2">
            <span className="text-2xl">❤️</span>
            <div>
              <p className="text-xs text-text-secondary">想要</p>
              <p className="font-quick text-lg font-bold text-text-primary">
                {wishTotalQuantity} 件 / {wishCount} 种
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsBar;
