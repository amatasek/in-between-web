import { useGameContext } from '../contexts/GameContext';
import styles from './styles/ResultsPanel.module.css';
import CurrencyAmount from './common/CurrencyAmount';

/**
 * Results panel component that displays the outcome of a hand during the results phase
 */
const ResultsPanel = () => {
  const { gameState } = useGameContext();

  // If there's no result, don't render anything
  if (!gameState.result) return null;

  const { result, players, resultCountdown } = gameState;
  const playerName = players[result.playerId]?.name;

  const renderWinResult = () => (
    <>
      <h2 className={`${styles.resultText} ${styles.winText}`}>
        {playerName} WON!
      </h2>
      {result.winnings > 0 && (
        <p className={styles.winningsText}>
          Winnings: <CurrencyAmount amount={result.winnings / 2} size="medium" />
        </p>
      )}
    </>
  );

  const renderLossResult = () => (
    <>
      <h2 className={`${styles.resultText} ${styles.loseText}`}>
        {playerName} LOST!
      </h2>
      {result.betAmount > 0 && (
        <p className={styles.winningsText}>
          Loss: <CurrencyAmount amount={result.betAmount} size="medium" />
        </p>
      )}
    </>
  );

  const renderTieResult = () => {
    const penaltyAmount = result.betAmount * (result.isTripleAceTie ? 3 : 2);
    
    return (
      <>
        <div className={styles.penaltyWarning}>
          <div className={styles.cautionTape}></div>
        </div>
        <h2 className={`${styles.resultText} ${styles.tieText}`}>
          {playerName} {result.isTripleAceTie ? '3X' : '2X'} PENALTY!
        </h2>
        {result.betAmount > 0 && (
          <p className={styles.winningsText}>
            Penalty: <CurrencyAmount amount={penaltyAmount} size="medium" />
          </p>
        )}
      </>
    );
  };

  const renderOutcome = () => {
    switch (result.outcome) {
      case 'win':
        return renderWinResult();
      case 'lose':
        return renderLossResult();
      case 'tie':
        return renderTieResult();
      default:
        return null;
    }
  };

  const panelClasses = result.outcome === 'tie' 
    ? `panel-alt ${styles.tiePanel}` 
    : 'panel-alt';

  return (
    <div className={panelClasses} style={{ 
      maxWidth: '500px', 
      margin: '1rem auto',
      width: '90%',
      animation: 'fadeIn 0.5s ease-out'
    }}>
      <div className={styles.resultContent}>
        {renderOutcome()}
        
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