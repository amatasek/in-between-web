import React, { createContext, useState, useEffect, useContext } from 'react';
import { io } from 'socket.io-client';
import { SOCKET_URL } from '../config';

// For Socket.io types, we'll define a simple interface that covers our usage
/**
 * @typedef {Object} SocketIO
 * @property {boolean} connected - Whether the socket is connected
 * @property {string} id - The socket's ID
 * @property {function} emit - Function to emit events
 * @property {function} on - Function to listen for events
 * @property {function} off - Function to remove event listeners
 * @property {function} disconnect - Function to disconnect the socket
 */

// Create context
const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

/**
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
export const SocketProvider = ({ children }) => {
  /** @type {[SocketIO|null, React.Dispatch<React.SetStateAction<SocketIO|null>>]} */
  const [socket, setSocket] = useState(null);
  /** @type {[boolean, React.Dispatch<React.SetStateAction<boolean>>]} */
  const [isConnected, setIsConnected] = useState(false);
  /** @type {[string|null, React.Dispatch<React.SetStateAction<string|null>>]} */
  const [error, setError] = useState(null);

  // Initialize Socket.IO connection
  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') {
      return;
    }
    
    const token = localStorage.getItem('token');
    if (!token) {
      // Skip socket connection if no auth token is available
      return;
    }

    // Initialize socket connection with auth token
    const newSocket = io(SOCKET_URL, {
      auth: { token },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      transports: ['websocket', 'polling'],
      timeout: 10000
    });
    
    // Socket transport events
    newSocket.on('transport', transport => {
      console.log(`[Socket] Transport: ${transport}`);
    });
    
    setSocket(newSocket);

    // Socket connection status
    newSocket.on('connect', () => {
      console.log(`[Socket] Connected: ${newSocket.id}`);
      // Note: We don't set isConnected to true here yet
      // We'll wait for the 'authenticated' event to confirm full authentication
      setError(null);
    });
    
    // Listen for authentication confirmation
    newSocket.on('authenticated', (userData) => {
      console.log('[Socket] Authentication successful', userData);
      
      // Store user data in the socket object for easy access
      newSocket.auth = {
        userId: userData.userId,
        username: userData.username
      };
      
      setIsConnected(true); // Now we can set isConnected to true
      
      // Request the game list when authenticated
      console.log('[Socket] Requesting initial game list');
      newSocket.emit('getGameList');
    });

    newSocket.on('connect_error', (error) => {
      console.error('[Socket] Connection error:', {
        message: error.message,
        description: error.description,
        type: error.type,
        data: error.data
      });
      setError('Failed to connect to game server: ' + error.message);
      setIsConnected(false);
    });

    newSocket.on('disconnect', () => {
      console.log('[Socket] Disconnected from server');
      setIsConnected(false);
    });

    newSocket.on('error', (err) => {
      console.error('Socket error:', err);
      setError(err.message || 'Unknown socket error');
    });

    // Cleanup on unmount
    return () => {
      // Clean up socket connection and event listeners
      if (newSocket) {
        newSocket.off('connect');
        newSocket.off('disconnect');
        newSocket.off('connect_error');
        newSocket.off('error');
        newSocket.disconnect();
        setSocket(null);
        setIsConnected(false);
        setError(null);
      }
    };
  }, []);

  /**
   * @typedef {Object} SocketContextValue
   * @property {SocketIO|null} socket - The Socket.IO instance
   * @property {boolean} isConnected - Whether the socket is connected
   * @property {string|null} error - Any error message
   * @property {(error: string|null) => void} setError - Function to set error message
   */

  /** @type {SocketContextValue} */
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
