import React from 'react';
import styles from './styles/CardDisplay.module.css';
import { useGameContext } from '../contexts/GameContext';

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
    remainingCards, 
    dealerChanged, 
    dealer,
    deckNumber 
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
    
    return (
      <div key={`${card.value}-${card.suit}`} 
        className={`${styles.card} ${isRed ? styles.redCard : styles.blackCard}`}
      >
        <div className={styles.cardCorner}>
          <div className={styles.cardValue}>{cardLabels[card.value]}</div>
          <div className={styles.cardSuit}>{suitSymbols[card.suit]}</div>
        </div>
        <div className={styles.cardCenter}>{suitSymbols[card.suit]}</div>
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
    
    // Handle the individual card properties
    if (firstCard) {
      displayCards[0] = firstCard; // Left position
    }
    
    if (secondCard) {
      displayCards[2] = secondCard; // Right position
    }
    
    if (thirdCard) {
      displayCards[1] = thirdCard; // Middle position
    }
    
    return displayCards.map((card, index) => renderCard(card, index));
  };

  return (
    <div className={styles.cardDisplayContainer}>
      {dealerChanged && (
        <div className={styles.dealerRotationAlert}>
          <p>
            <span className={styles.dealerIcon}>🃏</span>
            <span className={styles.dealerRotationText}>
              {dealerName} is now the dealer (Deck #{deckNumber})!
            </span>
          </p>
        </div>
      )}
      
      
      <div className={`${styles.cardsRow} ${phase === 'dealing' ? styles.dealingPhase : ''} ${phase === 'revealing' ? styles.revealingPhase : ''}`}>
        {renderCardLayout()}
      </div>
    </div>
  );
};

export default CardDisplay;
