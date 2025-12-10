-- Watchlists and Market Alerts Migration

-- Watchlists Table
CREATE TABLE IF NOT EXISTS public.watchlists (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name text NOT NULL,
    description text,
    is_default boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Watchlist Items Table
CREATE TABLE IF NOT EXISTS public.watchlist_items (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    watchlist_id uuid NOT NULL REFERENCES public.watchlists(id) ON DELETE CASCADE,
    symbol text NOT NULL,
    market_type text NOT NULL,
    added_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT watchlist_items_market_type_check CHECK ((market_type = ANY (ARRAY['indices'::text, 'stocks'::text, 'crypto'::text, 'commodities'::text, 'currencies'::text]))),
    UNIQUE(watchlist_id, symbol, market_type)
);

-- Market Alerts Table
CREATE TABLE IF NOT EXISTS public.market_alerts (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    symbol text NOT NULL,
    market_type text NOT NULL,
    alert_type text NOT NULL,
    target_value numeric,
    target_percent numeric,
    is_active boolean DEFAULT true NOT NULL,
    triggered_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT market_alerts_market_type_check CHECK ((market_type = ANY (ARRAY['indices'::text, 'stocks'::text, 'crypto'::text, 'commodities'::text, 'currencies'::text]))),
    CONSTRAINT market_alerts_alert_type_check CHECK ((alert_type = ANY (ARRAY['price_above'::text, 'price_below'::text, 'percent_change_up'::text, 'percent_change_down'::text])))
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_watchlists_user_id ON public.watchlists(user_id);
CREATE INDEX IF NOT EXISTS idx_watchlist_items_watchlist_id ON public.watchlist_items(watchlist_id);
CREATE INDEX IF NOT EXISTS idx_market_alerts_user_id ON public.market_alerts(user_id);
CREATE INDEX IF NOT EXISTS idx_market_alerts_active ON public.market_alerts(is_active) WHERE is_active = true;

-- Enable RLS
ALTER TABLE public.watchlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.watchlist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.market_alerts ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own watchlists" ON public.watchlists
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can manage own watchlists" ON public.watchlists
    FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Users can view own watchlist items" ON public.watchlist_items
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.watchlists
            WHERE watchlists.id = watchlist_items.watchlist_id
            AND watchlists.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can manage own watchlist items" ON public.watchlist_items
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.watchlists
            WHERE watchlists.id = watchlist_items.watchlist_id
            AND watchlists.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can view own alerts" ON public.market_alerts
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can manage own alerts" ON public.market_alerts
    FOR ALL USING (user_id = auth.uid());

-- Function to ensure only one default watchlist per user
CREATE OR REPLACE FUNCTION ensure_single_default_watchlist()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.is_default = true THEN
        UPDATE public.watchlists
        SET is_default = false
        WHERE user_id = NEW.user_id
        AND id != NEW.id
        AND is_default = true;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for default watchlist
DROP TRIGGER IF EXISTS trigger_ensure_single_default_watchlist ON public.watchlists;
CREATE TRIGGER trigger_ensure_single_default_watchlist
    BEFORE INSERT OR UPDATE ON public.watchlists
    FOR EACH ROW
    EXECUTE FUNCTION ensure_single_default_watchlist();

