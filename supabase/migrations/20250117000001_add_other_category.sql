-- Add "Other" category to forum_categories
INSERT INTO public.forum_categories (name, slug, description, icon, topic_count) 
VALUES ('Other', 'other', 'Topics that don''t fit into other categories', 'MoreHorizontal', 0)
ON CONFLICT (slug) DO NOTHING;

