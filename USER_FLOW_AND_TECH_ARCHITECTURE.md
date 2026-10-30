# Clean & Earn (सफ़ाई साथी) — User Flow, UI/UX Architecture & Technology Diagram

---

## 1. Executive Summary

**Clean & Earn** is a full-stack, mobile-first environmental action platform that gamifies community cleanliness. By combining real-time mobile image capture, automated GPS geotagging, Google Gemini Vision AI verification, and an instant Green Points reward economy, the platform transforms individual cleanup efforts into verifiable civic impact.

---

## 2. Detailed End-to-End User Flow

The complete user journey is structured into five distinct phases: **Discovery & Onboarding**, **Mission Setup**, **Physical Cleanup & Proof Capture**, **AI Multimodal Verification**, and **Reward Accumulation & Recognition**.

```mermaid
flowchart TD
    subgraph Phase1["Phase 1: Discovery & Onboarding"]
        A["User opens Clean & Earn Web App"] --> B["View Community Stats & Live Impact Counter"]
        B --> C{"User Authenticated?"}
        C -- Yes --> D["Load Profile, City & Saved Green Points"]
        C -- No --> E["Initialize Anonymous Guest Session with LocalStorage"]
        D --> F["Enter Main Dashboard"]
        E --> F
    end

    subgraph Phase2["Phase 2: Mission Initiation"]
        F --> G["Click 'Start Clean Mission' (FAB / Bottom Nav)"]
        G --> H["Select Waste Category<br/>(Plastic, Mixed, Organic, Construction, E-Waste, Hazardous)"]
        H --> I["Capture Live GPS Geolocation<br/>(High-Accuracy Browser Geolocation API)"]
        I --> J["Capture / Upload 'Before' Photo of Dirty Area"]
        J --> K["Validate Coordinates & Image Quality"]
    end

    subgraph Phase3["Phase 3: Cleanup & Proof Capture"]
        K --> L["Physical Cleanup Activity<br/>(Sweeping, Segregating into Eco-Bags)"]
        L --> M["Capture / Upload 'After' Photo<br/>(Same physical angle and lighting)"]
        M --> N["Optional: Upload 360° Video Walkthrough"]
        N --> O["Submit Mission for AI Verification"]
    end

    subgraph Phase4["Phase 4: AI Multimodal Verification"]
        O --> P["Next.js Serverless API Route (/api/verify)"]
        P --> Q{"Gemini API Key Available?"}
        Q -- Yes --> R["Invoke Google Gemini 1.5 Flash Vision API"]
        Q -- No --> S["Invoke Built-in Neural-Verifier Fallback Engine"]
        R --> T["Evaluate Authenticity, Visual Landmarks & Thoroughness"]
        S --> T
        T --> U{"Is Submission Valid?"}
        U -- Rejected --> V["Display Rejection Reason<br/>(Mismatch, Duplicate, Corrupted)"]
        V --> W["Allow User to Re-take Photos"]
        W --> M
        U -- Approved --> X["Calculate Green Points (20 to 50 pts)"]
    end

    subgraph Phase5["Phase 5: Celebration, Ledger & Rewards"]
        X --> Y["Trigger Canvas Confetti Celebration Animation"]
        Y --> Z["Display Points Breakdown & AI Feedback Pills"]
        Z --> AA["Record Transaction in Supabase PostgreSQL & LocalStore"]
        AA --> AB["Update User Total Points via Trigger"]
        AB --> AC["Mission added to History Ledger with Before/After Slider"]
        AC --> AD["Update City & National Leaderboard Rankings"]
        AD --> AE["User Redeems Points for Municipal / Eco Rewards"]
    end
```

---

## 3. UI / UX Flow & Screen State Machine

The interface follows a mobile-first paradigm designed for high visibility under outdoor sunlight, quick thumb navigation, and low cognitive load.

### Screen Navigation & State Transition Diagram

```mermaid
stateDiagram-v2
    [*] --> DashboardScreen: App Launch

    state DashboardScreen {
        [*] --> ViewHeroMetrics
        ViewHeroMetrics --> CategoryFilter
        ViewHeroMetrics --> QuickStartFAB
        ViewHeroMetrics --> ViewRecentMissions
    }

    DashboardScreen --> MissionWizardScreen: Click "Start Clean Mission"
    DashboardScreen --> HistoryLedgerScreen: Click "History" in BottomNav
    DashboardScreen --> LeaderboardScreen: Click "Leaderboard" in BottomNav
    DashboardScreen --> SettingsModal: Click Settings Gear (Top Navbar)
    DashboardScreen --> AuthModal: Click User Profile Avatar

    state MissionWizardScreen {
        [*] --> Step1_BeforeSetup
        Step1_BeforeSetup --> Step2_AfterProof: Before Photo + GPS Confirmed
        Step2_AfterProof --> Step1_BeforeSetup: Back to Edit Before State
        Step2_AfterProof --> Step3_Verifying: Click "Verify Mission with AI"
        
        state Step3_Verifying {
            [*] --> AnalyzingLandmarks
            AnalyzingLandmarks --> CalculatingVolume
            CalculatingVolume --> ScoringThoroughness
        }

        Step3_Verifying --> Step4_Success: Verification Passed (is_valid = true)
        Step3_Verifying --> Step4_Rejected: Verification Failed (is_valid = false)

        Step4_Rejected --> Step2_AfterProof: Retry with New Photo
        Step4_Success --> HistoryLedgerScreen: Click "View in History"
    }

    state HistoryLedgerScreen {
        [*] --> MissionList
        MissionList --> InteractiveComparisonView: Select Mission Card
        InteractiveComparisonView --> MissionList: Back to List
    }

    state LeaderboardScreen {
        [*] --> NationalRankings
        NationalRankings --> CityRankings: Toggle Scope Filter
    }

    HistoryLedgerScreen --> DashboardScreen: Click "Home" in BottomNav
    LeaderboardScreen --> DashboardScreen: Click "Home" in BottomNav
```

