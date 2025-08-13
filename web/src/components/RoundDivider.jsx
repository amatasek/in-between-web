import React from 'react';
import styles from './styles/RoundDivider.module.css';

const RoundDivider = ({ roundNumber }) => {
  return (
    <div className={styles.roundDivider}>
      <div className={styles.dividerLine} />
      <span className={styles.roundLabel}>Round {roundNumber}</span>
      <div className={styles.dividerLine} />
    </div>
  );
};

export default RoundDivider;