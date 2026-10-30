'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Camera,
  Upload,
  MapPin,
  Video,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Info,
  Trash2,
  Layers,
  FileCheck2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { WasteCategory, VerificationResponse, Mission } from '@/types';
import { addMission, getUser, getSavedGeminiKey } from '@/lib/store';

interface MissionWizardProps {
  onSuccess: (newMission: Mission) => void;
  onCancel: () => void;
}

const CATEGORIES: { label: string; value: WasteCategory; icon: string; desc: string }[] = [
  { label: 'Plastic Waste', value: 'Plastic', icon: '🥤', desc: 'Bottles, bags, wrappers, cups' },
  { label: 'Mixed Street Litter', value: 'Mixed', icon: '🗑️', desc: 'General street refuse & packaging' },
  { label: 'Organic / Wet Waste', value: 'Organic', icon: '🍂', desc: 'Leaves, food leftovers, market waste' },
  { label: 'Construction Debris', value: 'Construction', icon: '🧱', desc: 'Bricks, cement rubble, plaster' },
  { label: 'E-Waste', value: 'E-Waste', icon: '🔋', desc: 'Cables, battery packs, small electronics' },
  { label: 'Hazardous', value: 'Hazardous', icon: '⚠️', desc: 'Broken glass, chemicals, medical waste' },
];

