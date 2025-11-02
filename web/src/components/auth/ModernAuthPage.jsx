import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { authService } from '../../services/authService';
import { useGamepadNavigation } from '../../hooks/useGamepadNavigation';
import SocialButton from './SocialButton';
import AppHeader from '../common/AppHeader';
import { getVersionInfo } from '../../utils/version';
import { openInBrowser } from '../../utils/openInBrowser';
import { WEB_URL } from '../../config';
import styles from './ModernAuthPage.module.css';

const ModernAuthPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(null); // Which provider is loading
  const [error, setError] = useState(null);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailLoading, setEmailLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [versionInfo, setVersionInfo] = useState(null);

  // Disable gamepad navigation on auth screen
  useGamepadNavigation(false);

  // Get version info
  useEffect(() => {
    getVersionInfo().then(setVersionInfo);
  }, []);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSocialLogin = async (provider) => {
    setError(null);
    setLoading(provider);

    try {
      switch (provider) {
        case 'apple':
          await authService.signInWithApple();
          break;
        case 'google':
          await authService.signInWithGoogle();
          break;
        case 'facebook':
          await authService.signInWithFacebook();
          break;
        default:
          throw new Error('Unknown provider');
      }
      // Auth context will handle redirect automatically
    } catch (err) {
      setError(authService.getErrorMessage(err));
    } finally {
      setLoading(null);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError(null);
    setEmailLoading(true);

    try {
      if (isSignUp) {
        await authService.createAccountWithEmail(email, password);
      } else {
        await authService.signInWithEmail(email, password);
      }
      // Auth context will handle redirect automatically
    } catch (err) {
      setError(authService.getErrorMessage(err));
    } finally {
      setEmailLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError(null);
    setEmailLoading(true);

    try {
      if (!email) {
        setError('Please enter your email address');
        return;
      }
      await authService.sendPasswordResetEmail(email);
      setResetEmailSent(true);
    } catch (err) {
      setError(authService.getErrorMessage(err));
    } finally {
      setEmailLoading(false);
    }
  };

  return (
    <div className={`screen app-gradient-bg ${styles.authPage}`}>
      <AppHeader />

      <div className={styles.container}>
        {/* Temporary Migration Banner - Remove after a few days */}
        <div className={styles.migrationBanner}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
          </svg>
          <span>
            Have an existing account?{' '}
            <button
              type="button"
              className={styles.migrationLink}
              onClick={() => navigate('/migrate')}
            >
              Migrate your account
            </button>
          </span>
        </div>

        <div className={styles.content}>
          {/* Error Message */}
          {error && (
            <div className={styles.errorAlert}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
              <span>{error}</span>
            </div>
          )}

          {!showEmailForm ? (
            <>
              {/* Social Login Buttons */}
              <div className={styles.socialButtons}>
                {/* Temporarily disabled - requires Apple Developer enrollment
                <SocialButton
                  provider="apple"
                  onClick={() => handleSocialLogin('apple')}
                  disabled={loading !== null}
                  loading={loading === 'apple'}
                />
                */}
                <SocialButton
                  provider="google"
                  onClick={() => handleSocialLogin('google')}
                  disabled={loading !== null}
                  loading={loading === 'google'}
                />
                <SocialButton
                  provider="facebook"
                  onClick={() => handleSocialLogin('facebook')}
                  disabled={loading !== null}
                  loading={loading === 'facebook'}
                />
              </div>

              {/* Privacy Note */}
              <p className={styles.privacyNote}>
                We only access your email address
              </p>

              {/* Divider */}
              <div className={styles.divider}>
                <span>or</span>
              </div>

              {/* Email Sign In Button */}
              <button
                type="button"
                className={styles.emailButton}
                onClick={() => setShowEmailForm(true)}
                disabled={loading !== null}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="5" width="18" height="14" rx="2"/>
                  <path d="M3 7l9 6 9-6"/>
                </svg>
                <span>Continue with Email</span>
              </button>
            </>
          ) : showForgotPassword ? (
            <>
              {/* Forgot Password Form */}
              {resetEmailSent ? (
                <div className={styles.successMessage}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                  <h3>Check your email</h3>
                  <p>We've sent a password reset link to <strong>{email}</strong></p>
                  <button
                    type="button"
                    className={styles.backButton}
                    onClick={() => {
                      setShowForgotPassword(false);
                      setResetEmailSent(false);
                      setEmail('');
                    }}
                  >
                    ← Back to sign in
                  </button>
                </div>
              ) : (
                <form onSubmit={handleForgotPassword} className={styles.emailForm}>
                  <p className={styles.forgotPasswordText}>
                    Enter your email address and we'll send you a link to reset your password.
                  </p>

                  <div className={styles.inputGroup}>
                    <label htmlFor="reset-email" className={styles.label}>Email</label>
                    <input
                      id="reset-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={styles.input}
                      placeholder="your@email.com"
                      required
                      autoComplete="email"
                      autoFocus
                    />
                  </div>

                  <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={emailLoading}
                  >
                    {emailLoading ? (
                      <div className={styles.spinner}></div>
                    ) : (
                      'Send reset link'
                    )}
                  </button>

                  <button
                    type="button"
                    className={styles.backButton}
                    onClick={() => {
                      setShowForgotPassword(false);
                      setError(null);
                    }}
                    disabled={emailLoading}
                  >
                    ← Back to sign in
                  </button>
                </form>
              )}
            </>
          ) : (
            <>
              {/* Email/Password Form */}
              <form onSubmit={handleEmailAuth} className={styles.emailForm}>
                <div className={styles.inputGroup}>
                  <label htmlFor="email" className={styles.label}>Email</label>
                  <input
                    id="email"
                    name="username"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.input}
                    placeholder="your@email.com"
                    required
                    autoComplete="username"
                    autoFocus
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="password" className={styles.label}>Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.input}
                    placeholder="••••••••"
                    required
                    autoComplete={isSignUp ? 'new-password' : 'current-password'}
                    minLength="6"
                  />
                  {!isSignUp && (
                    <button
                      type="button"
                      className={styles.forgotPasswordLink}
                      onClick={() => setShowForgotPassword(true)}
                    >
                      Forgot password?
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={emailLoading}
                >
                  {emailLoading ? (
                    <div className={styles.spinner}></div>
                  ) : (
                    isSignUp ? 'Create Account' : 'Sign In'
                  )}
                </button>

                <button
                  type="button"
                  className={styles.toggleMode}
                  onClick={() => setIsSignUp(!isSignUp)}
                  disabled={emailLoading}
                >
                  {isSignUp ? 'Already have an account? Sign in' : 'Need an account? Sign up'}
                </button>

                <button
                  type="button"
                  className={styles.backButton}
                  onClick={() => {
                    setShowEmailForm(false);
                    setShowForgotPassword(false);
                    setError(null);
                  }}
                  disabled={emailLoading}
                >
                  ← Back to all sign-in options
                </button>
              </form>
            </>
          )}
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <div className={styles.footerLinks}>
            <button onClick={() => openInBrowser(`${WEB_URL}/terms`)} className={styles.footerLink}>Terms of Service</button>
            <span className={styles.footerDivider}>•</span>
            <button onClick={() => openInBrowser(`${WEB_URL}/privacy`)} className={styles.footerLink}>Privacy Policy</button>
          </div>
          {versionInfo && (
            <div className={styles.footerVersion}>{versionInfo.display}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernAuthPage;
