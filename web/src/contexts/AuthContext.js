import React, { createContext, useState, useContext, useEffect } from 'react';
import { useSocket } from './SocketContext';
import WelcomePopup from '../components/common/WelcomePopup';
import { API_URL } from '../config';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  
  // Get socket from socket context to listen for balance updates
  const socketData = useSocket();
  const socket = socketData?.socket;

  // Listen for balance updates from the server
  useEffect(() => {
    if (socket && user) {
      // Listen for balance updates
      socket.on('balanceUpdate', (data) => {
        console.log(`[Auth] Balance update: ${data.balance}`);
        if (data && typeof data.balance === 'number') {
          // Update user with new balance
          const updatedUser = {
            ...user,
            balance: data.balance
          };
          
          // Update state and local storage
          setUser(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
          console.log(`[Auth] User balance updated: ${data.balance}`);
          
        }
      });
      
      // Clean up listener on unmount
      return () => {
        socket.off('balanceUpdate');
      };
    }
  }, [socket, user]);

  // Function to fetch user data from the /me endpoint
  const fetchUserData = async () => {
    if (!token) return null;
    
    try {
      console.log('[Auth] Fetching user data from /me endpoint');
      const response = await fetch(`${API_URL}/auth/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      
      const data = await response.json();
      console.log('[Auth] User data fetched successfully');
      return data.user;
    } catch (error) {
      console.error('[Auth] Error fetching user data:', error);
      return null;
    }
  };

  // Effect to load initial session from localStorage (token only)
  useEffect(() => {
    try {
      // Check for stored token on mount
      const storedToken = localStorage.getItem('token');
      
      if (storedToken) {
        console.log('[Auth] Token found in localStorage, restoring session');
        setToken(storedToken);
        // We'll fetch the user data in the next useEffect
      }
    } catch (error) {
      console.error('[Auth] Error restoring session:', error);
      logout(); // Clear potentially corrupted data
    } finally {
      setLoading(false);
    }
  }, []);
  
  // Effect to fetch user data when token changes or on initial load
  useEffect(() => {
    console.log('[Auth] useEffect for fetchUserData triggered', { hasToken: !!token, isLoading: loading });
    
    if (!token || loading) {
      console.log('[Auth] Skipping fetchUserData - no token or still loading');
      return;
    }
    
    // Track if the component is mounted to prevent state updates after unmount
    let isMounted = true;
    
    const loadUserData = async () => {
      // Always fetch fresh user data when we have a token
      console.log('[Auth] Fetching fresh user data from /me endpoint');
      const userData = await fetchUserData();
      if (userData && isMounted) {
        console.log('[Auth] User data received:', userData);
        setUser(userData);
        console.log('[Auth] User data loaded from /me endpoint');
      } else {
        console.log('[Auth] No user data received or component unmounted', { userData, isMounted });
        // If we couldn't get user data but have a token, something is wrong
        if (isMounted && !userData) {
          console.error('[Auth] Failed to fetch user data with valid token');
          // Consider logging out the user if we can't get their data
          // logout();
        }
      }
    };
    
    loadUserData();
    
    // Cleanup function to prevent state updates after unmount
    return () => {
      isMounted = false;
    };
  }, [token, loading]); // Only depend on token and loading, not user

  const login = async (userData, newToken) => {
    console.log(`[Auth] Login: ${userData.username}`);
    
    if (!userData || !userData.username || !userData.id || typeof userData.balance !== 'number') {
      console.error('[Auth] Invalid user data:', userData);
      throw new Error('Invalid user data provided');
    }

    if (!newToken) {
      console.error('[Auth] No token provided');
      throw new Error('No authentication token provided');
    }
    
    try {
      // Set initial user data for immediate UI feedback
      const initialUserData = {
        username: userData.username,
        id: userData.id,
        balance: userData.balance
      };
      
      // Store only the token in localStorage
      setUser(initialUserData);
      setToken(newToken);
      localStorage.setItem('token', newToken);
      console.log(`[Auth] Login successful: ${initialUserData.username}`);
      
      // Show welcome popup when user logs in
      setShowWelcomePopup(true);
      
      // Fetch complete user data from /me endpoint
      setTimeout(async () => {
        const completeUserData = await fetchUserData();
        if (completeUserData) {
          setUser(completeUserData);
          console.log('[Auth] Updated user data with complete profile');
        }
      }, 500); // Small delay to ensure token is set
      
    } catch (error) {
      console.error('[Auth] Error during login:', error);
      throw error;
    }
  };

  const logout = () => {
    console.log('[Auth] Logout');
    
    // Clear state
    setUser(null);
    setToken(null);
    setShowWelcomePopup(false);
    
    // Clear localStorage (only token is stored now)
    localStorage.removeItem('token');
    // Remove any legacy user data that might still be in localStorage
    localStorage.removeItem('user');
    
    console.log('[Auth] User logged out, all data cleared');
  };

  if (loading) {
    return null; // or a loading spinner
  }
  
  const handleCloseWelcomePopup = () => {
    setShowWelcomePopup(false);
  };

  // Function to refresh user data from the /me endpoint
  const refreshUserData = async () => {
    console.log('[Auth] Manually refreshing user data');
    const userData = await fetchUserData();
    if (userData) {
      setUser(userData);
      console.log('[Auth] User data refreshed successfully');
      return userData;
    }
    console.log('[Auth] Failed to refresh user data');
    return null;
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, refreshUserData }}>
      {children}
      {showWelcomePopup && user && (
        <WelcomePopup 
          username={user.username} 
          balance={user.balance} 
          onClose={handleCloseWelcomePopup} 
        />
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
