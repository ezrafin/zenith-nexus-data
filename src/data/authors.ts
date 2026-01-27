export interface AuthorProfile {
  id: string;
  username: string | null;
  display_name: string;
  avatar_url: string | null;
  bio: string;
  reputation: number;
  post_count: number;
  comment_count: number;
}

export const authors: AuthorProfile[] = [
  {
    id: 'christina-summerbell',
    username: 'christina_summerbell',
    display_name: 'Christina Summerbell',
    avatar_url:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
    bio: 'Senior market analyst with 15+ years of experience in equity research and portfolio management, specializing in technology and growth stocks.',
    reputation: 2450,
    post_count: 94,
    comment_count: 892,
  },
  {
    id: 'assunta-novak',
    username: 'assunta_novak',
    display_name: 'Assunta Novak',
    avatar_url:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face',
    bio: 'Cryptocurrency and blockchain researcher covering digital assets and market structure since 2015.',
    reputation: 1890,
    post_count: 24,
    comment_count: 567,
  },
  {
    id: 'lysander-truog',
    username: 'lysander_truog',
    display_name: 'Lysander Truog',
    avatar_url:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face',
    bio: 'Fixed income specialist covering bond markets and interest rate dynamics for long-term investors.',
    reputation: 1320,
    post_count: 61,
    comment_count: 410,
  },
  {
    id: 'elias-wolfenstein',
    username: 'elias_wolfenstein',
    display_name: 'Elias Wolfenstein',
    avatar_url:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    bio: 'European markets strategist specializing in cross-border M&A analysis and regional economic trends across the EU.',
    reputation: 2180,
    post_count: 16,
    comment_count: 678,
  },
  {
    id: 'anastasia-petrova',
    username: 'anastasia_petrova',
    display_name: 'Anastasia Petrova',
    avatar_url:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
    bio: 'Emerging markets expert with deep knowledge of Eastern European economies and energy sector dynamics.',
    reputation: 1920,
    post_count: 40,
    comment_count: 534,
  },
  {
    id: 'radomir-klosek',
    username: 'radomir_klosek',
    display_name: 'Radomir Kłosek',
    avatar_url:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    bio: 'Polish markets analyst specializing in Central European economies, long-term investment strategies, and financial education for individual investors.',
    reputation: 1850,
    post_count: 27,
    comment_count: 512,
  },
  {
    id: 'isabelle-dubois',
    username: 'isabelle_dubois',
    display_name: 'Isabelle Dubois',
    avatar_url:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop&crop=face',
    bio: 'Sustainable finance advisor and ESG investment specialist with expertise in green bonds and impact investing.',
    reputation: 2010,
    post_count: 113,
    comment_count: 723,
  },
  {
    id: 'xu-meiling',
    username: 'xu_meiling',
    display_name: 'Xu Meiling',
    avatar_url:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face',
    bio: 'Asia-Pacific markets analyst specializing in Chinese equities, technology sector trends, and cross-border investment flows.',
    reputation: 2230,
    post_count: 47,
    comment_count: 845,
  },
];
