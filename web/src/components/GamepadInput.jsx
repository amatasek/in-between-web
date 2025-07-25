import React, { useRef, useEffect } from 'react';
import { useVirtualKeyboardContext } from '../contexts/VirtualKeyboardContext';

/**
 * Enhanced input component that automatically shows virtual keyboard for gamepad users
 * Drop-in replacement for regular input elements
 */
const GamepadInput = ({ 
  type = 'text',
  title = '',
  ...props 
}) => {
  const inputRef = useRef(null);
  const { enhanceInput } = useVirtualKeyboardContext();
  
  useEffect(() => {
    if (inputRef.current) {
      const cleanup = enhanceInput(inputRef.current, type, title);
      return cleanup;
    }
  }, [enhanceInput, type, title]);
  
  return (
    <input
      ref={inputRef}
      type={type}
      data-gamepad-focusable="true"
      {...props}
    />
  );
};

export default GamepadInput;