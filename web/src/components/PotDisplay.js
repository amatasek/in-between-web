import React from 'react';
import styles from './styles/PotDisplay.module.css';
import { useGameContext } from '../contexts/GameContext';

const PotDisplay = () => {
  const { gameState } = useGameContext();
  
  if (!gameState) return null;
  
  const { pot } = gameState;
  
  return (
    <div className={styles.potDisplayContainer}>
      <div className={styles.potIconWrapper}>
        <span className={styles.potIcon}>🍯</span>
      </div>
      <div className={styles.potInfo}>
        <h3 className={styles.potLabel}>POT</h3>
        <span className={styles.potAmount}>${pot}</span>
      </div>
    </div>
  );
};

export default PotDisplay;
