# Android Studio Post-Installation Setup

## 📋 Required Environment Variables

After installing Android Studio, you'll need to set up environment variables:

### Windows Environment Variables:

1. **Open System Properties**:
   - Press `Win + X` → System → Advanced system settings
   - Click "Environment Variables"

2. **Add these variables** (User variables):

```
ANDROID_HOME = C:\Users\[YourUsername]\AppData\Local\Android\Sdk
ANDROID_SDK_ROOT = C:\Users\[YourUsername]\AppData\Local\Android\Sdk
```

3. **Update PATH variable** to include:
```
%ANDROID_HOME%\platform-tools
%ANDROID_HOME%\tools
%ANDROID_HOME%\tools\bin
```

## 🎯 Create Android Virtual Device (AVD)

1. Open Android Studio
2. Go to Tools → AVD Manager
3. Click "Create Virtual Device"
4. Choose a device (Pixel 6 recommended)
5. Select API level 33 or 34 (Android 13/14)
6. Click "Next" and "Finish"

## ✅ Test Installation

Run these commands in a new terminal to verify:

```bash
# Check if Android SDK is accessible
adb version

# Check if emulator is working
emulator -list-avds
```

## 🚀 Ready for Capacitor

Once setup is complete, you can run:

```bash
npm run android:open
```

This will open your Bill Split App project in Android Studio!
