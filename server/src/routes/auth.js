const express = require('express');
const router = express.Router();

// Handle OPTIONS requests for CORS preflight
router.options('*', (req, res) => {
  console.log('[AUTH] Handling OPTIONS preflight request');
  // Set CORS headers
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(200);
});

// Middleware to verify JWT token
const authenticateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    const authService = req.services.auth;
    const decoded = authService.verifyToken(token);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

router.post('/register', async (req, res) => {
  console.log('[AUTH] Registration request headers:', req.headers);
  console.log('[AUTH] Registration request body:', req.body);
  
  try {
    const { username, password } = req.body;
    const authService = req.services.auth;
    
    if (!username || !password) {
      console.error('[AUTH] Missing credentials:', { username: !!username, password: !!password });
      return res.status(400).json({ message: 'Username and password are required' });
    }

    console.log('[AUTH] Attempting registration for:', username);
    const result = await authService.register(username, password);
    console.log('[AUTH] Registration successful:', { username, userId: result.user.id });
    res.json(result);
  } catch (error) {
    console.error('[AUTH] Registration error:', { message: error.message, stack: error.stack });
    res.status(400).json({ message: error.message || 'Registration failed' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const authService = req.services.auth;
    const result = await authService.login(username, password);
    
    console.log('[AUTH] Login successful:', { 
      username: result.user.username,
      userId: result.user.id
    });
    
    res.json(result);
  } catch (error) {
    console.error('[AUTH] Login error:', error);
    res.status(401).json({ message: error.message });
  }
});

router.get('/me', authenticateToken, async (req, res) => {
  console.log('[AUTH] /me endpoint called with userId:', req.userId);
  try {
    const databaseService = req.services.database;
    console.log('[AUTH] Fetching user data from database');
    const [user, preferences] = await Promise.all([
      databaseService.getUserById(req.userId),
      databaseService.getPreferences(req.userId)
    ]);
    
    if (!user) {
      console.log('[AUTH] User not found in database:', req.userId);
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Resolve selectedTitle ID to actual title string
    const achievementService = require('../services/AchievementService');
    const achievement = achievementService.getAchievement(preferences?.selectedTitle);
    
    console.log('[AUTH] User data found, returning response');
    res.json({
      user: {
        id: user._id,
        username: user.username,
        balance: user.balance || 0,
        profileImg: preferences?.profileImg || null,
        selectedTitle: achievement?.title || null
      }
    });
  } catch (error) {
    console.error('[AUTH] Error getting user data:', error);
    res.status(500).json({ message: 'Failed to get user data' });
  }
});

module.exports = router;
