import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookmarkService, type Bookmark } from '../../services/bookmark/bookmark.service';
import { showError } from '../../utils/toast';
import { useI18n } from '../../i18n/hooks';
import {
  PageContainer,
  PageTitle,
  BookmarksGrid,
  BookmarkCard,
  BookCover,
  BookContent,
  BookTitle,
  BookDescription,
  ProgressBarContainer,
  ProgressBar,
  ContinueButton,
  LoadingContainer,
  EmptyState,
  EmptyStateText,
} from './BookmarksPage.styles';

const BookmarksPage: React.FC = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarks = async () => {
      setLoading(true);
      try {
        const response = await bookmarkService.getAllBookmarks();
        if (response.success && response.bookmarks) {
          setBookmarks(response.bookmarks);
        } else {
          showError(response.message || t('pages.bookmarksPage.failedToLoadBookmarks'));
        }
      } catch (error) {
        console.error('Error fetching bookmarks:', error);
        showError(t('pages.bookmarksPage.failedToLoadBookmarks'));
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, [t]);

  const handleContinueReading = (bookmark: Bookmark) => {
    const params = new URLSearchParams();
    if (bookmark.block_id) {
      params.append('block_id', bookmark.block_id);
    }
    if (bookmark.chapter_id) {
      params.append('chapter_id', bookmark.chapter_id);
    }
    
    const url = `/book/${bookmark.book_id}${params.toString() ? `?${params.toString()}` : ''}`;
    navigate(url);
  };

  if (loading) {
    return (
      <PageContainer>
        <PageTitle>{t('pages.bookmarksPage.myBookmarks')}</PageTitle>
        <LoadingContainer>{t('pages.bookmarksPage.loadingBookmarks')}</LoadingContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageTitle>{t('pages.bookmarksPage.myBookmarks')}</PageTitle>
      {bookmarks.length === 0 ? (
        <EmptyState>
          <EmptyStateText>{t('pages.bookmarksPage.noBookmarksYet')}</EmptyStateText>
        </EmptyState>
      ) : (
        <BookmarksGrid>
          {bookmarks.map((bookmark) => (
            <BookmarkCard key={bookmark.bookmark_id}>
              <BookCover
                src={bookmark.book_details?.cover_image_url || '/default-book-cover'}
                alt={bookmark.book_title}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/default-book-cover';
                }}
              />
              <BookContent>
                <BookTitle>{bookmark.book_title}</BookTitle>
                <BookDescription>
                  {bookmark.book_details?.description || 'Explore age-segmented Bible collections designed to match your reading preferences and spiritual journey.'}
                </BookDescription>
                <ProgressBarContainer>
                  <ProgressBar $progress={parseFloat(bookmark.progress_percentage || '0')} />
                </ProgressBarContainer>
                <ContinueButton onClick={() => handleContinueReading(bookmark)}>
                  {t('pages.bookmarksPage.continueReading')}
                </ContinueButton>
              </BookContent>
            </BookmarkCard>
          ))}
        </BookmarksGrid>
      )}
    </PageContainer>
  );
};

export default BookmarksPage;

