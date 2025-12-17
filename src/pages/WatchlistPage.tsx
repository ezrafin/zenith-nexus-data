import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Plus, Trash2, Star, AlertCircle, TrendingUp, BarChart3, Coins, Bitcoin, DollarSign, MessageSquare } from 'lucide-react';
import { MarketData } from '@/lib/api/types';
import { Link } from 'react-router-dom';
import { SEOHead } from '@/components/seo/SEOHead';
import { fetchDiscussionsForWatchlist, ForumTopic } from '@/lib/api/index';
import { AssetBadge } from '@/components/forum/AssetBadge';

interface Watchlist {
  id: string;
  name: string;
  description: string | null;
  is_default: boolean | null;
  items: WatchlistItem[];
}

interface WatchlistItem {
  id: string;
  symbol: string;
  market_type: string;
}

const marketIcons = {
  indices: TrendingUp,
  stocks: BarChart3,
  crypto: Bitcoin,
  commodities: Coins,
  currencies: DollarSign,
};

export default function WatchlistPage() {
  const { user, loading: authLoading } = useUser();
  const [watchlists, setWatchlists] = useState<Watchlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [newWatchlistName, setNewWatchlistName] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [discussions, setDiscussions] = useState<ForumTopic[]>([]);
  const [discussionsLoading, setDiscussionsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    // Wait for auth to finish loading before deciding what to do
    if (authLoading) return;
    
    if (user) {
      loadWatchlists();
    } else {
      setLoading(false);
    }
  }, [user, authLoading]);

  const loadDiscussions = async () => {
    if (!user) return;
    setDiscussionsLoading(true);
    try {
      const data = await fetchDiscussionsForWatchlist(user.id);
      setDiscussions(data);
    } catch (error) {
      console.error('Error loading discussions:', error);
    } finally {
      setDiscussionsLoading(false);
    }
  };

  const loadWatchlists = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setLoadError(null);

    // Add timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      setLoading(false);
      setLoadError('Request timed out. Please try again.');
    }, 15000);

    try {
      const { data: watchlistsData, error: watchlistsError } = await supabase
        .from('watchlists')
        .select('*')
        .eq('user_id', user.id)
        .order('is_default', { ascending: false })
        .order('created_at', { ascending: false });

      if (watchlistsError) throw watchlistsError;

      const watchlistsWithItems = await Promise.all(
        (watchlistsData || []).map(async (watchlist) => {
          const { data: itemsData } = await supabase
            .from('watchlist_items')
            .select('*')
            .eq('watchlist_id', watchlist.id);

          return {
            ...watchlist,
            items: itemsData || [],
          };
        })
      );

      clearTimeout(timeoutId);
      setWatchlists(watchlistsWithItems as Watchlist[]);
      
      // Load discussions after watchlists are loaded
      loadDiscussions();
    } catch (error: any) {
      clearTimeout(timeoutId);
      console.error('Error loading watchlists:', error);
      setLoadError(error?.message || 'Failed to load watchlists');
      toast.error('Failed to load watchlists');
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
    }
  };

  const createWatchlist = async () => {
    if (!user || !newWatchlistName.trim()) return;

    try {
      const { data, error } = await supabase
        .from('watchlists')
        .insert({
          user_id: user.id,
          name: newWatchlistName.trim(),
          is_default: watchlists.length === 0, // First watchlist is default
        })
        .select()
        .single();

      if (error) throw error;

      setWatchlists([...watchlists, { ...data, items: [] }]);
      setNewWatchlistName('');
      setShowCreateForm(false);
      toast.success('Watchlist created');
    } catch (error: any) {
      toast.error(error.message || 'Failed to create watchlist');
    }
  };

  const deleteWatchlist = async (id: string) => {
    try {
      const { error } = await supabase.from('watchlists').delete().eq('id', id);
      if (error) throw error;

      setWatchlists(watchlists.filter((w) => w.id !== id));
      toast.success('Watchlist deleted');
    } catch (error) {
      toast.error('Failed to delete watchlist');
    }
  };

  if (!user) {
    return (
      <Layout>
        <SEOHead
          title="Watchlists — Sign in to track your assets"
          description="Create and manage personalized watchlists to monitor your favorite market instruments."
        />
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="heading-lg mb-4">Please sign in</h1>
            <p className="text-muted-foreground mb-6">You need to be signed in to manage watchlists.</p>
            <Link to="/auth/login">
              <Button>Sign in</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  if (loading || authLoading) {
    return (
      <Layout>
        <SEOHead
          title="Watchlists — INVESTOPATRONUS"
          description="Create and manage personalized watchlists to monitor your favorite market instruments."
        />
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading watchlists...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (loadError) {
    return (
      <Layout>
        <SEOHead
          title="Watchlists — INVESTOPATRONUS"
          description="Create and manage personalized watchlists to monitor your favorite market instruments."
        />
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h2 className="font-semibold text-lg mb-2">Failed to load watchlists</h2>
            <p className="text-muted-foreground mb-6">{loadError}</p>
            <Button onClick={() => loadWatchlists()}>
              Try Again
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEOHead
        title="My Watchlists — INVESTOPATRONUS"
        description="Create and manage personalized watchlists to monitor your favorite market instruments."
      />
      <div className="section-spacing">
        <div className="container-wide max-w-6xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="heading-lg mb-2">My Watchlists</h1>
              <p className="text-muted-foreground">Track your favorite market instruments</p>
            </div>
            <Button onClick={() => setShowCreateForm(!showCreateForm)} className="self-start sm:self-auto">
              <Plus className="mr-2 h-4 w-4" />
              New Watchlist
            </Button>
          </div>

          {/* Create Form */}
          {showCreateForm && (
            <div className="premium-card p-6 mb-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="watchlist-name">Watchlist Name</Label>
                  <Input
                    id="watchlist-name"
                    value={newWatchlistName}
                    onChange={(e) => setNewWatchlistName(e.target.value)}
                    placeholder="e.g., Tech Stocks, Crypto Long-term"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') createWatchlist();
                    }}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Button onClick={createWatchlist} disabled={!newWatchlistName.trim()}>
                    Create
                  </Button>
                  <Button variant="outline" onClick={() => {
                    setShowCreateForm(false);
                    setNewWatchlistName('');
                  }}>
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Watchlists */}
          {watchlists.length === 0 ? (
            <div className="premium-card p-12 text-center">
              <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">No watchlists yet</h3>
              <p className="text-muted-foreground mb-6">
                Create your first watchlist to start tracking market instruments
              </p>
              <Button onClick={() => setShowCreateForm(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create Watchlist
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {watchlists.map((watchlist) => (
                <WatchlistCard
                  key={watchlist.id}
                  watchlist={watchlist}
                  onDelete={deleteWatchlist}
                />
              ))}
            </div>
          )}

          {/* Discussions Section */}
          {watchlists.length > 0 && (
            <div className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="heading-md mb-2">Discussions for Your Watchlist Assets</h2>
                  <p className="text-muted-foreground text-sm">
                    Forum discussions related to assets in your watchlists
                  </p>
                </div>
              </div>

              {discussionsLoading ? (
                <div className="premium-card p-6 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Loading discussions...</p>
                </div>
              ) : discussions.length === 0 ? (
                <div className="premium-card p-6 text-center">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground mb-2">No discussions found</p>
                  <p className="text-sm text-muted-foreground">
                    Start a discussion about one of your watchlist assets to see it here
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {discussions.map((discussion) => (
                    <Link
                      key={discussion.id}
                      to={`/forum/${discussion.id}`}
                      className="block premium-card p-4 hover:border-primary/30 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium mb-2 line-clamp-1">{discussion.title}</h3>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs text-muted-foreground">
                              {discussion.author}
                            </span>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground">
                              {discussion.replies} replies
                            </span>
                            {discussion.symbol && (
                              <>
                                <span className="text-xs text-muted-foreground">•</span>
                                <AssetBadge symbol={discussion.symbol} assetType={discussion.asset_type} />
                              </>
                            )}
                          </div>
                        </div>
                        <MessageSquare className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

function WatchlistCard({ watchlist, onDelete }: { watchlist: Watchlist; onDelete: (id: string) => void }) {
  const [itemsData, setItemsData] = useState<Record<string, MarketData[]>>({});

  useEffect(() => {
    // Group items by market type and fetch data
    const grouped = watchlist.items.reduce((acc, item) => {
      if (!acc[item.market_type]) {
        acc[item.market_type] = [];
      }
      return acc;
    }, {} as Record<string, any>);

    // Fetch data for each market type
    Object.keys(grouped).forEach(async (marketType) => {
      // This would need to be implemented to fetch specific symbols
      // For now, we'll just show the structure
    });
  }, [watchlist.items]);

  return (
    <div className="premium-card p-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-lg">{watchlist.name}</h3>
            {watchlist.is_default && (
              <span className="badge-primary text-xs">Default</span>
            )}
          </div>
          {watchlist.description && (
            <p className="text-sm text-muted-foreground">{watchlist.description}</p>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(watchlist.id)}
          className="text-destructive hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {watchlist.items.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <p className="mb-4">No items in this watchlist</p>
          <Link to="/markets/indices">
            <Button variant="outline" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Instruments
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-2">
          {watchlist.items.map((item) => {
            const Icon = marketIcons[item.market_type as keyof typeof marketIcons] || TrendingUp;
            return (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-secondary/50"
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-primary" />
                  <div>
                    <span className="font-mono font-medium">{item.symbol}</span>
                    <span className="text-xs text-muted-foreground ml-2 capitalize">
                      {item.market_type}
                    </span>
                  </div>
                </div>
                <Link to={`/markets/${item.market_type}`}>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

