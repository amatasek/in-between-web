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
  const { lobbyState, returnToLobby, joinGame } = useLobby();
  const { gameId, gameState, view } = lobbyState;
  
  // Add detailed logging for debugging
  React.useEffect(() => {
    console.log('[App] LobbyContent state changed:', { 
      gameId, 
      view,
      hasGameState: !!gameState,
      user: user?.username
    });
  }, [gameId, view, gameState, user]);
  
  // We've removed all page reload approaches since we fixed the core issue
  // with the duplicate event handlers in GameContext and LobbyContext
  
  // If not logged in, show auth page
  if (!user) {
    return <AuthPage />;
  }

  // IMPORTANT: We're using a strict view-based approach to determine what to show
  // This ensures we respect the view state from LobbyContext regardless of other state
  if (view === 'game' && gameId) {
    console.log('[App] Rendering game view for game:', gameId);
    return (
      <GameProvider gameId={gameId} initialGameState={gameState}>
        <GameScreen onReturnToLobby={returnToLobby} />
      </GameProvider>
    );
  } else {
    // Default to lobby view for any other state
    console.log('[App] Rendering lobby view');
    return <Lobby />;
  }
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

// Export the wrapped component with proper provider hierarchy
export default function Home() {
  return (
    <SocketProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </SocketProvider>
  );
}
