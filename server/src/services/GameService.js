/**
 * GameService - Manages core game flow, state transitions, and player actions
 */
const Game = require('../models/Game');
const Player = require('../models/Player');
const CardService = require('./CardService');
const { gameLog } = require('../utils/logger');
const SocketService = require('./SocketService');
const GamePhases = require('../constants/GamePhases');
const GameConstants = require('../constants/GameConstants');

class GameService {
  constructor() {
    this.games = {};
    this.timeouts = {};
  }
  
  /**
   * Create a new game
   * @param {string} gameId - The game ID
   * @param {string} hostId - The host's socket ID
   * @returns {Game} The newly created game
   */
  createGame(gameId, hostId) {
    const game = new Game(gameId, hostId);
    this.games[gameId] = game;
    gameLog(game, `New game created by host ID: ${hostId}`);
    return game;
  }
  
  /**
   * Add a player to a game
   * @param {Game} game - The game to add the player to
   * @param {string} playerId - The player's socket ID
   * @param {string} name - The player's name
   * @returns {Game} The updated game
   */
  addPlayer(game, playerId, name) {
    if (!game || game.players[playerId]) return game;
    
    // Create new player
    const player = new Player(playerId, name);
    game.players[playerId] = player;
    game.playerOrder.push(playerId);
    
    // If this is the first player, make them the dealer and assign seat 0
    if (game.playerOrder.length === 1) {
      game.dealerId = playerId;
      const seatIndex = game.assignSeat(playerId, true);
      gameLog(game, `Host ${name} assigned to seat ${seatIndex + 1} (dealer)`);
    } else {
      // Assign next available seat for non-host player
      const seatIndex = game.assignSeat(playerId, false);
      gameLog(game, `Player ${name} assigned to seat ${seatIndex + 1}`);
    }
    
    gameLog(game, `Player ${name} (${playerId}) joined the game`);
    game.updateTimestamp();
    return game;
  }
  
  /**
   * Remove a player from a game
   * @param {Game} game - The game to remove the player from
   * @param {string} playerId - The player's socket ID
   * @returns {Game} The updated game
   */
  removePlayer(game, playerId) {
    if (!game || !game.players[playerId]) return game;
    
    const playerName = game.players[playerId].name;
    
    // Mark player as disconnected but don't remove
    game.players[playerId].setConnected(false);
    
    gameLog(game, `Player ${playerName} (${playerId}) disconnected`);
    
    // If it's the disconnected player's turn, move to the next player
    if (game.currentPlayerId === playerId && game.phase === GamePhases.BETTING) {
      gameLog(game, `It was ${playerName}'s turn, moving to next player`);
      this.moveToNextPlayer(game);
    }
    
    game.updateTimestamp();
    return game;
  }
  
  /**
   * Handle player paying ante and becoming ready
   * @param {Game} game - The game
   * @param {string} playerId - The player's socket ID
   * @returns {Game} The updated game
   */
  playerReady(game, playerId) {
    if (!game || game.phase !== GamePhases.WAITING || !game.players[playerId]) {
      return game;
    }
    
    const player = game.players[playerId];
    if (player.isReady || player.score < game.anteAmount) {
      return game;
    }
    
    // Deduct ante amount from player's score
    player.removeChips(game.anteAmount);
    game.pot += game.anteAmount;
    player.setReady(true);
    
    gameLog(game, `Player ${player.name} is ready, paid ante: $${game.anteAmount}`);
    
    // Check if all connected players are ready
    const connectedPlayers = Object.values(game.players).filter(p => p.isConnected);
    const readyPlayers = connectedPlayers.filter(p => p.isReady);
    const allReady = connectedPlayers.every(p => p.isReady);
    
    // Check if we can start a round
    if (readyPlayers.length > 0 && allReady && readyPlayers.length >= 2) {
      // Start the game if all connected players are ready and there are at least 2
      this.startRound(game);
    }
    
    game.updateTimestamp();
    return game;
  }
  
