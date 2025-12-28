import styled from 'styled-components';

export const SidebarContainer = styled.div`
  background: #e8eaed;
  height: 100vh;
  overflow-y: auto;
  position: sticky;
  top: 0;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #c4c7cc;
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #a8abad;
  }
`;

export const SidebarHeader = styled.div`
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

export const IconButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: #2c4057;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #1f2d3d;
  }

  svg {
    width: 24px;
    height: 24px;
    color: white;
  }
`;

export const ChaptersList = styled.div`
  padding: 16px 24px;
`;

export const ChapterItem = styled.div<{ $isActive?: boolean }>`
  padding: 14px 20px;
  margin-bottom: 6px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  background: ${props => props.$isActive ? '#2c4057' : 'transparent'};

  &:hover {
    background: ${props => props.$isActive ? '#1f2d3d' : 'rgba(44, 64, 87, 0.1)'};
  }
`;

export const ChapterItemTitle = styled.div<{ $isActive?: boolean }>`
  font-size: 15px;
  font-weight: ${props => props.$isActive ? '600' : '400'};
  color: ${props => props.$isActive ? 'white' : '#1a1a1a'};
  line-height: 1.5;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const EmptyState = styled.div`
  padding: 40px 20px;
  text-align: center;
  color: #6b7280;
  font-size: 14px;
`;

