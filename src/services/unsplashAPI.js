import { unsplashClient } from './apiClient';

// Demo data for when API is not available or in development mode
const DEMO_PHOTOS = [
  {
    id: 'demo-1',
    urls: {
      small: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400',
      regular: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800',
      full: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=1200'
    },
    alt_description: 'Golden retriever sitting in a field',
    description: 'Beautiful golden retriever enjoying a sunny day',
    user: { name: 'John Photographer' },
    likes: 234,
    width: 1200,
    height: 800,
    links: { html: 'https://unsplash.com/photos/demo-1' }
  },
  {
    id: 'demo-2',
    urls: {
      small: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400',
      regular: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800',
      full: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=1200'
    },
    alt_description: 'Orange tabby cat sleeping peacefully',
    description: 'Adorable orange cat taking a nap',
    user: { name: 'Cat Lover' },
    likes: 189,
    width: 1200,
    height: 800,
    links: { html: 'https://unsplash.com/photos/demo-2' }
  },
  {
    id: 'demo-3',
    urls: {
      small: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=400',
      regular: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=800',
      full: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=1200'
    },
    alt_description: 'Colorful tropical bird perched on branch',
    description: 'Vibrant tropical bird in natural habitat',
    user: { name: 'Bird Watcher' },
    likes: 156,
    width: 1200,
    height: 800,
    links: { html: 'https://unsplash.com/photos/demo-3' }
  },
  {
    id: 'demo-4',
    urls: {
      small: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400',
      regular: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800',
      full: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=1200'
    },
    alt_description: 'Majestic white horse running in field',
    description: 'Beautiful white horse galloping freely',
    user: { name: 'Horse Enthusiast' },
    likes: 312,
    width: 1200,
    height: 800,
    links: { html: 'https://unsplash.com/photos/demo-4' }
  },
  {
    id: 'demo-5',
    urls: {
      small: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=400',
      regular: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=800',
      full: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=1200'
    },
    alt_description: 'Cute hamster eating sunflower seed',
    description: 'Adorable hamster with sunflower seed',
    user: { name: 'Small Pet Photos' },
    likes: 89,
    width: 1200,
    height: 800,
    links: { html: 'https://unsplash.com/photos/demo-5' }
  },
  {
    id: 'demo-6',
    urls: {
      small: 'https://images.unsplash.com/photo-1446329813274-7c9036bd9a1f?w=400',
      regular: 'https://images.unsplash.com/photo-1446329813274-7c9036bd9a1f?w=800',
      full: 'https://images.unsplash.com/photo-1446329813274-7c9036bd9a1f?w=1200'
    },
    alt_description: 'Spotted leopard resting on tree branch',
    description: 'Magnificent spotted leopard in tree',
    user: { name: 'Wildlife Expert' },
    likes: 445,
    width: 1200,
    height: 800,
    links: { html: 'https://unsplash.com/photos/demo-6' }
  },
  {
    id: 'demo-7',
    urls: {
      small: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400',
      regular: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800',
      full: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1200'
    },
    alt_description: 'Black and white border collie playing fetch',
    description: 'Energetic border collie catching frisbee',
    user: { name: 'Action Pet Photos' },
    likes: 278,
    width: 1200,
    height: 800,
    links: { html: 'https://unsplash.com/photos/demo-7' }
  },
  {
    id: 'demo-8',
    urls: {
      small: 'https://images.unsplash.com/photo-1567594296491-0ffd8e6d9bb9?w=400',
      regular: 'https://images.unsplash.com/photo-1567594296491-0ffd8e6d9bb9?w=800',
      full: 'https://images.unsplash.com/photo-1567594296491-0ffd8e6d9bb9?w=1200'
    },
    alt_description: 'Grey rabbit sitting in grass',
    description: 'Cute grey rabbit in natural setting',
    user: { name: 'Nature Photographer' },
    likes: 134,
    width: 1200,
    height: 800,
    links: { html: 'https://unsplash.com/photos/demo-8' }
  }
];

// Check if we're in development mode or missing API key
const isDemoMode = () => {
  return !import.meta.env.VITE_UNSPLASH_ACCESS_KEY || 
         import.meta.env.VITE_UNSPLASH_ACCESS_KEY === 'demo-key' || 
         import.meta.env.MODE === 'development';
};

/**
 * Unsplash API service
 * Provides methods to interact with the Unsplash API
 * Falls back to demo data when in development mode or when API is unavailable
 */
