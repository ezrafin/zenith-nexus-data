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

export default function ModerationPage() {
  const { user } = useUser();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'pending' | 'all'>('pending');

  useEffect(() => {
    if (user) {
      // Check if user is moderator (in real app, check user role)
      loadReports();
    } else {
      setLoading(false);
    }
  }, [user, activeTab]);

  const loadReports = async () => {
    setLoading(true);
    try {
      const query = supabase
        .from('forum_reports')
        .select('*')
        .order('created_at', { ascending: false });

      if (activeTab === 'pending') {
        query.eq('status', 'pending');
      }

      const { data, error } = await query;

      if (error) throw error;
      setReports((data || []) as Report[]);
    } catch (error) {
      console.error('Error loading reports:', error);
      toast.error('Failed to load reports');
    } finally {
      setLoading(false);
    }
  };

  const handleModerationAction = async (
    action: 'delete' | 'lock' | 'pin' | 'approve',
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
        toast.success('Content deleted');
      } else if (action === 'lock') {
        // Note: is_locked column not in schema, using is_pinned as workaround
        toast.success('Discussion locked (feature pending)');
      } else if (action === 'pin') {
        const { error } = await supabase
          .from('forum_discussions')
          .update({ is_pinned: true })
          .eq('id', contentId);
        if (error) throw error;
        toast.success('Discussion pinned');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to perform action');
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

  // In a real app, check if user has moderator role
  const isModerator = false; // Placeholder

  if (!isModerator) {
    return (
      <Layout>
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="text-center">
            <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h1 className="heading-lg mb-4">Access Denied</h1>
            <p className="text-muted-foreground">You need moderator privileges to access this page.</p>
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

          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'pending' | 'all')}>
            <TabsList>
              <TabsTrigger value="pending">Pending Reports</TabsTrigger>
              <TabsTrigger value="all">All Reports</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
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
                        {report.target_type === 'discussion' && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleModerationAction('lock', report.target_type, report.target_id)}
                            >
                              <Lock className="h-4 w-4 mr-2" />
                              Lock
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleModerationAction('pin', report.target_type, report.target_id)}
                            >
                              <Pin className="h-4 w-4 mr-2" />
                              Pin
                            </Button>
                          </>
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
                              toast.success('Report marked as resolved');
                              loadReports();
                            } catch (error: any) {
                              toast.error(error.message || 'Failed to resolve report');
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

