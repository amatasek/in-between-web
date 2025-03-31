import React from 'react';
import styles from './CurrencyAmount.module.css';
import CoinIcon from './CoinIcon';

/**
 * A reusable component that displays currency amounts with consistent styling
 * @param {Object} props - Component props
 * @param {number} props.amount - The amount to display
 * @param {string} props.size - The size of the coin icon (small, medium, large)
 */
const CurrencyAmount = ({ amount, size }) => {
  return (
    <span className={styles.currencyAmount}>
      <CoinIcon size={size} />
      <span>{amount}</span>
    </span>
  );
};

export default CurrencyAmount;
