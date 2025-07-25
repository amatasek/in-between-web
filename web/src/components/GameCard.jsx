import React from 'react';
import styles from './styles/Lobby.module.css'; // Use the new CSS module
import LockIcon from './icons/LockIcon'; // Import the new icon

function GameCard({ game, onJoin, userId }) { 
  // Determine display name: Use custom name if available, otherwise fallback to ID
  const gameDisplayName = game.settings?.customName || `Game ${game.id}`;

  // Determine user's status in this game
  const isUserDisconnected = game.disconnectedPlayers?.some(player => player.userId === userId);
  const isUserInGame = game.allPlayers?.some(player => player.userId === userId && !player.disconnected);

  // Determine button text and class
  let buttonText = 'Join';
  let buttonClass = styles.joinGameButton; // Base class from original
  if (isUserDisconnected) {
    buttonText = 'Reconnect';
    buttonClass += ` ${styles.reconnectButton}`;
  } else if (isUserInGame) {
    buttonText = 'Continue';
    buttonClass += ` ${styles.continueButton}`;
  }

  // Determine card container class
  let cardClass = styles.gameListItem; // Use original outer class
  if (isUserDisconnected) {
    cardClass += ` ${styles.userDisconnectedGame}`;
  } else if (isUserInGame) {
    cardClass += ` ${styles.userInGame}`;
  }

  return (
    <div className={cardClass}> {/* Use gameListItem + conditional */}
      {/* Replicate original info structure */}
      <div className={styles.gameListInfo}>
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
        className={buttonClass} // Use joinGameButton + conditional
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
