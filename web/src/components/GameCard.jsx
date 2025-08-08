import React from 'react';
import styles from './styles/Lobby.module.css'; // Use the new CSS module
import LockIcon from './icons/LockIcon'; // Import the new icon

function GameCard({ game, onJoin, userId }) { 
  // Determine display name: Use custom name if available, otherwise fallback to ID
  const gameDisplayName = game.settings?.customName || `Game ${game.id}`;

  // Determine user's status in this game
  const isUserDisconnected = game.disconnectedPlayers?.some(player => player.userId === userId);
  const isUserInGame = game.allPlayers?.some(player => player.userId === userId && !player.disconnected);

  // Determine button text
  let buttonText = 'Join';
  if (isUserDisconnected) {
    buttonText = 'Reconnect';
  } else if (isUserInGame) {
    buttonText = 'Continue';
  }

  // Determine card container class
  let cardClass = 'panel'; // Use global panel class
  if (isUserDisconnected) {
    cardClass += ` ${styles.userDisconnectedGame}`;
  } else if (isUserInGame) {
    cardClass += ` ${styles.userInGame}`;
  }

  return (
    <div className={cardClass} style={{ 
      marginBottom: '0.75rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'nowrap',
      fontSize: '1rem',
      padding: '0.75rem 1rem'
    }}> {/* Use panel + conditional */}
      {/* Replicate original info structure */}
      <div className={styles.gameListInfo} style={{ flex: 1 }}>
        <div className={styles.gameListId}> {/* Div for ID/Name + Badges */}
          {gameDisplayName}
          {game.settings?.isPrivate && (
            <span className={styles.privatePill} title="Private Game">
              <LockIcon width="0.9em" height="0.9em" style={{ marginRight: '4px', verticalAlign: 'middle' }} />
              Private
            </span>
          )}
          {isUserDisconnected && (
            <span className={styles.disconnectedBadge} title="You're disconnected from this game">⚠️ Reconnect</span>
          )}
          {isUserInGame && (
            <span className={styles.inGameBadge} title="You're in this game">You're In</span>
          )}
        </div>
        <div className={styles.gameListPlayers}> {/* Div for Player Count */}
          {game.playerCount} {game.playerCount === 1 ? 'player' : 'players'}
        </div>
      </div>
      {/* Button as sibling to gameListInfo */}
      <button 
        className="btn btn-primary"
        style={{ 
          padding: '0.4rem 1rem',
          fontSize: '0.9rem',
          minWidth: '80px',
          maxWidth: '100px',
          flexShrink: 0
        }}
        onClick={() => onJoin(game.id)}
        disabled={!userId}
        data-gamepad-focusable="true"
      >
        {buttonText} 
      </button>
    </div>
  );
}

export default GameCard;
