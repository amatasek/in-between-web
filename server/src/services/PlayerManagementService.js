const BaseService = require('./BaseService');
const Player = require('../models/Player');
const { gameLog } = require('../utils/logger');
const { ANTE_AMOUNT } = require('../../../shared/constants/GameConstants');
const { GamePhases } = require('../../../shared/constants/GamePhases');
const { MAX_SEATS } = require('../../../shared/constants/GameConstants');

class PlayerManagementService extends BaseService {
  constructor() {
    super();
  }


  /**
   * Add a player to the game
   * @param {Object} game - The game to add the player to
   * @param {string} socketId - The socket ID of the player
   * @param {string} name - The name of the player
   * @param {string} userId - The user ID of the player
   * @returns {Object} The updated game object
   */
  async addPlayer(game, socketId, name, userId) {
    if (!game) {
      console.error(`[PLAYER_MANAGEMENT] Cannot add player to null game`);
      return game;
    }

    if (!userId) {
      console.error(`[PLAYER_MANAGEMENT] Cannot add player without userId`);
      return game;
    }

    const isReconnection = game.players[userId];
    
    if (isReconnection) {
      return this.handlePlayerReconnection(game, socketId, userId);
    } else {
      return this.handleNewPlayer(game, socketId, name, userId);
    }
  }

  /**
   * Handle reconnection of existing player
   */
  async handlePlayerReconnection(game, socketId, userId) {
    console.log(`[PLAYER_MANAGEMENT] User ${userId} reconnecting with socket ${socketId}`);
    
    const player = game.players[userId];
    const oldSocketId = player.socketId;
    
    // Update connection status
    player.socketId = socketId;
    player.disconnected = false;
    player.disconnectedAt = null;
    player.isConnected = true;
    
    // Restore ante state if they were part of current round
    const wasRestored = this.restoreAnteState(game, player, userId);
    
    // Handle seat assignment (try to restore original if ante was restored)
    this.assignSeat(game, userId, player.name, wasRestored);
    
    // Reset bet if in waiting phase and not ready
    if (game.phase === GamePhases.WAITING && !player.isReady) {
      player.currentBet = 0;
    }
    
    // Refresh balance from database
    await this.refreshPlayerBalance(player, userId);
    
    // Update socket mapping
    this.updateSocketMapping(game, oldSocketId, socketId, userId);
    
    game.updateTimestamp();
    return game;
  }

  /**
   * Handle new player joining
   */
  async handleNewPlayer(game, socketId, name, userId) {
    // Check if game is full
    const occupiedSeats = game.seats.filter(seat => seat !== null).length;
    if (occupiedSeats >= MAX_SEATS) {
      console.log(`[PLAYER_MANAGEMENT] Cannot add new player ${name} (${userId}): Game is full`);
      return game;
    }
    
    console.log(`[PLAYER_MANAGEMENT] Adding new player ${name} (${userId}) to game ${game.id}`);
    
    // Create player and set basic properties
    const player = new Player(userId, name, socketId);
    player.isConnected = true;
    
    // Load balance from database
    await this.refreshPlayerBalance(player, userId);
    
    // Add to game
    game.players[userId] = player;
    game.socketIdToUserId[socketId] = userId;
    
    // Check if this "new" player was actually part of current round (removed then rejoining)
    const wasRestored = this.restoreAnteState(game, player, userId);
    
    // Assign seat (try to restore original if ante was restored)
    const seatIndex = this.assignSeat(game, userId, name, wasRestored);
    
    // Handle dealer assignment for first player
    const isFirstPlayer = game.dealerId === null;
    if (isFirstPlayer) {
      game.dealerId = userId;
      console.log(`[PLAYER_MANAGEMENT] Player ${name} becomes dealer`);
    }
    
    // Update seat info
    this.updateSeatInfo(game, seatIndex, userId, name, isFirstPlayer);
    
    // Update next seat index
    game.nextSeatIndex = (seatIndex + 1) % MAX_SEATS;
    
    // Add game log
    gameLog(game, `${name} joined`);
    
    game.updateTimestamp();
    return game;
  }

  /**
   * Refresh player balance from database
   */
  async refreshPlayerBalance(player, userId) {
    const databaseService = this.getService('database');
    if (!databaseService) return;
    
    try {
      const user = await databaseService.getUserById(userId);
      const freshBalance = user?.balance || 0;
      console.log(`[PLAYER_MANAGEMENT] Set balance for ${player.name}: ${freshBalance}`);
      player.balance = freshBalance;
      player.profileImg = user?.preferences?.profileImg || null;
    } catch (error) {
      console.error(`[PLAYER_MANAGEMENT] Error getting balance for ${player.name}:`, error);
      player.balance = 0;
    }
  }

