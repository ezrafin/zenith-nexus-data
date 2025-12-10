import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/integrations/supabase/client';
import { BookOpen, Plus, FolderPlus, Users, FileText, MessageSquare, Video, Newspaper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SkeletonCard } from '@/components/ui/skeleton-card';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface Collection {
  id: string;
  title: string;
  description: string | null;
  is_public: boolean;
  cover_image_url: string | null;
  created_at: string;
  item_count: number;
  follower_count: number;
  user_id: string;
}

export function ContentCollections({ className }: { className?: string }) {
  const { user } = useUser();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  useEffect(() => {
    loadCollections();
  }, [user]);

  const loadCollections = async () => {
    setLoading(true);
    try {
      if (user) {
        // Load user's collections
        const { data: userCollections } = await supabase
          .from('content_collections')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        // Load public collections
        const { data: publicCollections } = await supabase
          .from('content_collections')
          .select('*')
          .eq('is_public', true)
          .neq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(5);

        // Get item counts and follower counts
        const allCollections = [...(userCollections || []), ...(publicCollections || [])];
        const collectionsWithCounts = await Promise.all(
          allCollections.map(async (collection) => {
            const [itemsData, followersData] = await Promise.all([
              supabase
                .from('collection_items')
                .select('id', { count: 'exact', head: true })
                .eq('collection_id', collection.id),
              supabase
                .from('collection_follows')
                .select('id', { count: 'exact', head: true })
                .eq('collection_id', collection.id),
            ]);

            return {
              ...collection,
              item_count: itemsData.count || 0,
              follower_count: followersData.count || 0,
            };
          })
        );

        setCollections(collectionsWithCounts);
      } else {
        // Load only public collections
        const { data: publicCollections } = await supabase
          .from('content_collections')
          .select('*')
          .eq('is_public', true)
          .order('created_at', { ascending: false })
          .limit(10);

        if (publicCollections) {
          const collectionsWithCounts = await Promise.all(
            publicCollections.map(async (collection) => {
              const [itemsData, followersData] = await Promise.all([
                supabase
                  .from('collection_items')
                  .select('id', { count: 'exact', head: true })
                  .eq('collection_id', collection.id),
                supabase
                  .from('collection_follows')
                  .select('id', { count: 'exact', head: true })
                  .eq('collection_id', collection.id),
              ]);

              return {
                ...collection,
                item_count: itemsData.count || 0,
                follower_count: followersData.count || 0,
              };
            })
          );

          setCollections(collectionsWithCounts);
        }
      }
    } catch (error) {
      console.error('Error loading collections:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCollection = async (title: string, description: string, isPublic: boolean) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('content_collections')
        .insert({
          user_id: user.id,
          title,
          description,
          is_public: isPublic,
        })
        .select()
        .single();

      if (error) throw error;

      toast.success('Collection created');
      setShowCreateDialog(false);
      loadCollections();
    } catch (error: any) {
      toast.error(error.message || 'Failed to create collection');
    }
  };

  if (loading) {
    return (
      <div className={cn('space-y-3', className)}>
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonCard key={i} lines={2} />
        ))}
      </div>
    );
  }

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-lg">Collections</h3>
        </div>
        {user && (
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Create
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Collection</DialogTitle>
                <DialogDescription>
                  Organize content into curated collections
                </DialogDescription>
              </DialogHeader>
              <CreateCollectionForm onSubmit={handleCreateCollection} />
            </DialogContent>
          </Dialog>
        )}
      </div>

      {collections.length === 0 ? (
        <div className="premium-card p-6 text-center">
          <FolderPlus className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <p className="text-muted-foreground mb-2">No collections yet</p>
          {user && (
            <Button onClick={() => setShowCreateDialog(true)} size="sm" variant="outline">
              Create your first collection
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-3">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              to={`/collections/${collection.id}`}
              className="block p-4 rounded-lg border border-border/50 hover:border-primary/30 hover:bg-secondary/50 transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm mb-1">{collection.title}</h4>
                  {collection.description && (
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                      {collection.description}
                    </p>
                  )}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      {collection.item_count} items
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {collection.follower_count} followers
                    </span>
                    {collection.is_public && (
                      <span className="text-primary">Public</span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function CreateCollectionForm({
  onSubmit,
}: {
  onSubmit: (title: string, description: string, isPublic: boolean) => void;
}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit(title, description, isPublic);
    setTitle('');
    setDescription('');
    setIsPublic(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Beginner's Guide to Crypto"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description (optional)</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe what this collection contains..."
          rows={3}
        />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="public">Make collection public</Label>
        <Switch id="public" checked={isPublic} onCheckedChange={setIsPublic} />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="submit">Create Collection</Button>
      </div>
    </form>
  );
}

