/**
 * Database Verification Utility
 * 
 * This script verifies database paths and permissions in production
 * It ensures that all required directories exist and are writable
 */
const fs = require('fs');
const path = require('path');
const config = require('../config');

/**
 * Verifies database paths and permissions
 * @returns {Object} Result of verification
 */
function verifyDatabasePaths() {
  const results = {
    dbPath: config.dbPath,
    userDbPath: path.join(config.dbPath, 'users'),
    gameDbPath: path.join(config.dbPath, 'games'),
    issues: []
  };
  
  // Check if main DB path exists and is writable
  try {
    if (!fs.existsSync(results.dbPath)) {
      results.issues.push(`Database path ${results.dbPath} does not exist`);
    } else {
      // Test write access
      const testFile = path.join(results.dbPath, '.test-write-access');
      fs.writeFileSync(testFile, 'test');
      fs.unlinkSync(testFile);
    }
  } catch (error) {
    results.issues.push(`Cannot write to database path ${results.dbPath}: ${error.message}`);
  }
  
  // Check if users DB path exists and is writable
  try {
    if (!fs.existsSync(results.userDbPath)) {
      results.issues.push(`Users database path ${results.userDbPath} does not exist`);
    } else {
      // Test write access
      const testFile = path.join(results.userDbPath, '.test-write-access');
      fs.writeFileSync(testFile, 'test');
      fs.unlinkSync(testFile);
    }
  } catch (error) {
    results.issues.push(`Cannot write to users database path ${results.userDbPath}: ${error.message}`);
  }
  
  // Check if games DB path exists and is writable
  try {
    if (!fs.existsSync(results.gameDbPath)) {
      results.issues.push(`Games database path ${results.gameDbPath} does not exist`);
    } else {
      // Test write access
      const testFile = path.join(results.gameDbPath, '.test-write-access');
      fs.writeFileSync(testFile, 'test');
      fs.unlinkSync(testFile);
    }
  } catch (error) {
    results.issues.push(`Cannot write to games database path ${results.gameDbPath}: ${error.message}`);
  }
  
  return results;
}

module.exports = { verifyDatabasePaths };
