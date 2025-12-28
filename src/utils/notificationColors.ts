export const getNotificationTypeColor = (notificationType: string): {
  borderColor: string;
  backgroundColor: string;
  indicatorColor: string;
} => {
  const colorMap: Record<string, { borderColor: string; backgroundColor: string; indicatorColor: string }> = {
    // Like Notifications - Red/Pink tones
    POST_LIKE: {
      borderColor: '#e74c3c',
      backgroundColor: '#fff5f5',
      indicatorColor: '#e74c3c'
    },
    COMMENT_LIKE: {
      borderColor: '#e91e63',
      backgroundColor: '#fff0f5',
      indicatorColor: '#e91e63'
    },
    PRAYER_REQUEST_LIKE: {
      borderColor: '#c2185b',
      backgroundColor: '#fce4ec',
      indicatorColor: '#c2185b'
    },
    
    // Comment Notifications - Blue tones
    COMMENT_ON_POST: {
      borderColor: '#2196f3',
      backgroundColor: '#e3f2fd',
      indicatorColor: '#2196f3'
    },
    COMMENT_ON_PRAYER_REQUEST: {
      borderColor: '#1976d2',
      backgroundColor: '#e1f5fe',
      indicatorColor: '#1976d2'
    },
    
    // Follow Notification - Green
    FOLLOW: {
      borderColor: '#4caf50',
      backgroundColor: '#f1f8e9',
      indicatorColor: '#4caf50'
    },
    
    // Prayer Request Created - Purple/Orange
    PRAYER_REQUEST_CREATED: {
      borderColor: '#9c27b0',
      backgroundColor: '#f3e5f5',
      indicatorColor: '#9c27b0'
    }
  };

  return colorMap[notificationType] || {
    borderColor: '#0860C4',
    backgroundColor: '#f0f7ff',
    indicatorColor: '#0860C4'
  };
};

