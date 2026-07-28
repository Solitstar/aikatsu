import { useState, useMemo, useRef, useEffect } from 'react';
import { getCharactersBySeriesAndGender } from '../data/characters';
import { TYPES } from '../data/items';

const CollectionProgress = ({ items, ownedItems }) => {
  const [selectedChar, setSelectedChar] = useState('全部');
  const [selectedType, setSelectedType] = useState('全部');
  const [searchText, setSearchText] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);

  const totalCount = items.length;
  const ownedCount = ownedItems.length;
  const overallPercent = totalCount > 0 ? Math.round((ownedCount / totalCount) * 100) : 0;

  const allCharacters = ['全部', ...getCharactersBySeriesAndGender('全部', '全部')];

  // 搜索过滤角色列表
  const filteredChars = useMemo(() => {
    if (!searchText.trim()) return allCharacters;
    const kw = searchText.toLowerCase().trim();
    return allCharacters.filter(c => c.toLowerCase().includes(kw));
  }, [allCharacters, searchText]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current && !dropdownRef.current.contains(e.target) &&
        searchRef.current && !searchRef.current.contains(e.target)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (char) => {
    setSelectedChar(char);
    setSearchText('');
    setShowDropdown(false);
  };

  // 按角色+种类统计
  const hasFilter = selectedChar !== '全部' || selectedType !== '全部';
  const charStats = useMemo(() => {
    if (!hasFilter) return null;

    const charTotal = items.filter(item => {
      const matchChar = selectedChar === '全部' ||
        item.character.split(/[,，]/).map(c => c.trim()).includes(selectedChar);
      const matchType = selectedType === '全部' || item.type === selectedType;
      return matchChar && matchType;
    });

    const charOwned = ownedItems.filter(item => {
      const matchChar = selectedChar === '全部' ||
        item.character.split(/[,，]/).map(c => c.trim()).includes(selectedChar);
      const matchType = selectedType === '全部' || item.type === selectedType;
      return matchChar && matchType;
    });

    const percent = charTotal.length > 0
      ? Math.round((charOwned.length / charTotal.length) * 100)
      : 0;

    return {
      total: charTotal.length,
      owned: charOwned.length,
      uncollected: charTotal.length - charOwned.length,
      percent,
    };
  }, [selectedChar, selectedType, items, ownedItems]);

  const progressColor = 'from-pink-300 to-accent';

  return (
    <div className="bg-card-bg rounded-2xl shadow-card px-5 sm:px-6 py-5 mb-6">
      {/* 总体进度 */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-quick font-bold text-sm text-text-primary">
            图鉴收集进度
          </h3>
          <span className="font-quick text-2xl font-bold text-accent">
            {overallPercent}%
          </span>
        </div>
        <div className="w-full h-3 bg-bg-primary rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${progressColor} rounded-full transition-all duration-700 ease-out`}
            style={{ width: `${overallPercent}%` }}
          />
        </div>
        <p className="text-xs text-text-secondary mt-1.5">
          已收集 <span className="font-bold text-accent">{ownedCount}</span> / {totalCount} 件商品
        </p>
      </div>

      {/* 角色+种类筛选 */}
      <div className="border-t border-accent/10 pt-4">
        <label className="block text-xs text-text-secondary mb-2 font-medium">
          按角色和种类查看收集进度
        </label>
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          {/* 角色搜索 */}
          <div className="relative w-full sm:w-48" ref={dropdownRef}>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={searchRef}
                value={searchText}
                onChange={(e) => { setSearchText(e.target.value); setShowDropdown(true); }}
                onFocus={() => setShowDropdown(true)}
                placeholder={`${selectedChar} ▾`}
                className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-bg-primary border border-accent/20
                           text-text-primary text-sm font-medium
                           focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20
                           transition-all duration-300"
              />
              <button
                onClick={() => { setShowDropdown(true); searchRef.current?.focus(); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-accent/50 hover:text-accent text-xs"
              >
                ▾
              </button>
            </div>

            {showDropdown && filteredChars.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-card-bg rounded-xl shadow-soft border border-accent/10 max-h-52 overflow-y-auto z-30">
                {filteredChars.map((char) => {
                  const count = char === '全部' ? (
                    selectedType === '全部' ? totalCount : items.filter(item => item.type === selectedType).length
                  ) : items.filter(item => {
                    const mChar = item.character.split(/[,，]/).map(c => c.trim()).includes(char);
                    const mType = selectedType === '全部' || item.type === selectedType;
                    return mChar && mType;
                  }).length;
                  const isActive = selectedChar === char;
                  return (
                    <button
                      key={char}
                      onClick={() => handleSelect(char)}
                      className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between transition-colors ${
                        isActive
                          ? 'bg-accent/10 text-accent font-medium'
                          : 'text-text-primary hover:bg-accent/5'
                      }`}
                    >
                      <span>{char}</span>
                      <span className={`text-[10px] ${isActive ? 'text-accent' : 'text-text-secondary'}`}>
                        {char === '全部' ? `${totalCount}件` : `${count}件`}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 种类选择 */}
          <div className="relative w-full sm:w-40">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="appearance-none w-full px-4 py-2.5 pr-8 rounded-xl bg-bg-primary border border-accent/20
                         text-text-primary text-sm font-medium
                         cursor-pointer transition-all duration-300
                         hover:border-accent/40 hover:shadow-soft
                         focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
            >
              {TYPES.filter(t => t !== '全部').map(t => {
                const count = items.filter(item => item.type === t).length;
                return (
                  <option key={t} value={t}>{t} ({count})</option>
                );
              })}
              <option value="全部">全部种类</option>
            </select>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-accent text-sm">▾</span>
          </div>
        </div>

        {/* 角色详情统计 */}
        {charStats && (
          <div className="bg-bg-primary/50 rounded-xl p-4">
            <h4 className="font-bold text-sm text-text-primary mb-3">
              {selectedChar !== '全部' ? selectedChar : '全部角色'}
              {selectedType !== '全部' && ` · ${selectedType}`}
              {' '}收集详情
            </h4>

            {/* 角色进度条 */}
            <div className="w-full h-3 bg-white/60 rounded-full overflow-hidden mb-3">
              <div
                className={`h-full ${progressColor} rounded-full transition-all duration-700 ease-out`}
                style={{ width: `${charStats.percent}%` }}
              />
            </div>

            {/* 三项数据 */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-white rounded-lg py-2.5 px-2">
                <p className="text-xl font-bold text-text-primary">{charStats.total}</p>
                <p className="text-[10px] text-text-secondary">周边总数</p>
              </div>
              <div className="bg-accent/10 rounded-lg py-2.5 px-2">
                <p className="text-xl font-bold text-accent">{charStats.owned}</p>
                <p className="text-[10px] text-text-secondary">已收集</p>
              </div>
              <div className="bg-white rounded-lg py-2.5 px-2">
                <p className="text-xl font-bold text-text-secondary">{charStats.uncollected}</p>
                <p className="text-[10px] text-text-secondary">未收集</p>
              </div>
            </div>

            <p className="text-center text-xs text-text-secondary mt-2.5">
              完成度 <span className="font-bold text-accent">{charStats.percent}%</span>
              {charStats.percent === 100 && ' 已集齐！'}
            </p>
          </div>
        )}

        {/* 未选角色时的提示 */}
        {!charStats && (
          <p className="text-xs text-text-secondary/60 text-center py-2">
            选择角色或种类查看收集进度
          </p>
        )}
      </div>
    </div>
  );
};

export default CollectionProgress;
