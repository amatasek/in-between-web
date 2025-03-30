import React from 'react';
import styles from './styles/GameResults.module.css';
import { useGameContext } from '../contexts/GameContext';

const GameResults = () => {
  const { gameState } = useGameContext();

  if (!gameState || !gameState.result) return null;

  const { result } = gameState;
  const { outcome, winnings } = result;

  return (
    <div className={`${styles.resultsContainer} ${styles[outcome]}`}>
      {outcome === 'win' && (
        <div className={styles.winResult}>
          <span className={styles.winIcon}>🎉</span>
          <h2 className={styles.winText}>WIN!</h2>
          <p className={styles.winnings}>+${winnings}</p>
        </div>
      )}
      {outcome === 'tie' && (
        <div className={styles.tieResult}>
          <span className={styles.tieIcon}>⚠️</span>
          <h2 className={styles.tieText}>TIE PENALTY!</h2>
          <p className={styles.tiePenalty}>-${Math.abs(winnings)}</p>
          <p className={styles.tieExplanation}>Pay your bet into the pot again!</p>
        </div>
      )}
      {outcome === 'lose' && (
        <div className={styles.loseResult}>
          <span className={styles.loseIcon}>❌</span>
          <h2 className={styles.loseText}>LOSE</h2>
          <p className={styles.loss}>-${winnings}</p>
        </div>
      )}
    </div>
  );
};

export default GameResults;
