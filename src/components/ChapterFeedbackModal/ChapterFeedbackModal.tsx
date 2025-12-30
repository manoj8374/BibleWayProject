import React, { useState } from 'react';
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
  ButtonContainer,
  CancelButton,
  SubmitButton
} from './ChapterFeedbackModal.styles';
import { bookService } from '../../services/book/book.service';
import { showSuccess, showError } from '../../utils/toast';
import { FaStar } from 'react-icons/fa';
import { FaRegStar } from 'react-icons/fa';

interface ChapterFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  chapterId: string;
  onFeedbackSubmitted?: () => void;
}

const ChapterFeedbackModal: React.FC<ChapterFeedbackModalProps> = ({
  isOpen,
  onClose,
  chapterId,
  onFeedbackSubmitted
}) => {
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleStarClick = (starRating: number) => {
    setRating(starRating);
  };

  const handleSubmit = async () => {
    // Validation
    if (!description.trim()) {
      showError('Please enter a description for your feedback.');
      return;
    }

    if (rating === 0) {
      showError('Please select a rating.');
      return;
    }

    if (rating < 1 || rating > 5) {
      showError('Rating must be between 1 and 5.');
      return;
    }

    setLoading(true);

    try {
      const response = await bookService.createChapterFeedback({
        chapter_id: chapterId,
        description: description.trim(),
        rating: rating
      });

      if (response.success) {
        showSuccess('Feedback submitted successfully!');
        if (onFeedbackSubmitted) {
          onFeedbackSubmitted();
        }
        handleClose();
      } else {
        showError(response.error || response.message || 'Failed to submit feedback.');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      showError('Failed to submit feedback. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setDescription('');
      setRating(0);
      onClose();
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !loading) {
      handleClose();
    }
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <Title>Chapter Feedback</Title>
          <CloseButton onClick={handleClose} disabled={loading}>
            ×
          </CloseButton>
        </ModalHeader>

        <ModalBody>
          <InputGroup>
            <Label>Rating</Label>
            <StarSelector>
              {[1, 2, 3, 4, 5].map((star) => (
                <StarButton
                  key={star}
                  $isSelected={star <= rating}
                  onClick={() => handleStarClick(star)}
                  type="button"
                  disabled={loading}
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
            <Label>Description</Label>
            <TextArea
              placeholder="Share your feedback about this chapter..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loading}
            />
          </InputGroup>

          <ButtonContainer>
            <CancelButton onClick={handleClose} disabled={loading}>
              Cancel
            </CancelButton>
            <SubmitButton onClick={handleSubmit} disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Feedback'}
            </SubmitButton>
          </ButtonContainer>
        </ModalBody>
      </ModalContainer>
    </Overlay>
  );
};

export default ChapterFeedbackModal;

