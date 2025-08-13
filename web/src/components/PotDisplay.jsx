import React from 'react';
import styles from './styles/PotDisplay.module.css';
import { useGameContext } from '../contexts/GameContext';
import CurrencyAmount from './common/CurrencyAmount';

const PotDisplay = () => {
  const { gameState } = useGameContext();
  
  if (!gameState) return null;
  
  const { pot = 0 } = gameState;
  
  return (
    <div className={styles.potDisplay}>
      <span className={styles.potLabel}>POT</span>
      <CurrencyAmount amount={pot} size="large" />
    </div>
  );
};

export default PotDisplay;
