const { STARTING_BALANCE } = require('../../../shared/constants/GameConstants');

/**
 * Player Model - Manages player state and actions
 * 
 * This model uses userId as the primary identifier for players, with socketId as a secondary
 * identifier that can change when players reconnect. This architecture allows players to
 * maintain their game state during reconnections.
 */
class Player {
  constructor(userId, name, socketId) {
    // Primary identifier is now userId instead of socketId
    this.userId = userId;    // Database User ID - PRIMARY KEY
    this.socketId = socketId; // Current socket ID - can change on refresh
    this.name = name;
    this.balance = 0;       // Will be loaded from database
    this.isReady = false;
    this.isConnected = true;
    this.currentBet = 0;
    this.joinedAt = Date.now();
    // Media preferences are now handled entirely through HTTP routes
  }

  
  placeBet(amount) {
    if (amount <= 0 || amount > this.balance) {
      return false;
    }
    
    this.currentBet = amount;
    return true;
  }
  
  resetBet() {
    this.currentBet = 0;
  }
  
  // Balance methods handled by DatabaseService
  
  setReady(isReady) {
    this.isReady = isReady;
  }
  
  setConnected(isConnected) {
    this.isConnected = isConnected;
  }
  
  toJSON() {
    return {
      userId: this.userId,
      name: this.name,
      balance: this.balance,
      isReady: this.isReady,
      isConnected: this.isConnected,
      disconnected: this.disconnected || false, // Include disconnected status
      currentBet: this.currentBet,
      mediaPreferences: this.mediaPreferences || {}
    };
  }
}

module.exports = Player;
