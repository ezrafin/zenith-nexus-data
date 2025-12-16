import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
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
import { useForumCategories } from '@/hooks/useForumCategories';
import { checkRateLimit } from '@/lib/api/rateLimit';
import { z } from 'zod';

const createDiscussionSchema = z.object({
  title: z.string().min(10, 'Title must be at least 10 characters'),
  content: z.string().min(50, 'Content should be at least 50 characters'),
  category: z.string(),
  tags: z.string().optional(),
  symbol: z.string().optional(),
  asset_type: z.enum(['stock', 'crypto', 'index', 'commodity', 'currency', 'etf']).optional(),
});

export default function CreateDiscussionPage() {
  const { user, profile } = useUser();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('general');
  const [tags, setTags] = useState('');
  const [symbol, setSymbol] = useState('');
  const [assetType, setAssetType] = useState<'stock' | 'crypto' | 'index' | 'commodity' | 'currency' | 'etf' | ''>('');
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ title?: string; content?: string }>({});

  // Use React Query hook for categories
  const { data: categories = [], isLoading: loadingCategories } = useForumCategories();

  useEffect(() => {
    if (categories.length > 0 && !category) {
      setCategory(categories[0].id);
    }
  }, [categories, category]);

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

    const validation = createDiscussionSchema.safeParse({
      title: title.trim(),
      content: content.trim(),
      category,
      tags,
      symbol: symbol.trim() || undefined,
      asset_type: assetType || undefined,
    });

    if (!validation.success) {
      const fieldErrors: { title?: string; content?: string } = {};
      for (const issue of validation.error.issues) {
        if (issue.path[0] === 'title') fieldErrors.title = issue.message;
        if (issue.path[0] === 'content') fieldErrors.content = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    // Check rate limit
    const rateLimitCheck = await checkRateLimit('create_discussion', 10, 60);
    if (!rateLimitCheck.allowed) {
      toast.error(rateLimitCheck.message || 'Rate limit exceeded. Please wait before creating another discussion.');
      return;
    }

    setSubmitting(true);
    try {
      const tagsArray = validation.data.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      const { data, error } = await supabase
        .from('forum_discussions')
        .insert({
          title: validation.data.title,
          content: validation.data.content,
          author_name: profile?.display_name || user.email || 'Anonymous',
          category: validation.data.category,
          tags: tagsArray,
          user_id: user.id,
          symbol: validation.data.symbol || null,
          asset_type: validation.data.asset_type || null,
        })
        .select()
        .single();

      if (error) throw error;

      // Invalidate forum topics queries to refresh the list
      queryClient.invalidateQueries({ queryKey: ['forumTopics'] });

      toast.success('Discussion created successfully');
      navigate(`/forum/${data.id}`);
    } catch (error: any) {
      toast.error(error.message || 'Failed to create discussion');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="section-spacing">
        <div className="container-wide max-w-4xl">

          <h1 className="heading-lg mb-8">Create new discussion</h1>

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
              {errors.title ? (
                <p className="text-xs text-destructive">{errors.title}</p>
              ) : (
                <p className="text-xs text-muted-foreground">
                  Title should be at least 10 characters.
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={category} onValueChange={setCategory} disabled={loadingCategories}>
                <SelectTrigger id="category">
                  <SelectValue placeholder={loadingCategories ? "Loading..." : "Select category"} />
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

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="symbol">Asset Symbol (optional)</Label>
                <Input
                  id="symbol"
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                  placeholder="e.g., AAPL, BTC, SPX"
                  maxLength={10}
                />
                <p className="text-xs text-muted-foreground">
                  Link this discussion to a specific asset
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="asset_type">Asset Type (optional)</Label>
                <Select value={assetType} onValueChange={(value) => setAssetType(value as typeof assetType)}>
                  <SelectTrigger id="asset_type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="stock">Stock</SelectItem>
                    <SelectItem value="crypto">Crypto</SelectItem>
                    <SelectItem value="index">Index</SelectItem>
                    <SelectItem value="commodity">Commodity</SelectItem>
                    <SelectItem value="currency">Currency</SelectItem>
                    <SelectItem value="etf">ETF</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
              {errors.content && (
                <p className="text-xs text-destructive mb-1">{errors.content}</p>
              )}
              <p className="text-xs text-muted-foreground">
                Content should be at least 50 characters. Markdown is supported: use **bold**, *italic*, `code`, and more.
              </p>
              </div>

              <div className="flex items-center justify-end gap-4">
                <Link to="/forum">
                  <Button type="button" variant="outline" disabled={submitting}>
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" disabled={submitting}>
                  <Send className="mr-2 h-4 w-4" />
                  {submitting ? 'Creating...' : 'Create Discussion'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

