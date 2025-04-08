/**
 * BroadcastService - Handles broadcasting game state and other updates to clients
 */
const BaseService = require('./BaseService');
const { gameLog } = require('../utils/logger');

class BroadcastService extends BaseService {
  constructor() {
    super();
  }
  
  /**
   * Broadcast game state to all players in a game
   * @param {Game} game - The game to broadcast
   */
  broadcastGameState(game) {
    if (!game) return;
    
    const connectionService = this.getService('connection');
    if (!connectionService || !connectionService.io) return;
    
    // Convert game to JSON for broadcasting
    const gameState = game.toJSON();
    
    // Include any dealer rotation notification if present
    if (game.dealerRotationNotification) {
      gameState.notification = game.dealerRotationNotification;
      // Clear notification after sending once
      game.dealerRotationNotification = null;
    }
    
    // Ensure waitingForAceDecision is explicitly included in the game state
    gameState.waitingForAceDecision = !!game.waitingForAceDecision;
    
    // Add waitingForSecondChance flag for the matching pair feature
    gameState.waitingForSecondChance = !!game.waitingForSecondChance;
    
    // Broadcast game state to all players in the game room
    connectionService.io.to(game.id).emit('gameState', gameState);
  }
  
  /**
   * Broadcast list of available games to all connected clients
   */
  broadcastGameList() {
    const connectionService = this.getService('connection');
    const gameService = this.getService('game');
    
    if (!connectionService || !connectionService.io) {
      console.error('[BROADCAST_SERVICE] Connection service or io not available');
      return;
    }
    if (!gameService) {
      console.error('[BROADCAST_SERVICE] Game service not available');
      return;
    }
    
    const gameList = gameService.getGameList();
    
    // Get count of connected clients
    let connectedClients = 0;
    try {
      connectedClients = connectionService.io.engine.clientsCount;
    } catch (err) {
      console.error('[BROADCAST_SERVICE] Error getting client count:', err);
    }
    
    // Send game list to all connected clients
    connectionService.io.emit('gameList', gameList);
    
    console.log(`[BROADCAST_SERVICE] Broadcasting list of ${gameList.length} available games to ${connectedClients} connected clients`);
    console.log(`[BROADCAST_SERVICE] Game list data:`, JSON.stringify(gameList.map(g => ({ id: g.id, players: Object.keys(g.players || {}).length }))));
  }
}

module.exports = new BroadcastService();
