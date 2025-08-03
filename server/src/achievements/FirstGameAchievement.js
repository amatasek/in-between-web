const BaseAchievement = require('./BaseAchievement');

/**
 * FirstGameAchievement - Awarded for playing your first game
 */
class FirstGameAchievement extends BaseAchievement {
  constructor() {
    super('first_game', 'Rookie', 'Play your first game');
  }

  checkGame(game, userId, username) {
    // Can be awarded from any game completion
    return true;
  }

  checkHistorical(context, userId, username) {
    // Award if user has played at least 1 game
    return context.gamesPlayed >= 1;
  }

}

module.exports = FirstGameAchievement;