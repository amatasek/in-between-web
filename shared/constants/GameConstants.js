/**
 * Game Constants - Defines fixed values used throughout the game
 * This is a shared constants file used by both server and client
 * Supports both ES modules (for Vite/client) and CommonJS (for Node.js/server)
 */

const GAME_CONSTANTS = {
  // Game configuration
  ANTE_AMOUNT: 1,  // Fixed ante amount - always $1
  STARTING_BALANCE: 2000,  // Starting player balance
  FULL_DECK_SIZE: 52,  // Number of cards in a full deck
  RECONNECTION_TIMEOUT: 30000,  // Time window for player reconnection (30 seconds)
  MAX_SEATS: 16, // Maximum number of seats/players allowed in a game
  
  // Timer durations (in milliseconds)
  TIMERS: {
    DEAL_FIRST_CARD_DELAY: 1000,    // Delay before dealing the first card (1 second)
    DEAL_SECOND_CARD_DELAY: 1000,   // Delay before dealing the second card (1 second)
    DEAL_THIRD_CARD_DELAY: 2000,    // Delay before revealing the third card (2 seconds)
    DEALING_DURATION: 3000,         // Total duration of dealing phase (3 seconds)
    BETTING_DURATION: 30000,        // Duration for betting phase (30 seconds)
    DECISION_DURATION: 15000,       // Duration for ace and second chance decisions (15 seconds)
    REVEALING_DURATION: 3000,       // Duration for revealing phase
    RESULTS_DURATION: 5000,         // Duration to show results before moving to next round (5 seconds)
    PLAYER_INACTIVITY_TIMEOUT: 30000//Timeout for inactive players in WAITING phase
  }
};

// Dual module support - cleaner implementation
// For ES modules (Vite/client)
export default GAME_CONSTANTS;
export const { TIMERS, ANTE_AMOUNT, STARTING_BALANCE, FULL_DECK_SIZE, RECONNECTION_TIMEOUT, MAX_SEATS } = GAME_CONSTANTS;

// For CommonJS (Node.js/server)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = GAME_CONSTANTS;
}
