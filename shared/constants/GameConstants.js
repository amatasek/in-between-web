/**
 * Game Constants - Defines fixed values used throughout the game
 * This is a shared constants file used by both server and client
 */

const GAME_CONSTANTS = {
  // Game configuration
  ANTE_AMOUNT: 1,  // Fixed ante amount - always $1
  STARTING_BALANCE: 20,  // Starting player balance - $20
  FULL_DECK_SIZE: 52,  // Number of cards in a full deck
  
  // Timer durations (in milliseconds)
  TIMERS: {
    DEAL_FIRST_CARD_DELAY: 1000,    // Delay before dealing the first card (1 second)
    DEAL_SECOND_CARD_DELAY: 1000,   // Delay before dealing the second card (1 second)
    DEAL_THIRD_CARD_DELAY: 2000,    // Delay before revealing the third card (2 seconds)
    DEALING_DURATION: 3000,         // Total duration of dealing phase (3 seconds)
    BETTING_DURATION: 30000,        // Duration for betting phase (30 seconds)
    REVEALING_DURATION: 3000,       // Duration for revealing phase
    RESULTS_DURATION: 5000          // Duration to show results before moving to next round (5 seconds)
  }
};

// Support both CommonJS and ES modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = GAME_CONSTANTS;
} else if (typeof exports !== 'undefined') {
  exports.TIMERS = GAME_CONSTANTS.TIMERS;
  exports.default = GAME_CONSTANTS;
} else {
  globalThis.GAME_CONSTANTS = GAME_CONSTANTS;
}
