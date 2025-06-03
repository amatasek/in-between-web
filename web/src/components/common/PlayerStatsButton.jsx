import React, { useState } from 'react';
import BarChartIcon from '../icons/BarChartIcon';
import PlayerStatsModal from '../PlayerStatsModal';
import IconButton from './IconButton';

const PlayerStatsButton = () => {
  const [isStatsOpen, setIsStatsOpen] = useState(false);

  const openStats = () => {
    setIsStatsOpen(true);
  };

  const closeStats = () => {
    setIsStatsOpen(false);
  };

  return (
    <>
      <IconButton
        onClick={openStats}
        icon={<BarChartIcon style={{ color: '#fff', width: 20, height: 20 }} />}
        aria-label="Open Player Stats"
        variant="stats"
        title="Player Stats"
      />
      {/* Render the modal conditionally */}
      {isStatsOpen && <PlayerStatsModal isOpen={isStatsOpen} onClose={closeStats} />}
    </>
  );
};

export default PlayerStatsButton;
