import React from 'react';
import { FaStar } from 'react-icons/fa';
import { FaRegStar } from 'react-icons/fa';
import styled from 'styled-components';

const StarContainer = styled.div<{ $size?: number }>`
  display: inline-flex;
  gap: 2px;
  align-items: center;
`;

interface StarRatingProps {
    rating: number;
    size?: number;
    showEmptyStars?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, size = 16, showEmptyStars = true }) => {
    const filledStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = showEmptyStars ? 5 - Math.ceil(rating) : 0;

    return (
        <StarContainer $size={size}>
            {Array.from({ length: filledStars }).map((_, index) => (
                <FaStar key={`filled-${index}`} size={size} color="#FFD700" />
            ))}
            {hasHalfStar && (
                <FaStar key="half" size={size} color="#FFD700" style={{ opacity: 0.5 }} />
            )}
            {Array.from({ length: emptyStars }).map((_, index) => (
                <FaRegStar key={`empty-${index}`} size={size} color="#CCCCCC" />
            ))}
        </StarContainer>
    );
};

export default StarRating;

