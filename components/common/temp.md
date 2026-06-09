# GardenPulse — Component Development List

**Legend**

- ✅ Already built
- 🔨 Needs to be built

## TO BE BUILT

Grouped by domain. Every component is derived directly from a screen element in the spec — nothing added.

---

### 🌿 ONBOARDING COMPONENTS

> Used only during the ONB-1 → ONB-4 first-launch flow

|
Component
|
Description
|
Used In
|
|

---

## |

## |

|
|
🔨
`OnboardingProgressBar`
|
Step X of 3 pill-style progress indicator with filled/unfilled segments
|
ONB-2, ONB-3, ONB-4
|
|
🔨
`MethodSelectionCard`
|
Selectable card: icon + method name + one-line description + selection ring on tap; single-select
|
ONB-2
|
|
🔨
`SplashLogo`
|
Animated leaf unfurl + "GardenPulse" wordmark + tagline — Splash Screen only
|
ONB-1
|
|
🔨
`CarePlanSummaryCard`
|
Shows watering frequency + light requirement + next action chip + method tag; used on plan preview
|
ONB-4
|
|
🔨
`NotificationOptInRow`
|
Bell icon + "Get reminders for [plant name]" label + enable toggle in a single row
|
ONB-4
|

---

### 🏠 HOME / DASHBOARD COMPONENTS

|
Component
|
Description
|
Used In
|
|

---

## |

## |

|
|
🔨
`WeatherWidget`
|
City + zone badge, temp/humidity/UV/rain, 3-day forecast strip, smart alert label, pull-to-refresh
|
SCR-01
|
|
🔨
`ForecastStrip`
|
3-day horizontal strip: icon + high/low per day; child of
`WeatherWidget`
|
SCR-01, ONB-4
|
|
🔨
`SmartAlertChip`
|
Coloured chip with weather/care alert text (e.g., "Rain tomorrow → skip watering")
|
SCR-01, SCR-03
|
|
🔨
`ComebackBonusBanner`
|
Animated welcome-back illustration + message + CTA button; conditional on lapse
|
SCR-01
|
|
🔨
`TaskCard`
|
Plant thumbnail + name + task type chip +
`Done ✓`
button; used in today's tasks horizontal scroll
|
SCR-01, SCR-03
|
|
🔨
`ConfettiCelebration`
|
Animated confetti overlay — "All done today!" state; triggered when all tasks checked off
|
SCR-01
|
|
🔨
`ContextualTipCard`
|
Article title + method tag + read time label + tap trigger; styled as native content card
|
SCR-01, SCR-03, SCR-05, SCR-06
|
|
🔨
`BloomReportBanner`
|
"Your weekly report is ready 📊" label +
`View Report`
button; conditional Monday banner
|
SCR-01
|
|
🔨
`NativeAdCard`
|
Container for AdMob native ad unit; styled to match surrounding content cards
|
SCR-01, SCR-02, SCR-04, SCR-08, MOD-09
|
|
🔨
`NotificationBell`
|
Bell icon with unread badge count; tappable; lives in AppBar
|
SCR-01
|

---

### 🌿 GARDEN COMPONENTS

|
Component
|
Description
|
Used In
|
|

---

## |

## |

