import React from 'react';
import styles from './styles/RevealingOverlay.module.css';
import CurrencyAmount from './common/CurrencyAmount';
import Username from './Username';

const RevealingOverlay = ({ playerName, betAmount }) => {
  if (!playerName || !betAmount) return null;
  
  return (
    <div className={`panel-game ${styles.revealingOverlay}`}>
      <div className={styles.revealingContent}>
        <span className={styles.playerName}><Username username={playerName} /></span>
        <span className={styles.actionText}>bets</span>
        <div className={styles.betAmount}>
          <CurrencyAmount amount={betAmount} size="small" />
        </div>
      </div>
    </div>
  );
};

export default RevealingOverlay;