const BaseAchievement = require('./BaseAchievement');

/**
 * BigWinnerAchievement - Be up at least 1000 coins during a game
 */
class BigWinnerAchievement extends BaseAchievement {
  constructor() {
    super('big_winner', 'Bankroll', 'Up 1000 coins? Someone\'s feeling fancy!');
  }

  checkGame(game, userId, username) {
    // Check if player is currently up 1000+ coins in this game
    const player = game.players[userId];
    if (!player) return false;

    // Calculate net winnings for this game
    const transactions = game.gameTransactions || [];
    const playerTransactions = transactions.filter(tx => tx.userId === userId);
    
    let netWinnings = 0;
    for (const tx of playerTransactions) {
      netWinnings += tx.amount;
    }

    return netWinnings >= 1000;
  }

  async checkHistorical(context, userId, username) {
    // Check game history for any game where player was up 1000+ coins
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

        // Calculate net winnings for this game
        let netWinnings = 0;
        for (const tx of userTransactions) {
          netWinnings += tx.amount || 0;
        }

        if (netWinnings >= 1000) {
          return true;
        }
      }

      return false;
    } catch (error) {
      console.error('[BigWinnerAchievement] Error checking historical data:', error);
      return false;
    }
  }
}

module.exports = BigWinnerAchievement;