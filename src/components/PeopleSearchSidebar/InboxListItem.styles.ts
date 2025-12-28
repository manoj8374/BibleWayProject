import styled from 'styled-components';

export const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #f3f4f6;
  cursor: pointer;
  background-color: white;
  transition: background-color 0.15s ease;
  margin-bottom: 16px;
  border-radius: 16px;

  &:hover {
    background-color: #f9fafb;
  }
`;

export const AvatarContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #eee;
  margin-right: 12px;
  
  flex-shrink: 0;
`;

export const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 100%;
  object-fit: cover;
`;

export const AvatarFallback = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-weight: bold;
  font-size: 16px;
`;

export const ContentContainer = styled.div`
  flex: 1;
  min-width: 0;
`;

export const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
`;

export const DisplayName = styled.span`
  font-weight: 600;
  font-size: 14px;
  color: #111;
  white-space: nowrap;
  
  text-overflow: ellipsis;
`;

export const TimeStamp = styled.span`
  font-size: 11px;
  color: #999;
  flex-shrink: 0;
  margin-left: 8px;
`;

export const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LastMessage = styled.span`
  font-size: 13px;
  color: #666;
  white-space: nowrap;
  
  text-overflow: ellipsis;
  max-width: 140px;
`;

export const UnreadBadge = styled.span`
  background-color: #EF4444;
  color: white;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 16px;
  text-align: center;
  flex-shrink: 0;
  margin-left: 8px;
`;

