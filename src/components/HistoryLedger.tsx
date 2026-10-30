'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Calendar,
  CheckCircle2,
  XCircle,
  Video,
  ExternalLink,
  Filter,
  Search,
  Sparkles,
  FileCheck2,
} from 'lucide-react';
import { Mission, WasteCategory } from '@/types';

interface HistoryLedgerProps {
  missions: Mission[];
  selectedMission: Mission | null;
  onSelectMission: (mission: Mission | null) => void;
  onStartNewMission: () => void;
}

export const HistoryLedger: React.FC<HistoryLedgerProps> = ({
  missions,
  selectedMission,
  onSelectMission,
  onStartNewMission,
}) => {
  const [statusFilter, setStatusFilter] = useState<'all' | 'approved' | 'rejected'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredMissions = missions.filter((m) => {
    if (statusFilter !== 'all' && m.status !== statusFilter) return false;
    if (categoryFilter !== 'all' && m.category !== categoryFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchCat = m.category.toLowerCase().includes(q);
      const matchLoc = (m.location_name || '').toLowerCase().includes(q);
      const matchFeedback = (m.ai_feedback || '').toLowerCase().includes(q);
      if (!matchCat && !matchLoc && !matchFeedback) return false;
    }
    return true;
  });

  return (
    <div className="space-y-4 pb-12">
      {/* Title & Stats */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">Mission History</h2>
          <p className="text-xs text-slate-500">Official verified street cleaning ledger</p>
        </div>
        <button
          onClick={onStartNewMission}
          className="text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-full shadow-xs transition-colors"
        >
          + Clean Street
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-1 bg-slate-100 p-1 rounded-2xl text-xs font-semibold">
        <button
          onClick={() => setStatusFilter('all')}
          className={`flex-1 py-1.5 rounded-xl transition-all ${
            statusFilter === 'all'
              ? 'bg-white text-slate-900 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          All ({missions.length})
        </button>
        <button
          onClick={() => setStatusFilter('approved')}
          className={`flex-1 py-1.5 rounded-xl transition-all ${
            statusFilter === 'approved'
              ? 'bg-emerald-600 text-white shadow-2xs'
              : 'text-slate-600 hover:text-emerald-700'
          }`}
        >
          Approved ({missions.filter((m) => m.status === 'approved').length})
        </button>
        <button
          onClick={() => setStatusFilter('rejected')}
          className={`flex-1 py-1.5 rounded-xl transition-all ${
            statusFilter === 'rejected'
              ? 'bg-rose-600 text-white shadow-2xs'
              : 'text-slate-600 hover:text-rose-700'
          }`}
        >
          Rejected ({missions.filter((m) => m.status === 'rejected').length})
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by category, city, or AI feedback..."
          className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
        />
      </div>

      {/* Missions Ledger List */}
      <div className="space-y-3">
        {filteredMissions.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
            <p className="text-sm font-semibold text-slate-700">No missions match your filter.</p>
            <p className="text-xs text-slate-500 mt-1">Try resetting the status or search query.</p>
          </div>
        ) : (
          filteredMissions.map((m) => {
            const isApproved = m.status === 'approved';
            const dateStr = new Date(m.created_at).toLocaleDateString('en-IN', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            });

            return (
              <div
                key={m.id}
                onClick={() => onSelectMission(m)}
                className="bg-white rounded-2xl p-3.5 border border-slate-200 hover:border-emerald-300 shadow-xs hover:shadow-md transition-all cursor-pointer space-y-2.5"
              >
                {/* Header row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md border ${
                        isApproved
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : 'bg-rose-50 text-rose-800 border-rose-200'
                      }`}
                    >
                      {isApproved ? 'Approved' : 'Rejected'}
                    </span>
                    <span className="text-xs font-bold text-slate-900">{m.category} Waste</span>
                  </div>

                  <span
                    className={`font-black text-xs px-2.5 py-0.5 rounded-full ${
                      isApproved
                        ? 'bg-amber-50 text-amber-900 border border-amber-200'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {isApproved ? `+${m.points_awarded} pts` : '0 pts'}
                  </span>
                </div>

                {/* Side-by-side thumbnail previews */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100 h-24">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={m.before_image_url}
                      alt="Before"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-1 left-1 bg-black/70 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                      Before
                    </span>
                  </div>
                  <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100 h-24">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={m.after_image_url}
                      alt="After"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-1 left-1 bg-black/70 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                      After
                    </span>
                  </div>
                </div>

                {/* Location & AI Feedback quote */}
                <div className="space-y-1 text-xs text-slate-600">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="flex items-center space-x-1 truncate max-w-[200px]">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="truncate">{m.location_name || `${m.latitude.toFixed(4)}, ${m.longitude.toFixed(4)}`}</span>
                    </span>
                    <span className="shrink-0">{dateStr}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded-xl border border-slate-100 line-clamp-2 italic">
                    &quot;{m.ai_feedback}&quot;
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* DETAIL MODAL DRAWER */}
      {selectedMission && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span
                  className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${
                    selectedMission.status === 'approved'
                      ? 'bg-emerald-50 text-emerald-800'
                      : 'bg-rose-50 text-rose-800'
                  }`}
                >
                  {selectedMission.status}
                </span>
                <h3 className="text-base font-black text-slate-900 mt-1">
                  {selectedMission.category} Street Cleanup
                </h3>
              </div>
              <button
                onClick={() => onSelectMission(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-sm flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            {/* Before vs After Large View */}
            <div className="space-y-3">
              <div>
                <span className="text-[11px] font-bold text-slate-700 block mb-1">
                  Before Cleanup:
                </span>
                <div className="rounded-2xl overflow-hidden border border-slate-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selectedMission.before_image_url}
                    alt="Before"
                    className="w-full h-40 object-cover"
                  />
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-700 block mb-1">
                  After Cleanup (Proof):
                </span>
                <div className="rounded-2xl overflow-hidden border border-slate-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selectedMission.after_image_url}
                    alt="After"
                    className="w-full h-40 object-cover"
                  />
                </div>
              </div>

              {/* Optional Video Proof */}
              {selectedMission.video_url && (
                <div>
                  <span className="text-[11px] font-bold text-slate-700 block mb-1">
                    Attached Video Proof:
                  </span>
                  <video
                    src={selectedMission.video_url}
                    controls
                    className="w-full rounded-2xl border border-slate-300 max-h-40 bg-black"
                  />
                </div>
              )}
            </div>

            {/* Location & Points Information */}
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Points Awarded:</span>
                <span className="font-extrabold text-sm text-emerald-700">
                  +{selectedMission.points_awarded} pts
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Date Recorded:</span>
                <span className="font-medium text-slate-800">
                  {new Date(selectedMission.created_at).toLocaleString('en-IN')}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block mb-0.5">GPS Location:</span>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${selectedMission.latitude},${selectedMission.longitude}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-700 font-semibold flex items-center space-x-1 hover:underline text-[11px]"
                >
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>
                    {selectedMission.latitude.toFixed(6)}° N, {selectedMission.longitude.toFixed(6)}° E
                  </span>
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </div>
            </div>

            {/* AI Feedback */}
            <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-2xl text-xs space-y-1">
              <div className="flex items-center space-x-1 font-bold text-emerald-900">
                <FileCheck2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>AI Verification Evaluation:</span>
              </div>
              <p className="text-emerald-950 italic leading-relaxed">
                &quot;{selectedMission.ai_feedback}&quot;
              </p>
            </div>

            <button
              onClick={() => onSelectMission(null)}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-2xl transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
