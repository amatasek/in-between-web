/**
 * AchievementRegistry - Central registry for all achievements
 * Manages registration and discovery of achievement classes
 */

// Import all achievement classes
const FirstGameAchievement = require('./FirstGameAchievement');
const TenGamesAchievement = require('./TenGamesAchievement');
const HundredGamesAchievement = require('./HundredGamesAchievement');
const TripleAcePenaltyAchievement = require('./TripleAcePenaltyAchievement');
const ThreePenaltiesRowAchievement = require('./ThreePenaltiesRowAchievement');
const BetaTesterAchievement = require('./BetaTesterAchievement');
const BigWinnerAchievement = require('./BigWinnerAchievement');
const UhOhAchievement = require('./UhOhAchievement');
const HighRollerBetAchievement = require('./HighRollerBetAchievement');
const WhaleAchievement = require('./WhaleAchievement');
const MoneyBagsAchievement = require('./MoneyBagsAchievement');

class AchievementRegistry {
  constructor() {
    this.achievements = new Map();
    this.registerDefaultAchievements();
  }

  /**
   * Register all default achievements
   */
  registerDefaultAchievements() {
    this.register(new FirstGameAchievement());
    this.register(new TenGamesAchievement());
    this.register(new HundredGamesAchievement());
    this.register(new TripleAcePenaltyAchievement());
    this.register(new ThreePenaltiesRowAchievement());
    this.register(new BetaTesterAchievement());
    this.register(new BigWinnerAchievement());
    this.register(new UhOhAchievement());
    this.register(new HighRollerBetAchievement());
    this.register(new WhaleAchievement());
    this.register(new MoneyBagsAchievement());
  }

  /**
   * Register an achievement
   * @param {BaseAchievement} achievement - Achievement instance to register
   */
  register(achievement) {
    this.achievements.set(achievement.id, achievement);
  }

  /**
   * Get an achievement by ID
   * @param {string} id - Achievement ID
   * @returns {BaseAchievement|null} Achievement instance or null
   */
  get(id) {
    return this.achievements.get(id) || null;
  }

  /**
   * Get all registered achievements
   * @returns {BaseAchievement[]} Array of all achievements
   */
  getAll() {
    return Array.from(this.achievements.values());
  }


  /**
   * Get all achievement metadata
   * @returns {Object[]} Array of achievement info
   */
  getAllMetadata() {
    return this.getAll().map(achievement => achievement.toJSON());
  }
}

// Export singleton instance
module.exports = new AchievementRegistry();