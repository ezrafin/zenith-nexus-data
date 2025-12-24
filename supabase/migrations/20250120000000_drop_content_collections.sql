-- Drop Content Collections System
-- This migration removes all tables, indexes, and policies related to content collections

-- Drop policies first
DROP POLICY IF EXISTS "Users can view public collections" ON public.content_collections;
DROP POLICY IF EXISTS "Users can create collections" ON public.content_collections;
DROP POLICY IF EXISTS "Users can update own collections" ON public.content_collections;
DROP POLICY IF EXISTS "Users can delete own collections" ON public.content_collections;
DROP POLICY IF EXISTS "Users can view items in accessible collections" ON public.collection_items;
DROP POLICY IF EXISTS "Users can add items to own collections" ON public.collection_items;
DROP POLICY IF EXISTS "Users can remove items from own collections" ON public.collection_items;
DROP POLICY IF EXISTS "Users can view collection follows" ON public.collection_follows;
DROP POLICY IF EXISTS "Users can manage own follows" ON public.collection_follows;

DROP POLICY IF EXISTS "Public collections are viewable by everyone" ON public.content_collections;
DROP POLICY IF EXISTS "Users can create own collections" ON public.content_collections;
DROP POLICY IF EXISTS "Users can update own collections" ON public.content_collections;
DROP POLICY IF EXISTS "Users can delete own collections" ON public.content_collections;
DROP POLICY IF EXISTS "Collection items viewable if collection is viewable" ON public.content_collection_items;
DROP POLICY IF EXISTS "Users can add items to own collections" ON public.content_collection_items;
DROP POLICY IF EXISTS "Users can update items in own collections" ON public.content_collection_items;
DROP POLICY IF EXISTS "Users can delete items from own collections" ON public.content_collection_items;

-- Drop triggers
DROP TRIGGER IF EXISTS update_content_collections_updated_at ON public.content_collections;

-- Drop indexes
DROP INDEX IF EXISTS idx_content_collections_user_id;
DROP INDEX IF EXISTS idx_content_collections_public;
DROP INDEX IF EXISTS idx_content_collections_is_public;
DROP INDEX IF EXISTS idx_collection_items_collection_id;
DROP INDEX IF EXISTS idx_collection_items_content;
DROP INDEX IF EXISTS idx_collection_follows_user_id;
DROP INDEX IF EXISTS idx_collection_follows_collection_id;
DROP INDEX IF EXISTS idx_content_collection_items_collection_id;

-- Drop tables (CASCADE will handle foreign key constraints)
DROP TABLE IF EXISTS public.collection_follows CASCADE;
DROP TABLE IF EXISTS public.collection_items CASCADE;
DROP TABLE IF EXISTS public.content_collection_items CASCADE;
DROP TABLE IF EXISTS public.content_collections CASCADE;

