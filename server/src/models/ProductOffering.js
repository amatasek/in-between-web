/**
 * ProductOffering model - Represents a product that can be purchased in the game
 */
class ProductOffering {
  /**
   * Create a new ProductOffering
   * @param {Object} data Product offering data
   * @param {string} data.id Unique identifier for the product
   * @param {string} data.name Display name of the product
   * @param {string} data.description Description of the product
   * @param {string} data.offeringType Type of offering (e.g., 'coin')
   * @param {number} data.coinAmount Amount of coins provided
   * @param {number} data.priceUSD Price in USD (for display purposes)
   * @param {string} [data.imageUrl] URL to marketing image for the product
   * @param {boolean} [data.enabled=true] Whether the product is available for purchase
   * @param {number} [data.displayOrder=0] Order for display in UI
   */
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.offeringType = data.offeringType;
    this.coinAmount = data.coinAmount;
    this.priceUSD = data.priceUSD;
    this.imageUrl = data.imageUrl || null;
    this.enabled = data.enabled !== undefined ? data.enabled : true;
    this.displayOrder = data.displayOrder || 0;
    this.createdAt = data.createdAt || new Date().toISOString();
    
    // Make the object immutable after creation
    Object.freeze(this);
  }
  
  /**
   * Create a plain object representation of the product offering
   * @returns {Object} Plain object representation
   */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      offeringType: this.offeringType,
      coinAmount: this.coinAmount,
      priceUSD: this.priceUSD,
      imageUrl: this.imageUrl,
      enabled: this.enabled,
      displayOrder: this.displayOrder,
      createdAt: this.createdAt
    };
  }
}

module.exports = ProductOffering;