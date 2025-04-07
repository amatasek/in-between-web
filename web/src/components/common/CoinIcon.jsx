import React from 'react';
import styles from './CoinIcon.module.css';
import { ICONS } from '../../constants/UIConstants';

/**
 * A reusable coin icon component to replace dollar signs
 * @param {Object} props - Component props
 * @param {string} [props.size='small'] - Size of the coin icon ('small', 'medium', 'large')
 * @param {string} [props.className] - Additional CSS class to apply
 */
const CoinIcon = ({ size = 'small', className = '' }) => {
  return (
    <span className={`${styles.coinIcon} ${styles[size]} ${className}`}>
      {ICONS.COIN}
    </span>
  );
};

export default CoinIcon;
