const gameStateService = require('./GameStateService');
const playerManagementService = require('./PlayerManagementService');
const bettingService = require('./BettingService');
const CardService = require('./CardService');
const gameTimingService = require('./GameTimingService');
const { gameLog } = require('../utils/logger');
const { GamePhases } = require('../../../shared/constants/GamePhases');

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
    
    // Log the current player for the round
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
      broadcastFn: (updatedGame) => this.broadcastGameState(updatedGame),
      saveGameFn: this.saveGame,
      getGameFn: this.getGameById
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
    
    // Check for second chance eligibility before moving to betting phase
    if (game.firstCard && game.secondCard) {
      const isSecondChanceEligible = this.checkForSecondChance(game);
      if (isSecondChanceEligible) {
        // Don't move to betting phase yet, wait for player's decision
        return game;
      }
    }
    
    game.phase = GamePhases.BETTING;

    gameLog(game, `Betting phase started for ${game.players[game.currentPlayerId].name}`);
    
    // Use GameTimingService to handle the betting sequence with auto-pass
    const services = {
      getGameFn: (gameId) => {
        const retrievedGame = gameStateService.getGame(gameId);

        return retrievedGame;
      },
      broadcastFn: (updatedGame) => {

        this.broadcastGameState(updatedGame);
      }
    };
    

    
    // GameTimingService will handle the auto-pass timeout
    await gameTimingService.handleBettingSequence(game, services);
    

    
    return game;
  }
  
  /**
   * Check for matching pair after dealing the second card
   * @param {Object} game - The game object
   * @returns {Boolean} - True if a matching pair is detected
   */
  checkForSecondChance(game) {
    if (!game || !game.firstCard || !game.secondCard) return false;
    
    // Check if the first two cards form a matching pair (but aren't Aces)
    const isSecondChanceEligible = CardService.isSecondChanceEligible(game.firstCard, game.secondCard);
    
    if (isSecondChanceEligible) {
      game.waitingForSecondChance = true;
      gameLog(game, `Matching pair detected! Waiting for player to decide whether to take a second chance`);
    }
    
    return isSecondChanceEligible;
  }
  
  /**
   * Handle player's decision on a second chance opportunity
   * @param {Object} game - The game object
   * @param {String} playerId - The player's ID
   * @param {Boolean} anteAgain - Whether the player chose to ante up again
   * @returns {Object} The updated game object
   */
  async handleSecondChance(game, playerId, anteAgain) {
    if (!game) return game;
    
    // Verify it's the player's turn
    if (game.currentPlayerId !== playerId) {
      gameLog(game, `Not ${game.players[playerId]?.name}'s turn to make a second chance decision`);
      return game;
    }
    
    // Reset the waiting flag
    game.waitingForSecondChance = false;
    
    if (anteAgain) {
      // Player chose to ante up again
      const player = game.players[playerId];
      const anteAmount = game.anteAmount || 1; // Default to 1 if not specified
      
      // Remove the ante amount from the player's balance and add it to the pot
      const success = await player.removeChips(anteAmount, `Game ${game.id}: Ante Up Again`);
      
      if (success) {
        game.pot += anteAmount;
        gameLog(game, `${player.name} antes up again with ${anteAmount}`);
        
        // Reset cards and start a new dealing sequence
        game.firstCard = null;
        game.secondCard = null;
        game.thirdCard = null;
        
        // Return to the dealing phase (it's already in the dealing phase)
        return game;
      } else {
        // If player doesn't have enough chips, treat it as a pass
        gameLog(game, `${player.name} doesn't have enough chips to ante up again, treating as pass`);
        return await this.placeBet(game, playerId, 0);
      }
    } else {
      // Player chose to pass
      const player = game.players[playerId];
      gameLog(game, `${player.name} chose to pass after matching pair`);
      
      // Reset the waiting flag
      game.waitingForSecondChance = false;
      
      // First move to betting phase so placeBet will work correctly
      game.phase = GamePhases.BETTING;
      
      // Now call placeBet with amount=0 to handle the pass
      return await this.placeBet(game, playerId, 0);
    }
  }

  async placeBet(game, playerId, amount) {
    if (!game) return game;
    
    // Place the bet using betting service
    let updatedGame = await bettingService.placeBet(game, playerId, amount);
    
    // If player passed (amount is 0), handle the phase transition
    if (amount === 0) {

      
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

  /**
   * Save the game state
   * @param {Object} game - The game to save
   * @returns {Object} The saved game
   */
  async saveGame(game) {
    if (!game) return game;
    return gameStateService.saveGame(game);
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
    const isTripleAceTie = CardService.isTripleAceTie(firstCard, secondCard, thirdCard);
    
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
      } else if (isTripleAceTie) {
        // Triple Ace tie - 3x penalty
        winnings = -player.currentBet * 3;
        
        // Calculate additional penalty (original bet is already in the pot)
        const additionalPenalty = player.currentBet * 2;
        const success = await player.removeChips(additionalPenalty, `Game ${game.id}: Triple Ace Tie`);
        
        if (success) {
          game.pot += additionalPenalty;
          gameLog(game, `TRIPLE ACE TIE! ${player.name} pays ${player.currentBet * 3} total (3x penalty)`);
        }
      } else if (isTie) {
        // Regular tie - 2x penalty
        winnings = -player.currentBet * 2;
        
        // Calculate additional penalty (original bet is already in the pot)
        const additionalPenalty = player.currentBet;
        const success = await player.removeChips(additionalPenalty, `Game ${game.id}: Tie`);
        
        if (success) {
          game.pot += additionalPenalty;
          gameLog(game, `TIE! ${player.name} pays ${player.currentBet * 2} total (2x penalty)`);
        }
      } else {
        gameLog(game, `${player.name} LOSES ${player.currentBet}`);
      }
      
      // Store result
      game.result = {
        playerId: player.id,
        outcome: isWin ? 'win' : (isTie || isTripleAceTie) ? 'tie' : 'lose',
        winnings,
        isTripleAceTie: isTripleAceTie // Flag to indicate a triple ace tie for special handling
      };
      
      // Reset bet
      player.resetBet();
      
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
