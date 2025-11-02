import { createContext, useContext, useEffect, useState } from 'react';
import { useSocket } from './SocketContext';

const LobbyContext = createContext();

export const useLobby = () => useContext(LobbyContext);

export const LobbyProvider = ({ children }) => {
  const { socket, isConnected } = useSocket();
  
  const [gameList, setGameList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!socket || !isConnected) return;
    
    const handleGameList = (games) => {
      setGameList(games);
      setLoading(false);
    };
    
    const handleError = (err) => {
      console.error('[LobbyContext] Socket error:', err.message || err);
      setError(err.message || 'An error occurred');
      setLoading(false);
    };
    
    socket.on('gameList', handleGameList);
    socket.on('error', handleError);
    
    socket.emit('getGameList');
    
    return () => {
      socket.off('gameList', handleGameList);
      socket.off('error', handleError);
    };
  }, [socket, isConnected]);
  
  const contextValue = {
    gameList,
    loading,
    error,
  };
  
  return (
    <LobbyContext.Provider value={contextValue}>
      {children}
    </LobbyContext.Provider>
  );
};
