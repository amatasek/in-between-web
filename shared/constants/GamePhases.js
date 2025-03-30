/**
 * Game phase constants for consistent phase management across the application
 */
const GamePhases = {
  // Initial phase when waiting for players and anteeing up
  WAITING: 'waiting',
  
  // Phase when cards are being dealt
  DEALING: 'dealing',
  
  // Phase when players are betting
  BETTING: 'betting',
  
  // Phase when middle card is being revealed
  REVEALING: 'revealing',
  
  // Phase when round results are shown
  RESULTS: 'results'
};

module.exports = {
  GamePhases
};
