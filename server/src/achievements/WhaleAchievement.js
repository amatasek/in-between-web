const BaseAchievement = require('./BaseAchievement');

/**
 * WhaleAchievement - Place a bet of 500 or more coins
 */
class WhaleAchievement extends BaseAchievement {
  constructor() {
    super('whale', 'Whale', 'Dropped 500+ coins on a single bet (are you okay?)');
  }

  checkGame(game, userId, username) {
    // Check if player placed a 500+ bet in this game
    const transactions = game.gameTransactions || [];
    const playerTransactions = transactions.filter(tx => tx.userId === userId);
    
    // Look for any bet transaction of 500 or more
    return playerTransactions.some(tx => {
      const txType = (tx.transactionType || '').toLowerCase();
      return txType.includes('bet') && Math.abs(tx.amount) >= 500;
    });
  }

  async checkHistorical(context, userId, username) {
    // Check game history for any bet of 500+ coins
    if (!context.gameHistoryService) return false;

    try {
      const gameHistory = await context.gameHistoryService.getPagedHistoricalGames({
        playerName: username,
        limit: 100000
      });

      for (const game of gameHistory.games) {
        const gameData = game.gameData || game;
        const transactions = gameData.gameTransactions || [];
        
        // Filter to user's transactions
        const userTransactions = transactions.filter(tx => {
          const playerName = tx.player || tx.playerName;
          return playerName && playerName.toLowerCase() === username.toLowerCase();
        });

        // Check for any bet of 500+ coins
        for (const tx of userTransactions) {
          const txType = (tx.transactionType || '').toLowerCase();
          if (txType.includes('bet') && Math.abs(tx.amount || 0) >= 500) {
            return true;
          }
        }
      }

      return false;
    } catch (error) {
      console.error('[WhaleAchievement] Error checking historical data:', error);
      return false;
    }
  }
}

module.exports = WhaleAchievement;