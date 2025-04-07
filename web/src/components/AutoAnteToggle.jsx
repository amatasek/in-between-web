import React from 'react';
import { usePreferences } from '../contexts/PreferencesContext';
import { useGameContext } from '../contexts/GameContext';
import { useSocket } from '../contexts/SocketContext';
import styles from './styles/AutoAnteToggle.module.css';

const AutoAnteToggle = () => {
  const { preferences, toggleAutoAnte, loading } = usePreferences();
  const { gameState, playerReady } = useGameContext();
  const { socket } = useSocket();
  
  const handleToggle = async () => {
    const newValue = !preferences.autoAnte;
    const success = await toggleAutoAnte();
    
    // Only auto-ante if the player is not already anted
    if (newValue && success && playerReady) {
      // Check if player is already anted
      const myPlayer = socket && gameState?.players ? gameState.players[socket.id] : null;
      const isPlayerReady = myPlayer?.isReady;
      
      // Only call playerReady if the player is not already ready
      if (!isPlayerReady) {
        playerReady();
      }
    }
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
