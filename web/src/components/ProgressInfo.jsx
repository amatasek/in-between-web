import React from 'react';
import styles from './styles/ProgressInfo.module.css';
import CurrencyAmount from './common/CurrencyAmount';
import { useUserData } from '../contexts/UserDataContext';

/**
 * ProgressInfo component displays user's balance and XP progress in a unified display
 * 
 * @param {Object} props - Component props
 * @param {string} props.userId - User ID to fetch data for
 * @param {number} props.balance - User's balance amount
 */
const ProgressInfo = ({ userId, balance }) => {
  const userData = useUserData(userId);

  return (
    <div className={styles.progressInfoContainer}>
      <div className={styles.balanceSection}>
        <span className={styles.balanceLabel}>Balance:</span>
        <CurrencyAmount amount={Number(balance) || 0} size="medium" />
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