  /**
   * Handle player withdrawing their ante and becoming not ready
   * @param {Game} game - The game
   * @param {string} playerId - The player's socket ID
   * @returns {Game} The updated game
   */
  playerWithdrawAnte(game, playerId) {
    if (!game || game.phase !== GamePhases.WAITING || !game.players[playerId]) {
      return game;
    }
    
    const player = game.players[playerId];
    if (!player.isReady) {
      return game; // Player hasn't anted yet
    }
    
    // Return ante amount to player's score
    player.addChips(game.anteAmount);
    game.pot -= game.anteAmount;
    player.setReady(false);
    
    gameLog(game, `Player ${player.name} withdrew ante: $${game.anteAmount}`);
    
    game.updateTimestamp();
    return game;
  }
  
  /**
   * Start a new round
   * @param {Game} game - The game
   * @returns {Game} The updated game
   */
  startRound(game) {
    if (!game) return game;
    
    gameLog(game, `Starting round ${game.round}`);
    
    // Reset player ready status
    Object.values(game.players).forEach(player => {
      player.setReady(false);
      player.resetBet();
    });
    
    // Create and shuffle a new deck if needed
    if (!game.deck || game.deck.length === 0) {
      game.deck = CardService.shuffleDeck(CardService.createDeck());
      game.deckCount = 1;
      gameLog(game, `New deck created for round ${game.round}, ${game.deck.length} cards`);
    }
    
    // Transition to dealing phase
    game.phase = GamePhases.DEALING;
    gameLog(game, `Game entering ${game.phase} phase`);
    
    // Deal initial cards
    this.dealCards(game);
    
    game.updateTimestamp();
    return game;
  }
  
  /**
   * Deal cards for a new round with sequential dealing
   * @param {Game} game - The game
   * @returns {Game} The updated game
   */
  dealCards(game) {
    if (!game) return game;
    
    // Clear any existing timeouts
    this.clearGameTimeouts(game);
    
    // Set current player to first player after dealer
    this.setInitialCurrentPlayer(game);
    
    // Ensure all cards are initially null
    game.firstCard = null;
    game.secondCard = null;
    game.thirdCard = null;
    
    // We're already in DEALING phase as set by startRound
    gameLog(game, `Current player: ${game.players[game.currentPlayerId].name}, Phase: ${game.phase}`);
    
    // TIMER 1: Deal first card (left position) after a small delay
    if (!this.timeouts[game.id]) this.timeouts[game.id] = {};
    this.timeouts[game.id].firstCard = setTimeout(() => {
      game.firstCard = CardService.dealFirstCard(game);
      
      // Log detailed card state after dealing first card
      gameLog(game, `CARDS DEALT STATE: firstCard=${game.firstCard?.value}${game.firstCard?.suit}, secondCard=null, thirdCard=null`);
      
      // Broadcast the updated state
      SocketService.broadcastGameState(game);
      
      // TIMER 2: Schedule second card to be dealt after delay
      this.timeouts[game.id].secondCard = setTimeout(() => {
        this.dealSecondCard(game);
      }, GameConstants.TIMERS.DEAL_SECOND_CARD_DELAY);
      
    }, GameConstants.TIMERS.DEAL_FIRST_CARD_DELAY);
    
    game.updateTimestamp();
    return game;
  }
  
  /**
   * Deal cards for current player after a pass
   * @param {Game} game - The game
   * @returns {Game} The updated game
   */
  dealCardsForPlayer(game) {
    if (!game) return game;
    
    // Do NOT change the current player - use whoever is set as currentPlayerId
    // Just deal cards to that player
    
    // Ensure all cards are initially null
    game.firstCard = null;
    game.secondCard = null;
    game.thirdCard = null;
    
    // We're already in DEALING phase
    gameLog(game, `Dealing cards to current player: ${game.players[game.currentPlayerId].name}, Phase: ${game.phase}`);
    
    // Clear any existing timeouts
    this.clearGameTimeouts(game);
    
    // TIMER 1: Deal first card (left position) after a small delay
    if (!this.timeouts[game.id]) this.timeouts[game.id] = {};
    this.timeouts[game.id].firstCard = setTimeout(() => {
      game.firstCard = CardService.dealFirstCard(game);
      
      // Log detailed card state after dealing first card
      gameLog(game, `CARDS DEALT STATE: firstCard=${game.firstCard?.value}${game.firstCard?.suit}, secondCard=null, thirdCard=null`);
      
      // Broadcast the updated state
      SocketService.broadcastGameState(game);
      
      // TIMER 2: Schedule second card to be dealt after delay
      this.timeouts[game.id].secondCard = setTimeout(() => {
        this.dealSecondCard(game);
      }, GameConstants.TIMERS.DEAL_SECOND_CARD_DELAY);
      
    }, GameConstants.TIMERS.DEAL_FIRST_CARD_DELAY);
    
    game.updateTimestamp();
    
    return game;
  }
  
