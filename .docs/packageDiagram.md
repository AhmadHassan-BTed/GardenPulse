graph TB

%% ─────────────────────────────────────────────────────────────────────────────
%% SHARED KERNEL
%% Zero dependencies. Everything else depends on this.
%% Three sections: Enums · DTOs · Service Interfaces
%% ─────────────────────────────────────────────────────────────────────────────

    subgraph SK["📦 SharedKernel — DTOs · Enums · Interfaces"]
        direction TB

        subgraph SK_EN["Enums"]
            EN1["GrowingMethod\nSoil | Container | Hydro | Indoor"]
            EN2["ActivityType\nWater | Feed | Prune | Check\nHarvest | Repot | Transplant | Note"]
            EN3["TaskType\nWater | Feed | Prune | Check | Harvest"]
            EN4["GrowthStage\nSeedling | Veg | Bloom | Flush"]
            EN5["PermissionType\nLocation | Camera | Microphone | Notifications"]
            EN6["ExportType\nPNG | PDF | VideoDownload | TextSummary"]
            EN7["Severity\nLow | Medium | High"]
            EN8["AdTrigger\nCalculatorGenerate"]
            EN9["UnlockType\nPdfExport | HdDownload | ComplianceLog"]
            EN10["DataCategory\nLocation | PlantLogs | Photos\nVoiceLogs | AdPersonalisation"]
            EN11["CauseOfDeath\npHSpike | RootRot | Overwatering\nUnderwatering | NutrientBurn\nPest | LightStress | TempShock | Unknown"]
            EN12["GuideStatus\nDraft | UnderReview | Live | Rejected"]
            EN13["MapLayer\nSuccessRate | ActiveGrowers | RecentLogs"]
            EN14["ScanContext\nFromCalculator | FromToolsHub"]
            EN15["TimingSlot\nMorning | Afternoon | Evening"]
        end

        subgraph SK_DT["DTOs  (plain data — no methods, no logic)"]

            subgraph SK_DT_PLANT["Plant + Log"]
                D1["PlantDTO\nid · speciesName · nickname\nmethod: GrowingMethod · zone\nstartedDate · targetHarvestDate\ncontainerSize · growingStage\nisArchived · remindersEnabled"]
                D2["LogEntryDTO\nid · plantId · timestamp\nactivities: ActivityType[]\nphotoUrl · metrics: MetricsDTO\nnote · mood · locationTag\naddToReel · isDiagnosisEntry"]
                D3["MetricsDTO\nph · ecPpm · moisture · temperature"]
                D4["HealthScoreDTO\nscore · delta\nbreakdown: MetricBreakdownDTO[]"]
                D5["MetricBreakdownDTO\nname · value · label"]
                D6["InsightDTO\nplantIdA · plantIdB\nmessage · metricDiff"]
                D7["ReelDTO\nid · plantId · fromDate · toDate\nvideoUrl · thumbnailUrl\ndurationSeconds · overlayMethod"]
                D8["PlantSummaryDTO\nid · speciesName · nickname\nmethod · healthScore"]
            end

            subgraph SK_DT_SCHED["Scheduling + Weather"]
                D9["TaskDTO\nid · plantId · type: TaskType\ndueDate · isDone\nisWeatherSuppressed · recurrence"]
                D10["WeatherDTO\ncity · zone · temperature · humidity\nuvIndex · rainChance · smartAlert\nforecast: ForecastDayDTO[]"]
                D11["ForecastDayDTO\ndate · icon · high · low · rainChance"]
                D12["SmartControlsDTO\nweatherSyncEnabled · skipWeekends\ntravelModeEnabled · travelFrom\ntravelTo · timingSlot: TimingSlot"]
                D13["ZoneDTO\ncityName · zoneCode · latitude · longitude"]
                D14["ReminderInputDTO\nplantId · type: TaskType\nrecurrence · dateTime"]
            end

            subgraph SK_DT_TOOLS["Tools"]
                D15["CalcInputDTO\nmethod: GrowingMethod · brand\nwaterVolume · unit\nstage: GrowthStage\ntargetEcPpm · phTarget"]
                D16["RecipeResultDTO\nnutrients: NutrientDoseDTO[]\nphRange: RangeDTO · ecPpm\nwarnings[] · method · stage"]
                D17["NutrientDoseDTO\nname · amount · unit · indicator"]
                D18["RangeDTO\nmin · max · working"]
                D19["DiagnosisResultDTO\nplantName · confidence\nprimaryIssue · severity: Severity\nsecondaryIssues[] · suggestedActions[]\nlinkedArticleId"]
                D20["QRResultDTO\nrawCode · productName · brand · type"]
                D21["ProductDTO\nid · name · brand · type · description"]
                D22["BrandDTO\nid · name · defaultEcPpm\nphRangeByStage · nutrientsByStage"]
            end

            subgraph SK_DT_COMM["Community"]
                D23["ClusterDTO\nid · name · memberCount\nmethod: GrowingMethod · zone\nisJoined · description · createdDate"]
                D24["PostDTO\nid · clusterId · body · photoUrl\nmethod: GrowingMethod · likes\ncommentCount · isAnonymised"]
                D25["MemberDTO\nhandle · methodBadges · joinedDate"]
                D26["SwapDTO\nid · clusterId · itemName\ntype · availableInCity"]
                D27["ChallengeDTO\nid · title · endDate · entryCount\nisPastChallenge · winnerPhotoUrl"]
                D28["ZoneStatsDTO\nzone · plantSuccessCards[]\ninsightLabel"]
                D29["MapClusterDTO\nlatitude · longitude · cropName\ngrowerCount · successRate\ntopTip · methods[]"]
                D30["MapTilesDTO\ntileUrl · bounds"]
                D31["ReferralProgressDTO\nreferred · required · isUnlocked"]
            end

            subgraph SK_DT_PROF["Profile + Settings"]
                D32["BadgeDTO\nid · name · isEarned · earnedDate\nunlockCriteria · progress"]
                D33["StreakDTO\ncurrent · longest"]
                D34["HeatmapDayDTO\ndate · intensity"]
                D35["SkillDTO\nname · level · lastUpdated"]
                D36["UserPreferencesDTO\nmethod: GrowingMethod · unitSystem\ntheme · language · showTips\nofflineCache · creatorStudioEnabled"]
                D37["NotificationPrefsDTO\nmasterEnabled · watering · feeding\npestAlerts · weatherUpdates\ncommunityActivity · weeklyBloomReport\ntimingSlot: TimingSlot · skipWeekends\ntravelMode · travelFrom · travelTo"]
                D38["AccessibilityDTO\nreduceMotion · colourBlindMode\ndyslexiaFont · voiceInputEnabled\nscreenReaderMode · textSize"]
                D39["SessionDTO\nisFirstLaunch · onboardingComplete\ndeviceTimezone · locale"]
                D40["DataInventoryDTO\nlocationLastEntry · logsCount\nphotosCount · voiceLogsCount\nadPersonalisationEnabled"]
            end

            subgraph SK_DT_CEME["Cemetery + Creator"]
                D41["CemeteryEntryDTO\nid · plantId · plantName\nmethod: GrowingMethod · archivedDate\ncauseOfDeath: CauseOfDeath\nlessonLearned · thumbnailUrl"]
                D42["PatternInsightDTO\ncause: CauseOfDeath · count · suggestion"]
                D43["GuideDTO\nid · title · body · coverImageUrl\ncategories: GrowingMethod[]\ntags[] · status: GuideStatus\nviewCount · adRevenueEarned · estimatedReadTime"]
                D44["RevenueDTO\nguideId · totalEarned · pendingPayout"]
            end

            subgraph SK_DT_MON["Monetisation + Export"]
                D45["NativeAdDTO\nunitId · payload · isPersonalised"]
                D46["ExportContentDTO\ntype: ExportType · payload\nisRewardUnlocked · includeWatermark"]
                D47["CarePlanDTO\nwateringFrequency · lightRequirement\nnextAction · method: GrowingMethod"]
                D48["BloomReportDTO\nweekRange: DateRangeDTO\nplantsLogged · logEntries · scoreDelta\nstreak: StreakDTO\nbestPlant: PlantSummaryDTO\nweatherInsight · nextWeekTip · archivedCount"]
                D49["DateRangeDTO\nfrom · to"]
                D50["BatchActionDTO\naction · plantIds[]"]
            end

        end

        subgraph SK_IF["Service Interfaces  (DIP contracts — Infrastructure implements these)"]
            I1["«interface» IPlantRepository\n+getAll(): PlantDTO[]\n+getById(id): PlantDTO\n+save(p: PlantDTO): void\n+archive(id): void\n+restore(id): void\n+delete(id): void"]
            I2["«interface» ILogRepository\n+getByPlantId(id): LogEntryDTO[]\n+save(e: LogEntryDTO): void\n+getRecent(limit): LogEntryDTO[]\n+getByDateRange(from, to): LogEntryDTO[]"]
            I3["«interface» IWeatherService\n+fetchForecast(zone: ZoneDTO): WeatherDTO\n+getCached(): WeatherDTO"]
            I4["«interface» ILocationService\n+requestLocation(): ZoneDTO\n+geocodeZip(zip): ZoneDTO\n+coarsenToZone(): ZoneDTO"]
            I5["«interface» INotificationService\n+schedule(task: TaskDTO, prefs: NotificationPrefsDTO): void\n+cancel(taskId): void\n+cancelAll(): void\n+reschedule(taskId, date): void"]
            I6["«interface» IStorageService\n+upload(path, file): string\n+delete(path): void"]
            I7["«interface» ILocalCache\n+get(key): unknown\n+set(key, value): void\n+delete(key): void\n+clear(): void"]
            I8["«interface» IAdService\n+canShowInterstitial(): boolean\n+loadNative(slot): NativeAdDTO\n+loadRewarded(unlock: UnlockType): void\n+geoFenceCheck(zone: ZoneDTO): boolean"]
            I9["«interface» IPurchaseService\n+purchase(productId): void\n+restore(): void\n+isActive(): boolean"]
            I10["«interface» IAnalyticsService\n+logEvent(name, params): void"]
            I11["«interface» IVisionService\n+analyseOnDevice(imageUri): DiagnosisResultDTO\n+stripMetadata(imageUri): string"]
            I12["«interface» IMapService\n+getMapTiles(zone: ZoneDTO): MapTilesDTO\n+getClusterData(zone, layer): MapClusterDTO[]"]
            I13["«interface» IDataExportService\n+exportAll(): void\n+deleteAll(): void\n+deleteCategory(cat: DataCategory): void"]
            I14["«interface» ICrashlyticsService\n+recordError(error): void\n+setContext(key, value): void"]
            I15["«interface» ITipArticleService\n+getById(articleId): TipArticleDTO\n+getByContext(method, tag): TipArticleDTO[]\n+cacheAll(): void\n+markRead(articleId): void"]
        end
    end

