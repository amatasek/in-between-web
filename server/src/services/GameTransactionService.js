const BaseService = require('./BaseService');
const { gameLog } = require('../utils/logger');

/**
 * GameTransactionService - Central service for all monetary changes in the game
 * Handles both updating player balances and recording transactions
 */
class GameTransactionService extends BaseService {
  constructor() {
    super();
  }

  /**
   * Process a transaction for a player
   * This method centralizes all monetary changes in the game
   * All transactions are between a player and the pot
   * @param {Object} game - The game object
   * @param {String} playerId - The player's ID
   * @param {Number} amount - The amount of the transaction (positive for giving money to player, negative for taking)
   * @param {String} reason - The reason for the transaction
   * @returns {Object} The updated game object
   */
  async processTransaction(game, playerId, amount, reason) {
    if (!game || !playerId) return game;
    
    const player = game.players[playerId];
    const playerName = player?.name || 'Unknown Player';
    const userId = player?.userId;
    
    // Validate transaction
    if (!userId) {
      gameLog(game, `Cannot process transaction: Player ${playerName} has no user ID`);
      return game;
    }

    try {
      // Update player's balance in the database
      const balanceService = this.getService('balance');
      const dbResult = await balanceService.updateBalance(userId, amount, `Game ${game.id}: ${reason}`);
      
      // Always update player's balance in the game state
      if (player) {
        player.balance = dbResult.balance;
      }

      // Always update the pot (negative amount to player means positive to pot)
      // When player receives money (positive amount), it comes from the pot
      // When player pays money (negative amount), it goes to the pot
      game.pot -= amount;
      
      // Ensure pot never goes below zero
      if (game.pot < 0) {
        gameLog(game, `Warning: Pot went negative (${game.pot}), resetting to 0`);
        game.pot = 0;
      }

      // Record the transaction in the game
      this.recordTransactionInGame(game, playerId, amount, reason, playerName);

      return game;
    } catch (error) {
      gameLog(game, `Error processing transaction for ${playerName}: ${error.message}`);
      return game;
    }
  }

  /**
   * Record a transaction in the game without updating the player's balance
   * This is used internally by processTransaction and should not be called directly
   * @param {Object} game - The game object
   * @param {String} playerId - The player's ID
   * @param {Number} amount - The amount of the transaction
   * @param {String} reason - The reason for the transaction
   * @param {String} playerName - The player's name
   * @returns {Object} The updated game object
   */
  recordTransactionInGame(game, playerId, amount, reason, playerName) {
    if (!game || !playerId) return game;

    // Initialize player transactions if not exists
    if (!game.gameTransactions[playerId]) {
      game.gameTransactions[playerId] = [];
    }

    // Create the transaction record
    const transaction = {
      timestamp: new Date().toISOString(),
      playerId,
      playerName: playerName || game.players[playerId]?.name || 'Unknown Player',
      amount,
      reason,
      round: game.round
    };

    // Add to game transactions
    game.gameTransactions[playerId].push(transaction);
    
    return game;
  }

  /**
   * Get the running total for a player in the game
   * @param {Object} game - The game object
   * @param {String} playerId - The player's ID
   * @returns {Number} The player's running total
   */
  getPlayerTotal(game, playerId) {
    if (!game || !playerId || !game.gameTransactions[playerId]) return 0;
    
    return game.gameTransactions[playerId].reduce((total, transaction) => {
      return total + transaction.amount;
    }, 0);
  }

  /**
   * Get all player totals in the game
   * @param {Object} game - The game object
   * @returns {Object} Map of player IDs to their totals
   */
  getAllPlayerTotals(game) {
    if (!game) return {};
    
    const totals = {};
    
    // Include all players who have transactions
    Object.keys(game.gameTransactions).forEach(playerId => {
      totals[playerId] = this.getPlayerTotal(game, playerId);
    });
    
    // Also include current players who might not have transactions yet
    Object.keys(game.players).forEach(playerId => {
      if (!totals[playerId]) {
        totals[playerId] = 0;
      }
    });
    
    return totals;
  }


}

module.exports = new GameTransactionService();
