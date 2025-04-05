/**
 * CardService - Handles all card operations including deck management,
 * shuffling, dealing, and card value comparisons
 */
const BaseService = require('./BaseService');
const { gameLog } = require('../utils/logger');

class CardService extends BaseService {
  constructor() {
    super();
    this.suits = ['♠', '♥', '♦', '♣'];
    this.values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    this.valueMap = {
      '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
      'J': 11, 'Q': 12, 'K': 13, 'A': 14
    };
  }

  /**
   * Create a fresh deck of 52 cards
   * @returns {Array} A new unshuffled deck
   */
  createDeck() {
    const deck = [];
    for (const suit of this.suits) {
      for (const value of this.values) {
        deck.push({ suit, value });
      }
    }
    return deck;
  }

  /**
   * Shuffle a deck using Fisher-Yates algorithm with multiple passes
   * @param {Array} deck - The deck to shuffle
   * @returns {Array} The shuffled deck
   */
  shuffleDeck(deck) {
    const shuffled = [...deck];
    
    // Perform multiple passes of shuffling for better randomization
    const shufflePasses = 3;
    
    for (let pass = 0; pass < shufflePasses; pass++) {
      for (let i = shuffled.length - 1; i > 0; i--) {
        // Generate a random index between 0 and i
        const j = Math.floor(Math.random() * (i + 1));
        
        // Swap elements
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
    }
    
    return shuffled;
  }

  /**
   * Ensure a deck is available for the game
   * @param {Game} game - The game object
   * @returns {Game} The game with a deck
   */
  ensureDeckAvailable(game) {
    // Deck should already be created during game creation
    // This is just a safety check in case the deck is missing or empty
    if (!game) return game;
    
    if (!game.deck || game.deck.length === 0) {
      console.warn(`[CARD_SERVICE] Deck not found for game ${game.id}, creating new deck`);
      game.deck = this.shuffleDeck(this.createDeck());
    }
    
    return game;
  }

  /**
   * Deal the first card (left card)
   * @param {Game} game - The game object
   * @returns {Game} The game with the first card dealt
   */
  dealFirstCard(game) {
    game = this.ensureDeckAvailable(game);
    if (!game || !game.deck) return null;
    
    // Deck renewal is now handled at the beginning of the dealing phase in GameTimingService
    
    // Deal the first card (left position)
    const firstCard = game.deck.pop();
    
    gameLog(game, `Left card: ${firstCard.value}${firstCard.suit}`);
    
    // Update game state
    game.firstCard = firstCard;
    
    return game;
  }
  
  /**
   * Deal the second card (right card)
   * @param {Game} game - The game object
   * @returns {Game} The game with the second card dealt
   */
  dealSecondCard(game) {
    game = this.ensureDeckAvailable(game);
    if (!game || !game.deck) return null;
    
    // Deck renewal is now handled at the beginning of the dealing phase in GameTimingService
    
    // Deal second card (right position)
    const secondCard = game.deck.pop();
    
    // Second card is now dealt
    
    gameLog(game, `Right card: ${secondCard.value}${secondCard.suit}`);
    
    // Update game state
    game.secondCard = secondCard;
    
    return game;
  }

  /**
   * Deal the third card (middle card) when it's time to reveal
   * @param {Game} game - The game object
   * @returns {Object} The middle card that was dealt
   */
  dealThirdCard(game) {
    game = this.ensureDeckAvailable(game);
    if (!game || !game.deck) return null;
    
    // Emergency fallback - this should never happen with the comprehensive check at the beginning of the dealing phase
    // but we keep it as a safety measure
    if (game.deck.length < 1) {
      gameLog(game, 'EMERGENCY: Unexpected deck depletion before dealing middle card');
      game.deck = this.shuffleDeck(this.createDeck());
      gameLog(game, 'Emergency reshuffle performed without dealer rotation');
    }
    
    // Deal the middle card
    const thirdCard = game.deck.pop();
    
    // Update game state
    game.thirdCard = thirdCard;
    
    gameLog(game, `Middle card: ${thirdCard.value}${thirdCard.suit}`);
    
    return game;
  }

  /**
   * Handle deck renewal when cards run low
   * @param {Game} game - The game object
   */
  handleDeckRenewal(game) {
    if (!game) return;
    
    gameLog(game, `Deck is running low (${game.deck.length} cards). Shuffling new deck...`);
    
    // Increment the deck count
    game.deckCount = (game.deckCount || 0) + 1;
    
    // Rotate dealer if there are multiple players
    const connectedPlayers = game.getConnectedPlayers();
    if (connectedPlayers.length > 1) {
      const dealerChangeInfo = this.rotateDealerOnNewDeck(game);
      if (dealerChangeInfo) {
        game.dealerChanged = true;
      }
    }
    
    // Create and shuffle a new deck
    game.deck = this.shuffleDeck(this.createDeck());
  }

  /**
   * Rotate the dealer when a new deck is created
   * @param {Game} game - The game object
   */
  rotateDealerOnNewDeck(game) {
    const connectedPlayers = game.getConnectedPlayers();
    if (connectedPlayers.length <= 1) return;
    
    // Get current and next dealer indices
    const currentIndex = Math.max(0, connectedPlayers.indexOf(game.dealerId));
    const nextIndex = (currentIndex + 1) % connectedPlayers.length;
    
    // Record old dealer name for logging
    const oldDealer = game.players[game.dealerId]?.name || 'Unknown';
    
    // Set new dealer
    game.dealerId = connectedPlayers[nextIndex];
    const newDealer = game.players[game.dealerId].name;
    
    // Update seat info
    game.seats.forEach((playerId, i) => {
      if (playerId && game.seatInfo[i]) {
        game.seatInfo[i].isDealer = (playerId === game.dealerId);
      }
    });
    
    gameLog(game, `Dealer rotated from ${oldDealer} to ${newDealer} on new deck`);
    
    return {
      message: `Dealer rotated to ${newDealer}`,
      type: 'dealer',
      deckNumber: game.deckCount
    };
  }

  /**
   * Compare card values to determine if middle card is between the outer cards
   * @param {Object} firstCard - First card (left)
   * @param {Object} thirdCard - Third card (middle)
   * @param {Object} secondCard - Second card (right)
   * @returns {Boolean} True if middle card is between the outer cards
   */
  isCardBetween(firstCard, thirdCard, secondCard) {
    const firstValue = this.getCardValue(firstCard);
    const secondValue = this.getCardValue(secondCard);
    const thirdValue = this.getCardValue(thirdCard);
    
    // Determine which outer card has the lower value and which has the higher value
    const lowerValue = Math.min(firstValue, secondValue);
    const higherValue = Math.max(firstValue, secondValue);
    
    // Check if the middle card's value is between the outer cards' values
    return thirdValue > lowerValue && thirdValue < higherValue;
  }

  /**
   * Get the value of a card
   * @param {Object} card - The card object
   * @returns {Number} The numeric value of the card
   */
  getCardValue(card) {
    // Handle Ace as low (1) if isAceLow is true
    if (card.value === 'A' && card.isAceLow === true) {
      return 1;
    }
    return this.valueMap[card.value];
  }

  /**
   * Check if middle card matches either outside card
   * @param {Object} firstCard - First card (left)
   * @param {Object} thirdCard - Third card (middle)
   * @param {Object} secondCard - Second card (right)
   * @returns {Boolean} True if middle card matches either outside card
   */
  isCardTie(firstCard, thirdCard, secondCard) {
    // Compare the numerical values to account for Ace high/low setting
    const thirdValue = this.getCardValue(thirdCard);
    const firstValue = this.getCardValue(firstCard);
    const secondValue = this.getCardValue(secondCard);
    
    return thirdValue === firstValue || thirdValue === secondValue;
  }
  
  /**
   * Check if all three cards are aces (special case for 3x penalty)
   * @param {Object} firstCard - First card
   * @param {Object} secondCard - Second card
   * @param {Object} thirdCard - Third card
   * @returns {Boolean} True if all three cards are aces
   */
  isTripleAceTie(firstCard, secondCard, thirdCard) {
    // First check if all cards exist
    if (!firstCard || !secondCard || !thirdCard) return false;
    
    // Then check if all three are aces
    return firstCard.value === 'A' && secondCard.value === 'A' && thirdCard.value === 'A';
  }
  
  /**
   * Check if the first two cards match but aren't Aces, making the player eligible for a second chance
   * @param {Object} firstCard - The first card
   * @param {Object} secondCard - The second card
   * @returns {Boolean} True if the cards match and aren't Aces
   */
  isSecondChanceEligible(firstCard, secondCard) {
    // First check if both cards exist
    if (!firstCard || !secondCard) return false;
    
    // Then check if they have the same value but aren't Aces
    return firstCard.value === secondCard.value && firstCard.value !== 'A';
  }
}

module.exports = new CardService();
