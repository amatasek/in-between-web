import React from 'react';

/**
 * Question mark icon component for rules button
 * @param {Object} props - Component props
 * @param {string} props.color - Color of the icon (default: 'currentColor')
 * @param {number} props.size - Size of the icon in pixels (default: 24)
 */
const QuestionIcon = ({ color = 'currentColor', size = 24 }) => {
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
      {/* Material Design style question mark icon */}
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12" y2="17.01" />
    </svg>
  );
};

export default QuestionIcon;
