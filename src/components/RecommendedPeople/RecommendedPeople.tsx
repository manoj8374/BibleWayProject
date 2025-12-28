import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Title,
  SearchInput,
  SearchIcon,
  PeopleList,
  PersonItem,
  PersonAvatar,
  PersonName,
  ActionButton,
  SearchWrapper,
  ImgTag
} from './RecommendedPeople.styles';
import { userService, type RecommendedUser } from '../../services/user/user.service';
import { useProfile } from '../../contexts/useProfile';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../../i18n';

const RecommendedPeople: React.FC = () => {
  const { profile } = useProfile();
  const { t } = useI18n();
  const [people, setPeople] = useState<RecommendedUser[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [followingState, setFollowingState] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate()

  const fetchRecommendedUsers = useCallback(async () => {
    if (!profile?.user_id) return;

    setLoading(true);
    try {
      const response = await userService.getRecommendedUsers(profile.user_id, 20);
      if (response.success && response.data) {
        setPeople(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch recommended users:', error);
    } finally {
      setLoading(false);
    }
  }, [profile?.user_id]);

  useEffect(() => {
    fetchRecommendedUsers();
  }, [fetchRecommendedUsers]);

  const handleFollow = async (userId: string) => {
    const isCurrentlyFollowing = followingState[userId];
    
    // Optimistic update
    setFollowingState(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));

    try {
      let response;
      if (isCurrentlyFollowing) {
        response = await userService.unfollowUser(userId);
      } else {
        response = await userService.followUser(userId);
      }

      if (!response.success) {
        setFollowingState(prev => ({
          ...prev,
          [userId]: isCurrentlyFollowing
        }));
        console.error('Failed to update follow status:', response.error);
      }
    } catch (error) {
      setFollowingState(prev => ({
        ...prev,
        [userId]: isCurrentlyFollowing
      }));
      console.error('Failed to update follow status:', error);
    }
  };

  const filteredPeople = people.filter(person =>
    person.user_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getInitials = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : '?';
  };

  const getAvatarColor = (userId: string) => {
    const colors = ['#E74C3C', '#3498DB', '#9B59B6', '#1ABC9C', '#F39C12', '#E91E63'];
    const index = userId.charCodeAt(0) % colors.length;
    return colors[index];
  };

  if(loading) return null;

  if (people.length !== 0) {
    return (
      <Container>
        <Title>{t('recommendedPeople.title')}</Title>
        <SearchWrapper>
          <SearchIcon>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </SearchIcon>
          <SearchInput 
            type="text" 
            placeholder={t('recommendedPeople.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchWrapper>
        <PeopleList>
          {filteredPeople.length === 0 ? (
            <PersonItem style={{ justifyContent: 'center', color: '#888' }}>
              {searchQuery ? t('recommendedPeople.noResultsFound') : t('recommendedPeople.noRecommendationsAvailable')}
            </PersonItem>
          ) : (
            filteredPeople.map((person) => {
              const isFollowing = followingState[person.user_id];
              const avatarValue = person.profile_image || getAvatarColor(person.user_id);
              
              return (
                <PersonItem key={person.user_id} onClick={() => navigate(`/profile/${person.user_id}`)}>
                  {person.profile_image ? (
                    <ImgTag src={person.profile_image} alt={person.user_name} />
                  ) : (
                    <PersonAvatar $bgColor={avatarValue}>
                      {!person.profile_image && getInitials(person.user_name)}
                    </PersonAvatar>
                  )}
                  <PersonName>{person.user_name}</PersonName>
                  <ActionButton
                    $isJoinGroup={false}
                    $isActive={isFollowing}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFollow(person.user_id);
                    }}
                  >
                    {isFollowing ? t('recommendedPeople.following') : t('recommendedPeople.follow')}
                  </ActionButton>
                </PersonItem>
              );
            })
          )}
        </PeopleList>
      </Container>
    );
  }

  return null;
};

export default RecommendedPeople;
