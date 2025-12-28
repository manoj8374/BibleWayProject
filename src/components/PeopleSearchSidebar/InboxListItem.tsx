import React, { useState } from 'react';
import { type InboxItem } from '../../services/chat/chat.service';
import { useI18n } from '../../i18n';
import {
  ItemContainer,
  AvatarContainer,
  AvatarImage,
  AvatarFallback,
  ContentContainer,
  TopRow,
  DisplayName,
  TimeStamp,
  BottomRow,
  LastMessage,
  UnreadBadge
} from './InboxListItem.styles';

interface InboxListItemProps {
  item: InboxItem;
  onPersonSelect: (personId: string, conversationId: string, personName: string) => void;
}

const InboxListItem: React.FC<InboxListItemProps> = ({ item, onPersonSelect }) => {
  const { t } = useI18n();
  const isDirect = item.type === 'DIRECT';
  const displayImage = isDirect ? item.other_member?.profile_picture_url : item.image;
  const displayName = isDirect ? (item.other_member?.user_name || item.name || 'Unknown') : (item.name || 'Unknown');
  
  // Handle last message display
  let lastMsg = '';
  if (item.last_message) {
    if (item.last_message.file) {
      lastMsg = t('people.attachment');
    } else if (item.last_message.text) {
      // Check if it's a sticker/image URL
      const isImageUrl = item.last_message.text.startsWith('http') && 
                        (item.last_message.text.includes('image') || 
                         item.last_message.text.includes('sticker') ||
                         item.last_message.text.match(/\.(jpg|jpeg|png|gif|webp|svg)/i));
      lastMsg = isImageUrl ? t('people.sticker') : item.last_message.text;
    } else {
      lastMsg = t('people.noMessagesText');
    }
  } else {
    lastMsg = t('people.noMessagesText');
  }
  
  const time = item.last_activity_at 
    ? new Date(item.last_activity_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : '';

  const [unReadCount, setUnReadCount] = useState(item.unread_count);

  const handleClick = () => {
    if (onPersonSelect) {
      const targetId = isDirect ? item.other_member?.user_id || '' : '';
      const personName = isDirect ? (item.other_member?.user_name || displayName) : displayName;
      onPersonSelect(targetId, item.conversation_id || '', personName);
    }
    setUnReadCount(0);
  };

  return (
    <ItemContainer onClick={handleClick}>
      <AvatarContainer>
        {displayImage ? (
          <AvatarImage src={displayImage} alt={displayName} />
        ) : (
          <AvatarFallback>
            {displayName?.charAt(0)}
          </AvatarFallback>
        )}
      </AvatarContainer>
      <ContentContainer>
        <TopRow>
          <DisplayName>{displayName}</DisplayName>
          <TimeStamp>{time}</TimeStamp>
        </TopRow>
        <BottomRow>
          <LastMessage>
            {item.last_message?.is_sent_by_me && t('people.you')}{lastMsg}
          </LastMessage>
          {unReadCount > 0 && (
            <UnreadBadge>{unReadCount}</UnreadBadge>
          )}
        </BottomRow>
      </ContentContainer>
    </ItemContainer>
  );
};

export default InboxListItem;
