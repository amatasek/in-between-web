import React, { useState, useEffect } from 'react';
import styles from './styles/GameHeader.module.css';
import { useGameContext } from '../contexts/GameContext';
import { useSocket } from '../contexts/SocketContext';
import { useAuth } from '../contexts/AuthContext';
import { TIMERS, ICONS } from '../constants';
import CurrencyAmount from './common/CurrencyAmount';
import GameSummaryModal from './GameSummaryModal.jsx';
import StoreModal from './StoreModal.jsx';
import RulesButton from './common/RulesButton';
import PlayerStatsButton from './common/PlayerStatsButton';
import PreferencesButton from './common/PreferencesButton';
import StoreButton from './StoreButton';
import IconButton from './common/IconButton';
import ExitIcon from './icons/ExitIcon';

// Phase display mapping with icons and friendly names
const phaseDisplayMap = {
  waiting: { text: 'Waiting for Players', icon: '👥' },
  dealing: { text: 'Dealing Cards', icon: ICONS.DEALER },
  revealing: { text: 'Revealing Cards', icon: '🥁' },
  results: { text: 'Round Results', icon: '🏆' }
};

const GameHeader = ({ handleLeaveGame, onModalStateChange }) => {
  const { gameState, gameId } = useGameContext();
  const { socket } = useSocket();
  const { user } = useAuth();
  
  // Get the current user's balance from game state (real-time) or fallback to auth context
  const currentUserId = socket?.auth?.userId;
  const currentPlayer = currentUserId && gameState?.players ? gameState.players[currentUserId] : null;
  const playerBalance = currentPlayer?.balance ?? user?.balance ?? 0;
  const currentPhase = gameState?.phase || 'waiting';
  
  // Check if user is ready (committed to current hand)
  const isPlayerReady = currentPlayer?.isReady || false;
  const [timeLeft, setTimeLeft] = useState(null);
  const [showGameSummary, setShowGameSummary] = useState(false);
  const [showStoreModal, setShowStoreModal] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);

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

  // Notify parent when modal state changes
  useEffect(() => {
    const isModalOpen = showGameSummary || showStoreModal || isPreferencesOpen || isRulesOpen || isStatsOpen;
    if (onModalStateChange) {
      onModalStateChange(isModalOpen);
    }
  }, [showGameSummary, showStoreModal, isPreferencesOpen, isRulesOpen, isStatsOpen, onModalStateChange]);
  
  // Get the phase display information
  let phaseInfo = phaseDisplayMap[currentPhase] || { text: 'Unknown Phase', icon: '❓' };
  
  // Override phase info if waiting for Ace decision
  if (gameState?.waitingForAceDecision && currentPhase === 'dealing') {
    phaseInfo = { text: 'Choosing Ace Value', icon: '🤔' };
  }
  
  // Override phase info if waiting for second chance decision
  if (gameState?.waitingForSecondChance) {
    phaseInfo = { text: 'Second Chance Decision', icon: '🤔' };
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
          icon: '🤔'
        };
      } else {
        // It's someone else's turn
        phaseInfo = {
          text: `${currentPlayer.name} is Betting`,
          icon: '🤔'
        };
      }
    } else {
      phaseInfo = { text: 'Betting Round', icon: '🤔' };
    }
  }
  
  return (
    <div className={styles.headerContainer}>
      {/* Desktop layout - single row with 3 cells */}
      <div className={`panel ${styles.desktopLayout}`}>
        {/* Left: Logo and game ID */}
        <div className={styles.headerLeft}>
          <h1 className={styles.gameTitle}>In Between <span className={styles.liveTag}>LIVE</span></h1>
          <p className={styles.gameIdText}>
            <span 
              className={styles.gameIdLink} 
              onClick={() => setShowGameSummary(true)}
              title="Click to view game summary"
              data-gamepad-focusable="true"
              tabIndex="0"
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
        
        {/* Right: Balance and buttons */}
        <div className={styles.headerRight}>
          <div className={styles.controlsStack}>
            <div className="panel-alt" style={{ padding: '0.2rem 0.4rem', margin: '0 0 0.2rem 0', gap: '0.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem', fontWeight: 600, color: '#ecf0f1' }}>
                <span>Balance:</span>
                <CurrencyAmount amount={Number(playerBalance)} size="small" />
              </div>
            </div>
            <div className={styles.controlsGroup}>
              <PreferencesButton 
                onModalStateChange={setIsPreferencesOpen}
                data-gamepad-focusable="true" 
              />
              <RulesButton 
                onModalStateChange={setIsRulesOpen}
                data-gamepad-focusable="true" 
              />
              <PlayerStatsButton 
                onModalStateChange={setIsStatsOpen}
                data-gamepad-focusable="true" 
              />
              <StoreButton onClick={() => setShowStoreModal(true)} data-gamepad-focusable="true" />
              <IconButton
                icon={<ExitIcon color="white" size={20} />}
                title="Leave Game"
                onClick={handleLeaveGame}
                variant="danger"
                disabled={isPlayerReady}
                data-gamepad-focusable="true"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile layout - two rows */}
      <div className={`panel ${styles.mobileLayout}`}>
        {/* Top row: Logo/ID, Balance/Buttons */}
        <div className={styles.mobileTopRow}>
          <div className={styles.headerLeft}>
            <h1 className={styles.gameTitle}>In Between <span className={styles.liveTag}>LIVE</span></h1>
            <p className={styles.gameIdText}>
              <span 
                className={styles.gameIdLink} 
                onClick={() => setShowGameSummary(true)}
                title="Click to view game summary"
                data-gamepad-focusable="true"
                tabIndex="0"
              >
                Game #{gameId}
              </span>
            </p>
          </div>
          
          <div className={styles.mobileRight}>
            <div className={styles.mobileControlsStack}>
              <div className="panel-alt" style={{ padding: '0.15rem 0.35rem', margin: '0 0 0.2rem 0', gap: '0.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem', fontWeight: 600, color: '#ecf0f1' }}>
                  <span>Balance:</span>
                  <CurrencyAmount amount={Number(playerBalance)} size="small" />
                </div>
              </div>
              <div className={styles.mobileActions}>
                <PreferencesButton 
                  onModalStateChange={setIsPreferencesOpen}
                  data-gamepad-focusable="true" 
                />
                <RulesButton 
                  onModalStateChange={setIsRulesOpen}
                  data-gamepad-focusable="true" 
                />
                <PlayerStatsButton 
                  onModalStateChange={setIsStatsOpen}
                  data-gamepad-focusable="true" 
                />
                <StoreButton onClick={() => setShowStoreModal(true)} data-gamepad-focusable="true" />
                <IconButton
                  icon={<ExitIcon color="white" size={20} />}
                  title="Leave Game"
                  onClick={handleLeaveGame}
                  variant="danger"
                  disabled={isPlayerReady}
                  data-gamepad-focusable="true"
                />
              </div>
            </div>
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
      {showGameSummary && (
        <GameSummaryModal 
          onClose={() => setShowGameSummary(false)} 
          gameData={gameState}
        />
      )}
      
      {/* Store Modal */}
      {showStoreModal && (
        <StoreModal
          onClose={() => setShowStoreModal(false)}
        />
      )}
    </div>
  );
};

export default GameHeader;
