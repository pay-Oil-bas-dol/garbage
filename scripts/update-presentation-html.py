import os

def update_presentation():
    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    pres_file = os.path.join(base_dir, 'presentation.html')

    with open(pres_file, 'r', encoding='utf-8') as f:
        text = f.read()

    # 1. Update Header to have id="mainHeader" and hidden class
    # Also add floating "i" toggle button
    old_header_tag = '<header class="bg-white/95 backdrop-blur-md border-b-2 border-emerald-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between z-50 sticky top-0 shadow-md">'
    new_header_tag = '<header id="mainHeader" class="bg-white/95 backdrop-blur-md border-b-2 border-emerald-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between z-50 sticky top-0 shadow-md hidden">'

    floating_button = """  <!-- Floating "i" Icon Button (Header is hidden by default; click 'i' or press 'H' to toggle header) -->
  <button id="toggleHeaderBtn" class="fixed top-4 right-4 z-50 w-11 h-11 rounded-2xl bg-white/95 hover:bg-emerald-50 text-emerald-800 hover:text-emerald-950 border-2 border-emerald-300 shadow-lg backdrop-blur-md flex items-center justify-center font-black text-xl transition-all hover:scale-110 active:scale-95 cursor-pointer" title="Click to show/hide header navigation & controls (Shortcut: 'H')">
    <span class="font-serif italic font-bold">ℹ</span>
  </button>
"""

    if old_header_tag in text:
        text = text.replace(old_header_tag, floating_button + '  ' + new_header_tag)
    elif '<header id="mainHeader"' not in text:
        text = text.replace('<header class="', floating_button + '  <header id="mainHeader" class="hidden ')

    # 2. Add Flowcharts Portal button in header if not already there
    flowchart_btn = """      <!-- Dedicated Flowcharts Website Portal -->
      <a href="/flowcharts.html" target="_blank" class="bg-gradient-to-r from-emerald-700 to-teal-700 hover:opacity-95 text-white text-xs sm:text-sm font-bold px-3.5 py-2 rounded-xl transition-all flex items-center space-x-1.5 shadow-md hover:scale-105 active:scale-95" title="Open Dedicated Flowcharts & Diagrams Portal">
        <span>📐 Flowcharts Portal</span>
      </a>
"""
    if 'href="/flowcharts.html"' not in text:
        text = text.replace('<!-- Dedicated Team & Process Flow Presentation Deck -->', flowchart_btn + '      <!-- Dedicated Team & Process Flow Presentation Deck -->')

    # 3. Slide 5 and Slide 6 Replacement
    slide5_card = """<!-- ========================================== -->
    <!-- SLIDE 5: CITIZEN JOURNEY ARCHITECTURE (NO FLOWCHART) -->
    <!-- ========================================== -->
    <div class="slide flex-col max-w-6xl p-6 sm:p-10 bg-white/95 rounded-3xl border-2 border-emerald-200/90 light-card-shadow w-full" data-notes="This slide outlines the 5-phase citizen user journey. From discovering the app and initiating a cleanup with GPS tagging, to physical trash collection, Google Gemini multimodal AI verification, and atomic points allotment. Flowcharts are now separated into a dedicated portal accessible via the button below.">
      <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div>
          <div class="inline-block bg-emerald-100/90 text-emerald-800 text-xs sm:text-sm font-black px-3.5 py-1 rounded-full uppercase tracking-wider mb-1 border border-emerald-300">
            Slide 5 — Citizen User Journey Architecture
          </div>
          <h2 class="text-2xl sm:text-3xl font-black text-slate-900">5-Phase Citizen Lifecycle &amp; Verification Path</h2>
        </div>
        <a href="/flowcharts.html" target="_blank" class="text-xs bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-3.5 py-2 rounded-xl shadow-xs transition-transform active:scale-95 flex items-center space-x-1">
          <span>📐 Open Flowcharts Portal ↗</span>
        </a>
      </div>

      <!-- 5-Phase Architectural Cards -->
      <div class="grid grid-cols-1 md:grid-cols-5 gap-3.5 my-auto">
        <div class="bg-gradient-to-b from-emerald-50 to-white border-2 border-emerald-200 rounded-2xl p-4 flex flex-col justify-between space-y-3 shadow-xs">
          <div>
            <span class="text-[10px] font-black uppercase tracking-wider bg-emerald-200/80 text-emerald-900 px-2 py-0.5 rounded-full">Phase 1</span>
            <h3 class="text-sm font-black text-slate-900 mt-2">Discovery &amp; Onboard</h3>
            <p class="text-xs text-slate-600 mt-1 leading-relaxed">Instant access via mobile PWA. View community cleanup stats, city leaderboard, and personal wallet balance.</p>
          </div>
          <div class="text-[11px] font-bold text-emerald-800 bg-emerald-100/60 p-2 rounded-xl border border-emerald-200">
            ✓ Guest or Permanent Auth
          </div>
        </div>

        <div class="bg-gradient-to-b from-teal-50 to-white border-2 border-teal-200 rounded-2xl p-4 flex flex-col justify-between space-y-3 shadow-xs">
          <div>
            <span class="text-[10px] font-black uppercase tracking-wider bg-teal-200/80 text-teal-900 px-2 py-0.5 rounded-full">Phase 2</span>
            <h3 class="text-sm font-black text-slate-900 mt-2">Mission Setup</h3>
            <p class="text-xs text-slate-600 mt-1 leading-relaxed">Select waste category (Plastic, Organic, Mixed). Acquire GPS coordinates and snap initial &quot;Before&quot; photo.</p>
          </div>
          <div class="text-[11px] font-bold text-teal-800 bg-teal-100/60 p-2 rounded-xl border border-teal-200">
            ✓ 6-Decimal GPS Lock
          </div>
        </div>

        <div class="bg-gradient-to-b from-blue-50 to-white border-2 border-blue-200 rounded-2xl p-4 flex flex-col justify-between space-y-3 shadow-xs">
          <div>
            <span class="text-[10px] font-black uppercase tracking-wider bg-blue-200/80 text-blue-900 px-2 py-0.5 rounded-full">Phase 3</span>
            <h3 class="text-sm font-black text-slate-900 mt-2">Physical Cleanup</h3>
            <p class="text-xs text-slate-600 mt-1 leading-relaxed">Citizen cleans litter, segregates into color-coded eco-bags, and captures &quot;After&quot; photo from matching angle.</p>
          </div>
          <div class="text-[11px] font-bold text-blue-800 bg-blue-100/60 p-2 rounded-xl border border-blue-200">
            ✓ Eco-Bag Segregation
          </div>
        </div>

        <div class="bg-gradient-to-b from-indigo-50 to-white border-2 border-indigo-200 rounded-2xl p-4 flex flex-col justify-between space-y-3 shadow-xs">
          <div>
            <span class="text-[10px] font-black uppercase tracking-wider bg-indigo-200/80 text-indigo-900 px-2 py-0.5 rounded-full">Phase 4</span>
            <h3 class="text-sm font-black text-slate-900 mt-2">AI Verification</h3>
            <p class="text-xs text-slate-600 mt-1 leading-relaxed">Serverless route passes photo pair to Gemini 1.5 Flash Vision. Verifies spatial landmarks and rejects internet memes.</p>
          </div>
          <div class="text-[11px] font-bold text-indigo-800 bg-indigo-100/60 p-2 rounded-xl border border-indigo-200">
            ✓ Sub-2s Multimodal Vision
          </div>
        </div>

        <div class="bg-gradient-to-b from-amber-50 to-white border-2 border-amber-200 rounded-2xl p-4 flex flex-col justify-between space-y-3 shadow-xs">
          <div>
            <span class="text-[10px] font-black uppercase tracking-wider bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded-full">Phase 5</span>
            <h3 class="text-sm font-black text-slate-900 mt-2">Ledger &amp; Rewards</h3>
            <p class="text-xs text-slate-600 mt-1 leading-relaxed">Atomic increment adds 20-50 Green Points. Transaction recorded in public ledger; points redeemable for 14 brands.</p>
          </div>
          <div class="text-[11px] font-bold text-amber-900 bg-amber-100/60 p-2 rounded-xl border border-amber-200">
            ✓ 14-Brand Vouchers
          </div>
        </div>
      </div>

      <div class="mt-4 p-3 bg-emerald-50/80 border border-emerald-300 rounded-2xl flex items-center justify-between text-xs">
        <span class="text-emerald-950 font-bold">💡 Note: All interactive Mermaid flowchart schematics have been decoupled into the dedicated Flowcharts Website.</span>
        <a href="/flowcharts.html" target="_blank" class="text-emerald-800 font-black underline hover:text-emerald-950">Inspect Vector Diagram →</a>
      </div>
    </div>"""

    slide6_card = """<!-- ========================================== -->
    <!-- SLIDE 6: UI/UX MULTI-SCREEN ARCHITECTURE (NO FLOWCHART) -->
    <!-- ========================================== -->
    <div class="slide flex-col max-w-6xl p-6 sm:p-10 bg-white/95 rounded-3xl border-2 border-emerald-200/90 light-card-shadow w-full" data-notes="This slide demonstrates our componentized UI/UX architecture built on Next.js 16 and React 19. It highlights our thumb-zone navigation, live camera viewfinder, rewards store, and public ledger without displaying any flowcharts in this presentation deck.">
      <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div>
          <div class="inline-block bg-teal-100 text-teal-800 text-xs sm:text-sm font-black px-3.5 py-1 rounded-full uppercase tracking-wider mb-1 border border-teal-300">
            Slide 6 — UI/UX Screen Architecture
          </div>
          <h2 class="text-2xl sm:text-3xl font-black text-slate-900">Modular Screen Structure &amp; Interaction Hierarchy</h2>
        </div>
        <a href="/flowcharts.html" target="_blank" class="text-xs bg-teal-700 hover:bg-teal-800 text-white font-bold px-3.5 py-2 rounded-xl shadow-xs transition-transform active:scale-95 flex items-center space-x-1">
          <span>📐 State Machine Diagram ↗</span>
        </a>
      </div>

      <!-- 4 Screen Pillar Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 my-auto">
        <div class="bg-gradient-to-br from-emerald-50 to-white border-2 border-emerald-200 rounded-2xl p-4 space-y-2.5 shadow-xs">
          <div class="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-lg">🏠</div>
          <h3 class="text-base font-black text-slate-900">Dashboard &amp; Stats</h3>
          <p class="text-xs text-slate-600 leading-relaxed">Gamified points banner, real-time community impact ticker, active mission card, and quick links to historical cleanups.</p>
          <ul class="text-[11px] text-slate-500 space-y-1 pt-1">
            <li>• Points balance pill</li>
            <li>• One-touch mission start</li>
            <li>• City leaderboard ranks</li>
          </ul>
        </div>

        <div class="bg-gradient-to-br from-teal-50 to-white border-2 border-teal-200 rounded-2xl p-4 space-y-2.5 shadow-xs">
          <div class="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-black text-lg">📷</div>
          <h3 class="text-base font-black text-slate-900">MissionWizard</h3>
          <p class="text-xs text-slate-600 leading-relaxed">3-step modal with live mobile camera viewfinder, category picker, GPS accuracy check, and AI progress spinner.</p>
          <ul class="text-[11px] text-slate-500 space-y-1 pt-1">
            <li>• WebRTC Camera stream</li>
            <li>• GPS fallback coordinates</li>
            <li>• Before/After comparison</li>
          </ul>
        </div>

        <div class="bg-gradient-to-br from-amber-50 to-white border-2 border-amber-200 rounded-2xl p-4 space-y-2.5 shadow-xs">
          <div class="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center font-black text-lg">🎁</div>
          <h3 class="text-base font-black text-slate-900">Rewards Catalog</h3>
          <p class="text-xs text-slate-600 leading-relaxed">14-brand coupon voucher marketplace spanning Amazon, Flipkart, Zomato, Uber, Ola, and Swiggy with instant code copy.</p>
          <ul class="text-[11px] text-slate-500 space-y-1 pt-1">
            <li>• Category filters</li>
            <li>• Dynamic point deduction</li>
            <li>• One-click voucher copy</li>
          </ul>
        </div>

        <div class="bg-gradient-to-br from-indigo-50 to-white border-2 border-indigo-200 rounded-2xl p-4 space-y-2.5 shadow-xs">
          <div class="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-lg">📜</div>
          <h3 class="text-base font-black text-slate-900">History &amp; Ledger</h3>
          <p class="text-xs text-slate-600 leading-relaxed">Public proof ledger with interactive before/after split slider, AI verification feedback, and city transparency audit.</p>
          <ul class="text-[11px] text-slate-500 space-y-1 pt-1">
            <li>• Draggable split slider</li>
            <li>• AI explanation badges</li>
            <li>• Permanent audit trail</li>
          </ul>
        </div>
      </div>

      <div class="mt-4 p-3 bg-teal-50/80 border border-teal-300 rounded-2xl flex items-center justify-between text-xs">
        <span class="text-teal-950 font-bold">💡 Note: The complete UI/UX state machine and transition flowchart is hosted on the dedicated Flowcharts Portal.</span>
        <a href="/flowcharts.html" target="_blank" class="text-teal-800 font-black underline hover:text-teal-950">View State Machine Diagram →</a>
      </div>
    </div>"""

    # 4. Slide 13 and Slide 14 Replacement
    slide13_card = """<!-- ========================================== -->
    <!-- SLIDE 13: AI MULTIMODAL PIPELINE (NO FLOWCHART) -->
    <!-- ========================================== -->
    <div class="slide flex-col max-w-6xl p-6 sm:p-10 bg-white/95 rounded-3xl border-2 border-emerald-200/90 light-card-shadow w-full" data-notes="This slide breaks down our Google Gemini 1.5 Flash Vision AI verification pipeline. Instead of a busy flowchart, we present the four core verification stages: multimodal base64 ingestion, spatial landmark consistency matching, thoroughness calculation, and our neural heuristic anti-fraud fallback.">
      <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div>
          <div class="inline-block bg-indigo-100 text-indigo-800 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider mb-1 border border-indigo-300">
            Slide 13 — AI Verification Architecture
          </div>
          <h2 class="text-2xl sm:text-3xl font-black text-slate-900">Google Gemini 1.5 Flash Vision Verification Engine</h2>
        </div>
        <a href="/flowcharts.html" target="_blank" class="text-xs bg-indigo-700 hover:bg-indigo-800 text-white font-bold px-3.5 py-2 rounded-xl shadow-xs transition-transform active:scale-95 flex items-center space-x-1">
          <span>📐 AI Sequence Flowchart ↗</span>
        </a>
      </div>

      <!-- 4 Verification Stages -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 my-auto">
        <div class="bg-gradient-to-br from-indigo-50 to-white border-2 border-indigo-200 rounded-2xl p-4 space-y-2.5 shadow-xs">
          <div class="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-sm">01</div>
          <h3 class="text-base font-black text-slate-900">Dual Ingestion</h3>
          <p class="text-xs text-slate-600 leading-relaxed">Accepts Before and After photos in base64 format with GPS metadata. Dispatched to serverless edge route <code class="bg-indigo-100 text-indigo-900 px-1 py-0.5 rounded font-mono font-bold">/api/verify</code>.</p>
        </div>

        <div class="bg-gradient-to-br from-emerald-50 to-white border-2 border-emerald-200 rounded-2xl p-4 space-y-2.5 shadow-xs">
          <div class="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-sm">02</div>
          <h3 class="text-base font-black text-slate-900">Landmark Check</h3>
          <p class="text-xs text-slate-600 leading-relaxed">Gemini 1.5 Flash Vision inspects curb contours, background walls, road cracks, and light direction to guarantee identical physical location.</p>
        </div>

        <div class="bg-gradient-to-br from-amber-50 to-white border-2 border-amber-200 rounded-2xl p-4 space-y-2.5 shadow-xs">
          <div class="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center font-black text-sm">03</div>
          <h3 class="text-base font-black text-slate-900">Thoroughness Score</h3>
          <p class="text-xs text-slate-600 leading-relaxed">Measures trash surface clearance and assigns 20 to 50 Green Points based on waste category and verified volume reduction.</p>
        </div>

        <div class="bg-gradient-to-br from-rose-50 to-white border-2 border-rose-200 rounded-2xl p-4 space-y-2.5 shadow-xs">
          <div class="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center font-black text-sm">04</div>
          <h3 class="text-base font-black text-slate-900">Anti-Fraud &amp; Fallback</h3>
          <p class="text-xs text-slate-600 leading-relaxed">Catches joke memes (Pair 2 test) and web graphics. Built-in neural heuristic fallback ensures zero downtime when offline.</p>
        </div>
      </div>

      <div class="mt-4 p-3 bg-indigo-50/80 border border-indigo-300 rounded-2xl flex items-center justify-between text-xs">
        <span class="text-indigo-950 font-bold">💡 Note: The complete sequence diagram with API lifecycles is viewable on the dedicated Flowcharts Website.</span>
        <a href="/flowcharts.html" target="_blank" class="text-indigo-800 font-black underline hover:text-indigo-950">Inspect AI Sequence Flowchart →</a>
      </div>
    </div>"""

    slide14_card = """<!-- ========================================== -->
    <!-- SLIDE 14: SYSTEM ARCHITECTURE (NO FLOWCHART) -->
    <!-- ========================================== -->
    <div class="slide flex-col max-w-6xl p-6 sm:p-10 bg-white/95 rounded-3xl border-2 border-emerald-200/90 light-card-shadow w-full" data-notes="This slide summarizes our 4-tier full-stack system architecture: client presentation layer, Vercel serverless compute edge, Google Gemini vision models, and Supabase PostgreSQL with atomic triggers. All architectural diagrams are hosted separately on the Flowcharts Website.">
      <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div>
          <div class="inline-block bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-black px-3.5 py-1 rounded-full uppercase tracking-wider mb-1 border border-emerald-300">
            Slide 14 — System Architecture
          </div>
          <h2 class="text-2xl sm:text-3xl font-black text-slate-900">4-Tier Cloud &amp; Edge Infrastructure Stack</h2>
        </div>
        <a href="/flowcharts.html" target="_blank" class="text-xs bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-3.5 py-2 rounded-xl shadow-xs transition-transform active:scale-95 flex items-center space-x-1">
          <span>📐 Full System Architecture Diagram ↗</span>
        </a>
      </div>

      <!-- 4 Infrastructure Tiers -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 my-auto">
        <div class="bg-gradient-to-br from-emerald-50 to-white border-2 border-emerald-200 rounded-2xl p-4 space-y-2.5 shadow-xs">
          <span class="text-[10px] font-black uppercase tracking-wider bg-emerald-200/80 text-emerald-900 px-2 py-0.5 rounded-full">Tier 1: Client</span>
          <h3 class="text-base font-black text-slate-900">React 19 &amp; Next.js 16</h3>
          <p class="text-xs text-slate-600 leading-relaxed">Mobile-first PWA with Tailwind CSS, HTML5 camera capture, GPS geolocation API, and reactive state management.</p>
        </div>

        <div class="bg-gradient-to-br from-teal-50 to-white border-2 border-teal-200 rounded-2xl p-4 space-y-2.5 shadow-xs">
          <span class="text-[10px] font-black uppercase tracking-wider bg-teal-200/80 text-teal-900 px-2 py-0.5 rounded-full">Tier 2: Compute</span>
          <h3 class="text-base font-black text-slate-900">Vercel Serverless Edge</h3>
          <p class="text-xs text-slate-600 leading-relaxed">Edge network deployment across Indian PoPs providing sub-200ms latency, automatic rate-limiting, and CORS protection.</p>
        </div>

        <div class="bg-gradient-to-br from-indigo-50 to-white border-2 border-indigo-200 rounded-2xl p-4 space-y-2.5 shadow-xs">
          <span class="text-[10px] font-black uppercase tracking-wider bg-indigo-200/80 text-indigo-900 px-2 py-0.5 rounded-full">Tier 3: AI Inference</span>
          <h3 class="text-base font-black text-slate-900">Google Gemini 1.5 Flash</h3>
          <p class="text-xs text-slate-600 leading-relaxed">Multimodal vision model enforcing structured JSON responses and spatial consistency comparison between dual images.</p>
        </div>

        <div class="bg-gradient-to-br from-amber-50 to-white border-2 border-amber-200 rounded-2xl p-4 space-y-2.5 shadow-xs">
          <span class="text-[10px] font-black uppercase tracking-wider bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded-full">Tier 4: Storage</span>
          <h3 class="text-base font-black text-slate-900">Supabase &amp; LocalStore</h3>
          <p class="text-xs text-slate-600 leading-relaxed">PostgreSQL schema with Row-Level Security and atomic point calculation triggers, plus complete offline fallback.</p>
        </div>
      </div>

      <div class="mt-4 p-3 bg-emerald-50/80 border border-emerald-300 rounded-2xl flex items-center justify-between text-xs">
        <span class="text-emerald-950 font-bold">💡 Note: The complete multi-tier cloud infrastructure diagram is accessible on the dedicated Flowcharts Portal.</span>
        <a href="/flowcharts.html" target="_blank" class="text-emerald-800 font-black underline hover:text-emerald-950">View System Architecture Diagram →</a>
      </div>
    </div>"""

    # Perform slice replacements
    s5_banner = text.rfind('<!-- ===', 0, text.find('<!-- SLIDE 5:'))
    s7_banner = text.rfind('<!-- ===', 0, text.find('<!-- SLIDE 7:'))
    text = text[:s5_banner] + slide5_card + '\n\n    ' + slide6_card + '\n\n    ' + text[s7_banner:]

    s13_banner = text.rfind('<!-- ===', 0, text.find('<!-- SLIDE 13:'))
    s15_banner = text.rfind('<!-- ===', 0, text.find('<!-- SLIDE 15:'))
    text = text[:s13_banner] + slide13_card + '\n\n    ' + slide14_card + '\n\n    ' + text[s15_banner:]

    # 5. Handle JS header toggle
    js_header_toggle = """
    // Toggle Header with Floating 'i' Button
    const mainHeader = document.getElementById('mainHeader');
    const toggleHeaderBtn = document.getElementById('toggleHeaderBtn');
    if (toggleHeaderBtn && mainHeader) {
      toggleHeaderBtn.addEventListener('click', () => {
        mainHeader.classList.toggle('hidden');
      });
    }
"""
    if 'toggleHeaderBtn.addEventListener' not in text:
        text = text.replace("toggleNotesBtn.addEventListener('click', () => {", js_header_toggle + "\n    toggleNotesBtn.addEventListener('click', () => {")

    if "e.key.toLowerCase() === 'h'" not in text:
        text = text.replace("} else if (e.key.toLowerCase() === 'n') {", "} else if (e.key.toLowerCase() === 'h') {\n        if (mainHeader) mainHeader.classList.toggle('hidden');\n      } else if (e.key.toLowerCase() === 'n') {")

    # Save to presentation.html and public/presentation.html
    with open(pres_file, 'w', encoding='utf-8') as f:
        f.write(text)

    public_pres = os.path.join(base_dir, 'public', 'presentation.html')
    with open(public_pres, 'w', encoding='utf-8') as f:
        f.write(text)

    print("Success! presentation.html and public/presentation.html updated.")

if __name__ == '__main__':
    update_presentation()
