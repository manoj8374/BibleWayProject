import React, { useEffect, useState } from 'react';
import { adminService, type Book, type ChapterWithFeedbacks, type ChapterFeedback } from '../../../services/admin/admin.service';
import { showError } from '../../../utils/toast';
import { useI18n } from '../../../i18n/hooks';
import { getAvatarProps } from '../../../utils/avatarHelpers';
import {
    Container,
    Header,
    Title,
    StatsContainer,
    StatCard,
    StatLabel,
    StatValue,
    BooksList,
    BookCard,
    BookHeader,
    BookInfo,
    BookTitle,
    BookDescription,
    BookStats,
    ChaptersList,
    ChapterCard,
    ChapterHeader,
    ChapterInfo,
    ChapterTitle,
    ChapterStats,
    RatingDisplay,
    FeedbacksList,
    FeedbackCard,
    FeedbackHeader,
    UserInfo,
    UserAvatar,
    UserDetails,
    UserName,
    UserEmail,
    FeedbackRating,
    FeedbackDate,
    FeedbackDescription,
    EmptyState,
    EmptyStateText,
    LoadingContainer,
    ExpandButton,
    CollapseButton
} from './AdminChapterFeedbacks.styles';

const AdminChapterFeedbacks: React.FC = () => {
    const { t } = useI18n();
    const [loading, setLoading] = useState(false);
    const [books, setBooks] = useState<Book[]>([]);
    const [totalFeedbacks, setTotalFeedbacks] = useState(0);
    const [totalBooks, setTotalBooks] = useState(0);
    const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set());

    useEffect(() => {
        fetchChapterFeedbacks();
    }, []);

    const fetchChapterFeedbacks = async () => {
        setLoading(true);
        try {
            const response = await adminService.getChapterFeedbacks();
            if (response.success && response.data) {
                setBooks(response.data.books);
                setTotalFeedbacks(response.data.total_feedbacks);
                setTotalBooks(response.data.total_books);
            } else {
                showError(response.message || 'Failed to load chapter feedbacks');
            }
        } catch (error) {
            showError('Failed to load chapter feedbacks');
            console.error('Error fetching chapter feedbacks:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleChapter = (chapterId: string) => {
        setExpandedChapters(prev => {
            const newSet = new Set(prev);
            if (newSet.has(chapterId)) {
                newSet.delete(chapterId);
            } else {
                newSet.add(chapterId);
            }
            return newSet;
        });
    };

    const renderStars = (rating: number) => {
        return '★'.repeat(rating) + '☆'.repeat(5 - rating);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <Container>
                <LoadingContainer>
                    <div>Loading chapter feedbacks...</div>
                </LoadingContainer>
            </Container>
        );
    }

    if (books.length === 0) {
        return (
            <Container>
                <Header>
                    <Title>Chapter Feedbacks</Title>
                </Header>
                <EmptyState>
                    <EmptyStateText>No chapter feedbacks available</EmptyStateText>
                </EmptyState>
            </Container>
        );
    }

    return (
        <Container>
            <Header>
                <Title>Chapter Feedbacks</Title>
                <StatsContainer>
                    <StatCard>
                        <StatLabel>Total Feedbacks</StatLabel>
                        <StatValue>{totalFeedbacks}</StatValue>
                    </StatCard>
                    <StatCard>
                        <StatLabel>Total Books</StatLabel>
                        <StatValue>{totalBooks}</StatValue>
                    </StatCard>
                </StatsContainer>
            </Header>

            <BooksList>
                {books.map((book) => (
                    <BookCard key={book.book_id}>
                        <BookHeader>
                            <BookInfo>
                                <BookTitle>{book.book_title}</BookTitle>
                                {book.book_description && (
                                    <BookDescription>{book.book_description}</BookDescription>
                                )}
                                <BookStats>
                                    <span>{book.chapters.length} Chapter{book.chapters.length !== 1 ? 's' : ''}</span>
                                    <span>•</span>
                                    <span>{book.total_feedbacks} Feedback{book.total_feedbacks !== 1 ? 's' : ''}</span>
                                </BookStats>
                            </BookInfo>
                        </BookHeader>

                        <ChaptersList>
                            {book.chapters.map((chapter: ChapterWithFeedbacks) => {
                                const isExpanded = expandedChapters.has(chapter.chapter_id);
                                const hasFeedbacks = chapter.feedbacks && chapter.feedbacks.length > 0;

                                return (
                                    <ChapterCard key={chapter.chapter_id}>
                                        <ChapterHeader>
                                            <ChapterInfo>
                                                <ChapterTitle>
                                                    {chapter.chapter_name || `Chapter ${chapter.chapter_number}`}
                                                </ChapterTitle>
                                                <ChapterStats>
                                                    <span>{chapter.total_feedbacks} Feedback{chapter.total_feedbacks !== 1 ? 's' : ''}</span>
                                                    {chapter.average_rating > 0 && (
                                                        <>
                                                            <span>•</span>
                                                            <RatingDisplay>
                                                                <span>{renderStars(Math.round(chapter.average_rating))}</span>
                                                                <span>({chapter.average_rating.toFixed(1)})</span>
                                                            </RatingDisplay>
                                                        </>
                                                    )}
                                                </ChapterStats>
                                            </ChapterInfo>
                                            {hasFeedbacks && (
                                                isExpanded ? (
                                                    <CollapseButton onClick={() => toggleChapter(chapter.chapter_id)}>
                                                        Hide Feedbacks
                                                    </CollapseButton>
                                                ) : (
                                                    <ExpandButton onClick={() => toggleChapter(chapter.chapter_id)}>
                                                        View Feedbacks ({chapter.feedbacks.length})
                                                    </ExpandButton>
                                                )
                                            )}
                                        </ChapterHeader>

                                        {isExpanded && hasFeedbacks && (
                                            <FeedbacksList>
                                                {chapter.feedbacks.map((feedback: ChapterFeedback) => {
                                                    const avatarProps = getAvatarProps(
                                                        feedback.user.profile_picture || undefined,
                                                        feedback.user.username
                                                    );

                                                    return (
                                                        <FeedbackCard key={feedback.feedback_id}>
                                                            <FeedbackHeader>
                                                                <UserInfo>
                                                                    <UserAvatar
                                                                        $bgColor={avatarProps.bgColor}
                                                                        $imgUrl={avatarProps.imageUrl}
                                                                    >
                                                                        {avatarProps.displayText}
                                                                    </UserAvatar>
                                                                    <UserDetails>
                                                                        <UserName>{feedback.user.username}</UserName>
                                                                        <UserEmail>{feedback.user.email}</UserEmail>
                                                                    </UserDetails>
                                                                </UserInfo>
                                                                <div>
                                                                    <FeedbackRating>{renderStars(feedback.rating)}</FeedbackRating>
                                                                    <FeedbackDate>{formatDate(feedback.created_at)}</FeedbackDate>
                                                                </div>
                                                            </FeedbackHeader>
                                                            {feedback.description && (
                                                                <FeedbackDescription>{feedback.description}</FeedbackDescription>
                                                            )}
                                                        </FeedbackCard>
                                                    );
                                                })}
                                            </FeedbacksList>
                                        )}

                                        {!hasFeedbacks && (
                                            <div style={{ padding: '16px', color: '#6b7280', fontSize: '14px', fontStyle: 'italic' }}>
                                                No feedbacks yet for this chapter
                                            </div>
                                        )}
                                    </ChapterCard>
                                );
                            })}
                        </ChaptersList>
                    </BookCard>
                ))}
            </BooksList>
        </Container>
    );
};

export default AdminChapterFeedbacks;

