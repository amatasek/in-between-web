import React from 'react';
import styles from './AppHeader.module.css';

/**
 * A shared header component for the In-Between game
 * Used across auth and lobby screens for consistent branding
 */
const AppHeader = () => {
  return (
    <div className={styles.headerContainer}>
      <h1 className={styles.gameTitle}>
        In Between <span className={styles.liveTag}>LIVE</span>
      </h1>
    </div>
  );
};

export default AppHeader;
