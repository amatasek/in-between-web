import React from 'react';
import styles from './styles/PotButton.module.css';
import CurrencyAmount from './common/CurrencyAmount';

/**
 * PotButton - The most epic, baller button in the entire game
 * Features a shimmering gold border with a shiny silver background to make the gold currency pop
 * Includes multiple overlapping layers and effects for maximum visual impact
 * 
 * @param {Object} props - Component props
 * @param {number} props.amount - The pot amount to display
 * @param {boolean} props.disabled - Whether the button is disabled
 * @param {function} props.onClick - Function to call when the button is clicked
 */
const PotButton = ({ amount, disabled, onClick, ...props }) => {
  return (
    <button
      className={`${styles.potButton} ${disabled ? styles.disabled : ''}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={`Bet the pot: ${amount} chips`}
      {...props}
    >
      {/* Layer 2: Gold border with texture */}
      <div className={styles.shimmerBorder}></div>
      
      {/* Layer 4: Silver metallic background */}
      <div className={styles.buttonBackground}></div>
      
      {/* Layer 5: Light reflection effects */}
      <div className={styles.reflectionEffect}></div>
      
      {/* Layer 6-8: Button content with 3D transform */}
      <div className={styles.buttonContent}>
        <span className={styles.potText}>POT</span>
        <span className={styles.potAmount}>
          <CurrencyAmount amount={amount} background="pill" />
        </span>
      </div>
    </button>
  );
};

export default PotButton;
