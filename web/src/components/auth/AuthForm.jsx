import React, { useState, useRef, useEffect } from 'react';
import { useVirtualKeyboardContext } from '../../contexts/VirtualKeyboardContext';
import styles from './AuthForm.module.css';

const AuthForm = ({ onSubmit, mode }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const { enhanceInput } = useVirtualKeyboardContext();

  // Enhance inputs for virtual keyboard
  useEffect(() => {
    let cleanupUsername;
    let cleanupPassword;
    
    if (usernameRef.current) {
      cleanupUsername = enhanceInput(usernameRef.current, 'text', 'Enter Username');
    }
    
    if (passwordRef.current) {
      cleanupPassword = enhanceInput(passwordRef.current, 'password', 'Enter Password');
    }
    
    return () => {
      if (cleanupUsername) cleanupUsername();
      if (cleanupPassword) cleanupPassword();
    };
  }, [enhanceInput]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      await onSubmit(username, password);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={`card ${styles.authForm}`}>
      <h2 style={{ color: 'var(--text-primary)', fontWeight: 600, textAlign: 'center', marginTop: 0 }}>
        {mode === 'login' ? 'Welcome Back' : 'Create Account'}
      </h2>
      <div className="divider" style={{ marginBottom: '1.5rem' }}></div>
      
      {error && (
        <div className={styles.errorAlert}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="username" className="input-label required">
            Username
          </label>
          <input
            ref={usernameRef}
            id="username"
            type="text"
            className="no-validation"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength={3}
            data-gamepad-focusable="true"
            autoCapitalize="none"
            autoCorrect="off"
            autoComplete="username"
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="password" className="input-label required">
            Password
          </label>
          <input
            ref={passwordRef}
            id="password"
            type="password"
            className="no-validation"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            data-gamepad-focusable="true"
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          data-gamepad-focusable="true"
        >
          {mode === 'login' ? 'Sign In' : 'Create Account'}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;