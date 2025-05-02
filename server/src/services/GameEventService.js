/**
 * GameEventService - Handles game-specific events like betting, ready states, etc.
 */
const BaseService = require('./BaseService');
const { gameLog } = require('../utils/logger');

class GameEventService extends BaseService {
  constructor() {
    super();
  }
  
  /**
   * Register socket event handlers for game-related events
   * @param {Socket} socket - The socket to register handlers for
   */
  registerSocketEvents(socket) {
    socket.on('ready', () => this.handleReady(socket));
    socket.on('unready', () => this.handleUnready(socket));
    socket.on('placeBet', (data) => this.handlePlaceBet(socket, data));
    socket.on('secondChance', (data) => this.handleSecondChance(socket, data));
    socket.on('chooseAceValue', (data) => this.handleChooseAceValue(socket, data));
    socket.on('sitOut', (data) => this.handleSitOut(socket, data));
  }
  
  /**
   * Handle ready event (player paid ante)
   * @param {Socket} socket - The socket that triggered the event
   */
  async handleReady(socket) {
    try {
      // Get user from socket (attached by auth middleware)
      const user = socket.user;
      if (!user || !user.userId) {
        console.error('[GAME_EVENT_SERVICE] No valid user attached to socket');
        socket.emit('error', { message: 'Authentication required' });
        return;
      }
      
      const userId = user.userId;
      
      const connectionService = this.getService('connection');
      const gameService = this.getService('game');
      const gameStateService = this.getService('gameState');
      const broadcastService = this.getService('broadcast');
      const gameTimingService = this.getService('gameTiming');
      
      const gameId = connectionService.getGameIdForSocket(socket.id);
      if (!gameId) {
        console.log(`[GAME_EVENT_SERVICE] Cannot find gameId for socket ${socket.id} (user: ${socket.user?.userId || 'unknown'})`);
        socket.emit('error', { message: 'You are not currently in a game. Please join or create a game first.' });
        return;
      }

      let game = gameStateService.getGame(gameId);
      if (!game) {
        console.log(`[GAME_EVENT_SERVICE] Game ${gameId} not found`);
        return;
      }
      
      // Check if player exists in the game by userId
      let player = game.players[userId];
      
      // If player not found by userId, they might not be in the game
      if (!player) {
        console.log(`[GAME_EVENT_SERVICE] Player with userId ${userId} not found in game ${gameId}`);
        return;
      }
      
      // Ensure the socket-to-user mapping is up to date
      if (player.socketId !== socket.id) {
        console.log(`[GAME_EVENT_SERVICE] Updating socket ID for player ${player.name} from ${player.socketId} to ${socket.id}`);
        game.updatePlayerSocket(userId, socket.id);
      }

      // Log player state before marking as ready
      console.log(`[GAME_EVENT_SERVICE] Player ${player.name} (${userId}) ready state before: ${player.isReady}`);
      
      // If player is already ready, don't process the ready event again
      if (player.isReady) {
        console.log(`[GAME_EVENT_SERVICE] Player ${player.name} is already ready, ignoring duplicate ready event`);
        return;
      }

      // Mark player as ready
      game = await gameService.playerReady(game, userId);
      
      // Log player state after marking as ready
      console.log(`[GAME_EVENT_SERVICE] Player ${player.name} (${userId}) ready state after: ${player.isReady}`);
      
      // Clear inactivity timer for this player IF they successfully readied
      gameTimingService.clearPlayerInactivityTimer(game.id, player.userId);

      // Broadcast updated game state
      broadcastService.broadcastGameState(game);
    } catch (error) {
      console.error(`[GAME_EVENT_SERVICE] Error in ready event:`, error);
    }
  }
  
