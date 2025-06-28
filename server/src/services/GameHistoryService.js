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

/**
 * GameHistoryService - Manages the storage of completed games for historical analysis
 */
class GameHistoryService extends BaseService {
  constructor() {
    super();
    this.initializeDatabase();
  }

  /**
   * Initialize the game history database
   */
  initializeDatabase() {
    try {
      // Create a new PouchDB instance
      this.gameHistoryDb = new PouchDB(historyDbPath);
      console.log('[GAME_HISTORY_SERVICE] Successfully initialized database at:', historyDbPath);

      // Test database connection
      this.gameHistoryDb.info()
        .then(info => {
          console.log('[GAME_HISTORY_SERVICE] Database info:', info);
        })
        .catch(error => {
          console.error('[GAME_HISTORY_SERVICE] Database connection error:', error);
          // Try to recreate database if there's an error
          this.gameHistoryDb = new PouchDB(historyDbPath);
        });
    } catch (error) {
      console.error('[GAME_HISTORY_SERVICE] Failed to initialize database:', error);
    }
  }

  /**
   * Clean up database connections
   */
  async cleanup() {
    if (this.gameHistoryDb) {
      try {
        await this.gameHistoryDb.close();
        console.log('[GAME_HISTORY_SERVICE] Database connection closed');
      } catch (error) {
        console.error('[GAME_HISTORY_SERVICE] Error closing database:', error);
      }
    }
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

      return await this.gameHistoryDb.put(gameHistoryDoc);
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
    if (!game) return true;
    
    // Check if game is at round 1 (no rounds completed)
    const isFirstRound = game.round === 1 || game.round === 0;
    
    // Check if pot is 0 (no money exchanged)
    const hasNoPot = game.pot === 0;
    
    // Check if no bets were placed in the game transaction log
    let hasBets = false;
    
    // Only proceed checking transactions if we have them as an array
    if (Array.isArray(game.gameTransactions) && game.gameTransactions.length > 0) {
      // Look through all transactions
      game.gameTransactions.forEach(tx => {
        // Check if any transactions were betting-related
        if (tx.reason && (
            tx.reason.includes('bet') || 
            tx.reason.includes('Bet') || 
            tx.reason.includes('win') ||
            tx.reason.includes('Win')
        )) {
          hasBets = true;
        }
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
    // Create a deep copy of the game object
    const gameCopy = JSON.parse(JSON.stringify(game, (key, value) => {
      // Exclude functions during serialization
      if (typeof value === 'function') {
        return undefined;
      }
      return value;
    }));
    
    // Ensure gameTransactions is a valid array
    if (!gameCopy.gameTransactions || !Array.isArray(gameCopy.gameTransactions)) {
      gameCopy.gameTransactions = [];
    }
    
    // Ensure all transactions have the standardized fields
    if (gameCopy.gameTransactions.length > 0) {
      const Transaction = require('../models/Transaction');
      
      // Process each transaction to ensure it has all required fields including potAmount
      gameCopy.gameTransactions = gameCopy.gameTransactions.map(tx => {
        // Always create a standardized transaction to ensure all fields are present
        // This ensures new fields like potAmount are included in all transactions
        return new Transaction(tx).toJSON();
      });
      
      // Make sure transactions are sorted by timestamp
      gameCopy.gameTransactions.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    }
    
    return gameCopy;
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
    
    // Transactions are already an array, so just sort them
    const sortedTransactions = [...game.gameTransactions].sort((a, b) => {
      return new Date(a.timestamp) - new Date(b.timestamp);
    });
    
    // Extract player information from each transaction
    sortedTransactions.forEach(tx => {
      if (tx.playerId && tx.playerName) {
        result.uniquePlayers.set(tx.playerId, tx.playerName);
      }
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
      const result = await this.gameHistoryDb.allDocs({
        include_docs: true,
      });
      
      // Filter games where the player participated
      const playerLowerCase = playerName.toLowerCase();
      const allMatchingGames = result.rows.map(row => row.doc).filter(game => {
        // Skip games with no allPlayers array
        if (!Array.isArray(game.allPlayers)) return false;
        
        // CHECK 1: Look for exact match in allPlayers array
        if (game.allPlayers.some(name => name && name.toLowerCase() === playerLowerCase)) {
          return true;
        }
        
        // CHECK 2: Look for player in game transactions
        const gameData = game.gameData || {};
        let gameTransactions = [];
        
        if (Array.isArray(gameData.gameTransactions)) {
          gameTransactions = gameData.gameTransactions;
        } else if (gameData.gameTransactions && typeof gameData.gameTransactions === 'object') {
          Object.values(gameData.gameTransactions).forEach(txArray => {
            if (Array.isArray(txArray)) gameTransactions = gameTransactions.concat(txArray);
          });
        }
        
        if (gameTransactions.some(tx => tx && tx.playerName && tx.playerName.toLowerCase() === playerLowerCase)) {
          return true;
        }
        
        // CHECK 3: Check the players object
        const players = gameData.players || game.players || {};
        return Object.values(players).some(player => player && player.name && 
          player.name.toLowerCase() === playerLowerCase);
      });
      
      // Sort games by end date (most recent first)
      allMatchingGames.sort((a, b) => {
        const dateA = new Date(a.endedAt || a.createdAt || 0);
        const dateB = new Date(b.endedAt || b.createdAt || 0);
        return dateB - dateA; // Descending order (most recent first)
      });
      
      // Apply pagination to filtered and sorted results
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
