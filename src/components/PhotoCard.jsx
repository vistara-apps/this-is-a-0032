import React, { useState } from 'react';
import { Download, Eye, Info, User, Heart } from 'lucide-react';
import { usePaymentContext } from '../hooks/usePaymentContext';

const PhotoCard = ({ 
  photo, 
  onDownload, 
  onPreview, 
  onLicenseInfo,
  variant = 'default',
  loading = false 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { getPhotoPrice } = usePaymentContext();

  if (loading) {
    return (
      <div className="card animate-pulse">
        <div className="aspect-square bg-muted rounded-lg mb-4"></div>
        <div className="h-4 bg-muted rounded mb-2"></div>
        <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
        <div className="flex gap-2">
          <div className="h-10 bg-muted rounded flex-1"></div>
          <div className="h-10 w-10 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  const price = getPhotoPrice(photo, 'regular');

  return (
    <div className={`card hover:shadow-lg transition-all duration-200 group ${variant === 'withOverlay' ? 'relative overflow-hidden' : ''}`}>
      {/* Image */}
      <div className="relative aspect-square rounded-lg overflow-hidden mb-4 bg-muted">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}
        
        {imageError ? (
          <div className="absolute inset-0 flex items-center justify-center text-muted">
            <div className="text-center">
              <div className="text-2xl mb-2">📷</div>
              <div className="text-sm">Image unavailable</div>
            </div>
          </div>
        ) : (
          <img
            src={photo.urls.small}
            alt={photo.alt_description || 'Animal photo'}
            className={`w-full h-full object-cover transition-opacity duration-200 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        )}
        
        {/* Overlay on hover */}
        {variant === 'withOverlay' && (
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex gap-2">
              <button
                onClick={onPreview}
                className="bg-white text-text p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
                title="Preview"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button
                onClick={onLicenseInfo}
                className="bg-white text-text p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
                title="License Info"
              >
                <Info className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Photo Info */}
      <div className="space-y-3">
        <div>
          <h3 className="font-medium text-text line-clamp-2 mb-1">
            {photo.alt_description || photo.description || 'Beautiful animal photo'}
          </h3>
          <div className="flex items-center text-sm text-muted">
            <User className="w-4 h-4 mr-1" />
            <span>by {photo.user.name}</span>
            {photo.likes && (
              <>
                <Heart className="w-4 h-4 ml-3 mr-1" />
                <span>{photo.likes.toLocaleString()}</span>
              </>
            )}
          </div>
        </div>

        {/* Price */}
        <div className="text-lg font-semibold text-primary">
          {price}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={onDownload}
            className="btn-primary flex-1 flex items-center justify-center gap-2 text-sm py-2"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
          
          <button
            onClick={onPreview}
            className="btn-secondary p-2"
            title="Preview on Website"
          >
            <Eye className="w-4 h-4" />
          </button>
          
          <button
            onClick={onLicenseInfo}
            className="btn-secondary p-2"
            title="License Information"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotoCard;
