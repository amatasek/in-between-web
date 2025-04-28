const BaseService = require('./BaseService');
const { GamePhases } = require('../../../shared/constants/GamePhases');
const { gameLog } = require('../utils/logger');
const { MAX_SEATS, ANTE_AMOUNT } = require('../../../shared/constants/GameConstants'); // Import MAX_SEATS and ANTE_AMOUNT

/**
 * GameService - Orchestrates the game flow by coordinating between specialized services
 * Also handles game creation, joining, and lobby management (consolidated from LobbyService)
 */
class GameService extends BaseService {
  constructor() {
    super();
    this.games = {}; // Will be initialized in init()
  }
  
  /**
   * Initialize the service - called after all services are registered
   */
  init() {
    // Now it's safe to get services because the registry has been set
    const gameStateService = this.getService('gameState');
    this.games = gameStateService.games;
  }
  
  /**
   * Register socket event handlers for game-related events
   * @param {Socket} socket - The socket to register handlers for
   */
  registerSocketEvents(socket) {
    socket.on('createGame', () => this.handleCreateGame(socket));
    socket.on('joinGame', (data) => this.handleJoinGame(socket, data));
    socket.on('getAvailableGames', () => this.sendGameListToClient(socket));
    socket.on('getGameList', () => this.sendGameListToClient(socket)); // Support client's expected event name
    socket.on('leaveGameLobby', (data) => this.handleLeaveGame(socket, data));
  }
  
  /**
   * Send the current list of games to a specific client
   * @param {Socket} socket - The socket to send the game list to
   */
  sendGameListToClient(socket) {
    if (!socket) return;
    
    const gameList = this.getAvailableGames();
    socket.emit('gameList', gameList);
    console.log(`[GAME_SERVICE] Sent list of ${gameList.length} available games to client ${socket.id}`);
  }
  
  /**
   * Handle create game event
   * @param {Socket} socket - The socket that triggered the event
   */
  async handleCreateGame(socket) {
    console.log('[GAME_SERVICE] Received createGame event from socket:', socket.id);
    try {
      // Get user from socket (attached by auth middleware)
      const user = socket.user;
      if (!user) {
        console.error('[GAME_SERVICE] No user attached to socket');
        socket.emit('error', { message: 'Authentication required' });
        return;
      }
      
      console.log('[GAME_SERVICE] Creating game for user:', user);
      
      // Generate a random game ID
      const gameId = Math.random().toString(36).substring(2, 8).toUpperCase();

      // Get required services
      const gameStateService = this.getService('gameState');
      const playerManagementService = this.getService('playerManagement');
      const connectionService = this.getService('connection');
      const broadcastService = this.getService('broadcast');
      
      // Create game
      const game = gameStateService.createGame(gameId);
      
      // Initialize the new game
      await this.initializeGame(game);
      
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
    } catch (error) {
      console.error(`[GAME_SERVICE] Error creating game:`, error);
      socket.emit('error', { message: error.message || 'Failed to create game' });
    }
  }
  
