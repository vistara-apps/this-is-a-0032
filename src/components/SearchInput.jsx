import React from 'react';
import { Search, X } from 'lucide-react';

const SearchInput = ({ 
  value, 
  onChange, 
  onSearch, 
  loading, 
  placeholder = "Search for animal photos...",
  withClearButton = true 
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  const handleClear = () => {
    onChange('');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-muted" />
        </div>
        
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="input pl-12 pr-24 text-lg h-14"
          disabled={loading}
        />
        
        <div className="absolute inset-y-0 right-0 flex items-center">
          {withClearButton && value && (
            <button
              type="button"
              onClick={handleClear}
              className="p-2 text-muted hover:text-text transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          )}
          
          <button
            type="submit"
            disabled={loading || !value.trim()}
            className="btn-primary mr-2 px-4 py-2 text-sm h-10"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              'Search'
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchInput;