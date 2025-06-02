import React, { useState, useEffect } from 'react';
import { useSound } from '../contexts/SoundContext';
import './SoundEditor.css';

const SoundEditor = ({ sound, onClose }) => {
  const { soundConfig, uiSounds, playSound, updateSound } = useSound();
  const [description, setDescription] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (soundConfig?.categories?.ui?.sounds?.[sound]) {
      setDescription(soundConfig.categories.ui.sounds[sound].description || '');
    }
  }, [sound, soundConfig]);
  
  const handleSave = async () => {
    try {
      setIsSaving(true);
      setError(null);
      
      const success = await updateSound(sound, {
        description
      });
      
      if (!success) {
        throw new Error('Failed to save sound changes');
      }
      
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };
  
  if (!soundConfig || !uiSounds || !soundConfig.categories?.ui?.sounds?.[sound]) {
    return <div className="sound-editor">Sound not found</div>;
  }
  
  const soundData = soundConfig.categories.ui.sounds[sound];
  const spriteData = uiSounds.spritemap[sound];
  
  return (
    <div className="sound-editor-overlay">
      <div className="sound-editor">
        <div className="editor-header">
          <h2>Edit Sound: {sound}</h2>
          <button className="btn close" onClick={onClose}>×</button>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <div className="editor-content">
          <div className="form-group">
            <label>Sound Name:</label>
            <input type="text" value={sound} disabled />
          </div>
          
          <div className="form-group">
            <label>Description:</label>
            <input 
              type="text" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter sound description"
            />
          </div>
          
          <div className="form-group">
            <label>Start Time:</label>
            <input type="text" value={`${spriteData.start} seconds`} disabled />
          </div>
          
          <div className="form-group">
            <label>End Time:</label>
            <input type="text" value={`${spriteData.end} seconds`} disabled />
          </div>
          
          <div className="form-group">
            <label>Duration:</label>
            <input type="text" value={`${spriteData.end - spriteData.start} seconds`} disabled />
          </div>
          
          <div className="form-group">
            <button 
              className="btn play-btn"
              onClick={() => playSound(sound)}
            >
              Play Sound
            </button>
          </div>
        </div>
        
        <div className="editor-footer">
          <button 
            className="btn cancel" 
            onClick={onClose}
            disabled={isSaving}
          >
            Cancel
          </button>
          <button 
            className="btn primary" 
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SoundEditor;
