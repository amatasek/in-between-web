import React from 'react';
import styles from './RewardCard.module.css';
import CurrencyAmount from '../common/CurrencyAmount';
import { Zap, Plus } from 'lucide-react';

const RewardCard = ({ day, xp, chips, isClaimed, isCurrent, isFuture, isPremium }) => {
  const cardClass = `panel-alt ${styles.rewardCard} ${
    isClaimed ? styles.claimed : ''
  } ${
    isCurrent ? styles.current : ''
  } ${
    isFuture ? styles.future : ''
  }`;

  return (
    <div className={cardClass}>
      <div className={styles.cardLeft}>
        <span className={styles.dayLabel}>Day {day}</span>
        {isClaimed && <span className={styles.checkmark}>✓</span>}
      </div>

      <div className={styles.cardRight}>
        {chips > 0 && (
          <CurrencyAmount amount={chips} size="small" />
        )}
        {chips > 0 && xp > 0 && (
          <Plus size={16} className={styles.plusIcon} />
        )}
        {xp > 0 && (
          <div className={styles.xpReward}>
            {isPremium ? (
              <>
                <span className={styles.strikethrough}>{xp}</span>
                <span className={styles.premiumAmount}>{xp * 2} XP</span>
                <Zap size={14} strokeWidth={2.5} className={styles.premiumIcon} />
              </>
            ) : (
              <span className={styles.rewardAmount}>{xp} XP</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(RewardCard);
