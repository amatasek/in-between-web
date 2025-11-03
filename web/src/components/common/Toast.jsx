import { useEffect, useState } from 'react';
import styles from './Toast.module.css';
import Username from './Username';

const Toast = ({ 
  title, 
  message, 
  emoji = 'ℹ', 
  color = '#3498db', 
  duration = 4000, 
  onClose, 
  position 
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        // Wait for fade animation to complete before removing
        setTimeout(onClose, 300);
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  // Determine if this is an emoji reaction (no title and emoji is not default)
  const isEmojiReaction = !title && emoji !== 'ℹ';

  return (
    <div
      className={`${styles.toast} ${isEmojiReaction && isVisible ? styles.emojiReaction : ''} ${!isVisible ? styles.slideOut : ''}`}
      style={{
        top: 'max(20px, var(--safe-area-inset-top))',
        zIndex: 10000 + position,
        borderColor: color
      }}
    >
      <div 
        className={styles.iconWrapper}
      >
        <span 
          className={`${styles.icon} ${isEmojiReaction ? styles.emojiIcon : ''}`} 
          style={{ 
            color,
            textShadow: isEmojiReaction 
              ? `0 0 20px ${color}, 0 0 40px ${color}60` 
              : `0 0 8px ${color}80`
          }}
        >
          {emoji}
        </span>
      </div>
      <div className={styles.content}>
        {title && <div className={styles.title}>{title}</div>}
        <div className={`${styles.message} ${isEmojiReaction ? styles.emojiMessage : ''}`}>
          {isEmojiReaction ? (
            <>
              <span className={styles.playerName}><Username username={message} /></span>
              <span className={styles.reactionText}>reacted!</span>
            </>
          ) : (
            message
          )}
        </div>
      </div>
      <button type="button" 
        className={styles.closeButton} 
        onClick={onClose}
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
};

export default Toast;