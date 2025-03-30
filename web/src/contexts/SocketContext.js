import React, { createContext, useState, useEffect, useContext } from 'react';
import { io } from 'socket.io-client';

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
    const token = localStorage.getItem('token');
    const newSocket = io('http://localhost:3002', {
      auth: { token }
    });
    setSocket(newSocket);

    // Socket connection status
    newSocket.on('connect', () => {
      console.log('Connected to game server');
      setIsConnected(true);
      setError(null);
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from game server');
      setIsConnected(false);
    });

    newSocket.on('error', (err) => {
      console.error('Socket error:', err);
      setError(err.message || 'Unknown socket error');
    });

    // Cleanup on unmount
    return () => {
      console.log('Cleaning up socket connection');
      newSocket.disconnect();
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
