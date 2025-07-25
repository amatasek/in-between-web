import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import soundService from './services/SoundService';
import { router } from './router';
import { VirtualKeyboardProvider } from './contexts/VirtualKeyboardContext';
import './styles/global.css';

function App() {
  // Initialize Sound Service
  useEffect(() => {
    soundService.initialize();
  }, []);

  return (
    <VirtualKeyboardProvider>
      <RouterProvider router={router} />
    </VirtualKeyboardProvider>
  );
}

export default App;
