import React from 'react';

/**
 * Exit/door icon component for leave game button
 * @param {Object} props - Component props
 * @param {string} props.color - Color of the icon (default: 'currentColor')
 * @param {number} props.size - Size of the icon in pixels (default: 24)
 */
const ExitIcon = ({ color = 'currentColor', size = 24 }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      {/* Material Design style exit/logout icon */}
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
};

export default ExitIcon;
