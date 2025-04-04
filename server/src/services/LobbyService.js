/**
 * LobbyService - Handles game creation, joining, and lobby management
 */
const BaseService = require('./BaseService');
const { gameLog } = require('../utils/logger');

class LobbyService extends BaseService {
  constructor() {
    super();
  }
  
  /**
   * Register socket event handlers for lobby-related events
   * @param {Socket} socket - The socket to register handlers for
   */
  registerSocketEvents(socket) {
    socket.on('createGame', () => this.handleCreateGame(socket));
    socket.on('joinGame', (data) => this.handleJoinGame(socket, data));
    socket.on('getAvailableGames', () => this.handleGetAvailableGames(socket));
    socket.on('leaveGameLobby', (data) => this.handleLeaveGameLobby(socket, data));
  }
  
  /**
   * Handle a new connection by sending the game list
   * @param {Socket} socket - The newly connected socket
   */
  handleNewConnection(socket) {
    this.sendGameListToClient(socket);
  }
  
  /**
   * Send the current list of games to a specific client
   * @param {Socket} socket - The socket to send the game list to
   */
  sendGameListToClient(socket) {
    if (!socket) return;
    
    const gameList = this.getGameList();
    socket.emit('gameList', gameList);
    console.log(`[LOBBY_SERVICE] Sent list of ${gameList.length} available games to client ${socket.id}`);
  }
  
  /**
   * Handle create game event
   * @param {Socket} socket - The socket that triggered the event
   */
  async handleCreateGame(socket) {
    console.log('[LOBBY_SERVICE] Received createGame event from socket:', socket.id);
    try {
      // Get user from socket (attached by auth middleware)
      const user = socket.user;
      if (!user) {
        console.error('[LOBBY_SERVICE] No user attached to socket');
        socket.emit('error', { message: 'Authentication required' });
        return;
      }
      
      console.log('[LOBBY_SERVICE] Creating game for user:', user);
      
      // Generate a random game ID
      const gameId = Math.random().toString(36).substring(2, 8).toUpperCase();

      // Get required services
      const gameStateService = this.getService('gameState');
      const playerManagementService = this.getService('playerManagement');
      const connectionService = this.getService('connection');
      const broadcastService = this.getService('broadcast');
      
      // Create game
      const game = gameStateService.createGame(gameId, socket.id);
      
      // Add player to game
      await playerManagementService.addPlayer(game, socket.id, user.username || `Player ${socket.id.slice(0,4)}`, user.userId);
      
      // Associate socket with game
      connectionService.associateSocketWithGame(socket.id, gameId);
      
      // Send game state to player
      socket.emit('gameJoined', { 
        game: game.toJSON(),
        playerId: socket.id
      });
      
      // Broadcast updated game list to all clients in the lobby
      broadcastService.broadcastGameList();
      
      gameLog(game, `Game created by ${user.username} (${socket.id})`);
    } catch (error) {
      console.error(`[LOBBY_SERVICE] Error creating game:`, error);
      socket.emit('error', { message: error.message || 'Failed to create game' });
    }
  }
  
  /**
   * Handle join game event
   * @param {Socket} socket - The socket that triggered the event
   * @param {Object} data - Event data containing gameId
   */
  async handleJoinGame(socket, data) {
    let currentGame;
    try {
      const { gameId } = data;
      const user = socket.user;
      
      if (!user) {
        console.error('[LOBBY_SERVICE] No user attached to socket');
        socket.emit('error', { message: 'Authentication required' });
        return;
      }
      
      if (!gameId) {
        socket.emit('error', { message: 'Game ID is required' });
        return;
      }

      // Get required services
      const gameService = this.getService('game');
      const gameStateService = this.getService('gameState');
      const connectionService = this.getService('connection');
      const broadcastService = this.getService('broadcast');
      
      // Use gameStateService.getGame instead of gameService.getGameById
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
      const playerManagementService = this.getService('playerManagement');
      await playerManagementService.addPlayer(currentGame, socket.id, user.username || `Player ${socket.id.slice(0,4)}`, user.userId);
      
      // Associate socket with game
      connectionService.associateSocketWithGame(socket.id, gameId);
      
      // Make sure the game has a valid phase before sending
      const gameState = currentGame.toJSON();
      
      // Log the game state before sending
      console.log(`[LOBBY_SERVICE] Player joined game ${gameId}, phase: ${gameState.phase}`);
      
      // Send game state to player with proper phase
      socket.emit('gameJoined', { 
        game: gameState,
        playerId: socket.id
      });
      
      // Broadcast updated game state to all players
      broadcastService.broadcastGameState(currentGame);
      
      // Update the game list for all clients in the lobby
      broadcastService.broadcastGameList();
      
      gameLog(currentGame, `Player ${user.username} (${socket.id}) joined the game`);
    } catch (error) {
      console.error(`[LOBBY_SERVICE] Error joining game:`, error);
      console.error(`[Lobby] Error processing game join:`, { 
        gameId: currentGame?.id || data?.gameId,
        username: socket.user?.username,
        error: error.message 
      });
      socket.emit('error', { message: 'Failed to join game' });
    }
  }
  
