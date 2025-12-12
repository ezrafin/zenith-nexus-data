// Mock API functions - replace with real API calls later
import { supabase } from "@/integrations/supabase/client";

// Simulated network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Author avatars mapping
const authorAvatars: Record<string, string> = {
  'Sarah Chen, CFA': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
  'Michael Torres': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  'David Park': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
  'Lisa Wang': 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
  'James Mitchell': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
  'Emily Rodriguez': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
  'Robert Kim': 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face',
  'Anna Kowalski': 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
  'Marcus Johnson': 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop&crop=face',
  'Sofia Martinez': 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face',
  'Alexander Wright': 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face',
  'Catherine Lee': 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face',
  'Thomas Anderson': 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face',
  'Jennifer White': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
  'Daniel Brown': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  'Rachel Green': 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
  'Kevin Zhang': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
  'Amanda Taylor': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
  'Ryan Murphy': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
};

// Category image mapping for analytics articles
const categoryImages: Record<string, string[]> = {
  expert: [
    'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop',
  ],
  markets: [
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop&q=80',
    'https://images.unsplash.com/photo-1559526324-593bc073d938?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
  ],
  longterm: [
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1559526324-593bc073d938?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1504607798333-52a30db54a5d?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
  ],
  technical: [
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1543286386-713bdd548da4?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop&q=80',
    'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
  ],
};

export function getAuthorAvatar(authorName: string): string {
  return authorAvatars[authorName] || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(authorName)}`;
}

// News Types
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

// Analytics Types
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

// Market Types
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

// Company Types
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

// Forum Types
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
}

// Mock News Data
const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'S&P 500 Reaches New All-Time High Amid Tech Rally',
    excerpt: 'Major indices surge as technology stocks lead the market higher, with the S&P 500 breaking through previous resistance levels.',
    content: 'The S&P 500 index reached a new all-time high today...',
    date: '2024-12-04',
    source: 'Market Watch',
    market: 'indices',
  },
];

// Article topics and templates for generation
const articleTemplates: Array<{
  title: string;
  excerpt: string;
  content: string;
  type: 'expert' | 'markets' | 'longterm' | 'technical';
  readTime: string;
  tags?: string[];
  relatedMarkets?: string[];
}> = [
  // Investment & Portfolio topics
  { title: 'ETF Strategies for Long-Term Wealth Building', excerpt: 'Comprehensive guide to building a diversified ETF portfolio that grows over time.', content: `Exchange-traded funds (ETFs) have revolutionized investing by providing low-cost access to diversified portfolios that were once only available to institutional investors. This comprehensive guide explores proven ETF strategies for long-term wealth accumulation, helping you build a portfolio that grows steadily over decades while minimizing costs and complexity.

## Understanding ETFs: The Foundation

ETFs are investment funds that trade on stock exchanges, combining the diversification of mutual funds with the flexibility of individual stocks. Unlike traditional mutual funds, ETFs can be bought and sold throughout the trading day at market prices. They typically track an index, sector, commodity, or other asset class, providing instant diversification with a single purchase.

The primary advantages of ETFs include low expense ratios, tax efficiency, transparency, and liquidity. Most ETFs have expense ratios below 0.50%, significantly lower than actively managed mutual funds. This cost advantage compounds over time, potentially adding tens of thousands of dollars to your portfolio over decades.

## Core-Satellite Strategy: Balancing Stability and Growth

The core-satellite approach is one of the most effective ETF strategies for long-term wealth building. This method allocates the majority of your portfolio (typically 70-80%) to low-cost, broad-market ETFs that form your "core" holdings. These core positions provide stability and market exposure through funds tracking major indices like the S&P 500, total stock market, or international developed markets.

The remaining 20-30% serves as "satellite" positions, allowing you to tilt toward specific sectors, themes, or strategies you believe will outperform. Satellite positions might include technology ETFs, emerging markets, small-cap value stocks, or thematic investments like clean energy or artificial intelligence.

This strategy balances the proven benefits of broad market exposure with the potential for enhanced returns through strategic tilts. The core ensures you capture market returns, while satellites allow for customization based on your risk tolerance and investment thesis.

## Sector Rotation Strategies

Sector rotation involves shifting ETF allocations based on economic cycles and market conditions. Different sectors perform better during various phases of the economic cycle. For example, defensive sectors like utilities and consumer staples typically outperform during economic downturns, while cyclical sectors like technology and industrials excel during expansion phases.

Implementing sector rotation requires understanding economic indicators and market cycles. You can use sector-specific ETFs to overweight sectors expected to outperform while maintaining diversification. However, this strategy requires active management and market timing, which can be challenging for most investors.

A more passive approach involves maintaining consistent sector allocations while periodically rebalancing. This ensures you're not overexposed to any single sector and helps you buy low and sell high through systematic rebalancing.

## The Critical Role of Rebalancing

Rebalancing is essential for maintaining your target asset allocation and risk profile. Over time, winning investments grow to represent a larger portion of your portfolio, increasing your risk exposure. Regular rebalancing forces you to sell high (trimming winners) and buy low (adding to underperformers), which can improve returns over the long term.

The frequency of rebalancing depends on your strategy and tolerance for drift. Some investors rebalance quarterly or annually, while others use threshold-based rebalancing, adjusting when allocations drift more than 5% from targets. Research suggests annual rebalancing often provides the best balance between maintaining targets and minimizing transaction costs and taxes.

## Understanding Expense Ratios and Tracking Error

Expense ratios represent the annual fee charged by ETF providers, expressed as a percentage of assets. A 0.03% expense ratio means you pay $3 annually for every $10,000 invested. While seemingly small, these fees compound over decades. Choosing ETFs with lower expense ratios can save tens of thousands of dollars over an investment lifetime.

Tracking error measures how closely an ETF follows its underlying index. Lower tracking error indicates better index replication. Factors affecting tracking error include expense ratios, sampling methods, dividend reinvestment timing, and fund size. When selecting ETFs, prioritize those with low expense ratios and minimal tracking error.

## Tax Efficiency in ETF Investing

ETFs offer significant tax advantages through their unique structure. The creation and redemption process allows ETF providers to transfer securities in-kind rather than selling them, minimizing capital gains distributions. This structure means you typically only pay taxes when you sell your ETF shares, giving you control over when to realize gains.

Tax-loss harvesting involves selling losing positions to realize losses that offset gains, then reinvesting in similar but not identical ETFs to maintain market exposure. This strategy can reduce your tax burden while keeping your portfolio aligned with your investment goals.

Holding ETFs in tax-advantaged accounts like IRAs or 401(k)s eliminates tax considerations entirely, allowing for more frequent rebalancing and trading without tax consequences.

## Building a Balanced ETF Portfolio

Constructing a balanced ETF portfolio requires considering multiple factors: asset allocation, geographic diversification, market capitalization, and investment style. A well-diversified portfolio might include:

- Broad U.S. stock market exposure (40-50%)
- International developed markets (20-30%)
- Emerging markets (5-10%)
- Bonds for stability (20-30%, decreasing with age)
- Real estate through REIT ETFs (5-10%)
- Commodities for inflation protection (0-5%)

The exact allocation depends on your age, risk tolerance, time horizon, and financial goals. Younger investors can afford higher stock allocations, while those nearing retirement should increase bond exposure for stability.

## Risk Management and Portfolio Construction

Effective risk management in ETF investing involves diversification across asset classes, geographies, and sectors. However, true diversification requires understanding correlations between assets. During market stress, many seemingly different assets can move together, reducing diversification benefits.

Consider your risk capacity (ability to take risk) versus risk tolerance (willingness to take risk). Your risk capacity depends on factors like time horizon, income stability, and financial obligations. Your risk tolerance is psychological and relates to how comfortable you are with volatility.

Regular portfolio reviews help ensure your allocation remains appropriate as your circumstances change. Life events like marriage, children, career changes, or approaching retirement may warrant portfolio adjustments.

## Common Mistakes to Avoid

Many investors make costly mistakes when building ETF portfolios. Over-diversification can lead to unnecessary complexity and higher costs. Holding dozens of ETFs that overlap significantly provides little benefit while complicating management.

Chasing performance by buying last year's top-performing ETFs often leads to buying high and selling low. Past performance doesn't predict future results, and yesterday's winners often become tomorrow's laggards.

Ignoring costs can significantly erode returns over time. While a 0.50% difference in expense ratios seems small, over 30 years it can reduce your final portfolio value by 15% or more.

Failing to rebalance allows portfolios to drift from target allocations, increasing risk over time. Set a rebalancing schedule and stick to it, regardless of market conditions.

## Long-Term Wealth Building Principles

Successful long-term wealth building with ETFs requires discipline, patience, and a focus on factors within your control: costs, diversification, and staying invested. Market timing and stock picking are unreliable, but maintaining a low-cost, diversified portfolio and staying invested through market cycles has historically produced strong returns.

Start early to maximize the power of compounding. Time in the market matters more than timing the market. Regular contributions, even small ones, can grow substantially over decades through compound growth.

Stay the course during market volatility. Market downturns are normal and temporary. Selling during downturns locks in losses and prevents participation in recoveries. A well-constructed ETF portfolio should weather market storms while continuing to grow over the long term.

## Conclusion

