import React, { useEffect, useRef } from 'react';
import { useNotification } from '../../contexts/NotificationContext';
import NotificationItem from './NotificationItem';
import { useTranslation } from 'react-i18next';
import {
  PanelContainer,
  PanelOverlay,
  PanelHeader,
  PanelTitle,
  MarkAllReadButton,
  PanelBody,
  EmptyState,
  LoadingState,
  NotificationList
} from './NotificationPanel.styles';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen, onClose }) => {
  const { notifications, isLoading, markAllAsRead, unreadCount } = useNotification();
  const panelRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close panel
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        // Check if click is not on the notification icon
        const target = event.target as HTMLElement;
        if (!target.closest('[data-notification-icon]')) {
          onClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleMarkAllAsRead = async () => {
    if (unreadCount > 0) {
      await markAllAsRead();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <PanelOverlay onClick={onClose} />
      <PanelContainer ref={panelRef}>
        <PanelHeader>
          <PanelTitle>Notifications</PanelTitle>
          {unreadCount > 0 && (
            <MarkAllReadButton onClick={handleMarkAllAsRead}>
              Mark all as read
            </MarkAllReadButton>
          )}
        </PanelHeader>
        <PanelBody>
          {isLoading && notifications.length === 0 ? (
            <LoadingState>Loading notifications...</LoadingState>
          ) : notifications.length === 0 ? (
            <EmptyState>
              <div>No notifications yet</div>
              <div className="subtitle">You're all caught up!</div>
            </EmptyState>
          ) : (
            <NotificationList>
              {notifications.map((notification) => (
                <NotificationItem
                  key={notification.notification_id}
                  notification={notification}
                  onClick={onClose}
                />
              ))}
            </NotificationList>
          )}
        </PanelBody>
      </PanelContainer>
    </>
  );
};

export default NotificationPanel;

