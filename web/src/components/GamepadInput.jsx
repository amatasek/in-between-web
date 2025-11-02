import { useEffect, useRef } from 'react';
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
  
  // Safely get context - fallback to null if provider not available
  let enhanceInput = null;
  try {
    const context = useVirtualKeyboardContext();
    enhanceInput = context?.enhanceInput;
  } catch {
    // Context not available - component will work as regular input
    console.warn('VirtualKeyboardProvider not found - GamepadInput working as regular input');
  }
  
  useEffect(() => {
    if (inputRef.current && enhanceInput) {
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