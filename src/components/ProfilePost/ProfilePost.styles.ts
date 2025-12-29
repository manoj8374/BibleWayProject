import styled from 'styled-components';

export const PostContainer = styled.div`
  width: 100%;
  max-width: 500px;
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const PostHeader = styled.div<{ isPrayerPost?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  background-color: ${props => props.isPrayerPost ? 'none' : '#0E3A66'};
  margin: -20px -20px 16px -20px;
  padding: 16px 20px;
  border-radius: 24px 24px 0 0;
`;

export const UserAvatar = styled.div<{ $bgColor: string }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: ${props => props.$bgColor || '#E74C3C'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 20px;
  flex-shrink: 0;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const UserInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const UserName = styled.div<{ isPrayerPost?: boolean }>`
  font-weight: 600;
  font-size: 16px;
  color: ${props => props.isPrayerPost ? 'black' : 'white'};

`;

export const UserTitle = styled.div<{ isPrayerPost?: boolean }>`
  font-size: 13px;
  color: ${props => props.isPrayerPost ? '#475569' : 'rgba(255, 255, 255, 0.8)'};
`;

export const MenuButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  padding: 4px 8px;
  line-height: 1;
  position: relative; /* For dropdown positioning */
  
  &:hover {
    opacity: 0.8;
  }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  padding: 8px 0;
  z-index: 10;
  min-width: 120px;
`;

export const DropdownItem = styled.div`
  padding: 8px 16px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  
  &:hover {
    background-color: #f3f4f6;
  }
`;

export const PostContent = styled.div`
  margin-bottom: 16px;
`;

export const PostText = styled.p`
  color: #4B5563;
  line-height: 1.6;
  font-size: 15px;
`;

export const PostTextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 15px;
  color: #4B5563;
  resize: vertical;
  min-height: 80px;
  margin-bottom: 8px;
  font-family: inherit;
`;

export const EditActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-bottom: 16px;
`;

export const ActionButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 6px 12px;
  border-radius: 4px;
  border: none;
  font-size: 14px;
  cursor: pointer;
  background-color: ${props => props.variant === 'primary' ? '#0E3965' : '#e5e7eb'};
  color: ${props => props.variant === 'primary' ? 'white' : '#374151'};

  &:hover {
    opacity: 0.9;
  }
`;

export const Hashtag = styled.span`
  color: #3B82F6;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const MediaContainer = styled.div`
  width: 80%;
  border-radius: 12px;
  
  margin-bottom: 16px;
  position: relative;
  background-color: #000;
  max-height: 300px;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const VideoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.1);
`;

export const PlayButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

export const ImageMedia = styled.img`
  width: 80%;
  height: 100%;
  max-height: 300px;
  object-fit: contain;
  display: block;
`;

export const AudioMedia = styled.audio`
  width: 100%;
  margin-bottom: 16px;
  border-radius: 8px;
`;

export const EngagementStats = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 16px;
  position: relative;
  justify-content: space-between;
`;

export const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: color 0.2s ease;
  
  &:hover {
    color: #3B82F6;
  }
`;

export const StatIcon = styled.span`
  font-size: 18px;
`;

export const StatText = styled.span`
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const StatNumber = styled.span`
  font-weight: 500;
`;

export const StatLabel = styled.span`
  font-weight: 500;
  
  @media (max-width: 400px) {
    display: none;
  }
`;

export const BookmarkIcon = styled.div`
  margin-left: auto;
  font-size: 20px;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 1;
  }
`;

export const Divider = styled.div`
  height: 1px;
  background-color: #E5E7EB;
  margin-bottom: 16px;
`;

export const CommentSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const CommentAvatar = styled.div<{ $bgColor: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.$bgColor};
  flex-shrink: 0;
`;

export const CommentInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border-radius: 24px;
  border: 1px solid #E5E7EB;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s ease;
  
  &:focus {
    border-color: #3B82F6;
  }
  
  &::placeholder {
    color: #9CA3AF;
  }
`;

export const AddButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #E5E7EB;
  background: white;
  cursor: pointer;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  color: #6B7280;
  
  &:hover {
    background-color: #F3F4F6;
    border-color: #3B82F6;
    color: #3B82F6;
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

export const LeftSideEles = styled.div`
  display: flex;
  gap: 16px;
`

export const BookMarkIconWrapper = styled.div`
  cursor: pointer;
`

export const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const NavigationButton = styled.button<{ position: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  ${props => props.position}: 10px;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const PageIndicator = styled.div`
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
  background: rgba(0, 0, 0, 0.3);
  padding: 4px 8px;
  border-radius: 12px;
`;

export const IndicatorDot = styled.div<{ active: boolean }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.5)'};
  transition: background-color 0.2s;
`;

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

export const ConfirmationModal = styled.div`
    background: white;
    padding: 24px;
    border-radius: 12px;
    width: 100%;
    max-width: 400px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const ModalTitle = styled.h3`
    font-size: 18px;
    font-weight: 600;
    color: #111827;
    margin: 0;
`;

export const ModalContent = styled.p`
    font-size: 14px;
    color: #4b5563;
    margin: 0;
`;

export const ModalActions = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 8px;
`;

export const ModalButton = styled.button<{ variant?: 'danger' | 'secondary' }>`
    padding: 8px 16px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    border: none;
    cursor: pointer;
    background-color: ${props => props.variant === 'danger' ? '#ef4444' : '#f3f4f6'};
    color: ${props => props.variant === 'danger' ? 'white' : '#374151'};

    &:hover {
        opacity: 0.9;
    }
`;

