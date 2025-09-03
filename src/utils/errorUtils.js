/**
 * Error Utilities
 * Helper functions for error handling
 */

/**
 * Format error message for user display
 * @param {Error} error - The error object
 * @returns {string} - Formatted error message
 */
export const formatErrorMessage = (error) => {
  if (!error) {
    return 'An unknown error occurred';
  }
  
  // If it's an API error with a response
  if (error.response) {
    const status = error.response.status;
    
    // Handle common HTTP status codes
    if (status === 401) {
      return 'Authentication failed. Please check your credentials.';
    } else if (status === 403) {
      return 'You don\'t have permission to access this resource.';
    } else if (status === 404) {
      return 'The requested resource was not found.';
    } else if (status === 429) {
      return 'Too many requests. Please try again later.';
    } else if (status >= 500) {
      return 'Server error. Please try again later.';
    }
    
    // Try to get error message from response
    const data = error.response.data;
    if (data && data.message) {
      return data.message;
    } else if (data && data.error) {
      return data.error;
    }
  }
  
  // If it's a network error
  if (error.message && error.message.includes('Network Error')) {
    return 'Network error. Please check your internet connection.';
  }
  
  // Return the error message or a generic one
  return error.message || 'An unexpected error occurred';
};

/**
 * Log error to console and potentially to an error tracking service
 * @param {Error} error - The error object
 * @param {string} context - The context where the error occurred
 */
export const logError = (error, context = 'app') => {
  console.error(`Error in ${context}:`, error);
  
  // In a production app, you would send this to an error tracking service
  // Example: Sentry.captureException(error);
};

/**
 * Create a custom error with additional metadata
 * @param {string} message - Error message
 * @param {string} code - Error code
 * @param {Object} metadata - Additional error metadata
 * @returns {Error} - Custom error object
 */
export const createError = (message, code = 'UNKNOWN_ERROR', metadata = {}) => {
  const error = new Error(message);
  error.code = code;
  error.metadata = metadata;
  return error;
};

/**
 * Check if an error is a specific type
 * @param {Error} error - The error to check
 * @param {string} code - The error code to check for
 * @returns {boolean} - Whether the error matches the code
 */
export const isErrorType = (error, code) => {
  return error && error.code === code;
};