  /**
   * Update socket to user ID mapping
   */
  updateSocketMapping(game, oldSocketId, newSocketId, userId) {
    if (oldSocketId !== newSocketId) {
      delete game.socketIdToUserId[oldSocketId];
      game.socketIdToUserId[newSocketId] = userId;
      console.log(`[PLAYER_MANAGEMENT] Updated socket mapping ${oldSocketId} -> ${newSocketId} for ${userId}`);
    }
  }

  /**
   * Remove a player from the game
   * @param {Object} game - The game to remove the player from
   * @param {string} userId - The user ID of the player to remove
   * @returns {Object} The updated game object
   */
  removePlayer(game, userId) {
    if (!game) return game;
    
    if (!userId || !game.players[userId]) {
      console.log(`[PLAYER_MANAGEMENT] Cannot remove player with userId ${userId}: user not found`);
      return game;
    }
    
    const player = game.players[userId];
    const seatIndex = game.seats.indexOf(userId);
    
    // Remove from seat
    if (seatIndex >= 0) {
      game.seats[seatIndex] = null;
    }
    
    // Remove socket-to-user mapping for all sockets associated with this user
    Object.keys(game.socketIdToUserId).forEach(socketId => {
      if (game.socketIdToUserId[socketId] === userId) {
        delete game.socketIdToUserId[socketId];
      }
    });
    
    // Remove from players
    delete game.players[userId];
    
    // Clean up antedPlayersForRound to prevent stale references
    if (game.antedPlayersForRound) {
      game.antedPlayersForRound = game.antedPlayersForRound.filter(p => p.userId !== userId);
    }
    
    // Add a prominent log message when a player leaves
    gameLog(game, `${player.name} left`); // Keep game log concise
    console.log(`[PLAYER_MANAGEMENT] Player ${player.name} left game ${game.id}`);
    
    // Check if the removed player was the dealer
    if (game.dealerId === userId) {
      const remainingPlayerIds = Object.keys(game.players);
      if (remainingPlayerIds.length > 0) {
        let newDealerId = null;
        let checkedSeats = 0;
        let currentSeatIndex = (seatIndex + 1) % MAX_SEATS; // Start checking from the next seat
        
        // Find the next occupied and connected seat
        while (checkedSeats < MAX_SEATS) {
          const potentialDealerId = game.seats[currentSeatIndex];
          if (potentialDealerId && game.players[potentialDealerId] && game.players[potentialDealerId].isConnected) {
            newDealerId = potentialDealerId;
            break;
          }
          currentSeatIndex = (currentSeatIndex + 1) % MAX_SEATS;
          checkedSeats++;
        }
        
        // Fallback: If no connected player found, assign the first player in the remaining list
        if (!newDealerId) {
          newDealerId = remainingPlayerIds[0]; 
          console.log(`[PLAYER_MANAGEMENT] No connected player found after dealer left. Assigning first remaining player ${newDealerId} as dealer.`);
        }
        
        game.dealerId = newDealerId;
        gameLog(game, `${game.players[newDealerId]?.name || 'Unknown'} is now the dealer.`);
        console.log(`[PLAYER_MANAGEMENT] Assigned new dealer: ${newDealerId}`);
      } else {
        // No players left
        game.dealerId = null;
        console.log(`[PLAYER_MANAGEMENT] Last player left, clearing dealer.`);
      }
    }
    
    game.updateTimestamp();
    return game;
  }

  /**
   * Move to the next player in the game
   * @param {Object} game - The game object
   * @returns {Object} The updated game object
   */
  moveToNextPlayer(game) {
    const antedPlayers = game.getAntedPlayersInOrder();
    if (antedPlayers.length < 2) return game;

    // If no current player, start with first anted player
    if (!game.currentPlayerId) {
      game.currentPlayerId = antedPlayers[0];
    }
    
    // Get the next player ID - now uses anted players only
    const nextPlayerId = game.getNextPlayerInOrder(game.currentPlayerId);
    
    if (nextPlayerId) {
      // Store the previous player ID for logging
      const prevPlayerId = game.currentPlayerId;
      
      // Update the current player
      game.currentPlayerId = nextPlayerId;
      
      // Log the player change
      if (prevPlayerId !== nextPlayerId) {
        const nextPlayer = game.players[nextPlayerId];
        if (nextPlayer) {
          gameLog(game, `Turn: ${nextPlayer.name}`);
        }
      }
    } else {
      console.log(`[PLAYER_MANAGEMENT] No next player found after ${game.currentPlayerId}`);
    }
    
    game.updateTimestamp();
    return game;
  }

