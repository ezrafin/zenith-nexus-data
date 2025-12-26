import { Link } from 'react-router-dom';
import { Clock, BookOpen, Award, ArrowRight } from 'lucide-react';
import { Course } from '@/data/courseData';
import { getCoursePath } from '@/lib/educationRoutes';
import { useTranslation } from '@/hooks/useTranslation';

interface CourseCardProps {
  course: Course;
  index?: number;
}

export function CourseCard({ course, index = 0 }: CourseCardProps) {
  const { t } = useTranslation({ namespace: 'education' });
  const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);
  const totalModules = course.modules.length;
  
  // Estimate total duration (rough calculation: average 15 min per lesson)
  const estimatedHours = Math.round((totalLessons * 15) / 60);
  const estimatedDuration = estimatedHours > 0 
    ? t('courses.hours', '{{count}}+ hours', { count: estimatedHours })
    : t('courses.lessThanHour', 'Less than 1 hour');

  return (
    <Link
      to={getCoursePath(course.id)}
      className="group glass-card p-6 flex flex-col h-full hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-0.5 transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
            {course.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {course.description}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <BookOpen className="h-4 w-4 flex-shrink-0" />
          <span>{t('courses.modules', '{{count}} modules', { count: totalModules })}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="h-4 w-4 flex-shrink-0" />
          <span>{estimatedDuration}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Award className="h-4 w-4 flex-shrink-0" />
          <span>{t('courses.lessons', '{{count}} lessons', { count: totalLessons })}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between">
        <span className="text-sm font-medium text-primary">{t('courses.startCourse', 'Start Course')}</span>
        <ArrowRight className="h-4 w-4 text-primary flex-shrink-0 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}

