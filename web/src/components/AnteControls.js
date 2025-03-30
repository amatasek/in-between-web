import React from 'react';
import styles from './styles/AnteControls.module.css';
import { useGameContext } from '../contexts/GameContext';
import { useSocket } from '../contexts/SocketContext';

const AnteControls = () => {
  // Get game state and actions from context
  const { gameState, playerReady, playerUnready } = useGameContext();
  const { socket } = useSocket();
  
  if (!gameState) return null;
  
  const { 
    players, 
    anteAmount, 
    phase 
  } = gameState;
  
  // Only show in waiting phase
  if (phase !== 'waiting') return null;
  
  const myPlayer = socket && players ? players[socket.id] : null;
  const playerBalance = Number(myPlayer?.balance || 0);
  const isPlayerReady = myPlayer?.isReady;
  const hasEnoughChips = playerBalance >= anteAmount;
  
  console.log('AnteControls rendering, isPlayerReady:', isPlayerReady);
  console.log('playerUnready function exists:', !!playerUnready);
  
  return (
    <div className={styles.anteControlsWrapper}>
      {!isPlayerReady ? (
        // Player is not ready - show Ante button
        <div className={styles.buttonContainer}>
          <button 
            className={styles.anteButton}
            onClick={playerReady}
            disabled={!hasEnoughChips}
          >
            <span className={styles.anteIcon}>✓</span>
            <div className={styles.buttonInfo}>
              <h3 className={styles.buttonLabel}>ANTE</h3>
              <span className={styles.buttonAmount}>${anteAmount}</span>
            </div>
          </button>
          
          {!hasEnoughChips && (
            <p className={styles.notEnoughChipsText}>Not enough chips (${anteAmount} required)</p>
          )}
        </div>
      ) : (
        // Player is ready - show Back Out button
        <div className={styles.buttonContainer}>
          <button 
            className={styles.backOutButton}
            onClick={() => {
              console.log('Back Out button clicked');
              console.log('playerUnready function:', playerUnready);
              if (typeof playerUnready === 'function') {
                playerUnready();
                console.log('playerUnready function called');
              } else {
                console.error('playerUnready is not a function');
              }
            }}
          >
            <span className={styles.backOutIcon}>✕</span>
            <div className={styles.buttonInfo}>
              <h3 className={styles.buttonLabel}>BACK OUT</h3>
              <span className={styles.buttonAmount}>-${anteAmount}</span>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default AnteControls;
