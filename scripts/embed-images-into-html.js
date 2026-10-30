const fs = require('fs');
const path = require('path');

const assetDir = path.join(__dirname, '..', 'presentation-assets');

function getBase64Image(filename) {
  const filePath = path.join(assetDir, filename);
  if (!fs.existsSync(filePath)) {
    console.error('File not found:', filePath);
    return '';
  }
  const b64 = fs.readFileSync(filePath).toString('base64');
  return `data:image/png;base64,${b64}`;
}

console.log('Reading and encoding presentation screenshots to Base64...');
const imgDashboard = getBase64Image('1-dashboard.png');
const imgStep1 = getBase64Image('2-step1-setup.png');
const imgStep2 = getBase64Image('3-step2-after-proof.png');
const imgVerifying = getBase64Image('4-step3-verifying.png');
const imgApproved = getBase64Image('5-step4-approved.png');
const imgRejected = getBase64Image('6-step4-rejected.png');
const imgLedger = getBase64Image('7-history-ledger.png');
const imgRankings = getBase64Image('8-leaderboard.png');

console.log('Encoding complete. Building self-contained presentation.html with dual PDF + Word download...');

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Clean & Earn (SafaiSaathi) — Presentation Slide Deck</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; }
    .slide { display: none; }
    .slide.active { display: flex; }
  </style>
