import styled from 'styled-components';

export const Container = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;

  @media (max-width: 768px) {
    padding: 16px;
    border-radius: 12px;
    margin-bottom: 16px;
  }
`;

export const BibleCard = styled.div<{ $backgroundImage?: string; $backgroundGradient: string }>`
  border-radius: 12px;
  padding: 20px;
  color: white;
  margin-bottom: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  
  min-height: 120px;
  background: ${props => props.$backgroundGradient};
  ${props => props.$backgroundImage && `
    background-image: url(${props.$backgroundImage});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  `}

  &:last-child {
    margin-bottom: 0;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.$backgroundImage 
      ? 'rgba(0, 0, 0, 0.4)' 
      : 'rgba(255, 255, 255, 0)'};
    transition: background 0.3s ease;
    z-index: 0;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);

    &::before {
      background: ${props => props.$backgroundImage 
        ? 'rgba(0, 0, 0, 0.5)' 
        : 'rgba(255, 255, 255, 0.1)'};
    }
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 16px;
    min-height: 100px;
    border-radius: 10px;
    margin-bottom: 12px;
  }
`;

export const PromotionIcon = styled.div`
  font-size: 32px;
  margin-bottom: 8px;
`;

export const BibleTitle = styled.h4`
  font-size: 24px;
  margin-bottom: 8px;
  font-weight: 600;
  position: relative;
  z-index: 1;
  color: White;


  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 6px;
  }
`;

export const BibleDescription = styled.p`
  font-size: 13px;
  line-height: 1.5;
  opacity: 0.95;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export const BibleViewAllButton = styled.button`
  background: none;
  border: 2px solid white;
  padding: 8px 16px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 16px;
  border-radius: 8px;
`;

export const CarouselContainer = styled.div`
  margin-top: 16px;
  position: relative;
`;

export const CarouselTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 12px;
  }
`;

export const CarouselScrollContainer = styled.div`
  display: flex;
  gap: 16px;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 8px;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    height: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  
  /* Hide scrollbar for Firefox */
  scrollbar-width: thin;
  scrollbar-color: #888 #f1f1f1;

  @media (max-width: 768px) {
    gap: 12px;
  }
`;

export const CarouselBookCard = styled.div<{ $coverImage?: string | null }>`
  min-width: 160px;
  width: 160px;
  height: 220px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  background: ${props => props.$coverImage 
    ? `url(${props.$coverImage})` 
    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.$coverImage 
      ? 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)' 
      : 'rgba(0, 0, 0, 0.3)'};
    z-index: 1;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    min-width: 140px;
    width: 140px;
    height: 200px;
  }
`;

export const CarouselBookContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 12px;
  z-index: 2;
  color: white;
`;

export const CarouselBookTitle = styled.h4`
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 4px 0;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

export const CarouselBookAgeGroup = styled.p`
  font-size: 12px;
  margin: 0;
  opacity: 0.9;
  
  @media (max-width: 768px) {
    font-size: 11px;
  }
`;

export const ViewAllCard = styled.div`
  min-width: 160px;
  width: 160px;
  height: 220px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 2px dashed rgba(255, 255, 255, 0.3);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
  }

  &:active {
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    min-width: 140px;
    width: 140px;
    height: 200px;
  }
`;

export const ViewAllIcon = styled.div`
  font-size: 32px;
  margin-bottom: 8px;
`;

export const ViewAllText = styled.span`
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

export const CarouselLoading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: #666;
  font-size: 14px;
`;

export const CarouselError = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: #e74c3c;
  font-size: 14px;
`;