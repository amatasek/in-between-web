const PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));

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
    const existingUser = await this.getUserByUsername(username);
    if (existingUser) {
      throw new Error('Username already exists');
    }

    const user = {
      _id: `user_${username}`,
      type: 'user',
      username,
      password: hashedPassword,
      createdAt: new Date().toISOString()
    };

    return userDb.put(user);
  }

  async getUserByUsername(username) {
    const result = await userDb.find({
      selector: {
        type: 'user',
        username: username
      }
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
