import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useSocket } from '../contexts/SocketContext';
import { useNavigate } from 'react-router-dom';
import UserAvatar from './UserAvatar.jsx';
import ProgressInfo from './ProgressInfo.jsx';
import PreferencesButton from './common/PreferencesButton.jsx';
import PlayerStatsButton from './common/PlayerStatsButton.jsx';
import StoreButton from './StoreButton.jsx';
import RulesButton from './common/RulesButton';
import GameSettingsModal from './GameSettingsModal.jsx';
import StoreModal from './StoreModal.jsx';
import styles from './styles/PlayerPanel.module.css';

const PlayerPanel = () => {
  const { user, logout, refreshUserData } = useAuth();
  const { socket, isConnected } = useSocket();
  const navigate = useNavigate();
  
  const [showGameSettingsModal, setShowGameSettingsModal] = useState(false);
  const [showStoreModal, setShowStoreModal] = useState(false);

  const createGameWithSettings = (settings) => {
    if (!user?.id || !isConnected) {
      return;
    }

    const handleGameCreated = (data) => {
      socket.off('gameCreated', handleGameCreated);
      if (data?.game?.id) {
        navigate(`/${data.game.id}`);
      }
    };

    socket.on('gameCreated', handleGameCreated);
    
    if (settings) {
      socket.emit('createGame', { settings });
    } else {
      socket.emit('createGame');
    }
  };

  const handleCreateGame = () => createGameWithSettings({ numberOfBots: 5 });

  const handleCreateCustomGame = () => {
    setShowGameSettingsModal(true);
  };

  const handleSubmitCustomSettings = (settings) => {
    setShowGameSettingsModal(false);
    createGameWithSettings(settings);
  };

  return (
    <div className={styles.playerPanel}>
      <div className={styles.userSection}>
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
      
      <div className={styles.divider}></div>
      
      <div className={styles.actionSection}>
        <button 
          className={`${styles.actionButton} ${styles.createButton}`}
          onClick={handleCreateGame}
          disabled={!user?.username}
          data-gamepad-focusable="true"
        >
          Create Quick Game
        </button>
        <button
          className={`${styles.actionButton} ${styles.createButton}`}
          onClick={handleCreateCustomGame}
          disabled={!user?.username}
          data-gamepad-focusable="true"
        >
          Create Custom Game
        </button>
      </div>

      {showGameSettingsModal && (
        <GameSettingsModal
          onSubmit={handleSubmitCustomSettings}
          onClose={() => setShowGameSettingsModal(false)}
        />
      )}
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