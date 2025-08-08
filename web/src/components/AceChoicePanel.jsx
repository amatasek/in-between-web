import React, { useState, useEffect } from 'react';
import styles from './styles/AceChoicePanel.module.css';
import { useSocket } from '../contexts/SocketContext';
import { useGameContext } from '../contexts/GameContext';
import { useAuth } from '../contexts/AuthContext';
import ArrowIcon from './icons/ArrowIcon';

const AceChoicePanel = () => {
  const { socket } = useSocket();
  const { gameState } = useGameContext();
  const { user } = useAuth();
  const [countdown, setCountdown] = useState(15);
  
  // Set up countdown timer when the component mounts
  useEffect(() => {
    if (gameState?.waitingForAceDecision && socket?.auth?.userId === gameState.currentPlayerId) {
      setCountdown(15); // Reset to 15 seconds
      
      const timer = setInterval(() => {
        setCountdown(prevCount => {
          if (prevCount <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prevCount - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [gameState?.waitingForAceDecision, gameState?.currentPlayerId, socket?.auth?.userId]);
  
  const handleAceChoice = (isAceLow) => {
    socket.emit('chooseAceValue', { isAceLow });
  };
  
  // Check if it's the current player's turn
  const isCurrentPlayersTurn = socket?.auth?.userId === gameState.currentPlayerId;
  const currentPlayerName = gameState.players[gameState.currentPlayerId]?.name || 'Current player';
  
  const renderAceChoiceControls = () => {
    if (!isCurrentPlayersTurn) return null;
    
    return (
      <div className="panel-alt" style={{ width: '100%', marginBottom: '0.5rem', alignItems: 'center' }}>
        <p className={styles.aceChoiceText}>
          You've been dealt an Ace! Choose whether it should be high or low.
          <span className={styles.countdown}> ({countdown}s)</span>
        </p>
        
        <div className={styles.aceChoiceButtons}>
          <button 
            className="btn btn-primary"
            onClick={() => handleAceChoice(true)}
            data-gamepad-focusable="true"
            autoFocus
          >
            <span className={styles.buttonContent}>ACE LOW <ArrowIcon direction="down" color="white" size={20} /></span>
          </button>
          <button 
            className="btn btn-tertiary"
            onClick={() => handleAceChoice(false)}
            data-gamepad-focusable="true"
          >
            <span className={styles.buttonContent}>ACE HIGH <ArrowIcon direction="up" color="white" size={20} /></span>
          </button>
        </div>
      </div>
    );
  };
  
  const renderWaitingMessage = () => {
    if (isCurrentPlayersTurn) return null;
    
    return (
      <div className="panel-alt" style={{ width: '100%', marginBottom: '0.5rem' }}>
        <p className={styles.waitingText}>
          {currentPlayerName} is choosing whether their Ace is high or low...
        </p>
      </div>
    );
  };
  
  return (
    <div className={styles.aceChoicePanel}>
      {renderAceChoiceControls()}
      {renderWaitingMessage()}
    </div>
  );
};

export default AceChoicePanel;
