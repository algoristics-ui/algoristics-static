import { useState, useEffect } from 'react';

interface UserCacheData {
  preferences: {
    theme?: 'light' | 'dark' | 'system';
    language?: string;
    timezone?: string;
  };
  selections: {
    selectedCourses?: string[];
    selectedOrganization?: string;
    dashboardLayout?: string;
    recentItems?: string[];
  };
  sessionData: {
    lastVisitedPage?: string;
    searchHistory?: string[];
    filterSettings?: Record<string, any>;
  };
}

const CACHE_KEY = 'algoristic_user_cache';
const CACHE_EXPIRY_HOURS = 24;

export const useUserCache = () => {
  const [cache, setCache] = useState<UserCacheData>({
    preferences: {},
    selections: {},
    sessionData: {}
  });

  // Load cache from localStorage on initialization
  useEffect(() => {
    const loadCache = () => {
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          const isExpired = Date.now() - timestamp > CACHE_EXPIRY_HOURS * 60 * 60 * 1000;
          
          if (!isExpired) {
            setCache(data);
          } else {
            localStorage.removeItem(CACHE_KEY);
          }
        }
      } catch (error) {
        console.error('Error loading user cache:', error);
        localStorage.removeItem(CACHE_KEY);
      }
    };

    loadCache();
  }, []);

  // Save cache to localStorage whenever it changes
  useEffect(() => {
    const saveCache = () => {
      try {
        const cacheData = {
          data: cache,
          timestamp: Date.now()
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
      } catch (error) {
        console.error('Error saving user cache:', error);
      }
    };

    // Only save if cache has meaningful data
    if (Object.keys(cache.preferences).length > 0 || 
        Object.keys(cache.selections).length > 0 || 
        Object.keys(cache.sessionData).length > 0) {
      saveCache();
    }
  }, [cache]);

  // Update preferences
  const updatePreferences = (newPreferences: Partial<UserCacheData['preferences']>) => {
    setCache(prev => ({
      ...prev,
      preferences: { ...prev.preferences, ...newPreferences }
    }));
  };

  // Update selections
  const updateSelections = (newSelections: Partial<UserCacheData['selections']>) => {
    setCache(prev => ({
      ...prev,
      selections: { ...prev.selections, ...newSelections }
    }));
  };

  // Update session data
  const updateSessionData = (newSessionData: Partial<UserCacheData['sessionData']>) => {
    setCache(prev => ({
      ...prev,
      sessionData: { ...prev.sessionData, ...newSessionData }
    }));
  };

  // Add recent item to history
  const addRecentItem = (itemId: string, maxItems = 10) => {
    setCache(prev => {
      const recentItems = prev.selections.recentItems || [];
      const filteredItems = recentItems.filter(id => id !== itemId);
      const newRecentItems = [itemId, ...filteredItems].slice(0, maxItems);
      
      return {
        ...prev,
        selections: {
          ...prev.selections,
          recentItems: newRecentItems
        }
      };
    });
  };

  // Add search to history
  const addSearchToHistory = (searchTerm: string, maxItems = 20) => {
    if (!searchTerm.trim()) return;
    
    setCache(prev => {
      const searchHistory = prev.sessionData.searchHistory || [];
      const filteredHistory = searchHistory.filter(term => term !== searchTerm);
      const newSearchHistory = [searchTerm, ...filteredHistory].slice(0, maxItems);
      
      return {
        ...prev,
        sessionData: {
          ...prev.sessionData,
          searchHistory: newSearchHistory
        }
      };
    });
  };

  // Clear cache
  const clearCache = () => {
    localStorage.removeItem(CACHE_KEY);
    setCache({
      preferences: {},
      selections: {},
      sessionData: {}
    });
  };

  return {
    cache,
    updatePreferences,
    updateSelections,
    updateSessionData,
    addRecentItem,
    addSearchToHistory,
    clearCache
  };
};

export default useUserCache;