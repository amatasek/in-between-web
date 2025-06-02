import React, { useState } from 'react';
import { useSound } from '../contexts/SoundContext';
import './AddSoundForm.css';

const AddSoundForm = ({ onClose }) => {
  const { addSound } = useSound();
  const [soundName, setSoundName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState(null);
  
  const handleSelectFile = async () => {
    try {
      const result = await window.electronAPI.selectAudioFile();
      
      if (result.canceled) {
        return;
      }
      
      setSelectedFile(result.filePath);
    } catch (err) {
      setError('Failed to select audio file: ' + err.message);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!soundName.trim()) {
      setError('Please enter a sound name');
      return;
    }
    
    if (!selectedFile) {
      setError('Please select an audio file');
      return;
    }
    
    try {
      setIsAdding(true);
      setError(null);
      
      // Normalize sound name to be lowercase with hyphens
      const normalizedName = soundName.trim()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
      
      const success = await addSound(normalizedName, selectedFile);
      
      if (!success) {
        throw new Error('Failed to add sound');
      }
      
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsAdding(false);
    }
  };
  
  return (
    <div className="add-sound-overlay">
      <div className="add-sound-form">
        <div className="form-header">
          <h2>Add New Sound</h2>
          <button className="btn close" onClick={onClose}>×</button>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="sound-name">Sound Name:</label>
            <input 
              id="sound-name"
              type="text" 
              value={soundName} 
              onChange={(e) => setSoundName(e.target.value)}
              placeholder="Enter sound name (e.g., card-flip)"
              disabled={isAdding}
            />
            <small>Use lowercase letters, numbers, and hyphens only</small>
          </div>
          
          <div className="form-group">
            <label>Audio File:</label>
            <div className="file-selection">
              <input 
                type="text" 
                value={selectedFile || ''} 
                placeholder="No file selected"
                disabled
              />
              <button 
                type="button" 
                className="btn select-file"
                onClick={handleSelectFile}
                disabled={isAdding}
              >
                Browse...
              </button>
            </div>
            <small>Select an MP3, WAV, or OGG file</small>
          </div>
          
          <div className="form-footer">
            <button 
              type="button" 
              className="btn cancel" 
              onClick={onClose}
              disabled={isAdding}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn primary"
              disabled={isAdding || !soundName.trim() || !selectedFile}
            >
              {isAdding ? 'Adding...' : 'Add Sound'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSoundForm;
