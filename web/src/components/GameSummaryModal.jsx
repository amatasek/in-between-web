import React, { useMemo } from 'react';
import { useGameContext } from '../contexts/GameContext';
import styles from './styles/GameSummaryModal.module.css';
import CurrencyAmount from './common/CurrencyAmount';
import TransactionDownloadButton from './common/TransactionDownloadButton';

/**
 * Game Summary Modal component that displays running scores and settle-up calculations
 */
const GameSummaryModal = ({ onClose }) => {
  const { gameState } = useGameContext();
  
  if (!gameState) {
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h2>Game Summary</h2>
            <button className={styles.closeButton} onClick={onClose}>×</button>
          </div>
          <div className={styles.settingsContainer}>
            <div className={styles.loadingMessage}>Loading game data...</div>
          </div>
        </div>
      </div>
    );
  }

  const { gameTransactions = {}, players = {}, id: gameId } = gameState;
  
  // Get player names (including those who left)
  const playerNames = {};
  
  // First add current players
  Object.entries(players).forEach(([playerId, player]) => {
    playerNames[playerId] = player.name;
  });
  
  // Then add players who left but have transactions
  Object.entries(gameTransactions).forEach(([playerId, transactions]) => {
    if (!playerNames[playerId] && transactions && transactions.length > 0) {
      playerNames[playerId] = transactions[0].playerName || 'Unknown Player';
    }
  });

  // Calculate player totals directly from transactions
  const playerTotals = useMemo(() => {
    const totals = {};
    Object.entries(gameTransactions).forEach(([playerId, transactions]) => {
      if (!transactions || !Array.isArray(transactions)) return;
      totals[playerId] = transactions.reduce((sum, tx) => sum + tx.amount, 0);
    });
    return totals;
  }, [gameTransactions]);
  
  // Calculate settle-up payments
  const settleUpPayments = useMemo(() => {
    // For simple 2-player games, just have the loser pay the winner directly
    if (Object.keys(playerTotals).length === 2) {
      const players = Object.entries(playerTotals);
      const [player1Id, player1Total] = players[0];
      const [player2Id, player2Total] = players[1];
      
      // If totals sum to zero (or close to it), one player pays the other
      if (Math.abs(player1Total + player2Total) < 0.1) {
        if (player1Total > 0) {
          // Player 2 pays Player 1
          return [{
            from: player2Id,
            fromName: playerNames[player2Id],
            to: player1Id,
            toName: playerNames[player1Id],
            amount: Math.abs(player1Total)
          }];
        } else if (player2Total > 0) {
          // Player 1 pays Player 2
          return [{
            from: player1Id,
            fromName: playerNames[player1Id],
            to: player2Id,
            toName: playerNames[player2Id],
            amount: Math.abs(player2Total)
          }];
        }
      }
    }
    
    // For more complex cases with more players
    const payments = [];
    
    // Split into winners and losers
    const losers = Object.entries(playerTotals)
      .filter(([_, amount]) => amount < 0)
      .map(([playerId, amount]) => ({
        playerId,
        playerName: playerNames[playerId] || 'Unknown Player',
        amount: Math.abs(amount) // Convert to positive amount for easier calculation
      }));
    
    const winners = Object.entries(playerTotals)
      .filter(([_, amount]) => amount > 0)
      .map(([playerId, amount]) => ({
        playerId,
        playerName: playerNames[playerId] || 'Unknown Player',
        amount
      }));
    
    // Sort by amount (descending)
    losers.sort((a, b) => b.amount - a.amount);
    winners.sort((a, b) => b.amount - a.amount);
    
    // Process each winner, starting with the biggest winner
    while (winners.length > 0 && losers.length > 0) {
      const winner = winners[0];
      const loser = losers[0];
      
      // Calculate payment amount
      const paymentAmount = Math.min(winner.amount, loser.amount);
      
      if (paymentAmount > 0.01) { // Only process meaningful payments
        // Add payment
        payments.push({
          from: loser.playerId,
          fromName: loser.playerName,
          to: winner.playerId,
          toName: winner.playerName,
          amount: paymentAmount
        });
        

        
        // Update balances
        winner.amount -= paymentAmount;
        loser.amount -= paymentAmount;
        
        // Remove settled players or re-sort if they still have balance
        if (winner.amount < 0.01) {
          winners.shift();
        }
        
        if (loser.amount < 0.01) {
          losers.shift();
        }
      } else {
        // No meaningful payment possible
        break;
      }
    }
    
    return payments;
  }, [playerTotals, playerNames]);

  return (
    <div className={styles.modalOverlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Game Summary ({gameId})</h2>
          <div className={styles.headerButtons}>
            <TransactionDownloadButton gameState={gameState} />
            <button className={styles.closeButton} onClick={onClose}>×</button>
          </div>
        </div>
        
        <div className={styles.settingsContainer}>
          {/* Totals Section */}
          <div className={styles.settingSection}>
            <h3>Totals</h3>
            {Object.keys(playerTotals).length === 0 ? (
              <p className={styles.noDataMessage}>No transactions recorded yet.</p>
            ) : (
              <div className={styles.totalsTable}>
                {Object.entries(playerTotals).map(([playerId, total]) => (
                  <div key={playerId} className={styles.totalRow}>
                    <span className={styles.playerName}>{playerNames[playerId] || 'Unknown Player'}</span>
                    <span className={`${styles.totalAmount} ${total >= 0 ? styles.positive : styles.negative}`}>
                      <CurrencyAmount amount={total} size="small" />
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Settle Up Section */}
          <div className={styles.settingSection}>
            <h3>Settle Up</h3>
            {settleUpPayments.length === 0 ? (
              <p className={styles.noDataMessage}>No payments needed or no transactions recorded yet.</p>
            ) : (
              <div className={styles.settleUpTable}>
                {settleUpPayments.map((payment, index) => (
                  <div key={index} className={styles.paymentRow}>
                    <span className={styles.paymentText}>
                      <span className={styles.playerName}>{payment.fromName}</span> pays{' '}
                      <span className={styles.playerName}>{payment.toName}</span>
                    </span>
                    <span className={styles.paymentAmount}>
                      <CurrencyAmount amount={payment.amount} size="small" />
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameSummaryModal;
