const BaseService = require('./BaseService');
const { GamePhases } = require('../../../shared/constants/GamePhases');
const Game = require('../models/Game');
const { gameLog } = require('../utils/logger');

class GameStateService extends BaseService {
  constructor() {
    super();
    this.games = {};
  }
  
  getGame(gameId) {
    return this.games[gameId];
  }

  createGame(gameId) {
    const game = new Game(gameId);
    this.games[gameId] = game;
    gameLog(game, `New game created with id: ${gameId}`);

    // Initialize the deck during game creation
    const cardService = this.getService('card');
    game.deck = cardService.shuffleDeck(cardService.createDeck());  
    gameLog(game, `Deck created with ${game.deck.length} cards`);
    
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

  startRound(game) {
    if (!game) return game;
    
    // Only increment round counter if not the first round
    // The first round should be 1, not 2
    if (game.phase !== GamePhases.WAITING) {
      game.round += 1;
    }
    
    // Reset game state
    game.result = null;
    game.thirdCard = null;
    game.firstCard = null;
    game.secondCard = null;
    
    // Transition to dealing phase
    game.phase = GamePhases.DEALING;
    gameLog(game, `All players ready, starting round ${game.round}`);
    
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
    return Object.values(this.games).map(game => {
      // Calculate player count directly from seats
      const playerCount = game.seats.filter(seat => seat !== null).length;
      
      return {
        id: game.id,
        playerCount,
        phase: game.phase,
        pot: game.pot
      };
    });
  }
}

module.exports = new GameStateService();
