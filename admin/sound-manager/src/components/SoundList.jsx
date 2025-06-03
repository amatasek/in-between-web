import React, { useState } from 'react';
import { useSound } from '../contexts/SoundContext';
import './SoundList.css';

const SoundList = ({ onSelectSound, selectedSound }) => {
  const { soundConfig, loading, error, playSound, regenerateSoundSprite } = useSound();
  const [regenerating, setRegenerating] = useState(false);
  const [regenerateMessage, setRegenerateMessage] = useState(null);

  if (loading) {
    return <div className="sound-list loading">Loading sound configuration...</div>;
  }

  if (error) {
    return <div className="sound-list error">Error: {error}</div>;
  }

  if (!soundConfig || !soundConfig.categories || !soundConfig.categories.ui || !soundConfig.categories.ui.sounds) {
    return <div className="sound-list empty">No sounds found in configuration.</div>;
  }

  const sounds = soundConfig.categories.ui.sounds;
  const soundNames = Object.keys(sounds);

  // Handle regenerating the sound sprite
  const handleRegenerate = async () => {
    setRegenerating(true);
    setRegenerateMessage(null);
    
    try {
      const result = await regenerateSoundSprite();
      
      if (result.success) {
        setRegenerateMessage({
          type: 'success',
          text: `Successfully regenerated sound sprite with ${result.soundCount} sounds (${result.totalDuration.toFixed(2)}s total)`
        });
      } else {
        setRegenerateMessage({
          type: 'error',
          text: `Error: ${result.error}`
        });
      }
    } catch (err) {
      setRegenerateMessage({
        type: 'error',
        text: `Error: ${err.message}`
      });
    } finally {
      setRegenerating(false);
    }
  };
  
  return (
    <div className="sound-list">
      <div className="sound-list-header">
        <h2>Sound Effects</h2>
        <button 
          className="btn regenerate" 
          onClick={handleRegenerate} 
          disabled={regenerating || loading}
        >
          {regenerating ? 'Regenerating...' : 'Regenerate Sprite'}
        </button>
      </div>
      
      {regenerateMessage && (
        <div className={`message ${regenerateMessage.type}`}>
          {regenerateMessage.text}
        </div>
      )}
      
      {soundNames.length === 0 ? (
        <div className="empty-message">No sounds available</div>
      ) : (
        <ul>
          {soundNames.map(name => (
            <li 
              key={name}
              className={selectedSound === name ? 'selected' : ''}
              onClick={() => onSelectSound(name)}
            >
              <div className="sound-item">
                <div className="sound-info">
                  <span className="sound-name">{name}</span>
                  <span className="sound-description">{sounds[name].description}</span>
                </div>
                <div className="sound-actions">
                  <button 
                    className="btn play"
                    onClick={(e) => {
                      e.stopPropagation();
                      playSound(name);
                    }}
                  >
                    Play
                  </button>
                  <button 
                    className="btn edit"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectSound(name);
                    }}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SoundList;
