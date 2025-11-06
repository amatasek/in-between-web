import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import styles from './styles/PlayerPanel.module.css';
import UserAvatar from './UserAvatar';
import PlayerStatsButton from './common/PlayerStatsButton';
import PreferencesButton from './common/PreferencesButton';
import ProgressInfo from './ProgressInfo';
import RulesButton from './common/RulesButton';
import StoreButton from './StoreButton';
import StoreModal from './StoreModal';
import ClaimRewardsButton from './ClaimRewardsButton';
import DailyRewardModal from './DailyRewardModal/DailyRewardModal';

const PlayerPanel = () => {
  const { user, logout } = useAuth();
  const [showStoreModal, setShowStoreModal] = useState(false);
  const [showDailyRewardModal, setShowDailyRewardModal] = useState(false);

  return (
    <>
      <div className={`panel-frost ${styles.userSection}`}>
        <div className={styles.container2}>
          <div className={styles.container1}>
            <div className={styles.avatarContainer}>
              <UserAvatar
                userId={user?.id}
                size="medium"
                showName={true}
                namePosition="right"
              />
            </div>
            <ClaimRewardsButton onClick={() => setShowDailyRewardModal(true)} />
          </div>
          <ProgressInfo
            userId={user?.id}
            balance={user?.balance}
          />
        </div>
        <div className={styles.headerButtons}>
          <button
            type="button"
            className={styles.logoutButton}
            onClick={logout}
            data-gamepad-focusable="true"
          >
            <span className={styles.buttonText}>Logout</span>
          </button>
          <StoreButton onClick={() => setShowStoreModal(true)} data-gamepad-focusable="true" />
          <PlayerStatsButton data-gamepad-focusable="true" />
          <RulesButton data-gamepad-focusable="true" />
          <PreferencesButton data-gamepad-focusable="true" />
        </div>
      </div>
      {showStoreModal && (
        <StoreModal onClose={() => setShowStoreModal(false)} />
      )}
      {showDailyRewardModal && (
        <DailyRewardModal
          isOpen={showDailyRewardModal}
          onClose={() => setShowDailyRewardModal(false)}
        />
      )}
    </>
  );
};

export default PlayerPanel;