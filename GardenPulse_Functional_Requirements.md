# GardenPulse Verification & Validation Functional Requirements Matrix

This document maps the compiled UI codebase strictly against the 523 functional requirements defined in the sitemap specification `.docs/gardenpulse-functional-requirements.md`. It tracks compliance of onboarding screens, tab views, and modal dialogs.

## 📌 Verification Legend

- **Pass (UI Shell / Layout Covered)**: The visual structures, layouts, mock contents, and navigation routes are fully compiled, verified, and operational.
- **Pending Logic (Phase 6)**: The actual functional database (SQLite/WatermelonDB) storage, native SDK hooks, machine learning processing, or payment gateways that must be connected in Phase 6.

---

## ⚙️ System-Wide Requirements

- **Exact File Path:** `App-wide Configuration / Android & iOS Manifests`
- **Custom Component Inventory:** `ThemeProvider, ScreenWrapper, Navigation Layouts`

| Requirement ID | Summary / Description | UI Shell Status | Phase 6 Action / Verification |
| --- | --- | --- | --- |
| **FR-SYS-001** | The system shall NOT require user registration, account creation, or sign-in to access any core feature. The app shal... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-SYS-002** | The system shall operate fully offline for all features that do not inherently require a network connection (plant lo... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. & Load local TFLite classification model, process viewfinder image frame, perform diagnosis. |
| **FR-SYS-003** | When operating offline, the system shall display a non-blocking indicator informing the user that weather data and co... | `Pending Logic` | Wire up Expo Location or manual zip fallback, fetch OpenWeatherMap API and update cache. & Sync preferences store settings context and update components. |
| **FR-SYS-004** | The system shall store the user's primary growing method selection and apply it as the default context across all scr... | `Pending Logic` | Connect to Zustand state manager (usePlantStore, useUserStore, useLogStore). & Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-SYS-005** | The system shall support all four growing methods simultaneously. A user may have plants of different methods active ... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-SYS-006** | When displaying care recommendations, tips, or calculator results, the system shall filter and tailor content to the ... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-SYS-007** | The system shall cache the user's zone and the 7-day weather forecast locally upon each successful API response. Cach... | `Pending Logic` | Wire up Expo Location or manual zip fallback, fetch OpenWeatherMap API and update cache. |
| **FR-SYS-008** | The system shall refresh the cached weather data upon each app open if a network connection is available, and upon us... | `Pending Logic` | Wire up Expo Location or manual zip fallback, fetch OpenWeatherMap API and update cache. |
| **FR-SYS-009** | If the user declines location permission, the system shall provide a manual ZIP/postal code entry fallback and derive... | `Pending Logic` | Wire up Expo Location or manual zip fallback, fetch OpenWeatherMap API and update cache. |
| **FR-SYS-010** | The system shall never display a user's precise GPS coordinates anywhere in the app UI or share them with community f... | `Pending Logic` | Wire up Expo Location or manual zip fallback, fetch OpenWeatherMap API and update cache. & Sync preferences store settings context and update components. & Trigger native sharing via Expo Sharing API. |
| **FR-SYS-011** | The system shall send care reminder notifications only for plant tasks that are due or overdue, referencing the speci... | `Pending Logic` | Schedule dynamic notification triggers via Expo Notifications API. |
| **FR-SYS-012** | The system shall automatically adjust scheduled notification times based on detected weather conditions (e.g., suppre... | `Pending Logic` | Wire up Expo Location or manual zip fallback, fetch OpenWeatherMap API and update cache. & Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. & Schedule dynamic notification triggers via Expo Notifications API. |
| **FR-SYS-013** | The system shall support timezone-aware scheduling and shall automatically adjust reminder times when the device time... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. & Schedule dynamic notification triggers via Expo Notifications API. |
| **FR-SYS-014** | The system shall NEVER display any advertisement (interstitial, rewarded, or native) on any permission request screen... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-SYS-015** | The system shall geo-fence ad categories restricted by local law (e.g., cannabis-adjacent products) based on the user... | `Pending Logic` | Wire up Expo Location or manual zip fallback, fetch OpenWeatherMap API and update cache. & Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-SYS-016** | The system shall ensure that rewarded videos are always optional and clearly labelled as an exchange ("Watch a video ... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-SYS-017** | When a user has purchased the Supporter Badge, the system shall permanently suppress all interstitial ad (MOD-06) tri... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. & Wire up react-native-iap StoreKit/Google Play billing connection and purchase verification hooks. |
| **FR-SYS-018** | The system shall never upload photos taken in Leaf Diagnostics (SCR-06) to any external server. All image analysis sh... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. & Load local TFLite classification model, process viewfinder image frame, perform diagnosis. |
| **FR-SYS-019** | The system shall provide a one-tap path to delete all user data from within the Privacy Dashboard (SCR-13), compliant... | `Pending Logic` | Integrate SQLite read/write transaction query. |
| **FR-SYS-020** | The system shall declare all permissions (location, camera, microphone) in the platform manifest (Info.plist / Androi... | `Pending Logic` | Wire up Expo Location or manual zip fallback, fetch OpenWeatherMap API and update cache. & Request Expo Camera permission, wire up viewfinder snapshot, save image to cache, strip EXIF metadata. & Request Expo AV microphone recording, capture local audio buffer, and trigger transcription service. |
| **FR-SYS-021** | The system shall request camera and microphone permissions contextually — only when the user taps a feature that requ... | `Pending Logic` | Request Expo Camera permission, wire up viewfinder snapshot, save image to cache, strip EXIF metadata. & Request Expo AV microphone recording, capture local audio buffer, and trigger transcription service. |
| **FR-SYS-022** | The system shall support full VoiceOver (iOS) and TalkBack (Android) compatibility for all interactive elements acros... | `Pending Logic` | Request Expo AV microphone recording, capture local audio buffer, and trigger transcription service. |
| **FR-SYS-023** | The system shall auto-detect the device's regional locale to set the default unit system (metric vs. imperial) and sh... | `Pending Logic` | Sync preferences store settings context and update components. |
| **FR-SYS-024** | The system shall support at minimum two languages at launch: English and German. Additional languages (French, Spanis... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. & Sync preferences store settings context and update components. |

---

## 🎬 ONB-1 · Splash Screen

- **Exact File Path:** `app/(onboarding)/index.tsx`
- **Custom Component Inventory:** `View, Image, Text (Standard splash, animated leaf-unfurl)`

| Requirement ID | Summary / Description | UI Shell Status | Phase 6 Action / Verification |
| --- | --- | --- | --- |
| **FR-ONB1-001** | The system shall display the Splash Screen as the first screen when the app is launched for the first time on a device. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-ONB1-002** | When a returning user launches the app (i.e., they have previously completed onboarding), the system shall skip ONB-1... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-ONB1-003** | The Splash Screen shall auto-advance to ONB-2 (Welcome + Method Selection) after initialization completes without req... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-ONB1-004** | The system shall display the GardenPulse app logo with an animated leaf-unfurl entry animation. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-ONB1-005** | The system shall display the app name "GardenPulse" and the tagline "Grow Smarter, Anywhere." on the Splash Screen. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-ONB1-006** | The system shall display a subtle animated loading indicator (pulse animation) during the 2-second display period. | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-ONB1-007** | The Splash Screen shall not display any advertisement, sign-in prompt, or permission request. | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |

---

## 👋 ONB-2 · Welcome + Method Selection

- **Exact File Path:** `app/(onboarding)/welcome.tsx`
- **Custom Component Inventory:** `ScreenWrapper, CustomHeader, CustomButton, Card (growing method cards), ProgressBar`

| Requirement ID | Summary / Description | UI Shell Status | Phase 6 Action / Verification |
| --- | --- | --- | --- |
| **FR-ONB2-001** | The system shall navigate to ONB-2 automatically after ONB-1 completes. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-ONB2-002** | When the user taps "Skip for now," the system shall record no method selection, set all growing method preferences to... | `Pending Logic` | Integrate SQLite read/write transaction query. & Request Expo AV microphone recording, capture local audio buffer, and trigger transcription service. |
| **FR-ONB2-003** | When the user taps "Next" and method selection is complete, the system shall trigger MOD-04 (Permission Context Modal... | `Pending Logic` | Wire up Expo Location or manual zip fallback, fetch OpenWeatherMap API and update cache. |
| **FR-ONB2-004** | The system shall display a 3-step progress indicator at the top of the screen, with Step 1 of 3 active. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-ONB2-005** | The system shall display four selectable method cards: Soil / Raised Bed, Container / Balcony, Hydroponic, and Indoor... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-ONB2-006** | The "Next →" button shall be disabled (visually greyed) until the user selects at least one method card. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-ONB2-007** | When the user taps a method card, the system shall visually highlight it with a selection ring and enable the "Next →... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-ONB2-008** | The method selection shall be single-select. Tapping a second card shall deselect the first and select the new one. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-ONB2-009** | The system shall store the selected growing method as the user's primary growing profile preference, which will pre-f... | `Pending Logic` | Connect to Zustand state manager (usePlantStore, useUserStore, useLogStore). |
| **FR-ONB2-010** | The system shall NOT display any advertisement on this screen. | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |

---

## 🪴 ONB-3 · Add First Plant

- **Exact File Path:** `app/(onboarding)/add-plant.tsx`
- **Custom Component Inventory:** `ScreenWrapper, CustomHeader, CustomInput, AutocompleteSearchInput, RadioGroup, PhotoCaptureArea, CustomButton, DateTimePicker`

| Requirement ID | Summary / Description | UI Shell Status | Phase 6 Action / Verification |
| --- | --- | --- | --- |
| **FR-ONB3-001** | The system shall navigate to ONB-3 after the location permission step (MOD-04) completes — whether the user grants, d... | `Pending Logic` | Wire up Expo Location or manual zip fallback, fetch OpenWeatherMap API and update cache. |
| **FR-ONB3-002** | When the user taps "Skip for now," the system shall navigate directly to ONB-4 with the plant data fields empty, resu... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-ONB3-003** | The system shall display a Back arrow that returns the user to ONB-2 without losing their method selection. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-ONB3-004** | The system shall display a 3-step progress indicator with Step 2 of 3 active. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-ONB3-005** | The system shall display a plant name search field with an autocomplete dropdown sourced from the app's local plant d... | `Pending Logic` | Integrate SQLite read/write transaction query. |
| **FR-ONB3-006** | The system shall display browse-by-category chips: Herb, Vegetable, Fruit, Flower, Houseplant, Microgreen. Tapping a ... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-ONB3-007** | When a plant is selected from search or browse, the system shall display a preview card showing: plant thumbnail, com... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-ONB3-008** | The system shall display the growing method selector pills (Soil · Container · Hydro · Indoor) pre-filled with the me... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-ONB3-009** | The system shall display the auto-detected or manually entered location as a zone badge (e.g., "Zone 7b · Berlin"). I... | `Pending Logic` | Wire up Expo Location or manual zip fallback, fetch OpenWeatherMap API and update cache. & Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-ONB3-010** | The system shall display a started date picker defaulting to the current date. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-ONB3-011** | The plant nickname field shall accept a maximum of 30 characters. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-ONB3-012** | When the user taps the "Scan a leaf or seed packet" camera button, the system shall trigger MOD-04 (Permission Contex... | `Pending Logic` | Request Expo Camera permission, wire up viewfinder snapshot, save image to cache, strip EXIF metadata. & Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-ONB3-013** | The "Continue →" button shall be enabled only when a plant name (from search, browse, or manual entry) is present. Al... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-ONB3-014** | Upon tapping "Continue →," the system shall persist the plant record with: species name, nickname (if provided), grow... | `Pending Logic` | Integrate SQLite read/write transaction query. & Request Expo AV microphone recording, capture local audio buffer, and trigger transcription service. |

---

## 📊 ONB-4 · Instant Care Plan Preview

- **Exact File Path:** `app/(onboarding)/care-plan.tsx`
- **Custom Component Inventory:** `ScreenWrapper, CustomHeader, CustomButton, Card, WeatherWidget, MetricDial, CustomSwitch`

| Requirement ID | Summary / Description | UI Shell Status | Phase 6 Action / Verification |
| --- | --- | --- | --- |
| **FR-ONB4-001** | The system shall navigate to ONB-4 after ONB-3's Continue action or Skip action completes. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-ONB4-002** | When the user taps "Start Growing 🌱," the system shall mark onboarding as complete, persist this flag to local storag... | `Pending Logic` | Integrate SQLite read/write transaction query. |
| **FR-ONB4-003** | The system shall display a Back arrow that returns the user to ONB-3 without losing the plant data entered. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-ONB4-004** | When the user taps "Remind me later," the system shall navigate to SCR-01 Dashboard without requesting notification p... | `Pending Logic` | Schedule dynamic notification triggers via Expo Notifications API. |
| **FR-ONB4-005** | The system shall display a 3-step progress indicator with Step 3 of 3 active. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-ONB4-006** | The system shall display a location and weather context card showing: detected city name, zone badge, current tempera... | `Pending Logic` | Wire up Expo Location or manual zip fallback, fetch OpenWeatherMap API and update cache. & Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-ONB4-007** | If a plant was added in ONB-3, the system shall display a personalised first plant care summary card containing: wate... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-ONB4-008** | If no plant was added in ONB-3 (user skipped), the system shall display a generic care tip card based on the selected... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-ONB4-009** | The system shall display a Garden Health Score baseline card with a circular dial showing an initial score of 50/100 ... | `Pending Logic` | Connect to Zustand state manager (usePlantStore, useUserStore, useLogStore). |
| **FR-ONB4-010** | The system shall display a notification opt-in row: bell icon, label "Get reminders for your [plant name]" (or "Get g... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. & Schedule dynamic notification triggers via Expo Notifications API. |
| **FR-ONB4-011** | When the user taps the Enable notification toggle, the system shall trigger MOD-04 (Permission Context Modal — Notifi... | `Pending Logic` | Schedule dynamic notification triggers via Expo Notifications API. |
| **FR-ONB4-012** | The system shall NOT display any advertisement on this screen. | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |

---

## 🏠 SCR-01 · Dashboard / Home

- **Exact File Path:** `app/(tabs)/index.tsx`
- **Custom Component Inventory:** `ScreenWrapper, CustomHeader, NotificationBell, WeatherWidget, ComebackBonusBanner, SectionHeader, HorizontalScrollRow, TaskCard, MetricDial, ContextualTipCard, BloomReportBanner, FAB, ConfettiCelebration`

| Requirement ID | Summary / Description | UI Shell Status | Phase 6 Action / Verification |
| --- | --- | --- | --- |
| **FR-S01-001** | The system shall display the Dashboard as the default screen when the main app is entered for the first time (after o... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S01-002** | When a returning user opens the app after a lapse, the system shall display a Comeback Bonus banner on the Dashboard:... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S01-003** | Tapping the Settings icon in the header shall navigate to SCR-12 Settings. | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S01-004** | Tapping the notification bell icon shall display an in-app notification tray. The bell shall show a badge count when ... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. & Schedule dynamic notification triggers via Expo Notifications API. |
| **FR-S01-005** | The system shall display the user's city name and zone badge (e.g., "Berlin · Zone 7b") in the weather widget header. | `Pending Logic` | Wire up Expo Location or manual zip fallback, fetch OpenWeatherMap API and update cache. & Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S01-006** | The system shall display the following real-time weather values in the widget: current temperature, humidity percenta... | `Pending Logic` | Wire up Expo Location or manual zip fallback, fetch OpenWeatherMap API and update cache. |
| **FR-S01-007** | The system shall display a 3-day forecast strip beneath the main weather values, showing a weather icon and high/low ... | `Pending Logic` | Wire up Expo Location or manual zip fallback, fetch OpenWeatherMap API and update cache. |
| **FR-S01-008** | When tomorrow's rain probability is ≥70%, the system shall display a contextual smart alert label within the weather ... | `Pending Logic` | Wire up Expo Location or manual zip fallback, fetch OpenWeatherMap API and update cache. |
| **FR-S01-009** | The weather widget shall support pull-to-refresh. When triggered, the system shall request a fresh weather API call a... | `Pending Logic` | Wire up Expo Location or manual zip fallback, fetch OpenWeatherMap API and update cache. & Integrate SQLite read/write transaction query. |
| **FR-S01-010** | When weather data is unavailable (offline and no cache), the system shall display the last cached values with a "Last... | `Pending Logic` | Wire up Expo Location or manual zip fallback, fetch OpenWeatherMap API and update cache. & Integrate SQLite read/write transaction query. |
| **FR-S01-011** | The system shall display a "Today in Your Garden" section containing horizontally scrollable task cards for all plant... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S01-012** | Each task card shall display: the plant's thumbnail photo, plant name, and task type chip (Water / Feed / Prune / Che... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S01-013** | Each task card shall include a "Done ✓" button. When tapped, the system shall mark the task as complete for the curre... | `Pending Logic` | Integrate SQLite read/write transaction query. |
| **FR-S01-014** | When all tasks for the day are marked complete, the system shall display an animated celebration state ("All done tod... | `Pending Logic` | Connect to Zustand state manager (usePlantStore, useUserStore, useLogStore). |
| **FR-S01-015** | The system shall display a "See full schedule →" link in this section that navigates to SCR-07 Smart Scheduler. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S01-016** | Weather-adjusted tasks (e.g., watering suppressed due to rain forecast) shall display as greyed-out with a weather ic... | `Pending Logic` | Wire up Expo Location or manual zip fallback, fetch OpenWeatherMap API and update cache. & Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S01-017** | The system shall display the overall Garden Health Score as a circular dial (0–100) with colour coding: 0–33 red, 34–... | `Pending Logic` | Connect to Zustand state manager (usePlantStore, useUserStore, useLogStore). |
| **FR-S01-018** | The system shall display the 3 most impactful metric labels beneath the dial (e.g., "Moisture · Light · pH"), derived... | `Pending Logic` | Connect to Zustand state manager (usePlantStore, useUserStore, useLogStore). & Sync preferences store settings context and update components. |
| **FR-S01-019** | Tapping "View Details →" on the Garden Health Score card shall navigate to SCR-11 Profile & Badges. | `Pending Logic` | Connect to Zustand state manager (usePlantStore, useUserStore, useLogStore). & Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S01-020** | The system shall display a horizontally scrollable row of the user's plants, each shown as a thumbnail card with: pla... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S01-021** | Tapping a plant card in the My Plants row shall navigate to SCR-03 Plant Detail for that plant. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S01-022** | Tapping "See All →" shall navigate to SCR-02 Plant List. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S01-023** | If the user has no plants, the My Plants row shall be replaced by a "Add your first plant" empty-state card that trig... | `Pending Logic` | Connect to Zustand state manager (usePlantStore, useUserStore, useLogStore). & Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S01-024** | The system shall display at most one contextual tip card per Dashboard session. The tip shall be selected based on th... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S01-025** | The tip card shall display: the label "From your garden expert," the article title, method tag, and estimated read ti... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S01-026** | The tip card shall only display content from the offline-cached Smart Tips Library. The system shall not load externa... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S01-027** | The contextual tip card shall NOT auto-play any video or audio. | `Pending Logic` | Request Expo AV microphone recording, capture local audio buffer, and trigger transcription service. |
| **FR-S01-028** | On Monday mornings, or when the user opens the app for the first time after a lapse with at least one week of log dat... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S01-029** | Tapping "View Report" on the banner shall open MOD-11 Weekly Bloom Report Sheet. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S01-030** | The system shall display one native ad slot on the Dashboard, positioned between the Garden Health Score card and the... | `Pending Logic` | Connect to Zustand state manager (usePlantStore, useUserStore, useLogStore). & Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S01-031** | The system shall display a prominent "+" floating action button (FAB) in the bottom-right corner, always visible abov... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |

---

## 🌿 SCR-02 · Plant List

- **Exact File Path:** `app/(tabs)/garden/index.tsx`
- **Custom Component Inventory:** `ScreenWrapper, CustomHeader, GridListToggle, FilterChip, PlantCard, EmptyStateView, BatchActionBar, FAB, CustomCheckbox, CustomDialog`

| Requirement ID | Summary / Description | UI Shell Status | Phase 6 Action / Verification |
| --- | --- | --- | --- |
| **FR-S02-001** | The system shall display the Plant List when the user taps the Garden tab in the bottom navigation bar. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S02-002** | Tapping a plant card shall navigate to SCR-03 Plant Detail for that plant. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S02-003** | Tapping the "+" icon in the header shall open MOD-02 Add / Edit Plant Sheet. | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S02-004** | The system shall display all of the user's active (non-archived) plants as cards. The default view shall be a 2-colum... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S02-005** | Each plant card shall display: plant photo thumbnail, plant name (common name + nickname if set), growing method badg... | `Pending Logic` | Connect to Zustand state manager (usePlantStore, useUserStore, useLogStore). & Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S02-006** | The system shall display growing method filter chips (All · Soil · Container · Hydro · Indoor) above the list. Tappin... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S02-007** | The system shall display a search field above the plant cards. As the user types, the system shall filter the visible... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S02-008** | The system shall display a sort control allowing the user to sort plants by: name (A–Z), health score (lowest first),... | `Pending Logic` | Connect to Zustand state manager (usePlantStore, useUserStore, useLogStore). |
| **FR-S02-009** | When the user has no plants, the system shall display an empty state with an illustrated pot graphic, the heading "No... | `Pending Logic` | Connect to Zustand state manager (usePlantStore, useUserStore, useLogStore). & Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S02-010** | A native ad card shall appear in the plant list at approximately every 10th item position when the user has more than... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S02-011** | The system shall support a swipe-left gesture on each plant card. The revealed actions shall be: "Quick Log" (opens M... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S02-012** | The system shall support pull-to-refresh to re-sync plant health data. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S02-013** | The system shall provide a batch mode toggle in the header. When activated, all plant cards shall show multi-select c... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S02-014** | When batch mode is active, the system shall display a "Select All" button in the header that selects all visible (fil... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S02-015** | When one or more plants are selected in batch mode, the system shall display an action bar at the bottom of the scree... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S02-016** | Before executing any batch action, the system shall display a confirmation dialog: "Apply [action] to [N] plants?" wi... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S02-017** | Tapping "Cancel" or the batch mode toggle again shall exit batch mode without performing any action and restore the n... | `Pending Logic` | Connect to Zustand state manager (usePlantStore, useUserStore, useLogStore). |
| **FR-S02-018** | The system shall display a "+" FAB (bottom-right) at all times in the Plant List. Tapping it shall open MOD-01 Quick ... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |

---

## 🔍 SCR-03 · Plant Detail

- **Exact File Path:** `app/(tabs)/garden/plant/[id].tsx`
- **Custom Component Inventory:** `ScreenWrapper, CustomHeader, PlantHeroImage, ActionPillRow, PlantInfoCard, WeatherImpactBanner, SectionHeader, TaskCard, LogTimeline, ContextualTipCard, NotesInput, FAB, CustomInput, AudioRecorder`

| Requirement ID | Summary / Description | UI Shell Status | Phase 6 Action / Verification |
| --- | --- | --- | --- |
| **FR-S03-001** | The system shall display Plant Detail when the user taps a plant card from SCR-02 or a plant card from SCR-01 Dashboa... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S03-002** | The header shall display the plant's name and a back arrow returning to the previous screen. | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S03-003** | The overflow menu (⋮) in the header shall offer: Edit Plant (opens MOD-02 pre-filled), Archive to Cemetery (with conf... | `Pending Logic` | Integrate SQLite read/write transaction query. & Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S03-004** | The system shall display the plant's most recently logged photo as a full-width hero image. If no photos exist, a pla... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S03-005** | The hero image shall display a photo count badge (e.g., "12 photos"). Tapping the hero image shall navigate to SCR-15... | `Pending Logic` | Request Expo Camera permission, wire up viewfinder snapshot, save image to cache, strip EXIF metadata. & Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S03-006** | The hero area shall include an "Add Photo" button overlay that opens MOD-01 Quick Log Sheet pre-set to the photo capt... | `Pending Logic` | Request Expo Camera permission, wire up viewfinder snapshot, save image to cache, strip EXIF metadata. & Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S03-007** | The system shall display a horizontal pill action row beneath the hero: Log, Diagnose, Share, and Archive. These shal... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. & Trigger native sharing via Expo Sharing API. |
| **FR-S03-008** | Tapping "Log" shall open MOD-01 Quick Log Sheet pre-filled for this plant. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S03-009** | Tapping "Diagnose" shall navigate to SCR-06 Leaf Diagnostics. | `Pending Logic` | Load local TFLite classification model, process viewfinder image frame, perform diagnosis. |
| **FR-S03-010** | Tapping "Share" shall open MOD-12 Export / Share Sheet for this plant. | `Pending Logic` | Compile details into a document stream via expo-print / react-native-view-shot. & Trigger native sharing via Expo Sharing API. |
| **FR-S03-011** | Tapping "Archive" shall display a confirmation dialog. On confirmation, the plant shall be moved to SCR-14 Cemetery L... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S03-012** | The system shall display a plant info card containing: species (common name + scientific name), growing method badge,... | `Pending Logic` | Wire up Expo Location or manual zip fallback, fetch OpenWeatherMap API and update cache. & Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S03-013** | The growing stage shall be the most recently set value, editable by tapping the chip inline. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S03-014** | Tapping the Edit icon on the plant info card shall open MOD-02 Add / Edit Plant Sheet pre-filled with the current pla... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S03-015** | The system shall display the individual Garden Health Score for this plant as a mini circular dial (0–100). | `Pending Logic` | Connect to Zustand state manager (usePlantStore, useUserStore, useLogStore). |
| **FR-S03-016** | The system shall display an expandable 8-metric breakdown below the dial: Moisture, Light, pH, Growth Rate, Nutrient ... | `Pending Logic` | Sync preferences store settings context and update components. |
| **FR-S03-017** | Tapping "View Full Insights →" shall expand the inline 8-metric chart without navigating away from the screen. | `Pending Logic` | Sync preferences store settings context and update components. |
| **FR-S03-018** | When a weather condition is forecast that affects this plant's care tasks within the next 3 days, the system shall di... | `Pending Logic` | Wire up Expo Location or manual zip fallback, fetch OpenWeatherMap API and update cache. |
| **FR-S03-019** | The system shall display the plant's care tasks due today as cards with "Done ✓" checkboxes. Checking a task shall ma... | `Pending Logic` | Connect to Zustand state manager (usePlantStore, useUserStore, useLogStore). & Integrate SQLite read/write transaction query. |
| **FR-S03-020** | Each task shall offer a "Reschedule" link. Tapping it shall open a date/time picker to move the task to a future date. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S03-021** | A "View full schedule →" link shall navigate to SCR-07 Smart Scheduler filtered for this plant. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S03-022** | When the system detects that the user has the same species (or close botanical relatives) growing under two different... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S03-023** | The cross-method insight card shall be dismissible. Once dismissed, it shall not reappear unless new comparative data... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S03-024** | The system shall display a reverse-chronological timeline of all log entries for this plant. Each entry shall show: e... | `Pending Logic` | Integrate SQLite read/write transaction query. & Request Expo AV microphone recording, capture local audio buffer, and trigger transcription service. & Sync preferences store settings context and update components. |
| **FR-S03-025** | Tapping a log entry shall expand it inline to show: the full-resolution photo, all recorded metrics, the written note... | `Pending Logic` | Integrate SQLite read/write transaction query. & Request Expo AV microphone recording, capture local audio buffer, and trigger transcription service. & Sync preferences store settings context and update components. |
| **FR-S03-026** | The timeline shall paginate, loading additional entries on "Load more" tap to avoid performance degradation with larg... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S03-027** | The system shall display at most one contextual tip card on Plant Detail, triggered by the content of the most recent... | `Pending Logic` | Integrate SQLite read/write transaction query. & Request Expo AV microphone recording, capture local audio buffer, and trigger transcription service. |
| **FR-S03-028** | The system shall display a persistent freeform notes text area with a microphone icon for voice input. | `Pending Logic` | Integrate SQLite read/write transaction query. & Request Expo AV microphone recording, capture local audio buffer, and trigger transcription service. |
| **FR-S03-029** | When the user taps the microphone icon and microphone permission has not been granted, the system shall trigger MOD-0... | `Pending Logic` | Integrate SQLite read/write transaction query. & Request Expo AV microphone recording, capture local audio buffer, and trigger transcription service. |
| **FR-S03-030** | Saved notes shall be timestamped and appended to the plant's log history. | `Pending Logic` | Integrate SQLite read/write transaction query. |
| **FR-S03-031** | The system shall display a "Log" FAB (bottom-right) always visible on Plant Detail. Tapping it shall open MOD-01 Quic... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |

---

## 🛠️ SCR-04 · Tools Hub

- **Exact File Path:** `app/(tabs)/tools/index.tsx`
- **Custom Component Inventory:** `ScreenWrapper, CustomHeader, RecentlyUsedBanner, ToolCard, SupporterBadgeBanner`

| Requirement ID | Summary / Description | UI Shell Status | Phase 6 Action / Verification |
| --- | --- | --- | --- |
| **FR-S04-001** | The system shall display the Tools Hub when the user taps the Tools tab in the bottom navigation bar. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S04-002** | The system shall display four tool cards: Nutrient / Recipe Calculator, Leaf Diagnostics, Smart Scheduler, and QR / L... | `Pending Logic` | Load local TFLite classification model, process viewfinder image frame, perform diagnosis. |
| **FR-S04-003** | After the user has opened any tool at least once, the system shall display a "Recently Used" section at the top of th... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S04-004** | Tapping the Nutrient / Recipe Calculator card shall navigate to SCR-05. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S04-005** | Tapping the Leaf Diagnostics card shall navigate to SCR-06. | `Pending Logic` | Load local TFLite classification model, process viewfinder image frame, perform diagnosis. |
| **FR-S04-006** | Tapping the Smart Scheduler card shall navigate to SCR-07. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S04-007** | Tapping the QR / Label Scanner card shall trigger MOD-03 QR Scanner Overlay. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S04-008** | The system shall provide a search field in the header. As the user types, the tool cards shall filter to show only ma... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S04-009** | The system shall display one native ad slot in the Tools Hub, positioned between the first and second row of tool car... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |

---

## 🧪 SCR-05 · Nutrient / Recipe Calculator

- **Exact File Path:** `app/(tabs)/tools/nutrient-calculator.tsx`
- **Custom Component Inventory:** `ScreenWrapper, CustomHeader, RadioGroup, AutocompleteSearchInput, UnitToggle, CustomInput, CustomButton, RecipeResultCard, InterstitialAdContainer, RewardedVideoPrompt`

| Requirement ID | Summary / Description | UI Shell Status | Phase 6 Action / Verification |
| --- | --- | --- | --- |
| **FR-S05-001** | The system shall navigate to the Nutrient / Recipe Calculator from SCR-04 Tools Hub. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S05-002** | A back arrow in the header shall return the user to SCR-04. | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S05-003** | An "ℹ" info icon shall display a dismissible tooltip: "All calculations are method-specific estimates. Always verify ... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S05-004** | The system shall provide a required method selector with three options: Soil Drench, Hydro Reservoir, and Foliar Spra... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S05-005** | The system shall provide a nutrient brand selector field with autocomplete from a locally stored brand database. The ... | `Pending Logic` | Connect to Zustand state manager (usePlantStore, useUserStore, useLogStore). & Integrate SQLite read/write transaction query. |
| **FR-S05-006** | The system shall provide a "Scan label" button next to the brand selector that opens MOD-03 QR Scanner Overlay. If th... | `Pending Logic` | Integrate SQLite read/write transaction query. |
| **FR-S05-007** | The system shall provide a water volume input field with a numeric keyboard and a unit toggle (Litres / Gallons). The... | `Pending Logic` | Sync preferences store settings context and update components. |
| **FR-S05-008** | The system shall provide a required growth stage selector with four options: Seedling, Veg / Grow, Bloom / Flower, Fl... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S05-009** | The system shall provide an optional Target EC / PPM field. When a known brand is selected, the system shall pre-fill... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S05-010** | The system shall display a pH target range derived from the selected method and growth stage. The displayed range sha... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S05-011** | The "Generate Recipe" button shall be disabled until the following required fields are filled: Method, Nutrient Brand... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S05-012** | When the user taps "Generate Recipe," the system shall trigger MOD-06 Interstitial Ad displayed over a 1.5-second ani... | `Pending Logic` | Connect to Zustand state manager (usePlantStore, useUserStore, useLogStore). & Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S05-013** | The results card shall display per-nutrient rows, each containing: nutrient name, calculated dose amount, unit, and a... | `Pending Logic` | Sync preferences store settings context and update components. |
| **FR-S05-014** | The results card shall display the pH target range as a visual band with the calculated working value indicated. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S05-015** | The results card shall display the EC / PPM target value. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S05-016** | The results card shall display any applicable warnings or notes (e.g., "Reduce by 25% for seedlings under 2 weeks old... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S05-017** | The system shall provide a "Save Recipe" button that logs the recipe to the selected plant's history or creates a sta... | `Pending Logic` | Integrate SQLite read/write transaction query. |
| **FR-S05-018** | The system shall provide an "Add to Schedule" link that pre-fills SCR-07 Smart Scheduler with a feeding task using th... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S05-019** | The system shall provide an "Export / Share" button in the results card. Tapping it shall trigger MOD-05 Rewarded Vid... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. & Compile details into a document stream via expo-print / react-native-view-shot. & Trigger native sharing via Expo Sharing API. |
| **FR-S05-020** | The PDF export format shall include: the full nutrient dose table, pH and EC/PPM targets, method, growth stage, water... | `Pending Logic` | Compile details into a document stream via expo-print / react-native-view-shot. |
| **FR-S05-021** | A persistent unit toggle (Metric / Imperial) shall be visible below the results card. Switching units shall instantly... | `Pending Logic` | Integrate SQLite read/write transaction query. & Sync preferences store settings context and update components. |

---

## 🍂 SCR-06 · Leaf Diagnostics

- **Exact File Path:** `app/(tabs)/tools/leaf-diagnostics.tsx`
- **Custom Component Inventory:** `ScreenWrapper, CustomHeader, CameraViewfinder, ScanningStateOverlay, DiagnosisResultCard, DiagnosisHistoryRow`

| Requirement ID | Summary / Description | UI Shell Status | Phase 6 Action / Verification |
| --- | --- | --- | --- |
| **FR-S06-001** | The system shall navigate to Leaf Diagnostics from SCR-04 Tools Hub and from the "Diagnose" action pill on SCR-03 Pla... | `Pending Logic` | Load local TFLite classification model, process viewfinder image frame, perform diagnosis. |
| **FR-S06-002** | A back arrow shall return the user to the originating screen. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S06-003** | Upon entering Leaf Diagnostics, if camera permission has not been granted, the system shall immediately trigger MOD-0... | `Pending Logic` | Request Expo Camera permission, wire up viewfinder snapshot, save image to cache, strip EXIF metadata. & Load local TFLite classification model, process viewfinder image frame, perform diagnosis. |
| **FR-S06-004** | If the user denies camera permission, the system shall display a "Permission denied" state with: an illustration, a "... | `Pending Logic` | Connect to Zustand state manager (usePlantStore, useUserStore, useLogStore). & Request Expo Camera permission, wire up viewfinder snapshot, save image to cache, strip EXIF metadata. & Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. & Load local TFLite classification model, process viewfinder image frame, perform diagnosis. |
| **FR-S06-005** | The system shall display a live camera viewfinder with a leaf-shaped alignment frame overlay and the instruction labe... | `Pending Logic` | Request Expo Camera permission, wire up viewfinder snapshot, save image to cache, strip EXIF metadata. |
| **FR-S06-006** | The system shall provide a Capture button (large circle) for taking the diagnostic photo. | `Pending Logic` | Request Expo Camera permission, wire up viewfinder snapshot, save image to cache, strip EXIF metadata. |
| **FR-S06-007** | The system shall provide a gallery import button allowing the user to import an existing photo from their device phot... | `Pending Logic` | Request Expo Camera permission, wire up viewfinder snapshot, save image to cache, strip EXIF metadata. & Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S06-008** | The system shall provide a flash/torch toggle icon on the viewfinder. | `Pending Logic` | Request Expo Camera permission, wire up viewfinder snapshot, save image to cache, strip EXIF metadata. |
| **FR-S06-009** | Upon capture or import, the system shall display a full-screen loading state with the label "Analysing on-device…" an... | `Pending Logic` | Connect to Zustand state manager (usePlantStore, useUserStore, useLogStore). & Request Expo Camera permission, wire up viewfinder snapshot, save image to cache, strip EXIF metadata. & Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S06-010** | All image analysis SHALL run on-device using local machine learning inference. The captured image shall NEVER be uplo... | `Pending Logic` | Request Expo Camera permission, wire up viewfinder snapshot, save image to cache, strip EXIF metadata. & Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. & Load local TFLite classification model, process viewfinder image frame, perform diagnosis. |
| **FR-S06-011** | The system shall strip all photo metadata (EXIF location, device info) from the image before analysis. Metadata shall... | `Pending Logic` | Wire up Expo Location or manual zip fallback, fetch OpenWeatherMap API and update cache. & Connect to Zustand state manager (usePlantStore, useUserStore, useLogStore). & Request Expo Camera permission, wire up viewfinder snapshot, save image to cache, strip EXIF metadata. & Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S06-012** | The results card shall display: the identified plant name (common + scientific name) with a confidence percentage bad... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S06-013** | The results card shall display the primary issue identified (e.g., "Magnesium Deficiency") with a confidence percenta... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S06-014** | The results card shall display a brief explanation (2 lines) of the primary issue and a numbered list of suggested co... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S06-015** | The system shall support listing secondary issues in a collapsed expandable section below the primary finding. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S06-016** | The results card shall include a contextual tip link (e.g., "Read: Magnesium Deficiency Guide") that opens MOD-09 wit... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S06-017** | The system shall provide a "Log This Diagnosis" button that creates a log entry for the linked plant (or prompts plan... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S06-018** | The system shall provide a "Try Again / Retake" button that returns the user to the camera viewfinder. | `Pending Logic` | Request Expo Camera permission, wire up viewfinder snapshot, save image to cache, strip EXIF metadata. |
| **FR-S06-019** | The system shall provide a "Share Results" button that opens MOD-12 Export / Share Sheet with a summary of the diagno... | `Pending Logic` | Compile details into a document stream via expo-print / react-native-view-shot. & Trigger native sharing via Expo Sharing API. |
| **FR-S06-020** | The system shall maintain a local history of all past diagnoses. The history section shall display entries as a list ... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S06-021** | The history section shall be filterable by: All, Deficiency, Pest, Disease, Overwatering. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |

---

## 📅 SCR-07 · Smart Scheduler

- **Exact File Path:** `app/(tabs)/tools/smart-scheduler.tsx`
- **Custom Component Inventory:** `ScreenWrapper, CustomHeader, CalendarWeekStrip, SunriseSunsetRow, InScreenTabBar, TaskCard, SmartControlsPanel, CustomReminderForm, CustomSwitch`

| Requirement ID | Summary / Description | UI Shell Status | Phase 6 Action / Verification |
| --- | --- | --- | --- |
| **FR-S07-001** | The system shall navigate to Smart Scheduler from SCR-04 Tools Hub, from the "See full schedule →" link on SCR-01 Das... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S07-002** | When navigated from SCR-03 Plant Detail, the scheduler shall open with the view filtered to show only tasks for that ... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S07-003** | A back arrow shall return the user to the originating screen. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S07-004** | The system shall display a week-strip calendar view by default. A toggle in the header shall switch between week and ... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S07-005** | In the week-strip view, each day cell shall show coloured dots for scheduled tasks, colour-coded by task type: blue (... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S07-006** | The current day shall be visually highlighted with a ring or background accent. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S07-007** | The system shall display sunrise and sunset times for the selected day, derived from the user's detected zone and date. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S07-008** | Tapping any day cell shall display the task list for that day in the section below the calendar. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S07-009** | The system shall display the task list for the selected day. Each task row shall show: the plant thumbnail, plant nam... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S07-010** | Marking a task as done shall update the plant's log and remove the task from the overdue list. | `Pending Logic` | Integrate SQLite read/write transaction query. |
| **FR-S07-011** | The system shall support a swipe-left action on each task row with two options: Reschedule (opens a date picker) and ... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S07-012** | The system shall provide a "Mark All Done" button at the top of the task list for the selected day, which marks all t... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S07-013** | The system shall provide a "Weather sync" toggle. When enabled, the system shall automatically remove or suppress wat... | `Pending Logic` | Wire up Expo Location or manual zip fallback, fetch OpenWeatherMap API and update cache. & Connect to Zustand state manager (usePlantStore, useUserStore, useLogStore). |
| **FR-S07-014** | The system shall provide a "Skip weekends" toggle. When enabled, no new tasks shall be scheduled on Saturdays and Sun... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S07-015** | The system shall provide a "Travel Mode" toggle with a date range picker. When Travel Mode is active for the selected... | `Pending Logic` | Schedule dynamic notification triggers via Expo Notifications API. |
| **FR-S07-016** | The system shall provide a reminder time preference selector: Morning (7–9 AM), Afternoon (12–2 PM), Evening (6–8 PM)... | `Pending Logic` | Schedule dynamic notification triggers via Expo Notifications API. |
| **FR-S07-017** | The system shall automatically adjust scheduled reminder times when a timezone change or DST transition is detected o... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. & Schedule dynamic notification triggers via Expo Notifications API. |
| **FR-S07-018** | The system shall provide an "+ Add Custom Reminder" button that opens an inline form with: plant selector, task type ... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S07-019** | Custom reminders shall appear alongside auto-generated care tasks in the calendar and task list views. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S07-020** | A "Notification preferences →" quick link shall open MOD-10 Notification Preferences Sheet. | `Pending Logic` | Schedule dynamic notification triggers via Expo Notifications API. |

---

## 👥 SCR-08 · Community Hub

- **Exact File Path:** `app/(tabs)/community/index.tsx`
- **Custom Component Inventory:** `ScreenWrapper, CustomHeader, LocalContextCard, InScreenTabBar, SuccessStatCard, ClusterCard, ChallengeCard, WinnerSpotlightCard, ReferralBanner`

| Requirement ID | Summary / Description | UI Shell Status | Phase 6 Action / Verification |
| --- | --- | --- | --- |
| **FR-S08-001** | The system shall display the Community Hub when the user taps the Community tab in the bottom navigation bar. | `Pending Logic` | Sync preferences store settings context and update components. |
| **FR-S08-002** | The system shall display a local context banner at the top of the Community Hub showing the heading "What's thriving ... | `Pending Logic` | Wire up Expo Location or manual zip fallback, fetch OpenWeatherMap API and update cache. & Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. & Sync preferences store settings context and update components. |
| **FR-S08-003** | The banner shall include a "View Map →" link that navigates to SCR-10 Local Grow Map. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S08-004** | The Community Hub shall contain an internal tab bar with three tabs: Local, Clusters, and Challenges. | `Pending Logic` | Sync preferences store settings context and update components. |
| **FR-S08-005** | The Local tab shall display anonymized success stats cards for the user's zone. Each card shall show: plant name, suc... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S08-006** | The Local tab stats shall display only aggregate, anonymized data. No individual user data or precise locations shall... | `Pending Logic` | Wire up Expo Location or manual zip fallback, fetch OpenWeatherMap API and update cache. |
| **FR-S08-007** | A "View Full Map →" button shall navigate to SCR-10. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S08-008** | The Clusters tab shall display a "My Clusters" section (clusters the user has joined) and a "Nearby Clusters" section... | `Pending Logic` | Wire up Expo Location or manual zip fallback, fetch OpenWeatherMap API and update cache. |
| **FR-S08-009** | Each cluster card shall display: cluster name, member count, method/interest tag, recent activity indicator, and a Jo... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S08-010** | Tapping a cluster card in "My Clusters" shall navigate to SCR-09 Garden Cluster Detail. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S08-011** | A "+ Join a Cluster" CTA button shall open a searchable cluster browse sheet allowing the user to search by name, loc... | `Pending Logic` | Wire up Expo Location or manual zip fallback, fetch OpenWeatherMap API and update cache. |
| **FR-S08-012** | Tapping "Join" on a nearby cluster card shall add the cluster to "My Clusters" and confirm with a brief success toast. | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S08-013** | The Challenges tab shall display the currently active weekly challenge as a card, showing: challenge title, end date ... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S08-014** | Tapping "Submit Entry" for a challenge shall open MOD-01 Quick Log Sheet pre-configured to capture a photo and captio... | `Pending Logic` | Request Expo Camera permission, wire up viewfinder snapshot, save image to cache, strip EXIF metadata. |
| **FR-S08-015** | The Challenges tab shall display a past challenges section with winner spotlight cards. Each spotlight shall show an ... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S08-016** | The system shall display a referral banner on the Community Hub: "Invite 3 friends → unlock Multi-Zone Management" wi... | `Pending Logic` | Sync preferences store settings context and update components. & Trigger native sharing via Expo Sharing API. |
| **FR-S08-017** | The system shall display one geo-targeted native ad slot on the Community Hub, positioned below the Local tab content... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. & Sync preferences store settings context and update components. |

---

## 💬 SCR-09 · Garden Cluster Detail

- **Exact File Path:** `app/(tabs)/community/cluster/[id].tsx`
- **Custom Component Inventory:** `ScreenWrapper, ClusterCoverHeader, InScreenTabBar, PostCard, MemberRow, SwapCard, FAB, CustomInput`

| Requirement ID | Summary / Description | UI Shell Status | Phase 6 Action / Verification |
| --- | --- | --- | --- |
| **FR-S09-001** | The system shall navigate to Garden Cluster Detail when the user taps a joined cluster card from SCR-08 Community Hub. | `Pending Logic` | Sync preferences store settings context and update components. |
| **FR-S09-002** | A back arrow shall return the user to SCR-08 Community Hub. | `Pending Logic` | Sync preferences store settings context and update components. |
| **FR-S09-003** | The system shall display the cluster's cover image (or a default gradient), cluster name, member count, location or i... | `Pending Logic` | Wire up Expo Location or manual zip fallback, fetch OpenWeatherMap API and update cache. & Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S09-004** | The system shall display a Join / Leave toggle button. Tapping "Join" shall add the cluster to the user's joined clus... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S09-005** | The Cluster Detail shall contain an internal tab bar: Posts, Members, Swaps, and Challenges. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S09-006** | The Posts tab shall display a reverse-chronological feed of posts from cluster members. Each post shall show: anonymi... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S09-007** | Each post shall provide: a Like count with Like button, a Comment count with Comment button, a bookmark icon ("Save P... | `Pending Logic` | Integrate SQLite read/write transaction query. & Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S09-008** | Tapping a photo on a post shall open a full-screen image viewer with a "Log this plant →" CTA that opens MOD-02 Add /... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S09-009** | Tapping the Comment button shall expand an inline comment thread below the post. | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S09-010** | The system shall provide a "Post to Cluster" FAB (bottom-right). Tapping it shall open an inline compose overlay with... | `Pending Logic` | Request Expo Camera permission, wire up viewfinder snapshot, save image to cache, strip EXIF metadata. |
| **FR-S09-011** | The Members tab shall display a list of cluster members with: anonymized avatar, anonymized username handle, method b... | `Pending Logic` | Wire up Expo Location or manual zip fallback, fetch OpenWeatherMap API and update cache. & Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S09-012** | The system shall display a summary label: "X members growing Y together" at the top of the Members tab. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S09-013** | The Swaps tab shall display seed, cutting, and tool swap listings. Each listing shall show: the item name, type (Seed... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S09-014** | Each swap listing shall include an "Express Interest" button. Tapping it shall record the user's interest and notify ... | `Pending Logic` | Integrate SQLite read/write transaction query. & Request Expo AV microphone recording, capture local audio buffer, and trigger transcription service. |
| **FR-S09-015** | The Challenges tab shall display any active cluster-specific challenge with a "Submit Entry" button that opens MOD-01... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S09-016** | The system shall provide a challenge entry share button that opens MOD-12 Export / Share Sheet. | `Pending Logic` | Compile details into a document stream via expo-print / react-native-view-shot. & Trigger native sharing via Expo Sharing API. |

---

## 🗺️ SCR-10 · Local Grow Map

- **Exact File Path:** `app/(tabs)/community/local-map.tsx`
- **Custom Component Inventory:** `ScreenWrapper, CustomHeader, GrowMapView, PrivacyFooter, BottomSheetModal, MapLayerToggleSheet, MapClusterPopupCard`

| Requirement ID | Summary / Description | UI Shell Status | Phase 6 Action / Verification |
| --- | --- | --- | --- |
| **FR-S10-001** | The system shall navigate to the Local Grow Map from the "View Map →" link on SCR-08 Community Hub and from the Local... | `Pending Logic` | Sync preferences store settings context and update components. |
| **FR-S10-002** | A back arrow shall return the user to SCR-08. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S10-003** | The system shall display an interactive map as the primary view, occupying approximately 60% of the screen height. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S10-004** | The map shall display anonymized success clusters as coloured dot markers, grouped by crop or plant category. Dot col... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S10-005** | The map shall display the user's location as a soft-glow pin at zone or city level. The map SHALL NOT display the use... | `Pending Logic` | Wire up Expo Location or manual zip fallback, fetch OpenWeatherMap API and update cache. |
| **FR-S10-006** | The map shall support standard pan and pinch-to-zoom gestures. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S10-007** | A layer toggle icon shall open a layer options sheet with three selectable views: Success Rate heat layer, Active Gro... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S10-008** | Crop filter chips (All, Tomatoes, Herbs, Leafy Greens, Root Veg, Fruit, Hydro) shall filter the visible clusters on t... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S10-009** | Tapping any cluster dot on the map shall open a bottom-sheet popup card displaying: the crop name, the number of grow... | `Pending Logic` | Sync preferences store settings context and update components. |
| **FR-S10-010** | The popup card shall provide a "Grow This Plant →" CTA button that opens MOD-02 Add / Edit Plant Sheet pre-filled wit... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S10-011** | The popup card shall provide a "View Cluster →" link that navigates to the relevant SCR-09 Garden Cluster Detail if a... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S10-012** | Below the map, the system shall display a statistics strip showing: total plants tracked in the user's city, the most... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S10-013** | The map shall display a persistent privacy footer with the label "All data anonymized — location only shared at zone ... | `Pending Logic` | Wire up Expo Location or manual zip fallback, fetch OpenWeatherMap API and update cache. & Integrate SQLite read/write transaction query. & Trigger native sharing via Expo Sharing API. |
| **FR-S10-014** | All data shown on the Local Grow Map shall be aggregated and anonymized. No individual user data, usernames, or preci... | `Pending Logic` | Wire up Expo Location or manual zip fallback, fetch OpenWeatherMap API and update cache. |

---

## 🏆 SCR-11 · Profile & Badges

- **Exact File Path:** `app/(tabs)/profile/index.tsx`
- **Custom Component Inventory:** `ScreenWrapper, CustomHeader, ProfileHeaderCard, MetricDial, StatsPillRow, MetricBreakdownRow, StreakDisplay, CalendarHeatmap, BadgeGrid, ConfidenceScoreChart, NavigationLinkRow, SupporterBadgeBanner, BadgeDetailSheet`

| Requirement ID | Summary / Description | UI Shell Status | Phase 6 Action / Verification |
| --- | --- | --- | --- |
| **FR-S11-001** | The system shall display the Profile & Badges screen when the user taps the Profile tab in the bottom navigation bar. | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S11-002** | Tapping the settings icon in the header shall navigate to SCR-12 Settings. | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S11-003** | The system shall display the user's avatar (default illustrated avatar or camera-uploaded image), display name or pla... | `Pending Logic` | Wire up Expo Location or manual zip fallback, fetch OpenWeatherMap API and update cache. & Request Expo Camera permission, wire up viewfinder snapshot, save image to cache, strip EXIF metadata. & Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S11-004** | Tapping "Edit Profile" shall allow the user to update their display name and upload or change their avatar photo. | `Pending Logic` | Integrate SQLite read/write transaction query. & Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S11-005** | The system shall display the user's overall Garden Health Score as a large circular dial (0–100) with a week-over-wee... | `Pending Logic` | Connect to Zustand state manager (usePlantStore, useUserStore, useLogStore). |
| **FR-S11-006** | Tapping "View Breakdown →" shall expand an accordion beneath the dial showing all 8 Health Score metrics with individ... | `Pending Logic` | Connect to Zustand state manager (usePlantStore, useUserStore, useLogStore). & Sync preferences store settings context and update components. |
| **FR-S11-007** | The system shall display a horizontal stats row with four pill statistics: total plants count, total log entries coun... | `Pending Logic` | Connect to Zustand state manager (usePlantStore, useUserStore, useLogStore). |
| **FR-S11-008** | The system shall display earned achievement badges in full colour and locked badges in greyscale with a padlock icon.... | `Pending Logic` | Connect to Zustand state manager (usePlantStore, useUserStore, useLogStore). & Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S11-009** | Tapping any earned badge shall display a badge detail sheet showing: the badge graphic, the badge name, the date it w... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. & Trigger native sharing via Expo Sharing API. |
| **FR-S11-010** | Tapping a locked badge shall display only the badge name and unlock criteria, with a progress indicator if applicable. | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S11-011** | The system shall display a "My Skills" section showing the Confidence Score as a 15-skill chart or bar list. Tracked ... | `Pending Logic` | Connect to Zustand state manager (usePlantStore, useUserStore, useLogStore). |
| **FR-S11-012** | Skill scores shall increment based on logged actions relevant to each skill (e.g., logging a "Feed" action increases ... | `Pending Logic` | Connect to Zustand state manager (usePlantStore, useUserStore, useLogStore). |
| **FR-S11-013** | The system shall display the current logging streak (consecutive days with at least one log entry) with a flame icon,... | `Pending Logic` | Connect to Zustand state manager (usePlantStore, useUserStore, useLogStore). & Integrate SQLite read/write transaction query. & Request Expo AV microphone recording, capture local audio buffer, and trigger transcription service. |
| **FR-S11-014** | The system shall display a 30-day calendar heatmap showing logging activity density per day. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S11-015** | The system shall display tappable navigation rows for: Progress Reels Gallery (→ SCR-15), Cemetery Log (→ SCR-14), an... | `Pending Logic` | Request Expo Camera permission, wire up viewfinder snapshot, save image to cache, strip EXIF metadata. |
| **FR-S11-016** | The system shall display a referral banner showing: "Invite 3 friends → unlock Multi-Zone Management," a progress bar... | `Pending Logic` | Trigger native sharing via Expo Sharing API. |
| **FR-S11-017** | When a user has successfully referred 3 friends (verified by the referral link being used to install the app), the sy... | `Pending Logic` | Connect to Zustand state manager (usePlantStore, useUserStore, useLogStore). |
| **FR-S11-018** | If the user has not purchased the Supporter Badge, the system shall display a subtle banner at the bottom of the Prof... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. & Wire up react-native-iap StoreKit/Google Play billing connection and purchase verification hooks. |
| **FR-S11-019** | If the user has purchased the Supporter Badge, the banner shall be replaced by a "Supporter ✓" badge on their profile... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. & Wire up react-native-iap StoreKit/Google Play billing connection and purchase verification hooks. |

---

## ⚙️ SCR-12 · Settings

- **Exact File Path:** `app/(tabs)/profile/settings.tsx`
- **Custom Component Inventory:** `ScreenWrapper, CustomHeader, SettingsSectionGroup, DangerZoneSection, NavigationLinkRow, CustomSwitch, ThemeToggle, UnitToggle`

| Requirement ID | Summary / Description | UI Shell Status | Phase 6 Action / Verification |
| --- | --- | --- | --- |
| **FR-S12-001** | The system shall navigate to Settings from the Settings icon on SCR-11 Profile and from the Settings icon on SCR-01 D... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S12-002** | A back arrow shall return the user to the previous screen. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S12-003** | The system shall provide an editable display name field and a growing method multi-select (allowing multiple methods ... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S12-004** | The system shall provide an editable location/zone field with an auto-detect button and a manual entry fallback. | `Pending Logic` | Wire up Expo Location or manual zip fallback, fetch OpenWeatherMap API and update cache. |
| **FR-S12-005** | The system shall provide a unit system selector: Metric and Imperial. Changing this shall immediately update all nume... | `Pending Logic` | Integrate SQLite read/write transaction query. & Sync preferences store settings context and update components. |
| **FR-S12-006** | The system shall provide a "Notification Preferences →" row that opens MOD-10 Notification Preferences Sheet. | `Pending Logic` | Schedule dynamic notification triggers via Expo Notifications API. |
| **FR-S12-007** | The system shall provide a theme toggle with two options: Balcony Bright (light mode) and Grow Tent Dark (dark mode). | `Pending Logic` | Integrate context ThemeProvider toggle state hook. |
| **FR-S12-008** | The system shall provide a font selector with at minimum two options: Standard and Dyslexia-Friendly (OpenDyslexic or... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S12-009** | The system shall provide a Colour-Blind Mode toggle. When enabled, all health status indicators and metric colour cod... | `Pending Logic` | Sync preferences store settings context and update components. |
| **FR-S12-010** | The system shall provide a text size slider allowing the user to adjust the base text size across the app. | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S12-011** | The system shall provide a Voice Input toggle. When enabled, a microphone icon shall be surfaced on all text input fi... | `Pending Logic` | Request Expo AV microphone recording, capture local audio buffer, and trigger transcription service. |
| **FR-S12-012** | The system shall provide a Screen Reader Mode toggle. When enabled, the system shall optimise all interactive element... | `Pending Logic` | Request Expo AV microphone recording, capture local audio buffer, and trigger transcription service. & Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S12-013** | The system shall provide a Reduce Motion toggle. When enabled, all non-essential animations (confetti, leaf unfurl, m... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S12-014** | The system shall provide a language selector with at minimum English and German at launch. Changing language shall re... | `Pending Logic` | Sync preferences store settings context and update components. |
| **FR-S12-015** | The system shall provide a date format selector: DD/MM/YYYY or MM/DD/YYYY. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S12-016** | The system shall provide a "Privacy Dashboard →" row that navigates to SCR-13. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S12-017** | The system shall provide a "Do Not Sell My Info" toggle (CCPA compliance). Enabling it shall immediately disable all ... | `Pending Logic` | Integrate SQLite read/write transaction query. & Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S12-018** | The system shall provide an Ad Personalisation toggle. Disabling it shall suppress personalised ad targeting without ... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S12-019** | The system shall provide a Community Data opt-in toggle for contributing anonymized grow data to the Local Grow Map a... | `Pending Logic` | Sync preferences store settings context and update components. |
| **FR-S12-020** | The system shall provide a "Supporter Badge — Remove Ads" row that opens MOD-07 Supporter Badge Dialog. | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S12-021** | The system shall provide a "Show contextual learning tips" toggle. When disabled, the system shall suppress all conte... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S12-022** | The system shall provide an "Offline article caching" toggle. When enabled, the system shall download all Smart Tips ... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. & Sync preferences store settings context and update components. |
| **FR-S12-023** | The About section shall display the current app version string. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S12-024** | The About section shall provide tappable links to: Terms of Service, Privacy Policy, Rate GardenPulse (opens the resp... | `Pending Logic` | Connect to Zustand state manager (usePlantStore, useUserStore, useLogStore). |
| **FR-S12-025** | The system shall provide an "Export All My Data" button that initiates a GDPR-compliant data export. The system shall... | `Pending Logic` | Integrate SQLite read/write transaction query. & Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. & Compile details into a document stream via expo-print / react-native-view-shot. |
| **FR-S12-026** | The system shall provide a "Delete All My Data" button styled in red. Tapping it shall display a two-step confirmatio... | `Pending Logic` | Integrate SQLite read/write transaction query. & Request Expo AV microphone recording, capture local audio buffer, and trigger transcription service. |
| **FR-S12-027** | The system shall provide a "Sign Out" button that clears the local session while retaining cached plant data, allowin... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |

---

## 🛡️ SCR-13 · Privacy Dashboard

- **Exact File Path:** `app/(tabs)/profile/privacy.tsx`
- **Custom Component Inventory:** `ScreenWrapper, CustomHeader, PrivacyToggleRow, DataInventoryRow, PendingExportStatusCard, CustomButton`

| Requirement ID | Summary / Description | UI Shell Status | Phase 6 Action / Verification |
| --- | --- | --- | --- |
| **FR-S13-001** | The system shall navigate to the Privacy Dashboard from the "Privacy & Data" section in SCR-12 Settings. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S13-002** | A back arrow shall return the user to SCR-12. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S13-003** | The screen shall display a "Last updated [timestamp]" label in the header showing when the privacy settings were last... | `Pending Logic` | Integrate SQLite read/write transaction query. & Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S13-004** | The system shall display a clear inventory of all data categories stored by the app. Each category shall be shown as ... | `Pending Logic` | Connect to Zustand state manager (usePlantStore, useUserStore, useLogStore). |
| **FR-S13-005** | The data inventory shall cover at minimum the following categories: Location Data, Plant Logs, Photos, Voice Logs, an... | `Pending Logic` | Wire up Expo Location or manual zip fallback, fetch OpenWeatherMap API and update cache. & Request Expo AV microphone recording, capture local audio buffer, and trigger transcription service. & Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S13-006** | Each data category row shall provide a "Clear" or "Delete All" button that immediately deletes all data in that categ... | `Pending Logic` | Integrate SQLite read/write transaction query. |
| **FR-S13-007** | The Plant Logs category row shall additionally provide an "Export" button that triggers the data export flow for log ... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. & Compile details into a document stream via expo-print / react-native-view-shot. |
| **FR-S13-008** | The system shall provide granular on/off toggles for each of the following: Location Sharing, Photo Storage, Voice Lo... | `Pending Logic` | Wire up Expo Location or manual zip fallback, fetch OpenWeatherMap API and update cache. & Request Expo AV microphone recording, capture local audio buffer, and trigger transcription service. & Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. & Sync preferences store settings context and update components. |
| **FR-S13-009** | Disabling any toggle shall take effect immediately and persist across app restarts. | `Pending Logic` | Integrate SQLite read/write transaction query. |
| **FR-S13-010** | Disabling Community Anonymised Data Contribution shall remove the user's aggregate data from the Local Grow Map and a... | `Pending Logic` | Sync preferences store settings context and update components. |
| **FR-S13-011** | The system shall display a prominent "Export My Data" CTA button (GDPR Art. 20 — data portability). Tapping it shall ... | `Pending Logic` | Integrate SQLite read/write transaction query. & Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. & Compile details into a document stream via expo-print / react-native-view-shot. |
| **FR-S13-012** | The system shall display a "Delete All My Data" CTA button styled in red (GDPR Art. 17 — right to erasure). This shal... | `Pending Logic` | Integrate SQLite read/write transaction query. |
| **FR-S13-013** | The system shall display a prominent "Do Not Sell My Info" toggle (CCPA Section 1798.120). This shall be visually dis... | `Pending Logic` | Integrate SQLite read/write transaction query. |
| **FR-S13-014** | The system shall display a tappable Privacy Policy link and a tappable Data Processing Agreements summary link. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S13-015** | If a data export request is pending, the system shall display a status card on the Privacy Dashboard: "Your data expo... | `Pending Logic` | Compile details into a document stream via expo-print / react-native-view-shot. |

---

## 🪦 SCR-14 · Cemetery Log

- **Exact File Path:** `app/(tabs)/profile/cemetery.tsx`
- **Custom Component Inventory:** `ScreenWrapper, CustomHeader, CemeteryEntryCard, PatternInsightCard, CustomButton, CustomInput`

| Requirement ID | Summary / Description | UI Shell Status | Phase 6 Action / Verification |
| --- | --- | --- | --- |
| **FR-S14-001** | The system shall navigate to the Cemetery Log from SCR-11 Profile navigation links and from the Archive confirmation ... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S14-002** | A back arrow shall return the user to the originating screen. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S14-003** | A "+ Add" button in the header shall allow the user to manually add a plant that died before the app was in use, with... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S14-004** | When the Cemetery Log contains two or more archived plants with the same cause of death, the system shall display a d... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S14-005** | When the Cemetery Log is empty, the system shall display an empty state with an illustrated gravestone graphic and th... | `Pending Logic` | Connect to Zustand state manager (usePlantStore, useUserStore, useLogStore). & Integrate SQLite read/write transaction query. & Request Expo AV microphone recording, capture local audio buffer, and trigger transcription service. |
| **FR-S14-006** | Each archived plant entry shall display: plant thumbnail, plant name, growing method badge, date archived, and a "cau... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S14-007** | The cause of death shall be editable via a selector with pre-defined categories: pH Spike, Root Rot, Overwatering, Un... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S14-008** | Each entry shall include an editable "What I learned:" text field with a voice input microphone icon. Notes saved her... | `Pending Logic` | Integrate SQLite read/write transaction query. & Request Expo AV microphone recording, capture local audio buffer, and trigger transcription service. |
| **FR-S14-009** | The Cemetery Log shall be filterable by: Method, Date, and Cause. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S14-010** | Each entry shall provide a "Restore to Garden" button. Tapping it shall move the plant back to SCR-02 Plant List as a... | `Pending Logic` | Connect to Zustand state manager (usePlantStore, useUserStore, useLogStore). |
| **FR-S14-011** | Each entry shall provide a "Delete Entry" icon. Tapping it shall display a confirmation dialog before permanently del... | `Pending Logic` | Integrate SQLite read/write transaction query. |
| **FR-S14-012** | A "+ Log Manually" CTA button shall open an inline form with fields for: plant name, growing method, estimated date o... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S14-013** | The system shall provide an "Export Log as PDF" button. Tapping it shall trigger MOD-05 Rewarded Video Prompt. After ... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. & Compile details into a document stream via expo-print / react-native-view-shot. & Trigger native sharing via Expo Sharing API. |

---

## 🎥 SCR-15 · Progress Reels Gallery

- **Exact File Path:** `app/(tabs)/garden/reels.tsx`
- **Custom Component Inventory:** `ScreenWrapper, CustomHeader, StatsPillRow, FilterChip, ReelCard, VideoPlayer, ReelGeneratorFlow, EmptyStateView`

| Requirement ID | Summary / Description | UI Shell Status | Phase 6 Action / Verification |
| --- | --- | --- | --- |
| **FR-S15-001** | The system shall navigate to the Progress Reels Gallery when the user taps: the hero image on SCR-03, the "Progress R... | `Pending Logic` | Request Expo Camera permission, wire up viewfinder snapshot, save image to cache, strip EXIF metadata. |
| **FR-S15-002** | When navigated from SCR-03, the gallery shall open pre-filtered to show only reels for the originating plant. | `Pending Logic` | Request Expo Camera permission, wire up viewfinder snapshot, save image to cache, strip EXIF metadata. |
| **FR-S15-003** | A back arrow shall return the user to the previous screen. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S15-004** | The system shall display all generated reels in a 2-column grid. Each card shall show: video thumbnail with a play ic... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S15-005** | The system shall display filter chips above the grid: All, By Plant, By Method, By Date. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S15-006** | When the user has no reels, the system shall display an empty state with the heading "No reels yet," the sub-label "Y... | `Pending Logic` | Connect to Zustand state manager (usePlantStore, useUserStore, useLogStore). & Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S15-007** | Tapping a reel card shall open a full-screen playback view with the reel auto-playing muted. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S15-008** | The playback view shall display a method-specific data overlay on the video: method badge and key metrics recorded du... | `Pending Logic` | Integrate SQLite read/write transaction query. & Request Expo AV microphone recording, capture local audio buffer, and trigger transcription service. & Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. & Sync preferences store settings context and update components. |
| **FR-S15-009** | The system shall display the GardenPulse watermark on all reel playback and exports by default. Users who have purcha... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. & Wire up react-native-iap StoreKit/Google Play billing connection and purchase verification hooks. & Compile details into a document stream via expo-print / react-native-view-shot. |
| **FR-S15-010** | The playback view shall provide: a Share button (opens MOD-12), a Download button (triggers MOD-05 Rewarded Video Pro... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. & Trigger native sharing via Expo Sharing API. |
| **FR-S15-011** | Tapping "+ Create" shall start a 4-step reel generation flow: (1) plant selector from the user's plant list, (2) date... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S15-012** | The system shall require a minimum of 3 logged photos for a plant before allowing reel generation for that plant. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S15-013** | Tapping "Generate Reel" in step 4 shall trigger a loading animation and then produce the reel locally on-device. The ... | `Pending Logic` | Request Expo Camera permission, wire up viewfinder snapshot, save image to cache, strip EXIF metadata. & Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |

---

## 🎨 SCR-16 · Creator Studio

- **Exact File Path:** `app/(tabs)/profile/creator-studio.tsx`
- **Custom Component Inventory:** `ScreenWrapper, CustomHeader, RevenueBanner, RichTextEditor, PublishedGuideCard, CustomSwitch, CustomButton`

| Requirement ID | Summary / Description | UI Shell Status | Phase 6 Action / Verification |
| --- | --- | --- | --- |
| **FR-S16-001** | The system shall navigate to the Creator Studio from the "Creator Studio" row on SCR-11 Profile. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S16-002** | A back arrow shall return the user to SCR-11. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S16-003** | The "Publish" button in the header shall be disabled (greyed) until the guide has passed a pre-publication readiness ... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S16-004** | The system shall display a revenue info banner at the top of the Creator Studio: "Write guides → earn AdMob revenue s... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. & Trigger native sharing via Expo Sharing API. |
| **FR-S16-005** | The system shall provide a "Learn How It Works" link in the banner that opens a brief inline explanation of the creat... | `Pending Logic` | Trigger native sharing via Expo Sharing API. |
| **FR-S16-006** | The system shall provide a cover image upload area. Tapping it shall offer options: capture with camera (triggers MOD... | `Pending Logic` | Request Expo Camera permission, wire up viewfinder snapshot, save image to cache, strip EXIF metadata. & Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S16-007** | The system shall provide a guide title text field with a maximum of 80 characters. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S16-008** | The system shall provide a category / method multi-select using chips. Available categories shall include: Soil, Hydr... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S16-009** | The system shall provide a tags field accepting a maximum of 5 tags, with autocomplete suggestions from the app's tag... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S16-010** | The system shall provide a rich text editor with a formatting toolbar: Bold, Italic, Heading (H2, H3), Bullet List, N... | `Pending Logic` | Integrate SQLite read/write transaction query. & Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S16-011** | The editor shall provide an "Insert Plant Template" shortcut button that inserts a standardised plant care table temp... | `Pending Logic` | Integrate SQLite read/write transaction query. |
| **FR-S16-012** | The editor shall provide an "Insert Tip Block" shortcut button that inserts a styled callout block (visually distinct... | `Pending Logic` | Integrate SQLite read/write transaction query. |
| **FR-S16-013** | The system shall calculate and display an estimated read time label that updates live as the user writes. | `Pending Logic` | Integrate SQLite read/write transaction query. & Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S16-014** | The system shall provide a "Preview" toggle that switches the editor to a read-view, showing the guide exactly as it ... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S16-015** | The system shall provide a "Save Draft" button that saves the current guide locally and syncs it when the device is c... | `Pending Logic` | Integrate SQLite read/write transaction query. |
| **FR-S16-016** | The system shall provide a "Submit for Review" CTA button. Tapping it shall display a confirmation dialog: "Submit fo... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S16-017** | The system shall display a "My Published Guides" section below the editor area, listing all of the user's guides with... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S16-018** | If a guide is rejected, the status chip shall be tappable to reveal the moderation rejection reason. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-S16-019** | For Live guides, the system shall provide an "Edit" button that creates a new draft version of the guide. The live ve... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-S16-020** | For Live guides, the system shall display an ad revenue earned label sourced from the creator's share of AdMob revenu... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. & Trigger native sharing via Expo Sharing API. |

---

## 📝 MOD-01 · Quick Log Sheet

- **Exact File Path:** `app/modals/quick-log.tsx`
- **Custom Component Inventory:** `ScreenWrapper, CustomHeader, QuickLogPlantSelector, ActivityTypeChips, PhotoCaptureArea, MoodEmojiSlider, NotesInput, MetricsQuickEntry, CustomButton`

| Requirement ID | Summary / Description | UI Shell Status | Phase 6 Action / Verification |
| --- | --- | --- | --- |
| **FR-M01-001** | The Quick Log Sheet shall be triggered by: the "+" FAB on SCR-01 Dashboard, the "+" FAB on SCR-02 Plant List, the "Lo... | `Pending Logic` | Sync preferences store settings context and update components. |
| **FR-M01-002** | The sheet shall open as a bottom sheet with an initial snap height of approximately 50% of screen height, expandable ... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-M01-003** | Tapping outside the sheet or dragging it downward shall dismiss it without saving any data. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-M01-004** | The sheet shall display a horizontal scrollable list of the user's active plants as thumbnail cards. If the sheet was... | `Pending Logic` | Connect to Zustand state manager (usePlantStore, useUserStore, useLogStore). |
| **FR-M01-005** | Selecting a plant shall highlight its card with a selection ring. At least one plant must be selected before the "Log... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-M01-006** | The sheet shall display a large photo capture area. Tapping it shall open the native camera (triggering MOD-04 if cam... | `Pending Logic` | Request Expo Camera permission, wire up viewfinder snapshot, save image to cache, strip EXIF metadata. & Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-M01-007** | A photo is optional. The user shall be able to log an entry without capturing a photo. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-M01-008** | The sheet shall display activity type chips (multi-select): Water, Feed, Prune, Check, Harvest, Repot, Transplant, No... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-M01-009** | The sheet shall display a single emoji-scale slider from 1 (😟) to 5 (😄) labelled "How did it go?" The slider shall de... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-M01-010** | The sheet shall display a freeform "Add a quick note…" text area with a microphone icon. Tapping the microphone icon ... | `Pending Logic` | Integrate SQLite read/write transaction query. & Request Expo AV microphone recording, capture local audio buffer, and trigger transcription service. & Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-M01-011** | The system shall NEVER auto-activate the microphone. It shall only activate on explicit user tap of the mic icon. | `Pending Logic` | Request Expo AV microphone recording, capture local audio buffer, and trigger transcription service. |
| **FR-M01-012** | The sheet shall display an auto-generated location tag chip (e.g., "Berlin · Zone 7b"). The user shall be able to rem... | `Pending Logic` | Wire up Expo Location or manual zip fallback, fetch OpenWeatherMap API and update cache. |
| **FR-M01-013** | The sheet shall display an "Add to Reel" toggle. When enabled, the logged photo shall be included in the timelapse se... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-M01-014** | The sheet shall include a collapsed "Add metrics (optional)" row. When expanded, it shall reveal: a pH slider, an EC/... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. & Sync preferences store settings context and update components. |
| **FR-M01-015** | The "Log It ✓" button shall be enabled only when at least one plant and one activity type are selected. Tapping it sh... | `Pending Logic` | Connect to Zustand state manager (usePlantStore, useUserStore, useLogStore). & Integrate SQLite read/write transaction query. |

---

## ➕ MOD-02 · Add / Edit Plant Sheet

- **Exact File Path:** `app/modals/add-plant.tsx`
- **Custom Component Inventory:** `ScreenWrapper, CustomHeader, CustomInput, AutocompleteSearchInput, RadioGroup, RepeatSelector, PhotoCaptureArea, CustomButton`

| Requirement ID | Summary / Description | UI Shell Status | Phase 6 Action / Verification |
| --- | --- | --- | --- |
| **FR-M02-001** | The Add / Edit Plant Sheet shall be triggered by: the "+" button on SCR-02 Plant List, the "Add Your First Plant" but... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-M02-002** | When triggered from SCR-03 for editing, all fields shall be pre-filled with the existing plant's data. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-M02-003** | Tapping "Cancel" or swiping the sheet down shall dismiss without saving. If unsaved changes are present, a confirmati... | `Pending Logic` | Integrate SQLite read/write transaction query. |
| **FR-M02-004** | The sheet shall display a plant name search field with autocomplete sourced from the local plant database (minimum 3,... | `Pending Logic` | Integrate SQLite read/write transaction query. |
| **FR-M02-005** | The sheet shall provide a "Scan to identify" camera button. If camera permission is not granted, MOD-04 (Camera) shal... | `Pending Logic` | Request Expo Camera permission, wire up viewfinder snapshot, save image to cache, strip EXIF metadata. |
| **FR-M02-006** | The sheet shall provide browse-by-type category chips: Herb, Vegetable, Fruit, Flower, Houseplant, Microgreen. Tappin... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-M02-007** | The sheet shall provide a plant photo capture / gallery import area. The selected photo shall be used as the plant's ... | `Pending Logic` | Request Expo Camera permission, wire up viewfinder snapshot, save image to cache, strip EXIF metadata. |
| **FR-M02-008** | The sheet shall provide a nickname field with a maximum of 30 characters. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-M02-009** | The sheet shall provide a required growing method selector with pills: Soil, Container, Hydro, Indoor. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-M02-010** | The sheet shall provide a conditional container/pot size field (shown only when the Container method is selected), wi... | `Pending Logic` | Sync preferences store settings context and update components. |
| **FR-M02-011** | The sheet shall display the auto-detected zone badge. A "Change location" link shall allow the user to manually enter... | `Pending Logic` | Wire up Expo Location or manual zip fallback, fetch OpenWeatherMap API and update cache. & Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-M02-012** | The sheet shall provide a started date picker (date selector, defaults to today) and an optional target harvest date ... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-M02-013** | The sheet shall provide a "Remind me for this plant" toggle. When enabled, the plant's care tasks shall generate noti... | `Pending Logic` | Schedule dynamic notification triggers via Expo Notifications API. |
| **FR-M02-014** | The "Save Plant" button shall be enabled only when the plant name field is non-empty and a growing method is selected. | `Pending Logic` | Integrate SQLite read/write transaction query. |
| **FR-M02-015** | On save, if this is a new plant, the system shall add the plant to SCR-02 Plant List and navigate to SCR-03 Plant Det... | `Pending Logic` | Integrate SQLite read/write transaction query. & Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |

---

## 🔍 MOD-03 · QR Scanner Overlay

- **Exact File Path:** `app/modals/qr-scanner.tsx`
- **Custom Component Inventory:** `ScreenWrapper, CustomHeader, CameraViewfinder, QRSuccessCard`

| Requirement ID | Summary / Description | UI Shell Status | Phase 6 Action / Verification |
| --- | --- | --- | --- |
| **FR-M03-001** | The QR Scanner Overlay shall be triggered by: the "QR / Label Scanner" card on SCR-04 Tools Hub, and the "Scan label"... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-M03-002** | A "✕ Close" button in the top-left shall dismiss the overlay and return the user to the triggering screen without any... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-M03-003** | The overlay shall display a full-screen live camera feed. If camera permission has not been granted, MOD-04 (Permissi... | `Pending Logic` | Request Expo Camera permission, wire up viewfinder snapshot, save image to cache, strip EXIF metadata. |
| **FR-M03-004** | The overlay shall display an animated scan frame (rectangle with pulsing border) as a visual alignment guide for QR c... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-M03-005** | The overlay shall display a "Point at a QR code or barcode" instruction label. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-M03-006** | The overlay shall provide a flash/torch toggle icon. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-M03-007** | The overlay shall provide a "Enter code manually" fallback text link at the bottom of the screen for situations where... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-M03-008** | Upon successful detection of a QR code or barcode, the system shall check the detected value against the local brand/... | `Pending Logic` | Integrate SQLite read/write transaction query. |
| **FR-M03-009** | When a match is found, the system shall display a bottom sheet card showing: product thumbnail (if available), produc... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-M03-010** | The success card shall provide contextual action buttons based on the triggering screen: "Fill Calculator →" (if trig... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-M03-011** | When no match is found in the local database, the system shall display the raw decoded value and a "Log Scan →" butto... | `Pending Logic` | Integrate SQLite read/write transaction query. |

---

## 🔑 MOD-04 · Permission Context Modal

- **Exact File Path:** `app/modals/permission.tsx`
- **Custom Component Inventory:** `ScreenWrapper, CustomHeader, PermissionIllustration, PermissionDeniedState, CustomButton`

| Requirement ID | Summary / Description | UI Shell Status | Phase 6 Action / Verification |
| --- | --- | --- | --- |
| **FR-M04-001** | The Permission Context Modal shall be triggered contextually — never at app launch or during onboarding unless the us... | `Pending Logic` | Wire up Expo Location or manual zip fallback, fetch OpenWeatherMap API and update cache. & Request Expo Camera permission, wire up viewfinder snapshot, save image to cache, strip EXIF metadata. & Request Expo AV microphone recording, capture local audio buffer, and trigger transcription service. |
| **FR-M04-002** | The Location variant shall be triggered after the user taps "Next" on ONB-2 and before navigating to ONB-3. | `Pending Logic` | Wire up Expo Location or manual zip fallback, fetch OpenWeatherMap API and update cache. |
| **FR-M04-003** | The Camera variant shall be triggered the first time the user taps any camera-dependent feature: Leaf Diagnostics, QR... | `Pending Logic` | Request Expo Camera permission, wire up viewfinder snapshot, save image to cache, strip EXIF metadata. & Load local TFLite classification model, process viewfinder image frame, perform diagnosis. |
| **FR-M04-004** | The Microphone variant shall be triggered only when the user explicitly taps a microphone / voice input icon. | `Pending Logic` | Request Expo AV microphone recording, capture local audio buffer, and trigger transcription service. |
| **FR-M04-005** | The modal shall display a contextual illustration relevant to the permission type: a map pin with leaf (location), a ... | `Pending Logic` | Wire up Expo Location or manual zip fallback, fetch OpenWeatherMap API and update cache. & Request Expo Camera permission, wire up viewfinder snapshot, save image to cache, strip EXIF metadata. & Request Expo AV microphone recording, capture local audio buffer, and trigger transcription service. |
| **FR-M04-006** | The modal shall display a title and a two-sentence benefit description explaining what the permission enables and how... | `Pending Logic` | Wire up Expo Location or manual zip fallback, fetch OpenWeatherMap API and update cache. |
| **FR-M04-007** | The modal shall display a privacy reassurance label (e.g., "Location never shared publicly without explicit opt-in"). | `Pending Logic` | Wire up Expo Location or manual zip fallback, fetch OpenWeatherMap API and update cache. & Trigger native sharing via Expo Sharing API. |
| **FR-M04-008** | The primary "Allow [Permission]" button shall trigger the native OS system permission dialog. The modal shall close a... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-M04-009** | The "Not Now" secondary link shall dismiss the modal without triggering the OS permission dialog. The originating fea... | `Pending Logic` | Wire up Expo Location or manual zip fallback, fetch OpenWeatherMap API and update cache. & Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-M04-010** | A "Learn more about privacy →" text link shall navigate to SCR-13 Privacy Dashboard. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-M04-011** | If the user has previously denied a permission at the OS level and then triggers a feature requiring it, the system s... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-M04-012** | For the camera-denied state specifically, the system shall also display a "Use Gallery Instead" fallback button that ... | `Pending Logic` | Connect to Zustand state manager (usePlantStore, useUserStore, useLogStore). & Request Expo Camera permission, wire up viewfinder snapshot, save image to cache, strip EXIF metadata. & Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |

---

## 📺 MOD-05 · Rewarded Video Prompt

- **Exact File Path:** `app/modals/rewarded-video.tsx`
- **Custom Component Inventory:** `ScreenWrapper, CustomHeader, RewardedVideoPrompt`

| Requirement ID | Summary / Description | UI Shell Status | Phase 6 Action / Verification |
| --- | --- | --- | --- |
| **FR-M05-001** | The Rewarded Video Prompt shall be triggered by: the "Export / Share" button on SCR-05 Nutrient / Recipe Calculator r... | `Pending Logic` | Request Expo Camera permission, wire up viewfinder snapshot, save image to cache, strip EXIF metadata. & Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. & Compile details into a document stream via expo-print / react-native-view-shot. & Trigger native sharing via Expo Sharing API. |
| **FR-M05-002** | The prompt shall display a video play icon graphic, a heading "Unlock [X]" (where X is the specific unlock: "PDF Expo... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. & Compile details into a document stream via expo-print / react-native-view-shot. |
| **FR-M05-003** | The prompt shall display a "▶ Watch Video" primary button and a "No Thanks" secondary text link. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-M05-004** | Tapping "No Thanks" shall dismiss the prompt and return the user to the triggering screen without providing the unlock. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-M05-005** | Tapping "Watch Video" shall launch the AdMob rewarded video unit in full-screen. | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. & Sync preferences store settings context and update components. |
| **FR-M05-006** | The video player shall display a progress timer label and a skip button that appears only after the required minimum ... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. & Sync preferences store settings context and update components. |
| **FR-M05-007** | After the video completes (or skip is allowed and tapped), the system shall display an unlock success state with: an ... | `Pending Logic` | Connect to Zustand state manager (usePlantStore, useUserStore, useLogStore). & Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. & Compile details into a document stream via expo-print / react-native-view-shot. |
| **FR-M05-008** | Tapping "Download / Export Now" shall open MOD-12 Export / Share Sheet with the unlocked content ready. | `Pending Logic` | Connect to Zustand state manager (usePlantStore, useUserStore, useLogStore). & Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. & Compile details into a document stream via expo-print / react-native-view-shot. & Trigger native sharing via Expo Sharing API. |
| **FR-M05-009** | The success state shall auto-dismiss after 3 seconds if the user does not tap the CTA. | `Pending Logic` | Connect to Zustand state manager (usePlantStore, useUserStore, useLogStore). |

---

## 📢 MOD-06 · Interstitial Ad

- **Exact File Path:** `app/modals/interstitial-ad.tsx`
- **Custom Component Inventory:** `InterstitialAdContainer`

| Requirement ID | Summary / Description | UI Shell Status | Phase 6 Action / Verification |
| --- | --- | --- | --- |
| **FR-M06-001** | The Interstitial Ad shall be triggered ONLY when the user taps "Generate Recipe" on SCR-05 Nutrient / Recipe Calculat... | `Pending Logic` | Connect to Zustand state manager (usePlantStore, useUserStore, useLogStore). & Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-M06-002** | The Interstitial Ad SHALL NEVER be triggered on: any onboarding screen (ONB-1 through ONB-4), any permission request ... | `Pending Logic` | Connect to Zustand state manager (usePlantStore, useUserStore, useLogStore). & Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-M06-003** | The system shall display the AdMob interstitial unit full-screen with an attribution label "Ad · Powered by AdMob." | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. & Sync preferences store settings context and update components. |
| **FR-M06-004** | A "✕ Close" button shall appear after a minimum of 5 seconds, complying with AdMob interstitial policy. Tapping it sh... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-M06-005** | When a user has purchased the Supporter Badge (MOD-07), the Interstitial Ad trigger on SCR-05 shall be suppressed ent... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. & Wire up react-native-iap StoreKit/Google Play billing connection and purchase verification hooks. |

---

## 🏅 MOD-07 · Supporter Badge Dialog

- **Exact File Path:** `app/modals/supporter-badge.tsx`
- **Custom Component Inventory:** `ScreenWrapper, CustomHeader, SupporterBenefitsList, CustomButton`

| Requirement ID | Summary / Description | UI Shell Status | Phase 6 Action / Verification |
| --- | --- | --- | --- |
| **FR-M07-001** | The Supporter Badge Dialog shall be triggered by: the "Supporter Badge — Remove Ads" row in SCR-12 Settings, and the ... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-M07-002** | The dialog shall display the Supporter Badge graphic with an animated shimmer, the heading "Support GardenPulse 🌿," a... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-M07-003** | The dialog shall display a "What you get" list: Remove interstitial ads forever, Supporter badge on your profile, Gar... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. & Compile details into a document stream via expo-print / react-native-view-shot. |
| **FR-M07-004** | The dialog shall display a "What stays" note in grey text: "Tips and native content remain — they help us improve the... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-M07-005** | Tapping the "Support GardenPulse — $2.99" button shall initiate the platform's native in-app purchase flow (App Store... | `Pending Logic` | Connect to Zustand state manager (usePlantStore, useUserStore, useLogStore). & Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. & Wire up react-native-iap StoreKit/Google Play billing connection and purchase verification hooks. |
| **FR-M07-006** | On successful purchase, the system shall permanently record the Supporter Badge status, suppress all future interstit... | `Pending Logic` | Integrate SQLite read/write transaction query. & Request Expo AV microphone recording, capture local audio buffer, and trigger transcription service. & Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. & Wire up react-native-iap StoreKit/Google Play billing connection and purchase verification hooks. |
| **FR-M07-007** | The dialog shall display a "Restore Purchase" link. Tapping it shall query the platform's purchase restoration API an... | `Pending Logic` | Connect to Zustand state manager (usePlantStore, useUserStore, useLogStore). & Integrate SQLite read/write transaction query. & Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. & Wire up react-native-iap StoreKit/Google Play billing connection and purchase verification hooks. |
| **FR-M07-008** | Tapping "Not Now" shall dismiss the dialog without initiating any purchase flow. | `Pending Logic` | Wire up react-native-iap StoreKit/Google Play billing connection and purchase verification hooks. |

---

## 🗂️ MOD-08 · Batch Mode Overlay

- **Exact File Path:** `app/modals/batch-mode.tsx`
- **Custom Component Inventory:** `ScreenWrapper, CustomHeader, BatchModeHeader, BatchActionBar`

| Requirement ID | Summary / Description | UI Shell Status | Phase 6 Action / Verification |
| --- | --- | --- | --- |
| **FR-M08-001** | The Batch Mode Overlay shall be activated by the batch mode toggle button in the SCR-02 Plant List header. | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-M08-002** | Activating batch mode shall transform all plant cards in SCR-02 to show multi-select checkboxes without navigating aw... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-M08-003** | The system shall replace the SCR-02 header with a batch mode header showing: a "Batch Mode" label, a selected count b... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-M08-004** | Tapping "Select All" shall select all plants currently visible in the list (respecting any active method filter). | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-M08-005** | When one or more plants are selected, the system shall display a bottom action bar with the following buttons: Water ... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-M08-006** | Tapping "Water All" shall display a confirmation dialog: "Mark [N] plants as watered today?" On confirmation, the sys... | `Pending Logic` | Integrate SQLite read/write transaction query. |
| **FR-M08-007** | Tapping "Feed All" shall display a confirmation dialog: "Log a Feed entry for [N] plants?" On confirmation, the syste... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-M08-008** | Tapping "Log Entry" shall open MOD-01 Quick Log Sheet with the multi-plant mode active — the plant selector shall sho... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-M08-009** | Tapping "Archive" shall display a confirmation dialog: "Archive [N] plants to the Cemetery Log?" On confirmation, all... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-M08-010** | Tapping "✕ Cancel" or tapping the batch mode toggle again shall exit batch mode, restore the standard plant card view... | `Pending Logic` | Connect to Zustand state manager (usePlantStore, useUserStore, useLogStore). |

---

## 📖 MOD-09 · Tip Article Reader Sheet

- **Exact File Path:** `app/modals/tips.tsx`
- **Custom Component Inventory:** `ScreenWrapper, CustomHeader, ArticleBodyRenderer, RelatedArticlesRow`

| Requirement ID | Summary / Description | UI Shell Status | Phase 6 Action / Verification |
| --- | --- | --- | --- |
| **FR-M09-001** | The Tip Article Reader Sheet shall be triggered by: the contextual tip card on SCR-01 Dashboard, the contextual tip c... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. & Load local TFLite classification model, process viewfinder image frame, perform diagnosis. |
| **FR-M09-002** | The sheet shall open as a bottom sheet, initially at approximately 50% screen height, draggable to full screen. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-M09-003** | The sheet shall display: a header image (offline-cached), the article title, a meta row (method tag chip, estimated r... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-M09-004** | Article body content shall be rendered from the locally cached Smart Tips Library. The system shall NOT load external... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-M09-005** | Article content shall NOT auto-play any video or audio. | `Pending Logic` | Request Expo AV microphone recording, capture local audio buffer, and trigger transcription service. |
| **FR-M09-006** | The sheet shall display one native ad block within the article body, styled as a "Recommended Tool" card, non-interru... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-M09-007** | The sheet shall display a "Related Articles" row at the bottom showing 2 articles with thumbnails and titles. Tapping... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-M09-008** | The sheet shall provide a bookmark icon. Tapping it shall save the article to a "Bookmarked Tips" collection accessib... | `Pending Logic` | Integrate SQLite read/write transaction query. |
| **FR-M09-009** | The sheet shall provide a Share icon that opens MOD-12 Export / Share Sheet with the article title and a deep link as... | `Pending Logic` | Compile details into a document stream via expo-print / react-native-view-shot. & Trigger native sharing via Expo Sharing API. |
| **FR-M09-010** | The sheet shall provide a "Mark as Read ✓" button. Tapping it shall mark the article as read so it does not re-appear... | `Pending Logic` | Integrate SQLite read/write transaction query. & Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |

---

## 🔔 MOD-10 · Notification Prefs Sheet

- **Exact File Path:** `app/modals/notification-prefs.tsx`
- **Custom Component Inventory:** `ScreenWrapper, CustomHeader, NotificationOptInRow, CustomButton`

| Requirement ID | Summary / Description | UI Shell Status | Phase 6 Action / Verification |
| --- | --- | --- | --- |
| **FR-M10-001** | The Notification Preferences Sheet shall be triggered by the "Notification Preferences →" row in SCR-12 Settings and ... | `Pending Logic` | Schedule dynamic notification triggers via Expo Notifications API. |
| **FR-M10-002** | The sheet shall display a master "Enable all reminders" toggle at the top. When disabled, all per-category toggles sh... | `Pending Logic` | Connect to Zustand state manager (usePlantStore, useUserStore, useLogStore). & Schedule dynamic notification triggers via Expo Notifications API. |
| **FR-M10-003** | The sheet shall display individual on/off toggles for the following notification categories: Watering Reminders, Feed... | `Pending Logic` | Wire up Expo Location or manual zip fallback, fetch OpenWeatherMap API and update cache. & Integrate SQLite read/write transaction query. & Schedule dynamic notification triggers via Expo Notifications API. & Sync preferences store settings context and update components. |
| **FR-M10-004** | Toggling any individual category shall take immediate effect without requiring a "Save" action. | `Pending Logic` | Integrate SQLite read/write transaction query. |
| **FR-M10-005** | The sheet shall display a timing preference section with a radio selector: Morning (7–9 AM), Afternoon (12–2 PM), Eve... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. & Schedule dynamic notification triggers via Expo Notifications API. |
| **FR-M10-006** | The sheet shall display a "Skip weekends" toggle. When enabled, no care reminders shall fire on Saturdays or Sundays. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-M10-007** | The sheet shall display a "Travel Mode" toggle. When enabled, a date range picker shall appear to set the start and e... | `Pending Logic` | Schedule dynamic notification triggers via Expo Notifications API. |
| **FR-M10-008** | The sheet shall display a "Save Preferences" primary button. Tapping it shall persist all toggle states and dismiss t... | `Pending Logic` | Connect to Zustand state manager (usePlantStore, useUserStore, useLogStore). & Integrate SQLite read/write transaction query. |
| **FR-M10-009** | A "Cancel" text link shall dismiss the sheet without saving any changes made during the current session. | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |

---

## 📈 MOD-11 · Weekly Bloom Report Sheet

- **Exact File Path:** `app/modals/bloom-report.tsx`
- **Custom Component Inventory:** `ScreenWrapper, CustomHeader, BloomStatsPillRow, BloomBestPlantCard, BloomWeatherInsight, BloomCemeteryAlert, CustomButton`

| Requirement ID | Summary / Description | UI Shell Status | Phase 6 Action / Verification |
| --- | --- | --- | --- |
| **FR-M11-001** | The Weekly Bloom Report Sheet shall be triggered by: the "View Report" button on the Weekly Bloom Report banner on SC... | `Pending Logic` | Schedule dynamic notification triggers via Expo Notifications API. |
| **FR-M11-002** | The system shall surface the Weekly Bloom Report banner on SCR-01 Dashboard on Monday mornings, or on the first app o... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-M11-003** | The sheet shall display a date range label covering the previous week (e.g., "May 26 – Jun 1, 2026"). | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-M11-004** | The sheet shall display a summary stats row with four pill cards: plants logged count for the week, total log entries... | `Pending Logic` | Connect to Zustand state manager (usePlantStore, useUserStore, useLogStore). |
| **FR-M11-005** | The sheet shall display a "Best performing plant this week" spotlight card showing: plant thumbnail, plant name, grow... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. |
| **FR-M11-006** | The sheet shall display a weather correlation insight derived from the week's weather data and log entries (e.g., "Yo... | `Pending Logic` | Wire up Expo Location or manual zip fallback, fetch OpenWeatherMap API and update cache. |
| **FR-M11-007** | When the user archived at least one plant during the week, the sheet shall display a conditional alert row: "⚠ [N] pl... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-M11-008** | The sheet shall display a "Next week tip" card containing a contextual tip based on the upcoming week's forecast for ... | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-M11-009** | The sheet shall provide a "Share Report" icon button that opens MOD-12 Export / Share Sheet with a summary image of t... | `Pending Logic` | Compile details into a document stream via expo-print / react-native-view-shot. & Trigger native sharing via Expo Sharing API. |
| **FR-M11-010** | The sheet shall provide a "View Full Garden →" CTA button that dismisses the sheet and navigates to SCR-02 Plant List. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |
| **FR-M11-011** | A "Dismiss" text link at the bottom shall close the sheet without any navigation action. | `Pass (UI Shell)` | Verify component properties, conditional layouts, and navigate routing callbacks. |

---

## 📤 MOD-12 · Export / Share Sheet

- **Exact File Path:** `app/modals/export-share.tsx`
- **Custom Component Inventory:** `ScreenWrapper, CustomHeader, ExportFormatOptions, WatermarkToggleRow, CustomButton`

| Requirement ID | Summary / Description | UI Shell Status | Phase 6 Action / Verification |
| --- | --- | --- | --- |
| **FR-M12-001** | The Export / Share Sheet shall be triggered by: the Share action pill on SCR-03 Plant Detail, the Export / Share butt... | `Pending Logic` | Request Expo Camera permission, wire up viewfinder snapshot, save image to cache, strip EXIF metadata. & Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. & Compile details into a document stream via expo-print / react-native-view-shot. & Trigger native sharing via Expo Sharing API. |
| **FR-M12-002** | Before the native OS share sheet is presented, the system shall display a GardenPulse pre-share layer showing a conte... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. & Compile details into a document stream via expo-print / react-native-view-shot. & Trigger native sharing via Expo Sharing API. |
| **FR-M12-003** | Format options shall be displayed contextually based on what is being shared: | `Pending Logic` | Trigger native sharing via Expo Sharing API. |
| **FR-M12-004** | The pre-share layer shall display a "Copy Text Summary" option where applicable, copying a plain-text version of the ... | `Pending Logic` | Trigger native sharing via Expo Sharing API. |
| **FR-M12-005** | All image and video exports shall include the GardenPulse watermark by default. | `Pending Logic` | Compile details into a document stream via expo-print / react-native-view-shot. |
| **FR-M12-006** | Users who have purchased the Supporter Badge shall see a "Include GardenPulse branding" toggle on the pre-share layer... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. & Wire up react-native-iap StoreKit/Google Play billing connection and purchase verification hooks. & Compile details into a document stream via expo-print / react-native-view-shot. & Trigger native sharing via Expo Sharing API. |
| **FR-M12-007** | Users who have NOT purchased the Supporter Badge shall not see the watermark toggle; the watermark shall be applied w... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. & Wire up react-native-iap StoreKit/Google Play billing connection and purchase verification hooks. |
| **FR-M12-008** | Tapping "Continue to Share →" on the pre-share layer shall open the native platform share sheet (iOS Share Sheet / An... | `Pending Logic` | Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. & Trigger native sharing via Expo Sharing API. |
| **FR-M12-009** | The native OS share sheet shall display standard platform sharing destinations (Instagram, TikTok, WhatsApp, Messages... | `Pending Logic` | Integrate SQLite read/write transaction query. & Load and show AdMob SDK Units (react-native-google-mobile-ads), verify Supporter Badge bypass. & Trigger native sharing via Expo Sharing API. |
| **FR-M12-010** | A "Cancel" button shall be available on the pre-share layer to dismiss without proceeding to the OS share sheet. | `Pending Logic` | Trigger native sharing via Expo Sharing API. |

---
