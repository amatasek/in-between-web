import React from 'react';
import styles from './LoadingScreen.module.css';

/**
 * A reusable loading screen component
 * @param {Object} props
 * @param {string} props.message - The message to display while loading
 */
export const LoadingScreen = ({ message = 'Loading...' }) => {
  return (
    <div className={styles.loadingScreen}>
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  );
};
