const BaseAchievement = require('./BaseAchievement');

/**
 * BetaTesterAchievement - Given to all players (temporary achievement)
 */
class BetaTesterAchievement extends BaseAchievement {
  constructor() {
    super('beta_tester', 'Beta Tester', 'Thank you for testing the game!');
  }

  checkGame(game, userId, username) {
    // Always award to any player who plays a game
    return true;
  }

  async checkHistorical(context, userId, username) {
    // Always award to any player who has played games
    return context.gamesPlayed > 0;
  }
}

module.exports = BetaTesterAchievement;