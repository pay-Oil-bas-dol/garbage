const fs = require('fs');
const path = require('path');

const assetDir = path.join(__dirname, '..', 'presentation-assets');
const svgsDir = path.join(__dirname, '..', 'public', 'mermaid-svgs');

function getBase64Image(filename) {
  const filePath = path.join(assetDir, filename);
  if (!fs.existsSync(filePath)) {
    console.error('File not found:', filePath);
    return '';
  }
  const b64 = fs.readFileSync(filePath).toString('base64');
  return `data:image/png;base64,${b64}`;
}

function getSvgContent(filename) {
  const filePath = path.join(svgsDir, filename);
  if (!fs.existsSync(filePath)) {
    console.error('SVG not found:', filePath);
    return '';
  }
  let svg = fs.readFileSync(filePath, 'utf8');
  svg = svg.replace(/style="[^"]*"/, 'style="max-width: 100%; max-height: 100%; width: 100%; height: 100%; display: block; margin: auto;"');
  return svg;
}

console.log('Reading presentation screenshots, background SVG, and light-theme Mermaid SVGs...');
const imgDashboard = getBase64Image('1-dashboard.png');
const imgStep1 = getBase64Image('2-step1-setup.png');
const imgStep2 = getBase64Image('3-step2-after-proof.png');
const imgVerifying = getBase64Image('4-step3-verifying.png');
const imgApproved = getBase64Image('5-step4-approved.png');
const imgRejected = getBase64Image('6-step4-rejected.png');
const imgLedger = getBase64Image('7-history-ledger.png');
const imgRankings = getBase64Image('8-leaderboard.png');

const svgUserFlow = getSvgContent('userFlow.svg');
const svgUiuxState = getSvgContent('uiuxState.svg');
const svgAiSequence = getSvgContent('aiSequence.svg');
const svgTechArch = getSvgContent('techArch.svg');

// 10% opacity nature / recycling / green leaves background vector
const natureSvgPath = path.join(__dirname, '..', 'public', 'nature-recycling-bg.svg');
const natureSvg = fs.readFileSync(natureSvgPath, 'utf8');
const natureB64 = Buffer.from(natureSvg).toString('base64');
const natureDataUri = `data:image/svg+xml;base64,${natureB64}`;

console.log('Building high-contrast Light Green / Cream interactive 18-slide presentation deck with enlarged typography...');

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Clean &amp; Earn (SafaiSaathi) — Light Green Cream Presentation</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: #F8FAF6;
    }
    pre, code, .font-mono { font-family: 'JetBrains Mono', monospace; }
    .slide { display: none; }
    .slide.active { display: flex; }
    .pan-zoom-container {
      user-select: none;
      -webkit-user-select: none;
      touch-action: none;
    }
    .pan-zoom-content {
      will-change: transform;
      transform-origin: center center;
    }
    .nature-bg-pattern {
      background-image: url('${natureDataUri}');
      background-repeat: repeat;
      background-size: 360px 360px;
      opacity: 0.10;
    }
    .light-card-shadow {
      box-shadow: 0 20px 40px -15px rgba(6, 78, 59, 0.08), 0 0 1px 1px rgba(16, 185, 129, 0.2);
    }
  </style>
