import { useEffect, useState, useCallback, useRef } from 'react';

/**
 * Custom hook for comprehensive gamepad navigation support
 * Provides 2D spatial navigation, scrollable content support, and modal awareness
 * 
 * @param {boolean} isEnabled - Whether gamepad navigation is active
 * @returns {Object} Navigation state and utilities
 */
export const useGamepadNavigation = (isEnabled = true) => {
  const [focusedElement, setFocusedElement] = useState(null);
  const [navigableElements, setNavigableElements] = useState([]);
  const [isGamepadConnected, setIsGamepadConnected] = useState(false);
  const [showFocusIndicator, setShowFocusIndicator] = useState(false);
  const lastNavigationTime = useRef(0);
  const buttonStates = useRef({});
  
  const registerNavigableElements = useCallback(() => {
    if (!isEnabled) return;
    
    // Find all focusable elements with data-gamepad-focusable attribute AND scrollable containers
    const allElements = Array.from(
      document.querySelectorAll('[data-gamepad-focusable="true"]:not([disabled]), [data-gamepad-scrollable="true"]')
    );
    
    // Filter out elements that are hidden or behind modals
    const visibleElements = allElements.filter(element => {
      // Check if element is visible
      const rect = element.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) {
        // For hidden inputs (like auto-ante toggle), check the parent
        const parent = element.closest('label') || element.closest('[class*="toggle"]') || element.parentElement;
        if (parent) {
          const parentRect = parent.getBoundingClientRect();
          if (parentRect.width === 0 || parentRect.height === 0) return false;
        } else {
          return false;
        }
      }
      
      // Check if element is behind a modal
      const modals = document.querySelectorAll('[class*="modal"], [class*="Modal"], [role="dialog"], [class*="overlay"]');
      if (modals.length > 0) {
        // Filter to only get actual modal containers (not overlays)
        const modalContainers = Array.from(modals).filter(modal => {
          const className = modal.className;
          // Look for actual modal content containers, not just overlays
          return className.includes('modal') || className.includes('Modal') || modal.getAttribute('role') === 'dialog';
        });
        
        if (modalContainers.length > 0) {
          // Sort modals by z-index to find the topmost one
          const sortedModals = modalContainers.sort((a, b) => {
            let aZIndex = parseInt(window.getComputedStyle(a).zIndex) || 0;
            let bZIndex = parseInt(window.getComputedStyle(b).zIndex) || 0;
            
            // If z-index is auto/0, check the parent overlay
            if (aZIndex === 0) {
              const aOverlay = a.parentElement;
              if (aOverlay && aOverlay.classList.toString().includes('overlay')) {
                aZIndex = parseInt(window.getComputedStyle(aOverlay).zIndex) || 0;
              }
            }
            
            if (bZIndex === 0) {
              const bOverlay = b.parentElement;
              if (bOverlay && bOverlay.classList.toString().includes('overlay')) {
                bZIndex = parseInt(window.getComputedStyle(bOverlay).zIndex) || 0;
              }
            }
            
            return bZIndex - aZIndex; // Highest z-index first
          });
          
          // Only include elements that are inside the topmost modal
          const topmostModal = sortedModals[0];
          return topmostModal && topmostModal.contains(element);
        }
      }
      
      return true;
    });
    
    setNavigableElements(prevElements => {
      // Only update if the elements actually changed
      if (prevElements.length !== visibleElements.length || 
          !prevElements.every((el, i) => el === visibleElements[i])) {
        return visibleElements;
      }
      return prevElements;
    });
  }, [isEnabled]);

  const navigateDirection = useCallback((direction) => {
    const now = Date.now();
    if (now - lastNavigationTime.current < 150) {
      return; // Debounce navigation calls
    }
    lastNavigationTime.current = now;
    
    if (!navigableElements.length) return;
    
    // Show focus indicator when navigating
    setShowFocusIndicator(true);
    
    // Always check the actual focused element in the DOM first
    const actualFocusedElement = document.activeElement;
    let currentElement = focusedElement;
    
    // If the actual focused element is navigable and different from our state, sync it
    if (actualFocusedElement && 
        actualFocusedElement.getAttribute('data-gamepad-focusable') === 'true' &&
        navigableElements.includes(actualFocusedElement)) {
      currentElement = actualFocusedElement;
      setFocusedElement(actualFocusedElement);
    }
    
    const currentIndex = navigableElements.findIndex(el => el === currentElement);
    
    // If no element is currently focused or element not found, start with first element
    if (currentIndex === -1 || !currentElement) {
      const firstElement = navigableElements[0];
      setFocusedElement(firstElement);
      firstElement.focus();
      return;
    }
    
    // Handle scrollable content before spatial navigation
    const currentElem = navigableElements[currentIndex];
    const isScrollable = currentElem?.getAttribute('data-gamepad-scrollable') === 'true';
    
    if (isScrollable && (direction === 'up' || direction === 'down')) {
      const scrollAmount = 50;
      const isAtTop = currentElem.scrollTop <= 0;
      const isAtBottom = currentElem.scrollTop >= currentElem.scrollHeight - currentElem.clientHeight;
      
      if (direction === 'up' && !isAtTop) {
        currentElem.scrollTop = Math.max(0, currentElem.scrollTop - scrollAmount);
        return;
      }
      
      if (direction === 'down' && !isAtBottom) {
        currentElem.scrollTop = Math.min(
          currentElem.scrollHeight - currentElem.clientHeight,
          currentElem.scrollTop + scrollAmount
        );
        return;
      }
    }
    
    let nextElement = null;
    
    if (direction === 'up' || direction === 'down') {
      // Vertical navigation with intelligent spatial detection
      let currentRect = currentElem?.getBoundingClientRect();
      if (!currentRect) return;
      
      // Handle zero-dimension elements (hidden inputs, toggles)
      if (currentRect.width === 0 && currentRect.height === 0) {
        const label = currentElem.closest('label');
        const container = currentElem.closest('[class*="toggle"]') || currentElem.closest('[class*="Toggle"]');
        const parent = label || container || currentElem.parentElement;
        if (parent) {
          currentRect = parent.getBoundingClientRect();
        }
      }
      
      const currentCenterX = currentRect.left + currentRect.width / 2;
      
      // Get all candidates in the target direction
      const candidates = navigableElements
        .map((el, index) => ({ el, index, rect: el.getBoundingClientRect() }))
        .filter(({ el, rect, index }) => {
          // Exclude the current element
          if (index === currentIndex) return false;
          
          if (direction === 'up') {
            return rect.bottom <= currentRect.top + 20; // More generous tolerance for upward navigation
          } else {
            return rect.top >= currentRect.bottom - 20; // More generous tolerance for downward navigation
          }
        });
      
      
      if (candidates.length > 0) {
        // Sort candidates by horizontal distance from current element
        const sortedCandidates = candidates
          .map(candidate => ({
            ...candidate,
            horizontalDistance: Math.abs(candidate.rect.left + candidate.rect.width / 2 - currentCenterX),
            verticalDistance: direction === 'up' 
              ? currentRect.top - candidate.rect.bottom 
              : candidate.rect.top - currentRect.bottom
          }))
          .sort((a, b) => {
            const horizontalDiff = a.horizontalDistance - b.horizontalDistance;
            if (Math.abs(horizontalDiff) > 100) {
              return horizontalDiff;
            }
            const verticalDiff = a.verticalDistance - b.verticalDistance;
            if (Math.abs(verticalDiff) > 10) {
              return verticalDiff;
            }
            return horizontalDiff;
          });
        
        nextElement = sortedCandidates[0].el;
      } else {
        // No elements in target direction - find closest element in ANY direction
        const allOtherElements = navigableElements
          .filter((el, index) => index !== currentIndex)
          .map((el, index) => ({ el, rect: el.getBoundingClientRect() }));
        
        if (allOtherElements.length > 0) {
          // Find the element closest to where we want to go
          const targetY = direction === 'up' ? 0 : window.innerHeight;
          const closest = allOtherElements.reduce((best, candidate) => {
            const candidateDistance = Math.abs(candidate.rect.top - targetY);
            const bestDistance = Math.abs(best.rect.top - targetY);
            return candidateDistance < bestDistance ? candidate : best;
          });
          nextElement = closest.el;
        } else {
          // Ultimate fallback - wrap around
          if (direction === 'up') {
            nextElement = navigableElements[navigableElements.length - 1];
          } else {
            nextElement = navigableElements[0];
          }
        }
      }
    } else {
      // Horizontal navigation within rows
      const currentRect = currentElem?.getBoundingClientRect();
      if (!currentRect) {
        if (direction === 'left') {
          nextElement = currentIndex > 0 ? navigableElements[currentIndex - 1] : navigableElements[navigableElements.length - 1];
        } else {
          nextElement = currentIndex < navigableElements.length - 1 ? navigableElements[currentIndex + 1] : navigableElements[0];
        }
      } else {
        const currentCenterY = currentRect.top + currentRect.height / 2;
        const rowTolerance = Math.max(currentRect.height / 2, 20);
        
        const sameRowElements = navigableElements
          .map((el, index) => ({ el, index, rect: el.getBoundingClientRect() }))
          .filter(({ rect, index }) => {
            const candidateCenterY = rect.top + rect.height / 2;
            return Math.abs(candidateCenterY - currentCenterY) <= rowTolerance;
          })
          .sort((a, b) => a.rect.left - b.rect.left);
        
        const currentRowIndex = sameRowElements.findIndex(({ el }) => el === currentElem);
        
        if (currentRowIndex !== -1 && sameRowElements.length > 1) {
          if (direction === 'left') {
            nextElement = currentRowIndex > 0 ? sameRowElements[currentRowIndex - 1].el : null;
          } else {
            nextElement = currentRowIndex < sameRowElements.length - 1 ? sameRowElements[currentRowIndex + 1].el : null;
          }
        } else {
          nextElement = null;
        }
      }
    }
    
    if (nextElement) {
      setFocusedElement(nextElement);
      nextElement.focus();
    }
  }, [navigableElements, focusedElement]);

  const activateElement = useCallback(() => {
    // Check actual DOM focus first, fallback to our tracked element
    const elementToActivate = document.activeElement?.getAttribute('data-gamepad-focusable') === 'true' 
      ? document.activeElement 
      : focusedElement;
      
    if (elementToActivate) {
      // Show focus indicator when activating
      setShowFocusIndicator(true);
      // Simulate click on the focused element
      elementToActivate.click();
    }
  }, [focusedElement]);

  // Handle keyboard input for testing
  useEffect(() => {
    if (!isEnabled) return;

    const handleKeyDown = (e) => {
      // Check if we're in a text input field
      const isTextInput = document.activeElement && (
        document.activeElement.tagName === 'INPUT' || 
        document.activeElement.tagName === 'TEXTAREA'
      );

      // For text inputs, only prevent default for arrow keys (not Enter)
      // This allows normal form submission with Enter key
      if (isTextInput && e.key === 'Enter') {
        // Don't prevent default, don't activate element
        // Let the form handle the Enter key naturally
        return;
      }

      // Prevent default behavior for navigation keys
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', ' '].includes(e.key)) {
        e.preventDefault();
      }

      switch (e.key) {
        case 'ArrowUp':
          navigateDirection('up');
          break;
        case 'ArrowDown':
          navigateDirection('down');
          break;
        case 'ArrowLeft':
          navigateDirection('left');
          break;
        case 'ArrowRight':
          navigateDirection('right');
          break;
        case 'Enter':
        case ' ': // Space bar
          activateElement();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [navigateDirection, activateElement, isEnabled]);

  // Handle gamepad detection and input with native Gamepad API
  useEffect(() => {
    if (!isEnabled) return;

    let animationFrame;

    const checkGamepads = () => {
      const gamepads = navigator.getGamepads();
      let connected = false;

      for (let i = 0; i < gamepads.length; i++) {
        const gamepad = gamepads[i];
        if (gamepad && gamepad.connected) {
          connected = true;
          
          // Track button press states to avoid spamming
          if (!buttonStates.current[i]) {
            buttonStates.current[i] = {};
          }
          
          const prevStates = buttonStates.current[i];
          
          // D-pad buttons (standard mapping: 12=up, 13=down, 14=left, 15=right)
          const upPressed = gamepad.buttons[12]?.pressed;
          const downPressed = gamepad.buttons[13]?.pressed;
          const leftPressed = gamepad.buttons[14]?.pressed;
          const rightPressed = gamepad.buttons[15]?.pressed;
          const aPressed = gamepad.buttons[0]?.pressed; // A button

          // Only trigger on button press (not hold)
          if (upPressed && !prevStates.up) {
            navigateDirection('up');
          }
          if (downPressed && !prevStates.down) {
            navigateDirection('down');
          }
          if (leftPressed && !prevStates.left) {
            navigateDirection('left');
          }
          if (rightPressed && !prevStates.right) {
            navigateDirection('right');
          }
          if (aPressed && !prevStates.a) {
            activateElement();
          }

          // Update previous states
          prevStates.up = upPressed;
          prevStates.down = downPressed;
          prevStates.left = leftPressed;
          prevStates.right = rightPressed;
          prevStates.a = aPressed;

          // Left analog stick navigation
          const leftStickX = gamepad.axes[0] || 0;
          const leftStickY = gamepad.axes[1] || 0;
          const deadzone = 0.3;

          if (!prevStates.stickMoved && (Math.abs(leftStickX) > deadzone || Math.abs(leftStickY) > deadzone)) {
            if (Math.abs(leftStickX) > Math.abs(leftStickY)) {
              if (leftStickX > deadzone) {
                navigateDirection('right');
              } else if (leftStickX < -deadzone) {
                navigateDirection('left');
              }
            } else {
              if (leftStickY > deadzone) {
                navigateDirection('down');
              } else if (leftStickY < -deadzone) {
                navigateDirection('up');
              }
            }
            prevStates.stickMoved = true;
          } else if (Math.abs(leftStickX) <= deadzone && Math.abs(leftStickY) <= deadzone) {
            prevStates.stickMoved = false;
          }

          // Right analog stick page scrolling
          const rightStickX = gamepad.axes[2] || 0;
          const rightStickY = gamepad.axes[3] || 0;
          const scrollDeadzone = 0.2;
          const scrollSpeed = 8;

          if (Math.abs(rightStickY) > scrollDeadzone) {
            const scrollAmount = rightStickY * scrollSpeed;
            window.scrollBy(0, scrollAmount);
          }
          
          if (Math.abs(rightStickX) > scrollDeadzone) {
            const scrollAmount = rightStickX * scrollSpeed;
            window.scrollBy(scrollAmount, 0);
          }
        }
      }

      setIsGamepadConnected(connected);
      animationFrame = requestAnimationFrame(checkGamepads);
    };

    checkGamepads();

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [navigateDirection, activateElement, isEnabled]);

  // Hide focus indicator on mouse movement
  useEffect(() => {
    if (!isEnabled) return;

    const handleMouseMove = () => {
      setShowFocusIndicator(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [isEnabled]);

  // Add/remove CSS class to body to control focus indicator visibility
  useEffect(() => {
    if (showFocusIndicator) {
      document.body.classList.add('gamepad-navigation-active');
    } else {
      document.body.classList.remove('gamepad-navigation-active');
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('gamepad-navigation-active');
    };
  }, [showFocusIndicator]);

  // Handle initial focus when elements are available  
  useEffect(() => {
    if (navigableElements.length > 0 && !focusedElement) {
      const firstElement = navigableElements[0];
      setFocusedElement(firstElement);
      // Don't focus initially - let autoFocus handle it
      // firstElement.focus();
    }
  }, [navigableElements.length]); // Only depend on length, not the array itself
  
  // Sync focus state when elements gain focus outside of gamepad navigation
  useEffect(() => {
    if (!isEnabled) return;
    
    const handleFocusChange = (e) => {
      // Check if the focused element is a navigable element
      const target = e.target;
      if (target && target.getAttribute('data-gamepad-focusable') === 'true') {
        // Register elements first to ensure the list is up to date
        registerNavigableElements();
        // Small delay to let the registration complete
        setTimeout(() => {
          // Find the element in our navigable elements list
          const currentNavigableElements = Array.from(
            document.querySelectorAll('[data-gamepad-focusable="true"]:not([disabled]), [data-gamepad-scrollable="true"]')
          );
          
          if (currentNavigableElements.includes(target)) {
            setFocusedElement(target);
            // Don't show focus indicator on programmatic focus (like autoFocus)
            // Only show it when navigating with keyboard/gamepad
            // setShowFocusIndicator(true);
          }
        }, 0);
      }
    };
    
    // Listen for focus events globally to catch autoFocus and programmatic focus changes
    document.addEventListener('focus', handleFocusChange, true); // Use capture phase
    
    return () => {
      document.removeEventListener('focus', handleFocusChange, true);
    };
  }, [isEnabled, registerNavigableElements]);

  // Re-register elements when DOM changes
  useEffect(() => {
    if (!isEnabled) return;
    
    const observer = new MutationObserver(registerNavigableElements);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-gamepad-focusable', 'disabled']
    });
    
    // Initial registration
    registerNavigableElements();
    
    return () => observer.disconnect();
  }, [registerNavigableElements, isEnabled]);

  return {
    focusedElement,
    isGamepadConnected,
    showFocusIndicator,
    registerNavigableElements
  };
};