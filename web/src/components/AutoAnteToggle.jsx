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
      // Check if player is already anted (using userId instead of socket.id)
      let myPlayer = null;
      if (socket && socket.auth?.userId && gameState?.players) {
        // Find player by userId
        const playerIds = Object.keys(gameState.players);
        for (const id of playerIds) {
          if (gameState.players[id].userId === socket.auth.userId) {
            myPlayer = gameState.players[id];
            break;
          }
        }
      }
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
    <label className={styles.toggleLabel}>
      <input
        type="checkbox"
        checked={preferences.autoAnte}
        onChange={handleToggle}
        className={styles.toggleInput}
        data-gamepad-focusable="true"
      />
      <span className={styles.toggleSlider}></span>
      <span className={styles.toggleText}>
        Auto-Ante
      </span>
    </label>
  );
};

export default AutoAnteToggle;
