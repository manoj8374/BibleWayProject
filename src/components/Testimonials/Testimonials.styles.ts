import styled from 'styled-components';

export const Container = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 16px;
    border-radius: 12px;
    margin-bottom: 16px;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #000000;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

export const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background-color: #0E3A66;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0a2d4d;
  }

  &:active {
    transform: scale(0.98);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

export const TestimonialsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

export const LoadingContainer = styled.div`
  padding: 40px 20px;
  text-align: center;
  color: #666666;
  font-size: 14px;
`;

export const ErrorContainer = styled.div`
  padding: 40px 20px;
  text-align: center;
  color: #e74c3c;
  font-size: 14px;
`;

export const EmptyContainer = styled.div`
  padding: 40px 20px;
  text-align: center;
  color: #999999;
  font-size: 14px;
`;

