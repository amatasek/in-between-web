import React, { useState } from 'react';
import styles from './styles/GameRulesButton.module.css';
import GameRulesModal from './GameRulesModal';

/**
 * A button component that opens a modal with game rules
 */
const GameRulesButton = () => {
  const [showRules, setShowRules] = useState(false);

  const openRules = () => {
    setShowRules(true);
  };

  const closeRules = () => {
    setShowRules(false);
  };

  return (
    <>
      <button 
        className={styles.rulesButton}
        onClick={openRules}
        title="View Game Rules"
      >
        Rules
      </button>
      
      {showRules && <GameRulesModal onClose={closeRules} />}
    </>
  );
};

export default GameRulesButton; 