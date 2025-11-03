import styles from './styles/RevealingOverlay.module.css';
import Username from './common/Username';
import CurrencyAmount from './common/CurrencyAmount';

const RevealingOverlay = ({ playerName, betAmount }) => {
  if (!playerName || !betAmount) return null;
  
  return (
    <div className={`panel-game ${styles.revealingOverlay}`}>
      <div className={styles.revealingContent}>
        <span className={styles.playerName}><Username username={playerName} /></span>
        <span className={styles.actionText}>bets</span>
        <div className={styles.betAmount}>
          <CurrencyAmount amount={betAmount} size="small" />
        </div>
      </div>
    </div>
  );
};

export default RevealingOverlay;