import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { fetchTopicById, fetchForumComments, ForumTopic, ForumComment } from '@/lib/api/index';
import { SkeletonCard } from '@/components/ui/skeleton-card';
import { ReplyEditor } from '@/components/forum/ReplyEditor';
import { ReactionButton } from '@/components/forum/ReactionButton';
import { ReportButton } from '@/components/forum/ReportButton';
import { UserAvatar } from '@/components/user/UserAvatar';
import { SEOHead } from '@/components/seo/SEOHead';
import { StructuredData } from '@/components/seo/StructuredData';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { generateOrganizationSchema } from '@/utils/structuredData';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { MessageCircle, Calendar, Award, Star, Bookmark, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const userLevels = [
  { min: 0, name: 'Newbie', color: 'bg-muted text-muted-foreground' },
  { min: 10, name: 'Member', color: 'bg-blue-100 text-blue-700' },
  { min: 50, name: 'Active', color: 'bg-green-100 text-green-700' },
  { min: 100, name: 'Expert', color: 'bg-purple-100 text-purple-700' },
  { min: 500, name: 'Guru', color: 'bg-amber-100 text-amber-700' },
];

function getUserLevel(rating: number) {
  return userLevels.reduce((acc, level) => (rating >= level.min ? level : acc), userLevels[0]);
}

export default function ForumTopicPage() {
  const { topicId } = useParams();
  const { user, profile } = useUser();
  const [topic, setTopic] = useState<ForumTopic | null>(null);
  const [comments, setComments] = useState<ForumComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [submittingReply, setSubmittingReply] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (topicId) {
        try {
          const [topicData, commentsData] = await Promise.all([
            fetchTopicById(topicId),
            fetchForumComments(topicId),
          ]);
          setTopic(topicData);
          setComments(commentsData);
        } catch (error) {
          console.error('Error loading topic:', error);
        } finally {
          setLoading(false);
        }
      }
    }

    loadData();
    checkBookmarkStatus();
    checkFollowStatus();
  }, [topicId, user]);

  const checkBookmarkStatus = async () => {
    if (!user || !topicId) return;
    const { data } = await supabase
      .from('user_bookmarks')
      .select('id')
      .eq('user_id', user.id)
      .eq('content_type', 'discussion')
      .eq('content_id', topicId)
      .maybeSingle();
    setIsBookmarked(!!data);
  };

  const checkFollowStatus = async () => {
    if (!user || !topicId) return;
    const { data } = await (supabase as any)
      .from('forum_follows')
      .select('id')
      .eq('user_id', user.id)
      .eq('discussion_id', topicId)
      .maybeSingle();
    setIsFollowing(!!data);
  };

  const toggleBookmark = async () => {
    if (!user || !topicId) {
      toast.error('Please sign in to bookmark discussions');
      return;
    }
    if (isBookmarked) {
      await supabase.from('user_bookmarks').delete()
        .eq('user_id', user.id)
        .eq('content_type', 'discussion')
        .eq('content_id', topicId);
      setIsBookmarked(false);
      toast.success('Removed from bookmarks');
    } else {
      await supabase.from('user_bookmarks').insert({
        user_id: user.id,
        content_type: 'discussion',
        content_id: topicId
      });
      setIsBookmarked(true);
      toast.success('Added to bookmarks');
    }
  };

  const toggleFollow = async () => {
    if (!user || !topicId) {
      toast.error('Please sign in to follow discussions');
      return;
    }
    if (isFollowing) {
      await (supabase as any).from('forum_follows').delete()
        .eq('user_id', user.id)
        .eq('discussion_id', topicId);
      setIsFollowing(false);
      toast.success('Unfollowed discussion');
    } else {
      await (supabase as any).from('forum_follows').insert({
        user_id: user.id,
        discussion_id: topicId
      });
      setIsFollowing(true);
      toast.success('Following discussion');
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard');
    } catch {
      toast.error('Failed to copy link');
    }
  };

  const handleReplySubmit = async (content: string) => {
    if (!user || !topicId) {
      toast.error('Please sign in to reply');
      return;
    }

    setSubmittingReply(true);
    try {
      const { error } = await supabase
        .from('forum_replies')
        .insert({
          discussion_id: topicId,
          content,
          author_name: profile?.display_name || user.email || 'Anonymous',
          user_id: user.id,
        });

      if (error) throw error;

      // Refresh comments
      const commentsData = await fetchForumComments(topicId);
      setComments(commentsData);
      toast.success('Reply posted');
    } catch (error: any) {
      toast.error(error.message || 'Failed to post reply');
    } finally {
      setSubmittingReply(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container-wide section-spacing">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-3/4 bg-muted rounded" />
            <div className="h-4 w-1/2 bg-muted rounded" />
            <div className="space-y-4 mt-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <SkeletonCard key={i} lines={4} />
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!topic) {
    return (
      <Layout>
        <div className="container-narrow section-spacing text-center">
          <h1 className="heading-lg mb-4">Topic not found</h1>
          <Link to="/forum" className="text-primary hover:underline">
            Return to forum
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {topic && (
        <>
          <SEOHead
            title={topic.title}
            description={topic.content?.substring(0, 160) || `Discussion about ${topic.title}`}
            type="article"
            noindex={false}
          />
          <StructuredData data={[generateOrganizationSchema()]} />
        </>
      )}
      {/* Header */}
      <section className="border-b border-border">
        <div className="container-wide py-12 md:py-16">
          {topic && <Breadcrumbs pageTitle={topic.title} />}

          <div className="flex items-start justify-between gap-4 mb-6">
            <h1 className="heading-md flex-1">{topic.title}</h1>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleBookmark}
                className={cn(isBookmarked && 'bg-primary/10')}
              >
                <Bookmark className={cn('h-4 w-4 mr-2', isBookmarked && 'fill-current')} />
                {isBookmarked ? 'Bookmarked' : 'Bookmark'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={toggleFollow}
                className={cn(isFollowing && 'bg-primary/10')}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <ReportButton
                contentType="discussion"
                contentId={topicId!}
              />
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <Link to={`/users/${topic.authorId || 'unknown'}`} className="flex items-center gap-3 hover:text-primary transition-colors">
              <img
                src={topic.authorAvatar}
                alt={topic.author}
                className="w-8 h-8 rounded-full ring-2 ring-border"
              />
              <span className="font-medium text-foreground">{topic.author}</span>
            </Link>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {new Date(topic.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-1.5">
              <MessageCircle className="h-4 w-4" />
              {topic.replies} replies
            </span>
          </div>
        </div>
      </section>

      {/* Topic Content */}
      {topic.content && (
        <section className="section-spacing-sm border-b border-border">
          <div className="container-wide">
            <article className="premium-card p-6 md:p-8">
              <div className="prose prose-invert max-w-none mb-6">
                <p className="text-foreground leading-relaxed whitespace-pre-wrap">{topic.content}</p>
              </div>
              
              {/* Topic Reactions */}
              <div className="flex items-center gap-2 flex-wrap pt-4 border-t border-border/60">
                <ReactionButton
                  contentType="discussion"
                  contentId={topic.id}
                  reactionType="like"
                  count={topic.like_count || 0}
                />
                <ReactionButton
                  contentType="discussion"
                  contentId={topic.id}
                  reactionType="helpful"
                />
                <ReactionButton
                  contentType="discussion"
                  contentId={topic.id}
                  reactionType="insightful"
                />
              </div>
            </article>
          </div>
        </section>
      )}

      {/* Comments */}
      <section className="section-spacing-sm">
        <div className="container-wide">
          <div className="space-y-4 md:space-y-6">
            {comments.map((comment, index) => {
              const level = getUserLevel(comment.rating);
              const mockReputation = Math.floor(Math.random() * 500) + comment.rating;
              
              return (
                <article
                  key={comment.id}
                  className="rounded-xl border border-border/60 bg-card overflow-hidden animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Author sidebar */}
                    <div className="md:w-48 p-4 md:p-6 bg-secondary/30 border-b md:border-b-0 md:border-r border-border/60">
                      <div className="flex md:flex-col items-center md:items-start gap-4">
                        <div className="relative">
                          <img
                            src={comment.authorAvatar}
                            alt={comment.author}
                            className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-muted ring-2 ring-background"
                          />
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center ring-2 ring-background">
                            {Math.floor(mockReputation / 100) + 1}
                          </div>
                        </div>
                        <div className="md:mt-2 text-center md:text-left">
                          <Link to={`/users/${comment.authorId || 'unknown'}`} className="font-medium block hover:text-primary transition-colors">
                            {comment.author}
                          </Link>
                          <span className={cn('inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full mt-1', level.color)}>
                            {level.name === 'Guru' && <Star className="h-3 w-3" />}
                            {level.name === 'Expert' && <Award className="h-3 w-3" />}
                            {level.name}
                          </span>
                          <div className="text-xs text-muted-foreground mt-2 hidden md:block">
                            <div>Reputation: {mockReputation}</div>
                            <div>Posts: {Math.floor(Math.random() * 200) + 10}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-4 md:p-6">
                      <div className="flex items-center justify-between mb-4 text-xs text-muted-foreground">
                        <span>{new Date(comment.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      </div>
                      
                      <p className="text-foreground leading-relaxed mb-6">
                        {comment.content}
                      </p>
                      
                      {/* Actions */}
                      <div className="flex items-center gap-2 flex-wrap pt-4 border-t border-border/60">
                        <ReactionButton
                          contentType="reply"
                          contentId={comment.id}
                          reactionType="like"
                          count={comment.rating}
                        />
                        <ReactionButton
                          contentType="reply"
                          contentId={comment.id}
                          reactionType="helpful"
                        />
                        <ReactionButton
                          contentType="reply"
                          contentId={comment.id}
                          reactionType="insightful"
                        />
                        <ReportButton
                          contentType="reply"
                          contentId={comment.id}
                          className="ml-auto"
                        />
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Reply Form */}
          {user ? (
            <div className="mt-8 md:mt-12 p-6 md:p-8 rounded-xl border border-border/60 bg-card">
              <h3 className="font-heading font-medium text-lg mb-4">Write a Reply</h3>
              <ReplyEditor
                onSubmit={handleReplySubmit}
                isSubmitting={submittingReply}
                placeholder="Share your thoughts... (Markdown supported)"
              />
            </div>
          ) : (
            <div className="mt-8 md:mt-12 p-6 md:p-8 rounded-xl border border-border/60 bg-card text-center">
              <p className="text-muted-foreground mb-4">Please sign in to reply to this discussion</p>
              <Link to="/auth/login">
                <Button>Sign in</Button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}