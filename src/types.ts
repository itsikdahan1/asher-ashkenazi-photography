export type IconKey = 'camera' | 'layers' | 'users' | 'shield' | 'sparkles' | 'box' | 'heart' | 'clock';

export interface BusinessContent {
  name: string;
  tagline: string;
  description: string;
  whatsappNumber: string;
  email: string;
  instagramUrl: string;
  facebookUrl: string;
  logoUrl: string;
  privacyPolicyUrl: string;
  termsUrl: string;
}

export interface HeroContent {
  eyebrow: string;
  titleLine: string;
  titleAccent: string;
  subtitle: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  backgroundImageUrl: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: IconKey;
  size: 'small' | 'large';
  enabled: boolean;
}

export interface FeaturesContent {
  title: string;
  accent: string;
  subtitle: string;
  items: FeatureItem[];
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  icon: IconKey;
  enabled: boolean;
}

export interface ServicesContent {
  title: string;
  accent: string;
  subtitle: string;
  items: ServiceItem[];
}

export interface PackagingContent {
  enabled: boolean;
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  bullets: string[];
  images: string[];
  badgeTitle: string;
  badgeText: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  category: string;
  title: string;
  alt: string;
  featured: boolean;
  enabled: boolean;
}

export interface GalleryContent {
  title: string;
  accent: string;
  description: string;
  emptyMessage: string;
  images: GalleryImage[];
}

export interface LogoItem {
  id: string;
  name: string;
  imageUrl: string;
  url: string;
  enabled: boolean;
}

export interface LogosContent {
  title: string;
  accent: string;
  subtitle: string;
  items: LogoItem[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  content: string;
  role: string;
  time: string;
  enabled: boolean;
}

export interface TestimonialsContent {
  title: string;
  accent: string;
  footerNote: string;
  items: TestimonialItem[];
}

export interface PackageItem {
  id: string;
  name: string;
  description: string;
  features: string[];
  price: string;
  highlight: boolean;
  enabled: boolean;
}

export interface PackagesContent {
  title: string;
  accent: string;
  description: string;
  items: PackageItem[];
}

export interface SiteContent {
  business: BusinessContent;
  hero: HeroContent;
  features: FeaturesContent;
  services: ServicesContent;
  packaging: PackagingContent;
  gallery: GalleryContent;
  logos: LogosContent;
  testimonials: TestimonialsContent;
  packages: PackagesContent;
}

export interface ContentState {
  content: SiteContent;
  isLoading: boolean;
  error: string;
  source: 'default' | 'local' | 'remote';
  isRemoteConfigured: boolean;
  setContent: (content: SiteContent) => void;
  updateContent: (updater: (content: SiteContent) => SiteContent) => void;
  saveContent: (content: SiteContent) => Promise<void>;
  reloadContent: () => Promise<void>;
}
