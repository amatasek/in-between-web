import React from 'react';
import styles from './CurrencyAmount.module.css';
import CoinIcon from './CoinIcon.jsx';

/**
 * A reusable component that displays currency amounts with consistent styling
 * @param {Object} props - Component props
 * @param {number} props.amount - The amount to display
 * @param {string} props.size - The size of the coin icon (small, medium, large)
 * @param {string} props.background - Optional custom background style (e.g. 'dark', 'pill')
 * @param {string} props.customClass - Optional custom CSS class to apply
 */
const CurrencyAmount = ({ amount = 0, size, background, customClass }) => {
  // Determine which CSS classes to apply
  const containerClasses = [
    styles.currencyAmount,
    background === 'dark' ? styles.darkBackground : '',
    background === 'pill' ? styles.pillBackground : '',
    customClass || ''
  ].filter(Boolean).join(' ');
  
  // Ensure amount is a valid number
  const displayAmount = typeof amount === 'number' ? amount : 0;
  
  return (
    <span className={containerClasses}>
      <CoinIcon size={size} />
      <span>{displayAmount.toLocaleString()}</span>
    </span>
  );
};

export default CurrencyAmount;
