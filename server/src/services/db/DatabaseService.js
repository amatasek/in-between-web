const PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));
const path = require('path');
const { STARTING_BALANCE } = require('../../../../shared/constants/GameConstants');

// Use absolute path for database files
const DB_PATH = path.resolve(__dirname, '../../../../db');

// Database instances with absolute paths
const userDb = new PouchDB(path.join(DB_PATH, 'users'));
const gameDb = new PouchDB(path.join(DB_PATH, 'games'));

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