%% ─────────────────────────────────────────────────────────────────────────────
%% APP SHELL
%% Bootstrap · Routing · Session · Connectivity · Accessibility · Locale
%% ─────────────────────────────────────────────────────────────────────────────

    subgraph AS["📦 AppShell — Bootstrap · Routing · Session · Connectivity"]
        direction TB
        AS1["AppBootstrapper\n+boot(): void\n+resolveFirstRoute(): Route\n— reads SessionDTO\n— routes to Dashboard or Onboarding"]
        AS2["AppRouter\n+navigateTo(route): void\n+resolveDeepLink(url): Route\n+resolveTabRoute(tab): Route\n+goBack(): void"]
        AS3["SessionManager\n+getSession(): SessionDTO\n+markOnboardingComplete(): void\n+checkLapse(): boolean\n+persistSession(s: SessionDTO): void"]
        AS4["UserPreferencesStore\n+get(): UserPreferencesDTO\n+save(prefs: UserPreferencesDTO): void\n— single source of truth for user prefs"]
        AS5["LocaleDetector\n+detectUnitSystem(): UnitSystem\n+detectLanguage(): Language\n+detectTimezone(): string"]
        AS6["ConnectivityMonitor\n+isOnline(): boolean\n+onStatusChange(cb): void\n— triggers offline banner when false"]
        AS7["AccessibilityStore\n+get(): AccessibilityDTO\n+save(a: AccessibilityDTO): void"]
    end

