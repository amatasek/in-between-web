import React, { useState, useEffect } from 'react';
import styles from './styles/Lobby.module.css';
import { useLobby } from '../contexts/LobbyContext';
import { useAuth } from '../contexts/AuthContext';

const Lobby = () => {
  // Get state and actions from lobby and auth contexts
  const { lobbyState, createGame, joinGame } = useLobby();
  const { error: lobbyError, gameList } = lobbyState;
  const { user, logout } = useAuth();
  const [gameIdInput, setGameIdInput] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      // Check if user exists and has required properties
      if (!user) {
        console.log('[Lobby] No user data found');
        setError('Please log in to continue');
        return;
      }

      if (!user.username || !user.id) {
        console.error('[Lobby] Invalid user data:', user);
        setError('Invalid user data');
        logout(); // Clear invalid session
        return;
      }

      console.log('[Lobby] Current user state:', {
        username: user.username,
        id: user.id
      });

      setError(null);
    } catch (err) {
      console.error('[Lobby] Error processing user data:', err);
      setError('Error loading user data');
      logout(); // Clear potentially corrupted session
    }
  }, [user, logout]);
  
  const handleCreateGame = () => {
    if (!user?.id) {
      setError('Please log in to create a game');
      return;
    }
    
    // Create game directly - username will be handled by the server
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
    joinGame(gameIdInput);
  };
  
  const handleGameIdChange = (e) => {
    setGameIdInput(e.target.value);
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleJoinGame();
    }
  };
  
  return (
    <div className={styles.lobbyContainer}>
      <div className={styles.logoContainer}>
        <h1 className={styles.gameTitle}>In Between</h1>
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
