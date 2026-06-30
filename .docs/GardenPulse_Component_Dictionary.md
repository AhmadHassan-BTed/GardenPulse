#  GardenPulse: Component Dictionary & AI Builder Guide

**Welcome to the GardenPulse Design System!** \* **For the User:** Use this dictionary to browse available UI elements, find the exact component you need, and conceptualize your screens without writing code.

- **For the AI Agent:** You are strictly bound to this dictionary. When asked to generate a screen, you **must not** build raw UI from scratch (no raw `<View>` or `<Text>` for interactive elements). You must import and compose the components listed below, passing the exact props specified.

---

##  Core Architecture (The Rules)

1. **Screen Root:** Every top-level screen MUST be wrapped in `<ScreenWrapper scrollable={boolean} withPadding={boolean}>`.
2. **Theming:** Always import `useTheme` from `../components/layout/ThemeProvider`. Extract colors via `const { Colors, Spacing, Radius, Typography } = useTheme();`.
3. **Icons:** Only use `@expo/vector-icons` (`Feather`).
4. **Imports:** All components are located in `../components/common/`.

---

##  The Component Dictionary (124 Components)

_(Props marked with `?` are optional. Standard props like `style` and `onPress` apply everywhere)._

### 1. Layout, Headers & Navigation

- **`ScreenWrapper`**: The required root container. `(scrollable?, withPadding?)`
- **`CustomHeader`**: The top app bar. `(title, showBack?, onBack?, rightNode?, transparent?)`
- **`SectionHeader`**: Splits page content (e.g., "Today's Tasks"). `(title, actionLabel?, onActionPress?)`
- **`HorizontalScrollRow`**: Side-scrolling list container. `(children, gap?, edgePadding?)`
- **`InScreenTabBar`**: Sub-navigation inside a screen. `(tabs: string[], activeTab, onTabChange)`
- **`Divider`**: Horizontal separator. `(text?)`
- **`SwipeableRow`**: Wraps a card to reveal hidden actions on swipe. `(children, onLog, onArchive)`

### 2. Buttons & Core Interactions

- **`CustomButton`**: The main interaction element. `(label, variant="primary"|"secondary"|"ghost", fullWidth?, leftIcon?, isLoading?, isDisabled?)`
- **`IconButton`**: Circular icon button. `(name: FeatherIcon, size?, color?, filled?, onPress)`
- **`FAB`**: Floating Action Button (bottom-right). `(iconName, onPress)`
- **`ActionPillRow`**: Horizontal scroll of quick actions. `(actions: {id, label, icon, onPress, isDestructive?}[])`
- **`BatchActionBar`**: Floating bottom bar for multi-select. `(selectedCount, onWaterAll, onFeedAll, onLogEntry, onArchive)`
- **`TextLink`**: Inline clickable text. `(label, onPress, variant="primary"|"muted"|"danger")`
- **`VoiceInputButton`**: Floating mic button for voice-to-text. `()`

### 3. Inputs & Forms

- **`CustomInput`**: Standard text field. `(label, value, onChangeText, error?, helperText?, leftIcon?, rightIcon?, multiline?, keyboardType?)`
- **`AutocompleteSearchInput`**: Search with dropdown suggestions. `(label, value, onChangeText, data[], onSelect)`
- **`NotesInput`**: Text area with voice dictation UI. `(label, value, onChangeText, isRecording, onMicPress)`
- **`CustomSwitch`**: iOS style toggle switch. `(value, onValueChange, label, description?, isDisabled?)`
- **`Checkbox`**: Square checklist item. `(value, onValueChange, label, isDisabled?)`
- **`RadioGroup`**: Mutual exclusion selection. `(options: {label, value}[], selectedValue, onSelect, horizontal?)`
- **`CustomSlider`**: Range selection. `(label, value, onValueChange)`
- **`CustomDateTimePicker`**: Date/Time picker UI. `(label, value, mode="date"|"time", onChange)`
- **`MetricsQuickEntry`**: Accordion for logging soil/hydro metrics. `(phValue, ecValue, moistureValue, tempValue, onXChange...)`
- **`ActivityTypeChips`**: Multi-select pill array (Water, Feed, Prune). `(selectedActivities[], onToggleActivity)`
- **`QuickLogPlantSelector`**: Row of circular plant avatars. `(plants: {id, name, imageUrl?}[], selectedId, onSelect)`
- **`PhotoCaptureArea`**: Large dashed box for adding photos. `(capturedPhotoUri?, onOpenCamera, onOpenGallery, onClearPhoto)`
- **`CauseOfDeathSelector`**: Filter chips for archiving plants. `(selected, onSelect)`
- **`CustomReminderForm`**: Form for custom task reminders. `()`
- **`RepeatSelector`**: Dropdown for schedule repeating. `(value, onChange)`

