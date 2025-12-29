import styled from 'styled-components';
export const CommentsSectionContainer = styled.div`
  padding: 0 16px 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 768px) {
    padding: 0px;
  }
`;

export const LoadingText = styled.div`
  text-align: center;
  color: #6B7280;
  padding: 20px;
  font-size: 14px;
`;

export const FirstLetter = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  background-color: #E5E7EB;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: flex-start;
  margin-top: 16px;
`;

export const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 400px;
  overflow-y: auto;
  
  /* Custom Scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: #E5E7EB;
    border-radius: 20px;
  }
`;

export const CommentItem = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
`;

export const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  background-color: #E5E7EB;
`;

export const CommentContent = styled.div`
  flex: 1;
  background-color: #F9FAFB;
  padding: 10px 14px;
  border-radius: 12px;
  border-top-left-radius: 4px; /* Callout effect */
`;

export const CommentLikeAndDescription = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

export const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
`;

export const CommentAuthor = styled.span`
  font-weight: 600;
  font-size: 13px;
  color: #111827;
`;

export const CommentTime = styled.span`
  font-size: 11px;
  color: #9CA3AF;
`;

export const CommentText = styled.p`
  font-size: 14px;
  color: #374151;
  line-height: 1.4;
  margin: 0;
  white-space: pre-wrap; /* Preserve line breaks */
`;

export const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 6px;
  margin-top: 8px;
`;

export const LikeButton = styled.button<{ liked?: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  color: ${props => props.liked ? '#EF4444' : '#6B7280'};
  transition: color 0.2s;

  &:hover {
    color: ${props => props.liked ? '#DC2626' : '#374151'};
  }

  svg {
    width: 16px;
    height: 16px;
    fill: ${props => props.liked ? 'currentColor' : 'none'};
  }
`;

export const LikeCount = styled.span`
  font-size: 12px;
  color: #6B7280;
  font-weight: 500;
`;

export const CommentActions = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-top: 4px;
`;

export const EditButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  font-size: 12px;
  color: #3B82F6;
  transition: color 0.2s;

  &:hover {
    color: #2563EB;
  }
`;

export const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  font-size: 12px;
  color: #EF4444;
  transition: color 0.2s;

  &:hover {
    color: #DC2626;
  }
`;

export const EditInput = styled.textarea`
  width: 100%;
  padding: 8px;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  min-height: 60px;
  margin-bottom: 8px;

  &:focus {
    outline: none;
    border-color: #3B82F6;
  }
`;

export const EditActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;

export const SaveButton = styled.button`
  background: #3B82F6;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #2563EB;
  }

  &:disabled {
    background: #9CA3AF;
    cursor: not-allowed;
  }
`;

export const CancelButton = styled.button`
  background: #F3F4F6;
  color: #374151;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #E5E7EB;
  }
`;