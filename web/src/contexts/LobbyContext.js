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
    error: null
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
    if (!socket) return;
    
    // Game list updates
    socket.on('gameList', (games) => {
      setLobbyState(prevState => ({ ...prevState, gameList: games }));
    });
    
    // Game joined response (after creation or joining)
    socket.on('gameJoined', (data) => {
      console.log('Game joined:', data);
      if (!data || !data.game || !data.game.id || !data.game.phase) {
        console.error('Invalid game data received:', data);
        setError('Invalid game data received from server');
        return;
      }
      
      // First store the complete game state
      setLobbyState(prevState => ({
        ...prevState,
        gameId: data.game.id,
        gameState: data.game,
        // Only change the view after we have a valid game state
        view: 'game'
      }));
      
      // Notify parent component
      if (onGameJoined) {
        onGameJoined(data.game.id);
      }
    });
    
    // Note: The server now uses 'gameJoined' for both creating and joining a game
    
    // Clean up listeners
    return () => {
      socket.off('gameList');
      socket.off('gameJoined');
      socket.off('error');
    };
  }, [socket]);
  
  /**
   * Create a new game with the current player as host
   */
  const createGame = () => {
    if (!lobbyState.playerName.trim()) {
      setError('Player name is required');
      return;
    }
    
    if (socket && isConnected) {
      console.log('Creating game with player name:', lobbyState.playerName);
      socket.emit('createGame', lobbyState.playerName);
    } else {
      setError('Not connected to server');
    }
  };
  
  /**
   * Join an existing game by ID
   * @param {string} gameIdToJoin - The ID of the game to join
   */
  const joinGame = (gameIdToJoin) => {
    if (!lobbyState.playerName.trim()) {
      setError('Player name is required');
      return;
    }
    
    if (!gameIdToJoin) {
      setError('Game ID is required');
      return;
    }
    
    if (socket && isConnected) {
      console.log('Joining game:', gameIdToJoin, 'with player name:', lobbyState.playerName);
      socket.emit('joinGame', { gameId: gameIdToJoin, playerName: lobbyState.playerName });
    } else {
      setError('Not connected to server');
    }
  };
  
  /**
   * Return to the lobby from a game
   */
  const returnToLobby = () => {
    setLobbyState(prevState => ({
      ...prevState,
      view: 'lobby',
      gameId: null
    }));
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
