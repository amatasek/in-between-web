/**
 * Logger utility for consistent game logging with game ID prefixes
 */

/**
 * Log a message with game ID prefix
 * @param {Game|string} gameOrId - Game object or game ID
 * @param {string} message - Message to log
 */
function gameLog(gameOrId, message) {
  // Extract game ID
  let gameId;
  if (typeof gameOrId === 'string') {
    gameId = gameOrId;
  } else if (gameOrId && gameOrId.id) {
    gameId = gameOrId.id;
  } else {
    gameId = 'UNKNOWN_GAME';
  }
  
  // Log with game ID prefix
  console.log(`[GAME:${gameId}] ${message}`);
}

/**
 * Log an error with game ID prefix
 * @param {Game|string} gameOrId - Game object or game ID
 * @param {string} message - Error message
 * @param {Error} [error] - Optional error object
 */
function gameError(gameOrId, message, error) {
  // Extract game ID
  let gameId;
  if (typeof gameOrId === 'string') {
    gameId = gameOrId;
  } else if (gameOrId && gameOrId.id) {
    gameId = gameOrId.id;
  } else {
    gameId = 'UNKNOWN_GAME';
  }
  
  // Log error with game ID prefix
  console.error(`[ERROR:${gameId}] ${message}`);
  
  // Log stack trace if error object provided
  if (error && error.stack) {
    console.error(error.stack);
  }
}

module.exports = {
  gameLog,
  gameError
};