</head>
<body class="bg-[#F8FAF6] text-slate-800 min-h-screen flex flex-col justify-between select-none relative overflow-x-hidden">

  <!-- Fixed 10% Opacity Nature & Leaves Background Overlay -->
  <div class="fixed inset-0 pointer-events-none z-0 nature-bg-pattern"></div>

  <!-- Top Navigation & Presentation Controls (Light Theme) -->
  <header class="bg-white/95 backdrop-blur-md border-b-2 border-emerald-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between z-50 sticky top-0 shadow-md">
    <div class="flex items-center space-x-3.5">
      <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-green-700 flex items-center justify-center text-xl font-bold text-white shadow-md shadow-emerald-950/20">
        🌱
      </div>
      <div>
        <h1 class="text-base sm:text-lg font-black text-slate-900 leading-tight flex items-center gap-2">
          Clean &amp; Earn (SafaiSaathi)
          <span class="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-0.5 rounded-full font-bold border border-emerald-300 hidden sm:inline">18 Slides • Light Green Theme</span>
        </h1>
        <p class="text-xs sm:text-sm text-emerald-700 font-semibold">Interactive Presentation • Draggable Flows • 10% Opacity Nature Background</p>
      </div>
    </div>

    <!-- Top Action Buttons -->
    <div class="flex items-center space-x-2.5">
      <!-- Download Source Code (.zip) -->
      <a href="Clean_and_Earn_Source_Code.zip" download="Clean_and_Earn_Source_Code.zip" class="bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold px-3.5 py-2 rounded-xl transition-all flex items-center space-x-1.5 shadow-md hover:scale-105 active:scale-95" title="Download Complete Project Source Code (.zip)">
        <span>📦 Source Code (.zip)</span>
      </a>

      <!-- DUAL DOWNLOAD BUTTON: Downloads BOTH PDF and Word (.docx) file simultaneously! -->
      <button onclick="downloadPdfAndWord(event)" class="bg-gradient-to-r from-emerald-700 via-teal-700 to-green-800 hover:opacity-95 text-white text-xs sm:text-sm font-bold px-3.5 py-2 rounded-xl transition-all flex items-center space-x-1.5 shadow-md hover:scale-105 active:scale-95" title="Click to download both PDF and Word (.docx) files together">
        <span>📄 PDF + Word (.docx)</span>
      </button>

      <!-- Speaker Notes Toggle -->
      <button id="toggleNotesBtn" class="bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs sm:text-sm font-bold px-3 py-2 rounded-xl transition-colors border border-emerald-300 shadow-sm">
        🎙️ Notes
      </button>

      <!-- Slide Counter -->
      <span id="slideCounter" class="text-xs sm:text-sm font-mono font-black bg-emerald-100/90 px-3.5 py-2 rounded-xl text-emerald-900 border border-emerald-300 shadow-sm">
        1 / 18
      </span>
    </div>
  </header>

  <!-- Slide Container -->
  <main class="flex-1 flex items-center justify-center p-4 sm:p-8 max-w-7xl mx-auto w-full z-10 relative">

    <!-- ========================================== -->
    <!-- SLIDE 1: TITLE SLIDE (LIGHT GREEN CREAM)   -->
    <!-- ========================================== -->
    <div class="slide active flex-col justify-center items-center text-center max-w-5xl p-8 sm:p-14 bg-gradient-to-br from-emerald-50/95 via-white/95 to-green-50/95 rounded-3xl border-2 border-emerald-300/80 light-card-shadow relative overflow-hidden w-full" data-notes="Good morning, sir. Welcome to my presentation on Clean & Earn (SafaiSaathi). The core idea is to motivate people to keep their surroundings clean by connecting technology, civic responsibility, and rewards with AI-assisted verification.">
      <div class="absolute -top-24 -right-24 w-80 h-80 bg-emerald-200/40 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute -bottom-24 -left-24 w-80 h-80 bg-green-200/40 rounded-full blur-3xl pointer-events-none"></div>

      <div class="inline-flex items-center space-x-2 bg-emerald-100/90 border border-emerald-300 px-4 py-1.5 rounded-full text-emerald-900 text-xs sm:text-sm font-black uppercase tracking-wider mb-6 shadow-sm">
        <span>🇮🇳 Swachh Bharat Environmental Gamification</span>
      </div>

      <h1 class="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight mb-4">
        Clean &amp; Earn
        <span class="block text-3xl sm:text-4xl font-extrabold text-emerald-700 mt-2 font-sans">
          सफ़ाई साथी (SafaiSaathi)
        </span>
      </h1>

      <p class="text-base sm:text-xl text-slate-700 max-w-3xl mx-auto mb-8 leading-relaxed font-medium">
        Transforming individual cleanliness efforts into verified, rewarded, and habitual civic action using mobile image capture, GPS geotagging, and Google Gemini Multimodal Vision AI.
      </p>

      <!-- Quick Action Buttons -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-2xl mb-8">
        <a href="Clean_and_Earn_Source_Code.zip" download="Clean_and_Earn_Source_Code.zip" class="w-full sm:w-auto flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-5 rounded-2xl text-sm sm:text-base flex items-center justify-center space-x-2 shadow-lg transition-transform hover:scale-105">
          <span>📦 Download Source Code (.zip)</span>
        </a>
        <button onclick="downloadPdfAndWord(event)" class="w-full sm:w-auto flex-1 bg-gradient-to-r from-emerald-700 to-green-800 hover:opacity-95 text-white font-bold py-3 px-5 rounded-2xl text-sm sm:text-base flex items-center justify-center space-x-2 shadow-lg transition-transform hover:scale-105">
          <span>📄 Download PDF + Word (.docx)</span>
        </button>
        <a href="https://garbage-rosy-six.vercel.app" target="_blank" class="w-full sm:w-auto flex-1 bg-white hover:bg-emerald-50 text-emerald-800 border-2 border-emerald-400 font-bold py-3 px-5 rounded-2xl text-sm sm:text-base flex items-center justify-center space-x-2 transition-colors shadow-sm">
          <span>🌐 Live Web App ↗</span>
        </a>
      </div>

      <div class="bg-emerald-100/70 border border-emerald-300/80 px-5 py-2.5 rounded-xl">
        <p class="text-sm sm:text-base text-emerald-950 font-bold">
          Core Stack: Next.js 16 • Tailwind CSS • Supabase PostgreSQL • Google Gemini Vision AI • Vercel
        </p>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- SLIDE 2: MOTIVATION & ORIGIN               -->
    <!-- ========================================== -->
    <div class="slide flex-col max-w-5xl p-8 sm:p-12 bg-white/95 rounded-3xl border-2 border-emerald-200/90 light-card-shadow w-full" data-notes="Good morning, sir. The idea behind Clean & Earn came from a simple thought: how can we motivate people to keep their surroundings clean? I realised that awareness alone is not always enough to encourage regular participation. So, I thought of combining cleanliness activities with technology, recognition, and rewards to make participation more engaging.">
      <div class="inline-block bg-emerald-100/90 text-emerald-800 text-xs sm:text-sm font-black px-3.5 py-1 rounded-full uppercase tracking-wider mb-2 border border-emerald-300 w-fit">
        Slide 2 — Motivation &amp; Origin
      </div>
      <h2 class="text-3xl sm:text-4xl font-black text-slate-900 mb-3">Why Clean &amp; Earn?</h2>
      <p class="text-base sm:text-lg text-slate-600 mb-6 italic font-medium">
        "Cleanliness is a shared responsibility, yet people do not always participate actively in keeping their surroundings clean."
      </p>

      <div class="bg-emerald-50/90 border-2 border-emerald-300/80 rounded-2xl p-6 mb-6">
        <span class="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-emerald-800 block mb-1">The Core Catalyst Question</span>
        <p class="text-xl sm:text-2xl font-black text-emerald-950">
          "How can we motivate people to take responsibility for cleanliness and make it a regular habit?"
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
        <div class="bg-amber-50/80 p-5 rounded-2xl border-2 border-amber-200 space-y-2">
          <span class="text-amber-800 text-xs sm:text-sm font-black uppercase tracking-wider block">1. Problem Observed</span>
          <p class="text-sm sm:text-base text-slate-700 font-medium">Limited motivation for consistent community participation and unrewarded civic efforts.</p>
        </div>
        <div class="bg-emerald-50/80 p-5 rounded-2xl border-2 border-emerald-200 space-y-2">
          <span class="text-emerald-800 text-xs sm:text-sm font-black uppercase tracking-wider block">2. The Solution Idea</span>
          <p class="text-sm sm:text-base text-slate-700 font-medium">Make cleanliness engaging through structured missions, photo evidence, and a tangible Green Points economy.</p>
        </div>
        <div class="bg-teal-50/80 p-5 rounded-2xl border-2 border-teal-200 space-y-2">
          <span class="text-teal-800 text-xs sm:text-sm font-black uppercase tracking-wider block">3. The Civic Purpose</span>
          <p class="text-sm sm:text-base text-slate-700 font-medium">Encourage citizens to turn small individual cleanup actions into lasting, shared community habits.</p>
        </div>
      </div>

      <div class="bg-emerald-100/70 p-4 rounded-2xl border border-emerald-300 text-center">
        <span class="text-sm sm:text-base text-emerald-950 font-black uppercase tracking-wider">Core Guiding Thought:</span>
        <span class="text-sm sm:text-base text-slate-800 font-bold ml-2">What if doing something good for the environment also became rewarding, verifiable, and habitual?</span>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- SLIDE 3: PROBLEM & SOLUTION                -->
    <!-- ========================================== -->
    <div class="slide flex-col max-w-5xl p-8 sm:p-12 bg-white/95 rounded-3xl border-2 border-emerald-200/90 light-card-shadow w-full" data-notes="Sir, the main problem I identified was the lack of consistent participation and recognition for individual cleanliness efforts. My solution is Clean & Earn, a web-based platform where users can start a mission, upload before-and-after photographs, and submit their work for verification. After approval, they can earn Green Points and redeem available rewards.">
      <div class="inline-block bg-emerald-100/90 text-emerald-800 text-xs sm:text-sm font-black px-3.5 py-1 rounded-full uppercase tracking-wider mb-2 border border-emerald-300 w-fit">
        Slide 3 — Problem &amp; Proposed Solution
      </div>
      <h2 class="text-3xl sm:text-4xl font-black text-slate-900 mb-4">Turning an Idea into Action</h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div class="bg-red-50/90 border-2 border-red-200 rounded-2xl p-6 space-y-3">
          <h3 class="text-base sm:text-lg font-black uppercase tracking-wider text-red-800 flex items-center gap-2">
            <span>⚠️</span> Current Problems Identified
          </h3>
          <ul class="text-sm sm:text-base text-slate-700 space-y-2 font-medium">
            <li>• Awareness exists, but consistent motivation to participate is lacking.</li>
            <li>• Individual cleanup efforts often go unrecognised, unrecorded, and uncelebrated.</li>
            <li>• Claims of completed activities lack an objective, fraud-proof verification mechanism.</li>
          </ul>
        </div>

        <div class="bg-emerald-50/90 border-2 border-emerald-300 rounded-2xl p-6 space-y-3">
          <h3 class="text-base sm:text-lg font-black uppercase tracking-wider text-emerald-800 flex items-center gap-2">
            <span>✨</span> Clean &amp; Earn Solution
          </h3>
          <ul class="text-sm sm:text-base text-slate-700 space-y-2 font-medium">
            <li>• Mobile web-first platform accessible on any device without mandatory app store downloads.</li>
            <li>• Dual-photo proof (Before &amp; After) with automatic hardware GPS lock.</li>
            <li>• Google Gemini AI verification verifies authenticity and awards Green Points instantly.</li>
          </ul>
        </div>
      </div>

      <div class="bg-emerald-100/60 border-2 border-emerald-300/80 rounded-2xl p-5 mb-4">
        <span class="text-xs sm:text-sm font-black text-emerald-900 uppercase tracking-wider block mb-3">The Closed-Loop Civic Action Lifecycle</span>
        <div class="flex flex-wrap items-center justify-between gap-3 text-sm sm:text-base font-bold text-slate-800">
          <span class="bg-white px-4 py-2 rounded-xl border-2 border-emerald-200 shadow-sm">1. Start Mission</span>
          <span class="text-emerald-700 font-black text-lg">→</span>
          <span class="bg-white px-4 py-2 rounded-xl border-2 border-emerald-200 shadow-sm">2. Clean Area</span>
          <span class="text-emerald-700 font-black text-lg">→</span>
          <span class="bg-white px-4 py-2 rounded-xl border-2 border-emerald-200 shadow-sm">3. Before/After Photos</span>
          <span class="text-emerald-700 font-black text-lg">→</span>
          <span class="bg-white px-4 py-2 rounded-xl border-2 border-emerald-200 shadow-sm">4. AI Verification</span>
          <span class="text-emerald-700 font-black text-lg">→</span>
          <span class="bg-emerald-600 text-white px-4 py-2 rounded-xl shadow-md font-black">5. Green Points!</span>
        </div>
      </div>

      <p class="text-sm sm:text-base text-slate-600 text-center font-bold">
        Key Architectural Principle: Transform individual cleanliness efforts into documented, auditable, and verifiable community impact.
      </p>
    </div>

    <!-- ========================================== -->
    <!-- SLIDE 4: USER FLOW (MERMAID PAN & ZOOM)    -->
    <!-- ========================================== -->
    <div class="slide flex-col max-w-6xl p-6 sm:p-8 bg-white/95 rounded-3xl border-2 border-emerald-200/90 light-card-shadow w-full" data-notes="This diagram illustrates the complete 5-phase user journey. Starting from discovery and onboarding, the user initiates a mission with GPS lock and photo proof. After the physical cleanup, the Next.js serverless route passes the pair to Google Gemini 1.5 Flash Vision. Upon approval, points are credited atomically and the transformation is stored in the public ledger. You can use the zoom and drag controls above to inspect any phase of this flow.">
      <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div>
          <div class="inline-block bg-emerald-100/90 text-emerald-800 text-xs sm:text-sm font-black px-3.5 py-1 rounded-full uppercase tracking-wider mb-1 border border-emerald-300">
            Slide 4 — End-to-End User Flow
          </div>
          <h2 class="text-2xl sm:text-3xl font-black text-slate-900">Interactive 5-Phase Citizen Journey</h2>
        </div>
        <span class="text-xs sm:text-sm text-emerald-900 font-mono font-bold bg-emerald-100/80 px-3 py-1.5 rounded-xl border border-emerald-300">
          Onboarding → Mission Setup → Physical Action → AI Verification → Rewards
        </span>
      </div>

      <!-- Pan & Zoom Diagram Container (Light Theme) -->
      <div id="container-userFlow" class="pan-zoom-container relative w-full h-[460px] sm:h-[520px] bg-emerald-50/30 rounded-2xl border-2 border-emerald-200 overflow-hidden cursor-grab shadow-inner select-none flex items-center justify-center">
        <!-- Floating Controls Toolbar -->
        <div class="diagram-controls absolute top-3 right-3 z-30 flex items-center space-x-2 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border-2 border-emerald-200 shadow-xl">
          <span class="text-xs sm:text-sm text-emerald-800 font-black hidden sm:inline mr-1">✋ Drag to Pan</span>
          <button onclick="panZoomInstances['userFlow'].zoomOut()" class="w-8 h-8 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300 text-base font-black flex items-center justify-center transition-all shadow-sm active:scale-95" title="Zoom Out">−</button>
          <span id="zoom-badge-userFlow" class="text-xs sm:text-sm font-mono font-black text-emerald-900 min-w-[46px] text-center">100%</span>
          <button onclick="panZoomInstances['userFlow'].zoomIn()" class="w-8 h-8 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300 text-base font-black flex items-center justify-center transition-all shadow-sm active:scale-95" title="Zoom In">+</button>
          <button onclick="panZoomInstances['userFlow'].reset()" class="px-3 h-8 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold flex items-center gap-1 transition-all shadow-sm active:scale-95" title="Reset View">⟲ Reset</button>
        </div>
        <!-- Bottom Hint -->
        <div class="absolute bottom-2.5 left-3 z-20 pointer-events-none">
          <span class="text-xs font-mono bg-white/90 text-emerald-900 font-bold px-2.5 py-1 rounded-lg border border-emerald-200 shadow-sm">
            💡 Drag with mouse/touch • Mouse Wheel: Zoom in/out
          </span>
        </div>
        <!-- Diagram SVG Content -->
        <div id="content-userFlow" class="pan-zoom-content w-full h-full flex items-center justify-center p-3">
          ${svgUserFlow}
        </div>
      </div>

      <!-- Bottom Phase Pill Highlights -->
      <div class="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-3.5 text-center">
        <div class="bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-200 text-xs sm:text-sm">
          <span class="text-emerald-800 font-black block">1. Discovery</span>
          <span class="text-slate-600 font-medium">Zero-friction guest session</span>
        </div>
        <div class="bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-200 text-xs sm:text-sm">
          <span class="text-teal-800 font-black block">2. Setup</span>
          <span class="text-slate-600 font-medium">Category &amp; GPS geotag</span>
        </div>
        <div class="bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-200 text-xs sm:text-sm">
          <span class="text-blue-800 font-black block">3. Cleanup</span>
          <span class="text-slate-600 font-medium">Physical sweeping &amp; proof</span>
        </div>
        <div class="bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-200 text-xs sm:text-sm">
          <span class="text-indigo-800 font-black block">4. Gemini AI</span>
          <span class="text-slate-600 font-medium">Landmark &amp; volume audit</span>
        </div>
        <div class="bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-200 text-xs sm:text-sm col-span-2 sm:col-span-1">
          <span class="text-amber-800 font-black block">5. Reward</span>
          <span class="text-slate-600 font-medium">Ledger &amp; Green Points</span>
        </div>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- SLIDE 5: UI/UX STATE MACHINE (PAN & ZOOM)  -->
    <!-- ========================================== -->
    <div class="slide flex-col max-w-6xl p-6 sm:p-8 bg-white/95 rounded-3xl border-2 border-emerald-200/90 light-card-shadow w-full" data-notes="This diagram shows our UI/UX screen state machine. Built specifically for mobile outdoor use, the user can navigate between the Dashboard, Mission Wizard 4-step sequence, History Ledger, and Leaderboard. The flow handles camera permissions, retry states for rejected uploads, and celebratory animations seamlessly.">
      <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div>
          <div class="inline-block bg-emerald-100/90 text-emerald-800 text-xs sm:text-sm font-black px-3.5 py-1 rounded-full uppercase tracking-wider mb-1 border border-emerald-300">
            Slide 5 — UI/UX Screen Architecture
          </div>
          <h2 class="text-2xl sm:text-3xl font-black text-slate-900">Mobile Screen Navigation &amp; State Machine</h2>
        </div>
        <span class="text-xs sm:text-sm text-emerald-900 font-mono font-bold bg-emerald-100/80 px-3 py-1.5 rounded-xl border border-emerald-300">
          Dashboard ⇄ MissionWizard (Steps 1-4) ⇄ Ledger ⇄ Leaderboard
        </span>
      </div>

      <!-- Pan & Zoom Diagram Container -->
      <div id="container-uiuxState" class="pan-zoom-container relative w-full h-[460px] sm:h-[520px] bg-emerald-50/30 rounded-2xl border-2 border-emerald-200 overflow-hidden cursor-grab shadow-inner select-none flex items-center justify-center">
        <!-- Floating Controls Toolbar -->
        <div class="diagram-controls absolute top-3 right-3 z-30 flex items-center space-x-2 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border-2 border-emerald-200 shadow-xl">
          <span class="text-xs sm:text-sm text-emerald-800 font-black hidden sm:inline mr-1">✋ Drag to Pan</span>
          <button onclick="panZoomInstances['uiuxState'].zoomOut()" class="w-8 h-8 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300 text-base font-black flex items-center justify-center transition-all shadow-sm active:scale-95" title="Zoom Out">−</button>
          <span id="zoom-badge-uiuxState" class="text-xs sm:text-sm font-mono font-black text-emerald-900 min-w-[46px] text-center">100%</span>
          <button onclick="panZoomInstances['uiuxState'].zoomIn()" class="w-8 h-8 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300 text-base font-black flex items-center justify-center transition-all shadow-sm active:scale-95" title="Zoom In">+</button>
          <button onclick="panZoomInstances['uiuxState'].reset()" class="px-3 h-8 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold flex items-center gap-1 transition-all shadow-sm active:scale-95" title="Reset View">⟲ Reset</button>
        </div>
        <!-- Bottom Hint -->
        <div class="absolute bottom-2.5 left-3 z-20 pointer-events-none">
          <span class="text-xs font-mono bg-white/90 text-emerald-900 font-bold px-2.5 py-1 rounded-lg border border-emerald-200 shadow-sm">
            💡 Drag with mouse/touch • Mouse Wheel: Zoom in/out
          </span>
        </div>
        <!-- Diagram SVG Content -->
        <div id="content-uiuxState" class="pan-zoom-content w-full h-full flex items-center justify-center p-3">
          ${svgUiuxState}
        </div>
      </div>

      <!-- UX Design Principles -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3.5 text-xs sm:text-sm">
        <div class="bg-emerald-50/80 p-3.5 rounded-xl border border-emerald-200">
          <span class="text-emerald-900 font-black block mb-1">☀️ High Outdoor Legibility</span>
          <p class="text-slate-700 font-medium">High-contrast sage theme with emerald action pills designed for bright tropical sunlight.</p>
        </div>
        <div class="bg-teal-50/80 p-3.5 rounded-xl border border-teal-200">
          <span class="text-teal-900 font-black block mb-1">👍 Thumb-Zone First</span>
          <p class="text-slate-700 font-medium">Primary action buttons and navigation pinned to bottom 30% of screen for one-handed operation.</p>
        </div>
        <div class="bg-indigo-50/80 p-3.5 rounded-xl border border-indigo-200">
          <span class="text-indigo-900 font-black block mb-1">✨ Dopamine Feedback</span>
          <p class="text-slate-700 font-medium">Dynamic canvas-confetti, live points increment animation, and before/after interactive slider.</p>
        </div>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- SLIDE 6: PRODUCT FLOW 1 (DASHBOARD)        -->
    <!-- ========================================== -->
    <div class="slide flex-col max-w-5xl p-6 sm:p-10 bg-white/95 rounded-3xl border-2 border-emerald-200/90 light-card-shadow w-full" data-notes="Here is the live dashboard of the application. The interface is optimized for mobile browsers. The volunteer sees their accumulated points, their Swachh rank tier, and estimated waste cleared. The prominent button lets them launch a cleanup mission in seconds.">
      <div class="flex items-center justify-between mb-4">
        <div>
          <div class="inline-block bg-emerald-100/90 text-emerald-800 text-xs sm:text-sm font-black px-3.5 py-1 rounded-full uppercase tracking-wider mb-1 border border-emerald-300">
            Slide 6 — Product Walkthrough
          </div>
          <h2 class="text-2xl sm:text-3xl font-black text-slate-900">Live Citizen Dashboard</h2>
        </div>
        <span class="bg-emerald-100 text-emerald-900 text-xs sm:text-sm px-3.5 py-1.5 rounded-xl font-mono font-bold border border-emerald-300">Step 0 — Overview</span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
        <div class="flex justify-center">
          <img src="${imgDashboard}" alt="Clean and Earn Dashboard" class="h-80 sm:h-96 rounded-2xl shadow-xl border-4 border-emerald-200 object-contain bg-white" />
        </div>
        <div class="space-y-4">
          <div class="bg-emerald-50/90 p-4 rounded-2xl border border-emerald-200">
            <h4 class="font-black text-slate-900 text-base sm:text-lg mb-1 text-emerald-800">1. Instant Impact Header</h4>
            <p class="text-slate-700 text-sm sm:text-base font-medium">Persistent Green Points balance, Swachh Bharat mascot, and quick city switcher (New Delhi / Mumbai / Bengaluru).</p>
          </div>
          <div class="bg-teal-50/90 p-4 rounded-2xl border border-teal-200">
            <h4 class="font-black text-slate-900 text-base sm:text-lg mb-1 text-teal-800">2. Hero Stats &amp; Motivation</h4>
            <p class="text-slate-700 text-sm sm:text-base font-medium">Displays total verified missions, estimated kg of waste cleared, and dynamic civic quotes.</p>
          </div>
          <div class="bg-green-50/90 p-4 rounded-2xl border border-green-200">
            <h4 class="font-black text-slate-900 text-base sm:text-lg mb-1 text-green-800">3. 1-Tap Mission Launcher</h4>
            <p class="text-slate-700 text-sm sm:text-base font-medium">Prominent "Start Clean Mission" floating action button plus pre-loaded 1-click test demo pairs for testing.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- SLIDE 7: PRODUCT FLOW 2 (STEP 1 SETUP)     -->
    <!-- ========================================== -->
    <div class="slide flex-col max-w-5xl p-6 sm:p-10 bg-white/95 rounded-3xl border-2 border-emerald-200/90 light-card-shadow w-full" data-notes="In Step 1 of the mission, the user categorizes the waste and photographs the littered site. Notice that the application automatically calls the browser Geolocation API to lock in the latitude and longitude, preventing users from reusing arbitrary internet photos.">
      <div class="flex items-center justify-between mb-4">
        <div>
          <div class="inline-block bg-emerald-100/90 text-emerald-800 text-xs sm:text-sm font-black px-3.5 py-1 rounded-full uppercase tracking-wider mb-1 border border-emerald-300">
            Slide 7 — Product Walkthrough
          </div>
          <h2 class="text-2xl sm:text-3xl font-black text-slate-900">Mission Step 1 — Categorization &amp; Geotagging</h2>
        </div>
        <span class="bg-emerald-100 text-emerald-900 text-xs sm:text-sm px-3.5 py-1.5 rounded-xl font-mono font-bold border border-emerald-300">Step 1 — Setup</span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
        <div class="flex justify-center">
          <img src="${imgStep1}" alt="Mission Step 1 Setup" class="h-80 sm:h-96 rounded-2xl shadow-xl border-4 border-emerald-200 object-contain bg-white" />
        </div>
        <div class="space-y-4">
          <div class="bg-emerald-50/90 p-4 rounded-2xl border border-emerald-200">
            <h4 class="font-black text-slate-900 text-base sm:text-lg mb-1 text-emerald-800">1. Waste Categorization Grid</h4>
            <p class="text-slate-700 text-sm sm:text-base font-medium">Tactile selection for Plastic 🥤, Mixed 🗑️, Organic 🍂, Construction 🧱, E-Waste 🔋, or Hazardous ⚠️.</p>
          </div>
          <div class="bg-teal-50/90 p-4 rounded-2xl border border-teal-200">
            <h4 class="font-black text-slate-900 text-base sm:text-lg mb-1 text-teal-800">2. Automatic GPS Geotag Lock</h4>
            <p class="text-slate-700 text-sm sm:text-base font-medium">Direct integration with device GPS coordinates (Lat/Long) locks physical location bounds before camera triggers.</p>
          </div>
          <div class="bg-green-50/90 p-4 rounded-2xl border border-green-200">
            <h4 class="font-black text-slate-900 text-base sm:text-lg mb-1 text-green-800">3. "Before" Photo Viewfinder</h4>
            <p class="text-slate-700 text-sm sm:text-base font-medium">Direct access to native mobile rear camera with instant client-side thumbnail validation.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- SLIDE 8: PRODUCT FLOW 3 (STEP 2 AFTER)     -->
    <!-- ========================================== -->
    <div class="slide flex-col max-w-5xl p-6 sm:p-10 bg-white/95 rounded-3xl border-2 border-emerald-200/90 light-card-shadow w-full" data-notes="In Step 2, the user submits the 'After' photo. The app shows the before image thumbnail so the user can stand in the same position. Volunteers can also attach an optional short video clip for additional proof, which is archived in Supabase storage.">
      <div class="flex items-center justify-between mb-4">
        <div>
          <div class="inline-block bg-emerald-100/90 text-emerald-800 text-xs sm:text-sm font-black px-3.5 py-1 rounded-full uppercase tracking-wider mb-1 border border-emerald-300">
            Slide 8 — Product Walkthrough
          </div>
          <h2 class="text-2xl sm:text-3xl font-black text-slate-900">Mission Step 2 — Dual-Proof Capture</h2>
        </div>
        <span class="bg-emerald-100 text-emerald-900 text-xs sm:text-sm px-3.5 py-1.5 rounded-xl font-mono font-bold border border-emerald-300">Step 2 — Proof</span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
        <div class="flex justify-center">
          <img src="${imgStep2}" alt="Mission Step 2 Proof" class="h-80 sm:h-96 rounded-2xl shadow-xl border-4 border-emerald-200 object-contain bg-white" />
        </div>
        <div class="space-y-4">
          <div class="bg-emerald-50/90 p-4 rounded-2xl border border-emerald-200">
            <h4 class="font-black text-slate-900 text-base sm:text-lg mb-1 text-emerald-800">1. Side-by-Side Angle Helper</h4>
            <p class="text-slate-700 text-sm sm:text-base font-medium">Small floating preview of the "Before" photo assists the user in aligning landmarks (curb lines, walls, cracks).</p>
          </div>
          <div class="bg-teal-50/90 p-4 rounded-2xl border border-teal-200">
            <h4 class="font-black text-slate-900 text-base sm:text-lg mb-1 text-teal-800">2. "After" Photo Capture</h4>
            <p class="text-slate-700 text-sm sm:text-base font-medium">Captures cleaned street area with bagged waste ready for municipal collection.</p>
          </div>
          <div class="bg-green-50/90 p-4 rounded-2xl border border-green-200">
            <h4 class="font-black text-slate-900 text-base sm:text-lg mb-1 text-green-800">3. Optional Video Audit Field</h4>
            <p class="text-slate-700 text-sm sm:text-base font-medium">Supports 360-degree video walkthrough upload for government or corporate CSR audits.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- SLIDE 9: PRODUCT FLOW 4 (STEP 3 SCANNER)   -->
    <!-- ========================================== -->
    <div class="slide flex-col max-w-5xl p-6 sm:p-10 bg-white/95 rounded-3xl border-2 border-emerald-200/90 light-card-shadow w-full" data-notes="When submitted, the user sees our dedicated 'Verifying and allotting points...' screen with an animated radar scanning graphic. Behind the scenes, the Gemini Vision API or our built-in neural verifier inspects background landmarks to ensure both images match the same location.">
      <div class="flex items-center justify-between mb-4">
        <div>
          <div class="inline-block bg-emerald-100/90 text-emerald-800 text-xs sm:text-sm font-black px-3.5 py-1 rounded-full uppercase tracking-wider mb-1 border border-emerald-300">
            Slide 9 — Product Walkthrough
          </div>
          <h2 class="text-2xl sm:text-3xl font-black text-slate-900">Mission Step 3 — AI Radar Scanner</h2>
        </div>
        <span class="bg-emerald-100 text-emerald-900 text-xs sm:text-sm px-3.5 py-1.5 rounded-xl font-mono font-bold border border-emerald-300">Step 3 — Analysis</span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
        <div class="flex justify-center">
          <img src="${imgVerifying}" alt="AI Verification Radar Scanner" class="h-80 sm:h-96 rounded-2xl shadow-xl border-4 border-emerald-200 object-contain bg-white" />
        </div>
        <div class="space-y-4">
          <div class="bg-emerald-50/90 p-4 rounded-2xl border border-emerald-200">
            <h4 class="font-black text-slate-900 text-base sm:text-lg mb-1 text-emerald-800">1. Animated Radar Graphic</h4>
            <p class="text-slate-700 text-sm sm:text-base font-medium">Pulsing concentric scanner indicates real-time backend vision processing with clear status text.</p>
          </div>
          <div class="bg-teal-50/90 p-4 rounded-2xl border border-teal-200">
            <h4 class="font-black text-slate-900 text-base sm:text-lg mb-1 text-teal-800">2. Multi-Stage Visual Verification</h4>
            <p class="text-slate-700 text-sm sm:text-base font-medium">"Checking GPS bounds...", "Scanning spatial landmarks...", and "Evaluating trash reduction volume...".</p>
          </div>
          <div class="bg-green-50/90 p-4 rounded-2xl border border-green-200">
            <h4 class="font-black text-slate-900 text-base sm:text-lg mb-1 text-green-800">3. Low Cognitive Friction</h4>
            <p class="text-slate-700 text-sm sm:text-base font-medium">Verification typically finishes within 1.2 to 2.5 seconds over standard mobile 4G/5G connections.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- SLIDE 10: PRODUCT FLOW 5 (PASS VS FAIL)    -->
    <!-- ========================================== -->
    <div class="slide flex-col max-w-5xl p-6 sm:p-10 bg-white/95 rounded-3xl border-2 border-emerald-200/90 light-card-shadow w-full" data-notes="Here you can see both outcomes side by side. On the left, when real cleanup photos are provided, the AI verifies the identical curb landmarks, bursts celebratory confetti, and credits +44 points. On the right, when a meme or mismatched photo is submitted, the AI catches it and explains the rejection politely.">
      <div class="flex items-center justify-between mb-4">
        <div>
          <div class="inline-block bg-emerald-100/90 text-emerald-800 text-xs sm:text-sm font-black px-3.5 py-1 rounded-full uppercase tracking-wider mb-1 border border-emerald-300">
            Slide 10 — Product Walkthrough
          </div>
          <h2 class="text-2xl sm:text-3xl font-black text-slate-900">Step 4 — Verification Outcomes &amp; Anti-Fraud</h2>
        </div>
        <span class="bg-emerald-100 text-emerald-900 text-xs sm:text-sm px-3.5 py-1.5 rounded-xl font-mono font-bold border border-emerald-300">Step 4 — Results</span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <!-- APPROVED STATE -->
        <div class="bg-emerald-50/90 border-2 border-emerald-300 rounded-2xl p-5 flex flex-col items-center">
          <span class="text-sm sm:text-base font-black text-emerald-900 uppercase tracking-wider mb-3">Outcome A: Approved (+44 Points)</span>
          <img src="${imgApproved}" alt="Approved Clean Mission" class="h-64 sm:h-72 rounded-xl shadow-md border-2 border-emerald-300 object-contain bg-white" />
          <p class="text-xs sm:text-sm text-emerald-950 font-bold mt-3 text-center">
            Canvas-confetti burst, score allotment pill, and detailed vision reasoning breakdown.
          </p>
        </div>

        <!-- REJECTED STATE -->
        <div class="bg-red-50/90 border-2 border-red-300 rounded-2xl p-5 flex flex-col items-center">
          <span class="text-sm sm:text-base font-black text-red-900 uppercase tracking-wider mb-3">Outcome B: Rejected (Anti-Fraud)</span>
          <img src="${imgRejected}" alt="Rejected Mission Anti Fraud" class="h-64 sm:h-72 rounded-xl shadow-md border-2 border-red-300 object-contain bg-white" />
          <p class="text-xs sm:text-sm text-red-950 font-bold mt-3 text-center">
            Detects memes, unrelated images, or duplicate before/after files with constructive retry advice.
          </p>
        </div>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- SLIDE 11: PRODUCT FLOW 6 (LEDGER & RANKS)  -->
    <!-- ========================================== -->
    <div class="slide flex-col max-w-5xl p-6 sm:p-10 bg-white/95 rounded-3xl border-2 border-emerald-200/90 light-card-shadow w-full" data-notes="Finally, every verified mission is stored in the public ledger. Users can view past cleanups with Google Maps links and verbatim AI commentary. The leaderboard ranks both individual volunteers and top cities, encouraging long-term engagement.">
      <div class="flex items-center justify-between mb-4">
        <div>
          <div class="inline-block bg-emerald-100/90 text-emerald-800 text-xs sm:text-sm font-black px-3.5 py-1 rounded-full uppercase tracking-wider mb-1 border border-emerald-300">
            Slide 11 — Product Walkthrough
          </div>
          <h2 class="text-2xl sm:text-3xl font-black text-slate-900">Public History Ledger &amp; Civic Leaderboard</h2>
        </div>
        <span class="bg-emerald-100 text-emerald-900 text-xs sm:text-sm px-3.5 py-1.5 rounded-xl font-mono font-bold border border-emerald-300">Engagement</span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <!-- HISTORY LEDGER -->
        <div class="bg-emerald-50/80 border-2 border-emerald-200 rounded-2xl p-5 flex flex-col items-center">
          <span class="text-sm sm:text-base font-black text-emerald-900 uppercase tracking-wider mb-3">Interactive Proof Ledger</span>
          <img src="${imgLedger}" alt="History Ledger" class="h-64 sm:h-72 rounded-xl shadow-md border-2 border-emerald-200 object-contain bg-white" />
          <p class="text-xs sm:text-sm text-slate-700 font-bold mt-3 text-center">
            Interactive Before/After draggable split slider, timestamps, and Google Maps pin links.
          </p>
        </div>

        <!-- LEADERBOARD -->
        <div class="bg-amber-50/80 border-2 border-amber-200 rounded-2xl p-5 flex flex-col items-center">
          <span class="text-sm sm:text-base font-black text-amber-900 uppercase tracking-wider mb-3">City &amp; National Rankings</span>
          <img src="${imgRankings}" alt="Leaderboard Rankings" class="h-64 sm:h-72 rounded-xl shadow-md border-2 border-amber-200 object-contain bg-white" />
          <p class="text-xs sm:text-sm text-slate-700 font-bold mt-3 text-center">
            Gold, Silver, Bronze badges, user rank highlight, and city-level cleanliness competitions.
          </p>
        </div>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- SLIDE 12: AI SEQUENCE (PAN & ZOOM)         -->
    <!-- ========================================== -->
    <div class="slide flex-col max-w-6xl p-6 sm:p-8 bg-white/95 rounded-3xl border-2 border-emerald-200/90 light-card-shadow w-full" data-notes="This sequence diagram explains our backend AI verification pipeline. When the client posts to /api/verify, the route handles Base64 decoding and sends a structured multimodal prompt to Google Gemini 1.5 Flash Vision. The AI assesses spatial landmarks and returns strict JSON scoring. If approved, an atomic PostgreSQL trigger handles the points calculation immediately.">
      <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div>
          <div class="inline-block bg-emerald-100/90 text-emerald-800 text-xs sm:text-sm font-black px-3.5 py-1 rounded-full uppercase tracking-wider mb-1 border border-emerald-300">
            Slide 12 — AI Pipeline &amp; Sequence
          </div>
          <h2 class="text-2xl sm:text-3xl font-black text-slate-900">Multimodal Vision Verification Sequence</h2>
        </div>
        <span class="text-xs sm:text-sm text-emerald-900 font-mono font-bold bg-emerald-100/80 px-3 py-1.5 rounded-xl border border-emerald-300">
          Client ⇄ Next.js Route ⇄ Gemini 1.5 Vision ⇄ Supabase DB
        </span>
      </div>

      <!-- Pan & Zoom Diagram Container -->
      <div id="container-aiSequence" class="pan-zoom-container relative w-full h-[460px] sm:h-[520px] bg-emerald-50/30 rounded-2xl border-2 border-emerald-200 overflow-hidden cursor-grab shadow-inner select-none flex items-center justify-center">
        <!-- Floating Controls Toolbar -->
        <div class="diagram-controls absolute top-3 right-3 z-30 flex items-center space-x-2 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border-2 border-emerald-200 shadow-xl">
          <span class="text-xs sm:text-sm text-emerald-800 font-black hidden sm:inline mr-1">✋ Drag to Pan</span>
          <button onclick="panZoomInstances['aiSequence'].zoomOut()" class="w-8 h-8 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300 text-base font-black flex items-center justify-center transition-all shadow-sm active:scale-95" title="Zoom Out">−</button>
          <span id="zoom-badge-aiSequence" class="text-xs sm:text-sm font-mono font-black text-emerald-900 min-w-[46px] text-center">100%</span>
          <button onclick="panZoomInstances['aiSequence'].zoomIn()" class="w-8 h-8 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300 text-base font-black flex items-center justify-center transition-all shadow-sm active:scale-95" title="Zoom In">+</button>
          <button onclick="panZoomInstances['aiSequence'].reset()" class="px-3 h-8 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold flex items-center gap-1 transition-all shadow-sm active:scale-95" title="Reset View">⟲ Reset</button>
        </div>
        <!-- Bottom Hint -->
        <div class="absolute bottom-2.5 left-3 z-20 pointer-events-none">
          <span class="text-xs font-mono bg-white/90 text-emerald-900 font-bold px-2.5 py-1 rounded-lg border border-emerald-200 shadow-sm">
            💡 Drag with mouse/touch • Mouse Wheel: Zoom in/out
          </span>
        </div>
        <!-- Diagram SVG Content -->
        <div id="content-aiSequence" class="pan-zoom-content w-full h-full flex items-center justify-center p-3">
          ${svgAiSequence}
        </div>
      </div>

      <!-- Technical Callouts -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3.5 text-xs sm:text-sm">
        <div class="bg-emerald-50/80 p-3.5 rounded-xl border border-emerald-200">
          <span class="text-emerald-900 font-black block mb-1">🤖 Gemini 1.5 Flash Vision</span>
          <p class="text-slate-700 font-medium">Sub-2s latency multimodal model checks curb lines, background buildings, and sidewalk cracks.</p>
        </div>
        <div class="bg-teal-50/80 p-3.5 rounded-xl border border-teal-200">
          <span class="text-teal-900 font-black block mb-1">🛡️ Zero-Cost Fallback Engine</span>
          <p class="text-slate-700 font-medium">Built-in neural-verifier handles demo pairs and offline evaluation without requiring external keys.</p>
        </div>
        <div class="bg-green-50/80 p-3.5 rounded-xl border border-green-200">
          <span class="text-green-900 font-black block mb-1">⚡ Atomic SQL Trigger</span>
          <p class="text-slate-700 font-medium">PostgreSQL handle_mission_points() triggers automatically upon approved mission inserts.</p>
        </div>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- SLIDE 13: TECH ARCHITECTURE (PAN & ZOOM)   -->
    <!-- ========================================== -->
    <div class="slide flex-col max-w-6xl p-6 sm:p-8 bg-white/95 rounded-3xl border-2 border-emerald-200/90 light-card-shadow w-full" data-notes="This slide presents the full 6-layer cloud-native technology architecture. From the mobile presentation layer using Next.js 16 and Tailwind CSS, through our serverless route handlers, Google Gemini Vision, down to Supabase PostgreSQL with Row-Level Security, hosted globally on Vercel's Edge Network.">
      <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div>
          <div class="inline-block bg-emerald-100/90 text-emerald-800 text-xs sm:text-sm font-black px-3.5 py-1 rounded-full uppercase tracking-wider mb-1 border border-emerald-300">
            Slide 13 — System Architecture
          </div>
          <h2 class="text-2xl sm:text-3xl font-black text-slate-900">6-Tier System &amp; Technology Stack Architecture</h2>
        </div>
        <span class="text-xs sm:text-sm text-emerald-900 font-mono font-bold bg-emerald-100/80 px-3 py-1.5 rounded-xl border border-emerald-300">
          Cloud-Native • Serverless • Edge-Distributed
        </span>
      </div>

      <!-- Pan & Zoom Diagram Container -->
      <div id="container-techArch" class="pan-zoom-container relative w-full h-[460px] sm:h-[520px] bg-emerald-50/30 rounded-2xl border-2 border-emerald-200 overflow-hidden cursor-grab shadow-inner select-none flex items-center justify-center">
        <!-- Floating Controls Toolbar -->
        <div class="diagram-controls absolute top-3 right-3 z-30 flex items-center space-x-2 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border-2 border-emerald-200 shadow-xl">
          <span class="text-xs sm:text-sm text-emerald-800 font-black hidden sm:inline mr-1">✋ Drag to Pan</span>
          <button onclick="panZoomInstances['techArch'].zoomOut()" class="w-8 h-8 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300 text-base font-black flex items-center justify-center transition-all shadow-sm active:scale-95" title="Zoom Out">−</button>
          <span id="zoom-badge-techArch" class="text-xs sm:text-sm font-mono font-black text-emerald-900 min-w-[46px] text-center">100%</span>
          <button onclick="panZoomInstances['techArch'].zoomIn()" class="w-8 h-8 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300 text-base font-black flex items-center justify-center transition-all shadow-sm active:scale-95" title="Zoom In">+</button>
          <button onclick="panZoomInstances['techArch'].reset()" class="px-3 h-8 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold flex items-center gap-1 transition-all shadow-sm active:scale-95" title="Reset View">⟲ Reset</button>
        </div>
        <!-- Bottom Hint -->
        <div class="absolute bottom-2.5 left-3 z-20 pointer-events-none">
          <span class="text-xs font-mono bg-white/90 text-emerald-900 font-bold px-2.5 py-1 rounded-lg border border-emerald-200 shadow-sm">
            💡 Drag with mouse/touch • Mouse Wheel: Zoom in/out
          </span>
        </div>
        <!-- Diagram SVG Content -->
        <div id="content-techArch" class="pan-zoom-content w-full h-full flex items-center justify-center p-3">
          ${svgTechArch}
        </div>
      </div>

      <!-- 6 Layers Quick Summary -->
      <div class="grid grid-cols-2 sm:grid-cols-6 gap-2.5 mt-3.5 text-center text-xs sm:text-sm">
        <div class="bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-200">
          <span class="text-emerald-900 font-black block">1. Presentation</span>
          <span class="text-slate-600 font-medium">Next.js 16 &amp; Tailwind</span>
        </div>
        <div class="bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-200">
          <span class="text-teal-900 font-black block">2. Persistence</span>
          <span class="text-slate-600 font-medium">LocalStorage &amp; SDK</span>
        </div>
        <div class="bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-200">
          <span class="text-blue-900 font-black block">3. Serverless</span>
          <span class="text-slate-600 font-medium">Route Handlers (Node 24)</span>
        </div>
        <div class="bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-200">
          <span class="text-indigo-900 font-black block">4. AI &amp; Vision</span>
          <span class="text-slate-600 font-medium">Gemini 1.5 Flash</span>
        </div>
        <div class="bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-200">
          <span class="text-purple-900 font-black block">5. Database</span>
          <span class="text-slate-600 font-medium">Supabase SQL &amp; S3</span>
        </div>
        <div class="bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-200">
          <span class="text-amber-900 font-black block">6. Edge Infra</span>
          <span class="text-slate-600 font-medium">Vercel Global Edge</span>
        </div>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- SLIDE 14: TECH MATRIX SPECIFICATION TABLE  -->
    <!-- ========================================== -->
    <div class="slide flex-col max-w-6xl p-6 sm:p-10 bg-white/95 rounded-3xl border-2 border-emerald-200/90 light-card-shadow w-full" data-notes="This table summarizes the official engineering stack and implementation details. Each layer was selected for high performance, zero idle hosting costs, and native offline resilience on mobile devices.">
      <div class="flex items-center justify-between mb-4">
        <div>
          <div class="inline-block bg-emerald-100/90 text-emerald-800 text-xs sm:text-sm font-black px-3.5 py-1 rounded-full uppercase tracking-wider mb-1 border border-emerald-300">
            Slide 14 — Technology Stack Matrix
          </div>
          <h2 class="text-2xl sm:text-3xl font-black text-slate-900">Full-Stack Engineering Specifications</h2>
        </div>
        <a href="TECH_STACK.docx" download="TECH_STACK.docx" class="text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-sm transition-transform hover:scale-105">
          <span>📄</span> Download Tech Word (.docx)
        </a>
      </div>

      <div class="overflow-x-auto max-h-[480px] rounded-2xl border-2 border-emerald-200 shadow-inner bg-white">
        <table class="w-full text-left text-xs sm:text-sm">
          <thead class="bg-emerald-800 text-white font-black uppercase tracking-wider text-xs sm:text-sm sticky top-0 border-b-2 border-emerald-900">
            <tr>
              <th class="p-3.5 sm:p-4">Technology</th>
              <th class="p-3.5 sm:p-4">Layer</th>
              <th class="p-3.5 sm:p-4">Role &amp; Architectural Contribution</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-emerald-100 text-slate-700 font-medium">
            <tr class="hover:bg-emerald-50/60">
              <td class="p-3.5 sm:p-4 font-black text-slate-900">Next.js 16 (React 19, Turbopack)</td>
              <td class="p-3.5 sm:p-4 text-emerald-800 font-bold">Full-Stack Framework</td>
              <td class="p-3.5 sm:p-4">App Router architecture, fast server-rendered components, zero-config serverless API routes, and instant static pre-rendering.</td>
            </tr>
            <tr class="hover:bg-emerald-50/60">
              <td class="p-3.5 sm:p-4 font-black text-slate-900">TypeScript 5.x</td>
              <td class="p-3.5 sm:p-4 text-emerald-800 font-bold">Type Safety</td>
              <td class="p-3.5 sm:p-4">End-to-end type safety guaranteeing schema integrity between database models, Gemini verification payloads, and UI components.</td>
            </tr>
            <tr class="hover:bg-emerald-50/60">
              <td class="p-3.5 sm:p-4 font-black text-slate-900">Tailwind CSS 3.4</td>
              <td class="p-3.5 sm:p-4 text-emerald-800 font-bold">Design System</td>
              <td class="p-3.5 sm:p-4">Utility-first responsive styles with custom Deep-Emerald and Indian Earth palette, high outdoor sunlight contrast, and dark mode accents.</td>
            </tr>
            <tr class="hover:bg-emerald-50/60">
              <td class="p-3.5 sm:p-4 font-black text-slate-900">Google Gemini 1.5 Flash Vision</td>
              <td class="p-3.5 sm:p-4 text-emerald-800 font-bold">Multimodal AI</td>
              <td class="p-3.5 sm:p-4">Multimodal vision analysis comparing Before/After photographs, spatial landmark correlation, meme/fraud rejection, and thoroughness scoring.</td>
            </tr>
            <tr class="hover:bg-emerald-50/60">
              <td class="p-3.5 sm:p-4 font-black text-slate-900">Supabase PostgreSQL 15</td>
              <td class="p-3.5 sm:p-4 text-emerald-800 font-bold">Relational DB</td>
              <td class="p-3.5 sm:p-4">Stores persistent user accounts, mission logs, coordinates, and categories under granular Row-Level Security (RLS) policies.</td>
            </tr>
            <tr class="hover:bg-emerald-50/60">
              <td class="p-3.5 sm:p-4 font-black text-slate-900">PostgreSQL Stored Procedures</td>
              <td class="p-3.5 sm:p-4 text-emerald-800 font-bold">Database Triggers</td>
              <td class="p-3.5 sm:p-4">Plpgsql triggers (handle_mission_points) execute atomically inside the database to increment user points upon approved missions.</td>
            </tr>
            <tr class="hover:bg-emerald-50/60">
              <td class="p-3.5 sm:p-4 font-black text-slate-900">Supabase Storage</td>
              <td class="p-3.5 sm:p-4 text-emerald-800 font-bold">Object Storage</td>
              <td class="p-3.5 sm:p-4">S3-compatible public bucket (missions) hosting before and after photo evidence with instant worldwide CDN delivery.</td>
            </tr>
            <tr class="hover:bg-emerald-50/60">
              <td class="p-3.5 sm:p-4 font-black text-slate-900">Canvas Confetti</td>
              <td class="p-3.5 sm:p-4 text-emerald-800 font-bold">UX Microinteraction</td>
              <td class="p-3.5 sm:p-4">Lightweight canvas-based particle generator triggered immediately upon AI verification approval for maximum psychological reward.</td>
            </tr>
            <tr class="hover:bg-emerald-50/60">
              <td class="p-3.5 sm:p-4 font-black text-slate-900">Vercel Edge Platform</td>
              <td class="p-3.5 sm:p-4 text-emerald-800 font-bold">Cloud Hosting</td>
              <td class="p-3.5 sm:p-4">Global serverless edge network providing automated HTTPS, instant git deployments, and 99.99% availability.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- SLIDE 15: PRACTICAL FEASIBILITY            -->
    <!-- ========================================== -->
    <div class="slide flex-col max-w-5xl p-8 sm:p-12 bg-white/95 rounded-3xl border-2 border-emerald-200/90 light-card-shadow w-full" data-notes="Clean & Earn is practical because it can initially be implemented on a small scale, such as in a college or residential community. Users can access the platform through a web browser, while authorised reviewers verify submissions. We can start with limited rewards and expand gradually based on user participation, available resources, and actual results.">
      <div class="inline-block bg-emerald-100/90 text-emerald-800 text-xs sm:text-sm font-black px-3.5 py-1 rounded-full uppercase tracking-wider mb-2 border border-emerald-300 w-fit">
        Slide 15 — Practical Feasibility
      </div>
      <h2 class="text-3xl sm:text-4xl font-black text-slate-900 mb-2">Can Clean &amp; Earn Work in Real Life?</h2>
      <p class="text-sm sm:text-base text-emerald-800 font-bold mb-6">Yes. The project can begin with a small pilot and expand based on empirical outcomes.</p>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
        <div class="bg-emerald-50/90 p-5 rounded-2xl border-2 border-emerald-200 space-y-1.5">
          <span class="text-emerald-900 font-black text-sm sm:text-base uppercase tracking-wider block">1. Technical Feasibility</span>
          <p class="text-sm sm:text-base text-slate-700 font-medium">Modern web standards support camera access, GPS tagging, and real-time AI scoring directly in mobile browsers with zero installation friction.</p>
        </div>
        <div class="bg-teal-50/90 p-5 rounded-2xl border-2 border-teal-200 space-y-1.5">
          <span class="text-teal-900 font-black text-sm sm:text-base uppercase tracking-wider block">2. Operational Feasibility</span>
          <p class="text-sm sm:text-base text-slate-700 font-medium">Initial pilots can run in university campuses or residential housing societies where local supervisors validate eco-disposal points.</p>
        </div>
        <div class="bg-amber-50/90 p-5 rounded-2xl border-2 border-amber-200 space-y-1.5">
          <span class="text-amber-900 font-black text-sm sm:text-base uppercase tracking-wider block">3. Financial Feasibility</span>
          <p class="text-sm sm:text-base text-slate-700 font-medium">Serverless architecture costs $0 at idle. Green Points can initially be backed by campus perks, certificate credits, or corporate CSR grants.</p>
        </div>
        <div class="bg-blue-50/90 p-5 rounded-2xl border-2 border-blue-200 space-y-1.5">
          <span class="text-blue-900 font-black text-sm sm:text-base uppercase tracking-wider block">4. Social Feasibility</span>
          <p class="text-sm sm:text-base text-slate-700 font-medium">Voluntary gamified participation taps into civic pride, community recognition, and shared ownership of public spaces.</p>
        </div>
      </div>

      <div class="bg-emerald-100/80 border-2 border-emerald-300 p-4 rounded-2xl text-center">
        <span class="text-sm sm:text-base font-black text-emerald-950 uppercase tracking-wider">Feasibility Conclusion:</span>
        <span class="text-sm sm:text-base text-slate-800 font-bold ml-2">Clean &amp; Earn is ready for a controlled pilot, with wider implementation scaling according to verified community outcomes.</span>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- SLIDE 16: VISION & ROADMAP                 -->
    <!-- ========================================== -->
    <div class="slide flex-col max-w-5xl p-8 sm:p-12 bg-white/95 rounded-3xl border-2 border-emerald-200/90 light-card-shadow w-full" data-notes="My vision is to make cleanliness a regular community habit rather than a one-time activity. Initially, I want to test the platform with a small group. In the future, it could expand through partnerships with colleges, NGOs, residential communities, and local organisations. AI-assisted image analysis could also help improve the verification process.">
      <div class="inline-block bg-emerald-100/90 text-emerald-800 text-xs sm:text-sm font-black px-3.5 py-1 rounded-full uppercase tracking-wider mb-2 border border-emerald-300 w-fit">
        Slide 16 — Vision &amp; Long-Term Roadmap
      </div>
      <h2 class="text-3xl sm:text-4xl font-black text-slate-900 mb-3">From Project to Community Platform</h2>

      <div class="bg-emerald-50/90 border-2 border-emerald-300 rounded-2xl p-5 mb-6">
        <span class="text-xs sm:text-sm font-black uppercase tracking-wider text-emerald-800 block mb-1">Vision Statement</span>
        <p class="text-base sm:text-xl font-bold text-slate-900 italic">
          "To build a community where cleanliness becomes a shared habit and technology encourages people to create meaningful environmental impact."
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-5 gap-3.5 mb-6 text-center">
        <div class="bg-emerald-50/80 p-4 rounded-2xl border-2 border-emerald-200">
          <span class="text-xs sm:text-sm font-black text-emerald-800 block mb-1">Phase 1</span>
          <h4 class="font-black text-slate-900 text-sm sm:text-base mb-1">Build &amp; Test</h4>
          <p class="text-xs sm:text-sm text-slate-600 font-medium">Validate core workflows with university pilot users.</p>
        </div>
        <div class="bg-teal-50/80 p-4 rounded-2xl border-2 border-teal-200">
          <span class="text-xs sm:text-sm font-black text-teal-800 block mb-1">Phase 2</span>
          <h4 class="font-black text-slate-900 text-sm sm:text-base mb-1">Engage</h4>
          <p class="text-xs sm:text-sm text-slate-600 font-medium">Expand to residential wards &amp; student volunteer clubs.</p>
        </div>
        <div class="bg-blue-50/80 p-4 rounded-2xl border-2 border-blue-200">
          <span class="text-xs sm:text-sm font-black text-blue-800 block mb-1">Phase 3</span>
          <h4 class="font-black text-slate-900 text-sm sm:text-base mb-1">Partnerships</h4>
          <p class="text-xs sm:text-sm text-slate-600 font-medium">Partner with NGOs, municipal wards, and reward sponsors.</p>
        </div>
        <div class="bg-indigo-50/80 p-4 rounded-2xl border-2 border-indigo-200">
          <span class="text-xs sm:text-sm font-black text-indigo-800 block mb-1">Phase 4</span>
          <h4 class="font-black text-slate-900 text-sm sm:text-base mb-1">Improve AI</h4>
          <p class="text-xs sm:text-sm text-slate-600 font-medium">Fine-tune verification models with empirical field photos.</p>
        </div>
        <div class="bg-amber-50/80 p-4 rounded-2xl border-2 border-amber-200">
          <span class="text-xs sm:text-sm font-black text-amber-800 block mb-1">Phase 5</span>
          <h4 class="font-black text-slate-900 text-sm sm:text-base mb-1">Scale</h4>
          <p class="text-xs sm:text-sm text-slate-600 font-medium">Responsible municipal expansion across cities.</p>
        </div>
      </div>

      <p class="text-sm sm:text-base text-slate-700 text-center font-bold">
        Long-Term Goal: Build a sustainable platform that encourages continuous participation rather than one-time cleanups.
      </p>
    </div>

    <!-- ========================================== -->
    <!-- SLIDE 17: FIVE-YEAR IMPACT REVIEW          -->
    <!-- ========================================== -->
    <div class="slide flex-col max-w-5xl p-8 sm:p-12 bg-white/95 rounded-3xl border-2 border-emerald-200/90 light-card-shadow w-full" data-notes="Sir, after five years, I would evaluate this project based on its actual impact, not just the number of users. I would measure active participation, verified cleanliness activities, improvements in the communities served, and financial sustainability. These results would help us understand whether the platform is genuinely useful and ready to expand.">
      <div class="inline-block bg-emerald-100/90 text-emerald-800 text-xs sm:text-sm font-black px-3.5 py-1 rounded-full uppercase tracking-wider mb-2 border border-emerald-300 w-fit">
        Slide 17 — Five-Year Impact Review
      </div>
      <h2 class="text-3xl sm:text-4xl font-black text-slate-900 mb-4">How Will We Measure Real Success?</h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div class="bg-emerald-50/80 p-5 rounded-2xl border-2 border-emerald-200 space-y-2">
          <span class="text-emerald-800 font-black text-xs sm:text-sm uppercase tracking-wider block">1. Participation Retention</span>
          <h4 class="font-black text-slate-900 text-base sm:text-lg">Active &amp; Repeat Volunteers</h4>
          <p class="text-sm sm:text-base text-slate-700 font-medium">Measuring weekly repeat cleanups rather than vanity signup numbers. Success means habitual civic action.</p>
        </div>
        <div class="bg-teal-50/80 p-5 rounded-2xl border-2 border-teal-200 space-y-2">
          <span class="text-teal-800 font-black text-xs sm:text-sm uppercase tracking-wider block">2. Verified Activities</span>
          <h4 class="font-black text-slate-900 text-base sm:text-lg">Audit Precision &amp; Waste Diverted</h4>
          <p class="text-sm sm:text-base text-slate-700 font-medium">Number of approved cleanup missions and total metric tons of segregated waste diverted from open streets.</p>
        </div>
        <div class="bg-amber-50/80 p-5 rounded-2xl border-2 border-amber-200 space-y-2">
          <span class="text-amber-800 font-black text-xs sm:text-sm uppercase tracking-wider block">3. Observable Impact</span>
          <h4 class="font-black text-slate-900 text-base sm:text-lg">Cleaner Street Neighborhoods</h4>
          <p class="text-sm sm:text-base text-slate-700 font-medium">Longitudinal photographic tracking to verify that cleaned areas remain litter-free over extended periods.</p>
        </div>
        <div class="bg-blue-50/80 p-5 rounded-2xl border-2 border-blue-200 space-y-2">
          <span class="text-blue-800 font-black text-xs sm:text-sm uppercase tracking-wider block">4. Long-Term Sustainability</span>
          <h4 class="font-black text-slate-900 text-base sm:text-lg">Partnerships &amp; Operating Trust</h4>
          <p class="text-sm sm:text-base text-slate-700 font-medium">Sustaining reward funds through corporate CSR, municipal grants, and preserving user privacy.</p>
        </div>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- SLIDE 18: CONCLUSION                       -->
    <!-- ========================================== -->
    <div class="slide flex-col justify-center items-center text-center max-w-5xl p-8 sm:p-14 bg-gradient-to-br from-emerald-50/95 via-white/95 to-green-50/95 rounded-3xl border-2 border-emerald-300/80 light-card-shadow w-full" data-notes="To conclude, Clean & Earn aims to connect technology with environmental responsibility by encouraging people to take action and rewarding verified efforts. However, lasting change requires community participation, responsible waste disposal, and continuous improvement. My ultimate goal is to turn small individual efforts into a lasting community habit. Thank you, sir.">
      <div class="inline-block bg-emerald-100/90 text-emerald-800 text-xs sm:text-sm font-black px-4 py-1.5 rounded-full uppercase tracking-wider mb-3 border border-emerald-300">
        Slide 18 — Conclusion
      </div>
      <h2 class="text-4xl sm:text-5xl font-black text-slate-900 mb-4">Small Actions. Collective Impact.</h2>

      <div class="bg-white/95 border-2 border-emerald-200 rounded-2xl p-6 max-w-3xl text-sm sm:text-base text-slate-700 space-y-3 mb-6 text-left font-medium shadow-sm">
        <p>• Clean &amp; Earn connects community participation with photographic evidence, verification, and incentives.</p>
        <p>• Technology provides structure and anti-fraud verification, while human habits create lasting change.</p>
        <p>• Next step: Launch an on-ground pilot in a college/community to measure empirical results and refine verification.</p>
      </div>

      <div class="bg-amber-50/90 border-2 border-amber-300 p-5 rounded-2xl max-w-2xl mb-8">
        <p class="text-base sm:text-xl font-black text-amber-950 italic">
          "A cleaner environment begins when small individual actions become a shared community habit."
        </p>
        <p class="text-sm sm:text-base text-amber-800 mt-1 font-bold">
          Clean &amp; Earn — Encouraging Action, Rewarding Responsibility.
        </p>
      </div>

      <!-- Quick Action Buttons -->
      <div class="flex flex-wrap items-center justify-center gap-4 mb-6">
        <a href="Clean_and_Earn_Source_Code.zip" download="Clean_and_Earn_Source_Code.zip" class="bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm sm:text-base py-3 px-6 rounded-2xl shadow-md transition-transform hover:scale-105">
          📦 Download Source Code (.zip)
        </a>
        <button onclick="downloadPdfAndWord(event)" class="bg-gradient-to-r from-emerald-700 to-green-800 hover:opacity-95 text-white font-black text-sm sm:text-base py-3 px-6 rounded-2xl shadow-md transition-transform hover:scale-105">
          📄 Download PDF + Word (.docx)
        </button>
      </div>

      <p class="text-sm sm:text-base text-emerald-900 font-extrabold">
        Thank You, Sir! Any Questions? • Live at https://garbage-rosy-six.vercel.app
      </p>
    </div>

  </main>

  <!-- Bottom Navigation Bar & Speaker Notes Drawer (Light Theme) -->
  <footer class="bg-white/95 backdrop-blur border-t-2 border-emerald-200/80 px-6 sm:px-10 py-3.5 flex flex-col space-y-2 sticky bottom-0 z-50 shadow-lg">
    <!-- Speaker Notes Box (Collapsible) -->
    <div id="speakerNotesDrawer" class="hidden bg-emerald-50/95 border-2 border-emerald-300 rounded-2xl p-4 text-sm sm:text-base text-emerald-950 font-mono shadow-md">
      <span class="text-xs sm:text-sm text-emerald-800 uppercase font-black block mb-1">🎙️ Spoken Presentation Dialogue:</span>
      <p id="speakerNotesText" class="font-medium leading-relaxed"></p>
    </div>

    <!-- Slide Nav Buttons -->
    <div class="flex items-center justify-between">
      <button id="prevBtn" class="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-colors border border-slate-300 flex items-center gap-1.5 shadow-sm">
        <span>←</span> Previous Slide
      </button>

      <span class="text-xs sm:text-sm text-slate-600 font-bold hidden sm:inline">
        Use <strong class="text-emerald-800">Left / Right Arrow Keys</strong> or Spacebar to navigate • Press <strong class="text-emerald-800">N</strong> for notes
      </span>

      <button id="nextBtn" class="bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm px-6 py-2.5 rounded-xl transition-colors shadow-md flex items-center gap-1.5">
        Next Slide <span>→</span>
      </button>
    </div>
  </footer>

  <script>
    // Slide Navigation
    const slides = Array.from(document.querySelectorAll('.slide'));
    let currentSlide = 0;
    const counter = document.getElementById('slideCounter');
    const notesText = document.getElementById('speakerNotesText');
    const notesDrawer = document.getElementById('speakerNotesDrawer');
    const toggleNotesBtn = document.getElementById('toggleNotesBtn');

    // Pan-Zoom Controller Class
    class PanZoomController {
      constructor(containerId, contentId, badgeId) {
        this.container = document.getElementById(containerId);
        this.content = document.getElementById(contentId);
        this.badge = document.getElementById(badgeId);
        if (!this.container || !this.content) return;

        this.scale = 1.0;
        this.translateX = 0;
        this.translateY = 0;
        this.isDragging = false;
        this.startX = 0;
        this.startY = 0;

        this.init();
      }

      init() {
        this.updateTransform();

        // Mouse Drag to Pan
        this.container.addEventListener('mousedown', (e) => {
          if (e.target.closest('.diagram-controls')) return;
          this.isDragging = true;
          this.startX = e.clientX - this.translateX;
          this.startY = e.clientY - this.translateY;
          this.container.style.cursor = 'grabbing';
          e.preventDefault();
        });

        window.addEventListener('mousemove', (e) => {
          if (!this.isDragging) return;
          this.translateX = e.clientX - this.startX;
          this.translateY = e.clientY - this.startY;
          this.updateTransform();
        });

        window.addEventListener('mouseup', () => {
          if (this.isDragging) {
            this.isDragging = false;
            this.container.style.cursor = 'grab';
          }
        });

        // Mouse Wheel Zoom
        this.container.addEventListener('wheel', (e) => {
          e.preventDefault();
          const zoomFactor = e.deltaY < 0 ? 1.15 : 0.85;
          this.zoom(zoomFactor);
        }, { passive: false });

        // Touch Drag / Pan for Mobile
        let touchStartX = 0;
        let touchStartY = 0;
        this.container.addEventListener('touchstart', (e) => {
          if (e.touches.length === 1) {
            touchStartX = e.touches[0].clientX - this.translateX;
            touchStartY = e.touches[0].clientY - this.translateY;
          }
        });

        this.container.addEventListener('touchmove', (e) => {
          if (e.touches.length === 1) {
            this.translateX = e.touches[0].clientX - touchStartX;
            this.translateY = e.touches[0].clientY - touchStartY;
            this.updateTransform();
            e.preventDefault();
          }
        }, { passive: false });
      }

      zoomIn() {
        this.zoom(1.25);
      }

      zoomOut() {
        this.zoom(0.8);
      }

      zoom(factor) {
        const newScale = Math.min(Math.max(this.scale * factor, 0.4), 4.0);
        this.scale = newScale;
        this.updateTransform();
      }

      reset() {
        this.scale = 1.0;
        this.translateX = 0;
        this.translateY = 0;
        this.updateTransform();
      }

      updateTransform() {
        if (!this.content) return;
        this.content.style.transform = \`translate(\${this.translateX}px, \${this.translateY}px) scale(\${this.scale})\`;
        if (this.badge) {
          this.badge.textContent = \`\${Math.round(this.scale * 100)}%\`;
        }
      }
    }

    // Initialize Pan-Zoom Instances
    const panZoomInstances = {};
    panZoomInstances['userFlow'] = new PanZoomController('container-userFlow', 'content-userFlow', 'zoom-badge-userFlow');
    panZoomInstances['uiuxState'] = new PanZoomController('container-uiuxState', 'content-uiuxState', 'zoom-badge-uiuxState');
    panZoomInstances['aiSequence'] = new PanZoomController('container-aiSequence', 'content-aiSequence', 'zoom-badge-aiSequence');
    panZoomInstances['techArch'] = new PanZoomController('container-techArch', 'content-techArch', 'zoom-badge-techArch');

    function updateSlide(index) {
      if (index < 0 || index >= slides.length) return;
      slides[currentSlide].classList.remove('active');
      currentSlide = index;
      slides[currentSlide].classList.add('active');

      // Update Slide Counter
      counter.textContent = \`\${currentSlide + 1} / \${slides.length}\`;

      // Update Speaker Notes
      const notes = slides[currentSlide].getAttribute('data-notes') || 'No speaker notes available.';
      notesText.textContent = notes;

      // Reset or refresh pan-zoom view on active slide
      const activeContainer = slides[currentSlide].querySelector('.pan-zoom-container');
      if (activeContainer) {
        const id = activeContainer.id.replace('container-', '');
        if (panZoomInstances[id]) {
          panZoomInstances[id].updateTransform();
        }
      }

      window.scrollTo(0, 0);
    }

    document.getElementById('prevBtn').addEventListener('click', () => updateSlide(currentSlide - 1));
    document.getElementById('nextBtn').addEventListener('click', () => updateSlide(currentSlide + 1));

    // Keyboard Shortcuts
    window.addEventListener('keydown', (e) => {
      if (['input', 'textarea'].includes(document.activeElement.tagName.toLowerCase())) return;

      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        updateSlide(currentSlide + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        updateSlide(currentSlide - 1);
      } else if (e.key.toLowerCase() === 'n') {
        notesDrawer.classList.toggle('hidden');
      }
    });

    // Notes toggle button
    toggleNotesBtn.addEventListener('click', () => {
      notesDrawer.classList.toggle('hidden');
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

    // Initialize slide deck
    updateSlide(0);
  </script>
</body>
</html>
`;

// Save updated presentation HTML to workspace root and public folder
const outRoot = path.join(__dirname, '..', 'presentation.html');
const outPub = path.join(__dirname, '..', 'public', 'presentation.html');

fs.writeFileSync(outRoot, htmlContent, 'utf8');
fs.writeFileSync(outPub, htmlContent, 'utf8');

console.log('Successfully updated presentation HTML with Light Green / Cream theme, 10% opacity nature background, and enlarged readable fonts!');
console.log('1.', outRoot);
console.log('2.', outPub);
