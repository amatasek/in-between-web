const { ANTE_AMOUNT, MAX_SEATS } = require('../../../shared/constants/GameConstants');
const { GamePhases } = require('../../../shared/constants/GamePhases');
const { gameLog } = require('../utils/logger');

/**
 * Game Model - Core game state and operations
 */
class Game {
  constructor(id) {
    this.id = id;
    this.players = {}; // Now keyed by userId instead of socketId
    this.socketIdToUserId = {}; // Maps socketId to userId for quick lookups
    
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
    
    // Track game transactions for running score
    this.gameTransactions = {};
  }

  /**
   * Assign a player to the next available seat
   * Players fill in the next available seats in order
   * @param {string} playerId - The player's ID
   * @returns {number} The assigned seat index or -1 if no seats available
   */
  assignSeat(playerId) {
    // Find the next available seat
    // Always fill sequentially without gaps
    for (let seatIndex = 0; seatIndex < MAX_SEATS; seatIndex++) {
      if (this.seats[seatIndex] === null) {
        // Seat is available
        this.seats[seatIndex] = playerId;
        this.seatInfo[seatIndex] = {
          playerId,
          name: this.players[playerId]?.name || `Player ${seatIndex + 1}`,
          isDealer: false,
          joinedAt: Date.now()
        };
        return seatIndex;
      }
    }
    
    return -1; // No seats available
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
   * Get user ID from socket ID
   * @param {string} socketId - The socket ID
   * @returns {string|null} The user ID or null if not found
   */
  getUserIdFromSocket(socketId) {
    return this.socketIdToUserId[socketId] || null;
  }

  /**
   * Get player by socket ID
   * @param {string} socketId - The socket ID
   * @returns {Object|null} The player object or null if not found
   */
  getPlayerBySocketId(socketId) {
    const userId = this.getUserIdFromSocket(socketId);
    return userId ? this.players[userId] : null;
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
    
    // Get all connected players in seat order
    const connectedPlayers = this.getConnectedPlayersInOrder();
    if (connectedPlayers.length <= 1) {
      gameLog(this, `Only one connected player, returning same player`);
      return playerId;
    }
    
    // Find the index of the current player in the connected players array
    const currentIndex = connectedPlayers.indexOf(playerId);
    if (currentIndex === -1) {
      gameLog(this, `Current player ${playerId} not found in connected players list`);
      return connectedPlayers[0]; // Return the first connected player
    }
    
    // Get the next player in the array, wrapping around if necessary
    const nextIndex = (currentIndex + 1) % connectedPlayers.length;
    const nextPlayerId = connectedPlayers[nextIndex];
    
    return nextPlayerId;
  }

  /**
   * Get the first non-dealer player (player in position 1)
   * @returns {string} The player ID in seat 1 or null if none
   * @deprecated Use getNextPlayerAfterDealer() instead for consistent player rotation
   */
  getFirstNonDealerPlayer() {
    // First non-dealer player is in seat 1
    const playerId = this.seats[1];
    if (playerId && this.players[playerId]?.isConnected) {
      return playerId;
    }
    // Fallback to seat 0 if seat 1 is empty
    return this.seats[0];
  }
  
  /**
   * Get the next player after the dealer
   * @returns {string} The next player's ID after the dealer
   */
  getNextPlayerAfterDealer() {
    return this.getNextPlayerInOrder(this.dealerId);
  }
  
  /**
   * Remove a player from their seat and compact seats
   * @param {string} playerId - The player's ID to remove
   */
  removeSeat(playerId) {
    const seatIndex = this.getPlayerSeat(playerId);
    if (seatIndex !== -1) {
      this.seats[seatIndex] = null;
      // Compact seats to remove gaps
      this.compactSeats();
    }
  }
  
  /**
   * Get all seated players in order
   * @returns {Array} Array of player IDs in seat order
   */
  getSeatedPlayers() {
    // Return just the player IDs that are in seats (no nulls)
    return this.seats.filter(playerId => playerId !== null);
  }
  
  /**
   * Compact seats to remove any gaps when players leave
   * This maintains the dealer in seat 0 and keeps all other players in sequential seats
   */
  compactSeats() {
    // Get the current dealer's ID
    const dealerId = this.dealerId;
    
    // Get current seated players (not including null slots)
    const seatedPlayers = this.getSeatedPlayers();
    
    // Clear all seats first
    this.seats = Array(MAX_SEATS).fill(null);
    
    // Put dealer in seat 0 and others after in order
    const dealerIndex = seatedPlayers.indexOf(dealerId);
    if (dealerIndex !== -1) {
      // Reorder so dealer is first, then all other players
      const orderedPlayers = [
        ...seatedPlayers.slice(dealerIndex),
        ...seatedPlayers.slice(0, dealerIndex)
      ];
      
      // Fill seats with the ordered players
      orderedPlayers.forEach((playerId, index) => {
        this.seats[index] = playerId;
      });
      
      // Update next seat index
      this.nextSeatIndex = orderedPlayers.length;
    }
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

  getCurrentPlayer() {
    return this.players[this.currentPlayerId];
  }

  getDealerName() {
    return this.players[this.dealerId]?.name || 'Unknown';
  }
}

module.exports = Game;
