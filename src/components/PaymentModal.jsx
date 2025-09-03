import React, { useState } from 'react';
import { X, CreditCard, Check, AlertCircle, Download, ExternalLink } from 'lucide-react';
import { usePaymentContext } from '../hooks/usePaymentContext';

const PaymentModal = ({ photo, onClose, onSuccess }) => {
  const [selectedSize, setSelectedSize] = useState('regular');
  const [paymentStatus, setPaymentStatus] = useState('idle'); // idle, processing, success, error
  const [error, setError] = useState('');
  const { createSession, getPhotoPrice, isProcessing } = usePaymentContext();

  // Get prices for different sizes
  const prices = {
    small: getPhotoPrice(photo, 'small'),
    regular: getPhotoPrice(photo, 'regular'),
    full: getPhotoPrice(photo, 'full')
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && paymentStatus !== 'processing') {
      onClose();
    }
  };

  const handlePayment = async () => {
    setPaymentStatus('processing');
    setError('');
    
    try {
      // Process payment
      const result = await createSession(photo, selectedSize);
      
      // Update status
      setPaymentStatus('success');
      
      // Call success callback
      if (onSuccess) {
        onSuccess(result);
      }
    } catch (err) {
      console.error('Payment error:', err);
      setPaymentStatus('error');
      setError(err.message || 'Payment failed. Please try again.');
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-surface rounded-lg shadow-lg max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-muted">
          <h2 className="text-xl font-semibold text-text flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" />
            {paymentStatus === 'success' ? 'Payment Successful' : 'Complete Purchase'}
          </h2>
          {paymentStatus !== 'processing' && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-bg rounded-lg transition-colors"
              disabled={paymentStatus === 'processing'}
            >
              <X className="w-5 h-5 text-muted" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {paymentStatus === 'idle' && (
            <>
              {/* Photo Preview */}
              <div className="flex gap-4 mb-6">
                <img
                  src={photo.urls.small}
                  alt={photo.alt_description || 'Animal photo'}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-medium text-text mb-1">
                    {photo.alt_description || 'Animal Photo'}
                  </h3>
                  <p className="text-sm text-muted">by {photo.user.name}</p>
                  <p className="text-sm text-muted">
                    {photo.width} × {photo.height} pixels
                  </p>
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-6">
                <h4 className="font-medium text-text mb-3">Select Size:</h4>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    className={`p-3 rounded-lg border text-center ${
                      selectedSize === 'small' 
                        ? 'border-primary bg-primary/10 text-primary' 
                        : 'border-muted text-text hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedSize('small')}
                  >
                    <div className="font-medium">Small</div>
                    <div className="text-sm text-muted">640px</div>
                    <div className="font-semibold mt-1">{prices.small}</div>
                  </button>
                  
                  <button
                    className={`p-3 rounded-lg border text-center ${
                      selectedSize === 'regular' 
                        ? 'border-primary bg-primary/10 text-primary' 
                        : 'border-muted text-text hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedSize('regular')}
                  >
                    <div className="font-medium">Regular</div>
                    <div className="text-sm text-muted">1080px</div>
                    <div className="font-semibold mt-1">{prices.regular}</div>
                  </button>
                  
                  <button
                    className={`p-3 rounded-lg border text-center ${
                      selectedSize === 'full' 
                        ? 'border-primary bg-primary/10 text-primary' 
                        : 'border-muted text-text hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedSize('full')}
                  >
                    <div className="font-medium">Full</div>
                    <div className="text-sm text-muted">Original</div>
                    <div className="font-semibold mt-1">{prices.full}</div>
                  </button>
                </div>
              </div>

              {/* Payment Summary */}
              <div className="bg-bg rounded-lg p-4 mb-6">
                <h4 className="font-medium text-text mb-2">Payment Summary</h4>
                <div className="flex justify-between mb-2">
                  <span className="text-muted">Photo ({selectedSize})</span>
                  <span className="font-medium">{prices[selectedSize]}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-muted">Processing Fee</span>
                  <span className="font-medium">$0.00</span>
                </div>
                <div className="border-t border-muted my-2 pt-2 flex justify-between">
                  <span className="font-medium">Total</span>
                  <span className="font-semibold text-primary">{prices[selectedSize]}</span>
                </div>
              </div>

              {/* Payment Button */}
              <button
                onClick={handlePayment}
                className="btn-primary w-full flex items-center justify-center gap-2"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    Pay {prices[selectedSize]}
                  </>
                )}
              </button>
            </>
          )}

          {paymentStatus === 'processing' && (
            <div className="py-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <h3 className="text-lg font-medium text-text mb-2">Processing Payment</h3>
              <p className="text-muted">Please wait while we process your payment...</p>
            </div>
          )}

          {paymentStatus === 'success' && (
            <div className="py-6 text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-lg font-medium text-text mb-2">Payment Successful!</h3>
              <p className="text-muted mb-6">Your download is ready.</p>
              
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    // Trigger download
                    const link = document.createElement('a');
                    link.href = photo.urls[selectedSize];
                    link.download = `animalsnap-${photo.id}.jpg`;
                    link.target = '_blank';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="btn-primary flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download Photo
                </button>
                
                <a
                  href={photo.links.html}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  View on Unsplash
                </a>
              </div>
            </div>
          )}

          {paymentStatus === 'error' && (
            <div className="py-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-lg font-medium text-text mb-2">Payment Failed</h3>
              <p className="text-red-500 mb-6">{error}</p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setPaymentStatus('idle')}
                  className="btn-primary flex-1 flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  Try Again
                </button>
                
                <button
                  onClick={onClose}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;

