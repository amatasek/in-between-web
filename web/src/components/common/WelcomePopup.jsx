import React from 'react';
import styles from './WelcomePopup.module.css';
import CoinIcon from './CoinIcon';

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
      <div className={styles.popup} role="dialog" aria-labelledby="welcome-title">
        <div className={styles.header}>
          <h2 id="welcome-title">Welcome, {username}!</h2>
          <button className={styles.closeButton} onClick={onClose} data-gamepad-focusable="true">×</button>
        </div>
        <div className={styles.content}>
          <p className={styles.message}>
            Your balance has been reset to:
          </p>
          <p className={styles.balance}>
            <CoinIcon size="large" />
            <span className={styles.balanceAmount}>{balance}</span>
          </p>
          <p className={styles.subtext}>
            Thank you for participating in the <span className={styles.inlineGameName}>In Between <span className={styles.inlineLiveTag}>LIVE</span></span> beta program. Your feedback is valuable as we continue to enhance the gaming experience.
          </p>
        </div>
        <div className={styles.footer}>
          <button className={styles.actionButton} onClick={onClose} data-gamepad-focusable="true">
            Let's Play!
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePopup;
