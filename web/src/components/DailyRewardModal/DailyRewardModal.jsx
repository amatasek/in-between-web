import React, { useState } from 'react';
import { DailyRewardProvider, useDailyReward } from '../../contexts/DailyRewardContext';
import { useAuth } from '../../contexts/AuthContext';
import { calculateExpectedDay } from '../../utils/dailyRewardHelpers';
import BaseModal from '../common/BaseModal';
import RewardCalendar from './RewardCalendar';
import styles from './DailyRewardModal.module.css';

const DailyRewardModalContent = ({ onClose }) => {
  const { user } = useAuth();
  const { offerings, loading, claimReward } = useDailyReward();
  const [claiming, setClaiming] = useState(false);
  const [error, setError] = useState(null);

  const currentStreak = user?.dailyRewards?.currentStreak || 0;
  const expectedDay = calculateExpectedDay(user?.dailyRewards);
  const isPremium = user?.subscription?.isPremium;

  const handleClaim = async () => {
    setClaiming(true);
    setError(null);

    try {
      await claimReward(expectedDay);
      // Close immediately on success
      onClose();
    } catch (err) {
      setError(err.message);
      setClaiming(false);
    }
  };

  return (
    <BaseModal
      title="Daily Login Reward"
      onClose={onClose}
      style={{ maxWidth: 650 }}
      className={styles.dailyRewardModal}
      footer={
        !loading && (
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleClaim}
              disabled={claiming}
              data-gamepad-focusable="true"
            >
              {claiming ? 'Claiming...' : `Claim Day ${expectedDay} Reward`}
            </button>
          </div>
        )
      }
    >
      <div className={styles.subtitle}>
        {currentStreak > 0
          ? `Current Streak: Day ${currentStreak} of 7`
          : 'Start your streak today!'}
      </div>

      {loading ? (
        <div className={styles.loading}>Loading...</div>
      ) : (
        <>
          <RewardCalendar
            offerings={offerings}
            currentStreak={currentStreak}
            expectedDay={expectedDay}
            isPremium={isPremium}
          />
          {error && <p className={styles.error}>{error}</p>}
        </>
      )}
    </BaseModal>
  );
};

const DailyRewardModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <DailyRewardProvider>
      <DailyRewardModalContent onClose={onClose} />
    </DailyRewardProvider>
  );
};

export default DailyRewardModal;
