import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { adminService, type Book, type Chapter } from '../../../../services/admin/admin.service';
import { showError, showSuccess } from '../../../../utils/toast';
import { ChapterList } from './components/ChapterList';
import { AddChapterModal } from './components/AddChapterModal';

const PageContainer = styled.div`
  width: 100%;
`;

const Header = styled.div`
  margin-bottom: 32px;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: #6b7280;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  padding: 8px 0;
  margin-bottom: 16px;
  transition: color 0.2s;

  &:hover {
    color: #1a1a1a;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const BookHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`;

const BookInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const BookTitle = styled.h1`
  font-size: 32px;
  margin: 0 0 12px 0;
  color: #1a1a1a;
  font-weight: 800;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const BookMeta = styled.div`
  display: flex;
  gap: 16px;
  font-size: 14px;
  color: #6b7280;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    font-size: 13px;
    gap: 12px;
  }
`;

const MetaItem = styled.span`
  &:not(:last-child)::after {
    content: '•';
    margin-left: 16px;
    color: #d1d5db;
  }

  @media (max-width: 768px) {
    &:not(:last-child)::after {
      margin-left: 12px;
    }
  }
`;

const AddButton = styled.button`
  background: #8B1F1F;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;

  &:hover {
    background-color: #6b1616;
  }

  svg {
    width: 20px;
    height: 20px;
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    padding: 12px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 32px 0 20px 0;

  @media (max-width: 768px) {
    font-size: 18px;
    margin: 24px 0 16px 0;
  }
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #6b7280;
  font-size: 16px;
`;

const BookChapters: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  
  const [book, setBook] = useState<Book | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    if (bookId) {
      fetchChapters();
    }
  }, [bookId]);

  const fetchChapters = async () => {
    if (!bookId) return;

    setLoading(true);
    try {
      const response = await adminService.getBookChapters(bookId);
      if (response.success && response.data) {
        setChapters(response.data);
      } else {
        showError(response.message || 'Failed to load chapters');
      }
    } catch (error) {
      console.error('Error fetching chapters:', error);
      showError('Failed to load chapters');
    } finally {
      setLoading(false);
    }
  };

  const handleChapterUploaded = () => {
    setIsAddModalOpen(false);
    fetchChapters();
    showSuccess('Chapters uploaded successfully');
  };

  const handleBack = () => {
    navigate('/admin/books');
  };

  if (loading) {
    return (
      <PageContainer>
        <LoadingState>Loading chapters...</LoadingState>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Header>
        <BackButton onClick={handleBack}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Books
        </BackButton>

        <BookHeader>
          <BookInfo>
            <BookTitle>📖 {book?.title || 'Book Chapters'}</BookTitle>
            {book && (
              <BookMeta>
                <MetaItem>{book.description}</MetaItem>
              </BookMeta>
            )}
          </BookInfo>

          <AddButton onClick={() => setIsAddModalOpen(true)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Add Chapters
          </AddButton>
        </BookHeader>
      </Header>

      <SectionTitle>
        Chapters ({chapters.length})
      </SectionTitle>

      <ChapterList
        chapters={chapters}
        loading={loading}
        onRefresh={fetchChapters}
      />

      <AddChapterModal
        isOpen={isAddModalOpen}
        bookId={bookId || ''}
        onClose={() => setIsAddModalOpen(false)}
        onChapterUploaded={handleChapterUploaded}
      />
    </PageContainer>
  );
};

export default BookChapters;

