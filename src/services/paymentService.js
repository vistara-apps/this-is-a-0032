import { paymentClient } from './apiClient';
import { withPaymentInterceptor, decodeXPaymentResponse } from "x402-axios";

/**
 * Payment Service
 * Handles all payment-related functionality
 */
export const paymentService = {
  /**
   * Create a payment session for a photo
   * @param {Object} walletClient - The wallet client from wagmi
   * @param {Object} photo - The photo object to purchase
   * @param {string} size - The size of the photo (small, regular, full)
   * @returns {Promise<Object>} - Payment session details
   */
  async createPaymentSession(walletClient, photo, size = 'regular') {
    if (!walletClient || !walletClient.account) {
      throw new Error("Please connect your wallet to make a purchase");
    }
    
    // Calculate price based on photo size
    const price = this.calculatePrice(photo, size);
    
    try {
      // Create API client with payment interceptor
      const apiClient = withPaymentInterceptor(paymentClient, walletClient);
      
      // Create payment session
      const response = await apiClient.post("/api/payment", { 
        amount: price,
        metadata: {
          photoId: photo.id,
          photoSize: size,
          photographer: photo.user?.name || 'Unknown',
          description: photo.description || photo.alt_description || 'Animal photo'
        }
      });
      
      // Get payment response header
      const paymentResponse = response.config.headers["X-PAYMENT"];
      
      if (!paymentResponse) {
        throw new Error("Payment response is missing");
      }
      
      // Decode payment response
      const decoded = decodeXPaymentResponse(paymentResponse);
      console.log(`Payment response: ${JSON.stringify(decoded)}`);
      
      return {
        success: true,
        transactionId: decoded.transactionId || 'demo-transaction',
        amount: price,
        photo,
        size
      };
    } catch (error) {
      console.error('Payment error:', error);
      throw new Error(error.message || 'Payment failed. Please try again.');
    }
  },
  
  /**
   * Calculate the price for a photo based on size and quality
   * @param {Object} photo - The photo object
   * @param {string} size - The size of the photo (small, regular, full)
   * @returns {string} - The price in USD format
   */
  calculatePrice(photo, size = 'regular') {
    // Base prices for different sizes
    const basePrices = {
      small: 0.50,
      regular: 1.50,
      full: 2.00
    };
    
    // Get base price for selected size
    let price = basePrices[size] || basePrices.regular;
    
    // Adjust price based on photo popularity (likes)
    if (photo.likes) {
      if (photo.likes > 500) {
        price += 0.50; // Premium for very popular photos
      } else if (photo.likes > 200) {
        price += 0.25; // Small premium for popular photos
      }
    }
    
    // Format price as USD
    return `$${price.toFixed(2)}`;
  },
  
  /**
   * Get bulk discount information
   * @param {number} quantity - Number of photos to purchase
   * @returns {Object} - Discount information
   */
  getBulkDiscount(quantity) {
    if (quantity >= 20) {
      return { percentage: 25, description: '25% off for 20+ photos' };
    } else if (quantity >= 10) {
      return { percentage: 15, description: '15% off for 10+ photos' };
    } else if (quantity >= 5) {
      return { percentage: 10, description: '10% off for 5+ photos' };
    }
    
    return { percentage: 0, description: 'No discount applied' };
  },
  
  /**
   * Apply bulk discount to total price
   * @param {number} totalPrice - Total price before discount
   * @param {number} quantity - Number of photos
   * @returns {number} - Discounted price
   */
  applyBulkDiscount(totalPrice, quantity) {
    const { percentage } = this.getBulkDiscount(quantity);
    
    if (percentage === 0) {
      return totalPrice;
    }
    
    return totalPrice * (1 - percentage / 100);
  }
};

