import React from 'react';
import styles from './styles/GameRulesModal.module.css';
import { ICONS } from '../constants/UIConstants';

/**
 * Game Rules Modal that displays the rules of the game
 * @param {Object} props - Component props
 * @param {function} props.onClose - Function to call when the modal is closed
 */
const GameRulesModal = ({ onClose }) => {
  return (
    <div className={styles.modalOverlay} onClick={(e) => {
      // Close when clicking outside the modal content
      if (e.target.className === styles.modalOverlay) {
        onClose();
      }
    }}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Game Rules</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>
        
        <div className={styles.rulesContainer}>
          <section className={styles.ruleSection}>
            <h3>Objective</h3>
            <p>The goal is to bet on whether the third card will have a value that falls "in between" the first two cards.</p>
          </section>

          <section className={styles.ruleSection}>
            <h3>Card Values</h3>
            <p>Cards are valued numerically: 2-10 as face value, Jack = 11, Queen = 12, King = 13, and Ace = 1 or 14 (player's choice).</p>
          </section>

          <section className={styles.ruleSection}>
            <h3>Game Flow</h3>
            <ol className={styles.orderedList}>
              <li>Each player antes up to join the round.</li>
              <li>Two cards are dealt face up.</li>
              <li>Players decide whether to bet or pass.</li>
              <li>The third card is revealed.</li>
              <li>Bets are settled.</li>
            </ol>
          </section>

          <section className={styles.ruleSection}>
            <h3>Betting</h3>
            <p>If you think the third card will fall between the first two cards, you can bet up to the pot amount.</p>
            <p>If you win, you receive the amount of your bet from the pot.</p>
            <p>If you lose, your bet is added to the pot.</p>
          </section>

          <section className={styles.ruleSection}>
            <h3>Special Situations</h3>
            <ul className={styles.unorderedList}>
              <li><strong>Same Value Cards:</strong> If the first two cards have the same value, you automatically lose if you bet and must pay double your bet amount to the pot.</li>
              <li><strong>Consecutive Cards:</strong> If the first two cards are consecutive (e.g., 5 and 6), you automatically lose if you bet.</li>
              <li><strong>Spread:</strong> The wider the spread between cards, the better your chances.</li>
            </ul>
          </section>

          <section className={styles.ruleSection}>
            <h3>POT Button</h3>
            <p>The POT button allows you to bet the entire pot amount at once for maximum winnings.</p>
          </section>
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.closeRulesButton} onClick={onClose}>
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameRulesModal; 