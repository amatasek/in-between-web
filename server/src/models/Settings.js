

/**
 * Settings Model - Core game settings
 */
class Settings {
  constructor(options = {}) {
    this.customName = options.customName ?? null;
    this.isPrivate = options.isPrivate ?? false;
    this.password = options.password ?? null;
    this.enableAceChoice = options.enableAceChoice ?? true;
    this.enableSecondChance = options.enableSecondChance ?? true;
    this.numberOfBots = options.numberOfBots ?? 0;

    // Custom Name Validation (only if a name is actually provided)
    if (this.customName) {
      if (this.customName.length < 4 || this.customName.length > 26) {
        throw new Error('Custom game name must be between 4 and 26 characters.');
      }
      // URL-friendly check: alphanumeric, hyphen, underscore
      if (!/^[a-zA-Z0-9_-]+$/.test(this.customName)) {
        throw new Error('Custom game name can only contain letters, numbers, hyphens, and underscores.');
      }
    }

    // Password Validation (only if isPrivate is true AND a password is provided)
    if (this.isPrivate && this.password) {
      if (this.password.length < 3 || this.password.length > 36) {
        throw new Error('Password must be between 3 and 36 characters.');
      }
      // No specific character restrictions mentioned for password
    } else if (this.isPrivate && !this.password) {
      // If private is true but no password given, this is an invalid state
      throw new Error('A password is required for private games.');
    }

    // Number of Bots Validation
    const { MAX_SEATS } = require('../../../shared/constants/GameConstants');
    if (this.numberOfBots < 0 || this.numberOfBots > MAX_SEATS) {
      throw new Error(`Number of bots must be between 0 and ${MAX_SEATS}.`);
    }
  }

  toJSON() {
    return {
      isPrivate: this.isPrivate,
      enableAceChoice: this.enableAceChoice,
      enableSecondChance: this.enableSecondChance,
      numberOfBots: this.numberOfBots
    };
  }
}

module.exports = Settings;
