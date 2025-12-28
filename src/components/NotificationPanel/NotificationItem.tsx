import React from "react";
import { useNavigate } from "react-router-dom";
import type { Notification } from "../../services/notification/notification.service";
import { getNotificationTypeColor } from "../../utils/notificationColors";
import { useI18n } from "../../i18n";
import {
  NotificationItemContainer,
  NotificationContent,
  ActorAvatar,
  NotificationText,
  NotificationMessage,
  NotificationTime,
  UnreadIndicator,
} from "./NotificationItem.styles";

interface NotificationItemProps {
  notification: Notification;
  onClick?: () => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onClick,
}) => {
  const navigate = useNavigate();
  const { t } = useI18n();
  const colors = getNotificationTypeColor(notification.notification_type);

  const formatRelativeTime = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return t('notifications.justNow');
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return diffInMinutes === 1
        ? t('notifications.minuteAgo', { count: diffInMinutes })
        : t('notifications.minutesAgo', { count: diffInMinutes });
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return diffInHours === 1
        ? t('notifications.hourAgo', { count: diffInHours })
        : t('notifications.hoursAgo', { count: diffInHours });
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
      return diffInDays === 1
        ? t('notifications.dayAgo', { count: diffInDays })
        : t('notifications.daysAgo', { count: diffInDays });
    }

    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) {
      return diffInWeeks === 1
        ? t('notifications.weekAgo', { count: diffInWeeks })
        : t('notifications.weeksAgo', { count: diffInWeeks });
    }

    const diffInMonths = Math.floor(diffInDays / 30);
    return diffInMonths === 1
      ? t('notifications.monthAgo', { count: diffInMonths })
      : t('notifications.monthsAgo', { count: diffInMonths });
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    }

    // For FOLLOW notifications, navigate to the actor's profile (the user who followed)
    if (
      notification.notification_type === "FOLLOW" &&
      notification.actor?.user_id
    ) {
      navigate(`/profile/${notification.actor.user_id}`);
      return;
    }

    // Navigate based on target_type
    switch (notification.target_type) {
      case "user":
        // For other user-related notifications, navigate to actor's profile if available
        if (notification.actor?.user_id) {
          navigate(`/profile/${notification.actor.user_id}`);
        } else {
          navigate(`/profile`);
        }
        break;
      case "post":
        // Navigate to home page (posts are shown there)
        navigate("/home");
        break;
      case "comment":
        // Navigate to home page (comments are shown with posts)
        navigate("/home");
        break;
      case "prayer_request":
        // Navigate to home page (prayer requests are shown there)
        navigate("/home");
        break;
      default:
        navigate("/home");
    }
  };

  const getActorInitials = (name: string): string => {
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <NotificationItemContainer
      onClick={handleClick}
      $isUnread={!notification.is_read}
      $borderColor={colors.borderColor}
      $backgroundColor={colors.backgroundColor}
    >
      <ActorAvatar>
        {notification.actor.profile_picture_url ? (
          <img
            src={notification.actor.profile_picture_url}
            alt={notification.actor.user_name}
          />
        ) : (
          <div className="avatar-placeholder">
            {getActorInitials(notification.actor.user_name)}
          </div>
        )}
      </ActorAvatar>
      <NotificationContent>
        <NotificationText>
          <NotificationMessage>{notification.message}</NotificationMessage>
          <NotificationTime>
            {formatRelativeTime(notification.created_at)}
          </NotificationTime>
        </NotificationText>
        {!notification.is_read && (
          <UnreadIndicator $indicatorColor={colors.indicatorColor} />
        )}
      </NotificationContent>
    </NotificationItemContainer>
  );
};

export default NotificationItem;
