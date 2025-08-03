const express = require('express');
const router = express.Router();
const PlayerStats = require('../models/PlayerStats');

/**
 * GET /leaderboard
 * Returns top 25 players sorted by total profit
 * Query params:
 *   - duration: 'all' or '30days' (default: 'all')
 */
router.get('/', async (req, res) => {
  try {
    const { duration = 'all' } = req.query;
    const gameHistoryService = req.services.gameHistory;
    const databaseService = req.services.database;
    const achievementService = req.services.achievement;
    
    // Calculate date cutoff for 30 days
    const cutoffDate = duration === '30days' 
      ? new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
      : null;

    // Get all users and dedupe early
    const usersResult = await databaseService.userDb.allDocs({ include_docs: true });
    const seenUserIds = new Set();
    const users = usersResult.rows
      .filter(row => row.doc && row.doc.type === 'user')
      .map(row => row.doc)
      .filter(user => {
        if (seenUserIds.has(user._id)) {
          return false;
        }
        seenUserIds.add(user._id);
        return true;
      });

    // Batch get all user preferences first
    const preferencesPromises = users.map(user => 
      databaseService.getPreferences(user._id).catch(() => null)
    );
    const allPreferences = await Promise.all(preferencesPromises);
    
    // Create a map for quick lookup
    const preferencesMap = new Map();
    users.forEach((user, index) => {
      preferencesMap.set(user._id, allPreferences[index]);
    });

    // Calculate stats for each user with limited concurrency
    const batchSize = 5; // Process 5 users at a time
    const leaderboardData = [];
    
    for (let i = 0; i < users.length; i += batchSize) {
      const batch = users.slice(i, i + batchSize);
      
      const batchResults = await Promise.all(
        batch.map(async (user) => {
          try {
            // Get user's games with a smaller limit
            const gameHistory = await gameHistoryService.getPagedHistoricalGames({
              playerName: user.username,
              limit: 10000 // Reduced from 100000
            });

            // Filter games by date if needed
            let games = gameHistory.games || [];
            if (cutoffDate) {
              games = games.filter(game => {
                const gameData = game.gameData || game;
                const gameDate = gameData.dateCreated || gameData.archivedDate;
                return gameDate && gameDate >= cutoffDate;
              });
            }

            // Calculate only total profit (simplified PlayerStats usage)
            let totalProfit = 0;
            games.forEach(game => {
              const gameData = game.gameData || game;
              const allTransactions = gameData.gameTransactions || [];
              
              // Filter to only this player's transactions and sum amounts
              allTransactions.forEach(tx => {
                const playerName = tx.player || tx.playerName;
                if (playerName && playerName.toLowerCase() === user.username.toLowerCase()) {
                  totalProfit += tx.amount || 0;
                }
              });
            });
            
            // Get cached preferences
            const preferences = preferencesMap.get(user._id);
            
            // Resolve title from achievement ID
            let resolvedTitle = null;
            if (preferences?.selectedTitle) {
              const achievement = achievementService.getAchievement(preferences.selectedTitle);
              resolvedTitle = achievement?.title || null;
            }

            return {
              userId: user._id,
              username: user.username,
              totalProfit,
              profileImg: preferences?.profileImg || null,
              selectedTitle: resolvedTitle
            };
          } catch (error) {
            console.error(`[LEADERBOARD] Error processing user ${user.username}:`, error);
            return null;
          }
        })
      );
      
      leaderboardData.push(...batchResults);
    }

    // Filter out nulls and sort by totalProfit (no need to dedupe again)
    const sortedLeaderboard = leaderboardData
      .filter(entry => entry !== null)
      .sort((a, b) => b.totalProfit - a.totalProfit)
      .slice(0, 25);

    // Add rank to each entry
    sortedLeaderboard.forEach((entry, index) => {
      entry.rank = index + 1;
    });

    res.json({
      duration,
      leaderboard: sortedLeaderboard
    });
  } catch (error) {
    console.error('[LEADERBOARD] Error generating leaderboard:', error);
    res.status(500).json({ message: 'Failed to generate leaderboard' });
  }
});

module.exports = router;