  /**
   * Mark a player as ready (anted up)
   * @param {Object} game - The game object
   * @param {string} userId - The user ID of the player
   * @returns {Object} The updated game object
   */
  async playerReady(game, userId) {
    if (!game) return game;
    
    if (!userId || !game.players[userId]) {
      console.error(`[PLAYER_MGMT] Cannot mark player ready: userId ${userId} not found in game`);
      return game;
    }

    const player = game.players[userId];
    
    // Prevent double-ante by checking if player is already ready
    if (player.isReady) {
      const errorMsg = `Player ${player.name} is already ready (anted)`;
      gameLog(game, `[ERROR] ${errorMsg}`);
      return game;
    }
    
    // Process ante through the central transaction service
    const gameTransactionService = this.getService('gameTransaction');
    try {
      // Update player balance, record transaction, and update pot
      // The pot is automatically updated by the transaction service
      game = await gameTransactionService.processTransaction(
        game, 
        userId, // Use userId instead of socketId
        -ANTE_AMOUNT, 
        `Ante in round ${game.round}`
      );
      
      player.isReady = true;
      player.isSittingOut = false;
  
      gameLog(game, `${player.name} antes`);

      game.updateTimestamp();
      return game;
    } catch (error) {
      console.error(`[PLAYER_MGMT] Failed to deduct ante from ${player.name}'s balance:`, error);
      return game;
    }
  }

  /**
   * Mark a player as unready (withdraw ante)
   * @param {Object} game - The game object
   * @param {string} userId - The user ID of the player
   * @returns {Object} The updated game object
   */
  async playerUnready(game, userId) {
    if (!game) return game;
    
    if (!userId || !game.players[userId]) {
      console.error(`[PLAYER_MGMT] Cannot mark player unready: userId ${userId} not found in game`);
      return game;
    }

    const player = game.players[userId];
    
    // Only allow withdraw if player is ready but game hasn't started
    if (!player.isReady || game.phase !== GamePhases.WAITING) {
      return game;
    }

    // Process ante withdrawal through the central transaction service
    const gameTransactionService = this.getService('gameTransaction');
    try {
      // Update player balance, record transaction, and update pot
      // The pot is automatically updated by the transaction service
      game = await gameTransactionService.processTransaction(
        game, 
        userId, // Use userId instead of socketId
        ANTE_AMOUNT, 
        `Ante withdraw in round ${game.round}`
      );
      
      player.isReady = false;
      player.currentBet = 0;
      
      gameLog(game, `${player.name} withdraws ante`);
      game.updateTimestamp();
      return game;
    } catch (error) {
      console.error(`[PLAYER_MGMT] Failed to return ante to ${player.name}'s balance:`, error);
      return game;
    }
  }

  /**
   * Mark a player as sitting out for the next round.
   * @param {Game} game - The game object.
   * @param {string} userId - The ID of the player sitting out.
   * @returns {Game} The updated game object.
   */
  async playerSitOut(game, userId) {
    if (!game || !game.players || !game.players[userId]) {
      console.error(`[PLAYER_MANAGEMENT] Cannot sit out: Player ${userId} or game ${game?.id} not found.`);
      return game;
    }

    const gameService = this.getService('game');

    const player = game.players[userId];

    // Players can only sit out during the WAITING phase
    if (game.phase !== GamePhases.WAITING) {
      console.log(`[PLAYER_MANAGEMENT] Player ${player.name} cannot sit out during phase: ${game.phase}`);
      return game;
    }

    // Players can only sit out if they are not ready
    if (player.isReady) {
      console.log(`[PLAYER_MANAGEMENT] Player ${player.name} cannot sit out while ready`);
      return game;
    }

    player.isSittingOut = true;
    player.isReady = false;

    gameLog(game, `${player.name} is sitting out`);
    console.log(`[PLAYER_MANAGEMENT] Player ${player.name} (${userId}) marked as sitting out.`);

    // Start round
    game = await gameService.startRound(game);

    return game;
  }

  /**
   * Mark a player as returning from sitting out.
   * @param {Game} game - The game object.
   * @param {string} userId - The ID of the player returning.
   * @returns {Game} The updated game object.
   */
  async playerReturn(game, userId) {
    if (!game || !game.players || !game.players[userId]) {
      console.error(`[PLAYER_MANAGEMENT] Cannot return: Player ${userId} or game ${game?.id} not found.`);
      return game; // Return original game if player/game missing
    }

    const player = game.players[userId];

    // Only players who are actually sitting out can return
    if (!player.isSittingOut) {
      gameLog(game, `Player ${player.name} tried to return but was not sitting out.`);
      return game; // No change needed
    }

    // Mark player as no longer sitting out
    player.isSittingOut = false;

    gameLog(game, `${player.name} is back`);
    console.log(`[PLAYER_MANAGEMENT] Player ${player.name} (${userId}) marked as returned (not sitting out).`);

    return game;
  }


