export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  optionExplanations?: string[]; // Optional per-option explanations
  correctAnswer: number;
  explanation?: string; // Optional general explanation
}

export interface PracticeExercise {
  id: string;
  prompt: string;
  solution?: string;
  hints?: string[];
}

export type ContentItemType =
  | 'video'
  | 'article'
  | 'practice'
  | 'quiz'
  | 'mastery-check';

export interface BaseContentItem {
  id: string;
  type: ContentItemType;
  title?: string;
}

export interface VideoContent extends BaseContentItem {
  type: 'video';
  /**
   * Index of the video inside the lesson (0-based, used with getLessonVideoUrls)
   */
  videoIndex: number;
}

export interface ArticleContent extends BaseContentItem {
  type: 'article';
  content: string;
  importantPoints?: string[];
}

export interface PracticeContent extends BaseContentItem {
  type: 'practice';
  exercises: PracticeExercise[];
}

export interface QuizContent extends BaseContentItem {
  type: 'quiz';
  questions: QuizQuestion[];
}

export interface MasteryCheckContent extends BaseContentItem {
  type: 'mastery-check';
  questions: QuizQuestion[];
  passRate: number;
}

export type ContentItem =
  | VideoContent
  | ArticleContent
  | PracticeContent
  | QuizContent
  | MasteryCheckContent;

export interface Lesson {
  id: string;
  title: string;
  /**
   * Human-readable duration label, e.g. '25 min'
   */
  duration: string;
  contentItems: ContentItem[];
}

export interface Unit {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  masteryCheck?: MasteryCheckContent;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  units: Unit[];
  finalExamPassRate?: number;
  finalExam?: QuizQuestion[];
}


