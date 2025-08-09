import React from 'react';
import { usePreferences } from '../contexts/PreferencesContext';
import baseModalStyles from './common/BaseModal.module.css';
import BaseModal from './common/BaseModal';
import ToggleSwitch from './ToggleSwitch.jsx';
import FileUpload from './FileUpload.jsx';
import TitlesSelector from './TitlesSelector.jsx';
import ThemeSelector from './ThemeSelector.jsx';

const PreferencesModal = ({ onClose }) => {
  const { 
    preferences, 
    toggleAutoAnte,
    toggleMute,
    uploadProfileImg,
    loading 
  } = usePreferences();

  if (loading) {
    return (
      <BaseModal title="Preferences" onClose={onClose} style={{ maxWidth: 600, maxHeight: '25vh' }}>
        <div className={baseModalStyles.loadingMessage}>Loading preferences...</div>
      </BaseModal>
    );
  }

  return (
    <BaseModal title="Preferences" onClose={onClose} style={{ maxWidth: 600, maxHeight: '80vh' }}>
      <div className={baseModalStyles.settingsContainer}>
        {/* Game Options Section */}
        <div className={baseModalStyles.sectionHeader}>Game Options</div>

        {/* Mute Setting */}
        <div className={baseModalStyles.settingItem}>
          <div className={baseModalStyles.settingDescription}>
            <h4>Mute Sound</h4>
            <p>Mute all game sound effects</p>
          </div>
          <ToggleSwitch 
            isChecked={preferences.muted}
            onChange={toggleMute}
          />
        </div>

        {/* Auto-Ante Setting */}
        <div className={baseModalStyles.settingItem}>
          <div className={baseModalStyles.settingDescription}>
            <h4>Auto-Ante</h4>
            <p>Automatically ante up when a new round begins</p>
          </div>
          <ToggleSwitch 
            isChecked={preferences.autoAnte}
            onChange={toggleAutoAnte}
          />
        </div>

        {/* Customization Options Section */}
        <div className={baseModalStyles.sectionHeader}>Customization Options</div>

        {/* Profile Image Setting */}
        <div className={baseModalStyles.settingItem}>
          <div className={baseModalStyles.settingDescription}>
            <h4>Profile Image</h4>
            <p>Upload a profile image to personalize your account</p>
          </div>
          <FileUpload
            onUpload={uploadProfileImg}
            currentFileUrl={preferences.profileImg}
            acceptedFileTypes="image/jpeg,image/png,image/gif"
            label="Image"
            previewType="image"
          />
        </div>

        {/* Titles Selection */}
        <div className={`panel-alt`} style={{ marginBottom: '20px' }}>
          <div className={baseModalStyles.settingDescription} style={{ marginRight: 0, marginBottom: '12px' }}>
            <h4>Title</h4>
            <p>Choose a title to display with your name. Unlock more by playing games!</p>
          </div>
          <TitlesSelector />
        </div>

        {/* Theme Selection */}
        <div className={`panel-alt`} style={{ marginBottom: '20px' }}>
          <div className={baseModalStyles.settingDescription} style={{ marginRight: 0, marginBottom: '12px' }}>
            <h4>Theme</h4>
            <p>Choose a color theme for the game interface</p>
          </div>
          <ThemeSelector />
        </div>

      
      </div>
    </BaseModal>
  );
};

export default PreferencesModal;
