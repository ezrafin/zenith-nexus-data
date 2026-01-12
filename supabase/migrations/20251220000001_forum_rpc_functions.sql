-- Forum RPC Functions for Pagination and Popular Topics
-- These functions optimize forum queries by using indexes and avoiding heavy client-side sorting

-- RPC function for paginated forum topics with cursor-based pagination
CREATE OR REPLACE FUNCTION public.get_forum_topics(
  p_category text DEFAULT NULL,
  p_cursor timestamp with time zone DEFAULT NULL,
  p_page_size integer DEFAULT 20
)
RETURNS TABLE (
  id uuid,
  title text,
  content text,
  author_name text,
  category text,
  reply_count integer,
  view_count integer,
  like_count integer,
  is_pinned boolean,
  created_at timestamp with time zone,
  updated_at timestamp with time zone,
  user_id uuid,
  tags text[]
)
LANGUAGE plpgsql
STABLE
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    d.id,
    d.title,
    d.content,
    d.author_name,
    d.category,
    d.reply_count,
    d.view_count,
    d.like_count,
    d.is_pinned,
    d.created_at,
    d.updated_at,
    d.user_id,
    d.tags
  FROM public.forum_discussions d
  WHERE 
    (p_category IS NULL OR d.category = p_category)
    AND (p_cursor IS NULL OR d.created_at < p_cursor)
    AND d.status = 'approved' -- Only show approved discussions
  ORDER BY 
    d.is_pinned DESC,
    d.created_at DESC
  LIMIT p_page_size;
END;
$$;

-- RPC function for popular forum topics (based on engagement metrics)
CREATE OR REPLACE FUNCTION public.get_popular_forum_topics(
  p_category text DEFAULT NULL,
  p_limit integer DEFAULT 10
)
RETURNS TABLE (
  id uuid,
  title text,
  content text,
  author_name text,
  category text,
  reply_count integer,
  view_count integer,
  like_count integer,
  is_pinned boolean,
  created_at timestamp with time zone,
  updated_at timestamp with time zone,
  user_id uuid,
  tags text[],
  popularity_score numeric
)
LANGUAGE plpgsql
STABLE
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    d.id,
    d.title,
    d.content,
    d.author_name,
    d.category,
    d.reply_count,
    d.view_count,
    d.like_count,
    d.is_pinned,
    d.created_at,
    d.updated_at,
    d.user_id,
    d.tags,
    -- Popularity score: weighted combination of replies, views, and likes
    -- Recent posts get a boost (decay factor based on days since creation)
    (
      (d.reply_count * 2.0) + 
      (d.view_count * 0.1) + 
      (d.like_count * 3.0) +
      (CASE 
        WHEN d.created_at > NOW() - INTERVAL '7 days' THEN 10.0
        WHEN d.created_at > NOW() - INTERVAL '30 days' THEN 5.0
        ELSE 0.0
      END)
    )::numeric AS popularity_score
  FROM public.forum_discussions d
  WHERE 
    (p_category IS NULL OR d.category = p_category)
    AND d.status = 'approved' -- Only show approved discussions
    AND d.created_at > NOW() - INTERVAL '90 days' -- Only consider recent topics
  ORDER BY 
    popularity_score DESC,
    d.created_at DESC
  LIMIT p_limit;
END;
$$;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION public.get_forum_topics TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_forum_topics TO anon;
GRANT EXECUTE ON FUNCTION public.get_popular_forum_topics TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_popular_forum_topics TO anon;

