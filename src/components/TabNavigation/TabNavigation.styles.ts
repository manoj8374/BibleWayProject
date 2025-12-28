import styled from 'styled-components';

export const TabContainer = styled.div`
  display: flex;
  gap: 32px;
  border-bottom: 2px solid #e5e7eb;
  margin-bottom: 24px;
  width: 100%;

  @media (max-width: 768px) {
    gap: 16px;
  }
`;

export const TabButton = styled.button<{ $isActive: boolean }>`
  padding: 12px 0;
  border: none;
  background: none;
  font-size: 15px;
  font-weight: ${props => props.$isActive ? '600' : '500'};
  color: ${props => props.$isActive ? 'black' : '#1A1A1A'};
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  flex: 1;
  white-space: nowrap;

  border-bottom: ${props => props.$isActive ? '2px solid #0860C4' : '2px solid transparent'};

  @media (max-width: 768px) {
    font-size: 13px;
    padding: 10px 0;
  }
`;