### 4. Atoms, Tags & Identifiers

- **`StatusBadge`**: Small status tag. `(label, status="success"|"warning"|"error"|"neutral", variant="default"|"dot")`
- **`ZoneBadge`**: Map/Weather zone indicator. `(zone, location?)`
- **`GrowingStageChip`**: Visual lifecycle tag. `(stage="Seedling"|"Veg"|"Bloom")`
- **`SeverityIndicator`**: Visual warning level. `(level="low"|"medium"|"high")`
- **`GuideStatusChip`**: Status for community guides. `(status)`
- **`HealthDotIndicator`**: Colored dot based on 0-100 score. `(healthScore)`
- **`ThemeToggle`**: Switches Light/Dark mode. `(variant?, showLabel?)`
- **`UnitToggle`**: Metric/Imperial switch. `(value, onChange)`
- **`GridListToggle`**: Layout switch. `(isGrid, onToggle)`
- **`NotificationBell`**: Icon with notification dot. `(unreadCount, onPress)`
- **`SplashLogo`**: Animated entry logo. `(onAnimationComplete)`
- **`EmptyStateView`**: Placeholder for empty lists. `(title, description, actionLabel, onActionPress)`
- **`ConfettiCelebration`**: Absolute overlay for task completion. `()`

### 5. Cards: Plants, Tasks & Core Data

- **`PlantCard`**: Main garden inventory item. `(name, method, healthStatus, lastLoggedDays, isGrid, onPress)`
- **`PlantHeroImage`**: Top-of-screen large image banner. `(imageUrl, photoCount, onAddPhoto)`
- **`PlantInfoCard`**: Detailed profile specs. `(commonName, species, method, stage, dateAdded, zone, containerSize, onEdit)`
- **`TaskCard`**: Daily to-do item. `(plantName, taskType, isDone, onDonePress)`
- **`ToolCard`**: Navigation card for utilities. `(title, description, iconName, onPress)`
- **`SuccessStatCard`**: Community success rate display. `(plantName, successRate, growerCount, trend)`
- **`CemeteryEntryCard`**: Archived plant record. `(name, method, archivedDate, imageUrl, onRestore, onDelete)`
- **`RecipeResultCard`**: Hydroponic/Soil nutrient mix UI. `(reservoirSize, nutrients[], phMin, phTarget, phMax, ecValue, onSave, onSchedule)`
- **`DiagnosisResultCard`**: AI visual leaf scan results. `(plantId, confidence, issue, severity, explanation, onTreatIssue, onReadMore)`
- **`BloomBestPlantCard`**: Weekly star performer display. `(plantName, method, healthDelta)`
- **`CarePlanSummaryCard`**: Setup overview. `(method, light, waterFreq)`
- **`SelectedPlantPreviewCard`**: Search result confirmation. `(name, scientific, methodBadge, imageUrl)`
- **`QRSuccessCard`**: Product scan result. `(name, brand, type, onScanAnother)`

### 6. Data Visualizations & Charts

- **`MetricDial`**: Circular gauge chart. `(value: 0-100, label)`
- **`ConfidenceScoreChart`**: Horizontal bar chart for grower skills. `(skills: {id, name, score}[])`
- **`CalendarHeatmap`**: GitHub-style 30-day activity grid. `(data: {date, logCount}[])`
- **`CalendarMonthGrid`**: Standard month calendar with task dots. `(selectedDate, onSelectDate, days[])`
- **`CalendarWeekStrip`**: Horizontal 7-day strip. `(selectedDate, onSelectDate, days[])`
- **`MetricBreakdownRow`**: 2x2 grid of key plant vitals. `(metrics: {id, name, value, status, icon}[])`
- **`LogTimeline`**: Vertical scrolling history tree. `(entries: {id, timestamp, activities, notes, metrics, hasVoiceNote}[])`
- **`DiagnosisHistoryRow`**: List item for past leaf scans. `(date, plantName, finding, severity, imageUrl)`
- **`StatsPillRow`**: Profile statistics. `(plantsCount, logCount, streak, challengesWon)`
- **`BloomStatsPillRow`**: Weekly report stats. `(plantsLogged, logEntries, healthDelta, streak)`

