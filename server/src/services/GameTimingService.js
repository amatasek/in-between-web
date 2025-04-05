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
    
    // Clear all timeouts for this game
    Object.values(this.timeouts[gameId]).forEach(timeout => {
      clearTimeout(timeout);
    });
    
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
    const gameService = this.getService('game');
    
    if (!game) return game;
    
    // Ensure we have enough cards for the entire dealing sequence
    // This check happens at the beginning of the dealing phase to cover all scenarios
    // including when a player accepts a second chance
    if (game.deck && game.deck.length < 3) {
      gameLog(game, `Not enough cards for the dealing sequence (${game.deck.length} cards). Renewing deck...`);
      cardService.handleDeckRenewal(game);
    }
    
    // Store the current player ID to ensure it's preserved throughout the sequence
    const currentPlayerId = game.currentPlayerId;
    if (!currentPlayerId) {
      gameLog(game, `WARNING: Current player is undefined at start of dealing sequence`);
      // Set the player to the one after the dealer
      const nextPlayerId = game.getNextPlayerAfterDealer();
      if (nextPlayerId) {
        game.currentPlayerId = nextPlayerId;
        gameLog(game, `Set current player to ${game.players[nextPlayerId]?.name} (next after dealer) for dealing sequence`);
      } else {
        // Fallback to connected players if next after dealer can't be determined
        const connectedPlayers = game.getConnectedPlayersInOrder();
        if (connectedPlayers.length > 0) {
          game.currentPlayerId = connectedPlayers[0];
          gameLog(game, `Fallback: Set current player to ${game.players[game.currentPlayerId]?.name} for dealing sequence`);
        }
      }
    }
    
    this.ensureGameTimeouts(game.id);
    this.clearPhaseTimeouts(game.id, 'dealing');
    
    // Set initial delay before dealing first card
    this.timeouts[game.id].dealFirstCard = setTimeout(async () => {
      // Ensure current player is still set
      if (!game.currentPlayerId && currentPlayerId) {
        game.currentPlayerId = currentPlayerId;
        gameLog(game, `Restored current player to ${game.players[currentPlayerId]?.name} for first card`);
      }
      
      // Deal first card
      game = cardService.dealFirstCard(game);
      
      // Check if the first card is an Ace
      if (game.firstCard && game.firstCard.value === 'A') {
        game.waitingForAceDecision = true;
        gameLog(game, `First card is an Ace. Waiting for player to choose high/low`);
        
        // Broadcast the game state with the Ace and waitingForAceDecision flag
        gameService.broadcastGameState(game);
        
        // Save the game state
        await gameStateService.saveGame(game);
        
        return game; // Exit the function early - we'll resume after the player's choice
      }
      
      gameService.broadcastGameState(game);
      
      // Set timer for second card (only if not waiting for Ace decision)
      this.timeouts[game.id].dealSecondCard = setTimeout(async () => {
        // Ensure current player is still set
        if (!game.currentPlayerId && currentPlayerId) {
          game.currentPlayerId = currentPlayerId;
          gameLog(game, `Restored current player to ${game.players[currentPlayerId]?.name} for second card`);
        }
        
        // Deal second card
        game = cardService.dealSecondCard(game);
        gameService.broadcastGameState(game);
        
        // Check if the first two cards form a matching pair (but aren't Aces)
        if (cardService.isSecondChanceEligible(game.firstCard, game.secondCard)) {
          // Add a delay before showing the second chance popup to allow the card animation to complete
          setTimeout(() => {
            game.waitingForSecondChance = true;
            gameLog(game, `Matching pair. Waiting for player to decide whether to take a second chance`);
            
            // Broadcast the game state with the waitingForSecondChance flag
            gameService.broadcastGameState(game);
            
            // Save the game state
            gameStateService.saveGame(game);
          }, GAME_CONSTANTS.TIMERS.DEAL_SECOND_CARD_DELAY); // Use the same delay as the card animation
          
          return game; // Exit the function early - we'll resume after the player's choice
        }
        
        // Set timer for transition to betting phase
        this.timeouts[game.id].transitionToBetting = setTimeout(async () => {
          // Ensure current player is still set
          if (!game.currentPlayerId && currentPlayerId) {
            game.currentPlayerId = currentPlayerId;
            gameLog(game, `Restored current player to ${game.players[currentPlayerId]?.name} for betting phase`);
          }
          
          // Move to betting phase
          game.phase = GamePhases.BETTING;
          gameLog(game, `${game.players[game.currentPlayerId]?.name} is betting`);
          
          // Set up auto-pass timer for the betting phase
          const currentPlayerId = game.currentPlayerId;
          const playerName = game.players[currentPlayerId]?.name || 'Unknown player';
          const currentRound = game.round;
          
          // Clear any existing auto-bet timeout
          if (this.timeouts[game.id].autoBet) {
            clearTimeout(this.timeouts[game.id].autoBet);
          }
          
          // Check if we're waiting for an Ace decision
          if (game.waitingForAceDecision) {
            gameLog(game, `Waiting for player ${playerName} to choose Ace high/low - no auto-pass timer set`);
            // Don't set up auto-pass timer yet, as we're waiting for the Ace decision
          } else {
          
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
                

                gameLog(currentGame, `Auto-passing for player ${playerName} due to timeout`);
                
                // Use the GameService's placeBet method to handle the pass
                // Get the game service from the registry instead of requiring it directly
                const gameService = this.getService('game');
                await gameService.placeBet(currentGame, currentPlayerId, 0);
              }
            } catch (error) {
              console.error(`Error in auto-pass timeout for game ${game.id}:`, error);
            }
          }, betTimeoutDuration);
          
          }
          
          // Broadcast the updated game state
          gameService.broadcastGameState(game);
        }, GAME_CONSTANTS.TIMERS.DEAL_SECOND_CARD_DELAY);
      }, GAME_CONSTANTS.TIMERS.DEAL_SECOND_CARD_DELAY);
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
    
    if (!game) return game;
    
    // Store the current player ID to ensure it's preserved throughout the sequence
    const currentPlayerId = game.currentPlayerId;
    if (!currentPlayerId) {
      gameLog(game, `WARNING: Current player is undefined at start of revealing sequence`);
      // Try to set a valid player if possible
      const connectedPlayers = game.getConnectedPlayersInOrder();
      if (connectedPlayers.length > 0) {
        game.currentPlayerId = connectedPlayers[0];
        gameLog(game, `Set current player to ${game.players[game.currentPlayerId]?.name} for revealing sequence`);
      }
    }
    
    this.ensureGameTimeouts(game.id);
    this.clearPhaseTimeouts(game.id, 'revealing');
    
    // Broadcast the initial revealing state
    gameService.broadcastGameState(game);
    
    // Deal the third card after the specified delay (2 seconds)
    this.timeouts[game.id].dealThirdCard = setTimeout(() => {
      game = cardService.dealThirdCard(game);
      gameService.broadcastGameState(game);
    }, GAME_CONSTANTS.TIMERS.DEAL_THIRD_CARD_DELAY);
    
    // Ensure current player is still set after dealing third card
    if (!game.currentPlayerId && currentPlayerId) {
      game.currentPlayerId = currentPlayerId;
      gameLog(game, `Restored current player to ${game.players[currentPlayerId]?.name} after dealing third card`);
    }
    
    gameService.broadcastGameState(game);
    
    // Set timer for results phase - allow players to see the third card for the full revealing duration
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
      
      gameService.broadcastGameState(game);
    }, GAME_CONSTANTS.TIMERS.REVEALING_DURATION);
    
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
    const gameStateService = this.getService('gameState');
    const databaseService = this.getService('database');
    
    if (!game) return game;
    
    this.ensureGameTimeouts(game.id);
    this.clearPhaseTimeouts(game.id, 'results');
    
    // Set timer for next round
    this.timeouts[game.id].nextRound = setTimeout(async () => {
      try {
        // Check if the pot is empty at the end of the results phase
        if (game.pot <= 0) {
          game.phase = GamePhases.WAITING;
          game.round = 0; // Reset round counter for new game
          
          // Rotate to the next player for the next game
          if (game.currentPlayerId) {
            const nextPlayerId = game.getNextPlayerInOrder(game.currentPlayerId);
            if (nextPlayerId) {
              const currentPlayerName = game.players[game.currentPlayerId]?.name;
              const nextPlayerName = game.players[nextPlayerId]?.name;
              game.currentPlayerId = nextPlayerId;
              gameLog(game, `Rotating to next player for new game: ${currentPlayerName} -> ${nextPlayerName}`);
            }
          }
          
          // Reset cards
          game.firstCard = null;
          game.secondCard = null;
          game.thirdCard = null;
          game.result = null;
          
          // Reset all players' ready state
          Object.values(game.players).forEach(player => {
            player.isReady = false;
          });
          
          // Apply auto-ante for players who have it enabled - using batch preference loading
          setTimeout(async () => {
            // Get all player user IDs who aren't ready
            const userIds = Object.values(game.players)
              .filter(player => player.userId && !player.isReady)
              .map(player => player.userId);
            
            if (userIds.length > 0) {
              // Load all preferences in a single batch operation
              const preferencesMap = await databaseService.getPreferencesForUsers(userIds);
              
              // Apply auto-ante for eligible players
              for (const [playerId, player] of Object.entries(game.players)) {
                try {
                  // The playerReady will throw an error if player is already ready
                  if (player.userId && preferencesMap[player.userId]?.autoAnte) {
                    game = await gameService.playerReady(game, playerId);
                    gameLog(game, `Auto-ante applied for ${player.name}`);
                  }
                } catch (error) {
                  // Log the error but continue processing other players
                  gameLog(game, `Auto-ante error for ${player.name}: ${error.message}`);
                }
              }
              
              gameService.broadcastGameState(game);
            }
          }, 100);
          
          // Broadcast the waiting state
          gameLog(game, `Pot is empty, waiting for players to ante up for a new game`);
          gameService.broadcastGameState(game);
        } else if (game.phase === GamePhases.WAITING) {
          gameLog(game, `Game already in waiting phase, waiting for players to ante up for a new game`);
          // Just broadcast the current state without starting a new round
          gameService.broadcastGameState(game);
        } else if (game.phase !== 'gameOver') {
          // Start the next round (player rotation is handled in startNextRound)
          game = await gameService.startNextRound(game);
          
          // Ensure the phase is set correctly
          if (!game.phase || game.phase === 'undefined') {
            gameLog(game, `Phase was invalid after starting next round, fixing to dealing`);
            game.phase = 'dealing';
          }
          
          // Broadcast updated game state
          gameService.broadcastGameState(game);
        }
      } catch (error) {
        gameLog(game, `Error in results sequence: ${error.message}`);
        console.error('Full error:', error);
      }
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
    const gameStateService = this.getService('gameState');
    
    if (!game) return game;
    
    // Store the current player ID to ensure it's preserved throughout the sequence
    const currentPlayerId = game.currentPlayerId;
    if (!currentPlayerId) {
      gameLog(game, `WARNING: Current player is undefined at start of betting sequence`);
      return game;
    }
    
    const playerName = game.players[currentPlayerId]?.name || 'Unknown player';
    gameLog(game, `Starting betting sequence for player: ${playerName}`);
    
    this.ensureGameTimeouts(game.id);
    this.clearPhaseTimeouts(game.id, 'betting');
    
    // Note: Auto-pass timer is set up in handleDealingSequence when transitioning to betting phase
    
    return game;
  }



  /**
   * Clear timeouts for a specific phase
   * @param {string} gameId - The game ID
   * @param {string} phase - The phase to clear timeouts for
   */
  clearPhaseTimeouts(gameId, phase) {
    if (!this.timeouts[gameId]) return;
    
    const phaseTimeouts = {
      dealing: ['dealFirstCard', 'dealSecondCard', 'transitionToBetting'],
      betting: ['autoBet'],
      revealing: ['transitionToResults'],
      results: ['nextRound']
    };
    
    const timeoutsToRemove = phaseTimeouts[phase] || [];
    timeoutsToRemove.forEach(timeoutKey => {
      if (this.timeouts[gameId][timeoutKey]) {
        clearTimeout(this.timeouts[gameId][timeoutKey]);
        delete this.timeouts[gameId][timeoutKey];
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
    const gameService = this.getService('game');
    const gameStateService = this.getService('gameState');
    
    if (!game) return game;

    this.ensureGameTimeouts(game.id);
    
    // Set timer for second card
    this.timeouts[game.id].dealSecondCard = setTimeout(async () => {
      // Deal second card
      game = cardService.dealSecondCard(game);
      gameService.broadcastGameState(game);
      
      // Check if the first two cards form a matching pair (but aren't Aces)
      if (cardService.isSecondChanceEligible(game.firstCard, game.secondCard)) {
        game.waitingForSecondChance = true;
        gameLog(game, `Matching pair. Waiting for player to decide whether to take a second chance`);
        
        // Broadcast the game state with the waitingForSecondChance flag
        gameService.broadcastGameState(game);
        
        // Save the game state
        await gameStateService.saveGame(game);
        
        return;
      }
      
      // Set timer for transition to betting phase
      this.timeouts[game.id].transitionToBetting = setTimeout(async () => {
        // Move to betting phase
        game.phase = GamePhases.BETTING;
        gameLog(game, `${game.players[game.currentPlayerId]?.name} is betting`);
        
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
        // Set auto-pass timeout for player
        
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
              
              // Use the GameService's placeBet method to handle the pass
              // Get the game service from the registry instead of requiring it directly
              const gameService = this.getService('game');
              await gameService.placeBet(currentGame, currentPlayerId, 0);
            }
          } catch (error) {
            console.error(`Error in auto-pass timeout for game ${game.id}:`, error);
          }
        }, betTimeoutDuration);
        
        // Broadcast the updated game state
        gameService.broadcastGameState(game);
      }, GAME_CONSTANTS.TIMERS.DEAL_SECOND_CARD_DELAY);
    }, GAME_CONSTANTS.TIMERS.DEAL_FIRST_CARD_DELAY);
    
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
      gameLog(game, `${game.players[game.currentPlayerId]?.name} is betting`);
      
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
            
            gameLog(currentGame, `Auto-passing for player ${playerName} due to timeout`);
            
            // Use the GameService's placeBet method to handle the pass
            // Get the game service from the registry instead of requiring it directly
            const gameService = this.getService('game');
            await gameService.placeBet(currentGame, currentPlayerId, 0);
          }
        } catch (error) {
          console.error(`Error in auto-pass timeout for game ${game.id}:`, error);
        }
      }, betTimeoutDuration);
      
      // Broadcast the updated game state
      gameService.broadcastGameState(game);
    }, GAME_CONSTANTS.TIMERS.DEAL_SECOND_CARD_DELAY);
    
    return game;
  }
}

module.exports = new GameTimingService();
