import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "@/context/UserContext";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { educationRoutes } from "@/lib/educationRoutes";

// Eager load critical pages
import Index from "./pages/Index";

// Lazy load other pages for better performance
const NewsPage = lazy(() => import("./pages/NewsPage"));
const NewsDetailPage = lazy(() => import("./pages/NewsDetailPage"));
const AnalyticsPage = lazy(() => import("./pages/AnalyticsPage"));
const AnalyticsDetailPage = lazy(() => import("./pages/AnalyticsDetailPage"));
const MarketsPage = lazy(() => import("./pages/MarketsPage"));
const CompaniesPage = lazy(() => import("./pages/CompaniesPage"));
const CompanyDetailPage = lazy(() => import("./pages/CompanyDetailPage"));
const ForumPage = lazy(() => import("./pages/ForumPage"));
const ForumTopicPage = lazy(() => import("./pages/ForumTopicPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
// Information Pages
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const CareersPage = lazy(() => import("./pages/CareersPage"));
const AuthorsPage = lazy(() => import("./pages/AuthorsPage"));
const TopicsPage = lazy(() => import("./pages/TopicsPage"));
const EventsPage = lazy(() => import("./pages/EventsPage"));
const DisclaimerPage = lazy(() => import("./pages/DisclaimerPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const TermsPage = lazy(() => import("./pages/TermsPage"));
// Video Pages
const VideoLibraryPage = lazy(() => import("./pages/video/VideoLibraryPage"));
const VideoDetailPage = lazy(() => import("./pages/video/VideoDetailPage"));
// Education Pages
const LearningPage = lazy(() => import("./pages/education/LearningPage"));
const LearningCoursePage = lazy(() => import("./pages/education/LearningCoursePage"));
const BasicArticlesPage = lazy(() => import("./pages/education/BasicArticlesPage"));
const AdvancedArticlesPage = lazy(() => import("./pages/education/AdvancedArticlesPage"));
// Course Platform
const CoursePlatformPage = lazy(() => import("./pages/course/CoursePlatformPage"));
// Auth Pages
const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("./pages/auth/RegisterPage"));
const AuthCallbackPage = lazy(() => import("./pages/auth/AuthCallbackPage"));
const ForgotPasswordPage = lazy(() => import("./pages/auth/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("./pages/auth/ResetPasswordPage"));
// Profile
const ProfilePage = lazy(() => import("./pages/auth/ProfilePage"));
// Settings
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
// Watchlists
const WatchlistPage = lazy(() => import("./pages/WatchlistPage"));
// Forum
const CreateDiscussionPage = lazy(() => import("./pages/forum/CreateDiscussionPage"));
// Bookmarks
const BookmarksPage = lazy(() => import("./pages/BookmarksPage"));
// User Profile
const UserProfilePage = lazy(() => import("./pages/users/UserProfilePage"));
// Community
const CommunityPage = lazy(() => import("./pages/CommunityPage"));
// Admin
const ModerationPage = lazy(() => import("./pages/admin/ModerationPage"));
// Collections
const CollectionDetailPage = lazy(() => import("./pages/collections/CollectionDetailPage"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<LoadingScreen />}>
              <Routes>
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
                <Route path="/topics" element={<TopicsPage />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/disclaimer" element={<DisclaimerPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/terms" element={<TermsPage />} />
                {/* Video Pages */}
                <Route path="/video/:videoId" element={<VideoDetailPage />} />
                {/* Education Pages */}
                <Route path={educationRoutes.learning} element={<LearningPage />} />
                <Route path={educationRoutes.course} element={<LearningCoursePage />} />
                <Route path={educationRoutes.video} element={<VideoLibraryPage />} />
                <Route path={educationRoutes.basicArticles} element={<BasicArticlesPage />} />
                <Route path={educationRoutes.advancedArticles} element={<AdvancedArticlesPage />} />
                {/* Course Platform */}
                <Route path="/course" element={<CoursePlatformPage />} />
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
                {/* Collections */}
                <Route path="/collections/:id" element={<CollectionDetailPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </UserProvider>
    </QueryClientProvider>
  );
};

export default App;
