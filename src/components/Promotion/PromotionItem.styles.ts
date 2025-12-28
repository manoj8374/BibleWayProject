import styled from 'styled-components';

export const ItemContainer = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px;
  background: #ffffff;
  border-radius: 8px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const ImageContainer = styled.div`
  flex-shrink: 0;
  width: 200px;
  height: 200px;
  position: relative;
  border-radius: 8px;
  
  background: #f5f5f5;

  @media (max-width: 768px) {
    width: 100%;
    height: 250px;
  }
`;

export const PromotionImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
`;

export const Title = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #000000;
  flex: 1;
`;

export const Price = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #000000;
`;

export const ViewDetailsButton = styled.button`
  padding: 8px 16px;
  background: #E3F2FD;
  color: #000000;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  white-space: nowrap;

  &:hover {
    background: #BBDEFB;
  }
`;

export const Description = styled.p`
  margin: 0;
  font-size: 14px;
  color: #666666;
  line-height: 1.5;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  
  text-overflow: ellipsis;
`;

export const BuyNowButton = styled.button`
  padding: 12px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
  align-self: flex-start;
  margin-top: auto;

  &:hover {
    opacity: 0.9;
  }
`;

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
  font-size: 20px;
  line-height: 1;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
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
  background: ${props => props.active ? '#ffffff' : 'rgba(255, 255, 255, 0.5)'};
  transition: background 0.2s;
`;

