const BaseAchievement = require('./BaseAchievement');

/**
 * TenGamesAchievement - Awarded for playing 10 games
 */
class TenGamesAchievement extends BaseAchievement {
  constructor() {
    super('ten_games', 'Regular', 'Ten games? Someone\'s getting the hang of this!');
  }

  checkGame(game, userId, username) {
    // Cannot be determined from single game
    return false;
  }

  checkHistorical(context, userId, username) {
    // Award if user has played at least 10 games
    return context.gamesPlayed >= 10;
  }

}

module.exports = TenGamesAchievement;