# GardenPulse: SmartUrban Garden Ecosystem - Installation Requirements & Setup Guide

Welcome to the **GardenPulse** repository. This document outlines the installation requirements, dependencies, API credentials, configuration steps, and running instructions for local development and Play Store deployment.

---

## 1. Primary Technology Stack
The application is built on the following technologies:
- **Frontend Framework**: React Native (0.81.x) + Expo (SDK 54.0.x) + TypeScript
- **Backend & Database**: Google Firebase (Authentication, Firestore, Storage)
- **AI Engine**: Google AI Studio (Gemini Multimodal & Vision models)
- **Location Services**: Google Maps Platform & Google Geolocation APIs
- **Weather Services**: OpenWeatherMap API (One Call API 3.0)
- **Monetization**: Google AdMob (Native, Rewarded, and Interstitial Ads)
- **UI & Theme**: React Native Paper (Material Design)

---

## 2. Prerequisites
Ensure you have the following installed on your development machine:
- **Node.js**: `v18.x` or `v20.x` (LTS recommended)
- **NPM**: `v9.x` or later (supplied with Node)
- **Git**: For version control
- **Expo Go App**: Downloaded on your iOS or Android physical device from the App Store / Google Play Store to run the app during development.
- **Android Studio** (Optional, for running on an Android Emulator)
- **Xcode** (Optional, macOS only, for running on an iOS Simulator)

---

## 3. Installation Steps

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd GardenPulse
   ```

2. **Install all dependencies**:
   ```bash
   npm install
   ```

---

## 4. Installed Dependencies Overview
All dependencies are pre-configured in `package.json` and resolved:

### Expo Native Modules (SDK 54 Compatible)
- **`expo-location`**: GPS & Network-based location detection (USDA planting zone auto-detection).
- **`expo-camera`**: Leaf diagnostics camera and QR/bar-code scanning.
- **`expo-av`**: Microphone recording for hands-free voice logging.
- **`expo-image-picker`**: Progress timelapse generator and gallery access.
- **`expo-media-library`**: Saving timelapse reels and growth logs to the device gallery.
- **`react-native-maps`**: Google Maps integration for local community grow maps.
- **`react-native-svg`**: Render vector icons and visual metrics graphs.
- **`@react-native-async-storage/async-storage`**: Offline-first caching for content libraries, articles, and logs.
- **`expo-blur`**: Frosted glassmorphism background fallback for Android and older iOS.
- **`@callstack/liquid-glass`**: Apple-style Liquid Glass navigation container for iOS.
- **`zustand`**: State management store with persistence integration.

### Backend & AI Libraries
- **`firebase`**: Connects the app to Google Firebase Auth, Firestore, and Cloud Storage.
- **`@google/generative-ai`**: Native Google AI Studio SDK for Gemini Vision (leaf diagnostics) and Gemini AI agronomist.

### Monetization & UI
- **`react-native-google-mobile-ads`**: Google AdMob SDK for rewarded, interstitial, and native ads.
- **`react-native-paper`**: Lightweight, customizable Material Design components.
- **`@expo/vector-icons`**: Built-in icons pack.

---

## 5. API Keys & Environment Variables Configuration
To use the AI, Location, Weather, and Backend services, you must create a `.env` file in the root directory. 

Expo SDK 49+ supports environment variables prefixed with `EXPO_PUBLIC_` out of the box. Create a `.env` file at the root:

```env
# Google AI Studio (Gemini)
EXPO_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here

# OpenWeatherMap API
EXPO_PUBLIC_OPENWEATHER_API_KEY=your_openweather_api_key_here

# Firebase Configuration
EXPO_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key_here
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### Google Maps Platform API Key (Standalone Build only)
To display maps in production, configure the Google Maps API key directly in your `app.json` inside the Android and iOS sections:
```json
"android": {
  "config": {
    "googleMaps": {
      "apiKey": "YOUR_ANDROID_MAPS_API_KEY"
    }
  }
}
```

---

## 6. AdMob Configuration
For Google AdMob to work without crashing, you must replace the placeholder AdMob App IDs in `app.json` with your production IDs:
```json
"react-native-google-mobile-ads": {
  "android_app_id": "ca-app-pub-xxxxxxxxxxxxxxxx~xxxxxxxxxx",
  "ios_app_id": "ca-app-pub-xxxxxxxxxxxxxxxx~xxxxxxxxxx"
}
```
*Note: The project currently defaults to Google's standard test AdMob App IDs to allow building and testing immediately.*

---

## 7. Running the Application

Start the local development server:
```bash
npm run start
```

Once the development server starts, you can:
- **Scan the QR Code** displayed in the terminal with the **Expo Go** app on your physical iOS or Android device.
- Press **`a`** to open the app on an Android Emulator.
- Press **`i`** to open the app on an iOS Simulator.
- Press **`w`** to open the web version.

---

## 8. Google Play Store Deployment Checklist
To build and publish this app for Android (Google Play Store):
1. **Change App Package Name**: Update `"package": "com.gardenpulse.app"` in `app.json` to your unique identifier (e.g. `com.yourdomain.gardenpulse`).
2. **Setup EAS Build**: Install EAS CLI globally: `npm install -g eas-cli`
3. **Configure EAS Project**: Run `eas build:configure` to link your Expo account.
4. **Generate Credentials**: EAS will handle generating keystores and signing credentials for the Google Play Console automatically.
5. **Run Production Build**:
   ```bash
   eas build --platform android --profile production
   ```
   This generates an `.aab` (Android App Bundle) file ready to be uploaded to your Google Play Console!
