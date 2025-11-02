import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useSocket } from './SocketContext';
import { useAuth } from './AuthContext';
import { API_URL } from '../config';

const UserDataContext = createContext(null);

export const UserDataProvider = ({ children }) => {
  const { socket } = useSocket();
  const { token } = useAuth();
  const [userCache, setUserCache] = useState(new Map());
  const pendingFetches = useRef(new Set());
  const fetchTimer = useRef(null);

  // Subscribe to user data updates via socket
  useEffect(() => {
    if (!socket) return;

    const handleUserDataUpdate = ({ userId, data }) => {
      setUserCache(prev => {
        const newCache = new Map(prev);
        newCache.set(userId, data);
        return newCache;
      });
    };

    socket.on('userDataUpdated', handleUserDataUpdate);
    return () => {
      socket.off('userDataUpdated', handleUserDataUpdate);
    };
  }, [socket]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (fetchTimer.current) {
        clearTimeout(fetchTimer.current);
      }
    };
  }, []);

  const fetchUsersData = useCallback(async (userIds) => {
    if (!userIds || userIds.length === 0 || !token) return {};

    try {
      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ userIds })
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch users data');
      }
      
      const userData = await response.json();
      
      setUserCache(prev => {
        const newCache = new Map(prev);
        Object.entries(userData).forEach(([userId, data]) => {
          newCache.set(userId, data);
        });
        return newCache;
      });
      
      return userData;
    } catch {
      return {};
    }
  }, [token]);

  const executeBatchFetch = useCallback(() => {
    if (pendingFetches.current.size === 0) return;
    
    const userIds = Array.from(pendingFetches.current);
    pendingFetches.current.clear();
    
    fetchUsersData(userIds);
  }, [fetchUsersData]);

  const getUserData = useCallback((userId) => {
    if (!userId) return null;
    
    const cached = userCache.get(userId);
    if (cached) return cached;
    
    // Add to pending fetches and debounce
    pendingFetches.current.add(userId);
    
    if (fetchTimer.current) {
      clearTimeout(fetchTimer.current);
    }
    
    fetchTimer.current = setTimeout(() => {
      executeBatchFetch();
    }, 10);
    
    return null;
  }, [userCache, executeBatchFetch]);

  const prefetchUsers = useCallback((userIds) => {
    const uncachedIds = userIds.filter(id => !userCache.has(id));
    if (uncachedIds.length > 0) {
      fetchUsersData(uncachedIds);
    }
  }, [userCache, fetchUsersData]);

  const value = {
    getUserData,
    prefetchUsers
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = (userId) => {
  const context = useContext(UserDataContext);
  
  if (!context) {
    throw new Error('useUserData must be used within UserDataProvider');
  }
  
  return context.getUserData(userId);
};

export default UserDataContext;