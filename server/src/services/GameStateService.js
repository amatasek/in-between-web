const BaseService = require('./BaseService');
const { GamePhases } = require('../../../shared/constants/GamePhases');
const Game = require('../models/Game');
const { gameLog } = require('../utils/logger');

class GameStateService extends BaseService {
  constructor() {
    super();
    this.games = {};
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
  
  getGame(gameId) {
    return this.games[gameId];
  }

  createGame(settings) {
    const game = new Game(settings);
    this.games[game.id] = game;
    gameLog(game, `New game created with id: ${game.id}`);

    // Initialize the deck during game creation
    const cardService = this.getService('card');
    game.deck = cardService.shuffleDeck(cardService.createDeck());  
    gameLog(game, `Deck with ${game.deck.length} cards shuffled`);
    
    return game;
  }

  /**
   * Save the game state
   * @param {Object} game - The game to save
   * @returns {Object} The saved game
   */
  saveGame(game) {
    if (!game || !game.id) return game;
    this.games[game.id] = game;
    return game;
  }

  prepareForDeal(game) {
    if (!game) return game;
    
    // Reset game state
    game.result = null;
    game.thirdCard = null;
    game.firstCard = null;
    game.secondCard = null;
    game.phase = GamePhases.DEALING;
    
    game.updateTimestamp();
    return game;
  }

  moveToNextPhase(game) {
    if (!game) return game;
    
    const phaseOrder = [
      GamePhases.WAITING,
      GamePhases.DEALING,
      GamePhases.BETTING,
      GamePhases.REVEALING,
      GamePhases.RESULTS
    ];
    
    const currentIndex = phaseOrder.indexOf(game.phase);
    if (currentIndex >= 0 && currentIndex < phaseOrder.length - 1) {
      game.phase = phaseOrder[currentIndex + 1];
      gameLog(game, `Game entering ${game.phase} phase`);
    }
    
    game.updateTimestamp();
    return game;
  }

  getGame(gameId) {
    return this.games[gameId];
  }

  removeGame(gameId) {
    delete this.games[gameId];
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
        settings: game.settings.toJSON(),
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
}

module.exports = new GameStateService();
