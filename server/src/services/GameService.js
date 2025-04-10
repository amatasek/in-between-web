const BaseService = require('./BaseService');
const { gameLog } = require('../utils/logger');
const { GamePhases } = require('../../../shared/constants/GamePhases');

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
    socket.on('getAvailableGames', () => this.handleGetAvailableGames(socket));
    socket.on('getGameList', () => this.handleGetAvailableGames(socket)); // Support client's expected event name
    socket.on('leaveGameLobby', (data) => this.handleLeaveGame(socket, data));
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
        if (connectedPlayers.length >= 6) {
          console.log(`[GAME_SERVICE] Game ${gameId} is full (${connectedPlayers.length}/6 players)`);
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
      
      // Send updated balance to the user
      if (user.userId) {
        const balanceService = this.getService('balance');
        if (balanceService) {
          try {
            const balance = await balanceService.getBalance(user.userId);
            console.log(`[GAME_SERVICE] Sending updated balance to user ${user.username}: ${balance}`);
            socket.emit('balanceUpdated', { balance });
          } catch (error) {
            console.error(`[GAME_SERVICE] Error getting balance for user ${user.username}:`, error);
          }
        }
      }
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
   * Handle get available games event
   * @param {Socket} socket - The socket that triggered the event
   */
  handleGetAvailableGames(socket) {
    this.sendGameListToClient(socket);
  }
  
  /**
   * Handle leave game event
   * @param {Socket} socket - The socket that triggered the event
   * @param {Object} data - Event data
   */
  async handleLeaveGame(socket, data) {
    try {
      const connectionService = this.getService('connection');
      const gameId = data?.gameId || connectionService.getGameIdForSocket(socket.id);
      
      if (!gameId) {
        console.log(`[GAME_SERVICE] Player ${socket.id} not in a game`);
        return;
      }
      
      await this.leaveGame(socket, gameId);
    } catch (error) {
      console.error(`[GAME_SERVICE] Error leaving game:`, error);
    }
  }
  
  /**
   * Process a player leaving a game
   * @param {Socket} socket - The player's socket
   * @param {String} gameId - The game ID
   */
  async leaveGame(socket, gameId) {
    try {
      const connectionService = this.getService('connection');
      const gameStateService = this.getService('gameState');
      const broadcastService = this.getService('broadcast');
      
      // Get the game
      let game = gameStateService.getGame(gameId);
      if (!game) {
        console.log(`[GAME_SERVICE] Game ${gameId} not found when leaving`);
        return;
      }
      
      // Get the player ID - use userId from socket.user if available
      let playerId = null;
      
      if (socket.user && socket.user.userId) {
        // First try to find the player by userId
        const userId = socket.user.userId;
        for (const id in game.players) {
          if (game.players[id].userId === userId) {
            playerId = id;
            break;
          }
        }
      }
      
      // Fall back to socket.id if we couldn't find by userId
      if (!playerId) {
        playerId = socket.id;
      }
      
      console.log(`[GAME_SERVICE] Removing player ${playerId} from game ${gameId}`);
      
      // Remove the player from the game (safely, returning ante if needed)
      game = await this.safeRemovePlayer(game, playerId);
      
      // Remove socket from game room
      connectionService.disassociateSocketFromGame(socket.id);
      
      // Send updated game state to all players
      broadcastService.broadcastGameState(game);
      
      // Clean up the game if it's empty
      this.cleanupGameIfEmpty(gameId);
      
      // Update game list for all clients
      broadcastService.broadcastGameList();
      
      console.log(`[GAME_SERVICE] Player ${playerId} left game ${gameId}`);
      
      // Send updated balance to the user
      if (socket.user && socket.user.userId) {
        const balanceService = this.getService('balance');
        if (balanceService) {
          try {
            const balance = await balanceService.getBalance(socket.user.userId);
            console.log(`[GAME_SERVICE] Sending updated balance to user ${socket.user.username}: ${balance}`);
            socket.emit('balanceUpdated', { balance });
          } catch (error) {
            console.error(`[GAME_SERVICE] Error getting balance for user ${socket.user.username}:`, error);
          }
        }
      }
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
      console.log(`[GAME_SERVICE] Returning ${games.length} available games`);
      return games;
    } catch (error) {
      console.error('[GAME_SERVICE] Error getting game list:', error);
      return [];
    }
  }

  // Pass-through methods removed to reduce unnecessary abstraction layers
  
  /**
   * Safely remove a player from the game, returning their ante if appropriate
   * @param {Object} game - The game object
   * @param {String} playerId - The player's ID
   * @returns {Object} The updated game object
   */
  async safeRemovePlayer(game, playerId) {
    if (!game || !game.players[playerId]) return game;
    
    // Check if player is anted up and game is in waiting phase
    if (game.phase === 'waiting' && game.players[playerId]?.isReady) {
      // Withdraw the player's ante before removing them
      gameLog(game, `Player ${game.players[playerId]?.name} is anted up, returning ante before leaving`);
      try {
        const playerManagementService = this.getService('playerManagement');
        game = await playerManagementService.playerUnready(game, playerId);
      } catch (error) {
        gameLog(game, `Error returning ante: ${error.message}`);
      }
    }
    
    // Remove player from game
    const playerManagementService = this.getService('playerManagement');
    return playerManagementService.removePlayer(game, playerId);
  }

  async startRound(game) {
    if (!game) return game;
    
    // Get required services
    const gameTimingService = this.getService('gameTiming');
    const gameStateService = this.getService('gameState');
    const cardService = this.getService('card');
    const playerManagementService = this.getService('playerManagement');
    
    // Clear any existing timeouts
    gameTimingService.clearGameTimeouts(game.id);
    
    // Store the current player before starting a new round
    const currentPlayerId = game.currentPlayerId;
    
    // Start new round
    game = gameStateService.startRound(game);
    
    // Deck should already be available from game creation
    
    // Set initial player only at the beginning of a new game (round 1)
    if (game.round === 1) {
      // Get the first player after the dealer
      const connectedPlayers = game.getConnectedPlayersInOrder();
      if (connectedPlayers.length > 0) {
        if (game.dealerId && connectedPlayers.includes(game.dealerId)) {
          // Start with the player after the dealer
          const dealerIndex = connectedPlayers.indexOf(game.dealerId);
          game.currentPlayerId = connectedPlayers[(dealerIndex + 1) % connectedPlayers.length];
        } else {
          // If no dealer or dealer not in the list, start with the first player
          game.currentPlayerId = connectedPlayers[0];
        }
      }
    } else if (currentPlayerId) {
      // Keep the same player for subsequent rounds during a game
      game.currentPlayerId = currentPlayerId;
    }
    
    // Log the current player for the round
    const currentPlayer = game.players[game.currentPlayerId];
    if (currentPlayer) {
      gameLog(game, `Round ${game.round}: ${currentPlayer.name} goes first`);
    } else {
      console.error(`[GAME_SERVICE] Current player not found for game ${game.id}, currentPlayerId: ${game.currentPlayerId}`);
      gameLog(game, `Round ${game.round} starting`);
    }
    
    // Start dealing sequence
    game = await this.startDealingSequence(game);
    
    return game;
  }

  async startDealingSequence(game) {
    if (!game) return game;
    
    // Get required services
    const cardService = this.getService('card');
    const gameTimingService = this.getService('gameTiming');
    const gameStateService = this.getService('gameState');
    
    // Ensure deck is available
    game = cardService.ensureDeckAvailable(game);
    
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
      game = await this.startRound(game);
    }
    
    return game;
  }

  async startBettingPhase(game) {
    if (!game) return game;
    
    // Check for second chance eligibility before moving to betting phase
    if (game.firstCard && game.secondCard) {
      const isSecondChanceEligible = this.checkForSecondChance(game);
      if (isSecondChanceEligible) {
        // Don't move to betting phase yet, wait for player's decision
        return game;
      }
    }
    
    game.phase = GamePhases.BETTING;

    const currentPlayer = game.players[game.currentPlayerId];
    if (currentPlayer) {
      gameLog(game, `Betting phase started for ${currentPlayer.name}`);
    } else {
      console.error(`[GAME_SERVICE] Current player not found for game ${game.id}, currentPlayerId: ${game.currentPlayerId}`);
      gameLog(game, `Betting phase started`);
    }
    
    // Get required services
    const gameStateService = this.getService('gameState');
    const gameTimingService = this.getService('gameTiming');
    
    // GameTimingService will handle the auto-pass timeout
    await gameTimingService.handleBettingSequence(game);
    

    
    return game;
  }
  
  /**
   * Check for matching pair after dealing the second card
   * @param {Object} game - The game object
   * @returns {Boolean} - True if a matching pair is detected
   */
  checkForSecondChance(game) {
    if (!game || !game.firstCard || !game.secondCard) return false;
    
    // Get the card service from the registry
    const cardService = this.getService('card');
    
    // Check if the first two cards form a matching pair (but aren't Aces)
    const isSecondChanceEligible = cardService.isSecondChanceEligible(game.firstCard, game.secondCard);
    
    if (isSecondChanceEligible) {
      game.waitingForSecondChance = true;
      // Log message moved to GameTimingService to avoid duplication
    }
    
    return isSecondChanceEligible;
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

  // saveGame method removed - services should call gameStateService.saveGame directly

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

  async startNextRound(game) {
    if (!game) return game;
    
    // Get the player management service
    const playerManagementService = this.getService('playerManagement');
    
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
      
      gameLog(game, `Waiting for players to ante up for a new game`);
      
      // Broadcast the current game state
      const broadcastService = this.getService('broadcast');
      broadcastService.broadcastGameState(game);
      
      // Return early to prevent starting a new round
      return game;
    }
    
    // Always explicitly move to the next player before starting a new round
    const currentPlayer = game.players[game.currentPlayerId]?.name || 'Unknown';
    gameLog(game, `Moving from player ${currentPlayer} to next player`);
    
    // Move to the next player
    game = await playerManagementService.moveToNextPlayer(game);
    
    const nextPlayer = game.players[game.currentPlayerId]?.name || 'Unknown';
    gameLog(game, `Next round will start with player: ${nextPlayer}`);
    
    // Start new round with the updated player
    game = await this.startRound(game);
    
    // Make sure the phase is set correctly
    if (game.phase === undefined || game.phase === null) {
      gameLog(game, `Phase was undefined, setting to dealing`);
      game.phase = 'dealing';
    }
    
    // Broadcast the updated game state
    const broadcastService = this.getService('broadcast');
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
      
      if (cleanedCount > 0) {
        console.log(`[CLEANUP] Removed ${cleanedCount} inactive games`);
      } else {
        console.log(`[CLEANUP] No inactive games to remove`);
      }
    } catch (error) {
      console.error(`[CLEANUP] Error cleaning up games: ${error.message}`);
    }
  }

  // broadcastGameState method moved to BroadcastService
}

module.exports = new GameService();
