# GardenPulse — Screen Elements Reference

Every screen, modal, sheet, and overlay — with all UI components documented.

**Format key:** `Button` · `Field` · `Toggle` · `Card` · `Selector` · `Icon` · `Label` · `Banner` · `FAB`

---

## Table of Contents

- [Onboarding (ONB-1 → ONB-4)](#onboarding)
- [Home Tab (SCR-01)](#home-tab)
- [Garden Tab (SCR-02 → SCR-03, SCR-15)](#garden-tab)
- [Tools Tab (SCR-04 → SCR-07)](#tools-tab)
- [Community Tab (SCR-08 → SCR-10)](#community-tab)
- [Profile Tab (SCR-11 → SCR-14, SCR-16)](#profile-tab)
- [Modals · Sheets · Overlays (MOD-01 → MOD-12)](#modals--sheets--overlays)

---

## ONBOARDING

---

### ONB-1 · Splash Screen

**Access:** App first launch
**Purpose:** Brand entry, initialization

**Elements**

- App logo (animated leaf unfurl)
- App name "GardenPulse" wordmark
- Tagline label: "Grow Smarter, Anywhere."
- Animated loading indicator (subtle pulse)

---

### ONB-2 · Welcome + Method Selection

**Access:** After ONB-1
**Purpose:** Establish growing method so the entire app adapts (Step 1 of 3)

**Header**

- Progress indicator (Step 1 of 3)
- `Skip for now` text link (top-right, light weight)

**Main Content**

- Heading: "How do you grow?"
- Sub-label: "Pick your primary method — you can mix later"
- 4 selectable method cards (single-select, tap to highlight):
  - **Soil / Raised Bed** — icon + name + one-line description
  - **Container / Balcony** — icon + name + one-line description
  - **Hydroponic** — icon + name + one-line description
  - **Indoor Plants** — icon + name + one-line description
- Each card: icon, method name, brief description, selection ring on tap

**Actions**

- `Next →` primary CTA button (enabled only after a method is selected)
- `Skip for now` text link (below CTA)

**Modal Triggered**

- MOD-04 Permission Context Modal (location) — fires after `Next →` tap, before advancing to ONB-3; explains why location improves care recommendations before OS dialog appears

---

### ONB-3 · Add First Plant

**Access:** After ONB-2 (and after location permission prompt in MOD-04)
**Purpose:** Capture first plant to immediately personalize the app (Step 2 of 3)

**Header**

- Progress indicator (Step 2 of 3)
- Back arrow (← to ONB-2)

**Main Content**

- Heading: "Add your first plant"
- Plant name search field + autocomplete dropdown (plant database)
- ` Scan a leaf or seed packet` camera button → triggers MOD-04 (camera permission pre-prompt) if camera not yet granted, then opens inline camera for on-device plant ID
- OR divider
- Browse by category: grid of plant type chips (Herb · Vegetable · Fruit · Flower · Houseplant · Microgreen)
- Selected plant preview card: photo thumbnail, common name, scientific name, method compatibility badge
- Plant nickname field (optional, character limit 30)
- Growing method selector pills (pre-filled from ONB-2, editable): Soil · Container · Hydro · Indoor
- Location / zone display label: auto-detected zone badge (e.g., "Zone 7b · Berlin") or "Enter location manually" link (shown if location was declined in ONB-2)
- Started date picker (optional, defaults to today)

**Actions**

- `Continue →` primary CTA button
- `Skip for now` text link (below CTA, goes directly to ONB-4 with a blank garden state)

**Note:** Camera scan in this screen triggers MOD-04 (camera permission) inline — it does not open MOD-02 Add / Edit Plant Sheet. ONB-3 itself is the plant-add flow for onboarding.

---

### ONB-4 · Instant Care Plan Preview

**Access:** After ONB-3
**Purpose:** Show immediate value — user sees their personalised plan before entering the main app (Step 3 of 3)

**Header**

- Progress indicator (Step 3 of 3)
- Back arrow (← to ONB-3)

**Main Content**

- Success heading: "Your care plan is ready!"
- Location + weather context card: city name, zone badge, current temp, humidity, forecast icon (pulls from OpenWeatherMap; shows "Add location for weather tips" CTA if location was declined)
- First plant care summary card:
  - Watering frequency label (e.g., "Every 2 days")
  - Light requirement badge (e.g., "Bright indirect")
  - Next action chip (e.g., "Water today")
  - Growing method tag
- Garden Health Score™ baseline card: circular score (initial 50/100), label "We'll track your progress from here"
- Notification opt-in row: bell icon + "Get reminders for your [plant name]" + `Enable` toggle

**Actions**

- `Start Growing ` primary CTA button → enters main app at SCR-01 Dashboard
- `Remind me later` text link (below CTA, skips notification permission)

**Modal Triggered**

- MOD-04 Permission Context Modal (notifications) — fires on `Enable` toggle tap, before OS notification dialog

---

## HOME TAB

---

### SCR-01 · Dashboard / Home

**Tab:** Home (Tab 1)
**Purpose:** Daily hub — tasks, weather, garden health at a glance, quick logging entry point

**Header / AppBar**

- GardenPulse logo (left)
- Notification bell icon (right, badge count if unread)
- Settings icon (right of bell, links to SCR-12)

**Main Content (scrollable feed)**

1. **Location + Weather Widget**
   - City name + zone badge (e.g., "Berlin · Zone 7b")
   - Current temperature, humidity %, UV index, rain chance
   - Forecast strip: next 3 days (icon + high/low temp)
   - Smart alert label (conditional, e.g., "Rain tomorrow → skip watering today")
   - Pull-to-refresh zone (refreshes weather from OpenWeatherMap; uses cached 7-day forecast between refreshes to reduce API calls)

2. **Comeback Bonus Banner** (conditional — shown only when user returns after a lapse)
   - Animated welcome-back illustration
   - "Welcome back! Your [plant name] missed you " label
   - `See What Needs Attention →` button → SCR-02 Plant List, sorted by last-logged date

3. **Today's Tasks Section**
   - Section heading: "Today in Your Garden"
   - Horizontal scrollable task cards, per plant:
     - Plant thumbnail + name
     - Task type chip (Water / Feed / Prune / Check / Harvest)
     - `Done ` button (tap to complete)
   - "All done today!" celebration state (animated confetti, hidden by default)
   - "See full schedule →" link (→ SCR-07 Smart Scheduler)

4. **Garden Health Score™ Card**
   - Circular score dial (0–100) with colour zone (red / amber / green)
   - 3 top metric labels (e.g., Moisture · Light · pH)
   - `View Details →` link (→ SCR-11 Profile & Badges)

5. **My Plants Row**
   - Section heading: "My Garden" + `See All →` link (→ SCR-02)
   - Horizontal scroll: plant thumbnail cards
     - Plant photo, plant name, health dot indicator (green / amber / red)
     - Tap → SCR-03 Plant Detail

6. **Contextual Tip Card** (styled as native ad content card)
   - " From your garden expert" header label
   - Article title + method tag
   - Estimated read time label
   - Tap → MOD-09 Tip Article Reader Sheet

7. **Weekly Bloom Report Banner** (conditional — shown Monday mornings, or after returning from lapse)
   - "Your weekly report is ready " label
   - `View Report` button → MOD-11 Weekly Bloom Report Sheet

8. **Native Ad Slot** (between sections, styled as a content card — not on permission or error states)

**Actions / FAB**

- `+` FAB (floating action button, bottom-right, always visible) → MOD-01 Quick Log Sheet

**Bottom Bar**

- Bottom navigation bar (5 tabs, Home tab active)

---

## GARDEN TAB

---

### SCR-02 · Plant List

**Tab:** Garden (Tab 2)
**Purpose:** All plants at a glance; entry point to per-plant management

**Header / AppBar**

- "My Garden" title
- Filter / sort icon (sort by: name / health / method / last logged)
- `+` Add Plant icon button (top-right) → MOD-02 Add / Edit Plant Sheet

**Filters**

- Growing method filter chips (horizontal scroll): All · Soil · Container · Hydro · Indoor
- Search field: "Search your plants…" (filters list inline)
- Grid / List view toggle icon

**Main Content**

- Plant cards (grid 2-col or list, depending on toggle):
  - Plant photo thumbnail
  - Plant name (common + nickname)
  - Method badge chip (Soil / Container / Hydro / Indoor)
  - Health dot indicator (colour-coded: green / amber / red)
  - "Last logged X days ago" label
  - Swipe-left actions: Archive (with confirm dialog) · Quick Log
- Empty state: illustrated pot graphic + "No plants yet" heading + `Add Your First Plant` button → MOD-02
- Native ad card (approx. every 10 items in list)

**Multi-Zone Management Unlocked State** (visible only after referral unlock)

- Zone group headers above plant cards: "Windowsill" · "Balcony" · "Hydro Tent" etc.
- Plants grouped under their assigned zone; zone header is collapsible

**Batch Mode** (activates via header toggle → MOD-08)

- Multi-select checkboxes on all plant cards
- `Select All` button (replaces header sort icon)
- Batch action bar at bottom: `Water All` · `Feed All` · `Log Entry` · `Archive`

**Actions / FAB**

- `+` FAB (bottom-right) → MOD-01 Quick Log Sheet

**Modals Triggered**

- MOD-02 Add / Edit Plant Sheet (via `+` header button)
- MOD-08 Batch Mode Overlay (via batch toggle)
- MOD-01 Quick Log Sheet (via FAB or swipe action)

**Bottom Bar**

- Bottom navigation bar (Garden tab active)

---

### SCR-03 · Plant Detail

**Tab:** Garden (Tab 2, child of SCR-02)
**Purpose:** Full per-plant management — logs, health, care, diagnostics, sharing

**Header / AppBar**

- Back arrow (← to SCR-02)
- Plant name (title)
- `⋮` overflow menu: Edit Plant · Archive to Cemetery · Delete

**Hero Area**

- Full-width plant photo (tappable → SCR-15 Progress Reels Gallery)
- Photo count badge (e.g., "12 photos")
- ` Add Photo` button overlay

**Action Pill Row** (horizontal, always visible below hero)

- ` Log` → MOD-01 Quick Log Sheet
- ` Diagnose` → SCR-06 Leaf Diagnostics
- ` Share` → MOD-12 Export / Share Sheet
- ` Archive` → SCR-14 Cemetery Log (with confirm dialog)

**Plant Info Card**

- Species name + common name
- Method badge (Soil / Container / Hydro / Indoor)
- Growing stage chip (Seedling · Veg · Bloom · Fruiting · Dormant)
- Date added label
- Location / zone tag (auto-detected from device, zone-level only)
- Container size (conditional — shown if Container method selected)
- `Edit` icon → MOD-02 Add / Edit Plant Sheet (pre-filled with existing data)

**Health Section**

- Garden Health Score™ mini-dial (this plant's individual score)
- 8-metric breakdown (expandable row): Moisture · Light · pH · Growth Rate · Nutrient Level · Pest Risk · Temperature · Humidity
- `View Full Insights →` expands inline chart

**Weather Impact Banner** (conditional — shown when weather affects this plant's care)

- Smart alert chip, e.g., " Rain in 2 days → skip next watering"

**Today's Care Section**

- Task cards with ` Done` checkbox: Water · Feed · Prune · Check
- Reschedule link per task
- "View full schedule →" link → SCR-07 Smart Scheduler

**Cross-Method Insight Card** (conditional — shown when user grows same plant in multiple methods)

- e.g., "Your hydro basil grew 20% faster → try adjusting nutrients for soil batch"

**Log History Timeline**

- Vertical timeline entries:
  - Entry thumbnail (photo), timestamp, activity type chip, metric values logged
  - Tap entry → expand detail (full photo, notes, voice note playback)
- `Load more` button (pagination)

**Contextual Tip Card**

- Inline article suggestion based on last logged activity (e.g., yellow leaves logged → "Magnesium Deficiency Guide")
- Tap → MOD-09 Tip Article Reader Sheet

**Notes Field**

- Freeform text area "Quick note…"
- `` Mic icon (voice input) → triggers MOD-04 Permission Context Modal (mic) if microphone not yet granted, then starts recording; shows recording indicator and easy delete option after grant

**Actions / FAB**

- ` Log` FAB (bottom-right, always visible) → MOD-01 Quick Log Sheet

**Modals Triggered**

- MOD-01 Quick Log Sheet
- MOD-02 Add / Edit Plant Sheet (via Edit)
- MOD-04 Permission Context Modal (mic — only on first mic icon tap if permission not granted)
- MOD-09 Tip Article Reader Sheet
- MOD-12 Export / Share Sheet

**Bottom Bar**

- Bottom navigation bar (Garden tab active)

---

### SCR-15 · Progress Reels Gallery

**Tab:** Garden (child of SCR-03) + Profile (child of SCR-11)
**Purpose:** View, generate, and share growth timelapses and before/after reels

**Header / AppBar**

- Back arrow
- "My Reels" title
- `+ Create` button (top-right)

**Filter Bar**

- Filter chips: All · By Plant · By Method · By Date

**Main Content**

- Grid of reel cards (2-col):
  - Video thumbnail with play icon overlay
  - Plant name label
  - Date range label (e.g., "Mar–May 2026")
  - Duration label (e.g., "0:18")
  - Share icon button (bottom-right of card) → MOD-12 Export / Share Sheet

**Reel Playback Screen** (on tap of any card, full-screen view):

- Video player (auto-play, muted by default)
- Method-specific data overlay (method badge, key metrics logged during that period)
- GardenPulse watermark (removable for Supporter Badge holders via MOD-07)
- `Share` button → MOD-12 Export / Share Sheet
- `Download` button → MOD-05 Rewarded Video Prompt
- `Edit` button: trim date range, toggle method-specific overlay on/off
- Close (×) button

**Generate Reel Flow** (on `+ Create` tap):

- Step 1: Plant selector (your plants list)
- Step 2: Date range picker (start date – end date)
- Step 3: Preview strip (photo thumbnails in sequence, sourced from logged photos)
- Step 4: Overlay style selector (method-specific overlays with key metric data — no music; no external media)
- `Generate Reel` button → loading animation → result card added to grid

**Empty State**

- Illustration: film strip with sprout
- "No reels yet" heading
- "Your first reel needs at least 3 logged photos" sub-label
- `Go to My Garden →` CTA button → SCR-02 Plant List

**Modals Triggered**

- MOD-05 Rewarded Video Prompt (on Download)
- MOD-12 Export / Share Sheet (on Share)

---

## TOOLS TAB

---

### SCR-04 · Tools Hub

**Tab:** Tools (Tab 3)
**Purpose:** Entry point to all productivity tools

**Header / AppBar**

- "Tools" title
- Search icon (filters tool cards inline by name)

**Main Content**

- "Recently Used" section (conditional — visible after first tool use):
  - Last-used tool card (icon + name + "Open again →" link)
- Tool cards grid (2-col):
  1. **Nutrient / Recipe Calculator** — beaker icon, "Get exact doses for any brand" sub-label → SCR-05
  2. **Leaf Diagnostics** — leaf-scan icon, "On-device AI — no cloud upload" sub-label → SCR-06
  3. **Smart Scheduler** — calendar icon, "Your 7-day weather-aware plan" sub-label → SCR-07
  4. **QR / Label Scanner** — QR code icon, "Scan nutrient bottles, seeds, sensors" sub-label → MOD-03
- Each tool card: icon, title, one-line description, `Open →` chevron

**Native Ad Slot** (between tool card rows 1 and 2)

**Bottom Bar**

- Bottom navigation bar (Tools tab active)

---

### SCR-05 · Nutrient / Recipe Calculator

**Tab:** Tools (child of SCR-04)
**Purpose:** Precise nutrient dosing for any brand, growing method, and growth stage

**Header / AppBar**

- Back arrow (← to SCR-04)
- "Recipe Calculator" title
- `ℹ` info icon (tooltip: "All calculations are method-specific estimates")

**Input Form**

- **Method selector** pills (required): Soil Drench · Hydro Reservoir · Foliar Spray
- **Nutrient brand selector** dropdown / search field: brand name autocomplete; `Scan label →` button → MOD-03 QR Scanner Overlay
- **Water volume input**: number field + unit toggle (L / gal)
- **Growth stage selector** pills: Seedling · Veg / Grow · Bloom / Flower · Flush / Ripening

**Action**

- `Generate Recipe` primary CTA button → triggers MOD-06 Interstitial Ad (1.5 s loading animation during calculation), then displays Results Card

**Results Card** (appears below CTA after calculation completes)

- Per-nutrient rows: nutrient name · dose amount · unit · colour-coded severity indicator
- pH target range band (visual slider)
- EC / PPM target label
- Warnings / notes label (e.g., "Reduce by 25% for seedlings")
- `Save Recipe` button (logs to current plant or saves as standalone recipe)
- `Add to Schedule →` link → SCR-07 Smart Scheduler
- `Export / Share` button → MOD-05 Rewarded Video Prompt (for PDF export), then MOD-12 Export / Share Sheet

**Unit Toggle** (persistent, bottom of results card): Metric · Imperial

**Contextual Tip Link** (below results card, conditional)

- "While calculating, read: [related article title]" → MOD-09 Tip Article Reader Sheet

**Modals Triggered**

- MOD-03 QR Scanner Overlay (via "Scan label" button)
- MOD-06 Interstitial Ad (on `Generate Recipe` tap)
- MOD-05 Rewarded Video Prompt (on `Export PDF`)
- MOD-09 Tip Article Reader Sheet (via contextual tip link)
- MOD-12 Export / Share Sheet (after rewarded video)

**Bottom Bar**

- Bottom navigation bar (Tools tab active)

---

### SCR-06 · Leaf Diagnostics

**Tab:** Tools (child of SCR-04) + accessible from SCR-03 Plant Detail action pill row
**Purpose:** On-device AI plant ID, issue detection, and guided fix suggestions — no cloud upload

**Permission Gate**

- If camera not yet granted: MOD-04 Permission Context Modal (camera) fires before camera UI is shown; explains on-device privacy promise before OS dialog

**Header / AppBar**

- Back arrow
- "Leaf Diagnostics" title
- `History` icon (top-right) → scrolls down to Past Diagnoses section

**Camera Area** (shown after camera permission granted)

- Full-card camera viewfinder
- Alignment overlay: leaf-shaped guide frame with animated pulse border
- "Centre the leaf in frame" instruction label
- ` Capture` button (large circle, bottom-centre)
- ` Choose from Gallery` link (import existing photo as fallback — no cloud upload; analysis still on-device)
- Flash toggle icon (top-right of viewfinder)

**Scanning State** (post-capture, while AI processes on-device)

- Full-screen loading overlay: "Analysing on-device…" label + animated scan line
- Privacy badge: "Your photo never leaves your device"

**Results Card** (replaces camera area after analysis completes)

- Plant name identified (common + scientific name) + confidence % badge
- Method detected label (e.g., "Hydroponic — confirmed")
- Primary issue card:
  - Issue name (e.g., "Magnesium Deficiency")
  - Confidence % badge
  - Severity indicator chip: Low · Medium · High (colour-coded)
  - Brief explanation label (2 lines)
- Secondary issues list (collapsed by default, expandable): additional findings
- Suggested actions list (numbered steps)
- Contextual tip link: "Read: [related article title]" → MOD-09 Tip Article Reader Sheet
- `Log This Diagnosis` button → creates a log entry linked to the relevant plant in SCR-03
- `Try Again / Retake` button
- ` Share Results` button → MOD-12 Export / Share Sheet

**Past Diagnoses Section** (below results card, or on `History` icon tap)

- Vertical list: date, thumbnail, plant name, finding label, severity badge
- Filter chips: All · Deficiency · Pest · Disease · Overwatering

**Permission Denied State** (shown if user previously denied and has not re-granted)

- Illustration + "Camera access needed" heading
- `Open Settings` button (deep-links to device OS settings)
- `Upload from Gallery` fallback button (analysis still on-device)

**Modals Triggered**

- MOD-04 Permission Context Modal (camera, on entry if not granted)
- MOD-09 Tip Article Reader Sheet (via contextual tip link in results)
- MOD-12 Export / Share Sheet (via Share Results button)

**Bottom Bar**

- Bottom navigation bar (Tools tab active)

---

### SCR-07 · Smart Scheduler

**Tab:** Tools (child of SCR-04)
**Purpose:** Weather-aware, timezone-correct care schedule across all plants

**Header / AppBar**

- Back arrow (← to SCR-04)
- "My Schedule" title
- View toggle: Week · Month (top-right)

**Calendar View**

- Week strip (default) or monthly grid (on toggle)
- Day cells: coloured dot per task type (blue = water · green = feed · yellow = prune · red = urgent)
- Today's date highlight ring
- Sunrise / Sunset time labels (derived from location data and local timezone)
- Tap a day cell → expands task list panel below

**Task List Panel** (for selected day)

- Per-task rows:
  - Plant thumbnail + plant name
  - Task type chip (Water / Feed / Prune / Check / Harvest)
  - ` Done` checkbox (tap to complete)
  - Swipe-left actions: Reschedule (shows date picker) · Skip
- `Mark All Done` bulk button (day-level)

**Smart Controls Panel**

- ` Weather sync` toggle: "Auto-adjust tasks for rain forecast" — on/off; when on, watering tasks suppressed on rain-forecast days
- ` Skip weekends` toggle
- ` Travel Mode` toggle + date range picker (start → end date, pauses all reminders during range)
- "I prefer reminders in the:" radio selector: Morning (7–9 AM) · Afternoon (12–2 PM) · Evening (6–8 PM)

**Add Custom Reminder Section**

- `+ Add Custom Reminder` button → inline form:
  - Plant selector (dropdown from user's garden)
  - Task type selector (Water / Feed / Prune / Check / Harvest / Custom)
  - Repeat selector (Once · Daily · Weekly · Custom interval)
  - Date + time picker (timezone-aware, daylight saving auto-adjusted)

**Quick Links**

- "Notification preferences →" link → MOD-10 Notification Prefs Sheet

**Bottom Bar**

- Bottom navigation bar (Tools tab active)

---

## COMMUNITY TAB

---

### SCR-08 · Community Hub

**Tab:** Community (Tab 4)
**Purpose:** Local insights, clusters, grow challenges, and community activity

**Header / AppBar**

- "Community" title
- Search icon (search clusters / challenges)

**Top Banner**

- Local context card: "What's thriving in [City] right now "
- Anonymous insight label (e.g., "Cherry tomatoes: 87% success rate in Berlin balconies")
- `View Map →` link → SCR-10 Local Grow Map

**Tab Bar** (horizontal, inside screen — 3 tabs):

- **Local** (default)
- **Clusters**
- **Challenges**

**Local Tab Content**

- Success stats cards: plant name · success % · grower count · trending arrow
- "In your zone" filter badge (location-aware, zone-level only)
- `View Full Map →` button → SCR-10 Local Grow Map

**Clusters Tab Content**

- "My Clusters" section: joined cluster cards → SCR-09 Garden Cluster Detail
- "Nearby Clusters" section: suggested clusters (by zone / growing method)
- `+ Join a Cluster` CTA button → cluster search / browse sheet (inline)
- Each cluster card: cluster name, member count, method tag, recent activity indicator, `Join` or `Joined` button

**Challenges Tab Content**

- Current weekly challenge card:
  - Challenge title (e.g., "Best Regrowth from Kitchen Scraps")
  - End date countdown label
  - Entry count label
  - `Submit Entry` button → MOD-01 Quick Log Sheet (photo + caption pre-labelled for challenge)
- Past challenges section: winner spotlight cards (anonymized photo, method badge, prize label, featured user label)

**Referral Banner** (bottom of screen, persistent)

- "Invite 3 friends → unlock Multi-Zone Management"
- Progress indicator: X / 3 friends invited
- `Share Invite Link` button → MOD-12 Export / Share Sheet

**Native Ad Slot** (geo-targeted local nursery / garden centre ad, below Local tab content)

**Bottom Bar**

- Bottom navigation bar (Community tab active)

---

### SCR-09 · Garden Cluster Detail

**Tab:** Community (child of SCR-08)
**Purpose:** Community space for a specific interest- or location-based group

**Header / AppBar**

- Back arrow (← to SCR-08)
- Cluster name (title)
- `⋮` overflow menu: Report Cluster · Share Cluster (→ MOD-12)

**Cluster Info Section**

- Cluster cover image (or default zone-based gradient)
- Member count label · Location or interest tag · Creation date
- Description text (2–3 lines, expandable)
- `Join` / `Leave` toggle button (primary)

**Tab Bar** (inside screen — 4 tabs):

- **Posts** (default)
- **Members**
- **Swaps**
- **Challenges**

**Posts Tab Content**

- Post feed (vertical scroll):
  - Anonymized avatar + username handle
  - Post text (method-tagged)
  - Optional plant photo (tap to expand full-screen)
  - Method badge chip
  - ` Like` button + ` Comment` button (comment count label)
  - ` Save Plant` bookmark icon (saves the plant species to user's plant database for adding later)
  - ` Report` icon (per post, for moderation)
- Full-screen photo viewer (on photo tap): `Log this plant →` CTA → MOD-02 Add / Edit Plant Sheet pre-filled with species
- Comment thread (inline, expandable)

**Members Tab Content**

- List of anonymized member rows: avatar + username + method badges + joined date
- "X members growing Y together" summary label

**Swaps Tab Content**

- Swap listing cards: plant name, type (seed / cutting / tool), "Available in [city]" label, `Express Interest` button

**Challenges Tab Content**

- Active challenge card for this cluster
- `Submit Entry` button → MOD-01 Quick Log Sheet

**FAB**

- ` Post` FAB (bottom-right) → inline compose overlay:
  - Text field: "Share with the cluster…"
  - Camera icon (attach photo) → triggers MOD-04 Permission Context Modal (camera) if not yet granted, then opens camera
  - `@ Tag plants` button (links post to a plant in user's garden)
  - Method selector chip
  - `Post` submit button

**Modals Triggered**

- MOD-01 Quick Log Sheet (via challenge Submit Entry)
- MOD-04 Permission Context Modal (camera, if attaching photo to post and permission not yet granted)
- MOD-12 Export / Share Sheet (via cluster share in overflow menu)

**Bottom Bar**

- Bottom navigation bar (Community tab active)

---

### SCR-10 · Local Grow Map

**Tab:** Community (child of SCR-08)
**Purpose:** Visual map of what's thriving anonymously in the user's region

**Header / AppBar**

- Back arrow (← to SCR-08)
- "Local Grow Map" title
- Layer toggle icon (top-right)

**Map Area** (full-width, ~60% of screen height)

- Interactive map (zone overlays, base map tiles)
- Clustered success dots (colour by crop category):
  - Tap cluster → expands to Map Cluster Popup Card (bottom sheet — see below)
- User's location pin (soft glow, zone-level precision only — not precise GPS pin, for privacy)
- Zoom / Pan controls (standard map controls)

**Layer Toggle Sheet** (on layer icon tap):

- Toggle options: Success Rate heat · Active Growers count · Recent Logs (past 7 days)
- Crop filter chips: All · Tomatoes · Herbs · Leafy Greens · Root Veg · Fruit · Hydro

**Map Cluster Popup Card** (bottom sheet, on cluster tap)

- Plant / crop name heading
- "X growers, Y% success rate" label
- "Top local tip:" label (from most-upvoted community post in that zone)
- Method tag chips
- `Grow This Plant →` button → MOD-02 Add / Edit Plant Sheet, pre-filled with species
- `View Cluster →` link → SCR-09 Garden Cluster Detail (related cluster for that zone / crop)

**Stats Strip** (below map area)

- "X plants being tracked in [City]" label
- "Most popular this season: [plant name]" label
- "Your zone: [Zone code]" badge

**Privacy Footer**

- Padlock icon + "All data anonymized — location only shared at zone level" label
- `Privacy settings →` link → SCR-13 Privacy Dashboard

---

## PROFILE TAB

---

### SCR-11 · Profile & Badges

**Tab:** Profile (Tab 5)
**Purpose:** Personal identity, achievements, stats, streaks, and navigation to personal features

**Header / AppBar**

- "My Profile" title
- Settings icon (top-right) → SCR-12 Settings

**Profile Header Card**

- Avatar (default illustrated leaf; tap to replace via camera or gallery)
- Username / display name (editable inline)
- Growing profile tag: auto-generated from methods and location (e.g., "Hydro + Balcony · Berlin")
- `Edit Profile` link

**Garden Health Score™ Card**

- Large circular dial (overall score across all plants, 0–100)
- Score delta label: "+5 this week"
- `View Breakdown →` link → inline 8-metric accordion (Moisture · Light · pH · Growth Rate · Nutrient Level · Pest Risk · Temperature · Humidity)

**Stats Row** (4 pill stats, horizontal scroll)

- Plants count (active plants)
- Total log entries count
- Current streak (days of consecutive logging)
- Challenges won count

**Achievement Badges Grid**

- Earned badges (full colour): "Hydro Master" · "Balcony Boss" · "Zero-Waste Gardener" · "Streak: 30 Days" · method-specific badges
- Locked badges (greyed, with padlock icon): unlock criteria shown on tap
- Tap any badge → badge detail sheet (earned date, unlock criteria, share button → MOD-12)

**Confidence Score™ Section** (optional, user-facing label: "My Skills")

- 15-skill radial chart or horizontal bar list showing mastery level
- Skill examples: Watering · Nutrient Mixing · Pest ID · Pruning · pH Management · etc.
- "Track your mastery across 15 skills" sub-label

**Streak Tracker**

- Current streak: fire icon + day count label
- Longest streak label
- Calendar heatmap (last 30 days of logging activity, colour-coded by intensity)

**Navigation Links** (tappable row items)

- Progress Reels Gallery → SCR-15
- Cemetery Log → SCR-14
- Creator Studio → SCR-16 (row label: "Earn from your guides")

**Referral Banner**

- "Invite 3 friends → unlock Multi-Zone Management"
- Progress bar: X / 3 friends invited
- `Share Invite Link` button → MOD-12 Export / Share Sheet

**Supporter Badge Banner** (conditional — shown only if Supporter Badge not yet purchased)

- "$2.99 · Remove interstitial ads forever" label
- `Learn More` button → MOD-07 Supporter Badge Dialog

---

### SCR-12 · Settings

**Tab:** Profile (child of SCR-11)
**Purpose:** App-wide preferences, appearance, privacy, accessibility, and account management

**Header / AppBar**

- Back arrow (← to SCR-11)
- "Settings" title

**Sections** (vertical grouped list with section headings):

**1 · Profile & Growing Setup**

- Edit display name field
- Growing method preference multi-select chips: Soil · Container · Hydro · Indoor
- Location / zone field: auto-detected with manual override (ZIP / postal code entry fallback)
- Unit system selector: Metric · Imperial (auto-detected from device locale, manually overridable)

**2 · Notifications**

- `Notification Preferences →` tappable row → MOD-10 Notification Prefs Sheet

**3 · Appearance**

- Theme toggle: Balcony Bright (light mode) · Grow Tent Dark (dark / low-light optimized)
- Font selector: Standard · Dyslexia-Friendly (OpenDyslexic)
- Colour-blind mode toggle (high-contrast alternatives for status indicators)
- Text size slider (Small → Large, 5 steps)

**4 · Accessibility**

- Voice input toggle (enables hands-free logging via mic across all relevant screens)
- Screen reader mode toggle (optimised VoiceOver / TalkBack behaviour)
- Reduce motion toggle (disables non-essential animations)

**5 · Language & Region**

- Language selector dropdown: English · German · French · Spanish · Dutch
- Date format selector: DD/MM/YYYY · MM/DD/YYYY

**6 · Privacy & Data**

- `Privacy Dashboard →` tappable row → SCR-13 Privacy Dashboard
- "Do Not Sell My Info" toggle (CCPA compliance)
- Ad personalisation toggle (on = personalised ads; off = generic ads, core features unchanged)
- Community anonymised data contribution toggle (opt-in to sharing anonymous zone-level data)

**7 · Monetisation**

- `Supporter Badge — Remove Interstitial Ads` tappable row → MOD-07 Supporter Badge Dialog

**8 · Content & Tips**

- "Show contextual learning tips" toggle (controls Contextual Tip Cards on SCR-01, SCR-03, SCR-05, SCR-06)
- "Offline article caching" toggle (downloads tip articles on Wi-Fi for offline reading)
- Creator Studio access toggle (enables SCR-16 for users who opt in)

**9 · About**

- App version label
- Terms of Service link (external)
- Privacy Policy link (external)
- `Rate GardenPulse ⭐` link (→ App Store / Play Store listing)
- `Send Feedback` link

**10 · Account** (red-tinted section)

- `Export All My Data` button (GDPR/CCPA data export, delivered via email or download)
- `Delete All My Data` destructive button → confirmation dialog ("This cannot be undone. Delete everything?")
- `Sign Out` button

---

### SCR-13 · Privacy Dashboard

**Tab:** Profile (child of SCR-12)
**Purpose:** GDPR / CCPA compliance — transparent inventory of stored data with granular controls

**Header / AppBar**

- Back arrow (← to SCR-12)
- "Your Data" title
- Last updated timestamp label (top-right)

**Data Inventory Section**

- Section heading: "What GardenPulse stores"
- Per-data-type rows (each expandable for detail):
  - **Location data**: last entry date, approximate zone stored (not precise GPS), `Clear` button
  - **Plant logs**: entry count, storage size estimate, `Export` button + `Delete All` button
  - **Photos**: count, total storage used, `Delete All` button
  - **Voice logs**: count, storage used, `Delete All` button
  - **Ad personalisation data**: current status label (on / off), `Opt Out` button

**Granular Toggle Section**

- Section heading: "Control your data"
- Per-toggle rows:
  - Location sharing: on/off + description ("Used for weather tips and zone detection")
  - Photo storage: on/off
  - Voice log retention: on/off
  - Ad personalisation: on/off
  - Community anonymised data contribution: on/off

**Legal Actions Section**

- `Export My Data` CTA button (GDPR export, delivered as email or direct download)
- `Delete All My Data` destructive CTA button → confirmation dialog
- "Do Not Sell My Info" toggle (CCPA, prominently placed)

**Links**

- Privacy Policy (external link)
- Data processing agreements summary link (external)

**Pending Request Status** (conditional)

- Export request status card: "Your data export is being prepared — check back in 24 hours"

---

### SCR-14 · Cemetery Log

**Tab:** Profile (child of SCR-11) + accessible from SCR-03 Plant Detail action pill row
**Purpose:** Historical log of failed grows to identify patterns and learn from losses

**Header / AppBar**

- Back arrow (← to SCR-11 or SCR-03, depending on entry point)
- "Cemetery Log" title
- `+ Add` icon button (top-right): manually log a plant that failed before app use

**Sub-heading**

- "Learn from every loss" italic label

**Pattern Insight Card** (conditional — shown after 2 or more entries)

- " Pattern detected: You've lost [N] plants to [cause]. Check your schedule."
- `View Schedule →` link → SCR-07 Smart Scheduler

**Filter Bar**

- Filter chips: All · By Method · By Cause · By Date

**Empty State**

- Illustrated gravestone graphic
- "No failures recorded yet — keep growing! " label

**Archived Plant Entries** (vertical list)

- Per-entry card:
  - Plant thumbnail + plant name
  - Method badge
  - Date archived label
  - **Cause of death** selector (tap to edit):
    Options: pH spike · Root rot · Overwatering · Underwatering · Nutrient burn · Pest · Light stress · Temperature shock · Unknown
  - "What I learned:" text field (editable, includes `` voice input icon — requests mic permission via MOD-04 if needed)
  - `Restore to Garden` button (moves plant back to SCR-02 Plant List if recovered)
  - `Delete Entry` icon (destructive, with confirm dialog)

**Add Manually Section**

- `+ Log Manually` CTA button → inline form: plant name, method, estimated date, cause of death, notes

**Export**

- `Export Log as PDF` button → MOD-05 Rewarded Video Prompt → MOD-12 Export / Share Sheet

---

### SCR-16 · Creator Studio

**Tab:** Profile (child of SCR-11)
**Access:** Visible to users who have enabled Creator Studio in SCR-12 Settings section 8
**Purpose:** Allow expert gardeners to write, publish, and earn AdMob revenue share from method-specific guides

**Header / AppBar**

- Back arrow (← to SCR-11)
- "Creator Studio" title
- `Publish` button (top-right, greyed until guide passes pre-publish check)

**Revenue Info Banner**

- " Write guides → earn AdMob revenue share" label
- Moderation notice: "All guides reviewed before going live (24–48 h)"
- `Learn How It Works` link (inline info sheet)

**Guide Editor Area**

- **Cover image** upload area: tap to capture via camera or import from gallery
- **Guide title** text field (character limit 80)
- **Category / method** multi-select chips: Soil · Hydro · Container · Indoor · Microgreen · Pest Control · Nutrition (and other method-relevant categories)
- **Tags** field: free-form, max 5 tags, autocomplete from existing tag library
- **Rich text editor**:
  - Toolbar: Bold · Italic · Heading (H2, H3) · Bullet list · Numbered list · Image insert · Divider
  - `Insert Plant Template` shortcut button (inserts standardised plant care table)
  - `Insert Tip Block` shortcut (styled callout block for tips / warnings)
  - Full-screen expand mode
- **Estimated read time** label (auto-calculated, updates live as user types)

**Preview Toggle**

- `Preview` button → switches editor to read-view, showing exactly how the guide will appear to readers including any native ad block placement

**Save / Submit Controls**

- `Save Draft` button (saves locally and syncs to cloud)
- `Submit for Review` primary CTA button → confirmation dialog: "Submit for moderation? Allow 24–48 h for review."

**My Published Guides Section** (below editor, vertically scrollable)

- Guide cards:
  - Guide thumbnail + title
  - Status chip: Under Review · Live · Rejected (with rejection reason shown for Rejected)
  - View count label (shown if Live)
  - Ad revenue earned label (shown if Live) + `Withdraw Earnings` link
  - `Edit` button (for Live guides: creates a new draft version; original stays live until new version approved)

---

## MODALS · SHEETS · OVERLAYS

---

### MOD-01 · Quick Log Sheet

**Type:** Bottom sheet (drag to expand to ~80% screen height)
**Triggered from:** SCR-01 Dashboard FAB · SCR-02 Plant List FAB · SCR-03 Plant Detail FAB · SCR-08 Community challenge `Submit Entry` · SCR-09 Cluster challenge `Submit Entry`
**Purpose:** Fastest possible logging — photo + activity type + one mood rating = complete log entry in minimal taps

**Elements**

- Sheet drag handle bar
- "Quick Log" heading
- **Plant selector**: horizontal scroll of plant cards (thumbnails + names); pre-filled if opened from SCR-03 Plant Detail; "All plants" option for multi-plant mode (used in Batch logging)
- **Photo area**: large tap-to-capture zone with camera icon; gallery import icon (bottom-left of area)
- **Activity type chips** (multi-select): Water · Feed · Prune · Check · Harvest · Repot · Transplant · Note
- **"How did it go?"** emoji slider (1 =  → 5 = )
- **Notes field**: "Add a quick note…" freeform text + `` mic icon (voice input — requests MOD-04 mic permission if not yet granted)
- **Location tag row**: auto-location chip (e.g., "Berlin · Zone 7b") + `Remove` × icon (user can remove before logging)
- **"Add to Reel" toggle**: adds this photo to the plant's timelapse sequence for SCR-15 Reels
- **Metric quick-entry** (expandable optional row, collapsed by default):
  - pH slider · EC / PPM field · Moisture % field · Temperature field
- **`Log It `** primary CTA button (full-width, green)
- **Cancel** text link (below CTA)

---

### MOD-02 · Add / Edit Plant Sheet

**Type:** Bottom sheet (large, ~90% height, step-scrollable)
**Triggered from:** SCR-02 Plant List `+` header button · SCR-03 Plant Detail `Edit` icon · SCR-10 Local Grow Map "Grow This Plant →" button · SCR-09 full-screen photo viewer "Log this plant →" CTA
**Purpose:** Add a new plant or edit an existing plant's metadata

**Elements**

- Sheet drag handle bar
- "Add Plant" or "Edit Plant" heading (dynamic, based on context)
- **Plant name search field**: text input + autocomplete dropdown (plant database, 3000+ species)
- **` Scan to identify`** button: triggers MOD-04 Permission Context Modal (camera) if camera not yet granted, then opens inline camera briefly for on-device species recognition → auto-fills plant name field on recognition
- **OR divider**
- **Browse by type** grid: Herb · Vegetable · Fruit · Flower · Houseplant · Microgreen chips
- **Plant photo**: tap-to-capture thumbnail area + gallery import link
- **Nickname field**: "Give it a name (optional)" — character limit 30
- **Growing method selector** pills (required): Soil · Container · Hydro · Indoor
- **Container / pot size field** (conditional — shown only if Container method selected): volume field + unit toggle (L / gal)
- **Location / zone auto-tag**: zone badge displayed; `Change location` link for manual override
- **Started date picker**: date field with calendar icon (defaults to today)
- **Target harvest date picker** (optional)
- **Reminder preferences toggle**: "Remind me for this plant" on/off
- **`Save Plant`** primary CTA button (full-width)
- **`Cancel`** text link

**Modals Triggered**

- MOD-04 Permission Context Modal (camera, on `Scan to identify` tap if camera not granted)

---

### MOD-03 · QR Scanner Overlay

**Type:** Camera overlay (full-screen)
**Triggered from:** SCR-04 Tools Hub (QR / Label Scanner card) · SCR-05 Calculator "Scan label →" button
**Purpose:** Scan nutrient bottle labels, seed packets, or sensor QR codes for auto-fill into the Calculator or log

**Elements**

- Full-screen camera feed (live)
- Animated scan frame (QR / barcode detection rectangle, pulsing border)
- "Point at a QR code or barcode" instruction label
- Flash / torch toggle icon (top-right)
- ` Close` button (top-left)
- `Enter code manually` fallback text link (bottom of screen)
- **Success state** (slides up as bottom card on scan detection):
  - Product thumbnail (if found in database)
  - Product name + brand label
  - Product type chip: Nutrient · Seed · Sensor · Other
  - Auto-fill action button: `Fill Calculator →` (if opened from SCR-05) or `Log Scan →` (if opened from SCR-04)
  - `Scan Another` link

---

### MOD-04 · Permission Context Modal

**Type:** Modal dialog (centre screen)
**Triggered from:**

- ONB-2: location — fires after `Next →` tap, before OS location dialog
- ONB-3: camera — fires on camera scan button tap, before OS camera dialog
- ONB-4: notifications — fires on `Enable` toggle tap, before OS notification dialog
- SCR-06 Leaf Diagnostics: camera — fires on screen entry if camera not granted
- SCR-03 Plant Detail notes field: mic — fires on first `` mic icon tap if mic not granted
- SCR-09 Cluster Detail post compose: camera — fires on photo attach tap if camera not granted
- MOD-01 Quick Log Sheet: mic — fires on `` mic icon tap if mic not granted
- MOD-02 Add / Edit Plant Sheet: camera — fires on `Scan to identify` tap if camera not granted

**Purpose:** Contextual pre-prompt shown BEFORE the OS permission dialog — explains the value and privacy stance so users can make an informed decision

**Elements** (content adapts per permission type)

- Contextual illustration (changes per type):
  - Location: map pin with leaf
  - Camera: camera lens with leaf
  - Microphone: mic with waveform
  - Notifications: bell with leaf
- **Title**: "Before we ask…" (location) · "Use your camera?" (camera) · "Voice logging?" (mic) · "Stay on top of your garden?" (notifications)
- **Benefit description**: 2-sentence explanation of why this permission helps (e.g., "GardenPulse uses location to give weather-aware care tips. You can change this any time in Settings.")
- **Privacy reassurance label**: padlock icon + short reassurance (e.g., "Location never shared publicly without explicit opt-in")
- **`Allow [Permission]`** primary CTA button → triggers OS system permission dialog immediately after tap
- **`Not Now`** secondary text link (dismisses modal; app provides graceful fallback)
- **`Learn more about privacy →`** text link (→ SCR-13 Privacy Dashboard)

**Denied State Variant** (banner, shown if permission was previously denied by OS):

- Warning icon + "[Permission] access is off" label
- `Open Settings` button (deep-links to device OS settings for the user to re-grant manually)
- `Use Gallery Instead` fallback button (camera-only variant, for importing existing photos)

**Rules (from brief)**

- Never display this modal on top of another permission dialog
- Never shown on onboarding screens for permissions not yet relevant to that step
- Never auto-fires for mic — only fires after user explicitly taps a mic icon

---

### MOD-05 · Rewarded Video Prompt

**Type:** Modal dialog (centre screen)
**Triggered from:** SCR-05 Calculator `Export / Share` → PDF export · SCR-15 Reels Gallery `Download` button · SCR-14 Cemetery Log `Export Log as PDF` button
**Purpose:** User willingly watches a short ad in exchange for a premium export unlock — value-exchange is transparent and truly optional

**Elements**

- Video play icon graphic (large, centre)
- **Heading**: "Unlock [X]" (dynamic: "PDF Export" · "HD Download" · "Compliance Log PDF")
- **Sub-label**: "Watch a 30-second video to unlock this for free"
- Estimated duration label: "~30 seconds"
- `▶ Watch Video` primary CTA button (full-width)
- `No Thanks` secondary text link (returns user to previous screen without penalty)

**During Video**

- Video player (full-screen, AdMob rewarded unit)
- Progress timer label (countdown)
- Skip button (appears after AdMob-required minimum watch time)

**Success State** (after video completes)

- Animated unlock visual (leaf + sparkle)
- "Unlocked! Your [X] is ready." heading
- `Download / Export Now` CTA button → MOD-12 Export / Share Sheet
- Auto-dismisses after 3 s if no tap

---

### MOD-06 · Interstitial Ad

**Type:** Full-screen ad overlay
**Triggered from:** SCR-05 Nutrient / Recipe Calculator on `Generate Recipe` tap — appears during the 1.5 s loading animation while calculation runs
**Purpose:** High-intent monetisation at a natural calculation latency moment

**Elements**

- Full-screen AdMob interstitial unit
- ` Close` button (appears after 5 s minimum — AdMob policy requirement)
- "Ad · Powered by AdMob" attribution label (footer)

**Rules (per brief)**

- Never show on: permission request screens · onboarding screens · error / crisis states
- Appears at most once per Calculator session (not on repeated `Generate Recipe` taps within the same session)

---

### MOD-07 · Supporter Badge Dialog

**Type:** Modal dialog (centre screen)
**Triggered from:** SCR-12 Settings (Monetisation row) · SCR-11 Profile & Badges (Supporter Badge banner)
**Purpose:** One-time $2.99 purchase to remove interstitial ads permanently; native ad revenue is preserved

**Elements**

- Supporter leaf badge graphic (animated shimmer)
- **Heading**: "Support GardenPulse "
- **Price label**: "$2.99 · One-time · No subscription"
- **What you get list**:
  -  Interstitial ads removed forever
  -  Supporter Badge displayed on your profile
  -  GardenPulse watermark removal on exports
- **"What stays" note** (grey text): "Tips and native content remain — they help us improve the app"
- `Support GardenPulse — $2.99` primary CTA button → App Store / Play Store in-app purchase flow
- `Restore Purchase` text link (for users who reinstalled or switched devices)
- `Not Now` text link (dismisses without purchase)

---

### MOD-08 · Batch Mode Overlay

**Type:** Overlay bar + transformed list (activates in-place on SCR-02 Plant List)
**Triggered from:** SCR-02 Plant List batch toggle icon in header
**Purpose:** Log or act on multiple plants at once with minimal taps

**Elements**

- **Top action bar** (replaces normal header):
  - "Batch Mode" label + selected count badge (e.g., "3 selected")
  - `Select All` button
  - ` Cancel` button (exits batch mode, restores normal header)
- **Plant list transforms**: each plant card gains a checkbox overlay (multi-select)
- **Bottom action bar** (appears when 1 or more plants are selected):
  - ` Water All` button
  - ` Feed All` button
  - ` Log Entry` button → opens MOD-01 Quick Log Sheet in multi-plant mode (Plant selector pre-filled with selected plants)
  - ` Archive` button
- **Confirmation dialog** (before any batch action executes): "Apply [action] to [N] plants?" with `Confirm` + `Cancel` buttons

---

### MOD-09 · Tip Article Reader Sheet

**Type:** Bottom sheet (drag from 50% → full screen)
**Triggered from:** SCR-01 Dashboard contextual tip card · SCR-03 Plant Detail contextual tip card · SCR-05 Calculator contextual tip link · SCR-06 Diagnostics results contextual tip link
**Purpose:** Read curated, offline-cached growing guides without leaving the current workflow

**Elements**

- Sheet drag handle bar
- ` Close` button (top-right)
- ` Bookmark` icon (top-left, saves article for later reading offline)
- **Article header image** (offline-cached, lazy-loaded from Wi-Fi download)
- **Article title** (H1)
- **Meta row**: method tag chip · estimated read time label · author name (if Creator Studio guide) · published date
- **Article body**: rich text content (offline-cached), headings, bulleted lists, inline images
- **Native ad block** (mid-article position, styled as "Recommended Tool" card — non-intrusive, does not interrupt reading)
- **Related articles** row (bottom): 2 suggested articles with thumbnails + titles
- `Mark as Read ` button (footer)
- `Share Article` icon → MOD-12 Export / Share Sheet

---

### MOD-10 · Notification Preferences Sheet

**Type:** Bottom sheet (large)
**Triggered from:** SCR-12 Settings (Notifications row) · SCR-07 Smart Scheduler "Notification preferences →" link
**Purpose:** Granular control over all app notifications in one place

**Elements**

- Sheet drag handle bar
- "Notification Preferences" heading
- **Master toggle**: "Enable all reminders" on/off (disabling this greys out all category rows below)
- **Per-category toggles** (each row: icon + label + on/off toggle):
  -  Watering reminders
  -  Feeding reminders
  -  Pest and disease alerts
  -  Weather-based care updates
  -  Community activity (clusters, challenges)
  -  Weekly Bloom Report
- **Timing preference section**:
  - "I prefer reminders in the:" radio selector: Morning (7–9 AM) · Afternoon (12–2 PM) · Evening (6–8 PM)
- **Skip weekends toggle**
- **Travel Mode section**:
  - Toggle: "Pause all notifications"
  - Date range picker (start → end date) — shown only when Travel Mode toggle is on
- `Save Preferences` primary CTA button (full-width)
- `Cancel` text link (below CTA)

---

### MOD-11 · Weekly Bloom Report Sheet

**Type:** Bottom sheet (large, ~85% screen height)
**Triggered from:** SCR-01 Dashboard Weekly Bloom Report banner · Push notification tap (sent Monday mornings)
**Purpose:** Personalised weekly summary of garden progress, weather correlation, and next-week tips

**Elements**

- Sheet drag handle bar
- ` Close` button (top-right)
- "Your Week in Review " heading
- Date range label (e.g., "May 26 – Jun 1, 2026")
- **Summary stats row** (4 pill cards, horizontal):
  - Plants logged count (this week)
  - Log entries total (this week)
  - Health Score change (e.g., "+7 pts")
  - Streak status (e.g., " 14 days")
- **Star performer card**: "Best performing plant this week" — plant thumbnail, plant name, method badge, health improvement label
- **Weather correlation insight**: e.g., "Your tomatoes thrived during the 3 sunny days this week — more sun exposure correlates with better growth"
- **Cemetery alert** (conditional — shown if a plant was archived this week): " 1 plant archived this week → See Cemetery Log" link → SCR-14
- **Next week tip card**: contextual tip based on upcoming forecast and planting zone (e.g., "Frost risk Friday → bring indoor plants in by Thursday night")
- `Share Report` icon button → MOD-12 Export / Share Sheet
- `View Full Garden →` CTA button → SCR-02 Plant List
- `Dismiss` text link (footer)

---

### MOD-12 · Export / Share Sheet

**Type:** GardenPulse pre-share layer (bottom sheet) followed by native OS share sheet
**Triggered from:** SCR-03 Plant Detail `Share` pill · SCR-05 Calculator (after rewarded video unlock) · SCR-09 Cluster Detail overflow share · SCR-11 Profile referral `Share Invite Link` · SCR-14 Cemetery Log export · SCR-15 Reels `Share` button · SCR-08 Community Hub referral `Share Invite Link` · MOD-05 Rewarded Video success state · MOD-09 Tip Article `Share Article` icon · MOD-11 Bloom Report `Share Report` icon
**Purpose:** Export and share content across platforms with brand-appropriate formatting

**GardenPulse Pre-Share Layer** (shown first, before OS share sheet):

- Content preview thumbnail (photo / PDF preview / reel frame, contextually appropriate)
- **Format options** (shown contextually per content type):
  - ` Share as Image (PNG)` — always available
  - ` Export PDF` — available after rewarded video unlock (MOD-05); greys out and shows "Watch video to unlock" if not yet unlocked
  - ` Copy Text Summary` — plain text version
- **Watermark toggle**: "Include GardenPulse branding" on/off (off state available only to Supporter Badge holders)
- `Continue to Share →` button → fires native OS share sheet

**Native OS Share Sheet** (system-level, appears after `Continue to Share →`):

- Platform icons: Instagram · TikTok · WhatsApp · Messages · Copy Link · Save to Photos · More
- System Cancel button
