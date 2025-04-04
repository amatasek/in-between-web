/**
 * PlayerService - Handles player-specific operations like auto-ante, balance updates, etc.
 */
const BaseService = require('./BaseService');
const { gameLog } = require('../utils/logger');

class PlayerService extends BaseService {
  constructor() {
    super();
  }
  
  /**
   * Mark player as ready and handle ante
   * @param {Object} game - The game object
   * @param {String} playerId - The player's ID
   * @returns {Object} The updated game object
   */
  async playerReady(game, playerId) {
    if (!game || !game.players[playerId]) return game;
    
    const player = game.players[playerId];
    if (player.isReady) return game; // Already ready
    
    const dbService = this.getService('database');
    
    // Deduct ante from player's balance
    try {
      await dbService.updateBalance(player.userId, -game.anteAmount);
      gameLog(game, `Player ${player.name} paid ante of ${game.anteAmount}`);
    } catch (error) {
      console.error(`[PLAYER_SERVICE] Error updating balance for player ${player.name}:`, error);
      throw new Error(`Failed to update balance: ${error.message}`);
    }
    
    // Mark player as ready
    player.isReady = true;
    
    return game;
  }
  
  /**
   * Mark player as unready and return their ante
   * @param {Object} game - The game object
   * @param {String} playerId - The player's ID
   * @returns {Object} The updated game object
   */
  async playerUnready(game, playerId) {
    if (!game || !game.players[playerId]) return game;
    
    const player = game.players[playerId];
    if (!player.isReady) return game; // Already unready
    
    const dbService = this.getService('database');
    
    // Return ante to player's balance
    try {
      await dbService.updateBalance(player.userId, game.anteAmount);
      gameLog(game, `Player ${player.name} withdrew ante of ${game.anteAmount}`);
    } catch (error) {
      console.error(`[PLAYER_SERVICE] Error updating balance for player ${player.name}:`, error);
      throw new Error(`Failed to update balance: ${error.message}`);
    }
    
    // Mark player as unready
    player.isReady = false;
    
    return game;
  }
  
  /**
   * Check and apply auto-ante for all players with the setting enabled
   * @param {Object} game - The game object
   * @returns {Promise<Object>} - The updated game object
   */
  async checkAndApplyAutoAnte(game) {
    if (!game || game.phase !== 'waiting') return game;
    
    const dbService = this.getService('database');
    const playerIds = Object.keys(game.players).filter(id => game.players[id].isConnected);
    
    if (playerIds.length === 0) return game;
    
    // Get all player user IDs
    const userIds = playerIds.map(id => game.players[id].userId).filter(Boolean);
    
    // Batch load preferences for all players
    const preferences = await dbService.getPreferencesForUsers(userIds);
    
    // Apply auto-ante for each player with the setting enabled
    for (const playerId of playerIds) {
      const player = game.players[playerId];
      
      // Skip players who are already ready
      if (player.isReady) continue;
      
      // Skip players without a userId (should not happen)
      if (!player.userId) continue;
      
      // Check if player has auto-ante enabled
      const playerPrefs = preferences[player.userId];
      if (playerPrefs && playerPrefs.autoAnte) {
        try {
          // Mark player as ready (this will handle the ante payment)
          game = await this.playerReady(game, playerId);
          gameLog(game, `Auto-ante applied for ${player.name}`);
        } catch (error) {
          console.error(`[PLAYER_SERVICE] Error applying auto-ante for ${player.name}:`, error);
          // Continue with other players even if one fails
        }
      }
    }
    
    return game;
  }
}

module.exports = new PlayerService();
