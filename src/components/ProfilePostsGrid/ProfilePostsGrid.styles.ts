import styled from 'styled-components';

export const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #F5F5DC;
  padding: 24px;
  border-radius: 0 0 24px 24px;
  align-items: center;
  overflow: hidden;
`;

export const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

export const PostsContainer = styled.div<{ $currentIndex: number }>`
  display: flex;
  gap: 16px;
  transition: transform 0.3s ease-in-out;
  transform: translateX(calc(-${props => props.$currentIndex} * 100%));
  will-change: transform;
`;

export const PostWrapper = styled.div`
  flex: 0 0 calc(50% - 8px);
  min-width: 0;
  max-width: 500px;
  box-sizing: border-box;
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
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
  font-size: 24px;
  line-height: 1;
  font-weight: bold;

  &:hover:not(:disabled) {
    background: rgba(0, 0, 0, 0.7);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

export const PageIndicator = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
  width: 100%;
`;

export const IndicatorDot = styled.button<{ active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: ${props => props.active ? '#1e3a8a' : 'rgba(0, 0, 0, 0.3)'};
  cursor: pointer;
  transition: background 0.2s;
  padding: 0;

  &:hover {
    background: ${props => props.active ? '#1e3a8a' : 'rgba(0, 0, 0, 0.5)'};
  }
`;
