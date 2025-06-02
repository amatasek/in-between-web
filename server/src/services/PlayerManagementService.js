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
   * Get the next active player based on game phase and current player
   * During active gameplay (not waiting phase), only players who have anted up can take turns
   * @param {Object} game - The game object
   * @param {string} [currentPlayerId=null] - The current player's ID (optional)
   * @returns {string} The next player's ID or null if no eligible players
   */
  getNextActivePlayer(game, currentPlayerId = null) {
    if (!game) return null;
    
    // Use the game's current player if none specified
    currentPlayerId = currentPlayerId || game.currentPlayerId;
    
    // During active gameplay (not waiting phase), only consider players who have anted up
    const playerList = (game.phase !== GamePhases.WAITING)
      ? game.getAntedPlayersInOrder()
      : game.getConnectedPlayersInOrder();
    
    if (playerList.length === 0) return null;
    if (playerList.length === 1) return playerList[0];
    
    // If current player isn't in the eligible list or isn't specified
    if (!currentPlayerId || !playerList.includes(currentPlayerId)) {
      // ONLY select the player after dealer for a brand new game (round 1)
      // This fixes the issue where player rotation was being reset during ongoing games
      if (game.round === 1 && game.dealerId && playerList.includes(game.dealerId)) {
        console.log(`[PLAYER_MANAGEMENT] Brand new game (round ${game.round}), selecting player after dealer`);
        const dealerIndex = playerList.indexOf(game.dealerId);
        return playerList[(dealerIndex + 1) % playerList.length];
      }
      
      // For all other cases, just take the first player in the list
      console.log(`[PLAYER_MANAGEMENT] Current player not in eligible list, defaulting to first player`);
      return playerList[0]; // Default to first player
    }
    
    // Get next player in rotation
    const currentIndex = playerList.indexOf(currentPlayerId);
    return playerList[(currentIndex + 1) % playerList.length];
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

    // Validate userId - it's now our primary key
    if (!userId) {
      console.error(`[PLAYER_MANAGEMENT] Cannot add player without userId`);
      return game;
    }

    // Check if this user is already in the game
    if (game.players[userId]) {
      console.log(`[PLAYER_MANAGEMENT] User ${userId} already in game. Updating socket ID to ${socketId}`);
      
      // Get the existing player
      const player = game.players[userId];
      
      // Store the old socket ID for reference updates
      const oldSocketId = player.socketId;
      
      // Update player connection status
      player.socketId = socketId;
      player.disconnected = false;
      player.disconnectedAt = null;
      player.isConnected = true;
      
      // Explicitly restore ready state if player had already anted up for the current hand
      if (player.hasAnteUp) {
        player.isReady = true;
      }
      
      // If the player was already in the current round (had anted up), make sure they're still included
      if (game.antedPlayers && Array.isArray(game.antedPlayers) && !game.antedPlayers.includes(userId) && player.hasAnteUp) {
        console.log(`[PLAYER_MANAGEMENT] Adding reconnected player ${player.name} back to antedPlayers list`);
        game.antedPlayers.push(userId);
      }
      // Only reset bet if we're in the waiting phase and they haven't placed a bet yet
      else if (game.phase === GamePhases.WAITING && !player.isReady) {
        player.currentBet = 0;
      }
      
      // Refresh player balance from database
      const databaseService = this.getService('database');
      if (databaseService) {
        try {
          // Get fresh balance from database
          const user = await databaseService.getUserById(userId);
          const freshBalance = user?.balance || 0;
          console.log(`[PLAYER_MANAGEMENT] Refreshing balance for player ${player.name} (${userId}): ${player.balance} -> ${freshBalance}`);
          player.balance = freshBalance;
          player.profileImg = user?.preferences?.profileImg || null; // Get profile image from preferences on reconnect
        } catch (error) {
          console.error(`[PLAYER_MANAGEMENT] Error refreshing balance for player ${player.name} (${userId}):`, error);
        }
      }
      
      // Update socket-to-user mapping
      if (oldSocketId !== socketId) {
        // Remove old mapping
        delete game.socketIdToUserId[oldSocketId];
        
        // Add new mapping
        game.socketIdToUserId[socketId] = userId;
        
        console.log(`[PLAYER_MANAGEMENT] Updated socket mapping from ${oldSocketId} to ${socketId} for user ${userId}`);
      }
        
      // Update the seat reference - now seats contain userIds, not socketIds
      const seatIndex = game.seats.findIndex(seat => seat === userId);
      if (seatIndex === -1) {
        console.log(`[PLAYER_MANAGEMENT] Player had no seat, finding an empty one`);
        // Player had no seat, try to find an empty one
        const emptySeatIndex = game.seats.findIndex(seat => seat === null);
        if (emptySeatIndex !== -1) {
          game.seats[emptySeatIndex] = userId;
          console.log(`[PLAYER_MANAGEMENT] Assigned player to empty seat ${emptySeatIndex}`);
          
          // Update seat info if it exists
          if (game.seatInfo && game.seatInfo[emptySeatIndex]) {
            game.seatInfo[emptySeatIndex].playerId = userId;
          }
        }
      }
      
      return game;
    }
    
    // For new players, check if the game is full
    let occupiedSeats = game.seats.filter(seat => seat !== null).length;
    if (occupiedSeats >= MAX_SEATS) {
      console.log(`[PLAYER_MANAGEMENT] Cannot add new player ${name} (${userId}): Game is full with ${occupiedSeats}/${MAX_SEATS} seats`);
      return game;
    }
    
    console.log(`[PLAYER_MANAGEMENT] Adding new player ${name} (${userId}) to game ${game.id}`);
    
    // Create new player with userId as primary key
    const player = new Player(userId, name, socketId);
    player.isConnected = true;
    
    // Add game log for new player joining (visible to all players in the game)
    gameLog(game, `${name} joined`);
    
    // Load player balance from database
    const databaseService = this.getService('database');
    if (databaseService) {
      try {
        // Get fresh balance from database
        const user = await databaseService.getUserById(userId);
        const freshBalance = user?.balance || 0;
        console.log(`[PLAYER_MANAGEMENT] Set initial balance for new player ${name}: ${freshBalance}`);
        player.balance = freshBalance;
        player.profileImg = user?.preferences?.profileImg || null; // Get profile image from preferences
      } catch (error) {
        console.error(`[PLAYER_MANAGEMENT] Error getting balance for new player ${name}:`, error);
        player.balance = 0; // Default to 0 if we can't get the balance
      }
    }
    
    // Add to game's player list - now keyed by userId
    game.players[userId] = player;
    
    // Add to socket-to-user mapping
    game.socketIdToUserId[socketId] = userId;
    
    // Find an empty seat for the new player
    let seatIndex = -1;
    
    // First, try to find the next available seat using the game's nextSeatIndex
    if (game.nextSeatIndex !== undefined && game.seats[game.nextSeatIndex] === null) {
      seatIndex = game.nextSeatIndex;
      console.log(`[PLAYER_MANAGEMENT] Assigning player ${name} to next available seat ${seatIndex}`);
    } 
    // If that fails, search for any empty seat
    else {
      seatIndex = game.seats.findIndex(seat => seat === null);
      console.log(`[PLAYER_MANAGEMENT] Assigning player ${name} to first empty seat ${seatIndex}`);
    }
    
    // If we still couldn't find a seat, log an error but continue
    if (seatIndex === -1) {
      console.error(`[PLAYER_MANAGEMENT] Could not find an empty seat for player ${name}. This should never happen!`);
      // Try to create a new seat if possible
      if (game.seats.length < MAX_SEATS) {
        seatIndex = game.seats.length;
        game.seats.push(null); // Add a new seat
        console.log(`[PLAYER_MANAGEMENT] Created new seat ${seatIndex} for player ${name}`);
      } else {
        // Last resort: try to use the first seat
        seatIndex = 0;
        console.log(`[PLAYER_MANAGEMENT] Using first seat as last resort for player ${name}`);
      }
    }
    
    // Assign the player to the seat - using userId instead of socketId
    game.seats[seatIndex] = userId;
    console.log(`[PLAYER_MANAGEMENT] Player ${name} assigned to seat ${seatIndex}`);
    
    // Check if this is the first player (who becomes the dealer)
    const isFirstPlayer = game.dealerId === null;
    if (isFirstPlayer) {
      game.dealerId = userId; // Use userId as the dealer ID
      console.log(`[PLAYER_MANAGEMENT] Player ${name} is the first player and becomes dealer`);
    }
    
    // Initialize or update seat info
    if (!game.seatInfo) {
      game.seatInfo = Array(MAX_SEATS).fill(null);
    }
    
    game.seatInfo[seatIndex] = {
      playerId: userId,
      name: name,
      isDealer: isFirstPlayer,
      joinedAt: Date.now()
    };
    
    // Update the next seat index for future players
    game.nextSeatIndex = (seatIndex + 1) % MAX_SEATS;
    
    // Update the game timestamp
    game.updateTimestamp();
    
    return game;
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
    const activePlayers = game.getActivePlayersInOrder();
    if (activePlayers.length < 2) return game;

    gameLog(game, `Moving to next player after ${game.players[game.currentPlayerId]?.name || 'Unknown'}`);

    // If no current player, start with the player after the dealer
    if (!game.currentPlayerId && game.dealerId && activePlayers.includes(game.dealerId)) {
      const dealerIndex = activePlayers.indexOf(game.dealerId);
      game.currentPlayerId = activePlayers[dealerIndex];
    }
    
    // Get the next player ID based on seat order - already using userId
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

    // Start or resume round
    game = await gameService.startOrResumeRound(game);

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
   * Move to the next player in the game
   * @param {Object} game - The game object
   * @returns {Object} The updated game object
   */
  moveToNextPlayer(game) {
    const connectedPlayers = game.getConnectedPlayersInOrder();
    if (connectedPlayers.length < 2) return game;

    // If no current player, start with the player after the dealer
    if (!game.currentPlayerId && game.dealerId && connectedPlayers.includes(game.dealerId)) {
      const dealerIndex = connectedPlayers.indexOf(game.dealerId);
      game.currentPlayerId = connectedPlayers[dealerIndex];
    }
    
    // Get the next player ID based on seat order - already using userId
    const nextPlayerId = game.getNextPlayerInOrder(game.currentPlayerId);
    
    if (nextPlayerId) {
      // Update the current player
      game.currentPlayerId = nextPlayerId;

      const nextPlayer = game.players[nextPlayerId];
      
      gameLog(game, `Turn: ${nextPlayer.name}`);
    } else {
      console.log(`[PLAYER_MANAGEMENT] No next player found after ${game.currentPlayerId}`);
    }
    
    game.updateTimestamp();
    return game;
  }

}

module.exports = new PlayerManagementService();
