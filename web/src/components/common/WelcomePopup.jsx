import React from 'react';
import styles from './WelcomePopup.module.css';
import { ICONS } from '../../constants/UIConstants';

/**
 * A popup component that displays a welcome message and balance reset notification
 * @param {Object} props - Component props
 * @param {string} props.username - The username to display in the welcome message
 * @param {number} props.balance - The user's reset balance
 * @param {function} props.onClose - Function to call when the popup is closed
 */
const WelcomePopup = ({ username, balance, onClose }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <div className={styles.header}>
          <h2>Welcome, {username}!</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>
        <div className={styles.content}>
          <p className={styles.message}>
            Your balance has been reset to:
          </p>
          <p className={styles.balance}>
            <span className={styles.coinIcon}>{ICONS.COIN}</span>
            <span className={styles.balanceAmount}>{balance}</span>
          </p>
          <p className={styles.subtext}>
            Thank you for participating in the <span className={styles.inlineGameName}>In Between <span className={styles.inlineLiveTag}>LIVE</span></span> beta program. Your feedback is valuable as we continue to enhance the gaming experience.
          </p>
        </div>
        <div className={styles.footer}>
          <button className={styles.actionButton} onClick={onClose}>
            Let's Play!
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePopup;
