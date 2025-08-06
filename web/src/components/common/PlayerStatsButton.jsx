import React, { useState, useEffect } from 'react';
import BarChartIcon from '../icons/BarChartIcon';
import PlayerStatsModal from '../PlayerStatsModal';
import IconButton from './IconButton';

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
        icon={<BarChartIcon color="white" size={20} />}
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
