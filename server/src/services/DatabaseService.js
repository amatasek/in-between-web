const PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));
const path = require('path');
const fs = require('fs');
const { STARTING_BALANCE } = require('../../../shared/constants/GameConstants');

// Import config
const config = require('../../config');

// Ensure the database directory exists
try {
  if (!fs.existsSync(config.dbPath)) {
    console.log(`[DB] Creating database directory: ${config.dbPath}`);
    fs.mkdirSync(config.dbPath, { recursive: true });
  }
  
  // Test write access to the directory
  const testFile = path.join(config.dbPath, '.db-write-test');
  fs.writeFileSync(testFile, 'test');
  fs.unlinkSync(testFile);
  console.log(`[DB] Successfully verified write access to: ${config.dbPath}`);
} catch (error) {
  console.error(`[DB] Error with database directory ${config.dbPath}:`, error.message);
  throw new Error(`Cannot access database directory: ${error.message}`);
}

console.log(`[DB] Using database path: ${config.dbPath}`);

// Use absolute paths for PouchDB to avoid path resolution issues
const userDbPath = path.resolve(config.dbPath, 'users');
const gameDbPath = path.resolve(config.dbPath, 'games');

console.log(`[DB] User database path: ${userDbPath}`);
console.log(`[DB] Game database path: ${gameDbPath}`);

// Database instances with configured path
const userDb = new PouchDB(userDbPath);
const gameDb = new PouchDB(gameDbPath);

// Create indexes for efficient querying
userDb.createIndex({
  index: { fields: ['username'] }
}).catch(console.error);

class DatabaseService {
  // User operations
  async createUser({ username, hashedPassword }) {
    console.log('[DB] Creating user:', { username });
    try {
      const existingUser = await this.getUserByUsername(username);
      console.log('[DB] Existing user check:', { exists: !!existingUser });
      
      if (existingUser) {
        throw new Error('Username already exists');
      }

      const user = {
        _id: `user_${username}`,
        type: 'user',
        username,
        password: hashedPassword,
        balance: STARTING_BALANCE, // Starting balance from constants
        transactions: [], // Track balance changes
        preferences: {
          autoAnte: false // Auto-ante feature default setting
        },
        createdAt: new Date().toISOString()
      };

      console.log('[DB] Attempting to save user:', { _id: user._id });
      const result = await userDb.put(user);
      console.log('[DB] User saved successfully:', result);
      
      user._rev = result.rev; // Add the revision ID
      return user;
    } catch (error) {
      console.error('[DB] Error creating user:', error);
      throw error;
    }
  }

  async getUserByUsername(username) {
    const result = await userDb.find({
      selector: {
        type: 'user',
        username: username
      },
      fields: ['_id', '_rev', 'username', 'password', 'balance', 'transactions', 'preferences', 'createdAt']
    });

    return result.docs[0];
  }

  async getUserById(userId) {
    try {
      return await userDb.get(userId);
    } catch (error) {
      if (error.name === 'not_found') {
        return null;
      }
      throw error;
    }
  }

  async updateUser(userId, updates) {
    const user = await this.getUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const updatedUser = {
      ...user,
      ...updates,
      _id: user._id,
      _rev: user._rev
    };

    return userDb.put(updatedUser);
  }
  
  async updatePreference(userId, key, value) {
    console.log('[DB] Updating preference:', { userId, key, value });
    const user = await this.getUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    
    // Initialize preferences object if it doesn't exist
    if (!user.preferences) {
      user.preferences = {};
    }
    
    // Update the specific preference
    const preferences = {
      ...user.preferences,
      [key]: value
    };
    
    // Update the user with the new preferences
    const result = await this.updateUser(user._id, { preferences });
    
    console.log('[DB] Preference updated:', { userId, key, value, result });
    return {
      userId,
      preferences
    };
  }
  
  async getPreferences(userId) {
    console.log('[DB] Getting preferences:', { userId });
    const user = await this.getUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    
    // Return preferences or empty object if none exist
    return user.preferences || {};
  }

  /**
   * Get preferences for multiple users in a single batch operation
   * @param {Array<string>} userIds - Array of user IDs
   * @returns {Object} Map of user IDs to their preferences
   */
  async getPreferencesForUsers(userIds) {
    if (!userIds || !userIds.length) {
      return {};
    }
    
    console.log('[DB] Getting preferences for multiple users:', { count: userIds.length });
    
    // Create a map to store results
    const preferencesMap = {};
    
    try {
      // Get all users in a single batch operation
      const result = await userDb.allDocs({
        keys: userIds,
        include_docs: true
      });
      
      // Process results and extract preferences
      result.rows.forEach(row => {
        if (row.doc && !row.error) {
          preferencesMap[row.id] = row.doc.preferences || {};
        }
      });
      
      console.log('[DB] Successfully loaded preferences for users:', { count: Object.keys(preferencesMap).length });
    } catch (error) {
      console.error('[DB] Error loading batch preferences:', error);
    }
    
    return preferencesMap;
  }

  async updateBalance(userId, amount, reason) {
    console.log('[DB] Updating balance:', { userId, amount, reason });
    const user = await this.getUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const newBalance = (user.balance || 0) + amount;
    if (newBalance < 0) {
      throw new Error('Insufficient funds');
    }

    const transaction = {
      timestamp: new Date().toISOString(),
      amount,
      reason,
      oldBalance: user.balance,
      newBalance
    };

    console.log('[DB] Saving updated balance:', transaction);

    // Add the transaction to the history
    if (!user.transactions) {
      user.transactions = [];
    }
    user.transactions.push(transaction);

    // Update the balance
    user.balance = newBalance;

    // Save the updated user
    return this.updateUser(user._id, {
      balance: newBalance,
      transactions: user.transactions
    });
  }

  async getBalance(userId) {
    const user = await this.getUserById(userId);
    return user ? user.balance : 0;
  }

  // Game operations
  async saveGame(game) {
    const gameDoc = {
      _id: game.id,
      ...game
    };

    try {
      const existingGame = await gameDb.get(game.id);
      gameDoc._rev = existingGame._rev;
    } catch (error) {
      // Game doesn't exist yet, which is fine
    }

    return gameDb.put(gameDoc);
  }

  async getGame(gameId) {
    try {
      return await gameDb.get(gameId);
    } catch (error) {
      if (error.name === 'not_found') {
        return null;
      }
      throw error;
    }
  }

  async deleteGame(gameId) {
    try {
      const game = await gameDb.get(gameId);
      return gameDb.remove(game);
    } catch (error) {
      if (error.name === 'not_found') {
        return null;
      }
      throw error;
    }
  }

  async getAllGames() {
    const result = await gameDb.allDocs({
      include_docs: true
    });
    return result.rows.map(row => row.doc);
  }
}

module.exports = new DatabaseService();
