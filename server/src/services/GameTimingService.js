/**
 * GameTimingService - Centralizes all game timing logic
 * Handles consistent timing for all game phases and transitions
 */
const { gameLog } = require('../utils/logger');
const { GamePhases } = require('../../../shared/constants/GamePhases');
const GAME_CONSTANTS = require('../../../shared/constants/GameConstants');
const gameStateService = require('./GameStateService');

class GameTimingService {
  constructor() {
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
   * @param {Object} services - Services needed for the sequence
   * @returns {Object} The updated game object
   */
  async handleDealingSequence(game, services) {
    const { CardService, broadcastFn } = services;
    const getGameFn = services.getGameFn || ((gameId) => gameStateService.getGame(gameId));
    
    if (!game) return game;
    
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
    } else {
      gameLog(game, `Dealing sequence for player: ${game.players[currentPlayerId]?.name}`);
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
      game = CardService.dealFirstCard(game);
      broadcastFn(game);
      
      // Set timer for second card
      this.timeouts[game.id].dealSecondCard = setTimeout(async () => {
        // Ensure current player is still set
        if (!game.currentPlayerId && currentPlayerId) {
          game.currentPlayerId = currentPlayerId;
          gameLog(game, `Restored current player to ${game.players[currentPlayerId]?.name} for second card`);
        }
        
        // Deal second card
        game = CardService.dealSecondCard(game);
        broadcastFn(game);
        
        // Set timer for transition to betting phase
        this.timeouts[game.id].transitionToBetting = setTimeout(async () => {
          // Ensure current player is still set
          if (!game.currentPlayerId && currentPlayerId) {
            game.currentPlayerId = currentPlayerId;
            gameLog(game, `Restored current player to ${game.players[currentPlayerId]?.name} for betting phase`);
          }
          
          // Move to betting phase
          game.phase = GamePhases.BETTING;
          gameLog(game, `Starting betting phase for player: ${game.players[game.currentPlayerId]?.name}`);
          
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
          console.log(`[DEBUG] Setting auto-pass timeout for ${betTimeoutDuration}ms for player ${playerName} in game ${game.id}, round ${currentRound}`);
          
          // Set timer for auto-pass if player doesn't respond within the betting duration
          this.timeouts[game.id].autoBet = setTimeout(async () => {
            try {
              // Get the latest game state
              const currentGame = getGameFn(game.id);
              if (!currentGame) return;
              
              // Check if we're still in betting phase, it's still this player's turn, and we're in the same round
              if (currentGame.phase === GamePhases.BETTING && 
                  currentGame.currentPlayerId === currentPlayerId && 
                  currentGame.round === currentRound) {
                
                console.log(`[DEBUG] Auto-passing for player ${playerName} after timeout`);
                gameLog(currentGame, `Auto-passing for player ${playerName} due to timeout`);
                
                // Use the GameService's placeBet method to handle the pass
                const gameService = require('./GameService');
                await gameService.placeBet(currentGame, currentPlayerId, 0);
              }
            } catch (error) {
              console.error(`Error in auto-pass timeout for game ${game.id}:`, error);
            }
          }, betTimeoutDuration);
          
          // Broadcast the updated game state
          broadcastFn(game);
        }, GAME_CONSTANTS.TIMERS.DEAL_SECOND_CARD_DELAY);
      }, GAME_CONSTANTS.TIMERS.DEAL_SECOND_CARD_DELAY);
    }, GAME_CONSTANTS.TIMERS.DEAL_FIRST_CARD_DELAY);
    
