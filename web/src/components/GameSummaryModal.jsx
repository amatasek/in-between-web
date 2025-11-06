import { useMemo, useState, useEffect } from 'react';
import { ArrowRightLeft, ArrowRight, ArrowLeft } from 'lucide-react';
import BaseModal from './common/BaseModal';
import CurrencyAmount from './common/CurrencyAmount';
import GameStats from './GameStats';
import TransactionDownloadButton from './common/TransactionDownloadButton';
import Username from './common/Username';
import styles from './styles/GameSummaryModal.module.css';

/**
 * Game Summary Modal component that displays running scores and settle-up calculations
 * Can be used with active game data from GameContext or with historical game data passed directly
 */
const GameSummaryModal = ({ onClose, gameData }) => {
  // Hooks must be at the top - before any early returns
  const [activeTab, setActiveTab] = useState('info');
  const [gameDuration, setGameDuration] = useState(0);
  const [showOptimized, setShowOptimized] = useState(false);

  // Extract data from gameData with clean access now that structure is consistent
  const gameId = gameData?.id || 'unknown';

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

  // Calculate game start time from createdAt or first transaction
  const gameStartTime = useMemo(() => {
    // Historical games have createdAt
    if (gameData?.createdAt) {
      return new Date(gameData.createdAt).getTime();
    }

    // Active games - use first transaction timestamp
    if (transactions.length > 0) {
      return new Date(transactions[0].timestamp).getTime();
    }

    // Fallback to now
    return Date.now();
  }, [gameData?.createdAt, transactions]);

  // Calculate game end time (for historical games)
  const gameEndTime = useMemo(() => {
    if (gameData?.endedAt) {
      return new Date(gameData.endedAt).getTime();
    }
    return null; // Active game - no end time
  }, [gameData?.endedAt]);

  // Update duration periodically for active games
  useEffect(() => {
    const updateDuration = () => {
      const now = gameEndTime || Date.now();
      const durationMs = now - gameStartTime;
      setGameDuration(durationMs);
    };

    // Initial update
    updateDuration();

    // Only set interval for active games (no end time)
    if (!gameEndTime) {
      const interval = setInterval(updateDuration, 1000);
      return () => clearInterval(interval);
    }
  }, [gameStartTime, gameEndTime]);

  // Format duration as HH:MM:SS
  const formatDuration = (ms) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    const s = seconds % 60;
    const m = minutes % 60;

    return `${hours.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Calculate optimized payments
  const optimizedPayments = useMemo(() => {
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
              className={`tab-button ${activeTab === 'info' ? 'active' : ''}`}
              onClick={() => setActiveTab('info')}
              data-gamepad-focusable="true"
            >
              Info
            </button>
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
          </div>

          {/* Info Tab Content */}
          {activeTab === 'info' && (
            <div className="tab-content">
              <div className={styles.infoTable}>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Game Name:</span>
                  <span className={styles.infoValue}>{gameId}</span>
                </div>

                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Privacy:</span>
                  <span className={styles.infoValue}>
                    {gameData?.settings?.isPrivate ? 'Private' : 'Public'}
                  </span>
                </div>

                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Duration:</span>
                  <span className={styles.infoValue}>{formatDuration(gameDuration)}</span>
                </div>

                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Rounds:</span>
                  <span className={styles.infoValue}>
                    {gameData?.roundCount || gameData?.round || 1}
                  </span>
                </div>

                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Players:</span>
                  <span className={styles.infoValue}>
                    {gameData?.totalPlayerCount || Object.keys(players).length}
                  </span>
                </div>

                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Ante Amount:</span>
                  <span className={styles.infoValue}>
                    <CurrencyAmount amount={gameData?.settings?.anteAmount || gameData?.anteAmount || 1} size="small" />
                  </span>
                </div>

                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Ace Choice:</span>
                  <span className={styles.infoValue}>
                    {gameData?.settings?.enableAceChoice ? 'Enabled' : 'Disabled'}
                  </span>
                </div>

                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Second Chance:</span>
                  <span className={styles.infoValue}>
                    {gameData?.settings?.enableSecondChance ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Totals Tab Content */}
          {activeTab === 'totals' && (
            <div className="tab-content">
              {Object.keys(playerTotals).length === 0 ? (
                <p className={styles.noDataMessage}>No transactions recorded yet.</p>
              ) : (
                <>
                  {!showOptimized ? (
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
                  ) : (
                    <div className={styles.totalsTable}>
                      {optimizedPayments.length === 0 ? (
                        <p className={styles.noDataMessage}>No payments needed.</p>
                      ) : (
                        optimizedPayments.map((payment) => (
                          <div key={`${payment.fromName}-${payment.toName}-${payment.amount}`} className={styles.totalRow}>
                            <span className={styles.paymentText}>
                              <span className={styles.playerName}>
                                <Username username={payment.fromName} showDiscriminator={true} />
                              </span>
                              <ArrowRight size={16} className={styles.paymentArrow} />
                              <span className={styles.playerName}>
                                <Username username={payment.toName} showDiscriminator={true} />
                              </span>
                            </span>
                            <span className={styles.paymentAmount}>
                              <CurrencyAmount amount={payment.amount} size="small" />
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  )}

                  <div className={styles.optimizeButtonContainer}>
                    <button
                      type="button"
                      className={styles.optimizeButton}
                      onClick={() => setShowOptimized(!showOptimized)}
                      data-gamepad-focusable="true"
                    >
                      {showOptimized ? (
                        <ArrowLeft size={14} className={styles.optimizeIcon} />
                      ) : (
                        <ArrowRightLeft size={14} className={styles.optimizeIcon} />
                      )}
                      {showOptimized ? 'Return to totals' : 'Optimize ledger'}
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
          
          {/* Stats Tab Content */}
          {activeTab === 'stats' && (
            <GameStats gameData={gameData} />
          )}
    </BaseModal>
  );
};

export default GameSummaryModal;
