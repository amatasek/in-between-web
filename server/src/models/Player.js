const { STARTING_BALANCE } = require('../../../shared/constants/GameConstants');
const balanceService = require('../services/BalanceService');

/**
 * Player Model - Manages player state and actions
 */
class Player {
  constructor(id, name, userId) {
    this.id = id;           // Socket ID
    this.userId = userId;    // Database User ID
    this.name = name;
    this.balance = 0;       // Will be loaded from database
    this.isReady = false;
    this.isConnected = true;
    this.currentBet = 0;
    this.joinedAt = Date.now();
  }

  async loadBalance() {
    if (!this.userId) return false;
    try {
      this.balance = await balanceService.getBalance(this.userId);
      return true;
    } catch (error) {
      console.error('[Player] Error loading balance:', error);
      return false;
    }
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
  
  async addChips(amount, reason) {
    if (!this.userId) return false;
    try {
      const result = await balanceService.updateBalance(this.userId, amount, reason);
      this.balance = result.balance;
      return true;
    } catch (error) {
      console.error('[Player] Error adding chips:', error);
      return false;
    }
  }
  
  async removeChips(amount, reason) {
    if (!this.userId) return false;
    try {
      const result = await balanceService.updateBalance(this.userId, -amount, reason);
      this.balance = result.balance;
      return true;
    } catch (error) {
      console.error('[Player] Error removing chips:', error);
      return false;
    }
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
      userId: this.userId,
      name: this.name,
      balance: this.balance,
      isReady: this.isReady,
      isConnected: this.isConnected,
      currentBet: this.currentBet
    };
  }
}

module.exports = Player;
