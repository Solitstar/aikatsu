const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 sm:py-24">
      <h3 className="text-lg sm:text-xl font-medium text-text-primary mb-2">
        没有找到匹配的周边哦
      </h3>
      <p className="text-text-secondary text-sm sm:text-base">
        试试调整筛选条件吧～
      </p>
    </div>
  );
};

export default EmptyState;
