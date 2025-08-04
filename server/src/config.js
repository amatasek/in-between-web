const path = require('path');
const fs = require('fs');

// Load environment variables from .env file in development
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const isProduction = process.env.NODE_ENV === 'production';

// Set up paths based on environment
const dataPath = isProduction ? '/var/data' : path.join(__dirname, '../../data');
const dbPath = isProduction ? path.join(dataPath, 'db') : path.join(__dirname, '../../db');
const filesPath = path.join(dataPath, 'files');

console.log(`[CONFIG] Environment: ${isProduction ? 'Production' : 'Development'}`);
console.log(`[CONFIG] Data path: ${dataPath}`);
console.log(`[CONFIG] Database path: ${dbPath}`);
console.log(`[CONFIG] Files path: ${filesPath}`);

/**
 * Creates a directory if it doesn't exist and logs the action
 * @param {string} dirPath - Path to create
 * @param {string} dirType - Type of directory for logging
 */
function ensureDirectoryExists(dirPath, dirType) {
  if (!fs.existsSync(dirPath)) {
    console.log(`[CONFIG] Creating ${dirType} directory: ${dirPath}`);
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Ensure all required directories exist
try {
  // Create main directories
  ensureDirectoryExists(dataPath, 'data');
  ensureDirectoryExists(dbPath, 'database');
  ensureDirectoryExists(filesPath, 'files');
  
  // Create database subdirectories
  ensureDirectoryExists(path.join(dbPath, 'users'), 'users database');
  ensureDirectoryExists(path.join(dbPath, 'games'), 'games database');
  
  // Create file subdirectories
  ensureDirectoryExists(path.join(filesPath, 'images'), 'images');
  ensureDirectoryExists(path.join(filesPath, 'audio'), 'audio');
  ensureDirectoryExists(path.join(filesPath, 'other'), 'other files');
  
  // Test write access to the data directory
  const testFile = path.join(dataPath, '.test-write-access');
  fs.writeFileSync(testFile, 'test');
  fs.unlinkSync(testFile);
  console.log(`[CONFIG] Successfully verified write access to: ${dataPath}`);
} catch (error) {
  console.error(`[CONFIG] Error with directory setup: ${error.message}`);
  throw new Error(`Cannot set up required directories: ${error.message}`);
}

// Export configuration
const config = {
  port: process.env.PORT || 10000,
  jwtSecret: process.env.JWT_SECRET || 'development-jwt-secret',
  dataPath,
  dbPath,
  filesPath,
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  logLevel: isProduction ? 'info' : 'debug',
  isProduction,
  couchdbUrl: process.env.COUCHDB_URL || 'http://admin:devpassword@localhost:5984'
};

module.exports = config;
