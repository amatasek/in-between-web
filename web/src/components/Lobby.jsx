import React, { useState, useEffect, useMemo } from 'react';
import styles from './styles/Lobby.module.css';
import { useLobby, LobbyProvider } from '../contexts/LobbyContext.jsx';
import { useAuth } from '../contexts/AuthContext';
import { useSocket } from '../contexts/SocketContext';
import { usePreferences } from '../contexts/PreferencesContext';
import { CircularProgress, Box, Typography, TextField, useMediaQuery, InputAdornment } from '@mui/material';
import AppHeader from './common/AppHeader';
import CurrencyAmount from './common/CurrencyAmount';
import PreferencesModal from './PreferencesModal.jsx';
import PreferencesButton from './PreferencesButton.jsx';
import UserAvatar from './UserAvatar.jsx';
import soundService from '../services/SoundService';

const Lobby = () => {
  // Get state and actions from lobby and auth contexts
  const { gameList, loading: lobbyLoading, error: lobbyError, refreshGameList } = useLobby();
  const { user, logout } = useAuth();
  const { socket, isConnected } = useSocket();
  const { preferences } = usePreferences();
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showPreferences, setShowPreferences] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');
  const isSmallMobile = useMediaQuery('(max-width:400px)');
  
  // Get the correct user ID format for server comparison (server uses format like 'user_username')
  const userId = user?.username ? `user_${user.username}` : null;

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
  
  // Handle creating a new game
  const handleCreateGame = () => {
    if (!user?.id) {
      setError('Please log in to create a game');
      return;
    }
    
    if (!isConnected) {
      setError('Not connected to server');
      return;
    }
    
    // First clear any errors
    setError(null);
    
    setIsLoading(true);
    
    // Play sound for game creation
    soundService.play('ui.join');
    
    // With our new approach, we just need to set up a one-time event listener
    // and then navigate to the game URL when we receive the gameJoined event
    const timeoutId = setTimeout(() => {
      socket.off('gameJoined', handleGameCreated);
      setError('Game creation timed out');
      setIsLoading(false);
    }, 5000);
    
    const handleGameCreated = (data) => {
      if (data && data.game && data.game.id) {
        console.log(`[Lobby] Game created with ID: ${data.game.id}`);
        // Clear the timeout since we've received a response
        clearTimeout(timeoutId);
        // Remove the event listener to avoid duplicates
        socket.off('gameJoined', handleGameCreated);
        // Navigate to the new game
        window.location.href = `/${data.game.id}`;
      }
    };
    
    // Register the event listener
    socket.on('gameJoined', handleGameCreated);
    
    // Emit the createGame event
    console.log('[Lobby] Emitting createGame event');
    socket.emit('createGame');
  };
  
  const handleJoinGame = (gameId) => {
    if (!isConnected) {
      setError('Not connected to server');
      return;
    }
    
    if (!user) {
      setError('Please log in to join a game');
      return;
    }
    
    // First clear any errors
    setError(null);
    
    // Show loading overlay
    setIsLoading(true);
    
    // First join the game via socket to ensure server-side state is updated
    console.log(`[Lobby] Joining game ${gameId}`);
    socket.emit('joinGame', { gameId });
    
    // Then navigate to the game route without page reload
    // Use React Router's navigate function instead of window.location.href
    // This prevents the socket connection from being disconnected and reconnected
    setTimeout(() => {
      window.location.href = `/${gameId}`;
    }, 500);
  };
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  // Filter and sort games based on search query and user's status
  const filteredGameList = useMemo(() => {
    if (!gameList) return [];
    
    // Debug log to see what game list data is being received
    console.log('[Lobby] Game list data:', gameList);
    // Debug log to understand the user object structure
    console.log('[Lobby] Complete user object:', user);
    
    // Log the user ID we're using for server comparison
    console.log('[Lobby] User ID for server comparison:', userId);
    
    // First filter by search query if one exists
    let filtered = gameList;
    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      filtered = gameList.filter(game => 
        game.id.toLowerCase().includes(query)
      );
    }
    
    // Then sort games with the following priority:
    // 1. Games where user is disconnected (highest priority)
    // 2. Games where user is a player but connected
    // 3. All other games (alphabetical by ID)
    return filtered.sort((a, b) => {
      // userId is now defined at a higher scope
      
      // Check if current user is in either game
      const userInGameA = a.allPlayers?.some(player => player.userId === userId);
      const userInGameB = b.allPlayers?.some(player => player.userId === userId);
      
      // Check if current user is disconnected in either game
      const userDisconnectedInA = a.disconnectedPlayers?.some(player => player.userId === userId);
      const userDisconnectedInB = b.disconnectedPlayers?.some(player => player.userId === userId);
      
      // Sort logic with priority
      if (userDisconnectedInA && !userDisconnectedInB) return -1;
      if (!userDisconnectedInA && userDisconnectedInB) return 1;
      if (userInGameA && !userInGameB) return -1;
      if (!userInGameA && userInGameB) return 1;
      return a.id.localeCompare(b.id); // Alphabetical by ID if tie
    });
  }, [gameList, searchQuery, user?.id]);
  
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
      
      {showPreferences && <PreferencesModal onClose={() => setShowPreferences(false)} />}
      
      <div className={styles.formContainer}>
        <div className={styles.formSection}>
          <div className={styles.welcomeMessage}>
            <div className={styles.welcomeHeader}>
              {error ? (
                <div className={styles.error}>{error}</div>
              ) : (
                <div className={styles.welcomeText}>
                  <UserAvatar 
                    user={{ 
                      username: user?.username || 'Player', 
                      profileImg: preferences?.profileImg 
                    }} 
                    size="medium" 
                    showName={true} 
                    namePosition="right"
                  />
                </div>
              )}
              <div className={styles.balanceDisplay}>
                Balance: <CurrencyAmount amount={Number(user?.balance) || 0} size="medium" />
              </div>
              <div className={styles.headerButtons}>
                <PreferencesButton onClick={() => setShowPreferences(true)} />
                <button 
                  className={styles.logoutButton}
                  onClick={logout}
                >
                  <span className={styles.buttonText}>Logout</span>
                </button>
              </div>
            </div>
          </div>
          
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
                  border: 'none',
                },
                '&:hover fieldset': {
                  border: 'none',
                },
                '&.Mui-focused fieldset': {
                  border: 'none',
                },
                backgroundColor: '#0a1622',
                boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.5)',
                borderRadius: '8px',
                border: 'none',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: '#0c1825',
                },
                '&.Mui-focused': {
                  backgroundColor: '#0d1927',
                  boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.5)',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(52, 152, 219, 0.7)',
                fontWeight: 400,
              },
              '& .MuiOutlinedInput-input': {
                color: 'rgba(236, 240, 241, 0.9)',
                fontWeight: 500,
                padding: isSmallMobile ? '10px 12px' : '12px 14px',
                '&::placeholder': {
                  color: 'rgba(52, 152, 219, 0.5)',
                  opacity: 1,
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#3498db',
              },
              marginBottom: '0.75rem',
            }}
          />
        </div>
        
        {filteredGameList && filteredGameList.length > 0 ? (
          <div className={styles.gameListWrapper}>
            {filteredGameList.map(game => (
              <div 
                key={game.id} 
                className={`${styles.gameListItem} 
                  ${game.disconnectedPlayers?.some(player => player.userId === userId) ? styles.userDisconnectedGame : ''}
                  ${game.allPlayers?.some(player => player.userId === userId && !player.disconnected) ? styles.userInGame : ''}`}
              >
                <div className={styles.gameListInfo}>
                  <div className={styles.gameListId}>
                    {game.id}
                    {game.disconnectedPlayers?.some(player => player.userId === userId) && (
                      <span className={styles.disconnectedBadge} title="You're disconnected from this game">⚠️ Reconnect</span>
                    )}
                    {game.allPlayers?.some(player => player.userId === userId && !player.disconnected) && (
                      <span className={styles.inGameBadge} title="You're in this game">You're In</span>
                    )}
                  </div>
                  <div className={styles.gameListPlayers}>
                    {game.playerCount} {game.playerCount === 1 ? 'player' : 'players'}
                  </div>
                </div>
                <button 
                  className={`${styles.joinGameButton} 
                    ${game.disconnectedPlayers?.some(player => player.userId === userId) ? styles.reconnectButton : ''}
                    ${game.allPlayers?.some(player => player.userId === userId && !player.disconnected) ? styles.continueButton : ''}`}
                  onClick={() => handleJoinGame(game.id)}
                  disabled={!user}
                >
                  {game.disconnectedPlayers?.some(player => player.userId === userId) 
                    ? 'Reconnect' 
                    : game.allPlayers?.some(player => player.userId === userId && !player.disconnected) 
                      ? 'Continue' 
                      : 'Join'}
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

// Create a wrapped version of the Lobby component with the LobbyProvider
const LobbyWithProvider = () => (
  <LobbyProvider>
    <Lobby />
  </LobbyProvider>
);

export default LobbyWithProvider;
