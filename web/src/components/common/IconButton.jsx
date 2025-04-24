import React from 'react';
import styles from './styles/IconButton.module.css';

/**
 * A reusable icon button component with standardized styling
 * 
 * @param {Object} props Component props
 * @param {React.ReactNode} props.icon The icon to display
 * @param {string} props.title Tooltip text for the button
 * @param {function} props.onClick Click handler function
 * @param {string} props.variant Button variant ('default', 'danger', 'success')
 * @param {boolean} props.compact Whether to use compact styling
 * @param {string} props.className Additional class names
 */
const IconButton = ({ 
  icon, 
  title, 
  onClick, 
  variant = 'default',
  compact = true,
  className = '',
  ...restProps
}) => {
  return (
    <button
      className={`${styles.iconButton} ${styles[variant]} ${className}`}
      onClick={onClick}
      title={title}
      type="button"
      {...restProps}
    >
      {icon}
    </button>
  );
};

export default IconButton;
