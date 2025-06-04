/**
 * Transaction model - Represents a single game transaction in the ledger
 * All game transactions are stored in a flat array format
 */
class Transaction {
  /**
   * Create a new Transaction
   * @param {Object} data Transaction data
   * @param {string} data.playerId ID of the player involved
   * @param {string} data.playerName Name of the player involved
   * @param {number} data.amount Amount of the transaction (positive for win, negative for loss)
   * @param {string} data.reason Full reason/description of transaction
   * @param {number} data.round Game round when transaction occurred
   * @param {number} [data.potAmount] Current pot amount at the time of transaction (for identifying POT bets and penalty multipliers)
   */
  constructor(data) {
    // Required fields
    this.playerId = data.playerId;
    this.playerName = data.playerName;
    this.amount = data.amount;
    this.reason = data.reason || 'Transaction';
    this.round = data.round || 1;
    this.potAmount = data.potAmount || 0;
    
    // Generate clean transaction type from reason
    this.transactionType = this.generateTransactionType(this.reason);
    
    // Use provided timestamp or create new one
    this.timestamp = data.timestamp || new Date().toISOString();
    
    // Format display fields (for consistency with CSV export)
    this.player = this.playerName;
    
    // Make the object immutable
    Object.freeze(this);
  }
  
  /**
   * Generate a clean transaction type from a reason string
   * @param {string} reason The reason string
   * @returns {string} Clean transaction type
   */
  generateTransactionType(reason) {
    if (!reason) return 'Transaction';
    
    // Extract the action part from the reason (e.g., "Ante in round 1" -> "Ante")
    const reasonParts = reason.split(' ');
    let transactionType = reasonParts[0]; // Take the first word as the type
    
    // Special case for "Won bet" which is two words
    if (reasonParts[0] === 'Won') {
      transactionType = 'Win';
    }
    // Special case for penalty reasons
    else if (reason.includes('penalty')) {
      transactionType = 'Penalty';
    }
    
    return transactionType;
  }
  
  /**
   * Create a plain object representation of the transaction
   * Useful when storing in database or sending over API
   * @returns {Object} Plain object representation
   */
  toJSON() {
    return {
      playerId: this.playerId,
      playerName: this.playerName,
      player: this.playerName,
      amount: this.amount,
      reason: this.reason,
      transactionType: this.transactionType,
      round: this.round,
      potAmount: this.potAmount,
      timestamp: this.timestamp
    };
  }
}

module.exports = Transaction;
