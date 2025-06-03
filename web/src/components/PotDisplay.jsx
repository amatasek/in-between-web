import React from 'react';
import styles from './styles/PotDisplay.module.css';
import { useGameContext } from '../contexts/GameContext';
import CurrencyAmount from './common/CurrencyAmount';
import { ICONS } from '../constants/UIConstants';

const PotDisplay = () => {
  const { gameState } = useGameContext();
  
  if (!gameState) return null;
  
  const { pot, round = 1 } = gameState;
  
  return (
    <div className={styles.potDisplayContainer}>
      <div className={styles.potIconWrapper}>
        <span className={styles.potIcon}>{ICONS.POT}</span>
      </div>
      <div className={styles.potInfo}>
        <h3 className={styles.potLabel}>
          POT <span className={styles.potCounter}>({round})</span>
        </h3>
        <span className={styles.potAmount}><CurrencyAmount amount={pot} size="medium" /></span>
      </div>
    </div>
  );
};

export default PotDisplay;
