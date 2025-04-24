import React from 'react';

/**
 * Download CSV icon component for transaction log download button
 * @param {Object} props - Component props
 * @param {string} props.color - Color of the icon (default: 'currentColor')
 * @param {number} props.size - Size of the icon in pixels (default: 24)
 */
const DownloadIcon = ({ color = 'currentColor', size = 24 }) => {
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
      {/* Stylized CSV download icon with document and arrow */}
      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
      <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
      <path d="M12 15 L12 18" />
      <path d="M9.5 16.5 L12 19 L14.5 16.5" />
      <path d="M8 10 L10 10" />
      <path d="M12 10 L14 10" />
      <path d="M16 10 L16 10" />
    </svg>
  );
};

export default DownloadIcon;
