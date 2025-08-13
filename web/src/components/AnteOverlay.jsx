import React from 'react';
import styles from './styles/AnteOverlay.module.css';
import { useGameContext } from '../contexts/GameContext';
import { useSocket } from '../contexts/SocketContext';
import { useAuth } from '../contexts/AuthContext';
import CurrencyAmount from './common/CurrencyAmount';
import { ICONS } from '../constants';

const AnteOverlay = () => {
  const { gameState } = useGameContext();
  const { socket } = useSocket();
  const { user } = useAuth();
  
  if (!gameState) return null;
  
  const { anteAmount = 1, players = {}, playersWhoHaveAnted = [], phase } = gameState;
  const currentPlayerId = user?.id;
  const isWaitingForAntes = phase === 'waiting' || phase === 'waitingForAntes';
  
  if (!isWaitingForAntes) return null;
  
  // Get list of players who haven't anted
  const playersNotAnted = Object.values(players).filter(
    player => player.isActive && !playersWhoHaveAnted.includes(player.id)
  );
  
  const hasPlayerAnted = currentPlayerId && playersWhoHaveAnted.includes(currentPlayerId);
  const canPlayerAnte = currentPlayerId && !hasPlayerAnted && players[currentPlayerId]?.isActive;
  
  const handleAnte = () => {
    if (socket && canPlayerAnte) {
      socket.emit('ante');
    }
  };
  
  return (
    <div className={`panel-game ${styles.anteOverlay}`}>
      {/* Ante status */}
      <div className={styles.anteStatus}>
        <div className={styles.statusHeader}>
          <span className={styles.statusTitle}>WAITING FOR ANTES</span>
          <span className={styles.anteCount}>
            {playersWhoHaveAnted.length}/{Object.values(players).filter(p => p.isActive).length}
          </span>
        </div>
        
        {/* Progress bar */}
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill} 
            style={{ 
              width: `${(playersWhoHaveAnted.length / Object.values(players).filter(p => p.isActive).length) * 100}%` 
            }}
          />
        </div>
        
        {/* Players waiting list */}
        {playersNotAnted.length > 0 && (
          <div className={styles.waitingList}>
            {playersNotAnted.map(player => (
              <div key={player.id} className={styles.waitingPlayer}>
                <span className={styles.playerDot} />
                <span className={styles.playerName}>{player.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Ante button or waiting message */}
      {canPlayerAnte ? (
        <div className={styles.anteContainer}>
          <button
            className={styles.anteButton}
            onClick={handleAnte}
            data-gamepad-focusable="true"
            autoFocus
          >
            <div className={styles.anteChip}>
              <span className={styles.anteText}>ANTE</span>
              <CurrencyAmount amount={anteAmount} size="large" />
            </div>
            <div className={styles.chipShadow} />
          </button>
          
          <div className={styles.anteHint}>
            Click to ante and start the round
          </div>
        </div>
      ) : hasPlayerAnted ? (
        <div className={styles.waitingMessage}>
          <div className={styles.checkmark}>{ICONS.CHECK}</div>
          <span className={styles.waitingText}>You have anted</span>
        </div>
      ) : (
        <div className={styles.spectatingMessage}>
          <span className={styles.spectatingText}>Spectating</span>
        </div>
      )}
    </div>
  );
};

export default AnteOverlay;