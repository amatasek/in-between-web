import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGamepadNavigation } from '../../hooks/useGamepadNavigation';
import styles from './AuthPage.module.css';
import { API_URL } from '../../config.js';
import { auth } from '../../services/firebase';
import { signInWithCustomToken } from 'firebase/auth';

const AuthPage = () => {
  const navigate = useNavigate();

  // Disable gamepad navigation on migration screen (users need to type in forms)
  useGamepadNavigation(false);

  const [success, setSuccess] = useState(null);

  const handleMigration = async (username, password, email) => {
    if (!username || !password || !email) {
      throw new Error('Username, password, and email are required');
    }

    setSuccess(null);

    try {
      // Call the /auth/migrate endpoint
      const response = await fetch(`${API_URL}/auth/migrate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }),
      });

      let data;
      try {
        data = await response.json();
      } catch (error) {
        console.error('[Client] Error parsing response:', error);
        throw new Error('Invalid response from server');
      }

      if (!response.ok) {
        throw new Error(data.message || 'Migration failed');
      }

      if (!data.customToken) {
        console.error('[Client] Invalid response format: missing customToken');
        throw new Error('Invalid server response format');
      }

      // Sign in to Firebase with the custom token
      await signInWithCustomToken(auth, data.customToken);

      // Show success message and redirect
      setSuccess('Account migrated successfully! Redirecting...');

      // Wait for auth state to update, then redirect to home
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      console.error('[Client] Migration error:', {
        message: error.message
      });
      throw error;
    }
  };

  return (
    <div className={`screen ${styles.authPage}`}>
      <AppHeader />

      <div className={styles.formContainer}>
        {success && (
          <div className={styles.successAlert}>
            {success}
          </div>
        )}

        <AuthForm
          mode="migrate"
          requireEmail={true}
          onSubmit={handleMigration}
          description="Enter your existing username and password, plus an email address to migrate your legacy account."
        />

        <div className={styles.toggleContainer}>
          <button type="button"
            className={styles.toggleButton}
            onClick={() => navigate('/auth')}
            data-gamepad-focusable="true"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;