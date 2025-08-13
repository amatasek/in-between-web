import React, { useRef, useEffect, useState, useMemo, useContext } from 'react';
import styles from './styles/PlayerList.module.css';
import { useGameContext } from '../contexts/GameContext';
import { useSocket } from '../contexts/SocketContext';
import CurrencyAmount from './common/CurrencyAmount';
import UserAvatar from './UserAvatar.jsx';
import { ICONS } from '../constants';
import UserDataContext from '../contexts/UserDataContext';

const PlayerList = () => {
  const { gameState } = useGameContext();
  const { socket } = useSocket();
  const userDataContext = useContext(UserDataContext);
  
  // Prefetch user data for all players when game state changes
  useEffect(() => {
    if (gameState?.players && userDataContext) {
      const userIds = Object.values(gameState.players).map(player => player.userId).filter(Boolean);
      if (userIds.length > 0) {
        userDataContext.prefetchUsers(userIds);
      }
    }
  }, [gameState?.players, userDataContext]);
  
  if (!gameState || !gameState.players) {
    return (
      <div className={styles.emptyPlayerList}>
        <p>Waiting for game data...</p>
      </div>
    );
  }
  
  const { players, currentPlayerId, gameTransactions = [] } = gameState;
  const currentUserId = socket?.auth?.userId;
  
  // Use server-side calculated totals
  const playerTotals = gameState.totals || {};
  if (!players || Object.keys(players).length === 0) {
    return (
      <div className={styles.emptyPlayerList}>
        <p>Waiting for players to join...</p>
      </div>
    );
  }

  
  return (
    <div className={styles.playersContainer}>
      <h3 className={styles.playersTitle}>Scoreboard</h3>
      
      <div className={styles.playersList}>
        {/* Use gameState.seats to render players in seat order */}
        {gameState.seats
          .filter(playerId => playerId !== null && players[playerId])
          .map(playerId => {
            const player = players[playerId];
            const isCurrentPlayer = playerId === currentPlayerId;
            // Compare player.userId with currentUserId instead of comparing playerId with currentUserId
            const isCurrentUser = player.userId === currentUserId;
            const isDisconnected = player.disconnected === true;
            
            return (
              <div 
                key={playerId} 
                className={`
                  ${isCurrentPlayer ? 'panel' : 'panel-alt'}
                  ${isCurrentPlayer ? styles.currentPlayerGlow : ''}
                  ${isCurrentUser ? styles.currentUser : ''}
                `}
                style={{
                  padding: '0.35rem 0.75rem',
                  gap: '0.5rem',
                  flexDirection: 'row',
                  fontSize: '0.9rem',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
              <div className={styles.playerInfo}>
                <UserAvatar 
                  userId={player.userId}
                  size="small" 
                  showName={true}
                  namePosition="right"
                />
                <span className={styles.playerStatus}>
                  {player.disconnected && <span className={styles.disconnectedIndicator} title="Player disconnected">⚠️ Disconnected</span>}
                </span>
              </div>
              <div className={styles.playerBalanceContainer}>
                <BalanceDisplay balance={playerTotals[playerId] || 0} />

                <div 
                  className={`
                    ${styles.readyIndicator} 
                    ${player.isSittingOut ? styles.sittingOut : (player.isReady ? styles.ready : styles.notReady)}
                  `}
                  title={player.isSittingOut ? 'Sitting Out' : (player.isReady ? 'Ready' : 'Not Ready')}
                >
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const BalanceDisplay = ({ balance }) => {
  const [prevBalance, setPrevBalance] = useState(balance);
  const [animationClass, setAnimationClass] = useState('');
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (balance !== prevBalance) {
      // Determine if balance increased or decreased
      const isIncrease = balance > prevBalance;
      setAnimationClass(isIncrease ? styles.balanceIncrease : styles.balanceDecrease);

      // Clear previous timeout if it exists
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Remove animation class after animation completes
      timeoutRef.current = setTimeout(() => {
        setAnimationClass('');
      }, 1000); // Match animation duration

      setPrevBalance(balance);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [balance]);

  return (
    <span className={`${styles.playerBalance} ${animationClass}`}>
      <CurrencyAmount amount={balance} />
    </span>
  );
};

export default PlayerList;
