import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { bookService, type Book } from '../../services/book/book.service';
import { showError } from '../../utils/toast';
import { useI18n } from '../../i18n/hooks';
import {
  PageContainer,
  PageTitle,
  BooksGrid,
  BookCard,
  BookCover,
  BookContent,
  BookTitle,
  BookDescription,
  LoadingContainer,
  EmptyState,
  EmptyStateText,
} from './BibleReaderPage.styles';

const BibleReaderPage: React.FC = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const { categoryId, ageGroupId } = useParams<{ categoryId: string; ageGroupId: string }>();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      if (!categoryId || !ageGroupId) {
        setError('Invalid category or age group');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      
      try {
        const response = await bookService.getBooksByCategoryAndAgeGroup(categoryId, ageGroupId);
        
        if (response.success && response.data) {
          setBooks(response.data);
        } else {
          const errorMessage = response.message || response.error || t('pages.bibleReaderPage.failedToLoadBooks');
          setError(errorMessage);
          showError(errorMessage);
        }
      } catch (err) {
        const errorMessage = t('pages.bibleReaderPage.failedToLoadBooks');
        setError(errorMessage);
        showError(errorMessage);
        console.error('Error fetching books:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [categoryId, ageGroupId, t]);

  const handleBookClick = (bookId: string) => {
    navigate(`/book/${bookId}`);
  };

  if (loading) {
    return (
      <PageContainer>
        <PageTitle>{t('pages.bibleReaderPage.title')}</PageTitle>
        <LoadingContainer>{t('pages.bibleReaderPage.loadingBooks')}</LoadingContainer>
      </PageContainer>
    );
  }

  if (error && books.length === 0) {
    return (
      <PageContainer>
        <PageTitle>{t('pages.bibleReaderPage.title')}</PageTitle>
        <EmptyState>
          <EmptyStateText>{error}</EmptyStateText>
        </EmptyState>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageTitle>{t('pages.bibleReaderPage.title')}</PageTitle>
      {books.length === 0 ? (
        <EmptyState>
          <EmptyStateText>{t('pages.bibleReaderPage.noBooksFound')}</EmptyStateText>
        </EmptyState>
      ) : (
        <BooksGrid>
          {books.map((book) => (
            <BookCard key={book.book_id} onClick={() => handleBookClick(book.book_id)}>
              <BookCover
                src={book.cover_image_url || '/default-book-cover'}
                alt={book.title}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/default-book-cover';
                }}
              />
              <BookContent>
                <BookTitle>{book.title}</BookTitle>
                <BookDescription>
                  {book.description || t('pages.bibleReaderPage.noDescription')}
                </BookDescription>
              </BookContent>
            </BookCard>
          ))}
        </BooksGrid>
      )}
    </PageContainer>
  );
};

export default BibleReaderPage;

