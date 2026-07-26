import GoodsCard from './GoodsCard';
import EmptyState from './EmptyState';

const CardGrid = ({ items, onCardClick }) => {
  if (items.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
      {items.map(item => (
        <GoodsCard key={item.id} item={item} onClick={onCardClick} />
      ))}
    </div>
  );
};

export default CardGrid;
