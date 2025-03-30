import React, { useState, useEffect } from 'react';
import styles from './styles/Lobby.module.css';
import { useLobby } from '../contexts/LobbyContext';
import { useAuth } from '../contexts/AuthContext';

const Lobby = () => {
  // Get state and actions from lobby and auth contexts
  const { lobbyState, createGame, joinGame } = useLobby();
  const { error, gameList } = lobbyState;
  const { user } = useAuth();
  const [gameIdInput, setGameIdInput] = useState('');
  
  const handleCreateGame = () => {
    createGame();
  };
  
  const handleJoinGame = () => {
    if (!gameIdInput.trim()) {
      // Don't try to join with an empty game ID
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
            Welcome, {user.username}!
          </div>
          
          <div className={styles.buttonGroup}>
            <button 
              className={`${styles.actionButton} ${styles.createButton}`}
              onClick={handleCreateGame}
              disabled={!playerName.trim()}
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
                  disabled={!playerName.trim()}
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
