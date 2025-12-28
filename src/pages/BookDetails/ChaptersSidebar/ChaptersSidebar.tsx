import React from 'react';
import type { Chapter } from '../../../services/book/book.service';
import { useI18n } from '../../../i18n';
import {
  SidebarContainer,
  ChaptersList,
  ChapterItem,
  ChapterItemTitle,
  EmptyState
} from './ChaptersSidebar.styles';

interface ChaptersSidebarProps {
  chapters: Chapter[];
  selectedChapterId: string | null;
  onChapterSelect: (chapterId: string) => void;
}

export const ChaptersSidebar: React.FC<ChaptersSidebarProps> = ({
  chapters,
  selectedChapterId,
  onChapterSelect
}) => {
  const { t } = useI18n();
  
  if (chapters.length === 0) {
    return (
      <SidebarContainer>
        <EmptyState>{t('chapterSidebar.noChaptersAvailable')}</EmptyState>
      </SidebarContainer>
    );
  }

  return (
    <SidebarContainer>
      <ChaptersList>
        {chapters.map((chapter, index) => (
          <ChapterItem
            key={chapter.chapter_id}
            $isActive={chapter.chapter_id === selectedChapterId}
            onClick={() => onChapterSelect(chapter.chapter_id)}
          >
            <ChapterItemTitle $isActive={chapter.chapter_id === selectedChapterId}>
              {t('chapterSidebar.chapter')} {index + 1}: {chapter.title}
            </ChapterItemTitle>
          </ChapterItem>
        ))}
      </ChaptersList>
    </SidebarContainer>
  );
};

