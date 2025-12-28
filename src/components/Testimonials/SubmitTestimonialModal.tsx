import React, { useState, useRef } from 'react';
import {
    Overlay,
    ModalContainer,
    ModalHeader,
    Title,
    CloseButton,
    ModalBody,
    InputGroup,
    Label,
    TextArea,
    StarSelector,
    StarButton,
    RatingLabel,
    UploadArea,
    UploadIcon,
    UploadText,
    FileList,
    FileItem,
    FileRemoveButton,
    AddMoreButton,
    SubmitButton
} from './SubmitTestimonialModal.styles';
import { testimonialService } from '../../services/testimonial/testimonial.service';
import { showSuccess, showError } from '../../utils/toast';
import { FaStar } from 'react-icons/fa';
import { FaRegStar } from 'react-icons/fa';

interface SubmitTestimonialModalProps {
    isOpen: boolean;
    onClose: () => void;
    onTestimonialCreated?: () => void;
}

const SubmitTestimonialModal: React.FC<SubmitTestimonialModalProps> = ({ isOpen, onClose, onTestimonialCreated }) => {
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState<number>(0);
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
                showError("You can upload a maximum of 5 files.");
                return;
            }

            // Validate file types and sizes
            const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm', 'video/quicktime', 'audio/mpeg', 'audio/wav', 'audio/m4a', 'audio/aac'];
            const maxSize = 10 * 1024 * 1024; // 10MB

            for (const file of newFiles) {
                if (!validTypes.includes(file.type)) {
                    showError(`Invalid file type: ${file.name}. Only images, videos, and audio are allowed.`);
                    return;
                }
                if (file.size > maxSize) {
                    showError(`File size exceeds 10MB limit: ${file.name}`);
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
        e.stopPropagation();
        setFiles(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    const handleStarClick = (starRating: number) => {
        setRating(starRating);
    };

    const handleSubmit = async () => {
        if (!description.trim()) {
            showError("Please enter a description for your testimonial.");
            return;
        }

        if (rating === 0) {
            showError("Please select a rating.");
            return;
        }

        if (rating < 1 || rating > 5) {
            showError("Rating must be between 1 and 5.");
            return;
        }

        setLoading(true);

        const response = await testimonialService.createTestimonial({
            description: description,
            rating: rating,
            media: files.length > 0 ? files : undefined
        });

        if (response.success) {
            showSuccess('Testimonial submitted successfully! It will be reviewed by an admin.');
            if (onTestimonialCreated) {
                onTestimonialCreated();
            }
            onClose();

            // Reset state
            setDescription('');
            setRating(0);
            setFiles([]);
        } else {
            showError(response.message || 'Failed to submit testimonial.');
        }

        setLoading(false);
    };

    const handleClose = () => {
        if (!loading) {
            setDescription('');
            setRating(0);
            setFiles([]);
            onClose();
        }
    };

    return (
        <Overlay onClick={handleClose}>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                    <Title>Submit Testimonial</Title>
                    <CloseButton onClick={handleClose}>&times;</CloseButton>
                </ModalHeader>

                <ModalBody>
                    <InputGroup>
                        <Label>Description *</Label>
                        <TextArea
                            placeholder="Share your experience..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </InputGroup>

                    <InputGroup>
                        <Label>Rating *</Label>
                        <StarSelector>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <StarButton
                                    key={star}
                                    $isSelected={star <= rating}
                                    onClick={() => handleStarClick(star)}
                                    type="button"
                                >
                                    {star <= rating ? <FaStar /> : <FaRegStar />}
                                </StarButton>
                            ))}
                            {rating > 0 && (
                                <RatingLabel>{rating} {rating === 1 ? 'star' : 'stars'}</RatingLabel>
                            )}
                        </StarSelector>
                    </InputGroup>

                    <InputGroup>
                        <Label>Media (Optional)</Label>
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            multiple
                            accept="image/*,video/*,audio/*"
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
                                <UploadText>Upload images, videos or audio (Max 5 files, 10MB each)</UploadText>
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
                                    + Add more files
                                </AddMoreButton>
                            </>
                        )}
                    </InputGroup>
                    <SubmitButton onClick={handleSubmit} disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit Testimonial'}
                    </SubmitButton>
                </ModalBody>
            </ModalContainer>
        </Overlay>
    );
};

export default SubmitTestimonialModal;

