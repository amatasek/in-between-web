const BaseAchievement = require('./BaseAchievement');

/**
 * ThreePenaltiesRowAchievement - Awarded for getting 3 penalties in a row
 * Any penalty (2x or 3x) on the same player's 3 consecutive turns qualifies
 */
class ThreePenaltiesRowAchievement extends BaseAchievement {
  constructor() {
    super('three_penalties_row', 'Cursed', 'Three strikes and you\'re... still here somehow');
  }

  checkGame(game, userId, username) {
    // Cannot be determined from single game (requires sequence across games)
    return false;
  }

  async checkHistorical(context, userId, username) {
    // This achievement needs to analyze game history directly
    // Get the game history service from the context if available
    if (!context.gameHistoryService) {
      return false;
    }

    try {
      // Get all user's games sorted by date (most recent first)
      const gameHistory = await context.gameHistoryService.getPagedHistoricalGames({
        playerName: username,
        limit: 100000
      });

      if (!gameHistory.games || gameHistory.games.length < 3) {
        return false; // Need at least 3 games
      }

      // Reverse to get chronological order (oldest first)
      const games = gameHistory.games.reverse();
      
      // Track consecutive penalties
      let consecutivePenalties = 0;
      let maxConsecutivePenalties = 0;

      for (const game of games) {
        const hadPenalty = this.checkGameForPenalty(game, username);
        
        if (hadPenalty) {
          consecutivePenalties++;
          maxConsecutivePenalties = Math.max(maxConsecutivePenalties, consecutivePenalties);
        } else {
          consecutivePenalties = 0; // Reset streak
        }

        // Early return if we've found the achievement
        if (maxConsecutivePenalties >= 3) {
          return true;
        }
      }

      return maxConsecutivePenalties >= 3;
    } catch (error) {
      console.error('[ThreePenaltiesRowAchievement] Error checking historical data:', error);
      return false;
    }
  }

  /**
   * Check if a specific game had a penalty for the user
   * @param {Object} game - Game object
   * @param {string} username - Username to check
   * @returns {boolean} True if user had any penalty in this game
   */
  checkGameForPenalty(game, username) {
    try {
      const gameData = game.gameData || game;
      const transactions = gameData.gameTransactions || [];

      // Filter to user's transactions
      const userTransactions = transactions.filter(tx => {
        const playerName = tx.player || tx.playerName;
        return playerName && playerName.toLowerCase() === username.toLowerCase();
      });

      // Check for any penalty (2x or 3x)
      return userTransactions.some(tx => {
        const txType = (tx.transactionType || '').toLowerCase();
        return txType === '2x' || txType === '3x' || txType.includes('penalty');
      });
    } catch (error) {
      return false;
    }
  }

}

module.exports = ThreePenaltiesRowAchievement;