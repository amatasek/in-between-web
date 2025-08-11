import React from 'react';
import { usePreferences } from '../contexts/PreferencesContext';
import baseModalStyles from './common/BaseModal.module.css';
import BaseModal from './common/BaseModal';
import ToggleSwitch from './ToggleSwitch.jsx';
import FileUpload from './FileUpload.jsx';
import TitlesSelector from './TitlesSelector.jsx';
import ThemeSelector from './ThemeSelector.jsx';
import CardBackSelector from './CardBackSelector.jsx';

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
        <div className={`panel-alt`} style={{ marginBottom: '20px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ margin: 0 }}>Mute Sound</h4>
          <ToggleSwitch 
            isChecked={preferences.muted}
            onChange={toggleMute}
          />
        </div>

        {/* Auto-Ante Setting */}
        <div className={`panel-alt`} style={{ marginBottom: '20px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ margin: 0 }}>Auto-Ante</h4>
          <ToggleSwitch 
            isChecked={preferences.autoAnte}
            onChange={toggleAutoAnte}
          />
        </div>

        {/* Customization Options Section */}
        <div className={baseModalStyles.sectionHeader}>Customization Options</div>

        {/* Profile Image Setting */}
        <div className={`panel-alt`} style={{ marginBottom: '20px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
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
        <div className={`panel-alt`} style={{ marginBottom: '20px' }}>
          <h4 style={{ margin: '0 0 12px 0' }}>Title</h4>
          <TitlesSelector />
        </div>

        {/* Theme Selection */}
        <div className={`panel-alt`} style={{ marginBottom: '20px' }}>
          <h4 style={{ margin: '0 0 12px 0' }}>Theme</h4>
          <ThemeSelector />
        </div>

        {/* Card Back Selection */}
        <div className={`panel-alt`} style={{ marginBottom: '20px' }}>
          <h4 style={{ margin: '0 0 12px 0' }}>Card Back</h4>
          <CardBackSelector />
        </div>

      
      </div>
    </BaseModal>
  );
};

export default PreferencesModal;
