import React, { useState, useEffect } from 'react';
import { Search, Download, Eye, Info, X, ExternalLink, Camera, Filter } from 'lucide-react';
import AppHeader from './components/AppHeader';
import SearchInput from './components/SearchInput';
import PhotoCard from './components/PhotoCard';
import InfoModal from './components/InfoModal';
import PreviewModal from './components/PreviewModal';
import PaymentModal from './components/PaymentModal';
import SearchHistory from './components/SearchHistory';
import SearchFilters from './components/SearchFilters';
import { unsplashAPI } from './services/unsplashAPI';
import { usePaymentContext } from './hooks/usePaymentContext';
import { useSearchHistory } from './hooks/useSearchHistory';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [showLicenseModal, setShowLicenseModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [showSearchHistory, setShowSearchHistory] = useState(false);
  const [filters, setFilters] = useState({
    orientation: '',
    color: '',
    animalType: '',
    sort: 'relevant'
  });

  const { getPhotoPrice } = usePaymentContext();
  const { 
    searchHistory, 
    trackSearch, 
    clearHistory, 
    getSuggestions, 
    suggestions 
  } = useSearchHistory();

  useEffect(() => {
    // Load featured animal photos on initial load
    handleSearch('animals', false);
  }, []);

  const handleSearch = async (query = searchTerm, updateSearched = true) => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError('');
    if (updateSearched) setHasSearched(true);
    setShowSearchHistory(false);
    
    try {
      // Build search parameters from filters
      const searchParams = {};
      
      if (filters.orientation) {
        searchParams.orientation = filters.orientation;
      }
      
      if (filters.color) {
        searchParams.color = filters.color;
      }
      
      // Add animal type to query if selected
      let searchQuery = query;
      if (filters.animalType) {
        searchQuery = `${query} ${filters.animalType}`;
      }
      
      // Add sort parameter
      if (filters.sort && filters.sort !== 'relevant') {
        searchParams.order_by = filters.sort === 'latest' ? 'latest' : 'popular';
      }
      
      // Execute search
      const response = await unsplashAPI.searchPhotos(searchQuery, 1, 12, searchParams);
      const results = response.results || [];
      
      // Update state
      setPhotos(results);
      
      // Track search query
      if (updateSearched && results.length > 0) {
        trackSearch(query, results);
      }
    } catch (err) {
      setError('Failed to fetch photos. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (photo) => {
    setSelectedPhoto(photo);
    setShowPaymentModal(true);
  };
  
  const handlePaymentSuccess = (result) => {
    console.log('Payment successful:', result);
    // Payment modal will handle the download
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
          
          <div className="relative">
            <SearchInput
              value={searchTerm}
              onChange={(value) => {
                setSearchTerm(value);
                getSuggestions(value);
                setShowSearchHistory(value.length > 0);
              }}
              onSearch={() => handleSearch()}
              loading={loading}
              placeholder="Search for specific animal photos... (e.g., 'golden retriever playing')"
            />
            
            {/* Search History Dropdown */}
            {showSearchHistory && (searchHistory.length > 0 || suggestions.length > 0) && (
              <div className="absolute z-10 mt-2 w-full">
                {suggestions.length > 0 && (
                  <div className="bg-surface rounded-lg shadow-lg border border-muted mb-2 overflow-hidden">
                    <div className="p-2 border-b border-muted">
                      <span className="text-sm text-muted">Suggestions</span>
                    </div>
                    <ul>
                      {suggestions.map((suggestion, index) => (
                        <li key={`suggestion-${index}`}>
                          <button
                            className="w-full text-left p-3 hover:bg-bg flex items-center gap-2"
                            onClick={() => {
                              setSearchTerm(suggestion);
                              setShowSearchHistory(false);
                              handleSearch(suggestion);
                            }}
                          >
                            <Search className="w-4 h-4 text-muted" />
                            <span>{suggestion}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {searchHistory.length > 0 && (
                  <SearchHistory
                    history={searchHistory.slice(0, 5)}
                    onSelectQuery={(query) => {
                      setSearchTerm(query);
                      setShowSearchHistory(false);
                      handleSearch(query);
                    }}
                    onClearHistory={clearHistory}
                  />
                )}
              </div>
            )}
          </div>
          
          {/* Search Filters */}
          <div className="mt-4">
            <SearchFilters
              filters={filters}
              onFilterChange={(newFilters) => {
                setFilters(newFilters);
                if (searchTerm) {
                  handleSearch(searchTerm);
                }
              }}
            />
          </div>
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
      
      {showPaymentModal && selectedPhoto && (
        <PaymentModal
          photo={selectedPhoto}
          onClose={() => setShowPaymentModal(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
}

export default App;
