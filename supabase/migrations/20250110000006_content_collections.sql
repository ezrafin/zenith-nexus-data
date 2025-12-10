-- Content Collections System

CREATE TABLE IF NOT EXISTS public.content_collections (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    title text NOT NULL,
    description text,
    is_public boolean DEFAULT false NOT NULL,
    cover_image_url text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.collection_items (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    collection_id uuid NOT NULL REFERENCES public.content_collections(id) ON DELETE CASCADE,
    content_type text NOT NULL,
    content_id uuid NOT NULL,
    added_at timestamp with time zone DEFAULT now() NOT NULL,
    notes text,
    UNIQUE(collection_id, content_type, content_id),
    CONSTRAINT collection_items_content_type_check CHECK ((content_type = ANY (ARRAY['article'::text, 'analytics'::text, 'video'::text, 'forum'::text])))
);

CREATE TABLE IF NOT EXISTS public.collection_follows (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    collection_id uuid NOT NULL REFERENCES public.content_collections(id) ON DELETE CASCADE,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    UNIQUE(user_id, collection_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_content_collections_user_id ON public.content_collections(user_id);
CREATE INDEX IF NOT EXISTS idx_content_collections_public ON public.content_collections(is_public, created_at) WHERE is_public = true;
CREATE INDEX IF NOT EXISTS idx_collection_items_collection_id ON public.collection_items(collection_id);
CREATE INDEX IF NOT EXISTS idx_collection_items_content ON public.collection_items(content_type, content_id);
CREATE INDEX IF NOT EXISTS idx_collection_follows_user_id ON public.collection_follows(user_id);
CREATE INDEX IF NOT EXISTS idx_collection_follows_collection_id ON public.collection_follows(collection_id);

-- Enable RLS
ALTER TABLE public.content_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collection_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collection_follows ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view public collections" ON public.content_collections
    FOR SELECT USING (is_public = true OR user_id = auth.uid());

CREATE POLICY "Users can create collections" ON public.content_collections
    FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own collections" ON public.content_collections
    FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can delete own collections" ON public.content_collections
    FOR DELETE USING (user_id = auth.uid());

CREATE POLICY "Users can view items in accessible collections" ON public.collection_items
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.content_collections
            WHERE id = collection_id
            AND (is_public = true OR user_id = auth.uid())
        )
    );

CREATE POLICY "Users can add items to own collections" ON public.collection_items
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.content_collections
            WHERE id = collection_id
            AND user_id = auth.uid()
        )
    );

CREATE POLICY "Users can remove items from own collections" ON public.collection_items
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.content_collections
            WHERE id = collection_id
            AND user_id = auth.uid()
        )
    );

CREATE POLICY "Users can view collection follows" ON public.collection_follows
    FOR SELECT USING (true);

CREATE POLICY "Users can manage own follows" ON public.collection_follows
    FOR ALL USING (user_id = auth.uid());

