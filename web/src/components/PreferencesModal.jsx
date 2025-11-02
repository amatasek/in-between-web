import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { usePreferences } from '../contexts/PreferencesContext';
import BaseModal from './common/BaseModal';
import UsernameChange from './UsernameChange';
import FileUpload from './FileUpload';
import TitlesSelector from './TitlesSelector';
import CardBackSelector from './CardBackSelector';
import ThemeSelector from './ThemeSelector';
import ToggleSwitch from './ToggleSwitch';
import baseModalStyles from './common/BaseModal.module.css';

const PreferencesModal = ({ onClose, defaultTab = 'profile' }) => {
  const { user } = useAuth();
  const {
    preferences,
    toggleAutoAnte,
    toggleMute,
    uploadProfileImg,
    loading
  } = usePreferences();
  const [activeTab, setActiveTab] = useState(defaultTab);

  if (loading) {
    return (
      <BaseModal title="Preferences" onClose={onClose} style={{ maxWidth: 600, maxHeight: '25vh' }}>
        <div className={baseModalStyles.loadingMessage}>Loading preferences...</div>
      </BaseModal>
    );
  }

  return (
    <BaseModal title="Preferences" onClose={onClose} style={{ maxWidth: 600 }}>
      {/* Tab Navigation */}
      <div className="tabs-container">
        <button
          className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
          data-gamepad-focusable="true"
        >
          Profile
        </button>
        <button
          className={`tab-button ${activeTab === 'game' ? 'active' : ''}`}
          onClick={() => setActiveTab('game')}
          data-gamepad-focusable="true"
        >
          Game Options
        </button>
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="tab-content">
          {/* Username Change */}
          <div className={`panel-alt`}>
            <UsernameChange
              currentUsername={user?.username}
              onUsernameChanged={(newUsername) => {
                console.log('Username changed to:', newUsername);
              }}
            />
          </div>

          {/* Profile Image Setting */}
          <div className={`panel-alt`} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4 style={{ margin: 0 }}>Profile Image</h4>
            <FileUpload
              onUpload={uploadProfileImg}
              currentFileUrl={preferences.profileImg}
              acceptedFileTypes="image/jpeg,image/png,image/gif"
              label="Image"
              previewType="image"
            />
          </div>

          {/* Titles Selection */}
          <div className={`panel-alt`}>
            <h4 style={{ margin: '0 0 12px 0' }}>Title</h4>
            <TitlesSelector />
          </div>
        </div>
      )}

      {/* Game Options Tab */}
      {activeTab === 'game' && (
        <div className="tab-content">
          {/* Mute Setting */}
          <div className={`panel-alt`} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4 style={{ margin: 0 }}>Mute Sound</h4>
            <ToggleSwitch
              isChecked={preferences.muted}
              onChange={toggleMute}
            />
          </div>

          {/* Auto-Ante Setting */}
          <div className={`panel-alt`} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4 style={{ margin: 0 }}>Auto-Ante</h4>
            <ToggleSwitch
              isChecked={preferences.autoAnte}
              onChange={toggleAutoAnte}
            />
          </div>

          {/* Theme Selection */}
          <div className={`panel-alt`}>
            <h4 style={{ margin: '0 0 12px 0' }}>Theme</h4>
            <ThemeSelector />
          </div>

          {/* Card Back Selection */}
          <div className={`panel-alt`}>
            <h4 style={{ margin: '0 0 12px 0' }}>Card Back</h4>
            <CardBackSelector />
          </div>
        </div>
      )}
    </BaseModal>
  );
};

export default PreferencesModal;