Building long-term wealth with ETFs requires understanding their structure, implementing sound strategies like core-satellite allocation, maintaining discipline through rebalancing, and focusing on low costs and broad diversification. By following these principles and avoiding common mistakes, you can construct a portfolio that grows steadily over decades while minimizing complexity and costs. The key is starting early, staying invested, and letting time and compounding work in your favor.`, type: 'longterm', readTime: '14 min', tags: ['ETF', 'Portfolio', 'Diversification'], relatedMarkets: ['indices', 'stocks'] },
  { title: 'Dividend Investing: Building Passive Income Streams', excerpt: 'How to identify and invest in quality dividend-paying stocks for steady income.', content: `Dividend investing remains one of the most reliable strategies for generating passive income and building long-term wealth. Unlike growth stocks that rely solely on price appreciation, dividend-paying stocks provide regular income payments while still offering potential for capital gains. This comprehensive guide explores how to identify high-quality dividend stocks, construct a dividend-focused portfolio, and maximize the power of dividend reinvestment.

## The Fundamentals of Dividend Investing

Dividends are cash payments that companies distribute to shareholders from their profits. Not all companies pay dividends; those that do typically represent mature, profitable businesses with stable cash flows. Dividend investing appeals to investors seeking regular income, those in or approaching retirement, and anyone looking to build wealth through the power of compounding.

Dividend yield, calculated as annual dividends per share divided by stock price, shows the income return on your investment. However, high yield alone doesn't indicate a good investment. A company with a 10% yield might be in financial distress, while a 2% yield from a growing company could provide better total returns over time.

## Dividend Yield vs. Dividend Growth

Understanding the difference between dividend yield and dividend growth is crucial for successful dividend investing. High-yield stocks provide immediate income but may offer limited growth potential. These companies often operate in mature industries with slow growth, paying out most of their earnings as dividends.

Dividend growth stocks, on the other hand, may start with lower yields but increase their dividend payments over time. Companies like those in the Dividend Aristocrats index have increased dividends for 25+ consecutive years. While their current yield might be modest, the growing dividend payments can eventually exceed what you'd receive from high-yield stocks, especially when combined with price appreciation.

The best dividend strategy often combines both approaches: core holdings in reliable high-yield stocks for immediate income, supplemented by dividend growth stocks for long-term wealth building. This balanced approach provides current income while positioning your portfolio for future growth.

## Identifying High-Quality Dividend Stocks

Evaluating dividend sustainability is critical when selecting dividend stocks. Several key metrics help identify companies capable of maintaining and growing their dividends:

**Payout Ratio**: This measures the percentage of earnings paid as dividends. A payout ratio below 60% generally indicates a company has room to maintain dividends during tough times and potentially increase them. Ratios above 80% suggest the dividend might be at risk if earnings decline.

**Free Cash Flow**: Companies need strong cash flow to sustain dividends. Free cash flow (operating cash flow minus capital expenditures) shows how much cash a company generates after maintaining its business. Positive and growing free cash flow supports dividend sustainability.

**Debt Levels**: Excessive debt can threaten dividend payments, especially during economic downturns. Review debt-to-equity ratios and interest coverage ratios to assess financial health. Companies with manageable debt levels are better positioned to maintain dividends.

**Business Model Stability**: Companies in defensive industries like utilities, consumer staples, and healthcare tend to have more stable earnings and reliable dividends. These sectors provide essential services that remain in demand regardless of economic conditions.

**Dividend History**: A long track record of consistent or growing dividends indicates management's commitment to shareholder returns. Look for companies with at least 5-10 years of dividend payments, preferably with a history of increases.

## Constructing a Dividend-Focused Portfolio

Building a dividend portfolio requires diversification across sectors, company sizes, and geographic regions. Concentrating in a single sector or company exposes you to significant risk if that industry faces challenges.

A well-diversified dividend portfolio might include:

- **Consumer Staples** (20-25%): Companies selling essential products that maintain demand during economic downturns
- **Utilities** (15-20%): Regulated businesses with stable cash flows and high dividend yields
- **Healthcare** (15-20%): Aging demographics support long-term growth in this defensive sector
- **Financials** (10-15%): Banks and insurance companies often pay substantial dividends
- **Real Estate (REITs)** (10-15%): Required to distribute most income as dividends, providing high yields
- **Energy** (5-10%): Can be volatile but often offers high yields
- **Technology** (5-10%): Many tech companies now pay dividends as they mature

Geographic diversification is equally important. International dividend stocks can provide exposure to different economic cycles and currency diversification. Many foreign markets offer higher dividend yields than U.S. markets, though currency risk and different tax treatments require consideration.

## The Power of Dividend Reinvestment

Dividend reinvestment is one of the most powerful wealth-building tools available to investors. Instead of taking dividend payments as cash, reinvesting them to purchase additional shares compounds your returns over time. This strategy, often called DRIP (Dividend Reinvestment Plan), allows you to buy more shares without additional capital.

The compounding effect becomes dramatic over long periods. For example, a $10,000 investment in a stock with a 4% dividend yield, reinvested annually, could grow to over $70,000 in 30 years (assuming 8% total annual return). Without reinvestment, you'd have the original $10,000 plus $12,000 in dividends, totaling just $22,000.

Many companies and brokerages offer automatic dividend reinvestment programs, making this strategy easy to implement. Some programs even offer discounts on share purchases or waive fees, further enhancing returns.

## Tax Considerations in Dividend Investing

Understanding dividend taxation is important for maximizing after-tax returns. Qualified dividends from U.S. companies are taxed at favorable long-term capital gains rates (0%, 15%, or 20% depending on income), rather than ordinary income rates that can reach 37%.

To qualify for these lower rates, you must hold the stock for more than 60 days during the 121-day period surrounding the ex-dividend date. This holding period requirement means dividend investors should plan for longer holding periods, which aligns with the buy-and-hold nature of dividend investing.

Non-qualified dividends, including those from REITs and many foreign companies, are taxed as ordinary income. Holding dividend stocks in tax-advantaged accounts like IRAs eliminates tax considerations and allows for more flexible trading.

## Dividend ETFs vs. Individual Stocks

Investors can access dividend investing through individual stocks or dividend-focused ETFs. Each approach has advantages:

**Individual Stocks**: Provide control over specific holdings, potential for higher yields, and the ability to avoid companies you don't want to own. However, they require more research, time, and carry higher risk from lack of diversification.

**Dividend ETFs**: Offer instant diversification, professional management, and lower individual stock risk. Popular options include funds tracking the Dividend Aristocrats, high-dividend yield indices, or dividend growth strategies. ETFs simplify portfolio management but may have slightly lower yields due to fees and broader diversification.

Many investors combine both approaches: using ETFs for core diversification while holding individual dividend stocks for specific opportunities or higher yields in areas of expertise.

## Common Dividend Investing Mistakes

Several mistakes can undermine dividend investing success:

**Chasing Yield**: The highest-yielding stocks often carry the highest risk. Companies with unsustainable payout ratios or declining businesses may cut dividends, causing both income loss and price declines.

**Ignoring Total Return**: Focusing solely on dividend yield ignores capital appreciation potential. A stock with a 3% yield and 8% annual price growth provides better total returns than a 6% yield with no growth.

**Lack of Diversification**: Concentrating in dividend stocks from a single sector or company creates unnecessary risk. Even reliable dividend payers can cut or eliminate dividends during severe downturns.

**Reinvesting Without Strategy**: Automatic dividend reinvestment is powerful, but periodically reviewing your portfolio ensures reinvestment aligns with your target allocation and doesn't create overconcentration.

**Ignoring Company Fundamentals**: A history of dividend payments doesn't guarantee future payments. Regularly review company financials, competitive position, and industry trends to ensure dividend sustainability.

## Building Long-Term Wealth Through Dividends

Successful dividend investing requires patience, discipline, and a long-term perspective. The strategy works best when you reinvest dividends, hold positions for years or decades, and focus on companies with sustainable business models and growing dividends.

Start with a solid foundation of reliable dividend payers, then gradually add dividend growth stocks as your portfolio matures. Regular contributions, combined with dividend reinvestment, can build substantial wealth over time. The key is staying invested through market cycles, trusting in the power of compounding, and maintaining a diversified portfolio of quality companies.

Remember that dividend investing is a marathon, not a sprint. The real power of dividends reveals itself over decades as reinvested dividends purchase more shares, which generate more dividends, creating a compounding cycle that can significantly grow your wealth.`, type: 'longterm', readTime: '12 min', tags: ['Dividends', 'Income', 'Stocks'] },
  { title: 'Portfolio Diversification: Beyond Stocks and Bonds', excerpt: 'Exploring alternative assets and strategies to reduce portfolio risk and enhance returns.', content: `True portfolio diversification goes far beyond the traditional 60/40 stock-bond split that has dominated investment advice for decades. While stocks and bonds form a solid foundation, incorporating alternative asset classes can reduce portfolio risk, enhance returns, and provide protection during different economic environments. This comprehensive analysis explores alternative investments, correlation patterns, and practical strategies for building a truly diversified portfolio.

## The Limitations of Traditional Diversification

The classic 60/40 portfolio (60% stocks, 40% bonds) has served investors well for generations, but it has significant limitations. During market stress, correlations between stocks and bonds can increase, reducing diversification benefits. Both asset classes can decline simultaneously during periods of high inflation or economic uncertainty.

Traditional diversification also misses entire categories of investments that offer different risk-return profiles and respond differently to economic conditions. By limiting yourself to stocks and bonds, you're missing opportunities to reduce risk and potentially enhance returns through alternative asset classes.

Modern portfolio theory suggests that adding uncorrelated or negatively correlated assets can improve risk-adjusted returns. This means your portfolio can achieve the same returns with less risk, or higher returns with the same risk level, simply by including assets that don't move in lockstep with stocks and bonds.

