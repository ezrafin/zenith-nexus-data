import { useState, useEffect, useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { getCourseById, getAllCourses } from '@/data/courseData';
import { MarkdownContent } from '@/components/content/MarkdownContent';
import { useTranslation } from '@/hooks/useTranslation';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/integrations/supabase/client';
import { 
  ChevronDown, ChevronRight, Play, CheckCircle, Clock, 
  BookOpen, Award, Lightbulb, ArrowRight, Lock, ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getCourseListingPath } from '@/lib/educationRoutes';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { VideoPlayer } from '@/components/education/VideoPlayer';
import { getLessonVideoUrls } from '@/lib/r2VideoUtils';

export default function CoursePlatformPage() {
  const { t } = useTranslation({ namespace: 'education' });
  const { t: tUi } = useTranslation({ namespace: 'ui' });
  const { user } = useUser();
  const { courseId } = useParams<{ courseId: string }>();
  const course = courseId ? getCourseById(courseId) : getAllCourses()[0];
  
  // Redirect to first course if courseId is invalid
  if (!course) {
    return <Navigate to="/academy" replace />;
  }

  const [expandedModules, setExpandedModules] = useState<string[]>([course.modules[0]?.id]);
  const [selectedLesson, setSelectedLesson] = useState<typeof course.modules[0]['lessons'][0] | undefined>(course.modules[0]?.lessons[0]);

  // Reset state when course changes
  useEffect(() => {
    if (course.modules[0]) {
      setExpandedModules([course.modules[0].id]);
      setSelectedLesson(course.modules[0].lessons[0]);
    }
  }, [course.id]);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showFinalExam, setShowFinalExam] = useState(false);
  const [showModuleTest, setShowModuleTest] = useState(false);
  const [selectedModule, setSelectedModule] = useState<typeof course.modules[0] | undefined>(undefined);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [finalExamAnswers, setFinalExamAnswers] = useState<Record<string, number>>({});
  const [moduleTestAnswers, setModuleTestAnswers] = useState<Record<string, number>>({});

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  // Load progress from localStorage (database table not yet created)
  useEffect(() => {
    const loadProgress = async () => {
      setLoadingProgress(true);
      const storageKey = `course_progress_${course.id}`;
      
      // Load from localStorage
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        try {
          setCompletedLessons(JSON.parse(saved));
        } catch (e) {
          console.error('Error parsing localStorage progress:', e);
        }
      }
      setLoadingProgress(false);
    };

    loadProgress();
  }, [course.id, user]);

  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const progressPercent = totalLessons > 0 ? (completedLessons.length / totalLessons) * 100 : 0;

  // Get video URLs for selected lesson
  const lessonVideoUrls = useMemo(() => {
    if (!selectedLesson) return [];
    
    // Find module and lesson indices
    let moduleIndex = -1;
    let lessonIndex = -1;
    
    for (let mIdx = 0; mIdx < course.modules.length; mIdx++) {
      const module = course.modules[mIdx];
      const lIdx = module.lessons.findIndex(l => l.id === selectedLesson.id);
      if (lIdx !== -1) {
        moduleIndex = mIdx;
        lessonIndex = lIdx;
        break;
      }
    }
    
    if (moduleIndex === -1 || lessonIndex === -1) return [];
    
    const videoCount = selectedLesson.videoCount || 1;
    return getLessonVideoUrls(course.id, moduleIndex, lessonIndex, videoCount);
  }, [selectedLesson, course.id, course.modules]);

  const markComplete = async () => {
    if (selectedLesson && !completedLessons.includes(selectedLesson.id)) {
      const updatedLessons = [...completedLessons, selectedLesson.id];
      setCompletedLessons(updatedLessons);

      const storageKey = `course_progress_${course.id}`;
      localStorage.setItem(storageKey, JSON.stringify(updatedLessons));
    }
  };

  const handleQuizAnswer = (questionId: string, answerIndex: number) => {
    setQuizAnswers({ ...quizAnswers, [questionId]: answerIndex });
  };

  const handleModuleTestClick = (module: typeof course.modules[0]) => {
    setSelectedModule(module);
    setShowModuleTest(true);
    setShowQuiz(false);
    setShowFinalExam(false);
    setSelectedLesson(undefined);
    setModuleTestAnswers({});
  };

  const handleModuleTestAnswer = (questionId: string, answerIndex: number) => {
    setModuleTestAnswers({ ...moduleTestAnswers, [questionId]: answerIndex });
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <Layout>
      <div className="pt-20 pb-8 min-h-screen">
        {/* Mobile Navigation */}
        <div className="lg:hidden mb-4 px-4">
          <div className="glass-card p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-sm">{t(`course.${course.id}.title`) || course.title}</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? tUi('buttons.close') : tUi('buttons.menu')}
              </Button>
            </div>
            {mobileMenuOpen && (
              <div className="space-y-2 max-h-[60vh] overflow-y-auto">
                {course.modules.map((module, moduleIndex) => (
                  <div key={module.id} className="space-y-1">
                    <button
                      onClick={() => toggleModule(module.id)}
                      className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-secondary/50 transition-colors text-left text-sm"
                    >
                      {expandedModules.includes(module.id) ? (
                        <ChevronDown className="h-4 w-4 flex-shrink-0" />
                      ) : (
                        <ChevronRight className="h-4 w-4 flex-shrink-0" />
                      )}
                      <span className="text-xs text-muted-foreground">{t('courses.module')} {moduleIndex + 1}</span>
                      <span className="truncate flex-1">
                        {t(`course.${course.id}.module.${module.id}.title`) || module.title}
                      </span>
                    </button>
                    {expandedModules.includes(module.id) && (
                      <div className="ml-6 space-y-1">
                        {module.lessons.map((lesson) => (
                          <button
                            key={lesson.id}
                            onClick={() => {
                              setSelectedLesson(lesson);
                              setShowQuiz(false);
                              setShowFinalExam(false);
                              setShowModuleTest(false);
                              setMobileMenuOpen(false);
                            }}
                            className={`w-full flex items-center gap-2 p-2 rounded-lg text-left text-xs transition-colors ${
                              selectedLesson?.id === lesson.id
                                ? 'bg-primary text-primary-foreground'
                                : 'hover:bg-secondary/50'
                            }`}
                          >
                            {completedLessons.includes(lesson.id) ? (
                              <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                            ) : (
                              <Play className="h-3 w-3 flex-shrink-0" />
                            )}
                            <span className="truncate flex-1">
                              {t(`course.${course.id}.module.${module.id}.lesson.${lesson.id}.title`) || lesson.title}
                            </span>
                          </button>
                        ))}
                        <button
                          onClick={() => {
                            handleModuleTestClick(module);
                            setMobileMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-2 p-2 rounded-lg text-left text-xs text-muted-foreground hover:bg-secondary/50"
                        >
                          <Award className="h-3 w-3 flex-shrink-0" />
                          <span className="truncate">{t('courses.moduleTest')}</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => {
                    setShowFinalExam(true);
                    setShowQuiz(false);
                    setShowModuleTest(false);
                    setSelectedLesson(undefined);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 p-2 rounded-lg text-left text-sm font-medium hover:bg-secondary/50 mt-2"
                >
                  <Award className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="flex-1 truncate">{t('courses.finalExam')}</span>
                  {totalLessons === completedLessons.length ? (
                    <CheckCircle className="h-3 w-3 flex-shrink-0 text-green-500" />
                  ) : (
                    <Lock className="h-3 w-3 flex-shrink-0 text-muted-foreground" />
                  )}
                </button>
              </div>
            )}
            <div className="mt-3 pt-3 border-t border-border/50">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-muted-foreground">{t('courses.progress')}</span>
                <span className="font-medium">{Math.round(progressPercent)}%</span>
              </div>
              <Progress value={progressPercent} className="h-1.5" />
            </div>
          </div>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <aside className="w-80 border-r border-border bg-card/50 min-h-[calc(100vh-5rem)] overflow-y-auto hidden lg:block">
            <div className="p-4 border-b border-border">
              <Link 
                to={getCourseListingPath()}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-3 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 flex-shrink-0" />
                <span>{t('courses.backToCourses')}</span>
              </Link>
              <h2 className="font-semibold">{t(`course.${course.id}.title`) || course.title}</h2>
              <div className="mt-3">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-muted-foreground">{t('courses.progress')}</span>
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
                      <span className="text-xs text-muted-foreground leading-tight">{t('courses.module')} {moduleIndex + 1}</span>
                      <p className="text-sm font-medium truncate leading-tight">
                        {t(`course.${course.id}.module.${module.id}.title`) || module.title}
                      </p>
                    </div>
                  </button>

                  {expandedModules.includes(module.id) && (
                    <div className="ml-4 space-y-1">
                      {module.lessons.map((lesson, lessonIndex) => (
                        <button
                          key={lesson.id}
                          onClick={() => { setSelectedLesson(lesson); setShowQuiz(false); setShowFinalExam(false); setShowModuleTest(false); }}
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
                          <span className="truncate flex-1">
                            {t(`course.${course.id}.module.${module.id}.lesson.${lesson.id}.title`) || lesson.title}
                          </span>
                        </button>
                      ))}
                      <button 
                        onClick={() => handleModuleTestClick(module)}
                        className="w-full flex items-center gap-2 p-2 rounded-lg text-left text-sm text-muted-foreground hover:bg-secondary/50 transition-colors"
                      >
                        <Award className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate">{t('courses.moduleTest')}</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}

              <div className="mt-4 p-3 border-t border-border">
                <button 
                  onClick={() => { setShowFinalExam(true); setShowQuiz(false); setShowModuleTest(false); setSelectedLesson(undefined); }}
                  className="w-full flex items-center gap-2 p-2 rounded-lg text-left text-sm font-medium hover:bg-secondary/50"
                >
                  <Award className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="flex-1 truncate">{t('courses.finalExam')}</span>
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
            {selectedLesson && !showQuiz && !showFinalExam && !showModuleTest && (
              <div className="max-w-4xl mx-auto space-y-6">
                {/* Video Player(s) */}
                {lessonVideoUrls.length > 0 ? (
                  <div className="space-y-4">
                    {lessonVideoUrls.map((videoUrl, index) => (
                      <div key={index} className="glass-card overflow-hidden p-0">
                        {lessonVideoUrls.length > 1 && (
                          <div className="px-4 pt-4 pb-2">
                            <span className="text-sm text-muted-foreground">
                              {t('courses.video')} {index + 1} {lessonVideoUrls.length > 1 ? `of ${lessonVideoUrls.length}` : ''}
                            </span>
                          </div>
                        )}
                        <VideoPlayer
                          src={videoUrl}
                          title={selectedLesson.title}
                          className="aspect-video"
                          onError={(error) => {
                            console.error('Video loading error:', error);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="glass-card overflow-hidden">
                    <div className="aspect-video bg-secondary flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center mx-auto mb-3">
                          <Play className="h-6 w-6 text-primary-foreground ml-1" />
                        </div>
                        <p className="text-sm text-muted-foreground">{t('courses.lessonVideo')}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Lesson Info */}
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="heading-md">
                      {selectedLesson && (() => {
                        const module = course.modules.find(m => m.lessons.some(l => l.id === selectedLesson.id));
                        return t(`course.${course.id}.module.${module?.id}.lesson.${selectedLesson.id}.title`) || selectedLesson.title;
                      })()}
                    </h1>
                    <span className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                      <Clock className="h-4 w-4 flex-shrink-0" />
                      {selectedLesson.duration}
                    </span>
                  </div>
                  <Button onClick={markComplete} disabled={completedLessons.includes(selectedLesson.id)}>
                    {completedLessons.includes(selectedLesson.id) ? (
                      <>
                        <CheckCircle className="h-4 w-4" />
                        {t('courses.completed')}
                      </>
                    ) : (
                      <>{t('courses.markAsCompleted')}</>
                    )}
                  </Button>
                </div>

                {/* Notes */}
                <div className="glass-card p-6">
                  <h2 className="heading-sm mb-4 flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    {t('courses.lessonNotes')}
                  </h2>
                  <div className="prose prose-sm prose-invert max-w-none">
                    <MarkdownContent content={selectedLesson.notes} />
                  </div>
                </div>

                {/* Important Points */}
                <div className="glass-card p-6 border-l-4 border-yellow-500">
                  <h2 className="heading-sm mb-4 flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-500" />
                    {t('courses.keyPoints')}
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
                    {t('courses.takeQuiz')}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            )}

            {/* Module Test View */}
            {showModuleTest && selectedModule && !showQuiz && !showFinalExam && (
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="heading-md">{t('courses.moduleTest')}</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      {t(`course.${course.id}.module.${selectedModule.id}.title`) || selectedModule.title}
                    </p>
                  </div>
                  <Button variant="outline" onClick={() => { setShowModuleTest(false); setSelectedModule(undefined); }}>
                    {t('courses.backToCourse')}
                  </Button>
                </div>

                {selectedModule.moduleTest.map((question, qIndex) => (
                  <div key={question.id} className="glass-card p-6">
                    <p className="font-medium mb-4">{qIndex + 1}. {question.question}</p>
                    <div className="space-y-2">
                      {question.options.map((option, oIndex) => (
                        <button
                          key={oIndex}
                          onClick={() => handleModuleTestAnswer(question.id, oIndex)}
                          className={`w-full text-left p-3 rounded-lg border transition-colors ${
                            moduleTestAnswers[question.id] === oIndex
                              ? moduleTestAnswers[question.id] === question.correctAnswer
                                ? 'border-green-500 bg-green-500/10'
                                : 'border-red-500 bg-red-500/10'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    {moduleTestAnswers[question.id] !== undefined && question.explanation && (
                      <p className="mt-4 text-sm text-muted-foreground p-3 bg-secondary/50 rounded-lg">
                        {question.explanation}
                      </p>
                    )}
                  </div>
                ))}

                {/* Module Test Results */}
                {Object.keys(moduleTestAnswers).length === selectedModule.moduleTest.length && (
                  <div className="glass-card p-6 border-l-4 border-primary">
                    <h3 className="heading-sm mb-4">{t('courses.moduleTestResults', { defaultValue: 'Module Test Results' })}</h3>
                    {(() => {
                      const correct = selectedModule.moduleTest.filter(
                        q => moduleTestAnswers[q.id] === q.correctAnswer
                      ).length;
                      const percentage = Math.round((correct / selectedModule.moduleTest.length) * 100);
                      const passed = percentage >= 70; // 70% pass rate for module tests
                      return (
                        <div className="space-y-4">
                          <div className="text-center">
                            <div className="text-3xl font-bold mb-2">{percentage}%</div>
                            <div className="text-sm text-muted-foreground">
                              {correct} {t('courses.outOf')} {selectedModule.moduleTest.length} {t('courses.correct')}
                            </div>
                          </div>
                          <div className={`text-center p-4 rounded-lg ${passed ? 'bg-green-500/10 border border-green-500/20' : 'bg-yellow-500/10 border border-yellow-500/20'}`}>
                            <p className={`font-semibold ${passed ? 'text-green-400' : 'text-yellow-400'}`}>
                              {passed ? t('courses.moduleTestPassed', { defaultValue: 'Module Test Passed!' }) : t('courses.moduleTestReview', { defaultValue: 'Review the material and try again' })}
                            </p>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
            )}

            {/* Quiz View */}
            {showQuiz && selectedLesson && !showFinalExam && !showModuleTest && (() => {
              // Find lesson index in module to generate quiz number
              let lessonNumber = 1;
              for (const module of course.modules) {
                const lessonIndex = module.lessons.findIndex(l => l.id === selectedLesson.id);
                if (lessonIndex !== -1) {
                  lessonNumber = lessonIndex + 1;
                  break;
                }
              }
              return (
                <div className="max-w-2xl mx-auto space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="heading-md">{t('courses.quiz')} {lessonNumber}</h2>
                    <Button variant="outline" onClick={() => setShowQuiz(false)}>
                      {t('courses.backToLesson')}
                    </Button>
                  </div>

                {selectedLesson.quiz.map((question, qIndex) => (
                  <div key={question.id} className="glass-card p-6">
                    <p className="font-medium mb-4">{qIndex + 1}. {question.question}</p>
                    <div className="space-y-2">
                      {question.options.map((option, oIndex) => {
                        const isSelected = quizAnswers[question.id] === oIndex;
                        const isCorrect = oIndex === question.correctAnswer;
                        const showExplanation = isSelected && question.optionExplanations && question.optionExplanations[oIndex];
                        
                        return (
                          <div key={oIndex} className="space-y-1">
                            <button
                              onClick={() => handleQuizAnswer(question.id, oIndex)}
                              className={`w-full text-left p-3 rounded-lg border transition-colors ${
                                isSelected
                                  ? isCorrect
                                    ? 'border-green-500 bg-green-500/10'
                                    : 'border-red-500 bg-red-500/10'
                                  : 'border-border hover:border-primary/50'
                              }`}
                            >
                              {option}
                            </button>
                            {showExplanation && (
                              <p className={`text-sm p-3 rounded-lg ml-2 ${
                                isCorrect 
                                  ? 'text-green-700 dark:text-green-400 bg-green-500/10' 
                                  : 'text-red-700 dark:text-red-400 bg-red-500/10'
                              }`}>
                                {question.optionExplanations?.[oIndex]}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    {quizAnswers[question.id] !== undefined && question.explanation && !question.optionExplanations && (
                      <p className="mt-4 text-sm text-muted-foreground p-3 bg-secondary/50 rounded-lg">
                        {question.explanation}
                      </p>
                    )}
                  </div>
                ))}
                </div>
              );
            })()}

            {/* Final Exam View */}
            {showFinalExam && !showModuleTest && (
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="heading-md">{t('courses.finalExam')}</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      {t('courses.passRate')}: {course.finalExamPassRate}% • {t('courses.questions', { count: course.finalExam.length })}
                    </p>
                  </div>
                  <Button variant="outline" onClick={() => setShowFinalExam(false)}>
                    {t('courses.backToCourse')}
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
                    <h3 className="heading-sm mb-4">{t('courses.examResults')}</h3>
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
                              {correct} {t('courses.outOf')} {course.finalExam.length} {t('courses.correct')}
                            </div>
                          </div>
                          <div className={`text-center p-4 rounded-lg ${passed ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'}`}>
                            <p className={`font-semibold ${passed ? 'text-green-400' : 'text-red-400'}`}>
                              {passed ? t('courses.congratulations') : t('courses.needToPass', { rate: course.finalExamPassRate })}
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
