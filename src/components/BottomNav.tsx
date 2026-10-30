'use client';

import React from 'react';
import { Home, History, Trophy, Sparkles, PlusCircle } from 'lucide-react';

export type TabType = 'dashboard' | 'wizard' | 'history' | 'leaderboard' | 'settings';

interface BottomNavProps {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
  onStartMission: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onChangeTab,
  onStartMission,
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-emerald-100 shadow-lg px-2 py-1.5 max-w-md mx-auto">
      <div className="flex items-center justify-around relative">
        {/* Home / Dashboard */}
        <button
          onClick={() => onChangeTab('dashboard')}
          className={`flex flex-col items-center py-1 px-2.5 rounded-xl transition-all ${
            activeTab === 'dashboard'
              ? 'text-emerald-700 font-semibold'
              : 'text-slate-500 hover:text-emerald-600'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Home</span>
        </button>

        {/* History Ledger */}
        <button
          onClick={() => onChangeTab('history')}
          className={`flex flex-col items-center py-1 px-2.5 rounded-xl transition-all ${
            activeTab === 'history'
              ? 'text-emerald-700 font-semibold'
              : 'text-slate-500 hover:text-emerald-600'
          }`}
        >
          <History className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Ledger</span>
        </button>

        {/* Central Floating "Start A Mission" Button */}
        <div className="relative -top-5">
          <button
            onClick={onStartMission}
            className="flex flex-col items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 via-green-600 to-emerald-500 text-white shadow-lg shadow-emerald-600/35 hover:scale-105 active:scale-95 transition-transform ring-4 ring-white"
            title="Start A Street Cleaning Mission"
          >
            <Sparkles className="w-6 h-6 animate-pulse" />
          </button>
          <span className="block text-center text-[10px] font-bold text-emerald-800 mt-1">
            Clean Now
          </span>
        </div>

        {/* Leaderboard */}
        <button
          onClick={() => onChangeTab('leaderboard')}
          className={`flex flex-col items-center py-1 px-2.5 rounded-xl transition-all ${
            activeTab === 'leaderboard'
              ? 'text-emerald-700 font-semibold'
              : 'text-slate-500 hover:text-emerald-600'
          }`}
        >
          <Trophy className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Rankings</span>
        </button>

        {/* Quick New Mission shortcut */}
        <button
          onClick={() => onChangeTab('wizard')}
          className={`flex flex-col items-center py-1 px-2.5 rounded-xl transition-all ${
            activeTab === 'wizard'
              ? 'text-emerald-700 font-semibold'
              : 'text-slate-500 hover:text-emerald-600'
          }`}
        >
          <PlusCircle className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Mission</span>
        </button>
      </div>
    </nav>
  );
};
