import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const PreferencesContext = createContext(null);

export const PreferencesProvider = ({ children }) => {
  const [preferences, setPreferences] = useState({
    profileImg: null,
    autoAnte: false,
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
      console.log('[Preferences] Loaded preferences:', data);
      setPreferences(data || { autoAnte: false });
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
      
      // Update with the server response (in case there were any changes)
      setPreferences(data);
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
      
      // Update preferences with the file URL
      setPreferences(prev => ({
        ...prev,
        twoSecondPotGif: data.fileUrl
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
      
      // Update preferences with the file URL
      setPreferences(prev => ({
        ...prev,
        profileImg: data.fileUrl
      }));
      
      return true;
    } catch (error) {
      console.error('[Preferences] Error uploading profile image:', error);
      return false;
    }
  };
  
  // Test function for file uploads
  const testFileUpload = async (file) => {
    if (!file) {
      console.error('[Preferences] No file provided for test upload');
      return false;
    }
    
    console.log('[Preferences] Starting test file upload:', {
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
      
      console.log(`[Preferences] Sending test upload request to: ${API_URL}/preferences/test-upload`);
      
      const response = await fetch(`${API_URL}/preferences/test-upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      
      const responseText = await response.text();
      console.log('[Preferences] Test upload response:', {
        status: response.status,
        statusText: response.statusText,
        responseText
      });
      
      if (!response.ok) {
        throw new Error(`Test upload failed: ${responseText}`);
      }
      
      // Parse the response text as JSON
      const data = responseText ? JSON.parse(responseText) : {};
      console.log('[Preferences] Test upload successful:', data);
      
      return true;
    } catch (error) {
      console.error('[Preferences] Error in test upload:', error);
      return false;
    }
  };
  
  return (
    <PreferencesContext.Provider 
      value={{ 
        preferences, 
        updatePreference, 
        toggleAutoAnte,
        uploadTwoSecondPotGif,
        uploadTwoSecondPotMp3,
        uploadProfileImg,
        testFileUpload,
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
