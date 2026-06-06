# GardenPulse Architectural Audit & Scope Optimization Report

This report documents the detailed results of the comprehensive architectural audit conducted on the GardenPulse project documentation, comparing all intermediate spec elements against the core client feature brief (`Gardenpulse .md`) and technology stack boundaries (`PRIMARY_TECHNOLOGY_STACK.txt`).

---

## 1. Scope Creep Deletions (`[DELETE - SCOPE CREEP]`)

We flagged the following elements as unrequested scope creep and pruned them completely:

| Classification | ID | Source File | Description | Rationale |
| :--- | :--- | :--- | :--- | :--- |
| `[DELETE]` | `FR-S09-013` | Functional Requirements | structured Swaps tab tool/seed listing | Not in client brief; groups can swap seeds informally, but structural transaction lists are creep. |
| `[DELETE]` | `FR-S09-014` | Functional Requirements | Express Interest transaction logging | Not in client brief; adds backend transaction weight. |
| `[DELETE]` | `FR-S16-018` | Functional Requirements | CMS Moderation Rejection logs | Simple validation/moderation only is needed; rejection details/logs add unnecessary admin UI. |
| `[DELETE]` | `FR-S16-019` | Functional Requirements | Multiple draft versioning queue | Version branching is out of scope for a simple guides publisher. |
| `[DELETE]` | `FR-S16-020` | Functional Requirements | Payment withdrawal wallet widget | Revenue share calculation is B2B; transactional payment wallets inside mobile client add massive SDK weight. |
| `[DELETE]` | `FR-S12-013` | Functional Requirements | Reduce Motion state toggle | Standard accessibility supports system settings; custom in-app toggles are redundant. |
| `[DELETE]` | `FR-S12-026` | Functional Requirements | GDPR Art 20 Data Portability button | Deletion dashboard is retained, but automated data bundle exports are not client-brief requested. |
| `[DELETE]` | `FR-S13-004` | Functional Requirements | GDPR CCPA Storage size auditor | Showing precise megabyte counts of database fields adds redundant frontend query workload. |
| `[DELETE]` | `FR-S13-015` | Functional Requirements | Pending data export status card | Removed along with automated data portability exports. |
| `[DELETE]` | `UI Element` | Screen Elements | Swaps tab interface components | Pruned from SCR-09. |
| `[DELETE]` | `UI Element` | Screen Elements | Wallet withdrawal dashboard elements | Pruned from SCR-16. |

---

## 2. Protected Structural Infrastructure (`[RETAIN - TECHNICAL DEPENDENCY]`)

The following elements were strictly protected due to technical, security, or compilation stack dependencies:

- **Firebase Infrastructure:**
  - Local database transaction syncing & offline-first cache hooks.
  - Authentication state listeners & JWT token refresh handlers.
  - Cloud storage bucket connection handlers & loading placeholders.
- **Google Gemini API Boundaries:**
  - Leaf Diagnostics multi-modal payload weight checks.
  - API rate limit error boundaries (showing clean fallback states instead of crashes).
- **AdMob Integration Lifecycle:**
  - Consent Management Platform (CMP) tracking opt-in forms.
  - Video ad preloading hooks & screen change tracking triggers.
- **Mobile UX Essentials:**
  - Loading spinners, pull-to-refresh indicators, location/camera permission modals.

---

## 3. Consolidated UI Tokens (`[CONSOLIDATE - REUSABLE COMPONENT]`)

We collapsed redundant screen-specific UI components into 17 global design tokens:

| Token ID | Component Name | Description | Match Keywords |
| :--- | :--- | :--- | :--- |
| `UI-GLB-BACK-BTN` | Back Navigation Button | Reusable navigation button to return. | back arrow, back link, back button |
| `UI-GLB-SETTINGS-ICON` | Settings Header Icon | Reusable settings header access button. | settings icon, settings button |
| `UI-GLB-BELL-ICON` | Notification Bell Icon | Reusable notification access icon with badge. | notification bell, bell icon |
| `UI-GLB-CLOSE-BTN` | Dismiss/Close Button | Universal dismiss or close button. | close, dismiss, ✕ |
| `UI-GLB-BOTTOM-NAV` | App Bottom Navigation Bar | Standard 5-tab application shell bar. | bottom navigation, bottom bar |
| `UI-GLB-FAB` | Floating Action Button | Universal button for creating/logging. | floating action button, fab, + button |
| `UI-GLB-SEARCH-BAR` | Input Search Field | Text field with search icon for list filter. | search field, search box, search bar |
| `UI-GLB-PRIMARY-CTA` | Primary Green Button | High-emphasis action button. | primary cta, next, continue, start growing |
| `UI-GLB-SECONDARY-LINK` | Text Action Link | Lower-emphasis link button. | secondary link, skip for now, remind me later, no thanks |
| `UI-GLB-MIC-ICON` | Voice Input Microphone Icon | Reusable voice-to-text trigger icon. | mic icon, voice input, microphone icon |
| `UI-GLB-CAMERA-BTN` | Camera Trigger Button | Reusable camera capture trigger. | camera scan, scan to identify, capture button, camera button |
| `UI-GLB-NATIVE-AD` | AdMob Native Ad Card | In-feed native advertisement frame. | native ad, ad slot |
| `UI-GLB-DATE-PICKER` | Date Picker Widget | Reusable date selector modal/strip. | date picker, date selector |
| `UI-GLB-LOCATION-BADGE` | Location Info Badge | Reusable USDA zone and city badge. | location tag, zone badge, location badge |
| `UI-GLB-LOADING-SPINNER` | Async Loading Spinner | Reusable circular loading dial. | loading indicator, loading spinner, spinner |
| `UI-GLB-SAVE-BTN` | Save Action Button | Universal data commit button. | save button, save recipe, save plant, log it |
| `UI-GLB-TOGGLE` | State Toggle Switch | Standard toggle switch or checkbox. | toggle, switch, checkbox |