  /**
   * Deal the second card (right position)
   * @param {Game} game - The game
   * @returns {Game} The updated game
   */
  dealSecondCard(game) {
    if (!game) return game;
    
    // Deal second card (right position)
    game.secondCard = CardService.dealSecondCard(game);
    
    gameLog(game, `Dealt second card: ${game.secondCard.value}${game.secondCard.suit} (right position)`);
    gameLog(game, `Cards remaining in deck: ${game.deck.length}`);
    
    // Log detailed card state after dealing second card
    gameLog(game, `CARDS DEALT STATE: firstCard=${game.firstCard?.value}${game.firstCard?.suit}, secondCard=${game.secondCard?.value}${game.secondCard?.suit}, thirdCard=null`);
    
    // Broadcast the updated state
    SocketService.broadcastGameState(game);
    
    // Schedule transition to betting phase after a short delay
    if (!this.timeouts[game.id]) this.timeouts[game.id] = {};
    this.timeouts[game.id].bettingTransition = setTimeout(() => {
      // Move to betting phase
      game.phase = GamePhases.BETTING;
      gameLog(game, `Game entering ${game.phase} phase`);
      gameLog(game, `Betting phase started for player ${game.players[game.currentPlayerId].name}`);
      gameLog(game, `IMPORTANT: ${game.players[game.currentPlayerId].name} should now see betting options!`);
      
      // Start betting timeout
      this.timeouts[game.id].betting = setTimeout(() => {
        const currentPlayer = game.players[game.currentPlayerId];
        if (currentPlayer) {
          gameLog(game, `Player ${currentPlayer.name} timed out - auto passing`);
          this.placeBet(game, currentPlayer.id, 0); // Auto-pass with amount 0
        }
      }, GameConstants.TIMERS.BETTING_DURATION);
      
      // Broadcast the updated state
      SocketService.broadcastGameState(game);
    }, GameConstants.TIMERS.DEAL_SECOND_CARD_DELAY);
    
    game.updateTimestamp();
    
    // Broadcast updated state to show the second card
    SocketService.broadcastGameState(game);
    
    return game;
  }
  
  /**
   * Set the initial current player based on dealer position
   * @param {Game} game - The game
   */
  setInitialCurrentPlayer(game) {
    if (!game || !game.dealerId) return;
    
    // Get the player in seat 1 (first non-dealer player)
    const firstNonDealerPlayerId = game.getFirstNonDealerPlayer();
    
    if (firstNonDealerPlayerId && firstNonDealerPlayerId !== game.dealerId) {
      // First non-dealer player gets the first turn
      game.currentPlayerId = firstNonDealerPlayerId;
      const seatNumber = game.getPlayerSeat(firstNonDealerPlayerId) + 1; // 1-based seat number
      gameLog(game, `Current player set to: ${game.players[game.currentPlayerId].name} (seat ${seatNumber}, first after dealer ${game.players[game.dealerId].name})`);
    } else if (game.dealerId && game.players[game.dealerId]) {
      // If no other players found, the dealer is the current player
      game.currentPlayerId = game.dealerId;
      const seatNumber = game.getPlayerSeat(game.dealerId) + 1; // 1-based seat number
      gameLog(game, `Only dealer connected: ${game.players[game.currentPlayerId].name} (seat ${seatNumber})`);
    }
  }
  
  /**
   * Transition from dealing to betting phase
   * @param {Game} game - The game
   * @returns {Game} The updated game
   */
  startBettingPhase(game) {
    if (!game) return game;
    
    game.phase = GamePhases.BETTING;
    gameLog(game, `Game entering ${game.phase} phase`);
    
    // Critical: Ensure the UI shows betting options for the current player
    const currentPlayer = game.players[game.currentPlayerId];
    if (currentPlayer) {
      gameLog(game, `Betting phase started for player ${currentPlayer.name}`);
      gameLog(game, `IMPORTANT: ${currentPlayer.name} should now see betting options!`);
      
      // Set betting timeout for the current player
      if (!this.timeouts[game.id]) this.timeouts[game.id] = {};
      this.timeouts[game.id].betting = setTimeout(() => {
        gameLog(game, `Player ${currentPlayer.name} timed out - auto passing`);
        this.placeBet(game, currentPlayer.id, 0); // Auto-pass with amount 0
      }, GameConstants.TIMERS.BETTING_DURATION);
    }
    
    game.updateTimestamp();
    return game;
  }
  
