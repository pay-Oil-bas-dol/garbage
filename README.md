# 🌿 SafaiSaathi (सफ़ाई साथी)
### Gamified Street Cleaning & Environmental AI Verification for India 🇮🇳

SafaiSaathi is a full-stack, mobile-first social environmental web application designed to encourage and gamify street cleaning across Indian cities (inspired by Swachh Bharat). Users report garbage on streets, clean it up, and earn verified eco-points (20–50 points) based on AI verification of **Before** and **After** photos.

Deployable on a free Vercel account with instant zero-setup demo mode for presentations!

---

## 🚀 Key Features

* **Mobile-First Experience**: Polished mobile shell with smooth bottom navigation, tactile eco cards, light green and earth-tone aesthetics.
* **Authentication**: Seamless Supabase Auth (Email/Password & OAuth) + Instant 1-Click Volunteer Profile Switcher (Aarav, Priya, Vikram) for presentations.
* **Dashboard & Gamification**:
  * Prominent total earned points showcase with animated level badges (Level 1: *Street Scout*, Level 2: *Eco Warrior*, Level 3: *Green Champion*, Level 4: *Swachh Guardian*).
  * Impact metrics (kg waste cleared, cleanup streaks, verification rate).
  * Central, glowing **"Start A Mission"** button.
  * Recent activity ledger with verified points badges.
* **3-Step "Start A Mission" Flow**:
  1. **Category & Before Photo**:
     * Dropdown with categories: Plastic Waste, Organic/Wet Waste, Mixed Litter, Construction Debris, E-Waste, Hazardous.
     * Camera capture or file upload (`accept="image/*" capture="environment"`).
     * Automatic GPS Geolocation capture with graceful permission fallback.
  2. **After Photo & Proof**:
     * "After" photo capture/upload of the cleaned site.
     * Optional short video upload (5–15s proof stored in Supabase Edge Storage without consuming AI tokens).
     * Reference comparison showing Before vs After.
  3. **Verification (Gemini AI)**:
     * Dedicated visually engaging loading screen: *"Verifying and allotting points..."* with animated scanning radar, pulse rings, and dynamic phase indicator.
     * Multimodal verification via **Google Gemini 1.5 Flash Vision** or the **Built-in Open Neural Verifier** (runs free online & offline with zero setup!).
* **Verification Results & Ledger**:
  * **Approved**: Celebratory confetti blast, +20–50 points breakdown, AI praise, and automatic ledger entry.
  * **Rejected**: Polite explanation highlighting why the AI rejected the proof (e.g. photos do not match the same location, meme detected, identical images).
  * Complete History Ledger with category/status filters and side-by-side inspection drawer with Google Maps pin links.
* **India Cleanliness League (Leaderboard)**: Top Swachh cities (Indore, Surat, New Delhi, Bengaluru) and volunteer champion rankings.

---

## 📁 Repository Structure

```
├── demo-assets/                # Sample presentation demo image pairs
│   ├── pair1-before.jpg        # Genuine street cleanup (Before state)
│   ├── pair1-after.jpg         # Genuine street cleanup (Cleaned & swept state)
│   ├── pair2-before.jpg        # Street market trash
│   ├── pair2-after.jpg         # Internet cat meme (triggers AI rejection)
│   └── sample-cleanup-proof.txt# Note on optional video proof
├── public/demo-assets/         # Mirrored demo assets accessible via browser
├── src/
│   ├── app/
│   │   ├── api/verify/route.ts # AI verification route (Gemini 1.5 Vision + Neural Verifier)
│   │   ├── globals.css         # Eco theme styling & radar animations
│   │   ├── layout.tsx          # Mobile viewport & PWA metadata
│   │   └── page.tsx            # Main app container & tab manager
│   ├── components/
│   │   ├── Navbar.tsx          # Brand header with points pill & avatar
│   │   ├── BottomNav.tsx       # Mobile bottom navigation bar
│   │   ├── Dashboard.tsx       # Gamified home view & presentation triggers
│   │   ├── MissionWizard.tsx   # 3-Step report, upload & verification wizard
│   │   ├── HistoryLedger.tsx   # Past missions ledger & photo inspection drawer
│   │   ├── Leaderboard.tsx     # City & volunteer league rankings
│   │   ├── PointsBanner.tsx    # Gamified points card with progress bar
│   │   ├── AuthModal.tsx       # Supabase Auth & Demo profile switcher
│   │   └── SettingsModal.tsx   # Gemini API key & Supabase configuration modal
│   ├── lib/
│   │   ├── store.ts            # State persistence & localStorage sync
│   │   └── supabase.ts         # Supabase client wrapper
│   └── types/
│       └── index.ts            # TypeScript interfaces
├── supabase/
│   └── schema.sql              # PostgreSQL schema, RLS policies, & trigger functions
└── README.md
```

