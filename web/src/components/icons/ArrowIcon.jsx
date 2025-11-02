
/**
 * Arrow icon component that can be rotated to point up or down
 * @param {Object} props - Component props
 * @param {string} props.direction - Direction of the arrow ('up' or 'down')
 * @param {string} props.color - Color of the arrow (default: 'currentColor')
 * @param {number} props.size - Size of the icon in pixels (default: 24)
 */
const ArrowIcon = ({ direction = 'up', color = 'currentColor', size = 24 }) => {
  // Determine rotation based on direction
  const rotation = direction === 'down' ? 'rotate(180deg)' : 'rotate(0deg)';
  
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
      style={{ transform: rotation, display: 'inline-block', transformOrigin: 'center' }}
    >
      {/* This is the shift/arrow up icon from Material Design */}
      <path d="M7 11l5-5 5 5M7 17l5-5 5 5" />
    </svg>
  );
};

export default ArrowIcon;
