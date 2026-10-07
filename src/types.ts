export type ScriptMode = 'urdu' | 'hindi' | 'roman' | 'all';

export type CategoryTheme = 'ishq' | 'dard' | 'tanhai' | 'zindagi' | 'ruhaniyat' | 'inquilab';

export interface VocabWord {
  word: string;
  pronunciation?: string;
  meaning: string;
  culturalNote?: string;
}

export interface SherItem {
  id: string;
  poet: string;
  poetEra: string;
  poetBio: string;
  category: CategoryTheme;
  wingTitle: string;
  urdu: string;
  hindi: string;
  roman: string;
  englishTranslation: string;
  contextMeaning: string;
  vocabBreakdown: VocabWord[];
  tags: string[];
  curatorNote: string;
  yearOrSource: string;
  readTime: string;
  likesCount: number;
  matchingBoutiqueItemId?: string;
}

export interface BoutiqueProduct {
  id: string;
  title: string;
  tagline: string;
  badge: string;
  category: 'journals' | 'candles' | 'books' | 'accessories' | 'apparel';
  priceUsd: number;
  priceInr: number;
  originalPriceUsd: number;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  features: string[];
  affiliateMerchant: string;
  discountCode: string;
  discountPercentage: number;
  pairedSherId?: string;
  stockStatus: 'In Stock' | 'Limited Batch' | 'Curator Vault';
}

export interface SubmittedSher {
  id: string;
  authorName: string;
  instagramHandle: string;
  sherText: string;
  category: string;
  meaning?: string;
  timestamp: number;
  approved: boolean;
}
