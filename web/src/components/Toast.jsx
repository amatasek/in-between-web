import React, { useEffect } from 'react';
import styles from './styles/Toast.module.css';

const Toast = ({ 
  title, 
  message, 
  emoji = 'ℹ', 
  color = '#3498db', 
  duration = 4000, 
  onClose, 
  position 
}) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  // Determine if this is an emoji reaction (no title and emoji is not default)
  const isEmojiReaction = !title && emoji !== 'ℹ';

  return (
    <div 
      className={`${styles.toast} ${isEmojiReaction ? styles.emojiReaction : ''}`}
      style={{ 
        top: '20px', 
        zIndex: 10000 + position,
        borderColor: color,
        background: `linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)`
      }}
    >
      <div 
        className={styles.iconWrapper}
      >
        <span 
          className={`${styles.icon} ${isEmojiReaction ? styles.emojiIcon : ''}`} 
          style={{ 
            color: color,
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
              <span className={styles.playerName}>{message}</span>
              <span className={styles.reactionText}>reacted!</span>
            </>
          ) : (
            message
          )}
        </div>
      </div>
      <button 
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