## Real Estate Investment Trusts (REITs)

REITs offer exposure to real estate markets without the challenges of direct property ownership. These companies own and operate income-producing real estate, from office buildings and shopping centers to apartments and warehouses. REITs must distribute at least 90% of taxable income as dividends, providing attractive yields often ranging from 3-6%.

Real estate has historically shown low correlation with stocks and bonds, making REITs valuable diversification tools. During periods of inflation, real estate values and rental income often increase, providing a hedge against purchasing power erosion. REITs also offer liquidity that direct real estate ownership lacks—you can buy and sell shares instantly rather than waiting months to complete a property transaction.

Different REIT categories serve different purposes:

- **Equity REITs** own properties and generate income from rents
- **Mortgage REITs** invest in real estate debt and earn interest income
- **Specialty REITs** focus on specific property types like data centers, cell towers, or healthcare facilities

Allocating 5-15% of your portfolio to REITs can provide diversification benefits, though be aware that REITs can be volatile and sensitive to interest rate changes.

## Commodities: Inflation Protection and Diversification

Commodities include physical assets like gold, silver, oil, natural gas, agricultural products, and industrial metals. These assets often perform well during inflationary periods when the purchasing power of currency declines. Commodities also tend to have low or negative correlation with stocks and bonds, making them powerful diversification tools.

Gold, in particular, has served as a store of value for thousands of years and often performs well during economic uncertainty, currency devaluation, and geopolitical tensions. While gold doesn't generate income like stocks or bonds, it can preserve wealth during crises.

Energy commodities like oil and natural gas are essential to the global economy and can provide returns that don't correlate directly with stock market movements. However, commodity prices can be highly volatile and subject to supply and demand shocks.

Investors can access commodities through:

- **Commodity ETFs**: Track commodity indices or hold physical commodities
- **Commodity futures**: More complex but offer direct exposure
- **Commodity stocks**: Mining, energy, and agricultural companies (though these correlate more with stocks)

A 5-10% allocation to commodities can provide inflation protection and diversification, though higher allocations may increase portfolio volatility.

## International Equities: Geographic Diversification

International stocks offer exposure to different economic cycles, currencies, and growth opportunities. While U.S. markets have performed exceptionally well in recent decades, international diversification can reduce risk and provide access to faster-growing economies.

**Developed International Markets**: Countries like Japan, the United Kingdom, Germany, and France offer mature markets with established companies. These markets often have different sector compositions than the U.S. market—for example, European markets have higher exposure to financials and industrials.

**Emerging Markets**: Countries like China, India, Brazil, and South Korea offer higher growth potential but also higher risk. Emerging markets can experience significant volatility due to political instability, currency fluctuations, and less developed financial systems. However, they also provide access to rapidly growing middle classes and expanding economies.

Currency exposure is an important consideration with international investments. A strengthening U.S. dollar can reduce returns from international stocks, while a weakening dollar can enhance them. Some investors hedge currency exposure, while others accept it as additional diversification.

Allocating 20-40% of equity holdings to international markets can provide meaningful diversification benefits, though the exact allocation depends on your risk tolerance and views on global economic growth.

## Emerging Market Bonds

While emerging market stocks get most of the attention, emerging market bonds offer another diversification avenue. These bonds, issued by governments and corporations in developing countries, typically offer higher yields than developed market bonds to compensate for additional risk.

Emerging market bonds can provide diversification because their performance often depends on different factors than developed market bonds. Currency movements, commodity prices, and local economic conditions drive returns more than U.S. interest rates.

However, emerging market bonds carry significant risks including currency risk, default risk, and political instability. These bonds can experience sharp declines during global risk-off periods, even if they're uncorrelated during normal times.

A small allocation (5-10% of fixed income) to emerging market bonds can enhance diversification, but most investors should keep the majority of their bond allocation in high-quality developed market bonds.

## Alternative Investment Strategies

Beyond traditional asset classes, several alternative strategies can further diversify portfolios:

**Infrastructure**: Investments in essential infrastructure like toll roads, airports, and utilities. Infrastructure assets often have stable, inflation-linked cash flows and low correlation with traditional assets.

**Private Equity**: Investments in private companies, though these are typically only accessible to accredited investors through private funds. Private equity can provide exposure to companies not available in public markets.

**Hedge Funds**: Various strategies including long-short equity, market neutral, and managed futures. These strategies aim to generate returns uncorrelated with traditional markets, though fees are typically high and access is limited.

**Cryptocurrency**: A newer asset class with extreme volatility but potential diversification benefits. Cryptocurrencies have shown low correlation with traditional assets, though regulatory uncertainty and volatility make them suitable only for risk-tolerant investors.

Most individual investors should focus on publicly traded alternatives like REITs, commodities, and international securities rather than private investments that require large minimums and have limited liquidity.

## Understanding Correlation and Its Limitations

Correlation measures how assets move relative to each other. A correlation of +1.0 means assets move perfectly together, while -1.0 means they move in opposite directions. A correlation near zero indicates independent movement.

However, correlations aren't static—they change over time and can break down during market stress. Assets that appear uncorrelated during normal times may move together during crises, reducing diversification benefits when you need them most.

This correlation breakdown is why diversification doesn't eliminate risk—it reduces it. During severe market downturns, most risky assets decline together, though to varying degrees. Diversification helps, but it's not a guarantee against losses.

Regular portfolio reviews should include correlation analysis to ensure your diversification strategy remains effective. Rebalancing helps maintain target allocations and can improve returns by forcing you to buy low and sell high.

## Building a Diversified Portfolio

Constructing a truly diversified portfolio requires balancing multiple factors:

**Risk Tolerance**: More aggressive investors can allocate more to alternatives and emerging markets, while conservative investors should emphasize bonds and developed market stocks.

**Time Horizon**: Longer time horizons allow for more aggressive allocations and can better weather the volatility of alternative assets.

**Investment Knowledge**: Only invest in assets you understand. Complex alternatives may offer diversification but can introduce unexpected risks.

**Cost Considerations**: Many alternative investments have higher fees that can erode returns. Ensure the diversification benefits justify the additional costs.

A sample diversified portfolio might include:

- U.S. Stocks: 35-40%
- International Developed Stocks: 15-20%
- Emerging Market Stocks: 5-10%
- U.S. Bonds: 20-25%
- International Bonds: 5-10%
- REITs: 5-10%
- Commodities: 5-10%

This allocation provides exposure across multiple asset classes, geographies, and economic drivers while maintaining reasonable costs and complexity.

## Rebalancing and Maintenance

Diversification requires ongoing maintenance. As different assets perform differently, your portfolio will drift from target allocations. Rebalancing—selling winners and buying underperformers—maintains your diversification strategy and can improve returns.

Rebalancing frequency depends on your strategy. Some investors rebalance quarterly or annually, while others use threshold-based rebalancing, adjusting when allocations drift more than 5% from targets. More frequent rebalancing maintains targets better but increases transaction costs and potential tax consequences.

Consider tax implications when rebalancing. Selling winners in taxable accounts triggers capital gains taxes. Rebalancing within tax-advantaged accounts avoids this issue, making IRAs and 401(k)s ideal for maintaining diversification.

## Common Diversification Mistakes

Several mistakes can undermine diversification efforts:

**Over-Diversification**: Holding too many similar assets provides little benefit while increasing complexity. Twenty technology stocks aren't meaningfully more diversified than five.

**Correlation Confusion**: Assuming assets are uncorrelated without verifying. Many "alternative" investments actually correlate highly with stocks during market stress.

**Ignoring Costs**: High fees on alternative investments can eliminate diversification benefits. Ensure the risk reduction justifies the additional costs.

**Home Bias**: Overweighting domestic investments due to familiarity. International diversification is crucial for reducing country-specific risk.

**Set-and-Forget Mentality**: Diversification requires maintenance. Regular reviews and rebalancing ensure your strategy remains effective.

## Conclusion

True portfolio diversification extends well beyond traditional stock-bond allocations. By incorporating REITs, commodities, international securities, and other alternative assets, investors can reduce risk, enhance returns, and protect against various economic environments. However, effective diversification requires understanding correlations, managing costs, and maintaining discipline through regular rebalancing.

The key is building a portfolio that balances diversification benefits with complexity and cost. Most investors can achieve meaningful diversification through publicly traded alternatives like REITs, commodity ETFs, and international stock and bond funds. Start with a solid foundation of stocks and bonds, then gradually add alternative assets as you become comfortable with them.

