'use client';

import React from 'react';
import {
  Sparkles,
  Camera,
  MapPin,
  Calendar,
  CheckCircle2,
  XCircle,
  ArrowRight,
  TrendingUp,
  Award,
  ShieldCheck,
  Eye,
} from 'lucide-react';
import { UserProfile, Mission } from '@/types';
import { PointsBanner } from './PointsBanner';

interface DashboardProps {
  user: UserProfile;
  missions: Mission[];
  onStartMission: () => void;
  onViewAllHistory: () => void;
  onSelectMission: (mission: Mission) => void;
  onTriggerDemoPair: (pairNumber: 1 | 2) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  user,
  missions,
  onStartMission,
  onViewAllHistory,
  onSelectMission,
  onTriggerDemoPair,
}) => {
  const recentMissions = missions.slice(0, 4);

  return (
    <div className="space-y-5 pb-6">
      {/* Gamified Points Banner */}
      <PointsBanner user={user} missions={missions} />

      {/* Large Central "Start A Mission" Action Button */}
      <div className="relative">
        <button
          onClick={onStartMission}
          className="w-full py-4 px-5 rounded-3xl bg-gradient-to-r from-emerald-600 via-green-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white shadow-xl shadow-emerald-700/25 active:scale-98 transition-all flex items-center justify-between group border border-emerald-500/40"
        >
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 group-hover:scale-105 transition-transform">
              <Camera className="w-6 h-6 animate-pulse" />
            </div>
            <div className="text-left">
              <div className="flex items-center space-x-1.5">
                <span className="text-base font-black tracking-tight">Start A Mission</span>
                <span className="text-[10px] font-bold bg-amber-400 text-amber-950 px-1.5 py-0.5 rounded-full uppercase">
                  +20-50 pts
                </span>
              </div>
              <p className="text-xs text-emerald-100 font-medium">
                Snap &quot;Before&quot; &amp; &quot;After&quot; photos to earn verified points
              </p>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center group-hover:translate-x-1 transition-transform">
            <ArrowRight className="w-4 h-4 text-white" />
          </div>
        </button>
      </div>

      {/* Presentation Quick-Demo Trigger Card */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50/60 rounded-2xl p-3.5 border border-amber-200/90 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-900">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Classroom Presentation Demo Modes:</span>
          </div>
          <span className="text-[10px] bg-amber-200/80 text-amber-950 font-bold px-2 py-0.5 rounded-full">
            Live Testing
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onTriggerDemoPair(1)}
            className="flex items-center space-x-2 p-2 bg-white hover:bg-emerald-50 text-emerald-900 rounded-xl border border-emerald-300 shadow-2xs transition-all text-left group"
          >
            <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-bold leading-tight">Pair 1: Real Street</p>
              <p className="text-[9px] text-slate-500">Genuine cleanup passes AI</p>
            </div>
          </button>

          <button
            onClick={() => onTriggerDemoPair(2)}
            className="flex items-center space-x-2 p-2 bg-white hover:bg-rose-50 text-rose-900 rounded-xl border border-rose-300 shadow-2xs transition-all text-left group"
          >
            <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
              <XCircle className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-bold leading-tight">Pair 2: Fake Meme</p>
              <p className="text-[9px] text-slate-500">Mismatched photo rejected</p>
            </div>
          </button>
        </div>
      </div>

      {/* Mission History Ledger Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">
              Mission History
            </h3>
            <span className="text-[11px] text-slate-500 font-medium">({missions.length} recorded)</span>
          </div>
          <button
            onClick={onViewAllHistory}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center space-x-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Ledger Cards */}
        <div className="space-y-2.5">
          {recentMissions.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
              <p className="text-sm font-semibold text-slate-700">No missions yet!</p>
              <p className="text-xs text-slate-500 mt-1">Tap &quot;Start A Mission&quot; above to begin.</p>
            </div>
          ) : (
            recentMissions.map((mission) => {
              const isApproved = mission.status === 'approved';
              const dateStr = new Date(mission.created_at).toLocaleDateString('en-IN', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              });

              return (
                <div
                  key={mission.id}
                  onClick={() => onSelectMission(mission)}
                  className="bg-white rounded-2xl p-3 border border-slate-200/90 hover:border-emerald-300 shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-between space-x-3"
                >
                  {/* Left: Thumbnail & Details */}
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-slate-200 bg-slate-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={mission.after_image_url}
                        alt="Mission thumbnail"
                        className="w-full h-full object-cover"
                      />
                      <span
                        className={`absolute bottom-0 inset-x-0 text-[8px] font-bold text-center py-0.5 text-white ${
                          isApproved ? 'bg-emerald-600' : 'bg-rose-600'
                        }`}
                      >
                        {isApproved ? 'Verified' : 'Rejected'}
                      </span>
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center space-x-1.5">
                        <span className="text-xs font-bold text-slate-900 truncate">
                          {mission.category} Cleanup
                        </span>
                        <span className="text-[10px] text-slate-400">• {dateStr}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 truncate flex items-center space-x-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">
                          {mission.location_name || `${mission.latitude.toFixed(3)}, ${mission.longitude.toFixed(3)}`}
                        </span>
                      </p>
                      <p className="text-[10px] text-slate-600 line-clamp-1 italic mt-0.5">
                        &quot;{mission.ai_feedback}&quot;
                      </p>
                    </div>
                  </div>

                  {/* Right: Points Pill */}
                  <div className="shrink-0 text-right">
                    {isApproved ? (
                      <span className="inline-flex items-center space-x-0.5 bg-emerald-50 border border-emerald-200 text-emerald-800 font-extrabold text-xs px-2.5 py-1 rounded-full">
                        <span>+{mission.points_awarded}</span>
                        <span className="text-[9px] font-medium">pts</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-0.5 bg-rose-50 border border-rose-200 text-rose-700 font-bold text-xs px-2 py-1 rounded-full">
                        <span>0 pts</span>
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
