import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import {
  notificationService,
  type Notification,
} from "../services/notification/notification.service";
import { useWebSocketEvent } from "./WebSocketContext";
import { showError } from "../utils/toast";

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  fetchMissedNotifications: () => Promise<void>;
  addNotification: (notification: Notification) => void;
  markAllAsRead: () => Promise<void>;
  clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

interface NotificationProviderProps {
  children: React.ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const hasFetchedRef = useRef<boolean>(false);
  const isFetchingRef = useRef<boolean>(false);

  // Calculate unread count from notifications
  const updateUnreadCount = useCallback((notifs: Notification[]) => {
    const unread = notifs.filter((n) => !n.is_read).length;
    setUnreadCount(unread);
  }, []);

  // Fetch missed notifications from API
  const fetchMissedNotifications = useCallback(async () => {
    // Prevent concurrent calls
    if (isFetchingRef.current) return;

    isFetchingRef.current = true;
    setIsLoading(true);
    try {
      const response = await notificationService.getMissedNotifications(50);
      if (response.success && response.data) {
        const missedNotifications = response.data.notifications || [];

        // Merge with existing notifications, avoiding duplicates
        setNotifications((prev) => {
          const existingIds = new Set(prev.map((n) => n.notification_id));
          const newNotifications = missedNotifications.filter(
            (n) => !existingIds.has(n.notification_id)
          );
          const merged = [...newNotifications, ...prev];
          // Sort by created_at descending (newest first)
          merged.sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          );
          updateUnreadCount(merged);
          return merged;
        });
      } else {
        showError(response.error || "Failed to fetch notifications");
      }
    } catch (error) {
      console.error("Error fetching missed notifications:", error);
      showError("Failed to fetch notifications");
    } finally {
      setIsLoading(false);
      isFetchingRef.current = false;
    }
  }, [updateUnreadCount]);

  // Add notification from WebSocket
  const addNotification = useCallback(
    (notification: Notification) => {
      setNotifications((prev) => {
        // Check if notification already exists
        const exists = prev.some(
          (n) => n.notification_id === notification.notification_id
        );
        if (exists) {
          return prev;
        }

        // Add to beginning of array (newest first)
        const updated = [notification, ...prev];
        updateUnreadCount(updated);
        return updated;
      });
    },
    [updateUnreadCount]
  );

  // Mark all notifications as read
  const markAllAsRead = useCallback(async () => {
    try {
      const response = await notificationService.markAllAsRead();
      if (response.success) {
        // Update all notifications to is_read = true
        setNotifications((prev) => {
          const updated = prev.map((n) => ({ ...n, is_read: true }));
          updateUnreadCount(updated);
          return updated;
        });
      } else {
        showError(response.error || "Failed to mark notifications as read");
      }
    } catch (error) {
      console.error("Error marking notifications as read:", error);
      showError("Failed to mark notifications as read");
    }
  }, [updateUnreadCount]);

  // Clear all notifications
  const clearNotifications = useCallback(() => {
    setNotifications([]);
    setUnreadCount(0);
  }, []);

  // Listen for WebSocket notification events
  useWebSocketEvent("notification", (data: any) => {
    // Data is already the notification object from WebSocket
    if (data && data.notification_id) {
      const notification: Notification = {
        type: data.type || "notification",
        notification_id: data.notification_id,
        notification_type: data.notification_type,
        message: data.message,
        target_id: data.target_id,
        target_type: data.target_type,
        actor: data.actor,
        metadata: data.metadata || {},
        created_at: data.created_at,
        is_read: false,
      };
      addNotification(notification);
    }
  });

  // Fetch missed notifications on mount (only once)
  useEffect(() => {
    if (!hasFetchedRef.current) {
      hasFetchedRef.current = true;
      fetchMissedNotifications();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  const value: NotificationContextType = {
    notifications,
    unreadCount,
    isLoading,
    fetchMissedNotifications,
    addNotification,
    markAllAsRead,
    clearNotifications,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};
