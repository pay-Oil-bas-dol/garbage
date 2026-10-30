import { UserProfile, Mission, WasteCategory, RewardCoupon, RedeemedCoupon, RegisteredAccount } from '@/types';
import { getSupabaseClient } from './supabase';

const STORAGE_KEYS = {
  USER: 'safai_user_profile',
  MISSIONS: 'safai_missions_list',
  GEMINI_KEY: 'safai_gemini_api_key',
  SUPABASE_URL: 'safai_supabase_url',
  SUPABASE_KEY: 'safai_supabase_anon_key',
  REDEMPTIONS: 'safai_redeemed_coupons',
  ACCOUNTS: 'safai_registered_accounts',
};

// Guest Profile for visitors who have not logged in yet
export const GUEST_USER: UserProfile = {
  id: 'guest',
  name: 'Guest Citizen',
  email: '',
  total_points: 0,
  city: 'New Delhi',
  isGuest: true,
};

// Pre-registered accounts available for testing
export const INITIAL_ACCOUNTS: RegisteredAccount[] = [
  {
    id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    name: 'Aarav Sharma',
    email: 'aarav@swachh.org',
    password: 'clean123',
    total_points: 145,
    avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
    city: 'New Delhi',
    created_at: new Date(Date.now() - 7 * 86400000).toISOString(),
    isGuest: false,
  },
  {
    id: 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    name: 'Priya Patel',
    email: 'priya@swachh.org',
    password: 'clean123',
    total_points: 210,
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
    city: 'Indore',
    created_at: new Date(Date.now() - 5 * 86400000).toISOString(),
    isGuest: false,
  },
  {
    id: 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33',
    name: 'Vikram Singh',
    email: 'vikram@swachh.org',
    password: 'clean123',
    total_points: 95,
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    city: 'Bengaluru',
    created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
    isGuest: false,
  },
];

// Initial default user for instant out-of-the-box demo
export const DEFAULT_USER: UserProfile = INITIAL_ACCOUNTS[0];

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
  if (typeof window === 'undefined') return GUEST_USER;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading user:', e);
  }
  return GUEST_USER;
}

export function saveUser(user: UserProfile) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  } catch (e) {
    console.error('Error saving user:', e);
  }
}

// Sync updated points back into permanent accounts store
export function syncAccountPoints(userId: string, points: number) {
  if (typeof window === 'undefined') return;
  const accounts = getRegisteredAccounts();
  const updated = accounts.map((a) => (a.id === userId ? { ...a, total_points: points } : a));
  saveRegisteredAccounts(updated);
}

// ==========================================
// USER ACCOUNTS & CREDENTIALS ENGINE
// ==========================================

export function getRegisteredAccounts(): RegisteredAccount[] {
  if (typeof window === 'undefined') return INITIAL_ACCOUNTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ACCOUNTS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Error reading accounts:', e);
  }
  saveRegisteredAccounts(INITIAL_ACCOUNTS);
  return INITIAL_ACCOUNTS;
}

export function saveRegisteredAccounts(accounts: RegisteredAccount[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(accounts));
  } catch (e) {
    console.error('Error saving accounts:', e);
  }
}

export function signUpUser(
  name: string,
  city: string,
  email: string,
  password: string
): { success: boolean; user?: UserProfile; error?: string } {
  const cleanEmail = email.trim().toLowerCase();
  if (!cleanEmail || !cleanEmail.includes('@')) {
    return { success: false, error: 'Please provide a valid email address.' };
  }
  if (!name.trim()) {
    return { success: false, error: 'Please enter your full name.' };
  }
  if (!password || password.length < 4) {
    return { success: false, error: 'Password must be at least 4 characters long.' };
  }

  const accounts = getRegisteredAccounts();
  if (accounts.some((a) => a.email.toLowerCase() === cleanEmail)) {
    return {
      success: false,
      error: 'An account with this email already exists. Please Sign In with your password.',
    };
  }

  const avatars = [
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80',
  ];

  const newAccount: RegisteredAccount = {
    id: 'usr-' + Date.now(),
    name: name.trim(),
    city: city.trim() || 'New Delhi',
    email: cleanEmail,
    password: password,
    total_points: 30, // Welcome +30 pts bonus
    avatar_url: avatars[accounts.length % avatars.length],
    created_at: new Date().toISOString(),
    isGuest: false,
  };

  const updatedAccounts = [...accounts, newAccount];
  saveRegisteredAccounts(updatedAccounts);
  saveUser(newAccount);

  return { success: true, user: newAccount };
}

