import { useEffect, useRef } from 'react';
import { Capacitor } from '@capacitor/core';
import { useAuth } from '../contexts/AuthContext';
import styles from './styles/AdSideBanner.module.css';

/**
 * AdSideBanner - Vertical side banner ad for desktop
 *
 * Web: Shows Google AdSense vertical banner ad
 * Mobile: Returns null (use AdMob instead)
 *
 * @param {string} position - 'left' or 'right'
 * @param {number} minWidth - Minimum screen width to show (default: 1000)
 */
const AdSideBanner = ({ position = 'left', minWidth = 1000 }) => {
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
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error('[AdSideBanner] Error loading ad:', error);
      }
    }
  }, [isNativeApp]);

  if (isNativeApp || !showAds) {
    return null;
  }

  const widthClass = minWidth === 1200 ? styles.minWidth1200 : styles.minWidth1000;

  return (
    <div className={`${styles.adSideBannerContainer} ${styles[position]} ${widthClass}`} ref={adContainerRef}>
      <div className={styles.adPlaceholder}>
        <span className={styles.adLabel}>Test Ad - 160x600</span>
      </div>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-3800145998419517"
        data-ad-slot="VERTICAL_AD_UNIT_ID"
        data-ad-format="vertical"
      />
    </div>
  );
};

export default AdSideBanner;
