import styled from 'styled-components';

export const NotificationItemContainer = styled.div<{ 
  $isUnread: boolean;
  $borderColor: string;
  $backgroundColor: string;
}>`
  display: flex;
  gap: 12px;
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  background-color: ${props => props.$isUnread ? props.$backgroundColor : 'transparent'};
  border-left: ${props => props.$isUnread ? `3px solid ${props.$borderColor}` : '3px solid transparent'};

  &:hover {
    background-color: #f5f5f5;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #e0e0e0;
  }
`;

export const ActorAvatar = styled.div`
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #e74c3c;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .avatar-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
    font-size: 14px;
    background: linear-gradient(135deg, #570000 0%, #0860C4 100%);
  }
`;

export const NotificationContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
`;

export const NotificationText = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const NotificationMessage = styled.div`
  font-size: 14px;
  color: #333;
  line-height: 1.4;
  font-weight: ${props => props.theme?.fontWeight || '400'};
`;

export const NotificationTime = styled.div`
  font-size: 12px;
  color: #999;
`;

export const UnreadIndicator = styled.div<{ $indicatorColor: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => props.$indicatorColor};
  flex-shrink: 0;
  margin-top: 6px;
`;