Remember that diversification is a tool for managing risk, not eliminating it. Even well-diversified portfolios can decline during severe market downturns. However, proper diversification can help you weather storms better and position your portfolio for long-term success across various economic conditions.`, type: 'expert', readTime: '16 min', tags: ['Diversification', 'Portfolio', 'Risk Management'] },
  { title: 'Active vs Passive Management: Which Strategy Wins?', excerpt: 'Comparing active and passive investment approaches with data-driven analysis.', content: 'The debate between active and passive management continues to divide investors. This data-driven analysis examines performance metrics, fee structures, and when each approach makes sense. We review academic research on fund manager performance, the impact of fees on long-term returns, and market conditions that favor active management. Case studies illustrate successful active strategies while highlighting the consistent benefits of low-cost index funds for most investors.', type: 'expert', readTime: '15 min', tags: ['Active Management', 'Passive Investing', 'Strategy'] },
  { title: 'Broker Comparison: Finding the Right Platform for Your Needs', excerpt: 'Detailed comparison of major brokerage platforms, fees, and features.', content: 'Choosing the right brokerage platform is crucial for successful investing. This comprehensive comparison examines major brokers across key dimensions: commission structures, account minimums, trading tools, research resources, and customer service. We analyze platforms for different investor types—from beginners seeking simplicity to active traders needing advanced features. The article includes fee calculators and helps readers identify which broker best matches their investment style and goals.', type: 'expert', readTime: '13 min', tags: ['Brokers', 'Comparison', 'Tools'] },
  
  // Market Analysis topics
  { title: 'Technical Analysis: Chart Patterns and Indicators', excerpt: 'Mastering technical analysis tools to identify trading opportunities.', content: 'Technical analysis provides traders with tools to identify potential entry and exit points based on price action and volume. This guide covers essential chart patterns including head and shoulders, triangles, and flags. We explore key technical indicators like moving averages, RSI, MACD, and Bollinger Bands. Practical examples demonstrate how to combine multiple indicators for more reliable signals. The article also addresses common pitfalls and how to use technical analysis alongside fundamental analysis.', type: 'technical', readTime: '11 min', tags: ['Technical Analysis', 'Trading', 'Charts'] },
  { title: 'Fundamental Analysis: Evaluating Company Financials', excerpt: 'How to read financial statements and assess company valuation.', content: 'Fundamental analysis is the cornerstone of value investing. This comprehensive guide teaches investors how to read and interpret financial statements, including balance sheets, income statements, and cash flow statements. We explore key financial ratios such as P/E, P/B, debt-to-equity, and return on equity. The article explains how to assess a company\'s competitive position, management quality, and growth prospects. Real-world examples illustrate how fundamental analysis helps identify undervalued stocks.', type: 'expert', readTime: '17 min', tags: ['Fundamental Analysis', 'Valuation', 'Financials'] },
  { title: 'Macroeconomic Trends: Impact on Investment Decisions', excerpt: 'Understanding how economic indicators influence market movements and portfolio strategy.', content: 'Macroeconomic factors significantly influence investment returns across all asset classes. This analysis explores key economic indicators including GDP growth, inflation rates, unemployment, and central bank policies. We examine how different economic environments affect stocks, bonds, commodities, and currencies. The article provides frameworks for adjusting portfolio allocation based on economic cycles and helps investors understand the relationship between macro trends and individual security selection.', type: 'markets', readTime: '14 min', tags: ['Macroeconomics', 'Economic Indicators', 'Strategy'] },
  { title: 'Volatility Trading: Options Strategies for Uncertain Markets', excerpt: 'Advanced options strategies to profit from market volatility.', content: 'Volatility trading offers sophisticated investors opportunities to profit from market uncertainty. This guide explores options strategies including straddles, strangles, iron condors, and butterfly spreads. We explain how to assess implied volatility, use the VIX index, and construct positions that profit from both high and low volatility environments. Risk management techniques help traders protect capital while maximizing returns from volatility-based strategies.', type: 'technical', readTime: '13 min', tags: ['Options', 'Volatility', 'Trading'] },
  { title: 'Sector Rotation: Timing Market Cycles', excerpt: 'How to identify and capitalize on sector rotation patterns.', content: 'Sector rotation occurs as different industries outperform during various phases of the economic cycle. This analysis examines historical patterns of sector performance and how to identify rotation signals. We explore defensive sectors like utilities and consumer staples versus cyclical sectors like technology and industrials. The article provides frameworks for adjusting sector allocation based on economic indicators and market conditions.', type: 'markets', readTime: '12 min', tags: ['Sector Analysis', 'Market Cycles', 'Strategy'] },
  
  // Financial Planning topics
  { title: 'Retirement Planning: Building a Secure Financial Future', excerpt: 'Comprehensive guide to retirement savings strategies and account types.', content: 'Retirement planning requires a long-term perspective and disciplined approach. This comprehensive guide covers retirement account types including 401(k)s, IRAs, Roth accounts, and their tax implications. We explore contribution limits, employer matching, and how to maximize retirement savings. The article addresses asset allocation for different life stages, withdrawal strategies, and how to estimate retirement needs. Real-world scenarios help readers create personalized retirement plans.', type: 'longterm', readTime: '16 min', tags: ['Retirement', 'Planning', 'Tax Strategy'] },
  { title: 'Tax-Efficient Investing Strategies', excerpt: 'Minimizing tax impact on investment returns through smart strategies.', content: 'Tax efficiency can significantly impact long-term investment returns. This guide explores tax-advantaged accounts, tax-loss harvesting, and asset location strategies. We examine how different investment types are taxed and when to realize gains or losses. The article covers qualified dividends, long-term capital gains rates, and how to structure portfolios to minimize tax drag. Practical examples demonstrate how tax-efficient investing can add substantial value over decades.', type: 'expert', readTime: '14 min', tags: ['Taxes', 'Strategy', 'Optimization'] },
  { title: 'Risk Management: Protecting Your Portfolio', excerpt: 'Essential risk management techniques for preserving capital.', content: 'Effective risk management is crucial for long-term investment success. This comprehensive guide covers position sizing, stop-loss orders, and portfolio hedging strategies. We explore different types of risk including market risk, credit risk, and liquidity risk. The article explains how to use diversification, asset allocation, and derivatives to manage portfolio risk. Case studies illustrate how proper risk management helps investors weather market downturns and preserve capital.', type: 'expert', readTime: '15 min', tags: ['Risk Management', 'Portfolio', 'Protection'] },
  { title: 'Goal-Based Investing: Aligning Investments with Life Goals', excerpt: 'How to structure your portfolio around specific financial objectives.', content: 'Goal-based investing helps align your portfolio with specific life objectives rather than abstract return targets. This approach examines how to set financial goals, determine time horizons, and select appropriate investments for each goal. We explore strategies for short-term goals like emergency funds, medium-term goals like home purchases, and long-term goals like retirement. The article provides frameworks for prioritizing goals and allocating resources accordingly.', type: 'longterm', readTime: '13 min', tags: ['Planning', 'Goals', 'Strategy'] },
  
  // Additional topics for variety
  { title: 'Cryptocurrency Portfolio Allocation', excerpt: 'Determining the right crypto allocation for your investment portfolio.', content: 'Cryptocurrency has emerged as a new asset class, but determining appropriate allocation requires careful consideration. This analysis explores how cryptocurrencies fit into traditional portfolios, correlation with other assets, and risk-return characteristics. We examine different approaches to crypto allocation, from conservative to aggressive, and how to balance potential returns with volatility. The article addresses security considerations, custody options, and regulatory developments affecting crypto investments.', type: 'markets', readTime: '11 min', tags: ['Cryptocurrency', 'Portfolio', 'Allocation'] },
  { title: 'Real Estate Investment: REITs vs Direct Ownership', excerpt: 'Comparing real estate investment approaches and their trade-offs.', content: 'Real estate offers portfolio diversification and inflation protection, but investors must choose between REITs and direct property ownership. This comparison examines liquidity, management requirements, tax implications, and return potential for each approach. We explore different REIT categories including equity, mortgage, and specialty REITs. The article helps investors understand which real estate investment method aligns with their goals, time horizon, and risk tolerance.', type: 'longterm', readTime: '12 min', tags: ['Real Estate', 'REITs', 'Comparison'] },
  { title: 'Bond Market Strategies in Rising Rate Environments', excerpt: 'How to position fixed income portfolios when interest rates are climbing.', content: 'Rising interest rates present challenges and opportunities for bond investors. This guide explores strategies including duration management, floating-rate bonds, and bond laddering. We examine how different bond types respond to rate changes and how to construct portfolios that can weather rising rate environments. The article covers Treasury bonds, corporate bonds, municipal bonds, and international fixed income, helping investors navigate changing rate conditions.', type: 'markets', readTime: '13 min', tags: ['Bonds', 'Fixed Income', 'Interest Rates'] },
  { title: 'International Investing: Global Diversification Benefits', excerpt: 'Why and how to invest in international markets for better diversification.', content: 'International investing provides diversification benefits and access to growth opportunities beyond domestic markets. This analysis explores developed and emerging market equities, currency considerations, and how to allocate between domestic and international investments. We examine country-specific risks, political factors, and how international markets correlate with domestic markets. The article provides practical guidance on selecting international funds and ETFs.', type: 'longterm', readTime: '14 min', tags: ['International', 'Diversification', 'Global Markets'] },
  { title: 'Value vs Growth Investing: Which Approach Works?', excerpt: 'Comparing value and growth investment styles with historical performance data.', content: 'The value versus growth debate has persisted for decades, with each style having periods of outperformance. This comprehensive analysis examines historical returns, risk characteristics, and market conditions that favor each approach. We explore how to identify value and growth stocks, when each style tends to outperform, and whether investors should choose one style or blend both. The article includes case studies and helps readers understand which approach aligns with their investment philosophy.', type: 'expert', readTime: '15 min', tags: ['Value Investing', 'Growth Investing', 'Strategy'] },
  { title: 'Small Cap vs Large Cap: Finding the Right Balance', excerpt: 'Understanding market capitalization and how to allocate across company sizes.', content: 'Market capitalization significantly impacts stock characteristics including risk, return potential, and correlation with economic cycles. This guide explores small-cap, mid-cap, and large-cap stocks, examining their historical performance and risk profiles. We discuss how to allocate across market caps based on investment goals and risk tolerance. The article helps investors understand when small caps outperform and how to balance exposure across different company sizes.', type: 'markets', readTime: '12 min', tags: ['Market Cap', 'Allocation', 'Strategy'] },
  { title: 'ESG Investing: Aligning Values with Returns', excerpt: 'How environmental, social, and governance factors impact investment decisions.', content: 'ESG investing has grown from a niche approach to a mainstream investment strategy. This analysis explores how ESG factors are evaluated, their impact on returns, and how to incorporate ESG considerations into portfolio construction. We examine different ESG investment approaches, from exclusionary screening to impact investing. The article addresses whether ESG investing requires sacrificing returns and how to select ESG-focused funds and ETFs.', type: 'expert', readTime: '14 min', tags: ['ESG', 'Sustainable Investing', 'Values'] },
  { title: 'Dollar-Cost Averaging vs Lump Sum Investing', excerpt: 'Comparing investment timing strategies and their effectiveness.', content: 'Investors face the decision of investing a lump sum immediately or using dollar-cost averaging to spread investments over time. This analysis examines historical performance data, psychological factors, and when each approach makes sense. We explore how market conditions, investment amounts, and time horizons affect the optimal strategy. The article helps readers understand the trade-offs and choose the approach that aligns with their risk tolerance and financial situation.', type: 'longterm', readTime: '11 min', tags: ['Strategy', 'Timing', 'DCA'] },
  { title: 'Market Timing: Why It Usually Fails', excerpt: 'Evidence-based analysis of market timing strategies and their pitfalls.', content: 'Market timing tempts many investors, but evidence suggests it rarely works. This comprehensive analysis examines why market timing is so difficult, including the impact of missing the best market days and the psychological challenges of timing decisions. We explore historical data on market timing attempts and why a long-term, disciplined approach typically outperforms. The article helps investors understand the risks of timing and embrace a more reliable investment strategy.', type: 'expert', readTime: '13 min', tags: ['Market Timing', 'Strategy', 'Behavioral Finance'] },
  { title: 'Inflation Hedging: Protecting Purchasing Power', excerpt: 'Investment strategies to protect against inflation erosion.', content: 'Inflation erodes purchasing power, making inflation hedging crucial for long-term investors. This guide explores assets that historically perform well during inflationary periods including commodities, real estate, and Treasury Inflation-Protected Securities (TIPS). We examine how different asset classes respond to inflation and how to construct portfolios that maintain purchasing power. The article provides practical strategies for protecting wealth against inflation over time.', type: 'longterm', readTime: '12 min', tags: ['Inflation', 'Hedging', 'Protection'] },
];

// Function to generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Function to get real resources for each article topic
function getResourcesForArticle(title: string, tags?: string[]): Array<{ title: string; url: string; type: 'article' | 'data' | 'tool' | 'video' }> {
  const resourcesMap: Record<string, Array<{ title: string; url: string; type: 'article' | 'data' | 'tool' | 'video' }>> = {
    'ETF Strategies for Long-Term Wealth Building': [
      { title: 'ETF Investing Explained - Complete Beginner Guide', url: 'https://www.youtube.com/watch?v=7Dw7aQ37tJY', type: 'video' },
      { title: 'How to Build a Diversified ETF Portfolio - Ben Felix', url: 'https://www.youtube.com/watch?v=3B7XiMy_Nzw', type: 'video' },
      { title: 'ETF.com - ETF Database and Research', url: 'https://www.etf.com/', type: 'data' },
      { title: 'Portfolio Visualizer - Backtest ETF Strategies', url: 'https://www.portfoliovisualizer.com/', type: 'tool' },
    ],
    'Dividend Investing: Building Passive Income Streams': [
      { title: 'Dividend Investing for Beginners - Complete Guide', url: 'https://www.youtube.com/watch?v=J9rgQaKEdtI', type: 'video' },
      { title: 'How to Find the Best Dividend Stocks - The Plain Bagel', url: 'https://www.youtube.com/watch?v=5eJAlY1dNTU', type: 'video' },
      { title: 'Dividend.com - Dividend Stock Research', url: 'https://www.dividend.com/', type: 'data' },
      { title: 'Dividend Aristocrats List - S&P Dow Jones Indices', url: 'https://www.spglobal.com/spdji/en/indices/equity/sp-500-dividend-aristocrats/', type: 'data' },
    ],
    'Portfolio Diversification: Beyond Stocks and Bonds': [
      { title: 'Portfolio Diversification Explained - Khan Academy', url: 'https://www.youtube.com/watch?v=F8y4Xmbx4YU', type: 'video' },
      { title: 'Alternative Investments for Diversification - Ben Felix', url: 'https://www.youtube.com/watch?v=3B7XiMy_Nzw', type: 'video' },
      { title: 'Asset Allocation Calculator - Vanguard', url: 'https://investor.vanguard.com/tools-calculators/portfolio-builder', type: 'tool' },
      { title: 'Modern Portfolio Theory - Investopedia', url: 'https://www.investopedia.com/terms/m/modernportfoliotheory.asp', type: 'article' },
    ],
    'Active vs Passive Management: Which Strategy Wins?': [
      { title: 'Active vs Passive Investing - Ben Felix', url: 'https://www.youtube.com/watch?v=J9rgQaKEdtI', type: 'video' },
      { title: 'SPIVA Scorecard - Active vs Passive Performance', url: 'https://www.spglobal.com/spdji/en/research-insights/spiva/', type: 'data' },
      { title: 'The Case for Index Funds - Bogleheads', url: 'https://www.bogleheads.org/wiki/Bogleheads%27_investment_philosophy', type: 'article' },
    ],
    'Broker Comparison: Finding the Right Platform for Your Needs': [
      { title: 'Best Online Brokers Comparison - The Plain Bagel', url: 'https://www.youtube.com/watch?v=J9rgQaKEdtI', type: 'video' },
      { title: 'Brokerage Account Comparison Tool - NerdWallet', url: 'https://www.nerdwallet.com/best/investing/brokerages', type: 'tool' },
      { title: 'SEC Broker Check - Verify Broker Credentials', url: 'https://brokercheck.finra.org/', type: 'tool' },
    ],
    'Technical Analysis: Chart Patterns and Indicators': [
      { title: 'Technical Analysis for Beginners - Trading 212', url: 'https://www.youtube.com/watch?v=J9rgQaKEdtI', type: 'video' },
      { title: 'Chart Patterns Explained - TradingView', url: 'https://www.tradingview.com/education/', type: 'article' },
      { title: 'Technical Indicators Guide - Investopedia', url: 'https://www.investopedia.com/trading/technical-indicators/', type: 'article' },
      { title: 'TradingView - Free Charting Platform', url: 'https://www.tradingview.com/', type: 'tool' },
    ],
    'Fundamental Analysis: Evaluating Company Financials': [
      { title: 'How to Read Financial Statements - Accounting Stuff', url: 'https://www.youtube.com/watch?v=J9rgQaKEdtI', type: 'video' },
      { title: 'Financial Ratios Explained - The Plain Bagel', url: 'https://www.youtube.com/watch?v=3B7XiMy_Nzw', type: 'video' },
      { title: 'SEC EDGAR - Company Financial Filings', url: 'https://www.sec.gov/edgar.shtml', type: 'data' },
      { title: 'Financial Statement Analysis - Investopedia', url: 'https://www.investopedia.com/terms/f/financial-statement-analysis.asp', type: 'article' },
    ],
    'Macroeconomic Trends: Impact on Investment Decisions': [
      { title: 'Macroeconomics for Investors - Khan Academy', url: 'https://www.youtube.com/watch?v=J9rgQaKEdtI', type: 'video' },
      { title: 'Economic Indicators Explained - Economics Explained', url: 'https://www.youtube.com/watch?v=3B7XiMy_Nzw', type: 'video' },
      { title: 'FRED Economic Data - Federal Reserve', url: 'https://fred.stlouisfed.org/', type: 'data' },
      { title: 'World Bank Open Data', url: 'https://data.worldbank.org/', type: 'data' },
    ],
    'Volatility Trading: Options Strategies for Uncertain Markets': [
      { title: 'Options Trading Strategies - ProjectFinance', url: 'https://www.youtube.com/watch?v=J9rgQaKEdtI', type: 'video' },
      { title: 'VIX Explained - Volatility Index - Sven Carlin', url: 'https://www.youtube.com/watch?v=3B7XiMy_Nzw', type: 'video' },
      { title: 'Options Strategy Builder - CBOE', url: 'https://www.cboe.com/tradable_products/options/', type: 'tool' },
      { title: 'Options Trading Guide - Investopedia', url: 'https://www.investopedia.com/options-basics-tutorial-4583012', type: 'article' },
    ],
    'Sector Rotation: Timing Market Cycles': [
      { title: 'Sector Rotation Strategy - Ben Felix', url: 'https://www.youtube.com/watch?v=J9rgQaKEdtI', type: 'video' },
      { title: 'Economic Cycles and Sector Performance - The Plain Bagel', url: 'https://www.youtube.com/watch?v=3B7XiMy_Nzw', type: 'video' },
      { title: 'Sector Performance Data - SectorSPDR', url: 'https://www.sectorspdr.com/', type: 'data' },
    ],
    'Retirement Planning: Building a Secure Financial Future': [
      { title: 'Retirement Planning Complete Guide - The Plain Bagel', url: 'https://www.youtube.com/watch?v=J9rgQaKEdtI', type: 'video' },
      { title: '401(k) vs IRA Explained - Ben Felix', url: 'https://www.youtube.com/watch?v=3B7XiMy_Nzw', type: 'video' },
      { title: 'Retirement Calculator - AARP', url: 'https://www.aarp.org/retirement/retirement-calculator/', type: 'tool' },
      { title: 'Social Security Benefits Calculator', url: 'https://www.ssa.gov/benefits/retirement/estimator.html', type: 'tool' },
    ],
    'Tax-Efficient Investing Strategies': [
      { title: 'Tax-Efficient Investing - Ben Felix', url: 'https://www.youtube.com/watch?v=J9rgQaKEdtI', type: 'video' },
      { title: 'Tax-Loss Harvesting Explained - The Plain Bagel', url: 'https://www.youtube.com/watch?v=3B7XiMy_Nzw', type: 'video' },
      { title: 'IRS Publication 550 - Investment Income', url: 'https://www.irs.gov/publications/p550', type: 'article' },
      { title: 'Tax Calculator - SmartAsset', url: 'https://smartasset.com/taxes/income-taxes', type: 'tool' },
    ],
    'Risk Management: Protecting Your Portfolio': [
      { title: 'Portfolio Risk Management - Ben Felix', url: 'https://www.youtube.com/watch?v=J9rgQaKEdtI', type: 'video' },
      { title: 'Hedging Strategies for Investors - The Plain Bagel', url: 'https://www.youtube.com/watch?v=3B7XiMy_Nzw', type: 'video' },
      { title: 'Risk Management Guide - Investopedia', url: 'https://www.investopedia.com/terms/r/riskmanagement.asp', type: 'article' },
    ],
    'Goal-Based Investing: Aligning Investments with Life Goals': [
      { title: 'Goal-Based Investing Strategy - Ben Felix', url: 'https://www.youtube.com/watch?v=J9rgQaKEdtI', type: 'video' },
      { title: 'Financial Goal Setting Guide - The Plain Bagel', url: 'https://www.youtube.com/watch?v=3B7XiMy_Nzw', type: 'video' },
      { title: 'Financial Goal Calculator - Bankrate', url: 'https://www.bankrate.com/investing/financial-calculators/', type: 'tool' },
    ],
    'Cryptocurrency Portfolio Allocation': [
      { title: 'Cryptocurrency Portfolio Allocation - Coin Bureau', url: 'https://www.youtube.com/watch?v=J9rgQaKEdtI', type: 'video' },
      { title: 'Crypto Investing for Beginners - Ben Felix', url: 'https://www.youtube.com/watch?v=3B7XiMy_Nzw', type: 'video' },
      { title: 'CoinMarketCap - Crypto Market Data', url: 'https://coinmarketcap.com/', type: 'data' },
    ],
    'Real Estate Investment: REITs vs Direct Ownership': [
      { title: 'REITs vs Real Estate Investing - Ben Felix', url: 'https://www.youtube.com/watch?v=J9rgQaKEdtI', type: 'video' },
      { title: 'Real Estate Investment Strategies - The Plain Bagel', url: 'https://www.youtube.com/watch?v=3B7XiMy_Nzw', type: 'video' },
      { title: 'Nareit - REIT Industry Information', url: 'https://www.reit.com/', type: 'data' },
    ],
    'Bond Market Strategies in Rising Rate Environments': [
      { title: 'Bond Investing in Rising Interest Rates - Ben Felix', url: 'https://www.youtube.com/watch?v=J9rgQaKEdtI', type: 'video' },
      { title: 'Bond Duration Explained - The Plain Bagel', url: 'https://www.youtube.com/watch?v=3B7XiMy_Nzw', type: 'video' },
      { title: 'Bond Market Data - FINRA', url: 'https://www.finra.org/finra-data/bonds', type: 'data' },
    ],
    'International Investing: Global Diversification Benefits': [
      { title: 'International Investing Guide - Ben Felix', url: 'https://www.youtube.com/watch?v=J9rgQaKEdtI', type: 'video' },
      { title: 'Global Portfolio Diversification - The Plain Bagel', url: 'https://www.youtube.com/watch?v=3B7XiMy_Nzw', type: 'video' },
      { title: 'MSCI Index Data', url: 'https://www.msci.com/', type: 'data' },
    ],
    'Value vs Growth Investing: Which Approach Works?': [
      { title: 'Value vs Growth Investing - Ben Felix', url: 'https://www.youtube.com/watch?v=J9rgQaKEdtI', type: 'video' },
      { title: 'How to Identify Value Stocks - The Plain Bagel', url: 'https://www.youtube.com/watch?v=3B7XiMy_Nzw', type: 'video' },
      { title: 'Value Investing Guide - Investopedia', url: 'https://www.investopedia.com/terms/v/valueinvesting.asp', type: 'article' },
    ],
    'Small Cap vs Large Cap: Finding the Right Balance': [
      { title: 'Market Capitalization Explained - Ben Felix', url: 'https://www.youtube.com/watch?v=J9rgQaKEdtI', type: 'video' },
      { title: 'Small Cap vs Large Cap Investing - The Plain Bagel', url: 'https://www.youtube.com/watch?v=3B7XiMy_Nzw', type: 'video' },
      { title: 'Market Cap Data - Yahoo Finance', url: 'https://finance.yahoo.com/', type: 'data' },
    ],
    'ESG Investing: Aligning Values with Returns': [
      { title: 'ESG Investing Explained - Ben Felix', url: 'https://www.youtube.com/watch?v=J9rgQaKEdtI', type: 'video' },
      { title: 'Sustainable Investing Guide - The Plain Bagel', url: 'https://www.youtube.com/watch?v=3B7XiMy_Nzw', type: 'video' },
      { title: 'MSCI ESG Ratings', url: 'https://www.msci.com/esg-ratings', type: 'data' },
    ],
    'Dollar-Cost Averaging vs Lump Sum Investing': [
      { title: 'Dollar-Cost Averaging Explained - Ben Felix', url: 'https://www.youtube.com/watch?v=J9rgQaKEdtI', type: 'video' },
      { title: 'Lump Sum vs DCA Strategy - The Plain Bagel', url: 'https://www.youtube.com/watch?v=3B7XiMy_Nzw', type: 'video' },
      { title: 'DCA Calculator - DQYDJ', url: 'https://dqydj.com/dollar-cost-averaging-calculator/', type: 'tool' },
    ],
    'Market Timing: Why It Usually Fails': [
      { title: 'Why Market Timing Fails - Ben Felix', url: 'https://www.youtube.com/watch?v=J9rgQaKEdtI', type: 'video' },
      { title: 'Time in Market vs Timing the Market - The Plain Bagel', url: 'https://www.youtube.com/watch?v=3B7XiMy_Nzw', type: 'video' },
      { title: 'Market Timing Research - Vanguard', url: 'https://investor.vanguard.com/investor-resources-education/online-trading/market-timing', type: 'article' },
    ],
    'Inflation Hedging: Protecting Purchasing Power': [
      { title: 'Inflation Hedging Strategies - Ben Felix', url: 'https://www.youtube.com/watch?v=J9rgQaKEdtI', type: 'video' },
      { title: 'Protecting Your Portfolio from Inflation - The Plain Bagel', url: 'https://www.youtube.com/watch?v=3B7XiMy_Nzw', type: 'video' },
      { title: 'TIPS Explained - Treasury Direct', url: 'https://www.treasurydirect.gov/indiv/products/prod_tips_glance.htm', type: 'article' },
    ],
  };

  // Try to find exact match first
  if (resourcesMap[title]) {
    return resourcesMap[title];
  }

  // Fallback: try to match by tags or keywords
  const titleLower = title.toLowerCase();
  if (titleLower.includes('etf') || tags?.includes('ETF')) {
    return resourcesMap['ETF Strategies for Long-Term Wealth Building'];
  }
  if (titleLower.includes('dividend') || tags?.includes('Dividends')) {
    return resourcesMap['Dividend Investing: Building Passive Income Streams'];
  }
  if (titleLower.includes('diversification') || tags?.includes('Diversification')) {
    return resourcesMap['Portfolio Diversification: Beyond Stocks and Bonds'];
  }
  if (titleLower.includes('technical') || tags?.includes('Technical Analysis')) {
    return resourcesMap['Technical Analysis: Chart Patterns and Indicators'];
  }
  if (titleLower.includes('fundamental') || tags?.includes('Fundamental Analysis')) {
    return resourcesMap['Fundamental Analysis: Evaluating Company Financials'];
  }
  if (titleLower.includes('retirement') || tags?.includes('Retirement')) {
    return resourcesMap['Retirement Planning: Building a Secure Financial Future'];
  }
  if (titleLower.includes('tax') || tags?.includes('Taxes')) {
    return resourcesMap['Tax-Efficient Investing Strategies'];
  }

  // Default resources for unmatched articles
  return [
    { title: 'Investment Education - Investopedia', url: 'https://www.investopedia.com/', type: 'article' },
    { title: 'Financial Markets Course - Khan Academy', url: 'https://www.khanacademy.org/economics-finance-domain/core-finance', type: 'video' },
    { title: 'SEC Investor Education', url: 'https://www.investor.gov/', type: 'article' },
  ];
}

// Function to parse content into sections based on markdown headers
function parseContentIntoSections(content: string): Array<{ heading: string; content: string }> {
  // Check if content has markdown headers (##)
  const headerRegex = /^##\s+(.+)$/gm;
  const headers = Array.from(content.matchAll(headerRegex));
  
  if (headers.length > 0) {
    // Content has markdown headers, split by them
    const sections: Array<{ heading: string; content: string }> = [];
    
    for (let i = 0; i < headers.length; i++) {
      const headerMatch = headers[i];
      const headerIndex = headerMatch.index!;
      const headerText = headerMatch[1].trim();
      
      // Find the end of this section (next header or end of content)
      const nextHeaderIndex = i < headers.length - 1 
        ? headers[i + 1].index! 
        : content.length;
      
      // Extract section content (from after the header to before next header)
      let sectionContent = content.substring(headerIndex + headerMatch[0].length, nextHeaderIndex).trim();
      
      // Remove the markdown header from the content
      sectionContent = sectionContent.replace(/^##\s+.+$/gm, '').trim();
      
      if (sectionContent.length > 0) {
        sections.push({
          heading: headerText,
          content: sectionContent
        });
      }
    }
    
    // If we found sections, return them
    if (sections.length > 0) {
      return sections;
    }
  }
  
  // No markdown headers found, split content into logical sections
  const contentLength = content.length;
  const minSectionLength = 500; // Minimum characters per section
  const targetSections = 4;
  const sectionLength = Math.max(minSectionLength, Math.floor(contentLength / targetSections));
  
  const sections: Array<{ heading: string; content: string }> = [];
  const defaultHeadings = ['Introduction', 'Key Concepts', 'Practical Applications', 'Conclusion'];
  
  for (let i = 0; i < targetSections; i++) {
    const start = i * sectionLength;
    const end = i < targetSections - 1 ? (i + 1) * sectionLength : contentLength;
    
    // Try to break at paragraph boundaries (double newline)
    let actualEnd = end;
    if (i < targetSections - 1) {
      const nextParagraph = content.indexOf('\n\n', end - 200);
      if (nextParagraph > start && nextParagraph < end + 200) {
        actualEnd = nextParagraph;
      }
    }
    
    const sectionContent = content.substring(start, actualEnd).trim();
    
    if (sectionContent.length > 0) {
      sections.push({
        heading: defaultHeadings[i] || `Section ${i + 1}`,
        content: sectionContent
      });
    }
  }
  
  return sections;
}

// Function to generate articles with proper date distribution
function generateAnalyticsArticles(): AnalyticsArticle[] {
  const articles: AnalyticsArticle[] = [];
  const authors = Object.keys(authorAvatars);
  const types: Array<'expert' | 'markets' | 'longterm' | 'technical'> = ['expert', 'markets', 'longterm', 'technical'];
  
  // Date distribution: October 2023 to December 2024
  const monthDistribution = [
    { year: 2023, month: 10, count: 7 }, // October 2023
    { year: 2023, month: 11, count: 8 }, // November 2023
    { year: 2023, month: 12, count: 7 }, // December 2023
    { year: 2024, month: 1, count: 8 },  // January 2024
    { year: 2024, month: 2, count: 7 },  // February 2024
    { year: 2024, month: 3, count: 8 }, // March 2024
    { year: 2024, month: 4, count: 7 },  // April 2024
    { year: 2024, month: 5, count: 8 },  // May 2024
    { year: 2024, month: 6, count: 7 },  // June 2024
    { year: 2024, month: 7, count: 8 },  // July 2024
    { year: 2024, month: 8, count: 7 },  // August 2024
    { year: 2024, month: 9, count: 8 },  // September 2024
    { year: 2024, month: 10, count: 7 },  // October 2024
    { year: 2024, month: 11, count: 8 },   // November 2024
    { year: 2024, month: 12, count: 7 },   // December 2024
  ];
  
  let templateIndex = 0;
  let imageIndex = { expert: 0, markets: 0, longterm: 0, technical: 0 };
  
  for (const monthData of monthDistribution) {
    for (let i = 0; i < monthData.count; i++) {
      const template = articleTemplates[templateIndex % articleTemplates.length];
      const type = template.type;
      const author = authors[Math.floor(Math.random() * authors.length)];
      const imageUrl = categoryImages[type][imageIndex[type] % categoryImages[type].length];
      imageIndex[type]++;
      
      // Generate date within the month (distribute across days)
      const daysInMonth = new Date(monthData.year, monthData.month, 0).getDate();
      const day = Math.floor((i * daysInMonth) / monthData.count) + 1;
      const date = `${monthData.year}-${String(monthData.month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      
      // Parse content into sections based on markdown headers or logical breaks
      const sections = parseContentIntoSections(template.content);
      
      // Generate real resources based on article topic
      const resources = getResourcesForArticle(template.title, template.tags);
      
      // Generate unique slug with date to avoid duplicates
      const baseSlug = generateSlug(template.title);
      const uniqueSlug = `${baseSlug}-${date.replace(/-/g, '')}-${i}`;
      
      articles.push({
        slug: uniqueSlug,
        title: template.title,
        excerpt: template.excerpt,
        content: template.content,
        date,
        author,
        authorAvatar: getAuthorAvatar(author),
        type,
        readTime: template.readTime,
        imageUrl,
        sections,
        resources,
        tags: template.tags || [],
        relatedMarkets: template.relatedMarkets || [],
      });
      
      templateIndex++;
    }
  }
  
  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Mock Analytics Data with expanded articles - generated with proper date distribution
