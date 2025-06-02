import React, { useState, useEffect } from 'react';
import SoundList from './components/SoundList';
import SoundEditor from './components/SoundEditor';
import AddSoundForm from './components/AddSoundForm';
import { SoundProvider } from './contexts/SoundContext';
import './App.css';

function App() {
  const [selectedSound, setSelectedSound] = useState(null);
  const [isAddingSound, setIsAddingSound] = useState(false);

  return (
    <SoundProvider>
      <div className="app">
        <header className="app-header">
          <h1>In-Between Sound Manager</h1>
          <div className="header-actions">
            <button 
              className="btn primary" 
              onClick={() => setIsAddingSound(true)}
            >
              Add New Sound
            </button>
          </div>
        </header>
        
        <div className="app-content">
          <SoundList 
            onSelectSound={setSelectedSound} 
            selectedSound={selectedSound}
          />
          
          {selectedSound && (
            <SoundEditor 
              sound={selectedSound} 
              onClose={() => setSelectedSound(null)}
            />
          )}
          
          {isAddingSound && (
            <AddSoundForm 
              onClose={() => setIsAddingSound(false)}
            />
          )}
        </div>
      </div>
    </SoundProvider>
  );
}

export default App;
