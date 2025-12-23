export interface Video {
  id: string;
  title: string;
  category: 'markets' | 'analysis' | 'strategy' | 'education' | 'interview' | 'banking-reality';
  tags: string[];
  level: 'beginner' | 'intermediate' | 'pro';
  format: 'lecture' | 'case' | 'analysis' | 'discussion';
  duration: string;
  description: string;
  keyTakeaways: string[];
  selfCheckQuestions: { question: string; hint?: string }[];
  resources: { title: string; url: string }[];
  thumbnail: string;
  relatedForumTopics: string[];
  publishedAt: string;
  /** Optional URL to the video source (YouTube/Vimeo/MP4). When provided, the player will be shown. */
  videoUrl?: string;
}

export const videoCategories = [
  { id: 'markets', name: 'Markets', count: 8 },
  { id: 'analysis', name: 'Analysis', count: 6 },
  { id: 'strategy', name: 'Strategies', count: 7 },
  { id: 'education', name: 'Education', count: 9 },
  { id: 'interview', name: 'Interviews', count: 4 },
  { id: 'banking-reality', name: 'Banks vs Investments', count: 5 },
];

export const videoTags = [
  'stocks', 'bonds', 'ETF', 'cryptocurrency', 'forex', 
  'technical analysis', 'fundamental analysis', 'risk management',
  'portfolio', 'dividends', 'inflation', 'real returns', 
  'bank deposits', 'bank alternatives'
];

