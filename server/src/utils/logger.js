/**
 * Logger utility for consistent game logging with game ID prefixes
 */

/**
 * Log a message with game ID prefix
 * @param {Game|string} gameOrId - Game object or game ID
 * @param {string} message - Message to log
 */
function gameLog(gameOrId, message) {
  // Extract game ID and game object
  let gameId;
  let gameObj = null;
  
  if (typeof gameOrId === 'string') {
    gameId = gameOrId;
  } else if (gameOrId && gameOrId.id) {
    gameId = gameOrId.id;
    gameObj = gameOrId;
  } else {
    gameId = 'UNKNOWN_GAME';
  }
  
  // Log with game ID prefix
  console.log(`[GAME:${gameId}] ${message}`);
  
  // Add to game log array if we have a game object
  if (gameObj && typeof message === 'string') {
    // Create log entry with timestamp
    const logEntry = {
      timestamp: Date.now(),
      message: message
    };
    
    // Initialize gameLog array if it doesn't exist
    if (!gameObj.gameLog) {
      gameObj.gameLog = [];
    }
    
    // Add to beginning of array so newest entries are first
    gameObj.gameLog.unshift(logEntry);
    
    // Limit the number of log entries to prevent excessive memory usage
    const maxEntries = gameObj.maxLogEntries || 50;
    if (gameObj.gameLog.length > maxEntries) {
      gameObj.gameLog = gameObj.gameLog.slice(0, maxEntries);
    }
  }
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
