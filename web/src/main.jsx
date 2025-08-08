import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Import global styles
import './styles/variables.css';
import './styles/global.css';

// Import theme manager and initialize theme
import { initializeTheme } from './utils/themeManager';

// Import our context providers
import { SocketProvider } from './contexts/SocketContext';
import { AuthProvider } from './contexts/AuthContext';
import { PreferencesProvider } from './contexts/PreferencesContext';
import { UserDataProvider } from './contexts/UserDataContext';

// Initialize theme before rendering
initializeTheme();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <SocketProvider>
        <UserDataProvider>
          <PreferencesProvider>
            <App />
          </PreferencesProvider>
        </UserDataProvider>
      </SocketProvider>
    </AuthProvider>
  </React.StrictMode>
);