export const MissionWizard: React.FC<MissionWizardProps> = ({ onSuccess, onCancel }) => {
  // Wizard steps: 1 = Before & Setup, 2 = After & Proof, 3 = Verifying Loader, 4 = Result Screen
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [category, setCategory] = useState<WasteCategory>('Plastic');
  const [beforeImage, setBeforeImage] = useState<string>('');
  const [afterImage, setAfterImage] = useState<string>('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string>('');

  // Geolocation State
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [locationStatus, setLocationStatus] = useState<
    'idle' | 'acquiring' | 'success' | 'denied' | 'fallback'
  >('idle');
  const [locationName, setLocationName] = useState<string>('Detecting location...');

  // Verification Result State
  const [verificationResult, setVerificationResult] = useState<VerificationResponse | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [loadingPhase, setLoadingPhase] = useState<number>(0);

  // File Input Refs
  const beforeInputRef = useRef<HTMLInputElement>(null);
  const afterInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  // Geolocation Grabber
  const captureGPS = () => {
    setLocationStatus('acquiring');
    if (!navigator.geolocation) {
      // Fallback to standard Indian coordinate (New Delhi)
      setLatitude(28.6139);
      setLongitude(77.209);
      setLocationName('New Delhi (Default Coordinates)');
      setLocationStatus('fallback');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = Number(pos.coords.latitude.toFixed(6));
        const lng = Number(pos.coords.longitude.toFixed(6));
        setLatitude(lat);
        setLongitude(lng);
        setLocationName(`Lat: ${lat.toFixed(4)}°, Long: ${lng.toFixed(4)}°`);
        setLocationStatus('success');
      },
      (err) => {
        console.warn('Geolocation permission denied or error:', err.message);
        // Fallback default coordinates (e.g. Connaught Place, New Delhi)
        setLatitude(28.6139);
        setLongitude(77.209);
        setLocationName('New Delhi, India (Location permission denied - fallback applied)');
        setLocationStatus('denied');
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  };

  // Convert File to Base64
  const handleFileUpload = (
    file: File,
    type: 'before' | 'after'
  ) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      if (type === 'before') {
        setBeforeImage(result);
        // Automatically capture location on before photo upload as specified
        if (!latitude) {
          captureGPS();
        }
      } else {
        setAfterImage(result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Video proof handler
  const handleVideoUpload = (file: File) => {
    setVideoFile(file);
    const url = URL.createObjectURL(file);
    setVideoPreviewUrl(url);
  };

  // One-click demo asset loaders
  const loadDemoPair1 = (part: 'before' | 'after') => {
    if (part === 'before') {
      setBeforeImage('/demo-assets/pair1-before.jpg');
      setLatitude(28.6139);
      setLongitude(77.209);
      setLocationName('MG Road - Sec 4, New Delhi (Demo GPS)');
      setLocationStatus('success');
    } else {
      setAfterImage('/demo-assets/pair1-after.jpg');
    }
  };

  const loadDemoPair2 = (part: 'before' | 'after') => {
    if (part === 'before') {
      setBeforeImage('/demo-assets/pair2-before.jpg');
      setLatitude(28.5355);
      setLongitude(77.391);
      setLocationName('Sector 18 Market, Noida (Demo GPS)');
      setLocationStatus('success');
    } else {
      setAfterImage('/demo-assets/pair2-after.jpg');
    }
  };

  // Animated verification progression text
  useEffect(() => {
    let interval: any;
    if (step === 3) {
      const phases = [
        'Connecting to verification engine...',
        'Comparing Before & After background landmarks...',
        'Checking street authenticity & anti-cheat check...',
        'Measuring garbage volume & cleaning thoroughness...',
        'Calculating eco-points reward...',
      ];
      setLoadingPhase(0);
      interval = setInterval(() => {
        setLoadingPhase((prev) => (prev < phases.length - 1 ? prev + 1 : prev));
      }, 1100);
    }
    return () => clearInterval(interval);
  }, [step]);

  // Submit to API
  const handleVerify = async () => {
    if (!beforeImage || !afterImage) return;

    setStep(3); // Show "Verifying and allotting points..." loading screen
    setIsSubmitting(true);

    try {
      const apiKey = getSavedGeminiKey();
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          beforeImage,
          afterImage,
          category,
          latitude: latitude || 28.6139,
          longitude: longitude || 77.209,
          apiKey: apiKey || undefined,
        }),
      });

      const data: VerificationResponse = await response.json();
      setVerificationResult(data);

      // Save mission to store
      const user = getUser();
      const createdMission = await addMission({
        user_id: user.id,
        category,
        before_image_url: beforeImage,
        after_image_url: afterImage,
        video_url: videoPreviewUrl || null,
        latitude: latitude || 28.6139,
        longitude: longitude || 77.209,
        location_name: locationName,
        status: data.is_valid ? 'approved' : 'rejected',
        points_awarded: data.is_valid ? data.points : 0,
        ai_feedback: data.reason,
      });

      // Brief delay so the user experiences the sleek loading animation
      setTimeout(() => {
        setStep(4);
        setIsSubmitting(false);

        if (data.is_valid) {
          // Trigger celebratory confetti blast
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#10B981', '#34D399', '#FBBF24', '#22C55E', '#14B8A6'],
          });
        }
      }, 1800);
    } catch (err: any) {
      console.error('Verification request failed:', err);
      setVerificationResult({
        is_valid: false,
        points: 0,
        reason: 'Network or verification service timeout. Please try again.',
      });
      setStep(4);
      setIsSubmitting(false);
    }
  };

  const phases = [
    'Initializing AI verification pipeline...',
    'Comparing Before & After background landmarks...',
    'Authenticating location consistency...',
    'Estimating garbage volume & cleaning thoroughness...',
    'Finalizing points evaluation (20-50 pts)...',
  ];

  return (
    <div className="bg-white rounded-3xl border border-emerald-100 shadow-xl overflow-hidden pb-6">
      {/* Top Header */}
      <div className="bg-gradient-to-r from-emerald-800 to-green-700 text-white px-5 py-4 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200">
            Swachh Mission • Step {step} of 3
          </span>
          <h2 className="text-lg font-black tracking-tight flex items-center space-x-1.5">
            <span>Report &amp; Clean Street</span>
          </h2>
        </div>
        <button
          onClick={onCancel}
          className="text-xs bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-full text-emerald-100 transition-colors"
        >
          Cancel
        </button>
      </div>

      {/* Progress Dots */}
      <div className="px-5 pt-3 pb-1 flex items-center space-x-2">
        <div
          className={`h-1.5 flex-1 rounded-full ${
            step >= 1 ? 'bg-emerald-600' : 'bg-slate-200'
          }`}
        />
        <div
          className={`h-1.5 flex-1 rounded-full ${
            step >= 2 ? 'bg-emerald-600' : 'bg-slate-200'
          }`}
        />
        <div
          className={`h-1.5 flex-1 rounded-full ${
            step >= 3 ? 'bg-emerald-600' : 'bg-slate-200'
          }`}
        />
      </div>

      {/* STEP 1: SETUP & BEFORE PHOTO */}
      {step === 1 && (
        <div className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
              1. Select Waste Category
            </label>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setCategory(cat.value)}
                  className={`flex items-start p-2.5 rounded-xl border text-left transition-all ${
                    category === cat.value
                      ? 'border-emerald-600 bg-emerald-50/80 ring-2 ring-emerald-500/20'
                      : 'border-slate-200 hover:border-emerald-300 bg-slate-50/50'
                  }`}
                >
                  <span className="text-xl mr-2">{cat.icon}</span>
                  <div>
                    <p className="text-xs font-bold text-slate-900 leading-tight">{cat.label}</p>
                    <p className="text-[10px] text-slate-500 line-clamp-1">{cat.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Before Photo Upload */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                2. Capture &quot;Before&quot; Photo
              </label>
              <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                Littered Site
              </span>
            </div>

            {beforeImage ? (
              <div className="relative rounded-2xl overflow-hidden border border-emerald-300 shadow-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={beforeImage}
                  alt="Before cleanup"
                  className="w-full h-48 object-cover bg-slate-100"
                />
                <button
                  type="button"
                  onClick={() => setBeforeImage('')}
                  className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black/80 rounded-full text-white transition-colors"
                  title="Remove photo"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-2 text-white flex items-center justify-between text-xs">
                  <span className="font-bold flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                    <span>&quot;Before&quot; Photo Captured</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => beforeInputRef.current?.click()}
                    className="text-[10px] underline hover:text-emerald-300"
                  >
                    Retake
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => beforeInputRef.current?.click()}
                className="border-2 border-dashed border-emerald-300 hover:border-emerald-500 bg-emerald-50/40 rounded-2xl p-6 text-center cursor-pointer transition-colors"
              >
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2 shadow-xs">
                  <Camera className="w-6 h-6" />
                </div>
                <p className="text-sm font-bold text-emerald-950">Snap or Upload &quot;Before&quot; Photo</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Clear photo showing the street garbage pile
                </p>
              </div>
            )}

            <input
              ref={beforeInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  handleFileUpload(e.target.files[0], 'before');
                }
              }}
            />

            {/* Presentation Quick-Fill Helpers */}
            <div className="mt-2.5 p-2.5 bg-amber-50/90 rounded-xl border border-amber-200">
              <div className="flex items-center space-x-1 text-[11px] font-bold text-amber-900 mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Presentation Fast-Fill Demo Assets:</span>
              </div>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => loadDemoPair1('before')}
                  className="flex-1 text-[11px] font-semibold bg-white hover:bg-emerald-50 text-emerald-800 py-1.5 px-2 rounded-lg border border-emerald-300 shadow-2xs transition-colors"
                >
                  Pair 1: Real Street (Before)
                </button>
                <button
                  type="button"
                  onClick={() => loadDemoPair2('before')}
                  className="flex-1 text-[11px] font-semibold bg-white hover:bg-rose-50 text-rose-800 py-1.5 px-2 rounded-lg border border-rose-300 shadow-2xs transition-colors"
                >
                  Pair 2: Test Fake (Before)
                </button>
              </div>
            </div>
          </div>

          {/* GPS Auto Geolocation */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-slate-700 flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>GPS Location (Auto-captured)</span>
              </span>
              <button
                type="button"
                onClick={captureGPS}
                className="text-[11px] text-emerald-700 font-semibold hover:underline"
              >
                {latitude ? 'Refresh GPS' : 'Detect GPS'}
              </button>
            </div>

            {latitude && longitude ? (
              <div className="text-xs text-slate-600">
                <p className="font-semibold text-emerald-800">{locationName}</p>
                <p className="text-[10px] text-slate-500 font-mono">
                  Coordinates: {latitude.toFixed(6)}° N, {longitude.toFixed(6)}° E
                </p>
              </div>
            ) : (
              <div className="text-[11px] text-slate-500 flex items-center justify-between">
                <span>Location captured automatically upon photo selection.</span>
                <button
                  type="button"
                  onClick={captureGPS}
                  className="px-2 py-0.5 bg-emerald-600 text-white rounded text-[10px] font-medium"
                >
                  Locate Now
                </button>
              </div>
            )}

            {locationStatus === 'denied' && (
              <div className="mt-1.5 text-[10px] text-amber-700 bg-amber-50 p-1.5 rounded border border-amber-200">
                Location access was denied. Fallback New Delhi coordinates applied automatically.
              </div>
            )}
          </div>

          {/* Next Button */}
          <button
            type="button"
            disabled={!beforeImage}
            onClick={() => setStep(2)}
            className={`w-full py-3 rounded-2xl font-bold text-sm flex items-center justify-center space-x-2 shadow-md transition-all ${
              beforeImage
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/30 active:scale-98'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <span>Proceed to &quot;After&quot; Cleaning Photo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* STEP 2: AFTER PHOTO & OPTIONAL VIDEO PROOF */}
      {step === 2 && (
        <div className="p-5 space-y-4">
          {/* Reference thumbnail of Before photo */}
          <div className="flex items-center space-x-3 p-2 bg-emerald-50 rounded-xl border border-emerald-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={beforeImage}
              alt="Before ref"
              className="w-14 h-14 object-cover rounded-lg border border-emerald-300"
            />
            <div className="text-xs">
              <span className="text-[10px] font-bold text-emerald-800 uppercase">
                Reference Before State
              </span>
              <p className="font-semibold text-slate-800">{category} Waste</p>
              <p className="text-[10px] text-slate-500">Capture after cleaning from same angle</p>
            </div>
          </div>

          {/* After Photo Upload */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                1. Capture &quot;After&quot; Photo (Proof of Cleaning)
              </label>
              <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                Cleaned Site
              </span>
            </div>

            {afterImage ? (
              <div className="relative rounded-2xl overflow-hidden border border-emerald-400 shadow-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={afterImage}
                  alt="After cleanup"
                  className="w-full h-48 object-cover bg-slate-100"
                />
                <button
                  type="button"
                  onClick={() => setAfterImage('')}
                  className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black/80 rounded-full text-white transition-colors"
                  title="Remove photo"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-2 text-white flex items-center justify-between text-xs">
                  <span className="font-bold flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                    <span>&quot;After&quot; Photo Ready</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => afterInputRef.current?.click()}
                    className="text-[10px] underline hover:text-emerald-300"
                  >
                    Retake
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => afterInputRef.current?.click()}
                className="border-2 border-dashed border-emerald-400 hover:border-emerald-600 bg-emerald-50/50 rounded-2xl p-6 text-center cursor-pointer transition-colors"
              >
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2 shadow-xs">
                  <Camera className="w-6 h-6" />
                </div>
                <p className="text-sm font-bold text-emerald-950">Snap or Upload &quot;After&quot; Photo</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Photograph the exact same location after cleaning
                </p>
              </div>
            )}

            <input
              ref={afterInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  handleFileUpload(e.target.files[0], 'after');
                }
              }}
            />

            {/* Presentation Quick-Fill Helpers */}
            <div className="mt-2.5 p-2.5 bg-amber-50/90 rounded-xl border border-amber-200">
              <div className="flex items-center space-x-1 text-[11px] font-bold text-amber-900 mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Presentation Fast-Fill Demo Assets:</span>
              </div>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => loadDemoPair1('after')}
                  className="flex-1 text-[11px] font-semibold bg-white hover:bg-emerald-50 text-emerald-800 py-1.5 px-2 rounded-lg border border-emerald-300 shadow-2xs transition-colors"
                >
                  Pair 1: Real Swept Street
                </button>
                <button
                  type="button"
                  onClick={() => loadDemoPair2('after')}
                  className="flex-1 text-[11px] font-semibold bg-white hover:bg-rose-50 text-rose-800 py-1.5 px-2 rounded-lg border border-rose-300 shadow-2xs transition-colors"
                >
                  Pair 2: Meme / Fake Image
                </button>
              </div>
            </div>
          </div>

          {/* Optional Short Video Upload */}
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-700 flex items-center space-x-1">
                <Video className="w-3.5 h-3.5 text-teal-600" />
                <span>Optional Video Proof</span>
              </label>
              <span className="text-[10px] text-slate-500 bg-slate-200/80 px-2 py-0.5 rounded-full">
                Stored for audit
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mb-2">
              Upload a 5-15 sec walk-around video proof. Stored in Supabase Edge Storage.
            </p>

            {videoPreviewUrl ? (
              <div className="rounded-xl overflow-hidden border border-slate-300 bg-black">
                <video src={videoPreviewUrl} controls className="w-full max-h-36" />
                <div className="p-1.5 bg-slate-800 text-white flex justify-between items-center text-[10px]">
                  <span>Video proof attached ({videoFile?.name})</span>
                  <button
                    type="button"
                    onClick={() => {
                      setVideoFile(null);
                      setVideoPreviewUrl('');
                    }}
                    className="text-rose-400 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => videoInputRef.current?.click()}
                className="w-full py-2 bg-white hover:bg-slate-100 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 flex items-center justify-center space-x-1.5 transition-colors"
              >
                <Upload className="w-3.5 h-3.5 text-slate-500" />
                <span>Attach Video Clip (Optional)</span>
              </button>
            )}

            <input
              ref={videoInputRef}
              type="file"
              accept="video/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  handleVideoUpload(e.target.files[0]);
                }
              }}
            />
          </div>

          {/* Buttons: Back / Submit */}
          <div className="flex space-x-3 pt-2">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-2xl transition-colors"
            >
              Back
            </button>
            <button
              type="button"
              disabled={!afterImage || isSubmitting}
              onClick={handleVerify}
              className={`flex-1 py-3 rounded-2xl font-bold text-sm flex items-center justify-center space-x-2 shadow-lg transition-all ${
                afterImage
                  ? 'bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 text-white shadow-emerald-600/35 hover:opacity-95 active:scale-98'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Submit for AI Verification</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: DEDICATED VISUALLY ENGAGING LOADING SCREEN */}
      {step === 3 && (
        <div className="p-8 text-center space-y-6 min-h-[380px] flex flex-col items-center justify-center">
          {/* Animated Radar Scanning Visual */}
          <div className="relative w-32 h-32 flex items-center justify-center">
            {/* Outer pulsating rings */}
            <div className="absolute inset-0 rounded-full border-2 border-emerald-400/40 animate-pulse-ring" />
            <div className="absolute -inset-3 rounded-full border border-emerald-500/20 animate-ping opacity-30" />

            {/* Circular radar background */}
            <div className="w-28 h-28 rounded-full bg-gradient-to-b from-emerald-900 to-green-950 p-1 shadow-xl shadow-emerald-900/30 relative overflow-hidden flex items-center justify-center">
              {/* Radar sweep beam */}
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-400/30 to-transparent origin-center animate-radar" />

              {/* Center icon */}
              <div className="relative z-10 w-14 h-14 rounded-full bg-emerald-700/80 border border-emerald-400/40 flex items-center justify-center text-white shadow-inner">
                <Sparkles className="w-7 h-7 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
              </div>
            </div>
          </div>

          {/* Required Text */}
          <div className="space-y-1.5">
            <h3 className="text-xl font-black text-emerald-950 tracking-tight">
              Verifying and allotting points...
            </h3>
            <p className="text-xs text-emerald-700/80 font-medium max-w-xs mx-auto">
              Comparing Before &amp; After street scenes via multimodal environmental AI vision
            </p>
          </div>

          {/* Dynamic Progress Phase Tracker */}
          <div className="w-full max-w-xs bg-slate-50 border border-slate-200 rounded-2xl p-3 text-left space-y-1.5 shadow-2xs">
            <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-800">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>{phases[loadingPhase]}</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-emerald-600 h-full transition-all duration-500"
                style={{ width: `${((loadingPhase + 1) / phases.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Security note */}
          <p className="text-[10px] text-slate-400 flex items-center space-x-1">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            <span>Anti-fraud &amp; geographic landmark validation active</span>
          </p>
        </div>
      )}

      {/* STEP 4: VERIFICATION RESULTS SCREEN */}
      {step === 4 && verificationResult && (
        <div className="p-6 text-center space-y-5">
          {verificationResult.is_valid ? (
            /* SUCCESS SCREEN */
            <div className="space-y-4">
              <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 border-4 border-emerald-200 flex items-center justify-center text-emerald-600 shadow-lg shadow-emerald-600/20">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Mission Approved! 🎉
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-2">
                  Street Cleanup Verified!
                </h3>
              </div>

              {/* Awarded Points Badge */}
              <div className="bg-gradient-to-br from-amber-50 to-emerald-50 border-2 border-emerald-400/80 rounded-3xl p-5 shadow-md">
                <p className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
                  Points Credited to Your Account
                </p>
                <div className="flex items-center justify-center space-x-2 my-1">
                  <span className="text-5xl font-black text-emerald-700">
                    +{verificationResult.points}
                  </span>
                  <span className="text-sm font-bold text-amber-700 uppercase">
                    Eco Points
                  </span>
                </div>
                <p className="text-[11px] text-slate-600">
                  {verificationResult.points >= 40
                    ? '🌟 Major cleanup! Bonus points awarded for high volume.'
                    : '🌱 Standard cleanup score credited.'}
                </p>
              </div>

              {/* AI Feedback Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-left text-xs space-y-1">
                <p className="font-bold text-slate-800 flex items-center space-x-1">
                  <FileCheck2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>AI Verification Assessment:</span>
                </p>
                <p className="text-slate-600 leading-relaxed italic">
                  &quot;{verificationResult.reason}&quot;
                </p>
                {verificationResult.engine && (
                  <p className="text-[10px] text-emerald-700/80 font-mono pt-1">
                    Verified via: {verificationResult.engine === 'gemini-1.5' ? 'Google Gemini 1.5 Flash Vision' : 'Neural Verifier Engine'}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    // Reset wizard for another mission
                    setBeforeImage('');
                    setAfterImage('');
                    setVideoFile(null);
                    setVideoPreviewUrl('');
                    setStep(1);
                  }}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-2xl transition-colors"
                >
                  Start Another Mission
                </button>
                <button
                  type="button"
                  onClick={onCancel}
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl shadow-md shadow-emerald-600/30 transition-all"
                >
                  View Mission Ledger
                </button>
              </div>
            </div>
          ) : (
            /* REJECTION SCREEN */
            <div className="space-y-4">
              <div className="w-20 h-20 mx-auto rounded-full bg-rose-50 border-4 border-rose-200 flex items-center justify-center text-rose-600 shadow-md">
                <XCircle className="w-12 h-12" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                  Verification Rejected
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-2">
                  Cleanup Could Not Be Verified
                </h3>
              </div>

              {/* Failure Explanation */}
              <div className="bg-rose-50/80 border border-rose-200 rounded-2xl p-4 text-left space-y-2">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-rose-900">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>Reason from AI Verifier:</span>
                </div>
                <p className="text-xs text-rose-800 leading-relaxed font-medium">
                  {verificationResult.reason}
                </p>
              </div>

              {/* Helpful Tips */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 text-left text-[11px] text-slate-600 space-y-1">
                <p className="font-bold text-slate-700">Tips for an approved mission:</p>
                <ul className="list-disc list-inside space-y-0.5 text-slate-500">
                  <li>Take both photos from the same standing vantage point.</li>
                  <li>Ensure background landmarks (walls, curbs, shop signs) match.</li>
                  <li>Avoid internet graphics, memes, or stock photos.</li>
                </ul>
              </div>

              {/* Actions */}
              <div className="flex space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-2xl transition-colors flex items-center justify-center space-x-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Photos</span>
                </button>
                <button
                  type="button"
                  onClick={onCancel}
                  className="flex-1 py-3 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-2xl transition-colors"
                >
                  Return to Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
