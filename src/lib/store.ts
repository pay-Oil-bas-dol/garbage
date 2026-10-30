import { UserProfile, Mission, WasteCategory } from '@/types';
import { getSupabaseClient } from './supabase';

const STORAGE_KEYS = {
  USER: 'safai_user_profile',
  MISSIONS: 'safai_missions_list',
  GEMINI_KEY: 'safai_gemini_api_key',
  SUPABASE_URL: 'safai_supabase_url',
  SUPABASE_KEY: 'safai_supabase_anon_key',
};

// Initial default user for instant out-of-the-box demo
export const DEFAULT_USER: UserProfile = {
  id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  name: 'Aarav Sharma',
  email: 'aarav@swachh.org',
  total_points: 145,
  avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
  city: 'New Delhi',
  created_at: new Date(Date.now() - 7 * 86400000).toISOString(),
};

// Initial seed missions for realistic ledger display
export const INITIAL_MISSIONS: Mission[] = [
  {
    id: 'm-101',
    user_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    category: 'Plastic',
    before_image_url: '/demo-assets/pair1-before.jpg',
    after_image_url: '/demo-assets/pair1-after.jpg',
    latitude: 28.6139,
    longitude: 77.209,
    location_name: 'MG Road, Sec 4, New Delhi',
    status: 'approved',
    points_awarded: 42,
    ai_feedback:
      'Verified Authentic Cleanup: Landmark and curb markings match perfectly. Substantial pile of single-use plastic bottles and wrappers cleared thoroughly into segregated waste bag.',
    created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  {
    id: 'm-102',
    user_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    category: 'Organic',
    before_image_url: '/demo-assets/pair1-before.jpg',
    after_image_url: '/demo-assets/pair1-after.jpg',
    latitude: 28.6304,
    longitude: 77.2177,
    location_name: 'Connaught Circle, Outer Lane',
    status: 'approved',
    points_awarded: 35,
    ai_feedback:
      'Verified: Wet organic marketplace waste gathered and deposited into municipal compost bin.',
    created_at: new Date(Date.now() - 4 * 86400000).toISOString(),
  },
  {
    id: 'm-103',
    user_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    category: 'Mixed',
    before_image_url: '/demo-assets/pair2-before.jpg',
    after_image_url: '/demo-assets/pair2-after.jpg',
    latitude: 28.5355,
    longitude: 77.391,
    location_name: 'Sector 18 Market, Noida',
    status: 'rejected',
    points_awarded: 0,
    ai_feedback:
      'Rejection: The after image appears to be an internet graphic/meme. Both photos must document the exact same physical street location.',
    created_at: new Date(Date.now() - 6 * 86400000).toISOString(),
  },
];

export function getUser(): UserProfile {
  if (typeof window === 'undefined') return DEFAULT_USER;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading user:', e);
  }
  return DEFAULT_USER;
}

export function saveUser(user: UserProfile) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  } catch (e) {
    console.error('Error saving user:', e);
  }
}

export function getMissions(): Mission[] {
  if (typeof window === 'undefined') return INITIAL_MISSIONS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.MISSIONS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Error reading missions:', e);
  }
  return INITIAL_MISSIONS;
}

export function saveMissions(missions: Mission[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.MISSIONS, JSON.stringify(missions));
  } catch (e) {
    console.error('Error saving missions:', e);
  }
}

export async function addMission(missionData: Omit<Mission, 'id' | 'created_at'>): Promise<Mission> {
  const newMission: Mission = {
    ...missionData,
    id: 'm-' + Date.now(),
    created_at: new Date().toISOString(),
  };

  // Update in localStorage
  const currentMissions = getMissions();
  const updatedMissions = [newMission, ...currentMissions];
  saveMissions(updatedMissions);

  // Update user points if approved
  if (newMission.status === 'approved' && newMission.points_awarded > 0) {
    const user = getUser();
    const updatedUser = {
      ...user,
      total_points: user.total_points + newMission.points_awarded,
    };
    saveUser(updatedUser);
  }

  // Try sync with Supabase if configured
  try {
    const supabase = getSupabaseClient();
    if (supabase) {
      await supabase.from('missions').insert({
        user_id: newMission.user_id,
        category: newMission.category,
        before_image_url: newMission.before_image_url,
        after_image_url: newMission.after_image_url,
        video_url: newMission.video_url || null,
        latitude: newMission.latitude,
        longitude: newMission.longitude,
        status: newMission.status,
        points_awarded: newMission.points_awarded,
        ai_feedback: newMission.ai_feedback,
      });
    }
  } catch (err) {
    console.warn('Supabase sync skipped or failed:', err);
  }

  return newMission;
}

export function resetDemoData() {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(DEFAULT_USER));
  localStorage.setItem(STORAGE_KEYS.MISSIONS, JSON.stringify(INITIAL_MISSIONS));
}

// Custom Gemini Key getter/setter
export function getSavedGeminiKey(): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(STORAGE_KEYS.GEMINI_KEY) || '';
}

export function saveGeminiKey(key: string) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.GEMINI_KEY, key.trim());
}
