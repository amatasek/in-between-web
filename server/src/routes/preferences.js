const express = require('express');
const router = express.Router();

// We'll use the services injected by the middleware via req.services

// Middleware to verify JWT token
const authenticateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    // Get the auth service from the injected services
    const authService = req.services.auth;
    const decoded = authService.verifyToken(token);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Get all user preferences
router.get('/', authenticateToken, async (req, res) => {
  try {
    const databaseService = req.services.database;
    const preferences = await databaseService.getPreferences(req.userId);
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
    
    const databaseService = req.services.database;
    const result = await databaseService.updatePreference(req.userId, key, value);
    
    res.json(result.preferences);
  } catch (error) {
    console.error('[Preferences] Error updating preference:', error);
    res.status(500).json({ message: 'Failed to update preference' });
  }
});

module.exports = router;
