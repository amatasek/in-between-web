import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useSocket } from './SocketContext.jsx';
import WelcomePopup from '../components/common/WelcomePopup';
import { API_URL } from '../config';
import { auth } from '../services/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

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
      socket.on('balanceUpdated', (data) => { 
        console.log('[AuthContext] Received balanceUpdated event:', data); 
        if (data && typeof data.balance === 'number') {
          console.log(`[AuthContext] Updating user balance from ${user?.balance} to ${data.balance}`); 
          // Update user with new balance
          const updatedUser = {
            ...user,
            balance: data.balance
          };
          
          // Update state
          setUser(updatedUser);
        } else {
          console.warn('[AuthContext] Received invalid balance data:', data);
        }
      });
      
      // Clean up listener on unmount
      return () => {
        socket.off('balanceUpdated');
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

  // Firebase Auth State Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Get Firebase ID token
          const idToken = await firebaseUser.getIdToken();
          setToken(idToken);

          // Fetch user data from backend
          const userData = await fetchUserData(idToken);
          if (userData) {
            setUser(userData);
          } else {
            console.error('[Auth] Failed to fetch user data for Firebase user');
            setUser(null);
            setToken(null);
          }
        } catch (error) {
          console.error('[Auth] Error getting Firebase token or user data:', error);
          setUser(null);
          setToken(null);
        } finally {
          setLoading(false);
        }
      } else {
        setUser(null);
        setToken(null);
        setLoading(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []); // Empty dependency array ensures it runs only once on mount

  const login = async (userData, newToken) => {
    // Note: This function is primarily used for the migration flow
    // Firebase social logins are handled automatically by onAuthStateChanged
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

      // Set token and user data
      setUser(initialUserData);
      setToken(newToken);

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

  const logout = useCallback(async () => {
    try {
      await signOut(auth);
      setUser(null);
      setToken(null);
      setShowWelcomePopup(false);
    } catch (error) {
      console.error('[Auth] Error during logout:', error);
    }
  }, []); // Empty dependency array means this function never changes

  // Function to refresh user data from the /me endpoint
  const refreshUserData = useCallback(async () => {
    try {
      // Get fresh Firebase token
      const currentUser = auth.currentUser;
      if (!currentUser) {
        console.error('[Auth] No Firebase user found. Logging out.');
        logout();
        return;
      }

      const freshToken = await currentUser.getIdToken(true); // Force refresh
      setToken(freshToken);

      // Fetch updated user data
      const userData = await fetchUserData(freshToken);
      if (userData) {
        setUser(userData);
      } else {
        console.error('[Auth] Failed to refresh user data. Logging out.');
        logout();
      }
    } catch (error) {
      console.error('[Auth] Error during manual refresh. Logging out.', error);
      logout();
    }
  }, [logout]);

  if (loading) {
    return null; // or a loading spinner
  }
  
  const handleCloseWelcomePopup = () => {
    setShowWelcomePopup(false);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, refreshUserData, loading }}>
      {children}
      {/* {showWelcomePopup && user && (
        <WelcomePopup 
          username={user.username} 
          balance={user.balance} 
          onClose={handleCloseWelcomePopup} 
        />
      )} */}
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
