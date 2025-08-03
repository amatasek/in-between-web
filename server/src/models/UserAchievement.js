/**
 * UserAchievement Model - Tracks unlocked achievements for users
 */

class UserAchievement {
  constructor(data = {}) {
    this.userId = data.userId || null;
    this.achievementId = data.achievementId || null;
    this.unlockedAt = data.unlockedAt || new Date().toISOString();
  }

  toJSON() {
    return {
      userId: this.userId,
      achievementId: this.achievementId,
      unlockedAt: this.unlockedAt
    };
  }

  static fromDocument(doc) {
    return new UserAchievement(doc);
  }
}

module.exports = UserAchievement;