/**
 * Purchase model - Represents a completed purchase transaction
 */
class Purchase {
  /**
   * Create a new Purchase record
   * @param {Object} data Purchase data
   * @param {string} data.id Unique purchase ID
   * @param {string} data.userId ID of the user who made the purchase
   * @param {string} data.username Username of the purchaser
   * @param {string} data.productId ID of the product purchased
   * @param {string} data.productName Name of the product purchased
   * @param {string} data.offeringType Type of offering (e.g., 'coin')
   * @param {number} data.coinAmount Amount of coins purchased
   * @param {number} data.priceUSD Price in USD (for record keeping)
   * @param {string} data.status Purchase status ('completed', 'failed', 'pending')
   * @param {string} [data.purchasedAt] ISO timestamp of purchase
   * @param {Object} [data.metadata] Additional metadata about the purchase
   */
  constructor(data) {
    this.id = data.id;
    this.userId = data.userId;
    this.username = data.username;
    this.productId = data.productId;
    this.productName = data.productName;
    this.offeringType = data.offeringType;
    this.coinAmount = data.coinAmount;
    this.priceUSD = data.priceUSD;
    this.status = data.status || 'completed';
    this.purchasedAt = data.purchasedAt || new Date().toISOString();
    this.metadata = data.metadata || {};
    
    // CouchDB document fields
    this._id = data._id || `purchase_${this.id}`;
    this._rev = data._rev;
    
    // Make the object immutable after creation
    Object.freeze(this);
  }
  
  /**
   * Create a plain object representation suitable for database storage
   * @returns {Object} Plain object representation
   */
  toJSON() {
    return {
      _id: this._id,
      _rev: this._rev,
      id: this.id,
      userId: this.userId,
      username: this.username,
      productId: this.productId,
      productName: this.productName,
      offeringType: this.offeringType,
      coinAmount: this.coinAmount,
      priceUSD: this.priceUSD,
      status: this.status,
      purchasedAt: this.purchasedAt,
      metadata: this.metadata,
      type: 'purchase' // Document type for CouchDB queries
    };
  }
  
  /**
   * Create a Purchase instance from a database document
   * @param {Object} doc Database document
   * @returns {Purchase} Purchase instance
   */
  static fromDocument(doc) {
    return new Purchase({
      _id: doc._id,
      _rev: doc._rev,
      id: doc.id,
      userId: doc.userId,
      username: doc.username,
      productId: doc.productId,
      productName: doc.productName,
      offeringType: doc.offeringType,
      coinAmount: doc.coinAmount,
      priceUSD: doc.priceUSD,
      status: doc.status,
      purchasedAt: doc.purchasedAt,
      metadata: doc.metadata
    });
  }
}

module.exports = Purchase;