const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');

// Handle OPTIONS requests for CORS preflight
router.options('*', (req, res) => {
  console.log('[PURCHASES] Handling OPTIONS preflight request');
  // Set CORS headers
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(200);
});

// GET /purchases/offerings - Get product offerings by type
router.get('/offerings', authenticateToken, async (req, res) => {
  try {
    const { offeringType } = req.query;
    const purchaseService = req.services.purchase;
    
    if (!purchaseService) {
      return res.status(500).json({ error: 'Purchase service not available' });
    }
    
    let offerings;
    if (offeringType) {
      offerings = purchaseService.getOfferingsByType(offeringType);
    } else {
      // If no type specified, return empty array or require offeringType parameter
      return res.status(400).json({ error: 'offeringType parameter is required' });
    }
    
    console.log(`[PURCHASES] Returning ${offerings.length} offerings for type: ${offeringType || 'all'}`);
    return res.json({ offerings });
  } catch (error) {
    console.error('[PURCHASES] Error fetching offerings:', error);
    return res.status(500).json({ error: 'Failed to fetch product offerings' });
  }
});

// POST /purchases/process - Process a purchase
router.post('/process', authenticateToken, async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.userId;
    
    if (!productId) {
      return res.status(400).json({ error: 'Product ID is required' });
    }
    
    const purchaseService = req.services.purchase;
    if (!purchaseService) {
      return res.status(500).json({ error: 'Purchase service not available' });
    }
    
    console.log(`[PURCHASES] Processing purchase for user ${userId}, product ${productId}`);
    
    const result = await purchaseService.processPurchase(userId, productId);
    
    console.log(`[PURCHASES] Purchase completed successfully:`, {
      userId,
      productId,
      coinsAdded: result.coinsAdded,
      newBalance: result.newBalance
    });
    
    return res.json(result);
  } catch (error) {
    console.error('[PURCHASES] Error processing purchase:', error);
    
    // Return appropriate error responses
    if (error.message === 'Product not found') {
      return res.status(404).json({ error: error.message });
    } else if (error.message === 'Product not available for purchase') {
      return res.status(400).json({ error: error.message });
    } else if (error.message === 'User not found') {
      return res.status(404).json({ error: error.message });
    } else {
      return res.status(500).json({ error: 'Failed to process purchase' });
    }
  }
});

// GET /purchases/history - Get purchase history for the authenticated user
router.get('/history', authenticateToken, async (req, res) => {
  try {
    const userId = req.userId;
    const { limit = 10, skip = 0 } = req.query;
    
    const databaseService = req.services.database;
    if (!databaseService) {
      return res.status(500).json({ error: 'Database service not available' });
    }
    
    console.log(`[PURCHASES] Getting purchase history for user ${userId}`);
    
    const purchases = await databaseService.getPurchasesByUserId(userId, {
      limit: parseInt(limit),
      skip: parseInt(skip)
    });
    
    console.log(`[PURCHASES] Found ${purchases.length} purchases for user ${userId}`);
    
    return res.json({ purchases });
  } catch (error) {
    console.error('[PURCHASES] Error fetching purchase history:', error);
    return res.status(500).json({ error: 'Failed to fetch purchase history' });
  }
});

module.exports = router;