// Import the shared type definitions
/** @typedef {import('../../../shared/types').GameState} GameState */
/** @typedef {import('../../../shared/types').Card} Card */
/** @typedef {import('../../../shared/types').Player} Player */
/** @typedef {import('../../../shared/types').Dealer} Dealer */

// Import game constants
const { GamePhases } = require('../../../shared/constants/GamePhases');
const { ANTE_AMOUNT, STARTING_BALANCE, FULL_DECK_SIZE } = require('../../../shared/constants/GameConstants');

/**
 * Creates a new game state object
 * @param {string} id - Game ID
 * @param {string} hostId - Host player ID
 * @param {string} hostName - Host player name
 * @returns {GameState} New game state
 */
function createGameState(id, hostId, hostName) {
  /** @type {GameState} */
  const gameState = {
    id,
    phase: GamePhases.WAITING, // Always start in the WAITING phase
    players: {
      [hostId]: {
        id: hostId,
        name: hostName,
        score: STARTING_BALANCE, // Starting score from constants
        isReady: false,
        isDealer: true, // Host starts as dealer
        isActive: true
      }
    },
    currentPlayerId: null,
    dealer: {
      id: hostId,
      name: hostName
    },
    dealerChanged: false,
    deckNumber: 1,
    remainingCards: FULL_DECK_SIZE, // Start with a full deck
    // Individual card objects instead of an array for sequential dealing
    firstCard: null,  // Left card (dealt first)
    secondCard: null, // Right card (dealt second)
    thirdCard: null,  // Middle card (dealt last during reveal)
    pot: 0,
    anteAmount: ANTE_AMOUNT, // Fixed ante amount from constants
    winner: null,
    startTime: Date.now(),
    lastActivity: Date.now()
  };
  
  return gameState;
}

module.exports = {
  createGameState
};
