// /lib/types.ts

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string; // 'rings' | 'earrings' | 'pendants' | 'solitaire-pendants' | 'bracelets'
  description: string;
  diamondWeight: string;
  diamondShape: string;
  colour: string;
  clarity: string;
  metalType: string;
  certification: string;
  badge: string; // 'New' | 'Bestseller' | 'Featured' | ''
  productCode?: string;
  systemId?: string;
  price?: number;
  currency?: 'INR' | 'USD';
  images: string[];
  coverImage: string;
  isActive: boolean;
  createdAt: any; // Firestore Timestamp
  updatedAt: any; // Firestore Timestamp
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  coverImage: string;
  isActive: boolean;
  order: number;
}

export interface SiteSettings {
  id: string; // expected 'hero'
  videoUrl: string;
  posterUrl: string;
  headline: string;
  subheadline: string;
}

export interface Review {
  id: string;
  name: string;
  review: string;
  isActive: boolean;
  order: number;
}