  /**
   * Handle a player placing a bet
   * @param {Game} game - The game
   * @param {string} playerId - The player's socket ID
   * @param {number} amount - The bet amount
   * @returns {Game} The updated game
   */
  placeBet(game, playerId, amount) {
    if (!game || !game.isPlayersTurn(playerId)) {
      gameLog(game, `Invalid bet: Not ${game.players[playerId]?.name}'s turn or wrong phase (${game.phase})`);
      return game;
    }
    
    // Clear any existing betting timeout
    if (this.timeouts[game.id]?.betting) {
      clearTimeout(this.timeouts[game.id].betting);
      delete this.timeouts[game.id].betting;
    }
    
    const player = game.players[playerId];
    
    // Handle pass (amount = 0)
    if (amount === 0) {
      gameLog(game, `Player ${player.name} passes - moving to next player`);
      
      // Reset the current cards for this player
      game.firstCard = null;
      game.secondCard = null;
      
      // Move to the next player in seat order
      this.moveToNextPlayer(game);
      
      // Log who the next player is after moving
      gameLog(game, `After pass, next player is: ${game.players[game.currentPlayerId].name} (seat ${game.getPlayerSeat(game.currentPlayerId)})`);
      
      // Transition to dealing phase for the next player
      game.phase = GamePhases.DEALING;
      gameLog(game, `Game entering ${game.phase} phase for next player ${game.players[game.currentPlayerId].name}`);
      
      // Deal cards for the next player without changing currentPlayerId
      this.dealCardsForPlayer(game);
      
      game.updateTimestamp();
      return game;
    }
    
    // Determine bet amount
    let betAmount = 0;
    
    // Handle pot bet (amount = -1)
    if (amount === -1) {
      betAmount = Math.min(game.pot, Number(player.balance));
      gameLog(game, `Player ${player.name} bets the pot: $${betAmount}`);
    } else if (amount >= 1 && amount <= Math.min(game.pot, Number(player.balance))) {
      // Ensure bet is at least $1 and at most the current pot (or player's max score)
      betAmount = amount;
      gameLog(game, `Player ${player.name} bets: $${betAmount}`);
    } else {
      gameLog(game, `Invalid bet amount: ${amount}. Must be between $1 and $${Math.min(game.pot, Number(player.balance))}`);
      return game;
    }
    
    // Set player's bet and transfer money from player to pot
    player.placeBet(betAmount);
    
    // Deduct bet amount from player's balance
    player.removeChips(betAmount);
    
    // Add bet amount to the pot
    game.pot += betAmount;
    gameLog(game, `$${betAmount} moved from ${player.name}'s balance to the pot. New pot total: $${game.pot}`);
    
    // Move to revealing phase
    game.phase = GamePhases.REVEALING;
    gameLog(game, `Phase changed to ${game.phase} - dealing and revealing third card`);
    
    // Clear any existing timeouts for this game
    this.clearGameTimeouts(game);
    
    // TIMER 3: Deal and reveal the middle card after a delay
    if (!game.timeouts) game.timeouts = [];
    game.timeouts.push(setTimeout(() => {
      this.dealAndRevealMiddleCard(game);
    }, GameConstants.TIMERS.DEAL_THIRD_CARD_DELAY));
    
    gameLog(game, `Third card will be dealt in ${GameConstants.TIMERS.DEAL_THIRD_CARD_DELAY/1000} seconds`);
    
    game.updateTimestamp();
    return game;
  }
  
  /**
   * Directly reveal the middle card (for manual triggering if needed)
   * @param {Game} game - The game
   * @returns {Game} The updated game
   */
  revealCard(game) {
    if (!game || game.phase !== GamePhases.REVEALING || !game.currentPlayerId) {
      gameLog(game, `Cannot reveal card: wrong phase (${game.phase}) or no current player`);
      return game;
    }
    
    // Directly deal and reveal the middle card
    this.dealAndRevealMiddleCard(game);
    
    return game;
  }
  
