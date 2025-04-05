import React from 'react';
import { usePreferences } from '../contexts/PreferencesContext';
import styles from './styles/MuteToggle.module.css';
import { ICONS } from '../constants/UIConstants';

const MuteToggle = ({ compact = false }) => {
  const { preferences, toggleMute, loading } = usePreferences();
  
  const handleToggle = async () => {
    await toggleMute();
  };
  
  if (loading) {
    return <div className={styles.loading}>Loading preferences...</div>;
  }
  
  return (
    <div className={`${styles.toggleContainer} ${compact ? styles.compact : ''}`}>
      <label className={styles.toggleLabel}>
        <input
          type="checkbox"
          checked={preferences.muted}
          onChange={handleToggle}
          className={styles.toggleInput}
        />
        <span className={styles.toggleSlider}></span>
        {!compact && (
          <span className={styles.toggleText}>
            {preferences.muted ? 'Unmute' : 'Mute'}
          </span>
        )}
        {compact && (
          <span className={styles.compactText}>
            Mute
          </span>
        )}
      </label>
    </div>
  );
};

export default MuteToggle;
