const BaseService = require('./BaseService');
const Player = require('../models/Player');
const { gameLog } = require('../utils/logger');
const { ANTE_AMOUNT } = require('../../../shared/constants/GameConstants');
const { GamePhases } = require('../../../shared/constants/GamePhases');
const GAME_CONSTANTS = require('../../../shared/constants/GameConstants');

class PlayerManagementService extends BaseService {
  constructor() {
    super();
  }
  async addPlayer(game, playerId, name, userId) {
    if (!game || game.playerCount >= game.MAX_SEATS) return game;
    
    // Create new player
    const player = new Player(playerId, name, userId);
    
    // Load player balance from database
    const balanceService = this.getService('balance');
    player.balance = await balanceService.getBalance(player.userId);
    
    // Add to game's player list
    game.players[playerId] = player;
    
    let seatIndex;
    
    // Always put host in seat 0
    if (playerId === game.hostId) {
      seatIndex = 0;
      game.seats[0] = playerId;
      game.seatInfo[0] = {
        playerId,
        name: name || 'Host',
        isHost: true,
        isDealer: true,
        joinedAt: Date.now()
      };
      game.nextSeatIndex = 1;
    } else {
      // Find next available seat for non-host players
      seatIndex = game.nextSeatIndex;
      game.seats[seatIndex] = playerId;
      game.seatInfo[seatIndex] = {
        playerId,
        name: name || `Player ${seatIndex + 1}`,
        isHost: false,
        isDealer: playerId === game.dealerId,
        joinedAt: Date.now()
      };
      game.nextSeatIndex = (seatIndex + 1) % game.MAX_SEATS;
    }
    
    // Update player count
    game.recalculatePlayerCount();
    
    const displayName = game.seatInfo[seatIndex].name;
    gameLog(game, `Player ${displayName} joined and assigned seat ${seatIndex + 1}`);
    
    // Load player media preferences and apply auto-ante if enabled
    if (userId) {  
      try {
        // Get the database service from the registry
        const databaseService = this.getService('database');
        const preferences = await databaseService.getPreferences(userId);
        
        // Store media preferences in the player object so they can be displayed in the UI
        if (preferences) {
          // Create a mediaPreferences object if it doesn't exist
          game.players[playerId].mediaPreferences = game.players[playerId].mediaPreferences || {};
          
          // Store profile image URL if available
          if (preferences.profileImg) {
            game.players[playerId].mediaPreferences.profileImg = preferences.profileImg;
          }
          
          // Store other media preferences if needed
          if (preferences.twoSecondPotGif) {
            game.players[playerId].mediaPreferences.twoSecondPotGif = preferences.twoSecondPotGif;
          }
          if (preferences.twoSecondPotMp3) {
            game.players[playerId].mediaPreferences.twoSecondPotMp3 = preferences.twoSecondPotMp3;
          }
        }
        
        // Apply auto-ante if in waiting phase and enabled
        if (game.phase === GamePhases.WAITING && preferences && preferences.autoAnte) {
          try {
            // Use the same playerReady function for consistency
            game = await this.playerReady(game, playerId);
            gameLog(game, `Auto-ante applied for ${player.name} who just joined`);
          } catch (error) {
            gameLog(game, `Auto-ante error for new player ${player.name}: ${error.message}`);
          }
        }
      } catch (error) {
        gameLog(game, `Error loading player preferences: ${error.message}`);
      }
      
      const gameService = this.getService('game');
      gameService.broadcastGameState(game);
    }
    
    game.updateTimestamp();
    return game;
  }

  removePlayer(game, playerId) {
    if (!game || !game.players[playerId]) return game;
    
    const player = game.players[playerId];
    const seatIndex = game.seats.indexOf(playerId);
    
    // Remove from seat
    if (seatIndex >= 0) {
      game.seats[seatIndex] = null;
    }
    
    // Remove from players
    delete game.players[playerId];
    
    // Update player count
    game.recalculatePlayerCount();
    
    gameLog(game, `Player ${player.name} removed from game`);
    game.updateTimestamp();
    return game;
  }

  // Media preferences are now handled entirely through HTTP routes
  
  // Media preferences are now handled entirely through HTTP routes
  
