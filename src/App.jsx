import React, { useState, useEffect } from 'react';
import { Search, Download, Eye, Info, X, ExternalLink, Camera } from 'lucide-react';
import AppHeader from './components/AppHeader';
import SearchInput from './components/SearchInput';
import PhotoCard from './components/PhotoCard';
import InfoModal from './components/InfoModal';
import PreviewModal from './components/PreviewModal';
import { unsplashAPI } from './services/unsplashAPI';
import { usePaymentContext } from './hooks/usePaymentContext';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [showLicenseModal, setShowLicenseModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const { createSession } = usePaymentContext();

  useEffect(() => {
    // Load featured animal photos on initial load
    handleSearch('animals', false);
  }, []);

  const handleSearch = async (query = searchTerm, updateSearched = true) => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError('');
    if (updateSearched) setHasSearched(true);
    
    try {
      const results = await unsplashAPI.searchPhotos(query + ' animals');
      setPhotos(results);
    } catch (err) {
      setError('Failed to fetch photos. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (photo) => {
    try {
      setLoading(true);
      await createSession();
      
      // Simulate download after payment
      const link = document.createElement('a');
      link.href = photo.urls.full;
      link.download = `animalsnap-${photo.id}.jpg`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      alert('Payment successful! Your download has started.');
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = (photo) => {
    setSelectedPhoto(photo);
    setShowPreviewModal(true);
  };

  const handleLicenseInfo = (photo) => {
    setSelectedPhoto(photo);
    setShowLicenseModal(true);
  };

  return (
    <div className="min-h-screen bg-bg">
      <AppHeader />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Camera className="w-12 h-12 text-primary mr-3" />
            <h1 className="text-4xl font-bold text-text">AnimalSnap Search</h1>
          </div>
          <p className="text-xl text-muted mb-8 max-w-2xl mx-auto">
            Find and use the perfect animal photos for your website, effortlessly. 
            High-quality, legally cleared images ready for download.
          </p>
          
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            onSearch={() => handleSearch()}
            loading={loading}
            placeholder="Search for specific animal photos... (e.g., 'golden retriever playing')"
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Results Section */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-flex items-center text-muted">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mr-3"></div>
              Searching for perfect animal photos...
            </div>
          </div>
        )}

        {!loading && photos.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-text mb-6">
              {hasSearched ? `Search Results for "${searchTerm}"` : 'Featured Animal Photos'}
              <span className="text-muted font-normal text-lg ml-2">({photos.length} photos)</span>
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {photos.map((photo) => (
                <PhotoCard
                  key={photo.id}
                  photo={photo}
                  onDownload={() => handleDownload(photo)}
                  onPreview={() => handlePreview(photo)}
                  onLicenseInfo={() => handleLicenseInfo(photo)}
                />
              ))}
            </div>
          </div>
        )}

        {!loading && hasSearched && photos.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted text-lg">
              No photos found for "{searchTerm}". Try different keywords or browse our featured collection above.
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="bg-surface rounded-lg shadow-card p-8 mt-12">
          <h3 className="text-2xl font-semibold text-text mb-4">Why Choose AnimalSnap Search?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-3">
                <Search className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-text mb-2">Precise Search</h4>
              <p className="text-muted">Find exactly what you need with our advanced animal photo search.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mx-auto mb-3">
                <Info className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-text mb-2">Legal Clarity</h4>
              <p className="text-muted">Every photo comes with clear licensing information for worry-free usage.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-3">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-text mb-2">Website Preview</h4>
              <p className="text-muted">See how photos will look on your website before you buy.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      {showLicenseModal && selectedPhoto && (
        <InfoModal
          photo={selectedPhoto}
          onClose={() => setShowLicenseModal(false)}
          type="licensingDetails"
        />
      )}

      {showPreviewModal && selectedPhoto && (
        <PreviewModal
          photo={selectedPhoto}
          onClose={() => setShowPreviewModal(false)}
          onDownload={() => {
            setShowPreviewModal(false);
            handleDownload(selectedPhoto);
          }}
        />
      )}
    </div>
  );
}

export default App;