import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import type { Chapter } from '../../../../../services/admin/admin.service';
import { adminService } from '../../../../../services/admin/admin.service';
import { showSuccess, showError } from '../../../../../utils/toast';
import ConfirmationModal from '../../../../../components/ConfirmationModal/ConfirmationModal';

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

const BulkActionBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background: #f9fafb;
  border-bottom: 2px solid #e5e7eb;
  gap: 16px;
`;

const BulkActionInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: #374151;
  font-weight: 500;
`;

const BulkActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const BulkDeleteButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  background: #ef4444;
  color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover:not(:disabled) {
    background: #dc2626;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const ClearSelectionButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
  color: #374151;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f9fafb;
  }
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 24px;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
  gap: 12px;
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #8B1F1F;
`;

const ChapterItem = styled.div<{ $selected?: boolean }>`
  padding: 24px;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.2s;
  background-color: ${props => props.$selected ? '#fef2f2' : 'white'};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${props => props.$selected ? '#fee2e2' : '#fafafa'};
  }
`;

const ChapterItemContent = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
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
  const [selectedChapterIds, setSelectedChapterIds] = useState<Set<string>>(new Set());
  const [isBulkDeleting, setIsBulkDeleting] = useState(false);
  const [bulkDeleteModal, setBulkDeleteModal] = useState<{ isOpen: boolean; chapterTitles: string; count: number }>({
    isOpen: false,
    chapterTitles: '',
    count: 0
  });
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; chapter: Chapter | null }>({
    isOpen: false,
    chapter: null
  });

  const handleToggleSelect = (chapterId: string) => {
    setSelectedChapterIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(chapterId)) {
        newSet.delete(chapterId);
      } else {
        newSet.add(chapterId);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (selectedChapterIds.size === chapters.length) {
      setSelectedChapterIds(new Set());
    } else {
      setSelectedChapterIds(new Set(chapters.map(ch => ch.chapter_id)));
    }
  };

  const handleClearSelection = () => {
    setSelectedChapterIds(new Set());
  };

  const handleBulkDeleteClick = () => {
    if (selectedChapterIds.size === 0) return;

    const selectedChapters = chapters.filter(ch => selectedChapterIds.has(ch.chapter_id));
    const chapterTitles = selectedChapters.map(ch => `"${ch.title}"`).join(', ');
    
    setBulkDeleteModal({
      isOpen: true,
      chapterTitles,
      count: selectedChapterIds.size
    });
  };

  const handleBulkDeleteConfirm = async () => {
    if (selectedChapterIds.size === 0) return;

    setIsBulkDeleting(true);
    setBulkDeleteModal({ isOpen: false, chapterTitles: '', count: 0 });
    try {
      const chapterIdsArray = Array.from(selectedChapterIds);
      const response = await adminService.bulkDeleteChapters(chapterIdsArray);
      
      if (response.success) {
        if (response.deleted_count > 0) {
          const successMessage = response.message || `${response.deleted_count} chapter(s) deleted successfully`;
          showSuccess(successMessage);
          
          if (response.failed_count > 0 && response.errors && response.errors.length > 0) {
            showError(`Some chapters failed to delete: ${response.errors.join(', ')}`);
          }
          
          setSelectedChapterIds(new Set());
          onRefresh();
        } else {
          // All deletions failed
          const errorMessage = response.error || response.message || 'Failed to delete chapters';
          const errors = response.errors && response.errors.length > 0 
            ? response.errors.join(', ') 
            : errorMessage;
          showError(errors);
        }
      } else {
        // Partial success or full failure
        if (response.deleted_count > 0 && response.failed_count > 0) {
          // Partial success
          const partialMessage = response.message || `${response.deleted_count} chapter(s) deleted, ${response.failed_count} failed`;
          showSuccess(partialMessage);
          if (response.errors && response.errors.length > 0) {
            showError(response.errors.join(', '));
          }
          setSelectedChapterIds(new Set());
          onRefresh();
        } else {
          // Full failure
          const errorMessage = response.error || response.message || 'Failed to delete chapters';
          const errors = response.errors && response.errors.length > 0 
            ? response.errors.join(', ') 
            : errorMessage;
          showError(errors);
        }
      }
    } catch (error) {
      console.error('Error deleting chapters:', error);
      showError('Failed to delete chapters. Please try again.');
    } finally {
      setIsBulkDeleting(false);
    }
  };

  const handleDeleteClick = (chapter: Chapter) => {
    setDeleteModal({ isOpen: true, chapter });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.chapter) return;
    const chapter = deleteModal.chapter;

    setDeletingChapterId(chapter.chapter_id);
    setDeleteModal({ isOpen: false, chapter: null });
    try {
      const response = await adminService.bulkDeleteChapters([chapter.chapter_id]);
      
      if (response.success) {
        if (response.deleted_count > 0) {
          const successMessage = response.message || `Chapter deleted successfully`;
          showSuccess(successMessage);
          onRefresh();
        } else {
          // All deletions failed
          const errorMessage = response.error || response.message || 'Failed to delete chapter';
          const errors = response.errors && response.errors.length > 0 
            ? response.errors.join(', ') 
            : errorMessage;
          showError(errors);
        }
      } else {
        // Partial success or full failure
        if (response.deleted_count > 0 && response.failed_count > 0) {
          // Partial success
          const partialMessage = response.message || `Chapter deleted with some failures`;
          showSuccess(partialMessage);
          if (response.errors && response.errors.length > 0) {
            showError(response.errors.join(', '));
          }
          onRefresh();
        } else {
          // Full failure
          const errorMessage = response.error || response.message || 'Failed to delete chapter';
          const errors = response.errors && response.errors.length > 0 
            ? response.errors.join(', ') 
            : errorMessage;
          showError(errors);
        }
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

  const allSelected = chapters.length > 0 && selectedChapterIds.size === chapters.length;
  const someSelected = selectedChapterIds.size > 0 && selectedChapterIds.size < chapters.length;
  const selectAllCheckboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selectAllCheckboxRef.current) {
      selectAllCheckboxRef.current.indeterminate = someSelected;
    }
  }, [someSelected]);

  return (
    <ListContainer>
      {chapters.length > 0 && (
        <HeaderRow>
          <Checkbox
            ref={selectAllCheckboxRef}
            type="checkbox"
            checked={allSelected}
            onChange={handleSelectAll}
            title={allSelected ? "Deselect all" : "Select all"}
          />
          <span style={{ fontSize: '14px', color: '#6b7280', fontWeight: 500 }}>
            {selectedChapterIds.size > 0 
              ? `${selectedChapterIds.size} of ${chapters.length} selected`
              : `Select chapters to delete`}
          </span>
        </HeaderRow>
      )}

      {selectedChapterIds.size > 0 && (
        <BulkActionBar>
          <BulkActionInfo>
            <span>{selectedChapterIds.size} chapter(s) selected</span>
          </BulkActionInfo>
          <BulkActionButtons>
            <ClearSelectionButton onClick={handleClearSelection}>
              Clear Selection
            </ClearSelectionButton>
            <BulkDeleteButton
              onClick={handleBulkDeleteClick}
              disabled={isBulkDeleting}
            >
              {isBulkDeleting ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6M12 18h.01" />
                  </svg>
                  Deleting...
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" />
                  </svg>
                  Delete Selected ({selectedChapterIds.size})
                </>
              )}
            </BulkDeleteButton>
          </BulkActionButtons>
        </BulkActionBar>
      )}

      {chapters.map((chapter) => {
        const isSelected = selectedChapterIds.has(chapter.chapter_id);
        const isDeleting = deletingChapterId === chapter.chapter_id;
        
        return (
          <ChapterItem key={chapter.chapter_id} $selected={isSelected}>
            <ChapterItemContent>
              <Checkbox
                type="checkbox"
                checked={isSelected}
                onChange={() => handleToggleSelect(chapter.chapter_id)}
                disabled={isDeleting || isBulkDeleting}
                title={isSelected ? "Deselect chapter" : "Select chapter"}
              />
              <div style={{ flex: 1 }}>
                <ChapterHeader>
                  <ChapterNumber>{chapter.chapter_number}</ChapterNumber>
                  <ChapterInfo>
                    <ChapterTitleContainer>
                      <ChapterTitle>{chapter.title}</ChapterTitle>
                      <DeleteButton
                        onClick={() => handleDeleteClick(chapter)}
                        disabled={isDeleting || isBulkDeleting}
                        title="Delete chapter"
                      >
                        {isDeleting ? (
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
              </div>
            </ChapterItemContent>
          </ChapterItem>
        );
      })}

      <ConfirmationModal
        isOpen={bulkDeleteModal.isOpen}
        title="Delete Chapters"
        description={`Are you sure you want to delete ${bulkDeleteModal.count} chapter(s)?\n\n${bulkDeleteModal.chapterTitles}\n\nThis action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleBulkDeleteConfirm}
        onCancel={() => setBulkDeleteModal({ isOpen: false, chapterTitles: '', count: 0 })}
        loading={isBulkDeleting}
        confirmButtonColor="red"
      />

      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        title="Delete Chapter"
        description={deleteModal.chapter ? `Are you sure you want to delete chapter "${deleteModal.chapter.title}"? This action cannot be undone.` : ''}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteModal({ isOpen: false, chapter: null })}
        loading={deleteModal.chapter ? deletingChapterId === deleteModal.chapter.chapter_id : false}
        confirmButtonColor="red"
      />
    </ListContainer>
  );
};

