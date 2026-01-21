import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { UserProvider } from "@/context/UserContext";
import { I18nProvider } from "@/context/I18nContext";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { PageSkeleton } from "@/components/layout/PageSkeleton";
import { educationRoutes } from "@/lib/educationRoutes";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { CookieConsentBanner } from "@/components/cookies/CookieConsentBanner";
import { NotificationManager } from "@/components/notifications/NotificationManager";
import { AnimatedRoutesWrapper } from "@/components/navigation/AnimatedRoutesWrapper";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";
import { OfflineIndicator } from "@/components/layout/OfflineIndicator";
import { logger } from "@/lib/logger";
import { useRoutePrefetch } from "@/hooks/useRoutePrefetch";
import { PrefetchData } from "@/components/prefetch/PrefetchData";

// Eager load critical pages
import Index from "./pages/Index";

// Lazy load with error handling and retry mechanism
const lazyWithRetry = (componentImport: () => Promise<any>) => {
  return lazy(async () => {
    try {
      return await componentImport();
    } catch (error) {
      // If module fails to load, try reloading the page
      if (error instanceof Error && error.message.includes('Failed to fetch dynamically imported module')) {
        logger.warn('Module load failed, reloading page...', error);
        // Small delay before reload to avoid infinite loops
        setTimeout(() => {
          window.location.reload();
        }, 100);
        // Return a placeholder component while reloading
        return { default: () => <LoadingScreen /> };
      }
      throw error;
    }
  });
};

// Lazy load other pages for better performance
const NewsPage = lazyWithRetry(() => import("./pages/NewsPage"));
const NewsDetailPage = lazyWithRetry(() => import("./pages/NewsDetailPage"));
const AnalyticsPage = lazyWithRetry(() => import("./pages/AnalyticsPage"));
const AnalyticsDetailPage = lazyWithRetry(() => import("./pages/AnalyticsDetailPage"));
const MarketsPage = lazyWithRetry(() => import("./pages/MarketsPage"));
const CompaniesPage = lazyWithRetry(() => import("./pages/CompaniesPage"));
const CompanyDetailPage = lazyWithRetry(() => import("./pages/CompanyDetailPage"));
const ForumPage = lazyWithRetry(() => import("./pages/ForumPage"));
const ForumTopicPage = lazyWithRetry(() => import("./pages/ForumTopicPage"));
const NotFound = lazyWithRetry(() => import("./pages/NotFound"));
// Information Pages
const AboutPage = lazyWithRetry(() => import("./pages/AboutPage"));
const ContactPage = lazyWithRetry(() => import("./pages/ContactPage"));
const CareersPage = lazyWithRetry(() => import("./pages/CareersPage"));
const AuthorsPage = lazyWithRetry(() => import("./pages/AuthorsPage"));
const DisclaimerPage = lazyWithRetry(() => import("./pages/DisclaimerPage"));
const PrivacyPage = lazyWithRetry(() => import("./pages/PrivacyPage"));
const TermsPage = lazyWithRetry(() => import("./pages/TermsPage"));
// Education Pages
const LearningPage = lazyWithRetry(() => import("./pages/education/LearningPage"));
const LearningCoursePage = lazyWithRetry(() => import("./pages/education/LearningCoursePage"));
const BasicArticlesPage = lazyWithRetry(() => import("./pages/education/BasicArticlesPage"));
const AdvancedArticlesPage = lazyWithRetry(() => import("./pages/education/AdvancedArticlesPage"));
const ArticleDetailPage = lazyWithRetry(() => import("./pages/education/ArticleDetailPage"));
// Course Platform
const CourseListingPage = lazyWithRetry(() => import("./pages/course/CourseListingPage"));
const CoursePlatformPage = lazyWithRetry(() => import("./pages/course/CoursePlatformPage"));
// Auth Pages
const LoginPage = lazyWithRetry(() => import("./pages/auth/LoginPage"));
const RegisterPage = lazyWithRetry(() => import("./pages/auth/RegisterPage"));
const AuthCallbackPage = lazyWithRetry(() => import("./pages/auth/AuthCallbackPage"));
const ForgotPasswordPage = lazyWithRetry(() => import("./pages/auth/ForgotPasswordPage"));
const ResetPasswordPage = lazyWithRetry(() => import("./pages/auth/ResetPasswordPage"));
// Profile
const ProfilePage = lazyWithRetry(() => import("./pages/auth/ProfilePage"));
// Settings
const SettingsPage = lazyWithRetry(() => import("./pages/SettingsPage"));
// Watchlists
const WatchlistPage = lazyWithRetry(() => import("./pages/WatchlistPage"));
// Forum
const CreateDiscussionPage = lazyWithRetry(() => import("./pages/forum/CreateDiscussionPage"));
// Bookmarks
const BookmarksPage = lazyWithRetry(() => import("./pages/BookmarksPage"));
// User Profile
const UserProfilePage = lazyWithRetry(() => import("./pages/users/UserProfilePage"));
// Community
const CommunityPage = lazyWithRetry(() => import("./pages/CommunityPage"));
// Admin
const ModerationPage = lazyWithRetry(() => import("./pages/admin/ModerationPage"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes default
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors (client errors)
        if (error && typeof error === 'object' && 'status' in error) {
          const status = error.status as number;
          if (status >= 400 && status < 500) {
            return false;
          }
        }
        // Retry up to 2 times for other errors
        return failureCount < 2;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
      // Only refetch on window focus if data is stale (more than staleTime old)
      refetchOnWindowFocus: false, // Disabled by default - can be enabled per-query for critical data
      refetchOnReconnect: true, // Refetch when network reconnects (important for recovery)
      // Only refetch on mount if data is stale, not always
      refetchOnMount: false, // Disabled by default - queries will use cached data if fresh
      networkMode: 'online', // Only run queries when online
      // Use placeholderData for better UX during refetch
      // This allows showing cached data while fetching fresh data
      placeholderData: (previousData) => previousData,
    },
    mutations: {
      retry: 1, // Retry mutations once on failure
      networkMode: 'online',
    },
  },
});

