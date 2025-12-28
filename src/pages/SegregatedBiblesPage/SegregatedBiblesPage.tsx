import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer, ContentWrapper } from './SegregatedBiblesPage.styles';
import ContinueReading, { type Book as ContinueReadingBook } from '../../components/ContinueReading/ContinueReading';
import SegregatedBiblesGrid from '../../components/SegregatedBiblesGrid/SegregatedBiblesGrid';
import { useI18n } from '../../i18n/hooks';
import { bookService } from '../../services/book/book.service';
import { showError } from '../../utils/toast';

const SegregatedBiblesPage: React.FC = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [topBooks, setTopBooks] = useState<ContinueReadingBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await bookService.getTopBooks();
        if (response.success && response.data) {
          // Transform API response to ContinueReading.Book format
          const transformedBooks: ContinueReadingBook[] = response.data.map((item) => ({
            id: item.book_details.book_id,
            title: item.book_details.title,
            description: item.book_details.description,
            coverImage: item.book_details.cover_image_url || '',
            progress: item.progress_percentage,
            chapterId: item.chapter_id,
            blockId: item.block_id,
          }));
          setTopBooks(transformedBooks);
        } else {
          const errorMessage = response.error || response.message || 'Failed to fetch top books';
          setError(errorMessage);
          showError(errorMessage);
        }
      } catch (err) {
        const errorMessage = 'Failed to fetch top books';
        setError(errorMessage);
        showError(errorMessage);
        console.error('Error fetching top books:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopBooks();
  }, []);

  const handleContinueReading = (bookId: string, chapterId?: string | null, blockId?: string | null) => {
    let url = `/book/${bookId}`;
    const params = new URLSearchParams();
    
    if (chapterId) {
      params.append('chapter_id', chapterId);
    }
    if (blockId) {
      params.append('block_id', blockId);
    }
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    
    navigate(url);
  };

  const handleCategoryClick = (categoryId: string) => {
  };

  return (
    <PageContainer>
      <ContentWrapper>
        <h1>{t('pages.segregatedBiblesPage.segregatedBibles')}</h1>
        {/* bread crumbs */}
        {loading ? (
          <div style={{ padding: '40px 20px', textAlign: 'center', color: '#666' }}>
            Loading...
          </div>
        ) : error ? (
          <div style={{ padding: '40px 20px', textAlign: 'center', color: '#e74c3c' }}>
            {error}
          </div>
        ) : topBooks.length > 0 ? (
          <ContinueReading books={topBooks} onContinueReading={handleContinueReading} />
        ) : null}
        <SegregatedBiblesGrid onCategoryClick={handleCategoryClick} />
      </ContentWrapper>
    </PageContainer>
  );
};

export default SegregatedBiblesPage;
