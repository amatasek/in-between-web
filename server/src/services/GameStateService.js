const BaseService = require('./BaseService');
const { GamePhases } = require('../../../shared/constants/GamePhases');
const Game = require('../models/Game');
const { gameLog } = require('../utils/logger');

class GameStateService extends BaseService {
  constructor() {
    super();
    this.games = {};
    this.initialized = false;
  }
  
  /**
   * Initialize the service - called after all services are registered
   */
  async init() {
    if (this.initialized) return;
    
    console.log('[GAME_STATE_SERVICE] Initializing GameStateService');
    
    // Load existing games from the database
    await this.loadGamesFromDatabase();
    
    this.initialized = true;
    console.log('[GAME_STATE_SERVICE] Initialization complete');
  }
  


  /**
   * Register socket event handlers for game-related events
   * @param {Socket} socket - The socket to register handlers for
   */
  registerSocketEvents(socket) {
    socket.on('getGameList', () => this.handleGetGameList(socket));
  }

  /**
   * Send the current list of games to a specific client
   * @param {Socket} socket - The socket to send the game list to
   */
  handleGetGameList(socket) {
    if (!socket) return;

    const gameList = this.getAvailableGames();
    socket.emit('gameList', gameList);
  }
  
  /**
   * Get a game by ID, either from memory cache or database
   * @param {string} gameId - The ID of the game to get
   * @param {boolean} [forceRefresh=false] - If true, forces a database refresh even if in cache
   * @returns {Promise<Game|null>} The game, or null if not found
   */
  async getGame(gameId, forceRefresh = false) {
    if (!gameId) {
      console.error('[GAME_STATE_SERVICE] Attempted to get game with undefined ID');
      return null;
    }

    // First check in-memory cache unless forced refresh
    if (!forceRefresh && this.games[gameId]) {
      return this.games[gameId];
    }

    // If not in memory or forced refresh, try to get from database
    const databaseService = this.getService('database');
    try {
      const gameData = await databaseService.getGame(gameId);
      if (gameData) {
        // Hydrate the game and store in memory for future access
        const hydratedGame = this.hydrateGame(gameData);
        if (hydratedGame) {
          this.games[gameId] = hydratedGame;
          console.log(`[GAME_STATE_SERVICE] ${forceRefresh ? 'Refreshed' : 'Loaded'} game ${gameId} from database`);
          return hydratedGame;
        } else {
          console.error(`[GAME_STATE_SERVICE] Failed to hydrate game ${gameId} from database`);
        }
      } else {
        console.log(`[GAME_STATE_SERVICE] Game ${gameId} not found in database`);
      }
    } catch (error) {
      console.error(`[GAME_STATE_SERVICE] Error getting game ${gameId} from database:`, error);
    }

    // If game not found in cache or database, or if hydration failed
    if (this.games[gameId] && forceRefresh) {
      // If we failed to refresh but have a cached version, use that
      console.log(`[GAME_STATE_SERVICE] Using cached version of game ${gameId} after failed refresh`);
      return this.games[gameId];
    }
    
    return null;
  }

  /**
   * Create a new game with the specified settings
   * @param {Object} settings - Game settings
   * @returns {Promise<Object>} The created game
   */
  async createGame(settings) {
    const game = new Game(settings);
    this.games[game.id] = game;
    gameLog(game, `New game created with id: ${game.id}`);

    // Initialize the deck during game creation
    const cardService = this.getService('card');
    game.deck = cardService.shuffleDeck(cardService.createDeck());  
    gameLog(game, `Deck with ${game.deck.length} cards shuffled`);
    
    // Immediately save to database to ensure persistence
    await this.saveGame(game);
    console.log(`[GAME_STATE_SERVICE] Game ${game.id} saved to database after creation`);
    
    return game;
  }

  /**
   * Save the game state
   * @param {Object} game - The game to save
   * @param {boolean} [updateCache=true] - Whether to update the in-memory cache
   * @returns {Promise<Object>} The saved game
   */
  async saveGame(game, updateCache = true) {
    if (!game || !game.id) {
      console.error('[GAME_STATE_SERVICE] Attempted to save invalid game object');
      return Promise.resolve(game);
    }
    
    // Ensure game timestamp is updated
    if (typeof game.updateTimestamp === 'function') {
      game.updateTimestamp();
    }
    
    // Update in-memory cache if requested
    if (updateCache) {
      this.games[game.id] = game;
    }
    
    // Perform database persistence
    try {
      const databaseService = this.getService('database');
      await databaseService.saveGame(game);
      return game;
    } catch (error) {
      console.error(`[GAME_STATE_SERVICE] Error saving game ${game.id} to database:`, error);
      // Still return the game even if save failed - in-memory operations can continue
      return game;
    }
  }

