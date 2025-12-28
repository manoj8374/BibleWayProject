import styled from 'styled-components';

export const NotesContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: white;
`;

export const NotesHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid #e5e7eb;
`;

export const NotesTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
`;

export const NotesCount = styled.span`
  font-size: 14px;
  color: #6b7280;
`;

export const NotesContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`;

export const NoteEditor = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: #f9fafb;
`;

export const NoteTextarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  color: #1f2937;
  background: white;
  resize: vertical;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const EditorActions = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;

export const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  ${props => props.$variant === 'primary' ? `
    background: #3b82f6;
    color: white;
    
    &:hover {
      background: #2563eb;
    }
    
    &:disabled {
      background: #93c5fd;
      cursor: not-allowed;
    }
  ` : `
    background: white;
    color: #6b7280;
    border: 1px solid #d1d5db;
    
    &:hover {
      background: #f9fafb;
    }
  `}
`;

export const NotesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const NoteItem = styled.div`
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: white;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
`;

export const NoteHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const NoteDate = styled.span`
  font-size: 12px;
  color: #6b7280;
`;

export const NoteActions = styled.div`
  display: flex;
  gap: 8px;
`;

export const IconButton = styled.button`
  padding: 4px;
  border: none;
  background: transparent;
  color: #6b7280;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: #f3f4f6;
    color: #1f2937;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const NoteText = styled.p`
  font-size: 14px;
  color: #374151;
  line-height: 1.6;
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 20px;
  text-align: center;
`;

export const EmptyStateIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

export const EmptyStateText = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #6b7280;
  margin: 0 0 8px 0;
`;

export const EmptyStateSubtext = styled.p`
  font-size: 14px;
  color: #9ca3af;
  margin: 0;
`;

