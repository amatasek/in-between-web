import React, { createContext, useState, useEffect, useContext } from 'react';
import { useSocket } from './SocketContext';
import { useAuth } from './AuthContext';
import soundService from '../services/SoundService';

// Create context
const LobbyContext = createContext();

export const useLobby = () => useContext(LobbyContext);

/**
 * Simplified LobbyContext that focuses solely on lobby functionality
 * Game-related functionality has been moved to the GameRoom component
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
export const LobbyProvider = ({ children }) => {
  const { socket, isConnected } = useSocket();
  const { refreshUserData } = useAuth();
  
  // Initialize sound service
  useEffect(() => {
    soundService.initialize();
  }, []);
  
  // Game list state
  const [gameList, setGameList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Set up socket event listeners for game list updates
  useEffect(() => {
    if (!socket || !isConnected) return;
    
    console.log('[Lobby] Setting up game list listeners with socket ID:', socket.id);
    
    const handleGameList = (games) => {
      console.log(`[Lobby] 🔄 RECEIVED gameList event! Games available: ${games.length}`);
      setGameList(games);
      setLoading(false);
    };
    
    const handleError = (err) => {
      console.error('[Lobby] Socket error:', err);
      setError(err.message || 'An error occurred');
      setLoading(false);
    };
    
    // Register event listeners
    socket.on('gameList', handleGameList);
    socket.on('error', handleError);
    
    // Add a test event listener to verify socket communication
    socket.on('connect', () => {
      console.log('[Lobby] Socket reconnected in LobbyContext');
    });
    
    // Request game list
    console.log('[Lobby] 📤 Requesting game list');
    socket.emit('getGameList');
    
    // Clean up listeners when component unmounts
    return () => {
      console.log('[Lobby] 🧹 Cleaning up game list listeners');
      socket.off('gameList', handleGameList);
      socket.off('error', handleError);
      socket.off('connect');
    };
  }, [socket, isConnected]);
  
  /**
   * Request a refresh of the game list
   */
  const refreshGameList = () => {
    if (socket && isConnected) {
      console.log('[Lobby] Requesting game list refresh');
      socket.emit('getGameList');
    }
  };

  /**
   * Leave a game and return to the lobby
   * @param {string} gameId - The ID of the game to leave
   */
  const leaveGame = (gameId) => {
    if (socket && isConnected && gameId) {
      console.log(`[Lobby] Leaving game ${gameId}`);
      soundService.play('ui.leave');
      socket.emit('leaveGameLobby', { gameId });
      refreshGameList();
      refreshUserData();
    }
  };

  // Simplified context value with only lobby-related functionality
  const contextValue = {
    gameList,
    loading,
    error,
    refreshGameList,
    leaveGame
  };
  
  return (
    <LobbyContext.Provider value={contextValue}>
      {children}
    </LobbyContext.Provider>
  );
};
