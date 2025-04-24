import React from 'react';
import IconButton from './IconButton';
import ExitIcon from '../icons/ExitIcon';

/**
 * A standardized leave/exit button component
 * 
 * @param {Object} props Component props
 * @param {function} props.onClick Handler for when the button is clicked
 * @param {string} props.title Custom tooltip text (optional)
 */
const LeaveButton = ({ 
  onClick, 
  title = "Leave Game",
  ...restProps 
}) => {
  return (
    <IconButton
      icon={<ExitIcon color="white" size={20} />}
      title={title}
      onClick={onClick}
      variant="danger"
      {...restProps}
    />
  );
};

export default LeaveButton;
