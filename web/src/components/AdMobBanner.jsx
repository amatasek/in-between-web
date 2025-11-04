import { useAuth } from '../contexts/AuthContext';
import styles from './styles/AdMobBanner.module.css';

/**
 * AdMobBanner - Mobile banner ad placeholder for layout testing
 *
 * This is a PLACEHOLDER component for testing mobile ad layouts.
 * Replace with actual AdMob integration when implementing native ads.
 *
 * Standard AdMob banner sizes:
 * - BANNER: 320x50
 * - LARGE_BANNER: 320x100
 * - MEDIUM_RECTANGLE: 300x250 (most popular for mobile)
 * - SMART_BANNER: Full width, adaptive height
 *
 * @param {string} size - 'banner' (320x50), 'large' (320x100), or 'rectangle' (300x250), default: 'large'
 */
const AdMobBanner = ({ size = 'large' }) => {
  const { user } = useAuth();
  const showAds = !user?.subscription?.isPremium;

  if (!showAds) {
    return null;
  }

  const sizeClass =
    size === 'large' ? styles.largeBanner :
    size === 'banner' ? styles.banner :
    styles.mediumRectangle;

  const sizeLabel =
    size === 'large' ? '320x100' :
    size === 'banner' ? '320x50' :
    '300x250';

  return (
    <div className={`${styles.adMobBannerContainer} ${sizeClass}`}>
      <div className={styles.placeholderContent}>
        <div className={styles.adMobLogo}>Advertisement</div>
        <span className={styles.adLabel}>Test Ad - {sizeLabel}</span>
      </div>
    </div>
  );
};

export default AdMobBanner;
