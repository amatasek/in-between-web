/**
 * SocketService - Manages all socket communication between server and clients
 */
const socketIo = require('socket.io');
const { gameLog } = require('../utils/logger');
const gameStateService = require('./GameStateService');
const playerManagementService = require('./PlayerManagementService');
const GameService = require('./GameService');
const CardService = require('./CardService');
const gameTimingService = require('./GameTimingService');
const { GamePhases } = require('../../../shared/constants/GamePhases');
const GAME_CONSTANTS = require('../../../shared/constants/GameConstants');
const jwt = require('jsonwebtoken');
const db = require('./db/DatabaseService');
const config = require('../config');

class SocketService {
  constructor() {
    this.io = null;
    this.connectedSockets = new Map(); // Maps socket.id to gameId
  }
  
  // ... other methods ...
  
  // Event: Leave game and return to lobby (without disconnecting)
  handleLeaveGameLobby(socket, data) {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(`[SOCKET_SERVICE] Player ${socket.id} leaving game lobby: ${data.gameId}`);
        
        // Check if the socket is associated with a game
        const currentGameId = this.connectedSockets.get(socket.id);
        
        // If there's a mismatch, use the game ID from the socket map
        const gameId = currentGameId || data.gameId;
        
        if (gameId && GameService.games && GameService.games[gameId]) {
          const game = GameService.games[gameId];
          
          // Safely remove player from game (will return ante if needed)
          await GameService.safeRemovePlayer(game, socket.id);
          
          // Check if game is now empty and should be cleaned up
          const wasGameRemoved = this.cleanupGameIfEmpty(game);
          
          if (!wasGameRemoved) {
            // Only broadcast game state if the game wasn't removed
            this.broadcastGameState(game);
          }
          
          // Leave the game room but keep the socket connected
          socket.leave(gameId);
          
          // Remove from connected sockets map
          this.connectedSockets.delete(socket.id);
          
          console.log(`[SOCKET_SERVICE] Player ${socket.id} successfully left game ${gameId}`);
          
          // Send confirmation to client
          socket.emit('leftGame', { success: true });
          
          // Send updated game list
          this.sendGameListToClient(socket);
          resolve();
        } else {
          console.log(`[SOCKET_SERVICE] No game found for player ${socket.id} to leave`);
          socket.emit('leftGame', { success: true });
          resolve();
        }
      } catch (error) {
        console.error(`[SOCKET_SERVICE] Error in leaveGameLobby:`, error);
        socket.emit('error', { message: 'Failed to leave game' });
        reject(error);
      }
    });
  }
}

module.exports = new SocketService();
