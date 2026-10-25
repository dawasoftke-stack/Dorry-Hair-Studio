export interface ServiceItem {
  id: string;
  name: string;
  category: 'natural-hair' | 'protective-styles' | 'hair-treatments' | 'beauty-services';
  categoryLabel: string;
  description: string;
  benefits: string[];
  image: string;
  priceNote: string;
  durationNote: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'natural' | 'braids' | 'locs' | 'treatment' | 'editorial';
  categoryLabel: string;
  image: string;
  aspect: 'tall' | 'wide' | 'square';
  caption: string;
}

export interface HairCareArticle {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  summary: string;
  content: {
    heading: string;
    paragraphs: string[];
    tips?: string[];
  }[];
}

export interface BookingSubmission {
  bookingId?: string;
  name: string;
  phone: string;
  email?: string;
  serviceCategory: string;
  serviceName: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
  status?: string;
  createdAt?: string;
}
