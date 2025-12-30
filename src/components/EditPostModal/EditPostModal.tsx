import React, { useState, useEffect } from 'react';
import {
    Overlay,
    ModalContainer,
    ModalHeader,
    Title,
    ModalBody,
    InputGroup,
    Label,
    Input,
    TextArea,
    SaveButton,
    CancelButton,
    ButtonGroup,
    MediaPreview,
    MediaPreviewItem,
    MediaRemoveButton
} from './EditPostModal.styles';
import { postService, type Post } from '../../services/post/post.service';
import { showSuccess, showError } from '../../utils/toast';
import { useI18n } from '../../i18n';

interface EditPostModalProps {
    isOpen: boolean;
    onClose: () => void;
    post: Post | null;
    onPostUpdated?: () => void;
}

interface MediaItem {
    url: string;
    type: 'existing';
}

const EditPostModal: React.FC<EditPostModalProps> = ({ isOpen, onClose, post, onPostUpdated }) => {
    const { t } = useI18n();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (post && isOpen) {
            setTitle(post.title || '');
            setDescription(post.description || '');
            // Initialize media items from existing post media
            const existingMedia: MediaItem[] = post.media.map(m => ({
                url: m.url,
                type: 'existing' as const
            }));
            setMediaItems(existingMedia);
        }
    }, [post, isOpen]);

    if (!isOpen || !post) return null;

    const removeMedia = (index: number) => {
        setMediaItems(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        // Validate that at least one field is being updated
        const titleChanged = title !== (post.title || '');
        const descriptionChanged = description !== post.description;
        const mediaChanged = mediaItems.length !== post.media.length || 
            mediaItems.some((item, index) => 
                item.type === 'existing' && item.url !== post.media[index]?.url
            );

        if (!titleChanged && !descriptionChanged && !mediaChanged) {
            showError(t('editPostModal.errors.noChanges'));
            return;
        }

        setLoading(true);

        try {
            // Get all media URLs from existing media items
            const uploadedUrls: string[] = mediaItems.map(item => item.url);

            // Update post with all media URLs
            const updateData: {
                post_id: string;
                title?: string;
                description?: string;
                media_urls?: string[];
            } = {
                post_id: post.post_id
            };

            if (titleChanged) {
                updateData.title = title;
            }
            if (descriptionChanged) {
                updateData.description = description;
            }
            if (mediaChanged) {
                updateData.media_urls = uploadedUrls;
            }

            const response = await postService.updatePost(updateData);

            if (response.success) {
                showSuccess(t('editPostModal.success.postUpdated'));
                onClose();
                // Call callback after closing to allow parent to refresh
                if (onPostUpdated) {
                    // Small delay to ensure modal is closed
                    setTimeout(() => {
                        onPostUpdated();
                    }, 100);
                }
            } else {
                showError(response.message || t('editPostModal.errors.failedToUpdatePost'));
            }
        } catch (error: any) {
            console.error('Error updating post:', error);
            showError(error?.message || t('editPostModal.errors.failedToUpdatePost'));
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        onClose();
    };

    const getMediaType = (url: string): 'image' | 'video' | 'audio' => {
        const ext = url.split('.').pop()?.toLowerCase();
        if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg'].includes(ext || '')) return 'image';
        if (['mp4', 'mov', 'avi', 'mkv', 'webm', 'flv', 'wmv', 'm4v'].includes(ext || '')) return 'video';
        if (['mp3', 'wav', 'aac', 'ogg', 'm4a', 'flac'].includes(ext || '')) return 'audio';
        return 'image'; // default
    };

    return (
        <Overlay onClick={handleClose}>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                    <Title>{t('editPostModal.title')}</Title>
                </ModalHeader>

                <ModalBody>
                    <InputGroup>
                        <Label>{t('editPostModal.labels.title')}</Label>
                        <Input
                            placeholder={t('editPostModal.placeholders.enterPostTitle')}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            disabled={loading}
                        />
                    </InputGroup>

                    <InputGroup>
                        <Label>{t('editPostModal.labels.description')}</Label>
                        <TextArea
                            placeholder={t('editPostModal.placeholders.enterDescription')}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            disabled={loading}
                        />
                    </InputGroup>

                    {mediaItems.length > 0 && (
                        <InputGroup>
                            <Label>{t('editPostModal.labels.media')}</Label>
                            <MediaPreview>
                                {mediaItems.map((item, index) => {
                                    const mediaType = getMediaType(item.url);

                                    return (
                                        <MediaPreviewItem key={index}>
                                            {mediaType === 'image' && (
                                                <img src={item.url} alt={`Media ${index + 1}`} />
                                            )}
                                            {mediaType === 'video' && (
                                                <video src={item.url} controls />
                                            )}
                                            {mediaType === 'audio' && (
                                                <audio src={item.url} controls />
                                            )}
                                            <MediaRemoveButton onClick={() => removeMedia(index)} disabled={loading}>
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                                </svg>
                                            </MediaRemoveButton>
                                        </MediaPreviewItem>
                                    );
                                })}
                            </MediaPreview>
                        </InputGroup>
                    )}

                    <ButtonGroup>
                        <CancelButton onClick={handleClose} disabled={loading}>
                            {t('editPostModal.buttons.cancel')}
                        </CancelButton>
                        <SaveButton onClick={handleSubmit} disabled={loading}>
                            {loading
                                ? t('editPostModal.buttons.updating')
                                : t('editPostModal.buttons.save')}
                        </SaveButton>
                    </ButtonGroup>
                </ModalBody>
            </ModalContainer>
        </Overlay>
    );
};

export default EditPostModal;