  /**
   * Handle join game event
   * @param {Socket} socket - The socket that triggered the event
   * @param {Object} data - Event data containing gameId
   */
  async handleJoinGame(socket, data) {
    try {
      const { gameId, isReconnection } = data;
      let currentGame;
      
      const user = socket.user;
      
      if (!user) {
        console.error('[GAME_SERVICE] No user attached to socket');
        socket.emit('error', { message: 'Authentication required' });
        return;
      }
      
      if (!gameId) {
        socket.emit('error', { message: 'Game ID is required' });
        return;
      }

      // Get required services
      const gameStateService = this.getService('gameState');
      const connectionService = this.getService('connection');
      const broadcastService = this.getService('broadcast');
      
      console.log(`[GAME_SERVICE] ${isReconnection ? 'Reconnecting' : 'Joining'} game ${gameId} for user ${user.username} (${user.userId})`);
      
      // Get the game
      currentGame = gameStateService.getGame(gameId);
      if (!currentGame) {
        console.log(`[GAME_SERVICE] Game ${gameId} not found`);
        socket.emit('error', { message: 'Game not found' });
        return;
      }

      // Only check if the game is full for new connections, not reconnections
      if (!isReconnection) {
        const connectedPlayers = Object.values(currentGame.players).filter(p => p.isConnected);
        if (connectedPlayers.length >= MAX_SEATS) {
          console.log(`[GAME_SERVICE] Game ${gameId} is full (${connectedPlayers.length}/${MAX_SEATS} players)`);
          socket.emit('error', { message: 'Game is full' });
          return;
        }
      }

      // Check if player is already in the game by userId
      const existingPlayerIds = Object.keys(currentGame.players);
      const existingPlayer = existingPlayerIds.find(id => {
        return currentGame.players[id].userId === user.userId;
      });

      // Add or update player in the game
      const playerManagementService = this.getService('playerManagement');
      await playerManagementService.addPlayer(currentGame, socket.id, user.username || `Player ${socket.id.slice(0,4)}`, user.userId);
      
      // Associate socket with game
      // This will also clear any pending disconnection timeout
      connectionService.associateSocketWithGame(socket.id, gameId);
      
      // Log whether this was a new join or a reconnection
      if (existingPlayer || isReconnection) {
        console.log(`[GAME_SERVICE] Player ${user.username} (${user.userId}) reconnected to game ${gameId}`);
      } else {
        console.log(`[GAME_SERVICE] Player ${user.username} (${user.userId}) joined game ${gameId}`);
      }
      
      // Make sure the game has a valid phase before sending
      const gameState = currentGame.toJSON ? currentGame.toJSON() : currentGame;
      
      // Log the game state before sending
      console.log(`[GAME_SERVICE] Player ${isReconnection ? 'reconnected to' : 'joined'} game ${gameId}, phase: ${gameState.phase}`);
      
      // Send game state to player with proper phase
      socket.emit('gameJoined', { 
        game: gameState,
        playerId: socket.id,
        isReconnection: Boolean(existingPlayer || isReconnection)
      });
      
      // Broadcast updated game state to all players
      broadcastService.broadcastGameState(currentGame);
      
      // Update the game list for all clients in the lobby
      broadcastService.broadcastGameList();
    } catch (error) {
      console.error(`[GAME_SERVICE] Error joining game:`, error);
      console.error(`[GAME_SERVICE] Error processing game join:`, { 
        gameId: data?.gameId,
        username: socket.user?.username,
        error: error.message 
      });
      socket.emit('error', { message: 'Failed to join game' });
    }
  }
  
  /**
   * Handle leave game event
   * @param {Socket} socket - The socket that triggered the event
   * @param {Object} data - Event data
   */
  async handleLeaveGame(socket, data) { // Socket is still needed here to get userId
    try {
      const connectionService = this.getService('connection');
      const gameId = data?.gameId || connectionService.getGameIdForSocket(socket.id);
      
      if (!gameId) {
        console.log(`[GAME_SERVICE] Player ${socket.id} not in a game`);
        return;
      }
      
      // Get userId from the socket context
      const userId = socket.user?.userId;
      if (!userId) {
        console.error(`[GAME_SERVICE] Cannot handleLeaveGame: No userId found on socket ${socket.id}`);
        return;
      }
      
      await this.leaveGame(userId, gameId); // Call refactored function
      
    } catch (error) {
      console.error(`[GAME_SERVICE] Error leaving game:`, error);
    }
  }
  
  /**
   * Processes a player leaving a game (called by handleLeaveGame or cleanupDisconnectedPlayer)
   * Handles player removal, state updates, potential refunds, and game cleanup.
   * @param {String} userId - The user ID of the player leaving
   * @param {String} gameId - The game ID
   */
  async leaveGame(userId, gameId) {
    if (!userId || !gameId) {
      console.error('[GAME_SERVICE] leaveGame called with invalid userId or gameId.');
      return;
    }
    
    try {
      const connectionService = this.getService('connection');
      const gameStateService = this.getService('gameState');
      const broadcastService = this.getService('broadcast');
      const gameTransactionService = this.getService('gameTransaction');
      const playerManagementService = this.getService('playerManagement');
      
      let game = gameStateService.getGame(gameId);
      if (!game || !game.players[userId]) {
        // Player or game not found, nothing to leave
        console.log(`[GAME_SERVICE] leaveGame: Player ${userId} not found in game ${gameId}, or game doesn't exist.`);
        return;
      }
      
      // Step 1: Check if refund is needed BEFORE removing the player
      let needsRefund = false;
      const player = game.players[userId]; // Get player object using userId
      if (game.phase === GamePhases.WAITING && player?.isReady) {
        needsRefund = true;
      }
      
      // Step 2: Remove player object using PlayerManagementService with userId
      game = playerManagementService.removePlayer(game, userId); // Use userId for removal

      // Process refund if eligible
      if (needsRefund) {
        try {
          // Use the correct userId variable for the transaction
          game = await gameTransactionService.processTransaction(game, userId, ANTE_AMOUNT, 'Ante refund on leave');
          gameLog(game, `Ante refunded to ${player.name} (User ID: ${userId}) on leave`); // Use userId variable
        } catch (transactionError) {
          // Log the error, but continue - balance will be fetched next anyway
          console.error(`[GAME_SERVICE] Error processing ante refund for user ${userId}:`, transactionError); // Use userId variable
        }
      }

      // If the game becomes empty, remove it
      if (Object.keys(game.players).length === 0) {
        gameStateService.removeGame(gameId);
        gameLog(game, `Removed empty game ${gameId}`);
      } else {
        // Game still has players. Dealer reassignment is handled by PlayerManagementService.removePlayer.
        // Broadcast updated game state
        broadcastService.broadcastGameState(game);
      }

      // Always broadcast the updated list of available games
      broadcastService.broadcastGameList();
    } catch (error) {
      console.error(`[GAME_SERVICE] Error processing leave game:`, error);
    }
  }
  
