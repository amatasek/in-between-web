/**
 * GameTimingService - Centralizes all game timing logic
 * Handles consistent timing for all game phases and transitions
 */
const BaseService = require('./BaseService');
const { gameLog } = require('../utils/logger');
const { GamePhases } = require('../../../shared/constants/GamePhases');
const GAME_CONSTANTS = require('../../../shared/constants/GameConstants');

class GameTimingService extends BaseService {
  constructor() {
    super();
    this.timeouts = {};
  }

  /**
   * Clear all timeouts for a game
   * @param {string} gameId - The game ID
   */
  clearGameTimeouts(gameId) {
    if (!this.timeouts[gameId]) return;
    
    // Clear all timeouts for the game
    Object.keys(this.timeouts[gameId]).forEach(key => {
      if (this.timeouts[gameId][key]) {
        clearTimeout(this.timeouts[gameId][key]);
      }
    });
    
    // Delete the game's timeout object
    delete this.timeouts[gameId];
  }

  /**
   * Ensure game timeouts object exists
   * @param {string} gameId - The game ID
   */
  ensureGameTimeouts(gameId) {
    if (!this.timeouts[gameId]) {
      this.timeouts[gameId] = {};
    }
  }

  /**
   * Handle the dealing sequence with proper timing
   * @param {Object} game - The game object
   * @returns {Object} The updated game object
   */
  async handleDealingSequence(game) {
    // Get required services from the registry
    const cardService = this.getService('card');
    const gameStateService = this.getService('gameState');
    const broadcastService = this.getService('broadcast');
    
    if (!game) return game;

    this.ensureGameTimeouts(game.id);
    
    // Set timer for first card
    this.timeouts[game.id].dealFirstCard = setTimeout(async () => {
      // Deal first card
      game = cardService.dealFirstCard(game);
      broadcastService.broadcastGameState(game);
      
      // If ace choice is enabled and the first card is an Ace
      if (
        !!game.settings.enableAceChoice &&
        game.firstCard.value === 'A') 
      {
        game.waitingForAceDecision = true;
        gameLog(game, `${game.players[game.currentPlayerId]?.name} needs to choose Ace value`);
        
        // Broadcast the game state with the waitingForAceDecision flag
        broadcastService.broadcastGameState(game);
        
        // Save the game state
        await gameStateService.saveGame(game);
        
        // Set up auto-timeout for ace decision
        const currentPlayerId = game.currentPlayerId;
        const currentRound = game.round;
        
        // Clear any existing auto-ace-decision timeout
        if (this.timeouts[game.id].autoAceDecision) {
          clearTimeout(this.timeouts[game.id].autoAceDecision);
        }
        
        // Set timer for auto-ace-decision if player doesn't respond within the decision duration
        this.timeouts[game.id].autoAceDecision = setTimeout(async () => {
          try {
            // Get the latest game state
            const currentGame = gameStateService.getGame(game.id);
            if (!currentGame) return;
            
            // Check if we're still waiting for ace decision, it's still this player's turn, and we're in the same round
            if (currentGame.waitingForAceDecision && 
                currentGame.currentPlayerId === currentPlayerId && 
                currentGame.round === currentRound) {
              
              // Auto-choose high for player after timeout
              const timeoutPlayerName = currentGame.players[currentPlayerId]?.name || 'Unknown player';
              gameLog(currentGame, `Auto-choosing high ace value for player ${timeoutPlayerName} due to timeout`);
              
              // Get the player and user data
              const databaseService = this.getService('database');
              
              const player = currentGame.players[currentPlayerId];
              if (!player?.userId) {
                console.error(`[GAME_TIMING_SERVICE] Cannot auto-choose ace value: player ${currentPlayerId} has no userId`);
                return;
              }
              
              const user = await databaseService.getUserById(player.userId);
              if (!user) {
                console.error(`[GAME_TIMING_SERVICE] Cannot auto-choose ace value: user ${player.userId} not found`);
                return;
              }
              
              // Set the ace value directly in the game object
              currentGame.firstCard.isAceLow = false; // Auto-choose HIGH
              currentGame.waitingForAceDecision = false;
              
              gameLog(currentGame, `Auto-choosing Ace HIGH for player ${timeoutPlayerName} due to timeout`);
              
              // Save the updated game state
              await gameStateService.saveGame(currentGame);
              
              // Resume the dealing sequence
              this.resumeDealingAfterAceChoice(currentGame);
            }
          } catch (error) {
            console.error(`Error in auto-ace-decision timeout for game ${game.id}:`, error);
          }
        }, GAME_CONSTANTS.TIMERS.DECISION_DURATION);
        
        return game; // Exit the function early - we'll resume after the player's choice
      }

      // Set timer for second card
      this.timeouts[game.id].dealSecondCard = setTimeout(async () => {
        // Deal second card
        game = cardService.dealSecondCard(game);
        broadcastService.broadcastGameState(game);
        
        // If second chances are enabled and the first two cards form a matching pair
        if (
          !!game.settings.enableSecondChance &&
          cardService.isSecondChanceEligible(game.firstCard, game.secondCard)) 
        {
          await this.handleMatchingPair(game);
          return;
        }
        
        // Set timer for transition to betting phase
        this.timeouts[game.id].transitionToBetting = setTimeout(async () => {
          // Move to betting phase
          game.phase = GamePhases.BETTING;
          
          // Set up auto-pass timer for the betting phase
          const currentPlayerId = game.currentPlayerId;
          const playerName = game.players[currentPlayerId]?.name || 'Unknown player';
          const currentRound = game.round;
          
          // Clear any existing auto-bet timeout
          if (this.timeouts[game.id].autoBet) {
            clearTimeout(this.timeouts[game.id].autoBet);
          }
          
          // Use the standard betting duration from game constants
          const betTimeoutDuration = GAME_CONSTANTS.TIMERS.BETTING_DURATION;
          
          // Set timer for auto-pass if player doesn't respond within the betting duration
          this.timeouts[game.id].autoBet = setTimeout(async () => {
            try {
              // Get the latest game state
              const currentGame = gameStateService.getGame(game.id);
              if (!currentGame) return;
              
              // Check if we're still in betting phase, it's still this player's turn, and we're in the same round
              if (currentGame.phase === GamePhases.BETTING && 
                  currentGame.currentPlayerId === currentPlayerId && 
                  currentGame.round === currentRound) {
                
                // Auto-pass for player after timeout
                gameLog(currentGame, `Auto-passing for player ${playerName} due to timeout`);
                
                // Instead of using the GameEventService with a mock socket, use the GameService directly
                // This avoids the issue with the mock socket not being properly associated with the game
                const gameService = this.getService('game');
                
                // Call placeBet directly with the currentPlayerId and a bet of 0 (pass)
                console.log(`[GAME_TIMING_SERVICE] Auto-passing by directly calling GameService.placeBet with currentPlayerId=${currentPlayerId}`);
                await gameService.placeBet(currentGame, currentPlayerId, 0);
              }
            } catch (error) {
              console.error(`Error in auto-pass timeout for game ${game.id}:`, error);
            }
          }, betTimeoutDuration);
          
          // Broadcast the updated game state
          broadcastService.broadcastGameState(game);
        }, GAME_CONSTANTS.TIMERS.DEAL_SECOND_CARD_DELAY);
      }, GAME_CONSTANTS.TIMERS.DEAL_FIRST_CARD_DELAY);
    
    }, GAME_CONSTANTS.TIMERS.DEAL_FIRST_CARD_DELAY);
    
    return game;
  }