  moveToNextPlayer(game) {
    if (!game || !game.currentPlayerId) return game;
    
    // Log the current player before moving
    const currentPlayer = game.players[game.currentPlayerId];
    gameLog(game, `Current player before rotation: ${currentPlayer?.name} (ID: ${game.currentPlayerId})`);
    
    // Get the next player ID based on seat order
    const nextPlayerId = game.getNextPlayerInOrder(game.currentPlayerId);
    
    if (nextPlayerId) {
      // Store the previous player ID for logging
      const prevPlayerId = game.currentPlayerId;
      
      // Update the current player
      game.currentPlayerId = nextPlayerId;
      
      // Log the player transition with detailed information
      const nextPlayer = game.players[nextPlayerId];
      gameLog(game, `Player rotation: ${currentPlayer?.name} -> ${nextPlayer?.name}`);
      gameLog(game, `Player ID rotation: ${prevPlayerId} -> ${nextPlayerId}`);
    } else {
      gameLog(game, `WARNING: Could not find next player after ${currentPlayer?.name}`);
    }
    
    game.updateTimestamp();
    return game;
  }

  setInitialCurrentPlayer(game) {
    if (!game || !game.dealerId) return game;
    
    // Get the player in the next seat after the dealer
    const nextPlayerId = game.getNextPlayerAfterDealer();
    
    if (nextPlayerId && nextPlayerId !== game.dealerId) {
      game.currentPlayerId = nextPlayerId;
      gameLog(game, `First player set to: ${game.players[nextPlayerId].name} (next after dealer)`);
    } else if (game.dealerId && game.players[game.dealerId]) {
      game.currentPlayerId = game.dealerId;
      gameLog(game, `Only dealer present: ${game.players[game.dealerId].name}`);
    }
    
    game.updateTimestamp();
    return game;
  }

  async playerReady(game, playerId) {
    if (!game || !game.players[playerId]) return game;

    const player = game.players[playerId];
    
    // Prevent double-ante by checking if player is already ready
    if (player.isReady) {
      const errorMsg = `Player ${player.name} is already ready (anted)`;
      gameLog(game, `[ERROR] ${errorMsg}`);
      return game;
    }
    
    // Place ante bet
    const balanceService = this.getService('balance');
    try {
      const result = await balanceService.updateBalance(player.userId, -ANTE_AMOUNT, `Game ${game.id}: Ante`);
      player.balance = result.balance;
      
      // Add to pot
      game.pot += ANTE_AMOUNT;
      player.isReady = true;
  
      // Check if all players are ready
      const allReady = Object.values(game.players).every(p => p.isReady);
      if (allReady) {
        gameLog(game, 'All players ready, starting round');
      }
  
      game.updateTimestamp();
      return game;
    } catch (error) {
      console.error(`[PLAYER_MGMT] Failed to remove ante from ${player.name}'s balance:`, error);
      return game;
    }

    // Add to pot
    game.pot += ANTE_AMOUNT;
    player.isReady = true;

    // Check if all players are ready
    const allReady = Object.values(game.players).every(p => p.isReady);
    if (allReady) {
      gameLog(game, 'All players ready, starting round');
    }

    game.updateTimestamp();
    return game;
  }

  async playerUnready(game, playerId) {
    if (!game || !game.players[playerId]) return game;

    const player = game.players[playerId];
    
    // Only allow withdraw if player is ready but game hasn't started
    if (!player.isReady || game.phase !== GamePhases.WAITING) {
      return game;
    }

    // Return ante to player
    const balanceService = this.getService('balance');
    try {
      const result = await balanceService.updateBalance(player.userId, ANTE_AMOUNT, `Game ${game.id}: Ante withdraw`);
      player.balance = result.balance;
      
      // Reduce pot
      game.pot -= ANTE_AMOUNT;
      player.isReady = false;
      
      game.updateTimestamp();
      return game;
    } catch (error) {
      console.error(`[PLAYER_MGMT] Failed to return ante to ${player.name}'s balance:`, error);
      return game;
    }

    // Remove from pot
    game.pot -= ANTE_AMOUNT;
    player.isReady = false;

    gameLog(game, `${player.name} withdrew ante and is no longer ready`);
    game.updateTimestamp();
    return game;
  }
}

module.exports = new PlayerManagementService();
