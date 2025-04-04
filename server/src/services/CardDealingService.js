const BaseService = require('./BaseService');
const { gameLog } = require('../utils/logger');
const { GamePhases } = require('../../../shared/constants/GamePhases');

class CardDealingService extends BaseService {
  constructor() {
    super();
  }
  dealCards(game) {
    if (!game) return game;
    
    // Reset cards
    game.firstCard = null;
    game.secondCard = null;
    game.thirdCard = null;
    game.waitingForAceDecision = false;
    
    // Deal first card
    const cardService = this.getService('card');
    game.firstCard = cardService.dealFirstCard(game);
    gameLog(game, `First card dealt: ${game.firstCard.value}${game.firstCard.suit}`);
    
    // Check if the first card is an Ace
    if (game.firstCard.value === 'A') {
      game.waitingForAceDecision = true;

      gameLog(game, `First card is an Ace. Waiting for player to choose high/low`);
    }
    

    
    game.updateTimestamp();
    return game;
  }

  dealSecondCard(game) {
    if (!game || !game.firstCard) return game;
    
    // Deal second card
    const cardService = this.getService('card');
    game.secondCard = cardService.dealSecondCard(game);
    gameLog(game, `Second card dealt: ${game.secondCard.value}${game.secondCard.suit}`);
    
    game.updateTimestamp();
    return game;
  }

  dealAndRevealMiddleCard(game) {
    if (!game || !game.firstCard || !game.secondCard) return game;
    
    // Deal middle card
    const cardService = this.getService('card');
    game.thirdCard = cardService.dealThirdCard(game);
    gameLog(game, `Middle card revealed: ${game.thirdCard.value}${game.thirdCard.suit}`);
    
    // Move to results phase
    game.phase = GamePhases.RESULTS;
    
    game.updateTimestamp();
    return game;
  }

  dealCardsForPlayer(game) {
    if (!game || !game.currentPlayerId) return game;
    
    // Reset cards for new player
    game.firstCard = null;
    game.secondCard = null;
    game.thirdCard = null;
    
    // Deal first card
    const cardService = this.getService('card');
    game.firstCard = cardService.dealFirstCard(game);
    gameLog(game, `First card dealt for ${game.players[game.currentPlayerId].name}: ${game.firstCard.value}${game.firstCard.suit}`);
    
    game.updateTimestamp();
    return game;
  }

  ensureDeckAvailable(game) {
    if (!game) return game;
    
    // Create new deck if needed
    if (!game.deck || game.deck.length < 3) {
      const cardService = this.getService('card');
      game.deck = cardService.shuffleDeck(cardService.createDeck());
      game.deckCount = 1;
      gameLog(game, `New deck created, ${game.deck.length} cards`);
    }
    
    return game;
  }
}

module.exports = new CardDealingService();
