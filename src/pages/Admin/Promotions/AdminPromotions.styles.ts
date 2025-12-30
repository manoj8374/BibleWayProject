import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;

    @media (max-width: 768px) {
        gap: 16px;
    }
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
    }
`;

export const CreateButton = styled.button`
    padding: 12px 24px;
    background-color: #8B1F1F;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;

    &:hover {
        background-color: #6b1616;
        transform: translateY(-1px);
        box-shadow: 0 4px 8px rgba(139, 31, 31, 0.3);
    }

    &:active {
        transform: translateY(0);
    }

    @media (max-width: 768px) {
        width: 100%;
        padding: 12px;
    }
`;

export const Title = styled.h1`
    font-size: 32px;
    font-weight: 700;
    color: #1a1a1a;
    margin: 0;

    @media (max-width: 768px) {
        font-size: 24px;
    }
`;

export const PromotionsList = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 16px;
    }
`;

export const PromotionCard = styled.div`
    background: white;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.2s;
    display: flex;
    flex-direction: column;
    gap: 16px;

    &:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    @media (max-width: 768px) {
        padding: 16px;
    }
`;

export const PromotionImage = styled.img`
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
    background-color: #f3f4f6;
`;

export const PromotionContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const PromotionTitleContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 4px;
`;

export const PromotionTitle = styled.h3`
    font-size: 18px;
    font-weight: 600;
    color: #1a1a1a;
    margin: 0;
    flex: 1;
`;

export const PromotionDescription = styled.p`
    font-size: 14px;
    line-height: 1.6;
    color: #6b7280;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

export const PromotionPrice = styled.div`
    font-size: 20px;
    font-weight: 700;
    color: #8B1F1F;
`;

export const PromotionMeta = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-size: 12px;
    color: #9ca3af;
    padding-top: 12px;
    border-top: 1px solid #e5e7eb;
`;

export const PromotionActions = styled.div`
    display: flex;
    gap: 12px;
    margin-top: auto;
    padding-top: 16px;
    border-top: 1px solid #e5e7eb;
`;

export const DeleteIconButton = styled.button`
    padding: 6px;
    border: none;
    border-radius: 6px;
    background: transparent;
    color: #ef4444;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.7;
    flex-shrink: 0;

    &:hover:not(:disabled) {
        opacity: 1;
        background: #fee2e2;
    }

    &:disabled {
        opacity: 0.4;
        cursor: not-allowed;
    }

    svg {
        width: 18px;
        height: 18px;
    }
`;

export const EmptyState = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 80px 20px;
    text-align: center;
`;

export const EmptyStateText = styled.div`
    font-size: 18px;
    color: #6b7280;
    font-weight: 500;
`;

export const LoadingContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 80px 20px;
    font-size: 16px;
    color: #6b7280;
`;

