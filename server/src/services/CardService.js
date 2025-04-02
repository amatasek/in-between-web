/**
 * CardService - Handles all card operations including deck management,
 * shuffling, dealing, and card value comparisons
 */
const { gameLog } = require('../utils/logger');

class CardService {
  constructor() {
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
    if (!game || game.deck?.length > 0) return game;
    
    gameLog(game, 'Creating new deck for game');
    game.deck = this.shuffleDeck(this.createDeck());
    gameLog(game, `Deck created with ${game.deck.length} cards`);
    
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
    
    // Check if we need to reshuffle
    if (game.deck.length < 3) {
      this.handleDeckRenewal(game);
    }
    
    // Deal the first card (left position)
    const firstCard = game.deck.pop();
    
    gameLog(game, `Dealt first card: ${firstCard.value}${firstCard.suit} (left position)`);
    gameLog(game, `Cards remaining in deck: ${game.deck.length}`);
    
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
    
    // Check if we need to reshuffle
    if (game.deck.length < 2) {
      this.handleDeckRenewal(game);
    }
    
    // Deal second card (right position)
    const secondCard = game.deck.pop();
    
    // Second card is now dealt
    
    gameLog(game, `Dealt second card: ${secondCard.value}${secondCard.suit} (right position)`);
    gameLog(game, `Cards remaining in deck: ${game.deck.length}`);
    
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
    
    // Check if we need to reshuffle
    if (game.deck.length < 1) {
      gameLog(game, 'Emergency reshuffle needed before dealing middle card');
      game.deck = this.shuffleDeck(this.createDeck());
    }
    
    // Deal the middle card
    const thirdCard = game.deck.pop();
    
    // Update game state
    game.thirdCard = thirdCard;
    
    gameLog(game, `Dealt third card: ${thirdCard.value}${thirdCard.suit} (middle position)`);
    gameLog(game, `Cards remaining in deck: ${game.deck.length}`);
    
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
    gameLog(game, `This is deck #${game.deckCount}`);
    
    // Only rotate dealer if there are multiple players
    if (game.playerOrder.length > 1) {
      this.rotateDealerOnNewDeck(game);
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
    
    const currentDealerIndex = connectedPlayers.indexOf(game.dealerId);
    const nextDealerIndex = (currentDealerIndex + 1) % connectedPlayers.length;
    
    const oldDealer = game.players[game.dealerId].name;
    game.dealerId = connectedPlayers[nextDealerIndex];
    const newDealer = game.players[game.dealerId].name;
    
    gameLog(game, `Dealer rotated from ${oldDealer} to ${newDealer} on new deck`);
    
    // Return notification info to send to clients
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
