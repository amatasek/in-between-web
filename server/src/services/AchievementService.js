const BaseService = require('./BaseService');
const achievementRegistry = require('../achievements/AchievementRegistry');

/**
 * AchievementService - Handles all achievement operations
 * Uses the new achievement class system for self-contained detection logic
 */
class AchievementService extends BaseService {
  constructor() {
    super();
  }

  /**
   * Get all available achievements
   * @returns {Object[]} Array of achievement metadata
   */
  getAvailableAchievements() {
    return achievementRegistry.getAllMetadata();
  }

  /**
   * Get a specific achievement by ID
   * @param {string} achievementId - Achievement ID
   * @returns {Object|null} Achievement metadata or null
   */
  getAchievement(achievementId) {
    const achievement = achievementRegistry.get(achievementId);
    return achievement ? achievement.toJSON() : null;
  }

  /**
   * Get user's earned achievements
   * @param {string} userId - User ID
   * @returns {Object[]} Array of user achievements with details
   */
  async getUserAchievements(userId) {
    const databaseService = this.getService('database');
    if (!databaseService) return [];

    try {
      const userAchievements = await databaseService.getUserAchievements(userId);
      
      // Enrich with achievement details
      return userAchievements.map(userAchievement => {
        const achievementDef = achievementRegistry.get(userAchievement.achievementId);
        return {
          ...userAchievement,
          title: achievementDef?.title || 'Unknown Achievement',
          description: achievementDef?.description || 'No description available'
        };
      });
    } catch (error) {
      console.error('[ACHIEVEMENT_SERVICE] Error getting user achievements:', error);
      return [];
    }
  }

  /**
   * Award an achievement to a user
   * @param {string} userId - User ID
   * @param {string} achievementId - Achievement ID
   * @param {boolean} notify - Whether to send notification
   */
  async awardAchievement(userId, achievementId, notify = true) {
    const databaseService = this.getService('database');
    if (!databaseService) return;

    try {
      const achievement = achievementRegistry.get(achievementId);
      if (!achievement) {
        console.error(`[ACHIEVEMENT_SERVICE] Unknown achievement: ${achievementId}`);
        return;
      }

      // Check if user already has this achievement
      const existing = await databaseService.getUserAchievements(userId);
      const hasAchievement = existing.some(ua => ua.achievementId === achievementId);
      
      if (hasAchievement) {
        return; // Already has this achievement
      }

      // Award the achievement
      await databaseService.saveUserAchievement({
        userId,
        achievementId,
        earnedAt: new Date().toISOString()
      });

      console.log(`[ACHIEVEMENT_SERVICE] Awarded "${achievement.title}" to user ${userId}`);

      // Send notification if requested
      if (notify) {
        await this.sendAchievementNotification(userId, achievement);
      }
    } catch (error) {
      console.error('[ACHIEVEMENT_SERVICE] Error awarding achievement:', error);
    }
  }

  /**
   * Process historical achievements for a user (called on login)
   * @param {string} userId - User ID
   * @param {string} username - Username
   */
  async processHistoricalAchievements(userId, username) {
    try {
      const gameHistoryService = this.getService('gameHistory');
      if (!gameHistoryService) return [];

      // Get all user's games
      const gameHistory = await gameHistoryService.getPagedHistoricalGames({
        playerName: username,
        limit: 100000
      });

      // Create context with services for achievements that need them
      const context = {
        gameHistoryService,
        gamesPlayed: gameHistory.games.length
      };

      // Get existing achievements to avoid duplicates
      const existingAchievements = await this.getUserAchievements(userId);
      const existingIds = new Set(existingAchievements.map(a => a.achievementId));

      // Check all achievements for historical context
      const newAchievements = [];
      const allAchievements = achievementRegistry.getAll();

      for (const achievement of allAchievements) {
        try {
          const shouldAward = await achievement.checkHistorical(context, userId, username);
          if (!existingIds.has(achievement.id) && shouldAward) {
            newAchievements.push(achievement.id);
          }
        } catch (error) {
          console.error(`[ACHIEVEMENT_SERVICE] Error checking ${achievement.id}:`, error);
        }
      }

      // Award new achievements with notifications
      for (const achievementId of newAchievements) {
        await this.awardAchievement(userId, achievementId, true);
      }

      // Log if any achievements awarded
      if (newAchievements.length > 0) {
        console.log(`[ACHIEVEMENT_SERVICE] Awarded ${newAchievements.length} historical achievements to ${username}:`, newAchievements);
      }

      return newAchievements;
    } catch (error) {
      console.error('[ACHIEVEMENT_SERVICE] Error processing historical achievements:', error);
      return [];
    }
  }

