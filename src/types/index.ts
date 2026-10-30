export type WasteCategory =
  | 'Plastic'
  | 'Organic'
  | 'Mixed'
  | 'Construction'
  | 'E-Waste'
  | 'Hazardous';

export type MissionStatus = 'approved' | 'rejected';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  total_points: number;
  avatar_url?: string;
  city?: string;
  created_at?: string;
  isGuest?: boolean;
}

export interface RegisteredAccount extends UserProfile {
  password: string;
}

export interface Mission {
  id: string;
  user_id: string;
  category: WasteCategory;
  before_image_url: string;
  after_image_url: string;
  video_url?: string | null;
  latitude: number;
  longitude: number;
  status: MissionStatus;
  points_awarded: number;
  ai_feedback: string;
  created_at: string;
  location_name?: string;
}

export interface VerificationResponse {
  is_valid: boolean;
  points: number;
  reason: string;
  engine?: 'gemini-1.5' | 'neural-verifier';
  breakdown?: {
    authenticityScore: number;
    debrisVolume: 'small' | 'medium' | 'large';
    thoroughnessScore: number;
  };
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  city: string;
  points: number;
  missionsCount: number;
  badge: string;
  isCurrentUser?: boolean;
}

export type RewardCategory = 'all' | 'shopping' | 'food' | 'rides' | 'groceries' | 'eco';

export interface RewardCoupon {
  id: string;
  brand: 'Amazon' | 'Flipkart' | 'Zomato' | 'Swiggy' | 'Ola' | 'Uber' | 'Blinkit' | 'Delhi Metro' | 'Decathlon';
  title: string;
  description: string;
  pointsCost: number;
  discountValue: string;
  category: RewardCategory;
  logoEmoji: string;
  brandColor: string;
  bgLight: string;
  terms: string;
  popular?: boolean;
}

export interface RedeemedCoupon {
  id: string;
  rewardId: string;
  brand: string;
  title: string;
  discountValue: string;
  couponCode: string;
  pointsSpent: number;
  redeemedAt: string;
  expiresAt: string;
  status: 'active' | 'used';
  logoEmoji: string;
  brandColor: string;
}