  /**
   * Handle the revealing sequence with proper timing
   * @param {Object} game - The game object
   * @returns {Object} The updated game object
   */
  async handleRevealingSequence(game) {
    // Get required services from the registry
    const cardService = this.getService('card');
    const gameService = this.getService('game');
    const gameStateService = this.getService('gameState');
    const broadcastService = this.getService('broadcast');
    
    if (!game) return game;
    
    // Store the current player ID to ensure it's preserved throughout the sequence
    const currentPlayerId = game.currentPlayerId;
    if (!currentPlayerId) {
      gameLog(game, `WARNING: Current player is undefined at start of revealing sequence`);
      // Try to set a valid player if possible
      const connectedPlayers = Object.keys(game.players).filter(id => !game.players[id].disconnected);
      if (connectedPlayers.length > 0) {
        game.currentPlayerId = connectedPlayers[0];
        gameLog(game, `Set current player to ${game.players[game.currentPlayerId]?.name} for revealing sequence`);
      }
    }
    
    this.ensureGameTimeouts(game.id);
    this.clearPhaseTimeouts(game.id, 'revealing');
    
    // Broadcast the initial revealing state
    broadcastService.broadcastGameState(game);
    
    // Deal the third card after the specified delay (2 seconds)
    this.timeouts[game.id].dealThirdCard = setTimeout(() => {
      game = cardService.dealThirdCard(game);
      
      // Ensure current player is still set after dealing third card
      if (!game.currentPlayerId && currentPlayerId) {
        game.currentPlayerId = currentPlayerId;
        gameLog(game, `Restored current player to ${game.players[currentPlayerId]?.name} after dealing third card`);
      }
      
      broadcastService.broadcastGameState(game);
      
      // Set timer for results phase - adjust the duration to maintain the original total timing
      // Subtract the DEAL_THIRD_CARD_DELAY from REVEALING_DURATION to keep the total consistent
      const adjustedRevealingDuration = Math.max(0, GAME_CONSTANTS.TIMERS.REVEALING_DURATION - GAME_CONSTANTS.TIMERS.DEAL_THIRD_CARD_DELAY);
      
      this.timeouts[game.id].transitionToResults = setTimeout(async () => {
        // Ensure current player is still set before processing outcome
        if (!game.currentPlayerId && currentPlayerId) {
          game.currentPlayerId = currentPlayerId;
          gameLog(game, `Restored current player to ${game.players[currentPlayerId]?.name} before processing outcome`);
        }
        
        // Process the outcome after the full revealing duration
        game = await gameService.processGameOutcome(game);
        
        // Ensure current player is still set after processing outcome
        if (!game.currentPlayerId && currentPlayerId) {
          game.currentPlayerId = currentPlayerId;
          gameLog(game, `Restored current player to ${game.players[currentPlayerId]?.name} after processing outcome`);
        }
        
        // Move to results phase
        game.phase = GamePhases.RESULTS;

        // Broadcast the updated game state
        broadcastService.broadcastGameState(game);
        
        // Save the game state
        await gameStateService.saveGame(game);
        
        // NOTE: We don't set a timeout to call startNextRound here anymore
        // This is now handled exclusively by handleResultsSequence to avoid duplicate calls
      }, adjustedRevealingDuration);
    }, GAME_CONSTANTS.TIMERS.DEAL_THIRD_CARD_DELAY);
    
    return game;
  }

