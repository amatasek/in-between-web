import React from 'react';
import Head from 'next/head';

// Import our component-based architecture
import Lobby from '../components/Lobby';
import GameScreen from '../components/GameScreen';
import AuthPage from '../components/auth/AuthPage';

// Import our context providers
import { SocketProvider } from '../contexts/SocketContext';
import { LobbyProvider, useLobby } from '../contexts/LobbyContext';
import { GameProvider } from '../contexts/GameContext';
import { AuthProvider, useAuth } from '../contexts/AuthContext';

// A component that uses the lobby context to determine what to show
const LobbyContent = () => {
  const { user } = useAuth();
  const { lobbyState, returnToLobby } = useLobby();
  const { gameId, gameState } = lobbyState;
  
  // If not logged in, show auth page
  if (!user) {
    return <AuthPage />;
  }

  // If there's no gameId, show the lobby, otherwise show the game
  return !gameId ? (
    <Lobby />
  ) : (
    <GameProvider gameId={gameId} initialGameState={gameState}>
      <GameScreen onReturnToLobby={returnToLobby} />
    </GameProvider>
  );
};

// Main App component that switches between lobby and game views
function App() {
  // We'll use the LobbyContext to determine the current view and game ID
  // No need for local state anymore

  return (
    <div>
      <Head>
        <title>In Between</title>
        <meta name="description" content="Play In Between online with friends" />
        <style>
          {`
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #1a1a2e;
              color: #ecf0f1;
            }
          `}
        </style>
      </Head>
      <LobbyProvider>
        <LobbyContent />
      </LobbyProvider>
    </div>
  );
}

// Export the wrapped component with SocketProvider
export default function Home() {
  return (
    <AuthProvider>
    <SocketProvider>
      <App />
    </SocketProvider>
    </AuthProvider>
  );
}