  /**
   * Handle get available games event
   * @param {Socket} socket - The socket that triggered the event
   */
  handleGetAvailableGames(socket) {
    try {
      this.sendGameListToClient(socket);
    } catch (error) {
      console.error(`[LOBBY_SERVICE] Error getting available games:`, error);
    }
  }
  
  /**
   * Get a list of available games for API endpoints
   * @returns {Array} List of available games with their details
   */
  getAvailableGames() {
    const gameService = this.getService('game');
    if (!gameService || !gameService.games) return [];
    
    const availableGames = [];
    
    for (const gameId in gameService.games) {
      const game = gameService.games[gameId];
      
      // Only include games that are in the waiting phase or have open seats
      if (game.phase === 'waiting' || game.players.length < game.maxPlayers) {
        availableGames.push({
          id: game.id,
          hostName: game.hostName,
          playerCount: game.players.length,
          maxPlayers: game.maxPlayers,
          phase: game.phase,
          created: game.created
        });
      }
    }
    
    return availableGames;
  }
  
  /**
   * Get the current list of available games
   * @returns {Array} List of available games
   */
  getGameList() {
    const gameList = [];
    
    const gameService = this.getService('game');
    if (!gameService || !gameService.games) return gameList;
    
    // Prepare simplified game data for the lobby
    for (const gameId in gameService.games) {
      const game = gameService.games[gameId];
      
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
   * Handle leave game lobby event
   * @param {Socket} socket - The socket that triggered the event
   * @param {Object} data - Event data containing gameId
   */
  async handleLeaveGameLobby(socket, data) {
    try {
      console.log(`[LOBBY_SERVICE] Player ${socket.id} leaving game lobby: ${data.gameId}`);
      
      // Get required services
      const connectionService = this.getService('connection');
      const gameService = this.getService('game');
      const broadcastService = this.getService('broadcast');
      const dbService = this.getService('database');
      
      // Check if the socket is associated with a game
      const currentGameId = connectionService.getGameIdForSocket(socket.id);
      
      // If there's a mismatch, use the game ID from the socket map
      const gameId = currentGameId || data.gameId;
      
      if (gameId && gameService.games && gameService.games[gameId]) {
        const game = gameService.games[gameId];
        
        // Remove player from game
        await gameService.safeRemovePlayer(game, socket.id);
        
        // Check if game is now empty and should be cleaned up
        const wasGameRemoved = this.cleanupGameIfEmpty(game);
        
        if (!wasGameRemoved) {
          // Only broadcast game state if the game wasn't removed
          broadcastService.broadcastGameState(game);
        }
        
        // Disassociate socket from game
        connectionService.disassociateSocketFromGame(socket.id);
        
        console.log(`[LOBBY_SERVICE] Player ${socket.id} successfully left game ${gameId}`);
        
        // Send confirmation to client
        socket.emit('leftGame', { success: true });
        
        // Send updated game list
        this.sendGameListToClient(socket);
        
        // Send updated balance to the client
        if (socket.user?.userId) {
          try {
            const dbUser = await dbService.getUserById(socket.user.userId);
            if (dbUser) {
              console.log(`[LOBBY_SERVICE] Sending updated balance to user ${socket.user.username}: ${dbUser.balance}`);
              socket.emit('balanceUpdate', { balance: dbUser.balance });
            }
          } catch (error) {
            console.error('[LOBBY_SERVICE] Error fetching balance after leaving game:', error);
          }
        }
      } else {
        console.log(`[LOBBY_SERVICE] No game found for player ${socket.id} to leave`);
        socket.emit('leftGame', { success: true });
      }
    } catch (error) {
      console.error(`[LOBBY_SERVICE] Error in leaveGameLobby:`, error);
      socket.emit('error', { message: 'Failed to leave game' });
    }
  }
  
  /**
   * Check if a game is empty and clean it up if it is
   * @param {Object} game - The game to check
   * @returns {boolean} - True if the game was cleaned up, false otherwise
   */
  /**
   * Clean up a game if it's empty (no connected players)
   * @param {Game} game - The game to check and potentially clean up
   * @returns {boolean} True if the game was removed, false otherwise
   */
  cleanupGameIfEmpty(game) {
    if (!game) return false;
    
    // Check if there are any connected players
    const connectedPlayers = Object.values(game.players).filter(p => p.isConnected);
    
    if (connectedPlayers.length === 0) {
      const gameService = this.getService('game');
      const broadcastService = this.getService('broadcast');
      
      gameLog(game, 'All players left, removing game');
      delete gameService.games[game.id];
      
      // Broadcast updated game list after removal
      broadcastService.broadcastGameList();
      
      return true;
    }
    
    return false;
  }

  /**
   * Clean up all empty games (no connected players)
   * This is used for scheduled cleanup tasks
   */
  cleanupEmptyGames() {
    const gameService = this.getService('game');
    if (!gameService || !gameService.games) return;
    
    console.log('[LOBBY_SERVICE] Cleaning up empty games');
    let cleanedCount = 0;
    
    for (const gameId in gameService.games) {
      const game = gameService.games[gameId];
      if (this.cleanupGameIfEmpty(game)) {
        cleanedCount++;
      }
    }
    
    if (cleanedCount > 0) {
      console.log(`[LOBBY_SERVICE] Cleaned up ${cleanedCount} empty games`);
    }
  }
}

module.exports = new LobbyService();
