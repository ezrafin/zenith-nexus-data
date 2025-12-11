-- Remove notification preferences from user_preferences table
-- These fields are no longer used in the application

-- Drop columns if they exist
ALTER TABLE public.user_preferences 
DROP COLUMN IF EXISTS email_notifications,
DROP COLUMN IF EXISTS push_notifications;

