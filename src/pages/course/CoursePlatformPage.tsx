import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { getCourseById, getAllCourses } from '@/data/courseData';
import { MarkdownContent } from '@/components/content/MarkdownContent';
import { useTranslation } from '@/hooks/useTranslation';
import { 
  ChevronDown, ChevronRight, Play, CheckCircle, Clock, 
  BookOpen, Award, Lightbulb, ArrowRight, Lock, ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getCourseListingPath } from '@/lib/educationRoutes';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export default function CoursePlatformPage() {
  const { t } = useTranslation({ namespace: 'education' });
  const { courseId } = useParams<{ courseId: string }>();
  const course = courseId ? getCourseById(courseId) : getAllCourses()[0];
  
  // Redirect to first course if courseId is invalid
  if (!course) {
    return <Navigate to="/course" replace />;
  }

  const [expandedModules, setExpandedModules] = useState<string[]>([course.modules[0]?.id]);
  const [selectedLesson, setSelectedLesson] = useState(course.modules[0]?.lessons[0]);

  // Reset state when course changes
  useEffect(() => {
    if (course.modules[0]) {
      setExpandedModules([course.modules[0].id]);
      setSelectedLesson(course.modules[0].lessons[0]);
    }
  }, [course.id]);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showFinalExam, setShowFinalExam] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [finalExamAnswers, setFinalExamAnswers] = useState<Record<string, number>>({});

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const progressPercent = (completedLessons.length / totalLessons) * 100;

  const markComplete = () => {
    if (selectedLesson && !completedLessons.includes(selectedLesson.id)) {
      setCompletedLessons([...completedLessons, selectedLesson.id]);
    }
  };

  const handleQuizAnswer = (questionId: string, answerIndex: number) => {
    setQuizAnswers({ ...quizAnswers, [questionId]: answerIndex });
  };

  return (
    <Layout>
      <div className="pt-20 pb-8 min-h-screen">
        <div className="flex">
          {/* Sidebar */}
          <aside className="w-80 border-r border-border bg-card/50 min-h-[calc(100vh-5rem)] overflow-y-auto hidden lg:block">
            <div className="p-4 border-b border-border">
              <Link 
                to={getCourseListingPath()}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-3 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 flex-shrink-0" />
                <span>{t('courses.backToCourses', 'Back to Courses')}</span>
              </Link>
              <h2 className="font-semibold">{course.title}</h2>
              <div className="mt-3">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-muted-foreground">{t('courses.progress', 'Progress')}</span>
                  <span className="font-medium">{Math.round(progressPercent)}%</span>
                </div>
                <Progress value={progressPercent} className="h-2" />
              </div>
            </div>

            <nav className="p-2">
              {course.modules.map((module, moduleIndex) => (
                <div key={module.id} className="mb-2">
                  <button
                    onClick={() => toggleModule(module.id)}
                    className="w-full flex items-center gap-2 p-3 rounded-lg hover:bg-secondary/50 transition-colors text-left"
                  >
                    {expandedModules.includes(module.id) ? (
                      <ChevronDown className="h-4 w-4 flex-shrink-0" />
                    ) : (
                      <ChevronRight className="h-4 w-4 flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0 flex flex-col">
                      <span className="text-xs text-muted-foreground leading-tight">Module {moduleIndex + 1}</span>
                      <p className="text-sm font-medium truncate leading-tight">{module.title}</p>
                    </div>
                  </button>

                  {expandedModules.includes(module.id) && (
                    <div className="ml-4 space-y-1">
                      {module.lessons.map((lesson, lessonIndex) => (
                        <button
                          key={lesson.id}
                          onClick={() => { setSelectedLesson(lesson); setShowQuiz(false); setShowFinalExam(false); }}
                          className={`w-full flex items-center gap-2 p-2 rounded-lg text-left text-sm transition-colors ${
                            selectedLesson?.id === lesson.id 
                              ? 'bg-primary text-primary-foreground' 
                              : 'hover:bg-secondary/50'
                          }`}
                        >
                              {completedLessons.includes(lesson.id) ? (
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          ) : (
                            <Play className="h-4 w-4 flex-shrink-0" />
                          )}
                          <span className="truncate flex-1">{lesson.title}</span>
                        </button>
                      ))}
                      <button className="w-full flex items-center gap-2 p-2 rounded-lg text-left text-sm text-muted-foreground hover:bg-secondary/50">
                        <Award className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate">{t('courses.moduleTest', 'Module Test')}</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}

              <div className="mt-4 p-3 border-t border-border">
                <button 
                  onClick={() => { setShowFinalExam(true); setShowQuiz(false); setSelectedLesson(null); }}
                  className="w-full flex items-center gap-2 p-2 rounded-lg text-left text-sm font-medium hover:bg-secondary/50"
                >
                  <Award className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="flex-1 truncate">{t('courses.finalExam', 'Final Exam')}</span>
                  {totalLessons === completedLessons.length ? (
                    <CheckCircle className="h-4 w-4 flex-shrink-0 text-green-500" />
                  ) : (
                    <Lock className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                  )}
                </button>
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
            {selectedLesson && !showQuiz && !showFinalExam && (
              <div className="max-w-4xl mx-auto space-y-6">
                {/* Video Placeholder */}
                <div className="glass-card overflow-hidden">
                  <div className="aspect-video bg-secondary flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center mx-auto mb-3 cursor-pointer hover:scale-110 transition-transform">
                        <Play className="h-6 w-6 text-primary-foreground ml-1" />
                      </div>
                      <p className="text-sm text-muted-foreground">{t('courses.lessonVideo', 'Lesson Video')}</p>
                    </div>
                  </div>
                </div>

                {/* Lesson Info */}
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="heading-md">{selectedLesson.title}</h1>
                    <span className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                      <Clock className="h-4 w-4 flex-shrink-0" />
                      {selectedLesson.duration}
                    </span>
                  </div>
                  <Button onClick={markComplete} disabled={completedLessons.includes(selectedLesson.id)}>
                    {completedLessons.includes(selectedLesson.id) ? (
                      <>
                        <CheckCircle className="h-4 w-4" />
                        {t('courses.completed', 'Completed')}
                      </>
                    ) : (
                      <>{t('courses.markAsCompleted', 'Mark as Completed')}</>
                    )}
                  </Button>
                </div>

                {/* Notes */}
                <div className="glass-card p-6">
                  <h2 className="heading-sm mb-4 flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    {t('courses.lessonNotes', 'Lesson Notes')}
                  </h2>
                  <div className="prose prose-sm prose-invert max-w-none">
                    <MarkdownContent content={selectedLesson.notes} />
                  </div>
                </div>

                {/* Important Points */}
                <div className="glass-card p-6 border-l-4 border-yellow-500">
                  <h2 className="heading-sm mb-4 flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-500" />
                    {t('courses.keyPoints', 'Key Points to Remember')}
                  </h2>
                  <ul className="space-y-2">
                    {selectedLesson.importantPoints.map((point, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quiz Button */}
                {selectedLesson.quiz.length > 0 && (
                  <Button onClick={() => setShowQuiz(true)} className="w-full" size="lg">
                    {t('courses.takeQuiz', 'Take Mini-Quiz')}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            )}

            {/* Quiz View */}
            {showQuiz && selectedLesson && !showFinalExam && (
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="heading-md">{t('courses.miniQuiz', 'Mini-Quiz')}</h2>
                  <Button variant="outline" onClick={() => setShowQuiz(false)}>
                    {t('courses.backToLesson', 'Back to Lesson')}
                  </Button>
                </div>

                {selectedLesson.quiz.map((question, qIndex) => (
                  <div key={question.id} className="glass-card p-6">
                    <p className="font-medium mb-4">{qIndex + 1}. {question.question}</p>
                    <div className="space-y-2">
                      {question.options.map((option, oIndex) => (
                        <button
                          key={oIndex}
                          onClick={() => handleQuizAnswer(question.id, oIndex)}
                          className={`w-full text-left p-3 rounded-lg border transition-colors ${
                            quizAnswers[question.id] === oIndex
                              ? quizAnswers[question.id] === question.correctAnswer
                                ? 'border-green-500 bg-green-500/10'
                                : 'border-red-500 bg-red-500/10'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    {quizAnswers[question.id] !== undefined && question.explanation && (
                      <p className="mt-4 text-sm text-muted-foreground p-3 bg-secondary/50 rounded-lg">
                        {question.explanation}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Final Exam View */}
            {showFinalExam && (
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="heading-md">{t('courses.finalExam', 'Final Exam')}</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      {t('courses.passRate', 'Pass rate')}: {course.finalExamPassRate}% • {t('courses.questions', '{{count}} questions', { count: course.finalExam.length })}
                    </p>
                  </div>
                  <Button variant="outline" onClick={() => setShowFinalExam(false)}>
                    {t('courses.backToCourse', 'Back to Course')}
                  </Button>
                </div>

                {course.finalExam.map((question, qIndex) => (
                  <div key={question.id} className="glass-card p-6">
                    <p className="font-medium mb-4">{qIndex + 1}. {question.question}</p>
                    <div className="space-y-2">
                      {question.options.map((option, oIndex) => (
                        <button
                          key={oIndex}
                          onClick={() => setFinalExamAnswers({ ...finalExamAnswers, [question.id]: oIndex })}
                          className={`w-full text-left p-3 rounded-lg border transition-colors ${
                            finalExamAnswers[question.id] === oIndex
                              ? finalExamAnswers[question.id] === question.correctAnswer
                                ? 'border-green-500 bg-green-500/10'
                                : 'border-red-500 bg-red-500/10'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    {finalExamAnswers[question.id] !== undefined && question.explanation && (
                      <p className="mt-4 text-sm text-muted-foreground p-3 bg-secondary/50 rounded-lg">
                        {question.explanation}
                      </p>
                    )}
                  </div>
                ))}

                {/* Exam Results */}
                {Object.keys(finalExamAnswers).length === course.finalExam.length && (
                  <div className="glass-card p-6 border-l-4 border-primary">
                    <h3 className="heading-sm mb-4">{t('courses.examResults', 'Exam Results')}</h3>
                    {(() => {
                      const correct = course.finalExam.filter(
                        q => finalExamAnswers[q.id] === q.correctAnswer
                      ).length;
                      const percentage = Math.round((correct / course.finalExam.length) * 100);
                      const passed = percentage >= course.finalExamPassRate;
                      return (
                        <div className="space-y-4">
                          <div className="text-center">
                            <div className="text-3xl font-bold mb-2">{percentage}%</div>
                            <div className="text-sm text-muted-foreground">
                              {correct} {t('courses.outOf', 'out of')} {course.finalExam.length} {t('courses.correct', 'correct')}
                            </div>
                          </div>
                          <div className={`text-center p-4 rounded-lg ${passed ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'}`}>
                            <p className={`font-semibold ${passed ? 'text-green-400' : 'text-red-400'}`}>
                              {passed ? t('courses.congratulations', 'Congratulations! You passed!') : t('courses.needToPass', 'You need {{rate}}% to pass. Try again!', { rate: course.finalExamPassRate })}
                            </p>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </Layout>
  );
}
