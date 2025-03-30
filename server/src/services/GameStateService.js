const { GamePhases } = require('../../../shared/constants/GamePhases');
const Game = require('../models/Game');
const { gameLog } = require('../utils/logger');

class GameStateService {
  constructor() {
    this.games = {};
  }
  
  getGame(gameId) {
    return this.games[gameId];
  }

  createGame(gameId, hostId) {
    const game = new Game(gameId, hostId);
    this.games[gameId] = game;
    gameLog(game, `New game created by host ID: ${hostId}`);
    return game;
  }

  startRound(game) {
    if (!game) return game;
    
    // Increment round counter
    game.round += 1;
    
    // Reset game state
    game.result = null;
    game.thirdCard = null;
    game.firstCard = null;
    game.secondCard = null;
    
    // Transition to dealing phase
    game.phase = GamePhases.DEALING;
    gameLog(game, `Starting round ${game.round} in ${game.phase} phase`);
    
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
    return Object.values(this.games).map(game => ({
      id: game.id,
      playerCount: game.playerCount,
      phase: game.phase,
      pot: game.pot
    }));
  }
}

module.exports = new GameStateService();
