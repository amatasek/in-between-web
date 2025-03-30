const express = require('express');
const router = express.Router();
const authService = require('../services/AuthService');

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await authService.register(username, password);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await authService.login(username, password);
    res.json(result);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

module.exports = router;