  /**
   * Handle the results sequence with proper timing
   * @param {Object} game - The game object
   * @returns {Object} The updated game object
   */
  async handleResultsSequence(game) {
    // Get required services from the registry
    const gameService = this.getService('game');
    
    if (!game) return game;

    this.ensureGameTimeouts(game.id);
    
    // Set timer for transition to next round
    this.timeouts[game.id].transitionToNextRound = setTimeout(async () => {
      // Start the next round
      await gameService.handleRoundCompletion(game);
    }, GAME_CONSTANTS.TIMERS.RESULTS_DURATION);
    
    return game;
  }

  /**
   * Handle the betting sequence with proper timing
   * @param {Object} game - The game object
   * @returns {Object} The updated game object
   */
  async handleBettingSequence(game) {
    // Get required services from the registry
    const gameService = this.getService('game');
    
    if (!game) return game;

    this.ensureGameTimeouts(game.id);
    
    // No automatic timeouts for betting phase - handled separately
    
    return game;
  }

  /**
   * Clear timeouts for a specific phase
   * @param {string} gameId - The game ID
   * @param {string} phase - The phase to clear timeouts for
   */
  clearPhaseTimeouts(gameId, phase) {
    if (!this.timeouts[gameId]) return;
    
    // Map of phase to timeout keys
    const phaseTimeouts = {
      dealing: ['dealFirstCard', 'dealSecondCard', 'transitionToBetting', 'autoAceDecision', 'autoSecondChance'],
      betting: ['autoBet'],
      revealing: ['revealMiddleCard', 'transitionToResults'],
      results: ['transitionToNextRound']
    };
    
    // Clear all timeouts for the phase
    const timeoutKeys = phaseTimeouts[phase] || [];
    timeoutKeys.forEach(key => {
      if (this.timeouts[gameId][key]) {
        clearTimeout(this.timeouts[gameId][key]);
        this.timeouts[gameId][key] = null;
      }
    });
  }

