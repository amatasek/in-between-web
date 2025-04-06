const BaseService = require('./BaseService');
const { GamePhases } = require('../../../shared/constants/GamePhases');
const { gameLog } = require('../utils/logger');

class BettingService extends BaseService {
  constructor() {
    super();
  }
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
    
    // Calculate bet amount
    let betAmount = amount;
    
    if (betAmount <= 0 || betAmount > Math.min(game.pot, player.balance)) {
      gameLog(game, `Invalid bet amount: ${betAmount}`);
      return game;
    }
    
    try {
      // Place bet
      if (!player.placeBet(betAmount)) return game;
      
      // Process the bet transaction through the central transaction service
      const gameTransactionService = this.getService('gameTransaction');
      try {
        // Update player balance, record transaction, and update pot
        // The pot is automatically updated by the transaction service
        game = await gameTransactionService.processTransaction(
          game, 
          playerId, 
          -betAmount, 
          `Bet in round ${game.round}`
        );
        
        gameLog(game, `${player.name} bets ${betAmount} coins`);
        
        return game;
      } catch (error) {
        gameLog(game, `Failed to process bet for ${player.name}: ${error.message}`);
        player.resetBet();
        return game;
      }
      
      // Return the game (pot already updated in the try block)
      return game;
    } catch (error) {
      gameLog(game, `Error processing bet: ${error.message}`);
      player.resetBet();
      return game;
    }
  }
  

}

module.exports = new BettingService();
