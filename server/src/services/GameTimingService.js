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
   * Helper to get a consistent key for inactivity timers
   * @param {string} playerId - The ID of the player
   * @returns {string} The timer key
   */
  getInactivityTimerKey(playerId) {
    return `inactivity-${playerId}`;
  }

  /**
   * Clears the inactivity timer for a specific player within a specific game.
   * @param {string} gameId - The ID of the game.
   * @param {string} playerId - The ID of the player.
   */
  clearPlayerInactivityTimer(gameId, playerId) {
    const timerKey = this.getInactivityTimerKey(playerId);
    if (this.timeouts[gameId] && this.timeouts[gameId][timerKey]) {
      clearTimeout(this.timeouts[gameId][timerKey]); // Use standard clearTimeout
      delete this.timeouts[gameId][timerKey]; // Remove the reference
      console.log(`[GAME_TIMING_SERVICE] Cleared inactivity timer for player ${playerId}`);
    }
  }

  /**
   * Starts an inactivity timer for a player if they are in the WAITING phase,
   * not ready, and not already sitting out.
   * @param {Object} game - The current game state.
   * @param {string} playerId - The ID of the player.
   */
  async startPlayerInactivityTimer(game, playerId) {
    if (!game || !playerId || !game.id) return;

    const gameId = game.id;
    const timerKey = this.getInactivityTimerKey(playerId);
    const player = game.players[playerId];

    // Always clear existing timer before starting a new one
    this.clearPlayerInactivityTimer(gameId, playerId);

    // Only start timer if in WAITING phase, player exists, isn't ready, and isn't sitting out
    if (game.phase === GamePhases.WAITING && player && !player.isReady && !player.isSittingOut) {

      const timeoutCallback = async () => {
        // Get fresh game state and services before acting
        const playerManagementService = this.getService('playerManagement');
        const broadcastService = this.getService('broadcast');
        const gameStateService = this.getService('gameState');

        let freshGame = await gameStateService.getGame(gameId);
        if (!freshGame) {
          console.warn(`[GameTimingService.startPlayerInactivityTimer] Game ${gameId} not found for player ${playerId} inactivity timeout.`);
          return;
        }

        const freshPlayer = freshGame.players[playerId];
        if (!freshPlayer) {
          console.warn(`[GameTimingService.startPlayerInactivityTimer] Player ${playerId} not found in game ${gameId} for inactivity timeout.`);
          // Player might have left, timer is no longer relevant for them.
          this.clearPlayerInactivityTimer(gameId, playerId); // Clear timer as a precaution
          return;
        }

        // Check if the timeout is still relevant using fresh state
        // Skip auto sit out in round 1 to give players time to understand the game
        if (
          freshGame.phase === GamePhases.WAITING &&
          !freshPlayer.isReady &&
          !freshPlayer.isSittingOut &&
          freshGame.round > 1
        ) {
          gameLog(freshGame, `${freshPlayer.name} sitting out due to inactivity.`);
          
          freshGame = await playerManagementService.playerSitOut(freshGame, playerId);

          this.clearPlayerInactivityTimer(freshGame.id, playerId);
          broadcastService.broadcastGameState(freshGame);
          await gameStateService.saveGame(freshGame);
        } else {
          // Conditions not met with fresh state, timer might be stale, ensure it's cleared
          this.clearPlayerInactivityTimer(gameId, playerId);
        }
      };

      // Use standard setTimeout and store the ID
      this.ensureGameTimeouts(gameId); // Make sure the game's timeout object exists
      this.timeouts[gameId][timerKey] = setTimeout(timeoutCallback, GAME_CONSTANTS.TIMERS.PLAYER_INACTIVITY_TIMEOUT);
      console.log(`[GAME_TIMING_SERVICE] Started inactivity timer (${GAME_CONSTANTS.TIMERS.PLAYER_INACTIVITY_TIMEOUT / 1000}s) for player ${playerId}`);
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

    // Ensure we have enough cards to deal
    if (!game.deck || game.deck.length < 3) {
      game = cardService.handleDeckRenewal(game);
    }

    const gameId = game.id;
    this.ensureGameTimeouts(gameId);
    
    // Set timer for first card
    this.timeouts[gameId].dealFirstCard = setTimeout(async () => {
      let currentGame = await gameStateService.getGame(gameId);
      if (!currentGame) {
        console.warn(`[GameTimingService] Game ${gameId} not found for dealFirstCard timeout.`);
        return;
      }

      // Deal first card
      currentGame = cardService.dealFirstCard(currentGame);
      broadcastService.broadcastGameState(currentGame);
      
      // If ace choice is enabled and the first card is an Ace
      if (
        !!currentGame.settings.enableAceChoice &&
        currentGame.firstCard.value === 'A') 
      {
        currentGame.waitingForAceDecision = true;
        gameLog(currentGame, `${currentGame.players[currentGame.currentPlayerId]?.name} needs to choose Ace value`);
        
        broadcastService.broadcastGameState(currentGame);
        await gameStateService.saveGame(currentGame);
        
        const currentPlayerId = currentGame.currentPlayerId;
        const currentRound = currentGame.round;
        
        if (this.timeouts[gameId].autoAceDecision) {
          clearTimeout(this.timeouts[gameId].autoAceDecision);
        }
        
        this.timeouts[gameId].autoAceDecision = setTimeout(async () => {
          try {
            const freshGameForAce = await gameStateService.getGame(gameId);
            if (!freshGameForAce) {
                console.warn(`[GameTimingService] Game ${gameId} not found for autoAceDecision timeout.`);
                return;
            }
            
            if (freshGameForAce.waitingForAceDecision && 
                freshGameForAce.currentPlayerId === currentPlayerId && 
                freshGameForAce.round === currentRound) {
              
              const timeoutPlayerName = freshGameForAce.players[currentPlayerId]?.name || 'Unknown player';
              gameLog(freshGameForAce, `Auto-choosing high ace value for player ${timeoutPlayerName} due to timeout`);
              
              const databaseService = this.getService('database');
              const player = freshGameForAce.players[currentPlayerId];
              if (!player?.userId) {
                console.error(`[GAME_TIMING_SERVICE] Cannot auto-choose ace value: player ${currentPlayerId} has no userId`);
                return;
              }
              const user = await databaseService.getUserById(player.userId);
              if (!user) {
                console.error(`[GAME_TIMING_SERVICE] Cannot auto-choose ace value: user ${player.userId} not found`);
                return;
              }
              
              freshGameForAce.firstCard.isAceLow = false;
              freshGameForAce.waitingForAceDecision = false;
              gameLog(freshGameForAce, `Auto-choosing Ace HIGH for player ${timeoutPlayerName} due to timeout`);
              await gameStateService.saveGame(freshGameForAce);
              this.resumeDealingAfterAceChoice(freshGameForAce);
            }
          } catch (error) {
            console.error(`Error in auto-ace-decision timeout for game ${gameId}:`, error);
          }
        }, GAME_CONSTANTS.TIMERS.DECISION_DURATION);
        
        return;
      }


      this.timeouts[gameId].dealSecondCard = setTimeout(async () => {
        let freshGameForSecondCard = await gameStateService.getGame(gameId);
        if (!freshGameForSecondCard) {
          console.warn(`[GameTimingService] Game ${gameId} not found for dealSecondCard timeout.`);
          return;
        }

        freshGameForSecondCard = cardService.dealSecondCard(freshGameForSecondCard);
        broadcastService.broadcastGameState(freshGameForSecondCard);
        
        if (
          !!freshGameForSecondCard.settings.enableSecondChance &&
          cardService.isSecondChanceEligible(freshGameForSecondCard.firstCard, freshGameForSecondCard.secondCard)) 
        {
          await this.handleMatchingPair(freshGameForSecondCard); 
          return;
        }
        

        this.timeouts[gameId].transitionToBetting = setTimeout(async () => {
          let freshGameForBetting = await gameStateService.getGame(gameId);
          if (!freshGameForBetting) {
            console.warn(`[GameTimingService] Game ${gameId} not found for transitionToBetting timeout.`);
            return;
          }

          freshGameForBetting.phase = GamePhases.BETTING;
          
          const currentPlayerId = freshGameForBetting.currentPlayerId;
          const playerName = freshGameForBetting.players[currentPlayerId]?.name || 'Unknown player';
          const currentRound = freshGameForBetting.round;
          
          if (this.timeouts[gameId].autoBet) {
            clearTimeout(this.timeouts[gameId].autoBet);
          }
          
          const betTimeoutDuration = GAME_CONSTANTS.TIMERS.BETTING_DURATION;
          
          this.timeouts[gameId].autoBet = setTimeout(async () => {
            try {
              const freshestGameForAutoBet = await gameStateService.getGame(gameId);
              if (!freshestGameForAutoBet) {
                console.warn(`[GameTimingService] Game ${gameId} not found for autoBet timeout.`);
                return;
              }
              
              if (freshestGameForAutoBet.phase === GamePhases.BETTING && 
                  freshestGameForAutoBet.currentPlayerId === currentPlayerId && 
                  freshestGameForAutoBet.round === currentRound) {
                
                gameLog(freshestGameForAutoBet, `Auto-passing for player ${playerName} due to timeout`);
                const gameService = this.getService('game');
                console.log(`[GAME_TIMING_SERVICE] Auto-passing by directly calling GameService.placeBet with currentPlayerId=${currentPlayerId}`);
                await gameService.placeBet(freshestGameForAutoBet, currentPlayerId, 0);
              }
            } catch (error) {
              console.error(`Error in auto-pass timeout for game ${gameId}:`, error);
            }
          }, betTimeoutDuration);
          
          broadcastService.broadcastGameState(freshGameForBetting);
          await gameStateService.saveGame(freshGameForBetting);
        }, GAME_CONSTANTS.TIMERS.DEAL_SECOND_CARD_DELAY); // Reverted to original
      }, GAME_CONSTANTS.TIMERS.DEAL_FIRST_CARD_DELAY); // Corrected to DEAL_FIRST_CARD_DELAY
    }, GAME_CONSTANTS.TIMERS.DEAL_FIRST_CARD_DELAY); // Reverted to original for dealFirstCard
    

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

    const gameId = game.id; // Capture gameId for use in timeouts
    // Store the current player ID from the initial game state for potential restoration
    const initialCurrentPlayerId = game.currentPlayerId;
    if (!initialCurrentPlayerId) {
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
    this.timeouts[gameId].dealThirdCard = setTimeout(async () => {
      let freshGameForThirdCard = await gameStateService.getGame(gameId);
      if (!freshGameForThirdCard) {
        console.warn(`[GameTimingService.handleRevealingSequence] Game ${gameId} not found in dealThirdCard timeout.`);
        return;
      }

      freshGameForThirdCard = cardService.dealThirdCard(freshGameForThirdCard);
      
      // Ensure current player is still set after dealing third card
      if (!freshGameForThirdCard.currentPlayerId && initialCurrentPlayerId) {
        freshGameForThirdCard.currentPlayerId = initialCurrentPlayerId;
        gameLog(freshGameForThirdCard, `Restored current player to ${freshGameForThirdCard.players[initialCurrentPlayerId]?.name} after dealing third card`);
      }
      
      broadcastService.broadcastGameState(freshGameForThirdCard);
      await gameStateService.saveGame(freshGameForThirdCard); // Save state after third card deal
      
      // Set timer for results phase - adjust the duration to maintain the original total timing
      // Subtract the DEAL_THIRD_CARD_DELAY from REVEALING_DURATION to keep the total consistent
      const adjustedRevealingDuration = Math.max(0, GAME_CONSTANTS.TIMERS.REVEALING_DURATION - GAME_CONSTANTS.TIMERS.DEAL_THIRD_CARD_DELAY);
      
      this.timeouts[gameId].transitionToResults = setTimeout(async () => {
        let freshGameForResults = await gameStateService.getGame(gameId);
        if (!freshGameForResults) {
          console.warn(`[GameTimingService.handleRevealingSequence] Game ${gameId} not found in transitionToResults timeout.`);
          return;
        }

        // Ensure current player is still set before processing outcome
        if (!freshGameForResults.currentPlayerId && initialCurrentPlayerId) {
          freshGameForResults.currentPlayerId = initialCurrentPlayerId;
          gameLog(freshGameForResults, `Restored current player to ${freshGameForResults.players[initialCurrentPlayerId]?.name} before processing outcome`);
        }
        
        // Process the outcome after the full revealing duration
        freshGameForResults = await gameService.processGameOutcome(freshGameForResults);
        
        // Ensure current player is still set after processing outcome (processGameOutcome might change it)
        if (!freshGameForResults.currentPlayerId && initialCurrentPlayerId) {
          // This check might be redundant if processGameOutcome guarantees a player, or complex if it intentionally clears it.
          // For now, we'll keep the pattern of trying to restore if it's missing and we had an initial one.
          freshGameForResults.currentPlayerId = initialCurrentPlayerId;
          gameLog(freshGameForResults, `Restored current player to ${freshGameForResults.players[initialCurrentPlayerId]?.name} after processing outcome`);
        }
        
        // Move to results phase
        freshGameForResults.phase = GamePhases.RESULTS;

        // Broadcast the updated game state
        broadcastService.broadcastGameState(freshGameForResults);
        
        // Save the game state
        await gameStateService.saveGame(freshGameForResults);
        
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
    const gameStateService = this.getService('gameState'); // Added this line
    
    if (!game) return game;

    this.ensureGameTimeouts(game.id);
    const gameId = game.id; // Store gameId before the timeout

    // Set timer for transition to next round
    this.timeouts[gameId].transitionToNextRound = setTimeout(async () => {
      let freshGame = await gameStateService.getGame(gameId);
      if (!freshGame) {
        console.warn(`[GameTimingService.handleResultsSequence] Game with ID ${gameId} not found for handleRoundCompletion.`);
        return;
      }
      // Pass the fresh game state to handleRoundCompletion
      // gameService.handleRoundCompletion is expected to handle its own state saving.
      await gameService.handleRoundCompletion(freshGame);
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
      const gameId = game.id;
      let freshGameForSecondCard = await gameStateService.getGame(gameId);
      if (!freshGameForSecondCard) {
        console.warn(`[GameTimingService.resumeDealingAfterAceChoice] Game ${gameId} not found in dealSecondCard timeout.`);
        return;
      }

      // Deal second card
      freshGameForSecondCard = cardService.dealSecondCard(freshGameForSecondCard);
      broadcastService.broadcastGameState(freshGameForSecondCard);
      await gameStateService.saveGame(freshGameForSecondCard);

      // If second chances are enabled and the first two cards form a matching pair
      if (
        !!freshGameForSecondCard.settings.enableSecondChance &&
        cardService.isSecondChanceEligible(freshGameForSecondCard.firstCard, freshGameForSecondCard.secondCard)
      ) {
        await this.handleMatchingPair(freshGameForSecondCard);
        return;
      }
      
      // Set timer for transition to betting phase

      this.timeouts[gameId].transitionToBetting = setTimeout(async () => {

        let freshGameForBetting = await gameStateService.getGame(gameId);
        if (!freshGameForBetting) {
          console.warn(`[GameTimingService.resumeDealingAfterAceChoice] Game ${gameId} not found in transitionToBetting timeout.`);
          return;
        }

        // Move to betting phase
        freshGameForBetting.phase = GamePhases.BETTING;
        
        // Set up auto-pass timer for the betting phase
        const currentPlayerIdForAutoPass = freshGameForBetting.currentPlayerId;
        const playerNameForAutoPass = freshGameForBetting.players[currentPlayerIdForAutoPass]?.name || 'Unknown player';
        const currentRoundForAutoPass = freshGameForBetting.round;
        
        // Clear any existing auto-bet timeout for this gameId
        if (this.timeouts[gameId] && this.timeouts[gameId].autoBet) {
          clearTimeout(this.timeouts[gameId].autoBet);
        }
        
        const betTimeoutDuration = GAME_CONSTANTS.TIMERS.BETTING_DURATION;
        
        // Set timer for auto-pass if player doesn't respond within the betting duration
        this.ensureGameTimeouts(gameId);
        this.timeouts[gameId].autoBet = setTimeout(async () => {
          try {
            // Get the latest game state
            const latestGame = await gameStateService.getGame(gameId);
            if (!latestGame) {
              console.warn(`[GameTimingService.resumeDealingAfterAceChoice] Game ${gameId} not found in autoBet timeout.`);
              return;
            }
            
            // Check if we're still in betting phase, it's still this player's turn, and we're in the same round
            if (latestGame.phase === GamePhases.BETTING && 
                latestGame.currentPlayerId === currentPlayerIdForAutoPass && 
                latestGame.round === currentRoundForAutoPass) {
              
              gameLog(latestGame, `Auto-passing for player ${playerNameForAutoPass} due to timeout`);
              const gameService = this.getService('game');

              console.log(`[GAME_TIMING_SERVICE] Auto-passing by directly calling GameService.placeBet with currentPlayerId=${currentPlayerIdForAutoPass} for game ${gameId}`);
              await gameService.placeBet(latestGame, currentPlayerIdForAutoPass, 0);
            }
          } catch (error) {
            console.error(`Error in auto-pass timeout for game ${gameId}:`, error);
          }
        }, betTimeoutDuration);
        
        // Broadcast the updated game state
        broadcastService.broadcastGameState(freshGameForBetting);
        await gameStateService.saveGame(freshGameForBetting);
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

      let freshGameForBetting = await gameStateService.getGame(game.id);
      if (!freshGameForBetting) {
        console.warn(`[GameTimingService.resumeAfterSecondChance] Game ${game.id} not found in transitionToBetting timeout.`);
        return;
      }

      // Move to betting phase
      freshGameForBetting.phase = GamePhases.BETTING;
      
      // Set up auto-pass timer for the betting phase
      const currentPlayerIdForAutoPass = freshGameForBetting.currentPlayerId;
      const playerNameForAutoPass = freshGameForBetting.players[currentPlayerIdForAutoPass]?.name || 'Unknown player';
      const currentRoundForAutoPass = freshGameForBetting.round;
      
      // Clear any existing auto-bet timeout for this game.id
      if (this.timeouts[game.id] && this.timeouts[game.id].autoBet) {
        clearTimeout(this.timeouts[game.id].autoBet);
      }
      
      const betTimeoutDuration = GAME_CONSTANTS.TIMERS.BETTING_DURATION;
      
      // Set timer for auto-pass if player doesn't respond within the betting duration
      this.ensureGameTimeouts(game.id);
      this.timeouts[game.id].autoBet = setTimeout(async () => {
        try {
          // Get the latest game state
          const latestGameForAutoBet = await gameStateService.getGame(game.id);
          if (!latestGameForAutoBet) {
            console.warn(`[GameTimingService.resumeAfterSecondChance] Game ${game.id} not found in autoBet timeout.`);
            return;
          }
          
          // Check if we're still in betting phase, it's still this player's turn, and we're in the same round
          if (latestGameForAutoBet.phase === GamePhases.BETTING && 
              latestGameForAutoBet.currentPlayerId === currentPlayerIdForAutoPass && 
              latestGameForAutoBet.round === currentRoundForAutoPass) {
            
            gameLog(latestGameForAutoBet, `Auto-passing for player ${playerNameForAutoPass} due to timeout`);
            const gameService = this.getService('game'); // gameService is defined in the outer function scope

            console.log(`[GAME_TIMING_SERVICE] Auto-passing by directly calling GameService.placeBet with currentPlayerId=${currentPlayerIdForAutoPass} for game ${game.id}`);
            await gameService.placeBet(latestGameForAutoBet, currentPlayerIdForAutoPass, 0);
          }
        } catch (error) {
          console.error(`Error in auto-pass timeout for game ${game.id}:`, error);
        }
      }, betTimeoutDuration);
      

      broadcastService.broadcastGameState(freshGameForBetting);
      await gameStateService.saveGame(freshGameForBetting);
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
        const currentGame = await gameStateService.getGame(game.id);
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
