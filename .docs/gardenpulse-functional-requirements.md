# GardenPulse — Functional Requirements

**Document Version:** 1.0  
**Scope:** All screens, modals, sheets, and overlays defined in the GardenPulse Navigation Sitemap and Screen Elements Reference.  
**Coverage:** 32 items — 4 Onboarding Screens · 16 Main App Screens · 12 Modals / Sheets / Overlays

---

## Table of Contents

1. [Conventions & Definitions](#1-conventions--definitions)
2. [System-Wide Requirements](#2-system-wide-requirements-fr-sys)
3. [Onboarding](#3-onboarding)
   - [ONB-1 · Splash Screen](#onb-1--splash-screen)
   - [ONB-2 · Welcome + Method Selection](#onb-2--welcome--method-selection)
   - [ONB-3 · Add First Plant](#onb-3--add-first-plant)
   - [ONB-4 · Instant Care Plan Preview](#onb-4--instant-care-plan-preview)
4. [Home Tab](#4-home-tab)
   - [SCR-01 · Dashboard / Home](#scr-01--dashboard--home)
5. [Garden Tab](#5-garden-tab)
   - [SCR-02 · Plant List](#scr-02--plant-list)
   - [SCR-03 · Plant Detail](#scr-03--plant-detail)
   - [SCR-15 · Progress Reels Gallery](#scr-15--progress-reels-gallery)
6. [Tools Tab](#6-tools-tab)
   - [SCR-04 · Tools Hub](#scr-04--tools-hub)
   - [SCR-05 · Nutrient / Recipe Calculator](#scr-05--nutrient--recipe-calculator)
   - [SCR-06 · Leaf Diagnostics](#scr-06--leaf-diagnostics)
   - [SCR-07 · Smart Scheduler](#scr-07--smart-scheduler)
7. [Community Tab](#7-community-tab)
   - [SCR-08 · Community Hub](#scr-08--community-hub)
   - [SCR-09 · Garden Cluster Detail](#scr-09--garden-cluster-detail)
   - [SCR-10 · Local Grow Map](#scr-10--local-grow-map)
8. [Profile Tab](#8-profile-tab)
   - [SCR-11 · Profile & Badges](#scr-11--profile--badges)
   - [SCR-12 · Settings](#scr-12--settings)
   - [SCR-13 · Privacy Dashboard](#scr-13--privacy-dashboard)
   - [SCR-14 · Cemetery Log](#scr-14--cemetery-log)
   - [SCR-16 · Creator Studio](#scr-16--creator-studio)
9. [Modals · Sheets · Overlays](#9-modals--sheets--overlays)
   - [MOD-01 · Quick Log Sheet](#mod-01--quick-log-sheet)
   - [MOD-02 · Add / Edit Plant Sheet](#mod-02--add--edit-plant-sheet)
   - [MOD-03 · QR Scanner Overlay](#mod-03--qr-scanner-overlay)
   - [MOD-04 · Permission Context Modal](#mod-04--permission-context-modal)
   - [MOD-05 · Rewarded Video Prompt](#mod-05--rewarded-video-prompt)
   - [MOD-06 · Interstitial Ad](#mod-06--interstitial-ad)
   - [MOD-07 · Supporter Badge Dialog](#mod-07--supporter-badge-dialog)
   - [MOD-08 · Batch Mode Overlay](#mod-08--batch-mode-overlay)
   - [MOD-09 · Tip Article Reader Sheet](#mod-09--tip-article-reader-sheet)
   - [MOD-10 · Notification Preferences Sheet](#mod-10--notification-preferences-sheet)
   - [MOD-11 · Weekly Bloom Report Sheet](#mod-11--weekly-bloom-report-sheet)
   - [MOD-12 · Export / Share Sheet](#mod-12--export--share-sheet)

---

## 1. Conventions & Definitions

| Term                    | Definition                                                                                          |
| ----------------------- | --------------------------------------------------------------------------------------------------- |
| **SHALL**               | Mandatory requirement — must be implemented                                                         |
| **SHOULD**              | Recommended requirement — strong intent to implement                                                |
| **Growing Method**      | One of four values: Soil/Raised Bed · Container/Balcony · Hydroponic · Indoor Plants                |
| **Garden Health Score** | Composite 0–100 score derived from 8 tracked metrics per plant                                      |
| **Confidence Score**    | Optional mastery tracker across 15 method-agnostic skills                                           |
| **Zone**                | USDA Hardiness Zone (US) or equivalent regional hardiness classification (non-US)                   |
| **On-device AI**        | Machine learning inference that runs locally on the device without sending data to external servers |
| **Offline-first**       | Feature or content that is available without an active network connection after initial caching     |
| **Interstitial Ad**     | Full-screen AdMob advertisement shown at high-intent moments                                        |
| **Native Ad**           | In-feed advertisement styled to match surrounding content                                           |
| **Rewarded Video**      | User-initiated AdMob video advertisement that unlocks a premium export or feature                   |
| **Supporter Badge**     | One-time $2.99 in-app purchase that removes interstitial ads only                                   |
| **Lapse**               | A period of inactivity where the user has not opened the app for an extended period                 |
| **Comeback Bonus**      | A gentle re-engagement prompt shown when a user returns after a lapse                               |
| **Cluster**             | A community group based on location or shared growing interest                                      |
| **Reel**                | A timelapse video auto-compiled from a sequence of plant progress photos                            |

---

## 2. System-Wide Requirements (FR-SYS)

### Registration & Identity

**FR-SYS-001** — The system shall NOT require user registration, account creation, or sign-in to access any core feature. The app shall open directly to the Dashboard (returning users) or Onboarding (first-time launch).

**FR-SYS-002** — The system shall operate fully offline for all features that do not inherently require a network connection (plant logging, schedule viewing, tip reading from cache, diagnostics, calculator).

**FR-SYS-003** — When operating offline, the system shall display a non-blocking indicator informing the user that weather data and community features require a connection, without preventing access to offline-capable features.

### Growing Method Adaptation

**FR-SYS-004** — The system shall store the user's primary growing method selection and apply it as the default context across all screens, recommendations, tips, and ad targeting throughout the app.

**FR-SYS-005** — The system shall support all four growing methods simultaneously. A user may have plants of different methods active at the same time, and the system shall apply method-specific logic independently per plant.

**FR-SYS-006** — When displaying care recommendations, tips, or calculator results, the system shall filter and tailor content to the growing method of the plant or context in question.

### Weather & Location

**FR-SYS-007** — The system shall cache the user's zone and the 7-day weather forecast locally upon each successful API response. Cached data shall be used when the device is offline or the API call fails.

**FR-SYS-008** — The system shall refresh the cached weather data upon each app open if a network connection is available, and upon user-triggered pull-to-refresh.

**FR-SYS-009** — If the user declines location permission, the system shall provide a manual ZIP/postal code entry fallback and derive zone and weather data from that entry.

**FR-SYS-010** — The system shall never display a user's precise GPS coordinates anywhere in the app UI or share them with community features. All location data used in community and map features shall be anonymized to zone or city level.

### Notifications

**FR-SYS-011** — The system shall send care reminder notifications only for plant tasks that are due or overdue, referencing the specific plant name and task type (e.g., "Your balcony tomatoes need water in 2 days based on local forecast").

**FR-SYS-012** — The system shall automatically adjust scheduled notification times based on detected weather conditions (e.g., suppress a watering reminder on a day forecast to have rain above 70% probability).

**FR-SYS-013** — The system shall support timezone-aware scheduling and shall automatically adjust reminder times when the device timezone changes or daylight saving time transitions occur.

### Monetisation Policy

**FR-SYS-014** — The system shall NEVER display any advertisement (interstitial, rewarded, or native) on any permission request screen (MOD-04) or during the onboarding flow (ONB-1 through ONB-4).

**FR-SYS-015** — The system shall geo-fence ad categories restricted by local law (e.g., cannabis-adjacent products) based on the user's detected or manually entered location.

**FR-SYS-016** — The system shall ensure that rewarded videos are always optional and clearly labelled as an exchange ("Watch a video to unlock [X]"). The user shall be able to decline without losing access to core functionality.

**FR-SYS-017** — When a user has purchased the Supporter Badge, the system shall permanently suppress all interstitial ad (MOD-06) triggers for that user. Native ads shall continue to appear.

### Privacy & Compliance

**FR-SYS-018** — The system shall never upload photos taken in Leaf Diagnostics (SCR-06) to any external server. All image analysis shall occur on-device.

**FR-SYS-019** — The system shall provide a one-tap path to delete all user data from within the Privacy Dashboard (SCR-13), compliant with GDPR right to erasure and CCPA deletion rights.

**FR-SYS-020** — The system shall declare all permissions (location, camera, microphone) in the platform manifest (Info.plist / AndroidManifest.xml) with clear purpose strings explaining the benefit to the user.

**FR-SYS-021** — The system shall request camera and microphone permissions contextually — only when the user taps a feature that requires them — and never at app launch or during onboarding unless the user actively initiates a camera or mic action.

### Accessibility

**FR-SYS-022** — The system shall support full VoiceOver (iOS) and TalkBack (Android) compatibility for all interactive elements across all screens.

**FR-SYS-023** — The system shall auto-detect the device's regional locale to set the default unit system (metric vs. imperial) and shall provide a manual override in Settings (SCR-12).

**FR-SYS-024** — The system shall support at minimum two languages at launch: English and German. Additional languages (French, Spanish, Dutch) shall be supported as localization is completed.

---

## 3. Onboarding

---

### ONB-1 · Splash Screen

#### Navigation & Entry

**FR-ONB1-001** — The system shall display the Splash Screen as the first screen when the app is launched for the first time on a device.

**FR-ONB1-002** — When a returning user launches the app (i.e., they have previously completed onboarding), the system shall skip ONB-1 through ONB-4 and navigate directly to SCR-01 Dashboard.

**FR-ONB1-003** — The Splash Screen shall auto-advance to ONB-2 (Welcome + Method Selection) after initialization completes without requiring any user interaction.

#### Display

**FR-ONB1-004** — The system shall display the GardenPulse app logo with an animated leaf-unfurl entry animation.

**FR-ONB1-005** — The system shall display the app name "GardenPulse" and the tagline "Grow Smarter, Anywhere." on the Splash Screen.

**FR-ONB1-006** — The system shall display a subtle animated loading indicator (pulse animation) during the 2-second display period.

**FR-ONB1-007** — The Splash Screen shall not display any advertisement, sign-in prompt, or permission request.

---

### ONB-2 · Welcome + Method Selection

#### Navigation & Entry

**FR-ONB2-001** — The system shall navigate to ONB-2 automatically after ONB-1 completes.

**FR-ONB2-002** — When the user taps "Skip for now," the system shall record no method selection, set all growing method preferences to "All," and proceed to ONB-3.

**FR-ONB2-003** — When the user taps "Next" and method selection is complete, the system shall trigger MOD-04 (Permission Context Modal — Location) before navigating to ONB-3.

#### Display

**FR-ONB2-004** — The system shall display a 3-step progress indicator at the top of the screen, with Step 1 of 3 active.

**FR-ONB2-005** — The system shall display four selectable method cards: Soil / Raised Bed, Container / Balcony, Hydroponic, and Indoor Plants. Each card shall show a distinct icon, method name, and a one-line description.

**FR-ONB2-006** — The "Next →" button shall be disabled (visually greyed) until the user selects at least one method card.

**FR-ONB2-007** — When the user taps a method card, the system shall visually highlight it with a selection ring and enable the "Next →" button.

#### Interactions

**FR-ONB2-008** — The method selection shall be single-select. Tapping a second card shall deselect the first and select the new one.

**FR-ONB2-009** — The system shall store the selected growing method as the user's primary growing profile preference, which will pre-fill method selectors throughout the app.

#### Ads

**FR-ONB2-010** — The system shall NOT display any advertisement on this screen.

---

### ONB-3 · Add First Plant

#### Navigation & Entry

**FR-ONB3-001** — The system shall navigate to ONB-3 after the location permission step (MOD-04) completes — whether the user grants, denies, or dismisses the permission.

**FR-ONB3-002** — When the user taps "Skip for now," the system shall navigate directly to ONB-4 with the plant data fields empty, resulting in a generic care plan preview.

**FR-ONB3-003** — The system shall display a Back arrow that returns the user to ONB-2 without losing their method selection.

#### Display

**FR-ONB3-004** — The system shall display a 3-step progress indicator with Step 2 of 3 active.

**FR-ONB3-005** — The system shall display a plant name search field with an autocomplete dropdown sourced from the app's local plant database (minimum 3,000 species entries).

**FR-ONB3-006** — The system shall display browse-by-category chips: Herb, Vegetable, Fruit, Flower, Houseplant, Microgreen. Tapping a chip shall filter the autocomplete suggestions.

**FR-ONB3-007** — When a plant is selected from search or browse, the system shall display a preview card showing: plant thumbnail, common name, scientific name, and a method compatibility badge relative to the method selected in ONB-2.

**FR-ONB3-008** — The system shall display the growing method selector pills (Soil · Container · Hydro · Indoor) pre-filled with the method chosen in ONB-2, and allow the user to change the selection for this specific plant.

**FR-ONB3-009** — The system shall display the auto-detected or manually entered location as a zone badge (e.g., "Zone 7b · Berlin"). If location was declined in MOD-04 and no manual entry was made, the zone badge shall display "Zone unknown — set in Settings."

**FR-ONB3-010** — The system shall display a started date picker defaulting to the current date.

#### Interactions

**FR-ONB3-011** — The plant nickname field shall accept a maximum of 30 characters.

**FR-ONB3-012** — When the user taps the "Scan a leaf or seed packet" camera button, the system shall trigger MOD-04 (Permission Context Modal — Camera) if camera permission has not been granted, and then open MOD-03 (QR Scanner Overlay) for seed packet scanning or MOD-02 (Add / Edit Plant Sheet) pre-filled with camera scan data.

**FR-ONB3-013** — The "Continue →" button shall be enabled only when a plant name (from search, browse, or manual entry) is present. All other fields are optional.

#### Data

**FR-ONB3-014** — Upon tapping "Continue →," the system shall persist the plant record with: species name, nickname (if provided), growing method, zone, started date, and a reference to the user's primary growing profile.

---

### ONB-4 · Instant Care Plan Preview

#### Navigation & Entry

**FR-ONB4-001** — The system shall navigate to ONB-4 after ONB-3's Continue action or Skip action completes.

**FR-ONB4-002** — When the user taps "Start Growing 🌱," the system shall mark onboarding as complete, persist this flag to local storage, and navigate to SCR-01 Dashboard.

**FR-ONB4-003** — The system shall display a Back arrow that returns the user to ONB-3 without losing the plant data entered.

**FR-ONB4-004** — When the user taps "Remind me later," the system shall navigate to SCR-01 Dashboard without requesting notification permission.

#### Display

**FR-ONB4-005** — The system shall display a 3-step progress indicator with Step 3 of 3 active.

**FR-ONB4-006** — The system shall display a location and weather context card showing: detected city name, zone badge, current temperature, current humidity, and a weather forecast icon. If weather data is unavailable, the card shall display "Weather loading…" and retry in background.

**FR-ONB4-007** — If a plant was added in ONB-3, the system shall display a personalised first plant care summary card containing: watering frequency recommendation, light requirement badge, next recommended action chip (e.g., "Water today"), and the plant's growing method tag. All values shall be derived from the plant's species data and the user's zone.

**FR-ONB4-008** — If no plant was added in ONB-3 (user skipped), the system shall display a generic care tip card based on the selected growing method instead of a plant-specific card.

**FR-ONB4-009** — The system shall display a Garden Health Score baseline card with a circular dial showing an initial score of 50/100 and the label "We'll track your progress from here."

**FR-ONB4-010** — The system shall display a notification opt-in row: bell icon, label "Get reminders for your [plant name]" (or "Get growing reminders" if no plant was added), and an Enable toggle.

#### Interactions

**FR-ONB4-011** — When the user taps the Enable notification toggle, the system shall trigger MOD-04 (Permission Context Modal — Notifications) before requesting the OS notification permission.

#### Ads

**FR-ONB4-012** — The system shall NOT display any advertisement on this screen.

---

## 4. Home Tab

---

### SCR-01 · Dashboard / Home

#### Navigation & Access

**FR-S01-001** — The system shall display the Dashboard as the default screen when the main app is entered for the first time (after onboarding) and as the Home tab in the bottom navigation bar.

**FR-S01-002** — When a returning user opens the app after a lapse, the system shall display a Comeback Bonus banner on the Dashboard: a dismissible card reading "Welcome back! Your [plant name] missed you" (or "Welcome back!" if no plants exist), with the plant's health change since last visit.

**FR-S01-003** — Tapping the Settings icon in the header shall navigate to SCR-12 Settings.

**FR-S01-004** — Tapping the notification bell icon shall display an in-app notification tray. The bell shall show a badge count when unread notifications are present.

#### Weather Widget

**FR-S01-005** — The system shall display the user's city name and zone badge (e.g., "Berlin · Zone 7b") in the weather widget header.

**FR-S01-006** — The system shall display the following real-time weather values in the widget: current temperature, humidity percentage, UV index, and rain probability for today. Data shall be sourced from the OpenWeatherMap One Call API.

**FR-S01-007** — The system shall display a 3-day forecast strip beneath the main weather values, showing a weather icon and high/low temperature for each of the next 3 days.

**FR-S01-008** — When tomorrow's rain probability is ≥70%, the system shall display a contextual smart alert label within the weather widget: "[Plant name] watering → may skip tomorrow due to rain forecast." If multiple plants are affected, the system shall show a summary "X plants may not need watering tomorrow."

**FR-S01-009** — The weather widget shall support pull-to-refresh. When triggered, the system shall request a fresh weather API call and update all weather values if a network connection is available.

**FR-S01-010** — When weather data is unavailable (offline and no cache), the system shall display the last cached values with a "Last updated [time]" label and a "Reconnect to refresh" note.

#### Today's Tasks Section

**FR-S01-011** — The system shall display a "Today in Your Garden" section containing horizontally scrollable task cards for all plants with tasks due today.

**FR-S01-012** — Each task card shall display: the plant's thumbnail photo, plant name, and task type chip (Water / Feed / Prune / Check / Harvest). The task type shall be determined by the plant's care schedule in SCR-07.

**FR-S01-013** — Each task card shall include a "Done ✓" button. When tapped, the system shall mark the task as complete for the current day, update the plant's log, dismiss the card from the today list, and animate the card out.

**FR-S01-014** — When all tasks for the day are marked complete, the system shall display an animated celebration state ("All done today! 🎉") in place of the task list for the remainder of the day.

**FR-S01-015** — The system shall display a "See full schedule →" link in this section that navigates to SCR-07 Smart Scheduler.

**FR-S01-016** — Weather-adjusted tasks (e.g., watering suppressed due to rain forecast) shall display as greyed-out with a weather icon and the label "Skipped — rain forecast" rather than being removed from the list entirely.

#### Garden Health Score Card

**FR-S01-017** — The system shall display the overall Garden Health Score as a circular dial (0–100) with colour coding: 0–33 red, 34–66 amber, 67–100 green.

**FR-S01-018** — The system shall display the 3 most impactful metric labels beneath the dial (e.g., "Moisture · Light · pH"), derived from the lowest-scoring metrics across all the user's active plants.

**FR-S01-019** — Tapping "View Details →" on the Garden Health Score card shall navigate to SCR-11 Profile & Badges.

#### My Plants Row

**FR-S01-020** — The system shall display a horizontally scrollable row of the user's plants, each shown as a thumbnail card with: plant photo, plant name, and a health dot indicator (green/amber/red).

**FR-S01-021** — Tapping a plant card in the My Plants row shall navigate to SCR-03 Plant Detail for that plant.

**FR-S01-022** — Tapping "See All →" shall navigate to SCR-02 Plant List.

**FR-S01-023** — If the user has no plants, the My Plants row shall be replaced by a "Add your first plant" empty-state card that triggers MOD-02 on tap.

#### Contextual Tip Card

**FR-S01-024** — The system shall display at most one contextual tip card per Dashboard session. The tip shall be selected based on the user's most recently logged action or the current season and zone.

**FR-S01-025** — The tip card shall display: the label "From your garden expert," the article title, method tag, and estimated read time. Tapping the card shall open MOD-09 Tip Article Reader Sheet.

**FR-S01-026** — The tip card shall only display content from the offline-cached Smart Tips Library. The system shall not load external webviews for tip content.

**FR-S01-027** — The contextual tip card shall NOT auto-play any video or audio.

#### Weekly Bloom Report Banner

**FR-S01-028** — On Monday mornings, or when the user opens the app for the first time after a lapse with at least one week of log data, the system shall display the Weekly Bloom Report banner with a "Your weekly report is ready 📊" label and a "View Report" button.

**FR-S01-029** — Tapping "View Report" on the banner shall open MOD-11 Weekly Bloom Report Sheet.

#### Native Ad

**FR-S01-030** — The system shall display one native ad slot on the Dashboard, positioned between the Garden Health Score card and the My Plants row. The ad shall be styled to match surrounding content cards.

#### Quick Log FAB

**FR-S01-031** — The system shall display a prominent "+" floating action button (FAB) in the bottom-right corner, always visible above the bottom navigation bar. Tapping it shall open MOD-01 Quick Log Sheet.

---

## 5. Garden Tab

---

### SCR-02 · Plant List

#### Navigation & Access

**FR-S02-001** — The system shall display the Plant List when the user taps the Garden tab in the bottom navigation bar.

**FR-S02-002** — Tapping a plant card shall navigate to SCR-03 Plant Detail for that plant.

**FR-S02-003** — Tapping the "+" icon in the header shall open MOD-02 Add / Edit Plant Sheet.

#### Display

**FR-S02-004** — The system shall display all of the user's active (non-archived) plants as cards. The default view shall be a 2-column grid; a list view shall be available via a toggle icon.

**FR-S02-005** — Each plant card shall display: plant photo thumbnail, plant name (common name + nickname if set), growing method badge, a health dot indicator (green/amber/red based on Garden Health Score), and a "Last logged X days ago" label.

**FR-S02-006** — The system shall display growing method filter chips (All · Soil · Container · Hydro · Indoor) above the list. Tapping a chip shall filter the visible plants to only those matching the selected method.

**FR-S02-007** — The system shall display a search field above the plant cards. As the user types, the system shall filter the visible plant list in real time to match by plant name or nickname.

**FR-S02-008** — The system shall display a sort control allowing the user to sort plants by: name (A–Z), health score (lowest first), growing method, or last logged date.

**FR-S02-009** — When the user has no plants, the system shall display an empty state with an illustrated pot graphic, the heading "No plants yet," and an "Add Your First Plant" button that opens MOD-02.

**FR-S02-010** — A native ad card shall appear in the plant list at approximately every 10th item position when the user has more than 10 plants.

#### Interactions

**FR-S02-011** — The system shall support a swipe-left gesture on each plant card. The revealed actions shall be: "Quick Log" (opens MOD-01 pre-filled for that plant) and "Archive" (triggers a confirmation dialog before moving the plant to SCR-14 Cemetery Log).

**FR-S02-012** — The system shall support pull-to-refresh to re-sync plant health data.

#### Batch Mode

**FR-S02-013** — The system shall provide a batch mode toggle in the header. When activated, all plant cards shall show multi-select checkboxes.

**FR-S02-014** — When batch mode is active, the system shall display a "Select All" button in the header that selects all visible (filtered) plants.

**FR-S02-015** — When one or more plants are selected in batch mode, the system shall display an action bar at the bottom of the screen with the actions: Water All, Feed All, Log Entry, and Archive. These actions shall trigger MOD-08 Batch Mode Overlay.

**FR-S02-016** — Before executing any batch action, the system shall display a confirmation dialog: "Apply [action] to [N] plants?" with Confirm and Cancel options.

**FR-S02-017** — Tapping "Cancel" or the batch mode toggle again shall exit batch mode without performing any action and restore the normal plant card view.

#### FAB

**FR-S02-018** — The system shall display a "+" FAB (bottom-right) at all times in the Plant List. Tapping it shall open MOD-01 Quick Log Sheet.

---

### SCR-03 · Plant Detail

#### Navigation & Access

**FR-S03-001** — The system shall display Plant Detail when the user taps a plant card from SCR-02 or a plant card from SCR-01 Dashboard.

**FR-S03-002** — The header shall display the plant's name and a back arrow returning to the previous screen.

**FR-S03-003** — The overflow menu (⋮) in the header shall offer: Edit Plant (opens MOD-02 pre-filled), Archive to Cemetery (with confirmation dialog), and Delete (with destructive confirmation dialog).

#### Hero Area

**FR-S03-004** — The system shall display the plant's most recently logged photo as a full-width hero image. If no photos exist, a placeholder illustration for the plant's category shall be shown.

**FR-S03-005** — The hero image shall display a photo count badge (e.g., "12 photos"). Tapping the hero image shall navigate to SCR-15 Progress Reels Gallery filtered for this plant.

**FR-S03-006** — The hero area shall include an "Add Photo" button overlay that opens MOD-01 Quick Log Sheet pre-set to the photo capture step.

#### Action Pill Row

**FR-S03-007** — The system shall display a horizontal pill action row beneath the hero: Log, Diagnose, Share, and Archive. These shall remain visible when the user scrolls down (sticky below the hero or in the header).

**FR-S03-008** — Tapping "Log" shall open MOD-01 Quick Log Sheet pre-filled for this plant.

**FR-S03-009** — Tapping "Diagnose" shall navigate to SCR-06 Leaf Diagnostics.

**FR-S03-010** — Tapping "Share" shall open MOD-12 Export / Share Sheet for this plant.

**FR-S03-011** — Tapping "Archive" shall display a confirmation dialog. On confirmation, the plant shall be moved to SCR-14 Cemetery Log and removed from SCR-02 Plant List.

#### Plant Info Card

**FR-S03-012** — The system shall display a plant info card containing: species (common name + scientific name), growing method badge, current growing stage chip (Seedling / Veg / Bloom / Fruiting / Dormant), date added, location/zone tag, and container size (if the method is Container).

**FR-S03-013** — The growing stage shall be the most recently set value, editable by tapping the chip inline.

**FR-S03-014** — Tapping the Edit icon on the plant info card shall open MOD-02 Add / Edit Plant Sheet pre-filled with the current plant data.

#### Health Section

**FR-S03-015** — The system shall display the individual Garden Health Score for this plant as a mini circular dial (0–100).

**FR-S03-016** — The system shall display an expandable 8-metric breakdown below the dial: Moisture, Light, pH, Growth Rate, Nutrient Level, Pest Risk, Temperature, and Humidity. Collapsed by default, expanding shows a bar chart or slider per metric with a plain-English label.

**FR-S03-017** — Tapping "View Full Insights →" shall expand the inline 8-metric chart without navigating away from the screen.

#### Weather Impact Banner

**FR-S03-018** — When a weather condition is forecast that affects this plant's care tasks within the next 3 days, the system shall display a dismissible smart alert banner (e.g., "Rain in 2 days → skip next watering"). The banner shall source data from the same cached weather API response used by SCR-01.

#### Today's Care Section

**FR-S03-019** — The system shall display the plant's care tasks due today as cards with "Done ✓" checkboxes. Checking a task shall mark it complete in the schedule and update the Garden Health Score accordingly.

**FR-S03-020** — Each task shall offer a "Reschedule" link. Tapping it shall open a date/time picker to move the task to a future date.

**FR-S03-021** — A "View full schedule →" link shall navigate to SCR-07 Smart Scheduler filtered for this plant.

#### Cross-Method Insight Card

**FR-S03-022** — When the system detects that the user has the same species (or close botanical relatives) growing under two different methods, it shall display a cross-method insight card comparing growth rates or outcomes (e.g., "Your hydro basil grew 20% faster than your soil basil → try adjusting nutrient strength for the soil batch").

**FR-S03-023** — The cross-method insight card shall be dismissible. Once dismissed, it shall not reappear unless new comparative data is available.

#### Log History Timeline

**FR-S03-024** — The system shall display a reverse-chronological timeline of all log entries for this plant. Each entry shall show: entry thumbnail (photo if logged), timestamp, activity type chip, and any metric values recorded.

**FR-S03-025** — Tapping a log entry shall expand it inline to show: the full-resolution photo, all recorded metrics, the written note, and a voice note playback button (if a voice note was recorded for that entry).

**FR-S03-026** — The timeline shall paginate, loading additional entries on "Load more" tap to avoid performance degradation with large log histories.

#### Contextual Tip Card

**FR-S03-027** — The system shall display at most one contextual tip card on Plant Detail, triggered by the content of the most recent log entry (e.g., if the last log recorded yellowing leaves, the tip card shall suggest the "Magnesium Deficiency Guide"). Tapping it shall open MOD-09.

#### Notes Field

**FR-S03-028** — The system shall display a persistent freeform notes text area with a microphone icon for voice input.

**FR-S03-029** — When the user taps the microphone icon and microphone permission has not been granted, the system shall trigger MOD-04 (Permission Context Modal — Mic) before opening voice recording.

**FR-S03-030** — Saved notes shall be timestamped and appended to the plant's log history.

#### FAB

**FR-S03-031** — The system shall display a "Log" FAB (bottom-right) always visible on Plant Detail. Tapping it shall open MOD-01 Quick Log Sheet pre-filled for this plant.

---

### SCR-15 · Progress Reels Gallery

#### Navigation & Access

**FR-S15-001** — The system shall navigate to the Progress Reels Gallery when the user taps: the hero image on SCR-03, the "Progress Reels Gallery" link on SCR-11 Profile, or the "My Reels" row in SCR-11.

**FR-S15-002** — When navigated from SCR-03, the gallery shall open pre-filtered to show only reels for the originating plant.

**FR-S15-003** — A back arrow shall return the user to the previous screen.

#### Display

**FR-S15-004** — The system shall display all generated reels in a 2-column grid. Each card shall show: video thumbnail with a play icon overlay, the plant name, the date range covered by the reel, and the reel duration.

**FR-S15-005** — The system shall display filter chips above the grid: All, By Plant, By Method, By Date.

**FR-S15-006** — When the user has no reels, the system shall display an empty state with the heading "No reels yet," the sub-label "Your first reel needs at least 3 logged photos," and a "Go to My Garden →" button linking to SCR-02.

#### Reel Playback

**FR-S15-007** — Tapping a reel card shall open a full-screen playback view with the reel auto-playing muted.

**FR-S15-008** — The playback view shall display a method-specific data overlay on the video: method badge and key metrics recorded during the reel's date range.

**FR-S15-009** — The system shall display the GardenPulse watermark on all reel playback and exports by default. Users who have purchased the Supporter Badge (MOD-07) shall have the option to toggle the watermark off.

**FR-S15-010** — The playback view shall provide: a Share button (opens MOD-12), a Download button (triggers MOD-05 Rewarded Video Prompt before downloading), an Edit button (allows trimming the date range and toggling the overlay), and a Close (×) button.

#### Reel Generation

**FR-S15-011** — Tapping "+ Create" shall start a 4-step reel generation flow: (1) plant selector from the user's plant list, (2) date range picker with start and end date, (3) a preview strip showing the sequence of logged photos for that range, (4) a style selector for overlay options.

**FR-S15-012** — The system shall require a minimum of 3 logged photos for a plant before allowing reel generation for that plant.

**FR-S15-013** — Tapping "Generate Reel" in step 4 shall trigger a loading animation and then produce the reel locally on-device. The completed reel shall be added to the gallery grid.

---

## 6. Tools Tab

---

### SCR-04 · Tools Hub

#### Navigation & Access

**FR-S04-001** — The system shall display the Tools Hub when the user taps the Tools tab in the bottom navigation bar.

#### Display

**FR-S04-002** — The system shall display four tool cards: Nutrient / Recipe Calculator, Leaf Diagnostics, Smart Scheduler, and QR / Label Scanner. Each card shall show a distinct icon, title, and one-line description.

**FR-S04-003** — After the user has opened any tool at least once, the system shall display a "Recently Used" section at the top of the Tools Hub containing the last-used tool card with an "Open again →" link.

#### Navigation from Cards

**FR-S04-004** — Tapping the Nutrient / Recipe Calculator card shall navigate to SCR-05.

**FR-S04-005** — Tapping the Leaf Diagnostics card shall navigate to SCR-06.

**FR-S04-006** — Tapping the Smart Scheduler card shall navigate to SCR-07.

**FR-S04-007** — Tapping the QR / Label Scanner card shall trigger MOD-03 QR Scanner Overlay.

#### Search

**FR-S04-008** — The system shall provide a search field in the header. As the user types, the tool cards shall filter to show only matching tools by name or description keyword.

#### Ads

**FR-S04-009** — The system shall display one native ad slot in the Tools Hub, positioned between the first and second row of tool cards.

---

### SCR-05 · Nutrient / Recipe Calculator

#### Navigation & Access

**FR-S05-001** — The system shall navigate to the Nutrient / Recipe Calculator from SCR-04 Tools Hub.

**FR-S05-002** — A back arrow in the header shall return the user to SCR-04.

**FR-S05-003** — An "ℹ" info icon shall display a dismissible tooltip: "All calculations are method-specific estimates. Always verify with manufacturer guidelines."

#### Input Form

**FR-S05-004** — The system shall provide a required method selector with three options: Soil Drench, Hydro Reservoir, and Foliar Spray. The method shall be pre-selected based on the user's primary growing profile but shall be editable per calculation.

**FR-S05-005** — The system shall provide a nutrient brand selector field with autocomplete from a locally stored brand database. The field shall also accept free-text entry for brands not in the database.

**FR-S05-006** — The system shall provide a "Scan label" button next to the brand selector that opens MOD-03 QR Scanner Overlay. If the scanned product is found in the brand database, the brand selector shall be auto-filled.

**FR-S05-007** — The system shall provide a water volume input field with a numeric keyboard and a unit toggle (Litres / Gallons). The unit shall default to the user's locale-detected unit system.

**FR-S05-008** — The system shall provide a required growth stage selector with four options: Seedling, Veg / Grow, Bloom / Flower, Flush / Ripening.

**FR-S05-009** — The system shall provide an optional Target EC / PPM field. When a known brand is selected, the system shall pre-fill this field with the brand's recommended default for the selected method and growth stage.

**FR-S05-010** — The system shall display a pH target range derived from the selected method and growth stage. The displayed range shall be editable by the user.

**FR-S05-011** — The "Generate Recipe" button shall be disabled until the following required fields are filled: Method, Nutrient Brand (or any free-text entry), Water Volume, and Growth Stage.

#### Calculation & Results

**FR-S05-012** — When the user taps "Generate Recipe," the system shall trigger MOD-06 Interstitial Ad displayed over a 1.5-second animated loading state. After the ad completes or is dismissed, the results card shall appear.

**FR-S05-013** — The results card shall display per-nutrient rows, each containing: nutrient name, calculated dose amount, unit, and a colour-coded indicator (green = within safe range, amber = near limit, red = exceeds guideline).

**FR-S05-014** — The results card shall display the pH target range as a visual band with the calculated working value indicated.

**FR-S05-015** — The results card shall display the EC / PPM target value.

**FR-S05-016** — The results card shall display any applicable warnings or notes (e.g., "Reduce by 25% for seedlings under 2 weeks old").

**FR-S05-017** — The system shall provide a "Save Recipe" button that logs the recipe to the selected plant's history or creates a standalone saved recipe if no plant is selected.

**FR-S05-018** — The system shall provide an "Add to Schedule" link that pre-fills SCR-07 Smart Scheduler with a feeding task using the current recipe's data.

#### Export

**FR-S05-019** — The system shall provide an "Export / Share" button in the results card. Tapping it shall trigger MOD-05 Rewarded Video Prompt. After successful video completion, MOD-12 Export / Share Sheet shall open.

**FR-S05-020** — The PDF export format shall include: the full nutrient dose table, pH and EC/PPM targets, method, growth stage, water volume, and the GardenPulse branding.

#### Unit Toggle

**FR-S05-021** — A persistent unit toggle (Metric / Imperial) shall be visible below the results card. Switching units shall instantly recalculate and redisplay all dose amounts and volumes.

---

### SCR-06 · Leaf Diagnostics

#### Navigation & Access

**FR-S06-001** — The system shall navigate to Leaf Diagnostics from SCR-04 Tools Hub and from the "Diagnose" action pill on SCR-03 Plant Detail.

**FR-S06-002** — A back arrow shall return the user to the originating screen.

#### Permission Gate

**FR-S06-003** — Upon entering Leaf Diagnostics, if camera permission has not been granted, the system shall immediately trigger MOD-04 (Permission Context Modal — Camera) before showing any camera UI.

**FR-S06-004** — If the user denies camera permission, the system shall display a "Permission denied" state with: an illustration, a "Camera access is needed for diagnostics" label, an "Open Settings" button (deep-links to device settings), and a "Use Gallery Instead" fallback button.

#### Camera UI

**FR-S06-005** — The system shall display a live camera viewfinder with a leaf-shaped alignment frame overlay and the instruction label "Centre the leaf in frame."

**FR-S06-006** — The system shall provide a Capture button (large circle) for taking the diagnostic photo.

**FR-S06-007** — The system shall provide a gallery import button allowing the user to import an existing photo from their device photo library instead of capturing a new one.

**FR-S06-008** — The system shall provide a flash/torch toggle icon on the viewfinder.

#### Diagnostics Processing

**FR-S06-009** — Upon capture or import, the system shall display a full-screen loading state with the label "Analysing on-device…" and an animated scan-line animation, plus a privacy badge reading "Your photo never leaves your device."

**FR-S06-010** — All image analysis SHALL run on-device using local machine learning inference. The captured image shall NEVER be uploaded to any external server or API.

**FR-S06-011** — The system shall strip all photo metadata (EXIF location, device info) from the image before analysis. Metadata shall not be stored unless the user has opted into photo storage in SCR-13 Privacy Dashboard.

#### Results Display

**FR-S06-012** — The results card shall display: the identified plant name (common + scientific name) with a confidence percentage badge, and the detected growing method.

**FR-S06-013** — The results card shall display the primary issue identified (e.g., "Magnesium Deficiency") with a confidence percentage and a severity badge (Low / Medium / High, colour-coded: green / amber / red).

**FR-S06-014** — The results card shall display a brief explanation (2 lines) of the primary issue and a numbered list of suggested corrective actions.

**FR-S06-015** — The system shall support listing secondary issues in a collapsed expandable section below the primary finding.

**FR-S06-016** — The results card shall include a contextual tip link (e.g., "Read: Magnesium Deficiency Guide") that opens MOD-09 with the relevant article.

**FR-S06-017** — The system shall provide a "Log This Diagnosis" button that creates a log entry for the linked plant (or prompts plant selection if opened from SCR-04 directly) with the diagnosis result appended to the log.

**FR-S06-018** — The system shall provide a "Try Again / Retake" button that returns the user to the camera viewfinder.

**FR-S06-019** — The system shall provide a "Share Results" button that opens MOD-12 Export / Share Sheet with a summary of the diagnosis as the shareable content.

#### Diagnostics History

**FR-S06-020** — The system shall maintain a local history of all past diagnoses. The history section shall display entries as a list with: date, thumbnail, identified plant name, primary finding, and severity badge.

**FR-S06-021** — The history section shall be filterable by: All, Deficiency, Pest, Disease, Overwatering.

---

### SCR-07 · Smart Scheduler

#### Navigation & Access

**FR-S07-001** — The system shall navigate to Smart Scheduler from SCR-04 Tools Hub, from the "See full schedule →" link on SCR-01 Dashboard, and from the "View full schedule →" link on SCR-03 Plant Detail.

**FR-S07-002** — When navigated from SCR-03 Plant Detail, the scheduler shall open with the view filtered to show only tasks for that plant.

**FR-S07-003** — A back arrow shall return the user to the originating screen.

#### Calendar View

**FR-S07-004** — The system shall display a week-strip calendar view by default. A toggle in the header shall switch between week and monthly grid views.

**FR-S07-005** — In the week-strip view, each day cell shall show coloured dots for scheduled tasks, colour-coded by task type: blue (Water), green (Feed), yellow (Prune), red (urgent/overdue).

**FR-S07-006** — The current day shall be visually highlighted with a ring or background accent.

**FR-S07-007** — The system shall display sunrise and sunset times for the selected day, derived from the user's detected zone and date.

**FR-S07-008** — Tapping any day cell shall display the task list for that day in the section below the calendar.

#### Task List

**FR-S07-009** — The system shall display the task list for the selected day. Each task row shall show: the plant thumbnail, plant name, task type chip, and a "Done ✓" checkbox.

**FR-S07-010** — Marking a task as done shall update the plant's log and remove the task from the overdue list.

**FR-S07-011** — The system shall support a swipe-left action on each task row with two options: Reschedule (opens a date picker) and Skip (removes the task from this day only, without rescheduling).

**FR-S07-012** — The system shall provide a "Mark All Done" button at the top of the task list for the selected day, which marks all tasks for that day as complete.

#### Smart Controls

**FR-S07-013** — The system shall provide a "Weather sync" toggle. When enabled, the system shall automatically remove or suppress watering tasks on days where rain probability is ≥70%, and restore them if the forecast changes before the day begins.

**FR-S07-014** — The system shall provide a "Skip weekends" toggle. When enabled, no new tasks shall be scheduled on Saturdays and Sundays, and existing weekend tasks shall be rescheduled to the nearest weekday.

**FR-S07-015** — The system shall provide a "Travel Mode" toggle with a date range picker. When Travel Mode is active for the selected date range, all notifications and task reminders shall be suppressed. The schedule data shall remain intact.

**FR-S07-016** — The system shall provide a reminder time preference selector: Morning (7–9 AM), Afternoon (12–2 PM), Evening (6–8 PM). The selected preference shall apply to all scheduled task notifications.

**FR-S07-017** — The system shall automatically adjust scheduled reminder times when a timezone change or DST transition is detected on the device.

#### Custom Reminders

**FR-S07-018** — The system shall provide an "+ Add Custom Reminder" button that opens an inline form with: plant selector, task type selector, repeat frequency (Once / Daily / Weekly / Custom), and a date + time picker.

**FR-S07-019** — Custom reminders shall appear alongside auto-generated care tasks in the calendar and task list views.

**FR-S07-020** — A "Notification preferences →" quick link shall open MOD-10 Notification Preferences Sheet.

---

## 7. Community Tab

---

### SCR-08 · Community Hub

#### Navigation & Access

**FR-S08-001** — The system shall display the Community Hub when the user taps the Community tab in the bottom navigation bar.

#### Top Banner

**FR-S08-002** — The system shall display a local context banner at the top of the Community Hub showing the heading "What's thriving in [City] right now 🌱" and one anonymized aggregate insight (e.g., "Cherry tomatoes: 87% success in Berlin balconies"). The city name shall match the user's detected or manually entered location.

**FR-S08-003** — The banner shall include a "View Map →" link that navigates to SCR-10 Local Grow Map.

#### Internal Tab Bar

**FR-S08-004** — The Community Hub shall contain an internal tab bar with three tabs: Local, Clusters, and Challenges.

#### Local Tab

**FR-S08-005** — The Local tab shall display anonymized success stats cards for the user's zone. Each card shall show: plant name, success percentage, number of growers, and a trending direction arrow.

**FR-S08-006** — The Local tab stats shall display only aggregate, anonymized data. No individual user data or precise locations shall be shown.

**FR-S08-007** — A "View Full Map →" button shall navigate to SCR-10.

#### Clusters Tab

**FR-S08-008** — The Clusters tab shall display a "My Clusters" section (clusters the user has joined) and a "Nearby Clusters" section (suggested clusters based on the user's location and growing method).

**FR-S08-009** — Each cluster card shall display: cluster name, member count, method/interest tag, recent activity indicator, and a Join / Joined toggle button.

**FR-S08-010** — Tapping a cluster card in "My Clusters" shall navigate to SCR-09 Garden Cluster Detail.

**FR-S08-011** — A "+ Join a Cluster" CTA button shall open a searchable cluster browse sheet allowing the user to search by name, location, or method interest.

**FR-S08-012** — Tapping "Join" on a nearby cluster card shall add the cluster to "My Clusters" and confirm with a brief success toast.

#### Challenges Tab

**FR-S08-013** — The Challenges tab shall display the currently active weekly challenge as a card, showing: challenge title, end date countdown, total entry count, and a "Submit Entry" button.

**FR-S08-014** — Tapping "Submit Entry" for a challenge shall open MOD-01 Quick Log Sheet pre-configured to capture a photo and caption for the challenge submission.

**FR-S08-015** — The Challenges tab shall display a past challenges section with winner spotlight cards. Each spotlight shall show an anonymized photo, method badge, and the challenge name. No personally identifiable information shall be displayed.

#### Referral

**FR-S08-016** — The system shall display a referral banner on the Community Hub: "Invite 3 friends → unlock Multi-Zone Management" with a progress indicator showing how many friends have been referred out of the required 3, and a "Share Invite Link" button that opens MOD-12.

#### Ads

**FR-S08-017** — The system shall display one geo-targeted native ad slot on the Community Hub, positioned below the Local tab content and styled to match the surrounding community cards.

---

### SCR-09 · Garden Cluster Detail

#### Navigation & Access

**FR-S09-001** — The system shall navigate to Garden Cluster Detail when the user taps a joined cluster card from SCR-08 Community Hub.

**FR-S09-002** — A back arrow shall return the user to SCR-08 Community Hub.

#### Cluster Header

**FR-S09-003** — The system shall display the cluster's cover image (or a default gradient), cluster name, member count, location or interest tag, description text (expandable beyond 3 lines), and the cluster creation date.

**FR-S09-004** — The system shall display a Join / Leave toggle button. Tapping "Join" shall add the cluster to the user's joined clusters list and confirm with a success toast. Tapping "Leave" shall display a confirmation dialog before removing the cluster.

#### Internal Tab Bar

**FR-S09-005** — The Cluster Detail shall contain an internal tab bar: Posts, Members, Swaps, and Challenges.

#### Posts Tab

**FR-S09-006** — The Posts tab shall display a reverse-chronological feed of posts from cluster members. Each post shall show: anonymized avatar, anonymized username handle, post text with optional method tag chip, and optionally a plant photo.

**FR-S09-007** — Each post shall provide: a Like count with Like button, a Comment count with Comment button, a bookmark icon ("Save Plant" to add the discussed plant to the user's watchlist), and a Report (⚑) icon for content moderation.

**FR-S09-008** — Tapping a photo on a post shall open a full-screen image viewer with a "Log this plant →" CTA that opens MOD-02 Add / Edit Plant Sheet pre-filled with the plant shown.

**FR-S09-009** — Tapping the Comment button shall expand an inline comment thread below the post.

**FR-S09-010** — The system shall provide a "Post to Cluster" FAB (bottom-right). Tapping it shall open an inline compose overlay with: a text field, a camera icon (triggers MOD-04 if camera permission not granted), a "@ Tag plants" button to link the post to a plant in the user's garden, and a method selector chip.

#### Members Tab

**FR-S09-011** — The Members tab shall display a list of cluster members with: anonymized avatar, anonymized username handle, method badges, and the date they joined the cluster. No real names, email addresses, or locations shall be displayed.

**FR-S09-012** — The system shall display a summary label: "X members growing Y together" at the top of the Members tab.

#### Swaps Tab

**FR-S09-013** — The Swaps tab shall display seed, cutting, and tool swap listings. Each listing shall show: the item name, type (Seed / Cutting / Tool), and an "Available in [city]" label.

**FR-S09-014** — Each swap listing shall include an "Express Interest" button. Tapping it shall record the user's interest and notify the listing creator (anonymously).

#### Challenges Tab

**FR-S09-015** — The Challenges tab shall display any active cluster-specific challenge with a "Submit Entry" button that opens MOD-01 Quick Log Sheet.

**FR-S09-016** — The system shall provide a challenge entry share button that opens MOD-12 Export / Share Sheet.

---

### SCR-10 · Local Grow Map

#### Navigation & Access

**FR-S10-001** — The system shall navigate to the Local Grow Map from the "View Map →" link on SCR-08 Community Hub and from the Local tab banner.

**FR-S10-002** — A back arrow shall return the user to SCR-08.

#### Map Display

**FR-S10-003** — The system shall display an interactive map as the primary view, occupying approximately 60% of the screen height.

**FR-S10-004** — The map shall display anonymized success clusters as coloured dot markers, grouped by crop or plant category. Dot colour shall indicate crop category.

**FR-S10-005** — The map shall display the user's location as a soft-glow pin at zone or city level. The map SHALL NOT display the user's precise GPS coordinates or street-level position.

**FR-S10-006** — The map shall support standard pan and pinch-to-zoom gestures.

#### Layer Toggle

**FR-S10-007** — A layer toggle icon shall open a layer options sheet with three selectable views: Success Rate heat layer, Active Growers count layer, and Recent Logs (last 7 days) layer.

**FR-S10-008** — Crop filter chips (All, Tomatoes, Herbs, Leafy Greens, Root Veg, Fruit, Hydro) shall filter the visible clusters on the map in real time when tapped.

#### Cluster Popup Card

**FR-S10-009** — Tapping any cluster dot on the map shall open a bottom-sheet popup card displaying: the crop name, the number of growers in that area, the success rate percentage, the top local tip (sourced from the highest-upvoted community post for that crop and zone), and the relevant method tags.

**FR-S10-010** — The popup card shall provide a "Grow This Plant →" CTA button that opens MOD-02 Add / Edit Plant Sheet pre-filled with the crop's species data.

**FR-S10-011** — The popup card shall provide a "View Cluster →" link that navigates to the relevant SCR-09 Garden Cluster Detail if a matching cluster exists.

#### Stats Strip

**FR-S10-012** — Below the map, the system shall display a statistics strip showing: total plants tracked in the user's city, the most popular plant this season in the user's zone, and the user's zone label.

#### Privacy

**FR-S10-013** — The map shall display a persistent privacy footer with the label "All data anonymized — location only shared at zone level" and a "Privacy settings →" link to SCR-13.

**FR-S10-014** — All data shown on the Local Grow Map shall be aggregated and anonymized. No individual user data, usernames, or precise locations shall be displayed on or derivable from the map.

---

## 8. Profile Tab

---

### SCR-11 · Profile & Badges

#### Navigation & Access

**FR-S11-001** — The system shall display the Profile & Badges screen when the user taps the Profile tab in the bottom navigation bar.

**FR-S11-002** — Tapping the settings icon in the header shall navigate to SCR-12 Settings.

#### Profile Header

**FR-S11-003** — The system shall display the user's avatar (default illustrated avatar or camera-uploaded image), display name or placeholder ("GardenPulse Grower"), and a growing profile tag auto-generated from their methods and location (e.g., "Hydro + Balcony · Berlin").

**FR-S11-004** — Tapping "Edit Profile" shall allow the user to update their display name and upload or change their avatar photo.

#### Garden Health Score

**FR-S11-005** — The system shall display the user's overall Garden Health Score as a large circular dial (0–100) with a week-over-week delta label (e.g., "+5 this week" or "−2 this week").

**FR-S11-006** — Tapping "View Breakdown →" shall expand an accordion beneath the dial showing all 8 Health Score metrics with individual values and short plain-English explanations.

#### Stats Row

**FR-S11-007** — The system shall display a horizontal stats row with four pill statistics: total plants count, total log entries count, current logging streak in days, and challenges won count.

#### Achievement Badges

**FR-S11-008** — The system shall display earned achievement badges in full colour and locked badges in greyscale with a padlock icon. Badge types shall include but are not limited to: "Hydro Master," "Balcony Boss," "Zero-Waste Gardener," and streak-based badges (e.g., "Streak: 30 Days").

**FR-S11-009** — Tapping any earned badge shall display a badge detail sheet showing: the badge graphic, the badge name, the date it was earned, the unlock criteria, and a Share button that opens MOD-12.

**FR-S11-010** — Tapping a locked badge shall display only the badge name and unlock criteria, with a progress indicator if applicable.

#### Confidence Score

**FR-S11-011** — The system shall display a "My Skills" section showing the Confidence Score as a 15-skill chart or bar list. Tracked skills shall be method-agnostic (e.g., Watering, Nutrient Mixing, Pest ID, Pruning). This section shall be clearly labelled as optional.

**FR-S11-012** — Skill scores shall increment based on logged actions relevant to each skill (e.g., logging a "Feed" action increases the Nutrient Mixing skill).

#### Streak Tracker

**FR-S11-013** — The system shall display the current logging streak (consecutive days with at least one log entry) with a flame icon, and the user's longest streak as a personal record label.

**FR-S11-014** — The system shall display a 30-day calendar heatmap showing logging activity density per day.

#### Navigation Links

**FR-S11-015** — The system shall display tappable navigation rows for: Progress Reels Gallery (→ SCR-15), Cemetery Log (→ SCR-14), and Creator Studio (→ SCR-16 with the label "Earn from your guides").

#### Referral Banner

**FR-S11-016** — The system shall display a referral banner showing: "Invite 3 friends → unlock Multi-Zone Management," a progress bar (X / 3 friends referred), and a "Share Invite Link" button that opens MOD-12 with the referral link as the shared content.

**FR-S11-017** — When a user has successfully referred 3 friends (verified by the referral link being used to install the app), the system shall unlock Multi-Zone Management and replace the referral banner with a "Multi-Zone Management unlocked ✓" confirmation card.

#### Supporter Banner

**FR-S11-018** — If the user has not purchased the Supporter Badge, the system shall display a subtle banner at the bottom of the Profile screen: "$2.99 · Remove interstitial ads" with a "Learn More" button that opens MOD-07 Supporter Badge Dialog.

**FR-S11-019** — If the user has purchased the Supporter Badge, the banner shall be replaced by a "Supporter ✓" badge on their profile header card.

---

### SCR-12 · Settings

#### Navigation & Access

**FR-S12-001** — The system shall navigate to Settings from the Settings icon on SCR-11 Profile and from the Settings icon on SCR-01 Dashboard header.

**FR-S12-002** — A back arrow shall return the user to the previous screen.

#### Profile & Growing Setup

**FR-S12-003** — The system shall provide an editable display name field and a growing method multi-select (allowing multiple methods to be active simultaneously).

**FR-S12-004** — The system shall provide an editable location/zone field with an auto-detect button and a manual entry fallback.

**FR-S12-005** — The system shall provide a unit system selector: Metric and Imperial. Changing this shall immediately update all numeric values displayed throughout the app.

#### Notifications

**FR-S12-006** — The system shall provide a "Notification Preferences →" row that opens MOD-10 Notification Preferences Sheet.

#### Appearance

**FR-S12-007** — The system shall provide a theme toggle with two options: Balcony Bright (light mode) and Grow Tent Dark (dark mode).

**FR-S12-008** — The system shall provide a font selector with at minimum two options: Standard and Dyslexia-Friendly (OpenDyslexic or equivalent). Selecting Dyslexia-Friendly shall apply the font across all text in the app immediately.

**FR-S12-009** — The system shall provide a Colour-Blind Mode toggle. When enabled, all health status indicators and metric colour codings shall switch to a high-contrast palette accessible to users with common colour vision deficiencies.

**FR-S12-010** — The system shall provide a text size slider allowing the user to adjust the base text size across the app.

#### Accessibility

**FR-S12-011** — The system shall provide a Voice Input toggle. When enabled, a microphone icon shall be surfaced on all text input fields throughout the app, allowing hands-free entry.

**FR-S12-012** — The system shall provide a Screen Reader Mode toggle. When enabled, the system shall optimise all interactive element labels and focus order for VoiceOver (iOS) and TalkBack (Android).

**FR-S12-013** — The system shall provide a Reduce Motion toggle. When enabled, all non-essential animations (confetti, leaf unfurl, milestone celebrations) shall be disabled or replaced with static alternatives.

#### Language & Region

**FR-S12-014** — The system shall provide a language selector with at minimum English and German at launch. Changing language shall restart the app and apply the new locale to all UI text.

**FR-S12-015** — The system shall provide a date format selector: DD/MM/YYYY or MM/DD/YYYY.

#### Privacy & Data

**FR-S12-016** — The system shall provide a "Privacy Dashboard →" row that navigates to SCR-13.

**FR-S12-017** — The system shall provide a "Do Not Sell My Info" toggle (CCPA compliance). Enabling it shall immediately disable all ad personalisation data collection.

**FR-S12-018** — The system shall provide an Ad Personalisation toggle. Disabling it shall suppress personalised ad targeting without removing ads from the app.

**FR-S12-019** — The system shall provide a Community Data opt-in toggle for contributing anonymized grow data to the Local Grow Map and Community Hub stats. Disabling it shall remove the user's data from all aggregate calculations.

#### Monetisation

**FR-S12-020** — The system shall provide a "Supporter Badge — Remove Ads" row that opens MOD-07 Supporter Badge Dialog.

#### Content & Tips

**FR-S12-021** — The system shall provide a "Show contextual learning tips" toggle. When disabled, the system shall suppress all contextual tip cards on SCR-01 Dashboard and SCR-03 Plant Detail.

**FR-S12-022** — The system shall provide an "Offline article caching" toggle. When enabled, the system shall download all Smart Tips Library articles over Wi-Fi when connected, making them available offline.

#### About

**FR-S12-023** — The About section shall display the current app version string.

**FR-S12-024** — The About section shall provide tappable links to: Terms of Service, Privacy Policy, Rate GardenPulse (opens the respective App Store / Play Store rating page), and Send Feedback.

#### Danger Zone

**FR-S12-025** — The system shall provide an "Export All My Data" button that initiates a GDPR-compliant data export. The system shall notify the user that the export will be delivered within 24 hours (e.g., downloaded or emailed to a confirmed address).

**FR-S12-026** — The system shall provide a "Delete All My Data" button styled in red. Tapping it shall display a two-step confirmation dialog (first: "Are you sure?", second: "This cannot be undone. Type DELETE to confirm."). On confirmation, all user data, plant records, logs, photos, and settings shall be permanently deleted.

**FR-S12-027** — The system shall provide a "Sign Out" button that clears the local session while retaining cached plant data, allowing the user to re-enter the app without re-onboarding.

---

### SCR-13 · Privacy Dashboard

#### Navigation & Access

**FR-S13-001** — The system shall navigate to the Privacy Dashboard from the "Privacy & Data" section in SCR-12 Settings.

**FR-S13-002** — A back arrow shall return the user to SCR-12.

**FR-S13-003** — The screen shall display a "Last updated [timestamp]" label in the header showing when the privacy settings were last modified.

#### Data Inventory

**FR-S13-004** — The system shall display a clear inventory of all data categories stored by the app. Each category shall be shown as an expandable row with: the data type name, the date of the last entry for that type, and the data volume or count.

**FR-S13-005** — The data inventory shall cover at minimum the following categories: Location Data, Plant Logs, Photos, Voice Logs, and Ad Personalisation Data.

**FR-S13-006** — Each data category row shall provide a "Clear" or "Delete All" button that immediately deletes all data in that category after a single confirmation tap.

**FR-S13-007** — The Plant Logs category row shall additionally provide an "Export" button that triggers the data export flow for log data only.

#### Granular Toggles

**FR-S13-008** — The system shall provide granular on/off toggles for each of the following: Location Sharing, Photo Storage, Voice Log Retention, Ad Personalisation, and Community Anonymised Data Contribution. Each toggle shall have a one-sentence description of what it controls.

**FR-S13-009** — Disabling any toggle shall take effect immediately and persist across app restarts.

**FR-S13-010** — Disabling Community Anonymised Data Contribution shall remove the user's aggregate data from the Local Grow Map and all community stats within 24 hours.

#### Legal Actions

**FR-S13-011** — The system shall display a prominent "Export My Data" CTA button (GDPR Art. 20 — data portability). Tapping it shall initiate the export process and display a status card: "Your data export is being prepared — ready within 24 hours."

**FR-S13-012** — The system shall display a "Delete All My Data" CTA button styled in red (GDPR Art. 17 — right to erasure). This shall trigger the same two-step confirmation as in SCR-12.

**FR-S13-013** — The system shall display a prominent "Do Not Sell My Info" toggle (CCPA Section 1798.120). This shall be visually distinct and easy to locate.

**FR-S13-014** — The system shall display a tappable Privacy Policy link and a tappable Data Processing Agreements summary link.

**FR-S13-015** — If a data export request is pending, the system shall display a status card on the Privacy Dashboard: "Your data export is being prepared. Estimated delivery: [timeframe]."

---

### SCR-14 · Cemetery Log

#### Navigation & Access

**FR-S14-001** — The system shall navigate to the Cemetery Log from SCR-11 Profile navigation links and from the Archive confirmation dialog on SCR-03 Plant Detail.

**FR-S14-002** — A back arrow shall return the user to the originating screen.

**FR-S14-003** — A "+ Add" button in the header shall allow the user to manually add a plant that died before the app was in use, without requiring a prior log history.

#### Pattern Detection

**FR-S14-004** — When the Cemetery Log contains two or more archived plants with the same cause of death, the system shall display a dismissible insight card at the top of the log: "Pattern detected: You've lost [N] plants to [cause] → Check your [relevant screen]." The suggested screen shall be contextual (e.g., overwatering → link to SCR-07 Smart Scheduler).

#### Display

**FR-S14-005** — When the Cemetery Log is empty, the system shall display an empty state with an illustrated gravestone graphic and the label "No failures recorded yet — keep growing! 🌱."

**FR-S14-006** — Each archived plant entry shall display: plant thumbnail, plant name, growing method badge, date archived, and a "cause of death" label.

**FR-S14-007** — The cause of death shall be editable via a selector with pre-defined categories: pH Spike, Root Rot, Overwatering, Underwatering, Nutrient Burn, Pest, Light Stress, Temperature Shock, and Unknown.

**FR-S14-008** — Each entry shall include an editable "What I learned:" text field with a voice input microphone icon. Notes saved here shall be timestamped.

**FR-S14-009** — The Cemetery Log shall be filterable by: Method, Date, and Cause.

#### Interactions

**FR-S14-010** — Each entry shall provide a "Restore to Garden" button. Tapping it shall move the plant back to SCR-02 Plant List as an active plant, with all its original log history intact.

**FR-S14-011** — Each entry shall provide a "Delete Entry" icon. Tapping it shall display a confirmation dialog before permanently deleting the entry.

**FR-S14-012** — A "+ Log Manually" CTA button shall open an inline form with fields for: plant name, growing method, estimated date of archival, cause of death (selector), and notes.

#### Export

**FR-S14-013** — The system shall provide an "Export Log as PDF" button. Tapping it shall trigger MOD-05 Rewarded Video Prompt. After successful video completion, MOD-12 Export / Share Sheet shall open with the Cemetery Log PDF as the export content.

---

### SCR-16 · Creator Studio

#### Navigation & Access

**FR-S16-001** — The system shall navigate to the Creator Studio from the "Creator Studio" row on SCR-11 Profile.

**FR-S16-002** — A back arrow shall return the user to SCR-11.

**FR-S16-003** — The "Publish" button in the header shall be disabled (greyed) until the guide has passed a pre-publication readiness check: title present, at least one category selected, and body content exceeding a minimum character count.

#### Revenue & Moderation Notice

**FR-S16-004** — The system shall display a revenue info banner at the top of the Creator Studio: "Write guides → earn AdMob revenue share," and a moderation notice: "All guides reviewed before going live (24–48 h)."

**FR-S16-005** — The system shall provide a "Learn How It Works" link in the banner that opens a brief inline explanation of the creator revenue share model.

#### Guide Editor

**FR-S16-006** — The system shall provide a cover image upload area. Tapping it shall offer options: capture with camera (triggers MOD-04 if camera permission not granted) or upload from the photo library.

**FR-S16-007** — The system shall provide a guide title text field with a maximum of 80 characters.

**FR-S16-008** — The system shall provide a category / method multi-select using chips. Available categories shall include: Soil, Hydro, Container, Indoor, Microgreen, Pest Control, Nutrition, and all other growing methods supported by the app.

**FR-S16-009** — The system shall provide a tags field accepting a maximum of 5 tags, with autocomplete suggestions from the app's tag library.

**FR-S16-010** — The system shall provide a rich text editor with a formatting toolbar: Bold, Italic, Heading (H2, H3), Bullet List, Numbered List, Image Insert, and Divider.

**FR-S16-011** — The editor shall provide an "Insert Plant Template" shortcut button that inserts a standardised plant care table template (with rows for Watering, Light, Nutrients, Common Issues) at the cursor position.

**FR-S16-012** — The editor shall provide an "Insert Tip Block" shortcut button that inserts a styled callout block (visually distinct box for tips or warnings) at the cursor position.

**FR-S16-013** — The system shall calculate and display an estimated read time label that updates live as the user writes.

**FR-S16-014** — The system shall provide a "Preview" toggle that switches the editor to a read-view, showing the guide exactly as it will appear to readers.

#### Save & Submit

**FR-S16-015** — The system shall provide a "Save Draft" button that saves the current guide locally and syncs it when the device is connected.

**FR-S16-016** — The system shall provide a "Submit for Review" CTA button. Tapping it shall display a confirmation dialog: "Submit for moderation? Your guide will be reviewed in 24–48 hours." On confirmation, the guide shall be sent for review and its status set to "Under Review."

#### My Published Guides

**FR-S16-017** — The system shall display a "My Published Guides" section below the editor area, listing all of the user's guides with: thumbnail, title, status chip (Under Review / Live / Rejected), and for Live guides: view count and ad revenue earned label.

**FR-S16-018** — If a guide is rejected, the status chip shall be tappable to reveal the moderation rejection reason.

**FR-S16-019** — For Live guides, the system shall provide an "Edit" button that creates a new draft version of the guide. The live version shall remain visible to readers until the edited version is approved and published.

**FR-S16-020** — For Live guides, the system shall display an ad revenue earned label sourced from the creator's share of AdMob revenue from ads shown within their published guide, with a "Withdraw Earnings" link.

---

## 9. Modals · Sheets · Overlays

---

### MOD-01 · Quick Log Sheet

#### Trigger & Dismissal

**FR-M01-001** — The Quick Log Sheet shall be triggered by: the "+" FAB on SCR-01 Dashboard, the "+" FAB on SCR-02 Plant List, the "Log" FAB on SCR-03 Plant Detail, the "Log" action pill on SCR-03, and the "Submit Entry" button on community challenges.

**FR-M01-002** — The sheet shall open as a bottom sheet with an initial snap height of approximately 50% of screen height, expandable to approximately 80% via drag.

**FR-M01-003** — Tapping outside the sheet or dragging it downward shall dismiss it without saving any data.

#### Plant Selector

**FR-M01-004** — The sheet shall display a horizontal scrollable list of the user's active plants as thumbnail cards. If the sheet was opened from SCR-03 Plant Detail, the originating plant shall be pre-selected.

**FR-M01-005** — Selecting a plant shall highlight its card with a selection ring. At least one plant must be selected before the "Log It" button is enabled.

#### Photo

**FR-M01-006** — The sheet shall display a large photo capture area. Tapping it shall open the native camera (triggering MOD-04 if camera permission is not granted). A gallery import icon shall allow the user to select an existing photo instead.

**FR-M01-007** — A photo is optional. The user shall be able to log an entry without capturing a photo.

#### Activity Type

**FR-M01-008** — The sheet shall display activity type chips (multi-select): Water, Feed, Prune, Check, Harvest, Repot, Transplant, Note. At least one activity type must be selected before the "Log It" button is enabled.

#### Rating

**FR-M01-009** — The sheet shall display a single emoji-scale slider from 1 (😟) to 5 (😄) labelled "How did it go?" The slider shall default to the midpoint (3). Rating is optional.

#### Notes

**FR-M01-010** — The sheet shall display a freeform "Add a quick note…" text area with a microphone icon. Tapping the microphone icon shall request mic permission if not granted (MOD-04), then open voice recording. The recorded audio shall be transcribed to text and placed in the notes field.

**FR-M01-011** — The system shall NEVER auto-activate the microphone. It shall only activate on explicit user tap of the mic icon.

#### Location Tag

**FR-M01-012** — The sheet shall display an auto-generated location tag chip (e.g., "Berlin · Zone 7b"). The user shall be able to remove the tag by tapping the "×" icon on the chip.

#### Add to Reel

**FR-M01-013** — The sheet shall display an "Add to Reel" toggle. When enabled, the logged photo shall be included in the timelapse sequence for the selected plant and will be available for reel generation in SCR-15.

#### Optional Metrics

**FR-M01-014** — The sheet shall include a collapsed "Add metrics (optional)" row. When expanded, it shall reveal: a pH slider, an EC/PPM numeric field, a Moisture % field, and a Temperature field. All metric fields shall be optional.

#### Submit

**FR-M01-015** — The "Log It ✓" button shall be enabled only when at least one plant and one activity type are selected. Tapping it shall save the log entry, update the selected plant's last logged timestamp, and update the Garden Health Score based on the logged activity. The sheet shall close with a brief success animation.

---

### MOD-02 · Add / Edit Plant Sheet

#### Trigger & Dismissal

**FR-M02-001** — The Add / Edit Plant Sheet shall be triggered by: the "+" button on SCR-02 Plant List, the "Add Your First Plant" button during onboarding, and the "Edit Plant" option in SCR-03 Plant Detail's overflow menu.

**FR-M02-002** — When triggered from SCR-03 for editing, all fields shall be pre-filled with the existing plant's data.

**FR-M02-003** — Tapping "Cancel" or swiping the sheet down shall dismiss without saving. If unsaved changes are present, a confirmation dialog shall ask "Discard changes?"

#### Plant Identification

**FR-M02-004** — The sheet shall display a plant name search field with autocomplete sourced from the local plant database (minimum 3,000 species). The autocomplete list shall appear as the user types from 2 characters onward.

**FR-M02-005** — The sheet shall provide a "Scan to identify" camera button. If camera permission is not granted, MOD-04 (Camera) shall be triggered first. On successful plant identification via camera, the species name and photo shall be auto-filled.

**FR-M02-006** — The sheet shall provide browse-by-type category chips: Herb, Vegetable, Fruit, Flower, Houseplant, Microgreen. Tapping a chip shall filter the autocomplete suggestions.

#### Fields

**FR-M02-007** — The sheet shall provide a plant photo capture / gallery import area. The selected photo shall be used as the plant's thumbnail throughout the app.

**FR-M02-008** — The sheet shall provide a nickname field with a maximum of 30 characters.

**FR-M02-009** — The sheet shall provide a required growing method selector with pills: Soil, Container, Hydro, Indoor.

**FR-M02-010** — The sheet shall provide a conditional container/pot size field (shown only when the Container method is selected), with a numeric field and a unit toggle (L / gal).

**FR-M02-011** — The sheet shall display the auto-detected zone badge. A "Change location" link shall allow the user to manually enter a different location for this specific plant.

**FR-M02-012** — The sheet shall provide a started date picker (date selector, defaults to today) and an optional target harvest date picker.

**FR-M02-013** — The sheet shall provide a "Remind me for this plant" toggle. When enabled, the plant's care tasks shall generate notifications per the user's notification preferences.

#### Save

**FR-M02-014** — The "Save Plant" button shall be enabled only when the plant name field is non-empty and a growing method is selected.

**FR-M02-015** — On save, if this is a new plant, the system shall add the plant to SCR-02 Plant List and navigate to SCR-03 Plant Detail for the new plant. If this is an edit, the updated data shall be reflected immediately on SCR-03.

---

### MOD-03 · QR Scanner Overlay

#### Trigger & Dismissal

**FR-M03-001** — The QR Scanner Overlay shall be triggered by: the "QR / Label Scanner" card on SCR-04 Tools Hub, and the "Scan label" button on SCR-05 Nutrient / Recipe Calculator.

**FR-M03-002** — A "✕ Close" button in the top-left shall dismiss the overlay and return the user to the triggering screen without any data change.

#### Camera & Scanning

**FR-M03-003** — The overlay shall display a full-screen live camera feed. If camera permission has not been granted, MOD-04 (Permission Context Modal — Camera) shall be triggered before the camera UI is shown.

**FR-M03-004** — The overlay shall display an animated scan frame (rectangle with pulsing border) as a visual alignment guide for QR codes and barcodes.

**FR-M03-005** — The overlay shall display a "Point at a QR code or barcode" instruction label.

**FR-M03-006** — The overlay shall provide a flash/torch toggle icon.

**FR-M03-007** — The overlay shall provide a "Enter code manually" fallback text link at the bottom of the screen for situations where a physical scan is not possible.

#### Detection & Actions

**FR-M03-008** — Upon successful detection of a QR code or barcode, the system shall check the detected value against the local brand/product database.

**FR-M03-009** — When a match is found, the system shall display a bottom sheet card showing: product thumbnail (if available), product name, brand name, and product type chip (Nutrient / Seed / Sensor / Other).

**FR-M03-010** — The success card shall provide contextual action buttons based on the triggering screen: "Fill Calculator →" (if triggered from SCR-05, auto-fills the brand selector) or "Log Scan →" (creates a scan log entry for the current plant).

**FR-M03-011** — When no match is found in the local database, the system shall display the raw decoded value and a "Log Scan →" button with no auto-fill.

---

### MOD-04 · Permission Context Modal

#### Trigger & Variants

**FR-M04-001** — The Permission Context Modal shall be triggered contextually — never at app launch or during onboarding unless the user explicitly initiates an action requiring the permission. Variants shall exist for: Location, Camera, and Microphone.

**FR-M04-002** — The Location variant shall be triggered after the user taps "Next" on ONB-2 and before navigating to ONB-3.

**FR-M04-003** — The Camera variant shall be triggered the first time the user taps any camera-dependent feature: Leaf Diagnostics, QR Scanner, photo capture in Quick Log, or "Scan to identify" in MOD-02.

**FR-M04-004** — The Microphone variant shall be triggered only when the user explicitly taps a microphone / voice input icon.

#### Display

**FR-M04-005** — The modal shall display a contextual illustration relevant to the permission type: a map pin with leaf (location), a camera lens with leaf (camera), a microphone with waveform (microphone).

**FR-M04-006** — The modal shall display a title and a two-sentence benefit description explaining what the permission enables and how the data is used (e.g., "GardenPulse uses your location to give weather-aware care tips. You can change this any time in Settings.").

**FR-M04-007** — The modal shall display a privacy reassurance label (e.g., "Location never shared publicly without explicit opt-in").

#### Interactions

**FR-M04-008** — The primary "Allow [Permission]" button shall trigger the native OS system permission dialog. The modal shall close after the OS dialog is dismissed (regardless of grant or denial).

**FR-M04-009** — The "Not Now" secondary link shall dismiss the modal without triggering the OS permission dialog. The originating feature shall gracefully degrade (e.g., show the manual location entry fallback).

**FR-M04-010** — A "Learn more about privacy →" text link shall navigate to SCR-13 Privacy Dashboard.

#### Denied State

**FR-M04-011** — If the user has previously denied a permission at the OS level and then triggers a feature requiring it, the system shall display a non-modal banner (not a full modal) reading "[Permission] access is off" with an "Open Settings" button that deep-links to the device's permission settings for the app.

**FR-M04-012** — For the camera-denied state specifically, the system shall also display a "Use Gallery Instead" fallback button that opens the device photo library.

---

### MOD-05 · Rewarded Video Prompt

#### Trigger

**FR-M05-001** — The Rewarded Video Prompt shall be triggered by: the "Export / Share" button on SCR-05 Nutrient / Recipe Calculator results, the "Download" button on SCR-15 Progress Reels Gallery playback, and the "Export Log as PDF" button on SCR-14 Cemetery Log.

#### Display

**FR-M05-002** — The prompt shall display a video play icon graphic, a heading "Unlock [X]" (where X is the specific unlock: "PDF Export," "HD Download," or "Compliance Log"), a sub-label "Watch a 30-second video to unlock this for free," and an estimated duration label ("~30 seconds").

**FR-M05-003** — The prompt shall display a "▶ Watch Video" primary button and a "No Thanks" secondary text link.

**FR-M05-004** — Tapping "No Thanks" shall dismiss the prompt and return the user to the triggering screen without providing the unlock.

#### Video Playback

**FR-M05-005** — Tapping "Watch Video" shall launch the AdMob rewarded video unit in full-screen.

**FR-M05-006** — The video player shall display a progress timer label and a skip button that appears only after the required minimum watch time has elapsed (as defined by the AdMob rewarded unit configuration).

#### Success State

**FR-M05-007** — After the video completes (or skip is allowed and tapped), the system shall display an unlock success state with: an animated unlock visual, the label "Unlocked! Your [X] is ready," and a "Download / Export Now" CTA button.

**FR-M05-008** — Tapping "Download / Export Now" shall open MOD-12 Export / Share Sheet with the unlocked content ready.

**FR-M05-009** — The success state shall auto-dismiss after 3 seconds if the user does not tap the CTA.

---

### MOD-06 · Interstitial Ad

#### Trigger & Display

**FR-M06-001** — The Interstitial Ad shall be triggered ONLY when the user taps "Generate Recipe" on SCR-05 Nutrient / Recipe Calculator. It shall appear during the 1.5-second animated loading state between tapping the button and the results appearing.

**FR-M06-002** — The Interstitial Ad SHALL NEVER be triggered on: any onboarding screen (ONB-1 through ONB-4), any permission request screen (MOD-04), any error state, or any screen where the user is in the process of granting or reviewing permissions.

**FR-M06-003** — The system shall display the AdMob interstitial unit full-screen with an attribution label "Ad · Powered by AdMob."

**FR-M06-004** — A "✕ Close" button shall appear after a minimum of 5 seconds, complying with AdMob interstitial policy. Tapping it shall dismiss the ad and display the calculator results.

#### Supporter Badge Suppression

**FR-M06-005** — When a user has purchased the Supporter Badge (MOD-07), the Interstitial Ad trigger on SCR-05 shall be suppressed entirely. The results shall appear directly after the 1.5-second loading animation with no ad shown.

---

### MOD-07 · Supporter Badge Dialog

#### Trigger

**FR-M07-001** — The Supporter Badge Dialog shall be triggered by: the "Supporter Badge — Remove Ads" row in SCR-12 Settings, and the "Learn More" button on the profile supporter banner in SCR-11.

#### Display

**FR-M07-002** — The dialog shall display the Supporter Badge graphic with an animated shimmer, the heading "Support GardenPulse 🌿," and the price label "$2.99 · One-time · No subscription."

**FR-M07-003** — The dialog shall display a "What you get" list: Remove interstitial ads forever, Supporter badge on your profile, GardenPulse watermark removal on exports.

**FR-M07-004** — The dialog shall display a "What stays" note in grey text: "Tips and native content remain — they help us improve the app." This is required to ensure the user understands that native ads will still appear.

#### Purchase Flow

**FR-M07-005** — Tapping the "Support GardenPulse — $2.99" button shall initiate the platform's native in-app purchase flow (App Store / Google Play Store billing).

**FR-M07-006** — On successful purchase, the system shall permanently record the Supporter Badge status, suppress all future interstitial ad triggers, and display the Supporter Badge on the user's profile header.

**FR-M07-007** — The dialog shall display a "Restore Purchase" link. Tapping it shall query the platform's purchase restoration API and re-apply the Supporter Badge if a prior purchase is found.

**FR-M07-008** — Tapping "Not Now" shall dismiss the dialog without initiating any purchase flow.

---

### MOD-08 · Batch Mode Overlay

#### Trigger & Activation

**FR-M08-001** — The Batch Mode Overlay shall be activated by the batch mode toggle button in the SCR-02 Plant List header.

**FR-M08-002** — Activating batch mode shall transform all plant cards in SCR-02 to show multi-select checkboxes without navigating away from the list.

#### Controls

**FR-M08-003** — The system shall replace the SCR-02 header with a batch mode header showing: a "Batch Mode" label, a selected count badge (e.g., "3 selected"), a "Select All" button, and a "✕ Cancel" button.

**FR-M08-004** — Tapping "Select All" shall select all plants currently visible in the list (respecting any active method filter).

**FR-M08-005** — When one or more plants are selected, the system shall display a bottom action bar with the following buttons: Water All, Feed All, Log Entry, and Archive.

#### Batch Actions

**FR-M08-006** — Tapping "Water All" shall display a confirmation dialog: "Mark [N] plants as watered today?" On confirmation, the system shall log a "Water" activity for each selected plant with the current timestamp and update each plant's care schedule accordingly.

**FR-M08-007** — Tapping "Feed All" shall display a confirmation dialog: "Log a Feed entry for [N] plants?" On confirmation, the system shall log a "Feed" activity for each selected plant.

**FR-M08-008** — Tapping "Log Entry" shall open MOD-01 Quick Log Sheet with the multi-plant mode active — the plant selector shall show all selected plants pre-checked.

**FR-M08-009** — Tapping "Archive" shall display a confirmation dialog: "Archive [N] plants to the Cemetery Log?" On confirmation, all selected plants shall be moved to SCR-14 Cemetery Log and removed from SCR-02.

#### Exit

**FR-M08-010** — Tapping "✕ Cancel" or tapping the batch mode toggle again shall exit batch mode, restore the standard plant card view, and deselect all plants without performing any action.

---

### MOD-09 · Tip Article Reader Sheet

#### Trigger

**FR-M09-001** — The Tip Article Reader Sheet shall be triggered by: the contextual tip card on SCR-01 Dashboard, the contextual tip card on SCR-03 Plant Detail, the tip link in SCR-06 Leaf Diagnostics results, and any "Read: [article title]" link within the app.

#### Display

**FR-M09-002** — The sheet shall open as a bottom sheet, initially at approximately 50% screen height, draggable to full screen.

**FR-M09-003** — The sheet shall display: a header image (offline-cached), the article title, a meta row (method tag chip, estimated read time, author name if a Creator Studio guide, published date), and the article body in rich text.

**FR-M09-004** — Article body content shall be rendered from the locally cached Smart Tips Library. The system shall NOT load external webviews or external URLs for article content.

**FR-M09-005** — Article content shall NOT auto-play any video or audio.

**FR-M09-006** — The sheet shall display one native ad block within the article body, styled as a "Recommended Tool" card, non-interruptive to the reading flow. It shall not appear at the very top or bottom of the content.

**FR-M09-007** — The sheet shall display a "Related Articles" row at the bottom showing 2 articles with thumbnails and titles. Tapping them shall replace the current article content in the same sheet.

#### Actions

**FR-M09-008** — The sheet shall provide a bookmark icon. Tapping it shall save the article to a "Bookmarked Tips" collection accessible from within the sheet.

**FR-M09-009** — The sheet shall provide a Share icon that opens MOD-12 Export / Share Sheet with the article title and a deep link as the shared content.

**FR-M09-010** — The sheet shall provide a "Mark as Read ✓" button. Tapping it shall mark the article as read so it does not re-appear as a suggestion until the content is updated.

---

### MOD-10 · Notification Preferences Sheet

#### Trigger

**FR-M10-001** — The Notification Preferences Sheet shall be triggered by the "Notification Preferences →" row in SCR-12 Settings and the "Notification preferences →" quick link in SCR-07 Smart Scheduler.

#### Master Toggle

**FR-M10-002** — The sheet shall display a master "Enable all reminders" toggle at the top. When disabled, all per-category toggles shall be visually greyed and all notifications suppressed, but the individual toggle states shall be preserved.

#### Per-Category Toggles

**FR-M10-003** — The sheet shall display individual on/off toggles for the following notification categories: Watering Reminders, Feeding Reminders, Pest and Disease Alerts, Weather-Based Care Updates, Community Activity (Clusters and Challenges), and Weekly Bloom Report. Each toggle shall have an icon and a one-line description.

**FR-M10-004** — Toggling any individual category shall take immediate effect without requiring a "Save" action.

#### Timing Preferences

**FR-M10-005** — The sheet shall display a timing preference section with a radio selector: Morning (7–9 AM), Afternoon (12–2 PM), Evening (6–8 PM). The selected preference shall apply to all new care reminder notifications.

**FR-M10-006** — The sheet shall display a "Skip weekends" toggle. When enabled, no care reminders shall fire on Saturdays or Sundays.

#### Travel Mode

**FR-M10-007** — The sheet shall display a "Travel Mode" toggle. When enabled, a date range picker shall appear to set the start and end dates of travel. All notifications shall be suppressed during the travel period. The schedule data shall remain intact.

#### Save

**FR-M10-008** — The sheet shall display a "Save Preferences" primary button. Tapping it shall persist all toggle states and dismiss the sheet.

**FR-M10-009** — A "Cancel" text link shall dismiss the sheet without saving any changes made during the current session.

---

### MOD-11 · Weekly Bloom Report Sheet

#### Trigger

**FR-M11-001** — The Weekly Bloom Report Sheet shall be triggered by: the "View Report" button on the Weekly Bloom Report banner on SCR-01 Dashboard, and by tapping a "Weekly Bloom Report" push notification.

**FR-M11-002** — The system shall surface the Weekly Bloom Report banner on SCR-01 Dashboard on Monday mornings, or on the first app open after a lapse where the user has at least 7 days of log data.

#### Display

**FR-M11-003** — The sheet shall display a date range label covering the previous week (e.g., "May 26 – Jun 1, 2026").

**FR-M11-004** — The sheet shall display a summary stats row with four pill cards: plants logged count for the week, total log entries for the week, Garden Health Score change from the previous week (e.g., "+7 pts" or "−2 pts"), and current streak status.

**FR-M11-005** — The sheet shall display a "Best performing plant this week" spotlight card showing: plant thumbnail, plant name, growing method badge, and the most notable health improvement for that plant.

**FR-M11-006** — The sheet shall display a weather correlation insight derived from the week's weather data and log entries (e.g., "Your tomatoes logged their best growth rate on the 3 sunniest days this week").

**FR-M11-007** — When the user archived at least one plant during the week, the sheet shall display a conditional alert row: "⚠ [N] plant(s) archived this week → See Cemetery Log" with a tappable link to SCR-14.

**FR-M11-008** — The sheet shall display a "Next week tip" card containing a contextual tip based on the upcoming week's forecast for the user's zone (e.g., "Frost risk on Friday → bring indoor plants in by Thursday"). This tip shall come from the Smart Tips Library, not auto-generated text.

#### Actions

**FR-M11-009** — The sheet shall provide a "Share Report" icon button that opens MOD-12 Export / Share Sheet with a summary image of the weekly report as the shareable content.

**FR-M11-010** — The sheet shall provide a "View Full Garden →" CTA button that dismisses the sheet and navigates to SCR-02 Plant List.

**FR-M11-011** — A "Dismiss" text link at the bottom shall close the sheet without any navigation action.

---

### MOD-12 · Export / Share Sheet

#### Trigger

**FR-M12-001** — The Export / Share Sheet shall be triggered by: the Share action pill on SCR-03 Plant Detail, the Export / Share button on SCR-05 Calculator results (after MOD-05 completes), the Share icon on SCR-09 Garden Cluster Detail, the Share button on SCR-11 Profile badge detail, the Share / Download actions on SCR-15 Reels Gallery (after MOD-05 completes), the Share button in MOD-09 Tip Article Reader, and the Share Report button in MOD-11 Weekly Bloom Report.

#### Pre-Share Layer

**FR-M12-002** — Before the native OS share sheet is presented, the system shall display a GardenPulse pre-share layer showing a content preview (photo thumbnail, PDF preview, or reel frame), and format options relevant to the current content type.

**FR-M12-003** — Format options shall be displayed contextually based on what is being shared:

- Plant photo / diagnosis result: "Share as Image (PNG)" only
- Calculator recipe: "Share as Image (PNG)" and "Export PDF" (requires MOD-05 if not already unlocked)
- Reel: "Share as Image (PNG)" and "Download Video" (requires MOD-05 if not already unlocked)
- Report / log: "Share as Image (PNG)," "Export PDF" (requires MOD-05), and "Copy Text Summary"

**FR-M12-004** — The pre-share layer shall display a "Copy Text Summary" option where applicable, copying a plain-text version of the content to the device clipboard.

#### Watermark

**FR-M12-005** — All image and video exports shall include the GardenPulse watermark by default.

**FR-M12-006** — Users who have purchased the Supporter Badge shall see a "Include GardenPulse branding" toggle on the pre-share layer. Disabling this toggle shall remove the watermark from the exported content.

**FR-M12-007** — Users who have NOT purchased the Supporter Badge shall not see the watermark toggle; the watermark shall be applied without option to remove.

#### OS Share Sheet

**FR-M12-008** — Tapping "Continue to Share →" on the pre-share layer shall open the native platform share sheet (iOS Share Sheet / Android Share Intent) with the selected content ready.

**FR-M12-009** — The native OS share sheet shall display standard platform sharing destinations (Instagram, TikTok, WhatsApp, Messages, Copy Link, Save to Photos, and others as provided by the OS).

**FR-M12-010** — A "Cancel" button shall be available on the pre-share layer to dismiss without proceeding to the OS share sheet.

---

_End of GardenPulse Functional Requirements_

**Document Summary**

| Section                   | ID Range                | Count   |
| ------------------------- | ----------------------- | ------- |
| System-Wide               | FR-SYS-001 → FR-SYS-024 | 24      |
| Onboarding                | FR-ONB1 → FR-ONB4       | 40      |
| SCR-01 Dashboard          | FR-S01-001 → FR-S01-031 | 31      |
| SCR-02 Plant List         | FR-S02-001 → FR-S02-018 | 18      |
| SCR-03 Plant Detail       | FR-S03-001 → FR-S03-031 | 31      |
| SCR-15 Reels Gallery      | FR-S15-001 → FR-S15-013 | 13      |
| SCR-04 Tools Hub          | FR-S04-001 → FR-S04-009 | 9       |
| SCR-05 Calculator         | FR-S05-001 → FR-S05-021 | 21      |
| SCR-06 Leaf Diagnostics   | FR-S06-001 → FR-S06-021 | 21      |
| SCR-07 Smart Scheduler    | FR-S07-001 → FR-S07-020 | 20      |
| SCR-08 Community Hub      | FR-S08-001 → FR-S08-017 | 17      |
| SCR-09 Cluster Detail     | FR-S09-001 → FR-S09-016 | 16      |
| SCR-10 Local Grow Map     | FR-S10-001 → FR-S10-014 | 14      |
| SCR-11 Profile & Badges   | FR-S11-001 → FR-S11-019 | 19      |
| SCR-12 Settings           | FR-S12-001 → FR-S12-027 | 27      |
| SCR-13 Privacy Dashboard  | FR-S13-001 → FR-S13-015 | 15      |
| SCR-14 Cemetery Log       | FR-S14-001 → FR-S14-013 | 13      |
| SCR-16 Creator Studio     | FR-S16-001 → FR-S16-020 | 20      |
| MOD-01 Quick Log Sheet    | FR-M01-001 → FR-M01-015 | 15      |
| MOD-02 Add / Edit Plant   | FR-M02-001 → FR-M02-015 | 15      |
| MOD-03 QR Scanner         | FR-M03-001 → FR-M03-011 | 11      |
| MOD-04 Permission Modal   | FR-M04-001 → FR-M04-012 | 12      |
| MOD-05 Rewarded Video     | FR-M05-001 → FR-M05-009 | 9       |
| MOD-06 Interstitial Ad    | FR-M06-001 → FR-M06-005 | 5       |
| MOD-07 Supporter Badge    | FR-M07-001 → FR-M07-008 | 8       |
| MOD-08 Batch Mode         | FR-M08-001 → FR-M08-010 | 10      |
| MOD-09 Tip Article Reader | FR-M09-001 → FR-M09-010 | 10      |
| MOD-10 Notification Prefs | FR-M10-001 → FR-M10-009 | 9       |
| MOD-11 Bloom Report       | FR-M11-001 → FR-M11-011 | 11      |
| MOD-12 Export / Share     | FR-M12-001 → FR-M12-010 | 10      |
| **TOTAL**                 |                         | **523** |
