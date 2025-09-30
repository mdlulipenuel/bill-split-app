# Bill Split App - Google Play Store Deployment Guide

## ✅ Completed Setup

Your app has been successfully configured with Capacitor for Android deployment:

- ✅ Capacitor installed and configured
- ✅ Android platform added
- ✅ App icons and splash screens generated
- ✅ Build scripts added to package.json
- ✅ Web app builds and syncs successfully

## 📱 App Details

- **App Name**: Bill Split App
- **Package ID**: com.billsplit.app
- **Platform**: Android (via Capacitor)

## 🚀 Next Steps for Google Play Store

### 1. Install Android Development Tools

You'll need to install:
- **Android Studio** (latest version)
- **Java Development Kit (JDK)** 17 or later
- Configure Android SDK and tools

### 2. Open and Test in Android Studio

```bash
# Open the Android project in Android Studio
npm run android:open
```

This will open Android Studio with your project. You can:
- Build the APK
- Test on emulator or physical device
- Debug any Android-specific issues

### 3. Generate a Signed APK/AAB

For Google Play Store, you need:

1. **Create a keystore file:**
```bash
keytool -genkey -v -keystore bill-split-release-key.keystore -alias bill-split -keyalg RSA -keysize 2048 -validity 10000
```

2. **Configure signing in Android Studio:**
   - Go to Build → Generate Signed Bundle/APK
   - Choose Android App Bundle (AAB) for Play Store
   - Select your keystore and credentials

### 4. Google Play Console Setup

1. **Create Google Play Console account** ($25 one-time fee)
2. **Create a new app:**
   - App name: "Bill Split App"
   - Default language: English
   - App category: Finance or Productivity

3. **Complete app information:**
   - App description
   - Screenshots (various device sizes)
   - App icon (already generated)
   - Feature graphic (1024 x 500 px)

### 5. Required App Store Assets

✅ **Icons**: Already generated in multiple sizes
✅ **Splash screens**: Already generated
⏳ **Screenshots**: Take screenshots of your app running
⏳ **Feature graphic**: 1024 x 500 px promotional image
⏳ **Privacy Policy**: Required for apps that handle user data

### 6. Testing and Release

1. **Internal testing**: Upload your AAB for internal testing
2. **Alpha/Beta testing**: Test with a small group
3. **Production release**: Submit for Google Play review

## 📁 Project Structure

```
bill-split-app/
├── android/                 # Native Android project
├── resources/               # App icons and splash screens
├── src/                     # React source code
├── capacitor.config.json    # Capacitor configuration
└── package.json            # Updated with Android scripts
```

## 🛠️ Available Commands

```bash
# Build web app and sync with Android
npm run android:build

# Open Android project in Android Studio
npm run android:open

# Run on Android device/emulator
npm run android:run

# Regular web development
npm run dev
```

## 📋 Pre-Publication Checklist

- [ ] Test app thoroughly on Android devices
- [ ] Create screenshots for Play Store listing
- [ ] Write app description and metadata
- [ ] Create privacy policy (if needed)
- [ ] Generate signed AAB file
- [ ] Complete Google Play Console setup
- [ ] Submit for review

## 🔧 Troubleshooting

If you encounter issues:

1. **Gradle build errors**: Update Android SDK and build tools in Android Studio
2. **Capacitor sync issues**: Run `npx cap sync android` manually
3. **Web app not loading**: Check that `npm run build` completes successfully

## 📞 Support

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Google Play Console Help](https://support.google.com/googleplay/android-developer)
- [Android Developer Guide](https://developer.android.com/guide)

---

Your app is now ready for Android development! The next major step is installing Android Studio and generating a signed APK/AAB for the Google Play Store.
