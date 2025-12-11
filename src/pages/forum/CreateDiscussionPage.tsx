import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Send } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  { id: 'investments', name: 'Investments' },
  { id: 'companies', name: 'Companies' },
  { id: 'markets', name: 'Markets' },
  { id: 'crypto', name: 'Crypto' },
];

export default function CreateDiscussionPage() {
  const { user, profile } = useUser();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('investments');
  const [tags, setTags] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!user) {
    return (
      <Layout>
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="heading-lg mb-4">Please sign in</h1>
            <p className="text-muted-foreground mb-6">You need to be signed in to create a discussion.</p>
            <Link to="/auth/login">
              <Button>Sign in</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    try {
      const tagsArray = tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      // Create a topic request instead of direct discussion
      const { data, error } = await supabase
        .from('forum_topic_requests')
        .insert({
          requester_name: profile?.display_name || profile?.username || user.email || 'Anonymous',
          requester_email: user.email || '',
          topic_title: title.trim(),
          topic_description: content.trim(),
          status: 'pending',
        })
        .select()
        .single();

      if (error) throw error;

      toast.success('Discussion request submitted! It will be reviewed by an admin before being published.');
      navigate('/forum');
    } catch (error: any) {
      toast.error(error.message || 'Failed to submit discussion request');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="section-spacing">
        <div className="container-wide max-w-4xl">

          <h1 className="heading-lg mb-8">Request New Discussion</h1>
          <p className="text-muted-foreground mb-6">
            Submit a discussion topic for review. Once approved by an admin, it will be published on the forum.
          </p>

          <div className="premium-card p-6 md:p-8 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a clear, descriptive title..."
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="e.g., stocks, analysis, long-term"
              />
              <p className="text-xs text-muted-foreground">
                Add tags to help others find your discussion
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your discussion here... (Markdown supported)"
                  rows={12}
                  className="font-mono text-sm"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Markdown is supported. Use **bold**, *italic*, `code`, and more.
                </p>
              </div>

              <div className="flex items-center justify-end gap-4">
                <Link to="/forum">
                  <Button type="button" variant="outline" disabled={submitting}>
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" disabled={submitting || !title.trim() || !content.trim()}>
                  <Send className="mr-2 h-4 w-4" />
                  {submitting ? 'Submitting...' : 'Submit for Review'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