### 7. Overlays, Sheets & Modals

- **`BottomSheetModal`**: Slide-up panel from bottom. `(visible, onClose, title, subtitle?, children)`
- **`ModalDialog`**: Center alert box. `(visible, title, description, primaryAction, secondaryAction?, iconNode?)`
- **`BadgeDetailSheet`**: Achievement unlock UI. `(visible, onClose, badge: {name, description, icon, isEarned...})`
- **`ScanningStateOverlay`**: Translucent loading state for AI analysis. `()`
- **`PostComposeOverlay`**: Inline text-area for creating social posts. `(userAvatarUrl?, onSubmit)`
- **`MapLayerToggleSheet`**: Radio selection for map views. `()`
- **`PermissionDeniedState` / `PermissionDeniedBanner`**: Hardware permission fallbacks. `(permissionName/Type, onOpenSettings, onGalleryFallback)`
- **`InterstitialAdContainer`**: AdMob wrapper. `(visible, onClose, countdownSeconds)`
- **`RewardedVideoPrompt`**: Pre-ad consent UI. `(featureName, onWatchPress, onDismiss)`

### 8. Community, Social & Map

- **`PostCard`**: Social feed item. `(username, content, methodTag, likesCount, commentsCount, onLike...)`
- **`ClusterCard`**: Local grower group preview. `(name, memberCount, method, isJoined, hasRecentActivity, onPress, onJoinPress)`
- **`ClusterCoverHeader`**: Top hero image for a group. `(title, memberCount, location, onJoin)`
- **`MapClusterPopupCard`**: Map marker popover. `(cropName, stats, tip, onGrow)`
- **`ChallengeCard`**: Community event display. `(title, countdownLabel, entryCount, onSubmitPress)`
- **`WinnerSpotlightCard`**: Post-challenge winner display. `(username, prizeLabel, challengeName)`
- **`ReelCard`**: Video thumbnail. `(plantName, dateRange, duration, onPlayPress...)`
- **`CommentThread`**: Social post replies. `()`
- **`MemberRow`**: List item for group members. `(name, joinedDate, avatarUrl)`
- **`SwapCard`**: Seed/Cutting marketplace item. `(itemName, type, location, onExpressInterest)`
- **`GrowMapView`**: Interactive map. `(markers[], currentZone, city, totalTracked, popularPlant, onMarkerPress...)`
- **`FullScreenPhotoViewer`**: Image modal. `(onClose, onLog)`

### 9. Profile, Settings & Insights

- **`ProfileHeaderCard`**: User profile top section. `(name, growerTag, avatarUrl, onEditProfile, onAvatarPress)`
- **`AvatarPicker`**: Editable profile image. `(imageUrl, onPress, size)`
- **`StreakDisplay`**: App usage metrics. `(currentStreak, longestStreak)`
- **`SettingsSectionGroup`**: Wrapper for settings options. `(title, children)`
- **`DangerZoneSection`**: Red-tinted wrapper for destructive settings. `(children)`
- **`NavigationLinkRow`**: Standard settings row with chevron. `(label, value?, onPress, isDestructive?)`
- **Selectors:** `FontSelector`, `TextSizeSlider`, `LanguageSelector`, `DateFormatSelector`.
- **Insight Banners:** `ComebackBonusBanner`, `BloomReportBanner`, `PatternInsightCard`, `ContextualTipCard`, `WeatherImpactBanner`, `CrossMethodInsightCard`, `LocalContextCard`, `ReferralBanner`, `RecentlyUsedBanner`.
- **`WeatherWidget`**: Live forecasting. `(city, zone, currentTemp, conditionIcon, humidity, uvIndex, rainChance, forecast[], alertMessage?)`
- **`ForecastStrip` / `SunriseSunsetRow`**: Weather sub-components.
- **`DataInventoryRow`**: Privacy data management. `(category, count, sizeEstimate, lastUpdated, onClear?, onExport?, onDeleteAll?)`
- **`PrivacyToggleRow`**: Data sharing toggle. `(iconName, label, description, value, onValueChange)`

### 10. Creators & Premium

