import React, { useState } from 'react';
import styles from '../../styles/PasswordPromptModal.module.css';
import GamepadInput from '../GamepadInput';

function PasswordPromptModal({ isOpen, onClose, onSubmit, gameId }) {
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    onSubmit(password);
    setPassword(''); // Clear password after submit
  };

  const handleCancel = () => {
    setPassword(''); // Clear password on cancel
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Password Required</h2>
        <p>Please enter the password for game <strong>{gameId || ''}</strong>:</p>
        <form onSubmit={handleSubmit}>
          <GamepadInput
            title="Enter Game Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.passwordInput}
            autoFocus
            required
          />
          <div className={styles.modalActions}>
            <button type="button" onClick={handleCancel} className={`${styles.modalButton} ${styles.cancelButton}`} data-gamepad-focusable="true">
              Cancel
            </button>
            <button type="submit" className={`${styles.modalButton} ${styles.submitButton}`} data-gamepad-focusable="true">
              Join Game
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PasswordPromptModal;