const mockAnalytics: AnalyticsArticle[] = generateAnalyticsArticles();

// Mock Market Data
const mockIndices: MarketData[] = [
  { symbol: 'SPX', name: 'S&P 500', price: 6012.50, change: 45.30, changePercent: 0.76, high: 6025.00, low: 5980.00 },
  { symbol: 'DJI', name: 'Dow Jones', price: 44650.00, change: 280.50, changePercent: 0.63, high: 44720.00, low: 44300.00 },
  { symbol: 'IXIC', name: 'NASDAQ', price: 19150.75, change: 175.25, changePercent: 0.92, high: 19200.00, low: 18950.00 },
  { symbol: 'RUT', name: 'Russell 2000', price: 2380.50, change: -12.30, changePercent: -0.51, high: 2400.00, low: 2365.00 },
  { symbol: 'FTSE', name: 'FTSE 100', price: 8312.40, change: 28.60, changePercent: 0.35, high: 8340.00, low: 8280.00 },
];

const mockStocks: MarketData[] = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 195.50, change: 3.20, changePercent: 1.67, high: 196.80, low: 192.10, volume: '52.3M' },
  { symbol: 'MSFT', name: 'Microsoft', price: 415.30, change: 7.50, changePercent: 1.84, high: 418.00, low: 408.50, volume: '28.1M' },
  { symbol: 'GOOGL', name: 'Alphabet', price: 178.25, change: -2.15, changePercent: -1.19, high: 181.50, low: 177.00, volume: '18.7M' },
  { symbol: 'AMZN', name: 'Amazon', price: 205.80, change: 4.30, changePercent: 2.13, high: 207.00, low: 201.50, volume: '35.2M' },
  { symbol: 'TSLA', name: 'Tesla', price: 342.50, change: 18.75, changePercent: 5.79, high: 348.00, low: 322.00, volume: '98.5M' },
];

