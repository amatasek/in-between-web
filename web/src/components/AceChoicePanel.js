import React from 'react';
import styles from './styles/AceChoicePanel.module.css';
import { useSocket } from '../contexts/SocketContext';
import { useGameContext } from '../contexts/GameContext';
import { useAuth } from '../contexts/AuthContext';
import ArrowIcon from './icons/ArrowIcon';

const AceChoicePanel = () => {
  const { socket } = useSocket();
  const { gameState } = useGameContext();
  const { user } = useAuth();
  
  const handleAceChoice = (isAceLow) => {
    socket.emit('chooseAceValue', { isAceLow });
  };
  
  // Only show if we're waiting for an Ace decision
  if (!gameState?.waitingForAceDecision) {
    return null;
  }
  
  // Check if it's the current player's turn
  const isCurrentPlayersTurn = socket?.id === gameState.currentPlayerId;
  const currentPlayerName = gameState.players[gameState.currentPlayerId]?.name || 'Current player';
  
  return (
    <div className={styles.aceChoiceContainer}>
      <div className={styles.aceChoiceContent}>
        {isCurrentPlayersTurn ? (
          <>
            <h3 className={styles.aceChoiceTitle}>Choose Ace Value</h3>
            <p className={styles.aceChoiceDescription}>
              You've been dealt an Ace! Choose whether it should be high or low.
            </p>
            <div className={styles.aceChoiceButtons}>
              <button 
                className={`${styles.aceChoiceButton} ${styles.aceHighButton}`}
                onClick={() => handleAceChoice(false)}
              >
                <span className={styles.buttonContent}>ACE HIGH <ArrowIcon direction="up" color="white" size={20} /></span>
              </button>
              <button 
                className={`${styles.aceChoiceButton} ${styles.aceLowButton}`}
                onClick={() => handleAceChoice(true)}
              >
                <span className={styles.buttonContent}>ACE LOW <ArrowIcon direction="down" color="white" size={20} /></span>
              </button>
            </div>
          </>
        ) : (
          <>
            <h3 className={styles.aceChoiceTitle}>Waiting for Player</h3>
            <p className={styles.aceChoiceDescription}>
              {currentPlayerName} is choosing whether their Ace is high or low...
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default AceChoicePanel;
