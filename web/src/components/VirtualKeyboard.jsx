import { useCallback, useEffect, useState } from 'react';
import { useVirtualKeyboardContext } from '../contexts/VirtualKeyboardContext';
import BaseModal from './common/BaseModal';
import styles from './VirtualKeyboard.module.css';

const VirtualKeyboard = ({ 
  isVisible, 
  onClose, 
  onEnter,
  inputType = 'text',
  initialValue = ''
}) => {
  const { keyboardTitle } = useVirtualKeyboardContext();
  const [currentLayout, setCurrentLayout] = useState('lowercase');
  const [tempInput, setTempInput] = useState('');

  // Initialize temp input with current value when keyboard opens
  useEffect(() => {
    if (isVisible) {
      // For number inputs, don't use initial value if it's "0"
      if (inputType === 'number') {
        setTempInput(initialValue && initialValue !== '0' ? initialValue : '');
      } else {
        setTempInput(initialValue || '');
      }
    } else {
      setTempInput('');
    }
  }, [isVisible, initialValue, inputType]);
  
  // Define keyboard layouts
  const layouts = {
    lowercase: [
      ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
      ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
      ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
      ['shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'backspace'],
      ['space', 'enter']
    ],
    uppercase: [
      ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
      ['shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'backspace'],
      ['space', 'enter']
    ],
    numbers: [
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8', '9'],
      ['0', 'backspace'],
      ['enter']
    ]
  };

  // Use number layout for number inputs
  const activeLayout = inputType === 'number' ? 'numbers' : currentLayout;
  const keys = layouts[activeLayout];

  const handleKeyPress = useCallback((key) => {
    switch (key) {
      case 'shift':
        setCurrentLayout(prev => prev === 'lowercase' ? 'uppercase' : 'lowercase');
        break;
      case 'backspace':
        setTempInput(prev => prev.slice(0, -1));
        break;
      case 'enter':
        onEnter?.(tempInput);
        break;
      case 'space':
        setTempInput(prev => `${prev  } `);
        break;
      default:
        setTempInput(prev => prev + key);
        break;
    }
  }, [onEnter, tempInput]);

  const getKeyDisplayText = (key) => {
    switch (key) {
      case 'shift':
        return currentLayout === 'lowercase' ? '⇧' : '⇧';
      case 'backspace':
        return '⌫';
      case 'space':
        return 'Space';
      case 'enter':
        return '↵';
      default:
        return key;
    }
  };

  const getKeyClass = (key) => {
    let className = styles.key;
    
    if (['shift', 'backspace', 'space', 'enter'].includes(key)) {
      className += ` ${styles.specialKey}`;
    }
    
    if (key === 'space') {
      className += ` ${styles.spaceKey}`;
    }
    
    if (key === 'shift' && currentLayout === 'uppercase') {
      className += ` ${styles.activeShift}`;
    }
    
    return className;
  };

  // Handle ESC key to close keyboard (BaseModal handles body scroll)
  useEffect(() => {
    if (isVisible) {
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          onClose?.();
        }
      };
      
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <BaseModal
      title={keyboardTitle || (inputType === 'number' ? 'Number Pad' : 'Virtual Keyboard')}
      onClose={onClose}
      className={styles.keyboardModal}
      overlayStyle={{ zIndex: 1300 }}
    >
      <div className={styles.inputDisplay}>
        <input
          type={inputType === 'password' ? 'password' : 'text'}
          value={tempInput}
          className={styles.tempInput}
          readOnly
          placeholder="Type below..."
        />
      </div>
      <div className={styles.keyboardGrid}>
        {keys.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.keyRow}>
            {row.map((key, keyIndex) => (
              <button
                key={`${rowIndex}-${keyIndex}`}
                className={getKeyClass(key)}
                onClick={() => handleKeyPress(key)}
                data-gamepad-focusable="true"
                aria-label={key === 'backspace' ? 'Backspace' : 
                           key === 'enter' ? 'Enter' : 
                           key === 'space' ? 'Space' : 
                           key === 'shift' ? 'Shift' : key}
              >
                {getKeyDisplayText(key)}
              </button>
            ))}
          </div>
        ))}
      </div>
    </BaseModal>
  );
};

export default VirtualKeyboard;