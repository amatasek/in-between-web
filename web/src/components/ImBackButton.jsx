import React from 'react';
import styles from './styles/ImBackButton.module.css';

/**
 * ImBackButton - Button for players to rejoin the game after sitting out
 * Styled to match the new overlay design system
 */
const ImBackButton = ({ onClick }) => {
  return (
    <div className={styles.imBackOverlay}>
      <div className={`panel-game ${styles.container}`}>
        <h3 className={styles.sittingOutText}>You are sitting out</h3>
        <button
          className={styles.imBackButton}
          onClick={onClick}
          data-gamepad-focusable="true"
          autoFocus
        >
          <span className={styles.buttonText}>I'M BACK!</span>
        </button>
        <p className={styles.helpText}>Click to rejoin the game</p>
      </div>
    </div>
  );
};

export default ImBackButton;