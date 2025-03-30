import React, { createContext, useState, useEffect, useContext } from 'react';
import { useSocket } from './SocketContext';

// Import shared type definitions
/** @typedef {import('../../../shared/types').LobbyState} LobbyState */
/** @typedef {import('../../../shared/types').GameListItem} GameListItem */

// Create context
const LobbyContext = createContext();

export const useLobby = () => useContext(LobbyContext);

/**
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {(gameId: string) => void} [props.onGameJoined]
 */
export const LobbyProvider = ({ children, onGameJoined }) => {
  const { socket, isConnected, setError } = useSocket();
  
  // Define initial lobby state
  /** @type {LobbyState} */
  const initialLobbyState = {
    playerName: '',
    gameList: [],
    gameId: null,
    gameState: null,  // Store the game state received from server
    view: 'lobby', // 'lobby' or 'game'
    error: null,
    isAuthenticated: false
  };

  // Single consolidated lobby state
  /** @type {[LobbyState, React.Dispatch<React.SetStateAction<LobbyState>>]} */
  const [lobbyState, setLobbyState] = useState(initialLobbyState);

  // Helper functions to update specific parts of the state
  const setPlayerName = (name) => {
    setLobbyState(prevState => ({ ...prevState, playerName: name }));
  };

  const setGameId = (id) => {
    setLobbyState(prevState => ({ ...prevState, gameId: id }));
  };

  const setView = (newView) => {
    setLobbyState(prevState => ({ ...prevState, view: newView }));
  };
  
  // Setup socket event listeners for lobby-related events
  useEffect(() => {
    if (!socket) {
      console.log('[Lobby] No socket connection available');
      return;
    }
    
    console.log('[Lobby] Setting up socket event listeners');
    
    // Game list updates
    socket.on('gameList', (games) => {
      console.log('[Lobby] Received game list:', games);
      setLobbyState(prevState => ({ ...prevState, gameList: games }));
    });
    
    // Game joined response (after creation or joining)
    socket.on('gameJoined', (data) => {
      console.log('[Lobby] Game joined event:', data);
      
      try {
        if (!data || !data.game) {
          throw new Error('No game data received');
        }
        
        if (!data.game.id || !data.game.phase) {
          throw new Error('Invalid game data structure');
        }
        
        // First store the complete game state
        setLobbyState(prevState => ({
          ...prevState,
          gameId: data.game.id,
          gameState: data.game,
          error: null,
          // Only change the view after we have a valid game state
          view: 'game'
        }));
        
        console.log('[Lobby] Game state updated successfully');
        
        // Notify parent component
        if (onGameJoined) {
          onGameJoined(data.game.id);
        }
      } catch (error) {
        console.error('[Lobby] Error processing game join:', error);
        setError(`Failed to join game: ${error.message}`);
        setLobbyState(prevState => ({ ...prevState, error: error.message }));
      }
    });
    
    // Error handling
    socket.on('error', (error) => {
      console.error('[Lobby] Socket error:', error);
      setError(error.message || 'An error occurred');
      setLobbyState(prevState => ({ ...prevState, error: error.message }));
    });
    
    // Clean up listeners
    return () => {
      console.log('[Lobby] Cleaning up socket event listeners');
      socket.off('gameList');
      socket.off('gameJoined');
      socket.off('error');
    };
  }, [socket, onGameJoined]);
  
  /**
   * Create a new game with the current player as host
   */
  const createGame = () => {
    console.log('[Lobby] createGame called, socket state:', { 
      hasSocket: !!socket,
      isConnected,
      socketId: socket?.id
    });

    if (!socket) {
      const error = 'Not connected to server';
      console.error('[Lobby]', error);
      setError(error);
      return;
    }
    
    if (socket && isConnected) {
      console.log('[Lobby] Emitting createGame event');
      socket.emit('createGame');
    } else {
      const error = 'Not connected to server';
      console.error('[Lobby]', error);
      setError(error);
    }
  };
  
  /**
   * Join an existing game by ID
   * @param {string} gameIdToJoin - The ID of the game to join
   */
  const joinGame = (gameIdToJoin) => {
    if (!socket) {
      const error = 'Not connected to server';
      console.error('[Lobby]', error);
      setError(error);
      return;
    }
    
    if (!gameIdToJoin) {
      setError('Game ID is required');
      return;
    }
    
    if (socket && isConnected) {
      console.log('[Lobby] Joining game:', gameIdToJoin);
      socket.emit('joinGame', { gameId: gameIdToJoin });
    } else {
      setError('Not connected to server');
    }
  };
  
  /**
   * Return to the lobby from a game
   * Also fetches the updated user balance
   */
  const returnToLobby = () => {
    // First update the view state
    setLobbyState(prevState => ({
      ...prevState,
      view: 'lobby',
      gameId: null
    }));
    
    // Then fetch the updated user balance
    if (socket && isConnected) {
      console.log('[Lobby] Requesting updated balance on return to lobby');
      socket.emit('getBalance');
    }
  };
  
  /**
   * @typedef {Object} LobbyContextValue
   * @property {LobbyState} lobbyState - Complete lobby state object
   * @property {(name: string) => void} setPlayerName - Update player name
   * @property {() => void} createGame - Function to create a new game
   * @property {(gameId: string) => void} joinGame - Function to join a game
   * @property {() => void} returnToLobby - Function to return to lobby
   */
  
  /** @type {LobbyContextValue} */
  const value = {
    lobbyState,
    setPlayerName,
    createGame,
    joinGame,
    returnToLobby
  };
  
  return (
    <LobbyContext.Provider value={value}>
      {children}
    </LobbyContext.Provider>
  );
};
