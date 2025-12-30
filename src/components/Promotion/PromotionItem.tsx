import React, { useState } from 'react';
import {
  ItemContainer,
  ImageContainer,
  PromotionImage,
  ContentContainer,
  HeaderRow,
  Title,
  Price,
  ViewDetailsButton,
  Description,
  BuyNowButton,
  CarouselContainer,
  NavigationButton,
  PageIndicator,
  IndicatorDot
} from './PromotionItem.styles';
import type { Promotion } from '../../services/promotion/promotion.service';
import { useI18n } from '../../i18n';

interface PromotionItemProps {
  promotion: Promotion;
}

const PromotionItem: React.FC<PromotionItemProps> = ({ promotion }) => {
  const { t } = useI18n();
  const [currentSlide, setCurrentSlide] = useState(0);

  const allImages: string[] = [];
  
  if (promotion.images && promotion.images.length > 0) {
    const sortedImages = [...promotion.images].sort((a, b) => a.order - b.order);
    allImages.push(...sortedImages.map(img => img.image_url));
  } else if (promotion.media && promotion.media.media_type === 'image') {
    allImages.push(promotion.media.url);
  }

  const hasMultipleImages = allImages.length > 1;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % allImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const handleViewDetails = () => {
    if (promotion.redirect_link) {
      window.open(promotion.redirect_link, '_blank', 'noopener,noreferrer');
    }
  };

  const handleBuyNow = () => {
    if (promotion.redirect_link) {
      window.open(promotion.redirect_link, '_blank', 'noopener,noreferrer');
    }
  };

  const renderImage = () => {
    if (allImages.length === 0) {
      return (
        <ImageContainer>
          <PromotionImage 
            src="https://via.placeholder.com/200x200?text=No+Image" 
            alt={promotion.title}
          />
        </ImageContainer>
      );
    }

    if (!hasMultipleImages) {
      return (
        <ImageContainer>
          <PromotionImage src={allImages[0]} alt={promotion.title} />
        </ImageContainer>
      );
    }

    return (
      <ImageContainer>
        <CarouselContainer>
          <PromotionImage src={allImages[currentSlide]} alt={promotion.title} />
          
          <NavigationButton position="left" onClick={prevSlide}>
            ‹
          </NavigationButton>
          <NavigationButton position="right" onClick={nextSlide}>
            ›
          </NavigationButton>

          <PageIndicator>
            {allImages.map((_, i) => (
              <IndicatorDot key={i} active={i === currentSlide} />
            ))}
          </PageIndicator>
        </CarouselContainer>
      </ImageContainer>
    );
  };

  return (
    <ItemContainer>
      {renderImage()}
      
      <ContentContainer>
        <HeaderRow>
          <Title>{promotion.title}</Title>
          {promotion.price && promotion.price !== 'None' && (
            <Price>${promotion.price}</Price>
          )}
          <ViewDetailsButton onClick={handleViewDetails}>
            {t('promotions.viewDetails')}
          </ViewDetailsButton>
        </HeaderRow>
        
        <Description>{promotion.description}</Description>
        
        <BuyNowButton onClick={handleBuyNow}>
          {t('promotions.buyNow')}
        </BuyNowButton>
      </ContentContainer>
    </ItemContainer>
  );
};

export default PromotionItem;

