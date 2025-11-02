import styles from './styles/PotButton.module.css';
import CurrencyAmount from './common/CurrencyAmount';

/**
 * PotButton - A special betting button for betting the entire pot
 * Styled to match other betting buttons but with dramatic golden styling to stand out
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
      data-gamepad-focusable="true"
      {...props}
    >
      <div className={styles.glowEffect} />
      <span className={styles.potLabel}>POT</span>
      <div className={styles.currencyPill}>
        <CurrencyAmount amount={amount} size="small" />
      </div>
    </button>
  );
};

export default PotButton;
