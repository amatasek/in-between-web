const BaseService = require('./BaseService');
const ProductOffering = require('../models/ProductOffering');
const Purchase = require('../models/Purchase');

class PurchaseService extends BaseService {
  constructor() {
    super();
    this.productOfferings = [];
    this.initializeDefaultOfferings();
  }
  
  /**
   * Initialize default product offerings
   */
  initializeDefaultOfferings() {
    this.productOfferings = [
      new ProductOffering({
        id: 'coin_pack_small',
        name: '1,000 Coins',
        description: 'Small coin pack to get you back in the game',
        offeringType: 'coin',
        coinAmount: 1000,
        priceUSD: 20,
        imageUrl: '/assets/images/products/coin_pack_small.png',
        displayOrder: 1
      }),
      new ProductOffering({
        id: 'coin_pack_medium',
        name: '5,000 Coins',
        description: 'Medium coin pack - best value for regular players',
        offeringType: 'coin',
        coinAmount: 5000,
        priceUSD: 95,
        imageUrl: '/assets/images/products/coin_pack_medium.png',
        displayOrder: 2
      }),
      new ProductOffering({
        id: 'coin_pack_large',
        name: '10,000 Coins',
        description: 'Large coin pack for serious players',
        offeringType: 'coin',
        coinAmount: 10000,
        priceUSD: 185,
        imageUrl: '/assets/images/products/coin_pack_large.png',
        displayOrder: 3
      })
    ];
  }
  
  /**
   * Get product offerings by type
   * @param {string} offeringType - Type of offering (e.g., 'coin')
   * @returns {Array} Array of product offerings
   */
  getOfferingsByType(offeringType) {
    return this.productOfferings
      .filter(offering => offering.offeringType === offeringType && offering.enabled)
      .sort((a, b) => a.displayOrder - b.displayOrder);
  }
  
  /**
   * Get a specific product offering by ID
   * @param {string} productId - ID of the product
   * @returns {ProductOffering|null} The product offering or null if not found
   */
  getOfferingById(productId) {
    return this.productOfferings.find(offering => offering.id === productId) || null;
  }
  
  /**
   * Process a purchase
   * @param {string} userId - ID of the user making the purchase
   * @param {string} productId - ID of the product being purchased
   * @returns {Object} Purchase result
   */
  async processPurchase(userId, productId) {
    const databaseService = this.getService('database');
    
    // Get the product offering
    const offering = this.getOfferingById(productId);
    if (!offering) {
      throw new Error('Product not found');
    }
    
    if (!offering.enabled) {
      throw new Error('Product not available for purchase');
    }
    
    // Get the user
    const user = await databaseService.getUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    
    // Process the purchase based on offering type
    let purchaseResult;
    switch (offering.offeringType) {
      case 'coin':
        purchaseResult = await this.processCoinPurchase(user, offering);
        break;
      default:
        throw new Error(`Unsupported offering type: ${offering.offeringType}`);
    }
    
    return purchaseResult;
  }
  
  /**
   * Process a coin purchase
   * @param {Object} user - User making the purchase
   * @param {ProductOffering} offering - Product offering
   * @returns {Object} Purchase result
   */
  async processCoinPurchase(user, offering) {
    const databaseService = this.getService('database');
    
    // Calculate new balance
    const newBalance = (user.balance || 0) + offering.coinAmount;
    
    // Generate unique purchase ID
    const purchaseId = `${Date.now()}_${user._id}`;
    const purchasedAt = new Date().toISOString();
    
    try {
      // Update user balance first
      await databaseService.updateUser(user._id, { balance: newBalance });
      
      // Create a purchase record for the database
      const purchase = new Purchase({
        id: purchaseId,
        userId: user._id,
        username: user.username,
        productId: offering.id,
        productName: offering.name,
        offeringType: offering.offeringType,
        coinAmount: offering.coinAmount,
        priceUSD: offering.priceUSD,
        status: 'completed',
        purchasedAt: purchasedAt,
        metadata: {
          userBalanceBefore: user.balance || 0,
          userBalanceAfter: newBalance
        }
      });
      
      // Save the purchase record to the database
      await databaseService.createPurchase(purchase.toJSON());
      
      console.log('[PURCHASE] Coin purchase completed and saved:', {
        purchaseId,
        userId: user._id,
        productId: offering.id,
        coinsAdded: offering.coinAmount,
        newBalance
      });
      
      return {
        success: true,
        purchaseId: `purchase_${purchaseId}`,
        coinsAdded: offering.coinAmount,
        newBalance: newBalance,
        product: offering.toJSON(),
        purchasedAt: purchasedAt
      };
    } catch (error) {
      console.error('[PURCHASE] Error processing coin purchase:', error);
      
      // If we updated the balance but failed to save the purchase record,
      // we should try to revert the balance change
      try {
        await databaseService.updateUser(user._id, { balance: user.balance });
        console.log('[PURCHASE] Reverted user balance after purchase failure');
      } catch (revertError) {
        console.error('[PURCHASE] Failed to revert user balance:', revertError);
      }
      
      throw new Error('Purchase processing failed');
    }
  }
  
}

module.exports = new PurchaseService();