%% ─────────────────────────────────────────────────────────────────────────────
%% ONBOARDING
%% First-launch flow only. Self-contained. Hands off to AppShell on complete.
%% ─────────────────────────────────────────────────────────────────────────────

    subgraph ONB["📦 Onboarding — First-Launch Flow  ONB-1 → ONB-4"]
        direction TB
        ONB1["OnboardingCoordinator\n+start(): void\n+advance(step: OnboardingStep): void\n+skip(step: OnboardingStep): void\n+complete(): void\n— orchestrates steps 1-3\n— calls SessionManager.markOnboardingComplete()"]
        ONB2["SplashScreen  [ONB-1]\n+render(): void\n— logo + tagline + loading pulse\n— no ads, no sign-in, no permissions"]
        ONB3["MethodSelectionScreen  [ONB-2]\n+render(methods: GrowingMethod[]): void\n+onSelect(m: GrowingMethod): void\n— single-select, enables Next button\n— triggers PermissionContextModal (location)"]
        ONB4["AddFirstPlantScreen  [ONB-3]\n+render(suggestions: PlantDTO[]): void\n+onConfirm(p: PlantDTO): void\n— search + browse + camera scan\n— triggers PermissionContextModal (camera)"]
        ONB5["CarePlanPreviewScreen  [ONB-4]\n+render(plan: CarePlanDTO, w: WeatherDTO): void\n+onStart(): void\n— shows personalised plan + health baseline\n— triggers PermissionContextModal (notifications)"]
    end

%% ─────────────────────────────────────────────────────────────────────────────
%% HOME
%% Dashboard only. Single screen — has enough complexity to warrant own package.
%% ─────────────────────────────────────────────────────────────────────────────

    subgraph HM["📦 Home — Dashboard  SCR-01"]
        direction TB
        HM1["DashboardScreen  [SCR-01]\n+render(tasks: TaskDTO[], weather: WeatherDTO,\n  score: HealthScoreDTO, plants: PlantDTO[]): void\n— today's tasks · weather widget\n— health score card · my plants row\n— contextual tip card · bloom report banner\n— comeback bonus banner (on lapse)\n— native ad slot · quick log FAB"]
        HM2["BloomReportBuilder\n+build(logs: LogEntryDTO[],\n  weather: WeatherDTO,\n  range: DateRangeDTO): BloomReportDTO\n— assembles weekly stats · best plant\n— weather correlation · next week tip\n— conditional cemetery alert"]
        HM3["ComebackBonusDetector\n+shouldShow(session: SessionDTO,\n  logs: LogEntryDTO[]): boolean\n+build(plants: PlantDTO[]): ComebackBannerDTO\n— checks lapse via SessionManager\n— picks most-at-risk plant"]
    end

%% ─────────────────────────────────────────────────────────────────────────────
%% GARDEN
%% Single source of truth for all plant data.
%% Plants · Logs · Health Score · Cross-Method Insights · Reels · Batch
%% ─────────────────────────────────────────────────────────────────────────────

    subgraph GD["📦 Garden — Plants · Logs · Health · Reels  SCR-02, 03, 15"]
        direction TB

        subgraph GD_SVC["Domain Services"]
            GD1["PlantRepository  «impl IPlantRepository»\n+getAll(): PlantDTO[]\n+getById(id): PlantDTO\n+save(p: PlantDTO): void\n+archive(id): void\n+restore(id): void\n+delete(id): void"]
            GD2["LogRepository  «impl ILogRepository»\n+getByPlantId(id): LogEntryDTO[]\n+save(e: LogEntryDTO): void\n+getRecent(n): LogEntryDTO[]\n+getByDateRange(from, to): LogEntryDTO[]"]
            GD3["HealthScoreEngine\n+computeOverall(logs: LogEntryDTO[]): HealthScoreDTO\n+computePerPlant(plantId, logs): HealthScoreDTO\n+getWeakMetrics(score): string[]\n— 8 metrics: moisture · light · pH\ngrowth · nutrients · pest · temp · humidity"]
            GD4["CrossMethodInsightEngine\n+detect(plants: PlantDTO[]): InsightDTO[]\n+compare(a: PlantDTO, b: PlantDTO): InsightDTO\n— fires when same species in 2+ methods"]
            GD5["ReelEngine\n+generate(plantId, from: Date, to: Date,\n  photos: LogEntryDTO[]): ReelDTO\n+validateMinPhotos(photos): boolean\n— min 3 logged photos required\n— on-device compilation only"]
            GD6["BatchActionService\n+waterAll(ids: string[]): LogEntryDTO[]\n+feedAll(ids: string[]): LogEntryDTO[]\n+archiveAll(ids: string[]): void\n— writes one log entry per plant per action"]
        end

        subgraph GD_UI["Screens"]
            GD7["PlantListScreen  [SCR-02]\n+render(plants: PlantDTO[]): void\n+onBatchToggle(): void\n+onAddPlant(): void\n— filter chips · sort · search\n— grid / list toggle\n— swipe actions · multi-zone zones\n— native ad every 10 items"]
            GD8["PlantDetailScreen  [SCR-03]\n+render(plant: PlantDTO,\n  logs: LogEntryDTO[],\n  score: HealthScoreDTO,\n  insight: InsightDTO): void\n— hero photo · action pill row\n— health dial · care tasks\n— log timeline · tip card\n— cross-method insight card\n— notes + voice input"]
            GD9["ReelsGalleryScreen  [SCR-15]\n+render(reels: ReelDTO[]): void\n+onCreate(plantId, from, to): void\n— 2-col grid · filter chips\n— full-screen playback\n— watermark toggle (Supporter only)"]
        end
    end

