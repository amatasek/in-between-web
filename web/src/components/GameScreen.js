import React from 'react';
import styles from './styles/GameScreen.module.css';
import GameHeader from './GameHeader';
import CardDisplay from './CardDisplay';
import BettingPanel from './BettingPanel';
import PotDisplay from './PotDisplay';
import AnteControls from './AnteControls';
import ResultsPanel from './ResultsPanel';
import AceChoicePanel from './AceChoicePanel';
import SecondChancePanel from './SecondChancePanel';
import UserAvatar from './UserAvatar';
import CurrencyAmount from './common/CurrencyAmount';
import { ICONS } from '../constants/UIConstants';

import { useGameContext } from '../contexts/GameContext';
import { useSocket } from '../contexts/SocketContext';

const MAX_PLAYER_SPOTS = 7;

const GameScreen = ({ onReturnToLobby }) => {
  const { 
    gameState,
    error,
    clearError
  } = useGameContext();
  
  const { socket } = useSocket();
  
  const handleLeaveGame = () => {
    if (onReturnToLobby) {
      onReturnToLobby();
    }
  };
  
  if (!gameState) {
    return (
      <div className={styles.loadingContainer}>
        <p>Loading game state...</p>
      </div>
    );
  }
  
  const phase = gameState.phase || 'waiting';
  const players = gameState.players || {};
  const currentPlayerId = gameState.currentPlayerId;
  const dealerId = gameState.dealerId;
  const currentUserId = socket?.id;
  const playerIds = Object.keys(players);
  const numPlayers = playerIds.length;
  const totalSpotsForLayout = 7;

  // --- Linear Layout Calculation Parameters --- 
  const tableWidth = 1000; 
  const tableHeight = 600; 
  const spotWidth = 120;
  const spotHeight = 120;
  const spotGap = 15; // Gap between spots
  const bottomPadding = 20; // Distance from table bottom edge

  // Calculate total width needed for all spots and gaps
  const totalSpotsWidth = (totalSpotsForLayout * spotWidth) + ((totalSpotsForLayout - 1) * spotGap);
  // Calculate starting X position to center the line
  const startX = (tableWidth - totalSpotsWidth) / 2;
  // Calculate fixed Y position near the bottom
  const fixedY = tableHeight - spotHeight - bottomPadding;

  // Function to get spot style
  const getPlayerSpotStyle = (index) => {
    // Calculate the left position for this spot
    const x = startX + index * (spotWidth + spotGap);
    const y = fixedY;
    
    return {
      position: 'absolute',
      left: `${x}px`,
      top: `${y}px`, 
    };
  };

  // --- End Linear Layout Calculation ---

  return (
    <div className={styles.gameContainer}>
      <GameHeader handleLeaveGame={handleLeaveGame} />
      
      {error && (
        <div className={styles.errorContainer}>
          <p className={styles.errorText}>{error}</p>
        </div>
      )}
        
      <div className={styles.gameTable}>
        
        <div className={styles.dealerArea}>
          <div className={styles.dealerImagePlaceholder}>
            <span role="img" aria-label="dealer icon" style={{fontSize: '3rem'}}>💄</span> 
          </div>
        </div>

        <div className={styles.centerArea}>
          <div className={styles.potDisplayWrapper}>
            <PotDisplay />
          </div>
          
          <CardDisplay />
          
          <div className={styles.actionPanelContainer}>
            {phase === 'waiting' && <AnteControls />}
            {phase === 'results' && <ResultsPanel />}
            {phase !== 'waiting' && phase !== 'results' && <BettingPanel />}
            <AceChoicePanel />
            <SecondChancePanel />
          </div>
        </div>

        <div className={styles.playerSpotsContainer}>
          {playerIds.map((playerId, index) => {
            const player = players[playerId];
            if (!player) return null;

            const isCurrentPlayer = player.id === currentPlayerId;
            const isCurrentUser = player.id === currentUserId;
            const isDealer = player.id === dealerId;
            const spotStyle = getPlayerSpotStyle(index);

            return (
              <div 
                key={player.id} 
                className={`
                  ${styles.playerSpot} 
                  ${isCurrentPlayer ? styles.currentPlayerSpot : ''}
                  ${isCurrentUser ? styles.currentUserSpot : ''}
                `}
                style={spotStyle}
              >
                <div className={styles.playerSpotContent}>
                  <div className={styles.playerSpotInfo}>
                    <UserAvatar 
                      user={{ username: player.name, profileImg: player.mediaPreferences?.profileImg }} 
                      size="small" 
                      showName={false}
                    />
                    <span className={styles.playerName}>{player.name}</span>
                    {isCurrentUser && <span className={styles.youIndicator}> (You)</span>}
                     {isDealer && <span className={styles.dealerIndicator}> {ICONS.DEALER}</span>}
                  </div>
                  <div className={styles.chipStack}>
                    <div className={styles.chipVisual}>
                      <div className={styles.chip}></div>
                      <div className={styles.chip}></div>
                      <div className={styles.chip}></div>
                    </div>
                    <CurrencyAmount amount={Number(player.balance || 0)} size="small" background="dark"/>
                  </div>
                   <div className={`${styles.readyIndicator} ${player.isReady ? styles.ready : styles.notReady}`}></div>
                </div>
              </div>
            );
          })}
          {[...Array(Math.max(0, totalSpotsForLayout - numPlayers))].map((_, i) => {
              const index = numPlayers + i;
              // Ensure empty spots use the same calculation logic
              const spotStyle = getPlayerSpotStyle(index); 
              return (
                <div 
                  key={`empty-${i}`} 
                  className={`${styles.playerSpot} ${styles.emptySpot}`}
                  style={spotStyle}
                >
                </div>
              )
          })}
        </div>

      </div> 
    </div>
  );
};

export default GameScreen;
