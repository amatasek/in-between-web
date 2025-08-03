const BaseService = require('./BaseService');

/**
 * XPService - Handles experience point tracking and awarding
 */
class XPService extends BaseService {
  constructor() {
    super();
  }

  /**
   * Award XP to a user
   * @param {string} userId - User ID
   * @param {number} amount - Amount of XP to award
   */
  async awardXP(userId, amount) {
    try {
      const databaseService = this.getService('database');
      await databaseService.updateXPBulk([userId], amount);
      console.log(`[XP_SERVICE] Awarded ${amount} XP to ${userId}`);
    } catch (error) {
      console.error('[XP_SERVICE] Error awarding XP:', error);
    }
  }

  /**
   * Award XP to multiple users
   * @param {string[]} userIds - Array of user IDs
   * @param {number} amount - Amount of XP to award to each user
   */
  async awardXPBulk(userIds, amount) {
    try {
      const databaseService = this.getService('database');
      await databaseService.updateXPBulk(userIds, amount);
      console.log(`[XP_SERVICE] Awarded ${amount} XP to ${userIds.length} users:`, userIds);
    } catch (error) {
      console.error('[XP_SERVICE] Error awarding bulk XP:', error);
    }
  }

  /**
   * Calculate XP for existing players who have 0 XP
   */
  async calculateHistoricalXP() {
    try {
      const databaseService = this.getService('database');
      const gameHistoryService = this.getService('gameHistory');
      
      if (!gameHistoryService) {
        console.log('[XP_SERVICE] GameHistoryService not available, skipping historical XP calculation');
        return;
      }

      // Get all users with 0 XP (access userDb through the service)
      const userDb = databaseService.userDb;
      const usersResult = await userDb.allDocs({ include_docs: true });
      const usersToProcess = usersResult.rows
        .filter(row => row.doc && row.doc.type === 'user' && (row.doc.xp || 0) === 0)
        .map(row => row.doc);

      console.log(`[XP_SERVICE] Found ${usersToProcess.length} users with 0 XP to process`);

      for (const user of usersToProcess) {
        console.log(`[XP_SERVICE] Calculating historical XP for ${user.username}`);
        
        // Get all games this user played
        const gameHistory = await gameHistoryService.getPagedHistoricalGames({
          playerName: user.username,
          limit: 100000
        });

        let totalXP = 0;

        for (const game of gameHistory.games) {
          const gameData = game.gameData || game;
          const transactions = gameData.gameTransactions || [];
          
          // Filter to user's transactions
          const userTransactions = transactions.filter(tx => {
            const playerName = tx.player || tx.playerName;
            return playerName && playerName.toLowerCase() === user.username.toLowerCase();
          });

          // Award XP for each transaction
          for (const tx of userTransactions) {
            const amount = Math.abs(tx.amount || 0);
            const txType = (tx.transactionType || '').toLowerCase();
            
            if (txType.includes('ante')) {
              totalXP += 1; // 1 XP for playing a round
            } else if (txType.includes('bet')) {
              totalXP += amount; // Bet amount as XP
            } else if (amount > 0 && txType.includes('win')) {
              totalXP += amount; // Win amount as XP
            }
          }
        }

        if (totalXP > 0) {
          await databaseService.updateXPBulk([user._id], totalXP);
          console.log(`[XP_SERVICE] Awarded ${totalXP} historical XP to ${user.username}`);
        }
      }

      console.log('[XP_SERVICE] Historical XP calculation completed');
    } catch (error) {
      console.error('[XP_SERVICE] Error calculating historical XP:', error);
    }
  }
}

module.exports = new XPService();