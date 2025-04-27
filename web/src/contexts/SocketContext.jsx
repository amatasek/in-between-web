import React, { createContext, useState, useEffect, useContext } from 'react';
import { io } from 'socket.io-client';
import { SOCKET_URL } from '../config';
import { useAuth } from './AuthContext';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const { token } = useAuth();
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    if (!token) {
      if (socket) {
        socket.disconnect();
        setSocket(null);
        setIsConnected(false);
        setError(null);
      }
      return;
    }

    const newSocket = io(SOCKET_URL, {
      auth: { token },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      transports: ['websocket', 'polling'],
      timeout: 10000
    });

    setSocket(newSocket);

    newSocket.on('connect', () => {
      setError(null);
    });
    
    newSocket.on('authenticated', (userData) => {
      newSocket.auth = {
        userId: userData.userId,
        username: userData.username
      };
      
      setIsConnected(true);
      
      newSocket.emit('getGameList');
    });

    newSocket.on('connect_error', (error) => {
      setError('Failed to connect to game server: ' + error.message);
      setIsConnected(false);
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
    });

    newSocket.on('error', (err) => {
      setError(err.message || 'Unknown socket error');
    });

    const socketEvents = [
      'connect',
      'authenticated',
      'disconnect',
      'connect_error',
      'error',
      'transport'
    ];

    return () => {
      if (newSocket) {
        socketEvents.forEach(event => newSocket.off(event));
        newSocket.disconnect();
        setSocket(null);
        setIsConnected(false);
        setError(null);
      }
    };

  }, [token]);

  const value = {
    socket,
    isConnected,
    error,
    setError
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};
