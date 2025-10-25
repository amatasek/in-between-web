import React, { useState } from 'react';
import styles from './styles/AnteControls.module.css';
import { useGameContext } from '../contexts/GameContext';
import { useSocket } from '../contexts/SocketContext';
import { useAuth } from '../contexts/AuthContext';
import CurrencyAmount from './common/CurrencyAmount';
import { ICONS } from '../constants';
import AutoAnteToggle from './AutoAnteToggle.jsx';


const AnteControls = () => {
  // Get game state and actions from context
  const { gameState, playerReady, playerUnready } = useGameContext();
  const { socket } = useSocket();
  const { user } = useAuth();
  const [actionPending, setActionPending] = useState(false);
  
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
    <div className={`panel-game ${styles.anteControls}`}>
      {/* Main action buttons */}
      {!isPlayerReady ? (
          // Player is not ready - show Auto-Ante, Ante button and Sit Out button
          <>
            {/* Auto-Ante toggle - only show when ante is available */}
            <AutoAnteToggle />
            <button
                className={styles.anteButton}
                onClick={() => {
                  if (actionPending) return;
                  setActionPending(true);
                  playerReady();
                }}
                disabled={!hasEnoughChips || actionPending}
                aria-label="Ante up"
                data-gamepad-focusable="true"
                autoFocus
              >
                {/* Add shimmer border for glimmering effect */}
                <div className={styles.shimmerBorder}></div>
                <div className={styles.buttonInfo}>
                  <span className={styles.buttonLabel}>ANTE</span>
                  <span className={styles.buttonAmount}><CurrencyAmount amount={anteAmount} /></span>
                </div>
              </button>

              <button
                className={`${styles.backOutButton} ${styles.sitOutHalfWidth}`}
                onClick={() => {
                  if (actionPending) return;
                  if (socket && gameState && user) {
                    setActionPending(true);
                    socket.emit('sitOut', {
                      gameId: gameState.id,
                      userId: socket.auth?.userId || user.id
                    });
                  }
                }}
                disabled={myPlayer?.isSittingOut || actionPending} // Disable if sitting out or action pending
                title={myPlayer?.isSittingOut ? "You are currently sitting out" : "Sit out next round"}
                aria-label="Sit Out"
                data-gamepad-focusable="true"
              >
                <div className={styles.shimmerBorder}></div>
                <div className={styles.buttonInfo}>
                  <span className={styles.buttonLabel}>SIT OUT</span>
                </div>
              </button>

          </>
        ) : (
          // Player is ready - show Back Out button
          <button
                className={styles.backOutButton}
                onClick={() => {
                  if (actionPending) return;
                  if (typeof playerUnready === 'function') {
                    setActionPending(true);
                    playerUnready();
                  } else {
                    console.error('playerUnready is not a function');
                  }
                }}
                disabled={actionPending}
                aria-label="Back out"
                data-gamepad-focusable="true"
              >
                {/* Add shimmer border for glimmering effect */}
                <div className={styles.shimmerBorder}></div>
                <div className={styles.buttonInfo}>
                  <span className={styles.buttonLabel}>BACK OUT</span>
                </div>
          </button>
        )}
        
      {/* Not enough chips message */}
      {!isPlayerReady && !hasEnoughChips && (
        <p className={styles.notEnoughChipsText}>Not enough coins</p>
      )}
    </div>
  );
};

export default AnteControls;
