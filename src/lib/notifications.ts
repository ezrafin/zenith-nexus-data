/**
 * Notification system utilities
 * Handles push notifications and coordinates with backend for email notifications
 */
import { logger } from './logger';

export type NotificationType = 
  | 'reply_to_discussion'
  | 'reaction_to_post'
  | 'reaction_to_reply'
  | 'new_follower'
  | 'mention'
  | 'moderation_discussion_approved'
  | 'moderation_discussion_rejected'
  | 'moderation_reply_approved'
  | 'moderation_reply_rejected'
  | 'new_comment_on_discussion'
  | 'new_article_by_followed_author';

export interface NotificationPayload {
  type: NotificationType;
  title: string;
  body: string;
  url?: string;
  icon?: string;
  data?: Record<string, any>;
}

type Translator = (key: string) => string;
type TemplateTranslator = (key: string) => string;

/**
 * Request push notification permission
 */
export async function requestNotificationPermission(): Promise<boolean> {
  if (!('Notification' in window)) {
    logger.warn('This browser does not support notifications');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission === 'denied') {
    logger.warn('Notification permission denied');
    return false;
  }

  const permission = await Notification.requestPermission();
  return permission === 'granted';
}

/**
 * Show a push notification
 */
export function showNotification(payload: NotificationPayload): void {
  if (!('Notification' in window) || Notification.permission !== 'granted') {
    return;
  }

  const notification = new Notification(payload.title, {
    body: payload.body,
    icon: payload.icon || '/favicon.png',
    badge: '/favicon.png',
    tag: payload.type,
    data: payload.data,
    requireInteraction: false,
  });

  notification.onclick = () => {
    window.focus();
    if (payload.url) {
      window.location.href = payload.url;
    }
    notification.close();
  };

  // Auto-close after 5 seconds
  setTimeout(() => {
    notification.close();
  }, 5000);
}

/**
 * Format notification message based on type
 */
export function formatNotificationMessage(
  type: NotificationType,
  data: {
    authorName?: string;
    discussionTitle?: string;
    replyPreview?: string;
    reactionType?: string;
    articleTitle?: string;
    articleCount?: number;
  },
  t?: Translator
): { title: string; body: string } {
  const author = data.authorName || 'Someone';
  const discussion = data.discussionTitle || 'your discussion';
  const reaction = data.reactionType || 'liked';
  const articleTitle = data.articleTitle || 'a new article';
  const articleCount = data.articleCount || 1;

  switch (type) {
    case 'reply_to_discussion':
      return {
        title: t ? t('notifications.replyTitle') : 'New reply to your discussion',
        body: t
          ? t('notifications.replyBody')
              .replace('{{author}}', author)
              .replace('{{discussion}}', discussion)
          : `${author} replied to "${discussion}"`,
      };
    case 'reaction_to_post':
      return {
        title: t ? t('notifications.reactionTitle') : 'New reaction',
        body: t
          ? t('notifications.reactionPostBody')
              .replace('{{author}}', author)
              .replace('{{reaction}}', reaction)
          : `${author} ${reaction} your post`,
      };
    case 'reaction_to_reply':
      return {
        title: t ? t('notifications.reactionTitle') : 'New reaction',
        body: t
          ? t('notifications.reactionReplyBody')
              .replace('{{author}}', author)
              .replace('{{reaction}}', reaction)
          : `${author} ${reaction} your reply`,
      };
    case 'new_follower':
      return {
        title: t ? t('notifications.newFollowerTitle') : 'New follower',
        body: t
          ? t('notifications.newFollowerBody').replace('{{author}}', author)
          : `${author} started following you`,
      };
    case 'new_comment_on_discussion':
      return {
        title: t ? t('notifications.newComment') : 'New comment on your discussion',
        body: t
          ? t('notifications.newCommentBody')
              .replace('{{author}}', author)
              .replace('{{discussion}}', discussion)
          : `${author} commented on "${discussion}"`,
      };
    case 'moderation_discussion_approved':
      return {
        title: t ? t('notifications.moderationApproved') : 'Your discussion was approved',
        body: t
          ? t('notifications.moderationApprovedBody').replace('{{discussion}}', discussion)
          : `Your discussion "${discussion}" has been approved`,
      };
    case 'moderation_discussion_rejected':
      return {
        title: t ? t('notifications.moderationRejected') : 'Your discussion was rejected',
        body: t
          ? t('notifications.moderationRejectedBody').replace('{{discussion}}', discussion)
          : `Your discussion "${discussion}" was rejected`,
      };
    case 'moderation_reply_approved':
      return {
        title: t ? t('notifications.moderationApproved') : 'Your comment was approved',
        body: t ? t('notifications.moderationApprovedReplyBody') : 'Your comment has been approved',
      };
    case 'moderation_reply_rejected':
      return {
        title: t ? t('notifications.moderationRejected') : 'Your comment was rejected',
        body: t ? t('notifications.moderationRejectedReplyBody') : 'Your comment was rejected',
      };
    case 'new_article_by_followed_author':
      return {
        title: t ? t('notifications.newArticleTitle') : 'New article published',
        body: t
          ? t('notifications.newArticleBody')
              .replace('{{author}}', author)
              .replace('{{count}}', articleCount > 1 ? `${articleCount} articles` : 'an article')
          : `${author} published ${articleCount > 1 ? `${articleCount} new articles` : 'a new article'}`,
      };
    default:
      return {
        title: t ? t('notifications.genericTitle') : 'New notification',
        body: t ? t('notifications.genericBody') : 'You have a new notification',
      };
  }
}

