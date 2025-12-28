import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Title,
  CategoriesContainer,
  CategoryCard,
  CategoryOverlay,
  CategoryTitle,
  CategoryDescription,
  CategoryIcon
} from './SegregatedBiblesGrid.styles';
import { ageGroupService } from '../../services/ageGroup/ageGroup.service';
import type { AgeGroup } from '../../services/ageGroup/ageGroup.service';
import { bookService } from '../../services/book/book.service';
import { showError } from '../../utils/toast';
import { useI18n } from '../../i18n';
import { useBook } from '../../contexts/BookContext';

export interface BibleCategory {
  id: string;
  title: string;
  description: string;
  backgroundImage: string;
  ageRange?: string;
}

interface SegregatedBiblesGridProps {
  categories?: BibleCategory[];
  onCategoryClick?: (categoryId: string) => void;
}

const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&h=400&fit=crop';

const mapAgeGroupToCategory = (ageGroup: AgeGroup): BibleCategory => {
  return {
    id: ageGroup.age_group_id,
    title: ageGroup.display_name,
    description: ageGroup.description,
    backgroundImage: ageGroup.cover_image_url || PLACEHOLDER_IMAGE,
    ageRange: ageGroup.age_group_name
  };
};

const SegregatedBiblesGrid: React.FC<SegregatedBiblesGridProps> = ({
  categories: propCategories,
  onCategoryClick
}) => {
  const navigate = useNavigate();
  const { t } = useI18n();
  const [categories, setCategories] = useState<BibleCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingBooks, setLoadingBooks] = useState(false);
  const { setCurrentBook, setIsBookmarked } = useBook();

  useEffect(() => {
    const fetchAgeGroups = async () => {
      if (propCategories && propCategories.length > 0) {
        setCategories(propCategories);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await ageGroupService.getAllAgeGroups();

        if (response.success) {
          const sortedAgeGroups = [...response.data].sort((a, b) => {
            if (a.display_order !== b.display_order) {
              return a.display_order - b.display_order;
            }
            return a.age_group_name.localeCompare(b.age_group_name);
          });

          const mappedCategories = sortedAgeGroups.map(mapAgeGroupToCategory);
          setCategories(mappedCategories);
        } else {
          setError(response.message || t('segregatedBiblesGrid.failedToLoadAgeGroups'));
        }
      } catch {
        setError(t('segregatedBiblesGrid.unexpectedErrorLoadingAgeGroups'));
      } finally {
        setLoading(false);
      }
    };

    fetchAgeGroups();
  }, [propCategories]);

  if (loading) {
    return (
      <Container>
        <Title>{t('segregatedBiblesGrid.title')}</Title>
        <div style={{ padding: '40px 20px', textAlign: 'center', color: '#666', fontSize: '14px' }}>
          {t('segregatedBiblesGrid.loadingAgeGroups')}
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Title>{t('segregatedBiblesGrid.title')}</Title>
        <div style={{ padding: '40px 20px', textAlign: 'center', color: '#e74c3c', fontSize: '14px' }}>
          {error}
        </div>
      </Container>
    );
  }

  if (categories.length === 0) {
    return (
      <Container>
        <Title>{t('segregatedBiblesGrid.title')}</Title>
        <div style={{ padding: '40px 20px', textAlign: 'center', color: '#999', fontSize: '14px' }}>
          {t('segregatedBiblesGrid.noAgeGroupsAvailable')}
        </div>
      </Container>
    );
  }

  const handleAgeCategoryClick = async (ageGroupId: string) => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get('categoryId');

    if (!categoryId) {
      showError(t('segregatedBiblesGrid.pleaseSelectCategoryFirst'));
      return;
    }

    setLoadingBooks(true);

    try {
      const response = await bookService.getBooksByCategoryAndAgeGroup(categoryId, ageGroupId);

      if (response.success) {
        if (response.data && response.data.length > 0) {
          const firstBook = response.data[0];
          setCurrentBook(firstBook);
          setIsBookmarked(firstBook.is_bookmarked || false);
          onCategoryClick?.(ageGroupId);
          navigate(`/book/${firstBook.book_id}`);
        } else {
          showError(t('segregatedBiblesGrid.noBooksAvailable'));
        }
      } else {
        let errorMessage = response.message || t('segregatedBiblesGrid.failedToFetchBooks');
        
        if (response.error_code === 'CATEGORY_NOT_FOUND') {
          errorMessage = t('segregatedBiblesGrid.categoryNotFound');
        } else if (response.error_code === 'AGE_GROUP_NOT_FOUND') {
          errorMessage = t('segregatedBiblesGrid.ageGroupNotFound');
        } else if (response.error_code === 'LANGUAGE_NOT_FOUND') {
          errorMessage = t('segregatedBiblesGrid.languageNotFound');
        }
        
        showError(errorMessage);
      }
    } catch {
      showError(t('segregatedBiblesGrid.unexpectedErrorFetchingBooks'));
    } finally {
      setLoadingBooks(false);
    }
  }

  return (
    <Container>
      <Title>{t('segregatedBiblesGrid.title')}</Title>
      <CategoriesContainer>
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            $backgroundImage={category.backgroundImage}
            onClick={() => !loadingBooks && handleAgeCategoryClick(category.id)}
            style={{ 
              opacity: loadingBooks ? 0.6 : 1, 
              cursor: loadingBooks ? 'not-allowed' : 'pointer',
              pointerEvents: loadingBooks ? 'none' : 'auto'
            }}
          >
            <CategoryOverlay>
              <CategoryTitle>{category.title}</CategoryTitle>
              <CategoryDescription>{category.description}</CategoryDescription>
              <CategoryIcon>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8l4 4-4 4" />
                </svg>
              </CategoryIcon>
            </CategoryOverlay>
          </CategoryCard>
        ))}
      </CategoriesContainer>
    </Container>
  );
};

export default SegregatedBiblesGrid;
