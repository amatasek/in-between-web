import React from 'react';
import { usePreferences } from '../contexts/PreferencesContext';
import baseModalStyles from './common/BaseModal.module.css';
import BaseModal from './common/BaseModal';
import ToggleSwitch from './ToggleSwitch.jsx';
import FileUpload from './FileUpload.jsx';

const PreferencesModal = ({ onClose }) => {
  const { 
    preferences, 
    toggleAutoAnte,
    toggleMute,
    uploadTwoSecondPotGif, 
    uploadTwoSecondPotMp3, 
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

        {/* Two Second Pot GIF Setting */}
        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute',
            top: '-12px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#FFD700',
            color: '#333',
            padding: '2px 10px',
            borderRadius: '4px',
            fontWeight: 'bold',
            fontSize: '14px',
            zIndex: 2
          }}>
            COMING SOON
          </div>
          <div className={baseModalStyles.settingItem} style={{ border: '2px dashed #FFD700', padding: '15px', borderRadius: '8px', marginTop: '12px' }}>
            <div className={baseModalStyles.settingDescription}>
              <h4>Two Second POT GIF</h4>
              <p>Upload a GIF to play when you slam the POT button</p>
            </div>
            <FileUpload
              onUpload={uploadTwoSecondPotGif}
              currentFileUrl={preferences.twoSecondPotGif}
              acceptedFileTypes="image/gif"
              label="GIF"
              previewType="image"
            />
          </div>
        </div>

        {/* Two Second Pot Sound Setting */}
        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute',
            top: '-12px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#FFD700',
            color: '#333',
            padding: '2px 10px',
            borderRadius: '4px',
            fontWeight: 'bold',
            fontSize: '14px',
            zIndex: 2
          }}>
            COMING SOON
          </div>
          <div className={baseModalStyles.settingItem} style={{ border: '2px dashed #FFD700', padding: '15px', borderRadius: '8px', marginTop: '12px' }}>
            <div className={baseModalStyles.settingDescription}>
              <h4>Two Second POT Sound</h4>
              <p>Upload a sound to play when you slam the POT button</p>
            </div>
            <FileUpload
              onUpload={uploadTwoSecondPotMp3}
              currentFileUrl={preferences.twoSecondPotMp3}
              acceptedFileTypes="audio/mpeg,audio/wav"
              label="Sound"
              previewType="audio"
            />
          </div>
        </div>
      </div>
    </BaseModal>
  );
};

export default PreferencesModal;
