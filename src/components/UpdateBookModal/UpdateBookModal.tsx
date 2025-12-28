import React, { useState, useEffect } from 'react';
import {
  Overlay,
  ModalContainer,
  ModalHeader,
  Title,
  CloseButton,
  ModalBody,
  Form,
  InputGroup,
  Label,
  Input,
  TextArea,
  FileInput,
  ButtonGroup,
  SubmitButton,
  CancelButton,
  FilePreview
} from '../CreateBookModal/CreateBookModal.styles';
import { adminService, type Book } from '../../services/admin/admin.service';
import { showSuccess, showError } from '../../utils/toast';
import { useI18n } from '../../i18n';

interface UpdateBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookUpdated?: () => void;
  book: Book | null;
}

const UpdateBookModal: React.FC<UpdateBookModalProps> = ({ 
  isOpen, 
  onClose, 
  onBookUpdated,
  book
}) => {
  const { t } = useI18n();
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImageUrl, setCoverImageUrl] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (book && isOpen) {
      setFormData({
        title: book.title || '',
        description: book.description || ''
      });
      setCoverImageUrl(book.cover_image_url || '');
      setCoverImage(null);
    }
  }, [book, isOpen]);

  if (!isOpen || !book) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverImage(e.target.files[0]);
      setCoverImageUrl(''); // Clear URL when file is selected
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCoverImageUrl(e.target.value);
    if (e.target.value) {
      setCoverImage(null); // Clear file when URL is provided
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await adminService.updateBook({
        book_id: book.book_id,
        ...(formData.title.trim() && { title: formData.title.trim() }),
        ...(formData.description.trim() && { description: formData.description.trim() }),
        ...(coverImage && { cover_image: coverImage }),
        ...(coverImageUrl.trim() && !coverImage && { cover_image_url: coverImageUrl.trim() })
      });

      if (response.success) {
        showSuccess(response.message || 'Book updated successfully');
        onClose();
        if (onBookUpdated) {
          onBookUpdated();
        }
      } else {
        showError(response.error || response.message || 'Failed to update book');
      }
    } catch (error) {
      console.error('Error updating book:', error);
      showError('Failed to update book');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <Title>Update Book</Title>
          <CloseButton onClick={handleClose}>&times;</CloseButton>
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <Label>Book Title</Label>
              <Input 
                name="title" 
                value={formData.title} 
                onChange={handleChange} 
                placeholder="Enter book title"
                disabled={loading}
              />
            </InputGroup>

            <InputGroup>
              <Label>Description</Label>
              <TextArea 
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                placeholder="Enter book description" 
                disabled={loading}
              />
            </InputGroup>

            <InputGroup>
              <Label>Cover Image (File)</Label>
              <FileInput
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={loading}
              />
              {coverImage && (
                <FilePreview>
                  Selected: {coverImage.name}
                </FilePreview>
              )}
            </InputGroup>

            <InputGroup>
              <Label>Cover Image URL (Alternative to file upload)</Label>
              <Input 
                type="url"
                value={coverImageUrl} 
                onChange={handleUrlChange} 
                placeholder="https://example.com/book-cover.jpg"
                disabled={loading}
              />
              {coverImageUrl && !coverImage && (
                <FilePreview>
                  Current URL: {coverImageUrl}
                </FilePreview>
              )}
            </InputGroup>

            <ButtonGroup>
              <CancelButton type="button" onClick={handleClose} disabled={loading}>
                Cancel
              </CancelButton>
              <SubmitButton type="submit" disabled={loading}>
                {loading ? 'Updating...' : 'Update Book'}
              </SubmitButton>
            </ButtonGroup>
          </Form>
        </ModalBody>
      </ModalContainer>
    </Overlay>
  );
};

export default UpdateBookModal;

