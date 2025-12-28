import React, { useState, useRef } from 'react';
import {
    Overlay,
    ModalContainer,
    ModalHeader,
    Title,
    // CloseButton,
    ModalBody,
    InputGroup,
    Label,
    Input,
    TextArea,
    UploadArea,
    UploadIcon,
    UploadText,
    CreateButton,
    FileList,
    FileItem,
    FileRemoveButton,
    AddMoreButton
} from './CreatePostModal.styles';
import { postService } from '../../services/post/post.service';
import { showSuccess, showError } from '../../utils/toast';
import { useI18n } from '../../i18n';
import { useRefresh } from '../../contexts/RefreshContext';

interface CreatePostModalProps {
    isOpen: boolean;
    onClose: () => void;
    onPostCreated?: () => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ isOpen, onClose, onPostCreated }) => {
    const { t } = useI18n();
    const { triggerRefresh } = useRefresh();
    const [title, setTitle] = useState('');
    const [caption, setCaption] = useState('');
    const [files, setFiles] = useState<File[]>([]);

    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    if (!isOpen) return null;

    const handleFileClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            const totalFiles = files.length + newFiles.length;

            if (totalFiles > 5) {
                showError(t('createPostModal.errors.maxFilesExceeded'));
                return;
            }

            setFiles(prev => [...prev, ...newFiles]);
        }
        // Reset input value to allow selecting same file again if needed (though typically handled by state)
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const removeFile = (indexToRemove: number, e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent triggering upload area click
        setFiles(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    const handleSubmit = async () => {
        if (files.length === 0) {
            showError(t('createPostModal.errors.atLeastOneFile'));
            return;
        }

        setLoading(true);
        const response = await postService.createPost({
            title: title,
            description: caption,
            media: files
        });

        if (response.success) {
            showSuccess(t('createPostModal.success.postCreated'));
            triggerRefresh();
            if (onPostCreated) onPostCreated();
            onClose();
            
            // Reset state
            setTitle('');
            setCaption('');
            setFiles([]);
        } else {
            showError(response.message || t('createPostModal.errors.failedToCreatePost'));
        }
        setLoading(false);
    };

    return (
        <Overlay onClick={onClose}>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                    <Title>{t('createPostModal.title')}</Title>
                </ModalHeader>

                <ModalBody>
                    <InputGroup>
                        <Label>{t('createPostModal.labels.title')}</Label>
                        <Input
                            placeholder={t('createPostModal.placeholders.enterPostTitle')}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </InputGroup>
                    <InputGroup>
                        <Label>{t('createPostModal.labels.description')}</Label>
                        <TextArea
                            placeholder={t('createPostModal.placeholders.enterDescription')}
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                        />
                    </InputGroup>
                    <InputGroup>
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            multiple
                            onChange={handleFileChange}
                        />

                        {files.length === 0 ? (
                            <UploadArea onClick={handleFileClick}>
                                <UploadIcon>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                        <polyline points="17 8 12 3 7 8" />
                                        <line x1="12" y1="3" x2="12" y2="15" />
                                    </svg>
                                </UploadIcon>
                                <UploadText>{t('createPostModal.upload.uploadFiles')}</UploadText>
                            </UploadArea>
                        ) : (
                            <>
                                <FileList>
                                    {files.map((file, index) => (
                                        <FileItem key={index}>
                                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '90%' }}>
                                                {file.name}
                                            </span>
                                            <FileRemoveButton onClick={(e) => removeFile(index, e)}>
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                                </svg>
                                            </FileRemoveButton>
                                        </FileItem>
                                    ))}
                                </FileList>
                                <AddMoreButton onClick={handleFileClick}>
                                    {t('createPostModal.upload.addMoreFiles')}
                                </AddMoreButton>
                            </>
                        )}
                    </InputGroup>
                    <CreateButton onClick={handleSubmit} disabled={loading}>
                        {loading ? t('createPostModal.buttons.creating') : t('createPostModal.buttons.createPost')}
                    </CreateButton>
                </ModalBody>
            </ModalContainer>
        </Overlay>
    );
};

export default CreatePostModal;
