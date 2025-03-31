import React, { createContext, useState, useContext, useEffect } from 'react';
import { useSocket } from './SocketContext';
import WelcomePopup from '../components/common/WelcomePopup';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
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

  useEffect(() => {
    try {
      // Check for stored token on mount
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      if (token && storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (!parsedUser.username || !parsedUser.id || typeof parsedUser.balance !== 'number') {
          console.error('[Auth] Invalid stored user data:', parsedUser);
          logout(); // Clear invalid data
          return;
        }
        console.log(`[Auth] Session restored: ${parsedUser.username}`);
        
        setUser(parsedUser);
      }
    } catch (error) {
      console.error('[Auth] Error restoring session:', error);
      logout(); // Clear potentially corrupted data
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (userData, token) => {
    console.log(`[Auth] Login: ${userData.username}`);
    
    
    if (!userData || !userData.username || !userData.id || typeof userData.balance !== 'number') {
      console.error('[Auth] Invalid user data:', userData);
      throw new Error('Invalid user data provided');
    }

    if (!token) {
      console.error('[Auth] No token provided');
      throw new Error('No authentication token provided');
    }
    
    try {
      const userToStore = {
        username: userData.username,
        id: userData.id,
        balance: userData.balance
      };
      setUser(userToStore);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userToStore));
      console.log(`[Auth] Login successful: ${userToStore.username}`);
      
      // Show welcome popup when user logs in
      setShowWelcomePopup(true);
      
    } catch (error) {
      console.error('[Auth] Error during login:', error);
      throw error;
    }
  };

  const logout = () => {
    console.log('[Auth] Logout');
    
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setShowWelcomePopup(false);
  };

  if (loading) {
    return null; // or a loading spinner
  }
  
  const handleCloseWelcomePopup = () => {
    setShowWelcomePopup(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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