### Key UI / UX Component Highlights

| Screen / Component | Purpose & UX Feature | Interaction Details |
| :--- | :--- | :--- |
| **Top Navbar** | Persistent identity & context header | Shows user profile avatar, active city (`New Delhi`), live Green Points counter pill, and settings modal trigger. |
| **Dashboard** | Primary landing screen | High-impact hero card showing total points, dynamic motivational quote, 1-tap "Start Clean Mission" CTA, and quick demo test triggers. |
| **Waste Category Picker** | Step 1 selection grid | 6 tactile cards with emoji icons (Plastic `🥤`, Mixed `🗑️`, Organic `🍂`, Construction `🧱`, E-Waste `🔋`, Hazardous `⚠️`). |
| **GPS Geotagger** | Automatic spatial verification | Uses `navigator.geolocation` with fallback handling; displays pinpoint latitude/longitude badges with accuracy status (`Acquiring`, `Success`, `Fallback`). |
| **Before / After Uploaders** | Dual-state proof capture | Supports live camera capture (`capture="environment"`) or direct gallery upload with immediate preview, file size check, and delete button. |
| **AI Verification Loader** | Frictionless waiting experience | Multi-phase animated progress indicator ("Checking GPS bounds...", "Scanning spatial landmarks...", "Evaluating trash reduction volume..."). |
| **Result Modal & Confetti** | Dopamine reward trigger | Multi-colored `canvas-confetti` explosion, score badge (+30 to +50 Green Points), and structured breakdown cards (Authenticity %, Thoroughness %, Debris Volume). |
| **History Ledger** | Proof of work showcase | Interactive split before-and-after comparison slider allowing users to drag and inspect cleanliness transformations side-by-side. |
| **Leaderboard** | Civic competition & social proof | Live rankings with gold/silver/bronze badges, user highlight strip, and filter toggles for city vs. national tiers. |
| **Bottom Navigation Bar** | Thumb-zone navigation | Floating bottom pill bar with Home, History, Leaderboard, and an elevated pulsing "Start Mission" action button. |

---

## 4. AI Verification Pipeline & Sequence

The AI Verification engine compares the two photographic states using Google Gemini 1.5 Flash Vision.

```mermaid
sequenceDiagram
    autonumber
    actor User as Citizen / Volunteer
    participant App as Mobile Client (Next.js 16)
    participant Route as Serverless API (/api/verify)
    participant Gemini as Google Gemini 1.5 Flash AI
    participant DB as Supabase PostgreSQL

    User->>App: Captures Before Photo & GPS Location
    App->>App: Caches GPS coordinates & Base64 preview
    User->>App: Cleans Area & Captures After Photo
    User->>App: Clicks "Verify Mission with AI"
    App->>Route: POST /api/verify {beforeImage, afterImage, category, apiKey}
    
    Route->>Route: Resolve Base64 / demo file buffers
    alt Gemini API Key Available
        Route->>Gemini: generateContent([Structured Verification Prompt, Part 1, Part 2])
        Gemini-->>Route: JSON: {is_valid: true, points: 44, reason: "Authentic..."}
    else Offline / Free Fallback
        Route->>Route: Built-in Neural-Verifier (Landmark & Entropy Check)
    end

    Route-->>App: VerificationResponse {is_valid, points, reason, breakdown}

    alt Verification Passed
        App->>DB: INSERT into public.missions (before_url, after_url, points, lat, lng, status)
        DB->>DB: Trigger: handle_mission_points() increments user.total_points
        App->>User: Fires Confetti & displays +44 Green Points earned
    else Verification Failed
        App->>User: Displays detailed rejection advice (e.g. angle mismatch)
    end
```

---

## 5. Technology Stack Architecture Diagram

The system follows a modern serverless, cloud-native architecture optimized for zero idle cost, extreme responsiveness, and offline resilience.

