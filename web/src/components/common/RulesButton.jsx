import React, { useState } from 'react';
import IconButton from './IconButton';
import QuestionIcon from '../icons/QuestionIcon';
import GameRulesModal from '../GameRulesModal';

/**
 * A standardized rules button component that opens the game rules modal
 * 
 * @param {Object} props Component props
 * @param {string} props.title Custom tooltip text (optional)
 */
const RulesButton = ({ 
  title = "View Game Rules",
  ...restProps 
}) => {
  const [showRules, setShowRules] = useState(false);

  const openRules = () => {
    setShowRules(true);
  };

  const closeRules = () => {
    setShowRules(false);
  };

  return (
    <>
      <IconButton
        icon={<QuestionIcon color="white" size={20} />}
        title={title}
        onClick={openRules}
        variant="default"
        {...restProps}
      />
      
      {showRules && <GameRulesModal onClose={closeRules} />}
    </>
  );
};

export default RulesButton;
