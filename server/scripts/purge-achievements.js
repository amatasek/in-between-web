#!/usr/bin/env node

/**
 * Script to purge all user achievement documents from the database
 * Run with: node scripts/purge-achievements.js
 */

const PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));
const path = require('path');
const config = require('../src/config');

const userDbPath = path.resolve(config.dbPath, 'users');
const userDb = new PouchDB(userDbPath);

async function purgeAchievements() {
  try {
    console.log('[PURGE] Finding all user achievement documents...');
    
    // Find all achievement documents
    const result = await userDb.find({
      selector: {
        type: 'user_achievement'
      },
      limit: 100000
    });
    
    console.log(`[PURGE] Found ${result.docs.length} achievement documents to delete`);
    
    if (result.docs.length === 0) {
      console.log('[PURGE] No achievements to purge');
      return;
    }
    
    // Mark them all for deletion
    const toDelete = result.docs.map(doc => ({
      _id: doc._id,
      _rev: doc._rev,
      _deleted: true
    }));
    
    // Bulk delete
    const deleteResult = await userDb.bulkDocs(toDelete);
    
    const successful = deleteResult.filter(r => r.ok).length;
    const failed = deleteResult.filter(r => !r.ok).length;
    
    console.log(`[PURGE] Successfully deleted ${successful} achievement documents`);
    if (failed > 0) {
      console.log(`[PURGE] Failed to delete ${failed} documents`);
    }
    
  } catch (error) {
    console.error('[PURGE] Error purging achievements:', error);
  } finally {
    await userDb.close();
  }
}

// Run the purge
purgeAchievements();