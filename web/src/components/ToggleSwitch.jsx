import React from 'react';
import styles from './styles/ToggleSwitch.module.css';

const ToggleSwitch = ({ isChecked, onChange, label }) => {
  return (
    <div className={styles.toggleContainer}>
      <label className={styles.toggleLabel}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={onChange}
          className={styles.toggleInput}
        />
        <span className={styles.toggleSlider}></span>
        {label && <span className={styles.toggleText}>{label}</span>}
      </label>
    </div>
  );
};

export default ToggleSwitch;
