import React, { useState, useEffect } from 'react';
import styles from './styles/Lobby.module.css';
import { useLobby } from '../contexts/LobbyContext';
import { useAuth } from '../contexts/AuthContext';
import { useSocket } from '../contexts/SocketContext';
import { CircularProgress, Box, Typography } from '@mui/material';

const Lobby = () => {
  // Get state and actions from lobby and auth contexts
  const { lobbyState, createGame, joinGame } = useLobby();
  const { error: lobbyError, gameList } = lobbyState;
  const { user, logout } = useAuth();
  const { isConnected } = useSocket();
  const [gameIdInput, setGameIdInput] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // We'll handle loading state manually instead of using an effect

  // Check user data and socket connection status
  useEffect(() => {
    try {
      // Check if user exists and has required properties
      if (!user) {
        console.log('[Lobby] No user data found');
        setError('Please log in to continue');
        setIsLoading(false);
        return;
      }

      if (!user.username || !user.id) {
        console.error('[Lobby] Invalid user data:', user);
        setError('Invalid user data');
        logout(); // Clear invalid session
        setIsLoading(false);
        return;
      }

      console.log('[Lobby] Current user state:', {
        username: user.username,
        id: user.id
      });

      // Only stop loading when socket is connected
      if (isConnected) {
        console.log('[Lobby] Socket connected, ready to create/join games');
        setIsLoading(false);
        setError(null);
        
        // We've removed the localStorage approach since we fixed the core issue
        // with duplicate event handlers in GameContext and LobbyContext
      } else {
        console.log('[Lobby] Waiting for socket connection...');
        setIsLoading(true);
        
        // Set a timeout to prevent getting stuck on loading screen
        const timeoutId = setTimeout(() => {
          console.log('[Lobby] Socket connection timeout, proceeding anyway');
          setIsLoading(false);
        }, 3000); // 3 seconds timeout
        
        return () => clearTimeout(timeoutId);
      }
    } catch (err) {
      console.error('[Lobby] Error processing user data:', err);
      setError('Error loading user data');
      logout(); // Clear potentially corrupted session
      setIsLoading(false);
    }
  }, [user, logout, isConnected]);
  
  const handleCreateGame = () => {
    if (!user?.id) {
      setError('Please log in to create a game');
      return;
    }
    
    // First clear any errors
    setError(null);
    
    // Show loading state
    setIsLoading(true);
    
    // Simply call the createGame function directly
    // Since we fixed the duplicate event handler issue, this works correctly now
    createGame();
  };
  
  const handleJoinGame = () => {
    if (!user?.id) {
      setError('Please log in to join a game');
      return;
    }
    if (!gameIdInput.trim()) {
      setError('Please enter a game ID');
      return;
    }
    
    // First clear any errors
    setError(null);
    
    // Show loading state
    setIsLoading(true);
    
    // Simply call the joinGame function directly
    // Since we fixed the duplicate event handler issue, this works correctly now
    joinGame(gameIdInput.trim());
    
    // Clear the input field
    setGameIdInput('');
  };
  
  const handleGameIdChange = (e) => {
    setGameIdInput(e.target.value);
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleJoinGame();
    }
  };
  
  // Loading overlay component that shows during game transitions
  const LoadingOverlay = () => (
    <Box sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(26, 26, 46, 0.9)',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 3
    }}>
      <CircularProgress size={60} sx={{ color: '#3498db' }} />
      <Typography variant="h6" sx={{ color: '#ecf0f1', mt: 2 }}>
        Connecting to game...
      </Typography>
      <Typography variant="body1" sx={{ color: '#bdc3c7', textAlign: 'center', maxWidth: '80%' }}>
        Please wait while we establish a connection to the game.
      </Typography>
    </Box>
  );

  // Render loading state while socket is connecting
  if (isLoading) {
    return (
      <div className={styles.lobbyContainer}>
        <div className={styles.logoContainer}>
          <h1 className={styles.gameTitle}>In Between <span className={styles.liveTag}>LIVE</span></h1>
          <p className={styles.gameSubtitle}>A classic card betting game</p>
        </div>
        
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          height: '50vh',
          gap: 3
        }}>
          <CircularProgress size={60} sx={{ color: '#3498db' }} />
          <Typography variant="h6" sx={{ color: '#ecf0f1', mt: 2 }}>
            Connecting to game server...
          </Typography>
          <Typography variant="body1" sx={{ color: '#bdc3c7', textAlign: 'center', maxWidth: '80%' }}>
            Please wait while we establish a secure connection to the game server.
          </Typography>
        </Box>
      </div>
    );
  }
  
  return (
    <div className={styles.lobbyContainer}>
      <div className={styles.logoContainer}>
        <h1 className={styles.gameTitle}>In Between <span className={styles.liveTag}>LIVE</span></h1>
        <p className={styles.gameSubtitle}>A classic card betting game</p>
      </div>
      
      <div className={styles.formContainer}>
        <div className={styles.formSection}>
          <div className={styles.welcomeMessage}>
            <div className={styles.welcomeHeader}>
              {error ? (
                <div className={styles.error}>{error}</div>
              ) : (
                <div className={styles.welcomeText}>Welcome, {user?.username || 'Player'}!</div>
              )}
              <div className={styles.balanceDisplay}>
                Balance: ${Number(user?.balance) || 0}
              </div>
              <button 
                className={`${styles.actionButton} ${styles.logoutButton}`}
                onClick={logout}
              >
                Logout
              </button>
            </div>
          </div>
          
          <div className={styles.buttonGroup}>
            <button 
              className={`${styles.actionButton} ${styles.createButton}`}
              onClick={handleCreateGame}
              disabled={!user?.username}
            >
              Create New Game
            </button>
            
            <div className={styles.orDivider}>or</div>
            
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Game ID</label>
              <div className={styles.joinInputGroup}>
                <input
                  type="text"
                  className={`${styles.textInput} ${styles.gameIdInput}`}
                  value={gameIdInput}
                  onChange={handleGameIdChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter game ID"
                />
                <button 
                  className={`${styles.actionButton} ${styles.joinButton}`}
                  onClick={handleJoinGame}
                  disabled={!user || !gameIdInput.trim()}
                >
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}
      </div>
      
      {/* Game List Section - Always shown */}
      <div className={styles.gameListContainer}>
        <h2 className={styles.gameListTitle}>Available Games</h2>
        {gameList && gameList.length > 0 ? (
          <div className={styles.gameListWrapper}>
            {gameList.map(game => (
              <div key={game.id} className={styles.gameListItem}>
                <div className={styles.gameListInfo}>
                  <div className={styles.gameListId}>{game.id}</div>
                  <div className={styles.gameListPlayers}>
                    {game.playerCount} {game.playerCount === 1 ? 'player' : 'players'}
                  </div>
                </div>
                <button 
                  className={styles.joinGameButton}
                  onClick={() => joinGame(game.id)}
                  disabled={!user}
                >
                  Join
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyGameList}>
            <div className={styles.emptyStateIcon}>🃏</div>
            <p className={styles.emptyStateMessage}>No games in progress</p>
            <p className={styles.emptyStateHint}>Create a new game to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lobby;
