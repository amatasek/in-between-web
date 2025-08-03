/**
 * BaseAchievement - Abstract base class for all achievements
 * Each achievement extends this and implements its own detection logic
 */
class BaseAchievement {
  constructor(id, title, description) {
    this.id = id;
    this.title = title;
    this.description = description;
  }

  /**
   * Check if this achievement should be awarded based on a single game
   * @param {Object} game - Game data
   * @param {string} userId - User ID to check for
   * @param {string} username - Username to check for
   * @returns {boolean} True if achievement should be awarded
   */
  checkGame(game, userId, username) {
    throw new Error(`Achievement ${this.id} must implement checkGame()`);
  }

  /**
   * Check if this achievement should be awarded based on historical data
   * @param {Object} context - Historical context object
   * @param {string} userId - User ID to check for
   * @param {string} username - Username to check for
   * @returns {boolean} True if achievement should be awarded
   */
  checkHistorical(context, userId, username) {
    throw new Error(`Achievement ${this.id} must implement checkHistorical()`);
  }

  /**
   * Get achievement metadata
   * @returns {Object} Achievement info
   */
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description
    };
  }
}

module.exports = BaseAchievement;