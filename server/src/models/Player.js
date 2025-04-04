const { STARTING_BALANCE } = require('../../../shared/constants/GameConstants');

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
    // Media preferences are now handled entirely through HTTP routes
  }

  async loadBalance() {
    if (!this.userId) return false;
    try {
      const balanceService = serviceRegistry.get('balance');
      if (!balanceService) {
        console.error('[Player] Balance service not found in registry');
        return false;
      }
      
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
  
  // Balance methods moved to BalanceService
  
  // Balance methods moved to BalanceService
  
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
