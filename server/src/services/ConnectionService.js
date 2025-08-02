/**
 * ConnectionService - Manages socket connections, authentication, and connection tracking
 */
const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');
const config = require('../config');
const BaseService = require('./BaseService');
const { RECONNECTION_TIMEOUT } = require('../../../shared/constants/GameConstants');

class ConnectionService extends BaseService {
  constructor() {
    super();
    this.io = null;
    this.connectedSockets = new Map(); // Maps socket.id to gameId
    this.disconnectedPlayers = new Map(); // Maps userId to {gameId, timestamp, playerId}
    this.disconnectionTimeouts = new Map(); // Maps userId to timeout ID for cleanup
    this.reconnectionTimeout = RECONNECTION_TIMEOUT; // Use shared constant
  }
  
  /**
   * Verify JWT token
   * @param {string} token - JWT token to verify
   * @returns {Object} Decoded token data
   */
  verifyToken(token) {
    try {
      return jwt.verify(token, config.jwtSecret);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  /**
   * Set an existing Socket.IO instance instead of creating a new one
   * @param {Object} io - Existing Socket.IO instance
   */
  setSocketIO(io) {
    this.io = io;
    this.setupAuthMiddleware();
    this.setupConnectionHandlers();
    console.log('[CONNECTION_SERVICE] Using existing Socket.IO instance');
    return this.io;
  }

  /**
   * Initialize the Socket.IO server with authentication middleware
   * @param {Object} server - HTTP server instance
   * @returns {Object} Socket.IO instance
   */
  initialize(server) {
    console.log('[CONNECTION_SERVICE] Initializing Socket.IO with ConnectionService ONLY');
    
    this.io = socketIo(server, {
      cors: {
        origin: true, // Allow all origins
        methods: ['GET', 'POST', 'OPTIONS'],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization']
      }
    });

    this.setupAuthMiddleware();
    this.setupConnectionHandlers();
    console.log('[CONNECTION_SERVICE] Socket.IO initialized');
    
    return this.io;
  }
  
  /**
   * Set up authentication middleware for Socket.IO
   */
  setupAuthMiddleware() {
    if (!this.io) {
      console.error('[CONNECTION_SERVICE] Cannot set up auth middleware: Socket.IO not initialized');
      return;
    }
    
    // Add middleware to verify auth token
    this.io.use(async (socket, next) => {
      try {
        const token = socket.handshake.auth.token;
        if (!token) {
          console.error('[CONNECTION_SERVICE] No auth token for socket:', socket.id);
          next(new Error('Authentication token required'));
          return;
        }
        
        // Verify token and get user from DB
        const tokenData = this.verifyToken(token);
        const dbService = this.getService('database');
        const user = await dbService.getUserById(tokenData.userId);
        if (!user) {
          console.error('[CONNECTION_SERVICE] User not found:', tokenData.userId);
          next(new Error('User not found'));
          return;
        }
        
        // Attach user info to socket
        socket.user = {
          userId: user._id,
          username: user.username
        };
        
        console.log('[CONNECTION_SERVICE] Authenticated socket connection:', {
          socketId: socket.id,
          username: user.username,
          userId: user._id
        });
        
        // Store authentication info for later use
        socket.authInfo = {
          authenticated: true,
          username: user.username,
          userId: user._id
        };
        
        next();
      } catch (error) {
        console.error('[CONNECTION_SERVICE] Auth error:', error.message);
        next(new Error(error.message));
      }
    });
  }

  /**
   * Set up connection and disconnection handlers
   */
  setupConnectionHandlers() {
    if (!this.io) return;
    
    console.log('[CONNECTION_SERVICE] Setting up connection handlers (NEW SERVICE ARCHITECTURE ONLY)');
    
    this.io.on('connection', (socket) => {
      console.log(`[CONNECTION_SERVICE] New connection: ${socket.id}`);
      
      // If the socket was authenticated in middleware, emit the authenticated event with user data
      if (socket.authInfo && socket.authInfo.authenticated) {
        console.log(`[CONNECTION_SERVICE] Emitting authenticated event to socket: ${socket.id}`);
        socket.emit('authenticated', {
          userId: socket.authInfo.userId,
          username: socket.authInfo.username
        });
      }
      
      // Register event handlers from other services
      this.registerServiceEventHandlers(socket);

      // Check if this is a reconnection for a player who was in a game
      socket.on('authenticated', () => {
        this.handlePotentialReconnection(socket);
      });
      
      // Handle disconnection
      socket.on('disconnect', () => {
        this.handleDisconnect(socket);
      });
    });
  }
  
  /**
   * Register event handlers from other services
   * @param {Object} socket - The socket to register handlers for
   */
  registerServiceEventHandlers(socket) {
    try {
      console.log(`[CONNECTION_SERVICE] Registering service event handlers for socket: ${socket.id}`);
      
      // Let each service register its event handlers
      const gameService = this.getService('game');
      const gameEventService = this.getService('gameEvent');
      const gameStateService = this.getService('gameState');
      
      gameService.registerSocketEvents(socket);
      gameEventService.registerSocketEvents(socket);
      gameStateService.registerSocketEvents(socket);
      
      // --- ONLINE PLAYER COUNT FEATURE ---
      socket.on('getOnlinePlayerCount', (cb) => {
        if (typeof cb === 'function' && this.io && this.io.engine) {
          const realPlayerCount = this.io.engine.clientsCount;
          const botService = this.getService('bot');
          const botCount = botService ? (botService.activeBots.size + botService.readyBots.length) : 0;
          const totalCount = realPlayerCount + botCount;
          
          cb(totalCount);
          this.io.emit('onlinePlayerCountUpdate', totalCount);
        }
      });
    } catch (error) {
      console.error('[CONNECTION_SERVICE] Error registering event handlers:', error);
    }
  }

  /**
   * Handle socket disconnection
   * @param {Object} socket - The disconnected socket
   */
  handleDisconnect(socket) {
    try {
      console.log(`[CONNECTION_SERVICE] Disconnection: ${socket.id}`);
      
      const gameId = this.connectedSockets.get(socket.id);
      if (gameId && socket.user) {
        const gameStateService = this.getService('gameState');
        if (gameStateService && gameStateService.games && gameStateService.games[gameId]) {
          const game = gameStateService.games[gameId];
          
          // Find the player in the game - players is an object, not an array
          const playerIds = Object.keys(game.players);
          
          // Get the userId from the socket
          const userId = socket.user.userId;
          
          // Find the player with matching userId
          const playerId = playerIds.find(id => game.players[id].userId === userId);
          
          if (playerId) {
            const player = game.players[playerId];
            const userId = socket.user.userId; // Use userId, not id
            
            // Make sure the player has a userId (critical for reconnection)
            if (!player.userId && userId) {
              player.userId = userId;
              console.log(`[CONNECTION_SERVICE] Added missing userId ${userId} to player ${player.name}`);
            }
            
            // Find the player's index in the seats array
            const playerIndex = game.seats.findIndex(seatId => seatId === playerId);
            
            // Store the disconnected player info for potential reconnection
            this.disconnectedPlayers.set(userId, {
              gameId,
              timestamp: Date.now(),
              playerId: playerId, // Store the player's ID for reconnection
              playerIndex,
              userId: userId // Store the userId explicitly
            });
            
            console.log(`[CONNECTION_SERVICE] Player ${player.name} (${userId}) disconnected from game ${gameId}. Reconnection window: ${this.reconnectionTimeout / 1000} seconds`);
            
            // Don't log disconnections to prevent noise in the game log
            // const { gameLog } = require('../utils/logger');
            // gameLog(game, `${player.name} disconnected.`);
            
            // Mark player as disconnected but don't remove them yet
            player.disconnected = true;
            player.disconnectedAt = Date.now();
            player.isConnected = false;
            
            // Log the reconnection for debugging
            console.log(`[CONNECTION_SERVICE] Player ${player.name} (${player.userId}) is now marked as disconnected (disconnected=${player.disconnected}, isConnected=${player.isConnected})`);
            
            // Broadcast the updated game state immediately
            const broadcastService = this.getService('broadcast');
            // Broadcast the 'game' object which has the modified player state
            broadcastService.broadcastGameState(game);
            
            // Schedule cleanup after timeout
            const timeoutId = setTimeout(() => {
              this.cleanupDisconnectedPlayer(userId, gameId);
            }, this.reconnectionTimeout);
            this.disconnectionTimeouts.set(userId, timeoutId);
            console.log(`[CONNECTION_SERVICE] Scheduled cleanup for ${player.name} (${userId}) in ${this.reconnectionTimeout / 1000}s. Timeout ID: ${timeoutId}`);
            
            // Remove from connected sockets map
            this.connectedSockets.delete(socket.id);
          } else {
            console.log(`[CONNECTION_SERVICE] Could not find player with ID ${playerId} in game ${gameId} for disconnection.`);
          }
        } else {
          console.log(`[CONNECTION_SERVICE] Game state service or game ${gameId} not found during disconnect.`);
        }
      } else {
        console.log(`[CONNECTION_SERVICE] Disconnecting socket ${socket.id} was not associated with a game or user.`);
      }
      // Make sure to remove the socket if it wasn't handled above
      this.connectedSockets.delete(socket.id);
    } catch (error) {
      console.error(`[CONNECTION_SERVICE] Error in disconnect:`, error);
    }
  }

  /**
   * Handle potential reconnection of a player who was in a game
   * @param {Object} socket - The socket that might be reconnecting
   */
  handlePotentialReconnection(socket) {
    try {
      if (!socket.user || !socket.user.userId) {
        console.log(`[CONNECTION_SERVICE] Reconnection failed: No authenticated user`);
        return; // No authenticated user
      }
      
      const userId = socket.user.userId;
      const username = socket.user.username || 'Unknown';
      console.log(`[CONNECTION_SERVICE] Processing reconnection for user ${username} (${userId})`);
      
      const disconnectedInfo = this.disconnectedPlayers.get(userId);
      
      // Even if there's no disconnected info, check if the player is in any active games
      // This handles the case where a player refreshes but wasn't properly marked as disconnected
      const gameStateService = this.getService('gameState');
      if (!gameStateService || !gameStateService.games) {
        console.log(`[CONNECTION_SERVICE] Reconnection failed: Game state service not available`);
        if (disconnectedInfo) {
          this.disconnectedPlayers.delete(userId);
        }
        return;
      }
      
      // If we have disconnected info, try to reconnect to that specific game
      let gameId = disconnectedInfo ? disconnectedInfo.gameId : null;
      let oldSocketId = disconnectedInfo ? disconnectedInfo.playerId : null;
      
      console.log(`[CONNECTION_SERVICE] Reconnection info - Game ID: ${gameId || 'None'}, Old Socket ID: ${oldSocketId || 'None'}`);
      
      // If we don't have disconnected info, check all games for this user
      if (!gameId) {
        console.log(`[CONNECTION_SERVICE] No disconnection record found, searching all games for user ${userId}`);
        const allGames = Object.values(gameStateService.games);
        for (const game of allGames) {
          const playerIds = Object.keys(game.players || {});
          
          // Find player by userId
          for (const id of playerIds) {
            const player = game.players[id];
            if (player && player.userId === userId) {
              gameId = game.id;
              oldSocketId = id;
              console.log(`[CONNECTION_SERVICE] Found player ${username} (${userId}) in game ${gameId} with socket ID ${oldSocketId}`);
              break;
            }
          }
          
          if (gameId) break; // Stop searching if we found a game
        }
      }
      
      // If we still don't have a game ID, the player isn't in any games
      if (!gameId) {
        console.log(`[CONNECTION_SERVICE] User ${username} (${userId}) not found in any games`);
        if (disconnectedInfo) {
          this.disconnectedPlayers.delete(userId);
        }
        return;
      }
      
      // Get the game
      const game = gameStateService.games[gameId];
      if (!game) {
        // Game no longer exists
        console.log(`[CONNECTION_SERVICE] Game ${gameId} no longer exists`);
        if (disconnectedInfo) {
          this.disconnectedPlayers.delete(userId);
        }
        return;
      }
      
      console.log(`[CONNECTION_SERVICE] Reconnecting user ${username} (${userId}) to game ${gameId}`);
      
      // Find the player in the game by userId
      let existingPlayer = null;
      const playerIds = Object.keys(game.players || {});
      
      for (const id of playerIds) {
        const player = game.players[id];
        if (player && player.userId === userId) {
          existingPlayer = id;
          break;
        }
      }
      
      if (!existingPlayer && oldSocketId && game.players[oldSocketId]) {
        existingPlayer = oldSocketId;
      }
      
      if (existingPlayer) {
        // Get the player object
        const player = game.players[existingPlayer];
        
        console.log(`[CONNECTION_SERVICE] Updating player ${player.name} socket from ${existingPlayer} to ${socket.id}`);
        
        // Update the player's socket ID and connection status
        const oldSocketId = player.socketId;
        player.socketId = socket.id;
        
        // Update the socket-to-userId mapping
        if (oldSocketId !== socket.id) {
          // Update the socket mapping in the game
          game.mapSocketToUser(socket.id, player.userId);
          
          // If there was an old mapping, remove it
          if (game.socketIdToUserId[oldSocketId]) {
            delete game.socketIdToUserId[oldSocketId];
          }
        }
        
        // No need to update seat reference as seats now use userId instead of socketId
        // The seat reference should already be using player.userId which doesn't change
        
        // Find the player's seat index
        const seatIndex = game.seats.findIndex(id => id === existingPlayer);
        
        // Update seat info if needed
        if (seatIndex !== -1 && game.seatInfo && game.seatInfo[seatIndex]) {
          // We don't need to update the playerId in seatInfo since we use userId now
          console.log(`[CONNECTION_SERVICE] Player ${player.name} is in seat ${seatIndex}`);
        }
        
        // Mark player as connected
        player.disconnected = false;
        player.disconnectedAt = null;
        player.isConnected = true;
        
        // Log the reconnection for debugging
        console.log(`[CONNECTION_SERVICE] Player ${player.name} (${player.userId}) is now marked as connected (disconnected=${player.disconnected}, isConnected=${player.isConnected})`);
        
        // Associate socket with game
        this.associateSocketWithGame(socket.id, gameId);
        
        // Remove from disconnected players map
        if (this.disconnectedPlayers.has(userId)) {
          this.disconnectedPlayers.delete(userId);
          console.log(`[CONNECTION_SERVICE] Removed ${userId} from disconnected players map`);
        }
        
        // Clear any pending disconnection timeout
        if (this.disconnectionTimeouts.has(userId)) {
          clearTimeout(this.disconnectionTimeouts.get(userId));
          this.disconnectionTimeouts.delete(userId);
          console.log(`[CONNECTION_SERVICE] Cleared disconnection timeout for player ${userId}`);
        }
        
        // Try to reconnect the player to their game
        const gameService = this.getService('game');
        if (gameService) {
          console.log(`[CONNECTION_SERVICE] Reconnecting player to game ${gameId}`);
          gameService.handleJoinGame(socket, { gameId, isReconnection: true });
        } else {
          console.log(`[CONNECTION_SERVICE] Warning: Game service not available for reconnection`);
          
          // If game service isn't available, at least broadcast the game state
          const broadcastService = this.getService('broadcast');
          if (broadcastService) {
            broadcastService.broadcastGameState(game);
          }
        }
        
        console.log(`[CONNECTION_SERVICE] Player ${player.name} (${userId}) successfully reconnected to game ${gameId}`);
      } else {
        console.log(`[CONNECTION_SERVICE] Failed to find player with userId ${userId} in game ${gameId}`);
      }
    } catch (error) {
      console.error(`[CONNECTION_SERVICE] Error in handlePotentialReconnection:`, error);
    }
  }
  
  /**
   * Clean up a disconnected player if they haven't reconnected within the timeout
   * @param {string} userId - The user ID
   * @param {string} gameId - The game ID
   */
  async cleanupDisconnectedPlayer(userId, gameId) {
    try {
      // Make sure userId is valid
      if (!userId) {
        // Don't log this as an error - it's a normal case when anonymous users disconnect
        // Just clean up any null entries and return
        this.disconnectedPlayers.delete(null);
        this.disconnectedPlayers.delete(undefined);
        return;
      }
      
      // Check if the player is still in the disconnected players map
      const disconnectedInfo = this.disconnectedPlayers.get(userId);
      if (!disconnectedInfo || disconnectedInfo.gameId !== gameId) {
        // Player has already reconnected or was removed
        return;
      }
      
      console.log(`[CONNECTION_SERVICE] Reconnection timeout for player ${userId} in game ${gameId}`);
      
      // Get the game
      const gameStateService = this.getService('gameState');
      const gameService = this.getService('game');
      const broadcastService = this.getService('broadcast');
      let game = await gameStateService.getGame(gameId); // Get fresh game state from database
      
      // Check if player was part of the current round (had anted)
      const wasPartOfCurrentRound = game && game.antedPlayersForRound && 
        game.antedPlayersForRound.some(p => p.userId === userId);
      
      if (wasPartOfCurrentRound) {
        console.log(`[CONNECTION_SERVICE] Player ${userId} anted for current round - keeping in game until round ends`);
        // Don't remove the player, just keep them marked as disconnected
        // They'll be cleaned up at round end
        return;
      }
      
      // If game service exists, call leaveGame (which handles broadcasts)
      if (gameService) {
        await gameService.leaveGame(userId, gameId);
      } else {
        console.error(`[CONNECTION_SERVICE] Game service not found for player ${userId} cleanup in game ${gameId}`);
        
        // Fallback: if no gameService, try broadcasting directly if possible
        // Use the 'game' variable declared earlier
        if (broadcastService && game) {
          broadcastService.broadcastGameState(game);
        }
      }
      
      // Check if the game is now empty and should be removed
      // Refresh the game state in case leaveGame modified it significantly
      game = gameStateService.getGame(gameId); 
      if (gameService && game && game.players && Object.keys(game.players).length === 0) {
        gameService.cleanupGameIfEmpty(gameId);
      }
      
      // Remove from disconnected players map
      this.disconnectedPlayers.delete(userId);
    } catch (error) {
      console.error(`[CONNECTION_SERVICE] Error in cleanupDisconnectedPlayer:`, error);
    }
  }
  
  /**
   * Associate a socket with a game and clear any pending disconnection timeout
   * @param {string} socketId - The socket ID
   * @param {string} gameId - The game ID
   */
  associateSocketWithGame(socketId, gameId) {
    this.connectedSockets.set(socketId, gameId);
    
    // Get the socket instance
    const socket = this.io.sockets.sockets.get(socketId);
    if (socket) {
      // Join the socket to the game room
      socket.join(gameId);
      console.log(`[CONNECTION_SERVICE] Socket ${socketId} joined room ${gameId}`);
      
      if (socket.user && socket.user.userId) {
        const userId = socket.user.userId;
        
        // Clear any pending disconnection timeout for this user
        if (this.disconnectionTimeouts.has(userId)) {
          clearTimeout(this.disconnectionTimeouts.get(userId));
          this.disconnectionTimeouts.delete(userId);
          console.log(`[CONNECTION_SERVICE] Cleared disconnection timeout for player ${userId} when associating with game ${gameId}`);
        }
        
        // Also remove from disconnected players map if present
        if (this.disconnectedPlayers.has(userId)) {
          this.disconnectedPlayers.delete(userId);
          console.log(`[CONNECTION_SERVICE] Removed ${userId} from disconnected players map when associating with game ${gameId}`);
        }
      }
    } else {
      console.error(`[CONNECTION_SERVICE] Socket ${socketId} not found when trying to associate with game ${gameId}`);
    }
  }

  /**
   * Disassociate a socket from a game
   * @param {string} socketId - The socket ID
   */
  disassociateSocketFromGame(socketId) {
    const gameId = this.connectedSockets.get(socketId);
    if (gameId) {
      // Get the socket instance
      const socket = this.io.sockets.sockets.get(socketId);
      if (socket) {
        // Leave the game room
        socket.leave(gameId);
      }
      
      // Remove from the map
      this.connectedSockets.delete(socketId);
    }
  }

  /**
   * Get the game ID associated with a socket
   * @param {string} socketId - The socket ID
   * @returns {string|null} The associated game ID or null
   */
  getGameIdForSocket(socketId) {
    return this.connectedSockets.get(socketId) || null;
  }

  /**
   * Get all socket IDs associated with a game
   * @param {string} gameId - The game ID
   * @returns {Array} Array of socket IDs
   */
  getSocketsForGame(gameId) {
    const sockets = [];
    for (const [socketId, associatedGameId] of this.connectedSockets.entries()) {
      if (associatedGameId === gameId) {
        sockets.push(socketId);
      }
    }
    return sockets;
  }

  /**
   * Get the socket ID for a user
   * @param {string} userId - The user ID
   * @returns {string|null} The socket ID or null if not found
   */
  getUserSocketId(userId) {
    // Search through all connected sockets to find the one for this user
    for (const [socketId, socket] of this.io.sockets.sockets) {
      if (socket.user && socket.user.userId === userId) {
        return socketId;
      }
    }
    return null;
  }

  /**
   * Send an error message to a specific player
   * @param {string} socketId - Socket ID of the player
   * @param {string} message - Error message
   */
  sendError(socketId, message) {
    const socket = this.io.sockets.sockets.get(socketId);
    if (socket) {
      socket.emit('error', { message });
    }
  }
}

module.exports = new ConnectionService();
