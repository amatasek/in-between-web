import { createContext, useContext } from 'react';
import { useVirtualKeyboard } from '../hooks/useVirtualKeyboard';

const VirtualKeyboardContext = createContext();

export const useVirtualKeyboardContext = () => {
  const context = useContext(VirtualKeyboardContext);
  if (!context) {
    throw new Error('useVirtualKeyboardContext must be used within a VirtualKeyboardProvider');
  }
  return context;
};

export const VirtualKeyboardProvider = ({ children }) => {
  const keyboardState = useVirtualKeyboard();
  const { isVisible, inputType, hideKeyboard, handleEnter, getCurrentInputValue } = keyboardState;

  return (
    <VirtualKeyboardContext.Provider value={keyboardState}>
      {children}
      {isVisible && (
        <VirtualKeyboard
          isVisible={isVisible}
          inputType={inputType}
          initialValue={getCurrentInputValue()}
          onClose={hideKeyboard}
          onEnter={handleEnter}
        />
      )}
    </VirtualKeyboardContext.Provider>
  );
};