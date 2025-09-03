import React, { useState } from 'react';
import { X, Download, Monitor, Smartphone, Tablet } from 'lucide-react';

const PreviewModal = ({ photo, onClose, onDownload }) => {
  const [deviceView, setDeviceView] = useState('desktop');

  if (!photo) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getDeviceClasses = () => {
    switch (deviceView) {
      case 'mobile':
        return 'max-w-sm mx-auto';
      case 'tablet':
        return 'max-w-2xl mx-auto';
      default:
        return 'max-w-5xl mx-auto';
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-surface rounded-lg shadow-lg w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-muted">
          <div>
            <h2 className="text-lg font-semibold text-text">Website Preview</h2>
            <p className="text-sm text-muted">See how this photo looks on a website</p>
          </div>
          
          {/* Device Toggle */}
          <div className="flex items-center gap-2">
            <div className="flex bg-bg rounded-lg p-1">
              <button
                onClick={() => setDeviceView('mobile')}
                className={`p-2 rounded ${deviceView === 'mobile' ? 'bg-primary text-white' : 'text-muted hover:text-text'}`}
                title="Mobile View"
              >
                <Smartphone className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDeviceView('tablet')}
                className={`p-2 rounded ${deviceView === 'tablet' ? 'bg-primary text-white' : 'text-muted hover:text-text'}`}
                title="Tablet View"
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDeviceView('desktop')}
                className={`p-2 rounded ${deviceView === 'desktop' ? 'bg-primary text-white' : 'text-muted hover:text-text'}`}
                title="Desktop View"
              >
                <Monitor className="w-4 h-4" />
              </button>
            </div>
            
            <button
              onClick={onClose}
              className="p-2 hover:bg-bg rounded-lg transition-colors ml-2"
            >
              <X className="w-5 h-5 text-muted" />
            </button>
          </div>
        </div>

        {/* Preview Content */}
        <div className="p-6 bg-bg overflow-y-auto" style={{ maxHeight: 'calc(90vh - 120px)' }}>
          <div className={`transition-all duration-300 ${getDeviceClasses()}`}>
            {/* Mock Website */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Mock Header */}
              <div className="bg-gray-900 text-white p-4">
                <div className="flex items-center justify-between">
                  <h1 className="text-xl font-bold">Your Website</h1>
                  <nav className="hidden md:flex space-x-4 text-sm">
                    <a href="#" className="hover:text-gray-300">Home</a>
                    <a href="#" className="hover:text-gray-300">About</a>
                    <a href="#" className="hover:text-gray-300">Contact</a>
                  </nav>
                </div>
              </div>

              {/* Main Content with Photo */}
              <div className="p-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Welcome to Our Pet-Friendly Business
                  </h2>
                  <p className="text-gray-600">
                    We love animals and want to share that passion with you.
                  </p>
                </div>

                {/* Photo Integration Example */}
                <div className="mb-6">
                  <img
                    src={photo.urls.regular}
                    alt={photo.alt_description}
                    className="w-full h-64 object-cover rounded-lg shadow-sm"
                  />
                  <p className="text-sm text-gray-500 mt-2 text-center">
                    Photo by {photo.user.name} - Perfect for your content
                  </p>
                </div>

                <div className="prose max-w-none">
                  <p className="text-gray-700 mb-4">
                    This is how your selected animal photo would look integrated into your website content. 
                    The image fits naturally with your design and enhances your message.
                  </p>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Image Details:</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Resolution: {photo.width} × {photo.height}</li>
                      <li>• Format: JPEG, optimized for web</li>
                      <li>• License: Commercial use allowed</li>
                      <li>• Perfect for: Hero sections, blog posts, galleries</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Mock Footer */}
              <div className="bg-gray-100 p-4 text-center text-sm text-gray-600">
                © 2024 Your Website. All rights reserved.
              </div>
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="flex items-center justify-between p-4 border-t border-muted bg-surface">
          <div className="text-sm text-muted">
            Preview how this photo looks on different devices using the buttons above.
          </div>
          <button
            onClick={onDownload}
            className="btn-primary flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download for $1.50
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;