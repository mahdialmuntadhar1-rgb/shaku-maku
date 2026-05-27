export type Language = 'ar' | 'ku' | 'en';

export type GovernorateCode = 'all' | 'baghdad' | 'erbil' | 'basra' | 'sulaymaniyah' | 'najaf' | 'mosul' | 'karbala' | 'kirkuk' | 'anbar' | 'duhok' | 'babil' | 'diyala' | 'wasit' | 'saladin' | 'maysan' | 'dhiqar' | 'muthanna' | 'qadisiya' | 'halabja';

export interface Governorate {
  code: GovernorateCode;
  name: {
    ar: string;
    ku: string;
    en: string;
  };
  englishLabel: string;
}

export interface Category {
  id: string;
  icon: string;
  name: {
    ar: string;
    ku: string;
    en: string;
  };
  color: string;
}

export interface Business {
  id: string;
  name: {
    ar: string;
    ku: string;
    en: string;
  };
  description: {
    ar: string;
    ku: string;
    en: string;
  };
  category: string;
  governorate: GovernorateCode;
  rating: number;
  reviewsCount: number;
  image: string;
  images: string[];
  avatar: string;
  isVerified: boolean;
  /**
   * Legacy single phone field used by the current demo dataset.
   * Production businesses may use `primary_phone` / `secondary_phone` / `whatsapp_number`.
   */
  phoneNumber?: string;

  // Production-oriented fields (optional for backward compatibility)
  primary_phone?: string;
  secondary_phone?: string;
  whatsapp_number?: string;

  /**
   * Normalized digits tokens used for fast phone matching.
   * Example tokens: ["9647712345678","7712345678","07712345678","7712345678"]
   */
  phoneSearchTokens?: string[];
  address: {
    ar: string;
    ku: string;
    en: string;
  };
  likes: number;
  saves: number;
  likedByUser?: boolean;
  savedByUser?: boolean;
  featuredDeal?: {
    ar: string;
    ku: string;
    en: string;
  };
  mapCoords: { x: number; y: number }; // percentage on interactive canvas map
  stories?: string[]; // short active stories
  ownerUid?: string; // Firebase Authentication owner ID
}

export interface BusinessOwner {
  id: string;
  user_id: string; // Firebase Auth uid
  business_id: string;
  role: 'owner' | 'manager' | 'staff';
  verified: boolean;
  created_at: string; // ISO
}

export type OwnershipClaimStatus = 'pending' | 'approved' | 'rejected';

export interface OwnershipClaim {
  id: string;
  user_id: string; // Firebase Auth uid (after OTP)
  business_id: string;
  phone_e164: string;
  status: OwnershipClaimStatus;
  suspicious: boolean;
  reason?: string;
  created_at: string; // ISO (legacy)
  created_at_ts?: any; // Firestore Timestamp (preferred)
  decided_at?: string; // ISO (legacy)
  decided_at_ts?: any; // Firestore Timestamp (preferred)
  decided_by?: string; // admin uid/email
}

export interface SocialPost {
  id: string;
  businessId: string;
  businessName: string;
  businessAvatar: string;
  category: string;
  governorate: GovernorateCode;
  mediaUrl: string;
  caption: {
    ar: string;
    ku: string;
    en: string;
  };
  likes: number;
  commentsCount: number;
  shares: number;
  timeAgo: {
    ar: string;
    ku: string;
    en: string;
  };
  likedByUser?: boolean;
  savedByUser?: boolean;
  comments: Comment[];
  promotionBadge?: {
    ar: string;
    ku: string;
    en: string;
  };
  videoUrl?: string;
  fileAttachment?: {
    name: string;
    size: string;
    type?: string;
  };
  authorUid?: string; // Firebase Authentication author ID
}

export interface UserProfile {
  uid: string;
  displayName: string;
  photoURL: string;
  email: string;
  phone?: string; // E.164
  createdAt: string;
  role?: 'user' | 'owner' | 'admin';
  onboarded?: boolean;
  businessId?: string | null;
  businessOnboarding?: {
    name: string;
    category: string;
    governorate: GovernorateCode;
    address: string;
    phone: string;
    whatsApp: string;
    logo: string;
    coverImage: string;
    description: string;
    facebook?: string;
    instagram?: string;
  };
}

export interface Comment {
  id: string;
  username: string;
  userAvatar?: string;
  text: string;
  time: string;
}

export interface HeroSlide {
  id: string;
  image: string;
  slogan: {
    ar: string;
    ku: string;
    en: string;
  };
  governorate: GovernorateCode;
  category: string;
  badge: {
    ar: string;
    ku: string;
    en: string;
  };
}

export interface BusinessClaim {
  id: string;
  businessId: string;
  businessName: {
    ar: string;
    ku: string;
    en: string;
  };
  userId: string;
  userPhone: string;
  status: 'pending' | 'approved' | 'rejected';
  isSuspicious: boolean;
  suspiciousReason?: string;
  createdAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
}

export interface BusinessOwnerRecord {
  id: string;
  userId: string;
  businessId: string;
  role: 'owner' | 'manager' | 'staff';
  verified: boolean;
  createdAt: string;
}
