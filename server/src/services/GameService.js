const BaseService = require('./BaseService');
const { gameLog } = require('../utils/logger');
const { GamePhases } = require('../../../shared/constants/GamePhases');

/**
 * GameService - Orchestrates the game flow by coordinating between specialized services
 */
class GameService extends BaseService {
  constructor() {
    super();
    this.games = {}; // Will be initialized in init()
  }
  
  /**
   * Initialize the service - called after all services are registered
   */
  init() {
    // Now it's safe to get services because the registry has been set
    const gameStateService = this.getService('gameState');
    this.games = gameStateService.games;
  }

  // Pass-through methods removed to reduce unnecessary abstraction layers
  
  /**
   * Safely remove a player from the game, returning their ante if appropriate
   * @param {Object} game - The game object
   * @param {String} playerId - The player's ID
   * @returns {Object} The updated game object
   */
  async safeRemovePlayer(game, playerId) {
    if (!game || !game.players[playerId]) return game;
    
    // Check if player is anted up and game is in waiting phase
    if (game.phase === 'waiting' && game.players[playerId]?.isReady) {
      // Withdraw the player's ante before removing them
      gameLog(game, `Player ${game.players[playerId]?.name} is anted up, returning ante before leaving`);
      try {
        const playerManagementService = this.getService('playerManagement');
        game = await playerManagementService.playerUnready(game, playerId);
      } catch (error) {
        gameLog(game, `Error returning ante: ${error.message}`);
      }
    }
    
    // Remove player from game
    const playerManagementService = this.getService('playerManagement');
    return playerManagementService.removePlayer(game, playerId);
  }

  async startRound(game) {
    if (!game) return game;
    
    // Get required services
    const gameTimingService = this.getService('gameTiming');
    const gameStateService = this.getService('gameState');
    const cardService = this.getService('card');
    const playerManagementService = this.getService('playerManagement');
    
    // Clear any existing timeouts
    gameTimingService.clearGameTimeouts(game.id);
    
    // Store the current player before starting a new round
    const currentPlayerId = game.currentPlayerId;
    
    // Start new round
    game = gameStateService.startRound(game);
    
    // Deck should already be available from game creation
    
    // Set initial player only at the beginning of a new game (round 1)
    if (game.round === 1) {
      game = playerManagementService.setInitialCurrentPlayer(game);
    } else if (currentPlayerId) {
      // Keep the same player for subsequent rounds during a game
      game.currentPlayerId = currentPlayerId;
    }
    
    // Log the current player for the round
    gameLog(game, `Round ${game.round}: ${game.players[game.currentPlayerId]?.name} goes first`);
    
    // Start dealing sequence
    game = await this.startDealingSequence(game);
    
    return game;
  }

  async startDealingSequence(game) {
    if (!game) return game;
    
    // Get required services
    const cardService = this.getService('card');
    const gameTimingService = this.getService('gameTiming');
    const gameStateService = this.getService('gameState');
    
    // Ensure deck is available
    game = cardService.ensureDeckAvailable(game);
    
    // GameTimingService will handle all the timing and state transitions
    await gameTimingService.handleDealingSequence(game);
    
    return game;
  }