export function signInUser(
  email: string,
  password: string
): { success: boolean; user?: UserProfile; error?: string } {
  const cleanEmail = email.trim().toLowerCase();
  const accounts = getRegisteredAccounts();
  const account = accounts.find((a) => a.email.toLowerCase() === cleanEmail);

  if (!account) {
    return {
      success: false,
      error: 'No account registered with this email address. Please check spelling or create a new account via Sign Up.',
    };
  }

  if (account.password !== password) {
    return {
      success: false,
      error: 'Incorrect password! Please enter the exact password you chose when signing up.',
    };
  }

  saveUser(account);
  return { success: true, user: account };
}

export function changePassword(
  email: string,
  oldPassword: string,
  newPassword: string
): { success: boolean; error?: string } {
  const cleanEmail = email.trim().toLowerCase();
  const accounts = getRegisteredAccounts();
  const account = accounts.find((a) => a.email.toLowerCase() === cleanEmail);

  if (!account) {
    return { success: false, error: 'User account not found.' };
  }

  if (account.password !== oldPassword) {
    return {
      success: false,
      error: 'Incorrect old password! You must provide your current password to authorize changing it.',
    };
  }

  if (!newPassword || newPassword.length < 4) {
    return { success: false, error: 'New password must be at least 4 characters long.' };
  }

  if (newPassword === oldPassword) {
    return { success: false, error: 'New password cannot be the same as your old password.' };
  }

  account.password = newPassword;
  saveRegisteredAccounts(accounts);
  return { success: true };
}

export function logOutUser(): UserProfile {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEYS.USER);
  }
  return GUEST_USER;
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
    syncAccountPoints(updatedUser.id, updatedUser.total_points);
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
  localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(INITIAL_ACCOUNTS));
  localStorage.removeItem(STORAGE_KEYS.REDEMPTIONS);
}

// ==========================================
// REWARDS & COUPON REDEMPTION ENGINE
// ==========================================

