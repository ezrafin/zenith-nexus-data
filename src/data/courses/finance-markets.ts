import type {
  Course,
  Unit,
  Lesson,
  VideoContent,
  ArticleContent,
} from '../courseTypes';

const unit1Lessons: Lesson[] = [
  {
    id: 'lesson-1-1',
    title: 'Compound interest basics',
    duration: '25 min',
    contentItems: [
      {
        id: 'finance-u1-l1-video-1',
        type: 'video',
        title: 'Compound interest basics',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'finance-u1-l1-article',
        type: 'article',
        title: 'Learn: Compound interest basics',
        content: `# Compound interest basics

## Compound interest introduction

**Compound interest**: Interest earned on both the principal and previously earned interest.

**Key difference from simple interest**:
- **Simple interest**: Interest only on principal
- **Compound interest**: Interest on principal + accumulated interest

**Formula**: A = P(1 + r)^n

Where:
- A = Final amount
- P = Principal (initial amount)
- r = Interest rate per period
- n = Number of periods

**Example**:
- Principal: $1,000
- Rate: 10% per year
- After 1 year: $1,100
- After 2 years: $1,210 (interest on $1,100, not just $1,000)

**Key insight**: Compound interest allows money to grow faster because you earn interest on interest.

## The rule of 72 for compound interest

**Rule of 72**: Approximate time to double your money.

**Formula**: Years to double = 72 / Interest rate (%)

**Example**:
- At 6% interest: 72 / 6 = 12 years to double
- At 9% interest: 72 / 9 = 8 years to double
- At 12% interest: 72 / 12 = 6 years to double

**Why it works**:
- Approximation based on compound interest formula
- Works well for rates between 6% and 10%
- Less accurate for very high or very low rates

**Key insight**: The rule of 72 provides a quick way to estimate how long it takes for money to double with compound interest.`,
        importantPoints: [
          'Compound interest: interest on principal + accumulated interest',
          'Formula: A = P(1 + r)^n',
          'Rule of 72: approximate years to double = 72 / interest rate',
          'Compound interest grows faster than simple interest',
        ],
      } as ArticleContent,
    ],
  },
  {
    id: 'lesson-1-2',
    title: 'Interest basics',
    duration: '30 min',
    contentItems: [
      {
        id: 'finance-u1-l2-video-1',
        type: 'video',
        title: 'Interest basics',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'finance-u1-l2-article',
        type: 'article',
        title: 'Learn: Interest basics',
        content: `# Interest basics

## Introduction to interest

**Interest**: Price paid for borrowing money (or return earned for lending money).

**Key concepts**:
- **Principal**: Amount borrowed or invested
- **Interest rate**: Percentage charged or earned
- **Time period**: Length of loan or investment

**Types of interest**:
- **Simple interest**: Calculated only on principal
- **Compound interest**: Calculated on principal + accumulated interest

**Why interest exists**:
- Time value of money (money today worth more than money tomorrow)
- Risk (lender takes risk)
- Opportunity cost (could use money elsewhere)
- Inflation (money loses value over time)

**Key insight**: Interest compensates lenders for time, risk, and opportunity cost.

## Compound interest

**Compound interest**: Interest calculated on principal plus all previously earned interest.

**Key features**:
- Interest earns interest (snowball effect)
- Grows exponentially over time
- More frequent compounding = more growth

**Compounding frequency**:
- **Annual**: Once per year
- **Semi-annual**: Twice per year
- **Quarterly**: Four times per year
- **Monthly**: Twelve times per year
- **Daily**: 365 times per year
- **Continuous**: Infinite times per year

**Formula for different frequencies**:
- A = P(1 + r/n)^(nt)
- Where n = number of compounding periods per year
- Where t = number of years

**Example**:
- $1,000 at 12% annual rate
- Annual compounding: $1,120 after 1 year
- Monthly compounding: $1,126.83 after 1 year
- More frequent = more growth

**Key insight**: More frequent compounding leads to higher returns due to interest earning interest more often.`,
        importantPoints: [
          'Interest: price for borrowing or return for lending',
          'Compound interest: interest on principal + accumulated interest',
          'More frequent compounding = higher returns',
          'Formula: A = P(1 + r/n)^(nt)',
        ],
      } as ArticleContent,
    ],
  },
  {
    id: 'lesson-1-3',
    title: 'Credit cards and loans',
    duration: '35 min',
    contentItems: [
      {
        id: 'finance-u1-l3-video-1',
        type: 'video',
        title: 'Credit cards and loans',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'finance-u1-l3-article',
        type: 'article',
        title: 'Learn: Credit cards and loans',
        content: `# Credit cards and loans

## Annual percentage rate (APR) and effective APR

**Annual Percentage Rate (APR)**: Annual interest rate charged on loans or credit cards.

**Key features**:
- Standardized way to compare loans
- Includes interest and some fees
- Expressed as annual percentage

**Effective APR (EAR)**: Actual annual rate when compounding is considered.

**Difference**:
- APR: Stated annual rate
- EAR: Actual rate after compounding
- EAR > APR (when compounding more than annually)

**Formula**: EAR = (1 + APR/n)^n - 1

Where n = number of compounding periods per year

**Example**:
- APR = 12% compounded monthly
- EAR = (1 + 0.12/12)^12 - 1 = 12.68%
- EAR is higher due to monthly compounding

**Key insight**: Effective APR shows the true cost of borrowing when compounding is considered.

## Institutional roles in issuing and processing credit cards

**Key players**:

1. **Issuing bank**: 
   - Issues credit cards to consumers
   - Extends credit
   - Bears default risk
   - Examples: Chase, Bank of America, Capital One

2. **Merchant**:
   - Accepts credit card payments
   - Pays interchange fee (typically 1-3%)
   - Benefits from increased sales

3. **Payment processor**:
   - Processes transactions
   - Connects merchants to card networks
   - Examples: Stripe, Square, PayPal

4. **Card networks**:
   - Operate payment infrastructure
   - Set interchange fees
   - Examples: Visa, Mastercard, American Express

5. **Acquiring bank**:
   - Processes payments for merchants
   - Handles settlement

**Key insight**: Multiple institutions work together to enable credit card transactions, each earning fees.

## Payday loans

**Payday loans**: Short-term, high-interest loans typically due on next payday.

**Characteristics**:
- Very high interest rates (often 300-400% APR)
- Small loan amounts ($100-$1,000 typically)
- Short terms (usually 2-4 weeks)
- No credit check required
- Secured by post-dated check or bank account access

**Why they exist**:
- Serve people with poor credit
- Provide quick access to cash
- No collateral required

**Problems**:
- Extremely expensive
- Can trap borrowers in debt cycle
- Fees can exceed loan amount
- Difficult to repay

**Alternatives**:
- Personal loans from banks
- Credit union loans
- Payment plans with creditors
- Emergency savings

**Key insight**: Payday loans are extremely expensive and should be avoided when possible.`,
        importantPoints: [
          'APR: stated annual interest rate',
          'Effective APR: actual rate after compounding',
          'Credit card system involves multiple institutions',
          'Payday loans: very high interest, should be avoided',
        ],
      } as ArticleContent,
    ],
  },
  {
    id: 'lesson-1-4',
    title: 'Continuous compound interest and e',
    duration: '30 min',
    contentItems: [
      {
        id: 'finance-u1-l4-video-1',
        type: 'video',
        title: 'Continuous compound interest and e',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'finance-u1-l4-article',
        type: 'article',
        title: 'Learn: Continuous compound interest and e',
        content: `# Continuous compound interest and e

## e and compound interest

**e (Euler's number)**: Mathematical constant approximately equal to 2.71828.

**Connection to compound interest**:
- e represents the limit of (1 + 1/n)^n as n approaches infinity
- This is the maximum growth possible with continuous compounding
- e appears naturally in continuous compounding formulas

**Key insight**: e is the mathematical constant that represents continuous growth.

## e as a limit

**Definition of e**:
- e = lim(n→∞) (1 + 1/n)^n
- As n gets larger, (1 + 1/n)^n approaches e

**Example**:
- n = 1: (1 + 1/1)^1 = 2
- n = 10: (1 + 1/10)^10 ≈ 2.594
- n = 100: (1 + 1/100)^100 ≈ 2.705
- n = 1000: (1 + 1/1000)^1000 ≈ 2.717
- n = ∞: e ≈ 2.71828

**Key insight**: e is the limit of compound interest as compounding frequency approaches infinity.

## Formula for continuously compounding interest

**Continuous compounding formula**: A = Pe^(rt)

Where:
- A = Final amount
- P = Principal
- e = Euler's number (≈ 2.71828)
- r = Annual interest rate
- t = Time in years

**Comparison to discrete compounding**:
- Discrete: A = P(1 + r/n)^(nt)
- Continuous: A = Pe^(rt)
- Continuous gives slightly higher returns (maximum possible)

**Example**:
- $1,000 at 10% for 1 year
- Annual compounding: $1,100
- Monthly compounding: $1,104.71
- Continuous compounding: $1,105.17

**Key insight**: Continuous compounding provides the maximum possible growth, using the mathematical constant e.`,
        importantPoints: [
          'e (Euler\'s number) ≈ 2.71828',
          'e = limit of (1 + 1/n)^n as n → ∞',
          'Continuous compounding: A = Pe^(rt)',
          'Continuous compounding gives maximum growth',
        ],
      } as ArticleContent,
    ],
  },
  {
    id: 'lesson-1-5',
    title: 'Present value',
    duration: '40 min',
    contentItems: [
      {
        id: 'finance-u1-l5-video-1',
        type: 'video',
        title: 'Present value',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'finance-u1-l5-article',
        type: 'article',
        title: 'Learn: Present value',
        content: `# Present value

## Time value of money

**Time value of money**: Money today is worth more than the same amount in the future.

**Reasons**:
- **Interest**: Can invest and earn returns
- **Inflation**: Money loses purchasing power over time
- **Risk**: Future is uncertain
- **Opportunity cost**: Could use money now

**Key principle**: A dollar today is worth more than a dollar tomorrow.

**Key insight**: Understanding time value of money is fundamental to finance.

## Introduction to present value

**Present value (PV)**: Current worth of a future sum of money.

**Formula**: PV = FV / (1 + r)^n

Where:
- FV = Future value
- r = Discount rate (interest rate)
- n = Number of periods

**Example**:
- Future value: $1,100 in 1 year
- Interest rate: 10%
- Present value: $1,100 / (1.10) = $1,000

**Key insight**: Present value discounts future cash flows to their current worth.

## Present value 2

**Multiple periods**:
- PV = FV / (1 + r)^n
- As n increases, PV decreases
- Higher discount rate → Lower present value

**Example**:
- $1,000 in 2 years at 10%
- PV = $1,000 / (1.10)^2 = $826.45

**Key insight**: Present value decreases as time and discount rate increase.

## Present value 3

**Multiple cash flows**:
- PV of series = Sum of PV of each cash flow
- PV = C₁/(1+r) + C₂/(1+r)² + ... + Cₙ/(1+r)ⁿ

**Example**:
- $100 in year 1, $200 in year 2, $300 in year 3
- Rate: 10%
- PV = 100/1.10 + 200/1.10² + 300/1.10³
- PV = $90.91 + $165.29 + $225.39 = $481.59

**Key insight**: Present value of multiple cash flows is the sum of individual present values.

## Present value 4 (and discounted cash flow)

**Discounted cash flow (DCF)**:
- Method to value investments
- Discounts all future cash flows to present
- Used in investment analysis

**Formula for annuity** (equal payments):
- PV = C × [1 - (1+r)^(-n)] / r

**Formula for perpetuity** (infinite payments):
- PV = C / r

**Applications**:
- Valuing stocks (dividend discount model)
- Valuing bonds
- Capital budgeting
- Investment decisions

**Key insight**: Discounted cash flow analysis is fundamental to investment valuation.`,
        importantPoints: [
          'Time value of money: money today worth more than future',
          'Present value: current worth of future sum',
          'PV = FV / (1 + r)^n',
          'DCF: discounts all future cash flows to present',
        ],
      } as ArticleContent,
    ],
  },
  {
    id: 'lesson-1-6',
    title: 'Personal bankruptcy',
    duration: '30 min',
    contentItems: [
      {
        id: 'finance-u1-l6-video-1',
        type: 'video',
        title: 'Personal bankruptcy',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'finance-u1-l6-article',
        type: 'article',
        title: 'Learn: Personal bankruptcy',
        content: `# Personal bankruptcy

## Personal bankruptcy: Chapters 7 and 13

**Bankruptcy**: Legal process for individuals or businesses unable to repay debts.

**Purpose**:
- Provide fresh start for debtors
- Fair distribution to creditors
- Orderly resolution of financial distress

**Chapter 7 (Liquidation)**:
- **Process**: Assets sold to pay creditors
- **Assets**: Non-exempt assets liquidated
- **Exemptions**: Some assets protected (homestead, retirement accounts, etc.)
- **Discharge**: Remaining unsecured debts discharged (forgiven)
- **Timeline**: Usually 3-6 months
- **Eligibility**: Must pass means test (income below median)

**Chapter 13 (Reorganization)**:
- **Process**: Repayment plan (3-5 years)
- **Assets**: Keep assets, repay debts over time
- **Plan**: Propose plan to repay portion of debts
- **Discharge**: Remaining debts discharged after plan completion
- **Timeline**: 3-5 years
- **Eligibility**: Must have regular income

**Key differences**:
- Chapter 7: Quick, liquidates assets, discharges debts
- Chapter 13: Longer, keeps assets, repays over time

**Consequences**:
- Credit score severely damaged
- Stays on credit report 7-10 years
- Difficulty getting credit
- May affect employment, housing

**Key insight**: Bankruptcy provides debt relief but has serious long-term consequences.`,
        importantPoints: [
          'Bankruptcy: legal process for debt relief',
          'Chapter 7: liquidation, quick discharge',
          'Chapter 13: reorganization, repayment plan',
          'Serious consequences: credit damage, long-term effects',
        ],
      } as ArticleContent,
    ],
  },
];

