import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import styles from './styles/AdMobInterstitial.module.css';

/**
 * AdMobInterstitial - Full-screen mobile interstitial ad placeholder
 *
 * This is a PLACEHOLDER component for testing mobile ad layouts.
 * Replace with actual AdMob integration when implementing native ads.
 *
 * Shows after each game with 5-second countdown before user can close.
 *
 * AdMob Interstitial API (for future implementation):
 * - Use @capacitor-community/admob plugin
 * - Load ad: AdMob.prepareInterstitial({ adId: 'YOUR_AD_UNIT_ID' })
 * - Show ad: AdMob.showInterstitial()
 */
const AdMobInterstitial = ({ onClose }) => {
  const [countdown, setCountdown] = useState(5);
  const [canClose, setCanClose] = useState(false);
  const { user } = useAuth();
  const showAds = !user?.subscription?.isPremium;

  useEffect(() => {
    if (!showAds) {
      onClose();
      return;
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
  }, [showAds, onClose]);

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
        <div className={styles.adContainer}>
          <div className={styles.placeholderContent}>
            <div className={styles.adMobLogo}>Advertisement</div>
            <div className={styles.adTitle}>Interstitial Ad Placeholder</div>
            <div className={styles.adDescription}>
              This is a test placeholder for mobile interstitial ads
            </div>
            <div className={styles.adSize}>Full Screen - 320x480+</div>
          </div>
        </div>

        <div className={styles.closeButtonContainer}>
          {canClose ? (
            <button
              type="button"
              className={`btn btn-primary ${styles.closeButton}`}
              onClick={handleClose}
            >
              Close Ad
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

export default AdMobInterstitial;
