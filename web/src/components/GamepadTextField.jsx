import React, { useRef, useEffect } from 'react';
import { TextField } from '@mui/material';
import { useVirtualKeyboardContext } from '../contexts/VirtualKeyboardContext';

/**
 * Enhanced Material-UI TextField that automatically shows virtual keyboard for gamepad users
 * Drop-in replacement for Material-UI TextField
 */
const GamepadTextField = ({ 
  type = 'text',
  title = '',
  inputProps = {},
  ...props 
}) => {
  const textFieldRef = useRef(null);
  const { enhanceInput } = useVirtualKeyboardContext();
  
  useEffect(() => {
    if (textFieldRef.current) {
      const cleanup = enhanceInput(textFieldRef.current, type, title);
      return cleanup;
    }
  }, [enhanceInput, type, title]);
  
  return (
    <TextField
      ref={textFieldRef}
      type={type}
      inputProps={{
        ...inputProps,
        'data-gamepad-focusable': 'true'
      }}
      {...props}
    />
  );
};

export default GamepadTextField;