%% ─────────────────────────────────────────────────────────────────────────────
%% TOOLS
%% All computation isolated here. Pure input → output.
%% Calculator · Diagnostics · Scheduler · QR Scanner
%% ─────────────────────────────────────────────────────────────────────────────

    subgraph TL["📦 Tools — Calculator · Diagnostics · Scheduler · QR  SCR-04 → 07"]
        direction TB

        subgraph TL_SVC["Domain Services"]
            TL1["NutrientCalculatorService\n+calculate(input: CalcInputDTO): RecipeResultDTO\n+saveRecipe(plantId, recipe: RecipeResultDTO): void\n+lookupBrand(code: string): BrandDTO\n+lookupProduct(code: string): ProductDTO\n— method-specific dosing logic\n— pH + EC/PPM target derivation"]
            TL2["DiagnosticsService\n+analyseOnDevice(imageUri): DiagnosisResultDTO\n+stripMetadata(imageUri): string\n+saveToHistory(result: DiagnosisResultDTO): void\n+getHistory(): DiagnosisResultDTO[]\n— delegates vision to IVisionService\n— NEVER uploads image externally"]
            TL3["SchedulerService\n+generateSchedule(plant: PlantDTO,\n  w: WeatherDTO): TaskDTO[]\n+markDone(taskId): void\n+reschedule(taskId, date: Date): void\n+skip(taskId): void\n+addCustomReminder(input: ReminderInputDTO): TaskDTO\n+applyWeatherSync(tasks, w): TaskDTO[]\n+applyTravelMode(tasks, from, to): TaskDTO[]\n— timezone-aware · DST auto-adjust"]
            TL4["QRScannerService\n+decode(imageUri): QRResultDTO\n+lookupProduct(code): ProductDTO\n+lookupBrand(code): BrandDTO\n— checks local brand DB via ILocalCache"]
        end

        subgraph TL_UI["Screens"]
            TL5["ToolsHubScreen  [SCR-04]\n+render(recentTool: string): void\n— 4 tool cards: Calculator\nDiagnostics · Scheduler · QR\n— recently used section\n— native ad between rows"]
            TL6["CalculatorScreen  [SCR-05]\n+render(brands: string[],\n  method: GrowingMethod): void\n+onGenerate(input: CalcInputDTO): void\n— triggers InterstitialAd on Generate\n— results card + save + schedule link\n— metric/imperial toggle"]
            TL7["DiagnosticsScreen  [SCR-06]\n+render(history: DiagnosisResultDTO[]): void\n+onCapture(imageUri: string): void\n— permission gate on entry\n— on-device scan animation\n— privacy badge: no upload\n— filterable history"]
            TL8["SchedulerScreen  [SCR-07]\n+render(tasks: TaskDTO[],\n  controls: SmartControlsDTO): void\n— week / month calendar toggle\n— task list panel · smart controls\n— add custom reminder form\n— sunrise/sunset times"]
        end
    end

%% ─────────────────────────────────────────────────────────────────────────────
%% COMMUNITY
%% All data anonymised before leaving this package.
%% Clusters · Posts · Comments · Swaps · Map · Challenges · Referrals
%% ─────────────────────────────────────────────────────────────────────────────

    subgraph CM["📦 Community — Clusters · Map · Challenges · Referrals  SCR-08 → 10"]
        direction TB

        subgraph CM_SVC["Domain Services"]
            CM1["ClusterRepository\n+getNearby(zone: ZoneDTO,\n  method: GrowingMethod): ClusterDTO[]\n+getJoined(): ClusterDTO[]\n+join(clusterId): void\n+leave(clusterId): void\n+search(query): ClusterDTO[]"]
            CM2["PostRepository\n+getByCluster(clusterId): PostDTO[]\n+submit(post: PostDTO): void\n+like(postId): void\n+report(postId): void"]
            CM3["CommentRepository\n+getByPost(postId): CommentDTO[]\n+submit(c: CommentDTO): void"]
            CM4["SwapRepository\n+getByCluster(clusterId): SwapDTO[]\n+expressInterest(swapId): void"]
            CM5["CommunityAggregateService\n+getLocalStats(zone: ZoneDTO): ZoneStatsDTO\n+getMapClusters(zone, layer: MapLayer): MapClusterDTO[]\n+getActiveChallenges(): ChallengeDTO[]\n+getPastChallenges(): ChallengeDTO[]"]
            CM6["AnonymisationFilter\n+anonymisePost(post: PostDTO): PostDTO\n+anonymiseMember(raw): MemberDTO\n+coarsenLocation(zone: ZoneDTO): ZoneDTO\n— strips PII before any data leaves package"]
            CM7["ReferralService\n+getProgress(): ReferralProgressDTO\n+generateLink(): string\n+checkAndUnlock(): boolean\n— 3 referrals → Multi-Zone Management"]
        end

        subgraph CM_UI["Screens"]
            CM8["CommunityHubScreen  [SCR-08]\n+render(stats: ZoneStatsDTO,\n  challenges: ChallengeDTO[]): void\n— Local · Clusters · Challenges tabs\n— referral banner · geo-targeted native ad"]
            CM9["ClusterDetailScreen  [SCR-09]\n+render(cluster: ClusterDTO,\n  posts: PostDTO[]): void\n— Posts · Members · Swaps · Challenges tabs\n— post compose FAB\n— full-screen photo viewer"]
            CM10["LocalGrowMapScreen  [SCR-10]\n+render(clusters: MapClusterDTO[],\n  zone: ZoneDTO): void\n— interactive map · layer toggle\n— crop filter chips · cluster popup\n— stats strip · privacy footer"]
        end
    end

