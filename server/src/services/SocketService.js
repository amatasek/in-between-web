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
  
  verifyToken(token) {
    try {
      return jwt.verify(token, config.jwtSecret);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  /**
   * Initialize the Socket.IO server
   * @param {Object} server - HTTP server instance
   */
  initialize(server) {
    this.io = socketIo(server, {
      cors: {
        origin: true, // Allow all origins
        methods: ['GET', 'POST', 'OPTIONS'],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization']
      }
    });

    // Add middleware to verify auth token
    this.io.use(async (socket, next) => {
      try {
        const token = socket.handshake.auth.token;
        if (!token) {
          console.error('[SOCKET_SERVICE] No auth token for socket:', socket.id);
          next(new Error('Authentication token required'));
          return;
        }
        
        // Verify token and get user from DB
        const tokenData = this.verifyToken(token);
        const user = await db.getUserById(tokenData.userId);
        if (!user) {
          console.error('[SOCKET_SERVICE] User not found:', tokenData.userId);
          next(new Error('User not found'));
          return;
        }
        
        // Attach user info to socket
        socket.user = {
          userId: user._id,
          username: user.username
        };
        
        console.log('[SOCKET_SERVICE] Authenticated socket connection:', {
          socketId: socket.id,
          username: user.username,
          userId: user._id
        });
        
        // Store authentication info for later use when the socket is fully connected
        socket.authInfo = {
          authenticated: true,
          username: user.username,
          userId: user._id
        };
        
        next();
      } catch (error) {
        console.error('[SOCKET_SERVICE] Auth error:', error.message);
        next(new Error(error.message));
      }
    });

    this.setupEventHandlers();
    console.log('[SOCKET_SERVICE] Socket.IO initialized');
    
    return this.io;
  }

  /**
   * Set up socket event handlers
   */
  setupEventHandlers() {
    if (!this.io) return;
    


    this.io.on('connection', (socket) => {
      console.log(`[SOCKET_SERVICE] New connection: ${socket.id}`);
      
      // If the socket was authenticated in middleware, emit the authenticated event
      if (socket.authInfo && socket.authInfo.authenticated) {
        console.log(`[SOCKET_SERVICE] Emitting authenticated event to socket: ${socket.id}`);
        socket.emit('authenticated');
      }
      
      // Send the current list of games to the newly connected client
      this.sendGameListToClient(socket);

      // Event: Create a new game
      socket.on('createGame', async () => {
        console.log('[SOCKET_SERVICE] Received createGame event from socket:', socket.id);
        try {
          // Get user from socket (attached by auth middleware)
          const user = socket.user;
          if (!user) {
            console.error('[SOCKET_SERVICE] No user attached to socket');
            socket.emit('error', { message: 'Authentication required' });
            return;
          }
          
          console.log('[SOCKET_SERVICE] Creating game for user:', user);
          
          // Generate a random game ID
          const gameId = Math.random().toString(36).substring(2, 8).toUpperCase();

          // Create game using GameStateService
          const game = GameService.createGame(gameId, socket.id);
          
          // Add player using PlayerManagementService
          await GameService.addPlayer(game, socket.id, user.username || `Player ${socket.id.slice(0,4)}`, user.userId);
          
          // Join socket to game room
          socket.join(gameId);
          this.connectedSockets.set(socket.id, gameId);
          
          // Send game state to player
          socket.emit('gameJoined', { 
            game: game.toJSON(),
            playerId: socket.id
          });
          
          // Broadcast updated game list to all clients in the lobby
          this.broadcastGameList();
          
          gameLog(game, `Game created by ${user.username} (${socket.id})`);
        } catch (error) {
          console.error(`[SOCKET_SERVICE] Error creating game:`, error);
          socket.emit('error', { message: error.message || 'Failed to create game' });
        }
      });

      // Event: Join an existing game
      socket.on('joinGame', async (data) => {
        let currentGame;
        try {
          const { gameId } = data;
          const user = socket.user;
          
          if (!user) {
            console.error('[SOCKET_SERVICE] No user attached to socket');
            socket.emit('error', { message: 'Authentication required' });
            return;
          }
          
          if (!gameId) {
            socket.emit('error', { message: 'Game ID is required' });
            return;
          }

          currentGame = gameStateService.getGame(gameId);
          if (!currentGame) {
            socket.emit('error', { message: 'Game not found' });
            return;
          }

          // Check if game is full
          const connectedPlayers = Object.values(currentGame.players).filter(p => p.isConnected);
          if (connectedPlayers.length >= 6) {
            socket.emit('error', { message: 'Game is full' });
            return;
          }

          // Add player to game
          await GameService.addPlayer(currentGame, socket.id, user.username || `Player ${socket.id.slice(0,4)}`, user.userId);
          
          // Join socket to game room
          socket.join(gameId);
          this.connectedSockets.set(socket.id, gameId);
          
          // Make sure the game has a valid phase before sending
          const gameState = currentGame.toJSON();
          
          // Log the game state before sending
          console.log(`[SOCKET_SERVICE] Player joined game ${gameId}, phase: ${gameState.phase}`);
          
          // Send game state to player with proper phase
          socket.emit('gameJoined', { 
            game: gameState,
            playerId: socket.id
          });
          
          // Broadcast updated game state to all players
          this.broadcastGameState(currentGame);
          
          // Update the game list for all clients in the lobby
          this.broadcastGameList();
          
          gameLog(currentGame, `Player ${user.username} (${socket.id}) joined the game`);
        } catch (error) {
          console.error(`[SOCKET_SERVICE] Error joining game:`, error);
          console.error(`[Lobby] Error processing game join:`, { 
            gameId: currentGame?.id || data?.gameId,
            username: socket.user?.username,
            error: error.message 
          });
          socket.emit('error', { message: 'Failed to join game' });
        }
      });

      // Event: Player ready (paid ante)
      socket.on('ready', async () => {
        try {
          const gameId = this.connectedSockets.get(socket.id);
          if (!gameId) return;

          let game = gameStateService.getGame(gameId);
          if (!game) return;

          // Mark player as ready
          game = await GameService.playerReady(game, socket.id);
          
          // Broadcast updated game state
          this.broadcastGameState(game);
        } catch (error) {
          console.error(`[SOCKET_SERVICE] Error in ready event:`, error);
        }
      });
      
      // Event: Player becomes unready (withdraws ante)
      socket.on('unready', async () => {
        try {
          const gameId = this.connectedSockets.get(socket.id);
          if (!gameId) return;

          let game = gameStateService.getGame(gameId);
          if (!game) return;

          // Mark player as unready and return their ante
          game = await playerManagementService.playerUnready(game, socket.id);
          
          // Broadcast updated game state
          this.broadcastGameState(game);
        } catch (error) {
          console.error(`[SOCKET_SERVICE] Error in unready event:`, error);
          this.sendError(socket.id, 'Failed to set player unready. Please try again.');
        }
      });

      // Event: Place a bet
      socket.on('placeBet', async (data) => {
        try {
          const { amount } = data;
          const gameId = this.connectedSockets.get(socket.id);
          if (!gameId) return;

          const game = gameStateService.getGame(gameId);
          if (!game) return;

          // Validate it's the player's turn
          if (!game.isPlayersTurn(socket.id)) {
            socket.emit('error', { message: 'Not your turn to bet' });
            return;
          }

          // Place the bet - GameService will handle all phase transitions and timers
          const updatedGame = await GameService.placeBet(game, socket.id, amount);
          
          // Broadcast updated game state
          this.broadcastGameState(updatedGame);
        } catch (error) {
          console.error(`[SOCKET_SERVICE] Error placing bet:`, error);
        }
      });

      // Event: Get available games
      socket.on('getAvailableGames', () => {
        try {
          const availableGames = GameService.getAvailableGames();
          socket.emit('availableGames', { games: availableGames });
        } catch (error) {
          console.error(`[SOCKET_SERVICE] Error getting available games:`, error);
        }
      });

      // Event: Second chance decision
      socket.on('secondChance', async (data) => {
        try {
          // Get user from socket (attached by auth middleware)
          const user = socket.user;
          if (!user || !user.userId) {
            console.error('[SOCKET_SERVICE] No valid user attached to socket');
            socket.emit('error', { message: 'Authentication required' });
            return;
          }
          
          // Get the game the player is in
          const gameId = this.connectedSockets.get(socket.id);
          if (!gameId) {
            console.error('[SOCKET_SERVICE] Player not in a game');
            socket.emit('error', { message: 'You are not in a game' });
            return;
          }
          
          // Get the game
          const gameStateService = require('./GameStateService');
          const game = gameStateService.getGame(gameId);
          if (!game) {
            console.error('[SOCKET_SERVICE] Game not found:', gameId);
            socket.emit('error', { message: 'Game not found' });
            return;
          }
          
          // Validate that it's the player's turn
          if (game.currentPlayerId !== socket.id) {
            console.error('[SOCKET_SERVICE] Not player\'s turn');
            socket.emit('error', { message: 'Not your turn' });
            return;
          }
          
          // Validate that we're waiting for a second chance decision
          if (!game.waitingForSecondChance) {
            console.error('[SOCKET_SERVICE] Not waiting for second chance decision');
            socket.emit('error', { message: 'No second chance needed' });
            return;
          }
          
          // Get the anteAgain value from the data
          const anteAgain = !!data.anteAgain;
          
          // If player chose to ante up again
          if (anteAgain) {
            // Handle the player's decision to ante up again
            const updatedGame = await GameService.handleSecondChance(game, socket.id, true);
            
            if (updatedGame.firstCard === null) {
              gameLog(updatedGame, `${user.username} chose to ante up again for a new hand`);
              
              // Use GameTimingService to continue the dealing sequence
              const gameTimingService = require('./GameTimingService');
              
              await gameTimingService.handleDealingSequence(updatedGame, {
                CardService: require('./CardService'),
                broadcastFn: (updatedGame) => this.broadcastGameState(updatedGame),
                getGameFn: (gameId) => gameStateService.getGame(gameId),
                saveGameFn: (game) => GameService.saveGame(game)
              });
            }
          } else {
            // Player chose to pass - this will reset the game state for the next player
            gameLog(game, `${user.username} chose to pass after matching pair`);
            
            // Handle the player's decision to pass
            // This will change the phase to BETTING and call placeBet with amount=0
            // which will handle the transition to the next player and start the dealing sequence
            await GameService.handleSecondChance(game, socket.id, false);
            
            // No need to broadcast here as placeBet will trigger the appropriate broadcasts
          }
          
        } catch (error) {
          console.error(`[SOCKET_SERVICE] Error handling second chance:`, error);
          socket.emit('error', { message: 'Error handling second chance' });
        }
      });
      
      // Event: Choose Ace value (high or low)
      socket.on('chooseAceValue', async (data) => {
        try {
          // Get user from socket (attached by auth middleware)
          const user = socket.user;
          if (!user || !user.userId) {
            console.error('[SOCKET_SERVICE] No valid user attached to socket');
            socket.emit('error', { message: 'Authentication required' });
            return;
          }
          
          // Get the game the player is in
          const gameId = this.connectedSockets.get(socket.id);
          if (!gameId) {
            console.error('[SOCKET_SERVICE] Player not in a game');
            socket.emit('error', { message: 'You are not in a game' });
            return;
          }
          
          // Get the game
          const gameStateService = require('./GameStateService');
          const game = gameStateService.getGame(gameId);
          if (!game) {
            console.error('[SOCKET_SERVICE] Game not found:', gameId);
            socket.emit('error', { message: 'Game not found' });
            return;
          }
          
          // Validate that it's the player's turn
          if (game.currentPlayerId !== socket.id) {
            console.error('[SOCKET_SERVICE] Not player\'s turn');
            socket.emit('error', { message: 'Not your turn' });
            return;
          }
          
          // Validate that we're waiting for an Ace decision
          if (!game.waitingForAceDecision || game.firstCard.value !== 'A') {
            console.error('[SOCKET_SERVICE] Not waiting for Ace decision');
            socket.emit('error', { message: 'No Ace decision needed' });
            return;
          }
          
          // Get the isAceLow value from the data
          const isAceLow = !!data.isAceLow;
          
          // Update the card
          game.firstCard.isAceLow = isAceLow;
          game.waitingForAceDecision = false;
          
          console.log(`[SOCKET_SERVICE] Player ${user.username} chose Ace as ${isAceLow ? 'LOW' : 'HIGH'}`);          gameLog(game, `Player ${user.username} chose Ace as ${isAceLow ? 'LOW' : 'HIGH'}`);
          
          // Save the game with updated Ace choice
          await GameService.saveGame(game);
          
          // Broadcast updated game state
          this.broadcastGameState(game);
          
          // If we're in the dealing phase and waiting for Ace decision, resume the dealing sequence
          if (game.phase === GamePhases.DEALING) {

            gameLog(game, `Resuming dealing sequence after Ace choice`);
            
            // Resume the dealing sequence by dealing the second card
            const gameTimingService = require('./GameTimingService');
            
            // Continue with the dealing sequence using the specialized method
            gameTimingService.resumeDealingAfterAceChoice(game, {
              CardService: require('./CardService'),
              broadcastFn: (updatedGame) => this.broadcastGameState(updatedGame),
              getGameFn: (gameId) => gameStateService.getGame(gameId),
              saveGameFn: (game) => GameService.saveGame(game)
            });            
          }
          
        } catch (error) {
          console.error(`[SOCKET_SERVICE] Error choosing Ace value:`, error);
          socket.emit('error', { message: 'Error choosing Ace value' });
        }
      });
      
      // Event: Get updated user balance
      socket.on('getBalance', async () => {
        try {
          // Get user from socket (attached by auth middleware)
          const user = socket.user;
          if (!user || !user.userId) {
            console.error('[SOCKET_SERVICE] No valid user attached to socket');
            socket.emit('error', { message: 'Authentication required' });
            return;
          }
          
          // Get the latest balance from the database
          const dbUser = await db.getUserById(user.userId);
          if (!dbUser) {
            console.error('[SOCKET_SERVICE] User not found in database:', user.userId);
            socket.emit('error', { message: 'User not found' });
            return;
          }
          
          console.log(`[SOCKET_SERVICE] Sending updated balance to user ${user.username}: ${dbUser.balance}`);
          
          // Send the updated balance to the client
          socket.emit('balanceUpdate', { balance: dbUser.balance });
        } catch (error) {
          console.error('[SOCKET_SERVICE] Error fetching balance:', error);
          socket.emit('error', { message: 'Failed to fetch balance' });
        }
      });
      
      // Event: Leave game and return to lobby (without disconnecting)
      socket.on('leaveGameLobby', async (data) => {
        try {
          console.log(`[SOCKET_SERVICE] Player ${socket.id} leaving game lobby: ${data.gameId}`);
          
          // Check if the socket is associated with a game
          const currentGameId = this.connectedSockets.get(socket.id);
          
          // If there's a mismatch, use the game ID from the socket map
          const gameId = currentGameId || data.gameId;
          
          if (gameId && GameService.games && GameService.games[gameId]) {
            const game = GameService.games[gameId];
            
            // Remove player from game
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
            
            // Send updated balance to the client
            if (socket.user?.userId) {
              try {
                const dbUser = await db.getUserById(socket.user.userId);
                if (dbUser) {
                  console.log(`[SOCKET_SERVICE] Sending updated balance to user ${socket.user.username}: ${dbUser.balance}`);
                  socket.emit('balanceUpdate', { balance: dbUser.balance });
                }
              } catch (error) {
                console.error('[SOCKET_SERVICE] Error fetching balance after leaving game:', error);
              }
            }
          } else {
            console.log(`[SOCKET_SERVICE] No game found for player ${socket.id} to leave`);
            socket.emit('leftGame', { success: true });
          }
        } catch (error) {
          console.error(`[SOCKET_SERVICE] Error in leaveGameLobby:`, error);
          socket.emit('error', { message: 'Failed to leave game' });
        }
      });

      // Event: Disconnect
      socket.on('disconnect', () => {
        try {
          console.log(`[SOCKET_SERVICE] Disconnection: ${socket.id}`);
          
          const gameId = this.connectedSockets.get(socket.id);
          if (gameId && GameService.games && GameService.games[gameId]) {
            const game = GameService.games[gameId];
            
            // Remove player from game
            GameService.removePlayer(game, socket.id);
            
            // Check if game is now empty and should be cleaned up
            const wasGameRemoved = this.cleanupGameIfEmpty(game);
            
            if (!wasGameRemoved) {
              // Only broadcast game state if the game wasn't removed
              this.broadcastGameState(game);
            }
            
            // Leave room and remove from connected sockets map
            socket.leave(gameId);
            this.connectedSockets.delete(socket.id);
          }
        } catch (error) {
          console.error(`[SOCKET_SERVICE] Error in disconnect:`, error);
        }
      });
    });
  }

  /**
   * Broadcast game state to all players in a game
   * @param {Game} game - The game to broadcast
   */
  broadcastGameState(game) {
    if (!this.io || !game) return;
    
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
    this.io.to(game.id).emit('gameState', gameState);
    
    // After updating a game, broadcast updated game list to all clients
    this.broadcastGameList();
    
    // Log the broadcast
    gameLog(game, `Game state broadcast - Phase: ${game.phase}, Current player: ${game.players[game.currentPlayerId]?.name}`);
  }
  

  
  /**
   * Get the current list of available games
   * @returns {Array} List of available games
   */
  getGameList() {
    const gameList = [];
    
    // Prepare simplified game data for the lobby
    for (const gameId in GameService.games) {
      const game = GameService.games[gameId];
      
      // Only include games that are still available to join
      const connectedPlayers = Object.values(game.players).filter(p => p.isConnected);
      if (connectedPlayers.length < 6) { // Max 6 players
        gameList.push({
          id: game.id,
          playerCount: connectedPlayers.length,
          phase: game.phase,
          createdAt: game.startTime
        });
      }
    }
    
    return gameList;
  }
  
  /**
   * Send the current list of games to a specific client
   * @param {Socket} socket - The socket to send the game list to
   */
  sendGameListToClient(socket) {
    if (!socket) return;
    
    const gameList = this.getGameList();
    socket.emit('gameList', gameList);
    console.log(`[SOCKET_SERVICE] Sent list of ${gameList.length} available games to client ${socket.id}`);
  }

  /**
   * Broadcast list of available games to all connected clients
   */
  broadcastGameList() {
    if (!this.io) return;
    
    const gameList = this.getGameList();
    
    // Send game list to all connected clients
    this.io.emit('gameList', gameList);
    console.log(`[SOCKET_SERVICE] Broadcasting list of ${gameList.length} available games`);
  }
  
  /**
   * Check if a game is empty and clean it up if it is
   * @param {Object} game - The game to check
   * @returns {boolean} - True if the game was cleaned up, false otherwise
   */
  cleanupGameIfEmpty(game) {
    if (!game) return false;
    
    // Check if there are any connected players
    const connectedPlayers = Object.values(game.players).filter(p => p.isConnected);
    
    if (connectedPlayers.length === 0) {
      gameLog(game, 'All players left, removing game');
      delete GameService.games[game.id];
      
      // Broadcast updated game list after removal
      this.broadcastGameList();
      
      return true;
    }
    
    return false;
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

module.exports = new SocketService();