  /**
   * Deal and reveal the middle card
   * @param {Game} game - The game
   * @returns {Game} The updated game
   */
  dealAndRevealMiddleCard(game) {
    if (!game) return game;
    
    // Only proceed if we're in the revealing phase
    if (game.phase !== GamePhases.REVEALING) {
      gameLog(game, `Cannot deal middle card: wrong phase ${game.phase}, expected ${GamePhases.REVEALING}`);
      return game;
    }
    
    const player = game.players[game.currentPlayerId];
    if (!player) return game;
    
    // Check if the third card has already been dealt
    if (game.thirdCard && game.thirdCard.revealed) {
      gameLog(game, `Third card already dealt and revealed - skipping`);
      return game;
    }
    
    gameLog(game, `REVEALING PHASE: Dealing the third card for ${player.name}'s bet of $${player.currentBet}`);
    
    // Deal the third card (middle position) - all cards are always revealed in our game
    game.thirdCard = CardService.dealThirdCard(game);
    if (!game.thirdCard) return game;
    
    // All cards are revealed by default
    game.thirdCard.revealed = true;
    
    // Log the cards for validation
    gameLog(game, `CARDS: Left=${game.firstCard?.value}${game.firstCard?.suit}, Middle=${game.thirdCard?.value}${game.thirdCard?.suit}, Right=${game.secondCard?.value}${game.secondCard?.suit}`);
    
    // Broadcast the updated state to show the third card before processing results
    SocketService.broadcastGameState(game);
    
    // Move directly to results phase
    this.showResultsPhase(game);
    
    game.updateTimestamp();
    return game;
  }
  

  
  /**
   * Show game results after revealing the middle card
   * @param {Game} game - The game
   * @returns {Game} The updated game
   */
  showResultsPhase(game) {
    if (!game || !game.currentPlayerId) return game;
    
    // Make sure we haven't already processed this game's results
    if (game.phase === GamePhases.RESULTS && game.result) {
      gameLog(game, `Results phase already active and results calculated - skipping duplicate processing`);
      return game;
    }
    
    const player = game.players[game.currentPlayerId];
    game.phase = GamePhases.RESULTS;
    gameLog(game, `Game entering ${game.phase} phase`);
    
    // Log the current game state before determining outcome
    gameLog(game, `RESULTS PHASE - Processing outcome with cards:`);
    gameLog(game, `Left: ${game.firstCard.value}${game.firstCard.suit}`);
    gameLog(game, `Middle: ${game.thirdCard.value}${game.thirdCard.suit} (revealed: ${game.thirdCard.revealed})`);
    gameLog(game, `Right: ${game.secondCard.value}${game.secondCard.suit}`);
    
    // Store the current bet before it gets reset
    const currentBet = player.currentBet;
    
    // Process the bet result if not already processed
    if (!game.result) {
      this.determineOutcome(game);
    }
    
    // Set up countdown for results phase
    game.resultCountdown = {
      startTime: Date.now(),
      duration: GameConstants.TIMERS.RESULTS_DURATION,
      countdownSeconds: GameConstants.TIMERS.RESULTS_COUNTDOWN_SECONDS
    };
    
    // Log detailed information about the outcome
    if (game.result) {
      const resultDetails = {
        player: player.name,
        playerId: player.id,
        outcome: game.result.outcome,
        bet: currentBet,
        winnings: game.result.winnings,
        cards: {
          left: `${game.firstCard.value}${game.firstCard.suit}`,
          middle: `${game.thirdCard.value}${game.thirdCard.suit}`,
          right: `${game.secondCard.value}${game.secondCard.suit}`
        },
        pot: game.pot,
        countdown: GameConstants.TIMERS.RESULTS_COUNTDOWN_SECONDS // Initial countdown value
      };
      
      gameLog(game, `RESULTS PHASE: ${player.name} ${game.result.outcome === 'win' ? 'won' : 'lost'} the bet`);
      gameLog(game, `Result details: ${JSON.stringify(resultDetails)}`);
      gameLog(game, `Results will be displayed for ${GameConstants.TIMERS.RESULTS_COUNTDOWN_SECONDS} seconds`);
    }
    
    // Clear any existing timeouts
    this.clearGameTimeouts(game);
    
    // TIMER 4: Schedule transition to waiting phase (next round)
    if (!game.timeouts) game.timeouts = [];
    game.timeouts.push(setTimeout(() => {
      if (game.phase === GamePhases.RESULTS) {
        this.startNextRound(game);
      }
    }, GameConstants.TIMERS.RESULTS_DURATION));
    
    gameLog(game, `Results will be shown for ${GameConstants.TIMERS.RESULTS_DURATION/1000} seconds`);
    
    game.updateTimestamp();
    return game;
  }
  