|
|
🔨
`PlantCard`
|
Photo thumbnail + name + method badge + health dot + "last logged X days ago"; grid and list variants
|
SCR-02
|
|
🔨
`HealthDotIndicator`
|
Small coloured dot (green / amber / red) showing plant health status at a glance
|
SCR-02, SCR-01 my plants row
|
|
🔨
`GridListToggle`
|
Icon pair to switch between 2-col grid and list view
|
SCR-02
|
|
🔨
`SwipeableRow`
|
Swipe-left-to-reveal action wrapper: Archive + Quick Log actions
|
SCR-02, SCR-07
|
|
🔨
`ZoneGroupHeader`
|
Collapsible section header for multi-zone grouping (e.g., "Windowsill", "Balcony") — shown post-referral unlock
|
SCR-02
|
|
🔨
`BatchActionBar`
|
Bottom action bar in batch mode: Water All · Feed All · Log Entry · Archive buttons
|
SCR-02, MOD-08
|
|
🔨
`EmptyStateView`
|
Illustration + heading + sub-label + optional CTA button; used across all empty list states
|
SCR-02, SCR-15, SCR-14, SCR-11 badges
|
|
🔨
`PlantHeroImage`
|
Full-width photo with photo count badge overlay + Add Photo button overlay
|
SCR-03
|
|
🔨
`ActionPillRow`
|
Horizontal row of icon+label pill buttons: Log · Diagnose · Share · Archive
|
SCR-03
|
|
🔨
`PlantInfoCard`
|
Species + common name + method badge + stage chip + date added + zone tag + container size + Edit icon
|
SCR-03
|
|
🔨
`GrowingStageChip`
|
Chip for current growth stage: Seedling · Veg · Bloom · Fruiting · Dormant
|
SCR-03, MOD-02
|
|
🔨
`MetricBreakdownRow`
|
8-metric expandable accordion row; each metric has name + value + colour indicator
|
SCR-03, SCR-11
|
|
🔨
`WeatherImpactBanner`
|
Conditional banner on plant detail: shows weather-based care alert for this specific plant
|
SCR-03
|
|
🔨
`CrossMethodInsightCard`
|
Conditional card comparing same species across methods; shows growth delta message
|
SCR-03
|
|
🔨
`LogTimelineEntry`
|
Single timeline row: thumbnail + timestamp + activity chips + metric values; expandable to full detail
|
SCR-03
|
|
🔨
`LogTimeline`
|
Vertical timeline container rendering
`LogTimelineEntry`
list with pagination
|
SCR-03
|
|
🔨
`VoiceInputButton`
|
Mic icon button that triggers permission check then recording; shows recording indicator + delete
|
SCR-03, MOD-01, SCR-14
|
|
🔨
`ReelCard`
|
2-col grid card: video thumbnail + play overlay + plant name + date range + duration + share icon
|
SCR-15
|
|
🔨
`VideoPlayer`
|
Full-screen video player: auto-play muted, method overlay, watermark, Share/Download/Edit/Close controls
|
SCR-15
|
|
🔨
`ReelGeneratorFlow`
|
Multi-step flow: plant selector → date range → photo preview strip → overlay selector → Generate button
|
SCR-15
|
|
🔨
`PhotoPreviewStrip`
|
Horizontal strip of sequenced photo thumbnails; used in reel generation preview
|
SCR-15
|
|
🔨
`OverlayStyleSelector`
|
Selector cards for reel overlay style (method-specific metric overlays)
|
SCR-15
|

---

### 🔧 TOOLS COMPONENTS

|
Component
|
Description
|
Used In
|
|

---

## |

## |

