import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import CreateBookModal from '../../../components/CreateBookModal/CreateBookModal';
import UpdateBookModal from '../../../components/UpdateBookModal/UpdateBookModal';
import { adminService, type Book as ApiBook, type Category, type AgeGroup } from '../../../services/admin/admin.service';
import { showError } from '../../../utils/toast';
import { useI18n } from '../../../i18n/hooks';

const PageContainer = styled.div`
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  gap: 24px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    margin-bottom: 24px;
  }
`;

const Title = styled.h1`
  font-size: 32px;
  margin: 0;
  color: #1a1a1a;
  font-weight: 800;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex: 1;
  justify-content: flex-end;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    gap: 8px;
  }
`;

const Select = styled.select`
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  background: white;
  cursor: pointer;
  transition: border-color 0.2s;
  min-width: 180px;

  &:focus {
    outline: none;
    border-color: #8B1F1F;
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    width: 100%;
    min-width: unset;
  }
`;

const UploadButton = styled.button`
  background: #8B1F1F;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  white-space: nowrap;

  &:hover {
    background-color: #6b1616;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 12px;
  }
`;

const BooksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const BookCard = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #f0f0f0;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  position: relative;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const EditButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: #8B1F1F;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  z-index: 10;

  &:hover {
    background-color: #6b1616;
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 12px;
    top: 12px;
    right: 12px;
  }
`;


const BookTitle = styled.h3`
  margin: 0 0 8px 0;
  color: #1a1a1a;
  font-size: 18px;
  font-weight: 600;
`;

const BookMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 12px;
`;

const MetaItem = styled.div`
  font-size: 14px;
  color: #6b7280;
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

const LoadingState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #6b7280;
  font-size: 16px;
`;

const CreateBook: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<ApiBook | null>(null);
  const [books, setBooks] = useState<ApiBook[]>([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [ageGroups, setAgeGroups] = useState<AgeGroup[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [selectedAgeGroupId, setSelectedAgeGroupId] = useState<string>('');
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingAgeGroups, setLoadingAgeGroups] = useState(false);
  const { t } = useI18n();



  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const response = await adminService.getCategories();
        if (response.success && response.data) {
          setCategories(response.data);
        } else {
          showError(response.message || 'Failed to load categories');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        showError('Failed to load categories');
      } finally {
        setLoadingCategories(false);
      }
    };

    const fetchAgeGroups = async () => {
      setLoadingAgeGroups(true);
      try {
        const response = await adminService.getAgeGroups();
        if (response.success && response.data) {
          setAgeGroups(response.data);
        } else {
          showError(response.message || 'Failed to load age groups');
        }
      } catch (error) {
        console.error('Error fetching age groups:', error);
        showError('Failed to load age groups');
      } finally {
        setLoadingAgeGroups(false);
      }
    };

    fetchCategories();
    fetchAgeGroups();
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      if (!selectedCategoryId || !selectedAgeGroupId) {
        setBooks([]);
        return;
      }

      setLoading(true);
      try {
        const response = await adminService.getBooks(selectedCategoryId, selectedAgeGroupId);
        if (response.success && response.data) {
          setBooks(response.data);
        } else {
          showError(response.message || 'Failed to load books');
          setBooks([]);
        }
      } catch (error) {
        console.error('Error fetching books:', error);
        showError('Failed to load books');
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [selectedCategoryId, selectedAgeGroupId]);

  const handleBookCreated = () => {
    setIsModalOpen(false);
    // Refresh books list
    if (selectedCategoryId && selectedAgeGroupId) {
      const fetchBooks = async () => {
        setLoading(true);
        try {
          const response = await adminService.getBooks(selectedCategoryId, selectedAgeGroupId);
          if (response.success && response.data) {
            setBooks(response.data);
          }
        } catch (error) {
          console.error('Error fetching books:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchBooks();
    }
  };

  const handleBookUpdated = () => {
    setIsUpdateModalOpen(false);
    setEditingBook(null);
    // Refresh books list
    if (selectedCategoryId && selectedAgeGroupId) {
      const fetchBooks = async () => {
        setLoading(true);
        try {
          const response = await adminService.getBooks(selectedCategoryId, selectedAgeGroupId);
          if (response.success && response.data) {
            setBooks(response.data);
          }
        } catch (error) {
          console.error('Error fetching books:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchBooks();
    }
  };

  const handleBookClick = (bookId: string, e: React.MouseEvent) => {
    // Don't navigate if clicking on the edit button
    if ((e.target as HTMLElement).closest('.edit-button')) {
      return;
    }
    navigate(`/admin/books/${bookId}/chapters`);
  };

  const handleEditBook = (book: ApiBook, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingBook(book);
    setIsUpdateModalOpen(true);
  };

  return (
    <PageContainer>
      <Header>
        <Title>Books</Title>
        <FilterContainer>
          <Select
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
            disabled={loadingCategories}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.display_name}
              </option>
            ))}
          </Select>
          
          <Select
            value={selectedAgeGroupId}
            onChange={(e) => setSelectedAgeGroupId(e.target.value)}
            disabled={loadingAgeGroups}
          >
            <option value="">Select Age Group</option>
            {ageGroups.map((ageGroup) => (
              <option key={ageGroup.age_group_id} value={ageGroup.age_group_id}>
                {ageGroup.display_name}
              </option>
            ))}
          </Select>
          
          <UploadButton onClick={() => setIsModalOpen(true)}>
            Upload Book
          </UploadButton>
        </FilterContainer>
      </Header>

      {!selectedCategoryId || !selectedAgeGroupId ? (
        <EmptyState>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.5" style={{ margin: '0 auto' }}>
            <path d="M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 4v-6.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586V4z" />
          </svg>
          <EmptyStateText>Please select a category and age group to view books.</EmptyStateText>
        </EmptyState>
      ) : loading ? (
        <LoadingState>Loading books...</LoadingState>
      ) : books.length === 0 ? (
        <EmptyState>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.5" style={{ margin: '0 auto' }}>
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
          <EmptyStateText>No books found for the selected category and age group.</EmptyStateText>
        </EmptyState>
      ) : (
        <BooksGrid>
          {books.map((book) => (
            <BookCard 
              key={book.book_id}
              onClick={(e) => handleBookClick(book.book_id, e)}
            >
              <EditButton 
                className="edit-button"
                onClick={(e) => handleEditBook(book, e)}
              >
                Edit
              </EditButton>
              {book.cover_image_url && (
                <img 
                  src={book.cover_image_url} 
                  alt={book.title} 
                  style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '16px' }} 
                />
              )}
              <BookTitle>{book.title}</BookTitle>
              {book.description && (
                <p style={{ fontSize: '14px', color: '#6b7280', margin: '8px 0', lineHeight: '1.5' }}>
                  {book.description}
                </p>
              )}
              <BookMeta>
                <MetaItem><strong>Book Order:</strong> {book.book_order}</MetaItem>
                <MetaItem><strong>Status:</strong> {book.is_active ? 'Active' : 'Inactive'}</MetaItem>
              </BookMeta>
            </BookCard>
          ))}
        </BooksGrid>
      )}

      <CreateBookModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onBookCreated={handleBookCreated}
      />

      <UpdateBookModal
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          setEditingBook(null);
        }}
        onBookUpdated={handleBookUpdated}
        book={editingBook}
      />
    </PageContainer>
  );
};

export default CreateBook;
