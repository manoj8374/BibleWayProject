import React, { useState, useEffect } from 'react';
import {
  Container,
  BibleCard,
  BibleDescription,
  BibleTitle,
  CarouselContainer,
  CarouselTitle,
  CarouselScrollContainer,
  CarouselBookCard,
  CarouselBookContent,
  CarouselBookTitle,
  CarouselBookAgeGroup,
  ViewAllCard,
  ViewAllIcon,
  ViewAllText,
  CarouselLoading,
  CarouselError,
} from './SegmentedBibles.styles';
import { useNavigate } from 'react-router-dom';
import { categoryService } from '../../services/category/category.service';
import type { Category } from '../../services/category/category.service';
import { useI18n } from '../../i18n';
import { ageGroupService } from '../../services/ageGroup/ageGroup.service';
import { getLatestChaptersByAgeGroup } from '../../services/book/book.service';

// Type for carousel data items
interface LatestChapterByAgeGroup {
  age_group_id: string;
  book_id: string | null;
  title: string | null;
  cover_image_url: string | null;
  display_name: string;
}
import { showError } from '../../utils/toast';

export interface Bible {
  id: string;
  title: string;
  description: string;
  backgroundColor: string;
  navigateLink: string;
  coverImageUrl?: string;
  categoryName?: string;
}

interface SegmentedBiblesProps {
  bibles?: Bible[];
  onBibleClick?: (bibleId: string) => void;
}

const getNavigateLink = (categoryName: string): string => {
  const linkMap: Record<string, string> = {
    'SEGREGATE_BIBLES': '/segregated-bibles',
    'BIBLE_READER': '/bible-reader',
  };
  return linkMap[categoryName] || '/segregated-bibles';
};

const getBackgroundColor = (categoryName: string): string => {
  const colorMap: Record<string, string> = {
    'SEGREGATE_BIBLES': 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
    'BIBLE_READER': 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
  };
  return colorMap[categoryName] || 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)';
};

const mapCategoryToBible = (category: Category): Bible => {
  return {
    id: category.category_id,
    title: category.display_name,
    description: category.description,
    backgroundColor: getBackgroundColor(category.category_name),
    navigateLink: getNavigateLink(category.category_name),
    coverImageUrl: category.cover_image_url,
    categoryName: category.category_name
  };
};

