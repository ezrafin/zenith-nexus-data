import { Layout } from '@/components/layout/Layout';
import { CourseCard } from '@/components/education/CourseCard';
import { getAllCourses } from '@/data/courses';
import { useTranslation } from '@/hooks/useTranslation';
import { BookOpen } from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';

export default function CourseListingPage() {
  const { t } = useTranslation({ namespace: 'education' });
  const courses = getAllCourses();

  return (
    <Layout>
      <SEOHead
        title={t('courses.seoTitle')}
        description={t('courses.seoDescription')}
        keywords="investment courses, finance courses, economics courses, trading courses, financial education, investment education, online finance courses, financial market courses"
        isCoursePage={true}
      />
      <div className="pt-24 pb-16">
        <section className="container-wide section-spacing-sm">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="badge-primary mb-4">
              {t('courses.badge')}
            </span>
            <h1 className="heading-xl mb-4">
              {t('courses.title')}
            </h1>
            <p className="body-xl">
              {t('courses.subtitle')}
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
              {t('courses.infoTitle')}
            </h2>
            <p className="body-md mb-6 max-w-2xl mx-auto">
              {t('courses.infoDescription')}
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
}

