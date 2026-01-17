import type {
  Course,
  Unit,
  Lesson,
  VideoContent,
  ArticleContent,
  PracticeContent,
  QuizContent} from '../courseTypes';

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
        videoIndex: 0} as VideoContent,
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
          'Forces us to make choices']} as ArticleContent,
      {
        id: 'economics-u1-l1-quiz',
        type: 'quiz',
        title: 'Quiz: Scarcity',
        questions: [
          {
            id: 'quiz-1-1-1',
            question: 'Among historical figures who have made significant contributions to economics, Adam Smith holds a notable place. Which of the following best describes who Adam Smith is?',
            options: [
              'a popular actor from the 18th century',
              'the first president of an economic association',
              'a Scottish philosopher known as the first economist',
              'a renowned physicist from Scotland'],
            correctAnswer: 2,
            explanation: 'Adam Smith was a Scottish philosopher and economist, widely regarded as the father of modern economics. He is best known for his influential work "The Wealth of Nations" (1776), which laid the foundation for classical economics and introduced concepts like the division of labor, free markets, and the invisible hand.'},
          {
            id: 'quiz-1-1-2',
            question: 'Consumers, businesses, and government decision-makers all face scarcity of resources. Within the business environment, which resource most commonly represents a challenge due to scarcity?',
            options: [
              'decisions relating to branding and marketing',
              'strategies for customer engagement and retention',
              'choices around business location or expansion',
              'available capital or raw materials'],
            correctAnswer: 3,
            explanation: 'In the business environment, available capital (money for investment) and raw materials are the most commonly scarce resources. These are tangible, limited resources that directly constrain what a business can produce or invest in. While branding, marketing, and location decisions are important, they are not typically the primary resources that face scarcity constraints.'},
          {
            id: 'quiz-1-1-3',
            question: 'A fundamental aspect of personal financial planning is understanding that we must manage our spending wisely, given money is not an unlimited resource. What economic concept is this scenario best explained by?',
            options: [
              'resources',
              'self-interest',
              'the Invisible Hand',
              'scarcity'],
            correctAnswer: 3,
            explanation: 'Scarcity is the fundamental economic concept that explains why we must manage spending wisely. Scarcity means that resources (including money) are limited, while wants and needs are unlimited. This forces us to make choices about how to allocate our limited resources. Self-interest refers to individuals acting in their own benefit, the Invisible Hand describes how markets coordinate economic activity, and resources are the inputs used in production, but none of these directly explain why money is limited and requires wise management.'},
          {
            id: 'quiz-1-1-4',
            question: 'Understanding scarcity is essential for analyzing how markets operate and resources are distributed. How does a resource become scarce?',
            options: [
              'when there is less of it',
              'when producers limit the supply of it',
              'when more people want it',
              'when governments ban it'],
            correctAnswer: 0,
            explanation: 'A resource becomes scarce when there is less of it available relative to the demand for it. Scarcity is fundamentally about the relationship between limited supply and unlimited wants. While producers limiting supply, increased demand, or government bans can contribute to scarcity, the core definition of scarcity is simply that there is less of the resource available than people want or need.'}]} as QuizContent]},
  {
    id: 'lesson-1-2',
    title: 'Costs and benefits',
    duration: '35 min',
    contentItems: [
      {
        id: 'economics-u1-l2-video-1',
        type: 'video',
        title: 'Costs and benefits',
        videoIndex: 0} as VideoContent,
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
          'Increasing opportunity cost along curve']} as ArticleContent
    ]},
  {
    id: 'lesson-1-3',
    title: 'Decision making and unintended consequences',
    duration: '40 min',
    contentItems: [
      {
        id: 'economics-u1-l3-video-1',
        type: 'video',
        title: 'Decision making and unintended consequences',
        videoIndex: 0} as VideoContent,
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
          'Unintended consequences: unforeseen results']} as ArticleContent,
      {
        id: 'economics-u1-l3-quiz',
        type: 'quiz',
        title: 'Quiz: Decision making and unintended consequences',
        questions: [
          {
            id: 'quiz-1-3-1',
            question: 'Which of the following best describes the process of cost-benefit analysis in economics?',
            options: [
              'considering only the long-term impacts of a decision without regard to immediate effects',
              'evaluating only the financial costs involved in a decision, ignoring non-monetary benefits',
              'comparing the additional costs of a decision to the additional benefits to decide if the decision should be made',
              'analyzing the total costs and total benefits of a decision to determine if it should be made'],
            correctAnswer: 2,
            explanation: 'Cost-benefit analysis in economics typically involves comparing the marginal (additional) costs of a decision or action with its marginal (additional) benefits. This approach helps in making optimal decisions by ensuring that the benefits gained from an action outweigh its costs. Options A and B are incorrect because cost-benefit analysis considers both short-term and long-term impacts, and includes both monetary and non-monetary factors. Option D describes a broader analysis but often, in decision-making, the focus is on the additional costs and benefits of taking one more step or making a specific choice, rather than just the total.'},
          {
            id: 'quiz-1-3-2',
            question: 'A school district decided to implement a policy requiring students to attend additional tutoring sessions after school to improve standardized test scores. Which of the following is a likely unintended consequence of this policy?',
            options: [
              'Parents will save money on private tutoring services as the school provides additional support.',
              'Students\' standardized test scores will improve significantly across the district.',
              'Teachers will receive additional compensation for the extra hours spent on tutoring.',
              'Students will have less time for extracurricular activities, potentially leading to decreased participation in sports, arts, and clubs.'],
            correctAnswer: 3,
            explanation: 'The policy\'s primary goal is to improve test scores. While options A, B, and C could be potential positive outcomes or intended effects (or at least not strictly "unintended consequences" in the negative sense), option D describes a common and often overlooked negative side effect of increased academic demands on students\' time. Requiring additional after-school tutoring directly reduces the time available for other activities, such as sports, arts, and clubs, which can lead to decreased participation in these areas. This fits the definition of a "likely unintended consequence."'},
          {
            id: 'quiz-1-3-3',
            question: 'Sally is looking at different college majors and made a decision based on the PACED decision making grid, and assumed the opportunity cost. The grid shows: Major A (Computer Science) with total score 28, Major B (Art History) with total score 27, and Major C (Biology) with total score 21. Which alternative is the remaining trade-off?',
            options: [
              'Major A (Computer Science)',
              'Major B (Art History)',
              'Major C (Biology)'],
            correctAnswer: 1,
            explanation: 'In PACED decision making, when a choice is made based on the highest total score, the opportunity cost is the value of the next best alternative that was given up. If Sally chose Major A (Computer Science) with the highest score of 28, the opportunity cost would be Major B (Art History) with the second-highest score of 27. The "remaining trade-off" refers to the alternative that represents the opportunity cost of the chosen option, which is Major B (Art History).'}]} as QuizContent]},
  {
    id: 'lesson-1-4',
    title: 'Factors of production',
    duration: '35 min',
    contentItems: [
      {
        id: 'economics-u1-l4-video-1',
        type: 'video',
        title: 'Factors of production',
        videoIndex: 0} as VideoContent,
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
          'Entrepreneurship: innovation and risk-taking']} as ArticleContent,
      {
        id: 'economics-u1-l4-quiz',
        type: 'quiz',
        title: 'Quiz: Factors of production',
        questions: [
          {
            id: 'quiz-1-4-1',
            question: 'Which of these best defines *land* as economic factor of production?',
            options: [
              'pieces of the earth that people buy in order to build on',
              'the entire surface of the earth',
              'all natural resources',
              'pieces of the earth that are reserved for growing crops'],
            correctAnswer: 2,
            explanation: 'In economics, "land" as a factor of production is a broad term that encompasses all natural resources used in the production of goods and services. This includes not only the physical ground itself but also everything that nature provides, such as minerals, forests, water, fertile soil, and even the air. Options A and D are too narrow, focusing only on specific uses of land. Option B is too general and doesn\'t specifically highlight its role as a factor of production.'},
          {
            id: 'quiz-1-4-2',
            question: 'Entrepreneurship is one of the four factors of production in economics. The economic concept of entrepreneurship is shown in which answer?',
            options: [
              'Brian, an artist, is starting skateboard company that specializes in wild graphics. He is updating his portfolio of art work, coming up with budgets based on the cost of skateboard production, and seeking out funders for this new business.',
              'The manager at the local guitar store has been tasked with buying more equipment in order to limit the amount of human labor needed to run the storefront.',
              'Sandra asks her boss for a raise and gives her a few reasons she deserves more money.',
              'Monique works for a delivery company and tells her boss about a vacant lot seen on her route. She knows her boss is looking for more space to store delivery trucks.'],
            correctAnswer: 0,
            explanation: 'Entrepreneurship involves organizing resources, taking risks, and innovating to create new businesses or products. Brian is demonstrating entrepreneurship by starting a new business, planning production costs, and seeking funding - all key entrepreneurial activities. Option B describes capital investment, option C describes labor negotiation, and option D describes information sharing, none of which represent entrepreneurship as a factor of production.'},
          {
            id: 'quiz-1-4-3',
            question: 'John is a junior software developer at XYZ Company. He recently completed an advanced programming languages training program provided by his employer. How did this training program impact John\'s human capital?',
            options: [
              'There was no effect on John\'s human capital because it was provided by his employer and not an educational institution.',
              'It reduced John\'s human capital by taking him away from his routine tasks.',
              'The training program increased John\'s human capital by enhancing his knowledge and skills, making him more valuable to his employer.',
              'There was a decrease in John\'s human capital because he spent time learning instead of contributing to the company.'],
            correctAnswer: 2,
            explanation: 'Human capital refers to the knowledge, skills, and abilities that people acquire through education, training, and experience. Training programs, regardless of who provides them, enhance human capital by improving an individual\'s skills and knowledge. This makes the person more productive and valuable in the labor market. The source of the training (employer vs. educational institution) does not affect its impact on human capital.'},
          {
            id: 'quiz-1-4-4',
            question: 'In economics, the factors of production are the basic building blocks of all goods and services. Of the following choices, which one includes all four factors of production?',
            options: [
              'Trevon just founded a clothing company that specializes in soccer attire. He will be employing a staff of three people.',
              'Susie, the founder and owner of a dog tag making business, is looking to expand her business. She has bought a new dog tag making machine and has hired more staff.',
              'The jewelry company in the mall just leased the area next to their current location. With this expansion, they are also buying more equipment.',
              'Marcy just purchased land and is using the new lot to construct a building that will manufacturer bicycles. She has hired a contractor to construct the building and has equipment on order that will aid her in assembling the bikes at this new company.'],
            correctAnswer: 3,
            explanation: 'The four factors of production are Land, Labor, Capital, and Entrepreneurship. Option D includes all four: Land (purchased land), Capital (building and equipment), Labor (hired contractor and implied workers for bike assembly), and Entrepreneurship (Marcy organizing and undertaking the bicycle manufacturing business). Option A includes Labor and Entrepreneurship but lacks explicit Land and Capital. Option B includes Labor, Capital, and Entrepreneurship but lacks explicit Land. Option C includes Land and Capital but lacks explicit Labor and Entrepreneurship.'}]} as QuizContent]},
  {
    id: 'lesson-1-5',
    title: 'Human capital and income',
    duration: '30 min',
    contentItems: [
      {
        id: 'economics-u1-l5-video-1',
        type: 'video',
        title: 'Human capital and income',
        videoIndex: 0} as VideoContent,
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
          'Develop high-value skills']} as ArticleContent,
      {
        id: 'economics-u1-l5-quiz',
        type: 'quiz',
        title: 'Quiz 2: Human capital and income',
        questions: [
          {
            id: 'quiz-1-5-1',
            question: 'What is the definition of income potential in economics?',
            options: [
              'The physical assets an individual owns, such as property and equipment.',
              'The total amount of money an individual has saved and invested.',
              'The amount of money an individual could earn based on their skills, education, experience, and the opportunities available in their field or job market.',
              'The total income an individual has earned over their lifetime.'],
            correctAnswer: 2,
            explanation: 'Income potential refers to an individual\'s capacity to earn income in the future, which is determined by their human capital (skills, education, experience) and the demand for those attributes in the job market.'},
          {
            id: 'quiz-1-5-2',
            question: 'High school students Maria and Ahmed recently completed different summer programs and are now competing for a job as a junior web developer. Maria attended a coding boot camp and earned a certificate in web development, while Ahmed completed an internship at a local community center, gaining experience in project management and community outreach. Based on their summer experiences, how might the market value their human capital differently?',
            options: [
              'Maria and Ahmed will both be valued equally because companies prioritize diverse experiences in their employees.',
              'Ahmed is likely to be valued higher because he has experience in project management, which is crucial for any job.',
              'Maria is likely to be valued higher because her coding boot camp directly relates to the technical skills required for the job.',
              'Ahmed and Maria are likely to be valued equally because they have completed summer programs that show they are proactive.'],
            correctAnswer: 2,
            explanation: 'The market values human capital based on its relevance to the specific job requirements. For a junior web developer position, technical coding skills are directly applicable and more valuable than project management experience in a different context. Maria\'s coding boot camp certificate demonstrates specific technical skills that match the job requirements, making her human capital more valuable for this particular position.'},
          {
            id: 'quiz-1-5-3',
            question: 'Ravi and Maria are both software developers. Ravi has 5 years of experience and a master\'s degree in computer science, while Maria has 2 years of experience and a bachelor\'s degree in the same field. Both are applying for a position at a tech company. Based on how the market values human capital, which scenario is most likely to occur?',
            options: [
              'The company offers Ravi a higher salary than Maria because Ravi\'s additional experience and education increase his human capital.',
              'The company decides not to hire either Ravi or Maria and looks for candidates with no formal education but more practical skills.',
              'The company offers Maria a higher salary than Ravi because Maria is younger and has more potential for growth.',
              'The company offers both Ravi and Maria the same salary because they both have relevant degrees.'],
            correctAnswer: 0,
            explanation: 'In economics, human capital refers to the economic value of a worker\'s experience and skills. Higher education and more experience generally lead to higher human capital and, consequently, a higher salary. Ravi has both more experience (5 years vs. 2 years) and a higher degree (master\'s vs. bachelor\'s), which increases his human capital and makes him more valuable to employers.'},
          {
            id: 'quiz-1-5-4',
            question: 'When hiring, employers will look at the market value of an individual worker\'s human capital. What defines the market value of a worker\'s human capital in economics?',
            options: [
              'An individual\'s skills, education, experience, and productivity determine their market value.',
              'The total amount of money an individual has saved and invested.',
              'The total income an individual has earned over their lifetime.',
              'The physical assets an individual owns, such as property and equipment.'],
            correctAnswer: 0,
            explanation: 'The market value of human capital is determined by the qualities and abilities an individual possesses that contribute to their productivity and earning potential in the labor market. This includes their skills, education, experience, and overall productivity. Options B, C, and D relate to financial wealth, past earnings, or physical assets, which are distinct from human capital itself.'}]} as QuizContent]},
  {
    id: 'lesson-1-6',
    title: 'Economic systems',
    duration: '45 min',
    contentItems: [
      {
        id: 'economics-u1-l6-video-1',
        type: 'video',
        title: 'Economic systems',
        videoIndex: 0} as VideoContent,
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
          'Traditional: based on customs']} as ArticleContent,
      {
        id: 'economics-u1-l6-quiz',
        type: 'quiz',
        title: 'Quiz: Economic systems',
        questions: [
          {
            id: 'quiz-1-6-1',
            question: 'Which of the following scenarios best illustrates the principles of a market economy as described by Adam Smith?',
            options: [
              'The government sets the price of bread to ensure it is affordable for all citizens.',
              'A local bakery receives subsidies from the government to stay in business, regardless of its performance.',
              'The government allocates resources to produce a specific number of bread loaves each month.',
              'A local bakery decides to lower its prices to attract more customers, responding to competition and consumer demand.'],
            correctAnswer: 3,
            explanation: 'Adam Smith\'s concept of a market economy emphasizes minimal government intervention, where economic decisions (like pricing and production) are primarily driven by the forces of supply and demand, competition, and individual self-interest (often referred to as the "invisible hand"). Options A, B, and C all describe scenarios with significant government intervention in pricing, subsidies, or resource allocation, which are contrary to Smith\'s principles. Option D, where a bakery adjusts prices in response to competition and consumer demand, directly illustrates these core tenets of a free market economy.'},
          {
            id: 'quiz-1-6-2',
            question: 'Which pair of economic systems correctly completes the following statement: "In a ___ economy, a centralized government takes full control of the economy, whereas in a ___ economy, individual local communities make their economic decisions without outside intervention."?',
            options: [
              'Command; Traditional',
              'Traditional; Command',
              'Market; Command',
              'Mixed; Traditional'],
            correctAnswer: 0,
            explanation: 'A command economy (also known as a planned economy) is an economic system where a central government makes all economic decisions, controlling resources, production, and distribution. In contrast, a traditional economy relies on customs, history, and time-honored beliefs. Economic decisions in a traditional economy are often based on what has been done in the past, with individual local communities playing a significant role in decision-making, often without external governmental intervention.'},
          {
            id: 'quiz-1-6-3',
            question: 'Which of the following scenarios best illustrates a characteristic of a mixed economy?',
            options: [
              'Sally is looking to buy a particular pair of shoes and outfit after she gets paid, but she only has enough money for one item.',
              'The government manufacturers a pill available nowhere else and sets the price for it.',
              'The government instructs truck manufacturers to build one electric truck for every three diesel trucks they sell.',
              'A book store decides to order more books and charge more for them due to a high demand.'],
            correctAnswer: 2,
            explanation: 'A mixed economy combines elements of both market and command systems. Option C illustrates this by showing government intervention (command element) in private industry\'s production decisions (market element), which is a key characteristic of a mixed economy. Option A describes scarcity and individual consumer choice, typical of a market economy. Option B describes a government monopoly, characteristic of a command economy. Option D describes market forces of supply and demand, typical of a pure market economy.'},
          {
            id: 'quiz-1-6-4',
            question: 'Which pair of economic systems correctly completes the following statement: "In a ___ economy, businesses are free to market themselves without government regulation, whereas in a ___ economy, private businesses are allowed to function with some government oversight."?',
            options: [
              'Market; Mixed',
              'Command; Market',
              'Mixed; Command',
              'Traditional; Market'],
            correctAnswer: 0,
            explanation: 'A market economy is characterized by minimal government intervention, allowing businesses to operate freely without regulation. In contrast, a mixed economy combines elements of both market and command systems, permitting private businesses to function but with some government oversight and regulation to achieve broader societal or economic goals.'}]} as QuizContent]}];

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
        videoIndex: 0} as VideoContent,
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
          'Marketing can limit consumer sovereignty']} as ArticleContent,
      {
        id: 'economics-u2-l1-quiz',
        type: 'quiz',
        title: 'Quiz: Incentives and marketing',
        questions: [
          {
            id: 'quiz-2-1-1',
            question: 'Marketing is an essential part of selling an item in the marketplace. What is the primary role of marketing in business?',
            options: [
              'to make the product blend in with others on the market',
              'to increase the supply of a product',
              'to make a product cheaper to buy',
              'to stimulate demand for a product or service'],
            correctAnswer: 3,
            explanation: 'Marketing\'s core function is to create awareness, interest, and desire among consumers for a product or service, thereby encouraging them to purchase it. This directly translates to stimulating demand. Options A, B, and C describe other business functions or outcomes, not the primary role of marketing.'},
          {
            id: 'quiz-2-1-2',
            question: 'Which of the following best defines the economic concept of consumer sovereignty?',
            options: [
              'the government\'s control over what goods and services are available in the market',
              'the power of consumers to dictate what goods and services are produced based on their purchasing choices',
              'the ability of companies to set prices for their products without any competition',
              'the influence of international trade on a country\'s economy'],
            correctAnswer: 1,
            explanation: 'Consumer sovereignty is the economic concept that consumers, through their purchasing decisions, determine what goods and services are produced in a market economy. When consumers buy certain products, they signal to producers what to make more of. When they stop buying, producers respond by reducing or discontinuing those products. This gives consumers the power to shape production through their choices.'},
          {
            id: 'quiz-2-1-3',
            question: 'A local grocery store decides to offer a discount on fresh fruits and vegetables to encourage healthier eating habits. How are consumers most likely to respond to this incentive?',
            options: [
              'continue buying the same amount of fresh fruits and vegetables',
              'stop buying fresh fruits and vegetables altogether',
              'buy more fresh fruits and vegetables because they are cheaper',
              'buy less fresh fruits and vegetables because they are on discount'],
            correctAnswer: 2,
            explanation: 'According to the Law of Demand, when the price of a good decreases (through a discount), the quantity demanded increases, all else being equal. Consumers are most likely to buy more fresh fruits and vegetables because the lower price makes them more attractive and affordable. This is a fundamental economic principle: lower prices lead to higher quantity demanded.'},
          {
            id: 'quiz-2-1-4',
            question: 'Alexis and Jordan are high school students who want to market their jewelry business to generate more customers. They have a limited marketing budget, but noticed that some established jewelry brands hire social media influencers, while others use flyers and local newspapers. Given their limited budget, which marketing strategy should Alexis and Jordan choose to most effectively influence consumer decision making?',
            options: [
              'focus solely on word-of-mouth by asking their friends and family to spread the word about their business',
              'spend all their marketing money on a famous social media influencer to promote their business',
              'spend their entire budget on creating a professional website with detailed product descriptions and high-quality images',
              'create a mix of online and offline advertisements, such as using social media ads and distributing flyers in their local community'],
            correctAnswer: 3,
            explanation: 'For a business with a limited marketing budget, a diversified approach that combines cost-effective online strategies (like targeted social media ads) with local, accessible offline methods (like distributing flyers in their community) is generally the most effective. This approach maximizes reach within budget constraints. Option A is too limited for growth. Option B would likely be too expensive for a limited budget. Option C could also be costly and might not guarantee reach without additional marketing.'}]} as QuizContent]},
  {
    id: 'lesson-2-2',
    title: 'Cost, revenue, and profit',
    duration: '40 min',
    contentItems: [
      {
        id: 'economics-u2-l2-video-1',
        type: 'video',
        title: 'Cost, revenue, and profit',
        videoIndex: 0} as VideoContent,
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
          'Businesses maximize profit']} as ArticleContent,
      {
        id: 'economics-u2-l2-quiz',
        type: 'quiz',
        title: 'Quiz: Cost, revenue, and profit',
        questions: [
          {
            id: 'quiz-2-2-1',
            question: 'Xiomara runs a fishing gear shop. Every month, she spends $5,000 on things like rent and paying her employees. She also uses up to $3,000 each month for making fishing rods, depending on how many she wants to make. The shop usually makes about $12,000 from sales of fishing gear. What is the total revenue of Xiomara\'s shop?',
            options: [
              '$3,000',
              '$4,000',
              '$5,000',
              '$12,000'],
            correctAnswer: 3,
            explanation: 'Total revenue is the total amount of money received from sales of goods or services. In this case, the shop makes $12,000 from sales of fishing gear, which is the total revenue. The $5,000 spent on rent and employees are costs, and the $3,000 for making fishing rods are also costs. Revenue is separate from costs and represents the money coming in from sales.'},
          {
            id: 'quiz-2-2-2',
            question: 'Maya has been contracted to photograph a community cultural festival for five days. Her daily charge for services is $500. Her total fixed costs are $1,100, and her variable cost is $100. What is Maya\'s profit from the community cultural festival?',
            options: [
              '$1,200',
              '$1,300',
              '$1,400',
              '$2,500'],
            correctAnswer: 1,
            explanation: 'To calculate profit: Total Revenue - Total Costs = Profit. Total Revenue = 5 days × $500 = $2,500. Total Costs = Fixed Costs + Variable Costs = $1,100 + $100 = $1,200. Profit = $2,500 - $1,200 = $1,300.'},
          {
            id: 'quiz-2-2-3',
            question: 'When revenue decreases significantly, while costs remain constant, the profit will likely:',
            options: [
              'increase',
              'decrease',
              'remain the same',
              'become zero'],
            correctAnswer: 1,
            explanation: 'Profit is calculated as Revenue - Costs. If revenue decreases while costs remain constant, the difference (profit) will decrease. For example, if revenue goes from $10,000 to $6,000 and costs stay at $5,000, profit decreases from $5,000 to $1,000.'},
          {
            id: 'quiz-2-2-4',
            question: 'If production costs increase significantly and the selling price and demand remain constant, the supply will likely:',
            options: [
              'increase',
              'decrease',
              'remain the same',
              'become zero'],
            correctAnswer: 1,
            explanation: 'When production costs increase, producers are less willing and able to supply goods at the same price. Since the selling price remains constant, the profit margin decreases, making production less profitable. This causes producers to reduce the quantity they are willing to supply, leading to a decrease in supply.'}]} as QuizContent]},
  {
    id: 'lesson-2-3',
    title: 'Productivity and economic growth',
    duration: '40 min',
    contentItems: [
      {
        id: 'economics-u2-l3-video-1',
        type: 'video',
        title: 'Productivity and economic growth',
        videoIndex: 0} as VideoContent,
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
          'Productivity growth improves standard of living']} as ArticleContent,
      {
        id: 'economics-u2-l3-quiz',
        type: 'quiz',
        title: 'Quiz: Productivity and economic growth',
        questions: [
          {
            id: 'quiz-2-3-1',
            question: 'Amina and her family live in Alexandria, Virginia where there has been a significant investment in technology and infrastructure, leading to increased productivity in local businesses. How is the increase in productivity likely to affect the standards of living for Amina and her neighbors?',
            options: [
              'Their standard of living will decrease as goods will be more expensive.',
              'Their standard of living will increase due to better opportunities in the community.',
              'Their standard of living will not change, as it is not related to productivity.',
              'Their standard of living will decrease because unemployment will go up when new technology is utilized.'],
            correctAnswer: 1,
            explanation: 'Increased productivity leads to economic growth, which typically results in higher wages, more job opportunities, better goods and services, and overall improved living standards. While there may be short-term adjustments, the long-term effect of productivity growth is generally positive for standards of living through increased economic output and opportunities.'},
          {
            id: 'quiz-2-3-2',
            question: 'David and Jasmine own a farm in rural Virginia, growing a variety of fruits and vegetables. To cope with increasing demand and competition, they decided to invest in modern farming equipment that is now allowing them to produce twice as many crops as before without needing additional labor. What is the likely impact of David and Jasmine\'s increase in productivity on their farm\'s costs of production?',
            options: [
              'Production costs at David and Jasmine\'s farm will not change, even with the new equipment.',
              'David and Jasmine will see an increase in production costs due to an increase in productivity.',
              'Total costs of production will permanently increase because of the cost of new equipment.',
              'David and Jasmine will see a decrease in production costs because of the new equipment.'],
            correctAnswer: 3,
            explanation: 'When productivity increases (producing more output with the same or fewer inputs), the cost per unit of output decreases. Even though there may be an initial investment in equipment, the ability to produce twice as many crops without additional labor means lower costs per crop. This reduces the average cost of production, making the farm more efficient and profitable.'},
          {
            id: 'quiz-2-3-3',
            question: 'Which of the following best defines the economic concept of capital goods?',
            options: [
              'goods that are used by consumers to satisfy their needs and wants',
              'goods that are used in the production of other goods and services',
              'goods that are sold at a higher price due to their brand value',
              'goods that are imported from other countries to boost the economy'],
            correctAnswer: 1,
            explanation: 'Capital goods are goods that are used in the production of other goods and services, rather than being consumed directly by consumers. Examples include machinery, tools, equipment, buildings, and vehicles used by businesses. They are one of the factors of production and are essential for increasing productivity and economic growth.'},
          {
            id: 'quiz-2-3-4',
            question: 'In Charlottesville, Virginia, a community center run by entrepreneurs is upgrading staff training, purchasing new equipment, and implementing software to streamline operations. How will the investments in human capital, capital goods, and technology affect the overall productivity of the community center?',
            options: [
              'Productivity will decrease, as more time will need to be spent at the center to implement these investments.',
              'Productivity will decrease, as these investments have high costs.',
              'Productivity will increase because of investments in human capital, capital goods, and technology.',
              'Productivity will not change, as these investments are not related to it.'],
            correctAnswer: 2,
            explanation: 'Investments in human capital (staff training), capital goods (new equipment), and technology (software) all contribute to increased productivity. Better-trained staff work more efficiently, new equipment can produce more output, and technology streamlines operations. While there may be initial costs and adjustment periods, these investments typically lead to long-term productivity gains.'}]} as QuizContent]},
  {
    id: 'lesson-2-4',
    title: 'Business organization',
    duration: '35 min',
    contentItems: [
      {
        id: 'economics-u2-l4-video-1',
        type: 'video',
        title: 'Business organization',
        videoIndex: 0} as VideoContent,
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
          'Limited liability protects personal assets']} as ArticleContent,
      {
        id: 'economics-u2-l4-quiz',
        type: 'quiz',
        title: 'Quiz: Business organization',
        questions: [
          {
            id: 'quiz-2-4-1',
            question: 'A group of three friends are considering starting a gourmet burger restaurant. They all want to participate equally in running the business and making decisions. They agree that each will invest the same amount of money into the business and share the profits equally. Considering their needs and preferences, which form of business organization should they choose?',
            options: [
              'sole proprietorship',
              'partnership',
              'corporation',
              'cooperative'],
            correctAnswer: 1,
            explanation: 'A partnership is the most appropriate choice for this scenario. A partnership allows multiple owners to participate equally in running the business and making decisions, share investments equally, and distribute profits equally among partners. A sole proprietorship has only one owner. A corporation is more complex and typically involves shareholders rather than equal partners. A cooperative is owned and operated by members for their mutual benefit, which doesn\'t match the described scenario.'},
          {
            id: 'quiz-2-4-2',
            question: 'Brianna and Jacobo are considering starting a business together. They are discussing forming a limited liability partnership (LLP). Why might they choose an LLP over a general partnership?',
            options: [
              'They prefer a simple formation process and fewer ongoing reporting requirements.',
              'They prefer to distribute profits based on the size of each partner\'s investment.',
              'They want to enjoy shared decision-making but also want unlimited personal liability for the actions of any partner.',
              'They want to limit their liability to their own actions and investment in the business, while also benefiting from the partnership\'s profit.'],
            correctAnswer: 3,
            explanation: 'A Limited Liability Partnership (LLP) provides partners with limited liability protection, meaning each partner is only liable for their own actions and investment in the business, not for the actions of other partners. This is the key advantage over a general partnership, where partners have unlimited personal liability for all partnership debts and the actions of other partners. LLPs still allow shared decision-making and profit-sharing benefits of partnerships.'},
          {
            id: 'quiz-2-4-3',
            question: 'Producers determine their business organization based on the costs and benefits involved. Which type of business organization best matches the listed costs and benefits? Costs: Shared liability, Potential for conflict, Shared profits. Benefits: Combined skills and resources, Relatively easier access to capital, Shared responsibilities.',
            options: [
              'corporation',
              'partnership',
              'cooperative',
              'sole proprietorship'],
            correctAnswer: 1,
            explanation: 'A partnership best matches these characteristics. Partnerships involve shared liability (partners are jointly liable), potential for conflict (multiple decision-makers), and shared profits. The benefits listed - combined skills and resources, relatively easier access to capital, and shared responsibilities - are all typical of partnerships where multiple owners contribute their expertise, capital, and share in management responsibilities.'}]} as QuizContent]},
  {
    id: 'lesson-2-5',
    title: 'Market structures and competition',
    duration: '40 min',
    contentItems: [
      {
        id: 'economics-u2-l5-video-1',
        type: 'video',
        title: 'Market structures and competition',
        videoIndex: 0} as VideoContent,
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
          'Non-price competition: quality, service, branding']} as ArticleContent,
      {
        id: 'economics-u2-l5-quiz',
        type: 'quiz',
        title: 'Quiz: Market structures and competition',
        questions: [
          {
            id: 'quiz-2-5-1',
            question: 'Select the responses that best complete the passage: "Collusion occurs when sellers [blank 1]. This coordinated behavior reduces competition, leading to [blank 2] prices and fewer choices for consumers."',
            options: [
              'agree to work together; higher',
              'compete independently; lower',
              'set prices individually; stable',
              'ignore market conditions; fluctuating'],
            correctAnswer: 0,
            explanation: 'Collusion occurs when sellers agree to work together, typically to fix prices or limit competition. This coordinated behavior reduces competition in the market, which leads to higher prices for consumers and fewer choices, as firms are not competing to offer better prices or products.'},
          {
            id: 'quiz-2-5-2',
            question: 'The bicycle industry is highly competitive, with a mix of large manufacturers and independent producers. Aaliyah is an independent producer of bicycles, known for her custom designs and high-quality craftsmanship. Which of the following is a correct statement about the effect of competition on Aaliyah?',
            options: [
              'Competition will force Aaliyah to either lower her prices or continue to improve her product.',
              'Competition will force Aaliyah to charge the same prices as other bicycle producers.',
              'Competition will force Aaliyah to reduce the number of custom orders she can take.',
              'Competition will force Aaliyah to reduce her product quality as other firms cut costs to offer lower prices.'],
            correctAnswer: 0,
            explanation: 'In a competitive market, firms must respond to competition to survive. Aaliyah can either compete on price (by lowering prices) or compete on quality/differentiation (by continuing to improve her product). Competition does not force all firms to charge identical prices, as firms can differentiate themselves. Competition also doesn\'t force reduction in orders or quality - firms can maintain quality while competing effectively.'},
          {
            id: 'quiz-2-5-3',
            question: 'From each dropdown, select an option that correctly identifies a specific market structure: "In economics, market structures can be as varied as a/an [blank 1], where a small number of firms have the large majority of market share, or a/an [blank 2], where many firms compete with slightly differentiated products."',
            options: [
              'oligopoly; monopolistic competition',
              'monopoly; perfect competition',
              'perfect competition; oligopoly',
              'monopolistic competition; monopoly'],
            correctAnswer: 0,
            explanation: 'An oligopoly is a market structure where a small number of firms have the large majority of market share. Monopolistic competition is a market structure where many firms compete with slightly differentiated products. These are the correct matches for the descriptions provided.'}]} as QuizContent]}];

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
        videoIndex: 0} as VideoContent,
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
          'Price change = movement; other factors = shift']} as ArticleContent,
      {
        id: 'economics-u3-l1-quiz',
        type: 'quiz',
        title: 'Quiz: Demand',
        questions: [
          {
            id: 'quiz-3-1-1',
            question: 'As a result of an increase in consumer incomes, the demand for Meeps has decreased. Based on this information, what can we definitely say about what type of good a Meep is?',
            options: [
              'It has many substitutes.',
              'It is a substitute good.',
              'It is a complement good.',
              'It is a normal good.',
              'It is an inferior good.'],
            correctAnswer: 4,
            explanation: 'An inferior good is a type of good for which demand decreases when consumer income increases. This is the opposite of a normal good, where demand increases with income. Since the demand for Meeps decreased when consumer incomes increased, Meeps must be an inferior good. Examples of inferior goods include generic brands, used goods, or lower-quality alternatives that people buy less of as their income rises.'},
          {
            id: 'quiz-3-1-2',
            question: 'Which of the following correctly describes a change in quantity demanded and a change in demand?',
            options: [
              'A change in quantity demanded is a response to a price change and a change in demand is a response to a non-price change',
              'A change in demand and a change in quantity demanded both happen in response to price changes',
              'Both describe a movement along a single demand curve',
              'The two terms can be used interchangeably',
              'A change in quantity demanded occurs when price increases and a change in demand occur when a price decreases'],
            correctAnswer: 0,
            explanation: 'A change in quantity demanded refers to movement along the demand curve caused by a change in the price of the good itself. A change in demand refers to a shift of the entire demand curve caused by non-price factors such as income, tastes, prices of related goods, expectations, or number of buyers. These are distinct concepts and cannot be used interchangeably.'}]} as QuizContent]},
  {
    id: 'lesson-3-2',
    title: 'Supply',
    duration: '35 min',
    contentItems: [
      {
        id: 'economics-u3-l2-video-1',
        type: 'video',
        title: 'Supply',
        videoIndex: 0} as VideoContent,
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
          'Price change = movement; other factors = shift']} as ArticleContent,
      {
        id: 'economics-u3-l2-quiz',
        type: 'quiz',
        title: 'Quiz: Supply',
        questions: [
          {
            id: 'quiz-3-2-1',
            question: 'Assume that basketballs and volleyballs use identical resources to produce and can be made with the same workers and machinery. How would an increase in the price of basketballs affect the production of basketballs and volleyballs?',
            options: [
              'Supply of volleyballs will increase',
              'Quantity supplied of basketballs will not be affected.',
              'Supply of volleyballs will decrease',
              'Quantity supplied of volleyballs will increase',
              'Quantity supplied of basketballs will decrease'],
            correctAnswer: 2,
            explanation: 'When basketballs and volleyballs use identical resources and can be made with the same workers and machinery, they are substitute goods in production. When the price of basketballs increases, producers will shift resources from producing volleyballs to producing basketballs (which are now more profitable). This causes the supply of volleyballs to decrease (the supply curve shifts left) as resources are reallocated. The quantity supplied of basketballs will increase (movement along the supply curve), not decrease.'},
          {
            id: 'quiz-3-2-2',
            question: 'According to the law of supply, what happens when the price of a good increases?',
            options: [
              'The supply curve shifts to the right.',
              'The quantity supplied increases.',
              'The supply curve shifts to the left.',
              'People are willing to buy what is supplied.',
              'The supply curve flattens out.'],
            correctAnswer: 1,
            explanation: 'The law of supply states that, all else being equal, as the price of a good increases, the quantity supplied increases. This is represented by a movement along the supply curve (upward and to the right), not a shift of the curve itself. A shift of the supply curve would be caused by non-price factors such as technology, input prices, or number of sellers.'}]} as QuizContent]},
  {
    id: 'lesson-3-3',
    title: 'Elasticity',
    duration: '45 min',
    contentItems: [
      {
        id: 'economics-u3-l3-video-1',
        type: 'video',
        title: 'Elasticity',
        videoIndex: 0} as VideoContent,
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
          'Supply elasticity: time, inputs, storage, flexibility']} as ArticleContent,
      {
        id: 'economics-u3-l3-quiz',
        type: 'quiz',
        title: 'Quiz: Elasticity',
        questions: [
          {
            id: 'quiz-3-3-1',
            question: 'Ethan runs a custom sneaker business. Recently, the price of custom sneakers increased from $100 to $120. In response, Ethan increased his supply from 200 to 260 pairs per month. The coefficient of elasticity of supply for Ethan\'s custom sneakers is calculated to be 1.5. What does the elasticity coefficient of 1.5 indicate about the supply of Ethan\'s custom sneakers?',
            options: [
              'The supply is elastic.',
              'The supply is inelastic.',
              'The supply is perfectly elastic.'],
            correctAnswer: 0,
            explanation: 'An elasticity coefficient greater than 1 indicates elastic supply. This means that the percentage change in quantity supplied is greater than the percentage change in price. With a coefficient of 1.5, Ethan\'s supply is elastic, meaning he can respond relatively easily to price changes by adjusting his production.'},
          {
            id: 'quiz-3-3-2',
            question: 'The elasticity of demand helps us understand how adjustments in price will affect the demand and consumption of a particular good or service. Select the options that correctly complete the statements: "The demand for a pack of gum is most likely to be [blank 1] meaning that consumers will buy [blank 2] if the price increases because a pack of gum represents [blank 3]. The demand for a new car is more likely to be [blank 4] meaning that consumers will buy [blank 5] if the price increases because a new car represents [blank 6]."',
            options: [
              'inelastic; less; a small portion of income; elastic; less; a large portion of income',
              'elastic; more; a small portion of income; inelastic; more; a large portion of income',
              'inelastic; more; a large portion of income; elastic; less; a small portion of income',
              'elastic; less; a large portion of income; inelastic; less; a small portion of income'],
            correctAnswer: 0,
            explanation: 'A pack of gum is an inexpensive good that represents a small portion of income, so its demand is inelastic - consumers will buy less if price increases, but the change is relatively small. A new car is an expensive good that represents a large portion of income, so its demand is elastic - consumers will buy significantly less if price increases because it\'s a major purchase decision.'},
          {
            id: 'quiz-3-3-3',
            question: 'Jamal owns a lawn care business in Virginia. He wants to understand what factors influence the elasticity of supply for his services so he can better plan for changes in demand. Which of the following factors is most likely to influence the elasticity of supply for Jamal\'s lawn care services?',
            options: [
              'The popularity of different types of lawn care equipment among customers.',
              'The number of competitors in the lawn care industry.',
              'The average income of households in the area.',
              'The availability of skilled labor to provide lawn care services.'],
            correctAnswer: 3,
            explanation: 'The elasticity of supply measures how easily producers can change the quantity supplied in response to price changes. For a service business like lawn care, the availability of inputs (in this case, skilled labor) is a key factor. If skilled labor is readily available, Jamal can easily increase supply when prices rise. If skilled labor is scarce, it\'s harder to expand supply, making supply more inelastic. The popularity of equipment, number of competitors, and average income affect demand, not supply elasticity.'},
          {
            id: 'quiz-3-3-4',
            question: 'Acme Corporation, a company based in Roanoke, is looking to see if the demand for their product is elastic. Which of the following coefficients of elasticity indicates that the demand for a product is elastic?',
            options: [
              '1.0',
              '0.8',
              '1.5'],
            correctAnswer: 2,
            explanation: 'Elastic demand occurs when the elasticity coefficient is greater than 1. This means the percentage change in quantity demanded is greater than the percentage change in price. A coefficient of 1.5 indicates elastic demand. A coefficient of 1.0 indicates unit elastic demand, and 0.8 indicates inelastic demand (less than 1).'}]} as QuizContent]},
  {
    id: 'lesson-3-4',
    title: 'Equilibrium',
    duration: '40 min',
    contentItems: [
      {
        id: 'economics-u3-l4-video-1',
        type: 'video',
        title: 'Equilibrium',
        videoIndex: 0} as VideoContent,
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
          'Shifts change equilibrium']} as ArticleContent,
      {
        id: 'economics-u3-l4-quiz',
        type: 'quiz',
        title: 'Quiz: Equilibrium',
        questions: [
          {
            id: 'quiz-3-4-1',
            question: 'Market equilibrium ensures efficient allocation of resources and balance in market transactions. Which of the following best describes a market in equilibrium?',
            options: [
              'At the current quantity, buyers are willing to pay more than sellers are charging.',
              'At the current price, quantity supplied equals quantity demanded.',
              'At the current price, quantity supplied is less than quantity demanded.',
              'At the current price, quantity supplied is greater than quantity demanded.'],
            correctAnswer: 1,
            explanation: 'Market equilibrium occurs when quantity supplied equals quantity demanded at the current price. At this point, there is no shortage or surplus, and the market clears efficiently. When quantity supplied equals quantity demanded, the market is in balance, and there is no pressure for prices to change.'},
          {
            id: 'quiz-3-4-2',
            question: 'The demand (QD) and supply (QS) schedules for lawn mowing are given below: Price $8 - QD: 6, QS: 0; Price $10 - QD: 5, QS: 2; Price $12 - QD: 4, QS: 4; Price $14 - QD: 3, QS: 6; Price $16 - QD: 2, QS: 8; Price $18 - QD: 2, QS: 10; Price $20 - QD: 0, QS: 12. Which price would cause a surplus in this market?',
            options: [
              'a price of $12',
              'any price below $12.',
              'any price above $12',
              'if the good was free'],
            correctAnswer: 2,
            explanation: 'A surplus occurs when quantity supplied is greater than quantity demanded (QS > QD). At the equilibrium price of $12, QD = QS = 4, so there is no surplus. At prices above $12 (such as $14, $16, $18, or $20), QS > QD, creating a surplus. For example, at $14, QS = 6 and QD = 3, resulting in a surplus of 3 units.'}]} as QuizContent]},
  {
    id: 'lesson-3-5',
    title: 'Price controls',
    duration: '35 min',
    contentItems: [
      {
        id: 'economics-u3-l5-video-1',
        type: 'video',
        title: 'Price controls',
        videoIndex: 0} as VideoContent,
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
          'Reduce efficiency']} as ArticleContent,
      {
        id: 'economics-u3-l5-quiz',
        type: 'quiz',
        title: 'Quiz: Price controls',
        questions: [
          {
            id: 'quiz-3-5-1',
            question: 'In the State of Virginia, government leaders are looking to implement a state minimum wage as a form of price floor. What is the primary purpose of implementing a minimum wage in this scenario?',
            options: [
              'to ensure workers receive a wage that meets basic living standards',
              'to increase overall productivity in the workplace',
              'to prevent inflation by controlling wage levels',
              'to guarantee full employment across the economy'],
            correctAnswer: 0,
            explanation: 'The primary purpose of implementing a minimum wage is to ensure workers receive a wage that meets basic living standards. A minimum wage is a price floor that sets the lowest legal wage employers can pay, intended to protect workers from being paid wages that are too low to meet their basic needs. While minimum wages may have other effects, the primary goal is to establish a wage floor that supports basic living standards.'},
          {
            id: 'quiz-3-5-2',
            question: 'Governments can use price floors to influence prices. Which of the following best describes a price floor?',
            options: [
              'a government policy that sets the price of a good or service at the lowest possible market level',
              'a government limit on the maximum quantity of a product that can be sold in the market',
              'a government-imposed minimum price that must be paid for a good or service',
              'a government-imposed limit on how high the price of a product or service can go'],
            correctAnswer: 2,
            explanation: 'A price floor is a government-imposed minimum price that must be paid for a good or service. It sets a legal minimum price below which the good or service cannot be sold. Price floors are typically set above the equilibrium price to ensure producers receive a certain minimum price. Common examples include minimum wage laws and agricultural price supports.'},
          {
            id: 'quiz-3-5-3',
            question: 'A government sets a price floor on wages, ensuring that workers cannot be paid less than a certain hourly rate. What is the most likely outcome in the labor market?',
            options: [
              'The market will adjust, and unemployment will decrease as wages rise.',
              'Employers will hire more workers because of the increased wage.',
              'All workers will find jobs because employers must pay higher wages.',
              'A surplus of labor (unemployment) will develop as the supply of workers exceeds the demand.'],
            correctAnswer: 3,
            explanation: 'When a price floor is set above the equilibrium wage, it creates a surplus of labor (unemployment). At the higher wage, more workers are willing to work (supply increases), but employers are willing to hire fewer workers (demand decreases) because labor is more expensive. This results in a surplus where the quantity of labor supplied exceeds the quantity demanded, leading to unemployment.'}]} as QuizContent]}];

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
        videoIndex: 0} as VideoContent,
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
          'Public goods: non-rival and non-excludable']} as ArticleContent,
      {
        id: 'economics-u4-l1-quiz',
        type: 'quiz',
        title: 'Quiz: Public vs private',
        questions: [
          {
            id: 'quiz-4-1-1',
            question: 'A car factory in Rivertown has been polluting the local river, leading to a decrease in the fish population and negatively impacting the fishing industry. This has caused financial difficulty for fishermen and their families. Which of the following economic concepts is illustrated in this example?',
            options: [
              'market failure',
              'regulation',
              'externality',
              'public good'],
            correctAnswer: 2,
            explanation: 'This scenario illustrates an externality, specifically a negative externality. An externality occurs when the production or consumption of a good or service affects third parties who are not directly involved in the transaction. The factory\'s pollution creates costs (decreased fish population, financial hardship for fishermen) that are not reflected in the market price of cars. This is a negative externality because it imposes costs on others without compensation.'},
          {
            id: 'quiz-4-1-2',
            question: 'In Virginia, it is unlawful to have more than the daily creel of fish in possession while fishing in public waters. What\'s a primary reason that such a rule would be put into place by the government?',
            options: [
              'to increase the government\'s control over the fishing industry',
              'to ensure equal opportunity for all fishermen',
              'to protect and preserve the fish population for future sustainability',
              'to encourage sport fishing rather than commercial fishing'],
            correctAnswer: 2,
            explanation: 'The primary reason for limiting the daily creel (catch limit) is to protect and preserve the fish population for future sustainability. This is a form of resource management that prevents overfishing and ensures that fish populations can replenish themselves, maintaining the resource for future generations. This addresses the "tragedy of the commons" problem where unregulated access to a shared resource can lead to its depletion.'},
          {
            id: 'quiz-4-1-3',
            question: 'The government of Greentopia is concerned about the rapid depletion of its forests due to excessive logging by private companies. How can the government most effectively regulate the market and conserve forest resources?',
            options: [
              'encourage firms to switch to other industries',
              'enforce a total ban on logging activities',
              'implement regulations limiting timber harvest and requiring reforestation',
              'drive private logging firms out of business'],
            correctAnswer: 2,
            explanation: 'The most effective approach is to implement regulations limiting timber harvest and requiring reforestation. This balances economic activity with conservation by allowing sustainable logging while ensuring forests are replenished. A total ban would eliminate the industry entirely, and simply encouraging firms to switch or driving them out of business doesn\'t address the underlying resource management issue. Regulations that limit harvest and require reforestation directly address the conservation goal while maintaining some economic activity.'},
          {
            id: 'quiz-4-1-4',
            question: 'The small town of Gretna, located off Highway 29, has a tire shop, two hotels, and three family-owned restaurants. Which of these is a public good?',
            options: [
              'hotels',
              'family-owned restaurants',
              'Highway 29',
              'tire shop'],
            correctAnswer: 2,
            explanation: 'Highway 29 is a public good. Public goods have two key characteristics: non-excludability (people cannot be prevented from using them) and non-rivalry (one person\'s use doesn\'t reduce availability for others). Highways are typically provided by the government because they are non-excludable (everyone can use them) and largely non-rivalrous (one more car doesn\'t significantly reduce the road\'s availability to others, though congestion can occur). Hotels, restaurants, and tire shops are private goods - they are excludable and rivalrous.'}]} as QuizContent]},
  {
    id: 'lesson-4-2',
    title: 'Property rights',
    duration: '35 min',
    contentItems: [
      {
        id: 'economics-u4-l2-video-1',
        type: 'video',
        title: 'Property rights',
        videoIndex: 0} as VideoContent,
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
          'Enables markets and investment']} as ArticleContent,
      {
        id: 'economics-u4-l2-quiz',
        type: 'quiz',
        title: 'Quiz 1: Property rights',
        questions: [
          {
            id: 'quiz-4-2-1',
            question: 'In economics, which of the following best describes the purpose of a patent?',
            options: [
              'to prevent the unauthorized use of a company\'s branding',
              'to safeguard original works of authorship like books and music',
              'to grant exclusive rights to an inventor for a new and useful invention',
              'to protect the unique name and logo of a product'],
            correctAnswer: 2,
            explanation: 'A patent grants exclusive rights to an inventor for a new and useful invention. Patents protect inventions and innovations, giving inventors the exclusive right to make, use, and sell their invention for a limited period (typically 20 years). This encourages innovation by allowing inventors to profit from their creations. Branding is protected by trademarks, and original works of authorship are protected by copyrights.'},
          {
            id: 'quiz-4-2-2',
            question: 'Peter develops a unique gardening tool and signs a production contract with a manufacturer. However, a local store starts selling a strikingly similar tool, and the manufacturer denies responsibility. Although the government is not directly involved in business contracts and market occurrences, it offers a legal structure to handle potential issues. What is the government\'s primary role in this situation?',
            options: [
              'intellectual property laws and contract enforcement',
              'guidelines for tool safety standards',
              'business licensing for tool manufacturers',
              'trade regulations for tools'],
            correctAnswer: 0,
            explanation: 'The government\'s primary role in this situation is providing intellectual property laws and contract enforcement. Peter needs protection for his unique invention (intellectual property) and enforcement of his production contract. Intellectual property laws (patents) protect his unique tool design, while contract enforcement ensures that agreements between parties are legally binding and can be enforced through the legal system.'},
          {
            id: 'quiz-4-2-3',
            question: 'A construction company agrees to build a new school for a city. After completing the project, the city refuses to pay the agreed amount. The construction company takes the case to court, and the government orders the city to pay the construction company. Which of the following actions is the government performing in this scenario?',
            options: [
              'providing public goods',
              'protecting property rights',
              'enforcing contracts',
              'regulating public goods'],
            correctAnswer: 2,
            explanation: 'The government is enforcing contracts. When the government orders the city to pay the construction company, it is using the legal system to enforce the terms of the contract that was agreed upon. Contract enforcement is a fundamental role of government that ensures parties fulfill their obligations and provides a legal framework for resolving disputes.'},
          {
            id: 'quiz-4-2-4',
            question: 'A local artist creates a unique logo for a small business. The government grants a trademark to the business to ensure no other business can use the same logo. Which of the following actions is the government performing in this scenario?',
            options: [
              'providing public goods',
              'regulating public goods',
              'enforcing contracts',
              'protecting property rights'],
            correctAnswer: 3,
            explanation: 'The government is protecting property rights. Trademarks are a form of intellectual property that protect distinctive signs, logos, names, or symbols used to identify goods or services. By granting a trademark, the government is protecting the business\'s property right to its unique logo, preventing others from using it without permission. This encourages creativity and protects businesses\' investments in their branding.'}]} as QuizContent]},
  {
    id: 'lesson-4-3',
    title: 'Redistribution of wealth',
    duration: '30 min',
    contentItems: [
      {
        id: 'economics-u4-l3-video-1',
        type: 'video',
        title: 'Redistribution of wealth',
        videoIndex: 0} as VideoContent,
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
          'Social safety net: help people in need']} as ArticleContent,
      {
        id: 'economics-u4-l3-quiz',
        type: 'quiz',
        title: 'Quiz: Redistribution of wealth',
        questions: [
          {
            id: 'quiz-4-3-1',
            question: 'In the country of Fairland, the government noticed that economic opportunities were unevenly distributed. Many rural areas were lacking basic infrastructure, quality education, and access to healthcare, making it difficult for residents to improve their economic situations. To address these issues, the government introduced several initiatives, including investing in rural infrastructure, increasing funding for public schools, and expanding access to healthcare services. Why did the government institute policies to redistribute wealth in this scenario?',
            options: [
              'to ensure that wealthy individuals have more influence in the economy',
              'to promote economic stability by stimulating demand and reducing unemployment',
              'to reduce the burden on the government to provide public services',
              'to discourage people from working hard and earning more'],
            correctAnswer: 1,
            explanation: 'The government instituted policies to redistribute wealth to promote economic stability by stimulating demand and reducing unemployment. By investing in infrastructure, education, and healthcare in underserved areas, the government creates economic opportunities, increases demand for goods and services, and helps reduce unemployment. This promotes overall economic stability and growth.'},
          {
            id: 'quiz-4-3-2',
            question: 'In the country of Wealthland, the government introduced a policy to significantly increase taxes on high-income earners and large corporations. The additional revenue is used to provide generous welfare benefits and subsidies for low-income families. What could be an unintended consequence of this policy?',
            options: [
              'more investment from foreign companies',
              'more local goods being made',
              'fewer jobs as businesses move to countries with lower taxes',
              'better environment for plants and animals'],
            correctAnswer: 2,
            explanation: 'An unintended consequence of significantly increasing taxes on high-income earners and large corporations could be fewer jobs as businesses move to countries with lower taxes. High taxes can create incentives for businesses to relocate to jurisdictions with more favorable tax environments, leading to job losses and reduced economic activity in the original country. This is a common concern with aggressive wealth redistribution policies.'},
          {
            id: 'quiz-4-3-3',
            question: 'In a market economy, the government has the crucial job of redistributing wealth among the population. Which of the following best describes one method of redistributing wealth?',
            options: [
              'investing in public infrastructure projects',
              'providing tax incentives to businesses',
              'making direct transfer payments to individuals',
              'offering government contracts to private companies'],
            correctAnswer: 2,
            explanation: 'Making direct transfer payments to individuals is a direct method of redistributing wealth. This includes programs like welfare benefits, unemployment insurance, social security, and other cash transfers that move money from taxpayers (typically higher-income) to recipients (typically lower-income). While infrastructure investment and government contracts can indirectly affect wealth distribution, direct transfer payments are the most explicit method of wealth redistribution.'},
          {
            id: 'quiz-4-3-4',
            question: 'The government observed a significant economic downturn in the country of Stabiland. Many businesses were closing, unemployment rates were rising, and consumer spending had drastically decreased. To address these issues, the government implemented several policies, including increasing unemployment benefits, providing direct financial assistance to low-income families, and investing in public infrastructure projects. Why did the government institute policies to redistribute wealth in this scenario?',
            options: [
              'to reduce the burden on the government to provide public services',
              'to discourage people from working hard and earning more',
              'to ensure that wealthy individuals have more influence in the economy',
              'to promote economic stability by stimulating demand and reducing unemployment'],
            correctAnswer: 3,
            explanation: 'The government instituted policies to redistribute wealth to promote economic stability by stimulating demand and reducing unemployment. During an economic downturn, wealth redistribution through unemployment benefits, financial assistance, and infrastructure investment helps maintain consumer spending (stimulating demand), provides income to those who lost jobs, and creates employment opportunities. This helps stabilize the economy and reduce the severity of the downturn.'}]} as QuizContent]}];

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
        videoIndex: 0} as VideoContent,
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
          'Natural unemployment: frictional + structural']} as ArticleContent,
      {
        id: 'economics-u5-l1-quiz',
        type: 'quiz',
        title: 'Quiz: Macroeconomic indicators',
        questions: [
          {
            id: 'quiz-5-1-1',
            question: 'The government analyzes economic indicators, particularly Gross Domestic Product (GDP), to assess economic health and inform policy decisions. Which of the following best explains why GDP is an important economic indicator?',
            options: [
              'GDP helps measure the level of income inequality among citizens.',
              'GDP measures the unemployment rate and job growth.',
              'GDP shows the government\'s budget and spending levels.',
              'GDP indicates the total economic output and growth of the state\'s economy'],
            correctAnswer: 3,
            explanation: 'GDP (Gross Domestic Product) is an important economic indicator because it measures the total economic output and growth of an economy. GDP represents the total value of all goods and services produced within a country\'s borders in a given time period. It provides a comprehensive measure of economic activity and is used to assess economic health, compare economic performance over time, and inform policy decisions.'},
          {
            id: 'quiz-5-1-2',
            question: 'The official unemployment rate can understate the actual unemployment situation in an economy. What explains this inconsistency?',
            options: [
              'Unemployed workers looking for work are not in the labor force.',
              'Part-time workers are not counted as employed.',
              'Discouraged workers are not in the labor force.',
              'Noncitizens are not counted in the labor force.'],
            correctAnswer: 2,
            explanation: 'The official unemployment rate can understate actual unemployment because discouraged workers are not in the labor force. Discouraged workers are people who want to work but have given up looking for jobs because they believe no jobs are available. Since they are not actively seeking employment, they are not counted as unemployed or in the labor force, which makes the official unemployment rate appear lower than the actual unemployment situation.'},
          {
            id: 'quiz-5-1-3',
            question: 'Hercules lost his job as a tailor after his company purchased robotic sewing machines to replace him. Now he cannot find a job because nobody wants to hire tailors. Which of the following best describes Hercules\' employment situation?',
            options: [
              'structurally unemployed',
              'cyclically unemployed',
              'frictionally unemployed',
              'not in the labor force'],
            correctAnswer: 0,
            explanation: 'Hercules is structurally unemployed. Structural unemployment occurs when workers lose their jobs due to fundamental changes in the economy, such as technological advances, changes in consumer preferences, or shifts in the economy that make certain skills obsolete. In this case, technological change (robotic sewing machines) has made Hercules\' tailoring skills no longer in demand, which is a characteristic of structural unemployment.'},
          {
            id: 'quiz-5-1-4',
            question: 'The Consumer Price Index (CPI) is calculated by comparing the current prices of a fixed basket of goods and services to the prices of the same basket in a base year. Which of the following best describes the purpose of this calculation?',
            options: [
              'to measure changes in the cost of living over time',
              'to assess the level of government spending',
              'to calculate the total production output of an economy',
              'to determine the average income of consumers'],
            correctAnswer: 0,
            explanation: 'The purpose of calculating the Consumer Price Index (CPI) is to measure changes in the cost of living over time. CPI tracks the price changes of a fixed basket of goods and services that consumers typically purchase, allowing economists and policymakers to measure inflation and understand how the purchasing power of money changes over time. This helps adjust wages, benefits, and other economic indicators for inflation.'}]} as QuizContent]},
  {
    id: 'lesson-5-2',
    title: 'The macroeconomy and economic challenges',
    duration: '40 min',
    contentItems: [
      {
        id: 'economics-u5-l2-video-1',
        type: 'video',
        title: 'The macroeconomy and economic challenges',
        videoIndex: 0} as VideoContent,
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
          'Shifts affect income, employment, prices']} as ArticleContent,
      {
        id: 'economics-u5-l2-quiz',
        type: 'quiz',
        title: 'Quiz: The macroeconomy and economic challenges',
        questions: [
          {
            id: 'quiz-5-2-1',
            question: 'A farming cooperative has developed a new technique that allows them to produce a much larger harvest of apples than in previous years. As a result, the market is now flooded with apples, and the price per apple has dropped significantly. How is the increased supply of apples most likely to affect the income of workers at the farming cooperative?',
            options: [
              'Increased supply will lead to higher prices, increasing the cooperative\'s revenue, which could result in higher wages for workers.',
              'Increased supply will not affect prices or wages, keeping them the same.',
              'Increased supply will lead to a shortage of apples, which could increase wages for workers.',
              'Increased supply will lead to lower prices, reducing the cooperative\'s revenue, which could result in lower wages for workers.'],
            correctAnswer: 3,
            explanation: 'When supply increases significantly, prices typically fall (as stated in the scenario). Lower prices reduce the cooperative\'s revenue, which means less money available to pay workers. This could result in lower wages for workers as the cooperative\'s profitability decreases. This demonstrates how market forces (supply and demand) affect both prices and ultimately workers\' incomes.'},
          {
            id: 'quiz-5-2-2',
            question: 'As more people transition to working remotely, the demand for office space has significantly decreased. In response, commercial real estate companies are converting office buildings into residential apartments, leading to a surge in construction and renovation projects. How is the decreased demand for office space most likely to affect the wages of workers in the construction and renovation sector?',
            options: [
              'Decreased demand for office space will not affect wages, as the number of construction projects will remain steady.',
              'Decreased demand for office space may raise construction wages as more workers will be needed to convert offices into residential apartments.',
              'Decreased demand for office space will cause construction companies to reduce their workforce, lowering wages.',
              'Decreased demand for office space will likely decrease wages because fewer construction workers will be needed.'],
            correctAnswer: 1,
            explanation: 'Although demand for office space decreased, the conversion of office buildings into residential apartments creates new demand for construction and renovation services. This surge in construction projects increases the demand for construction workers. When demand for labor increases, companies compete for workers, which typically leads to higher wages. The key is that the decreased demand in one sector (office space) is offset by increased demand in another sector (residential construction).'},
          {
            id: 'quiz-5-2-3',
            question: 'The city of Alexandria experienced a surge in demand for both residential construction and commercial building projects. As a result, construction companies across the city are rapidly expanding their operations to meet the growing needs of both markets. How is the increased demand in multiple markets most likely to affect the wages of construction workers in the city?',
            options: [
              'Increased demand in multiple markets will not affect wages, as the number of construction projects will remain steady.',
              'Increased demand in multiple markets will cause construction companies to reduce their workforce, lowering wages.',
              'Increased demand in multiple markets will likely decrease wages because fewer construction workers will be needed.',
              'Increased demand in multiple markets could lead to higher wages because construction companies will compete for a limited number of skilled workers.'],
            correctAnswer: 3,
            explanation: 'When demand for construction workers increases across multiple markets, construction companies need to hire more workers to meet the growing demand. However, there is a limited supply of skilled construction workers. This creates competition among companies for available workers, which drives up wages. This is a classic example of how increased demand for labor leads to higher wages when the supply of skilled workers is limited.'},
          {
            id: 'quiz-5-2-4',
            question: 'A car manufacturing company has experienced a sudden decrease in the supply of a critical component needed to build its vehicles. As a result, the company has had to decrease its supply of cars. How will the decrease in supply most likely affect the car manufacturing company\'s workers and their income?',
            options: [
              'increase in training, leading to higher wages',
              'loss of overtime, resulting in lower wages',
              'longer work shifts, with no change in wages'],
            correctAnswer: 1,
            explanation: 'When a company decreases its supply of cars due to a shortage of critical components, it means less production is happening. With less production, there is less work for employees, which typically results in reduced hours and loss of overtime opportunities. This leads to lower total income for workers, even if their base wage rate doesn\'t change. The company cannot produce as many cars, so workers work fewer hours and earn less overall.'}]} as QuizContent]},
  {
    id: 'lesson-5-3',
    title: 'Business cycles',
    duration: '35 min',
    contentItems: [
      {
        id: 'economics-u5-l3-video-1',
        type: 'video',
        title: 'Business cycles',
        videoIndex: 0} as VideoContent,
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
          'Cycles caused by AD/AS changes, confidence, shocks']} as ArticleContent,
      {
        id: 'economics-u5-l3-quiz',
        type: 'quiz',
        title: 'Quiz: Business cycles',
        questions: [
          {
            id: 'quiz-5-3-1',
            question: 'Maya notices that the cost of groceries and gas has steadily increased over the past few months. Her paycheck hasn\'t changed, so she finds it harder to cover her usual expenses. What is the most likely cause of the rising costs Maya is experiencing?',
            options: [
              'The government has lowered taxes.',
              'Consumer demand for goods and services has decreased.',
              'The economy is growing too quickly, leading to inflation.',
              'Businesses are lowering their prices.'],
            correctAnswer: 2,
            explanation: 'The most likely cause of rising costs is inflation, which occurs when the economy is growing too quickly. Inflation is a general increase in prices over time, reducing the purchasing power of money. When prices for groceries and gas increase while Maya\'s paycheck stays the same, her real income decreases, making it harder to cover expenses. This is a classic sign of inflation affecting consumers\' cost of living.'},
          {
            id: 'quiz-5-3-2',
            question: 'Fatima owns a travel agency that has been successful for several years. Recently, she has seen a sharp decline in bookings for international trips, despite offering discounts and promotions. What is the most likely reason for the decline in bookings at Fatima\'s travel agency?',
            options: [
              'Interest rates have decreased, lowering the cost of borrowing.',
              'Inflation has risen sharply, making travel more affordable.',
              'Political instability in popular destinations has reduced interest in travel.',
              'Consumer confidence has increased, improving economic conditions.'],
            correctAnswer: 2,
            explanation: 'Political instability in popular destinations is the most likely reason for the decline in international travel bookings. When destinations become unsafe or unstable due to political unrest, conflicts, or security concerns, travelers avoid those areas, leading to decreased demand for travel services. Even discounts and promotions cannot overcome safety concerns, which is why bookings decline despite marketing efforts.'},
          {
            id: 'quiz-5-3-3',
            question: 'Jasmine recently graduated with a degree in graphic design. Despite her qualifications, she struggles to find a full-time job in her field. She has noticed that other people in her field are also having difficulty finding work, even though they\'re searching just as hard as she is. What is the most likely cause of Jasmine\'s unemployment?',
            options: [
              'Jasmine is underqualified for available jobs.',
              'Businesses are overutilizing labor resources.',
              'The economy is slowing down, leading to fewer job openings.',
              'Jasmine is not applying for enough jobs.'],
            correctAnswer: 2,
            explanation: 'The most likely cause is that the economy is slowing down, leading to fewer job openings. When multiple qualified people in the same field are struggling to find work despite active searching, it indicates a broader economic issue rather than individual problems. During economic slowdowns or recessions, businesses reduce hiring, freeze positions, or lay off workers, creating fewer job opportunities across industries, including graphic design.'}]} as QuizContent]}];

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
        videoIndex: 0} as VideoContent,
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
          'Fiat more flexible but requires trust']} as ArticleContent,
      {
        id: 'economics-u6-l1-quiz',
        type: 'quiz',
        title: 'Quiz: Money',
        questions: [
          {
            id: 'quiz-6-1-1',
            question: 'Aisha wants to buy a new laptop. She goes to an electronics store and pays $800 in cash to purchase the laptop. Which function of money does Aisha\'s cash payment best represent?',
            options: [
              'measure of wealth',
              'store of value',
              'medium of exchange',
              'unit of value'],
            correctAnswer: 2,
            explanation: 'Aisha\'s cash payment best represents the medium of exchange function of money. Money serves as a medium of exchange when it is used to facilitate transactions, allowing people to buy goods and services without needing to barter. In this case, Aisha uses cash (money) to directly purchase the laptop, demonstrating how money acts as an intermediary in transactions.'},
          {
            id: 'quiz-6-1-2',
            question: 'Zara checks the balance of her digital wallet, which she uses to pay for groceries. In an economic context, the balance in her digital wallet is best classified as:',
            options: [
              'Currency',
              'Money'],
            correctAnswer: 1,
            explanation: 'The balance in Zara\'s digital wallet is best classified as money. While currency refers specifically to physical forms of money like banknotes and coins, money is a broader concept that includes anything generally accepted as a medium of exchange, a unit of account, and a store of value. A digital wallet balance, representing funds in a bank account or electronic payment system, fulfills these functions and is therefore considered money, not physical currency.'},
          {
            id: 'quiz-6-1-3',
            question: 'In the past, people would carry paper notes that could be exchanged at a bank for a specific amount of gold. The paper itself wasn\'t valuable, but it could be traded for a certain amount of gold held by the bank. Which type of money does the use of these paper notes best illustrate?',
            options: [
              'barter system',
              'representative money',
              'fiat money',
              'commodity money'],
            correctAnswer: 1,
            explanation: 'These paper notes best illustrate representative money. Representative money is a type of money that has no intrinsic value itself but represents a claim on a commodity (like gold or silver) held by a bank or government. The paper notes described can be exchanged for a specific amount of gold, making them representative of the actual commodity value stored elsewhere. This differs from fiat money (which has no backing) and commodity money (where the money itself has intrinsic value).'},
          {
            id: 'quiz-6-1-4',
            question: 'During a visit to another country, Omar realizes he cannot use his local currency to make purchases, so he exchanges it for the local money. Which characteristic of money does this scenario best illustrate?',
            options: [
              'Acceptability',
              'Uniformity',
              'Scarcity',
              'Durability'],
            correctAnswer: 0,
            explanation: 'This scenario best illustrates the acceptability characteristic of money. Money must be generally accepted as a medium of exchange within a specific economic system or region. If a currency is not accepted in a particular location, it loses its function as money in that context and needs to be converted into a local, accepted form. This demonstrates that acceptability is a crucial requirement for money to function effectively.'},
          {
            id: 'quiz-6-1-5',
            question: 'Leila notices that every $10 bill she has, whether new or old, looks and feels the same. Which characteristic of money does this scenario best illustrate?',
            options: [
              'Acceptability',
              'Uniformity',
              'Scarcity',
              'Durability'],
            correctAnswer: 1,
            explanation: 'This scenario best illustrates the uniformity (or standardization) characteristic of money. For money to function effectively, all units of the same denomination must be identical in appearance, size, and value. This ensures that people can easily recognize and trust its value without needing to inspect each individual unit. Uniformity helps maintain confidence in the monetary system and facilitates transactions.'},
          {
            id: 'quiz-6-1-6',
            question: 'Jasper thinks he has a great idea to use seashells as money at his beach shop, but he realizes it wouldn\'t work well because anyone could easily collect them from the shore. Which characteristic of money does this scenario best illustrate?',
            options: [
              'Acceptability',
              'Uniformity',
              'Scarcity',
              'Durability'],
            correctAnswer: 2,
            explanation: 'This scenario best illustrates the scarcity characteristic of money. For something to serve as money, it must not be easily reproducible or available in unlimited quantities. If it can be easily obtained by anyone (like seashells on a beach), it loses its value and cannot function as a reliable store of value or medium of exchange. Scarcity ensures that money maintains its value and cannot be easily counterfeited or overproduced.'}]} as QuizContent]},
  {
    id: 'lesson-6-2',
    title: 'Financial markets and institutions',
    duration: '45 min',
    contentItems: [
      {
        id: 'economics-u6-l2-video-1',
        type: 'video',
        title: 'Financial markets and institutions',
        videoIndex: 0} as VideoContent,
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
          'Monetary systems: create and manage money']} as ArticleContent,
      {
        id: 'economics-u6-l2-quiz',
        type: 'quiz',
        title: 'Quiz: Financial markets and institutions',
        questions: [
          {
            id: 'quiz-6-2-1',
            question: 'Financial institutions and markets play important roles in our economy. They help people save money, get approved for loans, and invest in businesses. What is the primary role of a bank?',
            options: [
              'to sell stocks',
              'to make all the important financial decisions for the country',
              'to provide a safe place for people to store their money',
              'to print more money'],
            correctAnswer: 2,
            explanation: 'The primary role of a bank is to provide a safe place for people to store their money. Banks accept deposits from customers and keep those funds secure, while also providing services like checking accounts, savings accounts, and loans. While banks may offer investment services, the core function is safeguarding deposits. Printing money is exclusively the role of a central bank, not commercial banks.'},
          {
            id: 'quiz-6-2-2',
            question: 'The international monetary system is guided by certain key objectives that influence its operation. What is the primary goal of the international monetary system?',
            options: [
              'enforce monetary policy',
              'regulate global stock markets',
              'promote global financial stability',
              'dictate trade policies'],
            correctAnswer: 2,
            explanation: 'The primary goal of the international monetary system is to promote global financial stability. This system facilitates international transactions, promotes exchange rate stability, and helps prevent financial crises. By providing a framework for currency exchange and international payments, it fosters sustainable economic growth and reduces the risk of global economic disruptions. While it interacts with monetary policy and trade, its overarching objective is maintaining stability in the global financial system.'},
          {
            id: 'quiz-6-2-3',
            question: 'In today\'s global economy, there are many forms of currency used across the world, and even digitally. What is the currency of the United States?',
            options: [
              'bitcoin',
              'the US dollar',
              'gift cards',
              'all of the above'],
            correctAnswer: 1,
            explanation: 'The currency of the United States is the US dollar. The US dollar (USD) is the official currency issued by the Federal Reserve and is the legal tender for all debts, public and private, in the United States. While bitcoin is a cryptocurrency and gift cards are a form of payment, neither is the official currency of the United States.'},
          {
            id: 'quiz-6-2-4',
            question: 'Financial markets are places where different types of things (like stocks, bonds, or commodities) are traded. Which market offers short-term investments for trade?',
            options: [
              'money market',
              'bond market',
              'stock market'],
            correctAnswer: 0,
            explanation: 'The money market offers short-term investments for trade. The money market is a segment of the financial market where financial instruments with high liquidity and very short maturities (typically less than one year) are traded. These include instruments like Treasury bills, commercial paper, certificates of deposit, and repurchase agreements. The bond market primarily deals with long-term debt instruments, and the stock market deals with equity (ownership shares) in companies, both of which are generally longer-term investments.'}]} as QuizContent]},
  {
    id: 'lesson-6-3',
    title: 'The Federal Reserve',
    duration: '40 min',
    contentItems: [
      {
        id: 'economics-u6-l3-video-1',
        type: 'video',
        title: 'The Federal Reserve',
        videoIndex: 0} as VideoContent,
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
          'Created 1913, evolved over time']} as ArticleContent,
      {
        id: 'economics-u6-l3-quiz',
        type: 'quiz',
        title: 'Quiz: The Federal Reserve',
        questions: [
          {
            id: 'quiz-6-3-1',
            question: 'The Federal Reserve adjusts the money supply and interest rates to help manage economic growth and control inflation across the country. Which primary purpose of the Federal Reserve is demonstrated in this scenario?',
            options: [
              'protecting consumers from unfair lending practices',
              'ensuring overall economic stability',
              'providing financial services to the government',
              'supervising and regulating banks'],
            correctAnswer: 1,
            explanation: 'The scenario demonstrates the Federal Reserve\'s primary purpose of ensuring overall economic stability. By adjusting the money supply and interest rates, the Fed uses monetary policy tools to achieve macroeconomic goals like managing economic growth and controlling inflation. These actions are directly aimed at maintaining the health and stability of the overall economy. While the other options are also functions of the Federal Reserve, they are not the primary purpose demonstrated by the specific actions described in the question.'},
          {
            id: 'quiz-6-3-2',
            question: 'In the late 1970s and early 1980s, the U.S. experienced high inflation rates, which threatened economic stability. The Federal Reserve, under Chairman Paul Volcker, took significant steps to address this issue, resulting in a major shift in how monetary policy was conducted. What action did the Federal Reserve take in response to the high inflation of the late 1970s and early 1980s?',
            options: [
              'raised interest rates sharply to control inflation',
              'introduced Deposit Insurance to protect bank deposits',
              'established the Federal Reserve',
              'lowered interest rates to stimulate economic growth'],
            correctAnswer: 0,
            explanation: 'The Federal Reserve raised interest rates sharply to control inflation. During the late 1970s and early 1980s, the U.S. faced severe inflation. Paul Volcker, as Chairman of the Federal Reserve, implemented a highly restrictive monetary policy, primarily by sharply raising the federal funds rate. This action significantly increased interest rates across the economy, making borrowing more expensive and reducing aggregate demand, which ultimately brought down inflation, albeit at the cost of a recession.'},
          {
            id: 'quiz-6-3-3',
            question: 'The Federal Reserve has several key functions. Which of these are the primary functions of the Fed? (Select all that apply)',
            options: [
              'funding government operations',
              'providing financial services',
              'managing the money supply and interest rates',
              'overseeing banking system'],
            correctAnswer: 1,
            explanation: 'The primary functions of the Federal Reserve include: providing financial services (to depository institutions and the U.S. government), managing the money supply and interest rates (conducting monetary policy), and overseeing the banking system (supervising and regulating banks). Funding government operations is primarily the role of the U.S. Treasury, not the Federal Reserve. Note: This question has multiple correct answers (B, C, and D), but the system requires selecting one. The answer provided (B) represents one of the three primary functions.'},
          {
            id: 'quiz-6-3-4',
            question: 'The Federal Reserve\'s structure ensures that the perspectives of different regions across the U.S. are considered in the decisions made by the Board of Governors. Which rule ensures this?',
            options: [
              'The Chairman of the Fed is the only representative of all regions.',
              'The President of the United States appoints all members of the regional banks\' Boards of Directors.',
              'The Board of Governors cannot have two members from the same region.',
              'Each regional bank operates independently without input from the Board of Governors.'],
            correctAnswer: 2,
            explanation: 'The rule that ensures regional perspectives are considered is that the Board of Governors cannot have two members from the same region. This requirement ensures geographic diversity on the Board, with members representing different Federal Reserve districts across the United States. This structure helps ensure that the perspectives and economic conditions of different regions are considered in monetary policy decisions, preventing any single region from having disproportionate influence.'}]} as QuizContent]}];

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
        videoIndex: 0} as VideoContent,
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
          'Interest rates affected by policy, demand, supply, inflation, risk']} as ArticleContent,
      {
        id: 'economics-u7-l1-quiz',
        type: 'quiz',
        title: 'Quiz: Monetary policy',
        questions: [
          {
            id: 'quiz-7-1-1',
            question: 'Monetary policy is a critical economic tool used by the Federal Reserve to manage the money supply and interest rates. Its primary goals are full employment, stable prices, and economic growth. If the Fed increases the interest rate, which goal(s) is it trying to achieve?',
            options: [
              'economic growth',
              'full employment',
              'stable prices'],
            correctAnswer: 2,
            explanation: 'When the Federal Reserve increases interest rates, it is trying to achieve stable prices. This is a contractionary monetary policy used to combat inflation by cooling down an overheating economy. Higher interest rates make borrowing more expensive, which reduces spending and investment, slowing down economic growth. While this may temporarily reduce employment, the primary goal is to stabilize prices and prevent inflation from getting out of control.'},
          {
            id: 'quiz-7-1-2',
            question: 'Jamal learns that the Federal Reserve has raised the interest rate on reserves. What is a potential economic impact of this action?',
            options: [
              'Consumer spending will increase as interest rates drop.',
              'Economic growth will rise, leading to more job creation.',
              'Unemployment could rise due to decreased business investment.',
              'Inflation will increase as more money circulates in the economy.'],
            correctAnswer: 2,
            explanation: 'A potential economic impact of raising the interest rate on reserves is that unemployment could rise due to decreased business investment. Raising the interest rate on reserves is a contractionary monetary policy that makes it more costly for banks to lend money. This generally leads to higher interest rates throughout the economy. Higher interest rates increase the cost of borrowing for businesses, making them less likely to invest in new projects, expand operations, or hire more employees. This reduction in business investment can slow down economic activity and lead to an increase in unemployment.'},
          {
            id: 'quiz-7-1-3',
            question: 'One of the tools of monetary policy is the required reserve ratio. What is the purpose of the required reserve ratio?',
            options: [
              'It allows the Federal Reserve to collect interest on excess reserves.',
              'It determines the interest rate that banks charge each other for short-term loans.',
              'It controls the amount of money banks must keep on hand to ensure they have enough funds to meet customer withdrawals.',
              'It involves the Federal Reserve buying and selling government securities to influence the money supply.'],
            correctAnswer: 2,
            explanation: 'The purpose of the required reserve ratio is to control the amount of money banks must keep on hand to ensure they have enough funds to meet customer withdrawals. The required reserve ratio is the percentage of deposits that banks must hold as reserves (either in their vaults or on deposit with the Federal Reserve) rather than lending out. This ensures banks maintain sufficient liquidity to meet depositor demands and helps the Fed control the money supply, as higher reserve requirements reduce the amount banks can lend, while lower requirements allow more lending.'},
          {
            id: 'quiz-7-1-4',
            question: 'Monetary policy is a critical economic tool used by the Federal Reserve (the Fed) to manage the money supply and interest rates. Its primary goals are full employment, stable prices, and economic growth. If the Fed lowers the interest rate, which goal(s) is it trying to achieve?',
            options: [
              'economic growth',
              'full employment',
              'stable prices'],
            correctAnswer: 0,
            explanation: 'When the Federal Reserve lowers interest rates, it is trying to achieve both economic growth and full employment. Lowering interest rates is an expansionary monetary policy that makes borrowing cheaper for businesses and consumers. This encourages investment, spending, and hiring, which directly stimulates economic activity. Lower rates lead to increased business investment and consumer spending, boosting economic growth. As businesses expand and hire more workers, this also promotes full employment. While stable prices are a primary goal of monetary policy overall, lowering interest rates can sometimes lead to inflationary pressures if the economy overheats, so it\'s not a direct goal of lowering rates in this context.'}]} as QuizContent]},
  {
    id: 'lesson-7-2',
    title: 'Fiscal policy',
    duration: '40 min',
    contentItems: [
      {
        id: 'economics-u7-l2-video-1',
        type: 'video',
        title: 'Fiscal policy',
        videoIndex: 0} as VideoContent,
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
          'Automatic stabilizers: automatic adjustments']} as ArticleContent,
      {
        id: 'economics-u7-l2-quiz',
        type: 'quiz',
        title: 'Quiz: Fiscal policy',
        questions: [
          {
            id: 'quiz-7-2-1',
            question: 'President Franklin Delano Roosevelt was the first U.S. president to adopt Keynesian economic policies. What was the main goal of these policies?',
            options: [
              'to stimulate the economy through increased government spending and job creation',
              'to maintain a limited role for the government in the economy',
              'to reduce government spending in order to balance the budget',
              'to increase taxes to generate more revenue'],
            correctAnswer: 0,
            explanation: 'The main goal of Keynesian economic policies, as adopted by President Franklin Delano Roosevelt, was to stimulate the economy through increased government spending and job creation. Keynesian economics advocates for active government intervention, especially during economic downturns, to boost aggregate demand and create jobs. This approach contrasts with policies that advocate for a limited government role, reduced spending, or solely tax increases for revenue.'},
          {
            id: 'quiz-7-2-2',
            question: 'The government decides to cut spending on public programs. What is the intended effect of this fiscal policy action?',
            options: [
              'lower inflation by reducing overall demand in the economy',
              'increased economic growth as businesses invest more',
              'higher employment as more government jobs are created',
              'higher consumer spending as disposable income rises'],
            correctAnswer: 0,
            explanation: 'The intended effect of cutting spending on public programs is to lower inflation by reducing overall demand in the economy. This is a contractionary fiscal policy that reduces government spending, which decreases aggregate demand. When demand decreases, there is less upward pressure on prices, helping to control inflation. This policy would typically reduce economic growth and employment in the short term, not increase them.'},
          {
            id: 'quiz-7-2-3',
            question: 'The government wants to reduce unemployment during a recession. Which of the following tools of fiscal policy would best help achieve this goal?',
            options: [
              'increasing taxes to reduce the national deficit',
              'increasing government spending on infrastructure projects',
              'raising interest rates to limit borrowing',
              'cutting government spending to reduce debt'],
            correctAnswer: 1,
            explanation: 'To reduce unemployment during a recession, the government should increase government spending on infrastructure projects. This is an expansionary fiscal policy that directly creates jobs and boosts aggregate demand. Increasing government spending stimulates economic activity, creates employment opportunities, and helps pull the economy out of recession. Increasing taxes or cutting government spending are contractionary fiscal policies that would worsen unemployment. Raising interest rates is a monetary policy tool, not fiscal policy, and it would also slow down the economy, potentially increasing unemployment.'},
          {
            id: 'quiz-7-2-4',
            question: 'During the Great Depression, many people lost their jobs, leading to a cycle of even less spending and more job losses. John Maynard Keynes proposed a solution to this problem. Which of the following best describes Keynes\' solution?',
            options: [
              'The government should focus only on enforcing contracts and protecting property rights.',
              'The government should reduce taxes and cut spending during a recession.',
              'The government should stop interfering with the economy and let it recover on its own.',
              'The government should step in and increase spending to stimulate the economy.'],
            correctAnswer: 3,
            explanation: 'Keynes\' solution was that the government should step in and increase spending to stimulate the economy. John Maynard Keynes\' economic theory, particularly relevant during the Great Depression, advocated for active government intervention in the economy. He argued that during a recession or depression, when private sector spending and investment are low, the government should increase its own spending (fiscal policy) to boost aggregate demand, create jobs, and stimulate economic recovery. This approach breaks the cycle of declining spending and job losses by injecting government spending into the economy.'}]} as QuizContent]},
  {
    id: 'lesson-7-3',
    title: 'Government budgets; revenue and expenditures',
    duration: '50 min',
    contentItems: [
      {
        id: 'economics-u7-l3-video-1',
        type: 'video',
        title: 'Government budgets; revenue and expenditures',
        videoIndex: 0} as VideoContent,
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
          'Debt: accumulated deficits']} as ArticleContent,
      {
        id: 'economics-u7-l3-quiz',
        type: 'quiz',
        title: 'Quiz: Government budgets; revenue and expenditures',
        questions: [
          {
            id: 'quiz-7-3-1',
            question: 'In a ______ tax structure, individuals with higher incomes pay a larger percentage of their income in taxes than those with lower incomes.',
            options: [
              'Progressive',
              'Regressive',
              'Proportional',
              'Flat'],
            correctAnswer: 0,
            explanation: 'A progressive tax structure is one where individuals with higher incomes pay a larger percentage of their income in taxes than those with lower incomes. In a progressive tax system, the tax rate increases as income increases. This is designed to place a greater tax burden on those who can afford to pay more, based on the principle of ability to pay. Examples include the U.S. federal income tax system, where higher income brackets face higher tax rates.'},
          {
            id: 'quiz-7-3-2',
            question: 'The government budget and national debt are interconnected, as budget changes can directly impact national debt levels. How does a balanced budget affect the national debt?',
            options: [
              'A balanced budget prevents the national debt from increasing, but it does not eliminate existing debt.',
              'A balanced budget means the national debt will increase unless spending is cut.',
              'A balanced budget means the national debt is automatically paid off.',
              'A balanced budget allows the government to borrow more money to reduce the national debt.'],
            correctAnswer: 0,
            explanation: 'A balanced budget prevents the national debt from increasing, but it does not eliminate existing debt. A balanced budget means that government revenues equal government expenditures for a given period, so no new debt is incurred. This prevents the national debt from growing further. However, it does not address or pay off any debt that has accumulated from previous years. To reduce existing debt, the government would need to run a budget surplus (revenue exceeding spending) and use that surplus to pay down the debt.'},
          {
            id: 'quiz-7-3-3',
            question: 'Government spending pays for public services, infrastructure, and social programs. It can be mandatory or discretionary. Which of the following is an example of discretionary federal spending?',
            options: [
              'Medicare',
              'Social Security',
              'national defense',
              'interest on the national debt'],
            correctAnswer: 2,
            explanation: 'National defense is an example of discretionary federal spending. Discretionary spending refers to spending that is determined annually through the appropriations process, where Congress decides how much to allocate. National defense spending is set each year by Congress and can be adjusted based on policy priorities. In contrast, Medicare, Social Security, and interest on the national debt are examples of mandatory spending, which is required by law and not subject to annual appropriations decisions.'}]} as QuizContent]}];

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
        videoIndex: 0} as VideoContent,
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
          'Trade barriers: tariffs, quotas, subsidies']} as ArticleContent,
      {
        id: 'economics-u8-l1-quiz',
        type: 'quiz',
        title: 'Quiz: Trade',
        questions: []} as QuizContent]},
  {
    id: 'lesson-8-2',
    title: 'Currency conversion',
    duration: '35 min',
    contentItems: [
      {
        id: 'economics-u8-l2-video-1',
        type: 'video',
        title: 'Currency conversion',
        videoIndex: 0} as VideoContent,
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
          'Affects trade and investment']} as ArticleContent,
      {
        id: 'economics-u8-l2-quiz',
        type: 'quiz',
        title: 'Quiz: Currency conversion',
        questions: [
          {
            id: 'quiz-8-2-1',
            question: 'Naomi and Eli are woodworkers. In one week, Naomi can build 12 tables or 6 chairs, while Eli can build 8 tables or 2 chairs. Naomi\'s opportunity cost for building one table is giving up 0.5 chairs, and Eli\'s opportunity cost for building one table is giving up 0.25 chairs. In this scenario, who has the comparative advantage in building tables?',
            options: [
              'Naomi',
              'Eli',
              'both Naomi and Eli',
              'neither Naomi nor Eli'],
            correctAnswer: 1,
            explanation: 'Eli has the comparative advantage in building tables. Comparative advantage is held by the individual who can produce a good at a lower opportunity cost. Since Eli\'s opportunity cost for building one table is 0.25 chairs (lower than Naomi\'s 0.5 chairs), Eli has the comparative advantage in building tables. This means Eli should specialize in building tables, while Naomi should specialize in building chairs (where she likely has the comparative advantage).'},
          {
            id: 'quiz-8-2-2',
            question: 'A country\'s imports for the year total $600 billion, while its exports total $450 billion. What is the balance of trade?',
            options: [
              'trade surplus',
              'balanced trade',
              'trade deficit'],
            correctAnswer: 2,
            explanation: 'The balance of trade is a trade deficit. The balance of trade is calculated as exports minus imports. In this case, $450 billion (exports) minus $600 billion (imports) equals -$150 billion, which indicates a trade deficit. A trade deficit occurs when a country imports more goods and services than it exports. A trade surplus would occur if exports exceeded imports, and balanced trade would occur if exports and imports were equal.'},
          {
            id: 'quiz-8-2-3',
            question: 'Suppose the Russian ruble appreciated between May and June 2018. What would this have meant for tourists heading to Russia to watch the World Cup in June 2018?',
            options: [
              'Russia\'s price level would have increased.',
              'The exchange rate of the ruble would have decreased.',
              'Russian goods would have been relatively cheaper to tourists.',
              'The exchange rate of other currencies relative to the ruble would have increased.',
              'It would have taken more of their currency to buy the ruble.'],
            correctAnswer: 4,
            explanation: 'If the Russian ruble appreciated, it would have taken more of their currency to buy the ruble. When a currency appreciates, its value increases relative to other currencies. For tourists, this means their home currency would buy fewer rubles than before. Consequently, it would take more of their currency to purchase the same amount of rubles, making everything in Russia (goods, services, accommodation) more expensive for them. This is the opposite of what would happen if the ruble depreciated.'},
          {
            id: 'quiz-8-2-4',
            question: 'Country C\'s government notices that an increase in cheaper foreign-made furniture is forcing domestic producers to lower their prices to remain competitive. To address this, the government imposes a tariff on imported furniture. What is a potential benefit of this tariff?',
            options: [
              'increasing imports of foreign-made furniture',
              'reducing prices for consumers',
              'improving trade relations with other countries',
              'preserving jobs in the domestic furniture industry'],
            correctAnswer: 3,
            explanation: 'A potential benefit of the tariff is preserving jobs in the domestic furniture industry. A tariff is a tax on imported goods that makes foreign-made furniture more expensive. By reducing the competitive pressure on domestic producers, the tariff allows them to maintain their prices and sales, which helps preserve jobs within the domestic furniture industry. However, tariffs typically have negative consequences: they decrease imports, increase prices for consumers (as foreign goods become more expensive and domestic producers face less competition), and can strain trade relations with other countries.'}]} as QuizContent]},
  {
    id: 'lesson-8-3',
    title: 'Globalization',
    duration: '40 min',
    contentItems: [
      {
        id: 'economics-u8-l3-video-1',
        type: 'video',
        title: 'Globalization',
        videoIndex: 0} as VideoContent,
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
          'Types: FTA, customs unions, common markets']} as ArticleContent,
      {
        id: 'economics-u8-l3-quiz',
        type: 'quiz',
        title: 'Quiz: Globalization',
        questions: [
          {
            id: 'quiz-8-3-1',
            question: 'The modern world is increasingly connected through trade, technology, and culture. Technological progress has driven ______, the process of increasing the interdependence of the world\'s economies, cultures, and populations. This has led to ______, where nations rely on each other for goods, services, resources, and technology to support economic growth and development.',
            options: [
              'Nationalism',
              'Protectionism',
              'Globalization',
              'Isolationism',
              'Regionalization'],
            correctAnswer: 2,
            explanation: 'Globalization is the process of increasing the interdependence of the world\'s economies, cultures, and populations, driven by technological progress, trade, and cultural exchange. This leads to nations relying on each other for goods, services, resources, and technology to support economic growth and development. Globalization has been accelerated by advances in technology, transportation, and communication, making the world more interconnected than ever before.'},
          {
            id: 'quiz-8-3-2',
            question: 'Economic interdependence can create challenges for countries that rely heavily on specific trading partners. What is one potential disadvantage of economic interdependence?',
            options: [
              'It can lead to higher prices for consumers.',
              'It can lead to fewer global trading opportunities.',
              'It can lead to decreased cooperation between countries.',
              'It can lead to foreign political influence.'],
            correctAnswer: 3,
            explanation: 'One potential disadvantage of economic interdependence is that it can lead to foreign political influence. When countries become heavily dependent on specific trading partners for essential goods, services, or resources, those trading partners may gain political leverage. This can influence domestic policy decisions, create vulnerabilities in times of conflict, and reduce a country\'s autonomy in making independent policy choices.'},
          {
            id: 'quiz-8-3-3',
            question: 'Economic interdependence means countries rely on each other for resources, goods, and services by importing items they cannot produce domestically or would be costly to make locally. What is one advantage of economic interdependence?',
            options: [
              'improved local self-sufficiency',
              'access to a variety of goods and services',
              'increased investment in domestic industries',
              'strengthened reliance on local goods'],
            correctAnswer: 1,
            explanation: 'One advantage of economic interdependence is access to a variety of goods and services. By importing items that a country cannot produce domestically or would be costly to make locally, consumers and industries gain access to a wider range of products and services than they would otherwise have. This increases consumer choice, allows countries to specialize in what they do best, and enables access to goods that may not be available or affordable through domestic production alone.'},
          {
            id: 'quiz-8-3-4',
            question: 'Countries involved in international trade agreements experience more competition because these agreements lower the barriers to imports. What is a potential negative effect of increased competition?',
            options: [
              'higher prices for goods',
              'decreased consumer choices',
              'decreased access to global markets',
              'job loss'],
            correctAnswer: 3,
            explanation: 'A potential negative effect of increased competition is job loss. When international trade agreements lower barriers to imports, domestic industries face increased competition from foreign producers. If domestic companies cannot compete effectively, they may reduce production, close facilities, or go out of business, leading to job losses in those industries. While increased competition generally benefits consumers through lower prices and more choices, it can have negative consequences for workers in industries that struggle to compete with foreign imports.'}]} as QuizContent]}];

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
        videoIndex: 0} as VideoContent,
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
          'Types: formal education, training, certifications']} as ArticleContent,
      {
        id: 'economics-u9-l1-quiz',
        type: 'quiz',
        title: 'Quiz: Education and earnings',
        questions: [
          {
            id: 'quiz-9-1-1',
            question: 'When making an educational investment, what is it that you are actually investing?',
            options: [
              'your time, money, and effort into getting a higher education',
              'your time volunteering at a community college',
              'your money into buying more books'],
            correctAnswer: 0,
            explanation: 'When making an educational investment, you are investing your time, money, and effort into getting a higher education. Educational investment involves committing resources (time spent studying, tuition and related costs, and personal effort) to acquire knowledge, skills, and credentials that can increase your future earning potential and career opportunities. This is an investment in human capital that typically pays off through better job prospects and higher lifetime earnings.'},
          {
            id: 'quiz-9-1-2',
            question: 'The economy and labor markets have changed a lot in recent years. As a result, which of these jobs has become more popular and higher paying?',
            options: [
              'movie theater usher',
              'solar panel installer',
              'record store clerk'],
            correctAnswer: 1,
            explanation: 'Solar panel installer has become more popular and higher paying. As the economy shifts toward renewable energy and sustainability, the demand for solar panel installation has increased significantly. This growth is driven by government incentives, environmental concerns, and technological advances that make solar energy more affordable. In contrast, movie theater usher and record store clerk are jobs that have declined due to technological changes (streaming services, digital music) and changing consumer preferences.'},
          {
            id: 'quiz-9-1-3',
            question: 'Which of the following statements best describes the relationship between educational levels and earnings?',
            options: [
              'Higher education generally results in better paying jobs.',
              'Higher education levels lead to lower-paying jobs.',
              'The amount of money someone earns is mostly determined by company they work for.'],
            correctAnswer: 0,
            explanation: 'Higher education generally results in better paying jobs. Research consistently shows a positive correlation between educational attainment and earnings. People with higher levels of education (college degrees, advanced degrees) typically earn more over their lifetimes than those with less education. This is because higher education provides specialized knowledge, skills, and credentials that are valued in the labor market, leading to access to higher-paying occupations and career advancement opportunities.'}]} as QuizContent]},
  {
    id: 'lesson-9-2',
    title: 'Postsecondary education',
    duration: '60 min',
    contentItems: [
      {
        id: 'economics-u9-l2-video-1',
        type: 'video',
        title: 'Postsecondary education',
        videoIndex: 0} as VideoContent,
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
          '529 plans: tax-advantaged savings']} as ArticleContent,
      {
        id: 'economics-u9-l2-quiz',
        type: 'quiz',
        title: 'Quiz: Postsecondary education',
        questions: []} as QuizContent]},
  {
    id: 'lesson-9-3',
    title: 'Cost of postsecondary education',
    duration: '35 min',
    contentItems: [
      {
        id: 'economics-u9-l3-video-1',
        type: 'video',
        title: 'Cost of postsecondary education',
        videoIndex: 0} as VideoContent,
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
          'Certification: short-term, specific skills']} as ArticleContent,
      {
        id: 'economics-u9-l3-quiz',
        type: 'quiz',
        title: 'Quiz: Cost of postsecondary education',
        questions: [
          {
            id: 'quiz-9-3-1',
            question: 'A college recruiter who watched you play volleyball calls you and asks for your email to send a scholarship offer. They require a credit or debit card for registration but assure you there\'s no fee. What is described in this scenario?',
            options: [
              'volleyball recruiting',
              'a scholarship scam',
              'athletic scholarship',
              'merit-based scholarship'],
            correctAnswer: 1,
            explanation: 'This scenario describes a scholarship scam. Legitimate scholarships never require payment or credit card information upfront. Red flags include: unsolicited calls, requests for payment or credit card information, promises of guaranteed scholarships, and pressure to act quickly. Legitimate scholarships are awarded based on merit, need, or other criteria, and legitimate recruiters do not ask for payment or financial information before providing scholarship details.'},
          {
            id: 'quiz-9-3-2',
            question: 'Unlike grants, scholarships are typically merit-based. Which of these would be considered a merit?',
            options: [
              'artistic achievement',
              'athletic achievement',
              'academic achievement',
              'financial need'],
            correctAnswer: 2,
            explanation: 'Merits for merit-based scholarships include artistic achievement, athletic achievement, and academic achievement. These are accomplishments or abilities that demonstrate excellence in a particular area. Financial need is not a merit; it is a factor for need-based grants and scholarships. Merit-based scholarships reward students for their achievements, talents, or abilities, regardless of their financial situation. Note: This question has multiple correct answers (A, B, and C), but the system requires selecting one. The answer provided (C) represents one of the three types of merit.'},
          {
            id: 'quiz-9-3-3',
            question: 'Many people use student loans to pay for their education, but there are other ways to cover the costs. Which of these sources can help pay for education?',
            options: [
              'work-study program',
              '529 plans',
              'scholarship',
              'mortgage'],
            correctAnswer: 2,
            explanation: 'Sources that can help pay for education include work-study programs, 529 plans, and scholarships. Work-study programs provide part-time employment for students, 529 plans are tax-advantaged savings plans specifically designed for education expenses, and scholarships are grants awarded to students. A mortgage is a loan used to purchase real estate, not directly for education expenses. Note: This question has multiple correct answers (A, B, and C), but the system requires selecting one. The answer provided (C) represents one of the three sources.'},
          {
            id: 'quiz-9-3-4',
            question: 'Interest, as a cost of borrowing, also applies to student loans. Arrange the student loans below from lowest to highest interest.',
            options: [
              'subsidized, unsubsidized, private',
              'unsubsidized, subsidized, private',
              'private, subsidized, unsubsidized',
              'subsidized, private, unsubsidized'],
            correctAnswer: 0,
            explanation: 'Student loans arranged from lowest to highest interest are: subsidized, unsubsidized, private. Subsidized federal loans have the lowest interest rates because the government pays the interest while the student is in school. Unsubsidized federal loans have slightly higher interest rates and interest accrues while in school. Private student loans typically have the highest interest rates because they are not backed by the government and are based on creditworthiness. Private loans also lack the borrower protections and flexible repayment options available with federal loans.'}]} as QuizContent]},
  {
    id: 'lesson-9-4',
    title: 'Financial aid',
    duration: '50 min',
    contentItems: [
      {
        id: 'economics-u9-l4-video-1',
        type: 'video',
        title: 'Financial aid',
        videoIndex: 0} as VideoContent,
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
          'Eligibility varies by type of aid']} as ArticleContent,
      {
        id: 'economics-u9-l4-quiz',
        type: 'quiz',
        title: 'Quiz: Financial aid',
        questions: [
          {
            id: 'quiz-9-4-1',
            question: 'You are considering attending college and have written down the following:\n\nCollege\nDirect costs $25,000\nIndirect costs $10,000\nScholarship $15,000\nGrant $5,000\nLoan $10,000\nWork-study $5,000\n\nWhat is the net cost per year while attending this college?',
            options: [
              '$0',
              '$25,000',
              '$35,000'],
            correctAnswer: 0,
            explanation: 'The net cost of college is calculated by subtracting all forms of financial aid (scholarships, grants, loans, and work-study earnings) from the total cost of attendance (direct and indirect costs). First, calculate the total costs: Direct costs ($25,000) + Indirect costs ($10,000) = $35,000. Next, sum all financial aid: Scholarship ($15,000) + Grant ($5,000) + Loan ($10,000) + Work-study ($5,000) = $35,000. Finally, subtract total financial aid from total costs: $35,000 - $35,000 = $0. Therefore, the net cost per year is $0.'},
          {
            id: 'quiz-9-4-2',
            question: 'Tuition, fees, and transportation all make education more expensive. What are some things that can help make it cost less?',
            options: [
              'work-study',
              'campus meal plan',
              'housing',
              'course registration fees'],
            correctAnswer: 0,
            explanation: 'Work-study can help make education cost less. Work-study programs provide part-time employment opportunities for students, allowing them to earn money to help cover educational expenses. This reduces the out-of-pocket cost of education. In contrast, campus meal plans, housing, and course registration fees are expenses that add to the cost of education, not reduce it.'},
          {
            id: 'quiz-9-4-3',
            question: 'There are many costs associated with getting your education, but all the costs can be grouped into two categories: direct costs and indirect costs. Which of the following is an example of a direct cost?',
            options: [
              'laptop',
              'food',
              'course fees',
              'transportation'],
            correctAnswer: 2,
            explanation: 'Course fees are an example of a direct cost. Direct costs of education are expenses directly attributable to the educational program itself, such as tuition, enrollment fees, and required course materials or fees paid directly to the institution. Indirect costs are expenses that are not directly tied to the education but are incurred while pursuing it, such as living expenses (food, housing), transportation, and opportunity costs (lost wages from not working). While a laptop might be necessary for education, course fees are a quintessential direct cost as they are paid directly to the institution.'},
          {
            id: 'quiz-9-4-4',
            question: 'You are thinking about opening up your own business and need to learn a bit more. You found three schools that teach business courses. Put the schools in order from the least expensive to the most expensive, based on what they traditionally cost.',
            options: [
              'Certification program, Community college, Public university',
              'Community college, Certification program, Public university',
              'Public university, Community college, Certification program',
              'Certification program, Public university, Community college'],
            correctAnswer: 0,
            explanation: 'The correct order from least expensive to most expensive is: Certification program, Community college, Public university. Certification programs are typically short-term and focused on specific skills, making them generally the least expensive option. Community colleges offer associate degrees and vocational training at a lower cost than four-year universities. Public universities, while more affordable than private institutions, are generally the most expensive among these three options for a full degree program due to longer duration and broader curriculum.'}]} as QuizContent]},
  {
    id: 'lesson-9-5',
    title: 'Student loans',
    duration: '60 min',
    contentItems: [
      {
        id: 'economics-u9-l5-video-1',
        type: 'video',
        title: 'Student loans',
        videoIndex: 0} as VideoContent,
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
          'Default: serious consequences']} as ArticleContent,
      {
        id: 'economics-u9-l5-quiz',
        type: 'quiz',
        title: 'Quiz: Student loans',
        questions: [
          {
            id: 'quiz-9-5-1',
            question: 'Under the standard repayment plan for federal student loans your loan will be split into equal monthly payments. How long does it take to pay back your student loans under the standard plan?',
            options: [
              '5 years',
              '10 years',
              '15 years',
              '20 years'],
            correctAnswer: 1,
            explanation: 'Under the standard repayment plan for federal student loans, it takes 10 years to pay back the loan. The standard repayment plan divides the loan into equal monthly payments over a fixed period of 10 years. This plan typically results in higher monthly payments but less total interest paid compared to extended or income-driven repayment plans.'},
          {
            id: 'quiz-9-5-2',
            question: 'Student loan repayment plans come with both benefits and drawbacks. One benefit is choosing a repayment plan that lets you have a more affordable monthly payment. Which drawback is associated with this benefit?',
            options: [
              'decreased credit score',
              'difficulty in qualifying for future financial aid',
              'more interest paid over the life of the loan',
              'higher risk of default'],
            correctAnswer: 2,
            explanation: 'A drawback of choosing a repayment plan with more affordable monthly payments is that you will pay more interest over the life of the loan. Plans with lower monthly payments (such as extended or income-driven repayment plans) typically extend the repayment period, which means interest accrues for a longer time. While these plans make payments more manageable, the trade-off is paying more total interest over the life of the loan compared to the standard 10-year repayment plan.'},
          {
            id: 'quiz-9-5-3',
            question: 'Sometimes the career you choose can qualify you for student loan forgiveness, regardless of the loan repayment plan. Which job might make you eligible for student loan forgiveness?',
            options: [
              'research scientist at a private tech company',
              'accountant in a private firm',
              'cashier in a retail store',
              'public service employee, such as a government or non-profit worker'],
            correctAnswer: 3,
            explanation: 'Public service employees, such as government or non-profit workers, may be eligible for student loan forgiveness. Programs like Public Service Loan Forgiveness (PSLF) forgive remaining federal student loan debt after 10 years of qualifying payments while working full-time for a qualifying public service employer (government organizations, non-profit organizations, etc.). Private sector jobs, such as research scientist at a private tech company, accountant in a private firm, or cashier in a retail store, generally do not qualify for public service loan forgiveness programs.'},
          {
            id: 'quiz-9-5-4',
            question: 'The goal of an income-driven repayment plan is to make student loan payments more affordable until your income increases through a better-paying job or a raise. What happens if your income increases significantly?',
            options: [
              'You might be switched to a standard repayment plan.',
              'The interest rate on your loan goes down.',
              'Your monthly payments will decrease.',
              'Your loan is automatically forgiven.'],
            correctAnswer: 0,
            explanation: 'If your income increases significantly under an income-driven repayment plan, you might be switched to a standard repayment plan. Income-driven repayment plans calculate monthly payments based on a percentage of your discretionary income. If your income increases substantially, your calculated payment under the income-driven plan may exceed what you would pay under the standard 10-year repayment plan. In such cases, you may be automatically switched to the standard repayment plan, which typically results in higher monthly payments but ensures the loan is paid off in 10 years.'}]} as QuizContent]}];

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
        videoIndex: 0} as VideoContent,
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
          'Benefits vary by employer']} as ArticleContent,
      {
        id: 'economics-u10-l1-quiz',
        type: 'quiz',
        title: 'Quiz: Compensation',
        questions: [
          {
            id: 'quiz-10-1-1',
            question: 'Job benefits can be divided into two categories: soft and hard benefits. Which of these is an example of a soft benefit?',
            options: [
              'health insurance',
              'salary',
              'work from home',
              'stock options'],
            correctAnswer: 2,
            explanation: 'Work from home is an example of a soft benefit. Soft benefits are non-monetary perks that improve work-life balance or the work environment, such as flexible work arrangements, professional development opportunities, or workplace amenities. In contrast, hard benefits are monetary or directly quantifiable benefits like salary, health insurance, stock options, retirement plans, and other financial compensation.'},
          {
            id: 'quiz-10-1-2',
            question: 'You\'re traveling a lot for work and sometimes find it challenging to maintain a healthy lifestyle. Which benefit would support you best in this situation?',
            options: [
              'a company car',
              'gift cards to fast food restaurants',
              'tuition reimbursement for further studies',
              'a wellness program that offers diet and exercise advice'],
            correctAnswer: 3,
            explanation: 'A wellness program that offers diet and exercise advice would support you best in maintaining a healthy lifestyle while traveling for work. This benefit directly addresses the challenge of staying healthy during frequent travel by providing guidance on nutrition and exercise that can be adapted to different locations and schedules. A company car, gift cards to fast food restaurants, and tuition reimbursement do not directly address the health and wellness challenges associated with frequent business travel.'},
          {
            id: 'quiz-10-1-3',
            question: 'In addition to pay, most jobs offer some type of benefits, typically split into hard and soft benefits. What is a hard job benefit?',
            options: [
              'A hard job benefit is when your job helps you pay for things.',
              'A hard job benefit is about making friends at work.',
              'A hard job benefit is something that makes your job nicer or easier, but isn\'t about money.',
              'A hard job benefit can include developing your time management skills.'],
            correctAnswer: 0,
            explanation: 'A hard job benefit is when your job helps you pay for things. Hard benefits are tangible, often monetary benefits that have direct financial value, such as health insurance, retirement plans, paid time off, stock options, and other forms of financial compensation. Soft benefits, in contrast, are non-monetary perks that improve the work experience, such as making friends at work, flexible schedules, professional development opportunities, or workplace amenities.'},
          {
            id: 'quiz-10-1-4',
            question: 'We can split job benefits into two groups: hard benefits and soft benefits. Which benefit below is considered a hard benefit?',
            options: [
              'hobby clubs',
              'retirement plan',
              'employee assistance programs',
              'relaxed dress code'],
            correctAnswer: 1,
            explanation: 'A retirement plan is considered a hard benefit. Hard benefits are quantifiable, monetary, or directly financial benefits that have tangible value, such as retirement plans, health insurance, paid time off, and stock options. In contrast, soft benefits are non-monetary, qualitative, or lifestyle-related perks that improve the work experience, such as hobby clubs, employee assistance programs, relaxed dress codes, flexible work arrangements, and professional development opportunities.'}]} as QuizContent]},
  {
    id: 'lesson-10-2',
    title: 'Paycheck',
    duration: '35 min',
    contentItems: [
      {
        id: 'economics-u10-l2-video-1',
        type: 'video',
        title: 'Paycheck',
        videoIndex: 0} as VideoContent,
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
          'Review regularly for accuracy']} as ArticleContent,
      {
        id: 'economics-u10-l2-quiz',
        type: 'quiz',
        title: 'Quiz: Paycheck',
        questions: [
          {
            id: 'quiz-10-2-1',
            question: 'Riqui\'s weekly pay stub is shown below.\n\nDescription | Amount\nGross pay | ?\nTaxes | $350\n401(k) | $100\nHealth insurance | $50\nNet pay | $1,100\n\nWhat is Riqui\'s gross pay?',
            options: [
              '$600',
              '$1,600',
              '$1,700'],
            correctAnswer: 1,
            explanation: 'Riqui\'s gross pay is $1,600. Gross pay is calculated by adding net pay and all deductions. Net pay is $1,100. Total deductions are: Taxes ($350) + 401(k) ($100) + Health insurance ($50) = $500. Therefore, Gross pay = Net pay + Deductions = $1,100 + $500 = $1,600.'},
          {
            id: 'quiz-10-2-2',
            question: 'Knowing the difference between voluntary and statutory deductions helps you understand where your salary goes. Which of these is a voluntary deduction?',
            options: [
              'Medicare',
              'federal income tax',
              'charity',
              'Social Security'],
            correctAnswer: 2,
            explanation: 'Charity is a voluntary deduction. Voluntary deductions are optional deductions that employees choose to have taken from their paychecks, such as charitable contributions, retirement plan contributions (beyond required minimums), health savings accounts, and optional insurance. In contrast, statutory deductions are required by law and include Medicare, federal income tax, Social Security, and state/local taxes. These cannot be avoided and are mandatory.'},
          {
            id: 'quiz-10-2-3',
            question: 'Understanding your paycheck means recognizing deductions, including statutory and voluntary deductions. Which of these is a statutory deduction?',
            options: [
              'health savings account contributions',
              'optional life insurance',
              'Medicare tax',
              'childcare plan'],
            correctAnswer: 2,
            explanation: 'Medicare tax is a statutory deduction. Statutory deductions are required by law and must be withheld from an employee\'s paycheck. These include federal income tax, Social Security tax, Medicare tax, and state/local taxes. In contrast, voluntary deductions are optional and chosen by the employee, such as health savings account contributions, optional life insurance, childcare plans, retirement plan contributions beyond required minimums, and charitable contributions.'},
          {
            id: 'quiz-10-2-4',
            question: 'Here is Xiaoli\'s pay stub.\n\nDescription | Amount\nGross pay | $1,800\nTaxes | $200\n401(k) | $150\nHealth insurance | $75\nNet pay | ?\n\nWhat is Xiaoli\'s net pay?',
            options: [
              '$1,375',
              '$1,450',
              '$1,675'],
            correctAnswer: 0,
            explanation: 'Xiaoli\'s net pay is $1,375. Net pay is calculated by subtracting all deductions from gross pay. Gross pay is $1,800. Total deductions are: Taxes ($200) + 401(k) ($150) + Health insurance ($75) = $425. Therefore, Net pay = Gross pay - Total deductions = $1,800 - $425 = $1,375.'}]} as QuizContent]},
  {
    id: 'lesson-10-3',
    title: 'Non-typical pay',
    duration: '45 min',
    contentItems: [
      {
        id: 'economics-u10-l3-video-1',
        type: 'video',
        title: 'Non-typical pay',
        videoIndex: 0} as VideoContent,
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
          'Track income and expenses']} as ArticleContent,
      {
        id: 'economics-u10-l3-quiz',
        type: 'quiz',
        title: 'Quiz: Non-typical pay',
        questions: [
          {
            id: 'quiz-10-3-1',
            question: 'Luke is a software engineer at a tech company, who gets a monthly salary. What type of worker is Luke?',
            options: [
              'independent contractor',
              'employee',
              'freelancer',
              'gig worker'],
            correctAnswer: 1,
            explanation: 'Luke is an employee. Employees receive a regular salary or wage from an employer, work at a company, and typically have benefits like health insurance and paid time off. They have a formal employment relationship with their employer. In contrast, independent contractors, freelancers, and gig workers typically work on a project basis or for specific tasks, often without a fixed monthly salary from a single employer, and have more autonomy over their work schedule and methods.'},
          {
            id: 'quiz-10-3-2',
            question: 'You are a self-employed fitness trainer and work out of your home. As a self-employed fitness trainer, which of these would be considered a business expense?',
            options: [
              'fitness equipment for your home studio',
              'a weekend trip to the beach',
              'a new phone for your personal use',
              'new dishes for your kitchen'],
            correctAnswer: 0,
            explanation: 'Fitness equipment for your home studio would be considered a business expense. Business expenses are costs that are ordinary and necessary for operating your business. Since you work as a fitness trainer from your home, fitness equipment used in your home studio is directly related to generating income for your business. A weekend trip to the beach, a personal phone, and new kitchen dishes are personal expenses and not directly related to your business operations, so they cannot be deducted as business expenses.'},
          {
            id: 'quiz-10-3-3',
            question: 'Nick has recently started his independent graphic design business. Besides income tax, which additional tax does Nick need to pay as a self-employed person?',
            options: [
              'sales tax',
              'self-employment tax',
              'luxury tax',
              'federal unemployment tax'],
            correctAnswer: 1,
            explanation: 'As a self-employed person, Nick needs to pay self-employment tax in addition to income tax. Self-employment tax covers Social Security and Medicare taxes that would normally be split between an employer and employee. Since self-employed individuals are both the employer and employee, they must pay both portions, which is collected as self-employment tax. Sales tax applies to the sale of goods and services, luxury tax applies to specific high-end items, and federal unemployment tax is typically paid by employers, not self-employed individuals.'},
          {
            id: 'quiz-10-3-4',
            question: 'Gig employment has recently become a popular way for people to earn income. What could be a tough part, or con, of gig work?',
            options: [
              'You choose who to work for.',
              'You can travel while working.',
              'You can do more than one gig job at a time.',
              'If you don\'t work, you don\'t earn money.'],
            correctAnswer: 3,
            explanation: 'A tough part of gig work is that if you don\'t work, you don\'t earn money. Gig workers typically don\'t receive a guaranteed salary or benefits like paid time off, sick leave, or vacation days. Income is directly tied to the work performed, so periods without work mean no income. This lack of financial stability and security is a significant disadvantage compared to traditional employment. The other options (choosing who to work for, ability to travel, doing multiple gig jobs) are actually advantages or benefits of gig work, not disadvantages.'}]} as QuizContent]},
  {
    id: 'lesson-10-4',
    title: 'Hiring process',
    duration: '30 min',
    contentItems: [
      {
        id: 'economics-u10-l4-video-1',
        type: 'video',
        title: 'Hiring process',
        videoIndex: 0} as VideoContent,
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
          'Update when circumstances change']} as ArticleContent,
      {
        id: 'economics-u10-l4-quiz',
        type: 'quiz',
        title: 'Quiz: Hiring process',
        questions: [
          {
            id: 'quiz-10-4-1',
            question: 'When you get hired at a new job, your employer will ask you to fill out a W-4 form. What is the purpose of this form?',
            options: [
              'to help your employer determine how much tax to withhold',
              'to determine if you are allowed to work in the U.S.',
              'to prove you are who you say you are',
              'to help you choose your benefits'],
            correctAnswer: 0,
            explanation: 'The purpose of the W-4 form is to help your employer determine how much tax to withhold from your paycheck. The W-4 form (Employee\'s Withholding Certificate) collects information about your filing status, dependents, and other factors that affect your tax liability. This information allows your employer to calculate the correct amount of federal income tax to withhold from each paycheck, ensuring you pay taxes throughout the year rather than in one large sum at tax time.'},
          {
            id: 'quiz-10-4-2',
            question: 'To get a job in the United States, you will need to provide specific documents that prove you are allowed to work. This requirement is part of the I-9 form. Which of the following documents can show you\'re eligible to work in the U.S. for an I-9 form?',
            options: [
              'frequent flyer card',
              'U.S. birth certificate',
              'grocery store rewards card',
              'library card'],
            correctAnswer: 1,
            explanation: 'A U.S. birth certificate can show you\'re eligible to work in the U.S. for an I-9 form. The I-9 form requires documents that prove both identity and employment authorization. A U.S. birth certificate is an acceptable document that establishes employment authorization (List C). However, you would also need a document from List B (like a driver\'s license or state ID) to prove your identity. Frequent flyer cards, grocery store rewards cards, and library cards are not valid forms of identification or employment authorization for I-9 purposes.'},
          {
            id: 'quiz-10-4-3',
            question: 'Filling out an I-9 form requires that you attach documents that prove your identity and eligibility to work. Which of these can be used as proof of identity when completing an I-9 form?',
            options: [
              'your electric bill',
              'your favorite book',
              'birth certificate',
              'state-issued identification card'],
            correctAnswer: 3,
            explanation: 'A state-issued identification card can be used as proof of identity when completing an I-9 form. The I-9 form requires documents from two categories: List B (proof of identity) and List C (proof of employment authorization). A state-issued ID card or driver\'s license is a common and acceptable document from List B to establish identity. A birth certificate typically establishes employment authorization (List C), not identity on its own. An electric bill or a book are not acceptable documents for I-9 purposes.'},
          {
            id: 'quiz-10-4-4',
            question: 'Part of your hiring paperwork will include filling out an I-9 form. What information is required on an I-9 form?',
            options: [
              'your emergency contact details',
              'the amount for retirement contribution',
              'your marital status and number of children you have',
              'proof of your identity'],
            correctAnswer: 3,
            explanation: 'Proof of your identity is required on an I-9 form. The I-9 form (Employment Eligibility Verification) is used to verify the identity and employment authorization of individuals hired for employment in the United States. It requires employees to provide documents that prove both their identity (List B) and their eligibility to work in the U.S. (List C). Emergency contact details, retirement contribution amounts, and marital status are not part of the I-9 form requirements.'}]} as QuizContent]}];

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
        videoIndex: 0} as VideoContent,
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
          'FDIC/NCUA insurance protects deposits']} as ArticleContent,
      {
        id: 'economics-u11-l1-quiz',
        type: 'quiz',
        title: 'Quiz: Banking and financial institutions',
        questions: [
          {
            id: 'quiz-11-1-1',
            question: 'You are looking for a place for your elderly relative to bank. When talking to them about financial institutions, you discover they value in-person service, a welcoming environment, and a local atmosphere. Which banking institution works best for this situation?',
            options: [
              'online bank',
              'commercial bank',
              'traditional bank',
              'credit union'],
            correctAnswer: 3,
            explanation: 'A credit union works best for this situation. Credit unions are typically known for their community-focused approach, offering personalized in-person service, a welcoming atmosphere, and a strong local presence. They prioritize member service and often provide a more personal, community-oriented banking experience. Online banks lack in-person service, while commercial and traditional banks, though offering in-person service, may not always prioritize the same level of personalized, local, and welcoming environment as credit unions.'},
          {
            id: 'quiz-11-1-2',
            question: 'Credit Unions offer many benefits, but there are disadvantages as well. Which of these represents a disadvantage of using a credit union?',
            options: [
              'They make it hard to close an account.',
              'Their accounts require high fees.',
              'Their accounts pay low interest rates.',
              'They limit who can have an account.'],
            correctAnswer: 3,
            explanation: 'A disadvantage of using a credit union is that they limit who can have an account. Credit unions are member-owned financial cooperatives that typically have membership requirements based on factors such as geographic location, employer, profession, or membership in a particular organization or association. This means not everyone can join a credit union, which can be a limitation compared to commercial banks that are generally open to anyone. Credit unions are actually known for low fees, competitive interest rates, and easy account management, so the other options are not typical disadvantages.'},
          {
            id: 'quiz-11-1-3',
            question: 'A credit union offers a lot of benefits to its members. What is one benefit of using a credit union?',
            options: [
              'They offer more services than commercial banks.',
              'They have branches across the country.',
              'They pay higher interest overall.',
              'They are open to anyone.'],
            correctAnswer: 2,
            explanation: 'One benefit of using a credit union is that they pay higher interest overall. Credit unions are non-profit financial institutions owned by their members. Because they are member-owned and not driven by profit, they often offer more favorable terms, such as higher interest rates on savings accounts and lower interest rates on loans, compared to commercial banks. Commercial banks often offer a wider range of services and have more extensive branch networks, and credit unions typically have membership requirements, meaning they are not open to just anyone.'}]} as QuizContent]},
  {
    id: 'lesson-11-2',
    title: 'Understanding bank accounts',
    duration: '50 min',
    contentItems: [
      {
        id: 'economics-u11-l2-video-1',
        type: 'video',
        title: 'Understanding bank accounts',
        videoIndex: 0} as VideoContent,
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
          'Management: monitor, track, reconcile']} as ArticleContent,
      {
        id: 'economics-u11-l2-quiz',
        type: 'quiz',
        title: 'Quiz: Understanding bank accounts',
        questions: [
          {
            id: 'quiz-11-2-1',
            question: 'Banks offer many types of accounts, each with a different use and purpose. Which type of bank account would you typically use for everyday transactions?',
            options: [
              'certificate of deposit (CD)',
              'checking account',
              'savings account',
              'money market account'],
            correctAnswer: 1,
            explanation: 'A checking account is typically used for everyday transactions. Checking accounts are designed for frequent deposits and withdrawals, allowing you to write checks, use a debit card, make online payments, and access your money easily. They offer high liquidity and convenience for daily financial activities. In contrast, savings accounts are for storing money and earning interest, CDs require you to lock in your money for a set period, and money market accounts have transaction limitations.'},
          {
            id: 'quiz-11-2-2',
            question: 'Interest rates vary significantly among different bank accounts. Which account pays the highest interest rate?',
            options: [
              'certificate of deposit (CD)',
              'checking/debit',
              'money market',
              'savings account'],
            correctAnswer: 0,
            explanation: 'A certificate of deposit (CD) typically pays the highest interest rate. CDs require you to deposit money for a fixed period (ranging from a few months to several years) and in return, they offer higher interest rates than other bank accounts. The longer the term, the higher the rate usually is. Checking accounts typically pay little to no interest, savings accounts pay modest interest rates, and money market accounts pay rates that are usually higher than checking but lower than CDs.'},
          {
            id: 'quiz-11-2-3',
            question: 'Money market accounts come with various features, but one stands out as a key benefit. What is a key benefit of having a money market account?',
            options: [
              'no low balance fees',
              'unlimited daily transactions',
              'higher interest rates paid compared to checking accounts',
              'no minimum opening deposit'],
            correctAnswer: 2,
            explanation: 'A key benefit of having a money market account is higher interest rates paid compared to checking accounts. Money market accounts combine features of both checking and savings accounts, offering higher interest rates than checking accounts while still providing some check-writing and debit card capabilities. However, they typically have transaction limits, minimum balance requirements, and may have fees, so the other options are not typical benefits.'},
          {
            id: 'quiz-11-2-4',
            question: 'Bank accounts differ on many features, one of which is interest. Which one of these accounts pay less interest than a savings account?',
            options: [
              'money market',
              'certificate of deposit (CD)',
              'checking/debit'],
            correctAnswer: 2,
            explanation: 'A checking/debit account pays less interest than a savings account. Checking accounts are designed for frequent transactions and easy access to funds, so they typically pay very little or no interest. Savings accounts are designed to encourage saving and pay modest interest rates. Money market accounts and CDs generally pay higher interest rates than savings accounts, with CDs typically offering the highest rates.'}]} as QuizContent]},
  {
    id: 'lesson-11-3',
    title: 'Tracking, reconciling and more',
    duration: '35 min',
    contentItems: [
      {
        id: 'economics-u11-l3-video-1',
        type: 'video',
        title: 'Tracking, reconciling and more',
        videoIndex: 0} as VideoContent,
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
          'Benefits: accuracy, control, security']} as ArticleContent,
      {
        id: 'economics-u11-l3-quiz',
        type: 'quiz',
        title: 'Quiz: Tracking, reconciling and more',
        questions: [
          {
            id: 'quiz-11-3-1',
            question: 'For a deposit that\'s recognized by your bank but not yet added to your balance, you need to look for a specific sign. What tells you a deposit is still processing?',
            options: [
              'the word "pending" and/or an asterisk next to the transaction',
              '"ACH" in front of the transaction description',
              '"ATM" in front of the transaction description',
              '"direct" in front of the deposit description'],
            correctAnswer: 0,
            explanation: 'The word "pending" and/or an asterisk next to the transaction tells you a deposit is still processing. When a deposit is pending, it means the bank has recognized the transaction but hasn\'t yet added it to your available balance. This is common with checks, electronic transfers, and other deposits that need time to clear. The "pending" status or an asterisk (*) indicator in your transaction history shows that the funds are not yet available for use.'},
          {
            id: 'quiz-11-3-2',
            question: 'Direct deposit is a banking service that allows for automatic deposits of money into an account. Which of the following transactions would be qualified as a direct deposit into your account?',
            options: [
              'bank fee',
              'loan payment',
              'ATM withdrawal',
              'store refund'],
            correctAnswer: 3,
            explanation: 'A store refund would be qualified as a direct deposit into your account. Direct deposit is an electronic transfer of funds directly into a bank account, typically used for payroll, government benefits, tax refunds, and merchant refunds. When a store processes a refund, it can be sent directly to your bank account electronically, making it a form of direct deposit. Bank fees and loan payments are withdrawals from your account, not deposits. ATM withdrawals are also withdrawals, not deposits.'}]} as QuizContent]},
  {
    id: 'lesson-11-4',
    title: 'Interest',
    duration: '45 min',
    contentItems: [
      {
        id: 'economics-u11-l4-video-1',
        type: 'video',
        title: 'Interest',
        videoIndex: 0} as VideoContent,
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
          'Falling rates: bad for savers, good for borrowers']} as ArticleContent,
      {
        id: 'economics-u11-l4-quiz',
        type: 'quiz',
        title: 'Quiz: Interest',
        questions: [
          {
            id: 'quiz-11-4-1',
            question: 'Saving money is a crucial step toward financial security, and understanding how those savings can increase is important for planning your financial future. Which of these describes how you can increase your savings through compounding?',
            options: [
              'Your savings earn interest, and that interest earns more interest.',
              'You add the same amount monthly, with no extra earnings.',
              'You deposit money into an account every year.',
              'You make a one-time deposit into an account.'],
            correctAnswer: 0,
            explanation: 'Compounding works when your savings earn interest, and that interest earns more interest. This is the "snowball effect" of compound interest, where you earn interest not only on your original deposit (principal) but also on the interest that has already been earned. Over time, this creates exponential growth in your savings. Simply adding money monthly without earning interest, or making deposits without earning interest on the balance, does not involve compounding.'},
          {
            id: 'quiz-11-4-2',
            question: 'To make the most of compound interest, there\'s something just as important as a high interest rate. What\'s the other factor that makes compound interest work well?',
            options: [
              'giving your money lots of time to grow in your account',
              'keeping a close eye on how much you spend',
              'saving a bigger amount every month',
              'opening lots of different bank accounts'],
            correctAnswer: 0,
            explanation: 'The other factor that makes compound interest work well is giving your money lots of time to grow in your account. Time is crucial for compound interest because the longer your money compounds, the more dramatic the growth becomes. The power of compounding increases exponentially over time, so starting early and letting your money grow for many years can result in significantly larger returns than even higher interest rates over shorter periods. While saving more money helps, time is the key factor that maximizes the compounding effect.'},
          {
            id: 'quiz-11-4-3',
            question: 'You want to save $75 every month and put it into an account where compound growth is possible. Keep in mind, though, that some accounts have lower compound growth than others. Which account typically offers the least compound growth?',
            options: [
              'Certificate of Deposit (CD)',
              '401(k) at your work',
              'brokerage account',
              'savings account'],
            correctAnswer: 3,
            explanation: 'A savings account typically offers the least compound growth. While savings accounts do offer compound interest, they generally have the lowest interest rates among these options. CDs typically offer higher interest rates than savings accounts, 401(k) accounts can invest in stocks and bonds that historically provide higher returns, and brokerage accounts allow for investment in a wide range of assets that can generate higher returns. Savings accounts are designed for safety and liquidity, not maximum growth.'},
          {
            id: 'quiz-11-4-4',
            question: 'The most powerful way to grow your money is by keeping it in an account that offers compound growth. Among the accounts listed, which accounts have compound growth?',
            options: [
              'checking account',
              'digital wallet (Venmo)',
              'Individual Retirement Accounts (IRA)',
              'savings account',
              'Certificate of Deposit (CD)'],
            correctAnswer: 2,
            explanation: 'Accounts that have compound growth include Individual Retirement Accounts (IRA), savings accounts, and Certificates of Deposit (CD). These accounts earn interest that compounds over time. Checking accounts and digital wallets like Venmo typically do not earn interest or offer compound growth - they are designed for transactions and holding money temporarily, not for growing wealth. IRAs, savings accounts, and CDs are investment or savings vehicles that generate returns through compound interest. Note: This question has multiple correct answers (C, D, and E), but the system requires selecting one. The answer provided (C) represents one of the three accounts with compound growth.'}]} as QuizContent]}];

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
        videoIndex: 0} as VideoContent,
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
          'Write goals down, review regularly']} as ArticleContent,
      {
        id: 'economics-u12-l1-quiz',
        type: 'quiz',
        title: 'Quiz: SMART goals',
        questions: [
          {
            id: 'quiz-12-1-1',
            question: 'SMART is a way of making goals that help you achieve what you want. SMART stands for five words that start with the letters S, M, A, R, and T. Each word tells you something important about your goal. What does the A in SMART stand for?',
            options: [
              'Aggressive',
              'Achievable',
              'Accountable',
              'Adjustable'],
            correctAnswer: 1,
            explanation: 'The A in SMART stands for Achievable. A SMART goal must be Achievable, meaning it should be realistic and attainable given your resources, skills, and circumstances. An achievable goal is one that you can actually accomplish, not one that is impossible or requires resources you don\'t have. This ensures that your goal is within reach and motivates you to work toward it rather than setting you up for failure.'},
          {
            id: 'quiz-12-1-2',
            question: 'Written below is an example of a financial goal that could be made into a SMART goal: "I want to buy a car". Which of the following would make this goal more specific (the S in SMART)?',
            options: [
              'I want to buy a car someday.',
              'I want to buy a used Toyota Camry for $15,000 by December 2024.',
              'I want to buy a car when I have enough money.',
              'I want to buy a nice car.'],
            correctAnswer: 1,
            explanation: 'To make the goal "I want to buy a car" more specific (the S in SMART), you should include details like the type of car, the price, and a deadline. "I want to buy a used Toyota Camry for $15,000 by December 2024" is specific because it clearly states what you want (used Toyota Camry), how much it costs ($15,000), and when you want to achieve it (December 2024). This makes the goal measurable, achievable, relevant, and time-bound as well.'},
          {
            id: 'quiz-12-1-3',
            question: 'When we make goals, we can use the word SMART to check if they are good goals or if they need to be improved. Which of these is a SMART financial goal?',
            options: [
              'I want to pay off my student loans, my car loan, and my credit card debt.',
              'I want to spend less on entertainment.',
              'I want to create a budget and stick to it for three months.',
              'I want to increase my income.'],
            correctAnswer: 2,
            explanation: 'A SMART financial goal is "I want to create a budget and stick to it for three months." This goal is Specific (create a budget and stick to it), Measurable (you can track whether you\'re following the budget), Achievable (creating and following a budget is realistic), Relevant (budgeting is important for financial health), and Time-bound (three months provides a clear deadline). The other options are too vague or lack specific, measurable, or time-bound elements.'},
          {
            id: 'quiz-12-1-4',
            question: 'For a goal to be a SMART goal, it needs to be Specific, Measurable, Achievable, Realistic, and Time-bound. Which of these is an example of a realistic goal?',
            options: [
              'I want to invest in the stock market and make huge profits.',
              'I want to buy a private island.',
              'I want to win the jackpot in a casino.',
              'I want to create a budget and stick to it every month.'],
            correctAnswer: 3,
            explanation: 'An example of a realistic goal is "I want to create a budget and stick to it every month." This goal is realistic because creating and following a budget is achievable for most people with proper planning and discipline. It doesn\'t require extraordinary resources or luck. In contrast, "making huge profits" in the stock market is uncertain and depends on market conditions, buying a private island is unrealistic for most people due to extreme cost, and winning a casino jackpot relies entirely on luck, not effort or planning.'}]} as QuizContent]},
  {
    id: 'lesson-12-2',
    title: 'Short, medium, and long term goals',
    duration: '40 min',
    contentItems: [
      {
        id: 'economics-u12-l2-video-1',
        type: 'video',
        title: 'Short, medium, and long term goals',
        videoIndex: 0} as VideoContent,
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
          'Prioritize and plan']} as ArticleContent,
      {
        id: 'economics-u12-l2-quiz',
        type: 'quiz',
        title: 'Quiz: Short, medium, and long term goals',
        questions: [
          {
            id: 'quiz-12-2-1',
            question: 'Financial goals can be short, medium or long term. What is a short term financial goal?',
            options: [
              'A goal that you want to achieve in more than five years.',
              'A goal that you want to achieve in less than a year.',
              'A goal that you want to achieve at any time.',
              'A goal that you want to achieve in one to five years.'],
            correctAnswer: 1,
            explanation: 'A short term financial goal is a goal that you want to achieve in less than a year. Short term goals are typically things you want to accomplish relatively quickly, such as building an emergency fund, saving for a vacation, or paying off a small debt. Medium term goals are typically one to five years, and long term goals are more than five years.'},
          {
            id: 'quiz-12-2-2',
            question: 'A financial plan consists of four main components: a budget, a savings plan, a debt repayment plan, and an investment plan. Romero makes $4,000 a month as an engineer. Each month he does the following: He puts $500 in a retirement account, he puts $200 in a savings account for a vacation, he spends $2,000 on rent, food, and bills, and he pays $300 a month towards his student loan debt of $22,000. Where does the $500 he puts in the retirement account go in his plan?',
            options: [
              'savings plan',
              'budget',
              'investment plan',
              'debt repayment plan'],
            correctAnswer: 2,
            explanation: 'The $500 Romero puts in the retirement account goes in his investment plan. A retirement account is a type of investment account where money is invested for long-term growth to provide income during retirement. While it involves saving money, its primary purpose is long-term growth through investment in stocks, bonds, and other assets, distinguishing it from a general savings plan (like saving for a vacation). Retirement accounts are specifically designed for investment and wealth building over time.'},
          {
            id: 'quiz-12-2-3',
            question: 'Ayesha received her tax refund and wants to put it aside to use for a down payment on a car that she will buy in a year or two. What would be a good place for Ayesha to put her money in, knowing her timeline for this goal?',
            options: [
              'stocks or bonds',
              'a CD (certificate of deposit)',
              'a bank account'],
            correctAnswer: 1,
            explanation: 'A CD (certificate of deposit) would be a good place for Ayesha to put her money. Since Ayesha plans to buy a car in one to two years, this is a medium-term goal. A CD offers higher interest rates than a regular savings account while keeping the money safe and accessible within her timeline. Stocks or bonds carry more risk and volatility, which is not ideal for a goal with a specific timeline of one to two years. A regular bank account is safe but typically offers lower interest rates than a CD.'},
          {
            id: 'quiz-12-2-4',
            question: 'Short, medium, and long term goals are different types of financial goals that you set for yourself based on how much time, money, and risk you need to achieve them. What is an example of a long term goal?',
            options: [
              'opening a savings account',
              'paying off a house',
              'saving for a down payment on a car'],
            correctAnswer: 1,
            explanation: 'Paying off a house is an example of a long term goal. Long term financial goals typically take more than five years to achieve and often involve significant amounts of money. Paying off a mortgage usually takes 15-30 years, making it a classic long term goal. Opening a savings account is not a goal itself, but a tool for achieving goals. Saving for a down payment on a car is typically a short to medium term goal (usually achievable within a few years).'}]} as QuizContent]},
  {
    id: 'lesson-12-3',
    title: 'Net worth',
    duration: '35 min',
    contentItems: [
      {
        id: 'economics-u12-l3-video-1',
        type: 'video',
        title: 'Net worth',
        videoIndex: 0} as VideoContent,
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
          'Track over time']} as ArticleContent,
      {
        id: 'economics-u12-l3-quiz',
        type: 'quiz',
        title: 'Quiz: Net worth',
        questions: [
          {
            id: 'quiz-12-3-1',
            question: 'Knowing what your assets are is important when you\'re working out your net worth. Which of these are assets?',
            options: [
              'your job',
              'home you own',
              'cash in your wallet',
              'car loan'],
            correctAnswer: 1,
            explanation: 'Assets include a home you own and cash in your wallet. Assets are things you own that have value. A home you own is a valuable asset, and cash in your wallet is also an asset. Your job is not an asset - it\'s a source of income. A car loan is a liability (a debt you owe), not an asset. Note: This question has multiple correct answers (B and C), but the system requires selecting one. The answer provided (B) represents one of the two assets.'},
          {
            id: 'quiz-12-3-2',
            question: 'As part of finishing a project, you need to borrow your friends tools. Your friend agrees to loan them to you for the day. What will happen to your net worth while you use these tools?',
            options: [
              'This action will lower your net worth.',
              'This action will raise your net worth.',
              'This action does not change your net worth.'],
            correctAnswer: 2,
            explanation: 'This action does not change your net worth. Net worth is calculated as your assets (what you own) minus your liabilities (what you owe). Since the tools are borrowed and not owned by you, they are not your assets. You don\'t own them, so they don\'t add to your assets or liabilities. Your net worth remains unchanged because you haven\'t acquired any new assets or taken on any new liabilities.'},
          {
            id: 'quiz-12-3-3',
            question: 'Imagine you are looking at the following situation:\n\nAssets: used car $2,000, laptop $1,000, timeshares $500. Total assets: $3,500.\nLiabilities: student loan $1,500, medical bill $500, credit cards $300. Total liabilities: $2,300.\n\nWhat is the net worth in this scenario?',
            options: [
              '$1,200',
              '$2,300',
              '$3,500',
              '$5,800'],
            correctAnswer: 0,
            explanation: 'The net worth in this scenario is $1,200. Net worth is calculated as Total Assets minus Total Liabilities. In this case: Total Assets ($3,500) - Total Liabilities ($2,300) = $1,200. This represents the value of what you own after subtracting what you owe.'},
          {
            id: 'quiz-12-3-4',
            question: 'Before you can calculate your net worth, you must know what your liabilities are. Which of these are liabilities?',
            options: [
              'lottery tickets',
              'personal loans',
              'personal belongings',
              'a gift you plan to give'],
            correctAnswer: 1,
            explanation: 'Personal loans are liabilities. Liabilities are debts or obligations you owe to others. A personal loan is money you borrowed and must repay, making it a liability. Lottery tickets are not liabilities - they are either worthless or assets if they win. Personal belongings are assets (things you own), not liabilities. A gift you plan to give is not a liability until you actually owe it, and even then, it\'s not a financial liability in the accounting sense.'}]} as QuizContent]}];

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
        videoIndex: 0} as VideoContent,
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
          'Balance: income = expenses + savings']} as ArticleContent,
      {
        id: 'economics-u13-l1-quiz',
        type: 'quiz',
        title: 'Quiz: Budgeting',
        questions: [
          {
            id: 'quiz-13-1-1',
            question: 'According to the 50/30/20 rule, what percentage of your income should you allocate to needs?',
            options: [
              '50%',
              '30%',
              '20%'],
            correctAnswer: 0,
            explanation: 'According to the 50/30/20 rule, 50% of your income should be allocated to needs. The 50/30/20 rule is a budgeting guideline that suggests dividing your after-tax income into three categories: 50% for needs (essential expenses like housing, food, utilities, transportation, insurance), 30% for wants (non-essential expenses like entertainment, dining out, hobbies), and 20% for savings and debt repayment.'},
          {
            id: 'quiz-13-1-2',
            question: 'You have a monthly income of $4,000. You plan to follow the 50/30/20 rule for budgeting. How much of your monthly income should be going towards needs?',
            options: [
              '$800',
              '$1,200',
              '$1,600',
              '$2,000'],
            correctAnswer: 3,
            explanation: 'According to the 50/30/20 rule, $2,000 of your monthly income should go towards needs. This is calculated as 50% of $4,000 = $2,000. Needs include essential expenses like housing, food, utilities, transportation, and insurance. The remaining $2,000 would be split between wants (30% = $1,200) and savings/debt repayment (20% = $800).'},
          {
            id: 'quiz-13-1-3',
            question: 'The 50/30/20 rule describes how much a person should be budgeting for their needs, wants, and savings. Which of the following expenses is a savings according to the 50/30/20 rule?',
            options: [
              'clothing purchases',
              'credit card payments',
              'magazine subscription',
              'retirement contributions'],
            correctAnswer: 3,
            explanation: 'Retirement contributions are savings according to the 50/30/20 rule. The 20% category includes savings and debt repayment, which encompasses retirement contributions, emergency fund savings, investments, and paying down debt. Clothing purchases and magazine subscriptions are wants (30% category), while credit card payments could be either needs (if paying minimum payments on essential expenses) or savings/debt repayment (if paying down debt beyond minimums).'},
          {
            id: 'quiz-13-1-4',
            question: 'What should 20% of your income go towards, if you are following the 50/30/20 rule?',
            options: [
              'wants',
              'savings',
              'needs'],
            correctAnswer: 1,
            explanation: 'If you are following the 50/30/20 rule, 20% of your income should go towards savings. The 50/30/20 rule divides your after-tax income as follows: 50% for needs (essential expenses), 30% for wants (non-essential expenses), and 20% for savings and debt repayment. This 20% category includes retirement contributions, emergency fund savings, investments, and paying down debt beyond minimum payments.'}]} as QuizContent]},
  {
    id: 'lesson-13-2',
    title: 'Saving money',
    duration: '50 min',
    contentItems: [
      {
        id: 'economics-u13-l2-video-1',
        type: 'video',
        title: 'Saving money',
        videoIndex: 0} as VideoContent,
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
          'Start small, be consistent']} as ArticleContent,
      {
        id: 'economics-u13-l2-quiz',
        type: 'quiz',
        title: 'Quiz: Saving money',
        questions: [
          {
            id: 'quiz-13-2-1',
            question: 'You\'re working on building your emergency fund. Your total living expenses are $2,200 per month. You\'re hoping to save enough for six months of expenses, and you\'re currently saving $1,100 each month. How long will it take you to fill your emergency fund if you continue saving at the same rate?',
            options: [
              '6 months',
              '10 months',
              '12 months',
              '18 months'],
            correctAnswer: 2,
            explanation: 'It will take you 12 months to fill your emergency fund. First, calculate your target emergency fund amount: $2,200 per month × 6 months = $13,200. Then, divide this target amount by your monthly savings rate: $13,200 ÷ $1,100 per month = 12 months. This means if you continue saving $1,100 each month, you will reach your goal of six months of expenses in 12 months.'},
          {
            id: 'quiz-13-2-2',
            question: 'An emergency fund helps you keep your home and pay essentials like rent or mortgage, car payments, and utilities during emergencies. To start building an emergency fund, which type of expenses should you start adding up first?',
            options: [
              'unplanned expenses',
              'living expenses',
              'wants'],
            correctAnswer: 1,
            explanation: 'To start building an emergency fund, you should start adding up living expenses first. Living expenses are your essential monthly costs like rent or mortgage, utilities, groceries, insurance, transportation, and other necessities. These are the expenses you need to cover during an emergency, so calculating your total monthly living expenses is the first step in determining how much you need in your emergency fund. Unplanned expenses are unpredictable, and wants are non-essential, so they shouldn\'t be the primary focus when building an emergency fund.'},
          {
            id: 'quiz-13-2-3',
            question: 'You are building your emergency fund and are writing down your monthly expenses:\n\nExpense | Amount\nRent | $1,050\nUtilities | $208\nCar payment | $453\nInsurance | $85\nGroceries | $600\nPhone & internet | $104\nTOTAL | $2,500\n\nYour goal is to have six months of expenses in your emergency fund. How much money should you have in your emergency fund to meet your goal?',
            options: [
              '$2,500',
              '$5,000',
              '$12,500',
              '$15,000'],
            correctAnswer: 3,
            explanation: 'You should have $15,000 in your emergency fund to meet your goal. Your total monthly expenses are $2,500. To have six months of expenses saved, multiply your monthly expenses by 6: $2,500 × 6 = $15,000. This amount will cover your essential living expenses for six months in case of an emergency, such as job loss or unexpected medical expenses.'}]} as QuizContent]},
  {
    id: 'lesson-13-3',
    title: 'Reducing expenses',
    duration: '40 min',
    contentItems: [
      {
        id: 'economics-u13-l3-video-1',
        type: 'video',
        title: 'Reducing expenses',
        videoIndex: 0} as VideoContent,
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
          'Track spending, cut wants, negotiate']} as ArticleContent,
      {
        id: 'economics-u13-l3-quiz',
        type: 'quiz',
        title: 'Quiz: Reducing expenses',
        questions: [
          {
            id: 'quiz-13-3-1',
            question: 'Why is it important to pay attention to the per unit pricing when grocery shopping?',
            options: [
              'It helps you plan out your shopping list.',
              'It\'s not really important, it\'s just another piece of information.',
              'It allows you to compare prices across different sizes and brands.'],
            correctAnswer: 2,
            explanation: 'It is important to pay attention to per unit pricing because it allows you to compare prices across different sizes and brands. Per unit pricing (such as price per ounce, pound, or item) helps you determine which product offers the best value, regardless of package size. A larger package isn\'t always cheaper per unit, so comparing per unit prices helps you make informed purchasing decisions and save money.'},
          {
            id: 'quiz-13-3-2',
            question: 'A bottle contains 20 ounces of ice tea and costs $1.69. What is the cost per ounce? Round your answer to the nearest whole cent.',
            options: [
              '$0.07',
              '$0.08',
              '$0.09',
              '$0.10'],
            correctAnswer: 1,
            explanation: 'The cost per ounce is $0.08. To calculate the cost per ounce, divide the total cost by the number of ounces: $1.69 ÷ 20 ounces = $0.0845 per ounce. Rounding to the nearest whole cent gives $0.08 per ounce. This per unit price helps you compare the value of this product with other sizes or brands of ice tea.'}]} as QuizContent]}];

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
        videoIndex: 0} as VideoContent,
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
          'Diversification: spreads risk']} as ArticleContent,
      {
        id: 'economics-u14-l1-quiz',
        type: 'quiz',
        title: 'Quiz: Risk and return',
        questions: [
          {
            id: 'quiz-14-1-1',
            question: 'Complete the following statement, correctly describing the relationship between risk and return: "Investments that are considered ______ risk are said to have a potential for high return."',
            options: [
              'low',
              'high',
              'moderate',
              'no'],
            correctAnswer: 1,
            explanation: 'Investments that are considered high risk are said to have a potential for high return. This describes the fundamental relationship between risk and return in investing: higher risk investments have the potential for higher returns, while lower risk investments typically offer lower returns. This is because investors require greater compensation (higher returns) for taking on more risk. High-risk investments like stocks or startup companies can generate significant returns, but they also carry a greater chance of loss.'},
          {
            id: 'quiz-14-1-2',
            question: 'You are thinking about installing an air freshener vending machine at a car wash. The manufacturer of the machine claims that you can expect a 25% to 40% ROI with this investment. Based on the ROI, would this be a good investment?',
            options: [
              'yes, because ROI is positive and higher than 7%',
              'no, this ROI is not high enough',
              'no, anything less than 100% ROI is a loss'],
            correctAnswer: 0,
            explanation: 'Yes, this would be a good investment because the ROI is positive and higher than 7%. A 25% to 40% ROI is considered excellent, as it significantly exceeds typical investment returns. For comparison, the historical average return of the stock market is around 7-10% annually. A positive ROI means you\'re making money on your investment, and a 25-40% return is well above average. The idea that anything less than 100% ROI is a loss is incorrect - any positive ROI means you\'re earning a profit.'},
          {
            id: 'quiz-14-1-3',
            question: 'Diversification is often seen as one of the most important strategies for investors. What is the primary reason to diversify your investment portfolio?',
            options: [
              'to raise the risk and return of your investments',
              'to lower the risk and increase the return of your investments',
              'to make sure you only invest in high-return options'],
            correctAnswer: 1,
            explanation: 'The primary reason to diversify your investment portfolio is to lower the risk and increase the return of your investments. Diversification means spreading your investments across different asset classes, industries, and geographic regions. This reduces risk because if one investment performs poorly, others may perform well, balancing out your overall returns. By not putting all your eggs in one basket, you can achieve better risk-adjusted returns - potentially higher returns with lower overall risk compared to investing in a single asset.'},
          {
            id: 'quiz-14-1-4',
            question: 'Different types of investments have different levels of risk and return, and you should choose the option that best matches your goals and risk tolerance. You have $500 to invest. Which investment option has the lowest risk?',
            options: [
              'government bonds',
              'a new business stocks',
              'a well-established company\'s stocks'],
            correctAnswer: 0,
            explanation: 'Government bonds have the lowest risk among these options. Government bonds are debt securities issued by governments and are considered one of the safest investments because they are backed by the full faith and credit of the government. They offer predictable returns and low risk of default. In contrast, stocks (whether from new businesses or well-established companies) carry higher risk because their value can fluctuate significantly based on market conditions, company performance, and economic factors. New business stocks are typically riskier than established company stocks, but both are riskier than government bonds.'}]} as QuizContent]},
  {
    id: 'lesson-14-2',
    title: 'Planning for retirement',
    duration: '50 min',
    contentItems: [
      {
        id: 'economics-u14-l2-video-1',
        type: 'video',
        title: 'Planning for retirement',
        videoIndex: 0} as VideoContent,
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
          'Healthcare major expense']} as ArticleContent,
      {
        id: 'economics-u14-l2-quiz',
        type: 'quiz',
        title: 'Quiz: Planning for retirement',
        questions: [
          {
            id: 'quiz-14-2-1',
            question: 'Retirement is a time in life when people stop working and need to have enough money saved to cover their expenses. Which of these is a main retirement expense?',
            options: [
              'going on a seniors-only cruise',
              'saving for grandchildren\'s education',
              'long term care'],
            correctAnswer: 2,
            explanation: 'Long term care is a main retirement expense. As people age, they may need assistance with daily activities, medical care, or living in assisted living facilities or nursing homes. Long term care can be one of the most significant expenses in retirement and should be planned for. While going on cruises and saving for grandchildren\'s education may be goals, they are not main retirement expenses that everyone must plan for.'},
          {
            id: 'quiz-14-2-2',
            question: 'Saving money for retirement is important, but there are other strategies you can use to increase your retirement income. Which of the following strategies can help you increase your income in retirement?',
            options: [
              'moving to warmer climate to improve your quality of life',
              'retire as early as possible',
              'working part-time'],
            correctAnswer: 2,
            explanation: 'Working part-time can help you increase your income in retirement. Many retirees choose to work part-time to supplement their retirement savings and Social Security benefits. This provides additional income while allowing flexibility and the ability to stay active. Moving to a warmer climate may improve quality of life but doesn\'t directly increase income. Retiring as early as possible actually reduces income by shortening the time you can save and earn money.'},
          {
            id: 'quiz-14-2-3',
            question: 'When planning for retirement, it is important to be aware of future challenges. How can inflation affect your retirement savings?',
            options: [
              'Inflation only affects the value of your savings if you invest in stocks.',
              'Inflation can decrease the value of your savings over time.',
              'Inflation can increase the value of your savings over time.'],
            correctAnswer: 1,
            explanation: 'Inflation can decrease the value of your savings over time. Inflation is the general increase in prices over time, which means the same amount of money will buy fewer goods and services in the future. If your retirement savings don\'t grow at a rate that matches or exceeds inflation, your purchasing power decreases. This is why it\'s important to invest retirement savings in assets that can grow faster than inflation, such as stocks, bonds, or other investments, not just keep money in low-interest savings accounts.'},
          {
            id: 'quiz-14-2-4',
            question: 'Food is an important expense during retirement, and it includes grocery shopping, dining out, and other food-related costs. Which of the following situations would help decrease your food expenses in retirement?',
            options: [
              'having food delivered so you don\'t have to pay for gas',
              'shopping for groceries in bulk',
              'eating out at restaurants so you don\'t have to buy any groceries'],
            correctAnswer: 1,
            explanation: 'Shopping for groceries in bulk would help decrease your food expenses in retirement. Buying items in larger quantities typically costs less per unit, which can reduce overall food costs. Having food delivered often includes delivery fees and service charges that increase costs. Eating out at restaurants is generally more expensive than cooking at home, so it would increase rather than decrease food expenses.'}]} as QuizContent]},
  {
    id: 'lesson-14-3',
    title: 'Saving for retirement',
    duration: '35 min',
    contentItems: [
      {
        id: 'economics-u14-l3-video-1',
        type: 'video',
        title: 'Saving for retirement',
        videoIndex: 0} as VideoContent,
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
          'Not enough alone, need additional savings']} as ArticleContent,
      {
        id: 'economics-u14-l3-quiz',
        type: 'quiz',
        title: 'Quiz: Saving for retirement',
        questions: [
          {
            id: 'quiz-14-3-1',
            question: 'Social Security plays a crucial role in the financial well-being of millions of Americans. What type of benefits does Social Security provide?',
            options: [
              'survivor benefits',
              'medical benefits',
              'disability benefits',
              'retirement benefits'],
            correctAnswer: 3,
            explanation: 'Social Security provides survivor benefits, disability benefits, and retirement benefits. Survivor benefits are paid to family members of deceased workers, disability benefits are paid to workers who become disabled, and retirement benefits are paid to workers who reach retirement age. Medical benefits are provided through Medicare, which is a separate program from Social Security, though they are often discussed together. Note: This question has multiple correct answers (A, C, and D), but the system requires selecting one. The answer provided (D) represents one of the three types of Social Security benefits.'},
          {
            id: 'quiz-14-3-2',
            question: 'Let\'s assume you are currently working and paying into Social Security. At one point, the government may decide to lower the benefit amount to address the shrinking of the Social Security fund. How will this decision affect your finances and retirement planning?',
            options: [
              'You will be able to retire earlier with the same benefits.',
              'You may need to save more on your own for retirement.',
              'You will receive larger monthly Social Security payments.',
              'You will stop paying into Social Security earlier.'],
            correctAnswer: 1,
            explanation: 'If the government lowers Social Security benefit amounts, you may need to save more on your own for retirement. Social Security is designed to supplement retirement income, not be the sole source. If benefits are reduced, you would receive less money from Social Security in retirement, which means you would need to rely more on your personal savings, investments, and other retirement accounts (like 401(k) or IRA) to maintain your desired standard of living. This makes personal retirement savings even more important.'},
          {
            id: 'quiz-14-3-3',
            question: 'Social Security is at risk of running out of funds because more people are retiring and fewer workers are paying into it. How may the government address this problem?',
            options: [
              'increase payroll taxes',
              'let people retire earlier',
              'lower the benefit amount',
              'reduce payroll taxes'],
            correctAnswer: 0,
            explanation: 'The government may address the Social Security funding problem by increasing payroll taxes and/or lowering the benefit amount. Increasing payroll taxes would bring more revenue into the Social Security trust fund, while lowering benefits would reduce the amount paid out. Letting people retire earlier would worsen the problem by increasing the number of beneficiaries and reducing the number of workers paying into the system. Reducing payroll taxes would make the funding problem worse by decreasing revenue. Note: This question has multiple correct answers (A and C), but the system requires selecting one. The answer provided (A) represents one of the two potential solutions.'}]} as QuizContent]}];

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
        videoIndex: 0} as VideoContent,
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
          'Bad: high rates, debt risk, fees']} as ArticleContent,
      {
        id: 'economics-u15-l1-quiz',
        type: 'quiz',
        title: 'Quiz: Credit cards',
        questions: [
          {
            id: 'quiz-15-1-1',
            question: 'The Schumer box is a table that appears in credit card agreements. What is the main purpose of a Schumer box?',
            options: [
              'to show the benefits and rewards of using the card',
              'to disclose the payment amount and due date of the card',
              'to highlight the most important fees and interest rates of the card'],
            correctAnswer: 2,
            explanation: 'The main purpose of a Schumer box is to highlight the most important fees and interest rates of the card. The Schumer box is a standardized disclosure table required by law that clearly presents key credit card terms including the Annual Percentage Rate (APR), annual fees, grace period, balance transfer fees, late fees, and other important costs. This allows consumers to easily compare credit cards and understand the costs associated with using the card.'},
          {
            id: 'quiz-15-1-2',
            question: 'Compare two credit cards:\n\nCredit card A: APR 16.99%, Grace period 28 days, Balance transfer fee 3% of the amount transferred, Late fee $20, Foreign transaction fee $0\n\nCredit card B: APR 12.99%, Grace period 31 days, Balance transfer fee 2% of the amount transferred, Late fee $30, Foreign transaction fee $1.00 per transaction\n\nEmmanuel is looking to move the balance from his current card to a new credit card. His concern is the lowest cost for this type of transaction. Which credit card is the best choice for Emmanuel?',
            options: [
              'credit card A',
              'credit card B'],
            correctAnswer: 1,
            explanation: 'Credit card B is the best choice for Emmanuel. Since Emmanuel\'s main concern is the lowest cost for a balance transfer, he should focus on the balance transfer fee. Credit card A charges 3% of the amount transferred, while Credit card B charges only 2% of the amount transferred. This makes Credit card B the better choice for balance transfers, as it will cost less to transfer the same balance amount.'},
          {
            id: 'quiz-15-1-3',
            question: 'A credit card\'s Schumer box shows: Annual Percentage Rate (APR) 20.99%, Grace period 30 days, Annual fee $55, Foreign transaction fee 3% of the purchase amount. Sky is considering signing up for this credit card for emergencies. Their main concern is any fees associated with having the card. Sky explicitly states that they do not travel internationally and do not plan on having a balance on the card. Which row of the Schumer box is relevant to Sky as they pick a credit card?',
            options: [
              'Annual Percentage Rate (APR)',
              'grace period',
              'annual fee',
              'foreign transaction fee'],
            correctAnswer: 2,
            explanation: 'The annual fee is the most relevant row of the Schumer box for Sky. Since Sky does not travel internationally, the foreign transaction fee won\'t apply. Since Sky does not plan on having a balance on the card, the APR won\'t matter (APR only applies when you carry a balance). The grace period is also not relevant if they\'re not carrying a balance. However, the annual fee of $55 is a fee that will be charged simply for having the card, regardless of usage, which directly addresses Sky\'s concern about fees associated with having the card.'},
          {
            id: 'quiz-15-1-4',
            question: 'A Schumer box lists the main information about a credit card, such as its APR, grace period, and minimum payment. What is meant by the term minimum payment?',
            options: [
              'It is the smallest amount you can pay each month to keep your account in good standing.',
              'It is the amount you need to fully pay off your balance each month.',
              'It is the annual fee associated with your credit card.'],
            correctAnswer: 0,
            explanation: 'The minimum payment is the smallest amount you can pay each month to keep your account in good standing. This is the minimum amount required by the credit card company to avoid late fees and maintain your account in good standing. However, paying only the minimum payment means you\'ll carry a balance and pay interest on the remaining amount. To avoid interest charges, you would need to pay the full balance each month, which is different from the minimum payment.'}]} as QuizContent]},
  {
    id: 'lesson-15-2',
    title: 'Credit score',
    duration: '50 min',
    contentItems: [
      {
        id: 'economics-u15-l2-video-1',
        type: 'video',
        title: 'Credit score',
        videoIndex: 0} as VideoContent,
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
          'Takes time to improve']} as ArticleContent,
      {
        id: 'economics-u15-l2-quiz',
        type: 'quiz',
        title: 'Quiz: Credit score',
        questions: [
          {
            id: 'quiz-15-2-1',
            question: 'Banks rely on credit scores to determine if a person qualifies for a loan, and which interest rate to offer to them. Which of these credit scores would result in the highest interest rate on a loan?',
            options: [
              '250',
              '350',
              '825'],
            correctAnswer: 0,
            explanation: 'A credit score of 250 would result in the highest interest rate on a loan. Credit scores typically range from 300 to 850, with higher scores indicating better creditworthiness. A score of 250 is extremely low and indicates very poor credit, which means the borrower is considered high risk. Banks charge higher interest rates to compensate for this increased risk. A score of 350 is also very poor, but slightly better than 250. A score of 825 is excellent and would result in the lowest interest rates.'},
          {
            id: 'quiz-15-2-2',
            question: 'Many factors go into the calculation of a credit score. What is one factor that affects your credit score?',
            options: [
              'your payment history',
              'your marital status',
              'your income level'],
            correctAnswer: 0,
            explanation: 'Your payment history is one factor that affects your credit score. Payment history is actually one of the most important factors, typically accounting for about 35% of your credit score. It shows whether you pay your bills on time and how consistently you meet your financial obligations. Your marital status and income level are not factors used in calculating credit scores. Credit scores are based on your credit behavior, not personal information like marital status or income.'},
          {
            id: 'quiz-15-2-3',
            question: 'Each credit score number has a matching rating. What credit rating does a score of 780 represent?',
            options: [
              'good',
              'very good',
              'fair'],
            correctAnswer: 1,
            explanation: 'A credit score of 780 represents a "very good" credit rating. Credit score ranges are typically categorized as: Poor (300-579), Fair (580-669), Good (670-739), Very Good (740-799), and Excellent (800-850). A score of 780 falls within the "Very Good" range (740-799), which indicates strong creditworthiness and typically qualifies borrowers for favorable interest rates and loan terms.'}]} as QuizContent]}];

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
        videoIndex: 0} as VideoContent,
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
          'Lower APR = less cost']} as ArticleContent,
      {
        id: 'economics-u16-l1-quiz',
        type: 'quiz',
        title: 'Quiz: Terms of borrowing',
        questions: [
          {
            id: 'quiz-16-1-1',
            question: 'A loan application will list APR, interest rate, loan term, and many other important points. What does the loan term refer to?',
            options: [
              'the amount of money borrowed',
              'the interest rate charged on the loan',
              'the length of time it takes to pay off the loan',
              'the monthly payment amount'],
            correctAnswer: 2,
            explanation: 'The loan term refers to the length of time it takes to pay off the loan. This is the period over which you agree to repay the borrowed money, typically expressed in months or years. For example, a 30-year mortgage has a loan term of 30 years, while a 5-year car loan has a loan term of 5 years. The loan term affects your monthly payment amount and total interest paid over the life of the loan.'},
          {
            id: 'quiz-16-1-2',
            question: 'Which of the following helps you determine the true cost of borrowing?',
            options: [
              'interest rate',
              'principal',
              'APR',
              'loan term'],
            correctAnswer: 2,
            explanation: 'APR (Annual Percentage Rate) helps you determine the true cost of borrowing. APR includes not only the interest rate but also additional fees and costs associated with the loan, such as origination fees, closing costs, and other charges. This gives you a more accurate picture of the total cost of borrowing compared to just the interest rate alone. The principal is the amount borrowed, and the loan term is the repayment period, but neither alone shows the true cost.'},
          {
            id: 'quiz-16-1-3',
            question: 'What is the name for an interest rate that can change based on market conditions?',
            options: [
              'variable interest rate',
              'fixed interest rate',
              'effective APR'],
            correctAnswer: 0,
            explanation: 'A variable interest rate is an interest rate that can change based on market conditions. Variable rates are tied to a benchmark interest rate (like the prime rate) and can fluctuate over time, meaning your monthly payments may increase or decrease. In contrast, a fixed interest rate remains constant throughout the loan term, providing predictable payments. Effective APR is a calculation that shows the true annual cost of borrowing, not a type of interest rate.'},
          {
            id: 'quiz-16-1-4',
            question: 'APR helps you understand the total cost of borrowing money because it includes the interest rate and additional fees. However, some costs are not included in the calculation of the APR, but can also add to the total cost of a loan. Select all terms that can increase the total cost of a loan.',
            options: [
              'cash advance fee',
              'rewards',
              'late fee',
              'grace period'],
            correctAnswer: 0,
            explanation: 'Terms that can increase the total cost of a loan include cash advance fees and late fees. Cash advance fees are charges for withdrawing cash from a credit card, and late fees are penalties for missing payment deadlines. Both add to the total cost of borrowing. Rewards are benefits you receive, not costs. A grace period is a benefit that allows you to avoid interest charges if you pay your balance in full, so it doesn\'t increase costs. Note: This question has multiple correct answers (A and C), but the system requires selecting one. The answer provided (A) represents one of the two terms that increase loan costs.'}]} as QuizContent]},
  {
    id: 'lesson-16-2',
    title: 'Borrowing money',
    duration: '60 min',
    contentItems: [
      {
        id: 'economics-u16-l2-video-1',
        type: 'video',
        title: 'Borrowing money',
        videoIndex: 0} as VideoContent,
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
          'Know your rights']} as ArticleContent,
      {
        id: 'economics-u16-l2-quiz',
        type: 'quiz',
        title: 'Quiz: Borrowing money',
        questions: [
          {
            id: 'quiz-16-2-1',
            question: 'Getting a loan usually requires meeting requirements established by the lender. Which of these factors are essential for getting a loan?',
            options: [
              'high income',
              'good credit score',
              'low debt-to-income ratio',
              'a high school diploma (or higher)'],
            correctAnswer: 1,
            explanation: 'Essential factors for getting a loan include a good credit score and a low debt-to-income ratio. A good credit score demonstrates your creditworthiness and history of repaying debts, which lenders use to assess risk. A low debt-to-income ratio shows that you have sufficient income relative to your existing debts, indicating you can afford additional loan payments. While high income can help, it\'s not always essential if other factors are strong. A high school diploma is not typically a requirement for loans. Note: This question has multiple correct answers (B and C), but the system requires selecting one. The answer provided (B) represents one of the two essential factors.'},
          {
            id: 'quiz-16-2-2',
            question: 'Certain lenders require collateral before approving a loan. What type of loans do not require collateral?',
            options: [
              'small loans',
              'apartment building loans',
              'car loans',
              'home loans'],
            correctAnswer: 0,
            explanation: 'Small loans typically do not require collateral. Unsecured loans, such as personal loans, credit cards, and small consumer loans, are based primarily on your creditworthiness rather than requiring you to pledge an asset as collateral. In contrast, secured loans like car loans (where the car is collateral), home loans (where the house is collateral), and apartment building loans (where the property is collateral) require collateral to secure the loan.'},
          {
            id: 'quiz-16-2-3',
            question: 'When people are in dire need for money, they may be tempted to take out a loan from a lender who doesn\'t have their best interests in mind. This is called "predatory lending". Which of the following statements describes predatory lending?',
            options: [
              'lending money to people who need it for emergencies or unexpected expenses',
              'lending money to people who want to start a business or invest in a project',
              'lending money at high interest rates to people who cannot afford to repay it'],
            correctAnswer: 2,
            explanation: 'Predatory lending is described as lending money at high interest rates to people who cannot afford to repay it. Predatory lenders take advantage of vulnerable borrowers by offering loans with extremely high interest rates, hidden fees, and terms that make it difficult or impossible for borrowers to repay. This traps borrowers in cycles of debt. Legitimate lending to people who need money for emergencies or want to start businesses is not predatory if it has fair terms and the borrower can afford it.'},
          {
            id: 'quiz-16-2-4',
            question: 'Borrowing from a predatory lender can have many outcomes. What\'s a result of borrowing from a predatory lender?',
            options: [
              'saving money on interest',
              'damaging your credit score',
              'reducing your debt'],
            correctAnswer: 1,
            explanation: 'A result of borrowing from a predatory lender is damaging your credit score. Predatory lenders typically charge extremely high interest rates and fees, making it very difficult for borrowers to make payments. When borrowers struggle to repay these loans, they may miss payments or default, which severely damages their credit score. Predatory loans do not save money on interest (they charge much higher rates) and do not reduce debt (they often trap borrowers in cycles of increasing debt).'}]} as QuizContent]},
  {
    id: 'lesson-16-3',
    title: 'Types of loans',
    duration: '30 min',
    contentItems: [
      {
        id: 'economics-u16-l3-video-1',
        type: 'video',
        title: 'Types of loans',
        videoIndex: 0} as VideoContent,
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
          'Unsecured: harder to get, no asset at risk']} as ArticleContent,
      {
        id: 'economics-u16-l3-quiz',
        type: 'quiz',
        title: 'Quiz: Types of loans',
        questions: [
          {
            id: 'quiz-16-3-1',
            question: 'Interest is the cost of borrowing money, and different loans have different interest rates based on risk, duration, and lender terms. Which of these has the lowest interest rate?',
            options: [
              'mortgage',
              'secured credit card',
              'personal loan',
              'unsecured credit card'],
            correctAnswer: 0,
            explanation: 'A mortgage typically has the lowest interest rate among these options. Mortgages are secured loans backed by real estate (the house), which reduces the lender\'s risk. This lower risk allows lenders to offer lower interest rates. Secured credit cards, personal loans, and unsecured credit cards are generally unsecured or have less valuable collateral, making them riskier for lenders and resulting in higher interest rates.'},
          {
            id: 'quiz-16-3-2',
            question: 'Barbara has a high credit score and qualifies for an unsecured loan. But, for her latest home improvement, she went with a secured loan, instead. What makes unsecured loans unattractive to borrowers like Barbara?',
            options: [
              'smaller loan amounts',
              'high security deposit',
              'high interest rates',
              'collateral requirement'],
            correctAnswer: 2,
            explanation: 'High interest rates make unsecured loans unattractive to borrowers like Barbara. Unsecured loans don\'t require collateral, which means lenders face higher risk. To compensate for this risk, lenders charge higher interest rates on unsecured loans compared to secured loans. While Barbara qualifies for an unsecured loan, she chose a secured loan (likely a home equity loan) because it offers lower interest rates, making it more cost-effective for her home improvement project.'},
          {
            id: 'quiz-16-3-3',
            question: 'Complete the statement: "Among all types of loans, unsecured loans have the ______ costs because they ______ collateral."',
            options: [
              'lowest; require',
              'highest; do not require',
              'moderate; sometimes require',
              'lowest; do not require'],
            correctAnswer: 1,
            explanation: 'The correct statement is: "Among all types of loans, unsecured loans have the highest costs because they do not require collateral." Unsecured loans have higher interest rates and fees because lenders take on more risk when there\'s no collateral to secure the loan. Without collateral, if a borrower defaults, the lender has less recourse to recover their money. This increased risk is reflected in higher costs for borrowers.'}]} as QuizContent]},
  {
    id: 'lesson-16-4',
    title: 'Debt',
    duration: '60 min',
    contentItems: [
      {
        id: 'economics-u16-l4-video-1',
        type: 'video',
        title: 'Debt',
        videoIndex: 0} as VideoContent,
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
          'Debt management: budget, prioritize, avoid new debt']} as ArticleContent,
      {
        id: 'economics-u16-l4-quiz',
        type: 'quiz',
        title: 'Quiz: Debt',
        questions: [
          {
            id: 'quiz-16-4-1',
            question: 'What is the snowball method of debt repayment?',
            options: [
              'paying off debts with the highest interest rate first',
              'paying off debts from the smallest balance to the largest balance',
              'only making minimum payments on all debts',
              'ignoring debt payments'],
            correctAnswer: 1,
            explanation: 'The snowball method of debt repayment involves paying off debts from the smallest balance to the largest balance. You make minimum payments on all debts, then put any extra money toward the debt with the smallest balance. Once that debt is paid off, you move to the next smallest balance, and so on. This method provides psychological motivation through quick wins, as you see debts being eliminated faster, even though it may not save the most money in interest.'},
          {
            id: 'quiz-16-4-2',
            question: 'Below is a table of the loans you have currently taken out with their balance and interest rate:\n\nType of loan | Balance | Interest rate\nMortgage | $100,000 | 5%\nPersonal loan | $7,000 | 7.5%\nAuto loan | $12,000 | 11%\n\nIf you are following the high rate method, which loan should you pay off first?',
            options: [
              'mortgage',
              'auto loan',
              'personal loan'],
            correctAnswer: 1,
            explanation: 'If you are following the high rate method, you should pay off the auto loan first. The high rate method (also called the avalanche method) focuses on paying off debts with the highest interest rates first to minimize total interest paid. The auto loan has the highest interest rate at 11%, followed by the personal loan at 7.5%, and the mortgage at 5%. By paying off the highest interest rate debt first, you save the most money in interest charges over time.'},
          {
            id: 'quiz-16-4-3',
            question: 'Paying off debt is an important step towards financial freedom. There are two popular methods for repaying debt: the snowball method and the high rate method. Which method saves you more money?',
            options: [
              'snowball method',
              'high rate method'],
            correctAnswer: 1,
            explanation: 'The high rate method saves you more money. The high rate method (also called the avalanche method) focuses on paying off debts with the highest interest rates first, which minimizes the total interest you pay over time. The snowball method pays off debts from smallest to largest balance, which can provide psychological motivation but typically results in paying more interest overall, especially if smaller balances have lower interest rates than larger balances.'},
          {
            id: 'quiz-16-4-4',
            question: 'Complete the following statement: "The high rate method focuses on paying off debts with the ______ ______ first."',
            options: [
              'lowest; interest rate',
              'highest; interest rate',
              'smallest; balance',
              'largest; balance'],
            correctAnswer: 1,
            explanation: 'The correct statement is: "The high rate method focuses on paying off debts with the highest interest rate first." The high rate method (also called the avalanche method) prioritizes paying off debts with the highest interest rates first, regardless of the balance amount. This strategy minimizes the total interest paid over time, making it the most cost-effective approach to debt repayment.'}]} as QuizContent]},
  {
    id: 'lesson-16-5',
    title: 'Bankruptcy',
    duration: '35 min',
    contentItems: [
      {
        id: 'economics-u16-l5-video-1',
        type: 'video',
        title: 'Bankruptcy',
        videoIndex: 0} as VideoContent,
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
          'Last resort, consider alternatives first']} as ArticleContent,
      {
        id: 'economics-u16-l5-quiz',
        type: 'quiz',
        title: 'Quiz: Bankruptcy',
        questions: [
          {
            id: 'quiz-16-5-1',
            question: 'Bankruptcy is a legal process where people cannot pay their debts and need help to manage them. There are several factors that could lead to bankruptcy. Which event might cause someone to file for bankruptcy?',
            options: [
              'getting a promotion',
              'going on vacation',
              'divorce'],
            correctAnswer: 2,
            explanation: 'Divorce might cause someone to file for bankruptcy. Divorce often leads to significant financial strain due to legal fees, division of assets, loss of dual income, increased expenses (maintaining two households), and potential alimony or child support payments. These financial pressures can make it difficult to meet debt obligations. Getting a promotion typically improves financial situation, and going on vacation is a planned expense that shouldn\'t cause bankruptcy unless it\'s extremely expensive and unaffordable.'},
          {
            id: 'quiz-16-5-2',
            question: 'Bankruptcy is a legal process that helps people who cannot pay their debts. One type of bankruptcy is called Chapter 13. What happens after you complete your Chapter 13 repayment plan?',
            options: [
              'some or all of your remaining debts are eliminated',
              'you have to file for a different type of bankruptcy',
              'you still owe all of your original debts',
              'you have to start a new repayment plan for the remaining debt'],
            correctAnswer: 0,
            explanation: 'After you complete your Chapter 13 repayment plan, some or all of your remaining debts are eliminated. Chapter 13 bankruptcy allows you to reorganize your debts and create a repayment plan (typically 3-5 years) based on your income. Once you successfully complete the repayment plan, any remaining unsecured debts (like credit card debt) are typically discharged (eliminated). This is different from Chapter 7, where assets may be liquidated to pay debts.'},
          {
            id: 'quiz-16-5-3',
            question: 'Bankruptcy is a legal process that allows people to wipe away some or all of their debt. Chapter 7 is one of the most common ways of declaring bankruptcy. If someone files for Chapter 7 bankruptcy, what happens to their debts?',
            options: [
              'Most of their debts are eliminated.',
              'They have to pay all their debts in full.',
              'Their debts are reduced, but not eliminated.',
              'Their debts are transferred to someone else.'],
            correctAnswer: 0,
            explanation: 'If someone files for Chapter 7 bankruptcy, most of their debts are eliminated. Chapter 7 is a liquidation bankruptcy where a trustee may sell some of your assets to pay creditors, but most unsecured debts (like credit card debt, medical bills, personal loans) are discharged (eliminated). Some debts cannot be discharged, such as student loans, tax debts, and child support. The process typically takes 3-6 months, and the debtor receives a fresh start, though it severely damages their credit score.'},
          {
            id: 'quiz-16-5-4',
            question: 'Mismanaging money and bankruptcy can lead to serious financial problems and affect your credit score. How can bankruptcy affect your credit score?',
            options: [
              'it will change your credit score to a random number',
              'it will increase your credit score',
              'it will decrease your credit score',
              'it will have no impact on your credit score'],
            correctAnswer: 2,
            explanation: 'Bankruptcy will decrease your credit score. Filing for bankruptcy is one of the most damaging events for your credit score. It can drop your score by 200 points or more and remains on your credit report for 7-10 years (depending on the type of bankruptcy). This makes it extremely difficult to obtain credit, loans, or favorable interest rates. While you can rebuild your credit over time, bankruptcy has a severe negative impact that takes years to recover from.'}]} as QuizContent]}];

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
        videoIndex: 0} as VideoContent,
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
          'Required by law']} as ArticleContent,
      {
        id: 'economics-u17-l1-quiz',
        type: 'quiz',
        title: 'Quiz: What are taxes and why do we pay them',
        questions: [
          {
            id: 'quiz-17-1-1',
            question: 'Federal, state, and local governments all collect taxes to fund various programs and services that benefit our communities. If you own a home, which level of government collects property taxes?',
            options: [
              'local government',
              'state government',
              'federal government'],
            correctAnswer: 0,
            explanation: 'Local government collects property taxes. Property taxes are assessed and collected by local governments (cities, counties, school districts) to fund local services such as schools, police and fire departments, road maintenance, libraries, and other community services. The amount of property tax you pay is typically based on the assessed value of your property and local tax rates.'},
          {
            id: 'quiz-17-1-2',
            question: 'Every day, we pay taxes in different ways through shopping, working, and owning a home. When you are traveling and have to pay a fee to use a certain highway, which type of tax are you most likely paying?',
            options: [
              'toll tax',
              'excise tax',
              'occupancy tax'],
            correctAnswer: 0,
            explanation: 'When you pay a fee to use a certain highway, you are paying a toll tax. Toll taxes (or tolls) are fees charged for using specific roads, bridges, or tunnels. They are a form of user fee where you pay directly for the service you use. Excise taxes are taxes on specific goods like gasoline, alcohol, or tobacco. Occupancy taxes are taxes on hotel rooms or short-term rentals.'},
          {
            id: 'quiz-17-1-3',
            question: 'When buying a new bicycle that costs $100, you pay a 6% sales tax. Is this an example of a flat tax or a progressive tax?',
            options: [
              'flat tax',
              'progressive tax'],
            correctAnswer: 0,
            explanation: 'A sales tax is an example of a flat tax. A flat tax applies the same tax rate to everyone regardless of their income level. In this case, everyone pays 6% on their purchases, whether they earn $20,000 or $200,000 per year. A progressive tax, in contrast, applies higher tax rates to higher income levels. Sales taxes are considered regressive because they take a larger percentage of income from lower-income earners, even though the rate itself is flat.'},
          {
            id: 'quiz-17-1-4',
            question: 'Federal, state, and local governments all collect different taxes to help pay for different benefits. What do local taxes help pay for?',
            options: [
              'highways',
              'Medicare',
              'libraries',
              'state parks'],
            correctAnswer: 2,
            explanation: 'Local taxes help pay for libraries. Local governments use property taxes, sales taxes, and other local revenue sources to fund community services such as libraries, public schools, police and fire departments, local parks, road maintenance, and other municipal services. Highways are typically funded by state and federal governments. Medicare is a federal program funded by federal taxes. State parks are funded by state taxes.'}]} as QuizContent]},
  {
    id: 'lesson-17-2',
    title: 'Local taxes',
    duration: '35 min',
    contentItems: [
      {
        id: 'economics-u17-l2-video-1',
        type: 'video',
        title: 'Local taxes',
        videoIndex: 0} as VideoContent,
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
          'Fund local services']} as ArticleContent,
      {
        id: 'economics-u17-l2-quiz',
        type: 'quiz',
        title: 'Quiz: Local taxes',
        questions: [
          {
            id: 'quiz-17-2-1',
            question: 'The base sales tax rate for the state of Virginia is 5.3%. York County, VA has an additional sales tax of 1.7%. In all of Virginia, food for home consumption and certain essential personal hygiene items are taxed at a reduced rate of 1%. Leila buys the following items at the grocery store:\n\nItem | Price\nbread | $2.00\nmilk | $1.50\ncereal | $2.50\ntrash bags | $4.00\n\nWhat is Leila\'s total grocery bill, with tax included?',
            options: [
              '$10.00',
              '$10.34',
              '$10.70',
              '$11.04'],
            correctAnswer: 1,
            explanation: 'Leila\'s total grocery bill with tax is $10.34. Food items (bread, milk, cereal) are taxed at the reduced rate of 1%: ($2.00 + $1.50 + $2.50) × 1% = $6.00 × 0.01 = $0.06. Trash bags are not food, so they are taxed at the general rate: 5.3% + 1.7% = 7% of $4.00 = $0.28. Subtotal: $2.00 + $1.50 + $2.50 + $4.00 = $10.00. Total tax: $0.06 + $0.28 = $0.34. Total bill: $10.00 + $0.34 = $10.34.'},
          {
            id: 'quiz-17-2-2',
            question: 'Henrico, VA has a general sales tax rate of 6% and a reduced rate of 1% on food for home consumption and personal hygiene items. At the local grocery store, a cake costs $13.00. What is the total cost of the cake, with tax included?',
            options: [
              '$13.00',
              '$13.13',
              '$13.78',
              '$14.00'],
            correctAnswer: 1,
            explanation: 'The total cost of the cake with tax is $13.13. A cake is food for home consumption, so it is taxed at the reduced rate of 1%. Tax on $13.00: $13.00 × 0.01 = $0.13. Total cost: $13.00 + $0.13 = $13.13.'},
          {
            id: 'quiz-17-2-3',
            question: 'Richmond City, VA has a general sales tax rate of 6%, and a reduced 1% rate on food for home consumption. Roberta ordered a set of tires for her car at a local tire shop. The tires cost $800. Calculate the amount of tax she will pay on the tires.',
            options: [
              '$8.00',
              '$48.00',
              '$80.00',
              '$480.00'],
            correctAnswer: 1,
            explanation: 'Roberta will pay $48.00 in tax on the tires. Tires are not food for home consumption, so they are subject to the general sales tax rate of 6%. Tax on $800: $800 × 0.06 = $48.00.'}]} as QuizContent]},
  {
    id: 'lesson-17-3',
    title: 'Tax forms',
    duration: '50 min',
    contentItems: [
      {
        id: 'economics-u17-l3-video-1',
        type: 'video',
        title: 'Tax forms',
        videoIndex: 0} as VideoContent,
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
          'Different boxes show different information']} as ArticleContent,
      {
        id: 'economics-u17-l3-quiz',
        type: 'quiz',
        title: 'Quiz: Tax forms',
        questions: []} as QuizContent]},
  {
    id: 'lesson-17-4',
    title: 'Personal taxes',
    duration: '35 min',
    contentItems: [
      {
        id: 'economics-u17-l4-video-1',
        type: 'video',
        title: 'Personal taxes',
        videoIndex: 0} as VideoContent,
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
          'Effective rate: average rate']} as ArticleContent,
      {
        id: 'economics-u17-l4-quiz',
        type: 'quiz',
        title: 'Quiz: Personal taxes',
        questions: [
          {
            id: 'quiz-17-4-1',
            question: 'A country has a progressive tax system and uses the following tax brackets:\n\nIncome | Tax rate\n$0 – $19,999 | 0%\n$20,000 – $29,999 | 10%\n$30,000+ | 20%\n\nYou made $19,000 while living in this country. How much do you owe in taxes?',
            options: [
              '$0',
              '$1,900',
              '$3,800',
              '$19,000'],
            correctAnswer: 0,
            explanation: 'You owe $0 in taxes. Your income of $19,000 falls within the first tax bracket ($0 – $19,999), which has a tax rate of 0%. In a progressive tax system, you only pay taxes on income within each bracket at that bracket\'s rate. Since all of your income is in the 0% bracket, you owe no taxes.'},
          {
            id: 'quiz-17-4-2',
            question: 'You got a $2,000 pay raise that increased your salary from $50,000 to $52,000. This pushed you into a 21% tax bracket. Which amount will be taxed at 21%?',
            options: [
              '$0',
              '$2,000',
              '$50,000',
              '$52,000'],
            correctAnswer: 1,
            explanation: 'Only $2,000 will be taxed at 21%. In a progressive tax system, different portions of your income are taxed at different rates. When you move into a higher tax bracket, only the income that falls within that new bracket is taxed at the higher rate. The $2,000 raise pushed you into the 21% bracket, so only that $2,000 is taxed at 21%. Your previous $50,000 continues to be taxed at the lower rates that applied to it before the raise.'},
          {
            id: 'quiz-17-4-3',
            question: 'The table below represents the yearly salaries of three individuals who live and work in the United States. The United States has a progressive income tax system.\n\nJob | Yearly salary\nRealtor | $92,000\nTruck driver | $88,000\nOffice assistant | $55,000\n\nWhich of these individuals will pay the least in taxes, based on salary alone?',
            options: [
              'office assistant',
              'realtor',
              'truck driver',
              'they will all pay the same'],
            correctAnswer: 0,
            explanation: 'The office assistant will pay the least in taxes, based on salary alone. In a progressive tax system, higher income is taxed at higher rates. The office assistant has the lowest salary ($55,000), so they will pay the least in taxes. The truck driver ($88,000) and realtor ($92,000) have higher incomes and will pay more in taxes because more of their income falls into higher tax brackets.'},
          {
            id: 'quiz-17-4-4',
            question: 'Income tax is an example of a progressive tax. Which of the following statements is true about progressive taxes?',
            options: [
              'Only the highest earners pay taxes.',
              'The more you earn, the less you take home.',
              'The same tax rate applies to all income earners.',
              'The income of the highest earners gets divided across multiple tax brackets.'],
            correctAnswer: 3,
            explanation: 'The statement "The income of the highest earners gets divided across multiple tax brackets" is true about progressive taxes. In a progressive tax system, income is taxed at different rates depending on which tax bracket it falls into. Higher earners have their income divided across multiple brackets - the first portion at the lowest rate, the next portion at a higher rate, and so on. This means higher earners pay a higher overall percentage of their income in taxes, but not all of their income is taxed at the highest rate.'}]} as QuizContent]}];

