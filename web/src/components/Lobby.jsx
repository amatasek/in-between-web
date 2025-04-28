import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles/Lobby.module.css';
import { useLobby } from '../contexts/LobbyContext.jsx';
import { useAuth } from '../contexts/AuthContext';
import { useSocket } from '../contexts/SocketContext';
import { usePreferences } from '../contexts/PreferencesContext';
import { TextField, useMediaQuery, InputAdornment } from '@mui/material';
import AppHeader from './common/AppHeader';
import CurrencyAmount from './common/CurrencyAmount';
import PreferencesButton from './common/PreferencesButton.jsx';
import UserAvatar from './UserAvatar.jsx';
import soundService from '../services/SoundService';

const Lobby = () => {
  const navigate = useNavigate();
  const { gameList, loading: lobbyLoading, error: lobbyError } = useLobby(); // Assuming lobby context handles its own loading
  const { user, logout, loading: authLoading, refreshUserData } = useAuth();
  const { socket, isConnected, loading: socketLoading } = useSocket();
  const { preferences } = usePreferences();
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null); // Local error state for lobby actions

  const isMobile = useMediaQuery('(max-width:600px)');
  const isSmallMobile = useMediaQuery('(max-width:400px)');
  
  const userId = user?.username ? `user_${user.username}` : null;

  // Refresh user data (including balance) on lobby mount/reconnect
  useEffect(() => {
    // Effect runs on mount and when isConnected changes.
    // We just need to ensure refreshUserData is available from the context.
    if (refreshUserData) {
      refreshUserData();
    }
  }, [isConnected, refreshUserData]);

  useEffect(() => {
    if (!user) {
      setError('Please log in to continue');
      return;
    }

    if (!user.username || !user.id) {
      console.error('[Lobby] Invalid user data received:', user);
      setError('Invalid user data');
      logout(); // Clear invalid session
      return;
    }

    if (!isConnected) {
      setError('Not connected to server. Attempting to reconnect...');
    } else {
      setError(null);
    }
  }, [user, logout, isConnected]);
  
  const handleCreateGame = () => {
    if (!user?.id) {
      setError('Please log in to create a game');
      return;
    }
    
    if (!isConnected) {
      setError('Not connected to server');
      return;
    }
    
    setError(null);
    soundService.play('ui.join');
    
    const creationTimeout = setTimeout(() => {
      setError('Game creation timed out. Please try again.');
    }, 5000); // 5 seconds
    
    const handleGameCreated = (data) => {
      clearTimeout(creationTimeout); // Stop the timeout
      socket.off('gameJoined', handleGameCreated); // Clean up listener
      if (data?.game?.id) {
        setTimeout(() => {
          navigate(`/${data.game.id}`);
        }, 100);
      } else {
        setError('Failed to create or join game. Invalid response.');
      }
    };
    
    socket.on('gameJoined', handleGameCreated);
    
    socket.emit('createGame');
  };
  
  const handleJoinGame = (gameId) => {
    if (!isConnected) {
      setError('Not connected to server.');
      return;
    }
    if (!user) {
      setError('Please log in to join a game.');
      return;
    }

    setError(null);
    soundService.play('ui.click'); // Play join sound

    socket.emit('joinGame', { gameId });

    navigate(`/${gameId}`);
  };
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const filteredGameList = useMemo(() => {
    if (!gameList) return [];
    
    let filtered = gameList;
    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      filtered = gameList.filter(game => 
        game.id.toLowerCase().includes(query)
      );
    }
    
    return filtered.sort((a, b) => {
      const userInGameA = a.allPlayers?.some(player => player.userId === userId);
      const userInGameB = b.allPlayers?.some(player => player.userId === userId);
      
      const userDisconnectedInA = a.disconnectedPlayers?.some(player => player.userId === userId);
      const userDisconnectedInB = b.disconnectedPlayers?.some(player => player.userId === userId);
      
      if (userDisconnectedInA && !userDisconnectedInB) return -1;
      if (!userDisconnectedInA && userDisconnectedInB) return 1;
      if (userInGameA && !userInGameB) return -1;
      if (!userInGameA && userInGameB) return 1;
      return a.id.localeCompare(b.id); // Alphabetical by ID if tie
    });
  }, [gameList, searchQuery, userId]); // Dependency on userId ensures resorting if user changes
  
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
                 <button 
                   className={styles.logoutButton}
                   onClick={logout}
                 >
                   <span className={styles.buttonText}>Logout</span>
                 </button>
                 <PreferencesButton />
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

 export default Lobby;
