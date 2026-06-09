# GardenPulse - Implementation Todo List

## Project Setup
- [ ] Create app directory structure for Expo Router
- [ ] Update App.tsx to use Expo Router
- [ ] Install required dependencies (expo-router, react-native-gesture-handler, etc.)

## Navigation Structure
- [ ] Create root layout (`app/_layout.tsx`) with NativeTabs for bottom navigation
- [ ] Create (tabs) group for main tabs
- [ ] Create Home tab (Dashboard)
- [ ] Create Garden tab (Plant List, Plant Detail, Progress Reels)
- [ ] Create Tools tab (Tools Hub, Nutrient Calculator, Leaf Diagnostics, Smart Scheduler)
- [ ] Create Community tab (Community Hub, Garden Cluster Detail, Local Grow Map)
- [ ] Create Profile tab (Profile & Badges, Settings, Privacy Dashboard, Cemetery Log, Creator Studio, Progress Reels)

## Onboarding Flow
- [ ] Create onboarding group/layout
- [ ] ONB-1: Splash Screen
- [ ] ONB-2: Welcome + Method Selection
- [ ] ONB-3: Add First Plant
- [ ] ONB-4: Instant Care Plan Preview

## Modals/Sheets/Overlays
- [ ] MOD-01: Quick Log Sheet (formSheet)
- [ ] MOD-02: Add/Edit Plant Sheet (formSheet)
- [ ] MOD-03: QR Scanner Overlay (modal)
- [ ] MOD-04: Permission Context Modal (modal)
- [ ] MOD-05: Rewarded Video Prompt (modal)
- [ ] MOD-06: Interstitial Ad (modal)
- [ ] MOD-07: Supporter Badge Dialog (modal)
- [ ] MOD-08: Batch Mode Overlay (modal)
- [ ] MOD-09: Tip Article Reader Sheet (formSheet)
- [ ] MOD-10: Notification Prefs Sheet (formSheet)
- [ ] MOD-11: Weekly Bloom Report Sheet (formSheet)
- [ ] MOD-12: Export/Share Sheet (formSheet)

## Components & Shared
- [ ] Create reusable UI components (Button, Card, Input, etc.)
- [ ] Create theme/provider setup
- [ ] Create common hooks and utilities

## Navigation Configuration
- [ ] Configure all stack presentations (modal, formSheet, push)
- [ ] Set up proper headers, titles, and back button behavior
- [ ] Add link previews and context menus where appropriate