  /**
   * Clean up a game if it has no players
   * @param {String} gameId - The game ID to check
   */
  cleanupGameIfEmpty(gameId) {
    const gameStateService = this.getService('gameState');
    const broadcastService = this.getService('broadcast');
    
    // Get the game
    const game = gameStateService.getGame(gameId);
    if (!game) return;
    
    // Check if the game has any connected players
    const connectedPlayers = Object.values(game.players).filter(p => p.isConnected);
    
    if (connectedPlayers.length === 0) {
      console.log(`[GAME_SERVICE] Removing empty game ${gameId}`);
      
      // Clean up the game
      this.cleanupGame(gameId);
      
      // Broadcast updated game list
      broadcastService.broadcastGameList();
    }
  }
  
  /**
   * Get the list of available games for the lobby
   * @returns {Array} List of available games
   */
  getGameList() {
    try {
      const gameStateService = this.getService('gameState');
      if (!gameStateService) {
        console.error('[GAME_SERVICE] GameStateService not available');
        return [];
      }
      
      const games = gameStateService.getAvailableGames();
      return games;
    } catch (error) {
      console.error('[GAME_SERVICE] Error getting game list:', error);
      return [];
    }
  }

  
  /**
   * Initialize a new game instance
   * This is called when creating a brand new game
   * @param {Object} game - The game object to initialize
   * @returns {Object} The initialized game
   */
  async initializeGame(game) {
    if (!game) return game;
    
    // Set initial game state
    game.round = 1; // Start with round 1 directly
    game.phase = GamePhases.WAITING;
    game.pot = 0;
    
    // Set dealer if not already set
    if (!game.dealerId && game.seats.some(seat => seat !== null)) {
      // Set the first player as dealer
      game.dealerId = game.seats.find(seat => seat !== null);
      gameLog(game, `Setting initial dealer: ${game.players[game.dealerId]?.name}`);
    }
    
    gameLog(game, `Game initialized, waiting for players to ante up`);
    return game;
  }
  
  /**
   * Start a new round within the game
   * @param {Object} game - The game object
   * @returns {Object} The updated game object
   */
  async startNewRound(game) {
    if (!game) return game;
    
    // Get required services
    const gameTimingService = this.getService('gameTiming');
    const gameStateService = this.getService('gameState');
    const playerManagementService = this.getService('playerManagement');
    
    // Clear any existing timeouts
    gameTimingService.clearGameTimeouts(game.id);
    
    // Get connected players
    const connectedPlayers = game.getConnectedPlayersInOrder();
    if (connectedPlayers.length === 0) return game;

    // Start new round - this increments the round counter FIRST
    game = gameStateService.startRound(game);
    
    // Handle player selection
    if (game.round === 1) {
      // First round: select player after dealer
      if (game.dealerId && connectedPlayers.includes(game.dealerId)) {
        const dealerIndex = connectedPlayers.indexOf(game.dealerId);
        game.currentPlayerId = connectedPlayers[(dealerIndex + 1) % connectedPlayers.length];
      } else {
        game.currentPlayerId = connectedPlayers[0];
      }
    } else {
      // Subsequent rounds: move to next player
      game = await playerManagementService.moveToNextPlayer(game);
    }
    
    // Start dealing sequence
    game = await this.startDealingSequence(game);
    
    return game;
  }

