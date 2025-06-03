const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');

// GET /games - Get list of available games
router.get('/', authenticateToken, async (req, res) => {
  try {
    const gameService = req.services.game;
    
    if (!gameService) {
      return res.status(500).json({ error: 'Game service not available' });
    }
    
    const games = gameService.getGameList();
    console.log(`[GAMES_ROUTE] Returning ${games.length} games via HTTP`);
    return res.json(games);
  } catch (error) {
    console.error('[GAMES_ROUTE] Error fetching games:', error);
    return res.status(500).json({ error: 'Failed to fetch games' });
  }
});

// GET /games/history - Get paginated game history for the authenticated user
router.get('/history', authenticateToken, async (req, res) => {
  try {
    // Extract user info from auth token
    const { username } = req.user;
    
    if (!username) {
      return res.status(401).json({ error: 'User not properly authenticated' });
    }
    
    // Get the gameHistory service
    const gameHistoryService = req.services.gameHistory;
    
    if (!gameHistoryService) {
      return res.status(500).json({ error: 'Game history service not available' });
    }
    
    // Extract pagination parameters from query string with defaults
    const pageSize = parseInt(req.query.pageSize) || 10;
    const pageNumber = parseInt(req.query.pageNumber) || 0;
    
    // Calculate skip value from page number (0-indexed)
    const skip = pageNumber * pageSize;
    
    // Get game history using authenticated user's name as the filter
    const result = await gameHistoryService.getPagedHistoricalGames({
      limit: pageSize,
      skip: skip,
      playerName: username
    });
    
    console.log(`[GAMES_ROUTE] Returning ${result.games.length} historical games for user ${username}`);
    return res.json(result);
  } catch (error) {
    console.error('[GAMES_ROUTE] Error fetching game history:', error);
    return res.status(500).json({ error: 'Failed to fetch game history' });
  }
});

module.exports = router;
