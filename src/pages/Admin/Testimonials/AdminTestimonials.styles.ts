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

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
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

export const FilterTabs = styled.div`
    display: flex;
    gap: 8px;
    border-bottom: 2px solid #e5e7eb;
    padding-bottom: 0;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;

    @media (max-width: 768px) {
        width: 100%;
        gap: 4px;
    }
`;

export const TabButton = styled.button<{ $isActive: boolean }>`
    padding: 12px 24px;
    border: none;
    background: none;
    font-size: 16px;
    font-weight: ${props => props.$isActive ? '600' : '500'};
    color: ${props => props.$isActive ? '#8B1F1F' : '#6b7280'};
    cursor: pointer;
    border-bottom: 2px solid ${props => props.$isActive ? '#8B1F1F' : 'transparent'};
    margin-bottom: -2px;
    transition: all 0.2s;
    white-space: nowrap;

    &:hover {
        color: #8B1F1F;
    }

    @media (max-width: 768px) {
        padding: 10px 16px;
        font-size: 14px;
    }
`;

export const TestimonialsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const TestimonialCard = styled.div`
    background: white;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.2s;

    &:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    @media (max-width: 768px) {
        padding: 16px;
    }
`;

export const TestimonialHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 16px;
    flex-wrap: wrap;
    gap: 12px;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

export const UserInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;
    min-width: 0;
`;

export const UserAvatar = styled.div<{ $bgColor: string; $imgUrl?: string }>`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: ${props => props.$bgColor};
    background-image: ${props => props.$imgUrl ? `url(${props.$imgUrl})` : 'none'};
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 20px;
    font-weight: 600;
    text-transform: uppercase;
    flex-shrink: 0;
`;

export const UserName = styled.div`
    font-size: 16px;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 4px;
`;

export const Rating = styled.div`
    font-size: 18px;
    color: #fbbf24;
    letter-spacing: 2px;
`;

export const StatusBadge = styled.div<{ $isVerified: boolean }>`
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    background-color: ${props => props.$isVerified ? '#d1fae5' : '#fef3c7'};
    color: ${props => props.$isVerified ? '#065f46' : '#92400e'};
`;

export const TestimonialContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const Description = styled.p`
    font-size: 15px;
    line-height: 1.6;
    color: #374151;
    margin: 0;
`;

export const MediaContainer = styled.div`
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
`;

export const MediaItem = styled.div`
    border-radius: 8px;
    overflow: hidden;
`;

export const MediaImage = styled.img`
    width: 120px;
    height: 120px;
    object-fit: cover;
    border-radius: 8px;
    cursor: pointer;
    transition: transform 0.2s;

    &:hover {
        transform: scale(1.05);
    }
`;

export const TestimonialActions = styled.div`
    display: flex;
    gap: 12px;
    margin-top: 8px;
    padding-top: 16px;
    border-top: 1px solid #e5e7eb;
    flex-wrap: wrap;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 8px;
    }
`;

export const ApproveButton = styled.button`
    padding: 10px 20px;
    background-color: #10b981;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    flex: 1;

    &:hover:not(:disabled) {
        background-color: #059669;
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    @media (max-width: 768px) {
        width: 100%;
        padding: 12px;
    }
`;

export const RejectButton = styled.button`
    padding: 10px 20px;
    background-color: #ef4444;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    flex: 1;

    &:hover:not(:disabled) {
        background-color: #dc2626;
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    @media (max-width: 768px) {
        width: 100%;
        padding: 12px;
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

export const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
    margin-top: 24px;
    padding: 20px;
    flex-wrap: wrap;

    @media (max-width: 768px) {
        gap: 12px;
        padding: 16px;
        flex-direction: column;
    }
`;

export const PaginationButton = styled.button`
    padding: 10px 20px;
    background-color: white;
    color: #8B1F1F;
    border: 2px solid #8B1F1F;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;

    &:hover:not(:disabled) {
        background-color: #8B1F1F;
        color: white;
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    @media (max-width: 768px) {
        width: 100%;
        padding: 12px;
    }
`;