|
|
🔨
`ToolCard`
|
Icon + title + one-line description + Open chevron; 2-col grid entry point to each tool
|
SCR-04
|
|
🔨
`RecentlyUsedBanner`
|
Conditional card: last-used tool icon + name + "Open again →" link
|
SCR-04
|
|
🔨
`NutrientRecipeRow`
|
Single result row: nutrient name + dose amount + unit + colour-coded severity indicator
|
SCR-05
|
|
🔨
`RecipeResultCard`
|
Full results card: nutrient rows + pH range band + EC/PPM label + warnings + Save + Schedule + Export
|
SCR-05
|
|
🔨
`PHRangeBand`
|
Visual slider/band showing pH target range (min–working–max); read-only display
|
SCR-05
|
|
🔨
`UnitToggle`
|
Metric / Imperial toggle pill; persistent; applies to all measurements in context
|
SCR-05, MOD-02
|
|
🔨
`ScanFrameOverlay`
|
Animated leaf-shaped guide frame with pulsing border, instruction label, flash toggle
|
SCR-06
|
|
🔨
`ScanningStateOverlay`
|
Full-screen loading overlay: "Analysing on-device…" + scan line animation + privacy badge
|
SCR-06
|
|
🔨
`DiagnosisResultCard`
|
Plant ID + confidence % + method detected + primary issue + severity + explanation + actions + tip link
|
SCR-06
|
|
🔨
`SeverityIndicator`
|
Colour-coded chip: Low (green) · Medium (amber) · High (red) + label
|
SCR-06, SCR-05 warnings
|
|
🔨
`DiagnosisHistoryRow`
|
List row: date + thumbnail + plant name + finding label + severity badge
|
SCR-06
|
|
🔨
`PermissionDeniedState`
|
Illustration + heading + Open Settings button + optional gallery fallback button
|
SCR-06, any permission-gated screen
|
|
🔨
`CalendarWeekStrip`
|
Horizontal 7-day strip with coloured task dots, today highlight ring, tap-to-select
|
SCR-07
|
|
🔨
`CalendarMonthGrid`
|
Monthly grid view with task dots per day; toggle alternative to week strip
|
SCR-07
|
|
🔨
`SunriseSunsetRow`
|
Sunrise + Sunset time labels derived from zone and local timezone
|
SCR-07
|
|
🔨
`SmartControlsPanel`
|
Weather sync toggle + skip weekends toggle + travel mode toggle + date range picker + timing radio
|
SCR-07
|
|
🔨
`CustomReminderForm`
|
Inline form: plant selector + task type + repeat selector + date-time picker
|
SCR-07
|
|
🔨
`RepeatSelector`
|
Selector for recurrence: Once · Daily · Weekly · Custom interval
|
SCR-07, MOD-10
|

---

### 👥 COMMUNITY COMPONENTS

|
Component
|
Description
|
Used In
|
|

---

## |

## |

|
|
🔨
`InScreenTabBar`
|
Horizontal tab bar rendered inside a screen (not bottom nav); 3–4 tabs with active indicator
|
SCR-08, SCR-09
|
|
🔨
`LocalContextCard`
|
"What's thriving in [City]" banner + anonymous insight label + View Map link
|
SCR-08
|
|
🔨
`SuccessStatCard`
|
Plant name + success % + grower count + trending arrow; used in Local tab
|
SCR-08
|
|
🔨
`ClusterCard`
|
Cluster name + member count + method tag + activity indicator + Join/Joined button
|
SCR-08, SCR-09
|
|
🔨
`ChallengeCard`
|
Challenge title + countdown + entry count + Submit Entry button; current challenge display
|
SCR-08, SCR-09
|
|
🔨
`WinnerSpotlightCard`
|
Past challenge winner: anonymised photo + method badge + prize label + featured label
|
SCR-08
|
|
🔨
`ReferralBanner`
|
"Invite 3 friends → unlock Multi-Zone" + X/3 progress indicator + Share Invite Link button
|
SCR-08, SCR-11
|
|
🔨
`ClusterCoverHeader`
|
Cover image (or gradient fallback) + member count + location tag + creation date + description + Join/Leave button
|
SCR-09
|
|
🔨
`PostCard`
|
Avatar + handle + text + optional photo + method badge + Like/Comment/Bookmark/Report actions
|
SCR-09
|
|
🔨
`CommentThread`
|
Inline expandable comment list under a post; shows comment count, submit field
|
SCR-09
|
|
🔨
`SwapCard`
|
Item name + type chip (seed/cutting/tool) + "Available in [city]" + Express Interest button
|
SCR-09
|
|
🔨
`MemberRow`
|
Anonymised avatar + username + method badges + joined date
|
SCR-09
|
|
🔨
`PostComposeOverlay`
|
Inline compose: text field + camera attach + tag plants button + method chip + Post button
|
SCR-09
|
|
🔨
`FullScreenPhotoViewer`
|
Full-screen photo with close button + "Log this plant →" CTA overlay
|
SCR-09
|
|
🔨
`GrowMapView`
|
Interactive map: zone overlays + clustered success dots + user location pin (zone-level) + zoom/pan
|
SCR-10
|
|
🔨
`MapLayerToggleSheet`
|
Layer toggle options (Success Rate / Active Growers / Recent Logs) + crop filter chips
|
SCR-10
|
|
🔨
`MapClusterPopupCard`
|
Bottom sheet popup on cluster tap: crop name + stats + top tip + method chips + Grow This Plant CTA
|
SCR-10
|
|
🔨
`MapStatsStrip`
|
"X plants tracked in [City]" + "Most popular: [plant]" + zone badge; below map
|
SCR-10
|
|
🔨
`PrivacyFooter`
|
Padlock icon + anonymisation label + "Privacy settings →" link
|
SCR-10, SCR-13
|

