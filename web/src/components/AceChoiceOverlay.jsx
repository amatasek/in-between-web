import React, { useState } from 'react';
import styles from './styles/AceChoiceOverlay.module.css';
import { useSocket } from '../contexts/SocketContext';
import { useGameContext } from '../contexts/GameContext';
import ArrowIcon from './icons/ArrowIcon';
import WaitingTimer from './common/WaitingTimer';
import CountdownTimer from './common/CountdownTimer';
import { TIMERS } from '../constants';

const AceChoiceOverlay = ({ card, isCurrentPlayersTurn, bottomPosition = false }) => {
  const { socket } = useSocket();
  const { gameState } = useGameContext();
  const [choice, setChoice] = useState(null);
  
  const handleAceChoice = (isAceLow) => {
    if (choice !== null) return; // Prevent double clicks
    setChoice(isAceLow);
    socket.emit('chooseAceValue', { isAceLow });
  };
  
  const currentPlayerName = gameState.players[gameState.currentPlayerId]?.name || 'Current player';
  
  // If bottom position, render simplified controls
  if (bottomPosition) {
    // When not current player's turn, return just the WaitingTimer (no wrapper)
    if (!isCurrentPlayersTurn) {
      return (
        <WaitingTimer 
          playerName={currentPlayerName}
          action="choosing ace value"
          duration={TIMERS.DECISION_DURATION}
        />
      );
    }
    
    return (
      <div className={styles.aceControlsBottom}>
        <div className={styles.timerContainer}>
          <CountdownTimer duration={15} isActive={true} />
        </div>
        <div className={styles.aceButtonContainer}>
          <span className={styles.choicePrompt}>ACE VALUE:</span>
          <button
            className={`${styles.bottomChoiceButton} ${styles.lowButtonBottom}`}
            onClick={() => handleAceChoice(true)}
            disabled={choice !== null}
            data-gamepad-focusable="true"
            autoFocus
          >
            <ArrowIcon direction="down" size={16} />
            <span>LOW</span>
          </button>
          <button
            className={`${styles.bottomChoiceButton} ${styles.highButtonBottom}`}
            onClick={() => handleAceChoice(false)}
            disabled={choice !== null}
            data-gamepad-focusable="true"
          >
            <span>HIGH</span>
            <ArrowIcon direction="up" size={16} />
          </button>
        </div>
      </div>
    );
  }
  
  // Original card overlay position (not used anymore but kept for reference)
  return (
    <div className={styles.aceOverlay}>
      {/* Glow effect on the ace card */}
      <div className={styles.cardGlow} />
      
      {/* Countdown timer ring */}
      {isCurrentPlayersTurn && (
        <svg className={styles.countdownRing}>
          <circle
            className={styles.countdownCircle}
            cx="60"
            cy="87"
            r="80"
            style={{
              strokeDasharray: `${(countdown / 15) * 502} 502`
            }}
          />
        </svg>
      )}
      
      {isCurrentPlayersTurn ? (
        <>
          {/* HIGH button at top of card */}
          <button
            className={`${styles.choiceButton} ${styles.highButton}`}
            onClick={() => handleAceChoice(false)}
            disabled={choice !== null}
            data-gamepad-focusable="true"
            autoFocus
          >
            <ArrowIcon direction="up" size={20} />
            <span>HIGH</span>
          </button>
          
          {/* LOW button at bottom of card */}
          <button
            className={`${styles.choiceButton} ${styles.lowButton}`}
            onClick={() => handleAceChoice(true)}
            disabled={choice !== null}
            data-gamepad-focusable="true"
          >
            <span>LOW</span>
            <ArrowIcon direction="down" size={20} />
          </button>
          
          {/* Timer display */}
          <div className={styles.timerDisplay}>
            {countdown}s
          </div>
        </>
      ) : (
        /* Waiting message for other players */
        <div className={styles.waitingMessage}>
          {currentPlayerName} is choosing...
        </div>
      )}
    </div>
  );
};

export default AceChoiceOverlay;