import { Layout } from '@/components/layout/Layout';
import { CourseCard } from '@/components/education/CourseCard';
import { getAllCourses } from '@/data/courseData';
import { useTranslation } from '@/hooks/useTranslation';
import { BookOpen } from 'lucide-react';

export default function CourseListingPage() {
  const { t } = useTranslation({ namespace: 'education' });
  const courses = getAllCourses();

  return (
    <Layout>
      <div className="pt-24 pb-16">
        <section className="container-wide section-spacing-sm">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="badge-primary mb-4">
              {t('courses.badge', 'Courses')}
            </span>
            <h1 className="heading-xl mb-4">
              {t('courses.title', 'Financial Education Courses')}
            </h1>
            <p className="body-xl">
              {t('courses.subtitle', 'Comprehensive courses covering everything from investment fundamentals to advanced trading strategies. Learn at your own pace with structured modules and practical lessons.')}
            </p>
          </div>

          {/* Courses Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </div>

          {/* Info Section */}
          <div className="mt-12 glass-card p-8 text-center">
            <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="heading-sm mb-4">
              {t('courses.infoTitle', 'How Our Courses Work')}
            </h2>
            <p className="body-md mb-6 max-w-2xl mx-auto">
              {t('courses.infoDescription', 'Each course is divided into modules with multiple lessons. Complete lessons at your own pace, take quizzes to test your knowledge, and pass the final exam to demonstrate mastery. Track your progress and return anytime to review materials.')}
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
}

