import { useCallback, useEffect, useState } from 'react';

/**
 * Hook to manage virtual keyboard state and integration with input elements
 * Automatically detects gamepad usage and shows virtual keyboard for controller users
 */
export const useVirtualKeyboard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentInput, setCurrentInput] = useState(null);
  const [inputType, setInputType] = useState('text');
  const [keyboardTitle, setKeyboardTitle] = useState('');
  const [isGamepadActive, setIsGamepadActive] = useState(false);

  // Detect if gamepad navigation is active (integrate with existing system)
  useEffect(() => {
    const checkGamepadNavigation = () => {
      const connected = document.body.classList.contains('gamepad-navigation-active');
      setIsGamepadActive(connected);
    };
    
    // Check initially
    checkGamepadNavigation();
    
    // Create observer to watch for gamepad navigation class changes
    const observer = new MutationObserver(checkGamepadNavigation);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  const showKeyboard = useCallback((inputElement, type = 'text', title = '') => {
    if (!inputElement) return;
    
    setCurrentInput(inputElement);
    setInputType(type);
    setKeyboardTitle(title);
    setIsVisible(true);
    
    // Blur the input to prevent mobile keyboard from appearing
    inputElement.blur();
  }, []);

  const hideKeyboard = useCallback(() => {
    setIsVisible(false);
    setCurrentInput(null);
    setInputType('text');
    setKeyboardTitle('');
  }, []);


  const handleEnter = useCallback((finalValue) => {
    if (!currentInput) return;
    
    // For React/MUI compatibility, we need to set the value and trigger events in a specific way
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    nativeInputValueSetter.call(currentInput, finalValue || '');
    
    // Create and dispatch input event that React will recognize
    const inputEvent = new Event('input', { bubbles: true });
    currentInput.dispatchEvent(inputEvent);
    
    // Also dispatch change event
    const changeEvent = new Event('change', { bubbles: true });
    currentInput.dispatchEvent(changeEvent);
    
    // Just close the keyboard - don't submit forms or trigger enter behavior
    hideKeyboard();
  }, [currentInput, hideKeyboard]);

  // Enhanced input wrapper that automatically shows keyboard for gamepad users
  const enhanceInput = useCallback((inputElement, type = 'text', title = '') => {
    if (!inputElement) return;
    
    // For Material-UI TextField, find the actual input element
    let actualInput = inputElement;
    if (inputElement.querySelector && inputElement.querySelector('input')) {
      actualInput = inputElement.querySelector('input');
    }
    
    const handleClick = (e) => {
      // Show virtual keyboard on click if gamepad is connected
      // AND if the gamepad navigation is currently active (showing focus indicators)
      // This prevents autoFocus from opening the keyboard
      if (isGamepadActive && document.body.classList.contains('gamepad-navigation-active')) {
        e.preventDefault();
        showKeyboard(actualInput, type, title);
      }
    };
    
    // Add event listeners to the actual input element
    actualInput.addEventListener('click', handleClick);
    
    // Return cleanup function
    return () => {
      actualInput.removeEventListener('click', handleClick);
    };
  }, [isGamepadActive, showKeyboard]);

  // Get current input value for initializing the virtual keyboard
  const getCurrentInputValue = useCallback(() => {
    return currentInput?.value || '';
  }, [currentInput]);

  return {
    isVisible,
    inputType,
    keyboardTitle,
    currentInput,
    isGamepadActive,
    showKeyboard,
    hideKeyboard,
    handleEnter,
    enhanceInput,
    getCurrentInputValue
  };
};