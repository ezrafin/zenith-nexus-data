-- Add new_article_by_followed_author notification type
-- Drop and recreate the constraint to add new notification type
ALTER TABLE public.notifications
DROP CONSTRAINT IF EXISTS notifications_type_check;

ALTER TABLE public.notifications
ADD CONSTRAINT notifications_type_check CHECK (
  type = ANY (ARRAY[
    'reply_to_discussion'::text,
    'reaction_to_post'::text,
    'reaction_to_reply'::text,
    'new_follower'::text,
    'mention'::text,
    'moderation_discussion_approved'::text,
    'moderation_discussion_rejected'::text,
    'moderation_reply_approved'::text,
    'moderation_reply_rejected'::text,
    'new_comment_on_discussion'::text,
    'new_article_by_followed_author'::text
  ])
);