  prepareForDeal(game) {
    if (!game) return game;
    
    // Reset game state
    game.result = null;
    game.thirdCard = null;
    game.firstCard = null;
    game.secondCard = null;
    game.phase = GamePhases.DEALING;
    
    // Capture players who anted for this round with their seat positions
    game.antedPlayersForRound = game.getAntedPlayersInOrder().map(userId => {
      const seatIndex = game.seats.indexOf(userId);
      return {
        userId,
        seatIndex,
        name: game.players[userId]?.name || 'Unknown'
      };
    });
    
    console.log(`[GAME_STATE] Captured ${game.antedPlayersForRound.length} players for round ${game.round}:`, 
      game.antedPlayersForRound.map(p => `${p.name} (seat ${p.seatIndex})`));
    
    game.updateTimestamp();
    return game;
  }



  /**
   * Remove a game from memory and database
   * Archives the game to history before removal
   * @param {string} gameId - The ID of the game to remove
   * @returns {Promise<boolean>} Success status of the removal
   */
  async removeGame(gameId) {
    if (!gameId) {
      console.error('[GAME_STATE_SERVICE] Attempted to remove game with undefined ID');
      return false;
    }
    
    console.log(`[GAME_STATE_SERVICE] Removing game ${gameId}`);
    
    try {
      // Get the game data before we remove it
      const game = this.games[gameId];
      
      if (game) {
        // Archive the game to history before removing it
        const gameHistoryService = this.getService('gameHistory');
        await gameHistoryService.archiveGame(game);
        console.log(`[GAME_STATE_SERVICE] Game ${gameId} archived to history`);
      } else {
        console.warn(`[GAME_STATE_SERVICE] Game ${gameId} not found in memory cache, cannot archive`);
      }
      
      // Remove from in-memory cache
      delete this.games[gameId];
      
      // Remove from database
      const databaseService = this.getService('database');
      await databaseService.deleteGame(gameId);
      return true;
    } catch (error) {
      console.error(`[GAME_STATE_SERVICE] Error removing game ${gameId}:`, error);
      return false;
    }
  }

  getAvailableGames() {
    const games = Object.values(this.games).map(game => {
      // First, clean up any duplicate players by userId
      this.cleanupDuplicatePlayers(game);
      
      // Calculate player count based on connected players only
      // A player is considered connected if isConnected is true AND disconnected is not true
      const connectedPlayerCount = Object.values(game.players)
        .filter(player => player.isConnected && !player.disconnected)
        .length;
      
      // Get list of disconnected players (userId and name) for the game list UI
      const disconnectedPlayers = Object.values(game.players)
        .filter(player => player.disconnected)
        .map(player => ({
          userId: player.userId,
          name: player.name
        }));
      
      // Get list of all players (connected and disconnected) for the game list UI
      // This allows the UI to identify games the current user is in
      const allPlayers = Object.values(game.players)
        .map(player => ({
          userId: player.userId,
          name: player.name,
          disconnected: player.disconnected === true
        }));
      
      return {
        id: game.id,
        playerCount: connectedPlayerCount,
        phase: game.phase,
        pot: game.pot,
        settings: game.settings && typeof game.settings.toJSON === 'function' ? game.settings.toJSON() : game.settings,
        disconnectedPlayers: disconnectedPlayers,
        allPlayers: allPlayers
      };
    });
    
    // Removed verbose game state log
    
    return games;
  }
  