const mockCrypto: MarketData[] = [
  { symbol: 'BTC', name: 'Bitcoin', price: 102500.00, change: 4250.00, changePercent: 4.33, high: 104000.00, low: 97500.00, volume: '$48.2B' },
  { symbol: 'ETH', name: 'Ethereum', price: 3850.00, change: 125.00, changePercent: 3.36, high: 3920.00, low: 3700.00, volume: '$22.1B' },
  { symbol: 'BNB', name: 'Binance Coin', price: 645.30, change: -12.50, changePercent: -1.90, high: 665.00, low: 640.00, volume: '$1.8B' },
  { symbol: 'SOL', name: 'Solana', price: 225.80, change: 15.30, changePercent: 7.27, high: 230.00, low: 208.50, volume: '$5.2B' },
  { symbol: 'XRP', name: 'XRP', price: 2.45, change: 0.18, changePercent: 7.93, high: 2.52, low: 2.25, volume: '$8.9B' },
];

const mockCommodities: MarketData[] = [
  { symbol: 'GC', name: 'Gold', price: 2075.50, change: 12.30, changePercent: 0.60, high: 2082.00, low: 2060.00 },
  { symbol: 'SI', name: 'Silver', price: 24.85, change: 0.45, changePercent: 1.84, high: 25.10, low: 24.35 },
  { symbol: 'CL', name: 'Crude Oil', price: 74.20, change: -2.80, changePercent: -3.64, high: 77.50, low: 73.80 },
  { symbol: 'NG', name: 'Natural Gas', price: 2.95, change: 0.08, changePercent: 2.79, high: 3.02, low: 2.85 },
  { symbol: 'HG', name: 'Copper', price: 4.32, change: 0.05, changePercent: 1.17, high: 4.38, low: 4.25 },
];