---

### 👤 PROFILE COMPONENTS

|
Component
|
Description
|
Used In
|
|

---

## |

## |

|
|
🔨
`ProfileHeaderCard`
|
Avatar (tappable) + display name (editable inline) + auto-generated growing profile tag + Edit link
|
SCR-11
|
|
🔨
`AvatarPicker`
|
Tap avatar → choose camera or gallery; default illustrated leaf; returns image URI
|
SCR-11
|
|
🔨
`StatsPillRow`
|
4 horizontal scrollable pill stats: plants count · log entries · current streak · challenges won
|
SCR-11
|
|
🔨
`BadgeGrid`
|
Grid of earned (full colour) and locked (greyed + padlock) badges; tap → badge detail sheet
|
SCR-11
|
|
🔨
`BadgeDetailSheet`
|
Bottom sheet: badge name + earned date + unlock criteria + share button
|
SCR-11
|
|
🔨
`ConfidenceScoreChart`
|
15-skill radial chart or horizontal bar list; skill name + mastery level
|
SCR-11
|
|
🔨
`StreakDisplay`
|
Fire icon + current streak day count + longest streak label
|
SCR-11
|
|
🔨
`CalendarHeatmap`
|
30-day logging activity heatmap; colour intensity = logs per day
|
SCR-11
|
|
🔨
`NavigationLinkRow`
|
Tappable list row with label + chevron; used for profile nav links and settings rows
|
SCR-11, SCR-12, SCR-13
|
|
🔨
`SupporterBadgeBanner`
|
"$2.99 · Remove interstitial ads" conditional banner + Learn More button → MOD-07
|
SCR-11
|
|
🔨
`SettingsSectionGroup`
|
Grouped settings list with section heading; wraps setting rows
|
SCR-12
|
|
🔨
`FontSelector`
|
Standard / Dyslexia-Friendly (OpenDyslexic) selector
|
SCR-12
|
|
🔨
`TextSizeSlider`
|
5-step slider: Small → Large; applies font scale globally
|
SCR-12
|
|
🔨
`LanguageSelector`
|
Dropdown: English · German · French · Spanish · Dutch
|
SCR-12
|
|
🔨
`DateFormatSelector`
|
Toggle: DD/MM/YYYY · MM/DD/YYYY
|
SCR-12
|
|
🔨
`DangerZoneSection`
|
Red-tinted settings group: Export Data · Delete All Data · Sign Out
|
SCR-12
|
|
🔨
`DataInventoryRow`
|
Expandable row: data category + last entry date + size estimate + Clear/Export/Delete buttons
|
SCR-13
|
|
🔨
`PrivacyToggleRow`
|
Icon + label + description + on/off toggle; used for granular data controls
|
SCR-13
|
|
🔨
`PendingExportStatusCard`
|
Conditional card: "Your data export is being prepared — check back in 24 hours"
|
SCR-13
|
|
🔨
`CemeteryEntryCard`
|
Thumbnail + plant name + method badge + archived date + cause selector + lesson field + Restore + Delete
|
SCR-14
|
|
🔨
`CauseOfDeathSelector`
|
Dropdown/sheet selector: 9 cause options (pH spike · Root rot · Overwatering etc.)
|
SCR-14
|
|
🔨
`PatternInsightCard`
|
"🔍 Pattern detected" conditional card + View Schedule link
|
SCR-14
|
|
🔨
`GuideEditorToolbar`
|
Rich text toolbar: Bold · Italic · H2 · H3 · Bullet · Numbered · Image · Divider + template shortcuts
|
SCR-16
|
|
🔨
`RichTextEditor`
|
Full rich text input area with Insert Plant Template + Insert Tip Block shortcuts; expandable full-screen
|
SCR-16
|
|
🔨
`RevenueBanner`
|
"Write guides → earn AdMob revenue share" + moderation notice + Learn How It Works link
|
SCR-16
|
|
🔨
`PublishedGuideCard`
|
Thumbnail + title + status chip (Under Review / Live / Rejected) + view count + revenue + Edit button
|
SCR-16
|
|
🔨
`GuideStatusChip`
|
Status chip: Under Review (amber) · Live (green) · Rejected (red) + rejection reason
|
SCR-16
|

