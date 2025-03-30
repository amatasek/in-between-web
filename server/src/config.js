const path = require('path');
const fs = require('fs');

// Load environment variables from .env file in development
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Determine the appropriate DB path based on environment variable or default
let dbPath = process.env.DB_PATH || path.join(__dirname, '../../db');
console.log(`Using database path from config: ${dbPath}`);

// Create the DB directory if it doesn't exist
try {
  if (!fs.existsSync(dbPath)) {
    console.log(`Creating database directory: ${dbPath}`);
    fs.mkdirSync(dbPath, { recursive: true });
  }
  
  // Test write access to the directory
  const testFile = path.join(dbPath, '.test-write-access');
  fs.writeFileSync(testFile, 'test');
  fs.unlinkSync(testFile);
  console.log(`Successfully verified write access to: ${dbPath}`);
} catch (error) {
  console.error(`Error with database directory ${dbPath}:`, error.message);
}

const config = {
  port: process.env.PORT || 10000,
  jwtSecret: process.env.JWT_SECRET || 'development-jwt-secret',
  dbPath: dbPath,
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  logLevel: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  isProduction: process.env.NODE_ENV === 'production'
};

console.log(`Using database path: ${config.dbPath}`);

module.exports = config;
