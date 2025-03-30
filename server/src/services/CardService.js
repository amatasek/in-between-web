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
   * Deal the first card (left card)
   * @param {Game} game - The game object
   * @returns {Object} The first card
   */
  dealFirstCard(game) {
    if (!game || !game.deck) return null;
    
    // Check if we need to reshuffle
    if (game.deck.length < 3) {
      this.handleDeckRenewal(game);
    }
    
    // Deal first card (left position)
    const firstCard = game.deck.pop();
    
    gameLog(game, `Dealt first card: ${firstCard.value}${firstCard.suit} (left position)`);
    gameLog(game, `Cards remaining in deck: ${game.deck.length}`);
    
    return firstCard;
  }
  
  /**
   * Deal the second card (right card)
   * @param {Game} game - The game object
   * @returns {Object} The second card
   */
  dealSecondCard(game) {
    if (!game || !game.deck) return null;
    
    // Check if we need to reshuffle
    if (game.deck.length < 2) {
      this.handleDeckRenewal(game);
    }
    
    // Deal second card (right position)
    const secondCard = game.deck.pop();
    
    gameLog(game, `Dealt second card: ${secondCard.value}${secondCard.suit} (right position)`);
    gameLog(game, `Cards remaining in deck: ${game.deck.length}`);
    
    return secondCard;
  }

  /**
   * Deal the third card (middle card) when it's time to reveal
   * @param {Game} game - The game object
   * @returns {Object} The middle card that was dealt
   */
  dealThirdCard(game) {
    if (!game || !game.deck) return null;
    
    // Check if we need to reshuffle
    if (game.deck.length < 1) {
      gameLog(game, 'Emergency reshuffle needed before dealing middle card');
      game.deck = this.shuffleDeck(this.createDeck());
    }
    
    // Deal the middle card
    const thirdCard = game.deck.pop();
    thirdCard.revealed = true; // It's revealed immediately
    
    gameLog(game, `Dealt third card: ${thirdCard.value}${thirdCard.suit} (middle position)`);
    gameLog(game, `Cards remaining in deck: ${game.deck.length}`);
    
    return thirdCard;
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
   * @param {Object} lowerCard - The card with the lower value
   * @param {Object} middleCard - The middle card to check
   * @param {Object} higherCard - The card with the higher value
   * @returns {Boolean} True if middle card is between the outer cards
   */
  isCardBetween(lowerCard, middleCard, higherCard) {
    const lowerValue = this.valueMap[lowerCard.value];
    const middleValue = this.valueMap[middleCard.value];
    const higherValue = this.valueMap[higherCard.value];
    
    return middleValue > lowerValue && middleValue < higherValue;
  }

  /**
   * Get the value of a card
   * @param {Object} card - The card object
   * @returns {Number} The numeric value of the card
   */
  getCardValue(card) {
    return this.valueMap[card.value];
  }
}

module.exports = new CardService();
