import React, { useMemo, useState } from 'react';
import styles from './styles/GameSummaryModal.module.css';
import CurrencyAmount from './common/CurrencyAmount';
import TransactionDownloadButton from './common/TransactionDownloadButton';
import GameStats from './GameStats';

/**
 * Game Summary Modal component that displays running scores and settle-up calculations
 * Can be used with active game data from GameContext or with historical game data passed directly
 */
const GameSummaryModal = ({ onClose, gameData }) => {
  if (!gameData) {
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h2>Game Summary</h2>
            <button className={styles.closeButton} onClick={onClose} data-gamepad-focusable="true">×</button>
          </div>
          <div className={styles.settingsContainer}>
            <div className={styles.loadingMessage}>Loading game data...</div>
          </div>
        </div>
      </div>
    );
  }

  // Extract data from gameData with clean access now that structure is consistent
  const gameTransactions = gameData.gameTransactions || [];
  const players = gameData.players || {};
  const gameId = gameData.id || 'unknown';
  const showPayoutsTab = gameData.settings?.isPrivate || false;
  
  // Ensure gameTransactions is always an array
  const transactions = Array.isArray(gameTransactions) ? gameTransactions : [];
  
  // Get player names (including those who left)
  const playerNames = {};
  
  // First add current players
  Object.entries(players).forEach(([playerId, player]) => {
    playerNames[playerId] = player.name;
  });
  
  // Then add players who left but have transactions
  transactions.forEach(tx => {
    if (tx.playerId && !playerNames[tx.playerId]) {
      playerNames[tx.playerId] = tx.playerName || 'Unknown Player';
    }
  });

  // Calculate player totals directly from flat transaction array
  const playerTotals = useMemo(() => {
    const totals = {};
    
    // Group transactions by player ID and sum up amounts
    transactions.forEach(tx => {
      if (!tx.playerId) return;
      
      if (!totals[tx.playerId]) {
        totals[tx.playerId] = 0;
      }
      
      totals[tx.playerId] += tx.amount;
    });
    
    return totals;
  }, [transactions]);
  
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

  // Track the active tab - start with 'totals' tab
  const [activeTab, setActiveTab] = useState('totals');

  return (
    <div className={styles.modalOverlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Game Summary ({gameId})</h2>
          <div className={styles.headerButtons}>
            <TransactionDownloadButton gameState={gameData} />
            <button className={styles.closeButton} onClick={onClose} data-gamepad-focusable="true">×</button>
          </div>
        </div>
        
        <div className={styles.settingsContainer}>
          {/* Tab Bar Navigation */}
          <div className={styles.tabsContainer}>
            <button 
              className={`${styles.tabButton} ${activeTab === 'totals' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('totals')}
              data-gamepad-focusable="true"
            >
              Totals
            </button>
            
            <button 
              className={`${styles.tabButton} ${activeTab === 'stats' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('stats')}
              data-gamepad-focusable="true"
            >
              Stats
            </button>
            
            {showPayoutsTab && (
              <button 
                className={`${styles.tabButton} ${activeTab === 'payouts' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('payouts')}
                data-gamepad-focusable="true"
              >
                Payouts
              </button>
            )}
          </div>

          {/* Totals Tab Content */}
          {activeTab === 'totals' && (
            <div className={styles.tabContent}>
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
          )}
          
          {/* Stats Tab Content */}
          {activeTab === 'stats' && (
            <GameStats gameData={gameData} />
          )}

          {/* Payouts Tab Content - Only shown for private games and when selected */}
          {activeTab === 'payouts' && showPayoutsTab && (
            <div className={styles.tabContent}>
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
          )}
        </div>
      </div>
    </div>
  );
};

export default GameSummaryModal;
