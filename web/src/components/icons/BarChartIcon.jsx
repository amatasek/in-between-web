
/**
 * Bar chart icon component for stats button
 * @param {Object} props - Component props
 * @param {string} props.color - Color of the icon (default: 'currentColor')
 * @param {number} props.size - Size of the icon in pixels (default: 24)
 */
const BarChartIcon = ({ color = 'currentColor', size = 24 }) => {
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
      <line x1="18" y1="20" x2="18" y2="10"></line>
      <line x1="12" y1="20" x2="12" y2="4"></line>
      <line x1="6" y1="20" x2="6" y2="14"></line>
      <line x1="3" y1="20" x2="21" y2="20"></line>
    </svg>
  );
};

export default BarChartIcon;