%% ─────────────────────────────────────────────────────────────────────────────
%% PROFILE
%% Badges · Streaks · Skills · Settings · Privacy · Cemetery · Creator Studio
%% ─────────────────────────────────────────────────────────────────────────────

    subgraph PR["📦 Profile — Badges · Settings · Privacy · Cemetery · Creator  SCR-11 → 14, 16"]
        direction TB

        subgraph PR_SVC["Domain Services"]
            PR1["BadgeEngine\n+computeEarned(logs: LogEntryDTO[],\n  streak: StreakDTO): BadgeDTO[]\n+getLocked(): BadgeDTO[]\n— types: Hydro Master · Balcony Boss\nZero-Waste Gardener · Streak badges"]
            PR2["StreakTracker\n+getCurrent(logs: LogEntryDTO[]): StreakDTO\n+getHeatmap(logs, days): HeatmapDayDTO[]\n— consecutive-day logging counter"]
            PR3["ConfidenceScoreEngine\n+computeSkills(logs: LogEntryDTO[]): SkillDTO[]\n— 15 method-agnostic skills\n— increments on matching log activity"]
            PR4["NotificationPrefsStore\n+get(): NotificationPrefsDTO\n+save(prefs: NotificationPrefsDTO): void\n— persists via ILocalCache"]
            PR5["PrivacyDataService  «impl IDataExportService»\n+getInventory(): DataInventoryDTO\n+deleteCategory(cat: DataCategory): void\n+exportAll(): void\n+deleteAll(): void\n+setToggle(toggle, value: boolean): void\n— GDPR Art. 17 + Art. 20 · CCPA"]
            PR6["CemeteryRepository\n+getAll(): CemeteryEntryDTO[]\n+add(e: CemeteryEntryDTO): void\n+update(e: CemeteryEntryDTO): void\n+restore(entryId): void\n+delete(entryId): void\n+detectPatterns(): PatternInsightDTO[]\n— pattern: 2+ plants same cause → insight"]
            PR7["CreatorGuideRepository\n+getDrafts(): GuideDTO[]\n+getPublished(): GuideDTO[]\n+saveDraft(g: GuideDTO): void\n+submit(guideId): void\n+getRevenue(guideId): RevenueDTO\n— moderation: 24-48h review cycle"]
        end

        subgraph PR_UI["Screens"]
            PR8["ProfileScreen  [SCR-11]\n+render(badges: BadgeDTO[],\n  streak: StreakDTO, skills: SkillDTO[],\n  score: HealthScoreDTO,\n  referral: ReferralProgressDTO): void\n— health dial · stats row · badge grid\n— confidence score · streak heatmap\n— referral banner · supporter banner"]
            PR9["SettingsScreen  [SCR-12]\n+render(prefs: UserPreferencesDTO,\n  a11y: AccessibilityDTO,\n  notifPrefs: NotificationPrefsDTO): void\n— 10 setting sections\n— links to Privacy Dashboard + Notif Prefs\n— danger zone: export · delete · sign out"]
            PR10["PrivacyDashboardScreen  [SCR-13]\n+render(inventory: DataInventoryDTO): void\n— data inventory · granular toggles\n— GDPR export · CCPA do-not-sell\n— delete all · pending export status"]
            PR11["CemeteryLogScreen  [SCR-14]\n+render(entries: CemeteryEntryDTO[],\n  pattern: PatternInsightDTO): void\n— cause-of-death selector\n— what-I-learned field + voice input\n— restore to garden · pattern insight card\n— PDF export via rewarded video"]
            PR12["CreatorStudioScreen  [SCR-16]\n+render(drafts: GuideDTO[],\n  published: GuideDTO[]): void\n— rich text editor · cover image\n— preview toggle · save draft\n— submit for review · revenue label\n— access-gated via Settings toggle"]
        end
    end

%% ─────────────────────────────────────────────────────────────────────────────
%% MONETISATION
%% Every ad decision made here and only here.
%% Domain packages never import AdMob or IAP directly.
%% ─────────────────────────────────────────────────────────────────────────────

    subgraph MN["📦 Monetisation — Ads · Rewarded Video · Supporter Badge  MOD-05, 06, 07"]
        direction TB
        MN1["AdOrchestrator\n+canShowInterstitial(): boolean\n+canShowNative(): boolean\n+requestInterstitial(trigger: AdTrigger): void\n+requestNative(slot): NativeAdDTO\n— gate 1: SupporterBadge active? skip interstitial\n— gate 2: onboarding / permission screen? block all ads\n— gate 3: geoFence check before load"]
        MN2["RewardedVideoService\n+request(unlock: UnlockType): void\n+onComplete(cb: Callback): void\n+onDecline(cb: Callback): void\n— always optional, always labelled\n— unlock types: PDF · HD video · compliance log"]
        MN3["SupporterBadgeService  «impl IPurchaseService»\n+purchase(): void\n+restore(): void\n+isActive(): boolean\n+persistStatus(): void\n— $2.99 one-time · no subscription\n— suppresses interstitials permanently\n— enables watermark removal on exports"]
        MN4["InterstitialAdModal  [MOD-06]\n+show(trigger: AdTrigger): void\n+onDismiss(cb: Callback): void\n— triggered only at CalculatorGenerate\n— close button after AdMob min 5s\n— never on onboarding / permissions"]
        MN5["RewardedVideoModal  [MOD-05]\n+show(unlock: UnlockType): void\n+onComplete(cb: Callback): void\n+onDecline(cb: Callback): void\n— full-screen AdMob rewarded unit\n— progress timer · skip after min watch\n— unlock success state auto-dismisses 3s"]
        MN6["SupporterBadgeDialog  [MOD-07]\n+show(): void\n+onPurchase(cb: Callback): void\n+onRestore(cb: Callback): void\n— shows what-you-get vs what-stays\n— native IAP flow · restore purchase"]
    end

