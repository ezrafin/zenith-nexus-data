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
import { useTranslation } from '@/hooks/useTranslation';
import { usePageBillCollection } from '@/hooks/usePageBillCollection';
import { useCollectibleBills } from '@/hooks/useCollectibleBills';

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
  const { t } = useTranslation({ namespace: 'ui' });
  const [watchlists, setWatchlists] = useState<Watchlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [newWatchlistName, setNewWatchlistName] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [discussions, setDiscussions] = useState<ForumTopic[]>([]);
  const [discussionsLoading, setDiscussionsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  
  // Bill collection: watchlists_page_visit
  const { collectBill } = useCollectibleBills();
  const { CoinComponent } = usePageBillCollection({ billId: 'watchlists_page_visit' });

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
      setLoadError(t('watchlistPage.timeoutError'));
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
      setLoadError(error?.message || t('watchlistPage.loadError'));
      toast.error(t('watchlistPage.loadError'));
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
      toast.success(t('watchlistPage.createSuccess'));
    } catch (error: any) {
      toast.error(error.message || t('watchlistPage.createError'));
    }
  };

  const deleteWatchlist = async (id: string) => {
    try {
      const { error } = await supabase.from('watchlists').delete().eq('id', id);
      if (error) throw error;

      setWatchlists(watchlists.filter((w) => w.id !== id));
      toast.success(t('watchlistPage.deleteSuccess'));
    } catch (error) {
      toast.error(t('watchlistPage.deleteError'));
    }
  };

  const deleteWatchlistItem = async (watchlistId: string, itemId: string) => {
    try {
      const { error } = await supabase.from('watchlist_items').delete().eq('id', itemId);
      if (error) throw error;

      setWatchlists(watchlists.map((w) => 
        w.id === watchlistId 
          ? { ...w, items: w.items.filter((item) => item.id !== itemId) }
          : w
      ));
      toast.success(t('watchlistPage.itemDeleteSuccess', { defaultValue: 'Item removed from watchlist' }));
    } catch (error) {
      toast.error(t('watchlistPage.itemDeleteError', { defaultValue: 'Failed to remove item' }));
    }
  };

  if (!user) {
    return (
      <Layout>
        <SEOHead
          title={t('watchlistPage.signedOutTitle')}
          description={t('watchlistPage.signedOutDescription')}
        />
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="heading-lg mb-4">{t('watchlistPage.pleaseSignIn')}</h1>
            <p className="text-muted-foreground mb-6">{t('watchlistPage.needSignIn')}</p>
            <Link to="/auth/login">
              <Button>{t('watchlistPage.signInButton')}</Button>
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
          title={t('watchlistPage.seoTitle')}
          description={t('watchlistPage.seoDescription')}
        />
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">{t('watchlistPage.loading')}</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (loadError) {
    return (
      <Layout>
        <SEOHead
          title={t('watchlistPage.seoTitle')}
          description={t('watchlistPage.seoDescription')}
        />
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h2 className="font-semibold text-lg mb-2">{t('watchlistPage.loadError')}</h2>
            <p className="text-muted-foreground mb-6">{loadError}</p>
            <Button onClick={() => loadWatchlists()}>
              {t('buttons.retry', { defaultValue: 'Try Again' })}
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEOHead
        title={t('watchlistPage.seoTitle')}
        description={t('watchlistPage.seoDescription')}
      />
      <div className="section-spacing">
        <div className="container-wide max-w-6xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="heading-lg mb-2">{t('watchlistPage.yourWatchlists')}</h1>
              <p className="text-muted-foreground">{t('watchlistPage.seoDescription')}</p>
            </div>
            <Button onClick={() => setShowCreateForm(!showCreateForm)} className="self-start sm:self-auto">
              <Plus className="mr-2 h-4 w-4" />
              {t('watchlistPage.createToggle')}
            </Button>
          </div>

          {/* Create Form */}
          {showCreateForm && (
            <div className="premium-card p-6 mb-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="watchlist-name">{t('watchlistPage.newWatchlistLabel')}</Label>
                  <Input
                    id="watchlist-name"
                    value={newWatchlistName}
                    onChange={(e) => setNewWatchlistName(e.target.value)}
                    placeholder={t('watchlistPage.newWatchlistPlaceholder')}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') createWatchlist();
                    }}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Button onClick={createWatchlist} disabled={!newWatchlistName.trim()}>
                    {t('watchlistPage.createButton')}
                  </Button>
                  <Button variant="outline" onClick={() => {
                    setShowCreateForm(false);
                    setNewWatchlistName('');
                  }}>
                    {t('buttons.cancel')}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Watchlists */}
          {watchlists.length === 0 ? (
            <div className="premium-card p-12 text-center">
              <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">{t('watchlistPage.emptyState')}</h3>
                <p className="text-muted-foreground mb-6">
                  {t('watchlistPage.seoDescription')}
                </p>
              <Button onClick={() => setShowCreateForm(true)}>
                <Plus className="mr-2 h-4 w-4" />
                  {t('watchlistPage.createButton')}
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {watchlists.map((watchlist) => (
                <WatchlistCard
                  key={watchlist.id}
                  watchlist={watchlist}
                  onDelete={deleteWatchlist}
                  onDeleteItem={deleteWatchlistItem}
                />
              ))}
            </div>
          )}

          {/* Discussions Section */}
          {watchlists.length > 0 && (
            <div className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="heading-md mb-2">{t('watchlistPage.discussionsTitle')}</h2>
                  <p className="text-muted-foreground text-sm">
                    {t('watchlistPage.discussionsSubtitle')}
                  </p>
                </div>
              </div>

              {discussionsLoading ? (
                <div className="premium-card p-6 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-muted-foreground">{t('watchlistPage.discussionsLoading')}</p>
                </div>
              ) : discussions.length === 0 ? (
                <div className="premium-card p-6 text-center">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground mb-2">{t('watchlistPage.discussionsNoneTitle')}</p>
                  <p className="text-sm text-muted-foreground">
                    {t('watchlistPage.discussionsNoneSubtitle')}
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
      {CoinComponent && <CoinComponent />}
    </Layout>
  );
}

function WatchlistCard({ watchlist, onDelete, onDeleteItem }: { watchlist: Watchlist; onDelete: (id: string) => void; onDeleteItem: (watchlistId: string, itemId: string) => void }) {
  const { t } = useTranslation({ namespace: 'ui' });

  return (
    <div className="premium-card p-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-lg">{watchlist.name}</h3>
            {watchlist.is_default && (
              <span className="badge-primary text-xs">{t('watchlistPage.defaultLabel')}</span>
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
          <p className="mb-4">{t('watchlistPage.noItems')}</p>
          <Link to="/markets/indices">
            <Button variant="outline" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              {t('watchlistPage.addInstruments')}
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-2">
          {watchlist.items.map((item) => (
            <WatchlistItemRow key={item.id} item={item} watchlistId={watchlist.id} onDelete={onDeleteItem} />
          ))}
        </div>
      )}
    </div>
  );
}

function WatchlistItemRow({ item, watchlistId, onDelete }: { item: WatchlistItem; watchlistId: string; onDelete: (watchlistId: string, itemId: string) => void }) {
  const [price, setPrice] = useState<{ price: number; changePercent: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation({ namespace: 'ui' });
  const Icon = marketIcons[item.market_type as keyof typeof marketIcons] || TrendingUp;

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('fetch-asset-price', {
          body: { symbol: item.symbol, marketType: item.market_type }
        });
        
        if (!error && data?.price) {
          setPrice({ price: data.price, changePercent: data.changePercent || 0 });
        }
      } catch (err) {
        console.error('Error fetching price:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();
  }, [item.symbol, item.market_type]);

  const formatPrice = (value: number) => {
    if (value >= 1000) {
      return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    if (value >= 1) {
      return `$${value.toFixed(2)}`;
    }
    return `$${value.toFixed(4)}`;
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(watchlistId, item.id);
  };

  return (
    <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-secondary/50 transition-colors gap-2">
      <Link
        to={`/markets/${item.market_type}`}
        className="flex items-center justify-between flex-1 min-w-0"
      >
        <div className="flex items-center gap-3 min-w-0">
          <Icon className="h-5 w-5 text-primary flex-shrink-0" />
          <div className="min-w-0">
            <span className="font-mono font-medium">{item.symbol}</span>
            <span className="text-xs text-muted-foreground ml-2 capitalize">
              {t(`watchlistPage.marketType.${item.market_type as keyof typeof marketIcons}`) || item.market_type}
            </span>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          {loading ? (
            <div className="h-5 w-16 bg-muted animate-pulse rounded"></div>
          ) : price ? (
            <div className="flex flex-col items-end">
              <span className="font-mono font-semibold">{formatPrice(price.price)}</span>
              {price.changePercent !== 0 && (
                <span className={`text-xs ${price.changePercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {price.changePercent >= 0 ? '+' : ''}{price.changePercent.toFixed(2)}%
                </span>
              )}
            </div>
          ) : (
            <Button variant="ghost" size="sm">
              {t('buttons.view', { defaultValue: 'View' })}
            </Button>
          )}
        </div>
      </Link>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleDelete}
        className="text-destructive hover:text-destructive flex-shrink-0"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}

