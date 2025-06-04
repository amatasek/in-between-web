const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const PlayerStats = require('../models/PlayerStats');

// GET /me - Get lifetime stats for the authenticated user
router.get('/me', authenticateToken, async (req, res) => {
  console.log('[STATS] /me endpoint called with userId:', req.userId);
  try {
    const gameHistoryService = req.services.gameHistory;
    
    if (!gameHistoryService) {
      return res.status(500).json({ error: 'Game history service not available' });
    }
    
    // Since we already have userId from authenticateToken middleware, let's get the username
    const databaseService = req.services.database;
    const user = await databaseService.getUserById(req.userId);
    
    if (!user) {
      console.log('[STATS] User not found in database:', req.userId);
      return res.status(404).json({ message: 'User not found' });
    }
    
    const username = user.username;
    console.log('[STATS] Fetching lifetime stats for user:', username);
    
    // Load all historical games for this user with a large page size
    const result = await gameHistoryService.getPagedHistoricalGames({
      limit: 100000, // Very large limit to get all games
      skip: 0,
      playerName: username, // The service expects 'playerName', not 'username'
      includeGameData: true
    });
    
    // Log basic stats information
    console.log(`[STATS] Processing ${result.games.length} games for user ${username}`);
    
    // Create a new PlayerStats instance with all games and the username
    // This will process all games and create an immutable stats object
    const playerStats = new PlayerStats(result.games, username);
    
    // Return the stats object and the formatted stats array for the UI
    return res.json({
      ...playerStats,
      stats: playerStats.getStats() // Include the formatted stats array
    });
  } catch (error) {
    console.error('[STATS] Error getting user stats:', error);
    res.status(500).json({ message: 'Failed to get user stats' });
  }
});

module.exports = router;
