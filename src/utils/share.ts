import i18n from '../i18n/config';

/**
 * Generate share URL for posts, prayer requests, or profiles
 */
export const getShareUrl = (id: string, type: 'post' | 'prayer-request' | 'profile' = 'post'): string => {
  const baseUrl = window.location.origin;
  switch (type) {
    case 'post':
      return `${baseUrl}/post/${id}`;
    case 'prayer-request':
      return `${baseUrl}/prayer-request/${id}`;
    case 'profile':
      return `${baseUrl}/profile/${id}`;
    default:
      return `${baseUrl}/post/${id}`;
  }
};

/**
 * Get share title based on type
 */
export const getShareTitle = (type: 'post' | 'prayer-request' | 'profile', name?: string): string => {
  switch (type) {
    case 'post':
      return i18n.t('common.sharePost') || 'Check out this post';
    case 'prayer-request':
      return i18n.t('common.sharePrayerRequest') || 'Check out this prayer request';
    case 'profile':
      return name ? `${name}'s Profile` : i18n.t('common.shareProfile') || 'Check out this profile';
    default:
      return i18n.t('common.sharePost') || 'Check out this post';
  }
};

