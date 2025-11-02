import { useEffect, useState } from 'react';
import styles from './styles/GameLog.module.css';
import { useGameContext } from '../contexts/GameContext';
import RoundDivider from './RoundDivider';
import TurnSummaryPanel from './TurnSummaryPanel';

const GameLog = () => {
  const { gameState } = useGameContext();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  if (!gameState || !gameState.gameLog) return null;
  
  // Get the game log entries
  const logEntries = gameState.gameLog || [];
  
  // Calculate number of players to determine initial visible count
  const playerCount = gameState.seats ? gameState.seats.filter(seat => seat !== null).length : 0;
  const defaultVisibleCount = Math.max(playerCount, 4); // Show at least 4, but match player count if higher
  
  const [visibleCount, setVisibleCount] = useState(defaultVisibleCount);
  
  // Update visible count when player count changes
  useEffect(() => {
    if (!isCollapsed) {
      setVisibleCount(defaultVisibleCount);
    }
  }, [playerCount, defaultVisibleCount, isCollapsed]);
  
  // Format timestamp to readable time
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };
  
  // Toggle collapsed state - also resets visible count
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    if (isCollapsed) {
      setVisibleCount(defaultVisibleCount); // Reset to player-based count when opening
    }
  };
  
  // Show more entries
  const showMore = () => {
    setVisibleCount(prevCount => prevCount + Math.max(playerCount, 5));
  };
  
  // Determine how many entries to show
  const displayEntries = isCollapsed ? [] : logEntries.slice(0, visibleCount);
  
  // Render a log entry (either simple message or rich turn summary)
  const renderLogEntry = (entry) => {
    // Check if it's a rich turn summary object
    if (entry.type === 'turn') {
      return <TurnSummaryPanel key={entry.id} summary={entry} />;
    }

    // Check if it's a round divider
    if (entry.type === 'round_start') {
      return <RoundDivider key={entry.id} roundNumber={entry.roundNumber} />;
    }

    // Check if it's a system message
    if (entry.type === 'system' || entry.type === 'error') {
      return (
        <div key={entry.id} className={`${styles.logEntry} ${styles.systemMessage}`}>
          <span className={styles.logTime}>{formatTime(entry.timestamp)}</span>
          <span className={styles.logMessage}>{entry.message}</span>
        </div>
      );
    }

    // Default: legacy simple message format
    return (
      <div key={entry.id} className={styles.logEntry}>
        <span className={styles.logTime}>{formatTime(entry.timestamp)}</span>
        <span className={styles.logMessage}>{entry.message}</span>
      </div>
    );
  };
  
  return (
    <div className={styles.gameLogContainer}>
      <h3 className={styles.gameLogHeader} onClick={toggleCollapse}>
        Game Log
        <span className={styles.expandIcon}>
          {isCollapsed ? '▶' : '▼'}
        </span>
      </h3>
      
      {!isCollapsed && (
        <>
          <div className={styles.gameLogEntries}>
            {logEntries.length === 0 ? (
              <div className={styles.emptyLog}>No game events yet</div>
            ) : (
              displayEntries.map(renderLogEntry)
            )}
          </div>
          
          {logEntries.length > visibleCount && (
            <div className={styles.showMoreButton} onClick={showMore}>
              Show {Math.min(Math.max(playerCount, 5), logEntries.length - visibleCount)} more 
              {logEntries.length - visibleCount > Math.max(playerCount, 5) && ` (${logEntries.length - visibleCount} remaining)`}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GameLog;
