const BaseService = require('./BaseService');

/**
 * Service for managing user balances and transactions
 */
class BalanceService extends BaseService {
  constructor() {
    super();
  }
  /**
   * Update a user's balance
   * @param {string} userId - The user's ID
   * @param {number} amount - Amount to change (positive for increase, negative for decrease)
   * @param {string} reason - Reason for the balance change
   * @returns {Promise<{balance: number, transaction: Object}>}
   */
  async updateBalance(userId, amount, reason) {
    try {
      const databaseService = this.getService('database');
      await databaseService.updateBalance(userId, amount, reason);
      const user = await databaseService.getUserById(userId);
      
      return {
        balance: user.balance,
        transaction: user.transactions[user.transactions.length - 1]
      };
    } catch (error) {
      console.error('[Balance] Error updating balance:', error);
      throw error;
    }
  }

  /**
   * Get a user's current balance
   * @param {string} userId - The user's ID
   * @returns {Promise<number>}
   */
  async getBalance(userId) {
    const databaseService = this.getService('database');
    const user = await databaseService.getUserById(userId);
    return user?.balance || 0;
  }

  /**
   * Process a game result and update balances
   * @param {string} userId - The user's ID
   * @param {number} amount - Amount won/lost
   * @param {string} gameId - The game ID
   * @param {string} result - The game result (win/loss/tie)
   * @returns {Promise<{balance: number, transaction: Object}>}
   */
  async processGameResult(userId, amount, gameId, result) {
    const reason = `Game ${gameId}: ${result}`;
    return this.updateBalance(userId, amount, reason);
  }
}

module.exports = new BalanceService();