  /**
   * Resume the dealing sequence after a player has made their Ace choice
   * @param {Object} game - The game object
   * @returns {Object} The updated game object
   */
  async resumeDealingAfterAceChoice(game) {
    // Get required services from the registry
    const cardService = this.getService('card');
    const gameStateService = this.getService('gameState');
    const broadcastService = this.getService('broadcast');
    
    if (!game) return game;

    this.ensureGameTimeouts(game.id);
    this.clearPhaseTimeouts(game.id, 'dealing');
    
    // Set timer for second card
    this.timeouts[game.id].dealSecondCard = setTimeout(async () => {
      // Deal second card
      game = cardService.dealSecondCard(game);
      broadcastService.broadcastGameState(game);
      
      // If second chances are enabled and the first two cards form a matching pair
      if (
        !!game.settings.enableSecondChance &&
        cardService.isSecondChanceEligible(game.firstCard, game.secondCard)
      ) {
        await this.handleMatchingPair(game);
        return;
      }
      
      // Set timer for transition to betting phase
      this.timeouts[game.id].transitionToBetting = setTimeout(async () => {
        // Move to betting phase
        game.phase = GamePhases.BETTING;

        // Set up auto-pass timer for the betting phase
        const currentPlayerId = game.currentPlayerId;
        const playerName = game.players[currentPlayerId]?.name || 'Unknown player';
        const currentRound = game.round;
        
        // Clear any existing auto-bet timeout
        if (this.timeouts[game.id].autoBet) {
          clearTimeout(this.timeouts[game.id].autoBet);
        }
        
        // Use the standard betting duration from game constants
        const betTimeoutDuration = GAME_CONSTANTS.TIMERS.BETTING_DURATION;
        
        // Set timer for auto-pass if player doesn't respond within the betting duration
        this.timeouts[game.id].autoBet = setTimeout(async () => {
          try {
            // Get the latest game state
            const currentGame = gameStateService.getGame(game.id);
            if (!currentGame) return;
            
            // Check if we're still in betting phase, it's still this player's turn, and we're in the same round
            if (currentGame.phase === GamePhases.BETTING && 
                currentGame.currentPlayerId === currentPlayerId && 
                currentGame.round === currentRound) {
              
              // Auto-pass for player after timeout
              gameLog(currentGame, `Auto-passing for player ${playerName} due to timeout`);
              
              // Instead of using the GameEventService with a mock socket, use the GameService directly
              // This avoids the issue with the mock socket not being properly associated with the game
              const gameService = this.getService('game');
              
              // Call placeBet directly with the currentPlayerId and a bet of 0 (pass)
              console.log(`[GAME_TIMING_SERVICE] Auto-passing by directly calling GameService.placeBet with currentPlayerId=${currentPlayerId}`);
              await gameService.placeBet(currentGame, currentPlayerId, 0);
            }
          } catch (error) {
            console.error(`Error in auto-pass timeout for game ${game.id}:`, error);
          }
        }, betTimeoutDuration);
        
        // Broadcast the updated game state
        broadcastService.broadcastGameState(game);
      }, GAME_CONSTANTS.TIMERS.DEAL_SECOND_CARD_DELAY);
    }, GAME_CONSTANTS.TIMERS.DEAL_SECOND_CARD_DELAY);
    
    return game;
  }