---

### 💰 MONETISATION COMPONENTS

|
Component
|
Description
|
Used In
|
|

---

## |

## |

|
|
🔨
`RewardedVideoPrompt`
|
Video play icon + "Unlock [X]" heading + duration label + Watch Video CTA + No Thanks link
|
MOD-05
|
|
🔨
`VideoProgressOverlay`
|
Full-screen progress timer + skip button (appears after AdMob minimum watch time)
|
MOD-05
|
|
🔨
`UnlockSuccessState`
|
Animated leaf+sparkle visual + "Unlocked!" heading + Download/Export Now CTA; auto-dismisses 3s
|
MOD-05
|
|
🔨
`InterstitialAdContainer`
|
Full-screen AdMob interstitial wrapper with close button (appears after 5s) + AdMob attribution footer
|
MOD-06
|
|
🔨
`SupporterBenefitsList`
|
Checklist of supporter benefits + "What stays" greyed note
|
MOD-07
|

---

### 📋 SHARED MODAL COMPONENTS

|
Component
|
Description
|
Used In
|
|

---

## |

## |

|
|
🔨
`QuickLogPlantSelector`
|
Horizontal scroll of plant thumbnail cards with names; pre-fills if context provided; "All plants" option
|
MOD-01
|
|
🔨
`PhotoCaptureArea`
|
Large tap-to-capture zone with camera icon + gallery import icon; shows captured photo preview
|
MOD-01, MOD-02, SCR-09 post compose
|
|
🔨
`ActivityTypeChips`
|
Multi-select chip group: Water · Feed · Prune · Check · Harvest · Repot · Transplant · Note
|
MOD-01
|
|
🔨
`MoodEmojiSlider`
|
Emoji-labelled slider 1(😟)→5(😄); "How did it go?" label
|
MOD-01
|
|
🔨
`LocationTagRow`
|
Auto-detected zone chip + Remove × icon; allows user to strip location before logging
|
MOD-01
|
|
🔨
`AddToReelToggle`
|
Toggle row: "Add to Reel" label + switch; adds photo to plant's timelapse sequence
|
MOD-01
|
|
🔨
`MetricsQuickEntry`
|
Expandable optional row: pH slider + EC/PPM field + Moisture % field + Temperature field
|
MOD-01
|
|
🔨
`PlantBrowseGrid`
|
Category browse grid: Herb · Vegetable · Fruit · Flower · Houseplant · Microgreen chips
|
MOD-02, ONB-3
|
|
🔨
`SelectedPlantPreviewCard`
|
Photo thumbnail + common name + scientific name + method compatibility badge
|
ONB-3, MOD-02
|
|
🔨
`QRSuccessCard`
|
Slides up on scan: product thumbnail + name + brand + type chip + auto-fill action button + Scan Another
|
MOD-03
|
|
🔨
`PermissionIllustration`
|
Context-specific illustrated icon: map-pin+leaf / camera+leaf / mic+waveform / bell+leaf
|
MOD-04
|
|
🔨
`PermissionDeniedBanner`
|
Warning icon + "[Permission] access is off" label + Open Settings button + gallery fallback (camera only)
|
MOD-04
|
|
🔨
`BatchModeHeader`
|
Replaces normal header in batch mode: "Batch Mode" label + selected count badge + Select All + Cancel
|
MOD-08
|
|
🔨
`ArticleBodyRenderer`
|
Renders offline-cached rich text article: headings, bullets, inline images, native ad mid-article
|
MOD-09
|
|
🔨
`RelatedArticlesRow`
|
2-article horizontal strip with thumbnail + title; bottom of article reader
|
MOD-09
|
|
🔨
`NotificationCategoryRow`
|
Icon + category label + toggle; one row per notification category; dims when master toggle off
|
MOD-10
|
|
🔨
`TravelModeDateRange`
|
Conditional: shown only when travel mode toggle is on; start + end date pickers inline
|
MOD-10
|
|
🔨
`BloomStatsPillRow`
|
4 horizontal pill stat cards: plants logged · log entries · health score delta · streak
|
MOD-11
|
|
🔨
`BloomBestPlantCard`
|
"Best performing plant" card: thumbnail + name + method badge + health improvement label
|
MOD-11
|
|
🔨
`BloomWeatherInsight`
|
Weather correlation text card (e.g., "Your tomatoes thrived during 3 sunny days")
|
MOD-11
|
|
🔨
`BloomCemeteryAlert`
|
Conditional alert row: "⚠ 1 plant archived this week → See Cemetery Log"
|
MOD-11
|
|
🔨
`ExportFormatOptions`
|
PNG / PDF / Copy Text format option rows; PDF greys out with "Watch video to unlock" if locked
|
MOD-12
|
|
🔨
`WatermarkToggleRow`
|
"Include GardenPulse branding" toggle; off state only available to Supporter Badge holders
|
MOD-12
|