export const videos: Video[] = [
  {
    id: 'real-returns-inflation',
    title: 'Real Returns: What Remains After Inflation',
    category: 'banking-reality',
    tags: ['inflation', 'real returns', 'bank deposits'],
    level: 'beginner',
    format: 'lecture',
    duration: '28 min',
    description: 'We break down how inflation and compound interest interact, and how much of your deposit return remains after rising prices. Using simple examples and a compound‑interest framework, we compare nominal and real returns of different instruments.',
    keyTakeaways: [
      'Real return = nominal return minus inflation, adjusted over time through compound interest.',
      'Even with a seemingly good nominal rate, long periods of moderate inflation can erode 30–40% of your purchasing power.',
      'Compounding works both ways: low real returns compounded over many years are dramatically weaker than they look in nominal terms.',
      'Historically, diversified instruments (stock index ETFs, quality bonds) have a better chance to beat inflation than simple bank deposits.',
      'Banks earn the spread between what they pay on deposits and what they charge on loans; your true return is what is left after inflation and fees.'
    ],
    selfCheckQuestions: [
      { 
        question: 'If your deposit earns 7% per year while inflation is 5%, what is the approximate real return for one year?', 
        hint: 'Start with nominal – inflation (7% – 5%), then remember this is only an approximation.' 
      },
      { 
        question: 'Why can a deposit with 6–8% nominal return still lose purchasing power over 10–15 years?', 
        hint: 'Think about how inflation compounds every year, just like interest.' 
      },
      { 
        question: 'Name at least two asset classes that historically have a better chance to outpace inflation than a simple bank deposit.', 
        hint: 'Look at long‑term returns of stock index ETFs and high‑quality bonds.' 
      }
    ],
    resources: [
      { title: 'Real Return Calculator', url: '/tools/real-return-calculator' },
      { title: 'Article: Inflation and Savings', url: '/education/basic' }
    ],
    thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop',
    relatedForumTopics: ['deposits-vs-investments', 'inflation-protection'],
    publishedAt: '2024-12-01',
    // Khan Academy: Introduction to compound interest
    // https://www.khanacademy.org/economics-finance-domain/core-finance/interest-tutorial/compound-interest-tutorial/v/introduction-to-compound-interest
    videoUrl: 'https://www.khanacademy.org/economics-finance-domain/core-finance/interest-tutorial/compound-interest-tutorial/v/introduction-to-compound-interest'
  },
  {
    id: 'hidden-bank-fees',
    title: 'Hidden Fees in Banking Products',
    category: 'banking-reality',
    tags: ['bank deposits', 'fees', 'real returns'],
    level: 'beginner',
    format: 'case',
    duration: '32 min',
    description: 'Real examples breakdown: how bank marketing promises diverge from reality. Learn to read the fine print.',
    keyTakeaways: [
      'Account maintenance fees can "eat up" 0.5-2% of annual returns',
      'Early withdrawal often cancels interest — a hidden liquidity risk',
      'Deposit insurance doesn\'t protect against inflation — only bank bankruptcy',
      'Compare: ETF with 0.1% fee vs bank product with 1-2% fee'
    ],
    selfCheckQuestions: [
      { question: 'What happens to interest when closing a deposit early?', hint: 'Check the terms of your current deposit' },
      { question: 'How much of returns do bank product fees "eat up"?', hint: 'Usually 0.5-3% depending on the product' }
    ],
    resources: [
      { title: 'Checklist: What to Look for in Contracts', url: '/education/basic' }
    ],
    thumbnail: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop',
    relatedForumTopics: ['bank-fees-analysis'],
    publishedAt: '2024-11-28'
  },
  {
    id: 'etf-basics',
    title: 'ETF for Beginners: Alternative to Banking Products',
    category: 'education',
    tags: ['ETF', 'portfolio', 'bank alternatives'],
    level: 'beginner',
    format: 'lecture',
    duration: '45 min',
    description: 'Introductory guide to ETFs: what exchange‑traded funds are, how they are structured, how to choose broad market funds, and what risks and returns to expect. The video compares ETFs with traditional banking instruments and actively managed products.',
    keyTakeaways: [
      'Index ETFs historically yield 7-10% annually in the long term',
      'Diversification through a single ETF reduces risks compared to individual stocks',
      'ETF fees (0.03-0.5%) are significantly lower than bank actively managed fund fees (1-3%)',
      'ETF liquidity is higher: can be sold at any time without losing accumulated returns'
    ],
    selfCheckQuestions: [
      { question: 'What is the average historical return of the S&P 500 index?', hint: 'About 10% annually before inflation' },
      { question: 'Why are ETFs often more profitable than bank investment products?', hint: 'Compare fees and transparency' }
    ],
    resources: [
      { title: 'List of Popular ETFs', url: '/markets/currencies' },
      { title: 'ETF Return Calculator', url: '/tools/etf-calculator' }
    ],
    thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop',
    relatedForumTopics: ['etf-discussion', 'passive-investing'],
    publishedAt: '2024-11-25',
    // YouTube: ETF basics (educational video)
    // https://www.youtube.com/watch?v=DPsUntwGIAg&t=255s&pp=ygUKRVRGIGJhc2ljcw%3D%3D
    videoUrl: 'https://www.youtube.com/embed/DPsUntwGIAg?start=255'
  },
  {
    id: 'technical-analysis-intro',
    title: 'Technical Analysis Fundamentals',
    category: 'analysis',
    tags: ['technical analysis', 'stocks', 'charts'],
    level: 'intermediate',
    format: 'lecture',
    duration: '52 min',
    description: 'Learn key patterns, indicators, and technical analysis methods for making trading decisions.',
    keyTakeaways: [
      'Support and resistance levels are the foundation of technical analysis',
      'Trading volume confirms or refutes price movements',
      'Moving averages help identify trends',
      'Technical analysis works better on liquid markets'
    ],
    selfCheckQuestions: [
      { question: 'What is a support level?', hint: 'Price level where buyers become active' },
      { question: 'How does volume confirm a level breakout?', hint: 'High volume = strong signal' }
    ],
    resources: [
      { title: 'Technical Analysis Terms Glossary', url: '/education/advanced' }
    ],
    thumbnail: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=600&h=400&fit=crop',
    relatedForumTopics: ['technical-analysis'],
    publishedAt: '2024-11-20'
  },
  {
    id: 'fundamental-analysis',
    title: 'Fundamental Company Analysis',
    category: 'analysis',
    tags: ['fundamental analysis', 'stocks', 'financial statements'],
    level: 'intermediate',
    format: 'lecture',
    duration: '58 min',
    description: 'How to read financial statements, evaluate companies, and find undervalued stocks.',
    keyTakeaways: [
      'P/E ratio shows how much you pay for each dollar of profit',
      'ROE reflects the efficiency of capital use by the company',
      'Free cash flow is a key metric for business valuation',
      'Compare metrics with competitors and industry averages'
    ],
    selfCheckQuestions: [
      { question: 'What does P/E = 15 mean?', hint: 'Stock price = 15 annual profits' },
      { question: 'Why is free cash flow important?', hint: 'These are real dollars the company can distribute' }
    ],
    resources: [
      { title: 'Company Analysis Template', url: '/education/advanced' }
    ],
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    relatedForumTopics: ['fundamental-analysis', 'stock-picks'],
    publishedAt: '2024-11-15'
  },
  {
    id: 'portfolio-construction',
    title: 'Building an Investment Portfolio',
    category: 'strategy',
    tags: ['portfolio', 'diversification', 'risk management'],
    level: 'intermediate',
    format: 'lecture',
    duration: '48 min',
    description: 'Principles of building a balanced portfolio considering your goals, time horizon, and risk tolerance.',
    keyTakeaways: [
      'Diversification across asset classes reduces volatility without significant loss of returns',
      'Young investors can afford a more aggressive portfolio (80% stocks, 20% bonds)',
      'Annual rebalancing maintains target asset allocation',
      'A conservative ETF portfolio outperforms most bank investment products'
    ],
    selfCheckQuestions: [
      { question: 'What asset allocation suits a 20+ year horizon?', hint: 'More stocks, fewer bonds' },
      { question: 'Why is portfolio rebalancing needed?', hint: 'Maintaining target risk/return ratio' }
    ],
    resources: [
      { title: 'Asset Allocation Calculator', url: '/tools/asset-allocation' }
    ],
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    relatedForumTopics: ['portfolio-discussion'],
    publishedAt: '2024-11-10'
  },
  {
    id: 'dividend-investing',
    title: 'Dividend Investing',
    category: 'strategy',
    tags: ['dividends', 'passive income', 'stocks'],
    level: 'beginner',
    format: 'lecture',
    duration: '38 min',
    description: 'How to build a portfolio of dividend stocks for regular passive income.',
    keyTakeaways: [
      'Dividend yield of 3-5% is a reasonable range for stable companies',
      'Dividend reinvestment accelerates capital growth (compound interest effect)',
      'Dividend stocks are historically less volatile than growth stocks',
      'Compare: 4% dividends + 3% growth = 7% vs 6% deposit (minus inflation = 0-1%)'
    ],
    selfCheckQuestions: [
      { question: 'What dividend yield is considered suspiciously high?', hint: 'Above 8-10% — a signal to check sustainability' },
      { question: 'How does reinvestment affect long-term results?', hint: 'Compound interest effect' }
    ],
    resources: [
      { title: 'List of Dividend Aristocrats', url: '/companies' }
    ],
    thumbnail: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&h=400&fit=crop',
    relatedForumTopics: ['dividend-stocks'],
    publishedAt: '2024-11-05'
  },
  {
    id: 'risk-management',
    title: 'Risk Management for Individual Investors',
    category: 'strategy',
    tags: ['risk management', 'portfolio', 'stop losses'],
    level: 'intermediate',
    format: 'lecture',
    duration: '42 min',
    description: 'Practical risk management methods: from diversification to stop losses.',
    keyTakeaways: [
      'Don\'t invest more than 5% of portfolio in one position',
      'Determine maximum acceptable drawdown BEFORE entering a position',
      'Risk management is more important than choosing "right" stocks',
      'Banking products don\'t protect against inflation risk — that\'s also a risk!'
    ],
    selfCheckQuestions: [
      { question: 'What percentage of portfolio can be risked in one trade?', hint: 'Usually recommend 1-2%' },
      { question: 'What is inflation risk?', hint: 'Loss of purchasing power of money' }
    ],
    resources: [
      { title: 'Position Size Calculator', url: '/tools/position-size' }
    ],
    thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop',
    relatedForumTopics: ['risk-management'],
    publishedAt: '2024-10-30'
  },
  {
    id: 'how-banks-use-your-money',
    title: 'How Banks Use Depositor Money',
    category: 'banking-reality',
    tags: ['bank deposits', 'banking system', 'real returns'],
    level: 'beginner',
    format: 'analysis',
    duration: '35 min',
    description: 'We explain the bank business model: why they can pay you 6% while issuing loans at 15-25%.',
    keyTakeaways: [
      'A bank is an intermediary between depositors and borrowers, earning on the margin',
      'Your $100,000 deposit can be loaned out at a rate 2-3 times higher',
      'Fractional reserve means the bank keeps only 10-20% of deposits in reserve',
      'Direct investing removes the intermediary and their margin'
    ],
    selfCheckQuestions: [
      { question: 'What margin does a bank earn on the rate spread?', hint: 'Usually 5-15% depending on the product' },
      { question: 'Why can banks offer a "guaranteed" rate?', hint: 'They earn significantly more on loans' }
    ],
    resources: [
      { title: 'Article: Deposit Alternatives', url: '/education/basic' }
    ],
    thumbnail: 'https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?w=600&h=400&fit=crop',
    relatedForumTopics: ['banking-system'],
    publishedAt: '2024-10-25'
  },
  {
    id: 'crypto-basics',
    title: 'Introduction to Cryptocurrencies',
    category: 'markets',
    tags: ['cryptocurrency', 'bitcoin', 'blockchain'],
    level: 'beginner',
    format: 'lecture',
    duration: '55 min',
    description: 'Cryptocurrency market basics: technology, risks, opportunities, and place in an investment portfolio.',
    keyTakeaways: [
      'Cryptocurrencies are a high-risk asset with high volatility',
      'Recommended portfolio allocation: 1-5% for moderate investors',
      'Bitcoin as "digital gold" — inflation hedge for some investors',
      'Regulatory risks remain significant'
    ],
    selfCheckQuestions: [
      { question: 'What percentage of portfolio is recommended for cryptocurrencies?', hint: '1-5% for moderate risk' },
      { question: 'What is the main risk of cryptocurrencies?', hint: 'High volatility and regulatory uncertainty' }
    ],
    resources: [
      { title: 'Cryptocurrency Market', url: '/markets/crypto' }
    ],
    thumbnail: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=600&h=400&fit=crop',
    relatedForumTopics: ['crypto-discussion'],
    publishedAt: '2024-10-20'
  },
  {
    id: 'bonds-vs-deposits',
    title: 'Bonds vs Bank Deposits',
    category: 'banking-reality',
    tags: ['bonds', 'bank deposits', 'comparison'],
    level: 'beginner',
    format: 'analysis',
    duration: '40 min',
    description: 'Detailed comparison of government and corporate bonds with bank deposits.',
    keyTakeaways: [
      'Government bonds offer comparable returns to deposits, but with tax benefits',
      'Corporate bonds from reliable issuers are often 1-3% more profitable than deposits',
      'Bonds can be sold on the secondary market without losing accumulated income',
      'Bond ETFs provide diversification and liquidity'
    ],
    selfCheckQuestions: [
      { question: 'What liquidity advantage do bonds have over deposits?', hint: 'Can be sold without losing accumulated coupon' },
      { question: 'What are government bonds?', hint: 'Government-issued debt securities' }
    ],
    resources: [
      { title: 'Bond Yield Calculator', url: '/tools/bond-calculator' }
    ],
    thumbnail: 'https://images.unsplash.com/photo-1565372195458-9de0b320ef04?w=600&h=400&fit=crop',
    relatedForumTopics: ['bonds-vs-deposits'],
    publishedAt: '2024-10-15'
  },
  {
    id: 'market-psychology',
    title: 'Market and Investor Psychology',
    category: 'education',
    tags: ['psychology', 'emotions', 'discipline'],
    level: 'intermediate',
    format: 'lecture',
    duration: '46 min',
    description: 'Cognitive biases affecting investment decisions and how to combat them.',
    keyTakeaways: [
      'FOMO (Fear Of Missing Out) — cause of buying at peaks',
      'Anchoring effect makes you hold losing positions',
      'Systematic approach beats emotional investing',
      'Banks exploit cognitive biases in marketing ("guaranteed returns")'
    ],
    selfCheckQuestions: [
      { question: 'What is FOMO in the context of investing?', hint: 'Fear Of Missing Out — fear of missing an opportunity' },
      { question: 'How do banks use the word "guaranteed"?', hint: 'Create false sense of security, hiding inflation risk' }
    ],
    resources: [
      { title: 'Book: Thinking, Fast and Slow', url: '#' }
    ],
    thumbnail: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=600&h=400&fit=crop',
    relatedForumTopics: ['psychology'],
    publishedAt: '2024-10-10'
  }
];
