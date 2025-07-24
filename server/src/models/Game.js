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
    
    // Track players who anted up for the current round with their seat positions
    this.antedPlayersForRound = [];
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
    // During active rounds, ONLY players who anted can be dealt to
    const eligiblePlayers = this.getAntedPlayersInOrder();
    
    if (eligiblePlayers.length === 0) {
      gameLog(this, `No anted players found for dealing rotation.`);
      return null;
    }
    if (eligiblePlayers.length === 1) {
      gameLog(this, `Only one anted player, returning same player: ${eligiblePlayers[0]}`);
      return eligiblePlayers[0];
    }
    
    // Find current player in the anted players list
    const currentIndex = eligiblePlayers.indexOf(playerId);
    if (currentIndex === -1) {
      gameLog(this, `WARNING: Current player ${playerId} not found in anted players list`);
      // Return first anted player as fallback
      return eligiblePlayers[0];
    }
    
    // Return next player in rotation
    const nextIndex = (currentIndex + 1) % eligiblePlayers.length;
    return eligiblePlayers[nextIndex];
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
   * Uses antedPlayersForRound for authoritative tracking (includes disconnected players)
   * @returns {Array} Array of anted player IDs in seat order
   */
  getAntedPlayersInOrder() {
    if (!this.antedPlayersForRound) {
      return [];
    }
    
    return this.antedPlayersForRound
      .filter(p => this.players[p.userId]) // Only include existing players
      .sort((a, b) => a.seatIndex - b.seatIndex) // Ensure seat order
      .map(p => p.userId);
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
