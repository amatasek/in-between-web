import styles from './styles/ProgressInfo.module.css';
import { useUserData } from '../contexts/UserDataContext';
import { useAuth } from '../contexts/AuthContext';
import CurrencyAmount from './common/CurrencyAmount';
import { Zap } from 'lucide-react';

/**
 * ProgressInfo component displays user's balance and XP progress in a unified display
 *
 * @param {Object} props - Component props
 * @param {string} props.userId - User ID to fetch data for
 * @param {number} props.balance - User's balance amount
 */
const ProgressInfo = ({ userId, balance }) => {
  const userData = useUserData(userId);
  const { user } = useAuth();
  const isPremium = user?.subscription?.isPremium;

  return (
    <div className={`panel-frost ${styles.progressContainer}`}>
      <div className={styles.balanceSection}>
        <div className={styles.balanceLeft}>
          <span className={styles.balanceLabel}>Balance:</span>
          <CurrencyAmount amount={Number(balance) || 0} size="medium" />
        </div>
        {isPremium && (
          <div className={styles.xpBonusIndicator}>
            <Zap size={16} strokeWidth={2.5} className={styles.xpBonusIcon} />
            <span className={styles.xpBonusText}>2x XP</span>
          </div>
        )}
      </div>
      
      {userData && (
        <div className={styles.xpSection}>
          <div className={styles.xpBarContainer}>
            <div 
              className={styles.xpBar}
              style={{ 
                width: userData.level >= 100 ? '100%' : `${userData.percentToNextLevel || 0}%`
              }}
            />
            <div className={styles.xpOverlay}>
              <div className={styles.xpLevel}>Level {userData.level}</div>
              <div className={styles.xpNext}>
                {userData.level < 100 ? `${userData.xpToNextLevel.toLocaleString()} XP` : 'MAX'}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressInfo;