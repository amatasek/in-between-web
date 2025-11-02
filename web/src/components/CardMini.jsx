import styles from './styles/CardMini.module.css';
import { ICONS } from '../constants';

const CardMini = ({ card }) => {
  if (!card) {
    return <div className={styles.cardPlaceholder}>?</div>;
  }

  const getSuitIcon = (suit) => {
    switch (suit) {
      case 'hearts': 
      case '♥': return ICONS.HEARTS;
      case 'diamonds': 
      case '♦': return ICONS.DIAMONDS;
      case 'clubs': 
      case '♣': return ICONS.CLUBS;
      case 'spades': 
      case '♠': return ICONS.SPADES;
      default: return suit || '';
    }
  };

  // Handle card data format from backend
  const rank = card.value || '?';
  const suit = card.suit || '?';
  const isRed = suit === '♥' || suit === '♦' || suit === 'hearts' || suit === 'diamonds';
  
  // Determine if this is an Ace and if it's high or low
  const isAce = rank === 'A';
  const isLowAce = card.isAceLow === true;
  const isHighAce = isAce && !isLowAce;

  return (
    <div className={`${styles.cardMini} ${isRed ? styles.red : styles.black}`}>
      <span className={styles.rank}>
        {rank}
        {isAce && (isHighAce ? (
          <span className={styles.aceIndicator}>↑</span>
        ) : isLowAce ? (
          <span className={styles.aceIndicator}>↓</span>
        ) : null)}
      </span>
      <span className={styles.suit}>{getSuitIcon(suit)}</span>
    </div>
  );
};

export default CardMini;