/**
 * PlayerStats - Model for calculating and representing player statistics
 * Works with the flat transaction array format from the Transaction model
 */
class PlayerStats {
  /**
   * Create a new PlayerStats instance
   * @param {Array} games - Array of games to process
   * @param {String} username - Username to match transactions against
   */
  constructor(games, username) {
    if (!games || !Array.isArray(games)) {
      games = [];
    }
    
    if (!username) {
      throw new Error('Username is required for PlayerStats');
    }
    
    // Initialize stats
    this.gamesPlayed = games.length;
    this.totalRounds = 0;
    this.totalBets = 0;
    this.totalWins = 0;
    this.totalPenalties = 0;
    this.penalties2x = 0;
    this.penalties3x = 0;
    this.totalProfit = 0;
    this.bestGameProfit = 0;
    this.longestGame = 0;
    this.potBets = 0;
    this.biggestBet = 0;
    this.biggestWin = 0;
    this.biggestLoss = 0;
    
    // Process all games to calculate stats
    this.gameStats = games.map(game => this._processGame(game, username));
    
    // Calculate aggregate stats
    this.gameStats.forEach(stats => {
      this.totalRounds += stats.rounds || 0;
      this.totalBets += stats.bets || 0;
      this.totalWins += stats.wins || 0;
      this.totalPenalties += stats.penalties || 0;
      this.penalties2x += stats.penalties2x || 0;
      this.penalties3x += stats.penalties3x || 0;
      this.totalProfit += stats.profit || 0;
      this.potBets += stats.potBets || 0;
      
      // Track some max values
      this.bestGameProfit = Math.max(this.bestGameProfit, stats.profit || 0);
      this.longestGame = Math.max(this.longestGame, stats.rounds || 0);
      this.biggestBet = Math.max(this.biggestBet, stats.biggestBet || 0);
      this.biggestWin = Math.max(this.biggestWin, stats.biggestWin || 0);
      this.biggestLoss = Math.max(this.biggestLoss, stats.biggestLoss || 0);
    });
    
    // Calculate derived stats
    this.averageRounds = this.gamesPlayed > 0 ? this.totalRounds / this.gamesPlayed : 0;
    this.winRate = this.totalBets > 0 ? this.totalWins / this.totalBets : 0;
    this.penaltyRate = this.totalBets > 0 ? this.totalPenalties / this.totalBets : 0;
    this.potBetRate = this.totalBets > 0 ? this.potBets / this.totalBets : 0;
    this.averageProfitPerRound = this.totalRounds > 0 ? this.totalProfit / this.totalRounds : 0;
    
    // For backwards compatibility
    this.betsPlaced = this.totalBets;
    this.betsWon = this.totalWins;
    this.betsLost = this.totalBets - this.totalWins;
    this.avgRounds = this.averageRounds;
    this.avgProfit = this.averageProfitPerGame;
    
    // Make the object immutable
    Object.freeze(this);
  }

  /**
   * Returns an array of formatted stats for UI display
   * @returns {Array} Array of stat objects with key, label, type, value and optional suffix
   */
  getStats() {
    return [
      { label: 'Games Played', value: this.gamesPlayed, type: 'number' },
      { label: 'Rounds Played', value: this.totalRounds, type: 'number' },
      { label: 'Average Rounds per Game', value: this.averageRounds, type: 'number' },
      { label: 'Longest Game', value: this.longestGame, suffix: 'rounds', type: 'number' },
      { label: 'POT Bets', value: this.potBets, type: 'number' },
      { label: 'POT Bet Rate', value: this.potBetRate, type: 'percentage' },
      { label: '2x Penalties', value: this.penalties2x, type: 'number' },
      { label: '3x Penalties', value: this.penalties3x, type: 'number' },
      { label: 'Penalty Rate', value: this.penaltyRate, type: 'percentage' },
      { label: 'Win Rate', value: this.winRate, type: 'percentage' },
      { label: 'Best Game Profit', value: this.bestGameProfit, type: 'currency' },
      { label: 'Biggest Bet', value: this.biggestBet, type: 'currency' },
      { label: 'Biggest Win', value: this.biggestWin, type: 'currency' },
      { label: 'Biggest Loss', value: this.biggestLoss, type: 'currency' },
      { label: 'Total Won/Lost', value: this.totalProfit, type: 'currency' },
    ];
  }
  