  async startDealingSequence(game) {
    if (!game) return game;
    
    // Get required services
    const gameTimingService = this.getService('gameTiming');
    const cardService = this.getService('card');
    
    // Ensure we have enough cards to deal
    if (!game.deck || game.deck.length < 3) {
      game = cardService.handleDeckRenewal(game);
    }
    
    // GameTimingService will handle all the timing and state transitions
    await gameTimingService.handleDealingSequence(game);
    
    return game;
  }

  async playerReady(game, playerId) {
    if (!game) return game;
    
    // First, clean up any duplicate players by userId to ensure accurate player counting
    const gameStateService = this.getService('gameState');
    if (gameStateService) {
      gameStateService.cleanupDuplicatePlayers(game);
    }
    
    // Get the player management service
    const playerManagementService = this.getService('playerManagement');
    
    // Mark player as ready and handle ante
    game = await playerManagementService.playerReady(game, playerId);
    
    // Count total players and ready players AFTER cleanup
    const totalPlayerCount = Object.keys(game.players).length;
    const readyPlayerCount = Object.values(game.players).filter(p => p.isReady).length;
    
    // Count unique users (to prevent the same user being counted twice after refresh)
    const uniqueUserIds = new Set();
    const uniqueReadyUserIds = new Set();
    
    Object.values(game.players).forEach(player => {
      if (player.userId) {
        uniqueUserIds.add(player.userId);
        if (player.isReady) {
          uniqueReadyUserIds.add(player.userId);
        }
      }
    });
    
    const uniqueUserCount = uniqueUserIds.size;
    
    // Check if all players are ready
    const allReady = readyPlayerCount === totalPlayerCount;

    // CRITICAL: Ensure we have at least 2 UNIQUE USERS before starting the game
    // This prevents the game from starting with only one real player
    if (uniqueUserCount < 2) {
      gameLog(game, `Cannot start game: Need at least 2 players.`);
      return game;
    }
    
    // Only start the game if all players are ready AND we have at least 2 unique users
    if (allReady && readyPlayerCount >= 2 && uniqueUserCount >= 2) {
      // Start the first round - this will select the player to the right of the dealer
      game = await this.startNewRound(game);
    }
    
    return game;
  }
  
  /**
   * Handle player's decision on a second chance opportunity
   * @param {Object} game - The game object
   * @param {String} playerId - The player's ID
   * @param {Boolean} anteAgain - Whether the player chose to ante up again
   * @returns {Object} The updated game object
   */
  async handleSecondChance(game, playerId, anteAgain) {
    if (!game) return game;
    
    // Verify it's the player's turn
    if (game.currentPlayerId !== playerId) {
      gameLog(game, `Not ${game.players[playerId]?.name}'s turn to make a second chance decision`);
      return game;
    }
    
    // Reset the waiting flag
    game.waitingForSecondChance = false;
    
    if (anteAgain) {
      // Player chose to ante up again
      const player = game.players[playerId];
      const anteAmount = game.anteAmount || 1; // Default to 1 if not specified
      
      // Process the ante-up-again transaction through the central transaction service
      const gameTransactionService = this.getService('gameTransaction');
      try {
        // Update player balance and record transaction
        // The pot will be updated automatically by the transaction service
        game = await gameTransactionService.processTransaction(
          game, 
          playerId, 
          -anteAmount, 
          `Ante up again in round ${game.round}`
        );

        // Reset cards and start a new dealing sequence
        game.firstCard = null;
        game.secondCard = null;
        game.thirdCard = null;
        
        // Return to the dealing phase (it's already in the dealing phase)
        return game;
      } catch (error) {
        // If player doesn't have enough coins, treat it as a pass
        gameLog(game, `${player.name} doesn't have enough coins to ante up again, treating as pass: ${error.message}`);
        return await this.placeBet(game, playerId, 0);
      }
    } else {
      // Player chose to pass
      const player = game.players[playerId];

      // Reset the waiting flag
      game.waitingForSecondChance = false;
      
      // First move to betting phase so placeBet will work correctly
      game.phase = GamePhases.BETTING;
      
      // Now call placeBet with amount=0 to handle the pass
      return await this.placeBet(game, playerId, 0);
    }
  }

