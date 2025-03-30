import React, { createContext, useState, useContext, useEffect } from 'react';
import { useSocket } from './SocketContext';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Get socket from socket context to listen for balance updates
  const socketData = useSocket();
  const socket = socketData?.socket;

  // Listen for balance updates from the server
  useEffect(() => {
    if (socket && user) {
      console.log('[Auth] Setting up balance update listener');
      
      // Listen for balance updates
      socket.on('balanceUpdate', (data) => {
        console.log('[Auth] Received balance update:', data);
        if (data && typeof data.balance === 'number') {
          // Update user with new balance
          const updatedUser = {
            ...user,
            balance: data.balance
          };
          
          // Update state and local storage
          setUser(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
          console.log('[Auth] Updated user balance:', data.balance);
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
        console.log('[Auth] Restored user session:', { 
          username: parsedUser.username,
          id: parsedUser.id
        });
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
    console.log('[Auth] Login called with:', { 
      userData: { ...userData, token: undefined },
      hasToken: !!token
    });
    
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
      console.log('[Auth] Login successful, user state updated');
    } catch (error) {
      console.error('[Auth] Error during login:', error);
      throw error;
    }
  };

  const logout = () => {
    console.log('[Auth] Logging out user');
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  if (loading) {
    return null; // or a loading spinner
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
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
