'use client';

import React, { useState } from 'react';
import { Trophy, Medal, MapPin, Award, Users, TrendingUp, Sparkles } from 'lucide-react';
import { UserProfile } from '@/types';

interface LeaderboardProps {
  user: UserProfile;
}

const TOP_CITIES = [
  { rank: 1, name: 'Indore', state: 'Madhya Pradesh', score: '99.4%', cleanStreak: '7 Years #1' },
  { rank: 2, name: 'Surat', state: 'Gujarat', score: '98.8%', cleanStreak: 'Top 3 Metro' },
  { rank: 3, name: 'Navi Mumbai', state: 'Maharashtra', score: '97.2%', cleanStreak: 'Coastal Champion' },
  { rank: 4, name: 'New Delhi', state: 'Delhi NCR', score: '92.5%', cleanStreak: '+15% Improvement' },
  { rank: 5, name: 'Bengaluru', state: 'Karnataka', score: '91.8%', cleanStreak: 'Tech Green Drive' },
];

const TOP_USERS = [
  {
    rank: 1,
    name: 'Priya Patel',
    city: 'Indore',
    points: 380,
    missions: 11,
    badge: '🏆 Grand Swachh Hero',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
  },
  {
    rank: 2,
    name: 'Aarav Sharma (You)',
    city: 'New Delhi',
    points: 187, // dynamically computed or overridden
    missions: 5,
    badge: '🌿 Eco Warrior Tier 2',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
    isCurrentUser: true,
  },
  {
    rank: 3,
    name: 'Vikram Singh',
    city: 'Bengaluru',
    points: 165,
    missions: 4,
    badge: '⭐ Street Scout Master',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
  },
  {
    rank: 4,
    name: 'Ananya Sen',
    city: 'Kolkata',
    points: 125,
    missions: 3,
    badge: '🌱 Green Guardian',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
  },
  {
    rank: 5,
    name: 'Rajesh Kumar',
    city: 'Surat',
    points: 95,
    missions: 2,
    badge: '🧹 Civic Champion',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
  },
];

export const Leaderboard: React.FC<LeaderboardProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'volunteers' | 'cities'>('volunteers');

  // Adjust user points in list
  const userList = TOP_USERS.map((u) => {
    if (u.isCurrentUser) {
      return {
        ...u,
        points: user.total_points,
        name: `${user.name} (You)`,
      };
    }
    return u;
  }).sort((a, b) => b.points - a.points);

  return (
    <div className="space-y-4 pb-12">
      {/* Title */}
      <div>
        <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center space-x-1.5">
          <Trophy className="w-5 h-5 text-amber-500" />
          <span>India Cleanliness League</span>
        </h2>
        <p className="text-xs text-slate-500">
          Swachh Bharat street cleaning leaderboard &amp; civic champions
        </p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-slate-100 p-1 rounded-2xl text-xs font-semibold">
        <button
          onClick={() => setActiveTab('volunteers')}
          className={`flex-1 py-1.5 rounded-xl transition-all flex items-center justify-center space-x-1 ${
            activeTab === 'volunteers'
              ? 'bg-white text-emerald-800 shadow-2xs'
              : 'text-slate-600 hover:text-emerald-700'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Top Volunteers</span>
        </button>
        <button
          onClick={() => setActiveTab('cities')}
          className={`flex-1 py-1.5 rounded-xl transition-all flex items-center justify-center space-x-1 ${
            activeTab === 'cities'
              ? 'bg-white text-emerald-800 shadow-2xs'
              : 'text-slate-600 hover:text-emerald-700'
          }`}
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>Top Swachh Cities</span>
        </button>
      </div>

      {/* VOLUNTEERS TAB */}
      {activeTab === 'volunteers' && (
        <div className="space-y-2.5">
          {userList.map((entry, index) => {
            const rank = index + 1;
            const isTop3 = rank <= 3;

            return (
              <div
                key={entry.name}
                className={`p-3 rounded-2xl border transition-all flex items-center justify-between space-x-3 ${
                  entry.isCurrentUser
                    ? 'bg-emerald-50/90 border-emerald-400 shadow-sm ring-1 ring-emerald-400/40'
                    : 'bg-white border-slate-200/90 hover:border-slate-300'
                }`}
              >
                {/* Rank & Avatar */}
                <div className="flex items-center space-x-3 min-w-0">
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${
                      rank === 1
                        ? 'bg-amber-100 text-amber-700 border border-amber-300'
                        : rank === 2
                        ? 'bg-slate-200 text-slate-700 border border-slate-300'
                        : rank === 3
                        ? 'bg-amber-700/20 text-amber-800 border border-amber-600/30'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : rank}
                  </div>

                  <div className="w-10 h-10 rounded-full overflow-hidden bg-emerald-100 shrink-0 border border-emerald-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={entry.avatar} alt={entry.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate flex items-center space-x-1">
                      <span>{entry.name}</span>
                    </p>
                    <p className="text-[10px] text-slate-500 flex items-center space-x-1">
                      <span>📍 {entry.city}</span>
                      <span>•</span>
                      <span>{entry.missions} missions</span>
                    </p>
                  </div>
                </div>

                {/* Points Pill */}
                <div className="text-right shrink-0">
                  <span className="font-extrabold text-xs text-emerald-800 bg-emerald-100/70 border border-emerald-200 px-2 py-0.5 rounded-full">
                    {entry.points} pts
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* CITIES TAB */}
      {activeTab === 'cities' && (
        <div className="space-y-2.5">
          {TOP_CITIES.map((city) => (
            <div
              key={city.name}
              className="bg-white rounded-2xl p-3 border border-slate-200 flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <span className="w-7 h-7 rounded-xl bg-slate-100 text-slate-700 font-black text-xs flex items-center justify-center">
                  #{city.rank}
                </span>
                <div>
                  <p className="text-xs font-bold text-slate-900">{city.name}</p>
                  <p className="text-[10px] text-slate-500">{city.state}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  {city.score} Clean Index
                </span>
                <p className="text-[9px] text-slate-400 mt-0.5">{city.cleanStreak}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
