import { useState } from 'react';
import DOMPurify from 'dompurify';
import { Layout } from '@/components/layout/Layout';
import { courseData, finalExamQuestions } from '@/data/courseData';
import { 
  ChevronDown, ChevronRight, Play, CheckCircle, Clock, 
  BookOpen, Award, Lightbulb, ArrowRight, Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export default function CoursePlatformPage() {
  const [expandedModules, setExpandedModules] = useState<string[]>([courseData.modules[0]?.id]);
  const [selectedLesson, setSelectedLesson] = useState(courseData.modules[0]?.lessons[0]);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const totalLessons = courseData.modules.reduce((acc, m) => acc + m.lessons.length, 0);
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
              <h2 className="font-semibold">{courseData.title}</h2>
              <div className="mt-3">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{Math.round(progressPercent)}%</span>
                </div>
                <Progress value={progressPercent} className="h-2" />
              </div>
            </div>

            <nav className="p-2">
              {courseData.modules.map((module, moduleIndex) => (
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
                    <div className="flex-1 min-w-0">
                      <span className="text-xs text-muted-foreground">Module {moduleIndex + 1}</span>
                      <p className="text-sm font-medium truncate">{module.title}</p>
                    </div>
                  </button>

                  {expandedModules.includes(module.id) && (
                    <div className="ml-4 space-y-1">
                      {module.lessons.map((lesson, lessonIndex) => (
                        <button
                          key={lesson.id}
                          onClick={() => { setSelectedLesson(lesson); setShowQuiz(false); }}
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
                          <span className="truncate">{lesson.title}</span>
                        </button>
                      ))}
                      <button className="w-full flex items-center gap-2 p-2 rounded-lg text-left text-sm text-muted-foreground hover:bg-secondary/50">
                        <Award className="h-4 w-4" />
                        Module Test
                      </button>
                    </div>
                  )}
                </div>
              ))}

              <div className="mt-4 p-3 border-t border-border">
                <button className="w-full flex items-center gap-2 p-2 rounded-lg text-left text-sm font-medium hover:bg-secondary/50">
                  <Award className="h-5 w-5 text-primary" />
                  Final Exam
                  <Lock className="h-4 w-4 ml-auto text-muted-foreground" />
                </button>
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
            {selectedLesson && !showQuiz && (
              <div className="max-w-4xl mx-auto space-y-6">
                {/* Video Placeholder */}
                <div className="glass-card overflow-hidden">
                  <div className="aspect-video bg-secondary flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center mx-auto mb-3 cursor-pointer hover:scale-110 transition-transform">
                        <Play className="h-6 w-6 text-primary-foreground ml-1" />
                      </div>
                      <p className="text-sm text-muted-foreground">Lesson Video</p>
                    </div>
                  </div>
                </div>

                {/* Lesson Info */}
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="heading-md">{selectedLesson.title}</h1>
                    <span className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                      <Clock className="h-4 w-4" />
                      {selectedLesson.duration}
                    </span>
                  </div>
                  <Button onClick={markComplete} disabled={completedLessons.includes(selectedLesson.id)}>
                    {completedLessons.includes(selectedLesson.id) ? (
                      <><CheckCircle className="h-4 w-4 mr-2" /> Completed</>
                    ) : (
                      <>Mark as Completed</>
                    )}
                  </Button>
                </div>

                {/* Notes */}
                <div className="glass-card p-6">
                  <h2 className="heading-sm mb-4 flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Lesson Notes
                  </h2>
                <div className="prose prose-sm prose-invert max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(selectedLesson.notes.replace(/\n/g, '<br/>')) }} />
                  </div>
                </div>

                {/* Important Points */}
                <div className="glass-card p-6 border-l-4 border-yellow-500">
                  <h2 className="heading-sm mb-4 flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-500" />
                    Key Points to Remember
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
                    Take Mini-Quiz <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            )}

            {/* Quiz View */}
            {showQuiz && selectedLesson && (
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="heading-md">Mini-Quiz</h2>
                  <Button variant="outline" onClick={() => setShowQuiz(false)}>
                    Back to Lesson
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
          </main>
        </div>
      </div>
    </Layout>
  );
}
