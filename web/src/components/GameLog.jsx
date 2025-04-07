import React, { useState } from 'react';
import styles from './styles/GameLog.module.css';
import { useGameContext } from '../contexts/GameContext';

const GameLog = () => {
  const { gameState } = useGameContext();
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (!gameState || !gameState.gameLog) return null;
  
  // Get the game log entries
  const logEntries = gameState.gameLog || [];
  
  // Format timestamp to readable time
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };
  
  // Toggle expanded state
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  
  // Determine how many entries to show
  const displayEntries = isExpanded ? logEntries : logEntries.slice(0, 5);
  
  return (
    <div className={styles.gameLogContainer}>
      <div className={styles.gameLogHeader} onClick={toggleExpanded}>
        <h3>Game Log</h3>
        <span className={styles.expandIcon}>{isExpanded ? '▲' : '▼'}</span>
      </div>
      
      <div className={`${styles.gameLogEntries} ${isExpanded ? styles.expanded : ''}`}>
        {displayEntries.length === 0 ? (
          <div className={styles.emptyLog}>No game events yet</div>
        ) : (
          displayEntries.map((entry, index) => (
            <div key={index} className={styles.logEntry}>
              <span className={styles.logTime}>{formatTime(entry.timestamp)}</span>
              <span className={styles.logMessage}>{entry.message}</span>
            </div>
          ))
        )}
      </div>
      
      {!isExpanded && logEntries.length > 5 && (
        <div className={styles.showMoreButton} onClick={toggleExpanded}>
          Show {logEntries.length - 5} more entries
        </div>
      )}
    </div>
  );
};

export default GameLog;
