const path = require('path');
const fs = require('fs');

// Load environment variables from .env file in development
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Determine the appropriate data directory path based on environment variable or default
let dataPath = process.env.DATA_PATH || path.join(__dirname, '../../data');
console.log(`Using data directory from config: ${dataPath}`);

// Create the data directory if it doesn't exist
try {
  if (!fs.existsSync(dataPath)) {
    console.log(`Creating data directory: ${dataPath}`);
    fs.mkdirSync(dataPath, { recursive: true });
  }
  
  // Test write access to the directory
  const testFile = path.join(dataPath, '.test-write-access');
  fs.writeFileSync(testFile, 'test');
  fs.unlinkSync(testFile);
  console.log(`Successfully verified write access to: ${dataPath}`);
} catch (error) {
  console.error(`Error with data directory ${dataPath}:`, error.message);
}

// Configure database paths based on environment
let dbPath;
const originalDbPath = path.join(__dirname, '../../db');

if (process.env.NODE_ENV === 'production') {
  // In production, use the persistent volume path with /db subdirectory
  // This ensures PouchDB always uses the same path across deployments
  dbPath = path.join(dataPath, 'db');
  console.log(`Using production database path: ${dbPath}`);
} else {
  // In development, always use the original db path
  dbPath = originalDbPath;
  console.log(`Using original database path for development: ${dbPath}`);
}

// Set up files path
const filesPath = path.join(dataPath, 'files');

// Create the DB directory if it doesn't exist
if (!fs.existsSync(dbPath)) {
  console.log(`Creating database directory: ${dbPath}`);
  fs.mkdirSync(dbPath, { recursive: true });
}

// Create specific database subdirectories
const userDbDir = path.join(dbPath, 'users');
const gameDbDir = path.join(dbPath, 'games');

if (!fs.existsSync(userDbDir)) {
  console.log(`Creating users database directory: ${userDbDir}`);
  fs.mkdirSync(userDbDir, { recursive: true });
}

if (!fs.existsSync(gameDbDir)) {
  console.log(`Creating games database directory: ${gameDbDir}`);
  fs.mkdirSync(gameDbDir, { recursive: true });
}

// Create the files directory if it doesn't exist
if (!fs.existsSync(filesPath)) {
  console.log(`Creating files directory: ${filesPath}`);
  fs.mkdirSync(filesPath, { recursive: true });
}

// Create subdirectories for different file types
const imageDir = path.join(filesPath, 'images');
const audioDir = path.join(filesPath, 'audio');
const otherDir = path.join(filesPath, 'other');

if (!fs.existsSync(imageDir)) fs.mkdirSync(imageDir, { recursive: true });
if (!fs.existsSync(audioDir)) fs.mkdirSync(audioDir, { recursive: true });
if (!fs.existsSync(otherDir)) fs.mkdirSync(otherDir, { recursive: true });

const config = {
  port: process.env.PORT || 10000,
  jwtSecret: process.env.JWT_SECRET || 'development-jwt-secret',
  dataPath: dataPath,
  dbPath: dbPath,
  filesPath: filesPath,
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  logLevel: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  isProduction: process.env.NODE_ENV === 'production'
};

console.log(`Using data path: ${config.dataPath}`);
console.log(`Using database path: ${config.dbPath}`);
console.log(`Using files path: ${config.filesPath}`);

module.exports = config;
