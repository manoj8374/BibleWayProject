import React, { useEffect, useState, useCallback } from 'react';
import { ViewerContainer } from './ProfileViewer.styles';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import ProfilePostsGrid from '../../components/ProfilePostsGrid/ProfilePostsGrid';
import { userService, type CompleteUserProfile } from '../../services/user/user.service';
import { postService } from '../../services/post/post.service';
import { useProfile } from '../../contexts/useProfile';
import { useI18n } from '../../i18n';
import ShareDialog from '../ShareDialog/ShareDialog';
import { getShareUrl, getShareTitle } from '../../utils/share';

export interface ProfileViewerProps {
  userId: string;
  onBack?: () => void;
  onShare?: () => void;
  onMessageClick?: () => void;
}

const ProfileViewer: React.FC<ProfileViewerProps> = ({
  userId,
  onBack,
  onShare,
  onMessageClick
}) => {
  const { t } = useI18n();
  const { profile: currentUser } = useProfile();
  const [profileData, setProfileData] = useState<CompleteUserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showShareDialog, setShowShareDialog] = useState(false);

  const fetchProfile = useCallback(async () => {
    if (!userId) return;
    
    setLoading(true);
    try {
      const response = await userService.getCompleteUserProfile(
        userId,
        currentUser?.user_id
      );
      if (response.success && response.data) {
        setProfileData(response.data);
        // Fetch posts count if not included in profile
        if (!response.data.posts_count) {
          const postsResponse = await postService.getSpecificUserPosts(userId, 1, 0);
          if (postsResponse.success && postsResponse.pagination) {
            setProfileData(prev => prev ? {
              ...prev,
              posts_count: postsResponse.pagination.total_count
            } : null);
          }
        }
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    } finally {
      setLoading(false);
    }
  }, [userId, currentUser?.user_id]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handlePostClick = (postId: string) => {
    console.log('Post clicked:', postId);
  };

  if (loading) {
    return (
      <ViewerContainer>
        <div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>
          {t('profile.loadingProfile')}
        </div>
      </ViewerContainer>
    );
  }

  if (!profileData) {
    return (
      <ViewerContainer>
        <div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>
          {t('profile.profileNotFound')}
        </div>
      </ViewerContainer>
    );
  }

  const handleShare = () => {
    if (onShare) {
      onShare();
    } else {
      setShowShareDialog(true);
    }
  };

  return (
    <>
      <ViewerContainer>
        <ProfileHeader
          profileData={profileData}
          onBack={onBack}
          onShare={handleShare}
          onMessageClick={onMessageClick}
        />
        <ProfilePostsGrid userId={userId} profileData={profileData} onPostClick={handlePostClick} />
      </ViewerContainer>
      {profileData && (
        <ShareDialog
          isOpen={showShareDialog}
          onClose={() => setShowShareDialog(false)}
          title={getShareTitle('profile', profileData.user_name)}
          url={getShareUrl(userId, 'profile')}
          description={`${profileData.user_name}'s Profile`}
        />
      )}
    </>
  );
};

export default ProfileViewer;
