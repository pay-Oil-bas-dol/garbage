import os
import shutil

def generate_flowcharts_html():
    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    svgs_dir = os.path.join(base_dir, 'public', 'mermaid-svgs')

    with open(os.path.join(svgs_dir, 'userFlow.svg'), 'r', encoding='utf-8') as f:
        user_flow_svg = f.read()

    with open(os.path.join(svgs_dir, 'uiuxState.svg'), 'r', encoding='utf-8') as f:
        uiux_state_svg = f.read()

    with open(os.path.join(svgs_dir, 'aiSequence.svg'), 'r', encoding='utf-8') as f:
        ai_sequence_svg = f.read()

    with open(os.path.join(svgs_dir, 'techArch.svg'), 'r', encoding='utf-8') as f:
        tech_arch_svg = f.read()

    # Create 5th Flowchart: Team Engineering Process Flow SVG
    team_process_svg = """
<svg id="svg_teamProcess" width="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 520" style="max-width: 100%; height: auto;">
  <defs>
    <linearGradient id="gradEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#059669" />
      <stop offset="100%" stop-color="#047857" />
    </linearGradient>
    <linearGradient id="gradTeal" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0D9488" />
      <stop offset="100%" stop-color="#0F766E" />
    </linearGradient>
    <linearGradient id="gradAmber" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#D97706" />
      <stop offset="100%" stop-color="#B45309" />
    </linearGradient>
    <linearGradient id="gradGreen" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#16A34A" />
      <stop offset="100%" stop-color="#15803D" />
    </linearGradient>
    <linearGradient id="gradBlue" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2563EB" />
      <stop offset="100%" stop-color="#1D4ED8" />
    </linearGradient>
    <filter id="shadow" x="-5%" y="-5%" width="110%" height="115%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#064E3B" flood-opacity="0.12" />
    </filter>
  </defs>

  <!-- Step 1: Research -->
  <g transform="translate(40, 40)" filter="url(#shadow)">
    <rect width="230" height="420" rx="20" fill="#FFFFFF" stroke="#059669" stroke-width="2" />
    <rect width="230" height="56" rx="20" fill="url(#gradEmerald)" />
    <rect y="36" width="230" height="20" fill="#047857" />
    <text x="115" y="34" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="14" fill="#FFFFFF" text-anchor="middle">PHASE 1: RESEARCH</text>
    <text x="115" y="80" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="15" fill="#0F172A" text-anchor="middle">Nikhil</text>
    <text x="115" y="98" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="11" fill="#059669" text-anchor="middle">Research &amp; Suggestions</text>
    <line x1="20" y1="112" x2="210" y2="112" stroke="#E2E8F0" stroke-width="1.5" />
    <text x="20" y="136" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" fill="#334155" font-weight="600">• Swachh Bharat Norms</text>
    <text x="20" y="160" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" fill="#334155" font-weight="600">• 4 Waste Categories</text>
    <text x="20" y="184" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" fill="#334155" font-weight="600">• 20–50 Green Points</text>
    <text x="20" y="208" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" fill="#334155" font-weight="600">• Brand Rewards Model</text>
    <rect x="18" y="240" width="194" height="150" rx="12" fill="#F0FDF4" stroke="#86EFAC" />
    <text x="30" y="265" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="800" fill="#065F46">DELIVERABLE:</text>
    <text x="30" y="285" font-family="'Plus Jakarta Sans', sans-serif" font-size="10.5" fill="#1E293B">Civic gamification rules,</text>
    <text x="30" y="303" font-family="'Plus Jakarta Sans', sans-serif" font-size="10.5" fill="#1E293B">segregation taxonomy,</text>
    <text x="30" y="321" font-family="'Plus Jakarta Sans', sans-serif" font-size="10.5" fill="#1E293B">and point economy.</text>
  </g>

  <!-- Arrow 1 -->
  <path d="M 280 250 L 305 250" stroke="#059669" stroke-width="4" marker-end="url(#arrow)" />

  <!-- Step 2: App Architecture -->
  <g transform="translate(310, 40)" filter="url(#shadow)">
    <rect width="230" height="420" rx="20" fill="#FFFFFF" stroke="#0D9488" stroke-width="2" />
    <rect width="230" height="56" rx="20" fill="url(#gradTeal)" />
    <rect y="36" width="230" height="20" fill="#0F766E" />
    <text x="115" y="34" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="14" fill="#FFFFFF" text-anchor="middle">PHASE 2: APP DEV</text>
    <text x="115" y="80" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="15" fill="#0F172A" text-anchor="middle">Divyanshu &amp; Aritra</text>
    <text x="115" y="98" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="11" fill="#0D9488" text-anchor="middle">Full-Stack Core</text>
    <line x1="20" y1="112" x2="210" y2="112" stroke="#E2E8F0" stroke-width="1.5" />
    <text x="20" y="136" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" fill="#334155" font-weight="600">• Next.js 16 App Router</text>
    <text x="20" y="160" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" fill="#334155" font-weight="600">• React 19 Client UI</text>
    <text x="20" y="184" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" fill="#334155" font-weight="600">• Gemini 1.5 Flash Vision</text>
    <text x="20" y="208" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" fill="#334155" font-weight="600">• Supabase DB Schema</text>
    <rect x="18" y="240" width="194" height="150" rx="12" fill="#F0FDFA" stroke="#99F6E4" />
    <text x="30" y="265" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="800" fill="#115E59">DELIVERABLE:</text>
    <text x="30" y="285" font-family="'Plus Jakarta Sans', sans-serif" font-size="10.5" fill="#1E293B">/api/verify route,</text>
    <text x="30" y="303" font-family="'Plus Jakarta Sans', sans-serif" font-size="10.5" fill="#1E293B">MissionWizard capture,</text>
    <text x="30" y="321" font-family="'Plus Jakarta Sans', sans-serif" font-size="10.5" fill="#1E293B">and reactive store.</text>
  </g>

  <!-- Arrow 2 -->
  <path d="M 550 250 L 575 250" stroke="#0D9488" stroke-width="4" />

  <!-- Step 3: PPT Planning -->
  <g transform="translate(580, 40)" filter="url(#shadow)">
    <rect width="230" height="420" rx="20" fill="#FFFFFF" stroke="#2563EB" stroke-width="2" />
    <rect width="230" height="56" rx="20" fill="url(#gradBlue)" />
    <rect y="36" width="230" height="20" fill="#1D4ED8" />
    <text x="115" y="34" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="14" fill="#FFFFFF" text-anchor="middle">PHASE 3: DECKS</text>
    <text x="115" y="80" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="15" fill="#0F172A" text-anchor="middle">Divyanshu &amp; Aritra</text>
    <text x="115" y="98" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="11" fill="#2563EB" text-anchor="middle">Presentation Planning</text>
    <line x1="20" y1="112" x2="210" y2="112" stroke="#E2E8F0" stroke-width="1.5" />
    <text x="20" y="136" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" fill="#334155" font-weight="600">• 19-Slide Interactive Deck</text>
    <text x="20" y="160" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" fill="#334155" font-weight="600">• Auto-Hiding Top Header</text>
    <text x="20" y="184" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" fill="#334155" font-weight="600">• Dedicated Flowchart Portal</text>
    <text x="20" y="208" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" fill="#334155" font-weight="600">• PDF &amp; DOCX Automation</text>
    <rect x="18" y="240" width="194" height="150" rx="12" fill="#EFF6FF" stroke="#BFDBFE" />
    <text x="30" y="265" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="800" fill="#1E40AF">DELIVERABLE:</text>
    <text x="30" y="285" font-family="'Plus Jakarta Sans', sans-serif" font-size="10.5" fill="#1E293B">presentation.html,</text>
    <text x="30" y="303" font-family="'Plus Jakarta Sans', sans-serif" font-size="10.5" fill="#1E293B">flowcharts.html, and</text>
    <text x="30" y="321" font-family="'Plus Jakarta Sans', sans-serif" font-size="10.5" fill="#1E293B">speaker notes script.</text>
  </g>

  <!-- Arrow 3 -->
  <path d="M 820 250 L 845 250" stroke="#2563EB" stroke-width="4" />

  <!-- Step 4: Bug Testing & QA -->
  <g transform="translate(850, 40)" filter="url(#shadow)">
    <rect width="230" height="420" rx="20" fill="#FFFFFF" stroke="#D97706" stroke-width="2" />
    <rect width="230" height="56" rx="20" fill="url(#gradAmber)" />
    <rect y="36" width="230" height="20" fill="#B45309" />
    <text x="115" y="34" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="14" fill="#FFFFFF" text-anchor="middle">PHASE 4: QA &amp; FRAUD</text>
    <text x="115" y="80" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="14" fill="#0F172A" text-anchor="middle">Anurag &amp; Sobhit</text>
    <text x="115" y="98" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="11" fill="#D97706" text-anchor="middle">Bug Testing &amp; Anti-Fraud</text>
    <line x1="20" y1="112" x2="210" y2="112" stroke="#E2E8F0" stroke-width="1.5" />
    <text x="20" y="136" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" fill="#334155" font-weight="600">• Projector Contrast Fix</text>
    <text x="20" y="160" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" fill="#334155" font-weight="600">• Light Green Cream Theme</text>
    <text x="20" y="184" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" fill="#334155" font-weight="600">• Pair 1: Real Street Test</text>
    <text x="20" y="208" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" fill="#334155" font-weight="600">• Pair 2: Cat Meme Fraud</text>
    <rect x="18" y="240" width="194" height="150" rx="12" fill="#FFFBEB" stroke="#FDE68A" />
    <text x="30" y="265" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="800" fill="#92400E">DELIVERABLE:</text>
    <text x="30" y="285" font-family="'Plus Jakarta Sans', sans-serif" font-size="10.5" fill="#1E293B">Zero fraud bypass,</text>
    <text x="30" y="303" font-family="'Plus Jakarta Sans', sans-serif" font-size="10.5" fill="#1E293B">10% nature pattern,</text>
    <text x="30" y="321" font-family="'Plus Jakarta Sans', sans-serif" font-size="10.5" fill="#1E293B">and prompt assertions.</text>
  </g>

  <!-- Arrow 4 -->
  <path d="M 1090 250 L 1115 250" stroke="#D97706" stroke-width="4" />

  <!-- Step 5: Security & Deploy -->
  <g transform="translate(1120, 40)" filter="url(#shadow)">
    <rect width="240" height="420" rx="20" fill="#FFFFFF" stroke="#16A34A" stroke-width="2" />
    <rect width="240" height="56" rx="20" fill="url(#gradGreen)" />
    <rect y="36" width="240" height="20" fill="#15803D" />
    <text x="120" y="34" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="14" fill="#FFFFFF" text-anchor="middle">PHASE 5: SECURITY</text>
    <text x="120" y="80" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="14" fill="#0F172A" text-anchor="middle">Aman &amp; Amrit</text>
    <text x="120" y="98" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="11" fill="#16A34A" text-anchor="middle">Rewards &amp; Auth Security</text>
    <line x1="20" y1="112" x2="220" y2="112" stroke="#E2E8F0" stroke-width="1.5" />
    <text x="20" y="136" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" fill="#334155" font-weight="600">• 14-Brand Rewards Store</text>
    <text x="20" y="160" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" fill="#334155" font-weight="600">• Removed Default User</text>
    <text x="20" y="184" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" fill="#334155" font-weight="600">• Old Password Validation</text>
    <text x="20" y="208" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" fill="#334155" font-weight="600">• Full-Name Password Reset</text>
    <rect x="18" y="240" width="204" height="150" rx="12" fill="#F0FDF4" stroke="#86EFAC" />
    <text x="30" y="265" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="800" fill="#166534">DELIVERABLE:</text>
    <text x="30" y="285" font-family="'Plus Jakarta Sans', sans-serif" font-size="10.5" fill="#1E293B">RewardsCatalog,</text>
    <text x="30" y="303" font-family="'Plus Jakarta Sans', sans-serif" font-size="10.5" fill="#1E293B">case-insensitive auth,</text>
    <text x="30" y="321" font-family="'Plus Jakarta Sans', sans-serif" font-size="10.5" fill="#1E293B">and Vercel Production.</text>
  </g>
</svg>
    """.strip()

    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Clean &amp; Earn — Architectural Flowcharts &amp; System Diagrams</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    body {{
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: #F8FAF6;
    }}
    pre, code, .font-mono {{ font-family: 'JetBrains Mono', monospace; }}
    .pan-zoom-container {{
      user-select: none;
      -webkit-user-select: none;
      touch-action: none;
    }}
    .pan-zoom-content {{
      will-change: transform;
      transform-origin: center center;
    }}
    .nature-bg-pattern {{
      background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiB2aWV3Qm94PSIwIDAgNDAwIDQwMCI+CiAgPGRlZnM+CiAgICA8c3R5bGU+CiAgICAgIC5lY28tbGVhZiB7IGZpbGw6ICMwNDc4NTc7IH0KICAgICAgLmVjby1yZWN5Y2xlIHsgZmlsbDogbm9uZTsgc3Ryb2tlOiAjMDY1RjQ2OyBzdHJva2Utd2lkdGg6IDg7IHN0cm9rZS1saW5lY2FwOiByb3VuZDsgc3Ryb2tlLWxpbmVqb2luOiByb3VuZDsgfQogICAgICAuZWNvLXNwcm91dCB7IGZpbGw6ICMwNTk2Njk7IH0KICAgICAgLmVjby1nbG9iZSB7IGZpbGw6IG5vbmU7IHN0cm9rZTogIzA0Nzg1Nzsgc3Ryb2tlLXdpZHRoOiA2OyB9CiAgICAgIC5lY28tZG90IHsgZmlsbDogIzEwQjk4MTsgfQogICAgPC9zdHlsZT4KICA8L2RlZnM+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNjAsIDYwKSBzY2FsZSgwLjcpIj4KICAgIDxwYXRoIGNsYXNzPSJlY28tcmVjeWNsZSIgZD0iTSA0MCwtNDAgQyA2NSwtNDAgNzUsLTE1IDc1LDEwIEwgODUsMiBNIDc1LDEwIEwgNjAsMTgiIC8+CiAgICA8cGF0aCBjbGFzcz0iZWNvLXJlY3ljbGUiIGQ9Ik0gNjAsMzUgQyA0NSw2NSAxNSw2NSAtMTUsNjUgTCAtOCw3OCBNIC0xNSw2NSBMIC0xMCw1MCIgLz4KICAgIDxwYXRoIGNsYXNzPSJlY28tcmVjeWNsZSIgZD0iTSAtMzUsNTAgQyAtNjUsMzAgLTY1LC01IC00NSwtMzAgTCAtNTUsLTIwIE0gLTQ1LC0zMCBMIC0zMCwtMzIiIC8+CiAgPC9nPgo8L3N2Zz4=');
      background-repeat: repeat;
      background-size: 360px 360px;
      opacity: 0.10;
    }}
    .light-card-shadow {{
      box-shadow: 0 20px 40px -15px rgba(6, 78, 59, 0.08), 0 0 1px 1px rgba(16, 185, 129, 0.2);
    }}
    .tab-content {{ display: none; }}
    .tab-content.active {{ display: block; }}
  </style>
