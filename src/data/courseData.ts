export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  optionExplanations?: string[]; // Explanations for each option (appears after selection)
  correctAnswer: number;
  explanation?: string; // General explanation (optional, for backward compatibility)
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl?: string; // Legacy field, will be generated dynamically from R2
  videoCount?: number; // Number of videos in this lesson (default: 1)
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
  id: 'macroeconomics',
  title: 'Macroeconomics',
  description: 'Comprehensive study of macroeconomic principles, policies, and their impact on global economies',
  finalExamPassRate: 75,
  modules: [
    {
      id: 'module-1',
      title: 'Unit 1: Basic economics concepts',
      description: 'Introduction to fundamental economic concepts and principles',
      lessons: [
        {
          id: 'lesson-1-1',
          title: 'Introduction to macroeconomics',
          duration: '25 min',
          videoCount: 5,
          notes: '# Introduction to macroeconomics\n\nThis lesson introduces the fundamental concepts of macroeconomics, including scarcity, economic models, and different economic systems.',
          importantPoints: [
            'Economics studies how societies allocate scarce resources',
            'Scarcity is the fundamental economic problem',
            'Economic models help simplify complex reality',
            'Different economic systems allocate resources differently'
          ],
          quiz: [
            {
              id: 'q1-1-1',
              question: 'Which of the following best describes what we mean by resources in economics?',
              options: [
                'Natural resources like natural gas and trees',
                'The factors used to produce goods and services',
                'Human resources like workers',
                'The ability to handle a situation',
                'Monetary wealth'
              ],
              optionExplanations: [
                'Natural resources are part of one of the economic resources, land, but resources are broader than just natural resources.',
                'The four economic resources—land, labor, capital, and entrepreneurship—are used to produce goods and services.',
                'Human resources, or labor, are one of the economic resources, but resources are broader than just labor.',
                'While this is a common use of the word resource in everyday language, when economists talk about resources they are using a different meaning.',
                'While this is a common use of the word resource in everyday language, when economists talk about resources they are using a different meaning.'
              ],
              correctAnswer: 1
            },
            {
              id: 'q1-1-2',
              question: 'Which of the following best captures the idea of the fundamental economic problem?',
              options: [
                'Limited wants and limited resources',
                'Infinite resources and limited wants',
                'Limited resources and unlimited wants',
                'Unlimited resources and unlimited wants',
                'Lack of demand for limited resources'
              ],
              optionExplanations: [
                'Even if wants are limited, an economic system must decide how scarce resources are allocated among those wants.',
                'If resources aren\'t scarce, then an economic system of allocating them is not necessary.',
                'The unlimited wants of humans results in the problem of scarcity, which any economic system must address.',
                'If resources aren\'t scarce, then an economic system of allocating them is not necessary.',
                'If nobody wants a resource, then an economic system of allocating it is not necessary.'
              ],
              correctAnswer: 2
            },
            {
              id: 'q1-1-3',
              question: 'Which of the following is an example of a macroeconomic question?',
              options: [
                'How will a consumer react if their income decreases?',
                'How many smartphones should Samsung produce this quarter?',
                'What would be the likely impact of an increase in business taxes on the overall level of inflation in the country?',
                'What is the optimal number of workers for an ice cream shop to employ during the summer months?',
                'Who are the winners and losers from the imposition of a tax on cigarettes?'
              ],
              optionExplanations: [
                'This is a microeconomic question because it relates to individual behavior.',
                'This is a microeconomic question because it relates to the decision making of an individual firm.',
                'This is a macroeconomic question because it deals with the the impact on the overall price level in the country as a whole.',
                'This is a microeconomic question because it relates to the decision making of an individual firm.',
                'This is a microeconomic question because it relates to a market for a product.'
              ],
              correctAnswer: 2
            },
            {
              id: 'q1-1-4',
              question: 'Which of the following is the best definition of an economic system?',
              options: [
                'A set of policies used by government to regulate what is produced',
                'A model for understanding how economies work',
                'A mechanism that decides what to make, how to make it, and who gets it',
                'A model that illustrates the flows of goods and services',
                'A government program for promoting economic growth and employment'
              ],
              optionExplanations: [
                'An economic system concerns not just what is produced, but how that production is allocated. Additionally, an economic system can exist with or without government regulation.',
                'Economic systems are how resources are produced and goods and services are allocated. Models can help us understand how these systems work.',
                'Economic systems are ways of allocating resources to production and the distribution of production created with those resources',
                'Economic systems are how resources are produced and goods and services allocated. Models can help us understand how these systems work.',
                'Economic systems can include more than just government decisions.'
              ],
              correctAnswer: 2
            }
          ]
        },
        {
          id: 'lesson-1-2',
          title: 'Opportunity cost and the Production Possibilities Curve',
          duration: '30 min',
          videoCount: 5,
          notes: '# Opportunity cost and the Production Possibilities Curve\n\nThis lesson explores opportunity cost and how the Production Possibilities Curve (PPC) illustrates trade-offs and economic efficiency.',
          importantPoints: [
            'Opportunity cost is the value of the next best alternative',
            'The PPC shows maximum production possibilities',
            'Points on the curve represent efficient production',
            'The shape of the PPC reflects opportunity cost patterns'
          ],
          quiz: [
            {
              id: 'q1-2-1',
              question: 'What is opportunity cost?',
              options: ['The monetary cost', 'The value of the next best alternative given up', 'The total cost', 'The fixed cost'],
              correctAnswer: 1,
              explanation: 'Opportunity cost is the value of the next best alternative that must be given up when making a choice.'
            },
            {
              id: 'q1-2-2',
              question: 'What does a point on the Production Possibilities Curve represent?',
              options: ['Inefficient production', 'Efficient production using all available resources', 'Impossible production', 'Future production'],
              correctAnswer: 1,
              explanation: 'Points on the PPC represent efficient production, meaning all available resources are being used effectively.'
            },
            {
              id: 'q1-2-3',
              question: 'What does an increasing opportunity cost PPC look like?',
              options: ['A straight line', 'A curved line bowed outward', 'A curved line bowed inward', 'A vertical line'],
              correctAnswer: 1,
              explanation: 'An increasing opportunity cost PPC is bowed outward, showing that as more of one good is produced, the opportunity cost increases.'
            }
          ]
        },
        {
          id: 'lesson-1-3',
          title: 'Comparative advantage and the gains from trade',
          duration: '35 min',
          videoCount: 7,
          notes: '# Comparative advantage and the gains from trade\n\nThis lesson explains how countries and individuals benefit from specialization and trade through comparative advantage.',
          importantPoints: [
            'Comparative advantage differs from absolute advantage',
            'Specialization based on comparative advantage increases total output',
            'Trade benefits all parties when based on comparative advantage',
            'Terms of trade determine how gains are distributed'
          ],
          quiz: [
            {
              id: 'q1-3-1',
              question: 'What is comparative advantage?',
              options: ['Producing more of everything', 'Producing at lower opportunity cost than others', 'Producing faster', 'Producing cheaper'],
              correctAnswer: 1,
              explanation: 'Comparative advantage means producing a good at a lower opportunity cost than others.'
            },
            {
              id: 'q1-3-2',
              question: 'How do countries benefit from trade?',
              options: ['By avoiding specialization', 'By specializing in goods where they have comparative advantage', 'By producing everything themselves', 'By limiting trade'],
              correctAnswer: 1,
              explanation: 'Countries benefit by specializing in goods where they have comparative advantage and trading for other goods.'
            },
            {
              id: 'q1-3-3',
              question: 'What determines the terms of trade?',
              options: ['Only supply', 'Only demand', 'The opportunity costs of both trading partners', 'Government policy'],
              correctAnswer: 2,
              explanation: 'Terms of trade are determined by the opportunity costs of both trading partners, falling between their opportunity cost ratios.'
            },
            {
              id: 'q1-3-4',
              question: 'When are there no gains from trade?',
              options: ['Always', 'When opportunity costs are identical', 'When one country is better at everything', 'Never'],
              correctAnswer: 1,
              explanation: 'When opportunity costs are identical, there are no gains from trade because no specialization advantage exists.'
            }
          ]
        },
        {
          id: 'lesson-1-4',
          title: 'Demand',
          duration: '30 min',
          videoCount: 6,
          notes: '# Demand\n\nThis lesson covers the law of demand and the factors that influence demand for goods and services.',
          importantPoints: [
            'The law of demand: price and quantity demanded are inversely related',
            'Demand is affected by prices of related goods, income, preferences, and expectations',
            'Normal goods increase in demand with income; inferior goods decrease',
            'A change in demand differs from a change in quantity demanded'
          ],
          quiz: [
            {
              id: 'q1-4-1',
              question: 'According to the law of demand, what happens when price increases?',
              options: ['Quantity demanded increases', 'Quantity demanded decreases', 'Demand increases', 'Demand decreases'],
              correctAnswer: 1,
              explanation: 'The law of demand states that as price increases, quantity demanded decreases, ceteris paribus.'
            },
            {
              id: 'q1-4-2',
              question: 'What are substitute goods?',
              options: ['Goods used together', 'Goods that can replace each other', 'Goods that are identical', 'Goods with no relationship'],
              correctAnswer: 1,
              explanation: 'Substitute goods can replace each other in consumption. When the price of one increases, demand for the substitute increases.'
            },
            {
              id: 'q1-4-3',
              question: 'What is a normal good?',
              options: ['A good with constant demand', 'A good whose demand increases with income', 'A good whose demand decreases with income', 'A luxury good'],
              correctAnswer: 1,
              explanation: 'A normal good is one whose demand increases when consumer income increases.'
            },
            {
              id: 'q1-4-4',
              question: 'What is the difference between a change in demand and a change in quantity demanded?',
              options: ['No difference', 'Change in demand shifts the curve; change in quantity demanded moves along the curve', 'Change in quantity demanded shifts the curve', 'They are the same'],
              correctAnswer: 1,
              explanation: 'A change in demand shifts the entire demand curve due to non-price factors. A change in quantity demanded is movement along the curve due to price changes.'
            }
          ]
        },
        {
          id: 'lesson-1-5',
          title: 'Supply',
          duration: '25 min',
          videoCount: 3,
          notes: '# Supply\n\nThis lesson explains the law of supply and the factors that affect the supply of goods and services.',
          importantPoints: [
            'The law of supply: price and quantity supplied are directly related',
            'Supply is affected by production costs, technology, number of sellers, and expectations',
            'A change in supply shifts the curve; a change in quantity supplied moves along the curve',
            'Supply determinants include input prices, technology, and government policies'
          ],
          quiz: [
            {
              id: 'q1-5-1',
              question: 'According to the law of supply, what happens when price increases?',
              options: ['Quantity supplied decreases', 'Quantity supplied increases', 'Supply decreases', 'Supply increases'],
              correctAnswer: 1,
              explanation: 'The law of supply states that as price increases, quantity supplied increases, ceteris paribus.'
            },
            {
              id: 'q1-5-2',
              question: 'What factors affect supply?',
              options: ['Only price', 'Production costs, technology, number of sellers, expectations', 'Only demand', 'Only income'],
              correctAnswer: 1,
              explanation: 'Supply is affected by production costs, technology, number of sellers, expectations, and government policies.'
            },
            {
              id: 'q1-5-3',
              question: 'What is the difference between a change in supply and a change in quantity supplied?',
              options: ['No difference', 'Change in supply shifts the curve; change in quantity supplied moves along the curve', 'Change in quantity supplied shifts the curve', 'They are the same'],
              correctAnswer: 1,
              explanation: 'A change in supply shifts the entire supply curve due to non-price factors. A change in quantity supplied is movement along the curve due to price changes.'
            },
            {
              id: 'q1-5-4',
              question: 'What happens to supply when production costs increase?',
              options: ['Supply increases', 'Supply decreases', 'Supply stays the same', 'Quantity supplied increases'],
              correctAnswer: 1,
              explanation: 'When production costs increase, suppliers are willing to produce less at each price, causing the supply curve to shift left (decrease in supply).'
            }
          ]
        },
        {
          id: 'lesson-1-6',
          title: 'Markets',
          duration: '30 min',
          videoCount: 3,
          notes: '# Markets\n\nThis lesson explores how supply and demand interact to determine market equilibrium, and how markets adjust to changes.',
          importantPoints: [
            'Market equilibrium occurs where supply equals demand',
            'Equilibrium price and quantity are determined by the intersection of supply and demand',
            'Changes in supply or demand cause equilibrium to shift',
            'Markets naturally move toward equilibrium through price adjustments'
          ],
          quiz: [
            {
              id: 'q1-6-1',
              question: 'What is market equilibrium?',
              options: ['When supply exceeds demand', 'When demand exceeds supply', 'When supply equals demand', 'When there is no market'],
              correctAnswer: 2,
              explanation: 'Market equilibrium occurs when the quantity supplied equals the quantity demanded at a particular price.'
            },
            {
              id: 'q1-6-2',
              question: 'What happens when there is a surplus in the market?',
              options: ['Price increases', 'Price decreases', 'Price stays the same', 'Demand increases'],
              correctAnswer: 1,
              explanation: 'A surplus occurs when quantity supplied exceeds quantity demanded. Prices tend to fall to eliminate the surplus.'
            },
            {
              id: 'q1-6-3',
              question: 'What happens when there is a shortage in the market?',
              options: ['Price decreases', 'Price increases', 'Price stays the same', 'Supply increases'],
              correctAnswer: 1,
              explanation: 'A shortage occurs when quantity demanded exceeds quantity supplied. Prices tend to rise to eliminate the shortage.'
            },
            {
              id: 'q1-6-4',
              question: 'What happens to equilibrium price and quantity when demand increases?',
              options: ['Price decreases, quantity decreases', 'Price increases, quantity increases', 'Price stays the same, quantity increases', 'Price increases, quantity decreases'],
              correctAnswer: 1,
              explanation: 'When demand increases, the demand curve shifts right, leading to a higher equilibrium price and quantity.'
            },
            {
              id: 'q1-6-5',
              question: 'What happens to equilibrium price and quantity when supply increases?',
              options: ['Price increases, quantity increases', 'Price decreases, quantity increases', 'Price decreases, quantity decreases', 'Price stays the same, quantity increases'],
              correctAnswer: 1,
              explanation: 'When supply increases, the supply curve shifts right, leading to a lower equilibrium price and higher quantity.'
            },
            {
              id: 'q1-6-6',
              question: 'What happens when both demand and supply increase?',
              options: ['Price increases, quantity decreases', 'Price decreases, quantity increases', 'Price is ambiguous, quantity increases', 'Price increases, quantity is ambiguous'],
              correctAnswer: 2,
              explanation: 'When both demand and supply increase, quantity definitely increases, but the effect on price is ambiguous depending on the relative magnitude of the shifts.'
            },
            {
              id: 'q1-6-7',
              question: 'What is market disequilibrium?',
              options: ['When supply equals demand', 'When supply does not equal demand', 'When price is zero', 'When there is no market'],
              correctAnswer: 1,
              explanation: 'Market disequilibrium occurs when quantity supplied does not equal quantity demanded, resulting in surpluses or shortages.'
            },
            {
              id: 'q1-6-8',
              question: 'How do markets reach equilibrium?',
              options: ['Through government intervention', 'Through price adjustments', 'Through quantity restrictions', 'Markets never reach equilibrium'],
              correctAnswer: 1,
              explanation: 'Markets reach equilibrium through price adjustments. When there is a surplus, prices fall; when there is a shortage, prices rise until equilibrium is reached.'
            }
          ]
        }
      ],
      moduleTest: [
        {
          id: 'mt1-1',
          question: 'What is the fundamental economic problem?',
          options: ['Unlimited resources', 'Scarcity', 'High prices', 'Government intervention'],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 'module-2',
      title: 'Module 2',
      description: '',
      lessons: [],
      moduleTest: []
    },
    {
      id: 'module-3',
      title: 'Module 3',
      description: '',
      lessons: [],
      moduleTest: []
    },
    {
      id: 'module-4',
      title: 'Module 4',
      description: '',
      lessons: [],
      moduleTest: []
    },
    {
      id: 'module-5',
      title: 'Module 5',
      description: '',
      lessons: [],
      moduleTest: []
    },
    {
      id: 'module-6',
      title: 'Module 6',
      description: '',
      lessons: [],
      moduleTest: []
    },
    {
      id: 'module-7',
      title: 'Module 7',
      description: '',
      lessons: [],
      moduleTest: []
    },
    {
      id: 'module-8',
      title: 'Module 8',
      description: '',
      lessons: [],
      moduleTest: []
    }
  ],
  finalExam: []
},
{
  id: 'microeconomics',
  title: 'Microeconomics',
  description: 'In-depth exploration of individual economic units, market structures, and consumer behavior',
  finalExamPassRate: 75,
  modules: [
    {
      id: 'module-1',
      title: 'Unit 1: Basic economic concepts',
      description: 'Introduction to fundamental economic concepts and principles',
      lessons: [
        {
          id: 'lesson-1-1',
          title: 'Introduction to economics',
          duration: '15 min',
          videoUrl: '',
          notes: '# Introduction to economics\n\nEconomics is the study of how individuals and societies allocate scarce resources to satisfy unlimited wants and needs.',
          importantPoints: [
            'Economics studies resource allocation',
            'Scarcity is a fundamental economic problem',
            'Economics helps understand decision-making'
          ],
          quiz: [
            {
              id: 'q1-1-1',
              question: 'What is the fundamental economic problem?',
              options: ['Unlimited resources', 'Scarcity', 'High prices', 'Government intervention'],
              correctAnswer: 1,
              explanation: 'Scarcity is the fundamental economic problem - unlimited wants but limited resources.'
            }
          ]
        },
        {
          id: 'lesson-1-2',
          title: 'Economic systems',
          duration: '18 min',
          videoUrl: '',
          notes: '# Economic systems\n\nDifferent ways societies organize production, distribution, and consumption of goods and services.',
          importantPoints: [
            'Market economy relies on supply and demand',
            'Command economy is centrally planned',
            'Mixed economy combines elements of both'
          ],
          quiz: [
            {
              id: 'q1-2-1',
              question: 'Which economic system relies primarily on market forces?',
              options: ['Command economy', 'Market economy', 'Traditional economy', 'None of the above'],
              correctAnswer: 1,
              explanation: 'Market economy relies on supply and demand forces to allocate resources.'
            }
          ]
        },
        {
          id: 'lesson-1-3',
          title: 'Production possibilities frontier',
          duration: '20 min',
          videoUrl: '',
          notes: '# Production possibilities frontier\n\nThe PPF shows the maximum combination of goods and services an economy can produce with available resources.',
          importantPoints: [
            'PPF illustrates opportunity cost',
            'Points on the curve are efficient',
            'Points inside the curve are inefficient'
          ],
          quiz: [
            {
              id: 'q1-3-1',
              question: 'What does a point inside the production possibilities frontier represent?',
              options: ['Efficient production', 'Inefficient production', 'Impossible production', 'Future production'],
              correctAnswer: 1,
              explanation: 'Points inside the PPF represent inefficient use of resources.'
            }
          ]
        },
        {
          id: 'lesson-1-4',
          title: 'Comparative advantage and the terms of trade',
          duration: '22 min',
          videoUrl: '',
          notes: '# Comparative advantage and the terms of trade\n\nComparative advantage explains why countries benefit from specialization and trade.',
          importantPoints: [
            'Comparative advantage differs from absolute advantage',
            'Trade benefits both parties',
            'Terms of trade determine the exchange ratio'
          ],
          quiz: [
            {
              id: 'q1-4-1',
              question: 'What is comparative advantage?',
              options: ['Producing more of everything', 'Producing at lower opportunity cost', 'Producing faster', 'Producing cheaper'],
              correctAnswer: 1,
              explanation: 'Comparative advantage means producing at a lower opportunity cost than others.'
            }
          ]
        }
      ],
      moduleTest: [
        {
          id: 'mt1-1',
          question: 'What is the fundamental economic problem?',
          options: ['Unlimited resources', 'Scarcity', 'High prices', 'Government intervention'],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 'module-2',
      title: 'Unit 2: Supply, demand, and market equilibrium',
      description: 'Understanding how supply and demand determine market prices and quantities',
      lessons: [
        {
          id: 'lesson-2-1',
          title: 'Demand',
          duration: '18 min',
          videoUrl: '',
          notes: '# Demand\n\nDemand represents the quantity of a good or service consumers are willing and able to purchase at various prices.',
          importantPoints: [
            'Demand curve slopes downward',
            'Law of demand: price and quantity are inversely related',
            'Factors affecting demand include income, preferences, and prices of related goods'
          ],
          quiz: [
            {
              id: 'q2-1-1',
              question: 'According to the law of demand, what happens when price increases?',
              options: ['Quantity demanded increases', 'Quantity demanded decreases', 'Demand increases', 'Demand decreases'],
              correctAnswer: 1,
              explanation: 'The law of demand states that as price increases, quantity demanded decreases.'
            }
          ]
        },
        {
          id: 'lesson-2-2',
          title: 'Supply',
          duration: '18 min',
          videoUrl: '',
          notes: '# Supply\n\nSupply represents the quantity of a good or service producers are willing and able to sell at various prices.',
          importantPoints: [
            'Supply curve slopes upward',
            'Law of supply: price and quantity are directly related',
            'Factors affecting supply include production costs, technology, and number of sellers'
          ],
          quiz: [
            {
              id: 'q2-2-1',
              question: 'According to the law of supply, what happens when price increases?',
              options: ['Quantity supplied decreases', 'Quantity supplied increases', 'Supply decreases', 'Supply increases'],
              correctAnswer: 1,
              explanation: 'The law of supply states that as price increases, quantity supplied increases.'
            }
          ]
        },
        {
          id: 'lesson-2-3',
          title: 'Market equilibrium and changes in equilibrium',
          duration: '22 min',
          videoUrl: '',
          notes: '# Market equilibrium and changes in equilibrium\n\nEquilibrium occurs when supply equals demand. Changes in supply or demand shift the equilibrium point.',
          importantPoints: [
            'Equilibrium price balances supply and demand',
            'Surplus occurs when price is above equilibrium',
            'Shortage occurs when price is below equilibrium'
          ],
          quiz: [
            {
              id: 'q2-3-1',
              question: 'What happens at market equilibrium?',
              options: ['Supply exceeds demand', 'Demand exceeds supply', 'Supply equals demand', 'Price is zero'],
              correctAnswer: 2,
              explanation: 'At equilibrium, the quantity supplied equals the quantity demanded.'
            }
          ]
        }
      ],
      moduleTest: [
        {
          id: 'mt2-1',
          question: 'What is the relationship between price and quantity demanded?',
          options: ['Direct', 'Inverse', 'No relationship', 'Constant'],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 'module-3',
      title: 'Unit 3: Elasticity',
      description: 'Measuring the responsiveness of supply and demand to changes in price and income',
      lessons: [
        {
          id: 'lesson-3-1',
          title: 'Price elasticity of demand',
          duration: '20 min',
          videoUrl: '',
          notes: '# Price elasticity of demand\n\nPrice elasticity measures how responsive quantity demanded is to changes in price.',
          importantPoints: [
            'Elastic demand: quantity changes more than price',
            'Inelastic demand: quantity changes less than price',
            'Elasticity affects total revenue'
          ],
          quiz: [
            {
              id: 'q3-1-1',
              question: 'If demand is elastic, what happens to total revenue when price increases?',
              options: ['Increases', 'Decreases', 'Stays the same', 'Cannot determine'],
              correctAnswer: 1,
              explanation: 'With elastic demand, a price increase causes a larger decrease in quantity, reducing total revenue.'
            }
          ]
        },
        {
          id: 'lesson-3-2',
          title: 'Price elasticity of supply',
          duration: '18 min',
          videoUrl: '',
          notes: '# Price elasticity of supply\n\nPrice elasticity of supply measures how responsive quantity supplied is to changes in price.',
          importantPoints: [
            'Elastic supply: quantity changes more than price',
            'Inelastic supply: quantity changes less than price',
            'Time period affects supply elasticity'
          ],
          quiz: [
            {
              id: 'q3-2-1',
              question: 'Why is supply typically more elastic in the long run?',
              options: ['Prices are higher', 'Firms can adjust production capacity', 'Demand is higher', 'Competition is less'],
              correctAnswer: 1,
              explanation: 'In the long run, firms can adjust their production capacity, making supply more elastic.'
            }
          ]
        },
        {
          id: 'lesson-3-3',
          title: 'Income elasticity of demand and cross-price elasticity of demand',
          duration: '22 min',
          videoUrl: '',
          notes: '# Income elasticity of demand and cross-price elasticity of demand\n\nIncome elasticity measures response to income changes. Cross-price elasticity measures response to price changes of related goods.',
          importantPoints: [
            'Normal goods have positive income elasticity',
            'Inferior goods have negative income elasticity',
            'Substitutes have positive cross-price elasticity'
          ],
          quiz: [
            {
              id: 'q3-3-1',
              question: 'What type of good has negative income elasticity?',
              options: ['Normal good', 'Inferior good', 'Luxury good', 'Necessity'],
              correctAnswer: 1,
              explanation: 'Inferior goods have negative income elasticity - demand decreases as income increases.'
            }
          ]
        }
      ],
      moduleTest: [
        {
          id: 'mt3-1',
          question: 'What does price elasticity of demand measure?',
          options: ['Price level', 'Quantity level', 'Responsiveness to price changes', 'Market size'],
          correctAnswer: 2
        }
      ]
    },
    {
      id: 'module-4',
      title: 'Unit 4: Consumer and producer surplus, market interventions, and international trade',
      description: 'Analyzing welfare effects of markets and government interventions',
      lessons: [
        {
          id: 'lesson-4-1',
          title: 'Consumer and producer surplus',
          duration: '20 min',
          videoUrl: '',
          notes: '# Consumer and producer surplus\n\nConsumer surplus is the difference between what consumers are willing to pay and what they actually pay. Producer surplus is the difference between what producers receive and their minimum acceptable price.',
          importantPoints: [
            'Consumer surplus is above the price line',
            'Producer surplus is below the price line',
            'Total surplus measures market efficiency'
          ],
          quiz: [
            {
              id: 'q4-1-1',
              question: 'What is consumer surplus?',
              options: ['Price paid by consumers', 'Difference between willingness to pay and actual price', 'Total revenue', 'Producer profit'],
              correctAnswer: 1,
              explanation: 'Consumer surplus is the difference between what consumers are willing to pay and the actual price they pay.'
            }
          ]
        },
        {
          id: 'lesson-4-2',
          title: 'Market interventions and deadweight loss',
          duration: '25 min',
          videoUrl: '',
          notes: '# Market interventions and deadweight loss\n\nGovernment interventions like price controls and taxes can create deadweight loss, reducing total surplus.',
          importantPoints: [
            'Price ceilings create shortages',
            'Price floors create surpluses',
            'Deadweight loss represents lost efficiency'
          ],
          quiz: [
            {
              id: 'q4-2-1',
              question: 'What is deadweight loss?',
              options: ['Lost consumer surplus', 'Lost producer surplus', 'Lost total surplus', 'Lost tax revenue'],
              correctAnswer: 2,
              explanation: 'Deadweight loss is the reduction in total surplus due to market inefficiency.'
            }
          ]
        },
        {
          id: 'lesson-4-3',
          title: 'International trade',
          duration: '22 min',
          videoUrl: '',
          notes: '# International trade\n\nInternational trade allows countries to specialize and benefit from comparative advantage.',
          importantPoints: [
            'Trade creates winners and losers',
            'Comparative advantage drives trade',
            'Tariffs and quotas restrict trade'
          ],
          quiz: [
            {
              id: 'q4-3-1',
              question: 'What is the main benefit of international trade?',
              options: ['Higher prices', 'Specialization and efficiency', 'Less competition', 'More regulation'],
              correctAnswer: 1,
              explanation: 'International trade allows countries to specialize based on comparative advantage, increasing efficiency.'
            }
          ]
        }
      ],
      moduleTest: [
        {
          id: 'mt4-1',
          question: 'What does total surplus measure?',
          options: ['Consumer surplus only', 'Producer surplus only', 'Sum of consumer and producer surplus', 'Market price'],
          correctAnswer: 2
        }
      ]
    },
    {
      id: 'module-5',
      title: 'Unit 5: Consumer theory',
      description: 'Understanding how consumers make choices to maximize utility',
      lessons: [
        {
          id: 'lesson-5-1',
          title: 'Introduction to consumer theory: total utility and marginal utility',
          duration: '20 min',
          videoUrl: '',
          notes: '# Introduction to consumer theory: total utility and marginal utility\n\nUtility measures satisfaction from consumption. Total utility is total satisfaction, while marginal utility is the additional satisfaction from one more unit.',
          importantPoints: [
            'Utility measures satisfaction',
            'Marginal utility typically decreases',
            'Consumers maximize total utility'
          ],
          quiz: [
            {
              id: 'q5-1-1',
              question: 'What is marginal utility?',
              options: ['Total satisfaction', 'Average satisfaction', 'Additional satisfaction from one more unit', 'Price of goods'],
              correctAnswer: 2,
              explanation: 'Marginal utility is the additional satisfaction gained from consuming one more unit of a good.'
            }
          ]
        },
        {
          id: 'lesson-5-2',
          title: 'Utility maximization using marginal utility per dollar spent',
          duration: '22 min',
          videoUrl: '',
          notes: '# Utility maximization using marginal utility per dollar spent\n\nConsumers maximize utility when the marginal utility per dollar is equal across all goods.',
          importantPoints: [
            'Equalize MU/P across goods',
            'Budget constraint limits choices',
            'Optimal consumption balances utility and cost'
          ],
          quiz: [
            {
              id: 'q5-2-1',
              question: 'When is utility maximized?',
              options: ['When spending all income', 'When MU/P is equal across goods', 'When buying cheapest goods', 'When buying most expensive goods'],
              correctAnswer: 1,
              explanation: 'Utility is maximized when marginal utility per dollar is equal across all goods.'
            }
          ]
        },
        {
          id: 'lesson-5-3',
          title: 'Utility maximization with indifference curves',
          duration: '25 min',
          videoUrl: '',
          notes: '# Utility maximization with indifference curves\n\nIndifference curves show combinations of goods that provide the same utility. The optimal point is where the budget line is tangent to the highest indifference curve.',
          importantPoints: [
            'Indifference curves slope downward',
            'Higher curves represent more utility',
            'Tangency point is optimal'
          ],
          quiz: [
            {
              id: 'q5-3-1',
              question: 'What does an indifference curve represent?',
              options: ['Different utility levels', 'Same utility level', 'Price combinations', 'Income levels'],
              correctAnswer: 1,
              explanation: 'An indifference curve shows all combinations of goods that provide the same level of utility.'
            }
          ]
        }
      ],
      moduleTest: [
        {
          id: 'mt5-1',
          question: 'What does utility measure?',
          options: ['Price', 'Quantity', 'Satisfaction', 'Cost'],
          correctAnswer: 2
        }
      ]
    },
    {
      id: 'module-6',
      title: 'Unit 6: Production decisions and economic profit',
      description: 'How firms make production decisions and maximize profit',
      lessons: [
        {
          id: 'lesson-6-1',
          title: 'Introduction to production and costs',
          duration: '20 min',
          videoUrl: '',
          notes: '# Introduction to production and costs\n\nFirms combine inputs to produce outputs. Costs include explicit and implicit costs.',
          importantPoints: [
            'Production uses inputs to create outputs',
            'Explicit costs are direct payments',
            'Implicit costs are opportunity costs'
          ],
          quiz: [
            {
              id: 'q6-1-1',
              question: 'What are implicit costs?',
              options: ['Direct payments', 'Opportunity costs', 'Fixed costs', 'Variable costs'],
              correctAnswer: 1,
              explanation: 'Implicit costs are opportunity costs of using resources owned by the firm.'
            }
          ]
        },
        {
          id: 'lesson-6-2',
          title: 'Production and costs in the short run',
          duration: '22 min',
          videoUrl: '',
          notes: '# Production and costs in the short run\n\nIn the short run, at least one input is fixed. Marginal product and costs change as output increases.',
          importantPoints: [
            'Short run has fixed inputs',
            'Marginal product may increase then decrease',
            'Marginal cost typically decreases then increases'
          ],
          quiz: [
            {
              id: 'q6-2-1',
              question: 'What characterizes the short run?',
              options: ['All inputs variable', 'At least one input fixed', 'No costs', 'No production'],
              correctAnswer: 1,
              explanation: 'The short run is defined as a period where at least one input is fixed.'
            }
          ]
        },
        {
          id: 'lesson-6-3',
          title: 'Production and costs in the long run',
          duration: '22 min',
          videoUrl: '',
          notes: '# Production and costs in the long run\n\nIn the long run, all inputs are variable. Firms can adjust all factors of production.',
          importantPoints: [
            'Long run: all inputs variable',
            'Firms can enter or exit',
            'Economies and diseconomies of scale'
          ],
          quiz: [
            {
              id: 'q6-3-1',
              question: 'What characterizes the long run?',
              options: ['Fixed inputs', 'All inputs variable', 'No costs', 'No production'],
              correctAnswer: 1,
              explanation: 'The long run is a period where all inputs are variable.'
            }
          ]
        },
        {
          id: 'lesson-6-4',
          title: 'Types of profit',
          duration: '18 min',
          videoUrl: '',
          notes: '# Types of profit\n\nAccounting profit excludes implicit costs. Economic profit includes all opportunity costs.',
          importantPoints: [
            'Accounting profit = revenue - explicit costs',
            'Economic profit = revenue - all costs',
            'Normal profit means zero economic profit'
          ],
          quiz: [
            {
              id: 'q6-4-1',
              question: 'What is economic profit?',
              options: ['Revenue minus explicit costs', 'Revenue minus all costs', 'Revenue only', 'Costs only'],
              correctAnswer: 1,
              explanation: 'Economic profit is revenue minus all costs, including implicit opportunity costs.'
            }
          ]
        },
        {
          id: 'lesson-6-5',
          title: 'Profit maximization',
          duration: '25 min',
          videoUrl: '',
          notes: '# Profit maximization\n\nFirms maximize profit where marginal revenue equals marginal cost.',
          importantPoints: [
            'MR = MC at profit maximum',
            'Price takers have MR = P',
            'Profit = (P - ATC) × Q'
          ],
          quiz: [
            {
              id: 'q6-5-1',
              question: 'When is profit maximized?',
              options: ['When MR > MC', 'When MR = MC', 'When MR < MC', 'When price is highest'],
              correctAnswer: 1,
              explanation: 'Profit is maximized where marginal revenue equals marginal cost.'
            }
          ]
        },
        {
          id: 'lesson-6-6',
          title: 'Firm entry, exit, and the shut-down rule',
          duration: '22 min',
          videoUrl: '',
          notes: '# Firm entry, exit, and the shut-down rule\n\nFirms enter when economic profit is positive, exit when negative. Shut down if price is below average variable cost.',
          importantPoints: [
            'Entry occurs with positive economic profit',
            'Exit occurs with negative economic profit',
            'Shut down if P < AVC'
          ],
          quiz: [
            {
              id: 'q6-6-1',
              question: 'When should a firm shut down?',
              options: ['When P < ATC', 'When P < AVC', 'When P < MC', 'When profit is zero'],
              correctAnswer: 1,
              explanation: 'A firm should shut down if price is below average variable cost.'
            }
          ]
        }
      ],
      moduleTest: [
        {
          id: 'mt6-1',
          question: 'What is the profit maximization rule?',
          options: ['MR > MC', 'MR = MC', 'MR < MC', 'P = ATC'],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 'module-7',
      title: 'Unit 7: Forms of competition',
      description: 'Different market structures and their characteristics',
      lessons: [
        {
          id: 'lesson-7-1',
          title: 'Perfect competition',
          duration: '22 min',
          videoUrl: '',
          notes: '# Perfect competition\n\nPerfect competition has many firms, identical products, free entry and exit, and perfect information.',
          importantPoints: [
            'Many buyers and sellers',
            'Identical products',
            'Price takers',
            'Long-run economic profit is zero'
          ],
          quiz: [
            {
              id: 'q7-1-1',
              question: 'What characterizes perfect competition?',
              options: ['Few firms', 'Many firms with identical products', 'One firm', 'Differentiated products'],
              correctAnswer: 1,
              explanation: 'Perfect competition has many firms selling identical products.'
            }
          ]
        },
        {
          id: 'lesson-7-2',
          title: 'Monopoly',
          duration: '25 min',
          videoUrl: '',
          notes: '# Monopoly\n\nMonopoly has a single seller, no close substitutes, and barriers to entry.',
          importantPoints: [
            'Single seller',
            'No close substitutes',
            'Barriers to entry',
            'Price maker'
          ],
          quiz: [
            {
              id: 'q7-2-1',
              question: 'What characterizes a monopoly?',
              options: ['Many sellers', 'Single seller', 'Free entry', 'Perfect information'],
              correctAnswer: 1,
              explanation: 'A monopoly has a single seller in the market.'
            }
          ]
        },
        {
          id: 'lesson-7-3',
          title: 'Price discrimination',
          duration: '20 min',
          videoUrl: '',
          notes: '# Price discrimination\n\nPrice discrimination occurs when firms charge different prices to different customers for the same product.',
          importantPoints: [
            'Different prices for same product',
            'Requires market power',
            'Increases producer surplus'
          ],
          quiz: [
            {
              id: 'q7-3-1',
              question: 'What is price discrimination?',
              options: ['Same price for all', 'Different prices for different customers', 'Low prices only', 'High prices only'],
              correctAnswer: 1,
              explanation: 'Price discrimination is charging different prices to different customers for the same product.'
            }
          ]
        },
        {
          id: 'lesson-7-4',
          title: 'Monopolistic competition',
          duration: '22 min',
          videoUrl: '',
          notes: '# Monopolistic competition\n\nMonopolistic competition has many firms, differentiated products, and free entry.',
          importantPoints: [
            'Many firms',
            'Differentiated products',
            'Free entry and exit',
            'Some market power'
          ],
          quiz: [
            {
              id: 'q7-4-1',
              question: 'What characterizes monopolistic competition?',
              options: ['Identical products', 'Differentiated products', 'One firm', 'Barriers to entry'],
              correctAnswer: 1,
              explanation: 'Monopolistic competition has many firms selling differentiated products.'
            }
          ]
        },
        {
          id: 'lesson-7-5',
          title: 'Oligopoly and game theory',
          duration: '25 min',
          videoUrl: '',
          notes: '# Oligopoly and game theory\n\nOligopoly has few firms with interdependent decisions. Game theory analyzes strategic interactions.',
          importantPoints: [
            'Few firms',
            'Interdependent decisions',
            'Game theory models behavior',
            'Collusion possible'
          ],
          quiz: [
            {
              id: 'q7-5-1',
              question: 'What characterizes an oligopoly?',
              options: ['Many firms', 'Few firms with interdependent decisions', 'One firm', 'Free entry'],
              correctAnswer: 1,
              explanation: 'An oligopoly has few firms whose decisions are interdependent.'
            }
          ]
        }
      ],
      moduleTest: [
        {
          id: 'mt7-1',
          question: 'How many firms are in a monopoly?',
          options: ['Many', 'Few', 'One', 'None'],
          correctAnswer: 2
        }
      ]
    },
    {
      id: 'module-8',
      title: 'Unit 8: Factor markets',
      description: 'Markets for factors of production: labor, capital, and land',
      lessons: [
        {
          id: 'lesson-8-1',
          title: 'Introduction to factor markets',
          duration: '20 min',
          videoUrl: '',
          notes: '# Introduction to factor markets\n\nFactor markets determine prices and quantities of inputs like labor, capital, and land.',
          importantPoints: [
            'Factor markets for inputs',
            'Derived demand',
            'Marginal revenue product'
          ],
          quiz: [
            {
              id: 'q8-1-1',
              question: 'What are factor markets?',
              options: ['Markets for final goods', 'Markets for inputs', 'Markets for services', 'Markets for money'],
              correctAnswer: 1,
              explanation: 'Factor markets are markets for inputs like labor, capital, and land.'
            }
          ]
        },
        {
          id: 'lesson-8-2',
          title: 'Changes in factor demand and supply',
          duration: '22 min',
          videoUrl: '',
          notes: '# Changes in factor demand and supply\n\nFactor demand and supply shift due to changes in productivity, prices, and technology.',
          importantPoints: [
            'Productivity affects demand',
            'Output prices affect demand',
            'Technology changes demand'
          ],
          quiz: [
            {
              id: 'q8-2-1',
              question: 'What increases factor demand?',
              options: ['Lower productivity', 'Higher productivity', 'Lower output prices', 'Fewer firms'],
              correctAnswer: 1,
              explanation: 'Higher productivity increases the marginal revenue product, increasing factor demand.'
            }
          ]
        },
        {
          id: 'lesson-8-3',
          title: 'Optimal choice of factors in perfectly competitive factor markets',
          duration: '22 min',
          videoUrl: '',
          notes: '# Optimal choice of factors in perfectly competitive factor markets\n\nFirms hire factors until the marginal revenue product equals the factor price.',
          importantPoints: [
            'MRP = factor price at optimum',
            'Firms are price takers',
            'Efficient allocation'
          ],
          quiz: [
            {
              id: 'q8-3-1',
              question: 'When is factor use optimal?',
              options: ['When MRP > price', 'When MRP = price', 'When MRP < price', 'When price is zero'],
              correctAnswer: 1,
              explanation: 'Factor use is optimal when marginal revenue product equals the factor price.'
            }
          ]
        },
        {
          id: 'lesson-8-4',
          title: 'Choosing inputs when factor markets are monopolistically competitive',
          duration: '20 min',
          videoUrl: '',
          notes: '# Choosing inputs when factor markets are monopolistically competitive\n\nIn imperfect factor markets, firms face upward-sloping supply curves and must consider market power.',
          importantPoints: [
            'Upward-sloping supply',
            'Market power affects prices',
            'Different optimization rules'
          ],
          quiz: [
            {
              id: 'q8-4-1',
              question: 'What characterizes monopolistically competitive factor markets?',
              options: ['Horizontal supply', 'Upward-sloping supply', 'Downward-sloping supply', 'No supply'],
              correctAnswer: 1,
              explanation: 'In monopolistically competitive factor markets, supply curves slope upward.'
            }
          ]
        }
      ],
      moduleTest: [
        {
          id: 'mt8-1',
          question: 'What are factor markets?',
          options: ['Markets for final goods', 'Markets for inputs', 'Markets for services', 'Markets for consumers'],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 'module-9',
      title: 'Unit 9: Market failure and the role of government',
      description: 'When markets fail and how government can intervene',
      lessons: [
        {
          id: 'lesson-9-1',
          title: 'Externalities',
          duration: '22 min',
          videoUrl: '',
          notes: '# Externalities\n\nExternalities are costs or benefits that affect third parties not involved in the transaction.',
          importantPoints: [
            'Negative externalities create social costs',
            'Positive externalities create social benefits',
            'Markets may not account for externalities'
          ],
          quiz: [
            {
              id: 'q9-1-1',
              question: 'What is a negative externality?',
              options: ['Benefit to third parties', 'Cost to third parties', 'Benefit to producers', 'Cost to consumers'],
              correctAnswer: 1,
              explanation: 'A negative externality is a cost imposed on third parties not involved in the transaction.'
            }
          ]
        },
        {
          id: 'lesson-9-2',
          title: 'Bonus articles: Pollution as a negative externality',
          duration: '18 min',
          videoUrl: '',
          notes: '# Bonus articles: Pollution as a negative externality\n\nPollution is a classic example of negative externality where private costs differ from social costs.',
          importantPoints: [
            'Pollution creates social costs',
            'Private markets overproduce pollution',
            'Government can tax or regulate'
          ],
          quiz: [
            {
              id: 'q9-2-1',
              question: 'Why is pollution a negative externality?',
              options: ['It benefits society', 'It creates costs for third parties', 'It reduces prices', 'It increases profits'],
              correctAnswer: 1,
              explanation: 'Pollution creates costs for third parties who are not involved in the production decision.'
            }
          ]
        },
        {
          id: 'lesson-9-3',
          title: 'Bonus articles: Innovation as a positive externality',
          duration: '18 min',
          videoUrl: '',
          notes: '# Bonus articles: Innovation as a positive externality\n\nInnovation creates benefits for society beyond what innovators capture, leading to underinvestment.',
          importantPoints: [
            'Innovation creates social benefits',
            'Private markets underinvest',
            'Government can subsidize research'
          ],
          quiz: [
            {
              id: 'q9-3-1',
              question: 'Why is innovation a positive externality?',
              options: ['It creates costs', 'It creates benefits for third parties', 'It reduces prices', 'It decreases profits'],
              correctAnswer: 1,
              explanation: 'Innovation creates benefits for third parties beyond what innovators can capture.'
            }
          ]
        },
        {
          id: 'lesson-9-4',
          title: 'The four types of goods: private goods, public goods, common resources, and natural monopolies',
          duration: '25 min',
          videoUrl: '',
          notes: '# The four types of goods: private goods, public goods, common resources, and natural monopolies\n\nGoods are classified by excludability and rivalry. This determines whether markets can provide them efficiently.',
          importantPoints: [
            'Private goods: excludable and rival',
            'Public goods: non-excludable and non-rival',
            'Common resources: non-excludable and rival',
            'Natural monopolies: excludable and non-rival'
          ],
          quiz: [
            {
              id: 'q9-4-1',
              question: 'What characterizes a public good?',
              options: ['Excludable and rival', 'Non-excludable and non-rival', 'Excludable and non-rival', 'Non-excludable and rival'],
              correctAnswer: 1,
              explanation: 'Public goods are non-excludable (cannot prevent use) and non-rival (one person\'s use doesn\'t reduce availability).'
            }
          ]
        }
      ],
      moduleTest: [
        {
          id: 'mt9-1',
          question: 'What is a negative externality?',
          options: ['Benefit to third parties', 'Cost to third parties', 'Benefit to producers', 'Cost to producers'],
          correctAnswer: 1
        }
      ]
    }
  ],
  finalExam: [
    {
      id: 'fe-1',
      question: 'What is the fundamental economic problem?',
      options: ['Unlimited resources', 'Scarcity', 'High prices', 'Government intervention'],
      correctAnswer: 1
    },
    {
      id: 'fe-2',
      question: 'When is profit maximized?',
      options: ['When MR > MC', 'When MR = MC', 'When MR < MC', 'When price is highest'],
      correctAnswer: 1
    },
    {
      id: 'fe-3',
      question: 'What characterizes perfect competition?',
      options: ['Few firms', 'Many firms with identical products', 'One firm', 'Differentiated products'],
      correctAnswer: 1
    }
  ]
},
{
  id: 'finance-markets',
  title: 'Finance & Markets',
  description: 'Advanced understanding of financial markets, instruments, and trading strategies',
  finalExamPassRate: 75,
  modules: [
    {
      id: 'module-1',
      title: 'Unit 1: Interest and debt',
      description: 'Understanding interest rates, compound interest, and debt management',
      lessons: [
        {
          id: 'lesson-1-1',
          title: 'Compound interest basics',
          duration: '18 min',
          videoUrl: '',
          notes: '# Compound interest basics\n\nCompound interest is interest calculated on the initial principal and accumulated interest from previous periods.',
          importantPoints: [
            'Compound interest grows exponentially',
            'Time is a powerful factor in compounding',
            'Frequency of compounding affects returns'
          ],
          quiz: [
            {
              id: 'q1-1-1',
              question: 'What is compound interest?',
              options: ['Interest on principal only', 'Interest on principal plus accumulated interest', 'Simple interest', 'Fixed interest'],
              correctAnswer: 1,
              explanation: 'Compound interest is calculated on both the principal and previously accumulated interest.'
            }
          ]
        },
        {
          id: 'lesson-1-2',
          title: 'Interest basics',
          duration: '15 min',
          videoUrl: '',
          notes: '# Interest basics\n\nInterest is the cost of borrowing money or the return on lending money.',
          importantPoints: [
            'Interest rate represents the cost of money',
            'Risk affects interest rates',
            'Time period matters'
          ],
          quiz: [
            {
              id: 'q1-2-1',
              question: 'What does interest rate represent?',
              options: ['Price of goods', 'Cost of money', 'Tax rate', 'Inflation rate'],
              correctAnswer: 1,
              explanation: 'Interest rate represents the cost of borrowing money or the return on lending.'
            }
          ]
        },
        {
          id: 'lesson-1-3',
          title: 'Credit cards and loans',
          duration: '20 min',
          videoUrl: '',
          notes: '# Credit cards and loans\n\nUnderstanding how credit cards and loans work, including interest calculations and repayment strategies.',
          importantPoints: [
            'Credit cards charge high interest rates',
            'Minimum payments extend debt',
            'Understanding APR is crucial'
          ],
          quiz: [
            {
              id: 'q1-3-1',
              question: 'Why do minimum payments extend debt?',
              options: ['They reduce principal quickly', 'They mostly pay interest, not principal', 'They increase interest rate', 'They eliminate debt'],
              correctAnswer: 1,
              explanation: 'Minimum payments mostly cover interest, leaving principal largely unchanged and extending repayment period.'
            }
          ]
        },
        {
          id: 'lesson-1-4',
          title: 'Continuous compound interest and e',
          duration: '18 min',
          videoUrl: '',
          notes: '# Continuous compound interest and e\n\nContinuous compounding uses the mathematical constant e to calculate interest compounded infinitely.',
          importantPoints: [
            'Continuous compounding uses e',
            'More frequent compounding increases returns',
            'Formula: A = Pe^(rt)'
          ],
          quiz: [
            {
              id: 'q1-4-1',
              question: 'What is the mathematical constant used in continuous compounding?',
              options: ['π', 'e', 'i', '∞'],
              correctAnswer: 1,
              explanation: 'The constant e (approximately 2.718) is used in continuous compound interest calculations.'
            }
          ]
        },
        {
          id: 'lesson-1-5',
          title: 'Present value',
          duration: '22 min',
          videoUrl: '',
          notes: '# Present value\n\nPresent value is the current worth of a future sum of money, discounted at a specific interest rate.',
          importantPoints: [
            'Present value discounts future cash flows',
            'Discount rate affects present value',
            'Time value of money concept'
          ],
          quiz: [
            {
              id: 'q1-5-1',
              question: 'What is present value?',
              options: ['Future value', 'Current worth of future money', 'Interest rate', 'Principal amount'],
              correctAnswer: 1,
              explanation: 'Present value is the current worth of a future sum of money, discounted at an interest rate.'
            }
          ]
        },
        {
          id: 'lesson-1-6',
          title: 'Personal bankruptcy',
          duration: '20 min',
          videoUrl: '',
          notes: '# Personal bankruptcy\n\nBankruptcy is a legal process that provides relief to individuals who cannot repay their debts.',
          importantPoints: [
            'Bankruptcy provides debt relief',
            'Different types: Chapter 7 and Chapter 13',
            'Long-term credit impact'
          ],
          quiz: [
            {
              id: 'q1-6-1',
              question: 'What is personal bankruptcy?',
              options: ['Debt elimination', 'Legal process for debt relief', 'Debt increase', 'Credit improvement'],
              correctAnswer: 1,
              explanation: 'Bankruptcy is a legal process that provides relief to individuals unable to repay debts.'
            }
          ]
        }
      ],
      moduleTest: [
        {
          id: 'mt1-1',
          question: 'What is compound interest?',
          options: ['Interest on principal only', 'Interest on principal plus accumulated interest', 'Simple interest', 'Fixed interest'],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 'module-2',
      title: 'Unit 2: Housing',
      description: 'Understanding housing decisions, mortgages, and home ownership',
      lessons: [
        {
          id: 'lesson-2-1',
          title: 'Home equity and personal balance sheets',
          duration: '18 min',
          videoUrl: '',
          notes: '# Home equity and personal balance sheets\n\nHome equity is the difference between home value and mortgage balance. Balance sheets track assets and liabilities.',
          importantPoints: [
            'Home equity = Home value - Mortgage',
            'Balance sheets show net worth',
            'Equity builds over time'
          ],
          quiz: [
            {
              id: 'q2-1-1',
              question: 'What is home equity?',
              options: ['Mortgage amount', 'Home value minus mortgage', 'Home value only', 'Down payment'],
              correctAnswer: 1,
              explanation: 'Home equity is the difference between the home\'s market value and the outstanding mortgage balance.'
            }
          ]
        },
        {
          id: 'lesson-2-2',
          title: 'Renting vs. buying a home',
          duration: '22 min',
          videoUrl: '',
          notes: '# Renting vs. buying a home\n\nComparing the financial and lifestyle implications of renting versus buying a home.',
          importantPoints: [
            'Renting offers flexibility',
            'Buying builds equity',
            'Consider total cost of ownership'
          ],
          quiz: [
            {
              id: 'q2-2-1',
              question: 'What is a key advantage of renting?',
              options: ['Building equity', 'Flexibility and mobility', 'Tax deductions', 'Forced savings'],
              correctAnswer: 1,
              explanation: 'Renting offers flexibility and mobility without the commitment and costs of homeownership.'
            }
          ]
        },
        {
          id: 'lesson-2-3',
          title: 'Mortgages',
          duration: '25 min',
          videoUrl: '',
          notes: '# Mortgages\n\nMortgages are loans used to purchase real estate, secured by the property itself.',
          importantPoints: [
            'Fixed vs adjustable rate mortgages',
            'Down payment requirements',
            'Amortization schedules'
          ],
          quiz: [
            {
              id: 'q2-3-1',
              question: 'What is a mortgage?',
              options: ['Home insurance', 'Loan secured by property', 'Property tax', 'Home maintenance'],
              correctAnswer: 1,
              explanation: 'A mortgage is a loan used to purchase real estate, secured by the property as collateral.'
            }
          ]
        },
        {
          id: 'lesson-2-4',
          title: 'Home buying process',
          duration: '20 min',
          videoUrl: '',
          notes: '# Home buying process\n\nThe steps involved in purchasing a home, from pre-approval to closing.',
          importantPoints: [
            'Get pre-approved first',
            'Home inspection is crucial',
            'Closing costs add to total price'
          ],
          quiz: [
            {
              id: 'q2-4-1',
              question: 'What should you do first when buying a home?',
              options: ['Make an offer', 'Get pre-approved', 'Skip inspection', 'Buy immediately'],
              correctAnswer: 1,
              explanation: 'Getting pre-approved helps you understand your budget and strengthens your offer.'
            }
          ]
        }
      ],
      moduleTest: [
        {
          id: 'mt2-1',
          question: 'What is home equity?',
          options: ['Mortgage amount', 'Home value minus mortgage', 'Home value only', 'Down payment'],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 'module-3',
      title: 'Unit 3: Inflation',
      description: 'Understanding inflation, its causes, and its effects on the economy',
      lessons: [
        {
          id: 'lesson-3-1',
          title: 'Inflation basics',
          duration: '18 min',
          videoUrl: '',
          notes: '# Inflation basics\n\nInflation is the rate at which the general level of prices for goods and services rises.',
          importantPoints: [
            'Inflation erodes purchasing power',
            'Measured by CPI and other indices',
            'Moderate inflation is normal'
          ],
          quiz: [
            {
              id: 'q3-1-1',
              question: 'What is inflation?',
              options: ['Price decrease', 'Rising price levels', 'Unemployment', 'Interest rates'],
              correctAnswer: 1,
              explanation: 'Inflation is the rate at which the general level of prices for goods and services rises over time.'
            }
          ]
        },
        {
          id: 'lesson-3-2',
          title: 'Inflation scenarios',
          duration: '20 min',
          videoUrl: '',
          notes: '# Inflation scenarios\n\nDifferent inflation scenarios and their economic impacts.',
          importantPoints: [
            'Hyperinflation is extreme',
            'Deflation can be problematic',
            'Stagflation combines inflation and stagnation'
          ],
          quiz: [
            {
              id: 'q3-2-1',
              question: 'What is hyperinflation?',
              options: ['Low inflation', 'Extremely high inflation', 'No inflation', 'Negative inflation'],
              correctAnswer: 1,
              explanation: 'Hyperinflation is extremely rapid inflation, typically over 50% per month.'
            }
          ]
        },
        {
          id: 'lesson-3-3',
          title: 'Real and nominal return',
          duration: '20 min',
          videoUrl: '',
          notes: '# Real and nominal return\n\nNominal return is the return before adjusting for inflation. Real return accounts for inflation.',
          importantPoints: [
            'Nominal return includes inflation',
            'Real return = Nominal - Inflation',
            'Real return shows true purchasing power'
          ],
          quiz: [
            {
              id: 'q3-3-1',
              question: 'What is real return?',
              options: ['Nominal return', 'Nominal return minus inflation', 'Inflation rate', 'Interest rate'],
              correctAnswer: 1,
              explanation: 'Real return is nominal return adjusted for inflation, showing true purchasing power.'
            }
          ]
        },
        {
          id: 'lesson-3-4',
          title: 'Capacity utilization and inflation',
          duration: '18 min',
          videoUrl: '',
          notes: '# Capacity utilization and inflation\n\nCapacity utilization measures how much of an economy\'s productive capacity is being used.',
          importantPoints: [
            'High capacity utilization can drive inflation',
            'Low utilization suggests slack',
            'Optimal level around 80-85%'
          ],
          quiz: [
            {
              id: 'q3-4-1',
              question: 'What does high capacity utilization suggest?',
              options: ['Economic slack', 'Potential inflation pressure', 'Deflation', 'Recession'],
              correctAnswer: 1,
              explanation: 'High capacity utilization suggests the economy is operating near full capacity, which can create inflation pressure.'
            }
          ]
        },
        {
          id: 'lesson-3-5',
          title: 'Deflation',
          duration: '18 min',
          videoUrl: '',
          notes: '# Deflation\n\nDeflation is a decrease in the general price level of goods and services.',
          importantPoints: [
            'Deflation increases real debt burden',
            'Can lead to deflationary spiral',
            'Central banks try to prevent deflation'
          ],
          quiz: [
            {
              id: 'q3-5-1',
              question: 'What is deflation?',
              options: ['Price increase', 'Price decrease', 'Price stability', 'High inflation'],
              correctAnswer: 1,
              explanation: 'Deflation is a decrease in the general price level of goods and services.'
            }
          ]
        }
      ],
      moduleTest: [
        {
          id: 'mt3-1',
          question: 'What is inflation?',
          options: ['Price decrease', 'Rising price levels', 'Unemployment', 'Interest rates'],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 'module-4',
      title: 'Unit 4: Taxes',
      description: 'Understanding personal and corporate taxation',
      lessons: [
        {
          id: 'lesson-4-1',
          title: 'Personal taxes',
          duration: '22 min',
          videoUrl: '',
          notes: '# Personal taxes\n\nPersonal income taxes are levied on individual earnings and vary by income level and jurisdiction.',
          importantPoints: [
            'Progressive tax systems',
            'Deductions reduce taxable income',
            'Tax brackets determine rates'
          ],
          quiz: [
            {
              id: 'q4-1-1',
              question: 'What is a progressive tax system?',
              options: ['Same rate for all', 'Higher rate for higher income', 'Lower rate for higher income', 'No taxes'],
              correctAnswer: 1,
              explanation: 'A progressive tax system applies higher tax rates to higher income levels.'
            }
          ]
        },
        {
          id: 'lesson-4-2',
          title: 'Corporate taxation',
          duration: '22 min',
          videoUrl: '',
          notes: '# Corporate taxation\n\nCorporate taxes are levied on company profits and vary by jurisdiction and business structure.',
          importantPoints: [
            'Corporate tax rates vary',
            'Tax deductions for business expenses',
            'Double taxation on dividends'
          ],
          quiz: [
            {
              id: 'q4-2-1',
              question: 'What are corporate taxes based on?',
              options: ['Revenue', 'Profits', 'Assets', 'Employees'],
              correctAnswer: 1,
              explanation: 'Corporate taxes are typically based on company profits, not revenue or other metrics.'
            }
          ]
        }
      ],
      moduleTest: [
        {
          id: 'mt4-1',
          question: 'What is a progressive tax system?',
          options: ['Same rate for all', 'Higher rate for higher income', 'Lower rate for higher income', 'No taxes'],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 'module-5',
      title: 'Unit 5: Accounting and financial statements',
      description: 'Understanding accounting principles and financial statements',
      lessons: [
        {
          id: 'lesson-5-1',
          title: 'Cash versus accrual accounting',
          duration: '20 min',
          videoUrl: '',
          notes: '# Cash versus accrual accounting\n\nCash accounting records transactions when cash changes hands. Accrual accounting records when transactions occur.',
          importantPoints: [
            'Cash accounting: record when paid',
            'Accrual accounting: record when earned',
            'GAAP requires accrual for businesses'
          ],
          quiz: [
            {
              id: 'q5-1-1',
              question: 'What is the difference between cash and accrual accounting?',
              options: ['No difference', 'Timing of when transactions are recorded', 'Amount recorded', 'Tax treatment'],
              correctAnswer: 1,
              explanation: 'Cash accounting records when cash changes hands; accrual records when transactions occur.'
            }
          ]
        },
        {
          id: 'lesson-5-2',
          title: 'Three core financial statements',
          duration: '25 min',
          videoUrl: '',
          notes: '# Three core financial statements\n\nThe income statement, balance sheet, and cash flow statement provide different views of a company\'s financial health.',
          importantPoints: [
            'Income statement: revenues and expenses',
            'Balance sheet: assets, liabilities, equity',
            'Cash flow statement: cash movements'
          ],
          quiz: [
            {
              id: 'q5-2-1',
              question: 'What are the three core financial statements?',
              options: ['Income, Balance, Cash Flow', 'Revenue, Profit, Loss', 'Assets, Liabilities, Equity', 'Tax, Interest, Principal'],
              correctAnswer: 0,
              explanation: 'The three core financial statements are the income statement, balance sheet, and cash flow statement.'
            }
          ]
        },
        {
          id: 'lesson-5-3',
          title: 'Depreciation and amortization',
          duration: '20 min',
          videoUrl: '',
          notes: '# Depreciation and amortization\n\nDepreciation allocates the cost of tangible assets. Amortization allocates the cost of intangible assets.',
          importantPoints: [
            'Depreciation for tangible assets',
            'Amortization for intangible assets',
            'Non-cash expenses'
          ],
          quiz: [
            {
              id: 'q5-3-1',
              question: 'What is depreciation?',
              options: ['Asset appreciation', 'Allocation of tangible asset costs', 'Liability increase', 'Revenue decrease'],
              correctAnswer: 1,
              explanation: 'Depreciation is the allocation of the cost of tangible assets over their useful life.'
            }
          ]
        }
      ],
      moduleTest: [
        {
          id: 'mt5-1',
          question: 'What is the difference between cash and accrual accounting?',
          options: ['No difference', 'Timing of when transactions are recorded', 'Amount recorded', 'Tax treatment'],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 'module-6',
      title: 'Unit 6: Stocks and bonds',
      description: 'Understanding stocks, bonds, and corporate finance',
      lessons: [
        {
          id: 'lesson-6-1',
          title: 'Introduction to stocks',
          duration: '20 min',
          videoUrl: '',
          notes: '# Introduction to stocks\n\nStocks represent ownership shares in a corporation, entitling holders to a portion of profits and assets.',
          importantPoints: [
            'Stocks represent ownership',
            'Common vs preferred stock',
            'Stockholders have voting rights'
          ],
          quiz: [
            {
              id: 'q6-1-1',
              question: 'What do stocks represent?',
              options: ['Debt', 'Ownership in a company', 'Insurance', 'Tax liability'],
              correctAnswer: 1,
              explanation: 'Stocks represent ownership shares in a corporation.'
            }
          ]
        },
        {
          id: 'lesson-6-2',
          title: 'Shorting stock',
          duration: '22 min',
          videoUrl: '',
          notes: '# Shorting stock\n\nShort selling involves borrowing and selling stock with the expectation of buying it back at a lower price.',
          importantPoints: [
            'Short selling bets on price decline',
            'Unlimited loss potential',
            'Requires margin account'
          ],
          quiz: [
            {
              id: 'q6-2-1',
              question: 'What is short selling?',
              options: ['Buying stock', 'Selling borrowed stock to profit from decline', 'Holding stock', 'Dividend collection'],
              correctAnswer: 1,
              explanation: 'Short selling involves borrowing and selling stock, hoping to buy back at a lower price.'
            }
          ]
        },
        {
          id: 'lesson-6-3',
          title: 'Understanding company statements and capital structure',
          duration: '25 min',
          videoUrl: '',
          notes: '# Understanding company statements and capital structure\n\nCapital structure refers to how a company finances its operations through debt and equity.',
          importantPoints: [
            'Debt-to-equity ratio matters',
            'Optimal capital structure balances risk',
            'Financial statements reveal structure'
          ],
          quiz: [
            {
              id: 'q6-3-1',
              question: 'What is capital structure?',
              options: ['Company location', 'Mix of debt and equity financing', 'Employee structure', 'Product line'],
              correctAnswer: 1,
              explanation: 'Capital structure is how a company finances its operations through debt and equity.'
            }
          ]
        },
        {
          id: 'lesson-6-4',
          title: 'Corporate metrics and valuation',
          duration: '25 min',
          videoUrl: '',
          notes: '# Corporate metrics and valuation\n\nValuation metrics like P/E ratio, EBITDA, and market cap help assess company value.',
          importantPoints: [
            'P/E ratio compares price to earnings',
            'Market cap = shares × price',
            'Multiple metrics provide context'
          ],
          quiz: [
            {
              id: 'q6-4-1',
              question: 'What does P/E ratio measure?',
              options: ['Profit margin', 'Price relative to earnings', 'Revenue growth', 'Debt level'],
              correctAnswer: 1,
              explanation: 'P/E ratio (price-to-earnings) compares stock price to earnings per share.'
            }
          ]
        },
        {
          id: 'lesson-6-5',
          title: 'Life of a company—from birth to death',
          duration: '22 min',
          videoUrl: '',
          notes: '# Life of a company—from birth to death\n\nCompanies go through stages: startup, growth, maturity, and potentially decline or acquisition.',
          importantPoints: [
            'Startup: high risk, high growth potential',
            'Maturity: stable operations',
            'Exit strategies: IPO, acquisition, liquidation'
          ],
          quiz: [
            {
              id: 'q6-5-1',
              question: 'What are typical company life stages?',
              options: ['Only growth', 'Startup, growth, maturity, decline', 'Only maturity', 'Only decline'],
              correctAnswer: 1,
              explanation: 'Companies typically progress through startup, growth, maturity, and potentially decline stages.'
            }
          ]
        },
        {
          id: 'lesson-6-6',
          title: 'Dilution',
          duration: '18 min',
          videoUrl: '',
          notes: '# Dilution\n\nDilution occurs when a company issues new shares, reducing existing shareholders\' ownership percentage.',
          importantPoints: [
            'New shares reduce ownership %',
            'Can occur through secondary offerings',
            'Stock splits don\'t cause dilution'
          ],
          quiz: [
            {
              id: 'q6-6-1',
              question: 'What is stock dilution?',
              options: ['Price increase', 'Reduction in ownership percentage', 'Dividend increase', 'Revenue increase'],
              correctAnswer: 1,
              explanation: 'Dilution occurs when new shares are issued, reducing existing shareholders\' ownership percentage.'
            }
          ]
        },
        {
          id: 'lesson-6-7',
          title: 'Mergers and acquisitions',
          duration: '22 min',
          videoUrl: '',
          notes: '# Mergers and acquisitions\n\nM&A involves companies combining through mergers or one acquiring another.',
          importantPoints: [
            'Mergers combine two companies',
            'Acquisitions involve one buying another',
            'Synergies drive M&A activity'
          ],
          quiz: [
            {
              id: 'q6-7-1',
              question: 'What is a merger?',
              options: ['One company buying another', 'Two companies combining', 'Company splitting', 'Stock dilution'],
              correctAnswer: 1,
              explanation: 'A merger is when two companies combine to form a new entity.'
            }
          ]
        },
        {
          id: 'lesson-6-8',
          title: 'Leveraged buy-outs',
          duration: '22 min',
          videoUrl: '',
          notes: '# Leveraged buy-outs\n\nLBOs use borrowed money to acquire companies, with the target\'s assets often used as collateral.',
          importantPoints: [
            'LBOs use significant debt',
            'Target assets secure the debt',
            'High risk, high reward'
          ],
          quiz: [
            {
              id: 'q6-8-1',
              question: 'What is a leveraged buyout?',
              options: ['Cash purchase', 'Acquisition using borrowed money', 'Stock swap', 'Merger'],
              correctAnswer: 1,
              explanation: 'A leveraged buyout uses borrowed money, often secured by the target company\'s assets.'
            }
          ]
        },
        {
          id: 'lesson-6-9',
          title: 'Bonds',
          duration: '20 min',
          videoUrl: '',
          notes: '# Bonds\n\nBonds are debt securities where investors lend money to issuers in exchange for periodic interest and principal repayment.',
          importantPoints: [
            'Bonds are debt instruments',
            'Fixed income securities',
            'Credit rating affects yield'
          ],
          quiz: [
            {
              id: 'q6-9-1',
              question: 'What is a bond?',
              options: ['Ownership share', 'Debt security', 'Derivative', 'Commodity'],
              correctAnswer: 1,
              explanation: 'A bond is a debt security where investors lend money in exchange for interest and principal repayment.'
            }
          ]
        },
        {
          id: 'lesson-6-10',
          title: 'Corporate bankruptcy',
          duration: '20 min',
          videoUrl: '',
          notes: '# Corporate bankruptcy\n\nCorporate bankruptcy is a legal process for companies unable to meet debt obligations.',
          importantPoints: [
            'Chapter 11: reorganization',
            'Chapter 7: liquidation',
            'Creditors have priority'
          ],
          quiz: [
            {
              id: 'q6-10-1',
              question: 'What is Chapter 11 bankruptcy?',
              options: ['Liquidation', 'Reorganization', 'Debt elimination', 'Tax avoidance'],
              correctAnswer: 1,
              explanation: 'Chapter 11 allows companies to reorganize while continuing operations.'
            }
          ]
        }
      ],
      moduleTest: [
        {
          id: 'mt6-1',
          question: 'What do stocks represent?',
          options: ['Debt', 'Ownership in a company', 'Insurance', 'Tax liability'],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 'module-7',
      title: 'Unit 7: Investment vehicles, insurance, and retirement',
      description: 'Understanding investment options, insurance, and retirement planning',
      lessons: [
        {
          id: 'lesson-7-1',
          title: 'Mutual funds and ETFs',
          duration: '22 min',
          videoUrl: '',
          notes: '# Mutual funds and ETFs\n\nMutual funds and ETFs pool money from multiple investors to invest in diversified portfolios.',
          importantPoints: [
            'ETFs trade like stocks',
            'Mutual funds priced once daily',
            'Both provide diversification'
          ],
          quiz: [
            {
              id: 'q7-1-1',
              question: 'What is a key difference between ETFs and mutual funds?',
              options: ['ETFs trade throughout day', 'Mutual funds are cheaper', 'ETFs have no fees', 'No difference'],
              correctAnswer: 0,
              explanation: 'ETFs trade like stocks throughout the day, while mutual funds are priced once at market close.'
            }
          ]
        },
        {
          id: 'lesson-7-2',
          title: 'Retirement accounts: IRAs and 401ks',
          duration: '25 min',
          videoUrl: '',
          notes: '# Retirement accounts: IRAs and 401ks\n\nRetirement accounts offer tax advantages for long-term savings.',
          importantPoints: [
            '401(k): employer-sponsored',
            'IRA: individual retirement account',
            'Tax-deferred or tax-free growth'
          ],
          quiz: [
            {
              id: 'q7-2-1',
              question: 'What is a 401(k)?',
              options: ['Individual account', 'Employer-sponsored retirement plan', 'Tax account', 'Savings account'],
              correctAnswer: 1,
              explanation: 'A 401(k) is an employer-sponsored retirement savings plan with tax advantages.'
            }
          ]
        },
        {
          id: 'lesson-7-3',
          title: 'Life insurance',
          duration: '20 min',
          videoUrl: '',
          notes: '# Life insurance\n\nLife insurance provides financial protection to beneficiaries upon the policyholder\'s death.',
          importantPoints: [
            'Term vs whole life insurance',
            'Beneficiaries receive death benefit',
            'Premiums based on risk factors'
          ],
          quiz: [
            {
              id: 'q7-3-1',
              question: 'What is life insurance?',
              options: ['Health coverage', 'Financial protection for beneficiaries', 'Property insurance', 'Auto insurance'],
              correctAnswer: 1,
              explanation: 'Life insurance provides financial protection to beneficiaries when the policyholder dies.'
            }
          ]
        },
        {
          id: 'lesson-7-4',
          title: 'Hedge funds',
          duration: '22 min',
          videoUrl: '',
          notes: '# Hedge funds\n\nHedge funds are private investment partnerships that use various strategies to generate returns.',
          importantPoints: [
            'Limited to accredited investors',
            'Higher fees than mutual funds',
            'Use leverage and derivatives'
          ],
          quiz: [
            {
              id: 'q7-4-1',
              question: 'Who can invest in hedge funds?',
              options: ['Anyone', 'Accredited investors only', 'Only institutions', 'Government only'],
              correctAnswer: 1,
              explanation: 'Hedge funds are typically limited to accredited investors due to their complexity and risk.'
            }
          ]
        },
        {
          id: 'lesson-7-5',
          title: 'Investment and consumption',
          duration: '20 min',
          videoUrl: '',
          notes: '# Investment and consumption\n\nThe balance between saving/investing and consuming affects long-term financial security.',
          importantPoints: [
            'Investment defers consumption',
            'Time value of money',
            'Balance is key'
          ],
          quiz: [
            {
              id: 'q7-5-1',
              question: 'What is the relationship between investment and consumption?',
              options: ['No relationship', 'Investment defers consumption', 'Same thing', 'Investment increases consumption'],
              correctAnswer: 1,
              explanation: 'Investment involves deferring current consumption to potentially increase future consumption.'
            }
          ]
        }
      ],
      moduleTest: [
        {
          id: 'mt7-1',
          question: 'What is a key difference between ETFs and mutual funds?',
          options: ['ETFs trade throughout day', 'Mutual funds are cheaper', 'ETFs have no fees', 'No difference'],
          correctAnswer: 0
        }
      ]
    },
    {
      id: 'module-8',
      title: 'Unit 8: Money, banking and central banks',
      description: 'Understanding monetary systems, banking, and central bank policies',
      lessons: [
        {
          id: 'lesson-8-1',
          title: 'Banking and money',
          duration: '22 min',
          videoUrl: '',
          notes: '# Banking and money\n\nBanks create money through lending and play a crucial role in the monetary system.',
          importantPoints: [
            'Banks create money through lending',
            'Fractional reserve banking',
            'Money supply includes M1, M2, M3'
          ],
          quiz: [
            {
              id: 'q8-1-1',
              question: 'How do banks create money?',
              options: ['Printing', 'Through lending', 'Government grants', 'Deposits only'],
              correctAnswer: 1,
              explanation: 'Banks create money through the lending process in a fractional reserve system.'
            }
          ]
        },
        {
          id: 'lesson-8-2',
          title: 'Quantitative easing',
          duration: '22 min',
          videoUrl: '',
          notes: '# Quantitative easing\n\nQE is a monetary policy where central banks purchase securities to increase money supply and lower interest rates.',
          importantPoints: [
            'Central bank buys securities',
            'Increases money supply',
            'Aims to stimulate economy'
          ],
          quiz: [
            {
              id: 'q8-2-1',
              question: 'What is quantitative easing?',
              options: ['Selling securities', 'Buying securities to increase money supply', 'Raising interest rates', 'Tax policy'],
              correctAnswer: 1,
              explanation: 'Quantitative easing involves central banks buying securities to increase money supply and stimulate the economy.'
            }
          ]
        },
        {
          id: 'lesson-8-3',
          title: '2008 bank bailout',
          duration: '25 min',
          videoUrl: '',
          notes: '# 2008 bank bailout\n\nThe 2008 financial crisis led to massive government bailouts of financial institutions.',
          importantPoints: [
            'TARP program',
            'Prevented systemic collapse',
            'Controversial but necessary'
          ],
          quiz: [
            {
              id: 'q8-3-1',
              question: 'What was the purpose of the 2008 bank bailout?',
              options: ['Increase profits', 'Prevent systemic collapse', 'Reduce competition', 'Increase taxes'],
              correctAnswer: 1,
              explanation: 'The 2008 bank bailout aimed to prevent systemic collapse of the financial system.'
            }
          ]
        },
        {
          id: 'lesson-8-4',
          title: 'Geithner plan',
          duration: '20 min',
          videoUrl: '',
          notes: '# Geithner plan\n\nThe Geithner plan was a strategy to address toxic assets during the financial crisis.',
          importantPoints: [
            'Public-private investment program',
            'Addressed toxic assets',
            'Part of crisis response'
          ],
          quiz: [
            {
              id: 'q8-4-1',
              question: 'What did the Geithner plan address?',
              options: ['Taxes', 'Toxic assets', 'Employment', 'Healthcare'],
              correctAnswer: 1,
              explanation: 'The Geithner plan was designed to address toxic assets on bank balance sheets.'
            }
          ]
        },
        {
          id: 'lesson-8-5',
          title: 'Foreign exchange and trade',
          duration: '22 min',
          videoUrl: '',
          notes: '# Foreign exchange and trade\n\nForeign exchange markets determine currency exchange rates, affecting international trade.',
          importantPoints: [
            'Exchange rates affect trade',
            'Floating vs fixed rates',
            'Balance of payments'
          ],
          quiz: [
            {
              id: 'q8-5-1',
              question: 'What do foreign exchange markets determine?',
              options: ['Interest rates', 'Currency exchange rates', 'Stock prices', 'Tax rates'],
              correctAnswer: 1,
              explanation: 'Foreign exchange markets determine the exchange rates between different currencies.'
            }
          ]
        },
        {
          id: 'lesson-8-6',
          title: 'Chinese currency and U.S. debt',
          duration: '20 min',
          videoUrl: '',
          notes: '# Chinese currency and U.S. debt\n\nThe relationship between Chinese currency policy and U.S. debt holdings.',
          importantPoints: [
            'China holds significant U.S. debt',
            'Currency manipulation concerns',
            'Trade imbalances'
          ],
          quiz: [
            {
              id: 'q8-6-1',
              question: 'What is a key aspect of China-U.S. financial relationship?',
              options: ['No relationship', 'China holds significant U.S. debt', 'U.S. holds Chinese debt', 'No trade'],
              correctAnswer: 1,
              explanation: 'China holds significant amounts of U.S. government debt, creating an important financial relationship.'
            }
          ]
        },
        {
          id: 'lesson-8-7',
          title: '2011-2012 Greek debt crisis',
          duration: '22 min',
          videoUrl: '',
          notes: '# 2011-2012 Greek debt crisis\n\nThe Greek debt crisis highlighted sovereign debt risks and Eurozone challenges.',
          importantPoints: [
            'Sovereign debt default risk',
            'Eurozone structural issues',
            'Austerity measures'
          ],
          quiz: [
            {
              id: 'q8-7-1',
              question: 'What was the Greek debt crisis?',
              options: ['Bank failure', 'Sovereign debt crisis', 'Currency collapse', 'Trade war'],
              correctAnswer: 1,
              explanation: 'The Greek debt crisis involved the risk of sovereign debt default and Eurozone instability.'
            }
          ]
        },
        {
          id: 'lesson-8-8',
          title: 'Bitcoin',
          duration: '22 min',
          videoUrl: '',
          notes: '# Bitcoin\n\nBitcoin is a decentralized digital currency using blockchain technology.',
          importantPoints: [
            'Decentralized cryptocurrency',
            'Blockchain technology',
            'Volatile and speculative'
          ],
          quiz: [
            {
              id: 'q8-8-1',
              question: 'What is Bitcoin?',
              options: ['Government currency', 'Decentralized digital currency', 'Stock', 'Bond'],
              correctAnswer: 1,
              explanation: 'Bitcoin is a decentralized digital currency that operates without a central authority.'
            }
          ]
        }
      ],
      moduleTest: [
        {
          id: 'mt8-1',
          question: 'How do banks create money?',
          options: ['Printing', 'Through lending', 'Government grants', 'Deposits only'],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 'module-9',
      title: 'Unit 9: Options, swaps, futures, MBSs, CDOs, and other derivatives',
      description: 'Understanding complex financial derivatives and instruments',
      lessons: [
        {
          id: 'lesson-9-1',
          title: 'Put and call options',
          duration: '25 min',
          videoUrl: '',
          notes: '# Put and call options\n\nOptions give the right (but not obligation) to buy (call) or sell (put) an asset at a set price.',
          importantPoints: [
            'Call: right to buy',
            'Put: right to sell',
            'Options have expiration dates'
          ],
          quiz: [
            {
              id: 'q9-1-1',
              question: 'What is a call option?',
              options: ['Right to sell', 'Right to buy', 'Obligation to buy', 'Obligation to sell'],
              correctAnswer: 1,
              explanation: 'A call option gives the holder the right to buy an asset at a specified price.'
            }
          ]
        },
        {
          id: 'lesson-9-2',
          title: 'Forward and futures contracts',
          duration: '22 min',
          videoUrl: '',
          notes: '# Forward and futures contracts\n\nForwards and futures are agreements to buy/sell assets at future dates at predetermined prices.',
          importantPoints: [
            'Forwards: customized, OTC',
            'Futures: standardized, exchange-traded',
            'Used for hedging and speculation'
          ],
          quiz: [
            {
              id: 'q9-2-1',
              question: 'What is a futures contract?',
              options: ['Spot transaction', 'Agreement to trade at future date', 'Option contract', 'Stock purchase'],
              correctAnswer: 1,
              explanation: 'A futures contract is an agreement to buy or sell an asset at a future date at a predetermined price.'
            }
          ]
        },
        {
          id: 'lesson-9-3',
          title: 'Mortgage-backed securities',
          duration: '22 min',
          videoUrl: '',
          notes: '# Mortgage-backed securities\n\nMBS are securities backed by pools of mortgages, allowing investors to invest in mortgage debt.',
          importantPoints: [
            'Pools of mortgages',
            'Securitization process',
            'Played role in 2008 crisis'
          ],
          quiz: [
            {
              id: 'q9-3-1',
              question: 'What are mortgage-backed securities?',
              options: ['Individual mortgages', 'Securities backed by mortgage pools', 'Stock in banks', 'Government bonds'],
              correctAnswer: 1,
              explanation: 'MBS are securities backed by pools of mortgages, allowing investment in mortgage debt.'
            }
          ]
        },
        {
          id: 'lesson-9-4',
          title: 'Collateralized debt obligations',
          duration: '22 min',
          videoUrl: '',
          notes: '# Collateralized debt obligations\n\nCDOs are structured financial products backed by pools of debt obligations, divided into tranches.',
          importantPoints: [
            'Structured products',
            'Tranches with different risk',
            'Complex instruments'
          ],
          quiz: [
            {
              id: 'q9-4-1',
              question: 'What are CDOs?',
              options: ['Simple bonds', 'Structured products backed by debt pools', 'Stocks', 'Cash'],
              correctAnswer: 1,
              explanation: 'CDOs are structured financial products backed by pools of debt obligations, divided into risk tranches.'
            }
          ]
        },
        {
          id: 'lesson-9-5',
          title: 'Credit default swaps',
          duration: '22 min',
          videoUrl: '',
          notes: '# Credit default swaps\n\nCDS are insurance-like contracts that protect against credit default, but can also be used for speculation.',
          importantPoints: [
            'Insurance against default',
            'Can be used for speculation',
            'Counterparty risk'
          ],
          quiz: [
            {
              id: 'q9-5-1',
              question: 'What is a credit default swap?',
              options: ['Stock', 'Insurance against credit default', 'Bond', 'Currency'],
              correctAnswer: 1,
              explanation: 'A CDS is a financial instrument that provides insurance against credit default.'
            }
          ]
        },
        {
          id: 'lesson-9-6',
          title: 'Interest rate swaps',
          duration: '20 min',
          videoUrl: '',
          notes: '# Interest rate swaps\n\nInterest rate swaps allow parties to exchange fixed and floating rate payment streams.',
          importantPoints: [
            'Exchange payment streams',
            'Fixed vs floating rates',
            'Hedging and speculation'
          ],
          quiz: [
            {
              id: 'q9-6-1',
              question: 'What is an interest rate swap?',
              options: ['Stock trade', 'Exchange of payment streams', 'Bond purchase', 'Currency exchange'],
              correctAnswer: 1,
              explanation: 'An interest rate swap involves exchanging fixed and floating rate payment streams.'
            }
          ]
        },
        {
          id: 'lesson-9-7',
          title: 'Black-Scholes formula',
          duration: '25 min',
          videoUrl: '',
          notes: '# Black-Scholes formula\n\nThe Black-Scholes model is a mathematical formula for pricing European options.',
          importantPoints: [
            'Options pricing model',
            'Uses volatility, time, strike price',
            'Nobel Prize-winning work'
          ],
          quiz: [
            {
              id: 'q9-7-1',
              question: 'What does the Black-Scholes formula calculate?',
              options: ['Stock price', 'Option price', 'Bond yield', 'Interest rate'],
              correctAnswer: 1,
              explanation: 'The Black-Scholes formula calculates the theoretical price of European options.'
            }
          ]
        }
      ],
      moduleTest: [
        {
          id: 'mt9-1',
          question: 'What is a call option?',
          options: ['Right to sell', 'Right to buy', 'Obligation to buy', 'Obligation to sell'],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 'module-10',
      title: 'Unit 10: Current economics',
      description: 'Contemporary economic issues and crises',
      lessons: [
        {
          id: 'lesson-10-1',
          title: 'Unemployment',
          duration: '20 min',
          videoUrl: '',
          notes: '# Unemployment\n\nUnemployment measures the percentage of the labor force that is jobless and actively seeking work.',
          importantPoints: [
            'Unemployment rate calculation',
            'Types: frictional, structural, cyclical',
            'Natural rate of unemployment'
          ],
          quiz: [
            {
              id: 'q10-1-1',
              question: 'What does unemployment measure?',
              options: ['Employment rate', 'Percentage of labor force without jobs', 'GDP', 'Inflation'],
              correctAnswer: 1,
              explanation: 'Unemployment measures the percentage of the labor force that is jobless and seeking work.'
            }
          ]
        },
        {
          id: 'lesson-10-2',
          title: 'Housing price conundrum',
          duration: '20 min',
          videoUrl: '',
          notes: '# Housing price conundrum\n\nThe puzzle of housing price movements and their relationship to interest rates and economic conditions.',
          importantPoints: [
            'Housing prices and interest rates',
            'Bubble formation',
            'Regional variations'
          ],
          quiz: [
            {
              id: 'q10-2-1',
              question: 'What affects housing prices?',
              options: ['Only interest rates', 'Interest rates, supply, demand, economic conditions', 'Only supply', 'Only demand'],
              correctAnswer: 1,
              explanation: 'Housing prices are affected by interest rates, supply, demand, and broader economic conditions.'
            }
          ]
        },
        {
          id: 'lesson-10-3',
          title: 'Credit crisis',
          duration: '22 min',
          videoUrl: '',
          notes: '# Credit crisis\n\nThe credit crisis refers to periods when credit becomes scarce and expensive, often leading to economic downturns.',
          importantPoints: [
            'Credit availability dries up',
            'Lending standards tighten',
            'Economic impact'
          ],
          quiz: [
            {
              id: 'q10-3-1',
              question: 'What is a credit crisis?',
              options: ['Abundant credit', 'Scarce and expensive credit', 'Low interest rates', 'High employment'],
              correctAnswer: 1,
              explanation: 'A credit crisis occurs when credit becomes scarce and expensive, restricting lending.'
            }
          ]
        },
        {
          id: 'lesson-10-4',
          title: 'Paulson bailout',
          duration: '20 min',
          videoUrl: '',
          notes: '# Paulson bailout\n\nThe Troubled Asset Relief Program (TARP) was a key response to the 2008 financial crisis.',
          importantPoints: [
            'TARP program',
            'Government intervention',
            'Controversial but necessary'
          ],
          quiz: [
            {
              id: 'q10-4-1',
              question: 'What was the Paulson bailout?',
              options: ['Tax cut', 'TARP program to address financial crisis', 'Trade agreement', 'Healthcare reform'],
              correctAnswer: 1,
              explanation: 'The Paulson bailout refers to TARP, a program to stabilize the financial system during the 2008 crisis.'
            }
          ]
        },
        {
          id: 'lesson-10-5',
          title: 'European Union',
          duration: '22 min',
          videoUrl: '',
          notes: '# European Union\n\nThe EU is a political and economic union of European countries with shared policies and currency.',
          importantPoints: [
            'Economic and political union',
            'Eurozone monetary policy',
            'Challenges and benefits'
          ],
          quiz: [
            {
              id: 'q10-5-1',
              question: 'What is the European Union?',
              options: ['Single country', 'Political and economic union', 'Trade organization', 'Military alliance'],
              correctAnswer: 1,
              explanation: 'The EU is a political and economic union of European countries with shared policies.'
            }
          ]
        }
      ],
      moduleTest: [
        {
          id: 'mt10-1',
          question: 'What does unemployment measure?',
          options: ['Employment rate', 'Percentage of labor force without jobs', 'GDP', 'Inflation'],
          correctAnswer: 1
        }
      ]
    }
  ],
  finalExam: [
    {
      id: 'fe-1',
      question: 'What is compound interest?',
      options: ['Interest on principal only', 'Interest on principal plus accumulated interest', 'Simple interest', 'Fixed interest'],
      correctAnswer: 1
    },
    {
      id: 'fe-2',
      question: 'What do stocks represent?',
      options: ['Debt', 'Ownership in a company', 'Insurance', 'Tax liability'],
      correctAnswer: 1
    },
    {
      id: 'fe-3',
      question: 'What is a call option?',
      options: ['Right to sell', 'Right to buy', 'Obligation to buy', 'Obligation to sell'],
      correctAnswer: 1
    }
  ]
},
{
  id: 'economics-personal-finance',
  title: 'Economics & Personal Finance',
  description: 'Practical application of economic principles to personal financial planning and decision-making',
  finalExamPassRate: 75,
  modules: [
    {
      id: 'module-1',
      title: 'Unit 1: Foundations of economics',
      description: 'Fundamental economic concepts and principles',
      lessons: [
        {
          id: 'lesson-1-1',
          title: 'Scarcity',
          duration: '15 min',
          videoUrl: '',
          notes: '# Scarcity\n\nScarcity is the fundamental economic problem of having unlimited wants but limited resources.',
          importantPoints: [
            'Unlimited wants, limited resources',
            'Forces choices and trade-offs',
            'Foundation of all economics'
          ],
          quiz: [
            {
              id: 'q1-1-1',
              question: 'What is scarcity?',
              options: ['Abundance of resources', 'Unlimited wants with limited resources', 'No wants', 'Infinite resources'],
              correctAnswer: 1,
              explanation: 'Scarcity is the fundamental economic problem of unlimited wants but limited resources.'
            }
          ]
        },
        {
          id: 'lesson-1-2',
          title: 'Costs and benefits',
          duration: '18 min',
          videoUrl: '',
          notes: '# Costs and benefits\n\nDecision-making involves weighing costs against benefits to make rational choices.',
          importantPoints: [
            'Every choice has costs and benefits',
            'Opportunity cost is the next best alternative',
            'Rational decisions maximize net benefits'
          ],
          quiz: [
            {
              id: 'q1-2-1',
              question: 'What is opportunity cost?',
              options: ['Monetary cost', 'The next best alternative given up', 'Total cost', 'Fixed cost'],
              correctAnswer: 1,
              explanation: 'Opportunity cost is the value of the next best alternative that must be given up when making a choice.'
            }
          ]
        },
        {
          id: 'lesson-1-3',
          title: 'Decision making and unintended consequences',
          duration: '20 min',
          videoUrl: '',
          notes: '# Decision making and unintended consequences\n\nEconomic decisions can have unintended consequences that affect individuals and society.',
          importantPoints: [
            'Decisions have ripple effects',
            'Unintended consequences are common',
            'Consider broader impacts'
          ],
          quiz: [
            {
              id: 'q1-3-1',
              question: 'What are unintended consequences?',
              options: ['Planned outcomes', 'Unexpected results of decisions', 'No consequences', 'Only positive effects'],
              correctAnswer: 1,
              explanation: 'Unintended consequences are unexpected results that occur from economic decisions.'
            }
          ]
        },
        {
          id: 'lesson-1-4',
          title: 'Factors of production',
          duration: '18 min',
          videoUrl: '',
          notes: '# Factors of production\n\nThe factors of production are resources used to produce goods and services: land, labor, capital, and entrepreneurship.',
          importantPoints: [
            'Land: natural resources',
            'Labor: human effort',
            'Capital: tools and equipment',
            'Entrepreneurship: innovation and risk-taking'
          ],
          quiz: [
            {
              id: 'q1-4-1',
              question: 'What are the factors of production?',
              options: ['Only labor', 'Land, labor, capital, entrepreneurship', 'Only capital', 'Only land'],
              correctAnswer: 1,
              explanation: 'The four factors of production are land, labor, capital, and entrepreneurship.'
            }
          ]
        },
        {
          id: 'lesson-1-5',
          title: 'Human capital and income',
          duration: '20 min',
          videoUrl: '',
          notes: '# Human capital and income\n\nHuman capital refers to the knowledge, skills, and experience that increase earning potential.',
          importantPoints: [
            'Education builds human capital',
            'Skills increase income potential',
            'Investment in human capital pays off'
          ],
          quiz: [
            {
              id: 'q1-5-1',
              question: 'What is human capital?',
              options: ['Physical assets', 'Knowledge, skills, and experience', 'Money', 'Property'],
              correctAnswer: 1,
              explanation: 'Human capital is the knowledge, skills, and experience that increase a person\'s earning potential.'
            }
          ]
        },
        {
          id: 'lesson-1-6',
          title: 'Economic systems',
          duration: '22 min',
          videoUrl: '',
          notes: '# Economic systems\n\nEconomic systems determine how resources are allocated: market, command, traditional, and mixed economies.',
          importantPoints: [
            'Market: supply and demand',
            'Command: central planning',
            'Mixed: combination of both'
          ],
          quiz: [
            {
              id: 'q1-6-1',
              question: 'What characterizes a market economy?',
              options: ['Central planning', 'Supply and demand determine prices', 'No prices', 'Government control'],
              correctAnswer: 1,
              explanation: 'A market economy relies on supply and demand to determine prices and allocate resources.'
            }
          ]
        }
      ],
      moduleTest: [
        {
          id: 'mt1-1',
          question: 'What is scarcity?',
          options: ['Abundance of resources', 'Unlimited wants with limited resources', 'No wants', 'Infinite resources'],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 'module-2',
      title: 'Unit 2: Producers and consumers in markets',
      description: 'Understanding how producers and consumers interact in markets',
      lessons: [
        {
          id: 'lesson-2-1',
          title: 'Incentives and marketing',
          duration: '20 min',
          videoUrl: '',
          notes: '# Incentives and marketing\n\nIncentives motivate behavior. Marketing uses incentives to influence consumer decisions.',
          importantPoints: [
            'Incentives drive behavior',
            'Marketing creates incentives',
            'Positive and negative incentives'
          ],
          quiz: [
            {
              id: 'q2-1-1',
              question: 'What do incentives do?',
              options: ['Nothing', 'Motivate behavior', 'Reduce prices', 'Increase costs'],
              correctAnswer: 1,
              explanation: 'Incentives motivate people to act in certain ways by offering rewards or penalties.'
            }
          ]
        },
        {
          id: 'lesson-2-2',
          title: 'Cost, revenue, and profit',
          duration: '22 min',
          videoUrl: '',
          notes: '# Cost, revenue, and profit\n\nProfit is the difference between revenue and costs. Understanding these concepts is essential for business success.',
          importantPoints: [
            'Revenue = price × quantity',
            'Profit = revenue - costs',
            'Maximize profit by optimizing costs and revenue'
          ],
          quiz: [
            {
              id: 'q2-2-1',
              question: 'What is profit?',
              options: ['Revenue only', 'Revenue minus costs', 'Costs only', 'Price only'],
              correctAnswer: 1,
              explanation: 'Profit is the difference between total revenue and total costs.'
            }
          ]
        },
        {
          id: 'lesson-2-3',
          title: 'Productivity and economic growth',
          duration: '20 min',
          videoUrl: '',
          notes: '# Productivity and economic growth\n\nProductivity measures output per unit of input. Higher productivity drives economic growth.',
          importantPoints: [
            'Productivity = output / input',
            'Technology increases productivity',
            'Economic growth depends on productivity'
          ],
          quiz: [
            {
              id: 'q2-3-1',
              question: 'What is productivity?',
              options: ['Total output', 'Output per unit of input', 'Input only', 'Cost only'],
              correctAnswer: 1,
              explanation: 'Productivity measures how efficiently inputs are converted into outputs.'
            }
          ]
        },
        {
          id: 'lesson-2-4',
          title: 'Business organization',
          duration: '20 min',
          videoUrl: '',
          notes: '# Business organization\n\nBusinesses can be organized as sole proprietorships, partnerships, corporations, or LLCs.',
          importantPoints: [
            'Different legal structures',
            'Each has advantages and disadvantages',
            'Affects liability and taxes'
          ],
          quiz: [
            {
              id: 'q2-4-1',
              question: 'What are common business structures?',
              options: ['Only corporations', 'Sole proprietorship, partnership, corporation, LLC', 'Only partnerships', 'No structures'],
              correctAnswer: 1,
              explanation: 'Common business structures include sole proprietorships, partnerships, corporations, and LLCs.'
            }
          ]
        },
        {
          id: 'lesson-2-5',
          title: 'Market structures and competition',
          duration: '22 min',
          videoUrl: '',
          notes: '# Market structures and competition\n\nMarket structures range from perfect competition to monopoly, affecting prices and competition.',
          importantPoints: [
            'Perfect competition: many firms',
            'Monopoly: single firm',
            'Market structure affects prices'
          ],
          quiz: [
            {
              id: 'q2-5-1',
              question: 'What characterizes perfect competition?',
              options: ['One firm', 'Many firms with identical products', 'No competition', 'Government control'],
              correctAnswer: 1,
              explanation: 'Perfect competition has many firms selling identical products with no barriers to entry.'
            }
          ]
        }
      ],
      moduleTest: [
        {
          id: 'mt2-1',
          question: 'What is profit?',
          options: ['Revenue only', 'Revenue minus costs', 'Costs only', 'Price only'],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 'module-3',
      title: 'Unit 3: The microeconomy and price systems',
      description: 'Understanding supply, demand, and price determination',
      lessons: [
        {
          id: 'lesson-3-1',
          title: 'Demand',
          duration: '18 min',
          videoUrl: '',
          notes: '# Demand\n\nDemand represents the quantity of a good or service consumers are willing and able to buy at various prices.',
          importantPoints: [
            'Law of demand: price and quantity inversely related',
            'Demand curve slopes downward',
            'Factors affect demand'
          ],
          quiz: [
            {
              id: 'q3-1-1',
              question: 'What is the law of demand?',
              options: ['Price and quantity directly related', 'Price and quantity inversely related', 'No relationship', 'Same always'],
              correctAnswer: 1,
              explanation: 'The law of demand states that as price increases, quantity demanded decreases.'
            }
          ]
        },
        {
          id: 'lesson-3-2',
          title: 'Supply',
          duration: '18 min',
          videoUrl: '',
          notes: '# Supply\n\nSupply represents the quantity of a good or service producers are willing and able to sell at various prices.',
          importantPoints: [
            'Law of supply: price and quantity directly related',
            'Supply curve slopes upward',
            'Factors affect supply'
          ],
          quiz: [
            {
              id: 'q3-2-1',
              question: 'What is the law of supply?',
              options: ['Price and quantity inversely related', 'Price and quantity directly related', 'No relationship', 'Same always'],
              correctAnswer: 1,
              explanation: 'The law of supply states that as price increases, quantity supplied increases.'
            }
          ]
        },
        {
          id: 'lesson-3-3',
          title: 'Elasticity',
          duration: '20 min',
          videoUrl: '',
          notes: '# Elasticity\n\nElasticity measures how responsive quantity demanded or supplied is to changes in price.',
          importantPoints: [
            'Elastic: quantity changes more than price',
            'Inelastic: quantity changes less than price',
            'Affects total revenue'
          ],
          quiz: [
            {
              id: 'q3-3-1',
              question: 'What does elasticity measure?',
              options: ['Price level', 'Responsiveness to price changes', 'Quantity only', 'Cost only'],
              correctAnswer: 1,
              explanation: 'Elasticity measures how responsive quantity demanded or supplied is to price changes.'
            }
          ]
        },
        {
          id: 'lesson-3-4',
          title: 'Equilibrium',
          duration: '20 min',
          videoUrl: '',
          notes: '# Equilibrium\n\nEquilibrium occurs when supply equals demand, determining market price and quantity.',
          importantPoints: [
            'Equilibrium: supply = demand',
            'Market-clearing price',
            'Surplus and shortage'
          ],
          quiz: [
            {
              id: 'q3-4-1',
              question: 'What is market equilibrium?',
              options: ['Supply exceeds demand', 'Demand exceeds supply', 'Supply equals demand', 'No supply or demand'],
              correctAnswer: 2,
              explanation: 'Market equilibrium occurs when the quantity supplied equals the quantity demanded.'
            }
          ]
        },
        {
          id: 'lesson-3-5',
          title: 'Price controls',
          duration: '20 min',
          videoUrl: '',
          notes: '# Price controls\n\nPrice controls are government-imposed limits on prices, including price ceilings and price floors.',
          importantPoints: [
            'Price ceilings: maximum prices',
            'Price floors: minimum prices',
            'Can create shortages or surpluses'
          ],
          quiz: [
            {
              id: 'q3-5-1',
              question: 'What is a price ceiling?',
              options: ['Minimum price', 'Maximum price', 'Average price', 'No price'],
              correctAnswer: 1,
              explanation: 'A price ceiling is a government-imposed maximum price that can be charged for a good or service.'
            }
          ]
        }
      ],
      moduleTest: [
        {
          id: 'mt3-1',
          question: 'What is the law of demand?',
          options: ['Price and quantity directly related', 'Price and quantity inversely related', 'No relationship', 'Same always'],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 'module-4',
      title: 'Unit 4: The role of government in markets',
      description: 'Understanding government intervention in markets',
      lessons: [
        {
          id: 'lesson-4-1',
          title: 'Public vs private',
          duration: '20 min',
          videoUrl: '',
          notes: '# Public vs private\n\nThe distinction between public (government) and private (market) provision of goods and services.',
          importantPoints: [
            'Public: government provides',
            'Private: market provides',
            'Each has advantages'
          ],
          quiz: [
            {
              id: 'q4-1-1',
              question: 'What is the difference between public and private?',
              options: ['No difference', 'Public is government, private is market', 'Public is market, private is government', 'Same thing'],
              correctAnswer: 1,
              explanation: 'Public refers to government provision, while private refers to market provision.'
            }
          ]
        },
        {
          id: 'lesson-4-2',
          title: 'Property rights',
          duration: '18 min',
          videoUrl: '',
          notes: '# Property rights\n\nProperty rights define ownership and use of resources, essential for market economies.',
          importantPoints: [
            'Define ownership',
            'Enable trade',
            'Foundation of markets'
          ],
          quiz: [
            {
              id: 'q4-2-1',
              question: 'What are property rights?',
              options: ['No ownership', 'Legal rights to own and use property', 'Only for government', 'Not important'],
              correctAnswer: 1,
              explanation: 'Property rights are legal rights that define ownership and use of resources.'
            }
          ]
        },
        {
          id: 'lesson-4-3',
          title: 'Redistribution of wealth',
          duration: '20 min',
          videoUrl: '',
          notes: '# Redistribution of wealth\n\nGovernment policies that transfer wealth from some groups to others, such as taxes and transfers.',
          importantPoints: [
            'Taxes fund redistribution',
            'Social programs',
            'Debated effectiveness'
          ],
          quiz: [
            {
              id: 'q4-3-1',
              question: 'What is wealth redistribution?',
              options: ['No transfers', 'Transferring wealth between groups', 'Only taxes', 'Only spending'],
              correctAnswer: 1,
              explanation: 'Wealth redistribution involves transferring wealth from some groups to others through taxes and transfers.'
            }
          ]
        }
      ],
      moduleTest: [
        {
          id: 'mt4-1',
          question: 'What is the difference between public and private?',
          options: ['No difference', 'Public is government, private is market', 'Public is market, private is government', 'Same thing'],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 'module-5',
      title: 'Unit 5: Macroeconomic challenges',
      description: 'Understanding macroeconomic indicators and challenges',
      lessons: [
        {
          id: 'lesson-5-1',
          title: 'Macroeconomic indicators',
          duration: '20 min',
          videoUrl: '',
          notes: '# Macroeconomic indicators\n\nKey indicators measure economic health: GDP, unemployment, inflation, and others.',
          importantPoints: [
            'GDP measures output',
            'Unemployment rate',
            'Inflation rate'
          ],
          quiz: [
            {
              id: 'q5-1-1',
              question: 'What does GDP measure?',
              options: ['Unemployment', 'Total economic output', 'Inflation', 'Interest rates'],
              correctAnswer: 1,
              explanation: 'GDP (Gross Domestic Product) measures the total value of goods and services produced in an economy.'
            }
          ]
        },
        {
          id: 'lesson-5-2',
          title: 'The macroeconomy and economic challenges',
          duration: '22 min',
          videoUrl: '',
          notes: '# The macroeconomy and economic challenges\n\nThe overall economy faces challenges like inflation, unemployment, and growth.',
          importantPoints: [
            'Inflation challenges',
            'Unemployment issues',
            'Growth objectives'
          ],
          quiz: [
            {
              id: 'q5-2-1',
              question: 'What are key economic challenges?',
              options: ['Only inflation', 'Inflation, unemployment, growth', 'Only unemployment', 'No challenges'],
              correctAnswer: 1,
              explanation: 'Key economic challenges include managing inflation, unemployment, and promoting growth.'
            }
          ]
        },
        {
          id: 'lesson-5-3',
          title: 'Business cycles',
          duration: '20 min',
          videoUrl: '',
          notes: '# Business cycles\n\nBusiness cycles are fluctuations in economic activity: expansion, peak, contraction, and trough.',
          importantPoints: [
            'Expansion: growth',
            'Recession: decline',
            'Cycles are normal'
          ],
          quiz: [
            {
              id: 'q5-3-1',
              question: 'What are business cycles?',
              options: ['Constant growth', 'Fluctuations in economic activity', 'No change', 'Only decline'],
              correctAnswer: 1,
              explanation: 'Business cycles are recurring fluctuations in economic activity, including expansions and contractions.'
            }
          ]
        }
      ],
      moduleTest: [
        {
          id: 'mt5-1',
          question: 'What does GDP measure?',
          options: ['Unemployment', 'Total economic output', 'Inflation', 'Interest rates'],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 'module-6',
      title: 'Unit 6: U.S. financial system',
      description: 'Understanding money, financial markets, and the Federal Reserve',
      lessons: [
        {
          id: 'lesson-6-1',
          title: 'Money',
          duration: '18 min',
          videoUrl: '',
          notes: '# Money\n\nMoney serves as a medium of exchange, store of value, and unit of account.',
          importantPoints: [
            'Medium of exchange',
            'Store of value',
            'Unit of account'
          ],
          quiz: [
            {
              id: 'q6-1-1',
              question: 'What are the functions of money?',
              options: ['Only exchange', 'Medium of exchange, store of value, unit of account', 'Only storage', 'Only accounting'],
              correctAnswer: 1,
              explanation: 'Money serves as a medium of exchange, store of value, and unit of account.'
            }
          ]
        },
        {
          id: 'lesson-6-2',
          title: 'Financial markets and institutions',
          duration: '22 min',
          videoUrl: '',
          notes: '# Financial markets and institutions\n\nFinancial markets facilitate the exchange of financial assets. Institutions include banks, investment firms, and others.',
          importantPoints: [
            'Markets facilitate trading',
            'Institutions provide services',
            'Essential for economy'
          ],
          quiz: [
            {
              id: 'q6-2-1',
              question: 'What do financial markets do?',
              options: ['Nothing', 'Facilitate exchange of financial assets', 'Only banking', 'Only stocks'],
              correctAnswer: 1,
              explanation: 'Financial markets facilitate the exchange of financial assets like stocks, bonds, and derivatives.'
            }
          ]
        },
        {
          id: 'lesson-6-3',
          title: 'The Federal Reserve',
          duration: '22 min',
          videoUrl: '',
          notes: '# The Federal Reserve\n\nThe Federal Reserve is the central bank of the United States, responsible for monetary policy.',
          importantPoints: [
            'Central bank of the U.S.',
            'Sets monetary policy',
            'Regulates banks'
          ],
          quiz: [
            {
              id: 'q6-3-1',
              question: 'What is the Federal Reserve?',
              options: ['Commercial bank', 'Central bank of the U.S.', 'Government agency', 'Investment firm'],
              correctAnswer: 1,
              explanation: 'The Federal Reserve is the central bank of the United States, responsible for monetary policy.'
            }
          ]
        }
      ],
      moduleTest: [
        {
          id: 'mt6-1',
          question: 'What are the functions of money?',
          options: ['Only exchange', 'Medium of exchange, store of value, unit of account', 'Only storage', 'Only accounting'],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 'module-7',
      title: 'Unit 7: Economic stabilization',
      description: 'Understanding monetary and fiscal policy',
      lessons: [
        {
          id: 'lesson-7-1',
          title: 'Monetary policy',
          duration: '22 min',
          videoUrl: '',
          notes: '# Monetary policy\n\nMonetary policy involves controlling the money supply and interest rates to influence the economy.',
          importantPoints: [
            'Controls money supply',
            'Sets interest rates',
            'Aims for price stability and growth'
          ],
          quiz: [
            {
              id: 'q7-1-1',
              question: 'What is monetary policy?',
              options: ['Tax policy', 'Controlling money supply and interest rates', 'Spending policy', 'Trade policy'],
              correctAnswer: 1,
              explanation: 'Monetary policy involves controlling the money supply and interest rates to influence economic activity.'
            }
          ]
        },
        {
          id: 'lesson-7-2',
          title: 'Fiscal policy',
          duration: '22 min',
          videoUrl: '',
          notes: '# Fiscal policy\n\nFiscal policy involves government spending and taxation to influence the economy.',
          importantPoints: [
            'Government spending',
            'Taxation',
            'Budget deficits and surpluses'
          ],
          quiz: [
            {
              id: 'q7-2-1',
              question: 'What is fiscal policy?',
              options: ['Interest rates', 'Government spending and taxation', 'Money supply', 'Bank regulation'],
              correctAnswer: 1,
              explanation: 'Fiscal policy involves government spending and taxation to influence economic activity.'
            }
          ]
        },
        {
          id: 'lesson-7-3',
          title: 'Government budgets: revenue and expenditures',
          duration: '20 min',
          videoUrl: '',
          notes: '# Government budgets: revenue and expenditures\n\nGovernment budgets balance revenue (taxes) and expenditures (spending).',
          importantPoints: [
            'Revenue from taxes',
            'Expenditures on services',
            'Deficits and surpluses'
          ],
          quiz: [
            {
              id: 'q7-3-1',
              question: 'What are government budgets?',
              options: ['Only spending', 'Balance of revenue and expenditures', 'Only revenue', 'No balance'],
              correctAnswer: 1,
              explanation: 'Government budgets balance revenue (from taxes) and expenditures (on services and programs).'
            }
          ]
        }
      ],
      moduleTest: [
        {
          id: 'mt7-1',
          question: 'What is monetary policy?',
          options: ['Tax policy', 'Controlling money supply and interest rates', 'Spending policy', 'Trade policy'],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 'module-8',
      title: 'Unit 8: Global economy',
      description: 'Understanding international trade and globalization',
      lessons: [
        {
          id: 'lesson-8-1',
          title: 'Trade',
          duration: '20 min',
          videoUrl: '',
          notes: '# Trade\n\nInternational trade allows countries to specialize and benefit from comparative advantage.',
          importantPoints: [
            'Specialization benefits',
            'Comparative advantage',
            'Trade agreements'
          ],
          quiz: [
            {
              id: 'q8-1-1',
              question: 'What is the main benefit of trade?',
              options: ['Higher prices', 'Specialization and efficiency', 'Less competition', 'More regulation'],
              correctAnswer: 1,
              explanation: 'International trade allows countries to specialize based on comparative advantage, increasing efficiency.'
            }
          ]
        },
        {
          id: 'lesson-8-2',
          title: 'Currency conversion',
          duration: '18 min',
          videoUrl: '',
          notes: '# Currency conversion\n\nExchange rates determine how much one currency is worth in terms of another.',
          importantPoints: [
            'Exchange rates fluctuate',
            'Affects trade and travel',
            'Floating vs fixed rates'
          ],
          quiz: [
            {
              id: 'q8-2-1',
              question: 'What are exchange rates?',
              options: ['Interest rates', 'Value of one currency in terms of another', 'Tax rates', 'Inflation rates'],
              correctAnswer: 1,
              explanation: 'Exchange rates determine how much one currency is worth in terms of another currency.'
            }
          ]
        },
        {
          id: 'lesson-8-3',
          title: 'Globalization',
          duration: '20 min',
          videoUrl: '',
          notes: '# Globalization\n\nGlobalization is the increasing interconnectedness of economies, cultures, and societies worldwide.',
          importantPoints: [
            'Increased trade',
            'Cultural exchange',
            'Economic integration'
          ],
          quiz: [
            {
              id: 'q8-3-1',
              question: 'What is globalization?',
              options: ['Isolation', 'Increasing interconnectedness worldwide', 'Only trade', 'Only culture'],
              correctAnswer: 1,
              explanation: 'Globalization is the increasing interconnectedness of economies, cultures, and societies worldwide.'
            }
          ]
        }
      ],
      moduleTest: [
        {
          id: 'mt8-1',
          question: 'What is the main benefit of trade?',
          options: ['Higher prices', 'Specialization and efficiency', 'Less competition', 'More regulation'],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 'module-9',
      title: 'Unit 9: Careers and education',
      description: 'Understanding the relationship between education, careers, and earnings',
      lessons: [
        {
          id: 'lesson-9-1',
          title: 'Education and earnings',
          duration: '20 min',
          videoUrl: '',
          notes: '# Education and earnings\n\nHigher levels of education generally correlate with higher earnings over a lifetime.',
          importantPoints: [
            'Education increases earnings',
            'College degree premium',
            'Lifetime earnings difference'
          ],
          quiz: [
            {
              id: 'q9-1-1',
              question: 'What is the relationship between education and earnings?',
              options: ['No relationship', 'Higher education generally means higher earnings', 'Lower education means higher earnings', 'Same for all'],
              correctAnswer: 1,
              explanation: 'Higher levels of education generally correlate with higher lifetime earnings.'
            }
          ]
        },
        {
          id: 'lesson-9-2',
          title: 'Postsecondary education',
          duration: '22 min',
          videoUrl: '',
          notes: '# Postsecondary education\n\nPostsecondary education includes colleges, universities, and vocational training programs.',
          importantPoints: [
            'College and university options',
            'Vocational training',
            'Different paths available'
          ],
          quiz: [
            {
              id: 'q9-2-1',
              question: 'What is postsecondary education?',
              options: ['High school', 'Education after high school', 'Elementary school', 'No education'],
              correctAnswer: 1,
              explanation: 'Postsecondary education refers to education after high school, including college and vocational training.'
            }
          ]
        },
        {
          id: 'lesson-9-3',
          title: 'Cost of postsecondary education',
          duration: '20 min',
          videoUrl: '',
          notes: '# Cost of postsecondary education\n\nCollege costs include tuition, fees, room, board, and other expenses.',
          importantPoints: [
            'Tuition and fees',
            'Room and board',
            'Additional expenses'
          ],
          quiz: [
            {
              id: 'q9-3-1',
              question: 'What are college costs?',
              options: ['Only tuition', 'Tuition, fees, room, board, and other expenses', 'Only fees', 'No costs'],
              correctAnswer: 1,
              explanation: 'College costs include tuition, fees, room, board, books, and other expenses.'
            }
          ]
        },
        {
          id: 'lesson-9-4',
          title: 'Financial aid',
          duration: '22 min',
          videoUrl: '',
          notes: '# Financial aid\n\nFinancial aid includes grants, scholarships, and work-study programs to help pay for education.',
          importantPoints: [
            'Grants: free money',
            'Scholarships: merit-based',
            'Work-study: employment'
          ],
          quiz: [
            {
              id: 'q9-4-1',
              question: 'What is financial aid?',
              options: ['Only loans', 'Grants, scholarships, work-study, loans', 'Only grants', 'Only scholarships'],
              correctAnswer: 1,
              explanation: 'Financial aid includes grants, scholarships, work-study programs, and loans to help pay for education.'
            }
          ]
        },
        {
          id: 'lesson-9-5',
          title: 'Student loans',
          duration: '22 min',
          videoUrl: '',
          notes: '# Student loans\n\nStudent loans help finance education but must be repaid with interest.',
          importantPoints: [
            'Must be repaid',
            'Interest accrues',
            'Different loan types'
          ],
          quiz: [
            {
              id: 'q9-5-1',
              question: 'What are student loans?',
              options: ['Free money', 'Borrowed money that must be repaid', 'Grants', 'Scholarships'],
              correctAnswer: 1,
              explanation: 'Student loans are borrowed money that must be repaid with interest after graduation.'
            }
          ]
        }
      ],
      moduleTest: [
        {
          id: 'mt9-1',
          question: 'What is the relationship between education and earnings?',
          options: ['No relationship', 'Higher education generally means higher earnings', 'Lower education means higher earnings', 'Same for all'],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 'module-10',
      title: 'Unit 10: Employment',
      description: 'Understanding employment, compensation, and the hiring process',
      lessons: [
        {
          id: 'lesson-10-1',
          title: 'Compensation',
          duration: '20 min',
          videoUrl: '',
          notes: '# Compensation\n\nCompensation includes salary, wages, benefits, and other forms of payment for work.',
          importantPoints: [
            'Salary vs wages',
            'Benefits package',
            'Total compensation matters'
          ],
          quiz: [
            {
              id: 'q10-1-1',
              question: 'What is compensation?',
              options: ['Only salary', 'Salary, wages, benefits, and other payment', 'Only benefits', 'Only wages'],
              correctAnswer: 1,
              explanation: 'Compensation includes all forms of payment: salary, wages, benefits, and other perks.'
            }
          ]
        },
        {
          id: 'lesson-10-2',
          title: 'Paycheck',
          duration: '18 min',
          videoUrl: '',
          notes: '# Paycheck\n\nUnderstanding paycheck deductions: taxes, insurance, retirement contributions, and net pay.',
          importantPoints: [
            'Gross vs net pay',
            'Tax deductions',
            'Other deductions'
          ],
          quiz: [
            {
              id: 'q10-2-1',
              question: 'What is the difference between gross and net pay?',
              options: ['No difference', 'Gross is before deductions, net is after', 'Gross is after, net is before', 'Same amount'],
              correctAnswer: 1,
              explanation: 'Gross pay is total earnings before deductions; net pay is take-home pay after deductions.'
            }
          ]
        },
        {
          id: 'lesson-10-3',
          title: 'Non-typical pay',
          duration: '18 min',
          videoUrl: '',
          notes: '# Non-typical pay\n\nNon-traditional payment methods include commissions, tips, bonuses, and piecework.',
          importantPoints: [
            'Commissions',
            'Tips',
            'Bonuses'
          ],
          quiz: [
            {
              id: 'q10-3-1',
              question: 'What is non-typical pay?',
              options: ['Only salary', 'Commissions, tips, bonuses, piecework', 'Only wages', 'No pay'],
              correctAnswer: 1,
              explanation: 'Non-typical pay includes commissions, tips, bonuses, and piecework rather than fixed salary or wages.'
            }
          ]
        },
        {
          id: 'lesson-10-4',
          title: 'Hiring process',
          duration: '20 min',
          videoUrl: '',
          notes: '# Hiring process\n\nThe hiring process includes application, interview, background checks, and job offers.',
          importantPoints: [
            'Application and resume',
            'Interviews',
            'Background checks'
          ],
          quiz: [
            {
              id: 'q10-4-1',
              question: 'What is the hiring process?',
              options: ['Only interview', 'Application, interview, background check, offer', 'Only application', 'No process'],
              correctAnswer: 1,
              explanation: 'The hiring process typically includes application, interview, background check, and job offer stages.'
            }
          ]
        }
      ],
      moduleTest: [
        {
          id: 'mt10-1',
          question: 'What is compensation?',
          options: ['Only salary', 'Salary, wages, benefits, and other payment', 'Only benefits', 'Only wages'],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 'module-11',
      title: 'Unit 11: Banking',
      description: 'Understanding banking, accounts, and interest',
      lessons: [
        {
          id: 'lesson-11-1',
          title: 'Banking and financial institutions',
          duration: '20 min',
          videoUrl: '',
          notes: '# Banking and financial institutions\n\nBanks and financial institutions provide services like deposits, loans, and investments.',
          importantPoints: [
            'Deposit services',
            'Lending services',
            'Investment services'
          ],
          quiz: [
            {
              id: 'q11-1-1',
              question: 'What services do banks provide?',
              options: ['Only deposits', 'Deposits, loans, investments', 'Only loans', 'Only investments'],
              correctAnswer: 1,
              explanation: 'Banks provide deposit services, lending services, and investment services.'
            }
          ]
        },
        {
          id: 'lesson-11-2',
          title: 'Understanding bank accounts',
          duration: '20 min',
          videoUrl: '',
          notes: '# Understanding bank accounts\n\nDifferent types of bank accounts: checking, savings, money market, and CDs.',
          importantPoints: [
            'Checking: transactions',
            'Savings: interest earning',
            'Different features'
          ],
          quiz: [
            {
              id: 'q11-2-1',
              question: 'What are types of bank accounts?',
              options: ['Only checking', 'Checking, savings, money market, CDs', 'Only savings', 'No accounts'],
              correctAnswer: 1,
              explanation: 'Common bank accounts include checking, savings, money market accounts, and certificates of deposit (CDs).'
            }
          ]
        },
        {
          id: 'lesson-11-3',
          title: 'Tracking, reconciling and more',
          duration: '20 min',
          videoUrl: '',
          notes: '# Tracking, reconciling and more\n\nTracking transactions, reconciling accounts, and managing bank accounts effectively.',
          importantPoints: [
            'Track all transactions',
            'Reconcile regularly',
            'Monitor for fraud'
          ],
          quiz: [
            {
              id: 'q11-3-1',
              question: 'Why is reconciling important?',
              options: ['Not important', 'Ensures accuracy and detects errors', 'Only for businesses', 'Too complicated'],
              correctAnswer: 1,
              explanation: 'Reconciling accounts ensures accuracy, detects errors, and helps identify fraudulent activity.'
            }
          ]
        },
        {
          id: 'lesson-11-4',
          title: 'Interest',
          duration: '18 min',
          videoUrl: '',
          notes: '# Interest\n\nInterest is earned on savings and paid on loans. Understanding interest rates and compounding.',
          importantPoints: [
            'Earn interest on savings',
            'Pay interest on loans',
            'Compound interest grows'
          ],
          quiz: [
            {
              id: 'q11-4-1',
              question: 'What is interest?',
              options: ['Only cost', 'Cost of borrowing or return on lending', 'Only return', 'No cost or return'],
              correctAnswer: 1,
              explanation: 'Interest is the cost of borrowing money or the return earned on lending/saving money.'
            }
          ]
        }
      ],
      moduleTest: [
        {
          id: 'mt11-1',
          question: 'What services do banks provide?',
          options: ['Only deposits', 'Deposits, loans, investments', 'Only loans', 'Only investments'],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 'module-12',
      title: 'Unit 12: Financial goals',
      description: 'Setting and achieving financial goals',
      lessons: [
        {
          id: 'lesson-12-1',
          title: 'SMART goals',
          duration: '18 min',
          videoUrl: '',
          notes: '# SMART goals\n\nSMART goals are Specific, Measurable, Achievable, Relevant, and Time-bound.',
          importantPoints: [
            'Specific: clear and defined',
            'Measurable: can track progress',
            'Time-bound: has deadline'
          ],
          quiz: [
            {
              id: 'q12-1-1',
              question: 'What does SMART stand for?',
              options: ['Simple goals', 'Specific, Measurable, Achievable, Relevant, Time-bound', 'Smart money', 'Savings only'],
              correctAnswer: 1,
              explanation: 'SMART stands for Specific, Measurable, Achievable, Relevant, and Time-bound goals.'
            }
          ]
        },
        {
          id: 'lesson-12-2',
          title: 'Short, medium, and long term goals',
          duration: '20 min',
          videoUrl: '',
          notes: '# Short, medium, and long term goals\n\nFinancial goals can be categorized by time horizon: short (under 1 year), medium (1-5 years), long (5+ years).',
          importantPoints: [
            'Short term: under 1 year',
            'Medium term: 1-5 years',
            'Long term: 5+ years'
          ],
          quiz: [
            {
              id: 'q12-2-1',
              question: 'What is a long-term goal?',
              options: ['Under 1 year', '1-5 years', '5+ years', 'No time limit'],
              correctAnswer: 2,
              explanation: 'Long-term financial goals typically span 5 or more years.'
            }
          ]
        },
        {
          id: 'lesson-12-3',
          title: 'Net worth',
          duration: '18 min',
          videoUrl: '',
          notes: '# Net worth\n\nNet worth is the difference between assets and liabilities, measuring overall financial health.',
          importantPoints: [
            'Net worth = Assets - Liabilities',
            'Measures financial health',
            'Track over time'
          ],
          quiz: [
            {
              id: 'q12-3-1',
              question: 'What is net worth?',
              options: ['Only assets', 'Assets minus liabilities', 'Only liabilities', 'Income'],
              correctAnswer: 1,
              explanation: 'Net worth is calculated as total assets minus total liabilities.'
            }
          ]
        }
      ],
      moduleTest: [
        {
          id: 'mt12-1',
          question: 'What does SMART stand for?',
          options: ['Simple goals', 'Specific, Measurable, Achievable, Relevant, Time-bound', 'Smart money', 'Savings only'],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 'module-13',
      title: 'Unit 13: Budgeting & saving',
      description: 'Creating budgets and building savings',
      lessons: [
        {
          id: 'lesson-13-1',
          title: 'Budgeting',
          duration: '22 min',
          videoUrl: '',
          notes: '# Budgeting\n\nA budget is a plan for managing income and expenses to achieve financial goals.',
          importantPoints: [
            'Track income and expenses',
            'Plan spending',
            'Achieve goals'
          ],
          quiz: [
            {
              id: 'q13-1-1',
              question: 'What is a budget?',
              options: ['Only expenses', 'Plan for managing income and expenses', 'Only income', 'No plan'],
              correctAnswer: 1,
              explanation: 'A budget is a plan for managing income and expenses to achieve financial goals.'
            }
          ]
        },
        {
          id: 'lesson-13-2',
          title: 'Saving money',
          duration: '20 min',
          videoUrl: '',
          notes: '# Saving money\n\nSaving involves setting aside money for future needs and goals.',
          importantPoints: [
            'Pay yourself first',
            'Emergency fund',
            'Automate savings'
          ],
          quiz: [
            {
              id: 'q13-2-1',
              question: 'What is the "pay yourself first" principle?',
              options: ['Spend first', 'Save before spending', 'No saving', 'Only spending'],
              correctAnswer: 1,
              explanation: '"Pay yourself first" means saving money before spending on other expenses.'
            }
          ]
        },
        {
          id: 'lesson-13-3',
          title: 'Reducing expenses',
          duration: '20 min',
          videoUrl: '',
          notes: '# Reducing expenses\n\nReducing expenses increases savings and helps achieve financial goals faster.',
          importantPoints: [
            'Identify needs vs wants',
            'Cut unnecessary expenses',
            'Negotiate bills'
          ],
          quiz: [
            {
              id: 'q13-3-1',
              question: 'How can you reduce expenses?',
              options: ['Spend more', 'Identify needs vs wants, cut unnecessary expenses', 'No reduction possible', 'Only increase income'],
              correctAnswer: 1,
              explanation: 'Reduce expenses by identifying needs vs wants, cutting unnecessary spending, and negotiating bills.'
            }
          ]
        }
      ],
      moduleTest: [
        {
          id: 'mt13-1',
          question: 'What is a budget?',
          options: ['Only expenses', 'Plan for managing income and expenses', 'Only income', 'No plan'],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 'module-14',
      title: 'Unit 14: Saving & investing',
      description: 'Understanding risk, return, and retirement planning',
      lessons: [
        {
          id: 'lesson-14-1',
          title: 'Risk and return',
          duration: '22 min',
          videoUrl: '',
          notes: '# Risk and return\n\nHigher potential returns generally come with higher risk. Understanding this trade-off is crucial.',
          importantPoints: [
            'Risk-return trade-off',
            'Diversification reduces risk',
            'Time horizon matters'
          ],
          quiz: [
            {
              id: 'q14-1-1',
              question: 'What is the risk-return relationship?',
              options: ['No relationship', 'Higher return generally means higher risk', 'Lower return means higher risk', 'Same for all'],
              correctAnswer: 1,
              explanation: 'Generally, investments with higher potential returns carry higher risk.'
            }
          ]
        },
        {
          id: 'lesson-14-2',
          title: 'Planning for retirement',
          duration: '22 min',
          videoUrl: '',
          notes: '# Planning for retirement\n\nRetirement planning involves estimating needs, saving, and investing for future retirement.',
          importantPoints: [
            'Estimate retirement needs',
            'Start early',
            'Use retirement accounts'
          ],
          quiz: [
            {
              id: 'q14-2-1',
              question: 'Why start retirement planning early?',
              options: ['Not important', 'Time allows compound growth', 'Too complicated', 'No benefits'],
              correctAnswer: 1,
              explanation: 'Starting early allows compound interest to work, significantly increasing retirement savings.'
            }
          ]
        },
        {
          id: 'lesson-14-3',
          title: 'Saving for retirement',
          duration: '20 min',
          videoUrl: '',
          notes: '# Saving for retirement\n\nRetirement savings vehicles include 401(k)s, IRAs, and other tax-advantaged accounts.',
          importantPoints: [
            '401(k) plans',
            'IRA accounts',
            'Tax advantages'
          ],
          quiz: [
            {
              id: 'q14-3-1',
              question: 'What are retirement savings vehicles?',
              options: ['Only savings accounts', '401(k)s, IRAs, and other tax-advantaged accounts', 'Only checking', 'No options'],
              correctAnswer: 1,
              explanation: 'Retirement savings vehicles include 401(k)s, IRAs, and other tax-advantaged accounts.'
            }
          ]
        }
      ],
      moduleTest: [
        {
          id: 'mt14-1',
          question: 'What is the risk-return relationship?',
          options: ['No relationship', 'Higher return generally means higher risk', 'Lower return means higher risk', 'Same for all'],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 'module-15',
      title: 'Unit 15: Consumer credit',
      description: 'Understanding credit cards and credit scores',
      lessons: [
        {
          id: 'lesson-15-1',
          title: 'Credit cards',
          duration: '22 min',
          videoUrl: '',
          notes: '# Credit cards\n\nCredit cards allow borrowing to make purchases, but must be repaid with interest if not paid in full.',
          importantPoints: [
            'Convenient but costly',
            'Pay in full to avoid interest',
            'Understand terms'
          ],
          quiz: [
            {
              id: 'q15-1-1',
              question: 'How can you avoid credit card interest?',
              options: ['Never use cards', 'Pay balance in full each month', 'Only pay minimum', 'Ignore bills'],
              correctAnswer: 1,
              explanation: 'Paying the full balance each month avoids interest charges on credit cards.'
            }
          ]
        },
        {
          id: 'lesson-15-2',
          title: 'Credit score',
          duration: '22 min',
          videoUrl: '',
          notes: '# Credit score\n\nCredit scores measure creditworthiness and affect loan rates and approval.',
          importantPoints: [
            'FICO and VantageScore',
            'Factors: payment history, utilization, length',
            'Higher score = better rates'
          ],
          quiz: [
            {
              id: 'q15-2-1',
              question: 'What affects credit scores?',
              options: ['Only income', 'Payment history, credit utilization, length of credit', 'Only age', 'Only location'],
              correctAnswer: 1,
              explanation: 'Credit scores are affected by payment history, credit utilization, length of credit history, and other factors.'
            }
          ]
        }
      ],
      moduleTest: [
        {
          id: 'mt15-1',
          question: 'How can you avoid credit card interest?',
          options: ['Never use cards', 'Pay balance in full each month', 'Only pay minimum', 'Ignore bills'],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 'module-16',
      title: 'Unit 16: Loans and debt',
      description: 'Understanding borrowing, loans, and debt management',
      lessons: [
        {
          id: 'lesson-16-1',
          title: 'Terms of borrowing',
          duration: '20 min',
          videoUrl: '',
          notes: '# Terms of borrowing\n\nLoan terms include principal, interest rate, term length, and repayment schedule.',
          importantPoints: [
            'Principal: amount borrowed',
            'Interest rate: cost of borrowing',
            'Term: repayment period'
          ],
          quiz: [
            {
              id: 'q16-1-1',
              question: 'What are loan terms?',
              options: ['Only interest', 'Principal, interest rate, term length, repayment schedule', 'Only principal', 'No terms'],
              correctAnswer: 1,
              explanation: 'Loan terms include the principal amount, interest rate, term length, and repayment schedule.'
            }
          ]
        },
        {
          id: 'lesson-16-2',
          title: 'Borrowing money',
          duration: '20 min',
          videoUrl: '',
          notes: '# Borrowing money\n\nBorrowing money involves understanding costs, risks, and responsibilities of debt.',
          importantPoints: [
            'Understand total cost',
            'Compare options',
            'Borrow responsibly'
          ],
          quiz: [
            {
              id: 'q16-2-1',
              question: 'What should you consider when borrowing?',
              options: ['Only interest rate', 'Total cost, terms, ability to repay', 'Only amount', 'No considerations'],
              correctAnswer: 1,
              explanation: 'When borrowing, consider the total cost, terms, and your ability to repay the loan.'
            }
          ]
        },
        {
          id: 'lesson-16-3',
          title: 'Types of loans',
          duration: '22 min',
          videoUrl: '',
          notes: '# Types of loans\n\nDifferent types of loans: personal, auto, mortgage, student, and others, each with specific purposes.',
          importantPoints: [
            'Personal loans',
            'Secured vs unsecured',
            'Different purposes'
          ],
          quiz: [
            {
              id: 'q16-3-1',
              question: 'What are types of loans?',
              options: ['Only personal', 'Personal, auto, mortgage, student, and others', 'Only mortgage', 'No types'],
              correctAnswer: 1,
              explanation: 'Common loan types include personal, auto, mortgage, student, and business loans.'
            }
          ]
        },
        {
          id: 'lesson-16-4',
          title: 'Debt',
          duration: '20 min',
          videoUrl: '',
          notes: '# Debt\n\nDebt management involves understanding total debt, prioritizing repayment, and avoiding excessive debt.',
          importantPoints: [
            'Track total debt',
            'Prioritize high-interest debt',
            'Avoid debt overload'
          ],
          quiz: [
            {
              id: 'q16-4-1',
              question: 'How should you manage debt?',
              options: ['Ignore it', 'Track total debt, prioritize high-interest, avoid overload', 'Only pay minimum', 'Borrow more'],
              correctAnswer: 1,
              explanation: 'Manage debt by tracking total debt, prioritizing high-interest debt repayment, and avoiding excessive debt.'
            }
          ]
        },
        {
          id: 'lesson-16-5',
          title: 'Bankruptcy',
          duration: '20 min',
          videoUrl: '',
          notes: '# Bankruptcy\n\nBankruptcy is a legal process for individuals unable to repay debts, with long-term consequences.',
          importantPoints: [
            'Last resort option',
            'Long-term credit impact',
            'Different chapters'
          ],
          quiz: [
            {
              id: 'q16-5-1',
              question: 'What is bankruptcy?',
              options: ['Debt elimination', 'Legal process for debt relief', 'Easy solution', 'No consequences'],
              correctAnswer: 1,
              explanation: 'Bankruptcy is a legal process for individuals unable to repay debts, with significant long-term consequences.'
            }
          ]
        }
      ],
      moduleTest: [
        {
          id: 'mt16-1',
          question: 'What are loan terms?',
          options: ['Only interest', 'Principal, interest rate, term length, repayment schedule', 'Only principal', 'No terms'],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 'module-17',
      title: 'Unit 17: Taxes',
      description: 'Understanding personal and local taxes',
      lessons: [
        {
          id: 'lesson-17-1',
          title: 'What are taxes and why do we pay them',
          duration: '20 min',
          videoUrl: '',
          notes: '# What are taxes and why do we pay them\n\nTaxes fund government services and programs. Understanding why we pay taxes is important.',
          importantPoints: [
            'Fund government services',
            'Required by law',
            'Different tax types'
          ],
          quiz: [
            {
              id: 'q17-1-1',
              question: 'Why do we pay taxes?',
              options: ['Optional', 'Fund government services and programs', 'Only for some', 'No reason'],
              correctAnswer: 1,
              explanation: 'Taxes fund government services like education, infrastructure, defense, and social programs.'
            }
          ]
        },
        {
          id: 'lesson-17-2',
          title: 'Local taxes',
          duration: '18 min',
          videoUrl: '',
          notes: '# Local taxes\n\nLocal taxes include property taxes, sales taxes, and local income taxes that fund local services.',
          importantPoints: [
            'Property taxes',
            'Sales taxes',
            'Local income taxes'
          ],
          quiz: [
            {
              id: 'q17-2-1',
              question: 'What are local taxes?',
              options: ['Only federal', 'Property, sales, local income taxes', 'Only state', 'No local taxes'],
              correctAnswer: 1,
              explanation: 'Local taxes include property taxes, sales taxes, and local income taxes that fund local government services.'
            }
          ]
        },
        {
          id: 'lesson-17-3',
          title: 'Tax forms',
          duration: '20 min',
          videoUrl: '',
          notes: '# Tax forms\n\nUnderstanding tax forms like W-2, 1099, and tax returns is essential for filing taxes correctly.',
          importantPoints: [
            'W-2 for employees',
            '1099 for contractors',
            'Tax return forms'
          ],
          quiz: [
            {
              id: 'q17-3-1',
              question: 'What is a W-2?',
              options: ['Tax return', 'Wage and tax statement from employer', '1099 form', 'No form'],
              correctAnswer: 1,
              explanation: 'A W-2 is a wage and tax statement that employers provide to employees for tax filing.'
            }
          ]
        },
        {
          id: 'lesson-17-4',
          title: 'Personal taxes',
          duration: '22 min',
          videoUrl: '',
          notes: '# Personal taxes\n\nPersonal income taxes are based on earnings and vary by income level, deductions, and credits.',
          importantPoints: [
            'Based on income',
            'Deductions reduce taxable income',
            'Credits reduce tax owed'
          ],
          quiz: [
            {
              id: 'q17-4-1',
              question: 'What are personal taxes based on?',
              options: ['Only age', 'Income, deductions, credits', 'Only location', 'No basis'],
              correctAnswer: 1,
              explanation: 'Personal income taxes are based on income, with deductions and credits affecting the final amount owed.'
            }
          ]
        }
      ],
      moduleTest: [
        {
          id: 'mt17-1',
          question: 'Why do we pay taxes?',
          options: ['Optional', 'Fund government services and programs', 'Only for some', 'No reason'],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 'module-18',
      title: 'Unit 18: Insurance',
      description: 'Understanding different types of insurance and risk management',
      lessons: [
        {
          id: 'lesson-18-1',
          title: 'What is risk and how to manage it?',
          duration: '20 min',
          videoUrl: '',
          notes: '# What is risk and how to manage it?\n\nRisk is the possibility of loss. Insurance is one way to manage and transfer risk.',
          importantPoints: [
            'Risk is possibility of loss',
            'Insurance transfers risk',
            'Other risk management strategies'
          ],
          quiz: [
            {
              id: 'q18-1-1',
              question: 'What is risk?',
              options: ['Guarantee', 'Possibility of loss', 'No possibility', 'Certainty'],
              correctAnswer: 1,
              explanation: 'Risk is the possibility of experiencing a loss or negative outcome.'
            }
          ]
        },
        {
          id: 'lesson-18-2',
          title: 'Insurance basics and terminology',
          duration: '22 min',
          videoUrl: '',
          notes: '# Insurance basics and terminology\n\nUnderstanding insurance terms: premium, deductible, coverage, and policy limits.',
          importantPoints: [
            'Premium: cost of insurance',
            'Deductible: amount you pay first',
            'Coverage: what is protected'
          ],
          quiz: [
            {
              id: 'q18-2-1',
              question: 'What is a premium?',
              options: ['Deductible', 'Cost of insurance', 'Coverage amount', 'Claim payment'],
              correctAnswer: 1,
              explanation: 'A premium is the cost you pay for insurance coverage, typically monthly or annually.'
            }
          ]
        },
        {
          id: 'lesson-18-3',
          title: 'Car insurance',
          duration: '20 min',
          videoUrl: '',
          notes: '# Car insurance\n\nCar insurance protects against financial loss from accidents, theft, and other vehicle-related incidents.',
          importantPoints: [
            'Liability coverage',
            'Collision and comprehensive',
            'Required by law in most states'
          ],
          quiz: [
            {
              id: 'q18-3-1',
              question: 'What does car insurance cover?',
              options: ['Only accidents', 'Accidents, theft, liability, and other incidents', 'Only theft', 'Nothing'],
              correctAnswer: 1,
              explanation: 'Car insurance covers accidents, theft, liability, and other vehicle-related incidents.'
            }
          ]
        },
        {
          id: 'lesson-18-4',
          title: 'Health insurance',
          duration: '22 min',
          videoUrl: '',
          notes: '# Health insurance\n\nHealth insurance helps pay for medical expenses, including doctor visits, hospital stays, and medications.',
          importantPoints: [
            'Covers medical expenses',
            'Premiums and deductibles',
            'Networks and coverage'
          ],
          quiz: [
            {
              id: 'q18-4-1',
              question: 'What does health insurance cover?',
              options: ['Only emergencies', 'Medical expenses including doctor visits, hospital stays, medications', 'Only medications', 'Nothing'],
              correctAnswer: 1,
              explanation: 'Health insurance covers medical expenses including doctor visits, hospital stays, and medications.'
            }
          ]
        },
        {
          id: 'lesson-18-5',
          title: 'Life insurance',
          duration: '20 min',
          videoUrl: '',
          notes: '# Life insurance\n\nLife insurance provides financial protection to beneficiaries upon the policyholder\'s death.',
          importantPoints: [
            'Term vs whole life',
            'Beneficiaries receive death benefit',
            'Protects dependents'
          ],
          quiz: [
            {
              id: 'q18-5-1',
              question: 'What is life insurance?',
              options: ['Health coverage', 'Financial protection for beneficiaries upon death', 'Property insurance', 'Auto insurance'],
              correctAnswer: 1,
              explanation: 'Life insurance provides financial protection to beneficiaries when the policyholder dies.'
            }
          ]
        },
        {
          id: 'lesson-18-6',
          title: 'Property insurance',
          duration: '20 min',
          videoUrl: '',
          notes: '# Property insurance\n\nProperty insurance protects homes and belongings from damage, theft, and liability.',
          importantPoints: [
            'Homeowners insurance',
            'Renters insurance',
            'Covers property and liability'
          ],
          quiz: [
            {
              id: 'q18-6-1',
              question: 'What does property insurance cover?',
              options: ['Only homes', 'Homes, belongings, damage, theft, liability', 'Only belongings', 'Nothing'],
              correctAnswer: 1,
              explanation: 'Property insurance covers homes, belongings, damage, theft, and liability.'
            }
          ]
        },
        {
          id: 'lesson-18-7',
          title: 'Estate planning',
          duration: '20 min',
          videoUrl: '',
          notes: '# Estate planning\n\nEstate planning involves preparing for the transfer of assets after death through wills, trusts, and other tools.',
          importantPoints: [
            'Wills and trusts',
            'Beneficiary designations',
            'Minimize taxes'
          ],
          quiz: [
            {
              id: 'q18-7-1',
              question: 'What is estate planning?',
              options: ['Only wills', 'Preparing for asset transfer after death', 'Only trusts', 'No planning'],
              correctAnswer: 1,
              explanation: 'Estate planning involves preparing for the transfer of assets after death through wills, trusts, and other legal tools.'
            }
          ]
        }
      ],
      moduleTest: [
        {
          id: 'mt18-1',
          question: 'What is risk?',
          options: ['Guarantee', 'Possibility of loss', 'No possibility', 'Certainty'],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 'module-19',
      title: 'Unit 19: Car buying',
      description: 'Understanding car ownership, leasing, and loans',
      lessons: [
        {
          id: 'lesson-19-1',
          title: 'Owning vs leasing',
          duration: '22 min',
          videoUrl: '',
          notes: '# Owning vs leasing\n\nComparing car ownership and leasing: each has advantages and disadvantages depending on needs.',
          importantPoints: [
            'Ownership: build equity',
            'Leasing: lower payments, no equity',
            'Consider total cost'
          ],
          quiz: [
            {
              id: 'q19-1-1',
              question: 'What is a key difference between owning and leasing?',
              options: ['No difference', 'Ownership builds equity, leasing does not', 'Leasing builds equity', 'Same cost'],
              correctAnswer: 1,
              explanation: 'Ownership allows you to build equity in the car, while leasing does not build equity.'
            }
          ]
        },
        {
          id: 'lesson-19-2',
          title: 'Car loans',
          duration: '20 min',
          videoUrl: '',
          notes: '# Car loans\n\nCar loans finance vehicle purchases. Understanding interest rates, terms, and total cost is important.',
          importantPoints: [
            'Interest rates vary',
            'Loan term affects payments',
            'Total cost matters'
          ],
          quiz: [
            {
              id: 'q19-2-1',
              question: 'What should you consider with car loans?',
              options: ['Only monthly payment', 'Interest rate, term, total cost', 'Only interest rate', 'No considerations'],
              correctAnswer: 1,
              explanation: 'Consider the interest rate, loan term, and total cost when evaluating car loans.'
            }
          ]
        },
        {
          id: 'lesson-19-3',
          title: 'Cost of car ownership',
          duration: '22 min',
          videoUrl: '',
          notes: '# Cost of car ownership\n\nCar ownership costs include purchase price, insurance, maintenance, fuel, and depreciation.',
          importantPoints: [
            'Purchase price',
            'Ongoing costs: insurance, maintenance, fuel',
            'Depreciation'
          ],
          quiz: [
            {
              id: 'q19-3-1',
              question: 'What are car ownership costs?',
              options: ['Only purchase price', 'Purchase, insurance, maintenance, fuel, depreciation', 'Only fuel', 'No costs'],
              correctAnswer: 1,
              explanation: 'Car ownership costs include the purchase price, insurance, maintenance, fuel, and depreciation.'
            }
          ]
        }
      ],
      moduleTest: [
        {
          id: 'mt19-1',
          question: 'What is a key difference between owning and leasing?',
          options: ['No difference', 'Ownership builds equity, leasing does not', 'Leasing builds equity', 'Same cost'],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 'module-20',
      title: 'Unit 20: Housing',
      description: 'Understanding renting vs homeownership',
      lessons: [
        {
          id: 'lesson-20-1',
          title: 'Renting vs homeownership',
          duration: '25 min',
          videoUrl: '',
          notes: '# Renting vs homeownership\n\nComparing renting and homeownership: each has financial and lifestyle implications.',
          importantPoints: [
            'Renting: flexibility, no equity',
            'Homeownership: equity, responsibility',
            'Consider total cost of ownership'
          ],
          quiz: [
            {
              id: 'q20-1-1',
              question: 'What is a key advantage of renting?',
              options: ['Building equity', 'Flexibility and mobility', 'Tax deductions', 'Forced savings'],
              correctAnswer: 1,
              explanation: 'Renting offers flexibility and mobility without the commitment and costs of homeownership.'
            }
          ]
        }
      ],
      moduleTest: [
        {
          id: 'mt20-1',
          question: 'What is a key advantage of renting?',
          options: ['Building equity', 'Flexibility and mobility', 'Tax deductions', 'Forced savings'],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 'module-21',
      title: 'Unit 21: Scams & fraud',
      description: 'Protecting yourself from scams, fraud, and identity theft',
      lessons: [
        {
          id: 'lesson-21-1',
          title: 'Personal information and identity',
          duration: '20 min',
          videoUrl: '',
          notes: '# Personal information and identity\n\nProtecting personal information is crucial to prevent identity theft and fraud.',
          importantPoints: [
            'Protect sensitive information',
            'Monitor accounts',
            'Report suspicious activity'
          ],
          quiz: [
            {
              id: 'q21-1-1',
              question: 'Why protect personal information?',
              options: ['Not important', 'Prevent identity theft and fraud', 'No risk', 'Too complicated'],
              correctAnswer: 1,
              explanation: 'Protecting personal information helps prevent identity theft and financial fraud.'
            }
          ]
        },
        {
          id: 'lesson-21-2',
          title: 'Common scams',
          duration: '22 min',
          videoUrl: '',
          notes: '# Common scams\n\nCommon scams include phishing, fake investments, romance scams, and others. Recognizing red flags is important.',
          importantPoints: [
            'Phishing emails',
            'Fake investments',
            'Too good to be true'
          ],
          quiz: [
            {
              id: 'q21-2-1',
              question: 'What are common scams?',
              options: ['Only online', 'Phishing, fake investments, romance scams, and others', 'Only phone', 'No scams'],
              correctAnswer: 1,
              explanation: 'Common scams include phishing, fake investments, romance scams, and various other fraudulent schemes.'
            }
          ]
        },
        {
          id: 'lesson-21-3',
          title: 'Contracts',
          duration: '20 min',
          videoUrl: '',
          notes: '# Contracts\n\nUnderstanding contracts, reading terms carefully, and knowing your rights is important for consumer protection.',
          importantPoints: [
            'Read contracts carefully',
            'Understand terms',
            'Know your rights'
          ],
          quiz: [
            {
              id: 'q21-3-1',
              question: 'What should you do with contracts?',
              options: ['Sign immediately', 'Read carefully and understand terms', 'Ignore terms', 'No need to read'],
              correctAnswer: 1,
              explanation: 'Always read contracts carefully, understand all terms, and know your rights before signing.'
            }
          ]
        },
        {
          id: 'lesson-21-4',
          title: 'Consumer protection agencies',
          duration: '18 min',
          videoUrl: '',
          notes: '# Consumer protection agencies\n\nConsumer protection agencies help protect consumers from fraud, scams, and unfair practices.',
          importantPoints: [
            'FTC: Federal Trade Commission',
            'CFPB: Consumer Financial Protection Bureau',
            'State agencies'
          ],
          quiz: [
            {
              id: 'q21-4-1',
              question: 'What do consumer protection agencies do?',
              options: ['Nothing', 'Protect consumers from fraud and unfair practices', 'Only for businesses', 'No protection'],
              correctAnswer: 1,
              explanation: 'Consumer protection agencies help protect consumers from fraud, scams, and unfair business practices.'
            }
          ]
        }
      ],
      moduleTest: [
        {
          id: 'mt21-1',
          question: 'Why protect personal information?',
          options: ['Not important', 'Prevent identity theft and fraud', 'No risk', 'Too complicated'],
          correctAnswer: 1
        }
      ]
    }
  ],
  finalExam: [
    {
      id: 'fe-1',
      question: 'What is scarcity?',
      options: ['Abundance of resources', 'Unlimited wants with limited resources', 'No wants', 'Infinite resources'],
      correctAnswer: 1
    },
    {
      id: 'fe-2',
      question: 'What is a budget?',
      options: ['Only expenses', 'Plan for managing income and expenses', 'Only income', 'No plan'],
      correctAnswer: 1
    },
    {
      id: 'fe-3',
      question: 'What is risk?',
      options: ['Guarantee', 'Possibility of loss', 'No possibility', 'Certainty'],
      correctAnswer: 1
    }
  ]
}
];

// Legacy export for backward compatibility
export const courseData = courses[0];
