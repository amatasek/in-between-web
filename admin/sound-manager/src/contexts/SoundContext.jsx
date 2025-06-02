import React, { createContext, useState, useEffect, useContext } from 'react';

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  const [soundConfig, setSoundConfig] = useState(null);
  const [uiSounds, setUiSounds] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Load sound configuration from the server
  useEffect(() => {
    const loadSoundConfig = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const result = await window.electronAPI.getSoundConfig();
        
        if (result.error) {
          throw new Error(result.error);
        }
        
        setSoundConfig(result.soundConfig);
        setUiSounds(result.uiSounds);
      } catch (err) {
        console.error('Failed to load sound config:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    loadSoundConfig();
  }, []);
  
  // Save the sound configuration
  const saveSoundConfig = async () => {
    try {
      const result = await window.electronAPI.saveSoundConfig({
        soundConfig,
        uiSounds
      });
      
      if (result.error) {
        throw new Error(result.error);
      }
      
      return true;
    } catch (err) {
      console.error('Failed to save sound config:', err);
      setError(err.message);
      return false;
    }
  };
  
  // Add a new sound to the configuration
  const addSound = async (soundName, filePath) => {
    try {
      // Normalize the sound name (lowercase with hyphens)
      const normalizedName = soundName.toLowerCase().replace(/\s+/g, '-');
      
      // Add the sound to the sprite using the Electron API
      const result = await window.electronAPI.addSoundToSprite({
        soundName: normalizedName,
        filePath,
        category: 'ui' // Currently only supporting UI sounds
      });
      
      if (result.error) {
        throw new Error(result.error);
      }
      
      // Update the local state with the new sound
      const newSoundConfig = { ...soundConfig };
      const newUiSounds = { ...uiSounds };
      
      // Add to sound config
      if (!newSoundConfig.categories.ui.sounds[normalizedName]) {
        newSoundConfig.categories.ui.sounds[normalizedName] = {
          start: result.spriteInfo ? result.spriteInfo.startTime : 0,
          duration: result.spriteInfo ? (result.spriteInfo.endTime - result.spriteInfo.startTime) : 0,
          description: soundName // Use the original name as description
        };
      }
      
      // Add to UI sounds spritemap
      if (result.spriteInfo) {
        newUiSounds.spritemap[normalizedName] = {
          start: result.spriteInfo.startTime,
          end: result.spriteInfo.endTime,
          loop: false
        };
      }
      
      setSoundConfig(newSoundConfig);
      setUiSounds(newUiSounds);
      
      // Save the updated configurations
      await saveSoundConfig();
      
      return true;
    } catch (err) {
      console.error('Failed to add sound:', err);
      setError(err.message);
      return false;
    }
  };
  
  // Play a sound
  const playSound = async (soundId) => {
    try {
      const result = await window.electronAPI.playSound({ soundId });
      
      if (result.error) {
        console.error('Error playing sound:', result.error);
        setError(result.error);
      }
    } catch (err) {
      console.error('Failed to play sound:', err);
      setError(err.message);
    }
  };
  
  // Update a sound's metadata
  const updateSound = async (soundName, updates) => {
    try {
      const newSoundConfig = { ...soundConfig };
      
      if (newSoundConfig.categories.ui.sounds[soundName]) {
        newSoundConfig.categories.ui.sounds[soundName] = {
          ...newSoundConfig.categories.ui.sounds[soundName],
          ...updates
        };
      }
      
      setSoundConfig(newSoundConfig);
      await saveSoundConfig();
      
      return true;
    } catch (err) {
      console.error('Failed to update sound:', err);
      setError(err.message);
      return false;
    }
  };
  
  return (
    <SoundContext.Provider
      value={{
        soundConfig,
        uiSounds,
        loading,
        error,
        playSound,
        addSound,
        updateSound,
        saveSoundConfig
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => useContext(SoundContext);

export default SoundContext;