  /**
   * Helper method to clear all game timeouts
   * @param {Game} game - The game object
   */
  clearGameTimeouts(game) {
    if (!game) return;
    
    if (game.timeouts && game.timeouts.length > 0) {
      gameLog(game, `Clearing ${game.timeouts.length} pending timeouts`);
      game.timeouts.forEach(timeoutId => clearTimeout(timeoutId));
      game.timeouts = [];
    }
  }
  
  /**
   * Determine the outcome of the game based on card values
   * @param {Game} game - The game
   * @returns {Game} The updated game
   */
  determineOutcome(game) {
    if (!game || !game.currentPlayerId) return game;
    
    const player = game.players[game.currentPlayerId];
    if (!player) return game;
    
    const firstCard = game.firstCard; // Left card
    const secondCard = game.secondCard; // Right card
    const thirdCard = game.thirdCard; // Middle card
    
    // Safe checks
    if (!firstCard || !secondCard || !thirdCard) {
      gameLog(game, 'ERROR: Missing cards for outcome determination');
      return game;
    }
    
    // Log the card values being compared
    const firstValue = CardService.getCardValue(firstCard);
    const secondValue = CardService.getCardValue(secondCard);
    const thirdValue = CardService.getCardValue(thirdCard);
    
    gameLog(game, `Processing bet result: First card: ${firstValue}, Second card: ${secondValue}, Third card: ${thirdValue}`);
    
    // Determine if the middle card is between the two outer cards
    let isWin = false;
    let isTie = false;
    
    // If the third card is between the first and second card values
    if ((thirdValue > firstValue && thirdValue < secondValue) || 
        (thirdValue < firstValue && thirdValue > secondValue)) {
      isWin = true;
    } else if (thirdValue === firstValue || thirdValue === secondValue) {
      // If the third card matches either boundary card, it's a tie
      isTie = true;
    }
    
    // Calculate winnings
    let winnings = 0;
    if (isWin) {
      // Check if this was a pot bet
      if (player.currentBet === game.pot) {
        // Take the entire pot
        winnings = Number(game.pot);
        player.balance = Number(player.balance || 0) + winnings;
        game.pot = 0;
        gameLog(game, `${player.name} WINS the entire pot of ${winnings}! New balance: ${player.balance}`);
      } else {
        // Regular win pays 1-to-1 (so get original bet back plus same amount)
        winnings = Number(player.currentBet) * 2;
        
        // Make sure we don't take more from the pot than what's there
        const potPayment = Math.min(game.pot, winnings);
        game.pot -= potPayment;
        
        // Update player balance with winnings
        player.balance = Number(player.balance) + Number(potPayment);
        
        gameLog(game, `${player.name} WINS ${potPayment}! New balance: ${player.balance}`);
      }
    } else if (isTie) {
      // In case of a tie, player has to pay their bet amount again into the pot
      winnings = -player.currentBet; // Negative because they're losing this amount
      game.pot += player.currentBet; // Add their bet to the pot again
      
      // Update player balance by subtracting their bet
      player.balance = Number(player.balance) + Number(winnings);
      
      gameLog(game, `TIE PENALTY! ${player.name} pays their bet (${player.currentBet}) into the pot again. Balance: ${player.balance}`);
    } else {
      gameLog(game, `${player.name} LOSES the bet of ${player.currentBet}. Balance: ${player.balance}`);
    }
    
    // Store the result for display
    game.result = {
      playerId: player.id,
      outcome: isWin ? 'win' : isTie ? 'tie' : 'lose',
      winnings: winnings
    };
    
    // Reset player's current bet
    player.currentBet = 0;
    
    // Note: We don't move to next player here, that's handled in startNextRound
    
    // Check if player has no more balance and should be removed
    if (player.balance <= 0) {
      gameLog(game, `Player ${player.name} has no more chips and is removed from the game`);
      delete game.players[player.id];
      
      // Recalculate player count
      game.recalculatePlayerCount();
      
      // If only one player left, they are the winner
      if (game.playerCount <= 1) {
        const lastPlayerId = Object.keys(game.players)[0];
        const lastPlayer = game.players[lastPlayerId];
        
        if (lastPlayer) {
          gameLog(game, `${lastPlayer.name} is the last player standing and wins the game!`);
          game.winner = {
            id: lastPlayer.id,
            name: lastPlayer.name,
            balance: lastPlayer.balance
          };
          
          // Add pot to winner's balance
          lastPlayer.balance += game.pot;
          game.pot = 0;
          
          // Game is over - return to lobby
          game.phase = 'gameOver';
          return game;
        }
      }
    }
    
    game.updateTimestamp();
    return game;
  }
  
