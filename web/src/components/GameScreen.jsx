import React, { useEffect } from 'react';
import styles from './styles/GameScreen.module.css';
import GameHeader from './GameHeader.jsx';
import CardDisplay from './CardDisplay.jsx';
import BettingPanel from './BettingPanel.jsx';
import PlayerList from './PlayerList.jsx';
import PotDisplay from './PotDisplay.jsx';
import DeckDisplay from './DeckDisplay.jsx';
import AnteControls from './AnteControls.jsx';
import ResultsPanel from './ResultsPanel.jsx';
import AceChoicePanel from './AceChoicePanel.jsx';
import SecondChancePanel from './SecondChancePanel.jsx';
import GameLog from './GameLog.jsx';

import { useGameContext } from '../contexts/GameContext';
import { useSocket } from '../contexts/SocketContext';
import { useAuth } from '../contexts/AuthContext';
import { useGamepadNavigation } from '../hooks/useGamepadNavigation';

const GameScreen = ({ onReturnToLobby }) => {
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

  // Handler for the 'I'm Back' button
  const handleImBackClick = () => {
    if (socket && gameState.id) {
      socket.emit('imBack', { gameId: gameState.id });
    } else {
      console.error("Cannot emit 'imBack': socket or gameId missing.");
    }
  };


  return (
    <div className={styles.gameContainer}>
      <div className={styles.gameScreen}>
        <GameHeader handleLeaveGame={handleLeaveGame} />
        
        {error && (
          <div className={styles.errorContainer}>
            <p className={styles.errorText}>{error}</p>
          </div>
        )}
        
        <div className={styles.gameInfoWrapper}>
          <DeckDisplay />
          <PotDisplay />
        </div>
        
        {/* Always show the CardDisplay component */}
        <CardDisplay />
        
        {/* Primary check: Is the current player sitting out? */}
        {currentPlayer?.isSittingOut ? (
          // If sitting out, always show the 'I'm Back!' button regardless of phase
          <button onClick={handleImBackClick} className={styles.imBackButton} data-gamepad-focusable="true"> 
            I'm Back!
          </button>
        ) : (
          // If not sitting out, render controls based on the game phase
          phase === 'waiting' ? (
            /* Show ante controls during waiting phase */
            <AnteControls />
          ) : phase === 'results' ? (
            /* Show the results panel during results phase */
            <ResultsPanel />
          ) : gameState.waitingForAceDecision ? (
            /* Show the Ace choice panel when first card is an Ace */
            <AceChoicePanel />
          ) : gameState.waitingForSecondChance ? (
            /* Show the Second Chance panel when matching cards are dealt */
            <SecondChancePanel />
          ) : phase === 'betting' ? (
            /* Show the betting panel only during betting phase */
            <BettingPanel />
          ) : null
        )}
        
        <div className={styles.gameBottomSection}>
          <div className={styles.playerListContainer}>
            <PlayerList />
          </div>
          <div className={styles.gameLogContainer}>
            <GameLog />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameScreen;
