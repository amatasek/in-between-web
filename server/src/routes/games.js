const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');

// GET /games - Get list of available games
router.get('/', authenticateToken, async (req, res) => {
  try {
    const lobbyService = req.services.lobby;
    
    if (!lobbyService) {
      return res.status(500).json({ error: 'Lobby service not available' });
    }
    
    const games = lobbyService.getGameList();
    console.log(`[GAMES_ROUTE] Returning ${games.length} games via HTTP`);
    return res.json(games);
  } catch (error) {
    console.error('[GAMES_ROUTE] Error fetching games:', error);
    return res.status(500).json({ error: 'Failed to fetch games' });
  }
});

module.exports = router;
