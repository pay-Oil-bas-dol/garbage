'use client';

import React from 'react';
import { Leaf, Award, Settings, UserCheck } from 'lucide-react';
import { UserProfile } from '@/types';

interface NavbarProps {
  user: UserProfile;
  onOpenSettings: () => void;
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ user, onOpenSettings, onOpenAuth }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs px-4 py-3 flex items-center justify-between">
      {/* Brand logo & tagline */}
      <div className="flex items-center space-x-2.5">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-700 to-green-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
          <Leaf className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center space-x-1.5">
            <span className="font-extrabold text-base tracking-tight text-emerald-950">
              Safai<span className="text-emerald-600">Saathi</span>
            </span>
            <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full border border-emerald-200">
              सफ़ाई साथी
            </span>
          </div>
          <p className="text-[10px] text-emerald-700/80 font-medium">Clean Street Gamification • India</p>
        </div>
      </div>

      {/* Right side: Points pill & Profile */}
      <div className="flex items-center space-x-2">
        {/* Points Chip */}
        <div className="flex items-center space-x-1 bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-full shadow-2xs">
          <Award className="w-3.5 h-3.5 text-amber-600" />
          <span className="text-xs font-bold text-amber-900">{user.total_points}</span>
          <span className="text-[10px] text-amber-700 font-semibold">pts</span>
        </div>

        {/* User Avatar Button */}
        <button
          onClick={onOpenAuth}
          title="Switch User / Auth"
          className="relative p-1 rounded-full hover:bg-emerald-50 transition-colors focus:outline-none"
        >
          <div className="w-8 h-8 rounded-full ring-2 ring-emerald-500/30 overflow-hidden bg-emerald-100 flex items-center justify-center text-emerald-800 font-bold text-xs">
            {user.avatar_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.avatar_url} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              user.name.charAt(0)
            )}
          </div>
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
        </button>

        {/* Settings Button */}
        <button
          onClick={onOpenSettings}
          title="Settings & API Keys"
          className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
