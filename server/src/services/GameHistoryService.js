const PouchDB = require('pouchdb');
const path = require('path');
const fs = require('fs');
const BaseService = require('./BaseService');
const config = require('../config');

// Ensure the database directory exists
const historyDbPath = path.resolve(config.dbPath, 'game-history');
if (!fs.existsSync(historyDbPath)) {
  console.log(`[DB] Creating game history database directory: ${historyDbPath}`);
  fs.mkdirSync(historyDbPath, { recursive: true });
}

// Create the game history database
const gameHistoryDb = new PouchDB(historyDbPath);

/**
 * GameHistoryService - Manages the storage of completed games for historical analysis
 */
class GameHistoryService extends BaseService {
  constructor() {
    super();
  }

  /**
   * Archive a completed game to the history database with additional metadata
   * @param {Object} game - The game to archive
   * @returns {Promise<Object>} - The result of the archiving operation
   */
  async archiveGame(game) {
    if (!game || !game.id) {
      console.error('[GAME_HISTORY_SERVICE] Cannot archive game: Invalid game object');
      return null;
    }

    // Skip archiving empty games with no meaningful activity
    if (this.isEmptyGame(game)) {
      console.log(`[GAME_HISTORY_SERVICE] Skipping archival of empty game ${game.id}`);
      return { skipped: true, reason: 'empty_game' };
    }

    try {
      console.log(`[GAME_HISTORY_SERVICE] Archiving game ${game.id} to history`);
      
      // Get transaction log data for timestamps and player information
      const transactionData = this.extractDataFromTransactions(game);
      
      // Create a plain object copy of the game for PouchDB
      const gameHistoryDoc = {
        _id: game.id,
        gameData: this.prepareGameDataForArchive(game),
        // Historical metadata using transaction log as source of truth
        createdAt: transactionData.createdAt,
        endedAt: transactionData.endedAt,
        totalPlayerCount: transactionData.uniquePlayers.size,
        allPlayers: Array.from(transactionData.uniquePlayers.values()),
        roundCount: game.round
      };

      return await gameHistoryDb.put(gameHistoryDoc);
    } catch (error) {
      console.error(`[GAME_HISTORY_SERVICE] Error archiving game ${game.id}:`, error);
      return null;
    }
  }
  
  /**
   * Check if a game is "empty" with no meaningful activity
   * @param {Object} game - The game to check
   * @returns {Boolean} - True if the game is empty and shouldn't be archived
   */
  isEmptyGame(game) {
    // Check if game is at round 1 (no rounds completed)
    const isFirstRound = game.round === 1 || game.round === 0;
    
    // Check if pot is 0 (no money exchanged)
    const hasNoPot = game.pot === 0;
    
    // Check if no bets were placed in the game transaction log
    let hasBets = false;
    
    // Only proceed checking transactions if we have them
    if (game.gameTransactions && Object.keys(game.gameTransactions).length > 0) {
      // Look through all player transactions
      Object.values(game.gameTransactions).forEach(playerTxs => {
        // Check if any transactions were betting-related
        playerTxs.forEach(tx => {
          if (tx.reason && (
              tx.reason.includes('bet') || 
              tx.reason.includes('Bet') || 
              tx.reason.includes('ante') || 
              tx.reason.includes('Ante') ||
              tx.reason.includes('win') ||
              tx.reason.includes('Win')
          )) {
            hasBets = true;
          }
        });
      });
    }
    
    // A game is considered empty if it's in round 1, has no pot, and no bets placed
    return isFirstRound && hasNoPot && !hasBets;
  }

  /**
   * Prepares the game data for archiving by creating a deep copy
   * without function properties and handling circular references
   * @param {Object} game - The game object to prepare
   * @returns {Object} - Prepared game data
   */
  prepareGameDataForArchive(game) {
    // Create a deep copy without functions and circular references
    return JSON.parse(JSON.stringify(game, (key, value) => {
      // Exclude functions during serialization
      if (typeof value === 'function') {
        return undefined;
      }
      return value;
    }));
  }

