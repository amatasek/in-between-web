const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const PlayerStats = require('../models/PlayerStats');
const achievementRegistry = require('../achievements/AchievementRegistry');

router.get('/stats', authenticateToken, async (req, res) => {
  try {
    const gameHistoryService = req.services.gameHistory;
    const databaseService = req.services.database;
    
    if (!gameHistoryService) {
      return res.status(500).json({ error: 'Game history service not available' });
    }
    
    const user = await databaseService.getUserById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const result = await gameHistoryService.getPagedHistoricalGames({
      limit: 100000,
      skip: 0,
      playerName: user.username,
      includeGameData: true
    });
    
    const playerStats = new PlayerStats(result.games, user.username);
    
    return res.json({
      ...playerStats,
      stats: playerStats.getStats()
    });
  } catch (error) {
    console.error('[ME] Error getting user stats:', error);
    res.status(500).json({ message: 'Failed to get user stats' });
  }
});

/**
 * GET /me/titles
 * Get user's unlocked titles
 */
router.get('/titles', authenticateToken, async (req, res) => {
  try {
    const userId = req.userId;
    const achievementService = req.services.achievement;
    
    if (!achievementService) {
      return res.status(500).json({ error: 'Achievement service not available' });
    }
    
    const userAchievements = await achievementService.getUserAchievements(userId);
    
    const unlockedTitles = userAchievements.map(ua => {
      const achievement = achievementRegistry.get(ua.achievementId);
      return achievement ? {
        id: achievement.id,
        title: achievement.title,
        description: achievement.description,
        unlockedAt: ua.unlockedAt
      } : null;
    }).filter(Boolean);

    res.json(unlockedTitles);
  } catch (error) {
    console.error('Error fetching user titles:', error);
    res.status(500).json({ error: 'Failed to fetch titles' });
  }
});

module.exports = router;