const unit2Lessons: Lesson[] = [
  {
    id: 'lesson-2-1',
    title: 'Home equity and personal balance sheets',
    duration: '35 min',
    contentItems: [
      {
        id: 'finance-u2-l1-video-1',
        type: 'video',
        title: 'Home equity and personal balance sheets',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'finance-u2-l1-article',
        type: 'article',
        title: 'Learn: Home equity and personal balance sheets',
        content: `# Home equity and personal balance sheets

## Introduction to balance sheets

**Balance sheet**: Financial statement showing assets, liabilities, and equity at a point in time.

**Formula**: Assets = Liabilities + Equity

**Components**:
- **Assets**: What you own (cash, investments, property, etc.)
- **Liabilities**: What you owe (loans, credit card debt, etc.)
- **Equity**: Net worth (Assets - Liabilities)

**Key insight**: Balance sheet shows your financial position at a specific moment.

## More on balance sheets and equity

**Assets** (what you own):
- **Current assets**: Cash, checking/savings accounts
- **Investments**: Stocks, bonds, retirement accounts
- **Real estate**: Home value, rental properties
- **Personal property**: Cars, furniture, etc.

**Liabilities** (what you owe):
- **Current liabilities**: Credit card debt, short-term loans
- **Long-term liabilities**: Mortgages, student loans, car loans

**Equity** (net worth):
- Equity = Assets - Liabilities
- Represents ownership value
- Can be positive (assets > liabilities) or negative (debt > assets)

**Key insight**: Equity represents your true wealth after accounting for all debts.

## Home equity

**Home equity**: Value of your ownership in your home.

**Formula**: Home Equity = Home Value - Mortgage Balance

**Example**:
- Home value: $300,000
- Mortgage balance: $200,000
- Home equity: $100,000

**How equity grows**:
- **Appreciation**: Home value increases
- **Principal payments**: Paying down mortgage
- **Improvements**: Renovations increase value

**Key insight**: Home equity represents the portion of your home you actually own.

## Home equity loans

**Home equity loan**: Loan secured by your home equity.

**Types**:
1. **Home equity loan**: Lump sum, fixed rate, fixed payments
2. **Home equity line of credit (HELOC)**: Revolving credit, variable rate

**Uses**:
- Home improvements
- Debt consolidation
- Major expenses (education, medical)

**Risks**:
- Home is collateral (can lose home if default)
- Interest may not be tax-deductible (depends on use)
- Can lead to over-borrowing

**Key insight**: Home equity loans allow you to borrow against your home's value, but put your home at risk.`,
        importantPoints: [
          'Balance sheet: Assets = Liabilities + Equity',
          'Home equity = Home value - Mortgage balance',
          'Equity grows through appreciation and principal payments',
          'Home equity loans use home as collateral',
        ],
      } as ArticleContent,
    ],
  },
  {
    id: 'lesson-2-2',
    title: 'Renting vs. buying a home',
    duration: '40 min',
    contentItems: [
      {
        id: 'finance-u2-l2-video-1',
        type: 'video',
        title: 'Renting vs. buying a home',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'finance-u2-l2-article',
        type: 'article',
        title: 'Learn: Renting vs. buying a home',
        content: `# Renting vs. buying a home

## Renting versus buying a home

**Renting advantages**:
- **Flexibility**: Easy to move
- **No maintenance**: Landlord responsible
- **Lower upfront costs**: Security deposit vs. down payment
- **No property taxes**: Included in rent
- **No risk of depreciation**: Don't lose if value falls

**Buying advantages**:
- **Build equity**: Ownership accumulates
- **Tax benefits**: Mortgage interest deduction (if applicable)
- **Stability**: Fixed payments (with fixed-rate mortgage)
- **Freedom**: Can modify property
- **Potential appreciation**: Home value may increase

**Key insight**: The decision depends on personal circumstances, financial situation, and housing market.

## Is buying a home always better?

**Not always**:
- **High transaction costs**: Closing costs, realtor fees
- **Maintenance costs**: Repairs, upkeep
- **Property taxes**: Ongoing expense
- **Opportunity cost**: Down payment could be invested
- **Market risk**: Home value can decrease
- **Lack of flexibility**: Harder to move

**When renting may be better**:
- Short-term stay (< 5 years)
- Unstable income
- High maintenance costs
- Declining market
- Better investment opportunities elsewhere

**Key insight**: Buying isn't always the best financial decision. Consider all costs and your situation.

## What happens when housing depreciates

**Housing depreciation**: Home value decreases.

**Consequences**:
- **Negative equity**: Owe more than home is worth
- **Underwater mortgage**: Can't sell without loss
- **Reduced wealth**: Net worth decreases
- **Difficulty refinancing**: Need equity to refinance
- **Foreclosure risk**: If can't make payments

**Example**:
- Bought home: $300,000
- Mortgage: $250,000
- Home value drops to $200,000
- Equity: -$50,000 (negative equity)
- Owe more than home is worth

**Key insight**: Housing depreciation can create serious financial problems, especially with high leverage.

## Renting vs. buying (detailed analysis)

**Cost comparison**:

**Renting**:
- Monthly rent
- Security deposit (refundable)
- Renter's insurance
- Moving costs (if frequent)

**Buying**:
- Down payment (opportunity cost)
- Monthly mortgage payment (principal + interest)
- Property taxes
- Homeowners insurance
- Maintenance and repairs
- Closing costs
- Real estate agent fees (when selling)

**Break-even analysis**:
- Calculate total cost of renting vs. buying
- Consider time horizon
- Factor in appreciation/depreciation
- Include opportunity cost of down payment

**Key insight**: Detailed analysis requires comparing all costs over the expected time horizon.`,
        importantPoints: [
          'Renting: flexibility, no maintenance, lower upfront costs',
          'Buying: builds equity, tax benefits, stability',
          'Buying not always better: consider transaction costs, maintenance, opportunity cost',
          'Housing depreciation can create negative equity',
          'Detailed analysis requires comparing all costs',
        ],
      } as ArticleContent,
    ],
  },
  {
    id: 'lesson-2-3',
    title: 'Mortgages',
    duration: '50 min',
    contentItems: [
      {
        id: 'finance-u2-l3-video-1',
        type: 'video',
        title: 'Mortgages',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'finance-u2-l3-article',
        type: 'article',
        title: 'Learn: Mortgages',
        content: `# Mortgages

## Introduction to mortgage loans

**Mortgage**: Loan secured by real estate property.

**Key components**:
- **Principal**: Amount borrowed
- **Interest rate**: Cost of borrowing
- **Term**: Length of loan (typically 15, 20, or 30 years)
- **Monthly payment**: Principal + interest

**Types**:
- **Fixed-rate mortgage**: Interest rate stays constant
- **Adjustable-rate mortgage (ARM)**: Interest rate changes
- **Conventional**: Not government-backed
- **FHA/VA**: Government-backed loans

**Key insight**: Mortgages allow people to buy homes by borrowing money secured by the property.

## Mortgage interest rates

**Factors affecting rates**:
- **Credit score**: Higher score → Lower rate
- **Down payment**: Larger down payment → Lower rate
- **Loan term**: Shorter term → Lower rate (but higher payment)
- **Market rates**: Follow general interest rate trends
- **Loan type**: Government-backed may have different rates

**Fixed vs. variable**:
- **Fixed**: Rate locked in, predictable payments
- **Variable**: Rate can change, payments may fluctuate

**Key insight**: Mortgage rates depend on borrower characteristics, loan terms, and market conditions.

## Short sale basics

**Short sale**: Selling home for less than mortgage balance.

**When it happens**:
- Home value < Mortgage balance
- Borrower can't make payments
- Lender agrees to accept less than owed

**Process**:
1. Borrower requests short sale
2. Lender approves (may require hardship)
3. Home sold at market value
4. Lender accepts proceeds (less than owed)
5. Remaining debt may be forgiven or pursued

**Consequences**:
- Credit damage (less than foreclosure)
- May owe taxes on forgiven debt
- Difficult to get new mortgage

**Key insight**: Short sale is an alternative to foreclosure when home value is less than mortgage.

## Adjustable rate mortgages (ARMs)

**ARM**: Mortgage with interest rate that changes over time.

**Structure**:
- **Initial rate**: Lower than fixed rate (teaser rate)
- **Adjustment period**: How often rate changes (e.g., annually)
- **Index**: Benchmark rate (e.g., LIBOR, Treasury rate)
- **Margin**: Fixed amount added to index
- **Caps**: Limits on rate changes

**Example**: 5/1 ARM
- Fixed rate for 5 years
- Then adjusts annually
- Based on index + margin

**Risks**:
- Rate can increase significantly
- Payments can become unaffordable
- May need to refinance

**Key insight**: ARMs offer lower initial rates but carry risk of future rate increases.

## Hybrid ARM

**Hybrid ARM**: Combination of fixed and adjustable periods.

**Common types**:
- **3/1 ARM**: Fixed 3 years, then adjusts annually
- **5/1 ARM**: Fixed 5 years, then adjusts annually
- **7/1 ARM**: Fixed 7 years, then adjusts annually
- **10/1 ARM**: Fixed 10 years, then adjusts annually

**Benefits**:
- Lower initial rate than 30-year fixed
- Fixed period provides stability
- Good for short-term ownership

**Risks**:
- Rate increases after fixed period
- May need to refinance or sell

**Key insight**: Hybrid ARMs provide initial stability with lower rates, but risk future increases.

## Balloon payment mortgage

**Balloon mortgage**: Large final payment (balloon payment) at end of term.

**Structure**:
- Lower monthly payments initially
- Large lump sum payment at end
- Often 5-7 year term
- May require refinancing

**Example**:
- $200,000 loan, 7-year balloon
- Monthly payments based on 30-year amortization
- After 7 years: Large remaining balance due

**Risks**:
- Must have funds for balloon payment
- May need to refinance (risk if rates rise)
- May need to sell property

**Key insight**: Balloon mortgages offer lower initial payments but require large final payment.

## Finite geometric series word problem: mortgage

**Mortgage payment calculation**:

**Formula**: M = P × [r(1+r)^n] / [(1+r)^n - 1]

Where:
- M = Monthly payment
- P = Principal (loan amount)
- r = Monthly interest rate (annual rate / 12)
- n = Number of payments (years × 12)

**Example**:
- Loan: $300,000
- Rate: 4% annual (0.04/12 = 0.00333 monthly)
- Term: 30 years (360 payments)
- M = $300,000 × [0.00333(1.00333)^360] / [(1.00333)^360 - 1]
- M ≈ $1,432.25

**Key insight**: Mortgage payments are calculated using geometric series formulas to amortize the loan.`,
        importantPoints: [
          'Mortgage: loan secured by real estate',
          'Fixed-rate: constant rate, predictable',
          'ARM: rate changes, lower initial rate but risky',
          'Short sale: sell for less than mortgage balance',
          'Mortgage payments calculated using geometric series',
        ],
      } as ArticleContent,
    ],
  },
  {
    id: 'lesson-2-4',
    title: 'Home buying process',
    duration: '35 min',
    contentItems: [
      {
        id: 'finance-u2-l4-video-1',
        type: 'video',
        title: 'Home buying process',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'finance-u2-l4-article',
        type: 'article',
        title: 'Learn: Home buying process',
        content: `# Home buying process

## Titles and deeds in real estate

**Title**: Legal ownership of property.

**Deed**: Document that transfers title from seller to buyer.

**Types of ownership**:
- **Fee simple**: Full ownership
- **Joint tenancy**: Equal ownership, right of survivorship
- **Tenancy in common**: Shared ownership, no right of survivorship
- **Community property**: Spousal ownership (in some states)

**Key documents**:
- **Warranty deed**: Seller guarantees clear title
- **Quitclaim deed**: Transfers whatever interest seller has (no guarantee)

**Key insight**: Title and deed establish legal ownership of real estate.

## Title insurance

**Title insurance**: Protects against title defects and claims.

**Types**:
- **Owner's policy**: Protects buyer
- **Lender's policy**: Protects lender (usually required)

**What it covers**:
- Unknown liens
- Forged documents
- Errors in public records
- Undisclosed heirs
- Boundary disputes

**Cost**: One-time premium, typically 0.5-1% of purchase price

**Key insight**: Title insurance protects against unexpected ownership claims and defects.

## Making an offer on a home

**Offer process**:
1. **Research**: Compare similar homes, check market
2. **Pre-approval**: Get mortgage pre-approval
3. **Make offer**: Written offer with price and terms
4. **Negotiate**: Seller may counter-offer
5. **Acceptance**: Both parties agree
6. **Contingencies**: Inspection, financing, appraisal

**Offer components**:
- **Purchase price**: Amount willing to pay
- **Earnest money**: Deposit showing serious intent
- **Contingencies**: Conditions that must be met
- **Closing date**: When transaction completes
- **Inclusions**: What stays with property

**Key insight**: Making an offer involves negotiation and should include appropriate contingencies.

## Escrow

**Escrow**: Neutral third party holds funds/documents until conditions are met.

**In home buying**:
- Buyer deposits earnest money in escrow
- Funds held until closing
- Released when all conditions met
- Protects both buyer and seller

**Escrow account** (for property taxes/insurance):
- Lender collects extra with mortgage payment
- Holds in escrow account
- Pays property taxes and insurance when due
- Ensures payments made on time

**Key insight**: Escrow protects both parties and ensures obligations are met.

## Types of escrow in real estate

**1. Transaction escrow**:
- Holds earnest money
- Holds documents
- Releases at closing
- Protects during transaction

**2. Mortgage escrow**:
- Holds property tax payments
- Holds insurance payments
- Pays when due
- Required by many lenders

**Benefits**:
- Protection for both parties
- Ensures payments made
- Simplifies budgeting
- Reduces risk

**Key insight**: Escrow provides security and convenience in real estate transactions.`,
        importantPoints: [
          'Title: legal ownership; Deed: document transferring title',
          'Title insurance protects against ownership claims',
          'Making offer: research, negotiate, include contingencies',
          'Escrow: neutral third party holds funds/documents',
          'Mortgage escrow: holds tax/insurance payments',
        ],
      } as ArticleContent,
    ],
  },
];

const unit3Lessons: Lesson[] = [
  {
    id: 'lesson-3-1',
    title: 'Inflation basics',
    duration: '30 min',
    contentItems: [
      {
        id: 'finance-u3-l1-video-1',
        type: 'video',
        title: 'Inflation basics',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'finance-u3-l1-article',
        type: 'article',
        title: 'Learn: Inflation basics',
        content: `# Inflation basics

## Inflation overview

**Inflation**: General increase in prices over time, resulting in decreased purchasing power of money.

**Key characteristics**:
- Affects overall price level, not individual prices
- Measured as percentage change in price index
- Reduces value of money
- Can be caused by various factors

**Effects**:
- **Consumers**: Can buy less with same money
- **Savers**: Value of savings decreases
- **Borrowers**: Real value of debt decreases
- **Wages**: Must increase to maintain purchasing power

**Key insight**: Inflation erodes purchasing power and affects economic decisions.

## What is inflation

**Definition**: Sustained increase in the general price level of goods and services.

**Measurement**: 
- Percentage change in price index
- Usually measured annually
- Can be monthly, quarterly, or annual

**Types**:
- **Demand-pull**: Too much money chasing too few goods
- **Cost-push**: Rising production costs push prices up
- **Built-in**: Expectations of inflation lead to inflation

**Causes**:
- Increase in money supply
- Increase in demand
- Decrease in supply
- Expectations of future inflation

**Key insight**: Inflation is a sustained increase in prices, not temporary price changes.

## Inflation data

**Sources of inflation data**:
- **Consumer Price Index (CPI)**: Most common measure
- **Producer Price Index (PPI)**: Prices at wholesale level
- **GDP deflator**: Broadest measure (all goods/services in GDP)

**Historical trends**:
- Varies by country and time period
- Developed countries: Typically 1-3% annually
- Some countries: Hyperinflation (very high rates)
- 1970s: High inflation in many countries

**Key insight**: Inflation data helps track economic health and guide policy decisions.

## CPI index

**Consumer Price Index (CPI)**: Measures average change in prices paid by consumers.

**Calculation**:
- Select basket of goods/services
- Track prices over time
- Weight by importance in consumer spending
- Calculate percentage change

**Uses**:
- Measure inflation
- Adjust wages (cost-of-living adjustments)
- Adjust Social Security payments
- Compare prices across time

**Limitations**:
- May not reflect individual experiences
- Basket may not match everyone's spending
- Quality changes hard to measure
- Substitution bias

**Key insight**: CPI is the primary measure of inflation, tracking changes in consumer prices.`,
        importantPoints: [
          'Inflation: general increase in prices over time',
          'Reduces purchasing power of money',
          'Measured as percentage change in price index',
          'CPI: primary measure of consumer inflation',
        ],
      } as ArticleContent,
    ],
  },
  {
    id: 'lesson-3-2',
    title: 'Inflation scenarios',
    duration: '35 min',
    contentItems: [
      {
        id: 'finance-u3-l2-video-1',
        type: 'video',
        title: 'Inflation scenarios',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'finance-u3-l2-article',
        type: 'article',
        title: 'Learn: Inflation scenarios',
        content: `# Inflation scenarios

## Moderate inflation in a good economy

**Moderate inflation** (2-3% annually): Normal in healthy economies.

**Characteristics**:
- Low, stable inflation
- Economic growth
- Full employment
- Central bank targets this level

**Why it's good**:
- Encourages spending (money loses value if held)
- Allows real wage adjustments
- Prevents deflation (which can be dangerous)
- Gives central bank room to lower real interest rates

**Central bank targets**: Most central banks target 2% inflation as optimal.

**Key insight**: Moderate inflation in a growing economy is normal and often beneficial.

## Stagflation

**Stagflation**: Combination of stagnation (low growth, high unemployment) and inflation.

**Characteristics**:
- High inflation
- High unemployment
- Low or negative economic growth
- Difficult to address with policy

**Causes**:
- Supply shocks (e.g., oil price increases)
- Poor economic policies
- External factors

**Example**: 1970s in many countries
- Oil price shocks
- High inflation and unemployment
- Slow growth

**Policy challenges**:
- Fighting inflation → Increases unemployment
- Fighting unemployment → Increases inflation
- No easy solution

**Key insight**: Stagflation is problematic because it combines the worst of both worlds.

## Hyperinflation

**Hyperinflation**: Extremely rapid inflation (typically >50% per month).

**Characteristics**:
- Very high inflation rates
- Money loses value rapidly
- People lose confidence in currency
- Economic collapse

**Causes**:
- Excessive money printing
- Loss of confidence in government
- War or political instability
- Large budget deficits

**Examples**:
- Germany 1920s
- Zimbabwe 2000s
- Venezuela 2010s

**Consequences**:
- Economic collapse
- Social unrest
- Currency becomes worthless
- People use foreign currency or barter

**Key insight**: Hyperinflation is extremely destructive and difficult to stop once it starts.`,
        importantPoints: [
          'Moderate inflation (2-3%): normal in healthy economies',
          'Stagflation: high inflation + high unemployment + low growth',
          'Hyperinflation: extremely rapid inflation (>50% per month)',
          'Each scenario has different causes and consequences',
        ],
      } as ArticleContent,
    ],
  },
  {
    id: 'lesson-3-3',
    title: 'Real and nominal return',
    duration: '30 min',
    contentItems: [
      {
        id: 'finance-u3-l3-video-1',
        type: 'video',
        title: 'Real and nominal return',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'finance-u3-l3-article',
        type: 'article',
        title: 'Learn: Real and nominal return',
        content: `# Real and nominal return

## Real and nominal return

**Nominal return**: Return without adjusting for inflation.

**Real return**: Return adjusted for inflation (purchasing power).

**Formula**: Real Return = Nominal Return - Inflation Rate

**Or more precisely**: Real Return = [(1 + Nominal) / (1 + Inflation)] - 1

**Example**:
- Nominal return: 8%
- Inflation: 3%
- Real return: 8% - 3% = 5% (approximate)
- Or: (1.08 / 1.03) - 1 = 4.85% (precise)

**Key insight**: Real return shows actual purchasing power gain, accounting for inflation.

## Calculating real return in last year's dollars

**Method**: Adjust for inflation to express in constant dollars.

**Process**:
1. Calculate nominal return
2. Adjust for inflation
3. Express in base year dollars

**Example**:
- Invest $1,000
- After 1 year: $1,080 (8% nominal return)
- Inflation: 3%
- Real value: $1,080 / 1.03 = $1,048.54
- Real return: 4.85%

**Key insight**: Real return shows what you can actually buy with your returns.

## Relation between nominal and real returns and inflation

**Key relationship**: Real Return ≈ Nominal Return - Inflation

**More precisely**: (1 + Real) = (1 + Nominal) / (1 + Inflation)

**Implications**:
- If inflation = 0: Real = Nominal
- If inflation > 0: Real < Nominal
- If inflation < 0 (deflation): Real > Nominal

**For investors**:
- Need real return > 0 to increase purchasing power
- High inflation erodes real returns
- Must consider inflation when investing

**Key insight**: Understanding the relationship between nominal and real returns is crucial for investment decisions.`,
        importantPoints: [
          'Nominal return: return without inflation adjustment',
          'Real return: return adjusted for inflation',
          'Real Return ≈ Nominal Return - Inflation',
          'Real return shows actual purchasing power',
        ],
      } as ArticleContent,
    ],
  },
  {
    id: 'lesson-3-4',
    title: 'Capacity utilization and inflation',
    duration: '45 min',
    contentItems: [
      {
        id: 'finance-u3-l4-video-1',
        type: 'video',
        title: 'Capacity utilization and inflation',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'finance-u3-l4-article',
        type: 'article',
        title: 'Learn: Capacity utilization and inflation',
        content: `# Capacity utilization and inflation

## Economics of a cupcake factory

**Capacity**: Maximum output a factory can produce.

**Capacity utilization**: Percentage of capacity actually used.

**Example**:
- Factory can produce 1,000 cupcakes/day (capacity)
- Currently producing 800 cupcakes/day
- Capacity utilization: 80%

**Key relationships**:
- Low utilization: Can increase production easily
- High utilization: Hard to increase production
- Full utilization: Cannot increase without expansion

**Key insight**: Capacity utilization affects ability to respond to demand changes.

## Cupcake economics 2

**When demand increases**:
- Low utilization: Can increase production, prices stable
- High utilization: Hard to increase, prices may rise
- Full utilization: Cannot increase, prices rise

**When demand decreases**:
- Production decreases
- Utilization falls
- Prices may fall (if competition)

**Key insight**: Capacity utilization affects price responses to demand changes.

## Cupcake economics 3

**Costs and capacity**:
- **Fixed costs**: Don't change with output (rent, equipment)
- **Variable costs**: Change with output (ingredients, labor)
- **Average cost**: Total cost / Output
- At low utilization: High average cost (fixed costs spread over few units)
- At high utilization: Lower average cost (fixed costs spread over many units)

**Key insight**: Capacity utilization affects average costs and pricing decisions.

## Inflation, deflation, and capacity utilization

**Relationship**:
- **Low utilization**: Excess capacity → Downward pressure on prices → Deflation risk
- **High utilization**: Limited capacity → Upward pressure on prices → Inflation risk
- **Full utilization**: Cannot meet demand → Prices rise → Inflation

**Key insight**: Capacity utilization is a key indicator of inflationary pressures.

## Inflation, deflation, and capacity utilization 2

**Policy implications**:
- **Low utilization**: Stimulus may not cause inflation (excess capacity)
- **High utilization**: Stimulus may cause inflation (limited capacity)
- **Full utilization**: Stimulus causes inflation (no capacity)

**Key insight**: Understanding capacity utilization helps predict inflation effects of policy.

## Inflation and deflation 3: Obama stimulus plan

**2009 stimulus** (Obama administration):
- Large government spending to boost economy
- Low capacity utilization at time
- Excess capacity meant stimulus didn't cause inflation
- Helped economy recover without inflation spike

**Key insight**: Stimulus effects depend on capacity utilization. Low utilization allows stimulus without inflation.`,
        importantPoints: [
          'Capacity utilization: percentage of capacity used',
          'Low utilization: can increase production, prices stable',
          'High utilization: hard to increase, prices may rise',
          'Capacity utilization affects inflation/deflation pressures',
        ],
      } as ArticleContent,
    ],
  },
  {
    id: 'lesson-3-5',
    title: 'Deflation',
    duration: '35 min',
    contentItems: [
      {
        id: 'finance-u3-l5-video-1',
        type: 'video',
        title: 'Deflation',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'finance-u3-l5-article',
        type: 'article',
        title: 'Learn: Deflation',
        content: `# Deflation

## Deflation

**Deflation**: General decrease in prices over time.

**Characteristics**:
- Prices fall across the economy
- Purchasing power of money increases
- Can be dangerous for economy

**Causes**:
- Decrease in money supply
- Decrease in demand
- Increase in supply
- Technological improvements (lower costs)

**Effects**:
- **Consumers**: Can buy more (but may delay purchases)
- **Savers**: Value of savings increases
- **Borrowers**: Real value of debt increases (problematic)
- **Economy**: Can lead to recession

**Key insight**: Deflation can be dangerous because it encourages hoarding and increases real debt burden.

## Velocity of money rather than quantity driving prices

**Velocity of money**: How often money changes hands.

**Equation of Exchange**: M × V = P × Y

Where:
- M = Money supply
- V = Velocity
- P = Price level
- Y = Real output

**If velocity decreases**:
- Even if money supply increases, prices may fall
- People hold money instead of spending
- Deflation can occur despite money growth

**Key insight**: Changes in velocity can affect prices independently of money supply.

## Deflation despite increases in money supply

**Why deflation can occur despite money growth**:

1. **Velocity decreases faster than money increases**
   - If V falls more than M rises, P can fall

2. **Output growth exceeds money growth**
   - If Y grows faster than M, P can fall

3. **Liquidity trap**
   - People hoard money instead of spending
   - Velocity collapses
   - Money supply increases don't translate to spending

4. **Financial crisis**
   - Credit freeze reduces velocity
   - Money supply increases but doesn't circulate

**Examples**: Great Depression, Japan 1990s-2000s

**Key insight**: Deflation can occur despite money growth if velocity falls or output grows faster.

## Deflationary spiral

**Deflationary spiral**: Self-reinforcing cycle of falling prices and economic decline.

**Mechanism**:
1. Prices fall
2. Consumers delay purchases (expect lower prices)
3. Demand decreases
4. Production decreases
5. Unemployment increases
6. Prices fall further
7. Cycle continues

**Why it's dangerous**:
- Hard to stop once started
- Can lead to depression
- Monetary policy less effective (liquidity trap)
- Real debt burden increases

**Key insight**: Deflationary spirals are dangerous and difficult to escape, which is why central banks target positive inflation.`,
        importantPoints: [
          'Deflation: general decrease in prices',
          'Can occur despite money growth if velocity falls',
          'Deflationary spiral: self-reinforcing cycle',
          'Dangerous: increases real debt, encourages hoarding',
        ],
      } as ArticleContent,
    ],
  },
];

