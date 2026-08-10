import { memo, useEffect, useRef } from 'react';
import GoodsCard from './GoodsCard';
import EmptyState from './EmptyState';

const CardGrid = ({ items, onCardClick, onLoadMore, hasMore }) => {
  const sentinelRef = useRef(null);

  // 滚动接近底部时触发加载更多（增量渲染）
  useEffect(() => {
    if (!onLoadMore || !hasMore) return;
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) onLoadMore();
      },
      { rootMargin: '600px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [onLoadMore, hasMore]);

  if (items.length === 0) {
    return <EmptyState />;
  }

  return (
    <>
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
        {items.map((item, index) => (
          <GoodsCard key={item.id} item={item} onClick={onCardClick} priority={index < 6} />
        ))}
      </div>
      {hasMore && (
        <div ref={sentinelRef} className="h-12 mt-2 flex items-center justify-center">
          <span className="text-xs text-text-secondary/50 animate-pulse">加载中...</span>
        </div>
      )}
    </>
  );
};

export default memo(CardGrid);
