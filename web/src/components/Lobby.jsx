import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles/Lobby.module.css';
import { useLobby } from '../contexts/LobbyContext.jsx';
import { useAuth } from '../contexts/AuthContext';
import { useSocket } from '../contexts/SocketContext';
import { useGamepadNavigation } from '../hooks/useGamepadNavigation';
import { useMediaQuery, InputAdornment } from '@mui/material';
import GamepadTextField from './GamepadTextField';
import AppHeader from './common/AppHeader';
import OnlinePlayerCount from './common/OnlinePlayerCount';
import PlayerPanel from './PlayerPanel.jsx';
import GameCard from './GameCard';
import { useUserData } from '../contexts/UserDataContext';
import soundService from '../services/SoundService';

const Lobby = () => {
  const { gameList, loading: lobbyLoading } = useLobby();
  const { user, logout } = useAuth();
  const userData = useUserData(user?.id);
  const { isConnected } = useSocket();
  
  // Initialize gamepad navigation
  const { isGamepadConnected } = useGamepadNavigation(true);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const isMobile = useMediaQuery('(max-width:600px)');
  const isSmallMobile = useMediaQuery('(max-width:400px)');
  
  const userId = user?.username ? `user_${user.username}` : null;

  useEffect(() => {
    if (!user) {
      return;
    }

    if (!user.username || !user.id) {
      console.error('[Lobby] Invalid user data received:', user);
      logout(); // Clear invalid session
      return;
    }
  }, [user, logout]);
  
  const handleJoinGame = (gameId) => {
    if (!isConnected || !user) {
      return;
    }

    soundService.play('ui.click'); // Play join sound
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
       <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1.1em', marginBottom: '-0.6em' }}>
         <OnlinePlayerCount />
       </div>       
       <PlayerPanel />
       
       {/* Game List Section - Always shown */}
       <div className={styles.gameListContainer}>
         <h2 className={styles.gameListTitle}>Available Games</h2>
         
         {/* Search bar for filtering games */}
         <div className={styles.searchContainer}>
           <GamepadTextField
             title="Search Games"
             placeholder="Search games by ID"
             variant="outlined"
             fullWidth
             value={searchQuery}
             onChange={handleSearchChange}
             size={isSmallMobile ? "small" : "medium"}
             type="text"
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
               <GameCard 
                 key={game.id} 
                 game={game} 
                 onJoin={handleJoinGame} 
                 userId={userId} // Pass userId
               />
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
