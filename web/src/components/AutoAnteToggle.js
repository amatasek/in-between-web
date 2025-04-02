import React from 'react';
import { usePreferences } from '../contexts/PreferencesContext';
import styles from './styles/AutoAnteToggle.module.css';

const AutoAnteToggle = () => {
  const { preferences, toggleAutoAnte, loading } = usePreferences();
  
  const handleToggle = () => {
    toggleAutoAnte();
  };
  
  if (loading) {
    return <div className={styles.loading}>Loading preferences...</div>;
  }
  
  return (
    <div className={styles.toggleContainer}>
      <label className={styles.toggleLabel}>
        <input
          type="checkbox"
          checked={preferences.autoAnte}
          onChange={handleToggle}
          className={styles.toggleInput}
        />
        <span className={styles.toggleSlider}></span>
        <span className={styles.toggleText}>
          Auto-Ante
        </span>
      </label>
    </div>
  );
};

export default AutoAnteToggle;
