import { useEffect, useState } from 'react';
import styles from './styles/CardDisplay.module.css';
import { useGameContext } from '../contexts/GameContext';
import { getCurrentCardBackImage } from '../utils/cardBackManager';
import { ICONS } from '../constants';

const CardDisplay = () => {
  const { gameState } = useGameContext();
  const [cardBackImage, setCardBackImage] = useState(getCurrentCardBackImage());
  
  useEffect(() => {
    // Listen for card back changes
    const handleCardBackChange = () => {
      setCardBackImage(getCurrentCardBackImage());
    };
    
    window.addEventListener('cardbackchange', handleCardBackChange);
    return () => window.removeEventListener('cardbackchange', handleCardBackChange);
  }, []);
  
  if (!gameState) {
    return <div className={styles.loading}>Loading game state...</div>;
  }
  
  const {
    firstCard,
    secondCard,
    thirdCard,
    phase
  } = gameState;

  // Card state is managed by the game context
  const cardLabels = {
    '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9', '10': '10',
    'J': 'J', 'Q': 'Q', 'K': 'K', 'A': 'A'
  };
  
  // Map for handling both string names and direct symbols
  const suitSymbols = {
    'hearts': ICONS.HEARTS,
    'diamonds': ICONS.DIAMONDS,
    'clubs': ICONS.CLUBS,
    'spades': ICONS.SPADES,
    // Handle direct Unicode symbols as well
    [ICONS.HEARTS]: ICONS.HEARTS,
    [ICONS.DIAMONDS]: ICONS.DIAMONDS,
    [ICONS.CLUBS]: ICONS.CLUBS,
    [ICONS.SPADES]: ICONS.SPADES
  };
  
  // Helper to determine if a suit is red
  const isRedSuit = (suit) => {
    return suit === ICONS.HEARTS || suit === ICONS.DIAMONDS || suit === 'hearts' || suit === 'diamonds';
  };
  
  const renderCard = (card, index) => {
    if (!card) {return (
      <div key={`empty-${index}`} className={styles.card}>
        <div 
          className={styles.cardBack}
          style={{ backgroundImage: `url(${cardBackImage})` }}
        ></div>
      </div>
    );}
    
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
              <span className={styles.indicatorContent}>LOW {ICONS.ARROW_DOWN}</span>
            ) : (
              <span className={styles.indicatorContent}>HIGH {ICONS.ARROW_UP}</span>
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
    const displayCards = [null, null, null];
    
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
    <div className={`${styles.cardsRow} ${phase === 'dealing' ? styles.dealingPhase : ''} ${phase === 'revealing' ? styles.revealingPhase : ''}`}>
      {renderCardLayout()}
    </div>
  );
};

export default CardDisplay;
