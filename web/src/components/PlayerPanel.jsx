import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import UserAvatar from './UserAvatar.jsx';
import ProgressInfo from './ProgressInfo.jsx';
import PreferencesButton from './common/PreferencesButton.jsx';
import PlayerStatsButton from './common/PlayerStatsButton.jsx';
import StoreButton from './StoreButton.jsx';
import RulesButton from './common/RulesButton';
import StoreModal from './StoreModal.jsx';
import styles from './styles/PlayerPanel.module.css';

const PlayerPanel = () => {
  const { user, logout, refreshUserData } = useAuth();
  const [showStoreModal, setShowStoreModal] = useState(false);

  return (
    <div style={{ width: '100%' }}>
      <div className={`panel ${styles.userSection}`}>
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
        <StoreModal
          onClose={() => {
            setShowStoreModal(false);
            if (refreshUserData) {
              refreshUserData();
            }
          }}
        />
      )}
    </div>
  );
};

export default PlayerPanel;