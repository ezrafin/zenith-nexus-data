import type {
  Course,
  Unit,
  Lesson,
  VideoContent,
  ArticleContent,
  PracticeContent,
  QuizContent,
} from '../courseTypes';

const unit1Lessons: Lesson[] = [
  {
    id: 'lesson-1-1',
    title: 'Scarcity',
    duration: '30 min',
    contentItems: [
      {
        id: 'economics-u1-l1-video-1',
        type: 'video',
        title: 'Scarcity',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'economics-u1-l1-article',
        type: 'article',
        title: 'Learn: Scarcity',
        content: `# Scarcity

## Introduction to economics

**Economics**: Study of how people make choices with limited resources.

**Fundamental problem**: Unlimited wants vs. limited resources.

**Key insight**: Economics is about making choices in a world of scarcity.

## Scarcity

**Scarcity**: Limited resources cannot satisfy unlimited wants.

**Not the same as shortage**: Scarcity is permanent, shortage is temporary.

**Examples**:
- Time: Only 24 hours in a day
- Money: Limited income
- Natural resources: Limited oil, water, land

**Key insight**: Scarcity forces us to make choices.

## Scarcity

**Implications**:
- Must choose what to produce
- Must choose how to produce
- Must choose who gets what
- Every choice has opportunity cost

**Key insight**: Scarcity is the foundation of all economic decisions.`,
        importantPoints: [
          'Economics: study of choices with limited resources',
          'Scarcity: unlimited wants vs. limited resources',
          'Scarcity is permanent, not temporary',
          'Forces us to make choices',
        ],
      } as ArticleContent,
      {
        id: 'economics-u1-l1-practice',
        type: 'practice',
        title: 'Practice: Intro to economics: Scarcity',
        exercises: [
          {
            id: 'practice-1-1-1',
            prompt: 'What is economics? What is the fundamental problem it addresses?',
            hints: [
              'Study of choices with limited resources',
              'Unlimited wants vs. limited resources',
              'Making decisions',
            ],
          },
          {
            id: 'practice-1-1-2',
            prompt: 'What is scarcity? How is it different from a shortage?',
            hints: [
              'Limited resources, unlimited wants',
              'Scarcity is permanent',
              'Shortage is temporary',
            ],
          },
          {
            id: 'practice-1-1-3',
            prompt: 'Give examples of scarcity in your daily life. How does it affect your choices?',
            hints: [
              'Time, money, resources',
              'Forces choices',
              'Every choice has cost',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u1-l1-quiz',
        type: 'quiz',
        title: 'Quiz: Scarcity',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-1-2',
    title: 'Costs and benefits',
    duration: '35 min',
    contentItems: [
      {
        id: 'economics-u1-l2-video-1',
        type: 'video',
        title: 'Costs and benefits',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'economics-u1-l2-article',
        type: 'article',
        title: 'Learn: Costs and benefits',
        content: `# Costs and benefits

## Production possibilities curve

**PPC**: Graph showing maximum combinations of two goods that can be produced.

**Assumptions**:
- Fixed resources
- Fixed technology
- Full employment
- Two goods

**Shape**: Usually bowed outward (concave) due to increasing opportunity cost.

**Key insight**: PPC shows tradeoffs and opportunity costs.

## Opportunity cost

**Opportunity cost**: Value of next best alternative given up.

**Not just money**: Includes time, resources, other options.

**Example**: 
- Choose college → Give up immediate income
- Opportunity cost = Income you could have earned

**Key insight**: Every choice has an opportunity cost.

## Lesson summary: Opportunity cost and the PPC

**Key concepts**:
- PPC shows production tradeoffs
- Points on curve: Efficient
- Points inside: Inefficient
- Points outside: Impossible (with current resources)
- Opportunity cost increases along curve

**Key insight**: PPC illustrates opportunity cost and production efficiency.`,
        importantPoints: [
          'PPC: shows maximum production combinations',
          'Opportunity cost: value of next best alternative',
          'Points on curve: efficient',
          'Increasing opportunity cost along curve',
        ],
      } as ArticleContent,
      {
        id: 'economics-u1-l2-practice',
        type: 'practice',
        title: 'Practice: Opportunity cost and the PPC',
        exercises: [
          {
            id: 'practice-1-2-1',
            prompt: 'What is a production possibilities curve? What does it show?',
            hints: [
              'Graph of maximum production combinations',
              'Shows tradeoffs',
              'Two goods, fixed resources',
            ],
          },
          {
            id: 'practice-1-2-2',
            prompt: 'What is opportunity cost? Give an example from your life.',
            hints: [
              'Value of next best alternative',
              'Not just money',
              'Every choice has cost',
            ],
          },
          {
            id: 'practice-1-2-3',
            prompt: 'On a PPC, what do points on the curve, inside the curve, and outside the curve represent?',
            hints: [
              'On curve: efficient',
              'Inside: inefficient',
              'Outside: impossible',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u1-l2-quiz',
        type: 'quiz',
        title: 'Quiz: Costs and benefits',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-1-3',
    title: 'Decision making and unintended consequences',
    duration: '40 min',
    contentItems: [
      {
        id: 'economics-u1-l3-video-1',
        type: 'video',
        title: 'Decision making and unintended consequences',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'economics-u1-l3-article',
        type: 'article',
        title: 'Learn: Decision making and unintended consequences',
        content: `# Decision making and unintended consequences

## Optimal Decision-making and opportunity costs

**Optimal decision**: Best choice given constraints.

**Consider**:
- All costs (including opportunity costs)
- All benefits
- Alternatives
- Tradeoffs

**Key insight**: Optimal decisions require considering all costs and benefits.

## Cost-benefit analysis (CBA)

**CBA**: Systematic approach to decision-making.

**Steps**:
1. Identify alternatives
2. List all costs
3. List all benefits
4. Quantify when possible
5. Compare net benefits
6. Choose best option

**Key insight**: CBA helps make rational decisions.

## PACED decision making

**PACED**: Framework for decision-making.

**Steps**:
- **P**roblem: Define the problem
- **A**lternatives: List options
- **C**riteria: Identify decision criteria
- **E**valuate: Evaluate each alternative
- **D**ecide: Make decision

**Key insight**: PACED provides structured approach to decisions.

## Unintended consequences

**Unintended consequences**: Unforeseen results of actions.

**Types**:
- Positive: Unexpected benefits
- Negative: Unexpected costs
- Neutral: No significant effect

**Examples**:
- Price controls → Shortages
- Tax incentives → Changed behavior
- Regulations → Unintended effects

**Key insight**: Actions often have unintended consequences that must be considered.`,
        importantPoints: [
          'Optimal decisions: consider all costs and benefits',
          'CBA: systematic decision-making approach',
          'PACED: structured framework',
          'Unintended consequences: unforeseen results',
        ],
      } as ArticleContent,
      {
        id: 'economics-u1-l3-practice',
        type: 'practice',
        title: 'Practice: Decision making and unintended consequences',
        exercises: [
          {
            id: 'practice-1-3-1',
            prompt: 'What is cost-benefit analysis? How do you use it to make decisions?',
            hints: [
              'Systematic approach',
              'List costs and benefits',
              'Compare alternatives',
            ],
          },
          {
            id: 'practice-1-3-2',
            prompt: 'Explain the PACED decision-making framework. Apply it to a real decision.',
            hints: [
              'Problem, Alternatives, Criteria, Evaluate, Decide',
              'Structured approach',
              'Use for complex decisions',
            ],
          },
          {
            id: 'practice-1-3-3',
            prompt: 'What are unintended consequences? Give examples of positive and negative ones.',
            hints: [
              'Unforeseen results',
              'Can be positive or negative',
              'Must consider when making decisions',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u1-l3-quiz',
        type: 'quiz',
        title: 'Quiz: Decision making and unintended consequences',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-1-4',
    title: 'Factors of production',
    duration: '35 min',
    contentItems: [
      {
        id: 'economics-u1-l4-video-1',
        type: 'video',
        title: 'Factors of production',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'economics-u1-l4-article',
        type: 'article',
        title: 'Learn: Factors of production',
        content: `# Factors of production

## Four factors of production

**Factors of production**: Resources used to produce goods and services.

**Four factors**:
1. **Land**: Natural resources (land, water, minerals)
2. **Labor**: Human effort (physical and mental)
3. **Capital**: Tools, machinery, buildings (physical capital)
4. **Entrepreneurship**: Innovation, risk-taking, organization

**Key insight**: All production requires these four factors.

## Human capital

**Human capital**: Knowledge, skills, experience of workers.

**Investment in human capital**: Education, training, experience.

**Returns**: Higher productivity, higher income.

**Key insight**: Investing in human capital increases productivity and income.

## Entrepreneurship

**Entrepreneurship**: Organizing factors of production, taking risks, innovating.

**Functions**:
- Combine resources
- Take risks
- Innovate
- Organize production

**Key insight**: Entrepreneurs drive economic growth and innovation.`,
        importantPoints: [
          'Four factors: land, labor, capital, entrepreneurship',
          'Human capital: knowledge and skills',
          'Investment in human capital increases productivity',
          'Entrepreneurship: innovation and risk-taking',
        ],
      } as ArticleContent,
      {
        id: 'economics-u1-l4-practice',
        type: 'practice',
        title: 'Practice: Factors of production, impact of human capital on production, and the role of entrepreneurs',
        exercises: [
          {
            id: 'practice-1-4-1',
            prompt: 'What are the four factors of production? Give examples of each.',
            hints: [
              'Land: natural resources',
              'Labor: human effort',
              'Capital: tools, machinery',
              'Entrepreneurship: innovation',
            ],
          },
          {
            id: 'practice-1-4-2',
            prompt: 'What is human capital? How does investing in human capital affect production?',
            hints: [
              'Knowledge, skills, experience',
              'Education, training',
              'Increases productivity',
            ],
          },
          {
            id: 'practice-1-4-3',
            prompt: 'What is the role of entrepreneurs in the economy?',
            hints: [
              'Organize resources',
              'Take risks',
              'Innovate',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u1-l4-quiz',
        type: 'quiz',
        title: 'Quiz: Factors of production',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-1-5',
    title: 'Human capital and income',
    duration: '30 min',
    contentItems: [
      {
        id: 'economics-u1-l5-video-1',
        type: 'video',
        title: 'Human capital and income',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'economics-u1-l5-article',
        type: 'article',
        title: 'Learn: Human capital and income',
        content: `# Human capital and income

## Why invest in yourself?

**Investment in human capital**: Education, training, skills development.

**Benefits**:
- Higher income
- Better job opportunities
- More career options
- Personal growth
- Economic security

**Costs**: Time, money, opportunity cost.

**Key insight**: Investing in yourself pays long-term dividends.

## Market value of skills

**Market value**: What employers are willing to pay for skills.

**High-value skills**:
- Technical skills
- Problem-solving
- Communication
- Critical thinking
- Adaptability

**Key insight**: Developing valuable skills increases your market value and income potential.`,
        importantPoints: [
          'Investment in human capital: education, training',
          'Benefits: higher income, better opportunities',
          'Market value: what employers pay for skills',
          'Develop high-value skills',
        ],
      } as ArticleContent,
      {
        id: 'economics-u1-l5-practice',
        type: 'practice',
        title: 'Practice: Human capital and income',
        exercises: [
          {
            id: 'practice-1-5-1',
            prompt: 'Why should you invest in yourself? What are the benefits and costs?',
            hints: [
              'Education, training',
              'Higher income, opportunities',
              'Costs: time, money',
            ],
          },
          {
            id: 'practice-1-5-2',
            prompt: 'What is market value of skills? What skills have high market value?',
            hints: [
              'What employers pay',
              'Technical, problem-solving',
              'Communication, critical thinking',
            ],
          },
          {
            id: 'practice-1-5-3',
            prompt: 'How can you increase your market value? Give specific examples.',
            hints: [
              'Develop skills',
              'Education, training',
              'Experience',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u1-l5-quiz',
        type: 'quiz',
        title: 'Quiz 2: Human capital and income',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-1-6',
    title: 'Economic systems',
    duration: '45 min',
    contentItems: [
      {
        id: 'economics-u1-l6-video-1',
        type: 'video',
        title: 'Economic systems',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'economics-u1-l6-article',
        type: 'article',
        title: 'Learn: Economic systems',
        content: `# Economic systems

## Command and market economies

**Command economy**: Government makes all economic decisions.

**Characteristics**:
- Government owns resources
- Central planning
- Government sets prices
- Government allocates resources

**Market economy**: Individuals and businesses make decisions.

**Characteristics**:
- Private ownership
- Free markets
- Prices determined by supply and demand
- Voluntary exchange

**Key insight**: Command and market economies represent opposite approaches.

## Circular flow of income and expenditures

**Circular flow**: Model showing flow of money and goods between households and firms.

**Flow**:
- Households → Firms: Labor, land, capital (factors)
- Firms → Households: Wages, rent, interest, profit (income)
- Households → Firms: Spending on goods/services
- Firms → Households: Goods and services

**Key insight**: Circular flow shows how money and resources circulate in economy.

## Mixed market and U.S. economy

**Mixed economy**: Combination of market and command elements.

**U.S. economy**:
- Mostly market-based
- Some government intervention
- Regulation
- Social programs
- Public goods

**Key insight**: Most economies are mixed, combining market and government.

## Lesson overview: economic systems, the role of incentives, and the circular model

**Key concepts**:
- Different economic systems
- Incentives matter
- Circular flow model
- Mixed economies common

**Key insight**: Understanding economic systems helps understand how economies work.

## Traditional economies

**Traditional economy**: Based on customs, traditions, and beliefs.

**Characteristics**:
- Subsistence production
- Barter trade
- Little change
- Community-based decisions

**Examples**: Some rural, isolated communities.

**Key insight**: Traditional economies are rare but still exist in some places.`,
        importantPoints: [
          'Command: government makes decisions',
          'Market: individuals and businesses decide',
          'Circular flow: money and goods circulate',
          'Mixed economy: combination of both',
          'Traditional: based on customs',
        ],
      } as ArticleContent,
      {
        id: 'economics-u1-l6-practice',
        type: 'practice',
        title: 'Practice: Economic systems',
        exercises: [
          {
            id: 'practice-1-6-1',
            prompt: 'Compare command and market economies. What are the key differences?',
            hints: [
              'Command: government decides',
              'Market: individuals decide',
              'Different ownership, planning',
            ],
          },
          {
            id: 'practice-1-6-2',
            prompt: 'Explain the circular flow model. How do money and resources flow?',
            hints: [
              'Households and firms',
              'Factors and income',
              'Goods and spending',
            ],
          },
          {
            id: 'practice-1-6-3',
            prompt: 'What is a mixed economy? How does the U.S. economy fit this description?',
            hints: [
              'Combination of market and command',
              'Mostly market-based',
              'Some government intervention',
            ],
          },
          {
            id: 'practice-1-6-4',
            prompt: 'What is a traditional economy? Where do they still exist?',
            hints: [
              'Based on customs',
              'Subsistence, barter',
              'Rural, isolated communities',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u1-l6-quiz',
        type: 'quiz',
        title: 'Quiz: Economic systems',
        questions: [],
      } as QuizContent,
    ],
  },
];

const unit2Lessons: Lesson[] = [
  {
    id: 'lesson-2-1',
    title: 'Incentives and marketing',
    duration: '35 min',
    contentItems: [
      {
        id: 'economics-u2-l1-video-1',
        type: 'video',
        title: 'Incentives and marketing',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'economics-u2-l1-article',
        type: 'article',
        title: 'Learn: Incentives and marketing',
        content: `# Incentives and marketing

## Understanding incentives

**Incentive**: Something that motivates behavior.

**Types**:
- **Positive**: Rewards (money, praise, benefits)
- **Negative**: Penalties (fines, punishment, loss)

**Economic incentives**: Financial rewards or penalties.

**Key insight**: Incentives shape behavior and decision-making.

## Marketing and consumer decision-making

**Marketing**: Activities to promote and sell products.

**Purpose**: Influence consumer decisions.

**Methods**:
- Advertising
- Branding
- Pricing strategies
- Product placement
- Promotions

**Key insight**: Marketing attempts to influence consumer choices.

## Consumer sovereignty

**Consumer sovereignty**: Consumers determine what is produced through their purchases.

**How it works**:
- Consumers vote with dollars
- Producers respond to demand
- Market reflects consumer preferences

**Limitations**:
- Marketing influences choices
- Limited information
- Advertising can manipulate

**Key insight**: Consumers have power, but marketing can influence their choices.`,
        importantPoints: [
          'Incentives: motivate behavior (positive and negative)',
          'Marketing: influences consumer decisions',
          'Consumer sovereignty: consumers determine production',
          'Marketing can limit consumer sovereignty',
        ],
      } as ArticleContent,
      {
        id: 'economics-u2-l1-practice',
        type: 'practice',
        title: 'Practice: Effects of marketing and incentives',
        exercises: [
          {
            id: 'practice-2-1-1',
            prompt: 'What are incentives? Give examples of positive and negative incentives.',
            hints: [
              'Motivate behavior',
              'Positive: rewards',
              'Negative: penalties',
            ],
          },
          {
            id: 'practice-2-1-2',
            prompt: 'How does marketing influence consumer decision-making?',
            hints: [
              'Advertising, branding',
              'Pricing strategies',
              'Product placement',
            ],
          },
          {
            id: 'practice-2-1-3',
            prompt: 'What is consumer sovereignty? How does marketing affect it?',
            hints: [
              'Consumers determine production',
              'Vote with dollars',
              'Marketing can influence choices',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u2-l1-quiz',
        type: 'quiz',
        title: 'Quiz: Incentives and marketing',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-2-2',
    title: 'Cost, revenue, and profit',
    duration: '40 min',
    contentItems: [
      {
        id: 'economics-u2-l2-video-1',
        type: 'video',
        title: 'Cost, revenue, and profit',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'economics-u2-l2-article',
        type: 'article',
        title: 'Learn: Cost, revenue, and profit',
        content: `# Cost, revenue, and profit

## Cost, revenue, and profit

**Cost**: Expenses of producing goods or services.

**Types of costs**:
- **Fixed costs**: Don't change with output (rent, salaries)
- **Variable costs**: Change with output (materials, labor)
- **Total cost**: Fixed + Variable
- **Average cost**: Total cost / Quantity

**Revenue**: Money received from selling goods or services.

**Types**:
- **Total revenue**: Price × Quantity
- **Average revenue**: Total revenue / Quantity (usually equals price)
- **Marginal revenue**: Additional revenue from one more unit

**Profit**: Revenue minus costs.

**Types**:
- **Total profit**: Total revenue - Total cost
- **Economic profit**: Revenue - (Explicit + Implicit costs)
- **Accounting profit**: Revenue - Explicit costs only

**Key insight**: Profit = Revenue - Costs. Businesses aim to maximize profit.`,
        importantPoints: [
          'Cost: fixed and variable',
          'Revenue: price × quantity',
          'Profit: revenue - costs',
          'Businesses maximize profit',
        ],
      } as ArticleContent,
      {
        id: 'economics-u2-l2-practice',
        type: 'practice',
        title: 'Practice: Cost, revenue, and profit',
        exercises: [
          {
            id: 'practice-2-2-1',
            prompt: 'What are fixed and variable costs? Give examples of each.',
            hints: [
              'Fixed: don\'t change with output',
              'Variable: change with output',
              'Examples: rent vs. materials',
            ],
          },
          {
            id: 'practice-2-2-2',
            prompt: 'How do you calculate total revenue? What is marginal revenue?',
            hints: [
              'Total revenue: price × quantity',
              'Marginal: additional from one more unit',
              'Average: total / quantity',
            ],
          },
          {
            id: 'practice-2-2-3',
            prompt: 'What is profit? How do you calculate it?',
            hints: [
              'Profit: revenue - costs',
              'Total profit: total revenue - total cost',
              'Businesses maximize profit',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u2-l2-quiz',
        type: 'quiz',
        title: 'Quiz: Cost, revenue, and profit',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-2-3',
    title: 'Productivity and economic growth',
    duration: '40 min',
    contentItems: [
      {
        id: 'economics-u2-l3-video-1',
        type: 'video',
        title: 'Productivity and economic growth',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'economics-u2-l3-article',
        type: 'article',
        title: 'Learn: Productivity and economic growth',
        content: `# Productivity and economic growth

## Economic growth through investment

**Economic growth**: Increase in production of goods and services over time.

**Investment**: Spending on capital goods (machinery, equipment, infrastructure).

**How investment promotes growth**:
- Increases capital stock
- Improves technology
- Enhances productivity
- Creates capacity for more production

**Key insight**: Investment in capital goods drives economic growth.

## Productivity: effects on production

**Productivity**: Output per unit of input (labor, capital, etc.).

**Labor productivity**: Output per worker.

**Factors affecting productivity**:
- Technology
- Capital (tools, machinery)
- Education and training
- Organization
- Innovation

**Effects on production**:
- Higher productivity → More output
- Lower costs
- More efficient use of resources

**Key insight**: Higher productivity increases production and efficiency.

## Productivity: effects on standard of living

**Standard of living**: Material well-being of people.

**How productivity affects standard of living**:
- Higher productivity → Higher wages
- More goods and services available
- Lower prices
- Better quality of life
- Economic growth

**Key insight**: Productivity growth is key to improving standard of living.`,
        importantPoints: [
          'Investment in capital drives economic growth',
          'Productivity: output per input',
          'Higher productivity → more production',
          'Productivity growth improves standard of living',
        ],
      } as ArticleContent,
      {
        id: 'economics-u2-l3-practice',
        type: 'practice',
        title: 'Practice: Productivity and economic growth',
        exercises: [
          {
            id: 'practice-2-3-1',
            prompt: 'How does investment promote economic growth?',
            hints: [
              'Increases capital stock',
              'Improves technology',
              'Enhances productivity',
            ],
          },
          {
            id: 'practice-2-3-2',
            prompt: 'What is productivity? What factors affect it?',
            hints: [
              'Output per input',
              'Technology, capital, education',
              'Organization, innovation',
            ],
          },
          {
            id: 'practice-2-3-3',
            prompt: 'How does productivity affect standard of living?',
            hints: [
              'Higher productivity → higher wages',
              'More goods available',
              'Lower prices, better quality of life',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u2-l3-quiz',
        type: 'quiz',
        title: 'Quiz: Productivity and economic growth',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-2-4',
    title: 'Business organization',
    duration: '35 min',
    contentItems: [
      {
        id: 'economics-u2-l4-video-1',
        type: 'video',
        title: 'Business organization',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'economics-u2-l4-article',
        type: 'article',
        title: 'Learn: Business organization',
        content: `# Business organization

## Types of businesses

**Sole proprietorship**: Business owned by one person.

**Characteristics**:
- Simplest form
- Owner has unlimited liability
- Owner keeps all profits
- Easy to start

**Partnership**: Business owned by two or more people.

**Characteristics**:
- Partners share profits and losses
- Partners have unlimited liability
- More resources than sole proprietorship
- Partnership agreement needed

**Corporation**: Business that is a legal entity separate from owners.

**Characteristics**:
- Limited liability for owners
- Can raise capital through stock
- More complex to start
- Double taxation (corporate and personal)

**Key insight**: Different business types have different advantages and disadvantages.

## Corporations and limited liability

**Limited liability**: Owners' personal assets protected from business debts.

**Corporation benefits**:
- Limited liability
- Can raise large amounts of capital
- Perpetual existence (doesn't end with owner)
- Transferable ownership (stocks)

**Corporation drawbacks**:
- More regulation
- Double taxation
- More complex
- Separation of ownership and management

**Key insight**: Limited liability is major advantage of corporations.`,
        importantPoints: [
          'Sole proprietorship: one owner, unlimited liability',
          'Partnership: multiple owners, share profits',
          'Corporation: legal entity, limited liability',
          'Limited liability protects personal assets',
        ],
      } as ArticleContent,
      {
        id: 'economics-u2-l4-practice',
        type: 'practice',
        title: 'Practice: Business organization',
        exercises: [
          {
            id: 'practice-2-4-1',
            prompt: 'What are the three main types of businesses? Compare their characteristics.',
            hints: [
              'Sole proprietorship',
              'Partnership',
              'Corporation',
            ],
          },
          {
            id: 'practice-2-4-2',
            prompt: 'What is limited liability? Why is it important?',
            hints: [
              'Personal assets protected',
              'Major advantage of corporations',
              'Reduces risk for owners',
            ],
          },
          {
            id: 'practice-2-4-3',
            prompt: 'What are the advantages and disadvantages of corporations?',
            hints: [
              'Advantages: limited liability, capital raising',
              'Disadvantages: double taxation, complexity',
              'Tradeoffs',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u2-l4-quiz',
        type: 'quiz',
        title: 'Quiz: Business organization',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-2-5',
    title: 'Market structures and competition',
    duration: '40 min',
    contentItems: [
      {
        id: 'economics-u2-l5-video-1',
        type: 'video',
        title: 'Market structures and competition',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'economics-u2-l5-article',
        type: 'article',
        title: 'Learn: Market structures and competition',
        content: `# Market structures and competition

## Types of competition

**Perfect competition**: Many sellers, identical products, easy entry/exit.

**Characteristics**:
- Many buyers and sellers
- Identical products
- Perfect information
- Easy entry and exit
- Price takers (can't influence price)

**Monopolistic competition**: Many sellers, differentiated products, easy entry/exit.

**Characteristics**:
- Many sellers
- Differentiated products
- Some control over price
- Non-price competition
- Easy entry and exit

**Oligopoly**: Few sellers, similar or differentiated products, barriers to entry.

**Characteristics**:
- Few large firms
- Interdependent decisions
- Barriers to entry
- Can influence price
- May collude

**Monopoly**: One seller, unique product, high barriers to entry.

**Characteristics**:
- Single seller
- No close substitutes
- High barriers to entry
- Price maker
- Can restrict output

**Key insight**: Different market structures have different levels of competition.

## Non-price competition

**Non-price competition**: Competing through factors other than price.

**Methods**:
- Product differentiation
- Advertising
- Quality
- Service
- Branding
- Innovation

**Used in**: Monopolistic competition, oligopoly.

**Key insight**: Firms compete on many dimensions, not just price.`,
        importantPoints: [
          'Perfect competition: many sellers, identical products',
          'Monopolistic competition: differentiated products',
          'Oligopoly: few sellers',
          'Monopoly: single seller',
          'Non-price competition: quality, service, branding',
        ],
      } as ArticleContent,
      {
        id: 'economics-u2-l5-practice',
        type: 'practice',
        title: 'Practice: Market structures and competition',
        exercises: [
          {
            id: 'practice-2-5-1',
            prompt: 'What are the four types of market structures? Describe each.',
            hints: [
              'Perfect competition',
              'Monopolistic competition',
              'Oligopoly',
              'Monopoly',
            ],
          },
          {
            id: 'practice-2-5-2',
            prompt: 'What is non-price competition? Give examples.',
            hints: [
              'Competing without price',
              'Product differentiation',
              'Quality, service, branding',
            ],
          },
          {
            id: 'practice-2-5-3',
            prompt: 'How does competition differ across market structures?',
            hints: [
              'Perfect: most competitive',
              'Monopoly: least competitive',
              'Different levels of competition',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u2-l5-quiz',
        type: 'quiz',
        title: 'Quiz: Market structures and competition',
        questions: [],
      } as QuizContent,
    ],
  },
];

const unit3Lessons: Lesson[] = [
  {
    id: 'lesson-3-1',
    title: 'Demand',
    duration: '45 min',
    contentItems: [
      {
        id: 'economics-u3-l1-video-1',
        type: 'video',
        title: 'Demand',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'economics-u3-l1-article',
        type: 'article',
        title: 'Learn: Demand',
        content: `# Demand

## Law of demand

**Law of demand**: As price increases, quantity demanded decreases (and vice versa).

**Inverse relationship**: Price and quantity demanded move in opposite directions.

**Demand curve**: Downward sloping, shows relationship between price and quantity.

**Key insight**: Higher prices reduce quantity demanded, lower prices increase it.

## Price of related products and demand

**Related products**: Substitutes and complements.

**Substitutes**: Products that can replace each other.
- Price of substitute ↑ → Demand for product ↑
- Example: If coffee price rises, tea demand increases

**Complements**: Products used together.
- Price of complement ↑ → Demand for product ↓
- Example: If gas price rises, car demand decreases

**Key insight**: Prices of related products affect demand.

## Change in expected future prices and demand

**Expected future prices**: What consumers think prices will be.

**If price expected to rise**:
- Buy now (demand increases)
- Stock up before price increase

**If price expected to fall**:
- Wait to buy (demand decreases)
- Delay purchase

**Key insight**: Expectations about future prices affect current demand.

## Changes in income, population, or preferences

**Income**:
- Normal goods: Income ↑ → Demand ↑
- Inferior goods: Income ↑ → Demand ↓

**Population**:
- Population ↑ → Demand ↑ (more consumers)

**Preferences**:
- Tastes change → Demand changes
- Advertising, trends, information

**Key insight**: Multiple factors can shift demand curve.

## Normal and inferior goods

**Normal goods**: Demand increases with income.
- Examples: Cars, houses, restaurant meals
- Income ↑ → Demand ↑

**Inferior goods**: Demand decreases with income.
- Examples: Generic brands, public transportation
- Income ↑ → Demand ↓

**Key insight**: Income affects demand differently for normal vs. inferior goods.

## Change in demand versus change in quantity demanded

**Change in quantity demanded**: Movement along demand curve (price change).

**Change in demand**: Shift of entire demand curve (other factors change).

**Determinants of demand** (shift curve):
- Income
- Prices of related goods
- Preferences
- Population
- Expectations

**Key insight**: Price change = movement along curve; other factors = shift curve.

## What factors change demand?

**Determinants of demand**:
1. Income (normal vs. inferior goods)
2. Prices of related goods (substitutes, complements)
3. Preferences/tastes
4. Population/number of buyers
5. Expectations (future prices, income)

**Key insight**: These factors shift the entire demand curve.`,
        importantPoints: [
          'Law of demand: price ↑ → quantity ↓',
          'Substitutes: price ↑ → demand ↑',
          'Complements: price ↑ → demand ↓',
          'Normal goods: income ↑ → demand ↑',
          'Inferior goods: income ↑ → demand ↓',
          'Price change = movement; other factors = shift',
        ],
      } as ArticleContent,
      {
        id: 'economics-u3-l1-practice',
        type: 'practice',
        title: 'Practice: Demand and the determinants of demand',
        exercises: [
          {
            id: 'practice-3-1-1',
            prompt: 'What is the law of demand? Explain the relationship between price and quantity demanded.',
            hints: [
              'Inverse relationship',
              'Price ↑ → quantity ↓',
              'Downward sloping curve',
            ],
          },
          {
            id: 'practice-3-1-2',
            prompt: 'How do substitutes and complements affect demand? Give examples.',
            hints: [
              'Substitutes: price ↑ → demand ↑',
              'Complements: price ↑ → demand ↓',
              'Examples: coffee/tea, cars/gas',
            ],
          },
          {
            id: 'practice-3-1-3',
            prompt: 'What is the difference between normal and inferior goods?',
            hints: [
              'Normal: income ↑ → demand ↑',
              'Inferior: income ↑ → demand ↓',
              'Examples',
            ],
          },
          {
            id: 'practice-3-1-4',
            prompt: 'What is the difference between a change in demand and a change in quantity demanded?',
            hints: [
              'Quantity: movement along curve',
              'Demand: shift of curve',
              'Price vs. other factors',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u3-l1-quiz',
        type: 'quiz',
        title: 'Quiz: Demand',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-3-2',
    title: 'Supply',
    duration: '35 min',
    contentItems: [
      {
        id: 'economics-u3-l2-video-1',
        type: 'video',
        title: 'Supply',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'economics-u3-l2-article',
        type: 'article',
        title: 'Learn: Supply',
        content: `# Supply

## Law of supply

**Law of supply**: As price increases, quantity supplied increases (and vice versa).

**Direct relationship**: Price and quantity supplied move in same direction.

**Supply curve**: Upward sloping, shows relationship between price and quantity.

**Reason**: Higher prices provide incentive to produce more.

**Key insight**: Higher prices increase quantity supplied, lower prices decrease it.

## Factors affecting supply

**Determinants of supply** (shift supply curve):
1. **Input prices**: Input costs ↑ → Supply ↓
2. **Technology**: Better technology → Supply ↑
3. **Number of sellers**: More sellers → Supply ↑
4. **Expectations**: Future price expectations affect current supply
5. **Government policies**: Taxes, subsidies, regulations
6. **Natural conditions**: Weather, disasters (for agricultural products)

**Key insight**: These factors shift the entire supply curve.

## What factors change supply?

**Summary of supply determinants**:
- Input prices (costs)
- Technology
- Number of sellers
- Expectations
- Government policies (taxes, subsidies, regulations)
- Natural conditions

**Change in quantity supplied**: Movement along supply curve (price change).

**Change in supply**: Shift of entire supply curve (other factors change).

**Key insight**: Price change = movement along curve; other factors = shift curve.`,
        importantPoints: [
          'Law of supply: price ↑ → quantity ↑',
          'Supply curve: upward sloping',
          'Determinants: input prices, technology, number of sellers',
          'Price change = movement; other factors = shift',
        ],
      } as ArticleContent,
      {
        id: 'economics-u3-l2-practice',
        type: 'practice',
        title: 'Practice: Supply',
        exercises: [
          {
            id: 'practice-3-2-1',
            prompt: 'What is the law of supply? Explain the relationship between price and quantity supplied.',
            hints: [
              'Direct relationship',
              'Price ↑ → quantity ↑',
              'Upward sloping curve',
            ],
          },
          {
            id: 'practice-3-2-2',
            prompt: 'What factors affect supply? How does each shift the supply curve?',
            hints: [
              'Input prices, technology',
              'Number of sellers, expectations',
              'Government policies',
            ],
          },
          {
            id: 'practice-3-2-3',
            prompt: 'What is the difference between a change in supply and a change in quantity supplied?',
            hints: [
              'Quantity: movement along curve',
              'Supply: shift of curve',
              'Price vs. other factors',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u3-l2-quiz',
        type: 'quiz',
        title: 'Quiz: Supply',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-3-3',
    title: 'Elasticity',
    duration: '45 min',
    contentItems: [
      {
        id: 'economics-u3-l3-video-1',
        type: 'video',
        title: 'Elasticity',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'economics-u3-l3-article',
        type: 'article',
        title: 'Learn: Elasticity',
        content: `# Elasticity

## Elasticity of demand

**Price elasticity of demand**: How responsive quantity demanded is to price changes.

**Elastic**: Quantity changes a lot when price changes (responsive).
- Elasticity > 1
- Example: Luxury goods, many substitutes

**Inelastic**: Quantity changes little when price changes (not responsive).
- Elasticity < 1
- Example: Necessities, few substitutes

**Unit elastic**: Quantity changes proportionally to price.
- Elasticity = 1

**Key insight**: Elasticity measures responsiveness of demand to price changes.

## Determinants of price elasticity of demand

**Factors affecting elasticity**:
1. **Availability of substitutes**: More substitutes → More elastic
2. **Necessity vs. luxury**: Necessities → Inelastic; Luxuries → Elastic
3. **Proportion of income**: Large proportion → More elastic
4. **Time period**: Longer time → More elastic
5. **Habit-forming**: Addictive goods → Inelastic

**Key insight**: Multiple factors determine how elastic demand is.

## Elasticity of supply

**Price elasticity of supply**: How responsive quantity supplied is to price changes.

**Elastic**: Quantity supplied changes a lot when price changes.
- Easy to increase production
- Example: Manufactured goods

**Inelastic**: Quantity supplied changes little when price changes.
- Hard to increase production quickly
- Example: Agricultural products, natural resources

**Key insight**: Supply elasticity depends on ability to change production.

## Price elasticity of supply determinants

**Factors affecting supply elasticity**:
1. **Time period**: Longer time → More elastic (can adjust production)
2. **Availability of inputs**: Easy to get inputs → More elastic
3. **Storage capacity**: Can store → More elastic
4. **Production flexibility**: Easy to change production → More elastic

**Key insight**: Ability to adjust production determines supply elasticity.`,
        importantPoints: [
          'Elasticity: responsiveness to price changes',
          'Elastic: quantity changes a lot',
          'Inelastic: quantity changes little',
          'Demand elasticity: substitutes, necessity, income proportion',
          'Supply elasticity: time, inputs, storage, flexibility',
        ],
      } as ArticleContent,
      {
        id: 'economics-u3-l3-practice',
        type: 'practice',
        title: 'Practice: Elasticity of supply and demand',
        exercises: [
          {
            id: 'practice-3-3-1',
            prompt: 'What is price elasticity of demand? What does it mean if demand is elastic vs. inelastic?',
            hints: [
              'Responsiveness to price changes',
              'Elastic: quantity changes a lot',
              'Inelastic: quantity changes little',
            ],
          },
          {
            id: 'practice-3-3-2',
            prompt: 'What factors determine price elasticity of demand?',
            hints: [
              'Availability of substitutes',
              'Necessity vs. luxury',
              'Proportion of income, time',
            ],
          },
          {
            id: 'practice-3-3-3',
            prompt: 'What is price elasticity of supply? What factors affect it?',
            hints: [
              'Responsiveness of supply',
              'Time period, inputs',
              'Storage, production flexibility',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u3-l3-quiz',
        type: 'quiz',
        title: 'Quiz: Elasticity',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-3-4',
    title: 'Equilibrium',
    duration: '40 min',
    contentItems: [
      {
        id: 'economics-u3-l4-video-1',
        type: 'video',
        title: 'Equilibrium',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'economics-u3-l4-article',
        type: 'article',
        title: 'Learn: Equilibrium',
        content: `# Equilibrium

## Market equilibrium

**Equilibrium**: Point where quantity demanded equals quantity supplied.

**Equilibrium price**: Price where supply and demand intersect.

**Equilibrium quantity**: Quantity where supply and demand intersect.

**At equilibrium**: No shortage, no surplus.

**Key insight**: Equilibrium is where market clears (supply = demand).

## Market equilibrium

**How equilibrium is reached**:
- If price too high: Surplus → Price falls
- If price too low: Shortage → Price rises
- Market adjusts to equilibrium

**Key insight**: Market forces push price toward equilibrium.

## Changes in market equilibrium

**Demand shifts**:
- Demand ↑ → Price ↑, Quantity ↑
- Demand ↓ → Price ↓, Quantity ↓

**Supply shifts**:
- Supply ↑ → Price ↓, Quantity ↑
- Supply ↓ → Price ↑, Quantity ↓

**Both shift**: Depends on relative size of shifts.

**Key insight**: Shifts in supply or demand change equilibrium price and quantity.

## Lesson summary: Market equilibrium, disequilibrium, and changes in equilibrium

**Key concepts**:
- Equilibrium: Supply = Demand
- Disequilibrium: Surplus or shortage
- Market adjusts to equilibrium
- Shifts in supply/demand change equilibrium

**Key insight**: Understanding equilibrium helps predict market outcomes.`,
        importantPoints: [
          'Equilibrium: supply = demand',
          'Equilibrium price and quantity',
          'Surplus: price too high',
          'Shortage: price too low',
          'Shifts change equilibrium',
        ],
      } as ArticleContent,
      {
        id: 'economics-u3-l4-practice',
        type: 'practice',
        title: 'Practice: Equilibrium and disequilibrium in markets',
        exercises: [
          {
            id: 'practice-3-4-1',
            prompt: 'What is market equilibrium? What happens at equilibrium?',
            hints: [
              'Supply = demand',
              'No shortage, no surplus',
              'Market clears',
            ],
          },
          {
            id: 'practice-3-4-2',
            prompt: 'What happens when there is a surplus? A shortage? How does the market adjust?',
            hints: [
              'Surplus: price too high → price falls',
              'Shortage: price too low → price rises',
              'Market adjusts to equilibrium',
            ],
          },
          {
            id: 'practice-3-4-3',
            prompt: 'How do shifts in demand affect equilibrium? How do shifts in supply affect equilibrium?',
            hints: [
              'Demand ↑ → price ↑, quantity ↑',
              'Supply ↑ → price ↓, quantity ↑',
              'Both can shift together',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u3-l4-quiz',
        type: 'quiz',
        title: 'Quiz: Equilibrium',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-3-5',
    title: 'Price controls',
    duration: '35 min',
    contentItems: [
      {
        id: 'economics-u3-l5-video-1',
        type: 'video',
        title: 'Price controls',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'economics-u3-l5-article',
        type: 'article',
        title: 'Learn: Price controls',
        content: `# Price controls

## Price controls

**Price controls**: Government limits on prices.

**Types**:
- **Price ceiling**: Maximum price (below equilibrium)
- **Price floor**: Minimum price (above equilibrium)

**Purpose**: Help consumers or producers, but often create problems.

**Key insight**: Price controls interfere with market equilibrium.

## Price ceilings and price floors

**Price ceiling**: Maximum legal price.

**Effects**:
- Creates shortage (quantity demanded > quantity supplied)
- Reduces quantity supplied
- May lead to black markets
- Example: Rent control

**Price floor**: Minimum legal price.

**Effects**:
- Creates surplus (quantity supplied > quantity demanded)
- Reduces quantity demanded
- May lead to government purchases
- Example: Minimum wage

**Key insight**: Price controls create shortages or surpluses and reduce efficiency.`,
        importantPoints: [
          'Price ceiling: maximum price, creates shortage',
          'Price floor: minimum price, creates surplus',
          'Interfere with market equilibrium',
          'Reduce efficiency',
        ],
      } as ArticleContent,
      {
        id: 'economics-u3-l5-practice',
        type: 'practice',
        title: 'Practice: Price ceilings and floors',
        exercises: [
          {
            id: 'practice-3-5-1',
            prompt: 'What is a price ceiling? What are its effects?',
            hints: [
              'Maximum legal price',
              'Creates shortage',
              'Reduces quantity supplied',
            ],
          },
          {
            id: 'practice-3-5-2',
            prompt: 'What is a price floor? What are its effects?',
            hints: [
              'Minimum legal price',
              'Creates surplus',
              'Reduces quantity demanded',
            ],
          },
          {
            id: 'practice-3-5-3',
            prompt: 'Why do price controls often create problems? Give examples.',
            hints: [
              'Interfere with equilibrium',
              'Create shortages or surpluses',
              'Reduce efficiency',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u3-l5-quiz',
        type: 'quiz',
        title: 'Quiz: Price controls',
        questions: [],
      } as QuizContent,
    ],
  },
];

const unit4Lessons: Lesson[] = [
  {
    id: 'lesson-4-1',
    title: 'Public vs private',
    duration: '35 min',
    contentItems: [
      {
        id: 'economics-u4-l1-video-1',
        type: 'video',
        title: 'Public vs private',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'economics-u4-l1-article',
        type: 'article',
        title: 'Learn: Public vs private',
        content: `# Public vs private

## Tragedy of the commons

**Tragedy of the commons**: Overuse of shared resources when no one owns them.

**Problem**: 
- Shared resource (common property)
- No ownership or regulation
- Everyone uses it
- Resource gets depleted or destroyed

**Examples**: 
- Overfishing in oceans
- Overgrazing on public land
- Pollution of air/water
- Deforestation

**Solutions**:
- Private ownership
- Government regulation
- Community management
- Quotas/limits

**Key insight**: Shared resources without ownership or regulation tend to be overused.

## Rival and excludable goods

**Rival**: One person's use reduces availability to others.
- Example: Food, clothing, car

**Non-rival**: One person's use doesn't reduce availability to others.
- Example: Radio broadcast, national defense

**Excludable**: Can prevent people from using it.
- Example: Private goods, club goods

**Non-excludable**: Cannot prevent people from using it.
- Example: Public goods, common resources

**Key insight**: Goods can be classified by rivalry and excludability.

## Public goods and regulation

**Public goods**: Non-rival and non-excludable.

**Characteristics**:
- Everyone can use
- One person's use doesn't reduce availability
- Cannot exclude people
- Free-rider problem (people benefit without paying)

**Examples**: 
- National defense
- Street lighting
- Public parks
- Basic research

**Government role**: Provide public goods (market won't provide efficiently).

**Regulation**: Government rules to address market failures.

**Key insight**: Public goods require government provision due to free-rider problem.`,
        importantPoints: [
          'Tragedy of commons: overuse of shared resources',
          'Rival: use reduces availability',
          'Non-rival: use doesn\'t reduce availability',
          'Excludable: can prevent use',
          'Public goods: non-rival and non-excludable',
        ],
      } as ArticleContent,
      {
        id: 'economics-u4-l1-practice',
        type: 'practice',
        title: 'Practice: Government actions in markets',
        exercises: [
          {
            id: 'practice-4-1-1',
            prompt: 'What is the tragedy of the commons? Give examples and solutions.',
            hints: [
              'Overuse of shared resources',
              'No ownership or regulation',
              'Solutions: ownership, regulation',
            ],
          },
          {
            id: 'practice-4-1-2',
            prompt: 'Explain the difference between rival and non-rival goods. Give examples.',
            hints: [
              'Rival: use reduces availability',
              'Non-rival: use doesn\'t reduce availability',
              'Examples',
            ],
          },
          {
            id: 'practice-4-1-3',
            prompt: 'What are public goods? Why does government provide them?',
            hints: [
              'Non-rival and non-excludable',
              'Free-rider problem',
              'Market won\'t provide efficiently',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u4-l1-quiz',
        type: 'quiz',
        title: 'Quiz: Public vs private',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-4-2',
    title: 'Property rights',
    duration: '35 min',
    contentItems: [
      {
        id: 'economics-u4-l2-video-1',
        type: 'video',
        title: 'Property rights',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'economics-u4-l2-article',
        type: 'article',
        title: 'Learn: Property rights',
        content: `# Property rights

## Property rights in a market system

**Property rights**: Legal right to own, use, and dispose of property.

**Key elements**:
- Right to own
- Right to use
- Right to sell/transfer
- Right to exclude others

**Importance in market system**:
- Encourages investment
- Enables trade
- Provides incentives
- Protects resources

**Key insight**: Property rights are essential for market economies to function.

## Government's role in enforcing property rights and contracts

**Government functions**:
- Define property rights
- Enforce property rights
- Resolve disputes
- Enforce contracts
- Protect against theft/fraud

**Why government needed**:
- Private enforcement is costly
- Need impartial authority
- Need legal system
- Need police/courts

**Benefits**:
- Enables markets
- Encourages investment
- Reduces transaction costs
- Provides security

**Key insight**: Government enforcement of property rights and contracts is essential for markets.`,
        importantPoints: [
          'Property rights: legal right to own, use, dispose',
          'Essential for market economies',
          'Government enforces property rights',
          'Government enforces contracts',
          'Enables markets and investment',
        ],
      } as ArticleContent,
      {
        id: 'economics-u4-l2-practice',
        type: 'practice',
        title: 'Practice: Government enforcement of property rights and contracts',
        exercises: [
          {
            id: 'practice-4-2-1',
            prompt: 'What are property rights? Why are they important in a market system?',
            hints: [
              'Legal right to own, use, dispose',
              'Encourages investment',
              'Enables trade',
            ],
          },
          {
            id: 'practice-4-2-2',
            prompt: 'What is the government\'s role in enforcing property rights and contracts?',
            hints: [
              'Define and enforce rights',
              'Resolve disputes',
              'Protect against theft/fraud',
            ],
          },
          {
            id: 'practice-4-2-3',
            prompt: 'Why is government enforcement of property rights and contracts necessary?',
            hints: [
              'Private enforcement costly',
              'Need impartial authority',
              'Enables markets',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u4-l2-quiz',
        type: 'quiz',
        title: 'Quiz 1: Property rights',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-4-3',
    title: 'Redistribution of wealth',
    duration: '30 min',
    contentItems: [
      {
        id: 'economics-u4-l3-video-1',
        type: 'video',
        title: 'Redistribution of wealth',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'economics-u4-l3-article',
        type: 'article',
        title: 'Learn: Redistribution of wealth',
        content: `# Redistribution of wealth

## Transfer programs and the social safety net

**Transfer programs**: Government programs that transfer income from some people to others.

**Types**:
- **Cash transfers**: Direct payments (welfare, unemployment)
- **In-kind transfers**: Goods/services (food stamps, housing)
- **Social insurance**: Programs funded by contributions (Social Security, Medicare)

**Social safety net**: Programs that help people in need.

**Programs**:
- Welfare (TANF)
- Food assistance (SNAP)
- Housing assistance
- Medicaid
- Social Security
- Unemployment insurance

**Purposes**:
- Reduce poverty
- Provide security
- Reduce inequality
- Help those in need

**Funding**: Taxes (redistribution from higher to lower income).

**Key insight**: Transfer programs redistribute wealth to provide social safety net.`,
        importantPoints: [
          'Transfer programs: redistribute income',
          'Cash transfers: direct payments',
          'In-kind transfers: goods/services',
          'Social insurance: funded by contributions',
          'Social safety net: help people in need',
        ],
      } as ArticleContent,
      {
        id: 'economics-u4-l3-practice',
        type: 'practice',
        title: 'Practice: Government redistribution of wealth',
        exercises: [
          {
            id: 'practice-4-3-1',
            prompt: 'What are transfer programs? What are the different types?',
            hints: [
              'Transfer income between people',
              'Cash transfers',
              'In-kind transfers, social insurance',
            ],
          },
          {
            id: 'practice-4-3-2',
            prompt: 'What is the social safety net? What programs are included?',
            hints: [
              'Programs that help people in need',
              'Welfare, food assistance',
              'Housing, Medicaid, Social Security',
            ],
          },
          {
            id: 'practice-4-3-3',
            prompt: 'What are the purposes of government redistribution programs?',
            hints: [
              'Reduce poverty',
              'Provide security',
              'Reduce inequality',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u4-l3-quiz',
        type: 'quiz',
        title: 'Quiz: Redistribution of wealth',
        questions: [],
      } as QuizContent,
    ],
  },
];

const unit5Lessons: Lesson[] = [
  {
    id: 'lesson-5-1',
    title: 'Macroeconomic indicators',
    duration: '50 min',
    contentItems: [
      {
        id: 'economics-u5-l1-video-1',
        type: 'video',
        title: 'Macroeconomic indicators',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'economics-u5-l1-article',
        type: 'article',
        title: 'Learn: Macroeconomic indicators',
        content: `# Macroeconomic indicators

## Parsing gross domestic product

**GDP**: Gross Domestic Product - total value of all goods and services produced in a country.

**Components**:
- **Consumption (C)**: Household spending
- **Investment (I)**: Business spending on capital
- **Government (G)**: Government spending
- **Net Exports (NX)**: Exports - Imports

**Formula**: GDP = C + I + G + NX

**Key insight**: GDP measures total economic output.

## Real GDP and nominal GDP

**Nominal GDP**: GDP measured in current prices.

**Real GDP**: GDP adjusted for inflation (measured in constant prices).

**GDP deflator**: Price index used to convert nominal to real GDP.

**Why real GDP matters**: 
- Shows actual production changes
- Removes effect of price changes
- Better measure of economic growth

**Key insight**: Real GDP is better measure of economic growth than nominal GDP.

## Limitations of GDP

**What GDP doesn't measure**:
- Quality of life
- Distribution of income
- Non-market activities (housework, volunteer work)
- Environmental costs
- Leisure time
- Underground economy

**Key insight**: GDP is useful but incomplete measure of economic well-being.

## Inflation overview

**Inflation**: General increase in prices over time.

**Measurement**: Consumer Price Index (CPI), GDP deflator.

**Causes**:
- Demand-pull: Too much demand
- Cost-push: Rising costs
- Monetary: Too much money supply

**Effects**:
- Reduces purchasing power
- Hurts savers, helps borrowers
- Creates uncertainty

**Key insight**: Inflation reduces value of money over time.

## Natural, cyclical, structural, and frictional unemployment rates

**Frictional unemployment**: Temporary, between jobs.
- Normal part of economy
- People searching for better jobs

**Structural unemployment**: Skills mismatch, permanent changes.
- Workers don't have needed skills
- Industry decline

**Cyclical unemployment**: Due to economic downturn.
- Recession causes job losses
- Varies with business cycle

**Natural unemployment**: Frictional + Structural (normal level).
- Always exists
- Full employment includes natural unemployment

**Key insight**: Different types of unemployment have different causes and solutions.

## Unemployment rate primer

**Unemployment rate**: Percentage of labor force that is unemployed.

**Calculation**: (Unemployed / Labor Force) × 100

**Labor force**: Employed + Unemployed (actively seeking work)

**Not in labor force**: Not working and not seeking work.

**Limitations**:
- Doesn't count discouraged workers
- Doesn't count underemployed
- May not reflect true job market

**Key insight**: Unemployment rate measures those actively seeking work.`,
        importantPoints: [
          'GDP: total value of goods and services produced',
          'Real GDP: adjusted for inflation',
          'GDP limitations: doesn\'t measure quality of life',
          'Inflation: general increase in prices',
          'Unemployment types: frictional, structural, cyclical',
          'Natural unemployment: frictional + structural',
        ],
      } as ArticleContent,
      {
        id: 'economics-u5-l1-practice',
        type: 'practice',
        title: 'Practice: Macroeconomic indicators',
        exercises: [
          {
            id: 'practice-5-1-1',
            prompt: 'What is GDP? What are its components?',
            hints: [
              'Total value of goods and services',
              'C + I + G + NX',
              'Measures economic output',
            ],
          },
          {
            id: 'practice-5-1-2',
            prompt: 'What is the difference between nominal and real GDP? Why does it matter?',
            hints: [
              'Nominal: current prices',
              'Real: adjusted for inflation',
              'Real shows actual growth',
            ],
          },
          {
            id: 'practice-5-1-3',
            prompt: 'What are the limitations of GDP? What doesn\'t it measure?',
            hints: [
              'Quality of life',
              'Income distribution',
              'Non-market activities',
            ],
          },
          {
            id: 'practice-5-1-4',
            prompt: 'What are the different types of unemployment? Explain each.',
            hints: [
              'Frictional: between jobs',
              'Structural: skills mismatch',
              'Cyclical: economic downturn',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u5-l1-quiz',
        type: 'quiz',
        title: 'Quiz: Macroeconomic indicators',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-5-2',
    title: 'The macroeconomy and economic challenges',
    duration: '40 min',
    contentItems: [
      {
        id: 'economics-u5-l2-video-1',
        type: 'video',
        title: 'The macroeconomy and economic challenges',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'economics-u5-l2-article',
        type: 'article',
        title: 'Learn: The macroeconomy and economic challenges',
        content: `# The macroeconomy and economic challenges

## How changes in supply and demand affect income

**Macroeconomic perspective**: Supply and demand affect entire economy.

**Demand changes**:
- Aggregate demand ↑ → Income ↑, Employment ↑
- Aggregate demand ↓ → Income ↓, Employment ↓

**Supply changes**:
- Aggregate supply ↑ → Income ↑, Prices ↓
- Aggregate supply ↓ → Income ↓, Prices ↑

**Key insight**: Changes in aggregate supply and demand affect national income and employment.

## Aggregate demand and aggregate supply curves

**Aggregate demand (AD)**: Total demand for all goods and services.

**AD curve**: Downward sloping.
- Price level ↑ → Quantity demanded ↓
- Components: C, I, G, NX

**Aggregate supply (AS)**: Total supply of all goods and services.

**AS curve**: Upward sloping (short run).
- Price level ↑ → Quantity supplied ↑
- In long run, may be vertical

**Key insight**: AD-AS model shows how price level and output are determined.

## Interpreting the aggregate demand/aggregate supply model

**Equilibrium**: Where AD and AS intersect.

**Shifts in AD**:
- AD ↑ → Price ↑, Output ↑
- AD ↓ → Price ↓, Output ↓

**Shifts in AS**:
- AS ↑ → Price ↓, Output ↑
- AS ↓ → Price ↑, Output ↓

**Economic challenges**:
- **Recession**: AD or AS shifts left
- **Inflation**: AD shifts right (demand-pull) or AS shifts left (cost-push)
- **Stagflation**: AS shifts left (high prices, low output)

**Key insight**: AD-AS model helps understand macroeconomic fluctuations.`,
        importantPoints: [
          'Aggregate demand: total demand for all goods',
          'Aggregate supply: total supply of all goods',
          'AD-AS model: determines price level and output',
          'Shifts affect income, employment, prices',
        ],
      } as ArticleContent,
      {
        id: 'economics-u5-l2-practice',
        type: 'practice',
        title: 'Practice: Market effects on income',
        exercises: [
          {
            id: 'practice-5-2-1',
            prompt: 'How do changes in aggregate demand affect income and employment?',
            hints: [
              'AD ↑ → Income ↑, Employment ↑',
              'AD ↓ → Income ↓, Employment ↓',
              'Affects entire economy',
            ],
          },
          {
            id: 'practice-5-2-2',
            prompt: 'What are aggregate demand and aggregate supply? How do they differ from individual demand and supply?',
            hints: [
              'AD: total demand for all goods',
              'AS: total supply for all goods',
              'Macro vs. micro perspective',
            ],
          },
          {
            id: 'practice-5-2-3',
            prompt: 'How can the AD-AS model explain recessions and inflation?',
            hints: [
              'Recession: AD or AS shifts left',
              'Inflation: AD shifts right or AS shifts left',
              'Stagflation: AS shifts left',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u5-l2-quiz',
        type: 'quiz',
        title: 'Quiz: The macroeconomy and economic challenges',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-5-3',
    title: 'Business cycles',
    duration: '35 min',
    contentItems: [
      {
        id: 'economics-u5-l3-video-1',
        type: 'video',
        title: 'Business cycles',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'economics-u5-l3-article',
        type: 'article',
        title: 'Learn: Business cycles',
        content: `# Business cycles

## Employment dynamics

**Employment over business cycle**:
- **Expansion**: Employment ↑, Unemployment ↓
- **Peak**: Employment high, Unemployment low
- **Recession**: Employment ↓, Unemployment ↑
- **Trough**: Employment low, Unemployment high

**Cyclical unemployment**: Varies with business cycle.

**Key insight**: Employment fluctuates with business cycle.

## Inflation dynamics

**Inflation over business cycle**:
- **Expansion**: Inflation may rise (demand increases)
- **Peak**: Inflation often high
- **Recession**: Inflation may fall (demand decreases)
- **Trough**: Inflation often low

**Demand-pull inflation**: During expansion, demand outpaces supply.

**Cost-push inflation**: Can occur at any time due to supply shocks.

**Key insight**: Inflation often varies with business cycle, but not always.

## Changes in the business cycle

**Business cycle phases**:
1. **Expansion**: Economic growth, rising GDP, falling unemployment
2. **Peak**: Maximum output, low unemployment, high inflation risk
3. **Recession**: Economic decline, falling GDP, rising unemployment
4. **Trough**: Minimum output, high unemployment, low inflation

**Causes of cycles**:
- Changes in aggregate demand
- Changes in aggregate supply
- Business confidence
- External shocks
- Policy changes

**Key insight**: Business cycles are natural part of market economies.`,
        importantPoints: [
          'Business cycle: expansion, peak, recession, trough',
          'Employment: varies with cycle',
          'Inflation: often varies with cycle',
          'Cycles caused by AD/AS changes, confidence, shocks',
        ],
      } as ArticleContent,
      {
        id: 'economics-u5-l3-practice',
        type: 'practice',
        title: 'Practice: Business cycles',
        exercises: [
          {
            id: 'practice-5-3-1',
            prompt: 'How does employment change over the business cycle?',
            hints: [
              'Expansion: employment ↑',
              'Recession: employment ↓',
              'Cyclical unemployment',
            ],
          },
          {
            id: 'practice-5-3-2',
            prompt: 'How does inflation change over the business cycle?',
            hints: [
              'Expansion: inflation may rise',
              'Recession: inflation may fall',
              'Demand-pull vs. cost-push',
            ],
          },
          {
            id: 'practice-5-3-3',
            prompt: 'What are the phases of the business cycle? What causes cycles?',
            hints: [
              'Expansion, peak, recession, trough',
              'AD/AS changes',
              'Confidence, shocks, policy',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u5-l3-quiz',
        type: 'quiz',
        title: 'Quiz: Business cycles',
        questions: [],
      } as QuizContent,
    ],
  },
];

const unit6Lessons: Lesson[] = [
  {
    id: 'lesson-6-1',
    title: 'Money',
    duration: '35 min',
    contentItems: [
      {
        id: 'economics-u6-l1-video-1',
        type: 'video',
        title: 'Money',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'economics-u6-l1-article',
        type: 'article',
        title: 'Learn: Money',
        content: `# Money

## Functions of money

**Money**: Anything widely accepted as payment for goods and services.

**Functions**:
1. **Medium of exchange**: Used to buy and sell goods/services
   - Eliminates need for barter
   - Makes trade easier

2. **Unit of account**: Standard measure of value
   - Prices quoted in money
   - Allows comparison of values

3. **Store of value**: Holds value over time
   - Can save money for future use
   - But inflation reduces purchasing power

4. **Standard of deferred payment**: Used for future payments
   - Loans, contracts
   - Future obligations

**Key insight**: Money serves four essential functions in economy.

## Characteristics of money

**Good money has**:
1. **Durability**: Lasts a long time
2. **Portability**: Easy to carry
3. **Divisibility**: Can be divided into smaller units
4. **Uniformity**: Same value (standardized)
5. **Limited supply**: Scarcity maintains value
6. **Acceptability**: Widely accepted

**Key insight**: These characteristics make money effective.

## Commodity money

**Commodity money**: Money that has intrinsic value (value as good itself).

**Examples**:
- Gold
- Silver
- Salt (historically)
- Cattle (historically)

**Characteristics**:
- Has value as commodity
- Can be used as money
- Value comes from commodity itself

**Key insight**: Commodity money has value beyond its use as money.

## Fiat money (Fiat money)

**Fiat money**: Money that has no intrinsic value, declared legal tender by government.

**Characteristics**:
- No intrinsic value
- Value comes from government decree
- Not backed by commodity
- Accepted because government says so

**Examples**: 
- US dollar
- Euro
- Most modern currencies

**Key insight**: Fiat money has value because government declares it legal tender.

## Commodity money vs. Fiat money

**Commodity money**:
- Has intrinsic value
- Value comes from commodity
- Limited by supply of commodity
- Example: Gold standard

**Fiat money**:
- No intrinsic value
- Value from government decree
- Supply controlled by central bank
- More flexible

**Advantages of fiat**:
- More flexible monetary policy
- Can respond to economic conditions
- Lower cost to produce

**Key insight**: Fiat money is more flexible but requires trust in government.`,
        importantPoints: [
          'Money functions: medium of exchange, unit of account, store of value, standard of deferred payment',
          'Characteristics: durable, portable, divisible, uniform, limited supply, acceptable',
          'Commodity money: has intrinsic value',
          'Fiat money: no intrinsic value, government decree',
          'Fiat more flexible but requires trust',
        ],
      } as ArticleContent,
      {
        id: 'economics-u6-l1-practice',
        type: 'practice',
        title: 'Practice: Money',
        exercises: [
          {
            id: 'practice-6-1-1',
            prompt: 'What are the four functions of money? Explain each.',
            hints: [
              'Medium of exchange',
              'Unit of account',
              'Store of value',
              'Standard of deferred payment',
            ],
          },
          {
            id: 'practice-6-1-2',
            prompt: 'What characteristics make good money?',
            hints: [
              'Durability, portability',
              'Divisibility, uniformity',
              'Limited supply, acceptability',
            ],
          },
          {
            id: 'practice-6-1-3',
            prompt: 'What is the difference between commodity money and fiat money?',
            hints: [
              'Commodity: has intrinsic value',
              'Fiat: no intrinsic value',
              'Government decree',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u6-l1-quiz',
        type: 'quiz',
        title: 'Quiz: Money',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-6-2',
    title: 'Financial markets and institutions',
    duration: '45 min',
    contentItems: [
      {
        id: 'economics-u6-l2-video-1',
        type: 'video',
        title: 'Financial markets and institutions',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'economics-u6-l2-article',
        type: 'article',
        title: 'Learn: Financial markets and institutions',
        content: `# Financial markets and institutions

## How financial institutions and markets facilitate saving and investing

**Financial institutions**: Intermediaries between savers and borrowers.

**Functions**:
- Accept deposits from savers
- Make loans to borrowers
- Provide investment services
- Facilitate payments

**Financial markets**: Where financial assets are traded.

**Functions**:
- Connect savers and borrowers
- Provide liquidity
- Price discovery
- Risk sharing

**How they facilitate saving and investing**:
- Savers deposit money → Institutions lend to borrowers
- Investors buy securities → Companies get capital
- Creates efficient allocation of resources

**Key insight**: Financial institutions and markets connect savers with borrowers and investors.

## The types and functions of financial institutions and markets

**Types of financial institutions**:
1. **Banks**: Accept deposits, make loans
2. **Credit unions**: Member-owned, similar to banks
3. **Investment banks**: Help companies raise capital
4. **Insurance companies**: Provide risk protection
5. **Mutual funds**: Pool money, invest in securities
6. **Pension funds**: Manage retirement savings

**Types of financial markets**:
1. **Stock market**: Trade stocks (ownership)
2. **Bond market**: Trade bonds (debt)
3. **Money market**: Short-term securities
4. **Foreign exchange market**: Trade currencies
5. **Derivatives market**: Trade derivatives

**Key insight**: Different institutions and markets serve different needs.

## Monetary systems

**Monetary system**: System for creating and managing money.

**Components**:
- Currency (coins, paper money)
- Banking system
- Central bank
- Payment systems

**Functions**:
- Create money
- Regulate money supply
- Facilitate payments
- Maintain stability

**Key insight**: Monetary system enables economic transactions.

## US and global monetary systems

**US monetary system**:
- Federal Reserve (central bank)
- US dollar (fiat money)
- Banking system
- Payment systems (checks, electronic)

**Global monetary system**:
- Multiple currencies
- Exchange rates
- International institutions (IMF, World Bank)
- Currency markets

**Key insight**: Monetary systems operate at national and global levels.`,
        importantPoints: [
          'Financial institutions: intermediaries between savers and borrowers',
          'Financial markets: where assets are traded',
          'Types: banks, credit unions, investment banks, insurance, mutual funds',
          'Markets: stock, bond, money, forex, derivatives',
          'Monetary systems: create and manage money',
        ],
      } as ArticleContent,
      {
        id: 'economics-u6-l2-practice',
        type: 'practice',
        title: 'Practice: Financial and monetary systems',
        exercises: [
          {
            id: 'practice-6-2-1',
            prompt: 'How do financial institutions and markets facilitate saving and investing?',
            hints: [
              'Connect savers and borrowers',
              'Provide liquidity',
              'Efficient allocation',
            ],
          },
          {
            id: 'practice-6-2-2',
            prompt: 'What are the different types of financial institutions? What does each do?',
            hints: [
              'Banks: deposits and loans',
              'Investment banks: raise capital',
              'Insurance, mutual funds, pension funds',
            ],
          },
          {
            id: 'practice-6-2-3',
            prompt: 'What are monetary systems? How do they work in the US and globally?',
            hints: [
              'System for creating and managing money',
              'US: Federal Reserve, dollar',
              'Global: multiple currencies, exchange rates',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u6-l2-quiz',
        type: 'quiz',
        title: 'Quiz: Financial markets and institutions',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-6-3',
    title: 'The Federal Reserve',
    duration: '40 min',
    contentItems: [
      {
        id: 'economics-u6-l3-video-1',
        type: 'video',
        title: 'The Federal Reserve',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'economics-u6-l3-article',
        type: 'article',
        title: 'Learn: The Federal Reserve',
        content: `# The Federal Reserve

## Historical events that shaped banking

**Early banking problems**:
- Bank panics and failures
- No central authority
- Inconsistent money supply
- Economic instability

**Key events**:
- **1907 Panic**: Bank run, J.P. Morgan intervention
- **1913 Federal Reserve Act**: Created Fed
- **Great Depression**: Fed failures, bank failures
- **Banking reforms**: Glass-Steagall, FDIC

**Key insight**: Banking crises led to creation and evolution of Federal Reserve.

## US Federal Reserve (structure, functions, and history)

**Structure**:
- **Board of Governors**: 7 members, appointed by President
- **12 Regional Banks**: Distributed across US
- **Federal Open Market Committee (FOMC)**: Sets monetary policy

**Functions**:
1. **Monetary policy**: Control money supply, interest rates
2. **Bank regulation**: Supervise banks
3. **Payment systems**: Facilitate payments
4. **Financial stability**: Prevent crises
5. **Lender of last resort**: Provide liquidity in crises

**History**:
- Created 1913
- Expanded powers over time
- Responded to crises (Great Depression, 2008)
- Evolved with economy

**Key insight**: Federal Reserve is central bank of US, responsible for monetary policy and financial stability.`,
        importantPoints: [
          'Banking crises led to Fed creation',
          'Structure: Board of Governors, 12 regional banks, FOMC',
          'Functions: monetary policy, bank regulation, payment systems',
          'Financial stability, lender of last resort',
          'Created 1913, evolved over time',
        ],
      } as ArticleContent,
      {
        id: 'economics-u6-l3-practice',
        type: 'practice',
        title: 'Practice: History of banking and the Federal Reserve',
        exercises: [
          {
            id: 'practice-6-3-1',
            prompt: 'What historical events shaped banking and led to the creation of the Federal Reserve?',
            hints: [
              'Bank panics and failures',
              '1907 Panic',
              'Need for central authority',
            ],
          },
          {
            id: 'practice-6-3-2',
            prompt: 'What is the structure of the Federal Reserve?',
            hints: [
              'Board of Governors',
              '12 Regional Banks',
              'FOMC',
            ],
          },
          {
            id: 'practice-6-3-3',
            prompt: 'What are the main functions of the Federal Reserve?',
            hints: [
              'Monetary policy',
              'Bank regulation',
              'Payment systems, financial stability',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u6-l3-quiz',
        type: 'quiz',
        title: 'Quiz: The Federal Reserve',
        questions: [],
      } as QuizContent,
    ],
  },
];

const unit7Lessons: Lesson[] = [
  {
    id: 'lesson-7-1',
    title: 'Monetary policy',
    duration: '40 min',
    contentItems: [
      {
        id: 'economics-u7-l1-video-1',
        type: 'video',
        title: 'Monetary policy',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'economics-u7-l1-article',
        type: 'article',
        title: 'Learn: Monetary policy',
        content: `# Monetary policy

## Monetary policy tools

**Monetary policy**: Central bank actions to control money supply and interest rates.

**Tools**:
1. **Open market operations**: Buy/sell government securities
   - Buy securities → Increase money supply → Lower interest rates
   - Sell securities → Decrease money supply → Raise interest rates

2. **Reserve requirements**: Amount banks must hold in reserves
   - Lower requirements → More lending → Increase money supply
   - Raise requirements → Less lending → Decrease money supply

3. **Discount rate**: Interest rate Fed charges banks for loans
   - Lower rate → More borrowing → Increase money supply
   - Raise rate → Less borrowing → Decrease money supply

**Key insight**: Fed uses three main tools to control money supply and interest rates.

## Monetary policy actions

**Expansionary (easy) monetary policy**:
- Increase money supply
- Lower interest rates
- Stimulate economy
- Used during recessions

**Contractionary (tight) monetary policy**:
- Decrease money supply
- Raise interest rates
- Slow economy
- Used to fight inflation

**Key insight**: Monetary policy can expand or contract economy.

## Why interest rates go up and down

**Factors affecting interest rates**:
1. **Monetary policy**: Fed actions
2. **Demand for loans**: More demand → Higher rates
3. **Supply of savings**: More savings → Lower rates
4. **Inflation expectations**: Higher inflation → Higher rates
5. **Risk**: Higher risk → Higher rates
6. **Economic conditions**: Strong economy → Higher rates

**Key insight**: Interest rates are determined by supply and demand for money, influenced by Fed policy.`,
        importantPoints: [
          'Monetary policy: Fed controls money supply and interest rates',
          'Tools: open market operations, reserve requirements, discount rate',
          'Expansionary: increase money, lower rates, stimulate',
          'Contractionary: decrease money, raise rates, slow economy',
          'Interest rates affected by policy, demand, supply, inflation, risk',
        ],
      } as ArticleContent,
      {
        id: 'economics-u7-l1-practice',
        type: 'practice',
        title: 'Practice: Monetary policy',
        exercises: [
          {
            id: 'practice-7-1-1',
            prompt: 'What are the three main tools of monetary policy? How does each work?',
            hints: [
              'Open market operations',
              'Reserve requirements',
              'Discount rate',
            ],
          },
          {
            id: 'practice-7-1-2',
            prompt: 'What is expansionary monetary policy? When is it used?',
            hints: [
              'Increase money supply',
              'Lower interest rates',
              'During recessions',
            ],
          },
          {
            id: 'practice-7-1-3',
            prompt: 'What factors cause interest rates to go up and down?',
            hints: [
              'Monetary policy',
              'Demand for loans, supply of savings',
              'Inflation expectations, risk',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u7-l1-quiz',
        type: 'quiz',
        title: 'Quiz: Monetary policy',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-7-2',
    title: 'Fiscal policy',
    duration: '40 min',
    contentItems: [
      {
        id: 'economics-u7-l2-video-1',
        type: 'video',
        title: 'Fiscal policy',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'economics-u7-l2-article',
        type: 'article',
        title: 'Learn: Fiscal policy',
        content: `# Fiscal policy

## Fiscal policy actions

**Fiscal policy**: Government use of taxes and spending to influence economy.

**Tools**:
1. **Government spending**: Increase or decrease spending
2. **Taxes**: Increase or decrease taxes

**Expansionary fiscal policy**:
- Increase spending
- Decrease taxes
- Stimulate economy
- Used during recessions

**Contractionary fiscal policy**:
- Decrease spending
- Increase taxes
- Slow economy
- Used to fight inflation

**Key insight**: Fiscal policy uses government spending and taxes to influence economy.

## Fiscal policy actions: Expansion and contraction

**Expansionary fiscal policy**:
- **Increase government spending**: More demand → More output → More employment
- **Decrease taxes**: More disposable income → More spending → More output
- **Result**: Increase aggregate demand, stimulate economy

**Contractionary fiscal policy**:
- **Decrease government spending**: Less demand → Less output → Less inflation
- **Increase taxes**: Less disposable income → Less spending → Less output
- **Result**: Decrease aggregate demand, slow economy

**Automatic stabilizers**: Programs that automatically adjust (unemployment insurance, progressive taxes).

**Key insight**: Fiscal policy can expand or contract economy through spending and tax changes.`,
        importantPoints: [
          'Fiscal policy: government use of taxes and spending',
          'Expansionary: increase spending, decrease taxes',
          'Contractionary: decrease spending, increase taxes',
          'Automatic stabilizers: automatic adjustments',
        ],
      } as ArticleContent,
      {
        id: 'economics-u7-l2-practice',
        type: 'practice',
        title: 'Practice: Fiscal policy',
        exercises: [
          {
            id: 'practice-7-2-1',
            prompt: 'What is fiscal policy? What tools does it use?',
            hints: [
              'Government use of taxes and spending',
              'Government spending',
              'Taxes',
            ],
          },
          {
            id: 'practice-7-2-2',
            prompt: 'What is expansionary fiscal policy? How does it work?',
            hints: [
              'Increase spending, decrease taxes',
              'Stimulate economy',
              'Increase aggregate demand',
            ],
          },
          {
            id: 'practice-7-2-3',
            prompt: 'What is contractionary fiscal policy? When is it used?',
            hints: [
              'Decrease spending, increase taxes',
              'Slow economy',
              'Fight inflation',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u7-l2-quiz',
        type: 'quiz',
        title: 'Quiz: Fiscal policy',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-7-3',
    title: 'Government budgets; revenue and expenditures',
    duration: '50 min',
    contentItems: [
      {
        id: 'economics-u7-l3-video-1',
        type: 'video',
        title: 'Government budgets; revenue and expenditures',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'economics-u7-l3-article',
        type: 'article',
        title: 'Learn: Government budgets; revenue and expenditures',
        content: `# Government budgets; revenue and expenditures

## Tax characteristics and structures

**Tax characteristics**:
- **Progressive**: Higher income → Higher tax rate (percentage)
- **Regressive**: Higher income → Lower tax rate (percentage)
- **Proportional (flat)**: Same tax rate for all incomes

**Tax structures**:
- **Income tax**: Tax on income (usually progressive)
- **Sales tax**: Tax on purchases (usually regressive)
- **Property tax**: Tax on property value
- **Corporate tax**: Tax on business profits

**Key insight**: Different taxes have different characteristics and effects.

## Discretionary and mandatory outlays of the US federal government

**Federal spending categories**:

**Mandatory outlays**: Required by law, not easily changed.
- Social Security
- Medicare
- Medicaid
- Interest on debt
- Other entitlement programs

**Discretionary outlays**: Set by Congress each year.
- Defense
- Education
- Infrastructure
- Research
- Other programs

**Key insight**: Most federal spending is mandatory, limiting flexibility.

## State taxing and spending

**State revenue sources**:
- Income taxes
- Sales taxes
- Property taxes
- Fees and licenses
- Federal grants

**State spending**:
- Education (largest)
- Health care
- Transportation
- Public safety
- Welfare programs

**Key insight**: States have different revenue sources and spending priorities than federal government.

## Deficits and debt

**Budget deficit**: Spending exceeds revenue in a year.

**Budget surplus**: Revenue exceeds spending in a year.

**National debt**: Total accumulated deficits over time.

**Effects of deficits**:
- Increase national debt
- May crowd out private investment
- Future interest payments
- Intergenerational burden

**Key insight**: Deficits add to debt, creating future obligations.`,
        importantPoints: [
          'Tax structures: progressive, regressive, proportional',
          'Mandatory outlays: required by law (Social Security, Medicare)',
          'Discretionary outlays: set by Congress (defense, education)',
          'State revenue: taxes, fees, federal grants',
          'Deficit: spending > revenue',
          'Debt: accumulated deficits',
        ],
      } as ArticleContent,
      {
        id: 'economics-u7-l3-practice',
        type: 'practice',
        title: 'Practice: Government budgets revenue and expenditures',
        exercises: [
          {
            id: 'practice-7-3-1',
            prompt: 'What are the different tax structures? Give examples of each.',
            hints: [
              'Progressive: higher rate for higher income',
              'Regressive: lower rate for higher income',
              'Proportional: same rate for all',
            ],
          },
          {
            id: 'practice-7-3-2',
            prompt: 'What is the difference between mandatory and discretionary outlays?',
            hints: [
              'Mandatory: required by law',
              'Discretionary: set by Congress',
              'Examples',
            ],
          },
          {
            id: 'practice-7-3-3',
            prompt: 'What are the main sources of state revenue and spending?',
            hints: [
              'Revenue: taxes, fees, grants',
              'Spending: education, health, transportation',
              'Different from federal',
            ],
          },
          {
            id: 'practice-7-3-4',
            prompt: 'What is the difference between a deficit and debt? What are the effects?',
            hints: [
              'Deficit: spending > revenue in year',
              'Debt: accumulated deficits',
              'Effects: interest payments, future burden',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u7-l3-quiz',
        type: 'quiz',
        title: 'Quiz: Government budgets; revenue and expenditures',
        questions: [],
      } as QuizContent,
    ],
  },
];

const unit8Lessons: Lesson[] = [
  {
    id: 'lesson-8-1',
    title: 'Trade',
    duration: '50 min',
    contentItems: [
      {
        id: 'economics-u8-l1-video-1',
        type: 'video',
        title: 'Trade',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'economics-u8-l1-article',
        type: 'article',
        title: 'Learn: Trade',
        content: `# Trade

## Comparative advantage, specialization, and gains from trade

**Comparative advantage**: Ability to produce at lower opportunity cost.

**Specialization**: Focus on producing what you do best.

**Gains from trade**: Both countries benefit from trade.

**How it works**:
- Each country specializes in what it does best
- Trade for other goods
- Both countries get more total output
- Higher standard of living

**Key insight**: Trade benefits all countries through specialization and comparative advantage.

## Comparative advantage and absolute advantage

**Absolute advantage**: Ability to produce more with same resources.

**Comparative advantage**: Ability to produce at lower opportunity cost.

**Key difference**:
- Absolute: Who produces more
- Comparative: Who has lower opportunity cost

**Trade based on**: Comparative advantage (not absolute).

**Example**:
- Country A: Better at both goods (absolute advantage)
- Country B: Lower opportunity cost in one good (comparative advantage)
- Both benefit from trade

**Key insight**: Trade is based on comparative advantage, not absolute advantage.

## Trade deficit vs trade surplus

**Trade balance**: Exports - Imports.

**Trade surplus**: Exports > Imports (positive balance).

**Trade deficit**: Exports < Imports (negative balance).

**Effects**:
- **Surplus**: More money coming in, may appreciate currency
- **Deficit**: More money going out, may depreciate currency

**Not necessarily bad**: Deficit can mean strong economy, high consumption.

**Key insight**: Trade balance shows net exports, but deficit isn't always bad.

## Trade barriers

**Trade barriers**: Restrictions on international trade.

**Types**:
1. **Tariffs**: Taxes on imports
   - Raise price of imports
   - Protect domestic producers
   - Reduce trade

2. **Quotas**: Limits on quantity of imports
   - Restrict supply
   - Raise prices
   - Protect domestic producers

3. **Subsidies**: Government support for domestic producers
   - Lower costs
   - Make exports cheaper
   - Unfair competition

4. **Standards/Regulations**: Health, safety, environmental rules
   - Can be legitimate or protectionist

**Effects**:
- Reduce trade
- Raise prices for consumers
- Protect domestic industries
- Reduce efficiency

**Key insight**: Trade barriers reduce trade and efficiency but may protect domestic industries.`,
        importantPoints: [
          'Comparative advantage: lower opportunity cost',
          'Specialization: focus on what you do best',
          'Gains from trade: both countries benefit',
          'Absolute vs. comparative advantage',
          'Trade surplus: exports > imports',
          'Trade deficit: exports < imports',
          'Trade barriers: tariffs, quotas, subsidies',
        ],
      } as ArticleContent,
      {
        id: 'economics-u8-l1-practice',
        type: 'practice',
        title: 'Practice: Trade',
        exercises: [
          {
            id: 'practice-8-1-1',
            prompt: 'What is comparative advantage? How does it lead to gains from trade?',
            hints: [
              'Lower opportunity cost',
              'Specialization',
              'Both countries benefit',
            ],
          },
          {
            id: 'practice-8-1-2',
            prompt: 'What is the difference between absolute and comparative advantage?',
            hints: [
              'Absolute: produces more',
              'Comparative: lower opportunity cost',
              'Trade based on comparative',
            ],
          },
          {
            id: 'practice-8-1-3',
            prompt: 'What is the difference between a trade surplus and trade deficit?',
            hints: [
              'Surplus: exports > imports',
              'Deficit: exports < imports',
              'Effects on economy',
            ],
          },
          {
            id: 'practice-8-1-4',
            prompt: 'What are trade barriers? What are their effects?',
            hints: [
              'Tariffs, quotas, subsidies',
              'Reduce trade',
              'Protect domestic industries',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u8-l1-quiz',
        type: 'quiz',
        title: 'Quiz: Trade',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-8-2',
    title: 'Currency conversion',
    duration: '35 min',
    contentItems: [
      {
        id: 'economics-u8-l2-video-1',
        type: 'video',
        title: 'Currency conversion',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'economics-u8-l2-article',
        type: 'article',
        title: 'Learn: Currency conversion',
        content: `# Currency conversion

## Exchange rate primer

**Exchange rate**: Price of one currency in terms of another.

**Example**: 1 USD = 0.85 EUR (or 1 EUR = 1.18 USD)

**Types**:
- **Fixed exchange rate**: Set by government
- **Floating exchange rate**: Determined by market
- **Managed float**: Government intervenes to influence

**Factors affecting exchange rates**:
- Interest rates
- Inflation
- Economic growth
- Political stability
- Trade balance
- Speculation

**Appreciation**: Currency increases in value (more expensive).

**Depreciation**: Currency decreases in value (cheaper).

**Key insight**: Exchange rates determine value of one currency relative to another.

## Lesson Summary: Exchange rates

**Key concepts**:
- Exchange rate: price of one currency in another
- Determined by supply and demand
- Affected by many economic factors
- Appreciation vs. depreciation
- Affects trade and investment

**Effects on economy**:
- **Strong currency**: Exports expensive, imports cheap
- **Weak currency**: Exports cheap, imports expensive

**Key insight**: Exchange rates affect international trade and investment flows.`,
        importantPoints: [
          'Exchange rate: price of one currency in another',
          'Fixed vs. floating vs. managed float',
          'Factors: interest rates, inflation, growth, stability',
          'Appreciation: currency increases in value',
          'Depreciation: currency decreases in value',
          'Affects trade and investment',
        ],
      } as ArticleContent,
      {
        id: 'economics-u8-l2-practice',
        type: 'practice',
        title: 'Practice: Exchange rates',
        exercises: [
          {
            id: 'practice-8-2-1',
            prompt: 'What is an exchange rate? How is it determined?',
            hints: [
              'Price of one currency in another',
              'Supply and demand',
              'Fixed vs. floating',
            ],
          },
          {
            id: 'practice-8-2-2',
            prompt: 'What factors affect exchange rates?',
            hints: [
              'Interest rates, inflation',
              'Economic growth',
              'Political stability, trade balance',
            ],
          },
          {
            id: 'practice-8-2-3',
            prompt: 'What is the difference between currency appreciation and depreciation? How do they affect trade?',
            hints: [
              'Appreciation: increases in value',
              'Depreciation: decreases in value',
              'Affects exports and imports',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u8-l2-quiz',
        type: 'quiz',
        title: 'Quiz: Currency conversion',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-8-3',
    title: 'Globalization',
    duration: '40 min',
    contentItems: [
      {
        id: 'economics-u8-l3-video-1',
        type: 'video',
        title: 'Globalization',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'economics-u8-l3-article',
        type: 'article',
        title: 'Learn: Globalization',
        content: `# Globalization

## Globalization and economic interdependence

**Globalization**: Increasing integration of economies worldwide.

**Aspects**:
- Trade in goods and services
- Movement of capital
- Movement of people
- Spread of technology
- Cultural exchange

**Economic interdependence**: Countries depend on each other economically.

**Benefits**:
- Lower prices for consumers
- More choices
- Economic growth
- Technology transfer
- Job creation (in some sectors)

**Costs**:
- Job losses (in some sectors)
- Income inequality
- Environmental concerns
- Loss of local culture
- Vulnerability to global shocks

**Key insight**: Globalization creates interdependence with benefits and costs.

## International trade agreements

**Trade agreements**: Agreements between countries to reduce trade barriers.

**Types**:
1. **Free trade agreements (FTA)**: Remove tariffs and quotas
   - Example: NAFTA (now USMCA)

2. **Customs unions**: FTA + common external tariff
   - Example: European Union

3. **Common markets**: Customs union + free movement of factors
   - Example: EU (partially)

4. **Economic unions**: Common market + coordinated policies
   - Example: EU (partially)

**Major agreements**:
- **WTO**: World Trade Organization (global)
- **USMCA**: United States-Mexico-Canada Agreement
- **EU**: European Union
- **TPP/CPTPP**: Trans-Pacific Partnership

**Benefits**:
- Increase trade
- Lower prices
- Economic growth
- Specialization

**Concerns**:
- Job losses
- Environmental standards
- Labor standards
- Sovereignty

**Key insight**: Trade agreements reduce barriers but raise concerns about jobs and standards.`,
        importantPoints: [
          'Globalization: increasing economic integration',
          'Economic interdependence: countries depend on each other',
          'Benefits: lower prices, growth, technology',
          'Costs: job losses, inequality, environmental concerns',
          'Trade agreements: reduce barriers',
          'Types: FTA, customs unions, common markets',
        ],
      } as ArticleContent,
      {
        id: 'economics-u8-l3-practice',
        type: 'practice',
        title: 'Practice: Globalization',
        exercises: [
          {
            id: 'practice-8-3-1',
            prompt: 'What is globalization? What are its benefits and costs?',
            hints: [
              'Increasing economic integration',
              'Benefits: lower prices, growth',
              'Costs: job losses, inequality',
            ],
          },
          {
            id: 'practice-8-3-2',
            prompt: 'What is economic interdependence? How does globalization create it?',
            hints: [
              'Countries depend on each other',
              'Trade, capital flows',
              'Vulnerability to shocks',
            ],
          },
          {
            id: 'practice-8-3-3',
            prompt: 'What are international trade agreements? What are the different types?',
            hints: [
              'Agreements to reduce barriers',
              'FTA, customs unions',
              'Common markets, economic unions',
            ],
          },
          {
            id: 'practice-8-3-4',
            prompt: 'What are the benefits and concerns of trade agreements?',
            hints: [
              'Benefits: increase trade, growth',
              'Concerns: job losses, standards',
              'Sovereignty',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u8-l3-quiz',
        type: 'quiz',
        title: 'Quiz: Globalization',
        questions: [],
      } as QuizContent,
    ],
  },
];

const unit9Lessons: Lesson[] = [
  {
    id: 'lesson-9-1',
    title: 'Education and earnings',
    duration: '30 min',
    contentItems: [
      {
        id: 'economics-u9-l1-video-1',
        type: 'video',
        title: 'Education and earnings',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'economics-u9-l1-article',
        type: 'article',
        title: 'Learn: Education and earnings',
        content: `# Education and earnings

## Education as an investment

**Education as investment**: Spending on education to increase future earnings.

**Costs**: 
- Tuition and fees
- Books and supplies
- Opportunity cost (foregone earnings)
- Time

**Returns**:
- Higher lifetime earnings
- Better job opportunities
- Lower unemployment
- Personal growth

**Key insight**: Education is an investment that pays returns over lifetime.

## Why invest in yourself?

**Investment in human capital**: Education, training, skills development.

**Benefits**:
- Higher income
- Better job opportunities
- More career options
- Job security
- Personal fulfillment
- Economic mobility

**Returns**: Education typically pays for itself through higher earnings.

**Key insight**: Investing in education is one of best investments you can make.

## What is educational investment?

**Educational investment**: Resources spent on education and training.

**Types**:
- Formal education (college, graduate school)
- Vocational training
- Professional certifications
- Skills development
- On-the-job training

**Considerations**:
- Costs vs. benefits
- Time commitment
- Opportunity cost
- Expected returns
- Career goals

**Key insight**: Educational investment includes all forms of learning that increase human capital.`,
        importantPoints: [
          'Education as investment: costs and returns',
          'Benefits: higher income, better opportunities',
          'Investment in human capital',
          'Types: formal education, training, certifications',
        ],
      } as ArticleContent,
      {
        id: 'economics-u9-l1-practice',
        type: 'practice',
        title: 'Practice: Educational investment',
        exercises: [
          {
            id: 'practice-9-1-1',
            prompt: 'How is education an investment? What are the costs and returns?',
            hints: [
              'Costs: tuition, opportunity cost',
              'Returns: higher earnings, opportunities',
              'Investment in human capital',
            ],
          },
          {
            id: 'practice-9-1-2',
            prompt: 'Why should you invest in yourself? What are the benefits?',
            hints: [
              'Higher income',
              'Better opportunities',
              'Job security, personal growth',
            ],
          },
          {
            id: 'practice-9-1-3',
            prompt: 'What is educational investment? What types are there?',
            hints: [
              'Resources spent on education',
              'Formal education, training',
              'Certifications, skills development',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u9-l1-quiz',
        type: 'quiz',
        title: 'Quiz: Education and earnings',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-9-2',
    title: 'Postsecondary education',
    duration: '60 min',
    contentItems: [
      {
        id: 'economics-u9-l2-video-1',
        type: 'video',
        title: 'Postsecondary education',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'economics-u9-l2-article',
        type: 'article',
        title: 'Learn: Postsecondary education',
        content: `# Postsecondary education

## What are the different types of costs associated with college, postsecondary education, and training?

**Direct costs**: Money paid directly to school.
- Tuition
- Fees
- Books and supplies
- Room and board (if living on campus)

**Indirect costs**: Other expenses related to education.
- Transportation
- Personal expenses
- Opportunity cost (foregone earnings)
- Living expenses (if not on campus)

**Total cost**: Direct + Indirect costs.

**Key insight**: Total cost includes both direct and indirect expenses.

## How to estimate your educational costs

**Steps to estimate**:
1. Research tuition and fees
2. Estimate books and supplies
3. Calculate room and board (if applicable)
4. Estimate transportation and personal expenses
5. Consider opportunity cost
6. Factor in financial aid
7. Calculate net cost

**Tools**: College cost calculators, financial aid estimators.

**Key insight**: Accurate cost estimation helps plan and budget for education.

## True cost of education

**True cost**: Total cost minus financial aid.

**Components**:
- Sticker price (published cost)
- Minus grants and scholarships (free money)
- Minus other aid
- Equals net price (what you actually pay)

**Important**: Don't just look at sticker price - consider net cost.

**Key insight**: True cost is net price after financial aid.

## Paying for education

**Options**:
1. **Grants**: Free money, don't repay
2. **Scholarships**: Free money, don't repay
3. **Student loans**: Borrowed money, must repay
4. **529 plans**: Tax-advantaged savings
5. **Work-study**: Earn money while studying
6. **Personal savings**: Your own money
7. **Family contributions**: Help from family

**Key insight**: Multiple options available to pay for education.

## Paying for education: Grants

**Grants**: Free money, don't need to repay.

**Types**:
- **Federal Pell Grant**: Based on financial need
- **Federal Supplemental Educational Opportunity Grant (FSEOG)**: For students with exceptional need
- **State grants**: Vary by state
- **Institutional grants**: From college itself

**Requirements**: Usually based on financial need, must maintain enrollment.

**Key insight**: Grants are free money - apply for all you're eligible for.

## Paying for education: Scholarships

**Scholarships**: Free money, don't need to repay.

**Types**:
- Merit-based (grades, test scores)
- Need-based (financial need)
- Athletic
- Special talents (music, art)
- Demographic (minority, first-generation)
- Employer-sponsored

**Sources**: Colleges, private organizations, employers, community groups.

**Key insight**: Scholarships are free money - search widely and apply.

## Paying for education: Student loans

**Student loans**: Borrowed money, must repay with interest.

**Types**:
- **Federal loans**: Lower rates, better terms
  - Direct Subsidized (need-based, government pays interest while in school)
  - Direct Unsubsidized (not need-based, interest accrues)
  - PLUS loans (for parents/graduate students)
- **Private loans**: Higher rates, less flexible

**Key insight**: Loans must be repaid - borrow only what you need.

## Paying for education: 529 plans

**529 plans**: Tax-advantaged savings for education.

**Types**:
- **529 savings plans**: Investment accounts
- **529 prepaid plans**: Prepay tuition

**Benefits**:
- Tax-free growth
- Tax-free withdrawals for qualified expenses
- Can be used for college, K-12, apprenticeships

**Key insight**: 529 plans provide tax advantages for education savings.

## Paying for education: Other ways

**Other options**:
- **Work-study**: Part-time jobs on campus
- **Employer tuition assistance**: Some employers pay for education
- **Military benefits**: GI Bill, tuition assistance
- **Apprenticeships**: Earn while learning
- **Community college first**: Lower cost option

**Key insight**: Many creative ways to pay for education.`,
        importantPoints: [
          'Direct costs: tuition, fees, books',
          'Indirect costs: transportation, opportunity cost',
          'True cost: net price after financial aid',
          'Grants: free money, don\'t repay',
          'Scholarships: free money, don\'t repay',
          'Student loans: must repay with interest',
          '529 plans: tax-advantaged savings',
        ],
      } as ArticleContent,
      {
        id: 'economics-u9-l2-practice',
        type: 'practice',
        title: 'Practice: Paying for education',
        exercises: [
          {
            id: 'practice-9-2-1',
            prompt: 'What are the different types of costs associated with college?',
            hints: [
              'Direct: tuition, fees, books',
              'Indirect: transportation, opportunity cost',
              'Total cost',
            ],
          },
          {
            id: 'practice-9-2-2',
            prompt: 'What is the true cost of education? How do you calculate it?',
            hints: [
              'Net price after financial aid',
              'Sticker price minus aid',
              'What you actually pay',
            ],
          },
          {
            id: 'practice-9-2-3',
            prompt: 'What are grants and scholarships? How are they different from loans?',
            hints: [
              'Grants: free money',
              'Scholarships: free money',
              'Loans: must repay',
            ],
          },
          {
            id: 'practice-9-2-4',
            prompt: 'What are student loans? What types are available?',
            hints: [
              'Borrowed money, must repay',
              'Federal vs. private',
              'Subsidized vs. unsubsidized',
            ],
          },
          {
            id: 'practice-9-2-5',
            prompt: 'What is a 529 plan? How does it work?',
            hints: [
              'Tax-advantaged savings',
              'Tax-free growth and withdrawals',
              'For qualified education expenses',
            ],
          },
          {
            id: 'practice-9-2-6',
            prompt: 'What are other ways to pay for education?',
            hints: [
              'Work-study',
              'Employer assistance',
              'Military benefits, apprenticeships',
            ],
          },
          {
            id: 'practice-9-2-7',
            prompt: 'How do you estimate your educational costs?',
            hints: [
              'Research tuition and fees',
              'Estimate all expenses',
              'Factor in financial aid',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u9-l2-quiz',
        type: 'quiz',
        title: 'Quiz: Postsecondary education',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-9-3',
    title: 'Cost of postsecondary education',
    duration: '35 min',
    contentItems: [
      {
        id: 'economics-u9-l3-video-1',
        type: 'video',
        title: 'Cost of postsecondary education',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'economics-u9-l3-article',
        type: 'article',
        title: 'Learn: Cost of postsecondary education',
        content: `# Cost of postsecondary education

## How to compare costs among postsecondary options

**Factors to compare**:
1. **Tuition and fees**: Base cost
2. **Room and board**: Living expenses
3. **Books and supplies**: Additional costs
4. **Financial aid**: Grants, scholarships, loans
5. **Net price**: What you actually pay
6. **Opportunity cost**: Foregone earnings
7. **Time to degree**: Affects total cost

**Tools**: 
- College cost calculators
- Net price calculators
- Financial aid comparison tools

**Key insight**: Compare net price, not just sticker price.

## Public vs. private vs. certification vs. community college: What is the difference?

**Public colleges/universities**:
- Funded by state government
- Lower tuition (especially in-state)
- Larger class sizes
- Wide variety of programs

**Private colleges/universities**:
- Privately funded
- Higher tuition
- Often smaller class sizes
- May have more resources per student

**Community colleges**:
- Two-year institutions
- Lowest cost option
- Associate degrees, certificates
- Can transfer to four-year college

**Certification programs**:
- Short-term training
- Specific skills
- Lower cost
- Faster entry to workforce

**Key insight**: Different options serve different needs and budgets.`,
        importantPoints: [
          'Compare net price, not sticker price',
          'Public: lower cost, state-funded',
          'Private: higher cost, more resources',
          'Community college: lowest cost, two-year',
          'Certification: short-term, specific skills',
        ],
      } as ArticleContent,
      {
        id: 'economics-u9-l3-practice',
        type: 'practice',
        title: 'Practice: Comparing different options',
        exercises: [
          {
            id: 'practice-9-3-1',
            prompt: 'How do you compare costs among different postsecondary options?',
            hints: [
              'Compare net price',
              'Factor in all costs',
              'Consider financial aid',
            ],
          },
          {
            id: 'practice-9-3-2',
            prompt: 'What is the difference between public and private colleges?',
            hints: [
              'Public: state-funded, lower cost',
              'Private: privately funded, higher cost',
              'Different resources',
            ],
          },
          {
            id: 'practice-9-3-3',
            prompt: 'What are community colleges and certification programs? How do they differ?',
            hints: [
              'Community college: two-year, lowest cost',
              'Certification: short-term, specific skills',
              'Different purposes',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u9-l3-quiz',
        type: 'quiz',
        title: 'Quiz: Cost of postsecondary education',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-9-4',
    title: 'Financial aid',
    duration: '50 min',
    contentItems: [
      {
        id: 'economics-u9-l4-video-1',
        type: 'video',
        title: 'Financial aid',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'economics-u9-l4-article',
        type: 'article',
        title: 'Learn: Financial aid',
        content: `# Financial aid

## Introduction to the FAFSA

**FAFSA**: Free Application for Federal Student Aid.

**Purpose**: Determine eligibility for federal financial aid.

**What it determines**:
- Expected Family Contribution (EFC)
- Eligibility for grants, loans, work-study
- Need-based aid

**When to apply**: 
- October 1 for following academic year
- Must reapply each year

**Key insight**: FAFSA is required for federal financial aid.

## Financial aid package components: Part 1

**Financial aid package**: Total aid offered by school.

**Components**:
1. **Grants**: Free money (don't repay)
2. **Scholarships**: Free money (don't repay)
3. **Work-study**: Earn money while studying
4. **Loans**: Borrowed money (must repay)

**Key insight**: Aid package combines different types of aid.

## Financial aid package example: Part 2

**Example package**:
- Pell Grant: $6,000
- State Grant: $2,000
- Institutional Scholarship: $3,000
- Work-study: $2,000
- Direct Loan: $5,500
- Total: $18,500

**Net cost**: Sticker price - Total aid = What you pay.

**Key insight**: Aid packages vary by school and student.

## Financial aid package comparison: Part 3

**How to compare**:
- Compare net price (not total aid)
- Consider types of aid (grants vs. loans)
- Factor in work-study (must work for it)
- Consider future costs (aid may change)

**Key insight**: Compare net price to make informed decisions.

## Sample financial aid package

**Typical components**:
- Grants and scholarships (free money)
- Work-study (earn money)
- Loans (borrow money)

**Important**: Accept free money first, loans last.

**Key insight**: Understand what you're accepting in aid package.

## Understanding financial aid eligibility requirements

**Eligibility factors**:
- Financial need (FAFSA determines)
- Academic performance (for merit aid)
- Enrollment status (full-time vs. part-time)
- Satisfactory academic progress
- Citizenship status
- Other specific requirements

**Key insight**: Eligibility varies by type of aid and school.`,
        importantPoints: [
          'FAFSA: required for federal aid',
          'Financial aid package: grants, scholarships, work-study, loans',
          'Compare net price, not total aid',
          'Accept free money first, loans last',
          'Eligibility varies by type of aid',
        ],
      } as ArticleContent,
      {
        id: 'economics-u9-l4-practice',
        type: 'practice',
        title: 'Practice: FAFSA and financial aid',
        exercises: [
          {
            id: 'practice-9-4-1',
            prompt: 'What is the FAFSA? Why is it important?',
            hints: [
              'Free Application for Federal Student Aid',
              'Determines eligibility',
              'Required for federal aid',
            ],
          },
          {
            id: 'practice-9-4-2',
            prompt: 'What are the components of a financial aid package?',
            hints: [
              'Grants and scholarships',
              'Work-study',
              'Loans',
            ],
          },
          {
            id: 'practice-9-4-3',
            prompt: 'How do you compare financial aid packages?',
            hints: [
              'Compare net price',
              'Consider types of aid',
              'Factor in future costs',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u9-l4-quiz',
        type: 'quiz',
        title: 'Quiz: Financial aid',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-9-5',
    title: 'Student loans',
    duration: '60 min',
    contentItems: [
      {
        id: 'economics-u9-l5-video-1',
        type: 'video',
        title: 'Student loans',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'economics-u9-l5-article',
        type: 'article',
        title: 'Learn: Student loans',
        content: `# Student loans

## Benefits and drawbacks of college loans

**Benefits**:
- Access to education
- Can invest in future
- Lower interest rates than other loans
- Flexible repayment options
- May be subsidized (government pays interest)

**Drawbacks**:
- Must repay with interest
- Debt burden after graduation
- Can't be discharged in bankruptcy (usually)
- May limit career choices
- Interest accrues over time

**Key insight**: Loans provide access but create debt obligation.

## Paying back your loans

**Repayment options**:
- **Standard**: Fixed payments over 10 years
- **Graduated**: Payments start low, increase over time
- **Extended**: Lower payments over longer period (25 years)
- **Income-driven**: Payments based on income
  - Income-Based Repayment (IBR)
  - Pay As You Earn (PAYE)
  - Revised Pay As You Earn (REPAYE)
  - Income-Contingent Repayment (ICR)

**Key insight**: Multiple repayment options available.

## Consolidating student loans

**Loan consolidation**: Combine multiple loans into one.

**Benefits**:
- Single monthly payment
- May lower monthly payment
- Simplify management

**Drawbacks**:
- May extend repayment period
- May increase total interest paid
- Lose benefits of original loans

**Key insight**: Consolidation can simplify but may cost more.

## Terms to know when you repay student loans

**Key terms**:
- **Principal**: Amount borrowed
- **Interest**: Cost of borrowing
- **Grace period**: Time before repayment starts (usually 6 months)
- **Deferment**: Temporarily postpone payments
- **Forbearance**: Temporarily reduce/stop payments
- **Default**: Failure to repay (serious consequences)

**Key insight**: Understand terms to manage loans effectively.

## Public Service Loan Forgiveness: a path out of student debt

**PSLF**: Forgives remaining debt after 10 years of qualifying payments.

**Requirements**:
- Work for qualifying employer (government, non-profit)
- Make 120 qualifying payments
- Be on qualifying repayment plan
- Loans must be Direct Loans

**Key insight**: PSLF can eliminate debt for public service workers.

## How loan deferment works

**Deferment**: Temporarily postpone loan payments.

**Types**:
- In-school deferment
- Unemployment deferment
- Economic hardship deferment
- Military service deferment

**Interest**: May or may not accrue depending on loan type.

**Key insight**: Deferment provides temporary relief but interest may accrue.

## Real talk about student loans

**Reality check**:
- Loans are real debt
- Must be repaid
- Interest adds up
- Can affect credit
- May limit life choices

**Best practices**:
- Borrow only what you need
- Understand terms
- Make payments on time
- Consider repayment options
- Plan for repayment

**Key insight**: Take student loans seriously and plan for repayment.

## Student loan default

**Default**: Failure to repay loans (usually after 270 days of non-payment).

**Consequences**:
- Damaged credit
- Wage garnishment
- Tax refund offset
- Collection fees
- Loss of eligibility for future aid
- Legal action

**Prevention**: 
- Contact servicer if having trouble
- Apply for deferment/forbearance
- Consider income-driven repayment
- Don't ignore the problem

**Key insight**: Default has serious consequences - seek help before defaulting.`,
        importantPoints: [
          'Loans: benefits and drawbacks',
          'Repayment options: standard, graduated, extended, income-driven',
          'Consolidation: simplify but may cost more',
          'PSLF: forgiveness for public service',
          'Deferment: temporarily postpone payments',
          'Default: serious consequences',
        ],
      } as ArticleContent,
      {
        id: 'economics-u9-l5-practice',
        type: 'practice',
        title: 'Practice: Student loan repayment',
        exercises: [
          {
            id: 'practice-9-5-1',
            prompt: 'What are the benefits and drawbacks of student loans?',
            hints: [
              'Benefits: access to education',
              'Drawbacks: debt burden',
              'Must repay with interest',
            ],
          },
          {
            id: 'practice-9-5-2',
            prompt: 'What are the different repayment options for student loans?',
            hints: [
              'Standard, graduated, extended',
              'Income-driven plans',
              'Different options for different situations',
            ],
          },
          {
            id: 'practice-9-5-3',
            prompt: 'What is Public Service Loan Forgiveness? How does it work?',
            hints: [
              'Forgives debt after 10 years',
              'Work for qualifying employer',
              '120 qualifying payments',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u9-l5-practice-2',
        type: 'practice',
        title: 'Practice: Student loan repayment and default',
        exercises: [
          {
            id: 'practice-9-5-4',
            prompt: 'What is loan deferment? How does it work?',
            hints: [
              'Temporarily postpone payments',
              'Different types',
              'Interest may accrue',
            ],
          },
          {
            id: 'practice-9-5-5',
            prompt: 'What happens if you default on student loans?',
            hints: [
              'Damaged credit',
              'Wage garnishment',
              'Collection fees, legal action',
            ],
          },
          {
            id: 'practice-9-5-6',
            prompt: 'What are key terms to know when repaying student loans?',
            hints: [
              'Principal, interest',
              'Grace period, deferment',
              'Forbearance, default',
            ],
          },
          {
            id: 'practice-9-5-7',
            prompt: 'What should you know about student loans?',
            hints: [
              'Real debt, must repay',
              'Borrow only what you need',
              'Plan for repayment',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u9-l5-quiz',
        type: 'quiz',
        title: 'Quiz: Student loans',
        questions: [],
      } as QuizContent,
    ],
  },
];

const unit10Lessons: Lesson[] = [
  {
    id: 'lesson-10-1',
    title: 'Compensation',
    duration: '40 min',
    contentItems: [
      {
        id: 'economics-u10-l1-video-1',
        type: 'video',
        title: 'Compensation',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'economics-u10-l1-article',
        type: 'article',
        title: 'Learn: Compensation',
        content: `# Compensation

## Unpacking employee benefits

**Employee benefits**: Non-wage compensation provided by employers.

**Types**:
- Health insurance
- Retirement plans (401(k), pension)
- Paid time off (vacation, sick leave)
- Life insurance
- Disability insurance
- Tuition assistance
- Flexible spending accounts

**Value**: Benefits can be worth 30-40% of salary.

**Key insight**: Benefits are significant part of total compensation.

## Navigating the benefits landscape

**Understanding benefits**:
- Read benefit summaries carefully
- Compare options
- Understand costs (premiums, deductibles)
- Know enrollment periods
- Ask questions

**Key decisions**:
- Health insurance plan selection
- Retirement contribution amount
- Flexible spending account contributions
- Life insurance coverage

**Key insight**: Understanding benefits helps maximize compensation value.

## Benefits explained

**Health insurance**: Covers medical expenses.
- Premiums: Monthly cost
- Deductible: Amount you pay before insurance kicks in
- Copay: Fixed amount per visit
- Coinsurance: Percentage you pay after deductible

**Retirement plans**: Save for retirement.
- 401(k): Employer-sponsored, often with match
- Pension: Employer-funded retirement
- IRA: Individual retirement account

**Paid time off**: Vacation, sick leave, holidays.

**Key insight**: Different benefits serve different needs.

## Closer look at benefits

**Health benefits**:
- Medical, dental, vision insurance
- Health savings accounts (HSA)
- Flexible spending accounts (FSA)

**Financial benefits**:
- 401(k) matching
- Stock options
- Profit sharing
- Bonuses

**Work-life benefits**:
- Flexible schedules
- Remote work
- Childcare assistance
- Wellness programs

**Key insight**: Benefits package varies by employer and job level.`,
        importantPoints: [
          'Employee benefits: non-wage compensation',
          'Types: health, retirement, time off, insurance',
          'Value: 30-40% of salary',
          'Understand costs and options',
          'Benefits vary by employer',
        ],
      } as ArticleContent,
      {
        id: 'economics-u10-l1-practice',
        type: 'practice',
        title: 'Practice: Benefits',
        exercises: [
          {
            id: 'practice-10-1-1',
            prompt: 'What are employee benefits? What types are there?',
            hints: [
              'Non-wage compensation',
              'Health insurance, retirement',
              'Paid time off, insurance',
            ],
          },
          {
            id: 'practice-10-1-2',
            prompt: 'How do you navigate the benefits landscape?',
            hints: [
              'Read summaries carefully',
              'Compare options',
              'Understand costs',
            ],
          },
          {
            id: 'practice-10-1-3',
            prompt: 'What are key health insurance terms?',
            hints: [
              'Premium, deductible',
              'Copay, coinsurance',
              'Understand costs',
            ],
          },
          {
            id: 'practice-10-1-4',
            prompt: 'What are different types of benefits?',
            hints: [
              'Health, financial',
              'Work-life benefits',
              'Varies by employer',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u10-l1-practice-2',
        type: 'practice',
        title: 'Practice: Identifying benefits',
        exercises: [
          {
            id: 'practice-10-1-5',
            prompt: 'How do you identify and evaluate benefits in a job offer?',
            hints: [
              'Read benefit summaries',
              'Compare total compensation',
              'Consider value of benefits',
            ],
          },
          {
            id: 'practice-10-1-6',
            prompt: 'What should you consider when choosing benefits?',
            hints: [
              'Your needs and situation',
              'Costs vs. coverage',
              'Long-term value',
            ],
          },
          {
            id: 'practice-10-1-7',
            prompt: 'Why are benefits important in total compensation?',
            hints: [
              'Significant value',
              '30-40% of salary',
              'Affect financial security',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u10-l1-quiz',
        type: 'quiz',
        title: 'Quiz: Compensation',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-10-2',
    title: 'Paycheck',
    duration: '35 min',
    contentItems: [
      {
        id: 'economics-u10-l2-video-1',
        type: 'video',
        title: 'Paycheck',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'economics-u10-l2-article',
        type: 'article',
        title: 'Learn: Paycheck',
        content: `# Paycheck

## Anatomy of a paycheck

**Gross pay**: Total earnings before deductions.

**Deductions**: Amounts taken out of paycheck.

**Net pay**: Take-home pay (gross pay - deductions).

**Common deductions**:
- Federal income tax
- State income tax
- Social Security tax (FICA)
- Medicare tax
- Health insurance premiums
- Retirement contributions
- Other benefits

**Key insight**: Understanding paycheck helps manage finances.

## Understanding your paystub

**Paystub components**:
- **Employee information**: Name, address, employee ID
- **Pay period**: Dates covered
- **Gross pay**: Total earnings
- **Deductions**: Breakdown of all deductions
- **Net pay**: Final take-home amount
- **Year-to-date (YTD)**: Totals for the year

**Important to check**:
- Gross pay is correct
- Deductions are accurate
- Tax withholdings are appropriate
- Year-to-date totals

**Key insight**: Review paystub regularly to ensure accuracy.`,
        importantPoints: [
          'Gross pay: total before deductions',
          'Net pay: take-home after deductions',
          'Deductions: taxes, insurance, retirement',
          'Paystub: shows all details',
          'Review regularly for accuracy',
        ],
      } as ArticleContent,
      {
        id: 'economics-u10-l2-practice',
        type: 'practice',
        title: 'Practice: Paycheck deductions',
        exercises: [
          {
            id: 'practice-10-2-1',
            prompt: 'What is the difference between gross pay and net pay?',
            hints: [
              'Gross: before deductions',
              'Net: after deductions',
              'Take-home pay',
            ],
          },
          {
            id: 'practice-10-2-2',
            prompt: 'What are common paycheck deductions?',
            hints: [
              'Federal and state taxes',
              'Social Security, Medicare',
              'Insurance, retirement',
            ],
          },
          {
            id: 'practice-10-2-3',
            prompt: 'What information is on a paystub? Why is it important?',
            hints: [
              'Gross pay, deductions, net pay',
              'Year-to-date totals',
              'Verify accuracy',
            ],
          },
          {
            id: 'practice-10-2-4',
            prompt: 'How do you calculate net pay?',
            hints: [
              'Gross pay minus deductions',
              'All deductions',
              'Final take-home amount',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u10-l2-quiz',
        type: 'quiz',
        title: 'Quiz: Paycheck',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-10-3',
    title: 'Non-typical pay',
    duration: '45 min',
    contentItems: [
      {
        id: 'economics-u10-l3-video-1',
        type: 'video',
        title: 'Non-typical pay',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'economics-u10-l3-article',
        type: 'article',
        title: 'Learn: Non-typical pay',
        content: `# Non-typical pay

## Non-typical pay structures

**Non-typical pay**: Compensation that isn't regular salary or hourly wage.

**Types**:
- Commission (sales)
- Tips (service industry)
- Piece rate (per item produced)
- Contract work (project-based)
- Freelance (per project)
- Gig work (on-demand)

**Characteristics**:
- Variable income
- Less predictable
- May have no benefits
- More flexibility

**Key insight**: Non-typical pay structures offer flexibility but less stability.

## Contract work, waitressing, babysitting, commission pay

**Contract work**: 
- Fixed-term projects
- Agreed payment
- No benefits typically
- More control over work

**Waitressing/Tips**:
- Base wage (often below minimum)
- Tips as main income
- Variable daily income
- Cash tips may be underreported

**Babysitting**:
- Usually cash payment
- Informal arrangement
- Variable hours
- May need to report income

**Commission pay**:
- Percentage of sales
- Performance-based
- Can be high or low
- No guaranteed income

**Key insight**: Each structure has different characteristics and tax implications.

## Tax implications of non-typical pay structures

**Tax considerations**:
- Income must be reported
- May need to pay estimated taxes
- Self-employment tax (if self-employed)
- No automatic withholding
- Need to track income and expenses

**Tips**: Must report all tips (cash and credit card).

**Contract/Freelance**: Usually receive 1099 form, responsible for own taxes.

**Key insight**: Non-typical pay requires more tax planning and record-keeping.

## Tax responsibilities for self-employed individuals

**Self-employment tax**: Social Security and Medicare taxes (15.3% total).

**Quarterly estimated taxes**: Pay taxes throughout year (not just at tax time).

**Deductions**: Can deduct business expenses.

**Record-keeping**: Must track income and expenses.

**Forms**: 
- Schedule C (business income)
- Schedule SE (self-employment tax)
- 1099 forms from clients

**Key insight**: Self-employed individuals have additional tax responsibilities.`,
        importantPoints: [
          'Non-typical pay: variable, less predictable',
          'Types: commission, tips, contract, freelance',
          'Tax implications: must report income',
          'Self-employment tax: 15.3%',
          'Quarterly estimated taxes',
          'Track income and expenses',
        ],
      } as ArticleContent,
      {
        id: 'economics-u10-l3-practice',
        type: 'practice',
        title: 'Practice: Non-typical pay structures',
        exercises: [
          {
            id: 'practice-10-3-1',
            prompt: 'What are non-typical pay structures? Give examples.',
            hints: [
              'Not regular salary or hourly',
              'Commission, tips',
              'Contract, freelance',
            ],
          },
          {
            id: 'practice-10-3-2',
            prompt: 'What are the tax implications of non-typical pay?',
            hints: [
              'Must report all income',
              'May need estimated taxes',
              'Self-employment tax if applicable',
            ],
          },
          {
            id: 'practice-10-3-3',
            prompt: 'What are tax responsibilities for self-employed individuals?',
            hints: [
              'Self-employment tax',
              'Quarterly estimated taxes',
              'Track income and expenses',
            ],
          },
          {
            id: 'practice-10-3-4',
            prompt: 'How do tips, commission, and contract work differ in terms of pay and taxes?',
            hints: [
              'Different income structures',
              'Different tax reporting',
              'Variable vs. fixed',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u10-l3-quiz',
        type: 'quiz',
        title: 'Quiz: Non-typical pay',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-10-4',
    title: 'Hiring process',
    duration: '30 min',
    contentItems: [
      {
        id: 'economics-u10-l4-video-1',
        type: 'video',
        title: 'Hiring process',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'economics-u10-l4-article',
        type: 'article',
        title: 'Learn: Hiring process',
        content: `# Hiring process

## The hire package: A look at hiring forms

**Hiring forms**: Documents required when starting new job.

**Common forms**:
- **W-4**: Tax withholding form
- **I-9**: Employment eligibility verification
- **Direct deposit form**: Bank account information
- **Benefits enrollment**: Health insurance, retirement
- **Emergency contact**: Personal information
- **Non-disclosure agreement (NDA)**: Confidentiality
- **Employee handbook acknowledgment**: Company policies

**Purpose**: 
- Legal compliance
- Tax withholding
- Benefits enrollment
- Company records

**Key insight**: Hiring forms are required for legal and administrative purposes.

## Understanding W-4 and I-9 forms

**W-4 Form**: Employee's Withholding Certificate.

**Purpose**: Determines how much federal income tax to withhold.

**Information needed**:
- Filing status (single, married, etc.)
- Number of dependents
- Additional withholding (if desired)
- Multiple jobs (if applicable)

**Why important**: 
- Affects take-home pay
- Prevents over/under-withholding
- Should update when life changes

**I-9 Form**: Employment Eligibility Verification.

**Purpose**: Verify identity and work authorization.

**Required documents**:
- Proof of identity (driver's license, passport)
- Proof of work authorization (Social Security card, birth certificate)

**Must complete**: Within 3 days of starting work.

**Key insight**: W-4 affects taxes; I-9 verifies eligibility to work.`,
        importantPoints: [
          'Hiring forms: required documents',
          'W-4: tax withholding form',
          'I-9: employment eligibility verification',
          'Complete within required timeframes',
          'Update when circumstances change',
        ],
      } as ArticleContent,
      {
        id: 'economics-u10-l4-practice',
        type: 'practice',
        title: 'Practice: Hiring forms',
        exercises: [
          {
            id: 'practice-10-4-1',
            prompt: 'What forms are typically required when starting a new job?',
            hints: [
              'W-4, I-9',
              'Direct deposit, benefits',
              'Emergency contact, NDA',
            ],
          },
          {
            id: 'practice-10-4-2',
            prompt: 'What is the W-4 form? Why is it important?',
            hints: [
              'Tax withholding form',
              'Determines tax withholding',
              'Affects take-home pay',
            ],
          },
          {
            id: 'practice-10-4-3',
            prompt: 'What is the I-9 form? What documents are needed?',
            hints: [
              'Employment eligibility verification',
              'Proof of identity',
              'Proof of work authorization',
            ],
          },
          {
            id: 'practice-10-4-4',
            prompt: 'When should you update your W-4 form?',
            hints: [
              'Life changes',
              'Marriage, children',
              'Multiple jobs',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u10-l4-quiz',
        type: 'quiz',
        title: 'Quiz: Hiring process',
        questions: [],
      } as QuizContent,
    ],
  },
];

const unit11Lessons: Lesson[] = [
  {
    id: 'lesson-11-1',
    title: 'Banking and financial institutions',
    duration: '30 min',
    contentItems: [
      {
        id: 'economics-u11-l1-video-1',
        type: 'video',
        title: 'Banking and financial institutions',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'economics-u11-l1-article',
        type: 'article',
        title: 'Learn: Banking and financial institutions',
        content: `# Banking and financial institutions

## Banking institutions

**Types of banking institutions**:
1. **Commercial banks**: Full-service banks
   - Checking and savings accounts
   - Loans and credit cards
   - Investment services
   - For-profit

2. **Credit unions**: Member-owned cooperatives
   - Similar services to banks
   - Lower fees, better rates
   - Membership required
   - Not-for-profit

3. **Online banks**: Internet-based
   - Lower fees
   - Higher interest rates
   - Limited or no branches
   - 24/7 access

4. **Savings and loan associations**: Focus on mortgages
   - Traditional home loans
   - Less common now

**Key insight**: Different institutions serve different needs.

## Where to bank?

**Factors to consider**:
- **Fees**: Monthly fees, ATM fees, overdraft fees
- **Interest rates**: On savings accounts
- **Convenience**: Branch locations, ATMs, online access
- **Services**: Checking, savings, loans, investment
- **FDIC/NCUA insurance**: Protects deposits up to $250,000
- **Customer service**: Quality of support

**Choosing**:
- Compare fees and rates
- Consider your needs
- Check convenience
- Verify insurance coverage

**Key insight**: Choose bank based on your needs and priorities.`,
        importantPoints: [
          'Types: commercial banks, credit unions, online banks',
          'Credit unions: member-owned, lower fees',
          'Online banks: lower fees, higher rates',
          'Consider: fees, rates, convenience, services',
          'FDIC/NCUA insurance protects deposits',
        ],
      } as ArticleContent,
      {
        id: 'economics-u11-l1-practice',
        type: 'practice',
        title: 'Practice: Banking institutions',
        exercises: [
          {
            id: 'practice-11-1-1',
            prompt: 'What are the different types of banking institutions?',
            hints: [
              'Commercial banks',
              'Credit unions',
              'Online banks, savings and loan',
            ],
          },
          {
            id: 'practice-11-1-2',
            prompt: 'What is the difference between a bank and a credit union?',
            hints: [
              'Bank: for-profit',
              'Credit union: member-owned, not-for-profit',
              'Different ownership structure',
            ],
          },
          {
            id: 'practice-11-1-3',
            prompt: 'What factors should you consider when choosing where to bank?',
            hints: [
              'Fees, interest rates',
              'Convenience, services',
              'Insurance coverage',
            ],
          },
          {
            id: 'practice-11-1-4',
            prompt: 'What is FDIC/NCUA insurance? Why is it important?',
            hints: [
              'Protects deposits',
              'Up to $250,000',
              'Safety of your money',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u11-l1-quiz',
        type: 'quiz',
        title: 'Quiz: Banking and financial institutions',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-11-2',
    title: 'Understanding bank accounts',
    duration: '50 min',
    contentItems: [
      {
        id: 'economics-u11-l2-video-1',
        type: 'video',
        title: 'Understanding bank accounts',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'economics-u11-l2-article',
        type: 'article',
        title: 'Learn: Understanding bank accounts',
        content: `# Understanding bank accounts

## Types of bank accounts

**Checking account**: For daily transactions.
- Write checks
- Debit card purchases
- ATM withdrawals
- Online bill pay
- Usually low or no interest
- Easy access to money

**Savings account**: For saving money.
- Earn interest
- Limited transactions (usually 6 per month)
- Higher interest than checking
- Emergency fund
- Long-term savings

**Money market account**: Hybrid of checking and savings.
- Higher interest than savings
- Limited check writing
- Minimum balance requirements
- More restrictions

**Certificate of Deposit (CD)**: Time deposit.
- Fixed term (3 months to 5 years)
- Higher interest rate
- Penalty for early withdrawal
- Less liquid

**Key insight**: Different accounts serve different purposes.

## Account types

**Summary of account types**:
- **Checking**: Daily transactions, low interest
- **Savings**: Earn interest, limited transactions
- **Money market**: Higher interest, limited access
- **CD**: Highest interest, fixed term

**Choosing**: Based on needs (access, interest, purpose).

**Key insight**: Match account type to your financial goals.

## Opening a bank account

**Steps to open account**:
1. Choose bank/credit union
2. Gather required documents:
   - Government ID (driver's license, passport)
   - Social Security number
   - Proof of address
   - Initial deposit (if required)
3. Fill out application
4. Make initial deposit
5. Receive account information

**Requirements**: 
- Age (usually 18, or with parent for minors)
- Identification
- Minimum deposit (varies)

**Key insight**: Opening account requires identification and initial deposit.

## Managing your bank account

**Account management**:
- Monitor balance regularly
- Track transactions
- Set up alerts
- Review statements
- Reconcile account
- Avoid overdrafts

**Tools**:
- Online banking
- Mobile apps
- ATM access
- Paper statements

**Key insight**: Regular monitoring helps avoid problems.

## Effective bank account management

**Best practices**:
- Keep minimum balance (avoid fees)
- Monitor transactions daily
- Set up automatic transfers
- Use alerts for low balance
- Reconcile monthly
- Review fees regularly
- Keep records

**Key insight**: Good management prevents fees and problems.`,
        importantPoints: [
          'Checking: daily transactions',
          'Savings: earn interest, limited transactions',
          'Money market: higher interest',
          'CD: fixed term, highest interest',
          'Opening: ID, SSN, initial deposit',
          'Management: monitor, track, reconcile',
        ],
      } as ArticleContent,
      {
        id: 'economics-u11-l2-practice',
        type: 'practice',
        title: 'Practice: Account identification',
        exercises: [
          {
            id: 'practice-11-2-1',
            prompt: 'What are the different types of bank accounts?',
            hints: [
              'Checking, savings',
              'Money market, CD',
              'Different purposes',
            ],
          },
          {
            id: 'practice-11-2-2',
            prompt: 'What is the difference between checking and savings accounts?',
            hints: [
              'Checking: daily transactions',
              'Savings: earn interest, limited transactions',
              'Different uses',
            ],
          },
          {
            id: 'practice-11-2-3',
            prompt: 'What documents are needed to open a bank account?',
            hints: [
              'Government ID',
              'Social Security number',
              'Proof of address',
            ],
          },
          {
            id: 'practice-11-2-4',
            prompt: 'What is a CD? How does it differ from savings?',
            hints: [
              'Certificate of Deposit',
              'Fixed term',
              'Higher interest, less liquid',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u11-l2-practice-2',
        type: 'practice',
        title: 'Practice: Opening and managing bank accounts',
        exercises: [
          {
            id: 'practice-11-2-5',
            prompt: 'What are the steps to open a bank account?',
            hints: [
              'Choose bank',
              'Gather documents',
              'Fill application, make deposit',
            ],
          },
          {
            id: 'practice-11-2-6',
            prompt: 'How do you manage a bank account effectively?',
            hints: [
              'Monitor balance',
              'Track transactions',
              'Reconcile regularly',
            ],
          },
          {
            id: 'practice-11-2-7',
            prompt: 'What are best practices for bank account management?',
            hints: [
              'Keep minimum balance',
              'Set up alerts',
              'Review fees',
            ],
          },
          {
            id: 'practice-11-2-8',
            prompt: 'What tools are available for managing bank accounts?',
            hints: [
              'Online banking',
              'Mobile apps',
              'ATM, statements',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u11-l2-practice-3',
        type: 'practice',
        title: 'Practice: Effective bank account management',
        exercises: [
          {
            id: 'practice-11-2-9',
            prompt: 'Why is it important to monitor your bank account regularly?',
            hints: [
              'Avoid overdrafts',
              'Catch errors',
              'Prevent fraud',
            ],
          },
          {
            id: 'practice-11-2-10',
            prompt: 'How can you avoid bank fees?',
            hints: [
              'Keep minimum balance',
              'Monitor transactions',
              'Understand fee structure',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u11-l2-quiz',
        type: 'quiz',
        title: 'Quiz: Understanding bank accounts',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-11-3',
    title: 'Tracking, reconciling and more',
    duration: '35 min',
    contentItems: [
      {
        id: 'economics-u11-l3-video-1',
        type: 'video',
        title: 'Tracking, reconciling and more',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'economics-u11-l3-article',
        type: 'article',
        title: 'Learn: Tracking, reconciling and more',
        content: `# Tracking, reconciling and more

## The importance of regular tracking

**Why track**:
- Know your balance
- Avoid overdrafts
- Catch errors
- Detect fraud
- Budget effectively
- Plan spending

**How to track**:
- Check balance regularly
- Record all transactions
- Use mobile app
- Review statements
- Keep receipts

**Key insight**: Regular tracking prevents problems and helps manage money.

## Keeping your account in check

**Account reconciliation**: Match your records with bank statement.

**Steps**:
1. Get bank statement
2. Compare transactions
3. Check for errors
4. Verify deposits
5. Verify withdrawals
6. Calculate balance
7. Resolve discrepancies

**Benefits**:
- Catch errors early
- Detect fraud
- Accurate balance
- Better financial control

**Key insight**: Regular reconciliation ensures account accuracy.`,
        importantPoints: [
          'Regular tracking: know balance, avoid overdrafts',
          'Catch errors and fraud',
          'Reconciliation: match records with statement',
          'Benefits: accuracy, control, security',
        ],
      } as ArticleContent,
      {
        id: 'economics-u11-l3-practice',
        type: 'practice',
        title: 'Practice: Account tracking and management',
        exercises: [
          {
            id: 'practice-11-3-1',
            prompt: 'Why is it important to track your bank account regularly?',
            hints: [
              'Know balance',
              'Avoid overdrafts',
              'Catch errors, fraud',
            ],
          },
          {
            id: 'practice-11-3-2',
            prompt: 'How do you track your bank account?',
            hints: [
              'Check balance',
              'Record transactions',
              'Use mobile app, review statements',
            ],
          },
          {
            id: 'practice-11-3-3',
            prompt: 'What is account reconciliation? How do you do it?',
            hints: [
              'Match records with statement',
              'Compare transactions',
              'Verify deposits and withdrawals',
            ],
          },
          {
            id: 'practice-11-3-4',
            prompt: 'What are the benefits of regular account reconciliation?',
            hints: [
              'Catch errors early',
              'Detect fraud',
              'Accurate balance',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u11-l3-quiz',
        type: 'quiz',
        title: 'Quiz: Tracking, reconciling and more',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-11-4',
    title: 'Interest',
    duration: '45 min',
    contentItems: [
      {
        id: 'economics-u11-l4-video-1',
        type: 'video',
        title: 'Interest',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'economics-u11-l4-article',
        type: 'article',
        title: 'Learn: Interest',
        content: `# Interest

## How to make your money grow

**Interest**: Money earned on savings or paid on loans.

**Earning interest**: 
- Put money in savings account
- Invest in CDs
- Buy bonds
- Invest in stocks (dividends)

**Compound interest**: Interest earned on interest.

**Key insight**: Interest helps money grow over time.

## Compound growth

**Compound interest**: Interest calculated on principal plus accumulated interest.

**Formula**: A = P(1 + r)^n
- A = Final amount
- P = Principal (initial amount)
- r = Interest rate
- n = Number of periods

**Example**: 
- $1,000 at 5% for 10 years
- Simple interest: $1,500
- Compound interest: $1,629

**Power of compounding**: 
- Time is key factor
- Start early
- Let interest compound

**Key insight**: Compound interest grows money faster than simple interest.

## Why interest rates go up and down

**Factors affecting interest rates**:
1. **Federal Reserve policy**: Sets base rate
2. **Inflation**: Higher inflation → Higher rates
3. **Economic growth**: Strong economy → Higher rates
4. **Supply and demand**: More demand for loans → Higher rates
5. **Risk**: Higher risk → Higher rates
6. **Market conditions**: Overall economic conditions

**Key insight**: Multiple factors influence interest rates.

## How rising or falling interest rates might affect you

**Rising rates**:
- **Savings**: Earn more interest (good)
- **Borrowing**: Pay more interest (bad)
- **Mortgages**: Higher payments
- **Credit cards**: Higher interest charges
- **Investments**: Bonds lose value

**Falling rates**:
- **Savings**: Earn less interest (bad)
- **Borrowing**: Pay less interest (good)
- **Mortgages**: Lower payments
- **Credit cards**: Lower interest charges
- **Investments**: Bonds gain value

**Key insight**: Interest rate changes affect both savers and borrowers.`,
        importantPoints: [
          'Interest: money earned on savings or paid on loans',
          'Compound interest: interest on interest',
          'Time is key factor in compounding',
          'Rates affected by Fed policy, inflation, economy',
          'Rising rates: good for savers, bad for borrowers',
          'Falling rates: bad for savers, good for borrowers',
        ],
      } as ArticleContent,
      {
        id: 'economics-u11-l4-practice',
        type: 'practice',
        title: 'Practice: Understanding compound growth',
        exercises: [
          {
            id: 'practice-11-4-1',
            prompt: 'What is compound interest? How does it work?',
            hints: [
              'Interest on interest',
              'Grows faster than simple interest',
              'Time is key factor',
            ],
          },
          {
            id: 'practice-11-4-2',
            prompt: 'How can you make your money grow?',
            hints: [
              'Earn interest',
              'Compound interest',
              'Start early, invest',
            ],
          },
          {
            id: 'practice-11-4-3',
            prompt: 'Why is time important in compound growth?',
            hints: [
              'More time = more growth',
              'Start early',
              'Let interest compound',
            ],
          },
          {
            id: 'practice-11-4-4',
            prompt: 'Give an example of compound interest calculation.',
            hints: [
              'Formula: A = P(1 + r)^n',
              'Principal, rate, time',
              'Compare to simple interest',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u11-l4-practice-2',
        type: 'practice',
        title: 'Practice: The effects of interest rates',
        exercises: [
          {
            id: 'practice-11-4-5',
            prompt: 'What factors cause interest rates to go up and down?',
            hints: [
              'Federal Reserve policy',
              'Inflation, economic growth',
              'Supply and demand, risk',
            ],
          },
          {
            id: 'practice-11-4-6',
            prompt: 'How do rising interest rates affect you?',
            hints: [
              'Savings: earn more (good)',
              'Borrowing: pay more (bad)',
              'Mortgages, credit cards',
            ],
          },
          {
            id: 'practice-11-4-7',
            prompt: 'How do falling interest rates affect you?',
            hints: [
              'Savings: earn less (bad)',
              'Borrowing: pay less (good)',
              'Lower payments',
            ],
          },
          {
            id: 'practice-11-4-8',
            prompt: 'Why should you understand interest rates?',
            hints: [
              'Affect savings and borrowing',
              'Impact financial decisions',
              'Plan for changes',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u11-l4-quiz',
        type: 'quiz',
        title: 'Quiz: Interest',
        questions: [],
      } as QuizContent,
    ],
  },
];

const unit12Lessons: Lesson[] = [
  {
    id: 'lesson-12-1',
    title: 'SMART goals',
    duration: '35 min',
    contentItems: [
      {
        id: 'economics-u12-l1-video-1',
        type: 'video',
        title: 'SMART goals',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'economics-u12-l1-article',
        type: 'article',
        title: 'Learn: SMART goals',
        content: `# SMART goals

## What are SMART goals and why do they matter?

**SMART goals**: Framework for setting effective goals.

**Why they matter**:
- Clear and specific
- Measurable progress
- Achievable and realistic
- Time-bound
- More likely to succeed

**Benefits**:
- Better focus
- Clear direction
- Trackable progress
- Increased motivation
- Higher success rate

**Key insight**: SMART goals are more effective than vague goals.

## SMART goals

**SMART acronym**:
- **S**pecific: Clear and well-defined
- **M**easurable: Can track progress
- **A**chievable: Realistic and attainable
- **R**elevant: Aligned with values and priorities
- **T**ime-bound: Has deadline

**Example**:
- Bad: "Save money"
- Good: "Save $5,000 for emergency fund by December 31, 2024"

**Key insight**: Each letter represents important characteristic of effective goal.

## Writing your own SMART goals

**Steps to write SMART goals**:
1. Be **Specific**: What exactly do you want?
2. Make it **Measurable**: How will you track progress?
3. Ensure it's **Achievable**: Is it realistic?
4. Check it's **Relevant**: Does it matter to you?
5. Set **Time-bound**: When will you achieve it?

**Tips**:
- Write goals down
- Break large goals into smaller steps
- Review and adjust regularly
- Celebrate progress

**Key insight**: Writing SMART goals increases likelihood of success.`,
        importantPoints: [
          'SMART: Specific, Measurable, Achievable, Relevant, Time-bound',
          'More effective than vague goals',
          'Clear, trackable, realistic',
          'Write goals down, review regularly',
        ],
      } as ArticleContent,
      {
        id: 'economics-u12-l1-practice',
        type: 'practice',
        title: 'Practice: SMART goals',
        exercises: [
          {
            id: 'practice-12-1-1',
            prompt: 'What are SMART goals? Why do they matter?',
            hints: [
              'Framework for setting goals',
              'More effective than vague goals',
              'Clear, measurable, achievable',
            ],
          },
          {
            id: 'practice-12-1-2',
            prompt: 'What does each letter in SMART stand for?',
            hints: [
              'S: Specific',
              'M: Measurable',
              'A: Achievable, R: Relevant, T: Time-bound',
            ],
          },
          {
            id: 'practice-12-1-3',
            prompt: 'How do you write a SMART goal? Give an example.',
            hints: [
              'Be specific and measurable',
              'Ensure achievable and relevant',
              'Set time-bound deadline',
            ],
          },
          {
            id: 'practice-12-1-4',
            prompt: 'What are tips for writing effective SMART goals?',
            hints: [
              'Write goals down',
              'Break into smaller steps',
              'Review and adjust regularly',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u12-l1-quiz',
        type: 'quiz',
        title: 'Quiz: SMART goals',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-12-2',
    title: 'Short, medium, and long term goals',
    duration: '40 min',
    contentItems: [
      {
        id: 'economics-u12-l2-video-1',
        type: 'video',
        title: 'Short, medium, and long term goals',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'economics-u12-l2-article',
        type: 'article',
        title: 'Learn: Short, medium, and long term goals',
        content: `# Short, medium, and long term goals

## Short, medium and long term financial goals

**Short-term goals**: Achieve within 1 year.
- Examples: Emergency fund, pay off credit card, save for vacation
- Characteristics: Quick wins, immediate needs
- Funding: Current income, savings

**Medium-term goals**: Achieve in 1-5 years.
- Examples: Down payment on house, car purchase, education
- Characteristics: Require planning, larger amounts
- Funding: Savings, investments

**Long-term goals**: Achieve in 5+ years.
- Examples: Retirement, children's education, major purchase
- Characteristics: Long planning horizon, largest amounts
- Funding: Investments, compound growth

**Key insight**: Different time horizons require different strategies.

## Short, medium, and long term goals

**Balancing goals**:
- Need mix of all three
- Short-term: Immediate needs
- Medium-term: Major purchases
- Long-term: Financial security

**Prioritization**:
- Emergency fund first (short-term)
- Then medium-term goals
- Finally long-term goals

**Key insight**: Balance different time horizons for financial success.

## How to create a financial plan with short, medium, and long term goals

**Steps to create plan**:
1. **Identify goals**: List all financial goals
2. **Categorize**: Short, medium, long-term
3. **Prioritize**: Rank by importance
4. **Estimate costs**: How much needed?
5. **Set timeline**: When needed?
6. **Create plan**: How to achieve?
7. **Review regularly**: Adjust as needed

**Example plan**:
- Short-term: $1,000 emergency fund (6 months)
- Medium-term: $20,000 car down payment (3 years)
- Long-term: $500,000 retirement (30 years)

**Key insight**: Comprehensive plan includes goals for all time horizons.`,
        importantPoints: [
          'Short-term: within 1 year',
          'Medium-term: 1-5 years',
          'Long-term: 5+ years',
          'Balance all three types',
          'Prioritize and plan',
        ],
      } as ArticleContent,
      {
        id: 'economics-u12-l2-practice',
        type: 'practice',
        title: 'Practice: Short, medium, long term goals',
        exercises: [
          {
            id: 'practice-12-2-1',
            prompt: 'What are short-term, medium-term, and long-term financial goals?',
            hints: [
              'Short: within 1 year',
              'Medium: 1-5 years',
              'Long: 5+ years',
            ],
          },
          {
            id: 'practice-12-2-2',
            prompt: 'Give examples of each type of goal.',
            hints: [
              'Short: emergency fund, credit card',
              'Medium: down payment, car',
              'Long: retirement, education',
            ],
          },
          {
            id: 'practice-12-2-3',
            prompt: 'How do you balance different time horizon goals?',
            hints: [
              'Need mix of all three',
              'Prioritize',
              'Emergency fund first',
            ],
          },
          {
            id: 'practice-12-2-4',
            prompt: 'How do you create a financial plan with different time horizons?',
            hints: [
              'Identify and categorize goals',
              'Estimate costs, set timeline',
              'Create plan, review regularly',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u12-l2-quiz',
        type: 'quiz',
        title: 'Quiz: Short, medium, and long term goals',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-12-3',
    title: 'Net worth',
    duration: '35 min',
    contentItems: [
      {
        id: 'economics-u12-l3-video-1',
        type: 'video',
        title: 'Net worth',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'economics-u12-l3-article',
        type: 'article',
        title: 'Learn: Net worth',
        content: `# Net worth

## What is net worth?

**Net worth**: Total assets minus total liabilities.

**Formula**: Net Worth = Assets - Liabilities

**What it measures**: Your financial position.

**Why it matters**:
- Shows financial health
- Tracks progress over time
- Helps set goals
- Measures wealth

**Key insight**: Net worth is snapshot of your financial position.

## Assets, liabilities, and net worth

**Assets**: What you own (things of value).

**Types of assets**:
- **Liquid assets**: Cash, checking, savings
- **Investments**: Stocks, bonds, retirement accounts
- **Real estate**: Home, rental property
- **Personal property**: Car, furniture, jewelry
- **Business assets**: If you own a business

**Liabilities**: What you owe (debts).

**Types of liabilities**:
- **Mortgage**: Home loan
- **Student loans**: Education debt
- **Credit card debt**: Revolving debt
- **Car loans**: Auto financing
- **Other loans**: Personal loans, etc.

**Net worth calculation**:
1. List all assets (with values)
2. List all liabilities (with amounts)
3. Total assets
4. Total liabilities
5. Subtract: Assets - Liabilities = Net Worth

**Key insight**: Net worth shows difference between what you own and what you owe.`,
        importantPoints: [
          'Net worth: assets - liabilities',
          'Assets: what you own',
          'Liabilities: what you owe',
          'Measures financial position',
          'Track over time',
        ],
      } as ArticleContent,
      {
        id: 'economics-u12-l3-practice',
        type: 'practice',
        title: 'Practice: Net worth',
        exercises: [
          {
            id: 'practice-12-3-1',
            prompt: 'What is net worth? How is it calculated?',
            hints: [
              'Assets minus liabilities',
              'What you own minus what you owe',
              'Financial position',
            ],
          },
          {
            id: 'practice-12-3-2',
            prompt: 'What are assets? Give examples.',
            hints: [
              'What you own',
              'Cash, investments',
              'Real estate, property',
            ],
          },
          {
            id: 'practice-12-3-3',
            prompt: 'What are liabilities? Give examples.',
            hints: [
              'What you owe',
              'Mortgage, loans',
              'Credit card debt',
            ],
          },
          {
            id: 'practice-12-3-4',
            prompt: 'Why is net worth important? How do you track it?',
            hints: [
              'Shows financial health',
              'Tracks progress',
              'Calculate regularly',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u12-l3-quiz',
        type: 'quiz',
        title: 'Quiz: Net worth',
        questions: [],
      } as QuizContent,
    ],
  },
];

const unit13Lessons: Lesson[] = [
  {
    id: 'lesson-13-1',
    title: 'Budgeting',
    duration: '50 min',
    contentItems: [
      {
        id: 'economics-u13-l1-video-1',
        type: 'video',
        title: 'Budgeting',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'economics-u13-l1-article',
        type: 'article',
        title: 'Learn: Budgeting',
        content: `# Budgeting

## What is a budget?

**Budget**: Plan for how you'll spend your money.

**Purpose**:
- Track income and expenses
- Control spending
- Save money
- Reach financial goals
- Avoid debt

**Components**:
- Income: Money coming in
- Expenses: Money going out
- Savings: Money set aside

**Key insight**: Budget is financial plan that helps manage money.

## Planning a budget: How do you start?

**Steps to start**:
1. **Track current spending**: Know where money goes
2. **List all income**: All sources of money
3. **List all expenses**: Everything you spend
4. **Categorize expenses**: Needs vs. wants
5. **Set goals**: What do you want to achieve?
6. **Create plan**: Allocate money to categories

**Tools**:
- Spreadsheet
- Budgeting app
- Pen and paper
- Bank statements

**Key insight**: Start by understanding current financial situation.

## How do you build a budget?

**Budget building steps**:
1. **Calculate income**: Total monthly income
2. **List fixed expenses**: Rent, insurance, loan payments
3. **List variable expenses**: Food, utilities, entertainment
4. **Include savings**: Pay yourself first
5. **Allocate remaining**: Distribute money to categories
6. **Review and adjust**: Make sure it works

**Formula**: Income - Expenses - Savings = 0 (balanced)

**Key insight**: Budget should balance: income equals expenses plus savings.

## Budgeting and the 50-30-20 rule

**50-30-20 rule**: Guideline for budget allocation.

**Breakdown**:
- **50%**: Needs (housing, food, utilities, transportation)
- **30%**: Wants (entertainment, dining out, hobbies)
- **20%**: Savings and debt repayment

**Flexibility**: Adjust percentages based on situation.

**Benefits**:
- Simple framework
- Easy to remember
- Balanced approach
- Ensures savings

**Key insight**: 50-30-20 rule provides simple budgeting framework.

## How do you balance your budget?

**Balancing budget**: Make income equal expenses plus savings.

**If income > expenses**:
- Increase savings
- Pay down debt
- Invest more

**If expenses > income**:
- Reduce expenses
- Increase income
- Cut wants before needs

**Strategies**:
- Track spending
- Review regularly
- Adjust as needed
- Stay disciplined

**Key insight**: Balanced budget ensures you're not spending more than you earn.`,
        importantPoints: [
          'Budget: plan for spending money',
          'Start by tracking current spending',
          'Build: income, expenses, savings',
          '50-30-20 rule: needs, wants, savings',
          'Balance: income = expenses + savings',
        ],
      } as ArticleContent,
      {
        id: 'economics-u13-l1-practice',
        type: 'practice',
        title: 'Practice: Building a budget',
        exercises: [
          {
            id: 'practice-13-1-1',
            prompt: 'What is a budget? Why is it important?',
            hints: [
              'Plan for spending money',
              'Track income and expenses',
              'Control spending, save money',
            ],
          },
          {
            id: 'practice-13-1-2',
            prompt: 'How do you start planning a budget?',
            hints: [
              'Track current spending',
              'List income and expenses',
              'Set goals',
            ],
          },
          {
            id: 'practice-13-1-3',
            prompt: 'What is the 50-30-20 rule? How does it work?',
            hints: [
              '50% needs, 30% wants, 20% savings',
              'Simple framework',
              'Balanced approach',
            ],
          },
          {
            id: 'practice-13-1-4',
            prompt: 'How do you balance a budget?',
            hints: [
              'Income = expenses + savings',
              'Reduce expenses or increase income',
              'Stay disciplined',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u13-l1-quiz',
        type: 'quiz',
        title: 'Quiz: Budgeting',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-13-2',
    title: 'Saving money',
    duration: '50 min',
    contentItems: [
      {
        id: 'economics-u13-l2-video-1',
        type: 'video',
        title: 'Saving money',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'economics-u13-l2-article',
        type: 'article',
        title: 'Learn: Saving money',
        content: `# Saving money

## Why and how to save

**Why save**:
- Emergency fund
- Financial security
- Achieve goals
- Retirement
- Peace of mind

**How to save**:
- Pay yourself first
- Automate savings
- Set specific goals
- Track progress
- Start small

**Key insight**: Saving provides financial security and enables goal achievement.

## Why and how should I save money?

**Reasons to save**:
- **Emergencies**: Unexpected expenses
- **Goals**: Major purchases, education
- **Retirement**: Long-term security
- **Opportunities**: Take advantage when they arise
- **Peace of mind**: Reduce financial stress

**Strategies**:
- Set savings goals
- Make it automatic
- Start with small amounts
- Increase over time
- Separate savings accounts

**Key insight**: Saving money is essential for financial well-being.

## Planned and unplanned expenses

**Planned expenses**: Expected and budgeted.
- Examples: Rent, insurance, groceries
- Can prepare for
- Part of regular budget

**Unplanned expenses**: Unexpected.
- Examples: Car repair, medical emergency, job loss
- Can't predict
- Need emergency fund

**Key insight**: Both types require different saving strategies.

## Saving wisely: emergency fund

**Emergency fund**: Money set aside for unexpected expenses.

**Purpose**: 
- Cover emergencies
- Avoid debt
- Financial security
- Peace of mind

**How much**: 
- 3-6 months of expenses (minimum)
- More if income is variable
- Build gradually

**Where to keep**: 
- High-yield savings account
- Easily accessible
- Separate from other savings

**Key insight**: Emergency fund is foundation of financial security.

## I am ready to save. What is the next step?

**Steps to start saving**:
1. **Set goal**: How much? For what?
2. **Calculate amount**: How much can you save?
3. **Choose account**: Where to save?
4. **Automate**: Set up automatic transfers
5. **Track progress**: Monitor regularly
6. **Adjust**: Increase as income grows

**Tips**:
- Start small
- Be consistent
- Make it automatic
- Celebrate milestones

**Key insight**: Start saving now, even small amounts add up over time.`,
        importantPoints: [
          'Why save: emergencies, goals, retirement',
          'How: pay yourself first, automate',
          'Planned vs. unplanned expenses',
          'Emergency fund: 3-6 months expenses',
          'Start small, be consistent',
        ],
      } as ArticleContent,
      {
        id: 'economics-u13-l2-practice',
        type: 'practice',
        title: 'Practice: Emergency fund',
        exercises: [
          {
            id: 'practice-13-2-1',
            prompt: 'Why should you save money?',
            hints: [
              'Emergencies',
              'Financial security',
              'Achieve goals, retirement',
            ],
          },
          {
            id: 'practice-13-2-2',
            prompt: 'What is an emergency fund? How much should you have?',
            hints: [
              'Money for unexpected expenses',
              '3-6 months of expenses',
              'Financial security',
            ],
          },
          {
            id: 'practice-13-2-3',
            prompt: 'What is the difference between planned and unplanned expenses?',
            hints: [
              'Planned: expected, budgeted',
              'Unplanned: unexpected',
              'Different saving strategies',
            ],
          },
          {
            id: 'practice-13-2-4',
            prompt: 'What are the steps to start saving?',
            hints: [
              'Set goal',
              'Calculate amount, choose account',
              'Automate, track progress',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u13-l2-quiz',
        type: 'quiz',
        title: 'Quiz: Saving money',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-13-3',
    title: 'Reducing expenses',
    duration: '40 min',
    contentItems: [
      {
        id: 'economics-u13-l3-video-1',
        type: 'video',
        title: 'Reducing expenses',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'economics-u13-l3-article',
        type: 'article',
        title: 'Learn: Reducing expenses',
        content: `# Reducing expenses

## What is the better deal?

**Comparing deals**: Evaluate options to find best value.

**Factors to consider**:
- Total cost
- Unit price
- Quality
- Quantity needed
- Convenience
- Long-term value

**Example**: 
- Small package: $5 for 10 oz = $0.50/oz
- Large package: $8 for 20 oz = $0.40/oz
- Large is better deal (lower unit price)

**Key insight**: Compare unit prices and total value, not just total cost.

## Unit pricing: how to spend less by paying more

**Unit pricing**: Price per unit (ounce, pound, item).

**Why it matters**: 
- Larger sizes often cheaper per unit
- Can save money by buying larger
- But only if you'll use it all

**Calculation**: Total price ÷ Number of units = Unit price

**Example**:
- Brand A: $4 for 16 oz = $0.25/oz
- Brand B: $3 for 12 oz = $0.25/oz
- Same unit price, choose based on other factors

**Key insight**: Unit pricing helps find best value, but consider if you'll use larger quantity.

## How do I lower my expenses?

**Strategies to reduce expenses**:
1. **Track spending**: Know where money goes
2. **Cut wants**: Reduce non-essential spending
3. **Negotiate**: Lower bills, better rates
4. **Shop smart**: Compare prices, use coupons
5. **Reduce fixed costs**: Lower rent, insurance
6. **Eliminate waste**: Reduce unused subscriptions
7. **DIY**: Do it yourself when possible
8. **Buy in bulk**: When it makes sense
9. **Cook at home**: Cheaper than eating out
10. **Review regularly**: Find new ways to save

**Key insight**: Multiple strategies can help reduce expenses and free up money for savings.`,
        importantPoints: [
          'Compare deals: total cost, unit price, quality',
          'Unit pricing: price per unit',
          'Larger sizes often cheaper per unit',
          'Multiple strategies to reduce expenses',
          'Track spending, cut wants, negotiate',
        ],
      } as ArticleContent,
      {
        id: 'economics-u13-l3-practice',
        type: 'practice',
        title: 'Practice: Unit pricing',
        exercises: [
          {
            id: 'practice-13-3-1',
            prompt: 'How do you determine the better deal?',
            hints: [
              'Compare total cost',
              'Calculate unit price',
              'Consider quality and quantity',
            ],
          },
          {
            id: 'practice-13-3-2',
            prompt: 'What is unit pricing? Why is it important?',
            hints: [
              'Price per unit',
              'Helps compare deals',
              'Larger sizes often cheaper',
            ],
          },
          {
            id: 'practice-13-3-3',
            prompt: 'How do you calculate unit price? Give an example.',
            hints: [
              'Total price ÷ number of units',
              'Compare different sizes',
              'Find best value',
            ],
          },
          {
            id: 'practice-13-3-4',
            prompt: 'What are strategies to lower expenses?',
            hints: [
              'Track spending',
              'Cut wants, negotiate',
              'Shop smart, reduce waste',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u13-l3-quiz',
        type: 'quiz',
        title: 'Quiz: Reducing expenses',
        questions: [],
      } as QuizContent,
    ],
  },
];

const unit14Lessons: Lesson[] = [
  {
    id: 'lesson-14-1',
    title: 'Risk and return',
    duration: '40 min',
    contentItems: [
      {
        id: 'economics-u14-l1-video-1',
        type: 'video',
        title: 'Risk and return',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'economics-u14-l1-article',
        type: 'article',
        title: 'Learn: Risk and return',
        content: `# Risk and return

## What is risk and return?

**Risk**: Possibility of losing money or not achieving expected returns.

**Return**: Profit or loss on investment.

**Risk-return tradeoff**: Higher risk → Higher potential return (and higher potential loss).

**Types of risk**:
- **Market risk**: Overall market movements
- **Company risk**: Specific company problems
- **Credit risk**: Borrower defaults
- **Liquidity risk**: Can't sell quickly
- **Inflation risk**: Purchasing power decreases

**Key insight**: Understanding risk and return is fundamental to investing.

## Investing: Risk and return

**Risk levels**:
- **Low risk**: Savings accounts, CDs, government bonds
  - Lower returns
  - More stable
- **Medium risk**: Corporate bonds, balanced funds
  - Moderate returns
  - Some volatility
- **High risk**: Stocks, real estate, commodities
  - Higher potential returns
  - More volatility

**Key insight**: Different investments have different risk-return profiles.

## Stocks, bonds, mutual funds, and diversification

**Stocks**: Ownership in company.
- Higher risk, higher potential return
- Can lose value
- Long-term growth potential

**Bonds**: Loan to company or government.
- Lower risk than stocks
- Fixed interest payments
- Return of principal at maturity

**Mutual funds**: Pool of investments.
- Diversification (spreads risk)
- Professional management
- Lower risk than individual stocks

**Diversification**: Spreading investments across different assets.
- Reduces risk
- Don't put all eggs in one basket
- Mix of stocks, bonds, other assets

**Key insight**: Diversification reduces risk while maintaining return potential.`,
        importantPoints: [
          'Risk: possibility of loss',
          'Return: profit or loss',
          'Risk-return tradeoff: higher risk → higher return',
          'Stocks: higher risk, higher return',
          'Bonds: lower risk, lower return',
          'Diversification: spreads risk',
        ],
      } as ArticleContent,
      {
        id: 'economics-u14-l1-practice',
        type: 'practice',
        title: 'Practice: Investments',
        exercises: [
          {
            id: 'practice-14-1-1',
            prompt: 'What is risk and return? What is the relationship between them?',
            hints: [
              'Risk: possibility of loss',
              'Return: profit or loss',
              'Higher risk → higher return',
            ],
          },
          {
            id: 'practice-14-1-2',
            prompt: 'What are the different types of risk?',
            hints: [
              'Market risk',
              'Company risk, credit risk',
              'Liquidity, inflation risk',
            ],
          },
          {
            id: 'practice-14-1-3',
            prompt: 'What are stocks, bonds, and mutual funds? How do they differ in risk and return?',
            hints: [
              'Stocks: higher risk, higher return',
              'Bonds: lower risk, lower return',
              'Mutual funds: diversification',
            ],
          },
          {
            id: 'practice-14-1-4',
            prompt: 'What is diversification? Why is it important?',
            hints: [
              'Spreading investments',
              'Reduces risk',
              'Don\'t put all eggs in one basket',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u14-l1-quiz',
        type: 'quiz',
        title: 'Quiz: Risk and return',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-14-2',
    title: 'Planning for retirement',
    duration: '50 min',
    contentItems: [
      {
        id: 'economics-u14-l2-video-1',
        type: 'video',
        title: 'Planning for retirement',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'economics-u14-l2-article',
        type: 'article',
        title: 'Learn: Planning for retirement',
        content: `# Planning for retirement

## Why plan for retirement

**Reasons to plan**:
- **Longer life expectancy**: Need money for 20-30+ years
- **Inflation**: Costs increase over time
- **Healthcare costs**: Major expense in retirement
- **Social Security may not be enough**: Need additional savings
- **Time value of money**: Start early, compound growth
- **Peace of mind**: Financial security

**Key insight**: Planning early ensures comfortable retirement.

## The costs of retirement and how to estimate them

**Retirement expenses**:
- **Housing**: Mortgage/rent, maintenance, property taxes
- **Healthcare**: Insurance, medical costs (major expense)
- **Food**: Groceries, dining
- **Transportation**: Car, gas, maintenance
- **Utilities**: Electricity, water, internet
- **Entertainment**: Hobbies, travel
- **Taxes**: Income taxes on withdrawals

**How to estimate**:
- Current expenses as baseline
- Adjust for retirement lifestyle
- Factor in inflation (2-3% per year)
- Healthcare costs (higher in retirement)
- Use retirement calculators

**Rule of thumb**: Need 70-80% of pre-retirement income.

**Key insight**: Estimate retirement costs to determine savings needed.

## Sources of income during retirement

**Income sources**:
1. **Social Security**: Government retirement benefit
2. **Retirement accounts**: 401(k), IRA, pension
3. **Savings and investments**: Personal savings, stocks, bonds
4. **Part-time work**: Continue working if desired
5. **Rental income**: If own rental property
6. **Annuities**: Guaranteed income stream

**Key insight**: Multiple income sources provide security in retirement.

## Sources of retirement income

**Summary of sources**:
- **Social Security**: Base income (may not be enough)
- **401(k)/IRA**: Tax-advantaged savings
- **Pension**: Employer-funded (less common now)
- **Personal savings**: Additional security
- **Investments**: Growth potential
- **Other**: Work, rental, annuities

**Planning**: Diversify income sources for security.

**Key insight**: Multiple income sources reduce reliance on any single source.`,
        importantPoints: [
          'Plan early: longer life, inflation, healthcare',
          'Estimate costs: 70-80% of pre-retirement income',
          'Sources: Social Security, 401(k), savings, investments',
          'Diversify income sources',
          'Healthcare major expense',
        ],
      } as ArticleContent,
      {
        id: 'economics-u14-l2-practice',
        type: 'practice',
        title: 'Practice: Retirement',
        exercises: [
          {
            id: 'practice-14-2-1',
            prompt: 'Why is it important to plan for retirement?',
            hints: [
              'Longer life expectancy',
              'Inflation, healthcare costs',
              'Social Security may not be enough',
            ],
          },
          {
            id: 'practice-14-2-2',
            prompt: 'What are the main costs in retirement? How do you estimate them?',
            hints: [
              'Housing, healthcare, food',
              'Use current expenses as baseline',
              'Factor in inflation',
            ],
          },
          {
            id: 'practice-14-2-3',
            prompt: 'What are sources of income during retirement?',
            hints: [
              'Social Security',
              '401(k), IRA, pension',
              'Savings, investments, work',
            ],
          },
          {
            id: 'practice-14-2-4',
            prompt: 'Why is it important to have multiple income sources in retirement?',
            hints: [
              'Reduces risk',
              'More security',
              'Don\'t rely on single source',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u14-l2-quiz',
        type: 'quiz',
        title: 'Quiz: Planning for retirement',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-14-3',
    title: 'Saving for retirement',
    duration: '35 min',
    contentItems: [
      {
        id: 'economics-u14-l3-video-1',
        type: 'video',
        title: 'Saving for retirement',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'economics-u14-l3-article',
        type: 'article',
        title: 'Learn: Saving for retirement',
        content: `# Saving for retirement

## Social Security intro

**Social Security**: Government retirement program.

**How it works**:
- Workers pay taxes during working years
- Receive benefits in retirement
- Based on earnings history
- Not enough to live on alone

**Key insight**: Social Security provides base income but not full retirement funding.

## What is Social Security?

**Social Security**: Federal program providing retirement, disability, and survivor benefits.

**Funding**: 
- Payroll taxes (FICA)
- Workers and employers contribute
- Current workers pay for current retirees

**Benefits**:
- **Retirement**: Monthly payments starting at age 62-70
- **Disability**: If unable to work
- **Survivor**: For family if worker dies

**Amount**: Based on:
- Earnings history
- Age when start receiving
- Number of years worked

**Full retirement age**: 
- Varies by birth year
- Currently 66-67
- Can start earlier (reduced) or later (increased)

**Key insight**: Social Security is important but not sufficient for full retirement income.`,
        importantPoints: [
          'Social Security: government retirement program',
          'Funded by payroll taxes',
          'Provides retirement, disability, survivor benefits',
          'Amount based on earnings history',
          'Not enough alone, need additional savings',
        ],
      } as ArticleContent,
      {
        id: 'economics-u14-l3-practice',
        type: 'practice',
        title: 'Practice: Social Security',
        exercises: [
          {
            id: 'practice-14-3-1',
            prompt: 'What is Social Security? How does it work?',
            hints: [
              'Government retirement program',
              'Workers pay taxes',
              'Receive benefits in retirement',
            ],
          },
          {
            id: 'practice-14-3-2',
            prompt: 'How is Social Security funded?',
            hints: [
              'Payroll taxes (FICA)',
              'Workers and employers contribute',
              'Current workers pay for retirees',
            ],
          },
          {
            id: 'practice-14-3-3',
            prompt: 'What are the different types of Social Security benefits?',
            hints: [
              'Retirement',
              'Disability',
              'Survivor benefits',
            ],
          },
          {
            id: 'practice-14-3-4',
            prompt: 'What determines Social Security benefit amount?',
            hints: [
              'Earnings history',
              'Age when start receiving',
              'Number of years worked',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u14-l3-quiz',
        type: 'quiz',
        title: 'Quiz: Saving for retirement',
        questions: [],
      } as QuizContent,
    ],
  },
];

const unit15Lessons: Lesson[] = [
  {
    id: 'lesson-15-1',
    title: 'Credit cards',
    duration: '50 min',
    contentItems: [
      {
        id: 'economics-u15-l1-video-1',
        type: 'video',
        title: 'Credit cards',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'economics-u15-l1-article',
        type: 'article',
        title: 'Learn: Credit cards',
        content: `# Credit cards

## What is a credit card?

**Credit card**: Card that allows you to borrow money to make purchases.

**How it works**:
- Make purchases on credit
- Pay back later (with interest if not paid in full)
- Revolving credit (can use repeatedly)
- Credit limit (maximum you can borrow)

**Key terms**:
- **Credit limit**: Maximum amount you can borrow
- **Balance**: Amount you owe
- **Minimum payment**: Smallest payment required
- **Interest rate (APR)**: Cost of borrowing

**Key insight**: Credit cards are convenient but can lead to debt if not used carefully.

## Choosing a credit card: credit card types

**Types of credit cards**:
1. **Standard cards**: Basic credit card
2. **Rewards cards**: Earn points, miles, cash back
3. **Balance transfer cards**: Low rate for transferring debt
4. **Secured cards**: Require deposit (for building credit)
5. **Student cards**: For students (lower limits)
6. **Business cards**: For business expenses

**Key insight**: Different cards serve different needs.

## Choosing a credit card: what to look for

**Factors to consider**:
- **Interest rate (APR)**: Lower is better
- **Annual fee**: Some cards charge yearly fee
- **Rewards**: Points, cash back, miles
- **Credit limit**: How much you can borrow
- **Grace period**: Time to pay without interest
- **Fees**: Late fees, over-limit fees, foreign transaction fees

**Key insight**: Compare features to find best card for your needs.

## Schumer boxes and the things you should know about credit cards

**Schumer box**: Standard format showing credit card terms.

**Required information**:
- Annual Percentage Rate (APR)
- Variable vs. fixed rate
- Grace period
- Fees (annual, late, over-limit)
- Balance calculation method

**Why important**: Helps compare cards and understand costs.

**Key insight**: Schumer box provides standardized way to compare credit cards.

## Understanding credit card terms

**Key terms**:
- **APR**: Annual Percentage Rate (interest rate)
- **Grace period**: Time to pay without interest (usually 21-25 days)
- **Minimum payment**: Smallest payment required (usually 1-3% of balance)
- **Credit limit**: Maximum you can borrow
- **Balance**: Amount you owe
- **Available credit**: Credit limit minus balance

**Key insight**: Understanding terms helps use credit cards wisely.

## Which credit card is better for you?

**Considerations**:
- Your credit score (affects approval and rates)
- How you'll use it (everyday vs. occasional)
- Whether you'll carry balance (interest rate matters)
- Rewards you value (points, cash back, miles)
- Fees you're willing to pay

**Best practices**:
- Pay in full each month (avoid interest)
- Use for convenience, not to borrow
- Compare multiple cards
- Read terms carefully

**Key insight**: Best card depends on your situation and how you'll use it.

## Credit cards: the good and the bad

**The good**:
- Convenience (don't need cash)
- Build credit history
- Rewards (points, cash back)
- Purchase protection
- Emergency backup
- Track spending

**The bad**:
- High interest rates
- Easy to overspend
- Can lead to debt
- Fees add up
- Hurts credit if misused
- Temptation to spend

**Key insight**: Credit cards are tools - use wisely, they help; misuse, they hurt.`,
        importantPoints: [
          'Credit card: borrow money to make purchases',
          'Types: standard, rewards, secured, student',
          'Compare: APR, fees, rewards, grace period',
          'Schumer box: standardized terms',
          'Good: convenience, rewards, build credit',
          'Bad: high rates, debt risk, fees',
        ],
      } as ArticleContent,
      {
        id: 'economics-u15-l1-practice',
        type: 'practice',
        title: 'Practice: Credit cards',
        exercises: [
          {
            id: 'practice-15-1-1',
            prompt: 'What is a credit card? How does it work?',
            hints: [
              'Allows borrowing to make purchases',
              'Pay back later with interest',
              'Revolving credit',
            ],
          },
          {
            id: 'practice-15-1-2',
            prompt: 'What are the different types of credit cards?',
            hints: [
              'Standard, rewards',
              'Balance transfer, secured',
              'Student, business',
            ],
          },
          {
            id: 'practice-15-1-3',
            prompt: 'What should you look for when choosing a credit card?',
            hints: [
              'Interest rate, annual fee',
              'Rewards, credit limit',
              'Grace period, fees',
            ],
          },
          {
            id: 'practice-15-1-4',
            prompt: 'What are the good and bad aspects of credit cards?',
            hints: [
              'Good: convenience, rewards, build credit',
              'Bad: high rates, debt risk',
              'Use wisely',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u15-l1-quiz',
        type: 'quiz',
        title: 'Quiz: Credit cards',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-15-2',
    title: 'Credit score',
    duration: '50 min',
    contentItems: [
      {
        id: 'economics-u15-l2-video-1',
        type: 'video',
        title: 'Credit score',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'economics-u15-l2-article',
        type: 'article',
        title: 'Learn: Credit score',
        content: `# Credit score

## Real world: A Tale of Two Credit Scores

**Story**: Two people with different credit scores face different outcomes.

**High credit score**:
- Lower interest rates
- Easier loan approval
- Better terms
- More financial opportunities

**Low credit score**:
- Higher interest rates
- Harder to get loans
- Worse terms
- Limited options

**Key insight**: Credit score significantly affects financial opportunities.

## What is a credit score?

**Credit score**: Number that represents your creditworthiness (300-850).

**Purpose**: Predicts likelihood you'll repay debt.

**Who calculates**: Credit bureaus (Equifax, Experian, TransUnion).

**Scoring models**: FICO (most common), VantageScore.

**Key insight**: Credit score is measure of credit risk.

## What is a credit score?

**Score ranges**:
- **Excellent**: 750-850
- **Good**: 700-749
- **Fair**: 650-699
- **Poor**: 600-649
- **Very Poor**: Below 600

**What it affects**:
- Loan approval
- Interest rates
- Credit limits
- Insurance rates
- Employment (some jobs)
- Rental applications

**Key insight**: Higher score = better financial opportunities.

## What can change your credit score?

**Factors that affect score**:
1. **Payment history** (35%): On-time payments
2. **Credit utilization** (30%): Amount of credit used
3. **Length of credit history** (15%): How long you've had credit
4. **Credit mix** (10%): Types of credit
5. **New credit** (10%): Recent applications

**What hurts score**:
- Late payments
- High credit utilization
- Defaults, bankruptcies
- Too many new accounts

**What helps score**:
- On-time payments
- Low credit utilization
- Long credit history
- Mix of credit types

**Key insight**: Multiple factors determine credit score.

## How do I raise my credit score?

**Strategies to improve**:
1. **Pay bills on time**: Most important factor
2. **Reduce debt**: Lower credit utilization
3. **Keep old accounts**: Maintain credit history
4. **Don't close accounts**: Hurts credit utilization
5. **Limit new applications**: Too many hurts score
6. **Check credit report**: Fix errors
7. **Use credit responsibly**: Show you can manage debt

**Time**: Improving score takes time (months to years).

**Key insight**: Consistent good behavior improves credit score over time.`,
        importantPoints: [
          'Credit score: 300-850, measures creditworthiness',
          'Factors: payment history (35%), utilization (30%), history (15%)',
          'Higher score: better rates, easier approval',
          'Improve: pay on time, reduce debt, keep old accounts',
          'Takes time to improve',
        ],
      } as ArticleContent,
      {
        id: 'economics-u15-l2-practice',
        type: 'practice',
        title: 'Practice: Understanding credit score',
        exercises: [
          {
            id: 'practice-15-2-1',
            prompt: 'What is a credit score? Why is it important?',
            hints: [
              'Number representing creditworthiness',
              '300-850 range',
              'Affects loans, rates, opportunities',
            ],
          },
          {
            id: 'practice-15-2-2',
            prompt: 'What are the different credit score ranges?',
            hints: [
              'Excellent: 750-850',
              'Good: 700-749',
              'Fair, Poor, Very Poor',
            ],
          },
          {
            id: 'practice-15-2-3',
            prompt: 'How do you raise your credit score?',
            hints: [
              'Pay bills on time',
              'Reduce debt, keep old accounts',
              'Limit new applications',
            ],
          },
          {
            id: 'practice-15-2-4',
            prompt: 'What affects your credit score?',
            hints: [
              'Payment history',
              'Credit utilization',
              'Length of history, credit mix',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u15-l2-practice-2',
        type: 'practice',
        title: 'Practice: Factors that affect a credit score',
        exercises: [
          {
            id: 'practice-15-2-5',
            prompt: 'What are the five main factors that determine credit score?',
            hints: [
              'Payment history (35%)',
              'Credit utilization (30%)',
              'Length of history (15%), mix (10%), new credit (10%)',
            ],
          },
          {
            id: 'practice-15-2-6',
            prompt: 'What hurts your credit score?',
            hints: [
              'Late payments',
              'High credit utilization',
              'Defaults, too many new accounts',
            ],
          },
          {
            id: 'practice-15-2-7',
            prompt: 'What helps your credit score?',
            hints: [
              'On-time payments',
              'Low credit utilization',
              'Long credit history',
            ],
          },
          {
            id: 'practice-15-2-8',
            prompt: 'Why does credit score matter in real life?',
            hints: [
              'Affects loan approval',
              'Interest rates',
              'Financial opportunities',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u15-l2-quiz',
        type: 'quiz',
        title: 'Quiz: Credit score',
        questions: [],
      } as QuizContent,
    ],
  },
];

const unit16Lessons: Lesson[] = [
  {
    id: 'lesson-16-1',
    title: 'Terms of borrowing',
    duration: '30 min',
    contentItems: [
      {
        id: 'economics-u16-l1-video-1',
        type: 'video',
        title: 'Terms of borrowing',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'economics-u16-l1-article',
        type: 'article',
        title: 'Learn: Terms of borrowing',
        content: `# Terms of borrowing

## Credit 101: What is APR and why does it matter?

**APR**: Annual Percentage Rate - total cost of borrowing per year.

**What it includes**:
- Interest rate
- Fees
- Other costs

**Why it matters**:
- Shows true cost of borrowing
- Allows comparison of loans
- Affects total amount you pay
- Lower APR = less cost

**Key insight**: APR shows true cost of borrowing, not just interest rate.

## What is APR and why does it matter?

**APR calculation**: 
- Includes interest and fees
- Expressed as annual percentage
- Standardized way to compare loans

**Fixed vs. variable APR**:
- **Fixed**: Stays same over loan term
- **Variable**: Can change over time

**How it affects you**:
- Higher APR = More you pay
- Lower APR = Less you pay
- Small difference adds up over time

**Example**: 
- $10,000 loan at 5% APR vs. 10% APR
- 5%: Pay $5,000 in interest over 10 years
- 10%: Pay $10,000 in interest over 10 years
- Double the cost!

**Key insight**: APR significantly affects total cost of borrowing.`,
        importantPoints: [
          'APR: Annual Percentage Rate',
          'Includes interest and fees',
          'Shows true cost of borrowing',
          'Allows comparison of loans',
          'Lower APR = less cost',
        ],
      } as ArticleContent,
      {
        id: 'economics-u16-l1-practice',
        type: 'practice',
        title: 'Practice: APR',
        exercises: [
          {
            id: 'practice-16-1-1',
            prompt: 'What is APR? What does it include?',
            hints: [
              'Annual Percentage Rate',
              'Interest and fees',
              'Total cost of borrowing',
            ],
          },
          {
            id: 'practice-16-1-2',
            prompt: 'Why does APR matter?',
            hints: [
              'Shows true cost',
              'Allows comparison',
              'Affects total amount paid',
            ],
          },
          {
            id: 'practice-16-1-3',
            prompt: 'What is the difference between fixed and variable APR?',
            hints: [
              'Fixed: stays same',
              'Variable: can change',
              'Affects predictability',
            ],
          },
          {
            id: 'practice-16-1-4',
            prompt: 'How does APR affect the total cost of a loan?',
            hints: [
              'Higher APR = more cost',
              'Lower APR = less cost',
              'Small difference adds up',
            ],
          },
          {
            id: 'practice-16-1-5',
            prompt: 'Why is it important to compare APRs when shopping for loans?',
            hints: [
              'Shows true cost',
              'Can save money',
              'Standardized comparison',
            ],
          },
          {
            id: 'practice-16-1-6',
            prompt: 'Give an example of how APR affects loan cost.',
            hints: [
              'Same loan, different APRs',
              'Calculate total interest',
              'Show difference',
            ],
          },
          {
            id: 'practice-16-1-7',
            prompt: 'What should you look for in APR when borrowing?',
            hints: [
              'Lower is better',
              'Compare multiple offers',
              'Consider fixed vs. variable',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u16-l1-quiz',
        type: 'quiz',
        title: 'Quiz: Terms of borrowing',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-16-2',
    title: 'Borrowing money',
    duration: '60 min',
    contentItems: [
      {
        id: 'economics-u16-l2-video-1',
        type: 'video',
        title: 'Borrowing money',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'economics-u16-l2-article',
        type: 'article',
        title: 'Learn: Borrowing money',
        content: `# Borrowing money

## Sources of loans/credit

**Sources**:
1. **Banks**: Traditional lenders
   - Lower rates
   - Strict requirements
   - Longer process

2. **Credit unions**: Member-owned
   - Often lower rates
   - More flexible
   - Membership required

3. **Online lenders**: Internet-based
   - Fast approval
   - Competitive rates
   - Less personal service

4. **Credit cards**: Revolving credit
   - Easy to get
   - Higher rates
   - Convenient

5. **Payday lenders**: Short-term, high-cost
   - Very high rates
   - Quick access
   - Risky

6. **Family/friends**: Personal loans
   - Flexible terms
   - May strain relationships

**Key insight**: Different sources have different rates, terms, and requirements.

## Loans and credit

**Loan**: Borrowed money that must be repaid with interest.

**Types**:
- **Personal loans**: Unsecured, various purposes
- **Auto loans**: Secured by car
- **Mortgages**: Secured by home
- **Student loans**: For education
- **Home equity loans**: Secured by home equity

**Credit**: Ability to borrow money.

**Key insight**: Loans and credit provide access to money but must be repaid.

## How do I get a loan?

**Steps**:
1. **Check credit score**: Know your creditworthiness
2. **Shop around**: Compare lenders and rates
3. **Gather documents**: Income, employment, assets
4. **Apply**: Submit application
5. **Review offer**: Understand terms
6. **Accept or negotiate**: Get best terms possible
7. **Sign agreement**: Legally binding contract

**Key insight**: Process involves research, application, and negotiation.

## Qualifications needed to get a loan

**Lender requirements**:
- **Credit score**: Minimum score (varies by lender)
- **Income**: Proof of ability to repay
- **Employment**: Stable job history
- **Debt-to-income ratio**: Total debt vs. income
- **Collateral**: For secured loans
- **Down payment**: For some loans (mortgage, car)

**Key insight**: Lenders assess ability and willingness to repay.

## Predatory lending

**Predatory lending**: Unfair, deceptive, or abusive lending practices.

**Warning signs**:
- Very high interest rates
- Pressure to borrow
- Hidden fees
- Unclear terms
- No credit check required
- Balloon payments
- Prepayment penalties

**Examples**: Payday loans, car title loans, some subprime mortgages.

**Protection**: 
- Read all terms
- Compare offers
- Avoid high-pressure tactics
- Know your rights

**Key insight**: Be aware of predatory lending and protect yourself.

## Consumer loan laws

**Laws protect borrowers**:
- **Truth in Lending Act**: Requires disclosure of terms
- **Fair Credit Reporting Act**: Regulates credit reports
- **Equal Credit Opportunity Act**: Prevents discrimination
- **Fair Debt Collection Practices Act**: Regulates debt collection

**Key insight**: Laws protect consumers from unfair lending practices.

## Understanding your rights: Credit and loan laws

**Your rights**:
- Receive clear disclosure of terms
- Access to credit report
- Protection from discrimination
- Fair debt collection
- Right to dispute errors
- Privacy protection

**Key insight**: Know your rights as borrower and consumer.`,
        importantPoints: [
          'Sources: banks, credit unions, online, credit cards',
          'Process: check credit, shop, apply, review, accept',
          'Requirements: credit score, income, employment',
          'Predatory lending: unfair practices, warning signs',
          'Consumer laws: protect borrowers',
          'Know your rights',
        ],
      } as ArticleContent,
      {
        id: 'economics-u16-l2-practice',
        type: 'practice',
        title: 'Practice: Credit and sources',
        exercises: [
          {
            id: 'practice-16-2-1',
            prompt: 'What are the different sources of loans and credit?',
            hints: [
              'Banks, credit unions',
              'Online lenders, credit cards',
              'Payday lenders, family',
            ],
          },
          {
            id: 'practice-16-2-2',
            prompt: 'How do you get a loan? What are the steps?',
            hints: [
              'Check credit score',
              'Shop around, gather documents',
              'Apply, review, accept',
            ],
          },
          {
            id: 'practice-16-2-3',
            prompt: 'What qualifications are needed to get a loan?',
            hints: [
              'Credit score, income',
              'Employment, debt-to-income',
              'Collateral, down payment',
            ],
          },
          {
            id: 'practice-16-2-4',
            prompt: 'What are the different types of loans?',
            hints: [
              'Personal, auto',
              'Mortgage, student',
              'Home equity',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u16-l2-practice-2',
        type: 'practice',
        title: 'Practice: Loan requirements',
        exercises: [
          {
            id: 'practice-16-2-5',
            prompt: 'What do lenders look for when evaluating loan applications?',
            hints: [
              'Credit score',
              'Income, employment',
              'Debt-to-income ratio',
            ],
          },
          {
            id: 'practice-16-2-6',
            prompt: 'Why is credit score important for getting a loan?',
            hints: [
              'Shows creditworthiness',
              'Affects approval',
              'Affects interest rate',
            ],
          },
          {
            id: 'practice-16-2-7',
            prompt: 'What is debt-to-income ratio? Why does it matter?',
            hints: [
              'Total debt vs. income',
              'Shows ability to repay',
              'Lenders use to evaluate',
            ],
          },
          {
            id: 'practice-16-2-8',
            prompt: 'How can you improve your chances of getting a loan?',
            hints: [
              'Improve credit score',
              'Reduce debt',
              'Stable income, employment',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u16-l2-practice-3',
        type: 'practice',
        title: 'Practice: Predatory lending',
        exercises: [
          {
            id: 'practice-16-2-9',
            prompt: 'What is predatory lending?',
            hints: [
              'Unfair, deceptive practices',
              'Very high rates',
              'Hidden fees',
            ],
          },
          {
            id: 'practice-16-2-10',
            prompt: 'What are warning signs of predatory lending?',
            hints: [
              'Very high rates',
              'Pressure to borrow',
              'Hidden fees, unclear terms',
            ],
          },
          {
            id: 'practice-16-2-11',
            prompt: 'How can you protect yourself from predatory lending?',
            hints: [
              'Read all terms',
              'Compare offers',
              'Avoid high-pressure tactics',
            ],
          },
          {
            id: 'practice-16-2-12',
            prompt: 'What are examples of predatory lending?',
            hints: [
              'Payday loans',
              'Car title loans',
              'Some subprime mortgages',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u16-l2-practice-4',
        type: 'practice',
        title: 'Practice: Consumer laws',
        exercises: [
          {
            id: 'practice-16-2-13',
            prompt: 'What consumer loan laws protect borrowers?',
            hints: [
              'Truth in Lending Act',
              'Fair Credit Reporting Act',
              'Equal Credit Opportunity Act',
            ],
          },
          {
            id: 'practice-16-2-14',
            prompt: 'What are your rights as a borrower?',
            hints: [
              'Clear disclosure of terms',
              'Access to credit report',
              'Protection from discrimination',
            ],
          },
          {
            id: 'practice-16-2-15',
            prompt: 'Why is it important to know your rights?',
            hints: [
              'Protect yourself',
              'Avoid unfair practices',
              'Dispute errors',
            ],
          },
          {
            id: 'practice-16-2-16',
            prompt: 'What should you do if you think your rights have been violated?',
            hints: [
              'Document everything',
              'File complaint',
              'Contact consumer protection agency',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u16-l2-quiz',
        type: 'quiz',
        title: 'Quiz: Borrowing money',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-16-3',
    title: 'Types of loans',
    duration: '30 min',
    contentItems: [
      {
        id: 'economics-u16-l3-video-1',
        type: 'video',
        title: 'Types of loans',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'economics-u16-l3-article',
        type: 'article',
        title: 'Learn: Types of loans',
        content: `# Types of loans

## Secured and unsecured credit

**Secured credit**: Backed by collateral (asset).

**Characteristics**:
- Lower interest rates
- Easier to get
- Asset can be repossessed if default
- Examples: Mortgage, car loan

**Unsecured credit**: Not backed by collateral.

**Characteristics**:
- Higher interest rates
- Harder to get
- No asset to repossess
- Examples: Credit cards, personal loans

**Key insight**: Secured loans have lower rates but require collateral.

## Secured vs unsecured credit: What is the difference?

**Secured credit**:
- **Collateral required**: Asset secures loan
- **Lower risk for lender**: Can take asset if default
- **Lower rates**: Better terms
- **Examples**: Mortgage (house), auto loan (car)

**Unsecured credit**:
- **No collateral**: Based on creditworthiness
- **Higher risk for lender**: No asset to take
- **Higher rates**: More expensive
- **Examples**: Credit cards, personal loans

**Key insight**: Secured loans are less risky for lenders, so they offer better terms.`,
        importantPoints: [
          'Secured: backed by collateral, lower rates',
          'Unsecured: no collateral, higher rates',
          'Secured: easier to get, asset at risk',
          'Unsecured: harder to get, no asset at risk',
        ],
      } as ArticleContent,
      {
        id: 'economics-u16-l3-practice',
        type: 'practice',
        title: 'Practice: Secured vs unsecured credit',
        exercises: [
          {
            id: 'practice-16-3-1',
            prompt: 'What is secured credit? Give examples.',
            hints: [
              'Backed by collateral',
              'Lower rates',
              'Mortgage, car loan',
            ],
          },
          {
            id: 'practice-16-3-2',
            prompt: 'What is unsecured credit? Give examples.',
            hints: [
              'Not backed by collateral',
              'Higher rates',
              'Credit cards, personal loans',
            ],
          },
          {
            id: 'practice-16-3-3',
            prompt: 'What is the difference between secured and unsecured credit?',
            hints: [
              'Secured: collateral, lower rates',
              'Unsecured: no collateral, higher rates',
              'Different risk levels',
            ],
          },
          {
            id: 'practice-16-3-4',
            prompt: 'Why do secured loans have lower interest rates?',
            hints: [
              'Less risk for lender',
              'Can take asset if default',
              'Collateral provides security',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u16-l3-quiz',
        type: 'quiz',
        title: 'Quiz: Types of loans',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-16-4',
    title: 'Debt',
    duration: '60 min',
    contentItems: [
      {
        id: 'economics-u16-l4-video-1',
        type: 'video',
        title: 'Debt',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'economics-u16-l4-article',
        type: 'article',
        title: 'Learn: Debt',
        content: `# Debt

## High rate vs snowball method

**High rate method**: Pay off highest interest rate debt first.

**How it works**:
- Make minimum payments on all debts
- Put extra money toward highest rate debt
- Once paid off, move to next highest
- Saves most money on interest

**Snowball method**: Pay off smallest debt first.

**How it works**:
- Make minimum payments on all debts
- Put extra money toward smallest debt
- Once paid off, move to next smallest
- Provides psychological wins

**Which is better**:
- **High rate**: Saves more money (mathematically better)
- **Snowball**: Provides motivation (psychologically better)
- Choose based on what works for you

**Key insight**: Both methods work; choose based on your needs.

## Debt and debt repayment

**Debt**: Money you owe.

**Types**:
- **Good debt**: Invests in future (education, home)
- **Bad debt**: Consumes (credit cards, payday loans)

**Debt repayment strategies**:
- Pay more than minimum
- Focus on one debt at a time
- Consider consolidation
- Negotiate lower rates
- Stop adding new debt

**Key insight**: Managing debt requires strategy and discipline.

## Debt payoff

**Payoff strategies**:
1. **List all debts**: Know what you owe
2. **Prioritize**: Choose method (high rate or snowball)
3. **Budget**: Allocate extra money
4. **Stick to plan**: Be consistent
5. **Track progress**: Stay motivated

**Key insight**: Systematic approach helps pay off debt.

## Amortization schedules and time to pay off

**Amortization schedule**: Table showing loan payments over time.

**Shows**:
- Payment amount
- Principal vs. interest
- Remaining balance
- Time to pay off

**Factors affecting payoff time**:
- Payment amount
- Interest rate
- Loan amount
- Extra payments

**Key insight**: Amortization schedule shows how payments reduce debt over time.

## Debt management

**Debt management strategies**:
- **Budget**: Control spending
- **Prioritize**: Pay high-rate debt first
- **Consolidate**: Combine debts (if beneficial)
- **Negotiate**: Lower rates or payments
- **Seek help**: Credit counseling if needed
- **Avoid new debt**: Stop borrowing

**Warning signs**:
- Can't make minimum payments
- Using credit to pay bills
- Skipping payments
- Stress about debt

**Key insight**: Proactive debt management prevents problems.`,
        importantPoints: [
          'High rate method: pay highest rate first, saves money',
          'Snowball method: pay smallest first, provides motivation',
          'Debt repayment: systematic approach',
          'Amortization: shows payment schedule',
          'Debt management: budget, prioritize, avoid new debt',
        ],
      } as ArticleContent,
      {
        id: 'economics-u16-l4-practice',
        type: 'practice',
        title: 'Practice: Debt repayment',
        exercises: [
          {
            id: 'practice-16-4-1',
            prompt: 'What is the difference between high rate and snowball methods?',
            hints: [
              'High rate: highest rate first',
              'Snowball: smallest first',
              'Different strategies',
            ],
          },
          {
            id: 'practice-16-4-2',
            prompt: 'What are strategies for paying off debt?',
            hints: [
              'Pay more than minimum',
              'Focus on one debt',
              'Consider consolidation',
            ],
          },
          {
            id: 'practice-16-4-3',
            prompt: 'What is an amortization schedule?',
            hints: [
              'Table showing payments',
              'Principal vs. interest',
              'Time to pay off',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u16-l4-practice-2',
        type: 'practice',
        title: 'Practice: Debt payoff',
        exercises: [
          {
            id: 'practice-16-4-4',
            prompt: 'How do you create a debt payoff plan?',
            hints: [
              'List all debts',
              'Choose method',
              'Budget, track progress',
            ],
          },
          {
            id: 'practice-16-4-5',
            prompt: 'What factors affect how long it takes to pay off debt?',
            hints: [
              'Payment amount',
              'Interest rate',
              'Loan amount, extra payments',
            ],
          },
          {
            id: 'practice-16-4-6',
            prompt: 'When should you use high rate vs. snowball method?',
            hints: [
              'High rate: save money',
              'Snowball: motivation',
              'Choose what works',
            ],
          },
          {
            id: 'practice-16-4-7',
            prompt: 'How can extra payments help pay off debt faster?',
            hints: [
              'Reduces principal',
              'Less interest',
              'Faster payoff',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u16-l4-practice-3',
        type: 'practice',
        title: 'Practice: Debt management',
        exercises: [
          {
            id: 'practice-16-4-8',
            prompt: 'What are debt management strategies?',
            hints: [
              'Budget, prioritize',
              'Consolidate, negotiate',
              'Avoid new debt',
            ],
          },
          {
            id: 'practice-16-4-9',
            prompt: 'What are warning signs of debt problems?',
            hints: [
              'Can\'t make payments',
              'Using credit to pay bills',
              'Stress about debt',
            ],
          },
          {
            id: 'practice-16-4-10',
            prompt: 'When should you seek help with debt?',
            hints: [
              'Can\'t make payments',
              'Overwhelmed',
              'Need professional help',
            ],
          },
          {
            id: 'practice-16-4-11',
            prompt: 'What is the difference between good and bad debt?',
            hints: [
              'Good: invests in future',
              'Bad: consumes',
              'Examples',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u16-l4-quiz',
        type: 'quiz',
        title: 'Quiz: Debt',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-16-5',
    title: 'Bankruptcy',
    duration: '35 min',
    contentItems: [
      {
        id: 'economics-u16-l5-video-1',
        type: 'video',
        title: 'Bankruptcy',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'economics-u16-l5-article',
        type: 'article',
        title: 'Learn: Bankruptcy',
        content: `# Bankruptcy

## Personal bankruptcy: Chapters 7 and 13

**Bankruptcy**: Legal process to eliminate or restructure debt.

**Chapter 7**: Liquidation bankruptcy.
- **Process**: Sell assets to pay creditors
- **Eligibility**: Must pass means test
- **Result**: Most debts discharged (eliminated)
- **Timeline**: Usually 3-6 months
- **Assets**: May lose property (exemptions apply)

**Chapter 13**: Reorganization bankruptcy.
- **Process**: Repay debts over 3-5 years
- **Eligibility**: Have regular income
- **Result**: Keep assets, repay portion of debt
- **Timeline**: 3-5 year repayment plan
- **Assets**: Keep property

**Key insight**: Bankruptcy is last resort but provides fresh start.

## Bankruptcy

**When to consider**:
- Overwhelming debt
- Can't make payments
- Creditors suing
- Wage garnishment
- No other options

**Consequences**:
- **Credit**: Stays on report 7-10 years
- **Future borrowing**: Very difficult
- **Employment**: Some jobs affected
- **Assets**: May lose property
- **Cost**: Legal fees

**Alternatives**:
- Debt consolidation
- Debt settlement
- Credit counseling
- Negotiate with creditors

**Key insight**: Bankruptcy has serious consequences; consider all options first.`,
        importantPoints: [
          'Bankruptcy: legal process to eliminate/restructure debt',
          'Chapter 7: liquidation, discharge debts',
          'Chapter 13: reorganization, repay over time',
          'Serious consequences: credit, future borrowing',
          'Last resort, consider alternatives first',
        ],
      } as ArticleContent,
      {
        id: 'economics-u16-l5-practice',
        type: 'practice',
        title: 'Practice: Bankruptcy',
        exercises: [
          {
            id: 'practice-16-5-1',
            prompt: 'What is bankruptcy? What are the two main types?',
            hints: [
              'Legal process to eliminate debt',
              'Chapter 7: liquidation',
              'Chapter 13: reorganization',
            ],
          },
          {
            id: 'practice-16-5-2',
            prompt: 'What is the difference between Chapter 7 and Chapter 13?',
            hints: [
              'Chapter 7: sell assets, discharge debts',
              'Chapter 13: keep assets, repay over time',
              'Different processes',
            ],
          },
          {
            id: 'practice-16-5-3',
            prompt: 'What are the consequences of bankruptcy?',
            hints: [
              'Stays on credit report 7-10 years',
              'Difficult to borrow',
              'May lose assets',
            ],
          },
          {
            id: 'practice-16-5-4',
            prompt: 'What are alternatives to bankruptcy?',
            hints: [
              'Debt consolidation',
              'Debt settlement',
              'Credit counseling',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u16-l5-quiz',
        type: 'quiz',
        title: 'Quiz: Bankruptcy',
        questions: [],
      } as QuizContent,
    ],
  },
];

const unit17Lessons: Lesson[] = [
  {
    id: 'lesson-17-1',
    title: 'What are taxes and why do we pay them',
    duration: '30 min',
    contentItems: [
      {
        id: 'economics-u17-l1-video-1',
        type: 'video',
        title: 'What are taxes and why do we pay them',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'economics-u17-l1-article',
        type: 'article',
        title: 'Learn: What are taxes and why do we pay them',
        content: `# What are taxes and why do we pay them

## Taxes intro

**Taxes**: Money paid to government.

**Purpose**: Fund government services and programs.

**What taxes pay for**:
- Infrastructure (roads, bridges)
- Education (schools, universities)
- Healthcare (Medicare, Medicaid)
- Defense (military)
- Social programs (Social Security, welfare)
- Public safety (police, fire)
- Other government services

**Key insight**: Taxes fund essential government services.

## How taxes work

**Tax collection**:
- Collected by government (federal, state, local)
- Based on income, purchases, property
- Required by law
- Penalties for not paying

**Types of taxes**:
- **Income tax**: On earnings
- **Sales tax**: On purchases
- **Property tax**: On property value
- **Payroll tax**: On wages (Social Security, Medicare)

**Key insight**: Different taxes fund different government functions.`,
        importantPoints: [
          'Taxes: money paid to government',
          'Fund government services',
          'Types: income, sales, property, payroll',
          'Required by law',
        ],
      } as ArticleContent,
      {
        id: 'economics-u17-l1-practice',
        type: 'practice',
        title: 'Practice: Taxes',
        exercises: [
          {
            id: 'practice-17-1-1',
            prompt: 'What are taxes? Why do we pay them?',
            hints: [
              'Money paid to government',
              'Fund government services',
              'Required by law',
            ],
          },
          {
            id: 'practice-17-1-2',
            prompt: 'What do taxes pay for?',
            hints: [
              'Infrastructure, education',
              'Healthcare, defense',
              'Social programs, public safety',
            ],
          },
          {
            id: 'practice-17-1-3',
            prompt: 'What are the different types of taxes?',
            hints: [
              'Income tax',
              'Sales tax, property tax',
              'Payroll tax',
            ],
          },
          {
            id: 'practice-17-1-4',
            prompt: 'How do taxes work?',
            hints: [
              'Collected by government',
              'Based on income, purchases, property',
              'Required by law',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u17-l1-quiz',
        type: 'quiz',
        title: 'Quiz: What are taxes and why do we pay them',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-17-2',
    title: 'Local taxes',
    duration: '35 min',
    contentItems: [
      {
        id: 'economics-u17-l2-video-1',
        type: 'video',
        title: 'Local taxes',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'economics-u17-l2-article',
        type: 'article',
        title: 'Learn: Local taxes',
        content: `# Local taxes

## Local taxes

**Local taxes**: Taxes collected by local governments (cities, counties, school districts).

**Types**:
- **Property tax**: On real estate
- **Sales tax**: On purchases (varies by location)
- **Income tax**: Some cities have local income tax
- **Utility taxes**: On utilities
- **Business taxes**: On local businesses

**What they fund**:
- Schools
- Police and fire departments
- Local infrastructure
- Parks and recreation
- Local government services

**Key insight**: Local taxes fund local services and infrastructure.

## Calculating sales tax

**Sales tax**: Tax on purchases.

**How to calculate**:
- Tax rate × Purchase price = Tax amount
- Purchase price + Tax = Total cost

**Example**:
- Item: $100
- Tax rate: 8%
- Tax: $100 × 0.08 = $8
- Total: $100 + $8 = $108

**Varies by location**: Different states, cities have different rates.

**Key insight**: Sales tax adds to purchase price.

## Calculating property tax

**Property tax**: Tax on real estate value.

**How to calculate**:
- Assessed value × Tax rate = Annual tax

**Example**:
- Home value: $200,000
- Assessed value: $180,000 (90% of value)
- Tax rate: 1.5%
- Annual tax: $180,000 × 0.015 = $2,700

**Factors**:
- Property value
- Assessment rate
- Tax rate (millage rate)
- Exemptions

**Key insight**: Property tax based on assessed property value.`,
        importantPoints: [
          'Local taxes: collected by local governments',
          'Types: property, sales, income, utility',
          'Sales tax: rate × price',
          'Property tax: assessed value × rate',
          'Fund local services',
        ],
      } as ArticleContent,
      {
        id: 'economics-u17-l2-practice',
        type: 'practice',
        title: 'Practice: Calculating local taxes',
        exercises: [
          {
            id: 'practice-17-2-1',
            prompt: 'What are local taxes? What do they fund?',
            hints: [
              'Collected by local governments',
              'Property, sales, income taxes',
              'Fund local services',
            ],
          },
          {
            id: 'practice-17-2-2',
            prompt: 'How do you calculate sales tax?',
            hints: [
              'Tax rate × purchase price',
              'Add to purchase price',
              'Varies by location',
            ],
          },
          {
            id: 'practice-17-2-3',
            prompt: 'How do you calculate property tax?',
            hints: [
              'Assessed value × tax rate',
              'Based on property value',
              'Annual amount',
            ],
          },
          {
            id: 'practice-17-2-4',
            prompt: 'Give examples of calculating sales and property taxes.',
            hints: [
              'Sales: rate × price',
              'Property: assessed × rate',
              'Show calculations',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u17-l2-quiz',
        type: 'quiz',
        title: 'Quiz: Local taxes',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-17-3',
    title: 'Tax forms',
    duration: '50 min',
    contentItems: [
      {
        id: 'economics-u17-l3-video-1',
        type: 'video',
        title: 'Tax forms',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'economics-u17-l3-article',
        type: 'article',
        title: 'Learn: Tax forms',
        content: `# Tax forms

## What are tax forms? (Part 1)

**Tax forms**: Documents used to file taxes and report income.

**Purpose**: 
- Report income
- Calculate taxes owed
- Claim deductions and credits
- File with IRS

**Common forms**:
- **1040**: Main individual tax return
- **W-2**: Wage and tax statement from employer
- **1099**: Income from other sources
- **Schedule A**: Itemized deductions
- **Schedule B**: Interest and dividends

**Key insight**: Tax forms are required to file taxes.

## What are tax forms? (Part 2)

**More forms**:
- **Schedule C**: Business income
- **Schedule D**: Capital gains and losses
- **Schedule E**: Rental income
- **Form 8863**: Education credits
- **Form 8880**: Retirement savings credit

**When to file**: Usually by April 15 (can extend).

**Key insight**: Different forms for different types of income and deductions.

## Tax forms

**Summary**: 
- Forms report income and expenses
- Calculate tax liability
- Claim credits and deductions
- File with tax authorities

**Key insight**: Understanding forms helps file taxes correctly.

## Key tax terms

**Important terms**:
- **Gross income**: Total income before deductions
- **Adjusted gross income (AGI)**: Income after certain deductions
- **Taxable income**: AGI minus deductions and exemptions
- **Deductions**: Reduce taxable income
- **Credits**: Reduce tax owed (dollar for dollar)
- **Withholding**: Taxes taken from paycheck
- **Refund**: Money returned if overpaid

**Key insight**: Understanding terms helps understand taxes.

## Your guide to key tax terms

**More terms**:
- **Standard deduction**: Fixed deduction amount
- **Itemized deductions**: List specific deductions
- **Exemptions**: Reduce taxable income (phased out)
- **Tax bracket**: Income range with specific tax rate
- **Marginal tax rate**: Rate on last dollar earned
- **Effective tax rate**: Average rate paid

**Key insight**: Tax terminology is important for understanding your taxes.

## Intro to the W-2 form

**W-2**: Wage and Tax Statement.

**Who receives**: Employees from employers.

**When**: By January 31.

**Contains**:
- Wages earned
- Taxes withheld (federal, state, local)
- Social Security and Medicare taxes
- Other information

**Key insight**: W-2 shows income and taxes withheld for the year.

## How to read a W-2 form

**W-2 boxes**:
- **Box 1**: Wages, tips, other compensation
- **Box 2**: Federal income tax withheld
- **Box 3**: Social Security wages
- **Box 4**: Social Security tax withheld
- **Box 5**: Medicare wages
- **Box 6**: Medicare tax withheld
- **Box 7**: Social Security tips
- **Box 8**: Allocated tips
- **Box 12**: Other compensation
- **Box 17**: State income tax withheld

**Key insight**: Each box on W-2 provides specific tax information.`,
        importantPoints: [
          'Tax forms: documents to file taxes',
          'Common: 1040, W-2, 1099',
          'Key terms: AGI, deductions, credits',
          'W-2: wage and tax statement',
          'Different boxes show different information',
        ],
      } as ArticleContent,
      {
        id: 'economics-u17-l3-practice',
        type: 'practice',
        title: 'Practice: Tax forms and tax terms',
        exercises: [
          {
            id: 'practice-17-3-1',
            prompt: 'What are tax forms? What are common forms?',
            hints: [
              'Documents to file taxes',
              '1040, W-2, 1099',
              'Report income, calculate taxes',
            ],
          },
          {
            id: 'practice-17-3-2',
            prompt: 'What are key tax terms? Explain each.',
            hints: [
              'Gross income, AGI',
              'Deductions, credits',
              'Withholding, refund',
            ],
          },
          {
            id: 'practice-17-3-3',
            prompt: 'What is the difference between deductions and credits?',
            hints: [
              'Deductions: reduce taxable income',
              'Credits: reduce tax owed',
              'Credits more valuable',
            ],
          },
          {
            id: 'practice-17-3-4',
            prompt: 'What is standard vs. itemized deduction?',
            hints: [
              'Standard: fixed amount',
              'Itemized: list specific',
              'Choose one',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u17-l3-practice-2',
        type: 'practice',
        title: 'Practice: W-2 form',
        exercises: [
          {
            id: 'practice-17-3-5',
            prompt: 'What is a W-2 form? What does it contain?',
            hints: [
              'Wage and tax statement',
              'Wages, taxes withheld',
              'From employer',
            ],
          },
          {
            id: 'practice-17-3-6',
            prompt: 'How do you read a W-2 form? What do the boxes mean?',
            hints: [
              'Box 1: wages',
              'Box 2: federal tax withheld',
              'Box 3-6: Social Security, Medicare',
            ],
          },
          {
            id: 'practice-17-3-7',
            prompt: 'When do you receive a W-2?',
            hints: [
              'By January 31',
              'From employer',
              'For previous year',
            ],
          },
          {
            id: 'practice-17-3-8',
            prompt: 'Why is the W-2 form important?',
            hints: [
              'Shows income',
              'Shows taxes withheld',
              'Needed to file taxes',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u17-l3-quiz',
        type: 'quiz',
        title: 'Quiz: Tax forms',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-17-4',
    title: 'Personal taxes',
    duration: '35 min',
    contentItems: [
      {
        id: 'economics-u17-l4-video-1',
        type: 'video',
        title: 'Personal taxes',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'economics-u17-l4-article',
        type: 'article',
        title: 'Learn: Personal taxes',
        content: `# Personal taxes

## Tax brackets and progressive taxation

**Progressive taxation**: Tax rate increases as income increases.

**How it works**:
- Lower income: Lower tax rate
- Higher income: Higher tax rate
- Different rates for different income levels

**Tax brackets**: Income ranges with specific tax rates.

**Example** (simplified):
- 0-$10,000: 10%
- $10,001-$40,000: 15%
- $40,001+: 25%

**Key insight**: Progressive system means higher earners pay higher rates.

## What are tax brackets?

**Tax brackets**: Income ranges taxed at different rates.

**How they work**:
- Not all income taxed at same rate
- Each bracket taxed at its rate
- Only income in bracket taxed at that rate

**Example**:
- Income: $50,000
- First $10,000: 10% = $1,000
- Next $30,000: 15% = $4,500
- Remaining $10,000: 25% = $2,500
- Total tax: $8,000

**Marginal vs. effective rate**:
- **Marginal**: Rate on last dollar (top bracket)
- **Effective**: Average rate (total tax ÷ income)

**Key insight**: Understanding brackets helps understand how much tax you pay.`,
        importantPoints: [
          'Progressive taxation: rate increases with income',
          'Tax brackets: income ranges with different rates',
          'Not all income taxed at same rate',
          'Marginal rate: rate on last dollar',
          'Effective rate: average rate',
        ],
      } as ArticleContent,
      {
        id: 'economics-u17-l4-practice',
        type: 'practice',
        title: 'Practice: Progressive taxation and tax brackets',
        exercises: [
          {
            id: 'practice-17-4-1',
            prompt: 'What is progressive taxation? How does it work?',
            hints: [
              'Rate increases with income',
              'Lower income: lower rate',
              'Higher income: higher rate',
            ],
          },
          {
            id: 'practice-17-4-2',
            prompt: 'What are tax brackets? How do they work?',
            hints: [
              'Income ranges with different rates',
              'Each bracket taxed at its rate',
              'Not all income at same rate',
            ],
          },
          {
            id: 'practice-17-4-3',
            prompt: 'What is the difference between marginal and effective tax rate?',
            hints: [
              'Marginal: rate on last dollar',
              'Effective: average rate',
              'Different calculations',
            ],
          },
          {
            id: 'practice-17-4-4',
            prompt: 'How do you calculate taxes using tax brackets?',
            hints: [
              'Calculate tax for each bracket',
              'Sum all bracket taxes',
              'Show example',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'economics-u17-l4-quiz',
        type: 'quiz',
        title: 'Quiz: Personal taxes',
        questions: [],
      } as QuizContent,
    ],
  },
];

export const economicsPersonalFinanceCourse: Course = {
  id: 'economics-personal-finance',
  title: 'Economics & Personal Finance',
  description: 'Understanding personal finance through economic principles',
  finalExamPassRate: 75,
  units: [
    {
      id: 'unit-1',
      title: 'Unit 1: Foundations of economics',
      description: 'Understanding scarcity, opportunity cost, decision-making, factors of production, human capital, and economic systems',
      lessons: unit1Lessons,
    },
    {
      id: 'unit-2',
      title: 'Unit 2: Producers and consumers in markets',
      description: 'Understanding incentives, marketing, costs, revenue, profit, productivity, business organization, and market structures',
      lessons: unit2Lessons,
    },
    {
      id: 'unit-3',
      title: 'Unit 3: The microeconomy and price systems',
      description: 'Understanding demand, supply, elasticity, market equilibrium, and price controls',
      lessons: unit3Lessons,
    },
    {
      id: 'unit-4',
      title: 'Unit 4: The role of government in markets',
      description: 'Understanding public vs. private goods, property rights, and government redistribution of wealth',
      lessons: unit4Lessons,
    },
    {
      id: 'unit-5',
      title: 'Unit 5: Macroeconomic challenges',
      description: 'Understanding macroeconomic indicators, aggregate demand and supply, and business cycles',
      lessons: unit5Lessons,
    },
    {
      id: 'unit-6',
      title: 'Unit 6: Money, Banking, and Financial Markets',
      description: 'Understanding money, financial institutions and markets, and the Federal Reserve',
      lessons: unit6Lessons,
    },
    {
      id: 'unit-7',
      title: 'Unit 7: Economic stabilization',
      description: 'Understanding monetary policy, fiscal policy, and government budgets',
      lessons: unit7Lessons,
    },
    {
      id: 'unit-8',
      title: 'Unit 8: Global economy',
      description: 'Understanding trade, exchange rates, and globalization',
      lessons: unit8Lessons,
    },
    {
      id: 'unit-9',
      title: 'Unit 9: Careers and education',
      description: 'Understanding education as investment, paying for education, financial aid, and student loans',
      lessons: unit9Lessons,
    },
    {
      id: 'unit-10',
      title: 'Unit 10: Employment',
      description: 'Understanding compensation, benefits, paychecks, non-typical pay, and hiring process',
      lessons: unit10Lessons,
    },
    {
      id: 'unit-11',
      title: 'Unit 11: Banking',
      description: 'Understanding banking institutions, bank accounts, account management, and interest',
      lessons: unit11Lessons,
    },
    {
      id: 'unit-12',
      title: 'Unit 12: Financial goals',
      description: 'Understanding SMART goals, short/medium/long-term goals, and net worth',
      lessons: unit12Lessons,
    },
    {
      id: 'unit-13',
      title: 'Unit 13: Budgeting & saving',
      description: 'Understanding budgeting, saving money, emergency funds, and reducing expenses',
      lessons: unit13Lessons,
    },
    {
      id: 'unit-14',
      title: 'Unit 14: Saving & investing',
      description: 'Understanding risk and return, planning for retirement, and Social Security',
      lessons: unit14Lessons,
    },
    {
      id: 'unit-15',
      title: 'Unit 15: Consumer credit',
      description: 'Understanding credit cards, credit scores, and credit management',
      lessons: unit15Lessons,
    },
    {
      id: 'unit-16',
      title: 'Unit 16: Loans and debt',
      description: 'Understanding borrowing terms, loan sources, types of loans, debt management, and bankruptcy',
      lessons: unit16Lessons,
    },
    {
      id: 'unit-17',
      title: 'Unit 17: Taxes',
      description: 'Understanding taxes, local taxes, tax forms, and personal income taxes',
      lessons: unit17Lessons,
    },
  ],
  finalExam: [],
};
