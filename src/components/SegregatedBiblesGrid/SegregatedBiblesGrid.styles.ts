import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #1A1A1A;
  margin-bottom: 24px;
`;

export const CategoriesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: 768px) {
    gap: 16px;
  }
`;

export const CategoryCard = styled.div<{ $backgroundImage: string }>`
  position: relative;
  flex: 1 1 calc(33.333% - 14px);
  min-width: 280px;
  height: 200px;
  border-radius: 12px;
  
  cursor: pointer;
  background-image: url(${props => props.$backgroundImage});
  background-size: cover;
  background-position: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 1200px) {
    flex: 1 1 calc(50% - 10px);
  }

  @media (max-width: 768px) {
    flex: 1 1 100%;
    min-width: 100%;
  }
`;

export const CategoryOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.7) 100%);
  padding: 20px;
  display: flex;
  flex-direction: column;
  transition: background 0.3s ease;

  ${CategoryCard}:hover & {
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.8) 100%);
  }
`;

export const CategoryTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: white;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const CategoryDescription = styled.p`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.4;
  margin-bottom: 12px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const CategoryIcon = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
  transition: all 0.3s ease;

  ${CategoryCard}:hover & {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
`;
