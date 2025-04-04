/**
 * ConnectionService - Manages socket connections, authentication, and connection tracking
 */
const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');
const config = require('../config');
const BaseService = require('./BaseService');
const { gameLog } = require('../utils/logger');

class ConnectionService extends BaseService {
  constructor() {
    super();
    this.io = null;
    this.connectedSockets = new Map(); // Maps socket.id to gameId
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
      
      // If the socket was authenticated in middleware, emit the authenticated event
      if (socket.authInfo && socket.authInfo.authenticated) {
        console.log(`[CONNECTION_SERVICE] Emitting authenticated event to socket: ${socket.id}`);
        socket.emit('authenticated');
      }
      
      // Register event handlers from other services
      this.registerServiceEventHandlers(socket);
      
      // Log all event listeners for debugging
      console.log(`[CONNECTION_SERVICE] Event handlers registered for socket: ${socket.id}`);
      
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
      const lobbyService = this.getService('lobby');
      const gameEventService = this.getService('gameEvent');
      const playerService = this.getService('player');
      
      if (lobbyService && typeof lobbyService.registerSocketEvents === 'function') {
        console.log(`[CONNECTION_SERVICE] Registering LobbyService events for socket: ${socket.id}`);
        lobbyService.registerSocketEvents(socket);
      } else {
        console.warn(`[CONNECTION_SERVICE] LobbyService not available or missing registerSocketEvents method`);
      }
      
      if (gameEventService && typeof gameEventService.registerSocketEvents === 'function') {
        console.log(`[CONNECTION_SERVICE] Registering GameEventService events for socket: ${socket.id}`);
        gameEventService.registerSocketEvents(socket);
      } else {
        console.warn(`[CONNECTION_SERVICE] GameEventService not available or missing registerSocketEvents method`);
      }
      
      if (playerService && typeof playerService.registerSocketEvents === 'function') {
        console.log(`[CONNECTION_SERVICE] Registering PlayerService events for socket: ${socket.id}`);
        playerService.registerSocketEvents(socket);
      } else {
        console.warn(`[CONNECTION_SERVICE] PlayerService not available or missing registerSocketEvents method`);
      }
      
      console.log(`[CONNECTION_SERVICE] All service event handlers registered for socket: ${socket.id}`);
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
      if (gameId) {
        const gameStateService = this.getService('gameState');
        if (gameStateService && gameStateService.games && gameStateService.games[gameId]) {
          const game = gameStateService.games[gameId];
          
          // Remove player from game
          const playerManagementService = this.getService('playerManagement');
          playerManagementService.removePlayer(game, socket.id);
          
          // Check if game is now empty and should be cleaned up
          const lobbyService = this.getService('lobby');
          if (lobbyService) {
            const wasGameRemoved = lobbyService.cleanupGameIfEmpty(game);
            
            if (!wasGameRemoved) {
              // Only broadcast game state if the game wasn't removed
              const broadcastService = this.getService('broadcast');
              if (broadcastService) {
                broadcastService.broadcastGameState(game);
              }
            }
          }
        }
        
        // Remove from connected sockets map
        this.connectedSockets.delete(socket.id);
      }
    } catch (error) {
      console.error(`[CONNECTION_SERVICE] Error in disconnect:`, error);
    }
  }

  /**
   * Associate a socket with a game
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
