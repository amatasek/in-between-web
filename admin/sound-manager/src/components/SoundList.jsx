import React from 'react';
import { useSound } from '../contexts/SoundContext';
import './SoundList.css';

const SoundList = ({ onSelectSound, selectedSound }) => {
  const { soundConfig, loading, error, playSound } = useSound();

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

  return (
    <div className="sound-list">
      <h2>Sound Effects</h2>
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
