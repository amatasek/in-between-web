import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Import our component-based architecture
import Lobby from './components/Lobby';
import GameScreen from './components/GameScreen';
import AuthPage from './components/auth/AuthPage';

// Import our context providers
import { LobbyProvider, useLobby } from './contexts/LobbyContext';
import { GameProvider } from './contexts/GameContext';
import { useAuth } from './contexts/AuthContext';

// A component that handles authentication
const ProtectedRoute = ({ children }) => {
  const { user, loading, token } = useAuth();
  
  // Show loading state while checking auth
  if (loading) {
    return <div>Loading...</div>;
  }
  
  // Only show auth page if user is not logged in AND there's no token being processed
  if (!user && !token) {
    return <Navigate to="/auth" />;
  }
  
  return children;
};

// A component that uses the lobby context to determine what to show
const GameScreenWithContext = () => {
  const { lobbyState, returnToLobby } = useLobby();
  const { gameId, gameState } = lobbyState;
  
  if (!gameId) {
    return <Navigate to="/" />;
  }
  
  return (
    <GameProvider gameId={gameId} initialGameState={gameState}>
      <GameScreen onReturnToLobby={returnToLobby} />
    </GameProvider>
  );
};

// Main App component that handles routing
function AppWithProviders() {
  return (
    <LobbyProvider>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Lobby />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/game/:gameId" 
          element={
            <ProtectedRoute>
              <GameScreenWithContext />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </LobbyProvider>
  );
}

export default AppWithProviders;
