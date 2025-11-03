import { useEffect, useRef, useState } from 'react';
import { useVirtualKeyboardContext } from '../contexts/VirtualKeyboardContext';
import styles from './styles/TempMigrateForm.module.css';

const TempMigrateForm = ({ onSubmit, mode, requireEmail = false, title = null, description = null }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const emailRef = useRef(null);
  const { enhanceInput } = useVirtualKeyboardContext();

  // Enhance inputs for virtual keyboard
  useEffect(() => {
    let cleanupUsername;
    let cleanupPassword;
    let cleanupEmail;

    if (usernameRef.current) {
      cleanupUsername = enhanceInput(usernameRef.current, 'text', 'Enter Username');
    }

    if (passwordRef.current) {
      cleanupPassword = enhanceInput(passwordRef.current, 'password', 'Enter Password');
    }

    if (emailRef.current && requireEmail) {
      cleanupEmail = enhanceInput(emailRef.current, 'email', 'Enter Email');
    }

    return () => {
      if (cleanupUsername) cleanupUsername();
      if (cleanupPassword) cleanupPassword();
      if (cleanupEmail) cleanupEmail();
    };
  }, [enhanceInput, requireEmail]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (requireEmail) {
        await onSubmit(username, password, email);
      } else {
        await onSubmit(username, password);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={`card ${styles.authForm}`}>
      <h2 style={{ color: 'var(--text-primary)', fontWeight: 600, textAlign: 'center', marginTop: 0 }}>
        {title || (mode === 'login' ? 'Welcome Back' : mode === 'migrate' ? 'Migrate Your Account' : 'Create Account')}
      </h2>
      {description && (
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '1rem' }}>
          {description}
        </p>
      )}
      <div className="divider" style={{ marginBottom: '1.5rem' }} />

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

        {requireEmail && (
          <div className="input-group">
            <label htmlFor="email" className="input-label required">
              Email
            </label>
            <input
              ref={emailRef}
              id="email"
              type="email"
              className="no-validation"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              data-gamepad-focusable="true"
              autoCapitalize="none"
              autoCorrect="off"
              autoComplete="email"
            />
          </div>
        )}

        <button
          type="submit"
          className="btn btn-primary"
          data-gamepad-focusable="true"
        >
          {mode === 'login' ? 'Sign In' : mode === 'migrate' ? 'Migrate Account' : 'Create Account'}
        </button>
      </form>
    </div>
  );
};

export default TempMigrateForm;