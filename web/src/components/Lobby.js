import React, { useState, useEffect, useMemo } from 'react';
import styles from './styles/Lobby.module.css';
import { useLobby } from '../contexts/LobbyContext';
import { useAuth } from '../contexts/AuthContext';
import { useSocket } from '../contexts/SocketContext';
import { CircularProgress, Box, Typography, TextField, useMediaQuery, InputAdornment } from '@mui/material';
import AppHeader from './common/AppHeader';
import CurrencyAmount from './common/CurrencyAmount';
import RulesModal from './common/RulesModal';

const Lobby = () => {
  // Get state and actions from lobby and auth contexts
  const { lobbyState, createGame, joinGame } = useLobby();
  const { error: lobbyError, gameList } = lobbyState;
  const { user, logout } = useAuth();
  const { isConnected } = useSocket();
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');
  const isSmallMobile = useMediaQuery('(max-width:400px)');

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
  
  const handleJoinGame = (gameId) => {
    if (!user?.id) {
      setError('Please log in to join a game');
      return;
    }
    
    // First clear any errors
    setError(null);
    
    // Show loading state
    setIsLoading(true);
    
    // Call the joinGame function with the selected game ID
    joinGame(gameId);
  };
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  // Filter games based on search query
  const filteredGameList = useMemo(() => {
    if (!searchQuery.trim() || !gameList) return gameList;
    
    const query = searchQuery.trim().toLowerCase();
    return gameList.filter(game => 
      game.id.toLowerCase().includes(query) ||
      (game.hostName && game.hostName.toLowerCase().includes(query))
    );
  }, [gameList, searchQuery]);
  
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
        <AppHeader />
        
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
      <AppHeader />
      
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
                Balance: <CurrencyAmount amount={Number(user?.balance) || 0} size="medium" />
              </div>
              <div className={styles.buttonContainer}>
                <button 
                  className={`${styles.actionButton} ${styles.rulesButton}`}
                  onClick={() => setIsRulesOpen(true)}
                >
                  Review Rules
                </button>
                <button 
                  className={`${styles.actionButton} ${styles.logoutButton}`}
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
          
          {/* Add the RulesModal component */}
          <RulesModal
            open={isRulesOpen}
            onClose={() => setIsRulesOpen(false)}
          />
          
          <div className={styles.gradientDivider}></div>
          
          <div className={styles.buttonGroup}>
            <button 
              className={`${styles.actionButton} ${styles.createButton}`}
              onClick={handleCreateGame}
              disabled={!user?.username}
            >
              Create New Game
            </button>
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
        
        {/* Search bar for filtering games */}
        <div className={styles.searchContainer}>
          <TextField
            placeholder="Search games by ID"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={handleSearchChange}
            size={isSmallMobile ? "small" : "medium"}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <span className={styles.searchIcon}>🔍</span>
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'var(--info-light)',
                },
                '&:hover fieldset': {
                  borderColor: 'var(--info)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'var(--info)',
                },
                backgroundColor: 'white',
              },
              '& .MuiInputLabel-root': {
                color: 'var(--info-light)',
              },
              '& .MuiOutlinedInput-input': {
                color: 'var(--text-dark)',
                fontWeight: 500,
                padding: isSmallMobile ? '8px 10px' : '10px 12px',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'var(--info)',
              },
              marginBottom: '0.75rem',
            }}
          />
        </div>
        
        {filteredGameList && filteredGameList.length > 0 ? (
          <div className={styles.gameListWrapper}>
            {filteredGameList.map(game => (
              <div key={game.id} className={styles.gameListItem}>
                <div className={styles.gameListInfo}>
                  <div className={styles.gameListId}>{game.id}</div>
                  <div className={styles.gameListPlayers}>
                    {game.playerCount} {game.playerCount === 1 ? 'player' : 'players'}
                  </div>
                </div>
                <button 
                  className={styles.joinGameButton}
                  onClick={() => handleJoinGame(game.id)}
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
            <p className={styles.emptyStateMessage}>
              {searchQuery.trim() ? 'No matching games found' : 'No games in progress'}
            </p>
            <p className={styles.emptyStateHint}>
              {searchQuery.trim() 
                ? 'Try a different search or create a new game' 
                : 'Create a new game to get started!'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lobby;
