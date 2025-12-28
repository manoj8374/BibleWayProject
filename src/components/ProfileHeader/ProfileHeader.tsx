import React, { useState } from 'react';
import {
  HeaderContainer,
  HeaderBackground,
  BackButton,
  ShareButton,
  ProfileContent,
  AvatarContainer,
  Avatar,
  ProfileName,
  ProfileTitle,
  StatsRow,
  StatItem,
  StatNumber,
  StatLabel,
  NameWithSocialLinks,
  SocialIconsRow,
  SocialIcon,
  ActionButtonsRow,
  FollowButton,
  MessageButton
} from './ProfileHeader.styles';
import { type CompleteUserProfile, userService } from '../../services/user/user.service';
import { showError, showSuccess } from '../../utils/toast';
import { useI18n } from '../../i18n';

export interface ProfileHeaderProps {
  profileData: CompleteUserProfile;
  onBack?: () => void;
  onShare?: () => void;
  onMessageClick?: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profileData,
  onBack,
  onShare,
  onMessageClick
}) => {
  const { t } = useI18n();
  const { user_name, country, profile_picture_url, followers_count, following_count, posts_count, user_id, is_following } = profileData;
  const [isFollowing, setIsFollowing] = useState(is_following || false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFollowToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLoading(true);

    try {
      let response;
      if (isFollowing) {
        response = await userService.unfollowUser(user_id);
      } else {
        response = await userService.followUser(user_id);
      }

      if (response.success) {
        setIsFollowing(!isFollowing);
        showSuccess(response.message || (isFollowing ? t('profile.unfollowedSuccessfully') : t('profile.followedSuccessfully')));
      } else {
        showError(response.message || t('people.failedToUpdateFollowStatus'));
      }
    } catch (error: unknown) {
      const err = error as { message?: string };
      showError(err.message || t('people.failedToUpdateFollowStatus'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleMessageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onMessageClick) {
      onMessageClick();
    }
  };

  React.useEffect(() => {
    setIsFollowing(is_following || false);
  }, [is_following]);

  const renderHeaderButtons = () => {
    return (
      <>
        <BackButton onClick={onBack}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          {t('profile.back')}
        </BackButton>
        {onShare && (
          <ShareButton onClick={onShare}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
          </ShareButton>
        )}
      </>
    );
  };

  const renderAvatar = () => {
    return (
      <AvatarContainer>
        {profile_picture_url && profile_picture_url !== '' ? (
          <Avatar $bgColor="transparent">
            <img 
              src={profile_picture_url} 
              alt={user_name} 
              style={{
                width: '100%', 
                height: '100%', 
                borderRadius: '50%', 
                objectFit: 'cover'
              }} 
            />
          </Avatar>
        ) : (
          <Avatar $bgColor="#E74C3C">
            {user_name.charAt(0).toUpperCase()}
          </Avatar>
        )}
      </AvatarContainer>
    );
  };

  const renderNameAndTitle = () => {
    // Using preferred_language or country as role/title - adjust based on your data structure
    const role = profileData.preferred_language || country || '';
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px'}}>
      

      <div style={{ textAlign: 'center'}}>
        <div style={{ display: 'flex', gap: '8px'}}>

        <ProfileName>{user_name} </ProfileName>
        {renderActionButtons()}
        </div>
        {/* {role && (
          <NameWithSocialLinks>
            <ProfileTitle>{role}</ProfileTitle>
            <SocialIconsRow>
              <SocialIcon onClick={(e) => { e.stopPropagation(); }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </SocialIcon>
              <SocialIcon onClick={(e) => { e.stopPropagation(); }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </SocialIcon>
            </SocialIconsRow>
          </NameWithSocialLinks>
        )} */}
      </div>
      </div>
    );
  };

  const renderStats = () => {
    return (
      <StatsRow>
        <StatItem>
          <StatNumber>{followers_count || 0}</StatNumber>
          <StatLabel>{t('profile.follower')}</StatLabel>
        </StatItem>
        <StatItem>
          <StatNumber>{following_count || 0}</StatNumber>
          <StatLabel>{t('profile.following')}</StatLabel>
        </StatItem>
      </StatsRow>
    );
  };

  const renderActionButtons = () => {
    return (
        <ActionButtonsRow>
          <FollowButton onClick={handleFollowToggle} disabled={isLoading}>
            {isFollowing ? t('profile.unfollow') : t('profile.follow')}
          </FollowButton>
          {onMessageClick && (
            <MessageButton onClick={handleMessageClick}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              {t('profile.message')}
            </MessageButton>
          )}
        </ActionButtonsRow>
    );
  };

  return (
    <HeaderContainer>
      <HeaderBackground>
        {renderHeaderButtons()}
        <ProfileContent>
          {renderAvatar()}
          
          {renderNameAndTitle()}
          {renderStats()}
          
        </ProfileContent>
      </HeaderBackground>
    </HeaderContainer>
  );
};

export default ProfileHeader;
