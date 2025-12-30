import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-top: 40px;

    @media (max-width: 768px) {
        gap: 16px;
        margin-top: 32px;
    }
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
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

export const StatsContainer = styled.div`
    display: flex;
    gap: 16px;
    flex-wrap: wrap;

    @media (max-width: 768px) {
        width: 100%;
        flex-direction: column;
    }
`;

export const StatCard = styled.div`
    background: white;
    padding: 20px 24px;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    min-width: 200px;

    @media (max-width: 768px) {
        width: 100%;
        padding: 16px;
    }
`;

export const StatLabel = styled.div`
    font-size: 14px;
    color: #6b7280;
    margin-bottom: 8px;
    font-weight: 500;
`;

export const StatValue = styled.div`
    font-size: 28px;
    font-weight: 700;
    color: #1a1a1a;
`;

export const BooksList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const BookCard = styled.div`
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

export const BookHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 20px;
    padding-bottom: 16px;
    border-bottom: 2px solid #e5e7eb;
    flex-wrap: wrap;
    gap: 12px;
`;

export const BookInfo = styled.div`
    flex: 1;
    min-width: 0;
`;

export const BookTitle = styled.h2`
    font-size: 24px;
    font-weight: 700;
    color: #1a1a1a;
    margin: 0 0 8px 0;

    @media (max-width: 768px) {
        font-size: 20px;
    }
`;

export const BookDescription = styled.p`
    font-size: 14px;
    color: #6b7280;
    margin: 0 0 8px 0;
    line-height: 1.5;
`;

export const BookStats = styled.div`
    display: flex;
    gap: 16px;
    font-size: 14px;
    color: #6b7280;
    flex-wrap: wrap;
`;

export const ChaptersList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const ChapterCard = styled.div`
    background: #f9fafb;
    border-radius: 8px;
    padding: 20px;
    border: 1px solid #e5e7eb;
    transition: all 0.2s;
    max-width: 100%;
    overflow: hidden;

    &:hover {
        border-color: #8B1F1F;
        background: #fff;
    }
`;

export const ChapterHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    flex-wrap: wrap;
    gap: 12px;
    max-width: 100%;
    overflow: hidden;
`;

export const ChapterInfo = styled.div`
    flex: 1;
    min-width: 0;
    max-width: 100%;
    overflow: hidden;
`;

export const ChapterTitle = styled.h3`
    font-size: 18px;
    font-weight: 600;
    color: #1a1a1a;
    margin: 0 0 4px 0;

    @media (max-width: 768px) {
        font-size: 16px;
    }
`;

export const ChapterStats = styled.div`
    display: flex;
    gap: 16px;
    font-size: 14px;
    color: #6b7280;
    flex-wrap: wrap;
`;

export const RatingDisplay = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    font-weight: 600;
    color: #fbbf24;
`;

export const FeedbacksList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid #e5e7eb;
    max-width: 100%;
    overflow: hidden;
`;

export const FeedbackCard = styled.div`
    background: white;
    border-radius: 8px;
    padding: 16px;
    border: 1px solid #e5e7eb;
    max-width: 100%;
    overflow: hidden;
`;

export const FeedbackHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 12px;
    flex-wrap: wrap;
    gap: 12px;
    max-width: 100%;
    overflow: hidden;
`;

export const UserInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;
    min-width: 0;
`;

export const UserAvatar = styled.div<{ $bgColor: string; $imgUrl?: string }>`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: ${props => props.$bgColor};
    background-image: ${props => props.$imgUrl ? `url(${props.$imgUrl})` : 'none'};
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 16px;
    font-weight: 600;
    text-transform: uppercase;
    flex-shrink: 0;
`;

export const UserDetails = styled.div`
    flex: 1;
    min-width: 0;
    max-width: 100%;
    overflow: hidden;
`;

export const UserName = styled.div`
    font-size: 15px;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 4px;
    word-wrap: break-word;
    overflow-wrap: break-word;
`;

export const UserEmail = styled.div`
    font-size: 13px;
    color: #6b7280;
    word-wrap: break-word;
    overflow-wrap: break-word;
`;

export const FeedbackRating = styled.div`
    font-size: 18px;
    color: #fbbf24;
    letter-spacing: 2px;
`;

export const FeedbackDate = styled.div`
    font-size: 12px;
    color: #9ca3af;
    margin-top: 4px;
`;

export const FeedbackDescription = styled.p`
    font-size: 14px;
    line-height: 1.6;
    color: #374151;
    margin: 0;
    word-wrap: break-word;
    word-break: break-word;
    overflow-wrap: anywhere;
    max-width: 100%;
    white-space: pre-wrap;
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

export const ExpandButton = styled.button`
    padding: 8px 16px;
    background-color: #8B1F1F;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;

    &:hover {
        background-color: #6b1616;
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    @media (max-width: 768px) {
        width: 100%;
        padding: 10px;
    }
`;

export const CollapseButton = styled(ExpandButton)`
    background-color: #6b7280;

    &:hover {
        background-color: #4b5563;
    }
`;

