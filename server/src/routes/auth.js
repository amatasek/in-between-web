const express = require('express');
const router = express.Router();
const authService = require('../services/AuthService');

router.post('/register', async (req, res) => {
  console.log('[AUTH] Registration request headers:', req.headers);
  console.log('[AUTH] Registration request body:', req.body);
  
  try {
    const { username, password } = req.body;
    
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

module.exports = router;
