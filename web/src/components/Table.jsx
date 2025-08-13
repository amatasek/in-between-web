import React from 'react';
import styles from './styles/Table.module.css';
import { useGameContext } from '../contexts/GameContext';
import { useSocket } from '../contexts/SocketContext';
import { useAuth } from '../contexts/AuthContext';
import CardDisplay from './CardDisplay';
import PotDisplay from './PotDisplay';
import AceChoiceOverlay from './AceChoiceOverlay';
import BettingOverlay from './BettingOverlay';
import SecondChanceOverlay from './SecondChanceOverlay';
import ResultsOverlay from './ResultsOverlay';
import AnteControls from './AnteControls';
import ImBackButton from './ImBackButton';

const Table = () => {
  const { gameState } = useGameContext();
  const { socket } = useSocket();
  const { user } = useAuth();
  
  if (!gameState) return null;
  
  const { 
    phase, 
    currentPlayerId, 
    players,
    waitingForAceDecision,
    waitingForSecondChance,
    firstCard,
    secondCard,
    result
  } = gameState;
  
  // Find current user's player object
  const currentUserId = user?.id;
  const currentUserPlayer = players && currentUserId ? players[currentUserId] : null;
  const isCurrentPlayersTurn = currentUserId === currentPlayerId;
  const isSittingOut = currentUserPlayer?.isSittingOut || false;
  
  // Handler for the 'I'm Back' button
  const handleImBackClick = () => {
    if (socket && gameState.id) {
      socket.emit('imBack', { gameId: gameState.id });
    }
  };
  
  return (
    <div className={styles.table}>
      {/* Felt texture overlay */}
      <div className={styles.feltTexture} />
      
      {/* Pot display */}
      <PotDisplay />
      
      {/* Cards display */}
      <CardDisplay />
      
      {/* Ace glow effect when waiting for decision */}
      {waitingForAceDecision && (
        <div className={styles.aceGlowEffect} />
      )}
      
      {/* Second chance match indicator only */}
      {waitingForSecondChance && (
        <SecondChanceOverlay 
          firstCard={firstCard}
          secondCard={secondCard}
          isCurrentPlayersTurn={isCurrentPlayersTurn}
          indicatorOnly={true}
        />
      )}
      
      {/* Bottom controls area - only show if not sitting out */}
      {!isSittingOut && (
        <>
          {/* Betting controls */}
          {phase === 'betting' && !waitingForAceDecision && !waitingForSecondChance && (
            <BettingOverlay isCurrentPlayersTurn={isCurrentPlayersTurn} />
          )}
          
          {/* Ace choice controls at bottom */}
          {waitingForAceDecision && (
            <AceChoiceOverlay 
              card={firstCard} 
              isCurrentPlayersTurn={isCurrentPlayersTurn}
              bottomPosition={true}
            />
          )}
          
          {/* Second chance controls at bottom */}
          {waitingForSecondChance && (
            <SecondChanceOverlay 
              firstCard={firstCard}
              secondCard={secondCard}
              isCurrentPlayersTurn={isCurrentPlayersTurn}
              bottomPosition={true}
            />
          )}
        </>
      )}
      
      {/* Results overlay fills entire table - show even when sitting out */}
      {phase === 'results' && result && !isSittingOut && (
        <ResultsOverlay result={result} players={players} />
      )}
      
      {/* Waiting/Ante phase - show AnteControls only if not sitting out */}
      {phase === 'waiting' && !isSittingOut && (
        <AnteControls />
      )}
      
      {/* I'm Back button overlay when sitting out */}
      {isSittingOut && (
        <div className={styles.sitOutOverlay}>
          <ImBackButton onClick={handleImBackClick} />
        </div>
      )}
    </div>
  );
};

export default Table;