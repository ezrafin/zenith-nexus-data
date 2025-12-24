-- Seed Collectible Bills
-- Inserts all 31 collectible bills (30 regular + 1 legendary)

-- Regular Bills (30)

-- Forum Discovery (8 bills)
INSERT INTO public.collectible_bills (bill_id, name, description, rarity, trigger_type, trigger_data) VALUES
('forum_first_visit', 'Forum Explorer', 'Visit the forum page for the first time', 'regular', 'page_visit', '{"page": "/forum", "first_visit": true}'),
('forum_create_discussion', 'Discussion Starter', 'Create your first forum discussion', 'regular', 'action', '{"action": "create_discussion", "first": true}'),
('forum_post_reply', 'Conversationalist', 'Post your first reply to a discussion', 'regular', 'action', '{"action": "post_reply", "first": true}'),
('forum_bookmark', 'Bookmark Collector', 'Bookmark a discussion', 'regular', 'action', '{"action": "bookmark_discussion"}'),
('forum_follow', 'Thread Follower', 'Follow a discussion thread', 'regular', 'action', '{"action": "follow_discussion"}'),
('forum_react', 'Reaction Master', 'React to a discussion (like/dislike)', 'regular', 'action', '{"action": "react_discussion"}'),
('forum_topic_visit', 'Topic Explorer', 'Visit a forum topic detail page', 'regular', 'page_visit', '{"page": "/forum/:topicId"}'),
('forum_search', 'Search Navigator', 'Use forum search functionality', 'regular', 'action', '{"action": "forum_search"}');

-- Content Exploration (7 bills)
INSERT INTO public.collectible_bills (bill_id, name, description, rarity, trigger_type, trigger_data) VALUES
('news_page_visit', 'News Reader', 'Visit the news page', 'regular', 'page_visit', '{"page": "/news"}'),
('news_article_read', 'Article Explorer', 'Read a news article detail page', 'regular', 'page_visit', '{"page": "/news/:id"}'),
('analytics_page_visit', 'Analytics Explorer', 'Visit the analytics page', 'regular', 'page_visit', '{"page": "/analytics"}'),
('analytics_article_read', 'Analytics Reader', 'Read an analytics article', 'regular', 'page_visit', '{"page": "/analytics/:slug"}'),
('markets_page_visit', 'Market Watcher', 'Visit the markets page', 'regular', 'page_visit', '{"page": "/markets"}'),
('markets_type_visit', 'Market Specialist', 'Visit a specific market type (indices/stocks/crypto/commodities)', 'regular', 'page_visit', '{"page": "/markets/:type"}'),
('companies_page_visit', 'Company Explorer', 'Visit the companies page', 'regular', 'page_visit', '{"page": "/companies"}');

-- Education & Learning (4 bills)
INSERT INTO public.collectible_bills (bill_id, name, description, rarity, trigger_type, trigger_data) VALUES
('learning_page_visit', 'Learning Enthusiast', 'Visit the learning page', 'regular', 'page_visit', '{"page": "/learning"}'),
('video_library_visit', 'Video Learner', 'Visit a video library page', 'regular', 'page_visit', '{"page": "/video/:videoId"}'),
('basic_article_read', 'Basics Student', 'Read a basic learning article', 'regular', 'page_visit', '{"page": "/learning/basics/:slug"}'),
('advanced_article_read', 'Advanced Scholar', 'Read an advanced learning article', 'regular', 'page_visit', '{"page": "/learning/advanced/:slug"}');

-- User Features (6 bills)
INSERT INTO public.collectible_bills (bill_id, name, description, rarity, trigger_type, trigger_data) VALUES
('profile_own_visit', 'Self Explorer', 'Visit your own profile page', 'regular', 'page_visit', '{"page": "/profile"}'),
('profile_other_visit', 'Social Explorer', 'Visit another user''s profile', 'regular', 'page_visit', '{"page": "/users/:userId"}'),
('bookmarks_page_visit', 'Bookmarks Manager', 'Visit the bookmarks page', 'regular', 'page_visit', '{"page": "/bookmarks"}'),
('bookmark_create', 'Content Saver', 'Create a bookmark (any content type)', 'regular', 'action', '{"action": "create_bookmark"}'),
('watchlists_page_visit', 'Watchlist Manager', 'Visit the watchlists page', 'regular', 'page_visit', '{"page": "/watchlists"}'),
('watchlist_add_item', 'Market Tracker', 'Add an item to your watchlist', 'regular', 'action', '{"action": "add_watchlist_item"}');

-- Settings & Navigation (3 bills)
INSERT INTO public.collectible_bills (bill_id, name, description, rarity, trigger_type, trigger_data) VALUES
('settings_page_visit', 'Settings Explorer', 'Visit the settings page', 'regular', 'page_visit', '{"page": "/settings"}'),
('settings_language_change', 'Polyglot', 'Change language preference in settings', 'regular', 'action', '{"action": "change_language"}'),
('global_search_use', 'Search Master', 'Use global search (Cmd/Ctrl+K)', 'regular', 'action', '{"action": "global_search"}');

-- Social & Community (2 bills)
INSERT INTO public.collectible_bills (bill_id, name, description, rarity, trigger_type, trigger_data) VALUES
('user_follow', 'Social Connector', 'Follow another user', 'regular', 'action', '{"action": "follow_user"}'),
('info_page_visit', 'Information Seeker', 'Visit about/contact/careers page (any info page)', 'regular', 'page_visit', '{"page": "/about|/contact|/careers|/authors"}');

-- Legendary Bill (1)
INSERT INTO public.collectible_bills (bill_id, name, description, rarity, trigger_type, trigger_data) VALUES
('legendary_hidden_treasure', 'Hidden Treasure', 'The legendary $100 bill - spawns randomly on an article page after collecting all 30 regular bills', 'legendary', 'legendary_spawn', '{"requires_all_regular": true, "spawn_type": "article_page"}');

