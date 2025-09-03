import React, { useState } from 'react';
import { Filter, ChevronDown, ChevronUp, X } from 'lucide-react';

const SearchFilters = ({ 
  filters, 
  onFilterChange, 
  onApplyFilters,
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters || {
    orientation: '',
    color: '',
    animalType: '',
    sort: 'relevant'
  });

  // Animal type options
  const animalTypes = [
    { value: '', label: 'All Animals' },
    { value: 'dog', label: 'Dogs' },
    { value: 'cat', label: 'Cats' },
    { value: 'bird', label: 'Birds' },
    { value: 'horse', label: 'Horses' },
    { value: 'fish', label: 'Fish' },
    { value: 'reptile', label: 'Reptiles' },
    { value: 'wildlife', label: 'Wildlife' }
  ];

  // Orientation options
  const orientations = [
    { value: '', label: 'Any Orientation' },
    { value: 'landscape', label: 'Landscape' },
    { value: 'portrait', label: 'Portrait' },
    { value: 'squarish', label: 'Square' }
  ];

  // Color options
  const colors = [
    { value: '', label: 'Any Color' },
    { value: 'black_and_white', label: 'Black & White' },
    { value: 'black', label: 'Black' },
    { value: 'white', label: 'White' },
    { value: 'yellow', label: 'Yellow' },
    { value: 'orange', label: 'Orange' },
    { value: 'red', label: 'Red' },
    { value: 'purple', label: 'Purple' },
    { value: 'magenta', label: 'Magenta' },
    { value: 'green', label: 'Green' },
    { value: 'teal', label: 'Teal' },
    { value: 'blue', label: 'Blue' }
  ];

  // Sort options
  const sortOptions = [
    { value: 'relevant', label: 'Most Relevant' },
    { value: 'latest', label: 'Newest' },
    { value: 'popular', label: 'Most Popular' }
  ];

  // Handle filter change
  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
    
    // If not expanded, apply filters immediately
    if (!isExpanded) {
      onFilterChange(updatedFilters);
    }
  };

  // Apply filters
  const handleApplyFilters = () => {
    onFilterChange(localFilters);
    setIsExpanded(false);
  };

  // Reset filters
  const handleResetFilters = () => {
    const resetFilters = {
      orientation: '',
      color: '',
      animalType: '',
      sort: 'relevant'
    };
    
    setLocalFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  // Count active filters
  const activeFilterCount = Object.values(localFilters).filter(value => value && value !== 'relevant').length;

  return (
    <div className={`bg-surface rounded-lg shadow-sm border border-muted ${className}`}>
      {/* Filter Header */}
      <div 
        className="flex items-center justify-between p-3 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted" />
          <span className="font-medium text-text">Filters</span>
          {activeFilterCount > 0 && (
            <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </div>
        
        <button className="text-muted">
          {isExpanded ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>
      </div>
      
      {/* Expanded Filters */}
      {isExpanded && (
        <div className="p-3 border-t border-muted space-y-4">
          {/* Animal Type */}
          <div>
            <label className="block text-sm font-medium text-text mb-1">
              Animal Type
            </label>
            <select
              value={localFilters.animalType}
              onChange={(e) => handleFilterChange('animalType', e.target.value)}
              className="input py-2"
            >
              {animalTypes.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          {/* Orientation */}
          <div>
            <label className="block text-sm font-medium text-text mb-1">
              Orientation
            </label>
            <select
              value={localFilters.orientation}
              onChange={(e) => handleFilterChange('orientation', e.target.value)}
              className="input py-2"
            >
              {orientations.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          {/* Color */}
          <div>
            <label className="block text-sm font-medium text-text mb-1">
              Color
            </label>
            <select
              value={localFilters.color}
              onChange={(e) => handleFilterChange('color', e.target.value)}
              className="input py-2"
            >
              {colors.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          {/* Sort By */}
          <div>
            <label className="block text-sm font-medium text-text mb-1">
              Sort By
            </label>
            <select
              value={localFilters.sort}
              onChange={(e) => handleFilterChange('sort', e.target.value)}
              className="input py-2"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <button
              onClick={handleApplyFilters}
              className="btn-primary flex-1 py-2"
            >
              Apply Filters
            </button>
            
            <button
              onClick={handleResetFilters}
              className="btn-secondary py-2 px-3"
              title="Reset Filters"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
      
      {/* Filter Pills (when collapsed) */}
      {!isExpanded && activeFilterCount > 0 && (
        <div className="p-3 border-t border-muted flex flex-wrap gap-2">
          {localFilters.animalType && (
            <div className="bg-bg rounded-full px-3 py-1 text-sm flex items-center gap-1">
              <span>{animalTypes.find(o => o.value === localFilters.animalType)?.label}</span>
              <button
                onClick={() => handleFilterChange('animalType', '')}
                className="text-muted hover:text-text"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
          
          {localFilters.orientation && (
            <div className="bg-bg rounded-full px-3 py-1 text-sm flex items-center gap-1">
              <span>{orientations.find(o => o.value === localFilters.orientation)?.label}</span>
              <button
                onClick={() => handleFilterChange('orientation', '')}
                className="text-muted hover:text-text"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
          
          {localFilters.color && (
            <div className="bg-bg rounded-full px-3 py-1 text-sm flex items-center gap-1">
              <span>{colors.find(o => o.value === localFilters.color)?.label}</span>
              <button
                onClick={() => handleFilterChange('color', '')}
                className="text-muted hover:text-text"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
          
          {localFilters.sort && localFilters.sort !== 'relevant' && (
            <div className="bg-bg rounded-full px-3 py-1 text-sm flex items-center gap-1">
              <span>{sortOptions.find(o => o.value === localFilters.sort)?.label}</span>
              <button
                onClick={() => handleFilterChange('sort', 'relevant')}
                className="text-muted hover:text-text"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
          
          {activeFilterCount > 1 && (
            <button
              onClick={handleResetFilters}
              className="text-primary hover:text-primary/80 text-sm"
            >
              Clear All
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchFilters;

