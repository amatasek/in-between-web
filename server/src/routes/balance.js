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

// Get user's current balance
router.get('/', authenticateToken, async (req, res) => {
  try {
    const user = await db.getUserById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ balance: user.balance || 0 });
  } catch (error) {
    console.error('[Balance] Error getting balance:', error);
    res.status(500).json({ message: 'Failed to get balance' });
  }
});

// Update user's balance (for game results)
router.post('/update', authenticateToken, async (req, res) => {
  try {
    const { amount, reason } = req.body;
    if (typeof amount !== 'number') {
      return res.status(400).json({ message: 'Amount must be a number' });
    }
    
    await db.updateBalance(req.userId, amount, reason);
    const user = await db.getUserById(req.userId);
    
    res.json({ 
      balance: user.balance,
      transaction: user.transactions[user.transactions.length - 1]
    });
  } catch (error) {
    console.error('[Balance] Error updating balance:', error);
    res.status(400).json({ message: error.message || 'Failed to update balance' });
  }
});

module.exports = router;
