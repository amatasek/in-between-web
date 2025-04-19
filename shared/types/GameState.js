/** @typedef {import('./Card').Card} Card */
/** @typedef {import('./Player').Player} Player */

/**
 * @typedef {'waiting' | 'dealing' | 'betting' | 'revealing' | 'results'} GamePhase
 */

/**
 * @typedef {Object} Dealer
 * @property {string} id - The dealer's player ID
 * @property {string} name - The dealer's name
 */

/**
 * @typedef {Object} Winner
 * @property {string} id - The winner's player ID
 * @property {string} name - The winner's name
 * @property {number} winAmount - The amount won
 */

/**
 * @typedef {Object.<string, Player>} Players
 */

/**
 * @typedef {Object} GameState
 * @property {string} id - The unique game ID
 * @property {GamePhase} phase - The current phase of the game
 * @property {Players} players - Object mapping player IDs to Player objects
 * @property {string} currentPlayerId - ID of the player whose turn it is
 * @property {Dealer} dealer - The current dealer
 * @property {number} deckNumber - The current deck number (increments when a new deck is used)
 * @property {number} remainingCards - Number of cards remaining in the current deck
 * @property {Array<Card>} currentCards - The current cards in play [left, right, middle]
 * @property {number} pot - The current pot amount
 * @property {number} anteAmount - The ante amount required to play
 * @property {Winner|null} winner - The winner of the current round, if any
 * @property {number} startTime - When the game was created (timestamp)
 * @property {number} lastActivity - Last activity timestamp
 */

module.exports = {};
