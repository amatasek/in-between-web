import React from 'react';
import styles from './styles/DeckDisplay.module.css';
import { useGameContext } from '../contexts/GameContext';
import { ICONS } from '../constants/UIConstants';

const DeckDisplay = () => {
  const { gameState } = useGameContext();
  
  if (!gameState) return null;
  
  // Get the deck size from the game state
  const { deckSize = 0 } = gameState;
  
  // Calculate the visual thickness of the deck based on remaining cards
  const getThicknessClass = () => {
    if (deckSize >= 40) return styles.deckThick;
    if (deckSize >= 25) return styles.deckMedium;
    if (deckSize >= 10) return styles.deckThin;
    return styles.deckVeryThin;
  };
  
  return (
    <div className={styles.deckDisplayContainer}>
      <div className={`${styles.deckVisual} ${getThicknessClass()}`}>
        <div className={styles.deckIcon}>{ICONS.DECK}</div>
      </div>
      <div className={styles.deckInfo}>
        <h3 className={styles.deckLabel}>DECK</h3>
        <span className={styles.deckCount}>{deckSize}</span>
      </div>
    </div>
  );
};

export default DeckDisplay;
