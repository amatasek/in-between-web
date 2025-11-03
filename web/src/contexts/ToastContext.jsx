import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useSocket } from './SocketContext';
import Toast from '../components/common/Toast';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const [toastQueue, setToastQueue] = useState([]);
  const [lastToastTime, setLastToastTime] = useState(0);
  const { socket } = useSocket();

  const addToast = useCallback((title, message, emoji = 'ℹ', color = '#3498db', duration = 4000) => {
    const id = Date.now() + Math.random();
    const newToast = { id, title, message, emoji, color, duration };
    
    const now = Date.now();
    const timeSinceLastToast = now - lastToastTime;
    
    if (timeSinceLastToast >= 600) {
      // Show immediately if enough time has passed
      setToasts(prev => [...prev, newToast]);
      setLastToastTime(now);
    } else {
      // Queue the toast for later
      setToastQueue(prev => [...prev, newToast]);
    }
    
    return id;
  }, [lastToastTime]);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  // Convenience methods for common notification patterns
  const showSuccess = useCallback((title, message, duration) => {
    return addToast(title, message, '✓', '#27ae60', duration);
  }, [addToast]);

  const showError = useCallback((title, message, duration) => {
    return addToast(title, message, '✕', '#e74c3c', duration);
  }, [addToast]);

  const showWarning = useCallback((title, message, duration) => {
    return addToast(title, message, '⚠', '#f39c12', duration);
  }, [addToast]);

  const showInfo = useCallback((title, message, duration) => {
    return addToast(title, message, 'ℹ', '#3498db', duration);
  }, [addToast]);

  const showGameEvent = useCallback((title, message, duration) => {
    return addToast(title, message, '🎮', '#9b59b6', duration);
  }, [addToast]);

  const showMoneyEvent = useCallback((title, message, duration) => {
    return addToast(title, message, '💰', '#16a085', duration);
  }, [addToast]);

  // Process queued toasts with debouncing
  useEffect(() => {
    if (toastQueue.length === 0) return;

    const timer = setTimeout(() => {
      const nextToast = toastQueue[0];
      setToastQueue(prev => prev.slice(1));
      setToasts(prev => [...prev, nextToast]);
      setLastToastTime(Date.now());
    }, 600);

    return () => clearTimeout(timer);
  }, [toastQueue, toasts]); // Trigger when queue changes or when toasts change

  // Socket event listeners for toast notifications
  useEffect(() => {
    if (!socket) return;

    // Generic toast handler
    const handleToast = (data) => {
      addToast(data.title || '', data.message, data.emoji || 'ℹ', data.color || '#3498db', data.duration);
    };

    // Register socket event listener
    socket.on('toast', handleToast);

    // Cleanup
    return () => {
      socket.off('toast', handleToast);
    };
  }, [socket, addToast]);

  const value = {
    addToast,
    removeToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showGameEvent,
    showMoneyEvent,
    toasts
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toast-container" style={{ position: 'fixed', top: 0, right: 0, zIndex: 10000 }}>
        {toasts.map((toast, index) => (
          <Toast
            key={toast.id}
            title={toast.title}
            message={toast.message}
            emoji={toast.emoji}
            color={toast.color}
            duration={toast.duration}
            position={index}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};