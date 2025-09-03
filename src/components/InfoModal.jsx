import React from 'react';
import { X, ExternalLink, Check, Shield } from 'lucide-react';

const InfoModal = ({ photo, onClose, type = 'licensingDetails' }) => {
  if (!photo) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-surface rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-muted">
          <h2 className="text-xl font-semibold text-text flex items-center gap-2">
            <Shield className="w-5 h-5 text-accent" />
            License Information
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-bg rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-muted" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Photo Preview */}
          <div className="flex gap-4">
            <img
              src={photo.urls.small}
              alt={photo.alt_description}
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

          {/* License Details */}
          <div className="space-y-4">
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
              <h4 className="font-semibold text-text mb-2 flex items-center gap-2">
                <Check className="w-5 h-5 text-accent" />
                Unsplash License
              </h4>
              <p className="text-sm text-muted mb-3">
                This photo is provided under the Unsplash License, which grants you extensive usage rights.
              </p>
            </div>

            {/* What you CAN do */}
            <div>
              <h4 className="font-semibold text-text mb-3">✅ What you CAN do:</h4>
              <ul className="space-y-2 text-sm text-muted">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  Use for commercial and non-commercial purposes
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  Use on websites, apps, and digital products
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  Edit, crop, and modify the image
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  Use in print materials and marketing
                </li>
              </ul>
            </div>

            {/* What you CANNOT do */}
            <div>
              <h4 className="font-semibold text-text mb-3">❌ What you CANNOT do:</h4>
              <ul className="space-y-2 text-sm text-muted">
                <li>• Sell the unmodified photo as a standalone product</li>
                <li>• Claim ownership or authorship of the original photo</li>
                <li>• Use the photo in ways that could be harmful or offensive</li>
                <li>• Redistribute on other stock photo platforms</li>
              </ul>
            </div>

            {/* Attribution */}
            <div className="bg-bg rounded-lg p-4">
              <h4 className="font-semibold text-text mb-2">Attribution (Optional but Appreciated)</h4>
              <p className="text-sm text-muted mb-2">
                While not required, crediting the photographer is appreciated:
              </p>
              <div className="bg-surface border rounded p-3 text-sm font-mono">
                Photo by {photo.user.name} on Unsplash
              </div>
            </div>

            {/* Links */}
            <div className="flex gap-3">
              <a
                href={photo.links.html}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center gap-2 text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                View on Unsplash
              </a>
              <a
                href="https://unsplash.com/license"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center gap-2 text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                Full License Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;