  async placeBet(game, playerId, amount) {
    if (!game) return game;
    
    // Place the bet using betting service
    const bettingService = this.getService('betting');
    let updatedGame = await bettingService.placeBet(game, playerId, amount);
    
    // If player passed (amount is 0), handle the phase transition
    if (amount === 0) {
      // Get the next active player (only considering players who have anted up)
      const playerManagementService = this.getService('playerManagement');
      const nextPlayerId = playerManagementService.getNextActivePlayer(updatedGame, playerId);
      
      if (!nextPlayerId) {
        // If no eligible players, process the game outcome directly
        // This avoids duplicate calls to handleResultsSequence
        return await this.processGameOutcome(updatedGame);
      }
      
      // Set the next player and reset cards
      updatedGame.currentPlayerId = nextPlayerId;
      updatedGame.firstCard = updatedGame.secondCard = updatedGame.thirdCard = null;
      updatedGame.phase = GamePhases.DEALING;
      
      // Start dealing sequence for the next player
      updatedGame = await this.startDealingSequence(updatedGame);
    }
    // If player placed a bet, move to revealing phase
    else if (amount > 0) {
      updatedGame.phase = GamePhases.REVEALING;
      const gameTimingService = this.getService('gameTiming');
      await gameTimingService.handleRevealingSequence(updatedGame);
    }
    
    return updatedGame;
  }

  async processGameOutcome(game) {
    if (!game) return game;
    
    // Move to results phase
    game.phase = GamePhases.RESULTS;
    
    const player = game.players[game.currentPlayerId];
    if (!player) return game;
    
    const { firstCard, secondCard, thirdCard } = game;
    if (!firstCard || !secondCard || !thirdCard) {
      gameLog(game, 'Missing cards for outcome determination');
      return game;
    }
    
    // Get the card service from the registry
    const cardService = this.getService('card');
    
    // Determine outcome
    const isWin = cardService.isCardBetween(firstCard, thirdCard, secondCard);
    const isTie = cardService.isCardTie(firstCard, thirdCard, secondCard);
    const isTripleAceTie = cardService.isTripleAceTie(firstCard, secondCard, thirdCard);
    
    try {
      let winnings = 0;
      const gameTransactionService = this.getService('gameTransaction');
      
      if (isWin) {
        // Regular win (1:1)
        winnings = player.currentBet * 2;
        
        try {
          // Process winning transaction through the central transaction service
          // The pot is automatically updated by the transaction service
          game = await gameTransactionService.processTransaction(
            game, 
            game.currentPlayerId, // Use the currentPlayerId directly instead of player.id
            winnings, 
            `Won bet in round ${game.round}`
          );
          
          gameLog(game, `${player.name} wins ${winnings} coins`);
        } catch (error) {
          gameLog(game, `Error processing win for ${player.name}: ${error.message}`);
        }
      } else if (isTripleAceTie) {
        // Triple Ace Tie - 3x penalty
        winnings = -player.currentBet * 3;
        
        // Calculate additional penalty (original bet is already processed)
        const additionalPenalty = player.currentBet * 2;
        
        try {
          // Process penalty transaction through the central transaction service
          // The pot is automatically updated by the transaction service
          game = await gameTransactionService.processTransaction(
            game, 
            game.currentPlayerId, // Use the currentPlayerId directly instead of player.id
            -additionalPenalty, 
            `Triple Ace penalty in round ${game.round}`
          );
          
          gameLog(game, `Triple Ace! ${player.name} pays 3x penalty (${player.currentBet * 3} coins)`);
        } catch (error) {
          gameLog(game, `Error collecting triple ace penalty from ${player.name}: ${error.message}`);
        }
      } else if (isTie) {
        // Regular tie - 2x penalty
        winnings = -player.currentBet * 2;
        
        // Calculate additional penalty (original bet is already processed)
        const additionalPenalty = player.currentBet;
        
        try {
          // Process penalty transaction through the central transaction service
          // The pot is automatically updated by the transaction service
          game = await gameTransactionService.processTransaction(
            game, 
            game.currentPlayerId, // Use the currentPlayerId directly instead of player.id
            -additionalPenalty, 
            `Tie penalty in round ${game.round}`
          );
          
          gameLog(game, `Tie! ${player.name} pays 2x penalty (${player.currentBet * 2} coins)`);
        } catch (error) {
          gameLog(game, `Error collecting tie penalty from ${player.name}: ${error.message}`);
        }
      } else if (!isTie && !isTripleAceTie) {
        // Regular loss - bet is already deducted when placing the bet
        gameLog(game, `${player.name} loses ${player.currentBet} coins`);
        
        // We already recorded the transaction when the bet was placed, no need to record again
      }
      
      // Store result
      game.result = {
        playerId: game.currentPlayerId, // Use the currentPlayerId directly instead of player.id
        outcome: isWin ? 'win' : (isTie || isTripleAceTie) ? 'tie' : 'lose',
        winnings,
        isTripleAceTie: isTripleAceTie // Flag to indicate a triple ace tie for special handling
      };
      
      // Reset bet
      player.resetBet();
      
      // Get the game timing service from the registry
      const gameTimingService = this.getService('gameTiming');
      
      // GameTimingService will handle all the timing and state transitions
      await gameTimingService.handleResultsSequence(game);
      
      return game;
    } catch (error) {
      gameLog(game, `Error processing outcome: ${error.message}`);
      return game;
    }
  }

