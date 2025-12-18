import { useRef, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Layout } from '@/components/layout/Layout';
import { fetchTopicById, ForumTopic } from '@/lib/api/index';
import { useForumComments } from '@/hooks/useForumComments';
import { useReactionCounts } from '@/hooks/useReactionCounts';
import { SkeletonCard } from '@/components/ui/skeleton-card';
import { ReplyEditor } from '@/components/forum/ReplyEditor';
import { ReactionButton } from '@/components/forum/ReactionButton';
import { ReportButton } from '@/components/forum/ReportButton';
import { SEOHead } from '@/components/seo/SEOHead';
import { StructuredData } from '@/components/seo/StructuredData';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { MarkdownContent } from '@/components/content/MarkdownContent';
import { generateOrganizationSchema } from '@/utils/structuredData';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { MessageCircle, Calendar, Award, Star, Bookmark, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useDiscussionActions } from '@/hooks/useDiscussionActions';
import { AssetBadge } from '@/components/forum/AssetBadge';
import { checkRateLimit } from '@/lib/api/rateLimit';

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
  const queryClient = useQueryClient();
  const [submittingReply, setSubmittingReply] = useState(false);
  const replyEditorRef = useRef<HTMLDivElement | null>(null);
  const {
    isBookmarked,
    isFollowing,
    bookmarkLoading,
    followLoading,
    toggleBookmark,
    toggleFollow,
  } = useDiscussionActions(topicId);

  // Load topic with React Query
  const { data: topic, isLoading: topicLoading } = useQuery<ForumTopic | null, Error>({
    queryKey: ['forumTopic', topicId],
    queryFn: () => topicId ? fetchTopicById(topicId) : null,
    enabled: !!topicId,
    staleTime: 30 * 1000, // 30 seconds - topic details update frequently
    gcTime: 5 * 60 * 1000, // 5 minutes
  });

  // Load comments with React Query
  const { data: comments = [], isLoading: commentsLoading } = useForumComments({
    topicId: topicId || '',
    enabled: !!topicId,
  });

  // Get comment IDs for reaction counts
  const commentIds = useMemo(() => comments.map(c => c.id), [comments]);
  
  // Load reaction counts for topic and comments
  const { data: topicReactions = {} } = useReactionCounts(
    topicId ? [topicId] : [], 
    'discussion'
  );
  const { data: commentReactions = {} } = useReactionCounts(commentIds, 'reply');

  const loading = topicLoading || commentsLoading;

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

    // Check rate limit
    const rateLimitCheck = await checkRateLimit('create_reply', 20, 60);
    if (!rateLimitCheck.allowed) {
      toast.error(rateLimitCheck.message || 'Rate limit exceeded. Please wait before posting another reply.');
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

      // Invalidate cache to refresh comments and update reply count
      queryClient.invalidateQueries({ queryKey: ['forumComments', topicId] });
      queryClient.invalidateQueries({ queryKey: ['forumTopic', topicId] });
      queryClient.invalidateQueries({ queryKey: ['forumTopics'] });
      
      toast.success('Reply posted');
    } catch (error: any) {
      toast.error(error.message || 'Failed to post reply');
    } finally {
      setSubmittingReply(false);
    }
  };

  const handleScrollToReply = () => {
    replyEditorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
            Back to forum
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
        <div className="container-wide py-10 md:py-16">
          {topic && <Breadcrumbs pageTitle={topic.title} />}

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
            <div className="flex-1 min-w-0">
              <h1 className="heading-md mb-2">{topic.title}</h1>
              {topic.symbol && (
                <div className="flex items-center gap-2">
                  <AssetBadge symbol={topic.symbol} assetType={topic.asset_type} />
                </div>
              )}
            </div>
            <div className="flex flex-wrap md:flex-nowrap items-center justify-start md:justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleBookmark}
                disabled={bookmarkLoading}
                aria-label={isBookmarked ? 'Remove bookmark from discussion' : 'Bookmark this discussion'}
                className={cn(isBookmarked && 'bg-primary/10')}
              >
                <Bookmark className={cn('h-4 w-4 mr-2', isBookmarked && 'fill-current')} />
                {bookmarkLoading ? 'Saving…' : isBookmarked ? 'Bookmarked' : 'Bookmark'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={toggleFollow}
                disabled={followLoading}
                aria-label={isFollowing ? 'Unfollow discussion' : 'Follow discussion'}
                className={cn(isFollowing && 'bg-primary/10')}
              >
                {followLoading ? 'Saving…' : isFollowing ? 'Following' : 'Follow'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                aria-label="Share discussion link"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <ReportButton
                contentType="discussion"
                contentId={topicId!}
              />
            </div>
          </div>

          <div className="mt-2">
            <Button size="sm" onClick={handleScrollToReply}>
              Post reply
            </Button>
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
                <MarkdownContent content={topic.content} className="text-foreground leading-relaxed" />
              </div>
              
              {/* Topic Reactions */}
              <div className="flex items-center gap-2 flex-wrap pt-4 border-t border-border/60">
                <ReactionButton
                  contentType="discussion"
                  contentId={topic.id}
                  reactionType="like"
                  count={topicReactions[topic.id]?.like ?? 0}
                />
                <ReactionButton
                  contentType="discussion"
                  contentId={topic.id}
                  reactionType="dislike"
                  count={topicReactions[topic.id]?.dislike ?? 0}
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
              const reputation = comment.authorReputation ?? 0;
              const level = reputation > 0 ? getUserLevel(reputation) : null;
              
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
                        </div>
                        <div className="md:mt-2 text-center md:text-left">
                          <Link to={`/users/${comment.authorId || 'unknown'}`} className="font-medium block hover:text-primary transition-colors">
                            {comment.author}
                          </Link>
                          {level && (
                            <span className={cn('inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full mt-1', level.color)}>
                              {level.name === 'Guru' && <Star className="h-3 w-3" />}
                              {level.name === 'Expert' && <Award className="h-3 w-3" />}
                              {level.name}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-4 md:p-6">
                      <div className="flex items-center justify-between mb-4 text-xs text-muted-foreground">
                        <span>{new Date(comment.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      </div>
                      
                      <MarkdownContent content={comment.content} className="text-foreground leading-relaxed mb-6" />
                      
                      {/* Actions */}
                      <div className="flex items-center gap-2 flex-wrap pt-4 border-t border-border/60">
                        <ReactionButton
                          contentType="reply"
                          contentId={comment.id}
                          reactionType="like"
                          count={commentReactions[comment.id]?.like ?? 0}
                        />
                        <ReactionButton
                          contentType="reply"
                          contentId={comment.id}
                          reactionType="dislike"
                          count={commentReactions[comment.id]?.dislike ?? 0}
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
            <div
              ref={replyEditorRef}
              className="mt-8 md:mt-12 p-6 md:p-8 rounded-xl border border-border/60 bg-card"
            >
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