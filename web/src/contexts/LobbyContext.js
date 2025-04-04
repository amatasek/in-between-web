import React, { createContext, useState, useEffect, useContext } from 'react';
import { useSocket } from './SocketContext';
import { useAuth } from './AuthContext';
import { API_URL } from '../config';

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
  const { token, refreshUserData } = useAuth();
  
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
  
  // Fetch initial game list via HTTP when component mounts or token changes
  useEffect(() => {
    const fetchGameList = async () => {
      if (!token) return;
      
      try {
        console.log('[Lobby] Fetching initial game list via HTTP');
        const response = await fetch(`${API_URL}/games`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        
        const games = await response.json();
        console.log(`[Lobby] Initial games fetched via HTTP: ${games.length}`);
        setLobbyState(prevState => ({ ...prevState, gameList: games }));
      } catch (error) {
        console.error('[Lobby] Error fetching game list via HTTP:', error);
        // Don't set error state here - we'll fall back to WebSocket
      }
    };
    
    fetchGameList();
  }, [token]);
  
  // Setup socket event listeners for lobby-related events
  useEffect(() => {
    if (!socket) {
      // No socket connection available
      return;
    }
    
    // Set up socket event listeners for lobby functionality
    
    // Game list updates
    socket.on('gameList', (games) => {
      console.log(`[Lobby] Games available: ${games.length}`);
      setLobbyState(prevState => ({ ...prevState, gameList: games }));
    });
    
    // Game joined response (after creation or joining)
    socket.on('gameJoined', (data) => {
      console.log(`[Lobby] Game joined event received:`, data);
      try {
        if (!data || !data.game) {
          console.error('[Lobby] No game data in gameJoined event:', data);
          throw new Error('No game data received');
        }
        
        if (!data.game.id || !data.game.phase) {
          console.error('[Lobby] Invalid game structure in gameJoined event:', data.game);
          throw new Error('Invalid game data structure');
        }
        
        console.log(`[Lobby] Setting game state and changing view to game for: ${data.game.id}`);
        
        // Force a complete state reset to ensure clean transition
        const newState = {
          playerName: lobbyState.playerName,
          gameList: lobbyState.gameList,
          gameId: data.game.id,
          gameState: data.game,
          view: 'game',
          error: null,
          isAuthenticated: lobbyState.isAuthenticated
        };
        
        console.log('[Lobby] New lobby state after game join:', newState);
        setLobbyState(newState);
        
        // Game state updated successfully
        console.log(`[Lobby] Successfully joined game: ${data.game.id}`);
        
        // Notify parent component
        if (onGameJoined) {
          console.log(`[Lobby] Notifying parent component of game join: ${data.game.id}`);
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
      // Remove all event listeners when component unmounts
      socket.off('gameList');
      socket.off('gameJoined');
      socket.off('error');
    };
  }, [socket, onGameJoined]);
  
  /**
   * Create a new game with the current player as host
   */
  const createGame = () => {
    console.log('[Lobby] Creating new game');
    if (!socket) {
      const error = 'Not connected to server';
      console.error('[Lobby]', error);
      setError(error);
      return;
    }
    
    if (socket && isConnected) {
      // First check if we're already in a game and need to leave it
      if (lobbyState.gameId) {
        console.log(`[Lobby] Already in game ${lobbyState.gameId}, leaving before creating new game`);
        // Leave the current game first
        const currentGameId = lobbyState.gameId;
        socket.emit('leaveGameLobby', { gameId: currentGameId });
      }
      
      // Reset state completely - create a fresh state object
      const freshState = {
        playerName: lobbyState.playerName,
        gameList: lobbyState.gameList,
        gameId: null,
        gameState: null,
        view: 'lobby',
        error: null,
        isAuthenticated: lobbyState.isAuthenticated
      };
      
      console.log('[Lobby] Resetting state before creating game:', freshState);
      setLobbyState(freshState);
      
      // Create the game after a short delay to ensure state is reset
      setTimeout(() => {
        console.log('[Lobby] Emitting createGame event');
        socket.emit('createGame');
      }, 200);
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
      // First check if we're already in a game and need to leave it
      if (lobbyState.gameId) {
        console.log(`[Lobby] Already in game ${lobbyState.gameId}, leaving before joining new game`);
        // Leave the current game first
        const currentGameId = lobbyState.gameId;
        socket.emit('leaveGameLobby', { gameId: currentGameId });
      }
      
      // Reset state completely - create a fresh state object
      const freshState = {
        playerName: lobbyState.playerName,
        gameList: lobbyState.gameList,
        gameId: null,
        gameState: null,
        view: 'lobby',
        error: null,
        isAuthenticated: lobbyState.isAuthenticated
      };
      
      console.log('[Lobby] Resetting state before joining game:', freshState);
      setLobbyState(freshState);
      
      // Join the game after a short delay to ensure state is reset
      setTimeout(() => {
        console.log(`[Lobby] Emitting joinGame event for game: ${gameIdToJoin}`);
        socket.emit('joinGame', { gameId: gameIdToJoin });
      }, 200);
    } else {
      setError('Not connected to server');
    }
  };
  
  /**
   * Return to the lobby from a game
   * Also fetches the updated user balance
   */
  const returnToLobby = () => {
    console.log('[Lobby] Returning to lobby');
    
    // Get the current gameId before resetting state
    const currentGameId = lobbyState.gameId;
    
    // Reset the lobby state completely
    setLobbyState(prevState => ({
      playerName: prevState.playerName,
      gameList: prevState.gameList,
      gameId: null,
      gameState: null,  // Fully clear game state
      view: 'lobby',
      error: null,
      isAuthenticated: prevState.isAuthenticated
    }));
    
    // Then fetch the updated user data and game list
    if (socket && isConnected) {
      console.log('[Lobby] Emitting events to refresh lobby data');
      
      // Tell the server we're leaving the game (new event)
      if (currentGameId) {
        socket.emit('leaveGameLobby', { gameId: currentGameId });
      }
      
      // Fetch updated user data using the /me endpoint
      refreshUserData();
      
      // Request fresh game list
      socket.emit('getGameList');
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
