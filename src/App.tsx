import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import AdvertisePage from "./pages/AdvertisePage";
import AuthorsPage from "./pages/AuthorsPage";
import TopicsPage from "./pages/TopicsPage";
import EventsPage from "./pages/EventsPage";
import DisclaimerPage from "./pages/DisclaimerPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
// Video Pages
import PodcastsPage from "./pages/video/PodcastsPage";
// Education Pages
import BasicArticlesPage from "./pages/education/BasicArticlesPage";
import AdvancedArticlesPage from "./pages/education/AdvancedArticlesPage";
import LearningCoursePage from "./pages/education/LearningCoursePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
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
          <Route path="/forum/:topicId" element={<ForumTopicPage />} />
          {/* Information Pages */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/partnerships" element={<PartnershipsPage />} />
          <Route path="/advertise" element={<AdvertisePage />} />
          <Route path="/authors" element={<AuthorsPage />} />
          <Route path="/topics" element={<TopicsPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/disclaimer" element={<DisclaimerPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
{/* Video Pages */}
          <Route path="/video/podcasts" element={<PodcastsPage />} />
          {/* Education Pages */}
          <Route path="/education/basic" element={<BasicArticlesPage />} />
          <Route path="/education/advanced" element={<AdvancedArticlesPage />} />
          <Route path="/education/course" element={<LearningCoursePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
