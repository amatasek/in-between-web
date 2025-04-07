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
    this.lastPlayedTime = {}; // Track when each sound was last played for debouncing
    this.debounceTime = 500; // Debounce time in milliseconds (half a second)
    this.audioUnlocked = false; // Track if audio has been unlocked for mobile
    
    // Get API URL from environment or use localhost as fallback
    this.API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
    
    // Only initialize in browser environment
    if (typeof window !== 'undefined') {
      // Initialize on next tick to avoid SSR issues
      setTimeout(() => {
        this.initialize();
        this._setupMobileAudioUnlock();
      }, 0);
    }
  }

  /**
   * Initialize the sound service and load all sound categories
   */
  initialize() {
    if (this.initialized) return;
    
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
    // Skip if already loaded
    if (this.sounds[category]) return;
    
    // Define sprites for each category
    const sprites = {};
    
    // UI category sprites
    if (category === 'ui') {
      // Match the exact timing from ui-sounds.json
      sprites.join = [0, 1000];     // 0 to 1.0 seconds
      sprites.leave = [1500, 1000]; // 1.5 to 2.5 seconds
    }
    
    // Create the Howl instance with the sprites
    this.sounds[category] = new Howl({
      src: [
        `${this.API_URL}/assets/audio/${category}-sounds.mp3`,
        `${this.API_URL}/assets/audio/${category}-sounds.webm`
      ],
      sprite: sprites,
      preload: true,
      // Use HTML5 Audio on mobile for better compatibility
      html5: this._isMobileDevice(),
      format: ['mp3', 'webm'],
      pool: 10 // Increase the pool size to avoid exhaustion
    });
  }

  /**
   * Play a sound effect
   * @param {string} sound - Sound name (format: category.name or just name for UI category)
   * @param {number} [volume=1] - Volume level (0-1)
   * @returns {number|undefined} Sound ID if played, undefined if not
   */
  play(sound, volume = 1) {
    // Skip if muted
    if (this.muted) return;
    
    // Initialize if not already done
    if (!this.initialized) this.initialize();
    
    let category, soundName;
    if (sound.includes('.')) {
      [category, soundName] = sound.split('.');
    } else {
      category = 'ui';
      soundName = sound;
    }
    
    if (!this.sounds[category]) {
      // Try to load the category if it's not loaded yet
      this.loadCategory(category);
      return;
    }
    
    // Create a unique key for this sound
    const soundKey = `${category}.${soundName}`;
    
    // Check if this sound was played recently (debounce)
    const now = Date.now();
    const lastPlayed = this.lastPlayedTime[soundKey] || 0;
    if (now - lastPlayed < this.debounceTime) {
      return;
    }
    
    // Update the last played time
    this.lastPlayedTime[soundKey] = now;
    
    // Set volume and play the sound
    this.sounds[category].volume(volume);
    return this.sounds[category].play(soundName);
  }

  /**
   * Set muted state
   * @param {boolean} muted - Whether sound should be muted
   */
  setMuted(muted) {
    this.muted = muted;
    
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
    }
  }
  
  /**
   * Setup audio unlock for mobile devices
   * @private
   */
  _setupMobileAudioUnlock() {
    if (typeof window === 'undefined' || !this._isMobileDevice()) return;
    
    const unlockAudio = () => {
      if (this.audioUnlocked) return;
      
      // Play a silent sound to unlock audio on mobile
      const silence = new Audio();
      silence.src = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjI5LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAABIgD///////////////////////////////////////////8AAAA8TEFNRTMuMTAwAQAAAAAAAAAAABSAJAJAQgAAgAAAAiIkfC3/////////////////////';  
      silence.load();
      silence.play().then(() => {
        this.audioUnlocked = true;
        document.body.removeEventListener('touchstart', unlockAudio);
        document.body.removeEventListener('touchend', unlockAudio);
        document.body.removeEventListener('click', unlockAudio);
      }).catch(e => {
        // Silent failure - we'll try again on next user interaction
      });
    };
    
    // Add event listeners to unlock audio on user interaction
    document.body.addEventListener('touchstart', unlockAudio, false);
    document.body.addEventListener('touchend', unlockAudio, false);
    document.body.addEventListener('click', unlockAudio, false);
  }
  
  /**
   * Check if current device is mobile
   * @private
   * @returns {boolean} True if mobile device
   */
  _isMobileDevice() {
    if (typeof navigator === 'undefined') return false;
    
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1); // iPad detection
  }

}

// Create a singleton instance
const soundService = new SoundService();

export default soundService;