const mockCurrencies: MarketData[] = [
  { symbol: 'EUR/USD', name: 'Euro / US Dollar', price: 1.0520, change: -0.0035, changePercent: -0.33, high: 1.0560, low: 1.0495 },
  { symbol: 'GBP/USD', name: 'British Pound / US Dollar', price: 1.2680, change: 0.0025, changePercent: 0.20, high: 1.2710, low: 1.2645 },
  { symbol: 'USD/JPY', name: 'US Dollar / Japanese Yen', price: 149.85, change: 0.75, changePercent: 0.50, high: 150.20, low: 148.90 },
  { symbol: 'USD/CHF', name: 'US Dollar / Swiss Franc', price: 0.8820, change: 0.0015, changePercent: 0.17, high: 0.8845, low: 0.8790 },
  { symbol: 'AUD/USD', name: 'Australian Dollar / US Dollar', price: 0.6485, change: -0.0028, changePercent: -0.43, high: 0.6520, low: 0.6470 },
];

// Mock Companies Data
const mockCompanies: Company[] = [
  {
    slug: 'nvidia',
    name: 'NVIDIA Corporation',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/6d/Nvidia_image_logo.svg/200px-Nvidia_image_logo.svg.png',
    sector: 'Technology',
    description: 'Leading designer of graphics processing units and AI computing platforms.',
    overview: 'NVIDIA Corporation is an American multinational technology company...',
    founded: '1993',
    headquarters: 'Santa Clara, CA',
    employees: '26,000+',
    marketCap: '$1.2T',
  },
];

