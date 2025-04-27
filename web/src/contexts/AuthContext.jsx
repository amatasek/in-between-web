import React, { createContext, useState, useContext, useEffect } from 'react';
import { useSocket } from './SocketContext.jsx';
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
        if (data && typeof data.balance === 'number') {
          // Update user with new balance
          const updatedUser = {
            ...user,
            balance: data.balance
          };
          
          // Update state
          setUser(updatedUser);
        }
      });
      
      // Clean up listener on unmount
      return () => {
        socket.off('balanceUpdate');
      };
    }
  }, [socket, user]);

  // Function to fetch user data from the /me endpoint
  const fetchUserData = async (authToken) => {
    try {
      // Use the passed token directly
      if (!authToken) {
        return null;
      }

      const response = await fetch(`${API_URL}/auth/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`, // Use authToken
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      
      const data = await response.json();
      return data.user;
    } catch (error) {
      console.error('[Auth] Error fetching user data:', error);
      return null;
    }
  };

  // Single Effect for Initial Authentication Check
  useEffect(() => {
    const initializeAuth = async () => {
      let currentToken = null;
      try {
        currentToken = localStorage.getItem('token');
        
        if (currentToken) {
          setToken(currentToken); 
        }
      } catch (error) {
        console.error('[Auth] Error reading token from localStorage:', error);
        localStorage.removeItem('token'); // Clear potentially corrupted token
      }

      // Now, decide whether to fetch user data based on the token found
      if (currentToken) {
        try {
          const userData = await fetchUserData(currentToken); 
          if (userData) {
            setUser(userData); 
          } else {
            // Fetch failed or returned no data for a valid token
            console.error('[Auth] Token valid but failed to fetch user data. Logging out.');
            setUser(null);
            setToken(null);
            localStorage.removeItem('token');
          }
        } catch (error) {
          console.error('[Auth] Error during user data fetch. Logging out.', error);
          setUser(null);
          setToken(null);
          localStorage.removeItem('token');
        } finally {
          setLoading(false);
        }
      } else {
        setUser(null);
        setToken(null);
        setLoading(false);
      }
    };

    initializeAuth();
  }, []); // Empty dependency array ensures it runs only once on mount

  const login = async (userData, newToken) => {
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
      
      // Show welcome popup when user logs in
      setShowWelcomePopup(true);
      
      // Fetch complete user data from /me endpoint
      const completeUserData = await fetchUserData(newToken);
      if (completeUserData) {
        setUser(completeUserData);
      }
      
    } catch (error) {
      console.error('[Auth] Error during login:', error);
      throw error;
    }
  };

  const logout = () => {
    // Clear state
    setUser(null);
    setToken(null);
    setShowWelcomePopup(false);
    
    // Clear localStorage (only token is stored now)ß
    localStorage.removeItem('token');
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
    try {
      const userData = await fetchUserData(token); // Use current token from state
      if (userData) {
        setUser(userData);
        console.log('[Auth] User data refreshed.');
      } else {
        // Handle case where token might be invalid now, or fetch fails
        console.error('[Auth] Failed to refresh user data. Logging out.');
        logout(); // Log out if refresh fails
      }
    } catch (error) { 
      console.error('[Auth] Error during manual refresh. Logging out.', error);
      logout();
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, refreshUserData, loading }}>
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
