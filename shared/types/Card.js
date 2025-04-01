/**
 * @typedef {'hearts' | 'diamonds' | 'clubs' | 'spades'} Suit
 */

/**
 * @typedef {'2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A'} CardValue
 */

/**
 * @typedef {Object} Card
 * @property {Suit} suit - The card's suit
 * @property {CardValue} value - The card's face value
 * @property {number} numericalValue - The numerical value for comparison (2-14)
 * @property {boolean} [revealed] - Whether the card is revealed (for the middle card)
 * @property {boolean} [isAceLow=false] - Whether an Ace card should be treated as low (value 1) instead of high (value 14)
 */

module.exports = {};
