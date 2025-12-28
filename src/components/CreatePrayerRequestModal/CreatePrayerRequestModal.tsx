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
    TextArea,
    SubmitButton,
    UploadArea,
    UploadIcon,
    UploadText,
    FileList,
    FileItem,
    FileRemoveButton,
    AddMoreButton
} from './CreatePrayerRequestModal.styles';
import { prayerPostService } from '../../services/prayerPost/post.service';
import { showSuccess, showError } from '../../utils/toast';
import { useI18n } from '../../i18n';


interface CreatePrayerRequestModalProps {
    isOpen: boolean;
    onClose: () => void;
    onRequestCreated?: () => void;
}

const CreatePrayerRequestModal: React.FC<CreatePrayerRequestModalProps> = ({ isOpen, onClose, onRequestCreated }) => {
    const { t } = useI18n();
    const [description, setDescription] = useState('');
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
                showError(t('createPrayerRequestModal.errors.maxFilesExceeded'));
                return;
            }

            // Validate file types and sizes
            const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm', 'video/quicktime'];
            const maxSize = 10 * 1024 * 1024; // 10MB

            for (const file of newFiles) {
                if (!validTypes.includes(file.type)) {
                    showError(t('createPrayerRequestModal.errors.invalidFileType', { filename: file.name }));
                    return;
                }
                if (file.size > maxSize) {
                    showError(t('createPrayerRequestModal.errors.fileSizeExceeded', { filename: file.name }));
                    return;
                }
            }

            setFiles(prev => [...prev, ...newFiles]);
        }
        // Reset input value to allow selecting same file again if needed
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const removeFile = (indexToRemove: number, e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent triggering upload area click
        setFiles(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    const handleSubmit = async () => {
        if (!description.trim()) {
            showError(t('createPrayerRequestModal.errors.descriptionRequired'));
            return;
        }

        setLoading(true);

        const response = await prayerPostService.createPost({
            description: description,
            media: files.length > 0 ? files : undefined
        });

        if (response.success) {
            showSuccess(t('createPrayerRequestModal.success.requestCreated'));
            if (onRequestCreated) {
                onRequestCreated();
            }
            onClose();

            // Reset state
            setDescription('');
            setFiles([]);
        } else {
            showError(response.message || t('createPrayerRequestModal.errors.failedToCreateRequest'));
        }

        setLoading(false);
    };

    return (
        <Overlay onClick={onClose}>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                    <Title>{t('createPrayerRequestModal.title')}</Title>
                    {/* <CloseButton onClick={onClose}>&times;</CloseButton> */}
                </ModalHeader>

                <ModalBody>
                    <InputGroup>
                        <Label>{t('createPrayerRequestModal.labels.description')}</Label>
                        <TextArea
                            placeholder={t('createPrayerRequestModal.placeholders.enterDescription')}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </InputGroup>

                    <InputGroup>
                        <Label>{t('createPrayerRequestModal.labels.media')}</Label>
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            multiple
                            accept="image/*,video/*"
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
                                <UploadText>{t('createPrayerRequestModal.upload.uploadText')}</UploadText>
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
                                    {t('createPrayerRequestModal.upload.addMoreFiles')}
                                </AddMoreButton>
                            </>
                        )}
                    </InputGroup>
                    <SubmitButton onClick={handleSubmit} disabled={loading}>
                        {loading ? t('createPrayerRequestModal.buttons.submitting') : t('createPrayerRequestModal.buttons.submitPrayerRequest')}
                    </SubmitButton>
                </ModalBody>
            </ModalContainer>
        </Overlay>
    );
};

export default CreatePrayerRequestModal;