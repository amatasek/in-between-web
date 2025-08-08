import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GameProvider, useGameContext } from '../contexts/GameContext';
import GameScreen from './GameScreen';
import { useSocket } from '../contexts/SocketContext';
import { LoadingScreen } from './common/LoadingScreen';
import PasswordPromptModal from './common/PasswordPromptModal';
import soundService from '../services/SoundService';

const GameRoom = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const { socket, isConnected } = useSocket();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const hasInitiatedJoin = useRef(false); // Ref to track true initiation

  const handleReturnToLobby = useCallback(() => {
    if (socket && isConnected && gameId) {
      soundService.play('ui.leave'); 
      socket.emit('leaveGame', { gameId }); 
      navigate('/');
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

  const GameRoomContent = () => {
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
        <button onClick={() => window.location.reload()}>Refresh Page</button>
          </div>
        )}
        
        {!loading && !error && gameState && 
          <GameScreen onReturnToLobby={handleReturnToLobby} />
        }
      </>
    );
  };

  return (
    <GameProvider gameId={gameId}>
      <GameRoomContent /> 
    </GameProvider>
  );
};

export default GameRoom;