%% ─────────────────────────────────────────────────────────────────────────────
%% SHARED MODALS
%% Stateless cross-domain overlays.
%% They receive DTOs, fire callbacks, own zero domain logic.
%% ─────────────────────────────────────────────────────────────────────────────

    subgraph SM["📦 SharedModals — Cross-Domain Overlays  MOD-01, 02, 03, 04, 08, 09, 10, 11, 12"]
        direction TB
        SM1["QuickLogSheet  [MOD-01]\n+open(plantId?: string): void\n+onSubmit(cb: LogEntryDTO): void\n— plant selector · photo · activity chips\n— mood slider · notes + voice\n— location tag · add-to-reel toggle\n— optional metrics (pH · EC · moisture · temp)\n— camera / mic → PermissionContextModal"]
        SM2["AddEditPlantSheet  [MOD-02]\n+open(plant?: PlantDTO): void\n+onSave(cb: PlantDTO): void\n— name search + autocomplete (3000+ species)\n— scan to identify → PermissionContextModal\n— browse by type · photo · nickname\n— method · container size · zone · dates\n— reminders toggle"]
        SM3["QRScannerOverlay  [MOD-03]\n+open(context: ScanContext): void\n+onDetect(cb: QRResultDTO): void\n— full-screen camera · animated scan frame\n— flash toggle · manual entry fallback\n— success card: Fill Calculator or Log Scan\n— camera → PermissionContextModal"]
        SM4["PermissionContextModal  [MOD-04]\n+request(type: PermissionType): void\n+onGrant(cb: Callback): void\n+onDecline(cb: Callback): void\n— contextual illustration + benefit text\n— privacy reassurance label\n— Allow button → OS dialog\n— Not Now → graceful degrade\n— denied state: Open Settings + fallback\n— NEVER shown over another permission"]
        SM5["BatchModeOverlay  [MOD-08]\n+activate(plants: PlantDTO[]): void\n+onAction(cb: BatchActionDTO): void\n— transforms plant list to multi-select\n— Water All · Feed All · Log Entry · Archive\n— confirmation dialog before execute"]
        SM6["TipArticleReaderSheet  [MOD-09]\n+open(articleId: string): void\n— bottom sheet 50% → full screen\n— offline-cached content only\n— no external webviews · no auto-play\n— native ad mid-article\n— bookmark · share · mark as read\n— 2 related articles at bottom"]
        SM7["NotificationPrefsSheet  [MOD-10]\n+open(prefs: NotificationPrefsDTO): void\n+onSave(cb: NotificationPrefsDTO): void\n— master toggle · 6 category toggles\n— timing slot · skip weekends\n— travel mode + date range picker"]
        SM8["WeeklyBloomReportSheet  [MOD-11]\n+open(report: BloomReportDTO): void\n— stats row · best plant spotlight\n— weather correlation · cemetery alert\n— next week tip · share · view garden"]
        SM9["ExportShareSheet  [MOD-12]\n+open(content: ExportContentDTO): void\n— pre-share layer: format options\n— PNG always · PDF / video after reward\n— watermark toggle (Supporter only)\n— Continue → native OS share intent\n— checks SupporterBadge for watermark\n— checks isRewardUnlocked for PDF/video"]
    end

%% ─────────────────────────────────────────────────────────────────────────────
%% INFRASTRUCTURE
%% All external service adapters live here and only here.
%% Domain packages depend on SK interfaces, not on these adapters directly.
%% ─────────────────────────────────────────────────────────────────────────────

    subgraph INF["📦 Infrastructure — External Service Adapters"]
        direction TB

        subgraph INF_FB["Firebase"]
            INF1["FirestoreAdapter\n«impl IPlantRepository, ILogRepository»\n+read(col, id): object\n+write(col, doc): void\n+query(col, filters): object[]\n— offline fallback via LocalCacheAdapter"]
            INF2["FirebaseStorageAdapter\n«impl IStorageService»\n+upload(path, file): string\n+delete(path): void"]
            INF3["FirebaseMessagingAdapter\n«impl INotificationService»\n+schedule(task, prefs): void\n+cancel(taskId): void\n+cancelAll(): void\n+reschedule(taskId, date): void\n— timezone-aware · FCM push delivery"]
            INF4["FirebaseAnalyticsAdapter\n«impl IAnalyticsService»\n+logEvent(name, params): void"]
            INF5["FirebaseCrashlyticsAdapter\n«impl ICrashlyticsService»\n+recordError(error): void\n+setContext(key, value): void"]
        end

        subgraph INF_AI["AI / Vision  (on-device only)"]
            INF6["GeminiVisionAdapter\n«impl IVisionService»\n+analyseOnDevice(imageUri): DiagnosisResultDTO\n+stripMetadata(imageUri): string\n— Gemini Vision on-device inference\n— image NEVER leaves the device"]
        end

        subgraph INF_LOC["Location + Maps"]
            INF7["GeolocationAdapter\n«impl ILocationService»\n+requestLocation(): ZoneDTO\n+geocodeZip(zip): ZoneDTO\n+coarsenToZone(): ZoneDTO\n— Google Geolocation API\n— coarsens to zone level for privacy"]
            INF8["GoogleMapsAdapter\n«impl IMapService»\n+getMapTiles(zone: ZoneDTO): MapTilesDTO\n+getClusterData(zone, layer): MapClusterDTO[]\n— Google Maps Platform"]
        end

        subgraph INF_WX["Weather"]
            INF9["OpenWeatherAdapter\n«impl IWeatherService»\n+fetchForecast(zone: ZoneDTO): WeatherDTO\n+getCached(): WeatherDTO\n— OpenWeatherMap One Call API 3.0\n— caches 7-day forecast in LocalCacheAdapter\n— serves cache when offline"]
        end

        subgraph INF_AD["Ads + Purchases"]
            INF10["AdMobAdapter\n«impl IAdService»\n+canShowInterstitial(): boolean\n+loadNative(slot): NativeAdDTO\n+loadRewarded(unlock): void\n+geoFenceCheck(zone, cat): boolean\n— Google AdMob SDK\n— geo-fences restricted ad categories"]
            INF11["InAppPurchaseAdapter\n«impl IPurchaseService»\n+purchase(productId): void\n+restore(): void\n+isActive(): boolean\n— App Store / Google Play Billing"]
        end

        subgraph INF_CA["Local Persistence"]
            INF12["LocalCacheAdapter\n«impl ILocalCache»\n+get(key): unknown\n+set(key, value): void\n+delete(key): void\n+clear(): void\n— AsyncStorage / MMKV\n— offline fallback for weather + Firestore\n— stores: session · prefs · brand DB\n  notif prefs · badge status · tip articles"]
        end

        subgraph INF_TIP["Content"]
            INF13["SmartTipsLibraryAdapter\n«impl ITipArticleService»\n+getById(articleId): TipArticleDTO\n+getByContext(method, tag): TipArticleDTO[]\n+cacheAll(): void\n+markRead(articleId): void\n— offline-first: downloaded on Wi-Fi\n— served from LocalCacheAdapter\n— no external webviews"]
        end
    end

