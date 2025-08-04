const PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));
const path = require('path');
const fs = require('fs');
const { STARTING_BALANCE } = require('../../../shared/constants/GameConstants');
const { DEFAULT_PREFERENCES, ensureCompletePreferences, isValidPreferenceKey } = require('../models/PreferencesSchema');

// Import config
const config = require('../config');

// Determine if we should use CouchDB or local files
const USE_COUCHDB = !!config.couchdbUrl && config.couchdbUrl !== 'false';

let userDb, gameDb, purchaseDb;

if (USE_COUCHDB) {
  // Use CouchDB
  console.log(`[DB] Connecting to CouchDB at: ${config.couchdbUrl.replace(/\/\/.*@/, '//***:***@')}`);
  
  userDb = new PouchDB(`${config.couchdbUrl}/users`);
  gameDb = new PouchDB(`${config.couchdbUrl}/games`);
  purchaseDb = new PouchDB(`${config.couchdbUrl}/purchases`);
  
  // Test connections and auto-migrate if needed
  Promise.all([
    userDb.info(),
    gameDb.info(),
    purchaseDb.info()
  ]).then(() => {
    console.log('[DB] Successfully connected to all CouchDB databases');
    // Check if migration is needed
    autoMigrateIfNeeded();
  }).catch(error => {
    console.error('[DB] Failed to connect to CouchDB:', error.message);
  });
  
} else {
  // Use local file-based PouchDB (original code)
  
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
  const purchaseDbPath = path.resolve(config.dbPath, 'purchases');

  console.log(`[DB] User database path: ${userDbPath}`);
  console.log(`[DB] Game database path: ${gameDbPath}`);
  console.log(`[DB] Purchase database path: ${purchaseDbPath}`);

  // Ensure the specific database directories exist
  if (!fs.existsSync(userDbPath)) {
    console.log(`[DB] Creating users database directory: ${userDbPath}`);
    fs.mkdirSync(userDbPath, { recursive: true });
  }

  if (!fs.existsSync(gameDbPath)) {
    console.log(`[DB] Creating games database directory: ${gameDbPath}`);
    fs.mkdirSync(gameDbPath, { recursive: true });
  }

  if (!fs.existsSync(purchaseDbPath)) {
    console.log(`[DB] Creating purchases database directory: ${purchaseDbPath}`);
    fs.mkdirSync(purchaseDbPath, { recursive: true });
  }

  // Database instances with configured path
  userDb = new PouchDB(userDbPath);
  gameDb = new PouchDB(gameDbPath);
  purchaseDb = new PouchDB(purchaseDbPath);
}

// Create indexes for efficient querying
userDb.createIndex({
  index: { fields: ['username'] }
}).catch(console.error);

purchaseDb.createIndex({
  index: { fields: ['userId', 'purchasedAt'] }
}).catch(console.error);

class DatabaseService {
  constructor() {
    this.userDb = userDb;
    this.gameDb = gameDb;
    this.purchaseDb = purchaseDb;
  }

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
        xp: 0, // Starting XP
        transactions: [], // Track balance changes
        preferences: DEFAULT_PREFERENCES, // Use default preferences from schema
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
    
    // Validate the preference key
    if (!isValidPreferenceKey(key)) {
      console.warn(`[DB] Invalid preference key attempted: ${key}`);
      throw new Error(`Invalid preference key: ${key}`);
    }
    
    // Initialize preferences object if it doesn't exist
    if (!user.preferences) {
      user.preferences = DEFAULT_PREFERENCES;
    }
    
    // Ensure we have a complete preferences object with all required fields
    const currentPreferences = ensureCompletePreferences(user.preferences);
    
