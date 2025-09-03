/**
 * Search Service
 * Handles search-related functionality and tracking
 */

// Local storage key for search history
const SEARCH_HISTORY_KEY = 'animalsnap_search_history';

/**
 * Get search history from local storage
 * @returns {Array} - Array of search history objects
 */
const getSearchHistory = () => {
  try {
    const history = localStorage.getItem(SEARCH_HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error getting search history:', error);
    return [];
  }
};

/**
 * Save search history to local storage
 * @param {Array} history - Array of search history objects
 */
const saveSearchHistory = (history) => {
  try {
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Error saving search history:', error);
  }
};

export const searchService = {
  /**
   * Track a search query
   * @param {string} query - The search query
   * @param {Array} results - The search results
   * @param {string} userId - Optional user ID for authenticated users
   * @returns {Object} - The created search query object
   */
  trackSearchQuery(query, results, userId = null) {
    // Create search query object
    const searchQuery = {
      id: `search_${Date.now()}`,
      query,
      timestamp: new Date().toISOString(),
      resultCount: results.length,
      userId
    };
    
    // Get existing history
    const history = getSearchHistory();
    
    // Add new search to history (limit to 20 items)
    const updatedHistory = [searchQuery, ...history].slice(0, 20);
    
    // Save updated history
    saveSearchHistory(updatedHistory);
    
    return searchQuery;
  },
  
  /**
   * Get search history
   * @param {number} limit - Maximum number of items to return
   * @param {string} userId - Optional user ID for authenticated users
   * @returns {Array} - Array of search history objects
   */
  getSearchHistory(limit = 10, userId = null) {
    const history = getSearchHistory();
    
    // Filter by user ID if provided
    const filteredHistory = userId 
      ? history.filter(item => item.userId === userId)
      : history;
    
    // Return limited results
    return filteredHistory.slice(0, limit);
  },
  
  /**
   * Clear search history
   * @param {string} userId - Optional user ID for authenticated users
   */
  clearSearchHistory(userId = null) {
    if (userId) {
      // Only clear history for specific user
      const history = getSearchHistory();
      const filteredHistory = history.filter(item => item.userId !== userId);
      saveSearchHistory(filteredHistory);
    } else {
      // Clear all history
      saveSearchHistory([]);
    }
  },
  
  /**
   * Get search suggestions based on previous searches
   * @param {string} query - The current search query
   * @param {number} limit - Maximum number of suggestions to return
   * @returns {Array} - Array of suggestion strings
   */
  getSearchSuggestions(query, limit = 5) {
    if (!query || query.length < 2) return [];
    
    const history = getSearchHistory();
    
    // Find matching queries
    const matchingQueries = history
      .filter(item => item.query.toLowerCase().includes(query.toLowerCase()))
      .map(item => item.query);
    
    // Remove duplicates
    const uniqueQueries = [...new Set(matchingQueries)];
    
    // Return limited results
    return uniqueQueries.slice(0, limit);
  }
};

