import React, { useEffect, useState } from 'react';
import { promotionService, type Promotion } from '../../../services/promotion/promotion.service';
import { adminService } from '../../../services/admin/admin.service';
import { showSuccess, showError } from '../../../utils/toast';
import { useI18n } from '../../../i18n/hooks';
import CreatePromotionModal from '../../../components/CreatePromotionModal/CreatePromotionModal';
import ConfirmationModal from '../../../components/ConfirmationModal/ConfirmationModal';
import {
    Container,
    Header,
    Title,
    CreateButton,
    PromotionsList,
    PromotionCard,
    PromotionImage,
    PromotionContent,
    PromotionTitleContainer,
    PromotionTitle,
    PromotionDescription,
    PromotionPrice,
    PromotionMeta,
    DeleteIconButton,
    EmptyState,
    EmptyStateText,
    LoadingContainer
} from './AdminPromotions.styles';

const AdminPromotions: React.FC = () => {
    const { t } = useI18n();
    const [promotions, setPromotions] = useState<Promotion[]>([]);
    const [loading, setLoading] = useState(false);
    const [processingIds, setProcessingIds] = useState<Set<string>>(new Set());
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; promotionId: string | null }>({
        isOpen: false,
        promotionId: null
    });

    useEffect(() => {
        fetchPromotions();
    }, []);

    const fetchPromotions = async () => {
        setLoading(true);
        try {
            const response = await promotionService.getAllPromotions();
            if (response.success) {
                setPromotions(response.data);
            } else {
                showError(response.message || t('admin.promotions.failedToLoad'));
            }
        } catch (error) {
            showError(t('admin.promotions.failedToLoad'));
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClick = (promotionId: string) => {
        setDeleteModal({ isOpen: true, promotionId });
    };

    const handleDeleteConfirm = async () => {
        if (!deleteModal.promotionId) return;
        const promotionId = deleteModal.promotionId;

        if (processingIds.has(promotionId)) return;

        setProcessingIds(prev => new Set(prev).add(promotionId));
        setDeleteModal({ isOpen: false, promotionId: null });

        try {
            const response = await adminService.deletePromotion({ promotion_id: promotionId });
            if (response.success) {
                showSuccess(response.message || t('admin.promotions.deletedSuccessfully'));
                // Remove from list
                setPromotions(prev => prev.filter(p => p.promotion_id !== promotionId));
            } else {
                showError(response.message || t('admin.promotions.failedToDelete'));
            }
        } catch (error) {
            showError(t('admin.promotions.failedToDelete'));
        } finally {
            setProcessingIds(prev => {
                const newSet = new Set(prev);
                newSet.delete(promotionId);
                return newSet;
            });
        }
    };

    const handleDeleteCancel = () => {
        setDeleteModal({ isOpen: false, promotionId: null });
    };

    const getPromotionImage = (promotion: Promotion): string | undefined => {
        if (promotion.media && promotion.media.url) {
            return promotion.media.url;
        }
        if (promotion.images && promotion.images.length > 0) {
            return promotion.images[0].image_url;
        }
        return undefined;
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    return (
        <Container>
            <Header>
                <Title>{t('admin.promotions.title')}</Title>
                <CreateButton onClick={() => setIsCreateModalOpen(true)}>
                    {t('pages.adminDashboard.createPromotion')}
                </CreateButton>
            </Header>

            <CreatePromotionModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onPromotionCreated={() => {
                    setIsCreateModalOpen(false);
                    fetchPromotions();
                }}
            />

            <ConfirmationModal
                isOpen={deleteModal.isOpen}
                title={t('admin.promotions.delete')}
                description={t('admin.promotions.confirmDelete')}
                confirmText={t('admin.promotions.delete')}
                cancelText={t('admin.promotions.cancel') || 'Cancel'}
                onConfirm={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
                loading={deleteModal.promotionId ? processingIds.has(deleteModal.promotionId) : false}
                confirmButtonColor="red"
            />

            {loading ? (
                <LoadingContainer>
                    <div>{t('admin.promotions.loading')}</div>
                </LoadingContainer>
            ) : promotions.length === 0 ? (
                <EmptyState>
                    <EmptyStateText>{t('admin.promotions.noPromotions')}</EmptyStateText>
                </EmptyState>
            ) : (
                <PromotionsList>
                    {promotions.map((promotion) => {
                        const isProcessing = processingIds.has(promotion.promotion_id);
                        const imageUrl = getPromotionImage(promotion);

                        return (
                            <PromotionCard key={promotion.promotion_id}>
                                {imageUrl && (
                                    <PromotionImage
                                        src={imageUrl}
                                        alt={promotion.title}
                                    />
                                )}
                                <PromotionContent>
                                    <PromotionTitleContainer>
                                        <PromotionTitle>{promotion.title}</PromotionTitle>
                                        <DeleteIconButton
                                            onClick={() => handleDeleteClick(promotion.promotion_id)}
                                            disabled={isProcessing}
                                            title={t('admin.promotions.delete')}
                                        >
                                            {isProcessing ? (
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <circle cx="12" cy="12" r="10" />
                                                    <path d="M12 6v6M12 18h.01" />
                                                </svg>
                                            ) : (
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" />
                                                </svg>
                                            )}
                                        </DeleteIconButton>
                                    </PromotionTitleContainer>
                                    {promotion.description && (
                                        <PromotionDescription>
                                            {promotion.description}
                                        </PromotionDescription>
                                    )}
                                    {promotion.price && promotion.price !== 'None' && (
                                        <PromotionPrice>
                                            ${promotion.price}
                                        </PromotionPrice>
                                    )}
                                    <PromotionMeta>
                                        <div>Created: {formatDate(promotion.created_at)}</div>
                                        {promotion.redirect_link && (
                                            <div>
                                                <a 
                                                    href={promotion.redirect_link} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    style={{ color: '#8B1F1F', textDecoration: 'none' }}
                                                >
                                                    View Link →
                                                </a>
                                            </div>
                                        )}
                                    </PromotionMeta>
                                </PromotionContent>
                            </PromotionCard>
                        );
                    })}
                </PromotionsList>
            )}
        </Container>
    );
};

export default AdminPromotions;

