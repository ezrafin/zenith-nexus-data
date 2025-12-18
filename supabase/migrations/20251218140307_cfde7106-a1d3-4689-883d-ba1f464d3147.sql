-- Add foreign key constraints for forum tables to fix profile joins

-- First, add the foreign key constraint for forum_discussions
ALTER TABLE forum_discussions 
ADD CONSTRAINT forum_discussions_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE SET NULL;

-- Add the foreign key constraint for forum_replies
ALTER TABLE forum_replies 
ADD CONSTRAINT forum_replies_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE SET NULL;