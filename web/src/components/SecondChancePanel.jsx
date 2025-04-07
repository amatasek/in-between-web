import React, { useState, useEffect } from 'react';
import styles from './styles/SecondChancePanel.module.css';
import { useGameContext } from '../contexts/GameContext';
import { useSocket } from '../contexts/SocketContext';
import CurrencyAmount from './common/CurrencyAmount';

const SecondChancePanel = () => {
  const { gameState } = useGameContext();
  const { socket } = useSocket();
  const [loading, setLoading] = useState(false);
  const [actionType, setActionType] = useState(null); // 'ante' or 'pass'
  const [countdown, setCountdown] = useState(15);
  
  // Set up countdown timer when the component mounts
  useEffect(() => {
    if (gameState?.waitingForSecondChance && socket?.id === gameState.currentPlayerId) {
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
  }, [gameState?.waitingForSecondChance, gameState?.currentPlayerId, socket?.id]);
  
  const { 
    players, 
    currentPlayerId, 
    anteAmount = 1
  } = gameState;
  
  const isCurrentPlayer = socket && currentPlayerId === socket.id;
  const currentPlayer = players[currentPlayerId];
  
  const handleSecondChance = (anteAgain) => {
    if (socket) {
      setLoading(true);
      setActionType(anteAgain ? 'ante' : 'pass');
      socket.emit('secondChance', { anteAgain });
    }
  };
  
  const renderSecondChanceControls = () => {
    if (!isCurrentPlayer) return null;
    
    return (
      <div className={styles.secondChanceControls}>
        <p className={styles.secondChanceText}>
          Would you like to ante up again for a second chance?
          <span className={styles.countdown}> ({countdown}s)</span>
        </p>
        
        <div className={styles.secondChanceButtons}>
          <button
            className={`${styles.secondChanceButton} ${styles.anteAgainButton}`}
            onClick={() => handleSecondChance(true)}
          >
            {loading && actionType === 'ante' ? 'Processing...' : (
              <>
                Ante Up <span className={styles.currencyWrapper}>
                  <CurrencyAmount amount={anteAmount} size="small" />
                </span>
              </>
            )}
          </button>
          <button
            className={`${styles.secondChanceButton} ${styles.passButton}`}
            onClick={() => handleSecondChance(false)}
          >
            {loading && actionType === 'pass' ? 'Processing...' : 'Pass'}
          </button>
        </div>
      </div>
    );
  };
  
  const renderWaitingMessage = () => {
    if (isCurrentPlayer) return null;
    
    return (
      <div className={styles.waitingMessage}>
          <p className={styles.waitingText}>
            {currentPlayer?.name} is deciding whether to take a second chance.
          </p>
      </div>
    );
  };
  
  return (
    <div className={styles.secondChancePanel}>
      {renderSecondChanceControls()}
      {renderWaitingMessage()}
    </div>
  );
};

export default SecondChancePanel;
