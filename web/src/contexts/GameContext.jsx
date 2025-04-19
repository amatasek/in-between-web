import React, { createContext, useState, useContext, useEffect, useCallback, useRef } from 'react';
import { useSocket } from './SocketContext.jsx';
import soundService from '../services/SoundService';

// Import shared type definitions
/** @typedef {import('../../../shared/types').GameState} GameState */
/** @typedef {import('../../../shared/types').Card} Card */
/** @typedef {import('../../../shared/types').Player} Player */

// Create context
const GameContext = createContext();

// Custom hook to use the game context
export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};

export const GameProvider = ({ children, gameId, initialGameState = null }) => {
  // Get socket from socket context
  const { socket, error: socketError } = useSocket();
  
  // Game-specific state - we only need to track the full gameState object and error
  /** @type {[GameState|null, React.Dispatch<React.SetStateAction<GameState|null>>]} */
  const [gameState, setGameState] = useState(initialGameState);
  
  // Keep track of previous players to detect joins/leaves
  const prevPlayersRef = useRef({});
  
  // Initialize with the provided game state if available
  useEffect(() => {
    // No need to log the initial state
    // Initialize sound service
    soundService.initialize();
  }, []);
  /** @type {[string|null, React.Dispatch<React.SetStateAction<string|null>>]} */
  const [error, setError] = useState(null);

  // Initialize with socket error if any
  useEffect(() => {
    if (socketError) {
      setError(socketError);
    }
  }, [socketError]);
  // Set up game-specific event handlers
  useEffect(() => {
    if (!socket) return;
    
    // Handle game reconnection
    socket.on('gameReconnected', (data) => {
      console.log(`[Game] Reconnected to game: ${data.gameId}`, data.game);
      
      // Update game state with the full state from the server
      setGameState(data.game);
      
      // Set the player ID to the current user ID (not socket ID)
      if (socket.auth?.userId) {
        setPlayerId(socket.auth.userId);
        console.log(`[Game] Successfully reconnected as user ID: ${socket.auth.userId}`);
      } else {
        // Fallback to socket ID if user ID is not available
        setPlayerId(socket.id);
        console.log(`[Game] Successfully reconnected as socket ID: ${socket.id} (user ID not available)`);
      }
      
      // Clear any errors
      setError(null);
      
      // Play a sound to indicate successful reconnection
      soundService.play('ui.connect');
      
      // CRITICAL: Force a refresh of the player's game state to ensure betting works
      if (data.game && data.game.id) {
        // Small delay to ensure the state is fully updated
        setTimeout(() => {
          console.log(`[Game] Requesting fresh game state after reconnection`);
          socket.emit('getGameState', { gameId: data.game.id });
        }, 500);
      }
    });
    
    // Handle receiving updated game state
    socket.on('gameState', (data) => {
      if (data && data.game) {
        setGameState(data.game);
      }
    });
    
    // The gameJoined event is now handled exclusively in LobbyContext
    // This prevents duplicate event handling issues that were causing
    // game joining problems. By centralizing this event handling, we ensure
    // consistent state transitions between lobby and game views.

    // Game state updates
    socket.on('gameState', (state) => {
      if (state && state.id) {
        // Process game state update
        
        // Check for player joins/leaves
        if (state.players && prevPlayersRef.current) {
          const currentPlayers = Object.keys(state.players);
          const previousPlayers = Object.keys(prevPlayersRef.current);
          
          // Check for new players
          const newPlayers = currentPlayers.filter(id => !previousPlayers.includes(id));
          
          // Check for players who left
          const leftPlayers = previousPlayers.filter(id => !currentPlayers.includes(id));
          
          // Play join sound for new players
          if (newPlayers.length > 0) {
            soundService.play('ui.join');
          }
          
          // Play leave sound for players who left
          if (leftPlayers.length > 0) {
            soundService.play('ui.leave');
          }
          
          // Update previous players reference
          prevPlayersRef.current = {...state.players};
        }
        
        setGameState({...state});
      }
    });

    // Legacy handler for backward compatibility
    socket.on('gameUpdate', (state) => {
      if (state && state.id) {
        // Handle legacy game update format
        setGameState({...state});
      }
    });

    // Game-specific error handling
    socket.on('gameError', (message) => {
      console.error('Game error:', message);
      setError(message);
    });
    
    // Clean up game-specific event listeners
    return () => {
      // We don't clean up the gameJoined event here anymore since it's now
      // exclusively handled by LobbyContext
      socket.off('gameReconnected');
      socket.off('gameState');
      socket.off('gameUpdate');
      socket.off('gameError');
    };
  }, [socket]);

  // Game-specific actions
  const placeBet = useCallback((amount) => {
    if (!socket || !gameId) return;
    
    try {
      socket.emit('placeBet', { bet: amount, gameId });
    } catch (err) {
      console.error('Error placing bet:', err);
      setError('Failed to place bet. Please try again.');
    }
  }, [socket, gameId]);
  
  const payAnte = useCallback(() => {
    if (!socket || !gameId) return;
    
    try {
      socket.emit('payAnte', { gameId });
    } catch (err) {
      console.error('Error paying ante:', err);
      setError('Failed to pay ante. Please try again.');
    }
  }, [socket, gameId]);

  const dealCards = useCallback(() => {
    if (!socket || !gameId) return;
    
    try {
      socket.emit('dealCards', { gameId });
    } catch (err) {
      console.error('Error dealing cards:', err);
      setError('Failed to deal cards. Please try again.');
    }
  }, [socket, gameId]);
  
  const revealMiddleCard = useCallback(() => {
    if (!socket || !gameId) return;
    
    try {
      socket.emit('revealMiddleCard', { gameId });
    } catch (err) {
      console.error('Error revealing middle card:', err);
      setError('Failed to reveal middle card. Please try again.');
    }
  }, [socket, gameId]);
  
  const nextRound = useCallback(() => {
    if (!socket || !gameId) return;
    
    try {
      socket.emit('nextRound', { gameId });
    } catch (err) {
      console.error('Error moving to next round:', err);
      setError('Failed to move to next round. Please try again.');
    }
  }, [socket, gameId]);
  
  // Player ready function (for paying ante)
  const playerReady = useCallback(() => {
    if (!socket || !gameId) return;
    
    try {
      // Server is listening for 'ready' event, not 'playerReady'
      socket.emit('ready');
    } catch (err) {
      console.error('Error setting player ready:', err);
      setError('Failed to set player ready. Please try again.');
    }
  }, [socket, gameId]);
  
  // Player unready function (withdraw ante)
  const playerUnready = useCallback(() => {
    if (!socket || !gameId) return;
    
    try {
      socket.emit('unready');
    } catch (err) {
      console.error('Error setting player unready:', err);
      setError('Failed to set player unready. Please try again.');
    }
  }, [socket, gameId]);

  /**
   * @typedef {Object} GameContextValue
   * @property {GameState|null} gameState - The complete game state
   * @property {string|null} error - Any error message 
   * @property {(amount: number) => void} placeBet - Function to place a bet
   * @property {() => void} payAnte - Function to pay the ante
   * @property {() => void} playerReady - Function to set player ready (pay ante)
   * @property {() => void} playerUnready - Function to set player unready (withdraw ante)
   * @property {() => void} dealCards - Function to deal cards
   * @property {() => void} revealMiddleCard - Function to reveal the middle card
   * @property {() => void} nextRound - Function to move to the next round
   * @property {() => void} clearError - Function to clear any error
   * @property {string|null} gameId - Current game ID
   */

  /** @type {GameContextValue} */
  const value = {
    // Game state - just provide the complete gameState object
    gameState,
    error,
    gameId,
    
    // Game actions
    placeBet,
    payAnte,
    playerReady,
    playerUnready,
    dealCards,
    revealMiddleCard,
    nextRound,
    // Helper methods
    clearError: () => setError(null)
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

// Named exports for specific pieces of state/actions
export const useGameState = () => {
  const { gameState, players, currentPlayer, cards, gamePhase, dealerName, deckNumber, remainingCards, error } = useGameContext();
  return { gameState, players, currentPlayer, cards, gamePhase, dealerName, deckNumber, remainingCards, error };
};

export const useGameActions = () => {
  const { placeBet, payAnte, dealCards, revealMiddleCard, nextRound, clearError } = useGameContext();
  return { placeBet, payAnte, dealCards, revealMiddleCard, nextRound, clearError };
};

export default GameContext;
