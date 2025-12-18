import { AnalyticsArticle } from './types';
import { getAuthorAvatar, categoryImages } from './utils';

// Helper to get image by index cycling through available images
const getImage = (type: string, index: number) => {
  const images = categoryImages[type] || categoryImages.markets;
  return images[index % images.length];
};

const typeCycle: AnalyticsArticle['type'][] = ['expert', 'markets', 'longterm', 'technical'];
const readTimes = ['9 min', '10 min', '11 min', '12 min', '13 min', '14 min', '15 min'];
const titleVariants = [
  'Playbook',
  'Outlook',
  'Signal Check',
  'Risk/Reward',
  'Case Study',
  'Moat Review',
  'Valuation Snapshot',
  'Macro Impact',
  'Earnings Setup',
  'Positioning Guide',
  'Capital Flows',
  'Market Map',
  'Scenario Planner',
  'Checklist',
  'Primer',
];

const baseDate = new Date('2024-12-31T00:00:00Z');
const variantTag = (topic: string) => topic.split(' ')[0].replace(/[^a-zA-Z]/g, '') || 'Markets';

type AuthorConfig = {
  name: string;
  count: number;
  topics: string[];
};

const authorsConfig: AuthorConfig[] = [
  {
    name: 'Christina Summerbell',
    count: 94,
    topics: [
      'AI Infrastructure',
      'Semiconductors',
      'Cloud Platforms',
      'SaaS Growth',
      'Cybersecurity',
      'Fintech Disruption',
      'Data Centers',
      'Consumer Tech',
      'Robotics & Automation',
      'Edge Computing',
    ],
  },
  {
    name: 'Assunta Novak',
    count: 24,
    topics: [
      'Bitcoin Cycles',
      'Ethereum Roadmap',
      'Layer-2 Scaling',
      'DeFi Yields',
      'Stablecoins & Regulation',
      'On-chain Analytics',
      'Tokenomics Design',
      'Crypto Market Structure',
    ],
  },
  {
    name: 'Lysander Truog',
    count: 61,
    topics: [
      'Yield Curve',
      'Duration Strategy',
      'Credit Spreads',
      'Inflation-Linked Bonds',
      'Sovereign Debt',
      'High-Yield Credit',
      'Rate Cuts Scenarios',
      'Treasury Liquidity',
    ],
  },
  {
    name: 'Elias Wolfenstein',
    count: 16,
    topics: [
      'EU Equities',
      'Cross-Border M&A',
      'Eurozone Macro',
      'European Banks',
      'Industrial Leaders',
      'Luxury & Consumer',
      'Energy Transition EU',
    ],
  },
  {
    name: 'Anastasia Petrova',
    count: 40,
    topics: [
      'Eastern Europe Macro',
      'Energy Exports',
      'Commodity Cycles',
      'Frontier Markets',
      'FX Dynamics',
      'Rate Policy CEE',
      'Infrastructure Deals',
      'Banking Sector CEE',
    ],
  },
  {
    name: 'Luca Montefiore',
    count: 25,
    topics: [
      'Italian Markets',
      'Luxury Goods',
      'Tourism Recovery',
      'Mediterranean Banks',
      'Family Businesses',
      'SMEs & Export',
      'European Brands',
    ],
  },
  {
    name: 'Isabelle Dubois',
    count: 113,
    topics: [
      'ESG Integration',
      'Green Bonds',
      'Impact Investing',
      'Renewable Energy',
      'Carbon Markets',
      'Sustainable ETFs',
      'Energy Storage',
      'Water & Waste',
      'Transition Finance',
    ],
  },
  {
    name: 'Xu Meiling',
    count: 47,
    topics: [
      'China Tech',
      'E-commerce Platforms',
      'APAC Supply Chains',
      'Semiconductors Asia',
      'EV Ecosystem China',
      'Cross-Border Flows',
      'ASEAN Growth',
      'AI Policy China',
    ],
  },
];

const formatDate = (offset: number) => {
  const d = new Date(baseDate);
  d.setDate(d.getDate() - offset);
  return d.toISOString().split('T')[0];
};

const slugify = (title: string, index: number) =>
  `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}-${index}`;

const buildTitle = (topic: string, variantIndex: number, idx: number) => {
  const variant = titleVariants[variantIndex % titleVariants.length];
  return `${topic}: ${variant} ${idx + 1}`;
};

const generateArticles = (): AnalyticsArticle[] => {
  let globalIndex = 0;

  const generateForAuthor = (config: AuthorConfig): AnalyticsArticle[] => {
    const { name, count, topics } = config;
    return Array.from({ length: count }).map((_, i) => {
      const topic = topics[i % topics.length];
      const type = typeCycle[(globalIndex + i) % typeCycle.length];
      const readTime = readTimes[(globalIndex + i) % readTimes.length];
      const title = buildTitle(topic, i, i);
      const slug = slugify(`${topic}-${name}`, globalIndex + i);
      const date = formatDate(globalIndex + i);
      const authorAvatar = getAuthorAvatar(name);

      return {
        slug,
        title,
        excerpt: `${topic} perspective from ${name}.`,
        content: 'Content to be provided.',
        date,
        author: name,
        authorAvatar,
        type,
        readTime,
        imageUrl: getImage(type, globalIndex + i),
        tags: [topic, variantTag(topic), type],
      };
    });
  };

  const all = authorsConfig.flatMap((config) => {
    const articles = generateForAuthor(config);
    globalIndex += config.count;
    return articles;
  });

  return all;
};

const quickAnalytics: AnalyticsArticle[] = generateArticles();

export async function fetchAnalytics(type?: string): Promise<AnalyticsArticle[]> {
  let result = [...quickAnalytics];

  if (type && type !== 'all') {
    result = result.filter((item) => item.type === type);
  }

  return result;
}

export async function fetchAnalyticsBySlug(slug: string): Promise<AnalyticsArticle | null> {
  const found = quickAnalytics.find((item) => item.slug === slug);
  if (found) return found;

  try {
    const { fetchAnalyticsBySlug: fullFetch } = await import('../api');
    return fullFetch(slug);
  } catch {
    return null;
  }
}