  /**
   * Process achievements for a single game (real-time detection)
   * @param {Object} game - Game object
   * @param {string} userId - User ID
   * @param {string} username - Username
   */
  async processGameAchievements(game, userId, username) {
    try {
      // Get existing achievements to avoid duplicates
      const existingAchievements = await this.getUserAchievements(userId);
      const existingIds = new Set(existingAchievements.map(a => a.achievementId));

      // Check all achievements for game context
      const newAchievements = [];
      const allAchievements = achievementRegistry.getAll();

      for (const achievement of allAchievements) {
        if (!existingIds.has(achievement.id) && achievement.checkGame(game, userId, username)) {
          newAchievements.push(achievement.id);
        }
      }

      // Award new achievements with notifications
      for (const achievementId of newAchievements) {
        await this.awardAchievement(userId, achievementId, true);
      }

      return newAchievements;
    } catch (error) {
      console.error('[ACHIEVEMENT_SERVICE] Error processing game achievements:', error);
      return [];
    }
  }

  /**
   * Build historical context from games data
   * @param {Object[]} games - Array of game objects
   * @param {string} username - Username to analyze
   * @returns {Object} Historical context object
   */
  async buildHistoricalContext(games, username) {
    const context = {
      gamesPlayed: games.length,
      hasTripleAcePenalty: false,
      maxPenaltyStreak: 0
    };

    // Track penalty streaks across games
    let penaltyStreak = 0;

    for (const game of games) {
      const gameData = game.gameData || game;
      const transactions = gameData.gameTransactions || [];

      // Filter to user's transactions
      const userTransactions = transactions.filter(tx => {
        const playerName = tx.player || tx.playerName;
        return playerName && playerName.toLowerCase() === username.toLowerCase();
      });

      let hadPenalty = false;

      // Check for penalties
      for (const tx of userTransactions) {
        const txType = (tx.transactionType || '').toLowerCase();
        
        if (txType === '3x' || txType.includes('penalty')) {
          hadPenalty = true;
          
          // Check for triple ace specifically
          if (txType === '3x') {
            context.hasTripleAcePenalty = true;
          }
        }
      }

      // Track penalty streaks
      if (hadPenalty) {
        penaltyStreak++;
        context.maxPenaltyStreak = Math.max(context.maxPenaltyStreak, penaltyStreak);
      } else {
        penaltyStreak = 0;
      }
    }

    return context;
  }

  /**
   * Send achievement notification to user
   * @param {string} userId - User ID
   * @param {Object} achievement - Achievement object
   */
  async sendAchievementNotification(userId, achievement) {
    try {
      const notificationService = this.getService('notification');
      const connectionService = this.getService('connection');
      const databaseService = this.getService('database');
      
      if (!notificationService || !connectionService) return;

      // Get user's socket ID
      const socketId = connectionService.getUserSocketId(userId);
      if (!socketId) return; // User not connected

      // Get username for game broadcast
      const user = await databaseService.getUserById(userId);
      const username = user?.username || 'Player';

      // Check if user is in a game
      const gameId = connectionService.getGameIdForSocket(socketId);
      
      if (gameId) {
        // User is in a game - broadcast to entire game room
        notificationService.notifyRoom(
          gameId,
          `🏆 ${username} unlocked: ${achievement.title}`,
          achievement.description,
          '🏆',
          '#ffd700',
          5000
        );
      } else {
        // User is in lobby - send personal notification
        notificationService.notifyPlayer(
          userId,
          `🏆 Achievement Unlocked: ${achievement.title}`,
          achievement.description,
          '🏆',
          '#ffd700',
          5000
        );
      }
    } catch (error) {
      console.error('[ACHIEVEMENT_SERVICE] Error sending achievement notification:', error);
    }
  }

  /**
   * Legacy method for backward compatibility
   * @deprecated Use awardAchievement instead
   */
  async issueAchievement(userId, achievementId) {
    return this.awardAchievement(userId, achievementId, false);
  }
}

module.exports = new AchievementService();