---

## 🛠️ Tech Stack

* **Frontend**: Next.js 16 (App Router, React 19), Tailwind CSS v4, Framer Motion, Lucide Icons, Canvas Confetti.
* **Backend / Database**: Supabase (PostgreSQL, Supabase Auth, Storage) + LocalStorage persistence fallback.
* **AI Integration**: Google Gemini 1.5 Flash Vision API (`@google/generative-ai`) + Built-in Neural Verifier.
* **Deployment**: Vercel ready (`npm run build` succeeds cleanly).

---

## ⚡ Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) on your mobile device or desktop browser (toggle mobile responsive view `Ctrl+Shift+M` or `Cmd+Shift+M`).

---

## 🧪 Presentation & Testing Guide (Class Demo)

In the app, you will find direct **One-Click Presentation Buttons**:

1. **Pair 1: Genuine Street Cleanup (Pass Scenario)**
   * Tap **"Pair 1: Real Street"** on the Dashboard or in the Wizard.
   * Both photos depict the identical street corner on MG Road, New Delhi with matching yellow curb stripes and brick wall landmarks.
   * AI verifies authenticity and awards **+42 to +45 Eco Points** with a celebratory confetti blast!
2. **Pair 2: Fake / Meme Upload (Rejection Scenario)**
   * Tap **"Pair 2: Fake Meme"** on the Dashboard or in the Wizard.
   * The "After" photo is a funny internet meme / mismatched non-street image.
   * AI rejects the submission with a polite explanation: *"Rejection: The provided 'After' image appears to be an internet graphic/meme or an unrelated non-physical scene."*

---

## ⚙️ Environment Configuration (`.env.local`)

Copy `.env.example` to `.env.local`:

```env
# Optional: Google Gemini Vision API Key (https://aistudio.google.com/)
# If omitted, SafaiSaathi uses its built-in Free Neural Engine!
GEMINI_API_KEY=your_gemini_api_key_here

# Optional: Supabase Credentials (https://supabase.com/)
# If omitted, SafaiSaathi runs in persistent Demo/LocalStorage mode!
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

> **Note:** You can also enter your Gemini API Key directly inside the app by clicking the **Settings Gear (⚙️)** in the top right corner!

---

## 🗄️ Supabase Database Setup

To link a real Supabase database:

1. Create a free project at [supabase.com](https://supabase.com).
2. Go to the **SQL Editor** in your Supabase dashboard.
3. Paste and run the contents of [`supabase/schema.sql`](./supabase/schema.sql).
4. Add your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to your Vercel project environment variables.

---

## 🚢 Deploy to Vercel

1. Push this repository to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. (Optional) Add `GEMINI_API_KEY`, `NEXT_PUBLIC_SUPABASE_URL`, and `NEXT_PUBLIC_SUPABASE_ANON_KEY` under Environment Variables.
4. Click **Deploy**. Your app will be live on a `*.vercel.app` URL!

---

## 📜 License
MIT License. Created for the Swachh Bharat clean street initiative.
