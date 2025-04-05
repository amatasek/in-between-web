/**
 * @typedef {Object} GameListItem
 * @property {string} id - The unique game ID
 * @property {number} playerCount - Number of players in the game
 * @property {number} startTime - When the game was created
 * @property {string} status - The game's current status
 */

/**
 * @typedef {Object} LobbyState
 * @property {Array<GameListItem>} games - List of available games
 * @property {string|null} playerName - Current player's name
 * @property {string|null} gameId - ID of the game the player is trying to join/create
 * @property {string|null} error - Any error message to display
 * @property {boolean} isConnected - Whether the client is connected to the server
 */

module.exports = {};
