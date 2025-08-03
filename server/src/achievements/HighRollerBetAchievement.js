const BaseAchievement = require('./BaseAchievement');

/**
 * HighRollerBetAchievement - Place a bet of 250 or more coins
 */
class HighRollerBetAchievement extends BaseAchievement {
  constructor() {
    super('high_roller_bet', 'Big Spender', 'Placed a 250+ coin bet like money means nothing');
  }

  checkGame(game, userId, username) {
    // Check if player placed a 250+ bet in this game
    const transactions = game.gameTransactions || [];
    const playerTransactions = transactions.filter(tx => tx.userId === userId);
    
    // Look for any bet transaction of 250 or more
    return playerTransactions.some(tx => {
      const txType = (tx.transactionType || '').toLowerCase();
      return txType.includes('bet') && Math.abs(tx.amount) >= 250;
    });
  }

  async checkHistorical(context, userId, username) {
    // Check game history for any bet of 250+ coins
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

        // Check for any bet of 250+ coins
        for (const tx of userTransactions) {
          const txType = (tx.transactionType || '').toLowerCase();
          if (txType.includes('bet') && Math.abs(tx.amount || 0) >= 250) {
            return true;
          }
        }
      }

      return false;
    } catch (error) {
      console.error('[HighRollerBetAchievement] Error checking historical data:', error);
      return false;
    }
  }
}

module.exports = HighRollerBetAchievement;