import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useSocket } from './SocketContext.jsx';
import WelcomePopup from '../components/common/WelcomePopup';
import { API_URL } from '../config';
import { auth } from '../services/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import { Capacitor } from '@capacitor/core';

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

  // Fetch user data from backend
  const fetchUserData = async (authToken) => {
    if (!authToken) return null;

    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) return null;

      const data = await response.json();
      return data.user;
    } catch (error) {
      console.error('[Auth] Error fetching user data:', error);
      return null;
    }
  };

  // Auth state listener
  useEffect(() => {
    const isNative = Capacitor.isNativePlatform();

    const handleAuthStateChange = async (idToken) => {
      if (!idToken) {
        setUser(null);
        setToken(null);
        setLoading(false);
        return;
      }

      setToken(idToken);
      const userData = await fetchUserData(idToken);

      if (userData) {
        setUser(userData);
      } else {
        setUser(null);
        setToken(null);
      }
      setLoading(false);
    };

    if (isNative) {
      // Native platform
      const listener = FirebaseAuthentication.addListener('authStateChange', async (result) => {
        if (result.user) {
          const tokenResult = await FirebaseAuthentication.getIdToken();
          await handleAuthStateChange(tokenResult.token);
        } else {
          await handleAuthStateChange(null);
        }
      });

      // Check initial state
      FirebaseAuthentication.getCurrentUser().then(async (result) => {
        if (result.user) {
          const tokenResult = await FirebaseAuthentication.getIdToken();
          await handleAuthStateChange(tokenResult.token);
        } else {
          setLoading(false);
        }
      });

      return () => listener.remove();
    } else {
      // Web platform
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          const idToken = await firebaseUser.getIdToken();
          await handleAuthStateChange(idToken);
        } else {
          await handleAuthStateChange(null);
        }
      });

      return () => unsubscribe();
    }
  }, []);

  const login = async (userData, newToken) => {
    // Used for migration flow - Firebase auth handled by listener
    setUser(userData);
    setToken(newToken);
    setShowWelcomePopup(true);

    const completeUserData = await fetchUserData(newToken);
    if (completeUserData) {
      setUser(completeUserData);
    }
  };

  const logout = useCallback(async () => {
    const isNative = Capacitor.isNativePlatform();

    await (isNative
      ? FirebaseAuthentication.signOut()
      : signOut(auth)
    );

    setUser(null);
    setToken(null);
    setShowWelcomePopup(false);
  }, []);

  const refreshUserData = useCallback(async () => {
    const isNative = Capacitor.isNativePlatform();

    const freshToken = isNative
      ? (await FirebaseAuthentication.getIdToken({ forceRefresh: true })).token
      : await auth.currentUser?.getIdToken(true);

    if (!freshToken) {
      logout();
      return;
    }

    setToken(freshToken);

    const userData = await fetchUserData(freshToken);
    if (userData) {
      setUser(userData);
    } else {
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
