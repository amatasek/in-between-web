const gameStateService = require('./GameStateService');
const playerManagementService = require('./PlayerManagementService');
const bettingService = require('./BettingService');
const CardService = require('./CardService');
const gameTimingService = require('./GameTimingService');
const { gameLog } = require('../utils/logger');
const { GamePhases } = require('../../../shared/constants/GamePhases');
const GAME_CONSTANTS = require('../../../shared/constants/GameConstants');

/**
 * GameService - Orchestrates the game flow by coordinating between specialized services
 */
class GameService {
  constructor() {
    this.games = gameStateService.games;
  }

  createGame(gameId, hostId) {
    return gameStateService.createGame(gameId, hostId);
  }

  async addPlayer(game, playerId, name, userId) {
    return playerManagementService.addPlayer(game, playerId, name, userId);
  }

  removePlayer(game, playerId) {
    return playerManagementService.removePlayer(game, playerId);
  }

  async startRound(game) {
    if (!game) return game;
    
    // Clear any existing timeouts
    gameTimingService.clearGameTimeouts(game.id);
    
    // Store the current player before starting a new round
    const currentPlayerId = game.currentPlayerId;
    
    // Start new round
    game = gameStateService.startRound(game);
    
    // Ensure deck is available
    game = CardService.ensureDeckAvailable(game);
    
    // Set initial player only at the beginning of a new game (round 1)
    if (game.round === 1) {
      game = playerManagementService.setInitialCurrentPlayer(game);
    } else if (currentPlayerId) {
      // Keep the same player for subsequent rounds during a game
      game.currentPlayerId = currentPlayerId;
    }
    
    // Log the current player for debugging
    gameLog(game, `Starting round ${game.round} with current player: ${game.players[game.currentPlayerId]?.name}`);
    
    // Start dealing sequence
    game = await this.startDealingSequence(game);
    
    return game;
  }

  async startDealingSequence(game) {
    if (!game) return game;
    
    // Ensure deck is available
    game = CardService.ensureDeckAvailable(game);
    
    // Use the GameTimingService to handle the dealing sequence with proper timing
    const services = {
      CardService,
      broadcastFn: (updatedGame) => this.broadcastGameState(updatedGame)
    };
    
    // GameTimingService will handle all the timing and state transitions
    await gameTimingService.handleDealingSequence(game, services);
    
    return game;
  }

  async playerReady(game, playerId) {
    // Mark player as ready and handle ante
    game = await playerManagementService.playerReady(game, playerId);
    
    // Check if all players are ready and we have at least 2 players
    const allReady = Object.values(game.players).every(p => p.isReady);
    const readyPlayerCount = Object.values(game.players).filter(p => p.isReady).length;
    
    if (allReady && readyPlayerCount >= 2) {
      gameLog(game, `Starting round with ${readyPlayerCount} ready players`);
      game = await this.startRound(game);
    } else if (allReady) {
      gameLog(game, `Waiting for more players. Current ready count: ${readyPlayerCount}`);
    }
    
    return game;
  }

  async startBettingPhase(game) {
    if (!game) return game;
    
    game.phase = GamePhases.BETTING;
    console.log(`[DEBUG] Setting game phase to BETTING for game ${game.id}`);
    gameLog(game, `Betting phase started for ${game.players[game.currentPlayerId].name}`);
    
    // Use GameTimingService to handle the betting sequence with auto-pass
    const services = {
      getGameFn: (gameId) => {
        const retrievedGame = gameStateService.getGame(gameId);
        console.log(`[DEBUG] getGameFn called for game ${gameId}, found game: ${!!retrievedGame}, phase: ${retrievedGame?.phase}`);
        return retrievedGame;
      },
      broadcastFn: (updatedGame) => {
        console.log(`[DEBUG] broadcastFn called with game ${updatedGame?.id}, phase: ${updatedGame?.phase}`);
        this.broadcastGameState(updatedGame);
      }
    };
    
    console.log(`[DEBUG] Calling handleBettingSequence for game ${game.id}, currentPlayer: ${game.currentPlayerId}`);
    
    // GameTimingService will handle the auto-pass timeout
    await gameTimingService.handleBettingSequence(game, services);
    
    console.log(`[DEBUG] handleBettingSequence completed for game ${game.id}`);
    
    return game;
  }