    // Update the specific preference
    const preferences = {
      ...currentPreferences,
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
    
    // Return complete preferences with any missing values set to defaults
    return ensureCompletePreferences(user.preferences);
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
          // Ensure each user's preferences are complete with defaults
          preferencesMap[row.id] = ensureCompletePreferences(row.doc.preferences);
        }
      });
      
      console.log('[DB] Successfully loaded preferences for users:', { count: Object.keys(preferencesMap).length });
    } catch (error) {
      console.error('[DB] Error loading batch preferences:', error);
    }
    
    return preferencesMap;
  }

  async updateBalance(userId, amount, reason) {
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

  async updateXPBulk(userIds, amount) {
    try {
      const updates = await Promise.all(
        userIds.map(async (userId) => {
          const user = await this.getUserById(userId);
          if (!user) return null;
          
          const newXP = (user.xp || 0) + amount;
          user.xp = newXP;
          
          return this.updateUser(user._id, { xp: newXP });
        })
      );
      
      return updates.filter(u => u !== null);
    } catch (error) {
      console.error('[DB] Error updating XP in bulk:', error);
      throw error;
    }
  }

  // Game operations
  async saveGame(game) {
    if (!game || !game.id) {
      console.error('[DATABASE_SERVICE] Cannot save game: Invalid game object');
      return null;
    }

    // Create a plain object copy of the game for PouchDB
    const gameDoc = {
      _id: game.id
    };

    // Copy all properties from the game object, excluding functions
    for (const key in game) {
      if (typeof game[key] !== 'function') {
        // Special handling for settings to ensure we don't use toJSON during serialization
        if (key === 'settings') {
          // Create a complete copy of all settings properties for database
          gameDoc.settings = { ...game.settings };
        } else {
          gameDoc[key] = game[key];
        }
      }
    }

    try {
      const existingGame = await gameDb.get(game.id);
      gameDoc._rev = existingGame._rev;
    } catch (error) {
      // Game doesn't exist yet, which is fine
    }

    console.log(`[DATABASE_SERVICE] Saving game ${game.id} to database`);
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

  // Purchase operations
  async createPurchase(purchaseData) {
    console.log('[DB] Creating purchase record:', { id: purchaseData.id, userId: purchaseData.userId });
    try {
      const result = await purchaseDb.put(purchaseData);
      console.log('[DB] Purchase record saved successfully:', result);
      return result;
    } catch (error) {
      console.error('[DB] Error creating purchase record:', error);
      throw error;
    }
  }

  async getPurchasesByUserId(userId, options = {}) {
    const { limit = 50, skip = 0 } = options;
    
    try {
      const result = await purchaseDb.find({
        selector: {
          type: 'purchase',
          userId: userId
        },
        sort: [{ 'purchasedAt': 'desc' }],
        limit,
        skip
      });
      
      return result.docs;
    } catch (error) {
      console.error('[DB] Error getting purchases by user ID:', error);
      throw error;
    }
  }

  /**
   * Get user achievements by user ID
   * @param {string} userId - User ID
   * @returns {Array} Array of user achievements
   */
  async getUserAchievements(userId) {
    try {
      const result = await userDb.find({
        selector: {
          type: 'user_achievement',
          userId: userId
        }
      });
      
      return result.docs;
    } catch (error) {
      console.error('[DB] Error getting user achievements:', error);
      return [];
    }
  }

  /**
   * Save a user achievement
   * @param {Object} userAchievement - User achievement object
   * @returns {Object} Saved achievement
   */
  async saveUserAchievement(userAchievement) {
    try {
      // Add required fields
      const achievementDoc = {
        _id: `user_achievement_${userAchievement.userId}_${userAchievement.achievementId}`,
        type: 'user_achievement',
        ...userAchievement
      };
      
      const result = await userDb.put(achievementDoc);
      return { ...achievementDoc, _rev: result.rev };
    } catch (error) {
      console.error('[DB] Error saving user achievement:', error);
      throw error;
    }
  }

}

// Auto-migration function
async function autoMigrateIfNeeded() {
  if (!USE_COUCHDB) return;
  
  console.log('[DB] Checking if migration is needed...');
  
  const DATABASES = [
    { name: 'users', path: path.resolve(config.dbPath, 'users'), db: userDb },
    { name: 'games', path: path.resolve(config.dbPath, 'games'), db: gameDb },
    { name: 'purchases', path: path.resolve(config.dbPath, 'purchases'), db: purchaseDb },
    { name: 'game-history', path: path.join(config.dbPath, 'game-history'), db: new PouchDB(`${config.couchdbUrl}/game-history`) }
  ];
  
  for (const dbConfig of DATABASES) {
    try {
      // Check if local PouchDB files exist
      if (!fs.existsSync(dbConfig.path)) {
        console.log(`[DB] No local files found for ${dbConfig.name}, skipping`);
        continue;
      }
      
      // Check if CouchDB already has user data (ignore design docs)
      const remoteDocs = await dbConfig.db.allDocs();
      const userDocs = remoteDocs.rows.filter(row => !row.id.startsWith('_design/'));
      if (userDocs.length > 0) {
        console.log(`[DB] ${dbConfig.name} already has ${userDocs.length} user documents, skipping migration`);
        continue;
      }
      
      console.log(`[DB] Starting migration for ${dbConfig.name}...`);
      
      // Connect to local PouchDB
      const localDb = new PouchDB(dbConfig.path);
      const localInfo = await localDb.info();
      
      if (localInfo.doc_count === 0) {
        console.log(`[DB] ${dbConfig.name} is empty locally, skipping`);
        continue;
      }
      
      console.log(`[DB] Migrating ${localInfo.doc_count} documents from ${dbConfig.name}...`);
      
      // Get all documents
      const allDocs = await localDb.allDocs({ include_docs: true });
      const docsToInsert = allDocs.rows.map(row => {
        const doc = { ...row.doc };
        delete doc._rev; // Remove revision field
        return doc;
      });
      
      // Bulk insert
      const result = await dbConfig.db.bulkDocs(docsToInsert);
      const successful = result.filter(doc => !doc.error);
      
      console.log(`[DB] ✅ Migrated ${successful.length} documents to ${dbConfig.name}`);
      
    } catch (error) {
      console.error(`[DB] ❌ Migration failed for ${dbConfig.name}:`, error.message);
    }
  }
  
  console.log('[DB] Auto-migration complete!');
}

module.exports = new DatabaseService();
