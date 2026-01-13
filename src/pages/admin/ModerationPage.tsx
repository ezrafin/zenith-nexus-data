import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SkeletonCard } from '@/components/ui/skeleton-card';
import { Shield, Trash2, Lock, Pin, CheckCircle, XCircle, MessageCircle, Star, MessageSquare, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslation } from '@/hooks/useTranslation';
import { formatRelativeTime } from '@/lib/utils/date';

interface Report {
  id: string;
  target_type: string;
  target_id: string;
  reason: string;
  description: string | null;
  status: string;
  created_at: string;
  user_id: string;
}

interface PendingDiscussion {
  id: string;
  title: string;
  content: string;
  author_name: string;
  category: string;
  tags: string[] | null;
  symbol: string | null;
  asset_type: string | null;
  created_at: string;
  user_id: string | null;
  is_featured: boolean;
  is_pinned: boolean;
}

interface PendingReply {
  id: string;
  discussion_id: string;
  content: string;
  author_name: string;
  created_at: string;
  user_id: string | null;
  is_approved: boolean;
  discussion_title?: string;
}

interface PendingEvaluation {
  id: string;
  user_id: string;
  company_slug: string;
  rating: number;
  comment: string | null;
  created_at: string;
  is_approved: boolean;
  user_name?: string;
}

// Admin email - only this user can access moderation
const ADMIN_EMAIL = 'mark.lindt.finance@gmail.com';

