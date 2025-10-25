import React, { useState } from 'react';
import styles from './styles/BettingOverlay.module.css';
import { useGameContext } from '../contexts/GameContext';
import { useSocket } from '../contexts/SocketContext';
import CurrencyAmount from './common/CurrencyAmount';
import PotButton from './PotButton';
import WaitingTimer from './common/WaitingTimer';
import CountdownTimer from './common/CountdownTimer';
import GamepadInput from './GamepadInput';
import { ICONS, TIMERS } from '../constants';

const BettingOverlay = ({ isCurrentPlayersTurn }) => {
  const { gameState, placeBet } = useGameContext();
  const { socket } = useSocket();
  const [customBet, setCustomBet] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  
  if (!gameState || !isCurrentPlayersTurn) {
    return (
      <WaitingTimer 
        playerName={gameState?.players[gameState.currentPlayerId]?.name || 'Player'}
        action="betting"
        duration={TIMERS.BETTING_DURATION}
      />
    );
  }
  
  const { pot: potAmount, firstCard, secondCard, players, currentPlayerId, anteAmount = 1 } = gameState;
  const currentPlayer = players[currentPlayerId];
  const playerBalance = currentPlayer?.balance || 0;

  // Calculate spread
  const spread = Math.abs(firstCard.numericValue - secondCard.numericValue) - 1;

  // Check if both outer cards are Aces (risk of 3x penalty)
  const bothAces = firstCard?.value === 'A' && secondCard?.value === 'A';

  // Calculate max bet accounting for potential penalties:
  // - Both Aces: Risk of 3x penalty, so max bet = balance / 3
  // - Normal: Risk of 2x penalty (tie), so max bet = balance / 2
  const maxBetByBalance = bothAces ? Math.floor(playerBalance / 3) : Math.floor(playerBalance / 2);
  const maxBet = Math.min(potAmount, maxBetByBalance);
  const minBet = anteAmount;

  // Preset bet amounts - show only the highest 3 available that are >= minBet
  const presetBets = [1, 5, 10, 20, 50, 100].filter(amount => amount >= minBet && amount <= maxBet).slice(-3);
  
  const handleBet = (amount) => {
    if (amount >= minBet && amount <= maxBet) {
      placeBet(amount);
      setShowCustomInput(false);
    }
  };
  
  const handleFold = () => {
    placeBet(0);
  };
  
  const handleCustomBet = () => {
    const amount = parseInt(customBet);
    if (!isNaN(amount) && amount >= minBet && amount <= maxBet) {
      handleBet(amount);
      setCustomBet('');
    }
  };
  
  return (
    <div className={`panel-game ${styles.bettingOverlay}`}>
      {/* Timer */}
      <div className={styles.timerContainer}>
        <CountdownTimer duration={30} isActive={true} />
      </div>
      
      {!showCustomInput ? (
        <>
          {/* Pass button */}
          <button
            className={`${styles.betButton} ${styles.passButton}`}
            onClick={handleFold}
            data-gamepad-focusable="true"
            autoFocus
          >
            <span>PASS</span>
          </button>
          
          {/* Preset bet buttons */}
          {presetBets.map(amount => (
            <button
              key={amount}
              className={`${styles.betButton} ${styles.amountButton}`}
              onClick={() => handleBet(amount)}
              data-gamepad-focusable="true"
            >
              <div className={styles.amountPill}>
                <CurrencyAmount amount={amount} size="small" />
              </div>
            </button>
          ))}
          
          {/* POT button */}
          {maxBet === potAmount && (
            <div className={styles.potButtonWrapper}>
              <PotButton 
                onClick={() => handleBet(potAmount)}
                disabled={false}
                amount={potAmount}
              />
            </div>
          )}
          
          {/* Custom button */}
          <button
            className={`${styles.betButton} ${styles.customButton}`}
            onClick={() => setShowCustomInput(true)}
            data-gamepad-focusable="true"
          >
            <span>CUSTOM</span>
          </button>
        </>
      ) : (
        /* Custom bet input - takes over entire overlay */
        <div className={styles.customInput}>
          <GamepadInput
            title="Enter Custom Bet"
            type="number"
            value={customBet}
            onChange={(e) => setCustomBet(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleCustomBet()}
            placeholder={`${minBet}-${maxBet}`}
            min={minBet}
            max={maxBet}
            autoFocus
            className={styles.betInput}
          />
          <button 
            onClick={handleCustomBet}
            className={styles.confirmButton}
            data-gamepad-focusable="true"
          >
            {ICONS.CHECK}
          </button>
          <button 
            onClick={() => {
              setShowCustomInput(false);
              setCustomBet('');
            }}
            className={styles.cancelButton}
            data-gamepad-focusable="true"
          >
            {ICONS.CROSS}
          </button>
        </div>
      )}
    </div>
  );
};

export default BettingOverlay;