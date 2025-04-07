import React, { useState } from 'react';
import styles from './styles/BettingPanel.module.css';
import { useGameContext } from '../contexts/GameContext';
import { useSocket } from '../contexts/SocketContext';
import CurrencyAmount from './common/CurrencyAmount';
import PotButton from './PotButton.jsx';

const BettingPanel = () => {
  // Get game state and actions from context
  const { gameState, placeBet } = useGameContext();
  const { socket } = useSocket();
  // Initialize state first - before any conditional returns
  const [customBet, setCustomBet] = useState('');
  
  if (!gameState) return null;
  
  const { 
    players, 
    currentPlayerId, 
    pot: potAmount, 
    phase,
    firstCard,
    secondCard
  } = gameState;
  
  // Only show in betting phase
  if (phase !== 'betting') return null;
  
  const isCurrentPlayer = socket && currentPlayerId === socket.id;
  const myPlayer = socket && players ? players[socket.id] : null;
  const playerBalance = Number(myPlayer?.balance || 0);
  
  const handleCustomBetChange = (e) => {
    // Only allow numbers
    const value = e.target.value.replace(/[^0-9]/g, '');
    
    // Don't allow bets greater than pot or player balance
    const maxBet = Math.min(potAmount, playerBalance);
    if (value && parseInt(value) > maxBet) {
      setCustomBet(maxBet.toString());
    } else {
      setCustomBet(value);
    }
  };
  
  const handleCustomBetSubmit = () => {
    if (customBet && !isNaN(customBet)) {
      const betAmount = parseInt(customBet, 10);
      // Verify bet is at least $1 and at most the pot/balance
      if (betAmount >= 1 && betAmount <= Math.min(potAmount, playerBalance)) {
        placeBet(betAmount);
        setCustomBet('');
      }
    }
  };
  
  // Helper to handle Enter key in the custom bet input
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCustomBetSubmit();
    }
  };
  

  
  const renderBettingControls = () => {
    if (!isCurrentPlayer) return null;
    
    return (
      <div className={styles.betContainer}>
        <p className={styles.betText}>Place your bet (Min: <CurrencyAmount amount={1} />, Max: <CurrencyAmount amount={Math.min(potAmount, playerBalance)} />)</p>
        
        {/* Extreme options row */}
        <div className={styles.extremeOptionsRow}>
          <button
            className={`${styles.betButton} ${styles.extremeButton} ${styles.passButton}`}
            onClick={() => placeBet(0)}
          >
            PASS
          </button>
          
          <PotButton 
            amount={potAmount}
            onClick={() => placeBet(potAmount)}
            disabled={potAmount > playerBalance}
          />
        </div>
        
        {/* Standard bet options */}
        <div className={styles.betButtons}>
          {[1, 2, 5].map(amount => {
            const maxBet = Math.min(potAmount, playerBalance);
            const disabled = amount > maxBet;
            return (
              <button
                key={amount}
                className={`${styles.betButton} ${disabled ? styles.disabledButton : ''}`}
                onClick={() => placeBet(amount)}
                disabled={disabled}
              >
                <CurrencyAmount amount={amount} />
              </button>
            );
          })}
          
          {/* Custom bet input */}
          <div className={styles.customBetContainer}>
            <input
              type="text"
              className={styles.customBetInput}
              placeholder="Custom"
              value={customBet}
              onChange={handleCustomBetChange}
              onKeyPress={handleKeyPress}
            />
            <button
              className={styles.customBetButton}
              onClick={handleCustomBetSubmit}
              disabled={!customBet}
            >
              Bet
            </button>
          </div>
        </div>
      </div>
    );
  };
  

  // Only render the panel for the current player
  if (!isCurrentPlayer) return null;
  
  return (
    <div className={styles.bettingPanel}>
      {renderBettingControls()}
    </div>
  );
};

export default BettingPanel;
