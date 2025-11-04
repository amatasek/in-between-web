import { useEffect, useState } from 'react';
import IconButton from './IconButton';
import { BarChart3 } from 'lucide-react';
import PlayerStatsModal from '../PlayerStatsModal';

const PlayerStatsButton = ({ onModalStateChange, ...props }) => {
  const [isStatsOpen, setIsStatsOpen] = useState(false);

  const openStats = () => {
    setIsStatsOpen(true);
  };

  const closeStats = () => {
    setIsStatsOpen(false);
  };

  // Notify parent when modal state changes
  useEffect(() => {
    if (onModalStateChange) {
      onModalStateChange(isStatsOpen);
    }
  }, [isStatsOpen, onModalStateChange]);

  return (
    <>
      <IconButton
        onClick={openStats}
        icon={<BarChart3 size={20} style={{ color: 'white' }} />}
        aria-label="Open Player Stats"
        variant="stats"
        title="Player Stats"
        {...props}
      />
      {/* Render the modal conditionally */}
      {isStatsOpen && <PlayerStatsModal isOpen={isStatsOpen} onClose={closeStats} />}
    </>
  );
};

export default PlayerStatsButton;