%% ═════════════════════════════════════════════════════════════════════════════
%% DEPENDENCY ARROWS
%%
%% Rules:
%% 1. Solid --> = runtime dependency
%% 2. Dashed -.-> = structural contract (implements interface / type import)
%% 3. Arrows point FROM dependant TO dependency
%% 4. Every label states the DTO or interface type that crosses the boundary
%% 5. No circular dependencies — verified top-to-bottom
%% 6. No domain package imports from another domain package's internals
%% ═════════════════════════════════════════════════════════════════════════════

%% ── AppShell ──────────────────────────────────────────────────────────────
AS -->|"reads/writes SessionDTO\nUserPreferencesDTO\nAccessibilityDTO\nvia ILocalCache"| INF12
AS -->|"ILocationService\n→ ZoneDTO for locale seed"| INF7
AS -->|"IAnalyticsService\nscreen navigation events"| INF4

%% ── Onboarding ────────────────────────────────────────────────────────────
ONB -->|"markOnboardingComplete()\nsave UserPreferencesDTO\n→ SessionManager + UserPreferencesStore"| AS
ONB -->|"save initial PlantDTO\nvia IPlantRepository"| GD
ONB -->|"IWeatherService\n→ WeatherDTO for CarePlanPreview"| INF9
ONB -->|"triggers PermissionContextModal\nPermissionType: Location, Camera, Notifications"| SM

%% ── Home ──────────────────────────────────────────────────────────────────
HM -->|"reads TaskDTO[]\nvia SchedulerService"| TL
HM -->|"reads PlantDTO[] · LogEntryDTO[]\nHealthScoreDTO\nvia IPlantRepository · ILogRepository"| GD
HM -->|"IWeatherService\n→ WeatherDTO"| INF9
HM -->|"reads SessionDTO\nfor lapse / comeback detection"| AS
HM -->|"ITipArticleService\n→ TipArticleDTO (contextual tip card)"| INF13
HM -->|"IAnalyticsService"| INF4

%% ── Garden ────────────────────────────────────────────────────────────────
GD -->|"IPlantRepository · ILogRepository\n→ FirestoreAdapter\nall plant + log persistence"| INF1
GD -->|"IStorageService\n→ plant photos, reel videos"| INF2
GD -->|"IAnalyticsService"| INF4

%% ── Tools ─────────────────────────────────────────────────────────────────
TL -->|"reads PlantDTO[] · LogEntryDTO[]\nvia IPlantRepository · ILogRepository\n(Scheduler reads plants; Calculator saves recipes)"| GD
TL -->|"IVisionService\n→ DiagnosisResultDTO\non-device only"| INF6
TL -->|"IWeatherService\n→ WeatherDTO\n(Scheduler weather sync)"| INF9
TL -->|"INotificationService\n→ TaskDTO + NotificationPrefsDTO\n(Scheduler schedules reminders)"| INF3
TL -->|"ILocalCache\nbrand DB · product DB\ndiagnostics history"| INF12
TL -->|"IAnalyticsService"| INF4

%% ── Community ─────────────────────────────────────────────────────────────
CM -->|"ClusterDTO[] · PostDTO[]\nCommentDTO[] · SwapDTO[]\nvia FirestoreAdapter"| INF1
CM -->|"ILocationService\n→ ZoneDTO (zone-level only)\nno precise GPS shared"| INF7
CM -->|"IMapService\n→ MapClusterDTO[] · MapTilesDTO"| INF8
CM -->|"reads UserPreferencesDTO\nfor method + zone filtering"| AS
CM -->|"IAnalyticsService"| INF4

%% ── Profile ───────────────────────────────────────────────────────────────
PR -->|"reads LogEntryDTO[] · PlantDTO[]\nvia ILogRepository · IPlantRepository\n(BadgeEngine · StreakTracker · ConfidenceScore\nuse historical log data)"| GD
PR -->|"CemeteryEntryDTO[] · GuideDTO[]\nvia FirestoreAdapter"| INF1
PR -->|"IStorageService\n→ avatar photos, guide cover images"| INF2
PR -->|"ILocalCache\nNotificationPrefsDTO · badge status"| INF12
PR -->|"IDataExportService\nGDPR export + CCPA delete\nvia FirestoreAdapter"| INF1
PR -->|"reads/writes UserPreferencesDTO\nvia UserPreferencesStore"| AS
PR -->|"IAnalyticsService"| INF4

%% ── Monetisation ──────────────────────────────────────────────────────────
MN -->|"IAdService\n→ AdMobAdapter"| INF10
MN -->|"IPurchaseService\n→ InAppPurchaseAdapter"| INF11
MN -->|"ILocalCache\npersists SupporterBadge status"| INF12
MN -->|"ILocationService\n→ ZoneDTO for geoFence check"| INF7

