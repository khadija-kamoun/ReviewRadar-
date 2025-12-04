export enum Sentiment {
  POSITIVE = 'Positive',
  NEUTRAL = 'Neutral',
  NEGATIVE = 'Negative',
}

export interface ReviewSource {
  platform: string; // e.g., "Reddit", "Twitter", "G2"
  url?: string;
  snippet: string;
  sentiment: Sentiment;
  date?: string;
}

export interface TopicInsight {
  topic: string; // e.g., "Pricing", "UX", "Support"
  sentimentScore: number; // 0 to 100, where > 60 is positive, < 40 is negative
  volume: number; // Relative volume of mentions (1-10)
  summary: string;
}

export interface AnalysisResult {
  companyName: string;
  websiteUrl?: string;
  overallScore: number; // 0 to 100
  sentimentDistribution: {
    positive: number;
    neutral: number;
    negative: number;
  };
  summary: string;
  pros: string[];
  cons: string[];
  topics: TopicInsight[];
  reviews: ReviewSource[];
}

export interface SearchState {
  isLoading: boolean;
  error: string | null;
  data: AnalysisResult | null;
}