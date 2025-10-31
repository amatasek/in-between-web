/**
 * Store Service for handling coin purchases and product offerings
 * Manages API calls for purchasing game currency and retrieving available products
 */
class StoreService {
  constructor() {
    // Get API URL from environment or use localhost as fallback
    this.API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
    this.baseURL = `${this.API_URL}/purchases`;
  }

  /**
   * Get the authorization header for API requests
   * @param {string} token - Auth token to use
   * @returns {Object} Headers object with authorization
   */
  getAuthHeaders(token) {
    return {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    };
  }

  /**
   * Get product offerings by type
   * @param {string} offeringType - Type of offering (e.g., 'coin')
   * @param {string} token - Auth token
   * @returns {Promise<Array>} Array of product offerings
   */
  async getOfferingsByType(offeringType, token) {
    try {
      const url = `${this.baseURL}/offerings?offeringType=${encodeURIComponent(offeringType)}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: this.getAuthHeaders(token),
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}: Failed to fetch offerings`);
      }

      const data = await response.json();
      return data.offerings || [];
    } catch (error) {
      console.error('[PURCHASE_SERVICE] Error fetching offerings:', error);
      throw new Error(`Failed to fetch product offerings: ${error.message}`);
    }
  }

  /**
   * Get all available product offerings
   * @param {string} token - Auth token
   * @returns {Promise<Array>} Array of all product offerings
   */
  async getAllOfferings(token) {
    try {
      const response = await fetch(`${this.baseURL}/offerings`, {
        method: 'GET',
        headers: this.getAuthHeaders(token),
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}: Failed to fetch offerings`);
      }

      const data = await response.json();
      return data.offerings || [];
    } catch (error) {
      console.error('[PURCHASE_SERVICE] Error fetching all offerings:', error);
      throw new Error(`Failed to fetch product offerings: ${error.message}`);
    }
  }

  /**
   * Process a purchase
   * @param {string} productId - ID of the product to purchase
   * @param {string} token - Auth token
   * @returns {Promise<Object>} Purchase result
   */
  async processPurchase(productId, token) {
    try {
      if (!productId) {
        throw new Error('Product ID is required');
      }

      const response = await fetch(`${this.baseURL}/process`, {
        method: 'POST',
        headers: this.getAuthHeaders(token),
        credentials: 'include',
        body: JSON.stringify({ productId })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}: Purchase failed`);
      }

      const result = await response.json();
      
      // Log successful purchase for debugging
      console.log('[PURCHASE_SERVICE] Purchase completed:', {
        productId,
        coinsAdded: result.coinsAdded,
        newBalance: result.newBalance
      });

      return result;
    } catch (error) {
      console.error('[PURCHASE_SERVICE] Error processing purchase:', error);
      throw new Error(`Purchase failed: ${error.message}`);
    }
  }

}

// Create a singleton instance
const storeService = new StoreService();

export default storeService;