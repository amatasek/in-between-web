const BaseService = require('./BaseService');
const { gameLog } = require('../utils/logger');

/**
 * Service for handling betting operations in the game
 */
class BettingService extends BaseService {
  constructor() {
    super();
  }
  /**
   * Place a bet for a player
   * @param {Object} game - The game object
   * @param {string} playerId - The player's ID
   * @param {number} amount - The bet amount (0 for pass)
   * @returns {Promise<Object>} The updated game object
   */
  async placeBet(game, playerId, amount) {
    if (!game || !game.isPlayersTurn(playerId)) {
      gameLog(game, `Invalid bet: Not ${game.players[playerId]?.name}'s turn`);
      return game;
    }
    
    const player = game.players[playerId];
    if (!player || !player.isConnected) return game;
    
    // Handle pass
    if (amount === 0) {
      gameLog(game, `${player.name} passes`);
      
      // Move to next player's turn
      const playerManagementService = this.getService('playerManagement');
      game = playerManagementService.moveToNextPlayer(game);
      
      return game;
    }
    
    // Validate bet amount
    if (amount <= 0 || amount > Math.min(game.pot, player.balance)) {
      gameLog(game, `Invalid bet amount: ${amount}`);
      return game;
    }
    
    try {
      // Place bet
      if (!player.placeBet(amount)) return game;
      
      // Process the bet transaction through the central transaction service
      const gameTransactionService = this.getService('gameTransaction');
      try {
        // Update player balance, record transaction, and update pot
        // The pot is automatically updated by the transaction service
        game = await gameTransactionService.processTransaction(
          game, 
          playerId, 
          -amount, 
          `Bet in round ${game.round}`
        );
        
        gameLog(game, `${player.name} bets ${amount} coins`);
        
        return game;
      } catch (error) {
        gameLog(game, `Failed to process bet for ${player.name}: ${error.message}`);
        player.resetBet();
        return game;
      }
    } catch (error) {
      gameLog(game, `Error processing bet: ${error.message}`);
      player.resetBet();
      return game;
    }
  }
  

}

module.exports = new BettingService();