  /**
   * Resume the dealing sequence after player makes a decision on a second chance
   * @param {Object} game - The game object
   * @returns {Object} The updated game object
   */
  async resumeAfterSecondChance(game) {
    // Get required services from the registry
    const gameService = this.getService('game');
    const gameStateService = this.getService('gameState');
    
    if (!game) return game;

    this.ensureGameTimeouts(game.id);
    this.clearPhaseTimeouts(game.id, 'dealing');
    
    // Set timer for transition to betting phase
    this.timeouts[game.id].transitionToBetting = setTimeout(async () => {
      // Move to betting phase
      game.phase = GamePhases.BETTING;
      
      // Set up auto-pass timer for the betting phase
      const currentPlayerId = game.currentPlayerId;
      const playerName = game.players[currentPlayerId]?.name || 'Unknown player';
      const currentRound = game.round;
      
      // Clear any existing auto-bet timeout
      if (this.timeouts[game.id].autoBet) {
        clearTimeout(this.timeouts[game.id].autoBet);
      }
      
      // Use the standard betting duration from game constants
      const betTimeoutDuration = GAME_CONSTANTS.TIMERS.BETTING_DURATION;
      
      // Set timer for auto-pass if player doesn't respond within the betting duration
      this.timeouts[game.id].autoBet = setTimeout(async () => {
        try {
          // Get the latest game state
          const currentGame = gameStateService.getGame(game.id);
          if (!currentGame) return;
          
          // Check if we're still in betting phase, it's still this player's turn, and we're in the same round
          if (currentGame.phase === GamePhases.BETTING && 
              currentGame.currentPlayerId === currentPlayerId && 
              currentGame.round === currentRound) {
            
            // Auto-pass for player after timeout
            gameLog(currentGame, `Auto-passing for player ${playerName} due to timeout`);
            
            // Instead of using the GameEventService with a mock socket, use the GameService directly
            // This avoids the issue with the mock socket not being properly associated with the game
            const gameService = this.getService('game');
            
            // Call placeBet directly with the currentPlayerId and a bet of 0 (pass)
            console.log(`[GAME_TIMING_SERVICE] Auto-passing by directly calling GameService.placeBet with currentPlayerId=${currentPlayerId}`);
            await gameService.placeBet(currentGame, currentPlayerId, 0);
          }
        } catch (error) {
          console.error(`Error in auto-pass timeout for game ${game.id}:`, error);
        }
      }, betTimeoutDuration);
      
      // Broadcast the updated game state
      broadcastService.broadcastGameState(game);
    }, GAME_CONSTANTS.TIMERS.DEAL_SECOND_CARD_DELAY);
    
    return game;
  }

  /**
   * Helper method to handle matching pairs consistently
   * @param {Object} game - The game object
   * @returns {Promise<void>}
   */
  async handleMatchingPair(game) {
    const gameStateService = this.getService('gameState');
    
    game.waitingForSecondChance = true;
    const playerName = game.players[game.currentPlayerId]?.name || 'Player';
    gameLog(game, `${playerName} has matching cards - second chance?`);
    
    // Broadcast the game state with the waitingForSecondChance flag
    const broadcastService = this.getService('broadcast');
    broadcastService.broadcastGameState(game);
    
    // Save the game state
    await gameStateService.saveGame(game);
    
    // Set up auto-timeout for second chance decision
    const currentPlayerId = game.currentPlayerId;
    const currentRound = game.round;
    
    this.ensureGameTimeouts(game.id);
    
    // Clear any existing auto-second-chance timeout
    if (this.timeouts[game.id]?.autoSecondChance) {
      clearTimeout(this.timeouts[game.id].autoSecondChance);
    }
    
    // Set timer for auto-second-chance if player doesn't respond within the decision duration
    this.timeouts[game.id].autoSecondChance = setTimeout(async () => {
      try {
        // Get the latest game state
        const currentGame = gameStateService.getGame(game.id);
        if (!currentGame) return;
        
        // Check if we're still waiting for second chance decision, it's still this player's turn, and we're in the same round
        if (currentGame.waitingForSecondChance && 
            currentGame.currentPlayerId === currentPlayerId && 
            currentGame.round === currentRound) {
          
          const timeoutPlayerName = currentGame.players[currentPlayerId]?.name || 'Unknown player';
          gameLog(currentGame, `Auto-passing second chance for player ${timeoutPlayerName} due to timeout`);
          
          // Instead of using the GameEventService with a mock socket, use the GameService directly
          // This avoids the issue with the mock socket not being properly associated with the game
          const gameService = this.getService('game');
          
          // Call handleSecondChance directly with the currentPlayerId and anteAgain=false
          console.log(`[GAME_TIMING_SERVICE] Auto-declining second chance by directly calling GameService.handleSecondChance with currentPlayerId=${currentPlayerId}`);
          await gameService.handleSecondChance(currentGame, currentPlayerId, false);
        }
      } catch (error) {
        console.error(`Error in auto-second-chance timeout for game ${game.id}:`, error);
      }
    }, GAME_CONSTANTS.TIMERS.DECISION_DURATION);
  }
}

module.exports = new GameTimingService();
