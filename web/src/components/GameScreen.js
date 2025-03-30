import React from 'react';
import styles from './styles/GameScreen.module.css';
import GameHeader from './GameHeader';
import CardDisplay from './CardDisplay';
import BettingPanel from './BettingPanel';
import PlayerList from './PlayerList';
import PotDisplay from './PotDisplay';
import AnteControls from './AnteControls';
import ResultsPanel from './ResultsPanel';

import { useGameContext } from '../contexts/GameContext';
import { useSocket } from '../contexts/SocketContext';

const GameScreen = ({ onReturnToLobby }) => {
  // Get state and actions from context
  const { 
    gameState,
    error,
    clearError
  } = useGameContext();
  
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
    <div className={styles.gameScreen}>
      <GameHeader handleLeaveGame={handleLeaveGame} />
      
      {error && (
        <div className={styles.errorContainer}>
          <p className={styles.errorText}>{error}</p>
        </div>
      )}
      
      <div className={styles.potDisplayWrapper}>
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
      ) : (
        /* Show the betting panel during other phases */
        <BettingPanel />
      )}
      
      
      <PlayerList />
    </div>
  );
};

export default GameScreen;
