import { useEffect, useRef, useState } from 'react';
import styles from './styles/EmojiReactions.module.css';
import { useSocket } from '../contexts/SocketContext';
import { useGameContext } from '../contexts/GameContext';
import { useAuth } from '../contexts/AuthContext';
import { useAds } from '../contexts/AdContext';

const EmojiReactions = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { socket } = useSocket();
  const { gameState } = useGameContext();
  const { user } = useAuth();
  const { showAds } = useAds();
  const containerRef = useRef(null);

  // Available emojis for reactions - colors matched to emoji appearance
  const emojis = [
    { emoji: '🔥', name: 'Fire', color: '#FF6B35' },       // Orange-red flame
    { emoji: '😄', name: 'Happy', color: '#FFD93D' },      // Yellow happy face
    { emoji: '💩', name: 'Poop', color: '#8B4513' },       // Brown
    { emoji: '😎', name: 'Cool', color: '#4A5568' },       // Dark gray (sunglasses)
    { emoji: '🤯', name: 'Mind Blown', color: '#FFA500' }, // Orange explosion
    { emoji: '😈', name: 'Devilish', color: '#9333EA' },   // Purple devil
    { emoji: '😬', name: 'Worried', color: '#FCD34D' },    // Yellow grimace
    { emoji: '👏', name: 'Applause', color: '#FBBF24' },   // Skin tone yellow
    { emoji: '😭', name: 'Crying', color: '#3B82F6' },     // Blue tears
    { emoji: '🤡', name: 'Clown', color: '#EF4444' },      // Red nose
    { emoji: '💪', name: 'Strong', color: '#F59E0B' },     // Skin/muscle tone
    { emoji: '😅', name: 'Nervous', color: '#60A5FA' },    // Blue sweat drop
    { emoji: '🎉', name: 'Celebration', color: '#A855F7' }, // Multi-color party
    { emoji: '🤔', name: 'Thinking', color: '#6B7280' },   // Neutral gray
    { emoji: '🙈', name: 'See No Evil', color: '#A0522D' }, // Monkey brown
    { emoji: '😤', name: 'Confident', color: '#DC2626' }   // Red anger/steam
  ];

  const handleEmojiClick = (emojiData) => {
    if (!socket || !gameState || !user) {
      return;
    }

    // Send emoji reaction to server
    socket.emit('emojiReaction', {
      gameId: gameState.id,
      emoji: emojiData.emoji,
      color: emojiData.color,
      playerName: user.username
    });

    // Close panel after selection
    setIsOpen(false);
  };

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={`${styles.emojiReactions} ${showAds ? styles.withAds : ''}`} ref={containerRef}>
      {/* Toggle button */}
      <button
        type="button"
        className={styles.toggleButton}
        onClick={togglePanel}
        data-gamepad-focusable="true"
        aria-label="Toggle emoji reactions"
      >
        😊
      </button>

      {/* Emoji panel */}
      {isOpen && (
        <div className={styles.emojiPanel}>
          <div className={styles.emojiGrid}>
            {emojis.map((emojiData) => (
              <button
                key={emojiData.name}
                type="button"
                className={styles.emojiButton}
                onClick={() => handleEmojiClick(emojiData)}
                data-gamepad-focusable="true"
                title={emojiData.name}
                style={{ '--emoji-color': emojiData.color }}
              >
                {emojiData.emoji}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default EmojiReactions;