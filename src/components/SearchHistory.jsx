import React from 'react';
import { Clock, X, Search, Trash2 } from 'lucide-react';

const SearchHistory = ({ 
  history, 
  onSelectQuery, 
  onClearHistory,
  className = ''
}) => {
  if (!history || history.length === 0) {
    return null;
  }

  // Format timestamp to relative time (e.g., "2 hours ago")
  const formatRelativeTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    
    if (diffDay > 0) {
      return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
    } else if (diffHour > 0) {
      return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
    } else if (diffMin > 0) {
      return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  };

  return (
    <div className={`bg-surface rounded-lg shadow-sm border border-muted ${className}`}>
      <div className="flex items-center justify-between p-3 border-b border-muted">
        <h3 className="font-medium text-text flex items-center gap-1">
          <Clock className="w-4 h-4 text-muted" />
          Recent Searches
        </h3>
        
        <button
          onClick={onClearHistory}
          className="text-muted hover:text-text p-1 rounded-md hover:bg-bg transition-colors"
          title="Clear history"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      
      <ul className="divide-y divide-muted">
        {history.map((item) => (
          <li key={item.id} className="p-3 hover:bg-bg transition-colors">
            <button
              onClick={() => onSelectQuery(item.query)}
              className="w-full text-left flex items-center gap-2"
            >
              <Search className="w-4 h-4 text-muted flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-text truncate">{item.query}</div>
                <div className="text-xs text-muted flex items-center gap-2">
                  <span>{formatRelativeTime(item.timestamp)}</span>
                  {item.resultCount > 0 && (
                    <span className="bg-bg px-1.5 py-0.5 rounded-full text-xs">
                      {item.resultCount} results
                    </span>
                  )}
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchHistory;

