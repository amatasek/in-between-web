import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.appliedmethod.inbetween',
  appName: 'In-Between',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  ios: {
    contentInset: 'never'
  },
  plugins: {
    CapacitorUpdater: {
      autoUpdate: true,
      resetWhenUpdate: false
    }
  }
};

export default config;
