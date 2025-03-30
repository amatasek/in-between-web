/**
 * SocketService - Manages all socket communication between server and clients
 */
const socketIo = require('socket.io');
const { gameLog } = require('../utils/logger');

// We'll load the GameService lazily to avoid circular dependencies
let GameService;

class SocketService {
  constructor() {
    this.io = null;
    this.connectedSockets = new Map(); // Maps socket.id to gameId
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

    this.setupEventHandlers();
    console.log('[SOCKET_SERVICE] Socket.IO initialized');
  }

  /**
   * Set up socket event handlers
   */
  setupEventHandlers() {
    if (!this.io) return;
    
    // Lazy-load GameService to avoid circular dependencies
    if (!GameService) {
      GameService = require('./GameService');
    }

    this.io.on('connection', (socket) => {
      console.log(`[SOCKET_SERVICE] New connection: ${socket.id}`);
      
      // Send the current list of games to the newly connected client
      this.sendGameListToClient(socket);

      // Event: Create a new game
      socket.on('createGame', (playerName) => {
        try {
          // Check if playerName is directly provided as a string (not in an object)
          if (!playerName || typeof playerName !== 'string' || !playerName.trim()) {
            socket.emit('error', { message: 'Player name is required' });
            return;
          }
          
          // Generate a random game ID
          const gameId = Math.random().toString(36).substring(2, 8).toUpperCase();

          // Create game and add player
          const game = GameService.createGame(gameId, socket.id);
          GameService.addPlayer(game, socket.id, playerName);
          
          // Join socket to game room
          socket.join(gameId);
          this.connectedSockets.set(socket.id, gameId);
          
          // Make sure the game has a valid phase before sending
          const gameState = game.toJSON();
          
          // Log the game state before sending
          console.log(`[SOCKET_SERVICE] Game created with ID ${gameId}, phase: ${gameState.phase}`);
          
          // Send game state to player with proper phase
          socket.emit('gameJoined', { 
            game: gameState,
            playerId: socket.id
          });
          
          gameLog(game, `Game created by ${playerName} (${socket.id})`);
        } catch (error) {
          console.error(`[SOCKET_SERVICE] Error creating game:`, error);
          socket.emit('error', { message: 'Failed to create game' });
        }
      });

      // Event: Join an existing game
      socket.on('joinGame', (data) => {
        try {
          const { gameId, playerName } = data;
          if (!gameId || !playerName) {
            socket.emit('error', { message: 'Game ID and player name are required' });
            return;
          }

          const game = GameService.games[gameId];
          if (!game) {
            socket.emit('error', { message: 'Game not found' });
            return;
          }

          // Check if game is full
          const connectedPlayers = Object.values(game.players).filter(p => p.isConnected);
          if (connectedPlayers.length >= 6) {
            socket.emit('error', { message: 'Game is full' });
            return;
          }

          // Add player to game
          GameService.addPlayer(game, socket.id, playerName);
          
          // Join socket to game room
          socket.join(gameId);
          this.connectedSockets.set(socket.id, gameId);
          
          // Make sure the game has a valid phase before sending
          const gameState = game.toJSON();
          
          // Log the game state before sending
          console.log(`[SOCKET_SERVICE] Player joined game ${gameId}, phase: ${gameState.phase}`);
          
          // Send game state to player with proper phase
          socket.emit('gameJoined', { 
            game: gameState,
            playerId: socket.id
          });
          
          // Broadcast updated game state to all players
          this.broadcastGameState(game);
          
          // Update the game list for all clients in the lobby
          this.broadcastGameList();
          
          gameLog(game, `Player ${playerName} (${socket.id}) joined the game`);
        } catch (error) {
          console.error(`[SOCKET_SERVICE] Error joining game:`, error);
          socket.emit('error', { message: 'Failed to join game' });
        }
      });

      // Event: Player ready (paid ante)
      socket.on('ready', () => {
        try {
          const gameId = this.connectedSockets.get(socket.id);
          if (!gameId) return;

          const game = GameService.games[gameId];
          if (!game) return;

          // Mark player as ready
          GameService.playerReady(game, socket.id);
          
          // Broadcast updated game state
          this.broadcastGameState(game);
        } catch (error) {
          console.error(`[SOCKET_SERVICE] Error in ready event:`, error);
        }
      });
      
      // Event: Player withdraws ante
      socket.on('withdrawAnte', () => {
        try {
          const gameId = this.connectedSockets.get(socket.id);
          if (!gameId) return;

          const game = GameService.games[gameId];
          if (!game) return;

          // Allow player to withdraw their ante
          GameService.playerWithdrawAnte(game, socket.id);
          
          // Broadcast updated game state
          this.broadcastGameState(game);
        } catch (error) {
          console.error(`[SOCKET_SERVICE] Error in withdrawAnte event:`, error);
        }
      });

      // Event: Place a bet
      socket.on('placeBet', (data) => {
        try {
          const { amount } = data;
          const gameId = this.connectedSockets.get(socket.id);
          if (!gameId) return;

          const game = GameService.games[gameId];
          if (!game) return;

          // Validate it's the player's turn
          if (!game.isPlayersTurn(socket.id)) {
            socket.emit('error', { message: 'Not your turn to bet' });
            return;
          }

          // Place the bet
          GameService.placeBet(game, socket.id, amount);
          
          // Automatically reveal the card after a valid bet
          GameService.revealCard(game);
          
          // Broadcast updated game state
          this.broadcastGameState(game);
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

      // Event: Disconnect
      socket.on('disconnect', () => {
        try {
          console.log(`[SOCKET_SERVICE] Disconnection: ${socket.id}`);
          
          const gameId = this.connectedSockets.get(socket.id);
          if (gameId) {
            const game = GameService.games[gameId];
            if (game) {
              // Remove player from game
              GameService.removePlayer(game, socket.id);
              
              // Broadcast updated game state
              this.broadcastGameState(game);
              
              // Clean up if all players disconnected
              const connectedPlayers = Object.values(game.players).filter(p => p.isConnected);
              if (connectedPlayers.length === 0) {
                gameLog(game, 'All players disconnected, cleaning up game');
                delete GameService.games[gameId];
              }
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
