import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext.jsx';
import soundService from '../services/SoundService';

const PreferencesContext = createContext(null);

// Helper function to format image URLs consistently across the application
const formatImageUrl = (url) => {
  if (!url) return null;
  
  // Get API URL from environment or use localhost as fallback
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
  
  // If the URL already starts with http, use it as is
  if (url.startsWith('http')) {
    return url;
  } 
  // If the URL is a relative path starting with /files/, use it as is with API_URL
  else if (url.startsWith('/files/')) {
    return `${API_URL}${url}`;
  }
  // If the URL contains /uploads/, replace it with /files/
  else if (url.includes('/uploads/')) {
    // Extract the type and filename from the path
    const parts = url.split('/');
    const filename = parts.pop();
    const type = parts[parts.length - 1]; // images, audio, etc.
    return `${API_URL}/files/${type}/${filename}`;
  }
  // Otherwise, just append the URL to the API_URL
  else {
    return `${API_URL}${url}`;
  }
};

// Helper function to format preferences data with proper image URLs
const formatPreferencesData = (data) => {
  if (!data) return {};
  
  return {
    ...data,
    profileImg: formatImageUrl(data.profileImg)
  };
};

export const PreferencesProvider = ({ children }) => {
  const [preferences, setPreferences] = useState({
    profileImg: null,
    autoAnte: false,
    muted: false,
    selectedTitle: null
  });
  const [loading, setLoading] = useState(true);
  const { user, token } = useAuth();

  // Define loadPreferences function with useCallback to handle dependencies properly
  const loadPreferences = React.useCallback(async () => {
    if (!user) {
      setPreferences({ autoAnte: false });
      setLoading(false);
      return;
    }


    try {
      setLoading(true);
      // Get API URL from environment or use localhost as fallback
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

      if (!token) {
        console.error('[Preferences] No token available');
        setLoading(false);
        return;
      }
      
      const response = await fetch(`${API_URL}/preferences`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to load preferences');
      }
      
      const data = await response.json();
      
      // Format preferences data with proper image URLs
      const formattedData = formatPreferencesData(data);
      
      const finalPreferences = formattedData || { autoAnte: false, muted: false };
      setPreferences(finalPreferences);
      
      // Sync sound service with loaded preferences
      if (typeof finalPreferences.muted !== 'undefined') {
        soundService.setMuted(finalPreferences.muted);
      }
    } catch (error) {
      console.error('[Preferences] Error loading preferences:', error);
      // Set default preferences on error
      setPreferences({ autoAnte: false });
    } finally {
      setLoading(false);
    }
  }, [user, token]);
  
  // Load preferences from the server when the user changes or component mounts
  useEffect(() => {
    if (user) {
      loadPreferences();
    }
  }, [user, loadPreferences]);
  
  // Update a preference
  const updatePreference = async (key, value) => {
    if (!user) {
      console.error('[Preferences] Cannot update preferences: User not logged in');
      return false;
    }

    try {
      // Get API URL from environment or use localhost as fallback
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

      if (!token) {
        console.error('[Preferences] No token available');
        return false;
      }
      
      // Optimistically update the UI
      setPreferences(prev => ({
        ...prev,
        [key]: value
      }));
      
      // If updating the muted preference, sync with sound service
      if (key === 'muted') {
        soundService.setMuted(value);
      }
      
      // Send the update to the server
      const response = await fetch(`${API_URL}/preferences/${key}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ value })
      });
      
      if (!response.ok) {
        throw new Error(`Failed to update ${key} preference`);
      }
      
      const data = await response.json();
      
      // Format preferences data with proper image URLs
      const formattedData = formatPreferencesData(data);
      
      // Update with the formatted server response (in case there were any changes)
      setPreferences(formattedData);
      return true;
    } catch (error) {
      console.error(`[Preferences] Error updating ${key}:`, error);
      
      // Revert the optimistic update on error
      await loadPreferences();
      return false;
    }
  };
  
  // Toggle auto-ante preference
  const toggleAutoAnte = async () => {
    const newValue = !preferences.autoAnte;
    return await updatePreference('autoAnte', newValue);
  };

  // Toggle mute preference
  const toggleMute = async () => {
    const newValue = !preferences.muted;
    return await updatePreference('muted', newValue);
  };

  // Update selected title (expects title string, not ID)
  const updateSelectedTitle = async (titleString) => {
    return await updatePreference('selectedTitle', titleString);
  };

  
  // Upload file for profile image preference
  const uploadProfileImg = async (file) => {
    if (!file) {
      console.error('[Preferences] No file provided for profile image upload');
      return false;
    }


    try {
      const formData = new FormData();
      formData.append('file', file);

      // Get API URL from environment or use localhost as fallback
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

      if (!token) {
        console.error('[Preferences] No token available');
        return false;
      }
      
      
      const response = await fetch(`${API_URL}/preferences/profileImg`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      
      const responseText = await response.text();
      
      if (!response.ok) {
        throw new Error(`Failed to upload profile image: ${responseText}`);
      }
      
      // Parse the response text as JSON
      const data = responseText ? JSON.parse(responseText) : {};
      
      // Format the file URL for consistency
      const formattedUrl = formatImageUrl(data.fileUrl);
      
      // Update preferences with the formatted file URL
      setPreferences(prev => ({
        ...prev,
        profileImg: formattedUrl
      }));
      
      return true;
    } catch (error) {
      console.error('[Preferences] Error uploading profile image:', error);
      return false;
    }
  };
  
  // No test upload function needed
  
  return (
    <PreferencesContext.Provider 
      value={{ 
        preferences, 
        updatePreference, 
        toggleAutoAnte,
        toggleMute,
        updateSelectedTitle,
        uploadProfileImg,
        loading 
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
};
