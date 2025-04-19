import React from 'react';
import styles from './styles/CardDisplay.module.css';
import { useGameContext } from '../contexts/GameContext';
import ArrowIcon from './icons/ArrowIcon';

const CardDisplay = () => {
  const { gameState } = useGameContext();
  
  if (!gameState) {
    return <div className={styles.loading}>Loading game state...</div>;
  }
  
  const { 
    firstCard,
    secondCard,
    thirdCard,
    phase,
    dealer
  } = gameState;
  
  // Card state is managed by the game context
  
  const dealerName = dealer?.name;
  const cardLabels = {
    '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9', '10': '10',
    'J': 'J', 'Q': 'Q', 'K': 'K', 'A': 'A'
  };
  
  // Map for handling both string names and direct symbols
  const suitSymbols = {
    'hearts': '♥',
    'diamonds': '♦',
    'clubs': '♣',
    'spades': '♠',
    // Handle direct Unicode symbols as well
    '♥': '♥',
    '♦': '♦',
    '♣': '♣',
    '♠': '♠'
  };
  
  // Helper to determine if a suit is red
  const isRedSuit = (suit) => {
    return suit === '♥' || suit === '♦' || suit === 'hearts' || suit === 'diamonds';
  };
  
  const renderCard = (card, index) => {
    if (!card) return (
      <div key={`empty-${index}`} className={styles.card}>
        <div className={styles.cardBack}></div>
      </div>
    );
    
    const isRed = isRedSuit(card.suit);
    const isAce = card.value === 'A';
    const isAceLow = card.isAceLow;
    const isMiddleCard = index === 1; // Index 1 is the middle card position
    
    return (
      <div key={`${card.value}-${card.suit}-${index}`} 
        className={`${styles.card} ${isRed ? styles.redCard : styles.blackCard} ${isAce ? styles.aceCard : ''}`}
      >
        {isAce && !isMiddleCard && (
          <div className={`${styles.aceIndicator} ${isAceLow ? styles.aceLow : styles.aceHigh} ${isRed ? styles.redCard : styles.blackCard}`}>
            {isAceLow ? (
              <span className={styles.indicatorContent}>LOW <ArrowIcon direction="down" color={isRed ? '#e74c3c' : '#2c3e50'} size={16} /></span>
            ) : (
              <span className={styles.indicatorContent}>HIGH <ArrowIcon direction="up" color={isRed ? '#e74c3c' : '#2c3e50'} size={16} /></span>
            )}
          </div>
        )}
        <div className={styles.cardCorner}>
          <div className={styles.cardValue}>{cardLabels[card.value]}</div>
          <div className={styles.cardSuit}>{suitSymbols[card.suit]}</div>
        </div>
        <div className={styles.cardCenter}>
          {suitSymbols[card.suit]}
        </div>
        <div className={`${styles.cardCorner} ${styles.bottomRight}`}>
          <div className={styles.cardValue}>{cardLabels[card.value]}</div>
          <div className={styles.cardSuit}>{suitSymbols[card.suit]}</div>
        </div>
      </div>
    );
  };
  
  // Function to handle card positioning 
  const renderCardLayout = () => {
    // Create an array of 3 nulls to represent the card slots
    let displayCards = [null, null, null];
    
    // Check if we have a valid game state with cards
    if (!firstCard && !secondCard && !thirdCard) {
      return displayCards.map((card, index) => renderCard(card, index));
    }
    
    // Handle the individual card properties
    if (firstCard) {
      displayCards[0] = {...firstCard}; // Left position - use spread operator to create a copy
    }
    
    if (secondCard) {
      displayCards[2] = {...secondCard}; // Right position - use spread operator to create a copy
    }
    
    if (thirdCard) {
      displayCards[1] = {...thirdCard}; // Middle position - use spread operator to create a copy
    }
    
    return displayCards.map((card, index) => renderCard(card, index));
  };

  return (
    <div className={styles.cardDisplayContainer}>
      <div className={`${styles.cardsRow} ${phase === 'dealing' ? styles.dealingPhase : ''} ${phase === 'revealing' ? styles.revealingPhase : ''}`}>
        {renderCardLayout()}
      </div>
    </div>
  );
};

export default CardDisplay;
