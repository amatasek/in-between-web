/**
 * PreferencesSchema.js
 * Defines the structure and default values for user preferences
 */

/**
 * Default preferences for new users
 * This serves as both documentation and initialization for user preferences
 */
const DEFAULT_PREFERENCES = {
  // Game play preferences
  autoAnte: false,     // Automatically ante up when a new round begins
  muted: false,        // Mute all game sound effects
  
  // Customization preferences
  profileImg: null,    // User's profile image URL
  selectedTitle: null, // User's selected achievement title
  
  // Special effects preferences (coming soon)
  twoSecondPotGif: null,  // GIF to play when slamming the POT button
  twoSecondPotMp3: null   // Sound to play when slamming the POT button
};

/**
 * Validates and ensures all required preferences exist
 * @param {Object} preferences - User preferences object
 * @returns {Object} Complete preferences object with any missing values set to defaults
 */
const ensureCompletePreferences = (preferences = {}) => {
  // Start with defaults
  const completePreferences = { ...DEFAULT_PREFERENCES };
  
  // Override with any existing user preferences
  if (preferences && typeof preferences === 'object') {
    Object.keys(preferences).forEach(key => {
      completePreferences[key] = preferences[key];
    });
  }
  
  return completePreferences;
};

/**
 * Get a list of all valid preference keys
 * @returns {Array<string>} Array of valid preference keys
 */
const getValidPreferenceKeys = () => {
  return Object.keys(DEFAULT_PREFERENCES);
};

/**
 * Checks if a preference key is valid
 * @param {string} key - The preference key to check
 * @returns {boolean} True if the key is valid, false otherwise
 */
const isValidPreferenceKey = (key) => {
  return getValidPreferenceKeys().includes(key);
};

module.exports = {
  DEFAULT_PREFERENCES,
  ensureCompletePreferences,
  getValidPreferenceKeys,
  isValidPreferenceKey
};
