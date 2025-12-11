import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "@/context/UserContext";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import Index from "./pages/Index";
import NewsPage from "./pages/NewsPage";
import NewsDetailPage from "./pages/NewsDetailPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import AnalyticsDetailPage from "./pages/AnalyticsDetailPage";
import MarketsPage from "./pages/MarketsPage";
import CompaniesPage from "./pages/CompaniesPage";
import CompanyDetailPage from "./pages/CompanyDetailPage";
import ForumPage from "./pages/ForumPage";
import ForumTopicPage from "./pages/ForumTopicPage";
import NotFound from "./pages/NotFound";
// Information Pages
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import CareersPage from "./pages/CareersPage";
import PartnershipsPage from "./pages/PartnershipsPage";
import AuthorsPage from "./pages/AuthorsPage";
import TopicsPage from "./pages/TopicsPage";
import EventsPage from "./pages/EventsPage";
import DisclaimerPage from "./pages/DisclaimerPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
// Video Pages
import VideoLibraryPage from "./pages/video/VideoLibraryPage";
import VideoDetailPage from "./pages/video/VideoDetailPage";
// Education Pages
import BasicArticlesPage from "./pages/education/BasicArticlesPage";
import AdvancedArticlesPage from "./pages/education/AdvancedArticlesPage";
import LearningCoursePage from "./pages/education/LearningCoursePage";
// Course Platform
import CoursePlatformPage from "./pages/course/CoursePlatformPage";
// Auth Pages
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import AuthCallbackPage from "./pages/auth/AuthCallbackPage";
// Profile
import ProfilePage from "./pages/auth/ProfilePage";
// Settings
import SettingsPage from "./pages/SettingsPage";
// Watchlists
import WatchlistPage from "./pages/WatchlistPage";
// Forum
import CreateDiscussionPage from "./pages/forum/CreateDiscussionPage";
// Bookmarks
import BookmarksPage from "./pages/BookmarksPage";
// User Profile
import UserProfilePage from "./pages/users/UserProfilePage";
// Community
import CommunityPage from "./pages/CommunityPage";
// Admin
import ModerationPage from "./pages/admin/ModerationPage";
// Collections
import CollectionDetailPage from "./pages/collections/CollectionDetailPage";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
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
              <Route path="/partnerships" element={<PartnershipsPage />} />
              <Route path="/authors" element={<AuthorsPage />} />
              <Route path="/topics" element={<TopicsPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/disclaimer" element={<DisclaimerPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              {/* Video Pages */}
              <Route path="/video/:videoId" element={<VideoDetailPage />} />
              {/* Education Pages */}
              <Route path="/education/basic" element={<BasicArticlesPage />} />
              <Route path="/education/advanced" element={<AdvancedArticlesPage />} />
              <Route path="/education/course" element={<LearningCoursePage />} />
              <Route path="/education/video" element={<VideoLibraryPage />} />
              {/* Course Platform */}
              <Route path="/course" element={<CoursePlatformPage />} />
              {/* Auth Routes */}
              <Route path="/auth/login" element={<LoginPage />} />
              <Route path="/auth/register" element={<RegisterPage />} />
              <Route path="/auth/callback" element={<AuthCallbackPage />} />
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
          </BrowserRouter>
        </TooltipProvider>
      </UserProvider>
    </QueryClientProvider>
  );
};

export default App;
