import { useMemo, useState } from 'react';
import BaseModal from './common/BaseModal';
import CurrencyAmount from './common/CurrencyAmount';
import GameStats from './GameStats';
import TransactionDownloadButton from './common/TransactionDownloadButton';
import Username from './Username';
import styles from './styles/GameSummaryModal.module.css';

/**
 * Game Summary Modal component that displays running scores and settle-up calculations
 * Can be used with active game data from GameContext or with historical game data passed directly
 */
const GameSummaryModal = ({ onClose, gameData }) => {
  // Hooks must be at the top - before any early returns
  const [activeTab, setActiveTab] = useState('totals');

  // Extract data from gameData with clean access now that structure is consistent
  const gameId = gameData?.id || 'unknown';
  const showPayoutsTab = gameData?.settings?.isPrivate || false;

  // Memoize players object to prevent recreation on every render
  const players = useMemo(() => gameData?.players || {}, [gameData?.players]);

  // Memoize transactions array to prevent recreation on every render
  const transactions = useMemo(() => {
    const gameTransactions = gameData?.gameTransactions || [];
    return Array.isArray(gameTransactions) ? gameTransactions : [];
  }, [gameData?.gameTransactions]);

  // Get player names (including those who left)
  const playerNames = useMemo(() => {
    const names = {};

    // First add current players
    Object.entries(players).forEach(([playerId, player]) => {
      names[playerId] = player.name;
    });

    // Then add players who left but have transactions
    transactions.forEach(tx => {
      if (tx.playerId && !names[tx.playerId]) {
        names[tx.playerId] = tx.playerName || 'Unknown Player';
      }
    });

    return names;
  }, [players, transactions]);

  // Use server-side calculated totals (active games have totals, historical games have it at top level)
  const playerTotals = useMemo(() => gameData.totals || {}, [gameData.totals]);

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
      .filter(([, amount]) => amount < 0)
      .map(([playerId, amount]) => ({
        playerId,
        playerName: playerNames[playerId] || 'Unknown Player',
        amount: Math.abs(amount) // Convert to positive amount for easier calculation
      }));

    const winners = Object.entries(playerTotals)
      .filter(([, amount]) => amount > 0)
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

  // Early return check AFTER all hooks
  if (!gameData) {
    return (
      <BaseModal
        title="Game Summary"
        onClose={onClose}
        style={{ maxWidth: 800, height: '80vh' }}
      >
        <div className={styles.loadingMessage}>Loading game data...</div>
      </BaseModal>
    );
  }

  return (
    <BaseModal
      title={`Game Summary (${gameId})`}
      onClose={onClose}
      headerButtons={<TransactionDownloadButton gameState={gameData} />}
      style={{ maxWidth: 800, height: '80vh' }}
    >
          {/* Tab Bar Navigation */}
          <div className="tabs-container">
            <button
              type="button"
              className={`tab-button ${activeTab === 'totals' ? 'active' : ''}`}
              onClick={() => setActiveTab('totals')}
              data-gamepad-focusable="true"
            >
              Totals
            </button>
            <button
              type="button"
              className={`tab-button ${activeTab === 'stats' ? 'active' : ''}`}
              onClick={() => setActiveTab('stats')}
              data-gamepad-focusable="true"
            >
              Stats
            </button>
            {showPayoutsTab && (
              <button
                type="button"
                className={`tab-button ${activeTab === 'payouts' ? 'active' : ''}`}
                onClick={() => setActiveTab('payouts')}
                data-gamepad-focusable="true"
              >
                Payouts
              </button>
            )}
          </div>

          {/* Totals Tab Content */}
          {activeTab === 'totals' && (
            <div className="tab-content">
              {Object.keys(playerTotals).length === 0 ? (
                <p className={styles.noDataMessage}>No transactions recorded yet.</p>
              ) : (
                <div className={styles.totalsTable}>
                  {Object.entries(playerTotals).map(([playerId, total]) => (
                    <div key={playerId} className={styles.totalRow}>
                      <span className={styles.playerName}>
                        <Username username={playerNames[playerId] || 'Unknown Player'} showDiscriminator={true} />
                      </span>
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
            <div className="tab-content">
              {settleUpPayments.length === 0 ? (
                <p className={styles.noDataMessage}>No payments needed or no transactions recorded yet.</p>
              ) : (
                <div className={styles.settleUpTable}>
                  {settleUpPayments.map((payment) => (
                    <div key={`${payment.fromName}-${payment.toName}-${payment.amount}`} className={styles.paymentRow}>
                      <span className={styles.paymentText}>
                        <span className={styles.playerName}>
                          <Username username={payment.fromName} showDiscriminator={true} />
                        </span> pays{' '}
                        <span className={styles.playerName}>
                          <Username username={payment.toName} showDiscriminator={true} />
                        </span>
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
    </BaseModal>
  );
};

export default GameSummaryModal;
