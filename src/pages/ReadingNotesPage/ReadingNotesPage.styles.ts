import styled from 'styled-components';

export const PageContainer = styled.div`
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
  min-height: calc(100vh - 60px);
  background-color: #f5f5f5;

  @media (max-width: 1024px) {
    padding: 20px;
  }

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    margin-bottom: 24px;
  }
`;

export const PageTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #181821;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  gap: 24px;
  align-items: flex-start;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 20px;
  }
`;

export const BooksSection = styled.div`
  flex: 1;
  min-width: 0;

  @media (min-width: 1025px) {
    max-width: 400px;
  }
`;

export const BooksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 16px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

export const BookCard = styled.div<{ $isSelected?: boolean }>`
  background: white;
  border-radius: 12px;
  padding: 20px;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 2px solid ${(props) => (props.$isSelected ? '#0e3a66' : 'transparent')};
  display: flex;
  flex-direction: column;
  gap: 12px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    border-color: #0e3a66;
  }

  @media (max-width: 768px) {
    padding: 16px;
    gap: 10px;
  }
`;

export const BookCardContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const BookName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #181821;
  margin: 0 0 8px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const BookInfo = styled.div`
  font-size: 14px;
  color: #666;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const BookCardActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 4px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

export const ViewNotesButton = styled.button`
  padding: 10px 16px;
  background-color: #10b981;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 1;

  &:hover {
    background-color: #059669;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 12px 16px;
    font-size: 15px;
    min-height: 44px;
    width: 100%;
  }
`;

export const OpenBookButton = styled.button`
  padding: 10px 16px;
  background-color: #0e3a66;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 1;

  &:hover {
    background-color: #0a2d4d;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(14, 58, 102, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 12px 16px;
    font-size: 15px;
    min-height: 44px;
    width: 100%;
  }
`;

export const NotesSection = styled.div<{ $isOpen?: boolean }>`
  flex: 1;
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  min-height: 400px;
  display: flex;
  flex-direction: column;

  @media (max-width: 1024px) {
    display: ${(props) => (props.$isOpen ? 'flex' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    border-radius: 0;
    padding: 20px;
    overflow-y: auto;
    min-height: 100vh;
    transform: ${(props) => (props.$isOpen ? 'translateX(0)' : 'translateX(100%)')};
    transition: transform 0.3s ease-in-out;
  }

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const NotesHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #e5e7eb;

  @media (max-width: 768px) {
    margin-bottom: 20px;
    padding-bottom: 12px;
  }
`;

export const NotesTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #181821;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const CloseButton = styled.button`
  display: none;

  @media (max-width: 1024px) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: none;
    background: #f3f4f6;
    color: #181821;
    cursor: pointer;
    transition: all 0.2s;
    flex-shrink: 0;

    &:hover {
      background: #e5e7eb;
    }

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

export const ChaptersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  flex: 1;

  @media (max-width: 768px) {
    gap: 24px;
  }
`;

export const ChapterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ChapterHeader = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0e3a66;
  margin: 0;
  padding-bottom: 12px;
  border-bottom: 2px solid #e5e7eb;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const NotesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const NoteCard = styled.div`
  background: #f9fafb;
  border-radius: 10px;
  padding: 16px;
  border: 1px solid #e5e7eb;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    border-color: #0e3a66;
  }

  @media (max-width: 768px) {
    padding: 14px;
  }
`;

export const NoteContent = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: #374151;
  margin: 0 0 12px 0;
  white-space: pre-wrap;
  word-wrap: break-word;
`;

export const NoteTextarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 12px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 15px;
  font-family: inherit;
  line-height: 1.6;
  color: #374151;
  resize: vertical;
  margin-bottom: 12px;
  transition: border-color 0.2s;
  background: white;

  &:focus {
    outline: none;
    border-color: #0e3a66;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const NoteMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  padding-top: 12px;
  border-top: 1px solid #e5e7eb;
`;

export const NoteDate = styled.div`
  font-size: 12px;
  color: #6b7280;
  font-weight: 500;

  span {
    color: #9ca3af;
  }
`;

export const NoteActions = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const ActionButton = styled.button<{ $variant?: 'edit' | 'delete' | 'save' | 'cancel' }>`
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  min-height: 32px;
  min-width: 60px;

  ${(props) => {
    switch (props.$variant) {
      case 'edit':
        return `
          background-color: #0e3a66;
          color: white;
          &:hover:not(:disabled) {
            background-color: #0a2d4d;
            transform: translateY(-1px);
          }
        `;
      case 'delete':
        return `
          background-color: #ef4444;
          color: white;
          &:hover:not(:disabled) {
            background-color: #dc2626;
            transform: translateY(-1px);
          }
        `;
      case 'save':
        return `
          background-color: #10b981;
          color: white;
          &:hover:not(:disabled) {
            background-color: #059669;
            transform: translateY(-1px);
          }
        `;
      case 'cancel':
        return `
          background-color: #6b7280;
          color: white;
          &:hover:not(:disabled) {
            background-color: #4b5563;
            transform: translateY(-1px);
          }
        `;
      default:
        return '';
    }
  }}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 8px 14px;
    font-size: 14px;
    min-height: 44px;
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  text-align: center;
  min-height: 400px;
`;

export const EmptyStateIcon = styled.div`
  width: 64px;
  height: 64px;
  margin-bottom: 16px;
  color: #9ca3af;
`;

export const EmptyStateText = styled.p`
  font-size: 18px;
  color: #6b7280;
  font-weight: 500;
  margin: 0;
  max-width: 400px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: 40px 20px;
`;

export const LoadingText = styled.div`
  font-size: 16px;
  color: #6b7280;
  margin-top: 16px;
`;

export const Overlay = styled.div<{ $isOpen?: boolean }>`
  display: none;

  @media (max-width: 1024px) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    opacity: ${(props) => (props.$isOpen ? 1 : 0)};
    visibility: ${(props) => (props.$isOpen ? 'visible' : 'hidden')};
    transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
  }
`;

