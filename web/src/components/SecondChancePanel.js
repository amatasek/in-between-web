import React, { useState } from 'react';
import styles from './styles/SecondChancePanel.module.css';
import { useGameContext } from '../contexts/GameContext';
import { useSocket } from '../contexts/SocketContext';
import CurrencyAmount from './common/CurrencyAmount';

const SecondChancePanel = () => {
  const { gameState } = useGameContext();
  const { socket } = useSocket();
  const [loading, setLoading] = useState(false);
  const [actionType, setActionType] = useState(null); // 'ante' or 'pass'
  
  const { 
    players, 
    currentPlayerId, 
    phase,
    waitingForSecondChance,
    anteAmount = 1
  } = gameState;
  
  // Only show in dealing phase when waiting for second chance decision
  if (phase !== 'dealing' || !waitingForSecondChance) return null;
  
  const isCurrentPlayer = socket && currentPlayerId === socket.id;
  const currentPlayer = players[currentPlayerId];
  
  const handleSecondChance = (anteAgain) => {
    if (socket) {
      setLoading(true);
      setActionType(anteAgain ? 'ante' : 'pass');
      socket.emit('secondChance', { anteAgain });
    }
  };
  
  return (
    <div className={styles.secondChanceContainer}>
      <div className={styles.secondChanceContent}>
        {isCurrentPlayer ? (
          <>
            <h3 className={styles.secondChanceTitle}>Second chance?</h3>
            <p className={styles.secondChanceDescription}>
              You've been dealt an impossible to win hand. Would you like to ante up again for a second chance?
            </p>
            <div className={styles.secondChanceButtons}>
              <button
                className={`${styles.secondChanceButton} ${styles.anteAgainButton}`}
                onClick={() => handleSecondChance(true)}
              >
                {loading && actionType === 'ante' ? 'Processing...' : (
                  <>
                    Ante Up Again <span className={styles.currencyWrapper}>
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
          </>
        ) : (
          <>
            <h3 className={styles.secondChanceTitle}>Waiting for Player</h3>
            <p className={styles.secondChanceDescription}>
              {currentPlayer?.name} has an impossible to win hand and is deciding whether to take a second chance.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default SecondChancePanel;
