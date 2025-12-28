import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { verseService, type Verse } from '../../services/verse/verse.service';
import { showError, showSuccess } from '../../utils/toast';
import { useI18n } from '../../i18n/hooks';

const PageContainer = styled.div`
  width: 100%;
  padding: 0 24px 24px 24px;
`;

const PageTitle = styled.h1`
  font-size: 32px;
  margin: 0 0 32px 0;
  color: #1a1a1a;
  font-weight: 800;
`;

const VersesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 800px;
`;

const VerseCard = styled.div`
  background: #1e3a8a;
  padding: 24px;
  border-radius: 12px;
  position: relative;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`;

const PlusIcon = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const DateLabel = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  color: white;
  font-size: 14px;
  font-weight: 500;
`;

const VerseText = styled.p`
  color: white;
  font-size: 16px;
  line-height: 1.6;
  margin: 48px 0 16px 0;
  padding-right: 60px;
`;

const LikesSection = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: white;
  font-size: 14px;
  margin-top: 8px;
  font-weight: 500;
  cursor: pointer;
  user-select: none;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    transform: scale(0.95);
  }
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #6b7280;
  font-size: 16px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #6b7280;
`;

const EmptyStateText = styled.p`
  font-size: 16px;
  margin: 12px 0 0 0;
`;

const VersesPage: React.FC = () => {
  const { t } = useI18n();
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVerses = async () => {
      setLoading(true);
      try {
        const response = await verseService.getAllVerses();
        if (response.success && response.data) {
          setVerses(response.data);
        } else {
          showError(response.message || t('pages.versesPage.failedToLoadVerses'));
        }
      } catch (error) {
        console.error('Error fetching verses:', error);
        showError(t('pages.versesPage.failedToLoadVerses'));
      } finally {
        setLoading(false);
      }
    };

    fetchVerses();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  };

  const handleLike = async (verse: Verse, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    
    const verseIndex = verses.findIndex(v => v.verse_id === verse.verse_id);
    if (verseIndex === -1) return;

    // Optimistic update
    const updatedVerses = [...verses];
    const wasLiked = updatedVerses[verseIndex].is_liked;
    updatedVerses[verseIndex] = {
      ...updatedVerses[verseIndex],
      is_liked: !wasLiked,
      likes_count: wasLiked 
        ? updatedVerses[verseIndex].likes_count - 1 
        : updatedVerses[verseIndex].likes_count + 1
    };
    setVerses(updatedVerses);

    // Call API
    const response = await verseService.likeVerse(verse.verse_id);
    if (!response.success) {
      // Revert on error
      setVerses(verses);
      showError(response.message || t('pages.versesPage.failedToLikeVerse'));
    }
  };

  return (
    <PageContainer>
      <PageTitle>{t('pages.versesPage.verses')}</PageTitle>

      {loading ? (
        <LoadingState>{t('pages.versesPage.loadingVerses')}</LoadingState>
      ) : verses.length === 0 ? (
        <EmptyState>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.5" style={{ margin: '0 auto' }}>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <path d="M14 2v6h6" />
            <path d="M16 13H8" />
            <path d="M16 17H8" />
            <path d="M10 9H8" />
          </svg>
          <EmptyStateText>{t('pages.versesPage.noVersesAvailable')}</EmptyStateText>
        </EmptyState>
      ) : (
        <VersesList>
          {verses.map((verse) => (
            <VerseCard key={verse.verse_id}>
              <PlusIcon>+</PlusIcon>
              <DateLabel>{formatDate(verse.created_at)}</DateLabel>
              <VerseText>{verse.description}</VerseText>
              <LikesSection onClick={(e) => handleLike(verse, e)}>
                <svg 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill={verse.is_liked ? "#ff6b6b" : "white"} 
                  stroke={verse.is_liked ? "#ff6b6b" : "white"} 
                  strokeWidth="1.5"
                  style={{ transition: 'fill 0.2s' }}
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                <span>{verse.likes_count} {t('pages.versesPage.likes')}</span>
              </LikesSection>
            </VerseCard>
          ))}
        </VersesList>
      )}
    </PageContainer>
  );
};

export default VersesPage;