const AppContent = () => {
  // Enable route prefetching on link hover
  useRoutePrefetch();

  return (
    <>
      {/* Prefetch critical data for Index page */}
      <PrefetchData />
      <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        {/* Skip to main content link is handled in Layout component */}
        <OfflineIndicator />
        <Suspense fallback={<PageSkeleton />}>
                <ErrorBoundary>
                  <AnimatedRoutesWrapper>
                <Route path="/" element={<Index />} />
                <Route path="/news" element={<NewsPage />} />
                <Route path="/news/:id" element={<NewsDetailPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/analytics/:slug" element={<AnalyticsDetailPage />} />
                <Route path="/markets" element={<MarketsPage />} />
                <Route path="/markets/:type" element={<MarketsPage />} />
                <Route path="/companies" element={<CompaniesPage />} />
                <Route path="/companies/:slug" element={<CompanyDetailPage />} />
                <Route path="/forum" element={<ForumPage />} />
                <Route path="/forum/new" element={<CreateDiscussionPage />} />
                <Route path="/forum/:topicId" element={<ForumTopicPage />} />
                {/* Information Pages */}
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/careers" element={<CareersPage />} />
                <Route path="/authors" element={<AuthorsPage />} />
                <Route path="/disclaimer" element={<DisclaimerPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/terms" element={<TermsPage />} />
                {/* Education Pages */}
                <Route path={educationRoutes.learning} element={<LearningPage />} />
                <Route path={educationRoutes.course} element={<LearningCoursePage />} />
                <Route path={educationRoutes.basicArticles} element={<BasicArticlesPage />} />
                <Route path={educationRoutes.advancedArticles} element={<AdvancedArticlesPage />} />
                <Route path={educationRoutes.article} element={<ArticleDetailPage />} />
                {/* Course Platform */}
                <Route path="/academy" element={<CourseListingPage />} />
                <Route path="/academy/:courseId" element={<CoursePlatformPage />} />
                {/* Auth Routes */}
                <Route path="/auth/login" element={<LoginPage />} />
                <Route path="/auth/register" element={<RegisterPage />} />
                <Route path="/auth/callback" element={<AuthCallbackPage />} />
                <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
                {/* Profile */}
                <Route path="/profile" element={<ProfilePage />} />
                {/* Settings */}
                <Route path="/settings" element={<SettingsPage />} />
                {/* Watchlists */}
                <Route path="/watchlists" element={<WatchlistPage />} />
                {/* Bookmarks */}
                <Route path="/bookmarks" element={<BookmarksPage />} />
                {/* User Profile */}
                <Route path="/users/:userId" element={<UserProfilePage />} />
                {/* Community */}
                <Route path="/community" element={<CommunityPage />} />
                {/* Admin */}
                <Route path="/admin/moderation" element={<ModerationPage />} />
                <Route path="*" element={<NotFound />} />
                  </AnimatedRoutesWrapper>
                </ErrorBoundary>
              </Suspense>
            </BrowserRouter>
            <NotificationManager />
            <CookieConsentBanner />
            <Analytics />
            <SpeedInsights />
        </TooltipProvider>
      </>
  );
};

const App = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <I18nProvider>
            <AppContent />
          </I18nProvider>
        </UserProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
