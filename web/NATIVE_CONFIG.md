# Native Configuration

## Philosophy

We commit only the native files we manually configure. Everything else (build outputs, generated projects, assets) stays ignored.

**Minimal automation via local Capacitor plugin. Everything else is git.**

Why this works:
- Git shows exactly what `cap sync` changes after each build
- You decide what to keep and what to reject
- Only automate if you find yourself restoring the same file repeatedly
- Discovery-driven: learn what actually needs automation through usage

This beats premature optimization. Scripts are maintenance debt. Only add them when the pain is real.

## Local Plugin

We use a local Capacitor plugin (`plugins/google-signin-config`) to automatically handle:
- Google Sign-In pod dependency
- GoogleSignIn SDK version pinning

This eliminates the most repetitive manual config. Everything else stays in git.

## Tracked Native Files

### iOS
- `ios/App/Podfile` - Google Sign-In pod + code signing fix
- `ios/App/Podfile.lock` - Pod versions
- `ios/App/App/Info.plist` - URL scheme
- `ios/App/App/GoogleService-Info.plist` - Firebase config
- `ios/App/App.xcodeproj/project.pbxproj` - Xcode project (keeps GoogleService-Info.plist referenced)

### Android
- `android/app/build.gradle` - Version numbers
- `android/app/google-services.json` - Firebase config
- `android/app/src/main/res/values/styles.xml` - Splash screen theme

## Workflow

```bash
npm run sync              # Build + sync + show git status
git diff ios/ android/    # See what cap sync changed
```

Review changes:
- Accept: `git add <file>`
- Reject: `git restore <file>`

## Note

Firebase config files are public (not secrets). Safe to commit.
