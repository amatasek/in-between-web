import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useSocket } from './SocketContext.jsx';
import { useAuth } from './AuthContext.jsx';
import soundService from '../services/SoundService';

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
  
  // Get user from auth context
  const { user } = useAuth();
  
  // Game-specific state - we only need to track the full gameState object and error
  /** @type {[GameState|null, React.Dispatch<React.SetStateAction<GameState|null>>]} */
  const [gameState, setGameState] = useState(initialGameState);

  // Keep track of previous active player to detect turn changes
  const prevActivePlayerRef = useRef(null);
  
  /** @type {[string|null, React.Dispatch<React.SetStateAction<string|null>>]} */
  const [error, setError] = useState(null);

  // Function to explicitly clear the provider's error state
  const clearError = useCallback(() => {
    setError(null);
  }, []);

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
      
      // Log reconnection with user ID from AuthContext
      console.log(`[Game] Successfully reconnected as user ID: ${user?.id}`);
      
      // Clear any errors
      setError(null);

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
      if (data && data.id) { 
        // Restore check to prevent setting identical state
        if (JSON.stringify(gameState) !== JSON.stringify(data)) {
          // Check if it's now the player's turn and play alert sound if needed
          if (data.currentPlayerId && user?.id) {
            const isMyTurn = data.currentPlayerId === user.id;
            const wasPreviouslyMyTurn = prevActivePlayerRef.current === user.id;
            
            // Only play sound if it wasn't my turn before but now it is
            if (isMyTurn && !wasPreviouslyMyTurn) {
              soundService.play('ui.alert');
            }
            
            // Update the previous active player reference
            prevActivePlayerRef.current = data.currentPlayerId;
          }
          
          setGameState(data);
          clearError(); // Clear any previous context errors on successful state update
        } 
      } else {
      }
    });
    
    // Game-specific error handling
    socket.on('gameError', (message) => {
      console.error('Game error:', message);
      setError(message);
    });
    
    // Clean up game-specific event listeners
    return () => {
      socket.off('gameReconnected');
      socket.off('gameState');
      socket.off('gameError');
    };
  }, [socket, clearError, gameState, user]);

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
    clearError,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

// Named exports for specific pieces of state/actions
export const useGameState = () => {
  const { gameState, error } = useGameContext();
  return { gameState, error };
};

export const useGameActions = () => {
  const { placeBet, payAnte, dealCards, revealMiddleCard, nextRound, clearError } = useGameContext();
  return { placeBet, payAnte, dealCards, revealMiddleCard, nextRound, clearError };
};

export default GameContext;
