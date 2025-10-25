# App Assets Documentation

This directory contains the source assets for generating iOS and Android app icons.

## Source Assets

- `icon.svg` - 1024x1024 app icon (square)

## Generating Assets

To regenerate all platform assets, run:

```bash
npx @capacitor/assets generate --iconBackgroundColor '#1a1a1a' --iconBackgroundColorDark '#1a1a1a'
```

This will automatically generate:
- iOS app icons in all required sizes
- PWA icons (WebP format)

**Note**: We intentionally do not use custom splash screens because the app loads fast. The iOS LaunchScreen.storyboard uses a simple dark background (#1a1a1a) that matches the app theme.

## iOS Asset Requirements

### App Icon
- **Source**: 1024x1024 SVG
- **Generated Sizes**: Multiple sizes for different devices
- **Location**: `ios/App/App/Assets.xcassets/AppIcon.appiconset/`
- **Format**: PNG

### Launch Screen
- **Type**: Simple dark background (no custom graphics)
- **Location**: `ios/App/App/Base.lproj/LaunchScreen.storyboard`
- **Background Color**: #1a1a1a (dark)
- **Rationale**: App loads fast, no need for custom splash images

## Android Asset Requirements

### App Icon (When Android is Added)
- **Source**: Same 1024x1024 SVG
- **Required Sizes**:
  - `mipmap-ldpi`: 36x36
  - `mipmap-mdpi`: 48x48
  - `mipmap-hdpi`: 72x72
  - `mipmap-xhdpi`: 96x96
  - `mipmap-xxhdpi`: 144x144
  - `mipmap-xxxhdpi`: 192x192
- **Location**: `android/app/src/main/res/` (in respective mipmap folders)
- **Format**: PNG
- **Adaptive Icon**: Android also requires separate foreground and background layers

### Launch Screen (When Android is Added)
- **Type**: Simple dark background (no custom graphics)
- **Background Color**: #1a1a1a (dark)
- **Rationale**: App loads fast, no need for custom splash images

## Design Guidelines

### App Icon Design
- Simple, recognizable design that works at small sizes
- Avoid text (except key letters/numbers like "A", "?", "K" in our design)
- Use high contrast colors
- Follow platform-specific guidelines:
  - iOS: Rounded square (system applies corner radius)
  - Android: Can be any shape (adaptive icon system)


## Current Design

Our In-Between app icon features:
- Three overlapping playing cards (left, center, right)
- Left card: Red Ace (rotated left)
- Center card: Blue question mark (straight)
- Right card: Black King (rotated right)
- Background: Dark (#1a1a1a)
- App name at bottom

The launch screen is intentionally minimal (just dark background) since the app loads quickly.

## Modifying Assets

To update the app icon:

1. Edit `icon.svg` in this directory
2. Run the asset generation command (see above)
3. Sync changes to native projects: `npx cap sync`
4. Test in simulators/emulators

To update the launch screen appearance:

1. Edit `ios/App/App/Base.lproj/LaunchScreen.storyboard` to change background color or add simple elements
2. For Android (when added), configure in `capacitor.config.ts` or native Android resources

## Notes

- SVG sources allow for infinite scaling without quality loss
- Dark backgrounds work better for OLED screens and dark mode
- Keep icon design simple - it needs to work at 20x20 pixels on some interfaces
- Test assets on actual devices, not just simulators
- Consider A/B testing different icon designs for better app store conversion
- We skip custom splash screens because the app loads fast - a simple dark background is sufficient
