import React, { useEffect } from 'react';
import styles from './styles/GameScreen.module.css';
import GameHeader from './GameHeader';
import CardDisplay from './CardDisplay';
import BettingPanel from './BettingPanel';
import PlayerList from './PlayerList';
import PotDisplay from './PotDisplay';
import DeckDisplay from './DeckDisplay';
import AnteControls from './AnteControls';
import ResultsPanel from './ResultsPanel';
import AceChoicePanel from './AceChoicePanel';
import SecondChancePanel from './SecondChancePanel';
import GameLog from './GameLog';

import { useGameContext } from '../contexts/GameContext';
import { useSocket } from '../contexts/SocketContext';

const GameScreen = ({ onReturnToLobby }) => {
  // Get state and actions from context
  const { 
    gameState,
    error,
    clearError
  } = useGameContext();
  
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
  
  // Get the socket instance for player identification
  const { socket } = useSocket();
  
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
        
        {phase === 'waiting' ? (
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
        ) : null}
        
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
