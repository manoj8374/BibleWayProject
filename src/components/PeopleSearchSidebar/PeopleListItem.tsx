import React, { useState } from 'react';
import {
  PersonCard,
  PersonAvatar,
  PersonInfo,
  PersonName,
  StatusBadge,
  MessageIconWrapper
} from './PeopleSearchSidebar.styles';
import { userService, type UserProfile } from '../../services/user/user.service';
import { showError } from '../../utils/toast';
import { FaRegMessage } from "react-icons/fa6";
import { useI18n } from '../../i18n';

interface PeopleListItemProps {
  person: UserProfile;
  isSelected: boolean;
  onSelect: (personId: string, conversationId: string, personName: string) => void;
  onChatClick?: (personId: string, conversationId: string, personName: string) => void;
  onViewChange: (view: 'profile' | 'chat' | 'peopleSearch') => void;
  changePerson: (person: any) => void;
}

const PeopleListItem: React.FC<PeopleListItemProps> = ({
  person,
  isSelected,
  onSelect,
  onChatClick,
  onViewChange,
  changePerson
}) => {
  const { t } = useI18n();
  const [isFollowing, setIsFollowing] = useState(person.is_following);
  const getInitials = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : '?';
  };

  const handleFollowToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const newStatus = !isFollowing;

    try {
      let response;
      if (newStatus) {
        response = await userService.followUser(person.user_id);
      } else {
        response = await userService.unfollowUser(person.user_id);
      }

      if (!response.success) {
        throw new Error(response.message);
      }

      setIsFollowing(newStatus);
    } catch (error: any) {
      showError(error.message || t('people.failedToUpdateFollowStatus'));
    }
  };

  return (
    <PersonCard
      $isSelected={isSelected}
      onClick={() => {
        onSelect(person.user_id, person.conversation_id || '', person.user_name);
        onViewChange('profile');
      }}
    >
      <PersonAvatar $bgColor={person.profile_picture_url ? 'transparent' : '#6B7280'}>
        {person.profile_picture_url ? (
            <img src={person.profile_picture_url} alt={person.user_name} style={{width: '100%', height: '100%', borderRadius: '100%', objectFit: 'cover'}} />
        ) : (
            getInitials(person.user_name)
        )}
      </PersonAvatar>
      <PersonInfo>
        <PersonName>{person.user_name}</PersonName>
      </PersonInfo>
      <StatusBadge 
          $isOnline={false} 
          as="button"
          onClick={handleFollowToggle}
          style={{ cursor: 'pointer', border: 'none', opacity: 1 }}
      >
        {isFollowing ? t('people.following') : t('people.follow')}
      </StatusBadge>
      <MessageIconWrapper>
      <FaRegMessage fill='black' onClick={(e) => {
        e.stopPropagation();
        if (onChatClick) onChatClick(person.user_id, person.conversation_id || '', person.user_name);
        changePerson(person);
        onViewChange('chat');
      }}/>
      </MessageIconWrapper>
    </PersonCard>
  );
};

export default PeopleListItem;
