import React from 'react';
import RewardCard from './RewardCard';
import styles from './RewardCalendar.module.css';

const RewardCalendar = ({ offerings, currentStreak, expectedDay, isPremium }) => {
  if (!offerings || offerings.length === 0) {
    return <div className={styles.loading}>Loading rewards...</div>;
  }

  return (
    <div className={styles.calendar}>
      {offerings.map((offering) => {
        const isClaimed = offering.day < currentStreak || (offering.day === currentStreak && currentStreak > 0);
        const isCurrent = offering.day === expectedDay;
        const isFuture = offering.day > expectedDay || (currentStreak === 7 && offering.day > 1);

        return (
          <RewardCard
            key={offering.day}
            day={offering.day}
            xp={offering.xp}
            chips={offering.chips}
            isClaimed={isClaimed}
            isCurrent={isCurrent}
            isFuture={isFuture}
            isPremium={isPremium}
          />
        );
      })}
    </div>
  );
};

export default RewardCalendar;
