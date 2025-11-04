import { useEffect, useRef, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { useAuth } from '../contexts/AuthContext';
import AdMobInterstitial from './AdMobInterstitial';
import styles from './styles/AdInterstitial.module.css';

/**
 * AdInterstitial - Full-screen interstitial ad
 *
 * Shows after each game with 5-second countdown
 * Web: Shows Google AdSense interstitial ad
 * Mobile: Shows AdMob interstitial placeholder
 */
const AdInterstitial = ({ onClose }) => {
  const [countdown, setCountdown] = useState(5);
  const [canClose, setCanClose] = useState(false);
  const adContainerRef = useRef(null);
  const isNativeApp = Capacitor.isNativePlatform();
  const { user } = useAuth();
  const showAds = !user?.subscription?.isPremium;

  useEffect(() => {
    if (isNativeApp) {
      return;
    }

    if (!showAds) {
      onClose();
      return;
    }

    if (adContainerRef.current && window.adsbygoogle) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error('[AdInterstitial] Error loading ad:', error);
      }
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setCanClose(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isNativeApp, showAds, onClose]);

  // Show AdMob placeholder on native mobile apps
  if (isNativeApp) {
    return <AdMobInterstitial onClose={onClose} />;
  }

  if (!showAds) {
    return null;
  }

  const handleClose = () => {
    if (canClose) {
      onClose();
    }
  };

  return (
    <div className={styles.interstitialOverlay}>
      <div className={styles.interstitialContent}>
        <div className={styles.adContainer} ref={adContainerRef}>
          <div className={styles.adPlaceholder}>
            <span className={styles.adLabel}>Full Screen Ad</span>
          </div>
          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-3800145998419517"
            data-ad-slot="INTERSTITIAL_AD_UNIT_ID"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>

        <div className={styles.closeButtonContainer}>
          {canClose ? (
            <button
              type="button"
              className={`btn btn-primary ${styles.closeButton}`}
              onClick={handleClose}
            >
              Close
            </button>
          ) : (
            <div className={styles.countdown}>
              Please wait {countdown} second{countdown !== 1 ? 's' : ''}...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdInterstitial;
