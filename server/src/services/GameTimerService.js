const GAME_CONSTANTS = require('../../../shared/constants/GameConstants');
const { gameLog } = require('../utils/logger');

class GameTimerService {
  constructor() {
    this.timeouts = {};
  }

  clearGameTimeouts(gameId) {
    if (!this.timeouts[gameId]) return;
    
    // Clear all timeouts for this game
    Object.values(this.timeouts[gameId]).forEach(timeout => {
      clearTimeout(timeout);
    });
    
    delete this.timeouts[gameId];
  }

  setDealingTimeout(gameId, callback) {
    this.ensureGameTimeouts(gameId);
    
    // Clear any existing dealing timeout
    if (this.timeouts[gameId].dealing) {
      clearTimeout(this.timeouts[gameId].dealing);
    }
    
    // Set new timeout
    this.timeouts[gameId].dealing = setTimeout(() => {
      callback();
      delete this.timeouts[gameId].dealing;
    }, GAME_CONSTANTS.TIMERS.DEALING_DURATION);
  }

  setBettingTimeout(gameId, callback) {
    this.ensureGameTimeouts(gameId);
    
    // Clear any existing betting timeout
    if (this.timeouts[gameId].betting) {
      clearTimeout(this.timeouts[gameId].betting);
    }
    
    // Set new timeout
    this.timeouts[gameId].betting = setTimeout(() => {
      callback();
      delete this.timeouts[gameId].betting;
    }, GAME_CONSTANTS.TIMERS.BETTING_DURATION);
  }

  setRevealTimeout(gameId, callback) {
    this.ensureGameTimeouts(gameId);
    
    // Clear any existing reveal timeout
    if (this.timeouts[gameId].reveal) {
      clearTimeout(this.timeouts[gameId].reveal);
    }
    
    // Set new timeout
    this.timeouts[gameId].reveal = setTimeout(() => {
      callback();
      delete this.timeouts[gameId].reveal;
    }, GAME_CONSTANTS.TIMERS.DEAL_THIRD_CARD_DELAY);
  }

  setResultsTimeout(gameId, callback) {
    this.ensureGameTimeouts(gameId);
    
    // Clear any existing results timeout
    if (this.timeouts[gameId].results) {
      clearTimeout(this.timeouts[gameId].results);
    }
    
    // Set new timeout
    this.timeouts[gameId].results = setTimeout(() => {
      callback();
      delete this.timeouts[gameId].results;
    }, GAME_CONSTANTS.TIMERS.RESULTS_DURATION);
  }

  ensureGameTimeouts(gameId) {
    if (!this.timeouts[gameId]) {
      this.timeouts[gameId] = {};
    }
  }
}

module.exports = new GameTimerService();
