import styled from 'styled-components';

export const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  gap: 20px;
  height: 100%;
`;

export const IconWrapper = styled.div<{ isActive?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.isActive 
    ? '#0e3a66' 
    : 'transparent'};
  width: 40px;
  height: 40px;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.2s, background 0.2s;

  &:hover {
    transform: scale(1.05);
    background: ${props => props.isActive 
      ? '#0e3a66' 
      : 'rgba(14, 58, 102, 0.1)'};
  }
`;
