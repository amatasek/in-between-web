const path = require('path');
const fs = require('fs');

// Load environment variables from .env file in development
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Determine if we're running on Render.com
const isRender = process.env.RENDER === 'true' || process.env.RENDER_SERVICE_ID;

// Determine the appropriate DB path based on environment
let dbPath;

// First priority: Use environment variable if provided
if (process.env.DB_PATH) {
  dbPath = process.env.DB_PATH;
  console.log(`Using DB_PATH from environment: ${dbPath}`);
} 
// Second priority: Use Render's persistent disk mount point
else if (isRender && fs.existsSync('/var/data/db')) {
  dbPath = '/var/data/db';
  console.log(`Using Render persistent disk: ${dbPath}`);
} 
// Third priority: Create a db directory in the Render project root
else if (isRender) {
  // On Render, create a db directory at the project root
  dbPath = '/opt/render/project/src/server/db';
  console.log(`Using Render project directory: ${dbPath}`);
} 
// Last priority: Fallback to local development path
else {
  dbPath = path.join(__dirname, '../../db');
  console.log(`Using local development path: ${dbPath}`);
}

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
  
  // If we're on Render and can't write to the preferred location, try an alternative
  if (isRender && dbPath !== '/tmp/db') {
    console.log('Falling back to /tmp/db directory on Render');
    dbPath = '/tmp/db';
    if (!fs.existsSync(dbPath)) {
      fs.mkdirSync(dbPath, { recursive: true });
    }
  }
}

const config = {
  port: process.env.PORT || 10000,
  jwtSecret: process.env.JWT_SECRET || 'development-jwt-secret',
  dbPath: dbPath,
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  logLevel: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  isProduction: process.env.NODE_ENV === 'production',
  isRender: isRender
};

console.log(`Using database path: ${config.dbPath}`);

module.exports = config;
