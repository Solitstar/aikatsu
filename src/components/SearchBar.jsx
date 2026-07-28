import { useState, useRef, useEffect, useCallback } from 'react';
import { searchCharacters } from '../data/characters';

const SearchBar = ({ value, onChange, onClear }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);

  const updateSuggestions = useCallback((keyword) => {
    const results = searchCharacters(keyword);
    setSuggestions(results);
    setShowDropdown(results.length > 0);
    setActiveIndex(-1);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const val = e.target.value;
    onChange(val);
    updateSuggestions(val);
  };

  const handleKeyDown = (e) => {
    if (!showDropdown) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0 && suggestions[activeIndex]) {
        selectSuggestion(suggestions[activeIndex]);
        e.preventDefault();
      }
    } else if (e.key === 'Escape') {
      setShowDropdown(false);
    }
  };

  const selectSuggestion = (name) => {
    onChange(name);
    setShowDropdown(false);
    inputRef.current?.focus();
  };

  return (
    <div ref={wrapperRef} className="relative max-w-md mx-auto">
      <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent/50 z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => value && suggestions.length > 0 && setShowDropdown(true)}
        placeholder="搜索角色名、商品名..."
        className="w-full pl-12 pr-10 py-3 rounded-2xl bg-card-bg shadow-card border border-accent/20
                   text-text-primary placeholder:text-text-secondary/50 text-base
                   focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20
                   transition-all duration-300"
        autoComplete="off"
      />
      {value && (
        <button
          onClick={() => {
            onClear();
            setSuggestions([]);
            setShowDropdown(false);
            inputRef.current?.focus();
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center
                     rounded-full text-text-secondary/50 hover:text-text-secondary hover:bg-accent/10
                     transition-colors z-10"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card-bg rounded-2xl shadow-soft border border-accent/20 overflow-hidden z-50">
          {suggestions.map((name, idx) => (
            <button
              key={name}
              onClick={() => selectSuggestion(name)}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                idx === activeIndex
                  ? 'bg-accent/15 text-accent'
                  : 'text-text-primary hover:bg-accent/5'
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