  async placeBet(game, playerId, amount) {
    if (!game) return game;
    
    // Place the bet using betting service
    let updatedGame = await bettingService.placeBet(game, playerId, amount);
    
    // If player passed (amount is 0), handle the phase transition
    if (amount === 0) {
      console.log(`[DEBUG] Player ${game.players[playerId]?.name} passed, setting up for next player`);
      
      // Reset cards for the next player
      updatedGame.firstCard = null;
      updatedGame.secondCard = null;
      updatedGame.thirdCard = null;
      
      // Move to dealing phase for the next player
      updatedGame.phase = GamePhases.DEALING;
      
      // Start dealing sequence for the next player
      updatedGame = await this.startDealingSequence(updatedGame);
    }
    // If player placed a bet, handle the revealing phase
    else if (amount > 0) {
      // Move to revealing phase
      updatedGame.phase = GamePhases.REVEALING;
      
      // Use GameTimingService to handle the revealing sequence
      const services = {
        CardService,
        processOutcomeFn: async (game) => await this.processGameOutcome(game),
        broadcastFn: (game) => this.broadcastGameState(game)
      };
      
      // GameTimingService will handle all the timing and state transitions
      await gameTimingService.handleRevealingSequence(updatedGame, services);
    }
    
    return updatedGame;
  }

  async processGameOutcome(game) {
    if (!game) return game;
    
    // Move to results phase
    game.phase = GamePhases.RESULTS;
    
    const player = game.players[game.currentPlayerId];
    if (!player) return game;
    
    const { firstCard, secondCard, thirdCard } = game;
    if (!firstCard || !secondCard || !thirdCard) {
      gameLog(game, 'Missing cards for outcome determination');
      return game;
    }
    
    // Determine outcome
    const isWin = CardService.isCardBetween(firstCard, thirdCard, secondCard);
    const isTie = CardService.isCardTie(firstCard, thirdCard, secondCard);
    
    try {
      let winnings = 0;
      
      if (isWin) {
        // Regular win (1:1)
        winnings = player.currentBet * 2;
        const potPayment = Math.min(game.pot, winnings);
        const success = await player.addChips(potPayment, `Game ${game.id}: Win`);
        if (success) {
          game.pot -= potPayment;
          gameLog(game, `${player.name} WINS ${potPayment}`);
        }
      } else if (isTie) {
        // Tie penalty
        winnings = -player.currentBet;
        const success = await player.removeChips(player.currentBet, `Game ${game.id}: Tie`);
        if (success) {
          game.pot += player.currentBet;
          gameLog(game, `TIE! ${player.name} pays ${player.currentBet}`);
        }
      } else {
        gameLog(game, `${player.name} LOSES ${player.currentBet}`);
      }
      
      // Store result
      game.result = {
        playerId: player.id,
        outcome: isWin ? 'win' : isTie ? 'tie' : 'lose',
        winnings
      };
      
      // Reset bet
      player.resetBet();
      
      // Handle player elimination
      if (player.balance <= 0) {
        gameLog(game, `${player.name} eliminated (no chips)`);
        delete game.players[player.id];
        game.recalculatePlayerCount();
        
        // Check for game over
        if (game.playerCount <= 1) {
          const lastPlayer = Object.values(game.players)[0];
          if (lastPlayer) {
            await lastPlayer.addChips(game.pot, `Game ${game.id}: Last Player`);
            game.pot = 0;
            game.phase = 'gameOver';
            game.winner = {
              id: lastPlayer.id,
              name: lastPlayer.name,
              balance: lastPlayer.balance
            };
          }
        }
      }
      
      // Use GameTimingService to handle the results sequence
      const services = {
        startNextRoundFn: async (game) => await this.startNextRound(game),
        broadcastFn: (game) => this.broadcastGameState(game)
      };
      
      // GameTimingService will handle all the timing and state transitions
      await gameTimingService.handleResultsSequence(game, services);
      
      return game;
    } catch (error) {
      gameLog(game, `Error processing outcome: ${error.message}`);
      return game;
    }
  }

