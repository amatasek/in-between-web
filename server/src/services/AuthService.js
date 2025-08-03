const BaseService = require('./BaseService');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
const { STARTING_BALANCE } = require('../../../shared/constants/GameConstants');

// Use JWT secret from centralized config
const JWT_SECRET = config.jwtSecret
const SALT_ROUNDS = 10;

class AuthService extends BaseService {
  constructor() {
    super();
    // For direct usage outside the service registry
    this._dbService = null;
  }
  
  /**
   * Get the database service, either from the registry or directly
   * @returns {Object} The database service
   */
  getDatabaseService() {
    if (this._dbService) {
      return this._dbService;
    }
    
    try {
      return this.getService('database');
    } catch (error) {
      // If we're not in the service registry context, load the database service directly
      if (!this._dbService) {
        this._dbService = require('./DatabaseService');
      }
      return this._dbService;
    }
  }
  
  async register(username, password) {
    // Validate input
    if (!username || !password) {
      throw new Error('Username and password are required');
    }

    if (username.length < 3) {
      throw new Error('Username must be at least 3 characters long');
    }

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create user in database
    const databaseService = this.getService('database');
    const user = await databaseService.createUser({
      username,
      hashedPassword
    });

    // Generate JWT token
    const token = await this.generateToken(user._id);

    return {
      user: { 
        id: user._id, 
        username: user.username,
        balance: user.balance || 0
      },
      token
    };
  }

  async login(username, password) {
    const databaseService = this.getDatabaseService();
    const user = await databaseService.getUserByUsername(username);
    
    if (!user || !user.password) {
      throw new Error('Invalid username or password');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid username or password');
    }
    
    // Reset balance and get updated user
    await databaseService.updateUser(user._id, { balance: STARTING_BALANCE });
    const updatedUser = await databaseService.getUserById(user._id);
    
    const token = await this.generateToken(updatedUser._id);

    // Process historical achievements (background, non-blocking)
    this.processAchievementsAsync(updatedUser._id, updatedUser.username);

    return {
      user: { 
        id: updatedUser._id, 
        username: updatedUser.username,
        balance: updatedUser.balance
      },
      token
    };
  }

  processAchievementsAsync(userId, username) {
    setImmediate(async () => {
      try {
        const achievementService = this.getService('achievement');
        await achievementService?.processHistoricalAchievements(userId, username);
      } catch (error) {
        // Silently fail - achievements are not critical for login
      }
    });
  }

  async generateToken(userId) {
    // Get full user info to include in token
    const databaseService = this.getDatabaseService();
    const user = await databaseService.getUserById(userId);
    if (!user) throw new Error('User not found');
    
    return jwt.sign({ 
      userId,
      username: user.username
    }, JWT_SECRET, {
      expiresIn: '24h'
    });
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  async getUserFromToken(token) {
    const decoded = this.verifyToken(token);
    const databaseService = this.getDatabaseService();
    return databaseService.getUserById(decoded.userId);
  }
}

module.exports = new AuthService();
