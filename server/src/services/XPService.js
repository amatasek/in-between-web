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

}

module.exports = new XPService();