```mermaid
flowchart TD
    subgraph ClientLayer["1. CLIENT PRESENTATION LAYER (Mobile-First Web App)"]
        A1["Next.js 16 App Router<br/>(React 19, Turbopack)"]
        A2["Tailwind CSS 3.4<br/>(Custom Deep-Emerald & Indian Earth Palette)"]
        A3["Lucide React Icons<br/>(Streamlined Feather Icons)"]
        A4["Canvas Confetti<br/>(Celebratory Microinteractions)"]
        A5["Browser Geolocation & Camera API<br/>(High-Accuracy GPS & Hardware Capture)"]
    end

    subgraph StateLayer["2. CLIENT PERSISTENCE & SDK LAYER"]
        B1["LocalStorage Reactive Store<br/>(Zero-latency local cache & offline resilience)"]
        B2["Supabase Client SDK (@supabase/supabase-js)<br/>(Cloud synchronization & session persistence)"]
    end

    subgraph ServerLayer["3. BACKEND & SERVERLESS API LAYER"]
        C1["Next.js Route Handlers (/api/verify)<br/>(Edge & Serverless Runtime on Node 24)"]
        C2["Base64 Image Parser & Stream Processor"]
        C3["Neural-Verifier Heuristic Engine<br/>(Zero-cost fallback verification)"]
    end

    subgraph AILayer["4. ARTIFICIAL INTELLIGENCE & VISION LAYER"]
        D1["@google/generative-ai SDK"]
        D2["Google Gemini 1.5 Flash Vision Model<br/>(Multimodal Before/After Comparison, Landmark Detection)"]
        D3["JSON Structured Prompt Guardrails<br/>(Strict schema enforcement: is_valid, points, reason)"]
    end

    subgraph CloudLayer["5. DATABASE & STORAGE LAYER (Supabase Cloud)"]
        E1["Supabase PostgreSQL 15<br/>(Relational tables: users, missions, rewards)"]
        E2["PostgreSQL Triggers & Stored Functions<br/>(handle_mission_points automated point credit)"]
        E3["Row-Level Security (RLS)<br/>(Granular public read and user-scoped write policies)"]
        E4["Supabase Storage (S3-Compatible Buckets)<br/>(Public CDN for high-resolution mission imagery)"]
    end

    subgraph InfraLayer["6. CLOUD DEPLOYMENT & CI/CD INFRASTRUCTURE"]
        F1["Vercel Global Edge Network<br/>(Zero-config Next.js SSR, SSG & Edge Caching)"]
        F2["GitHub Version Control<br/>(Automated preview branches and production deployments)"]
        F3["Automated Documentation Engines<br/>(python-docx for Word, Puppeteer for PDF, python-pptx)"]
    end

    %% Data Connections
    ClientLayer --> StateLayer
    StateLayer --> ServerLayer
    ServerLayer --> AILayer
    ServerLayer --> CloudLayer
    CloudLayer -.-> InfraLayer
    ClientLayer -.-> InfraLayer
```

---

## 6. Complete Technology Matrix & Role Description

| Technology | Layer | Role & Responsibility in Project |
| :--- | :--- | :--- |
| **Next.js 16 (App Router)** | Full-Stack Framework | High-performance React 19 framework featuring Turbopack compiler, static generation, server-rendered components, and lightweight API Route Handlers. |
| **TypeScript 5.x** | Language & Type Safety | End-to-end type safety guaranteeing schema integrity across database models, Gemini verification payloads, and React components. |
| **Tailwind CSS 3.4** | UI Styling & Design System | Utility-first CSS configured with custom color tokens (`#15803d` emerald, `#EBF3ED` sage, slate dark modes) and mobile-responsive layout utilities. |
| **Google Gemini 1.5 Flash Vision** | Multimodal AI Engine | Cloud vision intelligence that compares Before and After photographs, validates spatial coordinates, detects fraud/duplicates, and scores cleanup thoroughness. |
| **Supabase PostgreSQL** | Relational Database | Managed SQL database storing user profiles, verified mission logs, GPS coordinates, category tags, and historical point ledgers. |
| **PostgreSQL Stored Procedures** | Database Automation | Plpgsql triggers (`handle_mission_points()`) that execute atomically inside the database to update user balances upon mission approval. |
| **Supabase Storage** | Object Storage | S3-compatible cloud bucket (`missions`) providing public CDN URLs for before and after media files. |
| **Canvas Confetti** | Visual UX Microinteraction | Lightweight canvas-based particle generator triggered on verification success to maximize user gratification. |
| **HTML5 Geolocation & Media API** | Device Integration | Direct browser hardware integration for capturing live GPS coordinates and triggering native camera viewfinders. |
| **Vercel Edge Platform** | Production Hosting | Global serverless deployment providing instant SSL, edge routing, image optimization, and 99.99% uptime. |
| **Python Tooling (`docx`, `pptx`, Puppeteer)** | Automated Deliverables | Headless scripting pipeline that automatically exports the presentation slides into PowerPoint (`.pptx`), PDF (`.pdf`), and technical documentation (`.docx`). |

---

*Clean & Earn (सफ़ाई साथी) — Transforming Individual Cleanliness Actions into Verified Civic Impact.*
