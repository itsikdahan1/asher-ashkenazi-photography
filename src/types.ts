export interface GalleryImage {
  id: string;
  url: string;
  category: 'events' | 'magnets' | 'family';
  title: string;
}

export interface Package {
  id: string;
  name: string;
  description: string;
  features: string[];
  price?: string;
  highlight?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  content: string;
  role: string;
}
