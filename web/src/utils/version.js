import { Capacitor } from '@capacitor/core';
import { CapacitorUpdater } from '@capgo/capacitor-updater';
import packageJson from '../../package.json';

export async function getVersionInfo() {
  const isNative = Capacitor.isNativePlatform();

  if (isNative) {
    try {
      const bundleInfo = await CapacitorUpdater.current();
      const bundleVersion = bundleInfo.bundle.version;

      if (bundleVersion === 'builtin') {
        return {
          version: packageJson.version,
          build: 'builtin',
          display: `v${packageJson.version}`
        };
      }

      return {
        version: packageJson.version,
        build: bundleVersion,
        display: `v${bundleVersion}`
      };
    } catch {
      return {
        version: packageJson.version,
        build: 'unknown',
        display: `v${packageJson.version}`
      };
    }
  }

  return {
    version: packageJson.version,
    build: 'web',
    display: `v${packageJson.version}`
  };
}
