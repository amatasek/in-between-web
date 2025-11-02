import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles/Lobby.module.css';
import { useLobby } from '../contexts/LobbyContext.jsx';
import { useAuth } from '../contexts/AuthContext';
import { useSocket } from '../contexts/SocketContext';
import { useGamepadNavigation } from '../hooks/useGamepadNavigation';
import AppHeader from './common/AppHeader';
import OnlinePlayerCount from './common/OnlinePlayerCount';
import GameCard from './GameCard';
import GameSettingsModal from './GameSettingsModal';
import GamepadInput from './GamepadInput';
import PlayerPanel from './PlayerPanel';
import soundService from '../services/SoundService';
import { getVersionInfo } from '../utils/version';
import { openInBrowser } from '../utils/openInBrowser';
import { WEB_URL } from '../config';

const Lobby = () => {
  const { gameList } = useLobby();
  const { user, logout } = useAuth();
  const { socket, isConnected } = useSocket();
  
  // Initialize gamepad navigation
  useGamepadNavigation(true);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showGameSettingsModal, setShowGameSettingsModal] = useState(false);
  const [versionInfo, setVersionInfo] = useState(null);

  const userId = user?.id || null;

  useEffect(() => {
    getVersionInfo().then(setVersionInfo);
  }, []);

  useEffect(() => {
    if (!user) {
      return;
    }

    if (!user.username || !user.id) {
      console.error('[Lobby] Invalid user data received:', user);
      logout(); // Clear invalid session
      
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
  
  const createGameWithSettings = (settings) => {
    if (!user?.id || !isConnected) {
      return;
    }

    const handleGameCreated = (data) => {
      socket.off('gameCreated', handleGameCreated);
      if (data?.game?.id) {
        navigate(`/${data.game.id}`);
      }
    };

    socket.on('gameCreated', handleGameCreated);
    
    if (settings) {
      socket.emit('createGame', { settings });
    } else {
      socket.emit('createGame');
    }
  };

  const handleCreateGame = () => createGameWithSettings({ numberOfBots: 5 });

  const handleCreateCustomGame = () => {
    setShowGameSettingsModal(true);
  };

  const handleSubmitCustomSettings = (settings) => {
    setShowGameSettingsModal(false);
    createGameWithSettings(settings);
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
     <div className={`screen app-gradient-bg ${styles.lobbyScreen}`}>
       <AppHeader />
       <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1.1em', marginBottom: '-0.6em' }}>
         <OnlinePlayerCount />
       </div>       

       <div className="card" style={{ width: '100%', maxWidth: '600px', marginBottom: '2rem' }}>
         <PlayerPanel />
         <div className="divider"></div>
         <div className={styles.gameActionsSection}>
           <button 
             className="btn btn-primary"
             onClick={handleCreateGame}
             disabled={!user?.username}
             data-gamepad-focusable="true"
           >
             Create Quick Game
           </button>
           <button
             className="btn btn-primary"
             onClick={handleCreateCustomGame}
             disabled={!user?.username}
             data-gamepad-focusable="true"
           >
             Create Custom Game
           </button>
         </div>
       </div>
       
       <div 
         className="card" 
         style={{width: '100%', maxWidth: '600px', minHeight: '200px'}}
       >
         <h2 className={styles.gameListTitle}>Available Games</h2>
         
         {/* Search bar for filtering games */}
         <div className={styles.searchContainer}>
           <div className="input-with-icon">
             <span className="input-icon left">🔍</span>
             <GamepadInput
               title="Search Games"
               type="search"
               className="no-validation"
               placeholder="Search games by ID"
               value={searchQuery}
               onChange={handleSearchChange}
             />
           </div>
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
           <div className="panel-alt" style={{ 
             textAlign: 'center', 
             padding: '2rem',
             minHeight: '150px',
             display: 'flex',
             flexDirection: 'column',
             alignItems: 'center',
             justifyContent: 'center'
           }}>
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
       
       {showGameSettingsModal && (
         <GameSettingsModal
           onSubmit={handleSubmitCustomSettings}
           onClose={() => setShowGameSettingsModal(false)}
         />
       )}

       {versionInfo && (
         <div className={styles.versionInfo}>
           <div className={styles.legalLinks}>
             <button onClick={() => openInBrowser(`${WEB_URL}/terms`)} className={styles.legalLink}>Terms of Service</button>
             <span className={styles.legalDivider}>•</span>
             <button onClick={() => openInBrowser(`${WEB_URL}/privacy`)} className={styles.legalLink}>Privacy Policy</button>
           </div>
           <div>{versionInfo.display}</div>
         </div>
       )}
     </div>
   );
 };

 export default Lobby;
