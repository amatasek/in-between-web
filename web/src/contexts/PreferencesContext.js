import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import soundService from '../services/SoundService';

const PreferencesContext = createContext(null);

// Helper function to format image URLs consistently across the application
const formatImageUrl = (url) => {
  if (!url) return null;
  
  // Get API URL from environment or use localhost as fallback
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  
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
    profileImg: formatImageUrl(data.profileImg),
    twoSecondPotGif: formatImageUrl(data.twoSecondPotGif),
    twoSecondPotMp3: data.twoSecondPotMp3 // Audio files don't need the same formatting
  };
};

export const PreferencesProvider = ({ children }) => {
  const [preferences, setPreferences] = useState({
    profileImg: null,
    autoAnte: false,
    muted: false,
    twoSecondPotGif: null,
    twoSecondPotMp3: null
  });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  
  // Define loadPreferences function with useCallback to handle dependencies properly
  const loadPreferences = React.useCallback(async () => {
    if (!user) {
      setPreferences({ autoAnte: false });
      setLoading(false);
      return;
    }
    
    console.log('[Preferences] Loading preferences for user:', user.username);
      
    try {
      setLoading(true);
      // Get API URL from environment or use localhost as fallback
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const token = localStorage.getItem('token');
      
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
  }, [user]);
  
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
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const token = localStorage.getItem('token');
      
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
        console.log(`[Preferences] Updating sound muted state to: ${value}`);
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
      console.log(`[Preferences] Updated ${key}:`, data);
      
      // Format preferences data with proper image URLs
      const formattedData = formatPreferencesData(data);
      
      console.log(`[Preferences] Formatted ${key} response:`, formattedData);
      
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

  // Upload file for two-second-pot-gif preference
  const uploadTwoSecondPotGif = async (file) => {
    if (!file) {
      console.error('[Preferences] No file provided for GIF upload');
      return false;
    }
    
    console.log('[Preferences] Starting GIF upload:', {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type
    });
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      // Get API URL from environment or use localhost as fallback
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const token = localStorage.getItem('token');
      
      if (!token) {
        console.error('[Preferences] No token available');
        return false;
      }
      
      console.log(`[Preferences] Sending GIF upload request to: ${API_URL}/preferences/twoSecondPotGif`);
      
      const response = await fetch(`${API_URL}/preferences/twoSecondPotGif`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      
      const responseText = await response.text();
      console.log('[Preferences] GIF upload response:', {
        status: response.status,
        statusText: response.statusText,
        responseText
      });
      
      if (!response.ok) {
        throw new Error(`Failed to upload GIF file: ${responseText}`);
      }
      
      // Parse the response text as JSON
      const data = responseText ? JSON.parse(responseText) : {};
      console.log('[Preferences] Uploaded GIF:', data);
      
      // Format the file URL for consistency
      const formattedUrl = formatImageUrl(data.fileUrl);
      console.log('[Preferences] Formatted GIF URL:', formattedUrl);
      
      // Update preferences with the formatted file URL
      setPreferences(prev => ({
        ...prev,
        twoSecondPotGif: formattedUrl
      }));
      
      return true;
    } catch (error) {
      console.error('[Preferences] Error uploading GIF:', error);
      return false;
    }
  };

  // Upload file for two-second-pot-mp3 preference
  const uploadTwoSecondPotMp3 = async (file) => {
    if (!file) {
      console.error('[Preferences] No file provided for MP3 upload');
      return false;
    }
    
    console.log('[Preferences] Starting MP3 upload:', {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type
    });
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      // Get API URL from environment or use localhost as fallback
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const token = localStorage.getItem('token');
      
      if (!token) {
        console.error('[Preferences] No token available');
        return false;
      }
      
      console.log(`[Preferences] Sending MP3 upload request to: ${API_URL}/preferences/twoSecondPotMp3`);
      
      const response = await fetch(`${API_URL}/preferences/twoSecondPotMp3`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      
      const responseText = await response.text();
      console.log('[Preferences] MP3 upload response:', {
        status: response.status,
        statusText: response.statusText,
        responseText
      });
      
      if (!response.ok) {
        throw new Error(`Failed to upload MP3 file: ${responseText}`);
      }
      
      // Parse the response text as JSON
      const data = responseText ? JSON.parse(responseText) : {};
      console.log('[Preferences] Uploaded MP3:', data);
      
      // Update preferences with the file URL
      setPreferences(prev => ({
        ...prev,
        twoSecondPotMp3: data.fileUrl
      }));
      
      return true;
    } catch (error) {
      console.error('[Preferences] Error uploading MP3:', error);
      return false;
    }
  };
  
  // Upload file for profile image preference
  const uploadProfileImg = async (file) => {
    if (!file) {
      console.error('[Preferences] No file provided for profile image upload');
      return false;
    }
    
    console.log('[Preferences] Starting profile image upload:', {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type
    });
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      // Get API URL from environment or use localhost as fallback
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const token = localStorage.getItem('token');
      
      if (!token) {
        console.error('[Preferences] No token available');
        return false;
      }
      
      console.log(`[Preferences] Sending profile image upload request to: ${API_URL}/preferences/profileImg`);
      
      const response = await fetch(`${API_URL}/preferences/profileImg`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      
      const responseText = await response.text();
      console.log('[Preferences] Profile image upload response:', {
        status: response.status,
        statusText: response.statusText,
        responseText
      });
      
      if (!response.ok) {
        throw new Error(`Failed to upload profile image: ${responseText}`);
      }
      
      // Parse the response text as JSON
      const data = responseText ? JSON.parse(responseText) : {};
      console.log('[Preferences] Uploaded profile image:', data);
      
      // Format the file URL for consistency
      const formattedUrl = formatImageUrl(data.fileUrl);
      console.log('[Preferences] Formatted profile image URL:', formattedUrl);
      
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
        uploadTwoSecondPotGif,
        uploadTwoSecondPotMp3,
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