export const economicsPersonalFinanceCourse: Course = {
  id: 'economics-personal-finance',
  title: 'Economics & Personal Finance',
  description: 'Understanding personal finance through economic principles',
  finalExamPassRate: 75,
  units: [
    {
      id: 'unit-1',
      title: 'Foundations of economics',
      description: 'Understanding scarcity, opportunity cost, decision-making, factors of production, human capital, and economic systems',
      lessons: unit1Lessons},
    {
      id: 'unit-2',
      title: 'Producers and consumers in markets',
      description: 'Understanding incentives, marketing, costs, revenue, profit, productivity, business organization, and market structures',
      lessons: unit2Lessons},
    {
      id: 'unit-3',
      title: 'The microeconomy and price systems',
      description: 'Understanding demand, supply, elasticity, market equilibrium, and price controls',
      lessons: unit3Lessons},
    {
      id: 'unit-4',
      title: 'The role of government in markets',
      description: 'Understanding public vs. private goods, property rights, and government redistribution of wealth',
      lessons: unit4Lessons},
    {
      id: 'unit-5',
      title: 'Macroeconomic challenges',
      description: 'Understanding macroeconomic indicators, aggregate demand and supply, and business cycles',
      lessons: unit5Lessons},
    {
      id: 'unit-6',
      title: 'Money, Banking, and Financial Markets',
      description: 'Understanding money, financial institutions and markets, and the Federal Reserve',
      lessons: unit6Lessons},
    {
      id: 'unit-7',
      title: 'Economic stabilization',
      description: 'Understanding monetary policy, fiscal policy, and government budgets',
      lessons: unit7Lessons},
    {
      id: 'unit-8',
      title: 'Global economy',
      description: 'Understanding trade, exchange rates, and globalization',
      lessons: unit8Lessons},
    {
      id: 'unit-9',
      title: 'Careers and education',
      description: 'Understanding education as investment, paying for education, financial aid, and student loans',
      lessons: unit9Lessons},
    {
      id: 'unit-10',
      title: 'Employment',
      description: 'Understanding compensation, benefits, paychecks, non-typical pay, and hiring process',
      lessons: unit10Lessons},
    {
      id: 'unit-11',
      title: 'Banking',
      description: 'Understanding banking institutions, bank accounts, account management, and interest',
      lessons: unit11Lessons},
    {
      id: 'unit-12',
      title: 'Financial goals',
      description: 'Understanding SMART goals, short/medium/long-term goals, and net worth',
      lessons: unit12Lessons},
    {
      id: 'unit-13',
      title: 'Budgeting & saving',
      description: 'Understanding budgeting, saving money, emergency funds, and reducing expenses',
      lessons: unit13Lessons},
    {
      id: 'unit-14',
      title: 'Saving & investing',
      description: 'Understanding risk and return, planning for retirement, and Social Security',
      lessons: unit14Lessons},
    {
      id: 'unit-15',
      title: 'Consumer credit',
      description: 'Understanding credit cards, credit scores, and credit management',
      lessons: unit15Lessons},
    {
      id: 'unit-16',
      title: 'Loans and debt',
      description: 'Understanding borrowing terms, loan sources, types of loans, debt management, and bankruptcy',
      lessons: unit16Lessons},
    {
      id: 'unit-17',
      title: 'Taxes',
      description: 'Understanding taxes, local taxes, tax forms, and personal income taxes',
      lessons: unit17Lessons}],
  finalExam: []};