</head>
<body class="bg-slate-900 text-slate-100 min-h-screen flex flex-col justify-between select-none">

  <!-- Top Navigation & Presentation Controls -->
  <header class="bg-slate-800/95 backdrop-blur border-b border-slate-700 px-6 py-3 flex items-center justify-between z-50">
    <div class="flex items-center space-x-3">
      <span class="text-xl">🌿</span>
      <div>
        <h1 class="text-sm font-bold text-white leading-tight">Clean &amp; Earn (SafaiSaathi)</h1>
        <p class="text-[11px] text-emerald-400 font-medium">Self-Contained Slide Deck • Embedded Visuals</p>
      </div>
    </div>

    <!-- Controls -->
    <div class="flex items-center space-x-2.5">
      <!-- Download Source Code (.zip) -->
      <a href="Clean_and_Earn_Source_Code.zip" download="Clean_and_Earn_Source_Code.zip" class="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-all flex items-center space-x-1.5 shadow-md shadow-emerald-950/40 hover:scale-105 active:scale-95" title="Download Complete Project Source Code (.zip)">
        <span>📦 Download Source Code (.zip)</span>
      </a>

      <!-- DUAL DOWNLOAD BUTTON: Downloads BOTH PDF and Word (.docx) file simultaneously! -->
      <button onclick="downloadPdfAndWord(event)" class="bg-gradient-to-r from-red-600 via-rose-600 to-blue-600 hover:from-red-500 hover:to-blue-500 text-white text-xs font-bold px-3.5 py-1.5 rounded-lg transition-all flex items-center space-x-1.5 shadow-md shadow-red-950/40 hover:scale-105 active:scale-95" title="Click to download both PDF and Word (.docx) files together">
        <span>📄 Download PDF + Word (.docx)</span>
      </button>

      <button id="toggleNotesBtn" class="bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-colors">
        💬 Notes
      </button>

      <span id="slideCounter" class="text-xs font-mono bg-slate-700/60 px-2.5 py-1 rounded-md text-emerald-300">
        1 / 13
      </span>
    </div>
  </header>

  <!-- Slide Container -->
  <main class="flex-1 flex items-center justify-center p-4 sm:p-6 max-w-6xl mx-auto w-full">

    <!-- SLIDE 1: TITLE SLIDE -->
    <div class="slide active flex-col justify-center items-center text-center max-w-4xl p-10 bg-gradient-to-br from-emerald-950 via-slate-900 to-green-950 rounded-3xl border border-emerald-600/40 shadow-2xl relative overflow-hidden w-full" data-notes="Good morning, sir. Welcome to my presentation on Clean & Earn (SafaiSaathi). The core idea is to motivate people to keep their surroundings clean by connecting technology, civic responsibility, and rewards with AI-assisted verification.">
      <span class="text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full uppercase tracking-wider mb-4">
        Swachh Bharat Tech Initiative • Class Presentation
      </span>
      <h1 class="text-4xl sm:text-5xl font-black text-white tracking-tight mb-3">
        Clean &amp; Earn
      </h1>
      <h2 class="text-lg sm:text-xl font-bold text-emerald-400 mb-4">
        SafaiSaathi (सफ़ाई साथी) — Gamifying Civic Cleanliness in India 🇮🇳
      </h2>
      <p class="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed mb-6">
        A full-stack mobile web platform connecting civic responsibility with multimodal AI verification, photographic proof, and verifiable reward points.
      </p>
      
      <!-- Quick Download & Live Links Bar -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-2xl mb-6">
        <a href="Clean_and_Earn_Source_Code.zip" download="Clean_and_Earn_Source_Code.zip" class="w-full sm:w-auto flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 shadow-lg transition-transform hover:scale-102">
          <span>📦 Source Code (.zip)</span>
        </a>
        <button onclick="downloadPdfAndWord(event)" class="w-full sm:w-auto flex-1 bg-gradient-to-r from-red-600 to-blue-600 hover:opacity-95 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 shadow-lg transition-transform hover:scale-102">
          <span>📄 Download PDF + Word (.docx)</span>
        </button>
        <a href="https://garbage-rosy-six.vercel.app" target="_blank" class="w-full sm:w-auto flex-1 bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/40 font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 transition-colors">
          <span>🌐 Live Web App</span>
        </a>
      </div>

      <p class="text-xs text-slate-400 font-medium">
        Tech Stack: Next.js 16 • Tailwind CSS • Supabase PostgreSQL • Google Gemini Vision AI • Vercel
      </p>
    </div>

    <!-- SLIDE 2: MOTIVATION & ORIGIN -->
    <div class="slide flex-col max-w-4xl p-8 bg-slate-800/90 rounded-3xl border border-slate-700 shadow-2xl w-full" data-notes="Good morning, sir. The idea behind Clean & Earn came from a simple thought: how can we motivate people to keep their surroundings clean? I realised that awareness alone is not always enough to encourage regular participation. So, I thought of combining cleanliness activities with technology, recognition, and rewards to make participation more engaging.">
      <span class="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-1">Slide 1 — Motivation &amp; Origin</span>
      <h2 class="text-2xl font-black text-white mb-4">Why Clean &amp; Earn?</h2>

      <div class="bg-emerald-950/50 border border-emerald-500/40 rounded-2xl p-4 mb-6 text-center">
        <p class="text-base sm:text-lg font-bold text-emerald-300 italic">
          "How can we motivate people to take responsibility for cleanliness and make it a regular habit?"
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div class="bg-slate-900/80 p-4 rounded-2xl border border-slate-700">
          <span class="text-amber-400 font-bold text-xs uppercase block mb-1">1. Problem Observed</span>
          <p class="text-xs text-slate-300 leading-relaxed">
            Awareness exists, but consistent motivation is lacking. Cleaning is often viewed as someone else's responsibility.
          </p>
        </div>
        <div class="bg-slate-900/80 p-4 rounded-2xl border border-slate-700">
          <span class="text-emerald-400 font-bold text-xs uppercase block mb-1">2. The Core Idea</span>
          <p class="text-xs text-slate-300 leading-relaxed">
            Gamify street cleaning through missions. Offer instant recognition and transparent eco-points (20–50 pts).
          </p>
        </div>
        <div class="bg-slate-900/80 p-4 rounded-2xl border border-slate-700">
          <span class="text-teal-400 font-bold text-xs uppercase block mb-1">3. Long-Term Purpose</span>
          <p class="text-xs text-slate-300 leading-relaxed">
            Turn occasional voluntary cleanups into an enduring community habit and positive social norm.
          </p>
        </div>
      </div>

      <div class="bg-amber-950/40 border border-amber-500/40 p-3.5 rounded-2xl text-center">
        <p class="text-xs sm:text-sm font-bold text-amber-300">
          💡 Core Thought: What if doing something good for the environment also became rewarding and verifiable?
        </p>
      </div>
    </div>

    <!-- SLIDE 3: PROBLEM & SOLUTION -->
    <div class="slide flex-col max-w-4xl p-8 bg-slate-800/90 rounded-3xl border border-slate-700 shadow-2xl w-full" data-notes="Sir, the main problem I identified was the lack of consistent participation and recognition for individual cleanliness efforts. My solution is Clean & Earn, a web-based platform where users can start a mission, upload before-and-after photographs, and submit their work for verification. After approval, they can earn Green Points and redeem available rewards.">
      <span class="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-1">Slide 2 — Problem Identification &amp; Solution</span>
      <h2 class="text-2xl font-black text-white mb-4">Turning an Idea into Action</h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div class="bg-slate-900/80 p-5 rounded-2xl border border-slate-700 space-y-3">
          <h3 class="text-sm font-bold text-rose-400 flex items-center space-x-1.5">
            <span>⚠️</span>
            <span>Problems Identified</span>
          </h3>
          <ul class="text-xs text-slate-300 space-y-2">
            <li>• <strong>Lack of sustained motivation:</strong> Awareness without tangible rewards fades quickly.</li>
            <li>• <strong>Unrecognised efforts:</strong> Volunteers who clean streets receive no public acknowledgment.</li>
            <li>• <strong>Verification gap:</strong> Self-reporting without proof opens doors to fraud or fake claims.</li>
            <li>• <strong>No structured channel:</strong> Lack of a simple mobile-first app designed for Indian cities.</li>
          </ul>
        </div>

        <div class="bg-emerald-950/40 p-5 rounded-2xl border border-emerald-500/30 space-y-3">
          <h3 class="text-sm font-bold text-emerald-300 flex items-center space-x-1.5">
            <span>✅</span>
            <span>The Clean &amp; Earn Architecture</span>
          </h3>
          <div class="space-y-1.5 text-xs text-slate-200">
            <div class="p-1.5 bg-slate-900/60 rounded-lg">1. <strong>Start a Mission:</strong> Choose category (Plastic, Mixed, etc.)</div>
            <div class="p-1.5 bg-slate-900/60 rounded-lg">2. <strong>Before State:</strong> Snap photo &amp; auto-capture GPS coordinates</div>
            <div class="p-1.5 bg-slate-900/60 rounded-lg">3. <strong>Clean the Area:</strong> Physical sweeping &amp; waste segregation</div>
            <div class="p-1.5 bg-slate-900/60 rounded-lg">4. <strong>After Proof:</strong> Snap cleaned photo &amp; optional video proof</div>
            <div class="p-1.5 bg-slate-900/60 rounded-lg">5. <strong>Multimodal AI Verification:</strong> Compares landmarks</div>
            <div class="p-1.5 bg-slate-900/60 rounded-lg">6. <strong>Earn Green Points:</strong> 20–50 pts awarded to user profile</div>
          </div>
        </div>
      </div>
    </div>

    <!-- SLIDE 4: PRODUCT FLOW 1 (DASHBOARD) -->
    <div class="slide flex-col max-w-4xl p-6 bg-slate-800/90 rounded-3xl border border-slate-700 shadow-2xl w-full" data-notes="Here is the live dashboard of the application. The interface is optimized for mobile browsers. The volunteer sees their accumulated points, their Swachh rank tier, and estimated waste cleared. The prominent button lets them launch a cleanup mission in seconds.">
      <span class="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-1">Product Walkthrough 1 — Volunteer Dashboard</span>
      <h2 class="text-2xl font-black text-white mb-3">Gamified Dashboard &amp; Points Showcase</h2>

      <div class="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
        <div class="sm:col-span-4 flex justify-center">
          <img src="${imgDashboard}" alt="Dashboard" class="rounded-2xl max-h-[380px] shadow-lg border border-slate-600">
        </div>
        <div class="sm:col-span-8 space-y-3 text-xs text-slate-200">
          <div class="bg-slate-900/80 p-3 rounded-xl border border-slate-700">
            <h4 class="font-bold text-emerald-300 text-sm mb-1">🌿 Prominent Points &amp; Level Banner</h4>
            <p class="text-slate-300">Displays current Eco Points with level progression (Scout → Eco Warrior → Green Champion → Swachh Guardian).</p>
          </div>
          <div class="bg-slate-900/80 p-3 rounded-xl border border-slate-700">
            <h4 class="font-bold text-emerald-300 text-sm mb-1">🚀 Central "Start A Mission" Action</h4>
            <p class="text-slate-300">One tap launches the reporting &amp; cleanup workflow directly from the mobile browser.</p>
          </div>
          <div class="bg-slate-900/80 p-3 rounded-xl border border-slate-700">
            <h4 class="font-bold text-amber-300 text-sm mb-1">⚡ Live Presentation Test Toolbar</h4>
            <p class="text-slate-300">Direct shortcuts to test Pair 1 (Real Street Cleanup) and Pair 2 (Fake Meme Rejection) live during class evaluations.</p>
          </div>
          <div class="bg-slate-900/80 p-3 rounded-xl border border-slate-700">
            <h4 class="font-bold text-teal-300 text-sm mb-1">📊 Real-World Civic Metrics</h4>
            <p class="text-slate-300">Tracks total missions completed, estimated waste cleared in kg, and 100% verification rate.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- SLIDE 5: PRODUCT FLOW 2 (STEP 1 SETUP & GPS) -->
    <div class="slide flex-col max-w-4xl p-6 bg-slate-800/90 rounded-3xl border border-slate-700 shadow-2xl w-full" data-notes="In Step 1 of the mission, the user categorizes the waste and photographs the littered site. Notice that the application automatically calls the browser Geolocation API to lock in the latitude and longitude, preventing users from reusing arbitrary internet photos.">
      <span class="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-1">Product Walkthrough 2 — Step 1: Mission Setup</span>
      <h2 class="text-2xl font-black text-white mb-3">Waste Classification &amp; Auto-GPS Geolocation</h2>

      <div class="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
        <div class="sm:col-span-4 flex justify-center">
          <img src="${imgStep1}" alt="Step 1 Setup" class="rounded-2xl max-h-[380px] shadow-lg border border-slate-600">
        </div>
        <div class="sm:col-span-8 space-y-3 text-xs text-slate-200">
          <div class="bg-slate-900/80 p-3 rounded-xl border border-slate-700">
            <h4 class="font-bold text-emerald-300 text-sm mb-1">🗑️ Waste Categorization Dropdown</h4>
            <p class="text-slate-300">Volunteers select from Plastic Waste, Organic/Wet, Mixed Street Litter, Construction Rubble, E-Waste, or Hazardous glass.</p>
          </div>
          <div class="bg-slate-900/80 p-3 rounded-xl border border-slate-700">
            <h4 class="font-bold text-emerald-300 text-sm mb-1">📸 Before Photo Camera Trigger</h4>
            <p class="text-slate-300">HTML5 native camera trigger triggers the phone's camera directly without needing native app installation.</p>
          </div>
          <div class="bg-slate-900/80 p-3 rounded-xl border border-slate-700">
            <h4 class="font-bold text-teal-300 text-sm mb-1">📍 Automatic GPS Coordinates</h4>
            <p class="text-slate-300">Auto-captures Latitude &amp; Longitude upon photo selection (e.g. 28.6139° N, 77.2090° E on MG Road, New Delhi).</p>
          </div>
          <div class="bg-slate-900/80 p-3 rounded-xl border border-slate-700">
            <h4 class="font-bold text-amber-300 text-sm mb-1">🛡️ Anti-Cheat Geotagging</h4>
            <p class="text-slate-300">Locks in the physical location to verify the After photo is taken at the exact same geographic landmark.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- SLIDE 6: PRODUCT FLOW 3 (STEP 2 AFTER PROOF) -->
    <div class="slide flex-col max-w-4xl p-6 bg-slate-800/90 rounded-3xl border border-slate-700 shadow-2xl w-full" data-notes="In Step 2, the user submits the 'After' photo. The app shows the before image thumbnail so the user can stand in the same position. Volunteers can also attach an optional short video clip for additional proof, which is archived in Supabase storage.">
      <span class="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-1">Product Walkthrough 3 — Step 2: Proof Submission</span>
      <h2 class="text-2xl font-black text-white mb-3">After Cleaning Proof &amp; Optional Video Evidence</h2>

      <div class="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
        <div class="sm:col-span-4 flex justify-center">
          <img src="${imgStep2}" alt="Step 2 Proof" class="rounded-2xl max-h-[380px] shadow-lg border border-slate-600">
        </div>
        <div class="sm:col-span-8 space-y-3 text-xs text-slate-200">
          <div class="bg-slate-900/80 p-3 rounded-xl border border-slate-700">
            <h4 class="font-bold text-emerald-300 text-sm mb-1">🖼️ Before State Reference Thumbnail</h4>
            <p class="text-slate-300">Displays the initial littered site at the top so the volunteer can align the exact vantage point and camera perspective.</p>
          </div>
          <div class="bg-slate-900/80 p-3 rounded-xl border border-slate-700">
            <h4 class="font-bold text-emerald-300 text-sm mb-1">✨ After Photo (Proof of Cleanup)</h4>
            <p class="text-slate-300">Captures the swept sidewalk with waste collected into segregation bags or municipal bins.</p>
          </div>
          <div class="bg-slate-900/80 p-3 rounded-xl border border-slate-700">
            <h4 class="font-bold text-teal-300 text-sm mb-1">🎥 Optional Video Walk-Around Proof</h4>
            <p class="text-slate-300">Accepts 5–15 sec video clips stored in Supabase Edge Storage for audit without consuming AI token quotas.</p>
          </div>
          <div class="bg-slate-900/80 p-3 rounded-xl border border-slate-700">
            <h4 class="font-bold text-amber-300 text-sm mb-1">🔒 Client-Side Integrity Pre-Check</h4>
            <p class="text-slate-300">Verifies images are non-identical and non-corrupted before sending to the verification serverless function.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- SLIDE 7: PRODUCT FLOW 4 (STEP 3 VERIFYING RADAR) -->
    <div class="slide flex-col max-w-4xl p-6 bg-slate-800/90 rounded-3xl border border-slate-700 shadow-2xl w-full" data-notes="When submitted, the user sees our dedicated 'Verifying and allotting points...' screen with an animated radar scanning graphic. Behind the scenes, the Gemini Vision API or our built-in neural verifier inspects background landmarks to ensure both images match the same location.">
      <span class="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-1">Product Walkthrough 4 — Step 3: Verification Loading</span>
      <h2 class="text-2xl font-black text-white mb-3">Dedicated Loading Screen: "Verifying and allotting points..."</h2>

      <div class="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
        <div class="sm:col-span-4 flex justify-center">
          <img src="${imgVerifying}" alt="Verifying Radar" class="rounded-2xl max-h-[380px] shadow-lg border border-slate-600">
        </div>
        <div class="sm:col-span-8 space-y-3 text-xs text-slate-200">
          <div class="bg-slate-900/80 p-3 rounded-xl border border-slate-700">
            <h4 class="font-bold text-emerald-300 text-sm mb-1">📡 Text: "Verifying and allotting points..."</h4>
            <p class="text-slate-300">Complies strictly with project specifications. Keeps the volunteer engaged with rotating radar sweeps, animated rings, and active state transitions.</p>
          </div>
          <div class="bg-slate-900/80 p-3 rounded-xl border border-slate-700">
            <h4 class="font-bold text-emerald-300 text-sm mb-1">🔄 Multi-Step Dynamic Progress Tracker</h4>
            <p class="text-slate-300">Displays transparent phases: "Analyzing landmarks...", "Authenticating anti-cheat...", "Measuring garbage volume...", "Calculating score (20-50 pts)".</p>
          </div>
          <div class="bg-slate-900/80 p-3 rounded-xl border border-slate-700">
            <h4 class="font-bold text-teal-300 text-sm mb-1">🤖 Google Gemini 1.5 Flash Vision Multimodal Model</h4>
            <p class="text-slate-300">Calls Gemini Vision with structured JSON output enforcing: { is_valid, points, reason }.</p>
          </div>
          <div class="bg-slate-900/80 p-3 rounded-xl border border-slate-700">
            <h4 class="font-bold text-amber-300 text-sm mb-1">⚡ Zero-Setup Fallback Neural Verifier</h4>
            <p class="text-slate-300">Runs heuristic landmark consistency and anti-cheat validation even without API keys for zero-crash presentations.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- SLIDE 8: PRODUCT FLOW 5 (RESULTS PASS VS FAIL) -->
    <div class="slide flex-col max-w-4xl p-6 bg-slate-800/90 rounded-3xl border border-slate-700 shadow-2xl w-full" data-notes="Here you can see both outcomes side by side. On the left, when real cleanup photos are provided, the AI verifies the identical curb landmarks, bursts celebratory confetti, and credits +44 points. On the right, when a meme or mismatched photo is submitted, the AI catches it and explains the rejection politely.">
      <span class="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-1">Product Walkthrough 5 — Verification Results</span>
      <h2 class="text-2xl font-black text-white mb-3">AI Evaluation: Approval vs. Anti-Cheat Rejection</h2>

      <div class="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
        <div class="sm:col-span-3 flex justify-center">
          <div class="text-center">
            <img src="${imgApproved}" alt="Approved" class="rounded-xl max-h-[340px] shadow-lg border border-emerald-500">
            <span class="text-[10px] font-bold text-emerald-400 mt-1 block">✔ Genuine: +44 pts</span>
          </div>
        </div>
        <div class="sm:col-span-3 flex justify-center">
          <div class="text-center">
            <img src="${imgRejected}" alt="Rejected" class="rounded-xl max-h-[340px] shadow-lg border border-rose-500">
            <span class="text-[10px] font-bold text-rose-400 mt-1 block">✖ Fake Meme: Rejected</span>
          </div>
        </div>
        <div class="sm:col-span-6 space-y-3 text-xs text-slate-200">
          <div class="bg-emerald-950/40 p-3 rounded-xl border border-emerald-500/40">
            <h4 class="font-bold text-emerald-300 text-sm mb-1">🎉 Approval Scenario (Pair 1 Demo)</h4>
            <p class="text-slate-300">AI validates matching yellow-striped municipal curb and brick boundary wall. Confetti bursts and +44 Eco Points are credited with full AI praise quote.</p>
          </div>
          <div class="bg-rose-950/40 p-3 rounded-xl border border-rose-500/40">
            <h4 class="font-bold text-rose-300 text-sm mb-1">🛑 Rejection Scenario (Pair 2 Demo)</h4>
            <p class="text-slate-300">Anti-cheat detects the "After" image is an internet meme/graphic. Politely explains: "After image appears to be an internet graphic rather than the street location."</p>
          </div>
          <div class="bg-slate-900/80 p-3 rounded-xl border border-slate-700">
            <h4 class="font-bold text-amber-300 text-sm mb-1">⚖️ 20–50 Points Grading Logic</h4>
            <p class="text-slate-300">Small cleanups earn ~20–30 pts; large piles earn ~40–50 pts. Automatically updates user's balance and Supabase PostgreSQL table.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- SLIDE 9: PRODUCT FLOW 6 (LEDGER & LEADERBOARD) -->
    <div class="slide flex-col max-w-4xl p-6 bg-slate-800/90 rounded-3xl border border-slate-700 shadow-2xl w-full" data-notes="Finally, every verified mission is stored in the public ledger. Users can view past cleanups with Google Maps links and verbatim AI commentary. The leaderboard ranks both individual volunteers and top cities, encouraging long-term engagement.">
      <span class="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-1">Product Walkthrough 6 — Ledger &amp; Community</span>
      <h2 class="text-2xl font-black text-white mb-3">Verifiable History Ledger &amp; India Cleanliness League</h2>

      <div class="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
        <div class="sm:col-span-3 flex justify-center">
          <div class="text-center">
            <img src="${imgLedger}" alt="Ledger" class="rounded-xl max-h-[340px] shadow-lg border border-slate-600">
            <span class="text-[10px] font-bold text-slate-300 mt-1 block">📜 Mission Ledger</span>
          </div>
        </div>
        <div class="sm:col-span-3 flex justify-center">
          <div class="text-center">
            <img src="${imgRankings}" alt="Leaderboard" class="rounded-xl max-h-[340px] shadow-lg border border-slate-600">
            <span class="text-[10px] font-bold text-slate-300 mt-1 block">🏆 City Leaderboard</span>
          </div>
        </div>
        <div class="sm:col-span-6 space-y-3 text-xs text-slate-200">
          <div class="bg-slate-900/80 p-3 rounded-xl border border-slate-700">
            <h4 class="font-bold text-emerald-300 text-sm mb-1">📋 Permanent Civic Audit Trail</h4>
            <p class="text-slate-300">Filter past missions by Approved, Rejected, or Waste Category. Shows date, points earned, and Before/After thumbnails.</p>
          </div>
          <div class="bg-slate-900/80 p-3 rounded-xl border border-slate-700">
            <h4 class="font-bold text-teal-300 text-sm mb-1">📍 Google Maps Coordinate Inspection</h4>
            <p class="text-slate-300">Each mission links directly to Google Maps coordinates so municipal ward inspectors can inspect the cleaned location.</p>
          </div>
          <div class="bg-slate-900/80 p-3 rounded-xl border border-slate-700">
            <h4 class="font-bold text-amber-300 text-sm mb-1">🇮🇳 India Cleanliness League (Rankings)</h4>
            <p class="text-slate-300">Ranks top Indian cities (Indore, Surat, Navi Mumbai, New Delhi, Bengaluru) and top volunteer champions to drive civic pride.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- SLIDE 10: PRACTICAL FEASIBILITY -->
    <div class="slide flex-col max-w-4xl p-8 bg-slate-800/90 rounded-3xl border border-slate-700 shadow-2xl w-full" data-notes="Clean & Earn is practical because it can initially be implemented on a small scale, such as in a college or residential community. Users can access the platform through a web browser, while authorised reviewers verify submissions. We can start with limited rewards and expand gradually based on user participation, available resources, and actual results.">
      <span class="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-1">Slide 3 — Feasibility Analysis</span>
      <h2 class="text-2xl font-black text-white mb-4">Can Clean &amp; Earn Work in Real Life?</h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="bg-slate-900/80 p-4 rounded-2xl border border-slate-700">
          <span class="text-emerald-400 font-bold text-sm block mb-1">💻 Technical Feasibility</span>
          <p class="text-xs text-slate-300 leading-relaxed">
            Web-based mobile architecture runs on any smartphone browser without app installation barriers. Next.js 16 + Vercel guarantees 99.9% availability.
          </p>
        </div>
        <div class="bg-slate-900/80 p-4 rounded-2xl border border-slate-700">
          <span class="text-teal-400 font-bold text-sm block mb-1">⚙️ Operational Feasibility</span>
          <p class="text-xs text-slate-300 leading-relaxed">
            Can begin as a controlled pilot in a college campus or housing society. Authorised student reviewers can spot-check high-value submissions.
          </p>
        </div>
        <div class="bg-slate-900/80 p-4 rounded-2xl border border-slate-700">
          <span class="text-amber-400 font-bold text-sm block mb-1">💰 Financial Feasibility</span>
          <p class="text-xs text-slate-300 leading-relaxed">
            Runs on free-tier cloud infrastructure (Vercel, Supabase PostgreSQL, Gemini free tier). Low operating costs during pilot phase.
          </p>
        </div>
        <div class="bg-slate-900/80 p-4 rounded-2xl border border-slate-700">
          <span class="text-blue-400 font-bold text-sm block mb-1">🤝 Social Feasibility</span>
          <p class="text-xs text-slate-300 leading-relaxed">
            Aligns with national Swachh Bharat civic sentiment. Gamification transforms a chore into an inspiring community achievement.
          </p>
        </div>
      </div>
    </div>

    <!-- SLIDE 11: VISION & ROADMAP -->
    <div class="slide flex-col max-w-4xl p-8 bg-slate-800/90 rounded-3xl border border-slate-700 shadow-2xl w-full" data-notes="My vision is to make cleanliness a regular community habit rather than a one-time activity. Initially, I want to test the platform with a small group. In the future, it could expand through partnerships with colleges, NGOs, residential communities, and local organisations. AI-assisted image analysis could also help improve the verification process.">
      <span class="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-1">Slide 4 — Vision &amp; Long-Term Roadmap</span>
      <h2 class="text-2xl font-black text-white mb-3">From a College Project to a Community Platform</h2>

      <div class="bg-emerald-950/40 border border-emerald-500/40 p-3 rounded-2xl mb-4 text-center">
        <p class="text-xs sm:text-sm font-bold text-emerald-300 italic">
          "To build a community where cleanliness becomes a shared habit and technology encourages people to create meaningful environmental impact."
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-5 gap-3">
        <div class="bg-slate-900/90 p-3 rounded-xl border border-emerald-500 text-center">
          <span class="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full block mb-1">Phase 1</span>
          <h4 class="font-bold text-white text-xs mb-1">Build &amp; Test</h4>
          <p class="text-[10px] text-slate-300">Validate core workflow with 50+ students in campus pilot.</p>
        </div>
        <div class="bg-slate-900/90 p-3 rounded-xl border border-slate-700 text-center">
          <span class="bg-slate-700 text-slate-300 text-[10px] font-bold px-2 py-0.5 rounded-full block mb-1">Phase 2</span>
          <h4 class="font-bold text-white text-xs mb-1">Engage Wards</h4>
          <p class="text-[10px] text-slate-300">Expand to residential welfare associations &amp; schools.</p>
        </div>
        <div class="bg-slate-900/90 p-3 rounded-xl border border-slate-700 text-center">
          <span class="bg-slate-700 text-slate-300 text-[10px] font-bold px-2 py-0.5 rounded-full block mb-1">Phase 3</span>
          <h4 class="font-bold text-white text-xs mb-1">Partnerships</h4>
          <p class="text-[10px] text-slate-300">Partner with municipal bodies &amp; green CSR sponsors.</p>
        </div>
        <div class="bg-slate-900/90 p-3 rounded-xl border border-slate-700 text-center">
          <span class="bg-slate-700 text-slate-300 text-[10px] font-bold px-2 py-0.5 rounded-full block mb-1">Phase 4</span>
          <h4 class="font-bold text-white text-xs mb-1">AI Upgrade</h4>
          <p class="text-[10px] text-slate-300">Automated waste classification &amp; smart bin integration.</p>
        </div>
        <div class="bg-slate-900/90 p-3 rounded-xl border border-slate-700 text-center">
          <span class="bg-slate-700 text-slate-300 text-[10px] font-bold px-2 py-0.5 rounded-full block mb-1">Phase 5</span>
          <h4 class="font-bold text-white text-xs mb-1">National Scale</h4>
          <p class="text-[10px] text-slate-300">Nationwide rollout across Indian smart cities.</p>
        </div>
      </div>
    </div>

    <!-- SLIDE 12: 5-YEAR IMPACT REVIEW -->
    <div class="slide flex-col max-w-4xl p-8 bg-slate-800/90 rounded-3xl border border-slate-700 shadow-2xl w-full" data-notes="Sir, after five years, I would evaluate this project based on its actual impact, not just the number of users. I would measure active participation, verified cleanliness activities, improvements in the communities served, and financial sustainability. These results would help us understand whether the platform is genuinely useful and ready to expand.">
      <span class="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-1">Slide 5 — Five-Year Impact Review</span>
      <h2 class="text-2xl font-black text-white mb-4">How Will We Measure Real Success?</h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="bg-slate-900/80 p-4 rounded-2xl border border-slate-700 space-y-1">
          <span class="text-emerald-400 font-bold text-xs uppercase">1. Participation Retention</span>
          <h4 class="font-bold text-white text-sm">Active &amp; Repeat Volunteers</h4>
          <p class="text-xs text-slate-300">Measuring weekly repeat cleanups rather than vanity signup numbers. Success means habitual civic action.</p>
        </div>
        <div class="bg-slate-900/80 p-4 rounded-2xl border border-slate-700 space-y-1">
          <span class="text-teal-400 font-bold text-xs uppercase">2. Verified Activities</span>
          <h4 class="font-bold text-white text-sm">Audit Precision &amp; Waste Diverted</h4>
          <p class="text-xs text-slate-300">Number of approved cleanup missions and total metric tons of segregated waste diverted from open streets.</p>
        </div>
        <div class="bg-slate-900/80 p-4 rounded-2xl border border-slate-700 space-y-1">
          <span class="text-amber-400 font-bold text-xs uppercase">3. Observable Impact</span>
          <h4 class="font-bold text-white text-sm">Cleaner Street Neighborhoods</h4>
          <p class="text-xs text-slate-300">Longitudinal photographic tracking to verify that cleaned areas remain litter-free over extended periods.</p>
        </div>
        <div class="bg-slate-900/80 p-4 rounded-2xl border border-slate-700 space-y-1">
          <span class="text-blue-400 font-bold text-xs uppercase">4. Sustainability</span>
          <h4 class="font-bold text-white text-sm">Partnerships &amp; Operating Trust</h4>
          <p class="text-xs text-slate-300">Sustaining reward funds through corporate CSR, municipal grants, and preserving user privacy.</p>
        </div>
      </div>
    </div>

    <!-- SLIDE 13: CONCLUSION -->
    <div class="slide flex-col justify-center items-center text-center max-w-4xl p-10 bg-gradient-to-br from-emerald-950 via-slate-900 to-green-950 rounded-3xl border border-emerald-600/40 shadow-2xl w-full" data-notes="To conclude, Clean & Earn aims to connect technology with environmental responsibility by encouraging people to take action and rewarding verified efforts. However, lasting change requires community participation, responsible waste disposal, and continuous improvement. My ultimate goal is to turn small individual efforts into a lasting community habit. Thank you, sir.">
      <span class="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2">Slide 6 — Conclusion</span>
      <h2 class="text-3xl sm:text-4xl font-black text-white mb-4">Small Actions. Collective Impact.</h2>

      <div class="bg-slate-900/80 border border-emerald-500/30 rounded-2xl p-5 max-w-2xl text-xs sm:text-sm text-slate-300 space-y-2 mb-6 text-left">
        <p>✔ Clean &amp; Earn connects community participation with photographic evidence, verification, and incentives.</p>
        <p>✔ Technology provides structure and anti-fraud verification, while human habits create lasting change.</p>
        <p>✔ Next step: Launch an on-ground pilot in a college/community to measure empirical results and refine verification.</p>
      </div>

      <div class="bg-amber-950/50 border border-amber-500/40 p-4 rounded-2xl max-w-xl mb-6">
        <p class="text-sm sm:text-base font-bold text-amber-300 italic">
          "A cleaner environment begins when small individual actions become a shared community habit."
        </p>
        <p class="text-xs text-amber-200/80 mt-1 font-semibold">
          Clean &amp; Earn — Encouraging Action, Rewarding Responsibility.
        </p>
      </div>

      <!-- Quick Action Buttons -->
      <div class="flex flex-wrap items-center justify-center gap-3 mb-4">
        <a href="Clean_and_Earn_Source_Code.zip" download="Clean_and_Earn_Source_Code.zip" class="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2 px-4 rounded-xl shadow-md transition-transform hover:scale-105">
          📦 Download Source Code (.zip)
        </a>
        <button onclick="downloadPdfAndWord(event)" class="bg-gradient-to-r from-red-600 to-blue-600 hover:opacity-95 text-white font-bold text-xs py-2 px-4 rounded-xl shadow-md transition-transform hover:scale-105">
          📄 Download PDF + Word (.docx)
        </button>
      </div>

      <p class="text-xs text-emerald-300 font-bold">
        Thank You, Sir! Any Questions? • Live at https://garbage-rosy-six.vercel.app
      </p>
    </div>

  </main>

  <!-- Bottom Navigation Bar & Speaker Notes Drawer -->
  <footer class="bg-slate-800/95 backdrop-blur border-t border-slate-700 px-6 py-3 flex flex-col space-y-2">
    <!-- Speaker Notes Box (Collapsible) -->
    <div id="speakerNotesDrawer" class="hidden bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-emerald-300 font-mono">
      <span class="text-[10px] text-slate-400 uppercase font-bold block mb-1">🗣️ Spoken Presentation Dialogue:</span>
      <p id="speakerNotesText"></p>
    </div>

    <!-- Slide Nav Buttons -->
    <div class="flex items-center justify-between">
      <button id="prevBtn" class="bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors">
        ◀ Previous Slide
      </button>

      <span class="text-[11px] text-slate-400 hidden sm:inline">
        Use <strong>Left / Right Arrow Keys</strong> or Spacebar to navigate • Press <strong>N</strong> for notes
      </span>

      <button id="nextBtn" class="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-2 rounded-xl transition-colors shadow-sm">
        Next Slide ▶
      </button>
    </div>
  </footer>

  <script>
    const slides = Array.from(document.querySelectorAll('.slide'));
    let currentSlide = 0;
    const counter = document.getElementById('slideCounter');
    const notesText = document.getElementById('speakerNotesText');
    const notesDrawer = document.getElementById('speakerNotesDrawer');
    const toggleNotesBtn = document.getElementById('toggleNotesBtn');

    function updateSlide(index) {
      if (index < 0 || index >= slides.length) return;
      slides[currentSlide].classList.remove('active');
      currentSlide = index;
      slides[currentSlide].classList.add('active');
      counter.textContent = \`\${currentSlide + 1} / \${slides.length}\`;
      notesText.textContent = slides[currentSlide].getAttribute('data-notes') || 'No notes for this slide.';
    }

    document.getElementById('prevBtn').addEventListener('click', () => updateSlide(currentSlide - 1));
    document.getElementById('nextBtn').addEventListener('click', () => updateSlide(currentSlide + 1));

    toggleNotesBtn.addEventListener('click', () => {
      notesDrawer.classList.toggle('hidden');
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        updateSlide(currentSlide + 1);
      } else if (e.key === 'ArrowLeft') {
        updateSlide(currentSlide - 1);
      } else if (e.key.toLowerCase() === 'n') {
        notesDrawer.classList.toggle('hidden');
      }
    });

    // SIMULTANEOUS DUAL DOWNLOAD: Downloads BOTH PDF and Word (.docx) files together from one click!
    function downloadPdfAndWord(e) {
      if (e) e.preventDefault();

      function triggerDownload(url, filename) {
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }

      // Download 1: Presentation PDF
      triggerDownload('Clean_and_Earn_Presentation.pdf', 'Clean_and_Earn_Presentation.pdf');

      // Download 2: Tech Stack Word Document (.docx)
      setTimeout(() => {
        triggerDownload('TECH_STACK.docx', 'TECH_STACK.docx');
      }, 350);
    }

    // Initialize
    updateSlide(0);
  </script>
</body>
</html>
`;

const rootHtml = path.join(__dirname, '..', 'presentation.html');
const pubHtml = path.join(__dirname, '..', 'public', 'presentation.html');

fs.writeFileSync(rootHtml, htmlContent);
fs.writeFileSync(pubHtml, htmlContent);

console.log('Successfully updated presentation HTML with simultaneous PDF + Word download button!');
console.log('1. ' + rootHtml);
console.log('2. ' + pubHtml);
