const { GamePhases } = require('../../../shared/constants/GamePhases');
const { gameLog } = require('../utils/logger');
const playerManagementService = require('./PlayerManagementService');

class BettingService {
  async placeBet(game, playerId, amount) {
    if (!game || !game.isPlayersTurn(playerId)) {
      gameLog(game, `Invalid bet: Not ${game.players[playerId]?.name}'s turn`);
      return game;
    }
    
    const player = game.players[playerId];
    if (!player || !player.isConnected) return game;
    
    // Handle pass
    if (amount === 0) {
      gameLog(game, `Player ${player.name} passes`);
      
      // Move to next player's turn
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
      
      // Remove chips from player
      const success = await player.removeChips(betAmount, `Game ${game.id}: Bet`);
      if (!success) {
        gameLog(game, `Failed to remove bet from ${player.name}'s balance`);
        player.resetBet();
        return game;
      }
      
      // Add to pot
      game.pot += betAmount;
      gameLog(game, `${player.name} bet ${betAmount}. Pot: ${game.pot}`);
      
      return game;
    } catch (error) {
      gameLog(game, `Error processing bet: ${error.message}`);
      player.resetBet();
      return game;
    }
  }
}

module.exports = new BettingService();
