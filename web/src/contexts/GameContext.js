import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useSocket } from './SocketContext';

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
  
  // If we have an initial game state, log it
  useEffect(() => {
    if (initialGameState) {
      console.log('GameProvider initialized with game state:', initialGameState);
    }
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
    
    // Handle gameJoined event - initial game state
    socket.on('gameJoined', (data) => {
      if (data && data.game) {
        console.log('Game joined with initial state:', data);
        setGameState({...data.game});
      }
    });

    // Game state updates
    socket.on('gameState', (state) => {
      if (state && state.id) {
        console.log(`[CLIENT:${state.id}] Game state updated - Phase: ${state.phase}`);
        
        // Check for dealer change notification
        if (state.dealerChanged) {
          // Create a modified state that will keep dealerChanged true for 5 seconds
          const enhancedState = {...state};
          
          // Update the game state immediately
          setGameState(enhancedState);
          
          // After 5 seconds, update the state again with dealerChanged set to false
          setTimeout(() => {
            setGameState(prevState => {
              if (prevState) {
                return {...prevState, dealerChanged: false};
              }
              return prevState;
            });
          }, 5000);
        } else {
          // Just update the game state normally
          setGameState({...state});
        }
      }
    });

    // Legacy handler for backward compatibility
    socket.on('gameUpdate', (state) => {
      if (state && state.id) {
        console.log(`[CLIENT:${state.id}] Legacy gameUpdate received`);
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
      socket.off('gameJoined');
      socket.off('gameState');
      socket.off('gameUpdate');
      socket.off('gameError');
    };
  }, [socket]);

  // Game-specific actions
  const placeBet = useCallback((amount) => {
    if (!socket || !gameId) return;
    
    try {
      socket.emit('placeBet', { amount, gameId });
      console.log('Placing bet:', amount);
    } catch (err) {
      console.error('Error placing bet:', err);
      setError('Failed to place bet. Please try again.');
    }
  }, [socket, gameId]);
  
  const payAnte = useCallback(() => {
    if (!socket || !gameId) return;
    
    try {
      socket.emit('payAnte', { gameId });
      console.log('Paying ante');
    } catch (err) {
      console.error('Error paying ante:', err);
      setError('Failed to pay ante. Please try again.');
    }
  }, [socket, gameId]);

  const dealCards = useCallback(() => {
    if (!socket || !gameId) return;
    
    try {
      socket.emit('dealCards', { gameId });
      console.log('Dealing cards');
    } catch (err) {
      console.error('Error dealing cards:', err);
      setError('Failed to deal cards. Please try again.');
    }
  }, [socket, gameId]);
  
  const revealMiddleCard = useCallback(() => {
    if (!socket || !gameId) return;
    
    try {
      socket.emit('revealMiddleCard', { gameId });
      console.log('Revealing middle card');
    } catch (err) {
      console.error('Error revealing middle card:', err);
      setError('Failed to reveal middle card. Please try again.');
    }
  }, [socket, gameId]);
  
  const nextRound = useCallback(() => {
    if (!socket || !gameId) return;
    
    try {
      socket.emit('nextRound', { gameId });
      console.log('Moving to next round');
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
      console.log('Player ready (paying ante)');
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
      console.log('Player becoming unready');
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
  const { gameState, players, currentPlayer, cards, gamePhase, dealerName, deckNumber, remainingCards, dealerChanged, error } = useGameContext();
  return { gameState, players, currentPlayer, cards, gamePhase, dealerName, deckNumber, remainingCards, dealerChanged, error };
};

export const useGameActions = () => {
  const { placeBet, payAnte, dealCards, revealMiddleCard, nextRound, clearError } = useGameContext();
  return { placeBet, payAnte, dealCards, revealMiddleCard, nextRound, clearError };
};

export default GameContext;
