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
    title: 'Introduction to macroeconomics',
    duration: '25 min',
    contentItems: [
      {
        id: 'macroecon-u1-l1-video-1',
        type: 'video',
        title: 'Introduction to macroeconomics',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'macroecon-u1-l1-article',
        type: 'article',
        title: 'Learn: Introduction to macroeconomics',
        content: `# Introduction to Macroeconomics

## Introduction to economics

Economics is the study of how societies allocate scarce resources to satisfy unlimited wants and needs. It examines the choices individuals, businesses, and governments make when resources are limited.

## Scarcity

Scarcity is the fundamental economic problem. It exists because resources are limited while human wants are unlimited. This forces us to make choices about how to use resources efficiently.

Key points about scarcity:
- Resources are finite (land, labor, capital, entrepreneurship)
- Wants and needs are infinite
- Every choice involves an opportunity cost
- Scarcity affects everyone, from individuals to entire nations

## Normative and positive statements

**Positive statements** are objective, fact-based claims that can be tested and verified. They describe "what is."

Examples:
- "Unemployment increased by 2% last quarter"
- "The inflation rate is 3%"

**Normative statements** are subjective, value-based claims that express opinions about "what ought to be."

Examples:
- "The government should reduce unemployment"
- "Inflation is too high"

## Economic models

Economic models are simplified representations of reality used to understand, explain, and predict economic behavior. They help economists:
- Focus on key relationships
- Make predictions
- Test theories
- Understand complex systems

Models use assumptions to simplify reality, making them useful but not perfect representations.

## Command and market economies

**Command economy** (planned economy):
- Government makes all economic decisions
- Central planning determines what, how, and for whom to produce
- Examples: Historical Soviet Union, North Korea

**Market economy** (free market):
- Individuals and businesses make economic decisions
- Prices determined by supply and demand
- Examples: United States, most developed countries

Most modern economies are **mixed economies**, combining elements of both systems.

## Lesson summary: Introduction to Macroeconomics

Economics studies how societies allocate scarce resources. Scarcity forces choices, and every choice has an opportunity cost. Economic models help us understand complex systems. Economies can be organized as command, market, or mixed systems.`,
        importantPoints: [
          'Economics studies how societies allocate scarce resources',
          'Scarcity is the fundamental economic problem',
          'Positive statements are factual; normative statements are value judgments',
          'Economic models simplify reality to help us understand complex systems',
          'Command economies are centrally planned; market economies rely on individual decisions',
        ],
      } as ArticleContent,
      {
        id: 'macroecon-u1-l1-practice',
        type: 'practice',
        title: 'Practice: Introduction to scarcity and the economic way of thinking',
        exercises: [
          {
            id: 'practice-1-1-1',
            prompt: 'Explain why scarcity exists and how it affects economic decision-making.',
            hints: [
              'Consider the relationship between limited resources and unlimited wants',
              'Think about how scarcity forces choices',
            ],
          },
          {
            id: 'practice-1-1-2',
            prompt: 'Distinguish between a positive and normative statement. Provide examples of each.',
            hints: [
              'Positive statements can be tested; normative statements express values',
              'Look for words like "should" or "ought" in normative statements',
            ],
          },
          {
            id: 'practice-1-1-3',
            prompt: 'Compare and contrast command and market economies. What are the advantages and disadvantages of each?',
            hints: [
              'Consider who makes decisions in each system',
              'Think about efficiency, innovation, and equity',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'macroecon-u1-l1-quiz',
        type: 'quiz',
        title: 'Quiz: Introduction to macroeconomics',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-1-2',
    title: 'Opportunity cost and the Production Possibilities Curve',
    duration: '30 min',
    contentItems: [
      {
        id: 'macroecon-u1-l2-video-1',
        type: 'video',
        title: 'Opportunity cost and the Production Possibilities Curve',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'macroecon-u1-l2-article',
        type: 'article',
        title: 'Learn: Opportunity cost and the Production Possibilities Curve',
        content: `# Opportunity Cost and the Production Possibilities Curve

## Production possibilities curve

The Production Possibilities Curve (PPC) shows the maximum combinations of two goods or services an economy can produce when all resources are fully and efficiently employed.

Key characteristics:
- Shows trade-offs between producing different goods
- Points on the curve represent efficient production
- Points inside the curve represent inefficient production
- Points outside the curve are unattainable with current resources

## Opportunity cost

Opportunity cost is the value of the next best alternative that must be given up when making a choice. It's what you sacrifice to get something else.

Example: If you choose to study economics for 2 hours instead of working, the opportunity cost is the wages you could have earned.

## Increasing opportunity cost

When opportunity cost increases as more of one good is produced, the PPC is bowed outward (concave to the origin). This occurs because:
- Resources are not perfectly adaptable
- Some resources are better suited for producing one good than another
- As production shifts, less suitable resources must be used

## PPCs for increasing, decreasing and constant opportunity cost

**Increasing opportunity cost** (bowed outward):
- Most realistic scenario
- Resources are specialized
- Opportunity cost rises as production increases

**Constant opportunity cost** (straight line):
- Resources are perfectly adaptable
- Opportunity cost remains constant
- Less realistic but useful for analysis

**Decreasing opportunity cost** (bowed inward):
- Rare in practice
- Would occur if resources become more efficient when specialized

## Production Possibilities Curve as a model of a country's economy

The PPC can represent:
- A country's production capacity
- Trade-offs between different sectors (e.g., consumer goods vs. capital goods)
- Economic growth (shifts outward)
- Economic decline (shifts inward)
- Efficiency and inefficiency

## Lesson summary: Opportunity cost and the PPC

The PPC illustrates maximum production possibilities and trade-offs. Opportunity cost is what you give up to get something else. Most PPCs show increasing opportunity cost, creating a bowed-outward curve. The PPC is a useful model for understanding economic choices and constraints.`,
        importantPoints: [
          'The PPC shows maximum production combinations when resources are fully employed',
          'Opportunity cost is the value of the next best alternative',
          'Increasing opportunity cost creates a bowed-outward PPC',
          'Points on the curve are efficient; points inside are inefficient',
          'The PPC can model a country\'s production possibilities and trade-offs',
        ],
      } as ArticleContent,
      {
        id: 'macroecon-u1-l2-practice',
        type: 'practice',
        title: 'Practice: Opportunity cost and the PPC',
        exercises: [
          {
            id: 'practice-1-2-1',
            prompt: 'Draw a Production Possibilities Curve for an economy producing computers and food. Explain what points on, inside, and outside the curve represent.',
            hints: [
              'Label axes clearly',
              'Points on the curve use all resources efficiently',
              'Points inside represent unused resources',
            ],
          },
          {
            id: 'practice-1-2-2',
            prompt: 'Calculate the opportunity cost of producing one more computer when moving from point A (10 computers, 50 food) to point B (15 computers, 40 food).',
            hints: [
              'Opportunity cost = what you give up / what you gain',
              'Look at the change in food production',
            ],
          },
          {
            id: 'practice-1-2-3',
            prompt: 'Explain why the PPC is typically bowed outward rather than a straight line.',
            hints: [
              'Consider resource specialization',
              'Think about how resources adapt to different uses',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'macroecon-u1-l2-quiz',
        type: 'quiz',
        title: 'Quiz: Opportunity cost and the PPC',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-1-3',
    title: 'Comparative advantage and the gains from trade',
    duration: '35 min',
    contentItems: [
      {
        id: 'macroecon-u1-l3-video-1',
        type: 'video',
        title: 'Comparative advantage and the gains from trade',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'macroecon-u1-l3-article',
        type: 'article',
        title: 'Learn: Comparative advantage and the gains from trade',
        content: `# Comparative Advantage and the Gains from Trade

## Comparative advantage, specialization, and gains from trade

**Comparative advantage** occurs when a country (or individual) can produce a good at a lower opportunity cost than another country. This is the basis for beneficial trade.

**Specialization** means focusing production on goods where you have a comparative advantage.

**Gains from trade** occur when countries specialize and trade, allowing both to consume more than they could produce alone.

## Comparative advantage and absolute advantage

**Absolute advantage**: The ability to produce more of a good with the same resources (or the same amount with fewer resources).

**Comparative advantage**: The ability to produce a good at a lower opportunity cost.

Important: A country can have an absolute advantage in both goods but still benefit from trade if it has a comparative advantage in one good.

## Opportunity cost and comparative advantage using an output table

When using output tables (showing how much each country can produce):

1. Calculate opportunity cost for each good in each country
2. The country with the lower opportunity cost has the comparative advantage
3. That country should specialize in that good

Example:
- Country A: 10 wheat or 5 cloth
- Country B: 8 wheat or 4 cloth

Country A's opportunity cost: 1 wheat = 0.5 cloth; 1 cloth = 2 wheat
Country B's opportunity cost: 1 wheat = 0.5 cloth; 1 cloth = 2 wheat

In this case, opportunity costs are equal, so no gains from trade.

## Terms of trade and the gains from trade

**Terms of trade** is the ratio at which countries exchange goods. It must fall between the opportunity costs of both countries for trade to be beneficial.

If terms of trade are:
- Equal to a country's opportunity cost: No gain for that country
- Between opportunity costs: Both countries gain
- Outside opportunity costs: One country loses

## Input approach to determining comparative advantage

When using input tables (showing resources needed to produce one unit):

1. Calculate output per unit of input for each good in each country
2. Find the ratio of outputs
3. The country with the higher ratio has the comparative advantage

Lower input requirements mean higher productivity and comparative advantage.

## When there aren't gains from trade

Trade doesn't provide gains when:
- Opportunity costs are identical
- One country has an absolute and comparative advantage in everything (rare)
- Trade barriers prevent beneficial exchange
- Transportation costs exceed gains

## Comparative advantage worked example

**Country X**: Can produce 20 cars or 40 computers
**Country Y**: Can produce 10 cars or 30 computers

Country X opportunity cost: 1 car = 2 computers; 1 computer = 0.5 cars
Country Y opportunity cost: 1 car = 3 computers; 1 computer = 0.33 cars

Country X has comparative advantage in computers (lower opportunity cost: 0.5 < 0.33)
Country Y has comparative advantage in cars (lower opportunity cost: 3 < 2)

Both countries benefit by specializing and trading.

## Lesson summary: Comparative advantage and gains from trade

Comparative advantage (lower opportunity cost) is the basis for beneficial trade. Countries should specialize in goods where they have a comparative advantage. Terms of trade must fall between opportunity costs for both to benefit. Trade increases total world production and consumption.`,
        importantPoints: [
          'Comparative advantage is based on opportunity cost, not absolute advantage',
          'Countries benefit from specializing in goods where they have comparative advantage',
          'Terms of trade must be between opportunity costs for both countries to gain',
          'Trade increases total world production and consumption',
          'Even countries with absolute advantage in everything can benefit from trade',
        ],
      } as ArticleContent,
      {
        id: 'macroecon-u1-l3-practice',
        type: 'practice',
        title: 'Practice: Comparative advantage and the gains from trade',
        exercises: [
          {
            id: 'practice-1-3-1',
            prompt: 'Country A can produce 100 wheat or 50 cloth. Country B can produce 80 wheat or 40 cloth. Determine which country has a comparative advantage in each good and explain how they should trade.',
            hints: [
              'Calculate opportunity costs for each country',
              'Compare opportunity costs to find comparative advantage',
            ],
          },
          {
            id: 'practice-1-3-2',
            prompt: 'Explain the difference between absolute advantage and comparative advantage. Why is comparative advantage more important for trade?',
            hints: [
              'Absolute advantage is about productivity',
              'Comparative advantage is about opportunity cost',
            ],
          },
          {
            id: 'practice-1-3-3',
            prompt: 'If Country X has an opportunity cost of 2 units of Good A for 1 unit of Good B, and Country Y has an opportunity cost of 3 units of Good A for 1 unit of Good B, what are acceptable terms of trade?',
            hints: [
              'Terms of trade must be between the two opportunity costs',
              'Both countries must gain from trade',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'macroecon-u1-l3-quiz',
        type: 'quiz',
        title: 'Quiz: Comparative advantage and the gains from trade',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-1-4',
    title: 'Demand',
    duration: '30 min',
    contentItems: [
      {
        id: 'macroecon-u1-l4-video-1',
        type: 'video',
        title: 'Demand',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'macroecon-u1-l4-article',
        type: 'article',
        title: 'Learn: Demand',
        content: `# Demand

## Law of demand

The **law of demand** states that, all else equal, as the price of a good increases, the quantity demanded decreases, and as the price decreases, the quantity demanded increases.

This creates a downward-sloping demand curve, showing the inverse relationship between price and quantity demanded.

## Price of related products and demand

**Substitute goods**: Goods that can be used in place of each other. When the price of a substitute increases, demand for the original good increases.

Example: If the price of coffee rises, demand for tea increases.

**Complementary goods**: Goods used together. When the price of a complement increases, demand for the original good decreases.

Example: If the price of gasoline rises, demand for cars decreases.

## Change in expected future prices and demand

If consumers expect prices to rise in the future, current demand increases (buy now before prices go up).

If consumers expect prices to fall in the future, current demand decreases (wait for lower prices).

## Changes in income, population, or preferences

**Income changes**:
- **Normal goods**: Demand increases as income increases
- **Inferior goods**: Demand decreases as income increases

**Population changes**: More people means more demand (shift right), fewer people means less demand (shift left).

**Preferences/tastes**: Changes in what people like affect demand. Positive changes increase demand; negative changes decrease demand.

## Normal and inferior goods

**Normal goods**: Goods for which demand increases as income increases. Most goods are normal goods.

Examples: Cars, restaurant meals, vacations

**Inferior goods**: Goods for which demand decreases as income increases. People buy less as they can afford better alternatives.

Examples: Generic brands, public transportation (for some), instant noodles

## Change in demand versus change in quantity demanded

**Change in quantity demanded**: Movement along the demand curve caused by a change in price. This is shown as movement from one point to another on the same curve.

**Change in demand**: Shift of the entire demand curve caused by factors other than price (income, preferences, prices of related goods, expectations, population). The curve shifts left (decrease) or right (increase).

Key distinction: Price changes cause movement along the curve; other factors cause the curve to shift.

## Lesson summary: Demand and the determinants of demand

The law of demand shows the inverse relationship between price and quantity. Demand is affected by prices of related goods (substitutes and complements), income, population, preferences, and expectations. Normal goods increase with income; inferior goods decrease. Distinguish between movement along the curve (price change) and shifts of the curve (other factors).`,
        importantPoints: [
          'The law of demand shows an inverse relationship between price and quantity demanded',
          'Substitute goods compete; complementary goods are used together',
          'Expected future prices affect current demand',
          'Normal goods increase with income; inferior goods decrease',
          'Price changes cause movement along the curve; other factors shift the curve',
        ],
      } as ArticleContent,
      {
        id: 'macroecon-u1-l4-practice',
        type: 'practice',
        title: 'Practice: Demand',
        exercises: [
          {
            id: 'practice-1-4-1',
            prompt: 'Draw a demand curve and explain what causes movement along the curve versus what causes the curve to shift.',
            hints: [
              'Price changes cause movement along the curve',
              'Other factors (income, preferences, etc.) shift the curve',
            ],
          },
          {
            id: 'practice-1-4-2',
            prompt: 'Classify each pair as substitutes or complements: (a) Coffee and tea, (b) Cars and gasoline, (c) Butter and margarine, (d) Hot dogs and hot dog buns.',
            hints: [
              'Substitutes can replace each other',
              'Complements are used together',
            ],
          },
          {
            id: 'practice-1-4-3',
            prompt: 'Explain how an increase in income affects demand for normal goods versus inferior goods. Provide examples.',
            hints: [
              'Normal goods: demand increases with income',
              'Inferior goods: demand decreases with income',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'macroecon-u1-l4-quiz',
        type: 'quiz',
        title: 'Quiz: Demand',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-1-5',
    title: 'Supply',
    duration: '25 min',
    contentItems: [
      {
        id: 'macroecon-u1-l5-video-1',
        type: 'video',
        title: 'Supply',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'macroecon-u1-l5-article',
        type: 'article',
        title: 'Learn: Supply',
        content: `# Supply

## Law of supply

The **law of supply** states that, all else equal, as the price of a good increases, the quantity supplied increases, and as the price decreases, the quantity supplied decreases.

This creates an upward-sloping supply curve, showing the direct relationship between price and quantity supplied.

Producers are willing to supply more at higher prices because:
- Higher prices mean higher profits
- It becomes profitable to produce more units
- Higher prices can justify higher production costs

## Factors affecting supply

Factors that shift the supply curve (change supply):

1. **Input prices**: Higher input costs decrease supply (shift left); lower costs increase supply (shift right)

2. **Technology**: Better technology increases supply (shift right) by making production more efficient

3. **Number of sellers**: More sellers increase supply (shift right); fewer sellers decrease supply (shift left)

4. **Expectations**: If producers expect higher future prices, they may decrease current supply (shift left) to sell later

5. **Government policies**: Taxes decrease supply (shift left); subsidies increase supply (shift right)

6. **Natural conditions**: Weather, disasters, etc. can affect supply of agricultural and natural resource goods

## Change in supply versus change in quantity supplied

**Change in quantity supplied**: Movement along the supply curve caused by a change in price. This is shown as movement from one point to another on the same curve.

**Change in supply**: Shift of the entire supply curve caused by factors other than price (input costs, technology, number of sellers, expectations, government policies). The curve shifts left (decrease) or right (increase).

Key distinction: Price changes cause movement along the curve; other factors cause the curve to shift.

## Lesson summary: Supply and its determinants

The law of supply shows the direct relationship between price and quantity supplied. Supply is affected by input prices, technology, number of sellers, expectations, and government policies. Distinguish between movement along the curve (price change) and shifts of the curve (other factors).`,
        importantPoints: [
          'The law of supply shows a direct relationship between price and quantity supplied',
          'Higher input costs decrease supply; better technology increases supply',
          'More sellers increase supply; fewer sellers decrease supply',
          'Price changes cause movement along the curve; other factors shift the curve',
          'Government policies (taxes, subsidies) affect supply',
        ],
      } as ArticleContent,
      {
        id: 'macroecon-u1-l5-practice',
        type: 'practice',
        title: 'Practice: Supply',
        exercises: [
          {
            id: 'practice-1-5-1',
            prompt: 'Draw a supply curve and explain what causes movement along the curve versus what causes the curve to shift.',
            hints: [
              'Price changes cause movement along the curve',
              'Other factors (input costs, technology, etc.) shift the curve',
            ],
          },
          {
            id: 'practice-1-5-2',
            prompt: 'Explain how each of the following affects the supply of smartphones: (a) A decrease in the price of computer chips, (b) New manufacturing technology, (c) A tax on smartphone production, (d) More companies entering the market.',
            hints: [
              'Input prices: lower costs increase supply',
              'Technology: improvements increase supply',
              'Taxes: decrease supply',
              'More sellers: increase supply',
            ],
          },
          {
            id: 'practice-1-5-3',
            prompt: 'If producers expect prices to be higher next month, how does this affect current supply? Explain using a supply curve diagram.',
            hints: [
              'Producers may hold back supply to sell later',
              'This shifts the supply curve left',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'macroecon-u1-l5-quiz',
        type: 'quiz',
        title: 'Quiz: Supply',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-1-6',
    title: 'Markets',
    duration: '30 min',
    contentItems: [
      {
        id: 'macroecon-u1-l6-video-1',
        type: 'video',
        title: 'Markets',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'macroecon-u1-l6-article',
        type: 'article',
        title: 'Learn: Markets',
        content: `# Markets

## Market equilibrium

**Market equilibrium** occurs when the quantity demanded equals the quantity supplied at a particular price. This is the point where the demand and supply curves intersect.

At equilibrium:
- Quantity demanded = Quantity supplied
- No shortage or surplus
- Price is stable (no pressure to change)
- Market clears (all goods are sold)

The equilibrium price is also called the "market-clearing price."

## Changes in market equilibrium

Equilibrium changes when either the demand curve or supply curve shifts:

**Demand shifts**:
- Increase in demand (shift right) → Higher equilibrium price and quantity
- Decrease in demand (shift left) → Lower equilibrium price and quantity

**Supply shifts**:
- Increase in supply (shift right) → Lower equilibrium price, higher quantity
- Decrease in supply (shift left) → Higher equilibrium price, lower quantity

## Changes in equilibrium price and quantity when supply and demand change

When both curves shift simultaneously:

**Both increase**:
- Demand ↑ and Supply ↑ → Quantity definitely increases
- Price change is ambiguous (depends on magnitude of shifts)

**Both decrease**:
- Demand ↓ and Supply ↓ → Quantity definitely decreases
- Price change is ambiguous

**Demand increases, Supply decreases**:
- Price definitely increases
- Quantity change is ambiguous

**Demand decreases, Supply increases**:
- Price definitely decreases
- Quantity change is ambiguous

## Lesson summary: Market equilibrium, disequilibrium, and changes in equilibrium

Market equilibrium occurs when quantity demanded equals quantity supplied. Equilibrium changes when demand or supply shifts. When both shift, one variable (price or quantity) changes definitely while the other is ambiguous, depending on the relative magnitude of the shifts.`,
        importantPoints: [
          'Equilibrium occurs when quantity demanded equals quantity supplied',
          'At equilibrium, the market clears with no shortage or surplus',
          'Demand shifts affect both price and quantity in the same direction',
          'Supply shifts affect price and quantity in opposite directions',
          'When both curves shift, one outcome is definite, the other is ambiguous',
        ],
      } as ArticleContent,
      {
        id: 'macroecon-u1-l6-practice',
        type: 'practice',
        title: 'Practice: Market equilibrium and disequilibrium, Changes in equilibrium',
        exercises: [
          {
            id: 'practice-1-6-1',
            prompt: 'Draw a market with demand and supply curves. Label the equilibrium price and quantity. Show what happens when demand increases.',
            hints: [
              'Equilibrium is where curves intersect',
              'Demand increase shifts curve right',
              'New equilibrium has higher price and quantity',
            ],
          },
          {
            id: 'practice-1-6-2',
            prompt: 'Explain the difference between a shortage and a surplus. Show each on a supply and demand diagram.',
            hints: [
              'Shortage: quantity demanded > quantity supplied (below equilibrium)',
              'Surplus: quantity supplied > quantity demanded (above equilibrium)',
            ],
          },
          {
            id: 'practice-1-6-3',
            prompt: 'If both demand and supply increase, what can you say definitively about the change in equilibrium quantity? What about price?',
            hints: [
              'Both shifts increase quantity',
              'Price change depends on which shift is larger',
            ],
          },
          {
            id: 'practice-1-6-4',
            prompt: 'Analyze what happens to equilibrium price and quantity when: (a) Demand increases and supply decreases, (b) Demand decreases and supply increases, (c) Both demand and supply increase.',
            hints: [
              'Consider the direction each shift moves price and quantity',
              'When shifts oppose, one outcome is definite',
              'When shifts align, one outcome is definite',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'macroecon-u1-l6-quiz',
        type: 'quiz',
        title: 'Quiz: Markets',
        questions: [],
      } as QuizContent,
    ],
  },
];

const unit2Lessons: Lesson[] = [
  {
    id: 'lesson-2-1',
    title: 'Gross Domestic Product (The circular flow and GDP)',
    duration: '35 min',
    contentItems: [
      {
        id: 'macroecon-u2-l1-video-1',
        type: 'video',
        title: 'Gross Domestic Product (The circular flow and GDP)',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'macroecon-u2-l1-article',
        type: 'article',
        title: 'Learn: Gross Domestic Product (The circular flow and GDP)',
        content: `# Gross Domestic Product: The Circular Flow and GDP

## Circular flow of income and expenditures

The **circular flow model** shows how money, goods, and services flow through an economy between households and firms.

Key components:
- **Households**: Provide factors of production (labor, land, capital) and receive income
- **Firms**: Use factors of production to produce goods and services, pay income to households
- **Product market**: Where goods and services are sold
- **Factor market**: Where factors of production are bought and sold

Money flows in one direction; goods, services, and factors flow in the opposite direction.

## Parsing gross domestic product

**Gross Domestic Product (GDP)** is the total market value of all final goods and services produced within a country's borders in a specific time period.

Key terms:
- **Gross**: Total, before accounting for depreciation
- **Domestic**: Within country's borders (regardless of ownership)
- **Product**: Final goods and services

## More on final and intermediate GDP contributions

**Final goods**: Goods sold to end users (consumers, businesses, government, foreign buyers). These are counted in GDP.

**Intermediate goods**: Goods used in the production of other goods. These are NOT counted in GDP to avoid double-counting.

Example: A car sold to a consumer is final; the steel used to make the car is intermediate.

## Investment and consumption

**Consumption (C)**: Spending by households on goods and services (except new housing).

**Investment (I)**: Spending on capital goods that will be used in future production:
- Business investment (machinery, equipment, buildings)
- Residential investment (new housing)
- Inventory investment (changes in unsold goods)

Note: Investment in economics ≠ financial investment (stocks, bonds).

## Income and expenditure views of GDP

GDP can be measured two ways, and they should equal:

**Expenditure approach**: GDP = C + I + G + (X - M)
- C = Consumption
- I = Investment
- G = Government spending
- X = Exports
- M = Imports
- (X - M) = Net exports

**Income approach**: GDP = Wages + Rent + Interest + Profit

Both approaches should yield the same GDP value.

## Value added approach to calculating GDP

**Value added** = Value of output - Value of intermediate inputs

GDP = Sum of value added at each stage of production

This avoids double-counting intermediate goods by only counting the value added at each stage.

## Components of GDP

GDP has four main components:

1. **Consumption (C)**: Largest component, household spending
2. **Investment (I)**: Business and residential investment
3. **Government spending (G)**: Government purchases (not transfers)
4. **Net exports (X - M)**: Exports minus imports

## Expenditure approach to calculating GDP examples

Example calculation:
- Consumption: $10,000
- Investment: $2,000
- Government spending: $3,000
- Exports: $1,500
- Imports: $2,000

GDP = C + I + G + (X - M)
GDP = $10,000 + $2,000 + $3,000 + ($1,500 - $2,000)
GDP = $14,500

## Examples of accounting for GDP

Important rules:
- Only count final goods and services
- Count goods produced in the current period
- Count production within country's borders
- Don't count intermediate goods
- Don't count used goods (already counted when new)
- Don't count financial transactions
- Don't count transfer payments

## Measuring the size of the economy: gross domestic product

GDP is the primary measure of a country's economic size and output. It helps:
- Compare economic performance across countries
- Track economic growth over time
- Inform policy decisions
- Measure standard of living (with limitations)

## Lesson summary: The circular flow and GDP

The circular flow shows how money and resources move through an economy. GDP measures total production using expenditure, income, or value-added approaches. GDP = C + I + G + (X - M). Only final goods are counted to avoid double-counting.`,
        importantPoints: [
          'The circular flow model shows money and resources flowing between households and firms',
          'GDP measures total production of final goods and services within a country',
          'Only final goods are counted; intermediate goods are excluded',
          'GDP = C + I + G + (X - M) using the expenditure approach',
          'GDP can be calculated using expenditure, income, or value-added approaches',
        ],
      } as ArticleContent,
      {
        id: 'macroecon-u2-l1-practice',
        type: 'practice',
        title: 'Practice: The circular flow model and GDP',
        exercises: [
          {
            id: 'practice-2-1-1',
            prompt: 'Draw and explain the circular flow model, showing the flow of money and resources between households and firms.',
            hints: [
              'Show product market and factor market',
              'Money flows opposite to goods/services',
            ],
          },
          {
            id: 'practice-2-1-2',
            prompt: 'Classify each as a final or intermediate good: (a) Bread sold to consumers, (b) Flour sold to a bakery, (c) A new car sold to a family, (d) Steel sold to an auto manufacturer.',
            hints: [
              'Final goods go to end users',
              'Intermediate goods are used in production',
            ],
          },
          {
            id: 'practice-2-1-3',
            prompt: 'Calculate GDP using the expenditure approach: C = $8,000, I = $1,500, G = $2,000, X = $1,200, M = $1,800.',
            hints: [
              'GDP = C + I + G + (X - M)',
              'Net exports = X - M',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'macroecon-u2-l1-quiz',
        type: 'quiz',
        title: 'Quiz: Gross Domestic Product',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-2-2',
    title: 'Limitations of GDP',
    duration: '25 min',
    contentItems: [
      {
        id: 'macroecon-u2-l2-video-1',
        type: 'video',
        title: 'Limitations of GDP',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'macroecon-u2-l2-article',
        type: 'article',
        title: 'Learn: Limitations of GDP',
        content: `# Limitations of GDP

## Limitations of GDP

GDP has several important limitations as a measure of economic well-being:

1. **Doesn't measure non-market activities**: Unpaid work (household chores, childcare) isn't counted
2. **Doesn't account for quality of life**: Environmental quality, leisure time, health aren't measured
3. **Doesn't reflect income distribution**: GDP can grow while inequality increases
4. **Doesn't account for negative externalities**: Pollution, resource depletion aren't subtracted
5. **Doesn't measure informal economy**: Underground economy activities aren't included
6. **Doesn't account for depreciation**: GDP is "gross," not accounting for capital wear and tear
7. **Doesn't measure sustainability**: Doesn't show if growth is sustainable long-term

## Beyond GDP: other ways to measure the economy

Alternative measures include:

**Gross National Product (GNP)**: GDP + income earned abroad by residents - income earned domestically by foreigners

**Net Domestic Product (NDP)**: GDP - depreciation (capital consumption)

**Green GDP**: GDP adjusted for environmental costs

**Human Development Index (HDI)**: Combines income, education, and life expectancy

**Genuine Progress Indicator (GPI)**: Adjusts GDP for social and environmental factors

**Happy Planet Index**: Measures sustainable well-being

## How well GDP measures the well-being of society

GDP is a good measure of:
- Economic output and production
- Economic growth over time
- Size of the economy

GDP is NOT a good measure of:
- Overall well-being or happiness
- Quality of life
- Environmental sustainability
- Income equality
- Non-market production
- Leisure time

A country can have high GDP but poor quality of life, or vice versa.

## Lesson summary: The limitations of GDP

GDP measures economic output but has significant limitations. It doesn't capture non-market activities, quality of life, income distribution, environmental costs, or sustainability. Alternative measures like HDI, GPI, and Green GDP attempt to address these limitations.`,
        importantPoints: [
          "GDP doesn't measure non-market activities or quality of life",
          "GDP doesn't reflect income distribution or negative externalities",
          "GDP doesn't account for informal economy or sustainability",
          'Alternative measures like HDI and GPI address GDP limitations',
          'GDP measures output well but not overall well-being',
        ],
      } as ArticleContent,
      {
        id: 'macroecon-u2-l2-practice',
        type: 'practice',
        title: 'Practice: Limitations of GDP',
        exercises: [
          {
            id: 'practice-2-2-1',
            prompt: 'List five activities that contribute to well-being but are not counted in GDP. Explain why each is excluded.',
            hints: [
              'Think about unpaid work',
              'Consider leisure and quality of life',
            ],
          },
          {
            id: 'practice-2-2-2',
            prompt: 'Explain how GDP could increase while overall well-being decreases. Provide specific examples.',
            hints: [
              'Consider environmental costs',
              'Think about income inequality',
            ],
          },
          {
            id: 'practice-2-2-3',
            prompt: 'Compare GDP and HDI as measures of economic performance. What does each measure, and what are their strengths and weaknesses?',
            hints: [
              'GDP focuses on output',
              'HDI includes broader well-being indicators',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'macroecon-u2-l2-quiz',
        type: 'quiz',
        title: 'Quiz: Limitations of GDP',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-2-3',
    title: 'Unemployment',
    duration: '30 min',
    contentItems: [
      {
        id: 'macroecon-u2-l3-video-1',
        type: 'video',
        title: 'Unemployment',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'macroecon-u2-l3-article',
        type: 'article',
        title: 'Learn: Unemployment',
        content: `# Unemployment

## Unemployment rate primer

The **unemployment rate** measures the percentage of the labor force that is unemployed but actively seeking work.

Formula: Unemployment Rate = (Number of Unemployed / Labor Force) × 100

**Labor Force** = Employed + Unemployed (actively seeking work)

**Not in labor force**: People who are not working and not seeking work (students, retirees, discouraged workers)

Important: The unemployment rate doesn't include discouraged workers or underemployed workers.

## Natural, cyclical, structural, and frictional unemployment rates

**Frictional unemployment**: Short-term unemployment due to people moving between jobs or entering the labor force. This is normal and healthy.

**Structural unemployment**: Long-term unemployment due to skills mismatch or changes in the economy (e.g., technology replacing workers). Workers' skills don't match available jobs.

**Cyclical unemployment**: Unemployment caused by economic downturns (recessions). This is the type that monetary and fiscal policy try to reduce.

**Natural rate of unemployment**: The sum of frictional and structural unemployment. This is the "normal" unemployment rate when the economy is at full employment.

**Full employment**: When cyclical unemployment = 0. The economy can still have frictional and structural unemployment.

## Lesson summary: Unemployment

The unemployment rate measures job seekers as a percentage of the labor force. Unemployment types include frictional (job transitions), structural (skills mismatch), and cyclical (economic downturns). The natural rate is frictional + structural unemployment. Full employment means zero cyclical unemployment.`,
        importantPoints: [
          'Unemployment rate = (Unemployed / Labor Force) × 100',
          'Frictional unemployment is normal job transitions',
          'Structural unemployment is due to skills mismatch',
          'Cyclical unemployment is caused by economic downturns',
          'Natural rate = Frictional + Structural unemployment',
        ],
      } as ArticleContent,
      {
        id: 'macroecon-u2-l3-practice',
        type: 'practice',
        title: 'Practice: Types of unemployment and the natural rate of unemployment, Unemployment',
        exercises: [
          {
            id: 'practice-2-3-1',
            prompt: 'Classify each as frictional, structural, or cyclical unemployment: (a) A recent college graduate looking for first job, (b) A factory worker laid off due to automation, (c) A construction worker unemployed during a recession, (d) A person quitting to find a better job.',
            hints: [
              'Frictional: job transitions',
              'Structural: skills mismatch',
              'Cyclical: economic downturn',
            ],
          },
          {
            id: 'practice-2-3-2',
            prompt: 'Calculate the unemployment rate: Labor force = 150 million, Employed = 142 million, Unemployed = 8 million.',
            hints: [
              'Unemployment rate = (Unemployed / Labor Force) × 100',
            ],
          },
          {
            id: 'practice-2-3-3',
            prompt: 'Explain the difference between the natural rate of unemployment and the actual unemployment rate. What does it mean when actual unemployment is above or below the natural rate?',
            hints: [
              'Natural rate = frictional + structural',
              'Actual rate includes cyclical unemployment',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'macroecon-u2-l3-quiz',
        type: 'quiz',
        title: 'Quiz: Unemployment',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-2-4',
    title: 'Inflation (Price indices and inflation)',
    duration: '40 min',
    contentItems: [
      {
        id: 'macroecon-u2-l4-video-1',
        type: 'video',
        title: 'Inflation (Price indices and inflation)',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'macroecon-u2-l4-article',
        type: 'article',
        title: 'Learn: Inflation (Price indices and inflation)',
        content: `# Inflation: Price Indices and Inflation

## Introduction to inflation

**Inflation** is a sustained increase in the general price level of goods and services in an economy over time.

**Deflation** is a sustained decrease in the general price level.

**Disinflation** is a decrease in the inflation rate (prices still rising, but more slowly).

Inflation reduces the purchasing power of money - each dollar buys fewer goods and services.

## Actual CPI-U basket of goods

The **Consumer Price Index (CPI)** measures changes in the price level of a basket of consumer goods and services.

**CPI-U** (Consumer Price Index for All Urban Consumers) tracks prices for urban consumers, representing about 93% of the U.S. population.

The basket includes:
- Food and beverages
- Housing
- Apparel
- Transportation
- Medical care
- Recreation
- Education and communication
- Other goods and services

The basket is updated periodically to reflect changing consumption patterns.

## Inflation data

Inflation is typically measured as the percentage change in a price index:

Inflation Rate = [(CPI Current Year - CPI Previous Year) / CPI Previous Year] × 100

Example: If CPI was 100 last year and 103 this year:
Inflation = [(103 - 100) / 100] × 100 = 3%

## Deflation

**Deflation** is a sustained decrease in the general price level (negative inflation).

Causes:
- Decreased aggregate demand
- Increased aggregate supply
- Reduced money supply

Effects:
- Increases real value of debt (debt deflation)
- Can lead to deflationary spiral
- Reduces spending (people wait for lower prices)

## Example question calculating CPI and inflation

Example: Base year basket costs $100. Current year same basket costs $110.

CPI (base year) = 100
CPI (current year) = ($110 / $100) × 100 = 110

Inflation = [(110 - 100) / 100] × 100 = 10%

## Stagflation

**Stagflation** is the combination of:
- Stagnant economic growth (or recession)
- High unemployment
- High inflation

This is problematic because typical policies to fight inflation (reduce spending) worsen unemployment, and policies to reduce unemployment (increase spending) worsen inflation.

## Deflationary spiral

A **deflationary spiral** occurs when:
1. Prices fall
2. Consumers delay purchases (expecting lower prices)
3. Demand decreases further
4. Prices fall more
5. Cycle continues

This can lead to severe economic contraction and is difficult to escape.

## Tracking inflation

Inflation is tracked using various price indices:
- **CPI**: Consumer Price Index (consumer goods)
- **PPI**: Producer Price Index (wholesale prices)
- **GDP Deflator**: Broader measure including all GDP components

## How changes in the cost of living are measured

The CPI measures changes in the cost of living by:
1. Selecting a representative basket of goods and services
2. Tracking prices of items in the basket
3. Calculating weighted average price changes
4. Comparing to base period

Limitations:
- May not reflect individual consumption patterns
- Doesn't account for quality changes
- Substitution bias (people buy cheaper alternatives)

## How the United States and other countries experience inflation

Inflation rates vary by country and over time:
- **Hyperinflation**: Extremely high inflation (e.g., Zimbabwe, 2000s)
- **Moderate inflation**: 2-5% annually (typical target for many countries)
- **Low inflation**: Near 0-2% (many developed countries)
- **Deflation**: Negative inflation (Japan, 1990s-2000s)

Central banks typically target 2% inflation as optimal for economic growth.

## The confusion over inflation and deflation

Common misconceptions:
- Inflation doesn't mean all prices rise (some may fall)
- Deflation isn't always bad (if caused by productivity gains)
- Low inflation is generally preferred to deflation
- Moderate inflation can encourage spending and investment

## Lesson summary: Price indices and inflation

Inflation is a sustained increase in the general price level. CPI measures consumer price changes using a basket of goods. Inflation reduces purchasing power. Deflation can be dangerous, leading to deflationary spirals. Stagflation combines stagnation with inflation. Central banks typically target moderate inflation (around 2%).`,
        importantPoints: [
          'Inflation is a sustained increase in the general price level',
          'CPI measures changes in consumer prices using a basket of goods',
          'Inflation rate = [(CPI current - CPI previous) / CPI previous] × 100',
          'Deflation can lead to deflationary spirals',
          'Stagflation combines stagnation with high inflation',
        ],
      } as ArticleContent,
      {
        id: 'macroecon-u2-l4-practice',
        type: 'practice',
        title: 'Practice: The Consumer Price Index (CPI)',
        exercises: [
          {
            id: 'practice-2-4-1',
            prompt: 'Calculate the CPI and inflation rate: Base year basket = $200, Current year basket = $220.',
            hints: [
              'CPI (base) = 100',
              'CPI (current) = (Current cost / Base cost) × 100',
              'Inflation = [(CPI current - CPI base) / CPI base] × 100',
            ],
          },
          {
            id: 'practice-2-4-2',
            prompt: 'Explain the difference between inflation, deflation, and disinflation. Provide examples of each.',
            hints: [
              'Inflation: prices rising',
              'Deflation: prices falling',
              'Disinflation: inflation rate decreasing',
            ],
          },
          {
            id: 'practice-2-4-3',
            prompt: 'What is stagflation and why is it problematic? How does it differ from normal inflation?',
            hints: [
              'Stagflation = stagnation + inflation',
              'Policies to fix one problem worsen the other',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'macroecon-u2-l4-quiz',
        type: 'quiz',
        title: 'Quiz: Inflation',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-2-5',
    title: 'Costs of Inflation',
    duration: '25 min',
    contentItems: [
      {
        id: 'macroecon-u2-l5-video-1',
        type: 'video',
        title: 'Costs of Inflation',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'macroecon-u2-l5-article',
        type: 'article',
        title: 'Learn: Costs of Inflation',
        content: `# Costs of Inflation

## Winners and losers from inflation and deflation

**Winners from inflation**:
- **Borrowers**: Repay loans with dollars worth less than when borrowed
- **People with fixed-rate debt**: Mortgage holders benefit
- **Asset owners**: Real estate, stocks may increase in nominal value

**Losers from inflation**:
- **Lenders**: Receive repayment in dollars worth less than when lent
- **Savers**: Money loses purchasing power
- **Fixed-income earners**: Wages/pensions don't keep up with prices
- **People holding cash**: Cash loses value

**Winners from deflation**:
- **Lenders**: Receive repayment in dollars worth more
- **Savers**: Money gains purchasing power
- **Fixed-income earners**: Purchasing power increases

**Losers from deflation**:
- **Borrowers**: Repay loans with dollars worth more
- **Businesses**: Falling prices reduce profits
- **Workers**: Often leads to wage cuts and unemployment

## Lesson summary: The costs of inflation

Inflation redistributes wealth from lenders to borrowers and from savers to spenders. It hurts fixed-income earners and those holding cash. Deflation has opposite effects but can be more dangerous, leading to economic contraction. Moderate, predictable inflation is generally preferred to deflation.`,
        importantPoints: [
          'Inflation benefits borrowers and hurts lenders',
          'Inflation reduces purchasing power of savings and fixed incomes',
          'Deflation benefits lenders but can cause economic contraction',
          'Inflation redistributes wealth between different groups',
          'Moderate, predictable inflation is generally preferred',
        ],
      } as ArticleContent,
      {
        id: 'macroecon-u2-l5-practice',
        type: 'practice',
        title: 'Practice: The costs of inflation',
        exercises: [
          {
            id: 'practice-2-5-1',
            prompt: 'Explain who wins and who loses from inflation. Provide specific examples for each group.',
            hints: [
              'Consider borrowers vs lenders',
              'Think about savers and fixed-income earners',
            ],
          },
          {
            id: 'practice-2-5-2',
            prompt: 'If you have a fixed-rate mortgage and inflation increases, are you better or worse off? Explain why.',
            hints: [
              'You repay with dollars worth less',
              'Your real debt decreases',
            ],
          },
          {
            id: 'practice-2-5-3',
            prompt: 'Compare the effects of inflation and deflation on the economy. Why do economists generally prefer moderate inflation to deflation?',
            hints: [
              'Deflation can cause economic contraction',
              'Moderate inflation encourages spending',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'macroecon-u2-l5-quiz',
        type: 'quiz',
        title: 'Quiz: Costs of Inflation',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-2-6',
    title: 'Real vs. nominal GDP',
    duration: '30 min',
    contentItems: [
      {
        id: 'macroecon-u2-l6-video-1',
        type: 'video',
        title: 'Real vs. nominal GDP',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'macroecon-u2-l6-article',
        type: 'article',
        title: 'Learn: Real vs. nominal GDP',
        content: `# Real vs. Nominal GDP

## Real GDP and nominal GDP

**Nominal GDP**: GDP measured in current prices (prices of the year being measured). It includes both quantity and price changes.

**Real GDP**: GDP measured in constant prices (prices of a base year). It shows only quantity changes, removing the effect of inflation.

Real GDP is the better measure of actual economic growth because it isolates changes in production from changes in prices.

## GDP deflator

The **GDP deflator** is a price index that measures the average price level of all goods and services included in GDP.

Formula: GDP Deflator = (Nominal GDP / Real GDP) × 100

The GDP deflator:
- Uses current year quantities (unlike CPI which uses fixed basket)
- Includes all GDP components (not just consumer goods)
- Is broader than CPI

## Example calculating real GDP with a deflator

Example:
- Nominal GDP (Year 2) = $12,000
- GDP Deflator (Year 2) = 120
- Base year = Year 1 (deflator = 100)

Real GDP (Year 2) = (Nominal GDP / GDP Deflator) × 100
Real GDP = ($12,000 / 120) × 100 = $10,000

This shows that in Year 2, output was worth $10,000 in Year 1 prices.

## Adjusting nominal values to real values

To convert nominal to real:
Real Value = (Nominal Value / Price Index) × 100

To convert real to nominal:
Nominal Value = (Real Value × Price Index) / 100

This adjustment removes the effect of inflation, allowing comparison across time periods.

## Lesson summary: Real vs. nominal GDP

Nominal GDP uses current prices; real GDP uses constant base-year prices. Real GDP measures actual production changes, removing inflation effects. The GDP deflator converts between nominal and real GDP. Real GDP is the preferred measure for comparing economic growth over time.`,
        importantPoints: [
          'Nominal GDP uses current prices; real GDP uses constant prices',
          'Real GDP removes inflation effects to show actual production changes',
          'GDP deflator = (Nominal GDP / Real GDP) × 100',
          'Real GDP is better for measuring economic growth',
          'Real value = (Nominal value / Price index) × 100',
        ],
      } as ArticleContent,
      {
        id: 'macroecon-u2-l6-practice',
        type: 'practice',
        title: 'Practice: Real vs. nominal GDP',
        exercises: [
          {
            id: 'practice-2-6-1',
            prompt: 'Calculate real GDP: Nominal GDP = $15,000, GDP Deflator = 125 (base year = 100).',
            hints: [
              'Real GDP = (Nominal GDP / GDP Deflator) × 100',
            ],
          },
          {
            id: 'practice-2-6-2',
            prompt: 'Explain why real GDP is a better measure of economic growth than nominal GDP. Provide an example.',
            hints: [
              'Real GDP removes price changes',
              'Nominal GDP includes both quantity and price changes',
            ],
          },
          {
            id: 'practice-2-6-3',
            prompt: 'If nominal GDP increases by 5% and the GDP deflator increases by 2%, what is the real GDP growth rate?',
            hints: [
              'Real GDP growth ≈ Nominal GDP growth - Inflation',
              'Or use the formula with deflator',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'macroecon-u2-l6-quiz',
        type: 'quiz',
        title: 'Quiz: Real vs. nominal GDP',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-2-7',
    title: 'Business cycles',
    duration: '25 min',
    contentItems: [
      {
        id: 'macroecon-u2-l7-video-1',
        type: 'video',
        title: 'Business cycles',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'macroecon-u2-l7-article',
        type: 'article',
        title: 'Learn: Business cycles',
        content: `# Business Cycles

## The business cycle

The **business cycle** describes the fluctuations in economic activity over time. It consists of alternating periods of expansion and contraction.

**Phases of the business cycle**:

1. **Expansion (Boom)**: Period of economic growth
   - Increasing GDP
   - Rising employment
   - Increasing prices
   - Optimistic business expectations

2. **Peak**: Highest point of economic activity
   - Maximum GDP
   - Low unemployment
   - High inflation risk
   - Economy at capacity

3. **Contraction (Recession)**: Period of economic decline
   - Decreasing GDP (for at least 2 quarters)
   - Rising unemployment
   - Falling prices (or disinflation)
   - Pessimistic expectations

4. **Trough**: Lowest point of economic activity
   - Minimum GDP
   - High unemployment
   - Low inflation
   - Economy below capacity

The cycle then repeats.

## Tracking real GDP over time

Real GDP growth over time shows:
- **Long-term trend**: Upward slope showing economic growth
- **Cyclical fluctuations**: Short-term ups and downs around the trend
- **Volatility**: How much the economy fluctuates

A healthy economy shows:
- Positive long-term growth trend
- Relatively small, infrequent recessions
- Quick recovery from downturns

## Lesson summary: Business cycles

The business cycle consists of expansion, peak, contraction (recession), and trough phases. Real GDP fluctuates around a long-term growth trend. Understanding business cycles helps predict economic conditions and inform policy decisions.`,
        importantPoints: [
          'Business cycle has four phases: expansion, peak, contraction, trough',
          'Recession is defined as two consecutive quarters of negative GDP growth',
          'Real GDP shows long-term growth trend with cyclical fluctuations',
          'Expansions feature growth, employment, and rising prices',
          'Contractions feature decline, unemployment, and falling prices',
        ],
      } as ArticleContent,
      {
        id: 'macroecon-u2-l7-practice',
        type: 'practice',
        title: 'Practice: Business cycles',
        exercises: [
          {
            id: 'practice-2-7-1',
            prompt: 'Draw and label the four phases of the business cycle. Explain what happens to GDP, unemployment, and prices in each phase.',
            hints: [
              'Start with expansion, then peak, contraction, trough',
              'GDP and unemployment move in opposite directions',
            ],
          },
          {
            id: 'practice-2-7-2',
            prompt: 'What is a recession? How is it different from a depression?',
            hints: [
              'Recession: 2+ quarters of negative GDP growth',
              'Depression: severe, prolonged recession',
            ],
          },
          {
            id: 'practice-2-7-3',
            prompt: 'Explain the difference between the long-term growth trend and cyclical fluctuations in real GDP.',
            hints: [
              'Long-term trend shows overall growth',
              'Cyclical fluctuations are short-term ups and downs',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'macroecon-u2-l7-quiz',
        type: 'quiz',
        title: 'Quiz: Business cycles',
        questions: [],
      } as QuizContent,
    ],
  },
];

const unit3Lessons: Lesson[] = [
  {
    id: 'lesson-3-1',
    title: 'Aggregate demand',
    duration: '25 min',
    contentItems: [
      {
        id: 'macroecon-u3-l1-video-1',
        type: 'video',
        title: 'Aggregate demand',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'macroecon-u3-l1-article',
        type: 'article',
        title: 'Learn: Aggregate demand',
        content: `# Aggregate Demand

## Aggregate demand

**Aggregate Demand (AD)** is the total quantity of goods and services that households, businesses, government, and foreign buyers are willing and able to purchase at different price levels.

The AD curve shows the relationship between the price level and the quantity of real GDP demanded.

**Components of AD** (same as GDP):
- **C**: Consumption spending by households
- **I**: Investment spending by businesses
- **G**: Government spending on goods and services
- **X - M**: Net exports (exports minus imports)

AD = C + I + G + (X - M)

The AD curve slopes downward because:
1. **Wealth effect**: Higher prices reduce real wealth, decreasing consumption
2. **Interest rate effect**: Higher prices increase demand for money, raising interest rates, reducing investment
3. **Foreign trade effect**: Higher domestic prices make exports more expensive and imports cheaper, reducing net exports

## Shifts in aggregate demand

The AD curve shifts when factors other than the price level change:

**Factors that increase AD (shift right)**:
- Increase in consumption (higher income, wealth, confidence)
- Increase in investment (lower interest rates, optimistic expectations)
- Increase in government spending
- Increase in net exports (weaker currency, foreign income growth)
- Expansionary monetary policy (lowers interest rates)
- Expansionary fiscal policy (increases spending or cuts taxes)

**Factors that decrease AD (shift left)**:
- Decrease in consumption
- Decrease in investment
- Decrease in government spending
- Decrease in net exports
- Contractionary monetary policy
- Contractionary fiscal policy

## Lesson summary: Aggregate demand

Aggregate demand shows total spending at different price levels. AD = C + I + G + (X - M). The AD curve slopes downward due to wealth, interest rate, and foreign trade effects. The curve shifts when consumption, investment, government spending, or net exports change for reasons other than price level.`,
        importantPoints: [
          'Aggregate demand is total spending on goods and services at different price levels',
          'AD = C + I + G + (X - M)',
          'AD curve slopes downward due to wealth, interest rate, and foreign trade effects',
          'AD shifts when components change for reasons other than price level',
          'Expansionary policies shift AD right; contractionary policies shift AD left',
        ],
      } as ArticleContent,
      {
        id: 'macroecon-u3-l1-practice',
        type: 'practice',
        title: 'Practice: Aggregate Demand',
        exercises: [
          {
            id: 'practice-3-1-1',
            prompt: 'Draw an aggregate demand curve and explain why it slopes downward. Identify the three effects that cause this slope.',
            hints: [
              'Price level on vertical axis, real GDP on horizontal',
              'Three effects: wealth, interest rate, foreign trade',
            ],
          },
          {
            id: 'practice-3-1-2',
            prompt: 'Explain how each of the following would affect aggregate demand: (a) Increase in consumer confidence, (b) Increase in interest rates, (c) Increase in government spending, (d) Appreciation of the domestic currency.',
            hints: [
              'Consumer confidence affects consumption',
              'Interest rates affect investment',
              'Currency appreciation affects net exports',
            ],
          },
          {
            id: 'practice-3-1-3',
            prompt: 'Distinguish between movement along the AD curve and shifts of the AD curve. What causes each?',
            hints: [
              'Price level changes cause movement along the curve',
              'Other factors shift the curve',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'macroecon-u3-l1-quiz',
        type: 'quiz',
        title: 'Quiz: Aggregate demand',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-3-2',
    title: 'Multipliers',
    duration: '30 min',
    contentItems: [
      {
        id: 'macroecon-u3-l2-video-1',
        type: 'video',
        title: 'Multipliers',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'macroecon-u3-l2-article',
        type: 'article',
        title: 'Learn: Multipliers',
        content: `# Multipliers

## MPC and multiplier

**Marginal Propensity to Consume (MPC)** is the fraction of additional income that is spent on consumption.

MPC = Change in Consumption / Change in Income

**Marginal Propensity to Save (MPS)** is the fraction of additional income that is saved.

MPS = Change in Saving / Change in Income

MPC + MPS = 1 (all additional income is either consumed or saved)

**The multiplier effect** shows how an initial change in spending leads to a larger change in GDP.

**Spending multiplier** = 1 / (1 - MPC) = 1 / MPS

The multiplier works because:
1. Initial spending increases income
2. Recipients spend part of that income (based on MPC)
3. That spending becomes income for others
4. Process continues, creating a chain reaction

Example: If MPC = 0.8, then multiplier = 1 / (1 - 0.8) = 1 / 0.2 = 5
A $100 increase in spending leads to a $500 increase in GDP.

## Mathy version of MPC and multiplier (optional)

The spending multiplier can be derived mathematically:

Multiplier = 1 / (1 - MPC)

This comes from the infinite geometric series:
1 + MPC + MPC² + MPC³ + ... = 1 / (1 - MPC)

Each round of spending gets smaller (multiplied by MPC), but the total effect is the sum of all rounds.

## Tax multiplier, MPC, and MPS

**Tax multiplier** shows the effect of a change in taxes on GDP.

Tax Multiplier = -MPC / (1 - MPC) = -MPC / MPS

The tax multiplier is:
- Negative (taxes reduce GDP)
- Smaller in absolute value than the spending multiplier (because taxes affect disposable income, not direct spending)

Example: If MPC = 0.8, tax multiplier = -0.8 / 0.2 = -4
A $100 tax cut leads to a $400 increase in GDP.

**Balanced budget multiplier**: When government spending and taxes increase by the same amount, the net effect on GDP equals the change in spending (multiplier = 1).

## Lesson summary: The expenditure and tax multipliers

MPC is the fraction of additional income spent. The spending multiplier = 1 / (1 - MPC) shows how initial spending changes are amplified. The tax multiplier = -MPC / (1 - MPC) is smaller and negative. Multipliers explain how small policy changes can have large economic effects.`,
        importantPoints: [
          'MPC is the fraction of additional income spent on consumption',
          'Spending multiplier = 1 / (1 - MPC) = 1 / MPS',
          'Tax multiplier = -MPC / (1 - MPC)',
          'Tax multiplier is smaller than spending multiplier',
          'Multipliers show how spending changes are amplified through the economy',
        ],
      } as ArticleContent,
      {
        id: 'macroecon-u3-l2-practice',
        type: 'practice',
        title: 'Practice: Expenditure and Tax Multipliers',
        exercises: [
          {
            id: 'practice-3-2-1',
            prompt: 'Calculate the spending multiplier and tax multiplier if MPC = 0.75. If government spending increases by $200, what is the total change in GDP?',
            hints: [
              'Spending multiplier = 1 / (1 - MPC)',
              'Tax multiplier = -MPC / (1 - MPC)',
              'Change in GDP = Initial change × Multiplier',
            ],
          },
          {
            id: 'practice-3-2-2',
            prompt: 'Explain why the tax multiplier is smaller in absolute value than the spending multiplier.',
            hints: [
              'Taxes affect disposable income, not direct spending',
              'Some of the tax cut is saved, not spent',
            ],
          },
          {
            id: 'practice-3-2-3',
            prompt: 'If MPC = 0.8 and the government increases both spending and taxes by $100, what is the net effect on GDP?',
            hints: [
              'This is the balanced budget multiplier',
              'Net effect equals the change in spending',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'macroecon-u3-l2-quiz',
        type: 'quiz',
        title: 'Quiz: Multipliers',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-3-3',
    title: 'Short-run aggregate supply',
    duration: '25 min',
    contentItems: [
      {
        id: 'macroecon-u3-l3-video-1',
        type: 'video',
        title: 'Short-run aggregate supply',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'macroecon-u3-l3-article',
        type: 'article',
        title: 'Learn: Short-run aggregate supply',
        content: `# Short-Run Aggregate Supply

## Short-run aggregate supply

**Short-Run Aggregate Supply (SRAS)** shows the total quantity of goods and services that firms are willing and able to produce at different price levels in the short run.

The SRAS curve slopes upward because:
1. **Sticky wages**: Wages don't adjust immediately to price changes
2. **Sticky prices**: Some prices are slow to adjust
3. **Misperceptions**: Firms may confuse price level changes with relative price changes
4. **Menu costs**: Costs of changing prices

When the price level rises:
- Firms see higher prices for their products
- Production costs (especially wages) haven't fully adjusted yet
- Profit margins increase
- Firms increase production

## Shifts in short-run aggregate supply

SRAS shifts when factors other than the price level change production costs:

**Factors that increase SRAS (shift right)**:
- Decrease in input prices (wages, raw materials, energy)
- Increase in productivity/technology
- Favorable supply shocks (good weather, discovery of resources)
- Increase in capital stock
- Decrease in business taxes or regulations

**Factors that decrease SRAS (shift left)**:
- Increase in input prices
- Decrease in productivity
- Adverse supply shocks (natural disasters, oil price spikes)
- Decrease in capital stock
- Increase in business taxes or regulations

## Lesson summary: Short-run aggregate supply

The SRAS curve slopes upward because wages and prices are sticky in the short run. Higher price levels increase production when costs haven't fully adjusted. SRAS shifts when input prices, productivity, technology, or supply shocks change.`,
        importantPoints: [
          'SRAS shows production at different price levels in the short run',
          'SRAS slopes upward due to sticky wages and prices',
          'Higher price levels increase production when costs are sticky',
          'SRAS shifts when input costs, productivity, or supply shocks change',
          'Supply shocks can shift SRAS left (adverse) or right (favorable)',
        ],
      } as ArticleContent,
      {
        id: 'macroecon-u3-l3-practice',
        type: 'practice',
        title: 'Practice: Short-run aggregate supply',
        exercises: [
          {
            id: 'practice-3-3-1',
            prompt: 'Draw a short-run aggregate supply curve and explain why it slopes upward. What assumptions about wages and prices underlie this slope?',
            hints: [
              'SRAS slopes upward',
              'Assumes sticky wages and prices',
            ],
          },
          {
            id: 'practice-3-3-2',
            prompt: 'Explain how each of the following affects short-run aggregate supply: (a) Increase in oil prices, (b) Improvement in technology, (c) Increase in minimum wage, (d) Favorable weather for agriculture.',
            hints: [
              'Oil prices affect input costs',
              'Technology affects productivity',
              'Wages affect production costs',
            ],
          },
          {
            id: 'practice-3-3-3',
            prompt: 'What is a supply shock? Give examples of positive and negative supply shocks and explain how each affects SRAS.',
            hints: [
              'Supply shocks are unexpected events affecting production',
              'Positive shocks increase SRAS; negative shocks decrease SRAS',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'macroecon-u3-l3-quiz',
        type: 'quiz',
        title: 'Quiz: Short-run aggregate supply',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-3-4',
    title: 'Long-run aggregate supply',
    duration: '25 min',
    contentItems: [
      {
        id: 'macroecon-u3-l4-video-1',
        type: 'video',
        title: 'Long-run aggregate supply',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'macroecon-u3-l4-article',
        type: 'article',
        title: 'Learn: Long-run aggregate supply',
        content: `# Long-Run Aggregate Supply

## Long-run aggregate supply

**Long-Run Aggregate Supply (LRAS)** shows the total quantity of goods and services that can be produced when all resources are fully employed and all prices (including wages) have fully adjusted.

The LRAS curve is vertical because:
- In the long run, all prices and wages are flexible
- Price level changes don't affect real production
- Output is determined by available resources (labor, capital, technology), not price level
- The economy produces at its potential output (full employment)

**Potential GDP** (or full-employment GDP) is the level of output when:
- All resources are fully utilized
- Unemployment is at the natural rate
- Economy is operating at capacity

## Shifts in long-run aggregate supply

LRAS shifts when the economy's productive capacity changes:

**Factors that increase LRAS (shift right)**:
- Increase in quantity of labor (population growth, immigration)
- Increase in quantity of capital (investment, capital accumulation)
- Improvement in technology
- Increase in human capital (education, training)
- Discovery of new resources
- Institutional improvements (better property rights, less corruption)

**Factors that decrease LRAS (shift left)**:
- Decrease in quantity of labor
- Decrease in quantity of capital (depreciation, war)
- Decline in technology (rare)
- Decrease in human capital
- Depletion of resources
- Institutional deterioration

## Lesson summary: Long-run aggregate supply

The LRAS curve is vertical at potential GDP because in the long run, all prices adjust and output depends only on available resources. LRAS represents the economy's productive capacity. It shifts when resources, technology, or institutions change.`,
        importantPoints: [
          'LRAS is vertical at potential GDP',
          'In the long run, all prices and wages are flexible',
          "Price level doesn't affect real output in the long run",
          "LRAS represents the economy's productive capacity",
          'LRAS shifts when resources, technology, or institutions change',
        ],
      } as ArticleContent,
      {
        id: 'macroecon-u3-l4-practice',
        type: 'practice',
        title: 'Practice: Long-run aggregate supply',
        exercises: [
          {
            id: 'practice-3-4-1',
            prompt: 'Draw a long-run aggregate supply curve and explain why it is vertical. What does this imply about the relationship between price level and output in the long run?',
            hints: [
              'LRAS is vertical',
              'All prices adjust in the long run',
              'Output depends on resources, not price level',
            ],
          },
          {
            id: 'practice-3-4-2',
            prompt: 'Explain how each of the following affects long-run aggregate supply: (a) Increase in population, (b) Improvement in education, (c) Increase in investment, (d) Discovery of new oil reserves.',
            hints: [
              "These affect the economy's productive capacity",
              'All shift LRAS right',
            ],
          },
          {
            id: 'practice-3-4-3',
            prompt: 'What is potential GDP? How does it differ from actual GDP?',
            hints: [
              'Potential GDP is full-employment output',
              'Actual GDP can be above or below potential',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'macroecon-u3-l4-quiz',
        type: 'quiz',
        title: 'Quiz: Long-run aggregate supply',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-3-5',
    title: 'Equilibrium in the AD-AS model',
    duration: '30 min',
    contentItems: [
      {
        id: 'macroecon-u3-l5-video-1',
        type: 'video',
        title: 'Equilibrium in the AD-AS model',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'macroecon-u3-l5-article',
        type: 'article',
        title: 'Learn: Equilibrium in the AD-AS model',
        content: `# Equilibrium in the AD-AS Model

## Short-run and long-run equilibrium and the business cycle

**Short-run equilibrium** occurs where AD intersects SRAS. This determines:
- The price level
- Real GDP
- Employment level

The economy can be:
- **At full employment**: AD intersects SRAS at potential GDP
- **In recessionary gap**: Actual GDP < Potential GDP (unemployment above natural rate)
- **In inflationary gap**: Actual GDP > Potential GDP (unemployment below natural rate)

**Long-run equilibrium** occurs where AD, SRAS, and LRAS all intersect. At this point:
- Economy is at potential GDP
- Unemployment is at natural rate
- All prices have fully adjusted
- No pressure for further price changes

The business cycle reflects movements between short-run and long-run equilibrium.

## Aggregate demand and aggregate supply curves

The **AD-AS model** combines:
- **AD curve**: Downward sloping, shows total spending
- **SRAS curve**: Upward sloping, shows short-run production
- **LRAS curve**: Vertical, shows potential output

Together, these curves determine:
- Equilibrium price level
- Equilibrium real GDP
- Whether economy is at, above, or below potential

## Interpreting the aggregate demand/aggregate supply model

**When AD intersects SRAS to the left of LRAS**:
- Recessionary gap
- Actual GDP < Potential GDP
- Unemployment > Natural rate
- Downward pressure on prices

**When AD intersects SRAS to the right of LRAS**:
- Inflationary gap
- Actual GDP > Potential GDP
- Unemployment < Natural rate
- Upward pressure on prices

**When AD intersects SRAS at LRAS**:
- Long-run equilibrium
- Actual GDP = Potential GDP
- Unemployment = Natural rate
- Stable prices

## Lesson summary: Equilibrium in the AD-AS model

Short-run equilibrium is where AD intersects SRAS. Long-run equilibrium is where all three curves intersect. The economy can be in recessionary gap (below potential), inflationary gap (above potential), or at full employment. The model shows how price level and output are determined.`,
        importantPoints: [
          'Short-run equilibrium is where AD intersects SRAS',
          'Long-run equilibrium is where AD, SRAS, and LRAS all intersect',
          'Recessionary gap: Actual GDP < Potential GDP',
          'Inflationary gap: Actual GDP > Potential GDP',
          'Long-run equilibrium occurs at potential GDP with natural unemployment',
        ],
      } as ArticleContent,
      {
        id: 'macroecon-u3-l5-practice',
        type: 'practice',
        title: 'Practice: Equilibrium in the AD-AS model',
        exercises: [
          {
            id: 'practice-3-5-1',
            prompt: 'Draw an AD-AS model showing AD, SRAS, and LRAS. Label short-run equilibrium, long-run equilibrium, and potential GDP.',
            hints: [
              'AD slopes down, SRAS slopes up, LRAS is vertical',
              'Long-run equilibrium is where all three intersect',
            ],
          },
          {
            id: 'practice-3-5-2',
            prompt: 'Explain the difference between a recessionary gap and an inflationary gap. Show each on an AD-AS diagram.',
            hints: [
              'Recessionary gap: AD/SRAS intersection left of LRAS',
              'Inflationary gap: AD/SRAS intersection right of LRAS',
            ],
          },
          {
            id: 'practice-3-5-3',
            prompt: 'What conditions must be met for the economy to be in long-run equilibrium?',
            hints: [
              'All three curves must intersect',
              'Economy at potential GDP',
              'Unemployment at natural rate',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'macroecon-u3-l5-quiz',
        type: 'quiz',
        title: 'Quiz: Equilibrium in the AD-AS model',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-3-6',
    title: 'Changes in the AD-AS model in the short run',
    duration: '35 min',
    contentItems: [
      {
        id: 'macroecon-u3-l6-video-1',
        type: 'video',
        title: 'Changes in the AD-AS model in the short run',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'macroecon-u3-l6-article',
        type: 'article',
        title: 'Learn: Changes in the AD-AS model in the short run',
        content: `# Changes in the AD-AS Model in the Short Run

## Shifts in aggregate demand

When AD shifts:
- **AD increases (shifts right)**: Higher price level, higher real GDP
- **AD decreases (shifts left)**: Lower price level, lower real GDP

In the short run, AD shifts cause both price and output to change in the same direction.

## Demand-pull inflation under Johnson

**Demand-pull inflation** occurs when aggregate demand increases faster than aggregate supply, pulling prices up.

Example: During the Johnson administration (1960s), increased government spending (Vietnam War, Great Society programs) increased AD, leading to inflation while the economy was already near full employment.

This shows how expansionary fiscal policy can cause inflation when the economy is already at or near capacity.

## Real GDP driving price

In the short run, changes in real GDP (output) can drive price level changes:
- When output increases beyond potential, firms face capacity constraints
- They raise prices to ration limited production
- This creates upward pressure on prices

The relationship between output and prices depends on where the economy is relative to potential GDP.

## Cost-push inflation

**Cost-push inflation** (supply-side inflation) occurs when aggregate supply decreases, pushing prices up while output falls.

Causes:
- Increase in input prices (oil, wages, raw materials)
- Adverse supply shocks
- Increase in production costs

Result: Higher price level, lower real GDP (stagflation)

Example: 1970s oil price shocks increased production costs, shifting SRAS left, causing both inflation and recession.

## Shifts in aggregate supply

When SRAS shifts:
- **SRAS increases (shifts right)**: Lower price level, higher real GDP
- **SRAS decreases (shifts left)**: Higher price level, lower real GDP

Supply shifts cause price and output to move in opposite directions.

## Shifts in the AD/AS model

Combined effects when both AD and SRAS shift:

**Both increase**:
- Output definitely increases
- Price change is ambiguous

**Both decrease**:
- Output definitely decreases
- Price change is ambiguous

**AD increases, SRAS decreases**:
- Price definitely increases
- Output change is ambiguous

**AD decreases, SRAS increases**:
- Price definitely decreases
- Output change is ambiguous

## How the AD/AS model incorporates growth, unemployment, and inflation

**Economic growth**: Shown by rightward shift in LRAS (increase in potential GDP)

**Unemployment**: 
- Above natural rate when actual GDP < potential GDP
- Below natural rate when actual GDP > potential GDP

**Inflation**:
- Demand-pull: AD increases faster than SRAS
- Cost-push: SRAS decreases
- Occurs when actual GDP > potential GDP (inflationary gap)

The model shows how these macroeconomic variables are interconnected.

## Lesson summary: Changes in the AD-AS model in the short run

AD shifts change both price and output in the same direction. SRAS shifts change price and output in opposite directions. Demand-pull inflation occurs when AD increases; cost-push inflation occurs when SRAS decreases. The model shows how growth, unemployment, and inflation are determined by AD and AS interactions.`,
        importantPoints: [
          'AD shifts change price and output in the same direction',
          'SRAS shifts change price and output in opposite directions',
          'Demand-pull inflation: AD increases faster than supply',
          'Cost-push inflation: SRAS decreases (supply shock)',
          'The model shows how growth, unemployment, and inflation are interconnected',
        ],
      } as ArticleContent,
      {
        id: 'macroecon-u3-l6-practice',
        type: 'practice',
        title: 'Practice: Changes in the AD-AS model in the short run',
        exercises: [
          {
            id: 'practice-3-6-1',
            prompt: 'Show on an AD-AS diagram what happens when aggregate demand increases. What happens to price level and real GDP?',
            hints: [
              'AD shifts right',
              'Both price and output increase',
            ],
          },
          {
            id: 'practice-3-6-2',
            prompt: 'Explain the difference between demand-pull and cost-push inflation. Show each on an AD-AS diagram.',
            hints: [
              'Demand-pull: AD increases',
              'Cost-push: SRAS decreases',
            ],
          },
          {
            id: 'practice-3-6-3',
            prompt: 'If both AD and SRAS increase, what can you say definitively about the change in output? What about price level?',
            hints: [
              'Both shifts increase output',
              'Price change depends on relative magnitudes',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'macroecon-u3-l6-quiz',
        type: 'quiz',
        title: 'Quiz: Changes in the AD-AS model',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-3-7',
    title: 'Long-run self-adjustment',
    duration: '25 min',
    contentItems: [
      {
        id: 'macroecon-u3-l7-video-1',
        type: 'video',
        title: 'Long-run self-adjustment',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'macroecon-u3-l7-article',
        type: 'article',
        title: 'Learn: Long-run self-adjustment',
        content: `# Long-Run Self-Adjustment

## Long-run self-adjustment

**Long-run self-adjustment** is the process by which the economy automatically returns to potential GDP without government intervention.

**Recessionary gap adjustment**:
1. Actual GDP < Potential GDP (unemployment > natural rate)
2. High unemployment puts downward pressure on wages
3. Lower wages reduce production costs
4. SRAS shifts right
5. Price level falls, output increases
6. Economy returns to potential GDP

**Inflationary gap adjustment**:
1. Actual GDP > Potential GDP (unemployment < natural rate)
2. Low unemployment puts upward pressure on wages
3. Higher wages increase production costs
4. SRAS shifts left
5. Price level rises, output decreases
6. Economy returns to potential GDP

**Key assumption**: Wages and prices are flexible in the long run, allowing automatic adjustment.

## Speed of adjustment

The speed of self-adjustment depends on:
- How quickly wages and prices adjust
- Labor market flexibility
- Expectations of workers and firms
- Institutional factors

In reality, adjustment can be slow, which is why governments often use fiscal and monetary policy to speed up the process.

## Lesson summary: Long-run self-adjustment in the AD-AS model

The economy self-adjusts to potential GDP in the long run. Recessionary gaps lead to falling wages and prices, shifting SRAS right. Inflationary gaps lead to rising wages and prices, shifting SRAS left. This assumes flexible wages and prices. Adjustment may be slow, justifying policy intervention.`,
        importantPoints: [
          'The economy automatically returns to potential GDP in the long run',
          'Recessionary gaps cause falling wages/prices, shifting SRAS right',
          'Inflationary gaps cause rising wages/prices, shifting SRAS left',
          'Self-adjustment assumes flexible wages and prices',
          'Adjustment can be slow, justifying policy intervention',
        ],
      } as ArticleContent,
      {
        id: 'macroecon-u3-l7-practice',
        type: 'practice',
        title: 'Practice: Long-run self-adjustment in the AD-AS model',
        exercises: [
          {
            id: 'practice-3-7-1',
            prompt: 'Explain the process of long-run self-adjustment from a recessionary gap. Show this on an AD-AS diagram.',
            hints: [
              'Start with AD/SRAS intersection left of LRAS',
              'Wages fall, SRAS shifts right',
              'Economy returns to potential GDP',
            ],
          },
          {
            id: 'practice-3-7-2',
            prompt: 'Explain the process of long-run self-adjustment from an inflationary gap. Show this on an AD-AS diagram.',
            hints: [
              'Start with AD/SRAS intersection right of LRAS',
              'Wages rise, SRAS shifts left',
              'Economy returns to potential GDP',
            ],
          },
          {
            id: 'practice-3-7-3',
            prompt: 'Why might the self-adjustment process be slow? What are the implications for economic policy?',
            hints: [
              'Wages and prices may be sticky',
              'Policy can speed up adjustment',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'macroecon-u3-l7-quiz',
        type: 'quiz',
        title: 'Quiz: Long-run self-adjustment',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-3-8',
    title: 'Fiscal policy',
    duration: '30 min',
    contentItems: [
      {
        id: 'macroecon-u3-l8-video-1',
        type: 'video',
        title: 'Fiscal policy',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'macroecon-u3-l8-article',
        type: 'article',
        title: 'Learn: Fiscal policy',
        content: `# Fiscal Policy

## Fiscal policy to address output gaps

**Fiscal policy** is the use of government spending and taxation to influence the economy.

**Expansionary fiscal policy** (to close recessionary gap):
- Increase government spending
- Decrease taxes
- Both increase aggregate demand
- Shifts AD right, increasing output and price level

**Contractionary fiscal policy** (to close inflationary gap):
- Decrease government spending
- Increase taxes
- Both decrease aggregate demand
- Shifts AD left, decreasing output and price level

## Calculating change in spending or taxes to close output gaps

To close a recessionary gap:
- Calculate the output gap: Potential GDP - Actual GDP
- Determine required change in AD
- Use multiplier to find required change in spending or taxes

**Using spending multiplier**:
Required change in spending = Output gap / Spending multiplier

**Using tax multiplier**:
Required change in taxes = Output gap / |Tax multiplier|

Note: Tax changes are opposite sign (cut taxes to increase AD).

Example: Output gap = $500 billion, MPC = 0.8
- Spending multiplier = 5
- Required spending increase = $500 / 5 = $100 billion
- Tax multiplier = -4
- Required tax cut = $500 / 4 = $125 billion

## Tax lever of fiscal policy

Taxes affect the economy through:
1. **Direct effect on disposable income**: Lower taxes increase disposable income, increasing consumption
2. **Multiplier effect**: Initial consumption increase leads to further spending
3. **Incentive effects**: Lower taxes can encourage work and investment

**Tax cuts vs. spending increases**:
- Both increase AD
- Spending increases have larger immediate impact (larger multiplier)
- Tax cuts may be saved (reducing multiplier effect)
- Tax cuts may have supply-side benefits (encourage work/investment)

## Lesson summary: Fiscal policy

Fiscal policy uses government spending and taxes to influence AD. Expansionary policy increases AD to close recessionary gaps; contractionary policy decreases AD to close inflationary gaps. The required policy change depends on the output gap and the multiplier. Both spending and tax changes can be effective, with different trade-offs.`,
        importantPoints: [
          'Fiscal policy uses government spending and taxes to influence AD',
          'Expansionary policy increases AD; contractionary policy decreases AD',
          'Required change = Output gap / Multiplier',
          'Spending multiplier is larger than tax multiplier',
          'Tax cuts and spending increases both affect AD but have different impacts',
        ],
      } as ArticleContent,
      {
        id: 'macroecon-u3-l8-practice',
        type: 'practice',
        title: 'Practice: Fiscal policy',
        exercises: [
          {
            id: 'practice-3-8-1',
            prompt: 'If the economy is in a recessionary gap, what fiscal policy actions should the government take? Show the effect on an AD-AS diagram.',
            hints: [
              'Increase spending or cut taxes',
              'AD shifts right',
            ],
          },
          {
            id: 'practice-3-8-2',
            prompt: 'Calculate the required change in government spending to close a $400 billion recessionary gap if MPC = 0.75.',
            hints: [
              'Spending multiplier = 1 / (1 - MPC)',
              'Required spending = Output gap / Multiplier',
            ],
          },
          {
            id: 'practice-3-8-3',
            prompt: 'Compare the effectiveness of a tax cut versus a spending increase for closing a recessionary gap. Which has a larger impact and why?',
            hints: [
              'Spending multiplier > Tax multiplier',
              'Some tax cuts may be saved',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'macroecon-u3-l8-quiz',
        type: 'quiz',
        title: 'Quiz: Fiscal policy',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-3-9',
    title: 'Automatic stabilizers',
    duration: '20 min',
    contentItems: [
      {
        id: 'macroecon-u3-l9-video-1',
        type: 'video',
        title: 'Automatic stabilizers',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'macroecon-u3-l9-article',
        type: 'article',
        title: 'Learn: Automatic stabilizers',
        content: `# Automatic Stabilizers

## Automatic stabilizers

**Automatic stabilizers** are government programs that automatically increase spending or decrease taxes during economic downturns, and decrease spending or increase taxes during economic expansions, without explicit legislative action.

**How they work**:
- During recessions: Automatically increase transfer payments and decrease tax collections
- During expansions: Automatically decrease transfer payments and increase tax collections
- They stabilize the economy automatically

**Examples of automatic stabilizers**:

1. **Unemployment insurance**: 
   - Recession: More people unemployed → More benefits paid → Increases AD
   - Expansion: Fewer people unemployed → Fewer benefits paid → Decreases AD

2. **Progressive income taxes**:
   - Recession: Incomes fall → People move to lower tax brackets → Tax revenue falls → Increases disposable income
   - Expansion: Incomes rise → People move to higher tax brackets → Tax revenue rises → Decreases disposable income

3. **Welfare programs** (food stamps, Medicaid):
   - Recession: More people qualify → More spending → Increases AD
   - Expansion: Fewer people qualify → Less spending → Decreases AD

4. **Corporate taxes**:
   - Recession: Profits fall → Tax revenue falls → Increases after-tax profits (slightly)
   - Expansion: Profits rise → Tax revenue rises → Decreases after-tax profits

## Advantages of automatic stabilizers

- **Timely**: Act immediately, no legislative delay
- **Automatic**: No political decision-making required
- **Counter-cyclical**: Automatically offset economic fluctuations
- **Reduce volatility**: Smooth out business cycles

## Limitations

- **May not be sufficient**: May not fully close large output gaps
- **Can create deficits**: Automatic increases in spending during recessions
- **No fine-tuning**: Can't target specific problems

## Lesson summary: Automatic stabilizers

Automatic stabilizers are government programs that automatically stabilize the economy without explicit action. They increase spending/decrease taxes during recessions and decrease spending/increase taxes during expansions. Examples include unemployment insurance, progressive taxes, and welfare programs. They provide timely, automatic counter-cyclical effects but may not be sufficient for large economic problems.`,
        importantPoints: [
          'Automatic stabilizers work without explicit legislative action',
          'They increase spending/decrease taxes during recessions',
          'They decrease spending/increase taxes during expansions',
          'Examples: unemployment insurance, progressive taxes, welfare',
          'They provide timely, automatic counter-cyclical effects',
        ],
      } as ArticleContent,
      {
        id: 'macroecon-u3-l9-practice',
        type: 'practice',
        title: 'Practice: Automatic stabilizers',
        exercises: [
          {
            id: 'practice-3-9-1',
            prompt: 'Explain how unemployment insurance acts as an automatic stabilizer during both recessions and expansions.',
            hints: [
              'During recession: more benefits paid',
              'During expansion: fewer benefits paid',
            ],
          },
          {
            id: 'practice-3-9-2',
            prompt: 'How do progressive income taxes automatically stabilize the economy?',
            hints: [
              'Tax revenue changes automatically with income',
              'During recession: lower taxes',
              'During expansion: higher taxes',
            ],
          },
          {
            id: 'practice-3-9-3',
            prompt: 'Compare automatic stabilizers to discretionary fiscal policy. What are the advantages and disadvantages of each?',
            hints: [
              'Automatic: timely, no political delay',
              'Discretionary: can target specific problems',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'macroecon-u3-l9-quiz',
        type: 'quiz',
        title: 'Quiz: Automatic stabilizers',
        questions: [],
      } as QuizContent,
    ],
  },
];

const unit4Lessons: Lesson[] = [
  {
    id: 'lesson-4-1',
    title: 'Financial assets',
    duration: '30 min',
    contentItems: [
      {
        id: 'macroecon-u4-l1-video-1',
        type: 'video',
        title: 'Financial assets',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'macroecon-u4-l1-article',
        type: 'article',
        title: 'Learn: Financial assets',
        content: `# Financial Assets

## Introduction to interest

**Interest** is the price paid for borrowing money or the return earned on lending money.

**Interest rate** is expressed as a percentage of the principal (amount borrowed/lent) per period.

Key concepts:
- **Principal**: The original amount borrowed or invested
- **Interest**: The cost of borrowing or return on lending
- **Simple interest**: Interest calculated only on principal
- **Compound interest**: Interest calculated on principal plus accumulated interest

Interest rates reflect:
- Time value of money (money today is worth more than money tomorrow)
- Risk (higher risk = higher interest rate)
- Inflation expectations
- Supply and demand for loanable funds

## Introduction to bonds

A **bond** is a debt instrument where an investor loans money to an entity (government, corporation) for a defined period at a fixed or variable interest rate.

**Bond characteristics**:
- **Face value (par value)**: Amount repaid at maturity
- **Coupon rate**: Annual interest payment as percentage of face value
- **Maturity date**: When the bond is repaid
- **Issuer**: Entity borrowing the money

**Types of bonds**:
- **Government bonds**: Issued by governments (Treasury bonds, municipal bonds)
- **Corporate bonds**: Issued by corporations
- **Zero-coupon bonds**: No periodic interest, sold at discount

## Relationship between bond prices and interest rates

**Inverse relationship**: Bond prices and interest rates move in opposite directions.

When interest rates rise:
- Existing bonds with lower coupon rates become less attractive
- Bond prices fall to make them competitive with new bonds

When interest rates fall:
- Existing bonds with higher coupon rates become more attractive
- Bond prices rise

**Example**: A bond paying 5% interest becomes less valuable when new bonds pay 7%. Its price must fall to yield 7% to new buyers.

## What it means to buy a company's stock

A **stock** (share) represents ownership in a corporation.

**Stock ownership**:
- **Equity**: Ownership stake in the company
- **Dividends**: Share of company profits paid to shareholders (if declared)
- **Capital gains**: Profit from selling stock at higher price than purchased
- **Voting rights**: Right to vote on corporate matters (for common stock)

**Stock characteristics**:
- **Common stock**: Voting rights, variable dividends
- **Preferred stock**: Fixed dividends, priority in liquidation, usually no voting rights
- **Stock price**: Determined by supply and demand in stock market
- **Market capitalization**: Total value of all company shares

## Bonds vs. stocks

**Bonds**:
- Debt instrument (loan)
- Fixed interest payments
- Repayment of principal at maturity
- Lower risk (if issuer is creditworthy)
- Creditors have priority in bankruptcy
- No ownership stake

**Stocks**:
- Equity instrument (ownership)
- Variable dividends (or none)
- No maturity date
- Higher risk and potential return
- Shareholders are residual claimants
- Ownership stake with voting rights

**Key differences**:
- Bonds = lending money; Stocks = owning part of company
- Bonds = fixed returns; Stocks = variable returns
- Bonds = lower risk; Stocks = higher risk
- Bonds = priority in bankruptcy; Stocks = last in line

## Lesson summary: Financial assets

Interest is the price of borrowing money. Bonds are debt instruments with fixed payments. Bond prices and interest rates move inversely. Stocks represent ownership in companies with variable returns. Bonds are lower risk with fixed returns; stocks are higher risk with potential for higher returns.`,
        importantPoints: [
          'Interest is the price paid for borrowing money',
          'Bonds are debt instruments with fixed interest payments',
          'Bond prices and interest rates move in opposite directions',
          'Stocks represent ownership in companies',
          'Bonds are lower risk; stocks are higher risk with higher potential returns',
        ],
      } as ArticleContent,
      {
        id: 'macroecon-u4-l1-practice',
        type: 'practice',
        title: 'Practice: Financial assets',
        exercises: [
          {
            id: 'practice-4-1-1',
            prompt: 'Explain the inverse relationship between bond prices and interest rates. Use an example to illustrate.',
            hints: [
              'When interest rates rise, existing bonds become less attractive',
              'Bond prices must fall to compete with new bonds',
            ],
          },
          {
            id: 'practice-4-1-2',
            prompt: 'Compare and contrast bonds and stocks. What are the key differences in terms of risk, return, and ownership?',
            hints: [
              'Bonds = debt, Stocks = equity',
              'Bonds = fixed returns, Stocks = variable returns',
            ],
          },
          {
            id: 'practice-4-1-3',
            prompt: 'If you buy a company\'s stock, what rights and potential returns do you receive?',
            hints: [
              'Ownership stake',
              'Dividends and capital gains',
              'Voting rights (for common stock)',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'macroecon-u4-l1-quiz',
        type: 'quiz',
        title: 'Quiz: Financial assets',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-4-2',
    title: 'Nominal vs. real interest rates',
    duration: '30 min',
    contentItems: [
      {
        id: 'macroecon-u4-l2-video-1',
        type: 'video',
        title: 'Nominal vs. real interest rates',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'macroecon-u4-l2-article',
        type: 'article',
        title: 'Learn: Nominal vs. real interest rates',
        content: `# Nominal vs. Real Interest Rates

## Real and nominal return

**Nominal return** is the return on an investment without adjusting for inflation. It's the stated interest rate.

**Real return** is the return adjusted for inflation. It shows the actual purchasing power gained.

Formula: Real Return = Nominal Return - Inflation Rate

Example: If you earn 5% nominal return and inflation is 2%, your real return is 3%.

## Calculating real return in last year's dollars

To calculate real return in terms of last year's purchasing power:

Real Return = [(1 + Nominal Return) / (1 + Inflation Rate)] - 1

Or approximately: Real Return ≈ Nominal Return - Inflation Rate

Example:
- Nominal return: 6%
- Inflation: 3%
- Real return = [(1.06) / (1.03)] - 1 = 0.0291 = 2.91%

## Nominal interest, real interest, and inflation calculations

**Nominal interest rate**: The stated interest rate (not adjusted for inflation)

**Real interest rate**: Nominal interest rate minus inflation rate

**Fisher equation**: (1 + Nominal Rate) = (1 + Real Rate) × (1 + Inflation Rate)

For small values, this simplifies to:
Nominal Rate ≈ Real Rate + Inflation Rate

Rearranging:
Real Rate ≈ Nominal Rate - Inflation Rate

## Relation between nominal and real returns and inflation

**Key relationships**:
- Real return = Nominal return - Inflation
- If inflation > nominal return, real return is negative (losing purchasing power)
- If inflation = nominal return, real return = 0 (maintaining purchasing power)
- If inflation < nominal return, real return is positive (gaining purchasing power)

**Why it matters**:
- Investors care about real returns (purchasing power)
- Lenders need to charge enough to cover inflation plus desired real return
- Borrowers benefit from inflation if nominal rates don't fully adjust

## Indexing and its limitations

**Indexing** (inflation indexing) adjusts payments for inflation to maintain real value.

**Examples**:
- **TIPS** (Treasury Inflation-Protected Securities): Bonds with principal adjusted for inflation
- **COLA** (Cost-of-Living Adjustments): Social Security payments adjusted for inflation
- **Indexed wages**: Wages that automatically adjust for inflation

**Limitations**:
- Index may not reflect individual's actual cost of living
- Measurement issues with inflation indices
- Time lag in adjustments
- May not account for quality changes

## Lesson summary: Nominal vs. real interest rates

Nominal return is the stated return; real return adjusts for inflation. Real return = Nominal return - Inflation. The Fisher equation relates nominal, real, and inflation rates. Real returns matter for purchasing power. Indexing adjusts payments for inflation but has limitations.`,
        importantPoints: [
          'Nominal return is the stated return; real return adjusts for inflation',
          'Real return = Nominal return - Inflation rate',
          'Real returns show actual purchasing power gained',
          'Fisher equation: (1 + Nominal) = (1 + Real) × (1 + Inflation)',
          'Indexing adjusts payments for inflation but has limitations',
        ],
      } as ArticleContent,
      {
        id: 'macroecon-u4-l2-practice',
        type: 'practice',
        title: 'Practice: Nominal vs. real interest rates',
        exercises: [
          {
            id: 'practice-4-2-1',
            prompt: 'Calculate the real interest rate if the nominal interest rate is 7% and inflation is 3%.',
            hints: [
              'Real rate ≈ Nominal rate - Inflation rate',
              'Or use Fisher equation for exact calculation',
            ],
          },
          {
            id: 'practice-4-2-2',
            prompt: 'If you earn a 4% nominal return on a savings account and inflation is 5%, what is your real return? Are you gaining or losing purchasing power?',
            hints: [
              'Real return = Nominal - Inflation',
              'Negative real return means losing purchasing power',
            ],
          },
          {
            id: 'practice-4-2-3',
            prompt: 'Explain why investors care about real returns rather than nominal returns. Provide an example.',
            hints: [
              'Real returns show purchasing power',
              'Nominal returns can be misleading with inflation',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'macroecon-u4-l2-quiz',
        type: 'quiz',
        title: 'Quiz: Nominal vs. real interest rates',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-4-3',
    title: 'Definition, measurement, and functions of money',
    duration: '30 min',
    contentItems: [
      {
        id: 'macroecon-u4-l3-video-1',
        type: 'video',
        title: 'Definition, measurement, and functions of money',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'macroecon-u4-l3-article',
        type: 'article',
        title: 'Learn: Definition, measurement, and functions of money',
        content: `# Definition, Measurement, and Functions of Money

## Money supply: M0, M1, and M2

Money supply is measured in different ways:

**M0 (Monetary Base)**:
- Currency in circulation
- Reserves held by banks at central bank
- Most liquid, narrowest measure

**M1 (Narrow Money)**:
- Currency in circulation
- Checkable deposits (demand deposits)
- Traveler's checks
- Most liquid assets used for transactions

**M2 (Broad Money)**:
- M1 plus
- Savings deposits
- Small time deposits
- Money market mutual funds
- Broader measure including near-money

M2 > M1 > M0 (each includes the previous plus additional components)

## Functions of money

Money serves four main functions:

1. **Medium of exchange**: Used to buy and sell goods and services
   - Eliminates need for barter
   - Facilitates trade

2. **Unit of account**: Standard measure of value
   - Prices quoted in money terms
   - Allows comparison of values

3. **Store of value**: Holds value over time
   - Can save money for future use
   - Inflation reduces this function

4. **Standard of deferred payment**: Used for future payments
   - Contracts specify payments in money
   - Loans repaid in money

## Standard of deferred payment and legal tender

**Standard of deferred payment**: Money is used to settle debts and make future payments. Contracts specify amounts in monetary terms.

**Legal tender**: Currency that must be accepted for payment of debts. Governments declare what is legal tender.

In the U.S.:
- Federal Reserve notes are legal tender
- Private businesses can refuse cash (with some exceptions)
- Legal tender laws ensure money is accepted for debts

## Commodity money vs. fiat money

**Commodity money**: Money that has intrinsic value (value as a commodity itself).

Examples:
- Gold coins (value as gold)
- Silver coins
- Cigarettes in prisons

**Fiat money**: Money that has no intrinsic value but is accepted because:
- Government declares it legal tender
- People trust it will be accepted
- Backed by government's ability to tax

Examples:
- Modern paper currency
- Digital currency

Most modern money is fiat money.

## When the functions of money break down: Hyperinflation

During hyperinflation, money loses its functions:
- **Medium of exchange**: People refuse to accept money, use barter
- **Unit of account**: Prices change too rapidly to be meaningful
- **Store of value**: Money loses value rapidly
- **Standard of deferred payment**: Contracts become meaningless

People switch to:
- Foreign currency
- Barter
- Commodities (gold, food)

## Hyperinflation

**Hyperinflation** is extremely rapid inflation (typically >50% per month).

**Causes**:
- Excessive money printing
- Loss of confidence in currency
- Government deficits financed by printing money

**Effects**:
- Money becomes worthless
- Economic collapse
- Social unrest
- Return to barter or foreign currency

**Examples**:
- Germany (1920s): Prices doubled every few days
- Zimbabwe (2000s): Inflation reached millions of percent
- Venezuela (2010s): Hyperinflation destroyed economy

## Lesson summary: Definition, measurement, and functions of money

Money supply is measured as M0, M1, and M2. Money serves as medium of exchange, unit of account, store of value, and standard of deferred payment. Commodity money has intrinsic value; fiat money is accepted by government decree. Hyperinflation destroys money's functions, causing economic collapse.`,
        importantPoints: [
          'Money supply measured as M0 (narrowest), M1, and M2 (broadest)',
          'Money serves four functions: medium of exchange, unit of account, store of value, standard of deferred payment',
          'Commodity money has intrinsic value; fiat money is government-backed',
          'Hyperinflation destroys money\'s functions',
          'Legal tender is currency that must be accepted for debts',
        ],
      } as ArticleContent,
      {
        id: 'macroecon-u4-l3-practice',
        type: 'practice',
        title: 'Practice: Definition, measurement, and functions of money',
        exercises: [
          {
            id: 'practice-4-3-1',
            prompt: 'Explain the four functions of money and provide examples of each.',
            hints: [
              'Medium of exchange: used for transactions',
              'Unit of account: measure of value',
              'Store of value: holds value over time',
              'Standard of deferred payment: future payments',
            ],
          },
          {
            id: 'practice-4-3-2',
            prompt: 'Distinguish between M0, M1, and M2. What components does each include?',
            hints: [
              'M0: currency and reserves',
              'M1: M0 plus checkable deposits',
              'M2: M1 plus savings and time deposits',
            ],
          },
          {
            id: 'practice-4-3-3',
            prompt: 'Compare commodity money and fiat money. What are the advantages and disadvantages of each?',
            hints: [
              'Commodity money has intrinsic value',
              'Fiat money relies on government backing',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'macroecon-u4-l3-quiz',
        type: 'quiz',
        title: 'Quiz: Definition, measurement, and functions of money',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-4-4',
    title: 'Banking and the expansion of the money supply',
    duration: '35 min',
    contentItems: [
      {
        id: 'macroecon-u4-l4-video-1',
        type: 'video',
        title: 'Banking and the expansion of the money supply',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'macroecon-u4-l4-article',
        type: 'article',
        title: 'Learn: Banking and the expansion of the money supply',
        content: `# Banking and the Expansion of the Money Supply

## Overview of fractional reserve banking

**Fractional reserve banking** is a system where banks hold only a fraction of deposits as reserves and lend out the rest.

**Key features**:
- Banks don't hold 100% of deposits
- Reserves are a fraction of deposits
- Banks create money through lending
- System allows money supply expansion

**Reserve requirement**: Minimum fraction of deposits banks must hold as reserves (set by central bank).

## Money creation in a fractional reserve system

Banks create money through the lending process:

1. Bank receives deposit (e.g., $1000)
2. Bank holds required reserves (e.g., 10% = $100)
3. Bank lends out excess reserves (e.g., $900)
4. Borrower spends the loan
5. Money ends up in another bank
6. Process repeats

**Money multiplier**: Shows how much the money supply increases from initial deposit.

Money Multiplier = 1 / Reserve Requirement

Example: If reserve requirement = 10%, multiplier = 1 / 0.10 = 10
$1000 deposit can create up to $10,000 in money supply.

## Weaknesses of fractional reserve banking

**Problems**:
1. **Bank runs**: If many depositors withdraw simultaneously, bank may not have enough reserves
2. **Liquidity risk**: Banks may not be able to meet withdrawal demands
3. **Credit risk**: Borrowers may default on loans
4. **Systemic risk**: Failure of one bank can affect others
5. **Moral hazard**: Banks may take excessive risks knowing deposits are insured

**Protections**:
- Deposit insurance (FDIC in U.S.)
- Reserve requirements
- Central bank as lender of last resort
- Banking regulations

## Full reserve banking

**Full reserve banking** requires banks to hold 100% of deposits as reserves.

**Characteristics**:
- No money creation through lending
- Banks act as safe storage only
- No risk of bank runs
- Lower potential for financial crises

**Disadvantages**:
- No credit creation
- Less economic growth potential
- Banks can't earn interest on loans
- Higher banking costs

## Simple fractional reserve accounting (part 1)

**Bank balance sheet basics**:

**Assets**:
- Reserves (cash + deposits at central bank)
- Loans
- Securities

**Liabilities**:
- Deposits
- Borrowings

**Equity**:
- Capital (assets - liabilities)

When a bank makes a loan:
- Assets increase (loan)
- Liabilities increase (deposit created)

## Simple fractional reserve accounting (part 2)

**Example**: Bank receives $1000 deposit, reserve requirement = 10%

**Initial**:
- Assets: Reserves $1000
- Liabilities: Deposits $1000

**After lending $900**:
- Assets: Reserves $100, Loans $900
- Liabilities: Deposits $1000

**Money supply**: Original $1000 + $900 loan = $1900

The $900 loan becomes a deposit elsewhere, continuing the process.

## Lesson summary: Banking and the expansion of the money supply

Fractional reserve banking allows banks to hold only a fraction of deposits as reserves. Banks create money through lending. The money multiplier shows how deposits expand the money supply. Fractional reserve banking has risks (bank runs, liquidity) but enables credit creation. Full reserve banking eliminates these risks but prevents money creation.`,
        importantPoints: [
          'Fractional reserve banking allows banks to lend most deposits',
          'Banks create money through the lending process',
          'Money multiplier = 1 / Reserve requirement',
          'Fractional reserve banking has risks but enables credit creation',
          'Full reserve banking prevents money creation but eliminates bank run risk',
        ],
      } as ArticleContent,
      {
        id: 'macroecon-u4-l4-practice',
        type: 'practice',
        title: 'Practice: Introduction to fractional reserve banking, The money multiplier and the expansion of the money supply',
        exercises: [
          {
            id: 'practice-4-4-1',
            prompt: 'Explain how a bank creates money in a fractional reserve system. Use a numerical example with a 10% reserve requirement.',
            hints: [
              'Bank receives deposit',
              'Holds required reserves',
              'Lends excess reserves',
              'Process continues',
            ],
          },
          {
            id: 'practice-4-4-2',
            prompt: 'Calculate the money multiplier if the reserve requirement is 20%. If a bank receives a $5000 deposit, what is the maximum increase in money supply?',
            hints: [
              'Money multiplier = 1 / Reserve requirement',
              'Maximum increase = Initial deposit × Multiplier',
            ],
          },
          {
            id: 'practice-4-4-3',
            prompt: 'Compare fractional reserve banking and full reserve banking. What are the advantages and disadvantages of each?',
            hints: [
              'Fractional reserve: enables money creation but has risks',
              'Full reserve: no money creation but safer',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'macroecon-u4-l4-quiz',
        type: 'quiz',
        title: 'Quiz: Banking and the expansion of the money supply',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-4-5',
    title: 'The money market',
    duration: '25 min',
    contentItems: [
      {
        id: 'macroecon-u4-l5-video-1',
        type: 'video',
        title: 'The money market',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'macroecon-u4-l5-article',
        type: 'article',
        title: 'Learn: The money market',
        content: `# The Money Market

## Demand curve for money in the money market

The **demand for money** is the amount of money people want to hold.

**Reasons to hold money**:
1. **Transactions demand**: Need money for daily purchases
2. **Precautionary demand**: Hold money for unexpected expenses
3. **Speculative demand**: Hold money to take advantage of investment opportunities

**Demand curve for money**:
- **Downward sloping**: As interest rates rise, opportunity cost of holding money increases
- People hold less money (invest more) when interest rates are high
- People hold more money (invest less) when interest rates are low

**Factors affecting money demand**:
- **Income**: Higher income → More transactions → More money demand
- **Price level**: Higher prices → Need more money for same transactions
- **Interest rates**: Higher rates → Higher opportunity cost → Less money demand

## Equilibrium nominal interest rates in the money market

**Money market equilibrium** occurs where money supply equals money demand.

**Equilibrium interest rate**: The interest rate at which quantity of money supplied equals quantity of money demanded.

**How equilibrium is reached**:
- If interest rate is too high: Money supply > Money demand → Interest rate falls
- If interest rate is too low: Money demand > Money supply → Interest rate rises
- At equilibrium: Money supply = Money demand → Interest rate is stable

## Money supply and demand impacting interest rates

**When money supply increases** (shifts right):
- More money available
- Interest rate falls
- Quantity of money increases

**When money supply decreases** (shifts left):
- Less money available
- Interest rate rises
- Quantity of money decreases

**When money demand increases** (shifts right):
- More demand for money
- Interest rate rises
- Quantity of money increases

**When money demand decreases** (shifts left):
- Less demand for money
- Interest rate falls
- Quantity of money decreases

## Lesson summary: The money market

The demand for money is downward sloping (higher interest rates reduce money demand). Money market equilibrium occurs where supply equals demand, determining the interest rate. Changes in money supply or demand shift the equilibrium interest rate. The money market connects monetary policy to interest rates.`,
        importantPoints: [
          'Demand for money is downward sloping (inverse relationship with interest rates)',
          'Money market equilibrium determines the interest rate',
          'Money supply increase lowers interest rates',
          'Money demand increase raises interest rates',
          'The money market connects monetary policy to interest rates',
        ],
      } as ArticleContent,
      {
        id: 'macroecon-u4-l5-practice',
        type: 'practice',
        title: 'Practice: The money market: foundational concepts',
        exercises: [
          {
            id: 'practice-4-5-1',
            prompt: 'Draw the money market showing money supply and demand curves. Label the equilibrium interest rate and quantity of money.',
            hints: [
              'Interest rate on vertical axis',
              'Quantity of money on horizontal axis',
              'Supply is vertical (set by central bank)',
              'Demand slopes downward',
            ],
          },
          {
            id: 'practice-4-5-2',
            prompt: 'Explain why the demand for money is downward sloping. What is the opportunity cost of holding money?',
            hints: [
              'Higher interest rates = higher opportunity cost',
              'People hold less money when rates are high',
            ],
          },
          {
            id: 'practice-4-5-3',
            prompt: 'What happens to the equilibrium interest rate when the money supply increases? Show this on a money market diagram.',
            hints: [
              'Money supply curve shifts right',
              'Interest rate falls',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'macroecon-u4-l5-quiz',
        type: 'quiz',
        title: 'Quiz: The money market',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-4-6',
    title: 'Monetary policy',
    duration: '30 min',
    contentItems: [
      {
        id: 'macroecon-u4-l6-video-1',
        type: 'video',
        title: 'Monetary policy',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'macroecon-u4-l6-article',
        type: 'article',
        title: 'Learn: Monetary policy',
        content: `# Monetary Policy

## Monetary policy tools

**Monetary policy** is the use of money supply and interest rates to influence the economy, conducted by the central bank.

**Tools of monetary policy**:

1. **Open market operations**:
   - Buying/selling government securities
   - Most commonly used tool
   - Buying securities → Increases money supply
   - Selling securities → Decreases money supply

2. **Reserve requirements**:
   - Changing the fraction of deposits banks must hold
   - Lower requirements → More lending → More money supply
   - Higher requirements → Less lending → Less money supply

3. **Discount rate**:
   - Interest rate central bank charges banks for loans
   - Lower rate → More borrowing → More money supply
   - Higher rate → Less borrowing → Less money supply

4. **Interest on reserves**:
   - Rate paid on bank reserves held at central bank
   - Higher rate → Banks hold more reserves → Less money supply
   - Lower rate → Banks lend more → More money supply

## Expansionary vs. contractionary monetary policy

**Expansionary monetary policy** (easy money):
- Increase money supply
- Lower interest rates
- Used to fight recessions
- Stimulates spending and investment

**Contractionary monetary policy** (tight money):
- Decrease money supply
- Raise interest rates
- Used to fight inflation
- Reduces spending and investment

## Monetary and fiscal policy

**Monetary policy**:
- Conducted by central bank
- Affects money supply and interest rates
- Quick to implement
- Affects investment and net exports

**Fiscal policy**:
- Conducted by government
- Affects government spending and taxes
- Slower to implement (requires legislation)
- Affects consumption and government spending

**Coordination**: Both can be used together or independently to achieve economic goals.

## Lesson summary: Monetary policy

Monetary policy uses money supply and interest rates to influence the economy. Tools include open market operations, reserve requirements, discount rate, and interest on reserves. Expansionary policy increases money supply to fight recessions; contractionary policy decreases money supply to fight inflation. Monetary and fiscal policy can work together or independently.`,
        importantPoints: [
          'Monetary policy is conducted by the central bank',
          'Main tools: open market operations, reserve requirements, discount rate',
          'Expansionary policy increases money supply to fight recessions',
          'Contractionary policy decreases money supply to fight inflation',
          'Monetary policy affects interest rates, which affect investment and AD',
        ],
      } as ArticleContent,
      {
        id: 'macroecon-u4-l6-practice',
        type: 'practice',
        title: 'Practice: Monetary policy: foundational concepts, Changes in the money market',
        exercises: [
          {
            id: 'practice-4-6-1',
            prompt: 'Explain how the central bank uses open market operations to conduct expansionary monetary policy. Show the effect on the money market.',
            hints: [
              'Buying securities increases money supply',
              'Money supply curve shifts right',
              'Interest rate falls',
            ],
          },
          {
            id: 'practice-4-6-2',
            prompt: 'Compare expansionary and contractionary monetary policy. When would each be used?',
            hints: [
              'Expansionary: fight recessions',
              'Contractionary: fight inflation',
            ],
          },
          {
            id: 'practice-4-6-3',
            prompt: 'How does monetary policy affect aggregate demand? Trace the transmission mechanism.',
            hints: [
              'Monetary policy → Interest rates → Investment → AD',
              'Also affects net exports through exchange rates',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'macroecon-u4-l6-quiz',
        type: 'quiz',
        title: 'Quiz: Monetary policy',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-4-7',
    title: 'The market for loanable funds',
    duration: '30 min',
    contentItems: [
      {
        id: 'macroecon-u4-l7-video-1',
        type: 'video',
        title: 'The market for loanable funds',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'macroecon-u4-l7-article',
        type: 'article',
        title: 'Learn: The market for loanable funds',
        content: `# The Market for Loanable Funds

## Loanable funds market

The **loanable funds market** shows the supply and demand for loanable funds (money available for borrowing).

**Demand for loanable funds**:
- Comes from borrowers (firms, households, government)
- Downward sloping: Higher interest rates → Less borrowing
- Represents investment spending

**Supply of loanable funds**:
- Comes from savers (households, firms, government)
- Upward sloping: Higher interest rates → More saving
- Represents national saving

**Equilibrium**: Where supply and demand intersect, determining:
- Equilibrium interest rate
- Equilibrium quantity of loanable funds

## National savings and investment

**National saving** = Private saving + Public saving

**Private saving** = Y - T - C (Income - Taxes - Consumption)

**Public saving** = T - G (Taxes - Government spending)
- Budget surplus: Public saving > 0
- Budget deficit: Public saving < 0

**Investment** = Spending on capital goods

**Equality**: In a closed economy, National Saving = Investment

The loanable funds market ensures this equality:
- Supply of loanable funds = National saving
- Demand for loanable funds = Investment
- Equilibrium ensures S = I

## Factors affecting supply and demand

**Supply of loanable funds (saving) increases when**:
- Income increases
- Taxes decrease (increases disposable income)
- Government runs surplus (public saving increases)
- Saving incentives increase

**Demand for loanable funds (investment) increases when**:
- Expected returns on investment increase
- Business confidence increases
- Technology improves
- Tax incentives for investment increase

## Lesson summary: The market for loanable funds

The loanable funds market shows supply (saving) and demand (investment) for funds. Equilibrium determines the interest rate and quantity of funds. National saving equals investment in equilibrium. Changes in saving or investment shift the curves, changing the interest rate.`,
        importantPoints: [
          'Loanable funds market shows supply (saving) and demand (investment)',
          'Equilibrium determines interest rate and quantity of funds',
          'National saving = Private saving + Public saving',
          'In equilibrium, National saving = Investment',
          'Changes in saving or investment shift the curves',
        ],
      } as ArticleContent,
      {
        id: 'macroecon-u4-l7-practice',
        type: 'practice',
        title: 'Practice: The market for loanable funds, Changes in the market for loanable funds',
        exercises: [
          {
            id: 'practice-4-7-1',
            prompt: 'Draw the loanable funds market showing supply and demand curves. Label the equilibrium interest rate and quantity.',
            hints: [
              'Interest rate on vertical axis',
              'Quantity of loanable funds on horizontal axis',
              'Supply slopes up, demand slopes down',
            ],
          },
          {
            id: 'practice-4-7-2',
            prompt: 'Explain how a government budget deficit affects the loanable funds market. Show this on a diagram.',
            hints: [
              'Budget deficit reduces public saving',
              'Supply of loanable funds decreases',
              'Interest rate rises',
            ],
          },
          {
            id: 'practice-4-7-3',
            prompt: 'If investment demand increases, what happens to the equilibrium interest rate and quantity of loanable funds?',
            hints: [
              'Demand curve shifts right',
              'Interest rate rises',
              'Quantity increases',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'macroecon-u4-l7-quiz',
        type: 'quiz',
        title: 'Quiz: The market for loanable funds',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-4-8',
    title: 'Interest rates and the time value of money',
    duration: '25 min',
    contentItems: [
      {
        id: 'macroecon-u4-l8-video-1',
        type: 'video',
        title: 'Interest rates and the time value of money',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'macroecon-u4-l8-article',
        type: 'article',
        title: 'Learn: Interest rates and the time value of money',
        content: `# Interest Rates and the Time Value of Money

## Introduction to present value

**Present value (PV)** is the current worth of a future sum of money, discounted at a given interest rate.

**Time value of money**: Money today is worth more than the same amount in the future because:
- Money can earn interest
- Inflation reduces future purchasing power
- Uncertainty about the future

**Present value formula**:
PV = FV / (1 + r)^n

Where:
- PV = Present value
- FV = Future value
- r = Interest rate (discount rate)
- n = Number of periods

Example: $1000 received in 2 years at 5% interest:
PV = $1000 / (1.05)^2 = $1000 / 1.1025 = $907.03

## Present value 2

**Present value of multiple cash flows**:
- Calculate PV of each future payment
- Sum all present values

**Present value of an annuity** (equal payments):
PV = PMT × [(1 - (1 + r)^-n) / r]

Where:
- PMT = Payment per period
- r = Interest rate
- n = Number of periods

**Net present value (NPV)**: Present value of all cash flows (inflows and outflows) from an investment.

NPV = PV of inflows - PV of outflows

**Decision rule**: Invest if NPV > 0 (project adds value)

## Applications of present value

**Bond pricing**: Price of a bond equals the present value of all future coupon payments plus face value.

**Investment decisions**: Compare present value of returns to initial cost.

**Loan calculations**: Determine loan payments based on present value of loan amount.

**Valuation**: Value assets, companies, or projects using present value of expected cash flows.

## Lesson summary: Interest rates and the time value of money

Present value shows the current worth of future money. Money today is worth more than money tomorrow. PV = FV / (1 + r)^n. Present value is used for bond pricing, investment decisions, and valuation. Higher interest rates reduce present value.`,
        importantPoints: [
          'Present value is the current worth of future money',
          'Money today is worth more than money tomorrow',
          'PV = FV / (1 + r)^n',
          'Present value is used for bond pricing and investment decisions',
          'Higher interest rates reduce present value',
        ],
      } as ArticleContent,
      {
        id: 'macroecon-u4-l8-practice',
        type: 'practice',
        title: 'Practice: Interest rates and the time value of money',
        exercises: [
          {
            id: 'practice-4-8-1',
            prompt: 'Calculate the present value of $5000 received in 3 years if the interest rate is 6%.',
            hints: [
              'PV = FV / (1 + r)^n',
              'PV = $5000 / (1.06)^3',
            ],
          },
          {
            id: 'practice-4-8-2',
            prompt: 'Explain why $100 today is worth more than $100 in one year. What is the opportunity cost of waiting?',
            hints: [
              'Money can earn interest',
              'Inflation reduces purchasing power',
              'Opportunity cost is the interest that could be earned',
            ],
          },
          {
            id: 'practice-4-8-3',
            prompt: 'If you have the choice between receiving $1000 today or $1100 in one year, which should you choose if the interest rate is 8%?',
            hints: [
              'Calculate present value of $1100',
              'Compare to $1000 today',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'macroecon-u4-l8-quiz',
        type: 'quiz',
        title: 'Quiz: Interest rates and the time value of money',
        questions: [],
      } as QuizContent,
    ],
  },
];

const unit5Lessons: Lesson[] = [
  {
    id: 'lesson-5-1',
    title: 'Fiscal and Monetary Policy Actions in the Short Run',
    duration: '25 min',
    contentItems: [
      {
        id: 'macroecon-u5-l1-video-1',
        type: 'video',
        title: 'Fiscal and Monetary Policy Actions in the Short Run',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'macroecon-u5-l1-article',
        type: 'article',
        title: 'Learn: Fiscal and Monetary Policy Actions in the Short Run',
        content: `# Fiscal and Monetary Policy Actions in the Short Run

## Fiscal and monetary policy in parallel

**Fiscal and monetary policy** can be used together or independently to influence the economy.

**When policies work together** (coordinated):
- Both expansionary: Strong stimulus (e.g., increase spending + lower interest rates)
- Both contractionary: Strong restraint (e.g., decrease spending + raise interest rates)
- Can be very effective but risk overshooting

**When policies work against each other** (conflicting):
- Expansionary fiscal + Contractionary monetary: Mixed effects
- Contractionary fiscal + Expansionary monetary: Mixed effects
- Can neutralize each other or create uncertainty

**Policy coordination**:
- Can be more effective when coordinated
- Requires communication between government and central bank
- Can avoid policy conflicts

**Short-run effects**:
- Both policies affect aggregate demand
- Fiscal policy: Direct impact on AD through spending/taxes
- Monetary policy: Indirect impact through interest rates → investment/net exports
- Combined effects depend on relative magnitudes

## Lesson summary: Fiscal and monetary policy actions in the short run

Fiscal and monetary policy can work together or conflict. Coordinated policies are more effective. Both affect aggregate demand in the short run. Fiscal policy has direct effects; monetary policy works through interest rates. Policy coordination requires communication between government and central bank.`,
        importantPoints: [
          'Fiscal and monetary policy can be coordinated or conflict',
          'Coordinated policies are more effective',
          'Both affect aggregate demand in the short run',
          'Fiscal policy has direct effects; monetary policy works through interest rates',
          'Policy coordination requires communication between institutions',
        ],
      } as ArticleContent,
      {
        id: 'macroecon-u5-l1-practice',
        type: 'practice',
        title: 'Practice: Fiscal and monetary policy actions in the short run',
        exercises: [
          {
            id: 'practice-5-1-1',
            prompt: 'Explain how expansionary fiscal policy and expansionary monetary policy work together. Show the combined effect on aggregate demand.',
            hints: [
              'Both shift AD right',
              'Combined effect is stronger',
              'Show on AD-AS diagram',
            ],
          },
          {
            id: 'practice-5-1-2',
            prompt: 'What happens when expansionary fiscal policy is combined with contractionary monetary policy? Explain the conflicting effects.',
            hints: [
              'Fiscal policy increases AD',
              'Monetary policy decreases AD',
              'Net effect depends on relative magnitudes',
            ],
          },
          {
            id: 'practice-5-1-3',
            prompt: 'Why is policy coordination important? What are the benefits and challenges?',
            hints: [
              'Coordination can be more effective',
              'Requires communication',
              'Can avoid conflicts',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'macroecon-u5-l1-quiz',
        type: 'quiz',
        title: 'Quiz: Fiscal and Monetary Policy Actions',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-5-2',
    title: 'The Phillips Curve',
    duration: '30 min',
    contentItems: [
      {
        id: 'macroecon-u5-l2-video-1',
        type: 'video',
        title: 'The Phillips Curve',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'macroecon-u5-l2-article',
        type: 'article',
        title: 'Learn: The Phillips Curve',
        content: `# The Phillips Curve

## Phillips curve

The **Phillips Curve** shows the relationship between inflation and unemployment.

**Short-run Phillips Curve (SRPC)**:
- Downward sloping
- Shows trade-off between inflation and unemployment
- Lower unemployment → Higher inflation
- Higher unemployment → Lower inflation

**Key insight**: In the short run, there is a trade-off between inflation and unemployment.

**Long-run Phillips Curve (LRPC)**:
- Vertical at the natural rate of unemployment
- No trade-off in the long run
- Unemployment returns to natural rate regardless of inflation

## Changes in the AD-AS model and the Phillips curve

**Connection between AD-AS and Phillips Curve**:
- AD-AS model shows price level and output
- Phillips Curve shows inflation and unemployment
- They are related through the business cycle

**When AD increases** (AD-AS model):
- Price level rises (inflation)
- Output increases
- Unemployment decreases
- Movement along SRPC (up and left)

**When AD decreases** (AD-AS model):
- Price level falls (disinflation/deflation)
- Output decreases
- Unemployment increases
- Movement along SRPC (down and right)

**When SRAS changes**:
- Shifts the SRPC
- Supply shock shifts SRPC up (stagflation) or down

## Lesson summary: The Phillips curve

The short-run Phillips Curve shows a trade-off between inflation and unemployment. The long-run Phillips Curve is vertical at the natural unemployment rate. Changes in AD-AS correspond to movements along the SRPC. Supply shocks shift the SRPC. In the long run, there is no trade-off between inflation and unemployment.`,
        importantPoints: [
          'Short-run Phillips Curve shows trade-off between inflation and unemployment',
          'Long-run Phillips Curve is vertical at natural unemployment rate',
          'AD changes cause movement along SRPC',
          'Supply shocks shift SRPC',
          'No long-run trade-off between inflation and unemployment',
        ],
      } as ArticleContent,
      {
        id: 'macroecon-u5-l2-practice',
        type: 'practice',
        title: 'Practice: The Phillips curve: foundational concepts, The Phillips curve: linking changes in the AD-AS model to the Phillips curve',
        exercises: [
          {
            id: 'practice-5-2-1',
            prompt: 'Draw a short-run Phillips Curve and explain the trade-off it represents. Why does this trade-off exist?',
            hints: [
              'SRPC slopes downward',
              'Shows inflation-unemployment trade-off',
              'Based on sticky wages/prices',
            ],
          },
          {
            id: 'practice-5-2-2',
            prompt: 'Explain how an increase in aggregate demand affects both the AD-AS model and the Phillips Curve. Show the connection.',
            hints: [
              'AD increase → Higher price level and output',
              'Corresponds to movement along SRPC',
              'Lower unemployment, higher inflation',
            ],
          },
          {
            id: 'practice-5-2-3',
            prompt: 'What is the difference between the short-run and long-run Phillips Curve? Why is the long-run curve vertical?',
            hints: [
              'Short-run: trade-off exists',
              'Long-run: no trade-off',
              'Wages and prices adjust in long run',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'macroecon-u5-l2-quiz',
        type: 'quiz',
        title: 'Quiz: The Phillips Curve',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-5-3',
    title: 'Money Growth and Inflation',
    duration: '30 min',
    contentItems: [
      {
        id: 'macroecon-u5-l3-video-1',
        type: 'video',
        title: 'Money Growth and Inflation',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'macroecon-u5-l3-article',
        type: 'article',
        title: 'Learn: Money Growth and Inflation',
        content: `# Money Growth and Inflation

## Quantity theory of money

The **Quantity Theory of Money** states that the money supply directly affects the price level.

**Equation of Exchange**: M × V = P × Y

Where:
- M = Money supply
- V = Velocity of money (how often money changes hands)
- P = Price level
- Y = Real output (GDP)

**Quantity Theory**: If V and Y are constant, then:
- Increase in M → Increase in P (inflation)
- Money supply growth causes inflation

**Classical view**: "Inflation is always and everywhere a monetary phenomenon" (Milton Friedman)

## Velocity of money rather than quantity driving prices

**Velocity of money (V)** is the average number of times a dollar is spent per year.

V = (P × Y) / M

**If velocity changes**:
- Increase in V → Increase in P (even if M constant)
- Decrease in V → Decrease in P

**Velocity can change due to**:
- Payment technology (credit cards, digital payments)
- Financial innovation
- Expectations about inflation
- Interest rates (higher rates → less money held → higher velocity)

**Key insight**: Changes in velocity can affect prices independently of money supply.

## Deflation despite increases in money supply

**Why deflation can occur despite money supply growth**:

1. **Velocity decreases faster than money supply increases**
   - If V falls more than M rises, P can fall

2. **Output growth exceeds money supply growth**
   - If Y grows faster than M, P can fall (deflation)

3. **Liquidity trap**
   - People hoard money instead of spending
   - Velocity collapses
   - Money supply increases don't translate to spending

4. **Financial crisis**
   - Credit freeze reduces velocity
   - Money supply increases but doesn't circulate

Example: Great Depression, Japan 1990s-2000s

## Moderate inflation in a good economy

**Moderate inflation** (2-3% annually) can occur in a healthy economy when:
- Money supply grows slightly faster than output
- Velocity is stable
- Economy is growing
- Central bank targets moderate inflation

**Why moderate inflation is preferred**:
- Encourages spending (money loses value if held)
- Allows real wage adjustments
- Prevents deflation (which can be dangerous)
- Gives central bank room to lower real interest rates

**Central bank targets**: Most central banks target 2% inflation as optimal.

## Lesson summary: Money growth and inflation

The quantity theory states that money supply growth causes inflation (if V and Y constant). Velocity changes can also drive prices. Deflation can occur despite money growth if velocity falls or output grows faster. Moderate inflation in a growing economy is normal and often targeted by central banks.`,
        importantPoints: [
          'Quantity theory: M × V = P × Y',
          'Money supply growth causes inflation if V and Y are constant',
          'Velocity changes can drive prices independently',
          'Deflation can occur if velocity falls or output grows faster than money',
          'Moderate inflation (2-3%) is normal in healthy economies',
        ],
      } as ArticleContent,
      {
        id: 'macroecon-u5-l3-practice',
        type: 'practice',
        title: 'Practice: Money growth and inflation',
        exercises: [
          {
            id: 'practice-5-3-1',
            prompt: 'Using the quantity theory of money, explain what happens to the price level if the money supply increases by 5% while velocity and output remain constant.',
            hints: [
              'M × V = P × Y',
              'If M increases and V, Y constant, P must increase',
            ],
          },
          {
            id: 'practice-5-3-2',
            prompt: 'Explain how a decrease in the velocity of money could cause deflation even if the money supply is increasing.',
            hints: [
              'Velocity = (P × Y) / M',
              'If V falls faster than M rises, P can fall',
            ],
          },
          {
            id: 'practice-5-3-3',
            prompt: 'Why do central banks typically target 2% inflation rather than 0%? What are the benefits of moderate inflation?',
            hints: [
              'Prevents deflation',
              'Encourages spending',
              'Allows real wage adjustments',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'macroecon-u5-l3-quiz',
        type: 'quiz',
        title: 'Quiz: Money Growth and Inflation',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-5-4',
    title: 'Crowding Out',
    duration: '25 min',
    contentItems: [
      {
        id: 'macroecon-u5-l4-video-1',
        type: 'video',
        title: 'Crowding Out',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'macroecon-u5-l4-article',
        type: 'article',
        title: 'Learn: Crowding Out',
        content: `# Crowding Out

## Crowding out

**Crowding out** occurs when increased government spending reduces private sector spending.

**Mechanism**:
1. Government increases spending (expansionary fiscal policy)
2. Government borrows to finance spending
3. Increased demand for loanable funds
4. Interest rates rise
5. Higher interest rates reduce private investment
6. Private spending is "crowded out"

**Types of crowding out**:
- **Financial crowding out**: Government borrowing raises interest rates, reducing investment
- **Resource crowding out**: Government uses resources that would have been used by private sector

## When crowding out occurs

**Crowding out is more likely when**:
- Economy is near full employment
- Money supply is fixed (no monetary accommodation)
- Government spending is financed by borrowing (not taxes)
- Economy is closed (no foreign capital flows)

**Crowding out is less likely when**:
- Economy has significant unemployment
- Central bank accommodates (increases money supply)
- Government spending is financed by taxes
- Economy is open (foreign capital can flow in)

## Extent of crowding out

**Complete crowding out**: Private spending decreases by the full amount of government spending increase. Net effect on AD = 0.

**Partial crowding out**: Private spending decreases by less than government spending increases. Net effect on AD is positive but smaller.

**No crowding out**: Private spending unchanged. Full multiplier effect.

In practice, crowding out is usually partial, not complete.

## Lesson summary: Crowding out

Crowding out occurs when government spending reduces private spending, typically through higher interest rates. It's more likely near full employment with fixed money supply. Crowding out can be complete, partial, or absent depending on economic conditions. Monetary accommodation can reduce crowding out.`,
        importantPoints: [
          'Crowding out occurs when government spending reduces private spending',
          'Mechanism: Government borrowing → Higher interest rates → Less investment',
          'More likely near full employment with fixed money supply',
          'Can be complete, partial, or absent',
          'Monetary accommodation can reduce crowding out',
        ],
      } as ArticleContent,
      {
        id: 'macroecon-u5-l4-practice',
        type: 'practice',
        title: 'Practice: Crowding out',
        exercises: [
          {
            id: 'practice-5-4-1',
            prompt: 'Explain the mechanism of crowding out. Show how increased government spending can reduce private investment.',
            hints: [
              'Government borrowing increases',
              'Demand for loanable funds increases',
              'Interest rates rise',
              'Investment decreases',
            ],
          },
          {
            id: 'practice-5-4-2',
            prompt: 'Show crowding out on a loanable funds market diagram. What happens to interest rates and investment?',
            hints: [
              'Government borrowing shifts demand right',
              'Interest rate rises',
              'Investment decreases',
            ],
          },
          {
            id: 'practice-5-4-3',
            prompt: 'Under what conditions is crowding out most likely to occur? How can it be reduced?',
            hints: [
              'Near full employment',
              'Fixed money supply',
              'Monetary accommodation can help',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'macroecon-u5-l4-quiz',
        type: 'quiz',
        title: 'Quiz: Crowding Out',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-5-5',
    title: 'Deficits and Debts',
    duration: '30 min',
    contentItems: [
      {
        id: 'macroecon-u5-l5-video-1',
        type: 'video',
        title: 'Deficits and Debts',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'macroecon-u5-l5-article',
        type: 'article',
        title: 'Learn: Deficits and Debts',
        content: `# Deficits and Debts

## Deficits and debt

**Budget deficit**: When government spending exceeds tax revenue in a given year.

Deficit = G - T (Government spending - Taxes)

**Budget surplus**: When tax revenue exceeds government spending.

Surplus = T - G

**National debt**: The total accumulated amount the government owes from past deficits.

Debt = Sum of all past deficits minus surpluses

**Key distinction**:
- **Deficit**: Flow variable (per year)
- **Debt**: Stock variable (accumulated over time)

## Causes of deficits

**Deficits occur when**:
- Government spending increases (wars, programs, infrastructure)
- Tax revenue decreases (recessions, tax cuts)
- Both occur simultaneously

**Types of deficits**:
- **Cyclical deficit**: Due to economic downturns (automatic stabilizers)
- **Structural deficit**: Due to policy choices (spending > taxes at full employment)

## Effects of deficits and debt

**Short-run effects**:
- Deficits can stimulate economy (increase AD)
- Can help during recessions
- May crowd out private investment

**Long-run concerns**:
- **Debt service**: Interest payments on debt
- **Future tax burden**: Future generations pay for current spending
- **Reduced flexibility**: Less room for future fiscal policy
- **Crowding out**: Higher interest rates reduce investment
- **Default risk**: If debt becomes unsustainable

## Debt-to-GDP ratio

**Debt-to-GDP ratio** = (National Debt / GDP) × 100

This ratio shows debt relative to the economy's size.

**Why it matters**:
- Higher ratio = Higher debt burden
- Sustainable if GDP grows faster than debt
- Problematic if debt grows faster than GDP

**Historical context**: Many countries have high debt-to-GDP ratios and function normally, but very high ratios can be problematic.

## Lesson summary: Deficits and debts

Budget deficits occur when spending exceeds revenue. National debt is accumulated deficits. Deficits can stimulate the economy short-term but create long-term concerns. Debt-to-GDP ratio measures debt burden. Sustainable debt requires GDP growth to outpace debt growth.`,
        importantPoints: [
          'Deficit is annual (flow); debt is accumulated (stock)',
          'Deficits can stimulate economy but create debt',
          'Debt-to-GDP ratio measures debt burden',
          'Long-run concerns include debt service and reduced flexibility',
          'Sustainable debt requires GDP growth to outpace debt growth',
        ],
      } as ArticleContent,
      {
        id: 'macroecon-u5-l5-practice',
        type: 'practice',
        title: 'Practice: Deficits and debts',
        exercises: [
          {
            id: 'practice-5-5-1',
            prompt: 'Explain the difference between a budget deficit and national debt. How are they related?',
            hints: [
              'Deficit is annual',
              'Debt is accumulated',
              'Debt = sum of past deficits',
            ],
          },
          {
            id: 'practice-5-5-2',
            prompt: 'Calculate the debt-to-GDP ratio if national debt is $20 trillion and GDP is $25 trillion. Is this sustainable?',
            hints: [
              'Debt-to-GDP = (Debt / GDP) × 100',
              'Consider if GDP growth exceeds debt growth',
            ],
          },
          {
            id: 'practice-5-5-3',
            prompt: 'What are the short-run benefits and long-run concerns of government deficits?',
            hints: [
              'Short-run: can stimulate economy',
              'Long-run: debt burden, reduced flexibility',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'macroecon-u5-l5-quiz',
        type: 'quiz',
        title: 'Quiz: Deficits and Debts',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-5-6',
    title: 'Economic Growth',
    duration: '30 min',
    contentItems: [
      {
        id: 'macroecon-u5-l6-video-1',
        type: 'video',
        title: 'Economic Growth',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'macroecon-u5-l6-article',
        type: 'article',
        title: 'Learn: Economic Growth',
        content: `# Economic Growth

## Understanding economic growth

**Economic growth** is the increase in real GDP (or real GDP per capita) over time.

**Growth rate**: Percentage change in real GDP from one period to the next.

Growth Rate = [(GDP Current - GDP Previous) / GDP Previous] × 100

**Per capita growth**: Growth in GDP per person, accounting for population changes.

## Sources of economic growth

**Factors that increase potential GDP (shift LRAS right)**:

1. **Increase in quantity of resources**:
   - More labor (population growth, immigration, labor force participation)
   - More capital (investment, capital accumulation)
   - More natural resources (discoveries)

2. **Increase in quality of resources**:
   - Human capital (education, training, skills)
   - Technology (innovation, research and development)
   - Better institutions (property rights, rule of law)

3. **Productivity improvements**:
   - Better technology
   - Better organization
   - Economies of scale

## Long-run growth vs. short-run fluctuations

**Long-run growth**: Trend increase in potential GDP (LRAS shifts right)
- Determined by resources, technology, institutions
- Relatively stable over time
- Key to improving living standards

**Short-run fluctuations**: Business cycle movements around trend
- Recessions and expansions
- Temporary deviations from potential
- Don't affect long-run growth trend

## Importance of economic growth

**Benefits of growth**:
- Higher living standards
- More goods and services available
- Can reduce poverty
- Allows for public services without raising taxes
- Improves quality of life

**Costs of growth**:
- Environmental degradation
- Resource depletion
- Income inequality may increase
- Social disruption from rapid change

## Sustainable growth

**Sustainable growth** balances:
- Economic development
- Environmental protection
- Social equity

**Green growth**: Economic growth that is environmentally sustainable.

## Lesson summary: Economic growth

Economic growth is the increase in real GDP over time. Growth comes from increases in quantity/quality of resources, technology, and productivity. Long-run growth (trend) differs from short-run fluctuations (business cycle). Growth improves living standards but must be balanced with environmental and social concerns. Sustainable growth considers economic, environmental, and social factors.`,
        importantPoints: [
          'Economic growth is the increase in real GDP over time',
          'Growth comes from resources, technology, and productivity',
          'Long-run growth (trend) differs from short-run fluctuations',
          'Growth improves living standards',
          'Sustainable growth balances economic, environmental, and social factors',
        ],
      } as ArticleContent,
      {
        id: 'macroecon-u5-l6-practice',
        type: 'practice',
        title: 'Practice: Economic growth',
        exercises: [
          {
            id: 'practice-5-6-1',
            prompt: 'Calculate the economic growth rate if real GDP was $20 trillion last year and $21 trillion this year.',
            hints: [
              'Growth rate = [(GDP current - GDP previous) / GDP previous] × 100',
            ],
          },
          {
            id: 'practice-5-6-2',
            prompt: 'List and explain the main sources of long-run economic growth. How does each shift the LRAS curve?',
            hints: [
              'Resources (labor, capital)',
              'Technology',
              'Human capital',
              'All shift LRAS right',
            ],
          },
          {
            id: 'practice-5-6-3',
            prompt: 'Distinguish between long-run economic growth and short-run economic fluctuations. Why is this distinction important?',
            hints: [
              'Long-run: trend, potential GDP',
              'Short-run: business cycle, actual GDP',
              'Different policies for each',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'macroecon-u5-l6-quiz',
        type: 'quiz',
        title: 'Quiz: Economic Growth',
        questions: [],
      } as QuizContent,
    ],
  },
];

const unit6Lessons: Lesson[] = [
  {
    id: 'lesson-6-1',
    title: 'The balance of payments',
    duration: '30 min',
    contentItems: [
      {
        id: 'macroecon-u6-l1-video-1',
        type: 'video',
        title: 'The balance of payments',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'macroecon-u6-l1-article',
        type: 'article',
        title: 'Learn: The balance of payments',
        content: `# The balance of payments

## Balance of payments: Current account

The **Balance of Payments (BOP)** records all economic transactions between a country and the rest of the world.

**Current Account** includes:
- **Trade balance**: Exports - Imports of goods and services
- **Net income**: Income from foreign investments - Income paid to foreigners
- **Net transfers**: Unilateral transfers (aid, remittances, gifts)

**Current Account Balance**:
- **Surplus**: When receipts > payments (country receives more than it pays)
- **Deficit**: When payments > receipts (country pays more than it receives)

**Trade balance** (part of current account):
- **Trade surplus**: Exports > Imports
- **Trade deficit**: Imports > Exports

## Balance of payments: Capital account

**Capital Account** (also called Financial Account) includes:
- **Foreign direct investment (FDI)**: Investment in physical assets abroad
- **Portfolio investment**: Investment in stocks, bonds, securities
- **Other investments**: Bank loans, currency deposits
- **Reserve assets**: Central bank holdings of foreign currency

**Capital Account Balance**:
- **Surplus**: Capital inflows > Capital outflows (foreigners invest more in country)
- **Deficit**: Capital outflows > Capital inflows (country invests more abroad)

## Data on Chinese-US balance of payments

**China**:
- Large current account surplus (exports > imports)
- Capital account deficit (capital outflows)
- Accumulates foreign reserves (especially US dollars)

**United States**:
- Large current account deficit (imports > exports)
- Capital account surplus (capital inflows)
- Foreigners invest in US assets

**Key relationship**: China's surplus finances US deficit.

## Why current and capital accounts net out

**Fundamental identity**: Current Account + Capital Account = 0

**Why they must balance**:
- Every transaction has two sides
- If you buy foreign goods (current account deficit), you must pay with capital (capital account surplus)
- If you export goods (current account surplus), you receive capital (capital account deficit)

**Accounting identity**: 
Current Account Balance + Capital Account Balance = 0

If current account is in deficit, capital account must be in surplus (and vice versa).

## Using a person's budget to understand the balance of payments

**Personal budget analogy**:
- **Current account**: Your income and spending (salary, expenses)
- **Capital account**: Your borrowing and saving (loans, savings accounts)

**If you spend more than you earn** (current account deficit):
- You must borrow or use savings (capital account surplus)
- You go into debt

**If you earn more than you spend** (current account surplus):
- You save or lend money (capital account deficit)
- You accumulate assets

**Same logic applies to countries**: A country with a trade deficit must finance it with capital inflows.

## Lesson summary: The balance of payments

The balance of payments records all international transactions. Current account includes trade, income, and transfers. Capital account includes investment flows. Current and capital accounts must net to zero (accounting identity). A current account deficit must be financed by a capital account surplus. Countries with trade surpluses accumulate foreign assets.`,
        importantPoints: [
          'Balance of payments records all international transactions',
          'Current account = trade + income + transfers',
          'Capital account = investment flows',
          'Current account + Capital account = 0 (must balance)',
          'Trade deficit must be financed by capital inflows',
        ],
      } as ArticleContent,
      {
        id: 'macroecon-u6-l1-practice',
        type: 'practice',
        title: 'Practice: The balance of payments',
        exercises: [
          {
            id: 'practice-6-1-1',
            prompt: 'Explain what the current account includes. What does a current account deficit mean?',
            hints: [
              'Current account = trade + income + transfers',
              'Deficit means payments > receipts',
            ],
          },
          {
            id: 'practice-6-1-2',
            prompt: 'Why must the current account and capital account balance? Use the accounting identity to explain.',
            hints: [
              'Every transaction has two sides',
              'Current Account + Capital Account = 0',
            ],
          },
          {
            id: 'practice-6-1-3',
            prompt: 'If a country has a current account deficit of $100 billion, what must be true about its capital account? Explain using the personal budget analogy.',
            hints: [
              'Current account + Capital account = 0',
              'Deficit must be financed',
              'Like spending more than you earn',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'macroecon-u6-l1-quiz',
        type: 'quiz',
        title: 'Quiz: The balance of payments',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-6-2',
    title: 'Exchange rates',
    duration: '25 min',
    contentItems: [
      {
        id: 'macroecon-u6-l2-video-1',
        type: 'video',
        title: 'Exchange rates',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'macroecon-u6-l2-article',
        type: 'article',
        title: 'Learn: Exchange rates',
        content: `# Exchange rates

## Exchange rate primer

**Exchange rate** is the price of one currency in terms of another currency.

**Example**: 1 USD = 0.85 EUR means 1 US dollar equals 0.85 euros.

**Two ways to express exchange rates**:
- **Direct quote**: Price of foreign currency in domestic currency (e.g., 1.18 USD per EUR)
- **Indirect quote**: Price of domestic currency in foreign currency (e.g., 0.85 EUR per USD)

**Appreciation**: Currency becomes more valuable (can buy more foreign currency)
- Example: USD appreciates from 0.85 EUR to 0.90 EUR

**Depreciation**: Currency becomes less valuable (can buy less foreign currency)
- Example: USD depreciates from 0.85 EUR to 0.80 EUR

## Types of exchange rate systems

**Fixed exchange rate**: Government/central bank maintains a specific rate
- Requires intervention in foreign exchange market
- Uses foreign reserves to maintain rate

**Floating exchange rate**: Rate determined by market supply and demand
- No government intervention
- Rate fluctuates freely

**Managed float**: Combination of both
- Mostly market-determined but with occasional intervention

## Factors affecting exchange rates

**Demand for currency** (increases when):
- Foreigners want to buy country's goods (exports)
- Foreigners want to invest in country (capital inflows)
- Speculators expect currency to appreciate

**Supply of currency** (increases when):
- Country's residents want to buy foreign goods (imports)
- Country's residents want to invest abroad (capital outflows)
- Speculators expect currency to depreciate

**Other factors**:
- Interest rate differentials
- Inflation differentials
- Economic growth
- Political stability
- Central bank policy

## Real vs. nominal exchange rates

**Nominal exchange rate**: The actual market rate (e.g., 1 USD = 0.85 EUR)

**Real exchange rate**: Nominal rate adjusted for price levels
- Real Rate = (Nominal Rate × Domestic Prices) / Foreign Prices
- Measures purchasing power

**Why real exchange rate matters**: It determines actual competitiveness of exports.

## Lesson summary: Exchange rates

Exchange rate is the price of one currency in terms of another. Currencies can appreciate (increase in value) or depreciate (decrease in value). Exchange rates can be fixed, floating, or managed. Supply and demand determine floating rates. Real exchange rates adjust for price levels and measure true competitiveness.`,
        importantPoints: [
          'Exchange rate is the price of one currency in terms of another',
          'Appreciation = currency becomes more valuable',
          'Depreciation = currency becomes less valuable',
          'Supply and demand determine floating exchange rates',
          'Real exchange rate adjusts for price levels',
        ],
      } as ArticleContent,
      {
        id: 'macroecon-u6-l2-practice',
        type: 'practice',
        title: 'Practice: Exchange rates',
        exercises: [
          {
            id: 'practice-6-2-1',
            prompt: 'If the exchange rate changes from 1 USD = 0.85 EUR to 1 USD = 0.90 EUR, has the dollar appreciated or depreciated? Explain.',
            hints: [
              'Appreciation = can buy more foreign currency',
              'Depreciation = can buy less foreign currency',
            ],
          },
          {
            id: 'practice-6-2-2',
            prompt: 'List factors that would increase the demand for US dollars in the foreign exchange market.',
            hints: [
              'Foreigners want US goods',
              'Foreigners want to invest in US',
              'Higher US interest rates',
            ],
          },
          {
            id: 'practice-6-2-3',
            prompt: 'What is the difference between nominal and real exchange rates? Why does the real exchange rate matter?',
            hints: [
              'Nominal = market rate',
              'Real = adjusted for price levels',
              'Real rate determines competitiveness',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'macroecon-u6-l2-quiz',
        type: 'quiz',
        title: 'Quiz: Exchange rates',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-6-3',
    title: 'The foreign exchange market',
    duration: '35 min',
    contentItems: [
      {
        id: 'macroecon-u6-l3-video-1',
        type: 'video',
        title: 'The foreign exchange market',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'macroecon-u6-l3-article',
        type: 'article',
        title: 'Learn: The foreign exchange market',
        content: `# The foreign exchange market

## Currency exchange introduction

The **foreign exchange (forex) market** is where currencies are bought and sold.

**Participants**:
- Banks and financial institutions
- Central banks
- Corporations (for trade)
- Investors and speculators
- Governments

**Market characteristics**:
- Largest financial market in the world
- Operates 24/7 globally
- High liquidity
- Very competitive (many buyers and sellers)

## Supply and demand curves in foreign exchange

**Demand for currency** (e.g., demand for USD):
- Downward sloping curve
- As price of USD falls (depreciates), more USD demanded
- Cheaper USD makes US goods cheaper for foreigners

**Supply of currency** (e.g., supply of USD):
- Upward sloping curve
- As price of USD rises (appreciates), more USD supplied
- More valuable USD makes foreign goods cheaper for Americans

**Equilibrium**: Where supply and demand intersect determines exchange rate.

**Shifts in demand** (increase when):
- Foreign demand for US goods increases
- Foreign investment in US increases
- US interest rates rise relative to foreign rates

**Shifts in supply** (increase when):
- US demand for foreign goods increases
- US investment abroad increases
- Foreign interest rates rise relative to US rates

## Accumulating foreign currency reserves

**Foreign currency reserves**: Holdings of foreign currencies by central banks.

**Why accumulate reserves**:
- **Intervention**: To influence exchange rate
- **Stability**: To maintain fixed exchange rate
- **Liquidity**: To meet foreign obligations
- **Confidence**: To show ability to defend currency

**How to accumulate**:
- Buy foreign currency (sell domestic currency)
- Receive foreign currency from exports
- Borrow in foreign currency

**Costs of holding reserves**:
- Opportunity cost (could invest elsewhere)
- Currency risk (reserves can lose value)

## Using reserves to stabilize currency

**To prevent depreciation** (currency falling):
- Central bank sells foreign reserves
- Buys domestic currency
- Increases demand for domestic currency
- Raises exchange rate

**To prevent appreciation** (currency rising):
- Central bank buys foreign reserves
- Sells domestic currency
- Increases supply of domestic currency
- Lowers exchange rate

**Fixed exchange rate maintenance**:
- Requires sufficient reserves
- Must intervene whenever rate deviates from target
- Can be costly if market pressure is strong

## Speculative attack on a currency

**Speculative attack**: Large-scale selling of a currency by speculators expecting depreciation.

**Mechanism**:
1. Speculators expect currency to depreciate
2. They sell the currency (increase supply)
3. This causes depreciation (self-fulfilling)
4. Central bank tries to defend by using reserves
5. If reserves run out, currency collapses

**Triggers**:
- Large current account deficit
- High inflation
- Political instability
- Loss of confidence in government/central bank

## Financial crisis in Thailand caused by speculative attack

**Thailand 1997**:
- Had fixed exchange rate (baht pegged to dollar)
- Large current account deficit
- High foreign debt
- Speculators attacked the baht
- Central bank used reserves to defend
- Reserves exhausted → baht devalued
- Triggered Asian Financial Crisis

**Lessons**:
- Fixed exchange rates can be vulnerable
- Need sufficient reserves
- Must address underlying economic problems

## Math mechanics of Thai banking crisis

**The crisis mechanism**:
1. **Initial state**: Fixed rate (e.g., 25 baht = 1 USD)
2. **Attack begins**: Speculators sell baht, buy dollars
3. **Central bank intervention**: Sells dollars, buys baht (uses reserves)
4. **Reserve depletion**: Reserves fall from $40B to $2B
5. **Abandonment**: Can't defend anymore, float the currency
6. **Devaluation**: Baht falls to 50 baht = 1 USD
7. **Consequences**: 
   - Foreign debt becomes more expensive (in baht terms)
   - Banks and companies default
   - Economic crisis

**Key insight**: Fixed exchange rates require credible commitment and sufficient reserves.

## Lesson summary: The foreign exchange market

The forex market is where currencies are traded. Supply and demand determine exchange rates. Central banks can use reserves to influence rates. Speculative attacks can force currency devaluation. Fixed exchange rates require sufficient reserves and credible policy. The Thai crisis showed the vulnerability of fixed rates without strong fundamentals.`,
        importantPoints: [
          'Forex market is where currencies are traded',
          'Supply and demand determine exchange rates',
          'Central banks use reserves to influence rates',
          'Speculative attacks can force devaluation',
          'Fixed rates require sufficient reserves and credibility',
        ],
      } as ArticleContent,
      {
        id: 'macroecon-u6-l3-practice',
        type: 'practice',
        title: 'Practice: The foreign exchange market',
        exercises: [
          {
            id: 'practice-6-3-1',
            prompt: 'Draw supply and demand curves for US dollars. Show what happens when foreign demand for US goods increases.',
            hints: [
              'Demand curve shifts right',
              'Equilibrium exchange rate rises',
              'USD appreciates',
            ],
          },
          {
            id: 'practice-6-3-2',
            prompt: 'Explain how a central bank can use foreign reserves to prevent its currency from depreciating.',
            hints: [
              'Sell foreign reserves',
              'Buy domestic currency',
              'Increases demand for domestic currency',
            ],
          },
          {
            id: 'practice-6-3-3',
            prompt: 'What is a speculative attack? How did it contribute to the Thai financial crisis?',
            hints: [
              'Large-scale selling of currency',
              'Self-fulfilling depreciation',
              'Exhausts reserves',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'macroecon-u6-l3-quiz',
        type: 'quiz',
        title: 'Quiz: The foreign exchange market',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-6-4',
    title: 'Effect of changes in policies and economic conditions on the foreign exchange market',
    duration: '30 min',
    contentItems: [
      {
        id: 'macroecon-u6-l4-video-1',
        type: 'video',
        title: 'Effect of changes in policies and economic conditions on the foreign exchange market',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'macroecon-u6-l4-article',
        type: 'article',
        title: 'Learn: Effect of changes in policies and economic conditions on the foreign exchange market',
        content: `# Effect of changes in policies and economic conditions on the foreign exchange market

## Causes of shifts in currency supply and demand curves

**Factors that shift demand for currency** (increase demand → currency appreciates):

1. **Increase in foreign demand for exports**:
   - Foreigners need currency to buy goods
   - Demand curve shifts right
   - Currency appreciates

2. **Increase in foreign investment**:
   - Foreigners need currency to invest
   - Demand curve shifts right
   - Currency appreciates

3. **Higher interest rates** (relative to other countries):
   - Attracts foreign capital
   - Demand curve shifts right
   - Currency appreciates

4. **Higher expected returns**:
   - Speculators buy currency
   - Demand curve shifts right
   - Currency appreciates

5. **Economic growth**:
   - Attracts investment
   - Demand curve shifts right
   - Currency appreciates

**Factors that shift supply of currency** (increase supply → currency depreciates):

1. **Increase in demand for imports**:
   - Residents need foreign currency
   - Supply of domestic currency increases
   - Supply curve shifts right
   - Currency depreciates

2. **Increase in foreign investment by residents**:
   - Residents need foreign currency
   - Supply of domestic currency increases
   - Currency depreciates

3. **Lower interest rates** (relative to other countries):
   - Capital flows out
   - Supply curve shifts right
   - Currency depreciates

4. **Lower expected returns**:
   - Speculators sell currency
   - Supply curve shifts right
   - Currency depreciates

5. **Inflation**:
   - Reduces competitiveness
   - Supply curve shifts right
   - Currency depreciates

## Fiscal policy effects

**Expansionary fiscal policy** (increase spending, decrease taxes):
- Increases income and imports
- Increases supply of currency
- Currency depreciates
- BUT: Also increases interest rates (if financed by borrowing)
- Higher interest rates increase demand
- Net effect depends on relative magnitudes

**Contractionary fiscal policy**:
- Decreases income and imports
- Decreases supply of currency
- Currency appreciates
- BUT: Also decreases interest rates
- Lower interest rates decrease demand
- Net effect depends on relative magnitudes

## Monetary policy effects

**Expansionary monetary policy** (increase money supply, lower interest rates):
- Lower interest rates → Capital outflows
- Supply of currency increases
- Currency depreciates
- Also: Higher inflation → Further depreciation

**Contractionary monetary policy** (decrease money supply, raise interest rates):
- Higher interest rates → Capital inflows
- Demand for currency increases
- Currency appreciates
- Also: Lower inflation → Further appreciation

## Other economic conditions

**Inflation**:
- Reduces competitiveness
- Increases supply of currency
- Currency depreciates

**Economic growth**:
- Can attract investment (appreciation)
- Can increase imports (depreciation)
- Net effect depends on relative magnitudes

**Political stability**:
- Stability attracts investment (appreciation)
- Instability causes capital flight (depreciation)

## Lesson summary: Effect of changes in policies and economic conditions on the foreign exchange market

Many factors shift currency supply and demand. Higher interest rates, exports, and investment increase demand (appreciation). Higher imports, lower interest rates, and inflation increase supply (depreciation). Fiscal policy has mixed effects. Monetary policy clearly affects exchange rates through interest rates. Economic conditions like growth, inflation, and stability also matter.`,
        importantPoints: [
          'Many factors shift currency supply and demand',
          'Higher interest rates → Currency appreciation',
          'Higher imports → Currency depreciation',
          'Monetary policy affects exchange rates through interest rates',
          'Fiscal policy has mixed effects depending on relative magnitudes',
        ],
      } as ArticleContent,
      {
        id: 'macroecon-u6-l4-practice',
        type: 'practice',
        title: 'Practice: Effect of changes in policies and economic conditions on the foreign exchange market',
        exercises: [
          {
            id: 'practice-6-4-1',
            prompt: 'Show on a supply-demand diagram what happens to the exchange rate when a country raises its interest rates. Explain the mechanism.',
            hints: [
              'Higher interest rates attract foreign capital',
              'Demand for currency increases',
              'Currency appreciates',
            ],
          },
          {
            id: 'practice-6-4-2',
            prompt: 'How does expansionary monetary policy affect the exchange rate? Show both the interest rate effect and the inflation effect.',
            hints: [
              'Lower interest rates → Capital outflows → Depreciation',
              'Higher inflation → Further depreciation',
            ],
          },
          {
            id: 'practice-6-4-3',
            prompt: 'Explain why expansionary fiscal policy might have mixed effects on the exchange rate.',
            hints: [
              'Increases imports → Depreciation',
              'Increases interest rates → Appreciation',
              'Net effect depends on relative magnitudes',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'macroecon-u6-l4-quiz',
        type: 'quiz',
        title: 'Quiz: Effect of changes in policies and economic conditions on the foreign exchange market',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-6-5',
    title: 'Real interest rates and international capital flows',
    duration: '30 min',
    contentItems: [
      {
        id: 'macroecon-u6-l5-video-1',
        type: 'video',
        title: 'Real interest rates and international capital flows',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'macroecon-u6-l5-article',
        type: 'article',
        title: 'Learn: Changes in the foreign exchange markets and net exports',
        content: `# Real interest rates and international capital flows

## Introduction to currency exchange and trade

**International capital flows** are movements of money across borders for investment.

**Real interest rate** = Nominal interest rate - Inflation rate

**Key relationship**: Real interest rate differentials drive international capital flows.

**Capital flows**:
- **Inflows**: Foreigners invest in country (demand for currency increases)
- **Outflows**: Residents invest abroad (supply of currency increases)

## Real interest rates and capital flows

**Higher real interest rates** (relative to other countries):
- Attract foreign investment
- Capital inflows increase
- Demand for currency increases
- Currency appreciates

**Lower real interest rates** (relative to other countries):
- Discourage foreign investment
- Capital outflows increase
- Supply of currency increases
- Currency depreciates

**Real vs. nominal rates**:
- Investors care about real returns (purchasing power)
- Real rate = Nominal rate - Inflation
- High nominal rate with high inflation = Low real rate

## Exchange rates and net exports

**When currency appreciates**:
- Domestic goods become more expensive for foreigners
- Foreign goods become cheaper for domestic residents
- Exports decrease
- Imports increase
- Net exports decrease (trade balance worsens)

**When currency depreciates**:
- Domestic goods become cheaper for foreigners
- Foreign goods become more expensive for domestic residents
- Exports increase
- Imports decrease
- Net exports increase (trade balance improves)

**J-curve effect**:
- Initially: Depreciation may worsen trade balance (contracts in foreign currency)
- Eventually: Trade balance improves (volume effect dominates)

## Policy implications

**Monetary policy**:
- Lower interest rates → Currency depreciates → Net exports increase
- Higher interest rates → Currency appreciates → Net exports decrease

**Fiscal policy**:
- Expansionary → Higher interest rates → Currency appreciates → Net exports decrease
- This offsets some of the expansionary effect

**Trade-offs**:
- Can't simultaneously have:
  - Fixed exchange rate
  - Independent monetary policy
  - Free capital flows
- Must choose two (impossible trinity)

## Lesson summary: Changes in the foreign exchange markets and net exports

Real interest rate differentials drive international capital flows. Higher real rates attract capital (appreciation). Lower real rates cause capital outflows (depreciation). Currency appreciation reduces net exports. Currency depreciation increases net exports. Monetary and fiscal policies affect exchange rates and thus trade balances. The impossible trinity limits policy options.`,
        importantPoints: [
          'Real interest rate differentials drive capital flows',
          'Higher real rates → Capital inflows → Currency appreciation',
          'Currency appreciation → Lower net exports',
          'Currency depreciation → Higher net exports',
          'Impossible trinity: can\'t have fixed rate, independent monetary policy, and free capital flows',
        ],
      } as ArticleContent,
      {
        id: 'macroecon-u6-l5-practice',
        type: 'practice',
        title: 'Practice: Changes in the foreign exchange markets and net exports',
        exercises: [
          {
            id: 'practice-6-5-1',
            prompt: 'Explain how an increase in real interest rates affects capital flows and the exchange rate.',
            hints: [
              'Attracts foreign investment',
              'Capital inflows increase',
              'Currency appreciates',
            ],
          },
          {
            id: 'practice-6-5-2',
            prompt: 'Show how currency appreciation affects net exports. Use the relationship between exchange rates and trade.',
            hints: [
              'Appreciation makes exports more expensive',
              'Makes imports cheaper',
              'Net exports decrease',
            ],
          },
          {
            id: 'practice-6-5-3',
            prompt: 'What is the impossible trinity? Why can\'t a country have all three: fixed exchange rate, independent monetary policy, and free capital flows?',
            hints: [
              'Fixed rate requires intervention',
              'Independent monetary policy changes interest rates',
              'Free capital flows respond to interest rates',
              'These conflict with fixed rate',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'macroecon-u6-l5-quiz',
        type: 'quiz',
        title: 'Quiz: Real interest rates and international capital flows',
        questions: [],
      } as QuizContent,
    ],
  },
];

const unit7Lessons: Lesson[] = [
  {
    id: 'lesson-7-1',
    title: 'The consumption function',
    duration: '25 min',
    contentItems: [
      {
        id: 'macroecon-u7-l1-video-1',
        type: 'video',
        title: 'The consumption function',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'macroecon-u7-l1-article',
        type: 'article',
        title: 'Learn: The consumption function',
        content: `# The consumption function

## Consumption function basics

The **consumption function** shows the relationship between disposable income and consumption spending.

**Key relationship**: C = f(Yd)

Where:
- C = Consumption
- Yd = Disposable income (income after taxes)

**Basic consumption function**: C = a + bYd

Where:
- **a** = Autonomous consumption (consumption when income is zero)
- **b** = Marginal propensity to consume (MPC)
- **Yd** = Disposable income

**Marginal Propensity to Consume (MPC)**:
- The fraction of additional income that is consumed
- MPC = ΔC / ΔYd
- Typically between 0 and 1 (0 < MPC < 1)

**Average Propensity to Consume (APC)**:
- The fraction of total income that is consumed
- APC = C / Yd
- Decreases as income increases

## Generalized linear consumption function

**General form**: C = C₀ + MPC × Yd

Where:
- C₀ = Autonomous consumption (intercept)
- MPC = Slope of the consumption function

**Properties**:
- **Intercept (C₀)**: Consumption when income is zero (may require borrowing or using savings)
- **Slope (MPC)**: How much consumption increases for each dollar of additional income
- **Linear relationship**: Straight line on a graph

**Graphical representation**:
- Y-axis: Consumption (C)
- X-axis: Disposable income (Yd)
- Upward sloping line
- Intercept at C₀
- Slope equals MPC

**Key insight**: As income increases, consumption increases, but by less than the increase in income (MPC < 1).

## Consumption function with income-dependent taxes

When taxes depend on income, disposable income becomes: Yd = Y - T(Y)

Where T(Y) is a function of income.

**Example with proportional tax**: T = tY (where t is the tax rate)

Then: Yd = Y - tY = Y(1 - t)

**Consumption function becomes**: C = C₀ + MPC × Y(1 - t)

**Effect of taxes**:
- Taxes reduce disposable income
- Lower disposable income → Lower consumption
- The consumption function shifts down or becomes flatter

**Marginal propensity to consume out of total income**:
- With taxes: MPC' = MPC × (1 - t)
- Lower than MPC because taxes reduce disposable income

**Key insight**: Income-dependent taxes reduce the marginal propensity to consume out of total income, dampening the consumption response to changes in income.`,
        importantPoints: [
          'Consumption function: C = C₀ + MPC × Yd',
          'MPC is the fraction of additional income consumed',
          'Consumption increases with income but by less than income',
          'Taxes reduce disposable income and thus consumption',
          'With proportional taxes, MPC out of total income is lower',
        ],
      } as ArticleContent,
      {
        id: 'macroecon-u7-l1-practice',
        type: 'practice',
        title: 'Practice: The consumption function',
        exercises: [
          {
            id: 'practice-7-1-1',
            prompt: 'If the consumption function is C = 100 + 0.8Yd, what is autonomous consumption and the MPC? If disposable income is $1,000, what is consumption?',
            hints: [
              'Autonomous consumption is the constant term',
              'MPC is the coefficient of Yd',
              'Substitute Yd = 1000 into the equation',
            ],
          },
          {
            id: 'practice-7-1-2',
            prompt: 'Explain the difference between marginal propensity to consume (MPC) and average propensity to consume (APC). Why does APC decrease as income increases?',
            hints: [
              'MPC = change in consumption / change in income',
              'APC = total consumption / total income',
              'Autonomous consumption is fixed',
            ],
          },
          {
            id: 'practice-7-1-3',
            prompt: 'If the tax rate is 20% and MPC = 0.9, what is the marginal propensity to consume out of total income? Show your calculation.',
            hints: [
              'Disposable income = Y(1 - t)',
              'MPC out of total income = MPC × (1 - t)',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'macroecon-u7-l1-quiz',
        type: 'quiz',
        title: 'Quiz: The consumption function',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-7-2',
    title: 'The Keynesian cross',
    duration: '30 min',
    contentItems: [
      {
        id: 'macroecon-u7-l2-video-1',
        type: 'video',
        title: 'The Keynesian cross',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'macroecon-u7-l2-article',
        type: 'article',
        title: 'Learn: The Keynesian cross',
        content: `# The Keynesian cross

## Keynesian cross

The **Keynesian cross** (also called the expenditure-output model) shows equilibrium in the goods market.

**Key concept**: Equilibrium occurs where planned aggregate expenditure equals actual output (income).

**Planned Aggregate Expenditure (AE)**: AE = C + I + G + NX

Where:
- C = Consumption
- I = Investment (planned)
- G = Government spending
- NX = Net exports

**Equilibrium condition**: AE = Y

Where Y is actual output (GDP).

**45-degree line**: Represents all points where expenditure equals output (AE = Y).

**Equilibrium point**: Where the AE curve intersects the 45-degree line.

## Details on shifting aggregate planned expenditures

**Factors that shift the AE curve**:

1. **Changes in autonomous consumption (C₀)**:
   - Increase → AE shifts up
   - Decrease → AE shifts down

2. **Changes in investment (I)**:
   - Increase → AE shifts up
   - Decrease → AE shifts down

3. **Changes in government spending (G)**:
   - Increase → AE shifts up
   - Decrease → AE shifts down

4. **Changes in net exports (NX)**:
   - Increase → AE shifts up
   - Decrease → AE shifts down

5. **Changes in taxes**:
   - Increase → Disposable income decreases → Consumption decreases → AE shifts down
   - Decrease → Disposable income increases → Consumption increases → AE shifts up

**Slope of AE curve**: Equals the marginal propensity to consume (MPC).

## Keynesian cross and the multiplier

**The multiplier effect**: A change in autonomous spending leads to a larger change in equilibrium output.

**Multiplier formula**: Multiplier = 1 / (1 - MPC)

Or: Multiplier = 1 / MPS (where MPS = 1 - MPC is the marginal propensity to save)

**Why the multiplier exists**:
1. Initial spending increases income
2. Higher income increases consumption (by MPC × ΔY)
3. Higher consumption increases income further
4. Process continues, but each round is smaller
5. Total effect is larger than initial change

**Example**: If MPC = 0.8, multiplier = 1 / (1 - 0.8) = 5
- $100 increase in government spending
- Leads to $500 increase in equilibrium output

**Government spending multiplier**: ΔY = (1 / (1 - MPC)) × ΔG

**Tax multiplier**: ΔY = (-MPC / (1 - MPC)) × ΔT
- Smaller than spending multiplier (in absolute value)
- Negative because taxes reduce spending

## The expenditure-output, or Keynesian cross, model

**Graphical representation**:
- Y-axis: Aggregate expenditure (AE) and Output (Y)
- X-axis: Output/Income (Y)
- 45-degree line: AE = Y
- AE curve: Upward sloping (slope = MPC)
- Equilibrium: Intersection of AE curve and 45-degree line

**When AE > Y** (above 45-degree line):
- Planned spending exceeds output
- Inventories fall
- Firms increase production
- Output increases toward equilibrium

**When AE < Y** (below 45-degree line):
- Planned spending is less than output
- Inventories rise
- Firms decrease production
- Output decreases toward equilibrium

**Key insight**: The economy adjusts through inventory changes, moving toward equilibrium where planned spending equals output.

**Limitations**:
- Assumes fixed price level
- Short-run model
- Doesn't consider supply constraints`,
        importantPoints: [
          'Equilibrium: Planned aggregate expenditure = Output',
          '45-degree line shows all points where AE = Y',
          'AE curve shifts with changes in autonomous spending',
          'Multiplier = 1 / (1 - MPC)',
          'Economy adjusts through inventory changes',
        ],
      } as ArticleContent,
      {
        id: 'macroecon-u7-l2-practice',
        type: 'practice',
        title: 'Practice: The Keynesian cross',
        exercises: [
          {
            id: 'practice-7-2-1',
            prompt: 'Draw a Keynesian cross diagram. Show what happens to equilibrium output when government spending increases. Explain the adjustment process.',
            hints: [
              'AE curve shifts up',
              'New equilibrium at higher output',
              'Adjustment through inventory changes',
            ],
          },
          {
            id: 'practice-7-2-2',
            prompt: 'If MPC = 0.75, what is the multiplier? If government spending increases by $200, what is the change in equilibrium output?',
            hints: [
              'Multiplier = 1 / (1 - MPC)',
              'ΔY = Multiplier × ΔG',
            ],
          },
          {
            id: 'practice-7-2-3',
            prompt: 'Why is the tax multiplier smaller (in absolute value) than the government spending multiplier? Calculate both if MPC = 0.8.',
            hints: [
              'Tax multiplier = -MPC / (1 - MPC)',
              'Spending multiplier = 1 / (1 - MPC)',
              'Taxes affect disposable income, not total spending directly',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'macroecon-u7-l2-quiz',
        type: 'quiz',
        title: 'Quiz: The Keynesian cross',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-7-3',
    title: 'IS-LM',
    duration: '40 min',
    contentItems: [
      {
        id: 'macroecon-u7-l3-video-1',
        type: 'video',
        title: 'IS-LM',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'macroecon-u7-l3-article',
        type: 'article',
        title: 'Learn: IS-LM',
        content: `# IS-LM

## Investment and real interest rates

**Investment function**: I = I(r)

Where I is investment and r is the real interest rate.

**Key relationship**: Investment is negatively related to the real interest rate.

**Why**:
- Higher interest rates → Higher cost of borrowing
- Higher cost of borrowing → Fewer profitable investment projects
- Lower investment

**Investment demand curve**:
- Downward sloping
- Y-axis: Real interest rate (r)
- X-axis: Investment (I)
- Shows how investment decreases as interest rate increases

**Shifts in investment demand**:
- **Increase** (shift right) when:
  - Expected profits increase
  - Business confidence improves
  - Technology improves
  - Tax incentives for investment
- **Decrease** (shift left) when:
  - Expected profits decrease
  - Business confidence falls
  - Pessimistic expectations

## Connecting the Keynesian cross to the IS curve

**IS curve** (Investment-Saving curve) shows combinations of interest rates and output where the goods market is in equilibrium.

**Derivation from Keynesian cross**:
1. Start with Keynesian cross (AE = Y)
2. Investment depends on interest rate: I = I(r)
3. For each interest rate, find equilibrium output
4. Plot interest rate vs. equilibrium output
5. This gives the IS curve

**IS curve properties**:
- **Downward sloping**: Higher interest rates → Lower investment → Lower equilibrium output
- **Shifts right** when:
  - Government spending increases
  - Taxes decrease
  - Autonomous consumption increases
  - Investment demand increases (for reasons other than interest rate)
- **Shifts left** when opposite changes occur

**IS curve equation** (simplified): Y = C(Y - T) + I(r) + G

## Loanable funds interpretation of IS curve

**Loanable funds market**:
- Demand for loanable funds = Investment
- Supply of loanable funds = Saving

**Equilibrium**: I(r) = S(Y - T)

Where S is saving.

**IS curve connection**:
- At each point on IS curve, investment equals saving
- Higher output → Higher saving → Lower interest rate needed for equilibrium
- This explains why IS curve slopes downward

**Key insight**: The IS curve represents goods market equilibrium where investment equals saving at different combinations of interest rates and output.

## LM part of the IS-LM model

**LM curve** (Liquidity-Money curve) shows combinations of interest rates and output where the money market is in equilibrium.

**Money market equilibrium**: Money supply = Money demand

**Money demand**:
- **Transaction demand**: Depends on income (Y) - higher income → more transactions → more money needed
- **Speculative demand**: Depends on interest rate (r) - higher interest rate → opportunity cost of holding money → less money demanded

**Money demand function**: M^d = L(Y, r)
- Increases with income (Y)
- Decreases with interest rate (r)

**LM curve derivation**:
- For each level of output (Y), find the interest rate where money supply equals money demand
- Plot interest rate vs. output
- This gives the LM curve

**LM curve properties**:
- **Upward sloping**: Higher output → Higher money demand → Higher interest rate for equilibrium
- **Shifts** when:
  - Money supply changes (shifts LM)
  - Money demand function changes (shifts LM)

## Government spending and the IS-LM model

**IS-LM equilibrium**: Intersection of IS and LM curves determines both interest rate and output.

**Increase in government spending**:
1. IS curve shifts right (higher G → higher AE → higher equilibrium output at each interest rate)
2. New equilibrium: Higher output AND higher interest rate
3. **Crowding out**: Higher interest rate reduces investment
4. Output increase is smaller than in simple Keynesian cross (due to crowding out)

**Fiscal policy in IS-LM**:
- **Expansionary fiscal policy**: Shifts IS right → Higher output, higher interest rate
- **Contractionary fiscal policy**: Shifts IS left → Lower output, lower interest rate

**Monetary policy in IS-LM**:
- **Expansionary monetary policy**: Increases money supply → LM shifts right → Lower interest rate, higher output
- **Contractionary monetary policy**: Decreases money supply → LM shifts left → Higher interest rate, lower output

**Key insight**: IS-LM model shows how fiscal and monetary policies interact, with interest rates affecting both investment and money market equilibrium.`,
        importantPoints: [
          'IS curve: Goods market equilibrium (investment = saving)',
          'LM curve: Money market equilibrium (money supply = money demand)',
          'IS slopes down: Higher interest rates → Lower output',
          'LM slopes up: Higher output → Higher interest rates',
          'IS-LM intersection determines both output and interest rate',
        ],
      } as ArticleContent,
      {
        id: 'macroecon-u7-l3-practice',
        type: 'practice',
        title: 'Practice: IS-LM',
        exercises: [
          {
            id: 'practice-7-3-1',
            prompt: 'Explain why the IS curve is downward sloping. Use the relationship between interest rates, investment, and equilibrium output.',
            hints: [
              'Higher interest rates reduce investment',
              'Lower investment reduces aggregate expenditure',
              'Lower AE reduces equilibrium output',
            ],
          },
          {
            id: 'practice-7-3-2',
            prompt: 'Draw an IS-LM diagram. Show what happens when the money supply increases. Explain the adjustment process.',
            hints: [
              'LM curve shifts right',
              'New equilibrium: Lower interest rate, higher output',
              'Lower interest rate increases investment',
            ],
          },
          {
            id: 'practice-7-3-3',
            prompt: 'Using the IS-LM model, explain why an increase in government spending leads to both higher output and higher interest rates. What is crowding out?',
            hints: [
              'IS curve shifts right',
              'Higher output increases money demand',
              'Higher interest rate reduces investment (crowding out)',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'macroecon-u7-l3-quiz',
        type: 'quiz',
        title: 'Quiz: IS-LM',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-7-4',
    title: 'Keynesian economics and its critiques',
    duration: '35 min',
    contentItems: [
      {
        id: 'macroecon-u7-l4-video-1',
        type: 'video',
        title: 'Keynesian economics and its critiques',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'macroecon-u7-l4-article',
        type: 'article',
        title: 'Learn: Keynesian economics and its critiques',
        content: `# Keynesian economics and its critiques

## Keynesian economics

**Keynesian economics** emphasizes the role of aggregate demand in determining output and employment, especially in the short run.

**Key principles**:
1. **Demand determines output**: Aggregate demand drives economic activity
2. **Sticky prices and wages**: Prices and wages adjust slowly
3. **Involuntary unemployment**: Can persist due to insufficient demand
4. **Role of government**: Government should intervene to stabilize the economy
5. **Short-run focus**: Emphasizes short-run fluctuations over long-run growth

**Keynesian view of recessions**:
- Caused by insufficient aggregate demand
- Can persist without government intervention
- Government spending can stimulate demand and output
- Multiplier effect amplifies impact of spending

## Risks of Keynesian thinking

**Criticisms and risks**:

1. **Inflation risk**:
   - Excessive demand stimulus can cause inflation
   - Especially problematic near full employment

2. **Crowding out**:
   - Government spending may reduce private investment
   - Higher interest rates offset some fiscal stimulus

3. **Budget deficits**:
   - Persistent deficits can lead to debt accumulation
   - Future generations bear the cost

4. **Time lags**:
   - Policy takes time to implement and take effect
   - May be too late or counterproductive

5. **Political economy**:
   - Politicians may use fiscal policy for political gain
   - Difficult to reverse expansionary policies

6. **Supply-side neglect**:
   - Focuses on demand, may ignore supply constraints
   - Long-run growth requires supply-side factors

## Macroeconomic perspectives on demand and supply

**Keynesian perspective**:
- Emphasizes demand-side factors
- Short-run fluctuations driven by demand
- Government can manage demand

**Classical/Neoclassical perspective**:
- Emphasizes supply-side factors
- Markets self-adjust to full employment
- Government intervention often harmful
- Long-run growth depends on supply

**Modern synthesis**:
- Both demand and supply matter
- Short run: Demand is key (Keynesian)
- Long run: Supply is key (Classical)
- Different policies for different time horizons

## Keynes' Law and Say's Law in the AD/AS model

**Say's Law**: "Supply creates its own demand"
- Classical view
- Production generates income
- Income is spent on goods
- No general overproduction possible
- Markets always clear

**Keynes' Law**: "Demand creates its own supply"
- Keynesian view
- Demand drives production
- Insufficient demand → Unemployment
- Markets may not clear
- Government intervention needed

**In AD/AS model**:
- **Say's Law**: Emphasizes vertical AS (long run)
- **Keynes' Law**: Emphasizes horizontal AS (short run, with unemployment)
- Modern view: AS slopes upward (both matter)

## Aggregate demand in Keynesian analysis

**Keynesian AD**:
- Consumption (C): Depends on income
- Investment (I): Depends on interest rates and expectations
- Government spending (G): Policy variable
- Net exports (NX): Depends on income and exchange rates

**Key features**:
- AD is relatively stable in short run
- Shifts in AD cause output changes
- Price level may be sticky
- Output adjusts to demand

**Multiplier effects**:
- Changes in autonomous spending have amplified effects
- Due to consumption-income relationship
- Larger in closed economy with no taxes

## The building blocks of Keynesian analysis

**Core components**:

1. **Consumption function**: C = C₀ + MPC × Yd
   - Consumption depends on disposable income
   - MPC < 1 (not all income consumed)

2. **Investment function**: I = I(r, expectations)
   - Investment depends on interest rates
   - Also depends on business confidence

3. **Government spending**: G (exogenous)
   - Policy tool
   - Can stabilize economy

4. **Multiplier**: 1 / (1 - MPC)
   - Amplifies spending changes
   - Key to Keynesian policy effectiveness

5. **Sticky prices**: Prices adjust slowly
   - Allows output to adjust
   - Enables demand management

## The Phillips curve in the Keynesian perspective

**Keynesian view of Phillips Curve**:
- Short-run trade-off between inflation and unemployment
- Can reduce unemployment by accepting higher inflation
- Policy can move along the curve

**Policy implications**:
- Can target lower unemployment
- Accept moderate inflation
- Use demand management

**Critique**:
- Long-run: No trade-off (vertical Phillips curve)
- Expectations matter
- Inflation expectations adjust
- Trade-off disappears in long run

## The Keynesian perspective on market forces

**Keynesian view**:
- Markets don't always self-adjust
- Can get stuck in recession
- Involuntary unemployment can persist
- Government intervention justified

**Market failures**:
- Coordination failures
- Sticky prices and wages
- Expectations can be wrong
- Animal spirits (irrational behavior)

**Role of government**:
- Stabilize aggregate demand
- Use fiscal and monetary policy
- Counteract business cycles
- Maintain full employment

**Critique from other schools**:
- Markets are efficient
- Government intervention causes problems
- Self-adjustment works
- Focus on long-run growth, not short-run fluctuations`,
        importantPoints: [
          'Keynesian economics emphasizes demand and short-run fluctuations',
          'Government intervention can stabilize the economy',
          'Risks include inflation, crowding out, and deficits',
          'Keynes\' Law: Demand creates supply (vs. Say\'s Law: Supply creates demand)',
          'Keynesian view: Markets may not self-adjust, government intervention needed',
        ],
      } as ArticleContent,
      {
        id: 'macroecon-u7-l4-practice',
        type: 'practice',
        title: 'Practice: Keynesian economics and its critiques',
        exercises: [
          {
            id: 'practice-7-4-1',
            prompt: 'Compare and contrast Say\'s Law and Keynes\' Law. How do they differ in their views of how markets work?',
            hints: [
              'Say\'s Law: Supply creates demand',
              'Keynes\' Law: Demand creates supply',
              'Different views on market adjustment',
            ],
          },
          {
            id: 'practice-7-4-2',
            prompt: 'What are the main risks and criticisms of Keynesian economic policy? Discuss at least three.',
            hints: [
              'Inflation risk',
              'Crowding out',
              'Budget deficits',
              'Time lags',
            ],
          },
          {
            id: 'practice-7-4-3',
            prompt: 'Explain the Keynesian perspective on the Phillips Curve. How does this differ from the long-run view?',
            hints: [
              'Short-run trade-off exists',
              'Can reduce unemployment with inflation',
              'Long-run: No trade-off',
              'Expectations matter',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'macroecon-u7-l4-quiz',
        type: 'quiz',
        title: 'Quiz: Keynesian economics and its critiques',
        questions: [],
      } as QuizContent,
    ],
  },
];

const unit8Lessons: Lesson[] = [
  {
    id: 'lesson-8-1',
    title: 'Analysis of income inequality in the United States (in partnership with The New York Times)',
    duration: '30 min',
    contentItems: [
      {
        id: 'macroecon-u8-l1-video-1',
        type: 'video',
        title: 'Analysis of income inequality in the United States',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'macroecon-u8-l1-article',
        type: 'article',
        title: 'Learn: Analysis of income inequality in the United States',
        content: `# Analysis of income inequality in the United States

## Introduction to series analyzing income and wealth trends in the US

This analysis examines income and wealth inequality in the United States, providing data-driven insights into economic trends over recent decades.

**Key questions**:
- How has income inequality changed over time?
- What are the trends in wealth distribution?
- How does the US compare to other countries?
- What factors drive inequality?

**Data sources**: Partnership with The New York Times provides comprehensive analysis of economic data.

## Looking at trends in inflation-adjusted income since 1980

**Key findings since 1980**:

**Top 1% of earners**:
- Experienced significant income growth
- Income increased substantially faster than inflation
- Captured large share of total income growth

**Middle class**:
- Stagnant or slow income growth
- Real wages barely increased
- Struggled to keep up with inflation

**Bottom 20% of earners**:
- Minimal income growth
- Often fell behind inflation
- Increased reliance on government transfers

**Overall trends**:
- Income inequality increased dramatically
- Top earners pulled away from the rest
- Middle class squeezed
- Wage growth did not keep pace with productivity growth

**Factors contributing to inequality**:
- Technological change (skill-biased)
- Globalization (offshoring, trade)
- Decline in unionization
- Changes in tax policy
- Financialization of the economy

## Comparing income trends across countries

**United States**:
- Higher inequality than most developed countries
- Larger gap between top and bottom
- Less redistribution through taxes and transfers

**Other developed countries** (e.g., Western Europe, Canada):
- Lower inequality levels
- More progressive tax systems
- Stronger social safety nets
- More equal income distribution

**Emerging economies**:
- Mixed trends
- Some reducing inequality (e.g., Brazil)
- Others increasing (e.g., China, India)

**Key insight**: The US has higher inequality than most peer countries, suggesting policy choices matter.

## Per capita GDP trends over 70 years

**Long-term trends** (1950-2020):

**Overall growth**:
- Per capita GDP increased substantially
- Living standards improved significantly
- But growth not evenly distributed

**Periods of growth**:
- 1950s-1970s: Strong, broadly shared growth
- 1980s-2000s: Growth continued but less shared
- 2000s-2020s: Slower growth, concentrated at top

**Distribution of growth**:
- Early period: Growth benefited most income groups
- Later period: Growth concentrated at top
- Middle and bottom saw less benefit

**Key insight**: GDP growth doesn't automatically translate to shared prosperity.

## US taxation trends in the post-war era

**Tax policy changes**:

**1950s-1970s**:
- Higher top marginal tax rates
- More progressive tax system
- Corporate taxes higher
- Estate taxes stronger

**1980s-2000s**:
- Tax cuts (especially for high earners)
- Lower top marginal rates
- Reduced progressivity
- Corporate tax cuts

**2000s-2020s**:
- Further tax cuts
- Capital gains tax preferences
- Reduced estate taxes
- Less progressive overall

**Impact on inequality**:
- Tax cuts at top increased after-tax inequality
- Reduced redistribution
- Less revenue for social programs
- Contributed to rising inequality

**Key insight**: Tax policy changes have reduced progressivity and contributed to rising inequality.`,
        importantPoints: [
          'Income inequality in US has increased dramatically since 1980',
          'Top 1% captured large share of income growth',
          'Middle class income stagnated',
          'US has higher inequality than most peer countries',
          'Tax policy changes reduced progressivity',
        ],
      } as ArticleContent,
      {
        id: 'macroecon-u8-l1-practice',
        type: 'practice',
        title: 'Practice: Analysis of income inequality in the United States',
        exercises: [
          {
            id: 'practice-8-1-1',
            prompt: 'Describe the trends in income inequality in the US since 1980. How have different income groups fared?',
            hints: [
              'Top 1%: significant growth',
              'Middle class: stagnation',
              'Bottom: minimal growth',
            ],
          },
          {
            id: 'practice-8-1-2',
            prompt: 'Compare income inequality in the US to other developed countries. What factors might explain the differences?',
            hints: [
              'US has higher inequality',
              'Tax systems differ',
              'Social safety nets differ',
            ],
          },
          {
            id: 'practice-8-1-3',
            prompt: 'How have tax policy changes in the post-war era contributed to income inequality?',
            hints: [
              'Tax cuts at top',
              'Reduced progressivity',
              'Less redistribution',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'macroecon-u8-l1-quiz',
        type: 'quiz',
        title: 'Quiz: Analysis of income inequality in the United States',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-8-2',
    title: 'National income and inequality',
    duration: '45 min',
    contentItems: [
      {
        id: 'macroecon-u8-l2-video-1',
        type: 'video',
        title: 'National income and inequality',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'macroecon-u8-l2-article',
        type: 'article',
        title: 'Learn: National income and inequality',
        content: `# National income and inequality

## Capital by Thomas Piketty

**Thomas Piketty's "Capital in the Twenty-First Century"** analyzes wealth and income inequality over long historical periods.

**Key thesis**: Without intervention, capitalism tends toward increasing inequality.

**Main argument**: When return on capital (r) exceeds economic growth (g), wealth inequality increases.

**Historical data**: Piketty uses extensive data from multiple countries over centuries to support his analysis.

## Difference between wealth and income

**Wealth** (capital):
- Stock variable (accumulated over time)
- Total value of assets owned
- Includes: real estate, stocks, bonds, businesses, savings
- Can be inherited or accumulated

**Income**:
- Flow variable (earned per period)
- Money received from work, investments, transfers
- Includes: wages, salaries, interest, dividends, rent
- Earned regularly (monthly, yearly)

**Key relationship**: Income from capital contributes to wealth accumulation.

**Example**: 
- Wealth: $1 million in stocks
- Income: $50,000 per year from dividends (5% return)

## What is capital?

**Capital** (in Piketty's framework):
- All forms of wealth that can generate income
- Includes: real estate, financial assets, businesses
- Excludes: human capital (education, skills)

**Types of capital**:
- **Real capital**: Physical assets (land, buildings, machinery)
- **Financial capital**: Stocks, bonds, savings
- **Business capital**: Ownership of companies

**Key characteristic**: Capital generates returns (rent, interest, dividends, profits).

## Piketty's two drivers of divergence

**1. r > g (Return on capital > Economic growth)**:
- When returns on capital exceed economic growth
- Wealth grows faster than income
- Inherited wealth becomes more important
- Inequality increases over time

**2. High concentration of capital ownership**:
- Capital is unequally distributed
- Top 10% or 1% own most capital
- Returns on capital go to those who already have wealth
- Reinforces inequality

**Combined effect**: These two factors create a dynamic where inequality tends to increase.

## Is rising inequality necessarily bad?

**Arguments that inequality can be beneficial**:
- Incentives for innovation and entrepreneurship
- Rewards hard work and talent
- Can drive economic growth
- Efficient allocation of resources

**Arguments that inequality is harmful**:
- Reduces social mobility
- Undermines democracy
- Creates social unrest
- Reduces aggregate demand
- Wastes human potential

**Key question**: At what point does inequality become problematic?

## Convergence on macro scale

**Convergence**: Tendency for poorer countries to grow faster and catch up to richer countries.

**Mechanisms**:
- Technology transfer
- Capital flows to high-return areas
- Learning from advanced economies
- Globalization

**Evidence**: Many developing countries have grown faster than developed countries in recent decades.

**Limitation**: Convergence doesn't guarantee equality within countries.

## Education as a force of convergence

**Education reduces inequality** by:
- Increasing human capital
- Improving job opportunities
- Raising wages
- Promoting social mobility

**Skill-biased technological change**:
- Technology increases demand for skilled workers
- Education becomes more valuable
- But can increase inequality if access to education is unequal

**Key insight**: Equal access to quality education is crucial for reducing inequality.

## Gilded Age versus Silicon Valley

**Gilded Age** (late 1800s):
- High inequality
- Wealth from inheritance and land
- Industrial magnates
- r > g

**Silicon Valley** (modern):
- High inequality
- Wealth from innovation and technology
- Tech entrepreneurs
- But also: inherited advantages, network effects

**Similarities**: Both periods show high inequality, though sources differ.

**Differences**: Modern inequality may be more merit-based, but still problematic.

## Inverse relationship between capital price and returns

**When capital prices rise** (e.g., real estate, stocks):
- Returns (as percentage) may fall
- Example: If stock price doubles, dividend yield halves (if dividends constant)
- Capital gains vs. income returns

**When capital prices fall**:
- Returns (as percentage) may rise
- Lower prices → Higher yields

**Key insight**: High asset prices can reduce returns, but capital gains can still benefit owners.

## Connecting income to capital growth and potential inequality

**Mechanism**:
1. High income → Can save and invest
2. Investment → Accumulates capital
3. Capital → Generates returns (income)
4. Returns → Can be reinvested
5. Cycle continues, wealth compounds

**If r > g**:
- Capital income grows faster than labor income
- Wealthy get wealthier relative to workers
- Inequality increases

**Key insight**: The relationship between capital returns and growth determines inequality dynamics.

## r greater than g and less inequality

**Possible scenarios where r > g but inequality doesn't increase**:

1. **High taxes on capital**:
   - Progressive taxation reduces after-tax returns
   - Redistributes income
   - Reduces inequality

2. **High savings by middle class**:
   - If middle class also accumulates capital
   - More equal distribution of capital ownership
   - Reduces inequality

3. **Strong social mobility**:
   - People move between income groups
   - Prevents permanent concentration
   - Reduces inequality

4. **Destruction of capital** (wars, crises):
   - Resets wealth distribution
   - Reduces inequality (though at great cost)

## r greater than g but less inequality

**Additional factors that can reduce inequality even when r > g**:

1. **Progressive inheritance taxes**:
   - Prevents dynastic wealth accumulation
   - Redistributes capital

2. **Public investment in education**:
   - Increases human capital
   - Raises labor income
   - Reduces reliance on capital income

3. **Strong labor unions**:
   - Increases wages
   - Reduces capital's share of income

4. **Regulation**:
   - Limits excessive returns
   - Promotes competition

## Return on capital and economic growth

**Historical relationship**:
- **r** (return on capital): Typically 4-5% historically
- **g** (economic growth): Varies by period and country
  - Pre-industrial: ~0.5-1%
  - Industrial era: 1-2%
  - Post-war: 2-4%
  - Recent: 1-2% in developed countries

**When r > g**: Capital income grows faster than total income, increasing inequality.

**When r < g**: Total income grows faster, reducing relative importance of capital.

## Critically looking at data on ROC and economic growth over millenia

**Long-term data challenges**:
- Limited historical data
- Different measurement methods
- Changing definitions of capital
- Data quality varies

**Key findings**:
- r has been relatively stable (4-5%)
- g has varied more (0.5-4%)
- r > g in most periods
- Exceptions: post-war period (g sometimes > r)

**Critiques**:
- Data may not be fully comparable
- Definitions of capital change
- Measurement issues
- But general pattern seems robust

## Simple model to understand r and g relationship

**Basic model**:

If r > g:
- Capital income grows at rate r
- Total income grows at rate g
- Capital's share of income increases
- Inequality increases

**Mathematical relationship**:
- Capital's share = (Capital / Income) × r
- If Capital/Income ratio increases, capital's share increases
- If r > g, Capital/Income tends to increase

**Key insight**: The r > g relationship creates a tendency toward increasing inequality, though other factors can counteract it.`,
        importantPoints: [
          'Wealth (stock) differs from income (flow)',
          'Piketty\'s thesis: r > g leads to increasing inequality',
          'Capital ownership is highly concentrated',
          'Education can reduce inequality through human capital',
          'Historical data shows r typically exceeds g',
        ],
      } as ArticleContent,
      {
        id: 'macroecon-u8-l2-practice',
        type: 'practice',
        title: 'Practice: National income and inequality',
        exercises: [
          {
            id: 'practice-8-2-1',
            prompt: 'Explain the difference between wealth and income. Why is this distinction important for understanding inequality?',
            hints: [
              'Wealth is stock, income is flow',
              'Wealth can generate income',
              'Inequality in wealth vs. income',
            ],
          },
          {
            id: 'practice-8-2-2',
            prompt: 'What is Piketty\'s r > g thesis? How does this relationship contribute to inequality?',
            hints: [
              'r = return on capital',
              'g = economic growth',
              'When r > g, capital income grows faster',
            ],
          },
          {
            id: 'practice-8-2-3',
            prompt: 'Under what conditions might inequality not increase even when r > g?',
            hints: [
              'Progressive taxation',
              'High savings by middle class',
              'Strong social mobility',
              'Public investment in education',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'macroecon-u8-l2-quiz',
        type: 'quiz',
        title: 'Quiz: National income and inequality',
        questions: [],
      } as QuizContent,
    ],
  },
  {
    id: 'lesson-8-3',
    title: 'The 2008 Financial Crisis',
    duration: '50 min',
    contentItems: [
      {
        id: 'macroecon-u8-l3-video-1',
        type: 'video',
        title: 'The 2008 Financial Crisis',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'macroecon-u8-l3-article',
        type: 'article',
        title: 'Learn: The 2008 Financial Crisis',
        content: `# The 2008 Financial Crisis

## CNN: Understanding the crisis

The 2008 Financial Crisis was the most severe economic crisis since the Great Depression.

**Timeline**:
- 2007: Subprime mortgage crisis begins
- 2008: Lehman Brothers collapses, crisis intensifies
- 2009: Global recession, massive government intervention
- 2010s: Slow recovery

**Key causes**:
- Housing bubble
- Subprime lending
- Financial innovation (securitization, derivatives)
- Excessive leverage
- Regulatory failures

## Bailout 1: Liquidity vs. solvency

**Liquidity crisis**: Bank can't meet short-term obligations but is fundamentally solvent (assets > liabilities).

**Solvency crisis**: Bank's liabilities exceed assets (insolvent).

**Key distinction**:
- **Liquidity problem**: Temporary, can be solved with loans
- **Solvency problem**: Fundamental, requires restructuring or closure

**2008 crisis**: Many banks faced both:
- Short-term liquidity problems (can't roll over debt)
- Long-term solvency problems (assets worth less than thought)

**Policy response**: 
- Liquidity: Provide loans (Fed's role)
- Solvency: Inject capital or restructure (TARP's role)

## Bailout 2: Book value

**Book value**: Value of assets as recorded on bank's balance sheet (historical cost).

**Market value**: Current market price of assets.

**Problem in 2008**:
- Banks held assets (mortgages, MBS) at book value
- Market value had fallen dramatically
- But banks didn't mark down (mark-to-market)
- Created illusion of solvency

**Example**: 
- Book value: $100 (what bank paid)
- Market value: $30 (current price)
- Bank appears solvent but actually insolvent

## Bailout 3: Book value vs. market value

**Why the gap matters**:
- If assets marked to market, many banks would be insolvent
- But marking to market creates losses
- Losses reduce capital
- Low capital → Can't lend → Credit freeze

**Dilemma**:
- Mark to market → Reveals insolvency → Panic
- Don't mark to market → Hide problem → Delay solution

**2008 approach**: Initially avoided mark-to-market, then gradually recognized losses.

## Bailout 4: Mark-to-model vs. mark-to-market

**Mark-to-market**: Value assets at current market prices.

**Mark-to-model**: Value assets using mathematical models (when no market exists).

**Problem in 2008**:
- Many complex securities had no active market
- Banks used models to value them
- Models assumed normal conditions
- Underestimated risk and losses

**When markets froze**:
- No market prices available
- Had to rely on models
- Models proved wrong
- Created uncertainty about true values

## Bailout 5: Paying off the debt

**Option 1: Government pays off bank's debt**

**How it works**:
- Government takes on bank's liabilities
- Pays creditors
- Bank becomes solvent

**Problems**:
- Rewards bad behavior (moral hazard)
- Very expensive for taxpayers
- Doesn't address underlying problems
- Unfair (bails out creditors)

**Not used in 2008**: Would have been too costly and politically unpopular.

## Bailout 6: Getting an equity infusion

**Option 2: Government injects equity (capital)**

**How it works**:
- Government buys bank stock
- Provides capital
- Bank becomes solvent
- Government becomes part owner

**Advantages**:
- Bank survives
- Taxpayers get ownership stake
- Can recover some money if bank recovers
- Less moral hazard than paying debt

**Used in 2008**: TARP (Troubled Asset Relief Program) injected capital into banks.

## Bailout 7: Bank goes into bankruptcy

**Option 3: Let bank fail (bankruptcy)**

**How it works**:
- Bank enters bankruptcy
- Assets sold
- Creditors take losses
- Shareholders wiped out

**Advantages**:
- No moral hazard
- Market discipline
- Removes bad actors

**Disadvantages**:
- Can cause panic
- Contagion to other banks
- Credit freeze
- Economic damage

**2008 example**: Lehman Brothers was allowed to fail, which intensified the crisis.

## Bailout 8: Systemic risk

**Systemic risk**: Risk that failure of one institution causes failure of entire system.

**Why banks are systemically important**:
- Interconnected (lend to each other)
- Provide essential services (credit)
- Loss of confidence spreads
- Can freeze entire economy

**2008 crisis**: 
- Failure of one bank threatened others
- Credit markets froze
- Real economy suffered
- Required government intervention

**Key insight**: Some institutions are "too big to fail" because of systemic risk.

## Bailout 9: Paulson's plan

**Treasury Secretary Henry Paulson's plan (TARP)**:

**Original plan**: Buy troubled assets from banks
- Remove bad assets from bank balance sheets
- Provide liquidity
- Stabilize markets

**Problems**:
- Hard to price assets (no market)
- Very expensive
- Slow to implement

**Revised plan**: Inject capital directly
- Faster
- More effective
- Government gets equity stake

**Result**: $700 billion program, mostly capital injections.

## Bailout 10: Moral hazard

**Moral hazard**: When protection from risk encourages risky behavior.

**In banking**:
- If banks know they'll be bailed out, they take more risk
- Expect government to rescue them
- Don't bear full cost of failure
- Creates future crises

**2008 bailout created moral hazard**:
- Banks rescued from their own mistakes
- Signals that some banks are "too big to fail"
- May encourage future risk-taking

**Mitigation**: 
- Regulations (Dodd-Frank)
- Stress tests
- Capital requirements
- But moral hazard remains a concern

## Bailout 11: Why these CDOs could be worth nothing

**CDO (Collateralized Debt Obligation)**: Complex security backed by mortgages.

**Why CDOs became worthless**:
- Backed by subprime mortgages
- Mortgages defaulted
- No income from underlying assets
- No market willing to buy
- Models had underestimated default risk

**Tranches**:
- CDOs divided into risk levels (tranches)
- Senior tranches supposed to be safe
- But even senior tranches suffered losses
- Models failed to predict correlation

**Key insight**: Complex financial products can become worthless when underlying assumptions fail.

## Bailout 12: Lone Star transaction

**Example of asset purchase program**:

**Lone Star transaction**:
- Private equity firm bought troubled assets
- At deep discount
- Made profit when markets recovered
- Shows private sector can handle some assets

**Lesson**: Not all assets needed government purchase; some could be handled by private sector.

**But**: Many assets were too toxic for private buyers, requiring government intervention.

## Bailout 13: Does the bailout have a chance of working?

**Factors for success**:
- Sufficient size ($700 billion)
- Quick implementation
- Addresses both liquidity and solvency
- Restores confidence
- Prevents systemic collapse

**Risks**:
- May not be enough
- Moral hazard
- Political opposition
- May not restore lending

**Initial uncertainty**: No guarantee it would work, but necessary to try given systemic risk.

## Bailout 14: Possible solution

**Comprehensive approach needed**:

1. **Liquidity**: Fed provides loans (discount window, QE)
2. **Capital**: Government injects equity (TARP)
3. **Asset purchases**: Remove toxic assets (limited)
4. **Guarantees**: Insure assets (FDIC, other programs)
5. **Regulation**: Prevent future crises

**Multi-pronged approach**: No single solution; needed combination of tools.

## Bailout 15: More on the solution

**Additional measures**:

**Fiscal stimulus**:
- Government spending to boost demand
- Tax cuts
- Infrastructure spending
- American Recovery and Reinvestment Act (2009)

**Monetary policy**:
- Zero interest rates
- Quantitative easing (QE)
- Unconventional tools

**Regulatory reform**:
- Dodd-Frank Act (2010)
- Stress tests
- Higher capital requirements
- Consumer protection

**Key insight**: Crisis required comprehensive response: bailouts, stimulus, monetary policy, and regulation.`,
        importantPoints: [
          'Crisis caused by housing bubble, subprime lending, excessive leverage',
          'Distinction between liquidity and solvency problems',
          'Book value vs. market value created illusion of solvency',
          'Systemic risk required government intervention',
          'TARP injected capital, but created moral hazard',
        ],
      } as ArticleContent,
      {
        id: 'macroecon-u8-l3-practice',
        type: 'practice',
        title: 'Practice: The 2008 Financial Crisis',
        exercises: [
          {
            id: 'practice-8-3-1',
            prompt: 'Explain the difference between a liquidity crisis and a solvency crisis. Why is this distinction important for policy?',
            hints: [
              'Liquidity: temporary, can\'t meet obligations',
              'Solvency: fundamental, liabilities > assets',
              'Different policy responses needed',
            ],
          },
          {
            id: 'practice-8-3-2',
            prompt: 'What is systemic risk? Why did it justify government bailouts in 2008?',
            hints: [
              'Failure of one institution threatens system',
              'Interconnected financial system',
              'Credit freeze affects real economy',
            ],
          },
          {
            id: 'practice-8-3-3',
            prompt: 'What is moral hazard? How did the 2008 bailouts create moral hazard, and how can it be mitigated?',
            hints: [
              'Protection encourages risky behavior',
              'Banks may take more risk if bailed out',
              'Regulation, capital requirements, stress tests',
            ],
          },
        ],
      } as PracticeContent,
      {
        id: 'macroecon-u8-l3-quiz',
        type: 'quiz',
        title: 'Quiz: The 2008 Financial Crisis',
        questions: [],
      } as QuizContent,
    ],
  },
];

const units: Unit[] = [
  {
    id: 'unit-1',
    title: 'Unit 1: Basic economics concepts',
    description: 'Introduction to fundamental economic concepts and principles',
    lessons: unit1Lessons,
  },
  {
    id: 'unit-2',
    title: 'Unit 2: Economic indicators and the business cycle',
    description: 'Understanding GDP, unemployment, inflation, and business cycles',
    lessons: unit2Lessons,
  },
  {
    id: 'unit-3',
    title: 'Unit 3: National income and price determination',
    description: 'Understanding aggregate demand, aggregate supply, and fiscal policy',
    lessons: unit3Lessons,
  },
  {
    id: 'unit-4',
    title: 'Unit 4: Financial sector',
    description: 'Understanding money, banking, financial markets, and monetary policy',
    lessons: unit4Lessons,
  },
  {
    id: 'unit-5',
    title: 'Unit 5: Long-run consequences of stabilization policies',
    description: 'Understanding long-run effects of fiscal and monetary policy, growth, and debt',
    lessons: unit5Lessons,
  },
  {
    id: 'unit-6',
    title: 'Unit 6: Open economy: international trade and finance',
    description: 'Understanding balance of payments, exchange rates, and international capital flows',
    lessons: unit6Lessons,
  },
  {
    id: 'unit-7',
    title: 'Unit 7: Keynesian approaches and IS-LM',
    description: 'Understanding consumption functions, Keynesian cross, IS-LM model, and Keynesian economics',
    lessons: unit7Lessons,
  },
  {
    id: 'unit-8',
    title: 'Unit 8: Contemporary macroeconomic issues',
    description: 'Understanding income inequality, wealth distribution, and the 2008 financial crisis',
    lessons: unit8Lessons,
  },
];

export const macroeconomicsCourse: Course = {
  id: 'macroeconomics',
  title: 'Macroeconomics',
  description:
    'Comprehensive study of macroeconomic principles, policies, and their impact on global economies',
  units,
  finalExamPassRate: 75,
  finalExam: [],
};
