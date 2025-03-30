const path = require('path');
const fs = require('fs');

// Load environment variables from .env file in development
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Determine the appropriate DB path based on environment
let dbPath;
if (process.env.DB_PATH) {
  // Use the environment variable if provided
  dbPath = process.env.DB_PATH;
} else if (fs.existsSync('/var/data/db')) {
  // Use Render's persistent disk if it exists
  dbPath = '/var/data/db';
} else if (fs.existsSync('/opt/render/project/src/db')) {
  // Use Render's project directory if it exists
  dbPath = '/opt/render/project/src/db';
} else {
  // Fallback to local development path
  dbPath = path.join(__dirname, '../../db');
}

// Create the DB directory if it doesn't exist
if (!fs.existsSync(dbPath)) {
  console.log(`Creating database directory: ${dbPath}`);
  fs.mkdirSync(dbPath, { recursive: true });
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
