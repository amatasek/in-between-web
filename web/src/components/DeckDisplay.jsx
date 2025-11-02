import styles from './styles/DeckDisplay.module.css';
import { useGameContext } from '../contexts/GameContext';
import { ICONS } from '../constants';

const DeckDisplay = () => {
  const { gameState } = useGameContext();
  
  if (!gameState) return null;
  
  // Get the deck size and deck count from the game state
  const { deckSize = 0, deckCount = 1 } = gameState;
  
  return (
    <div className="card" style={{ 
      width: '150px', 
      padding: '0.75rem 1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '0.5rem',
      border: '2px solid var(--accent2)'
    }}>
      <div className={styles.deckVisual}>
        <div className={styles.deckIcon}>{ICONS.DECK}</div>
      </div>
      <div className={styles.deckInfo}>
        <h3 className={styles.deckLabel}>
          DECK <span className={styles.deckCounter}>({deckCount})</span>
        </h3>
        <span className={styles.deckCount}>{deckSize}</span>
      </div>
    </div>
  );
};

export default DeckDisplay;
