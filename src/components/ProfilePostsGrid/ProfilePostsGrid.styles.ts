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

  @media (max-width: 768px) {
    padding: 4px;
  }
`;

export const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const PostsContainer = styled.div<{ $currentIndex: number }>`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;

`;

export const PostWrapper = styled.div`
  width: 45%;
  min-width: 315px;
  max-width: 700px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 100%;
  }
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
