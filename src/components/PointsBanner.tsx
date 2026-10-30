'use client';

import React from 'react';
import { Award, TrendingUp, ShieldCheck, Trash2, Sparkles, Gift } from 'lucide-react';
import { UserProfile, Mission } from '@/types';

interface PointsBannerProps {
  user: UserProfile;
  missions: Mission[];
  onOpenRewards?: () => void;
}

export const PointsBanner: React.FC<PointsBannerProps> = ({ user, missions, onOpenRewards }) => {
  const approvedMissions = missions.filter((m) => m.status === 'approved');
  const totalApprovedPoints = approvedMissions.reduce((acc, m) => acc + m.points_awarded, 0);
  const displayPoints = user.total_points || totalApprovedPoints;

  // Calculate Level
  let level = 1;
  let levelTitle = 'Street Scout';
  let nextLevelTarget = 100;
  let prevLevelTarget = 0;

  if (displayPoints >= 300) {
    level = 4;
    levelTitle = 'Swachh Guardian (सफ़ाई रक्षक)';
    nextLevelTarget = 500;
    prevLevelTarget = 300;
  } else if (displayPoints >= 180) {
    level = 3;
    levelTitle = 'Green Champion (हरित नायक)';
    nextLevelTarget = 300;
    prevLevelTarget = 180;
  } else if (displayPoints >= 80) {
    level = 2;
    levelTitle = 'Eco Warrior (पर्यावरण योद्धा)';
    nextLevelTarget = 180;
    prevLevelTarget = 80;
  }

  const progressPercent = Math.min(
    100,
    Math.max(
      10,
      Math.round(((displayPoints - prevLevelTarget) / (nextLevelTarget - prevLevelTarget)) * 100)
    )
  );

  const estimatedWasteClearedKg = (approvedMissions.length * 3.4).toFixed(1);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-800 via-green-800 to-teal-900 text-white p-5 shadow-xl shadow-emerald-950/15 border border-emerald-600/30">
      {/* Decorative background eco leaves */}
      <div className="absolute -right-6 -bottom-8 w-36 h-36 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute top-2 right-4 text-emerald-400/20 text-7xl font-black select-none pointer-events-none">
        🌿
      </div>

      {/* Top row: Level Badge & City */}
      <div className="flex items-center justify-between mb-3 relative z-10">
        <div className="flex items-center space-x-1.5 bg-white/15 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold text-emerald-100 border border-white/20">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>
            Level {level}: {levelTitle}
          </span>
        </div>
        <span className="text-[11px] text-emerald-200/90 font-medium">📍 {user.city || 'India'}</span>
      </div>

      {/* Center: Prominent Points Display & Quick Redeem Pill */}
      <div className="flex items-center justify-between my-2 relative z-10">
        <div className="flex items-baseline space-x-2">
          <span className="text-4xl sm:text-5xl font-black tracking-tight text-white drop-shadow-xs">
            {displayPoints}
          </span>
          <div className="flex flex-col">
            <span className="text-sm font-bold uppercase tracking-wider text-emerald-300">
              Eco Points
            </span>
            <span className="text-[10px] text-emerald-200/80">Earn 20-50 pts per verified street</span>
          </div>
        </div>

        {onOpenRewards && (
          <button
            onClick={onOpenRewards}
            className="py-1.5 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-xs shadow-md shadow-amber-900/30 flex items-center space-x-1 transition-transform active:scale-95 shrink-0"
            title="Redeem points for Amazon, Flipkart, Zomato coupons"
          >
            <Gift className="w-3.5 h-3.5 text-amber-900" />
            <span>Redeem</span>
          </button>
        )}
      </div>

      {/* Level Progress Bar */}
      <div className="mt-4 mb-3 relative z-10">
        <div className="flex justify-between text-[11px] text-emerald-200 mb-1 font-medium">
          <span>Progress to Level {level + 1}</span>
          <span>
            {displayPoints} / {nextLevelTarget} pts
          </span>
        </div>
        <div className="w-full bg-emerald-950/60 rounded-full h-2.5 overflow-hidden p-0.5 border border-emerald-700/50">
          <div
            className="bg-gradient-to-r from-amber-300 to-emerald-300 h-full rounded-full transition-all duration-700 shadow-sm"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Bottom stats row */}
      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-emerald-700/60 text-center relative z-10">
        <div className="bg-emerald-900/40 rounded-xl p-1.5 border border-emerald-600/30">
          <div className="flex items-center justify-center text-emerald-300 mb-0.5">
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
          <p className="text-xs font-bold text-white">{approvedMissions.length}</p>
          <p className="text-[9px] text-emerald-200/80 uppercase">Missions</p>
        </div>

        <div className="bg-emerald-900/40 rounded-xl p-1.5 border border-emerald-600/30">
          <div className="flex items-center justify-center text-emerald-300 mb-0.5">
            <Trash2 className="w-3.5 h-3.5" />
          </div>
          <p className="text-xs font-bold text-white">~{estimatedWasteClearedKg} kg</p>
          <p className="text-[9px] text-emerald-200/80 uppercase">Waste Cleared</p>
        </div>

        <div className="bg-emerald-900/40 rounded-xl p-1.5 border border-emerald-600/30">
          <div className="flex items-center justify-center text-amber-300 mb-0.5">
            <Award className="w-3.5 h-3.5" />
          </div>
          <p className="text-xs font-bold text-white">100%</p>
          <p className="text-[9px] text-emerald-200/80 uppercase">AI Verified</p>
        </div>
      </div>
    </div>
  );
};
