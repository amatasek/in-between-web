import { useEffect, useRef } from 'react';
import { Capacitor } from '@capacitor/core';
import { useAds } from '../contexts/AdContext';
import styles from './styles/AdBanner.module.css';

/**
 * AdBanner - Banner ad component for lobby
 *
 * Web: Shows Google AdSense banner ad
 * Mobile: Returns null (use AdMob instead)
 *
 * @param {number} hideAtWidth - Hide banner at this width (default: 1200 for GameRoom)
 */
const AdBanner = ({ hideAtWidth = 1200 }) => {
  const adContainerRef = useRef(null);
  const isNativeApp = Capacitor.isNativePlatform();
  const { showAds } = useAds();

  useEffect(() => {
    if (isNativeApp) {
      return;
    }

    if (adContainerRef.current && window.adsbygoogle) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error('[AdBanner] Error loading ad:', error);
      }
    }
  }, [isNativeApp]);

  if (isNativeApp || !showAds) {
    return null;
  }

  const widthClass = hideAtWidth === 1000 ? styles.hideAt1000 : styles.hideAt1200;

  return (
    <div className={`${styles.adBannerContainer} ${widthClass}`} ref={adContainerRef}>
      <div className={styles.adPlaceholder}>
        <span className={styles.adLabel}>Advertisement</span>
      </div>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-3800145998419517"
        data-ad-slot="BANNER_AD_UNIT_ID"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdBanner;
