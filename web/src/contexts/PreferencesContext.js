import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const PreferencesContext = createContext(null);

export const PreferencesProvider = ({ children }) => {
  const [preferences, setPreferences] = useState({
    autoAnte: false
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
  
  return (
    <PreferencesContext.Provider 
      value={{ 
        preferences, 
        updatePreference, 
        toggleAutoAnte,
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
