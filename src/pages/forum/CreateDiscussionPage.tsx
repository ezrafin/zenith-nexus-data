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
import { Send, Clock, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useForumCategories } from '@/hooks/useForumCategories';
import { checkRateLimit } from '@/lib/api/rateLimit';
import { z } from 'zod';
import { useTranslation } from '@/hooks/useTranslation';
import { useCollectibleBills } from '@/hooks/useCollectibleBills';

export default function CreateDiscussionPage() {
  const { collectBill } = useCollectibleBills();
  const { t } = useTranslation({ namespace: 'forum' });
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
  const [moderationStatus, setModerationStatus] = useState<{ discussionId: string; title: string } | null>(null);

  // Use React Query hook for categories
  const { data: categories = [], isLoading: loadingCategories } = useForumCategories();

  useEffect(() => {
    if (categories.length > 0 && !category) {
      setCategory(categories[0].id);
    }
  }, [categories, category]);

  // Show moderation status page if discussion was submitted
  if (moderationStatus) {
    return (
      <Layout>
        <div className="section-spacing">
          <div className="container-wide max-w-4xl">
            <div className="premium-card p-8 md:p-12 text-center">
              <div className="flex justify-center mb-6">
                <div className="rounded-full bg-primary/10 p-4">
                  <Clock className="h-12 w-12 text-primary" />
                </div>
              </div>
              <h1 className="heading-lg mb-4">{t('moderation.pendingTitle')}</h1>
              <p className="text-lg text-muted-foreground mb-6">
                {t('moderation.pendingMessage')}
              </p>
              <div className="bg-muted/50 rounded-lg p-6 mb-8 text-left max-w-2xl mx-auto">
                <p className="font-semibold mb-2">{t('moderation.discussionTitle')}</p>
                <p className="text-muted-foreground">{moderationStatus.title}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => {
                  setModerationStatus(null);
                  navigate('/forum');
                }} variant="outline">
                  {t('moderation.backToForum')}
                </Button>
                <Button onClick={() => {
                  setModerationStatus(null);
                  setTitle('');
                  setContent('');
                  setTags('');
                  setSymbol('');
                  setAssetType('');
                }}>
                  {t('moderation.createAnother')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="heading-lg mb-4">{t('auth.pleaseSignIn', 'ui')}</h1>
            <p className="text-muted-foreground mb-6">{t('needSignInToCreate')}</p>
            <Link to="/auth/login">
              <Button>{t('buttons.signIn', 'ui')}</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const createDiscussionSchema = z.object({
      title: z.string().min(10, t('validation.titleMin')),
      content: z.string().min(50, t('validation.contentMin')),
      category: z.string(),
      tags: z.string().optional(),
      symbol: z.string().optional(),
      asset_type: z.enum(['stock', 'crypto', 'index', 'commodity', 'currency', 'etf']).optional(),
    });

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
      toast.error(rateLimitCheck.message || t('rateLimitCreateExceeded'));
      return;
    }

    setSubmitting(true);
    try {
      const tagsArray = (validation.data.tags || '')
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
          status: 'pending', // Set status to pending for moderation
        })
        .select()
        .single();

      if (error) throw error;

      // Send moderation email notification
      try {
        const { error: emailError } = await supabase.functions.invoke('send-discussion-moderation-email', {
          body: {
            discussionId: data.id,
            title: validation.data.title,
            content: validation.data.content,
            authorName: profile?.display_name || user.email || 'Anonymous',
            authorEmail: user.email || '',
            category: validation.data.category,
            tags: tagsArray,
            symbol: validation.data.symbol || null,
            assetType: validation.data.asset_type || null,
          },
        });

        if (emailError) {
          console.error('Error sending moderation email:', emailError);
          // Don't throw - discussion is still created
        }
      } catch (emailErr) {
        console.error('Error sending moderation email:', emailErr);
        // Don't throw - discussion is still created
      }

      // Invalidate forum topics queries to refresh the list
      queryClient.invalidateQueries({ queryKey: ['forumTopics'] });

      // Trigger bill collection for creating discussion
      await collectBill('forum_create_discussion', {
        page: '/forum/new',
        action: 'create_discussion',
        metadata: { discussionId: data.id },
      });
      
      // Show moderation status page instead of navigating
      setModerationStatus({
        discussionId: data.id,
        title: validation.data.title,
      });
      
      // Reset form
      setTitle('');
      setContent('');
      setTags('');
      setSymbol('');
      setAssetType('');
    } catch (error: any) {
      toast.error(error.message || t('discussionCreatedError'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="section-spacing">
          <div className="container-wide max-w-4xl">

          <h1 className="heading-lg mb-8">{t('createDiscussionPageTitle')}</h1>

          <div className="premium-card p-6 md:p-8 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">{t('form.titleLabel')}</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t('form.titlePlaceholder')}
                required
              />
              {errors.title ? (
                <p className="text-xs text-destructive">{errors.title}</p>
              ) : (
                <p className="text-xs text-muted-foreground">
                  {t('form.titleHelp')}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">{t('form.categoryLabel')}</Label>
              <Select value={category} onValueChange={setCategory} disabled={loadingCategories}>
                <SelectTrigger id="category">
                  <SelectValue
                    placeholder={
                      loadingCategories
                        ? t('form.categoryLoading')
                        : t('form.categoryPlaceholder')
                    }
                  />
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
              <Label htmlFor="tags">{t('form.tagsLabel')}</Label>
              <Input
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder={t('form.tagsPlaceholder')}
              />
              <p className="text-xs text-muted-foreground">
                {t('form.tagsHelp')}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="symbol">{t('form.symbolLabel')}</Label>
                <Input
                  id="symbol"
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                  placeholder={t('form.symbolPlaceholder')}
                  maxLength={10}
                />
                <p className="text-xs text-muted-foreground">
                  {t('form.symbolHelp')}
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="asset_type">{t('form.assetTypeLabel')}</Label>
                <Select value={assetType} onValueChange={(value) => setAssetType(value as typeof assetType)}>
                  <SelectTrigger id="asset_type">
                    <SelectValue placeholder={t('form.assetTypePlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="stock">{t('form.assetTypeStock')}</SelectItem>
                    <SelectItem value="crypto">{t('form.assetTypeCrypto')}</SelectItem>
                    <SelectItem value="index">{t('form.assetTypeIndex')}</SelectItem>
                    <SelectItem value="commodity">{t('form.assetTypeCommodity')}</SelectItem>
                    <SelectItem value="currency">{t('form.assetTypeCurrency')}</SelectItem>
                    <SelectItem value="etf">{t('form.assetTypeEtf')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="content">{t('form.contentLabel')}</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder={t('form.contentPlaceholder')}
                  rows={12}
                  className="font-mono text-sm"
                  required
                />
              {errors.content && (
                <p className="text-xs text-destructive mb-1">{errors.content}</p>
              )}
              <p className="text-xs text-muted-foreground">
                {t('form.contentHelp')}
              </p>
              </div>

              <div className="flex items-center justify-end gap-4">
                <Link to="/forum">
                  <Button type="button" variant="outline" disabled={submitting}>
                    {t('buttons.cancel', 'ui')}
                  </Button>
                </Link>
                <Button type="submit" disabled={submitting}>
                  <Send className="mr-2 h-4 w-4" />
                  {submitting ? t('buttons.submit', 'ui') : t('createDiscussion')}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

