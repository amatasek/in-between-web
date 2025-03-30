import { useState, useEffect } from 'react';
import io from 'socket.io-client';

// Use localhost for development, but in production would use server IP or domain
const SERVER_URL = 'http://localhost:3000';

export function useGame() {
  const [gameState, setGameState] = useState(null);
  const [socket, setSocket] = useState(null);
  const [error, setError] = useState(null);
  const [gameList, setGameList] = useState([]);
  const [gameId, setGameId] = useState(null);
  const [view, setView] = useState('lobby'); // 'lobby' or 'game'

  useEffect(() => {
    // Create socket connection
    const newSocket = io(SERVER_URL);
    setSocket(newSocket);

    // Socket event handlers
    newSocket.on('connect', () => {
      console.log('Connected to game server');
    });

    newSocket.on('gameList', (games) => {
      setGameList(games);
    });

    newSocket.on('gameCreated', (data) => {
      setGameId(data.gameId);
      setView('game');
    });

    newSocket.on('gameJoined', (data) => {
      setGameId(data.gameId);
      setView('game');
    });

    newSocket.on('gameUpdate', (state) => {
      setGameState(state);
    });

    newSocket.on('gameEnded', () => {
      setView('lobby');
      setGameState(null);
      setGameId(null);
    });

    newSocket.on('error', (err) => {
      setError(err);
    });

    // Request game list every 5 seconds
    const interval = setInterval(() => {
      if (view === 'lobby') {
        newSocket.emit('getGameList');
      }
    }, 5000);

    // Initial game list request
    newSocket.emit('getGameList');

    // Cleanup on unmount
    return () => {
      clearInterval(interval);
      newSocket.disconnect();
    };
  }, [view]);

  // Game actions
  const createGame = (playerName) => {
    if (!playerName?.trim()) {
      setError('Please enter your name');
      return;
    }

    if (socket) {
      socket.emit('createGame', playerName);
    }
  };

  const joinGame = (gameId, playerName) => {
    if (!playerName?.trim()) {
      setError('Please enter your name');
      return;
    }

    if (socket) {
      socket.emit('joinGame', { gameId, playerName });
    }
  };

  const placeBet = (amount) => {
    if (socket && gameId) {
      socket.emit('placeBet', { amount });
    }
  };

  const nextRound = () => {
    if (socket && gameId) {
      socket.emit('nextRound');
    }
  };

  const returnToLobby = () => {
    setView('lobby');
    setGameState(null);
    setGameId(null);
  };

  // Leave the current game and return to lobby
  const leaveGame = () => {
    if (socket && gameId) {
      socket.emit('leaveGame');
      returnToLobby();
    }
  };

  // Refresh game list manually
  const refreshGameList = () => {
    if (socket) {
      socket.emit('getGameList');
    }
  };

  return {
    // State
    gameState,
    gameList,
    gameId,
    error,
    view,
    
    // Actions
    setError,
    createGame,
    joinGame,
    placeBet,
    nextRound,
    returnToLobby,
    leaveGame,
    refreshGameList,
    setView
  };
}
