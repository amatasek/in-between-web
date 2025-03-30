import React from 'react';
import { useGameContext } from '../contexts/GameContext';
import { useSocket } from '../contexts/SocketContext';
import styles from './styles/ResultsPanel.module.css';

/**
 * Results panel component that displays the outcome of a hand during the results phase
 */
const ResultsPanel = () => {
  const { gameState } = useGameContext();
  const { socket } = useSocket();

  // If there's no result, don't render anything
  if (!gameState.result) return null;

  const { result, players, resultCountdown } = gameState;
  const isCurrentPlayer = result.playerId === socket?.id;
  const playerName = isCurrentPlayer ? 'You' : players[result.playerId]?.name;
  const outcomeText = isCurrentPlayer 
    ? (result.outcome === 'win' ? 'Won' : result.outcome === 'tie' ? 'Tied' : 'Lost')
    : (result.outcome === 'win' ? 'Won' : result.outcome === 'tie' ? 'Tied' : 'Lost');

  return (
    <div className={styles.resultsPanel}>
      <div className={styles.cardResult}>
        <div className={styles.cardValueContainer}>
          <div className={styles.cardValue}>
            {gameState.firstCard?.value}
            <span className={`${styles.cardSuit} ${styles[gameState.firstCard?.suit?.toLowerCase()]}`}>
              {gameState.firstCard?.suit === 'Hearts' ? '♥' : 
               gameState.firstCard?.suit === 'Diamonds' ? '♦' : 
               gameState.firstCard?.suit === 'Clubs' ? '♣' : '♠'}
            </span>
          </div>
          <div className={`${styles.cardLabel} ${styles.leftCard}`}>Left</div>
        </div>
        
        <div className={styles.cardValueContainer}>
          <div className={styles.cardValue}>
            {gameState.thirdCard?.value}
            <span className={`${styles.cardSuit} ${styles[gameState.thirdCard?.suit?.toLowerCase()]}`}>
              {gameState.thirdCard?.suit === 'Hearts' ? '♥' : 
               gameState.thirdCard?.suit === 'Diamonds' ? '♦' : 
               gameState.thirdCard?.suit === 'Clubs' ? '♣' : '♠'}
            </span>
          </div>
          <div className={`${styles.cardLabel} ${styles.middleCard}`}>Middle</div>
        </div>
        
        <div className={styles.cardValueContainer}>
          <div className={styles.cardValue}>
            {gameState.secondCard?.value}
            <span className={`${styles.cardSuit} ${styles[gameState.secondCard?.suit?.toLowerCase()]}`}>
              {gameState.secondCard?.suit === 'Hearts' ? '♥' : 
               gameState.secondCard?.suit === 'Diamonds' ? '♦' : 
               gameState.secondCard?.suit === 'Clubs' ? '♣' : '♠'}
            </span>
          </div>
          <div className={`${styles.cardLabel} ${styles.rightCard}`}>Right</div>
        </div>
      </div>

      <div className={styles.resultContent}>
        <h2 className={`${styles.resultText} ${styles[result.outcome + 'Text']}`}>
          {playerName} {outcomeText}!
        </h2>
        
        {result.winnings > 0 && (
          <p className={styles.winningsText}>
            Winnings: ${result.winnings}
          </p>
        )}
        
        {resultCountdown && (
          <div className={styles.countdownContainer}>
            <p className={styles.countdownText}>
              Next hand in: {resultCountdown.countdownSeconds}s
            </p>
            <div className={styles.countdownProgress}>
              <div 
                className={styles.countdownBar} 
                style={{ width: `${(resultCountdown.countdownSeconds / 5) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsPanel;
