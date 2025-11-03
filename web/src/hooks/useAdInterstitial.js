import { useState, useCallback } from 'react';

/**
 * useAdInterstitial - Hook to manage interstitial ad display
 *
 * Returns:
 *   - shouldShowAd: boolean to render AdInterstitial component
 *   - showAd: function to trigger ad display
 *   - hideAd: function to close ad
 */
export const useAdInterstitial = () => {
  const [shouldShowAd, setShouldShowAd] = useState(false);

  const showAd = useCallback(() => {
    setShouldShowAd(true);
  }, []);

  const hideAd = useCallback(() => {
    setShouldShowAd(false);
  }, []);

  return {
    shouldShowAd,
    showAd,
    hideAd,
  };
};
