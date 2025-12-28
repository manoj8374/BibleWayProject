import React, { useState } from 'react';
import styled from 'styled-components';
import type { Chapter } from '../../../../../services/admin/admin.service';
import { adminService } from '../../../../../services/admin/admin.service';
import { showSuccess, showError } from '../../../../../utils/toast';

interface ChapterListProps {
  chapters: Chapter[];
  loading: boolean;
  onRefresh: () => void;
}

const ListContainer = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const ChapterItem = styled.div`
  padding: 24px;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.2s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #fafafa;
  }
`;

const ChapterHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 12px;
`;

const ChapterNumber = styled.div`
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #8B1F1F;
  color: white;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 700;
`;

const ChapterInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const ChapterTitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
`;

const ChapterTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
  flex: 1;
`;

const ChapterDescription = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
`;

const ChapterMeta = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 12px;
  font-size: 12px;
  color: #9ca3af;
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const DeleteButton = styled.button`
  padding: 6px;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: #ef4444;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;

  &:hover:not(:disabled) {
    opacity: 1;
    background: #fee2e2;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #6b7280;
`;

const EmptyStateIcon = styled.div`
  font-size: 64px;
  margin-bottom: 16px;
`;

const EmptyStateText = styled.p`
  font-size: 16px;
  margin: 0;
`;

export const ChapterList: React.FC<ChapterListProps> = ({ chapters, loading, onRefresh }) => {
  const [deletingChapterId, setDeletingChapterId] = useState<string | null>(null);

  const handleDelete = async (chapter: Chapter) => {
    if (!window.confirm(`Are you sure you want to delete chapter "${chapter.title}"? This action cannot be undone.`)) {
      return;
    }

    setDeletingChapterId(chapter.chapter_id);
    try {
      const response = await adminService.deleteChapter(chapter.chapter_id);
      
      if (response.success) {
        showSuccess(response.message || 'Chapter deleted successfully');
        onRefresh();
      } else {
        const errorMessage = response.detail || response.error || response.message || 'Failed to delete chapter';
        showError(errorMessage);
      }
    } catch (error) {
      console.error('Error deleting chapter:', error);
      showError('Failed to delete chapter. Please try again.');
    } finally {
      setDeletingChapterId(null);
    }
  };

  if (loading) {
    return (
      <ListContainer>
        <EmptyState>
          <EmptyStateText>Loading chapters...</EmptyStateText>
        </EmptyState>
      </ListContainer>
    );
  }

  if (chapters.length === 0) {
    return (
      <ListContainer>
        <EmptyState>
          <EmptyStateIcon>📚</EmptyStateIcon>
          <EmptyStateText>
            No chapters yet. Click "Add Chapters" to upload chapter files.
          </EmptyStateText>
        </EmptyState>
      </ListContainer>
    );
  }

  return (
    <ListContainer>
      {chapters.map((chapter) => (
        <ChapterItem key={chapter.chapter_id}>
          <ChapterHeader>
            <ChapterNumber>{chapter.chapter_number}</ChapterNumber>
            <ChapterInfo>
              <ChapterTitleContainer>
                <ChapterTitle>{chapter.title}</ChapterTitle>
                <DeleteButton
                  onClick={() => handleDelete(chapter)}
                  disabled={deletingChapterId === chapter.chapter_id}
                  title="Delete chapter"
                >
                  {deletingChapterId === chapter.chapter_id ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6M12 18h.01" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" />
                    </svg>
                  )}
                </DeleteButton>
              </ChapterTitleContainer>
              {chapter.description && (
                <ChapterDescription>{chapter.description}</ChapterDescription>
              )}
              <ChapterMeta>
                {chapter.chapter_name && (
                  <MetaItem>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {chapter.chapter_name}
                  </MetaItem>
                )}
                <MetaItem>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {new Date(chapter.created_at).toLocaleDateString()}
                </MetaItem>
              </ChapterMeta>
            </ChapterInfo>
          </ChapterHeader>
        </ChapterItem>
      ))}
    </ListContainer>
  );
};