---

## SUMMARY

|
Status
|
Count
|
|

---

## |

|
|
✅ Already built
|
28
|
|
🔨 To be built
|
96
|
|
**
Total
**
|
**
124
**
|

---

## BUILD ORDER (suggested — unblocked first)

### Phase 1 — Foundation (no dependencies on other new components)

`OnboardingProgressBar` · `MethodSelectionCard` · `SplashLogo` · `HealthDotIndicator` · `GridListToggle` · `GrowingStageChip` · `SeverityIndicator` · `UnitToggle` · `NativeAdCard` · `NotificationBell` · `EmptyStateView` · `PermissionDeniedState` · `PermissionIllustration` · `PermissionDeniedBanner` · `SmartAlertChip` · `RepeatSelector` · `GuideStatusChip`

### Phase 2 — Composite Cards (depend on Phase 1 atoms)

`PlantCard` · `TaskCard` · `ToolCard` · `ClusterCard` · `ChallengeCard` · `PostCard` · `SwapCard` · `MemberRow` · `CemeteryEntryCard` · `PublishedGuideCard` · `NutrientRecipeRow` · `DiagnosisHistoryRow` · `SuccessStatCard` · `WinnerSpotlightCard` · `ReelCard` · `BadgeGrid` · `StatsPillRow` · `DataInventoryRow` · `PrivacyToggleRow`

### Phase 3 — Feature Sections (depend on Phase 2 cards)

`WeatherWidget` · `ForecastStrip` · `RecipeResultCard` · `DiagnosisResultCard` · `PlantInfoCard` · `MetricBreakdownRow` · `LogTimeline` · `LogTimelineEntry` · `SmartControlsPanel` · `CalendarWeekStrip` · `CalendarMonthGrid` · `BloomStatsPillRow` · `BloomBestPlantCard` · `BadgeDetailSheet` · `ConfidenceScoreChart` · `CalendarHeatmap` · `ActionPillRow` · `BatchActionBar` · `InScreenTabBar`

### Phase 4 — Screens & Full Flows (depend on Phase 3)

`GrowMapView` · `VideoPlayer` · `ReelGeneratorFlow` · `RichTextEditor` · `PostComposeOverlay` · `RewardedVideoPrompt` · `InterstitialAdContainer` · `QuickLogPlantSelector` · `ActivityTypeChips` · `MetricsQuickEntry` · `ArticleBodyRenderer` · `ExportFormatOptions` · All remaining modal sub-components
