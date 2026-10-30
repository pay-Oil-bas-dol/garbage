'use client';

import React, { useState } from 'react';
import {
  Settings,
  Key,
  Database,
  RefreshCw,
  FolderOpen,
  CheckCircle,
  ExternalLink,
  ShieldCheck,
  Cpu,
  Download,
  FileCode,
} from 'lucide-react';
import { getSavedGeminiKey, saveGeminiKey, resetDemoData } from '@/lib/store';
import { isSupabaseConfigured } from '@/lib/supabase';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataReset: () => void;
  onTriggerDemoPair: (pairNumber: 1 | 2) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  onDataReset,
  onTriggerDemoPair,
}) => {
  const [apiKey, setApiKey] = useState(getSavedGeminiKey());
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSaveKey = () => {
    saveGeminiKey(apiKey);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleReset = () => {
    if (confirm('Reset all demo missions and restore default user Aarav Sharma?')) {
      resetDemoData();
      onDataReset();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-sm w-full p-5 space-y-4 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900">App Settings &amp; AI Config</h3>
              <p className="text-[10px] text-slate-500">Gemini Vision &amp; Supabase</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        {/* Gemini Vision AI Config */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <label className="font-bold text-slate-800 flex items-center space-x-1.5">
              <Key className="w-3.5 h-3.5 text-emerald-600" />
              <span>Google Gemini API Key</span>
            </label>
            <span className="text-[9px] bg-emerald-100 text-emerald-800 font-semibold px-1.5 py-0.5 rounded">
              Optional
            </span>
          </div>
          <p className="text-[11px] text-slate-500 leading-normal">
            If provided, calls official Gemini 1.5 Flash Vision. If omitted, uses the built-in
            Free Neural Verifier engine for zero-setup grading.
          </p>
          <div className="flex space-x-1.5">
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AIzaSy... (or leave blank for free engine)"
              className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500/20 outline-none"
            />
            <button
              onClick={handleSaveKey}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors"
            >
              Save
            </button>
          </div>
          {savedSuccess && (
            <p className="text-[10px] text-emerald-700 font-medium flex items-center space-x-1">
              <CheckCircle className="w-3 h-3" />
              <span>API key updated!</span>
            </p>
          )}
        </div>

        {/* Supabase Status */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-1.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-800 flex items-center space-x-1.5">
              <Database className="w-3.5 h-3.5 text-teal-600" />
              <span>Supabase Database</span>
            </span>
            <span
              className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                isSupabaseConfigured
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              {isSupabaseConfigured ? 'Connected' : 'Demo / LocalStorage Mode'}
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            {isSupabaseConfigured
              ? 'Real PostgreSQL database and edge storage active.'
              : 'App runs seamlessly in persistent offline storage mode. Configure NEXT_PUBLIC_SUPABASE_URL in .env to link real Supabase.'}
          </p>
        </div>

        {/* Project Source Code Download */}
        <div className="bg-emerald-50/80 border border-emerald-300 rounded-2xl p-3.5 space-y-2 text-xs">
          <div className="flex items-center space-x-1.5 font-bold text-emerald-950">
            <FileCode className="w-4 h-4 text-emerald-700" />
            <span>Complete Project Source Code (.zip):</span>
          </div>
          <p className="text-[11px] text-emerald-800 leading-normal">
            Download the entire Clean &amp; Earn repository packaged with all Next.js code, AI routes, Supabase schema, and demo assets.
          </p>
          <a
            href="/Clean_and_Earn_Source_Code.zip"
            download="Clean_and_Earn_Source_Code.zip"
            className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-2 shadow-sm transition-all hover:scale-102"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Source Code (.zip)</span>
          </a>
        </div>

        {/* Demo Assets presentation guide */}
        <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-3.5 space-y-2 text-xs">
          <div className="flex items-center space-x-1.5 font-bold text-amber-900">
            <FolderOpen className="w-4 h-4 text-amber-700" />
            <span>Classroom Demo Assets (`/demo-assets`):</span>
          </div>
          <ul className="text-[11px] text-amber-900/90 space-y-1 pl-1">
            <li>
              • <strong className="font-semibold">Pair 1:</strong> Genuine cleanup photos of an Indian street corner. Verified &amp; awarded 40+ points.
            </li>
            <li>
              • <strong className="font-semibold">Pair 2:</strong> Fake test (street before vs. cat meme after). Rejected by AI with polite explanation.
            </li>
          </ul>
          <div className="flex space-x-2 pt-1">
            <button
              onClick={() => {
                onClose();
                onTriggerDemoPair(1);
              }}
              className="flex-1 py-1.5 bg-white hover:bg-emerald-50 text-emerald-800 font-bold text-[10px] rounded-lg border border-emerald-300 transition-colors"
            >
              Test Real Pair 1
            </button>
            <button
              onClick={() => {
                onClose();
                onTriggerDemoPair(2);
              }}
              className="flex-1 py-1.5 bg-white hover:bg-rose-50 text-rose-800 font-bold text-[10px] rounded-lg border border-rose-300 transition-colors"
            >
              Test Fake Pair 2
            </button>
          </div>
        </div>

        {/* Reset Demo Data Button */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={handleReset}
            className="text-xs text-rose-600 hover:underline flex items-center space-x-1 font-semibold"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>
          <button
            onClick={onClose}
            className="text-xs text-slate-600 hover:text-slate-900 font-bold"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
