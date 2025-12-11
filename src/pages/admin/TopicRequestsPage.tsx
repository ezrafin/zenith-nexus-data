import { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/integrations/supabase/client';
import { isAdmin } from '@/utils/admin';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Check, X, Clock, MessageSquare, Shield } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';

interface TopicRequest {
  id: string;
  requester_name: string;
  requester_email: string;
  topic_title: string;
  topic_description: string;
  status: 'pending' | 'approved' | 'rejected';
  admin_notes: string | null;
  created_at: string;
  reviewed_at: string | null;
}

export default function TopicRequestsPage() {
  const { user } = useUser();
  const [requests, setRequests] = useState<TopicRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [selectedRequest, setSelectedRequest] = useState<TopicRequest | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (user && isAdmin(user.email)) {
      loadRequests();
    } else {
      setLoading(false);
    }
  }, [user, filter]);

  const loadRequests = async () => {
    try {
      let query = supabase
        .from('forum_topic_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (filter !== 'all') {
        query = query.eq('status', filter);
      }

      const { data, error } = await query;

      if (error) throw error;
      setRequests((data || []) as TopicRequest[]);
    } catch (error: any) {
      console.error('Error loading requests:', error);
      toast.error('Failed to load requests');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (request: TopicRequest) => {
    if (!user || !isAdmin(user.email)) return;

    setProcessing(true);
    try {
      // Create the discussion
      const { data: discussion, error: discussionError } = await supabase
        .from('forum_discussions')
        .insert({
          title: request.topic_title,
          content: request.topic_description,
          author_name: request.requester_name,
          category: 'investments', // Default category, can be enhanced
          tags: [],
          is_approved: true,
          approved_by: user.id,
          approved_at: new Date().toISOString(),
          request_id: request.id,
        })
        .select()
        .single();

      if (discussionError) throw discussionError;

      // Update request status
      const { error: updateError } = await supabase
        .from('forum_topic_requests')
        .update({
          status: 'approved',
          reviewed_at: new Date().toISOString(),
          admin_notes: adminNotes.trim() || null,
        })
        .eq('id', request.id);

      if (updateError) throw updateError;

      toast.success('Discussion approved and published');
      setSelectedRequest(null);
      setAdminNotes('');
      loadRequests();
    } catch (error: any) {
      toast.error(error.message || 'Failed to approve request');
    } finally {
      setProcessing(false);
    }
  };

  const handleReject = async (request: TopicRequest) => {
    if (!user || !isAdmin(user.email)) return;
    if (!adminNotes.trim()) {
      toast.error('Please provide a reason for rejection');
      return;
    }

    setProcessing(true);
    try {
      const { error } = await supabase
        .from('forum_topic_requests')
        .update({
          status: 'rejected',
          reviewed_at: new Date().toISOString(),
          admin_notes: adminNotes.trim(),
        })
        .eq('id', request.id);

      if (error) throw error;

      toast.success('Request rejected');
      setSelectedRequest(null);
      setAdminNotes('');
      loadRequests();
    } catch (error: any) {
      toast.error(error.message || 'Failed to reject request');
    } finally {
      setProcessing(false);
    }
  };

  if (!user) {
    return (
      <Layout>
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="heading-lg mb-4">Access Denied</h1>
            <p className="text-muted-foreground">You need to be signed in to access this page.</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!isAdmin(user.email)) {
    return (
      <Layout>
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="heading-lg mb-4">Access Denied</h1>
            <p className="text-muted-foreground">You need admin privileges to access this page.</p>
          </div>
        </div>
      </Layout>
    );
  }

  const filteredRequests = filter === 'all' 
    ? requests 
    : requests.filter(r => r.status === filter);

  return (
    <Layout>
      <div className="pt-24 pb-16">
        <div className="container-wide">
          <div className="flex items-center justify-between mb-8">
            <h1 className="heading-xl">Topic Requests</h1>
            <Link to="/admin/moderation">
              <Button variant="outline">
                <Shield className="h-4 w-4 mr-2" />
                Moderation
              </Button>
            </Link>
          </div>

          {/* Filters */}
          <div className="flex gap-2 mb-6">
            {(['all', 'pending', 'approved', 'rejected'] as const).map((f) => (
              <Button
                key={f}
                variant={filter === f ? 'default' : 'outline'}
                onClick={() => setFilter(f)}
                size="sm"
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
                {f !== 'all' && (
                  <span className="ml-2 px-2 py-0.5 bg-primary/20 rounded-full text-xs">
                    {requests.filter(r => r.status === f).length}
                  </span>
                )}
              </Button>
            ))}
          </div>

          {/* Requests List */}
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="premium-card p-6 animate-pulse">
                  <div className="h-6 bg-muted rounded w-1/3 mb-4" />
                  <div className="h-4 bg-muted rounded w-full mb-2" />
                  <div className="h-4 bg-muted rounded w-2/3" />
                </div>
              ))}
            </div>
          ) : filteredRequests.length === 0 ? (
            <div className="premium-card p-12 text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No {filter === 'all' ? '' : filter} requests found.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredRequests.map((request) => (
                <div
                  key={request.id}
                  className="premium-card p-6 border-l-4"
                  style={{
                    borderLeftColor:
                      request.status === 'approved'
                        ? 'rgb(34, 197, 94)'
                        : request.status === 'rejected'
                        ? 'rgb(239, 68, 68)'
                        : 'rgb(234, 179, 8)',
                  }}
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <h3 className="font-heading font-semibold text-lg mb-2">
                        {request.topic_title}
                      </h3>
                      <p className="text-muted-foreground mb-4 whitespace-pre-wrap">
                        {request.topic_description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>
                          <strong>Requester:</strong> {request.requester_name} ({request.requester_email})
                        </span>
                        <span>
                          <Clock className="h-4 w-4 inline mr-1" />
                          {formatDistanceToNow(new Date(request.created_at), { addSuffix: true })}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            request.status === 'approved'
                              ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                              : request.status === 'rejected'
                              ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                              : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                          }`}
                        >
                          {request.status}
                        </span>
                      </div>
                      {request.admin_notes && (
                        <div className="mt-4 p-3 bg-muted rounded-lg">
                          <p className="text-sm">
                            <strong>Admin Notes:</strong> {request.admin_notes}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {request.status === 'pending' && (
                    <div className="mt-4 pt-4 border-t border-border space-y-3">
                      <div>
                        <Label htmlFor={`notes-${request.id}`}>Admin Notes (optional for approval, required for rejection)</Label>
                        <Textarea
                          id={`notes-${request.id}`}
                          value={selectedRequest?.id === request.id ? adminNotes : ''}
                          onChange={(e) => {
                            setAdminNotes(e.target.value);
                            setSelectedRequest(request);
                          }}
                          placeholder="Add notes about this request..."
                          rows={3}
                          className="mt-2"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleApprove(request)}
                          disabled={processing}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Check className="h-4 w-4 mr-2" />
                          Approve & Publish
                        </Button>
                        <Button
                          onClick={() => handleReject(request)}
                          disabled={processing || !adminNotes.trim()}
                          variant="destructive"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  )}

                  {request.status === 'approved' && (
                    <div className="mt-4">
                      <Link to={`/forum/${request.id}`}>
                        <Button variant="outline" size="sm">
                          View Discussion
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

