import React from 'react';
import { usePreferences } from '../contexts/PreferencesContext';
import styles from './styles/PreferencesModal.module.css';
import ToggleSwitch from './ToggleSwitch';
import FileUpload from './FileUpload';

const PreferencesModal = ({ onClose }) => {
  const { 
    preferences, 
    toggleAutoAnte,
    uploadTwoSecondPotGif, 
    uploadTwoSecondPotMp3, 
    uploadProfileImg,
    loading 
  } = usePreferences();

  if (loading) {
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <div className={styles.loadingMessage}>Loading preferences...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Preferences</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>
        
        
        <div className={styles.settingsContainer}>
            
            {/* Profile Image Setting */}
            <div className={styles.settingItem}>
              <div className={styles.settingDescription}>
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
            
            {/* Auto-Ante Setting */}
            <div className={styles.settingItem}>
              <div className={styles.settingDescription}>
                <h4>Auto-Ante</h4>
                <p>Automatically ante up when a new round begins</p>
              </div>
              <ToggleSwitch 
                isChecked={preferences.autoAnte}
                onChange={toggleAutoAnte}
              />
            </div>
            
            {/* Two Second Pot GIF Setting */}
            <div className={styles.settingItem} style={{ position: 'relative', border: '2px dashed #FFD700', padding: '15px', borderRadius: '8px' }}>
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
                fontSize: '14px'
              }}>
                COMING SOON
              </div>
              <div className={styles.settingDescription}>
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
            
            {/* Two Second Pot MP3 Setting */}
            <div className={styles.settingItem} style={{ position: 'relative', border: '2px dashed #FFD700', padding: '15px', borderRadius: '8px' }}>
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
                fontSize: '14px'
              }}>
                COMING SOON
              </div>
              <div className={styles.settingDescription}>
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
    </div>
  );
};

export default PreferencesModal;
