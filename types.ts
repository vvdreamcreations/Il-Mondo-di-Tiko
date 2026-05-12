export interface BookBenefit {
  title: string;
  description: string;
}

export interface Book {
  id: string;
  asin: string;
  title: string;
  age: string;
  price: string;
  coverImage: string;
  shortDescription: string;
  fullDescription: string;
  benefits: BookBenefit[];
  targetAudience: string;
  themeColor: string;
  internalImages: string[];
  accentColor: string;
  gradient: string;
}

export interface Review {
  id: number;
  author: string;
  rating: number;
  text: string;
}

export interface ValueItem {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  image: string; // URL for the modal image
  iconName: 'Rocket' | 'Heart' | 'Sprout' | 'Palette';
}