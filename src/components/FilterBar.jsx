import { TYPES } from '../data/items';
import {
  SERIES_LIST,
  getCharactersBySeriesAndGender,
} from '../data/characters';

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
  const availableCharacters = ['全部', ...getCharactersBySeriesAndGender(filterSeries, '全部')];
  if (!availableCharacters.includes('其他')) {
    availableCharacters.push('其他');
  }

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
          {renderSelect('系列', filterSeries, onSeriesChange, SERIES_LIST)}
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
