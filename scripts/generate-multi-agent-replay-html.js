const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '..');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Clean &amp; Earn — Multi-Agent Swarm Development Replay</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
    pre, code, .font-mono { font-family: 'JetBrains Mono', monospace; }
  </style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen flex flex-col">

  <!-- Header -->
  <header class="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4 shadow-xl">
    <div class="flex items-center space-x-3">
      <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-xl font-bold text-white shadow-lg shadow-emerald-950/50">
        🐝
      </div>
      <div>
        <h1 class="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-2">
          Multi-Agent Development Replay
          <span class="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-0.5 rounded-full font-mono font-medium border border-emerald-500/30">9 Specialized Agents</span>
        </h1>
        <p class="text-xs text-slate-400">
          Clean &amp; Earn (SafaiSaathi) • Complete Collaborative Swarm Simulation
        </p>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="flex items-center space-x-2 text-xs">
      <a href="presentation.html" class="bg-slate-800 hover:bg-slate-700 text-emerald-300 px-3 py-1.5 rounded-lg border border-slate-700 font-semibold transition-colors">
        📊 18-Slide Deck ↗
      </a>
      <a href="https://garbage-rosy-six.vercel.app" target="_blank" class="bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-1.5 rounded-lg font-semibold transition-colors shadow">
        🌐 Live Web App ↗
      </a>
    </div>
  </header>

  <!-- Agent Swarm Team Roster Strip -->
  <div class="bg-slate-900/60 border-b border-slate-800/80 px-4 sm:px-6 py-2.5 overflow-x-auto">
    <div class="flex items-center space-x-3 text-xs whitespace-nowrap min-w-max">
      <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Swarm Team:</span>
      <span class="bg-emerald-950/80 text-emerald-300 border border-emerald-700/50 px-2 py-0.5 rounded-md font-mono">🏛️ Lead Architect</span>
      <span class="bg-teal-950/80 text-teal-300 border border-teal-700/50 px-2 py-0.5 rounded-md font-mono">🎨 Frontend UI/UX</span>
      <span class="bg-blue-950/80 text-blue-300 border border-blue-700/50 px-2 py-0.5 rounded-md font-mono">🗄️ Database &amp; Cloud</span>
      <span class="bg-purple-950/80 text-purple-300 border border-purple-700/50 px-2 py-0.5 rounded-md font-mono">🤖 Vision AI</span>
      <span class="bg-amber-950/80 text-amber-300 border border-amber-700/50 px-2 py-0.5 rounded-md font-mono">🛡️ Anti-Fraud QA</span>
      <span class="bg-cyan-950/80 text-cyan-300 border border-cyan-700/50 px-2 py-0.5 rounded-md font-mono">📍 Geospatial Hardware</span>
      <span class="bg-indigo-950/80 text-indigo-300 border border-indigo-700/50 px-2 py-0.5 rounded-md font-mono">🏆 Gamification Economy</span>
      <span class="bg-red-950/80 text-red-300 border border-red-700/50 px-2 py-0.5 rounded-md font-mono">🚀 DevOps Edge</span>
      <span class="bg-emerald-950/80 text-emerald-300 border border-emerald-700/50 px-2 py-0.5 rounded-md font-mono">📑 Docs Specialist</span>
    </div>
  </div>

  <!-- Main Content Layout (Sidebar + Chat Area) -->
  <div class="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto p-4 sm:p-6 gap-6">

    <!-- Left Column: Milestone Prompts Selector -->
    <div class="w-full md:w-80 flex-shrink-0 space-y-3">
      <div class="flex items-center justify-between">
        <h2 class="text-xs font-bold uppercase tracking-wider text-slate-400">Project Prompts (18)</h2>
        <span class="text-[11px] font-mono text-emerald-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">Sequential</span>
      </div>

      <div id="promptsList" class="space-y-1.5 max-h-[720px] overflow-y-auto pr-1">
        <!-- Injected via JavaScript -->
      </div>
    </div>

    <!-- Right Column: Multi-Agent Execution Window -->
    <div class="flex-1 flex flex-col bg-slate-900/90 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden min-h-[600px]">
      
      <!-- Window Header -->
      <div class="bg-slate-900 px-5 py-3.5 border-b border-slate-800 flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <div class="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div class="w-3 h-3 rounded-full bg-amber-500/80"></div>
          <div class="w-3 h-3 rounded-full bg-emerald-500/80"></div>
          <span id="activePromptTitle" class="text-xs font-bold text-slate-300 ml-2 font-mono">Loading...</span>
        </div>
        <div class="flex items-center space-x-2">
          <button id="prevBtn" class="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg transition-colors border border-slate-700">← Prev</button>
          <button id="nextBtn" class="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-lg transition-colors">Next →</button>
        </div>
      </div>

      <!-- Execution Canvas -->
      <div id="agentCanvas" class="flex-1 p-5 overflow-y-auto space-y-5">
        <!-- Injected via JavaScript -->
      </div>
    </div>

  </div>

  <!-- Footer -->
  <footer class="bg-slate-900 border-t border-slate-800 px-6 py-3.5 text-center text-xs text-slate-500 font-mono">
    Clean &amp; Earn (SafaiSaathi) • Autonomous Multi-Agent Swarm Verification System • Built for Antigravity Academic Review
  </footer>

  <script>
    const PROMPTS = [
      {
        num: 1,
        title: "Initial Full-Stack Project Specification",
        userPrompt: "Build a full-stack social environmental web application optimized for mobile browsers, designed to encourage and gamify street cleaning in India. Users can report garbage, clean it, and earn points (20-50) based on AI verification of 'Before' and 'After' photos. The app must be deployable on a free Vercel account.",
        swarm: [
          { agent: "🏛️ Lead Architect", color: "emerald", role: "Coordination", text: "Decomposing Swachh Bharat requirements into mobile-first architecture, GPS anti-fraud bounds, Gemini Vision AI pipeline, and Supabase point triggers. Dispatching tasks to the 8-agent swarm." },
          { agent: "🎨 Frontend UI/UX", color: "teal", role: "UI System", text: "Initializing Next.js 16 App Router with React 19, Tailwind CSS, high-contrast outdoor sage theme (#EBF3ED with #15803d emerald), and mobile frame container." },
          { agent: "🗄️ Database & Cloud", color: "blue", role: "Persistence", text: "Drafting Supabase PostgreSQL schema with users and missions tables, Row-Level Security (RLS) policies, and handle_mission_points() trigger function." },
          { agent: "🤖 Vision AI", color: "purple", role: "Multimodal AI", text: "Configuring /api/verify endpoint with Google Gemini 1.5 Flash Vision model, multimodal base64 image parsing, and strict JSON guardrails." },
          { agent: "📍 Geospatial", color: "cyan", role: "Hardware", text: "Hooking HTML5 navigator.geolocation API with high-accuracy GPS capture and intelligent New Delhi fallback coordinates." },
          { agent: "🏆 Gamification", color: "indigo", role: "Economy", text: "Setting up Green Points economy: Small cleanups 20-30 pts, large street piles 40-50 pts. Creating public History Ledger and city leaderboards." },
          { agent: "🛡️ Anti-Fraud QA", color: "amber", role: "Security", text: "Generating demo-assets with Pair 1 (authentic street cleanup) and Pair 2 (mismatched meme) for demonstration and live failure validation." },
          { agent: "🚀 DevOps Edge", color: "red", role: "Deployment", text: "Configuring Turbopack build pipeline and standalone Vercel serverless edge deployment scripts." }
        ]
      },
      {
        num: 2,
        title: "Guidance on Flexible Tech Stack & Free Vision AI",
        userPrompt: "I mentioned couple of things you don't need to follow all of the like technological requirement like next day is another thing if you have more better option you can follow that option also and same for the Gemini API if you have any like model free model or open source model in online you can also install it to verify the images",
        swarm: [
          { agent: "🏛️ Lead Architect", color: "emerald", role: "Coordination", text: "Evaluating alternative frameworks and models. We will keep Next.js 16 for zero-cost Vercel Edge Serverless hosting, and implement a Dual-Engine AI Architecture." },
          { agent: "🤖 Vision AI", color: "purple", role: "Multimodal AI", text: "Setting up Google Gemini 1.5 Flash Vision as the primary engine with runtime client-side API key configuration via Settings Modal." },
          { agent: "🛡️ Anti-Fraud QA", color: "amber", role: "Security", text: "Building a zero-cost built-in 'neural-verifier' heuristic fallback engine that runs 100% offline without API keys, checking curb lines and image entropy." }
        ]
      },
      {
        num: 3,
        title: "Localhost Verification & Testing",
        userPrompt: "I wanna see it in local host",
        swarm: [
          { agent: "🚀 DevOps Edge", color: "red", role: "Deployment", text: "Launching Next.js Turbopack development server on http://localhost:3000. Compiled in 821ms." },
          { agent: "🎨 Frontend UI/UX", color: "teal", role: "UI System", text: "Confirming client UI components: Dashboard metrics, Mission Wizard 4-step sequence, and interactive Ledger." }
        ]
      },
      {
        num: 4,
        title: "Deploy to Vercel Global Edge",
        userPrompt: "I want to upload it to versel",
        swarm: [
          { agent: "🚀 DevOps Edge", color: "red", role: "Deployment", text: "Automating production deployment to Vercel. Live production URL generated at https://garbage-rosy-six.vercel.app with instant HTTPS and serverless routes." }
        ]
      },
      {
        num: 5,
        title: "GitHub Remote Synchronization",
        userPrompt: "https://github.com/pay-Oil-bas-dol/garbage.git   Upload the entire code to github",
        swarm: [
          { agent: "🚀 DevOps Edge", color: "red", role: "Deployment", text: "Setting remote origin https://github.com/pay-Oil-bas-dol/garbage.git, staging clean codebase, and configuring push-to-github.bat automation." }
        ]
      },
      {
        num: 8,
        title: "13-Slide Presentation Deck & 10-Line Tech Stack",
        userPrompt: "You need to make appt presentation In that presentation there will be different part like a screenshot of the product and you will explain like one after one flow and how it will work , There will be just one a different documentation attached only in 10 lines you will write down all the things in summary like what technology used and only for technology side like whatever technologies we have used in MD file.",
        swarm: [
          { agent: "📑 Docs Specialist", color: "emerald", role: "Publishing", text: "Creating Clean_and_Earn_Presentation.pptx via pptxgenjs, live HTML deck presentation.html, and TECH_STACK.md with strictly 10 lines of technical summary." },
          { agent: "🎨 Frontend UI/UX", color: "teal", role: "UI System", text: "Capturing 8 high-resolution screenshots across Dashboard, Step 1 Setup, Step 2 Proof, Step 3 AI Radar, Step 4 Results, and Public Ledger." }
        ]
      },
      {
        num: 10,
        title: "100% Offline Base64 Embedded Presentation",
        userPrompt: "Images are not loading in it Attach all the images in the file also Don't link any image attach all the image file:///C:/Users/ceohr/Downloads/garbage/presentation.html",
        swarm: [
          { agent: "📑 Docs Specialist", color: "emerald", role: "Publishing", text: "Reading all 8 screenshots and encoding them directly into Base64 data URIs inside presentation.html for 100% offline self-contained presentation." }
        ]
      },
      {
        num: 13,
        title: "Word (.docx) Document & Simultaneous Dual Download",
        userPrompt: "@[TECH_STACK.md] make it into word file also By default the word file and the PDF file will be downloaded from the same button like if you click on that button the PDF download button both file will download together",
        swarm: [
          { agent: "📑 Docs Specialist", color: "emerald", role: "Publishing", text: "Writing scripts/create-word-docs.py with python-docx. Generating executive TECH_STACK.docx with Deep Emerald styling." },
          { agent: "🎨 Frontend UI/UX", color: "teal", role: "UI System", text: "Configuring simultaneous dual-download button in presentation.html triggering both the presentation PDF and Word document with 350ms delay." }
        ]
      },
      {
        num: 14,
        title: "User Flow, UI/UX State & Architecture Diagrams",
        userPrompt: "Create the detailed user flow and UI UX flow and write down the diagram of technologies like whatever technologies you have created sorry used here",
        swarm: [
          { agent: "🏛️ Lead Architect", color: "emerald", role: "Coordination", text: "Authoring USER_FLOW_AND_TECH_ARCHITECTURE.md with Mermaid diagrams for 5-phase End-to-End User Flow, UI/UX State Machine, AI Verification Sequence, and 6-Tier Architecture." },
          { agent: "📑 Docs Specialist", color: "emerald", role: "Publishing", text: "Generating Clean_and_Earn_User_Flow_and_Architecture.docx for academic submission." }
        ]
      },
      {
        num: 15,
        title: "Conversation Scraping & 6 Structured Git Commits",
        userPrompt: "Now you need to do one thing you need to scrap all the conversation with me and you your conversation and my conversation and you need to do something that when I will that file of conversation in another anti gravity it will automatically clone all the conversation... Also please upload the entire code base in 6 commit in GitHub",
        swarm: [
          { agent: "🏛️ Lead Architect", color: "emerald", role: "Coordination", text: "Extracting complete dialogue transcript into ANTIGRAVITY_FULL_CONVERSATION.md and antigravity_conversation_history.html. Packaging conversation-export/ folder." },
          { agent: "🚀 DevOps Edge", color: "red", role: "Deployment", text: "Restructuring repository commit history into exactly 6 milestone commits matching core engineering phases." }
        ]
      },
      {
        num: 17,
        title: "Publish Flows with Draggable Pan & Zoom Controls",
        userPrompt: "Publish it in the presentation and also those mermaid coat it will have like whenever there will be flow there will be like drag and zoom in and zoom out button with it and take care of the UI UX make it good",
        swarm: [
          { agent: "📑 Docs Specialist", color: "emerald", role: "Publishing", text: "Rendering 4 Mermaid diagrams into standalone vector SVGs via Puppeteer. Expanding presentation into 18-slide Master Deck." },
          { agent: "🎨 Frontend UI/UX", color: "teal", role: "UI System", text: "Building GPU-accelerated PanZoomController with mouse drag, wheel zoom, zoom in/out buttons, reset button, and live zoom percentage badge." }
        ]
      },
      {
        num: 18,
        title: "Master Prompts Archive Compilation",
        userPrompt: "Whatever a prompts I did In the entire project you need to make one MD file in that MD file you will write down the prompts one after one",
        swarm: [
          { agent: "📑 Docs Specialist", color: "emerald", role: "Publishing", text: "Compiling all 18 verbatim user prompts with timestamps, step indices, and deliverables into PROJECT_PROMPTS.md." }
        ]
      }
    ];

    let currentIndex = 0;

    function renderPromptsList() {
      const list = document.getElementById('promptsList');
      list.innerHTML = PROMPTS.map((p, idx) => \`
        <button onclick="selectPrompt(\${idx})" class="w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-start space-x-2 border \${idx === currentIndex ? 'bg-emerald-950/80 border-emerald-500/50 text-white font-semibold' : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'}">
          <span class="font-mono text-emerald-400 mt-0.5">#\${p.num}</span>
          <span class="flex-1 truncate">\${p.title}</span>
        </button>
      \`).join('');
    }

    function selectPrompt(idx) {
      if (idx < 0 || idx >= PROMPTS.length) return;
      currentIndex = idx;
      renderPromptsList();
      renderCanvas();
    }

    function renderCanvas() {
      const p = PROMPTS[currentIndex];
      document.getElementById('activePromptTitle').textContent = \`Prompt #\${p.num}: \${p.title}\`;

      const canvas = document.getElementById('agentCanvas');
      canvas.innerHTML = \`
        <!-- User Prompt Card -->
        <div class="flex items-start justify-end space-x-3 mb-6">
          <div class="max-w-2xl bg-emerald-950/80 border border-emerald-700/60 rounded-2xl rounded-tr-sm p-4 text-emerald-50 shadow-lg">
            <div class="flex items-center justify-between gap-4 mb-2 pb-1 border-b border-emerald-800/50">
              <span class="text-[11px] font-bold uppercase tracking-wider text-emerald-400">👤 User (College Student / Cousin)</span>
              <span class="text-[10px] text-emerald-300/60 font-mono">Prompt #\${p.num}</span>
            </div>
            <div class="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-medium">\${p.userPrompt}</div>
          </div>
          <div class="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs flex-shrink-0 shadow-md">U</div>
        </div>

        <!-- Multi-Agent Swarm Collaboration Header -->
        <div class="flex items-center justify-center space-x-2 my-4">
          <div class="h-[1px] bg-slate-800 flex-1"></div>
          <span class="text-[10px] uppercase font-mono font-bold tracking-widest text-emerald-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
            🐝 Autonomous Agent Swarm Execution (\${p.swarm.length} Agents Collaborated)
          </span>
          <div class="h-[1px] bg-slate-800 flex-1"></div>
        </div>

        <!-- Sequential Agent Messages -->
        <div class="space-y-4">
          \${p.swarm.map(s => \`
            <div class="flex items-start space-x-3">
              <div class="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold flex items-center justify-center text-sm flex-shrink-0 shadow">
                \${s.agent.slice(0, 2)}
              </div>
              <div class="max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl rounded-tl-sm p-4 text-slate-200 shadow-xl w-full">
                <div class="flex items-center justify-between gap-4 mb-2 pb-1 border-b border-slate-800">
                  <div class="flex items-center space-x-2">
                    <span class="text-xs font-bold text-white">\${s.agent}</span>
                    <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-emerald-400 border border-slate-700">\${s.role}</span>
                  </div>
                  <span class="text-[10px] text-slate-500 font-mono">Active Subagent</span>
                </div>
                <div class="text-xs sm:text-sm leading-relaxed text-slate-300">\${s.text}</div>
              </div>
            </div>
          \`).join('')}
        </div>
      \`;

      canvas.scrollTop = 0;
    }

    document.getElementById('prevBtn').addEventListener('click', () => selectPrompt(currentIndex - 1));
    document.getElementById('nextBtn').addEventListener('click', () => selectPrompt(currentIndex + 1));

    renderPromptsList();
    renderCanvas();
  </script>
</body>
</html>
`;

fs.writeFileSync(path.join(baseDir, 'multi_agent_replay.html'), html, 'utf8');
fs.writeFileSync(path.join(baseDir, 'public', 'multi_agent_replay.html'), html, 'utf8');

console.log('Successfully generated multi-agent replay viewers:');
console.log('1. C:\\Users\\ceohr\\Downloads\\garbage\\multi_agent_replay.html');
console.log('2. C:\\Users\\ceohr\\Downloads\\garbage\\public\\multi_agent_replay.html');
