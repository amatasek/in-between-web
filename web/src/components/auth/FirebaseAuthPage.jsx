import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as firebaseui from 'firebaseui';
import { auth } from '../../services/firebase';
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
  EmailAuthProvider
} from 'firebase/auth';
import { useAuth } from '../../contexts/AuthContext';
import { useGamepadNavigation } from '../../hooks/useGamepadNavigation';
import styles from './AuthPage.module.css';
import AppHeader from '../common/AppHeader';
import 'firebaseui/dist/firebaseui.css';

const FirebaseAuthPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [error, setError] = useState(null);
  const uiContainerRef = useRef(null);

  // Disable gamepad navigation on auth screen (users need to type in forms)
  useGamepadNavigation(false);

  // If user is already logged in, redirect to lobby
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  // Initialize FirebaseUI
  useEffect(() => {
    if (!uiContainerRef.current) return;

    // Get or create FirebaseUI instance
    const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);

    const uiConfig = {
      signInSuccessUrl: '/',
      signInOptions: [
        // GoogleAuthProvider.PROVIDER_ID,
        // 'apple.com',
        // FacebookAuthProvider.PROVIDER_ID,
        {
          provider: EmailAuthProvider.PROVIDER_ID,
          requireDisplayName: false,
          signInMethod: EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD
        }
      ],
      tosUrl: '/terms',
      privacyPolicyUrl: '/privacy',
      callbacks: {
        signInSuccessWithAuthResult: () => {
          // Return false to prevent redirect, let AuthContext handle it
          return false;
        },
        signInFailure: (error) => {
          console.error('[FirebaseUI] Sign in error:', error);
          setError(error.message);
        }
      }
    };

    // Start FirebaseUI
    ui.start(uiContainerRef.current, uiConfig);

    // Cleanup
    return () => {
      ui.reset();
    };
  }, [navigate]);

  return (
    <div className={`screen ${styles.authPage}`}>
      <AppHeader />

      <div className={styles.formContainer}>
        <button
          className={styles.migrateBanner}
          onClick={() => navigate('/migrate')}
        >
          Have an existing account? Migrate Your Account
        </button>

        {error && (
          <div className={styles.errorAlert}>
            {error}
          </div>
        )}

        {/* FirebaseUI Container */}
        <div ref={uiContainerRef}></div>
      </div>
    </div>
  );
};

export default FirebaseAuthPage;