  /**
   * Handle unready event (player withdraws ante)
   * @param {Socket} socket - The socket that triggered the event
   */
  async handleUnready(socket) {
    try {
      // Get user from socket (attached by auth middleware)
      const user = socket.user;
      if (!user || !user.userId) {
        console.error('[GAME_EVENT_SERVICE] No valid user attached to socket');
        socket.emit('error', { message: 'Authentication required' });
        return;
      }
      
      const userId = user.userId;
      
      const connectionService = this.getService('connection');
      const broadcastService = this.getService('broadcast');
      const playerManagementService = this.getService('playerManagement');
      const gameStateService = this.getService('gameState');
      const gameTimingService = this.getService('gameTiming');
      
      const gameId = connectionService.getGameIdForSocket(socket.id);
      if (!gameId) {
        console.log(`[GAME_EVENT_SERVICE] Cannot find gameId for socket ${socket.id} (user: ${socket.user?.userId || 'unknown'})`);
        socket.emit('error', { message: 'You are not currently in a game. Please join or create a game first.' });
        return;
      }

      let game = gameStateService.getGame(gameId);
      if (!game) {
        console.log(`[GAME_EVENT_SERVICE] Game ${gameId} not found`);
        return;
      }
      
      // Check if player exists in the game by userId
      const player = game.players[userId];
      if (!player) {
        console.log(`[GAME_EVENT_SERVICE] Player with userId ${userId} not found in game ${gameId}`);
        return;
      }
      
      // Ensure the socket-to-user mapping is up to date
      if (player.socketId !== socket.id) {
        console.log(`[GAME_EVENT_SERVICE] Updating socket ID for player ${player.name} from ${player.socketId} to ${socket.id}`);
        game.updatePlayerSocket(userId, socket.id);
      }

      // Mark player as unready and return their ante
      game = await playerManagementService.playerUnready(game, userId);
      
      // Start inactivity timer for the player
      gameTimingService.startPlayerInactivityTimer(game, userId);
      
      // Broadcast updated game state
      broadcastService.broadcastGameState(game);
    } catch (error) {
      console.error(`[GAME_EVENT_SERVICE] Error in unready event:`, error);
      const connectionService = this.getService('connection');
      connectionService.sendError(socket.id, 'Failed to set player unready. Please try again.');
    }
  }
  
  /**
   * Handle place bet event
   * @param {Socket} socket - The socket that triggered the event
   * @param {Object} data - Event data containing bet amount
   */
  async handlePlaceBet(socket, data) {
    try {
      // Get user from socket (attached by auth middleware)
      const user = socket.user;
      if (!user || !user.userId) {
        console.error('[GAME_EVENT_SERVICE] No valid user attached to socket');
        socket.emit('error', { message: 'Authentication required' });
        return;
      }
      
      const userId = user.userId;
      const amount = data?.bet ?? 0;
      
      const connectionService = this.getService('connection');
      const gameService = this.getService('game');
      const gameStateService = this.getService('gameState');
      const broadcastService = this.getService('broadcast');
      
      const gameId = connectionService.getGameIdForSocket(socket.id);
      if (!gameId) {
        console.log(`[GAME_EVENT_SERVICE] Cannot find gameId for socket ${socket.id} (user: ${socket.user?.userId || 'unknown'})`);
        socket.emit('error', { message: 'You are not currently in a game. Please join or create a game first.' });
        return;
      }

      let game = gameStateService.getGame(gameId);
      if (!game) {
        console.log(`[GAME_EVENT_SERVICE] Game ${gameId} not found`);
        return;
      }
      
      // Check if player exists in the game by userId
      const player = game.players[userId];
      if (!player) {
        console.log(`[GAME_EVENT_SERVICE] Player with userId ${userId} not found in game ${gameId}`);
        return;
      }
      
      // Ensure the socket-to-user mapping is up to date
      if (player.socketId !== socket.id) {
        console.log(`[GAME_EVENT_SERVICE] Updating socket ID for player ${player.name} from ${player.socketId} to ${socket.id}`);
        game.updatePlayerSocket(userId, socket.id);
      }

      // Validate it's the player's turn
      if (game.currentPlayerId !== userId) {
        socket.emit('error', { message: 'Not your turn to bet' });
        return;
      }

      // Place the bet - GameService will handle all phase transitions and timers
      const updatedGame = await gameService.placeBet(game, userId, amount);
      
      // Broadcast updated game state
      broadcastService.broadcastGameState(updatedGame);
    } catch (error) {
      console.error(`[GAME_EVENT_SERVICE] Error placing bet:`, error);
    }
  }
  
