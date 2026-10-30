'use client';

import React from 'react';
import {
  Users,
  Code2,
  Search,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Presentation,
  Download,
  X,
  Layers,
  Bug,
  Lightbulb,
  Cpu,
} from 'lucide-react';

interface TeamModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TeamModal: React.FC<TeamModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[92vh] flex flex-col shadow-2xl border border-emerald-200 overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-emerald-800 to-green-700 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black tracking-tight leading-tight">
                Project Team &amp; Process Flow
              </h2>
              <p className="text-[11px] text-emerald-100 font-medium">
                Step-by-Step Engineering Roles &amp; Contributions
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-slate-800">
          {/* Quick Summary Pill */}
          <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-3 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 block">
                Collaboration Architecture
              </span>
              <p className="text-xs font-bold text-emerald-950">
                7 Team Members • 3 Core Divisions • 5-Step Process Flow
              </p>
            </div>
            <div className="flex items-center space-x-1.5 shrink-0">
              <a
                href="/team-process-flow.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] bg-teal-700 hover:bg-teal-800 text-white font-bold px-2.5 py-1.5 rounded-xl shadow-2xs flex items-center space-x-1 transition-transform active:scale-95"
                title="Dedicated Team & Process Flow Presentation (8 Slides)"
              >
                <Users className="w-3.5 h-3.5" />
                <span>Team Flow Deck ↗</span>
              </a>
              <a
                href="/presentation.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-2.5 py-1.5 rounded-xl shadow-2xs flex items-center space-x-1 transition-transform active:scale-95"
                title="Main Clean & Earn Presentation (19 Slides)"
              >
                <Presentation className="w-3.5 h-3.5" />
                <span>Main PPT ↗</span>
              </a>
            </div>
          </div>

          {/* Section 1: Team Members Roster */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center space-x-1.5">
              <Users className="w-3.5 h-3.5 text-emerald-600" />
              <span>Team Roster &amp; Assigned Responsibilities</span>
            </h3>

            {/* Division 1: App Dev & PPT Planning */}
            <div className="bg-white border-2 border-emerald-300 rounded-2xl p-3.5 shadow-2xs space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
                    💻 App Development &amp; PPT Planning
                  </span>
                  <h4 className="text-sm font-black text-slate-900 mt-1">
                    Divyanshu &amp; Aritra
                  </h4>
                </div>
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200">
                  <Code2 className="w-4 h-4" />
                </div>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                Engineered the entire Next.js 16 App Router application, Google Gemini 1.5 Flash Vision AI pipeline, Supabase schemas, local reactive store, Rewards coupon redemption catalog, and Auth modal. Additionally structured the interactive presentation deck, draggable Mermaid diagrams, and bilingual presentation speaker notes.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="text-[9px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-semibold">Next.js 16</span>
                <span className="text-[9px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-semibold">Gemini Vision AI</span>
                <span className="text-[9px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-semibold">Supabase DB</span>
                <span className="text-[9px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-semibold">Interactive PPT Deck</span>
              </div>
            </div>

            {/* Division 2: Research & Suggestions */}
            <div className="bg-white border-2 border-teal-300 rounded-2xl p-3.5 shadow-2xs space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full border border-teal-200">
                    🔬 Research &amp; Suggestions
                  </span>
                  <h4 className="text-sm font-black text-slate-900 mt-1">
                    Nikhil
                  </h4>
                </div>
                <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 border border-teal-200">
                  <Search className="w-4 h-4" />
                </div>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                Conducted deep-dive research into Swachh Bharat civic sanitation guidelines, defined the 4 municipal solid waste categories (Organic, Plastic, E-Waste, Mixed), established the 20–50 Green Points economic reward framework, and researched brand coupon partnerships (Amazon, Flipkart, Zomato, Uber, Ola).
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="text-[9px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-semibold">Swachh Bharat Norms</span>
                <span className="text-[9px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-semibold">Waste Taxonomy</span>
                <span className="text-[9px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-semibold">Incentive Modeling</span>
                <span className="text-[9px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-semibold">Brand Rewards</span>
              </div>
            </div>

            {/* Division 3: Bug Testing & Suggestions */}
            <div className="bg-white border-2 border-amber-300 rounded-2xl p-3.5 shadow-2xs space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full border border-amber-200">
                    🛡️ Bug Testing Team &amp; Suggestion Providers
                  </span>
                  <h4 className="text-sm font-black text-slate-900 mt-1">
                    Anurag, Sobhit, Aman, Amrit
                  </h4>
                </div>
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-200">
                  <Bug className="w-4 h-4" />
                </div>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                Subjected the application to exhaustive cross-device QA, edge-case analysis, and security verification. Provided critical project-shaping suggestions:
              </p>
              <ul className="text-[11px] text-slate-700 space-y-1.5 pl-1">
                <li className="flex items-start space-x-1.5">
                  <span className="font-bold text-amber-800 shrink-0">• Anurag:</span>
                  <span>Tested camera viewfinder capture across mobile screens; recommended high-contrast PPT typography for projector clarity.</span>
                </li>
                <li className="flex items-start space-x-1.5">
                  <span className="font-bold text-amber-800 shrink-0">• Sobhit:</span>
                  <span>Formulated anti-fraud verification tests: Pair 1 (authentic street) vs Pair 2 (cat meme internet photo rejection).</span>
                </li>
                <li className="flex items-start space-x-1.5">
                  <span className="font-bold text-amber-800 shrink-0">• Aman:</span>
                  <span>Tested point deduction &amp; coupon issuance flow; suggested 1-click clipboard code copy and validity timers.</span>
                </li>
                <li className="flex items-start space-x-1.5">
                  <span className="font-bold text-amber-800 shrink-0">• Amrit:</span>
                  <span>Audited authentication security; recommended removing hardcoded Aarav account and requiring old password for password resets.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Section 2: Step-by-Step Progress Process Flow */}
          <div className="space-y-2.5 pt-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center space-x-1.5">
              <Layers className="w-3.5 h-3.5 text-emerald-600" />
              <span>Step-by-Step Development Progress Flow</span>
            </h3>

            <div className="space-y-2 relative before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-emerald-200 pl-8">
              {/* Step 1 */}
              <div className="relative">
                <div className="absolute -left-8 top-1 w-5 h-5 rounded-full bg-teal-600 text-white text-[10px] font-black flex items-center justify-center shadow-xs">
                  1
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">
                      Step 1: Domain Research &amp; Waste Taxonomy
                    </span>
                    <span className="text-[10px] font-black bg-teal-100 text-teal-800 px-1.5 py-0.2 rounded">
                      Nikhil
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-600 mt-1">
                    Analyzed civic sanitation barriers, drafted 4 waste categories, and mapped reward points economics.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="absolute -left-8 top-1 w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-black flex items-center justify-center shadow-xs">
                  2
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">
                      Step 2: Full-Stack App &amp; Multimodal AI Build
                    </span>
                    <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded">
                      Divyanshu &amp; Aritra
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-600 mt-1">
                    Coded Next.js 16 UI, Gemini 1.5 Flash Vision API (`/api/verify`), Supabase schemas, and local store.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative">
                <div className="absolute -left-8 top-1 w-5 h-5 rounded-full bg-emerald-700 text-white text-[10px] font-black flex items-center justify-center shadow-xs">
                  3
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">
                      Step 3: Interactive PPT Deck &amp; Pan/Zoom Diagrams
                    </span>
                    <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded">
                      Divyanshu &amp; Aritra
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-600 mt-1">
                    Engineered 19-slide deck with Light Green Cream theme, 10% opacity nature SVG, and speaker notes.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative">
                <div className="absolute -left-8 top-1 w-5 h-5 rounded-full bg-amber-600 text-white text-[10px] font-black flex items-center justify-center shadow-xs">
                  4
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">
                      Step 4: Rigorous Bug Testing &amp; Suggestion Provision
                    </span>
                    <span className="text-[10px] font-black bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded">
                      Anurag, Sobhit, Aman, Amrit
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-600 mt-1">
                    Executed Pair 1 vs Pair 2 tests, flagged default user vulnerability, and recommended old-password validation.
                  </p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="relative">
                <div className="absolute -left-8 top-1 w-5 h-5 rounded-full bg-green-700 text-white text-[10px] font-black flex items-center justify-center shadow-xs">
                  5
                </div>
                <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-950">
                      Step 5: Suggestions Integration &amp; Production Deploy
                    </span>
                    <span className="text-[10px] font-black bg-emerald-200 text-emerald-950 px-1.5 py-0.2 rounded">
                      All 7 Members
                    </span>
                  </div>
                  <p className="text-[10px] text-emerald-900 mt-1">
                    Built open AuthModal with old password check, 14-brand rewards catalog, and deployed live to Vercel production edge.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2.5 shrink-0">
          <a
            href="/team-process-flow.html"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2 px-3 bg-gradient-to-r from-teal-700 to-emerald-700 hover:from-teal-800 hover:to-emerald-800 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-1.5 shadow-xs transition-all text-center min-w-[140px]"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Team Flow Deck (8 Slides)</span>
          </a>
          <a
            href="/presentation.html"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2 px-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-1.5 shadow-xs transition-all text-center min-w-[140px]"
          >
            <Presentation className="w-3.5 h-3.5" />
            <span>Main PPT Deck (19 Slides)</span>
          </a>
          <button
            onClick={onClose}
            className="py-2 px-4 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
