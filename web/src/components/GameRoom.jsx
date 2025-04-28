import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GameProvider } from '../contexts/GameContext';
import GameScreen from './GameScreen';
import { useSocket } from '../contexts/SocketContext';
import { LoadingScreen } from './common/LoadingScreen';
import soundService from '../services/SoundService';

const GameRoom = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const { socket, isConnected } = useSocket();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Handle return to lobby
  const handleReturnToLobby = () => {
    if (socket && isConnected && gameId) {
      soundService.play('ui.leave');
      socket.emit('leaveGame', { gameId });
      navigate('/');
    }
  };

  // Track the last joined gameId to avoid emitting leave for a game we never joined
  const lastJoinedGameIdRef = React.useRef(null);

  useEffect(() => {
    if (!socket || !isConnected || !gameId) return;

    setLoading(true);
    
    const onGameJoined = (data) => {
      if (data && data.game && data.game.id === gameId) {
        setGame(data.game);
        setLoading(false);
        setError(null);
        lastJoinedGameIdRef.current = gameId; // Mark this game as joined
      }
    };
    
    const onError = (error) => {
      setError(error.message || 'An error occurred');
      setLoading(false);
      
      if (error.message === 'Game not found') {
        navigate('/');
      }
    };
    
    socket.on('gameJoined', onGameJoined);
    socket.on('error', onError);
    
    // Play join sound when joining a game
    soundService.play('ui.join');
    
    console.log(`[GameRoom] Joining game: ${gameId}`);
    socket.emit('joinGame', { gameId });
    
    return () => {
      console.log(`[GameRoom] Cleaning up event listeners for game: ${gameId}`);
      socket.off('gameJoined', onGameJoined);
      socket.off('error', onError);
      // Only emit leaveGame if we had actually joined a game previously
      if (isConnected && lastJoinedGameIdRef.current && lastJoinedGameIdRef.current !== gameId) {
        console.log(`[GameRoom] Leaving previous game ${lastJoinedGameIdRef.current} on unmount`);
        socket.emit('leaveGame', { gameId: lastJoinedGameIdRef.current });
        lastJoinedGameIdRef.current = null;
      }
    };
  }, [socket, isConnected, gameId, navigate]);

  if (loading) {
    return <LoadingScreen message={`Joining game ${gameId}...`} />;
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>An error occurred</h2>
        <p>{error}</p>
        {/* Suggest refreshing the page instead of navigating back */}
        <button onClick={() => window.location.reload()}>Refresh Page</button>
      </div>
    );
  }

  return (
    <GameProvider gameId={gameId} initialGameState={game}>
      <GameScreen onReturnToLobby={handleReturnToLobby} />
    </GameProvider>
  );
};

export default GameRoom;
