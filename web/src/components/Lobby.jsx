import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './styles/Lobby.module.css';
import { useLobby } from '../contexts/LobbyContext.jsx';
import { useAuth } from '../contexts/AuthContext';
import { useSocket } from '../contexts/SocketContext';
import { useGamepadNavigation } from '../hooks/useGamepadNavigation';
import AppHeader from './common/AppHeader';
import OnlinePlayerCount from './common/OnlinePlayerCount';
import Footer from './common/Footer';
import GameCard from './GameCard';
import GameSettingsModal from './GameSettingsModal';
import GamepadInput from './common/GamepadInput';
import PlayerPanel from './PlayerPanel';
import AdBanner from './AdBanner';
import AdSideBanner from './AdSideBanner';
import AdInterstitial from './AdInterstitial';
import { useAdInterstitial } from '../hooks/useAdInterstitial';
import soundService from '../services/SoundService';
import { Search } from 'lucide-react';
const Lobby = () => {
  const { gameList } = useLobby();
  const { user, logout } = useAuth();
  const { socket, isConnected } = useSocket();
  const location = useLocation();

  useGamepadNavigation(true);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showGameSettingsModal, setShowGameSettingsModal] = useState(false);
  const { shouldShowAd, showAd, hideAd } = useAdInterstitial();
  const showAds = !user?.subscription?.isPremium;

  const userId = user?.id || null;

  useEffect(() => {
    if (location.state?.fromGame) {
      showAd();
    }
  }, [location.state, showAd]);

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
     <div className={`screen app-gradient-bg ${styles.lobbyScreen} ${showAds ? styles.withAds : ''}`}>
       <AppHeader />
       <div className={styles.onlineCountWrapper}>
         <OnlinePlayerCount />
       </div>

       <div className={styles.playerSection}>
         <PlayerPanel />
       </div>

       <div className={styles.gameActionsSection}>
         <button type="button"
           className="btn btn-primary"
           onClick={handleCreateGame}
           disabled={!user?.username}
           data-gamepad-focusable="true"
         >
           Create Quick Game
         </button>
         <button type="button"
           className="btn btn-primary"
           onClick={handleCreateCustomGame}
           disabled={!user?.username}
           data-gamepad-focusable="true"
         >
           Create Custom Game
         </button>
       </div>

       <div className={`panel-frost ${styles.gameListSection}`}>
         <h2 className={styles.gameListTitle}>Available Games</h2>

         {/* Search bar for filtering games */}
         <div className={styles.searchContainer}>
           <div className="input-with-icon">
             <span className="input-icon left" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Search size={18} strokeWidth={2.5} />
            </span>
             <GamepadInput
               title="Search Games"
               type="search"
               className="no-validation"
               placeholder="Search available games"
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
                 userId={userId}
               />
             ))}
           </div>
         ) : (
           <p className={styles.emptyStateMessage}>
             {searchQuery.trim() ? 'No games found' : 'No games available'}
           </p>
         )}
       </div>

       {showGameSettingsModal && (
         <GameSettingsModal
           onSubmit={handleSubmitCustomSettings}
           onClose={() => setShowGameSettingsModal(false)}
         />
       )}

       <Footer />

       {shouldShowAd && <AdInterstitial onClose={hideAd} />}
       <AdBanner hideAtWidth={1000} />
       <AdSideBanner position="left" />
       <AdSideBanner position="right" />
     </div>
   );
 };

 export default Lobby;