  /**
   * Extract key data from the game's transaction log
   * @param {Object} game - The game object
   * @returns {Object} - Object containing createdAt, endedAt, and uniquePlayers
   */
  extractDataFromTransactions(game) {
    // Initialize default values
    const result = {
      createdAt: game.createdAt || game.created || new Date().toISOString(),
      endedAt: new Date().toISOString(),
      uniquePlayers: new Map() // Map of player IDs to names
    };
    
    // If game has no transactions, return default values
    if (!game.gameTransactions || Object.keys(game.gameTransactions).length === 0) {
      // If we have players but no transactions, at least capture current player names
      if (game.players) {
        Object.values(game.players).forEach(player => {
          if (player.userId && player.name) {
            result.uniquePlayers.set(player.userId, player.name);
          }
        });
      }
      return result;
    }
    
    // Collect all transactions from the gameTransactions object
    const allTransactions = [];
    Object.entries(game.gameTransactions).forEach(([playerId, playerTransactions]) => {
      playerTransactions.forEach(transaction => {
        allTransactions.push(transaction);
        
        // Extract player information from each transaction
        if (transaction.playerId && transaction.playerName) {
          result.uniquePlayers.set(transaction.playerId, transaction.playerName);
        }
      });
    });
    
    // Sort all transactions by timestamp
    const sortedTransactions = allTransactions.sort((a, b) => {
      return new Date(a.timestamp) - new Date(b.timestamp);
    });
    
    // Get timestamps from first and last transactions
    if (sortedTransactions.length > 0) {
      result.createdAt = sortedTransactions[0].timestamp;
      result.endedAt = sortedTransactions[sortedTransactions.length - 1].timestamp;
    }
    
    return result;
  }



  /**
   * Get a page of historical games for a specific player
   * @param {Object} options - Query options
   * @param {Number} options.limit - Maximum number of results to return (default: 10)
   * @param {Number} options.skip - Number of results to skip for pagination (default: 0)
   * @param {String} options.playerName - Player name to filter games by (required)
   * @returns {Promise<Object>} - Object containing games array and pagination info
   */
  async getPagedHistoricalGames(options = {}) {
    // Set default pagination values
    const limit = options.limit || 10;
    const skip = options.skip || 0;
    const playerName = options.playerName;
    
    // Require playerName parameter
    if (!playerName) {
      console.warn('[GAME_HISTORY_SERVICE] Player name is required for historical games query');
      return {
        games: [],
        pagination: {
          limit,
          skip,
          count: 0,
          error: 'Player name is required'
        }
      };
    }
    
    try {
      console.log(`[GAME_HISTORY_SERVICE] Retrieving historical games for player: ${playerName}`);
      
      // Get all games from the database with pagination
      const result = await gameHistoryDb.allDocs({
        include_docs: true,
        limit: 100, // Get more results to filter from
        skip: 0
      });
      
      // Filter games where the player participated
      const allMatchingGames = result.rows.map(row => row.doc).filter(game => {
        return Array.isArray(game.allPlayers) && 
               game.allPlayers.some(name => 
                 name.toLowerCase().includes(playerName.toLowerCase()));
      });
      
      // Apply pagination to filtered results
      const paginatedGames = allMatchingGames.slice(skip, skip + limit);
      
      console.log(`[GAME_HISTORY_SERVICE] Retrieved ${paginatedGames.length} historical games out of ${allMatchingGames.length} matches`);
      
      // Return both games and pagination info
      return {
        games: paginatedGames,
        pagination: {
          limit,
          skip,
          count: paginatedGames.length,
          total: allMatchingGames.length
        }
      };
    } catch (error) {
      console.error('[GAME_HISTORY_SERVICE] Error retrieving historical games:', error);
      // Return consistent structure even on error
      return {
        games: [],
        pagination: {
          limit,
          skip,
          count: 0,
          error: error.message
        }
      };
    }
  }
}

module.exports = new GameHistoryService();