- **`RichTextEditor`**: Toolbar + text area for guides. `(initialValue, onChange, onInsertTemplate, onInsertTip)`
- **`ArticleBodyRenderer`**: Renders cached JSON articles. `(blocks: {id, type, content, url, caption}[])`
- **`PublishedGuideCard`**: Author's guide management. `(title, status, views, revenue, onEdit)`
- **`RevenueBanner`** / **`SupporterBadgeBanner`** / **`SupporterBenefitsList`**: Monetization UI.
- **`ExportFormatOptions`**: PDF/Image export selector. `(isSupporter, onSelectPNG, onSelectPDF...)`
- **`WatermarkToggleRow`**: `(isSupporter)`
- **`PendingExportStatusCard`**: Loading state for data exports.
- **`UnlockSuccessState`**: Post-purchase confirmation.
- **`VideoProgressOverlay`**: AdMob timer overlay.
- **`VideoPlayer`**: `(videoUrl, plantName, methodTag, onClose...)`
- **`ReelGeneratorFlow`**: Multi-step video creator. `(onClose, onComplete)`

### 11. Auxiliary, Custom & Helper Components

- **`CustomText`**: Standard typography element wrapper. `(variant?, size?, weight?)`
- **`OnboardingProgressBar`**: Progress indicator. `(totalSteps, currentStep)`
- **`MethodSelectionCard`**: Onboarding selection. `(title, description, iconName, isSelected, onPress)`
- **`PlantBrowseGrid`**: Grid of plant categories. `(categories)`
- **`LocalContextCard`**: Displays regional/local advice. `(title, description, location?)`
- **`NotificationOptInRow`**: Checkbox row for notification onboarding. `(isEnabled, onToggle, plantName)`
- **`ContextualTipCard`**: Expert garden tip presentation. `(title, method, readTime, onPress)`
- **`BloomReportBanner`**: Weekly report card. `(onPress)`
- **`ComebackBonusBanner`**: Daily login rewards indicator. `(streakCount, bonusAwarded)`
- **`FilterChip`**: Selector pill. `(label, isSelected, onPress)`
- **`BatchModeHeader`**: Header for multi-select. `(title, selectedCount, onSelectAll, onCancel)`
- **`WeatherImpactBanner`**: Notice for upcoming climate conditions. `(condition, impactText)`
- **`RecentlyUsedBanner`**: Recents slider. `(items)`
- **`SupporterBadgeBanner`**: Monetization highlight. `(onPress)`
- **`CustomCard`**: Standard card wrapper. `(children, padding?, style?)`
- **`CameraViewfinder`**: QR / Leaf scanner UI. `(onScan, onClose)`
- **`SmartControlsPanel`**: Automated scheduler variables. `(onReset, onApply)`
- **`PrivacyFooter`**: Terms footer. `()`
- **`BadgeGrid`**: Achievement display. `(badges[])`
- **`PatternInsightCard`**: Trend advisor. `(title, pattern, advice)`
- **`RevenueBanner`**: Creator stats card. `(totalViews, rateEstimate, projectedPayout)`
- **`ReferralBanner`**: Community invitation link. `(onPress)`
- **`MoodEmojiSlider`**: Quick log emoji picker. `(value, onChange)`
- **`PermissionIllustration`**: Context graphic. `(type)`
- **`SupporterBenefitsList`**: Subscription perks layout. `()`
- **`RelatedArticlesRow`**: Article suggestions slider. `()`
- **`BloomWeatherInsight`**: High-yield forecasting report piece. `()`
- **`BloomCemeteryAlert`**: Weekly lost plants breakdown warning. `()`
- **`Pressable`**: Core interactive wrapper. `(onPress, children)`
- **`Feather`**: Standard vector icon component. `(name, size, color)`

---

##  Composition Strategy (How to build screens)

1. **Build the Skeleton:** Start with `<ScreenWrapper scrollable>`. Add a `<CustomHeader>`.
2. **Select the primary UI pattern:**
   - **Dashboards:** Use `HorizontalScrollRow` for quick summaries. Stack `<MetricBreakdownRow>`, `<WeatherWidget>`, and `<LogTimeline>`.
   - **Lists:** Map over data to output `<PlantCard>`, `<TaskCard>`, or `<PostCard>`. Wrap items in `<SwipeableRow>` if quick-actions are needed.
   - **Forms:** Use `<CustomInput>`, `<RadioGroup>`, `<CustomSlider>`, and finish with a `<CustomButton fullWidth>`.
3. **Handle Empty States:** Always check if data exists; if not, render `<EmptyStateView>`.
4. **Floating Actions:** If the screen requires a primary global action, place a `<FAB>` at the bottom. If selecting multiple items, use `<BatchActionBar>`.
