export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl?: string;
  notes: string;
  importantPoints: string[];
  quiz: QuizQuestion[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  moduleTest: QuizQuestion[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  modules: Module[];
  finalExamPassRate: number;
  finalExam: QuizQuestion[];
}

// Helper function to get course by ID
export function getCourseById(courseId: string): Course | undefined {
  return courses.find(c => c.id === courseId);
}

// Helper function to get all courses
export function getAllCourses(): Course[] {
  return courses;
}

export const courses: Course[] = [
  {
    id: 'investment-fundamentals',
    title: 'Investment Fundamentals',
    description: 'Master the basics of financial markets, asset classes, real returns, and portfolio construction',
    finalExamPassRate: 75,
  modules: [
    {
      id: 'module-1',
      title: 'Introduction to Financial Markets',
      description: 'Basics of financial markets and key concepts',
      lessons: [
        {
          id: 'lesson-1-1',
          title: 'What Are Financial Markets',
          duration: '12 min',
          notes: `
# What Are Financial Markets

Financial markets are platforms where financial instruments are exchanged between participants. These include stock exchanges, currency markets, bond markets, and others.

## Main Functions:
- **Capital Redistribution** — directing money where it works more efficiently
- **Price Discovery** — determining fair value of assets
- **Liquidity** — ability to quickly buy or sell an asset

## Why This Matters to You
Understanding how markets work allows you to make informed investment decisions instead of relying on marketing promises from financial intermediaries.

> **Food for Thought:** A bank deposit is also participation in financial markets, but through an intermediary (the bank), which takes a significant portion of returns as its margin.
          `,
          importantPoints: [
            'Financial markets are a mechanism for efficient capital allocation',
            'Direct market participation removes intermediaries and their fees',
            'Understanding markets is the foundation of financial literacy'
          ],
          quiz: [
            {
              id: 'q1-1-1',
              question: 'What is the main function of financial markets?',
              options: ['Only trading stocks', 'Capital redistribution and price discovery', 'Storing money', 'Issuing loans'],
              correctAnswer: 1,
              explanation: 'Financial markets perform many functions, key among which are efficient capital redistribution and determining fair prices for assets.'
            },
            {
              id: 'q1-1-2',
              question: 'What happens to your money when you put it in a deposit?',
              options: ['It just sits in the bank vault', 'The bank invests it and issues loans, taking most of the profit', 'It immediately goes to the exchange', 'Nothing happens'],
              correctAnswer: 1,
              explanation: 'The bank uses deposits to issue loans at higher interest rates. The difference between deposit and loan rates is the bank\'s margin.'
            }
          ]
        },
        {
          id: 'lesson-1-2',
          title: 'Asset Classes: Stocks, Bonds, Commodities',
          duration: '18 min',
          notes: `
# Asset Classes

## Stocks
Equity securities giving the right to a portion of company profits and participation in management.
- Historical returns: 7-10% annually (after inflation)
- Risk: high in short term, moderate in long term

## Bonds
Debt securities — you lend money to the issuer.
- Returns: 2-6% above inflation for corporate bonds
- Risk: lower than stocks, but higher than "risk-free" rate

## Commodities
Gold, oil, agricultural products.
- Inflation hedge (especially gold)
- High volatility

## Bank Deposits — Also an Asset
But with features:
- Returns: often below inflation in real terms
- Risk: low nominally, but **inflation risk** is significant
- Liquidity: limited by contract terms
          `,
          importantPoints: [
            'Stocks historically yield 7-10% annually above inflation',
            'Bonds — balance between risk and return',
            'Deposits often lose to inflation in real terms'
          ],
          quiz: [
            {
              id: 'q1-2-1',
              question: 'Which asset class historically shows the highest returns in the long term?',
              options: ['Bank deposits', 'Bonds', 'Stocks', 'Cash'],
              correctAnswer: 2,
              explanation: 'Stocks historically yield 7-10% annually above inflation, which is significantly higher than other asset classes in the long term.'
            },
            {
              id: 'q1-2-2',
              question: 'What is the inflation risk of a bank deposit?',
              options: ['The bank may go bankrupt', 'Your money\'s purchasing power may decrease', 'Interest rate may change', 'Money may be stolen'],
              correctAnswer: 1,
              explanation: 'Inflation risk is the risk that the real value of your savings will decrease due to rising prices, even if the nominal amount increases.'
            }
          ]
        },
        {
          id: 'lesson-1-3',
          title: 'Nominal vs Real Returns',
          duration: '15 min',
          notes: `
# Nominal vs Real Returns

## Nominal Returns
What you see in ads: "8% annually!", "Best rate on the market!"

## Real Returns
Nominal returns minus inflation. **This is what really matters.**

### Calculation Example:
- Deposit: 8% annually
- Inflation: 6%
- Real return: 8% - 6% = **2%**

Over 10 years under these conditions:
- Nominally your $100,000 becomes ~$215,000
- Real (accounting for inflation): ~$122,000 in today's money

## Why Do Banks Only Talk About Nominal Rates?
Because it looks more attractive. Real returns on deposits are often close to zero or negative.

> **Important:** Always calculate real returns when comparing investment alternatives!
          `,
          importantPoints: [
            'Real Return = Nominal - Inflation',
            'Banks emphasize nominal rates',
            'Real returns on deposits are often close to zero'
          ],
          quiz: [
            {
              id: 'q1-3-1',
              question: 'If a deposit gives 7% and inflation is 5%, what is the real return?',
              options: ['7%', '12%', '2%', '5%'],
              correctAnswer: 2,
              explanation: 'Real return = 7% - 5% = 2%. This is what actually increases your purchasing power.'
            },
            {
              id: 'q1-3-2',
              question: 'Why do banks usually indicate nominal rates in advertising?',
              options: ['The law requires it', 'Nominal rates look more attractive', 'They don\'t know the inflation level', 'Real rates cannot be calculated'],
              correctAnswer: 1,
              explanation: 'Nominal rates always look more attractive than real ones. This is a marketing technique worth paying attention to.'
            }
          ]
        }
      ],
      moduleTest: [
        {
          id: 'mt1-1',
          question: 'What is the main function of financial markets?',
          options: ['Storing money', 'Efficient capital redistribution', 'Printing money', 'Paying salaries'],
          correctAnswer: 1
        },
        {
          id: 'mt1-2',
          question: 'Which asset class has the highest historical returns?',
          options: ['Deposits', 'Bonds', 'Stocks', 'Cash'],
          correctAnswer: 2
        },
        {
          id: 'mt1-3',
          question: 'Real return of a 9% deposit with 7% inflation is:',
          options: ['9%', '16%', '7%', '2%'],
          correctAnswer: 3
        }
      ]
    },
    {
      id: 'module-2',
      title: 'Understanding Real Returns',
      description: 'Deep dive into the concept of real returns and their impact on your savings',
      lessons: [
        {
          id: 'lesson-2-1',
          title: 'Inflation: The Silent Enemy of Savings',
          duration: '14 min',
          notes: `
# Inflation: The Silent Enemy of Savings

Inflation is a sustained increase in the general price level. Every year your money loses purchasing power.

## How Inflation Affects Savings

| Year | Amount on Deposit (8%) | Real Value (6% inflation) |
|------|------------------------|--------------------------|
| 0    | 100,000               | 100,000                  |
| 5    | 146,933               | 109,836                  |
| 10   | 215,892               | 120,642                  |
| 20   | 466,096               | 145,545                  |

**Conclusion:** Over 20 years, nominally you "earned" 366,000, but really — only 45,545 in today's money.

## Why This Matters
Many people choose "safe" deposits without understanding that inflation risk is also a risk. It just doesn't manifest as a sharp drop in account numbers, but as a gradual loss of purchasing power.
          `,
          importantPoints: [
            'Inflation constantly devalues your savings',
            'Over 20 years, real deposit returns can be 8 times less than nominal',
            'Inflation risk is often underestimated'
          ],
          quiz: [
            {
              id: 'q2-1-1',
              question: 'What happens to money\'s purchasing power during inflation?',
              options: ['Increases', 'Remains unchanged', 'Decreases', 'Depends on the bank'],
              correctAnswer: 2,
              explanation: 'Inflation means rising prices, so with the same amount of money you can buy fewer goods and services.'
            }
          ]
        },
        {
          id: 'lesson-2-2',
          title: 'Comparison: Deposits vs Investment Instruments',
          duration: '20 min',
          notes: `
# Comparison: Deposits vs Investment Instruments

## Historical Returns (Real, After Inflation)

| Instrument | Returns | Risk | Liquidity |
|------------|---------|------|-----------|
| Deposits | 0-2% | Low* | Medium** |
| Government Bonds | 1-3% | Low | High |
| Corporate Bonds | 2-5% | Medium | High |
| Stock ETFs | 5-8% | High*** | High |
| Stocks | 7-10% | Very High | High |

*Low nominally, but inflation risk is significant
**Early withdrawal often cancels interest
***In short term; in long term (10+ years) risk decreases

## Key Takeaway
With an investment horizon of 10+ years, a diversified ETF portfolio has a high probability of outperforming deposits in real returns.
          `,
          importantPoints: [
            'Deposits give 0-2% real returns',
            'Stock ETFs historically yield 5-8% real returns',
            'Long-term horizon reduces risks of investing in stocks'
          ],
          quiz: [
            {
              id: 'q2-2-1',
              question: 'What is the typical real return of bank deposits?',
              options: ['8-10%', '5-7%', '0-2%', '10-15%'],
              correctAnswer: 2,
              explanation: 'After deducting inflation, deposits usually yield 0-2% real returns, sometimes even negative.'
            }
          ]
        }
      ],
      moduleTest: [
        {
          id: 'mt2-1',
          question: 'Which instrument historically shows the highest real returns?',
          options: ['Bank deposits', 'Cash', 'Stock ETFs', 'Currency under the mattress'],
          correctAnswer: 2
        },
        {
          id: 'mt2-2',
          question: '6% inflation means that in a year, with 100,000 you can buy goods worth approximately:',
          options: ['106,000', '100,000', '94,340', '90,000'],
          correctAnswer: 2
        }
      ]
    },
    {
      id: 'module-3',
      title: 'Building an Investment Portfolio',
      description: 'Practical principles of creating and managing a portfolio',
      lessons: [
        {
          id: 'lesson-3-1',
          title: 'Diversification Principles',
          duration: '16 min',
          notes: `
# Diversification Principles

"Don't put all your eggs in one basket" — a basic investment principle.

## Types of Diversification:
1. **By Asset Classes** — stocks, bonds, commodities
2. **By Geography** — different countries and regions
3. **By Sectors** — technology, finance, healthcare
4. **By Currencies** — dollars, euros, etc.

## Why Diversification Works
Different assets react to economic events differently. When some fall, others may rise or remain stable.

## Diversification vs Concentration
A bank deposit is concentration in one type of asset with low real returns. A diversified portfolio distributes risks and increases potential returns.
          `,
          importantPoints: [
            'Diversification reduces risk without significant loss of returns',
            'It\'s important to diversify by asset classes, geography, and sectors',
            'A deposit is concentration, not diversification'
          ],
          quiz: [
            {
              id: 'q3-1-1',
              question: 'What is NOT a type of diversification?',
              options: ['By asset classes', 'By geography', 'Placing all money in one bank', 'By economic sectors'],
              correctAnswer: 2,
              explanation: 'Placing all money in one bank is concentration, not diversification. Even deposit insurance doesn\'t protect against inflation risk.'
            }
          ]
        },
        {
          id: 'lesson-3-2',
          title: 'Asset Allocation by Age and Goals',
          duration: '18 min',
          notes: `
# Asset Allocation by Age and Goals

## Classic "100 Minus Age" Rule
Percentage of stocks in portfolio = 100 - your age

- Age 25 → 75% stocks, 25% bonds
- Age 40 → 60% stocks, 40% bonds
- Age 60 → 40% stocks, 60% bonds

## Why Young People Can Take More Risk
1. More time to recover from drawdowns
2. Main income from work, independent of portfolio
3. Compound interest effect works stronger over long horizon

## Young Investor Mistake
Many young people keep money in deposits "for safety", missing years of potential growth in the stock market.
          `,
          importantPoints: [
            'Young investors can afford more stocks in portfolio',
            'Bond allocation should increase with age',
            'Time is the investor\'s main ally in stocks'
          ],
          quiz: [
            {
              id: 'q3-2-1',
              question: 'What asset allocation is recommended for a 30-year-old investor by the "100 minus age" rule?',
              options: ['30% stocks, 70% bonds', '70% stocks, 30% bonds', '50% stocks, 50% bonds', '100% deposits'],
              correctAnswer: 1,
              explanation: '100 - 30 = 70, meaning 70% stocks and 30% bonds. This is an aggressive but suitable portfolio for a young investor with a long horizon.'
            }
          ]
        }
      ],
      moduleTest: [
        {
          id: 'mt3-1',
          question: 'What is diversification?',
          options: ['Investing all money in one company\'s stock', 'Distributing investments among different assets', 'Keeping money in deposits', 'Buying real estate'],
          correctAnswer: 1
        },
        {
          id: 'mt3-2',
          question: 'By the "100 minus age" rule, what percentage of stocks should be in a 45-year-old investor\'s portfolio?',
          options: ['45%', '55%', '100%', '0%'],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 'module-4',
      title: 'Practical Instruments',
      description: 'ETFs, bonds, and other instruments for independent investing',
      lessons: [
        {
          id: 'lesson-4-1',
          title: 'ETF: A Simple Way to Invest',
          duration: '22 min',
          notes: `
# ETF: A Simple Way to Invest

ETF (Exchange Traded Fund) is a fund whose shares trade on an exchange.

## ETF Advantages:
1. **Diversification** — one ETF can contain hundreds of stocks
2. **Low Fees** — 0.03-0.5% annually vs 1-3% for bank products
3. **Liquidity** — can buy/sell at any time
4. **Transparency** — fund composition is known

## Examples of Popular ETFs:
- **S&P 500 ETF** — 500 largest US companies
- **World ETF** — stocks of companies worldwide
- **Bond ETF** — diversified bond portfolio

## ETF vs Bank Investment Products
| Criterion | ETF | Bank Product |
|-----------|-----|--------------|
| Fee | 0.03-0.5% | 1-3% |
| Transparency | Full | Partial |
| Liquidity | Instant | Limited |
| Control | Full | Through manager |
          `,
          importantPoints: [
            'ETF is a simple way to get diversification',
            'ETF fees are 10-100 times lower than bank products',
            'ETF can be bought/sold at any time without losing income'
          ],
          quiz: [
            {
              id: 'q4-1-1',
              question: 'What advantage do ETFs have over bank investment products?',
              options: ['Guaranteed returns', 'Lower fees and transparency', 'Deposit insurance', 'Ability to get loans'],
              correctAnswer: 1,
              explanation: 'ETFs have significantly lower fees (0.03-0.5% vs 1-3%) and full transparency of composition.'
            }
          ]
        },
        {
          id: 'lesson-4-2',
          title: 'How to Open a Brokerage Account',
          duration: '15 min',
          notes: `
# How to Open a Brokerage Account

## Steps:
1. **Choose a broker** — compare fees, convenience, reliability
2. **Submit application** — online or in office
3. **Complete identification** — upload documents
4. **Fund account** — transfer money
5. **Start investing** — buy first assets

## What to Pay Attention To:
- Trading fees
- Custody fees
- Minimum amount
- Available markets and instruments
- Support quality

## The Complexity Myth
Opening a brokerage account today is no more difficult than opening a bank account. Many are afraid to start, although the process takes 15-30 minutes.
          `,
          importantPoints: [
            'Opening a brokerage account is as simple as a bank account',
            'Compare brokers by fees and convenience',
            'Don\'t delay — time works for the investor'
          ],
          quiz: [
            {
              id: 'q4-2-1',
              question: 'How long does opening a brokerage account usually take?',
              options: ['Several days', '15-30 minutes', 'Several months', 'Cannot be opened independently'],
              correctAnswer: 1,
              explanation: 'Modern brokers allow opening an account online in 15-30 minutes. It\'s no more difficult than opening a bank account.'
            }
          ]
        }
      ],
      moduleTest: [
        {
          id: 'mt4-1',
          question: 'What is the typical ETF fee?',
          options: ['5-10%', '1-3%', '0.03-0.5%', 'ETFs have no fees'],
          correctAnswer: 2
        },
        {
          id: 'mt4-2',
          question: 'Opening a brokerage account usually takes:',
          options: ['Several months', '15-30 minutes', 'Requires visiting tax office', 'Impossible for individuals'],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 'module-5',
      title: 'Getting Started with ETFs',
      description: 'Practical guide to ETF investing and building your first portfolio',
      lessons: [
        {
          id: 'lesson-5-1',
          title: 'Understanding ETF Structure',
          duration: '16 min',
          notes: `
# Understanding ETF Structure

ETFs (Exchange Traded Funds) are investment funds that trade on stock exchanges, similar to individual stocks.

## How ETFs Work
- ETFs hold a basket of securities (stocks, bonds, commodities)
- Shares represent fractional ownership of the entire basket
- Prices fluctuate throughout the trading day
- Can be bought/sold like individual stocks

## Types of ETFs:
1. **Index ETFs** — track market indices (S&P 500, NASDAQ)
2. **Sector ETFs** — focus on specific industries
3. **Bond ETFs** — diversified bond portfolios
4. **Commodity ETFs** — gold, oil, agricultural products
5. **International ETFs** — foreign markets exposure

## Key Advantages
- Instant diversification with single purchase
- Lower fees than mutual funds
- Tax efficiency
- Transparency of holdings
          `,
          importantPoints: [
            'ETFs provide instant diversification with one purchase',
            'ETF fees are typically 0.03-0.5% annually',
            'ETFs trade like stocks throughout the day',
            'Holdings are transparent and disclosed daily'
          ],
          quiz: [
            {
              id: 'q5-1-1',
              question: 'What is the main advantage of ETFs over individual stocks?',
              options: ['Higher returns', 'Instant diversification', 'Guaranteed profits', 'No fees'],
              correctAnswer: 1,
              explanation: 'ETFs provide instant diversification by holding a basket of securities, reducing individual stock risk.'
            },
            {
              id: 'q5-1-2',
              question: 'How often do ETF prices change?',
              options: ['Once per day', 'Throughout trading hours', 'Weekly', 'Monthly'],
              correctAnswer: 1,
              explanation: 'ETFs trade like stocks, so prices fluctuate throughout the trading day based on supply and demand.'
            }
          ]
        },
        {
          id: 'lesson-5-2',
          title: 'Choosing Your First ETFs',
          duration: '18 min',
          notes: `
# Choosing Your First ETFs

## Starting Portfolio Strategy

For beginners, a simple 2-3 ETF portfolio can provide excellent diversification:

### Core Holdings:
1. **Total Stock Market ETF** — broad US market exposure
2. **International Stock ETF** — global diversification
3. **Bond ETF** (optional) — stability and income

## Selection Criteria:
- **Low Expense Ratio** — under 0.2% is excellent
- **High Assets Under Management** — indicates liquidity
- **Long Track Record** — established funds are safer
- **Tax Efficiency** — important for taxable accounts

## Common Beginner Mistakes:
- Over-diversifying with too many ETFs
- Chasing past performance
- Ignoring expense ratios
- Not considering tax implications

## Example Portfolio (Age 30):
- 60% Total Stock Market ETF
- 30% International Stock ETF
- 10% Bond ETF
          `,
          importantPoints: [
            'Start with 2-3 broad market ETFs for simplicity',
            'Expense ratio should be under 0.2% for index ETFs',
            'Avoid over-diversification in early stages',
            'Consider tax implications of ETF selection'
          ],
          quiz: [
            {
              id: 'q5-2-1',
              question: 'What is a good expense ratio for an index ETF?',
              options: ['Under 0.2%', '1-2%', '3-5%', 'Expense ratio doesn\'t matter'],
              correctAnswer: 0,
              explanation: 'Index ETFs should have expense ratios under 0.2%. Lower fees mean more money stays in your pocket.'
            }
          ]
        },
        {
          id: 'lesson-5-3',
          title: 'Making Your First Investment',
          duration: '14 min',
          notes: `
# Making Your First Investment

## Step-by-Step Process:

### 1. Open Brokerage Account
- Choose a reputable broker with low fees
- Complete identity verification
- Fund your account

### 2. Research ETFs
- Review expense ratios
- Check holdings and strategy
- Understand the index being tracked

### 3. Place Your Order
- **Market Order** — executes immediately at current price
- **Limit Order** — sets maximum price you'll pay
- Start with small amounts to learn

### 4. Monitor and Learn
- Track performance over time
- Understand why prices move
- Don't panic over short-term fluctuations

## Dollar-Cost Averaging
Investing fixed amounts regularly (monthly) reduces impact of market timing and builds discipline.

## First Investment Tips:
- Start with $100-500 to learn
- Choose broad market ETFs
- Set up automatic investments
- Focus on long-term, not daily prices
          `,
          importantPoints: [
            'Start with small amounts to learn the process',
            'Dollar-cost averaging reduces timing risk',
            'Focus on long-term goals, not daily fluctuations',
            'Automate investments for consistency'
          ],
          quiz: [
            {
              id: 'q5-3-1',
              question: 'What is dollar-cost averaging?',
              options: ['Investing all money at once', 'Investing fixed amounts regularly', 'Only investing when market is down', 'Investing only in dollars'],
              correctAnswer: 1,
              explanation: 'Dollar-cost averaging means investing fixed amounts at regular intervals, which reduces the impact of market timing.'
            }
          ]
        }
      ],
      moduleTest: [
        {
          id: 'mt5-1',
          question: 'What is the main advantage of ETFs?',
          options: ['Guaranteed returns', 'Instant diversification', 'No fees', 'Tax-free gains'],
          correctAnswer: 1
        },
        {
          id: 'mt5-2',
          question: 'A good expense ratio for an index ETF is:',
          options: ['Under 0.2%', '1-2%', '3-5%', 'Doesn\'t matter'],
          correctAnswer: 0
        }
      ]
    }
  ],
  finalExam: [
    {
      id: 'fe-1-1',
      question: 'What is the formula for real returns?',
      options: ['Nominal + Inflation', 'Nominal - Inflation', 'Nominal × Inflation', 'Inflation - Nominal'],
      correctAnswer: 1,
      explanation: 'Real Return = Nominal Return - Inflation'
    },
    {
      id: 'fe-1-2',
      question: 'Which asset class historically shows the highest real returns?',
      options: ['Bank deposits', 'Cash', 'Stocks', 'Gold'],
      correctAnswer: 2,
      explanation: 'Stocks historically yield 7-10% real returns in the long term.'
    },
    {
      id: 'fe-1-3',
      question: 'What is diversification?',
      options: ['Investing all funds in one asset', 'Distributing investments among different assets', 'Keeping money in bank', 'Buying only bonds'],
      correctAnswer: 1
    },
    {
      id: 'fe-1-4',
      question: 'What is the typical ETF fee compared to bank investment products?',
      options: ['The same', '10-100 times lower', '2 times higher', 'ETFs have no fees'],
      correctAnswer: 1
    },
    {
      id: 'fe-1-5',
      question: 'By the "100 minus age" rule, what percentage of stocks is recommended for a 35-year-old investor?',
      options: ['35%', '65%', '100%', '50%'],
      correctAnswer: 1
    },
    {
      id: 'fe-1-6',
      question: 'What is the inflation risk of a bank deposit?',
      options: ['Risk of bank bankruptcy', 'Risk of losing purchasing power due to inflation', 'Risk of rate change', 'Risk of account blocking'],
      correctAnswer: 1
    },
    {
      id: 'fe-1-7',
      question: 'What liquidity advantage do ETFs have compared to deposits?',
      options: ['ETFs cannot be sold', 'ETFs can be sold instantly without losing accumulated income', 'Same liquidity', 'Deposits are more liquid'],
      correctAnswer: 1
    },
    {
      id: 'fe-1-8',
      question: 'How do banks earn on deposits?',
      options: ['Store money in vault', 'Issue loans at higher interest rates', 'Invest in gold', 'Don\'t earn on deposits'],
      correctAnswer: 1
    },
    {
      id: 'fe-1-9',
      question: 'What investment horizon reduces risks of investing in stocks?',
      options: ['1 month', '1 year', '10+ years', 'Horizon doesn\'t affect risks'],
      correctAnswer: 2
    },
    {
      id: 'fe-1-10',
      question: 'Real return of a 10% deposit with 8% inflation is:',
      options: ['10%', '18%', '2%', '8%'],
      correctAnswer: 2
    }
  ]
},
{
  id: 'portfolio-management',
  title: 'Personal Portfolio Management',
  description: 'Learn to build, manage, and optimize your personal investment portfolio with professional strategies',
  finalExamPassRate: 75,
  modules: [
    {
      id: 'pm-module-1',
      title: 'Portfolio Planning & Goals',
      description: 'Setting investment goals and creating a portfolio plan',
      lessons: [
        {
          id: 'pm-lesson-1-1',
          title: 'Defining Your Investment Goals',
          duration: '15 min',
          notes: `# Defining Your Investment Goals

Investment goals provide direction and help you make consistent decisions. Without clear goals, you'll drift and make emotional choices.

## Types of Goals:
- **Retirement** — long-term wealth accumulation
- **Major Purchase** — house, car, education
- **Emergency Fund** — 3-6 months expenses
- **Wealth Building** — general growth

## SMART Goal Framework:
- **Specific** — "Save $500K for retirement by age 60"
- **Measurable** — track progress monthly
- **Achievable** — realistic given your income
- **Relevant** — aligns with your values
- **Time-bound** — clear deadline

## Goal Prioritization:
1. Emergency fund first
2. High-interest debt payoff
3. Retirement savings
4. Other goals`,
          importantPoints: [
            'Clear goals prevent emotional investing decisions',
            'Prioritize emergency fund and debt before investing',
            'SMART framework makes goals actionable',
            'Review and adjust goals annually'
          ],
          quiz: [
            {
              id: 'pm-q1-1-1',
              question: 'What should you prioritize before investing?',
              options: ['Stocks', 'Emergency fund', 'Real estate', 'Cryptocurrency'],
              correctAnswer: 1,
              explanation: 'Emergency fund provides financial security and prevents needing to sell investments during emergencies.'
            }
          ]
        },
        {
          id: 'pm-lesson-1-2',
          title: 'Time Horizon and Risk Tolerance',
          duration: '18 min',
          notes: `# Time Horizon and Risk Tolerance

## Time Horizon Categories:
- **Short-term** (0-3 years) — conservative, cash/bonds
- **Medium-term** (3-10 years) — balanced approach
- **Long-term** (10+ years) — can take more risk

## Risk Tolerance Assessment:
Ask yourself:
- Can I handle 20-30% portfolio drops?
- Will I panic and sell during downturns?
- How much volatility can I sleep with?

## Risk Capacity vs Risk Tolerance:
- **Risk Capacity** — how much risk you CAN take (based on time, goals)
- **Risk Tolerance** — how much risk you WANT to take (psychological)

Invest at the lower of the two.`,
          importantPoints: [
            'Time horizon determines appropriate risk level',
            'Risk capacity and tolerance are different concepts',
            'Invest at the lower of capacity or tolerance',
            'Longer horizons allow more aggressive strategies'
          ],
          quiz: [
            {
              id: 'pm-q1-2-1',
              question: 'For a 10+ year investment horizon, what asset allocation is typically appropriate?',
              options: ['100% cash', 'Mostly stocks', 'Only bonds', '50/50 stocks/bonds'],
              correctAnswer: 1,
              explanation: 'Long time horizons allow for more aggressive stock allocations since there\'s time to recover from downturns.'
            }
          ]
        },
        {
          id: 'pm-lesson-1-3',
          title: 'Creating Your Investment Plan',
          duration: '20 min',
          notes: `# Creating Your Investment Plan

## Investment Plan Components:
1. **Goals** — what you're investing for
2. **Time Horizon** — when you need the money
3. **Asset Allocation** — stocks/bonds/cash mix
4. **Contribution Schedule** — how much, how often
5. **Rebalancing Rules** — when to adjust

## Sample Plan Template:
- Goal: Retirement at 65
- Current Age: 30
- Time Horizon: 35 years
- Target Allocation: 80% stocks, 20% bonds
- Monthly Contribution: $500
- Rebalance: Annually or when 5% off target

## Document Your Plan:
Write it down! This prevents emotional decisions during market volatility.`,
          importantPoints: [
            'Written investment plan prevents emotional decisions',
            'Include specific allocation targets and rebalancing rules',
            'Review plan annually or when life circumstances change',
            'Stick to the plan during market volatility'
          ],
          quiz: [
            {
              id: 'pm-q1-3-1',
              question: 'How often should you review your investment plan?',
              options: ['Daily', 'Weekly', 'Annually or when circumstances change', 'Never'],
              correctAnswer: 2,
              explanation: 'Review annually or when major life changes occur (marriage, children, job change, etc.).'
            }
          ]
        }
      ],
      moduleTest: [
        {
          id: 'pm-mt1-1',
          question: 'What should be prioritized before investing?',
          options: ['Stocks', 'Emergency fund', 'Real estate', 'Options'],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 'pm-module-2',
      title: 'Asset Allocation Strategies',
      description: 'Learn different approaches to allocating assets in your portfolio',
      lessons: [
        {
          id: 'pm-lesson-2-1',
          title: 'Strategic Asset Allocation',
          duration: '16 min',
          notes: `# Strategic Asset Allocation

Strategic allocation sets long-term targets based on your goals and risk tolerance, then maintains those targets through rebalancing.

## Key Principles:
- Set target percentages for each asset class
- Rebalance when allocations drift
- Focus on long-term, not short-term performance
- Stay disciplined during market volatility

## Example Allocations:
- **Aggressive (Age 25)**: 90% stocks, 10% bonds
- **Moderate (Age 40)**: 70% stocks, 30% bonds
- **Conservative (Age 60)**: 50% stocks, 50% bonds`,
          importantPoints: [
            'Strategic allocation sets long-term targets',
            'Rebalancing maintains target allocations',
            'Allocation should match risk tolerance and time horizon',
            'Stay disciplined to the strategy'
          ],
          quiz: [
            {
              id: 'pm-q2-1-1',
              question: 'What is strategic asset allocation?',
              options: ['Changing allocation daily', 'Setting long-term targets and maintaining them', 'Only investing in stocks', 'Avoiding bonds'],
              correctAnswer: 1,
              explanation: 'Strategic allocation involves setting long-term target allocations and rebalancing to maintain them.'
            }
          ]
        },
        {
          id: 'pm-lesson-2-2',
          title: 'Tactical Asset Allocation',
          duration: '18 min',
          notes: `# Tactical Asset Allocation

Tactical allocation involves short-term adjustments based on market conditions, while maintaining strategic targets as the base.

## When to Use:
- Market appears overvalued in one asset class
- Temporary opportunities arise
- Economic conditions suggest shifts

## Risks:
- Requires market timing (difficult)
- Can lead to underperformance
- Adds complexity and costs

## Best Practice:
Use tactical adjustments sparingly (5-10% of portfolio) and always return to strategic targets.`,
          importantPoints: [
            'Tactical allocation involves short-term adjustments',
            'Use sparingly and return to strategic targets',
            'Requires market timing which is difficult',
            'Keep tactical moves small (5-10% of portfolio)'
          ],
          quiz: [
            {
              id: 'pm-q2-2-1',
              question: 'What percentage of portfolio should tactical adjustments represent?',
              options: ['50%', '5-10%', '100%', '0%'],
              correctAnswer: 1,
              explanation: 'Tactical adjustments should be small (5-10%) to avoid deviating too far from strategic targets.'
            }
          ]
        },
        {
          id: 'pm-lesson-2-3',
          title: 'Core-Satellite Approach',
          duration: '17 min',
          notes: `# Core-Satellite Approach

This strategy combines a stable core (80-90% of portfolio) with smaller satellite positions (10-20%) for opportunities.

## Core Holdings:
- Broad market index ETFs
- Low-cost, diversified
- Long-term hold
- Provides stability

## Satellite Holdings:
- Individual stocks
- Sector-specific ETFs
- International exposure
- Higher risk/reward

## Benefits:
- Stability from core
- Growth potential from satellites
- Flexibility to adjust satellites
- Lower overall risk than all-active`,
          importantPoints: [
            'Core provides stability, satellites provide growth potential',
            'Core should be 80-90% of portfolio',
            'Satellites allow for active management without high risk',
            'Rebalance satellites more frequently than core'
          ],
          quiz: [
            {
              id: 'pm-q2-3-1',
              question: 'What percentage should the core represent in a core-satellite portfolio?',
              options: ['20%', '50%', '80-90%', '100%'],
              correctAnswer: 2,
              explanation: 'The core should represent 80-90% of the portfolio, providing stability and diversification.'
            }
          ]
        },
        {
          id: 'pm-lesson-2-4',
          title: 'Age-Based Allocation Models',
          duration: '15 min',
          notes: `# Age-Based Allocation Models

These models adjust asset allocation based on your age, becoming more conservative over time.

## "100 Minus Age" Rule:
Stocks % = 100 - Your Age
- Age 30: 70% stocks
- Age 50: 50% stocks
- Age 70: 30% stocks

## "120 Minus Age" Rule:
More aggressive for longer life expectancies
- Age 30: 90% stocks
- Age 50: 70% stocks

## Considerations:
- Adjust for personal risk tolerance
- Consider retirement timeline, not just age
- Factor in other income sources
- Review annually`,
          importantPoints: [
            'Age-based models become more conservative over time',
            'Adjust for personal circumstances and risk tolerance',
            'Consider retirement timeline, not just chronological age',
            'Review and adjust annually'
          ],
          quiz: [
            {
              id: 'pm-q2-4-1',
              question: 'By the "100 minus age" rule, what should a 40-year-old allocate to stocks?',
              options: ['40%', '60%', '100%', '0%'],
              correctAnswer: 1,
              explanation: '100 - 40 = 60% stocks, 40% bonds for a 40-year-old investor.'
            }
          ]
        }
      ],
      moduleTest: [
        {
          id: 'pm-mt2-1',
          question: 'What is strategic asset allocation?',
          options: ['Daily changes', 'Long-term targets', 'Only stocks', 'Avoiding bonds'],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 'pm-module-3',
      title: 'Diversification Principles',
      description: 'Master the art of diversifying your portfolio across assets, sectors, and geographies',
      lessons: [
        {
          id: 'pm-lesson-3-1',
          title: 'Types of Diversification',
          duration: '19 min',
          notes: `# Types of Diversification

Diversification reduces risk without necessarily reducing returns. Here are the main types:

## 1. Asset Class Diversification
- Stocks, bonds, cash, commodities
- Different risk/return profiles
- Core of portfolio construction

## 2. Geographic Diversification
- Domestic vs international
- Developed vs emerging markets
- Currency exposure

## 3. Sector Diversification
- Technology, healthcare, finance, etc.
- Avoid concentration in one industry
- Balance cyclical and defensive sectors

## 4. Company Size Diversification
- Large cap, mid cap, small cap
- Different growth characteristics
- Varying volatility levels`,
          importantPoints: [
            'Diversify across asset classes, geography, sectors, and company sizes',
            'Diversification reduces risk without necessarily reducing returns',
            'Avoid over-concentration in any single area',
            'Rebalance to maintain diversification'
          ],
          quiz: [
            {
              id: 'pm-q3-1-1',
              question: 'Which is NOT a type of diversification?',
              options: ['Asset class', 'Geography', 'Putting all money in one stock', 'Sector'],
              correctAnswer: 2,
              explanation: 'Putting all money in one stock is concentration, the opposite of diversification.'
            }
          ]
        },
        {
          id: 'pm-lesson-3-2',
          title: 'The Diversification Sweet Spot',
          duration: '17 min',
          notes: `# The Diversification Sweet Spot

Too little diversification = high risk
Too much diversification = diluted returns

## Optimal Diversification:
- **15-30 individual stocks** for stock picking
- **3-5 ETFs** for ETF-based portfolios
- **Multiple asset classes** (stocks, bonds, maybe commodities)
- **Geographic spread** (domestic + international)

## Diminishing Returns:
Beyond 30 stocks, additional diversification provides minimal risk reduction. Focus on quality over quantity.

## Common Mistakes:
- Over-diversifying (owning 100+ stocks)
- Under-diversifying (owning 1-5 stocks)
- False diversification (owning similar assets)`,
          importantPoints: [
            '15-30 stocks or 3-5 ETFs is typically optimal',
            'Beyond 30 stocks, diversification benefits diminish',
            'Avoid false diversification (similar assets)',
            'Quality matters more than quantity'
          ],
          quiz: [
            {
              id: 'pm-q3-2-1',
              question: 'What is the optimal number of individual stocks for diversification?',
              options: ['1-5', '15-30', '100+', 'As many as possible'],
              correctAnswer: 1,
              explanation: '15-30 stocks provides good diversification without over-complicating the portfolio.'
            }
          ]
        },
        {
          id: 'pm-lesson-3-3',
          title: 'International Diversification',
          duration: '18 min',
          notes: `# International Diversification

Investing globally reduces country-specific risks and provides access to faster-growing economies.

## Benefits:
- Reduces home country bias
- Access to global growth
- Currency diversification
- Lower correlation with domestic markets

## Allocation Guidelines:
- **Conservative**: 20-30% international
- **Moderate**: 30-40% international
- **Aggressive**: 40-50% international

## Implementation:
- Use broad international ETFs
- Consider developed and emerging markets
- Avoid single-country concentration
- Rebalance regularly`,
          importantPoints: [
            'International diversification reduces country-specific risk',
            '20-50% international allocation is typical',
            'Use broad international ETFs for simplicity',
            'Include both developed and emerging markets'
          ],
          quiz: [
            {
              id: 'pm-q3-3-1',
              question: 'What percentage of portfolio should be allocated internationally?',
              options: ['0%', '20-50%', '100%', 'Only emerging markets'],
              correctAnswer: 1,
              explanation: '20-50% international allocation provides good diversification without over-exposure.'
            }
          ]
        },
        {
          id: 'pm-lesson-3-4',
          title: 'Sector and Industry Diversification',
          duration: '16 min',
          notes: `# Sector and Industry Diversification

Avoiding concentration in one sector protects against industry-specific downturns.

## Major Sectors:
- Technology
- Healthcare
- Financials
- Consumer Discretionary
- Consumer Staples
- Energy
- Industrials
- Materials
- Utilities
- Real Estate
- Communication Services

## Balanced Approach:
- No single sector > 25% of portfolio
- Mix cyclical (tech, consumer discretionary) and defensive (utilities, staples)
- Consider economic cycle positioning

## Sector ETFs:
Easy way to gain sector exposure without individual stock picking.`,
          importantPoints: [
            'Avoid concentration in any single sector (>25%)',
            'Balance cyclical and defensive sectors',
            'Consider economic cycle when positioning',
            'Sector ETFs provide easy diversification'
          ],
          quiz: [
            {
              id: 'pm-q3-4-1',
              question: 'What is the maximum recommended allocation to a single sector?',
              options: ['10%', '25%', '50%', '100%'],
              correctAnswer: 1,
              explanation: 'No single sector should exceed 25% of portfolio to maintain proper diversification.'
            }
          ]
        }
      ],
      moduleTest: [
        {
          id: 'pm-mt3-1',
          question: 'What is optimal number of stocks for diversification?',
          options: ['1-5', '15-30', '100+', 'Unlimited'],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 'pm-module-4',
      title: 'Rebalancing Your Portfolio',
      description: 'Learn when and how to rebalance your portfolio to maintain target allocations',
      lessons: [
        {
          id: 'pm-lesson-4-1',
          title: 'Why Rebalancing Matters',
          duration: '14 min',
          notes: `# Why Rebalancing Matters

Over time, market movements cause your portfolio to drift from target allocations. Rebalancing brings it back.

## The Problem:
- Stocks outperform → portfolio becomes stock-heavy
- Risk increases beyond your tolerance
- Original strategy is compromised

## The Solution:
Rebalancing sells winners and buys laggards to restore target allocation.

## Benefits:
- Maintains risk level
- Enforces discipline (buy low, sell high)
- Prevents drift from strategy
- Can improve returns through mean reversion`,
          importantPoints: [
            'Rebalancing maintains target risk level',
            'Prevents portfolio drift from strategy',
            'Enforces buy-low-sell-high discipline',
            'Should be done systematically'
          ],
          quiz: [
            {
              id: 'pm-q4-1-1',
              question: 'What is the main purpose of rebalancing?',
              options: ['Maximize returns', 'Maintain target allocation', 'Avoid taxes', 'Time the market'],
              correctAnswer: 1,
              explanation: 'Rebalancing maintains your target asset allocation and risk level.'
            }
          ]
        },
        {
          id: 'pm-lesson-4-2',
          title: 'Rebalancing Strategies',
          duration: '18 min',
          notes: `# Rebalancing Strategies

## 1. Calendar-Based (Time-Based)
- Rebalance on fixed schedule (quarterly, semi-annually, annually)
- Simple and systematic
- May miss significant drifts between dates

## 2. Threshold-Based (Percentage-Based)
- Rebalance when allocation drifts by X% (typically 5%)
- More responsive to market movements
- Requires monitoring

## 3. Hybrid Approach
- Check quarterly
- Rebalance if drift > 5%
- Combines benefits of both

## Best Practice:
For most investors, annual rebalancing with 5% threshold works well.`,
          importantPoints: [
            'Calendar-based: fixed schedule (annual recommended)',
            'Threshold-based: rebalance when drift > 5%',
            'Hybrid approach combines both methods',
            'Annual rebalancing with 5% threshold is common'
          ],
          quiz: [
            {
              id: 'pm-q4-2-1',
              question: 'What is a common rebalancing threshold?',
              options: ['1%', '5%', '20%', '50%'],
              correctAnswer: 1,
              explanation: 'A 5% drift threshold is commonly used before triggering rebalancing.'
            }
          ]
        },
        {
          id: 'pm-lesson-4-3',
          title: 'Tax-Efficient Rebalancing',
          duration: '16 min',
          notes: `# Tax-Efficient Rebalancing

Rebalancing can trigger taxes. Here's how to minimize the impact:

## Strategies:
1. **Use New Contributions** — direct new money to underweighted assets
2. **Rebalance in Tax-Advantaged Accounts** — 401(k), IRA (no tax impact)
3. **Harvest Losses** — sell losers to offset gains
4. **Avoid Frequent Trading** — reduces tax drag

## Tax-Loss Harvesting:
Sell losing positions to realize losses, then buy similar (not identical) assets to maintain allocation while capturing tax benefit.

## Best Practice:
Rebalance primarily in tax-advantaged accounts. Use taxable accounts for new contributions and loss harvesting.`,
          importantPoints: [
            'Rebalance in tax-advantaged accounts when possible',
            'Use new contributions to rebalance without selling',
            'Tax-loss harvesting can offset gains',
            'Avoid frequent trading in taxable accounts'
          ],
          quiz: [
            {
              id: 'pm-q4-3-1',
              question: 'Where is the best place to rebalance?',
              options: ['Taxable accounts', 'Tax-advantaged accounts', 'Both equally', 'Doesn\'t matter'],
              correctAnswer: 1,
              explanation: 'Tax-advantaged accounts (401k, IRA) allow rebalancing without tax consequences.'
            }
          ]
        }
      ],
      moduleTest: [
        {
          id: 'pm-mt4-1',
          question: 'What is a common rebalancing threshold?',
          options: ['1%', '5%', '20%', '50%'],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 'pm-module-5',
      title: 'Tax-Efficient Investing',
      description: 'Strategies to minimize taxes and maximize after-tax returns',
      lessons: [
        {
          id: 'pm-lesson-5-1',
          title: 'Understanding Investment Taxes',
          duration: '17 min',
          notes: `# Understanding Investment Taxes

Different investments and accounts have different tax treatments.

## Taxable Events:
- **Dividends** — taxed as ordinary income or qualified dividends
- **Capital Gains** — short-term (<1 year) vs long-term (≥1 year)
- **Interest** — taxed as ordinary income
- **Distributions** — from mutual funds/ETFs

## Tax Rates:
- **Short-term gains**: Ordinary income tax rate (up to 37%)
- **Long-term gains**: 0%, 15%, or 20% (depending on income)
- **Qualified dividends**: Long-term capital gains rates
- **Ordinary dividends**: Ordinary income rates`,
          importantPoints: [
            'Long-term gains (≥1 year) have lower tax rates',
            'Qualified dividends receive preferential treatment',
            'Hold investments >1 year for tax benefits',
            'Understand tax implications before investing'
          ],
          quiz: [
            {
              id: 'pm-q5-1-1',
              question: 'What is the holding period for long-term capital gains?',
              options: ['30 days', '6 months', '1 year', '5 years'],
              correctAnswer: 2,
              explanation: 'Long-term capital gains require holding an investment for at least 1 year.'
            }
          ]
        },
        {
          id: 'pm-lesson-5-2',
          title: 'Tax-Advantaged Accounts',
          duration: '19 min',
          notes: `# Tax-Advantaged Accounts

These accounts provide tax benefits that can significantly boost returns over time.

## Types:
1. **401(k) / 403(b)** — employer-sponsored, pre-tax contributions
2. **Traditional IRA** — pre-tax contributions, tax-deferred growth
3. **Roth IRA** — after-tax contributions, tax-free growth
4. **HSA** — triple tax advantage (health savings)

## Contribution Limits (2024):
- 401(k): $23,000 ($30,500 if 50+)
- IRA: $7,000 ($8,000 if 50+)
- HSA: $4,150 individual, $8,300 family

## Strategy:
Maximize employer match first, then Roth IRA, then max 401(k), then taxable accounts.`,
          importantPoints: [
            'Maximize employer 401(k) match first (free money)',
            'Roth IRA offers tax-free growth',
            'Traditional accounts offer tax-deferred growth',
            'Contribute to tax-advantaged accounts before taxable'
          ],
          quiz: [
            {
              id: 'pm-q5-2-1',
              question: 'What should you prioritize first?',
              options: ['Taxable account', 'Employer 401(k) match', 'Roth IRA', 'HSA'],
              correctAnswer: 1,
              explanation: 'Always maximize employer 401(k) match first - it\'s free money and immediate return.'
            }
          ]
        },
        {
          id: 'pm-lesson-5-3',
          title: 'Asset Location Strategy',
          duration: '16 min',
          notes: `# Asset Location Strategy

Place investments in accounts where they're most tax-efficient.

## General Rules:
- **Tax-inefficient assets** (bonds, REITs) → tax-advantaged accounts
- **Tax-efficient assets** (index ETFs, growth stocks) → taxable accounts
- **High-turnover funds** → tax-advantaged accounts
- **Low-turnover index funds** → taxable accounts

## Why It Matters:
Proper asset location can save 0.5-1% annually in taxes, which compounds significantly over time.

## Example:
- Taxable: Total stock market ETF, international ETF
- 401(k)/IRA: Bond funds, REITs, high-dividend stocks`,
          importantPoints: [
            'Place tax-inefficient assets in tax-advantaged accounts',
            'Place tax-efficient assets in taxable accounts',
            'Asset location can save 0.5-1% annually',
            'Consider tax efficiency when choosing investments'
          ],
          quiz: [
            {
              id: 'pm-q5-3-1',
              question: 'Where should bond funds typically be held?',
              options: ['Taxable account', 'Tax-advantaged account', 'Doesn\'t matter', 'Only in Roth'],
              correctAnswer: 1,
              explanation: 'Bonds generate interest income taxed as ordinary income, so they\'re better in tax-advantaged accounts.'
            }
          ]
        }
      ],
      moduleTest: [
        {
          id: 'pm-mt5-1',
          question: 'What should you prioritize first?',
          options: ['Taxable', '401(k) match', 'Roth', 'HSA'],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 'pm-module-6',
      title: 'Monitoring & Adjusting',
      description: 'How to monitor your portfolio and make adjustments over time',
      lessons: [
        {
          id: 'pm-lesson-6-1',
          title: 'Portfolio Monitoring Basics',
          duration: '15 min',
          notes: `# Portfolio Monitoring Basics

Regular monitoring ensures your portfolio stays on track, but avoid over-monitoring.

## What to Monitor:
- **Asset allocation** — staying near targets?
- **Performance** — meeting goals?
- **Individual holdings** — any red flags?
- **Contributions** — on schedule?

## Monitoring Frequency:
- **Daily**: Too frequent, leads to emotional decisions
- **Weekly**: Still too frequent
- **Monthly**: Good for checking contributions
- **Quarterly**: Good for performance review
- **Annually**: Perfect for rebalancing and strategy review

## Red Flags:
- Consistent underperformance vs benchmarks
- Major allocation drift
- Individual holdings with problems
- Life circumstances changed`,
          importantPoints: [
            'Monitor quarterly for performance, annually for strategy',
            'Avoid daily monitoring (leads to emotional decisions)',
            'Watch for allocation drift and underperformance',
            'Review when life circumstances change'
          ],
          quiz: [
            {
              id: 'pm-q6-1-1',
              question: 'How often should you review portfolio strategy?',
              options: ['Daily', 'Weekly', 'Annually', 'Never'],
              correctAnswer: 2,
              explanation: 'Annual strategy review is appropriate, with quarterly performance checks.'
            }
          ]
        },
        {
          id: 'pm-lesson-6-2',
          title: 'When to Make Adjustments',
          duration: '17 min',
          notes: `# When to Make Adjustments

Not every market move requires action. Know when to adjust vs when to stay the course.

## Good Reasons to Adjust:
- **Life changes** — marriage, children, job loss, inheritance
- **Goal changes** — retirement date moved, new goals
- **Risk tolerance changed** — can't sleep with current risk
- **Major allocation drift** — >10% from targets
- **Tax optimization** — tax-loss harvesting opportunity

## Bad Reasons to Adjust:
- **Short-term market movements** — normal volatility
- **Emotional reactions** — fear or greed
- **Chasing performance** — buying what's hot
- **Market timing** — trying to predict direction

## Rule of Thumb:
If you're considering a change, wait 30 days. If it still makes sense, proceed.`,
          importantPoints: [
            'Adjust for life changes and goal changes, not market moves',
            'Wait 30 days before making emotional decisions',
            'Avoid chasing performance or timing markets',
            'Major allocation drift (>10%) may warrant adjustment'
          ],
          quiz: [
            {
              id: 'pm-q6-2-1',
              question: 'What is a good reason to adjust your portfolio?',
              options: ['Market dropped 5%', 'Life circumstances changed', 'Stock went up', 'Friend recommended it'],
              correctAnswer: 1,
              explanation: 'Life circumstances (marriage, children, job change) are valid reasons to adjust strategy.'
            }
          ]
        },
        {
          id: 'pm-lesson-6-3',
          title: 'Performance Evaluation',
          duration: '18 min',
          notes: `# Performance Evaluation

Evaluating performance correctly prevents bad decisions and keeps you on track.

## What to Compare:
- **Your portfolio** vs **appropriate benchmark**
- **After-tax returns** (what you actually keep)
- **Risk-adjusted returns** (returns per unit of risk)
- **Goal progress** (on track for goals?)

## Common Mistakes:
- Comparing to wrong benchmark
- Focusing on short-term (1-3 months)
- Ignoring taxes and fees
- Comparing to best-performing asset

## Timeframes:
- **Short-term** (<1 year): Mostly noise, ignore
- **Medium-term** (1-3 years): Some signal, monitor
- **Long-term** (3+ years): Real performance, evaluate

## Benchmark Examples:
- Total stock market → S&P 500 or Total Market Index
- 60/40 portfolio → 60% S&P 500, 40% Bond Index`,
          importantPoints: [
            'Compare to appropriate benchmarks, not best performers',
            'Evaluate long-term (3+ years), ignore short-term noise',
            'Consider after-tax returns and risk-adjusted returns',
            'Focus on goal progress, not just returns'
          ],
          quiz: [
            {
              id: 'pm-q6-3-1',
              question: 'What timeframe should you use to evaluate performance?',
              options: ['1 month', '1 year', '3+ years', 'Daily'],
              correctAnswer: 2,
              explanation: 'Long-term performance (3+ years) provides meaningful evaluation. Short-term is mostly noise.'
            }
          ]
        }
      ],
      moduleTest: [
        {
          id: 'pm-mt6-1',
          question: 'How often review strategy?',
          options: ['Daily', 'Weekly', 'Annually', 'Never'],
          correctAnswer: 2
        }
      ]
    }
  ],
  finalExam: [
    {
      id: 'pm-fe-1',
      question: 'What should be prioritized before investing?',
      options: ['Stocks', 'Emergency fund', 'Real estate', 'Cryptocurrency'],
      correctAnswer: 1
    },
    {
      id: 'pm-fe-2',
      question: 'What is strategic asset allocation?',
      options: ['Daily changes', 'Long-term targets', 'Only stocks', 'Avoiding bonds'],
      correctAnswer: 1
    },
    {
      id: 'pm-fe-3',
      question: 'Optimal number of stocks for diversification?',
      options: ['1-5', '15-30', '100+', 'Unlimited'],
      correctAnswer: 1
    },
    {
      id: 'pm-fe-4',
      question: 'Common rebalancing threshold?',
      options: ['1%', '5%', '20%', '50%'],
      correctAnswer: 1
    },
    {
      id: 'pm-fe-5',
      question: 'What should you prioritize first?',
      options: ['Taxable account', '401(k) match', 'Roth IRA', 'HSA'],
      correctAnswer: 1
    },
    {
      id: 'pm-fe-6',
      question: 'How often review portfolio strategy?',
      options: ['Daily', 'Weekly', 'Annually', 'Never'],
      correctAnswer: 2
    },
    {
      id: 'pm-fe-7',
      question: 'What is a good reason to adjust portfolio?',
      options: ['Market dropped 5%', 'Life circumstances changed', 'Stock went up', 'Friend recommended'],
      correctAnswer: 1
    },
    {
      id: 'pm-fe-8',
      question: 'What timeframe for performance evaluation?',
      options: ['1 month', '1 year', '3+ years', 'Daily'],
      correctAnswer: 2
    },
    {
      id: 'pm-fe-9',
      question: 'By "100 minus age" rule, 40-year-old should have?',
      options: ['40% stocks', '60% stocks', '100% stocks', '0% stocks'],
      correctAnswer: 1
    },
    {
      id: 'pm-fe-10',
      question: 'Where should bond funds typically be held?',
      options: ['Taxable account', 'Tax-advantaged account', 'Doesn\'t matter', 'Only Roth'],
      correctAnswer: 1
    }
  ]
},
{
  id: 'technical-analysis',
  title: 'Technical Analysis Mastery',
  description: 'Master chart patterns, indicators, and trading signals to time your market entries and exits',
  finalExamPassRate: 75,
  modules: [
    {
      id: 'ta-module-1',
      title: 'Chart Basics & Patterns',
      description: 'Understanding price charts and recognizing common patterns',
      lessons: [
        {
          id: 'ta-lesson-1-1',
          title: 'Reading Price Charts',
          duration: '16 min',
          notes: `# Reading Price Charts\n\nPrice charts are the foundation of technical analysis. Understanding them is essential.\n\n## Chart Types:\n- **Line Chart** — closing prices connected\n- **Bar Chart** — OHLC (Open, High, Low, Close)\n- **Candlestick** — visual representation of price action\n\n## Timeframes:\n- **Intraday** — 1min, 5min, 15min, 1hr\n- **Daily** — most common for swing trading\n- **Weekly/Monthly** — for long-term trends\n\n## Key Elements:\n- Price on Y-axis\n- Time on X-axis\n- Volume (usually below price)\n- Indicators (overlay or separate panel)`,
          importantPoints: ['Candlestick charts provide most information', 'Choose timeframe matching your trading style', 'Volume confirms price movements', 'Multiple timeframes provide context'],
          quiz: [{
            id: 'ta-q1-1-1',
            question: 'What chart type provides the most visual information?',
            options: ['Line chart', 'Bar chart', 'Candlestick', 'All equal'],
            correctAnswer: 2,
            explanation: 'Candlestick charts show open, high, low, and close in an easy-to-read visual format.'
          }]
        },
        {
          id: 'ta-lesson-1-2',
          title: 'Support and Resistance Levels',
          duration: '18 min',
          notes: `# Support and Resistance Levels\n\nSupport and resistance are key concepts in technical analysis.\n\n## Support:\nPrice level where buying interest is strong enough to prevent further decline. Acts as a "floor."\n\n## Resistance:\nPrice level where selling interest is strong enough to prevent further advance. Acts as a "ceiling."\n\n## Characteristics:\n- **Stronger levels** — tested multiple times, longer timeframes\n- **Psychological levels** — round numbers (100, 50, etc.)\n- **Dynamic levels** — moving averages, trendlines\n\n## Trading Applications:\n- Buy near support, sell near resistance\n- Breakouts above resistance = bullish\n- Breakdowns below support = bearish`,
          importantPoints: ['Support prevents price decline, resistance prevents advance', 'Multiple touches make levels stronger', 'Round numbers often act as psychological levels', 'Breakouts/breakdowns signal trend changes'],
          quiz: [{
            id: 'ta-q1-2-1',
            question: 'What is support?',
            options: ['Price ceiling', 'Price floor', 'Moving average', 'Volume indicator'],
            correctAnswer: 1,
            explanation: 'Support is a price level where buying interest prevents further decline, acting as a floor.'
          }]
        },
        {
          id: 'ta-lesson-1-3',
          title: 'Common Chart Patterns',
          duration: '20 min',
          notes: `# Common Chart Patterns\n\nChart patterns help identify potential price movements and trend continuations or reversals.\n\n## Reversal Patterns:\n- **Head and Shoulders** — bearish reversal\n- **Double Top/Bottom** — reversal signal\n- **Triple Top/Bottom** — strong reversal\n\n## Continuation Patterns:\n- **Triangles** — ascending, descending, symmetrical\n- **Flags and Pennants** — brief consolidation\n- **Wedges** — converging trendlines\n\n## Pattern Recognition:\n- **Neckline** — breakout level\n- **Target** — measured move (height of pattern)\n- **Volume** — should confirm pattern\n\n## Trading Patterns:\nWait for confirmation (breakout) before entering trades.`,
          importantPoints: ['Patterns signal reversals or continuations', 'Wait for breakout confirmation before trading', 'Volume should confirm pattern completion', 'Measure pattern height for price targets'],
          quiz: [{
            id: 'ta-q1-3-1',
            question: 'What should you wait for before trading a pattern?',
            options: ['Pattern formation', 'Breakout confirmation', 'Volume spike', 'All of the above'],
            correctAnswer: 1,
            explanation: 'Always wait for breakout confirmation before entering a trade based on a pattern.'
          }]
        },
        {
          id: 'ta-lesson-1-4',
          title: 'Trend Identification',
          duration: '17 min',
          notes: `# Trend Identification\n\n"The trend is your friend" — one of the most important principles in trading.\n\n## Trend Types:\n- **Uptrend** — higher highs, higher lows\n- **Downtrend** — lower highs, lower lows\n- **Sideways/Range** — no clear direction\n\n## Trend Strength:\n- **Strong** — steep angle, consistent direction\n- **Weak** — shallow angle, choppy movement\n- **Exhausted** — losing momentum, potential reversal\n\n## Trendlines:\nDraw connecting higher lows (uptrend) or lower highs (downtrend). Break of trendline may signal reversal.\n\n## Trading with Trends:\n- Trade in direction of trend (higher probability)\n- Wait for pullbacks in uptrends\n- Avoid counter-trend trades (lower probability)`,
          importantPoints: ['Trade with the trend, not against it', 'Uptrend = higher highs and higher lows', 'Trendline breaks may signal reversals', 'Strong trends offer best trading opportunities'],
          quiz: [{
            id: 'ta-q1-4-1',
            question: 'What defines an uptrend?',
            options: ['Higher highs, higher lows', 'Lower highs, lower lows', 'Sideways movement', 'Volume increase'],
            correctAnswer: 0,
            explanation: 'An uptrend is characterized by higher highs and higher lows, showing consistent upward movement.'
          }]
        }
      ],
      moduleTest: [{
        id: 'ta-mt1-1',
        question: 'What chart type provides most information?',
        options: ['Line', 'Bar', 'Candlestick', 'All equal'],
        correctAnswer: 2
      }]
    },
    {
      id: 'ta-module-2',
      title: 'Technical Indicators',
      description: 'Learn to use technical indicators to confirm signals and identify opportunities',
      lessons: [
        {
          id: 'ta-lesson-2-1',
          title: 'Moving Averages',
          duration: '16 min',
          notes: `# Moving Averages\n\nMoving averages smooth price data to identify trends and generate signals.\n\n## Types:\n- **Simple Moving Average (SMA)** — average of closing prices\n- **Exponential Moving Average (EMA)** — gives more weight to recent prices\n\n## Common Periods:\n- **50-day** — medium-term trend\n- **200-day** — long-term trend\n- **20-day** — short-term trend\n\n## Trading Signals:\n- **Golden Cross** — 50 crosses above 200 (bullish)\n- **Death Cross** — 50 crosses below 200 (bearish)\n- **Price above MA** — uptrend\n- **Price below MA** — downtrend`,
          importantPoints: ['Moving averages smooth price data', 'EMA reacts faster than SMA', '200-day MA is key long-term trend indicator', 'Crossovers generate trading signals'],
          quiz: [{
            id: 'ta-q2-1-1',
            question: 'What is a golden cross?',
            options: ['50 MA below 200 MA', '50 MA above 200 MA', 'Price above MA', 'Volume spike'],
            correctAnswer: 1,
            explanation: 'Golden cross occurs when 50-day MA crosses above 200-day MA, signaling bullish trend.'
          }]
        },
        {
          id: 'ta-lesson-2-2',
          title: 'RSI (Relative Strength Index)',
          duration: '18 min',
          notes: `# RSI (Relative Strength Index)\n\nRSI measures momentum and identifies overbought/oversold conditions.\n\n## Calculation:\nRSI = 100 - (100 / (1 + RS))\nRS = Average Gain / Average Loss (over 14 periods)\n\n## Interpretation:\n- **Above 70** — overbought (potential sell)\n- **Below 30** — oversold (potential buy)\n- **50** — neutral\n\n## Trading Signals:\n- **Oversold bounce** — RSI < 30, then rises\n- **Overbought pullback** — RSI > 70, then falls\n- **Divergence** — price makes new high, RSI doesn't (bearish)\n\n## Best Practices:\nRSI works best in ranging markets. In strong trends, RSI can stay overbought/oversold.`,
          importantPoints: ['RSI measures momentum (0-100 scale)', 'Above 70 = overbought, below 30 = oversold', 'Divergence signals potential reversals', 'Works best in ranging, not trending markets'],
          quiz: [{
            id: 'ta-q2-2-1',
            question: 'What does RSI above 70 indicate?',
            options: ['Oversold', 'Overbought', 'Neutral', 'Strong trend'],
            correctAnswer: 1,
            explanation: 'RSI above 70 indicates overbought conditions, suggesting potential pullback.'
          }]
        },
        {
          id: 'ta-lesson-2-3',
          title: 'MACD (Moving Average Convergence Divergence)',
          duration: '19 min',
          notes: `# MACD (Moving Average Convergence Divergence)\n\nMACD is a trend-following momentum indicator.\n\n## Components:\n- **MACD Line** — 12 EMA minus 26 EMA\n- **Signal Line** — 9 EMA of MACD line\n- **Histogram** — difference between MACD and signal\n\n## Trading Signals:\n- **Bullish Crossover** — MACD crosses above signal (buy)\n- **Bearish Crossover** — MACD crosses below signal (sell)\n- **Zero Line Cross** — MACD crosses above/below zero\n- **Divergence** — price and MACD move opposite\n\n## Best Uses:\n- Trend identification\n- Entry/exit timing\n- Momentum confirmation`,
          importantPoints: ['MACD combines trend and momentum', 'Crossovers generate buy/sell signals', 'Histogram shows momentum strength', 'Divergence signals potential reversals'],
          quiz: [{
            id: 'ta-q2-3-1',
            question: 'What is a bullish MACD signal?',
            options: ['MACD below signal', 'MACD above signal', 'MACD at zero', 'Histogram negative'],
            correctAnswer: 1,
            explanation: 'MACD crossing above signal line is a bullish crossover, suggesting upward momentum.'
          }]
        },
        {
          id: 'ta-lesson-2-4',
          title: 'Bollinger Bands',
          duration: '17 min',
          notes: `# Bollinger Bands\n\nBollinger Bands measure volatility and identify potential reversal points.\n\n## Components:\n- **Middle Band** — 20-period SMA\n- **Upper Band** — Middle + (2 × Standard Deviation)\n- **Lower Band** — Middle - (2 × Standard Deviation)\n\n## Interpretation:\n- **Wide Bands** — high volatility\n- **Narrow Bands** — low volatility (often precedes big moves)\n- **Price touches upper** — potentially overbought\n- **Price touches lower** — potentially oversold\n\n## Trading Signals:\n- **Squeeze** — bands narrow (volatility contraction, often precedes expansion)\n- **Bounce** — price bounces off bands\n- **Breakout** — price breaks through bands (trend continuation)\n\n## Best Practice:\nUse with other indicators for confirmation.`,
          importantPoints: ['Bollinger Bands measure volatility', 'Narrow bands (squeeze) often precede big moves', 'Price touching bands suggests overbought/oversold', 'Use with other indicators for confirmation'],
          quiz: [{
            id: 'ta-q2-4-1',
            question: 'What does narrow Bollinger Bands indicate?',
            options: ['High volatility', 'Low volatility', 'Strong trend', 'Reversal'],
            correctAnswer: 1,
            explanation: 'Narrow bands indicate low volatility, often preceding significant price movements (volatility expansion).'
          }]
        }
      ],
      moduleTest: [{
        id: 'ta-mt2-1',
        question: 'What is golden cross?',
        options: ['50 below 200', '50 above 200', 'Price above MA', 'Volume spike'],
        correctAnswer: 1
      }]
    },
    {
      id: 'ta-module-3',
      title: 'Support & Resistance',
      description: 'Master identifying and trading support and resistance levels',
      lessons: [
        {
          id: 'ta-lesson-3-1',
          title: 'Identifying Key Levels',
          duration: '16 min',
          notes: `# Identifying Key Levels\n\nStrong support/resistance levels are crucial for trading decisions.\n\n## What Makes Levels Strong:\n- **Multiple touches** — price tested level several times\n- **Longer timeframes** — weekly/monthly levels stronger than daily\n- **Round numbers** — psychological levels (100, 50, etc.)\n- **Previous highs/lows** — historical significance\n- **Volume** — high volume at level increases importance\n\n## Drawing Levels:\n- Draw horizontal lines at key price points\n- Extend lines to future (projection)\n- Adjust as new information arrives\n- Don't force levels where they don't exist`,
          importantPoints: ['Multiple touches make levels stronger', 'Longer timeframe levels are more significant', 'Round numbers often act as psychological levels', 'High volume at level increases importance'],
          quiz: [{
            id: 'ta-q3-1-1',
            question: 'What makes a support/resistance level strong?',
            options: ['Single touch', 'Multiple touches', 'Low volume', 'Short timeframe'],
            correctAnswer: 1,
            explanation: 'Multiple touches indicate strong support/resistance as price respects the level repeatedly.'
          }]
        },
        {
          id: 'ta-lesson-3-2',
          title: 'Trading Support and Resistance',
          duration: '18 min',
          notes: `# Trading Support and Resistance\n\nSupport and resistance levels provide high-probability trading opportunities.\n\n## Trading at Support:\n- **Buy** when price approaches support\n- **Stop loss** below support level\n- **Target** at next resistance\n- **Wait for confirmation** — bounce, not just touch\n\n## Trading at Resistance:\n- **Sell** when price approaches resistance\n- **Stop loss** above resistance level\n- **Target** at next support\n- **Wait for confirmation** — rejection, not just touch\n\n## Breakout Trading:\n- **Wait for confirmation** — close above/below level\n- **Volume** should increase on breakout\n- **Target** — measured move (height of range)\n- **False breakouts** are common — be cautious`,
          importantPoints: ['Wait for confirmation before trading levels', 'Use stop losses beyond support/resistance', 'Volume should confirm breakouts', 'False breakouts are common — be patient'],
          quiz: [{
            id: 'ta-q3-2-1',
            question: 'What should you wait for when trading support?',
            options: ['Price touch', 'Bounce confirmation', 'Volume decrease', 'Moving average'],
            correctAnswer: 1,
            explanation: 'Wait for bounce confirmation at support, not just a price touch, to avoid false signals.'
          }]
        },
        {
          id: 'ta-lesson-3-3',
          title: 'Dynamic Support and Resistance',
          duration: '17 min',
          notes: `# Dynamic Support and Resistance\n\nMoving averages and trendlines provide dynamic (changing) support/resistance.\n\n## Moving Averages as Support/Resistance:\n- **Price above MA** — MA acts as support\n- **Price below MA** — MA acts as resistance\n- **Stronger MAs** — 50-day, 200-day most significant\n- **Multiple MAs** — confluence increases strength\n\n## Trendlines:\n- **Uptrend line** — connects higher lows (support)\n- **Downtrend line** — connects lower highs (resistance)\n- **Break of trendline** — potential trend change\n\n## Trading Dynamic Levels:\n- Similar to static levels\n- Levels move with price\n- More flexible than fixed levels\n- Combine with static levels for confluence`,
          importantPoints: ['Moving averages provide dynamic support/resistance', '200-day MA is most significant', 'Trendlines connect swing highs/lows', 'Confluence of multiple levels increases strength'],
          quiz: [{
            id: 'ta-q3-3-1',
            question: 'What is dynamic support/resistance?',
            options: ['Fixed price level', 'Moving average or trendline', 'Volume level', 'Time-based'],
            correctAnswer: 1,
            explanation: 'Dynamic support/resistance moves with price, such as moving averages or trendlines.'
          }]
        }
      ],
      moduleTest: [{
        id: 'ta-mt3-1',
        question: 'What makes level strong?',
        options: ['Single touch', 'Multiple touches', 'Low volume', 'Short timeframe'],
        correctAnswer: 1
      }]
    },
    {
      id: 'ta-module-4',
      title: 'Trend Analysis',
      description: 'Learn to identify and trade with market trends',
      lessons: [
        {
          id: 'ta-lesson-4-1',
          title: 'Trend Types and Characteristics',
          duration: '17 min',
          notes: `# Trend Types and Characteristics\n\nUnderstanding trends is fundamental to profitable trading.\n\n## Primary Trends:\n- **Uptrend** — series of higher highs and higher lows\n- **Downtrend** — series of lower highs and lower lows\n- **Sideways/Range** — no clear direction, consolidation\n\n## Trend Strength:\n- **Strong** — steep angle, consistent direction, high volume\n- **Moderate** — steady angle, some choppiness\n- **Weak** — shallow angle, choppy, low volume\n\n## Trend Duration:\n- **Primary** — months to years (major trend)\n- **Intermediate** — weeks to months (corrections within primary)\n- **Short-term** — days to weeks (noise within intermediate)\n\n## Trading Implications:\n- Trade with primary trend (highest probability)\n- Use intermediate trends for entries\n- Ignore short-term noise`,
          importantPoints: ['Primary trends last months to years', 'Trade with the primary trend', 'Strong trends have steep angles and high volume', 'Use intermediate trends for entry timing'],
          quiz: [{
            id: 'ta-q4-1-1',
            question: 'What should you trade with?',
            options: ['Short-term noise', 'Intermediate corrections', 'Primary trend', 'All trends equally'],
            correctAnswer: 2,
            explanation: 'Trade with the primary trend for highest probability of success.'
          }]
        },
        {
          id: 'ta-lesson-4-2',
          title: 'Trend Following Strategies',
          duration: '19 min',
          notes: `# Trend Following Strategies\n\nTrend following is one of the most reliable trading approaches.\n\n## Core Principles:\n- **Trend is your friend** — trade with it, not against\n- **Let winners run** — don't exit too early\n- **Cut losses quickly** — stop losses are essential\n- **Patience** — wait for setups, don't force trades\n\n## Entry Strategies:\n1. **Pullback Entry** — buy dips in uptrend\n2. **Breakout Entry** — buy breakouts above resistance\n3. **Moving Average Bounce** — buy bounces off MA\n4. **Trendline Touch** — buy touches of uptrend line\n\n## Exit Strategies:\n- **Trailing stop** — follows price upward\n- **Resistance target** — exit at next resistance\n- **Trendline break** — exit when trendline breaks\n- **Profit target** — measured move or % gain`,
          importantPoints: ['Trade with the trend, not against it', 'Use pullbacks for entries in uptrends', 'Trailing stops let winners run', 'Cut losses quickly with stop losses'],
          quiz: [{
            id: 'ta-q4-2-1',
            question: 'What is best entry in uptrend?',
            options: ['Buy at top', 'Buy on pullback', 'Buy on breakdown', 'Buy randomly'],
            correctAnswer: 1,
            explanation: 'Buying pullbacks in uptrends provides better entry prices and risk/reward ratios.'
          }]
        },
        {
          id: 'ta-lesson-4-3',
          title: 'Trend Reversal Signals',
          duration: '18 min',
          notes: `# Trend Reversal Signals\n\nIdentifying trend reversals early can be highly profitable.\n\n## Reversal Patterns:\n- **Head and Shoulders** — classic reversal\n- **Double Top/Bottom** — reversal signal\n- **Failed Breakout** — trend exhaustion\n\n## Indicator Signals:\n- **Divergence** — price makes new high, indicator doesn't\n- **Overbought/Oversold** — extreme RSI readings\n- **Moving Average Cross** — death cross, golden cross\n\n## Volume Confirmation:\n- **Increasing volume** on reversal — stronger signal\n- **Decreasing volume** on trend — potential exhaustion\n- **Volume spike** at reversal point\n\n## Best Practice:\nWait for confirmation. One signal isn't enough — look for confluence.`,
          importantPoints: ['Multiple signals increase reversal probability', 'Volume should confirm reversals', 'Divergence signals potential reversals', 'Wait for confirmation before acting'],
          quiz: [{
            id: 'ta-q4-3-1',
            question: 'What confirms a reversal signal?',
            options: ['Single indicator', 'Price pattern only', 'Multiple signals and volume', 'Time alone'],
            correctAnswer: 2,
            explanation: 'Multiple signals with volume confirmation provide stronger reversal signals than single indicators.'
          }]
        },
        {
          id: 'ta-lesson-4-4',
          title: 'Multiple Timeframe Analysis',
          duration: '16 min',
          notes: `# Multiple Timeframe Analysis\n\nAnalyzing multiple timeframes provides context and improves trade quality.\n\n## Timeframe Hierarchy:\n- **Higher timeframe** — determines overall trend\n- **Lower timeframe** — provides entry timing\n- **Middle timeframe** — confirmation\n\n## Example Setup:\n- **Weekly** — primary trend (uptrend)\n- **Daily** — intermediate trend (pullback)\n- **4-hour** — entry timing (bounce from support)\n\n## Trading Rules:\n- **Trade higher timeframe direction** — if weekly is up, only buy\n- **Use lower timeframe for entries** — better prices\n- **Confirm with middle timeframe** — increases probability\n\n## Benefits:\n- Better entry prices\n- Higher probability trades\n- Clearer trend context\n- Reduced false signals`,
          importantPoints: ['Higher timeframe determines trend direction', 'Lower timeframe provides entry timing', 'Trade in direction of higher timeframe', 'Multiple timeframes reduce false signals'],
          quiz: [{
            id: 'ta-q4-4-1',
            question: 'What does higher timeframe determine?',
            options: ['Entry price', 'Overall trend', 'Stop loss', 'Profit target'],
            correctAnswer: 1,
            explanation: 'Higher timeframe determines the overall trend direction, which should guide trading decisions.'
          }]
        }
      ],
      moduleTest: [{
        id: 'ta-mt4-1',
        question: 'What should you trade with?',
        options: ['Noise', 'Corrections', 'Primary trend', 'All equally'],
        correctAnswer: 2
      }]
    },
    {
      id: 'ta-module-5',
      title: 'Trading Signals & Entry Points',
      description: 'Combine all techniques to identify high-probability trading opportunities',
      lessons: [
        {
          id: 'ta-lesson-5-1',
          title: 'Signal Confluence',
          duration: '18 min',
          notes: `# Signal Confluence\n\nThe best trades occur when multiple signals align (confluence).\n\n## Types of Confluence:\n- **Price action** — support/resistance, patterns\n- **Indicators** — RSI, MACD, moving averages\n- **Volume** — confirms moves\n- **Timeframes** — multiple timeframes agree\n\n## Example Confluence:\n- Price at support level\n- RSI oversold (<30)\n- MACD bullish crossover\n- Volume increasing\n- Higher timeframe uptrend\n- = Strong buy signal\n\n## Trading Rules:\n- **Minimum 3 signals** for high-probability trade\n- **More signals = higher probability**\n- **Wait for confluence** — don't trade single signals\n- **Quality over quantity**`,
          importantPoints: ['Confluence of multiple signals increases probability', 'Wait for at least 3 signals before trading', 'More signals = higher probability trade', 'Quality setups over frequent trading'],
          quiz: [{
            id: 'ta-q5-1-1',
            question: 'What is signal confluence?',
            options: ['Single signal', 'Multiple signals aligning', 'Volume only', 'Timeframe only'],
            correctAnswer: 1,
            explanation: 'Signal confluence occurs when multiple technical signals align, increasing trade probability.'
          }]
        },
        {
          id: 'ta-lesson-5-2',
          title: 'Entry Techniques',
          duration: '17 min',
          notes: `# Entry Techniques\n\nProper entry techniques improve risk/reward and win rate.\n\n## Entry Types:\n1. **Market Order** — immediate execution at current price\n2. **Limit Order** — set price, wait for fill\n3. **Stop Order** — triggers when price reaches level\n\n## Entry Strategies:\n- **Breakout Entry** — enter on breakout above resistance\n- **Pullback Entry** — enter on pullback to support\n- **Retest Entry** — enter on retest of broken level\n- **Divergence Entry** — enter on indicator divergence\n\n## Best Practices:\n- **Enter on confirmation** — not anticipation\n- **Use limit orders** — better prices\n- **Scale in** — partial positions\n- **Set stop loss immediately**`,
          importantPoints: ['Enter on confirmation, not anticipation', 'Limit orders provide better entry prices', 'Set stop loss immediately after entry', 'Consider scaling into positions'],
          quiz: [{
            id: 'ta-q5-2-1',
            question: 'When should you enter a trade?',
            options: ['Before confirmation', 'On confirmation', 'After confirmation', 'Randomly'],
            correctAnswer: 1,
            explanation: 'Enter on confirmation of signal, not in anticipation, to reduce false signals.'
          }]
        },
        {
          id: 'ta-lesson-5-3',
          title: 'Risk Management in Trading',
          duration: '19 min',
          notes: `# Risk Management in Trading\n\nRisk management is more important than entry technique.\n\n## Position Sizing:\n- **Risk 1-2% per trade** — standard rule\n- **Account size** — determines position size\n- **Stop distance** — closer stop = larger position\n- **Never risk more than you can afford to lose**\n\n## Stop Loss Placement:\n- **Below support** (longs) or **above resistance** (shorts)\n- **ATR-based** — 1-2x Average True Range\n- **Percentage-based** — 2-5% from entry\n- **Never move stop against you**\n\n## Risk/Reward Ratio:\n- **Minimum 1:2** — risk $1 to make $2\n- **Better 1:3** — risk $1 to make $3\n- **Calculate before entry** — ensure it's worth it\n\n## Portfolio Risk:\n- **Maximum 5-6% total risk** across all positions\n- **Diversify** — don't put all in one trade\n- **Correlation** — avoid highly correlated positions`,
          importantPoints: ['Risk 1-2% per trade maximum', 'Stop loss placement is critical', 'Minimum 1:2 risk/reward ratio', 'Never risk more than you can afford'],
          quiz: [{
            id: 'ta-q5-3-1',
            question: 'What is maximum risk per trade?',
            options: ['5-10%', '1-2%', '20%', '50%'],
            correctAnswer: 1,
            explanation: 'Risk 1-2% of account per trade to preserve capital and allow for multiple trades.'
          }]
        },
        {
          id: 'ta-lesson-5-4',
          title: 'Exit Strategies',
          duration: '16 min',
          notes: `# Exit Strategies\n\nKnowing when to exit is as important as knowing when to enter.\n\n## Exit Types:\n- **Profit Target** — predetermined price level\n- **Trailing Stop** — follows price, locks in profits\n- **Time-based** — exit after X days/weeks\n- **Signal-based** — exit on reversal signal\n\n## Profit Targets:\n- **Measured move** — height of pattern\n- **Resistance level** — next resistance\n- **Fibonacci extension** — 1.618, 2.0 levels\n- **Percentage gain** — 20%, 50%, 100%\n\n## Trailing Stops:\n- **ATR-based** — 2x ATR behind price\n- **Percentage-based** — 5-10% below high\n- **Moving average** — exit when price breaks MA\n\n## Best Practices:\n- **Take partial profits** — secure some gains\n- **Let winners run** — don't exit too early\n- **Trail stops** — protect profits\n- **Stick to plan** — don't get emotional`,
          importantPoints: ['Take partial profits to secure gains', 'Use trailing stops to let winners run', 'Set profit targets before entry', 'Stick to exit plan, avoid emotions'],
          quiz: [{
            id: 'ta-q5-4-1',
            question: 'What is best exit strategy?',
            options: ['Hold forever', 'Exit immediately', 'Take partial profits and trail stop', 'Exit on emotion'],
            correctAnswer: 2,
            explanation: 'Taking partial profits and using trailing stops balances securing gains with letting winners run.'
          }]
        }
      ],
      moduleTest: [{
        id: 'ta-mt5-1',
        question: 'What is signal confluence?',
        options: ['Single signal', 'Multiple signals', 'Volume only', 'Timeframe only'],
        correctAnswer: 1
      }]
    }
  ],
  finalExam: [
    { id: 'ta-fe-1', question: 'What chart type provides most information?', options: ['Line', 'Bar', 'Candlestick', 'All equal'], correctAnswer: 2 },
    { id: 'ta-fe-2', question: 'What is support?', options: ['Price ceiling', 'Price floor', 'Moving average', 'Volume'], correctAnswer: 1 },
    { id: 'ta-fe-3', question: 'What is golden cross?', options: ['50 below 200', '50 above 200', 'Price above MA', 'Volume'], correctAnswer: 1 },
    { id: 'ta-fe-4', question: 'What does RSI above 70 indicate?', options: ['Oversold', 'Overbought', 'Neutral', 'Strong trend'], correctAnswer: 1 },
    { id: 'ta-fe-5', question: 'What makes level strong?', options: ['Single touch', 'Multiple touches', 'Low volume', 'Short timeframe'], correctAnswer: 1 },
    { id: 'ta-fe-6', question: 'What should you trade with?', options: ['Noise', 'Corrections', 'Primary trend', 'All equally'], correctAnswer: 2 },
    { id: 'ta-fe-7', question: 'What is signal confluence?', options: ['Single signal', 'Multiple signals', 'Volume only', 'Timeframe only'], correctAnswer: 1 },
    { id: 'ta-fe-8', question: 'Maximum risk per trade?', options: ['5-10%', '1-2%', '20%', '50%'], correctAnswer: 1 },
    { id: 'ta-fe-9', question: 'What defines uptrend?', options: ['Higher highs, higher lows', 'Lower highs, lower lows', 'Sideways', 'Volume'], correctAnswer: 0 },
    { id: 'ta-fe-10', question: 'Best exit strategy?', options: ['Hold forever', 'Exit immediately', 'Partial profits and trail', 'Emotion'], correctAnswer: 2 }
  ]
},
{
  id: 'fundamental-analysis',
  title: 'Fundamental Analysis Deep Dive',
  description: 'Master company valuation, financial statements analysis, and stock selection techniques',
  finalExamPassRate: 75,
  modules: [
    {
      id: 'fa-module-1',
      title: 'Financial Statements Basics',
      description: 'Understanding balance sheets, income statements, and cash flow statements',
      lessons: [
        {
          id: 'fa-lesson-1-1',
          title: 'The Balance Sheet',
          duration: '18 min',
          notes: `# The Balance Sheet\n\nThe balance sheet shows a company's financial position at a specific point in time.\n\n## Key Components:\n- **Assets** — what company owns (current and non-current)\n- **Liabilities** — what company owes (current and long-term)\n- **Equity** — owner's stake (Assets - Liabilities)\n\n## Fundamental Equation:\n**Assets = Liabilities + Equity**\n\n## Key Metrics:\n- **Current Ratio** — Current Assets / Current Liabilities (liquidity)\n- **Debt-to-Equity** — Total Debt / Equity (leverage)\n- **Working Capital** — Current Assets - Current Liabilities\n\n## What to Look For:\n- Strong current ratio (>1.5)\n- Manageable debt levels\n- Growing equity over time\n- Quality assets (not inflated)`,
          importantPoints: ['Balance sheet shows financial position at a point in time', 'Assets = Liabilities + Equity', 'Current ratio measures liquidity', 'Debt-to-equity shows leverage'],
          quiz: [{
            id: 'fa-q1-1-1',
            question: 'What is the balance sheet equation?',
            options: ['Assets = Liabilities', 'Assets = Liabilities + Equity', 'Revenue = Expenses', 'Assets = Revenue'],
            correctAnswer: 1,
            explanation: 'The fundamental balance sheet equation is Assets = Liabilities + Equity.'
          }]
        },
        {
          id: 'fa-lesson-1-2',
          title: 'The Income Statement',
          duration: '19 min',
          notes: `# The Income Statement\n\nThe income statement shows profitability over a period (quarter or year).\n\n## Key Components:\n- **Revenue** — total sales\n- **Cost of Goods Sold (COGS)** — direct costs\n- **Gross Profit** — Revenue - COGS\n- **Operating Expenses** — SG&A, R&D\n- **Operating Income** — Gross Profit - Operating Expenses\n- **Net Income** — final profit after all expenses and taxes\n\n## Key Metrics:\n- **Gross Margin** — Gross Profit / Revenue\n- **Operating Margin** — Operating Income / Revenue\n- **Net Margin** — Net Income / Revenue\n- **EPS** — Net Income / Shares Outstanding\n\n## What to Look For:\n- Consistent revenue growth\n- Improving margins\n- Stable or growing EPS\n- Quality earnings (not one-time items)`,
          importantPoints: ['Income statement shows profitability over time', 'Gross margin = Gross Profit / Revenue', 'Operating margin shows operational efficiency', 'EPS = Net Income / Shares'],
          quiz: [{
            id: 'fa-q1-2-1',
            question: 'What does gross margin measure?',
            options: ['Net profit', 'Profitability after all expenses', 'Profitability after direct costs', 'Revenue growth'],
            correctAnswer: 2,
            explanation: 'Gross margin measures profitability after direct costs (COGS), before operating expenses.'
          }]
        },
        {
          id: 'fa-lesson-1-3',
          title: 'The Cash Flow Statement',
          duration: '20 min',
          notes: `# The Cash Flow Statement\n\nThe cash flow statement shows actual cash movements, not accounting profits.\n\n## Three Sections:\n1. **Operating Cash Flow** — cash from business operations\n2. **Investing Cash Flow** — cash from investments (cap ex, acquisitions)\n3. **Financing Cash Flow** — cash from financing (debt, equity)\n\n## Key Metrics:\n- **Free Cash Flow (FCF)** — Operating CF - Capital Expenditures\n- **FCF Yield** — FCF / Market Cap\n- **Cash Conversion** — Operating CF / Net Income\n\n## What to Look For:\n- Positive operating cash flow\n- Growing free cash flow\n- FCF > Net Income (quality earnings)\n- Cash generation ability\n\n## Red Flags:\n- Negative operating cash flow\n- FCF consistently below net income\n- Heavy reliance on financing cash flow`,
          importantPoints: ['Cash flow shows actual cash, not accounting profits', 'Free Cash Flow = Operating CF - CapEx', 'FCF > Net Income indicates quality earnings', 'Positive operating cash flow is essential'],
          quiz: [{
            id: 'fa-q1-3-1',
            question: 'What is Free Cash Flow?',
            options: ['Net Income', 'Operating CF - CapEx', 'Total Cash', 'Revenue - Expenses'],
            correctAnswer: 1,
            explanation: 'Free Cash Flow = Operating Cash Flow - Capital Expenditures, showing cash available after investments.'
          }]
        },
        {
          id: 'fa-lesson-1-4',
          title: 'Reading Financial Statements Together',
          duration: '17 min',
          notes: `# Reading Financial Statements Together\n\nAll three statements are interconnected and tell a complete story.\n\n## Connections:\n- **Income Statement** → Net Income flows to Balance Sheet (Equity)\n- **Cash Flow** → Operating CF connects Income Statement to Balance Sheet\n- **Balance Sheet** → Shows cumulative effect of Income Statement and Cash Flow\n\n## Analysis Approach:\n1. **Start with Income Statement** — understand profitability\n2. **Check Cash Flow** — verify cash generation\n3. **Review Balance Sheet** — assess financial strength\n4. **Look for consistency** — all statements should align\n\n## Red Flags:\n- Net Income positive but Operating CF negative\n- Growing revenue but declining margins\n- Increasing debt without cash generation\n- Inventory growing faster than sales\n\n## Quality Indicators:\n- Consistent cash generation\n- Improving margins over time\n- Strong balance sheet\n- All statements tell consistent story`,
          importantPoints: ['All three statements are interconnected', 'Net Income flows to Balance Sheet equity', 'Operating CF connects Income Statement to Balance Sheet', 'Look for consistency across all statements'],
          quiz: [{
            id: 'fa-q1-4-1',
            question: 'What is a red flag when analyzing statements?',
            options: ['Positive net income', 'Positive net income but negative operating CF', 'Growing revenue', 'Strong balance sheet'],
            correctAnswer: 1,
            explanation: 'Positive net income but negative operating cash flow suggests poor earnings quality or accounting issues.'
          }]
        }
      ],
      moduleTest: [{ id: 'fa-mt1-1', question: 'What is balance sheet equation?', options: ['Assets = Liabilities', 'Assets = Liabilities + Equity', 'Revenue = Expenses', 'Assets = Revenue'], correctAnswer: 1 }]
    },
    {
      id: 'fa-module-2',
      title: 'Key Financial Ratios',
      description: 'Learn essential ratios for evaluating company performance and financial health',
      lessons: [
        {
          id: 'fa-lesson-2-1',
          title: 'Profitability Ratios',
          duration: '18 min',
          notes: `# Profitability Ratios\n\nProfitability ratios measure how efficiently a company generates profits.\n\n## Key Ratios:\n- **Gross Margin** — Gross Profit / Revenue\n- **Operating Margin** — Operating Income / Revenue\n- **Net Margin** — Net Income / Revenue\n- **ROE (Return on Equity)** — Net Income / Equity\n- **ROA (Return on Assets)** — Net Income / Assets\n- **ROIC (Return on Invested Capital)** — NOPAT / Invested Capital\n\n## Interpretation:\n- **Higher is better** — but compare to industry\n- **Trend matters** — improving margins are positive\n- **Consistency** — stable margins indicate quality\n\n## Benchmarks:\n- Gross Margin: 40%+ (good), 20-40% (average), <20% (low)\n- Net Margin: 10%+ (excellent), 5-10% (good), <5% (low)\n- ROE: 15%+ (excellent), 10-15% (good), <10% (poor)`,
          importantPoints: ['Profitability ratios measure profit generation efficiency', 'Compare ratios to industry benchmarks', 'Trend matters more than absolute level', 'ROE and ROIC are key return metrics'],
          quiz: [{
            id: 'fa-q2-1-1',
            question: 'What does ROE measure?',
            options: ['Asset efficiency', 'Return on equity investment', 'Revenue growth', 'Debt levels'],
            correctAnswer: 1,
            explanation: 'ROE (Return on Equity) measures how efficiently a company generates profits from equity investment.'
          }]
        },
        {
          id: 'fa-lesson-2-2',
          title: 'Liquidity and Solvency Ratios',
          duration: '17 min',
          notes: `# Liquidity and Solvency Ratios\n\nThese ratios measure a company's ability to meet short-term and long-term obligations.\n\n## Liquidity Ratios:\n- **Current Ratio** — Current Assets / Current Liabilities\n- **Quick Ratio** — (Current Assets - Inventory) / Current Liabilities\n- **Cash Ratio** — Cash / Current Liabilities\n\n## Solvency Ratios:\n- **Debt-to-Equity** — Total Debt / Equity\n- **Debt-to-Assets** — Total Debt / Total Assets\n- **Interest Coverage** — Operating Income / Interest Expense\n\n## Interpretation:\n- **Current Ratio > 1.5** — good liquidity\n- **Quick Ratio > 1** — strong liquidity (excludes inventory)\n- **Debt-to-Equity < 1** — conservative leverage\n- **Interest Coverage > 5** — comfortable debt service\n\n## Red Flags:\n- Current ratio < 1\n- Debt-to-equity > 2\n- Interest coverage < 2`,
          importantPoints: ['Liquidity ratios measure short-term ability to pay', 'Solvency ratios measure long-term financial health', 'Current ratio > 1.5 indicates good liquidity', 'Debt-to-equity < 1 is conservative'],
          quiz: [{
            id: 'fa-q2-2-1',
            question: 'What does current ratio measure?',
            options: ['Profitability', 'Short-term liquidity', 'Long-term solvency', 'Revenue growth'],
            correctAnswer: 1,
            explanation: 'Current ratio measures short-term liquidity - ability to pay current liabilities with current assets.'
          }]
        },
        {
          id: 'fa-lesson-2-3',
          title: 'Efficiency Ratios',
          duration: '16 min',
          notes: `# Efficiency Ratios\n\nEfficiency ratios measure how well a company uses its assets.\n\n## Key Ratios:\n- **Asset Turnover** — Revenue / Total Assets\n- **Inventory Turnover** — COGS / Average Inventory\n- **Receivables Turnover** — Revenue / Average Receivables\n- **Days Sales Outstanding (DSO)** — 365 / Receivables Turnover\n\n## Interpretation:\n- **Higher turnover** — more efficient asset use\n- **Compare to industry** — different industries have different norms\n- **Trend analysis** — improving turnover is positive\n\n## Benchmarks:\n- Asset Turnover: >1 (good), <0.5 (poor)\n- Inventory Turnover: Industry-specific (retail higher, manufacturing lower)\n- DSO: Lower is better (faster collection)`,
          importantPoints: ['Efficiency ratios measure asset utilization', 'Higher turnover indicates better efficiency', 'Compare to industry benchmarks', 'Trend matters more than absolute level'],
          quiz: [{
            id: 'fa-q2-3-1',
            question: 'What does asset turnover measure?',
            options: ['Profitability', 'Asset utilization efficiency', 'Liquidity', 'Debt levels'],
            correctAnswer: 1,
            explanation: 'Asset turnover measures how efficiently a company generates revenue from its assets.'
          }]
        },
        {
          id: 'fa-lesson-2-4',
          title: 'Valuation Ratios',
          duration: '19 min',
          notes: `# Valuation Ratios\n\nValuation ratios help determine if a stock is fairly priced.\n\n## Key Ratios:\n- **P/E (Price-to-Earnings)** — Price / EPS\n- **P/B (Price-to-Book)** — Price / Book Value per Share\n- **P/S (Price-to-Sales)** — Price / Revenue per Share\n- **PEG (P/E to Growth)** — P/E / Earnings Growth Rate\n- **EV/EBITDA** — Enterprise Value / EBITDA\n\n## Interpretation:\n- **Lower ratios** — potentially undervalued\n- **Compare to peers** — relative valuation\n- **Historical context** — compare to company's own history\n- **Growth adjusted** — PEG accounts for growth\n\n## Benchmarks:\n- P/E: 15-20 (fair), <15 (cheap), >25 (expensive)\n- P/B: <1 (cheap), 1-3 (fair), >3 (expensive)\n- PEG: <1 (undervalued), 1-2 (fair), >2 (overvalued)`,
          importantPoints: ['Valuation ratios compare price to fundamentals', 'Lower ratios suggest potential undervaluation', 'Compare to peers and historical levels', 'PEG adjusts for growth'],
          quiz: [{
            id: 'fa-q2-4-1',
            question: 'What does P/E ratio measure?',
            options: ['Profitability', 'Price relative to earnings', 'Liquidity', 'Efficiency'],
            correctAnswer: 1,
            explanation: 'P/E ratio measures how much investors pay per dollar of earnings, indicating valuation level.'
          }]
        }
      ],
      moduleTest: [{ id: 'fa-mt2-1', question: 'What does ROE measure?', options: ['Asset efficiency', 'Return on equity', 'Revenue growth', 'Debt'], correctAnswer: 1 }]
    },
    {
      id: 'fa-module-3',
      title: 'Company Valuation Methods',
      description: 'Learn different approaches to valuing companies and determining fair value',
      lessons: [
        {
          id: 'fa-lesson-3-1',
          title: 'Discounted Cash Flow (DCF)',
          duration: '20 min',
          notes: `# Discounted Cash Flow (DCF)\n\nDCF values a company based on its future cash flows discounted to present value.\n\n## Key Steps:\n1. **Project Free Cash Flows** — estimate future FCF (5-10 years)\n2. **Calculate Terminal Value** — value beyond projection period\n3. **Determine Discount Rate** — WACC (Weighted Average Cost of Capital)\n4. **Discount to Present** — PV = FCF / (1 + WACC)^n\n5. **Sum Values** — Enterprise Value = Sum of PVs\n6. **Calculate Equity Value** — EV - Debt + Cash\n\n## Key Assumptions:\n- **Growth rates** — revenue and margin assumptions\n- **Discount rate** — risk-adjusted return requirement\n- **Terminal growth** — long-term growth rate (typically 2-3%)\n\n## Strengths:\n- Based on cash flows (intrinsic value)\n- Accounts for time value of money\n- Flexible for different scenarios\n\n## Weaknesses:\n- Sensitive to assumptions\n- Requires detailed projections\n- Terminal value dominates`,
          importantPoints: ['DCF values company based on future cash flows', 'Discount rate (WACC) accounts for risk', 'Terminal value often dominates total value', 'Sensitive to growth and discount rate assumptions'],
          quiz: [{
            id: 'fa-q3-1-1',
            question: 'What does DCF value a company based on?',
            options: ['Past earnings', 'Future cash flows', 'Current assets', 'Market price'],
            correctAnswer: 1,
            explanation: 'DCF values a company based on its projected future free cash flows, discounted to present value.'
          }]
        },
        {
          id: 'fa-lesson-3-2',
          title: 'Comparable Company Analysis',
          duration: '18 min',
          notes: `# Comparable Company Analysis\n\nCompares valuation metrics of similar companies to determine fair value.\n\n## Process:\n1. **Identify Peers** — similar size, industry, business model\n2. **Collect Metrics** — P/E, P/B, EV/EBITDA, P/S\n3. **Calculate Multiples** — average, median, range\n4. **Apply to Target** — multiply target's metrics by peer multiples\n5. **Determine Range** — high, low, median estimates\n\n## Key Multiples:\n- **P/E** — for profitable companies\n- **EV/EBITDA** — for capital-intensive businesses\n- **P/S** — for growth companies without profits\n- **P/B** — for asset-heavy companies\n\n## Strengths:\n- Market-based valuation\n- Easy to understand\n- Reflects current market sentiment\n\n## Weaknesses:\n- Assumes market is efficient\n- Hard to find perfect peers\n- Market may be over/undervalued`,
          importantPoints: ['Compares target to similar companies', 'Uses market-based multiples', 'Requires finding appropriate peers', 'Reflects current market sentiment'],
          quiz: [{
            id: 'fa-q3-2-1',
            question: 'What does comparable analysis use?',
            options: ['Future cash flows', 'Market multiples of peers', 'Historical prices', 'Management forecasts'],
            correctAnswer: 1,
            explanation: 'Comparable analysis uses market-based valuation multiples from similar companies.'
          }]
        },
        {
          id: 'fa-lesson-3-3',
          title: 'Precedent Transactions',
          duration: '17 min',
          notes: `# Precedent Transactions\n\nValues company based on prices paid in similar M&A transactions.\n\n## Process:\n1. **Find Transactions** — similar deals in recent years (2-3 years)\n2. **Calculate Multiples** — transaction value / financial metrics\n3. **Adjust for Premium** — M&A typically includes control premium (20-40%)\n4. **Apply to Target** — use transaction multiples\n\n## Key Metrics:\n- **Transaction Value / Revenue**\n- **Transaction Value / EBITDA**\n- **Transaction Value / Net Income**\n\n## Strengths:\n- Real transaction prices\n- Includes control premium\n- Market-validated values\n\n## Weaknesses:\n- Limited transaction data\n- Premiums vary by situation\n- May not reflect current market`,
          importantPoints: ['Based on actual M&A transaction prices', 'Includes control premium (20-40%)', 'Limited by available transaction data', 'Reflects strategic buyer valuations'],
          quiz: [{
            id: 'fa-q3-3-1',
            question: 'What premium do M&A transactions typically include?',
            options: ['0-10%', '20-40%', '50-70%', '100%+'],
            correctAnswer: 1,
            explanation: 'M&A transactions typically include a control premium of 20-40% above market price.'
          }]
        },
        {
          id: 'fa-lesson-3-4',
          title: 'Asset-Based Valuation',
          duration: '16 min',
          notes: `# Asset-Based Valuation\n\nValues company based on its assets, less liabilities.\n\n## Methods:\n- **Book Value** — assets minus liabilities (from balance sheet)\n- **Liquidation Value** — value if assets sold quickly\n- **Replacement Cost** — cost to recreate assets\n\n## When to Use:\n- **Asset-heavy companies** — real estate, natural resources\n- **Distressed situations** — liquidation scenarios\n- **Holding companies** — sum of parts valuation\n\n## Strengths:\n- Tangible value anchor\n- Useful for asset-heavy businesses\n- Conservative estimate\n\n## Weaknesses:\n- Ignores going concern value\n- Doesn't account for intangibles\n- Book value may not reflect market value\n- Not suitable for growth companies`,
          importantPoints: ['Values company based on assets', 'Useful for asset-heavy businesses', 'Book value may not reflect market value', 'Ignores going concern and intangible value'],
          quiz: [{
            id: 'fa-q3-4-1',
            question: 'When is asset-based valuation most appropriate?',
            options: ['Growth companies', 'Asset-heavy companies', 'Tech startups', 'Service businesses'],
            correctAnswer: 1,
            explanation: 'Asset-based valuation is most appropriate for asset-heavy companies like real estate or natural resources.'
          }]
        }
      ],
      moduleTest: [{ id: 'fa-mt3-1', question: 'What does DCF value based on?', options: ['Past earnings', 'Future cash flows', 'Current assets', 'Market price'], correctAnswer: 1 }]
    },
    {
      id: 'fa-module-4',
      title: 'Industry Analysis',
      description: 'Understanding industry dynamics and competitive positioning',
      lessons: [
        {
          id: 'fa-lesson-4-1',
          title: 'Industry Lifecycle Stages',
          duration: '17 min',
          notes: `# Industry Lifecycle Stages\n\nIndustries go through predictable stages that affect investment attractiveness.\n\n## Stages:\n1. **Emerging** — new industry, high growth, high risk\n2. **Growth** — rapid expansion, increasing competition\n3. **Mature** — stable growth, established players\n4. **Decline** — shrinking market, consolidation\n\n## Investment Implications:\n- **Emerging** — high risk/reward, few winners\n- **Growth** — best returns, pick winners\n- **Mature** — stable dividends, low growth\n- **Decline** — avoid or value plays\n\n## Key Indicators:\n- Revenue growth rates\n- Number of competitors\n- Profit margins\n- Market penetration`,
          importantPoints: ['Industries go through lifecycle stages', 'Growth stage offers best returns', 'Mature industries provide stability', 'Decline industries should generally be avoided'],
          quiz: [{
            id: 'fa-q4-1-1',
            question: 'Which lifecycle stage offers best returns?',
            options: ['Emerging', 'Growth', 'Mature', 'Decline'],
            correctAnswer: 1,
            explanation: 'Growth stage typically offers the best risk-adjusted returns as industry expands rapidly.'
          }]
        },
        {
          id: 'fa-lesson-4-2',
          title: 'Porter\'s Five Forces',
          duration: '19 min',
          notes: `# Porter's Five Forces\n\nFramework for analyzing industry competitiveness and profitability potential.\n\n## Five Forces:\n1. **Threat of New Entrants** — barriers to entry (high = good)\n2. **Bargaining Power of Suppliers** — supplier concentration (low = good)\n3. **Bargaining Power of Buyers** — buyer concentration (low = good)\n4. **Threat of Substitutes** — alternative products (low = good)\n5. **Rivalry Among Competitors** — competition intensity (low = good)\n\n## Attractive Industries:\n- High barriers to entry\n- Low supplier/buyer power\n- Few substitutes\n- Low competition\n\n## Unattractive Industries:\n- Low barriers\n- High supplier/buyer power\n- Many substitutes\n- Intense competition`,
          importantPoints: ['Five forces analyze industry competitiveness', 'Attractive industries have high barriers and low competition', 'Supplier and buyer power affect profitability', 'Substitutes limit pricing power'],
          quiz: [{
            id: 'fa-q4-2-1',
            question: 'What makes an industry attractive?',
            options: ['Low barriers to entry', 'High barriers to entry', 'Many competitors', 'Low margins'],
            correctAnswer: 1,
            explanation: 'High barriers to entry protect existing companies and make industries more attractive for investment.'
          }]
        },
        {
          id: 'fa-lesson-4-3',
          title: 'Competitive Positioning',
          duration: '18 min',
          notes: `# Competitive Positioning\n\nUnderstanding a company's position within its industry.\n\n## Market Share:\n- **Leader** — largest market share, pricing power\n- **Challenger** — #2, aggressive growth\n- **Follower** — smaller, niche focus\n- **Niche** — specialized segment\n\n## Competitive Advantages:\n- **Cost leadership** — lowest cost producer\n- **Differentiation** — unique products/services\n- **Focus** — specialized market segment\n\n## Key Questions:\n- What is company's market position?\n- What are competitive advantages?\n- Are advantages sustainable?\n- How is position changing?\n\n## Investment Implications:\n- Leaders often best investments\n- Challengers offer growth potential\n- Followers need strong niches\n- Avoid companies losing position`,
          importantPoints: ['Market position affects investment attractiveness', 'Competitive advantages must be sustainable', 'Leaders typically best investments', 'Monitor position changes over time'],
          quiz: [{
            id: 'fa-q4-3-1',
            question: 'What is typically the best investment?',
            options: ['Market leader', 'Challenger', 'Follower', 'Niche player'],
            correctAnswer: 0,
            explanation: 'Market leaders typically offer the best investment opportunities due to pricing power and stability.'
          }]
        }
      ],
      moduleTest: [{ id: 'fa-mt4-1', question: 'Which stage offers best returns?', options: ['Emerging', 'Growth', 'Mature', 'Decline'], correctAnswer: 1 }]
    },
    {
      id: 'fa-module-5',
      title: 'Competitive Positioning',
      description: 'Analyze competitive advantages and market position',
      lessons: [
        {
          id: 'fa-lesson-5-1',
          title: 'Identifying Competitive Moats',
          duration: '18 min',
          notes: `# Identifying Competitive Moats\n\nCompetitive moats protect companies from competition and sustain profitability.\n\n## Types of Moats:\n- **Network Effects** — value increases with users\n- **Brand** — customer loyalty and pricing power\n- **Cost Advantages** — scale, location, technology\n- **Switching Costs** — high cost to change providers\n- **Regulatory** — licenses, patents, regulations\n\n## Moat Strength:\n- **Wide Moats** — strong, durable advantages\n- **Narrow Moats** — some advantages, less durable\n- **No Moat** — no sustainable advantages\n\n## Investment Strategy:\n- Prefer wide moat companies\n- Moats must be sustainable\n- Monitor moat erosion\n- Price matters even with moats`,
          importantPoints: ['Moats protect from competition', 'Wide moats are most valuable', 'Moats must be sustainable', 'Price still matters'],
          quiz: [{
            id: 'fa-q5-1-1',
            question: 'What protects companies from competition?',
            options: ['Low prices', 'Competitive moats', 'High debt', 'Large size'],
            correctAnswer: 1,
            explanation: 'Competitive moats are sustainable advantages that protect companies from competition.'
          }]
        },
        {
          id: 'fa-lesson-5-2',
          title: 'Market Share Analysis',
          duration: '17 min',
          notes: `# Market Share Analysis\n\nMarket share indicates competitive strength and growth potential.\n\n## Key Metrics:\n- **Absolute Share** — % of total market\n- **Relative Share** — vs largest competitor\n- **Share Trends** — gaining or losing?\n\n## Interpretation:\n- **Gaining Share** — positive, indicates strength\n- **Losing Share** — negative, competitive weakness\n- **Stable Share** — maintaining position\n\n## Factors Affecting Share:\n- Product quality and innovation\n- Pricing strategy\n- Marketing and distribution\n- Customer service\n\n## Investment Implications:\n- Prefer share gainers\n- Avoid share losers\n- Stable share OK if market growing\n- Consider market size`,
          importantPoints: ['Market share indicates competitive strength', 'Gaining share is positive', 'Losing share is negative', 'Consider share trends over time'],
          quiz: [{
            id: 'fa-q5-2-1',
            question: 'What does gaining market share indicate?',
            options: ['Weakness', 'Competitive strength', 'High prices', 'Low quality'],
            correctAnswer: 1,
            explanation: 'Gaining market share indicates competitive strength and ability to take business from competitors.'
          }]
        },
        {
          id: 'fa-lesson-5-3',
          title: 'SWOT Analysis',
          duration: '16 min',
          notes: `# SWOT Analysis\n\nFramework for analyzing company's internal and external factors.\n\n## Components:\n- **Strengths** — internal advantages\n- **Weaknesses** — internal disadvantages\n- **Opportunities** — external favorable factors\n- **Threats** — external challenges\n\n## Analysis Process:\n1. Identify internal strengths and weaknesses\n2. Identify external opportunities and threats\n3. Match strengths to opportunities\n4. Address weaknesses and threats\n\n## Investment Use:\n- Understand company position\n- Identify risks and opportunities\n- Assess management strategy\n- Make investment decisions\n\n## Key Questions:\n- Are strengths sustainable?\n- Can weaknesses be fixed?\n- Are opportunities actionable?\n- How serious are threats?`,
          importantPoints: ['SWOT analyzes internal and external factors', 'Match strengths to opportunities', 'Address weaknesses and threats', 'Use for investment decision-making'],
          quiz: [{
            id: 'fa-q5-3-1',
            question: 'What does SWOT analyze?',
            options: ['Only internal factors', 'Only external factors', 'Internal and external factors', 'Financial ratios only'],
            correctAnswer: 2,
            explanation: 'SWOT analyzes both internal factors (strengths/weaknesses) and external factors (opportunities/threats).'
          }]
        }
      ],
      moduleTest: [{ id: 'fa-mt5-1', question: 'What protects from competition?', options: ['Low prices', 'Competitive moats', 'High debt', 'Large size'], correctAnswer: 1 }]
    },
    {
      id: 'fa-module-6',
      title: 'Building a Stock Watchlist',
      description: 'Create and maintain a watchlist of quality investment opportunities',
      lessons: [
        {
          id: 'fa-lesson-6-1',
          title: 'Screening Criteria',
          duration: '18 min',
          notes: `# Screening Criteria\n\nUse quantitative screens to identify potential investments.\n\n## Common Screens:\n- **Valuation** — P/E < 20, P/B < 2\n- **Profitability** — ROE > 15%, Net Margin > 10%\n- **Growth** — Revenue growth > 10%, EPS growth > 15%\n- **Financial Health** — Debt-to-Equity < 1, Current Ratio > 1.5\n- **Quality** — ROIC > 15%, FCF positive\n\n## Screening Process:\n1. Define criteria based on strategy\n2. Run screen on stock universe\n3. Review results\n4. Add to watchlist for deeper analysis\n\n## Best Practices:\n- Start broad, narrow down\n- Use multiple criteria\n- Adjust for industry differences\n- Review regularly`,
          importantPoints: ['Screens identify potential investments', 'Use multiple criteria', 'Adjust for industry differences', 'Review screens regularly'],
          quiz: [{
            id: 'fa-q6-1-1',
            question: 'What is the purpose of screening?',
            options: ['Final investment decision', 'Identify potential investments', 'Sell stocks', 'Calculate returns'],
            correctAnswer: 1,
            explanation: 'Screening identifies potential investments for deeper analysis, not final investment decisions.'
          }]
        },
        {
          id: 'fa-lesson-6-2',
          title: 'Watchlist Organization',
          duration: '16 min',
          notes: `# Watchlist Organization\n\nOrganize watchlist for efficient monitoring and analysis.\n\n## Organization Methods:\n- **By Industry** — group similar companies\n- **By Strategy** — value, growth, dividend\n- **By Priority** — high, medium, low interest\n- **By Stage** — research, analysis, ready to buy\n\n## Key Information:\n- Company name and ticker\n- Current price and valuation\n- Key metrics (P/E, ROE, etc.)\n- Notes and observations\n- Target price and rationale\n\n## Maintenance:\n- Update prices regularly\n- Review metrics quarterly\n- Remove companies that no longer qualify\n- Add new opportunities\n\n## Best Practices:\n- Keep manageable size (20-50 stocks)\n- Regular review schedule\n- Document reasoning\n- Set price alerts`,
          importantPoints: ['Organize watchlist for efficiency', 'Keep manageable size', 'Update regularly', 'Document reasoning'],
          quiz: [{
            id: 'fa-q6-2-1',
            question: 'What is a good watchlist size?',
            options: ['5-10 stocks', '20-50 stocks', '100+ stocks', 'Unlimited'],
            correctAnswer: 1,
            explanation: 'A watchlist of 20-50 stocks is manageable and allows for thorough analysis.'
          }]
        },
        {
          id: 'fa-lesson-6-3',
          title: 'Monitoring and Updating',
          duration: '17 min',
          notes: `# Monitoring and Updating\n\nRegular monitoring keeps watchlist current and actionable.\n\n## Monitoring Schedule:\n- **Daily** — price movements, news\n- **Weekly** — key metrics, updates\n- **Quarterly** — earnings, financials\n- **Annually** — comprehensive review\n\n## What to Monitor:\n- Price movements vs target\n- Earnings reports and guidance\n- Financial metric changes\n- Industry developments\n- Competitive changes\n\n## Update Triggers:\n- Significant price movement\n- Earnings beat/miss\n- Management changes\n- Industry shifts\n- Valuation changes\n\n## Decision Framework:\n- **Buy** — price attractive, fundamentals strong\n- **Hold** — continue monitoring\n- **Remove** — no longer qualifies\n- **Sell** — if already owned`,
          importantPoints: ['Monitor watchlist regularly', 'Update based on new information', 'Use decision framework', 'Remove companies that no longer qualify'],
          quiz: [{
            id: 'fa-q6-3-1',
            question: 'How often should you review watchlist?',
            options: ['Never', 'Annually', 'Quarterly', 'Daily for prices, quarterly for fundamentals'],
            correctAnswer: 3,
            explanation: 'Monitor prices daily but review fundamentals quarterly with earnings reports.'
          }]
        }
      ],
      moduleTest: [{ id: 'fa-mt6-1', question: 'What is screening purpose?', options: ['Final decision', 'Identify potentials', 'Sell stocks', 'Calculate returns'], correctAnswer: 1 }]
    }
  ],
  finalExam: [
    { id: 'fa-fe-1', question: 'What is balance sheet equation?', options: ['Assets = Liabilities', 'Assets = Liabilities + Equity', 'Revenue = Expenses', 'Assets = Revenue'], correctAnswer: 1 },
    { id: 'fa-fe-2', question: 'What does gross margin measure?', options: ['Net profit', 'After all expenses', 'After direct costs', 'Revenue growth'], correctAnswer: 2 },
    { id: 'fa-fe-3', question: 'What is Free Cash Flow?', options: ['Net Income', 'Operating CF - CapEx', 'Total Cash', 'Revenue - Expenses'], correctAnswer: 1 },
    { id: 'fa-fe-4', question: 'What does ROE measure?', options: ['Asset efficiency', 'Return on equity', 'Revenue growth', 'Debt'], correctAnswer: 1 },
    { id: 'fa-fe-5', question: 'What does current ratio measure?', options: ['Profitability', 'Short-term liquidity', 'Long-term solvency', 'Revenue growth'], correctAnswer: 1 },
    { id: 'fa-fe-6', question: 'What does DCF value based on?', options: ['Past earnings', 'Future cash flows', 'Current assets', 'Market price'], correctAnswer: 1 },
    { id: 'fa-fe-7', question: 'Which stage offers best returns?', options: ['Emerging', 'Growth', 'Mature', 'Decline'], correctAnswer: 1 },
    { id: 'fa-fe-8', question: 'What protects from competition?', options: ['Low prices', 'Competitive moats', 'High debt', 'Large size'], correctAnswer: 1 },
    { id: 'fa-fe-9', question: 'What is screening purpose?', options: ['Final decision', 'Identify potentials', 'Sell stocks', 'Calculate returns'], correctAnswer: 1 },
    { id: 'fa-fe-10', question: 'Good watchlist size?', options: ['5-10', '20-50', '100+', 'Unlimited'], correctAnswer: 1 }
  ]
},
{
  id: 'risk-management',
  title: 'Risk Management & Psychology',
  description: 'Master risk assessment, position sizing, and overcome psychological biases in investing',
  finalExamPassRate: 75,
  modules: [
    {
      id: 'rm-module-1',
      title: 'Understanding Investment Risk',
      description: 'Learn different types of risk and how to measure them',
      lessons: [
        {
          id: 'rm-lesson-1-1',
          title: 'Types of Investment Risk',
          duration: '17 min',
          notes: `# Types of Investment Risk\n\nUnderstanding different risks helps you manage them effectively.\n\n## Market Risk:\n- **Systematic risk** — affects entire market (recession, war)\n- **Unsystematic risk** — company-specific (management, competition)\n- **Beta** — measures sensitivity to market movements\n\n## Other Risks:\n- **Credit Risk** — issuer defaults\n- **Liquidity Risk** — can't sell quickly\n- **Inflation Risk** — purchasing power loss\n- **Currency Risk** — exchange rate changes\n- **Interest Rate Risk** — rate changes affect bonds\n\n## Risk vs Return:\n- Higher risk = higher potential return\n- Lower risk = lower potential return\n- Diversification reduces unsystematic risk`,
          importantPoints: ['Market risk affects all investments', 'Unsystematic risk can be diversified away', 'Higher risk requires higher return', 'Diversification reduces company-specific risk'],
          quiz: [{
            id: 'rm-q1-1-1',
            question: 'What risk can be diversified away?',
            options: ['Market risk', 'Unsystematic risk', 'Inflation risk', 'Interest rate risk'],
            correctAnswer: 1,
            explanation: 'Unsystematic (company-specific) risk can be reduced through diversification.'
          }]
        },
        {
          id: 'rm-lesson-1-2',
          title: 'Measuring Risk',
          duration: '18 min',
          notes: `# Measuring Risk\n\nQuantifying risk helps you make informed decisions.\n\n## Key Metrics:\n- **Standard Deviation** — volatility measure\n- **Beta** — market sensitivity (1.0 = market, >1 = more volatile)\n- **Value at Risk (VaR)** — potential loss at confidence level\n- **Maximum Drawdown** — largest peak-to-trough decline\n- **Sharpe Ratio** — risk-adjusted return (higher is better)\n\n## Interpretation:\n- **High volatility** — large price swings\n- **Beta > 1** — more volatile than market\n- **Beta < 1** — less volatile than market\n- **Negative beta** — moves opposite to market\n\n## Risk Tolerance:\n- **Conservative** — low volatility, stable returns\n- **Moderate** — balanced risk/return\n- **Aggressive** — high volatility, higher returns`,
          importantPoints: ['Standard deviation measures volatility', 'Beta compares to market volatility', 'Sharpe ratio measures risk-adjusted returns', 'Higher volatility = higher risk'],
          quiz: [{
            id: 'rm-q1-2-1',
            question: 'What does beta measure?',
            options: ['Return', 'Volatility vs market', 'Dividend yield', 'P/E ratio'],
            correctAnswer: 1,
            explanation: 'Beta measures a stock\'s volatility relative to the market (1.0 = market average).'
          }]
        },
        {
          id: 'rm-lesson-1-3',
          title: 'Risk-Return Tradeoff',
          duration: '16 min',
          notes: `# Risk-Return Tradeoff\n\nThe fundamental relationship between risk and return.\n\n## Core Principle:\n**Higher risk requires higher expected return**\n\n## Examples:\n- **Cash** — low risk, low return (~0-2%)\n- **Bonds** — moderate risk, moderate return (2-5%)\n- **Stocks** — high risk, high return (7-10% long-term)\n- **Options** — very high risk, very high potential return\n\n## Efficient Frontier:\n- Optimal portfolios maximize return for given risk\n- Diversification improves risk/return profile\n- No free lunch — can't have high return with low risk\n\n## Your Role:\n- Determine risk tolerance\n- Choose appropriate asset allocation\n- Accept risk for desired returns\n- Don't take unnecessary risk`,
          importantPoints: ['Higher risk requires higher return', 'No free lunch in investing', 'Diversification improves risk/return', 'Match risk to your tolerance'],
          quiz: [{
            id: 'rm-q1-3-1',
            question: 'What is the risk-return relationship?',
            options: ['Inverse', 'Higher risk = higher return', 'No relationship', 'Random'],
            correctAnswer: 1,
            explanation: 'Higher risk investments must offer higher expected returns to compensate investors.'
          }]
        },
        {
          id: 'rm-lesson-1-4',
          title: 'Risk Assessment Tools',
          duration: '17 min',
          notes: `# Risk Assessment Tools\n\nTools to evaluate and manage investment risk.\n\n## Portfolio Analysis:\n- **Correlation** — how assets move together\n- **Diversification** — reduces overall risk\n- **Concentration** — too much in one asset increases risk\n\n## Risk Metrics:\n- **Portfolio Beta** — weighted average of holdings\n- **Portfolio Standard Deviation** — overall volatility\n- **Value at Risk** — potential loss estimate\n\n## Stress Testing:\n- **Scenario Analysis** — what if market drops 20%?\n- **Historical Analysis** — how did portfolio perform in 2008?\n- **Monte Carlo** — probability-based simulations\n\n## Best Practices:\n- Regular risk assessment\n- Stress test your portfolio\n- Monitor correlations\n- Adjust for life changes`,
          importantPoints: ['Correlation affects portfolio risk', 'Diversification reduces risk', 'Stress testing reveals vulnerabilities', 'Regular assessment is essential'],
          quiz: [{
            id: 'rm-q1-4-1',
            question: 'What reduces portfolio risk?',
            options: ['Concentration', 'Diversification', 'High correlation', 'Single asset'],
            correctAnswer: 1,
            explanation: 'Diversification across uncorrelated assets reduces overall portfolio risk.'
          }]
        }
      ],
      moduleTest: [{ id: 'rm-mt1-1', question: 'What risk can be diversified?', options: ['Market', 'Unsystematic', 'Inflation', 'Interest rate'], correctAnswer: 1 }]
    },
    {
      id: 'rm-module-2',
      title: 'Position Sizing & Stop Losses',
      description: 'Learn proper position sizing and stop loss strategies',
      lessons: [
        {
          id: 'rm-lesson-2-1',
          title: 'Position Sizing Fundamentals',
          duration: '19 min',
          notes: `# Position Sizing Fundamentals\n\nProper position sizing protects capital and maximizes returns.\n\n## Key Rules:\n- **Risk 1-2% per trade** — standard rule\n- **Never risk more than you can afford**\n- **Larger positions** for higher conviction\n- **Smaller positions** for lower conviction\n\n## Calculation:\nPosition Size = (Account × Risk %) / (Entry - Stop Loss)\n\n## Example:\n- Account: $100,000\n- Risk: 1%\n- Entry: $100\n- Stop: $95\n- Position: ($100,000 × 1%) / ($100 - $95) = $1,000 / $5 = 200 shares\n\n## Factors:\n- **Account size** — larger account, larger positions\n- **Risk tolerance** — conservative = smaller positions\n- **Stop distance** — closer stop = larger position\n- **Volatility** — higher volatility = smaller positions`,
          importantPoints: ['Risk 1-2% per trade', 'Position size depends on stop distance', 'Larger positions for higher conviction', 'Never risk more than affordable'],
          quiz: [{
            id: 'rm-q2-1-1',
            question: 'What is standard risk per trade?',
            options: ['5-10%', '1-2%', '10-20%', '50%'],
            correctAnswer: 1,
            explanation: 'Standard risk management rule is to risk 1-2% of account per trade.'
          }]
        },
        {
          id: 'rm-lesson-2-2',
          title: 'Stop Loss Strategies',
          duration: '18 min',
          notes: `# Stop Loss Strategies\n\nStop losses limit losses and protect capital.\n\n## Types:\n- **Fixed Percentage** — 5-10% below entry\n- **Support/Resistance** — below support (longs)\n- **ATR-based** — 1-2x Average True Range\n- **Trailing Stop** — follows price upward\n\n## Placement:\n- **Below support** for longs\n- **Above resistance** for shorts\n- **Beyond noise** — avoid getting stopped out\n- **Logical levels** — not arbitrary\n\n## Common Mistakes:\n- **Too tight** — stopped out by normal volatility\n- **Too wide** — large losses\n- **Moving against you** — never do this\n- **No stop** — unlimited risk\n\n## Best Practices:\n- Always use stops\n- Place at logical levels\n- Don't move stops against you\n- Use trailing stops for winners`,
          importantPoints: ['Always use stop losses', 'Place at logical support/resistance', 'Don\'t move stops against you', 'Trailing stops protect profits'],
          quiz: [{
            id: 'rm-q2-2-1',
            question: 'Where should stop loss be placed for longs?',
            options: ['Above entry', 'Below support', 'At entry', 'No stop needed'],
            correctAnswer: 1,
            explanation: 'Stop losses for long positions should be placed below support levels.'
          }]
        },
        {
          id: 'rm-lesson-2-3',
          title: 'Portfolio Risk Management',
          duration: '17 min',
          notes: `# Portfolio Risk Management\n\nManaging risk across your entire portfolio.\n\n## Total Risk Limits:\n- **Maximum 5-6% total risk** across all positions\n- **Diversify** — don't concentrate risk\n- **Correlation** — avoid highly correlated positions\n\n## Position Limits:\n- **Single position** — max 10-20% of portfolio\n- **Single sector** — max 25-30%\n- **Single country** — consider geographic limits\n\n## Risk Budgeting:\n- Allocate risk across positions\n- Higher conviction = more risk allocation\n- Lower conviction = less risk allocation\n- Keep some risk budget in reserve\n\n## Monitoring:\n- Track total portfolio risk\n- Monitor correlations\n- Adjust as positions change\n- Rebalance when needed`,
          importantPoints: ['Limit total portfolio risk to 5-6%', 'Diversify across positions and sectors', 'Monitor correlations', 'Keep risk budget reserve'],
          quiz: [{
            id: 'rm-q2-3-1',
            question: 'What is maximum total portfolio risk?',
            options: ['10-15%', '5-6%', '20-30%', '50%'],
            correctAnswer: 1,
            explanation: 'Maximum total portfolio risk should be limited to 5-6% across all positions.'
          }]
        },
        {
          id: 'rm-lesson-2-4',
          title: 'Risk-Adjusted Returns',
          duration: '16 min',
          notes: `# Risk-Adjusted Returns\n\nEvaluating returns relative to risk taken.\n\n## Key Metrics:\n- **Sharpe Ratio** — (Return - Risk-free) / Standard Deviation\n- **Sortino Ratio** — only penalizes downside volatility\n- **Calmar Ratio** — Return / Maximum Drawdown\n\n## Interpretation:\n- **Higher ratios** — better risk-adjusted returns\n- **Compare to benchmark** — S&P 500 Sharpe ~1.0\n- **>1.0 Sharpe** — good risk-adjusted returns\n- **>2.0 Sharpe** — excellent\n\n## Improving Risk-Adjusted Returns:\n- Reduce unnecessary risk\n- Improve diversification\n- Better entry/exit timing\n- Cut losses quickly\n\n## Focus:\n- Risk-adjusted returns matter more than absolute returns\n- Consistency beats volatility\n- Protect capital first`,
          importantPoints: ['Risk-adjusted returns matter more than absolute', 'Sharpe ratio >1.0 is good', 'Reduce unnecessary risk', 'Protect capital first'],
          quiz: [{
            id: 'rm-q2-4-1',
            question: 'What does Sharpe ratio measure?',
            options: ['Absolute return', 'Risk-adjusted return', 'Volatility only', 'Dividend yield'],
            correctAnswer: 1,
            explanation: 'Sharpe ratio measures risk-adjusted returns by comparing returns to volatility.'
          }]
        }
      ],
      moduleTest: [{ id: 'rm-mt2-1', question: 'Standard risk per trade?', options: ['5-10%', '1-2%', '10-20%', '50%'], correctAnswer: 1 }]
    },
    {
      id: 'rm-module-3',
      title: 'Investor Psychology',
      description: 'Understand psychological factors affecting investment decisions',
      lessons: [
        {
          id: 'rm-lesson-3-1',
          title: 'Emotions in Investing',
          duration: '18 min',
          notes: `# Emotions in Investing\n\nEmotions are the enemy of rational investing.\n\n## Common Emotions:\n- **Fear** — causes selling at bottoms\n- **Greed** — causes buying at tops\n- **Hope** — holding losing positions too long\n- **Regret** — avoiding decisions\n\n## Emotional Cycle:\n1. **Optimism** — market rising, confidence high\n2. **Euphoria** — peak, everyone buying\n3. **Anxiety** — first decline, worry begins\n4. **Fear** — sharp decline, panic selling\n5. **Despair** — bottom, everyone selling\n6. **Hope** — recovery begins\n7. **Relief** — back to optimism\n\n## Impact:\n- **Buy high, sell low** — opposite of goal\n- **Overtrading** — emotional decisions\n- **Missing opportunities** — fear prevents action\n- **Holding losers** — hope prevents cutting losses\n\n## Solution:\n- **Stick to plan** — written investment plan\n- **Automate** — remove emotion from decisions\n- **Educate** — understand markets\n- **Discipline** — follow rules`,
          importantPoints: ['Emotions cause poor decisions', 'Fear and greed drive market cycles', 'Stick to written plan', 'Discipline overcomes emotions'],
          quiz: [{
            id: 'rm-q3-1-1',
            question: 'What causes buying at tops?',
            options: ['Fear', 'Greed', 'Hope', 'Regret'],
            correctAnswer: 1,
            explanation: 'Greed causes investors to buy at market tops when prices are highest.'
          }]
        },
        {
          id: 'rm-lesson-3-2',
          title: 'Overconfidence Bias',
          duration: '17 min',
          notes: `# Overconfidence Bias\n\nOverconfidence leads to excessive trading and poor performance.\n\n## Manifestations:\n- **Trading too frequently** — overestimate skill\n- **Ignoring risks** — underestimate downside\n- **Not diversifying** — overestimate knowledge\n- **Ignoring advice** — think you know better\n\n## Causes:\n- **Recent success** — attribute to skill\n- **Selective memory** — remember wins, forget losses\n- **Illusion of control** — think you control outcomes\n\n## Consequences:\n- **Lower returns** — trading costs and mistakes\n- **Higher risk** — taking unnecessary risks\n- **Stress** — constant decision-making\n\n## Solutions:\n- **Track performance** — reality check\n- **Compare to benchmarks** — are you really better?\n- **Limit trading** — reduce frequency\n- **Seek feedback** — outside perspective`,
          importantPoints: ['Overconfidence leads to overtrading', 'Track actual performance', 'Compare to benchmarks', 'Limit trading frequency'],
          quiz: [{
            id: 'rm-q3-2-1',
            question: 'What does overconfidence cause?',
            options: ['Under-trading', 'Over-trading', 'No trading', 'Better returns'],
            correctAnswer: 1,
            explanation: 'Overconfidence causes excessive trading, leading to higher costs and lower returns.'
          }]
        },
        {
          id: 'rm-lesson-3-3',
          title: 'Loss Aversion',
          duration: '16 min',
          notes: `# Loss Aversion\n\nPeople feel losses more strongly than equivalent gains.\n\n## The Effect:\n- **2x pain** — losses feel twice as bad as gains feel good\n- **Holding losers** — avoid realizing losses\n- **Selling winners** — lock in gains too early\n- **Risk avoidance** — miss opportunities\n\n## Impact:\n- **Disposition Effect** — sell winners, hold losers\n- **Portfolio drag** — losers drag down returns\n- **Missed opportunities** — fear prevents action\n\n## Solutions:\n- **Cut losses quickly** — accept small losses\n- **Let winners run** — don't sell too early\n- **Focus on process** — not individual outcomes\n- **Rebalance regularly** — systematic approach`,
          importantPoints: ['Losses feel worse than gains', 'Cut losses quickly', 'Let winners run', 'Focus on process not outcomes'],
          quiz: [{
            id: 'rm-q3-3-1',
            question: 'What is loss aversion?',
            options: ['Loving losses', 'Feeling losses more than gains', 'Ignoring losses', 'Seeking losses'],
            correctAnswer: 1,
            explanation: 'Loss aversion is the tendency to feel losses more strongly than equivalent gains.'
          }]
        },
        {
          id: 'rm-lesson-3-4',
          title: 'Herd Mentality',
          duration: '18 min',
          notes: `# Herd Mentality\n\nFollowing the crowd leads to poor investment decisions.\n\n## The Problem:\n- **Buying at tops** — everyone is buying\n- **Selling at bottoms** — everyone is selling\n- **FOMO** — fear of missing out\n- **Groupthink** — no independent analysis\n\n## Signs:\n- **Media hype** — constant coverage\n- **Social media** — everyone talking about it\n- **FOMO** — fear of missing out\n- **Rising prices** — momentum buying\n\n## Why It Happens:\n- **Social proof** — others must know something\n- **Fear of being wrong alone** — safety in numbers\n- **Information cascade** — following others' actions\n\n## Solutions:\n- **Independent analysis** — do your own research\n- **Contrarian thinking** — question the crowd\n- **Value investing** — buy when others sell\n- **Stick to plan** — ignore noise`,
          importantPoints: ['Herd mentality causes poor timing', 'Do independent analysis', 'Be contrarian when appropriate', 'Ignore media hype'],
          quiz: [{
            id: 'rm-q3-4-1',
            question: 'What does herd mentality cause?',
            options: ['Good timing', 'Poor timing', 'No trading', 'Better returns'],
            correctAnswer: 1,
            explanation: 'Herd mentality causes buying at tops and selling at bottoms - poor timing.'
          }]
        }
      ],
      moduleTest: [{ id: 'rm-mt3-1', question: 'What causes buying at tops?', options: ['Fear', 'Greed', 'Hope', 'Regret'], correctAnswer: 1 }]
    },
    {
      id: 'rm-module-4',
      title: 'Behavioral Biases',
      description: 'Identify and overcome common behavioral biases',
      lessons: [
        {
          id: 'rm-lesson-4-1',
          title: 'Confirmation Bias',
          duration: '17 min',
          notes: `# Confirmation Bias\n\nSeeking information that confirms existing beliefs.\n\n## The Problem:\n- **Ignore contradictory evidence** — dismiss opposing views\n- **Selective attention** — notice confirming information\n- **Biased research** — only look for support\n- **Poor decisions** — based on incomplete information\n\n## Examples:\n- **Stock research** — only reading positive news\n- **Ignoring warnings** — dismissing negative signals\n- **Echo chambers** — surrounding with like-minded people\n\n## Solutions:\n- **Seek disconfirming evidence** — actively look for opposing views\n- **Challenge assumptions** — question your beliefs\n- **Diverse sources** — read different perspectives\n- **Devil's advocate** — argue against your position`,
          importantPoints: ['Confirmation bias ignores contradictory evidence', 'Seek disconfirming evidence', 'Challenge your assumptions', 'Read diverse sources'],
          quiz: [{
            id: 'rm-q4-1-1',
            question: 'What does confirmation bias do?',
            options: ['Seeks opposing views', 'Seeks confirming information', 'Ignores all information', 'Random decisions'],
            correctAnswer: 1,
            explanation: 'Confirmation bias causes people to seek information that confirms existing beliefs.'
          }]
        },
        {
          id: 'rm-lesson-4-2',
          title: 'Anchoring Bias',
          duration: '16 min',
          notes: `# Anchoring Bias\n\nRelying too heavily on first piece of information.\n\n## The Problem:\n- **Price anchoring** — fixated on purchase price\n- **Target anchoring** — fixated on analyst targets\n- **Historical anchoring** — fixated on past prices\n- **Poor decisions** — based on irrelevant anchors\n\n## Examples:\n- **"I won't sell until I break even"** — price anchor\n- **"Analyst says $100"** — target anchor\n- **"It used to be $50"** — historical anchor\n\n## Solutions:\n- **Focus on current value** — not purchase price\n- **Reassess regularly** — update targets\n- **Ignore sunk costs** — past is past\n- **Current fundamentals** — what matters now`,
          importantPoints: ['Anchoring fixates on irrelevant information', 'Focus on current value', 'Ignore purchase price', 'Reassess regularly'],
          quiz: [{
            id: 'rm-q4-2-1',
            question: 'What is anchoring bias?',
            options: ['Ignoring first information', 'Relying on first information', 'Random decisions', 'No bias'],
            correctAnswer: 1,
            explanation: 'Anchoring bias is relying too heavily on the first piece of information encountered.'
          }]
        },
        {
          id: 'rm-lesson-4-3',
          title: 'Recency Bias',
          duration: '17 min',
          notes: `# Recency Bias\n\nGiving too much weight to recent events.\n\n## The Problem:\n- **Recent performance** — overweights recent returns\n- **Recent news** — overweights recent information\n- **Market timing** — reacts to recent moves\n- **Poor decisions** — based on short-term noise\n\n## Examples:\n- **Selling after decline** — recent bad performance\n- **Buying after rise** — recent good performance\n- **Chasing trends** — following recent winners\n\n## Solutions:\n- **Long-term perspective** — focus on fundamentals\n- **Ignore short-term noise** — daily/weekly moves\n- **Historical context** — consider longer history\n- **Stick to plan** — don't react to recent events`,
          importantPoints: ['Recency bias overweights recent events', 'Focus on long-term perspective', 'Ignore short-term noise', 'Consider historical context'],
          quiz: [{
            id: 'rm-q4-3-1',
            question: 'What does recency bias do?',
            options: ['Ignores recent events', 'Overweights recent events', 'Equal weight', 'Random'],
            correctAnswer: 1,
            explanation: 'Recency bias gives too much weight to recent events and information.'
          }]
        },
        {
          id: 'rm-lesson-4-4',
          title: 'Availability Bias',
          duration: '16 min',
          notes: `# Availability Bias\n\nOverestimating probability of memorable events.\n\n## The Problem:\n- **Vivid examples** — memorable events seem more likely\n- **Media coverage** — covered events seem more common\n- **Personal experience** — own experience seems typical\n- **Poor risk assessment** — misjudge probabilities\n\n## Examples:\n- **Market crash fear** — 2008 is memorable\n- **Tech stock focus** — media covers tech\n- **Local bias** — overinvest in familiar companies\n\n## Solutions:\n- **Statistical thinking** — use data, not anecdotes\n- **Diversify** — don't overconcentrate\n- **Historical data** — long-term probabilities\n- **Avoid media hype** — don't overreact`,
          importantPoints: ['Availability bias overestimates memorable events', 'Use statistical thinking', 'Consider historical data', 'Avoid media hype'],
          quiz: [{
            id: 'rm-q4-4-1',
            question: 'What does availability bias cause?',
            options: ['Accurate probabilities', 'Overestimate memorable events', 'Underestimate all events', 'No bias'],
            correctAnswer: 1,
            explanation: 'Availability bias causes overestimation of memorable or easily recalled events.'
          }]
        }
      ],
      moduleTest: [{ id: 'rm-mt4-1', question: 'What does confirmation bias do?', options: ['Seeks opposing views', 'Seeks confirming info', 'Ignores all', 'Random'], correctAnswer: 1 }]
    },
    {
      id: 'rm-module-5',
      title: 'Emotional Discipline',
      description: 'Develop discipline to overcome emotional investing',
      lessons: [
        {
          id: 'rm-lesson-5-1',
          title: 'Building Discipline',
          duration: '18 min',
          notes: `# Building Discipline\n\nDiscipline is the key to successful investing.\n\n## Core Principles:\n- **Stick to plan** — written investment plan\n- **Follow rules** — predefined rules prevent emotions\n- **Automate** — remove emotion from decisions\n- **Patience** — wait for opportunities\n\n## Techniques:\n- **Written plan** — document strategy and rules\n- **Checklists** — systematic decision process\n- **Automated investing** — dollar-cost averaging\n- **Regular review** — scheduled, not emotional\n\n## Habits:\n- **Daily routine** — consistent process\n- **Education** — continuous learning\n- **Journal** — track decisions and outcomes\n- **Accountability** — share with advisor or partner\n\n## Overcoming Emotions:\n- **Pause before acting** — 24-hour rule\n- **Review plan** — remind yourself of strategy\n- **Seek perspective** — talk to others\n- **Focus on process** — not outcomes`,
          importantPoints: ['Discipline requires written plan', 'Automate to remove emotions', 'Follow predefined rules', 'Focus on process not outcomes'],
          quiz: [{
            id: 'rm-q5-1-1',
            question: 'What is key to successful investing?',
            options: ['Emotions', 'Discipline', 'Luck', 'Timing'],
            correctAnswer: 1,
            explanation: 'Discipline - sticking to a plan and following rules - is key to successful investing.'
          }]
        },
        {
          id: 'rm-lesson-5-2',
          title: 'Creating an Investment Plan',
          duration: '19 min',
          notes: `# Creating an Investment Plan\n\nA written plan prevents emotional decisions.\n\n## Plan Components:\n- **Goals** — what you're investing for\n- **Time horizon** — when you need money\n- **Risk tolerance** — how much risk you can take\n- **Asset allocation** — target percentages\n- **Rebalancing rules** — when to adjust\n- **Buy/sell criteria** — when to act\n\n## Writing Your Plan:\n1. Define goals and timeline\n2. Assess risk tolerance\n3. Set asset allocation\n4. Define rebalancing rules\n5. Set buy/sell criteria\n6. Document everything\n\n## Using Your Plan:\n- **Refer to it** — before making decisions\n- **Update annually** — or when circumstances change\n- **Stick to it** — especially during volatility\n- **Review performance** — against plan, not emotions`,
          importantPoints: ['Written plan prevents emotional decisions', 'Include all key components', 'Refer to plan before decisions', 'Update annually'],
          quiz: [{
            id: 'rm-q5-2-1',
            question: 'What prevents emotional decisions?',
            options: ['No plan', 'Written plan', 'Following others', 'Media'],
            correctAnswer: 1,
            explanation: 'A written investment plan provides objective criteria and prevents emotional decision-making.'
          }]
        },
        {
          id: 'rm-lesson-5-3',
          title: 'Maintaining Discipline',
          duration: '17 min',
          notes: `# Maintaining Discipline\n\nDiscipline is easy in theory, hard in practice.\n\n## Challenges:\n- **Market volatility** — tests resolve\n- **Media noise** — creates fear/greed\n- **Peer pressure** — others doing different\n- **Emotions** — fear and greed\n\n## Strategies:\n- **Limit information** — don't check prices daily\n- **Avoid media** — reduce noise\n- **Focus on long-term** — ignore short-term\n- **Remember goals** — why you're investing\n\n## When Discipline Falters:\n- **Review plan** — remind yourself of strategy\n- **Seek support** — advisor or partner\n- **Take break** — step away from markets\n- **Reassess** — maybe plan needs adjustment\n\n## Success Factors:\n- **Consistency** — stick to routine\n- **Patience** — results take time\n- **Education** — understand markets\n- **Support** — don't go it alone`,
          importantPoints: ['Discipline is hard but essential', 'Limit information intake', 'Focus on long-term goals', 'Seek support when needed'],
          quiz: [{
            id: 'rm-q5-3-1',
            question: 'How to maintain discipline?',
            options: ['Check prices daily', 'Limit information', 'Follow media', 'React to news'],
            correctAnswer: 1,
            explanation: 'Limiting information intake helps maintain discipline by reducing emotional triggers.'
          }]
        }
      ],
      moduleTest: [{ id: 'rm-mt5-1', question: 'What is key to success?', options: ['Emotions', 'Discipline', 'Luck', 'Timing'], correctAnswer: 1 }]
    }
  ],
  finalExam: [
    { id: 'rm-fe-1', question: 'What risk can be diversified?', options: ['Market', 'Unsystematic', 'Inflation', 'Interest rate'], correctAnswer: 1 },
    { id: 'rm-fe-2', question: 'What does beta measure?', options: ['Return', 'Volatility vs market', 'Dividend', 'P/E'], correctAnswer: 1 },
    { id: 'rm-fe-3', question: 'Standard risk per trade?', options: ['5-10%', '1-2%', '10-20%', '50%'], correctAnswer: 1 },
    { id: 'rm-fe-4', question: 'Where place stop for longs?', options: ['Above entry', 'Below support', 'At entry', 'No stop'], correctAnswer: 1 },
    { id: 'rm-fe-5', question: 'What causes buying at tops?', options: ['Fear', 'Greed', 'Hope', 'Regret'], correctAnswer: 1 },
    { id: 'rm-fe-6', question: 'What does confirmation bias do?', options: ['Seeks opposing', 'Seeks confirming', 'Ignores all', 'Random'], correctAnswer: 1 },
    { id: 'rm-fe-7', question: 'What is key to success?', options: ['Emotions', 'Discipline', 'Luck', 'Timing'], correctAnswer: 1 },
    { id: 'rm-fe-8', question: 'What prevents emotions?', options: ['No plan', 'Written plan', 'Following others', 'Media'], correctAnswer: 1 },
    { id: 'rm-fe-9', question: 'Maximum portfolio risk?', options: ['10-15%', '5-6%', '20-30%', '50%'], correctAnswer: 1 },
    { id: 'rm-fe-10', question: 'What does Sharpe measure?', options: ['Absolute return', 'Risk-adjusted', 'Volatility only', 'Dividend'], correctAnswer: 1 }
  ]
},
{
  id: 'advanced-trading',
  title: 'Advanced Trading Strategies',
  description: 'Master options, derivatives, quantitative approaches, and algorithmic trading concepts',
  finalExamPassRate: 75,
  modules: [
    {
      id: 'at-module-1',
      title: 'Options Basics',
      description: 'Understanding options contracts and basic strategies',
      lessons: [
        {
          id: 'at-lesson-1-1',
          title: 'Introduction to Options',
          duration: '19 min',
          notes: `# Introduction to Options\n\nOptions give the right, but not obligation, to buy or sell at a set price.\n\n## Key Concepts:\n- **Call Option** — right to buy\n- **Put Option** — right to sell\n- **Strike Price** — exercise price\n- **Expiration** — when option expires\n- **Premium** — cost of option\n\n## Option Types:\n- **American** — can exercise anytime before expiration\n- **European** — can only exercise at expiration\n\n## Key Terms:\n- **In the Money (ITM)** — profitable if exercised\n- **At the Money (ATM)** — strike equals current price\n- **Out of the Money (OTM)** — not profitable if exercised\n\n## Uses:\n- **Speculation** — betting on direction\n- **Hedging** — protecting positions\n- **Income** — selling options for premium`,
          importantPoints: ['Options give right but not obligation', 'Calls = right to buy, Puts = right to sell', 'Premium is the cost', 'Options can be used for speculation or hedging'],
          quiz: [{
            id: 'at-q1-1-1',
            question: 'What is a call option?',
            options: ['Right to sell', 'Right to buy', 'Obligation to buy', 'Obligation to sell'],
            correctAnswer: 1,
            explanation: 'A call option gives the holder the right (but not obligation) to buy at the strike price.'
          }]
        },
        {
          id: 'at-lesson-1-2',
          title: 'Option Pricing',
          duration: '20 min',
          notes: `# Option Pricing\n\nUnderstanding what determines option prices.\n\n## Key Factors:\n- **Stock Price** — current price vs strike\n- **Strike Price** — exercise price\n- **Time to Expiration** — more time = more value\n- **Volatility** — higher volatility = higher premium\n- **Interest Rates** — affects cost of carry\n- **Dividends** — reduces call value, increases put value\n\n## Intrinsic Value:\n- **Call** — Max(0, Stock Price - Strike)\n- **Put** — Max(0, Strike - Stock Price)\n\n## Time Value:\n- Premium - Intrinsic Value\n- Decays as expiration approaches\n- Higher volatility = more time value\n\n## Greeks:\n- **Delta** — price sensitivity\n- **Gamma** — delta sensitivity\n- **Theta** — time decay\n- **Vega** — volatility sensitivity`,
          importantPoints: ['Multiple factors affect option pricing', 'Intrinsic value is immediate profit', 'Time value decays to zero', 'Greeks measure sensitivities'],
          quiz: [{
            id: 'at-q1-2-1',
            question: 'What increases option premium?',
            options: ['Lower volatility', 'Less time', 'Higher volatility', 'Lower stock price'],
            correctAnswer: 2,
            explanation: 'Higher volatility increases option premiums because it increases potential profit.'
          }]
        },
        {
          id: 'at-lesson-1-3',
          title: 'Basic Option Strategies',
          duration: '18 min',
          notes: `# Basic Option Strategies\n\nCommon option strategies for different market views.\n\n## Bullish Strategies:\n- **Long Call** — buy call, profit if stock rises\n- **Covered Call** — own stock, sell call\n- **Bull Call Spread** — buy call, sell higher call\n\n## Bearish Strategies:\n- **Long Put** — buy put, profit if stock falls\n- **Protective Put** — own stock, buy put\n- **Bear Put Spread** — buy put, sell lower put\n\n## Neutral Strategies:\n- **Straddle** — buy call and put (same strike)\n- **Strangle** — buy call and put (different strikes)\n- **Iron Condor** — combination of spreads\n\n## Income Strategies:\n- **Covered Call** — sell calls on owned stock\n- **Cash-Secured Put** — sell puts, collect premium`,
          importantPoints: ['Different strategies for different market views', 'Covered calls generate income', 'Spreads limit risk and cost', 'Understand risk/reward before using'],
          quiz: [{
            id: 'at-q1-3-1',
            question: 'What is a bullish strategy?',
            options: ['Long put', 'Long call', 'Bear spread', 'Protective put'],
            correctAnswer: 1,
            explanation: 'Long call is a bullish strategy that profits if the stock price rises above the strike.'
          }]
        },
        {
          id: 'at-lesson-1-4',
          title: 'Risk Management with Options',
          duration: '17 min',
          notes: `# Risk Management with Options\n\nOptions can limit risk but also create unlimited risk.\n\n## Limited Risk Strategies:\n- **Long options** — max loss = premium paid\n- **Spreads** — defined risk\n- **Covered calls** — stock ownership limits risk\n\n## Unlimited Risk Strategies:\n- **Naked calls** — unlimited loss potential\n- **Naked puts** — large loss potential\n- **Require margin** — broker requirements\n\n## Best Practices:\n- **Start with long options** — limited risk\n- **Understand max loss** — before entering\n- **Use stops** — even with options\n- **Position sizing** — don't over-leverage\n\n## Common Mistakes:\n- **Selling naked options** — unlimited risk\n- **Over-leveraging** — too much exposure\n- **Ignoring Greeks** — not understanding sensitivities\n- **Holding to expiration** — time decay risk`,
          importantPoints: ['Long options have limited risk', 'Naked options have unlimited risk', 'Understand max loss before trading', 'Start with limited risk strategies'],
          quiz: [{
            id: 'at-q1-4-1',
            question: 'What has unlimited risk?',
            options: ['Long call', 'Long put', 'Naked call', 'Covered call'],
            correctAnswer: 2,
            explanation: 'Naked calls have unlimited risk because stock can rise indefinitely.'
          }]
        }
      ],
      moduleTest: [{ id: 'at-mt1-1', question: 'What is a call option?', options: ['Right to sell', 'Right to buy', 'Obligation', 'Stock'], correctAnswer: 1 }]
    },
    {
      id: 'at-module-2',
      title: 'Options Strategies',
      description: 'Advanced option strategies for different market conditions',
      lessons: [
        {
          id: 'at-lesson-2-1',
          title: 'Income Strategies',
          duration: '19 min',
          notes: `# Income Strategies\n\nUsing options to generate consistent income.\n\n## Covered Calls:\n- Own stock, sell call options\n- Collect premium\n- Limited upside (capped at strike)\n- Keep stock if not assigned\n\n## Cash-Secured Puts:\n- Sell put, keep cash to buy if assigned\n- Collect premium\n- Willing to buy at strike\n- Lower cost basis if assigned\n\n## Best Practices:\n- **Quality stocks** — don't write on junk\n- **Strike selection** — balance premium vs risk\n- **Expiration** — monthly typically best\n- **Manage positions** — close early if profitable\n\n## Risks:\n- **Stock decline** — covered calls don't protect downside\n- **Assignment** — may need to sell/buy stock\n- **Opportunity cost** — capped gains on covered calls`,
          importantPoints: ['Covered calls generate income', 'Cash-secured puts also generate income', 'Use quality stocks', 'Manage positions actively'],
          quiz: [{
            id: 'at-q2-1-1',
            question: 'What is a covered call?',
            options: ['Buy call', 'Own stock and sell call', 'Sell call only', 'Buy put'],
            correctAnswer: 1,
            explanation: 'Covered call means owning the stock and selling a call option against it.'
          }]
        },
        {
          id: 'at-lesson-2-2',
          title: 'Protective Strategies',
          duration: '18 min',
          notes: `# Protective Strategies\n\nUsing options to protect existing positions.\n\n## Protective Put:\n- Own stock, buy put\n- Limits downside risk\n- Cost = put premium\n- Insurance policy\n\n## Collar:\n- Own stock, buy put, sell call\n- Limits both upside and downside\n- Can be cost-neutral\n- Defined risk range\n\n## When to Use:\n- **High conviction** — want to keep stock\n- **Near target** — protect gains\n- **Volatile markets** — reduce risk\n- **Tax considerations** — avoid selling\n\n## Trade-offs:\n- **Cost** — premium reduces returns\n- **Upside limit** — collars cap gains\n- **Timing** — when to implement`,
          importantPoints: ['Protective puts limit downside', 'Collars limit both directions', 'Use when protecting gains', 'Consider cost vs protection'],
          quiz: [{
            id: 'at-q2-2-1',
            question: 'What does protective put do?',
            options: ['Increases upside', 'Limits downside', 'Generates income', 'No protection'],
            correctAnswer: 1,
            explanation: 'Protective put limits downside risk by providing the right to sell at strike price.'
          }]
        },
        {
          id: 'at-lesson-2-3',
          title: 'Spread Strategies',
          duration: '17 min',
          notes: `# Spread Strategies\n\nCombining multiple options to limit risk and cost.\n\n## Vertical Spreads:\n- **Bull Call Spread** — buy lower strike call, sell higher strike call\n- **Bear Put Spread** — buy higher strike put, sell lower strike put\n- **Defined risk** — max loss = net premium paid\n- **Defined profit** — max profit = spread width - premium\n\n## Calendar Spreads:\n- Buy longer-term option, sell shorter-term\n- Profit from time decay difference\n- Neutral strategy\n\n## Butterfly Spreads:\n- Combination of three strikes\n- Limited risk, limited reward\n- Profits in narrow range\n\n## Advantages:\n- **Lower cost** — selling reduces premium\n- **Defined risk** — know max loss\n- **Flexibility** — various market views`,
          importantPoints: ['Spreads limit risk and cost', 'Vertical spreads have defined risk', 'Calendar spreads profit from time decay', 'Understand max profit and loss'],
          quiz: [{
            id: 'at-q2-3-1',
            question: 'What is advantage of spreads?',
            options: ['Unlimited profit', 'Unlimited risk', 'Defined risk', 'No cost'],
            correctAnswer: 2,
            explanation: 'Spreads provide defined risk - you know maximum loss before entering.'
          }]
        },
        {
          id: 'at-lesson-2-4',
          title: 'Advanced Strategies',
          duration: '20 min',
          notes: `# Advanced Strategies\n\nComplex option strategies for sophisticated traders.\n\n## Straddles and Strangles:\n- **Straddle** — buy call and put (same strike)\n- **Strangle** — buy call and put (different strikes)\n- **Profit from volatility** — big move either direction\n- **High cost** — buying two options\n\n## Iron Condor:\n- Combination of bull and bear spreads\n- Profits in range\n- Limited risk\n- Income strategy\n\n## Butterfly:\n- Three strikes, same expiration\n- Profits at middle strike\n- Very limited risk\n- Low probability\n\n## When to Use:\n- **High volatility expected** — straddles/strangles\n- **Range-bound market** — iron condors\n- **Specific price target** — butterflies\n\n## Considerations:\n- **Complexity** — harder to manage\n- **Commissions** — multiple legs\n- **Assignment risk** — short options\n- **Requires experience**`,
          importantPoints: ['Advanced strategies are complex', 'Straddles profit from volatility', 'Iron condors profit in ranges', 'Require experience and understanding'],
          quiz: [{
            id: 'at-q2-4-1',
            question: 'What do straddles profit from?',
            options: ['Direction', 'Volatility', 'Time decay', 'Dividends'],
            correctAnswer: 1,
            explanation: 'Straddles profit from large price movements in either direction - volatility.'
          }]
        }
      ],
      moduleTest: [{ id: 'at-mt2-1', question: 'What is covered call?', options: ['Buy call', 'Own stock and sell call', 'Sell call only', 'Buy put'], correctAnswer: 1 }]
    },
    {
      id: 'at-module-3',
      title: 'Futures & Derivatives',
      description: 'Understanding futures contracts and other derivatives',
      lessons: [
        {
          id: 'at-lesson-3-1',
          title: 'Futures Basics',
          duration: '18 min',
          notes: `# Futures Basics\n\nFutures are contracts to buy/sell at future date and price.\n\n## Key Concepts:\n- **Contract** — standardized agreement\n- **Expiration** — settlement date\n- **Margin** — good faith deposit\n- **Leverage** — control large position with small capital\n\n## Differences from Options:\n- **Obligation** — must fulfill contract\n- **Daily settlement** — marked to market daily\n- **Margin calls** — must maintain margin\n- **No premium** — no upfront cost (just margin)\n\n## Uses:\n- **Hedging** — protect against price changes\n- **Speculation** — bet on direction\n- **Arbitrage** — profit from price differences\n\n## Risks:\n- **Leverage** — amplifies gains and losses\n- **Margin calls** — must add funds\n- **Unlimited loss** — can exceed initial investment`,
          importantPoints: ['Futures are obligations, not rights', 'High leverage amplifies risk', 'Daily settlement requires margin', 'Used for hedging or speculation'],
          quiz: [{
            id: 'at-q3-1-1',
            question: 'What is key difference from options?',
            options: ['Right not obligation', 'Obligation to fulfill', 'No expiration', 'No leverage'],
            correctAnswer: 1,
            explanation: 'Futures are obligations to fulfill the contract, unlike options which are rights.'
          }]
        },
        {
          id: 'at-lesson-3-2',
          title: 'Futures Trading',
          duration: '17 min',
          notes: `# Futures Trading\n\nHow to trade futures contracts.\n\n## Contract Specifications:\n- **Underlying** — what you're trading\n- **Contract size** — quantity per contract\n- **Tick size** — minimum price movement\n- **Expiration** — settlement date\n\n## Margin Requirements:\n- **Initial margin** — required to open\n- **Maintenance margin** — minimum to maintain\n- **Variation margin** — daily settlement\n\n## Trading Process:\n1. Open account with futures broker\n2. Deposit initial margin\n3. Place order (long or short)\n4. Monitor position\n5. Close before expiration or take delivery\n\n## Risk Management:\n- **Stop losses** — limit losses\n- **Position sizing** — don't over-leverage\n- **Monitor margin** — avoid margin calls\n- **Understand delivery** — most close before expiration`,
          importantPoints: ['Futures require margin', 'Monitor margin requirements', 'Most traders close before expiration', 'High leverage requires careful risk management'],
          quiz: [{
            id: 'at-q3-2-1',
            question: 'What is required to trade futures?',
            options: ['Full payment', 'Margin deposit', 'No capital', 'Options'],
            correctAnswer: 1,
            explanation: 'Futures trading requires a margin deposit, not full payment, due to leverage.'
          }]
        },
        {
          id: 'at-lesson-3-3',
          title: 'Other Derivatives',
          duration: '16 min',
          notes: `# Other Derivatives\n\nBeyond options and futures.\n\n## Swaps:\n- Exchange cash flows\n- Interest rate swaps most common\n- Currency swaps\n- Credit default swaps\n\n## Forwards:\n- Similar to futures but customized\n- Over-the-counter (OTC)\n- No daily settlement\n- Counterparty risk\n\n## Structured Products:\n- Combinations of derivatives\n- Complex payoffs\n- Higher fees\n- Harder to understand\n\n## Considerations:\n- **Complexity** — understand what you're buying\n- **Counterparty risk** — OTC products\n- **Liquidity** — some products illiquid\n- **Costs** — fees and spreads\n\n## Best Practice:\n- Understand before investing\n- Start simple\n- Avoid complex products\n- Consider alternatives`,
          importantPoints: ['Derivatives can be complex', 'Understand what you\'re trading', 'OTC products have counterparty risk', 'Start with simple products'],
          quiz: [{
            id: 'at-q3-3-1',
            question: 'What is key consideration with derivatives?',
            options: ['Always simple', 'Understand complexity', 'No risk', 'Guaranteed returns'],
            correctAnswer: 1,
            explanation: 'Understanding the complexity and risks of derivatives is essential before trading.'
          }]
        }
      ],
      moduleTest: [{ id: 'at-mt3-1', question: 'Key difference from options?', options: ['Right', 'Obligation', 'No expiration', 'No leverage'], correctAnswer: 1 }]
    },
    {
      id: 'at-module-4',
      title: 'Quantitative Approaches',
      description: 'Using data and algorithms for trading decisions',
      lessons: [
        {
          id: 'at-lesson-4-1',
          title: 'Quantitative Analysis Basics',
          duration: '19 min',
          notes: `# Quantitative Analysis Basics\n\nUsing data and statistics to make trading decisions.\n\n## Key Concepts:\n- **Data-driven** — decisions based on data\n- **Backtesting** — testing strategies on historical data\n- **Statistical significance** — reliable patterns\n- **Risk models** — quantify risk\n\n## Advantages:\n- **Removes emotion** — systematic approach\n- **Testable** — can backtest strategies\n- **Scalable** — can handle large datasets\n- **Consistent** — follows rules\n\n## Limitations:\n- **Past performance** — doesn't guarantee future\n- **Overfitting** — curve-fitting to historical data\n- **Market changes** — strategies may stop working\n- **Data quality** — garbage in, garbage out\n\n## Common Approaches:\n- **Factor models** — identify return drivers\n- **Mean reversion** — prices return to average\n- **Momentum** — trends continue\n- **Pairs trading** — relative value`,
          importantPoints: ['Quantitative analysis is data-driven', 'Backtesting tests strategies', 'Beware overfitting', 'Past performance doesn\'t guarantee future'],
          quiz: [{
            id: 'at-q4-1-1',
            question: 'What is quantitative analysis?',
            options: ['Emotional', 'Data-driven', 'Random', 'Intuitive'],
            correctAnswer: 1,
            explanation: 'Quantitative analysis uses data and statistics to make systematic trading decisions.'
          }]
        },
        {
          id: 'at-lesson-4-2',
          title: 'Factor Investing',
          duration: '18 min',
          notes: `# Factor Investing\n\nInvesting based on systematic factors that drive returns.\n\n## Common Factors:\n- **Value** — cheap stocks outperform\n- **Size** — small caps outperform large\n- **Momentum** — winners continue winning\n- **Quality** — profitable companies outperform\n- **Low Volatility** — less volatile stocks outperform\n\n## Implementation:\n- **Factor ETFs** — easy access\n- **Stock selection** — screen for factors\n- **Multi-factor** — combine factors\n\n## Research:\n- **Fama-French** — value and size factors\n- **Academic studies** — factor persistence\n- **Real-world** — factors work long-term\n\n## Considerations:\n- **Factor cycles** — factors go in/out of favor\n- **Diversification** — don't over-concentrate\n- **Costs** — factor ETFs have fees\n- **Patience** — factors work over long-term`,
          importantPoints: ['Factors drive returns systematically', 'Value, size, momentum are common', 'Factors work long-term', 'Be patient with factor investing'],
          quiz: [{
            id: 'at-q4-2-1',
            question: 'What is a common factor?',
            options: ['Random', 'Value', 'Emotion', 'Media'],
            correctAnswer: 1,
            explanation: 'Value is a common factor - cheap stocks (low P/E, P/B) tend to outperform.'
          }]
        },
        {
          id: 'at-lesson-4-3',
          title: 'Backtesting Strategies',
          duration: '20 min',
          notes: `# Backtesting Strategies\n\nTesting trading strategies on historical data.\n\n## Process:\n1. **Define strategy** — clear rules\n2. **Get data** — historical prices, fundamentals\n3. **Code strategy** — implement rules\n4. **Run backtest** — simulate trading\n5. **Analyze results** — returns, drawdowns, Sharpe\n\n## Key Metrics:\n- **Total return** — overall performance\n- **Sharpe ratio** — risk-adjusted return\n- **Maximum drawdown** — worst decline\n- **Win rate** — % of profitable trades\n- **Profit factor** — gross profit / gross loss\n\n## Common Mistakes:\n- **Overfitting** — curve-fitting to data\n- **Look-ahead bias** — using future information\n- **Survivorship bias** — only successful companies\n- **Transaction costs** — ignoring fees\n\n## Best Practices:\n- **Out-of-sample testing** — test on unseen data\n- **Walk-forward** — rolling window testing\n- **Include costs** — realistic assumptions\n- **Multiple time periods** — different market conditions`,
          importantPoints: ['Backtesting tests strategies on historical data', 'Beware overfitting and biases', 'Include transaction costs', 'Test on out-of-sample data'],
          quiz: [{
            id: 'at-q4-3-1',
            question: 'What is overfitting?',
            options: ['Too simple', 'Curve-fitting to data', 'Random', 'No testing'],
            correctAnswer: 1,
            explanation: 'Overfitting is creating a strategy that works perfectly on historical data but fails in real trading.'
          }]
        },
        {
          id: 'at-lesson-4-4',
          title: 'Risk Models',
          duration: '17 min',
          notes: `# Risk Models\n\nQuantifying and managing portfolio risk.\n\n## Key Models:\n- **VaR (Value at Risk)** — potential loss at confidence level\n- **CVaR (Conditional VaR)** — expected loss beyond VaR\n- **Factor models** — risk from factors\n- **Stress testing** — extreme scenarios\n\n## Uses:\n- **Position sizing** — based on risk\n- **Portfolio construction** — optimize risk/return\n- **Risk limits** — set maximum exposures\n- **Monitoring** — track risk over time\n\n## Implementation:\n- **Historical simulation** — use past data\n- **Monte Carlo** — simulate scenarios\n- **Parametric** — assume distributions\n\n## Limitations:\n- **Model risk** — models may be wrong\n- **Past data** — may not predict future\n- **Correlations** — change in crises\n- **Black swans** — extreme events\n\n## Best Practices:\n- **Multiple models** — don't rely on one\n- **Stress test** — extreme scenarios\n- **Regular updates** — adjust for market changes\n- **Understand limitations**`,
          importantPoints: ['Risk models quantify portfolio risk', 'VaR estimates potential losses', 'Models have limitations', 'Use multiple approaches'],
          quiz: [{
            id: 'at-q4-4-1',
            question: 'What does VaR measure?',
            options: ['Returns', 'Potential loss', 'Volatility', 'Dividends'],
            correctAnswer: 1,
            explanation: 'VaR (Value at Risk) measures potential loss at a given confidence level.'
          }]
        }
      ],
      moduleTest: [{ id: 'at-mt4-1', question: 'What is quantitative analysis?', options: ['Emotional', 'Data-driven', 'Random', 'Intuitive'], correctAnswer: 1 }]
    },
    {
      id: 'at-module-5',
      title: 'Algorithmic Trading Concepts',
      description: 'Introduction to algorithmic and systematic trading',
      lessons: [
        {
          id: 'at-lesson-5-1',
          title: 'Algorithmic Trading Basics',
          duration: '18 min',
          notes: `# Algorithmic Trading Basics\n\nUsing computer algorithms to execute trades automatically.\n\n## Key Concepts:\n- **Automated execution** — computer makes decisions\n- **Systematic rules** — predefined logic\n- **Speed** — faster than human\n- **Consistency** — no emotions\n\n## Types:\n- **Execution algorithms** — minimize market impact\n- **Strategy algorithms** — generate signals\n- **Market making** — provide liquidity\n- **Arbitrage** — profit from price differences\n\n## Advantages:\n- **Speed** — instant execution\n- **Discipline** — follows rules\n- **Scalability** — handle many positions\n- **Backtesting** — test before using\n\n## Challenges:\n- **Complexity** — requires programming\n- **Technology** — need infrastructure\n- **Competition** — institutional competition\n- **Regulation** — compliance requirements`,
          importantPoints: ['Algorithmic trading is automated', 'Requires programming skills', 'Fast and disciplined', 'Competitive field'],
          quiz: [{
            id: 'at-q5-1-1',
            question: 'What is algorithmic trading?',
            options: ['Manual', 'Automated', 'Random', 'Emotional'],
            correctAnswer: 1,
            explanation: 'Algorithmic trading uses computer algorithms to execute trades automatically.'
          }]
        },
        {
          id: 'at-lesson-5-2',
          title: 'Systematic Strategies',
          duration: '19 min',
          notes: `# Systematic Strategies\n\nRule-based trading strategies that can be automated.\n\n## Common Strategies:\n- **Mean reversion** — buy low, sell high\n- **Momentum** — follow trends\n- **Pairs trading** — relative value\n- **Statistical arbitrage** — exploit mispricing\n\n## Development Process:\n1. **Idea** — hypothesis about market\n2. **Research** — test hypothesis\n3. **Backtest** — historical testing\n4. **Paper trade** — simulated trading\n5. **Live trade** — small size initially\n6. **Monitor** — track performance\n\n## Key Requirements:\n- **Clear rules** — unambiguous signals\n- **Risk management** — stop losses, position sizing\n- **Monitoring** — track performance\n- **Adaptation** — adjust as needed\n\n## Best Practices:\n- **Start simple** — basic strategies first\n- **Test thoroughly** — before risking capital\n- **Monitor closely** — watch for issues\n- **Have exit plan** — when to stop`,
          importantPoints: ['Systematic strategies follow rules', 'Test thoroughly before using', 'Start simple', 'Monitor performance'],
          quiz: [{
            id: 'at-q5-2-1',
            question: 'What do systematic strategies require?',
            options: ['Emotions', 'Clear rules', 'Random decisions', 'No testing'],
            correctAnswer: 1,
            explanation: 'Systematic strategies require clear, unambiguous rules that can be programmed.'
          }]
        },
        {
          id: 'at-lesson-5-3',
          title: 'Technology Requirements',
          duration: '17 min',
          notes: `# Technology Requirements\n\nWhat you need for algorithmic trading.\n\n## Software:\n- **Programming language** — Python, R, C++\n- **Data feeds** — real-time and historical\n- **Broker API** — connect to broker\n- **Backtesting platform** — test strategies\n\n## Infrastructure:\n- **Reliable internet** — fast and stable\n- **Computer** — sufficient processing power\n- **Data storage** — historical data\n- **Monitoring** — track systems\n\n## Data Needs:\n- **Price data** — OHLCV\n- **Fundamental data** — financials\n- **Alternative data** — sentiment, etc.\n\n## Costs:\n- **Data subscriptions** — can be expensive\n- **Infrastructure** — servers, hosting\n- **Development time** — learning curve\n\n## Getting Started:\n- **Learn programming** — Python recommended\n- **Start with paper trading** — no capital risk\n- **Use free data** — Yahoo Finance, etc.\n- **Simple strategies** — build complexity gradually`,
          importantPoints: ['Requires programming skills', 'Data feeds can be expensive', 'Start with paper trading', 'Build complexity gradually'],
          quiz: [{
            id: 'at-q5-3-1',
            question: 'What is recommended for beginners?',
            options: ['Complex strategies', 'Paper trading', 'Large capital', 'No testing'],
            correctAnswer: 1,
            explanation: 'Beginners should start with paper trading to test strategies without risking capital.'
          }]
        }
      ],
      moduleTest: [{ id: 'at-mt5-1', question: 'What is algorithmic trading?', options: ['Manual', 'Automated', 'Random', 'Emotional'], correctAnswer: 1 }]
    },
    {
      id: 'at-module-6',
      title: 'Advanced Portfolio Techniques',
      description: 'Sophisticated portfolio construction and management methods',
      lessons: [
        {
          id: 'at-lesson-6-1',
          title: 'Portfolio Optimization',
          duration: '19 min',
          notes: `# Portfolio Optimization\n\nMathematical approaches to optimal portfolio construction.\n\n## Modern Portfolio Theory:\n- **Efficient frontier** — optimal risk/return combinations\n- **Diversification** — reduces risk\n- **Correlation** — how assets move together\n- **Risk-return tradeoff** — can't have both\n\n## Optimization Methods:\n- **Mean-variance** — maximize return for risk\n- **Risk parity** — equal risk contribution\n- **Minimum variance** — lowest risk portfolio\n- **Maximum Sharpe** — best risk-adjusted return\n\n## Inputs Required:\n- **Expected returns** — forecast returns\n- **Covariance matrix** — asset correlations\n- **Constraints** — limits on positions\n\n## Challenges:\n- **Return forecasts** — hard to predict\n- **Correlations** — change over time\n- **Estimation error** — inputs may be wrong\n- **Over-optimization** — may not work in practice\n\n## Best Practices:\n- **Robust optimization** — account for uncertainty\n- **Regular rebalancing** — maintain targets\n- **Simple is better** — avoid over-complexity`,
          importantPoints: ['Optimization finds efficient portfolios', 'Requires return and risk forecasts', 'Beware over-optimization', 'Simple approaches often better'],
          quiz: [{
            id: 'at-q6-1-1',
            question: 'What does portfolio optimization find?',
            options: ['Highest return', 'Optimal risk/return', 'Lowest risk only', 'Random portfolio'],
            correctAnswer: 1,
            explanation: 'Portfolio optimization finds optimal risk/return combinations on the efficient frontier.'
          }]
        },
        {
          id: 'at-lesson-6-2',
          title: 'Factor-Based Portfolios',
          duration: '18 min',
          notes: `# Factor-Based Portfolios\n\nConstructing portfolios based on systematic factors.\n\n## Approach:\n- **Identify factors** — value, momentum, quality, etc.\n- **Measure exposure** — how much factor exposure\n- **Optimize** — target factor exposures\n- **Rebalance** — maintain exposures\n\n## Benefits:\n- **Systematic** — rules-based\n- **Diversified** — multiple factors\n- **Transparent** — know what drives returns\n- **Cost-effective** — factor ETFs available\n\n## Implementation:\n- **Factor ETFs** — easy access\n- **Stock selection** — screen for factors\n- **Multi-factor** — combine factors\n\n## Considerations:\n- **Factor cycles** — factors go in/out of favor\n- **Diversification** — across factors\n- **Costs** — factor ETFs have fees\n- **Patience** — factors work long-term`,
          importantPoints: ['Factor portfolios target factor exposures', 'Use factor ETFs for easy access', 'Diversify across factors', 'Be patient - factors work long-term'],
          quiz: [{
            id: 'at-q6-2-1',
            question: 'What do factor portfolios target?',
            options: ['Individual stocks', 'Factor exposures', 'Random selection', 'Only value'],
            correctAnswer: 1,
            explanation: 'Factor-based portfolios target specific factor exposures like value, momentum, or quality.'
          }]
        },
        {
          id: 'at-lesson-6-3',
          title: 'Risk Parity',
          duration: '17 min',
          notes: `# Risk Parity\n\nAllocating risk equally across portfolio components.\n\n## Concept:\n- **Equal risk contribution** — each asset contributes same risk\n- **Not equal weights** — volatile assets get smaller weights\n- **Rebalancing** — maintain equal risk\n\n## Benefits:\n- **Better diversification** — risk-based not capital-based\n- **Smoother returns** — less volatility\n- **Less dependent on returns** — focuses on risk\n\n## Implementation:\n- **Calculate risk** — volatility of each asset\n- **Inverse weighting** — higher volatility = lower weight\n- **Rebalance** — as volatilities change\n\n## Considerations:\n- **Leverage** — may need leverage for low-risk assets\n- **Correlations** — still matter\n- **Complexity** — more complex than equal weight\n- **Costs** — rebalancing costs`,
          importantPoints: ['Risk parity equalizes risk, not capital', 'Volatile assets get smaller weights', 'Requires regular rebalancing', 'Can provide smoother returns'],
          quiz: [{
            id: 'at-q6-3-1',
            question: 'What does risk parity equalize?',
            options: ['Capital', 'Risk', 'Returns', 'Dividends'],
            correctAnswer: 1,
            explanation: 'Risk parity equalizes risk contribution from each asset, not capital allocation.'
          }]
        }
      ],
      moduleTest: [{ id: 'at-mt6-1', question: 'What does optimization find?', options: ['Highest return', 'Optimal risk/return', 'Lowest risk', 'Random'], correctAnswer: 1 }]
    }
  ],
  finalExam: [
    { id: 'at-fe-1', question: 'What is a call option?', options: ['Right to sell', 'Right to buy', 'Obligation', 'Stock'], correctAnswer: 1 },
    { id: 'at-fe-2', question: 'What increases premium?', options: ['Lower volatility', 'Less time', 'Higher volatility', 'Lower price'], correctAnswer: 2 },
    { id: 'at-fe-3', question: 'What has unlimited risk?', options: ['Long call', 'Long put', 'Naked call', 'Covered call'], correctAnswer: 2 },
    { id: 'at-fe-4', question: 'What is covered call?', options: ['Buy call', 'Own stock and sell call', 'Sell only', 'Buy put'], correctAnswer: 1 },
    { id: 'at-fe-5', question: 'Key difference from options?', options: ['Right', 'Obligation', 'No expiration', 'No leverage'], correctAnswer: 1 },
    { id: 'at-fe-6', question: 'What is quantitative?', options: ['Emotional', 'Data-driven', 'Random', 'Intuitive'], correctAnswer: 1 },
    { id: 'at-fe-7', question: 'What is algorithmic?', options: ['Manual', 'Automated', 'Random', 'Emotional'], correctAnswer: 1 },
    { id: 'at-fe-8', question: 'What do systematic require?', options: ['Emotions', 'Clear rules', 'Random', 'No testing'], correctAnswer: 1 },
    { id: 'at-fe-9', question: 'What does optimization find?', options: ['Highest return', 'Optimal risk/return', 'Lowest risk', 'Random'], correctAnswer: 1 },
    { id: 'at-fe-10', question: 'What does risk parity equalize?', options: ['Capital', 'Risk', 'Returns', 'Dividends'], correctAnswer: 1 }
  ]
}
];

// Legacy export for backward compatibility
export const courseData = courses[0];