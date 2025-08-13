import React, { useState } from 'react';
import styles from './styles/GameLog.module.css';
import { useGameContext } from '../contexts/GameContext';
import TurnSummaryPanel from './TurnSummaryPanel';
import RoundDivider from './RoundDivider';

const GameLog = () => {
  const { gameState } = useGameContext();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [visibleCount, setVisibleCount] = useState(10);
  
  if (!gameState || !gameState.gameLog) return null;
  
  // Get the game log entries
  const logEntries = gameState.gameLog || [];
  
  // Format timestamp to readable time
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };
  
  // Toggle collapsed state - also resets visible count
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    if (isCollapsed) {
      setVisibleCount(10); // Reset to initial 10 when opening
    }
  };
  
  // Show more entries
  const showMore = () => {
    setVisibleCount(prevCount => prevCount + 10);
  };
  
  // Determine how many entries to show
  const displayEntries = isCollapsed ? [] : logEntries.slice(0, visibleCount);
  
  // Render a log entry (either simple message or rich turn summary)
  const renderLogEntry = (entry, index) => {
    // Check if it's a rich turn summary object
    if (entry.type === 'turn') {
      return <TurnSummaryPanel key={index} summary={entry} />;
    }
    
    // Check if it's a round divider
    if (entry.type === 'round_start') {
      return <RoundDivider key={index} roundNumber={entry.roundNumber} />;
    }
    
    // Check if it's a system message
    if (entry.type === 'system' || entry.type === 'error') {
      return (
        <div key={index} className={`${styles.logEntry} ${styles.systemMessage}`}>
          <span className={styles.logTime}>{formatTime(entry.timestamp)}</span>
          <span className={styles.logMessage}>{entry.message}</span>
        </div>
      );
    }
    
    // Default: legacy simple message format
    return (
      <div key={index} className={styles.logEntry}>
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
              Show {Math.min(10, logEntries.length - visibleCount)} more 
              {logEntries.length - visibleCount > 10 && ` (${logEntries.length - visibleCount} remaining)`}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GameLog;
