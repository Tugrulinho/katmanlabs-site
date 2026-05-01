import type { ContentMap, ClientRecord } from "./site";

export interface PublicServiceCard {
  id: string;
  slug: string;
  title: string;
  description: string;
  features: string[];
  icon_name: string;
  color: string;
  featured: boolean;
  display_order: number;
  updated_at: string;
  created_at: string;
}

export interface PublicPricingCard {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[];
  popular: boolean;
  display_order: number;
  updated_at: string;
  created_at: string;
}

export interface BlogIndexEntry {
  id: string;
  title: string;
  slug: string;
  file_path: string;
  excerpt: string;
  image_url: string;
  featured_image_url: string;
  meta_title: string;
  meta_description: string;
  og_image_url: string;
  status: "draft" | "published";
  category: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  readingMinutes: number;
}

export interface PublicSiteSnapshot {
  generatedAt: string;
  homepageContent: ContentMap;
  serviceCards: PublicServiceCard[];
  pricingCards: PublicPricingCard[];
  clients: ClientRecord[];
  blogIndex: BlogIndexEntry[];
}