export const REWARD_CATALOG: RewardCoupon[] = [
  {
    id: 'rew-amz-50',
    brand: 'Amazon',
    title: 'Amazon Pay ₹50 Voucher',
    description: 'Instant balance for Amazon shopping, bill payments, and mobile recharges.',
    pointsCost: 45,
    discountValue: '₹50 OFF',
    category: 'shopping',
    logoEmoji: '📦',
    brandColor: '#FF9900',
    bgLight: 'bg-amber-50',
    terms: 'Valid on orders above ₹100. Expires in 30 days from redemption.',
    popular: true,
  },
  {
    id: 'rew-amz-100',
    brand: 'Amazon',
    title: 'Amazon Shopping ₹100 Gift Card',
    description: 'Use across millions of products with zero restrictions or minimum basket value.',
    pointsCost: 85,
    discountValue: '₹100 CARD',
    category: 'shopping',
    logoEmoji: '🛍️',
    brandColor: '#FF9900',
    bgLight: 'bg-amber-50',
    terms: 'Valid on entire Amazon.in catalog. 1-year validity.',
    popular: true,
  },
  {
    id: 'rew-flip-100',
    brand: 'Flipkart',
    title: 'Flipkart ₹100 SuperCoin Voucher',
    description: 'Direct savings on electronics, lifestyle, books, and home appliances.',
    pointsCost: 80,
    discountValue: '₹100 OFF',
    category: 'shopping',
    logoEmoji: '🏷️',
    brandColor: '#2874F0',
    bgLight: 'bg-blue-50',
    terms: 'Applicable at checkout on Flipkart web and mobile apps.',
    popular: true,
  },
  {
    id: 'rew-flip-250',
    brand: 'Flipkart',
    title: 'Flipkart ₹250 Mega Savings Pass',
    description: 'High-tier reward for dedicated Swachh champions clearing high-volume waste.',
    pointsCost: 190,
    discountValue: '₹250 OFF',
    category: 'shopping',
    logoEmoji: '💎',
    brandColor: '#2874F0',
    bgLight: 'bg-blue-50',
    terms: 'Valid on min cart value of ₹500 across Flipkart assured items.',
  },
  {
    id: 'rew-zom-75',
    brand: 'Zomato',
    title: 'Zomato Food Delivery ₹75 Off',
    description: 'Enjoy delicious meals delivered straight to your door with ₹75 instant off.',
    pointsCost: 55,
    discountValue: '₹75 OFF',
    category: 'food',
    logoEmoji: '🍕',
    brandColor: '#E23744',
    bgLight: 'bg-rose-50',
    terms: 'Valid on restaurant orders above ₹199. Valid across India.',
    popular: true,
  },
  {
    id: 'rew-zom-gold',
    brand: 'Zomato',
    title: 'Zomato Gold 1-Month Free Pass',
    description: 'Unlock VIP dining discounts, free delivery on orders, and priority service.',
    pointsCost: 110,
    discountValue: '1-MO PASS',
    category: 'food',
    logoEmoji: '👑',
    brandColor: '#E23744',
    bgLight: 'bg-rose-50',
    terms: 'New & existing Zomato users eligible. Renews or pauses at your choice.',
  },
  {
    id: 'rew-swig-100',
    brand: 'Swiggy',
    title: 'Swiggy Gourmet ₹100 Voucher',
    description: 'Valid for food delivery, Swiggy Instamart groceries, and Swiggy Dineout.',
    pointsCost: 75,
    discountValue: '₹100 OFF',
    category: 'food',
    logoEmoji: '🍔',
    brandColor: '#FC8019',
    bgLight: 'bg-orange-50',
    terms: 'Valid on orders over ₹249 across all Swiggy partner restaurants.',
    popular: true,
  },
  {
    id: 'rew-ola-50',
    brand: 'Ola',
    title: 'Ola Cab Ride ₹50 Discount',
    description: 'Convenient zero-emission & standard city rides on Ola Mini, Prime & Auto.',
    pointsCost: 40,
    discountValue: '₹50 OFF',
    category: 'rides',
    logoEmoji: '🚕',
    brandColor: '#00D166',
    bgLight: 'bg-emerald-50',
    terms: 'Apply in the Ola app before confirming ride. No min fare required.',
    popular: true,
  },
  {
    id: 'rew-ola-elec',
    brand: 'Ola',
    title: 'Ola Electric Pass ₹100 Credit',
    description: 'Promoting clean green urban mobility with zero tailpipe emissions.',
    pointsCost: 75,
    discountValue: '₹100 PASS',
    category: 'rides',
    logoEmoji: '⚡',
    brandColor: '#00D166',
    bgLight: 'bg-emerald-50',
    terms: 'Applicable on Ola electric scooter fleet and charging stations.',
  },
  {
    id: 'rew-uber-60',
    brand: 'Uber',
    title: 'Uber Auto / Uber Go ₹60 Voucher',
    description: 'Reliable point-to-point daily urban commutes with ₹60 off your ride.',
    pointsCost: 45,
    discountValue: '₹60 OFF',
    category: 'rides',
    logoEmoji: '🚗',
    brandColor: '#000000',
    bgLight: 'bg-slate-50',
    terms: 'Valid on Uber Auto, Moto, and Uber Go across all metro cities.',
    popular: true,
  },
  {
    id: 'rew-uber-150',
    brand: 'Uber',
    title: 'Uber Intercity ₹150 Voucher',
    description: 'Comfortable outstation highway travel with verified sanitized drivers.',
    pointsCost: 120,
    discountValue: '₹150 OFF',
    category: 'rides',
    logoEmoji: '🛣️',
    brandColor: '#000000',
    bgLight: 'bg-slate-50',
    terms: 'Valid on round-trip and one-way Uber Intercity bookings.',
  },
  {
    id: 'rew-blink-50',
    brand: 'Blinkit',
    title: 'Blinkit ₹50 Organic Groceries',
    description: 'Get fresh seasonal produce and sustainable kitchen staples in 10 minutes.',
    pointsCost: 35,
    discountValue: '₹50 OFF',
    category: 'groceries',
    logoEmoji: '🥦',
    brandColor: '#F8CB46',
    bgLight: 'bg-yellow-50',
    terms: 'No minimum order required. Auto-applied in Blinkit cart.',
  },
  {
    id: 'rew-metro-pass',
    brand: 'Delhi Metro',
    title: 'Delhi Metro 1-Day Eco Pass',
    description: 'Unlimited 1-day travel across all DMRC lines via Green Civic Subsidy.',
    pointsCost: 65,
    discountValue: 'FREE PASS',
    category: 'eco',
    logoEmoji: '🚇',
    brandColor: '#DC2626',
    bgLight: 'bg-red-50',
    terms: 'Redeem QR code at customer care counter or scan at AFC gates.',
    popular: true,
  },
  {
    id: 'rew-decat-150',
    brand: 'Decathlon',
    title: 'Decathlon ₹150 Eco-Gear Voucher',
    description: 'Choose recycled outdoor gear, stainless steel water bottles, and activewear.',
    pointsCost: 125,
    discountValue: '₹150 OFF',
    category: 'eco',
    logoEmoji: '⛺',
    brandColor: '#0082C3',
    bgLight: 'bg-cyan-50',
    terms: 'Valid in Decathlon retail outlets and online shopping app.',
  },
];

