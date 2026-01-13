import { useState, useEffect, useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { getCourseById, getAllCourses } from '@/data/courses';
import type { Course, Lesson, ContentItem, VideoContent, ArticleContent, QuizContent, MasteryCheckContent } from '@/data/courseTypes';
import { MarkdownContent } from '@/components/content/MarkdownContent';
import { useTranslation } from '@/hooks/useTranslation';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/integrations/supabase/client';
import { 
  ChevronDown, ChevronRight, Play, CheckCircle, Clock, 
  BookOpen, Award, Lightbulb, ArrowRight, Lock, ArrowLeft, FileText, Target
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getCourseListingPath } from '@/lib/educationRoutes';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { VideoPlayer } from '@/components/education/VideoPlayer';
import { getVideoContentUrl } from '@/lib/r2VideoUtils';

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

  const [expandedUnits, setExpandedUnits] = useState<string[]>([course.units[0]?.id]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | undefined>(course.units[0]?.lessons[0]);
  const [selectedContentItem, setSelectedContentItem] = useState<ContentItem | undefined>(undefined);

  // Reset state when course changes
  useEffect(() => {
    if (course.units[0]) {
      setExpandedUnits([course.units[0].id]);
      const firstLesson = course.units[0].lessons[0];
      setSelectedLesson(firstLesson);
      setSelectedContentItem(firstLesson?.contentItems[0]);
    }
  }, [course.id]);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showFinalExam, setShowFinalExam] = useState(false);
  const [showMasteryCheck, setShowMasteryCheck] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<typeof course.units[0] | undefined>(undefined);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [finalExamAnswers, setFinalExamAnswers] = useState<Record<string, number>>({});
  const [masteryCheckAnswers, setMasteryCheckAnswers] = useState<Record<string, number>>({});

  const toggleUnit = (unitId: string) => {
    setExpandedUnits(prev => 
      prev.includes(unitId) 
        ? prev.filter(id => id !== unitId)
        : [...prev, unitId]
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

  const totalLessons = course.units.reduce((acc, u) => acc + u.lessons.length, 0);
  const progressPercent = totalLessons > 0 ? (completedLessons.length / totalLessons) * 100 : 0;

  // Get unit and lesson indices for video URL generation
  const { unitIndex, lessonIndex } = useMemo(() => {
    if (!selectedLesson) return { unitIndex: -1, lessonIndex: -1 };
    
    for (let uIdx = 0; uIdx < course.units.length; uIdx++) {
      const unit = course.units[uIdx];
      const lIdx = unit.lessons.findIndex(l => l.id === selectedLesson.id);
      if (lIdx !== -1) {
        return { unitIndex: uIdx, lessonIndex: lIdx };
      }
    }
    return { unitIndex: -1, lessonIndex: -1 };
  }, [selectedLesson, course.units]);

  // Generate videoId and find next video for prefetching
  const { videoId, nextVideoUrl } = useMemo(() => {
    if (!selectedContentItem || selectedContentItem.type !== 'video' || unitIndex < 0 || lessonIndex < 0) {
      return { videoId: undefined, nextVideoUrl: undefined };
    }

    const videoContent = selectedContentItem as VideoContent;
    const currentVideoId = `${course.id}-u${unitIndex + 1}-l${lessonIndex + 1}-v${videoContent.videoIndex + 1}`;
    
    // Find next video in the same lesson or next lesson
    let nextVideo: VideoContent | undefined;
    let nextVideoUnitIndex = unitIndex;
    let nextVideoLessonIndex = lessonIndex;
    
    // First, check if there's a next video in the same lesson
    const currentLesson = course.units[unitIndex]?.lessons[lessonIndex];
    if (currentLesson) {
      const currentVideoIndex = currentLesson.contentItems.findIndex(item => item.id === videoContent.id);
      if (currentVideoIndex >= 0) {
        // Look for next video in same lesson
        for (let i = currentVideoIndex + 1; i < currentLesson.contentItems.length; i++) {
          if (currentLesson.contentItems[i].type === 'video') {
            nextVideo = currentLesson.contentItems[i] as VideoContent;
            break;
          }
        }
      }
      
      // If no next video in same lesson, check next lesson
      if (!nextVideo) {
        const nextLessonIndex = lessonIndex + 1;
        if (nextLessonIndex < course.units[unitIndex].lessons.length) {
          const nextLesson = course.units[unitIndex].lessons[nextLessonIndex];
          const firstVideo = nextLesson.contentItems.find(item => item.type === 'video') as VideoContent | undefined;
          if (firstVideo) {
            nextVideo = firstVideo;
            nextVideoLessonIndex = nextLessonIndex;
          }
        }
      }
    }

    const nextUrl = nextVideo 
      ? getVideoContentUrl(course.id, nextVideoUnitIndex, nextVideoLessonIndex, nextVideo)
      : undefined;

    return { videoId: currentVideoId, nextVideoUrl: nextUrl };
  }, [selectedContentItem, course.id, unitIndex, lessonIndex, course.units]);

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

  const handleMasteryCheckClick = (unit: typeof course.units[0]) => {
    setSelectedUnit(unit);
    setShowMasteryCheck(true);
    setShowQuiz(false);
    setShowFinalExam(false);
    setSelectedLesson(undefined);
    setSelectedContentItem(undefined);
    setMasteryCheckAnswers({});
  };

  const handleMasteryCheckAnswer = (questionId: string, answerIndex: number) => {
    setMasteryCheckAnswers({ ...masteryCheckAnswers, [questionId]: answerIndex });
  };

  const handleContentItemClick = (item: ContentItem) => {
    setSelectedContentItem(item);
    if (item.type === 'quiz') {
      setShowQuiz(true);
      setShowFinalExam(false);
      setShowMasteryCheck(false);
      setQuizAnswers({});
    } else {
      setShowQuiz(false);
      setShowFinalExam(false);
      setShowMasteryCheck(false);
    }
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
                {course.units.map((unit, unitIndex) => (
                  <div key={unit.id} className="space-y-1">
                    <button
                      onClick={() => toggleUnit(unit.id)}
                      className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-secondary/50 transition-colors text-left text-sm"
                    >
                      {expandedUnits.includes(unit.id) ? (
                        <ChevronDown className="h-4 w-4 flex-shrink-0" />
                      ) : (
                        <ChevronRight className="h-4 w-4 flex-shrink-0" />
                      )}
                      <span className="text-xs text-muted-foreground">{t('courses.unit')} {unitIndex + 1}</span>
                      <span className="truncate flex-1">
                        {t(`course.${course.id}.unit.${unit.id}.title`) || unit.title}
                      </span>
                    </button>
                    {expandedUnits.includes(unit.id) && (
                      <div className="ml-6 space-y-1">
                        {unit.lessons.map((lesson) => (
                          <button
                            key={lesson.id}
                            onClick={() => {
                              setSelectedLesson(lesson);
                              setSelectedContentItem(lesson.contentItems[0]);
                              setShowQuiz(false);
                              setShowFinalExam(false);
                              setShowMasteryCheck(false);
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
                              {t(`course.${course.id}.unit.${unit.id}.lesson.${lesson.id}.title`) || lesson.title}
                            </span>
                          </button>
                        ))}
                        {unit.masteryCheck && (
                          <button
                            onClick={() => {
                              handleMasteryCheckClick(unit);
                              setMobileMenuOpen(false);
                            }}
                            className="w-full flex items-center gap-2 p-2 rounded-lg text-left text-xs text-muted-foreground hover:bg-secondary/50"
                          >
                            <Target className="h-3 w-3 flex-shrink-0" />
                            <span className="truncate">{t('courses.masteryCheck')}</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => {
                    setShowFinalExam(true);
                    setShowQuiz(false);
                    setShowMasteryCheck(false);
                    setSelectedLesson(undefined);
                    setSelectedContentItem(undefined);
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
              {course.units.map((unit, unitIndex) => (
                <div key={unit.id} className="mb-2">
                  <button
                    onClick={() => toggleUnit(unit.id)}
                    className="w-full flex items-center gap-2 p-3 rounded-lg hover:bg-secondary/50 transition-colors text-left"
                  >
                    {expandedUnits.includes(unit.id) ? (
                      <ChevronDown className="h-4 w-4 flex-shrink-0" />
                    ) : (
                      <ChevronRight className="h-4 w-4 flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0 flex flex-col">
                      <span className="text-xs text-muted-foreground leading-tight">{t('courses.unit')} {unitIndex + 1}</span>
                      <p className="text-sm font-medium truncate leading-tight">
                        {t(`course.${course.id}.unit.${unit.id}.title`) || unit.title}
                      </p>
                    </div>
                  </button>

                  {expandedUnits.includes(unit.id) && (
                    <div className="ml-4 space-y-1">
                      {unit.lessons.map((lesson) => (
                        <button
                          key={lesson.id}
                          onClick={() => { 
                            setSelectedLesson(lesson); 
                            setSelectedContentItem(lesson.contentItems[0]);
                            setShowQuiz(false); 
                            setShowFinalExam(false); 
                            setShowMasteryCheck(false); 
                          }}
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
                            {t(`course.${course.id}.unit.${unit.id}.lesson.${lesson.id}.title`) || lesson.title}
                          </span>
                        </button>
                      ))}
                      {unit.masteryCheck && (
                        <button 
                          onClick={() => handleMasteryCheckClick(unit)}
                          className="w-full flex items-center gap-2 p-2 rounded-lg text-left text-sm text-muted-foreground hover:bg-secondary/50 transition-colors"
                        >
                          <Target className="h-4 w-4 flex-shrink-0" />
                          <span className="truncate">{t('courses.masteryCheck')}</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}

              <div className="mt-4 p-3 border-t border-border">
                <button 
                  onClick={() => { 
                    setShowFinalExam(true); 
                    setShowQuiz(false); 
                    setShowMasteryCheck(false); 
                    setSelectedLesson(undefined); 
                    setSelectedContentItem(undefined); 
                  }}
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
            {selectedLesson && !showQuiz && !showFinalExam && !showMasteryCheck && (
              <div className="max-w-4xl mx-auto space-y-6">
                {/* Lesson Info */}
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="heading-md">
                      {(() => {
                        const unit = course.units.find(u => u.lessons.some(l => l.id === selectedLesson.id));
                        return t(`course.${course.id}.unit.${unit?.id}.lesson.${selectedLesson.id}.title`) || selectedLesson.title;
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

                {/* Content Items Navigation */}
                {selectedLesson.contentItems.length > 1 && (
                  <div className="glass-card p-4">
                    <div className="flex gap-2 flex-wrap">
                      {selectedLesson.contentItems.map((item) => (
                        <Button
                          key={item.id}
                          variant={selectedContentItem?.id === item.id ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => handleContentItemClick(item)}
                        >
                          {item.type === 'video' && <Play className="h-3 w-3 mr-1" />}
                          {item.type === 'article' && <BookOpen className="h-3 w-3 mr-1" />}
                          {item.type === 'practice' && <FileText className="h-3 w-3 mr-1" />}
                          {item.type === 'quiz' && <Award className="h-3 w-3 mr-1" />}
                          {item.type === 'mastery-check' && <Target className="h-3 w-3 mr-1" />}
                          {item.title || t(`courses.${item.type}`)}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Content Items Display */}
                {selectedContentItem && (
                  <div className="space-y-6">
                    {/* Video Content */}
                    {selectedContentItem.type === 'video' && unitIndex >= 0 && lessonIndex >= 0 && (
                      <div className="glass-card overflow-hidden p-0">
                        <VideoPlayer
                          src={getVideoContentUrl(course.id, unitIndex, lessonIndex, selectedContentItem)}
                          title={selectedContentItem.title || selectedLesson.title}
                          className="aspect-video"
                          videoId={videoId}
                          nextVideoUrl={nextVideoUrl}
                          onError={(error) => {
                            console.error('Video loading error:', error);
                          }}
                        />
                      </div>
                    )}

                    {/* Article Content */}
                    {selectedContentItem.type === 'article' && (
                      <>
                        <div className="glass-card p-6">
                          <h2 className="heading-sm mb-4 flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-primary" />
                            {selectedContentItem.title || t('courses.article')}
                          </h2>
                          <div className="prose prose-sm prose-invert max-w-none">
                            <MarkdownContent content={selectedContentItem.content} />
                          </div>
                        </div>
                        {selectedContentItem.importantPoints && selectedContentItem.importantPoints.length > 0 && (
                          <div className="glass-card p-6 border-l-4 border-yellow-500">
                            <h2 className="heading-sm mb-4 flex items-center gap-2">
                              <Lightbulb className="h-5 w-5 text-yellow-500" />
                              {t('courses.keyPoints')}
                            </h2>
                            <ul className="space-y-2">
                              {selectedContentItem.importantPoints.map((point, index) => (
                                <li key={index} className="flex items-start gap-2 text-sm">
                                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                                  {point}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </>
                    )}

                    {/* Practice Content */}
                    {selectedContentItem.type === 'practice' && (
                      <div className="glass-card p-6">
                        <h2 className="heading-sm mb-4 flex items-center gap-2">
                          <FileText className="h-5 w-5 text-primary" />
                          {selectedContentItem.title || t('courses.practice')}
                        </h2>
                        <p className="text-muted-foreground">{t('courses.practiceComingSoon')}</p>
                        {/* TODO: Implement practice exercises UI */}
                      </div>
                    )}

                    {/* Quiz Content Button */}
                    {selectedContentItem.type === 'quiz' && (
                      <Button onClick={() => handleContentItemClick(selectedContentItem)} className="w-full" size="lg">
                        {t('courses.takeQuiz')}
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Mastery Check View */}
            {showMasteryCheck && selectedUnit && selectedUnit.masteryCheck && !showQuiz && !showFinalExam && (
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="heading-md">{t('courses.masteryCheck')}</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      {t(`course.${course.id}.unit.${selectedUnit.id}.title`) || selectedUnit.title}
                    </p>
                  </div>
                  <Button variant="outline" onClick={() => { setShowMasteryCheck(false); setSelectedUnit(undefined); }}>
                    {t('courses.backToCourse')}
                  </Button>
                </div>

                {selectedUnit.masteryCheck.questions.map((question, qIndex) => (
                  <div key={question.id} className="glass-card p-6">
                    <p className="font-medium mb-4">{qIndex + 1}. {question.question}</p>
                    <div className="space-y-2">
                      {question.options.map((option, oIndex) => (
                        <button
                          key={oIndex}
                          onClick={() => handleMasteryCheckAnswer(question.id, oIndex)}
                          className={`w-full text-left p-3 rounded-lg border transition-colors ${
                            masteryCheckAnswers[question.id] === oIndex
                              ? masteryCheckAnswers[question.id] === question.correctAnswer
                                ? 'border-green-500 bg-green-500/10'
                                : 'border-red-500 bg-red-500/10'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    {masteryCheckAnswers[question.id] !== undefined && question.explanation && (
                      <p className="mt-4 text-sm text-muted-foreground p-3 bg-secondary/50 rounded-lg">
                        {question.explanation}
                      </p>
                    )}
                  </div>
                ))}

                {/* Mastery Check Results */}
                {Object.keys(masteryCheckAnswers).length === selectedUnit.masteryCheck.questions.length && (
                  <div className="glass-card p-6 border-l-4 border-primary">
                    <h3 className="heading-sm mb-4">{t('courses.masteryCheckResults', { defaultValue: 'Mastery Check Results' })}</h3>
                    {(() => {
                      const correct = selectedUnit.masteryCheck.questions.filter(
                        q => masteryCheckAnswers[q.id] === q.correctAnswer
                      ).length;
                      const percentage = Math.round((correct / selectedUnit.masteryCheck.questions.length) * 100);
                      const passed = percentage >= selectedUnit.masteryCheck.passRate;
                      return (
                        <div className="space-y-4">
                          <div className="text-center">
                            <div className="text-3xl font-bold mb-2">{percentage}%</div>
                            <div className="text-sm text-muted-foreground">
                              {correct} {t('courses.outOf')} {selectedUnit.masteryCheck.questions.length} {t('courses.correct')}
                            </div>
                          </div>
                          <div className={`text-center p-4 rounded-lg ${passed ? 'bg-green-500/10 border border-green-500/20' : 'bg-yellow-500/10 border border-yellow-500/20'}`}>
                            <p className={`font-semibold ${passed ? 'text-green-400' : 'text-yellow-400'}`}>
                              {passed ? t('courses.masteryCheckPassed', { defaultValue: 'Mastery Check Passed!' }) : t('courses.masteryCheckReview', { defaultValue: `Review the material and try again. Pass rate: ${selectedUnit.masteryCheck.passRate}%` })}
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
            {showQuiz && selectedLesson && selectedContentItem && selectedContentItem.type === 'quiz' && !showFinalExam && !showMasteryCheck && (() => {
              // Find lesson index in unit to generate quiz number
              let lessonNumber = 1;
              for (const unit of course.units) {
                const lessonIdx = unit.lessons.findIndex(l => l.id === selectedLesson.id);
                if (lessonIdx !== -1) {
                  lessonNumber = lessonIdx + 1;
                  break;
                }
              }
              return (
                <div className="max-w-2xl mx-auto space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="heading-md">{selectedContentItem.title || `${t('courses.quiz')} ${lessonNumber}`}</h2>
                    <Button variant="outline" onClick={() => { setShowQuiz(false); setSelectedContentItem(selectedLesson.contentItems.find(item => item.type !== 'quiz') || selectedLesson.contentItems[0]); }}>
                      {t('courses.backToLesson')}
                    </Button>
                  </div>

                {selectedContentItem.questions.map((question, qIndex) => (
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
            {showFinalExam && !showMasteryCheck && (
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
