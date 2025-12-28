import React, { useState, useEffect } from 'react';
import {
  Container,
  Title,
  PromotionsList,
  LoadingContainer,
  ErrorContainer,
  EmptyContainer,
  ImageWrapper
} from './Promotion.styles';
import PromotionItem from './PromotionItem';
import { promotionService } from '../../services/promotion/promotion.service';
import type { Promotion } from '../../services/promotion/promotion.service';
import { useI18n } from '../../i18n';

const Promotion: React.FC = () => {
  const { t } = useI18n();
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPromotions = async () => {
      setLoading(true);
      setError(null);
      
      const response = await promotionService.getAllPromotions();
      
      if (response.success) {
        setPromotions(response.data);
      } else {
        setError(response.message || t('promotions.failedToLoad'));
      }
      
      setLoading(false);
    };

    fetchPromotions();
  }, []);

  if (loading) {
    return (
      <Container>
        <Title>{t('promotions.title')}</Title>
        <LoadingContainer>{t('promotions.loading')}</LoadingContainer>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Title>{t('promotions.title')}</Title>
        <ErrorContainer>{error}</ErrorContainer>
      </Container>
    );
  }

  if (promotions.length === 0) {
    return (
      <Container>
        <Title>{t('promotions.title')}</Title>
        <EmptyContainer>{t('promotions.noPromotionsAvailable')}</EmptyContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Title>{t('promotions.title')}</Title>
      <ImageWrapper>
        <img  width="100%" height="100%" src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQsdy5lmTi6wPmZIzt4YbXVkVtm10OBBD_Cg&s"/>
      </ImageWrapper>
      <PromotionsList>
        {promotions.map((promotion) => (
          <PromotionItem key={promotion.promotion_id} promotion={promotion} />
        ))}
      </PromotionsList>
    </Container>
  );
};

export default Promotion;

