const Player = require('../models/Player');
const { gameLog } = require('../utils/logger');
const { ANTE_AMOUNT } = require('../../../shared/constants/GameConstants');
const { GamePhases } = require('../../../shared/constants/GamePhases');
const gameTimerService = require('./GameTimerService');
const CardService = require('./CardService');
const GAME_CONSTANTS = require('../../../shared/constants/GameConstants');

class PlayerManagementService {
  async addPlayer(game, playerId, name, userId) {
    if (!game || game.playerCount >= game.MAX_SEATS) return game;
    
    // Create new player
    const player = new Player(playerId, name, userId);
    
    // Load player balance from database
    await player.loadBalance();
    
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
    
    // Place ante bet
    const success = await player.removeChips(ANTE_AMOUNT, `Game ${game.id}: Ante`);
    
    if (!success) {
      console.error(`[PLAYER_MGMT] Failed to remove ante from ${player.name}'s balance`);
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
    const success = await player.addChips(ANTE_AMOUNT, `Game ${game.id}: Ante withdraw`);
    
    if (!success) {
      console.error(`[PLAYER_MGMT] Failed to return ante to ${player.name}'s balance`);
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
