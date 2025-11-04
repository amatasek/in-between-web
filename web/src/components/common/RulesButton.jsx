import { useEffect, useState } from 'react';
import IconButton from './IconButton';
import { HelpCircle } from 'lucide-react';
import GameRulesModal from '../GameRulesModal';

/**
 * A standardized rules button component that opens the game rules modal
 * 
 * @param {Object} props Component props
 * @param {string} props.title Custom tooltip text (optional)
 * @param {function} props.onModalStateChange Callback when modal state changes
 */
const RulesButton = ({ 
  title = "View Game Rules",
  onModalStateChange,
  ...restProps 
}) => {
  const [showRules, setShowRules] = useState(false);

  const openRules = () => {
    setShowRules(true);
  };

  const closeRules = () => {
    setShowRules(false);
  };

  // Notify parent when modal state changes
  useEffect(() => {
    if (onModalStateChange) {
      onModalStateChange(showRules);
    }
  }, [showRules, onModalStateChange]);

  return (
    <>
      <IconButton
        icon={<HelpCircle size={20} style={{ color: 'white' }} />}
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
