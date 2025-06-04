const { ANTE_AMOUNT, MAX_SEATS } = require('../../../shared/constants/GameConstants');
const { GamePhases } = require('../../../shared/constants/GamePhases');
const { gameLog } = require('../utils/logger');

/**
 * Game Model - Core game state and operations
 */
class Game {
  constructor(settings) {
    this.id = settings.customName || Math.random().toString(36).substring(2, 8).toUpperCase();
    this.players = {}; // Now keyed by userId instead of socketId
    this.socketIdToUserId = {}; // Maps socketId to userId for quick lookups

    // Settings
    this.settings = settings;
    
    // Seat-based player management
    this.seats = Array(MAX_SEATS).fill(null); // Array of user IDs or null for empty seats
    this.seatInfo = Array(MAX_SEATS).fill(null); // Array of player info objects
    
    this.nextSeatIndex = 0; // Next available seat index
    this.phase = GamePhases.WAITING;
    this.pot = 0;
    this.anteAmount = ANTE_AMOUNT; // Fixed ante amount from constants
    this.round = 1;
    this.dealerId = null; // Will be set when first player joins
    this.currentPlayerId = null;

    // Individual card properties for sequential dealing
    this.firstCard = null;  // Left card (dealt first)
    this.secondCard = null; // Right card (dealt second)
    this.thirdCard = null;  // Middle card (dealt last during reveal)
    this.deck = [];
    this.deckCount = 1;
    this.result = null;
    this.lastUpdated = Date.now();
    this.pendingTransition = null;
    this.waitingForAceDecision = false;
    
    // Game log for tracking game events
    this.gameLog = [];
    this.maxLogEntries = 50; // Maximum number of log entries to keep
    
    // Track game transactions for running score - flat ledger of all game transactions
    this.gameTransactions = [];
  }
  
  /**
   * Map a socket ID to a user ID
   * @param {string} socketId - The socket ID
   * @param {string} userId - The user ID
   */
  mapSocketToUser(socketId, userId) {
    this.socketIdToUserId[socketId] = userId;
  }

  /**
   * Update a player's socket ID
   * @param {string} userId - The user ID
   * @param {string} newSocketId - The new socket ID
   * @returns {boolean} True if successful, false otherwise
   */
  updatePlayerSocket(userId, newSocketId) {
    if (!this.players[userId]) return false;
    
    // Update the player's socket ID
    const oldSocketId = this.players[userId].socketId;
    this.players[userId].socketId = newSocketId;
    
    // Update the mapping
    delete this.socketIdToUserId[oldSocketId];
    this.socketIdToUserId[newSocketId] = userId;
    
    return true;
  }

  /**
   * Get a player's seat index
   * @param {string} userId - The user ID
   * @returns {number} The player's seat index or -1 if not found
   */
  getPlayerSeat(userId) {
    return this.seats.indexOf(userId);
  }
  
  /**
   * Get the next player after the specified player in seat order
   * @param {string} playerId - The current player's ID
   * @returns {string} The next player's ID
   */
  getNextPlayerInOrder(playerId) {
    // Find the current player's seat
    const currentSeat = this.getPlayerSeat(playerId);
    if (currentSeat === -1) {
      gameLog(this, `WARNING: Could not find seat for player ID: ${playerId}`);
      return null;
    }
    
    // Get all active players in seat order
    const activePlayers = this.getActivePlayersInOrder();
    if (activePlayers.length === 0) {
      gameLog(this, `No active players found.`);
      return null; // Or handle as appropriate, maybe return current player if they are the only one
    }
    if (activePlayers.length === 1) {
      gameLog(this, `Only one active player, returning same player: ${activePlayers[0]}`);
      return activePlayers[0];
    }
  
    // Find the index of the current player in the active players array
    const currentIndex = activePlayers.indexOf(playerId);
    if (currentIndex === -1) {
      // If current player is not in the active list (e.g., they just sat out),
      // or if playerId is null/undefined, default to the first active player.
      gameLog(this, `Current player ${playerId} not found in active players list or no current player; defaulting to first active player.`);
      return activePlayers[0]; 
    }
  
    // Get the next player in the array, wrapping around if necessary
    const nextIndex = (currentIndex + 1) % activePlayers.length;
    const nextPlayerId = activePlayers[nextIndex];
    
    return nextPlayerId;
  }
  
  /**
   * Get connected players in seat order
   * @returns {Array} Array of connected player IDs in seat order
   */
  getConnectedPlayersInOrder() {
    return this.seats
      .filter(playerId => playerId !== null && 
              this.players[playerId]?.isConnected && 
          !this.players[playerId]?.disconnected);
  }

  /**
   * Get active (connected and not sitting out) players in seat order
   * @returns {Array} Array of active player IDs in seat order
   */
  getActivePlayersInOrder() {
    const connectedPlayers = this.getConnectedPlayersInOrder();
    return connectedPlayers.filter(playerId => !this.players[playerId]?.isSittingOut);
  }

  /**
   * Get players who have anted up for the current round in seat order
   * @returns {Array} Array of anted player IDs in seat order
   */
  getAntedPlayersInOrder() {
    return this.seats
      .filter(playerId => {
        const player = this.players[playerId];
        return playerId !== null && 
               player?.isConnected && 
               !player?.disconnected &&
               player?.isReady;
      });
  }

  toJSON() {
    // Prepare playerInfo with seat information
    const playerInfo = {};
    this.seats.forEach((playerId, index) => {
      if (!playerId) return;
      
      const player = this.players[playerId];
      const seat = this.seatInfo[index];
      
      if (!player || !seat) return;
      
      playerInfo[playerId] = {
        ...player.toJSON(),
        seatNumber: index + 1,
        name: seat.name,
        isDealer: seat.isDealer,
        joinedAt: seat.joinedAt
      };
    });
    
    return {
      id: this.id,
      players: playerInfo,
      settings: this.settings.toJSON(),
      seats: this.seats,
      phase: this.phase,
      pot: this.pot,
      anteAmount: this.anteAmount,
      round: this.round,
      dealerId: this.dealerId,
      currentPlayerId: this.currentPlayerId,
      // Individual card properties
      firstCard: this.firstCard,
      secondCard: this.secondCard,
      thirdCard: this.thirdCard,
      deckCount: this.deckCount,
      deckSize: this.deck.length,
      result: this.result,
      gameTransactions: this.gameTransactions,
      waitingForAceDecision: this.waitingForAceDecision,
      gameLog: this.gameLog || []
    };
  }

  updateTimestamp() {
    this.lastUpdated = Date.now();
  }

  isPlayersTurn(playerId) {
    return this.currentPlayerId === playerId && this.phase === GamePhases.BETTING;
  }
  
  /**
   * Get all connected players in seat order
   * @returns {Array} Array of connected player IDs
   * @note This is a wrapper around getConnectedPlayersInOrder() for backward compatibility
   * with existing code in CardService.js
   */
  getConnectedPlayers() {
    // Return connected players in seat order instead of join order
    return this.getConnectedPlayersInOrder();
  }

  getPlayer(playerId) {
    return this.players[playerId];
  }
}

module.exports = Game;
