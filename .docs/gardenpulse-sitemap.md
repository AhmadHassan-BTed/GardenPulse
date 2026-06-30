# GardenPulse — Navigation Sitemap

**Total Items: 32**

- 4 Onboarding Screens (ONB-1 → ONB-4)
- 16 Main App Screens (SCR-01 → SCR-16)
- 12 Modals / Sheets / Overlays (MOD-01 → MOD-12)

---

## Legend

| Symbol                 | Meaning                        |
| ---------------------- | ------------------------------ |
| Rectangle (green)      | Full App Screen                |
| Pill / Stadium (amber) | Modal · Bottom Sheet · Overlay |
| Rectangle (blue)       | Onboarding Screen              |
| `-->` solid arrow      | Screen-level navigation        |
| `-.->` dashed arrow    | Modal / overlay trigger        |
| Hexagon (purple)       | Always-visible navigation hub  |

---

```mermaid
flowchart TD

    START([ App Launch]) --> GATE{First\nLaunch?}
    GATE -->|Yes| ONB1
    GATE -->|No| BOTNAV

    subgraph OB["   ONBOARDING  ·  one-time  "]
        direction LR
        ONB1["ONB-1\nSplash Screen"]
        ONB2["ONB-2\nWelcome + Method Selection"]
        ONB3["ONB-3\nAdd First Plant"]
        ONB4["ONB-4\nInstant Care Plan Preview"]
        ONB1 --> ONB2 --> ONB3 --> ONB4
    end

    ONB4 --> BOTNAV
    ONB2 -.->|location pre-prompt| PERM
    ONB3 -.->|camera pre-prompt| PERM
    ONB4 -.->|notification pre-prompt| PERM

    BOTNAV{{" BOTTOM NAVIGATION\nHome · Garden · Tools · Community · Profile"}}
    BOTNAV --> DASH & PLIST & THUB & CHUB & PROFB

    subgraph T1["   HOME  "]
        DASH["SCR-01\nDashboard / Home"]
    end

    subgraph T2["   GARDEN  "]
        PLIST["SCR-02\nPlant List"]
        PDETAIL["SCR-03\nPlant Detail"]
        REEL["SCR-15\nProgress Reels Gallery"]
        PLIST --> PDETAIL
        PDETAIL --> REEL
    end

    subgraph T3["   TOOLS  "]
        THUB["SCR-04\nTools Hub"]
        NCALC["SCR-05\nNutrient / Recipe Calculator"]
        LDIAG["SCR-06\nLeaf Diagnostics"]
        SSCHED["SCR-07\nSmart Scheduler"]
        THUB --> NCALC
        THUB --> LDIAG
        THUB --> SSCHED
    end

    subgraph T4["   COMMUNITY  "]
        CHUB["SCR-08\nCommunity Hub"]
        CDET["SCR-09\nGarden Cluster Detail"]
        GMAP["SCR-10\nLocal Grow Map"]
        CHUB --> CDET
        CHUB --> GMAP
    end

    subgraph T5["   PROFILE  "]
        PROFB["SCR-11\nProfile & Badges"]
        SETT["SCR-12\nSettings"]
        PRIV["SCR-13\nPrivacy Dashboard"]
        CLOG["SCR-14\nCemetery Log"]
        STUDIO["SCR-16\nCreator Studio"]
        PROFB --> SETT
        PROFB --> CLOG
        PROFB --> STUDIO
        SETT --> PRIV
    end

    subgraph MODS["  ◆ MODALS · SHEETS · OVERLAYS  "]
        QLS(["MOD-01\nQuick Log Sheet"])
        APS(["MOD-02\nAdd / Edit Plant Sheet"])
        QRS(["MOD-03\nQR Scanner Overlay"])
        PERM(["MOD-04\nPermission Context Modal\nlocation · camera · mic · notifications"])
        RVP(["MOD-05\nRewarded Video Prompt"])
        INTS(["MOD-06\nInterstitial Ad"])
        SUPP(["MOD-07\nSupporter Badge Dialog"])
        BATCH(["MOD-08\nBatch Mode Overlay"])
        TIPS(["MOD-09\nTip Article Reader Sheet"])
        NOTIF(["MOD-10\nNotification Prefs Sheet"])
        BLOOM(["MOD-11\nWeekly Bloom Report Sheet"])
        EXPSH(["MOD-12\nExport / Share Sheet"])
    end

    %% ── HOME cross-connections ──────────────────────────
    DASH --> PDETAIL
    DASH --> SSCHED
    DASH -.-> QLS
    DASH -.-> TIPS
    DASH -.-> BLOOM

    %% ── GARDEN cross-connections ────────────────────────
    PLIST -.-> APS
    PLIST -.-> BATCH
    PLIST -.-> QLS
    PDETAIL --> LDIAG
    PDETAIL --> CLOG
    PDETAIL -.-> QLS
    PDETAIL -.-> TIPS
    PDETAIL -.-> EXPSH
    PDETAIL -.-> PERM

    %% ── TOOLS cross-connections ─────────────────────────
    THUB -.-> QRS
    LDIAG -.-> PERM
    NCALC -.-> INTS
    NCALC -.-> RVP
    NCALC -.-> EXPSH
    NCALC -.-> QRS
    SSCHED -.-> NOTIF

    %% ── COMMUNITY cross-connections ─────────────────────
    CDET -.-> EXPSH
    CDET -.-> QLS
    CDET -.-> PERM
    CHUB -.-> EXPSH

    %% ── PROFILE cross-connections ───────────────────────
    PROFB --> REEL
    PROFB -.-> EXPSH
    SETT -.-> NOTIF
    SETT -.-> SUPP
    CLOG -.-> RVP
    CLOG -.-> EXPSH

    %% ── MODAL → MODAL ───────────────────────────────────
    RVP -.->|unlocks| EXPSH
    APS -.->|camera permission| PERM

    %% ── STYLES ──────────────────────────────────────────
    classDef screen   fill:#1c4a22,color:#fff,stroke:#4caf50,stroke-width:2px
    classDef modal    fill:#4a2c00,color:#fff,stroke:#f09000,stroke-width:2px
    classDef onboard  fill:#0d2a52,color:#fff,stroke:#4a80d4,stroke-width:2px
    classDef hub      fill:#2a0a3a,color:#fff,stroke:#9c27b0,stroke-width:3px
    classDef gate     fill:#1a1040,color:#fff,stroke:#5c4080,stroke-width:2px

    class DASH,PLIST,PDETAIL,REEL,THUB,NCALC,LDIAG,SSCHED,CHUB,CDET,GMAP,PROFB,SETT,PRIV,CLOG,STUDIO screen
    class QLS,APS,QRS,PERM,RVP,INTS,SUPP,BATCH,TIPS,NOTIF,BLOOM,EXPSH modal
    class ONB1,ONB2,ONB3,ONB4 onboard
    class BOTNAV hub
    class GATE gate
```

