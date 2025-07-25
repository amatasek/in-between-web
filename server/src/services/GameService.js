const BaseService = require('./BaseService');
const { GamePhases } = require('../../../shared/constants/GamePhases');
const { gameLog } = require('../utils/logger');
const { MAX_SEATS, ANTE_AMOUNT } = require('../../../shared/constants/GameConstants');
const Settings = require('../models/Settings');

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
    socket.on('createGame', (data) => this.handleCreateGame(socket, data));
    socket.on('joinGame', (data) => this.handleJoinGame(socket, data));
    socket.on('leaveGame', (data) => this.handleLeaveGame(socket, data));
  }
  
  /**
   * Handle create game event
   * @param {Socket} socket - The socket that triggered the event
   */
  async handleCreateGame(socket, data = {}) {
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

      // Get required services
      const gameStateService = this.getService('gameState');
      const playerManagementService = this.getService('playerManagement');
      const connectionService = this.getService('connection');
      const broadcastService = this.getService('broadcast');
      
      // Create game with custom settings if provided
      const game = await gameStateService.createGame(new Settings(data.settings || {}));
      
      // Add player to game
      await playerManagementService.addPlayer(game, socket.id, user.username, user.userId);
      
      // Associate socket with game
      connectionService.associateSocketWithGame(socket.id, game.id);
      
      // Send game state to player
      socket.emit('gameCreated', { 
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
      const playerManagementService = this.getService('playerManagement');
      const connectionService = this.getService('connection');
      const broadcastService = this.getService('broadcast');
      const gameTimingService = this.getService('gameTiming'); // Get timing service
      
      console.log(`[GAME_SERVICE] ${isReconnection ? 'Reconnecting' : 'Joining'} game ${gameId} for user ${user.username} (${user.userId})`);
      
      let game = await gameStateService.getGame(gameId);
      
      if (!game) {
        console.log(`[GAME_SERVICE] Game ${gameId} not found`);
        socket.emit('error', { message: 'Game not found' });
        return;
      }

      // Check if player is already in the game by userId
      const existingPlayerIds = Object.keys(game.players);
      const existingPlayer = existingPlayerIds.find(id => {
        return game.players[id].userId === user.userId;
      });

      // Check password if required and it's not a reconnection
      if (!existingPlayer && game.settings?.isPrivate) {
        // Check if password was provided in the payload
        if (!data.password) {
          // Password required but not provided by client
          console.log(`[GAME_SERVICE] Password required for game ${gameId}, user ${user.username}`);
          socket.emit('error', { message: 'Password required' }); // Specific message
          return;
        }
        // Password was provided, now check if it's correct
        if (game.settings.password !== data.password) {
          console.log(`[GAME_SERVICE] Invalid password attempt for game ${gameId}`);
          socket.emit('error', { message: 'Invalid password' }); // Existing error
          return;
        }
      }

      // Only check if the game is full for new connections, not reconnections
      if (!isReconnection) {
        const connectedPlayers = Object.values(game.players).filter(p => p.isConnected);
        if (connectedPlayers.length >= MAX_SEATS) {
          console.log(`[GAME_SERVICE] Game ${gameId} is full (${connectedPlayers.length}/${MAX_SEATS} players)`);
          socket.emit('error', { message: 'Game is full' });
          return;
        }
      }

      // Add or update player in the game
      game = await playerManagementService.addPlayer(game, socket.id, user.username, user.userId);
      
      // Associate socket with game
      // This will also clear any pending disconnection timeout
      connectionService.associateSocketWithGame(socket.id, gameId);
      
      // Log whether this was a new join or a reconnection
      if (existingPlayer || isReconnection) {
        console.log(`[GAME_SERVICE] Player ${user.username} (${user.userId}) reconnected to game ${gameId}`);
      } else {
        console.log(`[GAME_SERVICE] Player ${user.username} (${user.userId}) joined game ${gameId}`);
      }
      
      // Log the game state before sending
      console.log(`[GAME_SERVICE] Player ${isReconnection ? 'reconnected to' : 'joined'} game ${gameId}`);
      
      // Send game state to player with proper phase
      socket.emit('gameJoined', { 
        game: game.toJSON(),
        playerId: socket.id,
        isReconnection: Boolean(existingPlayer || isReconnection)
      });

      // If player joined/reconnected and game is in WAITING, check for auto-ante
      // Make sure player exists and isn't already sitting out
      const player = game.players[user.userId];
      if (game.phase === GamePhases.WAITING && player && !player.isSittingOut) {
        // Check if player has auto-ante enabled and apply it if so
        if (!player.isReady) {
          const databaseService = this.getService('database');
          const userPrefs = await databaseService.getPreferences(user.userId);
          if (userPrefs?.autoAnte) {
            console.log(`[GAME_SERVICE] Auto-ante enabled for ${user.username}, applying ante automatically`);
            game = await this.playerReady(game, user.userId);
          } else {
            // Only start inactivity timer if player didn't auto-ante
            await gameTimingService.startPlayerInactivityTimer(game, user.userId);
          }
        }
      }
      
      // Broadcast updated game state to all players
      broadcastService.broadcastGameState(game);
      
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
      const gameStateService = this.getService('gameState');
      const broadcastService = this.getService('broadcast');
      const gameTransactionService = this.getService('gameTransaction');
      const playerManagementService = this.getService('playerManagement');
      
      let game = await gameStateService.getGame(gameId);
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
        await gameStateService.removeGame(gameId);
        gameLog(game, `Removed empty game ${gameId}`);
      } else {
        // Game still has players. Dealer reassignment is handled by PlayerManagementService.removePlayer.
        broadcastService.broadcastGameState(game);
      }

      // Always broadcast updated game list after game state changes
      broadcastService.broadcastGameList();
    } catch (error) {
      console.error(`[GAME_SERVICE] Error processing leave game:`, error);
    }
  }
  
  /**
   * Clean up a game if it has no players
   * @param {String} gameId - The game ID to check
   */
  async cleanupGameIfEmpty(gameId) {
    const gameStateService = this.getService('gameState');
    const broadcastService = this.getService('broadcast');
    
    const game = await gameStateService.getGame(gameId);
    
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
   * Start a new round within the game
   * @param {Object} game - The game object
   * @returns {Object} The updated game object
   */
  async startRound(game) {
    if (!game) return game;

    // All players must EITHER be ready (anted) OR sitting out to start the round
    const totalPlayerCount = Object.keys(game.players).length;
    const readyPlayerCount = Object.values(game.players).filter(p => p.isReady).length;
    const sittingOutCount = Object.values(game.players).filter(p => p.isSittingOut).length;
    
    const allAccountedFor = readyPlayerCount + sittingOutCount === totalPlayerCount;

    // Need at least 2 players who have anted up to start a round
    if (!allAccountedFor || readyPlayerCount < 2) {
      return game;
    }

    gameLog(game, `All players ready, starting round ${game.round}`);
    
    // Capture players who anted for this round BEFORE phase changes
    game.antedPlayersForRound = game.seats
      .filter(playerId => {
        const player = game.players[playerId];
        return playerId !== null && player && player.isReady;
      })
      .map(userId => {
        const seatIndex = game.seats.indexOf(userId);
        return {
          userId,
          seatIndex,
          name: game.players[userId]?.name || 'Unknown'
        };
      });
    
    console.log(`[GAME_SERVICE] Captured ${game.antedPlayersForRound.length} players for round ${game.round}:`, 
      game.antedPlayersForRound.map(p => `${p.name} (seat ${p.seatIndex})`));
    
    return await this.dealNextPlayer(game);
  }

  async dealNextPlayer(game) {
    if (!game) return game;

    // Get required services
    const gameTimingService = this.getService('gameTiming');
    const gameStateService = this.getService('gameState');
    const playerManagementService = this.getService('playerManagement');
    
    // Clear any existing timeouts
    gameTimingService.clearGameTimeouts(game.id);
    
    // Move to next player
    await playerManagementService.moveToNextPlayer(game);

    // Prepare for deal
    game = gameStateService.prepareForDeal(game);
    
    // Start dealing sequence
    game = await gameTimingService.handleDealingSequence(game);
    
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
    
    // Start round
    game = await this.startRound(game);
    
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
    
    const bettingService = this.getService('betting');
    const gameTimingService = this.getService('gameTiming');

    // Place the bet using betting service
    game = await bettingService.placeBet(game, playerId, amount);
    
    // If player passed (amount is 0), handle the phase transition
    if (amount === 0) {
      // Get the next anted player in rotation
      const nextPlayerId = game.getNextPlayerInOrder(playerId);
      
      if (!nextPlayerId) {
        // If no eligible players, process the game outcome directly
        // This avoids duplicate calls to handleResultsSequence
        return await this.processGameOutcome(game);
      }
      
      // Set the next player and reset cards
      game.currentPlayerId = nextPlayerId;
      game.firstCard = game.secondCard = game.thirdCard = null;
      game.phase = GamePhases.DEALING;
      
      // Start dealing sequence for the next player
      game = await gameTimingService.handleDealingSequence(game);
    }
    // If player placed a bet, move to revealing phase
    else if (amount > 0) {
      game.phase = GamePhases.REVEALING;
      const gameTimingService = this.getService('gameTiming');
      await gameTimingService.handleRevealingSequence(game);
    }
    
    return game;
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
          
          gameLog(game, `${player.name} wins ${winnings / 2} coins`);
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
            `3x Penalty (Triple Ace) in round ${game.round}`
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
            `2x Penalty (Tie) in round ${game.round}`
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
      
      // Store result (capture bet amount before reset)
      game.result = {
        playerId: game.currentPlayerId, // Use the currentPlayerId directly instead of player.id
        outcome: isWin ? 'win' : (isTie || isTripleAceTie) ? 'tie' : 'lose',
        winnings,
        betAmount: player.currentBet, // Store the bet amount for display
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
    const gameTimingService = this.getService('gameTiming');
    
    // Check if the pot is empty before proceeding
    if (game.pot === 0) {
      // If pot is empty, transition to waiting phase
      game.phase = GamePhases.WAITING;
      
      // Reset all player ready states
      Object.values(game.players).forEach(player => {
        player.isReady = false;
      });
      
      // Clear the round-specific ante tracking
      game.antedPlayersForRound = [];
      
      // Clear all cards from the game state
      game.firstCard = null;
      game.secondCard = null;
      game.thirdCard = null;
      game.result = null;
      
      // Increment the round counter when the pot is empty
      // This is the true definition of a new "round" in the game
      game.round += 1;
      
      // Clean up any disconnected players who didn't reconnect during the round
      this.removeDisconnectedPlayers(game);
      
      gameLog(game, `Pot is empty. Waiting for players to ante up for round ${game.round}`);

      // --- Concise Auto-ante if pot is zero --- 
      const playerIds = Object.keys(game.players).filter(id => game.players[id]?.isConnected && !game.players[id].isReady && !game.players[id].isSittingOut);
      if (playerIds.length > 0) {
        const prefs = await databaseService.getPreferencesForUsers(playerIds);
        for (const userId of playerIds) { // Loop required for sequential awaiting
           if (prefs[userId]?.autoAnte) game = await this.playerReady(game, userId); // Use GameService.playerReady
        }
      }
      // --- End Auto-ante --- 

      // --- Start inactivity timers for players who did not auto-ante ---
      const playerEntriesToStartTimerFor = Object.entries(game.players).filter(
        ([userId, player]) => player.isConnected && !player.isSittingOut && !player.isReady
      );

      for (const [userId, player] of playerEntriesToStartTimerFor) {
        // userId is the key from game.players and is guaranteed to be defined here
        gameTimingService.startPlayerInactivityTimer(game, userId); // Pass the userId (key)
      }
      // --- End inactivity timers ---

      // Broadcast the current game state
      broadcastService.broadcastGameState(game);
      // gameStateService.saveGame will be called at the end of the function
    } else {
      // Pot is not empty, deal to next player
      game = await this.dealNextPlayer(game);
      // Broadcast the updated game state after resuming/starting round
      broadcastService.broadcastGameState(game);
    }
    
    // Always save the game state after all operations and broadcasts
    const gameStateService = this.getService('gameState');
    await gameStateService.saveGame(game);
    
    return game;
  }

  /**
   * Clean up a stuck game with pot refunds
   * @param {Object} game - The stuck game object
   */
  async cleanupStuckGame(game) {
    if (!game) return;
    
    try {
      console.log(`[CLEANUP] Cleaning up stuck game ${game.id} with ${game.pot} coins in pot`);
      
      // Refund pot to players if there's money to distribute
      if (game.pot > 0) {
        await this.refundPotToPlayers(game);
      }
      
      // Standard cleanup
      this.cleanupGame(game.id);
      
    } catch (error) {
      console.error(`[CLEANUP] Error cleaning up stuck game ${game.id}:`, error);
      // Still try standard cleanup even if refund fails
      this.cleanupGame(game.id);
    }
  }

  /**
   * Refund pot money to players in a reasonable way
   * @param {Object} game - The game object
   */
  async refundPotToPlayers(game) {
    if (!game.pot || game.pot <= 0) return;
    
    const gameTransactionService = this.getService('gameTransaction');
    const connectedPlayers = Object.values(game.players).filter(p => p.isConnected);
    
    if (connectedPlayers.length === 0) {
      console.log(`[CLEANUP] No connected players to refund pot of ${game.pot} coins`);
      return;
    }
    
    // Split pot evenly among connected players
    const refundPerPlayer = Math.floor(game.pot / connectedPlayers.length);
    const remainder = game.pot % connectedPlayers.length;
    
    console.log(`[CLEANUP] Refunding ${refundPerPlayer} coins to ${connectedPlayers.length} players (${remainder} coins remainder)`);
    
    for (let i = 0; i < connectedPlayers.length; i++) {
      const player = connectedPlayers[i];
      let refundAmount = refundPerPlayer;
      
      // Give remainder to first player(s)
      if (i < remainder) {
        refundAmount += 1;
      }
      
      if (refundAmount > 0) {
        try {
          await gameTransactionService.processTransaction(
            game,
            player.userId,
            refundAmount,
            `Stuck game cleanup refund`
          );
          console.log(`[CLEANUP] Refunded ${refundAmount} coins to ${player.name}`);
        } catch (error) {
          console.error(`[CLEANUP] Failed to refund ${refundAmount} coins to ${player.name}:`, error);
        }
      }
    }
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
    const STUCK_GAME_THRESHOLD = 5 * 60 * 1000; // 5 minutes for stuck games
    const INACTIVE_THRESHOLD = 60 * 60 * 1000; // 1 hour for general cleanup
    
    try {
      const gameIds = Object.keys(this.games);
      let cleanedCount = 0;
      let stuckCount = 0;
      
      gameIds.forEach(gameId => {
        const game = this.games[gameId];
        if (!game || !game.lastUpdated) return;
        
        const minutesInactive = Math.floor((now - game.lastUpdated) / 60000);
        
        // Check for stuck games (not in WAITING phase and inactive for 5+ minutes)
        if (game.phase !== GamePhases.WAITING && (now - game.lastUpdated > STUCK_GAME_THRESHOLD)) {
          console.log(`[CLEANUP] Found stuck game ${gameId} in phase ${game.phase} (inactive ${minutesInactive} minutes)`);
          this.cleanupStuckGame(game);
          stuckCount++;
          cleanedCount++;
        }
        // Check for generally inactive games (3+ hours)
        else if (now - game.lastUpdated > INACTIVE_THRESHOLD) {
          console.log(`[CLEANUP] Removing inactive game ${gameId} (last active ${minutesInactive} minutes ago)`);
          this.cleanupGame(gameId);
          cleanedCount++;
        }
      });
      
      console.log(`[CLEANUP] Cleaned up ${cleanedCount} games (${stuckCount} stuck, ${cleanedCount - stuckCount} inactive)`);
    } catch (error) {
      console.error(`[CLEANUP] Error cleaning up games: ${error.message}`);
    }
  }

  /**
   * Remove disconnected players who didn't reconnect during the round
   * @param {Object} game - The game object
   */
  removeDisconnectedPlayers(game) {
    if (!game || !game.players) return;
    
    const playersToRemove = [];
    
    // Find disconnected players
    Object.keys(game.players).forEach(userId => {
      const player = game.players[userId];
      if (player && player.disconnected && !player.isConnected) {
        playersToRemove.push(userId);
      }
    });
    
    if (playersToRemove.length > 0) {
      console.log(`[GAME_SERVICE] Removing ${playersToRemove.length} disconnected players at round end`);
      
      const playerManagementService = this.getService('playerManagement');
      playersToRemove.forEach(userId => {
        const playerName = game.players[userId]?.name || 'Unknown';
        console.log(`[GAME_SERVICE] Removing disconnected player ${playerName} (${userId})`);
        game = playerManagementService.removePlayer(game, userId);
      });
    }
  }
}

module.exports = new GameService();
