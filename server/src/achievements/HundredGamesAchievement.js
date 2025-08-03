const BaseAchievement = require('./BaseAchievement');

/**
 * HundredGamesAchievement - Awarded for playing 100 games
 */
class HundredGamesAchievement extends BaseAchievement {
  constructor() {
    super('hundred_games', 'Card Shark', 'One hundred games?! Do you have a job?');
  }

  checkGame(game, userId, username) {
    // Cannot be determined from single game
    return false;
  }

  checkHistorical(context, userId, username) {
    // Award if user has played at least 100 games
    return context.gamesPlayed >= 100;
  }

}

module.exports = HundredGamesAchievement;