  /**
   * Handle second chance decision event
   * @param {Socket} socket - The socket that triggered the event
   * @param {Object} data - Event data containing anteAgain decision
   */
  async handleSecondChance(socket, data) {
    try {
      // Get user from socket (attached by auth middleware)
      const user = socket.user;
      if (!user || !user.userId) {
        console.error('[GAME_EVENT_SERVICE] No valid user attached to socket');
        socket.emit('error', { message: 'Authentication required' });
        return;
      }
      
      const userId = user.userId;
      
      const connectionService = this.getService('connection');
      const gameService = this.getService('game');
      const gameStateService = this.getService('gameState');
      const gameTimingService = this.getService('gameTiming');
      const cardService = this.getService('card');
      const broadcastService = this.getService('broadcast');
      
      // Get the game the player is in
      const gameId = connectionService.getGameIdForSocket(socket.id);
      if (!gameId) {
        console.error(`[GAME_EVENT_SERVICE] Cannot find gameId for socket ${socket.id} (user: ${socket.user?.userId || 'unknown'})`);
        socket.emit('error', { message: 'You are not currently in a game. Please join or create a game first.' });
        return;
      }
      
      // Get the game
      let game = gameStateService.getGame(gameId);
      if (!game) {
        console.error('[GAME_EVENT_SERVICE] Game not found:', gameId);
        socket.emit('error', { message: 'Game not found' });
        return;
      }
      
      // Check if player exists in the game by userId
      const player = game.players[userId];
      if (!player) {
        console.log(`[GAME_EVENT_SERVICE] Player with userId ${userId} not found in game ${gameId}`);
        socket.emit('error', { message: 'You are not in this game' });
        return;
      }
      
      // Ensure the socket-to-user mapping is up to date
      if (player.socketId !== socket.id) {
        console.log(`[GAME_EVENT_SERVICE] Updating socket ID for player ${player.name} from ${player.socketId} to ${socket.id}`);
        game.updatePlayerSocket(userId, socket.id);
      }
      
      // Validate that it's the player's turn
      if (game.currentPlayerId !== userId) {
        console.error('[GAME_EVENT_SERVICE] Not player\'s turn');
        socket.emit('error', { message: 'Not your turn' });
        return;
      }
      
      // Validate that we're waiting for a second chance decision
      if (!game.waitingForSecondChance) {
        console.error('[GAME_EVENT_SERVICE] Not waiting for second chance decision');
        socket.emit('error', { message: 'No second chance needed' });
        return;
      }
      
      // Get the anteAgain value from the data
      const anteAgain = !!data.anteAgain;
      
      // Clear any existing auto-second-chance timeout to prevent it from running after the decision
      if (gameTimingService.timeouts[gameId]?.autoSecondChance) {
        clearTimeout(gameTimingService.timeouts[gameId].autoSecondChance);
        gameTimingService.timeouts[gameId].autoSecondChance = null;
      }
      
      // If player chose to ante up again
      if (anteAgain) {
        // Handle the player's decision to ante up again
        const updatedGame = await gameService.handleSecondChance(game, userId, true);
        
        if (updatedGame.firstCard === null) {
          gameLog(updatedGame, `${player.name} antes up for a second chance`);
          
          // Use GameTimingService to continue the dealing sequence
          await gameTimingService.handleDealingSequence(updatedGame);
        }
      } else {
        // Handle the player's decision to pass
        await gameService.handleSecondChance(game, userId, false);
      }
    } catch (error) {
      console.error(`[GAME_EVENT_SERVICE] Error handling second chance:`, error);
      socket.emit('error', { message: 'Error handling second chance' });
    }
  }
  
  /**
   * Handle choose ace value event
   * @param {Socket} socket - The socket that triggered the event
   * @param {Object} data - Event data containing isAceLow decision
   */
  async handleChooseAceValue(socket, data) {
    try {
      // Get user from socket (attached by auth middleware)
      const user = socket.user;
      if (!user || !user.userId) {
        console.error('[GAME_EVENT_SERVICE] No valid user attached to socket');
        socket.emit('error', { message: 'Authentication required' });
        return;
      }
      
      const userId = user.userId;
      
      const connectionService = this.getService('connection');
      const gameStateService = this.getService('gameState');
      const gameTimingService = this.getService('gameTiming');
      const broadcastService = this.getService('broadcast');
      
      // Get the game the player is in
      const gameId = connectionService.getGameIdForSocket(socket.id);
      if (!gameId) {
        console.error(`[GAME_EVENT_SERVICE] Cannot find gameId for socket ${socket.id} (user: ${socket.user?.userId || 'unknown'})`);
        socket.emit('error', { message: 'You are not currently in a game. Please join or create a game first.' });
        return;
      }
      
      // Get the game
      let game = gameStateService.getGame(gameId);
      if (!game) {
        console.error('[GAME_EVENT_SERVICE] Game not found:', gameId);
        socket.emit('error', { message: 'Game not found' });
        return;
      }
      
      // Check if player exists in the game by userId
      const player = game.players[userId];
      if (!player) {
        console.log(`[GAME_EVENT_SERVICE] Player with userId ${userId} not found in game ${gameId}`);
        socket.emit('error', { message: 'You are not in this game' });
        return;
      }
      
      // Ensure the socket-to-user mapping is up to date
      if (player.socketId !== socket.id) {
        console.log(`[GAME_EVENT_SERVICE] Updating socket ID for player ${player.name} from ${player.socketId} to ${socket.id}`);
        game.updatePlayerSocket(userId, socket.id);
      }
      
      // Validate that it's the player's turn
      if (game.currentPlayerId !== userId) {
        console.error('[GAME_EVENT_SERVICE] Not player\'s turn');
        socket.emit('error', { message: 'Not your turn' });
        return;
      }
      
      // Validate that we're waiting for an Ace decision
      if (!game.waitingForAceDecision || game.firstCard.value !== 'A') {
        console.error('[GAME_EVENT_SERVICE] Not waiting for Ace decision');
        socket.emit('error', { message: 'No Ace decision needed' });
        return;
      }
      
      // Get the isAceLow value from the data
      const isAceLow = !!data.isAceLow;
      
      // Clear any existing auto-ace-decision timeout to prevent it from running after the decision
      if (gameTimingService.timeouts[gameId]?.autoAceDecision) {
        clearTimeout(gameTimingService.timeouts[gameId].autoAceDecision);
        gameTimingService.timeouts[gameId].autoAceDecision = null;
      }
      
      // Update the card
      game.firstCard.isAceLow = isAceLow;
      game.waitingForAceDecision = false;
      
      gameLog(game, `${player.name} chooses Ace as ${isAceLow ? 'LOW' : 'HIGH'}`);
      
      // Save the game with updated Ace choice
      await gameStateService.saveGame(game);
      
      // Broadcast updated game state
      broadcastService.broadcastGameState(game);
      
      // If we're in the dealing phase and waiting for Ace decision, resume the dealing sequence
      if (game.phase === 'dealing') {
        // Removed redundant log message
        
        // Continue with the dealing sequence using the specialized method
        gameTimingService.resumeDealingAfterAceChoice(game);            
      }
    } catch (error) {
      console.error(`[GAME_EVENT_SERVICE] Error choosing Ace value:`, error);
      socket.emit('error', { message: 'Error choosing Ace value' });
    }
  }
  
