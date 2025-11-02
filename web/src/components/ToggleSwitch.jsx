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
          data-gamepad-focusable="true"
        />
        <span className={styles.toggleSlider} />
        {label && <span className={styles.toggleText}>{label}</span>}
      </label>
    </div>
  );
};

export default ToggleSwitch;