  /**
   * Start a new round after results phase is complete
   * @param {Game} game - The game object
   * @returns {Game} The updated game
   */
  startNextRound(game) {
    if (!game) return game;
    
    gameLog(game, `Starting the next round after results phase`);
    
    // Clear any existing timeouts
    this.clearGameTimeouts(game);
    
    // Increment the round counter
    game.round += 1;
    
    // Reset game state for next round
    game.result = null;
    game.thirdCard = null;
    game.firstCard = null;
    game.secondCard = null;
    game.resultCountdown = null;
    
    // Reset player bets
    Object.values(game.players).forEach(player => {
      player.currentBet = 0;
      player.ready = false;
    });
    
    // Rotate dealer if necessary
    if (game.deckCount >= 6) {
      game.deckCount = 0;
      game.dealerId = game.getNextPlayerInOrder(game.dealerId);
      gameLog(game, `Rotating dealer to ${game.players[game.dealerId].name}`);
    }
    
    // Move to the next player after the current player
    const currentPlayerIndex = game.playerOrder.indexOf(game.currentPlayerId);
    const nextPlayerIndex = (currentPlayerIndex + 1) % game.playerOrder.length;
    const nextPlayerId = game.playerOrder[nextPlayerIndex];
    game.currentPlayerId = nextPlayerId;
    
    const nextPlayer = game.players[nextPlayerId];
    gameLog(game, `Next player set to: ${nextPlayer.name}`);
    
    if (game.pot === 0) {
      // If pot is empty, go to waiting phase for antes
      game.phase = GamePhases.WAITING;
      gameLog(game, `Game reset to waiting phase. Next player: ${game.players[game.currentPlayerId].name}`);
      gameLog(game, `Waiting for players to ante up for round ${game.round}`);
    } else {
      // If pot is not empty, skip waiting phase and go directly to dealing
      game.phase = GamePhases.DEALING;
      gameLog(game, `Pot is not empty, skipping ante. Dealing to next player: ${game.players[game.currentPlayerId].name}`);
      this.dealCardsForPlayer(game);
    }
    
    // Broadcast the state to all clients
    SocketService.broadcastGameState(game);
    
    game.updateTimestamp();
    return game;
  }

  /**
   * Move to next phase after showing results
   * @param {Game} game - The game
   * @returns {Game} The updated game
   */
  moveToNextPhase(game) {
    if (!game) return game;
    
    // Loss or Penalty - move to next player
    if (game.phase === 'results' && game.result && game.result.outcome !== 'win') {
      const currentPlayer = game.players[game.currentPlayerId];
      const nextPlayerIndex = (game.playerOrder.indexOf(game.currentPlayerId) + 1) % game.playerOrder.length;
      const nextPlayerId = game.playerOrder[nextPlayerIndex];
      const nextPlayer = game.players[nextPlayerId];
      
      gameLog(game, `NEXT PHASE: ${currentPlayer.name} lost. Transitioning to next player ${nextPlayer.name}`);
      
      // Clear the result to prevent stale data
      game.result = null;
      
      // Move to the next player
      this.moveToNextPlayer(game);
      
      // Deal new cards for next player
      this.dealCardsForNextPlayer(game);
    } 
    else if (game.phase === 'results' && game.result && game.result.outcome === 'win') {
      gameLog(game, `NEXT PHASE: ${game.players[game.currentPlayerId].name} won! Starting new round.`);
      // Win case is already handled in determineOutcome by setting game.phase = 'ante'
    } 
    else if (game.phase === 'ante' && game.result && game.result.outcome === 'win') {
      // This is the expected state after a win
      gameLog(game, `NEXT PHASE: New round starting after ${game.players[game.result.playerId].name}'s win.`);
      gameLog(game, `Waiting for players to ante up for round ${game.round}`);
    } 
    else if (game.phase === 'betting' && game.result) {
      // Clear stale result if present in betting phase
      gameLog(game, `Clearing stale result from previous round`);
      game.result = null;
    } 
    else {
      gameLog(game, `NEXT PHASE: Unexpected game state - Phase: ${game.phase}, Result: ${game.result ? game.result.outcome : 'none'}`);
    }
    
    game.updateTimestamp();
    return game;
  }
  
