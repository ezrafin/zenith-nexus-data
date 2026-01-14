import type { Course, QuizQuestion, QuizContent } from '@/data/courseTypes';

/**
 * Collects all quiz questions from all lessons in a course.
 * Iterates through all units → lessons → contentItems, filters for quiz type,
 * and collects all questions from QuizContent items.
 */
export function collectAllQuizQuestions(course: Course): QuizQuestion[] {
  const allQuestions: QuizQuestion[] = [];

  for (const unit of course.units) {
    for (const lesson of unit.lessons) {
      for (const contentItem of lesson.contentItems) {
        if (contentItem.type === 'quiz') {
          const quizContent = contentItem as QuizContent;
          if (quizContent.questions && quizContent.questions.length > 0) {
            allQuestions.push(...quizContent.questions);
          }
        }
      }
    }
  }

  return allQuestions;
}

/**
 * Randomly selects N questions from a pool of questions using Fisher-Yates shuffle.
 * If the pool has fewer questions than requested, returns all available questions.
 * 
 * @param questions - Array of all available quiz questions
 * @param count - Number of questions to select (default: 20)
 * @returns Array of randomly selected questions
 */
export function selectRandomQuestions(questions: QuizQuestion[], count: number = 20): QuizQuestion[] {
  if (questions.length === 0) {
    return [];
  }

  // If we have fewer questions than requested, return all available
  if (questions.length <= count) {
    // Still shuffle to randomize order
    const shuffled = [...questions];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // Fisher-Yates shuffle to randomly select questions
  const shuffled = [...questions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Return the first N questions after shuffling
  return shuffled.slice(0, count);
}

