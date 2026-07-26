const Header = ({ activeTab, onTabChange }) => {
  const tabs = [
    { key: 'collection', label: '图鉴' },
    { key: 'owned', label: '已拥有' },
    { key: 'wishlist', label: '心愿单' },
  ];

  return (
    <header className="bg-card-bg/80 backdrop-blur-sm sticky top-0 z-50 border-b border-accent/20 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="font-quick text-xl sm:text-2xl font-bold text-text-primary tracking-wide">
              AIKATSU GOODS
            </h1>
          </div>
          <nav className="flex gap-1 sm:gap-2">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => onTabChange(tab.key)}
                className={`px-3 sm:px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.key
                    ? 'bg-accent text-white shadow-md'
                    : 'text-text-secondary hover:bg-accent/10 hover:text-text-primary'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
