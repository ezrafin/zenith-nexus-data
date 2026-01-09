import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SkeletonCard } from '@/components/ui/skeleton-card';
import { Shield, Trash2, Lock, Pin, CheckCircle, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslation } from '@/hooks/useTranslation';

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

// Admin email - only this user can access moderation
const ADMIN_EMAIL = 'mark.lindt.finance@gmail.com';

export default function ModerationPage() {
  const { user } = useUser();
  const { t } = useTranslation({ namespace: 'ui' });
  const [reports, setReports] = useState<Report[]>([]);
  const [pendingDiscussions, setPendingDiscussions] = useState<PendingDiscussion[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingDiscussions, setLoadingDiscussions] = useState(false);
  const [activeTab, setActiveTab] = useState<'reports' | 'discussions'>('discussions');
  const [reportsTab, setReportsTab] = useState<'pending' | 'all'>('pending');

  // Check if current user is admin
  const isAdmin = user?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  useEffect(() => {
    if (user && isAdmin) {
      if (activeTab === 'reports') {
        loadReports();
      } else {
        loadPendingDiscussions();
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
      // Load discussions that are not featured (pending moderation)
      const { data, error } = await supabase
        .from('forum_discussions')
        .select('*')
        .eq('is_featured', false)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPendingDiscussions((data || []) as unknown as PendingDiscussion[]);
    } catch (error) {
      console.error('Error loading pending discussions:', error);
      toast.error('Failed to load pending discussions');
    } finally {
      setLoadingDiscussions(false);
    }
  };

  const handleDiscussionModeration = async (discussionId: string, action: 'approve' | 'reject') => {
    try {
      if (action === 'approve') {
        // Mark as featured (approved)
        const { error } = await supabase
          .from('forum_discussions')
          .update({ is_featured: true })
          .eq('id', discussionId);
        if (error) throw error;
        toast.success('Discussion approved');
      } else {
        // Delete rejected discussion
        const { error } = await supabase
          .from('forum_discussions')
          .delete()
          .eq('id', discussionId);
        if (error) throw error;
        toast.success('Discussion rejected and deleted');
      }
      loadPendingDiscussions();
    } catch (error: any) {
      toast.error(error.message || 'Failed to update discussion');
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
              <p className="text-muted-foreground">Review and manage reported content</p>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'reports' | 'discussions')}>
            <TabsList>
              <TabsTrigger value="discussions">Pending Discussions</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="discussions" className="mt-6">
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
                              {new Date(discussion.created_at).toLocaleDateString()}
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
                            {new Date(report.created_at).toLocaleDateString()}
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

