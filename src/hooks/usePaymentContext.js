import { useWalletClient } from "wagmi";
import { useCallback, useState } from "react";
import { paymentService } from "../services/paymentService";

/**
 * Payment context hook
 * Provides payment functionality for the application
 */
export function usePaymentContext() {
  const { data: walletClient, isError, isLoading } = useWalletClient();
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  /**
   * Create a payment session for a photo
   * @param {Object} photo - The photo object to purchase
   * @param {string} size - The size of the photo (small, regular, full)
   * @returns {Promise<Object>} - Payment session details
   */
  const createSession = useCallback(async (photo, size = 'regular') => {
    if (!walletClient || !walletClient.account) throw new Error("Please connect your wallet");
    if (isError) throw new Error("Wallet not connected");
    if (isLoading) throw new Error("Wallet is loading");
    
    setIsProcessing(true);
    
    try {
      // Create payment session
      const result = await paymentService.createPaymentSession(walletClient, photo, size);
      
      // Add to payment history
      setPaymentHistory(prev => [result, ...prev]);
      
      return result;
    } catch (error) {
      console.error('Payment error:', error);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  }, [walletClient, isError, isLoading]);

  /**
   * Get price for a photo
   * @param {Object} photo - The photo object
   * @param {string} size - The size of the photo (small, regular, full)
   * @returns {string} - The price in USD format
   */
  const getPhotoPrice = useCallback((photo, size = 'regular') => {
    return paymentService.calculatePrice(photo, size);
  }, []);

  /**
   * Get bulk discount information
   * @param {number} quantity - Number of photos to purchase
   * @returns {Object} - Discount information
   */
  const getBulkDiscount = useCallback((quantity) => {
    return paymentService.getBulkDiscount(quantity);
  }, []);

  return { 
    createSession,
    getPhotoPrice,
    getBulkDiscount,
    paymentHistory,
    isProcessing
  };
}