  /**
   * Deal cards for the next player after a loss/tie
   * @param {Game} game - The game object
   * @returns {Game} The updated game
   */
  dealCardsForNextPlayer(game) {
    if (!game || !game.currentPlayerId) return game;
    
    // Check if we need to reshuffle
    if (game.deck.length < 2) {
      gameLog(game, `Deck is running low for next player. Shuffling a new deck.`);
      game.deckCount = (game.deckCount || 0) + 1;
      
      // Rotate dealer if it's a new deck
      const notification = CardService.rotateDealerOnNewDeck(game);
      game.dealerRotationNotification = notification;
      
      game.deck = CardService.shuffleDeck(CardService.createDeck());
    }
    
    // Deal initial cards for next player
    const sortedCards = CardService.dealInitialCards(game);
    if (!sortedCards) return game;
    
    // Set the two outer cards - middle card will be dealt later
    game.currentCards = [...sortedCards, null];
    
    // Start with dealing phase
    game.phase = GamePhases.DEALING;
    
    // Deal cards using the standard deal process with the 4 timeouts
    this.dealCards(game);
    
    game.updateTimestamp();
    return game;
  }
  
  /**
   * Move to the next player using seat-based ordering
   * @param {Game} game - The game
   * @returns {Game} The updated game
   */
  moveToNextPlayer(game) {
    if (!game || !game.currentPlayerId) return game;
    
    // Get next player based on seat position
    const nextPlayerId = game.getNextPlayerInOrder(game.currentPlayerId);
    
    if (!nextPlayerId) {
      gameLog(game, 'No next player found, current player remains');
      return game;
    }
    
    // If next player is the same (only one connected player), log it
    if (nextPlayerId === game.currentPlayerId) {
      const seatNumber = game.getPlayerSeat(game.currentPlayerId) + 1; // 1-based seat number
      gameLog(game, `Only one player connected: ${game.players[game.currentPlayerId].name} (seat ${seatNumber}) remains current`);
      return game;
    }
    
    // Set the next player as current
    game.currentPlayerId = nextPlayerId;
    
    // Log the player change with 1-based seat number
    const seatNumber = game.getPlayerSeat(nextPlayerId) + 1; // 1-based seat number
    gameLog(game, `Moved to next player: ${game.players[game.currentPlayerId].name} (seat ${seatNumber})`);
    
    game.updateTimestamp();
    return game;
  }
  
  /**
   * Get list of available games
   * @returns {Array} List of available games in a simplified format
   */
  getAvailableGames() {
    return Object.values(this.games)
      .filter(game => game.phase === 'waiting' || game.phase === 'ante')
      .map(game => ({
        id: game.id,
        hostName: game.players[game.hostId]?.name || 'Unknown',
        playerCount: Object.values(game.players).filter(p => p.isConnected).length,
        maxPlayers: 6,
        phase: game.phase,
        round: game.round,
        pot: game.pot
      }));
  }
  
  /**
   * Clean up inactive games
   */
  cleanupGames() {
    const now = Date.now();
    const inactiveThreshold = 1000 * 60 * 60; // 1 hour
    
    Object.keys(this.games).forEach(gameId => {
      const game = this.games[gameId];
      if (now - game.lastUpdated > inactiveThreshold) {
        gameLog(game, `Cleaning up inactive game - last updated ${Math.floor((now - game.lastUpdated) / 60000)} minutes ago`);
        
        // Clean up any pending timeouts
        if (game.timeouts && game.timeouts.length > 0) {
          gameLog(game, `Clearing ${game.timeouts.length} pending timeouts`);
          game.timeouts.forEach(timeoutId => clearTimeout(timeoutId));
          game.timeouts = [];
        }
        
        delete this.games[gameId];
      }
    });
  }
}

module.exports = new GameService();
