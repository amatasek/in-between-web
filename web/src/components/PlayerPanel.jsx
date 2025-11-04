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

const PlayerPanel = () => {
  const { user, logout } = useAuth();
  const [showStoreModal, setShowStoreModal] = useState(false);

  return (
    <>
      <div className={`panel-frost ${styles.userSection}`}>
        <div className={styles.avatarContainer}>
          <UserAvatar
            userId={user?.id}
            size="medium"
            showName={true}
            namePosition="right"
          />
        </div>
        <ProgressInfo
          userId={user?.id}
          balance={user?.balance}
        />
        <div className={styles.headerButtons}>
          <button
            type="button"
            className={styles.logoutButton}
            onClick={logout}
            data-gamepad-focusable="true"
          >
            <span className={styles.buttonText}>Logout</span>
          </button>
          <RulesButton data-gamepad-focusable="true" />
          <PlayerStatsButton data-gamepad-focusable="true" />
          <StoreButton onClick={() => setShowStoreModal(true)} data-gamepad-focusable="true" />
          <PreferencesButton data-gamepad-focusable="true" />
        </div>
      </div>
      {showStoreModal && (
        <StoreModal onClose={() => setShowStoreModal(false)} />
      )}
    </>
  );
};

export default PlayerPanel;