// Initial starter sample coupon so the user sees a functioning active vault
export const INITIAL_REDEEMED_COUPONS: RedeemedCoupon[] = [
  {
    id: 'red-sample-1',
    rewardId: 'rew-amz-50',
    brand: 'Amazon',
    title: 'Amazon Pay ₹50 Voucher',
    discountValue: '₹50 OFF',
    couponCode: 'AMZ-CLEAN-82F4',
    pointsSpent: 45,
    redeemedAt: new Date(Date.now() - 1 * 86400000).toISOString(),
    expiresAt: new Date(Date.now() + 29 * 86400000).toISOString(),
    status: 'active',
    logoEmoji: '📦',
    brandColor: '#FF9900',
  },
];

export function getRedeemedCoupons(): RedeemedCoupon[] {
  if (typeof window === 'undefined') return INITIAL_REDEEMED_COUPONS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.REDEMPTIONS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.error('Error reading redeemed coupons:', e);
  }
  return INITIAL_REDEEMED_COUPONS;
}

export function saveRedeemedCoupons(coupons: RedeemedCoupon[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.REDEMPTIONS, JSON.stringify(coupons));
  } catch (e) {
    console.error('Error saving redeemed coupons:', e);
  }
}

export function redeemCoupon(reward: RewardCoupon): { success: boolean; coupon?: RedeemedCoupon; error?: string } {
  const user = getUser();
  if (user.total_points < reward.pointsCost) {
    return {
      success: false,
      error: `Insufficient points! You need ${reward.pointsCost} points, but currently have ${user.total_points}.`,
    };
  }

  // Deduct points
  const updatedUser: UserProfile = {
    ...user,
    total_points: user.total_points - reward.pointsCost,
  };
  saveUser(updatedUser);
  syncAccountPoints(updatedUser.id, updatedUser.total_points);

  // Generate branded alphanumeric voucher code
  const brandPrefix = reward.brand.toUpperCase().replace(/\s+/g, '').slice(0, 4);
  const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const couponCode = `${brandPrefix}-SAFAI-${randomHex}${randomNum.toString().slice(-2)}`;

  const now = new Date();
  const expires = new Date(now.getTime() + 30 * 86400000); // 30 days validity

  const newRedeemed: RedeemedCoupon = {
    id: 'red-' + Date.now(),
    rewardId: reward.id,
    brand: reward.brand,
    title: reward.title,
    discountValue: reward.discountValue,
    couponCode: couponCode,
    pointsSpent: reward.pointsCost,
    redeemedAt: now.toISOString(),
    expiresAt: expires.toISOString(),
    status: 'active',
    logoEmoji: reward.logoEmoji,
    brandColor: reward.brandColor,
  };

  const existing = getRedeemedCoupons();
  const updatedList = [newRedeemed, ...existing];
  saveRedeemedCoupons(updatedList);

  return {
    success: true,
    coupon: newRedeemed,
  };
}

export function markCouponUsed(couponId: string): void {
  const coupons = getRedeemedCoupons();
  const updated = coupons.map((c) => (c.id === couponId ? { ...c, status: 'used' as const } : c));
  saveRedeemedCoupons(updated);
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