const unit4Lessons: Lesson[] = [
  {
    id: 'lesson-4-1',
    title: 'Personal taxes',
    duration: '45 min',
    contentItems: [
      {
        id: 'finance-u4-l1-video-1',
        type: 'video',
        title: 'Personal taxes',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'finance-u4-l1-article',
        type: 'article',
        title: 'Learn: Personal taxes',
        content: `# Personal taxes

## Basics of US income tax rate schedule

**Progressive tax system**: Tax rate increases with income.

**Tax brackets**: Different income ranges taxed at different rates.

**Example (simplified)**:
- 10% on first $10,000
- 12% on next $30,000
- 22% on next $50,000
- 24% on income above $90,000

**Marginal tax rate**: Rate on last dollar earned.

**Effective tax rate**: Average rate (total tax / total income).

**Key insight**: Progressive taxation means higher earners pay higher rates on additional income.

## Tax deductions introduction

**Tax deduction**: Reduces taxable income.

**How it works**:
- Deduct from income before calculating tax
- Reduces tax by: Deduction × Tax Rate
- Example: $1,000 deduction at 22% rate saves $220

**Common deductions**:
- Mortgage interest
- State and local taxes (SALT)
- Charitable contributions
- Medical expenses (above threshold)
- Student loan interest

**Standard deduction vs. itemized**:
- **Standard deduction**: Fixed amount (most people use this)
- **Itemized deductions**: List specific deductions (if > standard)

**Key insight**: Deductions reduce taxable income, lowering tax bill.

## AMT overview

**Alternative Minimum Tax (AMT)**: Parallel tax system to ensure high earners pay minimum tax.

**Purpose**: Prevents high-income taxpayers from using deductions to avoid all taxes.

**How it works**:
- Calculate tax both ways (regular and AMT)
- Pay whichever is higher
- AMT has fewer deductions and exemptions

**Key insight**: AMT ensures high earners pay minimum tax even with many deductions.

## Alternative minimum tax

**AMT calculation**:
- Start with regular taxable income
- Add back certain deductions
- Apply AMT exemption (phases out at high income)
- Apply AMT rates (26% and 28%)

**Who it affects**:
- High-income taxpayers
- Those with many deductions
- Those with tax preference items

**Key insight**: AMT is a parallel tax system that limits tax avoidance through deductions.

## Estate tax introduction

**Estate tax**: Tax on transfer of wealth at death.

**Applies to**: Estates above exemption amount (very high threshold).

**Exemption**: Amount that can be transferred tax-free (millions of dollars).

**Rate**: High rate (typically 40% on amount above exemption).

**Who pays**: Very wealthy estates only (affects <1% of estates).

**Key insight**: Estate tax applies only to very large estates, affecting few taxpayers.

## Tax brackets and progressive taxation

**Progressive taxation**: Higher income → Higher tax rate.

**Tax brackets**:
- Different rates for different income ranges
- Only income in each bracket taxed at that rate
- Not all income taxed at highest rate

**Example**:
- Income: $100,000
- First $10,000 at 10% = $1,000
- Next $30,000 at 12% = $3,600
- Next $50,000 at 22% = $11,000
- Remaining $10,000 at 24% = $2,400
- Total tax: $18,000

**Key insight**: Progressive taxation means effective rate is lower than top marginal rate.

## Calculating state taxes and take-home pay

**State taxes**:
- Vary by state
- Some states: No income tax
- Some states: Flat rate
- Some states: Progressive rates

**Take-home pay calculation**:
1. Gross income
2. Subtract federal tax
3. Subtract state tax
4. Subtract FICA (Social Security, Medicare)
5. = Take-home pay

**Key insight**: Multiple taxes reduce take-home pay from gross income.

## Marriage penalty

**Marriage penalty**: Married couples pay more tax than if single.

**When it occurs**:
- Both spouses earn similar incomes
- Combined income pushes into higher bracket
- Standard deduction for married < 2× single deduction

**Marriage bonus**: Opposite - married couples pay less (when one spouse earns much more).

**Key insight**: Tax system can create marriage penalty or bonus depending on income distribution.

## Married taxes clarification

**Filing statuses**:
- **Single**: Unmarried
- **Married filing jointly**: Both spouses together
- **Married filing separately**: Each spouse separately
- **Head of household**: Unmarried with dependents

**Married filing jointly**:
- Usually better (lower tax)
- But can create marriage penalty if both earn similar amounts

**Married filing separately**:
- Rarely beneficial
- Loses some deductions/credits
- Usually higher total tax

**Key insight**: Filing status affects tax liability, with married filing jointly usually best.`,
        importantPoints: [
          'Progressive taxation: higher income → higher rate',
          'Tax deductions reduce taxable income',
          'AMT ensures high earners pay minimum tax',
          'Estate tax applies only to very large estates',
          'Marriage penalty: married couples may pay more',
        ],
      } as ArticleContent,
    ],
  },
  {
    id: 'lesson-4-2',
    title: 'Corporate taxation',
    duration: '35 min',
    contentItems: [
      {
        id: 'finance-u4-l2-video-1',
        type: 'video',
        title: 'Corporate taxation',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'finance-u4-l2-article',
        type: 'article',
        title: 'Learn: Corporate taxation',
        content: `# Corporate taxation

## Corporations and limited liability

**Corporation**: Legal entity separate from owners.

**Limited liability**: Owners' personal assets protected from business debts.

**Key features**:
- Separate legal entity
- Owners are shareholders
- Can issue stock
- Perpetual existence
- Limited liability

**Taxation**:
- Corporation pays corporate income tax on profits
- Shareholders pay personal income tax on dividends
- **Double taxation**: Same income taxed twice

**Key insight**: Corporations provide limited liability but face double taxation.

## Is limited liability or double taxation fair?

**Arguments for limited liability**:
- Encourages entrepreneurship
- Allows risk-taking
- Promotes economic growth
- Shareholders shouldn't be liable for corporate actions

**Arguments against**:
- Can shield owners from consequences
- May encourage excessive risk
- Creditors bear more risk

**Arguments about double taxation**:
- **Against**: Unfair to tax same income twice
- **For**: Corporations benefit from legal protections
- **For**: Corporate tax is price of limited liability

**Key insight**: Limited liability and double taxation involve tradeoffs between fairness and economic efficiency.

## Transfer pricing and tax havens

**Transfer pricing**: Prices charged between related companies.

**Problem**: Companies can manipulate prices to shift profits to low-tax countries.

**Example**:
- Parent company in high-tax country
- Subsidiary in low-tax country
- Parent charges low price to subsidiary
- Profits shift to low-tax country
- Reduces overall tax

**Tax havens**: Countries with very low or no corporate taxes.

**Characteristics**:
- Very low tax rates
- Minimal reporting requirements
- Used to shelter income

**Examples**: Cayman Islands, Bermuda, Ireland (for some companies)

**Regulation**: Governments try to limit transfer pricing abuse through rules.

**Key insight**: Transfer pricing and tax havens allow companies to reduce taxes, raising fairness concerns.`,
        importantPoints: [
          'Corporations: separate legal entity with limited liability',
          'Double taxation: corporate tax + personal tax on dividends',
          'Transfer pricing: can shift profits to low-tax countries',
          'Tax havens: countries with very low taxes',
          'Raises fairness and efficiency questions',
        ],
      } as ArticleContent,
    ],
  },
];

const unit5Lessons: Lesson[] = [
  {
    id: 'lesson-5-1',
    title: 'Cash versus accrual accounting',
    duration: '30 min',
    contentItems: [
      {
        id: 'finance-u5-l1-video-1',
        type: 'video',
        title: 'Cash versus accrual accounting',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'finance-u5-l1-article',
        type: 'article',
        title: 'Learn: Cash versus accrual accounting',
        content: `# Cash versus accrual accounting

## Cash accounting

**Cash accounting**: Records transactions when cash is received or paid.

**Key principle**: Revenue recorded when cash received, expenses recorded when cash paid.

**Example**:
- Sell goods in December, receive payment in January
- Revenue recorded in January (when cash received)
- Not in December (when sale occurred)

**Advantages**:
- Simple to understand
- Easy to track cash flow
- Good for small businesses

**Disadvantages**:
- Doesn't match revenue with expenses
- Can misrepresent performance
- Not allowed for large businesses (GAAP)

**Key insight**: Cash accounting is simple but may not accurately reflect business performance.

## Accrual basis of accounting

**Accrual accounting**: Records transactions when they occur, regardless of cash flow.

**Key principle**: Revenue recorded when earned, expenses recorded when incurred.

**Example**:
- Sell goods in December, receive payment in January
- Revenue recorded in December (when earned)
- Matches revenue with related expenses

**Advantages**:
- Matches revenue with expenses (matching principle)
- Better reflects business performance
- Required for large businesses (GAAP)
- More accurate financial picture

**Disadvantages**:
- More complex
- Requires estimates (bad debts, warranties)
- Cash flow may differ from income

**Key insight**: Accrual accounting provides better matching of revenues and expenses, giving more accurate financial picture.

## Comparing accrual and cash accounting

**Timing differences**:

**Revenue**:
- Cash: When cash received
- Accrual: When earned

**Expenses**:
- Cash: When cash paid
- Accrual: When incurred

**Example**:
- Business sells $10,000 goods in December, receives payment in January
- Pays $6,000 for inventory in November, uses it in December

**Cash accounting**:
- December: No revenue, no expense
- January: $10,000 revenue
- November: $6,000 expense
- Shows profit in January, loss in November

**Accrual accounting**:
- December: $10,000 revenue, $6,000 expense = $4,000 profit
- January: No revenue, no expense
- November: No revenue, no expense
- Shows profit when earned

**Key insight**: Accrual accounting better matches revenues and expenses, providing more accurate performance measurement.`,
        importantPoints: [
          'Cash accounting: records when cash received/paid',
          'Accrual accounting: records when earned/incurred',
          'Accrual matches revenue with expenses',
          'Accrual required for large businesses (GAAP)',
        ],
      } as ArticleContent,
    ],
  },
  {
    id: 'lesson-5-2',
    title: 'Three core financial statements',
    duration: '50 min',
    contentItems: [
      {
        id: 'finance-u5-l2-video-1',
        type: 'video',
        title: 'Three core financial statements',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'finance-u5-l2-article',
        type: 'article',
        title: 'Learn: Three core financial statements',
        content: `# Three core financial statements

## Balance sheet and income statement relationship

**Balance sheet**: Snapshot of assets, liabilities, and equity at a point in time.

**Income statement**: Shows revenues, expenses, and profit over a period of time.

**Relationship**:
- Net income from income statement flows to retained earnings on balance sheet
- Assets = Liabilities + Equity (balance sheet equation)
- Equity changes with net income

**Key connections**:
- Income statement: Revenue - Expenses = Net Income
- Balance sheet: Assets = Liabilities + Equity
- Net income increases retained earnings (part of equity)

**Key insight**: Balance sheet and income statement are interconnected through retained earnings.

## Basic cash flow statement

**Cash flow statement**: Shows cash inflows and outflows over a period.

**Three sections**:
1. **Operating activities**: Cash from day-to-day operations
   - Net income (from income statement)
   - Adjustments for non-cash items (depreciation)
   - Changes in working capital

2. **Investing activities**: Cash from buying/selling assets
   - Purchase of equipment
   - Sale of assets
   - Investments

3. **Financing activities**: Cash from borrowing/equity
   - Borrowing money
   - Repaying debt
   - Issuing stock
   - Paying dividends

**Key insight**: Cash flow statement shows actual cash movements, which may differ from income.

## Doing the example with accounts payable growing

**Accounts payable**: Money owed to suppliers.

**When accounts payable increases**:
- Bought goods but haven't paid yet
- Cash hasn't left yet
- Increases cash flow (delayed payment)

**Cash flow adjustment**:
- Increase in accounts payable → Add to net income (cash not paid yet)
- Decrease in accounts payable → Subtract from net income (cash paid)

**Example**:
- Net income: $10,000
- Accounts payable increased by $2,000
- Operating cash flow: $10,000 + $2,000 = $12,000
- More cash than income (because haven't paid suppliers yet)

**Key insight**: Changes in working capital affect cash flow differently than income.

## Fair value accounting

**Fair value**: Current market price of an asset or liability.

**Fair value accounting**: Assets/liabilities valued at current market prices.

**Historical cost accounting**: Assets valued at original purchase price.

**Comparison**:
- **Historical cost**: Stable, objective, but may not reflect current value
- **Fair value**: Reflects current value, but volatile, subjective

**When used**:
- Financial instruments (stocks, bonds)
- Some investments
- Derivatives

**Challenges**:
- Market prices may not exist
- Requires estimates
- Can be volatile

**Key insight**: Fair value accounting reflects current market values but can be volatile and subjective.`,
        importantPoints: [
          'Balance sheet: snapshot at point in time',
          'Income statement: performance over period',
          'Cash flow statement: actual cash movements',
          'Net income flows to retained earnings on balance sheet',
          'Fair value: current market price vs. historical cost',
        ],
      } as ArticleContent,
    ],
  },
  {
    id: 'lesson-5-3',
    title: 'Depreciation and amortization',
    duration: '40 min',
    contentItems: [
      {
        id: 'finance-u5-l3-video-1',
        type: 'video',
        title: 'Depreciation and amortization',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'finance-u5-l3-article',
        type: 'article',
        title: 'Learn: Depreciation and amortization',
        content: `# Depreciation and amortization

## Expensing a truck leads to inconsistent performance

**Problem with expensing**:
- If you expense entire cost in one year
- That year shows large loss
- Other years show no expense
- Performance looks inconsistent

**Example**:
- Buy truck for $30,000
- Use for 5 years
- If expense all in year 1: Year 1 shows -$30,000, years 2-5 show $0
- Doesn't reflect actual usage

**Key insight**: Expensing long-lived assets in one year creates inconsistent financial performance.

## Depreciating the truck

**Depreciation**: Allocating cost of asset over its useful life.

**Purpose**: Match expense with revenue generated by asset.

**Methods**:
- **Straight-line**: Equal amount each year
- **Accelerated**: More in early years (e.g., double-declining balance)

**Example** (straight-line):
- Truck: $30,000
- Useful life: 5 years
- Depreciation: $6,000 per year
- Each year shows $6,000 expense

**Benefits**:
- Smooths expenses over time
- Matches expense with usage
- Better reflects performance

**Key insight**: Depreciation spreads asset cost over useful life, matching expense with revenue.

## Depreciation in cash flow

**Depreciation is non-cash expense**:
- Reduces net income
- But doesn't involve cash outflow
- Must add back in cash flow statement

**Cash flow adjustment**:
- Start with net income
- Add back depreciation (non-cash expense)
- = Operating cash flow (before working capital changes)

**Example**:
- Net income: $10,000
- Depreciation: $6,000
- Operating cash flow: $10,000 + $6,000 = $16,000
- More cash than income (because depreciation doesn't use cash)

**Key insight**: Depreciation reduces income but not cash, so must be added back in cash flow statement.

## Amortization and depreciation

**Depreciation**: For tangible assets (equipment, buildings, vehicles).

**Amortization**: For intangible assets (patents, trademarks, goodwill).

**Both**:
- Allocate cost over useful life
- Non-cash expenses
- Reduce net income
- Added back in cash flow statement

**Differences**:
- Depreciation: Physical assets
- Amortization: Intangible assets

**Example of amortization**:
- Buy patent for $100,000
- Useful life: 10 years
- Amortization: $10,000 per year

**Key insight**: Both depreciation and amortization allocate asset costs over time and are non-cash expenses.`,
        importantPoints: [
          'Depreciation: allocates cost of tangible assets over useful life',
          'Amortization: allocates cost of intangible assets over useful life',
          'Both are non-cash expenses',
          'Must be added back in cash flow statement',
          'Smooths expenses and matches with revenue',
        ],
      } as ArticleContent,
    ],
  },
];

