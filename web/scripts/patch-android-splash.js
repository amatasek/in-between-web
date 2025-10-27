#!/usr/bin/env node

/**
 * Patches Android styles.xml to use the generated splash screen directly
 * Run automatically after `cap add android` via capacitor hook
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const stylesPath = join(__dirname, '..', 'android', 'app', 'src', 'main', 'res', 'values', 'styles.xml');

try {
  let content = readFileSync(stylesPath, 'utf8');

  // Replace the splash screen theme to use drawable directly
  const oldTheme = /<style name="AppTheme\.NoActionBarLaunch" parent="Theme\.SplashScreen">[\s\S]*?<\/style>/;
  const newTheme = `<style name="AppTheme.NoActionBarLaunch" parent="AppTheme.NoActionBar">
        <item name="android:windowBackground">@drawable/splash</item>
    </style>`;

  if (oldTheme.test(content)) {
    content = content.replace(oldTheme, newTheme);
    writeFileSync(stylesPath, content, 'utf8');
    console.log('✅ Patched Android splash screen theme');
  } else {
    console.log('ℹ️  Android splash theme already patched or not found');
  }
} catch (error) {
  console.error('⚠️  Could not patch Android styles:', error.message);
}
