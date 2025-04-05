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
      
      // Remove coins from player
      const balanceService = this.getService('balance');
      try {
        const result = await balanceService.updateBalance(player.userId, -betAmount, `Game ${game.id}: Bet`);
        player.balance = result.balance;
        
        // Add to pot
        game.pot += betAmount;
        gameLog(game, `${player.name} bets ${betAmount} coins`);
        
        return game;
      } catch (error) {
        gameLog(game, `Failed to remove bet from ${player.name}'s balance: ${error.message}`);
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