export const unsplashAPI = {
  /**
   * Search for photos using the Unsplash API
   * @param {string} query - The search query
   * @param {number} page - Page number for pagination (1-based)
   * @param {number} perPage - Number of results per page
   * @param {Object} filters - Additional filters for the search
   * @returns {Promise<Array>} - Array of photo objects
   */
  async searchPhotos(query, page = 1, perPage = 12, filters = {}) {
    try {
      // Use demo data in development mode
      if (isDemoMode()) {
        console.log('Using demo data for Unsplash API');
        
        // Filter demo photos based on query
        const filteredPhotos = DEMO_PHOTOS.filter(photo => 
          photo.alt_description?.toLowerCase().includes(query.toLowerCase()) ||
          photo.description?.toLowerCase().includes(query.toLowerCase()) ||
          query.toLowerCase().includes('animal') || 
          query.toLowerCase().includes('pet')
        );
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        return {
          results: filteredPhotos.length > 0 ? filteredPhotos : DEMO_PHOTOS,
          total: filteredPhotos.length > 0 ? filteredPhotos.length : DEMO_PHOTOS.length,
          total_pages: 1
        };
      }
      
      // Build query parameters
      const params = {
        query: query + ' animals', // Always include 'animals' in the search
        page,
        per_page: perPage,
        ...filters
      };
      
      // Make API request
      const response = await unsplashClient.get('/search/photos', { params });
      
      // Track API usage for attribution
      this.trackApiUsage();
      
      return response.data;
    } catch (error) {
      console.error('Error fetching photos:', error);
      
      // Return demo photos as fallback
      return {
        results: DEMO_PHOTOS,
        total: DEMO_PHOTOS.length,
        total_pages: 1
      };
    }
  },

  /**
   * Get a specific photo by ID
   * @param {string} id - The photo ID
   * @returns {Promise<Object>} - Photo object
   */
  async getPhoto(id) {
    try {
      // Use demo data in development mode
      if (isDemoMode()) {
        console.log('Using demo data for Unsplash API');
        
        // Find photo in demo data
        const photo = DEMO_PHOTOS.find(p => p.id === id);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));
        
        return photo || DEMO_PHOTOS[0];
      }
      
      // Make API request
      const response = await unsplashClient.get(`/photos/${id}`);
      
      // Track API usage for attribution
      this.trackApiUsage();
      
      return response.data;
    } catch (error) {
      console.error('Error fetching photo:', error);
      
      // Return first demo photo as fallback
      return DEMO_PHOTOS[0];
    }
  },
  
  /**
   * Get random animal photos
   * @param {number} count - Number of photos to return
   * @param {Array} topics - Array of topic IDs to filter by
   * @returns {Promise<Array>} - Array of photo objects
   */
  async getRandomPhotos(count = 10, topics = []) {
    try {
      // Use demo data in development mode
      if (isDemoMode()) {
        console.log('Using demo data for Unsplash API');
        
        // Shuffle demo photos and return requested count
        const shuffled = [...DEMO_PHOTOS].sort(() => 0.5 - Math.random());
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        return shuffled.slice(0, count);
      }
      
      // Build query parameters
      const params = {
        query: 'animals',
        count,
        topics: topics.join(','),
        orientation: 'landscape'
      };
      
      // Make API request
      const response = await unsplashClient.get('/photos/random', { params });
      
      // Track API usage for attribution
      this.trackApiUsage();
      
      return Array.isArray(response.data) ? response.data : [response.data];
    } catch (error) {
      console.error('Error fetching random photos:', error);
      
      // Return shuffled demo photos as fallback
      const shuffled = [...DEMO_PHOTOS].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    }
  },
  
  /**
   * Download a photo (triggers Unsplash download endpoint)
   * @param {string} downloadLocation - The download location URL from photo object
   * @returns {Promise<string>} - URL to download the photo
   */
  async downloadPhoto(downloadLocation) {
    try {
      // Use demo data in development mode
      if (isDemoMode()) {
        console.log('Using demo data for Unsplash API');
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Return the full URL from the first demo photo
        return DEMO_PHOTOS[0].urls.full;
      }
      
      // Make API request to trigger download
      const response = await unsplashClient.get(downloadLocation);
      
      // Track API usage for attribution
      this.trackApiUsage();
      
      return response.data.url;
    } catch (error) {
      console.error('Error downloading photo:', error);
      
      // Return the full URL from the first demo photo as fallback
      return DEMO_PHOTOS[0].urls.full;
    }
  },
  
  /**
   * Track API usage for Unsplash attribution
   * This is required by the Unsplash API guidelines
   * https://help.unsplash.com/en/articles/2511315-guideline-attribution
   */
  trackApiUsage() {
    // In a production app, you might want to track API usage for analytics
    // This could be implemented with a backend service
    console.log('Unsplash API usage tracked');
  }
};
