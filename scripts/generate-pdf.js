const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generatePdf() {
  console.log('Generating high-resolution 16:9 PDF Presentation...');

  const assetDir = path.join(__dirname, '..', 'presentation-assets');

  // Convert images to base64 so they load instantly without network latency
  function getBase64Image(filename) {
    const filePath = path.join(assetDir, filename);
    if (!fs.existsSync(filePath)) return '';
    const b64 = fs.readFileSync(filePath).toString('base64');
    return `data:image/png;base64,${b64}`;
  }

  const imgDashboard = getBase64Image('1-dashboard.png');
  const imgStep1 = getBase64Image('2-step1-setup.png');
  const imgStep2 = getBase64Image('3-step2-after-proof.png');
  const imgVerifying = getBase64Image('4-step3-verifying.png');
  const imgApproved = getBase64Image('5-step4-approved.png');
  const imgRejected = getBase64Image('6-step4-rejected.png');
  const imgLedger = getBase64Image('7-history-ledger.png');
  const imgRankings = getBase64Image('8-leaderboard.png');

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Clean & Earn Presentation PDF</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @page {
      size: 1920px 1080px;
      margin: 0;
    }
    html, body {
      margin: 0;
      padding: 0;
      background: #0F172A;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .slide-page {
      width: 1920px;
      height: 1080px;
      page-break-after: always;
      position: relative;
      overflow: hidden;
      box-sizing: border-box;
      padding: 60px 80px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  </style>
</head>
<body class="text-slate-100">

  <!-- ============================================== -->
  <!-- SLIDE 1: TITLE SLIDE -->
  <!-- ============================================== -->
  <div class="slide-page bg-gradient-to-br from-[#064E3B] via-[#022c22] to-[#064E3B] justify-center items-center text-center">
    <div class="max-w-5xl mx-auto space-y-6">
      <span class="inline-block text-sm font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-5 py-2 rounded-full uppercase tracking-widest">
        Swachh Bharat Tech Initiative • Class Presentation
      </span>
      <h1 class="text-7xl font-black text-white tracking-tight leading-none">
        Clean &amp; Earn
      </h1>
      <h2 class="text-3xl font-bold text-emerald-400">
        SafaiSaathi (सफ़ाई साथी) — Gamifying Civic Cleanliness in India 🇮🇳
      </h2>
      <p class="text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
        A full-stack mobile web platform connecting civic responsibility with multimodal AI verification, photographic proof, and verifiable reward points.
      </p>

      <div class="bg-black/40 border border-emerald-500/40 rounded-3xl p-6 text-left max-w-2xl mx-auto space-y-2 mt-4">
        <p class="text-sm font-bold text-emerald-300 uppercase tracking-wide">🌐 Live Production App:</p>
        <p class="text-xl font-mono text-white font-bold">https://garbage-rosy-six.vercel.app</p>
      </div>

      <div class="pt-6">
        <p class="text-sm font-semibold text-emerald-300 tracking-wider">
          Next.js 16 • Tailwind CSS • Supabase PostgreSQL • Google Gemini Vision AI • Vercel
        </p>
      </div>
    </div>
  </div>

  <!-- ============================================== -->
  <!-- SLIDE 2: MOTIVATION & ORIGIN -->
  <!-- ============================================== -->
  <div class="slide-page bg-[#0B1329]">
    <div>
      <span class="text-sm font-bold text-emerald-400 uppercase tracking-widest block mb-2">Slide 1 — Motivation &amp; Origin</span>
      <h2 class="text-5xl font-black text-white tracking-tight">Why Clean &amp; Earn?</h2>
      <p class="text-lg text-slate-400 mt-1">Transforming shared responsibility into consistent community action</p>
    </div>

    <div class="my-auto space-y-8">
      <div class="bg-emerald-950/60 border-2 border-emerald-500/50 rounded-3xl p-8 text-center shadow-xl">
        <p class="text-3xl font-bold text-emerald-300 italic">
          "How can we motivate people to take responsibility for cleanliness and make it a regular habit?"
        </p>
      </div>

      <div class="grid grid-cols-3 gap-8">
        <div class="bg-slate-800/90 p-8 rounded-3xl border border-slate-700 shadow-lg space-y-3">
          <span class="text-amber-400 font-bold text-sm uppercase tracking-wide block">1. Problem Observed</span>
          <h3 class="text-2xl font-bold text-white">Awareness Gaps</h3>
          <p class="text-slate-300 text-base leading-relaxed">
            People understand the importance of cleanliness, but consistent motivation is lacking. Cleaning is often viewed as someone else's responsibility.
          </p>
        </div>

        <div class="bg-slate-800/90 p-8 rounded-3xl border border-slate-700 shadow-lg space-y-3">
          <span class="text-emerald-400 font-bold text-sm uppercase tracking-wide block">2. The Core Idea</span>
          <h3 class="text-2xl font-bold text-white">Gamified Missions</h3>
          <p class="text-slate-300 text-base leading-relaxed">
            Make cleanliness engaging through structured missions. Offer immediate positive reinforcement, recognition, and transparent eco-points (20–50 pts).
          </p>
        </div>

        <div class="bg-slate-800/90 p-8 rounded-3xl border border-slate-700 shadow-lg space-y-3">
          <span class="text-teal-400 font-bold text-sm uppercase tracking-wide block">3. Long-Term Purpose</span>
          <h3 class="text-2xl font-bold text-white">Habit Formation</h3>
          <p class="text-slate-300 text-base leading-relaxed">
            Turn occasional, spontaneous volunteer cleanup drives into an enduring community habit and an inspiring positive social norm.
          </p>
        </div>
      </div>
    </div>

    <div class="bg-amber-950/40 border border-amber-500/50 p-5 rounded-2xl text-center">
      <p class="text-lg font-bold text-amber-300">
        💡 Core Thought: What if doing something good for the environment also became rewarding and verifiable?
      </p>
    </div>
  </div>

  <!-- ============================================== -->
  <!-- SLIDE 3: PROBLEM & SOLUTION -->
  <!-- ============================================== -->
  <div class="slide-page bg-[#0B1329]">
    <div>
      <span class="text-sm font-bold text-emerald-400 uppercase tracking-widest block mb-2">Slide 2 — Problem Identification &amp; Solution</span>
      <h2 class="text-5xl font-black text-white tracking-tight">Problem Identification &amp; Proposed Solution</h2>
      <p class="text-lg text-slate-400 mt-1">Connecting cleanliness activities with photographic proof, verification, and incentives</p>
    </div>

    <div class="grid grid-cols-2 gap-10 my-auto">
      <div class="bg-slate-800/90 p-8 rounded-3xl border border-slate-700 shadow-xl space-y-6">
        <h3 class="text-2xl font-bold text-rose-400 flex items-center space-x-2">
          <span>⚠️</span>
          <span>Problems Identified</span>
        </h3>
        <ul class="text-slate-200 space-y-4 text-base">
          <li class="flex items-start space-x-3">
            <span class="text-rose-400 font-bold text-lg">•</span>
            <div><strong>Lack of sustained motivation:</strong> Civic awareness alone fails to motivate regular individual action.</div>
          </li>
          <li class="flex items-start space-x-3">
            <span class="text-rose-400 font-bold text-lg">•</span>
            <div><strong>Unrecognised efforts:</strong> Everyday citizen cleanups go unrecorded without civic recognition or rewards.</div>
          </li>
          <li class="flex items-start space-x-3">
            <span class="text-rose-400 font-bold text-lg">•</span>
            <div><strong>Verification gap:</strong> Self-reported claims lack credibility without photographic evidence and fraud prevention.</div>
          </li>
          <li class="flex items-start space-x-3">
            <span class="text-rose-400 font-bold text-lg">•</span>
            <div><strong>No structured channel:</strong> Absence of a clean, mobile-first app for Indian street environments.</div>
          </li>
        </ul>
      </div>

      <div class="bg-emerald-950/50 p-8 rounded-3xl border-2 border-emerald-500/40 shadow-xl space-y-5">
        <h3 class="text-2xl font-bold text-emerald-300 flex items-center space-x-2">
          <span>✅</span>
          <span>Clean &amp; Earn Solution (6-Stage Cycle)</span>
        </h3>
        <div class="space-y-3 text-sm text-slate-200">
          <div class="p-3 bg-slate-900/80 rounded-xl border border-slate-700">1. <strong>Start a Mission:</strong> Select waste category (Plastic, Organic, Mixed, etc.)</div>
          <div class="p-3 bg-slate-900/80 rounded-xl border border-slate-700">2. <strong>Before State:</strong> Snap littered site &amp; auto-capture GPS coordinates</div>
          <div class="p-3 bg-slate-900/80 rounded-xl border border-slate-700">3. <strong>Clean the Area:</strong> Physical sweeping &amp; waste segregation into eco-bags</div>
          <div class="p-3 bg-slate-900/80 rounded-xl border border-slate-700">4. <strong>After Proof:</strong> Snap cleaned site + optional video walk-around proof</div>
          <div class="p-3 bg-slate-900/80 rounded-xl border border-slate-700">5. <strong>Multimodal AI Verification:</strong> Compares background landmarks &amp; grades volume</div>
          <div class="p-3 bg-slate-900/80 rounded-xl border border-slate-700">6. <strong>Earn Green Points:</strong> 20–50 points credited to user ledger &amp; leaderboard</div>
        </div>
      </div>
    </div>

    <div class="bg-slate-900 p-4 rounded-xl text-center border border-slate-800">
      <p class="text-sm text-slate-400">
        Key Idea: Transform individual cleanliness efforts into documented, verifiable community action.
      </p>
    </div>
  </div>

  <!-- ============================================== -->
  <!-- SLIDE 4: PRODUCT FLOW 1 (DASHBOARD) -->
  <!-- ============================================== -->
  <div class="slide-page bg-[#0B1329]">
    <div>
      <span class="text-sm font-bold text-emerald-400 uppercase tracking-widest block mb-2">Product Flow 1 — Volunteer Dashboard</span>
      <h2 class="text-5xl font-black text-white tracking-tight">Gamified Dashboard &amp; Points Hub</h2>
      <p class="text-lg text-slate-400 mt-1">Prominent points showcase, live civic rank, and one-tap mission launcher</p>
    </div>

    <div class="grid grid-cols-12 gap-10 items-center my-auto">
      <div class="col-span-4 flex justify-center">
        <img src="${imgDashboard}" class="rounded-3xl max-h-[720px] shadow-2xl border-2 border-slate-600">
      </div>
      <div class="col-span-8 space-y-5 text-slate-200">
        <div class="bg-slate-800/90 p-6 rounded-2xl border border-slate-700 shadow-md">
          <h4 class="font-bold text-emerald-300 text-xl mb-1">🌿 Prominent Points &amp; Level Banner</h4>
          <p class="text-slate-300 text-base leading-relaxed">Displays accumulated Eco Points (e.g. 145 pts) with animated ranks (Level 1: Scout to Level 4: Swachh Guardian) and progress to next milestone.</p>
        </div>
        <div class="bg-slate-800/90 p-6 rounded-2xl border border-slate-700 shadow-md">
          <h4 class="font-bold text-emerald-300 text-xl mb-1">🚀 Central "Start A Mission" Action Button</h4>
          <p class="text-slate-300 text-base leading-relaxed">A large, glowing button immediately invites the volunteer to initiate a cleanup mission, capturing Before and After proof on the spot.</p>
        </div>
        <div class="bg-slate-800/90 p-6 rounded-2xl border border-slate-700 shadow-md">
          <h4 class="font-bold text-amber-300 text-xl mb-1">⚡ Live Presentation Test Toolbar</h4>
          <p class="text-slate-300 text-base leading-relaxed">Allows instant one-click testing between genuine street cleanup pairs (MG Road, New Delhi) and fake meme submissions during live evaluations.</p>
        </div>
        <div class="bg-slate-800/90 p-6 rounded-2xl border border-slate-700 shadow-md">
          <h4 class="font-bold text-teal-300 text-xl mb-1">📊 Real-World Environmental Metrics</h4>
          <p class="text-slate-300 text-base leading-relaxed">Automatically tallies waste cleared (~kg), missions verified, and community impact metrics for civic transparency.</p>
        </div>
      </div>
    </div>

    <div class="text-xs text-slate-500 font-mono">Clean &amp; Earn Presentation • Dashboard Architecture</div>
  </div>

  <!-- ============================================== -->
  <!-- SLIDE 5: PRODUCT FLOW 2 (STEP 1 SETUP & GPS) -->
  <!-- ============================================== -->
  <div class="slide-page bg-[#0B1329]">
    <div>
      <span class="text-sm font-bold text-emerald-400 uppercase tracking-widest block mb-2">Product Flow 2 — Step 1: Mission Setup</span>
      <h2 class="text-5xl font-black text-white tracking-tight">Waste Classification &amp; Auto-GPS Capture</h2>
      <p class="text-lg text-slate-400 mt-1">Categorizing debris and automatically establishing location integrity</p>
    </div>

    <div class="grid grid-cols-12 gap-10 items-center my-auto">
      <div class="col-span-4 flex justify-center">
        <img src="${imgStep1}" class="rounded-3xl max-h-[720px] shadow-2xl border-2 border-slate-600">
      </div>
      <div class="col-span-8 space-y-5 text-slate-200">
        <div class="bg-slate-800/90 p-6 rounded-2xl border border-slate-700 shadow-md">
          <h4 class="font-bold text-emerald-300 text-xl mb-1">🗑️ Waste Segregation Dropdown</h4>
          <p class="text-slate-300 text-base leading-relaxed">Volunteers classify the litter type into Plastic, Organic/Food Waste, Mixed Street Litter, Construction Rubble, E-Waste, or Hazardous glass/chemicals.</p>
        </div>
        <div class="bg-slate-800/90 p-6 rounded-2xl border border-slate-700 shadow-md">
          <h4 class="font-bold text-emerald-300 text-xl mb-1">📸 Direct Camera &amp; File Capture</h4>
          <p class="text-slate-300 text-base leading-relaxed">Native HTML5 file input with accept="image/*" capture="environment", enabling mobile devices to trigger the rear camera directly with one tap.</p>
        </div>
        <div class="bg-slate-800/90 p-6 rounded-2xl border border-slate-700 shadow-md">
          <h4 class="font-bold text-teal-300 text-xl mb-1">📍 Automatic Geolocation (GPS Coordinates)</h4>
          <p class="text-slate-300 text-base leading-relaxed">When the Before photo is selected, the browser Geolocation API automatically captures the user's exact Latitude and Longitude (e.g. 28.6139° N, 77.2090° E).</p>
        </div>
        <div class="bg-slate-800/90 p-6 rounded-2xl border border-slate-700 shadow-md">
          <h4 class="font-bold text-amber-300 text-xl mb-1">🛡️ Anti-Fraud Landmark Lock</h4>
          <p class="text-slate-300 text-base leading-relaxed">Locks in the physical location to verify the After photo is taken at the exact same geographic landmark.</p>
        </div>
      </div>
    </div>

    <div class="text-xs text-slate-500 font-mono">Clean &amp; Earn Presentation • Step 1 Workflow</div>
  </div>

  <!-- ============================================== -->
  <!-- SLIDE 6: PRODUCT FLOW 3 (STEP 2 AFTER PROOF) -->
  <!-- ============================================== -->
  <div class="slide-page bg-[#0B1329]">
    <div>
      <span class="text-sm font-bold text-emerald-400 uppercase tracking-widest block mb-2">Product Flow 3 — Step 2: Cleaning Proof</span>
      <h2 class="text-5xl font-black text-white tracking-tight">Cleaned Site Proof &amp; Video Evidence</h2>
      <p class="text-lg text-slate-400 mt-1">Submitting the "After" state with reference comparison</p>
    </div>

    <div class="grid grid-cols-12 gap-10 items-center my-auto">
      <div class="col-span-4 flex justify-center">
        <img src="${imgStep2}" class="rounded-3xl max-h-[720px] shadow-2xl border-2 border-slate-600">
      </div>
      <div class="col-span-8 space-y-5 text-slate-200">
        <div class="bg-slate-800/90 p-6 rounded-2xl border border-slate-700 shadow-md">
          <h4 class="font-bold text-emerald-300 text-xl mb-1">🖼️ Reference Thumbnail for Vantage Alignment</h4>
          <p class="text-slate-300 text-base leading-relaxed">Displays the "Before" photo as a live reference banner at the top, assisting the volunteer to capture the cleaned scene from the exact same camera angle.</p>
        </div>
        <div class="bg-slate-800/90 p-6 rounded-2xl border border-slate-700 shadow-md">
          <h4 class="font-bold text-emerald-300 text-xl mb-1">✨ Proof of Cleaning ("After" Photo)</h4>
          <p class="text-slate-300 text-base leading-relaxed">Captures the swept sidewalk or street section. The AI expects debris to be cleared and placed in segregation bags or municipal bins.</p>
        </div>
        <div class="bg-slate-800/90 p-6 rounded-2xl border border-slate-700 shadow-md">
          <h4 class="font-bold text-teal-300 text-xl mb-1">🎥 Optional Video Upload Proof</h4>
          <p class="text-slate-300 text-base leading-relaxed">Supports short 5–15 second walk-around video proof. Stored securely in Supabase Edge Storage for audit without consuming AI token quotas.</p>
        </div>
        <div class="bg-slate-800/90 p-6 rounded-2xl border border-slate-700 shadow-md">
          <h4 class="font-bold text-amber-300 text-xl mb-1">🔒 Client-Side Integrity Pre-Check</h4>
          <p class="text-slate-300 text-base leading-relaxed">Pre-validates that Before and After files are not identical copies or corrupted images before dispatching to the multimodal verification engine.</p>
        </div>
      </div>
    </div>

    <div class="text-xs text-slate-500 font-mono">Clean &amp; Earn Presentation • Step 2 Proof</div>
  </div>

  <!-- ============================================== -->
  <!-- SLIDE 7: PRODUCT FLOW 4 (STEP 3 VERIFYING RADAR) -->
  <!-- ============================================== -->
  <div class="slide-page bg-[#0B1329]">
    <div>
      <span class="text-sm font-bold text-emerald-400 uppercase tracking-widest block mb-2">Product Flow 4 — Step 3: Verification Loading</span>
      <h2 class="text-5xl font-black text-white tracking-tight">Dedicated AI Verification Loading Screen</h2>
      <p class="text-lg text-slate-400 mt-1">Visual engagement with animated radar scan and multimodal intelligence</p>
    </div>

    <div class="grid grid-cols-12 gap-10 items-center my-auto">
      <div class="col-span-4 flex justify-center">
        <img src="${imgVerifying}" class="rounded-3xl max-h-[720px] shadow-2xl border-2 border-slate-600">
      </div>
      <div class="col-span-8 space-y-5 text-slate-200">
        <div class="bg-slate-800/90 p-6 rounded-2xl border border-slate-700 shadow-md">
          <h4 class="font-bold text-emerald-300 text-xl mb-1">📡 Text: "Verifying and allotting points..."</h4>
          <p class="text-slate-300 text-base leading-relaxed">Complies strictly with project specifications. Keeps the volunteer engaged with rotating radar sweeps, animated rings, and active state transitions.</p>
        </div>
        <div class="bg-slate-800/90 p-6 rounded-2xl border border-slate-700 shadow-md">
          <h4 class="font-bold text-emerald-300 text-xl mb-1">🔄 Multi-Step Dynamic Progress Tracker</h4>
          <p class="text-slate-300 text-base leading-relaxed">Displays transparent phases: "Analyzing landmarks...", "Authenticating anti-cheat...", "Measuring garbage volume...", "Calculating score (20-50 pts)".</p>
        </div>
        <div class="bg-slate-800/90 p-6 rounded-2xl border border-slate-700 shadow-md">
          <h4 class="font-bold text-teal-300 text-xl mb-1">🤖 Google Gemini 1.5 Flash Vision Multimodal Model</h4>
          <p class="text-slate-300 text-base leading-relaxed">Dispatches both photos in a structured prompt: evaluates authenticity, checks for internet memes or mismatching scenes, estimates pile volume, and scores thoroughness.</p>
        </div>
        <div class="bg-slate-800/90 p-6 rounded-2xl border border-slate-700 shadow-md">
          <h4 class="font-bold text-amber-300 text-xl mb-1">⚡ Zero-Setup Fallback Neural Verifier</h4>
          <p class="text-slate-300 text-base leading-relaxed">If an API key is omitted or during offline grading, a custom built-in heuristic neural verifier ensures seamless grading with zero crashes.</p>
        </div>
      </div>
    </div>

    <div class="text-xs text-slate-500 font-mono">Clean &amp; Earn Presentation • Step 3 Verification</div>
  </div>

  <!-- ============================================== -->
  <!-- SLIDE 8: PRODUCT FLOW 5 (RESULTS PASS VS FAIL) -->
  <!-- ============================================== -->
  <div class="slide-page bg-[#0B1329]">
    <div>
      <span class="text-sm font-bold text-emerald-400 uppercase tracking-widest block mb-2">Product Flow 5 — Verification Results</span>
      <h2 class="text-5xl font-black text-white tracking-tight">AI Evaluation: Approval vs. Anti-Cheat Rejection</h2>
      <p class="text-lg text-slate-400 mt-1">Instant feedback, transparent scoring criteria (20–50 points), and anti-cheat enforcement</p>
    </div>

    <div class="grid grid-cols-12 gap-8 items-center my-auto">
      <div class="col-span-3 text-center">
        <img src="${imgApproved}" class="rounded-2xl max-h-[660px] shadow-xl border-2 border-emerald-500 mx-auto">
        <span class="text-xs font-bold text-emerald-400 mt-2 block">✔ Genuine: +44 pts</span>
      </div>
      <div class="col-span-3 text-center">
        <img src="${imgRejected}" class="rounded-2xl max-h-[660px] shadow-xl border-2 border-rose-500 mx-auto">
        <span class="text-xs font-bold text-rose-400 mt-2 block">✖ Fake Meme: Rejected</span>
      </div>
      <div class="col-span-6 space-y-5 text-slate-200">
        <div class="bg-emerald-950/50 p-6 rounded-2xl border-2 border-emerald-500/50 shadow-md">
          <h4 class="font-bold text-emerald-300 text-xl mb-1">🎉 Scenario A: Genuine Cleanup (Approved)</h4>
          <p class="text-slate-300 text-base leading-relaxed">AI detects matching yellow curb markings and boundary wall. Pile thoroughly cleared into green eco-bag. Celebratory confetti triggers and +44 Eco Points are awarded.</p>
        </div>
        <div class="bg-rose-950/50 p-6 rounded-2xl border-2 border-rose-500/50 shadow-md">
          <h4 class="font-bold text-rose-300 text-xl mb-1">🛑 Scenario B: Internet Meme / Mismatch (Rejected)</h4>
          <p class="text-slate-300 text-base leading-relaxed">Anti-cheat detects the "After" image is an internet meme/graphic. Politely explains: "After image appears to be an internet graphic rather than the street location."</p>
        </div>
        <div class="bg-slate-800/90 p-6 rounded-2xl border border-slate-700 shadow-md">
          <h4 class="font-bold text-amber-300 text-xl mb-1">⚖️ 20–50 Points Grading Logic</h4>
          <p class="text-slate-300 text-base leading-relaxed">Small/easy cleanups receive ~20–30 pts; large, heavy debris cleanups earn ~40–50 pts. Automatically updates PostgreSQL database &amp; user ledger.</p>
        </div>
      </div>
    </div>

    <div class="text-xs text-slate-500 font-mono">Clean &amp; Earn Presentation • Verification Decisions</div>
  </div>

  <!-- ============================================== -->
  <!-- SLIDE 9: PRODUCT FLOW 6 (LEDGER & LEADERBOARD) -->
  <!-- ============================================== -->
  <div class="slide-page bg-[#0B1329]">
    <div>
      <span class="text-sm font-bold text-emerald-400 uppercase tracking-widest block mb-2">Product Flow 6 — Ledger &amp; Community</span>
      <h2 class="text-5xl font-black text-white tracking-tight">Mission History Ledger &amp; India Cleanliness League</h2>
      <p class="text-lg text-slate-400 mt-1">Permanent audit trail of verified cleanups and competitive civic motivation</p>
    </div>

    <div class="grid grid-cols-12 gap-8 items-center my-auto">
      <div class="col-span-3 text-center">
        <img src="${imgLedger}" class="rounded-2xl max-h-[660px] shadow-xl border-2 border-slate-600 mx-auto">
        <span class="text-xs font-bold text-slate-300 mt-2 block">📜 Mission Ledger</span>
      </div>
      <div class="col-span-3 text-center">
        <img src="${imgRankings}" class="rounded-2xl max-h-[660px] shadow-xl border-2 border-slate-600 mx-auto">
        <span class="text-xs font-bold text-slate-300 mt-2 block">🏆 City Leaderboard</span>
      </div>
      <div class="col-span-6 space-y-4 text-slate-200">
        <div class="bg-slate-800/90 p-5 rounded-2xl border border-slate-700 shadow-md">
          <h4 class="font-bold text-emerald-300 text-lg mb-1">📋 Verifiable Mission Ledger</h4>
          <p class="text-slate-300 text-sm leading-relaxed">Permanent record of every cleanup with timestamp, category tag, points awarded, and verbatim AI feedback quote.</p>
        </div>
        <div class="bg-slate-800/90 p-5 rounded-2xl border border-slate-700 shadow-md">
          <h4 class="font-bold text-teal-300 text-lg mb-1">📍 GPS Coordinates &amp; Google Maps Pin</h4>
          <p class="text-slate-300 text-sm leading-relaxed">Every mission links to Google Maps coordinates so municipal auditors or community members can inspect the cleaned location.</p>
        </div>
        <div class="bg-slate-800/90 p-5 rounded-2xl border border-slate-700 shadow-md">
          <h4 class="font-bold text-amber-300 text-lg mb-1">🇮🇳 City-Wide Cleanliness Rankings</h4>
          <p class="text-slate-300 text-sm leading-relaxed">Ranks Indian cities (Indore, Surat, Navi Mumbai, New Delhi, Bengaluru) and top volunteers to foster healthy civic pride.</p>
        </div>
        <div class="bg-slate-800/90 p-5 rounded-2xl border border-slate-700 shadow-md">
          <h4 class="font-bold text-emerald-300 text-lg mb-1">🔍 Before &amp; After Inspection Drawer</h4>
          <p class="text-slate-300 text-sm leading-relaxed">Tapping any mission opens a full-screen comparison modal with high-res photos and attached video proof.</p>
        </div>
      </div>
    </div>

    <div class="text-xs text-slate-500 font-mono">Clean &amp; Earn Presentation • Community Hub</div>
  </div>

  <!-- ============================================== -->
  <!-- SLIDE 10: PRACTICAL FEASIBILITY -->
  <!-- ============================================== -->
  <div class="slide-page bg-[#0B1329]">
    <div>
      <span class="text-sm font-bold text-emerald-400 uppercase tracking-widest block mb-2">Slide 3 — Feasibility Analysis</span>
      <h2 class="text-5xl font-black text-white tracking-tight">Can Clean &amp; Earn Work in Real Life?</h2>
      <p class="text-lg text-slate-400 mt-1">Assessing technical, operational, financial, and social dimensions</p>
    </div>

    <div class="grid grid-cols-2 gap-8 my-auto">
      <div class="bg-slate-800/90 p-8 rounded-3xl border border-slate-700 shadow-lg space-y-3">
        <h3 class="text-2xl font-bold text-emerald-300 flex items-center space-x-2">
          <span>💻</span>
          <span>Technical Feasibility</span>
        </h3>
        <ul class="text-slate-300 text-base space-y-2">
          <li>• Web-based mobile architecture runs on any smartphone browser without app installation barriers.</li>
          <li>• Next.js 16 + Vercel guarantees 99.9% availability and instant global CDN distribution.</li>
          <li>• Automated AI vision eliminates manual human bottleneck in photo reviews.</li>
        </ul>
      </div>

      <div class="bg-slate-800/90 p-8 rounded-3xl border border-slate-700 shadow-lg space-y-3">
        <h3 class="text-2xl font-bold text-teal-300 flex items-center space-x-2">
          <span>⚙️</span>
          <span>Operational Feasibility</span>
        </h3>
        <ul class="text-slate-300 text-base space-y-2">
          <li>• Can begin as a controlled pilot in a college campus or housing society.</li>
          <li>• Authorised student reviewers can spot-check high-value submissions.</li>
          <li>• Simple 3-step workflow requires zero prior training for volunteers.</li>
        </ul>
      </div>

      <div class="bg-slate-800/90 p-8 rounded-3xl border border-slate-700 shadow-lg space-y-3">
        <h3 class="text-2xl font-bold text-amber-300 flex items-center space-x-2">
          <span>💰</span>
          <span>Financial Feasibility</span>
        </h3>
        <ul class="text-slate-300 text-base space-y-2">
          <li>• Runs on free-tier cloud infrastructure (Vercel, Supabase PostgreSQL, Gemini free tier).</li>
          <li>• Operating costs remain zero during initial pilot phase.</li>
          <li>• Points can be redeemed for college credits or sponsored coupons.</li>
        </ul>
      </div>

      <div class="bg-slate-800/90 p-8 rounded-3xl border border-slate-700 shadow-lg space-y-3">
        <h3 class="text-2xl font-bold text-blue-300 flex items-center space-x-2">
          <span>🤝</span>
          <span>Social Feasibility</span>
        </h3>
        <ul class="text-slate-300 text-base space-y-2">
          <li>• Taps into the national Swachh Bharat civic consciousness.</li>
          <li>• Gamification turns a chore into an inspiring community achievement.</li>
          <li>• Leaderboards foster peer participation and positive peer reinforcement.</li>
        </ul>
      </div>
    </div>

    <div class="text-xs text-slate-500 font-mono">Clean &amp; Earn Presentation • Feasibility Evaluation</div>
  </div>

  <!-- ============================================== -->
  <!-- SLIDE 11: VISION & ROADMAP -->
  <!-- ============================================== -->
  <div class="slide-page bg-[#0B1329]">
    <div>
      <span class="text-sm font-bold text-emerald-400 uppercase tracking-widest block mb-2">Slide 4 — Vision &amp; Long-Term Roadmap</span>
      <h2 class="text-5xl font-black text-white tracking-tight">From a College Project to a Community Platform</h2>
      <p class="text-lg text-slate-400 mt-1">A structured 5-phase growth strategy for sustainable expansion</p>
    </div>

    <div class="my-auto space-y-8">
      <div class="bg-emerald-950/60 border border-emerald-500/40 p-6 rounded-3xl text-center shadow-lg">
        <p class="text-2xl font-bold text-emerald-300 italic">
          "To build a community where cleanliness becomes a shared habit and technology encourages people to create meaningful environmental impact."
        </p>
      </div>

      <div class="grid grid-cols-5 gap-6">
        <div class="bg-slate-800/90 p-6 rounded-2xl border-2 border-emerald-500 shadow-xl text-center space-y-3">
          <span class="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full block mx-auto w-max">Phase 1</span>
          <h4 class="font-bold text-white text-lg">Build &amp; Test</h4>
          <p class="text-xs text-slate-300 leading-relaxed">Validate core workflow with 50+ students in campus pilot.</p>
        </div>
        <div class="bg-slate-800/90 p-6 rounded-2xl border border-slate-700 shadow-lg text-center space-y-3">
          <span class="bg-slate-700 text-slate-300 text-xs font-bold px-3 py-1 rounded-full block mx-auto w-max">Phase 2</span>
          <h4 class="font-bold text-white text-lg">Engage Wards</h4>
          <p class="text-xs text-slate-300 leading-relaxed">Expand to residential welfare associations &amp; schools.</p>
        </div>
        <div class="bg-slate-800/90 p-6 rounded-2xl border border-slate-700 shadow-lg text-center space-y-3">
          <span class="bg-slate-700 text-slate-300 text-xs font-bold px-3 py-1 rounded-full block mx-auto w-max">Phase 3</span>
          <h4 class="font-bold text-white text-lg">Partnerships</h4>
          <p class="text-xs text-slate-300 leading-relaxed">Partner with municipal bodies &amp; green CSR sponsors.</p>
        </div>
        <div class="bg-slate-800/90 p-6 rounded-2xl border border-slate-700 shadow-lg text-center space-y-3">
          <span class="bg-slate-700 text-slate-300 text-xs font-bold px-3 py-1 rounded-full block mx-auto w-max">Phase 4</span>
          <h4 class="font-bold text-white text-lg">AI Upgrade</h4>
          <p class="text-xs text-slate-300 leading-relaxed">Automated waste classification &amp; smart bin integration.</p>
        </div>
        <div class="bg-slate-800/90 p-6 rounded-2xl border border-slate-700 shadow-lg text-center space-y-3">
          <span class="bg-slate-700 text-slate-300 text-xs font-bold px-3 py-1 rounded-full block mx-auto w-max">Phase 5</span>
          <h4 class="font-bold text-white text-lg">National Scale</h4>
          <p class="text-xs text-slate-300 leading-relaxed">Nationwide rollout across Indian smart cities.</p>
        </div>
      </div>
    </div>

    <div class="text-xs text-slate-500 font-mono">Clean &amp; Earn Presentation • Strategic Roadmap</div>
  </div>

  <!-- ============================================== -->
  <!-- SLIDE 12: 5-YEAR IMPACT REVIEW -->
  <!-- ============================================== -->
  <div class="slide-page bg-[#0B1329]">
    <div>
      <span class="text-sm font-bold text-emerald-400 uppercase tracking-widest block mb-2">Slide 5 — Five-Year Impact Review</span>
      <h2 class="text-5xl font-black text-white tracking-tight">How Will We Measure Real Success?</h2>
      <p class="text-lg text-slate-400 mt-1">Evaluating outcomes based on community change rather than website vanity metrics</p>
    </div>

    <div class="grid grid-cols-2 gap-8 my-auto">
      <div class="bg-slate-800/90 p-8 rounded-3xl border border-slate-700 shadow-lg space-y-3">
        <span class="text-emerald-400 font-bold text-xs uppercase tracking-wide block">1. Participation Retention</span>
        <h4 class="font-bold text-white text-2xl">Active &amp; Repeat Volunteers</h4>
        <p class="text-slate-300 text-base leading-relaxed">Measuring weekly repeat cleanups rather than vanity signup numbers. Success means habitual civic action.</p>
      </div>
      <div class="bg-slate-800/90 p-8 rounded-3xl border border-slate-700 shadow-lg space-y-3">
        <span class="text-teal-400 font-bold text-xs uppercase tracking-wide block">2. Verified Activities</span>
        <h4 class="font-bold text-white text-2xl">Audit Precision &amp; Waste Diverted</h4>
        <p class="text-slate-300 text-base leading-relaxed">Number of approved cleanup missions and total metric tons of segregated waste diverted from open streets.</p>
      </div>
      <div class="bg-slate-800/90 p-8 rounded-3xl border border-slate-700 shadow-lg space-y-3">
        <span class="text-amber-400 font-bold text-xs uppercase tracking-wide block">3. Observable Impact</span>
        <h4 class="font-bold text-white text-2xl">Cleaner Street Neighborhoods</h4>
        <p class="text-slate-300 text-base leading-relaxed">Longitudinal photographic tracking to verify that cleaned areas remain litter-free over extended periods.</p>
      </div>
      <div class="bg-slate-800/90 p-8 rounded-3xl border border-slate-700 shadow-lg space-y-3">
        <span class="text-blue-400 font-bold text-xs uppercase tracking-wide block">4. Sustainability</span>
        <h4 class="font-bold text-white text-2xl">Partnerships &amp; Operating Trust</h4>
        <p class="text-slate-300 text-base leading-relaxed">Sustaining reward funds through corporate CSR, municipal grants, and preserving user privacy.</p>
      </div>
    </div>

    <div class="text-xs text-slate-500 font-mono">Clean &amp; Earn Presentation • Impact Metrics</div>
  </div>

  <!-- ============================================== -->
  <!-- SLIDE 13: CONCLUSION -->
  <!-- ============================================== -->
  <div class="slide-page bg-gradient-to-br from-[#064E3B] via-[#022c22] to-[#064E3B] justify-center items-center text-center">
    <div class="max-w-5xl mx-auto space-y-8">
      <span class="text-sm font-bold text-emerald-400 uppercase tracking-widest block">Slide 6 — Conclusion</span>
      <h2 class="text-6xl font-black text-white tracking-tight">Small Actions. Collective Impact.</h2>

      <div class="bg-black/50 border border-emerald-500/40 rounded-3xl p-8 text-left text-lg text-slate-200 space-y-3 max-w-3xl mx-auto shadow-2xl">
        <p class="flex items-start space-x-3"><span class="text-emerald-400 font-bold">✔</span><span>Clean &amp; Earn connects community participation with photographic evidence, verification, and incentives.</span></p>
        <p class="flex items-start space-x-3"><span class="text-emerald-400 font-bold">✔</span><span>Technology provides structure and anti-fraud verification, while human habits create lasting change.</span></p>
        <p class="flex items-start space-x-3"><span class="text-emerald-400 font-bold">✔</span><span>Next step: Launch an on-ground pilot in a college/community to measure empirical results and refine verification.</span></p>
      </div>

      <div class="bg-amber-950/60 border-2 border-amber-500/50 p-8 rounded-3xl max-w-2xl mx-auto shadow-2xl">
        <p class="text-2xl font-bold text-amber-300 italic">
          "A cleaner environment begins when small individual actions become a shared community habit."
        </p>
        <p class="text-base text-amber-200/90 mt-2 font-semibold">
          Clean &amp; Earn — Encouraging Action, Rewarding Responsibility.
        </p>
      </div>

      <p class="text-lg text-emerald-300 font-bold">
        Thank You, Sir! Any Questions? • Live at https://garbage-rosy-six.vercel.app
      </p>
    </div>
  </div>

</body>
</html>
  `;

  const tempHtmlPath = path.join(__dirname, '..', 'temp_print_slides.html');
  fs.writeFileSync(tempHtmlPath, htmlContent);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
  await page.goto('file://' + tempHtmlPath, { waitUntil: 'networkidle0' });

  const pdfPath = path.join(__dirname, '..', 'Clean_and_Earn_Presentation.pdf');
  const publicPdfPath = path.join(__dirname, '..', 'public', 'Clean_and_Earn_Presentation.pdf');

  console.log('Rendering PDF with Puppeteer...');
  await page.pdf({
    path: pdfPath,
    width: '1920px',
    height: '1080px',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    preferCSSPageSize: true,
  });

  // Copy to public folder
  fs.copyFileSync(pdfPath, publicPdfPath);

  await browser.close();
  if (fs.existsSync(tempHtmlPath)) fs.unlinkSync(tempHtmlPath);

  console.log(`PDF successfully created at:\n1. ${pdfPath}\n2. ${publicPdfPath}`);
}

generatePdf().catch(err => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});
