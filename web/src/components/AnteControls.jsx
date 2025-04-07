import React from 'react';
import styles from './styles/AnteControls.module.css';
import { useGameContext } from '../contexts/GameContext';
import { useSocket } from '../contexts/SocketContext';
import { useAuth } from '../contexts/AuthContext';
import { usePreferences } from '../contexts/PreferencesContext';
import CurrencyAmount from './common/CurrencyAmount';
import { ICONS } from '../constants/UIConstants';
import AutoAnteToggle from './AutoAnteToggle.jsx';

const AnteControls = () => {
  // Get game state and actions from context
  const { gameState, playerReady, playerUnready } = useGameContext();
  const { socket } = useSocket();
  const { user } = useAuth();
  const { preferences } = usePreferences();
  
  if (!gameState) return null;
  
  const { 
    players, 
    anteAmount, 
    phase 
  } = gameState;
  
  // Only show in waiting phase
  if (phase !== 'waiting') return null;
  
  // Find the player by user ID
  let myPlayer = null;
  if (socket && socket.auth?.userId && players) {
    // Find player by userId
    const playerIds = Object.keys(players);
    for (const id of playerIds) {
      if (players[id].userId === socket.auth.userId) {
        myPlayer = players[id];
        break;
      }
    }
  } else if (user && players) {
    // If we can't find by socket ID, try to find by user ID
    const playerIds = Object.keys(players);
    for (const id of playerIds) {
      if (players[id].userId === user.id) {
        myPlayer = players[id];
        console.log(`[AnteControls] Found player by user ID instead of socket ID`);
        break;
      }
    }
  }
  
  // Get player balance and ready status
  const playerBalance = Number(myPlayer?.balance || 0);
  const isPlayerReady = myPlayer?.isReady;
  
  
  // Check if player has enough chips
  const hasEnoughChips = playerBalance >= anteAmount;
  
  // Player state and readiness is managed by the game context
  
  return (
    <div className={styles.anteControlsWrapper}>
      <div className={styles.controlsContainer}>
        {/* Main action button (Ante or Back Out) */}
        <div className={styles.buttonContainer}>
          {!isPlayerReady ? (
            // Player is not ready - show Ante button
            <>
              <button 
                className={styles.anteButton}
                onClick={playerReady}
                disabled={!hasEnoughChips}
                aria-label="Ante up"
              >
                {/* Add shimmer border for glimmering effect */}
                <div className={styles.shimmerBorder}></div>
                <span className={styles.anteIcon}>{ICONS.CHECK}</span>
                <div className={styles.buttonInfo}>
                  <h3 className={styles.buttonLabel}>ANTE</h3>
                  <span className={styles.buttonAmount}><CurrencyAmount amount={anteAmount} /></span>
                </div>
              </button>
              
              {!hasEnoughChips && (
                <p className={styles.notEnoughChipsText}>Not enough coins (<CurrencyAmount amount={anteAmount} /> required)</p>
              )}
            </>
          ) : (
            // Player is ready - show Back Out button
            <button 
              className={styles.backOutButton}
              onClick={() => {
                if (typeof playerUnready === 'function') {
                  playerUnready();
                } else {
                  console.error('playerUnready is not a function');
                }
              }}
              aria-label="Back out"
            >
              {/* Add shimmer border for glimmering effect */}
              <div className={styles.shimmerBorder}></div>
              <span className={styles.backOutIcon}>✕</span>
              <div className={styles.buttonInfo}>
                <h3 className={styles.buttonLabel}>BACK OUT</h3>
              </div>
            </button>
          )}
        </div>
        
        {/* Auto-Ante toggle - always shown */}
        <div className={styles.autoAnteContainer}>
          <AutoAnteToggle />
        </div>
      </div>
    </div>
  );
};

export default AnteControls;