  /**
   * Handle the transition after a round completes
   * Either starts a new round or transitions to waiting phase if pot is empty
   * @param {Object} game - The game object
   * @returns {Object} The updated game object
   */
  async handleRoundCompletion(game) {
    if (!game) return game;
    
    // Get required services
    const broadcastService = this.getService('broadcast');
    const databaseService = this.getService('database');
    
    // Check if the pot is empty before proceeding
    if (game.pot === 0) {
      // If pot is empty, transition to waiting phase
      game.phase = GamePhases.WAITING;
      
      // Reset all player ready states
      Object.values(game.players).forEach(player => {
        player.isReady = false;
        player.hasAnted = false;
      });
      
      // Clear all cards from the game state
      game.firstCard = null;
      game.secondCard = null;
      game.thirdCard = null;
      game.result = null;
      
      // Increment the round counter when the pot is empty
      // This is the true definition of a new "round" in the game
      game.round += 1;
      
      gameLog(game, `Pot is empty. Waiting for players to ante up for round ${game.round}`);

      // --- Concise Auto-ante if pot is zero --- 
      const playerIds = Object.keys(game.players).filter(id => game.players[id]?.isConnected && !game.players[id].isReady);
      if (playerIds.length > 0) {
        const prefs = await databaseService.getPreferencesForUsers(playerIds);
        for (const userId of playerIds) { // Loop required for sequential awaiting
           if (prefs[userId]?.autoAnte) game = await this.playerReady(game, userId); // Use GameService.playerReady
        }
      }
      // --- End Auto-ante --- 

      // Broadcast the current game state
      broadcastService.broadcastGameState(game);
      
      // Return early to prevent starting a new round
      return game;
    }
    
    // For continuing the game with the next round
    gameLog(game, `Starting next round`);
    
    // Start a new round
    game = await this.startNewRound(game);
    
    // Broadcast the updated game state
    broadcastService.broadcastGameState(game);
    
    return game;
  }

  getGame(gameId) {
    const gameStateService = this.getService('gameState');
    return gameStateService.getGame(gameId);
  }

  getAvailableGames() {
    const gameStateService = this.getService('gameState');
    return gameStateService.getAvailableGames();
  }

  cleanupGame(gameId) {
    const gameTimingService = this.getService('gameTiming');
    const gameStateService = this.getService('gameState');
    gameTimingService.clearGameTimeouts(gameId);
    gameStateService.removeGame(gameId);
  }
  
  /**
   * Clean up inactive games that haven't been updated in a while
   * Called periodically by the server to prevent memory leaks
   */
  cleanupGames() {
    const now = Date.now();
    const INACTIVE_THRESHOLD = 3 * 60 * 60 * 1000; // 3 hours
    
    try {
      const gameIds = Object.keys(this.games);
      let cleanedCount = 0;
      
      gameIds.forEach(gameId => {
        const game = this.games[gameId];
        
        // Check if game is inactive (hasn't been updated in a while)
        if (game && game.lastUpdated && (now - game.lastUpdated > INACTIVE_THRESHOLD)) {
          console.log(`[CLEANUP] Removing inactive game ${gameId} (last active ${Math.floor((now - game.lastUpdated) / 60000)} minutes ago)`);
          this.cleanupGame(gameId);
          cleanedCount++;
        }
      });
      
      console.log(`[CLEANUP] Removed ${cleanedCount} inactive games`);
    } catch (error) {
      console.error(`[CLEANUP] Error cleaning up games: ${error.message}`);
    }
  }
}

module.exports = new GameService();
