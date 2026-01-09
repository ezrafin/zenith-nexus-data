/**
 * Utility function to get translated bill name
 * This should be used in components that have access to useTranslation hook
 */
export function getBillNameTranslationKey(billId: string): string {
  return `billCollection.billNames.${billId}`;
}

/**
 * Get all bill IDs that need translations
 * This list includes all bill_id values from both migration files
 * Total: 42 bills (41 regular + 1 legendary)
 */
export const BILL_IDS = [
  // From first migration (20251224104640)
  'homepage_visit',
  'forum_first_visit',
  'forum_search',
  'forum_react',
  'markets_page_visit',
  'markets_type_visit',
  'analytics_read',
  'news_read',
  'basic_article_read',
  'advanced_article_read',
  'profile_own_visit',
  'profile_other_visit',
  'watchlist_create',
  'collection_create',
  'company_visit',
  'discussion_create',
  'reply_create',
  'bookmark_add',
  'alert_create',
  'settings_visit',
  'education_visit',
  'course_start',
  'tools_visit',
  'crypto_page',
  'stocks_page',
  'commodities_page',
  'currencies_page',
  'indices_page',
  'theme_change',
  'language_change',
  
  // From second migration (20250125000002) - additional/alternative bill_ids
  'forum_create_discussion',
  'forum_post_reply',
  'forum_bookmark',
  'forum_follow',
  'forum_topic_visit',
  'news_page_visit',
  'news_article_read',
  'analytics_page_visit',
  'analytics_article_read',
  'companies_page_visit',
  'learning_page_visit',
  'video_library_visit',
  'bookmarks_page_visit',
  'bookmark_create',
  'watchlists_page_visit',
  'watchlist_add_item',
  'settings_page_visit',
  'settings_language_change',
  'global_search_use',
  'user_follow',
  'info_page_visit',
  
  // Legendary
  'legendary_hidden_treasure',
] as const;
