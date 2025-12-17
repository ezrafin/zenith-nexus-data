import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useUser } from '@/context/UserContext';

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  body: string;
  url?: string;
  data?: Record<string, any>;
  read: boolean;
  created_at: string;
}

const STORAGE_KEY = 'user_notifications';

function getStoredNotifications(userId: string): Notification[] {
  try {
    const stored = localStorage.getItem(`${STORAGE_KEY}_${userId}`);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function setStoredNotifications(userId: string, notifications: Notification[]) {
  try {
    localStorage.setItem(`${STORAGE_KEY}_${userId}`, JSON.stringify(notifications));
  } catch {
    // Ignore storage errors
  }
}

/**
 * Hook for fetching user notifications (localStorage-based)
 */
export function useNotifications() {
  const { user } = useUser();

  return useQuery<Notification[], Error>({
    queryKey: ['notifications', user?.id],
    queryFn: async () => {
      if (!user) return [];
      return getStoredNotifications(user.id);
    },
    enabled: !!user,
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
  });
}

/**
 * Hook for marking notifications as read
 */
export function useMarkNotificationRead() {
  const { user } = useUser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (notificationId: string) => {
      if (!user) throw new Error('Not authenticated');

      const notifications = getStoredNotifications(user.id);
      const updated = notifications.map(n => 
        n.id === notificationId ? { ...n, read: true } : n
      );
      setStoredNotifications(user.id, updated);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications', user?.id] });
    },
  });
}

/**
 * Hook for marking all notifications as read
 */
export function useMarkAllNotificationsRead() {
  const { user } = useUser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!user) throw new Error('Not authenticated');

      const notifications = getStoredNotifications(user.id);
      const updated = notifications.map(n => ({ ...n, read: true }));
      setStoredNotifications(user.id, updated);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications', user?.id] });
    },
  });
}
