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
    this.balance = 0;
    this.isReady = false;
    this.isConnected = true;
    this.disconnected = false;
    this.disconnectedAt = null;
    this.currentBet = 0;
    this.joinedAt = Date.now();
    this.profileImg = null;
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
  
  toJSON() {
    return {
      userId: this.userId,
      name: this.name,
      balance: this.balance,
      isReady: this.isReady,
      isConnected: this.isConnected,
      disconnected: this.disconnected,
      disconnectedAt: this.disconnectedAt,
      currentBet: this.currentBet,
      profileImg: this.profileImg
    };
  }
}

module.exports = Player;