    return game;
  }

  /**
   * Handle the revealing sequence with proper timing
   * @param {Object} game - The game object
   * @param {Object} services - Services needed for the sequence
   * @returns {Object} The updated game object
   */
  async handleRevealingSequence(game, services) {
    const { CardService, processOutcomeFn, broadcastFn } = services;
    
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
    } else {
      gameLog(game, `Revealing sequence for player: ${game.players[currentPlayerId]?.name}`);
    }
    
    this.ensureGameTimeouts(game.id);
    this.clearPhaseTimeouts(game.id, 'revealing');
    
    // Broadcast the initial revealing state
    broadcastFn(game);
    
    // Deal the third card after the specified delay (2 seconds)
    this.timeouts[game.id].dealThirdCard = setTimeout(() => {
      game = CardService.dealThirdCard(game);
      gameLog(game, `Dealt third card after ${GAME_CONSTANTS.TIMERS.DEAL_THIRD_CARD_DELAY}ms delay`);
      
      // Broadcast the updated game state with the third card
      broadcastFn(game);
    }, GAME_CONSTANTS.TIMERS.DEAL_THIRD_CARD_DELAY);
    
    // Ensure current player is still set after dealing third card
    if (!game.currentPlayerId && currentPlayerId) {
      game.currentPlayerId = currentPlayerId;
      gameLog(game, `Restored current player to ${game.players[currentPlayerId]?.name} after dealing third card`);
    }
    
    broadcastFn(game);
    
    // Set timer for results phase - allow players to see the third card for the full revealing duration
    this.timeouts[game.id].transitionToResults = setTimeout(async () => {
      gameLog(game, `Revealing phase complete after ${GAME_CONSTANTS.TIMERS.REVEALING_DURATION}ms, transitioning to results`);
      
      // Ensure current player is still set before processing outcome
      if (!game.currentPlayerId && currentPlayerId) {
        game.currentPlayerId = currentPlayerId;
        gameLog(game, `Restored current player to ${game.players[currentPlayerId]?.name} before processing outcome`);
      }
      
      // Process the outcome after the full revealing duration
      game = await processOutcomeFn(game);
      
      // Ensure current player is still set after processing outcome
      if (!game.currentPlayerId && currentPlayerId) {
        game.currentPlayerId = currentPlayerId;
        gameLog(game, `Restored current player to ${game.players[currentPlayerId]?.name} after processing outcome`);
      }
      
      broadcastFn(game);
    }, GAME_CONSTANTS.TIMERS.REVEALING_DURATION);
    
    return game;
  }

  /**
   * Handle the results sequence with proper timing
   * @param {Object} game - The game object
   * @param {Object} services - Services needed for the sequence
   * @returns {Object} The updated game object
   */
  async handleResultsSequence(game, services) {
    const { startNextRoundFn, broadcastFn } = services;
    
    if (!game) return game;
    
    this.ensureGameTimeouts(game.id);
    this.clearPhaseTimeouts(game.id, 'results');
    
    // Log the current player before setting the timeout
    const currentPlayerId = game.currentPlayerId;
    gameLog(game, `Results phase for player: ${game.players[currentPlayerId]?.name}`);
    
    // Set timer for next round
    this.timeouts[game.id].nextRound = setTimeout(async () => {
      try {
        // Check if the pot is empty at the end of the results phase
        if (game.pot <= 0) {
          gameLog(game, `Pot is empty! Transitioning to waiting phase for a new game`);
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
            gameLog(game, `Reset ready state for player: ${player.name}`);
          });
          
          // Broadcast the waiting state
          gameLog(game, `Pot is empty, waiting for players to ante up for a new game`);
          broadcastFn(game);
        } else if (game.phase === GamePhases.WAITING) {
          gameLog(game, `Game already in waiting phase, waiting for players to ante up for a new game`);
          // Just broadcast the current state without starting a new round
          broadcastFn(game);
        } else if (game.phase !== 'gameOver') {
          gameLog(game, `Results phase timeout complete, starting next round`);
          
          // Start the next round (player rotation is handled in startNextRound)
          game = await startNextRoundFn(game);
          
          // Ensure the phase is set correctly
          if (!game.phase || game.phase === 'undefined') {
            gameLog(game, `Phase was invalid after starting next round, fixing to dealing`);
            game.phase = 'dealing';
          }
          
          // Broadcast updated game state
          broadcastFn(game);
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
   * @param {Object} services - Services needed for the sequence
   * @returns {Object} The updated game object
   */
  async handleBettingSequence(game, services) {
    const { getGameFn, broadcastFn } = services;
    
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
}

module.exports = new GameTimingService();
