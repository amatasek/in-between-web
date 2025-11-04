import { useEffect, useState } from 'react';
import styles from './styles/GameScreen.module.css';

import { useGameContext } from '../contexts/GameContext';
import { useGamepadNavigation } from '../hooks/useGamepadNavigation';
import { useAuth } from '../contexts/AuthContext';
import EmojiReactions from './EmojiReactions';
import GameHeader from './GameHeader';
import GameLog from './GameLog';
import PlayerList from './PlayerList';
import CardTable from './CardTable';

const GameScreen = ({ onReturnToLobby }) => {
  // Track modal state to hide emoji reactions
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get state and actions from context
  const {
    gameState,
    error,
    clearError
  } = useGameContext();
  const { user } = useAuth();
  const showAds = !user?.subscription?.isPremium;

  // Initialize gamepad navigation
  useGamepadNavigation(true);
  
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

  // Safety check for null gameState or missing phase
  if (!gameState) {
    return (
      <div className={styles.loadingContainer}>
        <p>Loading game state...</p>
      </div>
    );
  }

  return (
    <div className={`screen app-gradient-bg ${styles.gameContainer} ${showAds ? styles.withAds : ''}`}>
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
        <CardTable />

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