const unit6Lessons: Lesson[] = [
  {
    id: 'lesson-6-1',
    title: 'Introduction to stocks',
    duration: '25 min',
    contentItems: [
      {
        id: 'finance-u6-l1-video-1',
        type: 'video',
        title: 'Introduction to stocks',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'finance-u6-l1-article',
        type: 'article',
        title: 'Learn: Introduction to stocks',
        content: `# Introduction to stocks

## What it means to buy a company's stock

**Stock**: Ownership share in a company.

**When you buy stock**:
- You become a partial owner (shareholder)
- You own a piece of the company
- You have claim on company's assets and earnings
- You may receive dividends (if company pays them)
- You can vote on company matters (if voting shares)

**Rights of shareholders**:
- **Voting rights**: Vote on board of directors, major decisions
- **Dividend rights**: Receive share of profits (if declared)
- **Residual claim**: Claim on assets if company liquidates

**Risks**:
- Stock price can go up or down
- Can lose entire investment
- No guarantee of returns
- Company may go bankrupt

**Key insight**: Buying stock means owning part of a company, with potential for gains and losses.

## Bonds vs. stocks

**Stocks (equity)**:
- **Ownership**: You own part of company
- **Returns**: Dividends + capital gains (unlimited potential)
- **Risk**: High (can lose everything)
- **Priority**: Last to be paid (if company fails)
- **Voting**: Usually have voting rights
- **Maturity**: No maturity (own indefinitely)

**Bonds (debt)**:
- **Ownership**: You are a creditor (lender)
- **Returns**: Fixed interest payments (limited)
- **Risk**: Lower (but still exists)
- **Priority**: Paid before stockholders (if company fails)
- **Voting**: No voting rights
- **Maturity**: Fixed maturity date

**Key differences**:
- Stocks: Ownership, higher risk, higher potential return
- Bonds: Lending, lower risk, fixed return

**Key insight**: Stocks represent ownership with higher risk/reward; bonds represent lending with lower risk/fixed return.`,
        importantPoints: [
          'Stock: ownership share in company',
          'Shareholders have voting and dividend rights',
          'Stocks: higher risk, higher potential return',
          'Bonds: lower risk, fixed return',
        ],
      } as ArticleContent,
    ],
  },
  {
    id: 'lesson-6-2',
    title: 'Shorting stock',
    duration: '30 min',
    contentItems: [
      {
        id: 'finance-u6-l2-video-1',
        type: 'video',
        title: 'Shorting stock',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'finance-u6-l2-article',
        type: 'article',
        title: 'Learn: Shorting stock',
        content: `# Shorting stock

## Shorting stock

**Short selling**: Selling stock you don't own, betting price will fall.

**Process**:
1. Borrow stock from broker
2. Sell it immediately
3. Wait for price to fall
4. Buy back at lower price
5. Return stock to broker
6. Profit = Sale price - Purchase price

**Example**:
- Borrow 100 shares at $50
- Sell for $5,000
- Price falls to $40
- Buy back for $4,000
- Return shares
- Profit: $1,000

**Risks**:
- **Unlimited loss**: Price can rise indefinitely
- **Margin calls**: Must maintain margin account
- **Forced buy-in**: Broker may force you to buy back

**Key insight**: Short selling allows profiting from price declines but has unlimited risk.

## Shorting stock 2

**Requirements**:
- **Margin account**: Required to short
- **Collateral**: Must maintain margin (usually 50% of position)
- **Interest**: Pay interest on borrowed shares
- **Dividends**: Must pay dividends to lender

**When it works**:
- Price falls as expected
- Profit from decline
- Can hedge long positions

**When it fails**:
- Price rises instead
- Losses mount quickly
- May face margin call

**Key insight**: Short selling requires margin account and has significant risks.

## Is short selling bad?

**Arguments against**:
- Can drive prices down artificially
- Can harm companies
- Unlimited loss potential
- Can create market volatility

**Arguments for**:
- Provides liquidity
- Helps price discovery
- Allows hedging
- Can expose overvalued stocks
- Market efficiency

**Regulation**:
- Some restrictions (uptick rule, circuit breakers)
- Generally legal but regulated
- Some countries ban it

**Key insight**: Short selling is controversial but serves important market functions like price discovery and liquidity.`,
        importantPoints: [
          'Short selling: sell stock you don\'t own, bet on price decline',
          'Unlimited loss potential (price can rise indefinitely)',
          'Requires margin account and collateral',
          'Controversial but serves market functions',
        ],
      } as ArticleContent,
    ],
  },
  {
    id: 'lesson-6-3',
    title: 'Understanding company statements and capital structure',
    duration: '35 min',
    contentItems: [
      {
        id: 'finance-u6-l3-video-1',
        type: 'video',
        title: 'Understanding company statements and capital structure',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'finance-u6-l3-article',
        type: 'article',
        title: 'Learn: Understanding company statements and capital structure',
        content: `# Understanding company statements and capital structure

## Gross and operating profit

**Gross profit**: Revenue - Cost of goods sold (COGS).

**Operating profit** (EBIT): Gross profit - Operating expenses.

**Operating expenses**: Selling, general, and administrative (SG&A), research and development (R&D), etc.

**Net profit**: Operating profit - Interest - Taxes.

**Key insight**: Understanding these profit levels helps analyze company performance at different stages.

## Basic capital structure differences

**Capital structure**: Mix of debt and equity used to finance company.

**All equity**:
- No debt
- Lower risk
- No tax benefits from debt
- Dilutes ownership

**All debt**:
- No equity
- High risk (must repay)
- Tax benefits (interest deductible)
- No ownership dilution

**Mixed**:
- Combination of debt and equity
- Balance risk and benefits
- Optimal capital structure

**Key insight**: Capital structure affects risk, cost of capital, and ownership.

## Market capitalization

**Market capitalization** (market cap): Total value of company's outstanding shares.

**Formula**: Market Cap = Share Price × Number of Shares Outstanding

**Example**:
- Share price: $50
- Shares outstanding: 10 million
- Market cap: $50 × 10M = $500 million

**Categories**:
- **Large cap**: > $10 billion
- **Mid cap**: $2-10 billion
- **Small cap**: < $2 billion

**Key insight**: Market cap shows total market value of company's equity.

## Market value of assets

**Market value**: What assets are worth if sold today.

**Book value**: What assets are worth on balance sheet (historical cost).

**Difference**:
- Market value can be higher or lower than book value
- Market value reflects current market conditions
- Book value reflects historical cost

**Key insight**: Market value may differ significantly from book value, especially for intangible assets.`,
        importantPoints: [
          'Gross profit = Revenue - COGS',
          'Operating profit = Gross profit - Operating expenses',
          'Capital structure: mix of debt and equity',
          'Market cap = Share price × Shares outstanding',
        ],
      } as ArticleContent,
    ],
  },
  {
    id: 'lesson-6-4',
    title: 'Corporate metrics and valuation',
    duration: '60 min',
    contentItems: [
      {
        id: 'finance-u6-l4-video-1',
        type: 'video',
        title: 'Corporate metrics and valuation',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'finance-u6-l4-article',
        type: 'article',
        title: 'Learn: Corporate metrics and valuation',
        content: `# Corporate metrics and valuation

## Price and market capitalization

**Market capitalization**: Share price × Shares outstanding.

**Price per share**: Market cap / Shares outstanding.

**Relationship**: Market cap reflects total market value; price per share is value per share.

**Key insight**: Market cap and share price are related but measure different things.

## Introduction to the income statement

**Income statement**: Shows revenues, expenses, and profit over a period.

**Structure**:
- Revenue
- - Cost of goods sold (COGS)
- = Gross profit
- - Operating expenses
- = Operating profit (EBIT)
- - Interest
- = Profit before tax
- - Taxes
- = Net income

**Key insight**: Income statement shows how revenue becomes profit.

## Earnings and EPS

**Earnings**: Net income (profit after all expenses).

**Earnings per share (EPS)**: Net income / Shares outstanding.

**Example**:
- Net income: $10 million
- Shares outstanding: 5 million
- EPS: $10M / 5M = $2 per share

**Importance**: EPS shows profit per share, used in valuation.

**Key insight**: EPS shows how much profit each share represents.

## Introduction to the price-to-earnings ratio

**Price-to-earnings ratio (P/E)**: Share price / Earnings per share.

**Formula**: P/E = Price / EPS

**Example**:
- Share price: $50
- EPS: $2
- P/E = 50 / 2 = 25

**Interpretation**: How many years of earnings to pay for stock.

**Key insight**: P/E ratio shows how expensive a stock is relative to earnings.

## P/E discussion

**High P/E**:
- Stock is expensive relative to earnings
- May indicate growth expectations
- Or overvaluation

**Low P/E**:
- Stock is cheap relative to earnings
- May indicate value opportunity
- Or poor prospects

**Comparison**: Compare P/E to industry average, market average, historical P/E.

**Key insight**: P/E ratio must be interpreted in context of growth, industry, and market.

## ROA discussion 1

**Return on Assets (ROA)**: How efficiently company uses assets to generate profit.

**Formula**: ROA = Net Income / Total Assets

**Interpretation**: Percentage return on assets.

**Example**:
- Net income: $5 million
- Total assets: $50 million
- ROA = $5M / $50M = 10%

**Key insight**: ROA measures asset efficiency.

## ROA discussion 2

**Higher ROA**: Better asset efficiency.

**Lower ROA**: Less efficient use of assets.

**Comparison**: Compare to industry, competitors, historical.

**Factors affecting ROA**:
- Profit margins
- Asset turnover
- Leverage

**Key insight**: ROA helps evaluate management efficiency and asset utilization.

## Depreciation

**Depreciation**: Non-cash expense allocating asset cost over time.

**Effect on financials**:
- Reduces net income
- Doesn't affect cash flow
- Reduces book value of assets

**Key insight**: Depreciation affects income but not cash.

## Amortization

**Amortization**: Similar to depreciation but for intangible assets.

**Effect**: Same as depreciation - reduces income, not cash.

**Key insight**: Both depreciation and amortization are non-cash expenses.

## P/E conundrum

**P/E paradox**: High P/E can mean:
- Overvalued stock (bad)
- High growth expectations (good)

**Low P/E can mean**:
- Undervalued stock (good)
- Poor prospects (bad)

**Key insight**: P/E must be interpreted with growth and prospects in mind.

## Enterprise value

**Enterprise value (EV)**: Total value of company (equity + debt - cash).

**Formula**: EV = Market Cap + Debt - Cash

**Why it matters**: Shows total value regardless of capital structure.

**Key insight**: Enterprise value shows total company value, not just equity.

## EBITDA

**EBITDA**: Earnings Before Interest, Taxes, Depreciation, and Amortization.

**Formula**: EBITDA = Operating Profit + Depreciation + Amortization

**Uses**:
- Measures operating performance
- Excludes financing and accounting decisions
- Used in valuation (EV/EBITDA ratio)

**Key insight**: EBITDA shows operating performance before financing and accounting effects.`,
        importantPoints: [
          'EPS = Net income / Shares outstanding',
          'P/E = Price / EPS (shows valuation)',
          'ROA = Net income / Assets (measures efficiency)',
          'Enterprise value = Market cap + Debt - Cash',
          'EBITDA: operating performance before financing/accounting effects',
        ],
      } as ArticleContent,
    ],
  },
  {
    id: 'lesson-6-5',
    title: 'Life of a company – from birth to death',
    duration: '50 min',
    contentItems: [
      {
        id: 'finance-u6-l5-video-1',
        type: 'video',
        title: 'Life of a company – from birth to death',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'finance-u6-l5-article',
        type: 'article',
        title: 'Learn: Life of a company – from birth to death',
        content: `# Life of a company – from birth to death

## Raising money for a startup

**Startup funding stages**:
- **Bootstrapping**: Using own money
- **Friends and family**: Early support
- **Angel investors**: Individual investors
- **Venture capital**: Institutional investors
- **IPO**: Public offering

**Early stage challenges**:
- Need capital to grow
- High risk
- No track record
- Give up equity for funding

**Key insight**: Startups need funding to grow, typically giving up equity in exchange.

## Getting a seed round from a VC

**Seed round**: Early funding from venture capitalists.

**Process**:
- Pitch to VCs
- Negotiate valuation
- Agree on terms
- Receive funding
- Give up equity

**Terms**:
- Valuation: Company worth
- Equity stake: Percentage given up
- Board seats: VC may get board representation
- Rights: Voting, anti-dilution, etc.

**Key insight**: Seed funding provides capital but dilutes ownership.

## Going back to the till: Series B

**Series B**: Second round of venture capital funding.

**Purpose**: More capital for growth.

**Process**: Similar to seed round but:
- Higher valuation (if successful)
- More investors
- More dilution

**Later rounds**: Series C, D, etc. as company grows.

**Key insight**: Companies may raise multiple rounds, each diluting ownership but providing growth capital.

## An IPO

**IPO (Initial Public Offering)**: First sale of stock to public.

**Process**:
1. Company decides to go public
2. Hire investment banks
3. File with SEC
4. Roadshow (present to investors)
5. Set offering price
6. Sell shares to public
7. Stock trades on exchange

**Benefits**:
- Raise large amount of capital
- Liquidity for early investors
- Public profile

**Costs**:
- Expensive (underwriting fees)
- Regulatory requirements
- Public scrutiny
- Loss of control

**Key insight**: IPO provides access to public capital markets but comes with costs and obligations.

## More on IPOs

**Pricing**:
- Investment bank helps set price
- Balance: High enough to raise capital, low enough to ensure demand
- Often underpriced (first-day pop)

**After IPO**:
- Stock trades on exchange
- Must file regular reports (10-K, 10-Q)
- Subject to market forces
- Can raise more capital through secondary offerings

**Key insight**: IPO is a major milestone, transitioning from private to public company.

## Equity vs. debt

**Equity financing**:
- Sell ownership shares
- No repayment required
- Dilutes ownership
- Shareholders bear risk

**Debt financing**:
- Borrow money
- Must repay with interest
- Doesn't dilute ownership
- Creditors have priority claim

**Tradeoffs**:
- Equity: No repayment but dilutes ownership
- Debt: Must repay but keeps ownership

**Key insight**: Companies choose between equity (dilution) and debt (repayment obligation).

## Bonds vs. stocks

**Bonds** (debt):
- Fixed payments
- Priority in bankruptcy
- Lower risk
- No ownership

**Stocks** (equity):
- Variable returns
- Last in bankruptcy
- Higher risk
- Ownership

**Key insight**: Bonds and stocks represent different claims on company with different risk/return profiles.

## Chapter 7: Bankruptcy liquidation

**Chapter 7**: Company liquidates assets to pay creditors.

**Process**:
1. File for bankruptcy
2. Trustee appointed
3. Assets sold
4. Proceeds distributed to creditors (in priority order)
5. Company ceases to exist

**Priority**:
1. Secured creditors
2. Unsecured creditors
3. Stockholders (usually get nothing)

**Key insight**: Chapter 7 ends company existence, liquidating assets to pay debts.

## Chapter 11: Bankruptcy restructuring

**Chapter 11**: Company reorganizes to continue operating.

**Process**:
1. File for bankruptcy
2. Continue operating (debtor in possession)
3. Develop reorganization plan
4. Negotiate with creditors
5. Court approves plan
6. Company emerges from bankruptcy

**Goal**: Restructure debt to allow company to survive.

**Key insight**: Chapter 11 allows company to restructure and continue operating.`,
        importantPoints: [
          'Startup funding: bootstrapping → angels → VC → IPO',
          'IPO: transition from private to public',
          'Equity: dilutes ownership, no repayment',
          'Debt: must repay, keeps ownership',
          'Chapter 7: liquidation; Chapter 11: restructuring',
        ],
      } as ArticleContent,
    ],
  },
  {
    id: 'lesson-6-6',
    title: 'Dilution',
    duration: '25 min',
    contentItems: [
      {
        id: 'finance-u6-l6-video-1',
        type: 'video',
        title: 'Dilution',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'finance-u6-l6-article',
        type: 'article',
        title: 'Learn: Dilution',
        content: `# Dilution

## Stock dilution

**Dilution**: Reduction in ownership percentage when new shares are issued.

**How it happens**:
- Company issues new shares
- Total shares increase
- Your percentage ownership decreases
- But company value may increase (if capital used well)

**Example**:
- You own 1,000 shares out of 10,000 (10%)
- Company issues 5,000 new shares
- You still own 1,000 shares, but out of 15,000 (6.67%)
- Ownership diluted from 10% to 6.67%

**When it occurs**:
- New equity financing (VC rounds, IPO)
- Employee stock options
- Convertible securities convert
- Stock splits (not true dilution)

**Key insight**: Dilution reduces ownership percentage but company may be worth more if capital is used effectively.`,
        importantPoints: [
          'Dilution: reduction in ownership percentage',
          'Occurs when new shares issued',
          'Ownership % decreases but company value may increase',
        ],
      } as ArticleContent,
    ],
  },
  {
    id: 'lesson-6-7',
    title: 'Mergers and acquisitions',
    duration: '40 min',
    contentItems: [
      {
        id: 'finance-u6-l7-video-1',
        type: 'video',
        title: 'Mergers and acquisitions',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'finance-u6-l7-article',
        type: 'article',
        title: 'Learn: Mergers and acquisitions',
        content: `# Mergers and acquisitions

## Acquisitions with shares

**Stock acquisition**: Buying company using stock instead of cash.

**Process**:
- Acquirer issues new shares
- Exchanges shares for target company shares
- Target shareholders become shareholders of acquirer

**Example**:
- Acquirer offers 2 shares for each target share
- Target shareholders exchange shares
- Receive acquirer shares

**Advantages**:
- No cash needed
- Target shareholders get acquirer stock
- Tax benefits (may defer taxes)

**Disadvantages**:
- Dilutes acquirer shareholders
- More complex

**Key insight**: Stock acquisitions use equity instead of cash, diluting acquirer shareholders.

## Price behavior after announced acquisition

**Typical pattern**:
- **Target stock**: Usually rises (premium paid)
- **Acquirer stock**: May fall (pays premium, integration risk)
- **Spread**: Difference between offer price and target price

**Why target rises**:
- Acquirer pays premium
- Bidding war possible
- Market expects deal to close

**Why acquirer may fall**:
- Pays premium
- Integration challenges
- Overpayment risk

**Key insight**: Acquisition announcements typically cause target stock to rise and acquirer stock to fall.

## Simple merger arbitrage with share acquisition

**Merger arbitrage**: Strategy to profit from acquisition deals.

**Process**:
1. After deal announced, target stock rises but below offer price
2. Buy target stock
3. Wait for deal to close
4. Receive acquirer shares (or cash)
5. Profit from spread

**Risks**:
- Deal may not close
- Regulatory rejection
- Financing problems
- Market conditions change

**Key insight**: Merger arbitrage seeks to profit from the spread between current price and offer price.`,
        importantPoints: [
          'Stock acquisitions: use shares instead of cash',
          'Target stock usually rises after announcement',
          'Acquirer stock may fall',
          'Merger arbitrage: profit from acquisition spreads',
        ],
      } as ArticleContent,
    ],
  },
  {
    id: 'lesson-6-8',
    title: 'Leveraged buy-outs',
    duration: '30 min',
    contentItems: [
      {
        id: 'finance-u6-l8-video-1',
        type: 'video',
        title: 'Leveraged buy-outs',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'finance-u6-l8-article',
        type: 'article',
        title: 'Learn: Leveraged buy-outs',
        content: `# Leveraged buy-outs

## Basic leveraged buyout (LBO)

**Leveraged buyout (LBO)**: Buying company using mostly debt.

**Structure**:
- Small equity investment (10-30%)
- Large debt financing (70-90%)
- Company's assets/cash flow used as collateral

**Process**:
1. Private equity firm identifies target
2. Raises debt (using target's assets as collateral)
3. Buys company
4. Improves operations
5. Sells company or takes public
6. Repays debt, keeps profit

**Why it works**:
- Debt is cheaper than equity
- Tax benefits (interest deductible)
- High leverage amplifies returns
- But also amplifies risk

**Risks**:
- High debt burden
- Interest payments
- Default risk
- Economic downturn

**Key insight**: LBOs use high leverage to amplify returns but increase risk significantly.`,
        importantPoints: [
          'LBO: buying company with mostly debt',
          'High leverage amplifies returns and risk',
          'Uses company assets as collateral',
          'Tax benefits from interest deduction',
        ],
      } as ArticleContent,
    ],
  },
  {
    id: 'lesson-6-9',
    title: 'Bonds',
    duration: '50 min',
    contentItems: [
      {
        id: 'finance-u6-l9-video-1',
        type: 'video',
        title: 'Bonds',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'finance-u6-l9-article',
        type: 'article',
        title: 'Learn: Bonds',
        content: `# Bonds

## Corporate debt versus traditional mortgages

**Similarities**:
- Both are loans
- Fixed payments
- Secured by assets
- Interest payments

**Differences**:
- **Mortgages**: Secured by real estate, individual borrowers
- **Corporate bonds**: Secured by company assets, corporate borrowers
- **Mortgages**: Usually one lender
- **Bonds**: Many bondholders

**Key insight**: Corporate bonds are similar to mortgages but for companies with multiple lenders.

## Introduction to bonds

**Bond**: Loan to company or government.

**Key terms**:
- **Principal (face value)**: Amount borrowed
- **Coupon rate**: Interest rate
- **Maturity**: When bond is repaid
- **Yield**: Return to investor

**Types**:
- **Corporate bonds**: Issued by companies
- **Government bonds**: Issued by governments
- **Municipal bonds**: Issued by local governments

**Key insight**: Bonds are debt instruments with fixed payments and maturity dates.

## Introduction to the yield curve

**Yield curve**: Graph showing bond yields at different maturities.

**Shape**:
- **Normal**: Upward sloping (long-term > short-term)
- **Inverted**: Downward sloping (short-term > long-term)
- **Flat**: Similar yields across maturities

**Normal yield curve**:
- Short-term bonds: Lower yield
- Long-term bonds: Higher yield
- Reflects time risk

**Inverted yield curve**:
- Often predicts recession
- Short-term rates higher than long-term
- Unusual but significant

**Key insight**: Yield curve shape reflects market expectations about interest rates and economy.

## Relationship between bond prices and interest rates

**Inverse relationship**: Bond prices and interest rates move in opposite directions.

**Why**:
- When interest rates rise, new bonds pay higher rates
- Old bonds with lower rates become less attractive
- Price must fall to match new rates
- When interest rates fall, old bonds with higher rates become more attractive
- Price rises

**Example**:
- Bond pays 5% coupon
- Market rates rise to 6%
- Bond price falls (to make yield = 6%)
- Market rates fall to 4%
- Bond price rises (to make yield = 4%)

**Key insight**: Bond prices are inversely related to interest rates.

## Treasury bond prices and yields

**Treasury bonds**: Issued by US government.

**Characteristics**:
- Very safe (government backing)
- Liquid market
- Used as benchmark
- Tax advantages (state/local tax exempt)

**Pricing**:
- Prices determined by market
- Yields reflect risk-free rate
- Used as baseline for other bonds

**Key insight**: Treasury bonds are the safest bonds and serve as benchmark for other securities.

## Annual interest varying with debt maturity

**Term structure**: How interest rates vary with maturity.

**Factors**:
- **Time risk**: Longer maturity = higher risk = higher yield
- **Inflation expectations**: Higher expected inflation = higher yield
- **Liquidity**: Less liquid = higher yield

**Key insight**: Interest rates typically increase with maturity to compensate for additional risk.

## The yield curve

**Yield curve analysis**:
- **Steep**: Large difference between short and long rates
- **Flat**: Small difference
- **Inverted**: Long rates below short rates

**Economic significance**:
- Normal: Healthy economy expected
- Inverted: Recession may be coming
- Steep: Growth expected

**Key insight**: Yield curve shape provides information about economic expectations.`,
        importantPoints: [
          'Bonds: loans with fixed payments and maturity',
          'Bond prices inversely related to interest rates',
          'Yield curve: shows yields at different maturities',
          'Normal curve: upward sloping; Inverted: downward (recession signal)',
          'Treasury bonds: safest, used as benchmark',
        ],
      } as ArticleContent,
    ],
  },
  {
    id: 'lesson-6-10',
    title: 'Corporate bankruptcy',
    duration: '30 min',
    contentItems: [
      {
        id: 'finance-u6-l10-video-1',
        type: 'video',
        title: 'Corporate bankruptcy',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'finance-u6-l10-article',
        type: 'article',
        title: 'Learn: Corporate bankruptcy',
        content: `# Corporate bankruptcy

## Chapter 7: Bankruptcy liquidation

**Chapter 7**: Company liquidates and ceases to exist.

**Process**:
1. File for bankruptcy
2. Trustee appointed
3. Assets sold
4. Proceeds distributed to creditors (priority order)
5. Company dissolved

**Priority of payment**:
1. Secured creditors (collateral)
2. Administrative expenses
3. Unsecured creditors
4. Stockholders (usually nothing)

**Key insight**: Chapter 7 ends company existence, liquidating all assets.

## Chapter 11: Bankruptcy restructuring

**Chapter 11**: Company reorganizes to continue operating.

**Process**:
1. File for bankruptcy
2. Continue operating (debtor in possession)
3. Develop reorganization plan
4. Negotiate with creditors
5. Court approves plan
6. Company emerges from bankruptcy

**Reorganization plan**:
- Restructure debt
- Reduce obligations
- May issue new equity
- Creditors may become shareholders

**Goal**: Allow company to survive and continue operating.

**Key insight**: Chapter 11 allows company to restructure debt and continue operating.`,
        importantPoints: [
          'Chapter 7: liquidation, company ends',
          'Chapter 11: restructuring, company continues',
          'Priority: secured creditors → unsecured → stockholders',
          'Chapter 11 allows company to survive',
        ],
      } as ArticleContent,
    ],
  },
];