</head>
<body class="bg-[#F8FAF6] text-slate-800 min-h-screen flex flex-col justify-between select-none relative overflow-x-hidden">

  <!-- Fixed 10% Opacity Nature & Leaves Background Overlay -->
  <div class="fixed inset-0 pointer-events-none z-0 nature-bg-pattern"></div>

  <!-- Top Navigation & Controls Header -->
  <header class="bg-white/95 backdrop-blur-md border-b-2 border-emerald-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between z-50 sticky top-0 shadow-md">
    <div class="flex items-center space-x-3.5">
      <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-xl font-bold text-white shadow-md shadow-emerald-950/20">
        📐
      </div>
      <div>
        <h1 class="text-base sm:text-lg font-black text-slate-900 leading-tight flex items-center gap-2">
          Clean &amp; Earn — Architectural Flowcharts Portal
          <span class="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-0.5 rounded-full font-bold border border-emerald-300 hidden sm:inline">
            5 Dedicated Interactive Flowcharts
          </span>
        </h1>
        <p class="text-xs sm:text-sm text-emerald-700 font-semibold">
          High-Resolution Vector Schematics • Draggable Pan/Zoom • Separated from Presentation
        </p>
      </div>
    </div>

    <!-- Top Action Buttons -->
    <div class="flex items-center space-x-2 sm:space-x-2.5">
      <a href="/" class="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white text-xs sm:text-sm font-bold px-3 py-2 rounded-xl transition-all flex items-center space-x-1 shadow-md hover:scale-105 active:scale-95" title="Launch Live Web App">
        <span>🚀 Live App</span>
      </a>
      <a href="/presentation.html" class="bg-white hover:bg-emerald-50 text-emerald-900 border-2 border-emerald-300 text-xs sm:text-sm font-bold px-3 py-2 rounded-xl transition-all flex items-center space-x-1 shadow-2xs hover:scale-105 active:scale-95" title="Open Main 19-Slide Presentation">
        <span>📊 Presentation</span>
      </a>
      <a href="/team-process-flow.html" class="bg-teal-700 hover:bg-teal-800 text-white text-xs sm:text-sm font-bold px-3 py-2 rounded-xl transition-all flex items-center space-x-1 shadow-md hover:scale-105 active:scale-95" title="Open Dedicated Team Presentation Deck">
        <span>👥 Team Flow</span>
      </a>
      <a href="/Clean_and_Earn_Source_Code.zip" download="Clean_and_Earn_Source_Code.zip" class="bg-emerald-800 hover:bg-emerald-900 text-white text-xs sm:text-sm font-bold px-3 py-2 rounded-xl transition-all flex items-center space-x-1 shadow-md hover:scale-105 active:scale-95" title="Download Complete Source Code (.zip)">
        <span>📦 Source (.zip)</span>
      </a>
    </div>
  </header>

  <!-- Main Container -->
  <main class="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-8 z-10 relative space-y-6">

    <!-- Tab Selector Navigation -->
    <div class="bg-white/95 backdrop-blur-md border-2 border-emerald-300 rounded-2xl p-2 shadow-md flex flex-wrap items-center justify-between gap-2">
      <div class="flex flex-wrap items-center gap-1.5 sm:gap-2">
        <button onclick="switchTab('userFlow')" id="tabBtn-userFlow" class="tab-btn px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all bg-emerald-700 text-white shadow-xs">
          🚀 1. User Journey Flow
        </button>
        <button onclick="switchTab('uiuxState')" id="tabBtn-uiuxState" class="tab-btn px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all bg-emerald-50 text-emerald-900 hover:bg-emerald-100 border border-emerald-200">
          📱 2. UI/UX State Machine
        </button>
        <button onclick="switchTab('aiSequence')" id="tabBtn-aiSequence" class="tab-btn px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all bg-emerald-50 text-emerald-900 hover:bg-emerald-100 border border-emerald-200">
          🤖 3. Gemini Vision AI Pipeline
        </button>
        <button onclick="switchTab('techArch')" id="tabBtn-techArch" class="tab-btn px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all bg-emerald-50 text-emerald-900 hover:bg-emerald-100 border border-emerald-200">
          ☁️ 4. Full-Stack System Architecture
        </button>
        <button onclick="switchTab('teamProcess')" id="tabBtn-teamProcess" class="tab-btn px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all bg-emerald-50 text-emerald-900 hover:bg-emerald-100 border border-emerald-200">
          👥 5. Team Process Flow
        </button>
      </div>

      <div class="text-xs text-emerald-800 font-mono font-bold bg-emerald-100/90 px-3 py-1.5 rounded-xl border border-emerald-300">
        Standalone Flowchart Portal • Zero Clutter in Deck
      </div>
    </div>

    <!-- ======================================================== -->
    <!-- FLOWCHART 1: USER JOURNEY                                -->
    <!-- ======================================================== -->
    <div id="tabContent-userFlow" class="tab-content active space-y-4">
      <div class="bg-white/95 rounded-3xl border-2 border-emerald-300 p-6 light-card-shadow space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div class="inline-block bg-emerald-100 text-emerald-800 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider mb-1 border border-emerald-300">
              Schematic 1 of 5 • Citizen Lifecycle
            </div>
            <h2 class="text-2xl sm:text-3xl font-black text-slate-900">End-to-End Citizen User Journey Flowchart</h2>
            <p class="text-xs sm:text-sm text-slate-600 font-medium">From app discovery, GPS camera acquisition, cleanup, AI validation, points allotment, to brand coupon redemption.</p>
          </div>
          <a href="/mermaid-svgs/userFlow.svg" download="Clean_and_Earn_User_Journey_Flowchart.svg" class="text-xs bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold px-3 py-1.5 rounded-xl border border-emerald-300 shadow-2xs transition-transform active:scale-95">
            ⬇ Download SVG
          </a>
        </div>

        <!-- Pan-Zoom Container -->
        <div id="container-userFlow" class="pan-zoom-container relative w-full h-[580px] bg-emerald-50/30 rounded-2xl border-2 border-emerald-200 overflow-hidden cursor-grab shadow-inner select-none flex items-center justify-center">
          <div class="diagram-controls absolute top-3 right-3 z-30 flex items-center space-x-2 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border-2 border-emerald-200 shadow-xl">
            <span class="text-xs text-emerald-800 font-black hidden sm:inline mr-1">✋ Drag to Pan</span>
            <button onclick="panZoomInstances['userFlow'].zoomOut()" class="w-8 h-8 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300 text-base font-black flex items-center justify-center transition-all shadow-sm active:scale-95">−</button>
            <span id="zoom-badge-userFlow" class="text-xs font-mono font-black text-emerald-900 min-w-[46px] text-center">100%</span>
            <button onclick="panZoomInstances['userFlow'].zoomIn()" class="w-8 h-8 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300 text-base font-black flex items-center justify-center transition-all shadow-sm active:scale-95">+</button>
            <button onclick="panZoomInstances['userFlow'].reset()" class="px-3 h-8 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 transition-all shadow-sm active:scale-95">⟲ Reset</button>
          </div>
          <div class="absolute bottom-2.5 left-3 z-20 pointer-events-none">
            <span class="text-xs font-mono bg-white/90 text-emerald-900 font-bold px-2.5 py-1 rounded-lg border border-emerald-200 shadow-sm">
              💡 Drag with mouse/touch • Mouse Wheel: Zoom in/out
            </span>
          </div>
          <div id="content-userFlow" class="pan-zoom-content w-full h-full flex items-center justify-center p-3">
            {user_flow_svg}
          </div>
        </div>

        <!-- Technical Description Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-2">
          <div class="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-3.5 text-xs">
            <h4 class="font-black text-emerald-950 mb-1">Phase 1-2: Discovery &amp; Mission Lock</h4>
            <p class="text-slate-600 leading-relaxed">Hardware GPS lock captures 6-decimal latitude/longitude coordinates alongside initial dirty street photo proof.</p>
          </div>
          <div class="bg-teal-50/70 border border-teal-200 rounded-2xl p-3.5 text-xs">
            <h4 class="font-black text-teal-950 mb-1">Phase 3-4: Action &amp; AI Analysis</h4>
            <p class="text-slate-600 leading-relaxed">Google Gemini 1.5 Flash Vision evaluates spatial curb lines, pavement markings, and segregated waste thoroughness.</p>
          </div>
          <div class="bg-amber-50/70 border border-amber-200 rounded-2xl p-3.5 text-xs">
            <h4 class="font-black text-amber-950 mb-1">Phase 5: Atomic Ledger &amp; Rewards</h4>
            <p class="text-slate-600 leading-relaxed">Green points (20 to 50 pts) credited directly to user account and redeemable across 14 commercial partner vouchers.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- ======================================================== -->
    <!-- FLOWCHART 2: UI/UX STATE MACHINE                         -->
    <!-- ======================================================== -->
    <div id="tabContent-uiuxState" class="tab-content space-y-4">
      <div class="bg-white/95 rounded-3xl border-2 border-emerald-300 p-6 light-card-shadow space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div class="inline-block bg-teal-100 text-teal-800 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider mb-1 border border-teal-300">
              Schematic 2 of 5 • Screen Transitions
            </div>
            <h2 class="text-2xl sm:text-3xl font-black text-slate-900">UI/UX Screen Architecture &amp; State Machine</h2>
            <p class="text-xs sm:text-sm text-slate-600 font-medium">Complete client-side transition graph across Dashboard, MissionWizard, Rewards, History, and Auth Modals.</p>
          </div>
          <a href="/mermaid-svgs/uiuxState.svg" download="Clean_and_Earn_UIUX_State_Machine.svg" class="text-xs bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold px-3 py-1.5 rounded-xl border border-emerald-300 shadow-2xs transition-transform active:scale-95">
            ⬇ Download SVG
          </a>
        </div>

        <!-- Pan-Zoom Container -->
        <div id="container-uiuxState" class="pan-zoom-container relative w-full h-[580px] bg-emerald-50/30 rounded-2xl border-2 border-emerald-200 overflow-hidden cursor-grab shadow-inner select-none flex items-center justify-center">
          <div class="diagram-controls absolute top-3 right-3 z-30 flex items-center space-x-2 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border-2 border-emerald-200 shadow-xl">
            <span class="text-xs text-emerald-800 font-black hidden sm:inline mr-1">✋ Drag to Pan</span>
            <button onclick="panZoomInstances['uiuxState'].zoomOut()" class="w-8 h-8 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300 text-base font-black flex items-center justify-center transition-all shadow-sm active:scale-95">−</button>
            <span id="zoom-badge-uiuxState" class="text-xs font-mono font-black text-emerald-900 min-w-[46px] text-center">100%</span>
            <button onclick="panZoomInstances['uiuxState'].zoomIn()" class="w-8 h-8 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300 text-base font-black flex items-center justify-center transition-all shadow-sm active:scale-95">+</button>
            <button onclick="panZoomInstances['uiuxState'].reset()" class="px-3 h-8 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 transition-all shadow-sm active:scale-95">⟲ Reset</button>
          </div>
          <div class="absolute bottom-2.5 left-3 z-20 pointer-events-none">
            <span class="text-xs font-mono bg-white/90 text-emerald-900 font-bold px-2.5 py-1 rounded-lg border border-emerald-200 shadow-sm">
              💡 Drag with mouse/touch • Mouse Wheel: Zoom in/out
            </span>
          </div>
          <div id="content-uiuxState" class="pan-zoom-content w-full h-full flex items-center justify-center p-3">
            {uiux_state_svg}
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-2">
          <div class="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-3.5 text-xs">
            <h4 class="font-black text-emerald-950 mb-1">State Machine Modularity</h4>
            <p class="text-slate-600 leading-relaxed">BottomNav, Navbar, and MissionWizard operate in unified React state without full page reloads.</p>
          </div>
          <div class="bg-teal-50/70 border border-teal-200 rounded-2xl p-3.5 text-xs">
            <h4 class="font-black text-teal-950 mb-1">Outdoor Thumb-Zone Ergonomics</h4>
            <p class="text-slate-600 leading-relaxed">Central floating action trigger button and bottom navigation designed for one-handed outdoor use.</p>
          </div>
          <div class="bg-amber-50/70 border border-amber-200 rounded-2xl p-3.5 text-xs">
            <h4 class="font-black text-amber-950 mb-1">Auth &amp; Modal Overlays</h4>
            <p class="text-slate-600 leading-relaxed">Instant modals for Auth, Settings, Team Roster, and Rewards with zero loss of ongoing mission data.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- ======================================================== -->
    <!-- FLOWCHART 3: GEMINI AI VERIFICATION                      -->
    <!-- ======================================================== -->
    <div id="tabContent-aiSequence" class="tab-content space-y-4">
      <div class="bg-white/95 rounded-3xl border-2 border-emerald-300 p-6 light-card-shadow space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div class="inline-block bg-indigo-100 text-indigo-800 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider mb-1 border border-indigo-300">
              Schematic 3 of 5 • Multimodal Vision AI
            </div>
            <h2 class="text-2xl sm:text-3xl font-black text-slate-900">Google Gemini 1.5 Flash Vision Verification Sequence</h2>
            <p class="text-xs sm:text-sm text-slate-600 font-medium">Serverless API request pipeline, structured JSON schema enforcement, and built-in anti-fraud fallback.</p>
          </div>
          <a href="/mermaid-svgs/aiSequence.svg" download="Clean_and_Earn_AI_Sequence_Flowchart.svg" class="text-xs bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold px-3 py-1.5 rounded-xl border border-emerald-300 shadow-2xs transition-transform active:scale-95">
            ⬇ Download SVG
          </a>
        </div>

        <!-- Pan-Zoom Container -->
        <div id="container-aiSequence" class="pan-zoom-container relative w-full h-[580px] bg-emerald-50/30 rounded-2xl border-2 border-emerald-200 overflow-hidden cursor-grab shadow-inner select-none flex items-center justify-center">
          <div class="diagram-controls absolute top-3 right-3 z-30 flex items-center space-x-2 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border-2 border-emerald-200 shadow-xl">
            <span class="text-xs text-emerald-800 font-black hidden sm:inline mr-1">✋ Drag to Pan</span>
            <button onclick="panZoomInstances['aiSequence'].zoomOut()" class="w-8 h-8 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300 text-base font-black flex items-center justify-center transition-all shadow-sm active:scale-95">−</button>
            <span id="zoom-badge-aiSequence" class="text-xs font-mono font-black text-emerald-900 min-w-[46px] text-center">100%</span>
            <button onclick="panZoomInstances['aiSequence'].zoomIn()" class="w-8 h-8 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300 text-base font-black flex items-center justify-center transition-all shadow-sm active:scale-95">+</button>
            <button onclick="panZoomInstances['aiSequence'].reset()" class="px-3 h-8 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 transition-all shadow-sm active:scale-95">⟲ Reset</button>
          </div>
          <div class="absolute bottom-2.5 left-3 z-20 pointer-events-none">
            <span class="text-xs font-mono bg-white/90 text-emerald-900 font-bold px-2.5 py-1 rounded-lg border border-emerald-200 shadow-sm">
              💡 Drag with mouse/touch • Mouse Wheel: Zoom in/out
            </span>
          </div>
          <div id="content-aiSequence" class="pan-zoom-content w-full h-full flex items-center justify-center p-3">
            {ai_sequence_svg}
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-2">
          <div class="bg-indigo-50/70 border border-indigo-200 rounded-2xl p-3.5 text-xs">
            <h4 class="font-black text-indigo-950 mb-1">Structured JSON Schema</h4>
            <p class="text-slate-600 leading-relaxed">Response enforced via schema: <code class="font-mono text-[10px] bg-indigo-100 px-1 py-0.5 rounded">isValid, cleanScore, points, feedback</code>.</p>
          </div>
          <div class="bg-teal-50/70 border border-teal-200 rounded-2xl p-3.5 text-xs">
            <h4 class="font-black text-teal-950 mb-1">Geometric Consistency Check</h4>
            <p class="text-slate-600 leading-relaxed">Compares curb angles, background brick textures, and lighting to detect downloaded internet photos.</p>
          </div>
          <div class="bg-rose-50/70 border border-rose-200 rounded-2xl p-3.5 text-xs">
            <h4 class="font-black text-rose-950 mb-1">Neural Fallback Verification</h4>
            <p class="text-slate-600 leading-relaxed">Built-in heuristic engine provides zero-downtime evaluation if Gemini API quota or network is unavailable.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- ======================================================== -->
    <!-- FLOWCHART 4: TECH ARCHITECTURE                           -->
    <!-- ======================================================== -->
    <div id="tabContent-techArch" class="tab-content space-y-4">
      <div class="bg-white/95 rounded-3xl border-2 border-emerald-300 p-6 light-card-shadow space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div class="inline-block bg-emerald-100 text-emerald-800 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider mb-1 border border-emerald-300">
              Schematic 4 of 5 • Cloud &amp; Edge Infrastructure
            </div>
            <h2 class="text-2xl sm:text-3xl font-black text-slate-900">Full-Stack Cloud &amp; Edge System Architecture</h2>
            <p class="text-xs sm:text-sm text-slate-600 font-medium">Presentation tier, serverless edge routes, Google Gemini vision models, and Supabase PostgreSQL data layer.</p>
          </div>
          <a href="/mermaid-svgs/techArch.svg" download="Clean_and_Earn_Tech_Architecture.svg" class="text-xs bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold px-3 py-1.5 rounded-xl border border-emerald-300 shadow-2xs transition-transform active:scale-95">
            ⬇ Download SVG
          </a>
        </div>

        <!-- Pan-Zoom Container -->
        <div id="container-techArch" class="pan-zoom-container relative w-full h-[580px] bg-emerald-50/30 rounded-2xl border-2 border-emerald-200 overflow-hidden cursor-grab shadow-inner select-none flex items-center justify-center">
          <div class="diagram-controls absolute top-3 right-3 z-30 flex items-center space-x-2 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border-2 border-emerald-200 shadow-xl">
            <span class="text-xs text-emerald-800 font-black hidden sm:inline mr-1">✋ Drag to Pan</span>
            <button onclick="panZoomInstances['techArch'].zoomOut()" class="w-8 h-8 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300 text-base font-black flex items-center justify-center transition-all shadow-sm active:scale-95">−</button>
            <span id="zoom-badge-techArch" class="text-xs font-mono font-black text-emerald-900 min-w-[46px] text-center">100%</span>
            <button onclick="panZoomInstances['techArch'].zoomIn()" class="w-8 h-8 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300 text-base font-black flex items-center justify-center transition-all shadow-sm active:scale-95">+</button>
            <button onclick="panZoomInstances['techArch'].reset()" class="px-3 h-8 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 transition-all shadow-sm active:scale-95">⟲ Reset</button>
          </div>
          <div class="absolute bottom-2.5 left-3 z-20 pointer-events-none">
            <span class="text-xs font-mono bg-white/90 text-emerald-900 font-bold px-2.5 py-1 rounded-lg border border-emerald-200 shadow-sm">
              💡 Drag with mouse/touch • Mouse Wheel: Zoom in/out
            </span>
          </div>
          <div id="content-techArch" class="pan-zoom-content w-full h-full flex items-center justify-center p-3">
            {tech_arch_svg}
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-2">
          <div class="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-3.5 text-xs">
            <h4 class="font-black text-emerald-950 mb-1">Vercel Edge Network</h4>
            <p class="text-slate-600 leading-relaxed">Serverless deployment across global edge points of presence ensures sub-200ms TTFB across India.</p>
          </div>
          <div class="bg-teal-50/70 border border-teal-200 rounded-2xl p-3.5 text-xs">
            <h4 class="font-black text-teal-950 mb-1">Supabase PostgreSQL &amp; RLS</h4>
            <p class="text-slate-600 leading-relaxed">Atomic triggers update user points ledger automatically while Row-Level Security safeguards user data.</p>
          </div>
          <div class="bg-amber-50/70 border border-amber-200 rounded-2xl p-3.5 text-xs">
            <h4 class="font-black text-amber-950 mb-1">Offline-First Local Storage</h4>
            <p class="text-slate-600 leading-relaxed">Full localStorage fallback allows complete end-to-end operation in areas with low municipal connectivity.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- ======================================================== -->
    <!-- FLOWCHART 5: TEAM PROCESS FLOW                           -->
    <!-- ======================================================== -->
    <div id="tabContent-teamProcess" class="tab-content space-y-4">
      <div class="bg-white/95 rounded-3xl border-2 border-emerald-300 p-6 light-card-shadow space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div class="inline-block bg-green-100 text-green-800 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider mb-1 border border-green-300">
              Schematic 5 of 5 • Engineering Collaboration
            </div>
            <h2 class="text-2xl sm:text-3xl font-black text-slate-900">5-Phase Team Engineering &amp; Process Flowchart</h2>
            <p class="text-xs sm:text-sm text-slate-600 font-medium">Traceable breakdown of all 7 team members across Domain Research, App Dev, Deck Planning, QA, and Security.</p>
          </div>
          <a href="/team-process-flow.html" class="text-xs bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-3 py-1.5 rounded-xl shadow-2xs transition-transform active:scale-95">
            👥 Open Team Deck
          </a>
        </div>

        <!-- Pan-Zoom Container -->
        <div id="container-teamProcess" class="pan-zoom-container relative w-full h-[580px] bg-emerald-50/30 rounded-2xl border-2 border-emerald-200 overflow-hidden cursor-grab shadow-inner select-none flex items-center justify-center">
          <div class="diagram-controls absolute top-3 right-3 z-30 flex items-center space-x-2 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border-2 border-emerald-200 shadow-xl">
            <span class="text-xs text-emerald-800 font-black hidden sm:inline mr-1">✋ Drag to Pan</span>
            <button onclick="panZoomInstances['teamProcess'].zoomOut()" class="w-8 h-8 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300 text-base font-black flex items-center justify-center transition-all shadow-sm active:scale-95">−</button>
            <span id="zoom-badge-teamProcess" class="text-xs font-mono font-black text-emerald-900 min-w-[46px] text-center">100%</span>
            <button onclick="panZoomInstances['teamProcess'].zoomIn()" class="w-8 h-8 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300 text-base font-black flex items-center justify-center transition-all shadow-sm active:scale-95">+</button>
            <button onclick="panZoomInstances['teamProcess'].reset()" class="px-3 h-8 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 transition-all shadow-sm active:scale-95">⟲ Reset</button>
          </div>
          <div class="absolute bottom-2.5 left-3 z-20 pointer-events-none">
            <span class="text-xs font-mono bg-white/90 text-emerald-900 font-bold px-2.5 py-1 rounded-lg border border-emerald-200 shadow-sm">
              💡 Drag with mouse/touch • Mouse Wheel: Zoom in/out
            </span>
          </div>
          <div id="content-teamProcess" class="pan-zoom-content w-full h-full flex items-center justify-center p-3">
            {team_process_svg}
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-2">
          <div class="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-3.5 text-xs">
            <h4 class="font-black text-emerald-950 mb-1">Nikhil (Research)</h4>
            <p class="text-slate-600 leading-relaxed">Formulated 4 waste taxonomies, 20–50 pt allotment rules, and Swachh Bharat integration.</p>
          </div>
          <div class="bg-teal-50/70 border border-teal-200 rounded-2xl p-3.5 text-xs">
            <h4 class="font-black text-teal-950 mb-1">Divyanshu &amp; Aritra (Dev &amp; Decks)</h4>
            <p class="text-slate-600 leading-relaxed">Authored full Next.js 16 app router code, Gemini Vision API route, and both presentation decks.</p>
          </div>
          <div class="bg-amber-50/70 border border-amber-200 rounded-2xl p-3.5 text-xs">
            <h4 class="font-black text-amber-950 mb-1">Anurag, Sobhit, Aman, Amrit (QA &amp; Security)</h4>
            <p class="text-slate-600 leading-relaxed">Delivered light green theme, Pair 1 vs Pair 2 meme tests, 14-brand coupon store, and full-name auth reset.</p>
          </div>
        </div>
      </div>
    </div>

  </main>

  <!-- Footer -->
  <footer class="bg-white/95 border-t-2 border-emerald-200/80 px-4 sm:px-8 py-4 text-center text-xs text-slate-600 z-50">
    <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
      <p class="font-semibold text-emerald-950">Clean &amp; Earn (SafaiSaathi) — Architectural Flowcharts &amp; System Diagrams Portal</p>
      <div class="flex items-center space-x-3">
        <a href="/" class="hover:text-emerald-700 font-bold underline">Live App</a>
        <a href="/presentation.html" class="hover:text-emerald-700 font-bold underline">19-Slide Presentation</a>
        <a href="/team-process-flow.html" class="hover:text-emerald-700 font-bold underline">Team Flow Deck</a>
        <a href="/Team_and_Process_Flow_Presentation.docx" class="hover:text-emerald-700 font-bold underline">Team DOCX</a>
      </div>
    </div>
  </footer>

  <script>
    // Tab Switching
    function switchTab(tabId) {{
      document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
      document.querySelectorAll('.tab-btn').forEach(btn => {{
        btn.classList.remove('bg-emerald-700', 'text-white', 'shadow-xs');
        btn.classList.add('bg-emerald-50', 'text-emerald-900', 'hover:bg-emerald-100', 'border', 'border-emerald-200');
      }});

      const targetContent = document.getElementById('tabContent-' + tabId);
      const targetBtn = document.getElementById('tabBtn-' + tabId);

      if (targetContent) targetContent.classList.add('active');
      if (targetBtn) {{
        targetBtn.classList.remove('bg-emerald-50', 'text-emerald-900', 'hover:bg-emerald-100', 'border', 'border-emerald-200');
        targetBtn.classList.add('bg-emerald-700', 'text-white', 'shadow-xs');
      }}

      if (panZoomInstances[tabId]) {{
        panZoomInstances[tabId].updateTransform();
      }}
    }}

    // Universal Pan & Zoom Engine
    class PanZoom {{
      constructor(containerId, contentId, badgeId) {{
        this.container = document.getElementById(containerId);
        this.content = document.getElementById(contentId);
        this.badge = document.getElementById(badgeId);
        if (!this.container || !this.content) return;

        this.zoom = 1;
        this.panX = 0;
        this.panY = 0;
        this.isPanning = false;
        this.startX = 0;
        this.startY = 0;

        this.init();
      }}

      init() {{
        this.container.addEventListener('mousedown', (e) => this.onPointerDown(e.clientX, e.clientY));
        window.addEventListener('mousemove', (e) => this.onPointerMove(e.clientX, e.clientY));
        window.addEventListener('mouseup', () => this.onPointerUp());

        this.container.addEventListener('touchstart', (e) => {{
          if (e.touches.length === 1) {{
            this.onPointerDown(e.touches[0].clientX, e.touches[0].clientY);
          }}
        }}, {{ passive: true }});

        window.addEventListener('touchmove', (e) => {{
          if (this.isPanning && e.touches.length === 1) {{
            this.onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
          }}
        }}, {{ passive: true }});

        window.addEventListener('touchend', () => this.onPointerUp());

        this.container.addEventListener('wheel', (e) => {{
          e.preventDefault();
          const delta = e.deltaY < 0 ? 0.15 : -0.15;
          this.setZoom(this.zoom + delta);
        }}, {{ passive: false }});

        this.updateTransform();
      }}

      onPointerDown(x, y) {{
        this.isPanning = true;
        this.startX = x - this.panX;
        this.startY = y - this.panY;
        this.container.classList.add('cursor-grabbing');
      }}

      onPointerMove(x, y) {{
        if (!this.isPanning) return;
        this.panX = x - this.startX;
        this.panY = y - this.startY;
        this.updateTransform();
      }}

      onPointerUp() {{
        this.isPanning = false;
        if (this.container) this.container.classList.remove('cursor-grabbing');
      }}

      zoomIn() {{
        this.setZoom(this.zoom + 0.25);
      }}

      zoomOut() {{
        this.setZoom(this.zoom - 0.25);
      }}

      setZoom(val) {{
        this.zoom = Math.max(0.4, Math.min(val, 4.0));
        this.updateTransform();
      }}

      reset() {{
        this.zoom = 1;
        this.panX = 0;
        this.panY = 0;
        this.updateTransform();
      }}

      updateTransform() {{
        if (!this.content) return;
        this.content.style.transform = `translate(${{this.panX}}px, ${{this.panY}}px) scale(${{this.zoom}})`;
        if (this.badge) {{
          this.badge.innerText = Math.round(this.zoom * 100) + '%';
        }}
      }}
    }}

    const panZoomInstances = {{}};
    window.addEventListener('DOMContentLoaded', () => {{
      panZoomInstances['userFlow'] = new PanZoom('container-userFlow', 'content-userFlow', 'zoom-badge-userFlow');
      panZoomInstances['uiuxState'] = new PanZoom('container-uiuxState', 'content-uiuxState', 'zoom-badge-uiuxState');
      panZoomInstances['aiSequence'] = new PanZoom('container-aiSequence', 'content-aiSequence', 'zoom-badge-aiSequence');
      panZoomInstances['techArch'] = new PanZoom('container-techArch', 'content-techArch', 'zoom-badge-techArch');
      panZoomInstances['teamProcess'] = new PanZoom('container-teamProcess', 'content-teamProcess', 'zoom-badge-teamProcess');
    }});
  </script>
</body>
</html>
    """

    out_file = os.path.join(base_dir, 'flowcharts.html')
    public_file = os.path.join(base_dir, 'public', 'flowcharts.html')

    with open(out_file, 'w', encoding='utf-8') as f:
        f.write(html_content)

    shutil.copyfile(out_file, public_file)
    print(f"Flowchart portal created:\n1. {out_file}\n2. {public_file}")

if __name__ == '__main__':
    generate_flowcharts_html()