  /**
   * Handle sitOut event (player opts out of the next round)
   * @param {Socket} socket - The socket that triggered the event
   * @param {Object} data - Event data containing gameId
   */
  async handleSitOut(socket, data) {
    try {
      const user = socket.user;
      if (!user || !user.userId) {
        console.error('[GAME_EVENT_SERVICE] No valid user attached to socket for sitOut');
        socket.emit('error', { message: 'Authentication required' });
        return;
      }
      const userId = user.userId;
      const gameId = data?.gameId; // gameId comes from client payload

      if (!gameId) {
        console.error('[GAME_EVENT_SERVICE] Missing gameId in sitOut event payload');
        socket.emit('error', { message: 'Missing game identifier.' });
        return;
      }

      const gameStateService = this.getService('gameState');
      const broadcastService = this.getService('broadcast');
      const playerManagementService = this.getService('playerManagement');
      const gameTimingService = this.getService('gameTiming'); // Get timing service

      let game = gameStateService.getGame(gameId);
      if (!game) {
        console.log(`[GAME_EVENT_SERVICE] Game ${gameId} not found for sitOut`);
        // Don't emit error, maybe game just ended?
        return;
      }

      // Check if player exists in the game by userId
      const player = game.players[userId];
      if (!player) {
        console.log(`[GAME_EVENT_SERVICE] Player with userId ${userId} not found in game ${gameId} for sitOut`);
        // Don't emit error, maybe player was removed?
        return;
      }

      // Ensure the socket-to-user mapping is up to date (good practice)
      if (player.socketId !== socket.id) {
        console.log(`[GAME_EVENT_SERVICE] Updating socket ID for player ${player.name} from ${player.socketId} to ${socket.id} during sitOut`);
        game.updatePlayerSocket(userId, socket.id);
      }

      game = await playerManagementService.playerSitOut(game, userId);

      // Clear inactivity timer since player is now sitting out
      gameTimingService.clearPlayerInactivityTimer(game.id, player.userId);

      broadcastService.broadcastGameState(game);
    } catch (error) {
      console.error(`[GAME_EVENT_SERVICE] Error in sitOut event:`, error);
    }
  }

  /**
   * Handle get balance event
   * @param {Socket} socket - The socket that triggered the event
   */
  async handleGetBalance(socket) {
    try {
      // Get user from socket (attached by auth middleware)
      const user = socket.user;
      if (!user || !user.userId) {
        console.error('[GAME_EVENT_SERVICE] No valid user attached to socket');
        socket.emit('error', { message: 'Authentication required' });
        return;
      }
      
      const userId = user.userId;
      const dbService = this.getService('database');
      
      // Get the latest balance from the database
      const dbUser = await dbService.getUserById(userId);
      if (!dbUser) {
        console.error('[GAME_EVENT_SERVICE] User not found in database:', userId);
        socket.emit('error', { message: 'User not found' });
        return;
      }
      
      console.log(`[GAME_EVENT_SERVICE] Sending updated balance to user ${user.username || dbUser.username}: ${dbUser.balance}`);
      
      // Send the updated balance to the client
      socket.emit('balanceUpdate', { balance: dbUser.balance });
    } catch (error) {
      console.error('[GAME_EVENT_SERVICE] Error fetching balance:', error);
      socket.emit('error', { message: 'Failed to fetch balance' });
    }
  }
}

module.exports = new GameEventService();