const unit7Lessons: Lesson[] = [
  {
    id: 'lesson-7-1',
    title: 'Mutual funds and ETFs',
    duration: '40 min',
    contentItems: [
      {
        id: 'finance-u7-l1-video-1',
        type: 'video',
        title: 'Mutual funds and ETFs',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'finance-u7-l1-article',
        type: 'article',
        title: 'Learn: Mutual funds and ETFs',
        content: `# Mutual funds and ETFs

## Open-ended mutual fund (part 1)

**Open-ended mutual fund**: Fund that can issue and redeem shares continuously.

**Characteristics**:
- Creates new shares when investors buy
- Redeems shares when investors sell
- Shares priced at Net Asset Value (NAV)
- NAV = (Total assets - Total liabilities) / Shares outstanding

**How it works**:
- Investors buy shares from fund
- Fund uses money to buy securities
- Investors sell shares back to fund
- Fund sells securities to pay investors

**Key insight**: Open-ended funds continuously create and redeem shares based on investor demand.

## Open-end mutual fund redemptions (part 2)

**Redemption process**:
- Investor sells shares back to fund
- Fund pays NAV per share
- Fund may need to sell securities to raise cash
- Can create tax consequences

**Liquidity**:
- Usually can redeem any time
- NAV calculated daily
- May take 1-2 days to receive cash

**Key insight**: Redemptions require fund to sell securities, which can affect fund performance.

## Closed-end mutual funds

**Closed-end fund**: Fund with fixed number of shares.

**Characteristics**:
- Fixed number of shares (set at IPO)
- Shares trade on exchange (like stocks)
- Price determined by market (may differ from NAV)
- Can trade at premium or discount to NAV

**Differences from open-end**:
- Cannot create/redeem shares
- Price set by market, not NAV
- May trade at discount or premium

**Key insight**: Closed-end funds have fixed shares and trade on exchanges, with prices that may differ from NAV.

## Exchange traded funds (ETFs)

**ETF**: Fund that trades on exchange like a stock.

**Characteristics**:
- Trades throughout day (like stocks)
- Can be bought/sold anytime
- Usually tracks an index
- Low expense ratios
- Tax efficient

**Advantages over mutual funds**:
- Intraday trading
- Lower fees
- More tax efficient
- Transparency

**Key insight**: ETFs combine benefits of mutual funds (diversification) with stock-like trading.

## Ponzi schemes

**Ponzi scheme**: Fraudulent investment scheme.

**How it works**:
- Promises high returns
- Uses new investors' money to pay old investors
- No real investment
- Collapses when new investors stop

**Red flags**:
- Guaranteed high returns
- Too good to be true
- Pressure to invest quickly
- Unclear investment strategy

**Key insight**: Ponzi schemes are frauds that eventually collapse when new money stops flowing in.`,
        importantPoints: [
          'Open-ended funds: continuously create/redeem shares',
          'Closed-end funds: fixed shares, trade on exchange',
          'ETFs: trade like stocks, low fees, tax efficient',
          'Ponzi schemes: fraudulent, use new money to pay old investors',
        ],
      } as ArticleContent,
    ],
  },
  {
    id: 'lesson-7-2',
    title: 'Retirement accounts: IRAs and 401ks',
    duration: '35 min',
    contentItems: [
      {
        id: 'finance-u7-l2-video-1',
        type: 'video',
        title: 'Retirement accounts: IRAs and 401ks',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'finance-u7-l2-article',
        type: 'article',
        title: 'Learn: Retirement accounts: IRAs and 401ks',
        content: `# Retirement accounts: IRAs and 401ks

## Traditional IRAs

**Traditional IRA**: Individual Retirement Account with tax-deferred contributions.

**Key features**:
- Contributions may be tax-deductible (depending on income)
- Earnings grow tax-deferred
- Withdrawals taxed as ordinary income
- Required minimum distributions (RMDs) at age 72

**Contribution limits**: Annual limit (varies by year, age)

**Tax benefits**:
- Deduct contributions (if eligible)
- Defer taxes on earnings
- Pay taxes when withdraw

**Key insight**: Traditional IRAs provide tax deduction now, pay taxes later.

## Roth IRAs

**Roth IRA**: Individual Retirement Account with after-tax contributions.

**Key features**:
- Contributions are NOT tax-deductible (after-tax)
- Earnings grow tax-free
- Qualified withdrawals are tax-free
- No RMDs during lifetime

**Contribution limits**: Annual limit (varies by year, income)

**Tax benefits**:
- Pay taxes now
- Withdrawals tax-free (if qualified)
- No RMDs

**Key insight**: Roth IRAs provide tax-free growth and withdrawals, pay taxes now.

## 401(k)s

**401(k)**: Employer-sponsored retirement plan.

**Key features**:
- Contributions deducted from paycheck (pre-tax)
- Employer may match contributions
- Higher contribution limits than IRAs
- Tax-deferred growth
- Withdrawals taxed as income

**Types**:
- **Traditional 401(k)**: Pre-tax contributions, taxed on withdrawal
- **Roth 401(k)**: After-tax contributions, tax-free withdrawals

**Employer match**: Free money from employer (common benefit).

**Key insight**: 401(k)s are employer-sponsored plans with higher limits and potential employer matching.`,
        importantPoints: [
          'Traditional IRA: tax deduction now, taxes later',
          'Roth IRA: taxes now, tax-free withdrawals',
          '401(k): employer-sponsored, higher limits, employer match',
          'Each has different tax treatment and benefits',
        ],
      } as ArticleContent,
    ],
  },
  {
    id: 'lesson-7-3',
    title: 'Life insurance',
    duration: '25 min',
    contentItems: [
      {
        id: 'finance-u7-l3-video-1',
        type: 'video',
        title: 'Life insurance',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'finance-u7-l3-article',
        type: 'article',
        title: 'Learn: Life insurance',
        content: `# Life insurance

## Term life insurance and death probability

**Term life insurance**: Insurance that pays benefit if you die during term.

**Key features**:
- Coverage for specific period (e.g., 20 years)
- Pays death benefit if you die during term
- No cash value
- Premiums based on age, health, coverage amount

**Death probability**: Likelihood of dying during term.

**Pricing**:
- Higher probability of death → Higher premium
- Older age → Higher premium
- Poor health → Higher premium
- Longer term → Higher premium

**Uses**:
- Protect dependents
- Cover debts
- Replace income

**Key insight**: Term life insurance provides protection for a specific period at lower cost than permanent insurance.`,
        importantPoints: [
          'Term life: coverage for specific period',
          'Pays benefit if death during term',
          'Premiums based on death probability',
          'No cash value, lower cost than permanent',
        ],
      } as ArticleContent,
    ],
  },
  {
    id: 'lesson-7-4',
    title: 'Hedge funds',
    duration: '50 min',
    contentItems: [
      {
        id: 'finance-u7-l4-video-1',
        type: 'video',
        title: 'Hedge funds',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'finance-u7-l4-article',
        type: 'article',
        title: 'Learn: Hedge funds',
        content: `# Hedge funds

## Hedge funds intro

**Hedge fund**: Private investment fund for wealthy investors.

**Characteristics**:
- Limited to accredited investors
- Less regulation than mutual funds
- Can use leverage and derivatives
- Active management strategies
- High fees

**Purpose**: Generate returns regardless of market direction (hedge).

**Key insight**: Hedge funds are private, less regulated investment vehicles for wealthy investors.

## Hedge fund structure and fees

**Fee structure**:
- **Management fee**: 1-2% of assets annually
- **Performance fee**: 20% of profits (typical)
- "2 and 20" structure common

**Example**:
- $100 million fund
- Management fee: 2% = $2 million
- If earns 10% ($10 million profit)
- Performance fee: 20% of $10M = $2 million
- Total fees: $4 million

**Key insight**: Hedge funds charge high fees (management + performance).

## Are hedge funds bad?

**Arguments against**:
- High fees reduce returns
- Not accessible to average investors
- Some engage in risky strategies
- Can create systemic risk

**Arguments for**:
- Provide diversification
- Can hedge risk
- Generate alpha (excess returns)
- Serve sophisticated investors

**Key insight**: Hedge funds are controversial but serve specific investor needs.

## Hedge funds, venture capital, and private equity

**Hedge funds**:
- Invest in public markets
- Short-term focus
- Use leverage and derivatives
- Liquid investments

**Venture capital**:
- Invest in startups
- Long-term focus
- High risk, high return
- Illiquid

**Private equity**:
- Buy entire companies
- Improve and sell
- Medium-term focus
- Illiquid

**Key insight**: Each serves different investment needs and time horizons.

## Hedge fund strategies: Long short 1

**Long-short strategy**: Buy some stocks (long) and sell others short.

**Goal**: Profit from both rising and falling stocks.

**Example**:
- Buy undervalued stocks (long)
- Sell overvalued stocks (short)
- Profit from both directions

**Key insight**: Long-short strategies aim to profit regardless of market direction.

## Hedge fund strategies: Long short 2

**Market neutral**: Long and short positions offset market risk.

**Focus**: Stock selection, not market direction.

**Key insight**: Market-neutral strategies focus on relative performance, not absolute market direction.

## Hedge fund strategies: Merger arbitrage 1

**Merger arbitrage**: Profit from acquisition deals.

**Process**:
- Buy target stock after deal announced
- Price usually below offer price
- Profit when deal closes
- Risk: Deal may not close

**Key insight**: Merger arbitrage seeks to profit from acquisition spreads.`,
        importantPoints: [
          'Hedge funds: private, less regulated, for wealthy investors',
          'Fee structure: management fee + performance fee (2 and 20)',
          'Strategies: long-short, merger arbitrage, market neutral',
          'Different from VC and private equity',
        ],
      } as ArticleContent,
    ],
  },
  {
    id: 'lesson-7-5',
    title: 'Investment and consumption',
    duration: '50 min',
    contentItems: [
      {
        id: 'finance-u7-l5-video-1',
        type: 'video',
        title: 'Investment and consumption',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'finance-u7-l5-article',
        type: 'article',
        title: 'Learn: Investment and consumption',
        content: `# Investment and consumption

## Risk and reward introduction

**Risk-return tradeoff**: Higher risk → Higher potential return.

**Key principle**: No free lunch - must take risk to earn higher returns.

**Types of risk**:
- **Market risk**: Overall market movements
- **Company risk**: Specific company problems
- **Liquidity risk**: Can't sell quickly
- **Credit risk**: Borrower defaults

**Key insight**: Understanding risk-return tradeoff is fundamental to investing.

## Human capital

**Human capital**: Your ability to earn income (education, skills, experience).

**Key concepts**:
- Most valuable asset for most people
- Can invest in (education, training)
- Generates income over lifetime
- Should consider when investing

**Investment implications**:
- Young people: More human capital, can take more risk
- Older people: Less human capital, should be more conservative
- Diversify: Don't invest only in your industry

**Key insight**: Human capital is your most valuable asset and should influence investment decisions.

## Return on capital

**Return on capital**: Return earned on invested capital.

**Key concepts**:
- Measures how well capital is used
- Higher return = Better use of capital
- Compare to opportunity cost
- Should exceed cost of capital

**Key insight**: Return on capital measures investment efficiency.

## Investment vs. consumption 1

**Investment**: Spending that creates future value.

**Consumption**: Spending on current enjoyment.

**Key distinction**:
- Investment: Creates assets or future income
- Consumption: Provides current satisfaction
- Both are important, but balance matters

**Examples**:
- Investment: Education, stocks, real estate
- Consumption: Food, entertainment, vacations

**Key insight**: Balancing investment and consumption is crucial for financial well-being.

## Investment vs. consumption 2

**Tradeoffs**:
- More investment → Less consumption now, more later
- More consumption → Less investment, less future wealth

**Optimal balance**:
- Invest enough for future
- Consume enough for current well-being
- Depends on goals, time horizon, income

**Key insight**: Finding the right balance between investment and consumption is key to financial planning.

## Wealth destruction 1

**Wealth destruction**: Actions that reduce wealth.

**Examples**:
- Excessive consumption
- Poor investments
- High fees
- Taxes
- Inflation

**Key insight**: Many factors can destroy wealth over time.

## Wealth destruction 2

**How to avoid**:
- Invest wisely
- Minimize fees
- Tax-efficient strategies
- Protect against inflation
- Avoid excessive consumption

**Key insight**: Understanding wealth destruction helps preserve and grow wealth.

## Back-of-envelope office space conundrum

**Problem**: Is it better to rent or buy office space?

**Analysis**:
- Consider all costs (rent, maintenance, opportunity cost)
- Compare to investment returns
- Factor in flexibility needs
- Consider tax implications

**Key insight**: Office space decision requires comparing all costs and benefits, not just rent vs. purchase price.`,
        importantPoints: [
          'Risk-return tradeoff: higher risk → higher return',
          'Human capital: ability to earn income',
          'Investment vs. consumption: balance future and present',
          'Wealth destruction: many factors can reduce wealth',
        ],
      } as ArticleContent,
    ],
  },
];

