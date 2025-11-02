import { useState } from 'react';
import styles from './styles/SecondChanceOverlay.module.css';
import { useGameContext } from '../contexts/GameContext';
import { useSocket } from '../contexts/SocketContext';
import { ICONS, TIMERS } from '../constants';
import WaitingTimer from './common/WaitingTimer';
import CountdownTimer from './common/CountdownTimer';
import CurrencyAmount from './common/CurrencyAmount';

const SecondChanceOverlay = ({ isCurrentPlayersTurn, bottomPosition = false, indicatorOnly = false }) => {
  const { gameState } = useGameContext();
  const { socket } = useSocket();
  const [choice, setChoice] = useState(null);

  const { anteAmount = 1, players, currentPlayerId } = gameState;
  const currentPlayer = players[currentPlayerId];
  const currentPlayerName = currentPlayer?.name || 'Player';

  const handleSecondChance = (anteAgain) => {
    if (choice !== null) return; // Prevent double clicks
    if (socket) {
      setChoice(anteAgain);
      socket.emit('secondChance', { anteAgain });
    }
  };

  // If indicator only, don't show anything
  if (indicatorOnly) {
    return null;
  }
  
  // If bottom position, render controls at bottom
  if (bottomPosition) {
    // When not current player's turn, return just the WaitingTimer (no wrapper)
    if (!isCurrentPlayersTurn) {
      return (
        <WaitingTimer 
          playerName={currentPlayerName}
          action="deciding on second chance"
          duration={TIMERS.DECISION_DURATION}
        />
      );
    }
    
    return (
      <div className={`panel-game ${styles.secondChanceBottom}`}>
        <div className={styles.timerContainer}>
          <CountdownTimer duration={15} isActive={true} />
        </div>
        <div className={styles.bottomButtonContainer}>
          <span className={styles.choicePrompt}>SECOND CHANCE:</span>
          <button
            className={`${styles.bottomChoiceButton} ${styles.anteButtonBottom}`}
            onClick={() => handleSecondChance(true)}
            disabled={choice !== null}
            data-gamepad-focusable="true"
            autoFocus
          >
            <span className={styles.buttonIcon}>{ICONS.ROTATE}</span>
            <span>ANTE AGAIN</span>
            <CurrencyAmount amount={anteAmount} size="small" />
          </button>
          <button
            className={`${styles.bottomChoiceButton} ${styles.passButtonBottom}`}
            onClick={() => handleSecondChance(false)}
            disabled={choice !== null}
            data-gamepad-focusable="true"
          >
            <span>PASS</span>
            <span className={styles.buttonIcon}>{ICONS.ARROW_RIGHT}</span>
          </button>
        </div>
      </div>
    );
  }
  
  // Original overlay position (not used anymore)
  return (
    <div className={styles.secondChanceOverlay}>
      {/* Connecting bridge between cards */}
      <div className={styles.bridge}>
        <div className={styles.bridgeLine} />
        <div className={styles.matchBadge}>
          <span className={styles.matchText}>MATCH!</span>
        </div>
      </div>
      
      {isCurrentPlayersTurn ? (
        <div className={styles.choiceContainer}>
          {/* Timer */}
          <div className={styles.timer}>
            {countdown}s
          </div>
          
          {/* Choice buttons */}
          <div className={styles.buttons}>
            <button
              className={`${styles.choiceButton} ${styles.anteButton}`}
              onClick={() => handleSecondChance(true)}
              disabled={choice !== null}
              data-gamepad-focusable="true"
              autoFocus
            >
              <span className={styles.buttonIcon}>{ICONS.ROTATE}</span>
              <span className={styles.buttonText}>ANTE AGAIN</span>
              <span className={styles.buttonAmount}>
                <CurrencyAmount amount={anteAmount} size="small" />
              </span>
            </button>

            <button
              className={`${styles.choiceButton} ${styles.passButton}`}
              onClick={() => handleSecondChance(false)}
              disabled={choice !== null}
              data-gamepad-focusable="true"
            >
              <span className={styles.buttonText}>PASS</span>
              <span className={styles.buttonIcon}>{ICONS.ARROW_RIGHT}</span>
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.waitingContainer}>
          <div className={styles.waitingMessage}>
            {currentPlayerName} is deciding...
          </div>
        </div>
      )}
    </div>
  );
};

export default SecondChanceOverlay;