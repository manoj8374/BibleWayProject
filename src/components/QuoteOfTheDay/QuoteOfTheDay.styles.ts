import styled from 'styled-components';
import { HeadingThreeTag } from '../../Typography';

export const QuoteContainer = styled.div`
  background-color: #0E3A66;
  border-radius: 16px;
  padding: 24px;
  color: white;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
  
`;

export const QuoteIcon = styled.div`
  font-size: 32px;
  margin-bottom: 8px;
  display: inline-block;
`;

export const QuoteTitle = styled(HeadingThreeTag)`
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 0.3px;
`;

export const QuoteText = styled.p`
  margin: 0 0 16px 0;
  font-size: 16px;
  line-height: 1.6;
  opacity: 0.95;
  font-weight: 400;
`;

export const LikesSection = styled.div`
padding-left: 16px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 500;
  opacity: 0.9;
  transition: opacity 0.2s, transform 0.2s;
  
  &:hover {
    opacity: 1;
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const LikeIcon = styled.span`
  font-size: 16px;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
`;

export const AddPostButtonMobile = styled.button`
  display: none;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  color: white;
  background-color: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 24px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: transform 0.2s, box-shadow 0.2s, background-color 0.2s;
  margin-top: 16px;
  width: 100%;
  justify-content: center;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    background-color: rgba(255, 255, 255, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;