const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const diagrams = {
  userFlow: `flowchart TD
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
        G --> H["Select Waste Category (Plastic, Mixed, Organic, etc.)"]
        H --> I["Capture Live GPS Geolocation (Browser Geolocation API)"]
        I --> J["Capture / Upload 'Before' Photo of Dirty Area"]
        J --> K["Validate Coordinates & Image Quality"]
    end

    subgraph Phase3["Phase 3: Cleanup & Proof Capture"]
        K --> L["Physical Cleanup Activity (Sweeping, Segregating into Eco-Bags)"]
        L --> M["Capture / Upload 'After' Photo (Same angle & lighting)"]
        M --> N["Optional: Upload 360 Video Walkthrough"]
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
        U -- Rejected --> V["Display Rejection Reason (Mismatch, Duplicate, Corrupted)"]
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
    end`,

  uiuxState: `stateDiagram-v2
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
    LeaderboardScreen --> DashboardScreen: Click "Home" in BottomNav`,

  aiSequence: `sequenceDiagram
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
    end`,

  techArch: `flowchart TD
    subgraph ClientLayer["1. CLIENT PRESENTATION LAYER (Mobile-First Web App)"]
        A1["Next.js 16 App Router (React 19, Turbopack)"]
        A2["Tailwind CSS 3.4 (Custom Deep-Emerald & Indian Earth Palette)"]
        A3["Lucide React Icons (Streamlined Feather Icons)"]
        A4["Canvas Confetti (Celebratory Microinteractions)"]
        A5["Browser Geolocation & Camera API (High-Accuracy GPS & Hardware Capture)"]
    end

    subgraph StateLayer["2. CLIENT PERSISTENCE & SDK LAYER"]
        B1["LocalStorage Reactive Store (Zero-latency local cache & offline resilience)"]
        B2["Supabase Client SDK (@supabase/supabase-js) (Cloud sync & session)"]
    end

    subgraph ServerLayer["3. BACKEND & SERVERLESS API LAYER"]
        C1["Next.js Route Handlers (/api/verify) (Edge & Serverless Runtime on Node 24)"]
        C2["Base64 Image Parser & Stream Processor"]
        C3["Neural-Verifier Heuristic Engine (Zero-cost fallback verification)"]
    end

    subgraph AILayer["4. ARTIFICIAL INTELLIGENCE & VISION LAYER"]
        D1["@google/generative-ai SDK"]
        D2["Google Gemini 1.5 Flash Vision Model (Multimodal Comparison)"]
        D3["JSON Structured Prompt Guardrails (Strict schema enforcement)"]
    end

    subgraph CloudLayer["5. DATABASE & STORAGE LAYER (Supabase Cloud)"]
        E1["Supabase PostgreSQL 15 (Relational tables: users, missions, rewards)"]
        E2["PostgreSQL Triggers & Stored Functions (handle_mission_points auto-credit)"]
        E3["Row-Level Security / RLS (Granular public read & user write policies)"]
        E4["Supabase Storage / S3 Buckets (Public CDN for mission imagery)"]
    end

    subgraph InfraLayer["6. CLOUD DEPLOYMENT & CI/CD INFRASTRUCTURE"]
        F1["Vercel Global Edge Network (Zero-config Next.js SSR & Edge Caching)"]
        F2["GitHub Version Control (Automated preview & production deployments)"]
        F3["Automated Documentation Engines (python-docx, Puppeteer, pptx)"]
    end

    ClientLayer --> StateLayer
    StateLayer --> ServerLayer
    ServerLayer --> AILayer
    ServerLayer --> CloudLayer
    CloudLayer -.-> InfraLayer
    ClientLayer -.-> InfraLayer`
};

async function renderAll() {
  console.log('Launching browser to render Mermaid diagrams...');
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
        <style>
          body { background: #ffffff; margin: 0; padding: 24px; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 18px; }
          .node rect, .node circle, .node polygon, .node path { stroke-width: 2.5px !important; }
          .cluster rect { stroke-width: 2.2px !important; rx: 14px !important; }
          .edgeLabel { font-size: 15px !important; font-weight: 700 !important; }
          .node .label { font-size: 17px !important; font-weight: 600 !important; }
          .cluster-label { font-size: 18px !important; font-weight: 800 !important; }
        </style>
      </head>
      <body>
        <script>
          mermaid.initialize({
            startOnLoad: false,
            theme: 'base',
            themeVariables: {
              darkMode: false,
              background: '#ffffff',
              mainBkg: '#ffffff',
              textColor: '#0f172a',
              lineColor: '#059669',
              primaryColor: '#ecfdf5',
              primaryBorderColor: '#059669',
              primaryTextColor: '#064e3b',
              secondaryColor: '#fef3c7',
              secondaryBorderColor: '#d97706',
              secondaryTextColor: '#78350f',
              tertiaryColor: '#f8fafc',
              tertiaryBorderColor: '#64748b',
              tertiaryTextColor: '#1e293b',
              noteBkgColor: '#f0fdf4',
              noteTextColor: '#064e3b',
              noteBorderColor: '#10b981',
              clusterBkg: '#f4f9f4',
              clusterBorder: '#86efac',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontSize: '17px'
            }
          });
        </script>
      </body>
    </html>
  `;
  await page.setContent(html);

  const outDir = path.join(__dirname, '..', 'public', 'mermaid-svgs');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const results = {};

  for (const [key, code] of Object.entries(diagrams)) {
    console.log(`Rendering diagram: ${key}...`);
    try {
      const svg = await page.evaluate(async (id, src) => {
        const res = await window.mermaid.render('svg_' + id, src);
        return res.svg;
      }, key, code);

      const filePath = path.join(outDir, `${key}.svg`);
      fs.writeFileSync(filePath, svg, 'utf8');
      results[key] = svg;
      console.log(`Rendered ${key} (${svg.length} bytes) -> ${filePath}`);
    } catch (err) {
      console.error(`Error rendering ${key}:`, err.message);
    }
  }

  await browser.close();
  console.log('All Mermaid diagrams rendered successfully!');
  return results;
}

renderAll().catch(console.error);
