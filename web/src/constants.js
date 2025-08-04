/**
 * Frontend Constants - Game logic and UI constants for the web client
 * 
 * ⚠️  SHARED CONSTANTS - Keep synchronized with backend! ⚠️
 * Some constants must match @am-games-api/src/constants.js
 * Any changes to shared constants should be reflected in the backend constants file.
 */

// ========================================
// SHARED CONSTANTS (Frontend + Backend)
// ========================================

/**
 * Game phase constants for consistent phase management across the application
 * 🔄 SHARED: Must match backend GamePhases
 */
export const GamePhases = {
  // Initial phase when waiting for players and anteeing up
  WAITING: 'waiting',
  
  // Phase when cards are being dealt
  DEALING: 'dealing',
  
  // Phase when players are betting
  BETTING: 'betting',
  
  // Phase when middle card is being revealed
  REVEALING: 'revealing',
  
  // Phase when round results are shown
  RESULTS: 'results'
};

/**
 * Core game configuration constants
 * 🔄 SHARED: Must match backend GAME_CONSTANTS
 */
export const GAME_CONSTANTS = {
  // Game configuration
  ANTE_AMOUNT: 1,  // Fixed ante amount - always $1
  STARTING_BALANCE: 2000,  // Starting player balance
  FULL_DECK_SIZE: 52,  // Number of cards in a full deck
  RECONNECTION_TIMEOUT: 30000,  // Time window for player reconnection (30 seconds)
  MAX_SEATS: 16, // Maximum number of seats/players allowed in a game
  
  // Timer durations (in milliseconds)
  // 🔄 SHARED: Backend uses these for game logic, frontend for UI timers
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

// ========================================
// FRONTEND-ONLY CONSTANTS
// ========================================

/**
 * UI Icons used throughout the application
 * 🎨 FRONTEND-ONLY: These are only used for UI display
 */
export const ICONS = {
  POT: '🍯',
  DEALER: '🃏',
  CHECK: '✓',
  DECK: '🃏'
};

// Export specific commonly used constants for convenience
export const { TIMERS, ANTE_AMOUNT, STARTING_BALANCE, FULL_DECK_SIZE, RECONNECTION_TIMEOUT, MAX_SEATS } = GAME_CONSTANTS;