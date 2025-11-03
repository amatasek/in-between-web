import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GameProvider, useGameContext } from '../contexts/GameContext';
import { useSocket } from '../contexts/SocketContext';
import { LoadingScreen } from './common/LoadingScreen';
import PasswordPromptModal from './common/PasswordPromptModal';
import GameScreen from './GameScreen';
import AdInterstitial from './AdInterstitial';
import AdBanner from './AdBanner';
import AdSideBanner from './AdSideBanner';
import { useAdInterstitial } from '../hooks/useAdInterstitial';
import soundService from '../services/SoundService';

// Move component outside to prevent re-creation on every render
const GameRoomContent = ({
  loading,
  error,
  isPasswordModalOpen,
  handlePasswordCancel,
  handlePasswordSubmit,
  handleReturnToLobby,
  gameId
}) => {
  const { gameState } = useGameContext();
  const { socket } = useSocket();

  // Add beforeunload listener to warn users who are ready (in an active hand)
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      const currentUserId = socket?.auth?.userId;
      const currentPlayer = currentUserId && gameState?.players ? gameState.players[currentUserId] : null;
      const isPlayerReady = currentPlayer?.isReady || false;

      // Only show warning if player is ready (has ante'd and is in the hand)
      if (isPlayerReady) {
        e.preventDefault();
        e.returnValue = 'You have money in the pot! Are you sure you want to leave?';
        return e.returnValue;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [gameState, socket]);

  return (
    <>
      <PasswordPromptModal
        isOpen={isPasswordModalOpen}
        onClose={handlePasswordCancel}
        onSubmit={handlePasswordSubmit}
        gameId={gameId}
      />

      {loading && <LoadingScreen message={`Joining game ${gameId}...`} />}

      {error && !loading && !isPasswordModalOpen && (
        <div className="error-container" style={{ padding: '20px', color: 'red', textAlign: 'center' }}>
          <h2>An error occurred</h2>
          <p>{error}</p>
          {/* Suggest refreshing the page instead of navigating back */}
          <button type="button" onClick={() => window.location.reload()}>Refresh Page</button>
        </div>
      )}

      {!loading && !error && gameState &&
        <GameScreen onReturnToLobby={handleReturnToLobby} />
      }
    </>
  );
};

const GameRoom = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const { socket, isConnected } = useSocket();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const hasInitiatedJoin = useRef(false);
  const { shouldShowAd, hideAd } = useAdInterstitial();

  const handleReturnToLobby = useCallback(() => {
    if (socket && isConnected && gameId) {
      soundService.play('ui.leave');
      socket.emit('leaveGame', { gameId });
      navigate('/', { state: { fromGame: true } });
    }
  }, [socket, isConnected, gameId, navigate]);

  const handlePasswordSubmit = useCallback((password) => {
    setIsPasswordModalOpen(false);
    if (socket && gameId && password) {
      setError(null); 
      socket.emit('joinGame', { gameId, password });
      setLoading(true);
    }
  }, [socket, gameId]);

  const handlePasswordCancel = useCallback(() => {
    setIsPasswordModalOpen(false);
    navigate('/');
  }, [navigate]);

  useEffect(() => {
    setError(null);          
    setIsPasswordModalOpen(false); 
    setLoading(true);        
  }, [gameId]);

  useEffect(() => {
    if (!socket) {
      return; 
    }

    const onGameJoined = (data) => {
      if (data && data.game && data.game.id === gameId) {
        soundService.play('ui.join');
        setLoading(false);
        setError(null);
        setIsPasswordModalOpen(false);
      }
    };

    const onError = (errorData) => {
      const message = errorData.message || 'An unknown error occurred';

      if (message === 'Password required') {
        console.error(errorData);
        setIsPasswordModalOpen(true);
        setLoading(false);
        setError(null);
      } else if (message === 'Invalid password') {
        console.error(errorData);
        setError('Invalid password.');
        setIsPasswordModalOpen(true);
        setLoading(false);
      } else if (message === 'Game not found') {
        navigate('/');
      } else if (message === 'Game is full') {
        setError(message);
        setLoading(false);
        setIsPasswordModalOpen(false);
        setTimeout(() => navigate('/'), 3000);
      } else {
        setError(message);
        setLoading(false);
        setIsPasswordModalOpen(false);
      }
    };

    socket.on('gameJoined', onGameJoined);
    socket.on('error', onError);

    return () => {
      socket.off('gameJoined', onGameJoined);
      socket.off('error', onError);
    };
  }, [socket, gameId, navigate]); 

  useEffect(() => {
    // Use ref to prevent double emission due to StrictMode or rapid state changes
    if (socket && gameId && !hasInitiatedJoin.current) {
      hasInitiatedJoin.current = true; // Mark as initiated *immediately*
      setLoading(true);
      setError(null);
      setIsPasswordModalOpen(false);
      socket.emit('joinGame', { gameId });
    } else {
    }
    // Dependencies remain minimal: only run when socket or gameId fundamentally change
  }, [socket, gameId]);

  return (
    <GameProvider gameId={gameId}>
      <GameRoomContent
        loading={loading}
        error={error}
        isPasswordModalOpen={isPasswordModalOpen}
        handlePasswordCancel={handlePasswordCancel}
        handlePasswordSubmit={handlePasswordSubmit}
        handleReturnToLobby={handleReturnToLobby}
        gameId={gameId}
      />

      {shouldShowAd && <AdInterstitial onClose={hideAd} />}
      <AdBanner />
      <AdSideBanner position="left" minWidth={1200} />
      <AdSideBanner position="right" minWidth={1200} />
    </GameProvider>
  );
};

export default GameRoom;
