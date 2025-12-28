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

export const ImageWrapper = styled.div`
  width: 100%;
`

export const Title = styled.h2`
  margin: 0 0 20px 0;
  font-size: 20px;
  font-weight: 600;
  color: #000000;

  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 16px;
  }
`;

export const PromotionsList = styled.div`
  display: flex;
  flex-direction: column;
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

