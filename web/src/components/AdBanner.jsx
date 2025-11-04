import { useEffect, useRef } from 'react';
import { Capacitor } from '@capacitor/core';
import { useAuth } from '../contexts/AuthContext';
import AdMobBanner from './AdMobBanner';
import styles from './styles/AdBanner.module.css';

/**
 * AdBanner - Banner ad component for lobby
 *
 * Web: Shows Google AdSense banner ad
 * Mobile: Shows AdMob banner placeholder
 *
 * @param {number} hideAtWidth - Hide banner at this width (default: 1200 for GameRoom)
 */
const AdBanner = ({ hideAtWidth = 1200 }) => {
  const adContainerRef = useRef(null);
  const isNativeApp = Capacitor.isNativePlatform();
  const { user } = useAuth();
  const showAds = !user?.subscription?.isPremium;

  useEffect(() => {
    if (isNativeApp) {
      return;
    }

    if (adContainerRef.current && window.adsbygoogle) {
      try {
        // Initialize both ad units (only one will be visible at a time)
        const adElements = adContainerRef.current.querySelectorAll('.adsbygoogle');
        adElements.forEach(() => {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        });
      } catch (error) {
        console.error('[AdBanner] Error loading ads:', error);
      }
    }
  }, [isNativeApp]);

  // Show AdMob placeholder on native mobile apps
  if (isNativeApp) {
    return <AdMobBanner size="large" />;
  }

  if (!showAds) {
    return null;
  }

  const widthClass = hideAtWidth === 1000 ? styles.hideAt1000 : styles.hideAt1200;

  return (
    <div className={`${styles.adBannerContainer} ${widthClass}`} ref={adContainerRef}>
      {/* Desktop Ad - 728x90 */}
      <div className={styles.desktopAd}>
        <div className={styles.adPlaceholder}>
          <span className={styles.adLabel}>Test Ad - 728x90</span>
        </div>
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-3800145998419517"
          data-ad-slot="DESKTOP_BANNER_AD_UNIT_ID"
          data-ad-format="horizontal"
        />
      </div>

      {/* Mobile/Tablet Ad - 320x100 */}
      <div className={styles.mobileAd}>
        <div className={styles.adPlaceholder}>
          <span className={styles.adLabel}>Test Ad - 320x100</span>
        </div>
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-3800145998419517"
          data-ad-slot="MOBILE_BANNER_AD_UNIT_ID"
          data-ad-format="horizontal"
        />
      </div>
    </div>
  );
};

export default AdBanner;
