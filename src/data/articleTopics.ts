export const articleTopics = {
  markets: {
    name: 'Рынки',
    subtopics: ['Фондовый рынок', 'Криптовалюты', 'Сырьевые товары', 'Валюты', 'Недвижимость']
  },
  strategies: {
    name: 'Стратегии',
    subtopics: ['Долгосрочное инвестирование', 'Трейдинг', 'Пассивный доход', 'Хеджирование', 'Дивидендная стратегия']
  },
  analysis: {
    name: 'Анализ',
    subtopics: ['Технический анализ', 'Фундаментальный анализ', 'Количественный анализ', 'Макроэкономический анализ']
  },
  education: {
    name: 'Обучение',
    subtopics: ['Для начинающих', 'Продвинутый уровень', 'Психология инвестирования', 'Финансовая грамотность']
  },
  instruments: {
    name: 'Инструменты',
    subtopics: ['ETF', 'Акции', 'Облигации', 'Опционы', 'Деривативы']
  },
  comparison: {
    name: 'Сравнения',
    subtopics: ['Депозиты vs инвестиции', 'Активное vs пассивное управление', 'Брокеры', 'Инвестиционные платформы']
  }
};

export const articleFormats = [
  { id: 'guide', name: 'Гайд', description: 'Пошаговое руководство' },
  { id: 'case_study', name: 'Разбор кейса', description: 'Анализ конкретной ситуации' },
  { id: 'comparison', name: 'Сравнение', description: 'Сравнительный анализ вариантов' },
  { id: 'checklist', name: 'Чек-лист', description: 'Список для проверки' }
];

export interface ArticleApplication {
  id?: string;
  email: string;
  topic: string;
  subtopic: string;
  proposedTitle: string;
  detailedDescription: string;
  format: 'guide' | 'case_study' | 'comparison' | 'checklist';
  sourceData: string;
  thesisList: string[];
  references?: string;
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected';
  createdAt?: string;
  submittedAt?: string;
}
