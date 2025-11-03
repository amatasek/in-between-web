import React from 'react';
import ReactDOM from 'react-dom/client';

// Import global styles
import './styles/variables.css';
import './styles/global.css';

// Import theme manager and initialize theme
import { initializeTheme } from './utils/themeManager';

// Import our context providers
import { AuthProvider } from './contexts/AuthContext';
import { SocketProvider } from './contexts/SocketContext';
import { UserDataProvider } from './contexts/UserDataContext';
import { PreferencesProvider } from './contexts/PreferencesContext';
import { AdProvider } from './contexts/AdContext';
import App from './App';

// Import Capgo for live updates
import { CapacitorUpdater } from '@capgo/capacitor-updater';

// Initialize theme before rendering
initializeTheme();

// Initialize Capgo live updates (only on native platforms)
if (window.Capacitor?.isNativePlatform()) {
  CapacitorUpdater.notifyAppReady();

  // Manually set safe area insets for Android edge-to-edge
  // Since env(safe-area-inset-*) doesn't work on Android until Chromium M140+
  const platform = window.Capacitor?.getPlatform();
  if (platform === 'android') {
    // Standard Android status bar height is 24dp which equals 48px on most devices (2x density)
    // This is a safe fallback until env() variables work natively
    document.documentElement.style.setProperty('--safe-area-inset-top', '48px');
    document.documentElement.style.setProperty('--safe-area-inset-bottom', '0px');
    console.log('✅ Android safe area insets set: top=48px');
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <SocketProvider>
        <UserDataProvider>
          <PreferencesProvider>
            <AdProvider>
              <App />
            </AdProvider>
          </PreferencesProvider>
        </UserDataProvider>
      </SocketProvider>
    </AuthProvider>
  </React.StrictMode>
);