const unit8Lessons: Lesson[] = [
  {
    id: 'lesson-8-1',
    title: 'Banking and money',
    duration: '90 min',
    contentItems: [
      {
        id: 'finance-u8-l1-video-1',
        type: 'video',
        title: 'Banking and money',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'finance-u8-l1-article',
        type: 'article',
        title: 'Learn: Banking and money',
        content: `# Banking and money

## Banking 1

**Banking basics**: Banks accept deposits and make loans.

**Key functions**:
- Accept deposits (savings, checking)
- Make loans (mortgages, business loans)
- Facilitate payments
- Create money (through lending)

**How banks make money**:
- Interest on loans > Interest on deposits
- Spread = Profit
- Fees for services

**Key insight**: Banks are intermediaries that connect savers and borrowers.

## Banking 2: A bank's income statement

**Bank income sources**:
- **Interest income**: From loans
- **Fee income**: Service charges, account fees
- **Investment income**: From securities

**Bank expenses**:
- **Interest expense**: On deposits
- **Operating expenses**: Salaries, rent, etc.
- **Loan losses**: Bad debts

**Net income**: Income - Expenses

**Key insight**: Banks profit from the spread between lending and deposit rates.

## Banking 3: Fractional reserve banking

**Fractional reserve banking**: Banks hold only fraction of deposits as reserves.

**How it works**:
- Bank receives $100 deposit
- Holds $10 as reserve (10%)
- Lends out $90
- Creates money (original $100 + $90 loan = $190 in money supply)

**Key insight**: Fractional reserve banking allows banks to create money through lending.

## Banking 4: Multiplier effect and the money supply

**Money multiplier**: How much money supply increases from initial deposit.

**Formula**: Money Multiplier = 1 / Reserve Ratio

**Example**:
- Reserve ratio: 10%
- Multiplier: 1 / 0.10 = 10
- $100 deposit → $1,000 in money supply (theoretically)

**Process**:
- Initial deposit
- Bank lends (1 - reserve ratio)
- Borrower deposits elsewhere
- Process continues
- Total money supply increases

**Key insight**: Fractional reserve banking creates money multiplier effect, expanding money supply.

## Banking 5: Introduction to bank notes

**Bank notes**: Paper money issued by banks (historically).

**History**:
- Banks issued notes backed by gold
- Notes could be redeemed for gold
- Eventually replaced by government-issued currency

**Key insight**: Bank notes were early form of paper money, backed by precious metals.

## Banking 6: Bank notes and checks

**Checks**: Written orders to pay money.

**How checks work**:
- Write check to pay someone
- Bank transfers money from your account
- Clears through banking system

**Key insight**: Checks facilitate payments without physical cash.

## Banking 7: Giving out loans without giving out gold

**Modern banking**: Loans create deposits, not vice versa.

**Process**:
- Bank makes loan
- Creates deposit in borrower's account
- No physical gold needed
- Money created through accounting

**Key insight**: Modern banks create money through lending, not by lending out existing deposits.

## Banking 8: Reserve ratios

**Reserve ratio**: Fraction of deposits banks must hold as reserves.

**Types**:
- **Required reserves**: Minimum set by central bank
- **Excess reserves**: Above required minimum

**Effect**:
- Higher ratio → Less lending → Smaller money supply
- Lower ratio → More lending → Larger money supply

**Key insight**: Reserve ratios control how much banks can lend and create money.

## Banking 9: More on reserve ratios (bad sound)

**Reserve requirements**:
- Set by central bank
- Vary by country
- Can be changed as policy tool

**Current trends**:
- Many countries: Low or zero required reserves
- Banks still hold reserves (for safety, operations)

**Key insight**: Reserve requirements are a tool for monetary policy.

## Banking 10: Introduction to leverage (bad sound)

**Leverage**: Using borrowed money to increase investment.

**Bank leverage**:
- Banks borrow (deposits) to lend
- High leverage = More loans relative to capital
- Amplifies returns and risks

**Key insight**: Banks use leverage to amplify returns but increase risk.

## Banking 11: A reserve bank

**Central bank**: Bank for banks, manages money supply.

**Functions**:
- Set reserve requirements
- Lend to banks (discount window)
- Conduct open market operations
- Set interest rates

**Key insight**: Central banks control money supply and banking system.

## Banking 12: Treasuries (government debt)

**Treasury securities**: Government debt instruments.

**Types**:
- **Treasury bills**: Short-term (< 1 year)
- **Treasury notes**: Medium-term (1-10 years)
- **Treasury bonds**: Long-term (> 10 years)

**Key insight**: Treasuries are safe, liquid government debt used in monetary policy.

## Banking 13: Open market operations

**Open market operations**: Central bank buys/sells government securities.

**Expansionary**:
- Buy securities → Inject money → Lower interest rates

**Contractionary**:
- Sell securities → Remove money → Raise interest rates

**Key insight**: Open market operations are primary tool for monetary policy.

## Banking 14: Fed funds rate

**Federal funds rate**: Interest rate banks charge each other for overnight loans.

**Target rate**: Fed sets target, uses tools to achieve it.

**Effect**:
- Lower rate → More lending → More economic activity
- Higher rate → Less lending → Less economic activity

**Key insight**: Fed funds rate is key tool for monetary policy.

## Banking 15: More on the Fed funds rate

**How Fed influences rate**:
- Open market operations
- Reserve requirements
- Discount rate

**Transmission**:
- Fed funds rate → Other interest rates → Economic activity

**Key insight**: Fed funds rate affects entire economy through interest rate transmission.

## Banking 16: Why target rates vs. money supply

**Rate targeting**:
- More predictable
- Easier to communicate
- Direct impact on economy

**Money supply targeting**:
- Less predictable (velocity changes)
- Harder to control
- Indirect impact

**Key insight**: Central banks target interest rates because they're more effective than money supply.

## Banking 17: What happened to the gold?

**Gold standard**: Currency backed by gold (historically).

**End of gold standard**:
- 1971: US ended gold convertibility
- Fiat money: Not backed by gold
- Backed by government promise

**Key insight**: Modern money is fiat, not backed by gold.

## Banking 18: Big picture discussion

**Banking system**:
- Creates money through lending
- Facilitates payments
- Manages risk
- Controlled by central bank

**Key insight**: Banking system is crucial for modern economy.

## The discount rate

**Discount rate**: Interest rate central bank charges banks for loans.

**Higher discount rate**: Discourages borrowing, tightens money.

**Lower discount rate**: Encourages borrowing, eases money.

**Key insight**: Discount rate is tool for monetary policy.

## Repurchase agreements (repo transactions)

**Repo**: Short-term loan using securities as collateral.

**How it works**:
- Sell securities, agree to buy back
- Short-term (overnight to weeks)
- Used for liquidity management

**Key insight**: Repos provide short-term funding for banks and dealers.

## Federal Reserve balance sheet

**Fed balance sheet**: Assets and liabilities of central bank.

**Assets**:
- Government securities
- Loans to banks
- Other assets

**Liabilities**:
- Currency in circulation
- Bank reserves
- Other liabilities

**Key insight**: Fed balance sheet shows monetary policy operations.

## Fractional Reserve banking commentary 1

**Debate about fractional reserve banking**:
- **Supporters**: Efficient, creates needed money
- **Critics**: Unstable, creates booms and busts

**Key insight**: Fractional reserve banking is debated but widely used.

## FRB commentary 2: Deposit insurance

**Deposit insurance**: Government guarantees deposits (e.g., FDIC).

**Purpose**: Prevent bank runs, protect depositors.

**Coverage**: Up to limit (e.g., $250,000 in US).

**Key insight**: Deposit insurance prevents bank runs but creates moral hazard.

## FRB commentary 3: Big picture

**Banking system importance**:
- Creates money
- Facilitates payments
- Allocates credit
- Manages risk

**Key insight**: Banking system is essential but requires regulation.

## LIBOR

**LIBOR**: London Interbank Offered Rate.

**What it was**: Benchmark interest rate for interbank lending.

**Problems**: Manipulation scandals, being phased out.

**Replacement**: SOFR (Secured Overnight Financing Rate) and others.

**Key insight**: LIBOR was important benchmark but had problems, being replaced.`,
        importantPoints: [
          'Fractional reserve banking: banks hold fraction of deposits',
          'Money multiplier: 1 / reserve ratio',
          'Banks create money through lending',
          'Central banks control money supply through various tools',
          'Fed funds rate: key monetary policy tool',
        ],
      } as ArticleContent,
    ],
  },
  {
    id: 'lesson-8-2',
    title: 'Quantitative easing',
    duration: '40 min',
    contentItems: [
      {
        id: 'finance-u8-l2-video-1',
        type: 'video',
        title: 'Quantitative easing',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'finance-u8-l2-article',
        type: 'article',
        title: 'Learn: Quantitative easing',
        content: `# Quantitative easing

## Fed open market operations

**Normal operations**: Buy/sell short-term Treasuries to influence Fed funds rate.

**Limitation**: When rates near zero, normal operations ineffective.

**Key insight**: Normal open market operations have limits when rates are very low.

## Quantitative easing

**Quantitative easing (QE)**: Large-scale purchase of long-term securities.

**Purpose**: Stimulate economy when interest rates already near zero.

**How it works**:
- Fed buys long-term Treasuries, mortgage-backed securities
- Increases money supply
- Lowers long-term interest rates
- Encourages lending and spending

**Key insight**: QE is unconventional monetary policy used when normal policy is ineffective.

## More on quantitative easing (and credit easing)

**Credit easing**: Buying specific assets to support particular markets.

**QE effects**:
- Lowers long-term rates
- Increases asset prices
- Encourages risk-taking
- May cause inflation

**Risks**:
- Inflation
- Asset bubbles
- Difficult to exit

**Key insight**: QE can stimulate economy but has risks and side effects.

## Open market operations and quantitative easing overview

**Comparison**:
- **Normal OMO**: Small-scale, short-term securities, target Fed funds rate
- **QE**: Large-scale, long-term securities, target long-term rates

**When used**:
- Normal: Regular monetary policy
- QE: When rates near zero (zero lower bound)

**Key insight**: QE is extension of open market operations for extreme situations.

## Another quantitative easing video

**QE mechanics**:
- Fed creates money (electronically)
- Buys securities from banks
- Banks have more reserves
- Can lend more

**Key insight**: QE increases bank reserves and encourages lending.

## US and Japanese quantitative easing

**US QE (2008-2014)**:
- Multiple rounds
- Bought Treasuries and MBS
- Helped stabilize economy
- Eventually tapered and ended

**Japanese QE**:
- Used extensively
- Mixed results
- Continued for years

**Key insight**: QE has been used by major central banks with varying results.`,
        importantPoints: [
          'QE: large-scale purchase of long-term securities',
          'Used when interest rates near zero',
          'Lowers long-term rates, stimulates economy',
          'Risks: inflation, asset bubbles',
        ],
      } as ArticleContent,
    ],
  },
  {
    id: 'lesson-8-3',
    title: '2008 bank bailout',
    duration: '60 min',
    contentItems: [
      {
        id: 'finance-u8-l3-video-1',
        type: 'video',
        title: '2008 bank bailout',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'finance-u8-l3-article',
        type: 'article',
        title: 'Learn: 2008 bank bailout',
        content: `# 2008 bank bailout

## Bailout 1: Liquidity vs. solvency

**Liquidity crisis**: Can't meet short-term obligations but fundamentally solvent.

**Solvency crisis**: Liabilities exceed assets (insolvent).

**2008 crisis**: Many banks faced both.

**Key insight**: Distinguishing liquidity from solvency is crucial for policy response.

## Bailout 2: Book value

**Book value**: Value on balance sheet (historical cost).

**Market value**: Current market price.

**Problem**: Banks held assets at book value when market value had fallen.

**Key insight**: Book value can hide true financial condition.

## Bailout 3: Book value vs. market value

**Gap between book and market**:
- Assets marked at book value
- Market value much lower
- Created illusion of solvency

**Key insight**: Market value reveals true financial position.

## Bailout 4: Mark-to-model vs. mark-to-market

**Mark-to-market**: Value at current market prices.

**Mark-to-model**: Value using mathematical models.

**Problem**: Models proved wrong, underestimated losses.

**Key insight**: Mark-to-model can hide true values when markets freeze.

## Bailout 5: Paying off the debt

**Option**: Government pays bank's debt.

**Problems**: Very expensive, rewards bad behavior, unfair.

**Key insight**: Paying debt directly is too costly and creates moral hazard.

## Bailout 6: Getting an equity infusion

**Option**: Government injects equity (capital).

**Advantages**: Bank survives, taxpayers get ownership, less moral hazard.

**Used in 2008**: TARP injected capital into banks.

**Key insight**: Equity infusion provides capital while giving taxpayers ownership stake.

## Bailout 7: Bank goes into bankruptcy

**Option**: Let bank fail.

**Advantages**: No moral hazard, market discipline.

**Disadvantages**: Can cause panic, contagion, economic damage.

**Example**: Lehman Brothers failure intensified crisis.

**Key insight**: Bank failures can cause systemic problems.

## Bailout 8: Systemic risk

**Systemic risk**: Failure of one institution threatens entire system.

**Why banks are systemically important**: Interconnected, provide essential services.

**2008**: Failure threatened entire financial system.

**Key insight**: Systemic risk justifies government intervention.

## Bailout 9: Paulson's plan

**TARP**: Troubled Asset Relief Program.

**Original plan**: Buy troubled assets.

**Revised plan**: Inject capital directly.

**Result**: $700 billion program, mostly capital injections.

**Key insight**: TARP evolved from asset purchases to capital injections.

## Bailout 10: Moral hazard

**Moral hazard**: Protection encourages risky behavior.

**2008 bailout created moral hazard**: Banks rescued, signals "too big to fail."

**Mitigation**: Regulations (Dodd-Frank), stress tests, capital requirements.

**Key insight**: Bailouts create moral hazard but may be necessary for stability.

## Bailout 11: Why these CDOs could be worth nothing

**CDO**: Complex security backed by mortgages.

**Why worthless**: Mortgages defaulted, no income, no market.

**Key insight**: Complex financial products can become worthless when assumptions fail.

## Bailout 12: Lone Star transaction

**Example**: Private equity bought troubled assets at deep discount.

**Lesson**: Some assets could be handled by private sector.

**Key insight**: Not all assets needed government purchase.

## Bailout 13: Does the bailout have a chance of working?

**Factors for success**: Sufficient size, quick implementation, addresses both liquidity and solvency.

**Risks**: May not be enough, moral hazard, political opposition.

**Key insight**: Bailout success was uncertain but necessary to try.

## Bailout 14: Possible solution

**Comprehensive approach**: Liquidity, capital, asset purchases, guarantees, regulation.

**Key insight**: Crisis required multiple tools, not single solution.

## Bailout 15: More on the solution

**Additional measures**: Fiscal stimulus, monetary policy, regulatory reform.

**Key insight**: Comprehensive response needed: bailouts, stimulus, monetary policy, regulation.

## CNN: Understanding the crisis

**2008 Financial Crisis**: Most severe since Great Depression.

**Causes**: Housing bubble, subprime lending, excessive leverage, regulatory failures.

**Key insight**: Crisis had multiple causes and required comprehensive response.`,
        importantPoints: [
          'Liquidity vs. solvency: different problems need different solutions',
          'Book value vs. market value: gap hid true condition',
          'Systemic risk: justified government intervention',
          'TARP: capital injections to stabilize banks',
          'Moral hazard: bailouts create future risk-taking',
        ],
      } as ArticleContent,
    ],
  },
  {
    id: 'lesson-8-4',
    title: 'Geithner plan',
    duration: '35 min',
    contentItems: [
      {
        id: 'finance-u8-l4-video-1',
        type: 'video',
        title: 'Geithner plan',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'finance-u8-l4-article',
        type: 'article',
        title: 'Learn: Geithner plan',
        content: `# Geithner plan

## Geithner plan 1

**Geithner plan**: Public-private partnership to buy troubled assets.

**Structure**: Government and private investors buy assets together.

**Goal**: Remove toxic assets from bank balance sheets.

**Key insight**: Geithner plan aimed to use private capital with government support.

## Geithner plan 2

**Mechanics**: Government provides financing, private investors provide equity.

**Incentives**: Private investors share in profits, limiting downside.

**Key insight**: Plan leveraged private capital with government financing.

## Geithner plan 3

**Challenges**: Pricing assets, attracting private capital, political opposition.

**Key insight**: Plan faced practical and political challenges.

## Geithner plan 4

**Implementation**: Some programs launched, mixed results.

**Key insight**: Plan was partially implemented with varying success.

## Geithner plan 5: A better solution

**Alternative approaches**: Direct capital injection, asset guarantees, other mechanisms.

**Key insight**: Multiple solutions were considered and used.

## Geithner plan 6: A better solution

**Final approach**: Combination of capital injections, asset purchases, guarantees.

**Key insight**: Comprehensive approach was needed to stabilize financial system.`,
        importantPoints: [
          'Geithner plan: public-private partnership',
          'Goal: remove toxic assets',
          'Faced challenges in implementation',
          'Part of comprehensive response',
        ],
      } as ArticleContent,
    ],
  },
  {
    id: 'lesson-8-5',
    title: 'Foreign exchange and trade',
    duration: '45 min',
    contentItems: [
      {
        id: 'finance-u8-l5-video-1',
        type: 'video',
        title: 'Foreign exchange and trade',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'finance-u8-l5-article',
        type: 'article',
        title: 'Learn: Foreign exchange and trade',
        content: `# Foreign exchange and trade

## Currency exchange introduction

**Foreign exchange market**: Where currencies are traded.

**Exchange rate**: Price of one currency in terms of another.

**Participants**: Banks, corporations, investors, governments, central banks.

**Key insight**: Forex market is largest financial market, operates 24/7.

## Currency effect on trade

**Exchange rates affect trade**:
- Strong currency: Exports expensive, imports cheap
- Weak currency: Exports cheap, imports expensive

**Key insight**: Exchange rates directly affect international trade competitiveness.

## Currency effect on trade review

**Summary**: Currency strength affects trade balance through price effects.

**Key insight**: Understanding currency effects is crucial for trade policy.

## Pegging the yuan

**Currency peg**: Fix exchange rate to another currency (e.g., dollar).

**China's peg**: Kept yuan undervalued to promote exports.

**Effects**: Made Chinese exports cheaper, US imports more expensive.

**Key insight**: Currency pegs can be used to influence trade balances.

## Chinese Central Bank buying treasuries

**Why**: To maintain peg, China bought US Treasuries.

**Process**: 
- China receives dollars from exports
- Buys US Treasuries
- Keeps dollar strong, yuan weak
- Maintains trade advantage

**Key insight**: China's Treasury purchases maintained currency peg.

## American-Chinese debt loop

**Loop**:
1. US buys Chinese goods (dollars flow to China)
2. China accumulates dollars
3. China buys US Treasuries (dollars flow back)
4. Lowers US interest rates
5. Encourages US spending
6. Cycle continues

**Key insight**: Trade and capital flows created circular relationship.

## Debt loops rationale and effects

**Rationale**: Both countries benefit (China: exports, US: low rates).

**Effects**: 
- US: Low interest rates, high consumption
- China: High exports, accumulation of reserves

**Key insight**: Debt loop had benefits but also created imbalances.

## China keeps peg but diversifies holdings

**Diversification**: China began buying other assets, not just Treasuries.

**Reasons**: Reduce risk, seek higher returns.

**Key insight**: China diversified to reduce dependence on US debt.

## Carry trade basics

**Carry trade**: Borrow in low-interest currency, invest in high-interest currency.

**Risk**: Exchange rate changes can eliminate gains.

**Key insight**: Carry trade seeks interest rate differentials but has currency risk.

## Comparing GDP among countries

**Challenges**: Different currencies, price levels, exchange rates.

**Methods**: 
- Market exchange rates
- Purchasing power parity (PPP)

**Key insight**: Comparing GDP across countries requires adjusting for exchange rates and price levels.`,
        importantPoints: [
          'Exchange rates affect trade competitiveness',
          'Currency pegs can influence trade',
          'China-US debt loop: trade and capital flows',
          'Carry trade: interest rate arbitrage with currency risk',
        ],
      } as ArticleContent,
    ],
  },
  {
    id: 'lesson-8-6',
    title: 'Chinese currency and U.S. debt',
    duration: '45 min',
    contentItems: [
      {
        id: 'finance-u8-l6-video-1',
        type: 'video',
        title: 'Chinese currency and U.S. debt',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'finance-u8-l6-article',
        type: 'article',
        title: 'Learn: Chinese currency and U.S. debt',
        content: `# Chinese currency and U.S. debt

## Floating exchange resolving trade imbalance

**Floating exchange rate**: Rate determined by market.

**Effect on trade imbalance**:
- Trade deficit → Currency depreciates
- Makes exports cheaper, imports expensive
- Reduces deficit
- Self-correcting mechanism

**Key insight**: Floating rates can automatically correct trade imbalances.

## China pegs to dollar to keep trade imbalance

**China's strategy**: Keep yuan undervalued through peg.

**Why**: Maintains export advantage, supports growth.

**Effect**: Prevents automatic correction of trade imbalance.

**Key insight**: Currency pegs can prevent natural adjustment of trade imbalances.

## China buys US bonds

**Process**: China uses dollar reserves to buy US Treasuries.

**Effects**:
- Keeps dollar strong
- Keeps yuan weak
- Maintains trade advantage
- Finances US deficit

**Key insight**: China's Treasury purchases maintained currency peg and trade advantage.

## Review of China US currency situation

**Summary**: 
- China pegs yuan to dollar
- Accumulates dollar reserves
- Buys US Treasuries
- Maintains trade advantage
- Creates interdependence

**Key insight**: Currency relationship created complex interdependence.

## Data on Chinese M1 increase in 2010

**M1 increase**: Rapid growth in money supply.

**Causes**: Foreign exchange intervention, maintaining peg.

**Effects**: Potential inflation, asset bubbles.

**Key insight**: Maintaining peg required rapid money supply growth.

## Data on Chinese foreign assets increase in 2010

**Foreign asset accumulation**: China accumulated large foreign reserves.

**Composition**: Mostly US Treasuries and other dollar assets.

**Key insight**: China accumulated massive foreign reserves to maintain peg.

## Data on Chinese US balance of payments

**Trade relationship**: 
- China: Large trade surplus with US
- US: Large trade deficit with China
- Capital flows: China finances US deficit

**Key insight**: Trade and capital flows were closely linked.

## Chinese inflation

**Inflation pressure**: Rapid money growth created inflation risk.

**Challenges**: Balancing growth, exchange rate, inflation.

**Key insight**: Maintaining peg created inflation pressures.

## Floating exchange effect on China

**If yuan floated**:
- Would appreciate
- Exports more expensive
- Imports cheaper
- Trade surplus would decrease
- Growth might slow

**Key insight**: Floating exchange rate would reduce China's trade advantage.

## Floating exchange effect on US

**If yuan floated**:
- Dollar would depreciate
- US exports cheaper
- Imports more expensive
- Trade deficit would decrease
- But borrowing costs might rise

**Key insight**: Floating exchange rate would help US trade balance but might raise costs.`,
        importantPoints: [
          'China pegged yuan to maintain trade advantage',
          'Accumulated large foreign reserves',
          'Financed US deficit through Treasury purchases',
          'Floating exchange would reduce imbalances',
        ],
      } as ArticleContent,
    ],
  },
  {
    id: 'lesson-8-7',
    title: '2011-2012 Greek debt crisis',
    duration: '35 min',
    contentItems: [
      {
        id: 'finance-u8-l7-video-1',
        type: 'video',
        title: '2011-2012 Greek debt crisis',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'finance-u8-l7-article',
        type: 'article',
        title: 'Learn: 2011-2012 Greek debt crisis',
        content: `# 2011-2012 Greek debt crisis

## Greek debt recession and austerity (part 1)

**Greek crisis**: Severe debt crisis in Greece.

**Causes**:
- High government debt
- Budget deficits
- Economic recession
- Loss of confidence

**Austerity measures**: Spending cuts, tax increases to reduce deficit.

**Effects**: Deepened recession, high unemployment, social unrest.

**Key insight**: Austerity during recession can worsen economic conditions.

## Greek financial crisis (part 2)

**Bailout**: EU and IMF provided loans to Greece.

**Conditions**: Austerity measures, structural reforms.

**Challenges**: Political opposition, social unrest, economic pain.

**Key insight**: Bailouts came with strict conditions that were politically difficult.

## How and why Greece would leave the Euro (part 3)

**Grexit**: Greece leaving Eurozone.

**Why considered**:
- Could devalue currency
- Regain monetary policy
- But: Would be very disruptive

**Challenges**:
- Bank runs
- Capital flight
- Economic disruption
- Political consequences

**Key insight**: Leaving Euro would be extremely disruptive but was considered.

## Why Europe is worried about Greece

**Contagion risk**: Greek crisis could spread to other countries.

**Eurozone stability**: Threatens common currency.

**Systemic risk**: Could trigger broader European crisis.

**Key insight**: Europe worried about contagion and Eurozone stability.`,
        importantPoints: [
          'Greek crisis: high debt, recession, austerity',
          'Bailouts came with strict conditions',
          'Grexit considered but very disruptive',
          'Contagion risk worried Europe',
        ],
      } as ArticleContent,
    ],
  },
  {
    id: 'lesson-8-8',
    title: 'Bitcoin',
    duration: '50 min',
    contentItems: [
      {
        id: 'finance-u8-l8-video-1',
        type: 'video',
        title: 'Bitcoin',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'finance-u8-l8-article',
        type: 'article',
        title: 'Learn: Bitcoin',
        content: `# Bitcoin

## Bitcoin: What is it?

**Bitcoin**: Digital cryptocurrency, decentralized payment system.

**Key features**:
- Digital (no physical form)
- Decentralized (no central authority)
- Peer-to-peer transactions
- Limited supply (21 million bitcoins)
- Blockchain technology

**Key insight**: Bitcoin is a decentralized digital currency.

## Bitcoin: Overview

**How it works**:
- Transactions recorded on blockchain
- Verified by network (miners)
- No central bank or government
- Pseudonymous (not fully anonymous)

**Uses**:
- Digital payments
- Store of value
- Investment/speculation

**Key insight**: Bitcoin enables digital transactions without central authority.

## Bitcoin: Cryptographic hash functions

**Hash function**: Mathematical function that converts input to fixed-size output.

**Properties**:
- Deterministic (same input → same output)
- One-way (can't reverse)
- Small change in input → Completely different output

**Use in Bitcoin**: Secures transactions and blocks.

**Key insight**: Cryptographic hashing secures Bitcoin transactions.

## Bitcoin: Digital signatures

**Digital signature**: Cryptographic proof of ownership.

**How it works**:
- Private key: Secret (like password)
- Public key: Public (like account number)
- Sign transaction with private key
- Others verify with public key

**Key insight**: Digital signatures prove ownership without revealing private key.

## Bitcoin: Transaction records

**Blockchain**: Public ledger of all transactions.

**Blocks**: Groups of transactions, linked together.

**Immutability**: Once recorded, very hard to change.

**Key insight**: Blockchain provides transparent, immutable transaction record.

## Bitcoin: Proof of work

**Proof of work**: Computational work to validate transactions.

**Mining**: Miners solve complex math problems to validate blocks.

**Reward**: Miners receive bitcoins for validating.

**Purpose**: Prevents fraud, secures network.

**Key insight**: Proof of work secures Bitcoin network through computational effort.

## Bitcoin: Transaction block chains

**Blockchain structure**: Blocks linked in chain.

**Each block**: Contains transactions, hash of previous block.

**Security**: Changing one block requires changing all subsequent blocks.

**Key insight**: Blockchain structure makes Bitcoin secure and tamper-resistant.

## Bitcoin: The money supply

**Limited supply**: Maximum 21 million bitcoins.

**Mining**: New bitcoins created through mining (decreasing rate).

**Halving**: Mining reward halves periodically.

**Key insight**: Bitcoin has fixed supply, unlike fiat currencies.

## Bitcoin: The security of transaction block chains

**Security features**:
- Cryptographic hashing
- Proof of work
- Decentralization
- Immutability

**Attacks**: Very difficult due to computational requirements.

**Key insight**: Bitcoin security comes from cryptography and decentralization.`,
        importantPoints: [
          'Bitcoin: decentralized digital currency',
          'Blockchain: public ledger of transactions',
          'Proof of work: secures network through computation',
          'Limited supply: 21 million bitcoins',
          'Cryptographic security: hashing and digital signatures',
        ],
      } as ArticleContent,
    ],
  },
];

