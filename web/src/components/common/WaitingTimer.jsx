import { useEffect, useRef, useState } from 'react';
import styles from '../styles/common/WaitingTimer.module.css';
import Username from '../Username';

const WaitingTimer = ({ 
  playerName, 
  action = 'deciding', 
  duration = 15000  // Duration in milliseconds to match TIMERS constants
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const startTimeRef = useRef(Date.now());
  
  // Reset timer when component mounts or duration changes
  useEffect(() => {
    startTimeRef.current = Date.now();
    setTimeLeft(duration);
  }, [duration]);
  
  // Update timer progress
  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const remaining = Math.max(0, duration - elapsed);
      setTimeLeft(remaining);
      
      if (remaining <= 0) {
        clearInterval(interval);
      }
    }, 100);
    
    return () => clearInterval(interval);
  }, [duration]);
  
  const progress = ((duration - timeLeft) / duration) * 100;
  
  return (
    <div className={`panel-game ${styles.waitingTimer}`}>
      <div className={styles.timerContent}>
        <span className={styles.playerName}><Username username={playerName} /></span>
        <span className={styles.action}>is {action}...</span>
      </div>
      <div className={styles.timerBar}>
        <div 
          className={styles.timerProgress} 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default WaitingTimer;