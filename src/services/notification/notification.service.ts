import { GET_MISSED_NOTIFICATIONS, MARK_NOTIFICATIONS_READ } from '../../constants/ApiUrls';
import api from '../../AxiosClient';
import type { ApiError } from '../../constants/Error';

export interface NotificationActor {
  user_id: string;
  user_name: string;
  profile_picture_url: string;
}

export interface NotificationMetadata {
  actors_count?: number;
  actors?: string[];
  last_actor_id?: string;
  last_actor_name?: string;
  is_aggregated?: boolean;
}

export interface Notification {
  type: string;
  notification_id: string;
  notification_type: 'FOLLOW' | 'POST_LIKE' | 'COMMENT_LIKE' | 'PRAYER_REQUEST_LIKE' | 'COMMENT_ON_POST' | 'COMMENT_ON_PRAYER_REQUEST' | 'PRAYER_REQUEST_CREATED';
  message: string;
  target_id: string;
  target_type: 'user' | 'post' | 'comment' | 'prayer_request';
  actor: NotificationActor;
  metadata: NotificationMetadata;
  created_at: string;
  is_read?: boolean;
}

export interface MissedNotificationsResponse {
  success: boolean;
  data: {
    notifications: Notification[];
    count: number;
    last_fetch_at: string;
  };
  error?: string;
  error_code?: string;
}

export interface MarkReadResponse {
  success: boolean;
  data: {
    message: string;
    marked_count: number;
  };
  error?: string;
  error_code?: string;
}

export const notificationService = {
  getMissedNotifications: async (limit: number = 50): Promise<MissedNotificationsResponse> => {
    try {
      const response = await api.get<MissedNotificationsResponse>(GET_MISSED_NOTIFICATIONS, {
        params: { limit },
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      });
      return response.data;
    } catch (error: unknown) {
      const err = error as ApiError;
      return {
        success: false,
        data: {
          notifications: [],
          count: 0,
          last_fetch_at: new Date().toISOString()
        },
        error: err?.message || 'Failed to fetch missed notifications.',
        error_code: err?.error_code
      };
    }
  },

  markAllAsRead: async (): Promise<MarkReadResponse> => {
    try {
      const response = await api.post<MarkReadResponse>(MARK_NOTIFICATIONS_READ, {}, {
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      });
      return response.data;
    } catch (error: unknown) {
      const err = error as ApiError;
      return {
        success: false,
        data: {
          message: err?.message || 'Failed to mark notifications as read.',
          marked_count: 0
        },
        error: err?.message || 'Failed to mark notifications as read.',
        error_code: err?.error_code
      };
    }
  }
};