export default function ModerationPage() {
  const { user } = useUser();
  const { t, language } = useTranslation({ namespace: 'ui' });
  const [reports, setReports] = useState<Report[]>([]);
  const [pendingDiscussions, setPendingDiscussions] = useState<PendingDiscussion[]>([]);
  const [pendingReplies, setPendingReplies] = useState<PendingReply[]>([]);
  const [pendingEvaluations, setPendingEvaluations] = useState<PendingEvaluation[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingDiscussions, setLoadingDiscussions] = useState(false);
  const [loadingReplies, setLoadingReplies] = useState(false);
  const [loadingEvaluations, setLoadingEvaluations] = useState(false);
  const [approvingAllDiscussions, setApprovingAllDiscussions] = useState(false);
  const [approvingAllReplies, setApprovingAllReplies] = useState(false);
  const [approvingAllEvaluations, setApprovingAllEvaluations] = useState(false);
  const [activeTab, setActiveTab] = useState<'discussions' | 'replies' | 'evaluations' | 'reports'>('discussions');
  const [reportsTab, setReportsTab] = useState<'pending' | 'all'>('pending');

  // Check if current user is admin
  const isAdmin = user?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  useEffect(() => {
    if (user && isAdmin) {
      if (activeTab === 'reports') {
        loadReports();
      } else if (activeTab === 'discussions') {
        loadPendingDiscussions();
      } else if (activeTab === 'replies') {
        loadPendingReplies();
      } else if (activeTab === 'evaluations') {
        loadPendingEvaluations();
      }
    } else {
      setLoading(false);
    }
  }, [user, isAdmin, activeTab, reportsTab]);

  const loadReports = async () => {
    setLoading(true);
    try {
      const query = supabase
        .from('forum_reports')
        .select('*')
        .order('created_at', { ascending: false });

      if (reportsTab === 'pending') {
        query.eq('status', 'pending');
      }

      const { data, error } = await query;

      if (error) throw error;
      setReports((data || []) as Report[]);
    } catch (error) {
      console.error('Error loading reports:', error);
      toast.error(t('toast.failedToLoadReports'));
    } finally {
      setLoading(false);
    }
  };

  const loadPendingDiscussions = async () => {
    setLoadingDiscussions(true);
    try {
      // Load discussions that are pending moderation (is_featured = false means not approved yet)
      const { data, error } = await supabase
        .from('forum_discussions')
        .select('*')
        .eq('is_featured', false)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPendingDiscussions((data || []) as unknown as PendingDiscussion[]);
    } catch (error) {
      console.error('Error loading pending discussions:', error);
      toast.error(t('toast.failedToLoadPendingDiscussions'));
    } finally {
      setLoadingDiscussions(false);
    }
  };

  const loadPendingReplies = async () => {
    setLoadingReplies(true);
    try {
      // Load replies that are not approved
      const { data, error } = await supabase
        .from('forum_replies')
        .select('*')
        .eq('is_approved', false)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Get discussion titles for each reply
      const repliesWithTitles = await Promise.all(
        (data || []).map(async (reply: any) => {
          const { data: discussion } = await supabase
            .from('forum_discussions')
            .select('title')
            .eq('id', reply.discussion_id)
            .single();
          return {
            ...reply,
            discussion_title: discussion?.title || 'Unknown Discussion',
          };
        })
      );

      setPendingReplies(repliesWithTitles as PendingReply[]);
    } catch (error) {
      console.error('Error loading pending replies:', error);
      toast.error(t('toast.failedToLoadPendingReplies'));
    } finally {
      setLoadingReplies(false);
    }
  };

  const loadPendingEvaluations = async () => {
    setLoadingEvaluations(true);
    try {
      // Load evaluations that are not approved (with comments only)
      const { data, error } = await supabase
        .from('company_evaluations')
        .select('*')
        .eq('is_approved', false)
        .not('comment', 'is', null)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Get user names for each evaluation - include username as fallback
      const userIds = [...new Set((data || []).map((e: any) => e.user_id))];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, display_name, username')
        .in('id', userIds);

      const profileMap = new Map((profiles || []).map(p => [
        p.id, 
        p.display_name || p.username || 'Anonymous'
      ]));

      const evaluationsWithNames = (data || []).map((evaluation: any) => ({
        ...evaluation,
        user_name: profileMap.get(evaluation.user_id) || 'Anonymous',
      }));

      setPendingEvaluations(evaluationsWithNames as PendingEvaluation[]);
    } catch (error) {
      console.error('Error loading pending evaluations:', error);
      toast.error(t('toast.failedToLoadPendingEvaluations'));
    } finally {
      setLoadingEvaluations(false);
    }
  };

  const handleDiscussionModeration = async (discussionId: string, action: 'approve' | 'reject') => {
    try {
      if (action === 'approve') {
        // Mark as approved: set is_featured to true
        const { data, error } = await supabase
          .from('forum_discussions')
          .update({ is_featured: true })
          .eq('id', discussionId)
          .select(); // Select to verify update succeeded
        
        if (error) throw error;
        
        // Check if update actually affected any rows
        if (!data || data.length === 0) {
          throw new Error('Update failed: No rows affected. Check RLS policies.');
        }
        
        // Only update UI if update was successful
        setPendingDiscussions(prev => prev.filter(d => d.id !== discussionId));
        
        toast.success(t('toast.discussionApproved'));
        
        // Don't reload immediately - rely on optimistic update
        // Only reload if there's a concern about consistency
      } else {
        // Reject: delete the discussion
        const { error } = await supabase
          .from('forum_discussions')
          .delete()
          .eq('id', discussionId);
        
        if (error) throw error;
        
        // Only update UI if delete was successful
        setPendingDiscussions(prev => prev.filter(d => d.id !== discussionId));
        
        toast.success(t('toast.discussionRejectedDeleted'));
      }
    } catch (error: any) {
      console.error('Moderation error:', error);
      toast.error(error.message || t('toast.failedToUpdateDiscussion'));
      // Reload on error to restore correct state
      loadPendingDiscussions();
    }
  };

  const handleReplyModeration = async (replyId: string, action: 'approve' | 'reject') => {
    try {
      if (action === 'approve') {
        // Mark as approved
        const { data, error } = await supabase
          .from('forum_replies')
          .update({ is_approved: true })
          .eq('id', replyId)
          .select(); // Select to verify update succeeded
        
        if (error) throw error;
        
        // Check if update actually affected any rows
        if (!data || data.length === 0) {
          throw new Error('Update failed: No rows affected. Check RLS policies.');
        }
        
        // Only update UI if update was successful
        setPendingReplies(prev => prev.filter(r => r.id !== replyId));
        
        toast.success(t('toast.replyApproved'));
      } else {
        // Mark as rejected: set is_approved to false
        const { data, error } = await supabase
          .from('forum_replies')
          .update({ is_approved: false })
          .eq('id', replyId)
          .select(); // Select to verify update succeeded
        
        if (error) throw error;
        
        // Check if update actually affected any rows
        if (!data || data.length === 0) {
          throw new Error('Update failed: No rows affected. Check RLS policies.');
        }
        
        // Only update UI if update was successful
        setPendingReplies(prev => prev.filter(r => r.id !== replyId));
        
        toast.success(t('toast.replyRejectedDeleted'));
      }
    } catch (error: any) {
      console.error('Moderation error:', error);
      toast.error(error.message || t('toast.failedToUpdateReply'));
      // Reload on error to restore correct state
      loadPendingReplies();
    }
  };

  const handleEvaluationModeration = async (evaluationId: string, action: 'approve' | 'reject') => {
    try {
      if (action === 'approve') {
        // Mark as approved
        const { data, error } = await supabase
          .from('company_evaluations')
          .update({ is_approved: true })
          .eq('id', evaluationId)
          .select(); // Select to verify update succeeded
        
        if (error) throw error;
        
        // Check if update actually affected any rows
        if (!data || data.length === 0) {
          throw new Error('Update failed: No rows affected. Check RLS policies.');
        }
        
        // Only update UI if update was successful
        setPendingEvaluations(prev => prev.filter(e => e.id !== evaluationId));
        
        toast.success(t('toast.evaluationApproved'));
      } else {
        // Delete rejected evaluation
        const { error } = await supabase
          .from('company_evaluations')
          .delete()
          .eq('id', evaluationId);
        
        if (error) throw error;
        
        // Only update UI if delete was successful
        setPendingEvaluations(prev => prev.filter(e => e.id !== evaluationId));
        
        toast.success(t('toast.evaluationRejectedDeleted'));
      }
    } catch (error: any) {
      console.error('Moderation error:', error);
      toast.error(error.message || t('toast.failedToUpdateEvaluation'));
      // Reload on error to restore correct state
      loadPendingEvaluations();
    }
  };

  const handleApproveAllDiscussions = async () => {
    if (pendingDiscussions.length === 0) return;
    
    setApprovingAllDiscussions(true);
    try {
      const discussionIds = pendingDiscussions.map(d => d.id);
      
      const { data, error } = await supabase
        .from('forum_discussions')
        .update({ is_featured: true })
        .in('id', discussionIds)
        .select();
      
      if (error) throw error;
      
      // Update UI
      setPendingDiscussions([]);
      toast.success(`Approved ${discussionIds.length} discussion${discussionIds.length > 1 ? 's' : ''}`);
    } catch (error: any) {
      console.error('Error approving all discussions:', error);
      toast.error(error.message || 'Failed to approve all discussions');
      // Reload on error
      loadPendingDiscussions();
    } finally {
      setApprovingAllDiscussions(false);
    }
  };

  const handleApproveAllReplies = async () => {
    if (pendingReplies.length === 0) return;
    
    setApprovingAllReplies(true);
    try {
      const replyIds = pendingReplies.map(r => r.id);
      
      const { data, error } = await supabase
        .from('forum_replies')
        .update({ is_approved: true })
        .in('id', replyIds)
        .select();
      
      if (error) throw error;
      
      // Update UI
      setPendingReplies([]);
      toast.success(`Approved ${replyIds.length} repl${replyIds.length > 1 ? 'ies' : 'y'}`);
    } catch (error: any) {
      console.error('Error approving all replies:', error);
      toast.error(error.message || 'Failed to approve all replies');
      // Reload on error
      loadPendingReplies();
    } finally {
      setApprovingAllReplies(false);
    }
  };

  const handleApproveAllEvaluations = async () => {
    if (pendingEvaluations.length === 0) return;
    
    setApprovingAllEvaluations(true);
    try {
      const evaluationIds = pendingEvaluations.map(e => e.id);
      
      const { data, error } = await supabase
        .from('company_evaluations')
        .update({ is_approved: true })
        .in('id', evaluationIds)
        .select();
      
      if (error) throw error;
      
      // Update UI
      setPendingEvaluations([]);
      toast.success(`Approved ${evaluationIds.length} company review${evaluationIds.length > 1 ? 's' : ''}`);
    } catch (error: any) {
      console.error('Error approving all evaluations:', error);
      toast.error(error.message || 'Failed to approve all company reviews');
      // Reload on error
      loadPendingEvaluations();
    } finally {
      setApprovingAllEvaluations(false);
    }
  };

  const handleModerationAction = async (
    action: 'delete' | 'lock' | 'pin' | 'approve' | 'hide' | 'unhide',
    contentType: string,
    contentId: string
  ) => {
    try {
      if (action === 'delete') {
        if (contentType === 'discussion') {
          const { error } = await supabase
            .from('forum_discussions')
            .delete()
            .eq('id', contentId);
          if (error) throw error;
        } else {
          const { error } = await supabase
            .from('forum_replies')
            .delete()
            .eq('id', contentId);
          if (error) throw error;
        }
      } else if (action === 'hide') {
        if (contentType === 'discussion') {
          const { error } = await supabase
            .from('forum_discussions')
            .update({ is_featured: false } as any)
            .eq('id', contentId);
          if (error) throw error;
        } else {
          const { error } = await supabase
            .from('forum_replies')
            .update({ content: '[Hidden by moderator]' } as any)
            .eq('id', contentId);
          if (error) throw error;
        }
        toast.success(t('toast.contentHidden'));
      } else if (action === 'unhide') {
        if (contentType === 'discussion') {
          const { error } = await supabase
            .from('forum_discussions')
            .update({ is_featured: true } as any)
            .eq('id', contentId);
          if (error) throw error;
        } else {
          // Cannot unhide replies without original content
          toast.error(t('toast.cannotRestoreHiddenReply'));
          return;
        }
        toast.success(t('toast.contentUnhidden'));
        toast.success(t('toast.contentDeleted'));
      } else if (action === 'pin') {
        const { error } = await supabase
          .from('forum_discussions')
          .update({ is_pinned: true })
          .eq('id', contentId);
        if (error) throw error;
        toast.success(t('toast.discussionPinned'));
      }
    } catch (error: any) {
      toast.error(error.message || t('errors.failedToUpdate'));
    }
  };

  if (!user) {
    return (
      <Layout>
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="heading-lg mb-4">Access Denied</h1>
            <p className="text-muted-foreground">You need to be signed in to access moderation tools.</p>
          </div>
        </div>
      </Layout>
    );
  }

  // Only admin can access this page
  if (!isAdmin) {
    return (
      <Layout>
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="heading-lg mb-4">Access Denied</h1>
            <p className="text-muted-foreground">You do not have permission to access moderation tools.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="section-spacing">
        <div className="container-wide max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="heading-lg mb-2">Moderation Dashboard</h1>
              <p className="text-muted-foreground">Review and manage content before it appears on the site</p>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as typeof activeTab)}>
            <TabsList className="mb-6">
              <TabsTrigger value="discussions" className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                Discussions
                {pendingDiscussions.length > 0 && (
                  <Badge variant="destructive" className="ml-1">{pendingDiscussions.length}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="replies" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Replies
                {pendingReplies.length > 0 && (
                  <Badge variant="destructive" className="ml-1">{pendingReplies.length}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="evaluations" className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                Company Reviews
                {pendingEvaluations.length > 0 && (
                  <Badge variant="destructive" className="ml-1">{pendingEvaluations.length}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Reports
              </TabsTrigger>
            </TabsList>

            {/* Discussions Tab */}
            <TabsContent value="discussions" className="mt-6">
              {pendingDiscussions.length > 0 && (
                <div className="mb-4 flex justify-end">
                  <Button
                    onClick={handleApproveAllDiscussions}
                    disabled={approvingAllDiscussions || pendingDiscussions.length === 0}
                    variant="default"
                  >
                    {approvingAllDiscussions ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Approving...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve All Discussions ({pendingDiscussions.length})
                      </>
                    )}
                  </Button>
                </div>
              )}
              {loadingDiscussions ? (
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <SkeletonCard key={i} lines={3} />
                  ))}
                </div>
              ) : pendingDiscussions.length === 0 ? (
                <div className="premium-card p-12 text-center">
                  <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">No pending discussions</h3>
                  <p className="text-muted-foreground">All discussions have been reviewed.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingDiscussions.map((discussion) => (
                    <div
                      key={discussion.id}
                      className="premium-card p-6"
                    >
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <Badge variant="destructive">Pending</Badge>
                            <span className="text-sm text-muted-foreground">
                              {formatRelativeTime(new Date(discussion.created_at), language)}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              Category: {discussion.category}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold mb-2">{discussion.title}</h3>
                          <div className="text-sm text-muted-foreground mb-3">
                            <p><strong>Author:</strong> {discussion.author_name}</p>
                            {discussion.symbol && (
                              <p><strong>Asset:</strong> {discussion.symbol} ({discussion.asset_type})</p>
                            )}
                            {discussion.tags && discussion.tags.length > 0 && (
                              <p><strong>Tags:</strong> {discussion.tags.join(', ')}</p>
                            )}
                          </div>
                          <div className="bg-muted/50 rounded-lg p-4 mb-4">
                            <p className="text-sm whitespace-pre-wrap line-clamp-6">{discussion.content}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3 justify-end">
                        <Button
                          variant="outline"
                          onClick={() => handleDiscussionModeration(discussion.id, 'reject')}
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                        <Button
                          onClick={() => handleDiscussionModeration(discussion.id, 'approve')}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Replies Tab */}
            <TabsContent value="replies" className="mt-6">
              {pendingReplies.length > 0 && (
                <div className="mb-4 flex justify-end">
                  <Button
                    onClick={handleApproveAllReplies}
                    disabled={approvingAllReplies || pendingReplies.length === 0}
                    variant="default"
                  >
                    {approvingAllReplies ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Approving...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve All Replies ({pendingReplies.length})
                      </>
                    )}
                  </Button>
                </div>
              )}
              {loadingReplies ? (
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <SkeletonCard key={i} lines={3} />
                  ))}
                </div>
              ) : pendingReplies.length === 0 ? (
                <div className="premium-card p-12 text-center">
                  <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">No pending replies</h3>
                  <p className="text-muted-foreground">All replies have been reviewed.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingReplies.map((reply) => (
                    <div
                      key={reply.id}
                      className="premium-card p-6"
                    >
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <Badge variant="destructive">Pending</Badge>
                            <span className="text-sm text-muted-foreground">
                              {formatRelativeTime(new Date(reply.created_at), language)}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            <strong>Reply to:</strong>{' '}
                            <Link to={`/forum/${reply.discussion_id}`} className="text-primary hover:underline">
                              {reply.discussion_title}
                            </Link>
                          </p>
                          <p className="text-sm text-muted-foreground mb-3">
                            <strong>Author:</strong> {reply.author_name}
                          </p>
                          <div className="bg-muted/50 rounded-lg p-4 mb-4">
                            <p className="text-sm whitespace-pre-wrap">{reply.content}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3 justify-end">
                        <Button
                          variant="outline"
                          onClick={() => handleReplyModeration(reply.id, 'reject')}
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                        <Button
                          onClick={() => handleReplyModeration(reply.id, 'approve')}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Evaluations Tab */}
            <TabsContent value="evaluations" className="mt-6">
              {pendingEvaluations.length > 0 && (
                <div className="mb-4 flex justify-end">
                  <Button
                    onClick={handleApproveAllEvaluations}
                    disabled={approvingAllEvaluations || pendingEvaluations.length === 0}
                    variant="default"
                  >
                    {approvingAllEvaluations ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Approving...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve All Company Reviews ({pendingEvaluations.length})
                      </>
                    )}
                  </Button>
                </div>
              )}
              {loadingEvaluations ? (
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <SkeletonCard key={i} lines={3} />
                  ))}
                </div>
              ) : pendingEvaluations.length === 0 ? (
                <div className="premium-card p-12 text-center">
                  <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">No pending company reviews</h3>
                  <p className="text-muted-foreground">All company reviews have been moderated.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingEvaluations.map((evaluation) => (
                    <div
                      key={evaluation.id}
                      className="premium-card p-6"
                    >
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <Badge variant="destructive">Pending</Badge>
                            <span className="text-sm text-muted-foreground">
                              {formatRelativeTime(new Date(evaluation.created_at), language)}
                            </span>
                            <Badge variant="outline">Rating: {evaluation.rating}/100</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            <strong>Company:</strong>{' '}
                            <Link to={`/companies/${evaluation.company_slug}`} className="text-primary hover:underline">
                              {evaluation.company_slug}
                            </Link>
                          </p>
                          <p className="text-sm text-muted-foreground mb-3">
                            <strong>User:</strong> {evaluation.user_name}
                          </p>
                          {evaluation.comment && (
                            <div className="bg-muted/50 rounded-lg p-4 mb-4">
                              <p className="text-sm whitespace-pre-wrap">{evaluation.comment}</p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-3 justify-end">
                        <Button
                          variant="outline"
                          onClick={() => handleEvaluationModeration(evaluation.id, 'reject')}
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                        <Button
                          onClick={() => handleEvaluationModeration(evaluation.id, 'approve')}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Reports Tab */}
            <TabsContent value="reports" className="mt-6">
              <Tabs value={reportsTab} onValueChange={(value) => setReportsTab(value as 'pending' | 'all')} className="mb-4">
                <TabsList>
                  <TabsTrigger value="pending">Pending Reports</TabsTrigger>
                  <TabsTrigger value="all">All Reports</TabsTrigger>
                </TabsList>
              </Tabs>
              {loading ? (
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <SkeletonCard key={i} lines={3} />
                  ))}
                </div>
              ) : reports.length === 0 ? (
                <div className="premium-card p-12 text-center">
                  <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">No reports</h3>
                  <p className="text-muted-foreground">All clear! No pending reports to review.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {reports.map((report) => (
                    <div
                      key={report.id}
                      className="premium-card p-6 flex items-start justify-between gap-4"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <Badge variant={report.status === 'pending' ? 'destructive' : 'secondary'}>
                            {report.status}
                          </Badge>
                          <span className="text-sm text-muted-foreground capitalize">
                            {report.target_type}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {formatRelativeTime(new Date(report.created_at), language)}
                          </span>
                        </div>
                        <div className="mb-2">
                          <strong>Reason:</strong> {report.reason}
                        </div>
                        {report.description && (
                          <p className="text-sm text-muted-foreground mb-3">{report.description}</p>
                        )}
                        <Link
                          to={`/forum/${report.target_id}`}
                          className="text-primary hover:underline text-sm"
                        >
                          View Content →
                        </Link>
                      </div>
                      <div className="flex flex-col gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={async () => {
                              await handleModerationAction('delete', report.target_type, report.target_id);
                              loadReports();
                            }}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={async () => {
                            await handleModerationAction('hide', report.target_type, report.target_id);
                            loadReports();
                          }}
                        >
                          <Lock className="h-4 w-4 mr-2" />
                          Hide
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={async () => {
                            await handleModerationAction('unhide', report.target_type, report.target_id);
                            loadReports();
                          }}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Unhide
                        </Button>
                        {report.target_type === 'discussion' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleModerationAction('pin', report.target_type, report.target_id)}
                          >
                            <Pin className="h-4 w-4 mr-2" />
                            Pin
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={async () => {
                            try {
                              const { error } = await supabase
                                .from('forum_reports')
                                .update({
                                  status: 'resolved',
                                  reviewed_by: user?.id,
                                  reviewed_at: new Date().toISOString(),
                                })
                                .eq('id', report.id);

                              if (error) throw error;
                              toast.success(t('toast.reportMarkedResolved'));
                              loadReports();
                            } catch (error: any) {
                              toast.error(error.message || t('errors.failedToUpdate'));
                            }
                          }}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Resolve
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
