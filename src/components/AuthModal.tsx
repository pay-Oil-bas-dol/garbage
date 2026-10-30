'use client';

import React, { useState } from 'react';
import {
  UserCheck,
  LogIn,
  UserPlus,
  LogOut,
  Shield,
  Sparkles,
  Mail,
  Lock,
  User,
  KeyRound,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  MapPin,
} from 'lucide-react';
import { UserProfile } from '@/types';
import {
  signInUser,
  signUpUser,
  changePassword,
  logOutUser,
  getRegisteredAccounts,
  saveUser,
  DEFAULT_USER,
} from '@/lib/store';

interface AuthModalProps {
  currentUser: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onUserChanged: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  currentUser,
  isOpen,
  onClose,
  onUserChanged,
}) => {
  const [tab, setTab] = useState<'signin' | 'signup' | 'change_password' | 'switch'>('signin');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [city, setCity] = useState('New Delhi');

  // Change password states
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // UI helpers
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');

  if (!isOpen) return null;

  const isGuest = currentUser.isGuest || !currentUser.email;

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');
    setLoading(true);

    const result = signInUser(email, password);
    setLoading(false);

    if (result.success && result.user) {
      onUserChanged(result.user);
      setAuthSuccess('Welcome back! Signed in successfully.');
      setTimeout(() => {
        setAuthSuccess('');
        onClose();
      }, 1000);
    } else {
      setAuthError(result.error || 'Sign in failed');
    }
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');
    setLoading(true);

    const result = signUpUser(name, city, email, password);
    setLoading(false);

    if (result.success && result.user) {
      onUserChanged(result.user);
      setAuthSuccess('Account created! +30 Green Points welcome bonus added.');
      setTimeout(() => {
        setAuthSuccess('');
        onClose();
      }, 1200);
    } else {
      setAuthError(result.error || 'Sign up failed');
    }
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');

    if (newPassword !== confirmPassword) {
      setAuthError('New password and confirmation do not match.');
      return;
    }

    setLoading(true);
    const result = changePassword(currentUser.email, oldPassword, newPassword);
    setLoading(false);

    if (result.success) {
      setAuthSuccess('Password changed successfully! Remember your new password.');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        setAuthSuccess('');
        setTab('signin');
      }, 1500);
    } else {
      setAuthError(result.error || 'Failed to update password');
    }
  };

  const handleSelectAccount = (account: UserProfile) => {
    saveUser(account);
    onUserChanged(account);
    onClose();
  };

  const handleLogout = () => {
    const guest = logOutUser();
    onUserChanged(guest);
    onClose();
  };

  const registeredAccounts = getRegisteredAccounts();

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-sm w-full p-5 space-y-4 shadow-2xl border border-slate-200 animate-scaleUp">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900">Volunteer Account</h3>
              <p className="text-[10px] text-slate-500">
                {isGuest ? 'Not signed in (Guest)' : `Signed in as ${currentUser.name}`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        {/* Current Active Account Box */}
        <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-3 flex items-center justify-between">
          <div className="flex items-center space-x-2.5 min-w-0">
            <div className="w-9 h-9 rounded-full overflow-hidden bg-emerald-200 shrink-0 flex items-center justify-center text-xs font-black text-emerald-900">
              {currentUser.avatar_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={currentUser.avatar_url}
                  alt={currentUser.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                currentUser.name.charAt(0) || 'G'
              )}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-900 truncate">
                {currentUser.name} {isGuest && '(Guest)'}
              </p>
              <p className="text-[10px] text-slate-500 truncate">
                {currentUser.email || 'No email attached'}
              </p>
            </div>
          </div>
          <div className="text-right shrink-0">
            <span className="text-xs font-black text-emerald-800 bg-white border border-emerald-300 px-2 py-0.5 rounded-full">
              {currentUser.total_points} pts
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="grid grid-cols-4 gap-1 bg-slate-100 p-1 rounded-xl text-[11px] font-bold text-center">
          <button
            onClick={() => {
              setTab('signin');
              setAuthError('');
              setAuthSuccess('');
            }}
            className={`py-1.5 rounded-lg transition-all ${
              tab === 'signin' ? 'bg-white text-slate-900 shadow-2xs font-black' : 'text-slate-500'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => {
              setTab('signup');
              setAuthError('');
              setAuthSuccess('');
            }}
            className={`py-1.5 rounded-lg transition-all ${
              tab === 'signup' ? 'bg-white text-slate-900 shadow-2xs font-black' : 'text-slate-500'
            }`}
          >
            Sign Up
          </button>
          <button
            onClick={() => {
              setTab('change_password');
              setAuthError('');
              setAuthSuccess('');
            }}
            className={`py-1.5 rounded-lg transition-all ${
              tab === 'change_password'
                ? 'bg-white text-slate-900 shadow-2xs font-black'
                : 'text-slate-500'
            }`}
            title="Change your account password"
          >
            Password
          </button>
          <button
            onClick={() => {
              setTab('switch');
              setAuthError('');
              setAuthSuccess('');
            }}
            className={`py-1.5 rounded-lg transition-all ${
              tab === 'switch' ? 'bg-white text-emerald-800 shadow-2xs font-black' : 'text-slate-500'
            }`}
          >
            Switch
          </button>
        </div>

        {/* Alert Notifications */}
        {authError && (
          <div className="text-xs text-rose-700 bg-rose-50 p-2.5 rounded-xl border border-rose-200 flex items-center space-x-1.5">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{authError}</span>
          </div>
        )}
        {authSuccess && (
          <div className="text-xs text-emerald-800 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{authSuccess}</span>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 1: SIGN IN                                           */}
        {/* ======================================================== */}
        {tab === 'signin' && (
          <form onSubmit={handleSignIn} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-600 font-semibold mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="yourname@domain.com"
                  className="w-full pl-8 pr-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-600 font-semibold mb-1">Password</label>
              <div className="relative">
                <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-8 pr-9 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5 text-[10px] text-amber-900 leading-relaxed">
              💡 <strong>Remember your credentials:</strong> There is no email verification link. Your email and password are permanently saved on your device.
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center space-x-1.5"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{loading ? 'Signing In...' : 'Sign In'}</span>
            </button>

            <p className="text-center text-[11px] text-slate-500 pt-1">
              Don&apos;t have an account yet?{' '}
              <button
                type="button"
                onClick={() => setTab('signup')}
                className="text-emerald-700 font-bold underline"
              >
                Sign Up here
              </button>
            </p>
          </form>
        )}

        {/* ======================================================== */}
        {/* TAB 2: SIGN UP                                           */}
        {/* ======================================================== */}
        {tab === 'signup' && (
          <form onSubmit={handleSignUp} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-600 font-semibold mb-1">Full Name</label>
              <div className="relative">
                <User className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full pl-8 pr-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-600 font-semibold mb-1">City</label>
              <div className="relative">
                <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. New Delhi, Mumbai, Bengaluru, Jaipur"
                  className="w-full pl-8 pr-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-600 font-semibold mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="yourname@gmail.com"
                  className="w-full pl-8 pr-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-600 font-semibold mb-1">Password</label>
              <div className="relative">
                <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={4}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Choose a password (min 4 chars)"
                  className="w-full pl-8 pr-9 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 text-[10px] text-emerald-900 leading-relaxed">
              ✨ <strong>No verification needed:</strong> Your account is activated instantly! Please remember your email and password to log in.
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center space-x-1.5"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>{loading ? 'Creating Account...' : 'Sign Up & Get +30 Green Pts'}</span>
            </button>
          </form>
        )}

        {/* ======================================================== */}
        {/* TAB 3: CHANGE PASSWORD (REQUIRES OLD PASSWORD)           */}
        {/* ======================================================== */}
        {tab === 'change_password' && (
          <form onSubmit={handleChangePassword} className="space-y-3 text-xs">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-[11px] text-slate-700">
              Changing password for: <strong>{currentUser.email || 'Current Account'}</strong>
            </div>

            <div>
              <label className="block text-slate-600 font-semibold mb-1">Old Password</label>
              <div className="relative">
                <KeyRound className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Enter your current old password"
                  className="w-full pl-8 pr-9 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-slate-600 font-semibold mb-1">New Password</label>
              <div className="relative">
                <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={4}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New password (min 4 chars)"
                  className="w-full pl-8 pr-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-600 font-semibold mb-1">Confirm New Password</label>
              <div className="relative">
                <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={4}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full pl-8 pr-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none"
                />
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-2 text-[10px] text-amber-900">
              🔒 <strong>Security Policy:</strong> You must provide your correct old password. Make sure to remember the new password.
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-xs transition-colors"
            >
              {loading ? 'Updating Password...' : 'Save New Password'}
            </button>
          </form>
        )}

        {/* ======================================================== */}
        {/* TAB 4: SWITCH ACCOUNTS                                   */}
        {/* ======================================================== */}
        {tab === 'switch' && (
          <div className="space-y-2">
            <p className="text-[11px] text-slate-500">
              Registered Accounts ({registeredAccounts.length}):
            </p>
            <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
              {registeredAccounts.map((acc) => (
                <button
                  key={acc.id}
                  onClick={() => handleSelectAccount(acc)}
                  className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                    currentUser.email === acc.email
                      ? 'border-emerald-500 bg-emerald-50/70 ring-1 ring-emerald-500/30'
                      : 'border-slate-200 hover:border-emerald-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-7 h-7 rounded-full overflow-hidden bg-emerald-100 flex items-center justify-center font-bold text-xs text-emerald-800">
                      {acc.avatar_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={acc.avatar_url} alt={acc.name} className="w-full h-full object-cover" />
                      ) : (
                        acc.name.charAt(0)
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">{acc.name}</p>
                      <p className="text-[10px] text-slate-500">📍 {acc.city} • {acc.email}</p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-emerald-800">{acc.total_points} pts</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          {!isGuest ? (
            <button
              onClick={handleLogout}
              className="text-xs text-rose-600 hover:text-rose-800 font-bold flex items-center space-x-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          ) : (
            <span className="text-[11px] text-slate-400 font-medium">Guest Mode</span>
          )}

          <button
            onClick={onClose}
            className="text-xs text-slate-500 hover:text-slate-800 font-bold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
