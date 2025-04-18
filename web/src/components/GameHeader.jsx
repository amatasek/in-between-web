import React, { useState, useEffect } from 'react';
import styles from './styles/GameHeader.module.css';
import { useGameContext } from '../contexts/GameContext';
import { useSocket } from '../contexts/SocketContext';
import GAME_CONSTANTS from '../../../shared/constants/GameConstants';
const { TIMERS } = GAME_CONSTANTS;
import { ICONS } from '../constants/UIConstants';
import MuteToggle from './MuteToggle.jsx';
import GameSummaryModal from './GameSummaryModal.jsx';
import GameRulesButton from './GameRulesButton.jsx';

// Phase display mapping with icons and friendly names
const phaseDisplayMap = {
  waiting: { text: 'Waiting for Players', icon: '👥' },
  dealing: { text: 'Dealing Cards', icon: ICONS.DEALER },
  revealing: { text: 'Revealing Cards', icon: ICONS.CARDS },
  results: { text: 'Round Results', icon: '🏆' }
  // betting phase is handled dynamically to show player name
};

const GameHeader = ({ handleLeaveGame }) => {
  const { gameState, gameId } = useGameContext();
  const { socket } = useSocket();
  const currentPhase = gameState?.phase || 'waiting';
  const [timeLeft, setTimeLeft] = useState(null);
  const [showGameSummary, setShowGameSummary] = useState(false);

  // Timer effect for phases
  useEffect(() => {
    let timer;
    
    if (currentPhase === 'dealing') {
      setTimeLeft(TIMERS.DEALING_DURATION);
      timer = setInterval(() => {
        setTimeLeft(prev => Math.max(0, prev - 100));
      }, 100);
    } else if (currentPhase === 'betting') {
      setTimeLeft(TIMERS.BETTING_DURATION);
      timer = setInterval(() => {
        setTimeLeft(prev => Math.max(0, prev - 100));
      }, 100);
    } else if (currentPhase === 'revealing') {
      setTimeLeft(TIMERS.REVEALING_DURATION);
      timer = setInterval(() => {
        setTimeLeft(prev => Math.max(0, prev - 100));
      }, 100);
    } else if (currentPhase === 'results') {
      setTimeLeft(TIMERS.RESULTS_DURATION);
      timer = setInterval(() => {
        setTimeLeft(prev => Math.max(0, prev - 100));
      }, 100);
    } else {
      setTimeLeft(null);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [currentPhase, gameState?.waitingForAceDecision]);
  
  // Get the phase display information
  let phaseInfo = phaseDisplayMap[currentPhase] || { text: 'Unknown Phase', icon: '❓' };
  
  // Override phase info if waiting for Ace decision
  if (gameState?.waitingForAceDecision && currentPhase === 'dealing') {
    phaseInfo = { text: 'Choosing Ace Value', icon: ICONS.DEALER };
  }
  
  // Check if current user is the current player (using userId instead of socket.id)
  const isCurrentPlayersTurn = socket && socket.auth?.userId && gameState?.currentPlayerId === socket.auth.userId;
  
  // Special handling for betting phase
  if (currentPhase === 'betting' && gameState?.currentPlayerId && gameState?.players) {
    const currentPlayer = gameState.players[gameState.currentPlayerId];
    
    if (currentPlayer) {
      if (isCurrentPlayersTurn) {
        // It's YOUR turn to bet
        phaseInfo = {
          text: `Pass or Bet`,
          icon: ICONS.COIN
        };
      } else {
        // It's someone else's turn
        phaseInfo = {
          text: `${currentPlayer.name} is Betting`,
          icon: ICONS.COIN
        };
      }
    } else {
      phaseInfo = { text: 'Betting Round', icon: ICONS.COIN };
    }
  }
  
  return (
    <div className={styles.headerContainer}>
      {/* Desktop layout - single row with 3 cells */}
      <div className={styles.desktopLayout}>
        {/* Left: Logo and game ID */}
        <div className={styles.headerLeft}>
          <h1 className={styles.gameTitle}>In Between <span className={styles.liveTag}>LIVE</span></h1>
          <p className={styles.gameIdText}>
            <span 
              className={styles.gameIdLink} 
              onClick={() => setShowGameSummary(true)}
              title="Click to view game summary"
            >
              Game #{gameId}
            </span>
          </p>
        </div>
        
        {/* Middle: Phase indicator */}
        <div className={styles.headerCenter}>
          <div 
            className={`${styles.gamePhase} ${currentPhase === 'betting' ? 
              (isCurrentPlayersTurn ? styles.phaseBettingYourTurn : styles.phaseBettingWaiting) : 
              styles[`phase${currentPhase.charAt(0).toUpperCase() + currentPhase.slice(1)}`]}`} 
            data-phase={currentPhase}
          >
            <span className={styles.phaseIcon}>{phaseInfo.icon}</span>
            <span className={styles.phaseText}>{phaseInfo.text}</span>
            {timeLeft !== null && (
              <div className={styles.timerBar}>
                <div 
                  className={styles.timerProgress} 
                  style={{ 
                    width: `${(timeLeft / (currentPhase === 'dealing' ? TIMERS.DEALING_DURATION :
                                         currentPhase === 'betting' ? TIMERS.BETTING_DURATION :
                                         currentPhase === 'revealing' ? TIMERS.REVEALING_DURATION :
                                         TIMERS.RESULTS_DURATION)) * 100}%`
                  }}
                />
              </div>
            )}
          </div>
        </div>
        
        {/* Right: Rules, Leave and Mute buttons stacked */}
        <div className={styles.headerRight}>
          <div className={styles.controlsStack}>
            <div className={styles.buttonGroup}>
              <GameRulesButton />
              <button 
                className={styles.leaveButton}
                onClick={handleLeaveGame}
              >
                Leave Game
              </button>
            </div>
            <div className={styles.muteToggleContainer}>
              <MuteToggle compact={true} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile layout - two rows */}
      <div className={styles.mobileLayout}>
        {/* Top row: Logo/ID, Mute, Rules, Leave */}
        <div className={styles.mobileTopRow}>
          <div className={styles.headerLeft}>
            <h1 className={styles.gameTitle}>In Between <span className={styles.liveTag}>LIVE</span></h1>
            <p className={styles.gameIdText}>
              <span 
                className={styles.gameIdLink} 
                onClick={() => setShowGameSummary(true)}
                title="Click to view game summary"
              >
                Game #{gameId}
              </span>
            </p>
          </div>
          
          <div className={styles.mobileActions}>
            <div className={styles.muteToggleContainer}>
              <MuteToggle compact={true} />
            </div>
            
            <GameRulesButton />
            
            <button 
              className={styles.leaveButton}
              onClick={handleLeaveGame}
            >
              Leave Game
            </button>
          </div>
        </div>
        
        {/* Bottom row: Phase indicator (full width) */}
        <div className={styles.mobileBottomRow}>
          <div 
            className={`${styles.gamePhase} ${currentPhase === 'betting' ? 
              (isCurrentPlayersTurn ? styles.phaseBettingYourTurn : styles.phaseBettingWaiting) : 
              styles[`phase${currentPhase.charAt(0).toUpperCase() + currentPhase.slice(1)}`]}`} 
            data-phase={currentPhase}
          >
            <span className={styles.phaseIcon}>{phaseInfo.icon}</span>
            <span className={styles.phaseText}>{phaseInfo.text}</span>
            {timeLeft !== null && (
              <div className={styles.timerBar}>
                <div 
                  className={styles.timerProgress} 
                  style={{ 
                    width: `${(timeLeft / (currentPhase === 'dealing' ? TIMERS.DEALING_DURATION :
                                         currentPhase === 'betting' ? TIMERS.BETTING_DURATION :
                                         currentPhase === 'revealing' ? TIMERS.REVEALING_DURATION :
                                         TIMERS.RESULTS_DURATION)) * 100}%`
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Game Summary Modal */}
      {showGameSummary && <GameSummaryModal onClose={() => setShowGameSummary(false)} />}
    </div>
  );
};

export default GameHeader;
