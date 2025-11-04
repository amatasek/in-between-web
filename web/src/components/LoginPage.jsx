import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { authService } from '../services/auth/authService';
import { useGamepadNavigation } from '../hooks/useGamepadNavigation';
import AppHeader from './common/AppHeader';
import SocialButton from './common/SocialButton';
import Footer from './common/Footer';
import styles from './styles/LoginPage.module.css';
import { Info, AlertCircle, Mail, CheckCircle } from 'lucide-react';

const LoginPage = () => {
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

  // Disable gamepad navigation on auth screen
  useGamepadNavigation(false);

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
          <Info size={16} />
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
              <AlertCircle size={20} />
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
                <Mail size={20} />
                <span>Continue with Email</span>
              </button>
            </>
          ) : showForgotPassword ? (
            <>
              {/* Forgot Password Form */}
              {resetEmailSent ? (
                <div className={styles.successMessage}>
                  <CheckCircle size={48} />
                  <h3>Check your email</h3>
                  <p>{"We've sent a password reset link to "}<strong>{email}</strong></p>
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
                    {"Enter your email address and we'll send you a link to reset your password."}
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
                      <div className={styles.spinner} />
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
                    <div className={styles.spinner} />
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
      </div>

      <Footer />
    </div>
  );
};

export default LoginPage;