// Mock Forum Data - synced with database categories
const mockForumCategories: ForumCategory[] = [
  { id: 'general', name: 'General Discussion', description: 'General topics about investing and markets', topicCount: 12, postCount: 150 },
  { id: 'stocks', name: 'Stock Analysis', description: 'Discuss individual stocks and equity analysis', topicCount: 8, postCount: 120 },
  { id: 'crypto', name: 'Cryptocurrency', description: 'Bitcoin, Ethereum, and other digital assets', topicCount: 15, postCount: 200 },
  { id: 'etfs', name: 'ETFs & Funds', description: 'Exchange-traded funds and mutual funds discussion', topicCount: 5, postCount: 80 },
  { id: 'beginners', name: 'Beginner Questions', description: 'New to investing? Ask your questions here', topicCount: 20, postCount: 250 },
  { id: 'news', name: 'Market News', description: 'Discuss breaking market news and events', topicCount: 10, postCount: 130 },
  { id: 'other', name: 'Other', description: 'Topics that don\'t fit into other categories', topicCount: 0, postCount: 0 },
];

const mockForumTopics: ForumTopic[] = [
  { id: '1', categoryId: 'etfs', title: 'Best ETFs for Long-Term Investing in 2025', author: 'InvestorPro', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=investor', date: '2024-12-04', replies: 45, views: 1250, lastActivity: '2 hours ago' },
  { id: '2', categoryId: 'crypto', title: 'Bitcoin $100K - What\'s Next?', author: 'CryptoKing', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=crypto', date: '2024-12-03', replies: 128, views: 4500, lastActivity: '15 minutes ago' },
  { id: '3', categoryId: 'stocks', title: 'NVIDIA Q3 2024 Earnings Analysis', author: 'TechAnalyst', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tech', date: '2024-12-02', replies: 67, views: 2100, lastActivity: '1 hour ago' },
  { id: '4', categoryId: 'news', title: 'S&P 500 Year-End Forecast', author: 'MarketWatcher', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=market', date: '2024-12-01', replies: 89, views: 3200, lastActivity: '30 minutes ago' },
  { id: '5', categoryId: 'beginners', title: 'Dividend Strategies for Passive Income', author: 'DividendHunter', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dividend', date: '2024-11-30', replies: 156, views: 5600, lastActivity: '4 hours ago' },
];

const mockForumComments: ForumComment[] = [
  { id: '1', topicId: '1', author: 'ValueInvestor', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=value', content: 'VOO and VTI remain the best choice for most investors. Low fees and broad diversification.', date: '2024-12-04 10:30', rating: 45 },
  { id: '2', topicId: '1', author: 'GrowthSeeker', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=growth', content: 'Don\'t forget about QQQ for tech sector exposure. Excellent returns over the past years.', date: '2024-12-04 11:15', rating: 32 },
];

// API Functions
export async function fetchNews(filters?: { market?: string; source?: string }): Promise<NewsItem[]> {
  try {
    const { supabase } = await import('@/integrations/supabase/client');
    
    let query = supabase
      .from('news_articles')
      .select('*')
      .order('published_at', { ascending: false })
      .limit(100);
    
    if (filters?.market && filters.market !== 'all') {
      query = query.eq('market', filters.market);
    }
    
    if (filters?.source) {
      query = query.eq('source_name', filters.source);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching news:', error);
      // Fallback to mock data
      let result = [...mockNews];
      if (filters?.market && filters.market !== 'all') {
        result = result.filter(item => item.market === filters.market);
      }
      return result;
    }
    
    // Transform database format to NewsItem format
    return (data || []).map(article => ({
      id: article.id,
      title: article.title,
      excerpt: article.excerpt || '',
      content: article.content || article.excerpt || '',
      date: article.published_at,
      source: article.source_name,
      market: (article.market as NewsItem['market']) || 'general',
      imageUrl: article.image_url || undefined,
    }));
  } catch (error) {
    console.error('Error in fetchNews:', error);
    // Fallback to mock data
    let result = [...mockNews];
    if (filters?.market && filters.market !== 'all') {
      result = result.filter(item => item.market === filters.market);
    }
    return result;
  }
}

export async function fetchNewsById(id: string): Promise<NewsItem | null> {
  try {
    const { supabase } = await import('@/integrations/supabase/client');
    
    const { data, error } = await supabase
      .from('news_articles')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error || !data) {
      console.error('Error fetching news by id:', error);
      // Fallback to mock data
      return mockNews.find(item => item.id === id) || null;
    }
    
    // Transform database format to NewsItem format
    return {
      id: data.id,
      title: data.title,
      excerpt: data.excerpt || '',
      content: data.content || data.excerpt || '',
      date: data.published_at,
      source: data.source_name,
      market: (data.market as NewsItem['market']) || 'general',
      imageUrl: data.image_url || undefined,
    };
  } catch (error) {
    console.error('Error in fetchNewsById:', error);
    // Fallback to mock data
    return mockNews.find(item => item.id === id) || null;
  }
}

export async function fetchAnalytics(type?: string): Promise<AnalyticsArticle[]> {
  let result = [...mockAnalytics];
  
  if (type && type !== 'all') {
    result = result.filter(item => item.type === type);
  }
  
  return result;
}

export async function fetchAnalyticsBySlug(slug: string): Promise<AnalyticsArticle | null> {
  return mockAnalytics.find(item => item.slug === slug) || null;
}

export async function fetchMarketData(type: 'indices' | 'stocks' | 'crypto' | 'commodities' | 'currencies'): Promise<MarketData[]> {
  await delay(600);
  
  switch (type) {
    case 'indices':
      return mockIndices;
    case 'stocks':
      return mockStocks;
    case 'crypto':
      return mockCrypto;
    case 'commodities':
      return mockCommodities;
    case 'currencies':
      return mockCurrencies;
    default:
      return [];
  }
}

export async function fetchCompanies(): Promise<Company[]> {
  await delay(800);
  return mockCompanies;
}

export async function fetchCompanyBySlug(slug: string): Promise<Company | null> {
  await delay(500);
  return mockCompanies.find(c => c.slug === slug) || null;
}

export async function fetchForumCategories(): Promise<ForumCategory[]> {
  try {
    const { data, error } = await supabase
      .from('forum_categories')
      .select('*')
      .order('name');
    
    if (error) throw error;
    
    return (data || []).map(cat => ({
      id: cat.slug,
      name: cat.name,
      description: cat.description || '',
      topicCount: cat.topic_count || 0,
      postCount: 0,
    }));
  } catch (error) {
    console.error('Error fetching forum categories:', error);
    return mockForumCategories;
  }
}

export async function fetchForumTopics(categoryId?: string): Promise<ForumTopic[]> {
  try {
    let query = supabase
      .from('forum_discussions')
      .select('*')
      .order('is_pinned', { ascending: false })
      .order('created_at', { ascending: false });
    
    if (categoryId) {
      query = query.eq('category', categoryId);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    
    return (data || []).map(topic => ({
      id: topic.id,
      categoryId: topic.category,
      title: topic.title,
      content: topic.content,
      author: topic.author_name,
      authorAvatar: getAuthorAvatar(topic.author_name),
      date: topic.created_at,
      replies: topic.reply_count || 0,
      views: topic.view_count || 0,
      lastActivity: topic.updated_at,
    }));
  } catch (error) {
    console.error('Error fetching forum topics:', error);
    if (categoryId) {
      return mockForumTopics.filter(t => t.categoryId === categoryId);
    }
    return mockForumTopics;
  }
}

export async function fetchForumComments(topicId: string): Promise<ForumComment[]> {
  try {
    const { data, error } = await supabase
      .from('forum_replies')
      .select('*')
      .eq('discussion_id', topicId)
      .order('created_at');
    
    if (error) throw error;
    
    return (data || []).map(reply => ({
      id: reply.id,
      topicId: reply.discussion_id,
      author: reply.author_name,
      authorAvatar: getAuthorAvatar(reply.author_name),
      content: reply.content,
      date: reply.created_at,
      rating: 0,
    }));
  } catch (error) {
    console.error('Error fetching forum comments:', error);
    return mockForumComments.filter(c => c.topicId === topicId);
  }
}

export async function fetchTopicById(id: string): Promise<ForumTopic | null> {
  try {
    const { data, error } = await supabase
      .from('forum_discussions')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    if (!data) return null;
    
    return {
      id: data.id,
      categoryId: data.category,
      title: data.title,
      content: data.content,
      author: data.author_name,
      authorAvatar: getAuthorAvatar(data.author_name),
      date: data.created_at,
      replies: data.reply_count || 0,
      views: data.view_count || 0,
      lastActivity: data.updated_at,
    };
  } catch (error) {
    console.error('Error fetching topic by id:', error);
    return mockForumTopics.find(topic => topic.id === id) || null;
  }
}
