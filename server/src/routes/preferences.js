const express = require('express');
const router = express.Router();
const db = require('../services/db/DatabaseService');
const { verifyToken } = require('../services/AuthService');

// Middleware to verify JWT token
const authenticateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    const decoded = verifyToken(token);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Get all user preferences
router.get('/', authenticateToken, async (req, res) => {
  try {
    const preferences = await db.getPreferences(req.userId);
    res.json(preferences);
  } catch (error) {
    console.error('[Preferences] Error getting preferences:', error);
    res.status(500).json({ message: 'Failed to get preferences' });
  }
});

// Update a specific preference
router.post('/:key', authenticateToken, async (req, res) => {
  try {
    const { key } = req.params;
    const { value } = req.body;
    
    if (value === undefined) {
      return res.status(400).json({ message: 'Value is required' });
    }
    
    const result = await db.updatePreference(req.userId, key, value);
    
    res.json(result.preferences);
  } catch (error) {
    console.error('[Preferences] Error updating preference:', error);
    res.status(500).json({ message: 'Failed to update preference' });
  }
});

module.exports = router;
