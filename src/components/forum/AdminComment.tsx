import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/context/UserContext';
import { isAdmin } from '@/utils/admin';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { UserAvatar } from '@/components/user/UserAvatar';
import { Shield, Edit2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';

interface AdminComment {
  id: string;
  reply_id: string;
  admin_id: string;
  comment: string;
  created_at: string;
  updated_at: string;
  admin_email?: string;
  admin_name?: string;
}

interface AdminCommentProps {
  replyId: string;
}

export function AdminComment({ replyId }: AdminCommentProps) {
  const { user } = useUser();
  const [comments, setComments] = useState<AdminComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newComment, setNewComment] = useState('');

  const userIsAdmin = isAdmin(user?.email);

  useEffect(() => {
    loadComments();
  }, [replyId]);

  const loadComments = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_comments')
        .select('*, admin:admin_id(email)')
        .eq('reply_id', replyId)
        .order('created_at', { ascending: true });

      if (error) throw error;

      // Fetch admin names from user_profiles
      const commentsWithNames = await Promise.all(
        (data || []).map(async (comment) => {
          const { data: profile } = await supabase
            .from('user_profiles')
            .select('display_name, username')
            .eq('id', comment.admin_id)
            .maybeSingle();

          return {
            ...comment,
            admin_name: profile?.display_name || profile?.username || 'Admin',
          };
        })
      );

      setComments(commentsWithNames);
    } catch (error: any) {
      console.error('Error loading admin comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async () => {
    if (!user || !newComment.trim()) return;

    try {
      const { error } = await supabase
        .from('admin_comments')
        .insert({
          reply_id: replyId,
          admin_id: user.id,
          comment: newComment.trim(),
        });

      if (error) throw error;

      toast.success('Comment added');
      setNewComment('');
      setShowAddForm(false);
      loadComments();
    } catch (error: any) {
      toast.error(error.message || 'Failed to add comment');
    }
  };

  const handleEditComment = async (id: string) => {
    if (!editText.trim()) return;

    try {
      const { error } = await supabase
        .from('admin_comments')
        .update({ comment: editText.trim() })
        .eq('id', id);

      if (error) throw error;

      toast.success('Comment updated');
      setEditingId(null);
      setEditText('');
      loadComments();
    } catch (error: any) {
      toast.error(error.message || 'Failed to update comment');
    }
  };

  const handleDeleteComment = async (id: string) => {
    if (!confirm('Are you sure you want to delete this comment?')) return;

    try {
      const { error } = await supabase
        .from('admin_comments')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Comment deleted');
      loadComments();
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete comment');
    }
  };

  if (loading) {
    return <div className="text-sm text-muted-foreground">Loading admin comments...</div>;
  }

  return (
    <div className="mt-4 space-y-3">
      {comments.length > 0 && (
        <div className="space-y-3">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
                    <Shield className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-amber-900 dark:text-amber-100">
                      {comment.admin_name} (Admin)
                    </span>
                    <span className="text-xs text-amber-600 dark:text-amber-400">
                      {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                    </span>
                    {comment.updated_at !== comment.created_at && (
                      <span className="text-xs text-amber-500 italic">(edited)</span>
                    )}
                  </div>
                  {editingId === comment.id ? (
                    <div className="space-y-2">
                      <Textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        rows={3}
                        className="text-sm"
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleEditComment(comment.id)}
                        >
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingId(null);
                            setEditText('');
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-amber-800 dark:text-amber-200 whitespace-pre-wrap">
                      {comment.comment}
                    </p>
                  )}
                  {userIsAdmin && editingId !== comment.id && (
                    <div className="flex gap-2 mt-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setEditingId(comment.id);
                          setEditText(comment.comment);
                        }}
                      >
                        <Edit2 className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {userIsAdmin && (
        <div>
          {showAddForm ? (
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 space-y-3">
              <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add an admin comment..."
                rows={3}
                className="text-sm"
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={handleAddComment}>
                  Add Comment
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setShowAddForm(false);
                    setNewComment('');
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowAddForm(true)}
              className="w-full"
            >
              <Shield className="h-3 w-3 mr-2" />
              Add Admin Comment
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

