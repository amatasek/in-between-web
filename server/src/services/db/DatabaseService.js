const PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));
const { STARTING_BALANCE } = require('../../../../shared/constants/GameConstants');

// Database instances
const userDb = new PouchDB('users');
const gameDb = new PouchDB('games');

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
      fields: ['_id', '_rev', 'username', 'password', 'balance', 'transactions', 'createdAt']
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
      previousBalance: user.balance,
      newBalance
    };

    const updatedUser = {
      ...user,
      balance: newBalance,
      transactions: [...(user.transactions || []), transaction],
      _id: user._id,
      _rev: user._rev
    };

    console.log('[DB] Saving updated balance:', { 
      userId,
      oldBalance: user.balance,
      newBalance,
      reason
    });

    return userDb.put(updatedUser);
  }

  // Game operations (placeholder for future implementation)
  async createGame(gameData) {
    const game = {
      _id: `game_${Date.now()}`,
      type: 'game',
      ...gameData,
      createdAt: new Date().toISOString()
    };

    return gameDb.put(game);
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
}

module.exports = new DatabaseService();
