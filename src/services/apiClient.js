import axios from 'axios';

// Create a base API client with common configuration
const createApiClient = (baseURL, headers = {}, timeout = 10000) => {
  return axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    timeout,
  });
};

// Create Unsplash API client
const unsplashClient = createApiClient(
  'https://api.unsplash.com',
  {
    Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY || 'demo-key'}`,
  }
);

// Create payment API client
const paymentClient = createApiClient(
  import.meta.env.VITE_PAYMENT_API_URL || 'https://payments.vistara.dev'
);

// Add response interceptor for error handling
[unsplashClient, paymentClient].forEach(client => {
  client.interceptors.response.use(
    response => response,
    error => {
      // Log errors but don't expose them to the user
      console.error('API Error:', error);
      
      // Customize error message based on status code
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const status = error.response.status;
        
        if (status === 401) {
          return Promise.reject(new Error('Authentication failed. Please check your API credentials.'));
        } else if (status === 403) {
          return Promise.reject(new Error('Access forbidden. You don\'t have permission to access this resource.'));
        } else if (status === 404) {
          return Promise.reject(new Error('Resource not found.'));
        } else if (status === 429) {
          return Promise.reject(new Error('Rate limit exceeded. Please try again later.'));
        } else if (status >= 500) {
          return Promise.reject(new Error('Server error. Please try again later.'));
        }
      } else if (error.request) {
        // The request was made but no response was received
        return Promise.reject(new Error('No response from server. Please check your internet connection.'));
      }
      
      // Something happened in setting up the request that triggered an Error
      return Promise.reject(new Error('An unexpected error occurred. Please try again.'));
    }
  );
});

export { unsplashClient, paymentClient };

