import { Howl } from 'howler';

/**
 * Sound Service for managing game audio
 * Uses Howler.js for cross-browser audio playback
 */
class SoundService {
  constructor() {
    this.sounds = {};
    this.muted = false; // Default state, will be updated from preferences
    this.initialized = false;
    this.categories = ['ui']; // Only load UI sounds for now
    
    // Get API URL from environment or use localhost as fallback
    this.API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  }

  /**
   * Initialize the sound service and load all sound categories
   */
  initialize() {
    if (this.initialized) return;
    
    console.log('[SoundService] Initializing sound service...');
    
    // Load only the UI category for now
    this.loadCategory('ui');
    
    // Mark as initialized since we're loading asynchronously
    this.initialized = true;
  }
  
  /**
   * Load sounds for a specific category
   * @param {string} category - Sound category to load
   */
  loadCategory(category) {
    console.log(`[SoundService] Loading category: ${category}`);
    
    // Skip if already loaded
    if (this.sounds[category]) {
      console.log(`[SoundService] Category ${category} already loaded`);
      return;
    }
    
    // Define sprites for each category
    const sprites = {};
    
    // UI category sprites
    if (category === 'ui') {
      // Match the exact timing from ui-sounds.json
      sprites.join = [0, 1000];     // 0 to 1.0 seconds
      sprites.leave = [1500, 1000]; // 1.5 to 2.5 seconds
    }
    
    console.log(`[SoundService] Defined sprites for ${category}:`, sprites);
    
    // Create the Howl instance with the sprites
    this.sounds[category] = new Howl({
      src: [
        `${this.API_URL}/assets/audio/${category}-sounds.mp3`,
        `${this.API_URL}/assets/audio/${category}-sounds.webm`
      ],
      sprite: sprites,
      preload: true,
      onload: () => {
        console.log(`[SoundService] ${category} sounds loaded successfully`);
        console.log(`[SoundService] Available sprites:`, this.sounds[category]._sprite);
        
        // Test the sound immediately after loading
        if (category === 'ui') {
          setTimeout(() => {
            console.log(`[SoundService] Testing ${category} sounds...`);
            const joinId = this.sounds[category].play('join');
            console.log(`[SoundService] Join sound ID: ${joinId}`);
          }, 1000);
        }
      },
      onloaderror: (id, error) => {
        console.error(`[SoundService] Error loading ${category} sounds:`, error);
      }
    });
  }

  /**
   * Play a sound effect
   * @param {string} sound - Sound name (can include category with dot notation, e.g. 'ui.join')
   * @param {number} [volume=1] - Volume level (0-1)
   * @returns {number|undefined} Sound ID if played, undefined if not
   */
  play(sound, volume = 1) {
    // Skip if muted
    if (this.muted) return;
    
    let category, soundName;
    if (sound.includes('.')) {
      [category, soundName] = sound.split('.');
    } else {
      category = 'ui';
      soundName = sound;
    }
    
    if (!this.sounds[category]) {
      console.warn(`[SoundService] Category ${category} not loaded`);
      return;
    }
    
    console.log(`[SoundService] Playing sound: ${category}.${soundName}`);
    
    // Set volume and play the sound
    this.sounds[category].volume(volume);
    const soundId = this.sounds[category].play(soundName);
    console.log(`[SoundService] Sound ID: ${soundId}`);
    return soundId;
  }

  /**
   * Set muted state
   * @param {boolean} muted - Whether sound should be muted
   */
  setMuted(muted) {
    this.muted = muted;
    console.log(`[SoundService] Sound ${muted ? 'muted' : 'unmuted'}`);
    
    // Update all sound instances
    Object.values(this.sounds).forEach(sound => {
      if (sound && sound.mute) {
        sound.mute(muted);
      }
    });
  }
  
  /**
   * Sync with user preferences
   * @param {Object} preferences - User preferences object
   */
  syncWithPreferences(preferences) {
    if (preferences && typeof preferences.muted !== 'undefined') {
      this.setMuted(preferences.muted);
      console.log(`[SoundService] Synced with preferences, muted: ${preferences.muted}`);
    }
  }
  
  /**
   * Test if sounds are working properly
   */
  testSounds() {
    // Check if UI sounds are loaded
    if (!this.sounds.ui) {
      console.log('[SoundService] UI sounds not loaded yet');
      return;
    }
    
    // Check if sprites are defined
    if (!this.sounds.ui._sprite) {
      console.log('[SoundService] UI sound sprites not defined');
      console.log('[SoundService] Sound object:', this.sounds.ui);
      return;
    }
    
    // Log available sprites
    console.log('[SoundService] Available sprites:', Object.keys(this.sounds.ui._sprite));
    
    // Test join sound
    if (this.sounds.ui._sprite.join) {
      console.log('[SoundService] Testing join sound...');
      const id = this.sounds.ui.play('join');
      console.log('[SoundService] Join sound ID:', id);
    } else {
      console.log('[SoundService] Join sound not found in sprite');
    }
  }
}

// Create a singleton instance
const soundService = new SoundService();

export default soundService;
