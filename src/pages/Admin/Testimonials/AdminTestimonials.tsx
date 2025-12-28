import React, { useEffect, useState } from 'react';
import { testimonialService, type Testimonial } from '../../../services/testimonial/testimonial.service';
import { showSuccess, showError } from '../../../utils/toast';
import { useI18n } from '../../../i18n/hooks';
import { getAvatarProps } from '../../../utils/avatarHelpers';
import {
    Container,
    Header,
    Title,
    FilterTabs,
    TabButton,
    TestimonialsList,
    TestimonialCard,
    TestimonialHeader,
    UserInfo,
    UserAvatar,
    UserName,
    TestimonialContent,
    Description,
    Rating,
    MediaContainer,
    MediaItem,
    MediaImage,
    TestimonialActions,
    ApproveButton,
    RejectButton,
    EmptyState,
    EmptyStateText,
    LoadingContainer,
    PaginationContainer,
    PaginationButton,
    StatusBadge
} from './AdminTestimonials.styles';

const AdminTestimonials: React.FC = () => {
    const { t } = useI18n();
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<'pending' | 'verified' | 'all'>('pending');
    const [offset, setOffset] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [hasNext, setHasNext] = useState(false);
    const [hasPrevious, setHasPrevious] = useState(false);
    const [processingIds, setProcessingIds] = useState<Set<string>>(new Set());
    const limit = 10;

    useEffect(() => {
        fetchTestimonials();
    }, [activeTab, offset]);

    const fetchTestimonials = async () => {
        setLoading(true);
        const response = await testimonialService.adminGetTestimonials(limit, offset, activeTab);
        if (response.success) {
            setTestimonials(response.data);
            setTotalCount(response.pagination.total_count);
            setHasNext(response.pagination.has_next);
            setHasPrevious(response.pagination.has_previous);
        } else {
            showError(response.message || t('admin.testimonials.failedToLoad'));
        }
        setLoading(false);
    };

    const handleApprove = async (testimonialId: string) => {
        if (processingIds.has(testimonialId)) return;

        setProcessingIds(prev => new Set(prev).add(testimonialId));

        try {
            const response = await testimonialService.approveTestimonial(testimonialId);
            if (response.success) {
                showSuccess(response.message || t('admin.testimonials.approvedSuccessfully'));
                // Remove from list if viewing pending, or refresh
                if (activeTab === 'pending') {
                    setTestimonials(prev => prev.filter(t => t.testimonial_id !== testimonialId));
                    setTotalCount(prev => prev - 1);
                } else {
                    fetchTestimonials();
                }
            } else {
                showError(response.message || t('admin.testimonials.failedToApprove'));
            }
        } catch {
            showError(t('admin.testimonials.failedToApprove'));
        } finally {
            setProcessingIds(prev => {
                const newSet = new Set(prev);
                newSet.delete(testimonialId);
                return newSet;
            });
        }
    };

    const handleReject = async (testimonialId: string) => {
        if (processingIds.has(testimonialId)) return;

        if (!window.confirm(t('admin.testimonials.confirmReject'))) {
            return;
        }

        setProcessingIds(prev => new Set(prev).add(testimonialId));

        try {
            const response = await testimonialService.rejectTestimonial(testimonialId);
            if (response.success) {
                showSuccess(response.message || t('admin.testimonials.rejectedSuccessfully'));
                // Remove from list
                setTestimonials(prev => prev.filter(t => t.testimonial_id !== testimonialId));
                setTotalCount(prev => prev - 1);
            } else {
                showError(response.message || t('admin.testimonials.failedToReject'));
            }
        } catch {
            showError(t('admin.testimonials.failedToReject'));
        } finally {
            setProcessingIds(prev => {
                const newSet = new Set(prev);
                newSet.delete(testimonialId);
                return newSet;
            });
        }
    };

    const handleTabChange = (tab: 'pending' | 'verified' | 'all') => {
        setActiveTab(tab);
        setOffset(0);
    };

    const handleNextPage = () => {
        if (hasNext) {
            setOffset(prev => prev + limit);
        }
    };

    const handlePreviousPage = () => {
        if (hasPrevious) {
            setOffset(prev => Math.max(0, prev - limit));
        }
    };

    const renderStars = (rating: number) => {
        return '★'.repeat(rating) + '☆'.repeat(5 - rating);
    };

    return (
        <Container>
            <Header>
                <Title>{t('admin.testimonials.title')}</Title>
            </Header>

            <FilterTabs>
                <TabButton
                    $isActive={activeTab === 'pending'}
                    onClick={() => handleTabChange('pending')}
                >
                    {t('admin.testimonials.pending')} ({activeTab === 'pending' ? totalCount : ''})
                </TabButton>
                <TabButton
                    $isActive={activeTab === 'verified'}
                    onClick={() => handleTabChange('verified')}
                >
                    {t('admin.testimonials.verified')}
                </TabButton>
                <TabButton
                    $isActive={activeTab === 'all'}
                    onClick={() => handleTabChange('all')}
                >
                    {t('admin.testimonials.all')}
                </TabButton>
            </FilterTabs>

            {loading ? (
                <LoadingContainer>
                    <div>{t('admin.testimonials.loading')}</div>
                </LoadingContainer>
            ) : testimonials.length === 0 ? (
                <EmptyState>
                    <EmptyStateText>{t('admin.testimonials.noTestimonials')}</EmptyStateText>
                </EmptyState>
            ) : (
                <>
                    <TestimonialsList>
                        {testimonials.map((testimonial) => {
                            const avatarProps = getAvatarProps(
                                testimonial.user.profile_picture_url || undefined,
                                testimonial.user.user_name
                            );
                            const isProcessing = processingIds.has(testimonial.testimonial_id);
                            const isPending = testimonial.is_verified === false;

                            return (
                                <TestimonialCard key={testimonial.testimonial_id}>
                                    <TestimonialHeader>
                                        <UserInfo>
                                            <UserAvatar
                                                $bgColor={avatarProps.bgColor}
                                                $imgUrl={avatarProps.imageUrl}
                                            >
                                                {avatarProps.displayText}
                                            </UserAvatar>
                                            <div>
                                                <UserName>{testimonial.user.user_name}</UserName>
                                                <Rating>{renderStars(testimonial.rating)}</Rating>
                                            </div>
                                        </UserInfo>
                                        {testimonial.is_verified !== undefined && (
                                            <StatusBadge $isVerified={testimonial.is_verified}>
                                                {testimonial.is_verified
                                                    ? t('admin.testimonials.verified')
                                                    : t('admin.testimonials.pending')}
                                            </StatusBadge>
                                        )}
                                    </TestimonialHeader>

                                    <TestimonialContent>
                                        <Description>{testimonial.description}</Description>

                                        {testimonial.media && testimonial.media.length > 0 && (
                                            <MediaContainer>
                                                {testimonial.media.map((media) => (
                                                    <MediaItem key={media.media_id}>
                                                        {media.media_type === 'image' && (
                                                            <MediaImage
                                                                src={media.url}
                                                                alt="Testimonial media"
                                                            />
                                                        )}
                                                    </MediaItem>
                                                ))}
                                            </MediaContainer>
                                        )}

                                        {isPending && (
                                            <TestimonialActions>
                                                <ApproveButton
                                                    onClick={() => handleApprove(testimonial.testimonial_id)}
                                                    disabled={isProcessing}
                                                >
                                                    {isProcessing
                                                        ? t('admin.testimonials.processing')
                                                        : t('admin.testimonials.approve')}
                                                </ApproveButton>
                                                <RejectButton
                                                    onClick={() => handleReject(testimonial.testimonial_id)}
                                                    disabled={isProcessing}
                                                >
                                                    {isProcessing
                                                        ? t('admin.testimonials.processing')
                                                        : t('admin.testimonials.reject')}
                                                </RejectButton>
                                            </TestimonialActions>
                                        )}
                                    </TestimonialContent>
                                </TestimonialCard>
                            );
                        })}
                    </TestimonialsList>

                    {(hasNext || hasPrevious) && (
                        <PaginationContainer>
                            <PaginationButton
                                onClick={handlePreviousPage}
                                disabled={!hasPrevious}
                            >
                                {t('admin.testimonials.previous')}
                            </PaginationButton>
                            <span>
                                {t('admin.testimonials.pageInfo', {
                                    current: Math.floor(offset / limit) + 1,
                                    total: Math.ceil(totalCount / limit)
                                })}
                            </span>
                            <PaginationButton
                                onClick={handleNextPage}
                                disabled={!hasNext}
                            >
                                {t('admin.testimonials.next')}
                            </PaginationButton>
                        </PaginationContainer>
                    )}
                </>
            )}
        </Container>
    );
};

export default AdminTestimonials;

