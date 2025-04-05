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
  }
  
  /**
   * Handle ready event (player paid ante)
   * @param {Socket} socket - The socket that triggered the event
   */
  async handleReady(socket) {
    try {
      const connectionService = this.getService('connection');
      const gameService = this.getService('game');
      const gameStateService = this.getService('gameState');
      const broadcastService = this.getService('broadcast');
      
      const gameId = connectionService.getGameIdForSocket(socket.id);
      if (!gameId) return;

      let game = gameStateService.getGame(gameId);
      if (!game) return;

      // Mark player as ready
      game = await gameService.playerReady(game, socket.id);
      
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
      const connectionService = this.getService('connection');
      const gameStateService = this.getService('gameState');
      const broadcastService = this.getService('broadcast');
      const playerManagementService = this.getService('playerManagement');
      
      const gameId = connectionService.getGameIdForSocket(socket.id);
      if (!gameId) return;

      let game = gameStateService.getGame(gameId);
      if (!game) return;

      // Mark player as unready and return their ante
      game = await playerManagementService.playerUnready(game, socket.id);
      
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
      const { amount } = data;
      const connectionService = this.getService('connection');
      const gameService = this.getService('game');
      const gameStateService = this.getService('gameState');
      const broadcastService = this.getService('broadcast');
      
      const gameId = connectionService.getGameIdForSocket(socket.id);
      if (!gameId) return;

      const game = gameStateService.getGame(gameId);
      if (!game) return;

      // Validate it's the player's turn
      if (!game.isPlayersTurn(socket.id)) {
        socket.emit('error', { message: 'Not your turn to bet' });
        return;
      }

      // Place the bet - GameService will handle all phase transitions and timers
      const updatedGame = await gameService.placeBet(game, socket.id, amount);
      
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
      
      const connectionService = this.getService('connection');
      const gameService = this.getService('game');
      const gameStateService = this.getService('gameState');
      const gameTimingService = this.getService('gameTiming');
      const cardService = this.getService('card');
      const broadcastService = this.getService('broadcast');
      
      // Get the game the player is in
      const gameId = connectionService.getGameIdForSocket(socket.id);
      if (!gameId) {
        console.error('[GAME_EVENT_SERVICE] Player not in a game');
        socket.emit('error', { message: 'You are not in a game' });
        return;
      }
      
      // Get the game
      const game = gameStateService.getGame(gameId);
      if (!game) {
        console.error('[GAME_EVENT_SERVICE] Game not found:', gameId);
        socket.emit('error', { message: 'Game not found' });
        return;
      }
      
      // Validate that it's the player's turn
      if (game.currentPlayerId !== socket.id) {
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
      
      // If player chose to ante up again
      if (anteAgain) {
        // Handle the player's decision to ante up again
        const updatedGame = await gameService.handleSecondChance(game, socket.id, true);
        
        if (updatedGame.firstCard === null) {
          gameLog(updatedGame, `${user.username} antes up for a second chance`);
          
          // Use GameTimingService to continue the dealing sequence
          await gameTimingService.handleDealingSequence(updatedGame);
        }
      } else {
        // Player chose to pass - this will reset the game state for the next player
        gameLog(game, `${user.username} passes after matching pair`);
        
        // Handle the player's decision to pass
        await gameService.handleSecondChance(game, socket.id, false);
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
      
      const connectionService = this.getService('connection');
      const gameService = this.getService('game');
      const gameStateService = this.getService('gameState');
      const gameTimingService = this.getService('gameTiming');
      const broadcastService = this.getService('broadcast');
      
      // Get the game the player is in
      const gameId = connectionService.getGameIdForSocket(socket.id);
      if (!gameId) {
        console.error('[GAME_EVENT_SERVICE] Player not in a game');
        socket.emit('error', { message: 'You are not in a game' });
        return;
      }
      
      // Get the game
      const game = gameStateService.getGame(gameId);
      if (!game) {
        console.error('[GAME_EVENT_SERVICE] Game not found:', gameId);
        socket.emit('error', { message: 'Game not found' });
        return;
      }
      
      // Validate that it's the player's turn
      if (game.currentPlayerId !== socket.id) {
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
      
      // Update the card
      game.firstCard.isAceLow = isAceLow;
      game.waitingForAceDecision = false;
      
      gameLog(game, `${user.username} chooses Ace as ${isAceLow ? 'LOW' : 'HIGH'}`);
      
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
      
      const dbService = this.getService('database');
      
      // Get the latest balance from the database
      const dbUser = await dbService.getUserById(user.userId);
      if (!dbUser) {
        console.error('[GAME_EVENT_SERVICE] User not found in database:', user.userId);
        socket.emit('error', { message: 'User not found' });
        return;
      }
      
      console.log(`[GAME_EVENT_SERVICE] Sending updated balance to user ${user.username}: ${dbUser.balance}`);
      
      // Send the updated balance to the client
      socket.emit('balanceUpdate', { balance: dbUser.balance });
    } catch (error) {
      console.error('[GAME_EVENT_SERVICE] Error fetching balance:', error);
      socket.emit('error', { message: 'Failed to fetch balance' });
    }
  }
}

module.exports = new GameEventService();
