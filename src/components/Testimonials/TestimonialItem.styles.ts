import styled from 'styled-components';

export const TestimonialItem = styled.div<{ $isExpanded?: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
  background-color: ${props => props.$isExpanded ? '#f5f5f5' : 'transparent'};

  &:hover {
    background-color: #f5f5f5;
  }
`;

export const Avatar = styled.div<{ $bgColor?: string; $bgImage?: string }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: ${props => props.$bgColor || '#E74C3C'};
  background-image: ${props => props.$bgImage ? `url(${props.$bgImage})` : 'none'};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 18px;
  flex-shrink: 0;
  border: 2px solid white;
`;

export const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const UserName = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: #000000;
`;

export const RatingWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Description = styled.div<{ $isExpanded?: boolean }>`
  font-size: 13px;
  color: #666666;
  line-height: 1.5;
  margin-top: 4px;
  ${props => !props.$isExpanded && `
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  `}
`;

export const ExpandIcon = styled.div<{ $isExpanded?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666666;
  font-size: 18px;
  transition: transform 0.2s;
  transform: ${props => props.$isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'};
  flex-shrink: 0;
`;

export const MediaSection = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const MediaContainer = styled.div`
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ImageMedia = styled.img`
  width: 100%;
  max-height: 300px;
  object-fit: contain;
  display: block;
  border-radius: 8px;
`;

export const VideoMedia = styled.video`
  width: 100%;
  max-height: 300px;
  border-radius: 8px;
`;

export const AudioMedia = styled.audio`
  width: 100%;
  border-radius: 8px;
`;

