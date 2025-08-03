const BaseAchievement = require('./BaseAchievement');

/**
 * TripleAcePenaltyAchievement - Awarded for receiving a Triple Ace penalty
 */
class TripleAcePenaltyAchievement extends BaseAchievement {
  constructor() {
    super('triple_ace_penalty', 'Ace Hole', 'Got schooled by three aces like a total amateur');
  }

  checkGame(game, userId, username) {
    // Check if this game contains a triple ace penalty for the user
    const gameData = game.gameData || game;
    const transactions = gameData.gameTransactions || [];

    // Filter to user's transactions
    const userTransactions = transactions.filter(tx => {
      const playerName = tx.player || tx.playerName;
      return playerName && playerName.toLowerCase() === username.toLowerCase();
    });

    // Check for triple ace penalty
    return userTransactions.some(tx => {
      const txType = (tx.transactionType || '').toLowerCase();
      return txType === '3x';
    });
  }

  checkHistorical(context, userId, username) {
    // Check if any historical game had a triple ace penalty
    return context.hasTripleAcePenalty || false;
  }

}

module.exports = TripleAcePenaltyAchievement;