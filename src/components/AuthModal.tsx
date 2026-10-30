'use client';

import React, { useState } from 'react';
import { UserCheck, LogIn, UserPlus, LogOut, Shield, Sparkles, Mail, Lock, User } from 'lucide-react';
import { UserProfile } from '@/types';
import { saveUser, DEFAULT_USER } from '@/lib/store';
import { getSupabaseClient } from '@/lib/supabase';

interface AuthModalProps {
  currentUser: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onUserChanged: (user: UserProfile) => void;
}

const DEMO_ACCOUNTS: UserProfile[] = [
  {
    id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    name: 'Aarav Sharma',
    email: 'aarav@swachh.org',
    total_points: 145,
    avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
    city: 'New Delhi',
  },
  {
    id: 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    name: 'Priya Patel',
    email: 'priya@swachh.org',
    total_points: 210,
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
    city: 'Indore',
  },
  {
    id: 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33',
    name: 'Vikram Singh',
    email: 'vikram@swachh.org',
    total_points: 95,
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    city: 'Bengaluru',
  },
];

export const AuthModal: React.FC<AuthModalProps> = ({
  currentUser,
  isOpen,
  onClose,
  onUserChanged,
}) => {
  const [tab, setTab] = useState<'signin' | 'signup' | 'demo'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [city, setCity] = useState('New Delhi');
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');

  if (!isOpen) return null;

  const handleSupabaseAuth = async (isSignUp: boolean) => {
    setLoading(true);
    setAuthError('');
    setAuthSuccess('');

    const supabase = getSupabaseClient();
    if (!supabase) {
      // Supabase not configured in env, fallback to simulated account
      const newUser: UserProfile = {
        id: 'usr-' + Date.now(),
        name: name.trim() || email.split('@')[0] || 'Swachh Volunteer',
        email: email.trim(),
        total_points: isSignUp ? 25 : currentUser.total_points, // welcome bonus points
        city: city.trim(),
        avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      };
      saveUser(newUser);
      onUserChanged(newUser);
      setAuthSuccess(isSignUp ? 'Account created! Welcome bonus +25 pts added.' : 'Signed in successfully!');
      setTimeout(() => {
        setLoading(false);
        onClose();
      }, 1000);
      return;
    }

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { name, city },
          },
        });
        if (error) throw error;
        if (data.user) {
          const profile: UserProfile = {
            id: data.user.id,
            name: name || 'Volunteer',
            email: data.user.email || email,
            total_points: 25,
            city,
          };
          saveUser(profile);
          onUserChanged(profile);
          setAuthSuccess('Account registered with Supabase Auth!');
          setTimeout(onClose, 1000);
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        if (data.user) {
          const profile: UserProfile = {
            id: data.user.id,
            name: data.user.user_metadata?.name || 'Volunteer',
            email: data.user.email || email,
            total_points: 100,
            city: data.user.user_metadata?.city || 'New Delhi',
          };
          saveUser(profile);
          onUserChanged(profile);
          setAuthSuccess('Signed in successfully with Supabase!');
          setTimeout(onClose, 1000);
        }
      }
    } catch (err: any) {
      setAuthError(err.message || 'Authentication error.');
    } finally {
      setLoading(false);
    }
  };

  const selectDemoAccount = (acc: UserProfile) => {
    saveUser(acc);
    onUserChanged(acc);
    onClose();
  };

  const handleLogout = () => {
    const supabase = getSupabaseClient();
    if (supabase) {
      supabase.auth.signOut().catch(console.error);
    }
    saveUser(DEFAULT_USER);
    onUserChanged(DEFAULT_USER);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-sm w-full p-5 space-y-4 shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900">Volunteer Account</h3>
              <p className="text-[10px] text-slate-500">Supabase Auth &amp; Profiles</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        {/* Current User Pill */}
        <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-3 flex items-center justify-between">
          <div className="flex items-center space-x-2.5 min-w-0">
            <div className="w-9 h-9 rounded-full overflow-hidden bg-emerald-200 shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentUser.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'}
                alt={currentUser.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-900 truncate">{currentUser.name}</p>
              <p className="text-[10px] text-slate-500 truncate">{currentUser.email}</p>
            </div>
          </div>
          <div className="text-right shrink-0">
            <span className="text-xs font-black text-emerald-800 bg-white border border-emerald-300 px-2 py-0.5 rounded-full">
              {currentUser.total_points} pts
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setTab('signin')}
            className={`flex-1 py-1 rounded-lg transition-all ${
              tab === 'signin' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setTab('signup')}
            className={`flex-1 py-1 rounded-lg transition-all ${
              tab === 'signup' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
            }`}
          >
            Sign Up
          </button>
          <button
            onClick={() => setTab('demo')}
            className={`flex-1 py-1 rounded-lg transition-all ${
              tab === 'demo' ? 'bg-white text-emerald-800 shadow-2xs' : 'text-slate-500'
            }`}
          >
            Demo Profiles
          </button>
        </div>

        {authError && (
          <p className="text-xs text-rose-600 bg-rose-50 p-2 rounded-xl border border-rose-200">
            {authError}
          </p>
        )}
        {authSuccess && (
          <p className="text-xs text-emerald-700 bg-emerald-50 p-2 rounded-xl border border-emerald-200">
            {authSuccess}
          </p>
        )}

        {/* SIGN IN / SIGN UP FORM */}
        {(tab === 'signin' || tab === 'signup') && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSupabaseAuth(tab === 'signup');
            }}
            className="space-y-3 text-xs"
          >
            {tab === 'signup' && (
              <>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Full Name</label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ananya Sen"
                      className="w-full pl-8 pr-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. New Delhi, Indore, Bengaluru"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-slate-600 font-semibold mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="volunteer@swachh.org"
                  className="w-full pl-8 pr-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-600 font-semibold mb-1">Password</label>
              <div className="relative">
                <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-8 pr-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs transition-colors"
            >
              {loading
                ? 'Authenticating...'
                : tab === 'signin'
                ? 'Sign In with Supabase'
                : 'Create Account & Earn +25 pts'}
            </button>
          </form>
        )}

        {/* DEMO PROFILES SWITCHER */}
        {tab === 'demo' && (
          <div className="space-y-2">
            <p className="text-[11px] text-slate-500">
              One-click switcher for instant presentations and grading:
            </p>
            {DEMO_ACCOUNTS.map((acc) => (
              <button
                key={acc.id}
                onClick={() => selectDemoAccount(acc)}
                className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                  currentUser.email === acc.email
                    ? 'border-emerald-500 bg-emerald-50/70 ring-1 ring-emerald-500/30'
                    : 'border-slate-200 hover:border-emerald-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-full overflow-hidden bg-emerald-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={acc.avatar_url} alt={acc.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">{acc.name}</p>
                    <p className="text-[10px] text-slate-500">📍 {acc.city}</p>
                  </div>
                </div>
                <span className="text-xs font-black text-emerald-800">{acc.total_points} pts</span>
              </button>
            ))}
          </div>
        )}

        {/* Log Out Button */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={handleLogout}
            className="text-xs text-rose-600 hover:underline flex items-center space-x-1"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Reset / Log Out</span>
          </button>
          <button
            onClick={onClose}
            className="text-xs text-slate-500 hover:text-slate-800 font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
