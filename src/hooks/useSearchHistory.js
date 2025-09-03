import { useState, useEffect, useCallback } from 'react';
import { searchService } from '../services/searchService';

/**
 * Hook for managing search history
 * @param {string} userId - Optional user ID for authenticated users
 * @returns {Object} - Search history methods and state
 */
export function useSearchHistory(userId = null) {
  const [searchHistory, setSearchHistory] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  
  // Load search history on mount
  useEffect(() => {
    const history = searchService.getSearchHistory(20, userId);
    setSearchHistory(history);
  }, [userId]);
  
  /**
   * Track a search query
   * @param {string} query - The search query
   * @param {Array} results - The search results
   */
  const trackSearch = useCallback((query, results) => {
    const searchQuery = searchService.trackSearchQuery(query, results, userId);
    
    // Update local state
    setSearchHistory(prev => [searchQuery, ...prev].slice(0, 20));
  }, [userId]);
  
  /**
   * Clear search history
   */
  const clearHistory = useCallback(() => {
    searchService.clearSearchHistory(userId);
    setSearchHistory([]);
  }, [userId]);
  
  /**
   * Get search suggestions based on input
   * @param {string} input - The current input value
   */
  const getSuggestions = useCallback((input) => {
    if (!input || input.length < 2) {
      setSuggestions([]);
      return;
    }
    
    const results = searchService.getSearchSuggestions(input, 5);
    setSuggestions(results);
  }, []);
  
  return {
    searchHistory,
    suggestions,
    trackSearch,
    clearHistory,
    getSuggestions
  };
}

