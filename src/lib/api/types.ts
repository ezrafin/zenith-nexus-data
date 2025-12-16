// API Types

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  source: string;
  market: 'indices' | 'stocks' | 'crypto' | 'commodities' | 'currencies' | 'general';
  imageUrl?: string;
}

export interface AnalyticsArticle {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  authorAvatar: string;
  type: 'expert' | 'markets' | 'longterm' | 'technical';
  readTime: string;
  imageUrl: string;
  resources?: Array<{ title: string; url: string; type?: 'article' | 'data' | 'tool' | 'video' }>;
  images?: string[];
  sections?: Array<{ heading: string; content: string }>;
  tags?: string[];
  relatedCompanies?: string[];
  relatedMarkets?: string[];
}

export interface MarketData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  volume?: string;
}

export interface Company {
  slug: string;
  name: string;
  logo: string;
  sector: string;
  description: string;
  overview: string;
  founded: string;
  headquarters: string;
  employees: string;
  marketCap: string;
}

export interface ForumCategory {
  id: string;
  name: string;
  description: string;
  topicCount: number;
  postCount: number;
}

export interface ForumTopic {
  id: string;
  categoryId: string;
  title: string;
  content?: string;
  author: string;
  authorId?: string;
  authorAvatar: string;
  date: string;
  replies: number;
  views: number;
  lastActivity: string;
  like_count?: number;
  authorReputation?: number;
}

export interface ForumComment {
  id: string;
  topicId: string;
  author: string;
  authorId?: string;
  authorAvatar: string;
  content: string;
  date: string;
  rating: number;
   authorReputation?: number;
}
