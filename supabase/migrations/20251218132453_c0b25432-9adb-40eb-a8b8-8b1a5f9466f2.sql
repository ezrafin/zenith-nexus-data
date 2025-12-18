-- =============================================
-- ACHIEVEMENT SYSTEM: Automatic Achievement Grants
-- =============================================

-- Function to grant achievement if not already unlocked
-- Uses EXISTS check on profiles since that has same ids as auth.users
CREATE OR REPLACE FUNCTION grant_achievement_if_not_exists(p_user_id uuid, p_achievement_id text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO user_achievements (user_id, achievement_id)
  SELECT p_user_id, p_achievement_id
  WHERE NOT EXISTS (
    SELECT 1 FROM user_achievements 
    WHERE user_id = p_user_id AND achievement_id = p_achievement_id
  );
EXCEPTION WHEN foreign_key_violation THEN
  -- User doesn't exist in auth.users, skip silently
  NULL;
END;
$$;

-- =============================================
-- TRIGGER: first_post - First forum discussion
-- =============================================
CREATE OR REPLACE FUNCTION trigger_first_post_achievement()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.user_id IS NOT NULL THEN
    PERFORM grant_achievement_if_not_exists(NEW.user_id, 'first_post');
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_discussion_first_post ON forum_discussions;
CREATE TRIGGER on_discussion_first_post
  AFTER INSERT ON forum_discussions
  FOR EACH ROW
  EXECUTE FUNCTION trigger_first_post_achievement();

-- =============================================
-- TRIGGER: first_reply - First forum reply
-- =============================================
CREATE OR REPLACE FUNCTION trigger_first_reply_achievement()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.user_id IS NOT NULL THEN
    PERFORM grant_achievement_if_not_exists(NEW.user_id, 'first_reply');
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_reply_first_reply ON forum_replies;
CREATE TRIGGER on_reply_first_reply
  AFTER INSERT ON forum_replies
  FOR EACH ROW
  EXECUTE FUNCTION trigger_first_reply_achievement();

-- =============================================
-- TRIGGER: top_contributor - 100 posts or replies
-- =============================================
CREATE OR REPLACE FUNCTION trigger_top_contributor_achievement()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  total_count integer;
  v_user_id uuid;
BEGIN
  v_user_id := NEW.user_id;
  
  IF v_user_id IS NULL THEN
    RETURN NEW;
  END IF;

  SELECT 
    (SELECT COUNT(*) FROM forum_discussions WHERE user_id = v_user_id) +
    (SELECT COUNT(*) FROM forum_replies WHERE user_id = v_user_id)
  INTO total_count;

  IF total_count >= 100 THEN
    PERFORM grant_achievement_if_not_exists(v_user_id, 'top_contributor');
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_discussion_top_contributor ON forum_discussions;
CREATE TRIGGER on_discussion_top_contributor
  AFTER INSERT ON forum_discussions
  FOR EACH ROW
  EXECUTE FUNCTION trigger_top_contributor_achievement();

DROP TRIGGER IF EXISTS on_reply_top_contributor ON forum_replies;
CREATE TRIGGER on_reply_top_contributor
  AFTER INSERT ON forum_replies
  FOR EACH ROW
  EXECUTE FUNCTION trigger_top_contributor_achievement();

-- =============================================
-- TRIGGER: Reaction-based achievements
-- =============================================
CREATE OR REPLACE FUNCTION trigger_reaction_achievements()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  target_user_id uuid;
  helpful_count integer;
  insightful_count integer;
  like_count integer;
BEGIN
  IF NEW.target_type = 'discussion' THEN
    SELECT user_id INTO target_user_id FROM forum_discussions WHERE id = NEW.target_id;
  ELSIF NEW.target_type = 'reply' THEN
    SELECT user_id INTO target_user_id FROM forum_replies WHERE id = NEW.target_id;
  END IF;

  IF target_user_id IS NULL THEN
    RETURN NEW;
  END IF;

  SELECT COUNT(*) INTO helpful_count
  FROM forum_reactions r
  LEFT JOIN forum_discussions d ON r.target_type = 'discussion' AND r.target_id = d.id
  LEFT JOIN forum_replies rep ON r.target_type = 'reply' AND r.target_id = rep.id
  WHERE r.reaction_type = 'helpful' 
    AND (d.user_id = target_user_id OR rep.user_id = target_user_id);

  SELECT COUNT(*) INTO insightful_count
  FROM forum_reactions r
  LEFT JOIN forum_discussions d ON r.target_type = 'discussion' AND r.target_id = d.id
  LEFT JOIN forum_replies rep ON r.target_type = 'reply' AND r.target_id = rep.id
  WHERE r.reaction_type = 'insightful'
    AND (d.user_id = target_user_id OR rep.user_id = target_user_id);

  SELECT COUNT(*) INTO like_count
  FROM forum_reactions r
  LEFT JOIN forum_discussions d ON r.target_type = 'discussion' AND r.target_id = d.id
  LEFT JOIN forum_replies rep ON r.target_type = 'reply' AND r.target_id = rep.id
  WHERE r.reaction_type = 'like'
    AND (d.user_id = target_user_id OR rep.user_id = target_user_id);

  IF helpful_count >= 10 THEN
    PERFORM grant_achievement_if_not_exists(target_user_id, 'helpful_answer');
  END IF;

  IF insightful_count >= 10 THEN
    PERFORM grant_achievement_if_not_exists(target_user_id, 'insightful_post');
  END IF;

  IF like_count >= 100 THEN
    PERFORM grant_achievement_if_not_exists(target_user_id, 'hundred_likes');
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_reaction_achievements ON forum_reactions;
CREATE TRIGGER on_reaction_achievements
  AFTER INSERT ON forum_reactions
  FOR EACH ROW
  EXECUTE FUNCTION trigger_reaction_achievements();

-- =============================================
-- TRIGGER: Milestone achievements (reputation-based)
-- =============================================
CREATE OR REPLACE FUNCTION trigger_reputation_achievements()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.reputation_score >= 500 THEN
    PERFORM grant_achievement_if_not_exists(NEW.id, 'expert_analyst');
  END IF;

  IF NEW.reputation_score >= 1000 THEN
    PERFORM grant_achievement_if_not_exists(NEW.id, 'guru');
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_profile_reputation_achievements ON profiles;
CREATE TRIGGER on_profile_reputation_achievements
  AFTER UPDATE OF reputation_score ON profiles
  FOR EACH ROW
  WHEN (NEW.reputation_score IS DISTINCT FROM OLD.reputation_score)
  EXECUTE FUNCTION trigger_reputation_achievements();