const unit9Lessons: Lesson[] = [
  {
    id: 'lesson-9-1',
    title: 'Put and call options',
    duration: '80 min',
    contentItems: [
      {
        id: 'finance-u9-l1-video-1',
        type: 'video',
        title: 'Put and call options',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'finance-u9-l1-article',
        type: 'article',
        title: 'Learn: Put and call options',
        content: `# Put and call options

## American call options

**Call option**: Right (not obligation) to buy asset at strike price before expiration.

**American option**: Can be exercised anytime before expiration.

**Key terms**:
- **Strike price**: Price at which you can buy
- **Premium**: Cost of option
- **Expiration**: When option expires

**Key insight**: Call options give right to buy at fixed price.

## Basic shorting

**Short selling**: Borrow asset, sell it, buy back later (hopefully at lower price).

**Risk**: Unlimited (price can rise indefinitely).

**Key insight**: Shorting allows profit from falling prices but has unlimited risk.

## American put options

**Put option**: Right (not obligation) to sell asset at strike price before expiration.

**American put**: Can be exercised anytime before expiration.

**Use**: Profit from falling prices or protect against losses.

**Key insight**: Put options give right to sell at fixed price.

## Call option as leverage

**Leverage**: Small investment controls large position.

**Example**: 
- Stock: $100
- Call option (strike $100): $5
- Stock rises 10% → $110
- Option value: $10 (100% gain vs. 10% for stock)

**Key insight**: Options provide leverage, amplifying returns (and losses).

## Put vs. short and leverage

**Put option vs. shorting**:
- **Put**: Limited risk (premium), unlimited profit potential
- **Short**: Unlimited risk, limited profit (to zero)

**Leverage**: Both provide leverage, but puts have limited downside.

**Key insight**: Puts provide leveraged downside exposure with limited risk.

## Call payoff diagram

**Payoff diagram**: Shows profit/loss at expiration.

**Call option**:
- Below strike: Loss = Premium
- Above strike: Profit = Stock price - Strike - Premium

**Key insight**: Call options have limited loss (premium) and unlimited profit potential.

## Put payoff diagram

**Put option**:
- Above strike: Loss = Premium
- Below strike: Profit = Strike - Stock price - Premium

**Key insight**: Put options have limited loss (premium) and profit up to strike price.

## Put as insurance

**Protective put**: Buy put to protect against losses.

**How it works**: 
- Own stock
- Buy put option
- If stock falls, put gains offset losses
- Like insurance premium

**Key insight**: Puts can act as insurance against stock price declines.

## Put-call parity

**Put-call parity**: Relationship between put, call, stock, and bond prices.

**Formula**: Call + PV(Strike) = Put + Stock

**Implication**: If violated, arbitrage opportunity exists.

**Key insight**: Put-call parity links option prices and prevents arbitrage.

## Long straddle

**Straddle**: Buy both call and put with same strike and expiration.

**Profit**: If stock moves significantly in either direction.

**Use**: When expecting volatility but unsure of direction.

**Key insight**: Straddles profit from volatility, not direction.

## Put writer payoff diagrams

**Writing puts**: Selling put options.

**Payoff**: Opposite of buying puts.

- Above strike: Profit = Premium
- Below strike: Loss = Strike - Stock price - Premium

**Key insight**: Writing puts has limited profit (premium) and large loss potential.

## Call writer payoff diagram

**Writing calls**: Selling call options.

**Payoff**: Opposite of buying calls.

- Below strike: Profit = Premium
- Above strike: Loss = Stock price - Strike - Premium

**Key insight**: Writing calls has limited profit (premium) and unlimited loss potential.

## Arbitrage basics

**Arbitrage**: Risk-free profit from price differences.

**Requirements**: 
- Same asset, different prices
- Risk-free
- Immediate profit

**Key insight**: Arbitrage opportunities are rare and quickly eliminated.

## Put-call parity arbitrage I

**Arbitrage opportunity**: When put-call parity violated.

**Strategy**: 
- If Call + PV(Strike) < Put + Stock: Buy call, sell put, sell stock
- If Call + PV(Strike) > Put + Stock: Sell call, buy put, buy stock

**Key insight**: Put-call parity violations create arbitrage opportunities.

## Put-call parity arbitrage II

**Execution**: 
- Execute trades simultaneously
- Lock in risk-free profit
- No market risk

**Key insight**: Arbitrage eliminates price discrepancies.

## Put-call parity clarification

**Important points**:
- Holds for European options
- Assumes no dividends
- Requires same strike and expiration

**Key insight**: Put-call parity has specific assumptions.

## Actual option quotes

**Option quotes**: Show bid, ask, volume, open interest.

**Key information**:
- Strike prices
- Expiration dates
- Premiums
- Greeks (delta, gamma, theta, vega)

**Key insight**: Option quotes provide market information for trading.

## Option expiration and price

**Expiration**: When option expires.

**At expiration**:
- In-the-money: Exercised (if profitable)
- Out-of-the-money: Expires worthless

**Time decay**: Option value decreases as expiration approaches.

**Key insight**: Options lose value over time (time decay).`,
        importantPoints: [
          'Call: right to buy, put: right to sell',
          'Options provide leverage',
          'Puts can act as insurance',
          'Put-call parity links option prices',
          'Writing options: limited profit, large loss potential',
        ],
      } as ArticleContent,
    ],
  },
  {
    id: 'lesson-9-2',
    title: 'Forward and futures contracts',
    duration: '90 min',
    contentItems: [
      {
        id: 'finance-u9-l2-video-1',
        type: 'video',
        title: 'Forward and futures contracts',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'finance-u9-l2-article',
        type: 'article',
        title: 'Learn: Forward and futures contracts',
        content: `# Forward and futures contracts

## Forward contract introduction

**Forward contract**: Agreement to buy/sell asset at future date at agreed price.

**Key features**:
- Customized terms
- Over-the-counter (OTC)
- Counterparty risk
- No daily settlement

**Use**: Lock in price for future transaction.

**Key insight**: Forward contracts are customized OTC agreements.

## Futures introduction

**Futures contract**: Standardized forward contract traded on exchange.

**Key features**:
- Standardized terms
- Exchange-traded
- Daily settlement (marking to market)
- Clearinghouse guarantees

**Key insight**: Futures are standardized, exchange-traded forward contracts.

## Motivation for the futures exchange

**Why futures exchanges**:
- Standardization
- Liquidity
- Credit risk reduction (clearinghouse)
- Price discovery
- Transparency

**Key insight**: Futures exchanges solve problems of forward contracts.

## Futures margin mechanics

**Margin**: Collateral required to trade futures.

**Initial margin**: Required to open position.

**Maintenance margin**: Minimum margin to keep position open.

**Margin call**: If margin falls below maintenance, must add funds.

**Key insight**: Margin ensures traders can meet obligations.

## Futures margin mechanics

**Marking to market**: Daily settlement of gains/losses.

**Process**:
- Daily price changes
- Gains/losses credited/debited
- Margin adjusted
- If margin too low, margin call

**Key insight**: Daily settlement reduces credit risk.

## Verifying hedge with futures margin mechanics

**Hedging**: Using futures to offset price risk.

**Example**: 
- Own commodity
- Sell futures
- If price falls, futures gain offsets loss
- Margin mechanics ensure hedge works

**Key insight**: Futures margin mechanics support hedging strategies.

## Futures and forward curves

**Forward curve**: Prices for different delivery dates.

**Shapes**:
- **Contango**: Upward sloping (future price > spot)
- **Backwardation**: Downward sloping (future price < spot)

**Key insight**: Forward curves show market expectations.

## Futures and forward curves

**Factors affecting shape**:
- Storage costs
- Interest rates
- Convenience yield
- Supply/demand expectations

**Key insight**: Multiple factors determine forward curve shape.

## Contango from trader perspective

**Contango**: Future price > spot price.

**Trader view**: 
- Pay premium for future delivery
- Reflects storage costs, interest
- Normal for many commodities

**Key insight**: Contango reflects costs of holding commodity.

## Severe contango generally bearish

**Severe contango**: Very steep upward curve.

**Implications**:
- High storage costs
- Weak demand
- Oversupply
- Bearish signal

**Key insight**: Extreme contango can signal bearish conditions.

## Backwardation bullish or bearish

**Backwardation**: Future price < spot price.

**Can be**:
- **Bullish**: Strong current demand, tight supply
- **Bearish**: Expected future oversupply

**Key insight**: Backwardation can signal different conditions depending on context.

## Futures curves II

**Analysis**: Shape of curve provides information about market.

**Key insight**: Forward curves are important for market analysis.

## Contango

**Definition**: Future price exceeds spot price.

**Causes**: Storage costs, interest rates, convenience yield.

**Key insight**: Contango is normal market condition for many assets.

## Backwardation

**Definition**: Future price below spot price.

**Causes**: High current demand, convenience yield, expected oversupply.

**Key insight**: Backwardation reflects current vs. future supply/demand.

## Contango and backwardation review

**Summary**: 
- Contango: Future > Spot (normal for many commodities)
- Backwardation: Future < Spot (can signal tight supply or oversupply)

**Key insight**: Understanding contango and backwardation is crucial for futures trading.

## Upper bound on forward settlement price

**Upper bound**: Forward price cannot exceed spot + storage + interest.

**Arbitrage**: If forward too high, buy spot, sell forward, store.

**Key insight**: Arbitrage prevents forward price from exceeding upper bound.

## Lower bound on forward settlement price

**Lower bound**: Forward price cannot be too low relative to spot.

**Arbitrage**: If forward too low, sell spot, buy forward.

**Key insight**: Arbitrage keeps forward price within bounds.

## Arbitraging futures contract

**Arbitrage**: Exploit price differences between spot and futures.

**Cash-and-carry**: Buy spot, sell future, store until delivery.

**Reverse cash-and-carry**: Sell spot, buy future.

**Key insight**: Arbitrage keeps spot and futures prices aligned.

## Arbitraging futures contracts II

**More examples**: Different arbitrage strategies.

**Key insight**: Arbitrage opportunities are quickly eliminated.

## Futures fair value in the pre-market

**Fair value**: Theoretical futures price based on spot and costs.

**Calculation**: Spot price + Storage + Interest - Convenience yield.

**Key insight**: Fair value provides benchmark for futures pricing.

## Interpreting futures fair value in the premarket

**Premarket trading**: Trading before regular market opens.

**Fair value**: Helps interpret premarket futures prices.

**Key insight**: Fair value guides premarket trading decisions.`,
        importantPoints: [
          'Forward: customized OTC contract',
          'Futures: standardized exchange-traded',
          'Margin: collateral, daily settlement',
          'Contango: future > spot',
          'Backwardation: future < spot',
          'Arbitrage keeps prices aligned',
        ],
      } as ArticleContent,
    ],
  },
  {
    id: 'lesson-9-3',
    title: 'Mortgage-backed securities',
    duration: '40 min',
    contentItems: [
      {
        id: 'finance-u9-l3-video-1',
        type: 'video',
        title: 'Mortgage-backed securities',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'finance-u9-l3-article',
        type: 'article',
        title: 'Learn: Mortgage-backed securities',
        content: `# Mortgage-backed securities

## Mortgage-backed security overview

**MBS**: Security backed by pool of mortgages.

**How it works**:
- Bank originates mortgages
- Pools mortgages together
- Sells securities backed by mortgage payments
- Investors receive mortgage payments

**Key insight**: MBS transform illiquid mortgages into tradeable securities.

## Mortgage-backed securities I

**Structure**:
- Pool of mortgages
- Cash flows from mortgage payments
- Pass-through to investors
- Servicer collects payments

**Benefits**:
- Liquidity for banks
- Diversification for investors
- Risk transfer

**Key insight**: MBS provide liquidity and risk transfer.

## Mortgage-backed securities II

**Tranches**: Different risk/return classes.

**Senior tranches**: First to receive payments, lower risk, lower return.

**Junior tranches**: Last to receive payments, higher risk, higher return.

**Key insight**: Tranches allow risk/return customization.

## Mortgage-backed securities III

**Risks**:
- **Prepayment risk**: Borrowers pay early, investors lose interest
- **Default risk**: Borrowers don't pay
- **Interest rate risk**: Rates affect prepayments

**Key insight**: MBS have unique risks related to mortgage behavior.`,
        importantPoints: [
          'MBS: securities backed by mortgage pools',
          'Tranches: different risk/return classes',
          'Risks: prepayment, default, interest rate',
        ],
      } as ArticleContent,
    ],
  },
  {
    id: 'lesson-9-4',
    title: 'Collateralized debt obligations',
    duration: '30 min',
    contentItems: [
      {
        id: 'finance-u9-l4-video-1',
        type: 'video',
        title: 'Collateralized debt obligations',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'finance-u9-l4-article',
        type: 'article',
        title: 'Learn: Collateralized debt obligations',
        content: `# Collateralized debt obligations

## Collateralized debt obligation overview

**CDO**: Security backed by pool of debt (bonds, loans, MBS).

**Structure**:
- Pool of debt instruments
- Divided into tranches
- Different risk/return profiles
- Cash flows distributed by priority

**Key insight**: CDOs repackage debt into new securities with different risk profiles.

## Collateralized debt obligation (CDO)

**Types**:
- **CBO**: Collateralized bond obligation (bonds)
- **CLO**: Collateralized loan obligation (loans)
- **Synthetic CDO**: Uses derivatives, not actual debt

**Tranches**:
- **Equity**: Highest risk, highest return, first losses
- **Mezzanine**: Medium risk/return
- **Senior**: Lowest risk, lowest return, last losses

**Risks**:
- Default risk
- Correlation risk (all assets fail together)
- Complexity
- Liquidity risk

**Key insight**: CDOs are complex securities that played role in 2008 financial crisis.`,
        importantPoints: [
          'CDO: backed by pool of debt',
          'Tranches: equity, mezzanine, senior',
          'Risks: default, correlation, complexity',
          'Played role in 2008 crisis',
        ],
      } as ArticleContent,
    ],
  },
  {
    id: 'lesson-9-5',
    title: 'Credit default swaps',
    duration: '40 min',
    contentItems: [
      {
        id: 'finance-u9-l5-video-1',
        type: 'video',
        title: 'Credit default swaps',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'finance-u9-l5-article',
        type: 'article',
        title: 'Learn: Credit default swaps',
        content: `# Credit default swaps

## Credit default swaps (CDS) intro

**CDS**: Insurance-like contract protecting against default.

**How it works**:
- Buyer pays periodic premium
- If reference entity defaults, seller pays buyer
- Like insurance on bonds/loans

**Key insight**: CDS provide protection against credit default.

## Credit default swaps

**Structure**:
- **Reference entity**: Company or security
- **Notional amount**: Size of protection
- **Premium**: Periodic payment (spread)
- **Term**: Length of contract

**Uses**:
- Hedge credit risk
- Speculate on credit
- Synthetic exposure

**Key insight**: CDS can be used for hedging or speculation.

## Credit default swaps 2

**Settlement**:
- **Physical**: Deliver defaulted bonds, receive payment
- **Cash**: Receive cash difference

**Key insight**: CDS can settle physically or in cash.

## Use cases for credit default swaps

**Hedging**:
- Own bonds, buy CDS protection
- If default, CDS pays

**Speculation**:
- Don't own bonds, buy CDS
- Bet on default

**Arbitrage**:
- Exploit price differences

**Key insight**: CDS serve multiple purposes: hedging, speculation, arbitrage.

## Financial weapons of mass destruction

**Warren Buffett quote**: Called derivatives "financial weapons of mass destruction."

**Concerns**:
- Complexity
- Counterparty risk
- Systemic risk
- Lack of transparency
- Amplify crises

**2008 crisis**: CDS played major role in AIG collapse.

**Key insight**: CDS can create systemic risk and amplify financial crises.`,
        importantPoints: [
          'CDS: insurance against default',
          'Buyer pays premium, seller pays if default',
          'Uses: hedging, speculation, arbitrage',
          'Systemic risk: can amplify crises',
        ],
      } as ArticleContent,
    ],
  },
  {
    id: 'lesson-9-6',
    title: 'Interest rate swaps',
    duration: '30 min',
    contentItems: [
      {
        id: 'finance-u9-l6-video-1',
        type: 'video',
        title: 'Interest rate swaps',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'finance-u9-l6-article',
        type: 'article',
        title: 'Learn: Interest rate swaps',
        content: `# Interest rate swaps

## Interest rate swap 1

**Interest rate swap**: Exchange fixed rate for floating rate (or vice versa).

**How it works**:
- Party A: Pays fixed rate, receives floating
- Party B: Pays floating rate, receives fixed
- Exchange interest payments (not principal)

**Uses**:
- Convert fixed to floating (or vice versa)
- Hedge interest rate risk
- Speculate on rates

**Key insight**: Swaps allow parties to exchange interest rate exposures.

## Interest rate swap 2

**Example**:
- Company has floating rate loan
- Wants fixed rate exposure
- Enters swap: pays fixed, receives floating
- Net result: Fixed rate exposure

**Benefits**:
- No need to refinance
- Lower transaction costs
- Flexible terms

**Risks**:
- Counterparty risk
- Basis risk (if rates don't move together)
- Market risk

**Key insight**: Swaps provide flexible way to manage interest rate exposure.`,
        importantPoints: [
          'Swap: exchange fixed for floating rate',
          'Exchange interest payments, not principal',
          'Uses: convert exposure, hedge, speculate',
          'Risks: counterparty, basis, market',
        ],
      } as ArticleContent,
    ],
  },
  {
    id: 'lesson-9-7',
    title: 'Black-Scholes formula',
    duration: '35 min',
    contentItems: [
      {
        id: 'finance-u9-l7-video-1',
        type: 'video',
        title: 'Black-Scholes formula',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'finance-u9-l7-article',
        type: 'article',
        title: 'Learn: Black-Scholes formula',
        content: `# Black-Scholes formula

## Introduction to the Black-Scholes formula

**Black-Scholes**: Mathematical model for pricing European options.

**Formula**: Calculates theoretical option price.

**Inputs**:
- Current stock price
- Strike price
- Time to expiration
- Risk-free interest rate
- Volatility

**Key insight**: Black-Scholes provides theoretical option price based on inputs.

## Implied volatility

**Implied volatility**: Volatility implied by market option prices.

**How it works**:
- Use Black-Scholes formula in reverse
- Input market price, solve for volatility
- Result: Implied volatility

**Uses**:
- Compare to historical volatility
- Market expectations
- Trading decisions

**Key insight**: Implied volatility reflects market expectations of future volatility.`,
        importantPoints: [
          'Black-Scholes: model for option pricing',
          'Inputs: price, strike, time, rate, volatility',
          'Implied volatility: from market prices',
          'Reflects market expectations',
        ],
      } as ArticleContent,
    ],
  },
];