  /**
   * Process a single game to extract player-specific statistics
   * @private
   * @param {Object} game - Game object to process
   * @param {String} username - Username to match transactions against
   * @returns {Object} Game-specific statistics
   */
  _processGame(game, username) {
    // Get the game data and transactions (support both direct and nested formats)
    const gameData = game.gameData || game;
    const gameId = gameData._id || gameData.id || 'unknown';
    const gameRounds = gameData.roundCount || gameData.round || 0;
    
    // Extract transactions from either format
    const allTransactions = gameData.gameTransactions || [];
    
    // Filter to only this player's transactions
    const userTransactions = this._filterUserTransactions(allTransactions, username);
    
    // Create stats object for this game
    const stats = {
      gameId,
      rounds: gameRounds,
      bets: 0,
      potBets: 0, 
      wins: 0,
      penalties: 0,
      penalties2x: 0,
      penalties3x: 0,
      profit: 0,
      biggestBet: 0,
      biggestWin: 0,
      biggestLoss: 0,
      date: gameData.dateCreated || gameData.archivedDate || new Date().toISOString()
    };
    
    // Process each transaction
    userTransactions.forEach(tx => {
      const amount = tx.amount || 0;
      const originalPot = tx.potAmount + amount;
      
      // Use transactionType as the primary identifier
      const txType = (tx.transactionType || '').toLowerCase();
      // Fallback to reason only if transactionType is not available
      const txReason = !txType ? (tx.reason || '').toLowerCase() : '';
      
      // Count types of actions
      if (txType.includes('bet')) {
        stats.bets++;
        
        if (Math.abs(amount) === originalPot) {
          stats.potBets++;
        }
      }
      
      // Track wins separately for win rate calculation
      if (txType.includes('win')) {
        stats.wins++;
        // Track biggest win
        if (amount > stats.biggestWin) {
          stats.biggestWin = amount;
        }
      }
      
      // Track biggest bet and biggest loss
      if (txType.includes('bet')) {
        // For bets, track the absolute amount as the bet size
        const betAmount = Math.abs(amount);
        if (betAmount > stats.biggestBet) {
          stats.biggestBet = betAmount;
        }
        // Also track bet amounts as potential losses since bets can be lost
        if (betAmount > stats.biggestLoss) {
          stats.biggestLoss = betAmount;
        }
      } else if (amount < 0) { 
        // For other losses (like penalties), also track as potential biggest loss
        const lossAmount = Math.abs(amount);
        if (lossAmount > stats.biggestLoss) {
          stats.biggestLoss = lossAmount;
        }
      }
      
      // For profit, simply sum all transaction amounts
      // Positive = player received money, negative = player paid money
      stats.profit += amount;
      
      // Process penalties based on transaction type
      if (txType === '2x' || txType === '3x' || txReason.includes('penalty')) {
        stats.penalties++;
        
        // Simple direct check of the transaction type
        if (txType === '2x') {
          stats.penalties2x++;
        } 
        else if (txType === '3x') {
          stats.penalties3x++;
        }
      }
    });
    
    return stats;
  }
  
  /**
   * Filter transactions to only those belonging to specified user
   * @private
   * @param {Array} transactions - Array of transactions
   * @param {String} username - Username to match against
   * @returns {Array} Filtered transactions
   */
  _filterUserTransactions(transactions, username) {
    if (!Array.isArray(transactions)) return [];
    
    return transactions.filter(tx => {
      const playerName = tx.player || tx.playerName;
      return playerName && playerName.toLowerCase() === username.toLowerCase();
    });
  }
}

module.exports = PlayerStats;
