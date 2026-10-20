import { useEffect, useRef, useState } from 'react';
import { TYPES } from '../data/items';
import {
  SERIES_LIST,
  SERIES_LABELS,
  getCharactersBySeries,
  CHARACTER_GROUPS,
  getCharacterGroupByName,
} from '../data/characters';

const selectClass = `
  appearance-none px-4 py-2.5 pr-10 rounded-xl
  bg-card-bg border border-accent/20
  text-text-primary text-sm font-medium
  cursor-pointer transition-all duration-300
  hover:border-accent/40 hover:shadow-soft
  focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20
  bg-no-repeat bg-right-3
`;

const wrapperClass = "relative";

// 系列下拉：普通系列平铺，「组合」默认收起，点一下才展开组合列表
const SeriesSelect = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const [groupOpen, setGroupOpen] = useState(() => !!getCharacterGroupByName(value));
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDocMouseDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDocMouseDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onDocMouseDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const activeGroup = getCharacterGroupByName(value);
  const label = activeGroup ? `${activeGroup.name} 组合` : (SERIES_LABELS[value] || value);

  const pick = (v) => {
    onChange(v);
    setOpen(false);
  };

  return (
    <div className={wrapperClass} ref={ref}>
      <label className="block text-xs text-text-secondary mb-1.5 ml-1">系列</label>
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={selectClass + " w-full text-left relative"}
      >
        <span className="block truncate">{label}</span>
        <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-accent text-sm">
          ▾
        </span>
      </button>

      {open && (
        <div className="absolute z-30 left-0 mt-1 w-max min-w-full max-w-[280px] max-h-72 overflow-y-auto rounded-xl bg-card-bg border border-accent/20 shadow-soft py-1">
          {SERIES_LIST.map(opt => (
            <button
              key={opt}
              type="button"
              onClick={() => pick(opt)}
              className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                opt === value
                  ? 'bg-accent/10 text-accent font-medium'
                  : 'text-text-primary hover:bg-accent/5'
              }`}
            >
              {SERIES_LABELS[opt] || opt}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setGroupOpen(v => !v)}
            className="w-full flex items-center justify-between px-4 py-2 mt-1 border-t border-accent/10 text-sm text-text-primary hover:bg-accent/5 transition-colors"
          >
            <span className="font-medium">组合</span>
            <span className={`inline-block text-accent text-xs transition-transform duration-200 ${groupOpen ? 'rotate-90' : ''}`}>
              ▸
            </span>
          </button>

          {groupOpen && CHARACTER_GROUPS.map(g => (
            <button
              key={g.name}
              type="button"
              onClick={() => pick(g.name)}
              className={`w-full text-left pl-7 pr-4 py-2 text-sm transition-colors ${
                g.name === value
                  ? 'bg-accent/10 text-accent font-medium'
                  : 'text-text-secondary hover:bg-accent/5 hover:text-text-primary'
              }`}
            >
              {g.name}组合
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const FilterBar = ({
  filterSeries,
  filterChar,
  filterType,
  filterCharCount,
  onSeriesChange,
  onCharChange,
  onTypeChange,
  onCharCountChange,
  onReset,
}) => {
  const CHAR_COUNT_OPTIONS = ['全部', '单人', '多人', '其他(不含角色)'];
  // 系列筛选若选中了"组合"（如 WM），角色下拉候选即该组合成员；否则为该系列角色
  const activeGroup = getCharacterGroupByName(filterSeries);
  const availableCharacters = ['全部', ...(activeGroup ? activeGroup.characters : getCharactersBySeries(filterSeries))];
  if (!availableCharacters.includes('其他')) {
    availableCharacters.push('其他');
  }

  const chevronClass = "absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-accent text-sm";

  const renderSelect = (label, value, onChange, options, widthClass = "") => (
    <div className={wrapperClass}>
      <label className="block text-xs text-text-secondary mb-1.5 ml-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={selectClass + " w-full " + widthClass}
      >
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <span className={chevronClass}>▾</span>
    </div>
  );

  return (
    <div className="bg-card-bg rounded-2xl shadow-card p-4 sm:p-6 mb-6">
      <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 items-stretch lg:items-center">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 flex-1">
          <SeriesSelect value={filterSeries} onChange={onSeriesChange} />
          {renderSelect('角色', filterChar, onCharChange, availableCharacters)}
          {renderSelect('种类', filterType, onTypeChange, TYPES)}
          {renderSelect('角色数', filterCharCount, onCharCountChange, CHAR_COUNT_OPTIONS)}
        </div>

        <button
          onClick={onReset}
          className="px-6 py-2.5 rounded-xl bg-accent/10 text-accent font-medium text-sm
                     hover:bg-accent hover:text-white transition-all duration-300
                     flex items-center justify-center gap-2 group
                     self-end lg:self-auto"
        >
          <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          重置筛选
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