const unit10Lessons: Lesson[] = [
  {
    id: 'lesson-10-1',
    title: 'Unemployment',
    duration: '30 min',
    contentItems: [
      {
        id: 'finance-u10-l1-video-1',
        type: 'video',
        title: 'Unemployment',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'finance-u10-l1-article',
        type: 'article',
        title: 'Learn: Unemployment',
        content: `# Unemployment

## Unemployment

**Unemployment**: People who want to work but can't find jobs.

**Types**:
- **Frictional**: Between jobs, temporary
- **Structural**: Skills mismatch, permanent changes
- **Cyclical**: Due to economic downturn
- **Seasonal**: Due to seasonal patterns

**Key insight**: Unemployment has multiple causes and types.

## Unemployment rate primer

**Unemployment rate**: Percentage of labor force that is unemployed.

**Calculation**: (Unemployed / Labor Force) × 100

**Labor force**: Employed + Unemployed (actively seeking work)

**Not in labor force**: Not working and not seeking work (students, retirees, etc.)

**Key insight**: Unemployment rate measures those actively seeking work.

## Unemployment rate primer

**Limitations**:
- Doesn't count discouraged workers
- Doesn't count underemployed
- May not reflect true job market conditions

**Key insight**: Unemployment rate has limitations and may not capture full picture.

## Simple analysis of cost per job saved from stimulus

**Stimulus spending**: Government spending to create/save jobs.

**Cost per job**: Total spending / Jobs created or saved

**Analysis**: Evaluate efficiency of stimulus programs.

**Key insight**: Stimulus effectiveness can be measured by cost per job.`,
        importantPoints: [
          'Unemployment: multiple types (frictional, structural, cyclical)',
          'Unemployment rate: percentage of labor force',
          'Limitations: doesn\'t count discouraged workers',
          'Stimulus: cost per job analysis',
        ],
      } as ArticleContent,
    ],
  },
  {
    id: 'lesson-10-2',
    title: 'Housing price conundrum',
    duration: '40 min',
    contentItems: [
      {
        id: 'finance-u10-l2-video-1',
        type: 'video',
        title: 'Housing price conundrum',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'finance-u10-l2-article',
        type: 'article',
        title: 'Learn: Housing price conundrum',
        content: `# Housing price conundrum

## The housing price conundrum

**Housing price puzzle**: Why did housing prices rise so much?

**Factors**:
- Low interest rates
- Easy credit
- Speculation
- Supply constraints
- Demographic trends

**Key insight**: Multiple factors contributed to housing price increases.

## Housing price conundrum (part 2)

**Further analysis**: Examining specific factors in detail.

**Key insight**: Housing prices driven by complex combination of factors.

## Housing price conundrum (part 3)

**Additional factors**:
- Government policies
- Tax incentives
- Financial innovation
- Global capital flows

**Key insight**: Policy and financial factors also played roles.

## Housing conundrum (part 4)

**Conclusion**: Housing price increases were result of multiple interacting factors.

**Key insight**: Understanding housing prices requires analyzing multiple economic forces.`,
        importantPoints: [
          'Housing prices: multiple factors',
          'Low rates, easy credit, speculation',
          'Supply constraints, demographics',
          'Policy and financial factors',
        ],
      } as ArticleContent,
    ],
  },
  {
    id: 'lesson-10-3',
    title: 'Credit crisis',
    duration: '60 min',
    contentItems: [
      {
        id: 'finance-u10-l3-video-1',
        type: 'video',
        title: 'Credit crisis',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'finance-u10-l3-article',
        type: 'article',
        title: 'Learn: Credit crisis',
        content: `# Credit crisis

## The housing price conundrum

**Housing bubble**: Rapid increase in housing prices.

**Causes**: Low rates, easy credit, speculation.

**Key insight**: Housing bubble was foundation of credit crisis.

## Housing price conundrum (part 2)

**Bubble burst**: Housing prices began to fall.

**Effects**: Defaults increased, financial system stressed.

**Key insight**: Housing price decline triggered credit crisis.

## Housing price conundrum (part 3)

**Cascade effects**: Housing problems spread to broader economy.

**Key insight**: Housing crisis had widespread economic effects.

## Housing conundrum (part 4)

**Systemic impact**: Credit crisis affected entire financial system.

**Key insight**: Housing problems created systemic financial crisis.

## Mortgage-backed securities I

**MBS**: Securities backed by mortgage pools.

**Problem**: When mortgages defaulted, MBS lost value.

**Key insight**: MBS amplified housing crisis.

## Mortgage-backed securities II

**Tranches**: Different risk classes in MBS.

**Senior tranches**: Supposedly safe, but still affected.

**Key insight**: Even "safe" tranches were vulnerable.

## Mortgage-backed securities III

**Complexity**: MBS structure made risks hard to assess.

**Key insight**: Complexity hid true risks.

## Collateralized debt obligation (CDO)

**CDO**: Securities backed by MBS and other debt.

**Problem**: Concentrated risk, underestimated correlation.

**Key insight**: CDOs concentrated and amplified risks.

## Credit default swaps

**CDS**: Insurance against default.

**Problem**: Massive exposure, counterparty risk.

**Key insight**: CDS created systemic risk.

## Credit default swaps 2

**AIG collapse**: CDS exposure nearly destroyed AIG.

**Systemic risk**: Threatened entire financial system.

**Key insight**: CDS created massive systemic risk.

## Wealth destruction 1

**Wealth destruction**: Massive losses in financial assets.

**Causes**: Housing collapse, financial crisis, economic downturn.

**Key insight**: Crisis destroyed trillions in wealth.

## Wealth destruction 2

**Recovery**: Long process to rebuild wealth.

**Lessons**: Importance of risk management, regulation.

**Key insight**: Wealth destruction had lasting effects.`,
        importantPoints: [
          'Housing bubble led to credit crisis',
          'MBS, CDOs amplified risks',
          'CDS created systemic risk',
          'Massive wealth destruction',
        ],
      } as ArticleContent,
    ],
  },
  {
    id: 'lesson-10-4',
    title: 'Paulson bailout',
    duration: '60 min',
    contentItems: [
      {
        id: 'finance-u10-l4-video-1',
        type: 'video',
        title: 'Paulson bailout',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'finance-u10-l4-article',
        type: 'article',
        title: 'Learn: Paulson bailout',
        content: `# Paulson bailout

## CNN: Understanding the crisis

**2008 Financial Crisis**: Most severe since Great Depression.

**Causes**: Housing bubble, subprime lending, excessive leverage, regulatory failures.

**Key insight**: Crisis had multiple causes and required comprehensive response.

## Bailout 1: Liquidity vs. solvency

**Liquidity crisis**: Can't meet short-term obligations but fundamentally solvent.

**Solvency crisis**: Liabilities exceed assets (insolvent).

**2008 crisis**: Many banks faced both.

**Key insight**: Distinguishing liquidity from solvency is crucial for policy response.

## Bailout 2: Book value

**Book value**: Value on balance sheet (historical cost).

**Market value**: Current market price.

**Problem**: Banks held assets at book value when market value had fallen.

**Key insight**: Book value can hide true financial condition.

## Bailout 3: Book value vs. market value

**Gap between book and market**:
- Assets marked at book value
- Market value much lower
- Created illusion of solvency

**Key insight**: Market value reveals true financial position.

## Bailout 4: Mark-to-model vs. mark-to-market

**Mark-to-market**: Value at current market prices.

**Mark-to-model**: Value using mathematical models.

**Problem**: Models proved wrong, underestimated losses.

**Key insight**: Mark-to-model can hide true values when markets freeze.

## Bailout 5: Paying off the debt

**Option**: Government pays bank's debt.

**Problems**: Very expensive, rewards bad behavior, unfair.

**Key insight**: Paying debt directly is too costly and creates moral hazard.

## Bailout 6: Getting an equity infusion

**Option**: Government injects equity (capital).

**Advantages**: Bank survives, taxpayers get ownership, less moral hazard.

**Used in 2008**: TARP injected capital into banks.

**Key insight**: Equity infusion provides capital while giving taxpayers ownership stake.

## Bailout 7: Bank goes into bankruptcy

**Option**: Let bank fail.

**Advantages**: No moral hazard, market discipline.

**Disadvantages**: Can cause panic, contagion, economic damage.

**Example**: Lehman Brothers failure intensified crisis.

**Key insight**: Bank failures can cause systemic problems.

## Bailout 8: Systemic risk

**Systemic risk**: Failure of one institution threatens entire system.

**Why banks are systemically important**: Interconnected, provide essential services.

**2008**: Failure threatened entire financial system.

**Key insight**: Systemic risk justifies government intervention.

## Bailout 9: Paulson's plan

**TARP**: Troubled Asset Relief Program.

**Original plan**: Buy troubled assets.

**Revised plan**: Inject capital directly.

**Result**: $700 billion program, mostly capital injections.

**Key insight**: TARP evolved from asset purchases to capital injections.

## Bailout 10: Moral hazard

**Moral hazard**: Protection encourages risky behavior.

**2008 bailout created moral hazard**: Banks rescued, signals "too big to fail."

**Mitigation**: Regulations (Dodd-Frank), stress tests, capital requirements.

**Key insight**: Bailouts create moral hazard but may be necessary for stability.

## Bailout 11: Why these CDOs could be worth nothing

**CDO**: Complex security backed by mortgages.

**Why worthless**: Mortgages defaulted, no income, no market.

**Key insight**: Complex financial products can become worthless when assumptions fail.

## Bailout 12: Lone Star transaction

**Example**: Private equity bought troubled assets at deep discount.

**Lesson**: Some assets could be handled by private sector.

**Key insight**: Not all assets needed government purchase.

## Bailout 13: Does the bailout have a chance of working?

**Factors for success**: Sufficient size, quick implementation, addresses both liquidity and solvency.

**Risks**: May not be enough, moral hazard, political opposition.

**Key insight**: Bailout success was uncertain but necessary to try.

## Bailout 14: Possible solution

**Comprehensive approach**: Liquidity, capital, asset purchases, guarantees, regulation.

**Key insight**: Crisis required multiple tools, not single solution.

## Bailout 15: More on the solution

**Additional measures**: Fiscal stimulus, monetary policy, regulatory reform.

**Key insight**: Comprehensive response needed: bailouts, stimulus, monetary policy, regulation.`,
        importantPoints: [
          'Liquidity vs. solvency: different problems',
          'TARP: $700 billion bailout program',
          'Systemic risk justified intervention',
          'Moral hazard: ongoing concern',
          'Comprehensive response needed',
        ],
      } as ArticleContent,
    ],
  },
  {
    id: 'lesson-10-5',
    title: 'European Union',
    duration: '40 min',
    contentItems: [
      {
        id: 'finance-u10-l5-video-1',
        type: 'video',
        title: 'Brexit and European Union primer',
        videoIndex: 0,
      } as VideoContent,
      {
        id: 'finance-u10-l5-video-2',
        type: 'video',
        title: 'United Kingdom vs Great Britain vs England primer',
        videoIndex: 1,
      } as VideoContent,
      {
        id: 'finance-u10-l5-video-3',
        type: 'video',
        title: 'Greek debt recession and austerity (part 1)',
        videoIndex: 2,
      } as VideoContent,
      {
        id: 'finance-u10-l5-video-4',
        type: 'video',
        title: 'Greek financial crisis (part 2)',
        videoIndex: 3,
      } as VideoContent,
      {
        id: 'finance-u10-l5-video-5',
        type: 'video',
        title: 'How and why Greece would leave the Euro (part 3)',
        videoIndex: 4,
      } as VideoContent,
      {
        id: 'finance-u10-l5-video-6',
        type: 'video',
        title: 'Why Europe is worried about Greece',
        videoIndex: 5,
      } as VideoContent,
      {
        id: 'finance-u10-l5-article',
        type: 'article',
        title: 'Learn: European Union',
        content: `# European Union

## Brexit and European Union primer

**Brexit**: United Kingdom leaving European Union.

**EU**: Economic and political union of European countries.

**Key features**:
- Single market
- Free movement of people, goods, services, capital
- Common policies
- Euro currency (for some members)

**Key insight**: Brexit was major political and economic event.

## United Kingdom vs Great Britain vs England primer

**Geographic terms**:
- **England**: Country
- **Great Britain**: England + Scotland + Wales
- **United Kingdom**: Great Britain + Northern Ireland
- **British Isles**: All islands including Ireland

**Key insight**: Understanding geographic terms is important for understanding Brexit.

## Greek debt recession and austerity (part 1)

**Greek crisis**: Severe debt crisis in Greece.

**Causes**:
- High government debt
- Budget deficits
- Economic recession
- Loss of confidence

**Austerity measures**: Spending cuts, tax increases to reduce deficit.

**Effects**: Deepened recession, high unemployment, social unrest.

**Key insight**: Austerity during recession can worsen economic conditions.

## Greek financial crisis (part 2)

**Bailout**: EU and IMF provided loans to Greece.

**Conditions**: Austerity measures, structural reforms.

**Challenges**: Political opposition, social unrest, economic pain.

**Key insight**: Bailouts came with strict conditions that were politically difficult.

## How and why Greece would leave the Euro (part 3)

**Grexit**: Greece leaving Eurozone.

**Why considered**:
- Could devalue currency
- Regain monetary policy
- But: Would be very disruptive

**Challenges**:
- Bank runs
- Capital flight
- Economic disruption
- Political consequences

**Key insight**: Leaving Euro would be extremely disruptive but was considered.

## Why Europe is worried about Greece

**Contagion risk**: Greek crisis could spread to other countries.

**Eurozone stability**: Threatens common currency.

**Systemic risk**: Could trigger broader European crisis.

**Key insight**: Europe worried about contagion and Eurozone stability.`,
        importantPoints: [
          'Brexit: UK leaving EU',
          'EU: economic and political union',
          'Greek crisis: debt, austerity, bailouts',
          'Grexit: considered but disruptive',
          'Contagion risk worried Europe',
        ],
      } as ArticleContent,
    ],
  },
];

export const financeMarketsCourse: Course = {
  id: 'finance-markets',
  title: 'Finance & Markets',
  description: 'Comprehensive study of financial markets, instruments, and investment strategies',
  units: [
    {
      id: 'unit-1',
      title: 'Interest and debt',
      description: 'Understanding interest, compound interest, credit cards, loans, present value, and bankruptcy',
      lessons: unit1Lessons,
    },
    {
      id: 'unit-2',
      title: 'Housing',
      description: 'Understanding home equity, balance sheets, renting vs. buying, mortgages, and the home buying process',
      lessons: unit2Lessons,
    },
    {
      id: 'unit-3',
      title: 'Inflation',
      description: 'Understanding inflation, deflation, real vs. nominal returns, and capacity utilization',
      lessons: unit3Lessons,
    },
    {
      id: 'unit-4',
      title: 'Taxes',
      description: 'Understanding personal taxes, corporate taxation, and tax planning',
      lessons: unit4Lessons,
    },
    {
      id: 'unit-5',
      title: 'Accounting and financial statements',
      description: 'Understanding cash vs. accrual accounting, financial statements, and depreciation',
      lessons: unit5Lessons,
    },
    {
      id: 'unit-6',
      title: 'Stocks and bonds',
      description: 'Understanding stocks, bonds, corporate finance, valuation, and company life cycle',
      lessons: unit6Lessons,
    },
    {
      id: 'unit-7',
      title: 'Investment vehicles, insurance, and retirement',
      description: 'Understanding mutual funds, ETFs, retirement accounts, insurance, hedge funds, and investment principles',
      lessons: unit7Lessons,
    },
    {
      id: 'unit-8',
      title: 'Money, banking and central banks',
      description: 'Understanding banking, money creation, central banks, quantitative easing, financial crises, and cryptocurrencies',
      lessons: unit8Lessons,
    },
    {
      id: 'unit-9',
      title: 'Options, swaps, futures, MBSs, CDOs, and other derivatives',
      description: 'Understanding options, futures, swaps, mortgage-backed securities, CDOs, credit default swaps, and option pricing',
      lessons: unit9Lessons,
    },
    {
      id: 'unit-10',
      title: 'Current economics',
      description: 'Understanding unemployment, housing prices, credit crisis, financial bailouts, and European Union issues',
      lessons: unit10Lessons,
    },
  ],
  finalExamPassRate: 75,
  finalExam: [],
};

