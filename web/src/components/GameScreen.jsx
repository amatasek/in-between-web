import React, { useEffect, useState } from 'react';
import styles from './styles/GameScreen.module.css';
import GameHeader from './GameHeader.jsx';
import Table from './Table.jsx';
import PlayerList from './PlayerList.jsx';
import GameLog from './GameLog.jsx';
import EmojiReactions from './EmojiReactions.jsx';

import { useGameContext } from '../contexts/GameContext';
import { useSocket } from '../contexts/SocketContext';
import { useAuth } from '../contexts/AuthContext';
import { useGamepadNavigation } from '../hooks/useGamepadNavigation';

const GameScreen = ({ onReturnToLobby }) => {
  // Track modal state to hide emoji reactions
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Get state and actions from context
  const { 
    gameState,
    error,
    clearError
  } = useGameContext();
  
  // Initialize gamepad navigation
  const { isGamepadConnected } = useGamepadNavigation(true);
  
  // Auto-clear errors after 10 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError();
      }, 10000); // 10 seconds
      
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);
  
  // Handle returning to lobby
  const handleLeaveGame = () => {
    // Call the parent callback
    if (onReturnToLobby) {
      onReturnToLobby();
    }
  };
  
  // Get the socket instance for event emission
  const { socket } = useSocket(); 
  // Get the authenticated user data from AuthContext
  const { user } = useAuth(); 
  
  // Safety check for null gameState or missing phase
  if (!gameState) {
    return (
      <div className={styles.loadingContainer}>
        <p>Loading game state...</p>
      </div>
    );
  }
  
  // Make sure we have a valid phase
  const phase = gameState.phase || 'waiting';

  // Find the current player based on the authenticated user ID from AuthContext
  // Assuming the user object from AuthContext has an 'id' property
  const currentUserId = user?.id; // Use user.id (adjust if property name is different e.g., user.userId)
  const currentPlayer = gameState.players && currentUserId ? gameState.players[currentUserId] : null;



  return (
    <div className={`screen ${styles.gameContainer}`}>
      <div className={`${styles.gameScreen} mobile-scale-content`}>
        <GameHeader 
          handleLeaveGame={handleLeaveGame} 
          onModalStateChange={setIsModalOpen}
        />
        
        {error && (
          <div className={styles.errorContainer}>
            <p className={styles.errorText}>{error}</p>
          </div>
        )}
        
        {/* Game table with integrated controls */}
        <div className={styles.tableWrapper}>
          <Table />
        </div>
        
        <div className={styles.gameBottomSection}>
          <PlayerList />
          <GameLog />
        </div>
      </div>
      
      {/* Emoji reactions - positioned outside scaled content, hidden when modal is open */}
      {!isModalOpen && <EmojiReactions />}
    </div>
  );
};

export default GameScreen;