  async startNextRound(game) {
    if (!game) return game;
    
    // Always explicitly move to the next player before starting a new round
    const currentPlayer = game.players[game.currentPlayerId]?.name || 'Unknown';
    gameLog(game, `Moving from player ${currentPlayer} to next player`);
    
    // Move to next player
    game = playerManagementService.moveToNextPlayer(game);
    
    const nextPlayer = game.players[game.currentPlayerId]?.name || 'Unknown';
    gameLog(game, `Next round will start with player: ${nextPlayer}`);
    
    // Start new round with the updated player
    game = await this.startRound(game);
    
    // Make sure the phase is set correctly
    if (game.phase === undefined || game.phase === null) {
      gameLog(game, `Phase was undefined, setting to dealing`);
      game.phase = 'dealing';
    }
    
    // Broadcast the updated game state
    this.broadcastGameState(game);
    
    return game;
  }

  getGame(gameId) {
    return gameStateService.getGame(gameId);
  }

  getAvailableGames() {
    return gameStateService.getAvailableGames();
  }

  cleanupGame(gameId) {
    gameTimingService.clearGameTimeouts(gameId);
    gameStateService.removeGame(gameId);
  }
  
  /**
   * Clean up inactive games that haven't been updated in a while
   * Called periodically by the server to prevent memory leaks
   */
  cleanupGames() {
    const now = Date.now();
    const INACTIVE_THRESHOLD = 3 * 60 * 60 * 1000; // 3 hours
    
    try {
      const gameIds = Object.keys(this.games);
      let cleanedCount = 0;
      
      gameIds.forEach(gameId => {
        const game = this.games[gameId];
        
        // Check if game is inactive (hasn't been updated in a while)
        if (game && game.lastUpdated && (now - game.lastUpdated > INACTIVE_THRESHOLD)) {
          console.log(`[CLEANUP] Removing inactive game ${gameId} (last active ${Math.floor((now - game.lastUpdated) / 60000)} minutes ago)`);
          this.cleanupGame(gameId);
          cleanedCount++;
        }
      });
      
      if (cleanedCount > 0) {
        console.log(`[CLEANUP] Removed ${cleanedCount} inactive games`);
      } else {
        console.log(`[CLEANUP] No inactive games to remove`);
      }
    } catch (error) {
      console.error(`[CLEANUP] Error cleaning up games: ${error.message}`);
    }
  }

  broadcastGameState(game) {
    if (!game) return;
    
    // Ensure the current player is set before broadcasting
    if (!game.currentPlayerId && game.phase !== 'waiting' && game.phase !== 'gameOver') {
      gameLog(game, `WARNING: Current player is undefined before broadcast, attempting to fix`);
      
      // Try to set a valid player if possible
      const connectedPlayers = game.getConnectedPlayersInOrder();
      if (connectedPlayers.length > 0) {
        game.currentPlayerId = connectedPlayers[0];
        gameLog(game, `Set current player to ${game.players[game.currentPlayerId]?.name} for broadcast`);
      }
    }
    
    // Log the game state being broadcast
    gameLog(game, `Game state broadcast - Phase: ${game.phase}, Current player: ${game.players[game.currentPlayerId]?.name}`);
    
    const socketService = require('./SocketService');
    socketService.broadcastGameState(game);
  }
}

module.exports = new GameService();
