import { useEffect, useRef, useState } from 'react';
import styles from '../styles/common/CountdownTimer.module.css';

/**
 * CountdownTimer - A circular countdown timer with color transition
 * Displays remaining seconds and a circular progress ring that transitions from green to red
 * 
 * @param {number} duration - Total duration in seconds
 * @param {boolean} isActive - Whether the timer is currently active
 */
const CountdownTimer = ({ duration = 15, isActive = true }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const startTimeRef = useRef(Date.now());
  
  // Reset timer when it becomes active or duration changes
  useEffect(() => {
    if (isActive) {
      startTimeRef.current = Date.now();
      setTimeLeft(duration);
    }
  }, [duration, isActive]);
  
  // Update timer
  useEffect(() => {
    if (!isActive) return;
    
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      const remaining = Math.max(0, duration - elapsed);
      setTimeLeft(remaining);
      
      if (remaining <= 0) {
        clearInterval(interval);
      }
    }, 100);
    
    return () => clearInterval(interval);
  }, [duration, isActive]);
  
  // Calculate progress percentage (100% = full, 0% = empty)
  const progress = (timeLeft / duration) * 100;
  
  // Calculate color based on time remaining (green -> yellow -> red)
  const getColor = () => {
    const percentRemaining = (timeLeft / duration) * 100;
    if (percentRemaining > 66) return 'var(--color-ready)'; // Green
    if (percentRemaining > 33) return 'var(--accent)'; // Yellow/Gold
    return 'var(--secondary)'; // Red
  };
  
  // SVG circle properties
  const size = 50;
  const strokeWidth = 3;
  const radius = (size - strokeWidth * 2) / 2; // Account for stroke width on both sides
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  
  return (
    <div className={styles.countdownTimer}>
      <svg
        className={styles.progressRing}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* Background circle */}
        <circle
          className={styles.progressRingBackground}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          className={styles.progressRingCircle}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          style={{ stroke: getColor() }}
        />
      </svg>
      <div className={styles.timeDisplay}>
        {timeLeft}s
      </div>
    </div>
  );
};

export default CountdownTimer;