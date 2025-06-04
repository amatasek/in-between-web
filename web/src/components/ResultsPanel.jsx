import React from 'react';
import { useGameContext } from '../contexts/GameContext';
import { useSocket } from '../contexts/SocketContext';
import styles from './styles/ResultsPanel.module.css';
import CurrencyAmount from './common/CurrencyAmount';

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
    ? (result.outcome === 'win' ? 'Won' : result.outcome === 'tie' ? 'PENALTY!' : 'Lost')
    : (result.outcome === 'win' ? 'Won' : result.outcome === 'tie' ? 'PENALTY!' : 'Lost');

  return (
    <div className={styles.resultsPanel}>
      {/* Card display section removed - cards are now visible in the game board */}

      <div className={styles.resultContent}>
        {result.outcome === 'tie' && (
          <div className={styles.penaltyWarning}>
            <div className={styles.cautionTape}></div>
          </div>
        )}
        <h2 className={`${styles.resultText} ${styles[result.outcome + 'Text']}`}>
          {playerName} {outcomeText}{result.outcome !== 'tie' && '!'}
        </h2>
        
        {result.winnings > 0 && (
          <p className={styles.winningsText}>
            Winnings: <CurrencyAmount amount={result.winnings / 2} size="medium" />
          </p>
        )}
        
        {result.outcome === 'tie' && (
          <p className={styles.penaltyText}>
            {result.isTripleAceTie ? '3X PENALTY' : '2X PENALTY'}
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