  /**
   * Restore ante state for a player who was part of the current round
   * @param {Object} game - The game object
   * @param {Object} player - The player object
   * @param {string} userId - The user ID
   * @returns {boolean} - True if ante state was restored
   */
  restoreAnteState(game, player, userId) {
    const wasPartOfCurrentRound = game.antedPlayersForRound && 
      game.antedPlayersForRound.some(p => p.userId === userId);
    
    if (wasPartOfCurrentRound) {
      console.log(`[PLAYER_MANAGEMENT] Player ${player.name} was part of current round - restoring ante state`);
      player.isReady = true;
      return true;
    }
    
    return false;
  }

  /**
   * Assign or restore seat for a player
   * @param {Object} game - The game object
   * @param {string} userId - The user ID
   * @param {string} name - The player name
   * @param {boolean} tryRestoreOriginal - Whether to try restoring original seat
   * @returns {number} - The assigned seat index
   */
  assignSeat(game, userId, name, tryRestoreOriginal = false) {
    let seatIndex = -1;
    
    // Try to restore original seat if requested
    if (tryRestoreOriginal && game.antedPlayersForRound) {
      const originalSeatInfo = game.antedPlayersForRound.find(p => p.userId === userId);
      if (originalSeatInfo && originalSeatInfo.seatIndex !== -1 && 
          originalSeatInfo.seatIndex < game.seats.length && 
          game.seats[originalSeatInfo.seatIndex] === null) {
        seatIndex = originalSeatInfo.seatIndex;
        game.seats[seatIndex] = userId;
        console.log(`[PLAYER_MANAGEMENT] Restored ${name} to original seat ${seatIndex}`);
        
        // Update seat info if it exists
        if (game.seatInfo && game.seatInfo[seatIndex]) {
          game.seatInfo[seatIndex].playerId = userId;
        }
        
        return seatIndex;
      }
    }
    
    // Check if player already has a seat
    seatIndex = game.seats.findIndex(seat => seat === userId);
    if (seatIndex !== -1) {
      console.log(`[PLAYER_MANAGEMENT] Player ${name} already has seat ${seatIndex}`);
      return seatIndex;
    }
    
    // Find next available seat using game's nextSeatIndex
    if (game.nextSeatIndex !== undefined && game.seats[game.nextSeatIndex] === null) {
      seatIndex = game.nextSeatIndex;
      console.log(`[PLAYER_MANAGEMENT] Assigning player ${name} to next available seat ${seatIndex}`);
    } else {
      // Search for any empty seat
      seatIndex = game.seats.findIndex(seat => seat === null);
      console.log(`[PLAYER_MANAGEMENT] Assigning player ${name} to first empty seat ${seatIndex}`);
    }
    
    // Last resort handling
    if (seatIndex === -1) {
      console.error(`[PLAYER_MANAGEMENT] Could not find an empty seat for player ${name}`);
      if (game.seats.length < MAX_SEATS) {
        seatIndex = game.seats.length;
        game.seats.push(null);
        console.log(`[PLAYER_MANAGEMENT] Created new seat ${seatIndex} for player ${name}`);
      } else {
        seatIndex = 0;
        console.log(`[PLAYER_MANAGEMENT] Using first seat as last resort for player ${name}`);
      }
    }
    
    // Assign the seat
    game.seats[seatIndex] = userId;
    console.log(`[PLAYER_MANAGEMENT] Player ${name} assigned to seat ${seatIndex}`);
    
    return seatIndex;
  }

  /**
   * Update seat info for a player
   * @param {Object} game - The game object
   * @param {number} seatIndex - The seat index
   * @param {string} userId - The user ID
   * @param {string} name - The player name
   * @param {boolean} isFirstPlayer - Whether this is the first player (dealer)
   */
  updateSeatInfo(game, seatIndex, userId, name, isFirstPlayer) {
    if (!game.seatInfo) {
      game.seatInfo = Array(MAX_SEATS).fill(null);
    }
    
    game.seatInfo[seatIndex] = {
      playerId: userId,
      name: name,
      isDealer: isFirstPlayer,
      joinedAt: Date.now()
    };
  }

}

module.exports = new PlayerManagementService();