%% ── SharedModals ──────────────────────────────────────────────────────────
SM1 -->|"submits LogEntryDTO\nvia ILogRepository"| GD
SM1 -->|"ILocationService\n→ ZoneDTO for location tag"| INF7
SM2 -->|"submits / updates PlantDTO\nvia IPlantRepository"| GD
SM3 -->|"QRResultDTO\nvia QRScannerService"| TL
SM4 -->|"ILocationService (location permission)\nIVisionService (camera permission)\nINotificationService (notif permission)"| INF7
SM5 -->|"BatchActionDTO\nvia BatchActionService"| GD
SM6 -->|"ITipArticleService\n→ TipArticleDTO"| INF13
SM7 -->|"reads/writes NotificationPrefsDTO\nvia NotificationPrefsStore"| PR
SM8 -->|"reads LogEntryDTO[]\nvia ILogRepository\nfor BloomReportBuilder"| GD
SM8 -->|"IWeatherService\n→ WeatherDTO"| INF9
SM9 -->|"checks SupporterBadge.isActive()\n→ watermark toggle visibility"| MN
SM9 -->|"checks RewardedVideoService\n→ isRewardUnlocked for PDF/video"| MN
SM9 -->|"IStorageService\nfor PDF / image export"| INF2

%% ── Infrastructure implements SharedKernel interfaces ─────────────────────
INF1 -.->|"«implements»\nIPlantRepository · ILogRepository"| SK
INF2 -.->|"«implements» IStorageService"| SK
INF3 -.->|"«implements» INotificationService"| SK
INF4 -.->|"«implements» IAnalyticsService"| SK
INF5 -.->|"«implements» ICrashlyticsService"| SK
INF6 -.->|"«implements» IVisionService"| SK
INF7 -.->|"«implements» ILocationService"| SK
INF8 -.->|"«implements» IMapService"| SK
INF9 -.->|"«implements» IWeatherService"| SK
INF10 -.->|"«implements» IAdService"| SK
INF11 -.->|"«implements» IPurchaseService"| SK
INF12 -.->|"«implements» ILocalCache"| SK
INF13 -.->|"«implements» ITipArticleService"| SK

%% ── All packages depend on SharedKernel for DTOs + Enums ──────────────────
AS -.->|"uses DTOs + Enums + Interfaces"| SK
ONB -.->|"uses DTOs + Enums + Interfaces"| SK
HM -.->|"uses DTOs + Enums + Interfaces"| SK
GD -.->|"uses DTOs + Enums + Interfaces"| SK
TL -.->|"uses DTOs + Enums + Interfaces"| SK
CM -.->|"uses DTOs + Enums + Interfaces"| SK
PR -.->|"uses DTOs + Enums + Interfaces"| SK
MN -.->|"uses DTOs + Enums + Interfaces"| SK
SM -.->|"uses DTOs + Enums + Interfaces"| SK
INF -.->|"uses DTOs + Enums"| SK

%% ─────────────────────────────────────────────────────────────────────────────
%% STYLES
%% ─────────────────────────────────────────────────────────────────────────────

    style SK     fill:#12122a,stroke:#5555aa,color:#c8c8ff,stroke-width:2px
    style SK_EN  fill:#0e0e22,stroke:#4444aa,color:#a0a0ee
    style SK_DT  fill:#0e0e22,stroke:#4444aa,color:#a0a0ee
    style SK_DT_PLANT fill:#0a0a1c,stroke:#3333aa,color:#9090dd
    style SK_DT_SCHED fill:#0a0a1c,stroke:#3333aa,color:#9090dd
    style SK_DT_TOOLS fill:#0a0a1c,stroke:#3333aa,color:#9090dd
    style SK_DT_COMM  fill:#0a0a1c,stroke:#3333aa,color:#9090dd
    style SK_DT_PROF  fill:#0a0a1c,stroke:#3333aa,color:#9090dd
    style SK_DT_CEME  fill:#0a0a1c,stroke:#3333aa,color:#9090dd
    style SK_DT_MON   fill:#0a0a1c,stroke:#3333aa,color:#9090dd
    style SK_IF  fill:#0e0e22,stroke:#6666cc,color:#c0c0ff

    style AS  fill:#0a260a,stroke:#2a7a2a,color:#a0ffa0,stroke-width:2px
    style ONB fill:#0a1c2a,stroke:#2a5a8a,color:#a0ceff,stroke-width:2px

    style HM  fill:#1a2a0a,stroke:#5a8a2a,color:#c8ffa0,stroke-width:2px

    style GD      fill:#162808,stroke:#4a8a2a,color:#c0ffa0,stroke-width:2px
    style GD_SVC  fill:#101e05,stroke:#3a7a1a,color:#b0ee90
    style GD_UI   fill:#101e05,stroke:#3a7a1a,color:#b0ee90

    style TL      fill:#281808,stroke:#8a5a2a,color:#ffd0a0,stroke-width:2px
    style TL_SVC  fill:#1e1005,stroke:#7a4a1a,color:#eec090
    style TL_UI   fill:#1e1005,stroke:#7a4a1a,color:#eec090

    style CM      fill:#081528,stroke:#2a5a8a,color:#a0c0ff,stroke-width:2px
    style CM_SVC  fill:#050e1e,stroke:#1a4a7a,color:#90b0ee
    style CM_UI   fill:#050e1e,stroke:#1a4a7a,color:#90b0ee

    style PR      fill:#280828,stroke:#8a2a8a,color:#ffa0ff,stroke-width:2px
    style PR_SVC  fill:#1e051e,stroke:#7a1a7a,color:#ee90ee
    style PR_UI   fill:#1e051e,stroke:#7a1a7a,color:#ee90ee

    style MN  fill:#281808,stroke:#cc7a00,color:#ffd080,stroke-width:2px

    style SM  fill:#181818,stroke:#585858,color:#e0e0e0,stroke-width:2px

    style INF     fill:#280808,stroke:#8a2a2a,color:#ffa0a0,stroke-width:2px
    style INF_FB  fill:#1e0505,stroke:#7a1a1a,color:#ee9090
    style INF_AI  fill:#1e0505,stroke:#7a1a1a,color:#ee9090
    style INF_LOC fill:#1e0505,stroke:#7a1a1a,color:#ee9090
    style INF_WX  fill:#1e0505,stroke:#7a1a1a,color:#ee9090
    style INF_AD  fill:#1e0505,stroke:#7a1a1a,color:#ee9090
    style INF_CA  fill:#1e0505,stroke:#7a1a1a,color:#ee9090
    style INF_TIP fill:#1e0505,stroke:#7a1a1a,color:#ee9090
