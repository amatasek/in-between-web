import { Capacitor } from '@capacitor/core';
import { Browser } from '@capacitor/browser';

/**
 * Opens a URL in a new tab on web, or in the in-app browser on mobile Capacitor apps
 * @param {string} url - The full URL to open
 */
export const openInBrowser = async (url) => {
  // On web, use target="_blank" behavior
  if (!Capacitor.isNativePlatform()) {
    window.open(url, '_blank');
    return;
  }

  // On Capacitor (iOS/Android), use the Browser plugin
  await Browser.open({
    url,
    presentationStyle: 'popover' // Opens as overlay on iOS
  });
};
