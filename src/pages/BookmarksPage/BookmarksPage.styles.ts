import styled from 'styled-components';

export const PageContainer = styled.div`
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
  min-height: calc(100vh - 60px);
  background-color: #f5f5f5;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const PageTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #181821;
  margin: 0 0 24px 0;

  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 16px;
  }
`;

export const BookmarksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  margin-top: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

export const BookmarkCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  gap: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
`;

export const BookCover = styled.img`
  width: 100px;
  height: 140px;
  object-fit: cover;
  border-radius: 8px;
  background-color: #f0f0f0;
  flex-shrink: 0;
`;

export const BookContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

export const BookTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #181821;
  margin: 0 0 8px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const BookDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0 0 12px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.4;
`;

export const ProgressBarContainer = styled.div`
  width: 100%;
  height: 6px;
  background-color: #E5E5E5;
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 12px;
`;

export const ProgressBar = styled.div<{ $progress: number }>`
  height: 100%;
  background-color: #0E3A66;
  width: ${props => props.$progress}%;
  transition: width 0.3s ease;
  border-radius: 3px;

`;

export const ContinueButton = styled.button`
margin-top: 12px;
  padding: 10px 16px;
  color: #0E3A66;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  width: 100%;
  border: 1px solid #0E3A66;

    &:hover {
      background-color: #0d3459;
      color: white;
    }
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  font-size: 18px;
  color: #666;
`;

export const EmptyState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  flex-direction: column;
`;

export const EmptyStateText = styled.p`
  font-size: 18px;
  color: #666;
  margin: 0;
`;