---

## Screen Index

### Onboarding

| ID    | Screen                     |
| ----- | -------------------------- |
| ONB-1 | Splash Screen              |
| ONB-2 | Welcome + Method Selection |
| ONB-3 | Add First Plant            |
| ONB-4 | Instant Care Plan Preview  |

### Main App Screens

| ID     | Screen                       | Tab              |
| ------ | ---------------------------- | ---------------- |
| SCR-01 | Dashboard / Home             | Home             |
| SCR-02 | Plant List                   | Garden           |
| SCR-03 | Plant Detail                 | Garden           |
| SCR-04 | Tools Hub                    | Tools            |
| SCR-05 | Nutrient / Recipe Calculator | Tools            |
| SCR-06 | Leaf Diagnostics             | Tools            |
| SCR-07 | Smart Scheduler              | Tools            |
| SCR-08 | Community Hub                | Community        |
| SCR-09 | Garden Cluster Detail        | Community        |
| SCR-10 | Local Grow Map               | Community        |
| SCR-11 | Profile & Badges             | Profile          |
| SCR-12 | Settings                     | Profile          |
| SCR-13 | Privacy Dashboard            | Profile          |
| SCR-14 | Cemetery Log                 | Profile          |
| SCR-15 | Progress Reels Gallery       | Profile / Garden |
| SCR-16 | Creator Studio               | Profile          |

### Modals / Sheets / Overlays

| ID     | Modal                     | Primary Trigger                                                                                                                                 |
| ------ | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| MOD-01 | Quick Log Sheet           | Dashboard FAB · Plant List FAB · Plant Detail FAB · Community challenge submit                                                                  |
| MOD-02 | Add / Edit Plant Sheet    | Plant List (+) · Onboarding (ONB-3) · Plant Detail (Edit)                                                                                       |
| MOD-03 | QR Scanner Overlay        | Tools Hub · Calculator "Scan label"                                                                                                             |
| MOD-04 | Permission Context Modal  | ONB-2 (location) · ONB-3 (camera) · ONB-4 (notifications) · Leaf Diagnostics (camera) · Plant Detail notes (mic) · Cluster Detail post (camera) |
| MOD-05 | Rewarded Video Prompt     | Calculator export · Reels download · Cemetery Log export                                                                                        |
| MOD-06 | Interstitial Ad           | Calculator "Generate Recipe"                                                                                                                    |
| MOD-07 | Supporter Badge Dialog    | Settings · Profile banner                                                                                                                       |
| MOD-08 | Batch Mode Overlay        | Plant List (batch toggle)                                                                                                                       |
| MOD-09 | Tip Article Reader Sheet  | Dashboard tip card · Plant Detail tip card · Calculator tip link · Diagnostics results link                                                     |
| MOD-10 | Notification Prefs Sheet  | Settings · Smart Scheduler quick link                                                                                                           |
| MOD-11 | Weekly Bloom Report Sheet | Dashboard banner · Push notification (Monday morning)                                                                                           |
| MOD-12 | Export / Share Sheet      | Calculator · Plant Detail · Cluster Detail · Reels · Profile · Cemetery Log · Bloom Report · Community referral                                 |