  /**
   * Clean up duplicate players in a game by userId
   * This ensures that when a player refreshes, we don't count them twice
   * @param {Object} game - The game to clean up
   */
  cleanupDuplicatePlayers(game) {
    if (!game || !game.players) return;
    
    // Group players by userId
    const playersByUserId = {};
    const playersToRemove = [];
    
    // First pass: group players by userId and find duplicates
    for (const playerId in game.players) {
      const player = game.players[playerId];
      if (!player.userId) continue; // Skip players without userId
      
      if (!playersByUserId[player.userId]) {
        playersByUserId[player.userId] = [];
      }
      
      playersByUserId[player.userId].push({
        playerId,
        player,
        joinedAt: player.joinedAt || 0
      });
    }
    
    // Second pass: identify duplicates to remove (keep most recent)
    for (const userId in playersByUserId) {
      const players = playersByUserId[userId];
      
      if (players.length > 1) {
        console.log(`[GAME_STATE_SERVICE] Found ${players.length} instances of userId ${userId} in game ${game.id}`);
        
        // Sort by joinedAt (descending) to keep the most recent player
        players.sort((a, b) => b.joinedAt - a.joinedAt);
        
        // Mark all but the most recent for removal
        for (let i = 1; i < players.length; i++) {
          playersToRemove.push(players[i].playerId);
        }
      }
    }
    
    // Third pass: remove duplicates
    for (const playerId of playersToRemove) {
      console.log(`[GAME_STATE_SERVICE] Removing duplicate player ${playerId} from game ${game.id}`);
      
      // Remove from players object
      delete game.players[playerId];
      
      // Remove from seats array
      const seatIndex = game.seats.indexOf(playerId);
      if (seatIndex !== -1) {
        game.seats[seatIndex] = null;
      }
    }
  }

  /**
   * Hydrate a game object from database data
   * @param {Object} gameData - Raw game data from database
   * @returns {Game} - Properly hydrated Game instance
   */
  hydrateGame(gameData) {
    try {
      if (!gameData) return null;
      
      // Get required models
      const Game = require('../models/Game');
      const Player = require('../models/Player');
      const Settings = require('../models/Settings');
      const gameId = gameData.id || gameData._id;
      
      // Reconstruct settings object
      const settingsInstance = gameData.settings 
        ? new Settings(gameData.settings) 
        : new Settings();
      
      // Create a new Game instance with reconstructed settings
      const game = new Game(settingsInstance);
      
      // Copy basic properties (excluding special properties)
      Object.entries(gameData).forEach(([key, value]) => {
        if (!['_id', '_rev', 'players', 'settings', 'gameLog', 'gameTransactions'].includes(key)) {
          game[key] = value;
        }
      });
      
      // Ensure the game has the correct ID
      game.id = gameId;
      
      // Hydrate players if they exist
      if (gameData.players) {
        game.players = {};
        
        Object.entries(gameData.players).forEach(([playerId, playerData]) => {
          // Create a new Player instance
          const player = new Player(
            playerData.userId || playerId,
            playerData.name,
            playerData.socketId
          );
          
          // Copy all player properties except methods
          Object.entries(playerData).forEach(([key, value]) => {
            if (key !== 'toJSON') {
              player[key] = value;
            }
          });
          
          // Add player to game
          game.players[playerId] = player;
        });
      }
      
      // Copy arrays and objects using spread to avoid reference issues
      if (gameData.gameLog) game.gameLog = [...gameData.gameLog];
      if (gameData.gameTransactions) game.gameTransactions = {...gameData.gameTransactions};
      
      console.log(`[GAME_STATE_SERVICE] Successfully hydrated game ${gameId}`);
      return game;
    } catch (error) {
      console.error('[GAME_STATE_SERVICE] Error hydrating game:', error);
      return null;
    }
  }
  
  /**
   * Load all games from the database into memory
   * @returns {Promise<void>}
   */
  async loadGamesFromDatabase() {
    try {
      const databaseService = this.getService('database');
      const games = await databaseService.getAllGames();
      
      console.log(`[GAME_STATE_SERVICE] Loading ${games.length} games from database`);
      
      // Use Promise.all to process games in parallel for better performance
      const hydratedGames = await Promise.all(
        games.map(async (gameData) => {
          try {
            return this.hydrateGame(gameData);
          } catch (error) {
            console.error(`[GAME_STATE_SERVICE] Error loading game ${gameData.id || gameData._id}:`, error);
            return null;
          }
        })
      );
      
      // Filter out null results and add to cache
      hydratedGames
        .filter(game => game !== null)
        .forEach(game => {
          this.games[game.id] = game;
        });
      
      console.log(`[GAME_STATE_SERVICE] Successfully loaded ${Object.keys(this.games).length} games from database`);
    } catch (error) {
      console.error('[GAME_STATE_SERVICE] Error loading games from database:', error);
    }
  }
}

module.exports = new GameStateService();
