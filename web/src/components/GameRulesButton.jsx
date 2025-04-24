import React, { useState } from 'react';
import styles from './styles/GameRulesButton.module.css';
import GameRulesModal from './GameRulesModal';
import QuestionIcon from './icons/QuestionIcon';

/**
 * A button component that opens a modal with game rules
 * @param {Object} props Component props
 * @param {boolean} props.compact If true, displays just an icon instead of text
 */
const GameRulesButton = ({ compact = false }) => {
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
        className={`${styles.rulesButton} ${compact ? styles.compactButton : ''}`}
        onClick={openRules}
        title="View Game Rules"
      >
        {compact ? <QuestionIcon color="white" size={20} /> : 'Rules'}
      </button>
      
      {showRules && <GameRulesModal onClose={closeRules} />}
    </>
  );
};

export default GameRulesButton;