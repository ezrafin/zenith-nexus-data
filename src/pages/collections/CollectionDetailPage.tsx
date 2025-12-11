import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { useUser } from '@/context/UserContext';
import { BookOpen, Plus, Trash2, FileText, MessageSquare, Video, Newspaper, ArrowLeft, Users, Lock, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SkeletonCard } from '@/components/ui/skeleton-card';
import { toast } from 'sonner';
import { UserAvatar } from '@/components/user/UserAvatar';

interface Collection {
  id: string;
  title: string;
  description: string | null;
  is_public: boolean;
  cover_image_url: string | null;
  created_at: string;
  user_id: string;
  user_profiles?: {
    display_name: string | null;
    username: string | null;
    avatar_url: string | null;
  };
}

interface CollectionItem {
  id: string;
  content_type: string;
  content_id: string;
  added_at: string;
  notes: string | null;
  title?: string;
}

// Mock data for collections (content_collections table not available)
const mockCollections: Record<string, Collection> = {
  '1': {
    id: '1',
    title: 'Investment Fundamentals',
    description: 'Essential articles and discussions about investment basics',
    is_public: true,
    cover_image_url: null,
    created_at: new Date().toISOString(),
    user_id: 'mock-user',
    user_profiles: {
      display_name: 'Market Expert',
      username: 'marketexpert',
      avatar_url: null,
    },
  },
};

const mockItems: CollectionItem[] = [
  {
    id: '1',
    content_type: 'article',
    content_id: '1',
    added_at: new Date().toISOString(),
    notes: 'Great introduction to investing',
    title: 'Understanding Market Basics',
  },
  {
    id: '2',
    content_type: 'forum',
    content_id: '1',
    added_at: new Date().toISOString(),
    notes: null,
    title: 'Discussion: Best strategies for beginners',
  },
];

export default function CollectionDetailPage() {
  const { id } = useParams();
  const { user } = useUser();
  const [collection, setCollection] = useState<Collection | null>(null);
  const [items, setItems] = useState<CollectionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (id) {
      loadCollection();
    }
  }, [id, user]);

  const loadCollection = async () => {
    if (!id) return;

    setLoading(true);
    // Mock implementation - content_collections table not available
    setTimeout(() => {
      const mockCollection = mockCollections[id] || mockCollections['1'];
      setCollection(mockCollection);
      setItems(mockItems);
      setLoading(false);
    }, 500);
  };

  const toggleFollow = async () => {
    if (!user || !id) {
      toast.error('Please sign in to follow collections');
      return;
    }
    // Mock implementation
    setIsFollowing(!isFollowing);
    toast.success(isFollowing ? 'Unfollowed collection' : 'Following collection');
  };

  const removeItem = async (itemId: string) => {
    if (!user || !collection || collection.user_id !== user.id) return;
    // Mock implementation
    setItems((prev) => prev.filter((item) => item.id !== itemId));
    toast.success('Item removed');
  };

  const getItemLink = (item: CollectionItem) => {
    switch (item.content_type) {
      case 'forum':
        return `/forum/${item.content_id}`;
      case 'article':
        return `/news/${item.content_id}`;
      case 'video':
        return `/video/${item.content_id}`;
      case 'analytics':
        return `/analytics/${item.content_id}`;
      default:
        return '#';
    }
  };

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <Newspaper className="h-4 w-4" />;
      case 'forum':
        return <MessageSquare className="h-4 w-4" />;
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'analytics':
        return <FileText className="h-4 w-4" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="section-spacing">
          <div className="container-wide max-w-4xl">
            <SkeletonCard lines={4} />
          </div>
        </div>
      </Layout>
    );
  }

  if (!collection) {
    return (
      <Layout>
        <div className="section-spacing">
          <div className="container-wide max-w-4xl text-center">
            <h1 className="heading-lg mb-4">Collection not found</h1>
            <Link to="/community" className="text-primary hover:underline">
              Return to community
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const isOwner = user?.id === collection.user_id;

  return (
    <Layout>
      <div className="section-spacing">
        <div className="container-wide max-w-4xl">
          <Link
            to="/community"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Community
          </Link>

          {/* Collection Header */}
          <div className="premium-card p-6 md:p-8 mb-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <h1 className="heading-md">{collection.title}</h1>
                  {collection.is_public ? (
                    <Globe className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Lock className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                {collection.description && (
                  <p className="text-muted-foreground mb-4">{collection.description}</p>
                )}
                {collection.user_profiles && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Created by</span>
                    <UserAvatar
                      profile={{
                        id: collection.user_id,
                        display_name: collection.user_profiles.display_name,
                        username: collection.user_profiles.username,
                        avatar_url: collection.user_profiles.avatar_url,
                        reputation: 0,
                        post_count: 0,
                        comment_count: 0,
                        bio: null,
                        privacy_level: 'public',
                      }}
                      size="sm"
                    />
                    <Link
                      to={`/users/${collection.user_id}`}
                      className="hover:text-primary transition-colors"
                    >
                      {collection.user_profiles.display_name || collection.user_profiles.username || 'Anonymous'}
                    </Link>
                  </div>
                )}
              </div>
              {!isOwner && user && (
                <Button variant={isFollowing ? 'outline' : 'default'} onClick={toggleFollow}>
                  {isFollowing ? (
                    <>
                      <Users className="h-4 w-4 mr-2" />
                      Following
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Follow
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* Collection Items */}
          <div className="premium-card p-6">
            <h2 className="font-heading font-semibold text-lg mb-6">
              Items ({items.length})
            </h2>

            {items.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No items in this collection yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-3 p-3 rounded-lg border border-border/50 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      {getItemIcon(item.content_type)}
                    </div>
                    <Link to={getItemLink(item)} className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm mb-1 hover:text-primary transition-colors">
                        {item.title || 'Untitled'}
                      </h4>
                      {item.notes && (
                        <p className="text-xs text-muted-foreground">{item.notes}</p>
                      )}
                      <div className="text-xs text-muted-foreground mt-1">
                        Added {new Date(item.added_at).toLocaleDateString()}
                      </div>
                    </Link>
                    {isOwner && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
