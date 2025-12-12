export interface BookBenefit {
  title: string;
  description: string;
}

export interface Book {
  id: string;
  asin: string; // Amazon Standard Identification Number
  title: string;
  age: string;
  price: string;
  coverImage: string; // URL
  shortDescription: string;
  fullDescription: string;
  benefits: BookBenefit[];
  targetAudience: string;
  themeColor: string; // Tailwind class equivalent for background
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