import styles from './styles/AnimatedRain.module.css';
import CoinIcon from './CoinIcon';

const AnimatedRain = ({ 
  type = 'emoji', // 'emoji', 'coin', 'confetti'
  items = [], // Array of items to display (emojis, colors, etc.)
  count = 10, // Number of falling items
  animationDuration = 2.5, // Base animation duration in seconds
  className = ''
}) => {
  // Generate random items based on type
  const renderItem = (index) => {
    // Evenly distribute delays across the animation duration for continuous rain
    const staggerDelay = (index / count) * animationDuration;
    const randomOffset = (Math.random() - 0.5) * 0.3; // Small random variation
    const randomDelay = staggerDelay + randomOffset;
    
    // Fully random horizontal position
    const randomLeft = Math.random() * 100;
    
    switch(type) {
      case 'coin':
        return (
          <div 
            key={index} 
            className={styles.fallingItem}
            style={{
              left: `${randomLeft}%`,
              animationDelay: `${randomDelay}s`,
              '--animation-duration': `${animationDuration}s`
            }}
          >
            <CoinIcon size="large" />
          </div>
        );
        
      case 'confetti':
        const colors = items.length > 0 ? items : ['#ffd700', '#ffed4e', '#fff', '#ff6b6b', '#4CAF50'];
        return (
          <div 
            key={index}
            className={`${styles.fallingItem} ${styles.confetti}`}
            style={{
              left: `${randomLeft}%`,
              animationDelay: `${randomDelay}s`,
              '--animation-duration': `${animationDuration * 1.2}s`,
              backgroundColor: colors[Math.floor(Math.random() * colors.length)]
            }}
          />
        );
        
      case 'emoji':
      default:
        const emojis = items.length > 0 ? items : ['🎉'];
        return (
          <div 
            key={index}
            className={styles.fallingItem}
            style={{
              left: `${randomLeft}%`,
              animationDelay: `${randomDelay}s`,
              '--animation-duration': `${animationDuration}s`
            }}
          >
            <span className={styles.emoji}>
              {emojis[Math.floor(Math.random() * emojis.length)]}
            </span>
          </div>
        );
    }
  };
  
  return (
    <div className={`${styles.rainContainer} ${className}`}>
      {[...Array(count)].map((_, i) => renderItem(i))}
    </div>
  );
};

export default AnimatedRain;