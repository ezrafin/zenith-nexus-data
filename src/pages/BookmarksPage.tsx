import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/integrations/supabase/client';
import { SkeletonCard } from '@/components/ui/skeleton-card';
import { Bookmark, Newspaper, MessageSquare, FileText, Video, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface BookmarkItem {
  id: string;
  content_type: string;
  content_id: string;
  created_at: string;
  title?: string;
  subtitle?: string;
}

export default function BookmarksPage() {
  const { user } = useUser();
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>('all');

  useEffect(() => {
    if (user) {
      loadBookmarks();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadBookmarks = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_bookmarks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Fetch additional data for each bookmark
      const bookmarksWithData = await Promise.all(
        (data || []).map(async (bookmark) => {
          let title = '';
          let subtitle = '';

          try {
            if (bookmark.content_type === 'forum') {
              const { data: forumData } = await supabase
                .from('forum_discussions')
                .select('title, category')
                .eq('id', bookmark.content_id)
                .single();
              if (forumData) {
                title = forumData.title;
                subtitle = forumData.category;
              }
            } else if (bookmark.content_type === 'article' || bookmark.content_type === 'news') {
              const { data: newsData } = await supabase
                .from('news_articles')
                .select('title, source_name')
                .eq('id', bookmark.content_id)
                .single();
              if (newsData) {
                title = newsData.title;
                subtitle = newsData.source_name;
              }
            }
          } catch (error) {
            console.error(`Error loading ${bookmark.content_type} data:`, error);
          }

          return {
            ...bookmark,
            title,
            subtitle,
          };
        })
      );

      setBookmarks(bookmarksWithData as BookmarkItem[]);
    } catch (error) {
      console.error('Error loading bookmarks:', error);
      toast.error('Failed to load bookmarks');
    } finally {
      setLoading(false);
    }
  };

  const deleteBookmark = async (id: string) => {
    try {
      const { error } = await supabase
        .from('user_bookmarks')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setBookmarks(bookmarks.filter((b) => b.id !== id));
      toast.success('Bookmark removed');
    } catch (error) {
      toast.error('Failed to remove bookmark');
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'article':
      case 'news':
        return <Newspaper className="h-5 w-5" />;
      case 'forum':
        return <MessageSquare className="h-5 w-5" />;
      case 'video':
        return <Video className="h-5 w-5" />;
      case 'analytics':
        return <FileText className="h-5 w-5" />;
      default:
        return <Bookmark className="h-5 w-5" />;
    }
  };

  const getLink = (bookmark: BookmarkItem) => {
    switch (bookmark.content_type) {
      case 'forum':
        return `/forum/${bookmark.content_id}`;
      case 'article':
      case 'news':
        return `/news/${bookmark.content_id}`;
      case 'video':
        return `/video/${bookmark.content_id}`;
      case 'analytics':
        return `/analytics/${bookmark.content_id}`;
      default:
        return '#';
    }
  };

  const filteredBookmarks = activeTab === 'all'
    ? bookmarks
    : bookmarks.filter((b) => b.content_type === activeTab);

  if (!user) {
    return (
      <Layout>
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="heading-lg mb-4">Please sign in</h1>
            <p className="text-muted-foreground mb-6">You need to be signed in to view your bookmarks.</p>
            <Link to="/auth/login">
              <Button>Sign in</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="section-spacing">
        <div className="container-wide max-w-4xl">
          <h1 className="heading-lg mb-8">My Bookmarks</h1>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="forum">Forum</TabsTrigger>
              <TabsTrigger value="article">Articles</TabsTrigger>
              <TabsTrigger value="video">Videos</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            {loading ? (
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <SkeletonCard key={i} lines={2} />
                ))}
              </div>
            ) : filteredBookmarks.length === 0 ? (
              <div className="premium-card p-12 text-center">
                <Bookmark className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">No bookmarks yet</h3>
                <p className="text-muted-foreground">
                  {activeTab === 'all'
                    ? 'Start bookmarking content to save it for later'
                    : `No ${activeTab} bookmarks yet`}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredBookmarks.map((bookmark) => (
                  <div
                    key={bookmark.id}
                    className="premium-card p-4 flex items-center justify-between hover:border-primary/30 transition-colors"
                  >
                    <Link to={getLink(bookmark)} className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                        {getIcon(bookmark.content_type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">{bookmark.title || 'Untitled'}</h3>
                        {bookmark.subtitle && (
                          <p className="text-sm text-muted-foreground truncate">{bookmark.subtitle}</p>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(bookmark.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.preventDefault();
                        deleteBookmark(bookmark.id);
                      }}
                      className="text-destructive hover:text-destructive flex-shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}

