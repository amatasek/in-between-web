import { useMemo } from 'react';
import styles from './CoinIcon.module.css';

/**
 * A reusable coin icon component to replace dollar signs
 * @param {Object} props - Component props
 * @param {string} [props.size='small'] - Size of the coin icon ('small', 'medium', 'large')
 * @param {string} [props.className] - Additional CSS class to apply
 */
const CoinIcon = ({ size = 'small', className = '' }) => {
  const sizeMap = {
    small: 15,
    medium: 19,
    large: 24
  };
  
  const pixelSize = sizeMap[size] || sizeMap.small;
  
  // Generate unique IDs for gradients to prevent conflicts
  const gradientId = useMemo(() => `goldGradient-${Math.random().toString(36).substr(2, 9)}`, []);
  const shineId = useMemo(() => `goldShine-${Math.random().toString(36).substr(2, 9)}`, []);
  
  return (
    <span className={`${styles.coinIcon} ${styles[size]} ${className}`}>
      <svg 
        width={pixelSize} 
        height={pixelSize} 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Diamond shape with golden gradient */}
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="50%" stopColor="#FFA500" />
            <stop offset="100%" stopColor="#FF8C00" />
          </linearGradient>
          <linearGradient id={shineId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFED4E" />
            <stop offset="100%" stopColor="#FFD700" />
          </linearGradient>
        </defs>
        
        {/* Main diamond shape */}
        <path 
          d="M12 2L22 12L12 22L2 12L12 2Z" 
          fill={`url(#${gradientId})`}
          stroke="#D4AF37"
          strokeWidth="0.5"
        />
        
        {/* Inner shine effect */}
        <path 
          d="M12 5L18 12L12 18L6 12L12 5Z" 
          fill={`url(#${shineId})`}
          opacity="0.6"
        />
        
        {/* Top highlight */}
        <path 
          d="M12 2L16 6L12 8L8 6L12 2Z" 
          fill="#FFFACD"
          opacity="0.7"
        />
      </svg>
    </span>
  );
};

export default CoinIcon;
