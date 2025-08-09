import { useMemo } from 'react';
import styles from './styles/GameStats.module.css';
import CurrencyAmount from './common/CurrencyAmount';

const GameStats = ({ gameData }) => {
  const transactions = gameData.gameTransactions;
  const players = gameData.players;
  
  // Construct player names from both players and transactions
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

  // Calculate game statistics from transaction data
  const gameStats = useMemo(() => {
    if (transactions.length === 0) {
      return [];
    }

    // Helper function to format numbers with commas
    const formatNumber = (num) => num.toLocaleString();

    // Group transactions by player
    const playerTransactions = {};
    transactions.forEach(tx => {
      if (!playerTransactions[tx.playerId]) {
        playerTransactions[tx.playerId] = [];
      }
      playerTransactions[tx.playerId].push(tx);
    });

    // Get rounds from game data
    const rounds = gameData.round || 1;
    
    // Calculate total decks - get from game data, not transactions
    const decks = gameData.deckCount || 1;

    // Calculate total ante amount
    const totalAnteAmount = transactions
      .filter(tx => tx.transactionType === 'Ante')
      .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

    // Calculate total bet amount
    const totalBetAmount = transactions
      .filter(tx => tx.transactionType === 'Bet')
      .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

    // Calculate biggest single bet
    const bets = transactions.filter(tx => tx.transactionType === 'Bet');
    const biggestBet = bets.length > 0 ?
      bets.reduce((max, tx) => Math.abs(tx.amount) > Math.abs(max.amount) ? tx : max, bets[0]) :
      null;

    // Calculate biggest pot
    const biggestPot = transactions.reduce((max, tx) => tx.potAmount > max ? tx.potAmount : max, 0);

    // Calculate total penalties
    const penalties = transactions.filter(tx => tx.transactionType === '2x' || tx.transactionType === '3x');
    const totalPenaltyAmount = penalties.reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

    // Calculate player with most bets (aggressive player)
    const playerBetCounts = {};
    bets.forEach(tx => {
      playerBetCounts[tx.playerId] = (playerBetCounts[tx.playerId] || 0) + 1;
    });

    let mostAggressivePlayerId = null;
    let mostBets = 0;
    
    Object.entries(playerBetCounts).forEach(([playerId, count]) => {
      if (count > mostBets) {
        mostBets = count;
        mostAggressivePlayerId = playerId;
      }
    });

    // Calculate average bet size by player
    const playerBetTotals = {};
    bets.forEach(tx => {
      if (!playerBetTotals[tx.playerId]) {
        playerBetTotals[tx.playerId] = { total: 0, count: 0 };
      }
      playerBetTotals[tx.playerId].total += Math.abs(tx.amount);
      playerBetTotals[tx.playerId].count += 1;
    });

    // Find player with highest average bet
    let highestAvgBetPlayerId = null;
    let highestAvgBet = 0;
    
    Object.entries(playerBetTotals).forEach(([playerId, data]) => {
      const avg = data.total / data.count;
      if (avg > highestAvgBet) {
        highestAvgBet = avg;
        highestAvgBetPlayerId = playerId;
      }
    });

    // Calculate player wins count
    const playerWins = {};
    transactions
      .filter(tx => tx.transactionType === 'Win')
      .forEach(tx => {
        playerWins[tx.playerId] = (playerWins[tx.playerId] || 0) + 1;
      });

    // Find most winning player
    let mostWinningPlayerId = null;
    let mostWins = 0;
    
    Object.entries(playerWins).forEach(([playerId, wins]) => {
      if (wins > mostWins) {
        mostWins = wins;
        mostWinningPlayerId = playerId;
      }
    });

    // Calculate penalty counts by player
    const playerPenalties = {};
    penalties.forEach(tx => {
      playerPenalties[tx.playerId] = (playerPenalties[tx.playerId] || 0) + 1;
    });

    // Find player with most penalties
    let mostPenaltiesPlayerId = null;
    let mostPenalties = 0;
    
    Object.entries(playerPenalties).forEach(([playerId, count]) => {
      if (count > mostPenalties) {
        mostPenalties = count;
        mostPenaltiesPlayerId = playerId;
      }
    });

    // Use server-side calculated totals
    const playerProfits = gameData.totals || {};

    // Find biggest winner and loser
    let biggestWinnerId = null;
    let biggestWin = 0;
    let biggestLoserId = null;
    let biggestLoss = 0;
    
    Object.entries(playerProfits).forEach(([playerId, profit]) => {
      if (profit > biggestWin) {
        biggestWin = profit;
        biggestWinnerId = playerId;
      }
      if (profit < biggestLoss) {
        biggestLoss = profit;
        biggestLoserId = playerId;
      }
    });

    // Build stats array with all the interesting stats we've calculated
    return [
      {
        key: 'totalDecks',
        label: 'Total Decks',
        value: decks,
        type: 'number'
      },
      {
        key: 'totalRounds',
        label: 'Total Rounds',
        value: rounds,
        type: 'number'
      },
      {
        key: 'totalBets',
        label: 'Total Bets Placed',
        value: bets.length,
        type: 'number'
      },
      {
        key: 'totalAnte',
        label: 'Total Ante Amount',
        value: totalAnteAmount,
        type: 'currency'
      },
      {
        key: 'totalBetAmount',
        label: 'Total Bet Amount',
        value: totalBetAmount,
        type: 'currency'
      },
      {
        key: 'biggestPot',
        label: 'Biggest Pot',
        value: biggestPot,
        type: 'currency'
      },
      {
        key: 'biggestBet',
        label: 'Biggest Single Bet',
        value: biggestBet ? Math.abs(biggestBet.amount) : 0,
        type: 'currency',
        suffix: biggestBet ? ` by ${biggestBet.playerName}` : ''
      },
      {
        key: 'biggestWinner',
        label: 'Biggest Winner',
        value: biggestWinnerId ? playerNames[biggestWinnerId] || 'Unknown Player' : 'N/A',
        type: 'text',
        suffix: biggestWinnerId ? ` (+${formatNumber(biggestWin)})` : ''
      },
      {
        key: 'biggestLoser',
        label: 'Biggest Loser',
        value: biggestLoserId ? playerNames[biggestLoserId] || 'Unknown Player' : 'N/A',
        type: 'text',
        suffix: biggestLoserId ? ` (${formatNumber(biggestLoss)})` : ''
      },
      {
        key: 'mostAggressive',
        label: 'Most Aggressive Player',
        value: mostAggressivePlayerId ? playerNames[mostAggressivePlayerId] || 'Unknown Player' : 'N/A',
        type: 'text',
        suffix: mostAggressivePlayerId ? ` (${formatNumber(mostBets)} bets)` : ''
      },
      {
        key: 'highestAvgBet',
        label: 'Highest Average Bet',
        value: highestAvgBetPlayerId ? playerNames[highestAvgBetPlayerId] || 'Unknown Player' : 'N/A',
        type: 'text',
        suffix: highestAvgBetPlayerId ? ` (avg: ${formatNumber(Math.round(highestAvgBet))})` : ''
      },
      {
        key: 'mostWinning',
        label: 'Most Winning Player',
        value: mostWinningPlayerId ? playerNames[mostWinningPlayerId] || 'Unknown Player' : 'N/A',
        type: 'text',
        suffix: mostWinningPlayerId ? ` (${formatNumber(mostWins)} wins)` : ''
      },
      {
        key: 'totalPenalties',
        label: 'Total Penalties',
        value: penalties.length,
        type: 'number',
        suffix: penalties.length > 0 ? ` (${formatNumber(totalPenaltyAmount)} coins)` : ''
      },
      {
        key: 'unluckyPlayer',
        label: 'Most Penalized Player',
        value: mostPenaltiesPlayerId ? playerNames[mostPenaltiesPlayerId] || 'Unknown Player' : 'N/A',
        type: 'text',
        suffix: mostPenaltiesPlayerId ? ` (${formatNumber(mostPenalties)} penalties)` : ''
      }
    ];
  }, [transactions, playerNames]);

  // Helper function to format stat values based on their type
  const formatStatValue = (type, value) => {
    // Handle different types of values appropriately
    if (type === 'currency') {
      // Return CurrencyAmount component for currency values
      return <CurrencyAmount amount={value} size="small" />;
    }
    
    if (type === 'percentage') {
      return `${(value * 100).toFixed(1)}%`;
    }
    
    if (type === 'number') {
      return value.toLocaleString();
    }
    
    // Default return for text and other types
    return value;
  };

  return (
    <div className={styles.tabContent}>
      {gameStats.length === 0 ? (
        <p className={styles.noDataMessage}>No statistics available for this game.</p>
      ) : (
        <div className={styles.statsGrid}>
          {gameStats.map((stat) => (
            <div key={stat.key} className={`panel-alt ${styles.statItem}`}>
              <div className={styles.statLabel}>{stat.label}</div>
              <div className={styles.statValue}>
                {formatStatValue(stat.type, stat.value)}
                {stat.suffix && <span className={styles.statSuffix}>{stat.suffix}</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GameStats;