const SegmentedBibles: React.FC<SegmentedBiblesProps> = ({
  bibles: propBibles,
  onBibleClick
}) => {
  const navigate = useNavigate();
  const { t } = useI18n();
  const [bibles, setBibles] = useState<Bible[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [carouselData, setCarouselData] = useState<LatestChapterByAgeGroup[]>([]);
  const [carouselLoading, setCarouselLoading] = useState(false);
  const [carouselError, setCarouselError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      if (propBibles && propBibles.length > 0) {
        setBibles(propBibles);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      const response = await categoryService.getAllCategories();

      if (response.success) {
        const sortedCategories = [...response.data].sort((a, b) => {
          if (a.display_order !== b.display_order) {
            return a.display_order - b.display_order;
          }
          return a.category_name.localeCompare(b.category_name);
        });

        const mappedBibles = sortedCategories.map(mapCategoryToBible);
        setBibles(mappedBibles);
      } else {
        setError(response.message || t('segmentedBibles.failedToLoadCategories'));
      }

      setLoading(false);
    };

    fetchCategories();
  }, [propBibles, t]);

  useEffect(() => {
    if (bibles.length === 0) {
      setCarouselData([]);
      setCarouselLoading(false);
      setCarouselError(null);
      return;
    }

    const segregateBiblesCategory = bibles.find(
      (bible) => bible.categoryName === 'SEGREGATE_BIBLES' || bible.categoryName === 'SEGREGATED_BIBLES'
    );

    if (!segregateBiblesCategory) {
      setCarouselData([]);
      setCarouselLoading(false);
      setCarouselError(null);
      return;
    }

    const fetchCarouselData = async () => {
      setCarouselLoading(true);
      setCarouselError(null);

      try {
        const response = await getLatestChaptersByAgeGroup();
        if (response.success) {
          setCarouselData(response.data);
        } else {
          setCarouselError(response.error || 'Failed to load books');
        }
      } catch (error) {
        console.error('Error fetching carousel data:', error);
        setCarouselError('Failed to load books');
      } finally {
        setCarouselLoading(false);
      }
    };

    fetchCarouselData();
  }, [bibles]);

  if (loading) {
    return (
      <Container>
        <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
          {t('segmentedBibles.loading')}
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <div style={{ padding: '20px', textAlign: 'center', color: '#e74c3c' }}>
          {error}
        </div>
      </Container>
    );
  }

  if (bibles.length === 0) {
    return (
      <Container>
        <div style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
          {t('segmentedBibles.noCategoriesAvailable')}
        </div>
      </Container>
    );
  }

  const handleBookClick = (bookId: string) => {
    navigate(`/book/${bookId}`);
  };

  const handleViewAllClick = (categoryId: string) => {
    navigate(`/segregated-bibles?categoryId=${categoryId}`);
  };

  return (
    <Container>
      {bibles.map((bible) => {
        const isSegregateBibles = bible.categoryName === 'SEGREGATE_BIBLES' || bible.categoryName === 'SEGREGATED_BIBLES';
        const isBibleReader = bible.categoryName === 'BIBLE_READER';

        return (
          <div key={bible.id}>
            <BibleCard
              $backgroundImage={bible.coverImageUrl}
              $backgroundGradient={bible.backgroundColor}
              onClick={async () => {
                if (onBibleClick) {
                  onBibleClick(bible.id);
                }

                if (isBibleReader) {
                  try {
                    const ageGroupsResponse = await ageGroupService.getAllAgeGroups();
                    
                    if (ageGroupsResponse.success && ageGroupsResponse.data.length > 0) {
                      const allAgeGroup = ageGroupsResponse.data.find(
                        (ageGroup) => ageGroup.age_group_name === 'ALL'
                      );

                      if (allAgeGroup) {
                        navigate(`/bible-reader/${bible.id}/${allAgeGroup.age_group_id}`);
                      } else {
                        showError('Age group "ALL" not found');
                        console.error('Age group "ALL" not found');
                      }
                    } else {
                      showError(ageGroupsResponse.message || 'Failed to fetch age groups');
                      console.error('Failed to fetch age groups:', ageGroupsResponse.message);
                    }
                  } catch (error) {
                    showError('Error fetching age groups');
                    console.error('Error fetching age groups:', error);
                  }
                } else if (!isSegregateBibles) {
                  navigate(`${bible.navigateLink}?categoryId=${bible.id}`);
                }
                // For SEGREGATE_BIBLES, don't navigate on card click - show carousel instead
              }}
            >
              <BibleTitle>{bible.title}</BibleTitle>
              <BibleDescription>{bible.description}</BibleDescription>
            </BibleCard>

            {/* Carousel for SEGREGATE_BIBLES */}
            {isSegregateBibles && (
              <CarouselContainer>
                <CarouselTitle>Latest Books by Age Group</CarouselTitle>
                {carouselLoading ? (
                  <CarouselLoading>Loading books...</CarouselLoading>
                ) : carouselError ? (
                  <CarouselError>{carouselError}</CarouselError>
                ) : (
                  <CarouselScrollContainer>
                    {carouselData
                      .filter((item) => item.book_id !== null && item.title !== null)
                      .map((item) => (
                        <CarouselBookCard
                          key={`${item.age_group_id}-${item.book_id}`}
                          $coverImage={item.cover_image_url}
                          onClick={() => item.book_id && handleBookClick(item.book_id)}
                        >
                          <CarouselBookContent>
                            <CarouselBookTitle>{item.title}</CarouselBookTitle>
                            <CarouselBookAgeGroup>{item.display_name}</CarouselBookAgeGroup>
                          </CarouselBookContent>
                        </CarouselBookCard>
                      ))}
                    {/* View All Card */}
                    <ViewAllCard onClick={() => handleViewAllClick(bible.id)}>
                      <ViewAllIcon>📚</ViewAllIcon>
                      <ViewAllText>View All</ViewAllText>
                    </ViewAllCard>
                  </CarouselScrollContainer>
                )}
              </CarouselContainer>
            )}
          </div>
        );
      })}   
    </Container>
  );
};

export default SegmentedBibles;
