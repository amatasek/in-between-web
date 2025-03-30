const { STARTING_BALANCE } = require('../constants/GameConstants');

/**
 * Player Model - Manages player state and actions
 */
class Player {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.balance = STARTING_BALANCE; // Starting chips from constants
    this.isReady = false;
    this.isConnected = true;
    this.currentBet = 0;
    this.joinedAt = Date.now();
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
  
  addChips(amount) {
    const currentBalance = Number(this.balance || 0);
    this.balance = currentBalance + Number(amount);
  }
  
  removeChips(amount) {
    const currentBalance = Number(this.balance || 0);
    if (currentBalance < amount) {
      return false;
    }
    this.balance = currentBalance - Number(amount);
    return true;
  }
  
  setReady(isReady) {
    this.isReady = isReady;
  }
  
  setConnected(isConnected) {
    this.isConnected = isConnected;
  }
  
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      balance: this.balance,
      isReady: this.isReady,
      isConnected: this.isConnected,
      currentBet: this.currentBet
    };
  }
}

module.exports = Player;