  async playerReady(game, playerId) {
    // Get the player management service
    const playerManagementService = this.getService('playerManagement');
    
    // Mark player as ready and handle ante
    game = await playerManagementService.playerReady(game, playerId);
    
    // Check if all players are ready and we have at least 2 players
    const allReady = Object.values(game.players).every(p => p.isReady);
    const readyPlayerCount = Object.values(game.players).filter(p => p.isReady).length;
    
    if (allReady && readyPlayerCount >= 2) {
      // Start the round when all players are ready and we have enough players
      game = await this.startRound(game);
    } else if (allReady) {
      gameLog(game, `Waiting for more players to join`);
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
    
    // Get required services
    const gameStateService = this.getService('gameState');
    const gameTimingService = this.getService('gameTiming');
    
    // GameTimingService will handle the auto-pass timeout
    await gameTimingService.handleBettingSequence(game);
    

    
    return game;
  }
  
  /**
   * Check for matching pair after dealing the second card
   * @param {Object} game - The game object
   * @returns {Boolean} - True if a matching pair is detected
   */
  checkForSecondChance(game) {
    if (!game || !game.firstCard || !game.secondCard) return false;
    
    // Get the card service from the registry
    const cardService = this.getService('card');
    
    // Check if the first two cards form a matching pair (but aren't Aces)
    const isSecondChanceEligible = cardService.isSecondChanceEligible(game.firstCard, game.secondCard);
    
    if (isSecondChanceEligible) {
      game.waitingForSecondChance = true;
      // Log message moved to GameTimingService to avoid duplication
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
      const balanceService = this.getService('balance');
      try {
        const result = await balanceService.updateBalance(player.userId, -anteAmount, `Game ${game.id}: Ante Up Again`);
        player.balance = result.balance;
        game.pot += anteAmount;
        gameLog(game, `${player.name} antes up again with ${anteAmount}`);
        
        // Reset cards and start a new dealing sequence
        game.firstCard = null;
        game.secondCard = null;
        game.thirdCard = null;
        
        // Return to the dealing phase (it's already in the dealing phase)
        return game;
      } catch (error) {
        // If player doesn't have enough coins, treat it as a pass
        gameLog(game, `${player.name} doesn't have enough coins to ante up again, treating as pass: ${error.message}`);
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
    const bettingService = this.getService('betting');
    let updatedGame = await bettingService.placeBet(game, playerId, amount);
    
    // If player passed (amount is 0), handle the phase transition
    if (amount === 0) {
      // Get the next active player (only considering players who have anted up)
      const playerManagementService = this.getService('playerManagement');
      const nextPlayerId = playerManagementService.getNextActivePlayer(updatedGame, playerId);
      
      if (!nextPlayerId) {
        // If no eligible players, end the round
        updatedGame.phase = GamePhases.RESULTS;
        const gameTimingService = this.getService('gameTiming');
        await gameTimingService.handleResultsSequence(updatedGame);
        return updatedGame;
      }
      
      // Set the next player and reset cards
      updatedGame.currentPlayerId = nextPlayerId;
      updatedGame.firstCard = updatedGame.secondCard = updatedGame.thirdCard = null;
      updatedGame.phase = GamePhases.DEALING;
      
      // Start dealing sequence for the next player
      updatedGame = await this.startDealingSequence(updatedGame);
    }
    // If player placed a bet, move to revealing phase
    else if (amount > 0) {
      updatedGame.phase = GamePhases.REVEALING;
      const gameTimingService = this.getService('gameTiming');
      await gameTimingService.handleRevealingSequence(updatedGame);
    }
    
    return updatedGame;
  }

  // saveGame method removed - services should call gameStateService.saveGame directly

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
    
    // Get the card service from the registry
    const cardService = this.getService('card');
    
    // Determine outcome
    const isWin = cardService.isCardBetween(firstCard, thirdCard, secondCard);
    const isTie = cardService.isCardTie(firstCard, thirdCard, secondCard);
    const isTripleAceTie = cardService.isTripleAceTie(firstCard, secondCard, thirdCard);
    
    try {
      let winnings = 0;
      
      if (isWin) {
        // Regular win (1:1)
        winnings = player.currentBet * 2;
        const potPayment = Math.min(game.pot, winnings);
        const balanceService = this.getService('balance');
        try {
          const result = await balanceService.updateBalance(player.userId, potPayment, `Game ${game.id}: Win`);
          player.balance = result.balance;
          game.pot -= potPayment;
          gameLog(game, `${player.name} wins ${potPayment} coins!`);
        } catch (error) {
          gameLog(game, `Error giving winnings to ${player.name}: ${error.message}`);
        }
      } else if (isTripleAceTie) {
        // Triple Ace tie - 3x penalty
        winnings = -player.currentBet * 3;
        
        // Calculate additional penalty (original bet is already in the pot)
        const additionalPenalty = player.currentBet * 2;
        const balanceService = this.getService('balance');
        try {
          const result = await balanceService.updateBalance(player.userId, -additionalPenalty, `Game ${game.id}: Triple Ace Tie`);
          player.balance = result.balance;
          game.pot += additionalPenalty;
          gameLog(game, `Triple Ace! ${player.name} pays 3x penalty (${player.currentBet * 3} coins)`);
        } catch (error) {
          gameLog(game, `Error collecting triple ace penalty from ${player.name}: ${error.message}`);
        }
      } else if (isTie) {
        // Regular tie - 2x penalty
        winnings = -player.currentBet * 2;
        
        // Calculate additional penalty (original bet is already in the pot)
        const additionalPenalty = player.currentBet;
        const balanceService = this.getService('balance');
        try {
          const result = await balanceService.updateBalance(player.userId, -additionalPenalty, `Game ${game.id}: Tie`);
          player.balance = result.balance;
          game.pot += additionalPenalty;
          gameLog(game, `Tie! ${player.name} pays 2x penalty (${player.currentBet * 2} coins)`);
        } catch (error) {
          gameLog(game, `Error collecting tie penalty from ${player.name}: ${error.message}`);
        }
      } else {
        gameLog(game, `${player.name} loses ${player.currentBet} coins`);
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
      
      // Get the game timing service from the registry
      const gameTimingService = this.getService('gameTiming');
      
      // GameTimingService will handle all the timing and state transitions
      await gameTimingService.handleResultsSequence(game);
      
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
    const playerManagementService = this.getService('playerManagement');
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
    const gameStateService = this.getService('gameState');
    return gameStateService.getGame(gameId);
  }

  getAvailableGames() {
    const gameStateService = this.getService('gameState');
    return gameStateService.getAvailableGames();
  }

  cleanupGame(gameId) {
    const gameTimingService = this.getService('gameTiming');
    const gameStateService = this.getService('gameState');
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
    
    // Get the broadcast service from the registry
    const broadcastService = this.getService('broadcast');
    broadcastService.broadcastGameState(game);
  }
}

module.exports = new GameService();
