// Unsplash API service
const UNSPLASH_ACCESS_KEY = 'demo-key'; // In production, use environment variable
const UNSPLASH_BASE_URL = 'https://api.unsplash.com';

// Demo data for when API is not available
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

export const unsplashAPI = {
  async searchPhotos(query, page = 1, perPage = 12) {
    try {
      // For demo purposes, return filtered demo photos
      const filteredPhotos = DEMO_PHOTOS.filter(photo => 
        photo.alt_description.toLowerCase().includes(query.toLowerCase()) ||
        photo.description.toLowerCase().includes(query.toLowerCase()) ||
        query.toLowerCase().includes('animal') || 
        query.toLowerCase().includes('pet')
      );
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      return filteredPhotos.length > 0 ? filteredPhotos : DEMO_PHOTOS;
    } catch (error) {
      console.error('Error fetching photos:', error);
      // Return demo photos as fallback
      return DEMO_PHOTOS;
    }
  },

  async getPhoto(id) {
    try {
      // For demo, find photo in demo data
      const photo = DEMO_PHOTOS.find(p => p.id === id);
      return photo || DEMO_PHOTOS[0];
    } catch (error) {
      console.error('Error fetching photo:', error);
      return DEMO_PHOTOS[0];
    }
  }
};