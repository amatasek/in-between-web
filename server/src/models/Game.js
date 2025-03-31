const { ANTE_AMOUNT } = require('../../../shared/constants/GameConstants');
const { GamePhases } = require('../../../shared/constants/GamePhases');
const { gameLog } = require('../utils/logger');

/**
 * Game Model - Core game state and operations
 */
class Game {
  constructor(id, hostId) {
    this.id = id;
    this.hostId = hostId;
    this.players = {};
    this.playerOrder = [];
    
    // Seat-based player management
    this.MAX_SEATS = 32;
    this.seats = Array(this.MAX_SEATS).fill(null); // Array of player IDs or null for empty seats
    this.seatInfo = Array(this.MAX_SEATS).fill(null); // Array of player info objects
    
    this.nextSeatIndex = 0; // Next available seat index
    this.phase = GamePhases.WAITING;
    this.pot = 0;
    this.anteAmount = ANTE_AMOUNT; // Fixed ante amount from constants
    this.round = 1;
    this.dealerId = hostId;
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
  }

  /**
   * Assign a player to the next available seat
   * Host is always at position 0, and players fill in the next available seats in order
   * @param {string} playerId - The player's ID
   * @param {boolean} isHost - Whether this player is the host
   * @returns {number} The assigned seat index or -1 if no seats available
   */
  assignSeat(playerId, isHost) {
    // Host always gets seat 0
    if (isHost) {
      this.seats[0] = playerId;
      this.seatInfo[0] = {
        playerId,
        name: this.players[playerId]?.name || 'Host',
        isHost: true,
        isDealer: true,
        joinedAt: Date.now()
      };
      this.nextSeatIndex = 1; // Next player will be at seat 1
      return 0;
    }
    
    // Find the next available seat starting from seat 1 (after host)
    // Always fill sequentially without gaps
    for (let seatIndex = 1; seatIndex < this.MAX_SEATS; seatIndex++) {
      if (this.seats[seatIndex] === null) {
        // Seat is available
        this.seats[seatIndex] = playerId;
        this.seatInfo[seatIndex] = {
          playerId,
          name: this.players[playerId]?.name || `Player ${seatIndex + 1}`,
          isHost: false,
          isDealer: false,
          joinedAt: Date.now()
        };
        return seatIndex;
      }
    }
    
    return -1; // No seats available
  }
  
  /**
   * Get a player's seat index
   * @param {string} playerId - The player's ID
   * @returns {number} The player's seat index or -1 if not found
   */
  getPlayerSeat(playerId) {
    return this.seats.indexOf(playerId);
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
    
    gameLog(this, `Finding next player after ${this.players[playerId]?.name} (seat ${currentSeat})`);
    
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
    
    gameLog(this, `Next player: ${this.players[nextPlayerId]?.name} (ID: ${nextPlayerId})`);
    return nextPlayerId;
  }
  
  /**
   * Get the first non-dealer player (player in position 1)
   * @returns {string} The player ID in seat 1 or null if none
   */
  /**
   * Recalculate the number of players in the game
   * This should be called whenever players are added or removed
   */
  recalculatePlayerCount() {
    // Count non-null seats
    const count = this.seats.filter(playerId => playerId !== null).length;
    gameLog(this, `Recalculated player count: ${count} players`);
    return count;
  }

  /**
   * Get the first non-dealer player (player in position 1)
   * @returns {string} The player ID in seat 1 or null if none
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
    this.seats = Array(this.MAX_SEATS).fill(null);
    
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
      .filter(playerId => playerId !== null && this.players[playerId]?.isConnected);
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
        isHost: seat.isHost,
        isDealer: seat.isDealer,
        joinedAt: seat.joinedAt
      };
    });
    
    return {
      id: this.id,
      hostId: this.hostId,
      players: playerInfo,
      playerOrder: this.playerOrder,
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
      waitingForAceDecision: this.waitingForAceDecision
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
